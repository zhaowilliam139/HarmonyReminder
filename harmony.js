var reminder =1;

setInterval(function() {
  console.log("HarmonyReminder");
  let ready = false;

  const nodeList = document.querySelectorAll("button[id='environment-selection']");

  if (nodeList != null) {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].hasAttribute("_ngcontent-ng-c41150646")) {
        //找到了按钮
        nodeList[i].style.backgroundColor = "red";
  
        //按钮文本
        let btnText = nodeList[i].innerHTML.trim();
        console.log(btnText);

        if (btnText.startsWith("Available")) {
          //状态 Available
          ready = true;
          reminder = 1;
          nodeList[i].style.backgroundColor = "blue";
        } else if (btnText.startsWith("Break")) {
          //状态 Break / Lunch
          let myDate = new Date();
          console.log("Current time:" + myDate.getHours() + ":" + myDate.getMinutes());

          //午饭时间不提示 12:30~13:30
          if ((myDate.getHours() >=12 && myDate.getMinutes() >= 30) && (myDate.getHours() <= 13 && myDate.getMinutes() <= 30)) 
          {
              ready = true;
              reminder = 1;
              nodeList[i].style.backgroundColor = "#5E72E4";
          }
        } else if (btnText.startsWith("HANDLING")) {
          //电话拨入拨出 HANDLING INTERACTION
          ready = true;
          reminder = 1;
          nodeList[i].style.backgroundColor = "#5E72E4";
        } else {
            ready = false;
        }
      } else {
        ready = false;
      }
    }  
  }

  if (reminder < 10 && ready == false) {
    reminder++;
    window.open(chrome.runtime.getURL("notready.wav"), "_blank");
  }

}, 10000);