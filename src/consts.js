export default {
  get CANVAS_WIDTH() {
    return window.innerWidth;
  },
  get CANVAS_HEIGHT() {
    return window.innerHeight;
  },
  get PERCENT_WIDTH() {
    return this.CANVAS_WIDTH / 100;
  },
  get PERCENT_HEIGHT() {
    return this.CANVAS_HEIGHT / 100;
  },
  LOCAL_STORAGE_SCORE: 'circle_wars_best_score',
  PORTRAIT_ORIENTATION: 'PORTRAIT',
  LANDSCAPE_ORIENTATION: 'LANDSCAPE',

  PERK_LIVE: 'PERK_LIVE'
};

