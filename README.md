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
    <!-- JSZip for Zip Downloads -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <style>
        /* Apple Design System & Theme Variables */
        :root {
            --apple-blue: #0071e3;
            --apple-blue-dark: #2997ff;
            --bg-main: #000000;
            --bg-panel: #111111;
            --bg-card: #1c1c1e;
            --border-color: #333336;
            --text-main: #ffffff;
            --text-sub: rgba(255, 255, 255, 0.8);
            --text-muted: rgba(255, 255, 255, 0.48);
            --hover-bg: #2c2c2e;
            --overlay-bg: rgba(0, 0, 0, 0.7);
            --glass-bg: rgba(0, 0, 0, 0.8);
            --shadow-color: rgba(0, 0, 0, 0.4);
            --focus-color: #0071e3;
        }

        /* Light Mode Theme */
        [data-theme="light"] {
            --apple-blue-dark: #0066cc;
            --bg-main: #f5f5f7;
            --bg-panel: #ffffff;
            --bg-card: #ffffff;
            --border-color: #d2d2d7;
            --text-main: #1d1d1f;
            --text-sub: rgba(0, 0, 0, 0.8);
            --text-muted: rgba(0, 0, 0, 0.48);
            --hover-bg: #e5e5ea;
            --overlay-bg: rgba(255, 255, 255, 0.6);
            --glass-bg: rgba(255, 255, 255, 0.8);
            --shadow-color: rgba(0, 0, 0, 0.08);
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
            background-color: var(--bg-main);
            color: var(--text-main);
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* Typography Classes */
        .text-title { font-family: 'SF Pro Display', sans-serif; font-size: 24px; font-weight: 600; line-height: 1.14; letter-spacing: 0.01em; }
        .text-card-title { font-family: 'SF Pro Display', sans-serif; font-size: 19px; font-weight: 600; line-height: 1.19; letter-spacing: 0.01em; }
        .text-body { font-size: 15px; font-weight: 400; line-height: 1.47; letter-spacing: -0.01em; }
        .text-body-strong { font-size: 15px; font-weight: 600; line-height: 1.24; letter-spacing: -0.01em; }
        .text-caption { font-size: 13px; font-weight: 400; line-height: 1.29; letter-spacing: -0.01em; }
        .text-nav { font-size: 12px; font-weight: 400; line-height: 1.33; letter-spacing: -0.01em; }

        /* Apple Component Utilities */
        .apple-nav-glass {
            background-color: var(--glass-bg);
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            transition: background-color 0.3s ease;
        }
        .apple-card {
            background-color: var(--bg-card);
            border-radius: 12px;
            box-shadow: 0 4px 24px var(--shadow-color);
            border: 1px solid var(--border-color);
            transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .apple-surface { background-color: var(--bg-panel); border: none; transition: background-color 0.3s ease; }
        .apple-btn-primary {
            background-color: var(--apple-blue);
            color: #ffffff; padding: 10px 18px; border-radius: 8px; font-size: 15px; font-weight: 500; transition: all 0.2s ease; border: 1px solid transparent;
        }
        .apple-btn-primary:hover { filter: brightness(1.1); }
        .apple-btn-primary:focus { outline: 2px solid var(--focus-color); outline-offset: 2px; }
        .apple-btn-dark {
            background-color: var(--bg-card);
            color: var(--text-main); padding: 10px 18px; border-radius: 8px; font-size: 15px; font-weight: 500; transition: all 0.2s ease; border: 1px solid var(--border-color);
        }
        .apple-btn-dark:hover { background-color: var(--hover-bg); }
        .apple-pill-tab { border-radius: 980px; padding: 6px 16px; font-size: 13px; font-weight: 500; transition: all 0.2s ease; }
        .apple-pill-tab.active { background-color: var(--bg-card); box-shadow: 0 1px 3px var(--shadow-color); color: var(--text-main) !important; border: 1px solid var(--border-color); }
        .apple-link { color: var(--apple-blue-dark); text-decoration: none; transition: all 0.2s ease; cursor: pointer; }
        .apple-link:hover { text-decoration: underline; }

        /* Custom UI Slider (Matched to Reference Image) */
        input[type=range] {
            -webkit-appearance: none; width: 100%; background: transparent; height: 24px; outline: none;
        }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%; background: #ffffff; box-shadow: 0 1px 4px rgba(0,0,0,0.5); cursor: pointer; position: relative; z-index: 10; margin-top: -6px;
        }
        input[type=range]::-webkit-slider-runnable-track {
            width: 100%; height: 4px; cursor: pointer; background: linear-gradient(to right, var(--apple-blue) var(--slider-percent, 0%), var(--border-color) var(--slider-percent, 0%)); border-radius: 2px;
        }
        input[type=range]:focus { outline: none; }

        /* Input specific for double click */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; margin: 0; 
        }

        #canvas-container { width: 100%; height: 100%; cursor: default; }
        #canvas-container:active { cursor: grabbing; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--hover-bg); }

        .heart-icon.active { color: #ff3b30; fill: #ff3b30; }
    </style>
</head>
<body class="h-screen flex flex-col">

    <!-- Login Modal -->
    <div id="login-modal" class="fixed inset-0 z-[60] hidden flex items-center justify-center bg-[var(--overlay-bg)] backdrop-blur-[20px] transition-opacity duration-300">
        <div class="apple-card p-10 max-w-sm w-full text-center relative">
            <button id="btn-close-login" class="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] transition">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
            <i data-lucide="lock" class="w-10 h-10 text-[var(--text-main)] mx-auto mb-4"></i>
            <h2 class="text-card-title text-[var(--text-main)] mb-2">디자이너 로그인</h2>
            <p class="text-caption text-[var(--text-muted)] mb-6">자신의 재질 라이브러리에 접근합니다.</p>
            
            <div class="space-y-4 mb-6">
                <input type="text" value="foundfounded" readonly class="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] px-4 py-3 rounded-lg text-body focus:outline-none opacity-70 cursor-not-allowed">
                <input type="password" id="input-pw" placeholder="비밀번호" class="w-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-main)] px-4 py-3 rounded-lg text-body focus:outline-none focus:border-[var(--apple-blue)] transition">
                <p id="login-error" class="text-xs text-[#ff3b30] hidden text-left">비밀번호가 일치하지 않습니다.</p>
            </div>
            
            <button id="btn-submit-login" class="w-full apple-btn-primary">로그인</button>
        </div>
    </div>

    <!-- Initial Popup Modal -->
    <div id="initial-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay-bg)] backdrop-blur-[20px] transition-opacity duration-300">
        <div class="apple-card p-10 max-w-md w-full text-center">
            <div class="w-16 h-16 bg-[var(--bg-main)] border border-[var(--border-color)] rounded-[12px] flex items-center justify-center mx-auto mb-6">
                <i data-lucide="image-plus" class="w-8 h-8 text-[var(--text-main)]"></i>
            </div>
            <h2 class="text-card-title text-[var(--text-main)] mb-2">안녕하세요 파파 디자이너님</h2>
            <p class="text-body text-[var(--text-sub)] mb-8">고화질 PBR 재질 생성을 위해<br>참고할 텍스처 이미지를 첨부해주세요.</p>
            
            <button id="btn-modal-upload-trigger" class="w-full apple-btn-primary mb-5 cursor-pointer">이미지 첨부하기</button>
            <input type="file" id="modal-file-upload" accept="image/jpeg, image/png" class="hidden">
            
            <button id="btn-close-modal" class="text-caption apple-link">일단 예시 재질 둘러보러 가기!</button>
        </div>
    </div>

    <!-- Guide Modal -->
    <div id="guide-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center bg-[var(--overlay-bg)] backdrop-blur-[20px] transition-opacity duration-300">
        <div class="apple-card p-10 max-w-4xl w-[90%] max-h-[90vh] overflow-y-auto relative">
            <button id="btn-close-guide" class="absolute top-6 right-6 text-[var(--text-muted)] hover:text-[var(--text-main)] transition">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
            
            <div class="text-center mb-10">
                <h2 class="text-title text-[var(--text-main)] mb-2">AI PBR Studio 프로세스 및 KeyShot 적용 가이드</h2>
            </div>

            <!-- 프로세스 인포그래픽 -->
            <div class="flex items-start justify-between gap-4 relative px-4 mb-12">
                <div class="absolute top-8 left-16 right-16 h-[1px] bg-[var(--border-color)] z-0"></div>
                <div class="relative z-10 flex flex-col items-center flex-1">
                    <div class="w-16 h-16 bg-[var(--bg-main)] rounded-[12px] flex items-center justify-center mb-4 shadow-sm border border-[var(--border-color)]"><i data-lucide="upload" class="w-7 h-7 text-[var(--text-main)]"></i></div>
                    <h3 class="text-body-strong text-[var(--text-main)] mb-1">1. 이미지 업로드</h3>
                </div>
                <div class="relative z-10 flex flex-col items-center flex-1">
                    <div class="w-16 h-16 bg-[var(--bg-main)] rounded-[12px] flex items-center justify-center mb-4 shadow-sm border border-[var(--border-color)]"><i data-lucide="cpu" class="w-7 h-7 text-[var(--text-main)]"></i></div>
                    <h3 class="text-body-strong text-[var(--text-main)] mb-1">2. 고화질 AI 분석</h3>
                </div>
                <div class="relative z-10 flex flex-col items-center flex-1">
                    <div class="w-16 h-16 bg-[var(--bg-main)] rounded-[12px] flex items-center justify-center mb-4 shadow-sm border border-[var(--border-color)]"><i data-lucide="box" class="w-7 h-7 text-[var(--text-main)]"></i></div>
                    <h3 class="text-body-strong text-[var(--text-main)] mb-1">3. 조정 및 렌더링</h3>
                </div>
                <div class="relative z-10 flex flex-col items-center flex-1">
                    <div class="w-16 h-16 bg-[var(--bg-main)] rounded-[12px] flex items-center justify-center mb-4 shadow-sm border border-[var(--border-color)]"><i data-lucide="download" class="w-7 h-7 text-[var(--text-main)]"></i></div>
                    <h3 class="text-body-strong text-[var(--text-main)] mb-1">4. 내보내기</h3>
                </div>
            </div>
            
            <!-- KeyShot 매뉴얼 -->
            <div class="bg-[var(--bg-main)] rounded-[12px] p-6 border border-[var(--border-color)] text-left">
                <h3 class="text-card-title text-[var(--text-main)] mb-4 flex items-center gap-2"><i data-lucide="book-open" class="w-5 h-5"></i> KeyShot 재질 노드 연결 방법</h3>
                <ul class="space-y-4 text-caption text-[var(--text-sub)]">
                    <li><strong class="text-[var(--text-main)] text-body-strong">1. 확산 (Diffuse/Albedo):</strong> KeyShot 재질 속성의 <span class="text-[var(--apple-blue-dark)]">'색상(Color)'</span> 또는 '디퓨즈' 채널에 연결합니다.</li>
                    <li><strong class="text-[var(--text-main)] text-body-strong">2. 범프 (Bump/Height):</strong> <span class="text-[var(--apple-blue-dark)]">'범프(Bump)'</span> 채널에 연결하세요. 물리적 요철을 살려줍니다.</li>
                    <li><strong class="text-[var(--text-main)] text-body-strong">3. 반사 (Specular/Roughness):</strong> <span class="text-[var(--apple-blue-dark)]">'거칠기(Roughness)'</span> 맵으로 연결합니다.</li>
                    <li><strong class="text-[var(--text-main)] text-body-strong">4. 타일링 (Seamless):</strong> 적용된 모든 맵은 타일링 처리(미러링 래핑)가 적용되어 있어, KeyShot 내에서 스케일을 조절해도 이음새가 어색하지 않고 자연스럽게 이어집니다.</li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Image Preview Lightbox Modal -->
    <div id="lightbox-modal" class="fixed inset-0 z-[70] hidden flex items-center justify-center bg-black/80 backdrop-blur-[10px] transition-opacity duration-300">
        <button id="btn-close-lightbox" class="absolute top-6 right-6 text-white/50 hover:text-white transition z-10 p-2 bg-black/20 rounded-full">
            <i data-lucide="x" class="w-8 h-8"></i>
        </button>
        <div class="relative w-[90%] max-w-6xl max-h-[90vh] flex items-center justify-center">
            <img id="lightbox-img" src="" class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl">
        </div>
    </div>

    <!-- Header -->
    <header class="apple-nav-glass h-[56px] border-b border-[var(--border-color)] flex items-center justify-between px-6 shrink-0 z-10 w-full fixed top-0">
        <div class="flex items-center gap-8">
            <span class="text-body-strong tracking-tight text-[var(--text-main)] flex items-center gap-2">
                <i data-lucide="aperture" class="w-5 h-5 text-[var(--text-main)]"></i>
                AI PBR Studio
            </span>
            <nav class="flex gap-6 text-caption text-[var(--text-sub)]">
                <button id="btn-open-guide" class="hover:text-[var(--text-main)] transition">사용 가이드</button>
            </nav>
        </div>
        <div class="flex items-center gap-5 text-caption">
            <!-- Dark / Light Theme Toggle -->
            <button id="btn-theme-toggle" class="hover:text-[var(--text-main)] text-[var(--text-sub)] transition flex items-center justify-center w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] shadow-sm">
                <i data-lucide="sun" class="w-4 h-4"></i>
            </button>
            
            <span id="user-display" class="text-[var(--text-muted)] font-medium hidden">foundfounded</span>
            <button id="btn-login-toggle" class="apple-btn-dark py-1.5 px-4 text-xs font-semibold">로그인</button>
        </div>
    </header>

    <!-- Main Workspace -->
    <main class="flex-1 flex overflow-hidden relative mt-[56px]">
        
        <!-- Center: Viewer Area -->
        <div class="flex-1 flex flex-col relative bg-[var(--bg-main)]">
            <!-- View Tabs -->
            <div class="absolute top-6 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] rounded-[980px] p-1 z-10 flex shadow-lg border border-[var(--border-color)]">
                <button id="btn-3d" class="apple-pill-tab active text-[var(--text-main)] flex items-center gap-2">
                    <i data-lucide="box" class="w-4 h-4"></i> 3D 뷰어
                </button>
                <button id="btn-2d" class="apple-pill-tab text-[var(--text-muted)] flex items-center gap-2">
                    <i data-lucide="image" class="w-4 h-4"></i> 2D 데이터
                </button>
                <button id="btn-library" class="apple-pill-tab text-[var(--text-muted)] flex items-center gap-2">
                    <i data-lucide="library" class="w-4 h-4"></i> 라이브러리
                </button>
            </div>

            <!-- 3D Canvas -->
            <div id="view-3d" class="w-full h-full relative flex flex-col">
                <div id="canvas-container" class="flex-1 w-full"></div>

                <div class="absolute right-6 bottom-6 flex flex-col gap-3 z-10">
                    <button id="btn-zoom-in" class="w-10 h-10 bg-[var(--bg-card)] border border-[var(--border-color)] hover:bg-[var(--hover-bg)] text-[var(--text-main)] rounded-full flex items-center justify-center transition shadow-md"><i data-lucide="plus" class="w-5 h-5"></i></button>
                    <button id="btn-zoom-out" class="w-10 h-10 bg-[var(--bg-card)] border border-[var(--border-color)] hover:bg-[var(--hover-bg)] text-[var(--text-main)] rounded-full flex items-center justify-center transition shadow-md"><i data-lucide="minus" class="w-5 h-5"></i></button>
                </div>

                <!-- AI Processing Overlay -->
                <div id="loading" class="absolute inset-0 bg-[var(--overlay-bg)] backdrop-blur-[10px] flex items-center justify-center z-20 hidden">
                    <div class="flex flex-col items-center gap-6">
                        <i data-lucide="loader-2" class="w-12 h-12 text-[var(--apple-blue)] animate-spin"></i>
                        <span class="text-body-strong text-[var(--text-main)]">AI가 이미지를 고화질 PBR로 처리 중입니다...</span>
                    </div>
                </div>
            </div>

            <!-- 2D Maps Grid -->
            <div id="view-2d" class="w-full h-full hidden overflow-y-auto p-12 pt-24 bg-[var(--bg-main)]">
                <div class="max-w-5xl mx-auto mb-8 flex justify-between items-end">
                    <div>
                        <h2 class="text-title text-[var(--text-main)] mb-1">추출된 맵 데이터 (High-Res)</h2>
                        <p class="text-body text-[var(--text-muted)]">이미지를 클릭하면 원본 크기로 확인할 수 있습니다.</p>
                    </div>
                    <button id="btn-download-all-2d" class="apple-btn-primary flex items-center gap-2">
                        <i data-lucide="download-cloud" class="w-4 h-4"></i> 맵 일괄 저장
                    </button>
                </div>
                
                <div class="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <div class="apple-card p-5 border border-[var(--border-color)]">
                        <h3 class="text-body-strong text-[var(--text-sub)] mb-4">원본 이미지 (Albedo)</h3>
                        <div class="aspect-square bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg overflow-hidden">
                            <img id="img-albedo" src="" class="w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-500" title="클릭하여 확대">
                        </div>
                    </div>
                    <div class="apple-card p-5 border border-[var(--border-color)]">
                        <h3 class="text-body-strong text-[var(--text-sub)] mb-4">범프맵 (Bump)</h3>
                        <div class="aspect-square bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg overflow-hidden">
                            <img id="img-bump" src="" class="w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-500" title="클릭하여 확대">
                        </div>
                    </div>
                    <div class="apple-card p-5 border border-[var(--border-color)]">
                        <h3 class="text-body-strong text-[var(--text-sub)] mb-4">노말맵 (Normal)</h3>
                        <div class="aspect-square bg-[var(--bg-main)] border border-[var(--border-color)] rounded-lg overflow-hidden">
                            <img id="img-normal" src="" class="w-full h-full object-cover cursor-pointer hover:scale-105 transition duration-500" title="클릭하여 확대">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Library View -->
            <div id="view-library" class="w-full h-full hidden overflow-y-auto p-12 pt-24 bg-[var(--bg-main)]">
                <div class="max-w-5xl mx-auto mb-8 flex justify-between items-end border-b border-[var(--border-color)] pb-6">
                    <div>
                        <h2 class="text-title text-[var(--text-main)] mb-2">마이 재질 라이브러리</h2>
                        <p class="text-body text-[var(--text-muted)]">저장된 데이터베이스. 클릭하여 3D 뷰어에 적용하세요.</p>
                    </div>
                    <div class="flex bg-[var(--bg-panel)] rounded-lg p-1 border border-[var(--border-color)]">
                        <button id="btn-view-grid" class="p-2 rounded-md bg-[var(--hover-bg)] text-[var(--text-main)] transition shadow-sm"><i data-lucide="grid" class="w-5 h-5"></i></button>
                        <button id="btn-view-list" class="p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] transition"><i data-lucide="list" class="w-5 h-5"></i></button>
                    </div>
                </div>
                
                <div id="library-list" class="max-w-5xl mx-auto">
                    <!-- 라이브러리 아이템 렌더링 영역 -->
                </div>
            </div>
            
        </div>

        <!-- Right: Control Panel -->
        <div class="w-[380px] apple-surface flex flex-col z-20 shadow-2xl border-l border-[var(--border-color)]">
            <!-- Upload Section -->
            <div id="panel-upload" class="p-8 flex-1 flex flex-col">
                <h1 class="text-card-title text-[var(--text-main)] mb-2">새 재질 생성</h1>
                <p class="text-caption text-[var(--text-muted)] mb-8">질감 이미지를 업로드하여 Seamless PBR로 변환합니다.</p>
                
                <label for="file-upload" id="drop-zone" class="bg-[var(--bg-card)] border border-dashed border-[var(--border-color)] hover:border-[var(--apple-blue)] rounded-[12px] p-8 flex flex-col items-center justify-center text-center cursor-pointer transition flex-1 min-h-[250px]">
                    <i data-lucide="plus" class="w-8 h-8 text-[var(--text-muted)] mb-3"></i>
                    <span class="text-body text-[var(--text-main)] mb-1">여기를 클릭하여 첨부</span>
                    <span class="text-nav text-[var(--text-muted)]">고해상도 이미지 권장</span>
                    <input id="file-upload" type="file" accept="image/jpeg, image/png" class="hidden">
                </label>
                
                <div id="image-preview-container" class="hidden mt-4 flex-col items-center flex-1">
                    <div class="w-full bg-[var(--bg-main)] rounded-xl border border-[var(--border-color)] overflow-hidden mb-6 aspect-square flex items-center justify-center">
                        <img id="source-image-preview" class="max-w-full max-h-full object-contain">
                    </div>
                    <div class="w-full mt-auto">
                        <button id="btn-generate" class="w-full apple-btn-primary mb-3 py-3">고화질 재질 생성</button>
                        <button id="btn-cancel" class="w-full text-caption text-[var(--text-muted)] hover:text-[var(--text-main)] transition py-2">다른 이미지 선택</button>
                    </div>
                </div>
            </div>

            <!-- Result Section -->
            <div id="panel-result" class="hidden flex-col h-full overflow-y-auto">
                <div class="p-8 pb-6 border-b border-[var(--border-color)]">
                    <div class="flex items-center gap-2 mb-2">
                        <div class="w-2 h-2 rounded-full bg-green-500"></div>
                        <span class="text-nav font-medium text-green-500">생성 완료</span>
                    </div>
                    <h1 class="text-title text-[var(--text-main)] mb-1" id="result-mat-name">커스텀 텍스처</h1>
                    <p class="text-caption text-[var(--text-muted)] mb-6">라이브러리에 자동 등록되었습니다.</p>
                    
                    <div class="bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] flex justify-between">
                        <div class="text-center w-full border-r border-[var(--border-color)]">
                            <div class="text-body-strong text-[var(--text-main)]">4 Maps</div>
                            <div class="text-nav text-[var(--text-muted)]">High-Res</div>
                        </div>
                        <div class="text-center w-full">
                            <div class="text-body-strong text-[var(--apple-blue)]">Seamless</div>
                            <div class="text-nav text-[var(--text-muted)]">Tiling Ready</div>
                        </div>
                    </div>
                </div>

                <!-- NEW: Scale & Angle Controls in Panel -->
                <div class="px-8 py-6 flex-1 flex flex-col gap-8">
                    
                    <!-- Scale Slider -->
                    <div>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-body text-[var(--text-main)]">Scale</span>
                            <div class="bg-[var(--bg-card)] px-3 py-1 rounded text-[var(--text-main)] text-body-strong border border-[var(--border-color)] min-w-[64px] text-center cursor-text transition hover:border-[var(--apple-blue)]" id="val-scale" title="더블클릭하여 직접 입력">1.0</div>
                        </div>
                        <div class="flex items-center gap-4">
                            <i data-lucide="minimize" class="w-5 h-5 text-[var(--text-muted)]"></i>
                            <input type="range" id="slider-scale" min="0.1" max="5" step="0.1" value="1" class="flex-1">
                            <i data-lucide="maximize" class="w-5 h-5 text-[var(--text-muted)]"></i>
                        </div>
                    </div>

                    <!-- Angle Slider -->
                    <div>
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-body text-[var(--text-main)]">Angle</span>
                            <div class="bg-[var(--bg-card)] px-3 py-1 rounded text-[var(--text-main)] text-body-strong border border-[var(--border-color)] min-w-[64px] text-center cursor-text transition hover:border-[var(--apple-blue)]" id="val-angle" title="더블클릭하여 직접 입력">0°</div>
                        </div>
                        <div class="flex items-center gap-4">
                            <i data-lucide="rotate-ccw" class="w-5 h-5 text-[var(--text-muted)]"></i>
                            <input type="range" id="slider-angle" min="0" max="360" step="1" value="0" class="flex-1">
                            <i data-lucide="rotate-cw" class="w-5 h-5 text-[var(--text-muted)]"></i>
                        </div>
                    </div>

                    <button id="btn-save-transform" class="w-full apple-btn-dark text-body py-2 mt-4 transition">현재 수치값 저장</button>
                </div>

                <div class="p-8 pt-0 flex flex-col gap-3 mt-auto">
                    <button id="download-kmp" class="w-full apple-btn-primary flex items-center justify-center gap-2 py-3">
                        <i data-lucide="download" class="w-5 h-5"></i> KeyShot KMP 내보내기
                    </button>
                    <button id="btn-new-material" class="w-full text-caption text-[var(--text-main)] hover:underline flex items-center justify-center gap-2 py-2">
                        새로운 재질 생성하기
                    </button>
                </div>
            </div>
        </div>
    </main>

    <script>
        lucide.createIcons();

        // --- Theme Logic ---
        const themeToggleBtn = document.getElementById('btn-theme-toggle');
        const themeIcon = themeToggleBtn.querySelector('i');
        let isLightMode = false;
        
        themeToggleBtn.addEventListener('click', () => {
            isLightMode = !isLightMode;
            if (isLightMode) {
                document.body.setAttribute('data-theme', 'light');
                themeIcon.setAttribute('data-lucide', 'moon');
            } else {
                document.body.removeAttribute('data-theme');
                themeIcon.setAttribute('data-lucide', 'sun');
            }
            lucide.createIcons();
            // Update Slider Backgrounds on theme change
            updateMaterialTransform(); 
        });

        // --- Auth & Library Logic ---
        let currentUserId = 'guest';
        let libraryViewMode = 'grid'; 
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
            
            if (libraryViewMode === 'grid') {
                listEl.className = 'max-w-5xl mx-auto grid grid-cols-3 gap-6';
            } else {
                listEl.className = 'max-w-5xl mx-auto flex flex-col space-y-3';
            }
            
            if(materialsLib.length === 0) {
                listEl.className = 'max-w-5xl mx-auto';
                listEl.innerHTML = '<p class="text-body text-[var(--text-muted)] text-center mt-20">생성된 재질이 없습니다.</p>';
                return;
            }

            materialsLib.forEach(mat => {
                const item = document.createElement('div');
                const isActive = mat.id === activeMaterialId;
                
                if (libraryViewMode === 'grid') {
                    item.className = `apple-card p-4 flex flex-col cursor-pointer transition border ${isActive ? 'border-[var(--apple-blue)] bg-[var(--hover-bg)]' : 'border-transparent hover:border-[var(--border-color)]'}`;
                    item.innerHTML = `
                        <div class="relative w-full aspect-square mb-4 rounded-lg overflow-hidden bg-[var(--bg-main)] border border-[var(--border-color)]">
                            <img src="${mat.maps.albedo}" class="w-full h-full object-cover hover:scale-105 transition duration-500">
                            <button class="btn-fav absolute top-3 right-3 p-2 bg-[var(--glass-bg)] backdrop-blur-md rounded-full hover:brightness-125 transition" data-id="${mat.id}">
                                <svg class="w-5 h-5 heart-icon ${mat.isFavorite ? 'active' : 'text-[var(--text-muted)]'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </button>
                        </div>
                        <h3 class="text-body-strong text-[var(--text-main)] truncate px-1">${mat.name}</h3>
                    `;
                } else {
                    item.className = `p-4 rounded-xl flex items-center justify-between cursor-pointer transition border ${isActive ? 'bg-[var(--hover-bg)] border-[var(--apple-blue)]' : 'bg-[var(--bg-card)] hover:bg-[var(--hover-bg)] border-transparent'}`;
                    item.innerHTML = `
                        <div class="flex items-center gap-5 flex-1 overflow-hidden">
                            <img src="${mat.maps.albedo}" class="w-16 h-16 rounded-lg shadow-sm border border-[var(--border-color)] object-cover flex-shrink-0">
                            <div>
                                <h3 class="text-body-strong text-[var(--text-main)] truncate">${mat.name}</h3>
                                <p class="text-caption text-[var(--text-muted)] mt-1">Scale: ${mat.scale}x | Angle: ${mat.angle}°</p>
                            </div>
                        </div>
                        <button class="btn-fav p-3 rounded-full hover:bg-[var(--hover-bg)] transition flex-shrink-0" data-id="${mat.id}">
                            <svg class="w-6 h-6 heart-icon ${mat.isFavorite ? 'active' : 'text-[var(--text-muted)]'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </button>
                    `;
                }

                item.addEventListener('click', (e) => {
                    if(e.target.closest('.btn-fav')) return; 
                    loadMaterialToViewer(mat);
                    document.getElementById('btn-3d').click();
                });

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
            saveLibrary();
            loadMaterialToViewer(newMat);
            renderLibrary();
        };

        // --- 3D Viewer Setup ---
        let scene, camera, renderer, controls, sphere, container;
        let currentMaps = {};
        
        // 아이들 타이머 로직 (5초 대기 시 멈춘 시점에서 메쉬 자동 회전)
        let idleTimer;
        let isIdle = true;
        const resetIdleTimer = () => {
            isIdle = false;
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => { isIdle = true; }, 5000);
        };

        // High-Res (1024x1024) Mock Generation for Brushed Metal
        function createBrushedMetalTextures() {
            const size = 1024;
            const cAlbedo = document.createElement('canvas'); cAlbedo.width = size; cAlbedo.height = size;
            const ctxA = cAlbedo.getContext('2d');
            ctxA.fillStyle = '#b0b5ba'; ctxA.fillRect(0, 0, size, size);
            for(let i=0; i<8000; i++) {
                ctxA.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.08})`;
                ctxA.fillRect(0, Math.random() * size, size, Math.random() * 2);
                ctxA.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.06})`;
                ctxA.fillRect(0, Math.random() * size, size, Math.random() * 2);
            }

            const cRough = document.createElement('canvas'); cRough.width = size; cRough.height = size;
            const ctxR = cRough.getContext('2d');
            ctxR.fillStyle = '#606060'; ctxR.fillRect(0, 0, size, size); 
            for(let i=0; i<6000; i++) {
                ctxR.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.15})`;
                ctxR.fillRect(0, Math.random() * size, size, 1.5);
            }

            const cBump = document.createElement('canvas'); cBump.width = size; cBump.height = size;
            const ctxB = cBump.getContext('2d');
            ctxB.fillStyle = '#808080'; ctxB.fillRect(0, 0, size, size);
            for(let i=0; i<4000; i++) {
                ctxB.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
                ctxB.fillRect(0, Math.random() * size, size, 1.5);
            }

            const cNormal = document.createElement('canvas'); cNormal.width = size; cNormal.height = size;
            const ctxN = cNormal.getContext('2d');
            ctxN.fillStyle = '#8080ff'; ctxN.fillRect(0, 0, size, size);

            return {
                albedo: cAlbedo.toDataURL('image/jpeg', 0.6), // 0.6 to save localstorage quota
                bump: cBump.toDataURL('image/jpeg', 0.6),
                roughness: cRough.toDataURL('image/jpeg', 0.6),
                normal: cNormal.toDataURL('image/jpeg', 0.6)
            };
        }

        // 실제 픽셀 연산을 통해 Albedo 이미지에서 Bump, Roughness, Normal 맵을 추출하는 함수
        function generatePBRMapsFromCanvas(sourceCanvas) {
            const width = sourceCanvas.width;
            const height = sourceCanvas.height;
            const ctx = sourceCanvas.getContext('2d');
            const imgData = ctx.getImageData(0, 0, width, height);
            const data = imgData.data;

            const bumpData = new Uint8ClampedArray(data.length);
            const roughData = new Uint8ClampedArray(data.length);
            const normalData = new Uint8ClampedArray(data.length);

            // 명도(Luminance) 미리 계산
            const luminance = new Float32Array(width * height);
            for (let i = 0; i < data.length; i += 4) {
                // RGB 값을 기반으로 명도 계산
                const lum = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2];
                luminance[i/4] = lum;

                // Bump Map: 흑백(Grayscale) 처리
                bumpData[i] = bumpData[i+1] = bumpData[i+2] = lum;
                bumpData[i+3] = 255;

                // Roughness Map: 반전된 명도 (밝은 곳을 거칠게)
                roughData[i] = roughData[i+1] = roughData[i+2] = 255 - lum;
                roughData[i+3] = 255;
            }

            // Normal Map: 소벨(Sobel) 필터를 이용한 기울기(Gradient) 계산
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;

                    // 경계값 처리
                    const xLeft   = Math.max(0, x - 1);
                    const xRight  = Math.min(width - 1, x + 1);
                    const yUp     = Math.max(0, y - 1);
                    const yDown   = Math.min(height - 1, y + 1);

                    const lLeft   = luminance[y * width + xLeft];
                    const lRight  = luminance[y * width + xRight];
                    const lUp     = luminance[yUp * width + x];
                    const lDown   = luminance[yDown * width + x];

                    // X, Y 축 기울기 강도
                    const dX = (lRight - lLeft) * 2.0; 
                    const dY = (lDown - lUp) * 2.0;
                    const dZ = 255.0; // 높이 뎁스 강도

                    // 벡터 정규화
                    const length = Math.sqrt(dX * dX + dY * dY + dZ * dZ);
                    const nX = dX / length;
                    const nY = dY / length;
                    const nZ = dZ / length;

                    // 노말맵 색상 매핑 (-1 ~ 1 범위를 0 ~ 255 RGB로 변환)
                    normalData[i]     = Math.floor((nX + 1.0) * 127.5); // R
                    normalData[i + 1] = Math.floor((nY + 1.0) * 127.5); // G
                    normalData[i + 2] = Math.floor(nZ * 255.0);         // B
                    normalData[i + 3] = 255;                            // A
                }
            }

            const createCanvasObj = (arrayData) => {
                const c = document.createElement('canvas');
                c.width = width; c.height = height;
                const cCtx = c.getContext('2d');
                cCtx.putImageData(new ImageData(arrayData, width, height), 0, 0);
                return c.toDataURL('image/jpeg', 0.8); // 고화질 출력 (0.8)
            };

            return {
                albedo: sourceCanvas.toDataURL('image/jpeg', 0.8),
                bump: createCanvasObj(bumpData),
                roughness: createCanvasObj(roughData),
                normal: createCanvasObj(normalData)
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
            
            // 컨트롤러 기본값 복원 (좌클릭 회전)
            controls.mouseButtons = {
                LEFT: THREE.MOUSE.ROTATE,
                MIDDLE: THREE.MOUSE.PAN,
                RIGHT: THREE.MOUSE.ROTATE
            };
            
            controls.addEventListener('start', resetIdleTimer);
            controls.addEventListener('change', resetIdleTimer);

            const geometry = new THREE.SphereGeometry(1, 128, 128);
            sphere = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: 0x555555 }));
            scene.add(sphere);

            const animate = () => {
                requestAnimationFrame(animate);
                
                // 사용자가 멈춘 뷰 각도에서 구체 메쉬가 한 방향으로 자동 회전 (카메라 리셋 안함)
                if(isIdle && !controls.state) {
                    sphere.rotation.y += 0.0015;
                }
                
                controls.update();
                renderer.render(scene, camera);
            };
            animate();
            resetIdleTimer();

            window.addEventListener('resize', () => {
                if(!container) return;
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(container.clientWidth, container.clientHeight);
            });

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
            
            document.getElementById('result-mat-name').textContent = matData.name;
            
            document.getElementById('slider-scale').value = matData.scale;
            document.getElementById('val-scale').textContent = `${matData.scale}`;
            document.getElementById('slider-angle').value = matData.angle;
            document.getElementById('val-angle').textContent = `${matData.angle}°`;
            updateSliderBg(document.getElementById('slider-scale'));
            updateSliderBg(document.getElementById('slider-angle'));

            document.getElementById('img-albedo').src = currentMaps.albedo;
            document.getElementById('img-bump').src = currentMaps.bump;
            document.getElementById('img-normal').src = currentMaps.normal;

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
                    
                    sphere.material.metalness = matData.name.includes("메탈") ? 1.0 : 0.1;
                    sphere.material.needsUpdate = true;
                });
            };

            applyTexture(currentMaps.albedo, 'map');
            applyTexture(currentMaps.bump, 'bumpMap');
            applyTexture(currentMaps.roughness, 'roughnessMap');
            applyTexture(currentMaps.normal, 'normalMap');

            renderLibrary();
            // Show result panel if it's hidden
            document.getElementById('panel-upload').classList.add('hidden');
            document.getElementById('panel-result').classList.remove('hidden');
            document.getElementById('panel-result').classList.add('flex');
        };

        const updateSliderBg = (slider) => {
            const min = parseFloat(slider.min) || 0;
            const max = parseFloat(slider.max) || 100;
            const val = parseFloat(slider.value);
            const percentage = (val - min) / (max - min);
            
            // 16px 원형 버튼 기준 중앙 위치 정밀 계산 (파란색 바 끊김 방지)
            slider.style.setProperty('--slider-percent', `calc(8px + (100% - 16px) * ${percentage})`);
        };

        const updateMaterialTransform = () => {
            const scaleSlider = document.getElementById('slider-scale');
            const angleSlider = document.getElementById('slider-angle');
            
            const scale = parseFloat(scaleSlider.value);
            const angleDeg = parseFloat(angleSlider.value);
            const angleRad = angleDeg * (Math.PI / 180);

            document.getElementById('val-scale').textContent = `${scale}`;
            document.getElementById('val-angle').textContent = `${angleDeg}°`;
            
            updateSliderBg(scaleSlider);
            updateSliderBg(angleSlider);

            const maps = ['map', 'bumpMap', 'roughnessMap', 'normalMap'];
            maps.forEach(m => {
                if(sphere && sphere.material[m]) {
                    sphere.material[m].repeat.set(scale, scale);
                    sphere.material[m].rotation = angleRad;
                }
            });
            if(sphere) sphere.material.needsUpdate = true;
            resetIdleTimer();
        };

        document.getElementById('slider-scale').addEventListener('input', updateMaterialTransform);
        document.getElementById('slider-angle').addEventListener('input', updateMaterialTransform);

        // --- Direct Text Input for Scale & Angle (더블클릭 기능) ---
        const setupDirectInput = (id, isScale) => {
            const span = document.getElementById(id);
            span.addEventListener('dblclick', function() {
                const currentText = this.textContent.replace('°', '');
                const currentVal = parseFloat(currentText);
                
                const input = document.createElement('input');
                input.type = 'number';
                input.value = currentVal;
                // 스타일 처리
                input.className = 'w-full bg-transparent text-center text-[var(--apple-blue)] font-mono outline-none';
                if(isScale) { input.step = "0.1"; input.min = "0.1"; input.max = "5"; }
                else { input.step = "1"; input.min = "0"; input.max = "360"; }
                
                const finishEdit = () => {
                    let newVal = parseFloat(input.value);
                    if (isNaN(newVal)) newVal = currentVal;
                    // min max bounding
                    newVal = isScale ? Math.max(0.1, Math.min(5, newVal)) : Math.max(0, Math.min(360, newVal));
                    
                    document.getElementById(isScale ? 'slider-scale' : 'slider-angle').value = newVal;
                    // span 텍스트 원상복구 후 업데이트 함수 호출
                    span.innerHTML = '';
                    updateMaterialTransform();
                };

                input.addEventListener('blur', finishEdit);
                input.addEventListener('keydown', (e) => {
                    if(e.key === 'Enter') input.blur();
                });

                this.innerHTML = '';
                this.appendChild(input);
                input.focus();
                input.select();
            });
        };
        setupDirectInput('val-scale', true);
        setupDirectInput('val-angle', false);

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
                btn.classList.add('text-green-500');
                btn.classList.remove('text-[var(--text-main)]');
                setTimeout(() => {
                    btn.textContent = origText;
                    btn.classList.remove('text-green-500');
                    btn.classList.add('text-[var(--text-main)]');
                }, 2000);
            }
        });

        // --- UI Interactions ---
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
                currentUserId = 'guest';
                btnLoginToggle.textContent = '로그인';
                userDisplay.classList.add('hidden');
                loadLibrary(); 
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
                
                loadLibrary(); 
                if(materialsLib.length === 0) {
                    const defaultMaps = createBrushedMetalTextures();
                    createNewMaterialEntry(defaultMaps, "브러시드 메탈");
                } else {
                    loadMaterialToViewer(materialsLib[0]);
                }
            } else {
                errorMsg.classList.remove('hidden');
            }
        });

        const initialModal = document.getElementById('initial-modal');
        document.getElementById('btn-close-modal').addEventListener('click', () => initialModal.classList.add('hidden'));

        const guideModal = document.getElementById('guide-modal');
        document.getElementById('btn-open-guide').addEventListener('click', () => guideModal.classList.remove('hidden'));
        document.getElementById('btn-close-guide').addEventListener('click', () => guideModal.classList.add('hidden'));

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
                // High-Res (1024x1024) Canvas for AI generation Mock
                const c = document.createElement('canvas'); c.width=1024; c.height=1024;
                const ctx = c.getContext('2d');
                
                // Seamless Tiling Mock: Draw the image mirrored in 4 quadrants
                ctx.save();
                ctx.drawImage(sourcePreview, 0, 0, 512, 512); // Top-Left
                ctx.translate(1024, 0); ctx.scale(-1, 1);
                ctx.drawImage(sourcePreview, 0, 0, 512, 512); // Top-Right
                ctx.restore(); ctx.save();
                ctx.translate(0, 1024); ctx.scale(1, -1);
                ctx.drawImage(sourcePreview, 0, 0, 512, 512); // Bottom-Left
                ctx.restore(); ctx.save();
                ctx.translate(1024, 1024); ctx.scale(-1, -1);
                ctx.drawImage(sourcePreview, 0, 0, 512, 512); // Bottom-Right
                ctx.restore();

                // 픽셀 연산을 통해 범프맵과 노말맵을 실제 데이터로 추출
                const newMaps = generatePBRMapsFromCanvas(c);
                
                createNewMaterialEntry(newMaps, "AI 커스텀 재질");
                
                loadingOverlay.classList.add('hidden');
                document.getElementById('panel-upload').classList.add('hidden');
                document.getElementById('panel-result').classList.remove('hidden');
                document.getElementById('panel-result').classList.add('flex');
                document.getElementById('btn-3d').click();
            }, 3000);
        });

        // --- Lightbox Logic ---
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxImg = document.getElementById('lightbox-img');
        const btnCloseLightbox = document.getElementById('btn-close-lightbox');

        const openLightbox = (src) => {
            if(!src) return;
            lightboxImg.src = src;
            lightboxModal.classList.remove('hidden');
            lightboxModal.classList.add('flex');
        };

        const closeLightbox = () => {
            lightboxModal.classList.add('hidden');
            lightboxModal.classList.remove('flex');
            lightboxImg.src = '';
        };

        document.getElementById('img-albedo').addEventListener('click', function() { openLightbox(this.src); });
        document.getElementById('img-bump').addEventListener('click', function() { openLightbox(this.src); });
        document.getElementById('img-normal').addEventListener('click', function() { openLightbox(this.src); });

        btnCloseLightbox.addEventListener('click', closeLightbox);
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target.parentElement === lightboxModal) {
                closeLightbox();
            }
        });

        const btn3D = document.getElementById('btn-3d');
        const btn2D = document.getElementById('btn-2d');
        const btnLibrary = document.getElementById('btn-library');
        const view3D = document.getElementById('view-3d');
        const view2D = document.getElementById('view-2d');
        const viewLibrary = document.getElementById('view-library');

        const switchTab = (tabName) => {
            view3D.classList.add('hidden');
            view2D.classList.add('hidden');
            viewLibrary.classList.add('hidden');
            
            btn3D.classList.remove('active'); btn3D.style.color = 'var(--text-muted)';
            btn2D.classList.remove('active'); btn2D.style.color = 'var(--text-muted)';
            btnLibrary.classList.remove('active'); btnLibrary.style.color = 'var(--text-muted)';

            if(tabName === '3d') {
                view3D.classList.remove('hidden');
                btn3D.classList.add('active'); btn3D.style.color = 'var(--text-main)';
            } else if(tabName === '2d') {
                view2D.classList.remove('hidden');
                btn2D.classList.add('active'); btn2D.style.color = 'var(--text-main)';
            } else if(tabName === 'library') {
                viewLibrary.classList.remove('hidden');
                btnLibrary.classList.add('active'); btnLibrary.style.color = 'var(--text-main)';
                renderLibrary();
            }
        };

        btn3D.addEventListener('click', () => switchTab('3d'));
        btn2D.addEventListener('click', () => switchTab('2d'));
        btnLibrary.addEventListener('click', () => switchTab('library'));

        const btnViewGrid = document.getElementById('btn-view-grid');
        const btnViewList = document.getElementById('btn-view-list');

        btnViewGrid.addEventListener('click', () => {
            libraryViewMode = 'grid';
            btnViewGrid.className = 'p-2 rounded-md bg-[var(--hover-bg)] text-[var(--text-main)] transition shadow-sm';
            btnViewList.className = 'p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] transition';
            renderLibrary();
        });

        btnViewList.addEventListener('click', () => {
            libraryViewMode = 'list';
            btnViewList.className = 'p-2 rounded-md bg-[var(--hover-bg)] text-[var(--text-main)] transition shadow-sm';
            btnViewGrid.className = 'p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-main)] transition';
            renderLibrary();
        });

        document.getElementById('btn-zoom-in').addEventListener('click', () => {
            if(camera && controls) { camera.translateZ(-0.5); controls.update(); resetIdleTimer(); }
        });
        document.getElementById('btn-zoom-out').addEventListener('click', () => {
            if(camera && controls) { camera.translateZ(0.5); controls.update(); resetIdleTimer(); }
        });

        document.getElementById('btn-new-material').addEventListener('click', () => {
            document.getElementById('panel-result').classList.add('hidden');
            document.getElementById('panel-result').classList.remove('flex');
            document.getElementById('panel-upload').classList.remove('hidden');
            document.getElementById('panel-upload').classList.add('flex');
            
            // 초기화
            fileInput.value = '';
            previewContainer.classList.add('hidden');
            previewContainer.classList.remove('flex');
            dropZone.classList.remove('hidden');
        });

        // --- 다운로드 (일괄 저장 & KMP) 로직 ---
        document.getElementById('btn-download-all-2d').addEventListener('click', () => {
            if(!currentMaps || !currentMaps.albedo) {
                alert("다운로드할 맵 데이터가 없습니다.");
                return;
            }
            
            const btn = document.getElementById('btn-download-all-2d');
            const originalText = btn.innerHTML;
            // 버튼 상태를 로딩 중으로 변경
            btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> 압축 중...';
            lucide.createIcons();

            const zip = new JSZip();
            const matName = document.getElementById('result-mat-name')?.textContent || "PBR_Material";

            // base64 데이터를 zip에 추가하는 헬퍼 함수
            const addFile = (fileName, dataUrl) => {
                if(dataUrl) {
                    const base64Data = dataUrl.split(',')[1];
                    zip.file(fileName, base64Data, {base64: true});
                }
            };

            addFile(`${matName}_Albedo.jpg`, currentMaps.albedo);
            addFile(`${matName}_Bump.jpg`, currentMaps.bump);
            addFile(`${matName}_Roughness.jpg`, currentMaps.roughness);
            addFile(`${matName}_Normal.jpg`, currentMaps.normal);

            // ZIP 생성 및 다운로드 트리거
            zip.generateAsync({type:"blob"}).then(function(content) {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = `${matName}_Maps.zip`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                // 버튼 원상복구
                btn.innerHTML = originalText;
                lucide.createIcons();
            });
        });

        document.getElementById('download-kmp').addEventListener('click', () => {
            const matName = document.getElementById('result-mat-name')?.textContent || "PBR_Material";
            
            // KMP 가상 데이터 구조
            const mockKmpData = `<?xml version='1.0'?>\n<keyshot_material>\n  <name>${matName}</name>\n  <type>advanced</type>\n  <data>Simulated KMP mapping for PBR material.</data>\n</keyshot_material>`;
            const blob = new Blob([mockKmpData], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${matName}.kmp`;
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });

        window.onload = init3DViewer;
    </script>
</body>
</html>
