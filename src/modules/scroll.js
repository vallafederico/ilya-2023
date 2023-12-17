import Lenis from "@studio-freight/lenis";
import { easeOutExpo } from "../util/easings.js";

// const lenisDefault = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export class Scroll extends Lenis {
  constructor(
    { orientation, infinite } = {
      orientation: "vertical",
      infinite: false,
    }
  ) {
    super({
      lerp: 0.1,
      infinite: infinite,
      orientation: orientation,
      gestureOrientation: "both",
      normalizeWheel: false,
      smoothTouch: false,
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
      immediate: false,
    });
  }

  resize() {}

  render(t) {
    if (!this.isActive) return;

    this.raf(t);
  }

  set active(value) {
    this.isActive = value;
  }

  callbackRaf() {
    // call this in scroll method
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
    // document.querySelectorAll("[data-lenis-start]");
  }
}
