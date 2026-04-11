(function () {
  const STORAGE_KEYS = {
    youtubeUrl: 'roadTest.youtubeUrl',
    lastSegmentId: 'roadTest.lastSegmentId',
    moduleFilter: 'roadTest.moduleFilter',
    muted: 'roadTest.muted',
    autoplayNav: 'roadTest.autoplayNav',
    autoAdvance: 'roadTest.autoAdvance',
    advanceDelaySec: 'roadTest.advanceDelaySec'
  };

  const DEFAULT_URL = 'https://www.youtube.com/watch?v=ldsprS-5Y9E';
  const DEFAULT_SETTINGS = {
    muted: true,
    autoplayNav: true,
    autoAdvance: true,
    advanceDelaySec: 1.2
  };

  function qs(id) {
    return document.getElementById(id);
  }

  function safeText(v) {
    return String(v || '').trim();
  }

  function normalizeAnswerText(text) {
    return safeText(text)
      .replace(/\s+/g, ' ')
      .replace(/[【】「」『』（）()，,。；;：:]/g, '')
      .trim();
  }

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function formatTime(seconds) {
    const total = Math.max(0, Math.floor(Number(seconds) || 0));
    const mm = Math.floor(total / 60);
    const ss = total % 60;
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }

  function extractYouTubeVideoId(url) {
    const text = safeText(url);
    if (!text) return '';
    try {
      const parsed = new URL(text);
      if (parsed.hostname.includes('youtu.be')) {
        return parsed.pathname.replace(/^\//, '').trim();
      }
      if (parsed.searchParams.get('v')) {
        return parsed.searchParams.get('v').trim();
      }
      const parts = parsed.pathname.split('/').filter(Boolean);
      const embedIdx = parts.indexOf('embed');
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1].trim();
      const shortsIdx = parts.indexOf('shorts');
      if (shortsIdx >= 0 && parts[shortsIdx + 1]) return parts[shortsIdx + 1].trim();
    } catch (_) {
      const m = text.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{6,})/);
      if (m) return m[1];
    }
    return '';
  }

  function buildEmbedUrl(videoId, startSec, endSec, autoplay, muted) {
    if (!videoId) return '';
    const start = Math.max(0, Math.floor(Number(startSec) || 0));
    const end = Math.max(start + 1, Math.floor(Number(endSec) || 0));
    const auto = autoplay ? 1 : 0;
    const mute = muted ? 1 : 0;
    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?start=${start}&end=${end}&autoplay=${auto}&mute=${mute}&rel=0&playsinline=1&modestbranding=1&controls=1`;
  }

  function buildWatchUrl(videoId, startSec) {
    if (!videoId) return DEFAULT_URL;
    const start = Math.max(0, Math.floor(Number(startSec) || 0));
    return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&t=${start}s`;
  }

  function readBool(key, fallback) {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return raw === 'true';
  }

  function readNumber(key, fallback, min, max) {
    const n = Number(localStorage.getItem(key));
    if (!Number.isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  }

  function buildQuestionBank(ref) {
    const modules = new Map((ref.modules || []).map((m) => [m.id, m]));
    return (ref.segments || []).map((seg, idx) => {
      const mod = modules.get(seg.moduleId) || {};
      return {
        bankId: `RT-${String(idx + 1).padStart(3, '0')}`,
        segmentId: seg.id,
        moduleId: seg.moduleId,
        moduleTitle: mod.title || '未分類模組',
        prompt: '依影片字幕與畫面，這一步最正確的作法是？',
        answerText: safeText(seg.answerText || seg.captionText || ''),
        captionText: safeText(seg.captionText || ''),
        startSec: Number(seg.startSec) || 0,
        endSec: Number(seg.endSec) || Number(seg.startSec) || 0,
        clipLeadSeconds: Number(seg.clipLeadSeconds ?? ref.defaults?.clipLeadSeconds ?? 1) || 1,
        clipLagSeconds: Number(seg.clipLagSeconds ?? ref.defaults?.clipLagSeconds ?? 1) || 1,
        clipStartSec: Number(seg.clipStartSec) || 0,
        clipEndSec: Number(seg.clipEndSec) || 0,
        tags: Array.isArray(seg.tags) ? seg.tags.slice() : [],
        moduleSummary: safeText(mod.summary || ''),
        sourceBasis: 'captions.sbv'
      };
    });
  }

  function createState(ref) {
    const questionBank = buildQuestionBank(ref);
    const modules = Array.isArray(ref?.modules) ? ref.modules.slice() : [];
    const moduleMap = new Map(modules.map((m) => [m.id, m]));
    const answerPoolMap = new Map();
    questionBank.forEach((q) => {
      const norm = normalizeAnswerText(q.answerText || q.captionText || '');
      if (!norm) return;
      if (!answerPoolMap.has(norm)) answerPoolMap.set(norm, q.answerText || q.captionText || '');
    });
    return {
      ref,
      questionBank,
      modules,
      moduleMap,
      answerPool: Array.from(answerPoolMap.values()),
      filteredQuestions: questionBank.slice(),
      currentIndex: -1,
      currentQuestion: null,
      answered: false,
      currentVideoId: '',
      currentUrl: '',
      pendingAdvanceTimer: null,
      settings: {
        muted: readBool(STORAGE_KEYS.muted, DEFAULT_SETTINGS.muted),
        autoplayNav: readBool(STORAGE_KEYS.autoplayNav, DEFAULT_SETTINGS.autoplayNav),
        autoAdvance: readBool(STORAGE_KEYS.autoAdvance, DEFAULT_SETTINGS.autoAdvance),
        advanceDelaySec: readNumber(STORAGE_KEYS.advanceDelaySec, DEFAULT_SETTINGS.advanceDelaySec, 0.5, 5)
      }
    };
  }

  function buildOptionsForQuestion(question, state) {
    const correct = safeText(question.answerText || question.captionText || '');
    const correctNorm = normalizeAnswerText(correct);
    const sameModule = state.filteredQuestions.filter((q) => q.segmentId !== question.segmentId && q.moduleId === question.moduleId);
    const allOthers = state.questionBank.filter((q) => q.segmentId !== question.segmentId);
    const options = [];
    const used = new Set([correctNorm]);

    function tryPush(text) {
      const raw = safeText(text);
      const norm = normalizeAnswerText(raw);
      if (!raw || !norm || used.has(norm)) return false;
      used.add(norm);
      options.push(raw);
      return true;
    }

    shuffle(sameModule).forEach((q) => { if (options.length < 3) tryPush(q.answerText || q.captionText || ''); });
    if (options.length < 3) {
      shuffle(allOthers).forEach((q) => { if (options.length < 3) tryPush(q.answerText || q.captionText || ''); });
    }
    if (options.length < 3) {
      shuffle(state.answerPool).forEach((text) => { if (options.length < 3) tryPush(text); });
    }

    const finalOptions = shuffle([correct, ...options.slice(0, 3)]);
    return {
      correct,
      correctNorm,
      options: finalOptions,
      correctIndex: finalOptions.findIndex((opt) => normalizeAnswerText(opt) === correctNorm)
    };
  }

  function clearPendingAdvance(state) {
    if (state.pendingAdvanceTimer) {
      clearTimeout(state.pendingAdvanceTimer);
      state.pendingAdvanceTimer = null;
    }
    const examStatus = qs('roadTestExamStatus');
    if (examStatus) examStatus.textContent = '';
  }

  function syncSettingControls(state) {
    const muted = qs('roadTestMutedToggle');
    const autoplay = qs('roadTestAutoplayNextToggle');
    const autoAdvance = qs('roadTestAutoAdvanceToggle');
    const delayInput = qs('roadTestAdvanceDelayInput');
    if (muted) muted.checked = !!state.settings.muted;
    if (autoplay) autoplay.checked = !!state.settings.autoplayNav;
    if (autoAdvance) autoAdvance.checked = !!state.settings.autoAdvance;
    if (delayInput) delayInput.value = String(state.settings.advanceDelaySec);
  }

  function updateHeaderMeta(state) {
    const sourceLabel = qs('roadTestSourceLabel');
    const bankMeta = qs('roadTestBankMeta');
    const flowHint = qs('roadTestFlowHint');
    if (sourceLabel) {
      sourceLabel.textContent = `影片來源：YouTube｜字幕來源：captions.sbv｜片段預設前後 1 秒｜考試時預設靜音`;
    }
    if (bankMeta) {
      bankMeta.textContent = `已編成題庫 ${state.questionBank.length} 題，共 ${state.modules.length} 類模組；目前篩選後 ${state.filteredQuestions.length} 題。`;
    }
    if (flowHint) {
      flowHint.textContent = `目前設定：${state.settings.muted ? '靜音' : '開聲'}｜${state.settings.autoplayNav ? '切題自動播放' : '切題不自動播放'}｜${state.settings.autoAdvance ? `答題後 ${state.settings.advanceDelaySec.toFixed(1)} 秒自動跳題` : '答題後停留本題'}`;
    }
  }

  function updateVideo(state, autoplay) {
    const iframe = qs('roadTestVideoFrame');
    const openBtn = qs('roadTestOpenYoutubeBtn');
    const status = qs('roadTestVideoStatus');
    if (!iframe) return;
    if (!state.currentQuestion) {
      iframe.removeAttribute('src');
      if (status) status.textContent = '尚未播放片段。';
      return;
    }
    const q = state.currentQuestion.question;
    const videoId = state.currentVideoId;
    if (!videoId) {
      iframe.removeAttribute('src');
      if (status) status.textContent = '尚未填入可用的 YouTube 網址。';
      if (openBtn) {
        openBtn.href = DEFAULT_URL;
        openBtn.setAttribute('aria-disabled', 'true');
      }
      return;
    }
    iframe.src = buildEmbedUrl(videoId, q.clipStartSec, q.clipEndSec, autoplay, state.settings.muted);
    if (openBtn) {
      openBtn.href = buildWatchUrl(videoId, q.clipStartSec);
      openBtn.removeAttribute('aria-disabled');
    }
    if (status) {
      status.textContent = `題庫編碼 ${q.bankId}｜片段 ${formatTime(q.clipStartSec)} - ${formatTime(q.clipEndSec)}｜題點 ${formatTime(q.startSec)}｜${state.settings.muted ? '預設靜音' : '目前開聲'}`;
    }
  }

  function renderQuestion(state) {
    const questionWrap = qs('roadTestQuestionWrap');
    const empty = qs('roadTestEmpty');
    const moduleLabel = qs('roadTestModuleLabel');
    const prompt = qs('roadTestPrompt');
    const optionsEl = qs('roadTestOptions');
    const feedback = qs('roadTestFeedback');
    const note = qs('roadTestReferenceNote');
    const segMeta = qs('roadTestSegmentMeta');
    const answerToggle = qs('roadTestShowAnswerBtn');
    const answerBox = qs('roadTestAnswerBox');
    const answerText = qs('roadTestAnswerText');
    const progress = qs('roadTestProgress');
    const bankMeta = qs('roadTestBankMeta');
    if (!questionWrap || !empty || !optionsEl || !feedback || !prompt || !moduleLabel || !note || !segMeta || !answerBox || !answerText || !progress) return;

    updateHeaderMeta(state);

    const current = state.currentQuestion;
    if (!current) {
      questionWrap.classList.add('hidden');
      empty.classList.remove('hidden');
      progress.textContent = `目前共有 ${state.filteredQuestions.length} 題可練習。`;
      if (bankMeta) bankMeta.textContent = `已編成題庫 ${state.questionBank.length} 題；目前篩選後 0 題。`;
      return;
    }

    const moduleInfo = state.moduleMap.get(current.question.moduleId);
    empty.classList.add('hidden');
    questionWrap.classList.remove('hidden');
    progress.textContent = `第 ${state.currentIndex + 1} / ${state.filteredQuestions.length} 題`;
    moduleLabel.textContent = moduleInfo ? moduleInfo.title : (current.question.moduleId || '未分類模組');
    prompt.textContent = current.question.prompt;
    segMeta.textContent = `題庫編碼 ${current.question.bankId}｜字幕 ${formatTime(current.question.startSec)} - ${formatTime(current.question.endSec)}｜模組重點：${moduleInfo ? moduleInfo.summary : '依字幕判定'}`;
    note.textContent = '答案以字幕內容為主；若整理文字與字幕有差異，請以字幕為準。若要靜音或自動跳題，可直接在上方考試設定切換。';
    feedback.textContent = '';
    feedback.className = 'roadtest-feedback';
    answerBox.classList.add('hidden');
    answerText.textContent = current.correct;
    if (answerToggle) answerToggle.textContent = '顯示字幕答案';
    state.answered = false;
    clearPendingAdvance(state);

    optionsEl.innerHTML = '';
    current.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'roadtest-option-btn';
      btn.dataset.optionIndex = String(idx);
      btn.innerHTML = `<span class="roadtest-option-index">${idx + 1}</span><span class="roadtest-option-text">${opt}</span>`;
      btn.addEventListener('click', () => submitAnswer(state, idx));
      optionsEl.appendChild(btn);
    });

    updateVideo(state, false);
  }

  function submitAnswer(state, chosenIndex) {
    if (state.answered || !state.currentQuestion) return;
    state.answered = true;
    const current = state.currentQuestion;
    const optionsEl = qs('roadTestOptions');
    const feedback = qs('roadTestFeedback');
    const examStatus = qs('roadTestExamStatus');
    if (!optionsEl || !feedback) return;
    const buttons = Array.from(optionsEl.querySelectorAll('button'));
    buttons.forEach((node, btnIdx) => {
      node.disabled = true;
      if (btnIdx === current.correctIndex) node.classList.add('correct');
      if (btnIdx === chosenIndex && chosenIndex !== current.correctIndex) node.classList.add('incorrect');
    });
    const isCorrect = chosenIndex === current.correctIndex;
    feedback.textContent = isCorrect ? '答對：這一題以字幕內容為準。' : '答錯：請對照字幕答案與模組重點。';
    feedback.classList.add(isCorrect ? 'is-correct' : 'is-wrong');

    if (state.settings.autoAdvance && state.currentIndex < state.filteredQuestions.length - 1) {
      const delayMs = Math.round(state.settings.advanceDelaySec * 1000);
      if (examStatus) examStatus.textContent = `${state.settings.advanceDelaySec.toFixed(1)} 秒後自動前往下一題${state.settings.autoplayNav ? '並播放片段' : ''}。`;
      state.pendingAdvanceTimer = setTimeout(() => {
        moveToIndex(state, state.currentIndex + 1, { autoplay: state.settings.autoplayNav });
      }, delayMs);
    } else if (examStatus) {
      examStatus.textContent = state.currentIndex >= state.filteredQuestions.length - 1 ? '已到最後一題。可按上一題、隨機一題或切換模組。' : '已停留本題。可手動重播、看答案或前往下一題。';
    }
  }

  function moveToIndex(state, nextIndex, options) {
    clearPendingAdvance(state);
    const opts = options || {};
    if (!state.filteredQuestions.length) {
      state.currentIndex = -1;
      state.currentQuestion = null;
      renderQuestion(state);
      return;
    }
    const bounded = Math.max(0, Math.min(nextIndex, state.filteredQuestions.length - 1));
    state.currentIndex = bounded;
    const question = state.filteredQuestions[bounded];
    const q = buildOptionsForQuestion(question, state);
    state.currentQuestion = { ...q, question };
    localStorage.setItem(STORAGE_KEYS.lastSegmentId, question.segmentId);
    renderQuestion(state);
    if (opts.autoplay) updateVideo(state, true);
  }

  function loadFromSavedPosition(state) {
    const savedId = localStorage.getItem(STORAGE_KEYS.lastSegmentId);
    const idx = state.filteredQuestions.findIndex((q) => q.segmentId === savedId);
    moveToIndex(state, idx >= 0 ? idx : 0, { autoplay: false });
  }

  function applyFilter(state, moduleId) {
    const value = moduleId || 'all';
    state.filteredQuestions = value === 'all'
      ? state.questionBank.slice()
      : state.questionBank.filter((q) => q.moduleId === value);
    localStorage.setItem(STORAGE_KEYS.moduleFilter, value);
    loadFromSavedPosition(state);
  }

  function populateModuleSelect(state) {
    const select = qs('roadTestModuleSelect');
    if (!select) return;
    select.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = `全部模組（${state.modules.length} 類）`;
    select.appendChild(allOpt);
    state.modules.forEach((mod) => {
      const opt = document.createElement('option');
      opt.value = mod.id;
      opt.textContent = mod.title;
      select.appendChild(opt);
    });
    const saved = localStorage.getItem(STORAGE_KEYS.moduleFilter) || 'all';
    select.value = saved;
  }

  function bindEvents(state) {
    const urlInput = qs('roadTestYoutubeUrlInput');
    const saveUrlBtn = qs('roadTestSaveUrlBtn');
    const useDefaultBtn = qs('roadTestUseDefaultBtn');
    const playBtn = qs('roadTestPlayClipBtn');
    const prevBtn = qs('roadTestPrevBtn');
    const nextBtn = qs('roadTestNextBtn');
    const randomBtn = qs('roadTestRandomBtn');
    const moduleSelect = qs('roadTestModuleSelect');
    const answerToggle = qs('roadTestShowAnswerBtn');
    const mutedToggle = qs('roadTestMutedToggle');
    const autoplayToggle = qs('roadTestAutoplayNextToggle');
    const autoAdvanceToggle = qs('roadTestAutoAdvanceToggle');
    const delayInput = qs('roadTestAdvanceDelayInput');

    if (saveUrlBtn && urlInput) {
      saveUrlBtn.addEventListener('click', () => {
        const value = safeText(urlInput.value) || DEFAULT_URL;
        state.currentUrl = value;
        state.currentVideoId = extractYouTubeVideoId(value);
        localStorage.setItem(STORAGE_KEYS.youtubeUrl, value);
        updateVideo(state, false);
      });
    }

    if (useDefaultBtn && urlInput) {
      useDefaultBtn.addEventListener('click', () => {
        urlInput.value = DEFAULT_URL;
        state.currentUrl = DEFAULT_URL;
        state.currentVideoId = extractYouTubeVideoId(DEFAULT_URL);
        localStorage.setItem(STORAGE_KEYS.youtubeUrl, DEFAULT_URL);
        updateVideo(state, false);
      });
    }

    if (playBtn) playBtn.addEventListener('click', () => updateVideo(state, true));
    if (prevBtn) prevBtn.addEventListener('click', () => moveToIndex(state, state.currentIndex - 1, { autoplay: state.settings.autoplayNav }));
    if (nextBtn) nextBtn.addEventListener('click', () => moveToIndex(state, state.currentIndex + 1, { autoplay: state.settings.autoplayNav }));
    if (randomBtn) randomBtn.addEventListener('click', () => moveToIndex(state, Math.floor(Math.random() * Math.max(1, state.filteredQuestions.length)), { autoplay: state.settings.autoplayNav }));

    if (moduleSelect) {
      moduleSelect.addEventListener('change', () => applyFilter(state, moduleSelect.value));
    }

    if (answerToggle) {
      answerToggle.addEventListener('click', () => {
        const box = qs('roadTestAnswerBox');
        if (!box) return;
        const isHidden = box.classList.contains('hidden');
        box.classList.toggle('hidden', !isHidden);
        answerToggle.textContent = isHidden ? '隱藏字幕答案' : '顯示字幕答案';
      });
    }

    if (mutedToggle) {
      mutedToggle.addEventListener('change', () => {
        state.settings.muted = !!mutedToggle.checked;
        localStorage.setItem(STORAGE_KEYS.muted, String(state.settings.muted));
        updateHeaderMeta(state);
        updateVideo(state, false);
      });
    }

    if (autoplayToggle) {
      autoplayToggle.addEventListener('change', () => {
        state.settings.autoplayNav = !!autoplayToggle.checked;
        localStorage.setItem(STORAGE_KEYS.autoplayNav, String(state.settings.autoplayNav));
        updateHeaderMeta(state);
      });
    }

    if (autoAdvanceToggle) {
      autoAdvanceToggle.addEventListener('change', () => {
        state.settings.autoAdvance = !!autoAdvanceToggle.checked;
        localStorage.setItem(STORAGE_KEYS.autoAdvance, String(state.settings.autoAdvance));
        clearPendingAdvance(state);
        updateHeaderMeta(state);
      });
    }

    if (delayInput) {
      delayInput.addEventListener('change', () => {
        const next = readNumber(STORAGE_KEYS.advanceDelaySec, Number(delayInput.value) || DEFAULT_SETTINGS.advanceDelaySec, 0.5, 5);
        state.settings.advanceDelaySec = Math.min(5, Math.max(0.5, Number(delayInput.value) || DEFAULT_SETTINGS.advanceDelaySec));
        delayInput.value = String(state.settings.advanceDelaySec);
        localStorage.setItem(STORAGE_KEYS.advanceDelaySec, String(state.settings.advanceDelaySec));
        updateHeaderMeta(state);
      });
    }
  }

  function init() {
    const ref = window.ROAD_TEST_REFERENCE;
    if (!ref || !Array.isArray(ref.segments) || !ref.segments.length) return;
    const state = createState(ref);
    window.ROAD_TEST_QUESTION_BANK = state.questionBank.slice();

    const urlInput = qs('roadTestYoutubeUrlInput');
    const savedUrl = localStorage.getItem(STORAGE_KEYS.youtubeUrl) || DEFAULT_URL;
    state.currentUrl = savedUrl;
    state.currentVideoId = extractYouTubeVideoId(savedUrl);
    if (urlInput) urlInput.value = savedUrl;

    syncSettingControls(state);
    populateModuleSelect(state);
    bindEvents(state);

    const moduleSelect = qs('roadTestModuleSelect');
    applyFilter(state, moduleSelect ? moduleSelect.value : 'all');
    updateHeaderMeta(state);
  }

  document.addEventListener('DOMContentLoaded', init);
  window.RoadTestSim = { init };
}());
