/*Variables*/
var random_evt = 0;
var all_evt_cnt = 1;

var c_evt_light_src = [
    './images/warehouse/light_off.png',
    './images/warehouse/light_on.png'
];
var c_evt_light_isOn = false;

/**
 * Page Loaded
 */
window.onload = function () {
    random_evt = Math.round(Math.random() * (0 + all_evt_cnt) - 0);
    var eContent = document.getElementById('content-evt');

    switch (random_evt) {
        case 1: // Light ON/OFF
            createCtrlLight(eContent);
            break;
        default:
            return;
    }
}

/*Content Event Method*/
function createCtrlLight(eContent) {
    eContent.innerHTML = "<img id='evtImg' src='" + c_evt_light_src[0] +
        "' width=150 height=150 onclick='onCtrlLight(this)' />";
}

function onCtrlLight(imgCtrl) {
    if (c_evt_light_isOn == false) {
        imgCtrl.src = c_evt_light_src[1];
        c_evt_light_isOn = true;
    }
    else {
        imgCtrl.src = c_evt_light_src[0];
        c_evt_light_isOn = false;
    }
}

/* On Click Events - 1300 */
var booAnim = null;
var audioSrc = new Audio('./snd/boo.mp3');
audioSrc.volume = 0.6;
function clickBOO() {
    audioSrc.load();
    audioSrc.play();

    if (booAnim != null) {
        cancelAnimationFrame(booAnim);
        booAnim = null;
    }
    if (booDisappearAnim != null) {
        cancelAnimationFrame(booDisappearAnim);
        booDisappearAnim = null;
    }

    var evtBox = document.getElementById("evt-box");
    if (document.getElementById("BOO") != null) {
        evtBox.removeChild(document.getElementById("BOO"));
    }
    if (document.getElementById("BOO-BLOOD") != null) {
        evtBox.removeChild(document.getElementById("BOO-BLOOD"));
    }

    evtBox.innerHTML += "<img id='BOO' src='./images/warehouse/hand.png' width=0 height=0 />\n";

    var hand = document.getElementById("BOO");
    hand.style.position = "fixed";
    hand.style.verticalAlign = "-moz-middle-with-baseline";
    hand.style.height = "100%";
    hand.style.opacity = 1;

    count = 0;
    booAnim = function() {
        if (count >= 100) {
            hand.style.width = "100%";
            evtBox.innerHTML += "<img id='BOO-BLOOD' src='./images/warehouse/blood.png' width=0 height=0 />";
            var blood = document.getElementById("BOO-BLOOD");
            blood.style.position = "fixed";
            blood.style.verticalAlign = "-moz-middle-with-baseline";
            blood.style.width = "100%";
            blood.style.height = "100%";
            blood.style.opacity = 1;
            disappearBOO(document.getElementById("evt-box"), document.getElementById("BOO"), document.getElementById("BOO-BLOOD"));
            cancelAnimationFrame(booAnim);
            return;
        }

        hand.style.width = count + "%";
        count += 3;
        requestAnimationFrame(booAnim);
    }
    requestAnimationFrame(booAnim);
}

var booDisappearAnim = null;
function disappearBOO(evtBox, hand, blood) {
    var cnt = 1.000;
    booDisappearAnim = function() {
        if (booDisappearAnim == null) {
            cancelAnimationFrame(booDisappearAnim);
            return;
        }

        if (cnt <= 0.000) {
            if (hand != null) {
                evtBox.removeChild(hand);
            }
            if (blood != null) {
                evtBox.removeChild(blood);
            }
            cancelAnimationFrame(booDisappearAnim);
            return;
        }

        hand.style.opacity = cnt;
        blood.style.opacity = cnt;
        cnt -= 0.005;
        requestAnimationFrame(booDisappearAnim);
    }
    requestAnimationFrame(booDisappearAnim);
}

/* On Click Events -  */