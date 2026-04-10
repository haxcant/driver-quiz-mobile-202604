window.ROAD_TEST_REFERENCE = {
  "version": "2026-04-11-roadtest-v3-structured-ops",
  "sourcePriority": [
    "captions.sbv",
    "道路考試參考圖片轉文字檔案.txt"
  ],
  "defaults": {
    "clipLeadSeconds": 1.0,
    "clipLagSeconds": 1.0
  },
  "notes": [
    "答案優先以 captions.sbv 為主，但題目顯示改成「標準化操作」以避免考語文敘述。",
    "操作與提醒分開：重複出現的提醒（例如B柱確認、雙黃線、不可壓線、速度上限）不再當主要答案，而是顯示為提醒標籤或補充說明。",
    "部分單獨成句但操作意義不足的片段，已整合進前後片段，例如 B柱確認、靠大門左側、雙黃線、最高44公里等。",
    "檢查儀表已統一整理為「檢查儀表（溫度、油量、煞車、充電、機油）作用」。"
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
      "id": "road-op-001",
      "bankId": "RT-001",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "(車輛檢查)從左前輪開始， 雙手壓輪胎，口誦【胎紋、胎壓正常】",
      "referenceCaption": "(車輛檢查)從左前輪開始， 雙手壓輪胎，口誦【胎紋、胎壓正常】",
      "answerText": "檢查左前輪胎紋與胎壓",
      "operationText": "檢查左前輪胎紋與胎壓",
      "operationTags": [
        "輪胎檢查"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-001"
      ],
      "startSec": 0.66,
      "endSec": 5.66,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 0.0,
      "clipEndSec": 6.66,
      "tags": [
        "tire_check",
        "輪胎檢查"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-002",
      "bankId": "RT-002",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "查看左右車燈，【車燈無破損】 蹲下看車底，【車底無異物】",
      "referenceCaption": "查看左右車燈，【車燈無破損】 蹲下看車底，【車底無異物】",
      "answerText": "檢查車燈與車底是否異常",
      "operationText": "檢查車燈與車底是否異常",
      "operationTags": [
        "燈具檢查",
        "車底檢查"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-002"
      ],
      "startSec": 5.66,
      "endSec": 10.766,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 4.66,
      "clipEndSec": 11.766,
      "tags": [
        "light_check",
        "underbody_check",
        "燈具檢查",
        "車底檢查"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-003",
      "bankId": "RT-003",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "檢查右前輪，雙手壓輪胎， 【胎紋、胎壓正常】 蹲下【車底無異物】",
      "referenceCaption": "檢查右前輪，雙手壓輪胎， 【胎紋、胎壓正常】 蹲下【車底無異物】",
      "answerText": "檢查右前輪胎紋、胎壓與車底",
      "operationText": "檢查右前輪胎紋、胎壓與車底",
      "operationTags": [
        "輪胎檢查",
        "車底檢查"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-003"
      ],
      "startSec": 10.766,
      "endSec": 20.0,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 9.766,
      "clipEndSec": 21.0,
      "tags": [
        "tire_check",
        "underbody_check",
        "輪胎檢查",
        "車底檢查"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-004",
      "bankId": "RT-004",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "檢查右後輪，【胎紋、胎壓正常】",
      "referenceCaption": "檢查右後輪，【胎紋、胎壓正常】",
      "answerText": "檢查右後輪胎紋與胎壓",
      "operationText": "檢查右後輪胎紋與胎壓",
      "operationTags": [
        "輪胎檢查"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-004"
      ],
      "startSec": 20.0,
      "endSec": 25.836,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 19.0,
      "clipEndSec": 26.836,
      "tags": [
        "tire_check",
        "輪胎檢查"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-005",
      "bankId": "RT-005",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "檢查左右車燈，【車燈無破損】； 蹲下看車底，【車底無異物】",
      "referenceCaption": "檢查左右車燈，【車燈無破損】； 蹲下看車底，【車底無異物】",
      "answerText": "檢查車尾燈與車底是否異常",
      "operationText": "檢查車尾燈與車底是否異常",
      "operationTags": [
        "燈具檢查",
        "車底檢查"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-005"
      ],
      "startSec": 25.836,
      "endSec": 31.955,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 24.836,
      "clipEndSec": 32.955,
      "tags": [
        "light_check",
        "underbody_check",
        "燈具檢查",
        "車底檢查"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-006",
      "bankId": "RT-006",
      "moduleId": "vehicle_exterior_check",
      "moduleTitle": "車外安全檢查",
      "captionText": "檢查左後輪，【胎紋、胎壓正常】； 蹲下看車底，【車底無異物】",
      "referenceCaption": "檢查左後輪，【胎紋、胎壓正常】； 蹲下看車底，【車底無異物】",
      "answerText": "檢查左後輪胎紋、胎壓與車底",
      "operationText": "檢查左後輪胎紋、胎壓與車底",
      "operationTags": [
        "輪胎檢查",
        "車底檢查"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-006"
      ],
      "startSec": 31.955,
      "endSec": 36.696,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 30.955,
      "clipEndSec": 37.696,
      "tags": [
        "tire_check",
        "underbody_check",
        "輪胎檢查",
        "車底檢查"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-007",
      "bankId": "RT-007",
      "moduleId": "two_stage_door_entry",
      "moduleTitle": "兩段式開車門上車",
      "captionText": "口誦【兩段式開車門】先看左、看右，確認【左右無來車】 車門先開約15公分，身體不轉動， 再看左、看右確認【左右無來車】後， 再開至約45度上車",
      "referenceCaption": "口誦【兩段式開車門】先看左、看右，確認【左右無來車】 車門先開約15公分，身體不轉動， 再看左、看右確認【左右無來車】後， 再開至約45度上車",
      "answerText": "上車前做兩段式開車門並確認左右安全",
      "operationText": "上車前做兩段式開車門並確認左右安全",
      "operationTags": [
        "兩段式開車門",
        "左右安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-007",
        "road-seg-008"
      ],
      "startSec": 36.696,
      "endSec": 54.177,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 35.696,
      "clipEndSec": 55.177,
      "tags": [
        "safe_left_right",
        "兩段式開車門",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-008",
      "bankId": "RT-008",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "車內：口誦【調整座椅】【調整椅背】【調整頭枕】",
      "referenceCaption": "車內：口誦【調整座椅】【調整椅背】【調整頭枕】",
      "answerText": "調整座椅、椅背與頭枕",
      "operationText": "調整座椅、椅背與頭枕",
      "operationTags": [
        "車內準備"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-009"
      ],
      "startSec": 54.177,
      "endSec": 65.19,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 53.177,
      "clipEndSec": 66.19,
      "tags": [
        "車內準備"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-009",
      "bankId": "RT-009",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "【繫上安全帶】【調整中央後照鏡、左右後照鏡】【確定檔位在P檔、手煞車已拉起】",
      "referenceCaption": "【繫上安全帶】【調整中央後照鏡、左右後照鏡】【確定檔位在P檔、手煞車已拉起】",
      "answerText": "繫安全帶、調整後照鏡並確認P檔與手煞車",
      "operationText": "繫安全帶、調整後照鏡並確認P檔與手煞車",
      "operationTags": [
        "安全帶",
        "後照鏡調整",
        "P檔",
        "手煞車"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-010"
      ],
      "startSec": 65.19,
      "endSec": 83.033,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 64.19,
      "clipEndSec": 84.033,
      "tags": [
        "gear_p",
        "hand_brake",
        "安全帶",
        "後照鏡調整",
        "P檔",
        "手煞車"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-010",
      "bankId": "RT-010",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "鑰匙往外轉【開啟紅火】",
      "referenceCaption": "鑰匙往外轉【開啟紅火】",
      "answerText": "將鑰匙轉至紅火位置",
      "operationText": "將鑰匙轉至紅火位置",
      "operationTags": [
        "紅火"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-011"
      ],
      "startSec": 83.033,
      "endSec": 89.773,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 82.033,
      "clipEndSec": 90.773,
      "tags": [
        "ignition_on",
        "紅火"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-011",
      "bankId": "RT-011",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "【油量、溫度、引擎、電瓶、手煞車燈、機油 正常】",
      "referenceCaption": "【油量、溫度、引擎、電瓶、手煞車燈、機油 正常】",
      "answerText": "檢查儀表（溫度、油量、煞車、充電、機油）作用",
      "operationText": "檢查儀表（溫度、油量、煞車、充電、機油）作用",
      "operationTags": [
        "儀表檢查"
      ],
      "reminderNotes": [
        "字幕原文另含手煞車燈；這裡將檢查重點統一整理為溫度、油量、煞車、充電、機油。"
      ],
      "rawSegmentIds": [
        "road-seg-012"
      ],
      "startSec": 89.773,
      "endSec": 101.697,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 88.773,
      "clipEndSec": 102.697,
      "tags": [
        "hand_brake",
        "儀表檢查"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-012",
      "bankId": "RT-012",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "踩煞車、發動引擎，口誦 【引擎發動：儀表板正常】 開風扇 開AC； (發動後只會剩手煞車燈亮著)",
      "referenceCaption": "踩煞車、發動引擎，口誦 【引擎發動：儀表板正常】 開風扇 開AC； (發動後只會剩手煞車燈亮著)",
      "answerText": "踩煞車發動引擎並確認儀表板正常",
      "operationText": "踩煞車發動引擎並確認儀表板正常",
      "operationTags": [
        "發動引擎",
        "儀表檢查"
      ],
      "reminderNotes": [
        "發動後正常情況下僅手煞車燈可能持續亮起。",
        "發動後可開風扇與AC。"
      ],
      "rawSegmentIds": [
        "road-seg-013",
        "road-seg-014"
      ],
      "startSec": 101.697,
      "endSec": 112.89,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 100.697,
      "clipEndSec": 113.89,
      "tags": [
        "engine_start",
        "hand_brake",
        "發動引擎",
        "儀表檢查"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-013",
      "bankId": "RT-013",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "口誦【試踩煞車：煞車正常】",
      "referenceCaption": "口誦【試踩煞車：煞車正常】",
      "answerText": "試踩煞車確認正常",
      "operationText": "試踩煞車確認正常",
      "operationTags": [
        "煞車測試"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-015"
      ],
      "startSec": 112.89,
      "endSec": 117.89,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 111.89,
      "clipEndSec": 118.89,
      "tags": [
        "煞車測試"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-014",
      "bankId": "RT-014",
      "moduleId": "cockpit_setup_and_engine_start",
      "moduleTitle": "車內調整與發動前檢查",
      "captionText": "口誦【試打左右方向燈：方向燈正常】",
      "referenceCaption": "口誦【試打左右方向燈：方向燈正常】",
      "answerText": "試打左右方向燈確認正常",
      "operationText": "試打左右方向燈確認正常",
      "operationTags": [
        "方向燈測試"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-016"
      ],
      "startSec": 117.89,
      "endSec": 123.89,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 116.89,
      "clipEndSec": 124.89,
      "tags": [
        "right_signal",
        "方向燈測試"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-015",
      "bankId": "RT-015",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "打左方向燈，口誦【準備起步，打D檔，放手煞車】 起駛前轉頭查看前後左右， 口誦【左右無來車，後方無來車】",
      "referenceCaption": "打左方向燈，口誦【準備起步，打D檔，放手煞車】 起駛前轉頭查看前後左右， 口誦【左右無來車，後方無來車】",
      "answerText": "起步前打左方向燈、入D檔、放手煞車並完成安全確認",
      "operationText": "起步前打左方向燈、入D檔、放手煞車並完成安全確認",
      "operationTags": [
        "左方向燈",
        "D檔",
        "放手煞車",
        "起步安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-017",
        "road-seg-018"
      ],
      "startSec": 123.89,
      "endSec": 144.424,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 122.89,
      "clipEndSec": 145.424,
      "tags": [
        "left_signal",
        "gear_d",
        "hand_brake",
        "safe_left_right",
        "rear_clear",
        "左方向燈",
        "D檔",
        "放手煞車",
        "起步安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-016",
      "bankId": "RT-016",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "方向燈回正，打右邊方向燈 前方路口減速查看； (行駛時出入都靠大門左側)",
      "referenceCaption": "方向燈回正，打右邊方向燈 前方路口減速查看； (行駛時出入都靠大門左側)",
      "answerText": "右轉前打右方向燈並在路口減速查看",
      "operationText": "右轉前打右方向燈並在路口減速查看",
      "operationTags": [
        "右方向燈",
        "前方路口減速查看"
      ],
      "reminderNotes": [
        "進出大門時車身盡量靠大門左側。"
      ],
      "rawSegmentIds": [
        "road-seg-019",
        "road-seg-020",
        "road-seg-021"
      ],
      "startSec": 149.46,
      "endSec": 176.8,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 148.46,
      "clipEndSec": 177.8,
      "tags": [
        "intersection_scan",
        "右方向燈",
        "前方路口減速查看"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-017",
      "bankId": "RT-017",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "【左右無來車、後方無來車】 右轉後打左方向燈",
      "referenceCaption": "【左右無來車、後方無來車】 右轉後打左方向燈",
      "answerText": "確認安全後右轉，右轉後補打左方向燈",
      "operationText": "確認安全後右轉，右轉後補打左方向燈",
      "operationTags": [
        "右轉",
        "左方向燈",
        "安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-022"
      ],
      "startSec": 176.8,
      "endSec": 184.328,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 175.8,
      "clipEndSec": 185.328,
      "tags": [
        "left_signal",
        "safe_left_right",
        "rear_clear",
        "右轉",
        "左方向燈",
        "安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-018",
      "bankId": "RT-018",
      "moduleId": "start_and_initial_turns",
      "moduleTitle": "起步與前段轉彎",
      "captionText": "【前方路口減速查看,左右無來車】； 左轉走快車道 此路口需特別注意雙黃線",
      "referenceCaption": "【前方路口減速查看,左右無來車】； 左轉走快車道 此路口需特別注意雙黃線",
      "answerText": "前方路口減速查看後左轉進入快車道",
      "operationText": "前方路口減速查看後左轉進入快車道",
      "operationTags": [
        "前方路口減速查看",
        "左轉",
        "快車道"
      ],
      "reminderNotes": [
        "此路口需特別注意雙黃線。"
      ],
      "rawSegmentIds": [
        "road-seg-023"
      ],
      "startSec": 184.328,
      "endSec": 198.949,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 183.328,
      "clipEndSec": 199.949,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "fast_lane",
        "前方路口減速查看",
        "左轉",
        "快車道"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-019",
      "bankId": "RT-019",
      "moduleId": "lane_change_fast_to_slow",
      "moduleTitle": "快車道切慢車道",
      "captionText": "打右方向燈 【前方路口減速查看，進行變換車道】 【左右無來車，後方無來車】 由快車道切換至慢車道，轉頭時需看到B柱 完成變換車道後，持續穩定行駛於慢車道",
      "referenceCaption": "打右方向燈 【前方路口減速查看，進行變換車道】 【左右無來車，後方無來車】 由快車道切換至慢車道，轉頭時需看到B柱 完成變換車道後，持續穩定行駛於慢車道",
      "answerText": "打右方向燈後由快車道切入慢車道",
      "operationText": "打右方向燈後由快車道切入慢車道",
      "operationTags": [
        "右方向燈",
        "變換車道",
        "快車道轉慢車道"
      ],
      "reminderNotes": [
        "轉頭確認時需看到B柱。",
        "完成變換後穩定行駛於慢車道。"
      ],
      "rawSegmentIds": [
        "road-seg-024",
        "road-seg-025",
        "road-seg-026"
      ],
      "startSec": 198.949,
      "endSec": 227.835,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 197.949,
      "clipEndSec": 228.835,
      "tags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "lane_change",
        "b_pillar",
        "fast_lane",
        "slow_lane",
        "右方向燈",
        "變換車道",
        "快車道轉慢車道"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-020",
      "bankId": "RT-020",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "打右方向燈，口誦【前方路口減速查看，左右無來車，後方無來車】；再看左後方【後方無來車】， 頭需看到B柱，車身盡量靠近道路邊線 注意道路邊線不可壓到，",
      "referenceCaption": "打右方向燈，口誦【前方路口減速查看，左右無來車，後方無來車】；再看左後方【後方無來車】， 頭需看到B柱，車身盡量靠近道路邊線 注意道路邊線不可壓到，",
      "answerText": "打右方向燈並查看路口與左後方後，靠邊準備臨時停車",
      "operationText": "打右方向燈並查看路口與左後方後，靠邊準備臨時停車",
      "operationTags": [
        "右方向燈",
        "前方路口減速查看",
        "左後方確認",
        "靠邊停車準備"
      ],
      "reminderNotes": [
        "轉頭確認時需看到B柱。",
        "車身盡量靠近道路邊線，但不可壓線。"
      ],
      "rawSegmentIds": [
        "road-seg-027",
        "road-seg-028",
        "road-seg-029"
      ],
      "startSec": 227.835,
      "endSec": 259.031,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 226.835,
      "clipEndSec": 260.031,
      "tags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "b_pillar",
        "右方向燈",
        "前方路口減速查看",
        "左後方確認",
        "靠邊停車準備"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-021",
      "bankId": "RT-021",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "打右方向燈； 【前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車】， 頭需看到B柱",
      "referenceCaption": "打右方向燈； 【前方路口減速查看，進行路邊臨時停車，左右無來車，後方無來車】， 頭需看到B柱",
      "answerText": "打右方向燈並在路口減速查看後執行路邊臨時停車",
      "operationText": "打右方向燈並在路口減速查看後執行路邊臨時停車",
      "operationTags": [
        "右方向燈",
        "路邊臨時停車",
        "前方路口減速查看"
      ],
      "reminderNotes": [
        "轉頭確認時需看到B柱。"
      ],
      "rawSegmentIds": [
        "road-seg-030",
        "road-seg-031",
        "road-seg-032"
      ],
      "startSec": 259.031,
      "endSec": 275.962,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 258.031,
      "clipEndSec": 276.962,
      "tags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "intersection_scan",
        "temporary_stop",
        "b_pillar",
        "右方向燈",
        "路邊臨時停車",
        "前方路口減速查看"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-022",
      "bankId": "RT-022",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "【打P檔、拉手煞車】；",
      "referenceCaption": "【打P檔、拉手煞車】；",
      "answerText": "停妥後打P檔並拉手煞車",
      "operationText": "停妥後打P檔並拉手煞車",
      "operationTags": [
        "P檔",
        "手煞車"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-033"
      ],
      "startSec": 276.487,
      "endSec": 282.489,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 275.487,
      "clipEndSec": 283.489,
      "tags": [
        "gear_p",
        "hand_brake",
        "P檔",
        "手煞車"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-023",
      "bankId": "RT-023",
      "moduleId": "roadside_temporary_stop",
      "moduleTitle": "路邊臨時停車",
      "captionText": "放鬆腳煞車，確認不滑動後， 腳再回煞車",
      "referenceCaption": "放鬆腳煞車，確認不滑動後， 腳再回煞車",
      "answerText": "鬆開腳煞車確認車輛不滑動後再回煞車",
      "operationText": "鬆開腳煞車確認車輛不滑動後再回煞車",
      "operationTags": [
        "停車確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-034"
      ],
      "startSec": 282.489,
      "endSec": 285.312,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 281.489,
      "clipEndSec": 286.312,
      "tags": [
        "停車確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-024",
      "bankId": "RT-024",
      "moduleId": "resume_and_left_lane_change",
      "moduleTitle": "由路邊切回主線並左切車道",
      "captionText": "踩剎車，打左方向燈 【切入主線道，打D檔，放手煞車，後方無來車】； 頭需看到B柱後再起步",
      "referenceCaption": "踩剎車，打左方向燈 【切入主線道，打D檔，放手煞車，後方無來車】； 頭需看到B柱後再起步",
      "answerText": "打左方向燈，切回主線道前入D檔、放手煞車並做B柱確認",
      "operationText": "打左方向燈，切回主線道前入D檔、放手煞車並做B柱確認",
      "operationTags": [
        "左方向燈",
        "切入主線道",
        "D檔",
        "放手煞車"
      ],
      "reminderNotes": [
        "起步前需轉頭確認並看到B柱。"
      ],
      "rawSegmentIds": [
        "road-seg-036",
        "road-seg-037"
      ],
      "startSec": 288.22,
      "endSec": 305.709,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 287.22,
      "clipEndSec": 306.709,
      "tags": [
        "left_signal",
        "rear_clear",
        "gear_d",
        "hand_brake",
        "b_pillar",
        "左方向燈",
        "切入主線道",
        "D檔",
        "放手煞車"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-025",
      "bankId": "RT-025",
      "moduleId": "resume_and_left_lane_change",
      "moduleTitle": "由路邊切回主線並左切車道",
      "captionText": "打左方向燈，口誦 【進行變換車道，後方無來車】； 頭需看到B柱，沒車再變換車道",
      "referenceCaption": "打左方向燈，口誦 【進行變換車道，後方無來車】； 頭需看到B柱，沒車再變換車道",
      "answerText": "打左方向燈後往左變換車道，確認後方無來車再切線",
      "operationText": "打左方向燈後往左變換車道，確認後方無來車再切線",
      "operationTags": [
        "左方向燈",
        "變換車道",
        "後方確認"
      ],
      "reminderNotes": [
        "轉頭確認時需看到B柱。"
      ],
      "rawSegmentIds": [
        "road-seg-038",
        "road-seg-039"
      ],
      "startSec": 312.292,
      "endSec": 324.866,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 311.292,
      "clipEndSec": 325.866,
      "tags": [
        "left_signal",
        "rear_clear",
        "lane_change",
        "b_pillar",
        "左方向燈",
        "變換車道",
        "後方確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-026",
      "bankId": "RT-026",
      "moduleId": "straight_intersection_checks",
      "moduleTitle": "直線行駛與路口減速查看",
      "captionText": "前方路口減速查看，口誦【左右無來車】； 直線路段留意兩側照後鏡與車身、車道線間距",
      "referenceCaption": "前方路口減速查看，口誦【左右無來車】； 直線路段留意兩側照後鏡與車身、車道線間距",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [
        "直線路段要持續留意照後鏡、車身與車道線間距。"
      ],
      "rawSegmentIds": [
        "road-seg-040",
        "road-seg-041"
      ],
      "startSec": 325.374,
      "endSec": 345.9,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 324.374,
      "clipEndSec": 346.9,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-027",
      "bankId": "RT-027",
      "moduleId": "straight_intersection_checks",
      "moduleTitle": "直線行駛與路口減速查看",
      "captionText": "前方路口減速查看，口誦【左右無來車】； 行駛中隨時注意不要壓到左右車道線",
      "referenceCaption": "前方路口減速查看，口誦【左右無來車】； 行駛中隨時注意不要壓到左右車道線",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [
        "行駛中隨時注意不要壓到左右車道線。"
      ],
      "rawSegmentIds": [
        "road-seg-042",
        "road-seg-043"
      ],
      "startSec": 346.9,
      "endSec": 367.28,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 345.9,
      "clipEndSec": 368.28,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-028",
      "bankId": "RT-028",
      "moduleId": "straight_intersection_checks",
      "moduleTitle": "直線行駛與路口減速查看",
      "captionText": "再次通過路口前減速查看，口誦【左右無來車】",
      "referenceCaption": "再次通過路口前減速查看，口誦【左右無來車】",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-044"
      ],
      "startSec": 368.28,
      "endSec": 376.28,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 367.28,
      "clipEndSec": 377.28,
      "tags": [
        "safe_left_right",
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-029",
      "bankId": "RT-029",
      "moduleId": "u_turn_sequence",
      "moduleTitle": "迴轉流程",
      "captionText": "打左方向燈 【前方路口減速查看】，配合準備迴轉 確認【左右無來車】； 到達定點後迅速完成方向盤操作",
      "referenceCaption": "打左方向燈 【前方路口減速查看】，配合準備迴轉 確認【左右無來車】； 到達定點後迅速完成方向盤操作",
      "answerText": "打左方向燈，前方路口減速查看並確認安全後迴轉",
      "operationText": "打左方向燈，前方路口減速查看並確認安全後迴轉",
      "operationTags": [
        "左方向燈",
        "前方路口減速查看",
        "迴轉"
      ],
      "reminderNotes": [
        "到達定點後迅速完成方向盤操作。"
      ],
      "rawSegmentIds": [
        "road-seg-045",
        "road-seg-046",
        "road-seg-047"
      ],
      "startSec": 390.736,
      "endSec": 413.136,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 389.736,
      "clipEndSec": 414.136,
      "tags": [
        "left_signal",
        "intersection_scan",
        "u_turn",
        "safe_left_right",
        "左方向燈",
        "前方路口減速查看",
        "迴轉"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-030",
      "bankId": "RT-030",
      "moduleId": "u_turn_sequence",
      "moduleTitle": "迴轉流程",
      "captionText": "迴轉後走外側車道，",
      "referenceCaption": "迴轉後走外側車道，",
      "answerText": "迴轉後靠外側車道行駛",
      "operationText": "迴轉後靠外側車道行駛",
      "operationTags": [
        "迴轉後車道選擇",
        "外側車道"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-048"
      ],
      "startSec": 413.622,
      "endSec": 428.299,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 412.622,
      "clipEndSec": 429.299,
      "tags": [
        "u_turn",
        "迴轉後車道選擇",
        "外側車道"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-031",
      "bankId": "RT-031",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "持續注意兩側車道線，盡量讓車輛保持在車道中央 壓到任何一側邊線都會扣分，",
      "referenceCaption": "持續注意兩側車道線，盡量讓車輛保持在車道中央 壓到任何一側邊線都會扣分，",
      "answerText": "保持車輛置中於車道中央",
      "operationText": "保持車輛置中於車道中央",
      "operationTags": [
        "車道置中"
      ],
      "reminderNotes": [
        "壓到任一側邊線都會扣分。"
      ],
      "rawSegmentIds": [
        "road-seg-049",
        "road-seg-050"
      ],
      "startSec": 428.299,
      "endSec": 440.698,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 427.299,
      "clipEndSec": 441.698,
      "tags": [
        "車道置中"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-032",
      "bankId": "RT-032",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-051"
      ],
      "startSec": 440.698,
      "endSec": 446.58,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 439.698,
      "clipEndSec": 447.58,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-033",
      "bankId": "RT-033",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "行車速度盡量維持在約40公里左右 此路段須特別注意車速， 標示約40公里，最高速度不要超過44公里",
      "referenceCaption": "行車速度盡量維持在約40公里左右 此路段須特別注意車速， 標示約40公里，最高速度不要超過44公里",
      "answerText": "行車速度維持約40公里且最高不要超過44公里",
      "operationText": "行車速度維持約40公里且最高不要超過44公里",
      "operationTags": [
        "速度控制"
      ],
      "reminderNotes": [
        "此路段標示約40公里，最高不要超過44公里。"
      ],
      "rawSegmentIds": [
        "road-seg-052",
        "road-seg-055"
      ],
      "startSec": 452.31,
      "endSec": 499.74,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 451.31,
      "clipEndSec": 500.74,
      "tags": [
        "速度控制"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-034",
      "bankId": "RT-034",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-053"
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
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-035",
      "bankId": "RT-035",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-054"
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
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-036",
      "bankId": "RT-036",
      "moduleId": "post_uturn_speed_and_centering",
      "moduleTitle": "迴轉後控速與置中",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-056"
      ],
      "startSec": 499.74,
      "endSec": 505.374,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 498.74,
      "clipEndSec": 506.374,
      "tags": [
        "safe_left_right",
        "intersection_scan",
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-037",
      "bankId": "RT-037",
      "moduleId": "signalized_left_turn_to_slow_lane",
      "moduleTitle": "號誌路口左轉回慢車道",
      "captionText": "到路口前打左方向燈 【前方路口減速查看】【左右無來車】 等紅綠燈後，起步前記得做左右擺頭； 尤其是第一台 口誦【左右無來車，後方無來車】；頭需看到B柱",
      "referenceCaption": "到路口前打左方向燈 【前方路口減速查看】【左右無來車】 等紅綠燈後，起步前記得做左右擺頭； 尤其是第一台 口誦【左右無來車，後方無來車】；頭需看到B柱",
      "answerText": "到號誌路口前打左方向燈，減速查看並在起步前完成擺頭確認",
      "operationText": "到號誌路口前打左方向燈，減速查看並在起步前完成擺頭確認",
      "operationTags": [
        "左方向燈",
        "前方路口減速查看",
        "號誌路口起步"
      ],
      "reminderNotes": [
        "等紅綠燈後起步前要做左右擺頭；尤其是第一台。",
        "確認時需看到B柱。"
      ],
      "rawSegmentIds": [
        "road-seg-057",
        "road-seg-058",
        "road-seg-059"
      ],
      "startSec": 508.948,
      "endSec": 565.729,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 507.948,
      "clipEndSec": 566.729,
      "tags": [
        "left_signal",
        "safe_left_right",
        "intersection_scan",
        "b_pillar",
        "rear_clear",
        "左方向燈",
        "前方路口減速查看",
        "號誌路口起步"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-038",
      "bankId": "RT-038",
      "moduleId": "signalized_left_turn_to_slow_lane",
      "moduleTitle": "號誌路口左轉回慢車道",
      "captionText": "左轉後直接走慢車道， 注意左側可能有違規插入的車輛，確認左後方來車",
      "referenceCaption": "左轉後直接走慢車道， 注意左側可能有違規插入的車輛，確認左後方來車",
      "answerText": "左轉後直接進入慢車道",
      "operationText": "左轉後直接進入慢車道",
      "operationTags": [
        "左轉",
        "慢車道"
      ],
      "reminderNotes": [
        "注意左側可能有違規插入的車輛，需留意左後方。"
      ],
      "rawSegmentIds": [
        "road-seg-060",
        "road-seg-061"
      ],
      "startSec": 565.729,
      "endSec": 574.9,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 564.729,
      "clipEndSec": 575.9,
      "tags": [
        "slow_lane",
        "左轉",
        "慢車道"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-039",
      "bankId": "RT-039",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【前方路口減速查看】【左右無來車】",
      "referenceCaption": "【前方路口減速查看】【左右無來車】",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-062"
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
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-040",
      "bankId": "RT-040",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【前方路口減速查看】【左右無來車】 注意道路邊線，白線不可壓到",
      "referenceCaption": "【前方路口減速查看】【左右無來車】 注意道路邊線，白線不可壓到",
      "answerText": "前方路口減速查看並確認左右無來車",
      "operationText": "前方路口減速查看並確認左右無來車",
      "operationTags": [
        "前方路口減速查看",
        "左右安全確認"
      ],
      "reminderNotes": [
        "注意道路邊線，白線不可壓到。"
      ],
      "rawSegmentIds": [
        "road-seg-063"
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
        "前方路口減速查看",
        "左右安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-041",
      "bankId": "RT-041",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【前方路口減速查看(打右方向燈)左右無來車,後方無來車】",
      "referenceCaption": "【前方路口減速查看(打右方向燈)左右無來車,後方無來車】",
      "answerText": "前方路口減速查看後打右方向燈並確認安全",
      "operationText": "前方路口減速查看後打右方向燈並確認安全",
      "operationTags": [
        "前方路口減速查看",
        "右方向燈",
        "安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-064"
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
        "前方路口減速查看",
        "右方向燈",
        "安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-042",
      "bankId": "RT-042",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【前方路口減速查看(打左方向燈)左右無來車,後方無來車】",
      "referenceCaption": "【前方路口減速查看(打左方向燈)左右無來車,後方無來車】",
      "answerText": "前方路口減速查看後打左方向燈並確認安全",
      "operationText": "前方路口減速查看後打左方向燈並確認安全",
      "operationTags": [
        "前方路口減速查看",
        "左方向燈",
        "安全確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-065"
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
        "前方路口減速查看",
        "左方向燈",
        "安全確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-043",
      "bankId": "RT-043",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "【打右方向燈,左右無來車,後方無來車】",
      "referenceCaption": "【打右方向燈,左右無來車,後方無來車】",
      "answerText": "打右方向燈並確認左右與後方無來車",
      "operationText": "打右方向燈並確認左右與後方無來車",
      "operationTags": [
        "右方向燈",
        "左右安全確認",
        "後方確認"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-066"
      ],
      "startSec": 629.67,
      "endSec": 640.652,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 628.67,
      "clipEndSec": 641.652,
      "tags": [
        "right_signal",
        "safe_left_right",
        "rear_clear",
        "右方向燈",
        "左右安全確認",
        "後方確認"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-044",
      "bankId": "RT-044",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "回到起終點區域，找空位將車輛停正",
      "referenceCaption": "回到起終點區域，找空位將車輛停正",
      "answerText": "回到起終點區域找空位將車輛停正",
      "operationText": "回到起終點區域找空位將車輛停正",
      "operationTags": [
        "停車定位"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-067"
      ],
      "startSec": 640.652,
      "endSec": 648.048,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 639.652,
      "clipEndSec": 649.048,
      "tags": [
        "停車定位"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-045",
      "bankId": "RT-045",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "停妥後依序  打P檔、拉手煞車、 關風扇、關AC、熄火",
      "referenceCaption": "停妥後依序  打P檔、拉手煞車、 關風扇、關AC、熄火",
      "answerText": "停妥後打P檔、拉手煞車、關風扇與AC並熄火",
      "operationText": "停妥後打P檔、拉手煞車、關風扇與AC並熄火",
      "operationTags": [
        "P檔",
        "手煞車",
        "熄火"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-068"
      ],
      "startSec": 650.67,
      "endSec": 671.105,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 649.67,
      "clipEndSec": 672.105,
      "tags": [
        "gear_p",
        "hand_brake",
        "P檔",
        "手煞車",
        "熄火"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-046",
      "bankId": "RT-046",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "解開安全帶、椅子退後，進行【兩段式開車門】；",
      "referenceCaption": "解開安全帶、椅子退後，進行【兩段式開車門】；",
      "answerText": "解開安全帶、椅子退後並準備兩段式開車門下車",
      "operationText": "解開安全帶、椅子退後並準備兩段式開車門下車",
      "operationTags": [
        "安全帶解除",
        "椅子退後",
        "兩段式開車門"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-069"
      ],
      "startSec": 671.105,
      "endSec": 680.427,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 670.105,
      "clipEndSec": 681.427,
      "tags": [
        "安全帶解除",
        "椅子退後",
        "兩段式開車門"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-047",
      "bankId": "RT-047",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "先看後照鏡，再把頭伸出車外看後方，確認【後方無來車】打開車門15公分【左右無來車】下車",
      "referenceCaption": "先看後照鏡，再把頭伸出車外看後方，確認【後方無來車】打開車門15公分【左右無來車】下車",
      "answerText": "先看後照鏡與後方，兩段式開車門確認安全後下車",
      "operationText": "先看後照鏡與後方，兩段式開車門確認安全後下車",
      "operationTags": [
        "後照鏡確認",
        "後方確認",
        "兩段式開車門"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-070"
      ],
      "startSec": 680.427,
      "endSec": 686.354,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 679.427,
      "clipEndSec": 687.354,
      "tags": [
        "safe_left_right",
        "rear_clear",
        "後照鏡確認",
        "後方確認",
        "兩段式開車門"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    },
    {
      "id": "road-op-048",
      "bankId": "RT-048",
      "moduleId": "return_and_finish_stop",
      "moduleTitle": "回起終點與收車",
      "captionText": "最後關上車門，道路考照動作全部完成",
      "referenceCaption": "最後關上車門，道路考照動作全部完成",
      "answerText": "關上車門完成道路考試",
      "operationText": "關上車門完成道路考試",
      "operationTags": [
        "收車完成"
      ],
      "reminderNotes": [],
      "rawSegmentIds": [
        "road-seg-071"
      ],
      "startSec": 686.354,
      "endSec": 702.442,
      "clipLeadSeconds": 1.0,
      "clipLagSeconds": 1.0,
      "clipStartSec": 685.354,
      "clipEndSec": 703.442,
      "tags": [
        "收車完成"
      ],
      "quizType": "operation",
      "sourceBasis": "captions.sbv"
    }
  ]
};
