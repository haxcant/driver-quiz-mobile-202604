window.ROAD_TEST_REFERENCE = {
  "version": "2026-04-11-roadtest-v5-official-aligned",
  "sourcePriority": [
    "captions.sbv",
    "道路考試參考圖片轉文字檔案.txt"
  ],
  "defaults": {
    "clipLeadSeconds": 1.0,
    "clipLagSeconds": 1.0
  },
  "notes": [
    "題目答案改回較貼近影片字幕的閱讀方式，方便逐段對照影片練習。",
    "本來考試要口誦的字句，已另外整理成「口誦字句」，不再混在主操作答案裡。",
    "提醒類資訊（例如 B柱確認、雙黃線、白線不可壓、速度控制）改放在提醒標籤與補充說明。",
    "檢查儀表統一整理為「檢查儀表（溫度、油量、煞車、充電、機油）作用」。",
    "已依你上傳之「小型車駕駛人場考評分基準及成績紀錄表(115/3/31起)」補上官方對齊欄位。"
  ],
  "microSkills": [
    {
      "id": "left_signal",
      "title": "左方向燈使用模組",
      "summary": "凡起步、左轉、迴轉、由路邊切回主線、往左變換車道時，優先考慮左方向燈。",
      "useCases": [
        "起步",
        "左轉",
        "迴轉",
        "切入主線道",
        "往左變換車道"
      ],
      "coreSequence": [
        "先打左方向燈",
        "再做左右/後方安全確認",
        "必要時轉頭看到B柱",
        "確認安全後再起步或變換"
      ],
      "spokenExamples": [
        "【準備起步，打D檔，放手煞車】",
        "【進行變換車道，後方無來車】"
      ],
      "linkedModules": [
        "start_and_initial_turns",
        "resume_and_left_lane_change",
        "u_turn_sequence",
        "signalized_left_turn_to_slow_lane"
      ]
    },
    {
      "id": "right_signal",
      "title": "右方向燈使用模組",
      "summary": "凡右轉、右切車道、靠邊臨停、回到終點調整停車位置時，優先考慮右方向燈。",
      "useCases": [
        "右轉",
        "往右變換車道",
        "路邊臨時停車",
        "回終點找停車位"
      ],
      "coreSequence": [
        "先打右方向燈",
        "前方路口減速查看",
        "確認左右無來車與後方無來車",
        "必要時看左後方並轉頭看到B柱"
      ],
      "spokenExamples": [
        "【前方路口減速查看，進行變換車道】",
        "【前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車】"
      ],
      "linkedModules": [
        "start_and_initial_turns",
        "lane_change_fast_to_slow",
        "roadside_temporary_stop",
        "return_and_finish_stop"
      ]
    },
    {
      "id": "b_pillar_check",
      "title": "B柱轉頭確認",
      "summary": "凡牽涉變換車道、切入主線、靠邊臨停、起步後再切線等動作，都強調轉頭看到B柱。",
      "useCases": [
        "變換車道",
        "切回主線",
        "靠邊停車",
        "號誌起步後左轉"
      ],
      "coreSequence": [
        "頭部明顯轉動",
        "視線帶到B柱",
        "確認死角無車後再執行"
      ],
      "spokenExamples": [
        "【後方無來車】"
      ],
      "linkedModules": [
        "lane_change_fast_to_slow",
        "roadside_temporary_stop",
        "resume_and_left_lane_change",
        "signalized_left_turn_to_slow_lane"
      ]
    },
    {
      "id": "intersection_scan",
      "title": "路口減速查看",
      "summary": "幾乎所有路口前都要減速、左右查看並口誦左右無來車。",
      "useCases": [
        "直行通過路口",
        "右轉前",
        "左轉前",
        "迴轉前",
        "號誌路口起步前"
      ],
      "coreSequence": [
        "減速",
        "左右擺頭",
        "必要時加看後方",
        "口誦左右無來車"
      ],
      "spokenExamples": [
        "【前方路口減速查看】",
        "【左右無來車】"
      ],
      "linkedModules": [
        "start_and_initial_turns",
        "straight_intersection_checks",
        "u_turn_sequence",
        "post_uturn_speed_and_centering",
        "signalized_left_turn_to_slow_lane"
      ]
    },
    {
      "id": "lane_centering_and_speed",
      "title": "車道置中與速度控制",
      "summary": "路考中不只要做動作，還要保持車身在車道中央，特定路段速度約40且不可超過44。",
      "useCases": [
        "一般直線路段",
        "迴轉後直線",
        "標示40路段"
      ],
      "coreSequence": [
        "注意左右車道線間距",
        "不要壓線",
        "速度維持約40公里",
        "標示40路段最高不超過44公里"
      ],
      "spokenExamples": [],
      "linkedModules": [
        "straight_intersection_checks",
        "post_uturn_speed_and_centering"
      ]
    },
    {
      "id": "two_stage_door",
      "title": "兩段式開車門",
      "summary": "上車與下車都可拆成先短開門、再次觀察、再完全開門的固定流程。",
      "useCases": [
        "上車前",
        "收車下車"
      ],
      "coreSequence": [
        "先觀察左右或後方",
        "短開約15公分",
        "再次觀察",
        "確認安全後再完成開門/下車"
      ],
      "spokenExamples": [
        "【兩段式開車門】",
        "【左右無來車】",
        "【後方無來車】"
      ],
      "linkedModules": [
        "two_stage_door_entry",
        "return_and_finish_stop"
      ]
    }
  ],
  "modules": [
    {
      "id": "vehicle_exterior_check",
      "title": "車外安全檢查",
      "segmentRange": [
        1,
        6
      ],
      "summary": "依逆時針方向完成四輪、燈具與車底檢查，建立固定巡檢順序。",
      "keyActions": [
        "左前輪開始巡檢",
        "輪胎口誦胎紋/胎壓正常",
        "車頭/車尾查看燈具無破損",
        "每側必要時蹲下查看車底無異物"
      ],
      "spokenCore": [
        "【胎紋、胎壓正常】",
        "【車燈無破損】",
        "【車底無異物】"
      ],
      "tags": [
        "precheck",
        "exterior",
        "tires",
        "lights",
        "underbody"
      ]
    },
    {
      "id": "two_stage_door_entry",
      "title": "兩段式開車門上車",
      "segmentRange": [
        7,
        8
      ],
      "summary": "先短開門再複查，確認左右無來車後再開至上車角度。",
      "keyActions": [
        "先看左再看右",
        "車門先開約15公分",
        "身體不轉動再次觀察左右",
        "確認安全後開至約45度上車"
      ],
      "spokenCore": [
        "【兩段式開車門】",
        "【左右無來車】"
      ],
      "tags": [
        "entry",
        "door",
        "safety"
      ]
    },
    {
      "id": "cockpit_setup_and_engine_start",
      "title": "車內調整與發動前檢查",
      "segmentRange": [
        9,
        16
      ],
      "summary": "完成座椅鏡面與安全帶設定，再做紅火、儀表板、煞車與方向燈確認。",
      "keyActions": [
        "調整座椅/椅背/頭枕",
        "調整中央與左右後照鏡",
        "繫上安全帶",
        "確認P檔與手煞車",
        "開啟紅火觀察儀表",
        "踩煞車發動引擎",
        "測試煞車與左右方向燈"
      ],
      "spokenCore": [
        "【繫上安全帶】",
        "【確定檔位在P檔、手煞車已拉起】",
        "【開啟紅火】",
        "【引擎發動：儀表板正常】",
        "【試踩煞車：煞車正常】",
        "【試打左右方向燈：方向燈正常】"
      ],
      "tags": [
        "cockpit",
        "engine_start",
        "dashboard",
        "mirrors",
        "seatbelt"
      ]
    },
    {
      "id": "start_and_initial_turns",
      "title": "起步與前段轉彎",
      "segmentRange": [
        17,
        23
      ],
      "summary": "左方向燈起步、完成起駛觀察後右轉，再於下一路口左轉切入快車道。",
      "keyActions": [
        "左方向燈起步",
        "打D檔放手煞車",
        "轉頭查看前後左右",
        "右轉前減速查看",
        "右轉後補打左方向燈",
        "左轉走快車道並留意雙黃線"
      ],
      "spokenCore": [
        "【準備起步，打D檔，放手煞車】",
        "【左右無來車，後方無來車】",
        "【前方路口減速查看】"
      ],
      "tags": [
        "start",
        "left_signal",
        "right_turn",
        "left_turn",
        "fast_lane"
      ]
    },
    {
      "id": "lane_change_fast_to_slow",
      "title": "快車道切慢車道",
      "segmentRange": [
        24,
        26
      ],
      "summary": "右方向燈加口誦後確認後方，轉頭看到B柱再由快車道切入慢車道。",
      "keyActions": [
        "先打右方向燈",
        "口誦變換車道與安全確認",
        "轉頭時需看到B柱",
        "完成後穩定在慢車道中央"
      ],
      "spokenCore": [
        "【前方路口減速查看，進行變換車道】",
        "【左右無來車，後方無來車】"
      ],
      "tags": [
        "lane_change",
        "right_signal",
        "b_pillar",
        "slow_lane"
      ]
    },
    {
      "id": "roadside_temporary_stop",
      "title": "路邊臨時停車",
      "segmentRange": [
        27,
        35
      ],
      "summary": "右方向燈靠邊，確認後方與邊線距離，停妥後P檔與手煞車完成臨停。",
      "keyActions": [
        "右方向燈並再次檢查",
        "看左後方確認後方無來車",
        "頭需看到B柱",
        "車身靠近邊線但不可壓線",
        "停妥後打P檔拉手煞車",
        "放鬆腳煞車確認不滑動"
      ],
      "spokenCore": [
        "【前方路口減速查看，左右無來車，後方無來車】",
        "【前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車】",
        "【打P檔、拉手煞車】",
        "【路邊臨時停車完畢】"
      ],
      "tags": [
        "temporary_stop",
        "roadside",
        "right_signal",
        "parking_brake"
      ]
    },
    {
      "id": "resume_and_left_lane_change",
      "title": "由路邊切回主線並左切車道",
      "segmentRange": [
        36,
        39
      ],
      "summary": "左方向燈起步回主線，看到B柱後再左切變換車道。",
      "keyActions": [
        "踩煞車後打左方向燈",
        "打D檔放手煞車切回主線",
        "頭需看到B柱後起步",
        "再次左方向燈進行變換車道"
      ],
      "spokenCore": [
        "【切入主線道，打D檔，放手煞車，後方無來車】",
        "【進行變換車道，後方無來車】"
      ],
      "tags": [
        "resume",
        "left_signal",
        "merge",
        "lane_change",
        "b_pillar"
      ]
    },
    {
      "id": "straight_intersection_checks",
      "title": "直線行駛與路口減速查看",
      "segmentRange": [
        40,
        44
      ],
      "summary": "連續通過路口前都要減速查看，直線段保持車身與車道線間距。",
      "keyActions": [
        "每個路口前都減速查看",
        "口誦左右無來車",
        "留意兩側照後鏡與車身位置",
        "不可壓左右車道線"
      ],
      "spokenCore": [
        "【左右無來車】"
      ],
      "tags": [
        "straight",
        "intersection",
        "scan",
        "lane_centering"
      ]
    },
    {
      "id": "u_turn_sequence",
      "title": "迴轉流程",
      "segmentRange": [
        45,
        48
      ],
      "summary": "左方向燈配合路口減速查看，定點後迅速操作方向盤，迴轉後走外側車道。",
      "keyActions": [
        "左方向燈",
        "前方路口減速查看",
        "確認左右無來車",
        "到定點後迅速轉動方向盤",
        "迴轉後走外側車道"
      ],
      "spokenCore": [
        "【前方路口減速查看】",
        "【左右無來車】"
      ],
      "tags": [
        "u_turn",
        "left_signal",
        "outer_lane"
      ]
    },
    {
      "id": "post_uturn_speed_and_centering",
      "title": "迴轉後控速與置中",
      "segmentRange": [
        49,
        56
      ],
      "summary": "迴轉後保持在車道中央，避免壓線，並將車速維持在約40公里。",
      "keyActions": [
        "保持車道中央",
        "任何一側邊線都不可壓到",
        "多次路口減速查看",
        "速度約40公里",
        "標示40路段最高不超過44公里"
      ],
      "spokenCore": [
        "【前方路口減速查看】",
        "【左右無來車】"
      ],
      "tags": [
        "speed_control",
        "lane_centering",
        "intersection"
      ]
    },
    {
      "id": "signalized_left_turn_to_slow_lane",
      "title": "號誌路口左轉回慢車道",
      "segmentRange": [
        57,
        61
      ],
      "summary": "路口前打左方向燈，等待號誌後起步要左右擺頭，左轉後直接走慢車道並留意左後方插入車。",
      "keyActions": [
        "路口前打左方向燈",
        "等紅綠燈起步前做左右擺頭",
        "第一台更要明顯確認",
        "頭需看到B柱",
        "左轉後直接走慢車道",
        "注意左後方可能插入的車輛"
      ],
      "spokenCore": [
        "【前方路口減速查看】",
        "【左右無來車】",
        "【左右無來車，後方無來車】"
      ],
      "tags": [
        "traffic_light",
        "left_turn",
        "slow_lane",
        "b_pillar"
      ]
    },
    {
      "id": "return_and_finish_stop",
      "title": "回起終點與收車",
      "segmentRange": [
        62,
        71
      ],
      "summary": "回到起終點區域後依序停正、收車、兩段式開門下車並關門。",
      "keyActions": [
        "持續路口減速查看",
        "依需要打右或左方向燈調整位置",
        "回到起終點找空位停正",
        "P檔/手煞車/關風扇/關AC/熄火",
        "解開安全帶椅子退後",
        "先看後照鏡再探頭看後方",
        "兩段式開門下車",
        "最後關上車門"
      ],
      "spokenCore": [
        "【打右方向燈,左右無來車,後方無來車】",
        "【後方無來車】",
        "【左右無來車】"
      ],
      "tags": [
        "finish",
        "parking",
        "shutdown",
        "exit_vehicle"
      ]
    },
    {
      "id": "exam_general_rules",
      "title": "通用口訣與評分提醒",
      "segmentRange": [],
      "summary": "從補充文字整理出的通用規則，適合拿來出規則題。",
      "keyActions": [
        "所有轉彎都要打方向燈並口誦左右無來車後方無來車",
        "所有停車再開都要口誦左右無來車",
        "行人穿越道要口誦左右無行人",
        "超過45度死角必須轉頭觀察"
      ],
      "spokenCore": [
        "【左右無來車，後方無來車】",
        "【左右無來車】",
        "【左右無行人】"
      ],
      "tags": [
        "general_rules",
        "mnemonic",
        "grading"
      ]
    }
  ],
  "quizBlueprints": [
    {
      "id": "qb-signal-left-right",
      "type": "single_choice",
      "prompt": "此動作應打哪一側方向燈？",
      "answerRule": "依模組判斷左/右方向燈",
      "optionsHint": [
        "左方向燈",
        "右方向燈",
        "不用打方向燈",
        "雙黃燈"
      ]
    },
    {
      "id": "qb-callout",
      "type": "single_choice",
      "prompt": "此段應口誦哪句重點？",
      "answerRule": "以字幕口誦內容為準",
      "optionsHint": [
        "左右無來車",
        "後方無來車",
        "胎紋胎壓正常",
        "路邊臨時停車完畢"
      ]
    },
    {
      "id": "qb-observation-target",
      "type": "single_choice",
      "prompt": "此動作主要要確認哪個方向或位置？",
      "answerRule": "從字幕與模組擷取，例如左右、後方、B柱、車道線",
      "optionsHint": [
        "左右來車",
        "後方來車",
        "B柱死角",
        "車道邊線"
      ]
    },
    {
      "id": "qb-sequence",
      "type": "single_choice",
      "prompt": "此段正確動作順序為何？",
      "answerRule": "依字幕順序出題，例如打燈→觀察→換檔→放手煞車",
      "optionsHint": [
        "打燈→觀察→動作",
        "先動作再觀察",
        "只觀察不打燈",
        "直接加速"
      ]
    },
    {
      "id": "qb-speed-limit",
      "type": "single_choice",
      "prompt": "此路段速度控制重點是什麼？",
      "answerRule": "若字幕提到40公里或不超過44公里，優先出速限題",
      "optionsHint": [
        "約40公里",
        "可超過50公里",
        "愈慢愈好",
        "不限速度"
      ]
    }
  ],
  "segments": [
    {
      "id": "road-seg-001",
      "bankId": "RT-001",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "(車輛檢查)從左前輪開始， 雙手壓輪胎，口誦【胎紋、胎壓正常】",
      "referenceCaption": "(車輛檢查)從左前輪開始， 雙手壓輪胎，口誦【胎紋、胎壓正常】",
      "answerText": "從左前輪開始，雙手壓輪胎",
      "operationText": "從左前輪開始，雙手壓輪胎",
      "spokenText": "胎紋、胎壓正常",
      "spokenItems": [
        "胎紋、胎壓正常"
      ],
      "operationTags": [
        "tire_check"
      ],
      "reminderNotes": [],
      "startSec": 0.66,
      "endSec": 5.66,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 0.0,
      "clipEndSec": 6.66,
      "tags": [
        "tire_check"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A1"
      ],
      "officialStandards": [
        {
          "code": "A1",
          "label": "上車前察看車輛四周、車底及輪胎有無異物（狀）",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-002",
      "bankId": "RT-002",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "查看左右車燈，【車燈無破損】 蹲下看車底，【車底無異物】",
      "referenceCaption": "查看左右車燈，【車燈無破損】 蹲下看車底，【車底無異物】",
      "answerText": "查看左右車燈並蹲下看車底",
      "operationText": "查看左右車燈並蹲下看車底",
      "spokenText": "車燈無破損／車底無異物",
      "spokenItems": [
        "車燈無破損",
        "車底無異物"
      ],
      "operationTags": [
        "light_check",
        "underbody_check"
      ],
      "reminderNotes": [],
      "startSec": 5.66,
      "endSec": 10.766,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 4.66,
      "clipEndSec": 11.77,
      "tags": [
        "light_check",
        "underbody_check"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A1"
      ],
      "officialStandards": [
        {
          "code": "A1",
          "label": "上車前察看車輛四周、車底及輪胎有無異物（狀）",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-003",
      "bankId": "RT-003",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "檢查右前輪，雙手壓輪胎， 【胎紋、胎壓正常】 蹲下【車底無異物】",
      "referenceCaption": "檢查右前輪，雙手壓輪胎， 【胎紋、胎壓正常】 蹲下【車底無異物】",
      "answerText": "檢查右前輪，雙手壓輪胎並蹲下查看車底",
      "operationText": "檢查右前輪，雙手壓輪胎並蹲下查看車底",
      "spokenText": "胎紋、胎壓正常／車底無異物",
      "spokenItems": [
        "胎紋、胎壓正常",
        "車底無異物"
      ],
      "operationTags": [
        "tire_check",
        "underbody_check"
      ],
      "reminderNotes": [],
      "startSec": 10.766,
      "endSec": 20.0,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 9.77,
      "clipEndSec": 21.0,
      "tags": [
        "tire_check",
        "underbody_check"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A1"
      ],
      "officialStandards": [
        {
          "code": "A1",
          "label": "上車前察看車輛四周、車底及輪胎有無異物（狀）",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-004",
      "bankId": "RT-004",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "檢查右後輪，【胎紋、胎壓正常】",
      "referenceCaption": "檢查右後輪，【胎紋、胎壓正常】",
      "answerText": "檢查右後輪",
      "operationText": "檢查右後輪",
      "spokenText": "胎紋、胎壓正常",
      "spokenItems": [
        "胎紋、胎壓正常"
      ],
      "operationTags": [
        "tire_check"
      ],
      "reminderNotes": [],
      "startSec": 20.0,
      "endSec": 25.836,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 19.0,
      "clipEndSec": 26.84,
      "tags": [
        "tire_check"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A1"
      ],
      "officialStandards": [
        {
          "code": "A1",
          "label": "上車前察看車輛四周、車底及輪胎有無異物（狀）",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-005",
      "bankId": "RT-005",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "檢查左右車燈，【車燈無破損】； 蹲下看車底，【車底無異物】",
      "referenceCaption": "檢查左右車燈，【車燈無破損】； 蹲下看車底，【車底無異物】",
      "answerText": "檢查左右車燈，蹲下看車底",
      "operationText": "檢查左右車燈，蹲下看車底",
      "spokenText": "車燈無破損／車底無異物",
      "spokenItems": [
        "車燈無破損",
        "車底無異物"
      ],
      "operationTags": [
        "light_check",
        "underbody_check"
      ],
      "reminderNotes": [],
      "startSec": 25.836,
      "endSec": 31.955,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 24.84,
      "clipEndSec": 32.95,
      "tags": [
        "light_check",
        "underbody_check"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A1"
      ],
      "officialStandards": [
        {
          "code": "A1",
          "label": "上車前察看車輛四周、車底及輪胎有無異物（狀）",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-006",
      "bankId": "RT-006",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "檢查左後輪，【胎紋、胎壓正常】； 蹲下看車底，【車底無異物】",
      "referenceCaption": "檢查左後輪，【胎紋、胎壓正常】； 蹲下看車底，【車底無異物】",
      "answerText": "檢查左後輪，蹲下看車底",
      "operationText": "檢查左後輪，蹲下看車底",
      "spokenText": "胎紋、胎壓正常／車底無異物",
      "spokenItems": [
        "胎紋、胎壓正常",
        "車底無異物"
      ],
      "operationTags": [
        "tire_check",
        "underbody_check"
      ],
      "reminderNotes": [],
      "startSec": 31.955,
      "endSec": 36.696,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 30.95,
      "clipEndSec": 37.7,
      "tags": [
        "tire_check",
        "underbody_check"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A1"
      ],
      "officialStandards": [
        {
          "code": "A1",
          "label": "上車前察看車輛四周、車底及輪胎有無異物（狀）",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-007",
      "bankId": "RT-007",
      "moduleId": "two_stage_door_entry",
      "moduleTitle": "兩段式開車門上車",
      "captionText": "口誦【兩段式開車門】先看左、看右，確認【左右無來車】",
      "referenceCaption": "口誦【兩段式開車門】先看左、看右，確認【左右無來車】",
      "answerText": "先看左、看右，確認",
      "operationText": "先看左、看右，確認",
      "spokenText": "兩段式開車門／左右無來車",
      "spokenItems": [
        "兩段式開車門",
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "兩段式開車門",
        "安全確認"
      ],
      "reminderNotes": [],
      "startSec": 36.696,
      "endSec": 44.169,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 35.7,
      "clipEndSec": 45.17,
      "tags": [
        "safe_left_right",
        "兩段式開車門",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R1"
      ],
      "officialStandards": [
        {
          "code": "R1",
          "label": "上、下車開車門前未留意有無人車通過（下車應以2段式開門）",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-008",
      "bankId": "RT-008",
      "moduleId": "two_stage_door_entry",
      "moduleTitle": "兩段式開車門上車",
      "captionText": "車門先開約15公分，身體不轉動， 再看左、看右確認【左右無來車】後， 再開至約45度上車",
      "referenceCaption": "車門先開約15公分，身體不轉動， 再看左、看右確認【左右無來車】後， 再開至約45度上車",
      "answerText": "車門先開約15公分，身體不轉動，再看左、看右確認後，再開至約45度上車",
      "operationText": "車門先開約15公分，身體不轉動，再看左、看右確認後，再開至約45度上車",
      "spokenText": "左右無來車",
      "spokenItems": [
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "安全確認"
      ],
      "reminderNotes": [],
      "startSec": 44.169,
      "endSec": 54.177,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 43.17,
      "clipEndSec": 55.18,
      "tags": [
        "safe_left_right",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-009",
      "bankId": "RT-009",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "車內：口誦【調整座椅】【調整椅背】【調整頭枕】",
      "referenceCaption": "車內：口誦【調整座椅】【調整椅背】【調整頭枕】",
      "answerText": "車內：",
      "operationText": "車內：",
      "spokenText": "調整座椅／調整椅背／調整頭枕",
      "spokenItems": [
        "調整座椅",
        "調整椅背",
        "調整頭枕"
      ],
      "operationTags": [],
      "reminderNotes": [
        "官方表述為「調整座椅、頭枕或照後鏡」；椅背可視為座椅調整的一部分。"
      ],
      "startSec": 54.177,
      "endSec": 65.19,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 53.18,
      "clipEndSec": 66.19,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A2"
      ],
      "officialStandards": [
        {
          "code": "A2",
          "label": "起駛前調整座椅、頭枕或照後鏡（應口誦及動作檢查項目）",
          "deduction": 4,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-010",
      "bankId": "RT-010",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "【繫上安全帶】【調整中央後照鏡、左右後照鏡】【確定檔位在P檔、手煞車已拉起】",
      "referenceCaption": "【繫上安全帶】【調整中央後照鏡、左右後照鏡】【確定檔位在P檔、手煞車已拉起】",
      "answerText": "【繫上安全帶】【調整中央後照鏡、左右後照鏡】【確定檔位在P檔、手煞車已拉起】",
      "operationText": "【繫上安全帶】【調整中央後照鏡、左右後照鏡】【確定檔位在P檔、手煞車已拉起】",
      "spokenText": "繫上安全帶／調整中央後照鏡、左右後照鏡／確定檔位在P檔、手煞車已拉起",
      "spokenItems": [
        "繫上安全帶",
        "調整中央後照鏡、左右後照鏡",
        "確定檔位在P檔、手煞車已拉起"
      ],
      "operationTags": [
        "gear_p",
        "hand_brake",
        "後照鏡確認"
      ],
      "reminderNotes": [
        "官方表述為「調整座椅、頭枕或照後鏡」；椅背可視為座椅調整的一部分。"
      ],
      "startSec": 65.19,
      "endSec": 83.033,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 64.19,
      "clipEndSec": 84.03,
      "tags": [
        "gear_p",
        "hand_brake",
        "後照鏡確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A2"
      ],
      "officialStandards": [
        {
          "code": "A2",
          "label": "起駛前調整座椅、頭枕或照後鏡（應口誦及動作檢查項目）",
          "deduction": 4,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-011",
      "bankId": "RT-011",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "鑰匙往外轉【開啟紅火】",
      "referenceCaption": "鑰匙往外轉【開啟紅火】",
      "answerText": "鑰匙往外轉",
      "operationText": "鑰匙往外轉",
      "spokenText": "開啟紅火",
      "spokenItems": [
        "開啟紅火"
      ],
      "operationTags": [
        "ignition_on"
      ],
      "reminderNotes": [
        "此段屬發動前流程的一部分；官方核心是自排車須入P檔且踩煞車。"
      ],
      "startSec": 83.033,
      "endSec": 89.773,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 82.03,
      "clipEndSec": 90.77,
      "tags": [
        "ignition_on"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A5"
      ],
      "officialStandards": [
        {
          "code": "A5",
          "label": "自排車發動引擎未入P檔或未踩煞車",
          "deduction": 16,
          "page": 1
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-012",
      "bankId": "RT-012",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "【油量、溫度、引擎、電瓶、手煞車燈、機油 正常】",
      "referenceCaption": "【油量、溫度、引擎、電瓶、手煞車燈、機油 正常】",
      "answerText": "檢查儀表（溫度、油量、煞車、充電、機油）作用",
      "operationText": "檢查儀表（溫度、油量、煞車、充電、機油）作用",
      "spokenText": "油量、溫度、引擎、電瓶、手煞車燈、機油 正常",
      "spokenItems": [
        "油量、溫度、引擎、電瓶、手煞車燈、機油 正常"
      ],
      "operationTags": [
        "hand_brake"
      ],
      "reminderNotes": [
        "此段已改用官方評分表的儀表檢查名稱。"
      ],
      "startSec": 89.773,
      "endSec": 101.697,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 88.77,
      "clipEndSec": 102.7,
      "tags": [
        "hand_brake"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A4"
      ],
      "officialStandards": [
        {
          "code": "A4",
          "label": "起駛前檢查儀表（溫度、油量、煞車、充電、機油）作用（應口誦及指出儀表檢查項目）",
          "deduction": 4,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-013",
      "bankId": "RT-013",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "踩煞車、發動引擎，口誦 【引擎發動：儀表板正常】",
      "referenceCaption": "踩煞車、發動引擎，口誦 【引擎發動：儀表板正常】",
      "answerText": "踩煞車、發動引擎",
      "operationText": "踩煞車、發動引擎",
      "spokenText": "引擎發動：儀表板正常",
      "spokenItems": [
        "引擎發動：儀表板正常"
      ],
      "operationTags": [
        "engine_start"
      ],
      "reminderNotes": [],
      "startSec": 101.697,
      "endSec": 107.723,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 100.7,
      "clipEndSec": 108.72,
      "tags": [
        "engine_start"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A5"
      ],
      "officialStandards": [
        {
          "code": "A5",
          "label": "自排車發動引擎未入P檔或未踩煞車",
          "deduction": 16,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-014",
      "bankId": "RT-014",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "開風扇 開AC； (發動後只會剩手煞車燈亮著)",
      "referenceCaption": "開風扇 開AC； (發動後只會剩手煞車燈亮著)",
      "answerText": "開風扇並開AC",
      "operationText": "開風扇並開AC",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "hand_brake",
        "發動後燈號檢查"
      ],
      "reminderNotes": [
        "發動後只會剩手煞車燈亮著",
        "此段屬教練補充，不是你上傳官方評分表明列的扣分核心。"
      ],
      "startSec": 107.723,
      "endSec": 112.89,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 106.72,
      "clipEndSec": 113.89,
      "tags": [
        "hand_brake",
        "發動後燈號檢查"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "coach_only",
      "examRelevant": false,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-015",
      "bankId": "RT-014",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "口誦【試踩煞車：煞車正常】",
      "referenceCaption": "口誦【試踩煞車：煞車正常】",
      "answerText": "口誦【試踩煞車：煞車正常】",
      "operationText": "口誦【試踩煞車：煞車正常】",
      "spokenText": "試踩煞車：煞車正常",
      "spokenItems": [
        "試踩煞車：煞車正常"
      ],
      "operationTags": [],
      "reminderNotes": [],
      "startSec": 112.89,
      "endSec": 117.89,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 111.89,
      "clipEndSec": 118.89,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A6"
      ],
      "officialStandards": [
        {
          "code": "A6",
          "label": "起駛前未鬆開手煞車及檢查煞車作用",
          "deduction": 16,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-016",
      "bankId": "RT-015",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "口誦【試打左右方向燈：方向燈正常】",
      "referenceCaption": "口誦【試打左右方向燈：方向燈正常】",
      "answerText": "口誦【試打左右方向燈：方向燈正常】",
      "operationText": "口誦【試打左右方向燈：方向燈正常】",
      "spokenText": "試打左右方向燈：方向燈正常",
      "spokenItems": [
        "試打左右方向燈：方向燈正常"
      ],
      "operationTags": [
        "right_signal"
      ],
      "reminderNotes": [
        "官方明列的是起駛、變換車道、轉彎前須依規定顯示方向燈；本段為起駛前自我確認。"
      ],
      "startSec": 117.89,
      "endSec": 123.89,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 116.89,
      "clipEndSec": 124.89,
      "tags": [
        "right_signal"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A7"
      ],
      "officialStandards": [
        {
          "code": "A7",
          "label": "起駛前未依規定顯示方向燈",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-017",
      "bankId": "RT-016",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "打左方向燈，口誦【準備起步，打D檔，放手煞車】",
      "referenceCaption": "打左方向燈，口誦【準備起步，打D檔，放手煞車】",
      "answerText": "打左方向燈",
      "operationText": "打左方向燈",
      "spokenText": "準備起步，打D檔，放手煞車",
      "spokenItems": [
        "準備起步，打D檔，放手煞車"
      ],
      "operationTags": [
        "left_signal",
        "gear_d",
        "hand_brake"
      ],
      "reminderNotes": [],
      "startSec": 123.89,
      "endSec": 131.835,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 122.89,
      "clipEndSec": 132.84,
      "tags": [
        "left_signal",
        "gear_d",
        "hand_brake"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A6",
        "A7"
      ],
      "officialStandards": [
        {
          "code": "A6",
          "label": "起駛前未鬆開手煞車及檢查煞車作用",
          "deduction": 16,
          "page": 1
        },
        {
          "code": "A7",
          "label": "起駛前未依規定顯示方向燈",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-018",
      "bankId": "RT-017",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "起駛前轉頭查看前後左右， 口誦【左右無來車，後方無來車】",
      "referenceCaption": "起駛前轉頭查看前後左右， 口誦【左右無來車，後方無來車】",
      "answerText": "起駛前轉頭查看前後左右",
      "operationText": "起駛前轉頭查看前後左右",
      "spokenText": "左右無來車，後方無來車",
      "spokenItems": [
        "左右無來車，後方無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "rear_clear",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [],
      "startSec": 131.835,
      "endSec": 144.424,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 130.84,
      "clipEndSec": 145.42,
      "tags": [
        "safe_left_right",
        "rear_clear",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A8"
      ],
      "officialStandards": [
        {
          "code": "A8",
          "label": "起駛前未轉頭察看照後鏡、檢查視野死角及注意前後左右有無障礙或車輛行人通過；不暫停讓行進中之車輛行人優先通行",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-019",
      "bankId": "RT-018",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "方向燈回正，打右邊方向燈",
      "referenceCaption": "方向燈回正，打右邊方向燈",
      "answerText": "方向燈回正，打右邊方向燈",
      "operationText": "方向燈回正，打右邊方向燈",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [],
      "reminderNotes": [],
      "startSec": 149.46,
      "endSec": 154.632,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 148.46,
      "clipEndSec": 155.63,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-020",
      "bankId": "RT-019",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "前方路口減速查看；",
      "referenceCaption": "前方路口減速查看；",
      "answerText": "前方路口減速查看",
      "operationText": "前方路口減速查看",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "intersection_scan"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 154.632,
      "endSec": 158.551,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 153.63,
      "clipEndSec": 159.55,
      "tags": [
        "intersection_scan"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-021",
      "bankId": "RT-020",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "(行駛時出入都靠大門左側)",
      "referenceCaption": "(行駛時出入都靠大門左側)",
      "answerText": "(行駛時出入都靠大門左側)",
      "operationText": "(行駛時出入都靠大門左側)",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "大門左側"
      ],
      "reminderNotes": [
        "行駛時出入都靠大門左側"
      ],
      "startSec": 158.551,
      "endSec": 176.8,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 157.55,
      "clipEndSec": 177.8,
      "tags": [
        "大門左側"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-022",
      "bankId": "RT-021",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "【左右無來車、後方無來車】 右轉後打左方向燈",
      "referenceCaption": "【左右無來車、後方無來車】 右轉後打左方向燈",
      "answerText": "右轉後打左方向燈",
      "operationText": "右轉後打左方向燈",
      "spokenText": "左右無來車、後方無來車",
      "spokenItems": [
        "左右無來車、後方無來車"
      ],
      "operationTags": [
        "left_signal",
        "safe_left_right",
        "rear_clear",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [
        "轉彎前核心是方向燈、照後鏡、死角確認；B柱轉頭屬教練用來落實死角確認的操作提醒。"
      ],
      "startSec": 176.8,
      "endSec": 184.328,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 175.8,
      "clipEndSec": 185.33,
      "tags": [
        "left_signal",
        "safe_left_right",
        "rear_clear",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R3",
        "R4",
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        },
        {
          "code": "R4",
          "label": "變換車道、轉彎後仍持續顯示方向燈",
          "deduction": 16,
          "page": 2
        },
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-023",
      "bankId": "RT-022",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "【前方路口減速查看,左右無來車】； 左轉走快車道 此路口需特別注意雙黃線",
      "referenceCaption": "【前方路口減速查看,左右無來車】； 左轉走快車道 此路口需特別注意雙黃線",
      "answerText": "左轉走快車道 此路口需特別注意雙黃線",
      "operationText": "左轉走快車道 此路口需特別注意雙黃線",
      "spokenText": "前方路口減速查看,左右無來車",
      "spokenItems": [
        "前方路口減速查看,左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "fast_lane",
        "雙黃線",
        "快車道",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 184.328,
      "endSec": 198.949,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 183.33,
      "clipEndSec": 199.95,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "fast_lane",
        "雙黃線",
        "快車道",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-024",
      "bankId": "RT-023",
      "moduleId": "lane_change_fast_to_slow",
      "moduleTitle": "快車道切慢車道",
      "captionText": "打右方向燈 【前方路口減速查看，進行變換車道】 【左右無來車，後方無來車】",
      "referenceCaption": "打右方向燈 【前方路口減速查看，進行變換車道】 【左右無來車，後方無來車】",
      "answerText": "打右方向燈",
      "operationText": "打右方向燈",
      "spokenText": "前方路口減速查看，進行變換車道／左右無來車，後方無來車",
      "spokenItems": [
        "前方路口減速查看，進行變換車道",
        "左右無來車，後方無來車"
      ],
      "operationTags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "lane_change",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [
        "切換完成後須記得取消方向燈，否則仍可能連續扣分。"
      ],
      "startSec": 198.949,
      "endSec": 214.26,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 197.95,
      "clipEndSec": 215.26,
      "tags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "lane_change",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R3",
        "R4",
        "R7"
      ],
      "officialStandards": [
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        },
        {
          "code": "R4",
          "label": "變換車道、轉彎後仍持續顯示方向燈",
          "deduction": 16,
          "page": 2
        },
        {
          "code": "R7",
          "label": "未按規定路線行駛或未按規定變換車道",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-025",
      "bankId": "RT-024",
      "moduleId": "lane_change_fast_to_slow",
      "moduleTitle": "快車道切慢車道",
      "captionText": "由快車道切換至慢車道，轉頭時需看到B柱",
      "referenceCaption": "由快車道切換至慢車道，轉頭時需看到B柱",
      "answerText": "由快車道切換至慢車道，轉頭時需看到B柱",
      "operationText": "由快車道切換至慢車道，轉頭時需看到B柱",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "b_pillar",
        "fast_lane",
        "slow_lane",
        "B柱確認",
        "慢車道",
        "快車道"
      ],
      "reminderNotes": [
        "B柱與45度是教練化提醒，目的在於落實官方要求的照後鏡與視野死角檢查。"
      ],
      "startSec": 214.26,
      "endSec": 221.487,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 213.26,
      "clipEndSec": 222.49,
      "tags": [
        "b_pillar",
        "fast_lane",
        "slow_lane",
        "B柱確認",
        "慢車道",
        "快車道"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A8",
        "R3"
      ],
      "officialStandards": [
        {
          "code": "A8",
          "label": "起駛前未轉頭察看照後鏡、檢查視野死角及注意前後左右有無障礙或車輛行人通過；不暫停讓行進中之車輛行人優先通行",
          "deduction": 32,
          "page": 1
        },
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1/2頁"
    },
    {
      "id": "road-seg-026",
      "bankId": "RT-025",
      "moduleId": "lane_change_fast_to_slow",
      "moduleTitle": "快車道切慢車道",
      "captionText": "完成變換車道後，持續穩定行駛於慢車道",
      "referenceCaption": "完成變換車道後，持續穩定行駛於慢車道",
      "answerText": "完成變換車道後，持續穩定行駛於慢車道",
      "operationText": "完成變換車道後，持續穩定行駛於慢車道",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "lane_change",
        "slow_lane",
        "慢車道"
      ],
      "reminderNotes": [],
      "startSec": 221.487,
      "endSec": 227.835,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 220.49,
      "clipEndSec": 228.84,
      "tags": [
        "lane_change",
        "slow_lane",
        "慢車道"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-027",
      "bankId": "RT-026",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "打右方向燈，口誦【前方路口減速查看，左右無來車，後方無來車】；再看左後方【後方無來車】，",
      "referenceCaption": "打右方向燈，口誦【前方路口減速查看，左右無來車，後方無來車】；再看左後方【後方無來車】，",
      "answerText": "打右方向燈，再看左後方",
      "operationText": "打右方向燈，再看左後方",
      "spokenText": "前方路口減速查看，左右無來車，後方無來車／後方無來車",
      "spokenItems": [
        "前方路口減速查看，左右無來車，後方無來車",
        "後方無來車"
      ],
      "operationTags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "左後方確認",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [
        "轉彎前核心是方向燈、照後鏡、死角確認；B柱轉頭屬教練用來落實死角確認的操作提醒。"
      ],
      "startSec": 227.835,
      "endSec": 240.418,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 226.84,
      "clipEndSec": 241.42,
      "tags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "左後方確認",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R3",
        "R4",
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        },
        {
          "code": "R4",
          "label": "變換車道、轉彎後仍持續顯示方向燈",
          "deduction": 16,
          "page": 2
        },
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-028",
      "bankId": "RT-027",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "頭需看到B柱，車身盡量靠近道路邊線",
      "referenceCaption": "頭需看到B柱，車身盡量靠近道路邊線",
      "answerText": "頭需看到B柱，車身盡量靠近道路邊線",
      "operationText": "頭需看到B柱，車身盡量靠近道路邊線",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "b_pillar",
        "B柱確認",
        "邊線控制"
      ],
      "reminderNotes": [
        "B柱與45度是教練化提醒，目的在於落實官方要求的照後鏡與視野死角檢查。"
      ],
      "startSec": 240.418,
      "endSec": 250.585,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 239.42,
      "clipEndSec": 251.59,
      "tags": [
        "b_pillar",
        "B柱確認",
        "邊線控制"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A8",
        "R3"
      ],
      "officialStandards": [
        {
          "code": "A8",
          "label": "起駛前未轉頭察看照後鏡、檢查視野死角及注意前後左右有無障礙或車輛行人通過；不暫停讓行進中之車輛行人優先通行",
          "deduction": 32,
          "page": 1
        },
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1/2頁"
    },
    {
      "id": "road-seg-029",
      "bankId": "RT-028",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "注意道路邊線不可壓到，",
      "referenceCaption": "注意道路邊線不可壓到，",
      "answerText": "注意道路邊線不可壓到",
      "operationText": "注意道路邊線不可壓到",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "邊線控制"
      ],
      "reminderNotes": [],
      "startSec": 254.086,
      "endSec": 259.031,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 253.09,
      "clipEndSec": 260.03,
      "tags": [
        "邊線控制"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-030",
      "bankId": "RT-029",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "打右方向燈；",
      "referenceCaption": "打右方向燈；",
      "answerText": "打右方向燈",
      "operationText": "打右方向燈",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "right_signal"
      ],
      "reminderNotes": [],
      "startSec": 259.031,
      "endSec": 263.92,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 258.03,
      "clipEndSec": 264.92,
      "tags": [
        "right_signal"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-031",
      "bankId": "RT-030",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "【前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車】，",
      "referenceCaption": "【前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車】，",
      "answerText": "【前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車】，",
      "operationText": "【前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車】，",
      "spokenText": "前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車",
      "spokenItems": [
        "前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "temporary_stop",
        "臨停",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 263.92,
      "endSec": 274.24,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 262.92,
      "clipEndSec": 275.24,
      "tags": [
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "temporary_stop",
        "臨停",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-032",
      "bankId": "RT-031",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "頭需看到B柱",
      "referenceCaption": "頭需看到B柱",
      "answerText": "頭需看到B柱",
      "operationText": "頭需看到B柱",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "b_pillar",
        "B柱確認"
      ],
      "reminderNotes": [
        "B柱與45度是教練化提醒，目的在於落實官方要求的照後鏡與視野死角檢查。"
      ],
      "startSec": 274.24,
      "endSec": 275.962,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 273.24,
      "clipEndSec": 276.96,
      "tags": [
        "b_pillar",
        "B柱確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A8",
        "R3"
      ],
      "officialStandards": [
        {
          "code": "A8",
          "label": "起駛前未轉頭察看照後鏡、檢查視野死角及注意前後左右有無障礙或車輛行人通過；不暫停讓行進中之車輛行人優先通行",
          "deduction": 32,
          "page": 1
        },
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1/2頁"
    },
    {
      "id": "road-seg-033",
      "bankId": "RT-032",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "【打P檔、拉手煞車】；",
      "referenceCaption": "【打P檔、拉手煞車】；",
      "answerText": "【打P檔、拉手煞車】；",
      "operationText": "【打P檔、拉手煞車】；",
      "spokenText": "打P檔、拉手煞車",
      "spokenItems": [
        "打P檔、拉手煞車"
      ],
      "operationTags": [
        "gear_p",
        "hand_brake"
      ],
      "reminderNotes": [
        "影片把臨停後的手腳順序講得很細；官方評分重點則落在是否依規定路線與安全方式完成。"
      ],
      "startSec": 276.487,
      "endSec": 282.489,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 275.49,
      "clipEndSec": 283.49,
      "tags": [
        "gear_p",
        "hand_brake"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R7"
      ],
      "officialStandards": [
        {
          "code": "R7",
          "label": "未按規定路線行駛或未按規定變換車道",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-034",
      "bankId": "RT-033",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "放鬆腳煞車，確認不滑動後， 腳再回煞車",
      "referenceCaption": "放鬆腳煞車，確認不滑動後， 腳再回煞車",
      "answerText": "放鬆腳煞車，確認不滑動後，腳再回煞車",
      "operationText": "放鬆腳煞車，確認不滑動後，腳再回煞車",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [],
      "reminderNotes": [],
      "startSec": 282.489,
      "endSec": 285.312,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 281.49,
      "clipEndSec": 286.31,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-035",
      "bankId": "RT-034",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "【路邊臨時停車完畢】",
      "referenceCaption": "【路邊臨時停車完畢】",
      "answerText": "【路邊臨時停車完畢】",
      "operationText": "【路邊臨時停車完畢】",
      "spokenText": "路邊臨時停車完畢",
      "spokenItems": [
        "路邊臨時停車完畢"
      ],
      "operationTags": [
        "temporary_stop",
        "臨停"
      ],
      "reminderNotes": [
        "影片把臨停後的手腳順序講得很細；官方評分重點則落在是否依規定路線與安全方式完成。"
      ],
      "startSec": 285.312,
      "endSec": 288.22,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 284.31,
      "clipEndSec": 289.22,
      "tags": [
        "temporary_stop",
        "臨停"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R7"
      ],
      "officialStandards": [
        {
          "code": "R7",
          "label": "未按規定路線行駛或未按規定變換車道",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-036",
      "bankId": "RT-035",
      "moduleId": "resume_and_left_lane_change",
      "moduleTitle": "由路邊切回主線並左切車道",
      "captionText": "踩剎車，打左方向燈 【切入主線道，打D檔，放手煞車，後方無來車】；",
      "referenceCaption": "踩剎車，打左方向燈 【切入主線道，打D檔，放手煞車，後方無來車】；",
      "answerText": "踩剎車，打左方向燈",
      "operationText": "踩剎車，打左方向燈",
      "spokenText": "切入主線道，打D檔，放手煞車，後方無來車",
      "spokenItems": [
        "切入主線道，打D檔，放手煞車，後方無來車"
      ],
      "operationTags": [
        "left_signal",
        "rear_clear",
        "gear_d",
        "hand_brake",
        "後方確認"
      ],
      "reminderNotes": [],
      "startSec": 288.22,
      "endSec": 302.061,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 287.22,
      "clipEndSec": 303.06,
      "tags": [
        "left_signal",
        "rear_clear",
        "gear_d",
        "hand_brake",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A6",
        "A7"
      ],
      "officialStandards": [
        {
          "code": "A6",
          "label": "起駛前未鬆開手煞車及檢查煞車作用",
          "deduction": 16,
          "page": 1
        },
        {
          "code": "A7",
          "label": "起駛前未依規定顯示方向燈",
          "deduction": 32,
          "page": 1
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1頁"
    },
    {
      "id": "road-seg-037",
      "bankId": "RT-036",
      "moduleId": "resume_and_left_lane_change",
      "moduleTitle": "由路邊切回主線並左切車道",
      "captionText": "頭需看到B柱後再起步",
      "referenceCaption": "頭需看到B柱後再起步",
      "answerText": "頭需看到B柱後再起步",
      "operationText": "頭需看到B柱後再起步",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "b_pillar",
        "B柱確認"
      ],
      "reminderNotes": [
        "B柱與45度是教練化提醒，目的在於落實官方要求的照後鏡與視野死角檢查。"
      ],
      "startSec": 302.061,
      "endSec": 305.709,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 301.06,
      "clipEndSec": 306.71,
      "tags": [
        "b_pillar",
        "B柱確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A8",
        "R3"
      ],
      "officialStandards": [
        {
          "code": "A8",
          "label": "起駛前未轉頭察看照後鏡、檢查視野死角及注意前後左右有無障礙或車輛行人通過；不暫停讓行進中之車輛行人優先通行",
          "deduction": 32,
          "page": 1
        },
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1/2頁"
    },
    {
      "id": "road-seg-038",
      "bankId": "RT-037",
      "moduleId": "resume_and_left_lane_change",
      "moduleTitle": "由路邊切回主線並左切車道",
      "captionText": "打左方向燈，口誦 【進行變換車道，後方無來車】；",
      "referenceCaption": "打左方向燈，口誦 【進行變換車道，後方無來車】；",
      "answerText": "打左方向燈",
      "operationText": "打左方向燈",
      "spokenText": "進行變換車道，後方無來車",
      "spokenItems": [
        "進行變換車道，後方無來車"
      ],
      "operationTags": [
        "left_signal",
        "rear_clear",
        "lane_change",
        "後方確認"
      ],
      "reminderNotes": [
        "切換完成後須記得取消方向燈，否則仍可能連續扣分。"
      ],
      "startSec": 312.292,
      "endSec": 320.801,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 311.29,
      "clipEndSec": 321.8,
      "tags": [
        "left_signal",
        "rear_clear",
        "lane_change",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R3",
        "R4",
        "R7"
      ],
      "officialStandards": [
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        },
        {
          "code": "R4",
          "label": "變換車道、轉彎後仍持續顯示方向燈",
          "deduction": 16,
          "page": 2
        },
        {
          "code": "R7",
          "label": "未按規定路線行駛或未按規定變換車道",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-039",
      "bankId": "RT-038",
      "moduleId": "resume_and_left_lane_change",
      "moduleTitle": "由路邊切回主線並左切車道",
      "captionText": "頭需看到B柱，沒車再變換車道",
      "referenceCaption": "頭需看到B柱，沒車再變換車道",
      "answerText": "頭需看到B柱，沒車再變換車道",
      "operationText": "頭需看到B柱，沒車再變換車道",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "b_pillar",
        "lane_change",
        "B柱確認"
      ],
      "reminderNotes": [
        "B柱與45度是教練化提醒，目的在於落實官方要求的照後鏡與視野死角檢查。"
      ],
      "startSec": 320.801,
      "endSec": 324.866,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 319.8,
      "clipEndSec": 325.87,
      "tags": [
        "b_pillar",
        "lane_change",
        "B柱確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A8",
        "R3"
      ],
      "officialStandards": [
        {
          "code": "A8",
          "label": "起駛前未轉頭察看照後鏡、檢查視野死角及注意前後左右有無障礙或車輛行人通過；不暫停讓行進中之車輛行人優先通行",
          "deduction": 32,
          "page": 1
        },
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1/2頁"
    },
    {
      "id": "road-seg-040",
      "bankId": "RT-039",
      "moduleId": "straight_intersection_checks",
      "moduleTitle": "直線行駛與路口減速查看",
      "captionText": "前方路口減速查看，口誦【左右無來車】；",
      "referenceCaption": "前方路口減速查看，口誦【左右無來車】；",
      "answerText": "前方路口減速查看",
      "operationText": "前方路口減速查看",
      "spokenText": "左右無來車",
      "spokenItems": [
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 325.374,
      "endSec": 335.325,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 324.37,
      "clipEndSec": 336.32,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-041",
      "bankId": "RT-040",
      "moduleId": "straight_intersection_checks",
      "moduleTitle": "直線行駛與路口減速查看",
      "captionText": "直線路段留意兩側照後鏡與車身、車道線間距",
      "referenceCaption": "直線路段留意兩側照後鏡與車身、車道線間距",
      "answerText": "直線路段留意兩側照後鏡與車身、車道線間距",
      "operationText": "直線路段留意兩側照後鏡與車身、車道線間距",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "車道線控制"
      ],
      "reminderNotes": [],
      "startSec": 335.325,
      "endSec": 345.9,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 334.32,
      "clipEndSec": 346.9,
      "tags": [
        "車道線控制"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-042",
      "bankId": "RT-041",
      "moduleId": "straight_intersection_checks",
      "moduleTitle": "直線行駛與路口減速查看",
      "captionText": "前方路口減速查看，口誦【左右無來車】；",
      "referenceCaption": "前方路口減速查看，口誦【左右無來車】；",
      "answerText": "前方路口減速查看",
      "operationText": "前方路口減速查看",
      "spokenText": "左右無來車",
      "spokenItems": [
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 346.9,
      "endSec": 356.779,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 345.9,
      "clipEndSec": 357.78,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-043",
      "bankId": "RT-042",
      "moduleId": "straight_intersection_checks",
      "moduleTitle": "直線行駛與路口減速查看",
      "captionText": "行駛中隨時注意不要壓到左右車道線",
      "referenceCaption": "行駛中隨時注意不要壓到左右車道線",
      "answerText": "行駛中隨時注意不要壓到左右車道線",
      "operationText": "行駛中隨時注意不要壓到左右車道線",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "車道線控制"
      ],
      "reminderNotes": [],
      "startSec": 359.782,
      "endSec": 367.28,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 358.78,
      "clipEndSec": 368.28,
      "tags": [
        "車道線控制"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-044",
      "bankId": "RT-043",
      "moduleId": "straight_intersection_checks",
      "moduleTitle": "直線行駛與路口減速查看",
      "captionText": "再次通過路口前減速查看，口誦【左右無來車】",
      "referenceCaption": "再次通過路口前減速查看，口誦【左右無來車】",
      "answerText": "再次通過路口前減速查看",
      "operationText": "再次通過路口前減速查看",
      "spokenText": "左右無來車",
      "spokenItems": [
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "安全確認"
      ],
      "reminderNotes": [],
      "startSec": 368.28,
      "endSec": 376.28,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 367.28,
      "clipEndSec": 377.28,
      "tags": [
        "safe_left_right",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-045",
      "bankId": "RT-044",
      "moduleId": "u_turn_sequence",
      "moduleTitle": "迴轉流程",
      "captionText": "打左方向燈",
      "referenceCaption": "打左方向燈",
      "answerText": "打左方向燈",
      "operationText": "打左方向燈",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "left_signal"
      ],
      "reminderNotes": [],
      "startSec": 390.736,
      "endSec": 394.142,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 389.74,
      "clipEndSec": 395.14,
      "tags": [
        "left_signal"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-046",
      "bankId": "RT-045",
      "moduleId": "u_turn_sequence",
      "moduleTitle": "迴轉流程",
      "captionText": "【前方路口減速查看】，配合準備迴轉",
      "referenceCaption": "【前方路口減速查看】，配合準備迴轉",
      "answerText": "配合準備迴轉",
      "operationText": "配合準備迴轉",
      "spokenText": "前方路口減速查看",
      "spokenItems": [
        "前方路口減速查看"
      ],
      "operationTags": [
        "intersection_scan",
        "u_turn"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 394.142,
      "endSec": 404.993,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 393.14,
      "clipEndSec": 405.99,
      "tags": [
        "intersection_scan",
        "u_turn"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-047",
      "bankId": "RT-046",
      "moduleId": "u_turn_sequence",
      "moduleTitle": "迴轉流程",
      "captionText": "確認【左右無來車】； 到達定點後迅速完成方向盤操作",
      "referenceCaption": "確認【左右無來車】； 到達定點後迅速完成方向盤操作",
      "answerText": "確認，到達定點後迅速完成方向盤操作",
      "operationText": "確認，到達定點後迅速完成方向盤操作",
      "spokenText": "左右無來車",
      "spokenItems": [
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "安全確認"
      ],
      "reminderNotes": [],
      "startSec": 405.0,
      "endSec": 413.136,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 404.0,
      "clipEndSec": 414.14,
      "tags": [
        "safe_left_right",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-048",
      "bankId": "RT-047",
      "moduleId": "u_turn_sequence",
      "moduleTitle": "迴轉流程",
      "captionText": "迴轉後走外側車道，",
      "referenceCaption": "迴轉後走外側車道，",
      "answerText": "迴轉後走外側車道",
      "operationText": "迴轉後走外側車道",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "u_turn",
        "外側車道"
      ],
      "reminderNotes": [],
      "startSec": 413.622,
      "endSec": 428.299,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 412.62,
      "clipEndSec": 429.3,
      "tags": [
        "u_turn",
        "外側車道"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-049",
      "bankId": "RT-048",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "持續注意兩側車道線，盡量讓車輛保持在車道中央",
      "referenceCaption": "持續注意兩側車道線，盡量讓車輛保持在車道中央",
      "answerText": "持續注意兩側車道線，盡量讓車輛保持在車道中央",
      "operationText": "持續注意兩側車道線，盡量讓車輛保持在車道中央",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "車道線控制"
      ],
      "reminderNotes": [],
      "startSec": 428.299,
      "endSec": 435.58,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 427.3,
      "clipEndSec": 436.58,
      "tags": [
        "車道線控制"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-050",
      "bankId": "RT-049",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "壓到任何一側邊線都會扣分，",
      "referenceCaption": "壓到任何一側邊線都會扣分，",
      "answerText": "壓到任何一側邊線都會扣分",
      "operationText": "壓到任何一側邊線都會扣分",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "邊線控制",
        "扣分提醒"
      ],
      "reminderNotes": [],
      "startSec": 437.073,
      "endSec": 440.698,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 436.07,
      "clipEndSec": 441.7,
      "tags": [
        "邊線控制",
        "扣分提醒"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-051",
      "bankId": "RT-050",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "【前方路口減速查看】【左右無來車】",
      "operationText": "【前方路口減速查看】【左右無來車】",
      "spokenText": "前方路口減速查看／左右無來車",
      "spokenItems": [
        "前方路口減速查看",
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 440.698,
      "endSec": 446.58,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 439.7,
      "clipEndSec": 447.58,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-052",
      "bankId": "RT-051",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "行車速度盡量維持在約40公里左右",
      "referenceCaption": "行車速度盡量維持在約40公里左右",
      "answerText": "行車速度盡量維持在約40公里左右",
      "operationText": "行車速度盡量維持在約40公里左右",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "速度控制"
      ],
      "reminderNotes": [],
      "startSec": 452.31,
      "endSec": 457.31,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 451.31,
      "clipEndSec": 458.31,
      "tags": [
        "速度控制"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-053",
      "bankId": "RT-052",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "【前方路口減速查看】【左右無來車】",
      "operationText": "【前方路口減速查看】【左右無來車】",
      "spokenText": "前方路口減速查看／左右無來車",
      "spokenItems": [
        "前方路口減速查看",
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 459.31,
      "endSec": 465.31,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 458.31,
      "clipEndSec": 466.31,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-054",
      "bankId": "RT-053",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "【前方路口減速查看】【左右無來車】",
      "operationText": "【前方路口減速查看】【左右無來車】",
      "spokenText": "前方路口減速查看／左右無來車",
      "spokenItems": [
        "前方路口減速查看",
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 476.26,
      "endSec": 483.26,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 475.26,
      "clipEndSec": 484.26,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-055",
      "bankId": "RT-054",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "此路段須特別注意車速， 標示約40公里，最高速度不要超過44公里",
      "referenceCaption": "此路段須特別注意車速， 標示約40公里，最高速度不要超過44公里",
      "answerText": "此路段須特別注意車速，標示約40公里，最高速度不要超過44公里",
      "operationText": "此路段須特別注意車速，標示約40公里，最高速度不要超過44公里",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "速度控制"
      ],
      "reminderNotes": [],
      "startSec": 489.74,
      "endSec": 499.74,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 488.74,
      "clipEndSec": 500.74,
      "tags": [
        "速度控制"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-056",
      "bankId": "RT-055",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "【前方路口減速查看】【左右無來車】",
      "operationText": "【前方路口減速查看】【左右無來車】",
      "spokenText": "前方路口減速查看／左右無來車",
      "spokenItems": [
        "前方路口減速查看",
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 499.74,
      "endSec": 505.374,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 498.74,
      "clipEndSec": 506.37,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-057",
      "bankId": "RT-056",
      "moduleId": "signalized_left_turn_to_slow_lane",
      "moduleTitle": "號誌路口左轉回慢車道",
      "captionText": "到路口前打左方向燈 【前方路口減速查看】【左右無來車】",
      "referenceCaption": "到路口前打左方向燈 【前方路口減速查看】【左右無來車】",
      "answerText": "到路口前打左方向燈",
      "operationText": "到路口前打左方向燈",
      "spokenText": "前方路口減速查看／左右無來車",
      "spokenItems": [
        "前方路口減速查看",
        "左右無來車"
      ],
      "operationTags": [
        "left_signal",
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "reminderNotes": [
        "轉彎前核心是方向燈、照後鏡、死角確認；B柱轉頭屬教練用來落實死角確認的操作提醒。"
      ],
      "startSec": 508.948,
      "endSec": 519.132,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 507.95,
      "clipEndSec": 520.13,
      "tags": [
        "left_signal",
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R3",
        "R4",
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        },
        {
          "code": "R4",
          "label": "變換車道、轉彎後仍持續顯示方向燈",
          "deduction": 16,
          "page": 2
        },
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-058",
      "bankId": "RT-057",
      "moduleId": "signalized_left_turn_to_slow_lane",
      "moduleTitle": "號誌路口左轉回慢車道",
      "captionText": "等紅綠燈後，起步前記得做左右擺頭； 尤其是第一台",
      "referenceCaption": "等紅綠燈後，起步前記得做左右擺頭； 尤其是第一台",
      "answerText": "等紅綠燈後，起步前記得做左右擺頭，尤其是第一台",
      "operationText": "等紅綠燈後，起步前記得做左右擺頭，尤其是第一台",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "號誌路口"
      ],
      "reminderNotes": [],
      "startSec": 519.132,
      "endSec": 555.352,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 518.13,
      "clipEndSec": 556.35,
      "tags": [
        "號誌路口"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-059",
      "bankId": "RT-058",
      "moduleId": "signalized_left_turn_to_slow_lane",
      "moduleTitle": "號誌路口左轉回慢車道",
      "captionText": "口誦【左右無來車，後方無來車】；頭需看到B柱",
      "referenceCaption": "口誦【左右無來車，後方無來車】；頭需看到B柱",
      "answerText": "頭需看到B柱",
      "operationText": "頭需看到B柱",
      "spokenText": "左右無來車，後方無來車",
      "spokenItems": [
        "左右無來車，後方無來車"
      ],
      "operationTags": [
        "b_pillar",
        "safe_left_right",
        "rear_clear",
        "B柱確認",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [
        "B柱與45度是教練化提醒，目的在於落實官方要求的照後鏡與視野死角檢查。"
      ],
      "startSec": 555.584,
      "endSec": 565.729,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 554.58,
      "clipEndSec": 566.73,
      "tags": [
        "b_pillar",
        "safe_left_right",
        "rear_clear",
        "B柱確認",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "A8",
        "R3"
      ],
      "officialStandards": [
        {
          "code": "A8",
          "label": "起駛前未轉頭察看照後鏡、檢查視野死角及注意前後左右有無障礙或車輛行人通過；不暫停讓行進中之車輛行人優先通行",
          "deduction": 32,
          "page": 1
        },
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第1/2頁"
    },
    {
      "id": "road-seg-060",
      "bankId": "RT-059",
      "moduleId": "signalized_left_turn_to_slow_lane",
      "moduleTitle": "號誌路口左轉回慢車道",
      "captionText": "左轉後直接走慢車道，",
      "referenceCaption": "左轉後直接走慢車道，",
      "answerText": "左轉後直接走慢車道",
      "operationText": "左轉後直接走慢車道",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "slow_lane",
        "慢車道"
      ],
      "reminderNotes": [],
      "startSec": 565.729,
      "endSec": 569.313,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 564.73,
      "clipEndSec": 570.31,
      "tags": [
        "slow_lane",
        "慢車道"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-061",
      "bankId": "RT-060",
      "moduleId": "signalized_left_turn_to_slow_lane",
      "moduleTitle": "號誌路口左轉回慢車道",
      "captionText": "注意左側可能有違規插入的車輛，確認左後方來車",
      "referenceCaption": "注意左側可能有違規插入的車輛，確認左後方來車",
      "answerText": "注意左側可能有違規插入的車輛，確認左後方來車",
      "operationText": "注意左側可能有違規插入的車輛，確認左後方來車",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "左後方確認"
      ],
      "reminderNotes": [],
      "startSec": 569.313,
      "endSec": 574.9,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 568.31,
      "clipEndSec": 575.9,
      "tags": [
        "左後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-062",
      "bankId": "RT-061",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "【前方路口減速查看】【左右無來車】",
      "operationText": "【前方路口減速查看】【左右無來車】",
      "spokenText": "前方路口減速查看／左右無來車",
      "spokenItems": [
        "前方路口減速查看",
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 574.9,
      "endSec": 589.74,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 573.9,
      "clipEndSec": 590.74,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-063",
      "bankId": "RT-062",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【前方路口減速查看】【左右無來車】 注意道路邊線，白線不可壓到",
      "referenceCaption": "【前方路口減速查看】【左右無來車】 注意道路邊線，白線不可壓到",
      "answerText": "注意道路邊線，白線不可壓到",
      "operationText": "注意道路邊線，白線不可壓到",
      "spokenText": "前方路口減速查看／左右無來車",
      "spokenItems": [
        "前方路口減速查看",
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "intersection_scan",
        "白線不可壓",
        "邊線控制",
        "安全確認"
      ],
      "reminderNotes": [
        "官方表列未直接寫「前方路口減速查看」，但它屬於遵守標誌號誌、降低風險的教練化口令。"
      ],
      "startSec": 589.74,
      "endSec": 603.08,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 588.74,
      "clipEndSec": 604.08,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "白線不可壓",
        "邊線控制",
        "安全確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-064",
      "bankId": "RT-063",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【前方路口減速查看(打右方向燈)左右無來車,後方無來車】",
      "referenceCaption": "【前方路口減速查看(打右方向燈)左右無來車,後方無來車】",
      "answerText": "【前方路口減速查看(打右方向燈)左右無來車,後方無來車】",
      "operationText": "【前方路口減速查看(打右方向燈)左右無來車,後方無來車】",
      "spokenText": "前方路口減速查看(打右方向燈)左右無來車,後方無來車",
      "spokenItems": [
        "前方路口減速查看(打右方向燈)左右無來車,後方無來車"
      ],
      "operationTags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [
        "打右方向燈",
        "轉彎前核心是方向燈、照後鏡、死角確認；B柱轉頭屬教練用來落實死角確認的操作提醒。"
      ],
      "startSec": 603.08,
      "endSec": 617.93,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 602.08,
      "clipEndSec": 618.93,
      "tags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R3",
        "R4",
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        },
        {
          "code": "R4",
          "label": "變換車道、轉彎後仍持續顯示方向燈",
          "deduction": 16,
          "page": 2
        },
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-065",
      "bankId": "RT-064",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【前方路口減速查看(打左方向燈)左右無來車,後方無來車】",
      "referenceCaption": "【前方路口減速查看(打左方向燈)左右無來車,後方無來車】",
      "answerText": "【前方路口減速查看(打左方向燈)左右無來車,後方無來車】",
      "operationText": "【前方路口減速查看(打左方向燈)左右無來車,後方無來車】",
      "spokenText": "前方路口減速查看(打左方向燈)左右無來車,後方無來車",
      "spokenItems": [
        "前方路口減速查看(打左方向燈)左右無來車,後方無來車"
      ],
      "operationTags": [
        "left_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [
        "打左方向燈",
        "轉彎前核心是方向燈、照後鏡、死角確認；B柱轉頭屬教練用來落實死角確認的操作提醒。"
      ],
      "startSec": 617.93,
      "endSec": 629.67,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 616.93,
      "clipEndSec": 630.67,
      "tags": [
        "left_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R3",
        "R4",
        "R8"
      ],
      "officialStandards": [
        {
          "code": "R3",
          "label": "變換車道、轉彎前未依規定顯示方向燈或未轉頭察看照後鏡、檢查視野死角並注意有無障礙或車輛行人",
          "deduction": 32,
          "page": 2
        },
        {
          "code": "R4",
          "label": "變換車道、轉彎後仍持續顯示方向燈",
          "deduction": 16,
          "page": 2
        },
        {
          "code": "R8",
          "label": "未遵守道路交通法規或道路交通標誌、標線、號誌行車",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-066",
      "bankId": "RT-065",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【打右方向燈,左右無來車,後方無來車】",
      "referenceCaption": "【打右方向燈,左右無來車,後方無來車】",
      "answerText": "【打右方向燈,左右無來車,後方無來車】",
      "operationText": "【打右方向燈,左右無來車,後方無來車】",
      "spokenText": "打右方向燈,左右無來車,後方無來車",
      "spokenItems": [
        "打右方向燈,左右無來車,後方無來車"
      ],
      "operationTags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [],
      "startSec": 629.67,
      "endSec": 640.652,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 628.67,
      "clipEndSec": 641.65,
      "tags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-067",
      "bankId": "RT-066",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "回到起終點區域，找空位將車輛停正",
      "referenceCaption": "回到起終點區域，找空位將車輛停正",
      "answerText": "回到起終點區域，找空位將車輛停正",
      "operationText": "回到起終點區域，找空位將車輛停正",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "起終點停車"
      ],
      "reminderNotes": [],
      "startSec": 640.652,
      "endSec": 648.048,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 639.65,
      "clipEndSec": 649.05,
      "tags": [
        "起終點停車"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-068",
      "bankId": "RT-067",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "停妥後依序 打P檔、拉手煞車、 關風扇、關AC、熄火",
      "referenceCaption": "停妥後依序 打P檔、拉手煞車、 關風扇、關AC、熄火",
      "answerText": "停妥後依序 打P檔、拉手煞車、關風扇、關AC、熄火",
      "operationText": "停妥後依序 打P檔、拉手煞車、關風扇、關AC、熄火",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [
        "gear_p",
        "hand_brake"
      ],
      "reminderNotes": [],
      "startSec": 650.67,
      "endSec": 671.105,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 649.67,
      "clipEndSec": 672.11,
      "tags": [
        "gear_p",
        "hand_brake"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R16"
      ],
      "officialStandards": [
        {
          "code": "R16",
          "label": "考驗終點，停車後下車前未將引擎熄火或未拉緊手煞車（自排車未排入P檔）",
          "deduction": 16,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-069",
      "bankId": "RT-068",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "解開安全帶、椅子退後，進行【兩段式開車門】；",
      "referenceCaption": "解開安全帶、椅子退後，進行【兩段式開車門】；",
      "answerText": "解開安全帶、椅子退後，進行",
      "operationText": "解開安全帶、椅子退後，進行",
      "spokenText": "兩段式開車門",
      "spokenItems": [
        "兩段式開車門"
      ],
      "operationTags": [
        "兩段式開車門"
      ],
      "reminderNotes": [],
      "startSec": 671.105,
      "endSec": 680.427,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 670.11,
      "clipEndSec": 681.43,
      "tags": [
        "兩段式開車門"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [
        "R1"
      ],
      "officialStandards": [
        {
          "code": "R1",
          "label": "上、下車開車門前未留意有無人車通過（下車應以2段式開門）",
          "deduction": 32,
          "page": 2
        }
      ],
      "alignmentLevel": "official_core",
      "examRelevant": true,
      "officialSourceLabel": "小型車駕駛人場考評分基準及成績紀錄表(115/3/31起) 第2頁"
    },
    {
      "id": "road-seg-070",
      "bankId": "RT-069",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "先看後照鏡，再把頭伸出車外看後方，確認【後方無來車】打開車門15公分【左右無來車】下車",
      "referenceCaption": "先看後照鏡，再把頭伸出車外看後方，確認【後方無來車】打開車門15公分【左右無來車】下車",
      "answerText": "先看後照鏡，再把頭伸出車外看後方，確認打開車門15公分下車",
      "operationText": "先看後照鏡，再把頭伸出車外看後方，確認打開車門15公分下車",
      "spokenText": "後方無來車／左右無來車",
      "spokenItems": [
        "後方無來車",
        "左右無來車"
      ],
      "operationTags": [
        "safe_left_right",
        "rear_clear",
        "後照鏡確認",
        "安全確認",
        "後方確認"
      ],
      "reminderNotes": [],
      "startSec": 680.427,
      "endSec": 686.354,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 679.43,
      "clipEndSec": 687.35,
      "tags": [
        "safe_left_right",
        "rear_clear",
        "後照鏡確認",
        "安全確認",
        "後方確認"
      ],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "official_related",
      "examRelevant": true,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-071",
      "bankId": "RT-071",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "最後關上車門，道路考照動作全部完成",
      "referenceCaption": "最後關上車門，道路考照動作全部完成",
      "answerText": "最後關上車門，道路考照動作全部完成",
      "operationText": "最後關上車門，道路考照動作全部完成",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [],
      "reminderNotes": [
        "此段屬收尾動作，不是你上傳官方評分表明列的主要扣分題。"
      ],
      "startSec": 686.354,
      "endSec": 702.442,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 685.35,
      "clipEndSec": 703.44,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "coach_only",
      "examRelevant": false,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-072",
      "bankId": "RT-072",
      "moduleId": "supplementary_promo",
      "moduleTitle": "未分類模組",
      "captionText": "歡迎各位到忠正駕訓班學習開車，本班提供新型TOYOTA車輛供教學使用 今天示範的也是新車，未來學員到班上學車時，使用的車輛與教學環境皆相同",
      "referenceCaption": "歡迎各位到忠正駕訓班學習開車，本班提供新型TOYOTA車輛供教學使用 今天示範的也是新車，未來學員到班上學車時，使用的車輛與教學環境皆相同",
      "answerText": "歡迎各位到忠正駕訓班學習開車，本班提供新型TOYOTA車輛供教學使用 今天示範的也是新車，未來學員到班上學車時，使用的車輛與教學環境皆相同",
      "operationText": "歡迎各位到忠正駕訓班學習開車，本班提供新型TOYOTA車輛供教學使用 今天示範的也是新車，未來學員到班上學車時，使用的車輛與教學環境皆相同",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [],
      "reminderNotes": [
        "本段屬影片說明或招生內容，已不列入正式刷題題庫。"
      ],
      "startSec": 702.442,
      "endSec": 726.12,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 701.44,
      "clipEndSec": 727.12,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "coach_only",
      "examRelevant": false,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-073",
      "bankId": "RT-073",
      "moduleId": "supplementary_promo",
      "moduleTitle": "未分類模組",
      "captionText": "平時車輛整齊停放於車庫，駕訓班提供良好學習環境，也歡迎大家介紹親友前來學習",
      "referenceCaption": "平時車輛整齊停放於車庫，駕訓班提供良好學習環境，也歡迎大家介紹親友前來學習",
      "answerText": "平時車輛整齊停放於車庫，駕訓班提供良好學習環境，也歡迎大家介紹親友前來學習",
      "operationText": "平時車輛整齊停放於車庫，駕訓班提供良好學習環境，也歡迎大家介紹親友前來學習",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [],
      "reminderNotes": [
        "本段屬影片說明或招生內容，已不列入正式刷題題庫。"
      ],
      "startSec": 726.12,
      "endSec": 745.12,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 725.12,
      "clipEndSec": 746.12,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "coach_only",
      "examRelevant": false,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-074",
      "bankId": "RT-074",
      "moduleId": "supplementary_promo",
      "moduleTitle": "未分類模組",
      "captionText": "依照新制度，行車前都要做安全檢查；駕訓班也設置車棚，遇颱風或大雨考試時仍可進行檢查",
      "referenceCaption": "依照新制度，行車前都要做安全檢查；駕訓班也設置車棚，遇颱風或大雨考試時仍可進行檢查",
      "answerText": "依照新制度，行車前都要做安全檢查，駕訓班也設置車棚，遇颱風或大雨考試時仍可進行檢查",
      "operationText": "依照新制度，行車前都要做安全檢查，駕訓班也設置車棚，遇颱風或大雨考試時仍可進行檢查",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [],
      "reminderNotes": [
        "本段屬影片說明或招生內容，已不列入正式刷題題庫。"
      ],
      "startSec": 745.12,
      "endSec": 762.12,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 744.12,
      "clipEndSec": 763.12,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "coach_only",
      "examRelevant": false,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-075",
      "bankId": "RT-075",
      "moduleId": "supplementary_promo",
      "moduleTitle": "未分類模組",
      "captionText": "車輛可在停車棚內完成行車前安全檢查，這也是忠正駕訓班對學員安全與環境的用心",
      "referenceCaption": "車輛可在停車棚內完成行車前安全檢查，這也是忠正駕訓班對學員安全與環境的用心",
      "answerText": "車輛可在停車棚內完成行車前安全檢查，這也是忠正駕訓班對學員安全與環境的用心",
      "operationText": "車輛可在停車棚內完成行車前安全檢查，這也是忠正駕訓班對學員安全與環境的用心",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [],
      "reminderNotes": [
        "本段屬影片說明或招生內容，已不列入正式刷題題庫。"
      ],
      "startSec": 762.12,
      "endSec": 775.12,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 761.12,
      "clipEndSec": 776.12,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "coach_only",
      "examRelevant": false,
      "officialSourceLabel": ""
    },
    {
      "id": "road-seg-076",
      "bankId": "RT-076",
      "moduleId": "supplementary_promo",
      "moduleTitle": "未分類模組",
      "captionText": "影片介紹到這裡，希望對各位有所幫助，謝謝大家，再見",
      "referenceCaption": "影片介紹到這裡，希望對各位有所幫助，謝謝大家，再見",
      "answerText": "影片介紹到這裡，希望對各位有所幫助，謝謝大家，再見",
      "operationText": "影片介紹到這裡，希望對各位有所幫助，謝謝大家，再見",
      "spokenText": "",
      "spokenItems": [],
      "operationTags": [],
      "reminderNotes": [
        "本段屬影片說明或招生內容，已不列入正式刷題題庫。"
      ],
      "startSec": 775.12,
      "endSec": 785.12,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 774.12,
      "clipEndSec": 786.12,
      "tags": [],
      "quizType": "caption_aligned_operation",
      "sourceBasis": "captions.sbv",
      "officialStandardCodes": [],
      "officialStandards": [],
      "alignmentLevel": "coach_only",
      "examRelevant": false,
      "officialSourceLabel": ""
    }
  ]
};
