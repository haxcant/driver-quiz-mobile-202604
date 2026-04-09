(function () {
  const STORAGE_KEYS = {
    youtubeUrl: 'roadTest.youtubeUrl',
    lastSegmentId: 'roadTest.lastSegmentId',
    moduleFilter: 'roadTest.moduleFilter'
  };

  const DEFAULT_URL = 'https://www.youtube.com/watch?v=ldsprS-5Y9E';

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

  function pickRandom(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr[Math.floor(Math.random() * arr.length)];
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

  function buildEmbedUrl(videoId, startSec, endSec, autoplay) {
    if (!videoId) return '';
    const start = Math.max(0, Math.floor(Number(startSec) || 0));
    const end = Math.max(start + 1, Math.floor(Number(endSec) || 0));
    const auto = autoplay ? 1 : 0;
    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?start=${start}&end=${end}&autoplay=${auto}&rel=0&playsinline=1&modestbranding=1`;
  }

  function buildWatchUrl(videoId, startSec) {
    if (!videoId) return DEFAULT_URL;
    const start = Math.max(0, Math.floor(Number(startSec) || 0));
    return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&t=${start}s`;
  }

  function createState(ref) {
    const segments = Array.isArray(ref?.segments) ? ref.segments.slice() : [];
    const modules = Array.isArray(ref?.modules) ? ref.modules.slice() : [];
    const moduleMap = new Map(modules.map((m) => [m.id, m]));
    const normalizedPool = new Map();
    segments.forEach((seg) => {
      const norm = normalizeAnswerText(seg.answerText || seg.captionText || '');
      if (!norm) return;
      if (!normalizedPool.has(norm)) normalizedPool.set(norm, seg.answerText || seg.captionText || '');
    });
    return {
      ref,
      segments,
      modules,
      moduleMap,
      answerPool: Array.from(normalizedPool.values()),
      filteredSegments: segments.slice(),
      currentIndex: -1,
      currentQuestion: null,
      answered: false,
      currentVideoId: '',
      currentUrl: ''
    };
  }

  function buildOptionsForSegment(segment, state) {
    const correct = safeText(segment.answerText || segment.captionText || '');
    const correctNorm = normalizeAnswerText(correct);
    const moduleSegments = state.filteredSegments.filter((s) => s.id !== segment.id && s.moduleId === segment.moduleId);
    const globalSegments = state.segments.filter((s) => s.id !== segment.id);
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

    shuffle(moduleSegments).forEach((s) => {
      if (options.length < 3) tryPush(s.answerText || s.captionText || '');
    });

    if (options.length < 3) {
      shuffle(globalSegments).forEach((s) => {
        if (options.length < 3) tryPush(s.answerText || s.captionText || '');
      });
    }

    if (options.length < 3) {
      shuffle(state.answerPool).forEach((text) => {
        if (options.length < 3) tryPush(text);
      });
    }

    const finalOptions = shuffle([correct, ...options.slice(0, 3)]);
    return {
      correct,
      correctNorm,
      options: finalOptions,
      correctIndex: finalOptions.findIndex((opt) => normalizeAnswerText(opt) === correctNorm)
    };
  }

  function updateVideo(state, autoplay) {
    const iframe = qs('roadTestVideoFrame');
    const openBtn = qs('roadTestOpenYoutubeBtn');
    const status = qs('roadTestVideoStatus');
    if (!iframe || !state.currentQuestion) return;
    const q = state.currentQuestion.segment;
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
    iframe.src = buildEmbedUrl(videoId, q.clipStartSec, q.clipEndSec, autoplay);
    if (openBtn) {
      openBtn.href = buildWatchUrl(videoId, q.clipStartSec);
      openBtn.removeAttribute('aria-disabled');
    }
    if (status) {
      status.textContent = `片段範圍：${formatTime(q.clipStartSec)} - ${formatTime(q.clipEndSec)}（題點 ${formatTime(q.startSec)}）`;
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
    if (!questionWrap || !empty || !optionsEl || !feedback || !prompt || !moduleLabel || !note || !segMeta || !answerBox || !answerText || !progress) return;

    const current = state.currentQuestion;
    if (!current) {
      questionWrap.classList.add('hidden');
      empty.classList.remove('hidden');
      progress.textContent = `目前共有 ${state.filteredSegments.length} 題可練習。`;
      return;
    }

    const moduleInfo = state.moduleMap.get(current.segment.moduleId);
    empty.classList.add('hidden');
    questionWrap.classList.remove('hidden');
    progress.textContent = `第 ${state.currentIndex + 1} / ${state.filteredSegments.length} 題`;
    moduleLabel.textContent = moduleInfo ? moduleInfo.title : (current.segment.moduleId || '未分類模組');
    prompt.textContent = '依影片畫面與字幕，這一步最正確的作法是？';
    segMeta.textContent = `字幕題點 ${formatTime(current.segment.startSec)} - ${formatTime(current.segment.endSec)}｜模組：${moduleInfo ? moduleInfo.summary : '依字幕判定'}`;
    note.textContent = '答案以字幕內容為主；若文字檔與字幕有差異，請以字幕為準。';
    feedback.textContent = '';
    feedback.className = 'roadtest-feedback';
    answerBox.classList.add('hidden');
    answerText.textContent = current.correct;
    if (answerToggle) answerToggle.textContent = '顯示字幕答案';
    state.answered = false;

    optionsEl.innerHTML = '';
    current.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'roadtest-option-btn';
      btn.dataset.optionIndex = String(idx);
      btn.innerHTML = `<span class="roadtest-option-index">${idx + 1}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => {
        if (state.answered) return;
        state.answered = true;
        const isCorrect = idx === current.correctIndex;
        btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        Array.from(optionsEl.querySelectorAll('button')).forEach((node, btnIdx) => {
          node.disabled = true;
          if (btnIdx === current.correctIndex) node.classList.add('correct');
        });
        feedback.textContent = isCorrect ? '答對：這一題以字幕內容為準。' : '答錯：請對照字幕答案與模組重點。';
        feedback.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
      });
      optionsEl.appendChild(btn);
    });

    updateVideo(state, false);
  }

  function moveToIndex(state, nextIndex) {
    if (!state.filteredSegments.length) {
      state.currentIndex = -1;
      state.currentQuestion = null;
      renderQuestion(state);
      return;
    }
    const bounded = Math.max(0, Math.min(nextIndex, state.filteredSegments.length - 1));
    state.currentIndex = bounded;
    const segment = state.filteredSegments[bounded];
    const q = buildOptionsForSegment(segment, state);
    state.currentQuestion = { ...q, segment };
    localStorage.setItem(STORAGE_KEYS.lastSegmentId, segment.id);
    renderQuestion(state);
  }

  function loadFromSavedPosition(state) {
    const savedId = localStorage.getItem(STORAGE_KEYS.lastSegmentId);
    const idx = state.filteredSegments.findIndex((s) => s.id === savedId);
    moveToIndex(state, idx >= 0 ? idx : 0);
  }

  function applyFilter(state, moduleId) {
    const value = moduleId || 'all';
    state.filteredSegments = value === 'all'
      ? state.segments.slice()
      : state.segments.filter((s) => s.moduleId === value);
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

    if (playBtn) {
      playBtn.addEventListener('click', () => updateVideo(state, true));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => moveToIndex(state, state.currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => moveToIndex(state, state.currentIndex + 1));
    if (randomBtn) randomBtn.addEventListener('click', () => moveToIndex(state, Math.floor(Math.random() * Math.max(1, state.filteredSegments.length))));

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
  }

  function init() {
    const ref = window.ROAD_TEST_REFERENCE;
    if (!ref || !Array.isArray(ref.segments) || !ref.segments.length) return;
    const state = createState(ref);
    const urlInput = qs('roadTestYoutubeUrlInput');
    const savedUrl = localStorage.getItem(STORAGE_KEYS.youtubeUrl) || DEFAULT_URL;
    state.currentUrl = savedUrl;
    state.currentVideoId = extractYouTubeVideoId(savedUrl);
    if (urlInput) urlInput.value = savedUrl;
    populateModuleSelect(state);
    bindEvents(state);
    const moduleSelect = qs('roadTestModuleSelect');
    applyFilter(state, moduleSelect ? moduleSelect.value : 'all');

    const sourceLabel = qs('roadTestSourceLabel');
    if (sourceLabel) {
      sourceLabel.textContent = `影片來源：YouTube｜字幕來源：captions.sbv｜預設前後 ${ref.defaults?.clipLeadSeconds ?? 2} 秒`;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
  window.RoadTestSim = { init };
}());
