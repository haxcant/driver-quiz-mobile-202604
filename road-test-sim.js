(function () {
  const STORAGE_KEYS = {
    youtubeUrl: 'roadTest.youtubeUrl',
    lastSegmentId: 'roadTest.lastSegmentId',
    moduleFilter: 'roadTest.moduleFilter',
    muted: 'roadTest.muted',
    autoplayNav: 'roadTest.autoplayNav',
    autoAdvance: 'roadTest.autoAdvance',
    advanceDelaySec: 'roadTest.advanceDelaySec',
    roadPanelOpen: 'roadTest.roadPanelOpen',
    configPanelOpen: 'roadTest.configPanelOpen',
    chainMode: 'roadTest.chainMode'
  };

  const DEFAULT_URL = 'https://www.youtube.com/watch?v=ldsprS-5Y9E';
  const DEFAULT_SETTINGS = { muted: true, autoplayNav: true, autoAdvance: true, advanceDelaySec: 0.5 };

  function qs(id) { return document.getElementById(id); }
  function safeText(v) { return String(v || '').trim(); }
  function readBool(key, fallback) { const raw = localStorage.getItem(key); return raw == null ? fallback : raw === 'true'; }
  function readNumber(key, fallback, min, max) { const n = Number(localStorage.getItem(key)); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback; }
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function formatTime(seconds) { const total = Math.max(0, Math.floor(Number(seconds) || 0)); return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`; }

  function standardizeRoadText(text) {
    let t = safeText(text)
      .replace(/【?油量、?溫度、?引擎、?電瓶、?手煞車燈、?機油\s*正常】?/g, '（溫度、油量、煞車、充電、機油）正常')
      .replace(/開啟紅火[:：]?/g, '')
      .replace(/觀察儀表/g, '檢查儀表')
      .replace(/\s+/g, ' ')
      .trim();
    if (/儀表/.test(t) && /(溫度|油量|煞車|充電|機油)/.test(t)) {
      t = t.replace(/（?溫度、油量、煞車、充電、機油）?正常/g, '（溫度、油量、煞車、充電、機油）正常');
    }
    return t;
  }
  function normalizeAnswerText(text) {
    return standardizeRoadText(text)
      .replace(/\s+/g, ' ')
      .replace(/[【】「」『』（）()，,。；;：:]/g, '')
      .trim();
  }
  function canonicalAnswerText(text) {
    return normalizeAnswerText(text)
      .replace(/再次|再度|先|後|然後|並|且|再看|確認|口誦|注意|留意|隨時|進行|本次|這一步/g, '')
      .replace(/前方路口|通過路口前/g, '路口')
      .replace(/左右無來車|後方無來車/g, '無來車')
      .replace(/轉頭察看|轉頭查看|察看|查看/g, '查看')
      .replace(/照後鏡|後照鏡/g, '照後鏡')
      .replace(/變換車道|切入主線道|切回主線道/g, '變換車道')
      .replace(/打左邊方向燈|打左方向燈/g, '左方向燈')
      .replace(/打右邊方向燈|打右方向燈/g, '右方向燈')
      .replace(/\s+/g, '')
      .trim();
  }
  function buildBigrams(text) { const s = canonicalAnswerText(text); const grams = new Set(); if (!s) return grams; if (s.length === 1) { grams.add(s); return grams; } for (let i = 0; i < s.length - 1; i += 1) grams.add(s.slice(i, i + 2)); return grams; }
  function textSimilarity(a, b) { const ca = canonicalAnswerText(a); const cb = canonicalAnswerText(b); if (!ca || !cb) return 0; if (ca === cb) return 1; if (ca.includes(cb) || cb.includes(ca)) return 0.95; const ga = buildBigrams(ca); const gb = buildBigrams(cb); let inter = 0; ga.forEach((g) => { if (gb.has(g)) inter += 1; }); return inter / Math.max(ga.size || 1, gb.size || 1); }

  function detectAnswerFamily(text) {
    const t = canonicalAnswerText(text);
    if (!t) return 'unknown';
    if (/胎紋|胎壓|輪胎/.test(t)) return 'tire_check';
    if (/車燈無破損|車燈/.test(t)) return 'light_check';
    if (/車底無異物/.test(t)) return 'undercarriage_check';
    if (/兩段式開車門|開車門/.test(t)) return 'door_check';
    if (/調整座椅|調整椅背|調整頭枕/.test(t)) return 'seat_adjust';
    if (/安全帶/.test(t)) return 'seatbelt';
    if (/檢查儀表|溫度油量煞車充電機油/.test(t)) return 'instrument_check';
    if (/試踩煞車|煞車正常/.test(t)) return 'brake_check';
    if (/方向燈正常|試打方向燈/.test(t)) return 'signal_check';
    if (/左方向燈/.test(t) && /起步|起駛|準備起步/.test(t)) return 'start_signal_left';
    if (/右方向燈/.test(t) && /靠邊|臨時停車/.test(t)) return 'roadside_stop_signal';
    if (/左方向燈/.test(t) && /變換車道|主線/.test(t)) return 'lane_change_left';
    if (/右方向燈/.test(t) && /變換車道/.test(t)) return 'lane_change_right';
    if (/路口|左右無來車/.test(t)) return 'intersection_scan';
    if (/照後鏡|死角|左後方|右後方|B柱|45度/.test(t)) return 'mirror_blindspot_check';
    if (/不要壓到|車道線間距|車道線|直線路段/.test(t)) return 'lane_keeping';
    if (/路邊臨時停車完畢|拉手煞車|打P檔/.test(t)) return 'roadside_stop_complete';
    if (/切入主線|主線道/.test(t)) return 'merge_main_lane';
    if (/迴轉/.test(t)) return 'u_turn';
    if (/熄火|解開安全帶|椅子退後|下車/.test(t)) return 'finish_stop';
    return 'unknown';
  }

  function isQuizworthyText(text) {
    const t = safeText(text);
    if (!t) return false;
    return !/(歡迎|駕訓班|TOYOTA|本班|介紹親友|良好學習環境|今天示範的也是新車|影片介紹到這裡|謝謝大家|再見|車棚|颱風|大雨考試|用心)/.test(t);
  }

  function isAmbiguousDistractor(correctQuestion, candidateQuestion) {
    const correctText = safeText(correctQuestion.answerText || correctQuestion.captionText || '');
    const candidateText = safeText(candidateQuestion.answerText || candidateQuestion.captionText || '');
    const correctFamily = detectAnswerFamily(correctText);
    const candidateFamily = detectAnswerFamily(candidateText);
    if (!candidateText) return true;
    if (correctFamily === candidateFamily && correctFamily !== 'unknown') return true;
    if (textSimilarity(correctText, candidateText) >= 0.55) return true;
    return false;
  }

  function shortLabelForQuestion(q) {
    const text = standardizeRoadText(q.answerText || q.captionText || '')
      .replace(/^[(（][^）)]*[)）]\s*/, '')
      .replace(/【/g, '').replace(/】/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return text.length > 34 ? `${text.slice(0, 34)}…` : text;
  }

  function extractYouTubeVideoId(url) {
    const text = safeText(url);
    if (!text) return '';
    try {
      const parsed = new URL(text);
      if (parsed.hostname.includes('youtu.be')) return parsed.pathname.replace(/^\//, '').trim();
      if (parsed.searchParams.get('v')) return parsed.searchParams.get('v').trim();
      const parts = parsed.pathname.split('/').filter(Boolean);
      const idx = parts.indexOf('embed');
      if (idx >= 0 && parts[idx + 1]) return parts[idx + 1].trim();
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
    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?start=${start}&end=${end}&autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&rel=0&playsinline=1&modestbranding=1&controls=1`;
  }
  function buildWatchUrl(videoId, startSec) {
    if (!videoId) return DEFAULT_URL;
    const start = Math.max(0, Math.floor(Number(startSec) || 0));
    return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&t=${start}s`;
  }

  function buildQuestionBank(ref) {
    const modules = new Map((ref.modules || []).map((m) => [m.id, { ...m, summary: standardizeRoadText(m.summary || '') }]));
    return (ref.segments || []).filter((seg) => isQuizworthyText(seg.answerText || seg.captionText || '')).map((seg, idx) => {
      const mod = modules.get(seg.moduleId) || {};
      const answerText = standardizeRoadText(seg.answerText || seg.captionText || '');
      const captionText = standardizeRoadText(seg.captionText || answerText);
      return {
        bankId: `RT-${String(idx + 1).padStart(3, '0')}`,
        segmentId: seg.id,
        moduleId: seg.moduleId,
        moduleTitle: mod.title || '未分類模組',
        prompt: '依影片字幕與畫面，這一步最正確的作法是？',
        answerText,
        captionText,
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

  function buildOptionsForQuestion(question, state) {
    const correct = safeText(question.answerText || question.captionText || '');
    const correctNorm = normalizeAnswerText(correct);
    const sameModule = state.questionBank.filter((q) => q.segmentId !== question.segmentId && q.moduleId === question.moduleId);
    const otherModules = state.questionBank.filter((q) => q.segmentId !== question.segmentId && q.moduleId !== question.moduleId);
    const allOthers = state.questionBank.filter((q) => q.segmentId !== question.segmentId);
    const options = [];
    const used = new Set([correctNorm]);
    function tryPush(candidate) {
      if (!candidate || isAmbiguousDistractor(question, candidate)) return false;
      const raw = safeText(candidate.answerText || candidate.captionText || '');
      const norm = normalizeAnswerText(raw);
      if (!raw || !norm || used.has(norm)) return false;
      used.add(norm); options.push(raw); return true;
    }
    shuffle(otherModules).forEach((q) => { if (options.length < 3) tryPush(q); });
    if (options.length < 3) shuffle(sameModule).forEach((q) => { if (options.length < 3) tryPush(q); });
    if (options.length < 3) shuffle(allOthers).forEach((q) => { if (options.length < 3) tryPush(q); });
    const finalOptions = shuffle([correct, ...options.slice(0, 3)]);
    return { correct, correctNorm, options: finalOptions, correctIndex: finalOptions.findIndex((o) => normalizeAnswerText(o) === correctNorm) };
  }

  function isChainLowSignal(q) {
    const text = safeText(q.answerText || q.captionText || '');
    const family = detectAnswerFamily(text);
    if (!text) return true;
    if (/(B柱|45度|視線死角|恭喜拿到駕照|發動後先開冷氣|燈號熄滅代表正常|看左後方後方無來車)/.test(text)) return true;
    return family === 'mirror_blindspot_check' || family === 'lane_keeping';
  }

  function compressForChain(items) {
    const sorted = items.slice().sort((a, b) => a.startSec - b.startSec);
    const out = [];
    let prev = null;
    sorted.forEach((q) => {
      if (isChainLowSignal(q)) return;
      if (prev) {
        const sameFamily = detectAnswerFamily(prev.answerText) === detectAnswerFamily(q.answerText);
        const veryClose = textSimilarity(prev.answerText, q.answerText) >= 0.72;
        const nearTime = Math.abs((q.startSec || 0) - (prev.startSec || 0)) <= 18;
        if ((sameFamily && nearTime) || veryClose) return;
      }
      out.push(q);
      prev = q;
    });
    return out;
  }

  function createState(ref) {
    const questionBank = buildQuestionBank(ref);
    const modules = Array.isArray(ref.modules) ? ref.modules.map((m) => ({ ...m, summary: standardizeRoadText(m.summary || '') })) : [];
    return {
      ref,
      questionBank,
      modules,
      moduleMap: new Map(modules.map((m) => [m.id, m])),
      filteredQuestions: questionBank.slice(),
      currentIndex: -1,
      currentQuestion: null,
      currentVideoId: '',
      currentUrl: '',
      pendingAdvanceTimer: null,
      answered: false,
      mcq: null,
      settings: {
        muted: readBool(STORAGE_KEYS.muted, DEFAULT_SETTINGS.muted),
        autoplayNav: readBool(STORAGE_KEYS.autoplayNav, DEFAULT_SETTINGS.autoplayNav),
        autoAdvance: readBool(STORAGE_KEYS.autoAdvance, DEFAULT_SETTINGS.autoAdvance),
        advanceDelaySec: readNumber(STORAGE_KEYS.advanceDelaySec, DEFAULT_SETTINGS.advanceDelaySec, 0.5, 5)
      },
      chain: {
        mode: localStorage.getItem(STORAGE_KEYS.chainMode) || 'caption',
        source: [],
        sequence: [],
        index: 0,
        windowStart: 0,
        completed: [],
        anchorPool: [],
        anchorPos: 0
      }
    };
  }

  function clearPendingAdvance(state) {
    if (state.pendingAdvanceTimer) { clearTimeout(state.pendingAdvanceTimer); state.pendingAdvanceTimer = null; }
    const exam = qs('roadTestExamStatus'); if (exam) exam.textContent = '';
  }

  function updateHeaderMeta(state) {
    const sourceLabel = qs('roadTestSourceLabel');
    const bankMeta = qs('roadTestBankMeta');
    const flowHint = qs('roadTestFlowHint');
    const usageNote = qs('roadTestUsageNote');
    const versionNote = qs('roadTestVersionNote');
    if (sourceLabel) sourceLabel.textContent = `影片來源：YouTube｜字幕來源：captions.sbv｜片段前後各 1 秒`;
    if (bankMeta) bankMeta.textContent = `已編成題庫 ${state.questionBank.length} 題，共 ${state.modules.length} 類模組；目前篩選後 ${state.filteredQuestions.length} 題。`;
    if (flowHint) flowHint.textContent = `目前設定：${state.settings.muted ? '靜音' : '開聲'}｜${state.settings.autoplayNav ? '切題自動播放' : '切題手動播放'}｜${state.settings.autoAdvance ? `答題後 ${state.settings.advanceDelaySec.toFixed(1)} 秒自動跳題` : '答題後停留本題'}`;
    if (usageNote) usageNote.textContent = '使用說明：四選一看主影片；字幕接龍先看目前這一步，再選下一段。';
    if (versionNote) versionNote.textContent = '版本資訊：RoadTest UI v21.3｜資訊區可收納、接龍區配色整理。';
  }

  function syncSettingControls(state) {
    const muted = qs('roadTestMutedToggle');
    const autoplay = qs('roadTestAutoplayNextToggle');
    const autoAdvance = qs('roadTestAutoAdvanceToggle');
    const delayInput = qs('roadTestAdvanceDelayInput');
    const chainMode = qs('roadTestChainModeSelect');
    if (muted) muted.checked = !!state.settings.muted;
    if (autoplay) autoplay.checked = !!state.settings.autoplayNav;
    if (autoAdvance) autoAdvance.checked = !!state.settings.autoAdvance;
    if (delayInput) delayInput.value = String(state.settings.advanceDelaySec);
    if (chainMode) chainMode.value = state.chain.mode;
  }

  function updateVideoForQuestion(state, question, autoplay) {
    const iframe = qs('roadTestVideoFrame');
    const openBtn = qs('roadTestOpenYoutubeBtn');
    const status = qs('roadTestVideoStatus');
    if (!iframe) return;
    if (!question) {
      iframe.removeAttribute('src');
      if (status) status.textContent = '尚未播放片段。';
      return;
    }
    if (!state.currentVideoId) {
      iframe.removeAttribute('src');
      if (status) status.textContent = '尚未填入可用的 YouTube 網址。';
      if (openBtn) openBtn.href = DEFAULT_URL;
      return;
    }
    iframe.src = buildEmbedUrl(state.currentVideoId, question.clipStartSec, question.clipEndSec, autoplay, state.settings.muted);
    if (openBtn) openBtn.href = buildWatchUrl(state.currentVideoId, question.clipStartSec);
    if (status) status.textContent = `題庫編碼 ${question.bankId}｜片段 ${formatTime(question.clipStartSec)} - ${formatTime(question.clipEndSec)}｜題點 ${formatTime(question.startSec)}｜${state.settings.muted ? '預設靜音' : '目前開聲'}`;
  }


  function updateChainVideo(state, question, autoplay) {
    const iframe = qs('roadTestChainVideoFrame');
    const label = qs('roadTestChainClipLabel');
    if (!iframe) return;
    if (!question || !state.currentVideoId) {
      iframe.removeAttribute('src');
      if (label) label.textContent = '尚未載入片段。';
      return;
    }
    iframe.src = buildEmbedUrl(state.currentVideoId, question.clipStartSec, question.clipEndSec, autoplay, state.settings.muted);
    if (label) label.textContent = `${question.bankId}｜${formatTime(question.startSec)} - ${formatTime(question.endSec)}｜播放 ${formatTime(question.clipStartSec)} - ${formatTime(question.clipEndSec)}`;
  }

  function chainCandidatePool(state, mode) {
    const source = buildChainSource(state, mode);
    const sequence = source.length >= 4 ? source : compressForChain(state.questionBank);
    const minLen = Math.min(6, sequence.length);
    const maxLen = Math.min(8, sequence.length);
    const pool = [];
    if (sequence.length < 4) return { sequence, pool: [{ start: 0, len: sequence.length }] };
    for (let len = minLen; len <= maxLen; len += 1) {
      for (let start = 0; start <= sequence.length - len; start += 1) {
        pool.push({ start, len });
      }
    }
    return { sequence, pool: pool.length ? pool : [{ start: 0, len: sequence.length }] };
  }

  function applyFilter(state, moduleId) {
    const value = moduleId || 'all';
    state.filteredQuestions = value === 'all' ? state.questionBank.slice() : state.questionBank.filter((q) => q.moduleId === value);
    localStorage.setItem(STORAGE_KEYS.moduleFilter, value);
    const savedId = localStorage.getItem(STORAGE_KEYS.lastSegmentId);
    const idx = state.filteredQuestions.findIndex((q) => q.segmentId === savedId);
    moveToIndex(state, idx >= 0 ? idx : 0, { autoplay: false });
    buildChainQuiz(state);
  }

  function populateModuleSelect(state) {
    const select = qs('roadTestModuleSelect');
    if (!select) return;
    select.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = `全部模組（${state.modules.length} 類）`;
    select.appendChild(allOpt);
    state.modules.forEach((mod) => { const opt = document.createElement('option'); opt.value = mod.id; opt.textContent = mod.title; select.appendChild(opt); });
    select.value = localStorage.getItem(STORAGE_KEYS.moduleFilter) || 'all';
  }

  function moveToIndex(state, nextIndex, options) {
    clearPendingAdvance(state);
    if (!state.filteredQuestions.length) {
      state.currentIndex = -1; state.currentQuestion = null; state.mcq = null; renderQuestion(state); return;
    }
    const bounded = Math.max(0, Math.min(nextIndex, state.filteredQuestions.length - 1));
    state.currentIndex = bounded;
    state.currentQuestion = state.filteredQuestions[bounded];
    localStorage.setItem(STORAGE_KEYS.lastSegmentId, state.currentQuestion.segmentId);
    state.mcq = buildOptionsForQuestion(state.currentQuestion, state);
    renderQuestion(state);
    if ((options || {}).autoplay) updateVideoForQuestion(state, state.currentQuestion, true);
  }

  function renderQuestion(state) {
    const wrap = qs('roadTestQuestionWrap');
    const empty = qs('roadTestEmpty');
    const moduleLabel = qs('roadTestModuleLabel');
    const prompt = qs('roadTestPrompt');
    const optionsEl = qs('roadTestOptions');
    const feedback = qs('roadTestFeedback');
    const note = qs('roadTestReferenceNote');
    const segMeta = qs('roadTestSegmentMeta');
    const answerBox = qs('roadTestAnswerBox');
    const answerText = qs('roadTestAnswerText');
    const progress = qs('roadTestProgress');
    if (!wrap || !empty || !optionsEl || !feedback || !note || !segMeta || !answerBox || !answerText || !progress || !prompt || !moduleLabel) return;
    updateHeaderMeta(state);
    if (!state.currentQuestion || !state.mcq) {
      wrap.classList.add('hidden'); empty.classList.remove('hidden'); progress.textContent = `目前共有 ${state.filteredQuestions.length} 題可練習。`; return;
    }
    empty.classList.add('hidden'); wrap.classList.remove('hidden');
    const q = state.currentQuestion;
    const mod = state.moduleMap.get(q.moduleId);
    state.answered = false;
    feedback.textContent = ''; feedback.className = 'roadtest-feedback';
    answerBox.classList.add('hidden');
    const toggle = qs('roadTestShowAnswerBtn'); if (toggle) toggle.textContent = '顯示字幕答案';
    answerText.textContent = q.captionText || q.answerText || '（無字幕答案）';
    progress.textContent = `第 ${state.currentIndex + 1} / ${state.filteredQuestions.length} 題`;
    prompt.textContent = q.prompt || '依影片字幕與畫面，這一步最正確的作法是？';
    moduleLabel.textContent = mod ? mod.title : q.moduleTitle || '未分類模組';
    segMeta.textContent = `題庫編碼 ${q.bankId}｜字幕 ${formatTime(q.startSec)} - ${formatTime(q.endSec)}｜模組重點：${mod ? mod.summary : q.moduleSummary || '依字幕判定'}`;
    note.textContent = '答案以字幕內容為主；若整理文字與字幕有差異，請以字幕為準。';
    optionsEl.innerHTML = '';
    state.mcq.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'roadtest-option-btn';
      btn.innerHTML = `<span class="roadtest-option-index">${idx + 1}</span><span class="roadtest-option-text">${opt || '（無文字）'}</span>`;
      btn.addEventListener('click', () => submitMcqAnswer(state, idx));
      optionsEl.appendChild(btn);
    });
    updateVideoForQuestion(state, q, false);
  }

  function scheduleAutoAdvance(state) {
    const examStatus = qs('roadTestExamStatus');
    if (state.settings.autoAdvance && state.currentIndex < state.filteredQuestions.length - 1) {
      const delayMs = Math.round(state.settings.advanceDelaySec * 1000);
      if (examStatus) examStatus.textContent = `${state.settings.advanceDelaySec.toFixed(1)} 秒後自動前往下一題${state.settings.autoplayNav ? '並播放片段' : ''}。`;
      state.pendingAdvanceTimer = setTimeout(() => moveToIndex(state, state.currentIndex + 1, { autoplay: state.settings.autoplayNav }), delayMs);
    } else if (examStatus) {
      examStatus.textContent = state.currentIndex >= state.filteredQuestions.length - 1 ? '已到最後一題。' : '已停留本題。';
    }
  }

  function submitMcqAnswer(state, chosenIndex) {
    if (state.answered || !state.mcq) return;
    state.answered = true;
    const optionsEl = qs('roadTestOptions');
    const feedback = qs('roadTestFeedback');
    if (!optionsEl || !feedback) return;
    Array.from(optionsEl.querySelectorAll('button')).forEach((node, idx) => {
      node.disabled = true;
      if (idx === state.mcq.correctIndex) node.classList.add('correct');
      if (idx === chosenIndex && idx !== state.mcq.correctIndex) node.classList.add('incorrect');
    });
    const isCorrect = chosenIndex === state.mcq.correctIndex;
    feedback.textContent = isCorrect ? '答對：這一題以字幕內容為準。' : '答錯：請對照字幕答案與模組重點。';
    feedback.className = `roadtest-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`;
    scheduleAutoAdvance(state);
  }

  function buildChainSource(state, mode) {
    if (mode === 'module') {
      const selectedModule = localStorage.getItem(STORAGE_KEYS.moduleFilter) || 'all';
      let pool = [];
      if (selectedModule !== 'all') pool = state.questionBank.filter((q) => q.moduleId === selectedModule);
      else {
        const groups = new Map();
        state.questionBank.forEach((q) => {
          if (!groups.has(q.moduleId)) groups.set(q.moduleId, []);
          groups.get(q.moduleId).push(q);
        });
        const goodGroups = Array.from(groups.values()).map((g) => compressForChain(g)).filter((g) => g.length >= 5);
        pool = goodGroups.length ? goodGroups[Math.floor(Math.random() * goodGroups.length)] : state.filteredQuestions;
      }
      return compressForChain(pool);
    }
    return compressForChain(state.filteredQuestions);
  }

  function buildChainQuiz(state, opts = {}) {
    const mode = opts.mode || state.chain.mode;
    state.chain.mode = mode;
    const { sequence, pool } = chainCandidatePool(state, mode);
    state.chain.source = sequence;
    state.chain.anchorPool = pool;
    let anchorPos = Number.isInteger(opts.anchorPos) ? opts.anchorPos : state.chain.anchorPos;
    if (!Number.isFinite(anchorPos) || anchorPos < 0 || anchorPos >= pool.length) anchorPos = 0;
    if (opts.random) anchorPos = Math.floor(Math.random() * Math.max(1, pool.length));
    const picked = pool[anchorPos] || { start: 0, len: sequence.length };
    state.chain.anchorPos = anchorPos;
    state.chain.sequence = sequence.slice(picked.start, picked.start + picked.len);
    state.chain.windowStart = picked.start;
    state.chain.index = 0;
    state.chain.completed = [];
    renderChain(state);
  }

  function moveChainWindow(state, delta, randomPick) {
    const pool = state.chain.anchorPool || [];
    if (!pool.length) {
      buildChainQuiz(state, { random: !!randomPick });
      return;
    }
    let nextPos = state.chain.anchorPos || 0;
    if (randomPick) nextPos = Math.floor(Math.random() * pool.length);
    else nextPos = (nextPos + delta + pool.length) % pool.length;
    buildChainQuiz(state, { anchorPos: nextPos });
  }

  function buildChainOptions(state) {
    const chain = state.chain;
    const current = chain.sequence[chain.index];
    const correct = chain.sequence[chain.index + 1];
    if (!current || !correct) return [];
    const pool = chain.sequence.filter((q, idx) => idx !== chain.index && idx !== chain.index + 1);
    const correctFamily = detectAnswerFamily(correct.answerText || correct.captionText);
    const distractors = [];
    shuffle(pool).forEach((q) => {
      if (distractors.length >= 3) return;
      const fam = detectAnswerFamily(q.answerText || q.captionText);
      const sim = textSimilarity(q.answerText || q.captionText, correct.answerText || correct.captionText);
      if (fam === correctFamily && fam !== 'unknown') return;
      if (sim >= 0.55) return;
      distractors.push(q);
    });
    if (distractors.length < 3) {
      shuffle(pool).forEach((q) => {
        if (distractors.length >= 3) return;
        if (distractors.find((x) => x.segmentId === q.segmentId)) return;
        distractors.push(q);
      });
    }
    return shuffle([correct, ...distractors.slice(0, 3)]);
  }

  function renderCompletedList(state) {
    const el = qs('roadTestChainCompletedList');
    if (!el) return;
    const done = state.chain.sequence.slice(0, state.chain.index);
    if (!done.length) { el.className = 'roadtest-chain-completed-list empty-state'; el.textContent = '目前尚未完成任何步驟。'; return; }
    el.className = 'roadtest-chain-completed-list';
    el.innerHTML = done.map((q, idx) => `<div class="roadtest-chain-completed-item"><span class="roadtest-chain-completed-index">${idx + 1}</span><span>${shortLabelForQuestion(q)}</span></div>`).join('');
  }

  function renderChain(state) {
    const currentText = qs('roadTestChainCurrentText');
    const meta = qs('roadTestChainMeta');
    const stepMeta = qs('roadTestChainStepMeta');
    const optionsEl = qs('roadTestChainNextOptions');
    const feedback = qs('roadTestChainFeedback');
    const resultBox = qs('roadTestChainResultBox');
    const resultText = qs('roadTestChainResultText');
    if (!currentText || !meta || !stepMeta || !optionsEl || !feedback || !resultBox || !resultText) return;
    const chain = state.chain;
    const current = chain.sequence[chain.index];
    meta.textContent = chain.mode === 'module' ? `模組流程接續｜第 ${chain.anchorPos + 1} 組，共 ${Math.max(1, chain.anchorPool.length)} 組` : `字幕流程接續｜第 ${chain.anchorPos + 1} 組，共 ${Math.max(1, chain.anchorPool.length)} 組`; 
    feedback.textContent = ''; feedback.className = 'roadtest-feedback';
    resultBox.classList.add('hidden');
    renderCompletedList(state);
    if (!current) {
      currentText.textContent = '目前沒有可用的接龍題。';
      stepMeta.textContent = '';
      optionsEl.innerHTML = '';
      updateChainVideo(state, null, false);
      return;
    }
    currentText.textContent = current.captionText || current.answerText || '（無文字）';
    stepMeta.textContent = `${current.bankId}｜${formatTime(current.startSec)} - ${formatTime(current.endSec)}｜${current.moduleTitle}`;
    updateVideoForQuestion(state, current, false);
    updateChainVideo(state, current, false);
    if (chain.index >= chain.sequence.length - 1) {
      optionsEl.innerHTML = '';
      feedback.textContent = '這是本組最後一步，已完成這一組接龍。';
      feedback.className = 'roadtest-feedback is-correct';
      resultBox.classList.remove('hidden');
      resultText.textContent = chain.sequence.map((q, idx) => `${idx + 1}. ${shortLabelForQuestion(q)}`).join(' → ');
      return;
    }
    const options = buildChainOptions(state);
    optionsEl.innerHTML = '';
    options.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'roadtest-option-btn';
      btn.innerHTML = `<span class="roadtest-option-index">${idx + 1}</span><span class="roadtest-option-text">${shortLabelForQuestion(q)}<br><small>${q.moduleTitle}</small></span>`;
      btn.addEventListener('click', () => submitChainAnswer(state, q, btn));
      optionsEl.appendChild(btn);
    });
  }

  function submitChainAnswer(state, chosenQuestion, btn) {
    const feedback = qs('roadTestChainFeedback');
    const optionsEl = qs('roadTestChainNextOptions');
    if (!feedback || !optionsEl) return;
    const correct = state.chain.sequence[state.chain.index + 1];
    if (!correct) return;
    if (chosenQuestion.segmentId === correct.segmentId) {
      btn.classList.add('correct');
      Array.from(optionsEl.querySelectorAll('button')).forEach((node) => { node.disabled = true; });
      feedback.textContent = '答對，已接到下一段。';
      feedback.className = 'roadtest-feedback is-correct';
      setTimeout(() => { state.chain.index += 1; renderChain(state); }, 450);
      return;
    }
    btn.disabled = true;
    btn.classList.add('incorrect');
    feedback.textContent = '這不是緊接的下一段，再試一次。';
    feedback.className = 'roadtest-feedback is-wrong';
  }

  function applyPanelOpenStates() {
    const roadDetails = qs('roadTestDetails');
    const infoDetails = qs('roadTestInfoDetails');
    const configDetails = qs('roadTestConfigDetails');
    if (roadDetails) { roadDetails.open = readBool(STORAGE_KEYS.roadPanelOpen, true); roadDetails.addEventListener('toggle', () => localStorage.setItem(STORAGE_KEYS.roadPanelOpen, String(roadDetails.open))); }
    if (infoDetails) { infoDetails.open = readBool(STORAGE_KEYS.infoPanelOpen, true); infoDetails.addEventListener('toggle', () => localStorage.setItem(STORAGE_KEYS.infoPanelOpen, String(infoDetails.open))); }
    if (configDetails) { configDetails.open = readBool(STORAGE_KEYS.configPanelOpen, false); configDetails.addEventListener('toggle', () => localStorage.setItem(STORAGE_KEYS.configPanelOpen, String(configDetails.open))); }
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
    const chainModeSelect = qs('roadTestChainModeSelect');
    const chainRefreshBtn = qs('roadTestChainRefreshBtn');
    const chainPrevBtn = qs('roadTestChainPrevBtn');
    const chainNextBtn = qs('roadTestChainNextBtn');
    const chainRandomBtn = qs('roadTestChainRandomBtn');
    const chainPlayBtn = qs('roadTestChainPlayBtn');

    if (saveUrlBtn && urlInput) saveUrlBtn.addEventListener('click', () => {
      const value = safeText(urlInput.value) || DEFAULT_URL;
      state.currentUrl = value; state.currentVideoId = extractYouTubeVideoId(value);
      localStorage.setItem(STORAGE_KEYS.youtubeUrl, value);
      updateVideoForQuestion(state, state.currentQuestion || state.chain.sequence[state.chain.index], false);
    });
    if (useDefaultBtn && urlInput) useDefaultBtn.addEventListener('click', () => {
      urlInput.value = DEFAULT_URL; state.currentUrl = DEFAULT_URL; state.currentVideoId = extractYouTubeVideoId(DEFAULT_URL);
      localStorage.setItem(STORAGE_KEYS.youtubeUrl, DEFAULT_URL);
      updateVideoForQuestion(state, state.currentQuestion || state.chain.sequence[state.chain.index], false);
    });
    if (playBtn) playBtn.addEventListener('click', () => updateVideoForQuestion(state, state.currentQuestion || state.chain.sequence[state.chain.index], true));
    if (prevBtn) prevBtn.addEventListener('click', () => moveToIndex(state, state.currentIndex - 1, { autoplay: state.settings.autoplayNav }));
    if (nextBtn) nextBtn.addEventListener('click', () => moveToIndex(state, state.currentIndex + 1, { autoplay: state.settings.autoplayNav }));
    if (randomBtn) randomBtn.addEventListener('click', () => moveToIndex(state, Math.floor(Math.random() * Math.max(1, state.filteredQuestions.length)), { autoplay: state.settings.autoplayNav }));
    if (moduleSelect) moduleSelect.addEventListener('change', () => applyFilter(state, moduleSelect.value));
    if (answerToggle) answerToggle.addEventListener('click', () => {
      const box = qs('roadTestAnswerBox'); if (!box) return;
      const hidden = box.classList.contains('hidden'); box.classList.toggle('hidden', !hidden); answerToggle.textContent = hidden ? '隱藏字幕答案' : '顯示字幕答案';
    });
    if (mutedToggle) mutedToggle.addEventListener('change', () => { state.settings.muted = !!mutedToggle.checked; localStorage.setItem(STORAGE_KEYS.muted, String(state.settings.muted)); updateHeaderMeta(state); updateVideoForQuestion(state, state.currentQuestion || state.chain.sequence[state.chain.index], false); });
    if (autoplayToggle) autoplayToggle.addEventListener('change', () => { state.settings.autoplayNav = !!autoplayToggle.checked; localStorage.setItem(STORAGE_KEYS.autoplayNav, String(state.settings.autoplayNav)); updateHeaderMeta(state); });
    if (autoAdvanceToggle) autoAdvanceToggle.addEventListener('change', () => { state.settings.autoAdvance = !!autoAdvanceToggle.checked; localStorage.setItem(STORAGE_KEYS.autoAdvance, String(state.settings.autoAdvance)); clearPendingAdvance(state); updateHeaderMeta(state); });
    if (delayInput) delayInput.addEventListener('change', () => { state.settings.advanceDelaySec = Math.min(5, Math.max(0.5, Number(delayInput.value) || DEFAULT_SETTINGS.advanceDelaySec)); delayInput.value = String(state.settings.advanceDelaySec); localStorage.setItem(STORAGE_KEYS.advanceDelaySec, String(state.settings.advanceDelaySec)); updateHeaderMeta(state); });
    if (chainModeSelect) chainModeSelect.addEventListener('change', () => { state.chain.mode = chainModeSelect.value || 'caption'; localStorage.setItem(STORAGE_KEYS.chainMode, state.chain.mode); buildChainQuiz(state, { mode: state.chain.mode, random: true }); });
    if (chainRefreshBtn) chainRefreshBtn.addEventListener('click', () => buildChainQuiz(state, { random: true }));
    if (chainPrevBtn) chainPrevBtn.addEventListener('click', () => moveChainWindow(state, -1, false));
    if (chainNextBtn) chainNextBtn.addEventListener('click', () => moveChainWindow(state, 1, false));
    if (chainRandomBtn) chainRandomBtn.addEventListener('click', () => moveChainWindow(state, 0, true));
    if (chainPlayBtn) chainPlayBtn.addEventListener('click', () => updateChainVideo(state, state.chain.sequence[state.chain.index], true));
  }

  function init() {
    const ref = window.ROAD_TEST_REFERENCE;
    if (!ref || !Array.isArray(ref.segments) || !ref.segments.length) return;
    const state = createState(ref);
    window.ROAD_TEST_QUESTION_BANK = state.questionBank.slice();
    const urlInput = qs('roadTestYoutubeUrlInput');
    const savedUrl = localStorage.getItem(STORAGE_KEYS.youtubeUrl) || DEFAULT_URL;
    state.currentUrl = savedUrl; state.currentVideoId = extractYouTubeVideoId(savedUrl);
    if (urlInput) urlInput.value = savedUrl;
    applyPanelOpenStates();
    syncSettingControls(state);
    populateModuleSelect(state);
    bindEvents(state);
    const moduleSelect = qs('roadTestModuleSelect');
    applyFilter(state, moduleSelect ? moduleSelect.value : 'all');
    buildChainQuiz(state);
    updateHeaderMeta(state);
  }

  document.addEventListener('DOMContentLoaded', init);
  window.RoadTestSim = { init };
}());
