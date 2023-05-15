import {HtmlElementTexture, Scene, Tools} from "@babylonjs/core";
import Lottie, {AnimationItem} from "lottie-web";


interface LottieOption {
    width: number
    height: number
    useDataSize: boolean

}

const defaultOption: LottieOption = {
    width: 512,
    height: 512,
    useDataSize: false
}


export class LottieTexture extends HtmlElementTexture {
    lottieAnim?: AnimationItem

    static async LoadFromUrlAsync(name: string, url: string, scene: Scene, inOption: Partial<LottieOption> = {}) {
        let option: LottieOption = {...defaultOption, ...inOption}

        let container = document.createElement("div")
        let raw = await Tools.LoadFileAsync(url, false) as string
        let data = JSON.parse(raw)
        container.style.position = "absolute"
        container.style.zIndex = "-10000"
        let w = 128, h = 128
        if (option.useDataSize) {
            w = data.w
            h = data.h
        } else {
            w = option.width
            h = option.height
        }
        container.style.width = w + "px"
        container.style.height = h + "px"
        document.body.append(container)

        let lottieAnim = Lottie.loadAnimation({
            container,
            renderer: "canvas",
            autoplay: true,
            loop: true,
            animationData: data,
        })
        let canvas = lottieAnim.renderer.canvasContext.canvas
        let texture = new LottieTexture(name, canvas, {scene: scene, engine: scene.getEngine()})
        texture.lottieAnim = lottieAnim
        lottieAnim.hide()

        lottieAnim.addEventListener("enterFrame", args => {
            texture.update()
        })
        return texture
    }

    public dispose() {
        super.dispose();
        //@ts-ignore
        (this.lottieAnim.container as HTMLElement).parentElement.remove()
        this.lottieAnim.destroy()
        this.lottieAnim = null
    }
}
