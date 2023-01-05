const ISSERVER = typeof window === "undefined";

export default (a: number) =>
  !ISSERVER
    ? window.matchMedia && window.matchMedia(`(max-width: ${a}px)`).matches
    : false;
