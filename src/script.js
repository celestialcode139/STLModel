import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

import * as dat from 'dat.gui'


// Variables
var STL_loader = new STLLoader();
// Debug
// const gui = new dat.GUI()
// var BGFolder = gui.addFolder('BG Controls');


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//STL Model
STL_loader.load('https://cdn.jsdelivr.net/gh/celestialcode139/STLModel@0.0.1/src/Model/model.stl', function (geometry) {
    const material = new THREE.MeshPhongMaterial({ color: "gray", specular: "gray", shininess: 40 });
    var mesh = new THREE.Mesh(geometry, material);
    console.log(mesh);
    scene.add(mesh);
    mesh.scale.set(0.04, 0.04, 0.04)
    mesh.position.x = -3;

    // Get the bounding box
    const boundingBox = new THREE.Box3().setFromObject(mesh);
    // Get dimensions
    const dimensions = boundingBox.getSize(new THREE.Vector3());
    console.log('Model Dimensions:', dimensions.x, dimensions.y, dimensions.z);
});


// Objects
const geometry = new THREE.BoxGeometry(.1, .1, .1);

// Materials

const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color(0xff0000)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
// scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
const pointLightBack = new THREE.PointLight(0xffffff, 0.1);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const pointLightHelper = new THREE.PointLightHelper(pointLightBack, 1);

pointLight.position.set(2,2,4);
pointLightBack.position.set(2,2,-4);

scene.add(pointLight, ambientLight, pointLightBack)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Base Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)

/**
 * Orbit Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()

/**
 * Axes Helper
 */
// var axesHelper = new THREE.AxesHelper(25);
// gui.add(axesHelper, 'visible').name('visible');
// scene.add(axesHelper);