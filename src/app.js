import { Dom } from "./modules/dom";
import { Viewport } from "./modules/viewport";
import { Scroll } from "./modules/scroll";
import { Pages } from "./modules/pages";
import Gl from "./gl/gl";

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.viewport = new Viewport();

    this.time = 0;
    // console.log("hi");
    this.init();
  }

  init() {
    const slug = document.querySelector("[data-slug]").dataset.slug;
    const pageProps = computePageProps(slug);
    // console.log("transition In", pageProps);

    this.scroll = new Scroll(pageProps);
    this.pages = new Pages();
    this.dom = new Dom();
    this.gl = new Gl();

    this.initEvents();
    this.render();
  }

  onPageChange(slug) {
    const pageProps = computePageProps(slug);
    // console.log("transition In", pageProps);
    this.scroll = new Scroll(pageProps);
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0])).observe(this.body);
  }

  resize({ contentRect }) {
    this.viewport?.resize();
    this.dom?.resize();
  }

  render(t) {
    // this.time += 0.1;
    this.scroll?.render(t);
    this.gl?.render(this.scroll.y);
    this.dom?.render();

    window.requestAnimationFrame(this.render.bind(this));
  }

  /* Events */
}

function computePageProps(slug) {
  switch (slug) {
    case "home":
      return {
        orientation: "horizontal",
        infinite: true,
      };
    case "about":
      return {
        orientation: "vertical",
        infinite: false,
      };
    case "archive":
      return {
        orientation: "vertical",
        infinite: false,
      };
  }
}

window.app = new App();
