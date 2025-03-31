var reminder =1;

setInterval(function() {
  console.log("HarmonyReminder");
  let ready = false;

  const nodeList = document.querySelectorAll("button[id='environment-selection']");

  if (nodeList != null) {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].hasAttribute("_ngcontent-ng-c41150646")) {
        nodeList[i].style.backgroundColor = "red";
  
        let btnText = nodeList[i].innerHTML.trim();
        console.log(btnText);

        if (btnText.startsWith("Available")) {
          ready = true;
          reminder = 1;
          nodeList[i].style.backgroundColor = "#5E72E4";
        } else if (btnText.startsWith("Break")) {
          ready = true;
          reminder = 1;
          nodeList[i].style.backgroundColor = "#5E72E4";
        } else {
          ready = false;
        }
      }
    }  
  }

  if (reminder < 10 && ready == false) {
    reminder++;
    window.open(chrome.runtime.getURL("notready.wav"), "_blank");
  }

}, 60000);