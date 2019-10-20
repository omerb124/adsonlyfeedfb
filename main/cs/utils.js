/**
 * Utilities file 
 */

/** 
 * .on() vanilla function
 */
var on = function (event, elem, callback, capture) {
    if (typeof (elem) === 'function') {
        capture = callback;
        callback = elem;
        elem = window;
    }
    capture = capture ? true : false;
    elem = typeof elem === 'string' ? document.querySelector(elem) : elem;
    if (!elem) return;
    elem.addEventListener(event, callback, capture);
};

/**
 * Injecting script to active tab via background script
 * @param {Object} injectDetails - object of inject details, like file or code to execute.
 */
var injectScript = (injectDetails) => {
    console.log(injectDetails);
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            {
                type: "injectScript",
                data: {
                    injectDetails: injectDetails
                }
            }, function (response) {
                console.log("Response has been recieved:");
                console.log(response);
                if (response.status !== 200) {
                    reject("Error " + response.status + " during InjectScript() execution:" + response.message);
                }
                else {
                    resolve(response.data);
                }
            });
    });
}

/**
 * @param {Object} element - element to check events on
 * @return {Array}
 */
var getEvents = (element) => {
    var elemEvents = $._data(element, "events");
    var allDocEvnts = $._data(document, "events");
    for (var evntType in allDocEvnts) {
        if (allDocEvnts.hasOwnProperty(evntType)) {
            var evts = allDocEvnts[evntType];
            for (var i = 0; i < evts.length; i++) {
                if ($(element).is(evts[i].selector)) {
                    if (elemEvents == null) {
                        elemEvents = {};
                    }
                    if (!elemEvents.hasOwnProperty(evntType)) {
                        elemEvents[evntType] = [];
                    }
                    elemEvents[evntType].push(evts[i]);
                }
            }
        }
    }
    return elemEvents;
}

/**
 * Finding the closest add's bookmark button (for the most closest post) for given element
 * @param {DOM Object} element - the given element
 * @return {DOM Object}
 */
var findClosetstBookmarkButton = (element) => {
    return $(element).closest("div[data-testid='fbfeed_story']").first().find(".bookmark.add").first() || null;
};

/**
 * Returns parameters of url by given parameter's name and URL
 * @param {String} name 
 * @param {String} url 
 */
var getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}