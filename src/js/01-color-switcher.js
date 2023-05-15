const ell = {
    body: document.querySelector('body'),
    startBtn: document.querySelector("[data-start]"),
    stopBtn: document.querySelector("[data-stop]"),
}

let idInterval = undefined;

ell.stopBtn.setAttribute('disabled', '');
ell.startBtn.addEventListener('click', changeBodyColor);
ell.stopBtn.addEventListener('click', stopChangeColor);

function changeBodyColor() {
    ell.body.style.backgroundColor = getRandomHexColor();
    ell.startBtn.setAttribute('disabled', '');
    ell.stopBtn.removeAttribute('disabled');

    idInterval = setInterval(() => {
        ell.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function stopChangeColor() {
    ell.startBtn.removeAttribute('disabled');
    ell.stopBtn.setAttribute('disabled', '');
    clearInterval(idInterval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};