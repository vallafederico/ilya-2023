import { homePage } from "./pages/home.js";

export class Dom {
  constructor() {
    this.create();
  }

  resize() {}

  render(t) {}

  create(page) {
    if (page) {
      const pg = getPage(page.dataset.slug);
      pg();
    } else {
      const page = document.querySelector("[data-slug]");
      const pg = getPage(page.dataset.slug);
      pg();
    }

    this.start();
  }

  start() {}

  destroy() {}

  /* --  Pages */
  transitionOut(page) {
    // console.log("DOM::transitionOut", page);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  transitionIn(page) {
    console.log("DOM::transitionIn", page.dataset.slug);
    const pg = getPage(page.dataset.slug);
    pg();

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}

function getPage(slug) {
  switch (slug) {
    case "home":
      return homePage;
    default:
      return () => {
        console.log("default");
      };
  }
}
