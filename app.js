// ========================================================================== //
// Audio & Labels
// ========================================================================== //

function getH1(string){
    return document.getElementById(string).getElementsByTagName("h1")[0];
}

function getH2(string){
    return document.getElementById(string).getElementsByTagName("h2")[0];
}

let audio = {
    "KeyA": {sound: new Audio("sounds/boom.wav"), pressed: false, h1: getH1("1"), h2: getH2("1")},
    "KeyS": {sound: new Audio("sounds/clap.wav"), pressed: false, h1: getH1("2"), h2: getH2("2")},
    "KeyD": {sound: new Audio("sounds/hihat.wav"), pressed: false, h1: getH1("3"), h2: getH2("3")},
    "KeyF": {sound: new Audio("sounds/kick.wav"), pressed: false, h1: getH1("4"), h2: getH2("4")},
    "KeyG": {sound: new Audio("sounds/openhat.wav"), pressed: false, h1: getH1("5"), h2: getH2("5")},
    "KeyH": {sound: new Audio("sounds/ride.wav"), pressed: false, h1: getH1("6"), h2: getH2("6")},
    "KeyJ": {sound: new Audio("sounds/snare.wav"), pressed: false, h1: getH1("7"), h2: getH2("7")},
    "KeyK": {sound: new Audio("sounds/tink.wav"), pressed: false, h1: getH1("8"), h2: getH2("8")},
    "KeyL": {sound: new Audio("sounds/tom.wav"), pressed: false, h1: getH1("9"), h2: getH2("9")},
}

// ========================================================================== //
// Sliders & Labels
// ========================================================================== //

let selectedVolume = document.getElementById("input_volume");
let selectedPlayback = document.getElementById("input_playback");
let labelVolume = document.getElementById("label_volume");
let labelPlayback = document.getElementById("label_playback");

let volume = 1;
let playback = 1;

selectedVolume.addEventListener("change", (e) => {
    labelVolume.textContent = "Volume " + e.target.value+ "%";
    volume = e.target.value / 100;
});

selectedPlayback.addEventListener("change", (e) => {
    labelPlayback.textContent = "Playback " + e.target.value + "%";
    playback = e.target.value / 100;
});

selectedVolume.value = 100;
selectedPlayback.value = 100;

// ========================================================================== //
// Loops
// ========================================================================== //

let loop = null;
let illumination = 255;

let changeBackground  = function(){
    illumination += 2;
    if(illumination >= 255){
        clearInterval(loop);
        loop = null;
    }
    document.body.style.backgroundColor = "rgb(255 ," + illumination +", "+ illumination + ")";
}

let illuminate = function(){
    if(illumination >= 230)
        illumination = 200;
    else
        illumination -= 20;
    
    illumination = Math.max(illumination, 0);
    if(loop == null){
        loop = setInterval(changeBackground, 20);
    }
}

// ========================================================================== //
// Keypresses
// ========================================================================== //

document.addEventListener("keydown", (e) => {
    if(audio[e.code] != null && audio[e.code].pressed == false){
        audio[e.code].sound.load();
        audio[e.code].sound.volume = volume;
        audio[e.code].sound.playbackRate = playback;
        audio[e.code].sound.play();
        audio[e.code].pressed = true;
        audio[e.code].h1.style.color = "white";
        audio[e.code].h2.style.color = "white";
        illuminate();
        anime({
            targets: [audio[e.code].h1, audio[e.code].h2],
            translateY: -15,
            duration: 250
        });
    }  
});


document.addEventListener("keyup", (e) => {
    if(audio[e.code] != null){
        audio[e.code].pressed = false;
        audio[e.code].h1.style.color = "black";
        audio[e.code].h2.style.color = "black";
        anime({
            targets: [audio[e.code].h1, audio[e.code].h2],
            translateY: 0,
            duration: 250
        });
    }   
});

// ========================================================================== //
// Animations on page load
// ========================================================================== //

let settings = document.getElementById("settings");

// Instantly hide the elements on load
anime({
    targets: '#buttons div',
    translateY: -500,
    duration: 0
});
anime({
    targets: settings,
    translateX: 0 - settings.clientWidth,
    duration: 0
});
console.log(settings.style.width);

// Put the elements
anime({
    targets: '#buttons div',
    translateY: 0,
    delay: anime.stagger(100)
});
anime({
    targets: settings,
    translateX: 0,
    duration: 1000,
    easing: 'cubicBezier(.5, .05, .1, .3)'
});


