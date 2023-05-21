<template>
  <div id="bjsWrap">
    <canvas id="bjsCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, onUnmounted} from "vue";
import {Engine, MeshBuilder, PBRMaterial, Scene} from "@babylonjs/core";
import {LottieTexture} from "babylonjs-lottie";
import "@babylonjs/inspector"

async function createScene(scene: Scene) {
  scene.debugLayer.show({embedMode: true})
  scene.createDefaultEnvironment({createSkybox: false, createGround: false})
  let box = MeshBuilder.CreateBox("box")
  let mat = new PBRMaterial("pbr", scene)
  let lottieTexture = await LottieTexture.ParseFromUrlAsync("lottie", "/Aniki Hamster.json", scene, {
    autoPlay: true,
    useAnimeSize: false
  })
  mat.albedoTexture = lottieTexture
  box.material = mat
  mat.unlit = true

  scene.createDefaultCameraOrLight(true, true, true)
}

onMounted(() => {
  let engine = new Engine(document.querySelector("#bjsCanvas") as HTMLCanvasElement)
  let scene = new Scene(engine)
    scene.createDefaultCamera()

    createScene(scene)

    engine.runRenderLoop(() => {
        scene.render()
    })

    let resize = () => engine.resize()
    window.addEventListener("resize", resize)
    onUnmounted(() => {
        scene.dispose()
        engine.dispose()
        window.removeEventListener("resize", resize)
    })
})

</script>

<style scoped>
#bjsCanvas {
  width: 100%;
  height: 100%;
  display: block;
}

#bjsWrap {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}
</style>
