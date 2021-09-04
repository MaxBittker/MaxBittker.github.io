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

  // ctx.translate(8, 8);
  // // ctx.rotate(Math.random() * 100);
  // ctx.translate(-8, -8);

  // let lgrd = ctx.createLinearGradient(0 - 8, 0 - 8, 0 + 8, 0 + 8);
  // let rgrd = ctx.createRadialGradient(0, 0, 16, 0, 0, 8);

  // lgrd.addColorStop(0, "black");
  // lgrd.addColorStop(1, "white");
  // let color = Math.random() * 360;

  // rgrd.addColorStop(0, `hsla(${color}, 50%, 50%, 0.3)`);
  // rgrd.addColorStop(
  //   1,
  //   `hsla(${(color + 20 + Math.random() * 100) % 360}, 50%, 50%, 0.4)`
  // );

  // ctx.fillStyle = lgrd;
  // ctx.beginPath();
  // ctx.arc(8, 8, 7.5, 0, Math.PI * 2);
  // ctx.fill();
  // ctx.fillStyle = rgrd;

  // ctx.beginPath();
  // ctx.arc(8, 8, 7.5, 0, Math.PI * 2);
  // ctx.fill();
  // ctx.strokeStyle = rgrd;
  // ctx.lineWidth = 1.5;

  // ctx.stroke();
  // ctx.strokeStyle = "white";
  // ctx.font = " 10px arvo";
  // ctx.strokeText("max", 0, 12);


  // let imageData = ctx.getImageData(0, 0, 16, 16);
// ctx.putImageData(imageData, 0, 0);
let  l= Math.random()*0.0;
l+=(window.l||0.0)/9;
l = 1.0-l;
for(var x=0;x<16;x++){
  for(var y=0;y<16;y++){

    let radius = Math.abs((x - 8) * (y-8));
    // let b = Math.random()<radius/6 ? 255:0;
    let radius2 = Math.sqrt((x - 8)**2 + (y-8)**2);


    radius = radius*l + radius2*(1-l);
    let b = Math.random()<radius/8 ? 255:0;

    

  ctx.fillStyle = "rgba("+b+","+b+","+b+","+((255-b)/255)+")";
  ctx.fillRect( x, y, 1, 1 );
  }
}

  var link = document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = canvas.toDataURL("image/x-icon");
  link.id = "moon-favicon";
  document.getElementsByTagName("head")[0].appendChild(link);
}

export default setFavicon;
