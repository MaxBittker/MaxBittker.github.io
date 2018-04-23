/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var THREE = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"three\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var HUSL = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"husl\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var scene = void 0,
	    camera = void 0,
	    renderer = void 0;
	var geometry = void 0,
	    material = void 0,
	    mesh = void 0;
	var origin = new THREE.Vector3(0, 0, 0);
	var cursor = { x: 150, y: 150 };
	var mouseDown = 0;
	var lastRender = new Date();
	var startCount = 250;
	var toggle = true;
	document.onmousemove = function (e) {
	  cursor.x = window.innerWidth - e.clientX;
	  cursor.y = window.innerHeight - e.clientY;
	};
	document.body.onmousedown = function (e) {
	  mouseDown = 1;
	  // toggle = !toggle
	};
	document.body.onmouseup = function (e) {
	  mouseDown = 0;
	};

	var birth = function birth() {
	  var loc = origin.clone();
	  if (scene.children.length > 0) {
	    var parent = scene.children[Math.random() * (scene.children.length - 1) | 0];
	    loc.copy(parent.position);
	  }
	  var color = HUSL.toHex(Math.random() * 360 | 0, 65, 60);
	  var material = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.8 });
	  geometry = new THREE.SphereGeometry(.1, 7, 7);
	  mesh = new THREE.Mesh(geometry, material);
	  mesh.position.copy(loc);
	  mesh.velocity = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
	  scene.add(mesh);
	};

	var init = function init() {
	  scene = new THREE.Scene();

	  var canvas = document.getElementById("canvas");

	  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
	  camera.position.z = 35;

	  renderer = new THREE.WebGLRenderer();
	  renderer.setSize(window.innerWidth, window.innerHeight);
	  renderer.setClearColor(0x0a0700, 1);
	  // renderer.setClearColor(0xfaf7f0, 1)
	  canvas.appendChild(renderer.domElement);
	};

	var animate = function animate() {
	  requestAnimationFrame(animate);
	  scene.children.forEach(function (me) {
	    if (me.type !== "Mesh") return;

	    me.geometry.normalize();
	    var scale = 1.2 + .1 * Math.cos(Date.now() / 10000);
	    me.geometry.scale(scale, scale, scale);

	    var move = origin.clone();
	    scene.children.forEach(function (friend) {
	      if (friend === me || friend.type !== "Mesh") return;
	      var distance = friend.position.clone().sub(me.position);
	      var delta = distance.length();
	      if (delta < 3) //avoid close neighbors
	        move.sub(distance.setLength(Math.pow(delta, -1) * 10));else if (delta > 150) //attract to further neighbors
	        move.add(distance.max(25));else mouseDown ? //rotate center
	      move.add(origin.clone().crossVectors(me.velocity, friend.velocity).divideScalar(10)) : move.add(me.position.clone().cross(distance));
	      // move.sub(me.position.clone().cross(distance)) :
	    });
	    me.velocity.add(move.normalize().divideScalar(20));
	    me.velocity.sub(me.position.clone().divideScalar(cursor.y * 2));
	    me.position.add(me.velocity.normalize().divideScalar(1.0 + 4 * (cursor.x / window.innerWidth)));
	  });

	  var c = Date.now();
	  var tickTime = c - lastRender;
	  if (tickTime > 35 && scene.children.length > 15) {
	    scene.children = scene.children.slice(1);
	  } else if (tickTime < 30) birth();
	  lastRender = c;
	  if (mouseDown > 0) mouseDown++;
	  renderer.render(scene, camera);
	};

	init();
	animate();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(false) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_hash__) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				require("./log-apply-result")(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ })
/******/ ]);