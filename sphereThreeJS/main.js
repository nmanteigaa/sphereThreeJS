import * as THREE from 'three'; //import everything from three 
import './style.css'

//scene
const scene = new THREE.Scene()

//geometry
const geometry = new THREE.SphereGeometry(3,64,64); //radius(3),segments(64,64) -> very smooth
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff83,
})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//sizes
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

//lights
const light = new THREE.PointLight(0xffffff, 70, 100, 1.7);
light.position.set(0,10,10)
scene.add(light)

//camera
const camera = new THREE.PerspectiveCamera(45,size.width/size.height,0.1,100); //there's orthographic and more
camera.position.z = 20             //moves the camera in the z axis 20 units
scene.add(camera)

//render scene on the screen -> canvas
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer ({ canvas })

//define how big the canvas is and where to render
renderer.setSize(size.width,size.height)
renderer.render(scene,camera)

//resize
window.addEventListener('resize',() => {
  //update sizes
  siz
})



//vid: https://www.youtube.com/watch?v=_OwJV2xL8M8