// Every source photo is a 1000x1000 square, so object-fit: cover never crops
// anything (image and card frame already match). These mushrooms' subjects
// sit off-center or small within their square photo, so the card looks
// unbalanced without a manual nudge. Values were derived by measuring each
// photo's foreground bounding box against its moss background.
export const CARD_FOCUS: Record<string, { x: number; y: number; zoom: number }> = {
  churo: { x: 50, y: 62, zoom: 1.15 },
  faye: { x: 50, y: 60, zoom: 1.1 },
  fern: { x: 50, y: 63, zoom: 1.19 },
  frustrashroom: { x: 50, y: 62, zoom: 1.16 },
  lennard: { x: 50, y: 63, zoom: 1.2 },
  'lord-giant': { x: 50, y: 61, zoom: 1.14 },
  moss: { x: 50, y: 59, zoom: 1.09 },
  nosewise: { x: 50, y: 58, zoom: 1.4 },
  nugget: { x: 50, y: 66, zoom: 1.28 },
  peter: { x: 50, y: 60, zoom: 1.09 },
  pickle: { x: 50, y: 65, zoom: 1.27 },
  raven: { x: 50, y: 64, zoom: 1.26 },
  secret: { x: 50, y: 65, zoom: 1.25 },
  shroomita: { x: 50, y: 61, zoom: 1.18 },
  'teeny-and-tiny': { x: 50, y: 63, zoom: 1.19 },
  tofu: { x: 65, y: 64, zoom: 1.21 },
  tove: { x: 50, y: 60, zoom: 1.11 },
  twix: { x: 50, y: 61, zoom: 1.18 },
  victor: { x: 50, y: 62, zoom: 1.17 },
  whisper: { x: 50, y: 59, zoom: 1.09 },
};
