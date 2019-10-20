
/**
 * Background script
 */
var main = () => {

    // Initalize default mode at chrome local storage
    chrome.storage.local.set({blockingAds : false});

    // Add listener to icon click
    chrome.browserAction.onClicked.addListener(function (tab) {
        chrome.storage.local.get(['blockingAds'],(a) => {
            if(a.blockingAds === true){
                chrome.browserAction.setIcon({path: 'assets/icons/turned_off.png'});
            } else {
                chrome.browserAction.setIcon({path: 'assets/icons/turned_on.png'});

            }
            chrome.tabs.sendMessage(tab.id,{"event" : "iconClicked"});
        });
        

        
        
    });
};

main();


