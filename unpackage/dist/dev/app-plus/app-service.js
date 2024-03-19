if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const ComponentClass$1 = "uni-col";
  const _sfc_main$f = {
    name: "uniCol",
    props: {
      span: {
        type: Number,
        default: 24
      },
      offset: {
        type: Number,
        default: -1
      },
      pull: {
        type: Number,
        default: -1
      },
      push: {
        type: Number,
        default: -1
      },
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object],
      xl: [Number, Object]
    },
    data() {
      return {
        gutter: 0,
        sizeClass: "",
        parentWidth: 0,
        nvueWidth: 0,
        marginLeft: 0,
        right: 0,
        left: 0
      };
    },
    created() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== "uniRow") {
        parent = parent.$parent;
      }
      this.updateGutter(parent.gutter);
      parent.$watch("gutter", (gutter) => {
        this.updateGutter(gutter);
      });
    },
    computed: {
      sizeList() {
        let {
          span,
          offset,
          pull,
          push
        } = this;
        return {
          span,
          offset,
          pull,
          push
        };
      },
      pointClassList() {
        let classList = [];
        ["xs", "sm", "md", "lg", "xl"].forEach((point) => {
          const props = this[point];
          if (typeof props === "number") {
            classList.push(`${ComponentClass$1}-${point}-${props}`);
          } else if (typeof props === "object" && props) {
            Object.keys(props).forEach((pointProp) => {
              classList.push(
                pointProp === "span" ? `${ComponentClass$1}-${point}-${props[pointProp]}` : `${ComponentClass$1}-${point}-${pointProp}-${props[pointProp]}`
              );
            });
          }
        });
        return classList.join(" ");
      }
    },
    methods: {
      updateGutter(parentGutter) {
        parentGutter = Number(parentGutter);
        if (!isNaN(parentGutter)) {
          this.gutter = parentGutter / 2;
        }
      }
    },
    watch: {
      sizeList: {
        immediate: true,
        handler(newVal) {
          let classList = [];
          for (let size in newVal) {
            const curSize = newVal[size];
            if ((curSize || curSize === 0) && curSize !== -1) {
              classList.push(
                size === "span" ? `${ComponentClass$1}-${curSize}` : `${ComponentClass$1}-${size}-${curSize}`
              );
            }
          }
          this.sizeClass = classList.join(" ");
        }
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-col", $data.sizeClass, $options.pointClassList]),
        style: vue.normalizeStyle({
          paddingLeft: `${Number($data.gutter)}rpx`,
          paddingRight: `${Number($data.gutter)}rpx`
        })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$3], ["__scopeId", "data-v-6ad5e460"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-col/uni-col.vue"]]);
  const ON_LOAD = "onLoad";
  const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onPullDownRefresh = /* @__PURE__ */ createHook(ON_PULL_DOWN_REFRESH);
  const ComponentClass = "uni-row";
  const modifierSeparator = "--";
  const _sfc_main$e = {
    name: "uniRow",
    componentName: "uniRow",
    props: {
      type: String,
      gutter: Number,
      justify: {
        type: String,
        default: "start"
      },
      align: {
        type: String,
        default: "top"
      },
      // nvue如果使用span等属性，需要配置宽度
      width: {
        type: [String, Number],
        default: 750
      }
    },
    created() {
    },
    computed: {
      marginValue() {
        if (this.gutter) {
          return -(this.gutter / 2);
        }
        return 0;
      },
      typeClass() {
        return this.type === "flex" ? `${ComponentClass + modifierSeparator}flex` : "";
      },
      justifyClass() {
        return this.justify !== "start" ? `${ComponentClass + modifierSeparator}flex-justify-${this.justify}` : "";
      },
      alignClass() {
        return this.align !== "top" ? `${ComponentClass + modifierSeparator}flex-align-${this.align}` : "";
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-row", $options.typeClass, $options.justifyClass, $options.alignClass]),
        style: vue.normalizeStyle({
          marginLeft: `${Number($options.marginValue)}rpx`,
          marginRight: `${Number($options.marginValue)}rpx`
        })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$2], ["__scopeId", "data-v-86edfd37"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-row/uni-row.vue"]]);
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "topCompontent",
    setup(__props) {
      function search(e) {
        uni.navigateTo({
          url: "/pages/search/search?name=" + e.detail.value
        });
      }
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$1);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "topCompontent" }, [
          vue.createVNode(_component_uni_row, { class: "titleBar" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_col, { span: "7" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("image", {
                    src: "/static/emilia.png",
                    mode: "aspectFit"
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: "11" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode(
                    "input",
                    {
                      placeholder: "来找一部好番吧~",
                      bgColor: "#EEEEEE",
                      onConfirm: search
                    },
                    null,
                    32
                    /* HYDRATE_EVENTS */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: "6" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("text", { class: "titleContent" }, "EMT动漫")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  });
  const CompontentsTopCompontentTopCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-ce76fffc"], ["__file", "E:/程序夹/emtanimation_app/compontents/topCompontent/topCompontent.vue"]]);
  const _sfc_main$c = {};
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "footer" }, [
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("p", null, "请勿相信视频内中的一切广告，如有损失，请恕本人概不负责"),
        vue.createElementVNode("p", null, "本站仅供娱乐、学习，一切资源来源于网络，若有冒犯，还请见谅"),
        vue.createElementVNode("p", null, "有什么建议可向emt1731041348@outlook.com传达"),
        vue.createElementVNode("p", null, [
          vue.createElementVNode("a", {
            href: "https://beian.miit.gov.cn/",
            style: { "color": "red" }
          }, "赣ICP备2024023067号")
        ])
      ])
    ]);
  }
  const CompontentsFooterCompontentFooterCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$1], ["__scopeId", "data-v-63a16b71"], ["__file", "E:/程序夹/emtanimation_app/compontents/footerCompontent/footerCompontent.vue"]]);
  const baseUrl = "https://8.130.75.115:8080";
  const http = (url, method, data, headers = {}) => {
    const requestConfig = {
      url: baseUrl + url,
      method,
      data,
      header: headers
      // ...其他配置  
    };
    uni.showLoading();
    return new Promise((resolve, reject) => {
      uni.request(requestConfig).then((response) => {
        const { data: data2, statusCode, header } = response;
        if (statusCode === 200) {
          resolve(data2);
        } else {
          reject(new Error("请求失败了，状态码为 " + statusCode));
        }
        uni.hideLoading();
      }).catch((error) => {
        reject(error);
        uni.hideLoading();
      });
    });
  };
  const picUtils = async (vpic) => {
    await http("/picUtils", "get", { vpic }).then((res) => {
      return res ? vpic : "";
    }).catch((error) => {
      formatAppLog("log", "at api/index.ts:14", "请求失败 ", error);
    });
  };
  const selectVideoByName = async (name) => {
    try {
      const res = await http("/selectVideoByName", "get", { name });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const today = async (day) => {
    try {
      let res = await http("/weekNew", "get", { day });
      return res;
    } catch (err) {
      throw err;
    }
  };
  const randomVideo = async () => {
    try {
      const res = await http("/randomVideo", "get");
      return res;
    } catch (error) {
      throw error;
    }
  };
  const selectVideoNum = async (lang, publishyear, publishare, letter) => {
    try {
      const res = await http("/selectVideoNum", "get", {
        lang,
        publishyear,
        publishare,
        letter
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const selectVideo = async (lang, publishyear, publishare, letter, pageNum) => {
    try {
      const res = await http("/selectVideo", "get", {
        lang,
        publishyear,
        publishare,
        letter,
        pageNum
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const getToday = () => {
    let nowDay = (/* @__PURE__ */ new Date()).getDay();
    if (nowDay - 1 < 0)
      nowDay = 6;
    else
      nowDay--;
    return nowDay;
  };
  const IsToday = (vodAddtime) => {
    let time = /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getFullYear() + "-" + ((/* @__PURE__ */ new Date()).getMonth() + 1) + "-" + (/* @__PURE__ */ new Date()).getDate() + " 00:00:00");
    let toDay = time.getTime() / 1e3 - 28800;
    let nextDay = toDay + 86400;
    let addtime = parseInt(vodAddtime);
    if (addtime >= toDay && addtime <= nextDay)
      return true;
    else
      return false;
  };
  const _sfc_main$b = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w = this.width / 2, h = 10;
        if (this.isDot) {
          w = 5;
          h = 5;
        }
        const x = `${-w + this.offset[0]}px`;
        const y = `${-h + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y
          },
          rightBottom: {
            right: x,
            bottom: y
          },
          leftBottom: {
            left: x,
            bottom: y
          },
          leftTop: {
            left: x,
            top: y
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render], ["__scopeId", "data-v-92d7b819"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.33
    * (c) 2023 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 4e4);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const { assign: assign$1 } = Object;
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api) => {
      const now2 = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o) {
    return !!(vue.isRef(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : (
      /* istanbul ignore next */
      () => {
        throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
      }
    );
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
        Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  const useApiStore = defineStore("api", {
    state: () => ({}),
    actions: {
      turnTo(vodId) {
        formatAppLog("log", "at pinia/api.ts:9", "跳转至id", vodId);
      }
    },
    getters: {}
  });
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "itemCompontent",
    props: {
      obj: { type: null, required: true }
    },
    setup(__props) {
      const data = __props;
      const defaultImage = vue.ref("../../static/load.jpg");
      data.vodPic = picUtils(data.vodPic);
      const todayIs = vue.ref(IsToday(data.obj.vodAddtime));
      function trunTo(vodId) {
        useApiStore().turnTo(vodId);
      }
      onLoad(() => {
      });
      return (_ctx, _cache) => {
        const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
          vue.createElementVNode("image", {
            src: data.obj.vodPic != "" ? data.obj.vodPic : defaultImage.value,
            onClick: _cache[0] || (_cache[0] = ($event) => trunTo(data.obj.vodId))
          }, null, 8, ["src"]),
          vue.createVNode(_component_uni_badge, {
            size: "small",
            text: todayIs.value ? "new" : "",
            absolute: "leftTop",
            type: "primary"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                { class: "vodName" },
                vue.toDisplayString(data.obj.vodName),
                1
                /* TEXT */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["text"])
        ]);
      };
    }
  });
  const CompontentsItemCompontentItemCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-0752f4c2"], ["__file", "E:/程序夹/emtanimation_app/compontents/itemCompontent/itemCompontent.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "weekCompontent",
    setup(__props) {
      const dayInit = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      const daySelect = vue.ref("");
      daySelect.value = dayInit[getToday()];
      function selectDay(day) {
        formatAppLog("log", "at compontents/home/weekCompontent/weekCompontent.vue:35", "selectDay :", day);
        daySelect.value = day;
        getTodyData();
      }
      const items = vue.ref([]);
      async function getTodyData() {
        items.value.splice(0, items.value.length);
        let res = await today(dayInit.indexOf(daySelect.value) + 1);
        items.value = res;
      }
      onLoad(() => {
        formatAppLog("log", "at compontents/home/weekCompontent/weekCompontent.vue:52", "weekDay");
        getTodyData();
      });
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$1);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "week" }, [
          vue.createCommentVNode(" 星期数 "),
          vue.createVNode(_component_uni_row, { class: "demo-uni-row days" }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(dayInit, (item) => {
                  return vue.createVNode(_component_uni_col, {
                    span: 3,
                    key: item,
                    push: "2",
                    class: vue.normalizeClass(["day", { "daySelected": item == daySelect.value }]),
                    onClick: ($event) => selectDay(item)
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(
                        vue.toDisplayString(item),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["class", "onClick"]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createCommentVNode(" 内容 "),
          items.value.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "weekContent"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(items.value, (item) => {
                return vue.openBlock(), vue.createBlock(vue.unref(CompontentsItemCompontentItemCompontent), {
                  key: item,
                  obj: item,
                  class: "itemContent"
                }, null, 8, ["obj"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])) : items.value.length < 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "noItems"
          }, " 还没有内容哦 ")) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const CompontentsHomeWeekCompontentWeekCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-ddfca9bc"], ["__file", "E:/程序夹/emtanimation_app/compontents/home/weekCompontent/weekCompontent.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "randomCompontent",
    setup(__props) {
      const items = vue.ref([]);
      async function getRandom() {
        let random = await randomVideo();
        items.value = random;
        formatAppLog("log", "at compontents/home/randomCompontent/randomCompontent.vue:38", "随机", random);
      }
      onLoad(() => {
        getRandom();
      });
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$1);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "random" }, [
          vue.createCommentVNode(" 标题 "),
          vue.createVNode(_component_uni_row, { class: "demo-uni-row random_title" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_col, { span: 5 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("text", null, "随机推荐")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: 14 }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("   ")
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: 5 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("text", null, "more")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createCommentVNode(" 内容 "),
          vue.createElementVNode("view", { class: "random_content" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(items.value, (item) => {
                return vue.openBlock(), vue.createBlock(CompontentsItemCompontentItemCompontent, {
                  key: item.vodId,
                  obj: item,
                  class: "items"
                }, null, 8, ["obj"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  });
  const CompontentsHomeRandomCompontentRandomCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-6cf98f20"], ["__file", "E:/程序夹/emtanimation_app/compontents/home/randomCompontent/randomCompontent.vue"]]);
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "Re0Compontent",
    setup(__props) {
      const items = vue.ref([]);
      async function getItems() {
        let res = await selectVideoByName("从零开始的异世界生活");
        items.value = res;
      }
      onLoad(() => {
        getItems();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "reTheme" }, [
          vue.createCommentVNode(" 标题 "),
          vue.createElementVNode("view", { class: "theme_title" }, " Re:ゼロから始める異世界生活 "),
          vue.createCommentVNode(" 内容 "),
          vue.createElementVNode("view", { class: "theme_content" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(items.value, (item) => {
                return vue.openBlock(), vue.createBlock(CompontentsItemCompontentItemCompontent, {
                  key: item.vodId,
                  class: "items",
                  obj: item
                }, null, 8, ["obj"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  });
  const CompontentsHomeRe0CompontentRe0Compontent = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-c8cf1775"], ["__file", "E:/程序夹/emtanimation_app/compontents/home/Re0Compontent/Re0Compontent.vue"]]);
  const useSettingStore = defineStore("setting", {
    //定义参数
    state: () => ({
      theme: "dark"
    }),
    //获取参数
    getters: {
      getTheme(state) {
        return state.theme;
      }
    },
    //方法
    actions: {
      changeTheme(theme) {
        if (theme == "dark")
          this.theme = "light";
        else
          this.theme = "dark";
      }
    }
  });
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const set2 = useSettingStore();
      const theme = vue.computed(() => set2.theme);
      onPullDownRefresh(() => {
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/index/index"
          });
          uni.stopPullDownRefresh();
        }, 500);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: vue.normalizeClass(["content", vue.unref(theme) == "dark" ? "dark" : "light"])
          },
          [
            vue.createCommentVNode(" 头部导航栏 "),
            vue.createVNode(CompontentsTopCompontentTopCompontent),
            vue.createCommentVNode(" 主要内容区 "),
            vue.createCommentVNode(" 每周更新内容 "),
            vue.createVNode(CompontentsHomeWeekCompontentWeekCompontent),
            vue.createCommentVNode(" 随机推荐 "),
            vue.createVNode(CompontentsHomeRandomCompontentRandomCompontent, { class: "alltop" }),
            vue.createCommentVNode(" 从零主题 "),
            vue.createVNode(CompontentsHomeRe0CompontentRe0Compontent, { class: "alltop" }),
            vue.createCommentVNode(" 底部 "),
            vue.createVNode(CompontentsFooterCompontentFooterCompontent, { class: "alltop" })
          ],
          2
          /* CLASS */
        );
      };
    }
  });
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/程序夹/emtanimation_app/pages/index/index.vue"]]);
  const useAllStore = defineStore("all", {
    state: () => ({
      lang: [],
      langSelected: "",
      letter: [],
      letterSelected: "",
      publishare: [],
      publishareSelected: "",
      publishyear: [],
      publishyearSelected: "",
      pageNum: 1
    }),
    getters: {
      //获取语种
      getLang: (state) => {
        let arr = ["日语", "中文", "其他"];
        for (let i = 0; i < arr.length; i++)
          state.lang.push(arr[i]);
        return state.lang;
      },
      //获取字母
      getLetter: (state) => {
        let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        for (let i = 0; i < arr.length; i++)
          state.letter.push(arr[i]);
        return state.letter;
      },
      //获取地区
      getPublishare: (state) => {
        let arr = ["日韩", "中国", "欧美"];
        for (let i = 0; i < arr.length; i++)
          state.publishare.push(arr[i]);
        return state.publishare;
      },
      //获取年份
      getPublishyear: (state) => {
        let year = (/* @__PURE__ */ new Date()).getFullYear();
        for (let i = 0; i < 8; i++)
          state.publishyear.push(year - i);
        state.publishyear.push("更早以前");
        return state.publishyear;
      }
    }
  });
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "tagsCompontent",
    setup(__props) {
      const allStore = useAllStore();
      const lang = vue.ref([]);
      lang.value = allStore.getLang;
      var langSelected = vue.ref(vue.computed(() => allStore.langSelected));
      const publishare = vue.ref([]);
      publishare.value = allStore.getPublishare;
      var publishareSelected = vue.ref(vue.computed(() => allStore.publishareSelected));
      const letter = vue.ref([]);
      letter.value = allStore.getLetter;
      var letterSelected = vue.ref(vue.computed(() => allStore.letterSelected));
      const publishyear = vue.ref([]);
      publishyear.value = allStore.getPublishyear;
      var publishyearSelected = vue.ref(vue.computed(() => allStore.publishyearSelected));
      function selected(item, tag) {
        switch (tag) {
          case "publishyear":
            if (allStore.publishyearSelected != item)
              allStore.publishyearSelected = item;
            else
              allStore.publishyearSelected = "";
            break;
          case "publishare":
            if (allStore.publishareSelected != item)
              allStore.publishareSelected = item;
            else
              allStore.publishareSelected = "";
            break;
          case "letter":
            if (allStore.letterSelected != item)
              allStore.letterSelected = item;
            else
              allStore.letterSelected = "";
            break;
          case "lang":
            if (allStore.langSelected != item)
              allStore.langSelected = item;
            else
              allStore.langSelected = "";
            break;
        }
      }
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$1);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "allContent" }, [
          vue.createCommentVNode(" tag标签区 "),
          vue.createElementVNode("view", { class: "tags" }, [
            vue.createCommentVNode(" 年份 "),
            vue.createVNode(_component_uni_row, { class: "row" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, {
                  span: 6,
                  class: "tags_title"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("按年份查找")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, {
                  span: 18,
                  class: "tags_content"
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(publishyear.value, (item) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: vue.normalizeClass(["tag", { selected: item == vue.unref(publishyearSelected) }]),
                          key: item,
                          onClick: ($event) => selected(item, "publishyear")
                        }, vue.toDisplayString(item), 11, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 语种 "),
            vue.createVNode(_component_uni_row, { class: "row" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, {
                  span: 6,
                  class: "tags_title"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("按语言查找")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, {
                  span: 18,
                  class: "tags_content"
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(lang.value, (item) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: vue.normalizeClass(["tag", { selected: item == vue.unref(langSelected) }]),
                          key: item,
                          onClick: ($event) => selected(item, "lang")
                        }, vue.toDisplayString(item), 11, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 地区 "),
            vue.createVNode(_component_uni_row, { class: "row" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, {
                  span: 6,
                  class: "tags_title"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("按地区查找")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, {
                  span: 18,
                  class: "tags_content"
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(publishare.value, (item) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: vue.normalizeClass(["tag", { selected: item == vue.unref(publishareSelected) }]),
                          key: item,
                          onClick: ($event) => selected(item, "publishare")
                        }, vue.toDisplayString(item), 11, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createCommentVNode(" 字母 "),
            vue.createVNode(_component_uni_row, { class: "row" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, {
                  span: 6,
                  class: "tags_title"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("按字母查找")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, {
                  span: 18,
                  class: "tags_content"
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(letter.value, (item) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: vue.normalizeClass(["tag", { selected: item == vue.unref(letterSelected) }]),
                          key: item,
                          onClick: ($event) => selected(item, "letter")
                        }, vue.toDisplayString(item), 11, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            })
          ])
        ]);
      };
    }
  });
  const CompontentsAllTagsCompontentTagsCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-e4b22507"], ["__file", "E:/程序夹/emtanimation_app/compontents/all/tagsCompontent/tagsCompontent.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "listCompontent",
    setup(__props) {
      const pageNum = vue.ref(1);
      const totalNum = vue.ref();
      const runPage = vue.ref();
      const useAll = useAllStore();
      const publishyear = vue.ref(vue.computed(() => useAll.publishyearSelected));
      const publishare = vue.ref(vue.computed(() => useAll.publishareSelected));
      const lang = vue.ref(vue.computed(() => useAll.langSelected));
      const letter = vue.ref(vue.computed(() => useAll.letterSelected));
      const options = vue.reactive([
        publishyear,
        lang,
        publishare,
        letter,
        pageNum
      ]);
      const items = vue.ref([]);
      async function initItems() {
        let res = await selectVideo(lang.value, publishyear.value, publishare.value, letter.value, pageNum.value);
        items.value = res;
      }
      async function initTotalNum() {
        let res = await selectVideoNum(lang.value, publishyear.value, publishare.value, letter.value);
        totalNum.value = res % 20 == 0 ? res / 20 : Math.ceil(res / 20);
      }
      function createWatch(item) {
        vue.watch(item, () => {
          initItems();
          initTotalNum();
        });
      }
      function showToast(content) {
        uni.showToast({
          title: content,
          duration: 1500,
          icon: "none"
          //image:'../../../static/toast.jpg'
        });
      }
      function pageTo(model) {
        switch (model) {
          case "prePage":
            if (pageNum.value - 1 == 0)
              showToast("前面是地狱啊");
            else
              pageNum.value--;
            break;
          case "nextPage":
            if (pageNum.value + 1 > totalNum.value)
              showToast("空气墙似乎是存在的");
            else
              pageNum.value++;
            break;
          case "runPage":
            formatAppLog("log", "at compontents/all/listCompontent/listCompontent.vue:98", "runPage is ", runPage.value);
            if (runPage.value < 1 || runPage.value > totalNum.value)
              showToast("异世界可不是这么好去的");
            else
              pageNum.value = runPage.value;
            runPage.value = null;
            break;
        }
      }
      onLoad(() => {
        initItems();
        initTotalNum();
        for (let i = 0; i < options.length; i++)
          createWatch(options[i]);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "list" }, [
          vue.createCommentVNode(" 列表内容 "),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(items.value, (item) => {
              return vue.openBlock(), vue.createBlock(CompontentsItemCompontentItemCompontent, {
                key: item.vodId,
                obj: item,
                class: "item"
              }, null, 8, ["obj"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.createCommentVNode(" 页数控制器 "),
          vue.createElementVNode("view", { class: "pageController" }, [
            vue.createElementVNode("view", {
              class: "prePage",
              onClick: _cache[0] || (_cache[0] = ($event) => pageTo("prePage"))
            }, " 上一页 "),
            vue.createElementVNode(
              "view",
              { class: "pageNum" },
              vue.toDisplayString(pageNum.value) + "/" + vue.toDisplayString(totalNum.value),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", {
              class: "nextPage",
              onClick: _cache[1] || (_cache[1] = ($event) => pageTo("nextPage"))
            }, " 下一页 "),
            vue.createElementVNode("view", { class: "runPage" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "number",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => runPage.value = $event)
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, runPage.value]
              ]),
              vue.createElementVNode("button", {
                onClick: _cache[3] || (_cache[3] = ($event) => pageTo("runPage"))
              }, "GO")
            ])
          ])
        ]);
      };
    }
  });
  const CompontentsAllListCompontentListCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-342b8925"], ["__file", "E:/程序夹/emtanimation_app/compontents/all/listCompontent/listCompontent.vue"]]);
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "all",
    setup(__props) {
      const setting = useSettingStore();
      const theme = vue.computed(() => setting.theme);
      onLoad(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: vue.normalizeClass(["all", vue.unref(theme) == "dark" ? "dark" : "light"])
          },
          [
            vue.createCommentVNode(" 头部 "),
            vue.createVNode(CompontentsTopCompontentTopCompontent),
            vue.createCommentVNode(" 内容区 "),
            vue.createCommentVNode(" tags "),
            vue.createVNode(CompontentsAllTagsCompontentTagsCompontent, { class: "alltop" }),
            vue.createCommentVNode(" list "),
            vue.createVNode(CompontentsAllListCompontentListCompontent, { class: "alltop" }),
            vue.createCommentVNode(" 底部 "),
            vue.createVNode(CompontentsFooterCompontentFooterCompontent)
          ],
          2
          /* CLASS */
        );
      };
    }
  });
  const PagesAllAll = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-445eec53"], ["__file", "E:/程序夹/emtanimation_app/pages/all/all.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "searchCompontent",
    setup(__props) {
      const items = vue.ref([]);
      const total = vue.ref(0);
      async function getItems() {
        const res = await selectVideoByName(name.value);
        items.value = res;
        total.value = res.length;
        formatAppLog("log", "at compontents/search/searchCompontent/searchCompontent.vue:30", "获取到的数据总额：", total.value);
      }
      const name = vue.ref("");
      onLoad((props) => {
        name.value = props.name;
        getItems();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "searchList" }, [
          vue.createCommentVNode(" 结果描述 "),
          vue.createElementVNode(
            "view",
            { class: "search_des" },
            vue.toDisplayString(name.value) + " 的搜索结果为(共" + vue.toDisplayString(total.value) + "条数据): ",
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "search_list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(items.value, (item) => {
                return vue.openBlock(), vue.createBlock(CompontentsItemCompontentItemCompontent, {
                  key: item.vodId,
                  obj: item,
                  class: "item"
                }, null, 8, ["obj"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  });
  const CompontentsSearchSearchCompontentSearchCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-7dbdadd5"], ["__file", "E:/程序夹/emtanimation_app/compontents/search/searchCompontent/searchCompontent.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "search",
    setup(__props) {
      const setting = useSettingStore();
      const theme = vue.computed(() => setting.theme);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 搜索界面 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["search", vue.unref(theme) == "dark" ? "dark" : "light"])
              },
              [
                vue.createCommentVNode(" 头部组件 "),
                vue.createVNode(CompontentsTopCompontentTopCompontent),
                vue.createCommentVNode(" 内容组件 "),
                vue.createVNode(CompontentsSearchSearchCompontentSearchCompontent, { style: { "margin-top": "110rpx" } }),
                vue.createCommentVNode(" 底部组件 "),
                vue.createVNode(CompontentsFooterCompontentFooterCompontent, { style: { "margin-top": "55rpx" } })
              ],
              2
              /* CLASS */
            )
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  });
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c10c040c"], ["__file", "E:/程序夹/emtanimation_app/pages/search/search.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("compontents/topCompontent/topCompontent", CompontentsTopCompontentTopCompontent);
  __definePage("compontents/footerCompontent/footerCompontent", CompontentsFooterCompontentFooterCompontent);
  __definePage("compontents/itemCompontent/itemCompontent", CompontentsItemCompontentItemCompontent);
  __definePage("compontents/home/weekCompontent/weekCompontent", CompontentsHomeWeekCompontentWeekCompontent);
  __definePage("compontents/home/randomCompontent/randomCompontent", CompontentsHomeRandomCompontentRandomCompontent);
  __definePage("compontents/home/Re0Compontent/Re0Compontent", CompontentsHomeRe0CompontentRe0Compontent);
  __definePage("pages/all/all", PagesAllAll);
  __definePage("compontents/all/tagsCompontent/tagsCompontent", CompontentsAllTagsCompontentTagsCompontent);
  __definePage("compontents/all/listCompontent/listCompontent", CompontentsAllListCompontentListCompontent);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("compontents/search/searchCompontent/searchCompontent", CompontentsSearchSearchCompontentSearchCompontent);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/程序夹/emtanimation_app/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    const pinia = createPinia();
    app.use(pinia);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
