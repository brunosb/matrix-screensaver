let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let streams = [];
const fadeInterval = 1.6;
const symbolSize = 14;
const FPS = 30;
let frameCount = 0;

function App() {

  start();
  
  function start() {
    setup();
    setInterval(() => {
      draw();
      frameCount++;
    }, 1/FPS * 1000)
  }

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function Symbol(x, y, speed, opacity) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.opacity = opacity;
  
    this.value;
  
    this.switchInterval = Math.round(random(2, 25));
  
    this.setToRandomSymbol = function() {
      const charType = Math.round(random(0, 5));
      if(frameCount % this.switchInterval === 0) {
        if(charType > 1) {
          this.value = String.fromCharCode(0x30a0 + Math.floor(random(0, 96)));
        } else {
          this.value = Math.floor(random(0, 10));
        }
      }
    }
  
    this.rain = function() {
      this.y = this.y >= canvas.height ? 0 : (this.y += this.speed);
    }
  }
  
  function Stream() {
    this.symbols = [];
    this.totalSymbols = Math.round(random(5, 35));
    this.speed = random(5, 15);
  
    this.generateSymbols = function(x, y) {
      let opacity = 255;
      for(let i = 0; i < this.totalSymbols; i++) {
        let symbol = new Symbol(x, y, this.speed, opacity);
        symbol.setToRandomSymbol();
        this.symbols.push(symbol);
        opacity -= (255 / this.totalSymbols) / fadeInterval;
        y -= symbolSize;
      }
    }
  
    this.render = function() {
      this.symbols.forEach(symbol => {
        ctx.fillStyle = `rgba(0, 255, 70, ${symbol.opacity})`;
        ctx.fillText(symbol.value, symbol.x, symbol.y);
        symbol.rain();
        symbol.setToRandomSymbol();
      });
    }
  }
  
  function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    let x = 0;
    let streamNum = canvas.width / symbolSize;
  
    for(let i = 0; i < streamNum; i++) {
      let stream = new Stream();
      stream.generateSymbols(x, random(-2000, 0));
      streams.push(stream);
      x += symbolSize;
    }
  
    ctx.font = `${symbolSize}px Consolas`;
  }
  
  function draw() {
    ctx.fillStyle = `rgba(0, 0, 0, 0.6)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    streams.forEach(stream => {
      stream.render();
    });
  }
}

export { App };