async function kirim() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const pesan = input.value;
  if (pesan === "") return;

  chat.innerHTML += `<p class="user"><b>Kamu:</b> ${pesan}</p>`;
  input.value = "";

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/gpt2",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer hf_EEtdjUfhY0kKNotfzrEiNb0sAYOtWNHKP",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: pesan })
      }
    );

    const data = await response.json();

    if (Array.isArray(data)) {
      chat.innerHTML += `<p class="bot"><b>Bot:</b> ${data[0].generated_text}</p>`;
    } else if (data.generated_text) {
      chat.innerHTML += `<p class="bot"><b>Bot:</b> ${data.generated_text}</p>`;
    } else if (data.error) {
      chat.innerHTML += `<p class="bot"><b>Error:</b> ${data.error}</p>`;
    } else {
      chat.innerHTML += `<p class="bot"><b>Error:</b> Respon tidak dikenali</p>`;
    }

  } catch (err) {
    chat.innerHTML += `<p class="bot"><b>Error:</b> ${err.message}</p>`;
  }

  chat.scrollTop = chat.scrollHeight;
}