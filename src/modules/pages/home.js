import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

// ––––– WORK VIEW TOGGLING –––––

export function homePage() {
  let currentView = "grid";
  function toggleView() {
    let view = document.querySelector('[data-work="view"]');

    if (currentView === "grid") {
      console.log("Switching from grid to list");
      currentView = "list";

      gridToList();

      gsap.to(view, {
        scrambleText: { text: "list", speed: 0.8, delimiter: "" },
        duration: 0.8,
      });
    } else {
      console.log("Switching from list to grid");
      currentView = "grid";

      listToGrid();

      gsap.to(view, {
        scrambleText: { text: "grid", speed: 0.8, delimiter: "" },
        duration: 0.8,
      });
    }
  }

  let gridLines = document.querySelectorAll(".p-item__line");
  let gridDots = document.querySelectorAll(".dotted-line");
  let gridItems = document.querySelectorAll(".p-item__content");
  let gridWrap = document.querySelector(".horizontal-w");
  let listWrap = document.querySelector(".list-w");
  let listLines = listWrap.querySelectorAll(".h-line");
  let listText = listWrap.querySelectorAll(".eyebrow");
  let listRows = listWrap.querySelectorAll(".row");

  //
  //

  let workToggle = gsap.timeline({
    defaults: {
      ease: "expo.out",
      duration: 0.8,
    },
    onComplete: () => {
      gsap.set([listLines, listRows], {
        clearProps: "all",
      });
      gsap.set(listWrap, {
        pointerEvents: "auto",
      });
    },
  });

  const gridToList = () => {
    workToggle.clear();
    workToggle.progress(0);
    workToggle
      .to(gridLines, {
        scaleY: 0,
        ease: "power3.inOut",
        stagger: { each: 0.02, from: "random" },
        onStart: () => {
          gsap.set(listWrap, {
            pointerEvents: "none",
          });
        },
      })
      .to(
        gridDots,
        {
          height: "0vh",
          ease: "power3.inOut",
          stagger: { each: 0.05, from: "random" },
        },
        0
      )
      .to(
        gridItems,
        {
          autoAlpha: 0,
          yPercent: 25,
        },
        0
      )
      .set(gridWrap, { visibility: "hidden" })
      .set(listWrap, { visibility: "visible" }, 0.3)
      .from(
        listLines,
        {
          scaleX: 0,
          stagger: 0.03,
          duration: 1,
          ease: "expo.inOut",
        },
        ">"
      )
      .to(
        listText,
        {
          scrambleText: {
            chars: "abcdefghijklmnopqrtuvwxyz",
            text: "{original}",
            speed: 0.6,
            delimiter: "",
          },
          duration: 1.2,
          ease: "linear",
          stagger: { each: 0.01, from: "random" },
        },
        "<"
      )
      .from(
        listRows,
        {
          opacity: 0,
          stagger: 0.04,
          duration: 1,
          ease: "expo.inOut",
        },
        "<"
      );
  };

  const listToGrid = () => {
    workToggle.clear();
    workToggle.progress(0);
    workToggle
      .to(listLines, {
        scaleX: 0,
        stagger: { each: 0.03, from: "end" },
        duration: 1,
        ease: "expo.inOut",
        onStart: () => {
          gsap.set(listWrap, {
            pointerEvents: "none",
          });
        },
      })
      .to(
        listText,
        {
          scrambleText: {
            chars: "abcdefghijklmnopqrtuvwxyz",
            text: "{original}",
            speed: 0.6,
            delimiter: "",
          },
          duration: 1.2,
          ease: "linear",
          stagger: { each: 0.01, from: "random" },
        },
        0
      )
      .to(
        listRows,
        {
          opacity: 0,
          stagger: { each: 0.04, from: "end" },
          duration: 1,
          ease: "expo.inOut",
        },
        0
      )
      .set(listWrap, { visibility: "hidden" })
      .set(gridWrap, { visibility: "visible" }, 0.7)
      .to(
        gridLines,
        {
          scaleY: 1,
          ease: "power4.inOut",
          stagger: { each: 0.02, from: "random" },
        },
        "<"
      )
      .to(
        gridDots,
        {
          height: "150vh",
          ease: "power4.inOut",
          stagger: { each: 0.05, from: "random" },
        },
        "<"
      )
      .to(
        gridItems,
        {
          autoAlpha: 1,
          yPercent: 0,
        },
        "<+=0.4"
      );
  };

  document
    .querySelector('[data-work="toggle"]')
    .addEventListener("click", function (event) {
      if (window.location.pathname === "/") {
        console.log("toggle view");
        event.preventDefault();
        toggleView();
        window.app.gl.scene.toggleView();
      }
    });
}
