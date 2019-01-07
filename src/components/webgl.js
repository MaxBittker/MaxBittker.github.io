import React from "react";
import createReactClass from "create-react-class";

import fShaderSource from "./fragmentShader.js";
import { throttle } from "lodash";

const vsSource = `
attribute vec3 aPosition;
varying vec2 uvN;
void main()
{
  gl_Position = vec4(aPosition, 1.0);
  uvN = aPosition.xy;
}`;
//
// if(typeof window == 'undefined'){//SSR hack
//   debugger;
//   var window = {innerWidth:100,innerHeight:100};
// }

export default createReactClass({
  getInitialState() {
    try {
      return {
        width: Math.min(window.innerHeight, window.innerWidth),
        height: window.innerHeight - 50,
        ready: true
      };
    } catch (e) {
      return {
        width: 100,
        height: 100,
        ready: false
      };
    }
  },

  componentDidMount() {
    let init = () => {
      let canvas = this.canvas;
      let gl = (this.gl = canvas.getContext("webgl"));

      const state = (this.state_ = {
        animationFrameRequest: null,
        bit: 0,
        fb: [null, null],
        time0: new Date() / 1000,
        textures: [],
        videoTexture: null,
        mouse: { x: 0, y: 0 }
      });

      let setMouse = event => {
        var r = event.target.getBoundingClientRect();
        this.state_.mouse.x = (event.clientX - r.left) / (r.right - r.left);
        this.state_.mouse.y = (event.clientY - r.bottom) / (r.top - r.bottom);
      };
      canvas.onmousemove = throttle(setMouse, 200);
      /* canvas.onmousedown = (event) => setMouse(event, 1); */
      /* canvas.onmouseup = (event) => setMouse(event, 0); */
      this.loadProgram();
    };

    if (this.state.ready) {
      init();
    } else {
      this.setState(
        {
          width: Math.min(window.innerHeight, window.innerWidth),
          height: window.innerHeight,
          ready: true
        },
        init
      );
    }
  },
  loadProgram() {
    let gl = this.gl;
    let state = this.state_;
    let WIDTH = this.state.width / 2;
    let HEIGHT = this.state.height / 2;

    // compileShader :: (gl, source, shaderType) -> Shader
    // throws Error on compilation error

    function compileShader(gl, source, shaderType) {
      let shader = gl.createShader(shaderType);

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (!success) {
        console.log(source);
        throw Error("could not compile shader:" + gl.getShaderInfoLog(shader));
      }

      return shader;
    }

    let vs = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    let fs = compileShader(gl, fShaderSource, gl.FRAGMENT_SHADER);

    let program = gl.createProgram();

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);

    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!success) {
      throw Error("program failed to link:" + gl.getProgramInfoLog(program));
    }
    gl.useProgram(program);

    // Create a square as a strip of two triangles.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0]),
      gl.STATIC_DRAW
    );

    // Assign attribute aPosition to each of the square's vertices.
    gl.aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);

    // backBuffer stuff
    let createTarget = () => {
      let target = {
        texture: gl.createTexture(),
        framebuffer: gl.createFramebuffer()
      };
      // set up framebuffer
      gl.bindTexture(gl.TEXTURE_2D, target.texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        WIDTH,
        HEIGHT,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      );

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        target.texture,
        0
      );

      // clean up
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      return target;
    };

    state.fb[0] = createTarget();
    state.fb[1] = createTarget();

    //fixme: clean up
    function createTexture(image) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      state.textures.push(texture);
    }

    let img = new Image();
    img.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABpAgMAAADZ4ewhAAAADFBMVEVlLWcjHyD///9aukdNbQb8AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfgBBsTBjDG601/AAAAbUlEQVRIx2MIxQYYBoVo2Cp0MHXQiC5FcWvUIBJd//9q6P+/ofFAapCJDt4wWxpa/x/s3v//B53o4A2zwSo6WEuNQVvSQgEad1CIMmK41mFwiILprFXgRAilYOE78KKgnLBqJYwKHUSigzMHAADhlJM2vqJTOQAAAABJRU5ErkJggg==";
    createTexture(img);

    let black = new Image();
    black.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";

    state.videoTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, state.videoTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, black);

    // remember the address within the fragment shader of each of my uniforms variables

    gl.time = gl.getUniformLocation(program, "time");
    gl.mouse = gl.getUniformLocation(program, "mouse");
    gl.resolution = gl.getUniformLocation(program, "resolution");
    gl.backBuffer = gl.getUniformLocation(program, "backBuffer");

    gl.channel1 = gl.getUniformLocation(program, "channel1");
    gl.channel2 = gl.getUniformLocation(program, "channel2");

    this.draw();

    if (state.animationFrameRequest === null) {
      //INVARIANT: afr is non-null if we are animating.
      state.animationFrameRequest = requestAnimationFrame(this.animate);
    }
  },

  draw() {
    let gl = this.gl;
    let state = this.state_;

    let WIDTH = this.state.width / 2;
    let HEIGHT = this.state.height / 2;

    gl.uniform1f(gl.time, new Date().getTime() / 1000 - state.time0);

    gl.uniform2f(gl.mouse, state.mouse.x, state.mouse.y);
    gl.uniform2f(gl.resolution, WIDTH, HEIGHT);
    gl.uniform1i(gl.channel1, 1);
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, state.textures[0]);

    gl.uniform1i(gl.channel2, 2);
    gl.activeTexture(gl.TEXTURE0 + 2);
    gl.bindTexture(gl.TEXTURE_2D, state.videoTexture);

    gl.uniform1i(gl.backBuffer, 0); // Do I need to check for null?
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, state.fb[state.bit].texture);
    state.bit = (state.bit + 1) % 2;
    gl.bindFramebuffer(gl.FRAMEBUFFER, state.fb[state.bit].framebuffer);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, state.fb[state.bit].texture);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  },
  animate() {
    this.draw();
    this.state_.animationFrameRequest = requestAnimationFrame(this.animate);
  },
  componentDidUpdate() {
    if (this.state.ready) {
      cancelAnimationFrame(this.state_.animationFrameRequest);
      this.state_.animationFrameRequest = null;
      this.loadProgram();
    }
  },
  componentWillUnmount() {
    cancelAnimationFrame(this.state_.animationFrameRequest);
  },
  render() {
    return (
      <canvas
        ref={ref => (this.canvas = ref)}
        className={"program"}
        style={{
          position: "absolute",
          left: "50%",
          marginLeft: -(this.state.width / 2) + "px",
          top: 50,
          bottom: 0,
          height: this.state.height + "px",
          width: this.state.width + "px",
          // maxWidth:'100%',
          // maxHeight: "60vh",
          // maxHeight: 'calc(100vh - 185px)',
          zIndex: -1
        }}
        width={this.state.width / 2}
        height={this.state.height / 2}
      />
    );
  }
});
