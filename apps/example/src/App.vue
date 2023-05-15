<template>
    <canvas id="bjsCanvas" style="width: 960px; aspect-ratio: auto"></canvas>
</template>

<script lang="ts" setup>

import {onMounted, onUnmounted} from "vue";
import {Color3, Engine, MeshBuilder, PBRMaterial, Scene} from "@babylonjs/core";
import {LottieTexture} from "babylonjs-lottie";

async function createScene(scene: Scene) {

    let box = MeshBuilder.CreateBox("box")
    let mat = new PBRMaterial("pbr", scene)
    let lottie = await LottieTexture.LoadFromUrl("", "/Aniki Hamster.json", scene)
    mat.albedoColor = Color3.White()
    mat.albedoTexture = lottie
    box.material = mat
    mat.unlit = true

    scene.createDefaultCameraOrLight(true, true, true)
}

onMounted(() => {
    let engine = new Engine(document.querySelector("#bjsCanvas"))
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

