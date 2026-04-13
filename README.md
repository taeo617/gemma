<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibe PBR - Texture & Material Library</title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Three.js & OrbitControls -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Apple Design System Variables */
        :root {
            --apple-blue: #0071e3;
            --apple-blue-dark: #2997ff;
            --bg-black: #000000;
            --bg-light: #f5f5f7;
            --text-dark: #1d1d1f;
            --text-light: #ffffff;
            --surface-dark-1: #272729; /* Cards */
            --surface-dark-2: #1d1d1f; /* Secondary backgrounds */
            --apple-shadow: 3px 5px 30px 0px rgba(0, 0, 0, 0.22);
            --focus-color: #0071e3;
        }

        /* Typography Mapping */
        @font-face {
            font-family: 'SF Pro Display';
            src: local('-apple-system'), local('BlinkMacSystemFont'), local('Helvetica Neue'), local('Helvetica'), local('Arial'), local('sans-serif');
        }
        @font-face {
            font-family: 'SF Pro Text';
            src: local('-apple-system'), local('BlinkMacSystemFont'), local('Helvetica Neue'), local('Helvetica'), local('Arial'), local('sans-serif');
        }

        body {
            font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-black);
            color: var(--text-light);
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        /* Typography Classes */
        .text-hero { font-family: 'SF Pro Display', sans-serif; font-size: 56px; font-weight: 600; line-height: 1.07; letter-spacing: -0.28px; }
        .text-title { font-family: 'SF Pro Display', sans-serif; font-size: 28px; font-weight: 400; line-height: 1.14; letter-spacing: 0.196px; }
        .text-card-title { font-family: 'SF Pro Display', sans-serif; font-size: 21px; font-weight: 600; line-height: 1.19; letter-spacing: 0.231px; }
        .text-body { font-size: 17px; font-weight: 400; line-height: 1.47; letter-spacing: -0.374px; }
        .text-body-strong { font-size: 17px; font-weight: 600; line-height: 1.24; letter-spacing: -0.374px; }
        .text-caption { font-size: 14px; font-weight: 400; line-height: 1.29; letter-spacing: -0.224px; }
        .text-nav { font-size: 12px; font-weight: 400; line-height: 1.33; letter-spacing: -0.12px; }

        /* Apple Component Utilities */
        .apple-nav-glass {
            background-color: rgba(0, 0, 0, 0.8);
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
        }
        .apple-card {
            background-color: var(--surface-dark-1);
            border-radius: 12px;
            box-shadow: var(--apple-shadow);
            border: none;
        }
        .apple-surface { background-color: var(--surface-dark-2); border: none; }
        .apple-btn-primary {
            background-color: var(--apple-blue);
            color: #ffffff; padding: 8px 15px; border-radius: 8px; font-size: 17px; font-weight: 400; transition: all 0.2s ease; border: 1px solid transparent;
        }
        .apple-btn-primary:hover { filter: brightness(1.1); }
        .apple-btn-primary:focus { outline: 2px solid var(--focus-color); outline-offset: 2px; }
        .apple-btn-dark {
            background-color: var(--surface-dark-2);
            color: #ffffff; padding: 8px 15px; border-radius: 8px; font-size: 17px; font-weight: 400; transition: all 0.2s ease; border: 1px solid #333336;
        }
        .apple-btn-dark:hover { background-color: #333336; }
        .apple-pill-tab { border-radius: 980px; padding: 6px 14px; font-size: 14px; font-weight: 400; transition: all 0.2s ease; }
        .apple-pill-tab.active { background-color: var(--surface-dark-1); box-shadow: 0 1px 3px rgba(0,0,0,0.3); color: #ffffff; }
        .apple-link { color: var(--apple-blue-dark); text-decoration: none; transition: all 0.2s ease; cursor: pointer; }
        .apple-link:hover { text-decoration: underline; }

        /* Custom Range Slider */
        input[type=range] {
            -webkit-appearance: none; width: 100%; background: transparent;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; height: 20px; width: 20px; border-radius: 50%; background: #ffffff; box-shadow: 0 2px 5px rgba(0,0,0,0.5); cursor: pointer; margin-top: -8px;
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%; height: 4px; cursor: pointer; background: #333336; border-radius: 2px;
        }
        input[type=range]:focus { outline: none; }

        #canvas-container { width: 100%; height: 100%; cursor: grab; }
        #canvas-container:active { cursor: grabbing; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #424245; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #636366; }

        /* Favorite Heart Animation */
        .heart-icon.active { color: #ff3b30; fill: #ff3b30; }
    </style>
</head>
<body class="h-screen flex flex-col">

    <!-- Login Modal -->
    <div id="login-modal" class="fixed inset-0 z-[60] hidden flex items-center justify-center bg-black/60 backdrop-blur-[20px] transition-opacity duration-300">
        <div class="apple-card p-10 max-w-sm w-full text-center relative">
            <button id="btn-close-login" class="absolute top-4 right-4 text-[rgba(255,255,255,0.48)] hover:text-white transition">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
            <i data-lucide="lock" class="w-10 h-10 text-white mx-auto mb-4"></i>
            <h2 class="text-card-title text-white mb-2">디자이너 로그인</h2>
            <p class="text-caption text-[rgba(255,255,255,0.48)] mb-6">자신의 재질 라이브러리에 접근합니다.</p>
            
            <div class="space-y-4 mb-6">
                <input type="text" value="foundfounded" readonly class="w-full bg-[#1d1d1f] border border-[#333336] text-white px-4 py-3 rounded-lg text-body focus:outline-none opacity-70 cursor-not-allowed">
                <input type="password" id="input-pw" placeholder="비밀번호" class="w-full bg-[#1d1d1f] border border-[#333336] text-white px-4 py-3 rounded-lg text-body focus:outline-none focus:border-[var(--apple-blue)] transition">
                <p id="login-error" class="text-xs text-[#ff3b30] hidden text-left">비밀번호가 일치하지 않습니다.</p>
            </div>
            
            <button id="btn-submit-login" class="w-full apple-btn-primary">로그인</button>
        </div>
    </div>

    <!-- Initial Popup Modal -->
    <div id="initial-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[20px] transition-opacity duration-300">
        <div class="apple-card p-10 max-w-md w-full text-center">
            <div class="w-16 h-16 bg-[#1d1d1f] rounded-[12px] flex items-center justify-center mx-auto mb-6">
                <i data-lucide="image-plus" class="w-8 h-8 text-[#ffffff]"></i>
            </div>
            <h2 class="text-card-title text-white mb-2">안녕하세요 디자이너님</h2>
            <p class="text-body text-[rgba(255,255,255,0.8)] mb-8">PBR 재질 생성을 위해<br>참고할 텍스처 이미지를 첨부해주세요.</p>
            
            <button id="btn-modal-upload-trigger" class="w-full apple-btn-primary mb-5 cursor-pointer">이미지 첨부하기</button>
            <input type="file" id="modal-file-upload" accept="image/jpeg, image/png" class="hidden">
            
            <button id="btn-close-modal" class="text-caption apple-link">일단 브러시드 메탈(예시) 둘러보기</button>
        </div>
    </div>

    <!-- Guide Modal -->
    <div id="guide-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-black/60 backdrop-blur-[20px] transition-opacity duration-300">
        <div class="apple-card p-10 max-w-4xl w-[90%] max-h-[90vh] overflow-y-auto relative">
            <button id="btn-close-guide" class="absolute top-6 right-6 text-[rgba(255,255,255,0.48)] hover:text-white transition">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            
            <div class="text-center mb-10">
                <h2 class="text-title text-white mb-2">AI PBR Studio 프로세스 및 KeyShot 적용 가이드</h2>
            </div>

            <!-- 프로세스 인포그래픽 -->
            <div class="flex items-start justify-between gap-4 relative px-4 mb-12">
                <div class="absolute top-8 left-16 right-16 h-[1px] bg-[#333336] z-0"></div>
                <div class="relative z-10 flex flex-col items-center flex-1">
                    <div class="w-16 h-16 bg-[#1d1d1f] rounded-[12px] flex items-center justify-center mb-4 shadow-sm border border-[#333336]"><i data-lucide="upload" class="w-7 h-7 text-white"></i></div>
                    <h3 class="text-body-strong text-white mb-1">1. 이미지 업로드</h3>
                </div>
                <div class="relative z-10 flex flex-col items-center flex-1">
                    <div class="w-16 h-16 bg-[#1d1d1f] rounded-[12px] flex items-center justify-center mb-4 shadow-sm border border-[#333336]"><i data-lucide="cpu" class="w-7 h-7 text-white"></i></div>
                    <h3 class="text-body-strong text-white mb-1">2. AI 분석</h3>
                </div>
                <div class="relative z-10 flex flex-col items-center flex-1">
                    <div class="w-16 h-16 bg-[#1d1d1f] rounded-[12px] flex items-center justify-center mb-4 shadow-sm border border-[#333336]"><i data-lucide="box" class="w-7 h-7 text-white"></i></div>
                    <h3 class="text-body-strong text-white mb-1">3. 조정 및 렌더링</h3>
                </div>
                <div class="relative z-10 flex flex-col items-center flex-1">
                    <div class="w-16 h-16 bg-[#1d1d1f] rounded-[12px] flex items-center justify-center mb-4 shadow-sm border border-[#333336]"><i data-lucide="download" class="w-7 h-7 text-white"></i></div>
                    <h3 class="text-body-strong text-white mb-1">4. 내보내기</h3>
                </div>
            </div>
            
            <!-- KeyShot 매뉴얼 -->
            <div class="bg-[#1d1d1f] rounded-[12px] p-6 border border-[#333336] text-left">
                <h3 class="text-card-title text-white mb-4 flex items-center gap-2"><i data-lucide="book-open" class="w-5 h-5"></i> KeyShot 재질 노드 연결 방법</h3>
                <ul class="space-y-4 text-caption text-[rgba(255,255,255,0.8)]">
                    <li><strong class="text-white text-body-strong">1. 확산 (Diffuse/Albedo):</strong> KeyShot 재질 속성의 <span class="text-[var(--apple-blue-dark)]">'색상(Color)'</span> 또는 '디퓨즈' 채널에 다운로드한 Albedo 맵을 연결합니다. 표면의 기본 색상을 정의합니다.</li>
                    <li><strong class="text-white text-body-strong">2. 범프 (Bump/Height):</strong> <span class="text-[var(--apple-blue-dark)]">'범프(Bump)'</span> 채널에 연결하세요. 재질 그래프에서 스케일과 높이(Height) 수치를 미세 조정하여 물리적 질감을 살려줍니다.</li>
                    <li><strong class="text-white text-body-strong">3. 반사 (Specular/Roughness):</strong> PBR 모드 또는 고급 재질에서 <span class="text-[var(--apple-blue-dark)]">'거칠기(Roughness)'</span> 맵으로 연결합니다. 텍스처의 밝은 부분은 거칠게, 어두운 부분은 매끄럽게(반사율 높게) 표현됩니다.</li>
                    <li><strong class="text-white text-body-strong">4. 불투명도 (Opacity):</strong> 추출된 맵 중 투명/알파 데이터가 있다면 <span class="text-[var(--apple-blue-dark)]">'불투명도(Opacity)'</span> 노드에 연결하여 메쉬에 컷아웃 효과를 줄 수 있습니다.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Header -->
    <header class="apple-nav-glass h-[48px] flex items-center justify-between px-6 shrink-0 z-10 w-full fixed top-0">
        <div class="flex items-center gap-6">
            <span class="text-nav font-semibold tracking-tight text-white flex items-center gap-2">
                <i data-lucide="aperture" class="w-4 h-4 text-white"></i>
                AI PBR Studio
            </span>
            <nav class="flex gap-6 text-nav text-[rgba(255,255,255,0.8)]">
                <button id="btn-toggle-library" class="hover:text-white transition flex items-center gap-1"><i data-lucide="library" class="w-3 h-3"></i> 라이브러리</button>
                <button id="btn-open-guide" class="hover:text-white transition">사용 가이드</button>
            </nav>
        </div>
        <div class="flex items-center gap-4 text-nav">
            <span id="user-display" class="text-[rgba(255,255,255,0.5)] hidden">foundfounded</span>
            <button id="btn-login-toggle" class="hover:text-white text-white font-medium transition">로그인</button>
        </div>
    </header>

    <!-- Main Workspace -->
    <main class="flex-1 flex overflow-hidden relative mt-[48px]">
        
        <!-- Left: Library Panel (Toggled) -->
        <div id="panel-library" class="w-[280px] apple-surface border-r border-[#333336] flex flex-col z-20 transition-all duration-300 transform translate-x-0 relative">
            <div class="p-5 border-b border-[#333336]">
                <h2 class="text-card-title text-white">마이 재질</h2>
                <p class="text-nav text-[rgba(255,255,255,0.48)] mt-1">저장된 데이터베이스</p>
            </div>
            <div id="library-list" class="flex-1 overflow-y-auto p-4 space-y-2">
                <!-- 라이브러리 아이템 렌더링 영역 -->
            </div>
        </div>

        <!-- Center: Viewer Area -->
        <div class="flex-1 flex flex-col relative bg-[#000000]">
            <!-- View Tabs -->
            <div class="absolute top-6 left-1/2 -translate-x-1/2 bg-[#1d1d1f] rounded-[980px] p-1 z-10 flex shadow-lg border border-[#333336]">
                <button id="btn-3d" class="apple-pill-tab active text-[rgba(255,255,255,0.48)] flex items-center gap-2">
                    <i data-lucide="box" class="w-4 h-4"></i> 3D 뷰어
                </button>
                <button id="btn-2d" class="apple-pill-tab text-[rgba(255,255,255,0.48)] flex items-center gap-2">
                    <i data-lucide="image" class="w-4 h-4"></i> 2D 데이터
                </button>
            </div>

            <!-- 3D Canvas -->
            <div id="view-3d" class="w-full h-full relative flex flex-col">
                <div id="canvas-container" class="flex-1 w-full"></div>
                
                <!-- 하단 컨트롤(스케일, 각도, 자동저장 피드백) -->
                <div class="absolute bottom-6 left-1/2 -translate-x-1/2 apple-nav-glass border border-[#333336] rounded-2xl px-6 py-4 w-[400px] shadow-2xl z-10 flex flex-col gap-4">
                    <div class="flex justify-between items-center text-caption text-white">
                        <span class="flex items-center gap-2"><i data-lucide="scaling" class="w-4 h-4 text-[rgba(255,255,255,0.48)]"></i> 스케일 (Scale)</span>
                        <span id="val-scale" class="text-[var(--apple-blue-dark)] font-mono">1.0x</span>
                    </div>
                    <input type="range" id="slider-scale" min="0.5" max="5" step="0.1" value="1">
                    
                    <div class="flex justify-between items-center text-caption text-white mt-2">
                        <span class="flex items-center gap-2"><i data-lucide="rotate-cw" class="w-4 h-4 text-[rgba(255,255,255,0.48)]"></i> 각도 (Angle)</span>
                        <span id="val-angle" class="text-[var(--apple-blue-dark)] font-mono">0°</span>
                    </div>
                    <input type="range" id="slider-angle" min="0" max="360" step="1" value="0">
                    
                    <button id="btn-save-transform" class="w-full apple-btn-dark text-nav py-1.5 mt-1">현재 상태로 라이브러리 저장</button>
                </div>

                <div class="absolute right-6 top-6 flex flex-col gap-3 z-10">
                    <button id="btn-zoom-in" class="w-10 h-10 apple-nav-glass border border-[#333336] hover:bg-[rgba(255,255,255,0.1)] text-white rounded-full flex items-center justify-center transition shadow-md"><i data-lucide="plus" class="w-4 h-4"></i></button>
                    <button id="btn-zoom-out" class="w-10 h-10 apple-nav-glass border border-[#333336] hover:bg-[rgba(255,255,255,0.1)] text-white rounded-full flex items-center justify-center transition shadow-md"><i data-lucide="minus" class="w-4 h-4"></i></button>
                </div>

                <!-- AI Processing Overlay -->
                <div id="loading" class="absolute inset-0 bg-black/60 backdrop-blur-[20px] flex items-center justify-center z-20 hidden">
                    <div class="flex flex-col items-center gap-6">
                        <i data-lucide="loader" class="w-10 h-10 text-[var(--apple-blue)] animate-spin"></i>
                        <span class="text-body text-white">AI가 이미지를 물리 기반 텍스처로 분석 중입니다</span>
                    </div>
                </div>
            </div>

            <!-- 2D Maps Grid -->
            <div id="view-2d" class="w-full h-full hidden overflow-y-auto p-12 bg-[#000000]">
                <div class="max-w-5xl mx-auto mb-8 flex justify-between items-end">
                    <div>
                        <h2 class="text-title text-white mb-1">추출된 맵 데이터</h2>
                        <p class="text-body text-[rgba(255,255,255,0.48)]">적용된 스케일과 각도는 3D 뷰어에서 확인 가능합니다.</p>
                    </div>
                    <button id="btn-download-all-2d" class="apple-btn-primary flex items-center gap-2">
                        <i data-lucide="download-cloud" class="w-4 h-4"></i> 맵 일괄 저장
                    </button>
                </div>
                
                <div class="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div class="apple-card p-4">
                        <h3 class="text-caption text-[rgba(255,255,255,0.8)] mb-3">Albedo / Base</h3>
                        <img id="img-albedo" src="" class="w-full aspect-square object-cover rounded-lg bg-black border border-[#333336]">
                    </div>
                    <div class="apple-card p-4">
                        <h3 class="text-caption text-[rgba(255,255,255,0.8)] mb-3">Bump / Height</h3>
                        <img id="img-bump" src="" class="w-full aspect-square object-cover rounded-lg bg-black border border-[#333336]">
                    </div>
                    <div class="apple-card p-4">
                        <h3 class="text-caption text-[rgba(255,255,255,0.8)] mb-3">Roughness / Gloss</h3>
                        <img id="img-roughness" src="" class="w-full aspect-square object-cover rounded-lg bg-black border border-[#333336]">
                    </div>
                </div>
            </div>
            
        </div>

        <!-- Right: AI Generation Panel -->
        <div class="w-[360px] apple-surface flex flex-col z-20 shadow-2xl border-l border-[#333336]">
            <!-- Upload Section -->
            <div id="panel-upload" class="p-8 flex-1 flex flex-col">
                <h1 class="text-card-title text-white mb-2">새 재질 생성</h1>
                <p class="text-caption text-[rgba(255,255,255,0.48)] mb-8">새로운 질감 이미지를 업로드하세요.</p>
                
                <label for="file-upload" id="drop-zone" class="bg-[#272729] border border-dashed border-[#424245] hover:border-[var(--apple-blue)] rounded-[12px] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition flex-1 min-h-[250px]">
                    <i data-lucide="plus" class="w-8 h-8 text-[rgba(255,255,255,0.48)] mb-3"></i>
                    <span class="text-body text-white mb-1">여기를 클릭하여 첨부</span>
                    <input id="file-upload" type="file" accept="image/jpeg, image/png" class="hidden">
                </label>
                
                <div id="image-preview-container" class="hidden mt-4 flex-col items-center">
                    <img id="source-image-preview" class="w-full h-40 object-cover rounded-[8px] mb-4 border border-[#333336]">
                    <button id="btn-generate" class="w-full apple-btn-primary mb-3">AI 재질 생성</button>
                    <button id="btn-cancel" class="text-nav text-[rgba(255,255,255,0.48)] hover:text-white transition">다른 이미지 선택</button>
                </div>
            </div>

            <!-- Result Section -->
            <div id="panel-result" class="hidden flex-col h-full">
                <div class="p-8 pb-6 border-b border-[#333336]">
                    <h1 class="text-card-title text-white mb-1">생성 완료</h1>
                    <p class="text-caption text-[rgba(255,255,255,0.48)] mb-6">라이브러리에 자동 등록되었습니다.</p>
                    
                    <div class="bg-[#1d1d1f] p-4 rounded-lg border border-[#333336] flex justify-between">
                        <div class="text-center w-full border-r border-[#333336]">
                            <div class="text-body-strong text-white">4 Maps</div>
                            <div class="text-nav text-[rgba(255,255,255,0.48)]">추출됨</div>
                        </div>
                        <div class="text-center w-full">
                            <div class="text-body-strong text-[var(--apple-blue)]">Seamless</div>
                            <div class="text-nav text-[rgba(255,255,255,0.48)]">타일링 적용</div>
                        </div>
                    </div>
                </div>

                <div class="p-8 flex-1 flex flex-col justify-end">
                    <button id="download-kmp" class="w-full apple-btn-primary flex items-center justify-center gap-2 mb-4">
                        <i data-lucide="download" class="w-4 h-4"></i> KeyShot KMP 저장
                    </button>
                    <button id="btn-new-material" class="w-full apple-btn-dark flex items-center justify-center gap-2">
                        <i data-lucide="refresh-cw" class="w-4 h-4"></i> 새로운 재질 만들기
                    </button>
                </div>
            </div>
        </div>
    </main>

    <script>
        lucide.createIcons();

        // --- Auth & Library Logic ---
        let currentUserId = 'guest';
        let isLibraryOpen = true;
        let activeMaterialId = null;
        let materialsLib = [];

        const getLibraryKey = () => `pbr_lib_${currentUserId}`;

        const loadLibrary = () => {
            const data = localStorage.getItem(getLibraryKey());
            materialsLib = data ? JSON.parse(data) : [];
            renderLibrary();
        };

        const saveLibrary = () => {
            localStorage.setItem(getLibraryKey(), JSON.stringify(materialsLib));
        };

        const renderLibrary = () => {
            const listEl = document.getElementById('library-list');
            listEl.innerHTML = '';
            
            if(materialsLib.length === 0) {
                listEl.innerHTML = '<p class="text-nav text-[rgba(255,255,255,0.3)] text-center mt-10">생성된 재질이 없습니다.</p>';
                return;
            }

            materialsLib.forEach(mat => {
                const item = document.createElement('div');
                const isActive = mat.id === activeMaterialId;
                item.className = `p-3 rounded-lg flex items-center justify-between cursor-pointer transition border ${isActive ? 'bg-[#333336] border-[var(--apple-blue)]' : 'bg-[#1d1d1f] hover:bg-[#272729] border-transparent'}`;
                
                item.innerHTML = `
                    <div class="flex items-center gap-3 flex-1 overflow-hidden">
                        <img src="${mat.maps.albedo}" class="w-10 h-10 rounded shadow-sm border border-black/50 object-cover flex-shrink-0">
                        <span class="text-caption text-white truncate font-medium">${mat.name}</span>
                    </div>
                    <button class="btn-fav p-2 rounded-full hover:bg-black/20 transition flex-shrink-0" data-id="${mat.id}">
                        <svg class="w-4 h-4 heart-icon ${mat.isFavorite ? 'active' : 'text-[rgba(255,255,255,0.3)]'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                `;

                // 아이템 클릭 시 3D 뷰어 업데이트
                item.querySelector('div').addEventListener('click', () => {
                    loadMaterialToViewer(mat);
                });

                // 찜하기 토글
                item.querySelector('.btn-fav').addEventListener('click', (e) => {
                    e.stopPropagation();
                    mat.isFavorite = !mat.isFavorite;
                    saveLibrary();
                    renderLibrary();
                });

                listEl.appendChild(item);
            });
        };

        const createNewMaterialEntry = (maps, typeName = "커스텀 재질") => {
            const num = materialsLib.length + 1;
            const newMat = {
                id: Date.now().toString(),
                name: `${typeName}_${num.toString().padStart(2, '0')}`,
                maps: maps,
                scale: 1,
                angle: 0,
                isFavorite: false
            };
            materialsLib.unshift(newMat);
            // 용량 관리: 10개 넘으면 오래된 것 삭제 방지 (여기선 단순히 유지)
            saveLibrary();
            loadMaterialToViewer(newMat);
            renderLibrary();
        };

        // --- 3D Viewer Setup ---
        let scene, camera, renderer, controls, sphere, container;
        let currentMaps = {};
        
        // 아이들 타이머 로직 (5초 대기 시 회전)
        let idleTimer;
        let isIdle = true;
        const resetIdleTimer = () => {
            isIdle = false;
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => { isIdle = true; }, 5000);
        };

        // 가상의 브러시드 메탈(Brushed Metal) 텍스처 생성
        function createBrushedMetalTextures() {
            const size = 512;
            
            // Albedo
            const cAlbedo = document.createElement('canvas'); cAlbedo.width = size; cAlbedo.height = size;
            const ctxA = cAlbedo.getContext('2d');
            ctxA.fillStyle = '#b0b5ba'; ctxA.fillRect(0, 0, size, size);
            for(let i=0; i<4000; i++) {
                ctxA.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.08})`;
                ctxA.fillRect(0, Math.random() * size, size, Math.random() * 1.5);
                ctxA.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.06})`;
                ctxA.fillRect(0, Math.random() * size, size, Math.random() * 1.5);
            }

            // Roughness
            const cRough = document.createElement('canvas'); cRough.width = size; cRough.height = size;
            const ctxR = cRough.getContext('2d');
            ctxR.fillStyle = '#606060'; ctxR.fillRect(0, 0, size, size); // 기본적으로 꽤 반사됨(어두움)
            for(let i=0; i<3000; i++) {
                ctxR.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
                ctxR.fillRect(0, Math.random() * size, size, 1);
            }

            // Bump
            const cBump = document.createElement('canvas'); cBump.width = size; cBump.height = size;
            const ctxB = cBump.getContext('2d');
            ctxB.fillStyle = '#808080'; ctxB.fillRect(0, 0, size, size);
            for(let i=0; i<2000; i++) {
                ctxB.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                ctxB.fillRect(0, Math.random() * size, size, 1);
            }

            // Normal (Simplified)
            const cNormal = document.createElement('canvas'); cNormal.width = size; cNormal.height = size;
            const ctxN = cNormal.getContext('2d');
            ctxN.fillStyle = '#8080ff'; ctxN.fillRect(0, 0, size, size);

            return {
                albedo: cAlbedo.toDataURL('image/jpeg', 0.8),
                bump: cBump.toDataURL('image/jpeg', 0.8),
                roughness: cRough.toDataURL('image/jpeg', 0.8),
                normal: cNormal.toDataURL('image/jpeg', 0.8)
            };
        }

        const init3DViewer = () => {
            container = document.getElementById('canvas-container');
            scene = new THREE.Scene();

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);
            const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
            dirLight.position.set(5, 5, 5);
            scene.add(dirLight);
            const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
            backLight.position.set(-5, -5, -5);
            scene.add(backLight);

            camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
            camera.position.z = 3.5;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.0;
            container.appendChild(renderer.domElement);

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.minDistance = 1.5;
            controls.maxDistance = 6;
            
            // 컨트롤 조작 시 회전 대기 타이머 리셋
            controls.addEventListener('start', resetIdleTimer);
            controls.addEventListener('change', resetIdleTimer);

            // 초기 구체 설정
            const geometry = new THREE.SphereGeometry(1, 128, 128);
            sphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x555555 }));
            scene.add(sphere);

            const animate = () => {
                requestAnimationFrame(animate);
                // 5초간 조작이 없으면 천천히 자동 회전
                if(isIdle && !controls.state) {
                    sphere.rotation.y += 0.002;
                    sphere.rotation.x += 0.001;
                }
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
            resetIdleTimer(); // 시작 시 타이머 동작

            window.addEventListener('resize', () => {
                if(!container) return;
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            });

            // 초기 앱 로드: 라이브러리 확인 후 없으면 기본 예시 추가
            loadLibrary();
            if(materialsLib.length === 0) {
                const defaultMaps = createBrushedMetalTextures();
                createNewMaterialEntry(defaultMaps, "브러시드 메탈");
            } else {
                loadMaterialToViewer(materialsLib[0]);
            }
        };

        const loadMaterialToViewer = (matData) => {
            activeMaterialId = matData.id;
            currentMaps = matData.maps;
            
            // UI 업데이트
            document.getElementById('slider-scale').value = matData.scale;
            document.getElementById('val-scale').textContent = `${matData.scale}x`;
            document.getElementById('slider-angle').value = matData.angle;
            document.getElementById('val-angle').textContent = `${matData.angle}°`;

            document.getElementById('img-albedo').src = currentMaps.albedo;
            document.getElementById('img-bump').src = currentMaps.bump;
            document.getElementById('img-roughness').src = currentMaps.roughness;

            // 텍스처 로더 동기화
            const loader = new THREE.TextureLoader();
            const applyTexture = (url, type) => {
                loader.load(url, (tex) => {
                    tex.wrapS = THREE.RepeatWrapping;
                    tex.wrapT = THREE.RepeatWrapping;
                    tex.center.set(0.5, 0.5);
                    tex.repeat.set(matData.scale, matData.scale);
                    tex.rotation = matData.angle * (Math.PI / 180);
                    
                    sphere.material[type] = tex;
                    
                    if(type === 'map') sphere.material.color.setHex(0xffffff);
                    if(type === 'bumpMap') sphere.material.bumpScale = 0.03;
                    
                    // 메탈 재질 특성 부여 (이름에 메탈이 들어가면 메탈릭 1.0)
                    sphere.material.metalness = matData.name.includes("메탈") ? 1.0 : 0.1;
                    
                    sphere.material.needsUpdate = true;
                });
            };

            applyTexture(currentMaps.albedo, 'map');
            applyTexture(currentMaps.bump, 'bumpMap');
            applyTexture(currentMaps.roughness, 'roughnessMap');
            applyTexture(currentMaps.normal, 'normalMap');

            renderLibrary();
        };

        // Scale & Angle Update
        const updateMaterialTransform = () => {
            const scale = parseFloat(document.getElementById('slider-scale').value);
            const angleDeg = parseFloat(document.getElementById('slider-angle').value);
            const angleRad = angleDeg * (Math.PI / 180);

            document.getElementById('val-scale').textContent = `${scale}x`;
            document.getElementById('val-angle').textContent = `${angleDeg}°`;

            const maps = ['map', 'bumpMap', 'roughnessMap', 'normalMap'];
            maps.forEach(m => {
                if(sphere.material[m]) {
                    sphere.material[m].repeat.set(scale, scale);
                    sphere.material[m].rotation = angleRad;
                }
            });
            sphere.material.needsUpdate = true;
            resetIdleTimer();
        };

        document.getElementById('slider-scale').addEventListener('input', updateMaterialTransform);
        document.getElementById('slider-angle').addEventListener('input', updateMaterialTransform);

        // Save Transform to Library
        document.getElementById('btn-save-transform').addEventListener('click', () => {
            if(!activeMaterialId) return;
            const mat = materialsLib.find(m => m.id === activeMaterialId);
            if(mat) {
                mat.scale = parseFloat(document.getElementById('slider-scale').value);
                mat.angle = parseFloat(document.getElementById('slider-angle').value);
                saveLibrary();
                
                const btn = document.getElementById('btn-save-transform');
                const origText = btn.textContent;
                btn.textContent = "저장되었습니다!";
                btn.classList.add('text-green-400');
                setTimeout(() => {
                    btn.textContent = origText;
                    btn.classList.remove('text-green-400');
                }, 2000);
            }
        });

        // --- UI Interactions ---
        // Library Toggle
        const panelLibrary = document.getElementById('panel-library');
        document.getElementById('btn-toggle-library').addEventListener('click', () => {
            isLibraryOpen = !isLibraryOpen;
            if(isLibraryOpen) {
                panelLibrary.classList.remove('hidden');
                setTimeout(() => panelLibrary.classList.remove('-translate-x-full'), 10);
            } else {
                panelLibrary.classList.add('-translate-x-full');
                setTimeout(() => panelLibrary.classList.add('hidden'), 300);
            }
        });

        // Login System
        const modalLogin = document.getElementById('login-modal');
        const btnLoginToggle = document.getElementById('btn-login-toggle');
        const inputPw = document.getElementById('input-pw');
        const errorMsg = document.getElementById('login-error');
        const userDisplay = document.getElementById('user-display');

        btnLoginToggle.addEventListener('click', () => {
            if(currentUserId === 'guest') {
                modalLogin.classList.remove('hidden');
                inputPw.value = '';
                errorMsg.classList.add('hidden');
            } else {
                // Logout
                currentUserId = 'guest';
                btnLoginToggle.textContent = '로그인';
                userDisplay.classList.add('hidden');
                loadLibrary(); // 게스트 라이브러리 로드
                if(materialsLib.length > 0) loadMaterialToViewer(materialsLib[0]);
            }
        });

        document.getElementById('btn-close-login').addEventListener('click', () => modalLogin.classList.add('hidden'));

        document.getElementById('btn-submit-login').addEventListener('click', () => {
            if(inputPw.value === '3377') {
                currentUserId = 'foundfounded';
                modalLogin.classList.add('hidden');
                btnLoginToggle.textContent = '로그아웃';
                userDisplay.classList.remove('hidden');
                
                loadLibrary(); // foundfounded 라이브러리 로드
                if(materialsLib.length === 0) {
                    // 유저 첫 접속 시 기본 제공
                    const defaultMaps = createBrushedMetalTextures();
                    createNewMaterialEntry(defaultMaps, "브러시드 메탈");
                } else {
                    loadMaterialToViewer(materialsLib[0]);
                }
            } else {
                errorMsg.classList.remove('hidden');
            }
        });

        // Other Modals
        const initialModal = document.getElementById('initial-modal');
        document.getElementById('btn-close-modal').addEventListener('click', () => initialModal.classList.add('hidden'));

        const guideModal = document.getElementById('guide-modal');
        document.getElementById('btn-open-guide').addEventListener('click', () => guideModal.classList.remove('hidden'));
        document.getElementById('btn-close-guide').addEventListener('click', () => guideModal.classList.add('hidden'));

        // Image Upload & AI Generation Sim
        const fileInput = document.getElementById('file-upload');
        const modalFileInput = document.getElementById('modal-file-upload');
        const dropZone = document.getElementById('drop-zone');
        const previewContainer = document.getElementById('image-preview-container');
        const sourcePreview = document.getElementById('source-image-preview');
        const loadingOverlay = document.getElementById('loading');

        const handleFileSelect = (file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                sourcePreview.src = e.target.result;
                dropZone.classList.add('hidden');
                previewContainer.classList.remove('hidden');
                previewContainer.classList.add('flex');
            };
            reader.readAsDataURL(file);
        };

        document.getElementById('btn-modal-upload-trigger').addEventListener('click', () => modalFileInput.click());
        modalFileInput.addEventListener('change', (e) => {
            if(e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
                initialModal.classList.add('hidden');
                setTimeout(() => document.getElementById('btn-generate').click(), 300);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if(e.target.files[0]) handleFileSelect(e.target.files[0]);
        });

        document.getElementById('btn-cancel').addEventListener('click', () => {
            fileInput.value = '';
            previewContainer.classList.add('hidden');
            previewContainer.classList.remove('flex');
            dropZone.classList.remove('hidden');
        });

        document.getElementById('btn-generate').addEventListener('click', () => {
            loadingOverlay.classList.remove('hidden');
            setTimeout(() => {
                // 가짜 AI 로직: 원본 이미지를 기반으로 흑백 변환하여 새 맵 생성
                const c = document.createElement('canvas'); c.width=512; c.height=512;
                const ctx = c.getContext('2d');
                ctx.drawImage(sourcePreview, 0, 0, 512, 512);
                const albedo = c.toDataURL('image/jpeg', 0.7);
                
                // 임시로 같은 이미지를 변형없이 적용 (데모용)
                const newMaps = {
                    albedo: albedo,
                    bump: albedo, 
                    roughness: albedo,
                    normal: albedo
                };
                
                createNewMaterialEntry(newMaps, "AI 커스텀 재질");
                
                loadingOverlay.classList.add('hidden');
                document.getElementById('panel-upload').classList.add('hidden');
                document.getElementById('panel-result').classList.remove('hidden');
                document.getElementById('panel-result').classList.add('flex');
                document.getElementById('btn-3d').click();
            }, 2500);
        });

        // View Tabs
        const btn3D = document.getElementById('btn-3d');
        const btn2D = document.getElementById('btn-2d');
        const view3D = document.getElementById('view-3d');
        const view2D = document.getElementById('view-2d');

        btn3D.addEventListener('click', () => {
            view3D.classList.remove('hidden'); view2D.classList.add('hidden');
            btn3D.classList.add('active'); btn2D.classList.remove('active');
            btn3D.style.color = '#ffffff'; btn2D.style.color = 'rgba(255,255,255,0.48)';
        });

        btn2D.addEventListener('click', () => {
            view2D.classList.remove('hidden'); view3D.classList.add('hidden');
            btn2D.classList.add('active'); btn3D.classList.remove('active');
            btn2D.style.color = '#ffffff'; btn3D.style.color = 'rgba(255,255,255,0.48)';
        });

        // Zoom Controls
        document.getElementById('btn-zoom-in').addEventListener('click', () => {
            if(camera && controls) { camera.translateZ(-0.5); controls.update(); resetIdleTimer(); }
        });
        document.getElementById('btn-zoom-out').addEventListener('click', () => {
            if(camera && controls) { camera.translateZ(0.5); controls.update(); resetIdleTimer(); }
        });

        // Panel Navigation
        document.getElementById('btn-new-material').addEventListener('click', () => {
            document.getElementById('panel-result').classList.add('hidden');
            document.getElementById('panel-result').classList.remove('flex');
            document.getElementById('panel-upload').classList.remove('hidden');
            document.getElementById('panel-upload').classList.add('flex');
            document.getElementById('btn-cancel').click();
        });

        // Boot
        window.onload = init3DViewer;
    </script>
</body>
</html>
