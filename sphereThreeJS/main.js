import * as THREE from 'three'; //import everything from three 
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from "gsap"

//scene
const scene = new THREE.Scene()

//geometry
const geometry = new THREE.SphereGeometry(3,64,64); //radius(3),segments(64,64) -> very smooth
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff83,
    roughness: 0.5,
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
light.intensity = 200
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
renderer.setPixelRatio(2)
renderer.render(scene,camera)

//controls (making the ball spin)
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false //can rotate, can't zoom or pan
controls.autoRotate = true 
controls.autoRotateSpeed = 5

//resize to make it adjust to the size of the screen
window.addEventListener('resize',() => { 
  //update sizes
  console.log(window.innerHeight)
  size.width = window.innerWidth
  size.height = window.innerHeight
  //update camera
  camera.aspect = size.width/size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width,size.height)  //this 2 always have to be in sync to resize any project
})

const loop = () => {  //so it doesn't resize the object weirdly
  //mesh.position.x += 0.1
  controls.update() //this makes the ball move in a slow motion when you let it go
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()

//timeline magic
const tl = gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale, {z:0,y:0,x:0},{z:1,y:1,x:1})
tl.fromTo("nav", {y:"-100%"},{y:"0%"})
tl.fromTo(".Tittle", {opacity:0},{opacity:1})


//mouse animation color (only changes color when the mouse is moving the sphere)
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown=true))
window.addEventListener("mouseUp", () => (mouseDown=false))

window.addEventListener("mousemove", (e) => {
  if(mouseDown){
    rgb = [
      Math.round((e.pageX / size.width) * 255), //gives a value while the mouse moves horizontally
      Math.round((e.pageY / size.height) * 255),
      150,
    ]
    //let's animate!
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`) //needs an object to work
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})



//vid: https://www.youtube.com/watch?v=_OwJV2xL8M8