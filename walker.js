  var husl = HUSL;
  var Ocean = (function() {
      var canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d');
      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', resizeCanvas, false);

      function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      }
      resizeCanvas();
      var interval = 1000 / (25 /* fps */ );
      var frame = 1;
      var n = 5;

      function walker(x, y) {
          // console.log(x);
          this.x = Math.floor(x);
          this.y = Math.floor(y);
          this.hue = Math.floor(Math.random() * 360);
          this.color = husl.p.toRGB(this.hue, 150, 50);
      }
      walker.prototype = {
          tick: function() {
              // console.log(this.x, this.y);
              this.x += Math.floor((Math.random() * 3) - 1);
              this.y += Math.floor((Math.random() * 3) - 1);
              if (this.x < 0) this.x += canvas.width;
              if (this.y < 0) this.y += canvas.height;
              this.hue =  (this.hue%360) + Math.floor(Math.random() * 3 - 1);
              this.color = husl.p.toRGB(this.hue, 150, 50);
          }
      };

      function Ocean(equation, canvas) {
          this.canvas = canvas;
          // this.scale = 5 //canvas.getAttribute('width') / width;
          this.walkers = this.init();
          this.context = canvas.getContext('2d');
          this.imageData = this.context.createImageData(canvas.width, canvas.height);
          this.then = +Date.now();
          this.paused = false;
          this.drawFrame();
      }
      Ocean.prototype = {
          play: function() {
              this.paused = false;
              this.step();
          },
          pause: function() {
              this.paused = true;
          },
          step: function() {
              // Rerun the step() function every animation frame
              if (this.paused) return;
              requestAnimFrame(this.step.bind(this));
              var now = +Date.now();
              var delta = now - this.then;
              if (delta > interval) {
                  this.then = now;
                  this.drawFrame();
                  frame++;
              }
          },
          init: function() {
              list = [];
              for (var i = 1; i < (n + 1); i++) list.push(new walker(canvas.width * (i / (n + 1)), canvas.height * Math.random()));
              return list;
          },
          writePixel: function(i, color) {
              this.imageData.data[i] = Math.floor(color[0] * 255);
              this.imageData.data[i + 1] = Math.floor(color[1] * 255);
              this.imageData.data[i + 2] = Math.floor(color[2] * 255);
              this.imageData.data[i + 3] = 255;
          },
          drawWalker: function(walker) {
              // this.writePixel(4 * (walker.x % canvas.width + (walker.y % canvas.height * canvas.width)), walker.color);
              this.writePixel(4 * (walker.x % canvas.width + ((walker.y + 1) % canvas.height * canvas.width)), walker.color);
              this.writePixel(4 * ((walker.x + 2) % canvas.width + ((walker.y + 1) % canvas.height * canvas.width)), walker.color);
              this.writePixel(4 * ((walker.x + 1) % canvas.width + (walker.y % canvas.height * canvas.width)), walker.color);
              this.writePixel(4 * ((walker.x + 1) % canvas.width + ((walker.y + 2) % canvas.height * canvas.width)), walker.color);
            this.writePixel(4 * ((walker.x + 1) % canvas.width + ((walker.y + 1) % canvas.height * canvas.width)), walker.color);
                
          },
          drawFrame: function() {
              this.imageData = this.context.getImageData(0, 0, canvas.width, canvas.height);
              for (var w = 0; w < this.walkers.length; w++) {
                  for (var i = 0; i < 300; i++) {
                      this.walkers[w].tick();
                      this.drawWalker(this.walkers[w]);
                  }
              }
              this.context.putImageData(this.imageData, 0, 0);
          }
      };
      var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
              window.setTimeout(callback, 0);
          };
      return Ocean;
  })();