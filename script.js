async function kirim() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const pesan = input.value.trim();
  if (!pesan) return;

  chat.innerHTML += `<p><b>Kamu:</b> ${pesan}</p>`;
  input.value = "";

  const response = await fetch("https://cool-sun-5a31.thetumbal00.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: pesan })
  });

  const data = await response.json();

  if (data.error) {
    chat.innerHTML += `<p><b>Bot:</b> ${data.error}</p>`;
  } else {
    chat.innerHTML += `<p><b>Bot:</b> ${data[0].generated_text}</p>`;
  }

  chat.scrollTop = chat.scrollHeight;
}