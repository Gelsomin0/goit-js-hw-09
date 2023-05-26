import Notiflix from 'notiflix';

const ell = {
    form: document.querySelector(".form"),
    amount: document.querySelector("[name='amount']"),
    delay: document.querySelector("[name='delay']"),
    step: document.querySelector("[name='step']"),
}

let stepCount = 1;
let currentCount = 0;
let delayCount = 0;

ell.form.addEventListener('submit', submitFormFunction);

function submitFormFunction(e) {
    e.preventDefault();
    const stepNumber = Number(ell.step.value);
    const firstDelay = Number(ell.delay.value);
    currentCount = Number(ell.amount.value);
   
    let timerId = setTimeout(function tick() {
        if (stepCount >= currentCount + 1) {
            stepCount = 1;
            currentCount = 0;
            delayCount = 0;
            clearTimeout(timerId);
            return;
        }

        if (delayCount === 0) {
            delayCount += firstDelay;    
        } else {
            delayCount += stepNumber;
        }
        
        
        createPromise(stepCount, delayCount)
            .then(({position, delay}) => {
                console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
                Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
            }).catch(({position, delay}) => {
                console.log(`❌ Rejected promise ${position} in ${delay} ms`);
                Notiflix.Notify.failure(`Rejected promise ${position} in ${delay} ms`);
            });

        timerId = setTimeout(tick, stepNumber);
        stepCount += 1;
    }, firstDelay);
};

function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
            resolve({position, delay});
        } else {
            reject({position, delay});
        } 
    });

    return promise;
}