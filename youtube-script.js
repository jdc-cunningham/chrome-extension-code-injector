/**
 * this checks what you're clicking on for home page
 * the main intent of the YouTube aspect of this extension is to hide
 * the recommended tiles by default. It shows them again by clicking on the page.
 * 
 * in order to not affect the rest of the site's funcitonality eg. searching or clicking
 * on a playlist on the left, the code below also factors in the click coordinate.
 */

window.onload = () => {
    document.body.addEventListener('click', function(e) {
        // magic numbers from top bar and left bar desktop dimensions
        if (e.clientX > 240 && e.clientY > 112) {
            // removes Z index style
            document.getElementById('primary').classList.add('override-z-index');
        }
    });
};