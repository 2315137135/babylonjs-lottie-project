import {HtmlElementTexture, Scene} from '@babylonjs/core';
import {AnimationItem} from 'lottie-web';

interface LottieOption {
    width: number;
    height: number;
    useDataSize: boolean;
}
declare class LottieTexture extends HtmlElementTexture {
    lottieAnim?: AnimationItem;
    static LoadFromUrlAsync(name: string, url: string, scene: Scene, inOption?: Partial<LottieOption>): Promise<LottieTexture>;

    dispose(): void;
}

export { LottieTexture };
