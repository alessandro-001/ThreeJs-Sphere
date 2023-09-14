import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


//scene
const scene = new THREE.Scene();


//sphere creation
const geometry = new THREE.SphereGeometry( 3, 64, 64 );
const material = new THREE.MeshStandardMaterial( { color: '#00ff83' } ); 
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


//sizes
const sizes = {
  width: window.innerWidth, //takes the whole width of the screen
  height: window.innerHeight, //takes the whole height of the screen
}


//light
const light = new THREE.PointLight( 0xffffff, 70, 100, 1.7 );
light.position.set( 0, 10, 10 );
scene.add(light);


//camera
const camera = new THREE.PerspectiveCamera(
  45, 
  sizes.width / sizes.height, 
  0.1, 
  100
);
camera.position.z = 20; 
scene.add(camera);


//rendering
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);


//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;


//resizing
window.addEventListener('resize', () => {
  //update sizes
  sizes.width = window.innerWidth,
  sizes.height = window.innerHeight

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

const resizeLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(resizeLoop);
}
resizeLoop();

