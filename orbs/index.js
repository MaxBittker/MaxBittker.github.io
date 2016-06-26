let THREE = require('three')
let HUSL = require('husl')
let scene, camera, renderer
let geometry, material, mesh
const origin = new THREE.Vector3(0,0,0)
let cursor = {x:150,y:150}
let mouseDown = 0;
let lastRender = new Date()
const startCount = 250
let toggle = true;
document.onmousemove = e => {
    cursor.x = window.innerWidth - e.clientX
    cursor.y = window.innerHeight - e.clientY
}
document.body.onmousedown = e => {
  mouseDown = 1;
  // toggle = !toggle
}
document.body.onmouseup = e => {
  mouseDown = 0;
}

const birth = () => {
  let loc = origin.clone()
  if(scene.children.length>0) {
    let parent =scene.children[Math.random()*(scene.children.length-1)|0]
    loc.copy(parent.position)
  }
  let color  =  HUSL.toHex(Math.random()*360|0, 65,60)
  let material = new THREE.MeshBasicMaterial( { color, transparent: true, opacity: 0.8 } )
  geometry = new THREE.SphereGeometry( .1, 7, 7 )
  mesh = new THREE.Mesh( geometry, material )
  mesh.position.copy(loc)
  mesh.velocity = new THREE.Vector3((Math.random()-0.5),(Math.random()-0.5),(Math.random()-0.5))
  scene.add( mesh )
}

const init = () => {
  scene = new THREE.Scene()


  var canvas = document.getElementById("canvas");


  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 )
  camera.position.z = 35

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setClearColor(0x0a0700, 1)
  // renderer.setClearColor(0xfaf7f0, 1)
  canvas.appendChild( renderer.domElement )
}


const animate = () => {
  requestAnimationFrame( animate )
  scene.children.forEach(me => {
    if(me.type!=="Mesh") return

    me.geometry.normalize()
    let scale =  1.2 + (.1 * Math.cos(Date.now()/10000))
    me.geometry.scale(scale,scale,scale);

    let move = origin.clone()
    scene.children.forEach(friend => {
      if(friend === me || friend.type !== "Mesh") return
      let distance = friend.position.clone().sub(me.position)
      let delta = distance.length()
      if(delta < 3) //avoid close neighbors
        move.sub(distance.setLength(Math.pow(delta, -1) * 10))
      else if(delta > 150) //attract to further neighbors
        move.add(distance.max(25))
      else
        mouseDown ? //rotate center
        move.add(origin.clone().crossVectors(me.velocity,friend.velocity).divideScalar(10)) :
        move.add(me.position.clone().cross(distance))
        // move.sub(me.position.clone().cross(distance)) :

    })
    me.velocity.add(move.normalize().divideScalar(20))
    me.velocity.sub(me.position.clone().divideScalar(cursor.y * 2))
    me.position.add(me.velocity.normalize().divideScalar( 1.0 + (4*(cursor.x / window.innerWidth))))
  })

  const c = Date.now()
  const tickTime = c - lastRender
  if( tickTime > 35 && scene.children.length > 15){
    scene.children = scene.children.slice(1)
  } else if(tickTime < 30)
    birth()
  lastRender = c
  if(mouseDown>0)
    mouseDown++
  renderer.render(scene, camera )

}

init()
animate()
