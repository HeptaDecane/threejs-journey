import './style.css'
import * as THREE from 'three'

const size = {
    width: 800,
    height: 600
}
const scene = new THREE.Scene()

// axes helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const cube = new THREE.Mesh(geometry, material)

cube.position.x = 0.7
cube.position.y = 0.4
cube.position.z = -1
// cube.position.set(1,1,-1)
scene.add(cube)

console.log('cube', cube.position.length())
// cube.position.normalize()
// console.log('cube normalised', cube.position.length())

// scaling
cube.scale.set(2,0.5,0.5)

// rotation
cube.rotation.reorder('YXZ')
cube.rotation.x = Math.PI/4
cube.rotation.y = Math.PI/4

const camera = new THREE.PerspectiveCamera(75, size.width/size.height)
camera.position.set(1,1,4)
scene.add(camera)

// lookAt
camera.lookAt(cube.position)

console.log('distance', cube.position.distanceTo(camera.position))

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl')
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)