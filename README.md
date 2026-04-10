# Gemma 4 Local Chat (Windows)

이 프로젝트는 로컬 PC에서 `gemma4:e4b` 모델을 사용해 ChatGPT 스타일 UI로 대화할 수 있게 합니다.

## 왜 `gemma4:e4b`인가?

현재 PC 확인값:
- RAM: 64GB
- GPU: NVIDIA GeForce RTX 5060 Ti
- VRAM: 약 8GB

8GB VRAM 기준으로는 `gemma4:e4b`가 가장 안정적인 기본 선택입니다.
더 가볍게 쓰려면 `gemma4:e2b`를 사용할 수 있습니다.

## 1) Ollama + 모델 설치

PowerShell에서 프로젝트 폴더로 이동 후:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-gemma4.ps1
