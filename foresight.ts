/// <reference path="./types.d.ts" />

export interface dict<T> {
  [Key: string]: T;
}
type V = string | number | boolean;
type S = string | string[] | ((e?: Element) => S);
type MS = dict<(e?: Element) => S>;
type fun<E, T> = (e?: E) => T;
type STYLE = V | ((e?: Element) => V);
type CSSinT = {
  [P in keyof CSSStyleDeclaration]?: STYLE;
};
type DV = V | dom;
type ctx = DV | DV[] | (() => DV | DV[]);
export type $ = ReturnType<typeof $>;
export type _$ = ReturnType<typeof _$>;

/*
-------------------------
Edit and make other values either Array of V
-------------------------
*/

let XATT: dict<dict<MS> | MS> = {};

export const { $dom, render, watch, state } = (function () {
  const WT: HTMLElement[] = [];
  const _DC = document;
  const resizeF: dict<(e?: HTMLElement) => void> = {};
  const unloadF: dict<(e?: HTMLElement) => void> = {};
  const popstateF: dict<(e?: HTMLElement) => void> = {};

  class idm {
    _c = 0;
    id = "";
    constructor(mid?: string) {
      this._c = 0;
      this.id = mid ? mid : $$.makeID(5);
      if (mid && mid.indexOf("_") > 1) {
        const [xid, xin] = mid.split("_");
        this.id = xid;
        this._c = parseInt(xin);
      }
    }
    get mid() {
      return this.id + "_" + ++this._c;
    }
  }

  function dom_trig(dx: $, yy: any): boolean {
    if (typeof yy == "function") {
      const dm = yy(dx.e) as any;
      let mid = dx.id;
      if (mid) {
        let ndm = new idm(mid);
        const [actx, fctx] = _CTX(dm, ndm);
        if (dx.inner.trim() != actx) {
          fctx &&
            $$.O.keys(fctx).forEach((fc) => {
              const xs = XATT[fc];
              if (xs)
                $$.O.keys(xs).forEach((fcc) => {
                  delete XATT[fc][fcc];
                });
            });
          dx.inner = actx;
          $$.O.ass(XATT, fctx);

          return true;
        }
      }
    }
    return false;
  }
  function trig(by: string, affectChildren = false, noDom = true) {
    if (XATT) {
      $$.O.items(XATT).forEach(([k, v]) => {
        if ($$.O.keys(v).length) {
          const D = _DC.getElementById(k);
          if (D) {
            let dx = $(D);
            let domOnly = false;
            if (noDom) {
              domOnly = dom_trig(dx, v[affectChildren ? "dom" : "dom_ctx"]);
            }
            if (domOnly) {
              trig("doms", false, false);
            } else {
              $$.O.items(v).forEach(([x, y]) => {
                if (x == "dom" || x == "dom_ctx") {
                } else if (x == "ctx") {
                  const cxt = y(D) as any;
                  const [ic, _] = _CTX(cxt);
                  if (dx.inner != ic) {
                    dx.inner = ic;
                  }
                } else if (x == "on") {
                  delete XATT[k]["on"];
                  $$.O.items(y).forEach(([kk, vv]) => {
                    if (typeof vv == "function") {
                      let xvv = vv as (e?: HTMLElement | undefined) => void;
                      if (kk == "ready") {
                        vv(D);
                      } else if (kk == "resize") {
                        resizeF[k] = xvv;
                      } else if (kk == "unload") {
                        unloadF[k] = xvv;
                      } else if (kk == "popstate") {
                        popstateF[k] = xvv;
                      } else {
                        dx.on(kk as any, xvv);
                      }
                    }
                  });
                } else if (x == "style") {
                  const _stl: dict<V> = {};
                  $$.O.items(y).forEach(([kk, vv]) => {
                    if (typeof vv == "function") {
                      const nval = vv(D);
                      const dxt = dx.style.get(kk);
                      if (nval != dxt) {
                        _stl[kk] = vv(D);
                      }
                    }
                  });
                  $$.O.keys(_stl).length && dx.style.set(_stl);
                } else {
                  let yd = y(D);
                  if (Array.isArray(yd)) {
                    yd = yd.filter((y) => y != "").join(" ");
                  }
                  if (dx.attr.get(x) != yd) {
                    dx.attr.set({ [x]: yd });
                  }
                }
              });
            }
          } else {
            delete XATT[k];
          }
        } else {
          delete XATT[k];
        }
      });

      WT.forEach((c) => {
        c.click();
      });
    }
  }
  function windowState() {
    window.addEventListener("resize", function (e: UIEvent) {
      const targ = e.target;
      $$.O.items(resizeF).forEach(([k, v]) => {
        const D = _DC.getElementById(k);
        let vv = v as any;
        if (D) {
          vv(D, targ);
        } else {
          delete resizeF[k];
        }
      });
    });
    //   ------
    window.addEventListener("beforeunload", function (e: BeforeUnloadEvent) {
      const targ = e.target;
      $$.O.items(unloadF).forEach(([k, v]) => {
        const D = _DC.getElementById(k);
        let vv = v as any;
        if (D) {
          vv(D, targ);
        } else {
          delete unloadF[k];
        }
      });
    });

    window.addEventListener("popstate", function (e: PopStateEvent) {
      const targ = e.target;
      $$.O.items(popstateF).forEach(([k, v]) => {
        const D = _DC.getElementById(k);
        let vv = v as any;
        if (D) {
          vv(D, targ);
        } else {
          delete popstateF[k];
        }
      });
    });

    // Maintain the scrollPosition in session
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
    callback: (...e: any[]) => any,
    ...valsToWatch: Array<fun<any, any>>
  ) {
    let XF = $$.new({ dom: "span" });
    //
    let CB: [fun<any, void>, any[]] = [callback, remap(valsToWatch)];
    XF.onclick = function (e) {
      const [cb, oldArr] = CB;

      if (valsToWatch.length) {
        let oldn = remap(valsToWatch);
        let hasChanged = oldn.some((dx, i) => {
          return !(dx == oldArr[i]);
        });
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
  const reValDom = (vx: any, affect: boolean) => {
    if (vx instanceof $dom && affect) {
      vx.component = false;
    } else if (Array.isArray(vx)) {
      vx.forEach((vc) => {
        reValDom(vc, affect);
      });
    }
  };
  function state<T>(
    val: T,
    affectChildren = false,
  ): [() => T, (newValue: T) => void] {
    reValDom(val, affectChildren);
    let ee: T = val;
    const getValue = (): T => ee;
    const setValue = (newValue: T): void => {
      if (ee === newValue) return;
      reValDom(newValue, affectChildren);
      ee = newValue;
      trig("state", affectChildren);
    };
    return [getValue, setValue];
  }
  /*
  -------------------------
  
  -------------------------
  */

  function reCamel(_case: string) {
    if (_case.startsWith("webkit")) {
      _case = "--" + _case;
    }
    return _case.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  const noX = (tag: string) => {
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

  function _ATTR(
    key: string,
    val: any,
    style = false,
  ): [dict<string>, MS | dict<MS> | null] {
    const vtype = typeof val,
      isarr = Array.isArray(val),
      fatt: MS | dict<MS> = {};
    if (vtype == "function") {
      const vt = val();
      const [atd, _] = _ATTR(key, vt);
      $$.O.ass(fatt, { [key]: val });
      return [atd, fatt];
    } else if (!isarr && vtype == "object") {
      if (style) {
        const svt = $$.O.items(val)
          .map(([ss, vv]) => {
            let xss = reCamel(ss);
            let _vv = vv;
            if (typeof vv == "function") {
              if (!("style" in fatt)) fatt["style"] = {};
              _vv = vv();
              $$.O.ass(fatt["style"], { [xss]: vv });
            }
            return `${xss}:${_vv}`;
          })
          .join(";");
        return [{ style: svt }, fatt];
      }
      return [{}, fatt];
    } else {
      let _val = isarr ? val.flat() : [val];
      let kk = {
        [key]: _val
          .map((s) => {
            return typeof s == "boolean" ? (s ? "" : "false") : String(s);
          })
          .join(" "),
      };
      return [kk, null];
    }
  }
  function _CTX(val: any, pid: idm = new idm()): [string, MS | null, boolean] {
    const fatt: MS = {};
    let _xval = Array.isArray(val) ? val.flat() : [val];
    let component = true;
    const KV = _xval
      .map((e) => {
        if (e instanceof $dom) {
          component = e.component;
          const ed = e.__(pid);
          $$.O.keys(ed.attr).length && $$.O.ass(fatt, ed.attr);
          return ed.ctx;
        } else if (typeof e == "object") {
          return JSON.stringify(e);
        } else {
          return String(e == undefined ? "" : e);
        }
      })
      .join("");
    return [KV, fatt, component];
  }

  // ---
  class render {
    app: (data?: any) => dom | dom[];
    constructor(app: (data?: any) => dom | dom[]) {
      this.app = app;
    }
    dom(data = {}) {
      let noscrp = `<noscript>You need to enable JavaScript to run this app.</noscript>`;
      const _XRT = $(document.body);
      const _id = new idm(_XRT.id + "_0");
      const TA = this.app(data);
      const XDM = Array.isArray(TA) ? TA : [TA];
      XDM.reverse().forEach((ts) => {
        const its = ts.__(_id);
        $$.O.ass(XATT, its.attr);
        _XRT.appendfirst = its.ctx;
      });
      _XRT.appendfirst = noscrp;

      trig("render");
      windowState();
    }
  }

  class $dom {
    name: string;
    _attr: attr;
    _ctx: ctx[];
    component: boolean;
    constructor(name: string, attr: attr, ...ctx: ctx[]) {
      this.name = name;
      this._attr = attr;
      this._ctx = ctx;
      this.component = true;
    }
    __(pid: idm = new idm()): { ctx: string; attr: dict<dict<MS> | MS> } {
      let xid = pid.mid;
      const f_fatt: dict<dict<MS> | MS> = {};
      const dom_fun: dict<MS> | MS = {};
      const attr_dct: dict<string> = {};
      const _ctx: string[] = [];
      if (this._attr) {
        $$.O.items(this._attr).forEach(([k, v]) => {
          if (k != "__") {
            if (k == "on") {
              $$.O.ass(dom_fun, { [k]: v });
            } else {
              const [atd, ftd] = _ATTR(k, v, k == "style");
              $$.O.ass(attr_dct, atd);
              $$.O.ass(dom_fun, ftd);
            }
          }
        });
      }
      //

      const _reCTX = (vl: DV | DV[], _pid: idm) => {
        const [actx, fctx, isco] = _CTX(vl, _pid);
        _ctx.push(actx);
        $$.O.ass(f_fatt, fctx);
        return isco;
      };

      const x_len = this._ctx.length;
      this._ctx.forEach((ct) => {
        if (typeof ct == "function") {
          if (x_len > 1) {
            _reCTX(dom("span", {}, ct), pid);
          } else {
            const vt = ct();
            let ndx = new idm();
            xid = ndx.mid;
            //
            if (vt instanceof $dom) {
              const dtype = _reCTX(vt, ndx) ? "dom_ctx" : "dom";
              $$.O.ass(dom_fun, { [dtype]: ct });
            } else {
              const [actx, fctx, isco] = _CTX(vt, ndx);
              if (fctx && $$.O.keys(fctx).length) {
                const dtype = isco ? "dom_ctx" : "dom";
                $$.O.ass(dom_fun, { [dtype]: ct });
              } else {
                $$.O.ass(dom_fun, { ctx: ct });
              }
              _ctx.push(actx);
              $$.O.ass(f_fatt, fctx);
            }
          }
        } else {
          _reCTX(ct, pid);
        }
      });

      /*
      -------------------------
      
      -------------------------
      */

      if ($$.O.keys(dom_fun).length) {
        if ("id" in attr_dct) {
          xid = attr_dct.id;
        } else {
          attr_dct.id = xid;
        }
        f_fatt[xid] = dom_fun;
      }

      const _attr_txt = $$.O.items({ ...{ __: 0 }, ...attr_dct })
        .map(([k, v]) => {
          return k == "__" ? "" : v ? `${k}="${v}"` : k;
        })
        .join(" ");

      const name = this.name;
      let dname = `<${name}${_attr_txt}>`;
      if (!noX(name)) {
        _ctx.length && (dname += _ctx.join(""));
        dname += `</${name}>`;
      }

      return {
        ctx: dname,
        attr: f_fatt,
      };
    }
  }
  return { $dom, render, watch, state };
})();

// Return div, class attributes of flex

export function dom(
  name: string | ((attr: attr, ...ctx: ctx[]) => dom),
  attr: attr,
  ...ctx: ctx[]
): dom {
  if (typeof name == "function") {
    let __: any = ctx;
    if (attr && "__" in attr) {
      __ = attr.__;
      delete attr.__;
    }
    return name(__ ? { ...attr, __ } : __, ...ctx);
  } else {
    return new $dom(name, attr, ...ctx);
  }
}

export function frag(r: any, ...d: ctx[]) {
  return d;
}

/*
-------------------------

-------------------------
*/

export const { $, _$, $$, $E, eventStream } = (function () {
  type kf = KeyframeAnimationOptions;
  type kfanim = (options?: kf) => anim;

  //
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
        smd: innerWidth >= 624,
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
    static computedBG(e: _$) {
      return window.getComputedStyle(e!.e).backgroundColor;
    }
    static computed(e: _$) {
      return window.getComputedStyle(e!.e);
    }
    static proper(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    static markdown(markdownText: string) {
      const regex = {
        header: /^#+\s+(.+)/gm,
        bold: /\*\*(.*)\*\*/g,
        italic: /\*(.*)\*/g,
        link: /\[(.*?)\]\((.*?)\)/g,
      };

      let html = markdownText;

      // Replace headers
      html = html.replace(regex.header, (match, content) => {
        let level = match.match(/^#+/)?.[0].length;
        return `<h${level}>${content}</h${level}>`;
      });

      // Replace bold
      html = html.replace(regex.bold, "<b>$1</b>");

      // Replace italics
      html = html.replace(regex.italic, "<i>$1</i>");

      // Replace links
      html = html.replace(regex.link, '<a href="$2">$1</a>');

      return html;
    }
    static strDateToLocale(strd: string) {
      return new Date(parseInt(strd)).toLocaleString();
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
    get all(): _dom[] {
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
        const vl = val.__();
        $$.O.ass(XATT, vl.attr);
        this.e.insertAdjacentHTML("beforeend", vl.ctx);
      } else {
        this.e.insertAdjacentHTML("beforeend", val);
      }
    }
    set appendfirst(val: any) {
      if (val instanceof $dom) {
        const vl = val.__();
        $$.O.ass(XATT, vl.attr);
        this.e.insertAdjacentHTML("afterbegin", vl.ctx);
      } else {
        this.e.insertAdjacentHTML("afterbegin", val);
      }
    }
    get children() {
      return Array.from(this.e.children).map<_dom>((a) => $(a as HTMLElement));
    }
    get click() {
      this.e.click();
      return this;
    }
    get focus() {
      this.e.focus();
      return this;
    }
    get rect() {
      return this.e.getBoundingClientRect();
    }
    get style() {
      const CC = this.e.style;
      const TT = this;
      return {
        set: function (style: CSSinT | dict<V>, delay = 0) {
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
      if (val instanceof $dom) {
        const vl = val.__();
        $$.O.ass(XATT, vl.attr);
        this.e.innerHTML = vl.ctx;
      } else {
        this.e.innerHTML = val;
      }
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

    get value() {
      let tval = this.e as any;
      return tval.value ?? "";
    }
    set value(vl: any) {
      let tval = this.e as any;
      tval.value = vl;
    }
    set disabled(vl: boolean) {
      let tval = this.e as any;
      if ("disabled" in tval) {
        tval.disabled = vl;
      }
    }
    get disabled() {
      let tval = this.e as any;
      if ("disabled" in tval) {
        return tval.disabled;
      }
      return false;
    }
    get submit() {
      let tval = this.e as any;
      if ("submit" in tval) {
        return tval.submit();
      }
      return false;
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
      keyframes: (CSSinT | dict<V>)[] | CSSinT | dict<V>,
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
    timed(fn: (ee?: _dom) => void, timeout = 250) {
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
    animate(keyframes: CSSinT[] | CSSinT, options: kf = {}) {
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

  const eventSources: dict<EventSource> = {};
  const eventListener: dict<dict<((a: MessageEvent) => void)[]>> = {};
  class eStream {
    stream: EventSource;
    url: string;
    constructor(eurl: string, withCredentials: boolean) {
      this.url = eurl;
      if (eurl in eventSources) {
        this.stream = eventSources[eurl];
      } else {
        this.stream = new EventSource(eurl, {
          withCredentials: withCredentials,
        });
        eventSources[eurl] = this.stream;
        eventListener[this.url] = {};
      }
    }
    on(event: dict<(a: MessageEvent) => void>) {
      const strm = this.stream;
      $$.O.items(event).forEach(([kk, vv]) => {
        if (kk in eventListener[this.url]) {
          eventListener[this.url][kk].forEach((lt) => {
            this.stream.removeEventListener(kk, lt);
          });
          eventListener[this.url][kk] = [];
        }
        // Then
        strm.addEventListener(kk, vv);
        if (!(kk in eventListener[this.url])) {
          eventListener[this.url][kk] = [];
        }
        eventListener[this.url][kk].push(vv);
      });
      return this;
    }
  }
  function eventStream(url: string, withCredentials = true) {
    return new eStream(url, withCredentials);
  }

  return { $, _$, $$, $E, eventStream };
})();

/*
-------------------------
Local
-------------------------
*/
export const { local, session } = (function () {
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

  return { local, session };
})();

export const { loadCSS, For, preload } = (function () {
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
      if ("rel" in link) {
        if (link.href.indexOf(href.slice(1)) > -1) {
          return true;
        }
      }
    }
    return false;
  }

  function loadCSS(importmeta: string, url: string) {
    let _url = metaURL(importmeta, url);
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

  const For = (
    d: attr & {
      each?: any[] | object;
    },
    ...X: dom[]
  ) => {
    const RTS: any[] = [];
    const de = d.each;
    delete d.each;
    X.forEach((k: any) => {
      if (typeof k == "function") {
        if (Array.isArray(de)) {
          RTS.push(...de.map(k));
        } else if (typeof de == "object") {
          RTS.push(...$$.O.keys(de).map(k));
        }
      } else {
        RTS.push(k);
      }
    });

    return dom("div", { ...d }, ...RTS);
  };

  function preload(url: string, as: string, type: string) {
    if (isCSS(url)) return url;
    const style = document.createElement("link");
    $(style).attr.set({
      rel: "preload",
      type: type,
      as: as,
      href: url,
    });

    if (as == "font") {
      $(style).attr.set({
        crossorigin: "anonymous",
      });
    }
    document.head.appendChild(style);
    return url;
  }

  return { loadCSS, For, preload };
})();
