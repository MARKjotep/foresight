type fun<E, T> = (e?: E) => T;
type V = string | number | boolean | fun<string, any> | dict<fun<any, any>>;
interface dict<T> {
  [Key: string]: T;
}
type funOrStr = fun<null, string> | string | string[];
type eventFunction = (e: Event | any) => void;
type events = {
  [P in keyof HTMLElementEventMap]?: eventFunction;
};
type HTSFunc<T> = (e: HTMLElement & HTMLCanvasElement) => T;
type redy = {
  ready?: HTSFunc<void>;
  resize?: (f: HTMLElement, e: Window) => void;
  unload?: (f: HTMLElement, e: Window) => void;
  popstate?: (f: HTMLElement, e: Window) => void;
};

interface dom {
  ctx: string;
  _fatt: dict<any>;
}

type CSSinR = {
  [P in keyof CSSStyleDeclaration]?: V | HTSFunc<V>;
};
type _events = events & redy;
interface attrs2 {
  chl?: any;
  id?: string;
  on?: _events;
  class?: funOrStr;
  style?: CSSinR | dict<V | HTSFunc<V>>;
}
type attrD = dict<V | HTSFunc<attrD>> | attrs2;

declare namespace JSX {
  type Element = $dom;
  interface IntrinsicElements {
    // Basic ----------------------------------
    p: attrD;
    br: attrD;
    hr: attrD;
    h: attrD;
    cmnt: attrD;
    root: attrD;
    // Styles and Semantics ----------------------------------
    html: attrD;
    body: attrD;
    div: attrD;
    span: attrD;
    header: attrD;
    hgroup: attrD;
    footer: attrD;
    main: attrD;
    section: attrD;
    search: attrD;
    article: attrD;
    aside: attrD;
    details: attrD;
    dialog: attrD;
    summary: attrD;
    data: attrD;
    // Programming ----------------------------------
    noscript: attrD;
    object: attrD;
    param: attrD;
    script: attrD;
    // Links ----------------------------------
    a: attrD;
    nav: attrD;
    style: attrD;
    // Audio / Video ----------------------------------
    audio: attrD;
    video: attrD;
    source: attrD;
    track: attrD;
    // Images ----------------------------------
    img: attrD;
    map: attrD;
    area: attrD;
    canvas: attrD;
    figcaption: attrD;
    figure: attrD;
    picture: attrD;
    // IFrame ----------------------------------
    iframe: attrD;
    // Forms and Input ----------------------------------
    form: attrD;
    input: attrD;
    textarea: attrD;
    button: attrD;
    select: attrD;
    optgroup: attrD;
    option: attrD;
    label: attrD;
    fieldset: attrD;
    legend: attrD;
    datalist: attrD;
    // Tables ----------------------------------
    table: attrD;
    caption: attrD;
    th: attrD;
    tr: attrD;
    td: attrD;
    thead: attrD;
    tbody: attrD;
    tfoot: attrD;
    col: attrD;
    colgroup: attrD;
    // Formatting ----------------------------------

    b: attrD;
    i: attrD;
    q: attrD;
    s: attrD;
    u: attrD;
    em: attrD;
    rp: attrD;
    del: attrD;
    dfn: attrD;
    ins: attrD;
    kbd: attrD;
    pre: attrD;
    sub: attrD;
    sup: attrD;
    var: attrD;
    wbr: attrD;
    cite: attrD;
    time: attrD;
    abbr: attrD;
    code: attrD;
    mark: attrD;
    samp: attrD;
    meter: attrD;
    small: attrD;
    strong: attrD;
    address: attrD;
    progress: attrD;
    template: attrD;
    blockquote: attrD;
    // List ----------------------------------
    menu: attrD;
    ul: attrD;
    ol: attrD;
    li: attrD;
    dl: attrD;
    dt: attrD;
    dd: attrD;

    h1: attrD;
    h2: attrD;
    h3: attrD;
    h4: attrD;
    h5: attrD;
    h6: attrD;

    // SVG Elements  ----------------------------------
    svg: attrD;
    path: attrD;
    circle: attrD;
    animate: attrD;
    animateMotion: attrD;
    animateTransform: attrD;
    clipPath: attrD;
    defs: attrD;
    desc: attrD;
    ellipse: attrD;
    feBlend: attrD;
    feColorMatrix: attrD;
    feComponentTransfer: attrD;
    feComposite: attrD;
    feConvolveMatrix: attrD;
    feDiffuseLighting: attrD;
    feDisplacementMap: attrD;
    feDistantLight: attrD;
    feDropShadow: attrD;
    feFlood: attrD;
    feFuncA: attrD;
    feFuncB: attrD;
    feFuncG: attrD;
    feFuncR: attrD;
    feGaussianBlur: attrD;
    feImage: attrD;
    feMerge: attrD;
    feMergeNode: attrD;
    feMorphology: attrD;
    feOffset: attrD;
    fePointLight: attrD;
    feSpecularLighting: attrD;
    feSpotLight: attrD;
    feTile: attrD;
    feTurbulence: attrD;
    filter: attrD;
    foreignObject: attrD;
    g: attrD;
    image: attrD;
    line: attrD;
    linearGradient: attrD;
    marker: attrD;
    mask: attrD;
    metadata: attrD;
    mpath: attrD;
    pattern: attrD;
    polygon: attrD;
    polyline: attrD;
    radialGradient: attrD;
    rect: attrD;
    set: attrD;
    stop: attrD;
    symbol: attrD;
    text: attrD;
    textPath: attrD;
    title: attrD;
    tspan: attrD;
    use: attrD;
    view: attrD;
  }
}