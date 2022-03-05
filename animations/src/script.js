import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.getElementById('webgl')

// Scene
const size = {
    width: 800,
    height: 600
}
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(75, size.width/size.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)

// Animation
const clock = new THREE.Clock()

const loop = ()=>{
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    cube.rotation.x = elapsedTime
    cube.rotation.y = elapsedTime
    cube.position.x = Math.cos(elapsedTime)
    cube.position.y = Math.sin(elapsedTime)

    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

// using gsap
// console.log(gsap)
// gsap.to(cube.position, {duration:1, delay:1, x:2})
// const loop = () => {
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(loop)
// }

loop()

