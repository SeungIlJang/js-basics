const body = document.querySelector("body");

const IMG_NUMBER=5;

const image = new Image();
function paintImage(imgNumber) {
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function rePaintImage(imgNumber) {
    image.src = `images/${imgNumber+1}.jpg`;
}
function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function run() {
    const randomNumber = genRandom();
    rePaintImage(randomNumber);
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
    setInterval(run,1000*30);

}

init();
