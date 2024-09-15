import '../style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

//FOV > ASPECT RATIO > VIEW FRUSTRUM
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

//uses canvas called "bg"
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

const offsetX = 30;
const offsetY = 0;
const offsetZ = 10;

renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

// Append renderer's canvas to the container
const container = document.querySelector('.t1');
container.appendChild(renderer.domElement);

// Set the initial size of the renderer to match the container
function resizeRendererToDisplaySize() {
  const width = container.clientWidth;
  const height = container.clientHeight;
  renderer.setSize(width/2, height/2, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// Initial resize
resizeRendererToDisplaySize();


const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xffffff});

const torus = new THREE.Mesh(geometry, material);
torus.castShadow = true;
torus.receiveShadow = true;
torus.position.set(0 + offsetX, 0 + offsetY, 0 + offsetZ)

//adding torus shape to scene
scene.add(torus)

// const pointLight = new THREE.PointLight(0xA020F0, .05, 30, 1.5)
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2)
// pointLight.position.set(10,10,20)

//adding lights to scene
// scene.add(pointLight)
scene.add(ambientLight)

const spotLight = new THREE.SpotLight(0xFF0000, 700)
const lightHelper = new THREE.PointLightHelper(spotLight)
const spotHelper = new THREE.SpotLightHelper(spotLight)
spotLight.position.set(-10 + offsetX,10 + offsetY,20)
spotLight.penumbra = 0.1;
spotLight.angle = Math.PI / 8;
spotLight.castShadow = true;
spotLight.target = torus;

// scene.add(lightHelper)
// scene.add(spotHelper)
scene.add(spotLight);

const spotLight2 = new THREE.SpotLight(0x0000FF, 800)
const lightHelper2 = new THREE.PointLightHelper(spotLight2)
const spotHelper2 = new THREE.SpotLightHelper(spotLight2)
spotLight2.position.set(5 + offsetX, 5 + offsetY, 30)
spotLight2.penumbra = 0.3;
spotLight2.angle = Math.PI / 3;
spotLight2.castShadow = true;
spotLight2.target = torus;

// scene.add(lightHelper2)
// scene.add(spotHelper2)
scene.add(spotLight2);



const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)



// const controls = new OrbitControls( camera, renderer.domElement);

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({color : 0xffffff})
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100));
//   star.position.set(x, y, z);
//   scene.add(star)
// }

// Array(200).fill().forEach(addStar)

// for use on scroll
function moveCamera() {
  //where the user is currently scrolled to 
  //how far we are from the top of the website
  const t = document.body.getBoundingClientRect().top
  const s = document.body.getBoundingClientRect().bottom

  // torus.rotation.x += 0.005;
  // torus.rotation.y += 0.0075;
  // torus.rotation.z += 0.05;

  // camera.position.x = t * -0.0002;
  // camera.position.y = t * -0.0002;
  // camera.position.z = t * -0.0001;

  torus.position.y = t * -0.01;
  // torus.position.y -= s * 0.001;

}

document.body.onscroll = moveCamera

// function moveCameraMouse() {

// }

const element = document.querySelector('body');

let prevX = 0;
let prevY = 0;
let firstMove = true;

// Mouse movement event
element.addEventListener('mousemove', (event) => {
  const curX = event.clientX;
  const curY = event.clientY;
  const a = .005;
  const m = .005;
  const deltaX = curX - prevX;
  const deltaY = curY - prevY;
  
  if(!firstMove) {
    if (deltaX != 0) {
      torus.position.x += deltaX * a;
      torus.rotation.y += deltaX * 1/2 * a;
      torus.position.z += deltaX * a;
    }
    if (deltaY != 0) {
      torus.position.y += deltaY * a;
      torus.rotation.x += deltaY * 1/2 * a;
      torus.position.z -= deltaY * a;
    }
    
  }

  prevX = curX;
  prevY = curY;
  firstMove = false;
});

renderer.render(scene, camera);
 

function animate(){
  requestAnimationFrame(animate);

  const p = .1;
  torus.rotation.x += 0.01 * p;
  torus.rotation.y += 0.005 * p;
  torus.rotation.z += 0.01 * p;

  renderer.render(scene, camera);
}

animate()