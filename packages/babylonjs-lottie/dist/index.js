"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/lottieTexture.ts
var _core = require('@babylonjs/core');
var _lottieweb = require('lottie-web'); var _lottieweb2 = _interopRequireDefault(_lottieweb);
var defaultOption = {
  width: 512,
  height: 512,
  useDataSize: false
};
var LottieTexture = class extends _core.HtmlElementTexture {
  constructor() {
    super(...arguments);
    __publicField(this, "lottieAnim");
  }
  static LoadFromUrlAsync(_0, _1, _2) {
    return __async(this, arguments, function* (name, url, scene, inOption = {}) {
      let option = __spreadValues(__spreadValues({}, defaultOption), inOption);
      let container = document.createElement("div");
      let raw = yield _core.Tools.LoadFileAsync(url, false);
      let data = JSON.parse(raw);
      container.style.position = "absolute";
      container.style.zIndex = "-10000";
      let w = 128, h = 128;
      if (option.useDataSize) {
        w = data.w;
        h = data.h;
      } else {
        w = option.width;
        h = option.height;
      }
      container.style.width = w + "px";
      container.style.height = h + "px";
      document.body.append(container);
      let lottieAnim = _lottieweb2.default.loadAnimation({
        container,
        renderer: "canvas",
        autoplay: true,
        loop: true,
        animationData: data
      });
      let canvas = lottieAnim.renderer.canvasContext.canvas;
      let texture = new LottieTexture(name, canvas, { scene, engine: scene.getEngine() });
      texture.lottieAnim = lottieAnim;
      lottieAnim.hide();
      lottieAnim.addEventListener("enterFrame", (args) => {
        texture.update();
      });
      return texture;
    });
  }
  dispose() {
    super.dispose();
    this.lottieAnim.container.parentElement.remove();
    this.lottieAnim.destroy();
    this.lottieAnim = null;
  }
};


exports.LottieTexture = LottieTexture;
