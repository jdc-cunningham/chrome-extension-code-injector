/**
 * note the offset units in the overlay are based on the UI as of 08/08/2020
 * as of now, this is only intended for use on Desktop, trying to actually bind to elements on page
 * as I initially did takes too long/still see the stuff that's trying to be hidden before script works
 * also note my monitor that I mainly use is at least 1920px resolution, height doesn't seem to matter.
 */

// create overlay
const customOverlay = `<div
    id="youtube-tile-overlay"
    style="
        position: fixed;
        top: 0;
        left: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        color: #808080;
        width: 100%;
        height: 100%;
        min-height: 100vh;
        z-index: 1;
    ">
        <h2>Click to hide overlay</h2>
    </div>`;

window.onload = () => {
    document.body.addEventListener('click', function() {
        document.getElementById('primary').classList.add('override-z-index');
    });

    // let primaryLoadedInterval;
    // let primary = null;

    // primaryLoadedInterval = setInterval(() => {
    //     if (!primary) {
    //         primary = document.getElementById('primary');
    //         document.querySelector('ytd-app').insertBefore += customOverlay;
    //         clearInterval(primaryLoadedInterval);
    //     }
    // }, 150);
};

console.log('YT code ran');

// listen for click event that removes self
// youtubeTiles.addEventListener('click', function () {
//     this.innerHTML -= customOverlay;
// });