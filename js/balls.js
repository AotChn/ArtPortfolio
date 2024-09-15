import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
//FOV > ASPECT RATIO > VIEW FRUSTRUM
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

//uses canvas called "bg"
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#balls'),
});

// const offsetX = 30;
// const offsetY = 0;
// const offsetZ = 0;

renderer.setClearColor(0xffffff);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

// Append renderer's canvas to the container
const container = document.querySelector('.t2');
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


// const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
// const material = new THREE.MeshStandardMaterial({ color: 0xffffff});

// const torus = new THREE.Mesh(geometry, material);
// torus.castShadow = true;
// torus.receiveShadow = true;
// torus.position.set(0 + offsetX, 0 + offsetY, 0 + offsetZ)

//adding torus shape to scene
// scene.add(torus)

// const pointLight = new THREE.PointLight(0xA020F0, .05, 30, 1.5)
const ambientLight = new THREE.AmbientLight(0xFF0000, 200)
// pointLight.position.set(10,10,20)

//adding lights to scene
// scene.add(pointLight)
scene.add(ambientLight)

// const spotLight = new THREE.SpotLight(0xFF0000, 700)
// const lightHelper = new THREE.PointLightHelper(spotLight)
// const spotHelper = new THREE.SpotLightHelper(spotLight)
// spotLight.position.set(-10 + offsetX,10 + offsetY,20)
// spotLight.penumbra = 0.1;
// spotLight.angle = Math.PI / 8;
// spotLight.castShadow = true;
// spotLight.target = torus;

// // scene.add(lightHelper)
// // scene.add(spotHelper)
// scene.add(spotLight);

// const spotLight2 = new THREE.SpotLight(0x0000FF, 800)
// const lightHelper2 = new THREE.PointLightHelper(spotLight2)
// const spotHelper2 = new THREE.SpotLightHelper(spotLight2)
// spotLight2.position.set(5 + offsetX, 5 + offsetY, 30)
// spotLight2.penumbra = 0.3;
// spotLight2.angle = Math.PI / 3;
// spotLight2.castShadow = true;
// spotLight2.target = torus;

// // scene.add(lightHelper2)
// // scene.add(spotHelper2)
// scene.add(spotLight2);



const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)



// const controls = new OrbitControls( camera, renderer.domElement);

function addCyl(x, y, z) {
  const geometry = new THREE.CylinderGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({color : 0x0000FF})
  const cyl = new THREE.Mesh(geometry, material);

  cyl.position.set(x, y, z);
  scene.add(cyl)
}

// for (let i=0; i<5; i++) {
//     for (let j=0; j<4; j++) {
//         addCyl(i * 5, j * 5, 30);
//     }
// }


// Define the cylinder geometry
const radiusTop = 1;
const radiusBottom = 1;
const height = 3;
const radialSegments = 32;

// Define the number of rows and columns
const rows = 4;
const cols = 5;
const spacing = 4; // Spacing between cylinders

// Calculate the middle column's offset to center it
const offsetX = (cols - 1) * spacing / 2;

// Create cylinders
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
        const cylinder = new THREE.Mesh(geometry, material);

        // Position the cylinder
        cylinder.position.x = (col - Math.floor(cols / 2)) * spacing + offsetX;
        cylinder.position.y = row * spacing - ((rows - 1) * spacing) / 2;
        cylinder.position.z = 0;

        // Add the cylinder to the scene
        scene.add(cylinder);
    }
}

camera.position.z = 15;
// Render loop

function animate() {
    requestAnimationFrame(animate);

    // // Move each cylinder up
    // cylinders.forEach(cylinder => {
    //     cylinder.position.y += speed;

    //     // Wrap cylinders around when they move out of view
    //     if (cylinder.position.y > rows * spacing) {
    //         cylinder.position.y -= rows * spacing * 2; // Move it to the bottom
    //     }
    // });

    renderer.render(scene, camera);
}

animate();
