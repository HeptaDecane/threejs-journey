import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.getElementById('webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const scene = new THREE.Scene()

// Object
/*
const geometry = new THREE.Geometry()

for (let i=0; i<50; i++){
    for(let j=0; j<3; j++){
        let x = (Math.random()-0.5) * 4
        let y = (Math.random()-0.5) * 4
        let z = (Math.random()-0.5) * 4
        geometry.vertices.push(new THREE.Vector3(x,y,z))
    }
    geometry.faces.push(new THREE.Face3(i*3+0, i*3+1, i*3+2))
}

*/

const geometry = new THREE.BufferGeometry()

const count = 500
const positionsArray = new Float32Array(count*3*3)
for(let i=0; i<count*3*3; i++)
    positionsArray[i] = (Math.random()-0.5) * 4

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

window.addEventListener('resize', () =>
{
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

loop()