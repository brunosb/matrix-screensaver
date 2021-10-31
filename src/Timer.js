class Timer {
  constructor(fn, timer) {
    this.fn = fn;
    this.timer = timer;
    this.timerObj = null;
    this.process = false;
  }

  stop = () => {
    if(this.timerObj) {
      clearInterval(this.timerObj);
      this.timerObj = null;
    }

    return this;
  }

  start = () => {
    if(!this.timerObj) {
      this.timerObj = setInterval(this.fn, this.timer);
    }

    return this;
  }

  reset = () => {
    return this.stop().start();
  }

  isProcess = () => {
    return this.process;
  }
};

module.exports = Timer;