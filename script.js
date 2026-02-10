async function kirim() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const pesan = input.value;
  if (pesan === "") return;

  chat.innerHTML += `<p class="user"><b>Kamu:</b> ${pesan}</p>`;
  input.value = "";

  const response = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct",
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: pesan
      })
    }
  );

  const data = await response.json();

  if (data.error) {
    chat.innerHTML += `<p class="bot"><b>Bot:</b> ${data.error}</p>`;
  } else {
    chat.innerHTML += `<p class="bot"><b>Bot:</b> ${data[0].generated_text}</p>`;
  }

  chat.scrollTop = chat.scrollHeight;
}