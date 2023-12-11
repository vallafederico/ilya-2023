(() => {
  // src/modules/dom.js
  var Dom = class {
    constructor() {
      this.create();
    }
    resize() {
    }
    render(t2) {
    }
    create() {
      this.start();
    }
    start() {
    }
    destroy() {
    }
    /* --  Pages */
    transitionOut(page) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    }
    transitionIn(page) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    }
  };

  // src/modules/viewport.js
  var Viewport = class {
    constructor() {
      this.resize();
    }
    resize() {
      document.documentElement.style.setProperty(
        "--100vh",
        `${window.innerHeight}px`
      );
    }
  };

  // node_modules/.pnpm/@studio-freight+lenis@1.0.27/node_modules/@studio-freight/lenis/dist/lenis.modern.mjs
  function t() {
    return t = Object.assign ? Object.assign.bind() : function(t2) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var e2 = arguments[i2];
        for (var s2 in e2)
          Object.prototype.hasOwnProperty.call(e2, s2) && (t2[s2] = e2[s2]);
      }
      return t2;
    }, t.apply(this, arguments);
  }
  function i(t2, i2, e2) {
    return Math.max(t2, Math.min(i2, e2));
  }
  var e = class {
    advance(t2) {
      var e2;
      if (!this.isRunning)
        return;
      let s2 = false;
      if (this.lerp)
        this.value = (o2 = this.value, n2 = this.to, (1 - (r2 = 1 - Math.exp(-60 * this.lerp * t2))) * o2 + r2 * n2), Math.round(this.value) === this.to && (this.value = this.to, s2 = true);
      else {
        this.currentTime += t2;
        const e3 = i(0, this.currentTime / this.duration, 1);
        s2 = e3 >= 1;
        const o3 = s2 ? 1 : this.easing(e3);
        this.value = this.from + (this.to - this.from) * o3;
      }
      var o2, n2, r2;
      null == (e2 = this.onUpdate) || e2.call(this, this.value, s2), s2 && this.stop();
    }
    stop() {
      this.isRunning = false;
    }
    fromTo(t2, i2, { lerp: e2 = 0.1, duration: s2 = 1, easing: o2 = (t3) => t3, onStart: n2, onUpdate: r2 }) {
      this.from = this.value = t2, this.to = i2, this.lerp = e2, this.duration = s2, this.easing = o2, this.currentTime = 0, this.isRunning = true, null == n2 || n2(), this.onUpdate = r2;
    }
  };
  var s = class {
    constructor({ wrapper: t2, content: i2, autoResize: e2 = true } = {}) {
      if (this.resize = () => {
        this.onWrapperResize(), this.onContentResize();
      }, this.onWrapperResize = () => {
        this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
      }, this.onContentResize = () => {
        this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth;
      }, this.wrapper = t2, this.content = i2, e2) {
        const t3 = /* @__PURE__ */ function(t4, i3) {
          let e3;
          return function() {
            let i4 = arguments, s2 = this;
            clearTimeout(e3), e3 = setTimeout(function() {
              t4.apply(s2, i4);
            }, 250);
          };
        }(this.resize);
        this.wrapper !== window && (this.wrapperResizeObserver = new ResizeObserver(t3), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(t3), this.contentResizeObserver.observe(this.content);
      }
      this.resize();
    }
    destroy() {
      var t2, i2;
      null == (t2 = this.wrapperResizeObserver) || t2.disconnect(), null == (i2 = this.contentResizeObserver) || i2.disconnect();
    }
    get limit() {
      return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
    }
  };
  var o = class {
    constructor() {
      this.events = {};
    }
    emit(t2, ...i2) {
      let e2 = this.events[t2] || [];
      for (let t3 = 0, s2 = e2.length; t3 < s2; t3++)
        e2[t3](...i2);
    }
    on(t2, i2) {
      var e2;
      return (null == (e2 = this.events[t2]) ? void 0 : e2.push(i2)) || (this.events[t2] = [i2]), () => {
        var e3;
        this.events[t2] = null == (e3 = this.events[t2]) ? void 0 : e3.filter((t3) => i2 !== t3);
      };
    }
    off(t2, i2) {
      var e2;
      this.events[t2] = null == (e2 = this.events[t2]) ? void 0 : e2.filter((t3) => i2 !== t3);
    }
    destroy() {
      this.events = {};
    }
  };
  var n = class {
    constructor(t2, { wheelMultiplier: e2 = 1, touchMultiplier: s2 = 2, normalizeWheel: n2 = false }) {
      this.onTouchStart = (t3) => {
        const { clientX: i2, clientY: e3 } = t3.targetTouches ? t3.targetTouches[0] : t3;
        this.touchStart.x = i2, this.touchStart.y = e3, this.lastDelta = { x: 0, y: 0 };
      }, this.onTouchMove = (t3) => {
        const { clientX: i2, clientY: e3 } = t3.targetTouches ? t3.targetTouches[0] : t3, s3 = -(i2 - this.touchStart.x) * this.touchMultiplier, o2 = -(e3 - this.touchStart.y) * this.touchMultiplier;
        this.touchStart.x = i2, this.touchStart.y = e3, this.lastDelta = { x: s3, y: o2 }, this.emitter.emit("scroll", { deltaX: s3, deltaY: o2, event: t3 });
      }, this.onTouchEnd = (t3) => {
        this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t3 });
      }, this.onWheel = (t3) => {
        let { deltaX: e3, deltaY: s3 } = t3;
        this.normalizeWheel && (e3 = i(-100, e3, 100), s3 = i(-100, s3, 100)), e3 *= this.wheelMultiplier, s3 *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: e3, deltaY: s3, event: t3 });
      }, this.element = t2, this.wheelMultiplier = e2, this.touchMultiplier = s2, this.normalizeWheel = n2, this.touchStart = { x: null, y: null }, this.emitter = new o(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
    }
    on(t2, i2) {
      return this.emitter.on(t2, i2);
    }
    destroy() {
      this.emitter.destroy(), this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
    }
  };
  var r = class {
    constructor({ wrapper: i2 = window, content: r2 = document.documentElement, wheelEventsTarget: l = i2, eventsTarget: h = l, smoothWheel: a = true, smoothTouch: c = false, syncTouch: u = false, syncTouchLerp: p = 0.1, __iosNoInertiaSyncTouchLerp: d = 0.4, touchInertiaMultiplier: m = 35, duration: g, easing: v = (t2) => Math.min(1, 1.001 - Math.pow(2, -10 * t2)), lerp: S = !g && 0.1, infinite: w = false, orientation: f = "vertical", gestureOrientation: y = "vertical", touchMultiplier: T = 1, wheelMultiplier: z = 1, normalizeWheel: M = false, autoResize: L = true } = {}) {
      this.onVirtualScroll = ({ deltaX: i3, deltaY: e2, event: s2 }) => {
        if (s2.ctrlKey)
          return;
        const o2 = s2.type.includes("touch"), n2 = s2.type.includes("wheel");
        if ("both" === this.options.gestureOrientation && 0 === i3 && 0 === e2 || "vertical" === this.options.gestureOrientation && 0 === e2 || "horizontal" === this.options.gestureOrientation && 0 === i3 || o2 && "vertical" === this.options.gestureOrientation && 0 === this.scroll && !this.options.infinite && e2 <= 0)
          return;
        let r3 = s2.composedPath();
        if (r3 = r3.slice(0, r3.indexOf(this.rootElement)), r3.find((t2) => {
          var i4;
          return (null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent")) || o2 && (null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent-touch")) || n2 && (null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent-wheel")) || (null == (i4 = t2.classList) ? void 0 : i4.contains("lenis"));
        }))
          return;
        if (this.isStopped || this.isLocked)
          return void s2.preventDefault();
        if (this.isSmooth = (this.options.smoothTouch || this.options.syncTouch) && o2 || this.options.smoothWheel && n2, !this.isSmooth)
          return this.isScrolling = false, void this.animate.stop();
        s2.preventDefault();
        let l2 = e2;
        "both" === this.options.gestureOrientation ? l2 = Math.abs(e2) > Math.abs(i3) ? e2 : i3 : "horizontal" === this.options.gestureOrientation && (l2 = i3);
        const h2 = o2 && this.options.syncTouch, a2 = o2 && "touchend" === s2.type && Math.abs(l2) > 1;
        a2 && (l2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + l2, t({ programmatic: false }, h2 && { lerp: a2 ? this.syncTouchLerp : this.options.__iosNoInertiaSyncTouchLerp }));
      }, this.onScroll = () => {
        if (!this.isScrolling) {
          const t2 = this.animatedScroll;
          this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t2), this.emit();
        }
      }, window.lenisVersion = "1.0.27", i2 !== document.documentElement && i2 !== document.body || (i2 = window), this.options = { wrapper: i2, content: r2, wheelEventsTarget: l, eventsTarget: h, smoothWheel: a, smoothTouch: c, syncTouch: u, syncTouchLerp: p, __iosNoInertiaSyncTouchLerp: d, touchInertiaMultiplier: m, duration: g, easing: v, lerp: S, infinite: w, gestureOrientation: y, orientation: f, touchMultiplier: T, wheelMultiplier: z, normalizeWheel: M, autoResize: L }, this.animate = new e(), this.emitter = new o(), this.dimensions = new s({ wrapper: i2, content: r2, autoResize: L }), this.toggleClass("lenis", true), this.velocity = 0, this.isLocked = false, this.isStopped = false, this.isSmooth = u || a || c, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onScroll, { passive: false }), this.virtualScroll = new n(h, { touchMultiplier: T, wheelMultiplier: z, normalizeWheel: M }), this.virtualScroll.on("scroll", this.onVirtualScroll);
    }
    destroy() {
      this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onScroll, { passive: false }), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClass("lenis", false), this.toggleClass("lenis-smooth", false), this.toggleClass("lenis-scrolling", false), this.toggleClass("lenis-stopped", false), this.toggleClass("lenis-locked", false);
    }
    on(t2, i2) {
      return this.emitter.on(t2, i2);
    }
    off(t2, i2) {
      return this.emitter.off(t2, i2);
    }
    setScroll(t2) {
      this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
    }
    resize() {
      this.dimensions.resize();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    reset() {
      this.isLocked = false, this.isScrolling = false, this.velocity = 0, this.animate.stop();
    }
    start() {
      this.isStopped = false, this.reset();
    }
    stop() {
      this.isStopped = true, this.animate.stop(), this.reset();
    }
    raf(t2) {
      const i2 = t2 - (this.time || t2);
      this.time = t2, this.animate.advance(1e-3 * i2);
    }
    scrollTo(t2, { offset: e2 = 0, immediate: s2 = false, lock: o2 = false, duration: n2 = this.options.duration, easing: r2 = this.options.easing, lerp: l = !n2 && this.options.lerp, onComplete: h = null, force: a = false, programmatic: c = true } = {}) {
      if (!this.isStopped && !this.isLocked || a) {
        if (["top", "left", "start"].includes(t2))
          t2 = 0;
        else if (["bottom", "right", "end"].includes(t2))
          t2 = this.limit;
        else {
          var u;
          let i2;
          if ("string" == typeof t2 ? i2 = document.querySelector(t2) : null != (u = t2) && u.nodeType && (i2 = t2), i2) {
            if (this.options.wrapper !== window) {
              const t3 = this.options.wrapper.getBoundingClientRect();
              e2 -= this.isHorizontal ? t3.left : t3.top;
            }
            const s3 = i2.getBoundingClientRect();
            t2 = (this.isHorizontal ? s3.left : s3.top) + this.animatedScroll;
          }
        }
        if ("number" == typeof t2) {
          if (t2 += e2, t2 = Math.round(t2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = i(0, t2, this.limit), s2)
            return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), void (null == h || h(this));
          if (!c) {
            if (t2 === this.targetScroll)
              return;
            this.targetScroll = t2;
          }
          this.animate.fromTo(this.animatedScroll, t2, { duration: n2, easing: r2, lerp: l, onStart: () => {
            o2 && (this.isLocked = true), this.isScrolling = true;
          }, onUpdate: (t3, i2) => {
            this.isScrolling = true, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c && (this.targetScroll = t3), i2 || this.emit(), i2 && requestAnimationFrame(() => {
              this.reset(), this.emit(), null == h || h(this);
            });
          } });
        }
      }
    }
    get rootElement() {
      return this.options.wrapper === window ? this.options.content : this.options.wrapper;
    }
    get limit() {
      return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
    get isHorizontal() {
      return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
      return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
    }
    get scroll() {
      return this.options.infinite ? (this.animatedScroll % (t2 = this.limit) + t2) % t2 : this.animatedScroll;
      var t2;
    }
    get progress() {
      return 0 === this.limit ? 1 : this.scroll / this.limit;
    }
    get isSmooth() {
      return this.__isSmooth;
    }
    set isSmooth(t2) {
      this.__isSmooth !== t2 && (this.__isSmooth = t2, this.toggleClass("lenis-smooth", t2));
    }
    get isScrolling() {
      return this.__isScrolling;
    }
    set isScrolling(t2) {
      this.__isScrolling !== t2 && (this.__isScrolling = t2, this.toggleClass("lenis-scrolling", t2));
    }
    get isStopped() {
      return this.__isStopped;
    }
    set isStopped(t2) {
      this.__isStopped !== t2 && (this.__isStopped = t2, this.toggleClass("lenis-stopped", t2));
    }
    get isLocked() {
      return this.__isLocked;
    }
    set isLocked(t2) {
      this.__isLocked !== t2 && (this.__isLocked = t2, this.toggleClass("lenis-locked", t2));
    }
    get className() {
      let t2 = "lenis";
      return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), this.isSmooth && (t2 += " lenis-smooth"), t2;
    }
    toggleClass(t2, i2) {
      this.rootElement.classList.toggle(t2, i2), this.emitter.emit("className change", this);
    }
  };

  // src/util/easings.js
  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  // src/modules/scroll.js
  var Scroll = class extends r {
    constructor() {
      super({
        lerp: 0.1,
        infinite: true,
        orientation: "horizontal",
        gestureOrientation: "both",
        normalizeWheel: false,
        smoothTouch: false
        // smoothWheel: false,
      });
      this.isActive = true;
      this.callbacks = [];
      this.init();
      window.sscroll = this;
    }
    init() {
      this.y = window.scrollX;
      this.max = window.innerHeight;
      this.speed = 0;
      this.percent = this.y / (document.body.scrollHeight - window.innerHeight);
      this.on("scroll", ({ scroll, limit, velocity, progress }) => {
        this.y = scroll || 0;
        this.speed = velocity || 0;
        this.percent = progress || 0;
        this.callbackRaf();
      });
    }
    to(target) {
      this.scrollTo(target, {
        offset: 0,
        duration: 0.8,
        easing: easeOutExpo,
        immediate: false
      });
    }
    resize() {
    }
    render(t2) {
      if (!this.isActive)
        return;
      this.raf(t2);
    }
    set active(value) {
      this.isActive = value;
    }
    callbackRaf() {
      this.callbacks.forEach((cb) => cb());
    }
    subscribe(callback) {
      this.callbacks.push(callback);
    }
    unsubscribe(callback) {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    }
    unsunbscribeAll() {
      this.callbacks = [];
    }
    /** Lifecycle */
    onNavigateIn() {
    }
  };

  // node_modules/.pnpm/selector-set@1.1.5/node_modules/selector-set/selector-set.next.js
  function SelectorSet() {
    if (!(this instanceof SelectorSet)) {
      return new SelectorSet();
    }
    this.size = 0;
    this.uid = 0;
    this.selectors = [];
    this.selectorObjects = {};
    this.indexes = Object.create(this.indexes);
    this.activeIndexes = [];
  }
  var docElem = window.document.documentElement;
  var matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector;
  SelectorSet.prototype.matchesSelector = function(el, selector) {
    return matches.call(el, selector);
  };
  SelectorSet.prototype.querySelectorAll = function(selectors, context) {
    return context.querySelectorAll(selectors);
  };
  SelectorSet.prototype.indexes = [];
  var idRe = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
  SelectorSet.prototype.indexes.push({
    name: "ID",
    selector: function matchIdSelector(sel) {
      var m;
      if (m = sel.match(idRe)) {
        return m[0].slice(1);
      }
    },
    element: function getElementId(el) {
      if (el.id) {
        return [el.id];
      }
    }
  });
  var classRe = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
  SelectorSet.prototype.indexes.push({
    name: "CLASS",
    selector: function matchClassSelector(sel) {
      var m;
      if (m = sel.match(classRe)) {
        return m[0].slice(1);
      }
    },
    element: function getElementClassNames(el) {
      var className = el.className;
      if (className) {
        if (typeof className === "string") {
          return className.split(/\s/);
        } else if (typeof className === "object" && "baseVal" in className) {
          return className.baseVal.split(/\s/);
        }
      }
    }
  });
  var tagRe = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
  SelectorSet.prototype.indexes.push({
    name: "TAG",
    selector: function matchTagSelector(sel) {
      var m;
      if (m = sel.match(tagRe)) {
        return m[0].toUpperCase();
      }
    },
    element: function getElementTagName(el) {
      return [el.nodeName.toUpperCase()];
    }
  });
  SelectorSet.prototype.indexes["default"] = {
    name: "UNIVERSAL",
    selector: function() {
      return true;
    },
    element: function() {
      return [true];
    }
  };
  var Map2;
  if (typeof window.Map === "function") {
    Map2 = window.Map;
  } else {
    Map2 = function() {
      function Map3() {
        this.map = {};
      }
      Map3.prototype.get = function(key) {
        return this.map[key + " "];
      };
      Map3.prototype.set = function(key, value) {
        this.map[key + " "] = value;
      };
      return Map3;
    }();
  }
  var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
  function parseSelectorIndexes(allIndexes, selector) {
    allIndexes = allIndexes.slice(0).concat(allIndexes["default"]);
    var allIndexesLen = allIndexes.length, i2, j, m, dup, rest = selector, key, index, indexes = [];
    do {
      chunker.exec("");
      if (m = chunker.exec(rest)) {
        rest = m[3];
        if (m[2] || !rest) {
          for (i2 = 0; i2 < allIndexesLen; i2++) {
            index = allIndexes[i2];
            if (key = index.selector(m[1])) {
              j = indexes.length;
              dup = false;
              while (j--) {
                if (indexes[j].index === index && indexes[j].key === key) {
                  dup = true;
                  break;
                }
              }
              if (!dup) {
                indexes.push({ index, key });
              }
              break;
            }
          }
        }
      }
    } while (m);
    return indexes;
  }
  function findByPrototype(ary, proto) {
    var i2, len, item;
    for (i2 = 0, len = ary.length; i2 < len; i2++) {
      item = ary[i2];
      if (proto.isPrototypeOf(item)) {
        return item;
      }
    }
  }
  SelectorSet.prototype.logDefaultIndexUsed = function() {
  };
  SelectorSet.prototype.add = function(selector, data) {
    var obj, i2, indexProto, key, index, objs, selectorIndexes, selectorIndex, indexes = this.activeIndexes, selectors = this.selectors, selectorObjects = this.selectorObjects;
    if (typeof selector !== "string") {
      return;
    }
    obj = {
      id: this.uid++,
      selector,
      data
    };
    selectorObjects[obj.id] = obj;
    selectorIndexes = parseSelectorIndexes(this.indexes, selector);
    for (i2 = 0; i2 < selectorIndexes.length; i2++) {
      selectorIndex = selectorIndexes[i2];
      key = selectorIndex.key;
      indexProto = selectorIndex.index;
      index = findByPrototype(indexes, indexProto);
      if (!index) {
        index = Object.create(indexProto);
        index.map = new Map2();
        indexes.push(index);
      }
      if (indexProto === this.indexes["default"]) {
        this.logDefaultIndexUsed(obj);
      }
      objs = index.map.get(key);
      if (!objs) {
        objs = [];
        index.map.set(key, objs);
      }
      objs.push(obj);
    }
    this.size++;
    selectors.push(selector);
  };
  SelectorSet.prototype.remove = function(selector, data) {
    if (typeof selector !== "string") {
      return;
    }
    var selectorIndexes, selectorIndex, i2, j, k, selIndex, objs, obj, indexes = this.activeIndexes, selectors = this.selectors = [], selectorObjects = this.selectorObjects, removedIds = {}, removeAll = arguments.length === 1;
    selectorIndexes = parseSelectorIndexes(this.indexes, selector);
    for (i2 = 0; i2 < selectorIndexes.length; i2++) {
      selectorIndex = selectorIndexes[i2];
      j = indexes.length;
      while (j--) {
        selIndex = indexes[j];
        if (selectorIndex.index.isPrototypeOf(selIndex)) {
          objs = selIndex.map.get(selectorIndex.key);
          if (objs) {
            k = objs.length;
            while (k--) {
              obj = objs[k];
              if (obj.selector === selector && (removeAll || obj.data === data)) {
                objs.splice(k, 1);
                removedIds[obj.id] = true;
              }
            }
          }
          break;
        }
      }
    }
    for (i2 in removedIds) {
      delete selectorObjects[i2];
      this.size--;
    }
    for (i2 in selectorObjects) {
      selectors.push(selectorObjects[i2].selector);
    }
  };
  function sortById(a, b) {
    return a.id - b.id;
  }
  SelectorSet.prototype.queryAll = function(context) {
    if (!this.selectors.length) {
      return [];
    }
    var matches2 = {}, results = [];
    var els = this.querySelectorAll(this.selectors.join(", "), context);
    var i2, j, len, len2, el, m, match, obj;
    for (i2 = 0, len = els.length; i2 < len; i2++) {
      el = els[i2];
      m = this.matches(el);
      for (j = 0, len2 = m.length; j < len2; j++) {
        obj = m[j];
        if (!matches2[obj.id]) {
          match = {
            id: obj.id,
            selector: obj.selector,
            data: obj.data,
            elements: []
          };
          matches2[obj.id] = match;
          results.push(match);
        } else {
          match = matches2[obj.id];
        }
        match.elements.push(el);
      }
    }
    return results.sort(sortById);
  };
  SelectorSet.prototype.matches = function(el) {
    if (!el) {
      return [];
    }
    var i2, j, k, len, len2, len3, index, keys, objs, obj, id;
    var indexes = this.activeIndexes, matchedIds = {}, matches2 = [];
    for (i2 = 0, len = indexes.length; i2 < len; i2++) {
      index = indexes[i2];
      keys = index.element(el);
      if (keys) {
        for (j = 0, len2 = keys.length; j < len2; j++) {
          if (objs = index.map.get(keys[j])) {
            for (k = 0, len3 = objs.length; k < len3; k++) {
              obj = objs[k];
              id = obj.id;
              if (!matchedIds[id] && this.matchesSelector(el, obj.selector)) {
                matchedIds[id] = true;
                matches2.push(obj);
              }
            }
          }
        }
      }
    }
    return matches2.sort(sortById);
  };

  // node_modules/.pnpm/@unseenco+e@2.4.0/node_modules/@unseenco/e/src/utils.js
  var eventTypes = {};
  var listeners = {};
  var nonBubblers = ["mouseenter", "mouseleave", "pointerenter", "pointerleave", "blur", "focus"];
  function makeBusStack(event) {
    if (listeners[event] === void 0) {
      listeners[event] = /* @__PURE__ */ new Set();
    }
  }
  function triggerBus(event, args) {
    if (listeners[event]) {
      listeners[event].forEach((cb) => {
        cb(...args);
      });
    }
  }
  function maybeRunQuerySelector(el) {
    return typeof el === "string" ? document.querySelectorAll(el) : el;
  }
  function handleDelegation(e2) {
    let matches2 = traverse(eventTypes[e2.type], e2.target);
    if (matches2.length) {
      for (let i2 = 0; i2 < matches2.length; i2++) {
        for (let i22 = 0; i22 < matches2[i2].stack.length; i22++) {
          if (nonBubblers.indexOf(e2.type) !== -1) {
            addDelegateTarget(e2, matches2[i2].delegatedTarget);
            if (e2.target === matches2[i2].delegatedTarget) {
              matches2[i2].stack[i22].data(e2);
            }
          } else {
            addDelegateTarget(e2, matches2[i2].delegatedTarget);
            matches2[i2].stack[i22].data(e2);
          }
        }
      }
    }
  }
  function traverse(listeners2, target) {
    const queue = [];
    let node = target;
    do {
      if (node.nodeType !== 1) {
        break;
      }
      const matches2 = listeners2.matches(node);
      if (matches2.length) {
        queue.push({ delegatedTarget: node, stack: matches2 });
      }
    } while (node = node.parentElement);
    return queue;
  }
  function addDelegateTarget(event, delegatedTarget) {
    Object.defineProperty(event, "currentTarget", {
      configurable: true,
      enumerable: true,
      get: () => delegatedTarget
    });
  }
  function clone(object) {
    const copy6 = {};
    for (const key in object) {
      copy6[key] = [...object[key]];
    }
    return copy6;
  }

  // node_modules/.pnpm/@unseenco+e@2.4.0/node_modules/@unseenco/e/src/e.js
  var E = class {
    /**
     * Binds all provided methods to a provided context.
     *
     * @param {object} context
     * @param {string[]} [methods] Optional.
     */
    bindAll(context, methods) {
      if (!methods) {
        methods = Object.getOwnPropertyNames(Object.getPrototypeOf(context));
      }
      for (let i2 = 0; i2 < methods.length; i2++) {
        context[methods[i2]] = context[methods[i2]].bind(context);
      }
    }
    /**
     * Bind event to a string, NodeList, or element.
     *
     * @param {string} event
     * @param {string|NodeList|NodeListOf<Element>|HTMLElement|HTMLElement[]|Window|Document|function} el
     * @param {*} [callback]
     * @param {{}|boolean} [options]
     */
    on(event, el, callback, options) {
      const events = event.split(" ");
      for (let i2 = 0; i2 < events.length; i2++) {
        if (typeof el === "function" && callback === void 0) {
          makeBusStack(events[i2]);
          listeners[events[i2]].add(el);
          continue;
        }
        if (el.nodeType && el.nodeType === 1 || el === window || el === document) {
          el.addEventListener(events[i2], callback, options);
          continue;
        }
        el = maybeRunQuerySelector(el);
        for (let n2 = 0; n2 < el.length; n2++) {
          el[n2].addEventListener(events[i2], callback, options);
        }
      }
    }
    /**
     * Add a delegated event.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Element} delegate
     * @param {*} [callback]
     */
    delegate(event, delegate, callback) {
      const events = event.split(" ");
      for (let i2 = 0; i2 < events.length; i2++) {
        let map = eventTypes[events[i2]];
        if (map === void 0) {
          map = new SelectorSet();
          eventTypes[events[i2]] = map;
          if (nonBubblers.indexOf(events[i2]) !== -1) {
            document.addEventListener(events[i2], handleDelegation, true);
          } else {
            document.addEventListener(events[i2], handleDelegation);
          }
        }
        map.add(delegate, callback);
      }
    }
    /**
     * Remove a callback from a DOM element, or one or all Bus events.
     *
     * @param {string} event
     * @param {string|NodeList|HTMLElement|Element|Window|undefined} [el]
     * @param {*} [callback]
     * @param {{}|boolean} [options]
     */
    off(event, el, callback, options) {
      const events = event.split(" ");
      for (let i2 = 0; i2 < events.length; i2++) {
        if (el === void 0) {
          listeners[events[i2]]?.clear();
          continue;
        }
        if (typeof el === "function") {
          makeBusStack(events[i2]);
          listeners[events[i2]].delete(el);
          continue;
        }
        const map = eventTypes[events[i2]];
        if (map !== void 0) {
          map.remove(el, callback);
          if (map.size === 0) {
            delete eventTypes[events[i2]];
            if (nonBubblers.indexOf(events[i2]) !== -1) {
              document.removeEventListener(events[i2], handleDelegation, true);
            } else {
              document.removeEventListener(events[i2], handleDelegation);
            }
            continue;
          }
        }
        if (el.removeEventListener !== void 0) {
          el.removeEventListener(events[i2], callback, options);
          continue;
        }
        el = maybeRunQuerySelector(el);
        for (let n2 = 0; n2 < el.length; n2++) {
          el[n2].removeEventListener(events[i2], callback, options);
        }
      }
    }
    /**
     * Emit a Bus event.
     *
     * @param {string} event
     * @param {...*} args
     */
    emit(event, ...args) {
      triggerBus(event, args);
    }
    /**
     * Return a clone of the delegated event stack for debugging.
     *
     * @returns {Object.<string, array>}
     */
    debugDelegated() {
      return JSON.parse(JSON.stringify(eventTypes));
    }
    /**
     * Return a clone of the bus event stack for debugging.
     *
     * @returns {Object.<string, array>}
     */
    debugBus() {
      return clone(listeners);
    }
    /**
     * Checks if a given bus event has listeners.
     *
     * @param {string} event
     * @returns {boolean}
     */
    hasBus(event) {
      return this.debugBus().hasOwnProperty(event);
    }
  };
  var instance = new E();
  var e_default = instance;

  // node_modules/.pnpm/@unseenco+taxi@1.5.1/node_modules/@unseenco/taxi/src/helpers.js
  var parser = new DOMParser();
  function parseDom(html) {
    return typeof html === "string" ? parser.parseFromString(html, "text/html") : html;
  }
  function processUrl(url) {
    const details = new URL(url, window.location.origin);
    let normalized = null;
    if (details.hash.length) {
      normalized = url.replace(details.hash, "");
    }
    return {
      hasHash: details.hash.length > 0,
      pathname: details.pathname,
      host: details.host,
      raw: url,
      href: normalized || details.href
    };
  }
  function reloadScript(node) {
    node.parentNode.replaceChild(duplicateScript(node), node);
  }
  function appendScript(node) {
    if (node.parentNode.tagName === "HEAD") {
      document.head.appendChild(duplicateScript(node));
    } else {
      document.body.appendChild(duplicateScript(node));
    }
  }
  function duplicateScript(node) {
    const replacement = document.createElement("SCRIPT");
    for (let k = 0; k < node.attributes.length; k++) {
      const attr = node.attributes[k];
      replacement.setAttribute(attr.nodeName, attr.nodeValue);
    }
    if (node.innerHTML) {
      replacement.innerHTML = node.innerHTML;
    }
    return replacement;
  }

  // node_modules/.pnpm/@unseenco+taxi@1.5.1/node_modules/@unseenco/taxi/src/Transition.js
  var Transition = class {
    /**
     * @param {{wrapper: HTMLElement}} props
     */
    constructor({ wrapper }) {
      this.wrapper = wrapper;
    }
    /**
     * @param {{ from: HTMLElement|Element, trigger: string|HTMLElement|false }} props
     * @return {Promise<void>}
     */
    leave(props) {
      return new Promise((resolve) => {
        this.onLeave({ ...props, done: resolve });
      });
    }
    /**
     * @param {{ to: HTMLElement|Element, trigger: string|HTMLElement|false }} props
     * @return {Promise<void>}
     */
    enter(props) {
      return new Promise((resolve) => {
        this.onEnter({ ...props, done: resolve });
      });
    }
    /**
     * Handle the transition leaving the previous page.
     * @param {{from: HTMLElement|Element, trigger: string|HTMLElement|false, done: function}} props
     */
    onLeave({ from, trigger, done }) {
      done();
    }
    /**
     * Handle the transition entering the next page.
     * @param {{to: HTMLElement|Element, trigger: string|HTMLElement|false, done: function}} props
     */
    onEnter({ to, trigger, done }) {
      done();
    }
  };

  // node_modules/.pnpm/@unseenco+taxi@1.5.1/node_modules/@unseenco/taxi/src/Renderer.js
  var Renderer = class {
    /**
     * @param {{content: HTMLElement|Element, page: Document|Node, title: string, wrapper: Element}} props
     */
    constructor({ content, page, title, wrapper }) {
      this._contentString = content.outerHTML;
      this._DOM = null;
      this.page = page;
      this.title = title;
      this.wrapper = wrapper;
      this.content = this.wrapper.lastElementChild;
    }
    onEnter() {
    }
    onEnterCompleted() {
    }
    onLeave() {
    }
    onLeaveCompleted() {
    }
    initialLoad() {
      this.onEnter();
      this.onEnterCompleted();
    }
    update() {
      document.title = this.title;
      this.wrapper.appendChild(this._DOM.firstElementChild);
      this.content = this.wrapper.lastElementChild;
      this._DOM = null;
    }
    createDom() {
      if (!this._DOM) {
        this._DOM = document.createElement("div");
        this._DOM.innerHTML = this._contentString;
      }
    }
    remove() {
      this.wrapper.firstElementChild.remove();
    }
    /**
     * Called when transitioning into the current page.
     * @param {Transition} transition
     * @param {string|HTMLElement|false} trigger
     * @return {Promise<null>}
     */
    enter(transition, trigger) {
      return new Promise((resolve) => {
        this.onEnter();
        transition.enter({ trigger, to: this.content }).then(() => {
          this.onEnterCompleted();
          resolve();
        });
      });
    }
    /**
     * Called when transitioning away from the current page.
     * @param {Transition} transition
     * @param {string|HTMLElement|false} trigger
     * @param {boolean} removeOldContent
     * @return {Promise<null>}
     */
    leave(transition, trigger, removeOldContent) {
      return new Promise((resolve) => {
        this.onLeave();
        transition.leave({ trigger, from: this.content }).then(() => {
          if (removeOldContent) {
            this.remove();
          }
          this.onLeaveCompleted();
          resolve();
        });
      });
    }
  };

  // node_modules/.pnpm/@unseenco+taxi@1.5.1/node_modules/@unseenco/taxi/src/RouteStore.js
  var RouteStore = class {
    /**
     * @type {Map<string, Map<string, string>>}
     */
    data = /* @__PURE__ */ new Map();
    /**
     * @type {Map<string, RegExp>}
     */
    regexCache = /* @__PURE__ */ new Map();
    /**
     *
     * @param {string} fromPattern
     * @param {string} toPattern
     * @param {string} transition
     */
    add(fromPattern, toPattern, transition) {
      if (!this.data.has(fromPattern)) {
        this.data.set(fromPattern, /* @__PURE__ */ new Map());
        this.regexCache.set(fromPattern, new RegExp(`^${fromPattern}$`));
      }
      this.data.get(fromPattern).set(toPattern, transition);
      this.regexCache.set(toPattern, new RegExp(`^${toPattern}$`));
    }
    /**
     *
     * @param {{ raw: string, href: string, hasHash: boolean, pathname: string }} currentUrl
     * @param {{ raw: string, href: string, hasHash: boolean, pathname: string }} nextUrl
     * @return {string|null}
     */
    findMatch(currentUrl, nextUrl) {
      for (const [fromPattern, potentialMatches] of this.data) {
        if (currentUrl.pathname.match(this.regexCache.get(fromPattern))) {
          for (const [toPattern, transition] of potentialMatches) {
            if (nextUrl.pathname.match(this.regexCache.get(toPattern))) {
              return transition;
            }
          }
          break;
        }
      }
      return null;
    }
  };

  // node_modules/.pnpm/@unseenco+taxi@1.5.1/node_modules/@unseenco/taxi/src/Core.js
  var IN_PROGRESS = "A transition is currently in progress";
  var Core = class {
    isTransitioning = false;
    /**
     * @type {CacheEntry|null}
     */
    currentCacheEntry = null;
    /**
     * @type {Map<string, CacheEntry>}
     */
    cache = /* @__PURE__ */ new Map();
    /**
     * @private
     * @type {Map<string, Promise>}
     */
    activePromises = /* @__PURE__ */ new Map();
    /**
     * @param {{
     * 		links?: string,
     * 		removeOldContent?: boolean,
     * 		allowInterruption?: boolean,
     * 		bypassCache?: boolean,
     * 		enablePrefetch?: boolean,
     * 		renderers?: Object.<string, typeof Renderer>,
     * 		transitions?: Object.<string, typeof Transition>,
     * 		reloadJsFilter?: boolean|function(HTMLElement): boolean,
     * 		reloadCssFilter?: boolean|function(HTMLLinkElement): boolean
     * }} parameters
     */
    constructor(parameters = {}) {
      const {
        links = "a:not([target]):not([href^=\\#]):not([data-taxi-ignore])",
        removeOldContent = true,
        allowInterruption = false,
        bypassCache = false,
        enablePrefetch = true,
        renderers = {
          default: Renderer
        },
        transitions = {
          default: Transition
        },
        reloadJsFilter = (element) => element.dataset.taxiReload !== void 0,
        reloadCssFilter = (element) => true
        //element.dataset.taxiReload !== undefined
      } = parameters;
      this.renderers = renderers;
      this.transitions = transitions;
      this.defaultRenderer = this.renderers.default || Renderer;
      this.defaultTransition = this.transitions.default || Transition;
      this.wrapper = document.querySelector("[data-taxi]");
      this.reloadJsFilter = reloadJsFilter;
      this.reloadCssFilter = reloadCssFilter;
      this.removeOldContent = removeOldContent;
      this.allowInterruption = allowInterruption;
      this.bypassCache = bypassCache;
      this.enablePrefetch = enablePrefetch;
      this.cache = /* @__PURE__ */ new Map();
      this.isPopping = false;
      this.attachEvents(links);
      this.currentLocation = processUrl(window.location.href);
      this.cache.set(this.currentLocation.href, this.createCacheEntry(document.cloneNode(true), window.location.href));
      this.currentCacheEntry = this.cache.get(this.currentLocation.href);
      this.currentCacheEntry.renderer.initialLoad();
    }
    /**
     * @param {string} renderer
     */
    setDefaultRenderer(renderer) {
      this.defaultRenderer = this.renderers[renderer];
    }
    /**
     * @param {string} transition
     */
    setDefaultTransition(transition) {
      this.defaultTransition = this.transitions[transition];
    }
    /**
     * Registers a route into the RouteStore
     *
     * @param {string} fromPattern
     * @param {string} toPattern
     * @param {string} transition
     */
    addRoute(fromPattern, toPattern, transition) {
      if (!this.router) {
        this.router = new RouteStore();
      }
      this.router.add(fromPattern, toPattern, transition);
    }
    /**
     * Prime the cache for a given URL
     *
     * @param {string} url
     * @param {boolean} [preloadAssets]
     * @return {Promise}
     */
    preload(url, preloadAssets = false) {
      url = processUrl(url).href;
      if (!this.cache.has(url)) {
        return this.fetch(url, false).then(async (response) => {
          this.cache.set(url, this.createCacheEntry(response.html, response.url));
          if (preloadAssets) {
            this.cache.get(url).renderer.createDom();
          }
        });
      }
      return Promise.resolve();
    }
    /**
     * Updates the HTML cache for a given URL.
     * If no URL is passed, then cache for the current page is updated.
     * Useful when adding/removing content via AJAX such as a search page or infinite loader.
     *
     * @param {string} [url]
     */
    updateCache(url) {
      const key = processUrl(url || window.location.href).href;
      if (this.cache.has(key)) {
        this.cache.delete(key);
      }
      this.cache.set(key, this.createCacheEntry(document.cloneNode(true), key));
    }
    /**
     * Clears the cache for a given URL.
     * If no URL is passed, then cache for the current page is cleared.
     *
     * @param {string} [url]
     */
    clearCache(url) {
      const key = processUrl(url || window.location.href).href;
      if (this.cache.has(key)) {
        this.cache.delete(key);
      }
    }
    /**
     * @param {string} url
     * @param {string|false} [transition]
     * @param {string|false|HTMLElement} [trigger]
     * @return {Promise<void|Error>}
     */
    navigateTo(url, transition = false, trigger = false) {
      return new Promise((resolve, reject) => {
        if (!this.allowInterruption && this.isTransitioning) {
          reject(new Error(IN_PROGRESS));
          return;
        }
        this.isTransitioning = true;
        this.isPopping = true;
        this.targetLocation = processUrl(url);
        this.popTarget = window.location.href;
        const TransitionClass = new (this.chooseTransition(transition))({ wrapper: this.wrapper });
        let navigationPromise;
        if (this.bypassCache || !this.cache.has(this.targetLocation.href) || this.cache.get(this.targetLocation.href).skipCache) {
          const fetched = this.fetch(this.targetLocation.href).then((response) => {
            this.cache.set(this.targetLocation.href, this.createCacheEntry(response.html, response.url));
            this.cache.get(this.targetLocation.href).renderer.createDom();
          });
          navigationPromise = this.beforeFetch(this.targetLocation, TransitionClass, trigger).then(async () => {
            return fetched.then(async () => {
              return await this.afterFetch(this.targetLocation, TransitionClass, this.cache.get(this.targetLocation.href), trigger);
            });
          });
        } else {
          this.cache.get(this.targetLocation.href).renderer.createDom();
          navigationPromise = this.beforeFetch(this.targetLocation, TransitionClass, trigger).then(async () => {
            return await this.afterFetch(this.targetLocation, TransitionClass, this.cache.get(this.targetLocation.href), trigger);
          });
        }
        navigationPromise.then(() => {
          resolve();
        });
      });
    }
    /**
     * Add an event listener.
     * @param {string} event
     * @param {any} callback
     */
    on(event, callback) {
      e_default.on(event, callback);
    }
    /**
     * Remove an event listener.
     * @param {string} event
     * @param {any} [callback]
     */
    off(event, callback) {
      e_default.off(event, callback);
    }
    /**
     * @private
     * @param {{ raw: string, href: string, hasHash: boolean, pathname: string }} url
     * @param {Transition} TransitionClass
     * @param {string|HTMLElement|false} trigger
     * @return {Promise<void>}
     */
    beforeFetch(url, TransitionClass, trigger) {
      e_default.emit("NAVIGATE_OUT", {
        from: this.currentCacheEntry,
        trigger
      });
      return new Promise((resolve) => {
        this.currentCacheEntry.renderer.leave(TransitionClass, trigger, this.removeOldContent).then(() => {
          if (trigger !== "popstate") {
            window.history.pushState({}, "", url.raw);
          }
          resolve();
        });
      });
    }
    /**
     * @private
     * @param {{ raw: string, href: string, host: string, hasHash: boolean, pathname: string }} url
     * @param {Transition} TransitionClass
     * @param {CacheEntry} entry
     * @param {string|HTMLElement|false} trigger
     * @return {Promise<void>}
     */
    afterFetch(url, TransitionClass, entry, trigger) {
      this.currentLocation = url;
      this.popTarget = this.currentLocation.href;
      return new Promise((resolve) => {
        entry.renderer.update();
        e_default.emit("NAVIGATE_IN", {
          from: this.currentCacheEntry,
          to: entry,
          trigger
        });
        if (this.reloadJsFilter) {
          this.loadScripts(entry.scripts);
        }
        if (this.reloadCssFilter) {
          this.loadStyles(entry.styles);
        }
        if (trigger !== "popstate" && url.href !== entry.finalUrl) {
          window.history.replaceState({}, "", entry.finalUrl);
        }
        entry.renderer.enter(TransitionClass, trigger).then(() => {
          e_default.emit("NAVIGATE_END", {
            from: this.currentCacheEntry,
            to: entry,
            trigger
          });
          this.currentCacheEntry = entry;
          this.isTransitioning = false;
          this.isPopping = false;
          resolve();
        });
      });
    }
    /**
     * Load up scripts from the target page if needed
     *
     * @param {HTMLElement[]} cachedScripts
     */
    loadScripts(cachedScripts) {
      const newScripts = [...cachedScripts];
      const currentScripts = Array.from(document.querySelectorAll("script")).filter(this.reloadJsFilter);
      for (let i2 = 0; i2 < currentScripts.length; i2++) {
        for (let n2 = 0; n2 < newScripts.length; n2++) {
          if (currentScripts[i2].outerHTML === newScripts[n2].outerHTML) {
            reloadScript(currentScripts[i2]);
            newScripts.splice(n2, 1);
            break;
          }
        }
      }
      for (const script of newScripts) {
        appendScript(script);
      }
    }
    /**
     * Load up styles from the target page if needed
     *
     * @param {HTMLLinkElement[]} cachedStyles
     */
    loadStyles(cachedStyles) {
      const currentStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter(this.reloadCssFilter);
      cachedStyles.forEach((el) => {
        if (el.href && !currentStyles.find((link) => link.href === el.href)) {
          document.body.append(el);
        }
      });
    }
    /**
     * @private
     * @param {string} links
     */
    attachEvents(links) {
      e_default.delegate("click", links, this.onClick);
      e_default.on("popstate", window, this.onPopstate);
      if (this.enablePrefetch) {
        e_default.delegate("mouseenter focus", links, this.onPrefetch);
      }
    }
    /**
     * @private
     * @param {MouseEvent} e
     */
    onClick = (e2) => {
      if (!(e2.metaKey || e2.ctrlKey)) {
        const target = processUrl(e2.currentTarget.href);
        this.currentLocation = processUrl(window.location.href);
        if (this.currentLocation.host !== target.host) {
          return;
        }
        if (this.currentLocation.href !== target.href || this.currentLocation.hasHash && !target.hasHash) {
          e2.preventDefault();
          this.navigateTo(target.raw, e2.currentTarget.dataset.transition || false, e2.currentTarget).catch((err) => console.warn(err));
          return;
        }
        if (!this.currentLocation.hasHash && !target.hasHash) {
          e2.preventDefault();
        }
      }
    };
    /**
     * @private
     * @return {void|boolean}
     */
    onPopstate = () => {
      if (window.location.pathname === this.currentLocation.pathname && !this.isPopping) {
        return false;
      }
      if (!this.allowInterruption && (this.isTransitioning || this.isPopping)) {
        window.history.pushState({}, "", this.popTarget);
        console.warn(IN_PROGRESS);
        return false;
      }
      if (!this.isPopping) {
        this.popTarget = window.location.href;
      }
      this.isPopping = true;
      this.navigateTo(window.location.href, false, "popstate");
    };
    /**
     * @private
     * @param {MouseEvent} e
     */
    onPrefetch = (e2) => {
      const target = processUrl(e2.currentTarget.href);
      if (this.currentLocation.host !== target.host) {
        return;
      }
      this.preload(e2.currentTarget.href, false);
    };
    /**
     * @private
     * @param {string} url
     * @param {boolean} [runFallback]
     * @return {Promise<{html: Document, url: string}>}
     */
    fetch(url, runFallback = true) {
      if (this.activePromises.has(url)) {
        return this.activePromises.get(url);
      }
      const request = new Promise((resolve, reject) => {
        let resolvedUrl;
        fetch(url, {
          mode: "same-origin",
          method: "GET",
          headers: { "X-Requested-With": "Taxi" },
          credentials: "same-origin"
        }).then((response) => {
          if (!response.ok) {
            reject("Taxi encountered a non 2xx HTTP status code");
            if (runFallback) {
              window.location.href = url;
            }
          }
          resolvedUrl = response.url;
          return response.text();
        }).then((htmlString) => {
          resolve({ html: parseDom(htmlString), url: resolvedUrl });
        }).catch((err) => {
          reject(err);
          if (runFallback) {
            window.location.href = url;
          }
        }).finally(() => {
          this.activePromises.delete(url);
        });
      });
      this.activePromises.set(url, request);
      return request;
    }
    /**
     * @private
     * @param {string|false} transition
     * @return {Transition|function}
     */
    chooseTransition(transition) {
      if (transition) {
        return this.transitions[transition];
      }
      const routeTransition = this.router?.findMatch(this.currentLocation, this.targetLocation);
      if (routeTransition) {
        return this.transitions[routeTransition];
      }
      return this.defaultTransition;
    }
    /**
     * @private
     * @param {Document|Node} page
     * @param {string} url
     * @return {CacheEntry}
     */
    createCacheEntry(page, url) {
      const content = page.querySelector("[data-taxi-view]");
      const Renderer3 = content.dataset.taxiView.length ? this.renderers[content.dataset.taxiView] : this.defaultRenderer;
      if (!Renderer3) {
        console.warn(`The Renderer "${content.dataset.taxiView}" was set in the data-taxi-view of the requested page, but not registered in Taxi.`);
      }
      return {
        page,
        content,
        finalUrl: url,
        skipCache: content.hasAttribute("data-taxi-nocache"),
        scripts: this.reloadJsFilter ? Array.from(page.querySelectorAll("script")).filter(this.reloadJsFilter) : [],
        styles: this.reloadCssFilter ? Array.from(page.querySelectorAll('link[rel="stylesheet"]')).filter(this.reloadCssFilter) : [],
        title: page.title,
        renderer: new Renderer3({
          wrapper: this.wrapper,
          title: page.title,
          content,
          page
        })
      };
    }
  };

  // src/modules/pages.js
  var Pages = class extends Core {
    constructor() {
      super({
        links: "a:not([target]):not([href^=\\#]):not([data-taxi-ignore])",
        removeOldContent: true,
        allowInterruption: false,
        bypassCache: false,
        transitions: {
          default: Tra
        }
      });
      window.router = this;
    }
    useProps() {
      this.props = {
        from: getPath(window.location.href),
        to: null
      };
      this.on("NAVIGATE_OUT", ({ trigger }) => {
        if (trigger === "popstate") {
          this.props.to = getPath(location.href);
        } else {
          this.props.to = getPath(trigger.href);
        }
      });
    }
    async transitionOut(page) {
      await Promise.allSettled([
        window.app.dom.transitionOut(page)
        // window.app.gl.transitionOut(page),
      ]);
      return Promise.resolve();
    }
    async transitionIn(page) {
      await Promise.allSettled([
        window.app.dom.transitionIn(page)
        // window.app.gl.transitionIn(page),
      ]);
      return Promise.resolve();
    }
  };
  function getPath(url) {
    const fullUrl = new URL(url);
    const splitPath = fullUrl.pathname.split("/");
    const [, second, third] = splitPath;
    return [second, third];
  }
  var Tra = class {
    constructor({ wrapper }) {
      this.wrapper = wrapper;
    }
    leave(props) {
      return new Promise((resolve) => {
        this.onLeave({ ...props, done: resolve });
      });
    }
    enter(props) {
      return new Promise((resolve) => {
        this.onEnter({ ...props, done: resolve });
      });
    }
    onLeave({ from, trigger, done }) {
      window.app.pages.transitionOut(from).then(() => done());
    }
    onEnter({ to, trigger, done }) {
      window.app.pages.transitionIn(to).then(() => done());
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/functions/Vec3Func.js
  function length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  function set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  function distance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
  }
  function squaredDistance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  function squaredLength(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return x * x + y * y + z * z;
  }
  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  function inverse(out, a) {
    out[0] = 1 / a[0];
    out[1] = 1 / a[1];
    out[2] = 1 / a[2];
    return out;
  }
  function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    let ax = a[0], ay = a[1], az = a[2];
    let bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  function lerp(out, a, b, t2) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    out[0] = ax + t2 * (b[0] - ax);
    out[1] = ay + t2 * (b[1] - ay);
    out[2] = az + t2 * (b[2] - az);
    return out;
  }
  function transformMat4(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  function scaleRotateMat4(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
    return out;
  }
  function transformMat3(out, a, m) {
    let x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  function transformQuat(out, a, q) {
    let x = a[0], y = a[1], z = a[2];
    let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    let uvx = qy * z - qz * y;
    let uvy = qz * x - qx * z;
    let uvz = qx * y - qy * x;
    let uuvx = qy * uvz - qz * uvy;
    let uuvy = qz * uvx - qx * uvz;
    let uuvz = qx * uvy - qy * uvx;
    let w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  var angle = /* @__PURE__ */ function() {
    const tempA = [0, 0, 0];
    const tempB = [0, 0, 0];
    return function(a, b) {
      copy(tempA, a);
      copy(tempB, b);
      normalize(tempA, tempA);
      normalize(tempB, tempB);
      let cosine = dot(tempA, tempB);
      if (cosine > 1) {
        return 0;
      } else if (cosine < -1) {
        return Math.PI;
      } else {
        return Math.acos(cosine);
      }
    };
  }();
  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/Vec3.js
  var Vec3 = class _Vec3 extends Array {
    constructor(x = 0, y = x, z = x) {
      super(x, y, z);
      return this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    set x(v) {
      this[0] = v;
    }
    set y(v) {
      this[1] = v;
    }
    set z(v) {
      this[2] = v;
    }
    set(x, y = x, z = x) {
      if (x.length)
        return this.copy(x);
      set(this, x, y, z);
      return this;
    }
    copy(v) {
      copy(this, v);
      return this;
    }
    add(va, vb) {
      if (vb)
        add(this, va, vb);
      else
        add(this, this, va);
      return this;
    }
    sub(va, vb) {
      if (vb)
        subtract(this, va, vb);
      else
        subtract(this, this, va);
      return this;
    }
    multiply(v) {
      if (v.length)
        multiply(this, this, v);
      else
        scale(this, this, v);
      return this;
    }
    divide(v) {
      if (v.length)
        divide(this, this, v);
      else
        scale(this, this, 1 / v);
      return this;
    }
    inverse(v = this) {
      inverse(this, v);
      return this;
    }
    // Can't use 'length' as Array.prototype uses it
    len() {
      return length(this);
    }
    distance(v) {
      if (v)
        return distance(this, v);
      else
        return length(this);
    }
    squaredLen() {
      return squaredLength(this);
    }
    squaredDistance(v) {
      if (v)
        return squaredDistance(this, v);
      else
        return squaredLength(this);
    }
    negate(v = this) {
      negate(this, v);
      return this;
    }
    cross(va, vb) {
      if (vb)
        cross(this, va, vb);
      else
        cross(this, this, va);
      return this;
    }
    scale(v) {
      scale(this, this, v);
      return this;
    }
    normalize() {
      normalize(this, this);
      return this;
    }
    dot(v) {
      return dot(this, v);
    }
    equals(v) {
      return exactEquals(this, v);
    }
    applyMatrix3(mat3) {
      transformMat3(this, this, mat3);
      return this;
    }
    applyMatrix4(mat4) {
      transformMat4(this, this, mat4);
      return this;
    }
    scaleRotateMatrix4(mat4) {
      scaleRotateMat4(this, this, mat4);
      return this;
    }
    applyQuaternion(q) {
      transformQuat(this, this, q);
      return this;
    }
    angle(v) {
      return angle(this, v);
    }
    lerp(v, t2) {
      lerp(this, this, v, t2);
      return this;
    }
    clone() {
      return new _Vec3(this[0], this[1], this[2]);
    }
    fromArray(a, o2 = 0) {
      this[0] = a[o2];
      this[1] = a[o2 + 1];
      this[2] = a[o2 + 2];
      return this;
    }
    toArray(a = [], o2 = 0) {
      a[o2] = this[0];
      a[o2 + 1] = this[1];
      a[o2 + 2] = this[2];
      return a;
    }
    transformDirection(mat4) {
      const x = this[0];
      const y = this[1];
      const z = this[2];
      this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
      this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
      this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;
      return this.normalize();
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/core/Geometry.js
  var tempVec3 = /* @__PURE__ */ new Vec3();
  var ID = 1;
  var ATTR_ID = 1;
  var isBoundsWarned = false;
  var Geometry = class {
    constructor(gl, attributes = {}) {
      if (!gl.canvas)
        console.error("gl not passed as first argument to Geometry");
      this.gl = gl;
      this.attributes = attributes;
      this.id = ID++;
      this.VAOs = {};
      this.drawRange = { start: 0, count: 0 };
      this.instancedCount = 0;
      this.gl.renderer.bindVertexArray(null);
      this.gl.renderer.currentGeometry = null;
      this.glState = this.gl.renderer.state;
      for (let key in attributes) {
        this.addAttribute(key, attributes[key]);
      }
    }
    addAttribute(key, attr) {
      this.attributes[key] = attr;
      attr.id = ATTR_ID++;
      attr.size = attr.size || 1;
      attr.type = attr.type || (attr.data.constructor === Float32Array ? this.gl.FLOAT : attr.data.constructor === Uint16Array ? this.gl.UNSIGNED_SHORT : this.gl.UNSIGNED_INT);
      attr.target = key === "index" ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
      attr.normalized = attr.normalized || false;
      attr.stride = attr.stride || 0;
      attr.offset = attr.offset || 0;
      attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
      attr.divisor = attr.instanced || 0;
      attr.needsUpdate = false;
      attr.usage = attr.usage || this.gl.STATIC_DRAW;
      if (!attr.buffer) {
        this.updateAttribute(attr);
      }
      if (attr.divisor) {
        this.isInstanced = true;
        if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
          console.warn("geometry has multiple instanced buffers of different length");
          return this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor);
        }
        this.instancedCount = attr.count * attr.divisor;
      } else if (key === "index") {
        this.drawRange.count = attr.count;
      } else if (!this.attributes.index) {
        this.drawRange.count = Math.max(this.drawRange.count, attr.count);
      }
    }
    updateAttribute(attr) {
      const isNewBuffer = !attr.buffer;
      if (isNewBuffer)
        attr.buffer = this.gl.createBuffer();
      if (this.glState.boundBuffer !== attr.buffer) {
        this.gl.bindBuffer(attr.target, attr.buffer);
        this.glState.boundBuffer = attr.buffer;
      }
      if (isNewBuffer) {
        this.gl.bufferData(attr.target, attr.data, attr.usage);
      } else {
        this.gl.bufferSubData(attr.target, 0, attr.data);
      }
      attr.needsUpdate = false;
    }
    setIndex(value) {
      this.addAttribute("index", value);
    }
    setDrawRange(start, count) {
      this.drawRange.start = start;
      this.drawRange.count = count;
    }
    setInstancedCount(value) {
      this.instancedCount = value;
    }
    createVAO(program) {
      this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
      this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
      this.bindAttributes(program);
    }
    bindAttributes(program) {
      program.attributeLocations.forEach((location2, { name, type }) => {
        if (!this.attributes[name]) {
          console.warn(`active attribute ${name} not being supplied`);
          return;
        }
        const attr = this.attributes[name];
        this.gl.bindBuffer(attr.target, attr.buffer);
        this.glState.boundBuffer = attr.buffer;
        let numLoc = 1;
        if (type === 35674)
          numLoc = 2;
        if (type === 35675)
          numLoc = 3;
        if (type === 35676)
          numLoc = 4;
        const size = attr.size / numLoc;
        const stride = numLoc === 1 ? 0 : numLoc * numLoc * 4;
        const offset = numLoc === 1 ? 0 : numLoc * 4;
        for (let i2 = 0; i2 < numLoc; i2++) {
          this.gl.vertexAttribPointer(location2 + i2, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i2 * offset);
          this.gl.enableVertexAttribArray(location2 + i2);
          this.gl.renderer.vertexAttribDivisor(location2 + i2, attr.divisor);
        }
      });
      if (this.attributes.index)
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }
    draw({ program, mode = this.gl.TRIANGLES }) {
      if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
        if (!this.VAOs[program.attributeOrder])
          this.createVAO(program);
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
      }
      program.attributeLocations.forEach((location2, { name }) => {
        const attr = this.attributes[name];
        if (attr.needsUpdate)
          this.updateAttribute(attr);
      });
      let indexBytesPerElement = 2;
      if (this.attributes.index?.type === this.gl.UNSIGNED_INT)
        indexBytesPerElement = 4;
      if (this.isInstanced) {
        if (this.attributes.index) {
          this.gl.renderer.drawElementsInstanced(
            mode,
            this.drawRange.count,
            this.attributes.index.type,
            this.attributes.index.offset + this.drawRange.start * indexBytesPerElement,
            this.instancedCount
          );
        } else {
          this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
        }
      } else {
        if (this.attributes.index) {
          this.gl.drawElements(
            mode,
            this.drawRange.count,
            this.attributes.index.type,
            this.attributes.index.offset + this.drawRange.start * indexBytesPerElement
          );
        } else {
          this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
        }
      }
    }
    getPosition() {
      const attr = this.attributes.position;
      if (attr.data)
        return attr;
      if (isBoundsWarned)
        return;
      console.warn("No position buffer data found to compute bounds");
      return isBoundsWarned = true;
    }
    computeBoundingBox(attr) {
      if (!attr)
        attr = this.getPosition();
      const array = attr.data;
      const stride = attr.size;
      if (!this.bounds) {
        this.bounds = {
          min: new Vec3(),
          max: new Vec3(),
          center: new Vec3(),
          scale: new Vec3(),
          radius: Infinity
        };
      }
      const min = this.bounds.min;
      const max = this.bounds.max;
      const center = this.bounds.center;
      const scale5 = this.bounds.scale;
      min.set(Infinity);
      max.set(-Infinity);
      for (let i2 = 0, l = array.length; i2 < l; i2 += stride) {
        const x = array[i2];
        const y = array[i2 + 1];
        const z = array[i2 + 2];
        min.x = Math.min(x, min.x);
        min.y = Math.min(y, min.y);
        min.z = Math.min(z, min.z);
        max.x = Math.max(x, max.x);
        max.y = Math.max(y, max.y);
        max.z = Math.max(z, max.z);
      }
      scale5.sub(max, min);
      center.add(min, max).divide(2);
    }
    computeBoundingSphere(attr) {
      if (!attr)
        attr = this.getPosition();
      const array = attr.data;
      const stride = attr.size;
      if (!this.bounds)
        this.computeBoundingBox(attr);
      let maxRadiusSq = 0;
      for (let i2 = 0, l = array.length; i2 < l; i2 += stride) {
        tempVec3.fromArray(array, i2);
        maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(tempVec3));
      }
      this.bounds.radius = Math.sqrt(maxRadiusSq);
    }
    remove() {
      for (let key in this.VAOs) {
        this.gl.renderer.deleteVertexArray(this.VAOs[key]);
        delete this.VAOs[key];
      }
      for (let key in this.attributes) {
        this.gl.deleteBuffer(this.attributes[key].buffer);
        delete this.attributes[key];
      }
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/core/Program.js
  var ID2 = 1;
  var arrayCacheF32 = {};
  var Program = class {
    constructor(gl, {
      vertex,
      fragment,
      uniforms = {},
      transparent = false,
      cullFace = gl.BACK,
      frontFace = gl.CCW,
      depthTest = true,
      depthWrite = true,
      depthFunc = gl.LESS
    } = {}) {
      if (!gl.canvas)
        console.error("gl not passed as first argument to Program");
      this.gl = gl;
      this.uniforms = uniforms;
      this.id = ID2++;
      if (!vertex)
        console.warn("vertex shader not supplied");
      if (!fragment)
        console.warn("fragment shader not supplied");
      this.transparent = transparent;
      this.cullFace = cullFace;
      this.frontFace = frontFace;
      this.depthTest = depthTest;
      this.depthWrite = depthWrite;
      this.depthFunc = depthFunc;
      this.blendFunc = {};
      this.blendEquation = {};
      if (this.transparent && !this.blendFunc.src) {
        if (this.gl.renderer.premultipliedAlpha)
          this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
        else
          this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      }
      const vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vertex);
      gl.compileShader(vertexShader);
      if (gl.getShaderInfoLog(vertexShader) !== "") {
        console.warn(`${gl.getShaderInfoLog(vertexShader)}
Vertex Shader
${addLineNumbers(vertex)}`);
      }
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fragment);
      gl.compileShader(fragmentShader);
      if (gl.getShaderInfoLog(fragmentShader) !== "") {
        console.warn(`${gl.getShaderInfoLog(fragmentShader)}
Fragment Shader
${addLineNumbers(fragment)}`);
      }
      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        return console.warn(gl.getProgramInfoLog(this.program));
      }
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      this.uniformLocations = /* @__PURE__ */ new Map();
      let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
      for (let uIndex = 0; uIndex < numUniforms; uIndex++) {
        let uniform = gl.getActiveUniform(this.program, uIndex);
        this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name));
        const split = uniform.name.match(/(\w+)/g);
        uniform.uniformName = split[0];
        uniform.nameComponents = split.slice(1);
      }
      this.attributeLocations = /* @__PURE__ */ new Map();
      const locations = [];
      const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
      for (let aIndex = 0; aIndex < numAttribs; aIndex++) {
        const attribute = gl.getActiveAttrib(this.program, aIndex);
        const location2 = gl.getAttribLocation(this.program, attribute.name);
        if (location2 === -1)
          continue;
        locations[location2] = attribute.name;
        this.attributeLocations.set(attribute, location2);
      }
      this.attributeOrder = locations.join("");
    }
    setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      this.blendFunc.src = src;
      this.blendFunc.dst = dst;
      this.blendFunc.srcAlpha = srcAlpha;
      this.blendFunc.dstAlpha = dstAlpha;
      if (src)
        this.transparent = true;
    }
    setBlendEquation(modeRGB, modeAlpha) {
      this.blendEquation.modeRGB = modeRGB;
      this.blendEquation.modeAlpha = modeAlpha;
    }
    applyState() {
      if (this.depthTest)
        this.gl.renderer.enable(this.gl.DEPTH_TEST);
      else
        this.gl.renderer.disable(this.gl.DEPTH_TEST);
      if (this.cullFace)
        this.gl.renderer.enable(this.gl.CULL_FACE);
      else
        this.gl.renderer.disable(this.gl.CULL_FACE);
      if (this.blendFunc.src)
        this.gl.renderer.enable(this.gl.BLEND);
      else
        this.gl.renderer.disable(this.gl.BLEND);
      if (this.cullFace)
        this.gl.renderer.setCullFace(this.cullFace);
      this.gl.renderer.setFrontFace(this.frontFace);
      this.gl.renderer.setDepthMask(this.depthWrite);
      this.gl.renderer.setDepthFunc(this.depthFunc);
      if (this.blendFunc.src)
        this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
      this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }
    use({ flipFaces = false } = {}) {
      let textureUnit = -1;
      const programActive = this.gl.renderer.state.currentProgram === this.id;
      if (!programActive) {
        this.gl.useProgram(this.program);
        this.gl.renderer.state.currentProgram = this.id;
      }
      this.uniformLocations.forEach((location2, activeUniform) => {
        let uniform = this.uniforms[activeUniform.uniformName];
        for (const component of activeUniform.nameComponents) {
          if (!uniform)
            break;
          if (component in uniform) {
            uniform = uniform[component];
          } else if (Array.isArray(uniform.value)) {
            break;
          } else {
            uniform = void 0;
            break;
          }
        }
        if (!uniform) {
          return warn(`Active uniform ${activeUniform.name} has not been supplied`);
        }
        if (uniform && uniform.value === void 0) {
          return warn(`${activeUniform.name} uniform is missing a value parameter`);
        }
        if (uniform.value.texture) {
          textureUnit = textureUnit + 1;
          uniform.value.update(textureUnit);
          return setUniform(this.gl, activeUniform.type, location2, textureUnit);
        }
        if (uniform.value.length && uniform.value[0].texture) {
          const textureUnits = [];
          uniform.value.forEach((value) => {
            textureUnit = textureUnit + 1;
            value.update(textureUnit);
            textureUnits.push(textureUnit);
          });
          return setUniform(this.gl, activeUniform.type, location2, textureUnits);
        }
        setUniform(this.gl, activeUniform.type, location2, uniform.value);
      });
      this.applyState();
      if (flipFaces)
        this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }
    remove() {
      this.gl.deleteProgram(this.program);
    }
  };
  function setUniform(gl, type, location2, value) {
    value = value.length ? flatten(value) : value;
    const setValue = gl.renderer.state.uniformLocations.get(location2);
    if (value.length) {
      if (setValue === void 0 || setValue.length !== value.length) {
        gl.renderer.state.uniformLocations.set(location2, value.slice(0));
      } else {
        if (arraysEqual(setValue, value))
          return;
        setValue.set ? setValue.set(value) : setArray(setValue, value);
        gl.renderer.state.uniformLocations.set(location2, setValue);
      }
    } else {
      if (setValue === value)
        return;
      gl.renderer.state.uniformLocations.set(location2, value);
    }
    switch (type) {
      case 5126:
        return value.length ? gl.uniform1fv(location2, value) : gl.uniform1f(location2, value);
      case 35664:
        return gl.uniform2fv(location2, value);
      case 35665:
        return gl.uniform3fv(location2, value);
      case 35666:
        return gl.uniform4fv(location2, value);
      case 35670:
      case 5124:
      case 35678:
      case 35680:
        return value.length ? gl.uniform1iv(location2, value) : gl.uniform1i(location2, value);
      case 35671:
      case 35667:
        return gl.uniform2iv(location2, value);
      case 35672:
      case 35668:
        return gl.uniform3iv(location2, value);
      case 35673:
      case 35669:
        return gl.uniform4iv(location2, value);
      case 35674:
        return gl.uniformMatrix2fv(location2, false, value);
      case 35675:
        return gl.uniformMatrix3fv(location2, false, value);
      case 35676:
        return gl.uniformMatrix4fv(location2, false, value);
    }
  }
  function addLineNumbers(string) {
    let lines = string.split("\n");
    for (let i2 = 0; i2 < lines.length; i2++) {
      lines[i2] = i2 + 1 + ": " + lines[i2];
    }
    return lines.join("\n");
  }
  function flatten(a) {
    const arrayLen = a.length;
    const valueLen = a[0].length;
    if (valueLen === void 0)
      return a;
    const length3 = arrayLen * valueLen;
    let value = arrayCacheF32[length3];
    if (!value)
      arrayCacheF32[length3] = value = new Float32Array(length3);
    for (let i2 = 0; i2 < arrayLen; i2++)
      value.set(a[i2], i2 * valueLen);
    return value;
  }
  function arraysEqual(a, b) {
    if (a.length !== b.length)
      return false;
    for (let i2 = 0, l = a.length; i2 < l; i2++) {
      if (a[i2] !== b[i2])
        return false;
    }
    return true;
  }
  function setArray(a, b) {
    for (let i2 = 0, l = a.length; i2 < l; i2++) {
      a[i2] = b[i2];
    }
  }
  var warnCount = 0;
  function warn(message) {
    if (warnCount > 100)
      return;
    console.warn(message);
    warnCount++;
    if (warnCount > 100)
      console.warn("More than 100 program warnings - stopping logs.");
  }

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/core/Renderer.js
  var tempVec32 = /* @__PURE__ */ new Vec3();
  var ID3 = 1;
  var Renderer2 = class {
    constructor({
      canvas = document.createElement("canvas"),
      width = 300,
      height = 150,
      dpr = 1,
      alpha = false,
      depth = true,
      stencil = false,
      antialias = false,
      premultipliedAlpha = false,
      preserveDrawingBuffer = false,
      powerPreference = "default",
      autoClear = true,
      webgl = 2
    } = {}) {
      const attributes = { alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer, powerPreference };
      this.dpr = dpr;
      this.alpha = alpha;
      this.color = true;
      this.depth = depth;
      this.stencil = stencil;
      this.premultipliedAlpha = premultipliedAlpha;
      this.autoClear = autoClear;
      this.id = ID3++;
      if (webgl === 2)
        this.gl = canvas.getContext("webgl2", attributes);
      this.isWebgl2 = !!this.gl;
      if (!this.gl)
        this.gl = canvas.getContext("webgl", attributes);
      if (!this.gl)
        console.error("unable to create webgl context");
      this.gl.renderer = this;
      this.setSize(width, height);
      this.state = {};
      this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO };
      this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD };
      this.state.cullFace = false;
      this.state.frontFace = this.gl.CCW;
      this.state.depthMask = true;
      this.state.depthFunc = this.gl.LESS;
      this.state.premultiplyAlpha = false;
      this.state.flipY = false;
      this.state.unpackAlignment = 4;
      this.state.framebuffer = null;
      this.state.viewport = { x: 0, y: 0, width: null, height: null };
      this.state.textureUnits = [];
      this.state.activeTextureUnit = 0;
      this.state.boundBuffer = null;
      this.state.uniformLocations = /* @__PURE__ */ new Map();
      this.state.currentProgram = null;
      this.extensions = {};
      if (this.isWebgl2) {
        this.getExtension("EXT_color_buffer_float");
        this.getExtension("OES_texture_float_linear");
      } else {
        this.getExtension("OES_texture_float");
        this.getExtension("OES_texture_float_linear");
        this.getExtension("OES_texture_half_float");
        this.getExtension("OES_texture_half_float_linear");
        this.getExtension("OES_element_index_uint");
        this.getExtension("OES_standard_derivatives");
        this.getExtension("EXT_sRGB");
        this.getExtension("WEBGL_depth_texture");
        this.getExtension("WEBGL_draw_buffers");
      }
      this.getExtension("WEBGL_compressed_texture_astc");
      this.getExtension("EXT_texture_compression_bptc");
      this.getExtension("WEBGL_compressed_texture_s3tc");
      this.getExtension("WEBGL_compressed_texture_etc1");
      this.getExtension("WEBGL_compressed_texture_pvrtc");
      this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
      this.vertexAttribDivisor = this.getExtension("ANGLE_instanced_arrays", "vertexAttribDivisor", "vertexAttribDivisorANGLE");
      this.drawArraysInstanced = this.getExtension("ANGLE_instanced_arrays", "drawArraysInstanced", "drawArraysInstancedANGLE");
      this.drawElementsInstanced = this.getExtension("ANGLE_instanced_arrays", "drawElementsInstanced", "drawElementsInstancedANGLE");
      this.createVertexArray = this.getExtension("OES_vertex_array_object", "createVertexArray", "createVertexArrayOES");
      this.bindVertexArray = this.getExtension("OES_vertex_array_object", "bindVertexArray", "bindVertexArrayOES");
      this.deleteVertexArray = this.getExtension("OES_vertex_array_object", "deleteVertexArray", "deleteVertexArrayOES");
      this.drawBuffers = this.getExtension("WEBGL_draw_buffers", "drawBuffers", "drawBuffersWEBGL");
      this.parameters = {};
      this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
      this.parameters.maxAnisotropy = this.getExtension("EXT_texture_filter_anisotropic") ? this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
      this.gl.canvas.width = width * this.dpr;
      this.gl.canvas.height = height * this.dpr;
      if (!this.gl.canvas.style)
        return;
      Object.assign(this.gl.canvas.style, {
        width: width + "px",
        height: height + "px"
      });
    }
    setViewport(width, height, x = 0, y = 0) {
      if (this.state.viewport.width === width && this.state.viewport.height === height)
        return;
      this.state.viewport.width = width;
      this.state.viewport.height = height;
      this.state.viewport.x = x;
      this.state.viewport.y = y;
      this.gl.viewport(x, y, width, height);
    }
    setScissor(width, height, x = 0, y = 0) {
      this.gl.scissor(x, y, width, height);
    }
    enable(id) {
      if (this.state[id] === true)
        return;
      this.gl.enable(id);
      this.state[id] = true;
    }
    disable(id) {
      if (this.state[id] === false)
        return;
      this.gl.disable(id);
      this.state[id] = false;
    }
    setBlendFunc(src, dst, srcAlpha, dstAlpha) {
      if (this.state.blendFunc.src === src && this.state.blendFunc.dst === dst && this.state.blendFunc.srcAlpha === srcAlpha && this.state.blendFunc.dstAlpha === dstAlpha)
        return;
      this.state.blendFunc.src = src;
      this.state.blendFunc.dst = dst;
      this.state.blendFunc.srcAlpha = srcAlpha;
      this.state.blendFunc.dstAlpha = dstAlpha;
      if (srcAlpha !== void 0)
        this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);
      else
        this.gl.blendFunc(src, dst);
    }
    setBlendEquation(modeRGB, modeAlpha) {
      modeRGB = modeRGB || this.gl.FUNC_ADD;
      if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha)
        return;
      this.state.blendEquation.modeRGB = modeRGB;
      this.state.blendEquation.modeAlpha = modeAlpha;
      if (modeAlpha !== void 0)
        this.gl.blendEquationSeparate(modeRGB, modeAlpha);
      else
        this.gl.blendEquation(modeRGB);
    }
    setCullFace(value) {
      if (this.state.cullFace === value)
        return;
      this.state.cullFace = value;
      this.gl.cullFace(value);
    }
    setFrontFace(value) {
      if (this.state.frontFace === value)
        return;
      this.state.frontFace = value;
      this.gl.frontFace(value);
    }
    setDepthMask(value) {
      if (this.state.depthMask === value)
        return;
      this.state.depthMask = value;
      this.gl.depthMask(value);
    }
    setDepthFunc(value) {
      if (this.state.depthFunc === value)
        return;
      this.state.depthFunc = value;
      this.gl.depthFunc(value);
    }
    activeTexture(value) {
      if (this.state.activeTextureUnit === value)
        return;
      this.state.activeTextureUnit = value;
      this.gl.activeTexture(this.gl.TEXTURE0 + value);
    }
    bindFramebuffer({ target = this.gl.FRAMEBUFFER, buffer = null } = {}) {
      if (this.state.framebuffer === buffer)
        return;
      this.state.framebuffer = buffer;
      this.gl.bindFramebuffer(target, buffer);
    }
    getExtension(extension, webgl2Func, extFunc) {
      if (webgl2Func && this.gl[webgl2Func])
        return this.gl[webgl2Func].bind(this.gl);
      if (!this.extensions[extension]) {
        this.extensions[extension] = this.gl.getExtension(extension);
      }
      if (!webgl2Func)
        return this.extensions[extension];
      if (!this.extensions[extension])
        return null;
      return this.extensions[extension][extFunc].bind(this.extensions[extension]);
    }
    sortOpaque(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else if (a.zDepth !== b.zDepth) {
        return a.zDepth - b.zDepth;
      } else {
        return b.id - a.id;
      }
    }
    sortTransparent(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      }
      if (a.zDepth !== b.zDepth) {
        return b.zDepth - a.zDepth;
      } else {
        return b.id - a.id;
      }
    }
    sortUI(a, b) {
      if (a.renderOrder !== b.renderOrder) {
        return a.renderOrder - b.renderOrder;
      } else if (a.program.id !== b.program.id) {
        return a.program.id - b.program.id;
      } else {
        return b.id - a.id;
      }
    }
    getRenderList({ scene, camera, frustumCull, sort }) {
      let renderList = [];
      if (camera && frustumCull)
        camera.updateFrustum();
      scene.traverse((node) => {
        if (!node.visible)
          return true;
        if (!node.draw)
          return;
        if (frustumCull && node.frustumCulled && camera) {
          if (!camera.frustumIntersectsMesh(node))
            return;
        }
        renderList.push(node);
      });
      if (sort) {
        const opaque = [];
        const transparent = [];
        const ui = [];
        renderList.forEach((node) => {
          if (!node.program.transparent) {
            opaque.push(node);
          } else if (node.program.depthTest) {
            transparent.push(node);
          } else {
            ui.push(node);
          }
          node.zDepth = 0;
          if (node.renderOrder !== 0 || !node.program.depthTest || !camera)
            return;
          node.worldMatrix.getTranslation(tempVec32);
          tempVec32.applyMatrix4(camera.projectionViewMatrix);
          node.zDepth = tempVec32.z;
        });
        opaque.sort(this.sortOpaque);
        transparent.sort(this.sortTransparent);
        ui.sort(this.sortUI);
        renderList = opaque.concat(transparent, ui);
      }
      return renderList;
    }
    render({ scene, camera, target = null, update = true, sort = true, frustumCull = true, clear }) {
      if (target === null) {
        this.bindFramebuffer();
        this.setViewport(this.width * this.dpr, this.height * this.dpr);
      } else {
        this.bindFramebuffer(target);
        this.setViewport(target.width, target.height);
      }
      if (clear || this.autoClear && clear !== false) {
        if (this.depth && (!target || target.depth)) {
          this.enable(this.gl.DEPTH_TEST);
          this.setDepthMask(true);
        }
        this.gl.clear(
          (this.color ? this.gl.COLOR_BUFFER_BIT : 0) | (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) | (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
        );
      }
      if (update)
        scene.updateMatrixWorld();
      if (camera)
        camera.updateMatrixWorld();
      const renderList = this.getRenderList({ scene, camera, frustumCull, sort });
      renderList.forEach((node) => {
        node.draw({ camera });
      });
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/functions/Vec4Func.js
  function copy2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  function set2(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  function normalize2(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len = x * x + y * y + z * z + w * w;
    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
  }
  function dot2(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/functions/QuatFunc.js
  function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    let s2 = Math.sin(rad);
    out[0] = s2 * axis[0];
    out[1] = s2 * axis[1];
    out[2] = s2 * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  function multiply2(out, a, b) {
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  function rotateX(out, a, rad) {
    rad *= 0.5;
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  function rotateY(out, a, rad) {
    rad *= 0.5;
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let by = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  function rotateZ(out, a, rad) {
    rad *= 0.5;
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bz = Math.sin(rad), bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }
  function slerp(out, a, b, t2) {
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];
    let omega, cosom, sinom, scale0, scale1;
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    if (cosom < 0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    }
    if (1 - cosom > 1e-6) {
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1 - t2) * omega) / sinom;
      scale1 = Math.sin(t2 * omega) / sinom;
    } else {
      scale0 = 1 - t2;
      scale1 = t2;
    }
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  function invert(out, a) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    let dot4 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    let invDot = dot4 ? 1 / dot4 : 0;
    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  function fromMat3(out, m) {
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;
    if (fTrace > 0) {
      fRoot = Math.sqrt(fTrace + 1);
      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      let i2 = 0;
      if (m[4] > m[0])
        i2 = 1;
      if (m[8] > m[i2 * 3 + i2])
        i2 = 2;
      let j = (i2 + 1) % 3;
      let k = (i2 + 2) % 3;
      fRoot = Math.sqrt(m[i2 * 3 + i2] - m[j * 3 + j] - m[k * 3 + k] + 1);
      out[i2] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i2] + m[i2 * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i2] + m[i2 * 3 + k]) * fRoot;
    }
    return out;
  }
  function fromEuler(out, euler, order = "YXZ") {
    let sx = Math.sin(euler[0] * 0.5);
    let cx = Math.cos(euler[0] * 0.5);
    let sy = Math.sin(euler[1] * 0.5);
    let cy = Math.cos(euler[1] * 0.5);
    let sz = Math.sin(euler[2] * 0.5);
    let cz = Math.cos(euler[2] * 0.5);
    if (order === "XYZ") {
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === "YXZ") {
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
    } else if (order === "ZXY") {
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === "ZYX") {
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
    } else if (order === "YZX") {
      out[0] = sx * cy * cz + cx * sy * sz;
      out[1] = cx * sy * cz + sx * cy * sz;
      out[2] = cx * cy * sz - sx * sy * cz;
      out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === "XZY") {
      out[0] = sx * cy * cz - cx * sy * sz;
      out[1] = cx * sy * cz - sx * cy * sz;
      out[2] = cx * cy * sz + sx * sy * cz;
      out[3] = cx * cy * cz + sx * sy * sz;
    }
    return out;
  }
  var copy3 = copy2;
  var set3 = set2;
  var dot3 = dot2;
  var normalize3 = normalize2;

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/Quat.js
  var Quat = class extends Array {
    constructor(x = 0, y = 0, z = 0, w = 1) {
      super(x, y, z, w);
      this.onChange = () => {
      };
      return this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    get w() {
      return this[3];
    }
    set x(v) {
      this[0] = v;
      this.onChange();
    }
    set y(v) {
      this[1] = v;
      this.onChange();
    }
    set z(v) {
      this[2] = v;
      this.onChange();
    }
    set w(v) {
      this[3] = v;
      this.onChange();
    }
    identity() {
      identity(this);
      this.onChange();
      return this;
    }
    set(x, y, z, w) {
      if (x.length)
        return this.copy(x);
      set3(this, x, y, z, w);
      this.onChange();
      return this;
    }
    rotateX(a) {
      rotateX(this, this, a);
      this.onChange();
      return this;
    }
    rotateY(a) {
      rotateY(this, this, a);
      this.onChange();
      return this;
    }
    rotateZ(a) {
      rotateZ(this, this, a);
      this.onChange();
      return this;
    }
    inverse(q = this) {
      invert(this, q);
      this.onChange();
      return this;
    }
    conjugate(q = this) {
      conjugate(this, q);
      this.onChange();
      return this;
    }
    copy(q) {
      copy3(this, q);
      this.onChange();
      return this;
    }
    normalize(q = this) {
      normalize3(this, q);
      this.onChange();
      return this;
    }
    multiply(qA, qB) {
      if (qB) {
        multiply2(this, qA, qB);
      } else {
        multiply2(this, this, qA);
      }
      this.onChange();
      return this;
    }
    dot(v) {
      return dot3(this, v);
    }
    fromMatrix3(matrix3) {
      fromMat3(this, matrix3);
      this.onChange();
      return this;
    }
    fromEuler(euler) {
      fromEuler(this, euler, euler.order);
      return this;
    }
    fromAxisAngle(axis, a) {
      setAxisAngle(this, axis, a);
      this.onChange();
      return this;
    }
    slerp(q, t2) {
      slerp(this, this, q, t2);
      this.onChange();
      return this;
    }
    fromArray(a, o2 = 0) {
      this[0] = a[o2];
      this[1] = a[o2 + 1];
      this[2] = a[o2 + 2];
      this[3] = a[o2 + 3];
      this.onChange();
      return this;
    }
    toArray(a = [], o2 = 0) {
      a[o2] = this[0];
      a[o2 + 1] = this[1];
      a[o2 + 2] = this[2];
      a[o2 + 3] = this[3];
      return a;
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/functions/Mat4Func.js
  var EPSILON = 1e-6;
  function copy4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function set4(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  function identity2(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function invert2(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  function determinant(a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }
  function multiply3(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  function translate(out, a, v) {
    let x = v[0], y = v[1], z = v[2];
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
  }
  function scale3(out, a, v) {
    let x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  function rotate(out, a, rad, axis) {
    let x = axis[0], y = axis[1], z = axis[2];
    let len = Math.hypot(x, y, z);
    let s2, c, t2;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;
    if (Math.abs(len) < EPSILON) {
      return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s2 = Math.sin(rad);
    c = Math.cos(rad);
    t2 = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];
    b00 = x * x * t2 + c;
    b01 = y * x * t2 + z * s2;
    b02 = z * x * t2 - y * s2;
    b10 = x * y * t2 - z * s2;
    b11 = y * y * t2 + c;
    b12 = z * y * t2 + x * s2;
    b20 = x * z * t2 + y * s2;
    b21 = y * z * t2 - x * s2;
    b22 = z * z * t2 + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }
  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  function getScaling(out, mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  function getMaxScaleOnAxis(mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];
    const x = m11 * m11 + m12 * m12 + m13 * m13;
    const y = m21 * m21 + m22 * m22 + m23 * m23;
    const z = m31 * m31 + m32 * m32 + m33 * m33;
    return Math.sqrt(Math.max(x, y, z));
  }
  var getRotation = /* @__PURE__ */ function() {
    const temp = [1, 1, 1];
    return function(out, mat) {
      let scaling = temp;
      getScaling(scaling, mat);
      let is1 = 1 / scaling[0];
      let is2 = 1 / scaling[1];
      let is3 = 1 / scaling[2];
      let sm11 = mat[0] * is1;
      let sm12 = mat[1] * is2;
      let sm13 = mat[2] * is3;
      let sm21 = mat[4] * is1;
      let sm22 = mat[5] * is2;
      let sm23 = mat[6] * is3;
      let sm31 = mat[8] * is1;
      let sm32 = mat[9] * is2;
      let sm33 = mat[10] * is3;
      let trace = sm11 + sm22 + sm33;
      let S = 0;
      if (trace > 0) {
        S = Math.sqrt(trace + 1) * 2;
        out[3] = 0.25 * S;
        out[0] = (sm23 - sm32) / S;
        out[1] = (sm31 - sm13) / S;
        out[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1 + sm11 - sm22 - sm33) * 2;
        out[3] = (sm23 - sm32) / S;
        out[0] = 0.25 * S;
        out[1] = (sm12 + sm21) / S;
        out[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1 + sm22 - sm11 - sm33) * 2;
        out[3] = (sm31 - sm13) / S;
        out[0] = (sm12 + sm21) / S;
        out[1] = 0.25 * S;
        out[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1 + sm33 - sm11 - sm22) * 2;
        out[3] = (sm12 - sm21) / S;
        out[0] = (sm31 + sm13) / S;
        out[1] = (sm23 + sm32) / S;
        out[2] = 0.25 * S;
      }
      return out;
    };
  }();
  function fromRotationTranslationScale(out, q, v, s2) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    let sx = s2[0];
    let sy = s2[1];
    let sz = s2[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  function fromQuat(out, q) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  function perspective(out, fovy, aspect, near, far) {
    let f = 1 / Math.tan(fovy / 2);
    let nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
  }
  function ortho(out, left, right, bottom, top, near, far) {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  function targetTo(out, eye, target, up) {
    let eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
    let z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len === 0) {
      z2 = 1;
    } else {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }
    let x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len === 0) {
      if (upz) {
        upx += 1e-6;
      } else if (upy) {
        upz += 1e-6;
      } else {
        upy += 1e-6;
      }
      x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
      len = x0 * x0 + x1 * x1 + x2 * x2;
    }
    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;
    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  function add3(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  function subtract2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/Mat4.js
  var Mat4 = class extends Array {
    constructor(m00 = 1, m01 = 0, m02 = 0, m03 = 0, m10 = 0, m11 = 1, m12 = 0, m13 = 0, m20 = 0, m21 = 0, m22 = 1, m23 = 0, m30 = 0, m31 = 0, m32 = 0, m33 = 1) {
      super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      return this;
    }
    get x() {
      return this[12];
    }
    get y() {
      return this[13];
    }
    get z() {
      return this[14];
    }
    get w() {
      return this[15];
    }
    set x(v) {
      this[12] = v;
    }
    set y(v) {
      this[13] = v;
    }
    set z(v) {
      this[14] = v;
    }
    set w(v) {
      this[15] = v;
    }
    set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      if (m00.length)
        return this.copy(m00);
      set4(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
      return this;
    }
    translate(v, m = this) {
      translate(this, m, v);
      return this;
    }
    rotate(v, axis, m = this) {
      rotate(this, m, v, axis);
      return this;
    }
    scale(v, m = this) {
      scale3(this, m, typeof v === "number" ? [v, v, v] : v);
      return this;
    }
    add(ma, mb) {
      if (mb)
        add3(this, ma, mb);
      else
        add3(this, this, ma);
      return this;
    }
    sub(ma, mb) {
      if (mb)
        subtract2(this, ma, mb);
      else
        subtract2(this, this, ma);
      return this;
    }
    multiply(ma, mb) {
      if (!ma.length) {
        multiplyScalar(this, this, ma);
      } else if (mb) {
        multiply3(this, ma, mb);
      } else {
        multiply3(this, this, ma);
      }
      return this;
    }
    identity() {
      identity2(this);
      return this;
    }
    copy(m) {
      copy4(this, m);
      return this;
    }
    fromPerspective({ fov, aspect, near, far } = {}) {
      perspective(this, fov, aspect, near, far);
      return this;
    }
    fromOrthogonal({ left, right, bottom, top, near, far }) {
      ortho(this, left, right, bottom, top, near, far);
      return this;
    }
    fromQuaternion(q) {
      fromQuat(this, q);
      return this;
    }
    setPosition(v) {
      this.x = v[0];
      this.y = v[1];
      this.z = v[2];
      return this;
    }
    inverse(m = this) {
      invert2(this, m);
      return this;
    }
    compose(q, pos, scale5) {
      fromRotationTranslationScale(this, q, pos, scale5);
      return this;
    }
    getRotation(q) {
      getRotation(q, this);
      return this;
    }
    getTranslation(pos) {
      getTranslation(pos, this);
      return this;
    }
    getScaling(scale5) {
      getScaling(scale5, this);
      return this;
    }
    getMaxScaleOnAxis() {
      return getMaxScaleOnAxis(this);
    }
    lookAt(eye, target, up) {
      targetTo(this, eye, target, up);
      return this;
    }
    determinant() {
      return determinant(this);
    }
    fromArray(a, o2 = 0) {
      this[0] = a[o2];
      this[1] = a[o2 + 1];
      this[2] = a[o2 + 2];
      this[3] = a[o2 + 3];
      this[4] = a[o2 + 4];
      this[5] = a[o2 + 5];
      this[6] = a[o2 + 6];
      this[7] = a[o2 + 7];
      this[8] = a[o2 + 8];
      this[9] = a[o2 + 9];
      this[10] = a[o2 + 10];
      this[11] = a[o2 + 11];
      this[12] = a[o2 + 12];
      this[13] = a[o2 + 13];
      this[14] = a[o2 + 14];
      this[15] = a[o2 + 15];
      return this;
    }
    toArray(a = [], o2 = 0) {
      a[o2] = this[0];
      a[o2 + 1] = this[1];
      a[o2 + 2] = this[2];
      a[o2 + 3] = this[3];
      a[o2 + 4] = this[4];
      a[o2 + 5] = this[5];
      a[o2 + 6] = this[6];
      a[o2 + 7] = this[7];
      a[o2 + 8] = this[8];
      a[o2 + 9] = this[9];
      a[o2 + 10] = this[10];
      a[o2 + 11] = this[11];
      a[o2 + 12] = this[12];
      a[o2 + 13] = this[13];
      a[o2 + 14] = this[14];
      a[o2 + 15] = this[15];
      return a;
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/functions/EulerFunc.js
  function fromRotationMatrix(out, m, order = "YXZ") {
    if (order === "XYZ") {
      out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));
      if (Math.abs(m[8]) < 0.99999) {
        out[0] = Math.atan2(-m[9], m[10]);
        out[2] = Math.atan2(-m[4], m[0]);
      } else {
        out[0] = Math.atan2(m[6], m[5]);
        out[2] = 0;
      }
    } else if (order === "YXZ") {
      out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));
      if (Math.abs(m[9]) < 0.99999) {
        out[1] = Math.atan2(m[8], m[10]);
        out[2] = Math.atan2(m[1], m[5]);
      } else {
        out[1] = Math.atan2(-m[2], m[0]);
        out[2] = 0;
      }
    } else if (order === "ZXY") {
      out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));
      if (Math.abs(m[6]) < 0.99999) {
        out[1] = Math.atan2(-m[2], m[10]);
        out[2] = Math.atan2(-m[4], m[5]);
      } else {
        out[1] = 0;
        out[2] = Math.atan2(m[1], m[0]);
      }
    } else if (order === "ZYX") {
      out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));
      if (Math.abs(m[2]) < 0.99999) {
        out[0] = Math.atan2(m[6], m[10]);
        out[2] = Math.atan2(m[1], m[0]);
      } else {
        out[0] = 0;
        out[2] = Math.atan2(-m[4], m[5]);
      }
    } else if (order === "YZX") {
      out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));
      if (Math.abs(m[1]) < 0.99999) {
        out[0] = Math.atan2(-m[9], m[5]);
        out[1] = Math.atan2(-m[2], m[0]);
      } else {
        out[0] = 0;
        out[1] = Math.atan2(m[8], m[10]);
      }
    } else if (order === "XZY") {
      out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));
      if (Math.abs(m[4]) < 0.99999) {
        out[0] = Math.atan2(m[6], m[5]);
        out[1] = Math.atan2(m[8], m[0]);
      } else {
        out[0] = Math.atan2(-m[9], m[10]);
        out[1] = 0;
      }
    }
    return out;
  }

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/Euler.js
  var tmpMat4 = /* @__PURE__ */ new Mat4();
  var Euler = class extends Array {
    constructor(x = 0, y = x, z = x, order = "YXZ") {
      super(x, y, z);
      this.order = order;
      this.onChange = () => {
      };
      return this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    set x(v) {
      this[0] = v;
      this.onChange();
    }
    set y(v) {
      this[1] = v;
      this.onChange();
    }
    set z(v) {
      this[2] = v;
      this.onChange();
    }
    set(x, y = x, z = x) {
      if (x.length)
        return this.copy(x);
      this[0] = x;
      this[1] = y;
      this[2] = z;
      this.onChange();
      return this;
    }
    copy(v) {
      this[0] = v[0];
      this[1] = v[1];
      this[2] = v[2];
      this.onChange();
      return this;
    }
    reorder(order) {
      this.order = order;
      this.onChange();
      return this;
    }
    fromRotationMatrix(m, order = this.order) {
      fromRotationMatrix(this, m, order);
      this.onChange();
      return this;
    }
    fromQuaternion(q, order = this.order) {
      tmpMat4.fromQuaternion(q);
      return this.fromRotationMatrix(tmpMat4, order);
    }
    fromArray(a, o2 = 0) {
      this[0] = a[o2];
      this[1] = a[o2 + 1];
      this[2] = a[o2 + 2];
      return this;
    }
    toArray(a = [], o2 = 0) {
      a[o2] = this[0];
      a[o2 + 1] = this[1];
      a[o2 + 2] = this[2];
      return a;
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/core/Transform.js
  var Transform = class {
    constructor() {
      this.parent = null;
      this.children = [];
      this.visible = true;
      this.matrix = new Mat4();
      this.worldMatrix = new Mat4();
      this.matrixAutoUpdate = true;
      this.worldMatrixNeedsUpdate = false;
      this.position = new Vec3();
      this.quaternion = new Quat();
      this.scale = new Vec3(1);
      this.rotation = new Euler();
      this.up = new Vec3(0, 1, 0);
      this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);
      this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);
    }
    setParent(parent, notifyParent = true) {
      if (this.parent && parent !== this.parent)
        this.parent.removeChild(this, false);
      this.parent = parent;
      if (notifyParent && parent)
        parent.addChild(this, false);
    }
    addChild(child, notifyChild = true) {
      if (!~this.children.indexOf(child))
        this.children.push(child);
      if (notifyChild)
        child.setParent(this, false);
    }
    removeChild(child, notifyChild = true) {
      if (!!~this.children.indexOf(child))
        this.children.splice(this.children.indexOf(child), 1);
      if (notifyChild)
        child.setParent(null, false);
    }
    updateMatrixWorld(force) {
      if (this.matrixAutoUpdate)
        this.updateMatrix();
      if (this.worldMatrixNeedsUpdate || force) {
        if (this.parent === null)
          this.worldMatrix.copy(this.matrix);
        else
          this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
        this.worldMatrixNeedsUpdate = false;
        force = true;
      }
      for (let i2 = 0, l = this.children.length; i2 < l; i2++) {
        this.children[i2].updateMatrixWorld(force);
      }
    }
    updateMatrix() {
      this.matrix.compose(this.quaternion, this.position, this.scale);
      this.worldMatrixNeedsUpdate = true;
    }
    traverse(callback) {
      if (callback(this))
        return;
      for (let i2 = 0, l = this.children.length; i2 < l; i2++) {
        this.children[i2].traverse(callback);
      }
    }
    decompose() {
      this.matrix.getTranslation(this.position);
      this.matrix.getRotation(this.quaternion);
      this.matrix.getScaling(this.scale);
      this.rotation.fromQuaternion(this.quaternion);
    }
    lookAt(target, invert4 = false) {
      if (invert4)
        this.matrix.lookAt(this.position, target, this.up);
      else
        this.matrix.lookAt(target, this.position, this.up);
      this.matrix.getRotation(this.quaternion);
      this.rotation.fromQuaternion(this.quaternion);
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/core/Camera.js
  var tempMat4 = /* @__PURE__ */ new Mat4();
  var tempVec3a = /* @__PURE__ */ new Vec3();
  var tempVec3b = /* @__PURE__ */ new Vec3();
  var Camera = class extends Transform {
    constructor(gl, { near = 0.1, far = 100, fov = 45, aspect = 1, left, right, bottom, top, zoom = 1 } = {}) {
      super();
      Object.assign(this, { near, far, fov, aspect, left, right, bottom, top, zoom });
      this.projectionMatrix = new Mat4();
      this.viewMatrix = new Mat4();
      this.projectionViewMatrix = new Mat4();
      this.worldPosition = new Vec3();
      this.type = left || right ? "orthographic" : "perspective";
      if (this.type === "orthographic")
        this.orthographic();
      else
        this.perspective();
    }
    perspective({ near = this.near, far = this.far, fov = this.fov, aspect = this.aspect } = {}) {
      Object.assign(this, { near, far, fov, aspect });
      this.projectionMatrix.fromPerspective({ fov: fov * (Math.PI / 180), aspect, near, far });
      this.type = "perspective";
      return this;
    }
    orthographic({
      near = this.near,
      far = this.far,
      left = this.left || -1,
      right = this.right || 1,
      bottom = this.bottom || -1,
      top = this.top || 1,
      zoom = this.zoom
    } = {}) {
      Object.assign(this, { near, far, left, right, bottom, top, zoom });
      left /= zoom;
      right /= zoom;
      bottom /= zoom;
      top /= zoom;
      this.projectionMatrix.fromOrthogonal({ left, right, bottom, top, near, far });
      this.type = "orthographic";
      return this;
    }
    updateMatrixWorld() {
      super.updateMatrixWorld();
      this.viewMatrix.inverse(this.worldMatrix);
      this.worldMatrix.getTranslation(this.worldPosition);
      this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
      return this;
    }
    lookAt(target) {
      super.lookAt(target, true);
      return this;
    }
    // Project 3D coordinate to 2D point
    project(v) {
      v.applyMatrix4(this.viewMatrix);
      v.applyMatrix4(this.projectionMatrix);
      return this;
    }
    // Unproject 2D point to 3D coordinate
    unproject(v) {
      v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
      v.applyMatrix4(this.worldMatrix);
      return this;
    }
    updateFrustum() {
      if (!this.frustum) {
        this.frustum = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
      }
      const m = this.projectionViewMatrix;
      this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12];
      this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12];
      this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13];
      this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13];
      this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14];
      this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14];
      for (let i2 = 0; i2 < 6; i2++) {
        const invLen = 1 / this.frustum[i2].distance();
        this.frustum[i2].multiply(invLen);
        this.frustum[i2].constant *= invLen;
      }
    }
    frustumIntersectsMesh(node, worldMatrix = node.worldMatrix) {
      if (!node.geometry.attributes.position)
        return true;
      if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity)
        node.geometry.computeBoundingSphere();
      if (!node.geometry.bounds)
        return true;
      const center = tempVec3a;
      center.copy(node.geometry.bounds.center);
      center.applyMatrix4(worldMatrix);
      const radius = node.geometry.bounds.radius * worldMatrix.getMaxScaleOnAxis();
      return this.frustumIntersectsSphere(center, radius);
    }
    frustumIntersectsSphere(center, radius) {
      const normal = tempVec3b;
      for (let i2 = 0; i2 < 6; i2++) {
        const plane = this.frustum[i2];
        const distance2 = normal.copy(plane).dot(center) + plane.constant;
        if (distance2 < -radius)
          return false;
      }
      return true;
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/functions/Mat3Func.js
  function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  function fromQuat2(out, q) {
    let x = q[0], y = q[1], z = q[2], w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;
    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }
  function copy5(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function set5(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  function identity3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  function invert3(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2];
    let a10 = a[3], a11 = a[4], a12 = a[5];
    let a20 = a[6], a21 = a[7], a22 = a[8];
    let b01 = a22 * a11 - a12 * a21;
    let b11 = -a22 * a10 + a12 * a20;
    let b21 = a21 * a10 - a11 * a20;
    let det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  function multiply4(out, a, b) {
    let a00 = a[0], a01 = a[1], a02 = a[2];
    let a10 = a[3], a11 = a[4], a12 = a[5];
    let a20 = a[6], a21 = a[7], a22 = a[8];
    let b00 = b[0], b01 = b[1], b02 = b[2];
    let b10 = b[3], b11 = b[4], b12 = b[5];
    let b20 = b[6], b21 = b[7], b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  function translate2(out, a, v) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  function rotate2(out, a, rad) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s2 = Math.sin(rad), c = Math.cos(rad);
    out[0] = c * a00 + s2 * a10;
    out[1] = c * a01 + s2 * a11;
    out[2] = c * a02 + s2 * a12;
    out[3] = c * a10 - s2 * a00;
    out[4] = c * a11 - s2 * a01;
    out[5] = c * a12 - s2 * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  function scale4(out, a, v) {
    let x = v[0], y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function normalFromMat4(out, a) {
    let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/math/Mat3.js
  var Mat3 = class extends Array {
    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {
      super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return this;
    }
    set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      if (m00.length)
        return this.copy(m00);
      set5(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
      return this;
    }
    translate(v, m = this) {
      translate2(this, m, v);
      return this;
    }
    rotate(v, m = this) {
      rotate2(this, m, v);
      return this;
    }
    scale(v, m = this) {
      scale4(this, m, v);
      return this;
    }
    multiply(ma, mb) {
      if (mb) {
        multiply4(this, ma, mb);
      } else {
        multiply4(this, this, ma);
      }
      return this;
    }
    identity() {
      identity3(this);
      return this;
    }
    copy(m) {
      copy5(this, m);
      return this;
    }
    fromMatrix4(m) {
      fromMat4(this, m);
      return this;
    }
    fromQuaternion(q) {
      fromQuat2(this, q);
      return this;
    }
    fromBasis(vec3a, vec3b, vec3c) {
      this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
      return this;
    }
    inverse(m = this) {
      invert3(this, m);
      return this;
    }
    getNormalMatrix(m) {
      normalFromMat4(this, m);
      return this;
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/core/Mesh.js
  var ID4 = 0;
  var Mesh = class extends Transform {
    constructor(gl, { geometry, program, mode = gl.TRIANGLES, frustumCulled = true, renderOrder = 0 } = {}) {
      super();
      if (!gl.canvas)
        console.error("gl not passed as first argument to Mesh");
      this.gl = gl;
      this.id = ID4++;
      this.geometry = geometry;
      this.program = program;
      this.mode = mode;
      this.frustumCulled = frustumCulled;
      this.renderOrder = renderOrder;
      this.modelViewMatrix = new Mat4();
      this.normalMatrix = new Mat3();
      this.beforeRenderCallbacks = [];
      this.afterRenderCallbacks = [];
    }
    onBeforeRender(f) {
      this.beforeRenderCallbacks.push(f);
      return this;
    }
    onAfterRender(f) {
      this.afterRenderCallbacks.push(f);
      return this;
    }
    draw({ camera } = {}) {
      if (camera) {
        if (!this.program.uniforms.modelMatrix) {
          Object.assign(this.program.uniforms, {
            modelMatrix: { value: null },
            viewMatrix: { value: null },
            modelViewMatrix: { value: null },
            normalMatrix: { value: null },
            projectionMatrix: { value: null },
            cameraPosition: { value: null }
          });
        }
        this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
        this.program.uniforms.cameraPosition.value = camera.worldPosition;
        this.program.uniforms.viewMatrix.value = camera.viewMatrix;
        this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
        this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
        this.program.uniforms.modelMatrix.value = this.worldMatrix;
        this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
        this.program.uniforms.normalMatrix.value = this.normalMatrix;
      }
      this.beforeRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
      let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
      this.program.use({ flipFaces });
      this.geometry.draw({ mode: this.mode, program: this.program });
      this.afterRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/core/Texture.js
  var emptyPixel = new Uint8Array(4);
  function isPowerOf2(value) {
    return (value & value - 1) === 0;
  }
  var ID5 = 1;
  var Texture = class {
    constructor(gl, {
      image,
      target = gl.TEXTURE_2D,
      type = gl.UNSIGNED_BYTE,
      format = gl.RGBA,
      internalFormat = format,
      wrapS = gl.CLAMP_TO_EDGE,
      wrapT = gl.CLAMP_TO_EDGE,
      generateMipmaps = true,
      minFilter = generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR,
      magFilter = gl.LINEAR,
      premultiplyAlpha = false,
      unpackAlignment = 4,
      flipY = target == gl.TEXTURE_2D ? true : false,
      anisotropy = 0,
      level = 0,
      width,
      // used for RenderTargets or Data Textures
      height = width
    } = {}) {
      this.gl = gl;
      this.id = ID5++;
      this.image = image;
      this.target = target;
      this.type = type;
      this.format = format;
      this.internalFormat = internalFormat;
      this.minFilter = minFilter;
      this.magFilter = magFilter;
      this.wrapS = wrapS;
      this.wrapT = wrapT;
      this.generateMipmaps = generateMipmaps;
      this.premultiplyAlpha = premultiplyAlpha;
      this.unpackAlignment = unpackAlignment;
      this.flipY = flipY;
      this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
      this.level = level;
      this.width = width;
      this.height = height;
      this.texture = this.gl.createTexture();
      this.store = {
        image: null
      };
      this.glState = this.gl.renderer.state;
      this.state = {};
      this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
      this.state.magFilter = this.gl.LINEAR;
      this.state.wrapS = this.gl.REPEAT;
      this.state.wrapT = this.gl.REPEAT;
      this.state.anisotropy = 0;
    }
    bind() {
      if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id)
        return;
      this.gl.bindTexture(this.target, this.texture);
      this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
    }
    update(textureUnit = 0) {
      const needsUpdate = !(this.image === this.store.image && !this.needsUpdate);
      if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
        this.gl.renderer.activeTexture(textureUnit);
        this.bind();
      }
      if (!needsUpdate)
        return;
      this.needsUpdate = false;
      if (this.flipY !== this.glState.flipY) {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        this.glState.flipY = this.flipY;
      }
      if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
        this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        this.glState.premultiplyAlpha = this.premultiplyAlpha;
      }
      if (this.unpackAlignment !== this.glState.unpackAlignment) {
        this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
        this.glState.unpackAlignment = this.unpackAlignment;
      }
      if (this.minFilter !== this.state.minFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
        this.state.minFilter = this.minFilter;
      }
      if (this.magFilter !== this.state.magFilter) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
        this.state.magFilter = this.magFilter;
      }
      if (this.wrapS !== this.state.wrapS) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
        this.state.wrapS = this.wrapS;
      }
      if (this.wrapT !== this.state.wrapT) {
        this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
        this.state.wrapT = this.wrapT;
      }
      if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
        this.gl.texParameterf(
          this.target,
          this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,
          this.anisotropy
        );
        this.state.anisotropy = this.anisotropy;
      }
      if (this.image) {
        if (this.image.width) {
          this.width = this.image.width;
          this.height = this.image.height;
        }
        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          for (let i2 = 0; i2 < 6; i2++) {
            this.gl.texImage2D(
              this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2,
              this.level,
              this.internalFormat,
              this.format,
              this.type,
              this.image[i2]
            );
          }
        } else if (ArrayBuffer.isView(this.image)) {
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
        } else if (this.image.isCompressedTexture) {
          for (let level = 0; level < this.image.length; level++) {
            this.gl.compressedTexImage2D(
              this.target,
              level,
              this.internalFormat,
              this.image[level].width,
              this.image[level].height,
              0,
              this.image[level].data
            );
          }
        } else {
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
        }
        if (this.generateMipmaps) {
          if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
            this.generateMipmaps = false;
            this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
            this.minFilter = this.gl.LINEAR;
          } else {
            this.gl.generateMipmap(this.target);
          }
        }
        this.onUpdate && this.onUpdate();
      } else {
        if (this.target === this.gl.TEXTURE_CUBE_MAP) {
          for (let i2 = 0; i2 < 6; i2++) {
            this.gl.texImage2D(
              this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i2,
              0,
              this.gl.RGBA,
              1,
              1,
              0,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              emptyPixel
            );
          }
        } else if (this.width) {
          this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
        } else {
          this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
        }
      }
      this.store.image = this.image;
    }
  };

  // node_modules/.pnpm/ogl@1.0.3/node_modules/ogl/src/extras/Plane.js
  var Plane = class _Plane extends Geometry {
    constructor(gl, { width = 1, height = 1, widthSegments = 1, heightSegments = 1, attributes = {} } = {}) {
      const wSegs = widthSegments;
      const hSegs = heightSegments;
      const num = (wSegs + 1) * (hSegs + 1);
      const numIndices = wSegs * hSegs * 6;
      const position = new Float32Array(num * 3);
      const normal = new Float32Array(num * 3);
      const uv = new Float32Array(num * 2);
      const index = numIndices > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);
      _Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);
      Object.assign(attributes, {
        position: { size: 3, data: position },
        normal: { size: 3, data: normal },
        uv: { size: 2, data: uv },
        index: { data: index }
      });
      super(gl, attributes);
    }
    static buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i2 = 0, ii = 0) {
      const io = i2;
      const segW = width / wSegs;
      const segH = height / hSegs;
      for (let iy = 0; iy <= hSegs; iy++) {
        let y = iy * segH - height / 2;
        for (let ix = 0; ix <= wSegs; ix++, i2++) {
          let x = ix * segW - width / 2;
          position[i2 * 3 + u] = x * uDir;
          position[i2 * 3 + v] = y * vDir;
          position[i2 * 3 + w] = depth / 2;
          normal[i2 * 3 + u] = 0;
          normal[i2 * 3 + v] = 0;
          normal[i2 * 3 + w] = depth >= 0 ? 1 : -1;
          uv[i2 * 2] = ix / wSegs;
          uv[i2 * 2 + 1] = 1 - iy / hSegs;
          if (iy === hSegs || ix === wSegs)
            continue;
          let a = io + ix + iy * (wSegs + 1);
          let b = io + ix + (iy + 1) * (wSegs + 1);
          let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
          let d = io + ix + iy * (wSegs + 1) + 1;
          index[ii * 6] = a;
          index[ii * 6 + 1] = b;
          index[ii * 6 + 2] = d;
          index[ii * 6 + 3] = b;
          index[ii * 6 + 4] = c;
          index[ii * 6 + 5] = d;
          ii++;
        }
      }
    }
  };

  // src/gl/_camera.js
  var camera_default = class extends Camera {
    fov = 25;
    constructor(gl, { fov = 25 }) {
      super();
      this.gl = gl;
    }
    get fovInRad() {
      return this.fov * Math.PI / 180;
    }
    getViewSize(ratio) {
      const height = Math.abs(this.position.z * Math.tan(this.fovInRad / 2) * 2);
      return { w: height * ratio, h: height };
    }
  };

  // src/gl/mat/image/vertex.vert
  var vertex_default = "#define MPI 3.1415926538\n#define MTAU 6.28318530718\n\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat3 normalMatrix;\n\nuniform float u_time;\nuniform float u_x;\nuniform vec4 u_p;\nuniform vec2 u_diff_wh;\n\nvarying vec3 v_normal;\nvarying vec2 v_uv;\n\n/*\n    Resize image to Cover\n    uv : uv coord\n    size : image size\n    resolution : plane resolution | screen resolution\n*/\n\nvec2 imageuv(vec2 uv, vec2 size, vec2 resolution) {\n    vec2 ratio = vec2(\n        min((resolution.x / resolution.y) / (size.x / size.y), 1.0),\n        min((resolution.y / resolution.x) / (size.y / size.x), 1.0)\n    );\n\n    return vec2(\n        uv.x * ratio.x + (1.0 - ratio.x) * 0.5,\n        uv.y * ratio.y + (1.0 - ratio.y) * 0.5\n    );\n}\n\n\nvoid main() {\n  vec3 pos = position;\n  \n  // ** pos + mov\n  pos.xy *= u_p.zw;\n  pos.x += u_p.x - u_x;\n  pos.y += u_p.y;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n\n  v_normal = normalize(normalMatrix * normal);\n  v_uv = imageuv(uv, u_diff_wh, u_p.zw);\n  \n}\n";

  // src/gl/mat/image/fragment.frag
  var fragment_default = "precision highp float;\n\nuniform sampler2D u_diff;\n\nvarying vec3 v_normal;\nvarying vec2 v_uv;\n\n\n\nvoid main() {\n\n  vec3 diff = texture2D(u_diff, v_uv).rgb;\n\n  gl_FragColor.rgb = diff;\n  // gl_FragColor.rgb = vec3(v_uv, 2.);\n  gl_FragColor.a = 1.;\n}\n";

  // src/gl/mat/image/index.js
  var image_default = class extends Program {
    constructor(gl, opt = {}) {
      super(gl, {
        vertex: vertex_default,
        fragment: fragment_default,
        transparent: true,
        cullFace: null
      });
      this.uniforms = {
        u_time: { value: 0 },
        u_diff: { value: new Texture(gl) },
        u_diff_wh: { value: [0, 0] },
        u_x: { value: 0 },
        u_p: { value: [1, 1, 1, 1] }
      };
    }
    set time(t2) {
      this.uniforms.u_time.value = t2;
    }
    set up(arr) {
      this.uniforms.u_p.value = arr;
    }
    set x(val) {
      this.uniforms.u_x.value = val;
    }
  };

  // src/util/clientRect.js
  var clientRect = (element) => {
    const bounds = element.getBoundingClientRect();
    let scroll = 0;
    scroll = window.app?.scroll?.y;
    return {
      // screen
      top: bounds.top,
      // bottom: bounds.bottom,
      left: bounds.left,
      // right: bounds.right,
      width: bounds.width,
      height: bounds.height,
      // window
      wh: window.innerHeight,
      ww: window.innerWidth
      // offset: bounds.top,
      // centery: bounds.top + scroll + bounds.height / 2, // check if correct
      // centerx: bounds.left + bounds.width / 2, // check if correct
    };
  };
  var clientRectGl = (element, ratio = window.app.gl.vp.px) => {
    const bounds = clientRect(element);
    const scroll = window.app.scroll.y;
    bounds.left += scroll;
    for (const [key, value] of Object.entries(bounds))
      bounds[key] = value * ratio;
    return bounds;
  };

  // src/gl/util/texture-loader.js
  async function loadTexture(gl, path) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = path;
      img.onload = () => {
        const texture = new Texture(gl, { image: img });
        texture.wh = [img.width, img.height];
        resolve(texture);
      };
    });
  }

  // src/gl/image.js
  var Image2 = class extends Mesh {
    constructor(gl, { el, src }) {
      super(gl, {
        geometry: new Plane(gl),
        program: new image_default(gl)
      });
      this.gl = gl;
      this.el = el;
      this.src = src;
      this.resize();
      this.load();
    }
    async load() {
      this.tx = await loadTexture(this.gl, this.src);
      this.program.uniforms.u_diff.value = this.tx;
      this.program.uniforms.u_diff_wh.value = this.tx.wh;
      this.el.style.visibility = "hidden";
    }
    resize() {
      const cr = clientRectGl(this.el);
      this.program.up = [
        -cr.ww / 2 + cr.left + cr.width / 2,
        cr.wh / 2 - cr.top - cr.height / 2,
        cr.width,
        cr.height
      ];
    }
    render(t2, x) {
      this.program.time = t2;
      this.program.x = x;
    }
  };

  // src/gl/_scene.js
  var scene_default = class extends Transform {
    constructor(gl, data = {}) {
      super();
      this.gl = gl;
      this.isOn = true;
      setTimeout(() => this.create(), 1);
    }
    create() {
      this.images = [...document.querySelectorAll(".cover-img")].map(
        (item, i2) => {
          const img = new Image2(this.gl, {
            el: item.parentElement,
            src: item.src
          });
          this.addChild(img);
          return img;
        }
      );
    }
    resize(vp) {
      this.vp = vp;
      this.images?.forEach((item) => item.resize(vp));
    }
    render(t2, scroll) {
      if (!this.isOn)
        return;
      const x = scroll * window.app?.gl.vp.px || 0;
      this.images?.forEach((item) => item.render(t2, x));
    }
  };

  // src/gl/gl.js
  var gl_default = class {
    constructor() {
      this.wrapper = document.querySelector("[data-gl='c']");
      this.vp = {
        dpr: Math.min(window.devicePixelRatio, 2)
      };
      this.renderer = new Renderer2({ dpr: 2, alpha: true });
      this.gl = this.renderer.gl;
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.vp = this.vp;
      this.wrapper.appendChild(this.gl.canvas);
      this.camera = new camera_default(this.gl, {});
      this.camera.position.set(0, 0, 5);
      this.scene = new scene_default(this.gl);
      this.time = 0;
      this.initEvents();
      this.render();
    }
    render(scroll = 0) {
      this.time += 0.5;
      this.scene?.render(this.time, scroll);
      this.renderer.render({
        scene: this.scene,
        camera: this.camera
      });
    }
    initEvents() {
      new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(
        this.wrapper
      );
      this.mouse = { x: 0, y: 0 };
    }
    resize(entry) {
      const cw = entry ? entry.width : this.wrapper.clientWidth;
      const ch = entry ? entry.height : this.wrapper.clientHeight;
      this.vp.w = cw;
      this.vp.h = ch;
      this.vp.ratio = cw / ch;
      this.vp.viewSize = this.camera.getViewSize(this.vp.ratio);
      this.vp.px = this.vp.viewSize.w / this.vp.w;
      this.gl.vp = this.vp;
      this.renderer.setSize(this.vp.w, this.vp.h);
      this.camera.perspective({
        aspect: this.vp.ratio
      });
      this.scene.resize(this.vp);
    }
  };

  // src/app.js
  var App = class {
    constructor() {
      this.body = document.querySelector("body");
      this.viewport = new Viewport();
      this.time = 0;
      this.init();
    }
    init() {
      this.scroll = new Scroll();
      this.pages = new Pages();
      this.dom = new Dom();
      this.gl = new gl_default();
      this.initEvents();
      this.render();
    }
    initEvents() {
      new ResizeObserver((entry) => this.resize(entry[0])).observe(this.body);
    }
    resize({ contentRect }) {
      this.viewport?.resize();
      this.dom?.resize();
    }
    render(t2) {
      this.scroll?.render(t2);
      this.gl?.render(this.scroll.y);
      this.dom?.render();
      window.requestAnimationFrame(this.render.bind(this));
    }
    /* Events */
  };
  window.app = new App();
})();
//# sourceMappingURL=app.js.map
