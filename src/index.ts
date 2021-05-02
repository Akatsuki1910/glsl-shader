import * as THREE from 'three'
import * as PIXI from 'pixi.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import vertexSource from './shader/shader.vert'
import fragmentSource from './shader/shader.frag'
const width = 400
const height = 400
//////////////////////////////////////////////////////////////////////////////////
const camera = new THREE.Camera()
camera.position.z = 1
const scene = new THREE.Scene()

const uniforms = {
  time: { type: 'f', value: 1.0 },
  resolution: { type: 'v2', value: new THREE.Vector2() },
}

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  // wireframe: true,
  vertexShader: vertexSource,
  fragmentShader: fragmentSource,
})

const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
scene.add(mesh)

const renderer = new THREE.WebGLRenderer()
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
document.getElementById('glsl').appendChild(renderer.domElement)

uniforms.resolution.value.x = width //window.innerWidth
uniforms.resolution.value.y = height //window.innerHeight
renderer.setSize(uniforms.resolution.value.x, uniforms.resolution.value.y)
//////////////////////////////////////////////////////////////////////////////////
// const camera2 = new THREE.Camera()
const camera2 = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)

camera2.position.z = 5
const scene2 = new THREE.Scene()

const uniforms2 = {
  time: { type: 'f', value: 1.0 },
  resolution: { type: 'v2', value: new THREE.Vector2() },
}

const material2 = new THREE.ShaderMaterial({
  uniforms: uniforms2,
  // wireframe: true,
  vertexShader: vertexSource,
  fragmentShader: fragmentSource,
})

const renderer2 = new THREE.WebGLRenderer()
renderer2.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
document.getElementById('three').appendChild(renderer2.domElement)
renderer2.setSize(width, height)
renderer2.render(scene2, camera2)

const material3 = new THREE.MeshBasicMaterial({
  color: 0x2fcdb4,
})
const mesh2 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material2)
scene2.add(mesh2)

uniforms2.resolution.value.x = width //window.innerWidth
uniforms2.resolution.value.y = height //window.innerHeight

const axesHelper = new THREE.AxesHelper(10000)
scene2.add(axesHelper)
const gridHelper = new THREE.GridHelper(1000, 1000)
scene2.add(gridHelper)
const light = new THREE.PointLight(0xffffff, 2, 50, 1)
scene2.add(light)
light.position.y = 10
const lightHelper = new THREE.PointLightHelper(light)
scene.add(lightHelper)
const cont = new OrbitControls(camera2, renderer2.domElement)
//////////////////////////////////////////////////////////////////////////////////
let count = 0
function animation() {
  requestAnimationFrame(animation)
  uniforms.time.value = count / 60
  uniforms2.time.value = count / 60
  renderer.render(scene, camera)
  renderer2.render(scene2, camera2)
  cont.update()
  count++
}
animation()
