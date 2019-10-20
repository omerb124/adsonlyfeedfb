/**
 * Main file for content script
 * - Injects 'add note' for each post on FB feed
 * - Adds proper listeners
 */

var main = () => {
    let a = {};

    // const posts_containers = [];

    /**
     * Initalize mutation observing for DOM changes
     */


    // Select the node that will be observed for mutations
    const targetNode = document.getElementById('stream_pagelet');

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
        // console.log(mutationsList);
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target.id.includes("hyperfeed_story_id")) {
                handleInsertedNewPost(mutation.target);
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);


    // // Feed posts
    // on('DOMNodeInserted', 'div[data-testid="fbfeed_story"]', (evt) => {
    //     handleInsertedNewPost('feed');
    // }, false);

    // // Group page posts
    // on('DOMNodeInserted', "div[id*='mall_post']:not([id*='SUGGESTED'])", (evt) => {
    //     handleInsertedNewPost(evt, 'group');
    // }, false);

    // // Page posts
    // on('DOMNodeInserted', "#pagelet_timeline_main_column div[role='article']", (evt) => {
    //     handleInsertedNewPost(evt, 'page');
    // }, false);

    // // Events pages posts
    // on('DOMNodeInserted', "div[id*='mall_post'][role='article'], div[id*='event_post'][role='article']", (evt) => {
    //     handleInsertedNewPost(evt, 'event');
    // }, false);

    /**
     * Filter loaded posts first
     */
    var filterAlreadyLoadedPosts = () => {
        setTimeout(function () {
            let list = Array.from(document.querySelectorAll("div[id*='hyperfeed_story_id']"));
            list.forEach((a) => {
                handleInsertedNewPost(a);
            });
        }, 3000);


    };

    /**
     * Background script listeners
     */
    var addBgscriptListeners = () => {
        chrome.runtime.onMessage.addListener((body, sender, sendResponse) => {
            if (body.event === "iconClicked") {
                chrome.storage.local.get(['blockingAds'], (a) => {
                    if (a.blockingAds === true) {
                        // Pause blocking ads
                        console.log("Paused blocking ads");
                        observer.disconnect();
                        chrome.storage.local.set({ 'blockingAds': false });
                    } else {
                        // Start blocking ads
                        filterAlreadyLoadedPosts();
                        observer.observe(targetNode, config);
                        console.log("Started blocking ads...");
                        chrome.storage.local.set({ 'blockingAds': true });
                    }
                });
            }
        });
    };

    a.init = () => {

        // Adding background scripts listeners
        addBgscriptListeners();

        chrome.storage.local.get(['blockingAds'], (a) => {
            // Filtering already-loaded posts
            if(a.blockingAds === true){
                filterAlreadyLoadedPosts();
            }
            
        });
    }

    return a.init();

}

main();


