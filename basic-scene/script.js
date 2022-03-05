// scene
const scene = new THREE.Scene()

// object
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// camera
const size = {
	width: 800,
	height: 600
}
const camera = new THREE.PerspectiveCamera(75, size.width/size.height)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 4
scene.add(camera)

// renderer
const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('webgl')
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)