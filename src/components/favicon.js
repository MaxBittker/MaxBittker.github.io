import React, { PropTypes } from "react";

function setFavicon() {
  if (typeof window == "undefined") {
    return;
  }
  let current = document.getElementById("moon-favicon");
  if (current) {
    current.remove();
  }
  var canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  var ctx = canvas.getContext("2d");

  let lgrd = ctx.createLinearGradient(0 - 8, 0 - 8, 0 + 8, 0 + 8);
  let rgrd = ctx.createRadialGradient(0, 0, 16, 0, 0, 8);

  lgrd.addColorStop(0, "black");
  lgrd.addColorStop(1, "white");
  let color = Math.random() * 360;

  rgrd.addColorStop(0, `hsla(${color}, 60%, 50%, 0.3)`);
  rgrd.addColorStop(1, `hsla(${(color + 20+ (Math.random()*100)) % 360}, 60%, 50%, 0.4)`);

  ctx.fillStyle = lgrd;
  ctx.beginPath();
  ctx.arc(8, 8, 8, 0, 180);
  ctx.fill();
  ctx.fillStyle = rgrd;
  ctx.beginPath();
  ctx.arc(8, 8, 8, 0, 180);
  ctx.fill();

  var link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = canvas.toDataURL("image/x-icon");
  link.id = "moon-favicon";
  document.getElementsByTagName("head")[0].appendChild(link);
}

export default setFavicon;
