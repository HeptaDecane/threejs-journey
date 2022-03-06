import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


const canvas = document.getElementById('webgl')

// Scene
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)


// Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Resize
window.addEventListener('resize', ()=>{
    // update sizes
    size.width = window.innerWidth
    size.height = window.innerHeight

    // update camera
    camera.aspect = size.width/size.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// Fullscreen
window.addEventListener('dblclick', ()=>{
    if(!document.fullscreenElement)
        canvas.requestFullscreen().catch(e=>console.log(e))
    else
        document.exitFullscreen().catch(e=>console.log(e))
})

// Animate
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const loop = ()=>{

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(loop)
}
loop()