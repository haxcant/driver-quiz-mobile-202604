(function () {
  const STORAGE_KEYS = {
    youtubeUrl: 'roadTest.youtubeUrl',
    lastSegmentId: 'roadTest.lastSegmentId',
    moduleFilter: 'roadTest.moduleFilter',
    muted: 'roadTest.muted',
    autoplayNav: 'roadTest.autoplayNav',
    autoAdvance: 'roadTest.autoAdvance',
    advanceDelaySec: 'roadTest.advanceDelaySec',
    detailsOpen: 'roadTest.detailsOpen',
    settingsOpen: 'roadTest.settingsOpen',
    chainMode: 'roadTest.chainMode'
  };

  const DEFAULT_URL = 'https://www.youtube.com/watch?v=ldsprS-5Y9E';
  const DEFAULT_SETTINGS = {
    muted: true,
    autoplayNav: true,
    autoAdvance: true,
    advanceDelaySec: 0.5
  };

  const GENERIC_DISTRACTORS = [
    '上車前察看車輛四周、車底及輪胎有無異物',
    '調整座椅、頭枕與照後鏡，並繫妥安全帶',
    '（溫度、油量、煞車、充電、機油）正常',
    '起步前顯示方向燈，並確認前後左右安全',
    '行近路口先減速查看，確認左右無來車',
    '行近行人穿越道先減速查看，必要時停讓行人',
    '變換車道前顯示方向燈並確認側後方安全',
    '靠邊停車前顯示右方向燈並確認後方安全',
    '臨時停車完成後排入 P 檔並拉手煞車',
    '切回主線前顯示左方向燈並確認後方安全',
    '行駛中保持車身與車道線間距，不要壓線',
    '試踩煞車確認煞車正常',
    '試打左右方向燈確認方向燈正常',
    '準備起步時入 D 檔、放手煞車並起步',
    '考驗終點停妥後排入 P 檔、拉手煞車並熄火',
    '下車前採二段式開門並確認後方無來車'
  ];

  function qs(id) {
    return document.getElementById(id);
  }

  function safeText(v) {
    return String(v || '').replace(/\s+/g, ' ').trim();
  }

  function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function normalizeAnswerText(text) {
    return safeText(text)
      .replace(/[【】「」『』（）()，,。；;：:]/g, '')
      .replace(/\s+/g, '')
      .trim();
  }

  function canonicalAnswerText(text) {
    return normalizeAnswerText(text)
      .replace(/再次|再度|再|先|後|然後|並|且|口誦|注意|留意|隨時|進行|本次|這一步/g, '')
      .replace(/前方路口|通過路口前/g, '路口')
      .replace(/左右無來車|後方無來車/g, '無來車')
      .replace(/轉頭察看|轉頭查看|察看|查看/g, '查看')
      .replace(/照後鏡|後照鏡/g, '照後鏡')
      .replace(/變換車道|切入主線道|切回主線道/g, '變換車道')
      .replace(/打左邊方向燈|打左方向燈/g, '左方向燈')
      .replace(/打右邊方向燈|打右方向燈/g, '右方向燈')
      .replace(/路邊臨時停車完畢/g, '路邊停車完成')
      .replace(/車道線間距|不要壓到左右車道線|不要壓線/g, '車道間距')
      .trim();
  }

  function buildBigrams(text) {
    const s = canonicalAnswerText(text);
    const grams = new Set();
    if (!s) return grams;
    if (s.length === 1) {
      grams.add(s);
      return grams;
    }
    for (let i = 0; i < s.length - 1; i += 1) grams.add(s.slice(i, i + 2));
    return grams;
  }

  function textSimilarity(a, b) {
    const ca = canonicalAnswerText(a);
    const cb = canonicalAnswerText(b);
    if (!ca || !cb) return 0;
    if (ca === cb) return 1;
    if (ca.includes(cb) || cb.includes(ca)) return 0.95;
    const ga = buildBigrams(ca);
    const gb = buildBigrams(cb);
    if (!ga.size || !gb.size) return 0;
    let inter = 0;
    ga.forEach((g) => { if (gb.has(g)) inter += 1; });
    return inter / Math.max(ga.size, gb.size);
  }

  function detectAnswerFamily(text) {
    const t = canonicalAnswerText(text);
    if (!t) return 'unknown';
    if (/胎紋|胎壓|輪胎/.test(t)) return 'tire_check';
    if (/車燈/.test(t)) return 'light_check';
    if (/車底無異物/.test(t)) return 'undercarriage_check';
    if (/兩段式開車門|開車門/.test(t)) return 'door_check';
    if (/調整座椅|調整椅背|調整頭枕/.test(t)) return 'seat_adjust';
    if (/安全帶/.test(t)) return 'seatbelt';
    if (/溫度|油量|煞車|充電|機油|儀表/.test(t)) return 'instrument_check';
    if (/試踩煞車|煞車正常/.test(t)) return 'brake_check';
    if (/試打.*方向燈|方向燈正常/.test(t)) return 'signal_check';
    if (/準備起步|起步|起駛/.test(t) && /D檔|手煞車|方向燈/.test(t)) return 'start_off';
    if (/路口|左右無來車/.test(t)) return 'intersection_scan';
    if (/照後鏡|死角|左後方|右後方/.test(t)) return 'mirror_check';
    if (/變換車道|主線/.test(t) && /左方向燈/.test(t)) return 'lane_change_left';
    if (/變換車道/.test(t) && /右方向燈/.test(t)) return 'lane_change_right';
    if (/車道間距|不壓線|車道線/.test(t)) return 'lane_keeping';
    if (/路邊臨時停車|靠邊停車/.test(t)) return 'roadside_stop';
    if (/P檔|拉手煞車|熄火/.test(t) && /停車|終點|下車/.test(t)) return 'finish_stop';
    if (/迴轉/.test(t)) return 'u_turn';
    return 'unknown';
  }

  function isWeakReminderText(text) {
    const t = safeText(text);
    return /B柱|頭需看到|車道線間距|不要壓到左右車道線|不要壓線|直線路段留意/.test(t);
  }

  function standardizeDisplayText(text) {
    let t = safeText(text)
      .replace(/\(發動後只會剩手煞車燈亮著\)/g, '')
      .replace(/[；;]+$/g, '')
      .trim();

    if (!t) return '';
    if (/油量|溫度|引擎|電瓶|機油|儀表/.test(t)) {
      return '（溫度、油量、煞車、充電、機油）正常';
    }
    return t;
  }

  function isQuizworthyText(text) {
    const t = safeText(text);
    if (!t) return false;
    if (/(歡迎|駕訓班|TOYOTA|本班|介紹親友|良好學習環境|今天示範的也是新車|影片介紹到這裡|謝謝大家|再見|車棚|颱風|大雨考試|用心)/.test(t)) return false;
    return true;
  }

  function isAmbiguousDistractor(correctQuestion, candidateQuestion) {
    const correctText = standardizeDisplayText(correctQuestion.answerText || correctQuestion.captionText || '');
    const candidateText = standardizeDisplayText(candidateQuestion.answerText || candidateQuestion.captionText || '');
    if (!candidateText) return true;
    const correctFamily = detectAnswerFamily(correctText);
    const candidateFamily = detectAnswerFamily(candidateText);
    if (correctFamily === candidateFamily && correctFamily !== 'unknown') return true;
    if (textSimilarity(correctText, candidateText) >= 0.5) return true;
    const nearPairs = new Set([
      'intersection_scan|lane_keeping',
      'lane_keeping|intersection_scan',
      'lane_change_left|mirror_check',
      'lane_change_right|mirror_check',
      'mirror_check|lane_change_left',
      'mirror_check|lane_change_right',
      'roadside_stop|finish_stop',
      'finish_stop|roadside_stop'
    ]);
    if (nearPairs.has(`${correctFamily}|${candidateFamily}`)) return true;
    return false;
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
      if (parsed.hostname.includes('youtu.be')) return parsed.pathname.replace(/^\//, '').trim();
      if (parsed.searchParams.get('v')) return parsed.searchParams.get('v').trim();
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
    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?start=${start}&end=${end}&autoplay=${autoplay ? 1 : 0}&mute=${muted ? 1 : 0}&rel=0&playsinline=1&modestbranding=1&controls=1`;
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
    return (ref.segments || [])
      .filter((seg) => isQuizworthyText(seg.answerText || seg.captionText || ''))
      .map((seg, idx) => {
        const mod = modules.get(seg.moduleId) || {};
        const displayAnswer = standardizeDisplayText(seg.answerText || seg.captionText || '');
        return {
          bankId: `RT-${String(idx + 1).padStart(3, '0')}`,
          segmentId: seg.id,
          moduleId: seg.moduleId,
          moduleTitle: mod.title || '未分類模組',
          prompt: '依影片字幕與畫面，這一步最正確的作法是？',
          answerText: displayAnswer,
          captionText: safeText(seg.captionText || ''),
          rawAnswerText: safeText(seg.answerText || seg.captionText || ''),
          answerFamily: detectAnswerFamily(displayAnswer),
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
      })
      .filter((q) => !!safeText(q.answerText));
  }

  function createState(ref) {
    const questionBank = buildQuestionBank(ref);
    const modules = Array.isArray(ref?.modules) ? ref.modules.slice() : [];
    const moduleMap = new Map(modules.map((m) => [m.id, m]));
    const answerPoolMap = new Map();
    questionBank.forEach((q) => {
      const norm = normalizeAnswerText(q.answerText);
      if (!norm) return;
      if (!answerPoolMap.has(norm)) answerPoolMap.set(norm, q.answerText);
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
      chain: {
        mode: localStorage.getItem(STORAGE_KEYS.chainMode) || 'caption',
        data: null,
        dragItemId: ''
      },
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
    const sameModule = state.questionBank.filter((q) => q.segmentId !== question.segmentId && q.moduleId === question.moduleId);
    const otherModules = state.questionBank.filter((q) => q.segmentId !== question.segmentId && q.moduleId !== question.moduleId);
    const allOthers = state.questionBank.filter((q) => q.segmentId !== question.segmentId);
    const options = [];
    const used = new Set([correctNorm]);

    function tryPushRaw(raw) {
      const txt = standardizeDisplayText(raw);
      const norm = normalizeAnswerText(txt);
      if (!txt || !norm || used.has(norm)) return false;
      if (textSimilarity(correct, txt) >= 0.5) return false;
      used.add(norm);
      options.push(txt);
      return true;
    }

    function tryPushQuestion(candidateQuestion) {
      if (!candidateQuestion || isAmbiguousDistractor(question, candidateQuestion)) return false;
      return tryPushRaw(candidateQuestion.answerText || candidateQuestion.captionText || '');
    }

    shuffle(otherModules).forEach((q) => { if (options.length < 3) tryPushQuestion(q); });
    if (options.length < 3) shuffle(sameModule).forEach((q) => { if (options.length < 3) tryPushQuestion(q); });
    if (options.length < 3) shuffle(allOthers).forEach((q) => { if (options.length < 3) tryPushQuestion(q); });
    if (options.length < 3) shuffle(GENERIC_DISTRACTORS).forEach((txt) => { if (options.length < 3) tryPushRaw(txt); });
    if (options.length < 3) shuffle(state.answerPool).forEach((txt) => { if (options.length < 3) tryPushRaw(txt); });

    const fallbackBase = [
      '先顯示方向燈，再確認周圍安全後操作',
      '保持車身穩定並依規定車道行駛',
      '先減速查看，再依路況繼續前進',
      '停妥後依序排入 P 檔、拉手煞車並熄火'
    ];
    if (options.length < 3) shuffle(fallbackBase).forEach((txt) => { if (options.length < 3) tryPushRaw(txt); });

    while (options.length < 3) {
      tryPushRaw(`依規定操作並確認周圍安全 ${options.length + 1}`);
    }

    const finalOptions = shuffle([correct, ...options.slice(0, 3)]);
    return {
      correct,
      correctNorm,
      options: finalOptions,
      correctIndex: Math.max(0, finalOptions.findIndex((opt) => normalizeAnswerText(opt) === correctNorm))
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
    const chainModeSelect = qs('roadTestChainModeSelect');
    if (muted) muted.checked = !!state.settings.muted;
    if (autoplay) autoplay.checked = !!state.settings.autoplayNav;
    if (autoAdvance) autoAdvance.checked = !!state.settings.autoAdvance;
    if (delayInput) delayInput.value = String(state.settings.advanceDelaySec);
    if (chainModeSelect) chainModeSelect.value = state.chain.mode;
  }

  function applyDetailsState() {
    const main = qs('roadTestDetails');
    const settings = qs('roadTestSettingsDetails');
    if (main) main.open = readBool(STORAGE_KEYS.detailsOpen, true);
    if (settings) settings.open = readBool(STORAGE_KEYS.settingsOpen, false);
  }

  function bindDetailsPersistence() {
    const main = qs('roadTestDetails');
    const settings = qs('roadTestSettingsDetails');
    if (main) main.addEventListener('toggle', () => localStorage.setItem(STORAGE_KEYS.detailsOpen, String(main.open)));
    if (settings) settings.addEventListener('toggle', () => localStorage.setItem(STORAGE_KEYS.settingsOpen, String(settings.open)));
  }

  function updateHeaderMeta(state) {
    const sourceLabel = qs('roadTestSourceLabel');
    const bankMeta = qs('roadTestBankMeta');
    const flowHint = qs('roadTestFlowHint');
    if (sourceLabel) {
      sourceLabel.textContent = '影片來源：YouTube｜字幕來源：captions.sbv｜片段預設前後 1 秒｜考試時預設靜音';
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
    if (status) status.textContent = `題庫編碼 ${q.bankId}｜片段 ${formatTime(q.clipStartSec)} - ${formatTime(q.clipEndSec)}｜題點 ${formatTime(q.startSec)}｜${state.settings.muted ? '預設靜音' : '目前開聲'}`;
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

    updateHeaderMeta(state);
    const current = state.currentQuestion;
    if (!current) {
      questionWrap.classList.add('hidden');
      empty.classList.remove('hidden');
      progress.textContent = `目前共有 ${state.filteredQuestions.length} 題可練習。`;
      optionsEl.innerHTML = '';
      return;
    }

    const moduleInfo = state.moduleMap.get(current.question.moduleId);
    empty.classList.add('hidden');
    questionWrap.classList.remove('hidden');
    progress.textContent = `第 ${state.currentIndex + 1} / ${state.filteredQuestions.length} 題`;
    moduleLabel.textContent = moduleInfo ? moduleInfo.title : (current.question.moduleId || '未分類模組');
    prompt.textContent = current.question.prompt;
    segMeta.textContent = `題庫編碼 ${current.question.bankId}｜字幕 ${formatTime(current.question.startSec)} - ${formatTime(current.question.endSec)}｜模組重點：${moduleInfo ? moduleInfo.summary : '依字幕判定'}`;
    note.textContent = '答案以字幕內容為主；若整理文字與字幕有差異，請以字幕為準。';
    feedback.textContent = '';
    feedback.className = 'roadtest-feedback';
    answerBox.classList.add('hidden');
    answerText.textContent = current.correct || '（無字幕答案）';
    if (answerToggle) answerToggle.textContent = '顯示字幕答案';
    state.answered = false;
    clearPendingAdvance(state);

    optionsEl.innerHTML = '';
    current.options.forEach((opt, idx) => {
      const text = safeText(opt) || `選項 ${idx + 1}`;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'roadtest-option-btn';
      btn.dataset.optionIndex = String(idx);
      btn.innerHTML = `<span class="roadtest-option-index">${idx + 1}</span><span class="roadtest-option-text">${text}</span>`;
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
    feedback.textContent = isCorrect ? '答對：這一題以字幕內容為主。' : '答錯：請對照字幕答案與影片片段。';
    feedback.classList.add(isCorrect ? 'is-correct' : 'is-wrong');

    if (state.settings.autoAdvance && state.currentIndex < state.filteredQuestions.length - 1) {
      const delayMs = Math.round(state.settings.advanceDelaySec * 1000);
      if (examStatus) examStatus.textContent = `${state.settings.advanceDelaySec.toFixed(1)} 秒後自動前往下一題${state.settings.autoplayNav ? '並播放片段' : ''}。`;
      state.pendingAdvanceTimer = setTimeout(() => {
        moveToIndex(state, state.currentIndex + 1, { autoplay: state.settings.autoplayNav });
      }, delayMs);
    } else if (examStatus) {
      examStatus.textContent = state.currentIndex >= state.filteredQuestions.length - 1 ? '已到最後一題。' : '已停留本題，可手動前往下一題。';
    }
  }

  function moveToIndex(state, nextIndex, options) {
    clearPendingAdvance(state);
    const opts = options || {};
    if (!state.filteredQuestions.length) {
      state.currentIndex = -1;
      state.currentQuestion = null;
      renderQuestion(state);
      renderChain(state);
      return;
    }
    const bounded = Math.max(0, Math.min(nextIndex, state.filteredQuestions.length - 1));
    state.currentIndex = bounded;
    const question = state.filteredQuestions[bounded];
    const q = buildOptionsForQuestion(question, state);
    state.currentQuestion = { ...q, question };
    localStorage.setItem(STORAGE_KEYS.lastSegmentId, question.segmentId);
    renderQuestion(state);
    renderChain(state);
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

  function splitCaptionPieces(text) {
    const raw = safeText(text)
      .replace(/^\([^)]*\)/, '')
      .replace(/[【】]/g, '')
      .replace(/；/g, '；')
      .trim();
    if (!raw) return [];
    let parts = raw.split(/[；。]/).map((s) => standardizeDisplayText(s)).map(safeText).filter(Boolean);
    if (parts.length < 2) {
      parts = raw.split(/[，,]/).map((s) => standardizeDisplayText(s)).map(safeText).filter(Boolean);
    }
    const unique = [];
    parts.forEach((p) => {
      if (!p || isWeakReminderText(p)) return;
      if (unique.some((u) => textSimilarity(u, p) >= 0.55)) return;
      unique.push(p);
    });
    return unique.slice(0, 4);
  }

  function buildCaptionChain(state) {
    const candidates = shuffle(state.filteredQuestions.length ? state.filteredQuestions : state.questionBank);
    for (const q of candidates) {
      const pieces = splitCaptionPieces(q.rawAnswerText || q.captionText || q.answerText || '');
      if (pieces.length >= 2) {
        return {
          title: '字幕接龍',
          prompt: `請把這段字幕依原順序接回去｜${q.bankId} ${formatTime(q.startSec)} - ${formatTime(q.endSec)}`,
          answer: pieces,
          pool: shuffle(pieces),
          reference: pieces.join(' → ')
        };
      }
    }
    return null;
  }

  function pickDistinctQuestions(list, count) {
    const picked = [];
    for (const q of list) {
      if (!q || !q.answerText || isWeakReminderText(q.answerText)) continue;
      if (picked.some((p) => p.answerFamily === q.answerFamily && q.answerFamily !== 'unknown')) continue;
      if (picked.some((p) => textSimilarity(p.answerText, q.answerText) >= 0.5)) continue;
      picked.push(q);
      if (picked.length >= count) break;
    }
    return picked;
  }

  function buildModuleInnerChain(state) {
    const current = state.currentQuestion?.question;
    const sourceModuleId = current?.moduleId || (state.filteredQuestions[0] && state.filteredQuestions[0].moduleId);
    const list = state.questionBank.filter((q) => q.moduleId === sourceModuleId);
    const picked = pickDistinctQuestions(list, 4);
    if (picked.length >= 3) {
      return {
        title: '模組內排序',
        prompt: `請依同一模組內的正確順序排列｜${picked[0].moduleTitle}`,
        answer: picked.map((q) => q.answerText),
        pool: shuffle(picked.map((q) => q.answerText)),
        reference: picked.map((q) => `${q.bankId} ${q.answerText}`).join(' → ')
      };
    }
    return null;
  }

  function buildModuleFlowChain(state) {
    const list = pickDistinctQuestions(state.filteredQuestions.length ? state.filteredQuestions : state.questionBank, 4);
    if (list.length >= 3) {
      return {
        title: '模組流程排序',
        prompt: '請依道路駕駛影片中的先後流程排列下列片段',
        answer: list.map((q) => q.answerText),
        pool: shuffle(list.map((q) => q.answerText)),
        reference: list.map((q) => `${q.bankId} ${q.answerText}`).join(' → ')
      };
    }
    return null;
  }

  function buildChainData(state) {
    if (state.chain.mode === 'module_inner') return buildModuleInnerChain(state) || buildModuleFlowChain(state) || buildCaptionChain(state);
    if (state.chain.mode === 'module_flow') return buildModuleFlowChain(state) || buildModuleInnerChain(state) || buildCaptionChain(state);
    return buildCaptionChain(state) || buildModuleInnerChain(state) || buildModuleFlowChain(state);
  }

  function createChainCard(text, idx) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'roadtest-chain-card';
    card.draggable = true;
    card.dataset.chainId = `chain-${idx}-${Math.random().toString(36).slice(2, 8)}`;
    card.textContent = safeText(text) || `片段 ${idx + 1}`;
    return card;
  }

  function bindChainCard(state, card) {
    card.addEventListener('dragstart', (e) => {
      state.chain.dragItemId = card.dataset.chainId || '';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', state.chain.dragItemId);
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => card.classList.remove('dragging'));
    card.addEventListener('click', () => {
      const answerRack = qs('roadTestChainAnswerRack');
      const poolRack = qs('roadTestChainPoolRack');
      if (!answerRack || !poolRack) return;
      if (card.parentElement === poolRack) answerRack.appendChild(card);
      else poolRack.appendChild(card);
    });
  }

  function bindChainRackDrop(state, rack) {
    rack.addEventListener('dragover', (e) => {
      e.preventDefault();
      rack.classList.add('is-over');
    });
    rack.addEventListener('dragleave', () => rack.classList.remove('is-over'));
    rack.addEventListener('drop', (e) => {
      e.preventDefault();
      rack.classList.remove('is-over');
      const id = e.dataTransfer.getData('text/plain') || state.chain.dragItemId;
      if (!id) return;
      const card = rack.ownerDocument.querySelector(`[data-chain-id="${id}"]`);
      if (card) rack.appendChild(card);
    });
  }

  function renderChain(state) {
    const panel = qs('roadTestChainPanel');
    const meta = qs('roadTestChainMeta');
    const prompt = qs('roadTestChainPrompt');
    const answerRack = qs('roadTestChainAnswerRack');
    const poolRack = qs('roadTestChainPoolRack');
    const feedback = qs('roadTestChainFeedback');
    const reference = qs('roadTestChainReference');
    const referenceText = qs('roadTestChainReferenceText');
    if (!panel || !meta || !prompt || !answerRack || !poolRack || !feedback || !reference || !referenceText) return;
    panel.classList.remove('hidden');
    const data = buildChainData(state);
    state.chain.data = data;
    feedback.textContent = '';
    feedback.className = 'roadtest-chain-feedback';
    reference.classList.add('hidden');
    referenceText.textContent = '';

    if (!data) {
      prompt.textContent = '目前沒有可用的接龍題。';
      meta.textContent = '請切換模組或前往其他題目再試一次。';
      answerRack.innerHTML = '';
      poolRack.innerHTML = '';
      return;
    }

    meta.textContent = `${data.title}｜拖曳或點一下卡片可移動；題目內容已避開語意太像或順序不重要的提醒。`;
    prompt.textContent = data.prompt;
    answerRack.innerHTML = '';
    poolRack.innerHTML = '';
    bindChainRackDrop(state, answerRack);
    bindChainRackDrop(state, poolRack);
    data.pool.forEach((text, idx) => {
      const card = createChainCard(text, idx);
      bindChainCard(state, card);
      poolRack.appendChild(card);
    });
  }

  function checkChainAnswer(state) {
    const answerRack = qs('roadTestChainAnswerRack');
    const feedback = qs('roadTestChainFeedback');
    const reference = qs('roadTestChainReference');
    const referenceText = qs('roadTestChainReferenceText');
    if (!answerRack || !feedback || !reference || !referenceText || !state.chain.data) return;
    const picked = Array.from(answerRack.children).map((node) => safeText(node.textContent));
    const answer = state.chain.data.answer.map((x) => safeText(x));
    if (!picked.length) {
      feedback.textContent = '作答區目前是空的，請先拖曳或點選卡片。';
      feedback.className = 'roadtest-chain-feedback is-wrong';
      reference.classList.add('hidden');
      return;
    }
    const isCorrect = picked.length === answer.length && picked.every((txt, idx) => normalizeAnswerText(txt) === normalizeAnswerText(answer[idx]));
    feedback.textContent = isCorrect ? '接龍正確。' : '順序不正確，請再檢查一次。';
    feedback.className = `roadtest-chain-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`;
    reference.classList.toggle('hidden', isCorrect);
    if (!isCorrect) {
      reference.classList.remove('hidden');
      referenceText.textContent = state.chain.data.reference;
    }
  }

  function clearChainAnswer() {
    const answerRack = qs('roadTestChainAnswerRack');
    const poolRack = qs('roadTestChainPoolRack');
    const feedback = qs('roadTestChainFeedback');
    const reference = qs('roadTestChainReference');
    if (!answerRack || !poolRack) return;
    Array.from(answerRack.children).forEach((card) => poolRack.appendChild(card));
    if (feedback) { feedback.textContent = ''; feedback.className = 'roadtest-chain-feedback'; }
    if (reference) reference.classList.add('hidden');
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
    const chainCheckBtn = qs('roadTestChainCheckBtn');
    const chainResetBtn = qs('roadTestChainResetBtn');

    if (saveUrlBtn && urlInput) saveUrlBtn.addEventListener('click', () => {
      const value = safeText(urlInput.value) || DEFAULT_URL;
      state.currentUrl = value;
      state.currentVideoId = extractYouTubeVideoId(value);
      localStorage.setItem(STORAGE_KEYS.youtubeUrl, value);
      updateVideo(state, false);
    });

    if (useDefaultBtn && urlInput) useDefaultBtn.addEventListener('click', () => {
      urlInput.value = DEFAULT_URL;
      state.currentUrl = DEFAULT_URL;
      state.currentVideoId = extractYouTubeVideoId(DEFAULT_URL);
      localStorage.setItem(STORAGE_KEYS.youtubeUrl, DEFAULT_URL);
      updateVideo(state, false);
    });

    if (playBtn) playBtn.addEventListener('click', () => updateVideo(state, true));
    if (prevBtn) prevBtn.addEventListener('click', () => moveToIndex(state, state.currentIndex - 1, { autoplay: state.settings.autoplayNav }));
    if (nextBtn) nextBtn.addEventListener('click', () => moveToIndex(state, state.currentIndex + 1, { autoplay: state.settings.autoplayNav }));
    if (randomBtn) randomBtn.addEventListener('click', () => moveToIndex(state, Math.floor(Math.random() * Math.max(1, state.filteredQuestions.length)), { autoplay: state.settings.autoplayNav }));

    if (moduleSelect) moduleSelect.addEventListener('change', () => applyFilter(state, moduleSelect.value));

    if (answerToggle) answerToggle.addEventListener('click', () => {
      const box = qs('roadTestAnswerBox');
      if (!box) return;
      const isHidden = box.classList.contains('hidden');
      box.classList.toggle('hidden', !isHidden);
      answerToggle.textContent = isHidden ? '隱藏字幕答案' : '顯示字幕答案';
    });

    if (mutedToggle) mutedToggle.addEventListener('change', () => {
      state.settings.muted = !!mutedToggle.checked;
      localStorage.setItem(STORAGE_KEYS.muted, String(state.settings.muted));
      updateHeaderMeta(state);
      updateVideo(state, false);
    });

    if (autoplayToggle) autoplayToggle.addEventListener('change', () => {
      state.settings.autoplayNav = !!autoplayToggle.checked;
      localStorage.setItem(STORAGE_KEYS.autoplayNav, String(state.settings.autoplayNav));
      updateHeaderMeta(state);
    });

    if (autoAdvanceToggle) autoAdvanceToggle.addEventListener('change', () => {
      state.settings.autoAdvance = !!autoAdvanceToggle.checked;
      localStorage.setItem(STORAGE_KEYS.autoAdvance, String(state.settings.autoAdvance));
      clearPendingAdvance(state);
      updateHeaderMeta(state);
    });

    if (delayInput) delayInput.addEventListener('change', () => {
      state.settings.advanceDelaySec = readNumber(STORAGE_KEYS.advanceDelaySec, Number(delayInput.value) || DEFAULT_SETTINGS.advanceDelaySec, 0.5, 5);
      delayInput.value = String(state.settings.advanceDelaySec);
      localStorage.setItem(STORAGE_KEYS.advanceDelaySec, String(state.settings.advanceDelaySec));
      updateHeaderMeta(state);
    });

    if (chainModeSelect) chainModeSelect.addEventListener('change', () => {
      state.chain.mode = chainModeSelect.value || 'caption';
      localStorage.setItem(STORAGE_KEYS.chainMode, state.chain.mode);
      renderChain(state);
    });
    if (chainRefreshBtn) chainRefreshBtn.addEventListener('click', () => renderChain(state));
    if (chainCheckBtn) chainCheckBtn.addEventListener('click', () => checkChainAnswer(state));
    if (chainResetBtn) chainResetBtn.addEventListener('click', () => clearChainAnswer());
  }

  function init() {
    const ref = window.ROAD_TEST_REFERENCE;
    if (!ref || !Array.isArray(ref.segments) || !ref.segments.length) return;
    applyDetailsState();
    bindDetailsPersistence();
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
