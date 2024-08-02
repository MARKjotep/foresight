/// <reference path="./types.d.ts" />
/*
-------------------------
Types
-------------------------
*/
export interface dict<T> {
  [Key: string]: T;
}
interface DomFn {
  (attributes?: any, contents?: any[]): InstanceType<typeof $dom>;
}
type HTSFunc<T> = (e: HTMLElement) => T;
type fun<E, T> = (e?: E) => T;
type V = string | number | boolean;
type XF = fun<any, V>;
type XD = dict<XF | V>;
export type $RT = ReturnType<typeof $>;
export type _$RT = ReturnType<typeof _$>;
type CSSinR = {
  [P in keyof CSSStyleDeclaration]?: V | HTSFunc<V>;
};
export type attr = dict<V | HTSFunc<attrD>> | attrs2;
/*
-------------------------

-------------------------
*/
const __document = typeof document == "undefined" ? null : document;
export const { $, _$, $$, $E } = (function () {
  type kf = KeyframeAnimationOptions;
  type kfanim = (options?: kf) => anim;
  class $$ {
    static set p(a: any) {
      if (Array.isArray(a)) {
        console.log(...a);
      } else {
        console.log(a);
      }
    }
    static get O() {
      return {
        vals: Object.values,
        keys: Object.keys,
        items: Object.entries,
        has: Object.hasOwn,
        ass: Object.assign,
      };
    }
    static makeID(length: number) {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      const nums = "0123456789";

      let counter = 0;
      while (counter < length) {
        let chars = characters + (counter == 0 ? "" : nums);
        const charactersLength = chars.length;
        result += chars.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }
    static Y(e: _dom, cname: fun<string, any>): string {
      function Z() {}
      Z.prototype.e = e;
      Z.prototype.x = cname;
      const SD = new (Z as any)();
      return SD.x();
    }
    static new({
      dom,
      id,
      inner,
    }: {
      dom: keyof HTMLElementTagNameMap;
      id?: string;
      inner?: any;
    }): HTMLElement {
      const EL = document.createElement(dom);
      if (id) {
        EL.id = id;
      }
      if (inner) {
        EL.innerHTML = inner;
      }
      return EL;
    }
    static fill(count: number, fill: any = null) {
      return Array(count).fill(fill);
    }
    static rand(min = 6, max?: number) {
      if (max) {
        return Math.round(Math.random() * (max - min) + min);
      }
      const rndInt = Math.floor(Math.random() * min) + 1;
      return rndInt - 1;
    }
    static get randHex() {
      const hex = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
      return `#${hex}`;
    }
    static randRGBA(opacity = 1) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    static randFrom(arr: any[] | Object) {
      if (Array.isArray(arr)) {
        const alen = arr.length;
        const tran = this.rand(0, alen - 1);
        return arr[tran];
      } else if (typeof arr == "object") {
        const kys = this.O.keys(arr);
        const alen = kys.length;
        const tran = this.rand(0, alen - 1);
        return kys[tran];
      }
    }
    static get screen(): string {
      const { innerWidth } = window;
      const medias = {
        xs: innerWidth <= 480,
        sm: innerWidth >= 480,
        md: innerWidth >= 768,
        lg: innerWidth >= 1024,
        xl: innerWidth >= 1280,
      };

      const mrev = $$.O.items(medias).reverse();
      for (let ind = 0; ind < mrev.length; ind++) {
        const [med, ismed] = mrev[ind];
        if (ismed) return med;
      }
      return "";
    }
    static is_number(value: any) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
    static get isDark() {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    static computedBG(e: _$RT) {
      return window.getComputedStyle(e!.e).backgroundColor;
    }
    static computed(e: _$RT) {
      return window.getComputedStyle(e!.e);
    }
    static proper(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  class $E {
    static client_x(e: any) {
      if ("touches" in e) {
        if (e.touches[0]) {
          return e.touches[0].clientX;
        } else {
          const touch = e.changedTouches[e.changedTouches.length - 1];
          if (touch) {
            return touch.pageX;
          } else {
            return 0;
          }
        }
      } else if ("x" in e) {
        return e.x;
      } else 0;
    }

    static client_width(e: HTMLElement) {
      const { clientWidth, offsetLeft, parentElement: p_el } = e;
      if (p_el) {
        const { clientWidth: p_width, offsetLeft: p_left } = p_el;
        const AL = p_left - offsetLeft - 10;
        return p_width - clientWidth + AL;
      }
      return clientWidth + offsetLeft;
    }
  }
  /**
   * Dom Element Properties
   */
  class __E {
    e: HTMLElement;
    query_string: string | null;
    constructor(e: HTMLElement, query: string | null = null) {
      this.e = e;
      this.query_string = query;
    }
    /**
     * preset animation
     */
    get a() {
      return a(this.e);
    }
    get all(): $RT[] {
      if (this.query_string) {
        const QD = document.querySelectorAll(this.query_string);
        if (QD.length) {
          return Array.from(QD).map((a) => $(a as HTMLElement));
        }
      }
      return [];
    }
    get attr() {
      const lat = this.e;
      return {
        has: (at_name: string): boolean => {
          return lat.hasAttribute(at_name);
        },
        get: (at_name: string): string | null => {
          return lat.getAttribute(at_name);
        },
        set: (attrs: dict<any>): this => {
          for (const ats in attrs) {
            lat.setAttribute(ats, attrs[ats]);
          }
          return this;
        },
      };
    }
    set append(val: any) {
      //
      if (val instanceof $dom) {
        const dval = val.__(xmid).ctx;
        this.e.insertAdjacentHTML("beforeend", dval);
      } else {
        this.e.insertAdjacentHTML("beforeend", val);
      }
    }
    get children() {
      return Array.from(this.e.children).map<_dom>((a) => $(a as HTMLElement));
    }
    get click() {
      this.e.click();
      return this;
    }
    get rect() {
      return this.e.getBoundingClientRect();
    }
    get style() {
      const CC = this.e.style;
      const TT = this;
      return {
        set: function (style: CSSinR | dict<V>, delay = 0) {
          const TES: dict<any> = CC;
          const styler = () => {
            $$.O.items(style).forEach(([st, vs]) => {
              if (st in TES) {
                if (TES[st] != vs) {
                  TES[st] = vs;
                }
              } else {
                if (vs !== null) {
                  CC.setProperty(st, String(vs));
                }
              }
            });
          };

          if (delay) {
            setTimeout(styler, delay);
          } else {
            styler();
          }

          return TT;
        },
        get: function (prop: keyof CSSStyleDeclaration | string) {
          return CC.getPropertyValue(prop.toString());
        },
        del: function (prop: keyof CSSStyleDeclaration | string) {
          return CC.removeProperty(prop.toString());
        },
      };
    }
    set id(did: string) {
      this.e.id = did;
    }
    get id() {
      return this.e.id;
    }
    set inner(val: any) {
      this.e.innerHTML = val;
    }
    get inner(): string {
      return this.e.innerHTML;
    }
    get parent(): _dom | null {
      let prtn = this.e.parentElement;
      if (prtn) {
        return new _dom(prtn);
      }
      return null;
    }

    get offsetParent(): _dom | null {
      let prtn = this.e.offsetParent;
      if (prtn) {
        return new _dom(prtn as HTMLElement);
      }
      return null;
    }

    get remove_element() {
      this.e.remove();
      return this;
    }
    get tag() {
      return this.e.tagName;
    }
  }

  class _dom extends __E {
    constructor(e: HTMLElement, query: string | null = null) {
      super(e, query);
    }
    // Classes
    add(className: string): _dom {
      this.e.classList.add(className.replace(/[^\w-]/, ""));
      return this;
    }

    animate(
      keyframes: (CSSinR | dict<V>)[] | CSSinR | dict<V>,
      options: kf = {},
    ) {
      const opt: kf = {
        duration: 300,
        easing: "ease",
        fill: "forwards",
      };
      $$.O.ass(opt, options);
      return this.e.animate(keyframes as Keyframe[], opt);
    }

    remove(className: string): _dom {
      this.e.classList.remove(className.replace(/[^\w-]/, ""));
      return this;
    }

    toggle(className: string | fun<any, string>): _dom {
      let lt: string =
        typeof className != "string" ? $$.Y(this, className) : className;

      const TC = this.e.classList;
      lt.split(" ").forEach((tg) => {
        TC.toggle(tg);
      });
      return this;
    }
    // ------

    disabled(stat: boolean) {
      if (stat) {
        this.e.setAttribute("disabled", "disabled");
      } else {
        this.e.removeAttribute("disabled");
      }
      return this;
    }
    has(e: any | null) {
      return this.e.contains(e);
    }

    insert(position: InsertPosition) {
      const TE = this.e;
      const TH = this;
      return {
        HTML: function (...text: string[]) {
          text.forEach((tt) => {
            TE.insertAdjacentHTML(position, tt);
          });
          return TH;
        },
        element: function (...elem: Element[]) {
          elem.forEach((tt) => {
            TE.insertAdjacentElement(position, tt);
          });
          return TH;
        },
        text: function (...text: string[]) {
          text.forEach((tt) => {
            TE.insertAdjacentText(position, tt);
          });
          return TH;
        },
      };
    }

    is(tp: { dom?: string; class?: string | string[] }): boolean {
      const clist = this.e.classList.value.split(" ");
      const dom_name = this.e.tagName.toLocaleLowerCase();
      let yes: boolean = true;
      let isdom = true;

      if (tp.dom) {
        isdom = tp.dom == dom_name ? true : false;
      }

      if (tp.class) {
        if (Array.isArray(tp.class)) {
          tp.class.forEach((t) => {
            yes = yes ? clist.includes(t) : false;
          });
        } else {
          yes = yes ? clist.includes(tp.class) : false;
        }
      }
      return yes && isdom;
    }

    on(
      event: keyof HTMLElementEventMap,
      handler: (e?: any) => void,
      useCapture: boolean = true,
    ): _dom {
      let passive = false;
      if (event.indexOf("touch") > -1) {
        passive = true;
      }

      this.e.addEventListener(event, handler, {
        capture: useCapture,
        passive: passive,
      });
      return this;
    }

    remove_on(
      event: keyof DocumentEventMap,
      handler: EventListenerOrEventListenerObject,
      useCapture: boolean = false,
    ) {
      this.e.removeEventListener(event, handler, useCapture);
      return this;
    }
    timed(fn: (ee?: $RT) => void, timeout = 250) {
      setTimeout(() => fn(this), timeout);
      return this;
    }
  }

  function $(e: HTMLElement | EventTarget) {
    return new _dom(e as HTMLElement);
  }

  function _$(e: string): _dom | null {
    const QD = document.querySelector(e);
    if (QD) {
      return new _dom(QD as HTMLElement, e);
    }
    return null;
  }

  class anim {
    e: ReturnType<typeof $>;
    constructor(e: HTMLElement) {
      this.e = $(e);
    }
    get slide(): {
      left: kfanim;
      right: kfanim;
      up: kfanim;
      down: kfanim;
    } {
      const slider = (
        { x = 0, y = 0 }: { x?: any; y?: any },
        options: kf = {},
      ) => {
        const pre: kf = {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
        };
        $$.O.ass(pre, options);
        this.e.animate(
          [
            {
              transform: `translateX(${x}rem) translateY(${y}rem)`,
            },
            {
              transform: "translateX(0rem) translateY(0rem)",
            },
          ],
          pre,
        );
        return this;
      };

      return {
        left: (options: kf = {}) => {
          return slider({ x: -2 }, options);
        },
        right: (options: kf = {}) => {
          return slider({ x: 2 }, options);
        },
        up: (options: kf = {}) => {
          return slider({ y: 2 }, options);
        },
        down: (options: kf = {}) => {
          return slider({ y: -2 }, options);
        },
      };
    }
    fade(options: kf = {}) {
      const pre: kf = {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      };
      $$.O.ass(pre, options);
      this.e.animate(
        [
          {
            opacity: 0,
          },
          {
            opacity: 1,
          },
        ],
        pre,
      );
      return this;
    }
    shake(XorY = "Y", opt: kf = {}) {
      const pre: kf = {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      };
      $$.O.ass(pre, opt);
      const ac = [0, 5, -5, 5, 0].reduce<any[]>((v, k) => {
        v.push({
          transform: `translate${XorY}(${k}px)`,
        });
        return v;
      }, []);
      this.e.animate(ac, pre);
      return this;
    }
    color(c: string[] = [], opt: kf = {}) {
      const pre: kf = {
        duration: 500,
        easing: "ease-in-out",
      };
      $$.O.ass(pre, opt);
      let ac = {};
      if (Array.isArray(c)) {
        ac = c.map((cc) => {
          return { color: cc };
        });
      } else {
        ac = { color: c };
      }

      this.e.animate(ac, pre);
      return this;
    }
    bg(c: string | string[] = [], opt: kf = {}) {
      const pre: kf = {
        duration: 500,
        easing: "ease-in-out",
      };
      $$.O.ass(pre, opt);
      let ac = {};
      if (Array.isArray(c)) {
        ac = c.map((cc) => {
          return { backgroundColor: cc };
        });
      } else {
        ac = { backgroundColor: c };
      }

      this.e.animate(ac, pre);
      return this;
    }
    animate(keyframes: CSSinR[] | CSSinR, options: kf = {}) {
      return this.e.animate(keyframes, options);
    }
    click_bounce(endVal = 1, opt: kf = {}) {
      const pre: kf = {
        duration: 200,
        easing: "ease",
        fill: "none",
      };
      $$.O.ass(pre, opt);
      const ac = [0.7, endVal].reduce<any[]>((v, k) => {
        v.push({
          transform: `scale(${k})`,
        });
        return v;
      }, []);
      this.e.animate(ac, pre);
      return this;
    }
    bounce(sVal = 1, opt: kf = {}) {
      const pre: kf = {
        duration: 200,
        easing: "ease",
        fill: "none",
      };
      $$.O.ass(pre, opt);
      const ac = [0.5, sVal, 1].reduce<any[]>((v, k) => {
        v.push({
          transform: `scale(${k})`,
        });
        return v;
      }, []);
      this.e.animate(ac, pre);
      return this;
    }
  }

  function a(e: HTMLElement) {
    return new anim(e);
  }

  return { $, _$, $$, $E };
})();

/*
-------------------------
Local
-------------------------
*/
export const { local } = (function () {
  function is_number(value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
  class __I {
    value: any;
    constructor(k: any) {
      this.value = k;
    }
    get str(): string | null {
      const stt = String(this.value).toString();
      return stt == "null" ? null : String(this.value).toString();
    }
    get int(): number | null {
      if (is_number(this.value)) {
        return parseInt(this.value);
      } else {
        return null;
      }
    }
    get float(): number | null {
      if (is_number(this.value)) {
        return parseFloat(this.value);
      } else {
        return null;
      }
    }
    get bool(): boolean | null {
      if (this.value === "true") {
        return true;
      } else if (this.value == "false") {
        return false;
      } else {
        return null;
      }
    }
    get json(): any | null {
      if (this.value) {
        return JSON.parse(this.value);
      }
      return null;
    }
  }
  class _loc {
    key: string;
    func: (() => any) | null;
    storage: Storage;
    constructor(
      item: dict<() => any> | string,
      _type: "local" | "session" = "local",
    ) {
      if (typeof item == "object") {
        const [k, v] = $$.O.items(item)[0];
        this.key = k;
        this.func = v;
      } else {
        this.key = item;
        this.func = null;
      }
      this.storage = _type == "local" ? localStorage : sessionStorage;
    }
    get as() {
      return new __I(this.storage.getItem(this.key));
    }
    get value(): string | null {
      return this.storage.getItem(this.key);
    }
    get save() {
      if (this.func) {
        const nval = this.func();
        if (typeof nval == "object") {
          this.storage.setItem(this.key, JSON.stringify(nval));
        } else {
          this.storage.setItem(this.key, String(nval));
        }
      }

      return;
    }
    set set(val: any) {
      this.storage.setItem(this.key, String(val));
    }
    get remove() {
      this.storage.removeItem(this.key);
      return;
    }
  }
  /**
   * Local Storage
   */
  const local = {
    get: (item: dict<() => any> | string) => new _loc(item),
  };

  /**
   * Session Storage
   */
  const session = {
    get: (item: dict<() => any> | string) => new _loc(item, "session"),
  };

  return { local };
})();

// --------
let xmid: any | null = null;
export const { $dom, render, watch, state } = (function () {
  const WT: HTMLElement[] = [];
  let XATT: dict<dict<XF | dict<XF>>>;
  const resizeF: dict<(e?: HTMLElement) => void> = {};
  // ----

  const xtrig = (repDOM: boolean = false, noFunc = false, isComp = false) => {
    const _DC = document;
    WT.forEach((c) => {
      c.click();
    });

    if (XATT)
      $$.O.items(XATT).forEach(([k, v]) => {
        if ($$.O.keys(v).length == 0) {
          delete XATT[k];
        } else {
          const D = _DC.getElementById(k);
          if (D) {
            let dx = $(D as HTMLElement);
            $$.O.items(v).forEach(([x, y]) => {
              if (x == "ctx") {
                if (typeof y == "function") {
                  const cxt = y(D) as any;
                  if (dx.inner != cxt) {
                    dx.inner = cxt;
                  }
                }
              } else if (x == "_dom") {
                if (repDOM) {
                  if (!noFunc && typeof y == "function") {
                    if (!isComp && xmid) {
                      const cxt = y(D) as any;
                      const ccx = cxt.__(xmid);
                      dx.inner = ccx.ctx;
                      if ($$.O.keys(ccx.attr).length) {
                        $$.O.ass(XATT, ccx.attr);
                        xtrig(false, true);
                      }
                    }
                  }
                }
              } else if (x == "_dom_comp") {
                if (repDOM) {
                  if (!noFunc && typeof y == "function") {
                    if (isComp) {
                      const cxt = y(D) as any;
                      const ccx = cxt.__(xmid);
                      const ckey = $$.O.keys(ccx.attr);
                      if (!(ckey[0] in XATT)) {
                        dx.inner = ccx.ctx;
                        if (ckey.length) {
                          $$.O.ass(XATT, cxt.attr);
                          xtrig(false, true);
                        }
                        // if (dx.inner != cxt.ctx) {
                        // }
                      }
                    }
                  }
                }
              } else if (x == "on") {
                $$.O.items(y).forEach(([kk, vv]) => {
                  if (kk == "ready") {
                    vv(D);
                  } else if (kk == "resize") {
                    resizeF[k] = vv;
                  } else {
                    dx.on(kk as any, vv);
                  }
                });
                delete XATT[k]["on"];
              } else if (x == "style") {
                const _stl: dict<V> = {};
                $$.O.items(y).forEach(([kk, vv]) => {
                  const nval = vv(D);
                  const dxt = dx.style.get(kk);
                  if (nval != dxt) {
                    _stl[kk] = vv(D);
                  }
                });
                $$.O.keys(_stl).length && dx.style.set(_stl);
              } else {
                if (typeof y == "function") {
                  let yd = y(D);
                  if (Array.isArray(yd)) {
                    yd = yd.filter((y) => y != "").join(" ");
                  }
                  if (dx.attr.get(x) != yd) {
                    dx.attr.set({ [x]: yd });
                  }
                }
              }
            });
          } else {
            delete XATT[k];
          }
        }
      });
  };

  function windowState(xatt: dict<dict<dict<XF> | XF>> = {}) {
    const _DC = document;
    $$.O.items(xatt).forEach(([k, v]) => {
      if ("on" in v) {
        const D = _DC.getElementById(k);
        if (D) {
          if ("ready" in v.on) {
            v.on.ready(D);
            delete v.on.ready;
          }
          if ("resize" in v.on) {
            resizeF[k] = v.on.resize;
            delete v.on.resize;
          }
        }
      }
    });

    window.addEventListener("resize", function () {
      $$.O.items(resizeF).forEach(([k, v]) => {
        const D = _DC.getElementById(k);
        if (D) {
          v(D);
        } else {
          delete resizeF[k];
        }
      });
    });
    //   ------
    XATT = xatt;
    xtrig();
  }

  function remap(arr: Array<fun<any, any>>) {
    return arr.map((v) => {
      if (typeof v == "function") {
        let kv = v();
        if (kv && $$.O.has(kv, "value")) {
          return kv.value;
        } else {
          return kv;
        }
      }
    });
  }

  function watch<T>(
    callback: (...e: T[]) => any,
    ...valsToWatch: Array<fun<any, any>>
  ) {
    let CB: [fun<any, void>, any[]] = [callback, remap(valsToWatch)];
    let XF = $$.new({ dom: "span" });
    XF.onclick = function (e) {
      const [cb, oldArr] = CB;
      if (valsToWatch.length) {
        let oldn = remap(valsToWatch);
        let hasChanged = oldn.some((dx, i) => !(dx == oldArr[i]));
        if (hasChanged) {
          cb(...oldn);
          CB = [cb, oldn];
        }
      } else {
        cb(...oldArr);
      }
    };

    WT.push(XF);
    const [cb, oldArr] = CB;
    return (...initial: any[]) =>
      initial.length ? cb(...initial) : cb(...oldArr);
  }

  function state<T>(
    val: T,
    component = false,
  ): [() => T, (newValue: T) => void] {
    if (val instanceof $dom && component) val.component = true;
    // -----
    let ee: T = val;
    const getValue = (): T => ee;
    const setValue = (newValue: T): void => {
      if (ee === newValue) return;
      // ----
      if (newValue instanceof $dom) {
        if (component) newValue.component = true;
        ee = newValue;
        xtrig(true, false, component);
      } else {
        if (typeof newValue == "object") $$.O.ass(ee as any, newValue);
        else ee = newValue;
        xtrig();
      }
      return;
    };
    return [getValue, setValue];
  }

  /*
  -------------------------
  
  -------------------------
  */
  type C = string | fun<any, string | $dom> | $dom;
  class idm {
    _c = 0;
    id = "";
    constructor(mid?: string) {
      this._c = 0;
      this.id = mid ? mid : $$.makeID(6);
    }
    get i() {
      this._c++;
      return this;
    }
    get mid() {
      return this.id + "_" + this._c;
    }
  }
  function reCamel(_case: string) {
    if (_case.startsWith("webkit")) {
      _case = "--" + _case;
    }
    return _case.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  const vEl = (tag: string) => {
    return (
      [
        "area",
        "base",
        "br",
        "col",
        "command",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ].indexOf(tag) > -1
    );
  };
  function VAL(
    key: string,
    val: V | XF,
    unQ: boolean = false,
    isStyle: boolean = false,
  ): [string, dict<XF> | null] {
    const fatt: dict<XF> = {};
    let flen = 0;
    if (typeof val == "function") {
      fatt[key] = val;
      flen++;
      const [it, _] = VAL(key, "", unQ, isStyle);
      return [it, flen ? fatt : null];
    } else if (typeof val == "boolean") {
      return [key, flen ? fatt : null];
    } else {
      if (val) {
        let _val = val;
        if (key == "href" && !__document) {
          if (val.toString().startsWith("/")) {
            _val = val + ".html";
          }
        }
        return [
          unQ ? `${isStyle ? reCamel(key) : key}:${_val}` : `${key}="${_val}"`,
          flen ? fatt : null,
        ];
      } else {
        return ["", null];
      }
    }
  }
  class render {
    app: (data?: dict<any>) => $dom | $dom[];
    constructor(app: (data?: any) => $dom | $dom[]) {
      this.app = app;
    }
    head(path: string, mid: string, rdata: string) {
      let fs = `<script type="module">`;
      fs += `\nimport x from "${path}";`;
      fs += `\nx.dom(x.id('${mid}'),${rdata});`;
      fs += `\n</script>`;
      return fs;
    }
    dom(mid: idm, data = {}) {
      const TA = this.app(data);
      const _RT = _$("#" + mid.id);
      if (_RT) {
        let FATT: any = {};
        let CT2: string[] = [];
        const XDM = Array.isArray(TA) ? TA : [TA];
        XDM.forEach((ts) => {
          const _ts = ts.__(mid);
          $$.O.ass(FATT, _ts.attr);
          CT2.push(_ts.ctx);
        });
        _RT.inner = CT2.join("");
        xmid = mid;
        windowState(FATT);
      }
    }
    id(mid: string = "") {
      return new idm(mid);
    }
  }
  class $dom {
    _ctx: any[];
    _name: string;
    _attr: dict<V | XF | XD> | null;
    component?: boolean;
    constructor(
      name: string,
      attr: dict<V | XF | XD> | null = null,
      ctx: C[] = [],
    ) {
      this._ctx = ctx;
      this._name = name;
      this._attr = attr;
      this.component = false;
    }
    __(cntr: idm) {
      const f_fatt: dict<dict<dict<XF>>> = {};
      const _attr = [""];
      const _ctx: string[] = [];
      const _fatt: dict<dict<XF>> = {};
      const _name = this._name;
      const _m_attr = this._attr;
      const _ctx_len = this._ctx.length;
      let xid = "";

      // attr

      _m_attr &&
        $$.O.items(_m_attr).forEach(([k, v]) => {
          if (Array.isArray(v)) {
            const vv = v.filter((y) => y != "").join(" ");
            const [it, fat] = VAL(k, vv);
            fat && $$.O.ass(_fatt, fat);
            it && _attr.push(it);
          } else if (typeof v == "object") {
            if (k == "on") {
              $$.O.ass(_fatt, { [k]: v });
            } else {
              const ooo: dict<XF> = {};
              const _itms = $$.O.items(v).reduce<string[]>((v, [kk, vv]) => {
                const [it, fat] = VAL(kk, vv, true, k == "style");
                fat && $$.O.ass(ooo, fat);
                it && v.push(it);
                return v;
              }, []);
              _fatt[k] = ooo;
              const [it, _] = VAL(k, _itms.join(";"));
              it && _attr.push(it);
            }
          } else {
            const [it, fat] = VAL(k, v);
            fat && $$.O.ass(_fatt, fat);
            it && _attr.push(it);
          }
        });

      // CTX

      const CF = (_c: C[]) => {
        _c.forEach((cc) => {
          if (cc instanceof $dom) {
            const _cc = cc.__(cntr);
            $$.O.ass(f_fatt, _cc.attr);
            _ctx.push(_cc.ctx);
          } else if (typeof cc == "function") {
            if (_ctx_len > 1) {
              const dmc = dom("span", {}, cc).__(cntr);
              $$.O.ass(f_fatt, dmc.attr);
              _ctx.push(dmc.ctx);
            } else {
              const ct = cc();
              if (ct instanceof $dom) {
                if (ct.component) {
                  $$.O.ass(_fatt, { _dom_comp: cc });
                } else {
                  $$.O.ass(_fatt, { _dom: cc });
                }
                const _cdm = ct.__(cntr);
                _ctx.push(_cdm.ctx);
                $$.O.ass(_fatt, _cdm.attr);
              } else if (Array.isArray(ct)) {
              } else {
                $$.O.ass(_fatt, { ctx: cc });
                _ctx.push(ct);
              }
            }
          } else {
            if (typeof cc == "object") {
              if (Array.isArray(cc)) {
                CF(cc);
              }
            } else {
              _ctx.push(cc);
            }
          }
        });
      };

      CF(this._ctx);

      const fattlen = $$.O.items(_fatt).some(([a, b]) => {
        if (typeof b == "object") {
          return $$.O.vals(b).length;
        } else if (b) {
          return true;
        }
      });

      if (_m_attr && "id" in _m_attr) {
        xid = _m_attr.id as string;
      }

      if (!xid && fattlen) {
        xid = cntr.mid;
        cntr.i;
        const [it, _] = VAL("id", xid);
        _attr.push(it);
      }

      // -----

      fattlen && (f_fatt[xid] = _fatt);
      let dname = `<${_name}${_attr.join(" ")}>`;
      if (!vEl(_name)) {
        _ctx.length && (dname += _ctx.join("\n"));
        dname += `</${_name}>`;
      }

      return {
        ctx: dname,
        attr: f_fatt,
      };
    }
  }
  return { $dom, render, watch, state };
})();

export function dom(
  name: string | DomFn,
  attr: any,
  ...ctx: any
): InstanceType<typeof $dom> {
  const chl = (attr && attr.chl) || ctx;

  if (typeof name == "function") {
    return name(chl ? { chl, ...attr } : chl, ctx);
  } else {
    return new $dom(name, attr, ctx);
  }
}

/*
-------------------------
Misc
-------------------------
*/

export const { location, loadCSS, loc_hash } = (function () {
  const [loc_hash, $loc_hash] = state<string>("");
  const location = {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
  };

  let pop_storage: dict<string> = {};

  (function () {
    const lhash = window.location.hash;
    if (lhash) {
      location.hash = lhash.replace("#", "");
      $loc_hash(location.hash);
    }
    window.addEventListener("popstate", function (e: PopStateEvent) {
      const targ = e.target as Window;
      const lc: any = {};
      pop_storage = targ.localStorage;
      $$.O.items(targ.location).forEach(([k, v]) => {
        if (k in location) {
          if (k == "hash") {
            v = v.replace("#", "");
            $loc_hash(v);
          }
          lc[k] = v;
        }
      });
      $$.O.ass(location, lc);
    });
  })();

  const rgx = new RegExp(/\/\/(.*?\w.*?$)/);
  function metaURL(meta: string, url: string) {
    let _url = url;
    if (meta) {
      const rgd = rgx.exec(meta);
      if (rgd?.length == 2) {
        let slicer = 0;
        if (url.startsWith("..")) {
          url.split("/").forEach((fu) => {
            if (fu == "..") {
              slicer += 1;
            }
          });
          const rgp = url.split("/").slice(slicer).join("/");
          const drx = rgd[1].split("/").slice(1, -1);
          const rgt = drx.slice(0, drx.length - slicer).join("/");
          _url = rgt + "/" + rgp;
          // -----
        } else if (url.startsWith(".")) {
          const rgp = url.split("/").slice(1).join("/");
          const rgy = rgd[1].split("/").slice(1, -1).join("/");
          _url = rgy + "/" + rgp;
        }
      }
    }
    return "./" + _url;
  }

  function isCSS(href: string) {
    const existingLinks: any = document.querySelectorAll("head link");
    for (const link of existingLinks) {
      if (link.href.indexOf(href.slice(1)) > -1) {
        return true;
      }
    }
    return false;
  }

  function loadCSS(meta: string, url: string) {
    let _url = metaURL(meta, url);
    if (isCSS(_url)) return;

    const style = document.createElement("link");
    $(style).attr.set({
      id: "_css",
      rel: "stylesheet",
      type: "text/css",
      as: "style",
      href: _url,
    });
    document.head.appendChild(style);
  }
  return { location, loadCSS, loc_hash };
})();

export const For = (d: {
  chl?: any;
  each: any[] | object;
  class?: string;
  on?: any;
}) => {
  const RTS: any[] = [];
  if (d.chl) {
    d.chl.forEach((k: any) => {
      if (typeof k == "function") {
        if (Array.isArray(d.each)) {
          RTS.push(...d.each.map(k));
        } else if (typeof d.each == "object") {
          RTS.push(...$$.O.keys(d.each).map(k));
        }
      } else {
        RTS.push(k);
      }
    });
  }

  return dom("div", { class: d.class ?? "", on: d.on }, ...RTS);
};

export const SFor = (
  d:
    | {
        chl?: any;
        each?: any[] | object;
        class?: string;
        on?: any;
        style?: CSSinR | any;
      } & attrD,
) => {
  const RTS: any[] = [];
  if (d.chl) {
    d.chl.forEach((k: any) => {
      if (typeof k == "function") {
        if (Array.isArray(d.each)) {
          RTS.push(...d.each.map(k));
        } else if (typeof d.each == "object") {
          RTS.push(...$$.O.keys(d.each).map(k));
        }
      } else {
        RTS.push(k);
      }
    });
  }

  delete d.chl;
  delete d.each;

  return dom("g", d as any, ...RTS);
};