import Lottie, {AnimationItem} from "lottie-web";
import {DynamicTexture, Engine, Scene, Texture, Tools} from "@babylonjs/core"

interface LottieOption {
    loop: boolean | number;
    useAnimeSize: boolean
    width: number
    height: number
    invertY: boolean;
    generateMipMaps: boolean
    samplingMode: number
    format: number;
    autoPlay: boolean
}

const defaultOption: LottieOption = {
    loop: true,
    autoPlay: true,
    useAnimeSize: false,
    width: 512,
    height: 512,
    invertY: false,
    generateMipMaps: false,
    samplingMode: Texture.TRILINEAR_SAMPLINGMODE,
    format: Engine.TEXTUREFORMAT_RGBA
}

export class LottieTexture extends DynamicTexture {
    lottieAnimation: AnimationItem

    static async LoadFromUrlAsync(name: string, url: string, scene: Scene, inOption: Partial<LottieOption> = {}) {
        let raw = await Tools.LoadFileAsync(url, false) as string
        return this.ParseFromJson(name, raw, scene, inOption)
    }

    static async ParseFromUrlAsync(name: string, url: string, scene: Scene, inOption: Partial<LottieOption> = {}) {
        let raw = await Tools.LoadFileAsync(url, false) as string
        return this.ParseFromJson(name, raw, scene, inOption)
    }

    static ParseFromJson(name: string, json: string, scene: Scene, inOption: Partial<LottieOption> = {}) {
        let data = JSON.parse(json)
        return this.ParseFromObject(name, data, scene, inOption)
    }

    static ParseFromObject(name: string, data: any, scene: Scene, inOption: Partial<LottieOption> = {}) {
        let option: LottieOption = {...defaultOption, ...inOption}
        let container = document.createElement("div")
        container.style.position = "absolute"
        let w = 128, h = 128
        if (option.useAnimeSize) {
            w = data.w
            h = data.h
        } else {
            w = option.width
            h = option.height
        }
        container.style.width = w + "px"
        container.style.height = h + "px"
        document.body.append(container)
        let lottieAnimation = Lottie.loadAnimation({
            container,
            renderer: "canvas",
            autoplay: option.autoPlay,
            loop: option.loop,
            animationData: data,
        })
        container.style.display = "none"
        let canvas = lottieAnimation.renderer.canvasContext.canvas
        let texture = new LottieTexture(name, canvas, scene,
            option.generateMipMaps,
            option.samplingMode,
            option.format,
            option.invertY)
        texture.setupLottieAnima(lottieAnimation)
        return texture
    }

    dispose() {
        super.dispose();
        //@ts-ignore
        (this.lottieAnimation.container as HTMLElement).parentElement.remove()
        this.lottieAnimation.destroy()
        this.lottieAnimation = null
    }

    private setupLottieAnima(lottieAnim: AnimationItem) {
        this.lottieAnimation = lottieAnim
        this.lottieAnimation.addEventListener("enterFrame", args => {
            this.update()
        })
        this.update()
    }

}

