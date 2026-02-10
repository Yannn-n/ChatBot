async function kirim() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const pesan = input.value.trim();
  if (!pesan) return;

  chat.innerHTML += `<p class="user"><b>Kamu:</b> ${pesan}</p>`;
  input.value = "";

  chat.innerHTML += `<p class="bot"><b>Bot:</b> sedang mengetik...</p>`;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
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

    // hapus "sedang mengetik..."
    chat.lastChild.remove();

    if (data.error) {
      chat.innerHTML += `<p class="bot"><b>Bot:</b> ${data.error}</p>`;
    } else {
      chat.innerHTML += `<p class="bot"><b>Bot:</b> ${data[0].generated_text}</p>`;
    }

    chat.scrollTop = chat.scrollHeight;

  } catch (err) {
    chat.lastChild.remove();
    chat.innerHTML += `<p class="bot"><b>Bot:</b> Gagal terhubung ke server</p>`;
  }
}