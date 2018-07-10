
console.log('START');

chrome.runtime.onMessage.addListener(messageReceived);

var adsRemoved = 0;

function onRemovedAnAd() {
   console.log('ASS');
   adsRemoved++;
   if (adsRemoved > 0) {
      chrome.browserAction.setBadgeText({text: adsRemoved+''});
   }
}

function messageReceived(msg) {
   console.log(msg);
   if (msg === 'REMOVED_AN_ADD') {
      onRemovedAnAd();
   }
}

console.log('DONE');
