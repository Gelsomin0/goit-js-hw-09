import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const ell = {
    timerInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    timerDays: document.querySelector('[data-days]'),
    timerHours: document.querySelector('[data-hours]'),
    timerMinutes: document.querySelector('[data-minutes]'),
    timerSeconds: document.querySelector('[data-seconds]'),
}

let targetDate = null;
let currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      targetDate = new Date(selectedDates[0].getFullYear(), selectedDates[0].getMonth(), selectedDates[0].getDate(), selectedDates[0].getHours(), selectedDates[0].getMinutes(), selectedDates[0].getSeconds());
      
      if (currentDate >= targetDate) {
          Notiflix.Notify.failure('Please choose a date in the future');
          ell.startBtn.setAttribute('disabled', '');
          targetDate = null;
      } else {
          Notiflix.Notify.success('Well done');
          ell.startBtn.removeAttribute('disabled');
      }
  },
};

ell.startBtn.setAttribute('disabled', '');
ell.startBtn.addEventListener('click', startTimerCount);

flatpickr(ell.timerInput, options);

function startTimerCount() {
    ell.startBtn.setAttribute('disabled', '');
    const oldTargetTime = targetDate;

    const id = setInterval(() => {
        if (targetDate !== oldTargetTime) {
            return;
        }
        const currentTimerDate = new Date();
        const timerValues = convertMs(targetDate - currentTimerDate);
        const { days, hours, minutes, seconds } = timerValues;
        
        ell.timerDays.textContent = addLeadingZero(days);
        ell.timerHours.textContent = addLeadingZero(hours);
        ell.timerMinutes.textContent = addLeadingZero(minutes);
        ell.timerSeconds.textContent = addLeadingZero(seconds);

        if (ell.timerDays.textContent === '00'
            && ell.timerHours.textContent === '00'
            && ell.timerMinutes.textContent === '00'
            && ell.timerSeconds.textContent === '00') {
            ell.timerSeconds.textContent === '00';
            Notiflix.Notify.info('Your time is off!!!');
            clearInterval(id);
        }
    }, 1000);

    return;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}