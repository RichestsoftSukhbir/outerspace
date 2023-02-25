import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

camera.position.z = 50;

const geomatry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshPhongMaterial({color: 0x049ef4, emissive: 0x000000, antialias: true, roughness: 0, metalness: 1});
const torus = new THREE.Mesh(geomatry, material);

scene.add( torus );


const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight({color: 0xFFFFFF}, 0.5);

scene.add( pointLight, ambientLight );

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);

// scene.add( lightHelper, gridHelper );

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;


function addStars() {
  const geomatry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  const stars = new THREE.Mesh(geomatry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  stars.position.set(x,y,z);
  scene.add(stars);
}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load('public/images/space.jpg')
scene.background = spaceTexture;

const sukhfxTexture = new THREE.TextureLoader().load('public/images/sukhfx.jpg');
const avatarBox = new THREE.Mesh(
  new THREE.BoxGeometry(4,4,4),
  new THREE.MeshPhongMaterial({map: sukhfxTexture, emissive: 0x000000, antialias: true, roughness: 0, metalness: 1})
);

scene.add(avatarBox);

const moonTexture = new THREE.TextureLoader().load('public/images/moon-defuse.jpg');
const moonTextureDepth = new THREE.TextureLoader().load('public/images/moon-normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: moonTextureDepth})
);
moon.position.set(10, 15, 10);
scene.add(moon);

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  avatarBox.rotation.x -= 0.01;
  avatarBox.rotation.y -= 0.01;

  moon.rotation.x -= 0.01;
  moon.rotation.y -= 0.01;
  moon.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera);
}

animate();

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});