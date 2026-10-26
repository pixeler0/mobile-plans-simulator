<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>マルチキャリア対応 スマホ最適解シミュレーター＆比較ツール</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts (Inter & Noto Sans JP) -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700;800&display=swap" rel="stylesheet">
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    body {
      font-family: 'Inter', 'Noto Sans JP', sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
    }
    /* カスタムスクロールバー */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    ::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
    .phone-card-shadow {
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.06), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
    }
    .tier-badge-Entry { background: linear-gradient(135deg, #10b981, #059669); color: white; }
    .tier-badge-Middle { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; }
    .tier-badge-HighEnd { background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; }
    .tier-badge-Flagship { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; }
  </style>
</head>
<body class="min-h-screen flex flex-col">

  <!-- トップナビゲーションヘッダー -->
  <header class="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
        <!-- ロゴ・タイトル -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md">
              <i class="fa-solid fa-mobile-screen-button text-xl"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h1 class="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">スマホ最適解シミュレーター</h1>
                <span id="header-device-count-badge" class="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">5キャリア×全45機種収録</span>
              </div>
              <p class="text-xs text-slate-500">AnTuTu公式スコア基準 / ディスプレイ輝度・リフレッシュレート比較 / 4段階ティア対応</p>
            </div>
          </div>
          <!-- モバイル用比較トレイボタン -->
          <button onclick="switchTab('compare')" class="md:hidden relative inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
            <i class="fa-solid fa-scale-balanced mr-1.5"></i>比較表
            <span id="mobile-compare-count" class="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 text-[11px] font-extrabold">3</span>
          </button>
        </div>

        <!-- メインタブ切り替え -->
        <nav class="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start md:self-auto w-full md:w-auto gap-0.5">
          <button id="tab-btn-simulator" onclick="switchTab('simulator')" class="flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 bg-white text-indigo-600 shadow-sm">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>最適スマホ診断</span>
          </button>
          <button id="tab-btn-catalog" onclick="switchTab('catalog')" class="flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900">
            <i class="fa-solid fa-grip"></i>
            <span>全機種一覧・追加</span>
          </button>
          <button id="tab-btn-compare" onclick="switchTab('compare')" class="flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900">
            <i class="fa-solid fa-table-columns"></i>
            <span>横並び比較</span>
            <span id="nav-compare-badge" class="px-1.5 py-0.5 text-[11px] rounded-full bg-indigo-600 text-white font-extrabold">3</span>
          </button>
          <button id="tab-btn-guide" onclick="switchTab('guide')" class="flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900">
            <i class="fa-solid fa-book-open-reader text-amber-500"></i>
            <span>iPhone vs Android・メーカー特徴</span>
          </button>
        </nav>
      </div>
    </div>
  </header>

  <!-- メインコンテンツ領域 -->
  <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

    <!-- ==========================================
         TAB 1: 最適スマホ診断シミュレーター
         ========================================== -->
    <section id="view-simulator" class="space-y-8">
      <!-- イントロバナー -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="space-y-1.5">
            <div class="inline-flex flex-wrap items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
              <span><i class="fa-solid fa-bolt text-amber-400 mr-1"></i>各社公式スペック準拠 / AnTuTu「GPU単体スコア」別ゲーム判定</span>
              <span class="text-indigo-400">|</span>
              <a href="https://www.antutu.com/web" target="_blank" rel="noopener noreferrer" class="underline hover:text-white inline-flex items-center gap-1">
                <i class="fa-solid fa-chart-simple text-emerald-400"></i>出典: AnTuTu公式 (antutu.com) <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
              </a>
            </div>
            <h2 class="text-xl sm:text-2xl font-extrabold">公式スペック＆実ゲーム性能(GPU)で選ぶ！スマホ最適解シミュレーター</h2>
            <p class="text-xs sm:text-sm text-slate-300 max-w-3xl">
              メーカー公式の価格・本体寸法・重量・防水防塵・生体認証・FeliCa・microSD対応を網羅。さらに「総合点は高いのにGPUが弱くて3Dゲームが重い機種」や「折りたたみ機（razr 60 / Fold / Flip / Duo）」も正確に切り分けます。
            </p>
          </div>
          <div class="flex flex-wrap gap-2 shrink-0">
            <button onclick="switchTab('guide')" class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition flex items-center gap-1.5 shadow">
              <i class="fa-solid fa-book-open-reader"></i> iPhone vs Android・メーカー解説
            </button>
            <button onclick="openRubricModal()" class="px-3.5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-extrabold transition flex items-center gap-1.5 shadow">
              <i class="fa-solid fa-list-check"></i> ★評価の採点基準を見る
            </button>
            <button onclick="openAddDeviceModal()" class="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition flex items-center gap-1.5 shadow">
              <i class="fa-solid fa-plus-circle"></i> 新規製品を追加
            </button>
            <button onclick="resetSimulator()" class="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition flex items-center gap-1.5">
              <i class="fa-solid fa-rotate-left"></i> 条件リセット
            </button>
          </div>
        </div>
      </div>

      <!-- シミュレーター 2カラムレイアウト -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <!-- 左カラム：診断条件入力パネル (5ステップ) -->
        <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 phone-card-shadow space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-extrabold text-slate-900 flex items-center gap-2">
              <span class="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs flex items-center justify-center">Q</span>
              希望条件を選択してください
            </h3>
            <span class="text-xs text-slate-400 font-medium">全5項目</span>
          </div>

          <!-- Step 1: キャリア選択 -->
          <div class="space-y-2.5">
            <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              <span class="text-indigo-600 mr-1">STEP 1.</span> 利用予定のキャリア（複数選択可）
            </label>
            <div class="grid grid-cols-3 sm:grid-cols-3 gap-2" id="sim-carrier-buttons">
              <button type="button" data-carrier="ALL" onclick="toggleSimCarrier('ALL')" class="sim-carrier-btn col-span-3 sm:col-span-1 py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all bg-indigo-600 text-white border-indigo-600">
                すべて / SIMフリー含
              </button>
              <button type="button" data-carrier="docomo" onclick="toggleSimCarrier('docomo')" class="sim-carrier-btn py-2 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">
                docomo
              </button>
              <button type="button" data-carrier="au" onclick="toggleSimCarrier('au')" class="sim-carrier-btn py-2 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">
                au
              </button>
              <button type="button" data-carrier="softbank" onclick="toggleSimCarrier('softbank')" class="sim-carrier-btn py-2 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">
                SoftBank
              </button>
              <button type="button" data-carrier="ymobile" onclick="toggleSimCarrier('ymobile')" class="sim-carrier-btn py-2 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">
                Y!mobile
              </button>
              <button type="button" data-carrier="uq" onclick="toggleSimCarrier('uq')" class="sim-carrier-btn py-2 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">
                UQ mobile
              </button>
            </div>
          </div>

          <!-- Step 2: 予算上限（SIMフリー定価基準） -->
          <div class="space-y-2.5 pt-2 border-t border-slate-100">
            <div class="flex justify-between items-center">
              <label class="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                <span class="text-indigo-600 mr-1">STEP 2.</span> 予算上限（SIMフリー定価ベース）
              </label>
              <span id="sim-budget-label" class="text-sm font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">〜140,000円</span>
            </div>
            <input id="sim-budget-range" type="range" min="25000" max="300000" step="5000" value="140000" oninput="updateSimulator()" class="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg">
            <div class="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>2.5万円 (エントリー)</span>
              <span>8万円 (ミドル)</span>
              <span>14万円 (ハイエンド)</span>
              <span>30万円 (上限なし)</span>
            </div>
            <label class="flex items-center gap-2 pt-1 text-xs font-bold text-slate-700 cursor-pointer">
              <input type="checkbox" id="strict-budget-toggle" checked onchange="updateSimulator()" class="accent-indigo-600 rounded">
              <span>予算超過時は超過額に応じて段階的に減点する（OFFで性能優先）</span>
            </label>
          </div>

          <!-- Step 3: ゲームの利用度 -->
          <div class="space-y-2.5 pt-2 border-t border-slate-100">
            <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              <span class="text-indigo-600 mr-1">STEP 3.</span> ゲームはどのくらい遊びますか？
            </label>
            <div class="grid grid-cols-1 gap-2" id="sim-game-options">
              <label class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/60">
                <input type="radio" name="sim-game" value="none" onchange="updateSimulator()" class="accent-indigo-600 w-4 h-4">
                <div class="text-xs">
                  <div class="font-bold text-slate-900">ほとんどしない（連絡・SNS・動画・Web中心）</div>
                  <div class="text-slate-500 text-[11px]">エントリー〜ミドル機で十分快適</div>
                </div>
              </label>
              <label class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/60">
                <input type="radio" name="sim-game" value="light" onchange="updateSimulator()" checked class="accent-indigo-600 w-4 h-4">
                <div class="text-xs">
                  <div class="font-bold text-slate-900">パズル・育成・中量級ゲームを快適に遊びたい</div>
                  <div class="text-slate-500 text-[11px]">ミドル〜ハイエンド機がおすすめ</div>
                </div>
              </label>
              <label class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/60">
                <input type="radio" name="sim-game" value="heavy" onchange="updateSimulator()" class="accent-indigo-600 w-4 h-4">
                <div class="text-xs">
                  <div class="font-bold text-slate-900">3Dゲーム（原神・FPS等）をストレスなく遊びたい</div>
                  <div class="text-slate-500 text-[11px]">ハイエンド（無印）以上・RAM 8GB以上を推奨</div>
                </div>
              </label>
              <label class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/60">
                <input type="radio" name="sim-game" value="pro" onchange="updateSimulator()" class="accent-indigo-600 w-4 h-4">
                <div class="text-xs">
                  <div class="font-bold text-slate-900">最高画質・高fps維持＆大容量ROMでガチプレイ</div>
                  <div class="text-slate-500 text-[11px]">フラッグシップ（Pro / Ultra）・冷却機構・RAM 12GB〜</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 4: カメラ・望遠へのこだわり（無印 vs Pro分岐） -->
          <div class="space-y-2.5 pt-2 border-t border-slate-100">
            <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              <span class="text-indigo-600 mr-1">STEP 4.</span> カメラ・撮影のこだわり（無印 vs Pro判定）
            </label>
            <div class="grid grid-cols-1 gap-2">
              <label class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/60">
                <input type="radio" name="sim-camera" value="basic" onchange="updateSimulator()" class="accent-indigo-600 w-4 h-4">
                <div class="text-xs">
                  <div class="font-bold text-slate-900">記録・QRコード・日常のスナップが撮れればOK</div>
                </div>
              </label>
              <label class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/60">
                <input type="radio" name="sim-camera" value="good" onchange="updateSimulator()" checked class="accent-indigo-600 w-4 h-4">
                <div class="text-xs">
                  <div class="font-bold text-slate-900">料理・人物・夜景をオートで綺麗に撮りたい</div>
                  <div class="text-slate-500 text-[11px]">ミドル上位〜ハイエンド（無印）で十分高画質</div>
                </div>
              </label>
              <label class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/60">
                <input type="radio" name="sim-camera" value="telephoto" onchange="updateSimulator()" class="accent-indigo-600 w-4 h-4">
                <div class="text-xs">
                  <div class="font-bold text-slate-900">ライブ・運動会・旅行で「遠くを光学ズーム」で綺麗に撮りたい</div>
                  <div class="text-amber-600 font-semibold text-[11px]"><i class="fa-solid fa-crown mr-1"></i>専用望遠レンズ搭載のフラッグシップ(Pro/Ultra)を高評価</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 5: 重視ポイント＆メーカー絞り込み -->
          <div class="space-y-3 pt-2 border-t border-slate-100">
            <label class="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              <span class="text-indigo-600 mr-1">STEP 5.</span> 特に重視するポイント（複数チェック可）
            </label>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 font-semibold text-slate-700">
                <input type="checkbox" id="prio-battery" onchange="updateSimulator()" checked class="accent-indigo-600 rounded">
                <span><i class="fa-solid fa-battery-full text-emerald-600 mr-1"></i>電池持ち重視</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 font-semibold text-slate-700">
                <input type="checkbox" id="prio-light" onchange="updateSimulator()" class="accent-indigo-600 rounded">
                <span><i class="fa-solid fa-feather text-sky-500 mr-1"></i>軽さ・持ちやすさ</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 font-semibold text-slate-700">
                <input type="checkbox" id="prio-cost" onchange="updateSimulator()" checked class="accent-indigo-600 rounded">
                <span><i class="fa-solid fa-coins text-amber-500 mr-1"></i>コスパ（定価比）</span>
              </label>
              <label class="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 font-semibold text-slate-700">
                <input type="checkbox" id="prio-rom" onchange="updateSimulator()" class="accent-indigo-600 rounded">
                <span><i class="fa-solid fa-hard-drive text-purple-600 mr-1"></i>ROM 256GB以上可</span>
              </label>
              <label class="col-span-2 flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-500 font-semibold text-slate-700">
                <input type="checkbox" id="prio-senior" onchange="updateSimulator()" class="accent-emerald-600 rounded">
                <span><i class="fa-solid fa-hands-holding-heart text-emerald-600 mr-1"></i>シニア向け・かんたん操作・高耐久を優先</span>
              </label>
              <label class="col-span-2 flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-purple-50 has-[:checked]:border-purple-500 font-semibold text-slate-700">
                <span class="flex items-center"><input type="checkbox" id="prio-foldable" onchange="updateSimulator()" class="accent-purple-600 rounded mr-2"><i class="fa-solid fa-book-open text-purple-600 mr-1.5"></i>折りたたみスマホ（Fold / Flip）も候補に含める</span>
                <span class="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">未チェック時は除外</span>
              </label>
            </div>

            <!-- シリーズ/メーカー指定（任意） -->
            <div class="pt-2 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700">シリーズ・メーカー絞り込み <span class="text-[10px] font-normal text-slate-500">（タップで個別に除外/復帰）</span></span>
              </div>
              <!-- ワンタッチ絞り込みボタン（3大メーカー / iPhone単体 / Android単体 / 全選択） -->
              <div class="grid grid-cols-2 gap-1.5" id="maker-quick-presets">
                <button type="button" onclick="setMakerPreset('BIG3')" class="px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:opacity-95 transition flex items-center justify-center gap-1 shadow-sm">
                  <i class="fa-solid fa-crown text-amber-300"></i> 3大メーカー (iPhone/Galaxy/Pixel)
                </button>
                <button type="button" onclick="setMakerPreset('ALL')" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center gap-1 border border-slate-200">
                  <i class="fa-solid fa-check-double text-indigo-600"></i> すべて選択に戻す
                </button>
                <button type="button" onclick="setMakerPreset('IPHONE')" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-900 text-white transition flex items-center justify-center gap-1">
                  <i class="fa-brands fa-apple"></i> iPhoneのみ
                </button>
                <button type="button" onclick="setMakerPreset('ANDROID')" class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center justify-center gap-1">
                  <i class="fa-brands fa-android"></i> Androidのみ
                </button>
              </div>
              <div class="flex flex-wrap gap-1.5 pt-1" id="sim-maker-chips">
                <!-- JSで11シリーズチップを生成（押すと除外トグル） -->
              </div>
            </div>
          </div>
        </div>

        <!-- 右カラム：リアルタイム診断結果＆ティア比較インサイト -->
        <div class="lg:col-span-7 space-y-6">
          <!-- 同メーカー内のティア上下比較インサイト（無印 vs Pro/Ultra / 廉価モデル） -->
          <div id="tier-insight-box" class="bg-gradient-to-br from-amber-50 via-white to-indigo-50 rounded-2xl border border-amber-200/80 p-5 sm:p-6 phone-card-shadow">
            <!-- JSで動的生成 -->
          </div>

            <!-- ベストマッチ第1位〜第10位 -->
          <div class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 phone-card-shadow">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">BEST MATCH RANKING</span>
                  <span id="sim-match-count-badge" class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">上位10機種を表示</span>
                </div>
                <h3 class="text-lg sm:text-xl font-extrabold text-slate-900">あなたの条件に合うおすすめスマホ TOP10</h3>
              </div>
              <button onclick="compareTop3()" class="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                <i class="fa-solid fa-scale-balanced"></i> 上位10機種を一括で横並び比較する
              </button>
            </div>

            <!-- ランキングカード描画領域 -->
            <div id="sim-results-container" class="mt-5 space-y-4">
              <!-- JSで動的生成 -->
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ==========================================
         TAB 2: 全機種カタログ＆製品追加・削除・画像差替
         ========================================== -->
    <section id="view-catalog" class="hidden space-y-6">
      <div class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 phone-card-shadow space-y-4">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div class="flex items-center gap-2">
              <h2 class="text-lg sm:text-xl font-extrabold text-slate-900">収録端末カタログ＆製品管理</h2>
              <span id="catalog-count-badge" class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">45機種</span>
            </div>
            <p class="text-xs text-slate-500 mt-1">
              新しいスマートフォンの追加や不要な機種の削除、端末本体画像の差し替えが自由に行えます（変更内容はブラウザに自動保存されます）。
            </p>
          </div>
          <!-- 製品追加＆初期データ復元ボタン -->
          <div class="flex flex-wrap items-center gap-2 shrink-0">
            <button onclick="openAddDeviceModal()" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold transition flex items-center gap-1.5 shadow-sm">
              <i class="fa-solid fa-plus"></i> 製品を新規追加する
            </button>
            <button onclick="openResetMasterModal()" class="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 text-xs font-bold transition flex items-center gap-1.5">
              <i class="fa-solid fa-arrow-rotate-left"></i> 初期ラインナップ(45機種)に戻す
            </button>
          </div>
        </div>

        <!-- フィルタ＆検索バー -->
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2 flex-grow">
            <div class="relative flex-grow max-w-xs">
              <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input id="cat-search-input" type="text" oninput="renderCatalog()" placeholder="機種名・CPU等で検索..." class="w-full pl-8 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500">
            </div>
            <select id="cat-filter-tier" onchange="renderCatalog()" class="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700">
              <option value="ALL">すべてのティア (4区分)</option>
              <option value="Entry">エントリー (シニア含)</option>
              <option value="Middle">ミドル (5〜10万円)</option>
              <option value="HighEnd">ハイエンド・無印 (11〜15万円)</option>
              <option value="Flagship">フラッグシップ・Pro/Ultra/Fold</option>
            </select>
            <select id="cat-filter-maker" onchange="renderCatalog()" class="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700">
              <option value="ALL">すべてのシリーズ・メーカー</option>
              <!-- JSで動的生成 -->
            </select>
            <select id="cat-filter-carrier" onchange="renderCatalog()" class="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700">
              <option value="ALL">すべてのキャリア</option>
              <option value="docomo">docomo 取扱あり</option>
              <option value="au">au 取扱あり</option>
              <option value="softbank">SoftBank 取扱あり</option>
              <option value="ymobile">Y!mobile 取扱あり</option>
              <option value="uq">UQ mobile 取扱あり</option>
            </select>
          </div>
        </div>
      </div>

      <!-- カタロググリッド -->
      <div id="catalog-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <!-- JSで生成 -->
      </div>
    </section>

    <!-- ==========================================
         TAB 3: 横並びスペック徹底比較＆レーダーチャート
         ========================================== -->
    <section id="view-compare" class="hidden space-y-6">
      <!-- 上部コントロール＆レーダーチャート -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- レーダーチャート領域 -->
        <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 phone-card-shadow flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-chart-pie text-indigo-600"></i> 6軸バランス比較チャート
              </h3>
              <button onclick="openRubricModal()" class="text-[11px] text-indigo-600 hover:underline font-bold flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-200">
                <i class="fa-solid fa-circle-question"></i> ★評価の採点基準
              </button>
            </div>
            <p class="text-xs text-slate-500 mb-3">客観データ（CPU・AnTuTu GPUスコア・メインカメラ・望遠カメラ有無・電池効率・定価コスパ）に基づく6軸評価を比較します。</p>
          </div>
          <div class="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center">
            <canvas id="compareRadarCanvas" class="w-full h-full"></canvas>
          </div>
          <div id="radar-legend" class="flex flex-wrap items-center justify-center gap-3 mt-3 pt-3 border-t border-slate-100 text-xs font-bold">
            <!-- JSで凡例生成 -->
          </div>
        </div>

        <!-- 比較機種セレクター＆ハイライト設定 -->
        <div class="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 phone-card-shadow flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <h3 class="text-base sm:text-lg font-extrabold text-slate-900">比較する端末の管理（最大10機種）</h3>
                <span id="compare-panel-count-badge" class="px-2 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800">3 / 10台</span>
              </div>
              <label class="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200 cursor-pointer">
                <input type="checkbox" id="highlight-best-toggle" checked onchange="renderComparisonTable()" class="accent-indigo-600 rounded">
                <span><i class="fa-solid fa-award text-amber-500 mr-1"></i>最優秀スペックをハイライト表示</span>
              </label>
            </div>
            <p class="text-xs text-slate-500">
              最大10機種まで同時に横並びで徹底比較できます。プリセットボタンで「iPhone全7機種一斉比較」や「無印 vs Pro比較」もワンタップで呼び出せます。
            </p>
          </div>

          <!-- ワンタップ比較プリセット -->
          <div class="space-y-1.5">
            <span class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">おすすめ比較プリセット（最大10機種対応）</span>
            <div class="flex flex-wrap gap-2">
              <button onclick="compareTop3()" class="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm">
                🏆 現在の診断TOP10を一括比較 (10台)
              </button>
              <button onclick="loadPreset(['iphone_duo', 'iphone_18_promax', 'iphone_18_pro', 'iphone_air', 'iphone_17', 'iphone_17e', 'iphone_16'])" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition border border-slate-200">
                🍎 iPhone全7機種 一斉比較 (17e vs 16含)
              </button>
              <button onclick="loadPreset(['galaxy_fold8_ultra', 'galaxy_fold8', 'galaxy_flip8', 'galaxy_s26_ultra', 'galaxy_s26_plus', 'galaxy_s26', 'galaxy_a57', 'galaxy_a25'])" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition border border-slate-200">
                🌌 Galaxy全8機種 一斉比較
              </button>
              <button onclick="loadPreset(['iphone_18_promax', 'iphone_18_pro', 'galaxy_s26_ultra', 'galaxy_s26', 'pixel_11_pro_xl', 'pixel_11_pro', 'xperia_1_viii', 'aquos_r9_pro', 'aquos_r11', 'find_x9'])" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition border border-slate-200">
                👑 主要ハイエンド＆フラッグシップ10選
              </button>
              <button onclick="loadPreset(['pixel_10a', 'galaxy_a57', 'aquos_sense10', 'xperia_10_viii', 'arrows_alpha2', 'oppo_reno15a', 'oppo_reno13a', 'motorola_edge60', 'natural_ai_phone', 'torque_g07'])" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition border border-slate-200">
                ⚖️ 人気ミドル〜準ハイエンド10選
              </button>
              <button onclick="loadPreset(['iphone_duo', 'galaxy_fold8_ultra', 'galaxy_fold8', 'galaxy_flip8', 'pixel_11_pro_fold', 'motorola_razr60_ultra', 'motorola_razr60d', 'nubia_fold', 'nubia_flip3'])" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition border border-slate-200">
                📖 折りたたみスマホ全9機種 徹底比較
              </button>
            </div>
          </div>

          <!-- 端末追加セレクトボックス -->
          <div class="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
            <select id="add-compare-select" class="flex-grow text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800">
              <!-- JSで全機種オプション生成 -->
            </select>
            <button onclick="addSelectedToCompare()" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shrink-0">
              <i class="fa-solid fa-plus mr-1"></i>比較リストに追加
            </button>
          </div>
        </div>
      </div>

      <!-- 横並び比較マトリクステーブル -->
      <div class="bg-white rounded-2xl border border-slate-200 phone-card-shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[760px]">
            <tbody id="compare-table-body" class="divide-y divide-slate-200 text-xs sm:text-sm">
              <!-- JSで動的生成 -->
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ==========================================
         TAB 4: iPhoneとAndroidの違い ＆ 各メーカーの特徴ガイド
         ========================================== -->
    <section id="view-guide" class="hidden space-y-8">
      <!-- セクション1: iPhone vs Android 徹底比較 -->
      <div class="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 phone-card-shadow space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">OS COMPARISON GUIDE</span>
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">iPhone（iOS）と Android の決定的な違い 7選</h2>
            <p class="text-xs sm:text-sm text-slate-500 mt-1">
              どちらを選ぶべきか迷ったときに押さえておきたい、性能・使い勝手・コスト面の本質的な違いです。
            </p>
          </div>
          <div class="flex gap-2 shrink-0">
            <button onclick="setMakerPreset('IPHONE'); switchTab('simulator');" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5">
              <i class="fa-brands fa-apple"></i> iPhoneで診断する
            </button>
            <button onclick="setMakerPreset('ANDROID'); switchTab('simulator');" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5">
              <i class="fa-brands fa-android"></i> Androidで診断する
            </button>
          </div>
        </div>

        <!-- iPhone vs Android 2カラム総括カード -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- iPhone (iOS) -->
          <div class="rounded-2xl border-2 border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-2xl">
                  <i class="fa-brands fa-apple"></i>
                </div>
                <div>
                  <h3 class="text-lg font-extrabold">iPhone（Apple / iOS）</h3>
                  <p class="text-xs text-slate-300">直感的な操作・圧倒的なゲーム安定性・高リセール</p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-bold">シェア国内No.1</span>
            </div>
            <ul class="space-y-2 text-xs text-slate-200 pt-1">
              <li class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i><span><strong>ゲーム最適化と処理性能が抜群：</strong>Apple AシリーズチップとiOSの最適化により、3Dゲームや動画編集でフレームレートが安定しやすい。</span></li>
              <li class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i><span><strong>数年使っても高く売れる（高リセール）：</strong>下取り・買取価格が落ちにくく、2〜4年後の買い替え時の実質負担額を抑えやすい。</span></li>
              <li class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i><span><strong>操作がシンプル＆アクセサリが豊富：</strong>どの世代でも操作感が変わらず、ケースやMagSafe周辺機器が圧倒的に充実。</span></li>
              <li class="flex items-start gap-2 text-amber-300"><i class="fa-solid fa-triangle-exclamation mt-0.5"></i><span><strong>注意点：</strong>microSDカード非対応、指紋認証は「iPhone Duo」以外の現行機は非搭載（Face IDのみ）、10万円未満の新品選択肢が少ない。</span></li>
            </ul>
          </div>

          <!-- Android -->
          <div class="rounded-2xl border-2 border-emerald-600 bg-gradient-to-br from-emerald-950 to-slate-900 text-white p-5 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
                  <i class="fa-brands fa-android"></i>
                </div>
                <div>
                  <h3 class="text-lg font-extrabold">Android（Google / Galaxy / 国内・海外各社）</h3>
                  <p class="text-xs text-emerald-200">2万円台〜超高性能機まで多様な選択肢・機能性</p>
                </div>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">選択肢が豊富</span>
            </div>
            <ul class="space-y-2 text-xs text-slate-200 pt-1">
              <li class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i><span><strong>指紋認証＋顔認証の両対応が主流：</strong>マスク着用時や暗い場所、机に置いたままでも画面内/側面指紋センサーで快適ロック解除。</span></li>
              <li class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i><span><strong>価格帯とハードウェアの多様性：</strong>2〜3万円台のエントリー機、microSD対応機、7000mAh超大容量電池、縦折り/横折りスマホまで自由に選べる。</span></li>
              <li class="flex items-start gap-2"><i class="fa-solid fa-circle-check text-emerald-400 mt-0.5"></i><span><strong>AI機能・カスタマイズ性：</strong>Google Gemini連携や「かこって検索」、通話録音、2画面分割など便利機能が充実。</span></li>
              <li class="flex items-start gap-2 text-amber-300"><i class="fa-solid fa-triangle-exclamation mt-0.5"></i><span><strong>注意点：</strong>機種によって搭載SoC（特にGPU性能）の差が激しく、「総合点は高いのに3Dゲームが苦手な機種」を見極める必要がある。</span></li>
            </ul>
          </div>
        </div>

        <!-- 7項目比較マトリクス -->
        <div class="overflow-x-auto pt-2">
          <table class="w-full text-left border-collapse text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead>
              <tr class="bg-slate-100 text-slate-800 font-extrabold">
                <th class="p-3 border-b border-slate-200 w-40">比較ポイント</th>
                <th class="p-3 border-b border-slate-200 bg-slate-200/60">🍎 iPhone (iOS)</th>
                <th class="p-3 border-b border-slate-200 bg-emerald-50/70">🤖 Android</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr>
                <td class="p-3 font-bold bg-slate-50">1. 価格帯の広さ</td>
                <td class="p-3">124,800円（17e）〜364,800円（Duo）の中〜高価格帯に特化（※2026年9月価格改定反映）</td>
                <td class="p-3 font-semibold text-emerald-800">約2.1万円（エントリー）〜29万円（Fold Ultra）まで全予算に対応</td>
              </tr>
              <tr>
                <td class="p-3 font-bold bg-slate-50">2. 生体認証</td>
                <td class="p-3">原則 <strong>Face ID（3D顔認証）のみ</strong>（※iPhone Duoのみ側面Touch ID）</td>
                <td class="p-3 font-semibold text-emerald-800">ほとんどの機種が<strong>「指紋認証 ＋ 顔認証」のダブル対応</strong>で便利</td>
              </tr>
              <tr>
                <td class="p-3 font-bold bg-slate-50">3. microSDカード拡張</td>
                <td class="p-3 text-rose-600 font-semibold">全機種 非対応（購入時のROM容量選びが重要 / iCloud活用）</td>
                <td class="p-3 font-semibold text-emerald-800">Xperia・AQUOS・arrows・OPPO A/Reno・エントリー機など<strong>最大1TB〜2TB対応機が多数</strong></td>
              </tr>
              <tr>
                <td class="p-3 font-bold bg-slate-50">4. ゲーム性能の安定感</td>
                <td class="p-3 font-semibold text-indigo-700">非常に高い（iOS向けにゲームアプリが優先最適化されやすい）</td>
                <td class="p-3">Snapdragon 8系搭載機（Galaxy S26系/Xperia 1 VIII等）は最高峰だが、TensorやミドルSoCは3Dに弱い場合あり</td>
              </tr>
              <tr>
                <td class="p-3 font-bold bg-slate-50">5. カメラの傾向</td>
                <td class="p-3">動画撮影の手ブレ補正・色味の自然さは業界トップクラス。誰が撮っても失敗しない</td>
                <td class="p-3">1インチセンサー（AQUOS R9 pro）、光学5〜8倍望遠（Galaxy/Pixel/Xperia）、AI消しゴムなど個性豊か</td>
              </tr>
              <tr>
                <td class="p-3 font-bold bg-slate-50">6. OSサポート期間</td>
                <td class="p-3">発売から約6〜7年間、最新iOSアップデートが提供され長く使える</td>
                <td class="p-3">Pixel・Galaxy上位は<strong>最大7年保証</strong>。ミドル〜エントリーは2〜4年保証が目安</td>
              </tr>
              <tr>
                <td class="p-3 font-bold bg-slate-50">7. リセール（売却価格）</td>
                <td class="p-3 font-semibold text-indigo-700">2〜3年後でも高値で売れやすく、実質コストが安い</td>
                <td class="p-3">Galaxy UltraやPixel等の一部を除き、値落ちが早い傾向（長く使い切る人向き）</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- セクション2: 全11シリーズ・メーカーの特徴図鑑 -->
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span class="text-xs font-extrabold uppercase tracking-wider text-indigo-600">BRAND & SERIES ENCYCLOPEDIA</span>
            <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">各メーカー・シリーズの特徴と選び方ガイド</h2>
            <p class="text-xs sm:text-sm text-slate-500">
              メーカーごとの強み・弱み・代表的な収録機種をまとめています。ボタンからそのメーカーだけに絞って診断・一覧表示できます。
            </p>
          </div>
        </div>

        <div id="maker-guide-grid" class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- JSで各メーカーの詳細カードを生成 -->
        </div>
      </div>
    </section>

  </main>

  <!-- ==========================================
       MODAL: 端末本体画像の差し込み・変更モーダル
       ========================================== -->
  <div id="image-upload-modal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span class="text-[11px] font-extrabold text-indigo-600 uppercase">CUSTOM DEVICE IMAGE</span>
          <h3 id="modal-device-title" class="text-base font-extrabold text-slate-900">端末本体の画像を差し替える</h3>
        </div>
        <button onclick="closeImageModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- 現在のプレビュー -->
      <div class="flex flex-col items-center justify-center bg-slate-50 rounded-xl p-4 border border-slate-200/80">
        <div id="modal-image-preview" class="w-32 h-40 flex items-center justify-center"></div>
        <span class="text-[11px] text-slate-400 mt-2">現在の表示イメージ</span>
      </div>

      <!-- 方法1: ローカル画像のファイル選択 / ドロップ -->
      <div class="space-y-2">
        <label class="block text-xs font-extrabold text-slate-700">1. 手元の画像ファイル（PNG / JPG / WebP）を選択</label>
        <label class="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 hover:border-indigo-500 bg-indigo-50/40 rounded-xl p-4 cursor-pointer transition text-center">
          <i class="fa-solid fa-cloud-arrow-up text-2xl text-indigo-500 mb-1"></i>
          <span class="text-xs font-bold text-indigo-700">クリックして画像ファイルを選択</span>
          <span class="text-[11px] text-slate-400 mt-0.5">背景透過PNGやメーカー公式製品画像がきれいに収まります</span>
          <input type="file" id="modal-file-input" accept="image/*" onchange="handleFileUpload(event)" class="hidden">
        </label>
      </div>

      <!-- 方法2: 画像URLの直接入力 -->
      <div class="space-y-1.5">
        <label class="block text-xs font-extrabold text-slate-700">2. または画像URLを直接指定</label>
        <div class="flex gap-2">
          <input type="url" id="modal-url-input" placeholder="https://example.com/phone-image.png" class="flex-grow text-xs border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500">
          <button onclick="applyImageUrl()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0">
            反映
          </button>
        </div>
      </div>

      <div class="flex items-center justify-between pt-3 border-t border-slate-100">
        <button onclick="resetDeviceImage()" class="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1">
          <i class="fa-solid fa-rotate-left"></i> 初期イラストに戻す
        </button>
        <button onclick="closeImageModal()" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold">
          完了して閉じる
        </button>
      </div>
    </div>
  </div>

  <!-- ==========================================
       MODAL: 新規製品の追加モーダル
       ========================================== -->
  <div id="add-device-modal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[92vh] overflow-y-auto">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3 sticky top-0 bg-white z-10">
        <div>
          <span class="text-[11px] font-extrabold text-indigo-600 uppercase">ADD NEW SMARTPHONE</span>
          <h3 class="text-base sm:text-lg font-extrabold text-slate-900">新しいスマートフォン製品を追加</h3>
        </div>
        <button onclick="closeAddDeviceModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form id="add-device-form" onsubmit="submitNewDevice(event)" class="space-y-4 text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">シリーズ / メーカー区分 *</label>
            <select id="new-maker" required class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-slate-50">
              <option value="iPhone">iPhone (Apple)</option>
              <option value="GALAXY">GALAXY (SAMSUNG)</option>
              <option value="Pixel">Pixel (Google)</option>
              <option value="Xperia">Xperia (SONY)</option>
              <option value="AQUOS">AQUOS (SHARP)</option>
              <option value="arrows">arrows (FCNT)</option>
              <option value="OPPO">OPPO</option>
              <option value="motorola">motorola</option>
              <option value="nubia">nubia</option>
              <option value="その他">その他</option>
              <option value="シニアスマホ">シニアスマホ</option>
            </select>
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">製品名（機種名） *</label>
            <input type="text" id="new-name" required placeholder="例: iPhone 18 / AQUOS sense11" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">性能ティア（4段階） *</label>
            <select id="new-tier" required class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-slate-50">
              <option value="Entry">エントリー (〜4.5万円 / シニア含)</option>
              <option value="Middle" selected>ミドル (5〜10万円)</option>
              <option value="HighEnd">ハイエンド・無印 (11〜15万円)</option>
              <option value="Flagship">フラッグシップ (Pro / Ultra / Fold)</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">SIMフリー定価(円) *</label>
            <input type="number" id="new-price" required min="1000" step="100" value="79800" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">ROM容量 (カンマ区切り)</label>
            <input type="text" id="new-rom" value="128, 256" placeholder="128, 256, 512" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">RAM容量 (GB) *</label>
            <input type="number" id="new-ram" required min="2" max="32" value="8" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">microSDカード対応</label>
            <input type="text" id="new-sd" value="非対応" placeholder="例: 対応 (最大1TB) / 非対応" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold">
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div class="col-span-2 sm:col-span-2">
            <label class="block font-extrabold text-slate-700 mb-1">本体寸法 (高さ×幅×厚さ mm)</label>
            <input type="text" id="new-dimensions" value="約153.0 × 72.0 × 8.2 mm" placeholder="例: 約150.0×71.9×8.75mm" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-white">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">本体重量 (g) *</label>
            <input type="number" id="new-weight" required min="100" max="400" value="180" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-white">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">防水防塵等級</label>
            <input type="text" id="new-waterproof" value="IPX5/IPX8・IP6X (IP68)" placeholder="例: IP68 / IP48" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-white">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">生体認証 / FeliCa</label>
            <input type="text" id="new-biometrics" value="指紋認証 ＋ 顔認証" placeholder="例: 指紋＋顔 / Face ID" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-white">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="sm:col-span-1">
            <label class="block font-extrabold text-slate-700 mb-1">搭載CPU (SoC) *</label>
            <input type="text" id="new-cpu" required placeholder="例: Snapdragon 8 Elite Gen 5" value="Snapdragon 7 Gen 4" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">AnTuTu総合スコア (点)</label>
            <input type="number" id="new-antutu-score" step="1000" min="100000" max="6000000" value="1440357" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">うちGPU単体スコア (点) *</label>
            <input type="number" id="new-antutu-gpu" step="1000" min="10000" max="3000000" value="339300" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold">
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">リフレッシュレート (Hz) *</label>
            <input type="number" id="new-refresh-rate" required min="60" max="240" step="1" value="120" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-white">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">ピーク輝度 (nits) *</label>
            <input type="number" id="new-brightness" required min="400" max="6000" step="50" value="2000" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-white">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">光学ズーム倍率 (倍)</label>
            <input type="number" id="new-zoom" step="0.1" min="1" max="20" value="2.0" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-white">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">ディスプレイ仕様 (inch表記)</label>
            <input type="text" id="new-display-text" value="6.5 inch 有機EL (OLED)" placeholder="例: 6.3 inch LTPO 有機EL" class="w-full border border-slate-200 rounded-xl px-3 py-2 bg-white">
          </div>
        </div>

        <!-- 5キャリア取扱チェック -->
        <div>
          <label class="block font-extrabold text-slate-700 mb-1.5">取扱キャリア（複数選択可）</label>
          <div class="flex flex-wrap gap-2">
            <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-rose-50 has-[:checked]:border-rose-400 font-bold">
              <input type="checkbox" name="new-carrier" value="docomo" checked class="accent-rose-600"> docomo
            </label>
            <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-orange-50 has-[:checked]:border-orange-400 font-bold">
              <input type="checkbox" name="new-carrier" value="au" checked class="accent-orange-600"> au
            </label>
            <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-slate-100 has-[:checked]:border-slate-400 font-bold">
              <input type="checkbox" name="new-carrier" value="softbank" checked class="accent-slate-700"> SoftBank
            </label>
            <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-red-50 has-[:checked]:border-red-400 font-bold">
              <input type="checkbox" name="new-carrier" value="ymobile" class="accent-red-600"> Y!mobile
            </label>
            <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer has-[:checked]:bg-sky-50 has-[:checked]:border-sky-400 font-bold">
              <input type="checkbox" name="new-carrier" value="uq" class="accent-sky-600"> UQ mobile
            </label>
          </div>
        </div>

        <!-- 6軸5段階評価スコア -->
        <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
          <span class="font-extrabold text-slate-700 block">6軸 5段階スコア設定（1.0〜5.0）</span>
          <div class="grid grid-cols-2 sm:grid-cols-6 gap-2">
            <div>
              <label class="text-[11px] text-slate-500 font-bold">CPU性能</label>
              <input type="number" id="new-score-cpu" min="1" max="5" step="0.5" value="4.0" class="w-full border border-slate-200 rounded-lg px-2 py-1 font-bold bg-white">
            </div>
            <div>
              <label class="text-[11px] text-slate-500 font-bold">ゲーム性能</label>
              <input type="number" id="new-score-game" min="1" max="5" step="0.5" value="4.0" class="w-full border border-slate-200 rounded-lg px-2 py-1 font-bold bg-white">
            </div>
            <div>
              <label class="text-[11px] text-slate-500 font-bold">メインカメラ</label>
              <input type="number" id="new-score-camera" min="1" max="5" step="0.5" value="4.0" class="w-full border border-slate-200 rounded-lg px-2 py-1 font-bold bg-white">
            </div>
            <div>
              <label class="text-[11px] text-slate-500 font-bold">望遠カメラ</label>
              <input type="number" id="new-score-telephoto" min="1" max="5" step="0.5" value="2.5" class="w-full border border-slate-200 rounded-lg px-2 py-1 font-bold bg-white">
            </div>
            <div>
              <label class="text-[11px] text-slate-500 font-bold">電池持ち</label>
              <input type="number" id="new-score-battery" min="1" max="5" step="0.5" value="4.5" class="w-full border border-slate-200 rounded-lg px-2 py-1 font-bold bg-white">
            </div>
            <div>
              <label class="text-[11px] text-slate-500 font-bold">価格コスパ</label>
              <input type="number" id="new-score-cost" min="1" max="5" step="0.5" value="4.5" class="w-full border border-slate-200 rounded-lg px-2 py-1 font-bold bg-white">
            </div>
          </div>
        </div>

        <!-- 説明テキスト -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">カメラ特徴説明</label>
            <input type="text" id="new-camera-text" value="50MP広角＋超広角（光学手ブレ補正・AI夜景対応）" class="w-full border border-slate-200 rounded-xl px-3 py-2">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">バッテリー・充電特徴</label>
            <input type="text" id="new-battery-text" value="5000mAh大容量 / 急速充電対応" class="w-full border border-slate-200 rounded-xl px-3 py-2">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">ゲーム性能説明</label>
            <input type="text" id="new-game-text" value="120Hz有機EL搭載でゲームもスクロールも快適" class="w-full border border-slate-200 rounded-xl px-3 py-2">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">その他仕様（防水・おサイフ等）</label>
            <input type="text" id="new-other-text" value="IP68防水防塵 / おサイフケータイ対応 / 指紋・顔認証" class="w-full border border-slate-200 rounded-xl px-3 py-2">
          </div>
        </div>

        <!-- 本体カラー＆初期画像URL（任意） -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center pt-1">
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">イラスト筐体スタイル</label>
            <select id="new-design-style" class="w-full border border-slate-200 rounded-xl px-3 py-2 font-bold bg-slate-50">
              <option value="iphone-pro">3眼カメラ (Pro系)</option>
              <option value="iphone-dual" selected>2眼カメラ (標準系)</option>
              <option value="fold-book">横開き折りたたみ (Fold/Duo)</option>
              <option value="flip-clamshell">縦折りコンパクト (Flip/razr)</option>
              <option value="pixel-bar-pro">カメラバー (Pixel系)</option>
              <option value="galaxy-ultra">縦並び多眼＋ペン (Ultra系)</option>
              <option value="aquos-r">大型サークルカメラ (RPro/Ultra系)</option>
              <option value="rugged-tough">タフネス・頑丈ボディ (TORQUE系)</option>
              <option value="senior-phone">物理3ボタン搭載 (シニアスマホ系)</option>
            </select>
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">本体メインカラー</label>
            <input type="color" id="new-body-color" value="#4f46e5" class="w-full h-9 border border-slate-200 rounded-xl p-1 cursor-pointer">
          </div>
          <div>
            <label class="block font-extrabold text-slate-700 mb-1">本体画像URL (任意)</label>
            <input type="url" id="new-image-url" placeholder="https://... (後からファイル差替も可)" class="w-full border border-slate-200 rounded-xl px-3 py-2">
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
          <button type="button" onclick="closeAddDeviceModal()" class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">
            キャンセル
          </button>
          <button type="submit" class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold shadow-md">
            <i class="fa-solid fa-plus mr-1"></i>この内容で製品を追加
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ==========================================
       MODAL: ★評価の客観的採点基準（ルーブリック）解説モーダル
       ========================================== -->
  <div id="rubric-modal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-white rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between border-b border-slate-100 pb-3 sticky top-0 bg-white z-10">
        <div>
          <span class="text-[11px] font-extrabold text-indigo-600 uppercase">OBJECTIVE SCORING RUBRIC</span>
          <h3 class="text-base sm:text-lg font-extrabold text-slate-900">5軸★評価の明確な採点基準と「AndroidのGPU性能差」について</h3>
        </div>
        <button onclick="closeRubricModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- 重要コラム：総合スコアと実ゲーム性能（GPU）の乖離について -->
      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2 text-xs text-slate-800">
        <div class="font-extrabold text-amber-900 flex items-center gap-1.5 text-sm">
          <i class="fa-solid fa-triangle-exclamation text-amber-600"></i>
          なぜ「ハイエンド並みの価格・総合点なのにゲーム性能★が低い機種」があるのか？
        </div>
        <p class="leading-relaxed">
          スマートフォンの3Dゲーム性能（原神・鳴潮・FPS等のフレームレート維持）は、AnTuTuの総合スコアではなく<strong>「GPU単体スコア」と「ドライバ最適化・放熱設計」</strong>で決まります。
        </p>
        <ul class="list-disc pl-5 space-y-1 text-slate-700">
          <li><strong>Google Pixel系（Tensor G6 / G5等）の特性</strong>：AI処理や普段使いの快適さ（CPU・UX）は優秀で総合スコアは約190万〜200万点に達しますが、<strong>GPUスコアは約61万〜66万点</strong>と、同価格帯のSnapdragon 8 Elite Gen 5搭載機（<strong>GPU約135万〜138万点</strong>）の半分以下です。そのため日常操作は★4.5〜5.0でも、<strong>3Dゲーム性能は★3.5〜4.0</strong>と厳格に区別しています。</li>
          <li><strong>カメラ特化機・ミドルSoC搭載機の特性</strong>：『AQUOS R9 Pro（Snapdragon 8s Gen 3 / GPU約48.9万点）』のように20万円近いフラッグシップでもカメラ全振りでGPUがミドルハイ級の機種や、『AQUOS sense10（GPU 18万点）』『motorola edge 60（GPU 20.5万点）』のようにRAMや画面Hzは高くてもGPUが20万点前後の機種は、重い3Dゲームには向かないためゲーム★評価を抑えています。</li>
          <li><strong>60Hz画面制限・折りたたみ筐体の熱制約</strong>：『iPhone 17e / 16』はGPU性能自体は非常に高いものの画面が60Hz上限のため120fpsゲーム非対応である点、折りたたみ機（Fold/Flip）は薄型筐体ゆえ長時間ゲーム時のサーマルスロットリング（熱による速度低下）が起きやすい点を加味して採点しています。</li>
        </ul>
      </div>

      <!-- 5項目のルーブリック表 -->
      <div class="space-y-3 text-xs">
        <div class="border border-slate-200 rounded-xl overflow-hidden">
          <div class="bg-slate-900 text-white font-extrabold px-4 py-2 flex items-center justify-between">
            <span>① ゲーム性能（★1.0〜5.0）の採点基準</span>
            <span class="text-[11px] text-amber-300">最重要指標：AnTuTu GPU単体スコア × 画面Hz × 放熱</span>
          </div>
          <div class="divide-y divide-slate-100 p-3 space-y-1.5 bg-white">
            <div class="flex gap-2"><span class="font-extrabold text-indigo-600 w-14 shrink-0">★5.0</span><span><strong>AnTuTu GPU 110万点以上</strong> ＋ 120Hz以上 ＋ 大型冷却機構（S26 Ultra, iPhone 18 Pro/Max, Xperia 1 VIII, Find X9）。全3Dゲーム最高設定・高fps維持。</span></div>
            <div class="flex gap-2 pt-1.5"><span class="font-extrabold text-indigo-600 w-14 shrink-0">★4.5</span><span><strong>AnTuTu GPU 75万〜109万点</strong> ＋ 120Hz（iPhone 17/Air, nubia Fold）、またはGPU 110万点超だが折りたたみ薄型筐体で熱制約がある機種。</span></div>
            <div class="flex gap-2 pt-1.5"><span class="font-extrabold text-indigo-600 w-14 shrink-0">★4.0</span><span><strong>AnTuTu GPU 50万〜74万点</strong> ＋ 120Hz以上（Pixel 11 Pro/XL, AQUOS R11, arrows Alpha 2）、またはGPUは高性能だが<strong>画面が60Hz上限</strong>の機種（iPhone 17e / 16）。</span></div>
            <div class="flex gap-2 pt-1.5"><span class="font-extrabold text-indigo-600 w-14 shrink-0">★3.5</span><span><strong>AnTuTu GPU 30万〜49万点</strong>（AQUOS R9 Pro [GPU 48.9万], Pixel 11 [GPU 61.5万・小型放熱], Galaxy A57 [GPU 39.7万], Pixel 10a [GPU 40.8万], TORQUE G07 [GPU 33万]）。3Dゲームは中画質目安。</span></div>
            <div class="flex gap-2 pt-1.5"><span class="font-extrabold text-indigo-600 w-14 shrink-0">★2.5〜3.0</span><span><strong>AnTuTu GPU 10万〜29万点</strong>（motorola edge 60 [20.5万], AQUOS sense10 [18.0万], Xperia 10 VIII [15.8万], Reno15 A [13.8万]）。2D・パズル・中量級向け。重い3Dはカクつきあり。</span></div>
            <div class="flex gap-2 pt-1.5"><span class="font-extrabold text-indigo-600 w-14 shrink-0">★1.5〜2.0</span><span><strong>AnTuTu GPU 10万点未満</strong>（Dimensity 6300 / 7025, Snapdragon 6s Gen 3搭載のエントリー・シニア機）。3Dゲーム非推奨。</span></div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="border border-slate-200 rounded-xl p-3 space-y-1.5">
            <div class="font-extrabold text-slate-900 border-b border-slate-100 pb-1">③ メインカメラ性能（★1.0〜5.0）</div>
            <p class="text-slate-600">広角・超広角のセンサーサイズ、OIS（光学手ブレ補正）、夜景・AI画像処理の完成度で評価。</p>
            <div class="text-[11px] text-slate-700 space-y-0.5">
              <div>・<strong>★5.0</strong>：大型センサー（1型〜1/1.3型級）＋高画素超広角＋高度な空間/AI処理</div>
              <div>・<strong>★4.5</strong>：上位センサー＋OIS＋優秀な夜景・ポートレート処理</div>
              <div>・<strong>★4.0</strong>：OIS付広角＋超広角の2眼構成（無印ハイエンド・上位ミドル）</div>
              <div>・<strong>★3.5</strong>：OIS付単眼（iPhone 17e/Air等）または標準的なミドルカメラ</div>
              <div>・<strong>★2.5〜3.0</strong>：記録・QR読取中心のエントリーカメラ</div>
            </div>
          </div>

          <div class="border border-indigo-200 bg-indigo-50/40 rounded-xl p-3 space-y-1.5">
            <div class="font-extrabold text-indigo-950 border-b border-indigo-100 pb-1">④ 望遠カメラ性能・専用レンズ有無（★1.0〜5.0）</div>
            <p class="text-slate-600">「専用の光学望遠レンズ」を搭載しているか、何倍の光学ズームが可能かの独立評価軸。</p>
            <div class="text-[11px] text-slate-700 space-y-0.5">
              <div>・<strong>★5.0</strong>：<strong>大型センサー専用ペリスコープ望遠（光学5倍〜8.3倍）</strong>（18 Pro/Max, S26 Ultra, Pixel 11 Pro/XL, Xperia 1 VIII）</div>
              <div>・<strong>★4.0〜4.5</strong>：<strong>専用光学望遠レンズ搭載（光学2倍〜5倍）</strong>（Pixel 11 [光学5倍], Galaxy S26/S26+, AQUOS R9 Pro, Find X9, edge 60等）</div>
              <div>・<strong>★2.5</strong>：<strong>専用望遠レンズなし</strong>（高画素メインセンサー中央クロップによる2倍ズーム対応機）</div>
              <div>・<strong>★1.5</strong>：<strong>専用望遠レンズなし</strong>（デジタルズームのみ・1.0倍）</div>
            </div>
          </div>

          <div class="border border-slate-200 rounded-xl p-3 space-y-1.5">
            <div class="font-extrabold text-slate-900 border-b border-slate-100 pb-1">⑤ 電池持ち（★1.0〜5.0）</div>
            <p class="text-slate-600">mAh容量だけでなく、LTPO/IGZO等の可変駆動パネルとSoC電力効率を加味した実測スタミナ基準。</p>
            <div class="text-[11px] text-slate-700 space-y-0.5">
              <div>・<strong>★5.0</strong>：5000mAh以上×高効率IGZO/LTPOで2日間余裕のスタミナ</div>
              <div>・<strong>★4.5</strong>：連続動画再生26〜31時間クラス（1.5〜2日持ち）</div>
              <div>・<strong>★4.0</strong>：丸1日しっかり使える標準スタミナ（小型機・縦折り機含）</div>
            </div>
          </div>

          <div class="border border-slate-200 rounded-xl p-3 space-y-1.5">
            <div class="font-extrabold text-slate-900 border-b border-slate-100 pb-1">⑥ 価格コスパ（★1.0〜5.0）</div>
            <p class="text-slate-600">SIMフリー定価に対する「実効性能（CPU/GPU/カメラ/画面/サポート年数）」の費用対効果。</p>
            <div class="text-[11px] text-slate-700 space-y-0.5">
              <div>・<strong>★5.0</strong>：価格以上のSoC・カメラ・長期保証を備えた高コスパ機</div>
              <div>・<strong>★4.0〜4.5</strong>：性能と定価のバランスが取れた適正モデル</div>
              <div>・<strong>★2.0〜3.0</strong>：20万〜36万円超の超高級機（性能は最高だが価格負担大）</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-2 border-t border-slate-100">
        <button onclick="closeRubricModal()" class="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold">
          閉じる
        </button>
      </div>
    </div>
  </div>

  <!-- ==========================================
       MODAL: 削除確認＆初期データリセット確認モーダル
       ========================================== -->
  <div id="confirm-action-modal" class="fixed inset-0 z-50 hidden bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          <i class="fa-solid fa-triangle-exclamation text-lg"></i>
        </div>
        <div>
          <h3 id="confirm-modal-title" class="text-base font-extrabold text-slate-900">確認</h3>
          <p id="confirm-modal-desc" class="text-xs text-slate-500 mt-0.5">この操作を実行しますか？</p>
        </div>
      </div>
      <div class="flex items-center justify-end gap-2 pt-2">
        <button onclick="closeConfirmModal()" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold">
          キャンセル
        </button>
        <button id="confirm-modal-ok-btn" class="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold">
          実行する
        </button>
      </div>
    </div>
  </div>

  <!-- トースト通知 -->
  <div id="toast-message" class="fixed bottom-5 right-5 z-50 hidden px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xl flex items-center gap-2 border border-slate-700">
    <i class="fa-solid fa-circle-check text-emerald-400"></i>
    <span id="toast-text">更新しました</span>
  </div>

  <!-- ==========================================
       JavaScript: マスタデータ＆シミュレーションロジック
       ========================================== -->
  <script>
    const STORAGE_KEY_DEVICES = 'sim_custom_devices_v7';
    const STORAGE_KEY_IMAGES = 'sim_custom_images_v2';

    // シリーズ・カテゴリ一覧（ご指定の11グループ）
    const MAKERS = [
      'iPhone',
      'GALAXY',
      'Pixel',
      'Xperia',
      'AQUOS',
      'arrows',
      'OPPO',
      'motorola',
      'nubia',
      'その他',
      'シニアスマホ'
    ];

    // メーカー・シリーズ解説データ（タブ4用）
    const MAKER_GUIDE_INFO = [
      {
        maker: 'iPhone',
        company: 'Apple（アップル）',
        os: 'iOS',
        badge: '国内シェアNo.1・高リセール',
        color: 'slate',
        summary: 'Aシリーズチップによる圧倒的な処理性能と3Dゲームの安定感、直感的な操作性、動画撮影の強さが魅力。2026年7月・9月の価格改定により最安のiPhone 17eでも124,800円〜となりましたが、数年使っても高く売れるリセールバリューの高さは健在です。',
        pros: ['3Dゲーム・アプリの最適化と動作安定性が最高峰', '動画撮影の手ブレ補正・マイク音質・自然な色味が優秀', '6年以上の長期OSサポート＆下取り（リセール）価格が非常に高い'],
        cons: ['2026年の価格改定で全モデル12万円超（17e:124,800円〜 / 17:159,800円〜 / Air:189,800円〜）へ値上がり', '全機種microSDカード非対応、iPhone Duo以外はFace IDのみ'],
        recommendFor: '失敗したくない人、3Dゲームを快適に遊びたい人、2〜4年ごとに高い下取り価格で買い替えたい人'
      },
      {
        maker: 'GALAXY',
        company: 'Samsung（サムスン）',
        os: 'Android (One UI)',
        badge: 'Android世界No.1・完成度抜群',
        color: 'indigo',
        summary: 'コンパクトなS無印から光学5倍望遠＆Sペン対応のUltra、さらに薄型軽量化した折りたたみ（Z Fold8 / Flip8）や高コスパAシリーズまで全方位に隙がない王道ブランド。',
        pros: ['S26系は「Snapdragon 8 Elite Gen 5 for Galaxy」搭載でAndroid最高峰のゲーム性能', 'S26無印（167g）でも専用光学3倍望遠レンズを搭載', 'Galaxy AI（リアルタイム通訳・画像編集）とOne UIの使い勝手が抜群'],
        cons: ['SシリーズやZシリーズはmicroSD非対応（A25のみ対応）', 'UltraやFold系は20万円を超える高価格帯'],
        recommendFor: 'Androidで3Dゲームもカメラも妥協したくない人、ライブ撮影（Ultra）や折りたたみ機を選びたい人'
      },
      {
        maker: 'Pixel',
        company: 'Google（グーグル）',
        os: 'Android (純正)',
        badge: 'AI機能・カメラ補正・7年保証',
        color: 'emerald',
        summary: 'Google純正スマホ。最新AI「Gemini」や写真編集（ベストテイク・消しゴムマジック）、7年間のOSアップデート保証が強み。Pixel 11では無印モデルにも光学5倍望遠が搭載。',
        pros: ['シャッターを押すだけで夜景も人物も綺麗に写るAIカメラ処理', 'Pixel 11無印でも光学5倍望遠レンズ搭載', '7年間のOS・セキュリティ更新保証で長く安心して使える'],
        cons: ['独自チップ「Tensor」はAnTuTu GPUスコアが同価格帯Snapdragon機の約半分のため、重い3Dゲームの最高設定維持には不向き', 'microSDカード非対応'],
        recommendFor: '難しい設定なしで綺麗な写真を撮りたい人、最新AI機能をフル活用したい人、1台を長く使いたい人'
      },
      {
        maker: 'Xperia',
        company: 'SONY（ソニー）',
        os: 'Android',
        badge: 'カメラ・音響・microSD＆ジャック搭載',
        color: 'blue',
        summary: 'ソニーのカメラ技術（α）・映像技術（BRAVIA）・音響技術（WALKMAN）を結集。ハイエンドでも「イヤホンジャック」「工具不要microSDスロット」「ノッチなし画面」を貫く唯一無二の存在。',
        pros: ['Xperia 1 VIIIは85-200mm連続光学ズーム望遠と最高峰Snapdragonを搭載', '全機種で最大2TBのmicroSDXCカードと有線イヤホンジャックに対応', 'フロントステレオスピーカーの音質とバッテリー持ちが非常に優秀'],
        cons: ['1 VIIIはソニーストア定価23.5万円〜、10 VIIIも9.9万円と他社同クラスより価格が高め', '生体認証が側面指紋認証のみ（顔認証非搭載）'],
        recommendFor: '音楽・映画・カメラにこだわる人、ハイエンド機でもSDカードや有線イヤホンを使いたい人'
      },
      {
        maker: 'AQUOS',
        company: 'SHARP（シャープ）',
        os: 'Android',
        badge: 'Pro IGZO省電力・ライカ監修カメラ',
        color: 'sky',
        summary: '省電力と滑らかさを両立する「Pro IGZO OLED」ディスプレイと国内ユーザーのツボを押さえた安心設計。sense10はミドル帯人気No.1クラス、R9 proは1インチセンサー搭載。',
        pros: ['アイドリングストップ機能付きPro IGZO画面で電池持ちが非常に良い', 'sense10（166g）など軽量かつMIL規格耐衝撃・泡ハンドソープ洗い対応モデルが多い', 'マスク対応顔認証＋指紋認証、microSD対応（R9 pro除く）など実用性抜群'],
        cons: ['R9 proやsense10は価格に対してGPUスコアが控えめなため、重い3Dゲーム目的には向かない'],
        recommendFor: '電池持ちと軽さ・丈夫さを重視する人、ライカ監修の自然なカメラ画質を楽しみたい人'
      },
      {
        maker: 'arrows',
        company: 'FCNT（エフシーエヌティー）',
        os: 'Android',
        badge: 'まる洗い高耐久・自律神経測定・長寿命電池',
        color: 'cyan',
        summary: '旧富士通系ブランド。落下や水濡れに強いMIL規格・IP69高耐久設計に加え、泡ハンドソープでの丸洗いやアルコール除菌、独自の「自律神経活性度測定」など健康・安心機能が充実。',
        pros: ['IPX6/IPX8/IPX9防水＆MIL規格耐衝撃でケースなしでも安心の頑丈さ', '4年後も電池が劣化しにくい長寿命充電制御とmicroSD対応', 'arrows Alpha 2はDimensity 8350 Extreme搭載で処理性能も大幅強化'],
        cons: ['専用光学望遠レンズ搭載モデルはない'],
        recommendFor: 'スマホを長く清潔・頑丈に使いたい人、コスパ良く高性能な国内メーカー機（Alpha 2）が欲しい人'
      },
      {
        maker: 'OPPO',
        company: 'OPPO（オッポ）',
        os: 'Android (ColorOS)',
        badge: '7000mAh超大容量電池＆高コスパ',
        color: 'teal',
        summary: 'ミドル定番の「Reno A」シリーズが有名。最新のReno15 AやフラッグシップのFind X9では、薄型ボディに「7,000mAh」のシリコンカーボン超大容量バッテリーとおサイフケータイを搭載。',
        pros: ['Reno15 AやFind X9は7000mAh超大容量バッテリー搭載で驚異的なスタミナ', 'Find X9は日本国内版で初のFeliCa（おサイフケータイ）対応＆ハッセルブラッド3眼カメラ搭載', 'AI消しゴムや急速充電など日常の快適機能が充実'],
        cons: ['Reno15 A / 13 AはSoCがSnapdragon 6 Gen 1のため、重い3Dゲームには向かない'],
        recommendFor: 'モバイルバッテリーを持ち歩きたくない電池持ち最優先の人、コスパ重視の人'
      },
      {
        maker: 'motorola',
        company: 'Motorola（モトローラ）',
        os: 'Android',
        badge: '縦折りrazrシリーズ＆急速充電ミドル',
        color: 'purple',
        summary: '閉じたままアプリが使える大画面カバー液晶を備えた縦折りスマホ「motorola razr 60 / 60 Ultra」と、光学3倍望遠を搭載した高コスパミドル「edge 60」が人気。',
        pros: ['razr 60 / 60 Ultraは3.6〜4.0 inchの大型外画面を備えたファッショナブルな縦折りスマホ（おサイフ対応）', 'edge 60は7万円台で「光学3倍望遠カメラ」とIP68/IP69防水を備えた高コスパ機', 'クセのないスッキリしたAndroid UIとジェスチャー操作が使いやすい'],
        cons: ['razr 60無印やedge 60はDimensity 7400系のため、ヘビーな3Dゲームよりは日常・カメラ向き'],
        recommendFor: 'おしゃれな縦折りスマホ（razr）を使いたい人、ミドル価格帯で光学3倍ズームが欲しい人'
      },
      {
        maker: 'nubia',
        company: 'ZTE（ヌビア）',
        os: 'Android',
        badge: '圧倒的な低価格・高コスパ折りたたみ',
        color: 'rose',
        summary: 'Y!mobile等を中心に展開。2万円台でおサイフ・防水を備えた「nubia S2 / S2e」や、6万円台の縦折り「nubia Flip 3」、13万円台の横折り「nubia Fold」など価格破壊モデルを展開。',
        pros: ['他社の半額近い価格で折りたたみスマホ（Flip 3 / Fold）や大画面エントリー機が手に入る', 'nubia Foldは6560mAh超大容量バッテリー＋Snapdragon 8 Elite搭載', '全機種おサイフケータイ（FeliCa）にしっかり対応'],
        cons: ['Fold / Flip 3は防水がIPX4（生活防水レベル）でワイヤレス充電非対応'],
        recommendFor: 'とにかく安くスマホや折りたたみ機を手に入れたい人、Y!mobileユーザー'
      },
      {
        maker: 'その他',
        company: '京セラ（TORQUE/DIGNO）・Xiaomi（Redmi）・Natural AI',
        os: 'Android',
        badge: '個性派・超高耐久・AI特化',
        color: 'amber',
        summary: '電池パック交換可能で海水・2m落下に耐える最強タフネス「TORQUE G07」、ビジネス高耐久「DIGNO BX3」、1億画素大画面エントリー「Redmi 15 5G」、AI特化「Natural AI Phone」を収録。',
        pros: ['TORQUE G07は現代で唯一の「予備バッテリー着脱交換式」＆最強の耐衝撃タフネス仕様', 'Redmi 15 5Gは3万円台で6.79 inch大画面＆108MPカメラ搭載'],
        cons: ['DIGNO BX3は法人・業務向け設計のためFeliCa非対応'],
        recommendFor: '登山・釣り・バイク・現場作業で最強の頑丈さを求める人（TORQUE）、大画面コスパ機を求める人'
      },
      {
        maker: 'シニアスマホ',
        company: 'FCNT（らくらく） / SHARP（BASIO・シンプルスマホ）',
        os: 'Android (専用かんたんUI)',
        badge: '物理ボタン・大きな文字・迷惑電話対策',
        color: 'emerald',
        summary: '「電話」「メール」「ホーム」の専用物理ボタンや、押した感触がわかるタッチパネル、自動迷惑電話対策、健康管理機能を備えたシニア・初心者向け安心モデル。',
        pros: ['光る物理ボタンと大きな文字でガラケーからの乗り換えでも迷わない', '詐欺・迷惑電話の自動警告や録音、緊急ブザーなど安心機能が標準搭載', '全機種が防水防塵・耐衝撃・泡ハンドソープ洗い・おサイフケータイ・microSDに対応'],
        cons: ['3Dゲームや高度なマルチタスクには非対応'],
        recommendFor: 'ご両親・祖父母へのプレゼント、初めてのスマートフォンで操作に不安がある方'
      }
    ];

    // 4段階ティア定義
    const TIER_INFO = {
      Entry: { label: 'エントリー', priceRange: '〜4.5万円', color: 'emerald' },
      Middle: { label: 'ミドル', priceRange: '5〜10万円', color: 'blue' },
      HighEnd: { label: 'ハイエンド(無印)', priceRange: '11〜15万円', color: 'purple' },
      Flagship: { label: 'フラッグシップ(Pro/Ultra)', priceRange: '16万円〜', color: 'amber' }
    };

    // 5キャリア定義
    const CARRIER_INFO = {
      docomo: { label: 'docomo', short: 'docomo', bg: 'bg-rose-50 text-rose-700 border-rose-200' },
      au: { label: 'au', short: 'au', bg: 'bg-orange-50 text-orange-700 border-orange-200' },
      softbank: { label: 'SoftBank', short: 'SB', bg: 'bg-slate-100 text-slate-700 border-slate-300' },
      ymobile: { label: 'Y!mobile', short: 'YM', bg: 'bg-red-50 text-red-700 border-red-200' },
      uq: { label: 'UQ mobile', short: 'UQ', bg: 'bg-sky-50 text-sky-700 border-sky-200' }
    };

    // 全45機種 メーカー公式スペック準拠マスタデータ
    // ※画面サイズはすべて inch 表記、ROM欄用 sdCard、防水防塵 waterproof、生体認証 biometrics、FeliCa felica、本体寸法 dimensions、メーカー名 brand を完備
    const INITIAL_DEVICES = [
      // ==========================================
      // 1. iPhone (7機種: Duo, 18Pro, 18ProMax, Air, 17, 17e, 16)
      // ==========================================
      {
        id: 'iphone_duo',
        maker: 'iPhone',
        brand: 'Apple',
        name: 'iPhone Duo',
        tier: 'Flagship',
        price: 364800,
        rom: [256, 512, 1024, 2048],
        ram: 16,
        sdCard: '非対応',
        cpu: 'Apple A20 Pro (2nm)',
        antutuScore: 3584200,
        antutuGpuScore: 1398000,
        antutu: '3,584,200点 (CPU:93.2万 / GPU:139.8万 / MEM:56.8万 / UX:68.6万)',
        refreshRate: 120,
        brightness: 3000,
        displayText: '展開時 7.6 inch ＋ カバー 5.4 inch Ultra Retina XDR (LTPO 1〜120Hz)',
        cameraText: '48MPメイン＋48MP超広角 Dual Fusion（光学2倍相当クロップ・専用望遠レンズなし）',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '連続動画再生 最大31時間(インナー) / 最大44時間(アウター)',
        gameText: 'GPU 139.8万点＆7.6 inch 120Hz大画面（折りたたみ薄型筐体のため長時間高負荷時は放熱に留意）',
        waterproof: 'IPX8 (防水対応 / 防塵非公表)',
        biometrics: 'Touch ID (サイドボタン指紋認証 ※Face ID非搭載)',
        felica: '対応 (FeliCa / Apple Pay)',
        dimensions: '開:約164.6×117.8×5.2mm / 閉:約84.1×117.8×11.3mm',
        weight: 254,
        otherText: 'Apple初の横折りiPhone / チタニウム筐体 / Apple C2モデム搭載',
        isFoldable: true,
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 4.5, camera: 4.5, telephoto: 2.5, battery: 4.5, cost: 2.0 },
        design: { style: 'fold-book', bodyColor: '#334155', accentColor: '#94a3b8', screenColor: '#1e1b4b' }
      },
      {
        id: 'iphone_18_pro',
        maker: 'iPhone',
        brand: 'Apple',
        name: 'iPhone 18 Pro',
        tier: 'Flagship',
        price: 219800,
        rom: [256, 512, 1024, 2048],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Apple A20 Pro (2nm)',
        antutuScore: 3428650,
        antutuGpuScore: 1312000,
        antutu: '3,428,650点 (CPU:90.5万 / GPU:131.2万 / MEM:54.1万 / UX:67.0万)',
        refreshRate: 120,
        brightness: 3000,
        displayText: '6.3 inch Super Retina XDR OLED (LTPO 1〜120Hz ProMotion / 常時表示)',
        cameraText: '48MP可変絞りメイン(3層積層センサー)＋48MP超広角＋光学5倍望遠',
        telephotoZoom: 5.0,
        hasTelephoto: true,
        batteryText: '連続動画再生 最大36時間 / MagSafe・Qi2.2高速ワイヤレス充電',
        gameText: 'GPU 131.2万点＋120Hz ProMotion＋iOS最適化で全3Dゲーム最高設定・高fps安定',
        waterproof: 'IP68 (水深6m最大30分)',
        biometrics: 'Face ID (小型化Dynamic Island 3D顔認証)',
        felica: '対応 (FeliCa / Apple Pay)',
        dimensions: '約150.0 × 71.9 × 8.75 mm',
        weight: 211,
        otherText: 'アルミニウムUnibody / USB 3 (最大10Gb/s) / 衛星通信・Apple Intelligence対応',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 5.0, camera: 5.0, telephoto: 5.0, battery: 4.5, cost: 3.5 },
        design: { style: 'iphone-pro', bodyColor: '#475569', accentColor: '#cbd5e1', screenColor: '#1e1b4b' }
      },
      {
        id: 'iphone_18_promax',
        maker: 'iPhone',
        brand: 'Apple',
        name: 'iPhone 18 Pro Max',
        tier: 'Flagship',
        price: 239800,
        rom: [256, 512, 1024, 2048],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Apple A20 Pro (2nm)',
        antutuScore: 3551073,
        antutuGpuScore: 1385000,
        antutu: '3,551,073点 (CPU:92.0万 / GPU:138.5万 / MEM:56.2万 / UX:68.3万)',
        refreshRate: 120,
        brightness: 3000,
        displayText: '6.9 inch Super Retina XDR OLED (LTPO 1〜120Hz ProMotion / 超低反射)',
        cameraText: '48MP可変絞りメイン＋48MP超広角＋光学5倍〜ペリスコープ超望遠',
        telephotoZoom: 5.0,
        hasTelephoto: true,
        batteryText: '連続動画再生 最大39時間 / 歴代iPhone最長の圧倒的スタミナ',
        gameText: 'GPU 138.5万点＋6.9 inch 120Hz＋大型放熱設計で長時間FPS・原神も最高水準で安定',
        waterproof: 'IP68 (水深6m最大30分)',
        biometrics: 'Face ID (小型化Dynamic Island 3D顔認証)',
        felica: '対応 (FeliCa / Apple Pay)',
        dimensions: '約163.4 × 78.0 × 8.75 mm',
        weight: 249,
        otherText: 'アルミニウムUnibody / 最大2TB選択可 / USB 3高速転送対応',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 5.0, camera: 5.0, telephoto: 5.0, battery: 5.0, cost: 3.0 },
        design: { style: 'iphone-pro', bodyColor: '#1e293b', accentColor: '#94a3b8', screenColor: '#0f172a' }
      },
      {
        id: 'iphone_air',
        maker: 'iPhone',
        brand: 'Apple',
        name: 'iPhone Air',
        tier: 'HighEnd',
        price: 189800,
        rom: [256, 512, 1024],
        ram: 8,
        sdCard: '非対応',
        cpu: 'Apple A19',
        antutuScore: 2385400,
        antutuGpuScore: 835000,
        antutu: '2,385,400点 (CPU:68.2万 / GPU:83.5万 / MEM:41.8万 / UX:45.0万)',
        refreshRate: 120,
        brightness: 2500,
        displayText: '6.5 inch Super Retina XDR OLED (LTPO 1〜120Hz ProMotion対応)',
        cameraText: '48MP Fusionシングルカメラ（光学2倍相当クロップ対応・超広角/専用望遠なし）',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '高密度薄型バッテリー搭載 / 連続動画再生 最大24時間',
        gameText: 'GPU 83.5万点＆120Hz対応の165g軽量機（厚さ5.64mm極薄筐体のため長時間高負荷ゲーム時は発熱に注意）',
        waterproof: 'IP68 (水深6m最大30分)',
        biometrics: 'Face ID (Dynamic Island 3D顔認証)',
        felica: '対応 (FeliCa / Apple Pay)',
        dimensions: '約156.2 × 74.7 × 5.64 mm',
        weight: 165,
        otherText: '厚さ5.64mm極薄チタニウムフレーム / 165g超軽量6.5 inch大画面 / Apple公式189,800円〜(2026年9月改定価格)',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 4.5, game: 4.0, camera: 3.5, telephoto: 2.5, battery: 4.0, cost: 3.0 },
        design: { style: 'iphone-single', bodyColor: '#38bdf8', accentColor: '#bae6fd', screenColor: '#0c4a6e' }
      },
      {
        id: 'iphone_17',
        maker: 'iPhone',
        brand: 'Apple',
        name: 'iPhone 17',
        tier: 'HighEnd',
        price: 159800,
        rom: [256, 512],
        ram: 8,
        sdCard: '非対応',
        cpu: 'Apple A19',
        antutuScore: 2340358,
        antutuGpuScore: 823000,
        antutu: '2,340,358点 (CPU:66.8万 / GPU:82.3万 / MEM:40.5万 / UX:44.4万)',
        refreshRate: 120,
        brightness: 2500,
        displayText: '6.3 inch Super Retina XDR OLED (1〜120Hz ProMotion対応)',
        cameraText: '48MPメイン(光学2倍相当クロップ)＋48MP超広角デュアルカメラ',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '連続動画再生 最大30時間 / MagSafe・Qi2対応',
        gameText: 'GPU 82.3万点＋無印待望の120Hz ProMotion対応！3Dゲームも高画質・高fpsで快適',
        waterproof: 'IP68 (水深6m最大30分)',
        biometrics: 'Face ID (Dynamic Island 3D顔認証)',
        felica: '対応 (FeliCa / Apple Pay)',
        dimensions: '約149.6 × 71.5 × 7.95 mm',
        weight: 177,
        otherText: '最小256GB〜 / Ceramic Shield 2搭載 / Apple公式159,800円〜(2026年9月改定価格)',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 4.5, game: 4.5, camera: 4.0, telephoto: 2.5, battery: 4.5, cost: 4.0 },
        design: { style: 'iphone-dual', bodyColor: '#6366f1', accentColor: '#a5b4fc', screenColor: '#1e1b4b' }
      },
      {
        id: 'iphone_17e',
        maker: 'iPhone',
        brand: 'Apple',
        name: 'iPhone 17e',
        tier: 'HighEnd',
        price: 124800,
        rom: [256, 512],
        ram: 8,
        sdCard: '非対応',
        cpu: 'Apple A19 (6コアCPU / 4コアGPU)',
        antutuScore: 2064253,
        antutuGpuScore: 744000,
        antutu: '2,064,253点 (CPU:61.2万 / GPU:74.4万 / MEM:33.8万 / UX:37.0万)',
        refreshRate: 60,
        brightness: 1600,
        displayText: '6.1 inch Super Retina XDR OLED (60Hz駆動 / HDRピーク1600nits)',
        cameraText: '48MP Fusionシングルカメラ（光学2倍相当クロップ対応・超広角なし）',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '自社製省電力C1X 5Gモデム搭載で最大26時間の優秀な電池持ち',
        gameText: '1世代新しいA19(4コアGPU)採用により、5コアGPUのiPhone 16(A18)を上回るGPU 74.4万点を実現！ただし画面は60Hz上限（★4.0）',
        waterproof: 'IP68 (水深6m最大30分)',
        biometrics: 'Face ID (3D顔認証)',
        felica: '対応 (FeliCa / Apple Pay)',
        dimensions: '約146.7 × 71.5 × 7.80 mm',
        weight: 169,
        otherText: '256GBスタート / 新世代A19チップ搭載でiPhone 16より処理性能・GPUが上 / Apple公式124,800円〜',
        carriers: ['docomo', 'au', 'softbank', 'ymobile', 'uq'],
        scores: { cpu: 4.5, game: 4.0, camera: 3.5, telephoto: 2.5, battery: 4.5, cost: 4.0 },
        design: { style: 'iphone-single', bodyColor: '#475569', accentColor: '#94a3b8', screenColor: '#0f172a' }
      },
      {
        id: 'iphone_16',
        maker: 'iPhone',
        brand: 'Apple',
        name: 'iPhone 16',
        tier: 'HighEnd',
        price: 139800,
        rom: [128],
        ram: 8,
        sdCard: '非対応',
        cpu: 'Apple A18 (6コアCPU / 5コアGPU)',
        antutuScore: 1859039,
        antutuGpuScore: 589000,
        antutu: '1,859,039点 (CPU:71.5万 / GPU:58.9万 / MEM:19.5万 / UX:35.8万)',
        refreshRate: 60,
        brightness: 2000,
        displayText: '6.1 inch Super Retina XDR OLED (60Hz駆動 / 屋外ピーク2000nits)',
        cameraText: '48MPメイン(光学2倍相当クロップ)＋12MP超広角デュアルカメラ（マクロ・空間撮影対応）',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '連続動画再生 最大22時間 / MagSafe・Qi2ワイヤレス充電対応',
        gameText: '旧世代A18(5コアGPU)のためCPU/GPUスコアは後発の17e(A19)に譲るが、超広角カメラや2000nits高輝度画面・Dynamic Islandを搭載（★4.0）',
        waterproof: 'IP68 (水深6m最大30分)',
        biometrics: 'Face ID (Dynamic Island 3D顔認証)',
        felica: '対応 (FeliCa / Apple Pay)',
        dimensions: '約147.6 × 71.6 × 7.80 mm',
        weight: 170,
        otherText: '超広角2眼＋カメラコントロール＋Dynamic Island搭載（チップ性能は17eが上）/ Apple公式139,800円(128GB)',
        carriers: ['docomo', 'au', 'softbank', 'ymobile', 'uq'],
        scores: { cpu: 4.5, game: 4.0, camera: 4.0, telephoto: 2.5, battery: 4.0, cost: 3.5 },
        design: { style: 'iphone-dual', bodyColor: '#2563eb', accentColor: '#93c5fd', screenColor: '#0f172a' }
      },

      // ==========================================
      // 2. GALAXY (8機種: Fold8Ultra, Fold8, Flip8, S26, S26+, S26Ultra, A57, A25)
      // ==========================================
      {
        id: 'galaxy_fold8_ultra',
        maker: 'GALAXY',
        brand: 'Samsung',
        name: 'Galaxy Z Fold8 Ultra',
        tier: 'Flagship',
        price: 289800,
        rom: [256, 512, 1024],
        ram: 16,
        sdCard: '非対応',
        cpu: 'Snapdragon 8 Elite Gen 5 for Galaxy',
        antutuScore: 3712400,
        antutuGpuScore: 1368000,
        antutu: '3,712,400点 (CPU:114.2万 / GPU:136.8万 / MEM:47.2万 / UX:73.0万)',
        refreshRate: 120,
        brightness: 3000,
        displayText: 'メイン 8.0 inch ＋ カバー 6.5 inch Dynamic AMOLED 2X (1〜120Hz)',
        cameraText: '200MP広角(1/1.3型)＋50MP超広角＋10MP光学3倍望遠',
        telephotoZoom: 3.0,
        hasTelephoto: true,
        batteryText: '5000mAhバッテリー (連続動画再生 最大27時間) / 45W急速充電',
        gameText: 'GPU 136.8万点＆8.0 inch 120Hz大画面（展開時4.1mmの超薄型折りたたみ筐体）',
        waterproof: 'IP48 (IPX8防水 / IP4X防塵)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '開:約158.4×143.2×4.1mm / 閉:約158.4×72.8×8.9mm',
        weight: 215,
        otherText: '展開時4.1mm・215gへ劇的薄型軽量化した最上位ブック型折りたたみ / Galaxy AI対応',
        isFoldable: true,
        carriers: ['docomo', 'au'],
        scores: { cpu: 5.0, game: 4.5, camera: 5.0, telephoto: 4.5, battery: 4.5, cost: 2.5 },
        design: { style: 'fold-book', bodyColor: '#18181b', accentColor: '#eab308', screenColor: '#09090b' }
      },
      {
        id: 'galaxy_fold8',
        maker: 'GALAXY',
        brand: 'Samsung',
        name: 'Galaxy Z Fold8',
        tier: 'Flagship',
        price: 249800,
        rom: [256, 512, 1024],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Snapdragon 8 Elite Gen 5 for Galaxy',
        antutuScore: 3520180,
        antutuGpuScore: 1295000,
        antutu: '3,520,180点 (CPU:109.8万 / GPU:129.5万 / MEM:45.2万 / UX:67.5万)',
        refreshRate: 120,
        brightness: 3000,
        displayText: 'メイン 7.6 inch ＋ カバー 5.5 inch Dynamic AMOLED 2X (1〜120Hz)',
        cameraText: '50MP広角(光学2倍相当クロップ)＋50MP超広角（専用望遠レンズなし）',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '4800mAhバッテリー (連続動画再生 最大26時間) / 45W急速充電',
        gameText: 'GPU 129.5万点＆7.6 inch大画面ながら201gの超軽量横折りボディ',
        waterproof: 'IP48 (IPX8防水 / IP4X防塵)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '開:約123.9×161.4×4.5mm / 閉:約123.9×81.9×9.7mm',
        weight: 201,
        otherText: '約201gの軽量パスポートサイズ横折りモデル / Galaxy AI対応',
        isFoldable: true,
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 4.5, camera: 4.5, telephoto: 2.5, battery: 4.5, cost: 3.0 },
        design: { style: 'fold-book', bodyColor: '#334155', accentColor: '#60a5fa', screenColor: '#172554' }
      },
      {
        id: 'galaxy_flip8',
        maker: 'GALAXY',
        brand: 'Samsung',
        name: 'Galaxy Z Flip8',
        tier: 'HighEnd',
        price: 192680,
        rom: [256, 512],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Snapdragon 8 Elite Gen 5 for Galaxy',
        antutuScore: 3145600,
        antutuGpuScore: 1115000,
        antutu: '3,145,600点 (CPU:102.4万 / GPU:111.5万 / MEM:44.8万 / UX:55.8万)',
        refreshRate: 120,
        brightness: 2600,
        displayText: 'メイン 6.9 inch ＋ カバー 4.1 inch Dynamic AMOLED 2X (1〜120Hz)',
        cameraText: '50MP広角(光学2倍相当)＋12MP超広角 / 閉じたまま高画質セルフィー撮影',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '連続動画再生 最大31時間 / 縦折り機ながら終日安心のスタミナ',
        gameText: 'GPU 111.5万点とチップは高性能だが、縦折り構造上放熱面積が限られ長時間の重い3Dゲームには不向き（★4.0）',
        waterproof: 'IP48 (IPX8防水 / IP4X防塵)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '開:約165.1×71.9×6.5mm / 閉:約85.1×71.9×13.9mm',
        weight: 180,
        otherText: '4.1 inch大型カバー画面 / 180g軽量コンパクト縦折りスマホ',
        isFoldable: true,
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 4.0, camera: 4.0, telephoto: 2.5, battery: 4.5, cost: 3.5 },
        design: { style: 'flip-clamshell', bodyColor: '#8b5cf6', accentColor: '#c4b5fd', screenColor: '#2e1065' }
      },
      {
        id: 'galaxy_s26_ultra',
        maker: 'GALAXY',
        brand: 'Samsung',
        name: 'Galaxy S26 Ultra',
        tier: 'Flagship',
        price: 218800,
        rom: [256, 512, 1024],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Snapdragon 8 Elite Gen 5 for Galaxy',
        antutuScore: 3748209,
        antutuGpuScore: 1384347,
        antutu: '3,748,209点 (CPU:115.8万 / GPU:138.4万 / MEM:46.5万 / UX:74.1万)',
        refreshRate: 120,
        brightness: 3000,
        displayText: '6.9 inch QHD+ Dynamic AMOLED 2X (1〜120Hz / 反射防止Gorilla Armor 2)',
        cameraText: '200MP広角＋50MP超広角＋光学3倍＆50MP光学5倍W望遠(最大100倍ズーム)',
        telephotoZoom: 5.0,
        hasTelephoto: true,
        batteryText: '5000mAh / 45W有線・Qi2ワイヤレス充電対応',
        gameText: 'AnTuTu公式GPU 138.4万点！Android最高峰のGPU性能＆大型ベイパーチャンバーで全3Dゲーム最高設定',
        waterproof: 'IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (画面内超音波) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約164.0 × 78.0 × 7.9 mm',
        weight: 214,
        otherText: 'Sペン内蔵 / チタニウムフレーム / 低反射ディスプレイ / 7年OS保証',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 5.0, camera: 5.0, telephoto: 5.0, battery: 5.0, cost: 3.5 },
        design: { style: 'galaxy-ultra', bodyColor: '#3f3f46', accentColor: '#a1a1aa', screenColor: '#18181b' }
      },
      {
        id: 'galaxy_s26_plus',
        maker: 'GALAXY',
        brand: 'Samsung',
        name: 'Galaxy S26+',
        tier: 'HighEnd',
        price: 179800,
        rom: [256, 512],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Snapdragon 8 Elite Gen 5 for Galaxy',
        antutuScore: 3465500,
        antutuGpuScore: 1230000,
        antutu: '3,465,500点 (CPU:112.5万 / GPU:123.0万 / MEM:46.6万 / UX:64.4万)',
        refreshRate: 120,
        brightness: 2600,
        displayText: '6.7 inch QHD+ Dynamic AMOLED 2X (LTPO 1〜120Hz可変)',
        cameraText: '50MP広角＋12MP超広角＋10MP光学3倍望遠',
        telephotoZoom: 3.0,
        hasTelephoto: true,
        batteryText: '4900mAh大容量バッテリー (連続動画再生 約31時間) / 45W急速充電',
        gameText: 'GPU 123.0万点＋6.7 inch大画面＋余裕の放熱設計で重量級3Dゲームも高fps維持',
        waterproof: 'IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (画面内超音波) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約158.0 × 76.0 × 7.3 mm',
        weight: 190,
        otherText: '6.7 inch大画面ながら厚さ7.3mm・約190gのスリム設計 / 7年OS保証',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 5.0, camera: 4.5, telephoto: 4.5, battery: 5.0, cost: 4.0 },
        design: { style: 'galaxy-s', bodyColor: '#1e40af', accentColor: '#60a5fa', screenColor: '#172554' }
      },
      {
        id: 'galaxy_s26',
        maker: 'GALAXY',
        brand: 'Samsung',
        name: 'Galaxy S26',
        tier: 'HighEnd',
        price: 155800,
        rom: [256, 512],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Snapdragon 8 Elite Gen 5 for Galaxy',
        antutuScore: 3182842,
        antutuGpuScore: 1100252,
        antutu: '3,182,842点 (CPU:110.6万 / GPU:110.0万 / MEM:46.8万 / UX:50.8万)',
        refreshRate: 120,
        brightness: 2600,
        displayText: '6.3 inch FHD+ Dynamic AMOLED 2X (LTPO 1〜120Hz可変)',
        cameraText: '50MP広角＋12MP超広角＋10MP光学3倍望遠（コンパクトでも専用光学3倍望遠搭載）',
        telephotoZoom: 3.0,
        hasTelephoto: true,
        batteryText: '4300mAhへ増量 / 25W有線＆Qi2ワイヤレス充電(最大25W)対応',
        gameText: 'GPU 110.0万点＆120Hz対応！約167gの小型筐体のため超長時間プレイ時の放熱はS26+/Ultraが優位（★4.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (画面内超音波) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約149.6 × 71.7 × 7.2 mm',
        weight: 167,
        otherText: '厚さ7.2mm・167gの超軽量コンパクトハイエンド / 7年OSアップデート保証',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 4.5, camera: 4.5, telephoto: 4.5, battery: 4.5, cost: 4.5 },
        design: { style: 'galaxy-s', bodyColor: '#2563eb', accentColor: '#93c5fd', screenColor: '#1e3a8a' }
      },
      {
        id: 'galaxy_a57',
        maker: 'GALAXY',
        brand: 'Samsung',
        name: 'Galaxy A57 5G',
        tier: 'Middle',
        price: 79800,
        rom: [128, 256],
        ram: 8,
        sdCard: '非対応',
        cpu: 'Exynos 1680',
        antutuScore: 1469769,
        antutuGpuScore: 397395,
        antutu: '1,469,769点 (CPU:53.9万 / GPU:39.7万 / MEM:25.2万 / UX:28.1万)',
        refreshRate: 120,
        brightness: 1900,
        displayText: '6.7 inch FHD+ Super AMOLED Plus 有機EL (120Hz駆動)',
        cameraText: '50MP光学手ブレ補正広角＋12MP超広角＋5MPマクロ',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '5000mAh大容量バッテリー / 最大45W急速充電対応',
        gameText: '総合146.9万点だがGPUは39.7万点（Exynos 1680）。中量級ゲームは快適、重い3Dゲームは中画質目安（★3.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (画面内) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約161.5 × 76.8 × 6.9 mm',
        weight: 179,
        otherText: '厚さ6.9mm・179gへ薄型軽量化した人気ミドル機 / 6世代OSアップデート保証',
        carriers: ['docomo', 'au', 'softbank', 'uq'],
        scores: { cpu: 4.0, game: 3.5, camera: 4.0, telephoto: 2.5, battery: 4.5, cost: 4.5 },
        design: { style: 'galaxy-s', bodyColor: '#a855f7', accentColor: '#d8b4fe', screenColor: '#3b0764' }
      },
      {
        id: 'galaxy_a25',
        maker: 'GALAXY',
        brand: 'Samsung',
        name: 'Galaxy A25 5G',
        tier: 'Entry',
        price: 29800,
        rom: [64],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1.5TB)',
        cpu: 'MediaTek Dimensity 6100+',
        antutuScore: 618450,
        antutuGpuScore: 45000,
        antutu: '618,450点 (CPU:23.8万 / GPU:4.5万 / MEM:17.8万 / UX:15.7万)',
        refreshRate: 60,
        brightness: 1000,
        displayText: '6.7 inch HD+ TFT液晶ディスプレイ (60Hz駆動)',
        cameraText: '50MP広角メイン＋2MPマクロ（日常記録・QR読取に十分）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '5000mAh大型バッテリー / 最大25W充電・連絡や動画視聴で2〜3日持続',
        gameText: 'GPU 4.5万点のため3Dゲームは非推奨。パズル・2Dカジュアルゲーム向け（★2.0）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約167.7 × 77.7 × 8.5 mm',
        weight: 195,
        otherText: 'かんたんモード搭載 / 通話自動録音 / リモート追跡対応',
        carriers: ['docomo', 'au', 'softbank', 'ymobile', 'uq'],
        scores: { cpu: 2.5, game: 2.0, camera: 3.0, telephoto: 1.5, battery: 5.0, cost: 5.0 },
        design: { style: 'entry-simple', bodyColor: '#0284c7', accentColor: '#7dd3fc', screenColor: '#0c4a6e' }
      },

      // ==========================================
      // 3. Pixel (5機種: 11ProFold, 11Pro XL, 11Pro, 11, 10a)
      // ==========================================
      {
        id: 'pixel_11_pro_fold',
        maker: 'Pixel',
        brand: 'Google',
        name: 'Pixel 11 Pro Fold',
        tier: 'Flagship',
        price: 279900,
        rom: [256, 512],
        ram: 16,
        sdCard: '非対応',
        cpu: 'Google Tensor G6',
        antutuScore: 1952100,
        antutuGpuScore: 624000,
        antutu: '1,952,100点 (CPU:61.5万 / GPU:62.4万 / MEM:32.8万 / UX:38.5万)',
        refreshRate: 120,
        brightness: 3600,
        displayText: '展開時 8.0 inch Super Actua Flex ＋ 外側 6.5 inch Actua (1〜120Hz / 3600nits)',
        cameraText: '48MP広角＋10.5MP超広角＋10.8MP光学5倍望遠 / リアカメラ自撮り対応',
        telephotoZoom: 5.0,
        hasTelephoto: true,
        batteryText: '大容量バッテリー / 省電力TSMC製Tensor G6で折りたたみでも長時間駆動',
        gameText: '【GPU注意】約28万円の横折り機だがTensor G6のGPUは約62.4万点（Snapdragon最上位の約半分）。重い3Dゲーム最高設定には不向き（★3.5）',
        waterproof: 'IP68 (完全防水防塵)',
        biometrics: '指紋認証 (側面電源ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '開:約155.2×150.4×5.0mm / 閉:約155.2×76.0×10.1mm',
        weight: 239,
        otherText: '折りたたみでありながらIP68完全防塵防水に対応 / 7年間OSアップデート保証',
        isFoldable: true,
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 4.5, game: 3.5, camera: 4.5, telephoto: 4.5, battery: 4.0, cost: 2.5 },
        design: { style: 'fold-book', bodyColor: '#44403c', accentColor: '#a8a29e', screenColor: '#1c1917' }
      },
      {
        id: 'pixel_11_pro_xl',
        maker: 'Pixel',
        brand: 'Google',
        name: 'Pixel 11 Pro XL',
        tier: 'Flagship',
        price: 207800,
        rom: [256, 512, 1024],
        ram: 16,
        sdCard: '非対応',
        cpu: 'Google Tensor G6',
        antutuScore: 2045800,
        antutuGpuScore: 661000,
        antutu: '2,045,800点 (CPU:64.2万 / GPU:66.1万 / MEM:34.2万 / UX:40.0万)',
        refreshRate: 120,
        brightness: 3600,
        displayText: '6.8 inch Super Actua LTPO OLED (1〜120Hz可変 / 業界最高峰3600nits)',
        cameraText: '50MP広角＋48MP超広角＋48MP光学5倍望遠（最大100倍超解像ズーム）',
        telephotoZoom: 5.0,
        hasTelephoto: true,
        batteryText: '5200mAh級大容量バッテリー＋45W急速充電対応',
        gameText: '【GPU注意】AI・普段使いは最高峰だがGPUは66.1万点。3Dゲームは遊べるがSnapdragon 8系(GPU 138万点)には明確に劣る（★4.0）',
        waterproof: 'IP68 (防水防塵)',
        biometrics: '指紋認証 (画面内超音波) ＋ 顔認証 (クラス3決済対応)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約162.7 × 76.5 × 8.5 mm',
        weight: 226,
        otherText: '7年間OSアップデート保証 / Gemini Nano統合AI機能搭載',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 4.5, game: 4.0, camera: 5.0, telephoto: 5.0, battery: 5.0, cost: 3.5 },
        design: { style: 'pixel-bar-pro', bodyColor: '#57534e', accentColor: '#d6d3d1', screenColor: '#1c1917' }
      },
      {
        id: 'pixel_11_pro',
        maker: 'Pixel',
        brand: 'Google',
        name: 'Pixel 11 Pro',
        tier: 'Flagship',
        price: 174800,
        rom: [256, 512, 1024],
        ram: 16,
        sdCard: '非対応',
        cpu: 'Google Tensor G6',
        antutuScore: 1986420,
        antutuGpuScore: 640000,
        antutu: '1,986,420点 (CPU:62.8万 / GPU:64.0万 / MEM:33.4万 / UX:38.4万)',
        refreshRate: 120,
        brightness: 3600,
        displayText: '6.3 inch Super Actua LTPO OLED (1〜120Hz可変 / ピーク3600nits)',
        cameraText: '50MP広角＋48MP超広角＋48MP光学5倍望遠（XLと同等の最高峰カメラを6.3 inchに凝縮）',
        telephotoZoom: 5.0,
        hasTelephoto: true,
        batteryText: '4800mAh級 / TSMC 3nm世代Tensor G6により電池持ちが向上',
        gameText: '【GPU注意】カメラ・AIは★5だがGPUは64.0万点。重い3Dゲームの長時間高fps維持よりも撮影・日常重視向け（★4.0）',
        waterproof: 'IP68 (防水防塵)',
        biometrics: '指紋認証 (画面内超音波) ＋ 顔認証 (クラス3決済対応)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約152.7 × 71.9 × 8.4 mm',
        weight: 204,
        otherText: '7年間OSアップデート保証 / 6.3 inchサイズにProカメラを凝縮',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 4.5, game: 4.0, camera: 5.0, telephoto: 5.0, battery: 4.5, cost: 4.0 },
        design: { style: 'pixel-bar-pro', bodyColor: '#d6d3d1', accentColor: '#78716c', screenColor: '#1c1917' }
      },
      {
        id: 'pixel_11',
        maker: 'Pixel',
        brand: 'Google',
        name: 'Pixel 11',
        tier: 'HighEnd',
        price: 136800,
        rom: [256, 512],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Google Tensor G6',
        antutuScore: 1933364,
        antutuGpuScore: 615000,
        antutu: '1,933,364点 (CPU:60.8万 / GPU:61.5万 / MEM:32.5万 / UX:38.5万)',
        refreshRate: 120,
        brightness: 3000,
        displayText: '6.3 inch Actua OLEDディスプレイ (60〜120Hz可変 / ピーク3000nits)',
        cameraText: '50MP広角＋12MP超広角＋10.8MP光学5倍望遠トリプルカメラ（無印でも専用光学5倍望遠を搭載！）',
        telephotoZoom: 5.0,
        hasTelephoto: true,
        batteryText: '4800mAh級 / 普段使いで1.5〜2日持つ高効率スタミナ',
        gameText: '【GPU注意】総合193万点だがGPUは61.5万点。重い3Dゲームは中〜高設定が目安（★3.5）',
        waterproof: 'IP68 (防水防塵)',
        biometrics: '指紋認証 (画面内超音波) ＋ 顔認証 (クラス3決済対応)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約152.8 × 72.0 × 8.6 mm',
        weight: 197,
        otherText: '7年間OSアップデート保証 / 無印モデルで光学5倍望遠＆最小256GB〜を実現',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 4.5, game: 3.5, camera: 4.5, telephoto: 4.5, battery: 4.5, cost: 4.5 },
        design: { style: 'pixel-bar-pro', bodyColor: '#10b981', accentColor: '#6ee7b7', screenColor: '#064e3b' }
      },
      {
        id: 'pixel_10a',
        maker: 'Pixel',
        brand: 'Google',
        name: 'Pixel 10a',
        tier: 'Middle',
        price: 84800,
        rom: [128, 256],
        ram: 8,
        sdCard: '非対応',
        cpu: 'Google Tensor G4 / G5系',
        antutuScore: 1422477,
        antutuGpuScore: 408000,
        antutu: '1,422,477点 (CPU:46.4万 / GPU:40.8万 / MEM:21.5万 / UX:33.6万)',
        refreshRate: 120,
        brightness: 2700,
        displayText: '6.3 inch Actua pOLEDディスプレイ (60〜120Hz / 屋外ピーク2700nits)',
        cameraText: '48MP広角(OIS)＋13MP超広角（ミドルクラス優秀のAIカメラ補正）',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '5100mAh大容量バッテリー搭載で丸2日安心',
        gameText: '総合142万点だがGPUは40.8万点。日常やパズル・中量級ゲームは快適だが、重い3Dゲームは中画質設定推奨（★3.5）',
        waterproof: 'IP68 (防水防塵)',
        biometrics: '指紋認証 (画面内) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約153.9 × 73.0 × 9.0 mm',
        weight: 183,
        otherText: '7年間OSアップデート保証 / カメラ突起のないフルフラット背面 / 183g軽量',
        carriers: ['docomo', 'au', 'softbank', 'ymobile', 'uq'],
        scores: { cpu: 4.0, game: 3.5, camera: 4.0, telephoto: 2.5, battery: 5.0, cost: 4.5 },
        design: { style: 'pixel-flat', bodyColor: '#3b82f6', accentColor: '#93c5fd', screenColor: '#1e3a8a' }
      },

      // ==========================================
      // 4. Xperia (2機種: 10VIII, 1VIII)
      // ==========================================
      {
        id: 'xperia_1_viii',
        maker: 'Xperia',
        brand: 'SONY',
        name: 'Xperia 1 VIII',
        tier: 'Flagship',
        price: 235400,
        rom: [256, 512, 1024],
        ram: 12,
        sdCard: '対応 (microSDXC 最大2TB / 工具不要トレイ)',
        cpu: 'Snapdragon 8 Elite Gen 5',
        antutuScore: 3685400,
        antutuGpuScore: 1352000,
        antutu: '3,685,400点 (CPU:113.5万 / GPU:135.2万 / MEM:50.1万 / UX:69.7万)',
        refreshRate: 120,
        brightness: 2400,
        displayText: '6.5 inch Powered by BRAVIA 有機EL (LTPO 1〜120Hz / サンライトビジョン)',
        cameraText: '48MP 2層トランジスタExmor T広角＋48MP超広角＋85-200mm連続光学ズーム望遠',
        telephotoZoom: 8.3,
        hasTelephoto: true,
        batteryText: '5000mAh＋省電力BRAVIA有機ELで連続動画再生36時間超の超スタミナ',
        gameText: 'GPU 135.2万点＋120Hz駆動＋HSパワーコントロール（直接給電で発熱抑制）搭載のガチゲーミング仕様（★5.0）',
        waterproof: 'IP65 / IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (側面電源ボタン一体型 ※顔認証なし)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約162.0 × 74.0 × 8.3 mm',
        weight: 200,
        otherText: '3.5mmイヤホンジャック搭載 / フルステージステレオスピーカー / 専用シャッターボタン',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 5.0, game: 5.0, camera: 5.0, telephoto: 5.0, battery: 5.0, cost: 3.0 },
        design: { style: 'xperia-pro', bodyColor: '#1e293b', accentColor: '#64748b', screenColor: '#020617' }
      },
      {
        id: 'xperia_10_viii',
        maker: 'Xperia',
        brand: 'SONY',
        name: 'Xperia 10 VIII',
        tier: 'Middle',
        price: 99000,
        rom: [128],
        ram: 8,
        sdCard: '対応 (microSDXC 最大2TB / 工具不要トレイ)',
        cpu: 'Snapdragon 6 Gen 3',
        antutuScore: 865400,
        antutuGpuScore: 138000,
        antutu: '865,400点 (CPU:34.1万 / GPU:13.8万 / MEM:18.5万 / UX:20.1万)',
        refreshRate: 120,
        brightness: 1500,
        displayText: '6.1 inch トリルミナスディスプレイ 有機EL (60/120Hz駆動)',
        cameraText: '50MP Exmorメインカメラ(光学2倍相当クロップ)＋8MP超広角',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '5000mAh搭載ながら約168gの軽量設計！2日間充電いらずの電池持ち',
        gameText: '120Hz有機EL対応でスクロールは滑らかだが、GPUは13.8万点＆約9.9万円のためゲームコスパは低め（★2.5）',
        waterproof: 'IP65 / IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (側面電源ボタン一体型 ※顔認証なし)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約153.0 × 72.0 × 8.3 mm',
        weight: 168,
        otherText: '168g軽量スリム / 3.5mmイヤホンジャック搭載 / フロントステレオスピーカー',
        carriers: ['docomo', 'au', 'softbank', 'uq'],
        scores: { cpu: 3.0, game: 2.5, camera: 3.5, telephoto: 2.5, battery: 5.0, cost: 3.0 },
        design: { style: 'xperia-mid', bodyColor: '#0ea5e9', accentColor: '#7dd3fc', screenColor: '#0c4a6e' }
      },

      // ==========================================
      // 5. AQUOS (4機種: R9Pro, R11, sense10, wish6)
      // ==========================================
      {
        id: 'aquos_r9_pro',
        maker: 'AQUOS',
        brand: 'SHARP',
        name: 'AQUOS R9 pro',
        tier: 'Flagship',
        price: 194700,
        rom: [512],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Snapdragon 8s Gen 3',
        antutuScore: 1890240,
        antutuGpuScore: 489025,
        antutu: '1,890,240点 (CPU:57.7万 / GPU:48.9万 / MEM:40.8万 / UX:41.7万)',
        refreshRate: 240,
        brightness: 2000,
        displayText: '6.7 inch QHD+ Pro IGZO OLED (1〜240Hz可変駆動 / Dolby Vision対応)',
        cameraText: 'ライカ監修 バリオ・ズミクロン 50.3MP×3眼（1インチ超大型センサー＋超広角＋光学2.8倍望遠）',
        telephotoZoom: 2.8,
        hasTelephoto: true,
        batteryText: '5000mAh＋1〜240Hz可変Pro IGZO OLED / ワイヤレス充電対応',
        gameText: '【GPU注意】約19.5万円のカメラ特化フラッグシップだが、SoCは8s Gen 3（GPU 48.9万点）のため3Dゲーム性能はミドルハイ級（★3.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (画面内3D超音波・2本指対応) ＋ 顔認証 (マスク対応)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約162.0 × 78.0 × 9.3 mm',
        weight: 229,
        otherText: '1インチを超える超大型センサー＆専用シャッターボタン搭載 / ベイパーチャンバー放熱',
        carriers: ['docomo', 'softbank'],
        scores: { cpu: 4.0, game: 3.5, camera: 5.0, telephoto: 4.5, battery: 4.5, cost: 3.0 },
        design: { style: 'xiaomi-ultra', bodyColor: '#0f172a', accentColor: '#94a3b8', screenColor: '#020617' }
      },
      {
        id: 'aquos_r11',
        maker: 'AQUOS',
        brand: 'SHARP',
        name: 'AQUOS R11',
        tier: 'HighEnd',
        price: 157344,
        rom: [256, 512],
        ram: 12,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 8s Gen 4',
        antutuScore: 2389941,
        antutuGpuScore: 788281,
        antutu: '2,389,941点 (CPU:70.9万 / GPU:78.8万 / MEM:42.7万 / UX:46.6万)',
        refreshRate: 240,
        brightness: 3000,
        displayText: '6.5 inch Pro IGZO OLED (1〜240Hz可変駆動 / ピーク輝度3000nits)',
        cameraText: 'ライカ監修 50.3MP標準(1/1.55型センサー・OIS)＋50.3MP超広角',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '5100mAh＋Pro IGZO OLEDでハイエンドトップ級の電池持ち',
        gameText: 'Snapdragon 8s Gen 4（GPU 78.8万点）＋最大240Hz Pro IGZOで音ゲーや3Dゲームも快適（★4.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X) / MIL-STD-810G耐衝撃',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証 (マスク対応)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約156.0 × 74.0 × 8.9 mm',
        weight: 195,
        otherText: 'MIL規格耐衝撃 / 大型スピーカーBOX搭載 / microSD対応',
        carriers: ['docomo', 'au', 'softbank'],
        scores: { cpu: 4.5, game: 4.5, camera: 4.5, telephoto: 2.5, battery: 5.0, cost: 4.0 },
        design: { style: 'aquos-r', bodyColor: '#16a34a', accentColor: '#86efac', screenColor: '#052e16' }
      },
      {
        id: 'aquos_sense10',
        maker: 'AQUOS',
        brand: 'SHARP',
        name: 'AQUOS sense10',
        tier: 'Middle',
        price: 62700,
        rom: [128, 256],
        ram: 8,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 7s Gen 3',
        antutuScore: 1041899,
        antutuGpuScore: 180000,
        antutu: '1,041,899点 (CPU:40.6万 / GPU:18.0万 / MEM:19.3万 / UX:26.3万)',
        refreshRate: 240,
        brightness: 2000,
        displayText: '6.1 inch Pro IGZO OLED (1〜120Hz / 最大240Hz駆動相当・2000nits)',
        cameraText: '50.3MP標準(1/1.55型・OIS光学手ブレ補正)＋50.3MP広角デュアルカメラ',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '5000mAh＋省電力IGZOでフル充電から2日間余裕のスタミナ',
        gameText: '【GPU注意】総合104万点・240Hz画面だが、GPU単体は18.0万点と控えめ。2D・パズルは快適だが重い3Dゲームには不向き（★3.0）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X) / MIL-STD-810H 16項目準拠',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証 (マスク対応)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約149.0 × 73.0 × 8.9 mm',
        weight: 166,
        otherText: '約166g軽量アルミボディ / ハンドソープ洗浄・アルコール除菌対応 / ステレオスピーカー',
        carriers: ['docomo', 'au', 'softbank', 'ymobile', 'uq'],
        scores: { cpu: 3.5, game: 3.0, camera: 4.0, telephoto: 2.5, battery: 5.0, cost: 5.0 },
        design: { style: 'aquos-r', bodyColor: '#0284c7', accentColor: '#38bdf8', screenColor: '#082f49' }
      },
      {
        id: 'aquos_wish6',
        maker: 'AQUOS',
        brand: 'SHARP',
        name: 'AQUOS wish6',
        tier: 'Entry',
        price: 36960,
        rom: [64, 128],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'MediaTek Dimensity 6300',
        antutuScore: 612500,
        antutuGpuScore: 44000,
        antutu: '612,500点 (CPU:23.5万 / GPU:4.4万 / MEM:17.5万 / UX:15.8万)',
        refreshRate: 90,
        brightness: 1000,
        displayText: '6.6 inch なめらかハイスピード液晶 (90Hz駆動 / アウトドアビュー対応)',
        cameraText: '50.1MPシングルカメラ（SHARP画質エンジンProPix lite搭載）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '5000mAh大型バッテリー / 連絡・ネット中心なら3日近く持続',
        gameText: 'GPU 4.4万点のため3Dゲーム非推奨。連絡・動画・パズルゲーム向け（★2.0）',
        waterproof: 'IP68 / IP69 (IPX5/IPX8/IPX9・IP6X) / MIL耐衝撃',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証 (マスク対応)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約165.0 × 76.0 × 8.3 mm',
        weight: 189,
        otherText: 'ハンドソープ丸洗い可・コンクリート落下耐衝撃 / ジュニアモード・かんたんモード対応',
        carriers: ['docomo', 'au', 'softbank', 'ymobile', 'uq'],
        scores: { cpu: 2.5, game: 2.0, camera: 3.0, telephoto: 1.5, battery: 5.0, cost: 5.0 },
        design: { style: 'entry-simple', bodyColor: '#64748b', accentColor: '#cbd5e1', screenColor: '#1e293b' }
      },

      // ==========================================
      // 6. arrows (2機種: we3, alpha2)
      // ==========================================
      {
        id: 'arrows_alpha2',
        maker: 'arrows',
        brand: 'FCNT',
        name: 'arrows Alpha 2',
        tier: 'HighEnd',
        price: 89800,
        rom: [256, 512],
        ram: 12,
        sdCard: '対応 (microSDXC 最大2TB)',
        cpu: 'MediaTek Dimensity 8350 Extreme',
        antutuScore: 1703845,
        antutuGpuScore: 488940,
        antutu: '1,703,845点 (CPU:46.6万 / GPU:48.9万 / MEM:38.6万 / UX:36.2万)',
        refreshRate: 144,
        brightness: 3000,
        displayText: '6.4 inch Super HD pOLED 有機EL (最大144Hz駆動 / ピーク3000nits)',
        cameraText: '50.3MP ソニーLYTIA大型センサー(OIS)＋49.9MP超広角',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '5000mAh / 90W超急速充電対応＆5年後も80%維持の長寿命電池',
        gameText: '総合170.3万点（GPU 48.9万点）＋144Hz画面。8万円台としては優秀だが、GPUはSnapdragon 8系(138万点)の約3分の1のため★4.0評価',
        waterproof: 'IP66 / IP68 / IP69 (IPX6/IPX8/IPX9・IP6X) / MIL耐衝撃',
        biometrics: '指紋認証 (側面Exliderボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約155.0 × 72.0 × 8.6 mm',
        weight: 187,
        otherText: 'Exliderスクロール＆自律神経活性度測定 / 泡ハンドソープ丸洗い・アルコール除菌対応',
        carriers: ['docomo', 'au'],
        scores: { cpu: 4.5, game: 4.0, camera: 4.0, telephoto: 2.5, battery: 4.5, cost: 5.0 },
        design: { style: 'oppo-oval', bodyColor: '#1e293b', accentColor: '#38bdf8', screenColor: '#0f172a' }
      },
      {
        id: 'arrows_we3',
        maker: 'arrows',
        brand: 'FCNT',
        name: 'arrows We3',
        tier: 'Entry',
        price: 39600,
        rom: [64, 128],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'MediaTek Dimensity 7025',
        antutuScore: 752453,
        antutuGpuScore: 59194,
        antutu: '752,453点 (CPU:28.5万 / GPU:5.9万 / MEM:20.4万 / UX:20.5万)',
        refreshRate: 90,
        brightness: 1000,
        displayText: '6.1 inch HD+ 液晶ディスプレイ (90Hz駆動 / ブルーライト低減)',
        cameraText: '50.1MP広角(OIS光学手ブレ補正)＋2MPマクロ',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '5000mAhへ増量 / 4年後でも劣化しにくいQnovo長寿命バッテリー',
        gameText: '総合75万点だがGPUは5.9万点。連絡・Web・動画視聴専用（3Dゲーム非推奨・★2.0）',
        waterproof: 'IP66 / IP68 / IP69 (IPX6/IPX8/IPX9・IP6X) / MIL耐衝撃',
        biometrics: '指紋認証 (側面Exliderボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約155.5 × 72.9 × 8.9 mm',
        weight: 189,
        otherText: '泡ハンドソープ丸洗い / アルコール除菌 / 迷惑電話対策・シンプルモード対応',
        carriers: ['docomo', 'au', 'softbank', 'ymobile', 'uq'],
        scores: { cpu: 2.5, game: 2.0, camera: 3.0, telephoto: 1.5, battery: 5.0, cost: 4.5 },
        design: { style: 'entry-simple', bodyColor: '#1d4ed8', accentColor: '#60a5fa', screenColor: '#172554' }
      },

      // ==========================================
      // 7. OPPO (3機種: Reno15A, Reno13A, A5)
      // ==========================================
      {
        id: 'oppo_reno15a',
        maker: 'OPPO',
        brand: 'OPPO',
        name: 'OPPO Reno15 A',
        tier: 'Middle',
        price: 64800,
        rom: [128, 256],
        ram: 8,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 6 Gen 1',
        antutuScore: 785200,
        antutuGpuScore: 112000,
        antutu: '785,200点 (CPU:29.8万 / GPU:11.2万 / MEM:18.5万 / UX:19.0万)',
        refreshRate: 120,
        brightness: 2100,
        displayText: '6.6 inch FHD+ 有機EL AMOLED (120Hz駆動 / スプラッシュタッチ対応)',
        cameraText: '50MP OIS広角＋8MP超広角＋2MPマクロ（AI消しゴム2.0・AI反射除去）',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '7000mAh超大容量バッテリー搭載！ / 45W SUPERVOOC急速充電',
        gameText: '120Hz有機ELで普段使いは快適だが、SoCはSnapdragon 6 Gen 1（GPU 11.2万点）のため重い3Dゲームには不向き（★2.5）',
        waterproof: 'IP68 / IP69 (高温高圧水・完全防水防塵)',
        biometrics: '指紋認証 (画面内) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約158.0 × 75.0 × 8.1 mm',
        weight: 195,
        otherText: '厚さ8.1mm・195gに7,000mAhモンスターバッテリーを収めた超スタミナミドル機',
        carriers: ['ymobile', 'uq', 'softbank'],
        scores: { cpu: 3.0, game: 2.5, camera: 4.0, telephoto: 2.5, battery: 5.0, cost: 4.5 },
        design: { style: 'oppo-oval', bodyColor: '#0d9488', accentColor: '#5eead4', screenColor: '#042f2e' }
      },
      {
        id: 'oppo_reno13a',
        maker: 'OPPO',
        brand: 'OPPO',
        name: 'OPPO Reno13 A',
        tier: 'Middle',
        price: 48800,
        rom: [128],
        ram: 8,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 6 Gen 1',
        antutuScore: 768400,
        antutuGpuScore: 108000,
        antutu: '768,400点 (CPU:29.1万 / GPU:10.8万 / MEM:18.0万 / UX:18.9万)',
        refreshRate: 120,
        brightness: 1200,
        displayText: '6.7 inch FHD+ 有機EL AMOLED (120Hz駆動 / 10億色表示)',
        cameraText: '64MPメイン＋8MP超広角＋2MPマクロ',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '5000mAh / 67W SUPERVOOC急速充電（約44分でフル充電）',
        gameText: 'RAM 8GB・120Hz画面だがGPUは10.8万点。2Dゲームや日常使い向き（★2.0）',
        waterproof: 'IP65 (防水・防塵)',
        biometrics: '指紋認証 (画面内) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約162.0 × 75.0 × 7.6 mm',
        weight: 177,
        otherText: '177g軽量スリムボディ / 67W超急速充電対応の高コスパ旧世代ミドル',
        carriers: ['ymobile', 'uq'],
        scores: { cpu: 3.0, game: 2.0, camera: 3.5, telephoto: 1.5, battery: 4.5, cost: 5.0 },
        design: { style: 'oppo-oval', bodyColor: '#0284c7', accentColor: '#7dd3fc', screenColor: '#082f49' }
      },
      {
        id: 'oppo_a5',
        maker: 'OPPO',
        brand: 'OPPO',
        name: 'OPPO A5 5G',
        tier: 'Entry',
        price: 32800,
        rom: [128],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'MediaTek Dimensity 6300',
        antutuScore: 608200,
        antutuGpuScore: 43000,
        antutu: '608,200点 (CPU:23.4万 / GPU:4.3万 / MEM:17.3万 / UX:15.8万)',
        refreshRate: 90,
        brightness: 1000,
        displayText: '6.67 inch HD+ 高輝度液晶ディスプレイ (90Hz駆動 / 最大1000nits)',
        cameraText: '50MPメインカメラ＋2MP深度センサー',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '5100mAh大容量バッテリー / 45W急速充電対応',
        gameText: 'GPU 4.3万点。動画視聴やSNS、サブ機に最適（3Dゲーム非推奨・★2.0）',
        waterproof: 'IP54 (生活防滴・防塵) / MIL規格耐衝撃',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約166.0 × 76.0 × 8.0 mm',
        weight: 194,
        otherText: '360度アーマーボディ耐衝撃設計 / 3.5mmイヤホンジャック搭載',
        carriers: ['au', 'ymobile', 'uq'],
        scores: { cpu: 2.5, game: 2.0, camera: 2.5, telephoto: 1.5, battery: 4.5, cost: 5.0 },
        design: { style: 'entry-simple', bodyColor: '#4f46e5', accentColor: '#a5b4fc', screenColor: '#1e1b4b' }
      },

      // ==========================================
      // 8. motorola (5機種: razr60Ultra, razr60d, edge60, motog37, FindX9)
      // ※motorola razr 60 と razr 60 Ultra は確実に折りたたみスマホ（isFoldable: true）扱い
      // ==========================================
      {
        id: 'motorola_razr60_ultra',
        maker: 'motorola',
        brand: 'Motorola',
        name: 'motorola razr 60 ultra',
        tier: 'Flagship',
        price: 199800,
        rom: [512],
        ram: 16,
        sdCard: '非対応',
        cpu: 'Snapdragon 8 Elite',
        antutuScore: 3128863,
        antutuGpuScore: 1150805,
        antutu: '3,128,863点 (CPU:91.0万 / GPU:115.1万 / MEM:43.9万 / UX:62.9万)',
        refreshRate: 165,
        brightness: 4500,
        displayText: 'メイン 7.0 inch (4500nits) ＋ 外画面 4.0 inch LTPO AMOLED (両方最大165Hz駆動)',
        cameraText: '50MP広角(OIS)＋50MP超広角/マクロ＋50MPインカメラ / 4.0 inch外画面でメインカメラ自撮り',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '4700mAh大容量バッテリー / 68W TurboPower急速充電＆15Wワイヤレス充電',
        gameText: 'GPU 115.1万点＆165Hz駆動＆RAM 16GB搭載！ただし縦折りクラムシェル構造のため長時間高負荷ゲーム時は発熱制御あり（★4.0）',
        waterproof: 'IP48 (IPX8防水 / IP4X防塵)',
        biometrics: '指紋認証 (側面電源ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '開:約171.5×74.0×7.19mm / 閉:約88.1×74.0×15.69mm',
        weight: 199,
        otherText: '【縦折り折りたたみスマホ】7.0 inchメイン＋4.0 inchフルカバー画面 / PANTONE認証デザイン',
        isFoldable: true,
        carriers: ['au', 'softbank'],
        scores: { cpu: 5.0, game: 4.0, camera: 4.5, telephoto: 2.5, battery: 4.5, cost: 3.5 },
        design: { style: 'flip-clamshell', bodyColor: '#be123c', accentColor: '#fda4af', screenColor: '#4c0519' }
      },
      {
        id: 'motorola_razr60d',
        maker: 'motorola',
        brand: 'Motorola',
        name: 'motorola razr 60 (razr 60d)',
        tier: 'HighEnd',
        price: 116952,
        rom: [256, 512],
        ram: 8,
        sdCard: '非対応',
        cpu: 'MediaTek Dimensity 7400X',
        antutuScore: 1002209,
        antutuGpuScore: 114990,
        antutu: '1,002,209点 (CPU:38.2万 / GPU:11.5万 / MEM:24.0万 / UX:26.6万)',
        refreshRate: 120,
        brightness: 3000,
        displayText: 'メイン 6.9 inch pOLED (120Hz) ＋ カバー 3.6 inch pOLED (90Hz / 3000nits)',
        cameraText: '50MP広角(OIS)＋13MP超広角/マクロ / 閉じたまま外画面で自撮り・アプリ操作可',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '4500mAhバッテリー / 30W急速充電＋15Wワイヤレス充電対応',
        gameText: '【GPU注意】約11.7万円の縦折りスマホだが、GPU単体は11.5万点とエントリー寄り。3Dゲームには不向きなデザイン・携帯性重視の折りたたみ機（★2.5）',
        waterproof: 'IP48 (IPX8防水 / IP4X防塵)',
        biometrics: '指紋認証 (側面電源ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '開:約171.3×74.0×7.25mm / 閉:約88.1×74.0×15.85mm',
        weight: 188,
        otherText: '【縦折り折りたたみスマホ】3.6 inch大型アウト画面 / 188g軽量クラムシェル (docomo版はrazr 60d)',
        isFoldable: true,
        carriers: ['docomo', 'softbank'],
        scores: { cpu: 3.5, game: 2.5, camera: 3.5, telephoto: 2.5, battery: 4.0, cost: 4.0 },
        design: { style: 'flip-clamshell', bodyColor: '#0369a1', accentColor: '#7dd3fc', screenColor: '#082f49' }
      },
      {
        id: 'motorola_edge60',
        maker: 'motorola',
        brand: 'Motorola',
        name: 'motorola edge 60',
        tier: 'Middle',
        price: 74800,
        rom: [256],
        ram: 12,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'MediaTek Dimensity 7400',
        antutuScore: 1025600,
        antutuGpuScore: 145000,
        antutu: '1,025,600点 (CPU:39.2万 / GPU:14.5万 / MEM:22.4万 / UX:26.5万)',
        refreshRate: 120,
        brightness: 4500,
        displayText: '6.7 inch Super HD pOLED 有機EL (120Hz駆動 / ピーク4500nits)',
        cameraText: '50MP広角(LYTIA 700C・OIS)＋50MP超広角＋10MP光学3倍望遠',
        telephotoZoom: 3.0,
        hasTelephoto: true,
        batteryText: '5200mAh大容量バッテリー / 68W TurboPower急速充電対応',
        gameText: '【GPU注意】RAM 12GBだがGPUは14.5万点（Dimensity 7400）。日常や光学3倍撮影は最高だが重い3Dゲームには不向き（★2.5）',
        waterproof: 'IP68 / IP69 (高温高圧水・完全防水防塵) / MIL耐衝撃',
        biometrics: '指紋認証 (画面内) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約161.0 × 73.0 × 8.0 mm',
        weight: 179,
        otherText: '7万円台で専用光学3倍望遠カメラ＆microSD対応＆179g軽量を実現した高コスパ機',
        carriers: ['softbank', 'ymobile'],
        scores: { cpu: 3.5, game: 2.5, camera: 4.5, telephoto: 4.0, battery: 4.5, cost: 5.0 },
        design: { style: 'oppo-oval', bodyColor: '#6d28d9', accentColor: '#c4b5fd', screenColor: '#2e1065' }
      },
      {
        id: 'motorola_motog37',
        maker: 'motorola',
        brand: 'Motorola',
        name: 'moto g37',
        tier: 'Entry',
        price: 27800,
        rom: [128],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 6s Gen 3',
        antutuScore: 742800,
        antutuGpuScore: 58000,
        antutu: '742,800点 (CPU:28.8万 / GPU:5.8万 / MEM:19.8万 / UX:19.9万)',
        refreshRate: 120,
        brightness: 1000,
        displayText: '6.5 inch FHD+ 液晶ディスプレイ (120Hz高速駆動 / 最大1000nits)',
        cameraText: '50MPクアッドピクセルカメラ＋2MPマクロ',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '5000mAh大容量バッテリー / 2日間しっかり使えるスタミナ',
        gameText: '120Hz画面だがGPUは5.8万点。動画視聴・連絡用（3Dゲーム非推奨・★2.0）',
        waterproof: 'IP52 (撥水設計)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約166.2 × 76.5 × 7.85 mm',
        weight: 194,
        otherText: 'Dolby Atmosステレオスピーカー / 3.5mmイヤホンジャック搭載',
        carriers: ['ymobile', 'uq'],
        scores: { cpu: 2.5, game: 2.0, camera: 2.5, telephoto: 1.5, battery: 4.5, cost: 5.0 },
        design: { style: 'entry-simple', bodyColor: '#0f766e', accentColor: '#5eead4', screenColor: '#042f2e' }
      },
      {
        id: 'find_x9',
        maker: 'motorola',
        brand: 'OPPO',
        name: 'OPPO Find X9',
        tier: 'Flagship',
        price: 149800,
        rom: [512],
        ram: 16,
        sdCard: '非対応',
        cpu: 'MediaTek Dimensity 9500',
        antutuScore: 3434499,
        antutuGpuScore: 1211961,
        antutu: '3,434,499点 (CPU:110.6万 / GPU:121.2万 / MEM:46.1万 / UX:65.5万)',
        refreshRate: 120,
        brightness: 4500,
        displayText: '6.59 inch 1.5K LTPO AMOLED (1〜120Hz可変 / HDRピーク4500nits)',
        cameraText: 'ハッセルブラッド共同開発 50MP広角＋50MP超広角＋50MP光学3倍ペリスコープ望遠',
        telephotoZoom: 3.0,
        hasTelephoto: true,
        batteryText: '7000mAh超大容量シリコンカーボン電池 / 80W急速＋50Wワイヤレス充電',
        gameText: 'AnTuTu公式GPU 121.2万点（Dimensity 9500）＋16GB RAM搭載で3Dゲームも最高画質で快適（★5.0）',
        waterproof: 'IP68 / IP69 (高温高圧水・完全防水防塵)',
        biometrics: '指紋認証 (画面内) ＋ 顔認証',
        felica: '対応 (Findシリーズ初のおサイフケータイ対応)',
        dimensions: '約157.0 × 74.0 × 7.9 mm',
        weight: 193,
        otherText: '149,800円で7000mAh電池・ハッセルブラッド3眼・FeliCa・最高峰SoCを全載せした超コスパフラッグシップ',
        carriers: ['au', 'softbank'],
        scores: { cpu: 5.0, game: 5.0, camera: 5.0, telephoto: 4.5, battery: 5.0, cost: 5.0 },
        design: { style: 'xiaomi-ultra', bodyColor: '#1e293b', accentColor: '#cbd5e1', screenColor: '#09090b' }
      },

      // ==========================================
      // 9. nubia (4機種: Fold, Flip3, S2, S2e)
      // ==========================================
      {
        id: 'nubia_fold',
        maker: 'nubia',
        brand: 'ZTE (nubia)',
        name: 'nubia Fold',
        tier: 'HighEnd',
        price: 139800,
        rom: [256],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Snapdragon 8 Elite',
        antutuScore: 3120620,
        antutuGpuScore: 1095000,
        antutu: '3,120,620点 (CPU:97.2万 / GPU:109.5万 / MEM:46.2万 / UX:59.1万)',
        refreshRate: 120,
        brightness: 2500,
        displayText: '展開時 8.0 inch ＋ カバー 6.5 inch 有機EL AMOLED (120Hz駆動)',
        cameraText: '50MP広角(OIS)＋50MP超広角＋50MP光学望遠',
        telephotoZoom: 3.0,
        hasTelephoto: true,
        batteryText: '6560mAh超大容量バッテリー / 55W急速充電対応',
        gameText: 'Snapdragon 8 Elite（GPU 109.5万点）＆AIゲーミングスペース搭載の8.0 inch横折り機（★4.5）',
        waterproof: 'IPX4 / IP4X (生活防滴・防塵)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '開:約160.0×144.0×5.4mm / 閉:約160.0×73.0×11.1mm',
        weight: 249,
        otherText: '【横折り折りたたみスマホ】13万円台でSnapdragon 8 Elite＆6560mAh電池を搭載した高コスパFold',
        isFoldable: true,
        carriers: ['ymobile'],
        scores: { cpu: 5.0, game: 4.5, camera: 4.0, telephoto: 4.0, battery: 5.0, cost: 4.5 },
        design: { style: 'fold-book', bodyColor: '#27272a', accentColor: '#ef4444', screenColor: '#09090b' }
      },
      {
        id: 'nubia_flip3',
        maker: 'nubia',
        brand: 'ZTE (nubia)',
        name: 'nubia Flip 3',
        tier: 'Middle',
        price: 69800,
        rom: [128, 256],
        ram: 8,
        sdCard: '非対応',
        cpu: 'MediaTek Dimensity 7300X',
        antutuScore: 884500,
        antutuGpuScore: 132000,
        antutu: '884,500点 (CPU:33.1万 / GPU:13.2万 / MEM:20.1万 / UX:22.0万)',
        refreshRate: 120,
        brightness: 1600,
        displayText: 'メイン 6.9 inch 有機EL (120Hz) ＋ カバー 3.0 inch サブディスプレイ',
        cameraText: '50MPメイン＋2MP深度 / 大型サブ画面でスタンド不要の自撮り撮影',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '4310mAh / 33W急速充電対応',
        gameText: '【GPU注意】6万円台の縦折りスマホだがGPUは13.2万点。重い3Dゲームには不向きで普段使い・ファッション重視（★2.5）',
        waterproof: 'IPX4 / IP4X (生活防滴・防塵)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '開:約170.0×76.0×7.5mm / 閉:約87.0×76.0×15.9mm',
        weight: 187,
        otherText: '【縦折り折りたたみスマホ】3.0 inch長方形カバー画面 / 187g軽量＆6万円台のエントリー折りたたみ',
        isFoldable: true,
        carriers: ['ymobile'],
        scores: { cpu: 3.5, game: 2.5, camera: 3.5, telephoto: 1.5, battery: 4.0, cost: 4.5 },
        design: { style: 'flip-clamshell', bodyColor: '#ec4899', accentColor: '#fbcfe8', screenColor: '#500724' }
      },
      {
        id: 'nubia_s2',
        maker: 'nubia',
        brand: 'ZTE (nubia)',
        name: 'nubia S2',
        tier: 'Entry',
        price: 21888,
        rom: [128],
        ram: 6,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 6 Gen 3',
        antutuScore: 846011,
        antutuGpuScore: 99832,
        antutu: '846,011点 (CPU:32.7万 / GPU:10.0万 / MEM:19.4万 / UX:22.5万)',
        refreshRate: 120,
        brightness: 1000,
        displayText: '6.7 inch FHD+ 大画面液晶ディスプレイ (120Hz駆動)',
        cameraText: '50MPトリプルカメラ（広角＋マクロ＋深度）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '5000mAh / 33W急速充電で丸2日しっかり使える',
        gameText: '総合84.6万点だがGPUは10.0万点。6.7 inch 120Hz画面で動画や2Dパズルゲーム向き（★2.5）',
        waterproof: 'IP65 / IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約167.0 × 77.0 × 8.0 mm',
        weight: 189,
        otherText: '約2.2万円の超低価格でFHD+ 120Hz大画面＆おサイフ＆IP68防水を完備 / スマートスタートボタン',
        carriers: ['ymobile'],
        scores: { cpu: 3.0, game: 2.5, camera: 3.0, telephoto: 1.5, battery: 4.5, cost: 5.0 },
        design: { style: 'oppo-oval', bodyColor: '#0f766e', accentColor: '#99f6e4', screenColor: '#042f2e' }
      },
      {
        id: 'nubia_s2e',
        maker: 'nubia',
        brand: 'ZTE (nubia)',
        name: 'nubia S2e',
        tier: 'Entry',
        price: 21818,
        rom: [64],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Unisoc T760 5G',
        antutuScore: 588455,
        antutuGpuScore: 43198,
        antutu: '588,455点 (CPU:23.1万 / GPU:4.3万 / MEM:16.5万 / UX:14.9万)',
        refreshRate: 90,
        brightness: 800,
        displayText: '6.7 inch HD+ 液晶ディスプレイ (90Hz駆動)',
        cameraText: '50MPメインカメラ（日常のスナップ・記録用）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '5000mAhバッテリー搭載で待受・通話中心なら3日持続',
        gameText: 'GPU 4.3万点。LINE・通話・Web検索・YouTube視聴向け（★1.5）',
        waterproof: 'IP65 / IP68 (IPX5/IPX8・IP6X)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約167.0 × 77.0 × 8.2 mm',
        weight: 194,
        otherText: '2万円台の超低価格エントリー / 防犯ブザー機能・シンプルモード搭載',
        carriers: ['ymobile'],
        scores: { cpu: 2.0, game: 1.5, camera: 2.5, telephoto: 1.5, battery: 4.5, cost: 5.0 },
        design: { style: 'entry-simple', bodyColor: '#475569', accentColor: '#cbd5e1', screenColor: '#1e293b' }
      },

      // ==========================================
      // 10. その他 (4機種: Natural AI Phone, DIGNO BX3, TORQUE G07, Redmi 15)
      // ==========================================
      {
        id: 'natural_ai_phone',
        maker: 'その他',
        brand: 'Natural AI (SoftBank)',
        name: 'Natural AI Phone',
        tier: 'Middle',
        price: 93600,
        rom: [256],
        ram: 12,
        sdCard: '非対応',
        cpu: 'Snapdragon 7 Gen 3系 (AI特化NPU)',
        antutuScore: 1185300,
        antutuGpuScore: 262000,
        antutu: '1,185,300点 (CPU:41.8万 / GPU:26.2万 / MEM:24.5万 / UX:26.0万)',
        refreshRate: 120,
        brightness: 2000,
        displayText: '6.7 inch FHD+ 有機EL AMOLED (120Hz駆動 / 2000nits)',
        cameraText: '50MP広角(OIS)＋8MP超広角 / AI自動構図・音声認識シャッター搭載',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '5000mAh大容量バッテリー / 50W急速充電（約78分で満充電）',
        gameText: '総合118.5万点（GPU 26.2万点）。自律型AIアシスタント特化機であり、3Dゲームは中画質までが目安（★3.0）',
        waterproof: 'IP68 (防水防塵)',
        biometrics: '指紋認証 (画面内) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約164.0 × 78.0 × 8.3 mm',
        weight: 200,
        otherText: 'ソフトバンク独占AIスマホ / 追加料金なしで使える統合型Natural AI搭載',
        carriers: ['softbank'],
        scores: { cpu: 3.5, game: 3.0, camera: 3.5, telephoto: 2.5, battery: 4.5, cost: 4.0 },
        design: { style: 'pixel-flat', bodyColor: '#059669', accentColor: '#6ee7b7', screenColor: '#064e3b' }
      },
      {
        id: 'digno_bx3',
        maker: 'その他',
        brand: '京セラ (KYOCERA)',
        name: 'DIGNO BX3',
        tier: 'Entry',
        price: 42800,
        rom: [64],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'MediaTek Dimensity 6100+',
        antutuScore: 615400,
        antutuGpuScore: 45000,
        antutu: '615,400点 (CPU:23.5万 / GPU:4.5万 / MEM:17.2万 / UX:16.3万)',
        refreshRate: 60,
        brightness: 900,
        displayText: '5.8 inch HD+ 高耐久TFT液晶 (60Hz / グローブタッチ・ウェットタッチ対応)',
        cameraText: '8MPシングルカメラ（書類スキャン・現場記録・QRコード高速読取）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '4000mAh / ビジネス・現場利用で2日間使える高耐久バッテリー',
        gameText: 'GPU 4.5万点＆60Hz液晶。業務連絡・通話・Web専用（ゲーム非推奨・★1.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X) / MIL-STD-810H 20項目準拠',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '非対応 (NFCのみ搭載 ※法人向けモデル)',
        dimensions: '約157.0 × 72.0 × 10.9 mm',
        weight: 180,
        otherText: '京セラ国内一貫設計 / 泡ハンドソープ・アルコール除菌耐性 / 通話後録音・ダイレクトボタン搭載',
        carriers: ['softbank', 'ymobile'],
        scores: { cpu: 2.5, game: 1.5, camera: 2.0, telephoto: 1.5, battery: 4.5, cost: 4.0 },
        design: { style: 'rugged-tough', bodyColor: '#1e293b', accentColor: '#64748b', screenColor: '#0f172a' }
      },
      {
        id: 'torque_g07',
        maker: 'その他',
        brand: '京セラ (KYOCERA)',
        name: 'TORQUE G07',
        tier: 'HighEnd',
        price: 108000,
        rom: [128],
        ram: 8,
        sdCard: '対応 (microSDXC 最大2TB)',
        cpu: 'Snapdragon 7 Gen 4',
        antutuScore: 1434455,
        antutuGpuScore: 330304,
        antutu: '1,434,455点 (CPU:50.1万 / GPU:33.0万 / MEM:27.9万 / UX:32.4万)',
        refreshRate: 120,
        brightness: 2000,
        displayText: '5.4 inch FHD+ 高輝度有機EL OLED (120Hz駆動 / 屋外高視認)',
        cameraText: '50MP広角＋50MP超広角(アクションオーバーレイ対応)＋5MPマクロ',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '着脱式4585mAhバッテリー（予備電池交換に対応！）/ Qiワイヤレス充電対応',
        gameText: '【GPU注意】価格は約10.8万円だがタフネス特化機のためGPUは33.0万点。ゲーム目的ではなく登山・現場・アウトドア特化（★3.5）',
        waterproof: 'IP68 / IP69 (IPX5/IPX8/IPX9・IP6X) / MIL-STD-810H耐衝撃',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約157.0 × 75.0 × 14.6 mm',
        weight: 243,
        otherText: '電池パック取り外し交換対応 / 海水・温水耐性・2m落下耐衝撃 / ストラップホール搭載',
        carriers: ['au'],
        scores: { cpu: 4.0, game: 3.5, camera: 4.0, telephoto: 2.5, battery: 4.5, cost: 4.0 },
        design: { style: 'rugged-tough', bodyColor: '#dc2626', accentColor: '#18181b', screenColor: '#09090b' }
      },
      {
        id: 'redmi_15',
        maker: 'その他',
        brand: 'Xiaomi (シャオミ)',
        name: 'Redmi 15 5G',
        tier: 'Entry',
        price: 31980,
        rom: [128, 256],
        ram: 8,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 6s Gen 4',
        antutuScore: 860688,
        antutuGpuScore: 82250,
        antutu: '860,688点 (CPU:35.3万 / GPU:8.2万 / MEM:20.6万 / UX:21.9万)',
        refreshRate: 120,
        brightness: 1200,
        displayText: '6.79 inch FHD+ 大画面液晶ディスプレイ (120Hz AdaptiveSync駆動)',
        cameraText: '108MP超高画素メインカメラ（3倍ロスレスインセンサーズーム対応）',
        telephotoZoom: 2.0,
        hasTelephoto: false,
        batteryText: '5160mAh超大容量バッテリー / 33W急速充電',
        gameText: '総合86万点・RAM 8GBだがGPUは8.2万点。パズル・2Dゲームは快適だが重い3Dゲームには不向き（★2.5）',
        waterproof: 'IP54 (生活防滴・防塵)',
        biometrics: '指紋認証 (側面ボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約169.5 × 80.5 × 8.4 mm',
        weight: 217,
        otherText: 'ガラス背面デザイン / 6.79 inch特大画面 / 3.5mmイヤホンジャック搭載',
        carriers: ['au', 'softbank', 'uq'],
        scores: { cpu: 3.0, game: 2.5, camera: 3.5, telephoto: 2.5, battery: 5.0, cost: 5.0 },
        design: { style: 'iphone-dual', bodyColor: '#0284c7', accentColor: '#7dd3fc', screenColor: '#0c4a6e' }
      },

      // ==========================================
      // 11. シニアスマホ (5機種: BASIO active3, らくらくスマートフォン(docomo), Lite(au), a(Y!mobile), シンプルスマホ7)
      // ==========================================
      {
        id: 'basio_active3',
        maker: 'シニアスマホ',
        brand: 'SHARP',
        name: 'BASIO active3',
        tier: 'Entry',
        price: 44800,
        rom: [64],
        ram: 4,
        sdCard: '対応 (microSDXC 最大2TB)',
        cpu: 'MediaTek Dimensity 6300',
        antutuScore: 618200,
        antutuGpuScore: 45000,
        antutu: '618,200点 (CPU:23.6万 / GPU:4.5万 / MEM:17.3万 / UX:16.4万)',
        refreshRate: 60,
        brightness: 1000,
        displayText: '6.1 inch HD+ 見やすい高コントラスト液晶 (60Hz / 大きな文字表示)',
        cameraText: '50.3MPキレイなカメラ（シャッター音が分かりやすく手ブレに強い）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '4500mAh / 3日間安心の省電力設計',
        gameText: '電話・メール・LINE・写真撮影に特化（シニア向け大きな文字UI・★1.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X) / MIL規格耐衝撃',
        biometrics: '指紋認証 ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約162.0 × 73.0 × 9.3 mm',
        weight: 188,
        otherText: '光る大型「電話」「メール」専用物理ボタン / 迷惑電話対策 / 泡ハンドソープ洗い対応',
        carriers: ['au', 'uq'],
        scores: { cpu: 2.5, game: 1.5, camera: 3.0, telephoto: 1.5, battery: 5.0, cost: 4.5 },
        isSenior: true,
        design: { style: 'senior-phone', bodyColor: '#1e3a8a', accentColor: '#93c5fd', screenColor: '#0f172a' }
      },
      {
        id: 'rakuraku_docomo',
        maker: 'シニアスマホ',
        brand: 'FCNT',
        name: 'らくらくスマートフォン F-53E (docomo)',
        tier: 'Entry',
        price: 51480,
        rom: [128],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 6 Gen 3',
        antutuScore: 845000,
        antutuGpuScore: 98000,
        antutu: '845,000点 (CPU:32.5万 / GPU:9.8万 / MEM:19.8万 / UX:22.4万)',
        refreshRate: 90,
        brightness: 1300,
        displayText: '5.4 inch FHD+ 高精細有機ELディスプレイ (90Hz / らくらくタッチパネル)',
        cameraText: '50.3MP広角(OIS光学手ブレ補正)＋8MP超広角（花や孫の笑顔をくっきり撮影）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '4000mAh / 長寿命バッテリー＆卓上ホルダ充電対応',
        gameText: '押し間違いを防ぐ「らくらくタッチパネル」搭載 / 連絡・健康管理向け（★1.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X) / MIL規格23項目準拠',
        biometrics: '指紋認証 (物理ホームボタン) ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約151.0 × 71.0 × 9.3 mm',
        weight: 173,
        otherText: '自律神経測定センサー / 迷惑電話対策 / 泡ハンドソープ丸洗い / 128GB大容量ROM',
        carriers: ['docomo'],
        scores: { cpu: 3.0, game: 1.5, camera: 3.5, telephoto: 1.5, battery: 4.5, cost: 4.0 },
        isSenior: true,
        design: { style: 'senior-phone', bodyColor: '#be185d', accentColor: '#f472b6', screenColor: '#4c0519' }
      },
      {
        id: 'rakuraku_lite_au',
        maker: 'シニアスマホ',
        brand: 'FCNT',
        name: 'らくらくスマートフォン Lite MR01 (au/UQ)',
        tier: 'Entry',
        price: 47520,
        rom: [64],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'MediaTek Dimensity 7025',
        antutuScore: 752415,
        antutuGpuScore: 58235,
        antutu: '752,415点 (CPU:28.4万 / GPU:5.8万 / MEM:20.6万 / UX:20.4万)',
        refreshRate: 90,
        brightness: 1000,
        displayText: '6.1 inch HD+ 大画面液晶ディスプレイ (90Hz駆動 / 屋外くっきり表示)',
        cameraText: '50.1MP高精細カメラ（光学手ブレ補正対応でブレずに綺麗）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '4500mAh / 電池劣化を抑える長寿命充電機能',
        gameText: '6.1 inch見やすい大画面＋標準スマホUIにも切り替え可能なハイブリッド設計（★1.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X) / MIL-STD-810H準拠',
        biometrics: '指紋認証 ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約162.0 × 73.0 × 9.0 mm',
        weight: 185,
        otherText: '物理ホームボタン搭載 / 迷惑電話対策 / 泡ハンドソープ丸洗い・アルコール除菌対応',
        carriers: ['au', 'uq'],
        scores: { cpu: 2.5, game: 1.5, camera: 3.0, telephoto: 1.5, battery: 5.0, cost: 4.5 },
        isSenior: true,
        design: { style: 'senior-phone', bodyColor: '#9f1239', accentColor: '#fda4af', screenColor: '#4c0519' }
      },
      {
        id: 'rakuraku_a_ymobile',
        maker: 'シニアスマホ',
        brand: 'FCNT',
        name: 'らくらくスマートフォン a (Y!mobile)',
        tier: 'Entry',
        price: 31680,
        rom: [64],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'MediaTek Dimensity 7025',
        antutuScore: 752415,
        antutuGpuScore: 58235,
        antutu: '752,415点 (CPU:28.4万 / GPU:5.8万 / MEM:20.6万 / UX:20.4万)',
        refreshRate: 90,
        brightness: 1000,
        displayText: '6.1 inch HD+ 大画面液晶ディスプレイ (90Hz駆動 / 屋外くっきり表示)',
        cameraText: '50.1MPメインカメラ（光学手ブレ補正・かんたん操作で綺麗に撮れる）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '4500mAh / 数日充電しなくても安心のスタミナ',
        gameText: 'らくらくメニュー搭載・歩数計や健康管理、LINE・通話に最適（★1.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X) / MIL-STD-810H準拠',
        biometrics: '指紋認証 ＋ 顔認証',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約162.0 × 73.0 × 9.0 mm',
        weight: 185,
        otherText: 'Y!mobile専売の高コスパらくらく機 / 迷惑電話対策 / 泡ハンドソープ丸洗い対応',
        carriers: ['ymobile'],
        scores: { cpu: 2.5, game: 1.5, camera: 3.0, telephoto: 1.5, battery: 5.0, cost: 5.0 },
        isSenior: true,
        design: { style: 'senior-phone', bodyColor: '#047857', accentColor: '#6ee7b7', screenColor: '#064e3b' }
      },
      {
        id: 'simple_sumaho_7',
        maker: 'シニアスマホ',
        brand: 'SHARP',
        name: 'シンプルスマホ7',
        tier: 'Entry',
        price: 49800,
        rom: [64],
        ram: 4,
        sdCard: '対応 (microSDXC 最大1TB)',
        cpu: 'Snapdragon 6s Gen 3',
        antutuScore: 724500,
        antutuGpuScore: 56000,
        antutu: '724,500点 (CPU:27.8万 / GPU:5.6万 / MEM:19.5万 / UX:19.5万)',
        refreshRate: 90,
        brightness: 1300,
        displayText: '5.7 inch Pro IGZO液晶ディスプレイ (90Hz / はっきりビュー・1300nits)',
        cameraText: '50.3MPカメラ（SHARP独自のAI画質エンジンで逆光でも綺麗）',
        telephotoZoom: 1.0,
        hasTelephoto: false,
        batteryText: '4500mAh＋省エネIGZO液晶でシニアスマホ随一の電池持ち',
        gameText: '「電話」「ホーム」「メール」の専用物理3ボタンで迷わず使える（★1.5）',
        waterproof: 'IP68 (IPX5/IPX8・IP6X) / MIL規格耐衝撃',
        biometrics: '指紋認証 ＋ 顔認証 (マスク対応)',
        felica: '対応 (おサイフケータイ)',
        dimensions: '約158.0 × 71.0 × 9.4 mm',
        weight: 176,
        otherText: '緊急ブザー搭載 / 押すと光る専用物理3ボタン / 泡ハンドソープ丸洗い対応',
        carriers: ['softbank'],
        scores: { cpu: 2.5, game: 1.5, camera: 3.0, telephoto: 1.5, battery: 5.0, cost: 4.5 },
        isSenior: true,
        design: { style: 'senior-phone', bodyColor: '#1d4ed8', accentColor: '#93c5fd', screenColor: '#172554' }
      }
    ];

    // 現在の端末リスト（LocalStorageから復元または初期45機種）
    let DEVICES = [];
    let selectedCarriers = ['ALL'];
    let selectedMakers = [...MAKERS];
    let compareList = ['iphone_17', 'iphone_18_pro', 'pixel_11'];
    let customDeviceImages = {}; // { deviceId: dataUrl or Url }
    let currentEditingDeviceId = null;

    // 望遠カメラの独立評価スコア（★1.0〜5.0）と専用望遠レンズ有無を自動付与・正規化するヘルパー
    function enrichTelephotoSpec(device) {
      const zoom = device.telephotoZoom || 1.0;
      const camText = device.cameraText || '';
      // 光学3倍以上、または光学2.8倍・専用望遠明記がある機種は「専用望遠レンズ搭載」と判定
      const hasDedicatedLens = typeof device.hasTelephoto === 'boolean'
        ? device.hasTelephoto
        : (zoom >= 2.8 || (zoom >= 2.0 && camText.includes('光学2倍望遠')));

      device.hasTelephoto = hasDedicatedLens;
      if (!device.scores) device.scores = { cpu: 3.5, game: 3.0, camera: 3.5, battery: 4.0, cost: 4.0 };

      if (typeof device.scores.telephoto !== 'number') {
        if (hasDedicatedLens && zoom >= 5.0) {
          device.scores.telephoto = 5.0;
        } else if (hasDedicatedLens && zoom >= 3.0) {
          device.scores.telephoto = (device.tier === 'Flagship') ? 4.5 : 4.0;
        } else if (hasDedicatedLens && zoom >= 2.0) {
          device.scores.telephoto = 4.0;
        } else if (zoom >= 2.0) {
          // 専用望遠レンズなし（高画素クロップ2倍）
          device.scores.telephoto = 2.5;
        } else {
          // デジタルズームのみ
          device.scores.telephoto = 1.5;
        }
      }
      return device;
    }

    // ストレージ初期化読み込み
    function loadStoredData() {
      try {
        const savedDevices = localStorage.getItem(STORAGE_KEY_DEVICES);
        if (savedDevices) {
          const parsed = JSON.parse(savedDevices);
          if (Array.isArray(parsed) && parsed.length > 0) {
            DEVICES = parsed.map(enrichTelephotoSpec);
          } else {
            DEVICES = JSON.parse(JSON.stringify(INITIAL_DEVICES)).map(enrichTelephotoSpec);
          }
        } else {
          DEVICES = JSON.parse(JSON.stringify(INITIAL_DEVICES)).map(enrichTelephotoSpec);
        }

        const savedImages = localStorage.getItem(STORAGE_KEY_IMAGES);
        if (savedImages) {
          customDeviceImages = JSON.parse(savedImages) || {};
        }
      } catch (e) {
        DEVICES = JSON.parse(JSON.stringify(INITIAL_DEVICES)).map(enrichTelephotoSpec);
        customDeviceImages = {};
      }
      updateHeaderDeviceCount();
    }

    function saveDevicesToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY_DEVICES, JSON.stringify(DEVICES));
      } catch (e) {
        console.warn('Storage save skipped:', e);
      }
      updateHeaderDeviceCount();
    }

    function saveImagesToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY_IMAGES, JSON.stringify(customDeviceImages));
      } catch (e) {
        console.warn('Image storage save skipped:', e);
      }
    }

    function updateHeaderDeviceCount() {
      const badge = document.getElementById('header-device-count-badge');
      if (badge) badge.textContent = `5キャリア×全${DEVICES.length}機種収録`;
      const catBadge = document.getElementById('catalog-count-badge');
      if (catBadge) catBadge.textContent = `${DEVICES.length}機種`;
    }

    // ==========================================
    // 端末ビジュアル描画エンジン（カスタム画像 or 機種別リアルSVG生成）
    // ==========================================
    function getDeviceVisualHtml(device, sizeClass = 'w-28 h-36') {
      const customImg = customDeviceImages[device.id];
      if (customImg) {
        return `
          <div class="relative ${sizeClass} flex items-center justify-center group">
            <img src="${customImg}" alt="${device.name}" class="max-w-full max-h-full object-contain rounded-lg drop-shadow-md" onerror="this.onerror=null; this.src='https://placehold.co/240x320/e2e8f0/475569?text=Image+Error';">
          </div>
        `;
      }

      const d = device.design || { style: 'iphone-dual', bodyColor: '#475569', accentColor: '#94a3b8', screenColor: '#0f172a' };

      // 1. ブック型折りたたみ（Fold / Duo）専用SVG
      if (d.style === 'fold-book') {
        return `
          <svg viewBox="0 0 130 140" class="${sizeClass} drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="foldGrad-${device.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${d.accentColor}" />
                <stop offset="50%" stop-color="${d.bodyColor}" />
                <stop offset="100%" stop-color="#09090b" />
              </linearGradient>
              <linearGradient id="foldScr-${device.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6366f1" />
                <stop offset="55%" stop-color="${d.screenColor}" />
                <stop offset="100%" stop-color="#09090b" />
              </linearGradient>
            </defs>
            <!-- 開いた大画面ボディ -->
            <rect x="12" y="14" width="106" height="114" rx="8" fill="url(#foldGrad-${device.id})" stroke="#cbd5e1" stroke-width="1.4"/>
            <rect x="16" y="18" width="98" height="106" rx="5" fill="url(#foldScr-${device.id})"/>
            <!-- 中央ヒンジ折り目ライン -->
            <line x1="65" y1="15" x2="65" y2="127" stroke="rgba(255,255,255,0.28)" stroke-width="1.5" stroke-dasharray="3,2"/>
            <!-- マルチウィンドウUI風 -->
            <rect x="21" y="26" width="39" height="82" rx="4" fill="rgba(255,255,255,0.12)"/>
            <rect x="69" y="26" width="40" height="40" rx="4" fill="rgba(255,255,255,0.16)"/>
            <rect x="69" y="70" width="40" height="38" rx="4" fill="rgba(255,255,255,0.1)"/>
            <text x="40" y="55" text-anchor="middle" fill="#ffffff" font-size="9" font-weight="800">FOLD</text>
            <text x="40" y="67" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="6" font-weight="bold">${device.maker}</text>
          </svg>
        `;
      }

      // 2. 縦折りクラムシェル（Flip / razr）専用SVG
      if (d.style === 'flip-clamshell') {
        return `
          <svg viewBox="0 0 130 140" class="${sizeClass} drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
            <!-- 閉じたカバー画面側 (左) -->
            <rect x="12" y="42" width="58" height="62" rx="10" fill="${d.bodyColor}" stroke="rgba(255,255,255,0.5)" stroke-width="1.4"/>
            <rect x="16" y="46" width="50" height="36" rx="6" fill="#09090b"/>
            <text x="41" y="66" text-anchor="middle" fill="#f8fafc" font-size="8.5" font-weight="800">12:30</text>
            <circle cx="25" cy="92" r="5" fill="#09090b" stroke="#cbd5e1" stroke-width="1.2"/>
            <circle cx="38" cy="92" r="5" fill="#09090b" stroke="#cbd5e1" stroke-width="1.2"/>
            <!-- 開いたメイン画面側 (右) -->
            <rect x="58" y="10" width="58" height="120" rx="11" fill="#09090b" stroke="#cbd5e1" stroke-width="1.2"/>
            <rect x="61" y="13" width="52" height="114" rx="9" fill="${d.screenColor}"/>
            <line x1="61" y1="70" x2="113" y2="70" stroke="rgba(255,255,255,0.22)" stroke-width="1.2"/>
            <circle cx="87" cy="19" r="2.5" fill="#000000"/>
            <text x="87" y="50" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-size="9" font-weight="800">FLIP</text>
          </svg>
        `;
      }

      let cameraModuleSvg = '';
      let frontNotchSvg = `<rect x="74" y="18" width="22" height="5" rx="2.5" fill="#000000" opacity="0.85"/>`;
      let extraFrontElements = '';

      if (d.style === 'iphone-pro') {
        cameraModuleSvg = `
          <rect x="20" y="18" width="34" height="34" rx="9" fill="${d.accentColor}" fill-opacity="0.35" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
          <circle cx="29" cy="27" r="6" fill="#09090b" stroke="#cbd5e1" stroke-width="1.2"/><circle cx="29" cy="27" r="2" fill="#38bdf8"/>
          <circle cx="29" cy="43" r="6" fill="#09090b" stroke="#cbd5e1" stroke-width="1.2"/><circle cx="29" cy="43" r="2" fill="#38bdf8"/>
          <circle cx="44" cy="35" r="6" fill="#09090b" stroke="#cbd5e1" stroke-width="1.2"/><circle cx="44" cy="35" r="2" fill="#38bdf8"/>
          <circle cx="44" cy="24" r="2.2" fill="#fef08a"/>
        `;
      } else if (d.style === 'iphone-dual') {
        cameraModuleSvg = `
          <rect x="20" y="18" width="22" height="36" rx="11" fill="${d.accentColor}" fill-opacity="0.4" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
          <circle cx="31" cy="28" r="6.5" fill="#09090b" stroke="#e2e8f0" stroke-width="1.2"/><circle cx="31" cy="28" r="2.2" fill="#60a5fa"/>
          <circle cx="31" cy="43" r="6.5" fill="#09090b" stroke="#e2e8f0" stroke-width="1.2"/><circle cx="31" cy="43" r="2.2" fill="#60a5fa"/>
          <circle cx="47" cy="35" r="2.5" fill="#fef08a"/>
        `;
      } else if (d.style === 'iphone-single') {
        cameraModuleSvg = `
          <circle cx="30" cy="28" r="8" fill="#09090b" stroke="#cbd5e1" stroke-width="1.5"/>
          <circle cx="30" cy="28" r="3" fill="#38bdf8"/>
          <circle cx="43" cy="28" r="2.5" fill="#fef08a"/>
        `;
      } else if (d.style === 'pixel-bar-pro' || d.style === 'pixel-bar') {
        frontNotchSvg = `<circle cx="85" cy="20" r="3" fill="#000000"/>`;
        const isPro = d.style === 'pixel-bar-pro';
        cameraModuleSvg = `
          <rect x="19" y="22" width="52" height="18" rx="9" fill="#18181b" stroke="#d4d4d8" stroke-width="1.3"/>
          <circle cx="29" cy="31" r="5" fill="#09090b" stroke="#52525b" stroke-width="1"/><circle cx="29" cy="31" r="2" fill="#38bdf8"/>
          <circle cx="42" cy="31" r="5" fill="#09090b" stroke="#52525b" stroke-width="1"/>
          ${isPro ? `<rect x="51" y="27" width="9" height="8" rx="3" fill="#09090b" stroke="#71717a" stroke-width="1"/>` : ''}
          <circle cx="65" cy="31" r="2.2" fill="#fef08a"/>
        `;
      } else if (d.style === 'galaxy-ultra') {
        frontNotchSvg = `<circle cx="85" cy="19" r="2.8" fill="#000000"/>`;
        cameraModuleSvg = `
          <circle cx="28" cy="25" r="5.5" fill="#09090b" stroke="#e4e4e7" stroke-width="1.2"/>
          <circle cx="28" cy="39" r="5.5" fill="#09090b" stroke="#e4e4e7" stroke-width="1.2"/>
          <circle cx="28" cy="53" r="5.5" fill="#09090b" stroke="#e4e4e7" stroke-width="1.2"/>
          <circle cx="41" cy="32" r="4" fill="#09090b" stroke="#a1a1aa" stroke-width="1"/>
          <circle cx="41" cy="46" r="4" fill="#09090b" stroke="#a1a1aa" stroke-width="1"/>
          <rect x="10" y="35" width="3.5" height="65" rx="1.7" fill="#f59e0b"/>
        `;
      } else if (d.style === 'galaxy-s' || d.style === 'xperia-pro' || d.style === 'xperia-mid') {
        frontNotchSvg = `<circle cx="85" cy="20" r="2.8" fill="#000000"/>`;
        cameraModuleSvg = `
          <rect x="21" y="18" width="16" height="42" rx="8" fill="#09090b" fill-opacity="0.55" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
          <circle cx="29" cy="26" r="5" fill="#09090b" stroke="#cbd5e1" stroke-width="1"/>
          <circle cx="29" cy="39" r="5" fill="#09090b" stroke="#cbd5e1" stroke-width="1"/>
          <circle cx="29" cy="51" r="4.5" fill="#09090b" stroke="#cbd5e1" stroke-width="1"/>
        `;
      } else if (d.style === 'xiaomi-ultra') {
        frontNotchSvg = `<circle cx="85" cy="20" r="2.8" fill="#000000"/>`;
        cameraModuleSvg = `
          <circle cx="45" cy="42" r="23" fill="#09090b" stroke="#eab308" stroke-width="1.8"/>
          <circle cx="38" cy="35" r="5" fill="#18181b" stroke="#52525b" stroke-width="1"/>
          <circle cx="52" cy="35" r="5" fill="#18181b" stroke="#52525b" stroke-width="1"/>
          <circle cx="38" cy="49" r="5" fill="#18181b" stroke="#52525b" stroke-width="1"/>
          <circle cx="52" cy="49" r="5" fill="#18181b" stroke="#52525b" stroke-width="1"/>
        `;
      } else if (d.style === 'aquos-r') {
        frontNotchSvg = `<circle cx="85" cy="20" r="2.8" fill="#000000"/>`;
        cameraModuleSvg = `
          <path d="M22,20 C38,17 48,25 46,42 C44,55 26,56 21,44 Z" fill="${d.accentColor}" fill-opacity="0.45" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
          <circle cx="33" cy="30" r="6.5" fill="#09090b" stroke="#e2e8f0" stroke-width="1.2"/>
          <circle cx="33" cy="45" r="5.5" fill="#09090b" stroke="#e2e8f0" stroke-width="1.2"/>
        `;
      } else if (d.style === 'rugged-tough') {
        frontNotchSvg = `<circle cx="85" cy="21" r="3" fill="#000000"/>`;
        cameraModuleSvg = `
          <polygon points="20,16 50,16 54,48 20,48" fill="#09090b" stroke="#ef4444" stroke-width="1.5"/>
          <circle cx="34" cy="27" r="6" fill="#18181b" stroke="#cbd5e1" stroke-width="1.2"/>
          <circle cx="34" cy="40" r="5" fill="#18181b" stroke="#cbd5e1" stroke-width="1.2"/>
        `;
      } else if (d.style === 'senior-phone') {
        frontNotchSvg = `<rect x="76" y="18" width="18" height="3.5" rx="1.5" fill="#334155"/>`;
        cameraModuleSvg = `
          <circle cx="31" cy="27" r="7.5" fill="#09090b" stroke="#f8fafc" stroke-width="1.5"/>
          <circle cx="31" cy="27" r="2.8" fill="#38bdf8"/>
        `;
        extraFrontElements = `
          <!-- シニアスマホ物理3ボタン -->
          <rect x="63" y="112" width="13" height="8" rx="2" fill="#10b981" stroke="#ffffff" stroke-width="0.8"/>
          <rect x="78.5" y="112" width="13" height="8" rx="2" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
          <rect x="94" y="112" width="13" height="8" rx="2" fill="#3b82f6" stroke="#ffffff" stroke-width="0.8"/>
        `;
      } else {
        frontNotchSvg = `<circle cx="85" cy="20" r="3" fill="#000000"/>`;
        cameraModuleSvg = `
          <rect x="21" y="19" width="22" height="32" rx="8" fill="#09090b" fill-opacity="0.45" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          <circle cx="32" cy="29" r="6" fill="#09090b" stroke="#cbd5e1" stroke-width="1"/>
          <circle cx="32" cy="42" r="5" fill="#09090b" stroke="#cbd5e1" stroke-width="1"/>
        `;
      }

      const rx = d.style === 'galaxy-ultra' || d.style === 'rugged-tough' ? '4' : '12';

      return `
        <svg viewBox="0 0 130 140" class="${sizeClass} drop-shadow-md select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bodyGrad-${device.id}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${d.accentColor}" />
              <stop offset="45%" stop-color="${d.bodyColor}" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
            <linearGradient id="screenGrad-${device.id}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#4f46e5" />
              <stop offset="50%" stop-color="${d.screenColor}" />
              <stop offset="100%" stop-color="#09090b" />
            </linearGradient>
          </defs>
          <!-- 背面ボディ (左側) -->
          <rect x="14" y="10" width="62" height="120" rx="${rx}" fill="url(#bodyGrad-${device.id})" stroke="rgba(255,255,255,0.45)" stroke-width="1.5"/>
          ${cameraModuleSvg}
          <text x="45" y="114" text-anchor="middle" fill="rgba(255,255,255,0.45)" font-size="6" font-weight="bold">${device.maker.slice(0, 8).toUpperCase()}</text>

          <!-- 前面ディスプレイ (右側) -->
          <rect x="54" y="12" width="62" height="118" rx="${rx}" fill="#09090b" stroke="#cbd5e1" stroke-width="1.2"/>
          <rect x="57" y="15" width="56" height="112" rx="${rx === '4' ? '2' : '9'}" fill="url(#screenGrad-${device.id})"/>
          <circle cx="98" cy="52" r="18" fill="rgba(255,255,255,0.07)"/>
          <text x="85" y="48" text-anchor="middle" fill="rgba(255,255,255,0.85)" font-size="11" font-weight="800">12:30</text>
          ${extraFrontElements || `
            <rect x="66" y="108" width="10" height="10" rx="3" fill="rgba(255,255,255,0.2)"/>
            <rect x="80" y="108" width="10" height="10" rx="3" fill="rgba(255,255,255,0.2)"/>
            <rect x="94" y="108" width="10" height="10" rx="3" fill="rgba(255,255,255,0.2)"/>
          `}
          ${frontNotchSvg}
        </svg>
      `;
    }

    // ==========================================
    // 初期化処理
    // ==========================================
    window.onload = function () {
      loadStoredData();
      initMakerChips();
      initCatalogFilterMakerSelect();
      initCompareSelect();
      updateSimulator();
      renderCatalog();
      renderComparisonTable();
      renderMakerGuide();
      window.addEventListener('resize', () => {
        if (!document.getElementById('view-compare').classList.contains('hidden')) {
          drawRadarChart();
        }
      });
    };

    // メーカー特徴ガイド（TAB 4）の描画
    function renderMakerGuide() {
      const grid = document.getElementById('maker-guide-grid');
      if (!grid) return;
      grid.innerHTML = MAKER_GUIDE_INFO.map(info => {
        const models = DEVICES.filter(d => d.maker === info.maker);
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-5 phone-card-shadow flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-indigo-600 text-white">${info.maker}</span>
                    <span class="text-xs font-bold text-slate-500">${info.company}</span>
                  </div>
                  <p class="text-[11px] font-bold text-indigo-600 mt-1">${info.badge}</p>
                </div>
                <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-bold shrink-0">${info.os}</span>
              </div>

              <p class="text-xs text-slate-700 leading-relaxed">${info.summary}</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div class="bg-emerald-50/70 border border-emerald-200 rounded-xl p-2.5 space-y-1">
                  <div class="font-extrabold text-emerald-900 text-[11px] flex items-center gap-1">
                    <i class="fa-solid fa-thumbs-up text-emerald-600"></i> ここが強い（メリット）
                  </div>
                  <ul class="space-y-1 text-[11px] text-slate-700 list-disc pl-4">
                    ${info.pros.map(p => `<li>${p}</li>`).join('')}
                  </ul>
                </div>
                <div class="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 space-y-1">
                  <div class="font-extrabold text-amber-900 text-[11px] flex items-center gap-1">
                    <i class="fa-solid fa-circle-exclamation text-amber-600"></i> 注意点・弱み
                  </div>
                  <ul class="space-y-1 text-[11px] text-slate-700 list-disc pl-4">
                    ${info.cons.map(c => `<li>${c}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-xs">
                <span class="font-extrabold text-slate-700 text-[11px] block mb-1"><i class="fa-solid fa-user-check text-indigo-600 mr-1"></i>こんな人におすすめ：</span>
                <span class="text-slate-600 text-[11px]">${info.recommendFor}</span>
              </div>

              <!-- 収録モデル一覧チップ -->
              <div class="pt-1">
                <span class="text-[10px] font-bold text-slate-400 block mb-1">収録モデル (${models.length}機種):</span>
                <div class="flex flex-wrap gap-1">
                  ${models.map(m => `<span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">${m.name} (${(m.price / 10000).toFixed(1)}万円)</span>`).join('')}
                </div>
              </div>
            </div>

            <div class="flex gap-2 pt-2 border-t border-slate-100">
              <button onclick="filterBySingleMaker('${info.maker}', 'simulator')" class="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition">
                <i class="fa-solid fa-wand-magic-sparkles mr-1"></i>${info.maker}で診断する
              </button>
              <button onclick="filterBySingleMaker('${info.maker}', 'catalog')" class="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition">
                <i class="fa-solid fa-grip mr-1"></i>カタログで見る
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    function filterBySingleMaker(maker, targetTab) {
      selectedMakers = [maker];
      // 折りたたみしか無いメーカーや折りたたみを含む場合の配慮
      initMakerChips();
      updateSimulator();
      if (targetTab === 'catalog') {
        const sel = document.getElementById('cat-filter-maker');
        if (sel) sel.value = maker;
        renderCatalog();
      }
      switchTab(targetTab);
      showToast(`「${maker}」に絞り込みました`);
    }

    // カタログのメーカープルダウン動的生成
    function initCatalogFilterMakerSelect() {
      const sel = document.getElementById('cat-filter-maker');
      if (!sel) return;
      const currentVal = sel.value || 'ALL';
      const allMakers = Array.from(new Set([...MAKERS, ...DEVICES.map(d => d.maker)]));
      sel.innerHTML = `<option value="ALL">すべてのシリーズ (${allMakers.length}区分)</option>` +
        allMakers.map(m => {
          const count = DEVICES.filter(d => d.maker === m).length;
          return `<option value="${m}">${m} (${count}機種)</option>`;
        }).join('');
      if (allMakers.includes(currentVal) || currentVal === 'ALL') {
        sel.value = currentVal;
      }
    }

    // タブ切り替え
    function switchTab(tabName) {
      ['simulator', 'catalog', 'compare', 'guide'].forEach(t => {
        const view = document.getElementById(`view-${t}`);
        const btn = document.getElementById(`tab-btn-${t}`);
        if (!view || !btn) return;
        if (t === tabName) {
          view.classList.remove('hidden');
          btn.className = 'flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 bg-white text-indigo-600 shadow-sm';
        } else {
          view.classList.add('hidden');
          btn.className = 'flex-1 md:flex-initial px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900';
        }
      });

      if (tabName === 'compare') {
        renderComparisonTable();
        setTimeout(drawRadarChart, 50);
      } else if (tabName === 'catalog') {
        renderCatalog();
      } else if (tabName === 'guide') {
        renderMakerGuide();
      }
    }

    // シリーズ・メーカー選択チップ初期化（押すとON/OFFが切り替わり、比較対象から外れる直感トグル）
    function initMakerChips() {
      const container = document.getElementById('sim-maker-chips');
      const allMakers = Array.from(new Set([...MAKERS, ...DEVICES.map(d => d.maker)]));
      container.innerHTML = allMakers.map(maker => {
        const isSelected = selectedMakers.includes(maker);
        return `
          <button type="button" onclick="toggleMaker('${maker}')" id="maker-chip-${maker}"
            class="px-2.5 py-1 rounded-lg text-[11px] font-bold border transition flex items-center gap-1 ${isSelected ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-75 hover:opacity-100'}">
            <i class="fa-solid ${isSelected ? 'fa-check text-[10px]' : 'fa-xmark text-[10px] text-rose-400'}"></i>
            <span>${maker}</span>
          </button>
        `;
      }).join('');
    }

    // チップを押すとそのシリーズが対象から外れる（もう1回押すと戻る）シンプル挙動
    function toggleMaker(maker) {
      if (selectedMakers.includes(maker)) {
        if (selectedMakers.length <= 1) {
          showToast('最低1つのシリーズを選択してください');
          return;
        }
        selectedMakers = selectedMakers.filter(m => m !== maker);
      } else {
        selectedMakers.push(maker);
      }
      initMakerChips();
      updateSimulator();
    }

    // ワンタッチ絞り込みプリセット（3大メーカー / iPhoneのみ / Androidのみ / すべて選択）
    function setMakerPreset(presetType) {
      const allMakers = Array.from(new Set([...MAKERS, ...DEVICES.map(d => d.maker)]));
      if (presetType === 'ALL') {
        selectedMakers = [...allMakers];
        showToast('すべてのシリーズを選択しました');
      } else if (presetType === 'BIG3') {
        selectedMakers = ['iPhone', 'GALAXY', 'Pixel'];
        showToast('3大メーカー（iPhone / GALAXY / Pixel）に絞り込みました');
      } else if (presetType === 'IPHONE') {
        selectedMakers = ['iPhone'];
        showToast('iPhoneシリーズのみに絞り込みました');
      } else if (presetType === 'ANDROID') {
        selectedMakers = allMakers.filter(m => m !== 'iPhone');
        showToast('Android全シリーズのみに絞り込みました（iPhoneを除外）');
      }
      initMakerChips();
      updateSimulator();
    }

    function clearMakerFilter() {
      setMakerPreset('ALL');
    }

    // STEP 1 キャリアトグル
    function toggleSimCarrier(carrier) {
      if (carrier === 'ALL') {
        selectedCarriers = ['ALL'];
      } else {
        selectedCarriers = selectedCarriers.filter(c => c !== 'ALL');
        if (selectedCarriers.includes(carrier)) {
          selectedCarriers = selectedCarriers.filter(c => c !== carrier);
          if (selectedCarriers.length === 0) selectedCarriers = ['ALL'];
        } else {
          selectedCarriers.push(carrier);
        }
      }

      document.querySelectorAll('.sim-carrier-btn').forEach(btn => {
        const c = btn.getAttribute('data-carrier');
        if (selectedCarriers.includes(c)) {
          btn.className = `${c === 'ALL' ? 'col-span-3 sm:col-span-1' : ''} sim-carrier-btn py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all bg-indigo-600 text-white border-indigo-600 shadow-sm`;
        } else {
          btn.className = `${c === 'ALL' ? 'col-span-3 sm:col-span-1' : ''} sim-carrier-btn py-2 px-3 rounded-xl text-xs font-bold border transition-all bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100`;
        }
      });

      updateSimulator();
    }

    // ==========================================
    // 診断アルゴリズム＆リアルタイムスコアリング
    // ==========================================
    function updateSimulator() {
      const budget = parseInt(document.getElementById('sim-budget-range').value, 10);
      const isUnlimitedBudget = budget >= 300000;
      document.getElementById('sim-budget-label').textContent = isUnlimitedBudget ? '上限なし（〜30万円+）' : `〜${budget.toLocaleString()}円`;

      const strictBudget = document.getElementById('strict-budget-toggle')?.checked ?? true;
      const gameMode = document.querySelector('input[name="sim-game"]:checked')?.value || 'light';
      const cameraMode = document.querySelector('input[name="sim-camera"]:checked')?.value || 'good';
      const prioBattery = document.getElementById('prio-battery').checked;
      const prioLight = document.getElementById('prio-light').checked;
      const prioCost = document.getElementById('prio-cost').checked;
      const prioRom = document.getElementById('prio-rom').checked;
      const prioSenior = document.getElementById('prio-senior')?.checked || false;
      const prioFoldable = document.getElementById('prio-foldable')?.checked || false;

      // 各端末をスコアリング（予算遵守・AnTuTu GPU実性能・折りたたみ分離を厳格化）
      const scoredDevices = DEVICES.filter(d => selectedMakers.includes(d.maker)).map(d => {
        let score = 48;
        let maxCap = 98; // 条件違反時のハードキャップ（上限固定）
        let reasons = [];
        let warnings = [];
        const gpuScore = d.antutuGpuScore || Math.round((d.antutuScore || 600000) * 0.25);
        const isFold = Boolean(d.isFoldable || (d.design && (d.design.style === 'fold-book' || d.design.style === 'flip-clamshell')));

        // 1. キャリア取扱チェック
        const hasDirectCarrier = selectedCarriers.includes('ALL') || selectedCarriers.some(c => d.carriers.includes(c));
        if (hasDirectCarrier) {
          score += 10;
        } else {
          score -= 28;
          maxCap = Math.min(maxCap, 62);
          warnings.push('選択キャリアでは直接販売なし（SIMフリー版の持ち込み利用が必要）');
        }

        // 2. 折りたたみスマホ（ニッチ機能）の分離フィルタリング
        if (isFold) {
          if (prioFoldable) {
            score += 14;
            reasons.push('大画面・コンパクト収納が可能な折りたたみモデル');
          } else {
            // 折りたたみ希望にチェックがない場合、通常スマホを探している人に上位表示されないよう大幅減点＆上限キャップ
            score -= 38;
            maxCap = Math.min(maxCap, 54);
            warnings.push('特殊形状（折りたたみ機）のため通常診断では評価を抑制中');
          }
        }

        // 3. 予算マッチ度（完全な足切りではなく、超過額に応じて段階的にマッチ度が下がるスケーリング）
        if (isUnlimitedBudget || d.price <= budget) {
          const priceRatio = d.price / budget;
          if (!isUnlimitedBudget && priceRatio >= 0.55 && priceRatio <= 1.0) {
            score += 14;
          } else {
            score += 10;
          }
          reasons.push(`予算内（定価${d.price.toLocaleString()}円）`);
        } else {
          const overAmount = d.price - budget;
          const over10kUnit = overAmount / 10000; // 1万円単位の超過量
          if (strictBudget) {
            // 標準モード：1万円超過ごとに約6.5ptずつ減点し、上限キャップも92%から段階的に減衰
            const penalty = Math.round(over10kUnit * 6.5);
            score -= penalty;
            const gradualCap = Math.max(38, Math.round(92 - over10kUnit * 5.2));
            maxCap = Math.min(maxCap, gradualCap);
            warnings.push(`予算上限を +${overAmount.toLocaleString()}円 超過（段階的減点 -${penalty}pt）`);
          } else {
            // 性能優先モード：多少予算を超えてもスペックが合えば上位に残る緩やかな減点
            const penalty = Math.round(over10kUnit * 3.5);
            score -= penalty;
            const gradualCap = Math.max(50, Math.round(95 - over10kUnit * 3.0));
            maxCap = Math.min(maxCap, gradualCap);
            warnings.push(`予算上限を +${overAmount.toLocaleString()}円 超過（緩やかな減点 -${penalty}pt）`);
          }
        }

        // 4. シニア向け・かんたん操作優先チェック
        if (prioSenior) {
          if (d.maker === 'シニアスマホ' || d.isSenior) {
            score += 32;
            reasons.push('専用物理ボタン・大きな文字・迷惑電話対策搭載のシニア安心モデル');
          } else if (d.otherText.includes('かんたん') || d.otherText.includes('丸洗い') || d.otherText.includes('耐衝撃')) {
            score += 12;
            reasons.push('高耐久・かんたんモード対応で安心');
          } else {
            score -= 22;
            maxCap = Math.min(maxCap, 65);
          }
        } else {
          if (d.maker === 'シニアスマホ' || d.isSenior) {
            score -= 28;
            maxCap = Math.min(maxCap, 55);
          }
        }

        // 5. ゲーム利用度との適合（AnTuTu総合点ではなく「GPU単体スコア」と「画面Hz」で厳格判定）
        if (gameMode === 'none') {
          if (d.tier === 'Entry' || d.tier === 'Middle') {
            score += 14;
            reasons.push('連絡・Web・動画中心に無駄のない最適スペック');
          } else if (d.tier === 'Flagship') {
            score -= 14;
            warnings.push('ゲームをしない用途にはオーバースペック（高価格）');
          }
        } else if (gameMode === 'light') {
          if (gpuScore >= 130000 && gpuScore <= 900000) {
            score += 14;
            reasons.push(`パズル・中量級ゲームが快適なGPU性能（GPU約${Math.round(gpuScore / 10000)}万点）`);
          } else if (gpuScore > 900000) {
            score += 8;
          } else {
            score -= 16;
            maxCap = Math.min(maxCap, 68);
            warnings.push(`GPUスコア（約${Math.round(gpuScore / 10000)}万点）が低く中量級ゲームでも動作が重い可能性`);
          }
        } else if (gameMode === 'heavy') {
          // 3Dゲーム（原神・FPS等）をストレスなく遊びたい場合：GPU 55万点以上を推奨、30万点未満は足切り
          if (gpuScore >= 750000 && (d.refreshRate || 60) >= 120) {
            score += 22;
            reasons.push(`高GPU性能（GPU約${Math.round(gpuScore / 10000)}万点×${d.refreshRate}Hz）で3Dゲームが快適`);
          } else if (gpuScore >= 500000) {
            score += 13;
            if ((d.refreshRate || 60) < 120) {
              warnings.push('GPUは高性能ですが画面が60Hz上限のため最大60fpsとなります');
            } else {
              reasons.push(`3Dゲーム中〜高画質に対応（GPU約${Math.round(gpuScore / 10000)}万点）`);
            }
          } else if (gpuScore >= 300000) {
            score -= 8;
            maxCap = Math.min(maxCap, 72);
            warnings.push(`見かけの総合点は高いもののGPU（約${Math.round(gpuScore / 10000)}万点）がミドル級のため重い3Dは中画質目安`);
          } else {
            score -= 32;
            maxCap = Math.min(maxCap, 48);
            warnings.push(`GPUスコア（約${Math.round(gpuScore / 10000)}万点）が不足しており重い3Dゲームには不向き`);
          }
        } else if (gameMode === 'pro') {
          // 最高画質・高fps維持でガチプレイ：GPU 110万点以上＆120Hz以上＆ストレート筐体（非折りたたみ）を高評価
          if (gpuScore >= 1100000 && (d.refreshRate || 60) >= 120 && !isFold) {
            score += 26;
            reasons.push(`最高峰GPU（約${Math.round(gpuScore / 10000)}万点）＆高放熱・RAM ${d.ram}GB搭載`);
          } else if (gpuScore >= 800000 && (d.refreshRate || 60) >= 120) {
            score += 12;
            if (isFold) warnings.push('折りたたみ筐体のため超長時間プレイ時はストレート型フラッグシップより熱制限が早い点に留意');
          } else {
            score -= 35;
            maxCap = Math.min(maxCap, 52);
            warnings.push(`ガチ3Dゲーム最高設定にはGPU性能（約${Math.round(gpuScore / 10000)}万点）または冷却余裕が不足`);
          }
        }

        // 6. カメラ画質 ＆ 望遠カメラ有無の独立評価判定（無印 vs Proの決定打）
        const teleScore = d.scores.telephoto || (d.hasTelephoto ? 4.5 : 2.5);
        if (cameraMode === 'basic') {
          score += d.scores.cost * 2;
        } else if (cameraMode === 'good') {
          score += d.scores.camera * 3.5;
          if (d.scores.camera >= 4.0) reasons.push('暗所や日常スナップに強い高画質メインカメラ');
        } else if (cameraMode === 'telephoto') {
          if (d.hasTelephoto && d.telephotoZoom >= 3.0) {
            score += 18 + teleScore * 2;
            reasons.push(`専用の光学${d.telephotoZoom}倍望遠カメラ搭載（望遠★${teleScore.toFixed(1)}）`);
          } else if (d.hasTelephoto) {
            score += 10;
            reasons.push(`専用光学${d.telephotoZoom}倍望遠カメラ搭載`);
          } else {
            score -= 25;
            maxCap = Math.min(maxCap, 64);
            warnings.push('専用の光学望遠カメラが非搭載（メインカメラのクロップ/デジタルズームのみ）');
          }
        }

        // 7. 重視オプション
        if (prioBattery) {
          score += d.scores.battery * 3;
          if (d.scores.battery >= 4.5) reasons.push('トップクラスの電池持ち');
        }
        if (prioLight) {
          if (d.weight <= 180) {
            score += 12;
            reasons.push(`約${d.weight}gの軽量ボディで片手操作も快適`);
          } else if (d.weight >= 215) {
            score -= 12;
          }
        }
        if (prioCost) {
          score += d.scores.cost * 3;
        }
        if (prioRom) {
          if (d.rom.some(r => r >= 256)) {
            score += 6;
          } else {
            score -= 20;
            maxCap = Math.min(maxCap, 60);
            warnings.push('ROM 256GBモデルの設定なし');
          }
        }

        const matchPercent = Math.max(20, Math.min(maxCap, Math.round(score)));
        return { ...d, matchPercent, gpuScore, isFold, teleScore, reasons: reasons.slice(0, 3), warnings };
      });

      scoredDevices.sort((a, b) => b.matchPercent - a.matchPercent || a.price - b.price);
      const top10 = scoredDevices.slice(0, 10);

      const countBadge = document.getElementById('sim-match-count-badge');
      if (countBadge) {
        countBadge.textContent = `対象${scoredDevices.length}機種中 上位${top10.length}機種を表示`;
      }

      renderSimResults(top10);
      renderTierInsight(top10[0]);
    }

    // 診断TOP10の描画
    function renderSimResults(topList) {
      const container = document.getElementById('sim-results-container');
      if (!topList || topList.length === 0) {
        container.innerHTML = `<div class="p-6 text-center text-slate-500 text-sm">条件に一致する端末がありません。メーカー絞り込み等を緩めてください。</div>`;
        return;
      }

      container.innerHTML = topList.map((d, idx) => {
        const rankColors = [
          'bg-amber-400 text-slate-950 border-amber-300',
          'bg-slate-200 text-slate-800 border-slate-300',
          'bg-orange-200 text-orange-950 border-orange-300'
        ];
        const badgeStyle = rankColors[idx] || 'bg-indigo-100 text-indigo-900 border-indigo-200';
        const tierMeta = TIER_INFO[d.tier];
        const inCompare = compareList.includes(d.id);
        const teleScore = d.scores.telephoto || (d.hasTelephoto ? 4.5 : 2.5);

        return `
          <div class="rounded-2xl border ${idx === 0 ? 'border-indigo-500 bg-indigo-50/20 ring-2 ring-indigo-500/15' : 'border-slate-200 bg-white'} p-4 sm:p-5 transition hover:border-indigo-400">
            <div class="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <!-- 端末本体ビジュアル + 画像差し替えボタン -->
              <div class="flex flex-col items-center shrink-0">
                <div class="relative bg-slate-50 rounded-2xl p-2 border border-slate-200/80">
                  <span class="absolute -top-2.5 -left-2.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold border shadow-sm ${badgeStyle}">
                    #${idx + 1} ${idx < 3 ? '推奨' : '候補'}
                  </span>
                  ${getDeviceVisualHtml(d, 'w-28 h-32')}
                </div>
                <button onclick="openImageModal('${d.id}')" class="mt-2 text-[11px] font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition">
                  <i class="fa-solid fa-camera"></i> 本体画像を差替
                </button>
              </div>

              <!-- スペック・診断理由詳細 -->
              <div class="flex-grow w-full space-y-2.5">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div class="flex items-center gap-1.5 flex-wrap">
                      <span class="text-xs font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">${d.brand || d.maker}</span>
                      <span class="px-2 py-0.5 rounded-md text-[11px] font-extrabold tier-badge-${d.tier}">${tierMeta.label}</span>
                      ${d.isFold ? `<span class="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-purple-100 text-purple-900 border border-purple-300"><i class="fa-solid fa-mobile-screen mr-1"></i>折りたたみスマホ</span>` : ''}
                      ${d.hasTelephoto
                        ? `<span class="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300"><i class="fa-solid fa-magnifying-glass-plus mr-1"></i>専用望遠 (光学${d.telephotoZoom}x)</span>`
                        : `<span class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">専用望遠なし (${d.telephotoZoom >= 2 ? '2倍クロップ' : 'デジタルズーム'})</span>`
                      }
                    </div>
                    <h4 class="text-lg font-extrabold text-slate-900 mt-0.5">${d.name}</h4>
                  </div>
                  <div class="text-right">
                    <div class="inline-flex items-center gap-1 bg-indigo-600 text-white px-2.5 py-1 rounded-xl text-xs font-extrabold shadow-sm">
                      <span>マッチ度</span>
                      <span class="text-base">${d.matchPercent}%</span>
                    </div>
                    <div class="text-xs font-extrabold text-slate-700 mt-1">
                      SIMフリー定価: <span class="text-sm text-slate-900">${d.price.toLocaleString()}円〜</span>
                    </div>
                  </div>
                </div>

                <!-- キャリア取扱バッジ -->
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="text-[11px] text-slate-400 font-semibold mr-1">取扱キャリア:</span>
                  ${Object.keys(CARRIER_INFO).map(cKey => {
                    const has = d.carriers.includes(cKey);
                    const cMeta = CARRIER_INFO[cKey];
                    return has
                      ? `<span class="px-2 py-0.5 rounded-md text-[11px] font-bold border ${cMeta.bg}">${cMeta.label}</span>`
                      : `<span class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-300 border border-slate-100 line-through">${cMeta.short}</span>`;
                  }).join('')}
                </div>

                <!-- 主要スペックピル（ROM+microSD / GPU / 画面inch・Hz・輝度 / サイズ・防水・生体認証・FeliCa） -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div class="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span class="text-[10px] text-slate-400 block font-bold">ROM / RAM / microSD</span>
                    <span class="font-bold text-slate-800 block">${d.rom.map(r => r >= 1024 ? (r / 1024) + 'TB' : r).join('/')}GB / ${d.ram}GB</span>
                    <span class="text-[10px] ${d.sdCard && d.sdCard.startsWith('対応') ? 'text-emerald-700 font-bold' : 'text-slate-400'}">SD: ${d.sdCard || '非対応'}</span>
                  </div>
                  <div class="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span class="text-[10px] text-slate-400 block font-bold">AnTuTu総合 / GPU単体</span>
                    <span class="font-bold text-slate-800 truncate block" title="${d.cpu} (${d.antutu})">総合${Math.round((d.antutuScore || 800000) / 10000)}万 / <strong class="text-indigo-700">GPU ${Math.round((d.antutuGpuScore || 200000) / 10000)}万</strong></span>
                    <span class="text-[10px] text-slate-500 truncate block">${d.cpu}</span>
                  </div>
                  <div class="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span class="text-[10px] text-slate-400 block font-bold">ディスプレイ (inch / Hz / 輝度)</span>
                    <span class="font-bold text-indigo-700 block">${d.refreshRate || 120}Hz / ${d.brightness || 1500}nits</span>
                    <span class="text-[10px] text-slate-600 truncate block" title="${d.displayText}">${d.displayText}</span>
                  </div>
                  <div class="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span class="text-[10px] text-slate-400 block font-bold">サイズ・重量 / 防水・認証</span>
                    <span class="font-bold text-slate-800 block">${d.weight}g (${d.waterproof ? d.waterproof.split(' ')[0] : 'IP68'})</span>
                    <span class="text-[10px] text-slate-500 truncate block" title="${d.dimensions || ''} / ${d.biometrics || ''}">${d.biometrics || '指紋/顔'}</span>
                  </div>
                </div>

                <!-- 客観6軸★スコアバッジ（望遠カメラ独立評価軸を含む） -->
                <div class="flex flex-wrap items-center gap-1.5 pt-0.5 text-[11px]">
                  <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">CPU ★${d.scores.cpu.toFixed(1)}</span>
                  <span class="px-2 py-0.5 rounded ${d.scores.game >= 4.5 ? 'bg-indigo-100 text-indigo-800' : d.scores.game <= 3.0 ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'} font-bold">ゲーム ★${d.scores.game.toFixed(1)}</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">メインカメラ ★${d.scores.camera.toFixed(1)}</span>
                  <span class="px-2 py-0.5 rounded ${d.hasTelephoto ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-slate-100 text-slate-500'} font-bold">望遠カメラ ★${teleScore.toFixed(1)}</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">電池 ★${d.scores.battery.toFixed(1)}</span>
                  <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">コスパ ★${d.scores.cost.toFixed(1)}</span>
                  <button onclick="openRubricModal()" class="text-[10px] text-indigo-600 hover:underline font-bold ml-auto"><i class="fa-solid fa-circle-question mr-0.5"></i>採点基準</button>
                </div>

                <!-- おすすめ理由＆注意点 -->
                <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div class="space-y-1">
                    <div class="flex flex-wrap gap-1.5">
                      ${d.reasons.map(r => `<span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"><i class="fa-solid fa-check"></i>${r}</span>`).join('')}
                    </div>
                    ${d.warnings.length > 0 ? `<div class="text-[11px] text-amber-700 font-semibold"><i class="fa-solid fa-circle-info mr-1"></i>${d.warnings[0]}</div>` : ''}
                  </div>

                  <button onclick="toggleCompareItem('${d.id}')" class="px-3 py-1.5 rounded-xl text-xs font-bold border transition shrink-0 ${inCompare ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'}">
                    <i class="fa-solid ${inCompare ? 'fa-check' : 'fa-plus'} mr-1"></i>${inCompare ? '比較リスト追加済' : '比較リストに追加'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // 同一シリーズ・同一メーカー内のティア上下比較インサイト（iPhoneとAndroidが混ざる不自然な比較を廃止）
    function renderTierInsight(topDevice) {
      const box = document.getElementById('tier-insight-box');
      if (!topDevice) {
        box.classList.add('hidden');
        box.innerHTML = '';
        return;
      }

      const prioFoldable = document.getElementById('prio-foldable')?.checked || false;
      // 必ず「1位の機種と同じメーカー・同じシリーズ内」から比較候補を探す
      const sameMakerDevices = DEVICES.filter(d => {
        if (d.maker !== topDevice.maker || d.id === topDevice.id) return false;
        const isFold = Boolean(d.isFoldable || (d.design && (d.design.style === 'fold-book' || d.design.style === 'flip-clamshell')));
        if (!prioFoldable && isFold) return false;
        return true;
      }).sort((a, b) => a.price - b.price);

      if (sameMakerDevices.length === 0) {
        box.classList.add('hidden');
        box.innerHTML = '';
        return;
      }
      box.classList.remove('hidden');

      // 同メーカー内で1位機種より上位（高価格/上位ティア）の直近モデルと、下位（低価格/下位ティア）の直近モデルを取得
      const higherModel = sameMakerDevices.find(d => d.price > topDevice.price);
      const lowerModels = sameMakerDevices.filter(d => d.price < topDevice.price);
      const lowerModel = lowerModels.length > 0 ? lowerModels[lowerModels.length - 1] : null;

      // 比較対象（上位と下位の両方、またはどちらか）を組み立て
      const compareTargets = [higherModel, lowerModel].filter(Boolean);
      const presetIds = [topDevice.id, ...compareTargets.map(c => c.id)];

      box.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center text-sm shadow-sm shrink-0">
              <i class="fa-solid fa-layer-group"></i>
            </span>
            <div>
              <h4 class="text-sm sm:text-base font-extrabold text-slate-900">
                【${topDevice.maker} シリーズ内比較】「${topDevice.name}」と上位・下位モデルの違い
              </h4>
              <p class="text-xs text-slate-600">
                同じ <strong>${topDevice.maker}</strong> の中でグレードを1つ上げた場合／下げた場合の「価格差・望遠カメラ・GPU性能」の比較です
              </p>
            </div>
          </div>
          <button onclick="loadPreset([${presetIds.map(id => `'${id}'`).join(', ')}])" class="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition shrink-0 shadow-sm">
            同シリーズで横並び比較 <i class="fa-solid fa-arrow-right ml-1"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 ${compareTargets.length === 2 ? 'md:grid-cols-2' : ''} gap-3 text-xs">
          ${compareTargets.map(target => {
            const isHigher = target.price > topDevice.price;
            const diff = Math.abs(target.price - topDevice.price);
            const gpuTop = Math.round((topDevice.antutuGpuScore || 0) / 10000);
            const gpuTarget = Math.round((target.antutuGpuScore || 0) / 10000);
            return `
              <div class="bg-white/95 rounded-xl p-3.5 border ${isHigher ? 'border-amber-300' : 'border-indigo-200'} space-y-2">
                <div class="flex items-center justify-between border-b border-slate-100 pb-1.5">
                  <div class="flex items-center gap-1.5">
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold ${isHigher ? 'bg-amber-500 text-slate-950' : 'bg-indigo-600 text-white'}">
                      ${isHigher ? '▲ 1ランク上の同シリーズ' : '▼ 1ランク下の同シリーズ'}
                    </span>
                    <span class="font-extrabold text-slate-900 text-sm">${target.name}</span>
                  </div>
                  <span class="font-extrabold text-xs ${isHigher ? 'text-amber-700' : 'text-emerald-700'}">
                    ${isHigher ? `+${diff.toLocaleString()}円` : `-${diff.toLocaleString()}円`}
                  </span>
                </div>
                <div class="grid grid-cols-3 gap-2 pt-0.5">
                  <div>
                    <span class="text-[10px] text-slate-400 font-bold block">定価比較</span>
                    <span class="font-bold text-slate-800">${target.price.toLocaleString()}円</span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 font-bold block">望遠カメラ有無</span>
                    <span class="font-bold ${target.hasTelephoto ? 'text-amber-700' : 'text-slate-600'}">
                      ${target.hasTelephoto ? `専用光学${target.telephotoZoom}倍` : '専用なし(クロップ)'}
                    </span>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 font-bold block">GPU / 画面Hz</span>
                    <span class="font-bold text-indigo-700">GPU ${gpuTarget}万 / ${target.refreshRate}Hz</span>
                  </div>
                </div>
                <div class="text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg">
                  ${isHigher
                    ? `<i class="fa-solid fa-circle-plus text-amber-600 mr-1"></i><strong>+${diff.toLocaleString()}円</strong>で、${target.hasTelephoto && !topDevice.hasTelephoto ? `<strong>専用光学${target.telephotoZoom}倍望遠カメラ</strong>が追加され、` : ''}GPUが${gpuTop}万→<strong>${gpuTarget}万点</strong>（RAM ${target.ram}GB）になります。`
                    : `<i class="fa-solid fa-piggy-bank text-emerald-600 mr-1"></i><strong>${diff.toLocaleString()}円安く</strong>抑えられますが、${topDevice.hasTelephoto && !target.hasTelephoto ? '専用望遠カメラが省かれ、' : ''}GPUは${gpuTop}万→<strong>${gpuTarget}万点</strong>（画面${target.refreshRate}Hz）になります。`
                  }
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    function resetSimulator() {
      selectedCarriers = ['ALL'];
      selectedMakers = Array.from(new Set([...MAKERS, ...DEVICES.map(d => d.maker)]));
      document.getElementById('sim-budget-range').value = 140000;
      if (document.getElementById('strict-budget-toggle')) document.getElementById('strict-budget-toggle').checked = true;
      document.querySelector('input[name="sim-game"][value="light"]').checked = true;
      document.querySelector('input[name="sim-camera"][value="good"]').checked = true;
      document.getElementById('prio-battery').checked = true;
      document.getElementById('prio-cost').checked = true;
      document.getElementById('prio-light').checked = false;
      document.getElementById('prio-rom').checked = false;
      if (document.getElementById('prio-senior')) document.getElementById('prio-senior').checked = false;
      if (document.getElementById('prio-foldable')) document.getElementById('prio-foldable').checked = false;
      toggleSimCarrier('ALL');
      initMakerChips();
      updateSimulator();
      showToast('診断条件を初期状態にリセットしました');
    }

    function openRubricModal() {
      document.getElementById('rubric-modal').classList.remove('hidden');
    }

    function closeRubricModal() {
      document.getElementById('rubric-modal').classList.add('hidden');
    }

    function compareTop3() {
      const cards = document.querySelectorAll('#sim-results-container h4');
      const names = Array.from(cards).map(el => el.textContent.trim());
      const ids = names.map(name => DEVICES.find(d => d.name === name)?.id).filter(Boolean);
      if (ids.length > 0) {
        compareList = ids.slice(0, 10);
        updateCompareBadges();
        switchTab('compare');
        showToast(`診断上位${compareList.length}機種を横並び比較にセットしました`);
      }
    }

    // ==========================================
    // TAB 2: 全機種カタログ描画（製品追加・削除ボタン付き）
    // ==========================================
    function renderCatalog() {
      const tierFilter = document.getElementById('cat-filter-tier').value;
      const makerFilter = document.getElementById('cat-filter-maker').value;
      const carrierFilter = document.getElementById('cat-filter-carrier').value;
      const keyword = (document.getElementById('cat-search-input')?.value || '').trim().toLowerCase();

      const filtered = DEVICES.filter(d => {
        if (tierFilter !== 'ALL' && d.tier !== tierFilter) return false;
        if (makerFilter !== 'ALL' && d.maker !== makerFilter) return false;
        if (carrierFilter !== 'ALL' && !d.carriers.includes(carrierFilter)) return false;
        if (keyword) {
          const targetText = `${d.name} ${d.maker} ${d.cpu} ${d.cameraText} ${d.otherText}`.toLowerCase();
          if (!targetText.includes(keyword)) return false;
        }
        return true;
      });

      const catBadge = document.getElementById('catalog-count-badge');
      if (catBadge) catBadge.textContent = `${filtered.length} / ${DEVICES.length}機種`;

      const grid = document.getElementById('catalog-grid');
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <p class="text-sm font-bold text-slate-600">該当するスマートフォンが見つかりませんでした。</p>
            <button onclick="openAddDeviceModal()" class="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold">
              <i class="fa-solid fa-plus mr-1"></i>新しい製品を追加する
            </button>
          </div>
        `;
        return;
      }

      grid.innerHTML = filtered.map(d => {
        const tierMeta = TIER_INFO[d.tier] || TIER_INFO.Middle;
        const inCompare = compareList.includes(d.id);
        const isFold = Boolean(d.isFoldable || (d.design && (d.design.style === 'fold-book' || d.design.style === 'flip-clamshell')));
        return `
          <div class="bg-white rounded-2xl border border-slate-200 p-4 phone-card-shadow flex flex-col justify-between space-y-3 hover:border-indigo-300 transition">
            <div>
              <!-- 上部バッジ（メーカー＆ティア＆折りたたみ） -->
              <div class="flex items-center justify-between gap-1.5 mb-2 flex-wrap">
                <div class="flex items-center gap-1">
                  <span class="text-xs font-extrabold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">${d.brand || d.maker}</span>
                  ${isFold ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">折りたたみ</span>` : ''}
                </div>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-extrabold tier-badge-${d.tier}">${tierMeta.label}</span>
              </div>

              <!-- 端末本体画像＋差し替えボタン -->
              <div class="relative bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center border border-slate-100 group">
                ${getDeviceVisualHtml(d, 'w-28 h-32')}
                <button onclick="openImageModal('${d.id}')" class="mt-2 px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 text-[11px] font-bold transition flex items-center gap-1 shadow-sm">
                  <i class="fa-solid fa-camera"></i> 画像変更・差込
                </button>
              </div>

              <!-- 機種名・定価 -->
              <div class="mt-3">
                <h3 class="text-base font-extrabold text-slate-900">${d.name}</h3>
                <p class="text-xs font-bold text-indigo-600 mt-0.5">SIMフリー定価: ${d.price.toLocaleString()}円〜</p>
              </div>

              <!-- キャリアバッジ -->
              <div class="flex flex-wrap gap-1 mt-2">
                ${Object.keys(CARRIER_INFO).map(cKey => {
                  const has = d.carriers.includes(cKey);
                  const cMeta = CARRIER_INFO[cKey];
                  return has
                    ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold border ${cMeta.bg}">${cMeta.short}</span>`
                    : `<span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-50 text-slate-300 border border-slate-100">${cMeta.short}</span>`;
                }).join('')}
              </div>

              <!-- スペック要点 -->
              <div class="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                <div class="flex justify-between"><span class="text-slate-400">ROM / RAM:</span><span class="font-bold text-slate-800">${d.rom.map(r => r >= 1024 ? (r / 1024) + 'TB' : r).join('/')}GB / ${d.ram}GB</span></div>
                <div class="flex justify-between"><span class="text-slate-400">microSD:</span><span class="font-bold ${d.sdCard && d.sdCard.startsWith('対応') ? 'text-emerald-700' : 'text-slate-500'}">${d.sdCard || '非対応'}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">CPU:</span><span class="font-bold text-slate-800 truncate max-w-[150px]" title="${d.cpu}">${d.cpu}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">うちGPU(3D性能):</span><span class="font-extrabold text-indigo-600">${(d.antutuGpuScore || 0).toLocaleString()}点 (★${d.scores.game.toFixed(1)})</span></div>
                <div class="flex justify-between"><span class="text-slate-400">画面(inch/Hz):</span><span class="font-bold text-slate-800 truncate max-w-[155px]" title="${d.displayText}">${(d.displayText || '').split('(')[0]} (${d.refreshRate}Hz)</span></div>
                <div class="flex justify-between"><span class="text-slate-400">防水 / 認証:</span><span class="font-bold text-slate-700 truncate max-w-[155px]" title="${d.waterproof} / ${d.biometrics}">${(d.waterproof || 'IP68').split(' ')[0]} / ${(d.biometrics || '').split(' ')[0]}</span></div>
                <div class="flex justify-between"><span class="text-slate-400">寸法 / 重量:</span><span class="font-bold text-slate-800 truncate max-w-[155px]" title="${d.dimensions}">${d.weight}g (${(d.dimensions || '').split('/')[0].replace('約', '')})</span></div>
              </div>
            </div>

            <div class="flex gap-1.5">
              <button onclick="toggleCompareItem('${d.id}')" class="flex-grow py-2 rounded-xl text-xs font-bold border transition ${inCompare ? 'bg-slate-900 text-white border-slate-900' : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'}">
                <i class="fa-solid ${inCompare ? 'fa-check' : 'fa-scale-balanced'} mr-1"></i>${inCompare ? '比較リスト選択中' : '横並び比較に追加'}
              </button>
              <button onclick="requestDeleteDevice('${d.id}')" class="px-3 py-2 rounded-xl text-xs font-bold border border-rose-200 text-rose-600 hover:bg-rose-50 transition flex items-center gap-1 shrink-0" title="この製品をカタログから削除">
                <i class="fa-solid fa-trash-can"></i><span>削除</span>
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    // ==========================================
    // 新規製品の追加＆製品削除＆初期化ロジック
    // ==========================================
    function openAddDeviceModal() {
      document.getElementById('add-device-modal').classList.remove('hidden');
    }

    function closeAddDeviceModal() {
      document.getElementById('add-device-modal').classList.add('hidden');
    }

    function submitNewDevice(event) {
      event.preventDefault();

      const maker = document.getElementById('new-maker').value;
      const name = document.getElementById('new-name').value.trim();
      const tier = document.getElementById('new-tier').value;
      const price = parseInt(document.getElementById('new-price').value, 10) || 69800;
      const romRaw = document.getElementById('new-rom').value;
      const rom = romRaw.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n > 0);
      if (rom.length === 0) rom.push(128);

      const ram = parseInt(document.getElementById('new-ram').value, 10) || 8;
      const sdCard = document.getElementById('new-sd')?.value.trim() || '非対応';
      const dimensions = document.getElementById('new-dimensions')?.value.trim() || '約153.0 × 72.0 × 8.2 mm';
      const weight = parseInt(document.getElementById('new-weight').value, 10) || 185;
      const waterproof = document.getElementById('new-waterproof')?.value.trim() || 'IP68 (防水防塵)';
      const biometrics = document.getElementById('new-biometrics')?.value.trim() || '指紋認証 ＋ 顔認証';
      const cpu = document.getElementById('new-cpu').value.trim() || 'Snapdragon SoC';
      const antutuScore = parseInt(document.getElementById('new-antutu-score')?.value, 10) || 1440357;
      const antutuGpuScore = parseInt(document.getElementById('new-antutu-gpu')?.value, 10) || Math.round(antutuScore * 0.25);
      const refreshRate = parseInt(document.getElementById('new-refresh-rate')?.value, 10) || 120;
      const brightness = parseInt(document.getElementById('new-brightness')?.value, 10) || 2000;
      const displayText = document.getElementById('new-display-text')?.value.trim() || `6.5 inch 有機EL (${refreshRate}Hz / ピーク輝度 ${brightness}nits)`;
      const telephotoZoom = parseFloat(document.getElementById('new-zoom').value) || 1.0;

      const carrierCheckboxes = document.querySelectorAll('input[name="new-carrier"]:checked');
      const carriers = Array.from(carrierCheckboxes).map(cb => cb.value);

      const scores = {
        cpu: parseFloat(document.getElementById('new-score-cpu').value) || 4.0,
        game: parseFloat(document.getElementById('new-score-game').value) || 4.0,
        camera: parseFloat(document.getElementById('new-score-camera').value) || 4.0,
        telephoto: parseFloat(document.getElementById('new-score-telephoto')?.value) || (telephotoZoom >= 3.0 ? 4.5 : 2.5),
        battery: parseFloat(document.getElementById('new-score-battery').value) || 4.0,
        cost: parseFloat(document.getElementById('new-score-cost').value) || 4.0
      };

      const cameraText = document.getElementById('new-camera-text').value.trim() || '高画質カメラ搭載';
      const batteryText = document.getElementById('new-battery-text').value.trim() || '長時間バッテリー搭載';
      const gameText = document.getElementById('new-game-text').value.trim() || '快適なゲーム動作';
      const otherText = document.getElementById('new-other-text').value.trim() || '防水防塵 / おサイフケータイ対応';

      const style = document.getElementById('new-design-style').value;
      const bodyColor = document.getElementById('new-body-color').value || '#4f46e5';
      const imageUrl = document.getElementById('new-image-url').value.trim();

      const newId = 'custom_' + Date.now();
      const newDevice = enrichTelephotoSpec({
        id: newId,
        maker,
        brand: maker,
        name,
        tier,
        price,
        rom,
        ram,
        sdCard,
        cpu,
        antutuScore,
        antutuGpuScore,
        antutu: `${antutuScore.toLocaleString()}点 (うちGPU: ${Math.round(antutuGpuScore / 10000)}万点 / AnTuTu公式基準)`,
        refreshRate,
        brightness,
        displayText,
        cameraText,
        telephotoZoom,
        hasTelephoto: telephotoZoom >= 2.8 || scores.telephoto >= 4.0,
        batteryText,
        gameText,
        waterproof,
        biometrics,
        felica: otherText.includes('非対応') ? '非対応' : '対応 (おサイフケータイ)',
        dimensions,
        otherText,
        weight,
        carriers,
        scores,
        isFoldable: style === 'fold-book' || style === 'flip-clamshell',
        isSenior: maker === 'シニアスマホ' || style === 'senior-phone',
        design: {
          style,
          bodyColor,
          accentColor: '#94a3b8',
          screenColor: '#0f172a'
        }
      });

      // 先頭に追加
      DEVICES.unshift(newDevice);
      if (imageUrl) {
        customDeviceImages[newId] = imageUrl;
        saveImagesToStorage();
      }
      if (!selectedMakers.includes(maker)) {
        selectedMakers.push(maker);
      }

      saveDevicesToStorage();
      initMakerChips();
      initCatalogFilterMakerSelect();
      initCompareSelect();
      updateSimulator();
      renderCatalog();
      renderComparisonTable();
      closeAddDeviceModal();
      document.getElementById('new-name').value = '';
      document.getElementById('new-image-url').value = '';
      showToast(`「${name}」を追加しました`);
    }

    // 製品の削除確認モーダルを開く
    function requestDeleteDevice(deviceId) {
      if (DEVICES.length <= 1) {
        showToast('最低1機種は残す必要があります');
        return;
      }
      const target = DEVICES.find(d => d.id === deviceId);
      if (!target) return;

      document.getElementById('confirm-modal-title').textContent = `「${target.name}」を削除しますか？`;
      document.getElementById('confirm-modal-desc').textContent = '一覧・診断・比較候補からこの製品を削除します。（「初期ラインナップに戻す」ボタンでいつでも復元可能です）';
      const okBtn = document.getElementById('confirm-modal-ok-btn');
      okBtn.textContent = '削除する';
      okBtn.onclick = function () {
        executeDeleteDevice(deviceId);
        closeConfirmModal();
      };
      document.getElementById('confirm-action-modal').classList.remove('hidden');
    }

    function executeDeleteDevice(deviceId) {
      const target = DEVICES.find(d => d.id === deviceId);
      DEVICES = DEVICES.filter(d => d.id !== deviceId);
      compareList = compareList.filter(id => id !== deviceId);
      if (compareList.length === 0 && DEVICES.length > 0) {
        compareList.push(DEVICES[0].id);
      }

      saveDevicesToStorage();
      updateCompareBadges();
      initMakerChips();
      initCatalogFilterMakerSelect();
      initCompareSelect();
      updateSimulator();
      renderCatalog();
      renderComparisonTable();
      showToast(`「${target ? target.name : '製品'}」を削除しました`);
    }

    // 初期45機種への復元モーダル
    function openResetMasterModal() {
      document.getElementById('confirm-modal-title').textContent = '初期ラインナップ（全45機種）に戻しますか？';
      document.getElementById('confirm-modal-desc').textContent = '追加または削除した製品データをリセットし、初期設定の全45機種をすべて復元します。';
      const okBtn = document.getElementById('confirm-modal-ok-btn');
      okBtn.textContent = '初期データに戻す';
      okBtn.onclick = function () {
        DEVICES = JSON.parse(JSON.stringify(INITIAL_DEVICES)).map(enrichTelephotoSpec);
        selectedMakers = [...MAKERS];
        compareList = ['iphone_17', 'iphone_18_pro', 'pixel_11'];
        saveDevicesToStorage();
        updateCompareBadges();
        initMakerChips();
        initCatalogFilterMakerSelect();
        initCompareSelect();
        updateSimulator();
        renderCatalog();
        renderComparisonTable();
        closeConfirmModal();
        showToast('初期ラインナップ（全45機種）を復元しました');
      };
      document.getElementById('confirm-action-modal').classList.remove('hidden');
    }

    function closeConfirmModal() {
      document.getElementById('confirm-action-modal').classList.add('hidden');
    }

    // ==========================================
    // TAB 3: 横並び比較テーブル＆レーダーチャート
    // ==========================================
    function initCompareSelect() {
      const sel = document.getElementById('add-compare-select');
      sel.innerHTML = DEVICES.map(d => `<option value="${d.id}">[${TIER_INFO[d.tier].label}] ${d.maker} / ${d.name} (${d.price.toLocaleString()}円)</option>`).join('');
    }

    function updateCompareBadges() {
      document.getElementById('nav-compare-badge').textContent = compareList.length;
      document.getElementById('mobile-compare-count').textContent = compareList.length;
      const panelBadge = document.getElementById('compare-panel-count-badge');
      if (panelBadge) panelBadge.textContent = `${compareList.length} / 10台`;
    }

    function toggleCompareItem(deviceId) {
      if (compareList.includes(deviceId)) {
        if (compareList.length <= 1) {
          showToast('比較表には最低1台の端末が必要です');
          return;
        }
        compareList = compareList.filter(id => id !== deviceId);
        showToast('比較リストから外しました');
      } else {
        if (compareList.length >= 10) {
          showToast('同時比較は最大10機種までです（先頭の機種を入れ替えました）');
          compareList.shift();
        }
        compareList.push(deviceId);
        showToast(`比較リストに追加しました（現在${compareList.length}台）`);
      }
      updateCompareBadges();
      updateSimulator();
      renderCatalog();
      renderComparisonTable();
    }

    function addSelectedToCompare() {
      const id = document.getElementById('add-compare-select').value;
      if (!compareList.includes(id)) {
        toggleCompareItem(id);
      } else {
        showToast('すでに比較リストに入っています');
      }
    }

    function loadPreset(ids) {
      const validIds = ids.filter(id => DEVICES.some(d => d.id === id));
      if (validIds.length === 0) {
        showToast('対象のプリセット端末が削除されています。「初期ラインナップに戻す」で復元できます');
        return;
      }
      compareList = validIds.slice(0, 10);
      updateCompareBadges();
      switchTab('compare');
      showToast(`比較プリセット（${compareList.length}機種）を読み込みました`);
    }

    function renderComparisonTable() {
      const tbody = document.getElementById('compare-table-body');
      const highlightBest = document.getElementById('highlight-best-toggle').checked;
      const items = compareList.map(id => DEVICES.find(d => d.id === id)).filter(Boolean);

      if (items.length === 0) {
        tbody.innerHTML = `<tr><td class="p-6 text-center text-slate-500">比較する端末を選択してください。</td></tr>`;
        return;
      }

      // 最優秀値算出（ハイライト用）
      const minPrice = Math.min(...items.map(d => d.price));
      const maxRam = Math.max(...items.map(d => d.ram));
      const maxRom = Math.max(...items.map(d => Math.max(...d.rom)));
      const maxCpu = Math.max(...items.map(d => d.scores.cpu));
      const maxAntutu = Math.max(...items.map(d => d.antutuScore || 0));
      const maxGpu = Math.max(...items.map(d => d.antutuGpuScore || 0));
      const maxRefresh = Math.max(...items.map(d => d.refreshRate || 60));
      const maxBrightness = Math.max(...items.map(d => d.brightness || 1000));
      const maxGame = Math.max(...items.map(d => d.scores.game));
      const maxCam = Math.max(...items.map(d => d.scores.camera));
      const maxTeleScore = Math.max(...items.map(d => d.scores.telephoto || 2.5));
      const maxZoom = Math.max(...items.map(d => d.telephotoZoom));
      const maxBat = Math.max(...items.map(d => d.scores.battery));
      const minWeight = Math.min(...items.map(d => d.weight));

      const bestClass = 'bg-amber-50/90 font-extrabold text-slate-900 ring-1 ring-inset ring-amber-300';

      const rows = [
        // ヘッダー行（端末画像・機種名・削除ボタン）
        `
        <tr class="bg-slate-50/80">
          <th class="p-4 w-44 font-extrabold text-slate-700 align-middle">端末ビジュアル<br><span class="text-[11px] font-normal text-slate-400">画像差替にも対応</span></th>
          ${items.map(d => {
            const isFold = Boolean(d.isFoldable || (d.design && (d.design.style === 'fold-book' || d.design.style === 'flip-clamshell')));
            return `
            <td class="p-4 text-center align-top min-w-[210px]">
              <div class="flex flex-col items-center">
                <div class="flex items-center justify-between w-full mb-2">
                  <div class="flex items-center gap-1">
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold tier-badge-${d.tier}">${TIER_INFO[d.tier].label}</span>
                    ${isFold ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-900 border border-purple-300">折りたたみ</span>` : ''}
                  </div>
                  <button onclick="toggleCompareItem('${d.id}')" class="text-slate-400 hover:text-rose-600 text-xs" title="比較から外す">
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <div class="bg-white rounded-xl p-2 border border-slate-200 shadow-sm">
                  ${getDeviceVisualHtml(d, 'w-24 h-28')}
                </div>
                <button onclick="openImageModal('${d.id}')" class="mt-1.5 text-[11px] font-bold text-indigo-600 hover:underline">
                  <i class="fa-solid fa-camera mr-0.5"></i>画像変更
                </button>
                <div class="text-xs font-bold text-slate-500 mt-1">${d.brand || d.maker}</div>
                <div class="text-base font-extrabold text-slate-900">${d.name}</div>
              </div>
            </td>
          `}).join('')}
        </tr>
        `,
        // メーカー（ブランド）・シリーズ区分
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">メーカー / シリーズ</th>
          ${items.map(d => {
            const isFold = Boolean(d.isFoldable || (d.design && (d.design.style === 'fold-book' || d.design.style === 'flip-clamshell')));
            return `
            <td class="p-3.5">
              <div class="font-extrabold text-slate-900">${d.brand || d.maker} <span class="text-xs font-semibold text-slate-500">(${d.maker})</span></div>
              <div class="text-[11px] text-slate-500 mt-0.5">
                ${isFold ? '<span class="text-purple-700 font-bold"><i class="fa-solid fa-book-open mr-1"></i>折りたたみスマートフォン (Fold / Flip)</span>' : 'ストレート型スマートフォン'}
              </div>
            </td>
          `}).join('')}
        </tr>
        `,
        // 5キャリア取扱状況
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">5キャリア取扱状況</th>
          ${items.map(d => `
            <td class="p-3.5">
              <div class="flex flex-wrap gap-1">
                ${Object.keys(CARRIER_INFO).map(cKey => {
                  const has = d.carriers.includes(cKey);
                  const cMeta = CARRIER_INFO[cKey];
                  return has
                    ? `<span class="px-2 py-0.5 rounded text-[11px] font-bold border ${cMeta.bg}">${cMeta.label}</span>`
                    : `<span class="px-2 py-0.5 rounded text-[11px] bg-slate-50 text-slate-300 border border-slate-100 line-through">${cMeta.short}</span>`;
                }).join('')}
              </div>
            </td>
          `).join('')}
        </tr>
        `,
        // SIMフリー定価
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">SIMフリー定価価格<br><span class="text-[10px] font-normal text-slate-400">メーカー公式税込価格</span></th>
          ${items.map(d => `
            <td class="p-3.5 ${highlightBest && d.price === minPrice ? bestClass : ''}">
              <div class="text-base font-extrabold text-indigo-700">${d.price.toLocaleString()}円〜</div>
              ${highlightBest && d.price === minPrice ? `<span class="text-[10px] text-amber-700 font-bold"><i class="fa-solid fa-crown mr-1"></i>最安モデル</span>` : ''}
            </td>
          `).join('')}
        </tr>
        `,
        // ROM（容量） / RAM / microSDカード対応
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">
            ROM / RAM / microSD<br>
            <span class="text-[11px] font-normal text-slate-500">本体容量・メモリ・SD拡張</span>
          </th>
          ${items.map(d => {
            const isBest = highlightBest && (d.ram === maxRam || Math.max(...d.rom) === maxRom);
            const hasSd = d.sdCard && d.sdCard.startsWith('対応');
            return `
              <td class="p-3.5 ${isBest ? bestClass : ''}">
                <div><span class="text-slate-400 text-xs">ROM:</span> <strong>${d.rom.map(r => r >= 1024 ? (r / 1024) + 'TB' : r + 'GB').join(' / ')}</strong></div>
                <div class="mt-0.5"><span class="text-slate-400 text-xs">RAM:</span> <strong>${d.ram}GB</strong></div>
                <div class="mt-1 pt-1 border-t border-slate-100 flex items-center gap-1 text-xs">
                  <span class="text-slate-400">microSD:</span>
                  <span class="px-1.5 py-0.5 rounded text-[11px] font-bold ${hasSd ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-500'}">
                    ${hasSd ? `<i class="fa-solid fa-sd-card mr-1"></i>${d.sdCard}` : '非対応'}
                  </span>
                </div>
              </td>
            `;
          }).join('')}
        </tr>
        `,
        // ディスプレイ（画面サイズ inch / リフレッシュレート / ピーク輝度）
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">
            ディスプレイ (inch)<br>
            <span class="text-[11px] font-normal text-slate-500">画面サイズ / Hz / ピーク輝度</span>
          </th>
          ${items.map(d => {
            const hz = d.refreshRate || 60;
            const nits = d.brightness || 1000;
            const isBestDisp = highlightBest && (hz === maxRefresh || nits === maxBrightness);
            return `
              <td class="p-3.5 ${isBestDisp ? bestClass : ''}">
                <div class="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <span class="px-2 py-0.5 rounded bg-indigo-600 text-white text-[11px] font-extrabold">
                    <i class="fa-solid fa-gauge-high mr-1"></i>最大 ${hz}Hz
                  </span>
                  <span class="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[11px] font-extrabold">
                    <i class="fa-solid fa-sun mr-1"></i>${nits.toLocaleString()} nits
                  </span>
                </div>
                <div class="text-xs font-semibold text-slate-800 leading-relaxed">${d.displayText || `6.5 inch (${hz}Hz駆動)`}</div>
                ${highlightBest && nits === maxBrightness ? `<div class="text-[10px] text-amber-700 font-bold mt-1"><i class="fa-solid fa-crown mr-1"></i>最高ピーク輝度 (${nits.toLocaleString()}nits)</div>` : ''}
                ${highlightBest && hz === maxRefresh && maxRefresh > 120 ? `<div class="text-[10px] text-indigo-700 font-bold mt-0.5"><i class="fa-solid fa-bolt mr-1"></i>最高リフレッシュレート (${hz}Hz)</div>` : ''}
              </td>
            `;
          }).join('')}
        </tr>
        `,
        // CPU (SoC) & AnTuTu公式ベンチマーク
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">
            CPU (SoC) / ベンチマーク<br>
            <span class="text-[11px] font-normal text-slate-500">総合スコア ＆ <strong class="text-indigo-700">GPU単体スコア</strong></span><br>
            <a href="https://www.antutu.com/web" target="_blank" rel="noopener noreferrer" class="text-[10px] font-normal text-indigo-600 hover:underline inline-flex items-center gap-0.5 mt-0.5">
              出典: AnTuTu公式 <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
            </a>
          </th>
          ${items.map(d => {
            const scoreVal = d.antutuScore || 0;
            const gpuVal = d.antutuGpuScore || 0;
            const barWidth = Math.min(100, Math.max(10, Math.round((scoreVal / 4000000) * 100)));
            const gpuBarWidth = Math.min(100, Math.max(8, Math.round((gpuVal / 1500000) * 100)));
            const isBestCpu = highlightBest && (scoreVal === maxAntutu || gpuVal === maxGpu);
            return `
              <td class="p-3.5 ${isBestCpu ? bestClass : ''}">
                <div class="font-bold text-slate-900">${d.cpu}</div>
                <div class="mt-1.5 flex items-center justify-between text-xs">
                  <span class="font-bold text-slate-700">総合: ${scoreVal.toLocaleString()}点</span>
                  <span class="text-[11px] font-bold text-slate-600">CPU ★${d.scores.cpu.toFixed(1)}</span>
                </div>
                <div class="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden my-1">
                  <div class="h-full bg-slate-500 rounded-full" style="width: ${barWidth}%"></div>
                </div>
                <div class="mt-1.5 flex items-center justify-between text-xs">
                  <span class="font-extrabold text-indigo-700"><i class="fa-solid fa-gamepad mr-1"></i>GPU: ${gpuVal.toLocaleString()}点</span>
                  ${highlightBest && gpuVal === maxGpu ? '<span class="text-[10px] text-amber-700 font-extrabold">最高GPU</span>' : ''}
                </div>
                <div class="w-full h-1.5 bg-indigo-100 rounded-full overflow-hidden my-1">
                  <div class="h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full" style="width: ${gpuBarWidth}%"></div>
                </div>
                <div class="text-[11px] text-slate-500 leading-snug mt-1">${d.antutu}</div>
              </td>
            `;
          }).join('')}
        </tr>
        `,
        // ゲーム性能
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">
            ゲーム実効性能<br>
            <button onclick="openRubricModal()" class="text-[10px] font-bold text-indigo-600 hover:underline mt-0.5"><i class="fa-solid fa-circle-question mr-0.5"></i>★採点基準(GPU×Hz×放熱)</button>
          </th>
          ${items.map(d => `
            <td class="p-3.5 ${highlightBest && d.scores.game === maxGame ? bestClass : ''}">
              <div class="flex items-center justify-between mb-1">
                <span class="font-extrabold text-indigo-600">${'★'.repeat(Math.floor(d.scores.game))} (${d.scores.game.toFixed(1)} / 5.0)</span>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">GPU約${Math.round((d.antutuGpuScore || 0) / 10000)}万点</span>
              </div>
              <div class="text-xs text-slate-600 leading-relaxed">${d.gameText}</div>
            </td>
          `).join('')}
        </tr>
        `,
        // メインカメラ性能
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">メインカメラ画質<br><span class="text-[11px] font-normal text-slate-500">広角・超広角・センサー</span></th>
          ${items.map(d => `
            <td class="p-3.5 ${highlightBest && d.scores.camera === maxCam ? bestClass : ''}">
              <div class="flex items-center gap-2 mb-1">
                <span class="font-extrabold text-indigo-600">★${d.scores.camera.toFixed(1)} / 5.0</span>
              </div>
              <div class="text-xs text-slate-600 leading-relaxed">${d.cameraText}</div>
            </td>
          `).join('')}
        </tr>
        `,
        // 望遠カメラ（専用光学レンズ有無・光学倍率）独立評価行
        `
        <tr>
          <th class="p-3.5 bg-indigo-50/40 font-extrabold text-indigo-950">
            望遠カメラ性能<br>
            <span class="text-[11px] font-normal text-indigo-700">専用光学レンズ有無・倍率</span>
          </th>
          ${items.map(d => {
            const tScore = d.scores.telephoto || 2.5;
            const isBestTele = highlightBest && (tScore === maxTeleScore && d.telephotoZoom === maxZoom && d.hasTelephoto);
            return `
              <td class="p-3.5 ${isBestTele ? bestClass : ''}">
                <div class="flex flex-wrap items-center gap-1.5 mb-1">
                  <span class="font-extrabold text-indigo-600">★${tScore.toFixed(1)} / 5.0</span>
                  ${d.hasTelephoto
                    ? `<span class="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[11px] font-extrabold"><i class="fa-solid fa-check mr-1"></i>専用望遠あり (光学${d.telephotoZoom}倍)</span>`
                    : `<span class="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[11px] font-bold">専用望遠なし (${d.telephotoZoom >= 2 ? '2倍クロップ' : '1.0倍'})</span>`
                  }
                </div>
                <div class="text-xs text-slate-600 leading-relaxed">
                  ${d.hasTelephoto
                    ? `専用の光学${d.telephotoZoom}倍望遠レンズを搭載。遠くの被写体も画質劣化なく高精細に撮影可能。`
                    : `専用の望遠レンズは非搭載（${d.telephotoZoom >= 2 ? 'メイン高画素センサーの中央切り出しによる2倍ズームまで対応' : 'デジタルズームのみ'}）。`
                  }
                </div>
              </td>
            `;
          }).join('')}
        </tr>
        `,
        // 電池持ち
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">電池持ち・充電</th>
          ${items.map(d => `
            <td class="p-3.5 ${highlightBest && d.scores.battery === maxBat ? bestClass : ''}">
              <div class="font-extrabold text-emerald-600 mb-0.5">★${d.scores.battery.toFixed(1)} / 5.0</div>
              <div class="text-xs text-slate-600 leading-relaxed">${d.batteryText}</div>
            </td>
          `).join('')}
        </tr>
        `,
        // 防水防塵性能
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">
            防水・防塵性能<br>
            <span class="text-[11px] font-normal text-slate-500">IP保護等級・耐衝撃</span>
          </th>
          ${items.map(d => {
            const wp = d.waterproof || 'IP68';
            const isHighWp = wp.includes('IP68') || wp.includes('IP69');
            return `
              <td class="p-3.5">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-extrabold ${isHighWp ? 'bg-sky-100 text-sky-900 border border-sky-200' : 'bg-slate-100 text-slate-700'}">
                  <i class="fa-solid fa-droplet"></i> ${wp}
                </span>
              </td>
            `;
          }).join('')}
        </tr>
        `,
        // 生体認証
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">
            生体認証<br>
            <span class="text-[11px] font-normal text-slate-500">指紋認証 / 顔認証</span>
          </th>
          ${items.map(d => {
            const bio = d.biometrics || '指紋認証 ＋ 顔認証';
            const hasBoth = bio.includes('指紋') && bio.includes('顔') && !bio.includes('顔認証なし') && !bio.includes('Face ID非搭載');
            return `
              <td class="p-3.5">
                <div class="font-bold text-xs ${hasBoth ? 'text-emerald-800' : 'text-slate-800'}">
                  <i class="fa-solid fa-fingerprint mr-1 text-indigo-600"></i>${bio}
                </div>
                ${hasBoth ? `<span class="text-[10px] text-emerald-600 font-bold">指紋＋顔のW対応</span>` : ''}
              </td>
            `;
          }).join('')}
        </tr>
        `,
        // FeliCa（おサイフケータイ）
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">
            FeliCa (おサイフケータイ)<br>
            <span class="text-[11px] font-normal text-slate-500">交通系IC・タッチ決済</span>
          </th>
          ${items.map(d => {
            const fel = d.felica || '対応 (おサイフケータイ)';
            const isOk = !fel.startsWith('非対応');
            return `
              <td class="p-3.5">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-extrabold ${isOk ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-200'}">
                  <i class="fa-solid ${isOk ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> ${fel}
                </span>
              </td>
            `;
          }).join('')}
        </tr>
        `,
        // 本体サイズ（寸法と重量）
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">
            本体サイズ（寸法と重量）<br>
            <span class="text-[11px] font-normal text-slate-500">高さ × 幅 × 厚さ mm / 重量 g</span>
          </th>
          ${items.map(d => `
            <td class="p-3.5 ${highlightBest && d.weight === minWeight ? bestClass : ''}">
              <div class="text-xs font-semibold text-slate-800">${d.dimensions || '約150 × 72 × 8.0 mm'}</div>
              <div class="font-extrabold text-indigo-700 mt-1 text-sm">
                重量: 約${d.weight}g
                ${highlightBest && d.weight === minWeight ? '<span class="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded ml-1 font-extrabold"><i class="fa-solid fa-feather mr-0.5"></i>最軽量</span>' : ''}
              </div>
            </td>
          `).join('')}
        </tr>
        `,
        // その他特徴
        `
        <tr>
          <th class="p-3.5 bg-slate-50/50 font-bold text-slate-700">その他性能・特徴</th>
          ${items.map(d => `
            <td class="p-3.5">
              <div class="text-xs text-slate-600 leading-relaxed">${d.otherText}</div>
            </td>
          `).join('')}
        </tr>
        `
      ];

      tbody.innerHTML = rows.join('');
      drawRadarChart();
    }
    // 6軸レーダーチャート描画 (Canvas: CPU性能 / ゲーム / メインカメラ / 望遠カメラ / 電池持ち / 価格コスパ)
    function drawRadarChart() {
      const canvas = document.getElementById('compareRadarCanvas');
      if (!canvas) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const size = Math.min(rect.width || 300, 320);
      canvas.width = size * window.devicePixelRatio;
      canvas.height = size * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.34;
      const labels = ['CPU性能', 'ゲーム実力', 'メインカメラ', '望遠カメラ', '電池持ち', '価格コスパ'];
      const keys = ['cpu', 'game', 'camera', 'telephoto', 'battery', 'cost'];
      const axisCount = keys.length;

      ctx.clearRect(0, 0, size, size);

      // 背景グリッド（1〜5段階の六角形）
      for (let step = 1; step <= 5; step++) {
        const r = (radius / 5) * step;
        ctx.beginPath();
        for (let i = 0; i < axisCount; i++) {
          const angle = (Math.PI * 2 * i) / axisCount - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = step === 5 ? '#94a3b8' : '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 軸線とラベル
      ctx.font = 'bold 10.5px Inter, Noto Sans JP, sans-serif';
      ctx.fillStyle = '#334155';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < axisCount; i++) {
        const angle = (Math.PI * 2 * i) / axisCount - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
        ctx.strokeStyle = '#cbd5e1';
        ctx.stroke();

        const lx = cx + (radius + 24) * Math.cos(angle);
        const ly = cy + (radius + 20) * Math.sin(angle);
        ctx.fillText(labels[i], lx, ly);
      }

      // 各端末のポリゴン描画（最大10機種まで見分けられる10色パレット）
      const colors = [
        { stroke: '#4f46e5', fill: 'rgba(79, 70, 229, 0.14)' },
        { stroke: '#f59e0b', fill: 'rgba(245, 158, 11, 0.14)' },
        { stroke: '#10b981', fill: 'rgba(16, 185, 129, 0.14)' },
        { stroke: '#ec4899', fill: 'rgba(236, 72, 153, 0.14)' },
        { stroke: '#0ea5e9', fill: 'rgba(14, 165, 233, 0.14)' },
        { stroke: '#8b5cf6', fill: 'rgba(139, 92, 246, 0.14)' },
        { stroke: '#ef4444', fill: 'rgba(239, 68, 68, 0.14)' },
        { stroke: '#14b8a6', fill: 'rgba(20, 184, 166, 0.14)' },
        { stroke: '#f97316', fill: 'rgba(249, 115, 22, 0.14)' },
        { stroke: '#64748b', fill: 'rgba(100, 116, 139, 0.14)' }
      ];

      const items = compareList.map(id => DEVICES.find(d => d.id === id)).filter(Boolean);
      items.forEach((d, idx) => {
        const c = colors[idx % colors.length];
        ctx.beginPath();
        keys.forEach((k, i) => {
          const val = d.scores[k] || 3;
          const r = (radius / 5) * val;
          const angle = (Math.PI * 2 * i) / axisCount - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = c.fill;
        ctx.fill();
        ctx.strokeStyle = c.stroke;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      });

      // 凡例更新
      const legend = document.getElementById('radar-legend');
      legend.innerHTML = items.map((d, idx) => {
        const c = colors[idx % colors.length];
        return `
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full inline-block" style="background-color: ${c.stroke}"></span>
            <span class="text-slate-700">${d.name}</span>
          </div>
        `;
      }).join('');
    }

    // ==========================================
    // 端末本体画像の差し込み・カスタム管理モーダル
    // ==========================================
    function openImageModal(deviceId) {
      currentEditingDeviceId = deviceId;
      const device = DEVICES.find(d => d.id === deviceId);
      if (!device) return;

      document.getElementById('modal-device-title').textContent = `「${device.name}」の本体画像を差し替える`;
      document.getElementById('modal-url-input').value = customDeviceImages[deviceId]?.startsWith('http') ? customDeviceImages[deviceId] : '';
      document.getElementById('modal-image-preview').innerHTML = getDeviceVisualHtml(device, 'w-28 h-36');
      document.getElementById('image-upload-modal').classList.remove('hidden');
    }

    function openImageHelpModal() {
      openImageModal(DEVICES[0].id);
    }

    function closeImageModal() {
      document.getElementById('image-upload-modal').classList.add('hidden');
      currentEditingDeviceId = null;
    }

    function handleFileUpload(event) {
      const file = event.target.files?.[0];
      if (!file || !currentEditingDeviceId) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        customDeviceImages[currentEditingDeviceId] = e.target.result;
        saveImagesToStorage();
        refreshAllViewsAfterImageChange();
        showToast('手元の画像ファイルを端末画像に反映しました');
      };
      reader.readAsDataURL(file);
    }

    function applyImageUrl() {
      const url = document.getElementById('modal-url-input').value.trim();
      if (!url || !currentEditingDeviceId) return;

      customDeviceImages[currentEditingDeviceId] = url;
      saveImagesToStorage();
      refreshAllViewsAfterImageChange();
      showToast('指定された画像URLを端末画像に反映しました');
    }

    function resetDeviceImage() {
      if (!currentEditingDeviceId) return;
      delete customDeviceImages[currentEditingDeviceId];
      saveImagesToStorage();
      document.getElementById('modal-url-input').value = '';
      refreshAllViewsAfterImageChange();
      showToast('初期の端末イラストに戻しました');
    }

    function refreshAllViewsAfterImageChange() {
      const device = DEVICES.find(d => d.id === currentEditingDeviceId);
      if (device) {
        document.getElementById('modal-image-preview').innerHTML = getDeviceVisualHtml(device, 'w-28 h-36');
      }
      updateSimulator();
      renderCatalog();
      renderComparisonTable();
    }

    // トースト通知表示
    function showToast(msg) {
      const toast = document.getElementById('toast-message');
      document.getElementById('toast-text').textContent = msg;
      toast.classList.remove('hidden');
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
      }, 2600);
    }
  </script>
</body>
</html>