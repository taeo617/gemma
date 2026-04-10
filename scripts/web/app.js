const chatArea = document.getElementById("chatArea");
const chatForm = document.getElementById("chatForm");
const promptInput = document.getElementById("promptInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");
const statusText = document.getElementById("statusText");

const model = "gemma4:e4b";
const messages = [
  {
    role: "system",
    content:
      "You are a helpful local assistant running in a user's PC. Respond in Korean unless user asks otherwise."
  }
];

function addMessage(role, content) {
  const wrap = document.createElement("div");
  wrap.className = `message ${role}`;

  const roleEl = document.createElement("div");
  roleEl.className = "message-role";
  roleEl.textContent = role === "user" ? "You" : "Assistant";

  const contentEl = document.createElement("div");
  contentEl.className = "message-content";
  contentEl.textContent = content;

  wrap.append(roleEl, contentEl);
  chatArea.appendChild(wrap);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function setBusy(busy) {
  sendBtn.disabled = busy;
  statusText.textContent = busy ? "응답 생성 중..." : "준비됨";
}

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = promptInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  messages.push({ role: "user", content: text });
  promptInput.value = "";
  promptInput.style.height = "48px";
  setBusy(true);

  try {
    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages
      })
    });

    const data = await resp.json();
    if (!resp.ok) {
      const errorText = data.error || "알 수 없는 오류";
      addMessage("assistant", `오류: ${errorText}`);
      return;
    }

    const answer = data?.message?.content || "응답이 비어 있습니다.";
    messages.push({ role: "assistant", content: answer });
    addMessage("assistant", answer);
  } catch (err) {
    addMessage("assistant", `연결 오류: ${err.message}`);
  } finally {
    setBusy(false);
  }
});

newChatBtn.addEventListener("click", () => {
  messages.length = 1;
  chatArea.innerHTML = "";
  addMessage(
    "assistant",
    "새 대화를 시작했습니다. 계속 질문해 주세요."
  );
});

promptInput.addEventListener("input", () => {
  promptInput.style.height = "48px";
  promptInput.style.height = `${Math.min(promptInput.scrollHeight, 180)}px`;
});
