interface dict<T> {
  [Key: string]: T;
}
type V = string | number | boolean;
type S = V | V[] | ((e: Element) => S);

type eventFunction = (e: any) => void;
type _events = {
  [P in keyof GlobalEventHandlersEventMap]?: eventFunction;
};
type CE = (f: HTMLElement, e: Window) => void;
type fany = () => any;
type WTC = [(...e: any) => void, fany, true?];
interface c_events {
  ready?: (f: HTMLElement) => void;
  watch?: (f: HTMLElement) => WTC | WTC[];
  resize?: CE;
  unload?: CE;
  popstate?: CE;
}

type STYLE = V | ((e?: Element) => V);
type CSSinT = {
  [P in keyof CSSStyleDeclaration]?: STYLE;
};
type events = _events & c_events;

//

interface Battr {
  id?: string;
  class?: S;
  style?: CSSinT | dict<STYLE>;
  on?: events;
}
type attr = dict<S> | Battr;
type MS2 = dict<[(e?: Element) => S, any]>;

interface dom {
  component: boolean;
  name: string;
  __: (e: idm) => { ctx: string; attr: dict<dict<MS2> | MS2> };
}

/*
-------------------------
DOM content here
-------------------------
*/
type SArr<T> = [T];

interface flex {}

declare namespace JSX {
  type Element = dom;
  interface IntrinsicElements {
    // Basic ----------------------------------
    p: attr;
    br: attr;
    hr: attr;
    h: attr;
    cmnt: attr;
    root: attr;
    // Styles and Semantics ----------------------------------
    html: attr;
    body: attr;
    div: attr;
    span: attr;
    header: attr;
    hgroup: attr;
    footer: attr;
    main: attr;
    section: attr;
    search: attr;
    article: attr;
    aside: attr;
    details: attr;
    dialog: attr;
    summary: attr;
    data: attr;
    // Programming ----------------------------------
    noscript: attr;
    object: attr;
    param: attr;
    script: attr;
    // Links ----------------------------------
    a: attr;
    nav: attr;
    style: attr;
    // Audio / Video ----------------------------------
    audio: attr;
    video: attr;
    source: attr;
    track: attr;
    // Images ----------------------------------
    img: attr;
    map: attr;
    area: attr;
    canvas: attr;
    figcaption: attr;
    figure: attr;
    picture: attr;
    // IFrame ----------------------------------
    iframe: attr;
    // Forms and Input ----------------------------------
    form: attr;
    input: attr;
    textarea: attr;
    button: attr;
    select: attr;
    optgroup: attr;
    option: attr;
    label: attr;
    fieldset: attr;
    legend: attr;
    datalist: attr;
    // Tables ----------------------------------
    table: attr;
    caption: attr;
    th: attr;
    tr: attr;
    td: attr;
    thead: attr;
    tbody: attr;
    tfoot: attr;
    col: attr;
    colgroup: attr;
    // Formatting ----------------------------------

    b: attr;
    i: attr;
    q: attr;
    s: attr;
    u: attr;
    em: attr;
    rp: attr;
    del: attr;
    dfn: attr;
    ins: attr;
    kbd: attr;
    pre: attr;
    sub: attr;
    sup: attr;
    var: attr;
    wbr: attr;
    cite: attr;
    time: attr;
    abbr: attr;
    code: attr;
    mark: attr;
    samp: attr;
    meter: attr;
    small: attr;
    strong: attr;
    address: attr;
    progress: attr;
    template: attr;
    blockquote: attr;
    // List ----------------------------------
    menu: attr;
    ul: attr;
    ol: attr;
    li: attr;
    dl: attr;
    dt: attr;
    dd: attr;

    h1: attr;
    h2: attr;
    h3: attr;
    h4: attr;
    h5: attr;
    h6: attr;

    // SVG Elements  ----------------------------------
    svg: attr;
    path: attr;
    circle: attr;
    animate: attr;
    animateMotion: attr;
    animateTransform: attr;
    clipPath: attr;
    defs: attr;
    desc: attr;
    ellipse: attr;
    feBlend: attr;
    feColorMatrix: attr;
    feComponentTransfer: attr;
    feComposite: attr;
    feConvolveMatrix: attr;
    feDiffuseLighting: attr;
    feDisplacementMap: attr;
    feDistantLight: attr;
    feDropShadow: attr;
    feFlood: attr;
    feFuncA: attr;
    feFuncB: attr;
    feFuncG: attr;
    feFuncR: attr;
    feGaussianBlur: attr;
    feImage: attr;
    feMerge: attr;
    feMergeNode: attr;
    feMorphology: attr;
    feOffset: attr;
    fePointLight: attr;
    feSpecularLighting: attr;
    feSpotLight: attr;
    feTile: attr;
    feTurbulence: attr;
    filter: attr;
    foreignObject: attr;
    g: attr;
    image: attr;
    line: attr;
    linearGradient: attr;
    marker: attr;
    mask: attr;
    metadata: attr;
    mpath: attr;
    pattern: attr;
    polygon: attr;
    polyline: attr;
    radialGradient: attr;
    rect: attr;
    set: attr;
    stop: attr;
    symbol: attr;
    text: attr;
    textPath: attr;
    title: attr;
    tspan: attr;
    use: attr;
    view: attr;
  }
}
