/**
 * Handling listener of inserting new post to feed
 * @param {Object} postElement - post's DOM element
 * @void
 */
var handleInsertedNewPost = (postElement) => {
    // Check if post element is an advertisement
    if(isPostAnAd(postElement)){
        // Hide it
        setTimeout(() => {
            postElement.className += " afrf_ad";
        },100);
        console.log("It's an ad.");
        
    } else {
       
    }

};

/**
 * Checks if post is an advertisement
 * @param {Object} postElement - post's DOM element
 * @return {Boolean} - does it an ad?
 */
var isPostAnAd = (postElement) => {
    try {
        let innerEle = postElement.querySelector("div[data-testid='test-idstorysubtilte");
        // console.log(innerEle);

        if (innerEle.getElementsByTagName("span").length > 10) {
            g = "";
            Array.from(innerEle.getElementsByTagName("span")).forEach((a, b) => {
                if (a.getAttribute('data-content') !== null) {
                    g += a.getAttribute('data-content');
                }

            });
            chars_list = ["S", "p", "o", "n", "s", "o", "r", "e", "d"];
            exist = true;
            chars_list.forEach((d) => {
                if (!g.includes(d)) {
                    exist = false;
                }
            });
            // console.log(g);
            if (g.indexOf(" ") !== -1) exist = false;
            return exist;
        }
        else{
            return false;
        }
    } catch (e) { return false; }
}