//
document
  .getElementById('toggle-state-button')
  .addEventListener('click', async () => {
    chrome.runtime.sendMessage({ type: "setMuteAudio" }, function (response) {
      console.log("index.js, reponse.data=" + response.data);

      if (response.data == 1) {
        document.getElementById('toggle-state-button').innerText = "Unmute";
      } else {
        document.getElementById('toggle-state-button').innerText = "Mute";
      }
    });
  });
