const width = document.documentElement.clientWidth;
const height = document.documentElement.clientHeight;

export const CANVAS_WIDTH = width < height ? width : height;
export const CANVAS_HEIGHT = CANVAS_WIDTH;

