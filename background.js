//
chrome.runtime.onInstalled.addListener((_reason) => {
  //打开配置界面
  chrome.tabs.create({
    url: 'panel/index.html'
  });

  //初始化配置参数的值
  chrome.storage.local.set({ "muteAudio": 0 }, function() {
      console.log("background.js, onInstalled, muteAudio has been initilized to 0.");
  });
});

function sendNotification(msg) {
  //清除通知
  chrome.notifications.clear("notif_id_notready");

  //发出通知
  var notification = {
    type: 'basic',
    iconUrl: 'icons/icon16.png',
    title: 'WARNING',
    message: 'Oracle is not ready, ' + msg
  };

  chrome.notifications.create('notif_id_notready', notification);
}

//
chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  if (request.type === "showNotification") {
    sendNotification(request.message);
  }else if (request.type === "setMuteAudio") {
    //获取当前配置
    chrome.storage.local.get(["muteAudio"], function (result) {
      let toggle = result.muteAudio;

      //切换值
      console.log("background.js, setMuteAudio, before toggle=" + toggle);
      if (toggle == 0)
        toggle = 1
      else
        toggle = 0;
      console.log("background.js, setMuteAudio, after toggle=" + toggle);

      //保存配置
      chrome.storage.local.set({ "muteAudio": toggle }, function() {
        console.log("background.js, setMuteAudio, set muteAudio to " + toggle);
        sendResponse({ data: toggle });
      });
    });
  }else if (request.type === "getMuteAudio") {
    //获取配置
    chrome.storage.local.get(["muteAudio"], function (result) {
      console.log("background.js, getMuteAudio, muteAudio is " + result.muteAudio);
      sendResponse({ data: result.muteAudio });
    });
  }

  return true;
});
