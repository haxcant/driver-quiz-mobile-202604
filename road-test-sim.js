(function () {
  const STORAGE_KEYS = {
    youtubeUrl: 'roadTest.youtubeUrl',
    lastSegmentId: 'roadTest.lastSegmentId',
    moduleFilter: 'roadTest.moduleFilter',
    muted: 'roadTest.muted',
    autoplayNav: 'roadTest.autoplayNav',
    autoAdvance: 'roadTest.autoAdvance',
    advanceDelaySec: 'roadTest.advanceDelaySec',
    mode: 'roadTest.mode',
    roadPanelOpen: 'roadTest.roadPanelOpen',
    configPanelOpen: 'roadTest.configPanelOpen'
  };

  const DEFAULT_URL = 'https://www.youtube.com/watch?v=ldsprS-5Y9E';
  const DEFAULT_SETTINGS = {
    muted: true,
    autoplayNav: true,
    autoAdvance: true,
    advanceDelaySec: 0.5
  };
  const DEFAULT_MODE = 'mcq';

  function qs(id) {
    return document.getElementById(id);
  }

  function safeText(v) {
    return String(v || '').trim();
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

  function readString(key, fallback) {
    const raw = localStorage.getItem(key);
    return safeText(raw) || fallback;
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

  function standardizeRoadText(text) {
    let t = safeText(text)
      .replace(/【?油量、?溫度、?引擎、?電瓶、?手煞車燈、?機油\s*正常】?/g, '（溫度、油量、煞車、充電、機油）正常')
      .replace(/開啟紅火[:：]?/g, '')
      .replace(/觀察儀表/g, '檢查儀表')
      .replace(/【引擎發動：儀表板正常】/g, '【引擎發動：儀表板正常】')
      .replace(/\s+/g, ' ')
      .trim();
    if (/儀表/.test(t) && /溫度|油量|煞車|充電|機油/.test(t)) {
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
      .replace(/再次|再度|再|先|後|然後|並|且|再看|確認|口誦|注意|留意|隨時|進行|本次|這一步/g, '')
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
    if (/車燈無破損|車燈/.test(t)) return 'light_check';
    if (/車底無異物/.test(t)) return 'undercarriage_check';
    if (/兩段式開車門|開車門/.test(t)) return 'door_check';
    if (/調整座椅|調整椅背|調整頭枕/.test(t)) return 'seat_adjust';
    if (/安全帶/.test(t)) return 'seatbelt';
    if (/檢查儀表|溫度油量煞車充電機油/.test(t)) return 'instrument_check';
    if (/試踩煞車|煞車正常/.test(t)) return 'brake_check';
    if (/方向燈正常|試打左右方向燈/.test(t)) return 'signal_check';
    if (/左方向燈/.test(t) && /起步|起駛|準備起步/.test(t)) return 'start_signal_left';
    if (/右方向燈/.test(t) && /靠邊|臨時停車/.test(t)) return 'roadside_stop_signal';
    if (/左方向燈/.test(t) && /變換車道|主線/.test(t)) return 'lane_change_left';
    if (/右方向燈/.test(t) && /變換車道/.test(t)) return 'lane_change_right';
    if (/路口|左右無來車/.test(t)) return 'intersection_scan';
    if (/照後鏡|死角|左後方|右後方|轉頭查看/.test(t)) return 'mirror_blindspot_check';
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
    if (/(歡迎|駕訓班|TOYOTA|本班|介紹親友|良好學習環境|今天示範的也是新車|影片介紹到這裡|謝謝大家|再見|車棚|颱風|大雨考試|用心)/.test(t)) return false;
    return true;
  }

  function isAmbiguousDistractor(correctQuestion, candidateQuestion) {
    const correctText = safeText(correctQuestion.answerText || correctQuestion.captionText || '');
    const candidateText = safeText(candidateQuestion.answerText || candidateQuestion.captionText || '');
    const correctFamily = detectAnswerFamily(correctText);
    const candidateFamily = detectAnswerFamily(candidateText);
    if (!candidateText) return true;
    if (correctFamily === candidateFamily && correctFamily !== 'unknown') return true;
    const sim = textSimilarity(correctText, candidateText);
    if (sim >= 0.55) return true;
    if ((correctFamily === 'intersection_scan' && candidateFamily === 'lane_keeping') ||
        (correctFamily === 'lane_keeping' && candidateFamily === 'intersection_scan')) return true;
    if ((correctFamily === 'lane_change_left' && candidateFamily === 'mirror_blindspot_check') ||
        (correctFamily === 'lane_change_right' && candidateFamily === 'mirror_blindspot_check') ||
        (correctFamily === 'mirror_blindspot_check' && (candidateFamily === 'lane_change_left' || candidateFamily === 'lane_change_right'))) return true;
    return false;
  }

  function shortLabelForQuestion(q) {
    const text = standardizeRoadText(q.answerText || q.captionText || '')
      .replace(/^\(([^)]|[^）])*\)/, '')
      .replace(/^（([^)]|[^）])*）/, '')
      .replace(/【/g, '')
      .replace(/】/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    return text.length > 28 ? `${text.slice(0, 28)}…` : text;
  }

  function splitCaptionChunks(text) {
    let raw = standardizeRoadText(text)
      .replace(/^\(([^)]|[^）])*\)\s*/, '')
      .replace(/^（([^)]|[^）])*）\s*/, '')
      .trim();
    if (!raw) return [];
    let parts = raw.split(/[，；。]/).map((s) => safeText(s)).filter(Boolean);
    if (parts.length <= 1) {
      parts = raw
        .replace(/後，/g, '後｜')
        .replace(/再/g, '｜再')
        .replace(/並/g, '｜並')
        .replace(/然後/g, '｜然後')
        .split('｜')
        .map((s) => safeText(s))
        .filter(Boolean);
    }
    const merged = [];
    parts.forEach((part) => {
      if (!merged.length) {
        merged.push(part);
        return;
      }
      if (part.length <= 4) {
        merged[merged.length - 1] = `${merged[merged.length - 1]} ${part}`.trim();
      } else {
        merged.push(part);
      }
    });
    return merged.slice(0, 5);
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

  function buildQuestionBank(ref) {
    const modules = new Map((ref.modules || []).map((m) => [m.id, { ...m, summary: standardizeRoadText(m.summary || '') }]));
    return (ref.segments || [])
      .filter((seg) => isQuizworthyText(seg.answerText || seg.captionText || ''))
      .map((seg, idx) => {
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

    function tryPushQuestion(candidateQuestion) {
      if (!candidateQuestion || isAmbiguousDistractor(question, candidateQuestion)) return false;
      const raw = safeText(candidateQuestion.answerText || candidateQuestion.captionText || '');
      const norm = normalizeAnswerText(raw);
      if (!raw || !norm || used.has(norm)) return false;
      used.add(norm);
      options.push(raw);
      return true;
    }

    shuffle(otherModules).forEach((q) => { if (options.length < 3) tryPushQuestion(q); });
    if (options.length < 3) shuffle(sameModule).forEach((q) => { if (options.length < 3) tryPushQuestion(q); });
    if (options.length < 3) shuffle(allOthers).forEach((q) => { if (options.length < 3) tryPushQuestion(q); });

    const finalOptions = shuffle([correct, ...options.slice(0, 3)]);
    return {
      correct,
      correctNorm,
      options: finalOptions,
      correctIndex: finalOptions.findIndex((opt) => normalizeAnswerText(opt) === correctNorm)
    };
  }

  function createState(ref) {
    const questionBank = buildQuestionBank(ref);
    const modules = Array.isArray(ref?.modules) ? ref.modules.map((m) => ({ ...m, summary: standardizeRoadText(m.summary || '') })) : [];
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
      mode: readString(STORAGE_KEYS.mode, DEFAULT_MODE),
      settings: {
        muted: readBool(STORAGE_KEYS.muted, DEFAULT_SETTINGS.muted),
        autoplayNav: readBool(STORAGE_KEYS.autoplayNav, DEFAULT_SETTINGS.autoplayNav),
        autoAdvance: readBool(STORAGE_KEYS.autoAdvance, DEFAULT_SETTINGS.autoAdvance),
        advanceDelaySec: readNumber(STORAGE_KEYS.advanceDelaySec, DEFAULT_SETTINGS.advanceDelaySec, 0.5, 5)
      },
      modeState: null
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
    const modeSelect = qs('roadTestModeSelect');
    if (muted) muted.checked = !!state.settings.muted;
    if (autoplay) autoplay.checked = !!state.settings.autoplayNav;
    if (autoAdvance) autoAdvance.checked = !!state.settings.autoAdvance;
    if (delayInput) delayInput.value = String(state.settings.advanceDelaySec);
    if (modeSelect) modeSelect.value = state.mode;
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
      const modeText = state.mode === 'mcq' ? '一般選擇題' : state.mode === 'caption_chain' ? '字幕接龍' : '模組接龍';
      flowHint.textContent = `目前設定：${state.settings.muted ? '靜音' : '開聲'}｜${state.settings.autoplayNav ? '切題自動播放' : '切題不自動播放'}｜${state.settings.autoAdvance ? `答題後 ${state.settings.advanceDelaySec.toFixed(1)} 秒自動跳題` : '答題後停留本題'}｜模式：${modeText}`;
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

  function getModeHelpText(state) {
    if (state.mode === 'caption_chain') return '字幕接龍：依字幕語序把這一段接完整。答對一段後會接著完成下一段。';
    if (state.mode === 'module_chain') return '模組接龍：根據目前片段與模組流程，選出下一個最合理接續片段；全部模組時會連同模組外排序一起練。';
    return '一般選擇題：四選一；已盡量避開語意太像的干擾選項。';
  }

  function buildCaptionChainState(question, state) {
    const chunks = splitCaptionChunks(question.captionText || question.answerText || '');
    const moduleQuestions = state.questionBank.filter((q) => q.moduleId === question.moduleId && q.segmentId !== question.segmentId);
    const pool = [];
    moduleQuestions.forEach((q) => {
      splitCaptionChunks(q.captionText || q.answerText || '').forEach((chunk) => {
        if (chunk) pool.push(chunk);
      });
    });
    state.questionBank.forEach((q) => {
      if (q.segmentId === question.segmentId) return;
      splitCaptionChunks(q.captionText || q.answerText || '').forEach((chunk) => {
        if (chunk) pool.push(chunk);
      });
    });
    return {
      type: 'caption_chain',
      chunks,
      selected: [],
      wrongCount: 0,
      chunkPool: Array.from(new Set(pool.map((p) => standardizeRoadText(p))))
    };
  }

  function buildModuleChainState(question, state, index) {
    const hasNext = index < state.filteredQuestions.length - 1;
    return {
      type: 'module_chain',
      hasNext,
      nextQuestion: hasNext ? state.filteredQuestions[index + 1] : null,
      wrongCount: 0
    };
  }

  function setupModeState(state, question, index) {
    if (state.mode === 'caption_chain') {
      state.modeState = buildCaptionChainState(question, state);
      return;
    }
    if (state.mode === 'module_chain') {
      state.modeState = buildModuleChainState(question, state, index);
      return;
    }
    state.modeState = buildOptionsForQuestion(question, state);
  }

  function buildCaptionChainOptions(chainState) {
    const currentChunk = chainState.chunks[chainState.selected.length] || '';
    const used = new Set(chainState.selected.map((s) => normalizeAnswerText(s)));
    const distractors = [];
    shuffle(chainState.chunkPool).forEach((chunk) => {
      if (distractors.length >= 3) return;
      const norm = normalizeAnswerText(chunk);
      if (!chunk || used.has(norm)) return;
      if (textSimilarity(currentChunk, chunk) >= 0.65) return;
      distractors.push(chunk);
    });
    return shuffle([currentChunk, ...distractors.slice(0, 3)]);
  }

  function buildModuleChainOptions(state, currentIndex) {
    const correct = state.filteredQuestions[currentIndex + 1];
    const pool = state.filteredQuestions.filter((q, idx) => idx !== currentIndex + 1 && idx !== currentIndex);
    const options = [];
    const used = new Set([correct.segmentId]);
    shuffle(pool).forEach((q) => {
      if (options.length >= 3) return;
      if (used.has(q.segmentId)) return;
      if (q.moduleId === correct.moduleId && textSimilarity(q.captionText, correct.captionText) >= 0.5) return;
      used.add(q.segmentId);
      options.push(q);
    });
    return shuffle([correct, ...options.slice(0, 3)]);
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
    const modeHelp = qs('roadTestModeHelp');
    const chainContext = qs('roadTestChainContext');
    const chainBuild = qs('roadTestChainBuild');
    if (!questionWrap || !empty || !optionsEl || !feedback || !prompt || !moduleLabel || !note || !segMeta || !answerBox || !answerText || !progress || !modeHelp || !chainContext || !chainBuild) return;

    updateHeaderMeta(state);

    const current = state.currentQuestion;
    if (!current) {
      questionWrap.classList.add('hidden');
      empty.classList.remove('hidden');
      progress.textContent = `目前共有 ${state.filteredQuestions.length} 題可練習。`;
      return;
    }

    const moduleInfo = state.moduleMap.get(current.question.moduleId);
    empty.classList.add('hidden');
    questionWrap.classList.remove('hidden');
    progress.textContent = `第 ${state.currentIndex + 1} / ${state.filteredQuestions.length} 題`;
    moduleLabel.textContent = moduleInfo ? moduleInfo.title : (current.question.moduleId || '未分類模組');
    segMeta.textContent = `題庫編碼 ${current.question.bankId}｜字幕 ${formatTime(current.question.startSec)} - ${formatTime(current.question.endSec)}｜模組重點：${moduleInfo ? moduleInfo.summary : '依字幕判定'}`;
    modeHelp.textContent = getModeHelpText(state);
    note.textContent = '答案以字幕內容為主；若整理文字與字幕有差異，請以字幕為準。';
    feedback.textContent = '';
    feedback.className = 'roadtest-feedback';
    answerBox.classList.add('hidden');
    answerText.textContent = current.question.captionText || current.question.answerText;
    if (answerToggle) answerToggle.textContent = '顯示字幕答案';
    state.answered = false;
    clearPendingAdvance(state);
    optionsEl.innerHTML = '';
    chainContext.classList.add('hidden');
    chainBuild.classList.add('hidden');
    chainBuild.classList.remove('is-complete');

    if (state.mode === 'mcq') {
      prompt.textContent = current.question.prompt;
      current.modeState.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'roadtest-option-btn';
        btn.dataset.optionIndex = String(idx);
        btn.innerHTML = `<span class="roadtest-option-index">${idx + 1}</span><span class="roadtest-option-text">${opt}</span>`;
        btn.addEventListener('click', () => submitMcqAnswer(state, idx));
        optionsEl.appendChild(btn);
      });
    } else if (state.mode === 'caption_chain') {
      prompt.textContent = '請依字幕順序，把這段片段接完整。';
      chainContext.classList.remove('hidden');
      chainContext.innerHTML = `<strong>本題片段</strong>${current.question.captionText}`;
      renderCaptionChainStep(state);
    } else {
      prompt.textContent = '根據目前片段與模組流程，下一個最合理的接續片段是？';
      chainContext.classList.remove('hidden');
      chainContext.innerHTML = `<strong>目前片段</strong>${shortLabelForQuestion(current.question)}`;
      renderModuleChainStep(state);
    }

    updateVideo(state, false);
  }

  function renderCaptionChainStep(state) {
    const optionsEl = qs('roadTestOptions');
    const feedback = qs('roadTestFeedback');
    const chainBuild = qs('roadTestChainBuild');
    if (!optionsEl || !feedback || !chainBuild || !state.modeState) return;
    const chain = state.modeState;
    optionsEl.innerHTML = '';
    const assembled = chain.selected.join('｜');
    chainBuild.classList.remove('hidden');
    chainBuild.innerHTML = `<strong>目前接到</strong>${assembled || '（尚未開始）'}`;

    if (chain.selected.length >= chain.chunks.length) {
      chainBuild.classList.add('is-complete');
      feedback.textContent = '接龍完成：已依字幕順序接完整段落。';
      feedback.className = 'roadtest-feedback is-correct';
      state.answered = true;
      scheduleAutoAdvance(state);
      return;
    }

    const options = buildCaptionChainOptions(chain);
    options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'roadtest-option-btn';
      btn.innerHTML = `<span class="roadtest-option-index">${idx + 1}</span><span class="roadtest-option-text">${opt}</span>`;
      btn.addEventListener('click', () => submitCaptionChainAnswer(state, opt, btn));
      optionsEl.appendChild(btn);
    });
  }

  function renderModuleChainStep(state) {
    const optionsEl = qs('roadTestOptions');
    const feedback = qs('roadTestFeedback');
    const chainBuild = qs('roadTestChainBuild');
    if (!optionsEl || !feedback || !chainBuild || !state.modeState) return;
    const moduleState = state.modeState;
    optionsEl.innerHTML = '';
    chainBuild.classList.remove('hidden');

    if (!moduleState.hasNext) {
      chainBuild.classList.add('is-complete');
      chainBuild.innerHTML = '<strong>模組接龍</strong>已到目前篩選序列最後一題。';
      feedback.textContent = '已到最後一題，可改用上一題、隨機一題或切換模組。';
      feedback.className = 'roadtest-feedback is-correct';
      state.answered = true;
      return;
    }

    chainBuild.innerHTML = `<strong>你要接的下一題</strong>從目前片段之後，選出最合理的接續片段。`;
    const options = buildModuleChainOptions(state, state.currentIndex);
    moduleState.options = options;
    options.forEach((q, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'roadtest-option-btn';
      btn.innerHTML = `<span class="roadtest-option-index">${idx + 1}</span><span class="roadtest-option-text">${shortLabelForQuestion(q)}<br><small>${q.moduleTitle}</small></span>`;
      btn.addEventListener('click', () => submitModuleChainAnswer(state, q, btn));
      optionsEl.appendChild(btn);
    });
  }

  function scheduleAutoAdvance(state) {
    const examStatus = qs('roadTestExamStatus');
    if (state.settings.autoAdvance && state.currentIndex < state.filteredQuestions.length - 1) {
      const delayMs = Math.round(state.settings.advanceDelaySec * 1000);
      if (examStatus) examStatus.textContent = `${state.settings.advanceDelaySec.toFixed(1)} 秒後自動前往下一題${state.settings.autoplayNav ? '並播放片段' : ''}。`;
      state.pendingAdvanceTimer = setTimeout(() => {
        moveToIndex(state, state.currentIndex + 1, { autoplay: state.settings.autoplayNav });
      }, delayMs);
    } else if (examStatus) {
      examStatus.textContent = state.currentIndex >= state.filteredQuestions.length - 1 ? '已到最後一題。可按上一題、隨機一題或切換模組。' : '已停留本題。';
    }
  }

  function submitMcqAnswer(state, chosenIndex) {
    if (state.answered || !state.currentQuestion) return;
    state.answered = true;
    const current = state.currentQuestion;
    const optionsEl = qs('roadTestOptions');
    const feedback = qs('roadTestFeedback');
    if (!optionsEl || !feedback) return;
    const buttons = Array.from(optionsEl.querySelectorAll('button'));
    buttons.forEach((node, btnIdx) => {
      node.disabled = true;
      if (btnIdx === current.modeState.correctIndex) node.classList.add('correct');
      if (btnIdx === chosenIndex && chosenIndex !== current.modeState.correctIndex) node.classList.add('incorrect');
    });
    const isCorrect = chosenIndex === current.modeState.correctIndex;
    feedback.textContent = isCorrect ? '答對：這一題以字幕內容為準。' : '答錯：請對照字幕答案與模組重點。';
    feedback.className = `roadtest-feedback ${isCorrect ? 'is-correct' : 'is-wrong'}`;
    scheduleAutoAdvance(state);
  }

  function submitCaptionChainAnswer(state, chosenText, btn) {
    if (!state.modeState || !btn) return;
    const feedback = qs('roadTestFeedback');
    const chain = state.modeState;
    const expected = chain.chunks[chain.selected.length] || '';
    if (normalizeAnswerText(chosenText) === normalizeAnswerText(expected)) {
      chain.selected.push(expected);
      if (feedback) {
        feedback.textContent = '正確，繼續接下一段。';
        feedback.className = 'roadtest-feedback is-correct';
      }
      renderCaptionChainStep(state);
      return;
    }
    btn.disabled = true;
    btn.classList.add('incorrect');
    chain.wrongCount += 1;
    if (feedback) {
      feedback.textContent = '這一段接錯了，請再試一次。';
      feedback.className = 'roadtest-feedback is-wrong';
    }
  }

  function submitModuleChainAnswer(state, chosenQuestion, btn) {
    if (!state.modeState || !btn) return;
    const feedback = qs('roadTestFeedback');
    const current = state.modeState;
    const correctId = current.nextQuestion ? current.nextQuestion.segmentId : '';
    if (chosenQuestion.segmentId === correctId) {
      const optionsEl = qs('roadTestOptions');
      if (optionsEl) Array.from(optionsEl.querySelectorAll('button')).forEach((node) => { node.disabled = true; });
      btn.classList.add('correct');
      if (feedback) {
        feedback.textContent = '正確：已接到下一個片段。';
        feedback.className = 'roadtest-feedback is-correct';
      }
      state.answered = true;
      scheduleAutoAdvance(state);
      return;
    }
    btn.disabled = true;
    btn.classList.add('incorrect');
    current.wrongCount += 1;
    if (feedback) {
      feedback.textContent = '這個接續片段不對，請再選一次。';
      feedback.className = 'roadtest-feedback is-wrong';
    }
  }

  function moveToIndex(state, nextIndex, options) {
    clearPendingAdvance(state);
    const opts = options || {};
    if (!state.filteredQuestions.length) {
      state.currentIndex = -1;
      state.currentQuestion = null;
      state.modeState = null;
      renderQuestion(state);
      return;
    }
    const bounded = Math.max(0, Math.min(nextIndex, state.filteredQuestions.length - 1));
    state.currentIndex = bounded;
    const question = state.filteredQuestions[bounded];
    state.currentQuestion = { question };
    localStorage.setItem(STORAGE_KEYS.lastSegmentId, question.segmentId);
    setupModeState(state, question, bounded);
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

  function applyPanelOpenStates() {
    const roadDetails = qs('roadTestDetails');
    const configDetails = qs('roadTestConfigDetails');
    if (roadDetails) {
      roadDetails.open = readBool(STORAGE_KEYS.roadPanelOpen, true);
      roadDetails.addEventListener('toggle', () => {
        localStorage.setItem(STORAGE_KEYS.roadPanelOpen, String(roadDetails.open));
      });
    }
    if (configDetails) {
      configDetails.open = readBool(STORAGE_KEYS.configPanelOpen, true);
      configDetails.addEventListener('toggle', () => {
        localStorage.setItem(STORAGE_KEYS.configPanelOpen, String(configDetails.open));
      });
    }
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
    const modeSelect = qs('roadTestModeSelect');
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

    if (modeSelect) {
      modeSelect.addEventListener('change', () => {
        state.mode = safeText(modeSelect.value) || DEFAULT_MODE;
        localStorage.setItem(STORAGE_KEYS.mode, state.mode);
        if (state.currentQuestion) {
          setupModeState(state, state.currentQuestion.question, state.currentIndex);
        }
        renderQuestion(state);
      });
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

    applyPanelOpenStates();
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
