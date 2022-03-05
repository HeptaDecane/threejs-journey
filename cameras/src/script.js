import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


const canvas = document.getElementById('webgl')

// Scene
const sizes = {
    width: 800,
    height: 600
}
const scene = new THREE.Scene()


const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove',event => {
    cursor.x = event.clientX/sizes.width - 0.5
    cursor.y = -(event.clientY/sizes.height - 0.5)
    console.log(cursor)
})

// Object
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube)

// Camera
const aspectRatio = sizes.width/sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio)
// const camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, 1, -1)

camera.position.z = 3
camera.lookAt(cube.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate

/*
const loop = ()=>{
    // Update objects
    camera.position.x = Math.sin(cursor.x*2*Math.PI) * 3
    camera.position.z = Math.cos(cursor.x*2*Math.PI) * 3
    camera.position.y = cursor.y * 5
    camera.lookAt(cube.position)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(loop)
}
*/


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const loop = ()=>{
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

loop()