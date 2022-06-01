const Timer = (initSeconds, timeoutcallback) => {
  let seconds = initSeconds;
  let isStart = false;
  let interval = null;

  const startTimer = () => {
    if (isStart) {
      return;
    }

    isStart = true;
    interval = setInterval(() => {
      console.log(seconds);
      seconds--;
      if (seconds === 0) {
        stopTimer();
        timeoutcallback();
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (isStart) {
      isStart = false;
      clearInterval(interval);
    }
  };

  const initTimer = () => {
    if (isStart) {
      stopTimer();
    }
    seconds = initSeconds;
  };

  return {
    startTimer,
    stopTimer,
    initTimer,
  };
};

const ttt = Timer(20, () => {
  console.log('timeout');
});

ttt.startTimer();

setInterval(function () {
  console.log(ttt.getSecond());
}, 1000);

setTimeout(function () {
  ttt.stopTimer();
}, 4000);
