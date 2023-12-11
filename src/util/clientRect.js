export const clientRect = (element) => {
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
    ww: window.innerWidth,
    // offset: bounds.top,
    // centery: bounds.top + scroll + bounds.height / 2, // check if correct
    // centerx: bounds.left + bounds.width / 2, // check if correct
  };
};

// to check
export const clientRectGl = (element, ratio = window.app.gl.vp.px) => {
  const bounds = clientRect(element);

  const scroll = window.app.scroll.y;
  bounds.left += scroll;

  for (const [key, value] of Object.entries(bounds))
    bounds[key] = value * ratio;

  return bounds;
};
