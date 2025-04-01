var reminder =1;

setInterval(function() {
  console.log("HarmonyReminder");
  let ready = false;

  const nodeList = document.querySelectorAll("button[id='environment-selection']");

  if (nodeList != null) {
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].hasAttribute("_ngcontent-ng-c41150646")) {
        //Found the button
        nodeList[i].style.backgroundColor = "red";
  
        //Button text
        let btnText = nodeList[i].innerHTML.trim().toLowerCase();
        console.log("Harmony button text: " + btnText);

        if (btnText.startsWith("available")) {
          //Available
          ready = true;
          reminder = 1;
          nodeList[i].style.backgroundColor = "blue";
        } else if (btnText.startsWith("break")) {
          //Break / Lunch
          let myDate = new Date();
          console.log("Current time:" + myDate.getHours() + ":" + myDate.getMinutes());

          //Lunch 12:30~13:30
          if ((myDate.getHours() >=12 && myDate.getMinutes() >= 30) && (myDate.getHours() <= 13 && myDate.getMinutes() <= 30)) 
          {
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

  if (reminder < 10 && ready == false) {
    reminder++;
    window.open(chrome.runtime.getURL("notready.wav"), "_blank");
  }

}, 60000);