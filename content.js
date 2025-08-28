var reminder = 1;
var muteAudio = 0;

setInterval(function() {
  //console.log("HarmonyReminder");
  let ready = false;

  //查询Oracle的状态
  const nodeList = document.querySelectorAll(
    "button[id='environment-selection']"
  );

  if (nodeList != null) {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].hasAttribute("_ngcontent-ng-c41150646")) {
        //Found the button
        nodeList[i].style.backgroundColor = "red";

        //Button text
        var btnText = nodeList[i].innerHTML.trim().toLowerCase();
        //console.log("Harmony button text: " + btnText);

        if (btnText.startsWith("available")) {
          //Available
          ready = true;
          reminder = 1;
          nodeList[i].style.backgroundColor = "blue";
        } else if (btnText.startsWith("break")) {
          //Break / Lunch
          let myDate = new Date();
          //console.log("Current time:" + myDate.getHours() + ":" + myDate.getMinutes());

          //Lunch 12:30~13:30
          if (
            (myDate.getHours() == 12 && myDate.getMinutes() >= 30) ||
            (myDate.getHours() == 13 && myDate.getMinutes() <= 30)
          ) {
            ready = true;
            reminder = 1;
            nodeList[i].style.backgroundColor = "#5E72E4";
          }
        } else if (btnText.startsWith("handling")) {
          //Handling Interaction
          ready = true;
          reminder = 1;
          nodeList[i].style.backgroundColor = "#5E72E4";
        } else if (btnText.startsWith("wrap")) {
          //Wrap up
          ready = true;
          reminder = 1;
          nodeList[i].style.backgroundColor = "#5E72E4";
        } else {
          ready = false;
        }
      }
    }
  }

  if (ready == false) {
    chrome.runtime.sendMessage({ type: "showNotification", message: btnText });

    //获取配置
    chrome.runtime.sendMessage({ type: "getMuteAudio" }, function (response) {
      console.log("content.js, getMuteAudio=" + response.data);
      muteAudio = response.data;
    });

    if (reminder < 10 && ready == false) {
      reminder++;
      if (muteAudio == 0) {
        window.open(chrome.runtime.getURL("audio/notready.wav"), "_blank");
      }
    }
  }
}, 60000);
