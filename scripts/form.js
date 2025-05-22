  function checkEnter(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;

    if (message.trim() !== "") {
      console.log("Verzonden bericht:", message);
      input.value = "";
    } else {
      alert("Typ eerst een bericht!");
    }
  }