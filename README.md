# 介绍

将lottie加载为babylonjs贴图

使用lottie-web

# install

`pnpm add babylonjs-lottie`

# example

最小化代码

```javascript
let lottieTexture = await LottieTexture.LoadFromUrlAsync("name", "/lottie.json", scene, {} /*option*/)
```

加载一个盒子并且设置贴图为 lottie 动画

```javascript
let box = MeshBuilder.CreateBox("box")
let mat = new PBRMaterial("pbr", scene)
let lottieTexture = await LottieTexture.LoadFromUrlAsync("name", "/Aniki Hamster.json", scene, {} /*option*/)
mat.albedoTexture = lottieTexture
box.material = mat
mat.unlit = true
```

其他

```javascript
let lottieTexture = await LottieTexture.LoadFromUrlAsync("name", "/lottie.json", scene, {} /*option*/)

lottieTexture.lottieAnim.play()
lottieTexture.lottieAnim.pause()
lottieTexture.lottieAnim.currentFrame()
//....

```
