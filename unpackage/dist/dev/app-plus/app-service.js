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
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const ComponentClass$1 = "uni-col";
  const _sfc_main$v = {
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
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$a], ["__scopeId", "data-v-6ad5e460"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-col/uni-col.vue"]]);
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  const ON_UNLOAD = "onUnload";
  const ON_BACK_PRESS = "onBackPress";
  const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
  const onBackPress = /* @__PURE__ */ createHook(ON_BACK_PRESS);
  const onPullDownRefresh = /* @__PURE__ */ createHook(ON_PULL_DOWN_REFRESH);
  const ComponentClass = "uni-row";
  const modifierSeparator = "--";
  const _sfc_main$u = {
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
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["render", _sfc_render$9], ["__scopeId", "data-v-86edfd37"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-row/uni-row.vue"]]);
  const _sfc_main$t = /* @__PURE__ */ vue.defineComponent({
    __name: "topCompontent",
    setup(__props) {
      function search(e) {
        uni.navigateTo({
          url: "/pages/search/search?name=" + e.detail.value
        });
      }
      function goHome() {
        uni.reLaunch({
          url: "/pages/index/index"
        });
      }
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_2$1);
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
                    /* NEED_HYDRATION */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, { span: "6" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("text", {
                    class: "titleContent",
                    onClick: goHome
                  }, "EMT动漫")
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
  const CompontentsTopCompontentTopCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-ce76fffc"], ["__file", "E:/程序夹/emtanimation_app/compontents/topCompontent/topCompontent.vue"]]);
  const _sfc_main$s = {};
  function _sfc_render$8(_ctx, _cache) {
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
  const CompontentsFooterCompontentFooterCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$8], ["__scopeId", "data-v-63a16b71"], ["__file", "E:/程序夹/emtanimation_app/compontents/footerCompontent/footerCompontent.vue"]]);
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
  const selectVideoById = async (vId) => {
    try {
      const res = await http("/selectVideoById", "get", { vid: vId });
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
  const getPlay = async (vodId, options) => {
    formatAppLog("log", "at api/index.ts:102", "\n vodId:", vodId, "\n options:", options);
    try {
      const res = await http("/getPlay", "get", {
        vid: vodId,
        options
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const getScore = async (vodId, options) => {
    try {
      const res = await http("/getScore", "get", {
        vid: vodId,
        options
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const isSubscribe = async (userId, userSubId) => {
    try {
      const res = await http("/isSubscribe", "get", {
        userId,
        userSubId
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const addSubscribe = async (userId, userSubId) => {
    try {
      const res = await http("/addSubscribe", "get", {
        userId,
        userSubId
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const deleteSubscribe = async (userId, userSubId) => {
    try {
      const res = await http("/deleteSubscribe", "get", {
        userId,
        userSubId
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const selectHistory = async (userId, vodPerId) => {
    try {
      const res = await http("/selectHistory", "get", {
        userId,
        vodPreId: vodPerId
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const addHistory = async (userId, vodPerId, vodEpisode, vodWatchTime) => {
    try {
      const res = await http("/addHistory", "get", {
        userId,
        vodPreId: vodPerId,
        vodEpisode,
        vodWatchTime
      });
      formatAppLog("log", "at api/index.ts:181", userId, vodPerId, vodEpisode, vodWatchTime, "历史记录添加成功", res);
      return res;
    } catch (error) {
      throw error;
    }
  };
  const updateHistory = async (userId, vodPerId, vodEpisode, vodWatchTime) => {
    try {
      const res = await http("/updateHistory", "get", {
        userId,
        vodPreId: vodPerId,
        vodEpisode,
        vodWatchTime
      });
      formatAppLog("log", "at api/index.ts:194", "历史记录更新完成");
      return res;
    } catch (error) {
      throw error;
    }
  };
  const getHistory = async (userId) => {
    try {
      const res = await http("/getHistory", "get", { userId });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const getSubscribe = async (userId) => {
    try {
      const res = await http("/selectSubscribe", "get", { userId });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const loginUser = async (userName, userPassword) => {
    try {
      const res = await http("/loginUser", "get", {
        userName,
        userPassword
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const deleteHistory = async (userId, vodPreId, vodEpisode) => {
    try {
      const res = await http("/deleteHistory", "get", {
        userId,
        vodPreId,
        vodEpisode
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const changeUser = async (user) => {
    try {
      const res = await http("/changeUser", "get", {
        userId: user.userId,
        userPassword: user.userPassword,
        loginIp: user.loginIp,
        loginTime: user.loginTime,
        loginDevice: user.loginDevice
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const selectUserName = async (userName) => {
    try {
      const res = await http("/selectUserName", "get", {
        userName
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  const register = async (user) => {
    try {
      const res = await http("/register", "get", {
        userName: user.userName,
        userPassword: user.userPassword,
        loginIp: user.loginIp,
        loginTime: user.loginTime,
        loginDevice: user.loginDevice
      });
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
  const nowTime = () => {
    let time = /* @__PURE__ */ new Date();
    formatAppLog("log", "at utils/time.ts:29", "现在时间为", Math.floor(time.getTime() / 1e3));
    return Math.floor(time.getTime() / 1e3);
  };
  const changeDate = (time) => {
    let date = new Date(time * 1e3);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + "-" + month + "-" + day;
  };
  const _sfc_main$r = {
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
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$7], ["__scopeId", "data-v-92d7b819"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"]]);
  const _sfc_main$q = /* @__PURE__ */ vue.defineComponent({
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
        formatAppLog("log", "at compontents/itemCompontent/itemCompontent.vue:30", "番剧项目这边指定的id", vodId);
        uni.navigateTo({
          url: "/pages/play/play?vodId=" + vodId
        });
      }
      onLoad(() => {
      });
      return (_ctx, _cache) => {
        const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_0$3);
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
  const CompontentsItemCompontentItemCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-0752f4c2"], ["__file", "E:/程序夹/emtanimation_app/compontents/itemCompontent/itemCompontent.vue"]]);
  const _sfc_main$p = /* @__PURE__ */ vue.defineComponent({
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
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_2$1);
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
  const CompontentsHomeWeekCompontentWeekCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-ddfca9bc"], ["__file", "E:/程序夹/emtanimation_app/compontents/home/weekCompontent/weekCompontent.vue"]]);
  const _sfc_main$o = /* @__PURE__ */ vue.defineComponent({
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
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_2$1);
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
                  vue.createElementVNode("text", null, " ")
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
  const CompontentsHomeRandomCompontentRandomCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-6cf98f20"], ["__file", "E:/程序夹/emtanimation_app/compontents/home/randomCompontent/randomCompontent.vue"]]);
  const _sfc_main$n = /* @__PURE__ */ vue.defineComponent({
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
  const CompontentsHomeRe0CompontentRe0Compontent = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-c8cf1775"], ["__file", "E:/程序夹/emtanimation_app/compontents/home/Re0Compontent/Re0Compontent.vue"]]);
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
  function registerPiniaDevtools(app2, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app: app2
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
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api.on.getInspectorState((payload) => {
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
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
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
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
  function addStoreToDevtools(app2, store) {
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
      app: app2,
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
  function devtoolsPlugin({ app: app2, store, options }) {
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
      app2,
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
      install(app2) {
        setActivePinia(pinia);
        {
          pinia._a = app2;
          app2.provide(piniaSymbol, pinia);
          app2.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app2, pinia);
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
        if (theme == "light")
          this.theme = "light";
        else
          this.theme = "dark";
      }
    }
  });
  const useUserStore = defineStore("user", {
    state: () => ({
      userId: 0,
      userName: "",
      userInformation: {
        loginTime: 0,
        loginIp: "",
        loginDevice: ""
      }
    }),
    getters: {
      getUserId: (state) => {
        let userId = uni.getStorageSync("userId");
        state.userId = userId != null && userId != void 0 ? userId : 0;
      },
      getUserName: (state) => {
        let userName = uni.getStorageSync("userName");
        state.userName = userName != null && userName != void 0 ? userName : "";
      },
      getUserInformation: (state) => {
        let loginTime = uni.getStorageSync("loginTime");
        let loginIp = uni.getStorageSync("loginIp");
        let loginDevice = uni.getStorageSync("loginDevice");
        state.userInformation.loginTime = loginTime;
        state.userInformation.loginIp = loginIp;
        state.userInformation.loginDevice = loginDevice;
      }
    }
  });
  const _sfc_main$m = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    setup(__props) {
      const set2 = useSettingStore();
      const theme = vue.computed(() => set2.theme);
      uni.setTabBarStyle({
        backgroundColor: theme.value == "dark" ? "#000000" : "#DCDFE6",
        color: theme.value == "dark" ? "#ccc" : "#000000"
      });
      onLoad(() => {
        const useUser = useUserStore();
        useUser.getUserId;
        useUser.getUserName;
        useUser.getUserInformation;
      });
      onShow(() => {
        uni.setTabBarStyle({
          backgroundColor: theme.value == "dark" ? "#000000" : "#DCDFE6",
          color: theme.value == "dark" ? "#ccc" : "#000000"
        });
      });
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
            class: vue.normalizeClass(["content", theme.value == "dark" ? "dark" : "light"])
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/程序夹/emtanimation_app/pages/index/index.vue"]]);
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
  const _sfc_main$l = /* @__PURE__ */ vue.defineComponent({
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
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_2$1);
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
  const CompontentsAllTagsCompontentTagsCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-e4b22507"], ["__file", "E:/程序夹/emtanimation_app/compontents/all/tagsCompontent/tagsCompontent.vue"]]);
  const _sfc_main$k = /* @__PURE__ */ vue.defineComponent({
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
  const CompontentsAllListCompontentListCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-342b8925"], ["__file", "E:/程序夹/emtanimation_app/compontents/all/listCompontent/listCompontent.vue"]]);
  const _sfc_main$j = /* @__PURE__ */ vue.defineComponent({
    __name: "all",
    setup(__props) {
      const setting = useSettingStore();
      const theme = vue.computed(() => setting.theme);
      uni.setTabBarStyle({
        backgroundColor: theme.value == "dark" ? "#000000" : "#DCDFE6",
        color: theme.value == "dark" ? "#ccc" : "#000000"
      });
      onShow(() => {
        uni.setTabBarStyle({
          backgroundColor: theme.value == "dark" ? "#000000" : "#DCDFE6",
          color: theme.value == "dark" ? "#ccc" : "#000000"
        });
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: vue.normalizeClass(["all", theme.value == "dark" ? "dark" : "light"])
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
  const PagesAllAll = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-445eec53"], ["__file", "E:/程序夹/emtanimation_app/pages/all/all.vue"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
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
  const CompontentsSearchSearchCompontentSearchCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-7dbdadd5"], ["__file", "E:/程序夹/emtanimation_app/compontents/search/searchCompontent/searchCompontent.vue"]]);
  const _sfc_main$h = /* @__PURE__ */ vue.defineComponent({
    __name: "search",
    setup(__props) {
      const setting = useSettingStore();
      const theme = vue.computed(() => setting.theme);
      uni.setTabBarStyle({
        backgroundColor: theme.value == "dark" ? "#000000" : "#DCDFE6",
        color: theme.value == "dark" ? "#ccc" : "#000000"
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 搜索界面 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["search", theme.value == "dark" ? "dark" : "light"])
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
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-c10c040c"], ["__file", "E:/程序夹/emtanimation_app/pages/search/search.vue"]]);
  const usePlayStore = defineStore("play", {
    state: () => ({
      //当前视频集数组
      episodeList: [],
      //当前视频播放资源数组
      videoList: [],
      //当前观看集
      selectEpisode: "",
      //当前播放资源
      selectVideo: "",
      //当前视频的信息
      videoInfo: "",
      //是否追番
      isSubscribe: false
    }),
    getters: {},
    actions: {
      //初始化数据
      initInformation(isLogin) {
        if (isLogin == 0) {
          this.selectEpisode = this.episodeList[0];
          this.selectVideo = this.videoList[0];
        }
      },
      //选择观看的集数
      selectWatch(options) {
        let index = this.episodeList.indexOf(this.selectEpisode);
        let length = this.episodeList.length;
        if (options == "上一集") {
          if (index == 0) {
            uni.showToast({
              title: "前面没东西了"
            });
          } else {
            this.selectEpisode = this.episodeList[index - 1];
            this.selectVideo = this.videoList[index - 1];
          }
        } else {
          if (length == index) {
            uni.showToast({
              title: "前面没东西了"
            });
          } else {
            this.selectEpisode = this.episodeList[index + 1];
            this.selectVideo = this.videoList[index + 1];
          }
        }
      },
      //选择集数
      select(item) {
        let index = this.episodeList.indexOf(item);
        this.selectEpisode = this.episodeList[index];
        this.selectVideo = this.videoList[index];
      }
    }
  });
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "videoCompontent",
    setup(__props) {
      const playStore = usePlayStore();
      const videoPlay = vue.computed(() => playStore.selectVideo);
      const selectEpisode = playStore.selectEpisode;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "videoCompontent" }, [
          vue.createElementVNode("video", {
            src: videoPlay.value,
            frameborder: "0",
            autoplay: "",
            title: vue.unref(selectEpisode),
            class: "video"
          }, null, 8, ["src", "title"])
        ]);
      };
    }
  });
  const CompontentsPlayVideoCompontentVideoCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-3609f8c9"], ["__file", "E:/程序夹/emtanimation_app/compontents/play/videoCompontent/videoCompontent.vue"]]);
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "episodeCompontent",
    setup(__props) {
      const playStore = usePlayStore();
      const episodeList = vue.computed(() => playStore.episodeList);
      const selectEpisode = vue.computed(() => playStore.selectEpisode);
      const index = vue.computed(() => playStore.episodeList.indexOf(playStore.selectEpisode));
      function episodeRun(options) {
        playStore.selectWatch(options);
      }
      function select(item) {
        playStore.select(item);
      }
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "episode" }, [
          vue.createCommentVNode(" 集数控制区 "),
          vue.createElementVNode("view", { class: "episodeTop" }, [
            vue.createVNode(_component_uni_row, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, {
                  span: 7,
                  class: "preEpisode",
                  onClick: _cache[0] || (_cache[0] = ($event) => episodeRun("上一集"))
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(" 上一集 ")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, {
                  span: 10,
                  class: "nowEpisode"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(
                      " 正在播放:" + vue.toDisplayString(selectEpisode.value),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, {
                  span: 7,
                  class: "nextEpisode",
                  onClick: _cache[1] || (_cache[1] = ($event) => episodeRun("下一集"))
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(" 下一集 ")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            })
          ]),
          vue.createCommentVNode(" 集数列表 "),
          vue.createElementVNode("swiper", {
            class: "episodeList swiper",
            "display-multiple-items": "5",
            current: index.value
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(episodeList.value, (item) => {
                return vue.openBlock(), vue.createElementBlock("swiper-item", {
                  key: item,
                  class: vue.normalizeClass(["episodeOne", { selected: selectEpisode.value == item }]),
                  onClick: ($event) => select(item)
                }, vue.toDisplayString(item), 11, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 8, ["current"])
        ]);
      };
    }
  });
  const CompontentsPlayEpisodeCompontentEpisodeCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-696d5f51"], ["__file", "E:/程序夹/emtanimation_app/compontents/play/episodeCompontent/episodeCompontent.vue"]]);
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$e = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$6], ["__scopeId", "data-v-946bce22"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"]]);
  const strFilter = (content) => {
    var decodedString = content.replace(/&lt;\/?(p|br)&gt;/g, "").replace(/&lt;/g, "").replace(/&gt;/g, "").replace(/#/g, "").replace(/&amp;nbsp;/g, " ").replace(/<br\s*\/?>/gi, "").replace(/<\/?p>/g, "");
    decodedString = decodedString.trim().replace(/\s+/g, " ");
    formatAppLog("log", "at utils/strFilter.ts:17", "处理后的结果为：", decodedString.trim());
    return decodedString.trim();
  };
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "informationCompontent",
    setup(__props) {
      const userStore = useUserStore();
      const playStore = usePlayStore();
      const content = vue.computed(() => playStore.videoInfo);
      async function getInformation(vid) {
        let res = await selectVideoById(vid);
        res.vodAddtime = changeDate(res.vodAddtime);
        res.vodContent = strFilter(res.vodContent);
        playStore.videoInfo = res;
        formatAppLog("log", "at compontents/play/informationCompontent/informationCompontent.vue:54", "看看information这边vodId的状态", content.value);
      }
      const sub = vue.computed(() => playStore.isSubscribe);
      async function getSubscribe2(userId, userSubId) {
        let res = await isSubscribe(userId, userSubId);
        formatAppLog("log", "at compontents/play/informationCompontent/informationCompontent.vue:61", "是否追番了", userId, userSubId, res);
        playStore.isSubscribe = res;
      }
      async function deleteSub(userId, userSubId) {
        formatAppLog("log", "at compontents/play/informationCompontent/informationCompontent.vue:66", "进行了取消追番操作", userId, userSubId);
        let res = await deleteSubscribe(userId, userSubId);
        if (res) {
          uni.showToast({
            title: "再烂都不要弃啊(笑",
            icon: "none"
          });
        }
        playStore.isSubscribe = false;
      }
      async function addSub(userId, userSubId) {
        formatAppLog("log", "at compontents/play/informationCompontent/informationCompontent.vue:78", "进行了追番操作");
        let res = await addSubscribe(userId, userSubId);
        if (res) {
          uni.showToast({
            title: "自己追的番跪着也要看完哦",
            icon: "none"
          });
        }
        playStore.isSubscribe = true;
      }
      async function isHistory(userId, vodPerId, vodEpisode, vodWatchTime) {
        let res = await selectHistory(userId, vodPerId);
        formatAppLog("log", "at compontents/play/informationCompontent/informationCompontent.vue:92", "看看res的状态", res, userId, vodPerId);
        if (res.vodPreId == null || res.vodPreId == void 0) {
          await addHistory(userId, vodPerId, vodEpisode, vodWatchTime);
        } else {
          if (playStore.selectEpisode == "" || playStore.selectEpisode == void 0)
            playStore.selectEpisode = res.vodEpisode;
          await updateHistory(userId, vodPerId, vodEpisode, vodWatchTime);
        }
      }
      vue.watch(vue.computed(() => playStore.selectEpisode), () => {
        if (userStore.userId != 0)
          isHistory(userStore.userId, content.value.vodId, playStore.selectEpisode, nowTime());
      });
      function subscribe() {
        if (userStore.userId == 0) {
          uni.showToast({
            title: "先登录再追番哦",
            icon: "none"
          });
        } else {
          if (sub.value) {
            deleteSub(userStore.userId, content.value.vodId);
          } else {
            addSub(userStore.userId, content.value.vodId);
          }
        }
      }
      onLoad((param) => {
        getInformation(param.vodId);
        if (userStore.userId != 0) {
          getSubscribe2(userStore.userId, param.vodId);
          isHistory(userStore.userId, param.vodId, playStore.selectEpisode, nowTime());
        }
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "information" }, [
          vue.createCommentVNode(" 图片 "),
          vue.createElementVNode("view", { class: "pic" }, [
            vue.createElementVNode("image", {
              src: content.value.vodPic
            }, null, 8, ["src"])
          ]),
          vue.createCommentVNode(" 番剧描述/简介 "),
          vue.createElementVNode("view", { class: "description" }, [
            vue.createCommentVNode(" 追番 "),
            vue.createElementVNode("view", { class: "subscribe" }, [
              vue.createVNode(_component_uni_icons, {
                type: sub.value ? "heart-filled" : "heart",
                onClick: subscribe,
                color: "red"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("追番")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["type"]),
              vue.createCommentVNode(' <view class="heart" :class="{onSub:sub?true:false}" ></view> ')
            ]),
            vue.createElementVNode(
              "p",
              null,
              vue.toDisplayString(content.value.vodName),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "p",
              null,
              "上次更新：" + vue.toDisplayString(content.value.vodAddtime),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "p",
              null,
              "上映时间：" + vue.toDisplayString(content.value.vodYear),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "content" },
              " 简介：" + vue.toDisplayString(content.value.vodContent),
              1
              /* TEXT */
            )
          ])
        ]);
      };
    }
  });
  const CompontentsPlayInformationCompontentInformationCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-86ce6639"], ["__file", "E:/程序夹/emtanimation_app/compontents/play/informationCompontent/informationCompontent.vue"]]);
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "play",
    setup(__props) {
      const settingStore = useSettingStore();
      const theme = vue.computed(() => settingStore.theme);
      uni.setTabBarStyle({
        backgroundColor: theme.value == "dark" ? "#000000" : "#DCDFE6",
        color: theme.value == "dark" ? "#ccc" : "#000000"
      });
      const userStore = useUserStore();
      const playStore = usePlayStore();
      async function getVideo(vodId) {
        let res = await selectVideoById(vodId);
        playStore.videoInfo = res;
        let res2 = await getPlay(vodId, 1);
        playStore.videoList = res2;
        let res3 = await getScore(vodId, 1);
        playStore.episodeList = res3;
        formatAppLog("log", "at pages/play/play.vue:59", "播放这边接收到的数据为", playStore.videoInfo, "\n播放数据为", playStore.videoList, "\n集数组为", playStore.episodeList);
      }
      onLoad((param) => {
        getVideo(param.vodId).then(() => {
          playStore.initInformation(userStore.userId);
        });
      });
      function initPlayStore() {
        playStore.episodeList = [];
        playStore.videoInfo = "";
        playStore.videoList = [];
        playStore.selectEpisode = "";
        playStore.selectVideo = "";
      }
      onUnload(() => {
        initPlayStore();
      });
      onBackPress(() => {
        initPlayStore();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          "view",
          {
            class: vue.normalizeClass(["play", theme.value == "dark" ? "dark" : "light"])
          },
          [
            vue.createCommentVNode(" 头部组件 "),
            vue.createVNode(CompontentsTopCompontentTopCompontent),
            vue.createCommentVNode(" 视频组件 "),
            vue.createVNode(CompontentsPlayVideoCompontentVideoCompontent),
            vue.createCommentVNode(" 集数组件 "),
            vue.createVNode(CompontentsPlayEpisodeCompontentEpisodeCompontent, { style: { "margin-bottom": "50rpx" } }),
            vue.createCommentVNode(" 番剧信息组件 "),
            vue.createVNode(CompontentsPlayInformationCompontentInformationCompontent),
            vue.createCommentVNode(" 尾部组件 "),
            vue.createVNode(CompontentsFooterCompontentFooterCompontent)
          ],
          2
          /* CLASS */
        );
      };
    }
  });
  const PagesPlayPlay = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-edf5a525"], ["__file", "E:/程序夹/emtanimation_app/pages/play/play.vue"]]);
  const _sfc_main$b = {
    name: "UniSegmentedControl",
    emits: ["clickItem"],
    props: {
      current: {
        type: Number,
        default: 0
      },
      values: {
        type: Array,
        default() {
          return [];
        }
      },
      activeColor: {
        type: String,
        default: "#2979FF"
      },
      styleType: {
        type: String,
        default: "button"
      }
    },
    data() {
      return {
        currentIndex: 0
      };
    },
    watch: {
      current(val) {
        if (val !== this.currentIndex) {
          this.currentIndex = val;
        }
      }
    },
    created() {
      this.currentIndex = this.current;
    },
    methods: {
      _onClick(index) {
        if (this.currentIndex !== index) {
          this.currentIndex = index;
          this.$emit("clickItem", {
            currentIndex: index
          });
        }
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass([[$props.styleType === "text" ? "segmented-control--text" : "segmented-control--button"], "segmented-control"]),
        style: vue.normalizeStyle({ borderColor: $props.styleType === "text" ? "" : $props.activeColor })
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.values, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass([[
                $props.styleType === "text" ? "" : "segmented-control__item--button",
                index === $data.currentIndex && $props.styleType === "button" ? "segmented-control__item--button--active" : "",
                index === 0 && $props.styleType === "button" ? "segmented-control__item--button--first" : "",
                index === $props.values.length - 1 && $props.styleType === "button" ? "segmented-control__item--button--last" : ""
              ], "segmented-control__item"]),
              key: index,
              style: vue.normalizeStyle({ backgroundColor: index === $data.currentIndex && $props.styleType === "button" ? $props.activeColor : "", borderColor: index === $data.currentIndex && $props.styleType === "text" || $props.styleType === "button" ? $props.activeColor : "transparent" }),
              onClick: ($event) => $options._onClick(index)
            }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "text",
                  {
                    style: vue.normalizeStyle({ color: index === $data.currentIndex ? $props.styleType === "text" ? $props.activeColor : "#fff" : $props.styleType === "text" ? "#000" : $props.activeColor }),
                    class: vue.normalizeClass(["segmented-control__text", $props.styleType === "text" && index === $data.currentIndex ? "segmented-control__item--text" : ""])
                  },
                  vue.toDisplayString(item),
                  7
                  /* TEXT, CLASS, STYLE */
                )
              ])
            ], 14, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$5], ["__scopeId", "data-v-52668560"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue"]]);
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "historyCompontent",
    props: {
      obj: { type: null, required: true }
    },
    setup(__props) {
      const data = __props;
      data.obj.vodWatchTime = changeDate(data.obj.vodWatchTime);
      const items = vue.ref([]);
      async function getVideoInfo(vid) {
        let res = await selectVideoById(vid);
        items.value = res;
      }
      const defaultImage = vue.ref("../../../static/load.jpg");
      items.vodPic = picUtils(items.vodPic);
      async function delHistory(userId, vodPreId, vodEpisode) {
        let res = await deleteHistory(userId, vodPreId, vodEpisode);
        return res;
      }
      function longTap(e) {
        formatAppLog("log", "at compontents/user/historyCompontent/historyCompontent.vue:56", "长按了", e);
        uni.showModal({
          title: "是否删除",
          cancelText: "取消",
          confirmText: "确定",
          confirmColor: "#ce3c39",
          content: "番剧:" + e.vodName + "\n观看记录:" + data.obj.vodEpisode,
          success: (res) => {
            if (res.confirm) {
              let res2 = delHistory(data.obj.userId, data.obj.vodPreId, data.obj.vodEpisode);
              if (res2) {
                uni.reLaunch({
                  url: "/pages/user/user?current=1"
                });
              }
            } else if (res.cancel) {
              formatAppLog("log", "at compontents/user/historyCompontent/historyCompontent.vue:72", "用户点击取消");
            }
          }
        });
      }
      onLoad(() => {
        getVideoInfo(data.obj.vodPreId);
      });
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createElementVNode("view", { class: "historys" }, [
              vue.createVNode(_component_uni_row, {
                onLongpress: _cache[0] || (_cache[0] = ($event) => longTap(items.value))
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_col, { span: 5 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("image", {
                        src: items.value.vodPic != "" ? items.value.vodPic : defaultImage.value,
                        class: "pic"
                      }, null, 8, ["src"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, {
                    span: 6,
                    class: "text"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(
                        vue.toDisplayString(items.value.vodName),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, {
                    span: 5,
                    class: "text"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(
                        vue.toDisplayString(data.obj.vodEpisode),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, {
                    span: 8,
                    class: "text"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(
                        vue.toDisplayString(data.obj.vodWatchTime),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            vue.createCommentVNode(' <uni-popup ref="popup" type="dialog">\r\n		<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>\r\n	</uni-popup> ')
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  });
  const CompontentsUserHistoryCompontentHistoryCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-0b3c4578"], ["__file", "E:/程序夹/emtanimation_app/compontents/user/historyCompontent/historyCompontent.vue"]]);
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "subscribeCompontent",
    props: {
      obj: { type: null, required: true }
    },
    setup(__props) {
      const data = __props;
      const items = vue.ref([]);
      async function getVideoInfo(vid) {
        let res = await selectVideoById(vid);
        res.vodAddtime = changeDate(res.vodAddtime);
        items.value = res;
      }
      const defaultImage = vue.ref("../../../static/load.jpg");
      items.vodPic = picUtils(items.vodPic);
      function trunTo() {
        uni.navigateTo({
          url: "/pages/play/play?vodId=" + items.value.vodId
        });
      }
      onLoad(() => {
        getVideoInfo(data.obj.userSubId);
      });
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_2$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "subscribes" }, [
          vue.createVNode(_component_uni_row, { onClick: trunTo }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_col, { span: 5 }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("image", {
                    src: items.value.vodPic != "" ? items.value.vodPic : defaultImage.value,
                    class: "pic"
                  }, null, 8, ["src"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, {
                span: 10,
                class: "text"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    vue.toDisplayString(items.value.vodName),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_col, {
                span: 9,
                class: "text"
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(
                    " 上次更新:" + vue.toDisplayString(items.value.vodAddtime),
                    1
                    /* TEXT */
                  )
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
  const CompontentsUserSubscribeCompontentSubscribeCompontent = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-41686da9"], ["__file", "E:/程序夹/emtanimation_app/compontents/user/subscribeCompontent/subscribeCompontent.vue"]]);
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "user",
    setup(__props) {
      const useSetting = useSettingStore();
      const theme = vue.computed(() => useSetting.theme);
      const useUser = useUserStore();
      const name = vue.computed(() => useUser.userName);
      const userInformation = vue.computed(() => useUser.userInformation);
      let loginTime = vue.computed(() => changeDate(useUser.userInformation.loginTime));
      const subInfo = vue.ref([]);
      async function getSub(userId) {
        let res = await getSubscribe(userId);
        subInfo.value = res;
      }
      const hisInfo = vue.ref([]);
      async function getHis(userId) {
        let res = await getHistory(userId);
        hisInfo.value = res;
        formatAppLog("log", "at pages/user/user.vue:98", "历史信息", hisInfo.value);
      }
      const items = vue.ref(["追番", "历史记录"]);
      const current = vue.ref(0);
      function onClickItem(e) {
        if (current.value != e.currentIndex) {
          current.value = e.currentIndex;
          formatAppLog("log", "at pages/user/user.vue:107", "current的值", current.value);
          if (current.value == 0) {
            getSub(useUser.userId);
            formatAppLog("log", "at pages/user/user.vue:110", "追番信息", subInfo.value);
          } else {
            getHis(useUser.userId);
          }
        }
      }
      function setting() {
        uni.navigateTo({
          url: "/pages/setting/setting"
        });
        formatAppLog("log", "at pages/user/user.vue:121", "点击了系统");
      }
      function login() {
        uni.reLaunch({
          url: "/pages/login/login"
        });
      }
      onShow(() => {
        if (current.value == 0) {
          getSub(useUser.userId);
        } else {
          getHis(useUser.userId);
        }
        uni.setTabBarStyle({
          backgroundColor: theme.value == "dark" ? "#000000" : "#DCDFE6",
          color: theme.value == "dark" ? "#ccc" : "#000000"
        });
      });
      onLoad((param) => {
        if (param.current == 1)
          current.value = 1;
        else
          current.value = 0;
        useUser.getUserId;
        useUser.getUserName;
        useUser.getUserInformation;
        formatAppLog("log", "at pages/user/user.vue:156", "用户界面这里获取到的数据为", useUser);
      });
      return (_ctx, _cache) => {
        const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
        const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_2$1);
        const _component_uni_segmented_control = resolveEasycom(vue.resolveDynamicComponent("uni-segmented-control"), __easycom_3);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 用户界面 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["user", theme.value == "dark" ? "dark" : "light"])
              },
              [
                vue.createCommentVNode(" 用户信息模块 "),
                vue.createElementVNode("view", { class: "userInfor" }, [
                  vue.createCommentVNode(" 用户头像 "),
                  vue.createVNode(_component_uni_row, null, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_col, { span: 7 }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("view", {
                            class: "user_img",
                            onClick: login
                          }, [
                            vue.createElementVNode("image", { src: "/static/user/default_user.jpg" })
                          ]),
                          vue.withDirectives(vue.createElementVNode(
                            "view",
                            { class: "login" },
                            " 点我登录 ",
                            512
                            /* NEED_PATCH */
                          ), [
                            [vue.vShow, name.value == ""]
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      vue.createVNode(_component_uni_col, { span: 17 }, {
                        default: vue.withCtx(() => [
                          vue.createCommentVNode(" 用户信息 "),
                          vue.createElementVNode("view", { class: "userInformation" }, [
                            vue.createElementVNode("p", null, [
                              name.value == "" ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "用户：先登录喵~")) : name.value != "" ? (vue.openBlock(), vue.createElementBlock(
                                "text",
                                { key: 1 },
                                "用户：" + vue.toDisplayString(name.value),
                                1
                                /* TEXT */
                              )) : vue.createCommentVNode("v-if", true),
                              vue.createCommentVNode("    //////系统////// "),
                              vue.createVNode(_component_uni_icons, {
                                type: "gear-filled",
                                size: "25",
                                style: { "float": "right" },
                                onClick: setting
                              })
                            ]),
                            vue.createElementVNode("p", null, [
                              userInformation.value.loginTime == null ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "上次登陆时间：先登录喵~")) : userInformation.value.loginTime != "" ? (vue.openBlock(), vue.createElementBlock(
                                "text",
                                { key: 1 },
                                "上次登录时间：" + vue.toDisplayString(vue.unref(loginTime)),
                                1
                                /* TEXT */
                              )) : vue.createCommentVNode("v-if", true)
                            ])
                          ])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                vue.createCommentVNode(" 选择区域 "),
                vue.createElementVNode("view", { class: "control" }, [
                  vue.createVNode(_component_uni_segmented_control, {
                    current: current.value,
                    values: items.value,
                    onClickItem,
                    styleType: "button",
                    activeColor: "rgba(198, 98, 255, 0.8)"
                  }, null, 8, ["current", "values"]),
                  vue.createElementVNode("view", { class: "content" }, [
                    vue.withDirectives(vue.createElementVNode(
                      "view",
                      null,
                      [
                        subInfo.value.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "暂无数据哦")) : vue.createCommentVNode("v-if", true),
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(subInfo.value, (item) => {
                            return vue.openBlock(), vue.createBlock(CompontentsUserSubscribeCompontentSubscribeCompontent, {
                              key: item.userSubId,
                              obj: item
                            }, null, 8, ["obj"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ],
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vShow, current.value === 0]
                    ]),
                    vue.withDirectives(vue.createElementVNode(
                      "view",
                      null,
                      [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(hisInfo.value, (item) => {
                            return vue.openBlock(), vue.createBlock(CompontentsUserHistoryCompontentHistoryCompontent, {
                              key: item,
                              obj: item
                            }, null, 8, ["obj"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        )),
                        hisInfo.value.length == 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "暂无数据哦")) : vue.createCommentVNode("v-if", true)
                      ],
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vShow, current.value === 1]
                    ])
                  ])
                ])
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
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-0f7520f0"], ["__file", "E:/程序夹/emtanimation_app/pages/user/user.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$7 = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm", "clear", "eyes", "change", "keyboardheightchange"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: false
      },
      cursorSpacing: {
        type: Number,
        default: 0
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      adjustPosition: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            backgroundColor: "#fff",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: "",
        isEnter: false
        // 用于判断当前是否是使用回车操作
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled,
          "is-focused": this.focusShow
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0 || this.modelValue === "") {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("blur", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        if (this.isEnter === false) {
          this.$emit("change", this.val);
        }
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.isEnter = true;
        this.$emit("change", this.val);
        this.$nextTick(() => {
          this.isEnter = false;
        });
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 键盘高度发生变化的时候触发此事件
       * 兼容性：微信小程序2.7.0+、App 3.1.0+
       * @param {Object} event
       */
      onkeyboardheightchange(event) {
        this.$emit("keyboardheightchange", event);
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
              key: 0,
              class: "content-clear-icon",
              type: $props.prefixIcon,
              color: "#c0c4cc",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
              size: "22"
            }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "left", {}, void 0, true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 1,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[5] || (_cache[5] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight", "cursor-spacing", "adjust-position"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 2,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              "cursor-spacing": $props.cursorSpacing,
              "adjust-position": $props.adjustPosition,
              onFocus: _cache[6] || (_cache[6] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[7] || (_cache[7] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[8] || (_cache[8] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[9] || (_cache[9] = (...args) => $options.onConfirm && $options.onConfirm(...args)),
              onKeyboardheightchange: _cache[10] || (_cache[10] = (...args) => $options.onkeyboardheightchange && $options.onkeyboardheightchange(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "adjust-position"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[11] || (_cache[11] = ($event) => $options.onClickIcon("suffix")),
                  size: "22"
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$4], ["__scopeId", "data-v-f7a14e66"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$6 = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      // 表单校验规则
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      // 表单域的属性名，在使用校验规则时必填
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      // label的宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: ""
      },
      // 强制显示错误信息
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 1.4.0 弃用，统一使用 form 的校验时机
      // validateTrigger: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 弃用，统一使用 form 的label 位置
      // labelPosition: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 以下属性已经废弃，请使用  #label 插槽代替
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "70px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      // 处理错误信息
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      // 规则发生变化通知子组件更新
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value, oldVal) => {
            const isEqual2 = this.form._isEqual(value, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules = null) {
        this.userRules = rules;
        this.init(false);
      },
      // 兼容老版本表单组件
      setValue() {
      },
      /**
       * 外部调用方法
       * 校验数据
       * @param {any} value 需要校验的数据
       * @param {boolean} 是否立即校验
       * @return {Array|null} 校验内容
       */
      async onFieldChange(value, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value) {
          value = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value
            },
            formData
          );
          if (!isRequiredField2 && (value === void 0 || value === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "校验错误",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "提示",
                content: result.errorMessage || "校验错误"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      /**
       * 初始组件数据
       */
      init(type = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.form && type && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      // 设置item 的值
      itemSetValue(value) {
        const name = this.form._realName(this.name);
        const rules = this.itemRules.rules || [];
        const val = this.form._getValue(name, value, rules);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      // 是否显示星号
      _isRequired() {
        return this.required;
      },
      // 处理对齐方式
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      // 处理 label宽度单位 ,继承父元素的值
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 70 : "auto"));
      },
      // 处理 label 位置
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      /**
       * 触发时机
       * @param {Object} rule 当前规则内时机
       * @param {Object} itemRlue 当前组件时机
       * @param {Object} parentRule 父组件时机
       */
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
      },
      [
        vue.renderSlot(_ctx.$slots, "label", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$props.required }]),
              style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
            },
            [
              $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ], true),
        vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.msg),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$3], ["__scopeId", "data-v-3515f8e1"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-forms-item/uni-forms-item.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value, data, allData) {
      var result = null;
      let rules = fieldValue.rules;
      let hasRequired = rules.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules === void 0) {
        return message["default"];
      }
      for (var i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let vt = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt]) {
          result = RuleValidatorHelper[vt](rule, value, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now2 = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now2);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data, allData, vt);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data, allData, vt) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt);
      }
      return result;
    }
    _getMessage(rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value, message) {
      const {
        range,
        errorMessage
      } = rule;
      let list = new Array(range.length);
      for (let i = 0; i < range.length; i++) {
        const item = range[i];
        if (types.object(item) && item.value !== void 0) {
          list[i] = item.value;
        } else {
          list[i] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value, message) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i = 0; i < value.length; i++) {
        const element = value[i];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format) => {
    return format === "int" || format === "double" || format === "number" || format === "timestamp";
  };
  const getValue = (key, value, rules) => {
    const isRuleNumType = rules.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value && value !== 0) {
        value = null;
      } else {
        value = isNumber(Number(value)) ? Number(value) : value;
      }
    }
    if (!!isRuleBoolType) {
      value = isBoolean(value) ? value : false;
    }
    return value;
  };
  const setDataValue = (field, formdata, value) => {
    formdata[field] = value;
    return value || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a, b) => a += `#${b}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object));
    let formData = {};
    for (let i in newData) {
      let path = name2arr(i);
      objSet(formData, path, newData[i]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v) => isNumber(v) ? Number(v) : v);
    return field;
  };
  const objSet = (object, path, value) => {
    if (typeof object !== "object")
      return object;
    _basePath(path).reduce((o, k, i, _) => {
      if (i === _.length - 1) {
        o[k] = value;
        return null;
      } else if (k in o) {
        return o[k];
      } else {
        o[k] = /^[0-9]{1,}$/.test(_[i + 1]) ? [] : {};
        return o[k];
      }
    }, object);
    return object;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o, k) => {
      return (o || {})[k];
    }, object);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules) => {
    let isNoField = false;
    for (let i = 0; i < rules.length; i++) {
      const ruleData = rules[i];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a, b) => {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }
    if (a == null || b == null) {
      return a === b;
    }
    var classNameA = toString.call(a), classNameB = toString.call(b);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a) {
          return +b !== +b;
        }
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a), propsB = Object.getOwnPropertyNames(b);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i = 0; i < propsA.length; i++) {
        var propName = propsA[i];
        if (a[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a.toString() == b.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$5 = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      // vue3 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      // 1.4.0 开始将不支持 v-model ，且废弃 value 和 modelValue
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      //校验错误信息提示方式 默认 undertext 取值 [undertext|toast|modal]
      errShowType: {
        type: String,
        default: "undertext"
      },
      // 校验触发器方式 默认 bind 取值 [bind|submit]
      validateTrigger: {
        type: String,
        default: "submit"
      },
      // label 位置，默认 left 取值  top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        // 表单本地值的记录，不应该与传如的值进行关联
        formData: {},
        formRules: {}
      };
    },
    computed: {
      // 计算数据源变化的
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      // 监听数据变化 ,暂时不使用，需要单独赋值
      // localData: {},
      // 监听规则变化
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i in this.$refs) {
              const vm = this.$refs[i];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at node_modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue:182", "当前 uni-froms 组件缺少 ref 属性");
            formVm.setValue(name, value);
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules) {
        this.formRules = Object.assign({}, this.formRules, rules);
        this.validator = new SchemaValidator(rules);
      },
      /**
       * 外部调用方法
       * 设置数据，用于设置表单数据，公开给用户使用 ， 不支持在动态表单中使用
       * @param {Object} key
       * @param {Object} value
       */
      setValue(key, value) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      /**
       * 外部调用方法
       * 部分表单校验
       * @param {Array|String} props 需要校验的字段
       * @param {Function} 回调函数
       */
      validateField(props = [], callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      /**
       * 外部调用方法
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       * @param {Array|String} props 需要移除校验的字段 ，不填为所有
       */
      clearValidate(props = []) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          if (props.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      /**
       * 外部调用方法 ，即将废弃
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      submit(keepitem, callback, type) {
        for (let i in this.dataValue) {
          const itemData = this.childrens.find((v) => v.name === i);
          if (itemData) {
            if (this.formData[i] === void 0) {
              this.formData[i] = this._getValue(i, this.dataValue[i]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at node_modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue:289", "submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      // 校验所有
      async checkAll(invalidFields, keepitem, callback, type) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i in invalidFields) {
          const item = this.childrens.find((v) => realName(v.name) === i);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i in childrens) {
          const child = childrens[i];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v) => {
            let vName = realName(v);
            let value = getDataValue(v, this.localData);
            if (value !== void 0) {
              tempFormData[vName] = value;
            }
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      /**
       * 返回validate事件
       * @param {Object} result
       */
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2], ["__scopeId", "data-v-13523fe0"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-forms/uni-forms.vue"]]);
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "login",
    setup(__props) {
      const loginData = vue.reactive({
        userName: "",
        password: ""
      });
      const isLogin = vue.ref(true);
      let now2 = nowTime();
      const change = vue.reactive({
        userId: "",
        loginTime: now2,
        loginDevice: "",
        loginIp: ""
      });
      async function getDevice() {
        uni.getSystemInfo({
          success: (device) => {
            let res = device.deviceType + "-" + device.appVersionCode + "-" + device.ua;
            change.loginDevice = res;
            registerUser.loginDevice = res;
          }
        });
      }
      async function getIp() {
        uni.request({
          url: "https://api.ipify.org?format=json",
          success: (res) => {
            change.loginIp = res.data.ip;
            registerUser.loginIp = res.data.ip;
            formatAppLog("log", "at pages/login/login.vue:86", "登录地址", res.data.ip);
          }
        });
      }
      vue.ref();
      async function login() {
        if (loginData.userName == "")
          uni.showToast({
            title: "没有输入账号",
            icon: "none"
          });
        else if (loginData.password == "")
          uni.showToast({
            title: "没有输入密码",
            icon: "none"
          });
        else {
          let res = await loginUser(loginData.userName, loginData.password);
          if (res.userId == "" || res.userId == void 0) {
            uni.showToast({
              //特殊状况
              title: "登录失败，请检查网络或联系管理员emt1731041348@outlook.com",
              icon: "none",
              duration: 3e3
            });
          } else if (res.loginPass == 0) {
            uni.showToast({
              title: "登录失败，请联系管理员emt1731041348@outlook.com",
              icon: "none",
              duration: 3e3
            });
          } else {
            change.userId = res.userId;
            changeUser(change);
            uni.setStorageSync("userId", res.userId);
            uni.setStorageSync("userName", res.userName);
            uni.setStorageSync("userPassword", res.userPassword);
            uni.setStorageSync("loginTime", now2);
            uni.setStorageSync("loginDevice", res.loginDevice);
            uni.setStorageSync("loginPass", res.loginPass);
            uni.showLoading({
              title: "登录成功!"
            });
            setTimeout(() => {
              uni.hideLoading();
              uni.reLaunch({
                url: "../index/index"
              });
            }, 1e3);
          }
        }
      }
      const registerData = vue.reactive({
        name: "",
        password: "",
        again: ""
      });
      let registerUser = {
        userName: registerData.name,
        userPassword: registerData.password,
        loginTime: nowTime(),
        loginIp: "",
        loginDevice: ""
      };
      function registerClick() {
        isLogin.value = false;
        formatAppLog("log", "at pages/login/login.vue:160", "点击了注册");
      }
      async function onRegister() {
        let res = await selectUserName(registerData.name);
        if (res) {
          uni.showToast({
            title: "当前用户名已存在！",
            icon: "none"
          });
          registerData.name = "";
        } else {
          if (registerData.name == "")
            uni.showToast({
              title: "none",
              icon: "none"
            });
          if (registerData.password.length < 6)
            uni.showToast({
              title: "密码长度不得小于6位！",
              icon: "none"
            });
          else if (registerData.password != registerData.again) {
            uni.showToast({
              title: "两次密码不一致！",
              icon: "none"
            });
            registerData.again = "";
          } else {
            registerUser.loginTime = nowTime();
            registerUser.userName = registerData.name;
            registerUser.userPassword = registerData.password;
            let res2 = register(registerUser);
            if (res2)
              uni.showToast({
                title: "注册成功",
                icon: "none",
                duration: 1e3,
                success() {
                  isLogin.value = true;
                  loginData.userName = registerUser.userName;
                  loginData.password = registerUser.userPassword;
                  formatAppLog("log", "at pages/login/login.vue:206", "看看到底有没有传过去", registerUser);
                  login();
                }
              });
          }
        }
      }
      function forget() {
        uni.showToast({
          title: "暂不支持找回",
          icon: "none"
        });
      }
      onLoad(() => {
        getDevice();
        getIp();
      });
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "loginRegister" }, [
          vue.createCommentVNode(" 登录 "),
          isLogin.value ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "login_item"
          }, [
            vue.createVNode(_component_uni_forms, { modelValue: loginData }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_forms_item, {
                  label: "账号",
                  required: "",
                  name: "name"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      modelValue: loginData.userName,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => loginData.userName = $event),
                      placeholder: "用户名/账号名"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_forms_item, {
                  label: "密码",
                  required: "",
                  name: "password"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      type: "password",
                      modelValue: loginData.password,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => loginData.password = $event)
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createElementVNode("button", {
                  type: "primary",
                  onClick: login
                }, "登录"),
                vue.createElementVNode("button", {
                  type: "primary",
                  onClick: registerClick
                }, "注册")
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue"]),
            vue.createCommentVNode(" emmm忘记了 "),
            vue.createElementVNode("view", {
              class: "forget",
              onClick: forget
            }, " 我忘记密码了 ")
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 注册 "),
          !isLogin.value ? (vue.openBlock(), vue.createBlock(_component_uni_forms, {
            key: 1,
            class: "register_item",
            modelValue: registerData
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_forms_item, {
                label: "账号",
                required: "",
                name: "name"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    modelValue: registerData.name,
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => registerData.name = $event),
                    placeholder: "用户名/账号名"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_forms_item, {
                label: "密码",
                required: "",
                name: "password"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    type: "password",
                    modelValue: registerData.password,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => registerData.password = $event),
                    placeholder: "请输入密码,不得少于6位"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_forms_item, {
                label: "再次输入密码",
                required: "",
                name: "again"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    type: "password",
                    modelValue: registerData.again,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => registerData.again = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createElementVNode("button", {
                type: "primary",
                onClick: onRegister
              }, "注册")
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue"])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  });
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e4e4508d"], ["__file", "E:/程序夹/emtanimation_app/pages/login/login.vue"]]);
  const _sfc_main$3 = {
    name: "uniCollapseItem",
    props: {
      // 列表标题
      title: {
        type: String,
        default: ""
      },
      name: {
        type: [Number, String],
        default: ""
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示动画,app 端默认不开启动画，卡顿严重
      showAnimation: {
        type: Boolean,
        default: false
      },
      // 是否展开
      open: {
        type: Boolean,
        default: false
      },
      // 缩略图
      thumb: {
        type: String,
        default: ""
      },
      // 标题分隔线显示类型
      titleBorder: {
        type: String,
        default: "auto"
      },
      border: {
        type: Boolean,
        default: true
      },
      showArrow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        isOpen: false,
        isheight: null,
        height: 0,
        elId,
        nameSync: 0
      };
    },
    watch: {
      open(val) {
        this.isOpen = val;
        this.onClick(val, "init");
      }
    },
    updated(e) {
      this.$nextTick(() => {
        this.init(true);
      });
    },
    created() {
      this.collapse = this.getCollapse();
      this.oldHeight = 0;
      this.onClick(this.open, "init");
    },
    // TODO vue3
    unmounted() {
      this.__isUnmounted = true;
      this.uninstall();
    },
    mounted() {
      if (!this.collapse)
        return;
      if (this.name !== "") {
        this.nameSync = this.name;
      } else {
        this.nameSync = this.collapse.childrens.length + "";
      }
      if (this.collapse.names.indexOf(this.nameSync) === -1) {
        this.collapse.names.push(this.nameSync);
      } else {
        formatAppLog("warn", "at node_modules/@dcloudio/uni-ui/lib/uni-collapse-item/uni-collapse-item.vue:154", `name 值 ${this.nameSync} 重复`);
      }
      if (this.collapse.childrens.indexOf(this) === -1) {
        this.collapse.childrens.push(this);
      }
      this.init();
    },
    methods: {
      init(type) {
        this.getCollapseHeight(type);
      },
      uninstall() {
        if (this.collapse) {
          this.collapse.childrens.forEach((item, index) => {
            if (item === this) {
              this.collapse.childrens.splice(index, 1);
            }
          });
          this.collapse.names.forEach((item, index) => {
            if (item === this.nameSync) {
              this.collapse.names.splice(index, 1);
            }
          });
        }
      },
      onClick(isOpen, type) {
        if (this.disabled)
          return;
        this.isOpen = isOpen;
        if (this.isOpen && this.collapse) {
          this.collapse.setAccordion(this);
        }
        if (type !== "init") {
          this.collapse.onChange(isOpen, this);
        }
      },
      getCollapseHeight(type, index = 0) {
        const views = uni.createSelectorQuery().in(this);
        views.select(`#${this.elId}`).fields({
          size: true
        }, (data) => {
          if (index >= 10)
            return;
          if (!data) {
            index++;
            this.getCollapseHeight(false, index);
            return;
          }
          this.height = data.height;
          this.isheight = true;
          if (type)
            return;
          this.onClick(this.isOpen, "init");
        }).exec();
      },
      getNvueHwight(type) {
        dom.getComponentRect(this.$refs["collapse--hook"], (option) => {
          if (option && option.result && option.size) {
            this.height = option.size.height;
            this.isheight = true;
            if (type)
              return;
            this.onClick(this.open, "init");
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getCollapse(name = "uniCollapse") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse-item" }, [
      vue.createCommentVNode(" onClick(!isOpen) "),
      vue.createElementVNode(
        "view",
        {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick(!$data.isOpen)),
          class: vue.normalizeClass(["uni-collapse-item__title", { "is-open": $data.isOpen && $props.titleBorder === "auto", "uni-collapse-item-border": $props.titleBorder !== "none" }])
        },
        [
          vue.createElementVNode("view", { class: "uni-collapse-item__title-wrap" }, [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-collapse-item__title-box", { "is-disabled": $props.disabled }])
                },
                [
                  $props.thumb ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: $props.thumb,
                    class: "uni-collapse-item__title-img"
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    { class: "uni-collapse-item__title-text" },
                    vue.toDisplayString($props.title),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ], true)
          ]),
          $props.showArrow ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass([{ "uni-collapse-item__title-arrow-active": $data.isOpen, "uni-collapse-item--animation": $props.showAnimation === true }, "uni-collapse-item__title-arrow"])
            },
            [
              vue.createVNode(_component_uni_icons, {
                color: $props.disabled ? "#ddd" : "#bbb",
                size: "14",
                type: "bottom"
              }, null, 8, ["color"])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-collapse-item__wrap", { "is--transition": $props.showAnimation }]),
          style: vue.normalizeStyle({ height: ($data.isOpen ? $data.height : 0) + "px" })
        },
        [
          vue.createElementVNode("view", {
            id: $data.elId,
            ref: "collapse--hook",
            class: vue.normalizeClass(["uni-collapse-item__wrap-content", { open: $data.isheight, "uni-collapse-item--border": $props.border && $data.isOpen }])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 10, ["id"])
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1], ["__scopeId", "data-v-8f0af21a"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-collapse-item/uni-collapse-item.vue"]]);
  const _sfc_main$2 = {
    name: "uniCollapse",
    emits: ["change", "activeItem", "input", "update:modelValue"],
    props: {
      value: {
        type: [String, Array],
        default: ""
      },
      modelValue: {
        type: [String, Array],
        default: ""
      },
      accordion: {
        // 是否开启手风琴效果
        type: [Boolean, String],
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      // TODO 兼容 vue2 和 vue3
      dataValue() {
        let value = typeof this.value === "string" && this.value === "" || Array.isArray(this.value) && this.value.length === 0;
        let modelValue = typeof this.modelValue === "string" && this.modelValue === "" || Array.isArray(this.modelValue) && this.modelValue.length === 0;
        if (value) {
          return this.modelValue;
        }
        if (modelValue) {
          return this.value;
        }
        return this.value;
      }
    },
    watch: {
      dataValue(val) {
        this.setOpen(val);
      }
    },
    created() {
      this.childrens = [];
      this.names = [];
    },
    mounted() {
      this.$nextTick(() => {
        this.setOpen(this.dataValue);
      });
    },
    methods: {
      setOpen(val) {
        let str = typeof val === "string";
        let arr = Array.isArray(val);
        this.childrens.forEach((vm, index) => {
          if (str) {
            if (val === vm.nameSync) {
              if (!this.accordion) {
                formatAppLog("warn", "at node_modules/@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue:75", "accordion 属性为 false ,v-model 类型应该为 array");
                return;
              }
              vm.isOpen = true;
            }
          }
          if (arr) {
            val.forEach((v) => {
              if (v === vm.nameSync) {
                if (this.accordion) {
                  formatAppLog("warn", "at node_modules/@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue:85", "accordion 属性为 true ,v-model 类型应该为 string");
                  return;
                }
                vm.isOpen = true;
              }
            });
          }
        });
        this.emit(val);
      },
      setAccordion(self2) {
        if (!this.accordion)
          return;
        this.childrens.forEach((vm, index) => {
          if (self2 !== vm) {
            vm.isOpen = false;
          }
        });
      },
      resize() {
        this.childrens.forEach((vm, index) => {
          vm.getCollapseHeight();
        });
      },
      onChange(isOpen, self2) {
        let activeItem = [];
        if (this.accordion) {
          activeItem = isOpen ? self2.nameSync : "";
        } else {
          this.childrens.forEach((vm, index) => {
            if (vm.isOpen) {
              activeItem.push(vm.nameSync);
            }
          });
        }
        this.$emit("change", activeItem);
        this.emit(activeItem);
      },
      emit(val) {
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__scopeId", "data-v-88f6e75f"], ["__file", "E:/程序夹/emtanimation_app/node_modules/@dcloudio/uni-ui/lib/uni-collapse/uni-collapse.vue"]]);
  const app = {
    version: "1.0"
  };
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "setting",
    setup(__props) {
      const useSetting = useSettingStore();
      const theme = vue.computed(() => useSetting.theme);
      function selectTheme(e) {
        formatAppLog("log", "at pages/setting/setting.vue:41", "选择的主题", e.detail.value);
        useSetting.changeTheme(e.detail.value);
        uni.showToast({
          title: "已经更换主题了",
          icon: "none"
        });
      }
      function showDialog() {
        uni.showModal({
          showCancel: false,
          title: "emilia maji tenshi",
          content: `	我是本软件的制作人，本人学艺不精，若有关于本软件的一些建议，可以向“emt1731041348@outlook.com”发送。
	本人需要强调，本软件所有资源来源于网络，本软件绝不盈利，如果你对本软件提供的服务有所质疑，也请向如上邮箱发送你的想法。
	如有冒犯，十分抱歉。`
        });
      }
      function getApp2() {
        uni.showModal({
          showCancel: false,
          title: "获取最新版本",
          content: "当前版本" + app.version + `	最新版本为`
        });
        formatAppLog("log", "at pages/setting/setting.vue:65", app.version);
      }
      function unlogin() {
        uni.showModal({
          title: "退出登录",
          content: "确认退出登录吗？",
          success: (res) => {
            if (res.confirm) {
              uni.showToast({
                title: "退出了！",
                icon: "none",
                duration: 1500,
                success() {
                  uni.removeStorageSync("userId");
                  uni.removeStorageSync("userName");
                  uni.removeStorageSync("loginTime");
                  uni.removeStorageSync("loginIp");
                  uni.removeStorageSync("loginDevice");
                  formatAppLog("log", "at pages/setting/setting.vue:85", "看看删了没", uni.getStorageSync("userId"));
                }
              });
            }
          }
        });
      }
      return (_ctx, _cache) => {
        const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_0);
        const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "setting" }, [
          vue.createVNode(_component_uni_collapse, null, {
            default: vue.withCtx(() => [
              vue.createCommentVNode(" 设置主题 "),
              vue.createVNode(_component_uni_collapse_item, {
                title: "设置主题",
                open: false,
                class: "selectTheme"
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode(
                    "radio-group",
                    {
                      name: "",
                      onChange: selectTheme
                    },
                    [
                      vue.createElementVNode("label", null, [
                        vue.createElementVNode("radio", {
                          value: "light",
                          checked: theme.value == "light",
                          style: { "transform": "scale(0.7)" }
                        }, null, 8, ["checked"]),
                        vue.createElementVNode("text", null, "白昼")
                      ]),
                      vue.createElementVNode("label", null, [
                        vue.createElementVNode("radio", {
                          value: "dark",
                          checked: theme.value == "dark",
                          style: { "transform": "scale(0.7)" }
                        }, null, 8, ["checked"]),
                        vue.createElementVNode("text", null, "黑夜")
                      ])
                    ],
                    32
                    /* NEED_HYDRATION */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createCommentVNode(" 制作人有话说 "),
              vue.createVNode(_component_uni_collapse_item, {
                title: "制作人有话说",
                onClick: showDialog,
                open: false,
                showArrow: false
              }),
              vue.createCommentVNode(" 获取最新版本 "),
              vue.createVNode(_component_uni_collapse_item, {
                title: "获取最新版本",
                onClick: getApp2,
                open: false,
                showArrow: false
              }),
              vue.createCommentVNode(" 获取最新版本 "),
              vue.createVNode(_component_uni_collapse_item, {
                title: "退出登录",
                onClick: unlogin,
                open: false,
                showArrow: false
              })
            ]),
            _: 1
            /* STABLE */
          })
        ]);
      };
    }
  });
  const PagesSettingSetting = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-018cdf56"], ["__file", "E:/程序夹/emtanimation_app/pages/setting/setting.vue"]]);
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
  __definePage("pages/play/play", PagesPlayPlay);
  __definePage("compontents/play/videoCompontent/videoCompontent", CompontentsPlayVideoCompontentVideoCompontent);
  __definePage("compontents/play/episodeCompontent/episodeCompontent", CompontentsPlayEpisodeCompontentEpisodeCompontent);
  __definePage("compontents/play/informationCompontent/informationCompontent", CompontentsPlayInformationCompontentInformationCompontent);
  __definePage("pages/user/user", PagesUserUser);
  __definePage("compontents/user/historyCompontent/historyCompontent", CompontentsUserHistoryCompontentHistoryCompontent);
  __definePage("compontents/user/subscribeCompontent/subscribeCompontent", CompontentsUserSubscribeCompontentSubscribeCompontent);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/setting/setting", PagesSettingSetting);
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
    const app2 = vue.createVueApp(App);
    const pinia = createPinia();
    app2.use(pinia);
    return {
      app: app2
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
})(Vue);
