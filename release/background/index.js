{
  const a = this,
    { window: e } = a,
    t = "Violentmonkey",
    n = "auto",
    o = "content",
    i = "expose",
    s = "forceContent",
    r = "ids",
    l = -1,
    c = "injectInto",
    u = "more",
    d = "page",
    m = "runAt",
    h = "scripts",
    g = "values",
    p = "response",
    f = "responseHeaders",
    k = "responseText",
    b = "responseType",
    y = "sessionId",
    v = "top",
    w = "xhrType",
    x = "SkipScripts",
    z = (a) => "function" == typeof a,
    j = (a) => null != a && "object" == typeof a,
    S = "fileName",
    {
      Boolean: q,
      Error: $,
      Object: I,
      Promise: M,
      addEventListener: C,
      removeEventListener: U,
      chrome: D,
      performance: R,
    } = a,
    T = M,
    _ = $,
    { apply: A } = Reflect,
    L = A.call.bind({}.hasOwnProperty),
    E = I.call.bind(I.call),
    O = "isApplied",
    P = "contextualIdentities" in D,
    H = "#" + h,
    N = D.runtime.getURL("/"),
    F = N.slice(0, -1),
    W = D.runtime.getManifest(),
    B = D.runtime.getURL(W.options_ui.page).split("#", 1)[0],
    V = D.runtime.getURL(W.icons[16].replace("16.png", "")),
    G = "settings",
    K = "browser_action",
    J = "documentId",
    Y = "frameId",
    X = "inject",
    Z = "multi",
    Q = "windowId"
  ;(() => {
    "use strict"
    var U
    let { browser: aa } = a
    if (P || (null != (U = aa) && U.runtime));
    else {
      const { Proxy: e } = a,
        { bind: t } = e,
        n = "message",
        o = "stack",
        i = (a) => "addListener" === a || "removeListener" === a || "hasListener" === a || "hasListeners" === a,
        s = (a, e, n, o) => {
          const s = n[e]
          if (void 0 === s) return
          let c
          return (
            (c = z(o)
              ? o(n, s)
              : z(s)
                ? 0 === o || i(e) || !L(n, e)
                  ? E(t, s, n)
                  : l(n, s)
                : j(s) && 0 !== o
                  ? r(s, o)
                  : s),
            (a[e] = c),
            c
          )
        },
        r = (a, t) =>
          new e(
            { __proto__: null },
            {
              __proto__: null,
              get: (e, n) => {
                var o
                return null != (o = e[n]) ? o : s(e, n, a, null == t ? void 0 : t[n])
              },
            }
          ),
        l =
          (a, e, t) =>
          (...i) => {
            let s, r
            const l = new T((a, e) => {
                ;(s = a), (r = e)
              }),
              c = new _(`callstack before invoking ${e.name || "chrome API"}:`)
            return (
              E(e, a, ...i, (a) => {
                const e = D.runtime.lastError,
                  i = e || (t ? t(s, a) : s(a))
                i && (e || (c[o] = `${i[1]}\n${c[o]}`), (c[n] = e ? i[n] : `${i[0]}`), (c.isRuntime = !!e), r(c))
              }),
              l
            )
          },
        c = (a, e) => [null != a ? a : null, e && (e[n] ? [e[n], e[o]] : [e, new _()[o]])],
        u = async (a, e) => {
          try {
            e(c(await a))
          } catch (a) {
            e(c(0, a))
          }
        },
        d = (a, e, t, n) => {
          try {
            const o = a(e, t)
            if (o && o instanceof M) return u(o, n), !0
            void 0 !== o && n(c(o))
          } catch (a) {
            n(c(0, a))
          }
        },
        m = (a, e) => (e ? e[1] : "null response") || a(e[0]),
        h = (a, e) => l(a, e, m)
      aa = a.browser = r(D, {
        extension: 0,
        i18n: 0,
        runtime: {
          connect: 0,
          getManifest: 0,
          getURL: 0,
          onMessage: { addListener: (a, e) => (n) => E(e, a, E(t, d, null, n)) },
          sendMessage: h,
        },
        tabs: { connect: 0, sendMessage: h },
      })
    }
    const ea = "charset=UTF-8",
      ta = "application/x-www-form-urlencoded",
      na = "inferred",
      oa = "homepageURL",
      ia = "supportURL",
      sa = /((?:^|\n)\s*\/\/\x20==UserScript==)([\s\S]*?\n)\s*\/\/\x20==\/UserScript==|$/,
      ra = "metaStr",
      la = /\n((?!\n)\s)*$/,
      ca = "watchStorage",
      ua = a.browser,
      da = 864e5,
      ma = "blacklist",
      ha = `${ma}Errors`,
      ga = /^document-(start|body|end|idle)$/,
      pa = { [n]: 1, [d]: 1, [o]: 1 },
      fa = { cache: "no-cache" },
      ka = Symbol("code"),
      ba = ["userAgent", "brands", "mobile", "platform"],
      ya = "topLevelAwait",
      va = "unwrap"
    let wa
    function xa(a) {
      return null == a ? [] : Array.isArray(a) ? a : `${a}`.split(".").filter(q)
    }
    function za(a, e) {
      for (let t = 0, n = xa(e); t < n.length; t++) {
        const e = n[t]
        if (!a || "object" != typeof a) break
        a = a[e]
      }
      return a
    }
    function ja(a, e, t, n) {
      e = xa(e)
      let o,
        i = a || {}
      for (let a = 0; (o = e[a]), a < e.length - 1; a += 1) i = i[o] || (i[o] = {})
      return void 0 === t ? delete i[o] : (i[o] = t), n ? i : a
    }
    function Sa(a, e, t) {
      const n = {}
      for (let o = 0; o < e.length; o++) {
        const i = e[o]
        let s = null == a ? void 0 : a[i]
        t && (s = t(s, i)), void 0 !== s && (n[i] = s)
      }
      return n
    }
    function qa(a, e, t) {
      const n = {}
      for (let o = 0, i = I.keys(this); o < i.length; o++) {
        let s = i[o]
        const r = this[s]
        ;(e && !(s = E(e, t, s, r, this))) || (n[s] = a ? E(a, t, r, s, this) : r)
      }
      return n
    }
    function $a(a, e) {
      this && I.entries(this).forEach(a, e)
    }
    function Ia(a, e) {
      this && I.keys(this).forEach(a, e)
    }
    function Ma(a, e) {
      this && I.values(this).forEach(a, e)
    }
    function Ca(a) {
      return a && "object" == typeof a ? (Array.isArray(a) ? [].concat(a).map(Ca) : E(qa, a, Ca)) : a
    }
    function Ua(a, e) {
      let t
      if (a && e && typeof a == typeof e && "object" == typeof a)
        if (Array.isArray(a)) t = a.length === e.length && a.every((a, t) => Ua(a, e[t]))
        else {
          const n = I.keys(a)
          t = n.length === I.keys(e).length && n.every((t) => Ua(a[t], e[t]))
        }
      else t = a === e
      return t
    }
    function Da(a, e) {
      if (a !== e)
        return a && "object" == typeof a
          ? e && "object" == typeof e
            ? ((wa = !1), (a = (Array.isArray(a) ? Ra : Ta)(a, e)), wa ? a : void 0)
            : Ca(a)
          : a
    }
    function Ra(a, e) {
      const t = []
      a.length !== e.length && (wa = !0)
      for (let n, o, i = 0; i < a.length; i++)
        (n = a[i]),
          (o = e[i]),
          n && "object" == typeof n
            ? o && "object" == typeof o
              ? (n = (Array.isArray(n) ? Ra : Ta)(n, o))
              : ((n = Ca(n)), (wa = !0))
            : n !== o && (wa = !0),
          (t[i] = n)
      return t
    }
    function Ta(a, e) {
      const t = {}
      for (const t in e)
        if (!L(a, t)) {
          wa = !0
          break
        }
      for (const n in a) {
        let o = a[n],
          i = e[n]
        o && "object" == typeof o
          ? i && "object" == typeof i
            ? (o = (Array.isArray(o) ? Ra : Ta)(o, i))
            : ((o = Ca(o)), (wa = !0))
          : o !== i && (wa = !0),
          (t[n] = o)
      }
      return t
    }
    function _a(a) {
      return void 0 === a
        ? 0
        : !0 === a || null == a
          ? 4
          : !1 === a
            ? 5
            : "string" == typeof a
              ? a.length + 2
              : "object" != typeof a
                ? `${a}`.length
                : Array.isArray(a)
                  ? a.reduce((a, e) => a + 1 + _a(e), 2)
                  : I.keys(a).reduce((e, t) => e + t.length + 4 + _a(a[t]), 2)
    }
    function Aa(a, e) {
      return a[e] || (a[e] = {})
    }
    const La = (function (a) {
      const e = I.create(null)
      return function (...t) {
        const n = 1 === t.length ? `${t[0]}` : JSON.stringify(t),
          o = e[n]
        return void 0 !== o || L(e, n) ? o : (e[n] = A(a, this, t))
      }
    })((a, e) => D.i18n.getMessage(a, e) || a)
    function Ea(a, e) {
      let t, n, o
      function i() {
        ;(n = null), R.now() >= t ? o() : s()
      }
      function s() {
        if (!n) {
          const a = t - R.now()
          n = setTimeout(i, a)
        }
      }
      return (
        (e = Math.max(0, +e || 0)),
        function (...n) {
          ;(t = R.now() + e),
            (o = () => {
              ;(o = null), a.apply(this, n)
            }),
            s()
        }
      )
    }
    function Oa() {}
    function Pa(a = 10, e = 0) {
      for (let t = ""; (t += Math.random().toString(36).slice(2)); ) if (t.length >= a) return e ? t.slice(0, e) : t
    }
    function Ha(a = "VM") {
      return a + Pa()
    }
    function Na(a, e = 0, t = 1e99) {
      const n = 8192,
        o = [],
        i = a.length,
        s = Math.min(i || a.byteLength, e + t),
        r = null == i || e || s > n
      for (; e < s; e += n) o.push(String.fromCharCode.apply(null, r ? new Uint8Array(a, e, Math.min(n, s - e)) : a))
      return o.join("")
    }
    function Fa(a, e = 0, t = 1e99) {
      return (
        (e || t < a.size) && (a = a.slice(e, e + t)),
        a.size
          ? new M((e) => {
              const t = new FileReader()
              t.readAsDataURL(a),
                (t.onload = () => {
                  const a = t.result
                  e(a.slice(a.indexOf(",") + 1))
                })
            })
          : ""
      )
    }
    function Wa(a) {
      const e = a.indexOf(","),
        t = a.slice(0, e)
      return (
        (a = decodeURIComponent(a.slice(e + 1))),
        (a = /(^|;)\s*base64\s*(;|$)/.test(t) ? atob(a) : a),
        /[\x80-\xFF]/.test(a) ? new TextDecoder().decode(Ba(a)) : a
      )
    }
    function Ba(a) {
      const e = a.length,
        t = new Uint8Array(e)
      for (let n = 0; n < e; n += 1) t[n] = a.charCodeAt(n)
      return t
    }
    const Va = /^(.*?)-([-.0-9a-z]+)|$/i,
      Ga = /^\d+$/
    function Ka(a, e) {
      const [, t = a || "", n] = Va.exec(a),
        [, o = e || "", i] = Va.exec(e),
        s = Ja(t, o) || !n - !i || (n && Ja(n, i, !0))
      return s < 0 ? -1 : +!!s
    }
    function Ja(a, e, t) {
      const n = a.split("."),
        o = e.split("."),
        i = n.length,
        s = o.length,
        r = (t ? Math.min : Math.max)(i, s)
      let l
      for (let a = 0; !l && a < r; a += 1) {
        const e = n[a],
          i = o[a]
        l = t
          ? Ga.test(e) && Ga.test(i)
            ? e - i
            : e > i || (e < i && -1)
          : (parseInt(e, 10) || 0) - (parseInt(i, 10) || 0)
      }
      return l || (t && i - s)
    }
    function Ya(a) {
      for (const e in a) if (L(a, e)) return !1
      return !0
    }
    function Xa(a) {
      return Array.isArray(a) ? a : [a]
    }
    const Za = ["blob", "arraybuffer"]
    async function Qa(a, e = {}) {
      return new M((t, n) => {
        const o = new XMLHttpRequest(),
          i = { headers: { get: (a) => o.getResponseHeader(a) }, url: a },
          { [b]: s } = e
        o.open("GET", a, !0),
          Za.includes(s) && (o[b] = s),
          (o.onload = () => {
            if (((i.status = o.status || 200), (i.data = o[Za.includes(s) ? p : k]), "json" === s))
              try {
                i.data = JSON.parse(i.data)
              } catch (a) {}
            t(i)
          }),
          (o.onerror = () => {
            ;(i.status = -1), n(i)
          }),
          o.send()
      })
    }
    const ae =
        /^(file:|about:|data:|https?:\/\/([^@/]*@)?(localhost|127\.0\.0\.1|(192\.168|172\.16|10\.0)\.\d+\.\d+|\[(::1|(fe80|fc00)::[.:0-9a-f]+)]|[^/:]+\.(test|example|invalid|localhost))(:\d+|\/|$))/i,
      ee = (a) => /^data:/i.test(a),
      te = (a) => /^https?:\/\//i.test(a) && oe(a),
      ne = (a) => a && !ae.test(decodeURI(a))
    function oe(a) {
      try {
        if (a && new URL(a)) return a
      } catch (a) {}
    }
    async function ie(a, e = {}) {
      if (a.startsWith("file:")) return Qa(a, e)
      const { body: t, headers: n, [b]: o } = e,
        i = t && "[object Object]" === E({}.toString, t),
        [, s, r, l, c] = a.match(/^([-\w]+:\/\/)([^@/]*@)?([^/]*)(.*)|$/),
        u = ("greasyfork.org" === l || "sleazyfork.org" === l) && "application/javascript, text/plain, text/css",
        d = I.assign({}, !ne(a) && fa, e, {
          body: i ? JSON.stringify(t) : t,
          headers:
            i || u || r
              ? I.assign(
                  {},
                  n,
                  i && { "Content-Type": "application/json" },
                  r && { Authorization: `Basic ${btoa(decodeURIComponent(r.slice(0, -1)))}` },
                  u && { accept: u }
                )
              : n,
        })
      let m = { url: a, status: -1 }
      try {
        const e = r ? s + l + c : a,
          t = await fetch(e, d),
          n = { arraybuffer: "arrayBuffer", blob: "blob", json: "json" }[o] || "text"
        ;(m.status = t.status || 200), (m.headers = t.headers), (m.data = await t[n]())
      } catch (e) {
        ;(m = I.assign(e, m)), (m.message += "\n" + a)
      }
      if (m.status < 0 || m.status > 300) throw m
      return m
    }
    function se(a) {
      return a.replace(/[^\w.-]/g, "")
    }
    function re(a) {
      return a.replace(/[\\.?+[\]{}()|^$]/g, "\\$&")
    }
    const le = () => D.runtime.lastError,
      ce = ua.windows,
      ue = `${V}128.png`,
      de = /[#/?]/g,
      me = (a) => String.fromCharCode(a.charCodeAt(0) - 32 + 65280),
      he = /(Receiving end does not exist)|The message port closed before|moved into back\/forward cache|$/
    function ge() {
      const a = new Set()
      return {
        hook: (e) => (a.add(e), () => a.delete(e)),
        fire(...e) {
          a.forEach((a) => a(...e))
        },
      }
    }
    function pe(a, e, t) {
      return P && j(e) && (e = Ca(e)), ke({ cmd: a, data: e }, t)
    }
    function fe(a, e, t, n) {
      return ua.tabs.sendMessage(a, { cmd: e, data: t }, n).catch(ye)
    }
    function ke(a, { retry: e } = {}) {
      if (e) return be(a)
      let t = ua.runtime.sendMessage(a)
      return (t = t.catch(ye)), t
    }
    async function be(a, e = 1e4) {
      for (let n = R.now(); R.now() - n < e; ) {
        try {
          const e = await ke(a)
          if (void 0 !== e) return e
        } catch (a) {
          if (!he.exec(a)[1]) throw a
        }
        await ua.storage.local.get(t)
      }
      throw new $(t + " cannot connect to the background page.")
    }
    function ye(a) {
      if (!he.exec(a)[0]) return M.reject(a)
    }
    function ve(a) {
      var e
      let t
      return (
        a.custom[oa] ||
        (t = a.meta)[oa] ||
        (null == (e = a[na]) ? void 0 : e[oa]) ||
        t.homepage ||
        t.website ||
        t.source
      )
    }
    function we(a) {
      var e
      return a.meta[ia] || (null == (e = a[na]) ? void 0 : e[ia])
    }
    function xe(a) {
      var e, t, n
      return (
        a.custom.name ||
        ((t = a.meta),
        (n = "name"),
        navigator.languages.map((a) => t[`${n}:${a}`] || t[`${n}:${a.toLowerCase()}`]).find(q) || t[n] || "") ||
        `#${null != (e = a.props.id) ? e : La("labelNoName")}`
      )
    }
    function ze(a) {
      var e
      return (null == (e = `${a.custom[m] || a.meta[m] || ""}`.match(ga)) ? void 0 : e[1]) || "end"
    }
    function je(a, e) {
      return `${N}${e && P ? "%20" : ""}${encodeURIComponent((e || xe(a)).replace(de, me))}.user.js#${a.props.id}`
    }
    function Se(a, { all: e, allowedOnly: t, enabledOnly: n } = {}) {
      if ((!t || a.config.shouldUpdate) && (!n || a.config.enabled)) {
        const { custom: t, meta: n } = a,
          o = oe(t.downloadURL || n.downloadURL || t.lastInstallURL),
          i = oe(t.updateURL || n.updateURL || o),
          s = o || i
        if (s) return e ? [o, i] : s
      }
    }
    function qe(a, e) {
      let t
      try {
        t = new URL(a, e)
      } catch (e) {
        return `data:,${e.message} ${a}`
      }
      return ["http:", "https:", "ftp:", "data:"].includes(t.protocol) || (t.protocol = "http:"), t.href
    }
    function $e(a) {
      return a.replace(/[-\\/:*?"<>|%\s]/g, (a) => {
        let e = a.charCodeAt(0).toString(16)
        return e.length < 2 && (e = `0${e}`), `-${e}`
      })
    }
    async function Ie(a = -2) {
      return (
        (await ua.tabs.query({ active: !0, [Q]: a }))[0] ||
        (ce && (await ua.tabs.query({ active: !0, [Q]: (await ce.getCurrent()).id }))[0])
      )
    }
    function Me(a) {
      return a < 0 ? M.resolve() : new M((e) => setTimeout(e, a))
    }
    function Ce(a) {
      return this.filter(q).join(a)
    }
    function Ue(a, e) {
      if (ee(e)) return e
      if (/^(i,|image\/)/.test(a)) {
        const e = a.lastIndexOf(",")
        return `data:${a.startsWith("image/") ? a.slice(0, e) : "image/png"};base64,${a.slice(e + 1)}`
      }
      return a
    }
    async function De(a, e) {
      const t = (a.headers.get("content-type") || "").split(";")[0] || "",
        n = await Fa(a.data)
      return e ? [t, n] : `${t},${n}`
    }
    function Re(a) {
      const e = {}
      return (
        a &&
          new URLSearchParams(a).forEach((a, t) => {
            e[t] = a
          }),
        e
      )
    }
    function Te(a) {
      return `${new URLSearchParams(a)}`
    }
    const _e = {},
      Ae = (a) => I.assign(_e, a),
      Le = (a) => {
        for (const e in a) (_e[e] = a[e]).isOwn = !0
      }
    let Ee,
      Oe = new M((a) => {
        Ee = () => M.all(Oe.deps).then(a)
      })
    ;(Oe.deps = []), Oe.then(() => (Oe = null))
    const Pe = {
        autocompleteOnTyping: 100,
        lineWrapping: !1,
        indentWithTabs: !1,
        indentUnit: 2,
        tabSize: 2,
        undoDepth: 500,
      },
      He = { killTrailingSpaceOnSave: !0, showTrailingSpace: !0, ...Pe },
      Ne = {
        [O]: !0,
        autoUpdate: 1,
        updateEnabledScriptsOnly: !0,
        lastUpdate: 0,
        lastModified: 0,
        showBadge: "unique",
        badgeColor: "#880088",
        badgeColorBlocked: "#888888",
        exportValues: !0,
        exportNameTemplate: "[violentmonkey]_YYYY-MM-DD_HH.mm.ss",
        [i]: { "greasyfork%2Eorg": !0, "sleazyfork%2Eorg": !1 },
        closeAfterInstall: !1,
        editAfterInstall: !1,
        helpForLocalFile: !0,
        trackLocalFile: !1,
        autoReload: !1,
        features: null,
        blacklist: null,
        syncScriptStatus: !0,
        sync: null,
        customCSS: "",
        importScriptData: !0,
        importSettings: !0,
        notifyUpdates: !1,
        notifyUpdatesGlobal: !1,
        version: null,
        defaultInjectInto: n,
        ffInject: !0,
        xhrInject: !1,
        filters: { searchScope: "name", showOrder: !1, sort: "exec", viewSingleColumn: !1, viewTable: !1 },
        filtersPopup: { sort: "exec", enabledFirst: !1, groupRunAt: !0, hideDisabled: "" },
        editor: He,
        editorTheme: "",
        editorThemeName: null,
        editorWindow: !1,
        editorWindowPos: {},
        editorWindowSimple: !0,
        scriptTemplate: `// ==UserScript==\n// @name        New script {{name}}\n// @namespace   ${t} Scripts\n// @match       {{url}}\n// @grant       none\n// @version     1.0\n// @author      -\n// @description {{date}}\n// ==/UserScript==\n`,
        showAdvanced: !0,
        valueEditor: Pe,
        uiTheme: "",
      }
    let Fe = browser.storage.local
    class We {
      constructor(a, e) {
        ;(tt[e] = this), (this.name = a), (this.prefix = e)
      }
      toKey(a) {
        return this.prefix + a
      }
      toId(a) {
        return a.startsWith(this.prefix) ? a.slice(this.prefix.length) : ""
      }
      async getOne(a, e) {
        const t = this.toKey(a),
          { [t]: n = e ? await this.fetch(a, "res").catch(console.warn) : void 0 } = await Fe.get([t])
        return n
      }
      async getMulti(a, e) {
        const t = null == a ? void 0 : a.map(this.toKey, this),
          n = await Fe.get(t)
        return e || this.prefix ? E(qa, n, e, this.toId, this) : n
      }
      async remove(a) {
        const e = Xa(a).filter(q).map(this.toKey, this)
        e.length && (await Fe.remove(e))
      }
      async setOne(a, e) {
        if (a) return this.set({ [a]: e })
      }
      async set(a) {
        return await Fe.set(this.prefix ? E(qa, a, null, this.toKey, this) : a), a
      }
    }
    const Be = "cache",
      Ve = "cac:",
      Ge = "code",
      Ke = "code:",
      Je = "mod:",
      Ye = "require",
      Xe = "req:",
      Ze = "script",
      Qe = "scr:",
      at = "value",
      et = "val:",
      tt = {},
      nt = {
        get api() {
          return Fe
        },
        set api(a) {
          Fe = a
        },
        forKey: (a) => tt[/^\w+:|$/.exec(a)[0]],
        base: new We("base", ""),
        [Be]: new We(Be, Ve),
        [Ge]: new We(Ge, Ke),
        mod: new We("mod", Je),
        [Ye]: new We(Ye, Xe),
        [Ze]: new We(Ze, Qe),
        [at]: new We(at, et),
      },
      ot = nt
    let it
    Le({ Storage: ([a, e, ...t]) => nt[a][e](...t) }),
      Le({
        GetAllOptions: () => I.assign({}, Ne, st),
        SetOptions(a) {
          for (const e in a) vt(e, a[e], !0)
          kt()
        },
      })
    const st = {},
      rt = "options",
      lt = "version",
      ct = "scriptTemplate",
      ut = ge(),
      dt = Ea(kt, 100),
      mt = Ea(() => ot.base.setOne(rt, st), 100),
      ht = new Proxy(Ne, { get: (a, e) => yt(e) }),
      gt = ut.hook
    function pt(a) {
      ;(a = a[rt] || {}),
        I.assign(st, a),
        st[lt] || vt(lt, 1),
        "// ==UserScript==\n// @name New Script\n// @namespace Violentmonkey Scripts\n// @match {{url}}\n// @grant none\n// ==/UserScript==\n" ===
          st[ct] && (st[ct] = Ne[ct]),
        I.keys(st).map(wt).some(q) && (delete st[`${ct}Edited`], mt())
    }
    function ft(a, e, t) {
      it ? delete it[a] : (it = {}), (it[a] = e), t || dt()
    }
    function kt() {
      if (!it) return
      const a = it
      ;(it = null), ut.fire(a)
    }
    function bt(a) {
      return Oe ? Oe.then(() => a(ht, !0)) : a(ht, !0), gt(a)
    }
    function yt(a) {
      var e
      let t = st[a]
      if (null != t) return t
      const n = xa(a),
        o = n[0],
        i = null != (e = st[o]) ? e : Ca(Ne[o])
      return n.length > 1 ? za(i, n.slice(1)) : i
    }
    function vt(a, e, t) {
      if (Oe) return Oe.then(vt.bind(null, ...arguments))
      const n = xa(a),
        o = n[0]
      if (((a = n.join(".")), !L(Ne, o))) return
      const i = n.length > 1 && n.slice(1),
        s = yt([o])
      Ua(e, i ? za(s, i) : s) || ((st[o] = i ? ja(s, i, e) : e), wt(o), mt(), ft(a, e, t))
    }
    function wt(a) {
      return Ua(st[a], Ne[a]) && delete st[a]
    }
    function xt({ lifetime: a = 3e3, onDispose: e } = {}) {
      let t,
        n,
        o,
        i = I.create(null),
        s = -1
      const r = () => (n && o) || (o = R.now()),
        l = 1e3
      return {
        batch: (a) => {
          ;(n = a), (o = 0)
        },
        get: c,
        some: (a, e) => {
          for (const t in i) {
            const n = i[t]
            if (n && a.call(e, n.value, t)) return !0
          }
        },
        pop: (a, e) => {
          const t = c(a, e)
          return u(a), t
        },
        put: (a, e, t) => (d((i[a] = t ? { value: e, lifetime: t } : { value: e }), t), e),
        del: u,
        has: (a) => a in i,
        hit: (a, e) => {
          const t = i[a]
          t && d(t, e)
        },
        destroy: () => {
          if (e) for (const a in i) u(a)
          else i = I.create(null)
          clearTimeout(t), (t = 0)
        },
      }
      function c(a, e, t = !0) {
        const n = i[a]
        return n && t && d(n, n.lifetime), n ? n.value : e
      }
      function u(a) {
        const t = i[a]
        t && (delete i[a], null == e || e(t.value, a))
      }
      function d(e, n = a) {
        if (((e.expiry = n + r()), t)) {
          if (n >= s) return
          clearTimeout(t)
        }
        ;(s = n), (t = setTimeout(m, n + l))
      }
      function m() {
        const a = R.now()
        let e = Number.MAX_SAFE_INTEGER
        for (const t in i) {
          const { expiry: n } = i[t]
          n < a ? u(t) : n < e && (e = n)
        }
        ;(s = e - a), (t = e < Number.MAX_SAFE_INTEGER ? setTimeout(m, s + l) : 0)
      }
    }
    gt((a) => pe("UpdateOptions", a))
    const zt = xt({ lifetime: 3e5 })
    Le({
      CacheLoad: (a) => zt.get(a) || null,
      CacheHit(a) {
        zt.hit(a.key, a.lifetime)
      },
      CachePop: (a) => zt.pop(a) || null,
    })
    const jt = zt,
      St = new (class {
        constructor(a) {
          ;(this.events = {}), (this.allowed = a)
        }
        checkType(a) {
          if (this.allowed && !this.allowed.includes(a)) throw new $(`Unknown event type: ${a}`)
        }
        on(a, e) {
          this.checkType(a)
          const { events: t } = this
          let n = t[a]
          return n || ((n = []), (t[a] = n)), () => this.off(a, e)
        }
        off(a, e) {
          this.checkType(a)
          const t = this.events[a]
          if (t) {
            const a = t.indexOf(e)
            a >= 0 && t.splice(a, 1)
          }
        }
        emit(a, e) {
          this.checkType(a)
          const t = this.events[a]
          if (t) {
            const n = {
              type: a,
              data: e,
              defaultPrevented: !1,
              preventDefault() {
                n.defaultPrevented = !0
              },
            }
            t.some((a) => (a(n), n.defaultPrevented))
          }
        }
      })(["scriptEdit", "scriptChanged"]),
      qt = (a) => `${a < 10 ? "0" : ""}${a}`,
      $t = (a) => a.getFullYear(),
      It = (a) => Math.floor((a - new Date($t(a), 0, 1)) / 864e5) + 1,
      Mt = (a) => Math.floor((a - new Date($t(a), 0, 1)) / 6048e5) + 1,
      Ct = (a, e) => a.toLocaleString([navigator.language], e),
      Ut = {
        M: (a) => a.getMonth() + 1,
        MM: (a) => qt(a.getMonth() + 1),
        MMM: (a) => Ct(a, { month: "short" }),
        MMMM: (a) => Ct(a, { month: "long" }),
        Q: (a) => Math.floor(a.getMonth() / 3) + 1,
        D: (a) => a.getDate(),
        DD: (a) => qt(a.getDate()),
        DDD: It,
        DDDD: (a) => {
          return `${((e = It(a)) < 10 ? "00" : e < 100 && "0") || ""}${e}`
          var e
        },
        d: (a) => a.getDay(),
        dd: (a) => Ct(a, { weekday: "short" }).slice(0, 2),
        ddd: (a) => Ct(a, { weekday: "short" }),
        dddd: (a) => Ct(a, { weekday: "long" }),
        w: Mt,
        ww: (a) => qt(Mt(a)),
        Y: $t,
        YY: (a) => qt($t(a) % 100),
        YYYY: (a) => `${$t(a)}`.slice(-4),
        H: (a) => a.getHours(),
        HH: (a) => qt(a.getHours()),
        m: (a) => a.getMinutes(),
        mm: (a) => qt(a.getMinutes()),
        s: (a) => a.getSeconds(),
        ss: (a) => qt(a.getSeconds()),
        S: (a) => ("" + +a).slice(-3, -2),
        SS: (a) => ("" + +a).slice(-3, -1),
        SSS: (a) => ("" + +a).slice(-3),
        ZZ: (a) => {
          const e = a.getTimezoneOffset(),
            t = Math.abs(e)
          return `${e < 0 ? "-" : "+"}${qt(Math.floor(t / 60))}${qt(Math.floor(t % 60))}`
        },
      }
    let Dt
    function Rt(a, e = new Date()) {
      return (
        Dt ||
          (Dt = new RegExp(
            `${/\[([^[\]]*)]/.source}|${I.keys(Ut)
              .sort((a, e) => e.length - a.length)
              .join("|")}`,
            "g"
          )),
        a.replace(Dt, (a, t) => (L(Ut, a) ? Ut[a](e) : null != t ? t : a))
      )
    }
    function Tt(a, e, t) {
      if (null !== t.validHosts) {
        const a = t.validHosts
        for (const t of a)
          if (((a, e) => !!a.endsWith(e) && (a.length === e.length || "." === a[a.length - e.length - 1]))(e, t))
            return t
      }
      let n = 0
      if (e.startsWith(".")) for (; n < e.length && "." === e[n]; ) n += 1
      return a.length === e.length - n
        ? null
        : ((a, e) => {
            const t = a.length - e.length - 2,
              n = a.lastIndexOf(".", t)
            return -1 === n ? a : a.slice(n + 1)
          })(e, a)
    }
    function _t(a, e) {
      let t = 0,
        n = a.length,
        o = !1
      if (!e) {
        if (a.startsWith("data:")) return null
        for (; t < a.length && a.charCodeAt(t) <= 32; ) t += 1
        for (; n > t + 1 && a.charCodeAt(n - 1) <= 32; ) n -= 1
        if (47 === a.charCodeAt(t) && 47 === a.charCodeAt(t + 1)) t += 2
        else {
          const e = a.indexOf(":/", t)
          if (-1 !== e) {
            const n = e - t,
              o = a.charCodeAt(t),
              i = a.charCodeAt(t + 1),
              s = a.charCodeAt(t + 2),
              r = a.charCodeAt(t + 3),
              l = a.charCodeAt(t + 4)
            if (5 === n && 104 === o && 116 === i && 116 === s && 112 === r && 115 === l);
            else if (4 === n && 104 === o && 116 === i && 116 === s && 112 === r);
            else if (3 === n && 119 === o && 115 === i && 115 === s);
            else if (2 === n && 119 === o && 115 === i);
            else
              for (let n = t; n < e; n += 1) {
                const e = 32 | a.charCodeAt(n)
                if (!((e >= 97 && e <= 122) || (e >= 48 && e <= 57) || 46 === e || 45 === e || 43 === e)) return null
              }
            for (t = e + 2; 47 === a.charCodeAt(t); ) t += 1
          }
        }
        let e = -1,
          i = -1,
          s = -1
        for (let r = t; r < n; r += 1) {
          const t = a.charCodeAt(r)
          if (35 === t || 47 === t || 63 === t) {
            n = r
            break
          }
          64 === t ? (e = r) : 93 === t ? (i = r) : 58 === t ? (s = r) : t >= 65 && t <= 90 && (o = !0)
        }
        if ((-1 !== e && e > t && e < n && (t = e + 1), 91 === a.charCodeAt(t)))
          return -1 !== i ? a.slice(t + 1, i).toLowerCase() : null
        ;-1 !== s && s > t && s < n && (n = s)
      }
      for (; n > t + 1 && 46 === a.charCodeAt(n - 1); ) n -= 1
      const i = 0 !== t || n !== a.length ? a.slice(t, n) : a
      return o ? i.toLowerCase() : i
    }
    function At(a) {
      if (a.length < 7) return !1
      if (a.length > 15) return !1
      let e = 0
      for (let t = 0; t < a.length; t += 1) {
        const n = a.charCodeAt(t)
        if (46 === n) e += 1
        else if (n < 48 || n > 57) return !1
      }
      return 3 === e && 46 !== a.charCodeAt(0) && 46 !== a.charCodeAt(a.length - 1)
    }
    function Lt(a) {
      if (a.length < 3) return !1
      let e = a.startsWith("[") ? 1 : 0,
        t = a.length
      if (("]" === a[t - 1] && (t -= 1), t - e > 39)) return !1
      let n = !1
      for (; e < t; e += 1) {
        const t = a.charCodeAt(e)
        if (58 === t) n = !0
        else if (!((t >= 48 && t <= 57) || (t >= 97 && t <= 102) || (t >= 65 && t <= 90))) return !1
      }
      return n
    }
    function Et(a) {
      return (a >= 97 && a <= 122) || (a >= 48 && a <= 57) || a > 127
    }
    function Ot(a) {
      if (a.length > 255) return !1
      if (0 === a.length) return !1
      if (!Et(a.charCodeAt(0)) && 46 !== a.charCodeAt(0) && 95 !== a.charCodeAt(0)) return !1
      let e = -1,
        t = -1
      const n = a.length
      for (let o = 0; o < n; o += 1) {
        const n = a.charCodeAt(o)
        if (46 === n) {
          if (o - e > 64 || 46 === t || 45 === t || 95 === t) return !1
          e = o
        } else if (!Et(n) && 45 !== n && 95 !== n) return !1
        t = n
      }
      return n - e - 1 <= 63 && 45 !== t
    }
    const Pt = (({
      allowIcannDomains: a = !0,
      allowPrivateDomains: e = !1,
      detectIp: t = !0,
      extractHostname: n = !0,
      mixedInputs: o = !0,
      validHosts: i = null,
      validateHostname: s = !0,
    }) => ({
      allowIcannDomains: a,
      allowPrivateDomains: e,
      detectIp: t,
      extractHostname: n,
      mixedInputs: o,
      validHosts: i,
      validateHostname: s,
    }))({})
    function Ht(a, e) {
      return e.length === a.length ? "" : a.slice(0, -e.length - 1)
    }
    function Nt(a, e, t, n, o) {
      const i = ((a) =>
        void 0 === a
          ? Pt
          : (({
              allowIcannDomains: a = !0,
              allowPrivateDomains: e = !1,
              detectIp: t = !0,
              extractHostname: n = !0,
              mixedInputs: o = !0,
              validHosts: i = null,
              validateHostname: s = !0,
            }) => ({
              allowIcannDomains: a,
              allowPrivateDomains: e,
              detectIp: t,
              extractHostname: n,
              mixedInputs: o,
              validHosts: i,
              validateHostname: s,
            }))(a))(n)
      return "string" != typeof a
        ? o
        : (i.extractHostname
            ? i.mixedInputs
              ? (o.hostname = _t(a, Ot(a)))
              : (o.hostname = _t(a, !1))
            : (o.hostname = a),
          0 === e || null === o.hostname || (i.detectIp && ((o.isIp = Lt((s = o.hostname)) || At(s)), o.isIp))
            ? o
            : i.validateHostname && i.extractHostname && !Ot(o.hostname)
              ? ((o.hostname = null), o)
              : (t(o.hostname, i, o),
                2 === e ||
                  null === o.publicSuffix ||
                  ((o.domain = Tt(o.publicSuffix, o.hostname, i)),
                  3 === e ||
                    null === o.domain ||
                    ((o.subdomain = Ht(o.hostname, o.domain)),
                    4 === e ||
                      (o.domainWithoutSuffix = ((r = o.domain), (l = o.publicSuffix), r.slice(0, -l.length - 1))))),
                o))
      var s, r, l
    }
    function Ft(a, e, t) {
      if (!e.allowPrivateDomains && a.length > 3) {
        const e = a.length - 1,
          n = a.charCodeAt(e),
          o = a.charCodeAt(e - 1),
          i = a.charCodeAt(e - 2),
          s = a.charCodeAt(e - 3)
        if (109 === n && 111 === o && 99 === i && 46 === s)
          return (t.isIcann = !0), (t.isPrivate = !1), (t.publicSuffix = "com"), !0
        if (103 === n && 114 === o && 111 === i && 46 === s)
          return (t.isIcann = !0), (t.isPrivate = !1), (t.publicSuffix = "org"), !0
        if (117 === n && 100 === o && 101 === i && 46 === s)
          return (t.isIcann = !0), (t.isPrivate = !1), (t.publicSuffix = "edu"), !0
        if (118 === n && 111 === o && 103 === i && 46 === s)
          return (t.isIcann = !0), (t.isPrivate = !1), (t.publicSuffix = "gov"), !0
        if (116 === n && 101 === o && 110 === i && 46 === s)
          return (t.isIcann = !0), (t.isPrivate = !1), (t.publicSuffix = "net"), !0
        if (101 === n && 100 === o && 46 === i) return (t.isIcann = !0), (t.isPrivate = !1), (t.publicSuffix = "de"), !0
      }
      return !1
    }
    const Wt = (() => {
        const a = [1, {}],
          e = [0, { city: a }]
        return [
          0,
          {
            ck: [0, { www: a }],
            jp: [0, { kawasaki: e, kitakyushu: e, kobe: e, nagoya: e, sapporo: e, sendai: e, yokohama: e }],
          },
        ]
      })(),
      Bt = (() => {
        const a = [1, {}],
          e = [2, {}],
          t = [1, { gov: a, com: a, org: a, net: a, edu: a }],
          n = [0, { "*": e }],
          o = [1, { blogspot: e }],
          i = [1, { gov: a }],
          s = [0, { "*": a }],
          r = [0, { cloud: e }],
          l = [1, { co: e }],
          c = [2, { nodes: e }],
          u = [0, { s3: e }],
          d = [0, { direct: e }],
          m = [2, { id: e }],
          h = [0, { "webview-assets": e }],
          g = [0, { vfs: e, "webview-assets": e }],
          p = [0, { "aws-cloud9": h, cloud9: g }],
          f = [0, { dualstack: u, "analytics-gateway": e, "aws-cloud9": h, cloud9: g }],
          k = [0, { dualstack: u, s3: e, "s3-website": e, "aws-cloud9": h, cloud9: g }],
          b = [0, { dualstack: u, "aws-cloud9": h, cloud9: g }],
          y = [0, { apps: e }],
          v = [0, { paas: e }],
          w = [0, { app: e }],
          x = [2, { eu: e }],
          z = [0, { site: e }],
          j = [0, { pages: e }],
          S = [1, { com: a, edu: a, net: a, org: a }],
          q = [0, { j: e }],
          $ = [0, { jelastic: e }],
          I = [0, { user: e }],
          M = [1, { ybo: e }],
          C = [0, { cust: e, reservd: e }],
          U = [0, { cust: e }],
          D = [1, { gov: a, edu: a, mil: a, com: a, org: a, net: a }],
          R = [1, { edu: a, biz: a, net: a, org: a, gov: a, info: a, com: a }],
          T = [1, { gov: a, blogspot: e }],
          _ = [1, { framer: e }],
          A = [1, { barsy: e }],
          L = [0, { forgot: e }],
          E = [1, { gs: a }],
          O = [0, { nes: a }],
          P = [1, { k12: a, cc: a, lib: a }],
          H = [1, { cc: a, lib: a }]
        return [
          0,
          {
            ac: [1, { com: a, edu: a, gov: a, net: a, mil: a, org: a, drr: e }],
            ad: [1, { nom: a }],
            ae: [1, { co: a, net: a, org: a, sch: a, ac: a, gov: a, mil: a, blogspot: e }],
            aero: [
              1,
              {
                "accident-investigation": a,
                "accident-prevention": a,
                aerobatic: a,
                aeroclub: a,
                aerodrome: a,
                agents: a,
                aircraft: a,
                airline: a,
                airport: a,
                "air-surveillance": a,
                airtraffic: a,
                "air-traffic-control": a,
                ambulance: a,
                amusement: a,
                association: a,
                author: a,
                ballooning: a,
                broker: a,
                caa: a,
                cargo: a,
                catering: a,
                certification: a,
                championship: a,
                charter: a,
                civilaviation: a,
                club: a,
                conference: a,
                consultant: a,
                consulting: a,
                control: a,
                council: a,
                crew: a,
                design: a,
                dgca: a,
                educator: a,
                emergency: a,
                engine: a,
                engineer: a,
                entertainment: a,
                equipment: a,
                exchange: a,
                express: a,
                federation: a,
                flight: a,
                fuel: a,
                gliding: a,
                government: a,
                groundhandling: a,
                group: a,
                hanggliding: a,
                homebuilt: a,
                insurance: a,
                journal: a,
                journalist: a,
                leasing: a,
                logistics: a,
                magazine: a,
                maintenance: a,
                media: a,
                microlight: a,
                modelling: a,
                navigation: a,
                parachuting: a,
                paragliding: a,
                "passenger-association": a,
                pilot: a,
                press: a,
                production: a,
                recreation: a,
                repbody: a,
                res: a,
                research: a,
                rotorcraft: a,
                safety: a,
                scientist: a,
                services: a,
                show: a,
                skydiving: a,
                software: a,
                student: a,
                trader: a,
                trading: a,
                trainer: a,
                union: a,
                workinggroup: a,
                works: a,
              },
            ],
            af: t,
            ag: [1, { com: a, org: a, net: a, co: a, nom: a }],
            ai: [1, { off: a, com: a, net: a, org: a, uwu: e }],
            al: [1, { com: a, edu: a, gov: a, mil: a, net: a, org: a, blogspot: e }],
            am: [1, { co: a, com: a, commune: a, net: a, org: a, radio: e, blogspot: e, neko: e, nyaa: e }],
            ao: [1, { ed: a, gv: a, og: a, co: a, pb: a, it: a }],
            aq: a,
            ar: [
              1,
              {
                bet: a,
                com: o,
                coop: a,
                edu: a,
                gob: a,
                gov: a,
                int: a,
                mil: a,
                musica: a,
                mutual: a,
                net: a,
                org: a,
                senasa: a,
                tur: a,
              },
            ],
            arpa: [1, { e164: a, "in-addr": a, ip6: a, iris: a, uri: a, urn: a }],
            as: i,
            asia: [1, { cloudns: e }],
            at: [
              1,
              {
                ac: [1, { sth: a }],
                co: o,
                gv: a,
                or: a,
                funkfeuer: [0, { wien: e }],
                futurecms: [0, { "*": e, ex: n, in: n }],
                futurehosting: e,
                futuremailing: e,
                ortsinfo: [0, { ex: n, kunden: n }],
                biz: e,
                info: e,
                "123webseite": e,
                priv: e,
                myspreadshop: e,
                "12hp": e,
                "2ix": e,
                "4lima": e,
                "lima-city": e,
              },
            ],
            au: [
              1,
              {
                com: [1, { blogspot: e, cloudlets: [0, { mel: e }], myspreadshop: e }],
                net: a,
                org: a,
                edu: [
                  1,
                  { act: a, catholic: a, nsw: [1, { schools: a }], nt: a, qld: a, sa: a, tas: a, vic: a, wa: a },
                ],
                gov: [1, { qld: a, sa: a, tas: a, vic: a, wa: a }],
                asn: a,
                id: a,
                info: a,
                conf: a,
                oz: a,
                act: a,
                nsw: a,
                nt: a,
                qld: a,
                sa: a,
                tas: a,
                vic: a,
                wa: a,
              },
            ],
            aw: [1, { com: a }],
            ax: [1, { be: e, cat: e, es: e, eu: e, gg: e, mc: e, us: e, xy: e }],
            az: [
              1,
              { com: a, net: a, int: a, gov: a, org: a, edu: a, info: a, pp: a, mil: a, name: a, pro: a, biz: a },
            ],
            ba: [1, { com: a, edu: a, gov: a, mil: a, net: a, org: a, rs: e, blogspot: e }],
            bb: [1, { biz: a, co: a, com: a, edu: a, gov: a, info: a, net: a, org: a, store: a, tv: a }],
            bd: s,
            be: [
              1,
              {
                ac: a,
                webhosting: e,
                blogspot: e,
                interhostsolutions: r,
                kuleuven: [0, { ezproxy: e }],
                "123website": e,
                myspreadshop: e,
                transurl: n,
              },
            ],
            bf: i,
            bg: [
              1,
              {
                0: a,
                1: a,
                2: a,
                3: a,
                4: a,
                5: a,
                6: a,
                7: a,
                8: a,
                9: a,
                a,
                b: a,
                c: a,
                d: a,
                e: a,
                f: a,
                g: a,
                h: a,
                i: a,
                j: a,
                k: a,
                l: a,
                m: a,
                n: a,
                o: a,
                p: a,
                q: a,
                r: a,
                s: a,
                t: a,
                u: a,
                v: a,
                w: a,
                x: a,
                y: a,
                z: a,
                blogspot: e,
                barsy: e,
              },
            ],
            bh: t,
            bi: [1, { co: a, com: a, edu: a, or: a, org: a }],
            biz: [
              1,
              {
                activetrail: e,
                cloudns: e,
                jozi: e,
                dyndns: e,
                "for-better": e,
                "for-more": e,
                "for-some": e,
                "for-the": e,
                selfip: e,
                webhop: e,
                orx: e,
                mmafan: e,
                myftp: e,
                "no-ip": e,
                dscloud: e,
              },
            ],
            bj: [
              1,
              {
                africa: a,
                agro: a,
                architectes: a,
                assur: a,
                avocats: a,
                co: a,
                com: a,
                eco: a,
                econo: a,
                edu: a,
                info: a,
                loisirs: a,
                money: a,
                net: a,
                org: a,
                ote: a,
                resto: a,
                restaurant: a,
                tourism: a,
                univ: a,
                blogspot: e,
              },
            ],
            bm: t,
            bn: [1, { com: a, edu: a, gov: a, net: a, org: a, co: e }],
            bo: [
              1,
              {
                com: a,
                edu: a,
                gob: a,
                int: a,
                org: a,
                net: a,
                mil: a,
                tv: a,
                web: a,
                academia: a,
                agro: a,
                arte: a,
                blog: a,
                bolivia: a,
                ciencia: a,
                cooperativa: a,
                democracia: a,
                deporte: a,
                ecologia: a,
                economia: a,
                empresa: a,
                indigena: a,
                industria: a,
                info: a,
                medicina: a,
                movimiento: a,
                musica: a,
                natural: a,
                nombre: a,
                noticias: a,
                patria: a,
                politica: a,
                profesional: a,
                plurinacional: a,
                pueblo: a,
                revista: a,
                salud: a,
                tecnologia: a,
                tksat: a,
                transporte: a,
                wiki: a,
              },
            ],
            br: [
              1,
              {
                "9guacu": a,
                abc: a,
                adm: a,
                adv: a,
                agr: a,
                aju: a,
                am: a,
                anani: a,
                aparecida: a,
                app: a,
                arq: a,
                art: a,
                ato: a,
                b: a,
                barueri: a,
                belem: a,
                bhz: a,
                bib: a,
                bio: a,
                blog: a,
                bmd: a,
                boavista: a,
                bsb: a,
                campinagrande: a,
                campinas: a,
                caxias: a,
                cim: a,
                cng: a,
                cnt: a,
                com: [1, { blogspot: e, simplesite: e }],
                contagem: a,
                coop: a,
                coz: a,
                cri: a,
                cuiaba: a,
                curitiba: a,
                def: a,
                des: a,
                det: a,
                dev: a,
                ecn: a,
                eco: a,
                edu: a,
                emp: a,
                enf: a,
                eng: a,
                esp: a,
                etc: a,
                eti: a,
                far: a,
                feira: a,
                flog: a,
                floripa: a,
                fm: a,
                fnd: a,
                fortal: a,
                fot: a,
                foz: a,
                fst: a,
                g12: a,
                geo: a,
                ggf: a,
                goiania: a,
                gov: [
                  1,
                  {
                    ac: a,
                    al: a,
                    am: a,
                    ap: a,
                    ba: a,
                    ce: a,
                    df: a,
                    es: a,
                    go: a,
                    ma: a,
                    mg: a,
                    ms: a,
                    mt: a,
                    pa: a,
                    pb: a,
                    pe: a,
                    pi: a,
                    pr: a,
                    rj: a,
                    rn: a,
                    ro: a,
                    rr: a,
                    rs: a,
                    sc: a,
                    se: a,
                    sp: a,
                    to: a,
                  },
                ],
                gru: a,
                imb: a,
                ind: a,
                inf: a,
                jab: a,
                jampa: a,
                jdf: a,
                joinville: a,
                jor: a,
                jus: a,
                leg: [
                  1,
                  {
                    ac: e,
                    al: e,
                    am: e,
                    ap: e,
                    ba: e,
                    ce: e,
                    df: e,
                    es: e,
                    go: e,
                    ma: e,
                    mg: e,
                    ms: e,
                    mt: e,
                    pa: e,
                    pb: e,
                    pe: e,
                    pi: e,
                    pr: e,
                    rj: e,
                    rn: e,
                    ro: e,
                    rr: e,
                    rs: e,
                    sc: e,
                    se: e,
                    sp: e,
                    to: e,
                  },
                ],
                lel: a,
                log: a,
                londrina: a,
                macapa: a,
                maceio: a,
                manaus: a,
                maringa: a,
                mat: a,
                med: a,
                mil: a,
                morena: a,
                mp: a,
                mus: a,
                natal: a,
                net: a,
                niteroi: a,
                nom: s,
                not: a,
                ntr: a,
                odo: a,
                ong: a,
                org: a,
                osasco: a,
                palmas: a,
                poa: a,
                ppg: a,
                pro: a,
                psc: a,
                psi: a,
                pvh: a,
                qsl: a,
                radio: a,
                rec: a,
                recife: a,
                rep: a,
                ribeirao: a,
                rio: a,
                riobranco: a,
                riopreto: a,
                salvador: a,
                sampa: a,
                santamaria: a,
                santoandre: a,
                saobernardo: a,
                saogonca: a,
                seg: a,
                sjc: a,
                slg: a,
                slz: a,
                sorocaba: a,
                srv: a,
                taxi: a,
                tc: a,
                tec: a,
                teo: a,
                the: a,
                tmp: a,
                trd: a,
                tur: a,
                tv: a,
                udi: a,
                vet: a,
                vix: a,
                vlog: a,
                wiki: a,
                zlg: a,
              },
            ],
            bs: [1, { com: a, net: a, org: a, edu: a, gov: a, we: e }],
            bt: t,
            bv: a,
            bw: [1, { co: a, org: a }],
            by: [1, { gov: a, mil: a, com: o, of: a, mycloud: e, mediatech: e }],
            bz: [1, { com: a, net: a, org: a, edu: a, gov: a, za: e, gsj: e }],
            ca: [
              1,
              {
                ab: a,
                bc: a,
                mb: a,
                nb: a,
                nf: a,
                nl: a,
                ns: a,
                nt: a,
                nu: a,
                on: a,
                pe: a,
                qc: a,
                sk: a,
                yk: a,
                gc: a,
                barsy: e,
                awdev: n,
                co: e,
                blogspot: e,
                "no-ip": e,
                myspreadshop: e,
              },
            ],
            cat: a,
            cc: [
              1,
              {
                cloudns: e,
                ftpaccess: e,
                "game-server": e,
                myphotos: e,
                scrapping: e,
                twmail: e,
                csx: e,
                fantasyleague: e,
                spawn: [0, { instances: e }],
              },
            ],
            cd: i,
            cf: o,
            cg: a,
            ch: [
              1,
              {
                square7: e,
                blogspot: e,
                flow: [0, { ae: [0, { alp1: e }], appengine: e }],
                "linkyard-cloud": e,
                dnsking: e,
                gotdns: e,
                "123website": e,
                myspreadshop: e,
                firenet: [0, { "*": e, svc: n }],
                "12hp": e,
                "2ix": e,
                "4lima": e,
                "lima-city": e,
              },
            ],
            ci: [
              1,
              {
                org: a,
                or: a,
                com: a,
                co: a,
                edu: a,
                ed: a,
                ac: a,
                net: a,
                go: a,
                asso: a,
                "xn--aroport-bya": a,
                aéroport: a,
                int: a,
                presse: a,
                md: a,
                gouv: a,
                fin: e,
                nl: e,
              },
            ],
            ck: s,
            cl: [1, { co: a, gob: a, gov: a, mil: a, blogspot: e }],
            cm: [1, { co: a, com: a, gov: a, net: a }],
            cn: [
              1,
              {
                ac: a,
                com: [
                  1,
                  {
                    amazonaws: [
                      0,
                      { compute: n, "cn-north-1": u, eb: [0, { "cn-north-1": e, "cn-northwest-1": e }], elb: n },
                    ],
                  },
                ],
                edu: a,
                gov: a,
                net: a,
                org: a,
                mil: a,
                "xn--55qx5d": a,
                公司: a,
                "xn--io0a7i": a,
                网络: a,
                "xn--od0alg": a,
                網絡: a,
                ah: a,
                bj: a,
                cq: a,
                fj: a,
                gd: a,
                gs: a,
                gz: a,
                gx: a,
                ha: a,
                hb: a,
                he: a,
                hi: a,
                hl: a,
                hn: a,
                jl: a,
                js: a,
                jx: a,
                ln: a,
                nm: a,
                nx: a,
                qh: a,
                sc: a,
                sd: a,
                sh: a,
                sn: a,
                sx: a,
                tj: a,
                xj: a,
                xz: a,
                yn: a,
                zj: a,
                hk: a,
                mo: a,
                tw: a,
                "canva-apps": e,
                instantcloud: e,
                quickconnect: d,
              },
            ],
            co: [
              1,
              {
                arts: a,
                com: o,
                edu: a,
                firm: a,
                gov: a,
                info: a,
                int: a,
                mil: a,
                net: a,
                nom: a,
                org: a,
                rec: a,
                web: a,
                carrd: e,
                crd: e,
                otap: n,
                leadpages: e,
                lpages: e,
                mypi: e,
                n4t: e,
                firewalledreplit: m,
                repl: m,
                supabase: e,
              },
            ],
            com: [
              1,
              {
                devcdnaccesso: n,
                adobeaemcloud: [2, { dev: n }],
                airkitapps: e,
                "airkitapps-au": e,
                aivencloud: e,
                kasserver: e,
                amazonaws: [
                  0,
                  {
                    compute: n,
                    "compute-1": n,
                    "us-east-1": [2, { dualstack: u, "analytics-gateway": e, "aws-cloud9": h, cloud9: g }],
                    "ap-northeast-1": f,
                    "ap-northeast-2": k,
                    "ap-south-1": k,
                    "ap-southeast-1": b,
                    "ap-southeast-2": b,
                    "ca-central-1": k,
                    "eu-central-1": k,
                    "eu-west-1": f,
                    "eu-west-2": k,
                    "eu-west-3": k,
                    s3: e,
                    "s3-ap-northeast-1": e,
                    "s3-ap-northeast-2": e,
                    "s3-ap-south-1": e,
                    "s3-ap-southeast-1": e,
                    "s3-ap-southeast-2": e,
                    "s3-ca-central-1": e,
                    "s3-eu-central-1": e,
                    "s3-eu-west-1": e,
                    "s3-eu-west-2": e,
                    "s3-eu-west-3": e,
                    "s3-external-1": e,
                    "s3-fips-us-gov-west-1": e,
                    "s3-sa-east-1": e,
                    "s3-us-east-2": e,
                    "s3-us-gov-west-1": e,
                    "s3-us-west-1": e,
                    "s3-us-west-2": e,
                    "s3-website-ap-northeast-1": e,
                    "s3-website-ap-southeast-1": e,
                    "s3-website-ap-southeast-2": e,
                    "s3-website-eu-west-1": e,
                    "s3-website-sa-east-1": e,
                    "s3-website-us-east-1": e,
                    "s3-website-us-west-1": e,
                    "s3-website-us-west-2": e,
                    "sa-east-1": b,
                    "us-east-2": [
                      0,
                      { dualstack: u, s3: e, "s3-website": e, "analytics-gateway": e, "aws-cloud9": h, cloud9: g },
                    ],
                    "us-west-2": [0, { "analytics-gateway": e, "aws-cloud9": h, cloud9: g }],
                    "af-south-1": p,
                    "ap-east-1": p,
                    "ap-northeast-3": p,
                    "eu-north-1": p,
                    "eu-south-1": p,
                    "me-south-1": p,
                    "us-west-1": p,
                    elb: n,
                  },
                ],
                elasticbeanstalk: [
                  2,
                  {
                    "ap-northeast-1": e,
                    "ap-northeast-2": e,
                    "ap-northeast-3": e,
                    "ap-south-1": e,
                    "ap-southeast-1": e,
                    "ap-southeast-2": e,
                    "ca-central-1": e,
                    "eu-central-1": e,
                    "eu-west-1": e,
                    "eu-west-2": e,
                    "eu-west-3": e,
                    "sa-east-1": e,
                    "us-east-1": e,
                    "us-east-2": e,
                    "us-gov-west-1": e,
                    "us-west-1": e,
                    "us-west-2": e,
                  },
                ],
                awsglobalaccelerator: e,
                siiites: e,
                appspacehosted: e,
                appspaceusercontent: e,
                "on-aptible": e,
                myasustor: e,
                "balena-devices": e,
                betainabox: e,
                boutir: e,
                bplaced: e,
                cafjs: e,
                "canva-apps": e,
                br: e,
                cn: e,
                de: e,
                eu: e,
                jpn: e,
                mex: e,
                ru: e,
                sa: e,
                uk: e,
                us: e,
                za: e,
                ar: e,
                hu: e,
                kr: e,
                no: e,
                qc: e,
                uy: e,
                africa: e,
                gr: e,
                co: e,
                jdevcloud: e,
                wpdevcloud: e,
                cloudcontrolled: e,
                cloudcontrolapp: e,
                "cf-ipfs": e,
                "cloudflare-ipfs": e,
                trycloudflare: e,
                "customer-oci": [0, { "*": e, oci: n, ocp: n, ocs: n }],
                dattolocal: e,
                dattorelay: e,
                dattoweb: e,
                mydatto: e,
                builtwithdark: e,
                datadetect: [0, { demo: e, instance: e }],
                ddns5: e,
                discordsays: e,
                discordsez: e,
                drayddns: e,
                dreamhosters: e,
                mydrobo: e,
                "dyndns-at-home": e,
                "dyndns-at-work": e,
                "dyndns-blog": e,
                "dyndns-free": e,
                "dyndns-home": e,
                "dyndns-ip": e,
                "dyndns-mail": e,
                "dyndns-office": e,
                "dyndns-pics": e,
                "dyndns-remote": e,
                "dyndns-server": e,
                "dyndns-web": e,
                "dyndns-wiki": e,
                "dyndns-work": e,
                blogdns: e,
                cechire: e,
                dnsalias: e,
                dnsdojo: e,
                doesntexist: e,
                dontexist: e,
                doomdns: e,
                "dyn-o-saur": e,
                dynalias: e,
                "est-a-la-maison": e,
                "est-a-la-masion": e,
                "est-le-patron": e,
                "est-mon-blogueur": e,
                "from-ak": e,
                "from-al": e,
                "from-ar": e,
                "from-ca": e,
                "from-ct": e,
                "from-dc": e,
                "from-de": e,
                "from-fl": e,
                "from-ga": e,
                "from-hi": e,
                "from-ia": e,
                "from-id": e,
                "from-il": e,
                "from-in": e,
                "from-ks": e,
                "from-ky": e,
                "from-ma": e,
                "from-md": e,
                "from-mi": e,
                "from-mn": e,
                "from-mo": e,
                "from-ms": e,
                "from-mt": e,
                "from-nc": e,
                "from-nd": e,
                "from-ne": e,
                "from-nh": e,
                "from-nj": e,
                "from-nm": e,
                "from-nv": e,
                "from-oh": e,
                "from-ok": e,
                "from-or": e,
                "from-pa": e,
                "from-pr": e,
                "from-ri": e,
                "from-sc": e,
                "from-sd": e,
                "from-tn": e,
                "from-tx": e,
                "from-ut": e,
                "from-va": e,
                "from-vt": e,
                "from-wa": e,
                "from-wi": e,
                "from-wv": e,
                "from-wy": e,
                getmyip: e,
                gotdns: e,
                "hobby-site": e,
                homelinux: e,
                homeunix: e,
                iamallama: e,
                "is-a-anarchist": e,
                "is-a-blogger": e,
                "is-a-bookkeeper": e,
                "is-a-bulls-fan": e,
                "is-a-caterer": e,
                "is-a-chef": e,
                "is-a-conservative": e,
                "is-a-cpa": e,
                "is-a-cubicle-slave": e,
                "is-a-democrat": e,
                "is-a-designer": e,
                "is-a-doctor": e,
                "is-a-financialadvisor": e,
                "is-a-geek": e,
                "is-a-green": e,
                "is-a-guru": e,
                "is-a-hard-worker": e,
                "is-a-hunter": e,
                "is-a-landscaper": e,
                "is-a-lawyer": e,
                "is-a-liberal": e,
                "is-a-libertarian": e,
                "is-a-llama": e,
                "is-a-musician": e,
                "is-a-nascarfan": e,
                "is-a-nurse": e,
                "is-a-painter": e,
                "is-a-personaltrainer": e,
                "is-a-photographer": e,
                "is-a-player": e,
                "is-a-republican": e,
                "is-a-rockstar": e,
                "is-a-socialist": e,
                "is-a-student": e,
                "is-a-teacher": e,
                "is-a-techie": e,
                "is-a-therapist": e,
                "is-an-accountant": e,
                "is-an-actor": e,
                "is-an-actress": e,
                "is-an-anarchist": e,
                "is-an-artist": e,
                "is-an-engineer": e,
                "is-an-entertainer": e,
                "is-certified": e,
                "is-gone": e,
                "is-into-anime": e,
                "is-into-cars": e,
                "is-into-cartoons": e,
                "is-into-games": e,
                "is-leet": e,
                "is-not-certified": e,
                "is-slick": e,
                "is-uberleet": e,
                "is-with-theband": e,
                "isa-geek": e,
                "isa-hockeynut": e,
                issmarterthanyou: e,
                "likes-pie": e,
                likescandy: e,
                "neat-url": e,
                "saves-the-whales": e,
                selfip: e,
                "sells-for-less": e,
                "sells-for-u": e,
                servebbs: e,
                "simple-url": e,
                "space-to-rent": e,
                "teaches-yoga": e,
                writesthisblog: e,
                digitaloceanspaces: n,
                ddnsfree: e,
                ddnsgeek: e,
                giize: e,
                gleeze: e,
                kozow: e,
                loseyourip: e,
                ooguy: e,
                theworkpc: e,
                mytuleap: e,
                "tuleap-partners": e,
                encoreapi: e,
                evennode: [
                  0,
                  { "eu-1": e, "eu-2": e, "eu-3": e, "eu-4": e, "us-1": e, "us-2": e, "us-3": e, "us-4": e },
                ],
                onfabrica: e,
                fbsbx: y,
                "fastly-edge": e,
                "fastly-terrarium": e,
                "fastvps-server": e,
                mydobiss: e,
                firebaseapp: e,
                fldrv: e,
                forgeblocks: e,
                framercanvas: e,
                "freebox-os": e,
                freeboxos: e,
                freemyip: e,
                gentapps: e,
                gentlentapis: e,
                githubusercontent: e,
                "0emm": n,
                appspot: [2, { r: n }],
                codespot: e,
                googleapis: e,
                googlecode: e,
                pagespeedmobilizer: e,
                publishproxy: e,
                withgoogle: e,
                withyoutube: e,
                blogspot: e,
                awsmppl: e,
                herokuapp: e,
                herokussl: e,
                impertrixcdn: e,
                impertrix: e,
                smushcdn: e,
                wphostedmail: e,
                wpmucdn: e,
                pixolino: e,
                amscompute: e,
                dopaas: e,
                "hosted-by-previder": v,
                hosteur: [0, { "rag-cloud": e, "rag-cloud-ch": e }],
                "ik-server": [0, { jcloud: e, "jcloud-ver-jpc": e }],
                jelastic: [0, { demo: e }],
                kilatiron: e,
                massivegrid: v,
                wafaicloud: [0, { jed: e, lon: e, ryd: e }],
                joyent: [0, { cns: n }],
                ktistory: e,
                lpusercontent: e,
                lmpm: w,
                linode: [0, { members: e, nodebalancer: n }],
                linodeobjects: n,
                linodeusercontent: [0, { ip: e }],
                barsycenter: e,
                barsyonline: e,
                mazeplay: e,
                miniserver: e,
                meteorapp: x,
                hostedpi: e,
                "mythic-beasts": [
                  0,
                  {
                    customer: e,
                    caracal: e,
                    fentiger: e,
                    lynx: e,
                    ocelot: e,
                    oncilla: e,
                    onza: e,
                    sphinx: e,
                    vs: e,
                    x: e,
                    yali: e,
                  },
                ],
                nospamproxy: r,
                "4u": e,
                nfshost: e,
                "001www": e,
                ddnslive: e,
                myiphost: e,
                blogsyte: e,
                ciscofreak: e,
                damnserver: e,
                ditchyourip: e,
                dnsiskinky: e,
                dynns: e,
                geekgalaxy: e,
                "health-carereform": e,
                homesecuritymac: e,
                homesecuritypc: e,
                myactivedirectory: e,
                mysecuritycamera: e,
                "net-freaks": e,
                onthewifi: e,
                point2this: e,
                quicksytes: e,
                securitytactics: e,
                serveexchange: e,
                servehumour: e,
                servep2p: e,
                servesarcasm: e,
                stufftoread: e,
                unusualperson: e,
                workisboring: e,
                "3utilities": e,
                ddnsking: e,
                myvnc: e,
                servebeer: e,
                servecounterstrike: e,
                serveftp: e,
                servegame: e,
                servehalflife: e,
                servehttp: e,
                serveirc: e,
                servemp3: e,
                servepics: e,
                servequake: e,
                observableusercontent: [0, { static: e }],
                simplesite: e,
                orsites: e,
                operaunite: e,
                "authgear-staging": e,
                authgearapps: e,
                skygearapp: e,
                outsystemscloud: e,
                ownprovider: e,
                pgfog: e,
                pagefrontapp: e,
                pagexl: e,
                paywhirl: n,
                gotpantheon: e,
                "platter-app": e,
                pleskns: e,
                "postman-echo": e,
                prgmr: [0, { xen: e }],
                pythonanywhere: x,
                qualifioapp: e,
                ladesk: e,
                qbuser: e,
                qa2: e,
                "dev-myqnapcloud": e,
                "alpha-myqnapcloud": e,
                myqnapcloud: e,
                quipelements: n,
                rackmaze: e,
                rhcloud: e,
                render: w,
                onrender: e,
                "180r": e,
                dojin: e,
                sakuratan: e,
                sakuraweb: e,
                x0: e,
                code: [0, { builder: n, "dev-builder": n, "stg-builder": n }],
                logoip: e,
                scrysec: e,
                "firewall-gateway": e,
                myshopblocks: e,
                myshopify: e,
                shopitsite: e,
                "1kapp": e,
                appchizi: e,
                applinzi: e,
                sinaapp: e,
                vipsinaapp: e,
                "bounty-full": [2, { alpha: e, beta: e }],
                streamlitapp: e,
                "try-snowplow": e,
                "stackhero-network": e,
                "playstation-cloud": e,
                myspreadshop: e,
                stdlib: [0, { api: e }],
                "temp-dns": e,
                dsmynas: e,
                familyds: e,
                mytabit: e,
                "tb-hosting": z,
                reservd: e,
                thingdustdata: e,
                bloxcms: e,
                "townnews-staging": e,
                typeform: [0, { pro: e }],
                hk: e,
                it: e,
                vultrobjects: n,
                wafflecell: e,
                "reserve-online": e,
                hotelwithflight: e,
                remotewd: e,
                wiardweb: j,
                messwithdns: e,
                "woltlab-demo": e,
                wpenginepowered: [2, { js: e }],
                wixsite: e,
                xnbay: [2, { u2: e, "u2-local": e }],
                yolasite: e,
              },
            ],
            coop: a,
            cr: [1, { ac: a, co: a, ed: a, fi: a, go: a, or: a, sa: a }],
            cu: [1, { com: a, edu: a, org: a, net: a, gov: a, inf: a }],
            cv: [1, { com: a, edu: a, int: a, nome: a, org: a, blogspot: e }],
            cw: S,
            cx: [1, { gov: a, ath: e, info: e }],
            cy: [
              1,
              {
                ac: a,
                biz: a,
                com: [1, { blogspot: e, scaleforce: q }],
                ekloges: a,
                gov: a,
                ltd: a,
                mil: a,
                net: a,
                org: a,
                press: a,
                pro: a,
                tm: a,
              },
            ],
            cz: [
              1,
              {
                co: e,
                realm: e,
                e4: e,
                blogspot: e,
                metacentrum: [0, { cloud: n, custom: e }],
                muni: [0, { cloud: [0, { flt: e, usr: e }] }],
              },
            ],
            de: [
              1,
              {
                bplaced: e,
                square7: e,
                com: e,
                cosidns: [0, { dyn: e }],
                "dynamisches-dns": e,
                dnsupdater: e,
                "internet-dns": e,
                "l-o-g-i-n": e,
                dnshome: e,
                fuettertdasnetz: e,
                isteingeek: e,
                istmein: e,
                lebtimnetz: e,
                leitungsen: e,
                traeumtgerade: e,
                ddnss: [2, { dyn: e, dyndns: e }],
                dyndns1: e,
                "dyn-ip24": e,
                "home-webserver": [2, { dyn: e }],
                "myhome-server": e,
                frusky: n,
                goip: e,
                blogspot: e,
                "xn--gnstigbestellen-zvb": e,
                günstigbestellen: e,
                "xn--gnstigliefern-wob": e,
                günstigliefern: e,
                "hs-heilbronn": [0, { it: j }],
                "dyn-berlin": e,
                "in-berlin": e,
                "in-brb": e,
                "in-butter": e,
                "in-dsl": e,
                "in-vpn": e,
                iservschule: e,
                "mein-iserv": e,
                schulplattform: e,
                schulserver: e,
                "test-iserv": e,
                keymachine: e,
                "git-repos": e,
                "lcube-server": e,
                "svn-repos": e,
                barsy: e,
                "123webseite": e,
                logoip: e,
                "firewall-gateway": e,
                "my-gateway": e,
                "my-router": e,
                spdns: e,
                speedpartner: [0, { customer: e }],
                myspreadshop: e,
                "taifun-dns": e,
                "12hp": e,
                "2ix": e,
                "4lima": e,
                "lima-city": e,
                "dd-dns": e,
                "dray-dns": e,
                draydns: e,
                "dyn-vpn": e,
                dynvpn: e,
                "mein-vigor": e,
                "my-vigor": e,
                "my-wan": e,
                "syno-ds": e,
                "synology-diskstation": e,
                "synology-ds": e,
                uberspace: n,
                virtualuser: e,
                "virtual-user": e,
                "community-pro": e,
                diskussionsbereich: e,
              },
            ],
            dj: a,
            dk: [1, { biz: e, co: e, firm: e, reg: e, store: e, blogspot: e, "123hjemmeside": e, myspreadshop: e }],
            dm: t,
            do: [1, { art: a, com: a, edu: a, gob: a, gov: a, mil: a, net: a, org: a, sld: a, web: a }],
            dz: [1, { art: a, asso: a, com: a, edu: a, gov: a, org: a, net: a, pol: a, soc: a, tm: a }],
            ec: [
              1,
              {
                com: a,
                info: a,
                net: a,
                fin: a,
                k12: a,
                med: a,
                pro: a,
                org: a,
                edu: a,
                gov: a,
                gob: a,
                mil: a,
                base: e,
                official: e,
              },
            ],
            edu: [1, { rit: [0, { "git-pages": e }] }],
            ee: [1, { edu: a, gov: a, riik: a, lib: a, med: a, com: o, pri: a, aip: a, org: a, fie: a }],
            eg: [1, { com: o, edu: a, eun: a, gov: a, mil: a, name: a, net: a, org: a, sci: a }],
            er: s,
            es: [1, { com: o, nom: a, org: a, gob: a, edu: a, "123miweb": e, myspreadshop: e }],
            et: [1, { com: a, gov: a, org: a, edu: a, biz: a, name: a, info: a, net: a }],
            eu: [
              1,
              {
                airkitapps: e,
                mycd: e,
                cloudns: e,
                dogado: $,
                barsy: e,
                wellbeingzone: e,
                spdns: e,
                transurl: n,
                diskstation: e,
              },
            ],
            fi: [
              1,
              {
                aland: a,
                dy: e,
                blogspot: e,
                "xn--hkkinen-5wa": e,
                häkkinen: e,
                iki: e,
                cloudplatform: [0, { fi: e }],
                datacenter: [0, { demo: e, paas: e }],
                kapsi: e,
                "123kotisivu": e,
                myspreadshop: e,
              },
            ],
            fj: [1, { ac: a, biz: a, com: a, gov: a, info: a, mil: a, name: a, net: a, org: a, pro: a }],
            fk: s,
            fm: [1, { com: a, edu: a, net: a, org: a, radio: e, user: n }],
            fo: a,
            fr: [
              1,
              {
                asso: a,
                com: a,
                gouv: a,
                nom: a,
                prd: a,
                tm: a,
                aeroport: a,
                avocat: a,
                avoues: a,
                cci: a,
                chambagri: a,
                "chirurgiens-dentistes": a,
                "experts-comptables": a,
                "geometre-expert": a,
                greta: a,
                "huissier-justice": a,
                medecin: a,
                notaires: a,
                pharmacien: a,
                port: a,
                veterinaire: a,
                "en-root": e,
                "fbx-os": e,
                fbxos: e,
                "freebox-os": e,
                freeboxos: e,
                blogspot: e,
                goupile: e,
                "123siteweb": e,
                "on-web": e,
                "chirurgiens-dentistes-en-france": e,
                dedibox: e,
                myspreadshop: e,
                ynh: e,
              },
            ],
            ga: a,
            gb: a,
            gd: [1, { edu: a, gov: a }],
            ge: [1, { com: a, edu: a, gov: a, org: a, mil: a, net: a, pvt: a }],
            gf: a,
            gg: [1, { co: a, net: a, org: a, kaas: e, cya: e, panel: [2, { daemon: e }] }],
            gh: [1, { com: a, edu: a, gov: a, org: a, mil: a }],
            gi: [1, { com: a, ltd: a, gov: a, mod: a, edu: a, org: a }],
            gl: [1, { co: a, com: a, edu: a, net: a, org: a, biz: e, xx: e }],
            gm: a,
            gn: [1, { ac: a, com: a, edu: a, gov: a, org: a, net: a }],
            gov: a,
            gp: [1, { com: a, net: a, mobi: a, edu: a, org: a, asso: a, app: e }],
            gq: a,
            gr: [1, { com: a, edu: a, net: a, org: a, gov: a, blogspot: e, simplesite: e }],
            gs: a,
            gt: [1, { com: a, edu: a, gob: a, ind: a, mil: a, net: a, org: a, blog: e, de: e, to: e }],
            gu: [1, { com: a, edu: a, gov: a, guam: a, info: a, net: a, org: a, web: a }],
            gw: a,
            gy: [1, { co: a, com: a, edu: a, gov: a, net: a, org: a, be: e }],
            hk: [
              1,
              {
                com: a,
                edu: a,
                gov: a,
                idv: a,
                net: a,
                org: a,
                "xn--55qx5d": a,
                公司: a,
                "xn--wcvs22d": a,
                教育: a,
                "xn--lcvr32d": a,
                敎育: a,
                "xn--mxtq1m": a,
                政府: a,
                "xn--gmqw5a": a,
                個人: a,
                "xn--ciqpn": a,
                个人: a,
                "xn--gmq050i": a,
                箇人: a,
                "xn--zf0avx": a,
                網络: a,
                "xn--io0a7i": a,
                网络: a,
                "xn--mk0axi": a,
                组織: a,
                "xn--od0alg": a,
                網絡: a,
                "xn--od0aq3b": a,
                网絡: a,
                "xn--tn0ag": a,
                组织: a,
                "xn--uc0atv": a,
                組織: a,
                "xn--uc0ay4a": a,
                組织: a,
                blogspot: e,
                secaas: e,
                ltd: e,
                inc: e,
              },
            ],
            hm: a,
            hn: [1, { com: a, edu: a, org: a, net: a, mil: a, gob: a, cc: e }],
            hr: [1, { iz: a, from: a, name: a, com: a, blogspot: e, free: e }],
            ht: [
              1,
              {
                com: a,
                shop: a,
                firm: a,
                info: a,
                adult: a,
                net: a,
                pro: a,
                org: a,
                med: a,
                art: a,
                coop: a,
                pol: a,
                asso: a,
                edu: a,
                rel: a,
                gouv: a,
                perso: a,
              },
            ],
            hu: [
              1,
              {
                2e3: a,
                co: a,
                info: a,
                org: a,
                priv: a,
                sport: a,
                tm: a,
                agrar: a,
                bolt: a,
                casino: a,
                city: a,
                erotica: a,
                erotika: a,
                film: a,
                forum: a,
                games: a,
                hotel: a,
                ingatlan: a,
                jogasz: a,
                konyvelo: a,
                lakas: a,
                media: a,
                news: a,
                reklam: a,
                sex: a,
                shop: a,
                suli: a,
                szex: a,
                tozsde: a,
                utazas: a,
                video: a,
                blogspot: e,
              },
            ],
            id: [
              1,
              {
                ac: a,
                biz: a,
                co: o,
                desa: a,
                go: a,
                mil: a,
                my: [1, { rss: n }],
                net: a,
                or: a,
                ponpes: a,
                sch: a,
                web: a,
                flap: e,
                forte: e,
              },
            ],
            ie: [1, { gov: a, blogspot: e, myspreadshop: e }],
            il: [
              1,
              {
                ac: a,
                co: [1, { ravpage: e, blogspot: e, tabitorder: e, mytabit: e }],
                gov: a,
                idf: a,
                k12: a,
                muni: a,
                net: a,
                org: a,
              },
            ],
            "xn--4dbrk0ce": [1, { "xn--4dbgdty6c": a, "xn--5dbhl8d": a, "xn--8dbq2a": a, "xn--hebda8b": a }],
            ישראל: [1, { אקדמיה: a, ישוב: a, צהל: a, ממשל: a }],
            im: [1, { ac: a, co: [1, { ltd: a, plc: a }], com: a, net: a, org: a, tt: a, tv: a, ro: e }],
            in: [
              1,
              {
                "5g": a,
                "6g": a,
                ac: a,
                ai: a,
                am: a,
                bihar: a,
                biz: a,
                business: a,
                ca: a,
                cn: a,
                co: a,
                com: a,
                coop: a,
                cs: a,
                delhi: a,
                dr: a,
                edu: a,
                er: a,
                firm: a,
                gen: a,
                gov: a,
                gujarat: a,
                ind: a,
                info: a,
                int: a,
                internet: a,
                io: a,
                me: a,
                mil: a,
                net: a,
                nic: a,
                org: a,
                pg: a,
                post: a,
                pro: a,
                res: a,
                travel: a,
                tv: a,
                uk: a,
                up: a,
                us: a,
                web: e,
                cloudns: e,
                blogspot: e,
                barsy: e,
                supabase: e,
              },
            ],
            info: [
              1,
              {
                cloudns: e,
                "dynamic-dns": e,
                dyndns: e,
                "barrel-of-knowledge": e,
                "barrell-of-knowledge": e,
                "for-our": e,
                "groks-the": e,
                "groks-this": e,
                "here-for-more": e,
                knowsitall: e,
                selfip: e,
                webhop: e,
                barsy: e,
                mayfirst: e,
                forumz: e,
                nsupdate: e,
                dvrcam: e,
                ilovecollege: e,
                "no-ip": e,
                dnsupdate: e,
                "v-info": e,
              },
            ],
            int: [1, { eu: a }],
            io: [
              1,
              {
                2038: e,
                com: a,
                "on-acorn": n,
                apigee: e,
                "b-data": e,
                backplaneapp: e,
                banzaicloud: [0, { app: e, backyards: n }],
                beagleboard: e,
                bitbucket: e,
                bluebite: e,
                boxfuse: e,
                browsersafetymark: e,
                bigv: [0, { uk0: e }],
                cleverapps: e,
                dappnode: [0, { dyndns: e }],
                dedyn: e,
                drud: e,
                definima: e,
                "fh-muenster": e,
                shw: e,
                forgerock: [0, { id: e }],
                ghost: e,
                github: e,
                gitlab: e,
                lolipop: e,
                "hasura-app": e,
                hostyhosting: e,
                moonscale: n,
                beebyte: v,
                beebyteapp: [0, { sekd1: e }],
                jele: e,
                unispace: [0, { "cloud-fr1": e }],
                webthings: e,
                loginline: e,
                barsy: e,
                azurecontainer: n,
                ngrok: [2, { ap: e, au: e, eu: e, in: e, jp: e, sa: e, us: e }],
                nodeart: [0, { stage: e }],
                nid: e,
                pantheonsite: e,
                dyn53: e,
                pstmn: [2, { mock: e }],
                protonet: e,
                qoto: e,
                qcx: [2, { sys: n }],
                vaporcloud: e,
                vbrplsbx: [0, { g: e }],
                "on-k3s": n,
                "on-rio": n,
                readthedocs: e,
                resindevice: e,
                resinstaging: [0, { devices: e }],
                hzc: e,
                sandcats: e,
                shiftcrypto: e,
                shiftedit: e,
                "mo-siemens": e,
                musician: e,
                lair: y,
                stolos: n,
                spacekit: e,
                utwente: e,
                s5y: n,
                edugit: e,
                telebit: e,
                thingdust: [0, { dev: C, disrec: C, prod: U, testing: C }],
                tickets: e,
                upli: e,
                wedeploy: e,
                editorx: e,
                basicserver: e,
                virtualserver: e,
              },
            ],
            iq: D,
            ir: [
              1,
              {
                ac: a,
                co: a,
                gov: a,
                id: a,
                net: a,
                org: a,
                sch: a,
                "xn--mgba3a4f16a": a,
                ایران: a,
                "xn--mgba3a4fra": a,
                ايران: a,
              },
            ],
            is: [1, { net: a, com: a, edu: a, gov: a, org: a, int: a, cupcake: e, blogspot: e }],
            it: [
              1,
              {
                gov: a,
                edu: a,
                abr: a,
                abruzzo: a,
                "aosta-valley": a,
                aostavalley: a,
                bas: a,
                basilicata: a,
                cal: a,
                calabria: a,
                cam: a,
                campania: a,
                "emilia-romagna": a,
                emiliaromagna: a,
                emr: a,
                "friuli-v-giulia": a,
                "friuli-ve-giulia": a,
                "friuli-vegiulia": a,
                "friuli-venezia-giulia": a,
                "friuli-veneziagiulia": a,
                "friuli-vgiulia": a,
                "friuliv-giulia": a,
                "friulive-giulia": a,
                friulivegiulia: a,
                "friulivenezia-giulia": a,
                friuliveneziagiulia: a,
                friulivgiulia: a,
                fvg: a,
                laz: a,
                lazio: a,
                lig: a,
                liguria: a,
                lom: a,
                lombardia: a,
                lombardy: a,
                lucania: a,
                mar: a,
                marche: a,
                mol: a,
                molise: a,
                piedmont: a,
                piemonte: a,
                pmn: a,
                pug: a,
                puglia: a,
                sar: a,
                sardegna: a,
                sardinia: a,
                sic: a,
                sicilia: a,
                sicily: a,
                taa: a,
                tos: a,
                toscana: a,
                "trentin-sud-tirol": a,
                "xn--trentin-sd-tirol-rzb": a,
                "trentin-s\xfcd-tirol": a,
                "trentin-sudtirol": a,
                "xn--trentin-sdtirol-7vb": a,
                "trentin-s\xfcdtirol": a,
                "trentin-sued-tirol": a,
                "trentin-suedtirol": a,
                "trentino-a-adige": a,
                "trentino-aadige": a,
                "trentino-alto-adige": a,
                "trentino-altoadige": a,
                "trentino-s-tirol": a,
                "trentino-stirol": a,
                "trentino-sud-tirol": a,
                "xn--trentino-sd-tirol-c3b": a,
                "trentino-s\xfcd-tirol": a,
                "trentino-sudtirol": a,
                "xn--trentino-sdtirol-szb": a,
                "trentino-s\xfcdtirol": a,
                "trentino-sued-tirol": a,
                "trentino-suedtirol": a,
                trentino: a,
                "trentinoa-adige": a,
                trentinoaadige: a,
                "trentinoalto-adige": a,
                trentinoaltoadige: a,
                "trentinos-tirol": a,
                trentinostirol: a,
                "trentinosud-tirol": a,
                "xn--trentinosd-tirol-rzb": a,
                "trentinos\xfcd-tirol": a,
                trentinosudtirol: a,
                "xn--trentinosdtirol-7vb": a,
                trentinosüdtirol: a,
                "trentinosued-tirol": a,
                trentinosuedtirol: a,
                "trentinsud-tirol": a,
                "xn--trentinsd-tirol-6vb": a,
                "trentins\xfcd-tirol": a,
                trentinsudtirol: a,
                "xn--trentinsdtirol-nsb": a,
                trentinsüdtirol: a,
                "trentinsued-tirol": a,
                trentinsuedtirol: a,
                tuscany: a,
                umb: a,
                umbria: a,
                "val-d-aosta": a,
                "val-daosta": a,
                "vald-aosta": a,
                valdaosta: a,
                "valle-aosta": a,
                "valle-d-aosta": a,
                "valle-daosta": a,
                valleaosta: a,
                "valled-aosta": a,
                valledaosta: a,
                "vallee-aoste": a,
                "xn--valle-aoste-ebb": a,
                "vall\xe9e-aoste": a,
                "vallee-d-aoste": a,
                "xn--valle-d-aoste-ehb": a,
                "vall\xe9e-d-aoste": a,
                valleeaoste: a,
                "xn--valleaoste-e7a": a,
                valléeaoste: a,
                valleedaoste: a,
                "xn--valledaoste-ebb": a,
                valléedaoste: a,
                vao: a,
                vda: a,
                ven: a,
                veneto: a,
                ag: a,
                agrigento: a,
                al: a,
                alessandria: a,
                "alto-adige": a,
                altoadige: a,
                an: a,
                ancona: a,
                "andria-barletta-trani": a,
                "andria-trani-barletta": a,
                andriabarlettatrani: a,
                andriatranibarletta: a,
                ao: a,
                aosta: a,
                aoste: a,
                ap: a,
                aq: a,
                aquila: a,
                ar: a,
                arezzo: a,
                "ascoli-piceno": a,
                ascolipiceno: a,
                asti: a,
                at: a,
                av: a,
                avellino: a,
                ba: a,
                "balsan-sudtirol": a,
                "xn--balsan-sdtirol-nsb": a,
                "balsan-s\xfcdtirol": a,
                "balsan-suedtirol": a,
                balsan: a,
                bari: a,
                "barletta-trani-andria": a,
                barlettatraniandria: a,
                belluno: a,
                benevento: a,
                bergamo: a,
                bg: a,
                bi: a,
                biella: a,
                bl: a,
                bn: a,
                bo: a,
                bologna: a,
                "bolzano-altoadige": a,
                bolzano: a,
                "bozen-sudtirol": a,
                "xn--bozen-sdtirol-2ob": a,
                "bozen-s\xfcdtirol": a,
                "bozen-suedtirol": a,
                bozen: a,
                br: a,
                brescia: a,
                brindisi: a,
                bs: a,
                bt: a,
                "bulsan-sudtirol": a,
                "xn--bulsan-sdtirol-nsb": a,
                "bulsan-s\xfcdtirol": a,
                "bulsan-suedtirol": a,
                bulsan: a,
                bz: a,
                ca: a,
                cagliari: a,
                caltanissetta: a,
                "campidano-medio": a,
                campidanomedio: a,
                campobasso: a,
                "carbonia-iglesias": a,
                carboniaiglesias: a,
                "carrara-massa": a,
                carraramassa: a,
                caserta: a,
                catania: a,
                catanzaro: a,
                cb: a,
                ce: a,
                "cesena-forli": a,
                "xn--cesena-forl-mcb": a,
                "cesena-forl\xec": a,
                cesenaforli: a,
                "xn--cesenaforl-i8a": a,
                cesenaforlì: a,
                ch: a,
                chieti: a,
                ci: a,
                cl: a,
                cn: a,
                co: a,
                como: a,
                cosenza: a,
                cr: a,
                cremona: a,
                crotone: a,
                cs: a,
                ct: a,
                cuneo: a,
                cz: a,
                "dell-ogliastra": a,
                dellogliastra: a,
                en: a,
                enna: a,
                fc: a,
                fe: a,
                fermo: a,
                ferrara: a,
                fg: a,
                fi: a,
                firenze: a,
                florence: a,
                fm: a,
                foggia: a,
                "forli-cesena": a,
                "xn--forl-cesena-fcb": a,
                "forl\xec-cesena": a,
                forlicesena: a,
                "xn--forlcesena-c8a": a,
                forlìcesena: a,
                fr: a,
                frosinone: a,
                ge: a,
                genoa: a,
                genova: a,
                go: a,
                gorizia: a,
                gr: a,
                grosseto: a,
                "iglesias-carbonia": a,
                iglesiascarbonia: a,
                im: a,
                imperia: a,
                is: a,
                isernia: a,
                kr: a,
                "la-spezia": a,
                laquila: a,
                laspezia: a,
                latina: a,
                lc: a,
                le: a,
                lecce: a,
                lecco: a,
                li: a,
                livorno: a,
                lo: a,
                lodi: a,
                lt: a,
                lu: a,
                lucca: a,
                macerata: a,
                mantova: a,
                "massa-carrara": a,
                massacarrara: a,
                matera: a,
                mb: a,
                mc: a,
                me: a,
                "medio-campidano": a,
                mediocampidano: a,
                messina: a,
                mi: a,
                milan: a,
                milano: a,
                mn: a,
                mo: a,
                modena: a,
                "monza-brianza": a,
                "monza-e-della-brianza": a,
                monza: a,
                monzabrianza: a,
                monzaebrianza: a,
                monzaedellabrianza: a,
                ms: a,
                mt: a,
                na: a,
                naples: a,
                napoli: a,
                no: a,
                novara: a,
                nu: a,
                nuoro: a,
                og: a,
                ogliastra: a,
                "olbia-tempio": a,
                olbiatempio: a,
                or: a,
                oristano: a,
                ot: a,
                pa: a,
                padova: a,
                padua: a,
                palermo: a,
                parma: a,
                pavia: a,
                pc: a,
                pd: a,
                pe: a,
                perugia: a,
                "pesaro-urbino": a,
                pesarourbino: a,
                pescara: a,
                pg: a,
                pi: a,
                piacenza: a,
                pisa: a,
                pistoia: a,
                pn: a,
                po: a,
                pordenone: a,
                potenza: a,
                pr: a,
                prato: a,
                pt: a,
                pu: a,
                pv: a,
                pz: a,
                ra: a,
                ragusa: a,
                ravenna: a,
                rc: a,
                re: a,
                "reggio-calabria": a,
                "reggio-emilia": a,
                reggiocalabria: a,
                reggioemilia: a,
                rg: a,
                ri: a,
                rieti: a,
                rimini: a,
                rm: a,
                rn: a,
                ro: a,
                roma: a,
                rome: a,
                rovigo: a,
                sa: a,
                salerno: a,
                sassari: a,
                savona: a,
                si: a,
                siena: a,
                siracusa: a,
                so: a,
                sondrio: a,
                sp: a,
                sr: a,
                ss: a,
                suedtirol: a,
                "xn--sdtirol-n2a": a,
                südtirol: a,
                sv: a,
                ta: a,
                taranto: a,
                te: a,
                "tempio-olbia": a,
                tempioolbia: a,
                teramo: a,
                terni: a,
                tn: a,
                to: a,
                torino: a,
                tp: a,
                tr: a,
                "trani-andria-barletta": a,
                "trani-barletta-andria": a,
                traniandriabarletta: a,
                tranibarlettaandria: a,
                trapani: a,
                trento: a,
                treviso: a,
                trieste: a,
                ts: a,
                turin: a,
                tv: a,
                ud: a,
                udine: a,
                "urbino-pesaro": a,
                urbinopesaro: a,
                va: a,
                varese: a,
                vb: a,
                vc: a,
                ve: a,
                venezia: a,
                venice: a,
                verbania: a,
                vercelli: a,
                verona: a,
                vi: a,
                "vibo-valentia": a,
                vibovalentia: a,
                vicenza: a,
                viterbo: a,
                vr: a,
                vs: a,
                vt: a,
                vv: a,
                blogspot: e,
                ibxos: e,
                iliadboxos: e,
                neen: [0, { jc: e }],
                tim: [0, { open: [0, { jelastic: r }] }],
                "16-b": e,
                "32-b": e,
                "64-b": e,
                "123homepage": e,
                myspreadshop: e,
                syncloud: e,
              },
            ],
            je: [1, { co: a, net: a, org: a, of: e }],
            jm: s,
            jo: [1, { com: a, org: a, net: a, edu: a, sch: a, gov: a, mil: a, name: a }],
            jobs: a,
            jp: [
              1,
              {
                ac: a,
                ad: a,
                co: a,
                ed: a,
                go: a,
                gr: a,
                lg: a,
                ne: [
                  1,
                  {
                    aseinet: I,
                    gehirn: e,
                    ivory: e,
                    "mail-box": e,
                    mints: e,
                    mokuren: e,
                    opal: e,
                    sakura: e,
                    sumomo: e,
                    topaz: e,
                  },
                ],
                or: a,
                aichi: [
                  1,
                  {
                    aisai: a,
                    ama: a,
                    anjo: a,
                    asuke: a,
                    chiryu: a,
                    chita: a,
                    fuso: a,
                    gamagori: a,
                    handa: a,
                    hazu: a,
                    hekinan: a,
                    higashiura: a,
                    ichinomiya: a,
                    inazawa: a,
                    inuyama: a,
                    isshiki: a,
                    iwakura: a,
                    kanie: a,
                    kariya: a,
                    kasugai: a,
                    kira: a,
                    kiyosu: a,
                    komaki: a,
                    konan: a,
                    kota: a,
                    mihama: a,
                    miyoshi: a,
                    nishio: a,
                    nisshin: a,
                    obu: a,
                    oguchi: a,
                    oharu: a,
                    okazaki: a,
                    owariasahi: a,
                    seto: a,
                    shikatsu: a,
                    shinshiro: a,
                    shitara: a,
                    tahara: a,
                    takahama: a,
                    tobishima: a,
                    toei: a,
                    togo: a,
                    tokai: a,
                    tokoname: a,
                    toyoake: a,
                    toyohashi: a,
                    toyokawa: a,
                    toyone: a,
                    toyota: a,
                    tsushima: a,
                    yatomi: a,
                  },
                ],
                akita: [
                  1,
                  {
                    akita: a,
                    daisen: a,
                    fujisato: a,
                    gojome: a,
                    hachirogata: a,
                    happou: a,
                    higashinaruse: a,
                    honjo: a,
                    honjyo: a,
                    ikawa: a,
                    kamikoani: a,
                    kamioka: a,
                    katagami: a,
                    kazuno: a,
                    kitaakita: a,
                    kosaka: a,
                    kyowa: a,
                    misato: a,
                    mitane: a,
                    moriyoshi: a,
                    nikaho: a,
                    noshiro: a,
                    odate: a,
                    oga: a,
                    ogata: a,
                    semboku: a,
                    yokote: a,
                    yurihonjo: a,
                  },
                ],
                aomori: [
                  1,
                  {
                    aomori: a,
                    gonohe: a,
                    hachinohe: a,
                    hashikami: a,
                    hiranai: a,
                    hirosaki: a,
                    itayanagi: a,
                    kuroishi: a,
                    misawa: a,
                    mutsu: a,
                    nakadomari: a,
                    noheji: a,
                    oirase: a,
                    owani: a,
                    rokunohe: a,
                    sannohe: a,
                    shichinohe: a,
                    shingo: a,
                    takko: a,
                    towada: a,
                    tsugaru: a,
                    tsuruta: a,
                  },
                ],
                chiba: [
                  1,
                  {
                    abiko: a,
                    asahi: a,
                    chonan: a,
                    chosei: a,
                    choshi: a,
                    chuo: a,
                    funabashi: a,
                    futtsu: a,
                    hanamigawa: a,
                    ichihara: a,
                    ichikawa: a,
                    ichinomiya: a,
                    inzai: a,
                    isumi: a,
                    kamagaya: a,
                    kamogawa: a,
                    kashiwa: a,
                    katori: a,
                    katsuura: a,
                    kimitsu: a,
                    kisarazu: a,
                    kozaki: a,
                    kujukuri: a,
                    kyonan: a,
                    matsudo: a,
                    midori: a,
                    mihama: a,
                    minamiboso: a,
                    mobara: a,
                    mutsuzawa: a,
                    nagara: a,
                    nagareyama: a,
                    narashino: a,
                    narita: a,
                    noda: a,
                    oamishirasato: a,
                    omigawa: a,
                    onjuku: a,
                    otaki: a,
                    sakae: a,
                    sakura: a,
                    shimofusa: a,
                    shirako: a,
                    shiroi: a,
                    shisui: a,
                    sodegaura: a,
                    sosa: a,
                    tako: a,
                    tateyama: a,
                    togane: a,
                    tohnosho: a,
                    tomisato: a,
                    urayasu: a,
                    yachimata: a,
                    yachiyo: a,
                    yokaichiba: a,
                    yokoshibahikari: a,
                    yotsukaido: a,
                  },
                ],
                ehime: [
                  1,
                  {
                    ainan: a,
                    honai: a,
                    ikata: a,
                    imabari: a,
                    iyo: a,
                    kamijima: a,
                    kihoku: a,
                    kumakogen: a,
                    masaki: a,
                    matsuno: a,
                    matsuyama: a,
                    namikata: a,
                    niihama: a,
                    ozu: a,
                    saijo: a,
                    seiyo: a,
                    shikokuchuo: a,
                    tobe: a,
                    toon: a,
                    uchiko: a,
                    uwajima: a,
                    yawatahama: a,
                  },
                ],
                fukui: [
                  1,
                  {
                    echizen: a,
                    eiheiji: a,
                    fukui: a,
                    ikeda: a,
                    katsuyama: a,
                    mihama: a,
                    minamiechizen: a,
                    obama: a,
                    ohi: a,
                    ono: a,
                    sabae: a,
                    sakai: a,
                    takahama: a,
                    tsuruga: a,
                    wakasa: a,
                  },
                ],
                fukuoka: [
                  1,
                  {
                    ashiya: a,
                    buzen: a,
                    chikugo: a,
                    chikuho: a,
                    chikujo: a,
                    chikushino: a,
                    chikuzen: a,
                    chuo: a,
                    dazaifu: a,
                    fukuchi: a,
                    hakata: a,
                    higashi: a,
                    hirokawa: a,
                    hisayama: a,
                    iizuka: a,
                    inatsuki: a,
                    kaho: a,
                    kasuga: a,
                    kasuya: a,
                    kawara: a,
                    keisen: a,
                    koga: a,
                    kurate: a,
                    kurogi: a,
                    kurume: a,
                    minami: a,
                    miyako: a,
                    miyama: a,
                    miyawaka: a,
                    mizumaki: a,
                    munakata: a,
                    nakagawa: a,
                    nakama: a,
                    nishi: a,
                    nogata: a,
                    ogori: a,
                    okagaki: a,
                    okawa: a,
                    oki: a,
                    omuta: a,
                    onga: a,
                    onojo: a,
                    oto: a,
                    saigawa: a,
                    sasaguri: a,
                    shingu: a,
                    shinyoshitomi: a,
                    shonai: a,
                    soeda: a,
                    sue: a,
                    tachiarai: a,
                    tagawa: a,
                    takata: a,
                    toho: a,
                    toyotsu: a,
                    tsuiki: a,
                    ukiha: a,
                    umi: a,
                    usui: a,
                    yamada: a,
                    yame: a,
                    yanagawa: a,
                    yukuhashi: a,
                  },
                ],
                fukushima: [
                  1,
                  {
                    aizubange: a,
                    aizumisato: a,
                    aizuwakamatsu: a,
                    asakawa: a,
                    bandai: a,
                    date: a,
                    fukushima: a,
                    furudono: a,
                    futaba: a,
                    hanawa: a,
                    higashi: a,
                    hirata: a,
                    hirono: a,
                    iitate: a,
                    inawashiro: a,
                    ishikawa: a,
                    iwaki: a,
                    izumizaki: a,
                    kagamiishi: a,
                    kaneyama: a,
                    kawamata: a,
                    kitakata: a,
                    kitashiobara: a,
                    koori: a,
                    koriyama: a,
                    kunimi: a,
                    miharu: a,
                    mishima: a,
                    namie: a,
                    nango: a,
                    nishiaizu: a,
                    nishigo: a,
                    okuma: a,
                    omotego: a,
                    ono: a,
                    otama: a,
                    samegawa: a,
                    shimogo: a,
                    shirakawa: a,
                    showa: a,
                    soma: a,
                    sukagawa: a,
                    taishin: a,
                    tamakawa: a,
                    tanagura: a,
                    tenei: a,
                    yabuki: a,
                    yamato: a,
                    yamatsuri: a,
                    yanaizu: a,
                    yugawa: a,
                  },
                ],
                gifu: [
                  1,
                  {
                    anpachi: a,
                    ena: a,
                    gifu: a,
                    ginan: a,
                    godo: a,
                    gujo: a,
                    hashima: a,
                    hichiso: a,
                    hida: a,
                    higashishirakawa: a,
                    ibigawa: a,
                    ikeda: a,
                    kakamigahara: a,
                    kani: a,
                    kasahara: a,
                    kasamatsu: a,
                    kawaue: a,
                    kitagata: a,
                    mino: a,
                    minokamo: a,
                    mitake: a,
                    mizunami: a,
                    motosu: a,
                    nakatsugawa: a,
                    ogaki: a,
                    sakahogi: a,
                    seki: a,
                    sekigahara: a,
                    shirakawa: a,
                    tajimi: a,
                    takayama: a,
                    tarui: a,
                    toki: a,
                    tomika: a,
                    wanouchi: a,
                    yamagata: a,
                    yaotsu: a,
                    yoro: a,
                  },
                ],
                gunma: [
                  1,
                  {
                    annaka: a,
                    chiyoda: a,
                    fujioka: a,
                    higashiagatsuma: a,
                    isesaki: a,
                    itakura: a,
                    kanna: a,
                    kanra: a,
                    katashina: a,
                    kawaba: a,
                    kiryu: a,
                    kusatsu: a,
                    maebashi: a,
                    meiwa: a,
                    midori: a,
                    minakami: a,
                    naganohara: a,
                    nakanojo: a,
                    nanmoku: a,
                    numata: a,
                    oizumi: a,
                    ora: a,
                    ota: a,
                    shibukawa: a,
                    shimonita: a,
                    shinto: a,
                    showa: a,
                    takasaki: a,
                    takayama: a,
                    tamamura: a,
                    tatebayashi: a,
                    tomioka: a,
                    tsukiyono: a,
                    tsumagoi: a,
                    ueno: a,
                    yoshioka: a,
                  },
                ],
                hiroshima: [
                  1,
                  {
                    asaminami: a,
                    daiwa: a,
                    etajima: a,
                    fuchu: a,
                    fukuyama: a,
                    hatsukaichi: a,
                    higashihiroshima: a,
                    hongo: a,
                    jinsekikogen: a,
                    kaita: a,
                    kui: a,
                    kumano: a,
                    kure: a,
                    mihara: a,
                    miyoshi: a,
                    naka: a,
                    onomichi: a,
                    osakikamijima: a,
                    otake: a,
                    saka: a,
                    sera: a,
                    seranishi: a,
                    shinichi: a,
                    shobara: a,
                    takehara: a,
                  },
                ],
                hokkaido: [
                  1,
                  {
                    abashiri: a,
                    abira: a,
                    aibetsu: a,
                    akabira: a,
                    akkeshi: a,
                    asahikawa: a,
                    ashibetsu: a,
                    ashoro: a,
                    assabu: a,
                    atsuma: a,
                    bibai: a,
                    biei: a,
                    bifuka: a,
                    bihoro: a,
                    biratori: a,
                    chippubetsu: a,
                    chitose: a,
                    date: a,
                    ebetsu: a,
                    embetsu: a,
                    eniwa: a,
                    erimo: a,
                    esan: a,
                    esashi: a,
                    fukagawa: a,
                    fukushima: a,
                    furano: a,
                    furubira: a,
                    haboro: a,
                    hakodate: a,
                    hamatonbetsu: a,
                    hidaka: a,
                    higashikagura: a,
                    higashikawa: a,
                    hiroo: a,
                    hokuryu: a,
                    hokuto: a,
                    honbetsu: a,
                    horokanai: a,
                    horonobe: a,
                    ikeda: a,
                    imakane: a,
                    ishikari: a,
                    iwamizawa: a,
                    iwanai: a,
                    kamifurano: a,
                    kamikawa: a,
                    kamishihoro: a,
                    kamisunagawa: a,
                    kamoenai: a,
                    kayabe: a,
                    kembuchi: a,
                    kikonai: a,
                    kimobetsu: a,
                    kitahiroshima: a,
                    kitami: a,
                    kiyosato: a,
                    koshimizu: a,
                    kunneppu: a,
                    kuriyama: a,
                    kuromatsunai: a,
                    kushiro: a,
                    kutchan: a,
                    kyowa: a,
                    mashike: a,
                    matsumae: a,
                    mikasa: a,
                    minamifurano: a,
                    mombetsu: a,
                    moseushi: a,
                    mukawa: a,
                    muroran: a,
                    naie: a,
                    nakagawa: a,
                    nakasatsunai: a,
                    nakatombetsu: a,
                    nanae: a,
                    nanporo: a,
                    nayoro: a,
                    nemuro: a,
                    niikappu: a,
                    niki: a,
                    nishiokoppe: a,
                    noboribetsu: a,
                    numata: a,
                    obihiro: a,
                    obira: a,
                    oketo: a,
                    okoppe: a,
                    otaru: a,
                    otobe: a,
                    otofuke: a,
                    otoineppu: a,
                    oumu: a,
                    ozora: a,
                    pippu: a,
                    rankoshi: a,
                    rebun: a,
                    rikubetsu: a,
                    rishiri: a,
                    rishirifuji: a,
                    saroma: a,
                    sarufutsu: a,
                    shakotan: a,
                    shari: a,
                    shibecha: a,
                    shibetsu: a,
                    shikabe: a,
                    shikaoi: a,
                    shimamaki: a,
                    shimizu: a,
                    shimokawa: a,
                    shinshinotsu: a,
                    shintoku: a,
                    shiranuka: a,
                    shiraoi: a,
                    shiriuchi: a,
                    sobetsu: a,
                    sunagawa: a,
                    taiki: a,
                    takasu: a,
                    takikawa: a,
                    takinoue: a,
                    teshikaga: a,
                    tobetsu: a,
                    tohma: a,
                    tomakomai: a,
                    tomari: a,
                    toya: a,
                    toyako: a,
                    toyotomi: a,
                    toyoura: a,
                    tsubetsu: a,
                    tsukigata: a,
                    urakawa: a,
                    urausu: a,
                    uryu: a,
                    utashinai: a,
                    wakkanai: a,
                    wassamu: a,
                    yakumo: a,
                    yoichi: a,
                  },
                ],
                hyogo: [
                  1,
                  {
                    aioi: a,
                    akashi: a,
                    ako: a,
                    amagasaki: a,
                    aogaki: a,
                    asago: a,
                    ashiya: a,
                    awaji: a,
                    fukusaki: a,
                    goshiki: a,
                    harima: a,
                    himeji: a,
                    ichikawa: a,
                    inagawa: a,
                    itami: a,
                    kakogawa: a,
                    kamigori: a,
                    kamikawa: a,
                    kasai: a,
                    kasuga: a,
                    kawanishi: a,
                    miki: a,
                    minamiawaji: a,
                    nishinomiya: a,
                    nishiwaki: a,
                    ono: a,
                    sanda: a,
                    sannan: a,
                    sasayama: a,
                    sayo: a,
                    shingu: a,
                    shinonsen: a,
                    shiso: a,
                    sumoto: a,
                    taishi: a,
                    taka: a,
                    takarazuka: a,
                    takasago: a,
                    takino: a,
                    tamba: a,
                    tatsuno: a,
                    toyooka: a,
                    yabu: a,
                    yashiro: a,
                    yoka: a,
                    yokawa: a,
                  },
                ],
                ibaraki: [
                  1,
                  {
                    ami: a,
                    asahi: a,
                    bando: a,
                    chikusei: a,
                    daigo: a,
                    fujishiro: a,
                    hitachi: a,
                    hitachinaka: a,
                    hitachiomiya: a,
                    hitachiota: a,
                    ibaraki: a,
                    ina: a,
                    inashiki: a,
                    itako: a,
                    iwama: a,
                    joso: a,
                    kamisu: a,
                    kasama: a,
                    kashima: a,
                    kasumigaura: a,
                    koga: a,
                    miho: a,
                    mito: a,
                    moriya: a,
                    naka: a,
                    namegata: a,
                    oarai: a,
                    ogawa: a,
                    omitama: a,
                    ryugasaki: a,
                    sakai: a,
                    sakuragawa: a,
                    shimodate: a,
                    shimotsuma: a,
                    shirosato: a,
                    sowa: a,
                    suifu: a,
                    takahagi: a,
                    tamatsukuri: a,
                    tokai: a,
                    tomobe: a,
                    tone: a,
                    toride: a,
                    tsuchiura: a,
                    tsukuba: a,
                    uchihara: a,
                    ushiku: a,
                    yachiyo: a,
                    yamagata: a,
                    yawara: a,
                    yuki: a,
                  },
                ],
                ishikawa: [
                  1,
                  {
                    anamizu: a,
                    hakui: a,
                    hakusan: a,
                    kaga: a,
                    kahoku: a,
                    kanazawa: a,
                    kawakita: a,
                    komatsu: a,
                    nakanoto: a,
                    nanao: a,
                    nomi: a,
                    nonoichi: a,
                    noto: a,
                    shika: a,
                    suzu: a,
                    tsubata: a,
                    tsurugi: a,
                    uchinada: a,
                    wajima: a,
                  },
                ],
                iwate: [
                  1,
                  {
                    fudai: a,
                    fujisawa: a,
                    hanamaki: a,
                    hiraizumi: a,
                    hirono: a,
                    ichinohe: a,
                    ichinoseki: a,
                    iwaizumi: a,
                    iwate: a,
                    joboji: a,
                    kamaishi: a,
                    kanegasaki: a,
                    karumai: a,
                    kawai: a,
                    kitakami: a,
                    kuji: a,
                    kunohe: a,
                    kuzumaki: a,
                    miyako: a,
                    mizusawa: a,
                    morioka: a,
                    ninohe: a,
                    noda: a,
                    ofunato: a,
                    oshu: a,
                    otsuchi: a,
                    rikuzentakata: a,
                    shiwa: a,
                    shizukuishi: a,
                    sumita: a,
                    tanohata: a,
                    tono: a,
                    yahaba: a,
                    yamada: a,
                  },
                ],
                kagawa: [
                  1,
                  {
                    ayagawa: a,
                    higashikagawa: a,
                    kanonji: a,
                    kotohira: a,
                    manno: a,
                    marugame: a,
                    mitoyo: a,
                    naoshima: a,
                    sanuki: a,
                    tadotsu: a,
                    takamatsu: a,
                    tonosho: a,
                    uchinomi: a,
                    utazu: a,
                    zentsuji: a,
                  },
                ],
                kagoshima: [
                  1,
                  {
                    akune: a,
                    amami: a,
                    hioki: a,
                    isa: a,
                    isen: a,
                    izumi: a,
                    kagoshima: a,
                    kanoya: a,
                    kawanabe: a,
                    kinko: a,
                    kouyama: a,
                    makurazaki: a,
                    matsumoto: a,
                    minamitane: a,
                    nakatane: a,
                    nishinoomote: a,
                    satsumasendai: a,
                    soo: a,
                    tarumizu: a,
                    yusui: a,
                  },
                ],
                kanagawa: [
                  1,
                  {
                    aikawa: a,
                    atsugi: a,
                    ayase: a,
                    chigasaki: a,
                    ebina: a,
                    fujisawa: a,
                    hadano: a,
                    hakone: a,
                    hiratsuka: a,
                    isehara: a,
                    kaisei: a,
                    kamakura: a,
                    kiyokawa: a,
                    matsuda: a,
                    minamiashigara: a,
                    miura: a,
                    nakai: a,
                    ninomiya: a,
                    odawara: a,
                    oi: a,
                    oiso: a,
                    sagamihara: a,
                    samukawa: a,
                    tsukui: a,
                    yamakita: a,
                    yamato: a,
                    yokosuka: a,
                    yugawara: a,
                    zama: a,
                    zushi: a,
                  },
                ],
                kochi: [
                  1,
                  {
                    aki: a,
                    geisei: a,
                    hidaka: a,
                    higashitsuno: a,
                    ino: a,
                    kagami: a,
                    kami: a,
                    kitagawa: a,
                    kochi: a,
                    mihara: a,
                    motoyama: a,
                    muroto: a,
                    nahari: a,
                    nakamura: a,
                    nankoku: a,
                    nishitosa: a,
                    niyodogawa: a,
                    ochi: a,
                    okawa: a,
                    otoyo: a,
                    otsuki: a,
                    sakawa: a,
                    sukumo: a,
                    susaki: a,
                    tosa: a,
                    tosashimizu: a,
                    toyo: a,
                    tsuno: a,
                    umaji: a,
                    yasuda: a,
                    yusuhara: a,
                  },
                ],
                kumamoto: [
                  1,
                  {
                    amakusa: a,
                    arao: a,
                    aso: a,
                    choyo: a,
                    gyokuto: a,
                    kamiamakusa: a,
                    kikuchi: a,
                    kumamoto: a,
                    mashiki: a,
                    mifune: a,
                    minamata: a,
                    minamioguni: a,
                    nagasu: a,
                    nishihara: a,
                    oguni: a,
                    ozu: a,
                    sumoto: a,
                    takamori: a,
                    uki: a,
                    uto: a,
                    yamaga: a,
                    yamato: a,
                    yatsushiro: a,
                  },
                ],
                kyoto: [
                  1,
                  {
                    ayabe: a,
                    fukuchiyama: a,
                    higashiyama: a,
                    ide: a,
                    ine: a,
                    joyo: a,
                    kameoka: a,
                    kamo: a,
                    kita: a,
                    kizu: a,
                    kumiyama: a,
                    kyotamba: a,
                    kyotanabe: a,
                    kyotango: a,
                    maizuru: a,
                    minami: a,
                    minamiyamashiro: a,
                    miyazu: a,
                    muko: a,
                    nagaokakyo: a,
                    nakagyo: a,
                    nantan: a,
                    oyamazaki: a,
                    sakyo: a,
                    seika: a,
                    tanabe: a,
                    uji: a,
                    ujitawara: a,
                    wazuka: a,
                    yamashina: a,
                    yawata: a,
                  },
                ],
                mie: [
                  1,
                  {
                    asahi: a,
                    inabe: a,
                    ise: a,
                    kameyama: a,
                    kawagoe: a,
                    kiho: a,
                    kisosaki: a,
                    kiwa: a,
                    komono: a,
                    kumano: a,
                    kuwana: a,
                    matsusaka: a,
                    meiwa: a,
                    mihama: a,
                    minamiise: a,
                    misugi: a,
                    miyama: a,
                    nabari: a,
                    shima: a,
                    suzuka: a,
                    tado: a,
                    taiki: a,
                    taki: a,
                    tamaki: a,
                    toba: a,
                    tsu: a,
                    udono: a,
                    ureshino: a,
                    watarai: a,
                    yokkaichi: a,
                  },
                ],
                miyagi: [
                  1,
                  {
                    furukawa: a,
                    higashimatsushima: a,
                    ishinomaki: a,
                    iwanuma: a,
                    kakuda: a,
                    kami: a,
                    kawasaki: a,
                    marumori: a,
                    matsushima: a,
                    minamisanriku: a,
                    misato: a,
                    murata: a,
                    natori: a,
                    ogawara: a,
                    ohira: a,
                    onagawa: a,
                    osaki: a,
                    rifu: a,
                    semine: a,
                    shibata: a,
                    shichikashuku: a,
                    shikama: a,
                    shiogama: a,
                    shiroishi: a,
                    tagajo: a,
                    taiwa: a,
                    tome: a,
                    tomiya: a,
                    wakuya: a,
                    watari: a,
                    yamamoto: a,
                    zao: a,
                  },
                ],
                miyazaki: [
                  1,
                  {
                    aya: a,
                    ebino: a,
                    gokase: a,
                    hyuga: a,
                    kadogawa: a,
                    kawaminami: a,
                    kijo: a,
                    kitagawa: a,
                    kitakata: a,
                    kitaura: a,
                    kobayashi: a,
                    kunitomi: a,
                    kushima: a,
                    mimata: a,
                    miyakonojo: a,
                    miyazaki: a,
                    morotsuka: a,
                    nichinan: a,
                    nishimera: a,
                    nobeoka: a,
                    saito: a,
                    shiiba: a,
                    shintomi: a,
                    takaharu: a,
                    takanabe: a,
                    takazaki: a,
                    tsuno: a,
                  },
                ],
                nagano: [
                  1,
                  {
                    achi: a,
                    agematsu: a,
                    anan: a,
                    aoki: a,
                    asahi: a,
                    azumino: a,
                    chikuhoku: a,
                    chikuma: a,
                    chino: a,
                    fujimi: a,
                    hakuba: a,
                    hara: a,
                    hiraya: a,
                    iida: a,
                    iijima: a,
                    iiyama: a,
                    iizuna: a,
                    ikeda: a,
                    ikusaka: a,
                    ina: a,
                    karuizawa: a,
                    kawakami: a,
                    kiso: a,
                    kisofukushima: a,
                    kitaaiki: a,
                    komagane: a,
                    komoro: a,
                    matsukawa: a,
                    matsumoto: a,
                    miasa: a,
                    minamiaiki: a,
                    minamimaki: a,
                    minamiminowa: a,
                    minowa: a,
                    miyada: a,
                    miyota: a,
                    mochizuki: a,
                    nagano: a,
                    nagawa: a,
                    nagiso: a,
                    nakagawa: a,
                    nakano: a,
                    nozawaonsen: a,
                    obuse: a,
                    ogawa: a,
                    okaya: a,
                    omachi: a,
                    omi: a,
                    ookuwa: a,
                    ooshika: a,
                    otaki: a,
                    otari: a,
                    sakae: a,
                    sakaki: a,
                    saku: a,
                    sakuho: a,
                    shimosuwa: a,
                    shinanomachi: a,
                    shiojiri: a,
                    suwa: a,
                    suzaka: a,
                    takagi: a,
                    takamori: a,
                    takayama: a,
                    tateshina: a,
                    tatsuno: a,
                    togakushi: a,
                    togura: a,
                    tomi: a,
                    ueda: a,
                    wada: a,
                    yamagata: a,
                    yamanouchi: a,
                    yasaka: a,
                    yasuoka: a,
                  },
                ],
                nagasaki: [
                  1,
                  {
                    chijiwa: a,
                    futsu: a,
                    goto: a,
                    hasami: a,
                    hirado: a,
                    iki: a,
                    isahaya: a,
                    kawatana: a,
                    kuchinotsu: a,
                    matsuura: a,
                    nagasaki: a,
                    obama: a,
                    omura: a,
                    oseto: a,
                    saikai: a,
                    sasebo: a,
                    seihi: a,
                    shimabara: a,
                    shinkamigoto: a,
                    togitsu: a,
                    tsushima: a,
                    unzen: a,
                  },
                ],
                nara: [
                  1,
                  {
                    ando: a,
                    gose: a,
                    heguri: a,
                    higashiyoshino: a,
                    ikaruga: a,
                    ikoma: a,
                    kamikitayama: a,
                    kanmaki: a,
                    kashiba: a,
                    kashihara: a,
                    katsuragi: a,
                    kawai: a,
                    kawakami: a,
                    kawanishi: a,
                    koryo: a,
                    kurotaki: a,
                    mitsue: a,
                    miyake: a,
                    nara: a,
                    nosegawa: a,
                    oji: a,
                    ouda: a,
                    oyodo: a,
                    sakurai: a,
                    sango: a,
                    shimoichi: a,
                    shimokitayama: a,
                    shinjo: a,
                    soni: a,
                    takatori: a,
                    tawaramoto: a,
                    tenkawa: a,
                    tenri: a,
                    uda: a,
                    yamatokoriyama: a,
                    yamatotakada: a,
                    yamazoe: a,
                    yoshino: a,
                  },
                ],
                niigata: [
                  1,
                  {
                    aga: a,
                    agano: a,
                    gosen: a,
                    itoigawa: a,
                    izumozaki: a,
                    joetsu: a,
                    kamo: a,
                    kariwa: a,
                    kashiwazaki: a,
                    minamiuonuma: a,
                    mitsuke: a,
                    muika: a,
                    murakami: a,
                    myoko: a,
                    nagaoka: a,
                    niigata: a,
                    ojiya: a,
                    omi: a,
                    sado: a,
                    sanjo: a,
                    seiro: a,
                    seirou: a,
                    sekikawa: a,
                    shibata: a,
                    tagami: a,
                    tainai: a,
                    tochio: a,
                    tokamachi: a,
                    tsubame: a,
                    tsunan: a,
                    uonuma: a,
                    yahiko: a,
                    yoita: a,
                    yuzawa: a,
                  },
                ],
                oita: [
                  1,
                  {
                    beppu: a,
                    bungoono: a,
                    bungotakada: a,
                    hasama: a,
                    hiji: a,
                    himeshima: a,
                    hita: a,
                    kamitsue: a,
                    kokonoe: a,
                    kuju: a,
                    kunisaki: a,
                    kusu: a,
                    oita: a,
                    saiki: a,
                    taketa: a,
                    tsukumi: a,
                    usa: a,
                    usuki: a,
                    yufu: a,
                  },
                ],
                okayama: [
                  1,
                  {
                    akaiwa: a,
                    asakuchi: a,
                    bizen: a,
                    hayashima: a,
                    ibara: a,
                    kagamino: a,
                    kasaoka: a,
                    kibichuo: a,
                    kumenan: a,
                    kurashiki: a,
                    maniwa: a,
                    misaki: a,
                    nagi: a,
                    niimi: a,
                    nishiawakura: a,
                    okayama: a,
                    satosho: a,
                    setouchi: a,
                    shinjo: a,
                    shoo: a,
                    soja: a,
                    takahashi: a,
                    tamano: a,
                    tsuyama: a,
                    wake: a,
                    yakage: a,
                  },
                ],
                okinawa: [
                  1,
                  {
                    aguni: a,
                    ginowan: a,
                    ginoza: a,
                    gushikami: a,
                    haebaru: a,
                    higashi: a,
                    hirara: a,
                    iheya: a,
                    ishigaki: a,
                    ishikawa: a,
                    itoman: a,
                    izena: a,
                    kadena: a,
                    kin: a,
                    kitadaito: a,
                    kitanakagusuku: a,
                    kumejima: a,
                    kunigami: a,
                    minamidaito: a,
                    motobu: a,
                    nago: a,
                    naha: a,
                    nakagusuku: a,
                    nakijin: a,
                    nanjo: a,
                    nishihara: a,
                    ogimi: a,
                    okinawa: a,
                    onna: a,
                    shimoji: a,
                    taketomi: a,
                    tarama: a,
                    tokashiki: a,
                    tomigusuku: a,
                    tonaki: a,
                    urasoe: a,
                    uruma: a,
                    yaese: a,
                    yomitan: a,
                    yonabaru: a,
                    yonaguni: a,
                    zamami: a,
                  },
                ],
                osaka: [
                  1,
                  {
                    abeno: a,
                    chihayaakasaka: a,
                    chuo: a,
                    daito: a,
                    fujiidera: a,
                    habikino: a,
                    hannan: a,
                    higashiosaka: a,
                    higashisumiyoshi: a,
                    higashiyodogawa: a,
                    hirakata: a,
                    ibaraki: a,
                    ikeda: a,
                    izumi: a,
                    izumiotsu: a,
                    izumisano: a,
                    kadoma: a,
                    kaizuka: a,
                    kanan: a,
                    kashiwara: a,
                    katano: a,
                    kawachinagano: a,
                    kishiwada: a,
                    kita: a,
                    kumatori: a,
                    matsubara: a,
                    minato: a,
                    minoh: a,
                    misaki: a,
                    moriguchi: a,
                    neyagawa: a,
                    nishi: a,
                    nose: a,
                    osakasayama: a,
                    sakai: a,
                    sayama: a,
                    sennan: a,
                    settsu: a,
                    shijonawate: a,
                    shimamoto: a,
                    suita: a,
                    tadaoka: a,
                    taishi: a,
                    tajiri: a,
                    takaishi: a,
                    takatsuki: a,
                    tondabayashi: a,
                    toyonaka: a,
                    toyono: a,
                    yao: a,
                  },
                ],
                saga: [
                  1,
                  {
                    ariake: a,
                    arita: a,
                    fukudomi: a,
                    genkai: a,
                    hamatama: a,
                    hizen: a,
                    imari: a,
                    kamimine: a,
                    kanzaki: a,
                    karatsu: a,
                    kashima: a,
                    kitagata: a,
                    kitahata: a,
                    kiyama: a,
                    kouhoku: a,
                    kyuragi: a,
                    nishiarita: a,
                    ogi: a,
                    omachi: a,
                    ouchi: a,
                    saga: a,
                    shiroishi: a,
                    taku: a,
                    tara: a,
                    tosu: a,
                    yoshinogari: a,
                  },
                ],
                saitama: [
                  1,
                  {
                    arakawa: a,
                    asaka: a,
                    chichibu: a,
                    fujimi: a,
                    fujimino: a,
                    fukaya: a,
                    hanno: a,
                    hanyu: a,
                    hasuda: a,
                    hatogaya: a,
                    hatoyama: a,
                    hidaka: a,
                    higashichichibu: a,
                    higashimatsuyama: a,
                    honjo: a,
                    ina: a,
                    iruma: a,
                    iwatsuki: a,
                    kamiizumi: a,
                    kamikawa: a,
                    kamisato: a,
                    kasukabe: a,
                    kawagoe: a,
                    kawaguchi: a,
                    kawajima: a,
                    kazo: a,
                    kitamoto: a,
                    koshigaya: a,
                    kounosu: a,
                    kuki: a,
                    kumagaya: a,
                    matsubushi: a,
                    minano: a,
                    misato: a,
                    miyashiro: a,
                    miyoshi: a,
                    moroyama: a,
                    nagatoro: a,
                    namegawa: a,
                    niiza: a,
                    ogano: a,
                    ogawa: a,
                    ogose: a,
                    okegawa: a,
                    omiya: a,
                    otaki: a,
                    ranzan: a,
                    ryokami: a,
                    saitama: a,
                    sakado: a,
                    satte: a,
                    sayama: a,
                    shiki: a,
                    shiraoka: a,
                    soka: a,
                    sugito: a,
                    toda: a,
                    tokigawa: a,
                    tokorozawa: a,
                    tsurugashima: a,
                    urawa: a,
                    warabi: a,
                    yashio: a,
                    yokoze: a,
                    yono: a,
                    yorii: a,
                    yoshida: a,
                    yoshikawa: a,
                    yoshimi: a,
                  },
                ],
                shiga: [
                  1,
                  {
                    aisho: a,
                    gamo: a,
                    higashiomi: a,
                    hikone: a,
                    koka: a,
                    konan: a,
                    kosei: a,
                    koto: a,
                    kusatsu: a,
                    maibara: a,
                    moriyama: a,
                    nagahama: a,
                    nishiazai: a,
                    notogawa: a,
                    omihachiman: a,
                    otsu: a,
                    ritto: a,
                    ryuoh: a,
                    takashima: a,
                    takatsuki: a,
                    torahime: a,
                    toyosato: a,
                    yasu: a,
                  },
                ],
                shimane: [
                  1,
                  {
                    akagi: a,
                    ama: a,
                    gotsu: a,
                    hamada: a,
                    higashiizumo: a,
                    hikawa: a,
                    hikimi: a,
                    izumo: a,
                    kakinoki: a,
                    masuda: a,
                    matsue: a,
                    misato: a,
                    nishinoshima: a,
                    ohda: a,
                    okinoshima: a,
                    okuizumo: a,
                    shimane: a,
                    tamayu: a,
                    tsuwano: a,
                    unnan: a,
                    yakumo: a,
                    yasugi: a,
                    yatsuka: a,
                  },
                ],
                shizuoka: [
                  1,
                  {
                    arai: a,
                    atami: a,
                    fuji: a,
                    fujieda: a,
                    fujikawa: a,
                    fujinomiya: a,
                    fukuroi: a,
                    gotemba: a,
                    haibara: a,
                    hamamatsu: a,
                    higashiizu: a,
                    ito: a,
                    iwata: a,
                    izu: a,
                    izunokuni: a,
                    kakegawa: a,
                    kannami: a,
                    kawanehon: a,
                    kawazu: a,
                    kikugawa: a,
                    kosai: a,
                    makinohara: a,
                    matsuzaki: a,
                    minamiizu: a,
                    mishima: a,
                    morimachi: a,
                    nishiizu: a,
                    numazu: a,
                    omaezaki: a,
                    shimada: a,
                    shimizu: a,
                    shimoda: a,
                    shizuoka: a,
                    susono: a,
                    yaizu: a,
                    yoshida: a,
                  },
                ],
                tochigi: [
                  1,
                  {
                    ashikaga: a,
                    bato: a,
                    haga: a,
                    ichikai: a,
                    iwafune: a,
                    kaminokawa: a,
                    kanuma: a,
                    karasuyama: a,
                    kuroiso: a,
                    mashiko: a,
                    mibu: a,
                    moka: a,
                    motegi: a,
                    nasu: a,
                    nasushiobara: a,
                    nikko: a,
                    nishikata: a,
                    nogi: a,
                    ohira: a,
                    ohtawara: a,
                    oyama: a,
                    sakura: a,
                    sano: a,
                    shimotsuke: a,
                    shioya: a,
                    takanezawa: a,
                    tochigi: a,
                    tsuga: a,
                    ujiie: a,
                    utsunomiya: a,
                    yaita: a,
                  },
                ],
                tokushima: [
                  1,
                  {
                    aizumi: a,
                    anan: a,
                    ichiba: a,
                    itano: a,
                    kainan: a,
                    komatsushima: a,
                    matsushige: a,
                    mima: a,
                    minami: a,
                    miyoshi: a,
                    mugi: a,
                    nakagawa: a,
                    naruto: a,
                    sanagochi: a,
                    shishikui: a,
                    tokushima: a,
                    wajiki: a,
                  },
                ],
                tokyo: [
                  1,
                  {
                    adachi: a,
                    akiruno: a,
                    akishima: a,
                    aogashima: a,
                    arakawa: a,
                    bunkyo: a,
                    chiyoda: a,
                    chofu: a,
                    chuo: a,
                    edogawa: a,
                    fuchu: a,
                    fussa: a,
                    hachijo: a,
                    hachioji: a,
                    hamura: a,
                    higashikurume: a,
                    higashimurayama: a,
                    higashiyamato: a,
                    hino: a,
                    hinode: a,
                    hinohara: a,
                    inagi: a,
                    itabashi: a,
                    katsushika: a,
                    kita: a,
                    kiyose: a,
                    kodaira: a,
                    koganei: a,
                    kokubunji: a,
                    komae: a,
                    koto: a,
                    kouzushima: a,
                    kunitachi: a,
                    machida: a,
                    meguro: a,
                    minato: a,
                    mitaka: a,
                    mizuho: a,
                    musashimurayama: a,
                    musashino: a,
                    nakano: a,
                    nerima: a,
                    ogasawara: a,
                    okutama: a,
                    ome: a,
                    oshima: a,
                    ota: a,
                    setagaya: a,
                    shibuya: a,
                    shinagawa: a,
                    shinjuku: a,
                    suginami: a,
                    sumida: a,
                    tachikawa: a,
                    taito: a,
                    tama: a,
                    toshima: a,
                  },
                ],
                tottori: [
                  1,
                  {
                    chizu: a,
                    hino: a,
                    kawahara: a,
                    koge: a,
                    kotoura: a,
                    misasa: a,
                    nanbu: a,
                    nichinan: a,
                    sakaiminato: a,
                    tottori: a,
                    wakasa: a,
                    yazu: a,
                    yonago: a,
                  },
                ],
                toyama: [
                  1,
                  {
                    asahi: a,
                    fuchu: a,
                    fukumitsu: a,
                    funahashi: a,
                    himi: a,
                    imizu: a,
                    inami: a,
                    johana: a,
                    kamiichi: a,
                    kurobe: a,
                    nakaniikawa: a,
                    namerikawa: a,
                    nanto: a,
                    nyuzen: a,
                    oyabe: a,
                    taira: a,
                    takaoka: a,
                    tateyama: a,
                    toga: a,
                    tonami: a,
                    toyama: a,
                    unazuki: a,
                    uozu: a,
                    yamada: a,
                  },
                ],
                wakayama: [
                  1,
                  {
                    arida: a,
                    aridagawa: a,
                    gobo: a,
                    hashimoto: a,
                    hidaka: a,
                    hirogawa: a,
                    inami: a,
                    iwade: a,
                    kainan: a,
                    kamitonda: a,
                    katsuragi: a,
                    kimino: a,
                    kinokawa: a,
                    kitayama: a,
                    koya: a,
                    koza: a,
                    kozagawa: a,
                    kudoyama: a,
                    kushimoto: a,
                    mihama: a,
                    misato: a,
                    nachikatsuura: a,
                    shingu: a,
                    shirahama: a,
                    taiji: a,
                    tanabe: a,
                    wakayama: a,
                    yuasa: a,
                    yura: a,
                  },
                ],
                yamagata: [
                  1,
                  {
                    asahi: a,
                    funagata: a,
                    higashine: a,
                    iide: a,
                    kahoku: a,
                    kaminoyama: a,
                    kaneyama: a,
                    kawanishi: a,
                    mamurogawa: a,
                    mikawa: a,
                    murayama: a,
                    nagai: a,
                    nakayama: a,
                    nanyo: a,
                    nishikawa: a,
                    obanazawa: a,
                    oe: a,
                    oguni: a,
                    ohkura: a,
                    oishida: a,
                    sagae: a,
                    sakata: a,
                    sakegawa: a,
                    shinjo: a,
                    shirataka: a,
                    shonai: a,
                    takahata: a,
                    tendo: a,
                    tozawa: a,
                    tsuruoka: a,
                    yamagata: a,
                    yamanobe: a,
                    yonezawa: a,
                    yuza: a,
                  },
                ],
                yamaguchi: [
                  1,
                  {
                    abu: a,
                    hagi: a,
                    hikari: a,
                    hofu: a,
                    iwakuni: a,
                    kudamatsu: a,
                    mitou: a,
                    nagato: a,
                    oshima: a,
                    shimonoseki: a,
                    shunan: a,
                    tabuse: a,
                    tokuyama: a,
                    toyota: a,
                    ube: a,
                    yuu: a,
                  },
                ],
                yamanashi: [
                  1,
                  {
                    chuo: a,
                    doshi: a,
                    fuefuki: a,
                    fujikawa: a,
                    fujikawaguchiko: a,
                    fujiyoshida: a,
                    hayakawa: a,
                    hokuto: a,
                    ichikawamisato: a,
                    kai: a,
                    kofu: a,
                    koshu: a,
                    kosuge: a,
                    "minami-alps": a,
                    minobu: a,
                    nakamichi: a,
                    nanbu: a,
                    narusawa: a,
                    nirasaki: a,
                    nishikatsura: a,
                    oshino: a,
                    otsuki: a,
                    showa: a,
                    tabayama: a,
                    tsuru: a,
                    uenohara: a,
                    yamanakako: a,
                    yamanashi: a,
                  },
                ],
                "xn--4pvxs": a,
                栃木: a,
                "xn--vgu402c": a,
                愛知: a,
                "xn--c3s14m": a,
                愛媛: a,
                "xn--f6qx53a": a,
                兵庫: a,
                "xn--8pvr4u": a,
                熊本: a,
                "xn--uist22h": a,
                茨城: a,
                "xn--djrs72d6uy": a,
                北海道: a,
                "xn--mkru45i": a,
                千葉: a,
                "xn--0trq7p7nn": a,
                和歌山: a,
                "xn--8ltr62k": a,
                長崎: a,
                "xn--2m4a15e": a,
                長野: a,
                "xn--efvn9s": a,
                新潟: a,
                "xn--32vp30h": a,
                青森: a,
                "xn--4it797k": a,
                静岡: a,
                "xn--1lqs71d": a,
                東京: a,
                "xn--5rtp49c": a,
                石川: a,
                "xn--5js045d": a,
                埼玉: a,
                "xn--ehqz56n": a,
                三重: a,
                "xn--1lqs03n": a,
                京都: a,
                "xn--qqqt11m": a,
                佐賀: a,
                "xn--kbrq7o": a,
                大分: a,
                "xn--pssu33l": a,
                大阪: a,
                "xn--ntsq17g": a,
                奈良: a,
                "xn--uisz3g": a,
                宮城: a,
                "xn--6btw5a": a,
                宮崎: a,
                "xn--1ctwo": a,
                富山: a,
                "xn--6orx2r": a,
                山口: a,
                "xn--rht61e": a,
                山形: a,
                "xn--rht27z": a,
                山梨: a,
                "xn--djty4k": a,
                岩手: a,
                "xn--nit225k": a,
                岐阜: a,
                "xn--rht3d": a,
                岡山: a,
                "xn--klty5x": a,
                島根: a,
                "xn--kltx9a": a,
                広島: a,
                "xn--kltp7d": a,
                徳島: a,
                "xn--uuwu58a": a,
                沖縄: a,
                "xn--zbx025d": a,
                滋賀: a,
                "xn--ntso0iqx3a": a,
                神奈川: a,
                "xn--elqq16h": a,
                福井: a,
                "xn--4it168d": a,
                福岡: a,
                "xn--klt787d": a,
                福島: a,
                "xn--rny31h": a,
                秋田: a,
                "xn--7t0a264c": a,
                群馬: a,
                "xn--5rtq34k": a,
                香川: a,
                "xn--k7yn95e": a,
                高知: a,
                "xn--tor131o": a,
                鳥取: a,
                "xn--d5qv7z876c": a,
                鹿児島: a,
                kawasaki: s,
                kitakyushu: s,
                kobe: s,
                nagoya: s,
                sapporo: s,
                sendai: s,
                yokohama: s,
                buyshop: e,
                fashionstore: e,
                handcrafted: e,
                kawaiishop: e,
                supersale: e,
                theshop: e,
                usercontent: e,
                angry: e,
                babyblue: e,
                babymilk: e,
                backdrop: e,
                bambina: e,
                bitter: e,
                blush: e,
                boo: e,
                boy: e,
                boyfriend: e,
                but: e,
                candypop: e,
                capoo: e,
                catfood: e,
                cheap: e,
                chicappa: e,
                chillout: e,
                chips: e,
                chowder: e,
                chu: e,
                ciao: e,
                cocotte: e,
                coolblog: e,
                cranky: e,
                cutegirl: e,
                daa: e,
                deca: e,
                deci: e,
                digick: e,
                egoism: e,
                fakefur: e,
                fem: e,
                flier: e,
                floppy: e,
                fool: e,
                frenchkiss: e,
                girlfriend: e,
                girly: e,
                gloomy: e,
                gonna: e,
                greater: e,
                hacca: e,
                heavy: e,
                her: e,
                hiho: e,
                hippy: e,
                holy: e,
                hungry: e,
                icurus: e,
                itigo: e,
                jellybean: e,
                kikirara: e,
                kill: e,
                kilo: e,
                kuron: e,
                littlestar: e,
                lolipopmc: e,
                lolitapunk: e,
                lomo: e,
                lovepop: e,
                lovesick: e,
                main: e,
                mods: e,
                mond: e,
                mongolian: e,
                moo: e,
                namaste: e,
                nikita: e,
                nobushi: e,
                noor: e,
                oops: e,
                parallel: e,
                parasite: e,
                pecori: e,
                peewee: e,
                penne: e,
                pepper: e,
                perma: e,
                pigboat: e,
                pinoko: e,
                punyu: e,
                pupu: e,
                pussycat: e,
                pya: e,
                raindrop: e,
                readymade: e,
                sadist: e,
                schoolbus: e,
                secret: e,
                staba: e,
                stripper: e,
                sub: e,
                sunnyday: e,
                thick: e,
                tonkotsu: e,
                under: e,
                upper: e,
                velvet: e,
                verse: e,
                versus: e,
                vivian: e,
                watson: e,
                weblike: e,
                whitesnow: e,
                zombie: e,
                blogspot: e,
                "2-d": e,
                bona: e,
                crap: e,
                daynight: e,
                eek: e,
                flop: e,
                halfmoon: e,
                jeez: e,
                matrix: e,
                mimoza: e,
                netgamers: e,
                nyanta: e,
                o0o0: e,
                rdy: e,
                rgr: e,
                rulez: e,
                sakurastorage: [0, { isk01: u, isk02: u }],
                saloon: e,
                sblo: e,
                skr: e,
                tank: e,
                "uh-oh": e,
                undo: e,
                webaccel: [0, { rs: e, user: e }],
                websozai: e,
                xii: e,
              },
            ],
            ke: [1, { ac: a, co: o, go: a, info: a, me: a, mobi: a, ne: a, or: a, sc: a }],
            kg: [1, { org: a, net: a, com: a, edu: a, gov: a, mil: a, blog: e, io: e, jp: e, tv: e, uk: e, us: e }],
            kh: s,
            ki: R,
            km: [
              1,
              {
                org: a,
                nom: a,
                gov: a,
                prd: a,
                tm: a,
                edu: a,
                mil: a,
                ass: a,
                com: a,
                coop: a,
                asso: a,
                presse: a,
                medecin: a,
                notaires: a,
                pharmaciens: a,
                veterinaire: a,
                gouv: a,
              },
            ],
            kn: [1, { net: a, org: a, edu: a, gov: a }],
            kp: [1, { com: a, edu: a, gov: a, org: a, rep: a, tra: a }],
            kr: [
              1,
              {
                ac: a,
                co: a,
                es: a,
                go: a,
                hs: a,
                kg: a,
                mil: a,
                ms: a,
                ne: a,
                or: a,
                pe: a,
                re: a,
                sc: a,
                busan: a,
                chungbuk: a,
                chungnam: a,
                daegu: a,
                daejeon: a,
                gangwon: a,
                gwangju: a,
                gyeongbuk: a,
                gyeonggi: a,
                gyeongnam: a,
                incheon: a,
                jeju: a,
                jeonbuk: a,
                jeonnam: a,
                seoul: a,
                ulsan: a,
                blogspot: e,
              },
            ],
            kw: [1, { com: a, edu: a, emb: a, gov: a, ind: a, net: a, org: a }],
            ky: S,
            kz: [1, { org: a, edu: a, net: a, gov: a, mil: a, com: a, jcloud: e, kazteleport: [0, { upaas: e }] }],
            la: [1, { int: a, net: a, info: a, edu: a, gov: a, per: a, com: a, org: a, bnr: e, c: e }],
            lb: t,
            lc: [1, { com: a, net: a, co: a, org: a, edu: a, gov: a, oy: e }],
            li: [1, { blogspot: e, caa: e }],
            lk: [
              1,
              {
                gov: a,
                sch: a,
                net: a,
                int: a,
                com: a,
                org: a,
                edu: a,
                ngo: a,
                soc: a,
                web: a,
                ltd: a,
                assn: a,
                grp: a,
                hotel: a,
                ac: a,
              },
            ],
            lr: t,
            ls: [1, { ac: a, biz: a, co: a, edu: a, gov: a, info: a, net: a, org: a, sc: a, de: e }],
            lt: T,
            lu: [1, { blogspot: e, "123website": e }],
            lv: [1, { com: a, edu: a, gov: a, org: a, mil: a, id: a, net: a, asn: a, conf: a }],
            ly: [1, { com: a, net: a, gov: a, plc: a, edu: a, sch: a, med: a, org: a, id: a }],
            ma: [1, { co: a, net: a, gov: a, org: a, ac: a, press: a }],
            mc: [1, { tm: a, asso: a }],
            md: [1, { blogspot: e, at: e, de: e, jp: e, to: e }],
            me: [
              1,
              {
                co: a,
                net: a,
                org: a,
                edu: a,
                ac: a,
                gov: a,
                its: a,
                priv: a,
                c66: e,
                daplie: [2, { localhost: e }],
                edgestack: e,
                filegear: e,
                "filegear-au": e,
                "filegear-de": e,
                "filegear-gb": e,
                "filegear-ie": e,
                "filegear-jp": e,
                "filegear-sg": e,
                glitch: e,
                ravendb: e,
                lohmus: e,
                barsy: e,
                mcpe: e,
                mcdir: e,
                soundcast: e,
                tcp4: e,
                brasilia: e,
                ddns: e,
                dnsfor: e,
                hopto: e,
                loginto: e,
                noip: e,
                webhop: e,
                vp4: e,
                diskstation: e,
                dscloud: e,
                i234: e,
                myds: e,
                synology: e,
                transip: z,
                wedeploy: e,
                yombo: e,
                nohost: e,
              },
            ],
            mg: [1, { org: a, nom: a, gov: a, prd: a, tm: a, edu: a, mil: a, com: a, co: a }],
            mh: a,
            mil: a,
            mk: [1, { com: a, org: a, net: a, edu: a, gov: a, inf: a, name: a, blogspot: e }],
            ml: [1, { com: a, edu: a, gouv: a, gov: a, net: a, org: a, presse: a }],
            mm: s,
            mn: [1, { gov: a, edu: a, org: a, nyc: e }],
            mo: t,
            mobi: [1, { barsy: e, dscloud: e }],
            mp: [1, { ju: e }],
            mq: a,
            mr: T,
            ms: [1, { com: a, edu: a, gov: a, net: a, org: a, lab: e, minisite: e }],
            mt: [1, { com: o, edu: a, net: a, org: a }],
            mu: [1, { com: a, net: a, org: a, gov: a, ac: a, co: a, or: a }],
            museum: a,
            mv: [
              1,
              {
                aero: a,
                biz: a,
                com: a,
                coop: a,
                edu: a,
                gov: a,
                info: a,
                int: a,
                mil: a,
                museum: a,
                name: a,
                net: a,
                org: a,
                pro: a,
              },
            ],
            mw: [1, { ac: a, biz: a, co: a, com: a, coop: a, edu: a, gov: a, int: a, museum: a, net: a, org: a }],
            mx: [1, { com: a, org: a, gob: a, edu: a, net: a, blogspot: e }],
            my: [1, { biz: a, com: a, edu: a, gov: a, mil: a, name: a, net: a, org: a, blogspot: e }],
            mz: [1, { ac: a, adv: a, co: a, edu: a, gov: a, mil: a, net: a, org: a }],
            na: [
              1,
              {
                info: a,
                pro: a,
                name: a,
                school: a,
                or: a,
                dr: a,
                us: a,
                mx: a,
                ca: a,
                in: a,
                cc: a,
                tv: a,
                ws: a,
                mobi: a,
                co: a,
                com: a,
                org: a,
              },
            ],
            name: [1, { her: L, his: L }],
            nc: [1, { asso: a, nom: a }],
            ne: a,
            net: [
              1,
              {
                adobeaemcloud: e,
                "adobeio-static": e,
                adobeioruntime: e,
                akadns: e,
                akamai: e,
                "akamai-staging": e,
                akamaiedge: e,
                "akamaiedge-staging": e,
                akamaihd: e,
                "akamaihd-staging": e,
                akamaiorigin: e,
                "akamaiorigin-staging": e,
                akamaized: e,
                "akamaized-staging": e,
                edgekey: e,
                "edgekey-staging": e,
                edgesuite: e,
                "edgesuite-staging": e,
                alwaysdata: e,
                myamaze: e,
                cloudfront: e,
                t3l3p0rt: e,
                appudo: e,
                "atlassian-dev": [0, { prod: [0, { cdn: e }] }],
                myfritz: e,
                onavstack: e,
                shopselect: e,
                blackbaudcdn: e,
                boomla: e,
                bplaced: e,
                square7: e,
                gb: e,
                hu: e,
                jp: e,
                se: e,
                uk: e,
                in: e,
                clickrising: e,
                cloudaccess: e,
                "cdn77-ssl": e,
                cdn77: [0, { r: e }],
                "feste-ip": e,
                "knx-server": e,
                "static-access": e,
                cryptonomic: n,
                dattolocal: e,
                mydatto: e,
                debian: e,
                bitbridge: e,
                "at-band-camp": e,
                blogdns: e,
                "broke-it": e,
                buyshouses: e,
                dnsalias: e,
                dnsdojo: e,
                "does-it": e,
                dontexist: e,
                dynalias: e,
                dynathome: e,
                endofinternet: e,
                "from-az": e,
                "from-co": e,
                "from-la": e,
                "from-ny": e,
                "gets-it": e,
                "ham-radio-op": e,
                homeftp: e,
                homeip: e,
                homelinux: e,
                homeunix: e,
                "in-the-band": e,
                "is-a-chef": e,
                "is-a-geek": e,
                "isa-geek": e,
                "kicks-ass": e,
                "office-on-the": e,
                podzone: e,
                "scrapper-site": e,
                selfip: e,
                "sells-it": e,
                servebbs: e,
                serveftp: e,
                thruhere: e,
                webhop: e,
                definima: e,
                casacam: e,
                dynu: e,
                dynv6: e,
                twmail: e,
                ru: e,
                channelsdvr: [2, { u: e }],
                fastlylb: [2, { map: e }],
                fastly: [
                  0,
                  { freetls: e, map: e, prod: [0, { a: e, global: e }], ssl: [0, { a: e, b: e, global: e }] },
                ],
                edgeapp: e,
                flynnhosting: e,
                "cdn-edges": e,
                heteml: e,
                cloudfunctions: e,
                moonscale: e,
                "in-dsl": e,
                "in-vpn": e,
                ipifony: e,
                iobb: e,
                cloudjiffy: [2, { "fra1-de": e, "west1-us": e }],
                elastx: [0, { "jls-sto1": e, "jls-sto2": e, "jls-sto3": e }],
                faststacks: e,
                massivegrid: [0, { paas: [0, { "fr-1": e, "lon-1": e, "lon-2": e, "ny-1": e, "ny-2": e, "sg-1": e }] }],
                saveincloud: [0, { jelastic: e, "nordeste-idc": e }],
                scaleforce: q,
                tsukaeru: $,
                kinghost: e,
                uni5: e,
                krellian: e,
                barsy: e,
                memset: e,
                azurewebsites: e,
                "azure-mobile": e,
                cloudapp: e,
                azurestaticapps: [
                  2,
                  { 1: e, 2: e, 3: e, centralus: e, eastasia: e, eastus2: e, westeurope: e, westus2: e },
                ],
                dnsup: e,
                hicam: e,
                "now-dns": e,
                ownip: e,
                vpndns: e,
                "eating-organic": e,
                mydissent: e,
                myeffect: e,
                mymediapc: e,
                mypsx: e,
                mysecuritycamera: e,
                nhlfan: e,
                "no-ip": e,
                pgafan: e,
                privatizehealthinsurance: e,
                bounceme: e,
                ddns: e,
                redirectme: e,
                serveblog: e,
                serveminecraft: e,
                sytes: e,
                cloudycluster: e,
                ovh: [0, { webpaas: n, hosting: n }],
                bar0: e,
                bar1: e,
                bar2: e,
                rackmaze: e,
                squares: e,
                schokokeks: e,
                "firewall-gateway": e,
                seidat: e,
                senseering: e,
                siteleaf: e,
                "vps-host": [2, { jelastic: [0, { atl: e, njs: e, ric: e }] }],
                myspreadshop: e,
                srcf: [0, { soc: e, user: e }],
                supabase: e,
                dsmynas: e,
                familyds: e,
                tailscale: [0, { beta: e }],
                ts: e,
                torproject: [2, { pages: e }],
                "reserve-online": e,
                "community-pro": e,
                meinforum: e,
                yandexcloud: [2, { storage: e, website: e }],
                za: e,
              },
            ],
            nf: [1, { com: a, net: a, per: a, rec: a, web: a, arts: a, firm: a, info: a, other: a, store: a }],
            ng: [
              1,
              {
                com: o,
                edu: a,
                gov: a,
                i: a,
                mil: a,
                mobi: a,
                name: a,
                net: a,
                org: a,
                sch: a,
                col: e,
                firm: e,
                gen: e,
                ltd: e,
                ngo: e,
              },
            ],
            ni: [
              1,
              {
                ac: a,
                biz: a,
                co: a,
                com: a,
                edu: a,
                gob: a,
                in: a,
                info: a,
                int: a,
                mil: a,
                net: a,
                nom: a,
                org: a,
                web: a,
              },
            ],
            nl: [
              1,
              {
                co: e,
                "hosting-cluster": e,
                blogspot: e,
                gov: e,
                khplay: e,
                "123website": e,
                myspreadshop: e,
                transurl: n,
                cistron: e,
                demon: e,
              },
            ],
            no: [
              1,
              {
                fhs: a,
                vgs: a,
                fylkesbibl: a,
                folkebibl: a,
                museum: a,
                idrett: a,
                priv: a,
                mil: a,
                stat: a,
                dep: a,
                kommune: a,
                herad: a,
                aa: E,
                ah: E,
                bu: E,
                fm: E,
                hl: E,
                hm: E,
                "jan-mayen": E,
                mr: E,
                nl: E,
                nt: E,
                of: E,
                ol: E,
                oslo: E,
                rl: E,
                sf: E,
                st: E,
                svalbard: E,
                tm: E,
                tr: E,
                va: E,
                vf: E,
                akrehamn: a,
                "xn--krehamn-dxa": a,
                åkrehamn: a,
                algard: a,
                "xn--lgrd-poac": a,
                ålgård: a,
                arna: a,
                brumunddal: a,
                bryne: a,
                bronnoysund: a,
                "xn--brnnysund-m8ac": a,
                brønnøysund: a,
                drobak: a,
                "xn--drbak-wua": a,
                drøbak: a,
                egersund: a,
                fetsund: a,
                floro: a,
                "xn--flor-jra": a,
                florø: a,
                fredrikstad: a,
                hokksund: a,
                honefoss: a,
                "xn--hnefoss-q1a": a,
                hønefoss: a,
                jessheim: a,
                jorpeland: a,
                "xn--jrpeland-54a": a,
                jørpeland: a,
                kirkenes: a,
                kopervik: a,
                krokstadelva: a,
                langevag: a,
                "xn--langevg-jxa": a,
                langevåg: a,
                leirvik: a,
                mjondalen: a,
                "xn--mjndalen-64a": a,
                mjøndalen: a,
                "mo-i-rana": a,
                mosjoen: a,
                "xn--mosjen-eya": a,
                mosjøen: a,
                nesoddtangen: a,
                orkanger: a,
                osoyro: a,
                "xn--osyro-wua": a,
                osøyro: a,
                raholt: a,
                "xn--rholt-mra": a,
                råholt: a,
                sandnessjoen: a,
                "xn--sandnessjen-ogb": a,
                sandnessjøen: a,
                skedsmokorset: a,
                slattum: a,
                spjelkavik: a,
                stathelle: a,
                stavern: a,
                stjordalshalsen: a,
                "xn--stjrdalshalsen-sqb": a,
                stjørdalshalsen: a,
                tananger: a,
                tranby: a,
                vossevangen: a,
                afjord: a,
                "xn--fjord-lra": a,
                åfjord: a,
                agdenes: a,
                al: a,
                "xn--l-1fa": a,
                ål: a,
                alesund: a,
                "xn--lesund-hua": a,
                ålesund: a,
                alstahaug: a,
                alta: a,
                "xn--lt-liac": a,
                áltá: a,
                alaheadju: a,
                "xn--laheadju-7ya": a,
                álaheadju: a,
                alvdal: a,
                amli: a,
                "xn--mli-tla": a,
                åmli: a,
                amot: a,
                "xn--mot-tla": a,
                åmot: a,
                andebu: a,
                andoy: a,
                "xn--andy-ira": a,
                andøy: a,
                andasuolo: a,
                ardal: a,
                "xn--rdal-poa": a,
                årdal: a,
                aremark: a,
                arendal: a,
                "xn--s-1fa": a,
                ås: a,
                aseral: a,
                "xn--seral-lra": a,
                åseral: a,
                asker: a,
                askim: a,
                askvoll: a,
                askoy: a,
                "xn--asky-ira": a,
                askøy: a,
                asnes: a,
                "xn--snes-poa": a,
                åsnes: a,
                audnedaln: a,
                aukra: a,
                aure: a,
                aurland: a,
                "aurskog-holand": a,
                "xn--aurskog-hland-jnb": a,
                "aurskog-h\xf8land": a,
                austevoll: a,
                austrheim: a,
                averoy: a,
                "xn--avery-yua": a,
                averøy: a,
                balestrand: a,
                ballangen: a,
                balat: a,
                "xn--blt-elab": a,
                bálát: a,
                balsfjord: a,
                bahccavuotna: a,
                "xn--bhccavuotna-k7a": a,
                báhccavuotna: a,
                bamble: a,
                bardu: a,
                beardu: a,
                beiarn: a,
                bajddar: a,
                "xn--bjddar-pta": a,
                bájddar: a,
                baidar: a,
                "xn--bidr-5nac": a,
                báidár: a,
                berg: a,
                bergen: a,
                berlevag: a,
                "xn--berlevg-jxa": a,
                berlevåg: a,
                bearalvahki: a,
                "xn--bearalvhki-y4a": a,
                bearalváhki: a,
                bindal: a,
                birkenes: a,
                bjarkoy: a,
                "xn--bjarky-fya": a,
                bjarkøy: a,
                bjerkreim: a,
                bjugn: a,
                bodo: a,
                "xn--bod-2na": a,
                bodø: a,
                badaddja: a,
                "xn--bdddj-mrabd": a,
                bådåddjå: a,
                budejju: a,
                bokn: a,
                bremanger: a,
                bronnoy: a,
                "xn--brnny-wuac": a,
                brønnøy: a,
                bygland: a,
                bykle: a,
                barum: a,
                "xn--brum-voa": a,
                bærum: a,
                telemark: [0, { bo: a, "xn--b-5ga": a, bø: a }],
                nordland: [0, { bo: a, "xn--b-5ga": a, bø: a, heroy: a, "xn--hery-ira": a, herøy: a }],
                bievat: a,
                "xn--bievt-0qa": a,
                bievát: a,
                bomlo: a,
                "xn--bmlo-gra": a,
                bømlo: a,
                batsfjord: a,
                "xn--btsfjord-9za": a,
                båtsfjord: a,
                bahcavuotna: a,
                "xn--bhcavuotna-s4a": a,
                báhcavuotna: a,
                dovre: a,
                drammen: a,
                drangedal: a,
                dyroy: a,
                "xn--dyry-ira": a,
                dyrøy: a,
                donna: a,
                "xn--dnna-gra": a,
                dønna: a,
                eid: a,
                eidfjord: a,
                eidsberg: a,
                eidskog: a,
                eidsvoll: a,
                eigersund: a,
                elverum: a,
                enebakk: a,
                engerdal: a,
                etne: a,
                etnedal: a,
                evenes: a,
                evenassi: a,
                "xn--eveni-0qa01ga": a,
                evenášši: a,
                "evje-og-hornnes": a,
                farsund: a,
                fauske: a,
                fuossko: a,
                fuoisku: a,
                fedje: a,
                fet: a,
                finnoy: a,
                "xn--finny-yua": a,
                finnøy: a,
                fitjar: a,
                fjaler: a,
                fjell: a,
                flakstad: a,
                flatanger: a,
                flekkefjord: a,
                flesberg: a,
                flora: a,
                fla: a,
                "xn--fl-zia": a,
                flå: a,
                folldal: a,
                forsand: a,
                fosnes: a,
                frei: a,
                frogn: a,
                froland: a,
                frosta: a,
                frana: a,
                "xn--frna-woa": a,
                fræna: a,
                froya: a,
                "xn--frya-hra": a,
                frøya: a,
                fusa: a,
                fyresdal: a,
                forde: a,
                "xn--frde-gra": a,
                førde: a,
                gamvik: a,
                gangaviika: a,
                "xn--ggaviika-8ya47h": a,
                gáŋgaviika: a,
                gaular: a,
                gausdal: a,
                gildeskal: a,
                "xn--gildeskl-g0a": a,
                gildeskål: a,
                giske: a,
                gjemnes: a,
                gjerdrum: a,
                gjerstad: a,
                gjesdal: a,
                gjovik: a,
                "xn--gjvik-wua": a,
                gjøvik: a,
                gloppen: a,
                gol: a,
                gran: a,
                grane: a,
                granvin: a,
                gratangen: a,
                grimstad: a,
                grong: a,
                kraanghke: a,
                "xn--kranghke-b0a": a,
                kråanghke: a,
                grue: a,
                gulen: a,
                hadsel: a,
                halden: a,
                halsa: a,
                hamar: a,
                hamaroy: a,
                habmer: a,
                "xn--hbmer-xqa": a,
                hábmer: a,
                hapmir: a,
                "xn--hpmir-xqa": a,
                hápmir: a,
                hammerfest: a,
                hammarfeasta: a,
                "xn--hmmrfeasta-s4ac": a,
                hámmárfeasta: a,
                haram: a,
                hareid: a,
                harstad: a,
                hasvik: a,
                aknoluokta: a,
                "xn--koluokta-7ya57h": a,
                ákŋoluokta: a,
                hattfjelldal: a,
                aarborte: a,
                haugesund: a,
                hemne: a,
                hemnes: a,
                hemsedal: a,
                "more-og-romsdal": [0, { heroy: a, sande: a }],
                "xn--mre-og-romsdal-qqb": [0, { "xn--hery-ira": a, sande: a }],
                "m\xf8re-og-romsdal": [0, { herøy: a, sande: a }],
                hitra: a,
                hjartdal: a,
                hjelmeland: a,
                hobol: a,
                "xn--hobl-ira": a,
                hobøl: a,
                hof: a,
                hol: a,
                hole: a,
                holmestrand: a,
                holtalen: a,
                "xn--holtlen-hxa": a,
                holtålen: a,
                hornindal: a,
                horten: a,
                hurdal: a,
                hurum: a,
                hvaler: a,
                hyllestad: a,
                hagebostad: a,
                "xn--hgebostad-g3a": a,
                hægebostad: a,
                hoyanger: a,
                "xn--hyanger-q1a": a,
                høyanger: a,
                hoylandet: a,
                "xn--hylandet-54a": a,
                høylandet: a,
                ha: a,
                "xn--h-2fa": a,
                hå: a,
                ibestad: a,
                inderoy: a,
                "xn--indery-fya": a,
                inderøy: a,
                iveland: a,
                jevnaker: a,
                jondal: a,
                jolster: a,
                "xn--jlster-bya": a,
                jølster: a,
                karasjok: a,
                karasjohka: a,
                "xn--krjohka-hwab49j": a,
                kárášjohka: a,
                karlsoy: a,
                galsa: a,
                "xn--gls-elac": a,
                gálsá: a,
                karmoy: a,
                "xn--karmy-yua": a,
                karmøy: a,
                kautokeino: a,
                guovdageaidnu: a,
                klepp: a,
                klabu: a,
                "xn--klbu-woa": a,
                klæbu: a,
                kongsberg: a,
                kongsvinger: a,
                kragero: a,
                "xn--krager-gya": a,
                kragerø: a,
                kristiansand: a,
                kristiansund: a,
                krodsherad: a,
                "xn--krdsherad-m8a": a,
                krødsherad: a,
                kvalsund: a,
                rahkkeravju: a,
                "xn--rhkkervju-01af": a,
                ráhkkerávju: a,
                kvam: a,
                kvinesdal: a,
                kvinnherad: a,
                kviteseid: a,
                kvitsoy: a,
                "xn--kvitsy-fya": a,
                kvitsøy: a,
                kvafjord: a,
                "xn--kvfjord-nxa": a,
                kvæfjord: a,
                giehtavuoatna: a,
                kvanangen: a,
                "xn--kvnangen-k0a": a,
                kvænangen: a,
                navuotna: a,
                "xn--nvuotna-hwa": a,
                návuotna: a,
                kafjord: a,
                "xn--kfjord-iua": a,
                kåfjord: a,
                gaivuotna: a,
                "xn--givuotna-8ya": a,
                gáivuotna: a,
                larvik: a,
                lavangen: a,
                lavagis: a,
                loabat: a,
                "xn--loabt-0qa": a,
                loabát: a,
                lebesby: a,
                davvesiida: a,
                leikanger: a,
                leirfjord: a,
                leka: a,
                leksvik: a,
                lenvik: a,
                leangaviika: a,
                "xn--leagaviika-52b": a,
                leaŋgaviika: a,
                lesja: a,
                levanger: a,
                lier: a,
                lierne: a,
                lillehammer: a,
                lillesand: a,
                lindesnes: a,
                lindas: a,
                "xn--linds-pra": a,
                lindås: a,
                lom: a,
                loppa: a,
                lahppi: a,
                "xn--lhppi-xqa": a,
                láhppi: a,
                lund: a,
                lunner: a,
                luroy: a,
                "xn--lury-ira": a,
                lurøy: a,
                luster: a,
                lyngdal: a,
                lyngen: a,
                ivgu: a,
                lardal: a,
                lerdal: a,
                "xn--lrdal-sra": a,
                lærdal: a,
                lodingen: a,
                "xn--ldingen-q1a": a,
                lødingen: a,
                lorenskog: a,
                "xn--lrenskog-54a": a,
                lørenskog: a,
                loten: a,
                "xn--lten-gra": a,
                løten: a,
                malvik: a,
                masoy: a,
                "xn--msy-ula0h": a,
                måsøy: a,
                muosat: a,
                "xn--muost-0qa": a,
                muosát: a,
                mandal: a,
                marker: a,
                marnardal: a,
                masfjorden: a,
                meland: a,
                meldal: a,
                melhus: a,
                meloy: a,
                "xn--mely-ira": a,
                meløy: a,
                meraker: a,
                "xn--merker-kua": a,
                meråker: a,
                moareke: a,
                "xn--moreke-jua": a,
                moåreke: a,
                midsund: a,
                "midtre-gauldal": a,
                modalen: a,
                modum: a,
                molde: a,
                moskenes: a,
                moss: a,
                mosvik: a,
                malselv: a,
                "xn--mlselv-iua": a,
                målselv: a,
                malatvuopmi: a,
                "xn--mlatvuopmi-s4a": a,
                málatvuopmi: a,
                namdalseid: a,
                aejrie: a,
                namsos: a,
                namsskogan: a,
                naamesjevuemie: a,
                "xn--nmesjevuemie-tcba": a,
                nååmesjevuemie: a,
                laakesvuemie: a,
                nannestad: a,
                narvik: a,
                narviika: a,
                naustdal: a,
                "nedre-eiker": a,
                akershus: O,
                buskerud: O,
                nesna: a,
                nesodden: a,
                nesseby: a,
                unjarga: a,
                "xn--unjrga-rta": a,
                unjárga: a,
                nesset: a,
                nissedal: a,
                nittedal: a,
                "nord-aurdal": a,
                "nord-fron": a,
                "nord-odal": a,
                norddal: a,
                nordkapp: a,
                davvenjarga: a,
                "xn--davvenjrga-y4a": a,
                davvenjárga: a,
                "nordre-land": a,
                nordreisa: a,
                raisa: a,
                "xn--risa-5na": a,
                ráisa: a,
                "nore-og-uvdal": a,
                notodden: a,
                naroy: a,
                "xn--nry-yla5g": a,
                nærøy: a,
                notteroy: a,
                "xn--nttery-byae": a,
                nøtterøy: a,
                odda: a,
                oksnes: a,
                "xn--ksnes-uua": a,
                øksnes: a,
                oppdal: a,
                oppegard: a,
                "xn--oppegrd-ixa": a,
                oppegård: a,
                orkdal: a,
                orland: a,
                "xn--rland-uua": a,
                ørland: a,
                orskog: a,
                "xn--rskog-uua": a,
                ørskog: a,
                orsta: a,
                "xn--rsta-fra": a,
                ørsta: a,
                hedmark: [0, { os: a, valer: a, "xn--vler-qoa": a, våler: a }],
                hordaland: [0, { os: a }],
                osen: a,
                osteroy: a,
                "xn--ostery-fya": a,
                osterøy: a,
                "ostre-toten": a,
                "xn--stre-toten-zcb": a,
                "\xf8stre-toten": a,
                overhalla: a,
                "ovre-eiker": a,
                "xn--vre-eiker-k8a": a,
                "\xf8vre-eiker": a,
                oyer: a,
                "xn--yer-zna": a,
                øyer: a,
                oygarden: a,
                "xn--ygarden-p1a": a,
                øygarden: a,
                "oystre-slidre": a,
                "xn--ystre-slidre-ujb": a,
                "\xf8ystre-slidre": a,
                porsanger: a,
                porsangu: a,
                "xn--porsgu-sta26f": a,
                porsáŋgu: a,
                porsgrunn: a,
                radoy: a,
                "xn--rady-ira": a,
                radøy: a,
                rakkestad: a,
                rana: a,
                ruovat: a,
                randaberg: a,
                rauma: a,
                rendalen: a,
                rennebu: a,
                rennesoy: a,
                "xn--rennesy-v1a": a,
                rennesøy: a,
                rindal: a,
                ringebu: a,
                ringerike: a,
                ringsaker: a,
                rissa: a,
                risor: a,
                "xn--risr-ira": a,
                risør: a,
                roan: a,
                rollag: a,
                rygge: a,
                ralingen: a,
                "xn--rlingen-mxa": a,
                rælingen: a,
                rodoy: a,
                "xn--rdy-0nab": a,
                rødøy: a,
                romskog: a,
                "xn--rmskog-bya": a,
                rømskog: a,
                roros: a,
                "xn--rros-gra": a,
                røros: a,
                rost: a,
                "xn--rst-0na": a,
                røst: a,
                royken: a,
                "xn--ryken-vua": a,
                røyken: a,
                royrvik: a,
                "xn--ryrvik-bya": a,
                røyrvik: a,
                rade: a,
                "xn--rde-ula": a,
                råde: a,
                salangen: a,
                siellak: a,
                saltdal: a,
                salat: a,
                "xn--slt-elab": a,
                sálát: a,
                "xn--slat-5na": a,
                sálat: a,
                samnanger: a,
                vestfold: [0, { sande: a }],
                sandefjord: a,
                sandnes: a,
                sandoy: a,
                "xn--sandy-yua": a,
                sandøy: a,
                sarpsborg: a,
                sauda: a,
                sauherad: a,
                sel: a,
                selbu: a,
                selje: a,
                seljord: a,
                sigdal: a,
                siljan: a,
                sirdal: a,
                skaun: a,
                skedsmo: a,
                ski: a,
                skien: a,
                skiptvet: a,
                skjervoy: a,
                "xn--skjervy-v1a": a,
                skjervøy: a,
                skierva: a,
                "xn--skierv-uta": a,
                skiervá: a,
                skjak: a,
                "xn--skjk-soa": a,
                skjåk: a,
                skodje: a,
                skanland: a,
                "xn--sknland-fxa": a,
                skånland: a,
                skanit: a,
                "xn--sknit-yqa": a,
                skánit: a,
                smola: a,
                "xn--smla-hra": a,
                smøla: a,
                snillfjord: a,
                snasa: a,
                "xn--snsa-roa": a,
                snåsa: a,
                snoasa: a,
                snaase: a,
                "xn--snase-nra": a,
                snåase: a,
                sogndal: a,
                sokndal: a,
                sola: a,
                solund: a,
                songdalen: a,
                sortland: a,
                spydeberg: a,
                stange: a,
                stavanger: a,
                steigen: a,
                steinkjer: a,
                stjordal: a,
                "xn--stjrdal-s1a": a,
                stjørdal: a,
                stokke: a,
                "stor-elvdal": a,
                stord: a,
                stordal: a,
                storfjord: a,
                omasvuotna: a,
                strand: a,
                stranda: a,
                stryn: a,
                sula: a,
                suldal: a,
                sund: a,
                sunndal: a,
                surnadal: a,
                sveio: a,
                svelvik: a,
                sykkylven: a,
                sogne: a,
                "xn--sgne-gra": a,
                søgne: a,
                somna: a,
                "xn--smna-gra": a,
                sømna: a,
                "sondre-land": a,
                "xn--sndre-land-0cb": a,
                "s\xf8ndre-land": a,
                "sor-aurdal": a,
                "xn--sr-aurdal-l8a": a,
                "s\xf8r-aurdal": a,
                "sor-fron": a,
                "xn--sr-fron-q1a": a,
                "s\xf8r-fron": a,
                "sor-odal": a,
                "xn--sr-odal-q1a": a,
                "s\xf8r-odal": a,
                "sor-varanger": a,
                "xn--sr-varanger-ggb": a,
                "s\xf8r-varanger": a,
                "matta-varjjat": a,
                "xn--mtta-vrjjat-k7af": a,
                "m\xe1tta-v\xe1rjjat": a,
                sorfold: a,
                "xn--srfold-bya": a,
                sørfold: a,
                sorreisa: a,
                "xn--srreisa-q1a": a,
                sørreisa: a,
                sorum: a,
                "xn--srum-gra": a,
                sørum: a,
                tana: a,
                deatnu: a,
                time: a,
                tingvoll: a,
                tinn: a,
                tjeldsund: a,
                dielddanuorri: a,
                tjome: a,
                "xn--tjme-hra": a,
                tjøme: a,
                tokke: a,
                tolga: a,
                torsken: a,
                tranoy: a,
                "xn--trany-yua": a,
                tranøy: a,
                tromso: a,
                "xn--troms-zua": a,
                tromsø: a,
                tromsa: a,
                romsa: a,
                trondheim: a,
                troandin: a,
                trysil: a,
                trana: a,
                "xn--trna-woa": a,
                træna: a,
                trogstad: a,
                "xn--trgstad-r1a": a,
                trøgstad: a,
                tvedestrand: a,
                tydal: a,
                tynset: a,
                tysfjord: a,
                divtasvuodna: a,
                divttasvuotna: a,
                tysnes: a,
                tysvar: a,
                "xn--tysvr-vra": a,
                tysvær: a,
                tonsberg: a,
                "xn--tnsberg-q1a": a,
                tønsberg: a,
                ullensaker: a,
                ullensvang: a,
                ulvik: a,
                utsira: a,
                vadso: a,
                "xn--vads-jra": a,
                vadsø: a,
                cahcesuolo: a,
                "xn--hcesuolo-7ya35b": a,
                čáhcesuolo: a,
                vaksdal: a,
                valle: a,
                vang: a,
                vanylven: a,
                vardo: a,
                "xn--vard-jra": a,
                vardø: a,
                varggat: a,
                "xn--vrggt-xqad": a,
                várggát: a,
                vefsn: a,
                vaapste: a,
                vega: a,
                vegarshei: a,
                "xn--vegrshei-c0a": a,
                vegårshei: a,
                vennesla: a,
                verdal: a,
                verran: a,
                vestby: a,
                vestnes: a,
                "vestre-slidre": a,
                "vestre-toten": a,
                vestvagoy: a,
                "xn--vestvgy-ixa6o": a,
                vestvågøy: a,
                vevelstad: a,
                vik: a,
                vikna: a,
                vindafjord: a,
                volda: a,
                voss: a,
                varoy: a,
                "xn--vry-yla5g": a,
                værøy: a,
                vagan: a,
                "xn--vgan-qoa": a,
                vågan: a,
                voagat: a,
                vagsoy: a,
                "xn--vgsy-qoa0j": a,
                vågsøy: a,
                vaga: a,
                "xn--vg-yiab": a,
                vågå: a,
                ostfold: [0, { valer: a }],
                "xn--stfold-9xa": [0, { "xn--vler-qoa": a }],
                østfold: [0, { våler: a }],
                co: e,
                blogspot: e,
                "123hjemmeside": e,
                myspreadshop: e,
              },
            ],
            np: s,
            nr: R,
            nu: [1, { merseine: e, mine: e, shacknet: e, enterprisecloud: e }],
            nz: [
              1,
              {
                ac: a,
                co: o,
                cri: a,
                geek: a,
                gen: a,
                govt: a,
                health: a,
                iwi: a,
                kiwi: a,
                maori: a,
                mil: a,
                "xn--mori-qsa": a,
                māori: a,
                net: a,
                org: a,
                parliament: a,
                school: a,
              },
            ],
            om: [1, { co: a, com: a, edu: a, gov: a, med: a, museum: a, net: a, org: a, pro: a }],
            onion: a,
            org: [
              1,
              {
                altervista: e,
                amune: [0, { tele: e }],
                pimienta: e,
                poivron: e,
                potager: e,
                sweetpepper: e,
                ae: e,
                us: e,
                certmgr: e,
                cdn77: [0, { c: e, rsc: e }],
                "cdn77-secure": [0, { origin: [0, { ssl: e }] }],
                cloudns: e,
                duckdns: e,
                tunk: e,
                dyndns: [2, { go: e, home: e }],
                blogdns: e,
                blogsite: e,
                boldlygoingnowhere: e,
                dnsalias: e,
                dnsdojo: e,
                doesntexist: e,
                dontexist: e,
                doomdns: e,
                dvrdns: e,
                dynalias: e,
                endofinternet: e,
                endoftheinternet: e,
                "from-me": e,
                "game-host": e,
                gotdns: e,
                "hobby-site": e,
                homedns: e,
                homeftp: e,
                homelinux: e,
                homeunix: e,
                "is-a-bruinsfan": e,
                "is-a-candidate": e,
                "is-a-celticsfan": e,
                "is-a-chef": e,
                "is-a-geek": e,
                "is-a-knight": e,
                "is-a-linux-user": e,
                "is-a-patsfan": e,
                "is-a-soxfan": e,
                "is-found": e,
                "is-lost": e,
                "is-saved": e,
                "is-very-bad": e,
                "is-very-evil": e,
                "is-very-good": e,
                "is-very-nice": e,
                "is-very-sweet": e,
                "isa-geek": e,
                "kicks-ass": e,
                misconfused: e,
                podzone: e,
                readmyblog: e,
                selfip: e,
                sellsyourhome: e,
                servebbs: e,
                serveftp: e,
                servegame: e,
                "stuff-4-sale": e,
                webhop: e,
                ddnss: e,
                accesscam: e,
                camdvr: e,
                freeddns: e,
                mywire: e,
                webredirect: e,
                eu: [
                  2,
                  {
                    al: e,
                    asso: e,
                    at: e,
                    au: e,
                    be: e,
                    bg: e,
                    ca: e,
                    cd: e,
                    ch: e,
                    cn: e,
                    cy: e,
                    cz: e,
                    de: e,
                    dk: e,
                    edu: e,
                    ee: e,
                    es: e,
                    fi: e,
                    fr: e,
                    gr: e,
                    hr: e,
                    hu: e,
                    ie: e,
                    il: e,
                    in: e,
                    int: e,
                    is: e,
                    it: e,
                    jp: e,
                    kr: e,
                    lt: e,
                    lu: e,
                    lv: e,
                    mc: e,
                    me: e,
                    mk: e,
                    mt: e,
                    my: e,
                    net: e,
                    ng: e,
                    nl: e,
                    no: e,
                    nz: e,
                    paris: e,
                    pl: e,
                    pt: e,
                    "q-a": e,
                    ro: e,
                    ru: e,
                    se: e,
                    si: e,
                    sk: e,
                    tr: e,
                    uk: e,
                    us: e,
                  },
                ],
                twmail: e,
                fedorainfracloud: e,
                fedorapeople: e,
                fedoraproject: [0, { cloud: e, os: w, stg: [0, { os: w }] }],
                freedesktop: e,
                hepforge: e,
                "in-dsl": e,
                "in-vpn": e,
                js: e,
                barsy: e,
                mayfirst: e,
                "mozilla-iot": e,
                bmoattachments: e,
                dynserv: e,
                "now-dns": e,
                "cable-modem": e,
                collegefan: e,
                couchpotatofries: e,
                mlbfan: e,
                mysecuritycamera: e,
                nflfan: e,
                "read-books": e,
                ufcfan: e,
                hopto: e,
                myftp: e,
                "no-ip": e,
                zapto: e,
                httpbin: e,
                pubtls: e,
                jpn: e,
                "my-firewall": e,
                myfirewall: e,
                spdns: e,
                "small-web": e,
                dsmynas: e,
                familyds: e,
                teckids: u,
                tuxfamily: e,
                diskstation: e,
                hk: e,
                wmflabs: e,
                toolforge: e,
                wmcloud: e,
                za: e,
              },
            ],
            pa: [1, { ac: a, gob: a, com: a, org: a, sld: a, edu: a, net: a, ing: a, abo: a, med: a, nom: a }],
            pe: [1, { edu: a, gob: a, nom: a, mil: a, org: a, com: a, net: a, blogspot: e }],
            pf: [1, { com: a, org: a, edu: a }],
            pg: s,
            ph: [1, { com: a, net: a, org: a, gov: a, edu: a, ngo: a, mil: a, i: a }],
            pk: [
              1,
              {
                com: a,
                net: a,
                edu: a,
                org: a,
                fam: a,
                biz: a,
                web: a,
                gov: a,
                gob: a,
                gok: a,
                gon: a,
                gop: a,
                gos: a,
                info: a,
              },
            ],
            pl: [
              1,
              {
                com: a,
                net: a,
                org: a,
                aid: a,
                agro: a,
                atm: a,
                auto: a,
                biz: a,
                edu: a,
                gmina: a,
                gsm: a,
                info: a,
                mail: a,
                miasta: a,
                media: a,
                mil: a,
                nieruchomosci: a,
                nom: a,
                pc: a,
                powiat: a,
                priv: a,
                realestate: a,
                rel: a,
                sex: a,
                shop: a,
                sklep: a,
                sos: a,
                szkola: a,
                targi: a,
                tm: a,
                tourism: a,
                travel: a,
                turystyka: a,
                gov: [
                  1,
                  {
                    ap: a,
                    griw: a,
                    ic: a,
                    is: a,
                    kmpsp: a,
                    konsulat: a,
                    kppsp: a,
                    kwp: a,
                    kwpsp: a,
                    mup: a,
                    mw: a,
                    oia: a,
                    oirm: a,
                    oke: a,
                    oow: a,
                    oschr: a,
                    oum: a,
                    pa: a,
                    pinb: a,
                    piw: a,
                    po: a,
                    pr: a,
                    psp: a,
                    psse: a,
                    pup: a,
                    rzgw: a,
                    sa: a,
                    sdn: a,
                    sko: a,
                    so: a,
                    sr: a,
                    starostwo: a,
                    ug: a,
                    ugim: a,
                    um: a,
                    umig: a,
                    upow: a,
                    uppo: a,
                    us: a,
                    uw: a,
                    uzs: a,
                    wif: a,
                    wiih: a,
                    winb: a,
                    wios: a,
                    witd: a,
                    wiw: a,
                    wkz: a,
                    wsa: a,
                    wskr: a,
                    wsse: a,
                    wuoz: a,
                    wzmiuw: a,
                    zp: a,
                    zpisdn: a,
                  },
                ],
                augustow: a,
                "babia-gora": a,
                bedzin: a,
                beskidy: a,
                bialowieza: a,
                bialystok: a,
                bielawa: a,
                bieszczady: a,
                boleslawiec: a,
                bydgoszcz: a,
                bytom: a,
                cieszyn: a,
                czeladz: a,
                czest: a,
                dlugoleka: a,
                elblag: a,
                elk: a,
                glogow: a,
                gniezno: a,
                gorlice: a,
                grajewo: a,
                ilawa: a,
                jaworzno: a,
                "jelenia-gora": a,
                jgora: a,
                kalisz: a,
                "kazimierz-dolny": a,
                karpacz: a,
                kartuzy: a,
                kaszuby: a,
                katowice: a,
                kepno: a,
                ketrzyn: a,
                klodzko: a,
                kobierzyce: a,
                kolobrzeg: a,
                konin: a,
                konskowola: a,
                kutno: a,
                lapy: a,
                lebork: a,
                legnica: a,
                lezajsk: a,
                limanowa: a,
                lomza: a,
                lowicz: a,
                lubin: a,
                lukow: a,
                malbork: a,
                malopolska: a,
                mazowsze: a,
                mazury: a,
                mielec: a,
                mielno: a,
                mragowo: a,
                naklo: a,
                nowaruda: a,
                nysa: a,
                olawa: a,
                olecko: a,
                olkusz: a,
                olsztyn: a,
                opoczno: a,
                opole: a,
                ostroda: a,
                ostroleka: a,
                ostrowiec: a,
                ostrowwlkp: a,
                pila: a,
                pisz: a,
                podhale: a,
                podlasie: a,
                polkowice: a,
                pomorze: a,
                pomorskie: a,
                prochowice: a,
                pruszkow: a,
                przeworsk: a,
                pulawy: a,
                radom: a,
                "rawa-maz": a,
                rybnik: a,
                rzeszow: a,
                sanok: a,
                sejny: a,
                slask: a,
                slupsk: a,
                sosnowiec: a,
                "stalowa-wola": a,
                skoczow: a,
                starachowice: a,
                stargard: a,
                suwalki: a,
                swidnica: a,
                swiebodzin: a,
                swinoujscie: a,
                szczecin: a,
                szczytno: a,
                tarnobrzeg: a,
                tgory: a,
                turek: a,
                tychy: a,
                ustka: a,
                walbrzych: a,
                warmia: a,
                warszawa: a,
                waw: a,
                wegrow: a,
                wielun: a,
                wlocl: a,
                wloclawek: a,
                wodzislaw: a,
                wolomin: a,
                wroclaw: a,
                zachpomor: a,
                zagan: a,
                zarow: a,
                zgora: a,
                zgorzelec: a,
                beep: e,
                "ecommerce-shop": e,
                shoparena: e,
                homesklep: e,
                sdscloud: e,
                unicloud: e,
                krasnik: e,
                leczna: e,
                lubartow: e,
                lublin: e,
                poniatowa: e,
                swidnik: e,
                co: e,
                simplesite: e,
                art: e,
                gliwice: e,
                krakow: e,
                poznan: e,
                wroc: e,
                zakopane: e,
                myspreadshop: e,
                gda: e,
                gdansk: e,
                gdynia: e,
                med: e,
                sopot: e,
              },
            ],
            pm: [1, { own: e, name: e }],
            pn: [1, { gov: a, co: a, org: a, edu: a, net: a }],
            post: a,
            pr: [
              1,
              {
                com: a,
                net: a,
                org: a,
                gov: a,
                edu: a,
                isla: a,
                pro: a,
                biz: a,
                info: a,
                name: a,
                est: a,
                prof: a,
                ac: a,
              },
            ],
            pro: [
              1,
              {
                aaa: a,
                aca: a,
                acct: a,
                avocat: a,
                bar: a,
                cpa: a,
                eng: a,
                jur: a,
                law: a,
                med: a,
                recht: a,
                cloudns: e,
                dnstrace: [0, { bci: e }],
                barsy: e,
              },
            ],
            ps: [1, { edu: a, gov: a, sec: a, plo: a, com: a, org: a, net: a }],
            pt: [
              1,
              { net: a, gov: a, org: a, edu: a, int: a, publ: a, com: a, nome: a, blogspot: e, "123paginaweb": e },
            ],
            pw: [1, { co: a, ne: a, or: a, ed: a, go: a, belau: a, cloudns: e, x443: e }],
            py: [1, { com: a, coop: a, edu: a, gov: a, mil: a, net: a, org: a }],
            qa: [1, { com: a, edu: a, gov: a, mil: a, name: a, net: a, org: a, sch: a, blogspot: e }],
            re: [1, { asso: a, com: a, nom: a, blogspot: e }],
            ro: [
              1,
              {
                arts: a,
                com: a,
                firm: a,
                info: a,
                nom: a,
                nt: a,
                org: a,
                rec: a,
                store: a,
                tm: a,
                www: a,
                co: e,
                shop: e,
                blogspot: e,
                barsy: e,
              },
            ],
            rs: [
              1,
              { ac: a, co: a, edu: a, gov: a, in: a, org: a, brendly: [0, { shop: e }], blogspot: e, ua: e, ox: e },
            ],
            ru: [
              1,
              {
                ac: e,
                edu: e,
                gov: e,
                int: e,
                mil: e,
                test: e,
                eurodir: e,
                adygeya: e,
                bashkiria: e,
                bir: e,
                cbg: e,
                com: e,
                dagestan: e,
                grozny: e,
                kalmykia: e,
                kustanai: e,
                marine: e,
                mordovia: e,
                msk: e,
                mytis: e,
                nalchik: e,
                nov: e,
                pyatigorsk: e,
                spb: e,
                vladikavkaz: e,
                vladimir: e,
                blogspot: e,
                na4u: e,
                mircloud: e,
                regruhosting: $,
                myjino: [2, { hosting: n, landing: n, spectrum: n, vps: n }],
                cldmail: [0, { hb: e }],
                mcdir: [2, { vps: e }],
                mcpre: e,
                net: e,
                org: e,
                pp: e,
                "123sait": e,
                lk3: e,
                ras: e,
              },
            ],
            rw: [1, { ac: a, co: a, coop: a, gov: a, mil: a, net: a, org: a }],
            sa: [1, { com: a, net: a, org: a, gov: a, med: a, pub: a, edu: a, sch: a }],
            sb: t,
            sc: t,
            sd: [1, { com: a, net: a, org: a, edu: a, med: a, tv: a, gov: a, info: a }],
            se: [
              1,
              {
                a,
                ac: a,
                b: a,
                bd: a,
                brand: a,
                c: a,
                d: a,
                e: a,
                f: a,
                fh: a,
                fhsk: a,
                fhv: a,
                g: a,
                h: a,
                i: a,
                k: a,
                komforb: a,
                kommunalforbund: a,
                komvux: a,
                l: a,
                lanbib: a,
                m: a,
                n: a,
                naturbruksgymn: a,
                o: a,
                org: a,
                p: a,
                parti: a,
                pp: a,
                press: a,
                r: a,
                s: a,
                t: a,
                tm: a,
                u: a,
                w: a,
                x: a,
                y: a,
                z: a,
                com: e,
                blogspot: e,
                conf: e,
                iopsys: e,
                "123minsida": e,
                itcouldbewor: e,
                myspreadshop: e,
                paba: [0, { su: e }],
              },
            ],
            sg: [1, { com: a, net: a, org: a, gov: a, edu: a, per: a, blogspot: e, enscaled: e }],
            sh: [
              1,
              {
                com: a,
                net: a,
                gov: a,
                org: a,
                mil: a,
                bip: e,
                hashbang: e,
                platform: [0, { bc: e, ent: e, eu: e, us: e }],
                now: e,
                vxl: e,
                wedeploy: e,
              },
            ],
            si: [1, { gitapp: e, gitpage: e, blogspot: e }],
            sj: a,
            sk: o,
            sl: t,
            sm: a,
            sn: [1, { art: a, com: a, edu: a, gouv: a, org: a, perso: a, univ: a, blogspot: e }],
            so: [1, { com: a, edu: a, gov: a, me: a, net: a, org: a, sch: e }],
            sr: a,
            ss: [1, { biz: a, com: a, edu: a, gov: a, me: a, net: a, org: a, sch: a }],
            st: [
              1,
              {
                co: a,
                com: a,
                consulado: a,
                edu: a,
                embaixada: a,
                mil: a,
                net: a,
                org: a,
                principe: a,
                saotome: a,
                store: a,
                kirara: e,
                noho: e,
              },
            ],
            su: [
              1,
              {
                abkhazia: e,
                adygeya: e,
                aktyubinsk: e,
                arkhangelsk: e,
                armenia: e,
                ashgabad: e,
                azerbaijan: e,
                balashov: e,
                bashkiria: e,
                bryansk: e,
                bukhara: e,
                chimkent: e,
                dagestan: e,
                "east-kazakhstan": e,
                exnet: e,
                georgia: e,
                grozny: e,
                ivanovo: e,
                jambyl: e,
                kalmykia: e,
                kaluga: e,
                karacol: e,
                karaganda: e,
                karelia: e,
                khakassia: e,
                krasnodar: e,
                kurgan: e,
                kustanai: e,
                lenug: e,
                mangyshlak: e,
                mordovia: e,
                msk: e,
                murmansk: e,
                nalchik: e,
                navoi: e,
                "north-kazakhstan": e,
                nov: e,
                obninsk: e,
                penza: e,
                pokrovsk: e,
                sochi: e,
                spb: e,
                tashkent: e,
                termez: e,
                togliatti: e,
                troitsk: e,
                tselinograd: e,
                tula: e,
                tuva: e,
                vladikavkaz: e,
                vladimir: e,
                vologda: e,
              },
            ],
            sv: [1, { com: a, edu: a, gob: a, org: a, red: a }],
            sx: i,
            sy: D,
            sz: [1, { co: a, ac: a, org: a }],
            tc: [1, { ch: e, me: e, we: e }],
            td: o,
            tel: a,
            tf: [1, { sch: e }],
            tg: a,
            th: [1, { ac: a, co: a, go: a, in: a, mi: a, net: a, or: a, online: e, shop: e }],
            tj: [
              1,
              {
                ac: a,
                biz: a,
                co: a,
                com: a,
                edu: a,
                go: a,
                gov: a,
                int: a,
                mil: a,
                name: a,
                net: a,
                nic: a,
                org: a,
                test: a,
                web: a,
              },
            ],
            tk: a,
            tl: i,
            tm: [1, { com: a, co: a, org: a, net: a, nom: a, gov: a, mil: a, edu: a }],
            tn: [
              1,
              {
                com: a,
                ens: a,
                fin: a,
                gov: a,
                ind: a,
                info: a,
                intl: a,
                mincom: a,
                nat: a,
                net: a,
                org: a,
                perso: a,
                tourism: a,
                orangecloud: e,
              },
            ],
            to: [
              1,
              {
                611: e,
                com: a,
                gov: a,
                net: a,
                org: a,
                edu: a,
                mil: a,
                oya: e,
                rdv: e,
                x0: e,
                vpnplus: e,
                quickconnect: d,
                nyan: e,
              },
            ],
            tr: [
              1,
              {
                av: a,
                bbs: a,
                bel: a,
                biz: a,
                com: o,
                dr: a,
                edu: a,
                gen: a,
                gov: a,
                info: a,
                mil: a,
                k12: a,
                kep: a,
                name: a,
                net: a,
                org: a,
                pol: a,
                tel: a,
                tsk: a,
                tv: a,
                web: a,
                nc: i,
              },
            ],
            tt: [
              1,
              {
                co: a,
                com: a,
                org: a,
                net: a,
                biz: a,
                info: a,
                pro: a,
                int: a,
                coop: a,
                jobs: a,
                mobi: a,
                travel: a,
                museum: a,
                aero: a,
                name: a,
                gov: a,
                edu: a,
              },
            ],
            tv: [1, { dyndns: e, "better-than": e, "on-the-web": e, "worse-than": e, from: e, sakura: e }],
            tw: [
              1,
              {
                edu: a,
                gov: a,
                mil: a,
                com: [1, { mymailer: e }],
                net: a,
                org: a,
                idv: a,
                game: a,
                ebiz: a,
                club: a,
                "xn--zf0ao64a": a,
                網路: a,
                "xn--uc0atv": a,
                組織: a,
                "xn--czrw28b": a,
                商業: a,
                url: e,
                blogspot: e,
              },
            ],
            tz: [1, { ac: a, co: a, go: a, hotel: a, info: a, me: a, mil: a, mobi: a, ne: a, or: a, sc: a, tv: a }],
            ua: [
              1,
              {
                com: a,
                edu: a,
                gov: a,
                in: a,
                net: a,
                org: a,
                cherkassy: a,
                cherkasy: a,
                chernigov: a,
                chernihiv: a,
                chernivtsi: a,
                chernovtsy: a,
                ck: a,
                cn: a,
                cr: a,
                crimea: a,
                cv: a,
                dn: a,
                dnepropetrovsk: a,
                dnipropetrovsk: a,
                donetsk: a,
                dp: a,
                if: a,
                "ivano-frankivsk": a,
                kh: a,
                kharkiv: a,
                kharkov: a,
                kherson: a,
                khmelnitskiy: a,
                khmelnytskyi: a,
                kiev: a,
                kirovograd: a,
                km: a,
                kr: a,
                kropyvnytskyi: a,
                krym: a,
                ks: a,
                kv: a,
                kyiv: a,
                lg: a,
                lt: a,
                lugansk: a,
                lutsk: a,
                lv: a,
                lviv: a,
                mk: a,
                mykolaiv: a,
                nikolaev: a,
                od: a,
                odesa: a,
                odessa: a,
                pl: a,
                poltava: a,
                rivne: a,
                rovno: a,
                rv: a,
                sb: a,
                sebastopol: a,
                sevastopol: a,
                sm: a,
                sumy: a,
                te: a,
                ternopil: a,
                uz: a,
                uzhgorod: a,
                vinnica: a,
                vinnytsia: a,
                vn: a,
                volyn: a,
                yalta: a,
                zaporizhzhe: a,
                zaporizhzhia: a,
                zhitomir: a,
                zhytomyr: a,
                zp: a,
                zt: a,
                cc: e,
                inf: e,
                ltd: e,
                cx: e,
                ie: e,
                biz: e,
                co: e,
                pp: e,
                v: e,
              },
            ],
            ug: [1, { co: a, or: a, ac: a, sc: a, go: a, ne: a, com: a, org: a, blogspot: e }],
            uk: [
              1,
              {
                ac: a,
                co: [
                  1,
                  {
                    bytemark: [0, { dh: e, vm: e }],
                    blogspot: e,
                    layershift: q,
                    barsy: e,
                    barsyonline: e,
                    retrosnub: U,
                    "nh-serv": e,
                    "no-ip": e,
                    wellbeingzone: e,
                    adimo: e,
                    myspreadshop: e,
                  },
                ],
                gov: [1, { campaign: e, service: e, api: e, homeoffice: e }],
                ltd: a,
                me: a,
                net: a,
                nhs: a,
                org: [1, { glug: e, lug: e, lugs: e, affinitylottery: e, raffleentry: e, weeklylottery: e }],
                plc: a,
                police: a,
                sch: s,
                conn: e,
                copro: e,
                hosp: e,
                "independent-commission": e,
                "independent-inquest": e,
                "independent-inquiry": e,
                "independent-panel": e,
                "independent-review": e,
                "public-inquiry": e,
                "royal-commission": e,
                pymnt: e,
                barsy: e,
              },
            ],
            us: [
              1,
              {
                dni: a,
                fed: a,
                isa: a,
                kids: a,
                nsn: a,
                ak: P,
                al: P,
                ar: P,
                as: P,
                az: P,
                ca: P,
                co: P,
                ct: P,
                dc: P,
                de: [1, { k12: a, cc: a, lib: e }],
                fl: P,
                ga: P,
                gu: P,
                hi: H,
                ia: P,
                id: P,
                il: P,
                in: P,
                ks: P,
                ky: P,
                la: P,
                ma: [1, { k12: [1, { pvt: a, chtr: a, paroch: a }], cc: a, lib: a }],
                md: P,
                me: P,
                mi: [
                  1,
                  {
                    k12: a,
                    cc: a,
                    lib: a,
                    "ann-arbor": a,
                    cog: a,
                    dst: a,
                    eaton: a,
                    gen: a,
                    mus: a,
                    tec: a,
                    washtenaw: a,
                  },
                ],
                mn: P,
                mo: P,
                ms: P,
                mt: P,
                nc: P,
                nd: H,
                ne: P,
                nh: P,
                nj: P,
                nm: P,
                nv: P,
                ny: P,
                oh: P,
                ok: P,
                or: P,
                pa: P,
                pr: P,
                ri: H,
                sc: P,
                sd: H,
                tn: P,
                tx: P,
                ut: P,
                vi: P,
                vt: P,
                va: P,
                wa: P,
                wi: P,
                wv: [1, { cc: a }],
                wy: P,
                graphox: e,
                cloudns: e,
                drud: e,
                "is-by": e,
                "land-4-sale": e,
                "stuff-4-sale": e,
                enscaled: [0, { phx: e }],
                mircloud: e,
                freeddns: e,
                golffan: e,
                noip: e,
                pointto: e,
                platterp: e,
              },
            ],
            uy: [1, { com: o, edu: a, gub: a, mil: a, net: a, org: a }],
            uz: [1, { co: a, com: a, net: a, org: a }],
            va: a,
            vc: [1, { com: a, net: a, org: a, gov: a, mil: a, edu: a, gv: [2, { d: e }], "0e": e }],
            ve: [
              1,
              {
                arts: a,
                bib: a,
                co: a,
                com: a,
                e12: a,
                edu: a,
                firm: a,
                gob: a,
                gov: a,
                info: a,
                int: a,
                mil: a,
                net: a,
                nom: a,
                org: a,
                rar: a,
                rec: a,
                store: a,
                tec: a,
                web: a,
              },
            ],
            vg: [1, { at: e }],
            vi: [1, { co: a, com: a, k12: a, net: a, org: a }],
            vn: [
              1,
              {
                ac: a,
                ai: a,
                biz: a,
                com: a,
                edu: a,
                gov: a,
                health: a,
                id: a,
                info: a,
                int: a,
                io: a,
                name: a,
                net: a,
                org: a,
                pro: a,
                angiang: a,
                bacgiang: a,
                backan: a,
                baclieu: a,
                bacninh: a,
                "baria-vungtau": a,
                bentre: a,
                binhdinh: a,
                binhduong: a,
                binhphuoc: a,
                binhthuan: a,
                camau: a,
                cantho: a,
                caobang: a,
                daklak: a,
                daknong: a,
                danang: a,
                dienbien: a,
                dongnai: a,
                dongthap: a,
                gialai: a,
                hagiang: a,
                haiduong: a,
                haiphong: a,
                hanam: a,
                hanoi: a,
                hatinh: a,
                haugiang: a,
                hoabinh: a,
                hungyen: a,
                khanhhoa: a,
                kiengiang: a,
                kontum: a,
                laichau: a,
                lamdong: a,
                langson: a,
                laocai: a,
                longan: a,
                namdinh: a,
                nghean: a,
                ninhbinh: a,
                ninhthuan: a,
                phutho: a,
                phuyen: a,
                quangbinh: a,
                quangnam: a,
                quangngai: a,
                quangninh: a,
                quangtri: a,
                soctrang: a,
                sonla: a,
                tayninh: a,
                thaibinh: a,
                thainguyen: a,
                thanhhoa: a,
                thanhphohochiminh: a,
                thuathienhue: a,
                tiengiang: a,
                travinh: a,
                tuyenquang: a,
                vinhlong: a,
                vinhphuc: a,
                yenbai: a,
                blogspot: e,
              },
            ],
            vu: [1, { com: a, edu: a, net: a, org: a, cn: e, blog: e, dev: e, me: e }],
            wf: [1, { biz: e, sch: e }],
            ws: [1, { com: a, net: a, org: a, gov: a, edu: a, advisor: n, cloud66: e, dyndns: e, mypets: e }],
            yt: [1, { org: e }],
            "xn--mgbaam7a8h": a,
            امارات: a,
            "xn--y9a3aq": a,
            հայ: a,
            "xn--54b7fta0cc": a,
            বাংলা: a,
            "xn--90ae": a,
            бг: a,
            "xn--mgbcpq6gpa1a": a,
            البحرين: a,
            "xn--90ais": a,
            бел: a,
            "xn--fiqs8s": a,
            中国: a,
            "xn--fiqz9s": a,
            中國: a,
            "xn--lgbbat1ad8j": a,
            الجزائر: a,
            "xn--wgbh1c": a,
            مصر: a,
            "xn--e1a4c": a,
            ею: a,
            "xn--qxa6a": a,
            ευ: a,
            "xn--mgbah1a3hjkrd": a,
            موريتانيا: a,
            "xn--node": a,
            გე: a,
            "xn--qxam": a,
            ελ: a,
            "xn--j6w193g": [
              1,
              { "xn--55qx5d": a, "xn--wcvs22d": a, "xn--mxtq1m": a, "xn--gmqw5a": a, "xn--od0alg": a, "xn--uc0atv": a },
            ],
            香港: [1, { 公司: a, 教育: a, 政府: a, 個人: a, 網絡: a, 組織: a }],
            "xn--2scrj9c": a,
            ಭಾರತ: a,
            "xn--3hcrj9c": a,
            ଭାରତ: a,
            "xn--45br5cyl": a,
            ভাৰত: a,
            "xn--h2breg3eve": a,
            भारतम्: a,
            "xn--h2brj9c8c": a,
            भारोत: a,
            "xn--mgbgu82a": a,
            ڀارت: a,
            "xn--rvc1e0am3e": a,
            ഭാരതം: a,
            "xn--h2brj9c": a,
            भारत: a,
            "xn--mgbbh1a": a,
            بارت: a,
            "xn--mgbbh1a71e": a,
            بھارت: a,
            "xn--fpcrj9c3d": a,
            భారత్: a,
            "xn--gecrj9c": a,
            ભારત: a,
            "xn--s9brj9c": a,
            ਭਾਰਤ: a,
            "xn--45brj9c": a,
            ভারত: a,
            "xn--xkc2dl3a5ee0h": a,
            இந்தியா: a,
            "xn--mgba3a4f16a": a,
            ایران: a,
            "xn--mgba3a4fra": a,
            ايران: a,
            "xn--mgbtx2b": a,
            عراق: a,
            "xn--mgbayh7gpa": a,
            الاردن: a,
            "xn--3e0b707e": a,
            한국: a,
            "xn--80ao21a": a,
            қаз: a,
            "xn--q7ce6a": a,
            ລາວ: a,
            "xn--fzc2c9e2c": a,
            ලංකා: a,
            "xn--xkc2al3hye2a": a,
            இலங்கை: a,
            "xn--mgbc0a9azcg": a,
            المغرب: a,
            "xn--d1alf": a,
            мкд: a,
            "xn--l1acc": a,
            мон: a,
            "xn--mix891f": a,
            澳門: a,
            "xn--mix082f": a,
            澳门: a,
            "xn--mgbx4cd0ab": a,
            مليسيا: a,
            "xn--mgb9awbf": a,
            عمان: a,
            "xn--mgbai9azgqp6j": a,
            پاکستان: a,
            "xn--mgbai9a5eva00b": a,
            پاكستان: a,
            "xn--ygbi2ammx": a,
            فلسطين: a,
            "xn--90a3ac": [
              1,
              { "xn--o1ac": a, "xn--c1avg": a, "xn--90azh": a, "xn--d1at": a, "xn--o1ach": a, "xn--80au": a },
            ],
            срб: [1, { пр: a, орг: a, обр: a, од: a, упр: a, ак: a }],
            "xn--p1ai": a,
            рф: a,
            "xn--wgbl6a": a,
            قطر: a,
            "xn--mgberp4a5d4ar": a,
            السعودية: a,
            "xn--mgberp4a5d4a87g": a,
            السعودیة: a,
            "xn--mgbqly7c0a67fbc": a,
            السعودیۃ: a,
            "xn--mgbqly7cvafr": a,
            السعوديه: a,
            "xn--mgbpl2fh": a,
            سودان: a,
            "xn--yfro4i67o": a,
            新加坡: a,
            "xn--clchc0ea0b2g2a9gcd": a,
            சிங்கப்பூர்: a,
            "xn--ogbpf8fl": a,
            سورية: a,
            "xn--mgbtf8fl": a,
            سوريا: a,
            "xn--o3cw4h": [
              1,
              {
                "xn--12c1fe0br": a,
                "xn--12co0c3b4eva": a,
                "xn--h3cuzk1di": a,
                "xn--o3cyx2a": a,
                "xn--m3ch0j3a": a,
                "xn--12cfi8ixb8l": a,
              },
            ],
            ไทย: [1, { ศึกษา: a, ธุรกิจ: a, รัฐบาล: a, ทหาร: a, เน็ต: a, องค์กร: a }],
            "xn--pgbs0dh": a,
            تونس: a,
            "xn--kpry57d": a,
            台灣: a,
            "xn--kprw13d": a,
            台湾: a,
            "xn--nnx388a": a,
            臺灣: a,
            "xn--j1amh": a,
            укр: a,
            "xn--mgb2ddes": a,
            اليمن: a,
            xxx: a,
            ye: D,
            za: [
              0,
              {
                ac: a,
                agric: a,
                alt: a,
                co: o,
                edu: a,
                gov: a,
                grondar: a,
                law: a,
                mil: a,
                net: a,
                ngo: a,
                nic: a,
                nis: a,
                nom: a,
                org: a,
                school: a,
                tm: a,
                web: a,
              },
            ],
            zm: [1, { ac: a, biz: a, co: a, com: a, edu: a, gov: a, info: a, mil: a, net: a, org: a, sch: a }],
            zw: [1, { ac: a, co: a, gov: a, mil: a, org: a }],
            aaa: a,
            aarp: a,
            abb: a,
            abbott: a,
            abbvie: a,
            abc: a,
            able: a,
            abogado: a,
            abudhabi: a,
            academy: [1, { official: e }],
            accenture: a,
            accountant: a,
            accountants: a,
            aco: a,
            actor: a,
            ads: a,
            adult: a,
            aeg: a,
            aetna: a,
            afl: a,
            africa: a,
            agakhan: a,
            agency: a,
            aig: a,
            airbus: a,
            airforce: a,
            airtel: a,
            akdn: a,
            alibaba: a,
            alipay: a,
            allfinanz: a,
            allstate: a,
            ally: a,
            alsace: a,
            alstom: a,
            amazon: a,
            americanexpress: a,
            americanfamily: a,
            amex: a,
            amfam: a,
            amica: a,
            amsterdam: a,
            analytics: a,
            android: a,
            anquan: a,
            anz: a,
            aol: a,
            apartments: a,
            app: [
              1,
              {
                beget: n,
                clerk: e,
                clerkstage: e,
                wnext: e,
                platform0: e,
                deta: e,
                ondigitalocean: e,
                easypanel: e,
                encr: e,
                edgecompute: e,
                fireweb: e,
                onflashdrive: e,
                framer: e,
                run: [2, { a: e }],
                web: e,
                hasura: e,
                loginline: e,
                messerli: e,
                netlify: e,
                ngrok: e,
                "ngrok-free": e,
                developer: n,
                noop: e,
                northflank: n,
                snowflake: [2, { privatelink: e }],
                streamlit: e,
                storipress: e,
                telebit: e,
                typedream: e,
                vercel: e,
                bookonline: e,
              },
            ],
            apple: a,
            aquarelle: a,
            arab: a,
            aramco: a,
            archi: a,
            army: a,
            art: a,
            arte: a,
            asda: a,
            associates: a,
            athleta: a,
            attorney: a,
            auction: a,
            audi: a,
            audible: a,
            audio: a,
            auspost: a,
            author: a,
            auto: a,
            autos: a,
            avianca: a,
            aws: a,
            axa: a,
            azure: a,
            baby: a,
            baidu: a,
            banamex: a,
            bananarepublic: a,
            band: a,
            bank: a,
            bar: a,
            barcelona: a,
            barclaycard: a,
            barclays: a,
            barefoot: a,
            bargains: a,
            baseball: a,
            basketball: [1, { aus: e, nz: e }],
            bauhaus: a,
            bayern: a,
            bbc: a,
            bbt: a,
            bbva: a,
            bcg: a,
            bcn: a,
            beats: a,
            beauty: a,
            beer: a,
            bentley: a,
            berlin: a,
            best: a,
            bestbuy: a,
            bet: a,
            bharti: a,
            bible: a,
            bid: a,
            bike: a,
            bing: a,
            bingo: a,
            bio: a,
            black: a,
            blackfriday: a,
            blockbuster: a,
            blog: a,
            bloomberg: a,
            blue: a,
            bms: a,
            bmw: a,
            bnpparibas: a,
            boats: a,
            boehringer: a,
            bofa: a,
            bom: a,
            bond: a,
            boo: a,
            book: a,
            booking: a,
            bosch: a,
            bostik: a,
            boston: a,
            bot: a,
            boutique: a,
            box: a,
            bradesco: a,
            bridgestone: a,
            broadway: a,
            broker: a,
            brother: a,
            brussels: a,
            build: a,
            builders: [1, { cloudsite: e }],
            business: l,
            buy: a,
            buzz: a,
            bzh: a,
            cab: a,
            cafe: a,
            cal: a,
            call: a,
            calvinklein: a,
            cam: a,
            camera: a,
            camp: a,
            canon: a,
            capetown: a,
            capital: a,
            capitalone: a,
            car: a,
            caravan: a,
            cards: a,
            care: a,
            career: a,
            careers: a,
            cars: a,
            casa: [1, { nabu: [0, { ui: e }] }],
            case: a,
            cash: a,
            casino: a,
            catering: a,
            catholic: a,
            cba: a,
            cbn: a,
            cbre: a,
            cbs: a,
            center: a,
            ceo: a,
            cern: a,
            cfa: a,
            cfd: a,
            chanel: a,
            channel: a,
            charity: a,
            chase: a,
            chat: a,
            cheap: a,
            chintai: a,
            christmas: a,
            chrome: a,
            church: a,
            cipriani: a,
            circle: a,
            cisco: a,
            citadel: a,
            citi: a,
            citic: a,
            city: a,
            cityeats: a,
            claims: a,
            cleaning: a,
            click: a,
            clinic: a,
            clinique: a,
            clothing: a,
            cloud: [
              1,
              {
                banzai: n,
                elementor: e,
                encoway: [0, { eu: e }],
                statics: n,
                ravendb: e,
                axarnet: [0, { "es-1": e }],
                diadem: e,
                jelastic: [0, { vip: e }],
                jele: e,
                "jenv-aruba": [0, { aruba: [0, { eur: [0, { it1: e }] }], it1: e }],
                keliweb: [2, { cs: e }],
                oxa: [2, { tn: e, uk: e }],
                primetel: [2, { uk: e }],
                reclaim: [0, { ca: e, uk: e, us: e }],
                trendhosting: [0, { ch: e, de: e }],
                jotelulu: e,
                kuleuven: e,
                linkyard: e,
                magentosite: n,
                perspecta: e,
                vapor: e,
                "on-rancher": n,
                scw: [
                  0,
                  {
                    baremetal: [0, { "fr-par-1": e, "fr-par-2": e, "nl-ams-1": e }],
                    "fr-par": [0, { fnc: [2, { functions: e }], k8s: c, s3: e, "s3-website": e, whm: e }],
                    instances: [0, { priv: e, pub: e }],
                    k8s: e,
                    "nl-ams": [0, { k8s: c, s3: e, "s3-website": e, whm: e }],
                    "pl-waw": [0, { k8s: c, s3: e, "s3-website": e }],
                    scalebook: e,
                    smartlabeling: e,
                  },
                ],
                sensiosite: n,
                trafficplex: e,
                urown: e,
                voorloper: e,
              },
            ],
            club: [1, { cloudns: e, jele: e, barsy: e }],
            clubmed: a,
            coach: a,
            codes: [1, { owo: n }],
            coffee: a,
            college: a,
            cologne: a,
            comcast: a,
            commbank: a,
            community: [1, { nog: e, ravendb: e, myforum: e }],
            company: a,
            compare: a,
            computer: a,
            comsec: a,
            condos: a,
            construction: a,
            consulting: a,
            contact: a,
            contractors: a,
            cooking: a,
            cool: [1, { elementor: e, de: e }],
            corsica: a,
            country: a,
            coupon: a,
            coupons: a,
            courses: a,
            cpa: a,
            credit: a,
            creditcard: a,
            creditunion: a,
            cricket: a,
            crown: a,
            crs: a,
            cruise: a,
            cruises: a,
            cuisinella: a,
            cymru: a,
            cyou: a,
            dabur: a,
            dad: a,
            dance: a,
            data: a,
            date: a,
            dating: a,
            datsun: a,
            day: a,
            dclk: a,
            dds: a,
            deal: a,
            dealer: a,
            deals: a,
            degree: a,
            delivery: a,
            dell: a,
            deloitte: a,
            delta: a,
            democrat: a,
            dental: a,
            dentist: a,
            desi: a,
            design: [1, { bss: e }],
            dev: [
              1,
              {
                autocode: e,
                lcl: n,
                lclstage: n,
                stg: n,
                stgstage: n,
                pages: e,
                r2: e,
                workers: e,
                curv: e,
                deno: e,
                "deno-staging": e,
                deta: e,
                fly: e,
                githubpreview: e,
                gateway: n,
                iserv: e,
                localcert: [0, { user: n }],
                loginline: e,
                mediatech: e,
                ngrok: e,
                "ngrok-free": e,
                "platter-app": e,
                shiftcrypto: e,
                vercel: e,
                webhare: n,
              },
            ],
            dhl: a,
            diamonds: a,
            diet: a,
            digital: [1, { cloudapps: [2, { london: e }] }],
            direct: a,
            directory: a,
            discount: a,
            discover: a,
            dish: a,
            diy: a,
            dnp: a,
            docs: a,
            doctor: a,
            dog: a,
            domains: a,
            dot: a,
            download: a,
            drive: a,
            dtv: a,
            dubai: a,
            dunlop: a,
            dupont: a,
            durban: a,
            dvag: a,
            dvr: a,
            earth: [1, { dapps: [0, { "*": e, bzz: n }] }],
            eat: a,
            eco: a,
            edeka: a,
            education: l,
            email: a,
            emerck: a,
            energy: a,
            engineer: a,
            engineering: a,
            enterprises: a,
            epson: a,
            equipment: a,
            ericsson: a,
            erni: a,
            esq: a,
            estate: [1, { compute: n }],
            etisalat: a,
            eurovision: a,
            eus: [1, { party: I }],
            events: [1, { koobin: e, co: e }],
            exchange: a,
            expert: a,
            exposed: a,
            express: a,
            extraspace: a,
            fage: a,
            fail: a,
            fairwinds: a,
            faith: M,
            family: a,
            fan: a,
            fans: a,
            farm: [1, { storj: e }],
            farmers: a,
            fashion: a,
            fast: a,
            fedex: a,
            feedback: a,
            ferrari: a,
            ferrero: a,
            fidelity: a,
            fido: a,
            film: a,
            final: a,
            finance: a,
            financial: l,
            fire: a,
            firestone: a,
            firmdale: a,
            fish: a,
            fishing: a,
            fit: a,
            fitness: a,
            flickr: a,
            flights: a,
            flir: a,
            florist: a,
            flowers: a,
            fly: a,
            foo: a,
            food: a,
            football: a,
            ford: a,
            forex: a,
            forsale: a,
            forum: a,
            foundation: a,
            fox: a,
            free: a,
            fresenius: a,
            frl: a,
            frogans: a,
            frontdoor: a,
            frontier: a,
            ftr: a,
            fujitsu: a,
            fun: a,
            fund: a,
            furniture: a,
            futbol: a,
            fyi: a,
            gal: a,
            gallery: a,
            gallo: a,
            gallup: a,
            game: a,
            games: a,
            gap: a,
            garden: a,
            gay: a,
            gbiz: a,
            gdn: [1, { cnpy: e }],
            gea: a,
            gent: a,
            genting: a,
            george: a,
            ggee: a,
            gift: a,
            gifts: a,
            gives: a,
            giving: a,
            glass: a,
            gle: a,
            global: a,
            globo: a,
            gmail: a,
            gmbh: a,
            gmo: a,
            gmx: a,
            godaddy: a,
            gold: a,
            goldpoint: a,
            golf: a,
            goo: a,
            goodyear: a,
            goog: [1, { cloud: e, translate: e, usercontent: n }],
            google: a,
            gop: a,
            got: a,
            grainger: a,
            graphics: a,
            gratis: a,
            green: a,
            gripe: a,
            grocery: a,
            group: [1, { discourse: e }],
            guardian: a,
            gucci: a,
            guge: a,
            guide: a,
            guitars: a,
            guru: a,
            hair: a,
            hamburg: a,
            hangout: a,
            haus: a,
            hbo: a,
            hdfc: a,
            hdfcbank: a,
            health: [1, { hra: e }],
            healthcare: a,
            help: a,
            helsinki: a,
            here: a,
            hermes: a,
            hiphop: a,
            hisamitsu: a,
            hitachi: a,
            hiv: a,
            hkt: a,
            hockey: a,
            holdings: a,
            holiday: a,
            homedepot: a,
            homegoods: a,
            homes: a,
            homesense: a,
            honda: a,
            horse: a,
            hospital: a,
            host: [
              1,
              {
                cloudaccess: e,
                freesite: e,
                easypanel: e,
                fastvps: e,
                myfast: e,
                tempurl: e,
                wpmudev: e,
                jele: e,
                mircloud: e,
                pcloud: e,
                half: e,
              },
            ],
            hosting: [1, { opencraft: e }],
            hot: a,
            hotels: a,
            hotmail: a,
            house: a,
            how: a,
            hsbc: a,
            hughes: a,
            hyatt: a,
            hyundai: a,
            ibm: a,
            icbc: a,
            ice: a,
            icu: a,
            ieee: a,
            ifm: a,
            ikano: a,
            imamat: a,
            imdb: a,
            immo: a,
            immobilien: a,
            inc: a,
            industries: a,
            infiniti: a,
            ing: a,
            ink: a,
            institute: a,
            insurance: a,
            insure: a,
            international: a,
            intuit: a,
            investments: a,
            ipiranga: a,
            irish: a,
            ismaili: a,
            ist: a,
            istanbul: a,
            itau: a,
            itv: a,
            jaguar: a,
            java: a,
            jcb: a,
            jeep: a,
            jetzt: a,
            jewelry: a,
            jio: a,
            jll: a,
            jmp: a,
            jnj: a,
            joburg: a,
            jot: a,
            joy: a,
            jpmorgan: a,
            jprs: a,
            juegos: a,
            juniper: a,
            kaufen: a,
            kddi: a,
            kerryhotels: a,
            kerrylogistics: a,
            kerryproperties: a,
            kfh: a,
            kia: a,
            kids: a,
            kim: a,
            kinder: a,
            kindle: a,
            kitchen: a,
            kiwi: a,
            koeln: a,
            komatsu: a,
            kosher: a,
            kpmg: a,
            kpn: a,
            krd: [1, { co: e, edu: e }],
            kred: a,
            kuokgroup: a,
            kyoto: a,
            lacaixa: a,
            lamborghini: a,
            lamer: a,
            lancaster: a,
            land: [1, { static: [2, { dev: e, sites: e }] }],
            landrover: a,
            lanxess: a,
            lasalle: a,
            lat: a,
            latino: a,
            latrobe: a,
            law: a,
            lawyer: a,
            lds: a,
            lease: a,
            leclerc: a,
            lefrak: a,
            legal: a,
            lego: a,
            lexus: a,
            lgbt: a,
            lidl: a,
            life: a,
            lifeinsurance: a,
            lifestyle: a,
            lighting: a,
            like: a,
            lilly: a,
            limited: a,
            limo: a,
            lincoln: a,
            link: [1, { cyon: e, mypep: e, dweb: n }],
            lipsy: a,
            live: [1, { hlx: e }],
            living: a,
            llc: a,
            llp: a,
            loan: a,
            loans: a,
            locker: a,
            locus: a,
            lol: [1, { omg: e }],
            london: a,
            lotte: a,
            lotto: a,
            love: a,
            lpl: a,
            lplfinancial: a,
            ltd: a,
            ltda: a,
            lundbeck: a,
            luxe: a,
            luxury: a,
            madrid: a,
            maif: a,
            maison: a,
            makeup: a,
            man: a,
            management: [1, { router: e }],
            mango: a,
            map: a,
            market: a,
            marketing: a,
            markets: a,
            marriott: a,
            marshalls: a,
            mattel: a,
            mba: a,
            mckinsey: a,
            med: a,
            media: _,
            meet: a,
            melbourne: a,
            meme: a,
            memorial: a,
            men: a,
            menu: A,
            merckmsd: a,
            miami: a,
            microsoft: a,
            mini: a,
            mint: a,
            mit: a,
            mitsubishi: a,
            mlb: a,
            mls: a,
            mma: a,
            mobile: a,
            moda: a,
            moe: a,
            moi: a,
            mom: a,
            monash: a,
            money: a,
            monster: a,
            mormon: a,
            mortgage: a,
            moscow: a,
            moto: a,
            motorcycles: a,
            mov: a,
            movie: a,
            msd: a,
            mtn: a,
            mtr: a,
            music: a,
            nab: a,
            nagoya: a,
            natura: a,
            navy: a,
            nba: a,
            nec: a,
            netbank: a,
            netflix: a,
            network: [1, { alces: n, co: e, arvo: e, azimuth: e, tlon: e }],
            neustar: a,
            new: a,
            news: [1, { noticeable: e }],
            next: a,
            nextdirect: a,
            nexus: a,
            nfl: a,
            ngo: a,
            nhk: a,
            nico: a,
            nike: a,
            nikon: a,
            ninja: a,
            nissan: a,
            nissay: a,
            nokia: a,
            norton: a,
            now: a,
            nowruz: a,
            nowtv: a,
            nra: a,
            nrw: a,
            ntt: a,
            nyc: a,
            obi: a,
            observer: a,
            office: a,
            okinawa: a,
            olayan: a,
            olayangroup: a,
            oldnavy: a,
            ollo: a,
            omega: a,
            one: [1, { onred: [2, { staging: e }], service: e, homelink: e }],
            ong: a,
            onl: a,
            online: [1, { eero: e, "eero-stage": e, barsy: e }],
            ooo: a,
            open: a,
            oracle: a,
            orange: [1, { tech: e }],
            organic: a,
            origins: a,
            osaka: a,
            otsuka: a,
            ott: a,
            ovh: [1, { nerdpol: e }],
            page: [
              1,
              { hlx: e, hlx3: e, translated: e, codeberg: e, pdns: e, plesk: e, prvcy: e, rocky: e, magnet: e },
            ],
            panasonic: a,
            paris: a,
            pars: a,
            partners: a,
            parts: a,
            party: M,
            pay: a,
            pccw: a,
            pet: a,
            pfizer: a,
            pharmacy: a,
            phd: a,
            philips: a,
            phone: a,
            photo: a,
            photography: a,
            photos: _,
            physio: a,
            pics: a,
            pictet: a,
            pictures: [1, { 1337: e }],
            pid: a,
            pin: a,
            ping: a,
            pink: a,
            pioneer: a,
            pizza: [1, { ngrok: e }],
            place: l,
            play: a,
            playstation: a,
            plumbing: a,
            plus: a,
            pnc: a,
            pohl: a,
            poker: a,
            politie: a,
            porn: [1, { indie: e }],
            pramerica: a,
            praxi: a,
            press: a,
            prime: a,
            prod: a,
            productions: a,
            prof: a,
            progressive: a,
            promo: a,
            properties: a,
            property: a,
            protection: a,
            pru: a,
            prudential: a,
            pub: A,
            pwc: a,
            qpon: a,
            quebec: a,
            quest: a,
            racing: a,
            radio: a,
            read: a,
            realestate: a,
            realtor: a,
            realty: a,
            recipes: a,
            red: a,
            redstone: a,
            redumbrella: a,
            rehab: a,
            reise: a,
            reisen: a,
            reit: a,
            reliance: a,
            ren: a,
            rent: a,
            rentals: a,
            repair: a,
            report: a,
            republican: a,
            rest: a,
            restaurant: a,
            review: M,
            reviews: a,
            rexroth: a,
            rich: a,
            richardli: a,
            ricoh: a,
            ril: a,
            rio: a,
            rip: [1, { clan: e }],
            rocher: a,
            rocks: [1, { myddns: e, "lima-city": e, webspace: e }],
            rodeo: a,
            rogers: a,
            room: a,
            rsvp: a,
            rugby: a,
            ruhr: a,
            run: [
              1,
              {
                hs: e,
                development: e,
                ravendb: e,
                servers: e,
                build: n,
                code: n,
                database: n,
                migration: n,
                onporter: e,
                repl: e,
              },
            ],
            rwe: a,
            ryukyu: a,
            saarland: a,
            safe: a,
            safety: a,
            sakura: a,
            sale: a,
            salon: a,
            samsclub: a,
            samsung: a,
            sandvik: a,
            sandvikcoromant: a,
            sanofi: a,
            sap: a,
            sarl: a,
            sas: a,
            save: a,
            saxo: a,
            sbi: a,
            sbs: a,
            sca: a,
            scb: a,
            schaeffler: a,
            schmidt: a,
            scholarships: a,
            school: a,
            schule: a,
            schwarz: a,
            science: M,
            scot: [1, { edu: e, gov: [2, { service: e }] }],
            search: a,
            seat: a,
            secure: a,
            security: a,
            seek: a,
            select: a,
            sener: a,
            services: [1, { loginline: e }],
            seven: a,
            sew: a,
            sex: a,
            sexy: a,
            sfr: a,
            shangrila: a,
            sharp: a,
            shaw: a,
            shell: a,
            shia: a,
            shiksha: a,
            shoes: a,
            shop: [1, { base: e, hoplix: e, barsy: e }],
            shopping: a,
            shouji: a,
            show: a,
            showtime: a,
            silk: a,
            sina: a,
            singles: a,
            site: [
              1,
              {
                cloudera: n,
                cyon: e,
                fnwk: e,
                folionetwork: e,
                fastvps: e,
                jele: e,
                lelux: e,
                loginline: e,
                barsy: e,
                mintere: e,
                omniwe: e,
                opensocial: e,
                platformsh: n,
                tst: n,
                byen: e,
                srht: e,
                novecore: e,
              },
            ],
            ski: a,
            skin: a,
            sky: a,
            skype: a,
            sling: a,
            smart: a,
            smile: a,
            sncf: a,
            soccer: a,
            social: a,
            softbank: a,
            software: a,
            sohu: a,
            solar: a,
            solutions: [1, { diher: n }],
            song: a,
            sony: a,
            soy: a,
            spa: a,
            space: [1, { myfast: e, uber: e, xs4all: e }],
            sport: a,
            spot: a,
            srl: a,
            stada: a,
            staples: a,
            star: a,
            statebank: a,
            statefarm: a,
            stc: a,
            stcgroup: a,
            stockholm: a,
            storage: a,
            store: [1, { sellfy: e, shopware: e, storebase: e }],
            stream: a,
            studio: a,
            study: a,
            style: a,
            sucks: a,
            supplies: a,
            supply: a,
            support: A,
            surf: a,
            surgery: a,
            suzuki: a,
            swatch: a,
            swiss: a,
            sydney: a,
            systems: [1, { knightpoint: e }],
            tab: a,
            taipei: a,
            talk: a,
            taobao: a,
            target: a,
            tatamotors: a,
            tatar: a,
            tattoo: a,
            tax: a,
            taxi: a,
            tci: a,
            tdk: a,
            team: [1, { discourse: e, jelastic: e }],
            tech: a,
            technology: l,
            temasek: a,
            tennis: a,
            teva: a,
            thd: a,
            theater: a,
            theatre: a,
            tiaa: a,
            tickets: a,
            tienda: a,
            tips: a,
            tires: a,
            tirol: a,
            tjmaxx: a,
            tjx: a,
            tkmaxx: a,
            tmall: a,
            today: [1, { prequalifyme: e }],
            tokyo: a,
            tools: a,
            top: [1, { "now-dns": e, ntdll: e }],
            toray: a,
            toshiba: a,
            total: a,
            tours: a,
            town: a,
            toyota: a,
            toys: a,
            trade: M,
            trading: a,
            training: a,
            travel: a,
            travelers: a,
            travelersinsurance: a,
            trust: a,
            trv: a,
            tube: a,
            tui: a,
            tunes: a,
            tushu: a,
            tvs: a,
            ubank: a,
            ubs: a,
            unicom: a,
            university: a,
            uno: a,
            uol: a,
            ups: a,
            vacations: a,
            vana: a,
            vanguard: a,
            vegas: a,
            ventures: a,
            verisign: a,
            versicherung: a,
            vet: a,
            viajes: a,
            video: a,
            vig: a,
            viking: a,
            villas: a,
            vin: a,
            vip: a,
            virgin: a,
            visa: a,
            vision: a,
            viva: a,
            vivo: a,
            vlaanderen: a,
            vodka: a,
            volkswagen: a,
            volvo: a,
            vote: a,
            voting: a,
            voto: a,
            voyage: a,
            wales: a,
            walmart: a,
            walter: a,
            wang: a,
            wanggou: a,
            watch: a,
            watches: a,
            weather: a,
            weatherchannel: a,
            webcam: a,
            weber: a,
            website: _,
            wedding: a,
            weibo: a,
            weir: a,
            whoswho: a,
            wien: a,
            wiki: _,
            williamhill: a,
            win: a,
            windows: a,
            wine: a,
            winners: a,
            wme: a,
            wolterskluwer: a,
            woodside: a,
            work: a,
            works: a,
            world: a,
            wow: a,
            wtc: a,
            wtf: a,
            xbox: a,
            xerox: a,
            xfinity: a,
            xihuan: a,
            xin: a,
            "xn--11b4c3d": a,
            कॉम: a,
            "xn--1ck2e1b": a,
            セール: a,
            "xn--1qqw23a": a,
            佛山: a,
            "xn--30rr7y": a,
            慈善: a,
            "xn--3bst00m": a,
            集团: a,
            "xn--3ds443g": a,
            在线: a,
            "xn--3pxu8k": a,
            点看: a,
            "xn--42c2d9a": a,
            คอม: a,
            "xn--45q11c": a,
            八卦: a,
            "xn--4gbrim": a,
            موقع: a,
            "xn--55qw42g": a,
            公益: a,
            "xn--55qx5d": a,
            公司: a,
            "xn--5su34j936bgsg": a,
            香格里拉: a,
            "xn--5tzm5g": a,
            网站: a,
            "xn--6frz82g": a,
            移动: a,
            "xn--6qq986b3xl": a,
            我爱你: a,
            "xn--80adxhks": a,
            москва: a,
            "xn--80aqecdr1a": a,
            католик: a,
            "xn--80asehdb": a,
            онлайн: a,
            "xn--80aswg": a,
            сайт: a,
            "xn--8y0a063a": a,
            联通: a,
            "xn--9dbq2a": a,
            קום: a,
            "xn--9et52u": a,
            时尚: a,
            "xn--9krt00a": a,
            微博: a,
            "xn--b4w605ferd": a,
            淡马锡: a,
            "xn--bck1b9a5dre4c": a,
            ファッション: a,
            "xn--c1avg": a,
            орг: a,
            "xn--c2br7g": a,
            नेट: a,
            "xn--cck2b3b": a,
            ストア: a,
            "xn--cckwcxetd": a,
            アマゾン: a,
            "xn--cg4bki": a,
            삼성: a,
            "xn--czr694b": a,
            商标: a,
            "xn--czrs0t": a,
            商店: a,
            "xn--czru2d": a,
            商城: a,
            "xn--d1acj3b": a,
            дети: a,
            "xn--eckvdtc9d": a,
            ポイント: a,
            "xn--efvy88h": a,
            新闻: a,
            "xn--fct429k": a,
            家電: a,
            "xn--fhbei": a,
            كوم: a,
            "xn--fiq228c5hs": a,
            中文网: a,
            "xn--fiq64b": a,
            中信: a,
            "xn--fjq720a": a,
            娱乐: a,
            "xn--flw351e": a,
            谷歌: a,
            "xn--fzys8d69uvgm": a,
            電訊盈科: a,
            "xn--g2xx48c": a,
            购物: a,
            "xn--gckr3f0f": a,
            クラウド: a,
            "xn--gk3at1e": a,
            通販: a,
            "xn--hxt814e": a,
            网店: a,
            "xn--i1b6b1a6a2e": a,
            संगठन: a,
            "xn--imr513n": a,
            餐厅: a,
            "xn--io0a7i": a,
            网络: a,
            "xn--j1aef": a,
            ком: a,
            "xn--jlq480n2rg": a,
            亚马逊: a,
            "xn--jvr189m": a,
            食品: a,
            "xn--kcrx77d1x4a": a,
            飞利浦: a,
            "xn--kput3i": a,
            手机: a,
            "xn--mgba3a3ejt": a,
            ارامكو: a,
            "xn--mgba7c0bbn0a": a,
            العليان: a,
            "xn--mgbaakc7dvf": a,
            اتصالات: a,
            "xn--mgbab2bd": a,
            بازار: a,
            "xn--mgbca7dzdo": a,
            ابوظبي: a,
            "xn--mgbi4ecexp": a,
            كاثوليك: a,
            "xn--mgbt3dhd": a,
            همراه: a,
            "xn--mk1bu44c": a,
            닷컴: a,
            "xn--mxtq1m": a,
            政府: a,
            "xn--ngbc5azd": a,
            شبكة: a,
            "xn--ngbe9e0a": a,
            بيتك: a,
            "xn--ngbrx": a,
            عرب: a,
            "xn--nqv7f": a,
            机构: a,
            "xn--nqv7fs00ema": a,
            组织机构: a,
            "xn--nyqy26a": a,
            健康: a,
            "xn--otu796d": a,
            招聘: a,
            "xn--p1acf": [
              1,
              {
                "xn--90amc": e,
                "xn--j1aef": e,
                "xn--j1ael8b": e,
                "xn--h1ahn": e,
                "xn--j1adp": e,
                "xn--c1avg": e,
                "xn--80aaa0cvac": e,
                "xn--h1aliz": e,
                "xn--90a1af": e,
                "xn--41a": e,
              },
            ],
            рус: [1, { биз: e, ком: e, крым: e, мир: e, мск: e, орг: e, самара: e, сочи: e, спб: e, я: e }],
            "xn--pssy2u": a,
            大拿: a,
            "xn--q9jyb4c": a,
            みんな: a,
            "xn--qcka1pmc": a,
            グーグル: a,
            "xn--rhqv96g": a,
            世界: a,
            "xn--rovu88b": a,
            書籍: a,
            "xn--ses554g": a,
            网址: a,
            "xn--t60b56a": a,
            닷넷: a,
            "xn--tckwe": a,
            コム: a,
            "xn--tiq49xqyj": a,
            天主教: a,
            "xn--unup4y": a,
            游戏: a,
            "xn--vermgensberater-ctb": a,
            vermögensberater: a,
            "xn--vermgensberatung-pwb": a,
            vermögensberatung: a,
            "xn--vhquv": a,
            企业: a,
            "xn--vuq861b": a,
            信息: a,
            "xn--w4r85el8fhu5dnra": a,
            嘉里大酒店: a,
            "xn--w4rs40l": a,
            嘉里: a,
            "xn--xhq521b": a,
            广东: a,
            "xn--zfr164b": a,
            政务: a,
            xyz: [1, { blogsite: e, localzone: e, crafting: e, zapto: e, telebit: n }],
            yachts: a,
            yahoo: a,
            yamaxun: a,
            yandex: a,
            yodobashi: a,
            yoga: a,
            yokohama: a,
            you: a,
            youtube: a,
            yun: a,
            zappos: a,
            zara: a,
            zero: a,
            zip: a,
            zone: [1, { cloud66: e, hs: e, triton: n, lima: e }],
            zuerich: a,
          },
        ]
      })()
    function Vt(a, e, t, n) {
      let o = null,
        i = e
      for (
        ;
        void 0 !== i &&
        (0 != (i[0] & n) && (o = { index: t + 1, isIcann: 1 === i[0], isPrivate: 2 === i[0] }), -1 !== t);

      ) {
        const e = i[1]
        ;(i = I.prototype.hasOwnProperty.call(e, a[t]) ? e[a[t]] : e["*"]), (t -= 1)
      }
      return o
    }
    function Gt(a, e, t) {
      var n
      if (Ft(a, e, t)) return
      const o = a.split("."),
        i = (e.allowPrivateDomains ? 2 : 0) | (e.allowIcannDomains ? 1 : 0),
        s = Vt(o, Wt, o.length - 1, i)
      if (null !== s)
        return (
          (t.isIcann = s.isIcann), (t.isPrivate = s.isPrivate), void (t.publicSuffix = o.slice(s.index + 1).join("."))
        )
      const r = Vt(o, Bt, o.length - 1, i)
      if (null !== r)
        return (t.isIcann = r.isIcann), (t.isPrivate = r.isPrivate), void (t.publicSuffix = o.slice(r.index).join("."))
      ;(t.isIcann = !1),
        (t.isPrivate = !1),
        (t.publicSuffix = null !== (n = o[o.length - 1]) && void 0 !== n ? n : null)
    }
    const Kt = {
      domain: null,
      domainWithoutSuffix: null,
      hostname: null,
      isIcann: null,
      isIp: null,
      isPrivate: null,
      publicSuffix: null,
      subdomain: null,
    }
    function Jt(a, e = {}) {
      var t
      return (
        ((t = Kt).domain = null),
        (t.domainWithoutSuffix = null),
        (t.hostname = null),
        (t.isIcann = null),
        (t.isIp = null),
        (t.isPrivate = null),
        (t.publicSuffix = null),
        (t.subdomain = null),
        Nt(a, 2, Gt, e, Kt).publicSuffix
      )
    }
    function Yt(a, e = {}) {
      var t
      return (
        ((t = Kt).domain = null),
        (t.domainWithoutSuffix = null),
        (t.hostname = null),
        (t.isIcann = null),
        (t.isIp = null),
        (t.isPrivate = null),
        (t.publicSuffix = null),
        (t.subdomain = null),
        Nt(a, 3, Gt, e, Kt).domain
      )
    }
    const Xt = { allowPrivateDomains: !0 },
      Zt = (a) => Yt(a, Xt),
      Qt = (a) => Jt(a, Xt),
      an = { test: () => 1 },
      en = xt({ lifetime: 36e5 }),
      tn = xt({ lifetime: 36e5 }),
      nn = xt({ lifetime: 6e4 }),
      on = xt({ lifetime: 6e4 }),
      sn = /^(\*|http([s*])?|file|ftp|urn):\/\/([^/]*)\/(.*)/,
      rn = /^(\*|http([s*])?|file|ftp|urn|([^:]*?)(?=:))(:(?:\/(?:\/)?)?)?([^/]*)(?:\/(.*))?/,
      ln = /^([^:]*):\/\/([^/]*)\/(.*)/,
      cn = 1e5
    let un,
      dn,
      mn,
      hn,
      gn,
      pn,
      fn,
      kn = {},
      bn = 0,
      yn = []
    bt((a) => {
      if (ma in a) {
        const e = Dn(a[ma] || []),
          t = e.length ? e : null
        if ((ot.base.setOne(ha, t), t)) throw t
      }
    })
    class vn {
      constructor(a, e, t, n, o) {
        const i = "*" === e || "*" === t
        ;(this.scheme = i ? "http" : e),
          (this.scheme2 = i ? "https" : null),
          (this.host = "*" === n ? null : Mn(n)),
          (this.path = "*" === o ? null : Cn(o))
      }
      test() {
        var a, e
        return (
          (this.scheme === mn || this.scheme2 === mn) &&
          !1 !== (null == (a = this.host) ? void 0 : a.test(hn)) &&
          !1 !== (null == (e = this.path) ? void 0 : e.test(gn))
        )
      }
      static try(a) {
        let e = a.match(sn)
        if (e) return new vn(...e)
        if ("<all_urls>" === a) return an
        throw (
          ((e = a.match(rn)),
          (e = e
            ? (
                (null != e[3] ? (e[3] ? "unknown" : "missing") + " scheme, " : "") +
                  ("://" !== e[4] ? 'missing "://", ' : "") || (null == e[6] ? 'missing "/" for path, ' : "")
              ).slice(0, -2) + " in "
            : ""),
          `Bad pattern: ${e}${a}`)
        )
      }
    }
    class wn {
      constructor(a, e, t) {
        ;(this.s = t ? a.toLowerCase() : a), (this.i = !!t), (this.cmp = e < 0 ? "" : e ? "startsWith" : "endsWith")
      }
      test(a) {
        const { s: e, cmp: t } = this,
          n = a.length - e.length
        return (
          n >= 0 &&
          (t && n ? a[t](e) || (this.i && a.toLowerCase()[t](e)) : a === e || (!n && this.i && a.toLowerCase() === e))
        )
      }
      static try(a, e) {
        const t = a.indexOf("*")
        if (t === a.length - 1) a = a.slice(0, -1)
        else if (0 === t && a.indexOf("*", 1) < 0) a = a.slice(1)
        else if (t >= 0) return
        return new wn(a, t, e)
      }
    }
    function xn(a) {
      en.batch(a), tn.batch(a), nn.batch(a), on.batch(a), (un = Array.isArray(a) && a)
    }
    function zn(a) {
      ;(dn = a),
        ([, mn, hn, gn] = a ? a.match(ln) : ["", "", "", ""]),
        (pn = a ? nn.get(a) || nn.put(a, {}) : null),
        (fn = a ? on.get(a) || on.put(a, {}) : null)
    }
    function jn(a, e) {
      let t, n, o, i
      const { custom: s, meta: r } = e
      return (
        (!(
          (t = (s.origMatch && r.match) || "").length +
          (n = s.match || "").length +
          (o = (s.origInclude && r.include) || "").length +
          (i = s.include || "").length
        ) ||
          Sn(a, e, t, n, o, i)) &&
        !(
          (t = (s.origExcludeMatch && r.excludeMatch) || "").length +
            (n = s.excludeMatch || "").length +
            (o = (s.origExclude && r.exclude) || "").length +
            (i = s.exclude || "").length && Sn(a, e, t, n, o, i)
        )
      )
    }
    function Sn(a, e, ...t) {
      dn !== a && zn(a)
      for (let n, o, i, s, r, l, c, u, d = 0; d < 4; d += 1) {
        if ((o = t[d]).length) {
          s || (d < 2 ? ((i = vn.try), (s = en), (r = pn)) : ((i = $n), (s = tn), (r = fn)))
          for (let t = 0, d = o; t < d.length; t++) {
            const o = d[t]
            if (a && (l = r[o])) return l
            if (null == l) {
              if (!(n = s.get(o))) {
                try {
                  n = i(o)
                } catch (a) {
                  n = { err: a }
                }
                s.put(o, n)
              }
              if ((c = n.err)) un && ((c = c.message || c), (c = a ? `${c} - ${u || (u = je(e))}` : c), un.push(c))
              else if (a && (r[o] = +!!n.test(a))) return !0
            }
          }
        }
        1 === d && (s = !1)
      }
    }
    function qn(a) {
      return re(a).replace(/\*/g, ".*?")
    }
    function $n(a) {
      if (a.length > 1 && "/" === a[0] && "/" === a[a.length - 1]) return new RegExp(a.slice(1, -1), "i")
      const e = a.includes(".tld/"),
        t = !e && wn.try(a, !0)
      if (t) return t
      const n = `^${qn(a)}$`,
        o = e ? n.replace("\\.tld/", "((?:\\.[-\\w]+)+)/") : n,
        i = RegExp(o, "i")
      return n !== o && (i.test = In), i
    }
    function In(a) {
      var e
      const t = a.match(this),
        n = null == t || null == (e = t[1]) ? void 0 : e.slice(1).toLowerCase()
      return !!n && Qt(n) === n
    }
    function Mn(a) {
      const e = a.endsWith(".tld")
      let t,
        n = "",
        o = a,
        i = ""
      if (a.startsWith("*.")) (o = o.slice(2)), (n = "(?:|[^:/]*?\\.)")
      else if (!e && (t = wn.try(a, !0))) return t
      e && ((o = o.slice(0, -4)), (i = "(|(?:\\.[-\\w]+)+)"))
      const s = RegExp(`^${n}${qn(o)}${i}$`, "i")
      return e && (s.test = In), s
    }
    function Cn(a) {
      const e = a.indexOf("?"),
        t = a.indexOf("#", e + 1) >= 0
      return (t && wn.try(a)) || RegExp(`^${qn(a)}${t ? "$" : `($|${e >= 0 ? "#" : "[?#]"})`}`)
    }
    function Un(a) {
      let e = kn[a]
      if (void 0 === e) {
        dn !== a && zn(a)
        const t = yn.find((e) => e.test(a))
        ;(e = (null == t ? void 0 : t.reject) && t.text), Rn(a, e || !1)
      }
      return e
    }
    function Dn(a = yt(ma)) {
      const e = (a, e, t) => a.get(e) || a.put(e, t(e)),
        t = []
      return (
        xn(!0),
        (yn = (Array.isArray(a) ? a : (a || "").split("\n")).reduce((a, n) => {
          try {
            if (!(n = n.trim()) || n.startsWith("#")) return a
            const t = n.startsWith("@") && n.split(/\s/, 1)[0],
              o = t ? n.slice(t.length + 1).trim() : n,
              i = "@include" === t,
              s =
                ((i || "@exclude" === t) && e(tn, o, $n)) ||
                (!t && !o.includes("/") && e(en, `*://${o}/*`, vn.try)) ||
                e(en, o, vn.try)
            ;(s.reject = !("@match" === t || i)), (s.text = n), a.push(s)
          } catch (a) {
            t.push(a)
          }
          return a
        }, [])),
        (kn = {}),
        (bn = 0),
        xn(),
        t
      )
    }
    function Rn(a, e) {
      if (((kn[a] = e), (bn += a.length), bn > cn))
        for (const a in kn) if (delete kn[a] && (bn -= a.length) < 0.75 * cn) return
    }
    const Tn = navigator.userAgent,
      _n = navigator.userAgentData,
      An = (() => {
        let a, e, t
        var n
        return (
          _n
            ? ((t = _n.getHighEntropyValues(["uaFullVersion"])),
              ([a, e] =
                (null ==
                (n = _n.brands
                  .map(
                    ({ brand: a, version: e }) =>
                      `${/Not[^a-z]*A[^a-z]*Brand/i.test(a) ? "4" : "Chromium" === a ? "3" + a : "Google Chrome" === a ? "2" + a : "1" + a}\n${e}`
                  )
                  .sort()[0])
                  ? void 0
                  : n.slice(1).split("\n")) || []))
            : (e = Tn.match(/\s(?:Chrom(?:e|ium)|Firefox)\/(\d+[.0-9]*)|$/i)[1]),
          { [P ? "FF" : "CH"]: parseFloat(e) || 1, brand: a, full: t, ver: e }
        )
      })(),
      Ln = {},
      En = An.CH
    let On = An.FF
    Le({ UA: () => Ln }),
      Oe.deps.push(
        M.all([
          browser.runtime.getPlatformInfo(),
          null == browser.runtime.getBrowserInfo ? void 0 : browser.runtime.getBrowserInfo(),
          An.full,
        ]).then(([{ os: a, arch: e }, { name: t, version: n } = {}, { uaFullVersion: o } = {}]) => {
          ;(Ln.arch = e),
            (Ln.os = a),
            (Ln.brand = Ln.browserBrand = An.brand || ""),
            (Ln.name = Ln.browserName = (null == t ? void 0 : t.toLowerCase()) || "chrome"),
            (Ln.version = Ln.browserVersion = o || n || An.ver),
            On && (On = parseFloat(n))
        })
      )
    const Pn = {},
      Hn = !P || !(!e.AbortSignal || !ce),
      Nn = B + H + "/",
      Fn = /^(about:(home|newtab)|(chrome|edge):\/\/(newtab\/|startpageshared\/|vivaldi-webui\/startpage))$/,
      Wn = (a, e, t) => (2 === a && e) || t,
      Bn = (a) => (2 === a[v] && a[J]) || a[Y],
      Vn = (a) => (+a >= 0 ? { [Y]: +a } : { [J]: a }),
      Gn = (a) => a.pendingUrl || a.url || "",
      Kn = browser.tabs.onUpdated,
      Jn = browser.tabs.onRemoved
    let Yn,
      Xn,
      Zn = /^(https?|file|ftps?):/
    try {
      Kn.addListener(Oa, { properties: ["status"] }), Kn.removeListener(Oa)
    } catch (a) {
      Kn.addListener = new Proxy(Kn.addListener, { apply: (a, e, t) => E(a, e, t[0]) })
    }
    async function Qn(a) {
      const e = await browser.tabs.query({})
      let t = 0
      for (let n = 0; n < e.length; n++) a(e[n]), (t += 1), t % 20 == 0 && (await new M(setTimeout))
    }
    async function ao(a, e) {
      const t = B + (a ? "#" + a : "")
      for (let e = 0, n = await browser.tabs.query({ url: B }); e < n.length; e++) {
        const o = n[e],
          i = o.url
        if (i === t || (!a && i === t + H))
          return null == ce || ce.update(o[Q], { focused: !0 }), browser.tabs.update(o.id, { active: !0 })
      }
      return _e.TabOpen({ url: t }, e)
    }
    async function eo(a) {
      const { url: e, id: t } = await Ie()
      if (Zn.test(e) && jn(e, a)) return browser.tabs.reload(t)
    }
    Le({
      GetTabDomain(a) {
        const e = a && new URL(a).hostname
        return { host: e, domain: (e && Zt(e)) || e }
      },
      async OpenEditor(a, e) {
        var t
        return ao(`${h}/${a || `_new/${(null == e || null == (t = e.tab) ? void 0 : t.id) || (await Ie()).id}`}`, e)
      },
      OpenDashboard: ao,
    }),
      Ae({
        async TabOpen({ url: a, active: e = !0, container: t, insert: n = !0, pinned: o }, i = {}) {
          const s = i._removed,
            r = (!s && i.tab) || (await Ie(s && i.tab[Q])) || {},
            l = i.url,
            c = !l || l.startsWith(N),
            { incognito: u, [Q]: d } = r,
            m = !u || P || !/^(chrome[-\w]*):/.test(a),
            h = { active: !!e, pinned: !!o }
          let g,
            p = r.cookieStoreId
          if (
            (p &&
              !u &&
              (Xn || (Xn = (await browser.cookies.getAllCookieStores())[0].id.split("-")[0]),
              c || 0 === t ? (p = Xn + "-default") : t > 0 && (p = `${Xn}-container-${t}`)),
            p && (p = { cookieStoreId: p }),
            /^[-\w]+:/.test(a) || (a = c ? browser.runtime.getURL(a) : qe(a, l)),
            c && a.startsWith(Nn) && ce && yt("editorWindow") && (!p || On >= 64))
          ) {
            const t = {
                url: a,
                incognito: m && u,
                ...(yt("editorWindowSimple") && { type: "popup" }),
                ...(!P && { focused: !!e }),
                ...p,
              },
              n = yt("editorWindowPos"),
              o = n && "top" in n
            g = ((await ce.create({ ...t, ...n }).catch(o && Oa)) || (o && (await ce.create(t)))).tabs[0]
          } else c && m && Fn.test(Gn(r)) && (g = await browser.tabs.update(r.id, { url: a, ...h }).catch(Oa))
          return (
            g ||
              (g = await browser.tabs.create({
                url: a,
                ...h,
                ...p,
                ...(m && {
                  [Q]: d,
                  ...(n && null != r.index && { index: r.index + 1 }),
                  ...(Hn && { openerTabId: r.id }),
                }),
              })),
            e && g[Q] !== d && (await (null == ce ? void 0 : ce.update(g[Q], { focused: !0 }))),
            c || null == r.id || (Pn[g.id] = r.id),
            c ? g : { id: g.id }
          )
        },
        TabClose({ id: a } = {}, e) {
          var t
          const n = a || (null == e || null == (t = e.tab) ? void 0 : t.id)
          n >= 0 && browser.tabs.remove(n)
        },
        TabFocus(a, e) {
          browser.tabs.update(e.tab.id, { active: !0 }).catch(Oa),
            null == ce || ce.update(e.tab[Q], { focused: !0 }).catch(Oa)
        },
      }),
      Jn.addListener((a) => {
        const e = Pn[a]
        e >= 0 && (fe(e, "TabClosed", a), delete Pn[a])
      }),
      (async () => {
        const a = P || (await new M((a) => D.extension.isAllowedFileSchemeAccess(a)))
        ;(Yn = On < 68 || (!P && a)),
          (P && [].at) || En >= 88 ? (Zn = a ? /^(https?|file):/ : /^https?:/) : a || (Zn = /^(ht|f)tps?:/)
      })(),
      Le({
        async NewScript(a) {
          const e = ((a >= 0 && (await browser.tabs.get(a).catch(Oa))) || {}).url,
            t = Zn.test(e) && `${e.split(/[#?]/)[0]}*`,
            { host: n = "example.org", domain: o } = t ? _e.GetTabDomain(t) : {}
          return lo({ url: t || `*://${n}/*`, name: o || "" })
        },
      })
    const to = { default: () => [], transform: (a, e) => (a.push(e), a) },
      no = { default: () => !1, transform: () => !0 },
      oo = { default: () => null, transform: (a, e) => (null == a ? e : a) },
      io = {
        include: to,
        exclude: to,
        match: to,
        excludeMatch: to,
        require: to,
        resource: {
          default: () => ({}),
          transform: (a, e) => {
            const t = e.match(/^(\w\S*)\s+(.*)/)
            return t && (a[t[1]] = t[2]), a
          },
        },
        grant: to,
      },
      so = { antifeature: to, compatible: to, connect: to, noframes: no, [ya]: no, [va]: no }
    function ro(a, e) {
      const t = E(qa, io, (a) => a.default()),
        n = a.match(sa),
        o = n[2]
      return (
        !!o &&
        (o.replace(/(?:^|\n)\s*\/\/\x20(@\S+)(.*)/g, (a, e, n) => {
          const [o, i] = e.slice(1).split(":"),
            s = o.replace(/[-_](\w)/g, (a, e) => e.toUpperCase()),
            r = i ? `${s}:${i.toLowerCase()}` : s,
            l = n.trim(),
            c = io[r] || so[r] || oo
          let u = t[r]
          void 0 === u && (u = c.default()), (t[r] = c.transform(u, l))
        }),
        (t.resources = t.resource),
        delete t.resource,
        e && (t[ka] = n[0]),
        t)
      )
    }
    function lo(a) {
      const e = { url: "*://*/*", name: "", ...a },
        t = yt("scriptTemplate").replace(/{{(\w+)(?::(.+?))?}}/g, (a, t, n) => {
          var o
          return null != (o = e[t]) ? o : "date" !== t ? a : n ? Rt(n) : new Date().toLocaleString()
        })
      return {
        script: {
          custom: { origInclude: !0, origExclude: !0, origMatch: !0, origExcludeMatch: !0 },
          config: { enabled: 1, shouldUpdate: 1 },
          meta: ro(t),
          props: {},
        },
        code: t,
      }
    }
    function co(a) {
      const e = a.meta.namespace || "",
        t = a.meta.name || ""
      let n = $e(`${e}\n${t}\n`)
      return e || t || (n += a.props.id || ""), n
    }
    function uo(a) {
      let e = a.custom.lastInstallURL
      if (e) {
        switch (((e = e.split("/", 6)), e[2])) {
          case "update.greasyfork.org":
          case "update.sleazyfork.org":
            e[2] = e[2].slice(7)
          case "greasyfork.org":
          case "sleazyfork.org":
            "scripts" !== e[3] && e.splice(3, 1)
            break
          case "raw.githubusercontent.com":
            e[2] = "github.com"
            break
          case "github.com":
            break
          case "openuserjs.org":
            ;(e[3] = "scripts"), (e[4] = e[4].replace(/(\.min)?\.user\.js$/, ""))
            break
          default:
            e = !1
        }
        e && ((e.length = 5), (e = e.join("/")))
      }
      return (
        e ||
          ((e = a.meta.namespace),
          (e =
            /^https?:\/\/(?!tampermonkey\.net\/)/.test(e) &&
            qe(e).replace(/^https?(:\/\/userscripts)(\.org\/users\/\w)/, "https$1-mirror$2"))),
        e
      )
    }
    function mo(a, e = ve(a)) {
      let t =
        e &&
        e.match(
          /^https:\/\/(?:(?:(greas|sleaz)yfork\.org(?:\/(?!scripts)[^/]+)?|openuserjs\.org)(?=\/scripts\/)|github\.com)\/[^/]+\/[^/]+/
        )
      if (t) return `${t[0]}/${t[1] ? "feedback" : "issues"}`
    }
    function ho(a) {
      if (!a || L(a, na)) return
      let e, t
      !(e = ve(a)) && (e = uo(a)) && ((t || (t = {}))[oa] = e),
        !we(a) && (e = mo(a, e)) && ((t || (t = {}))[ia] = e),
        (a[na] = t)
    }
    const go = {}
    let po,
      fo = {}
    function ko(a, e) {
      null == a && (fo = {}),
        E($a, go, ([t, n]) => {
          const o = n[a]
          o && (e ? (delete o[e], Ya(o) && delete n[a]) : delete n[a]), (null == a || Ya(n)) && delete go[t]
        })
    }
    async function bo(a, e, t) {
      const n = +a[0] && (await ot[at].getMulti(a))
      for (let o = 0; o < a.length; o++) {
        const i = a[o],
          s = n ? i : i.id,
          r = n ? n[s] || null : i[g]
        r ? ja(go, [s, e, t], I.assign({}, r)) : delete go[s]
      }
    }
    function yo(a, e) {
      for (let t = 0; t < a.length; t++) {
        const n = a[t]
        E(Ma, go[n], (a) => {
          e in a && ((a[0] = a[e]), delete a[e])
        })
      }
    }
    function vo(a, e) {
      var t
      ;(e || ot[at]).set(a, !!e), (po = (null == (t = po) ? void 0 : t.catch(console.warn).then(wo)) || wo())
    }
    async function wo() {
      const a = {}
      let e = 0
      E($a, fo, xo, a), (fo = {})
      for (let t = 0, n = I.entries(a); t < n.length; t++) {
        const [a, o] = n[t]
        for (let t = 0, n = I.entries(o); t < n.length; t++) {
          const [o, i] = n[t]
          Ya(i) || (fe(+a, "UpdatedValues", i, Vn(o)), ++e % 20 || (await Me()))
        }
      }
      po = null
    }
    function xo([a, e]) {
      const t = I.entries(e)
      E($a, go[a], ([e, n]) => {
        if (e < 0) return
        const o = Aa(this, e)
        E($a, n, ([e, n]) => {
          const i = Aa(Aa(o, e), a)
          t.forEach(([a, e]) => {
            e !== n[a] && (e ? (n[a] = e) : delete n[a], (i[a] = e))
          })
        })
      })
    }
    Le({
      async GetValueStore(a, { tab: e }) {
        const t = Aa(Aa(go, a), e.id)
        return t[0] || (t[0] = await ot[at].getOne(a))
      },
      SetValueStores(a) {
        const e = {}
        E($a, a, ([a, t = {}]) => {
          var n
          ;(a = null == (n = ni({ id: +a, uri: a })) ? void 0 : n.props.id) && ((e[et + a] = t), (fo[a] = t))
        }),
          vo(e, _o)
      },
    }),
      Ae({
        UpdateValue(a, e) {
          const t = {}
          for (const n in a) {
            const o = za(go, [n, e.tab.id, Bn(e)])
            if (!o) return
            const i = Aa(fo, n),
              s = a[n]
            for (const a in s) {
              const e = s[a]
              e ? (o[a] = e) : delete o[a], (i[a] = e || null)
            }
            t[n] = o
          }
          vo(t)
        },
      })
    let zo,
      jo = {},
      So = {},
      qo = 0
    const $o = {},
      Io = xt({ lifetime: 36e5 }),
      Mo = xt({ lifetime: 864e5 }),
      Co = ot.api,
      { hook: Uo, fire: Do } = ge(),
      Ro = Uo,
      To = Io.has,
      _o = (ot.api = {
        async get(a) {
          var e
          const t = {}
          if (
            (Lo(!0),
            !(a =
              null == (e = a)
                ? void 0
                : e.filter((a) => {
                    const e = Io.get(a),
                      n = void 0 !== e
                    return n && (t[a] = Ca(e)), !n && 0 !== Mo.get(a)
                  })) || a.length)
          ) {
            var n
            let e
            a || (e = 5e3),
              E($a, await Co.get(a), ([a, n]) => {
                ;(t[a] = n), Mo.put(a, 1), Io.put(a, Ca(n), e), Zo(a, n)
              }),
              null == (n = a) || n.forEach((a) => Mo.put(a, +L(t, a)))
          }
          return Lo(!1), t
        },
        async set(a, e) {
          const t = {},
            n = []
          Lo(!0),
            E($a, a, ([a, o]) => {
              const i = Da(o, Io.get(a))
              if (void 0 !== i) {
                if ((Io.put(a, i), Mo.put(a, 1), n.push(a), zo)) return void (t[a] = o)
                !e && a.startsWith(et)
                  ? (jo[a] = i)
                  : ((t[a] = o), Zo(a, o) && o[na] && delete (t[a] = { ...o })[na], Eo(a, o))
              }
            }),
            Lo(!1),
            Ya(t) || (await Co.set(t)),
            zo || (n.length && Do(n, a), Po())
        },
        async remove(a) {
          const e = a.filter((a) => {
            let e = 0 !== Mo.get(a)
            if (e) {
              if ((Io.del(a), Mo.put(a, 0), zo)) return e
              ot[at].toId(a) ? ((jo[a] = null), (e = !1)) : (Zo(a), Eo(a))
            }
            return e
          })
          e.length && (await Co.remove(e)), zo || (a.length && Do(a), Po())
        },
      })
    function Ao(a, e, t = !0) {
      t && !So && (So = {}),
        E($a, e, ([e, n]) => {
          const { prefix: o } = ot[e]
          for (let e = 0, i = Xa(n); e < i.length; e++) {
            const n = o + i[e],
              s = So[n] || (t && (So[n] = [])),
              r = s ? s.indexOf(a) : -1
            r >= 0 && !t ? (s.splice(r, 1), s.length || delete So[n]) : r < 0 && t && s.push(a)
          }
        }),
        Ya(So) && (So = null)
    }
    function Lo(a) {
      Io.batch(a), Mo.batch(a)
    }
    async function Eo(a, e) {
      const t = Jo.exec(a)
      t && t[0] !== Qe && 2 === (Bo[a] = _a(e)) && t[0] === et && (Bo[a] = 0)
    }
    async function Oo() {
      const a = I.keys(jo),
        e = [],
        t = jo
      ;(jo = {}),
        (qo = 0),
        a.forEach((a) => {
          const n = t[a]
          n || (delete t[a], e.push(a)), Eo(a, n)
        }),
        Ya(t) || (await Co.set(t)),
        e.length && (await Co.remove(e)),
        So && setTimeout(Ho, 0, t, e)
    }
    function Po() {
      qo || Ya(jo) || (qo = setTimeout(Oo, Math.min(1e3, 100 * Math.max(1, _a(jo) / 1e6))))
    }
    function Ho(a, e) {
      const t = new Map()
      let n, o
      for (const i in So)
        if ((n = a[i]) || e.includes(i))
          for (let a = 0, e = So[i]; a < e.length; a++) {
            const s = e[a]
            ;(o = t.get(s)) || t.set(s, (o = {})), (o[i] = { newValue: n })
          }
      t.forEach((a, e) => e(a))
    }
    async function No(a) {
      let e, t
      a.onDisconnect.addListener(() => {
        le(), (e = !0)
      }),
        a.onMessage.addListener(async () => {
          var e
          jo = {}
          const n = await _o.get(),
            o = I.keys(n).filter((a) => !(a in t)),
            i = Math.max(50, Math.min(500, (null == (e = R.getEntries()[0]) ? void 0 : e.duration) || 200))
          ;(zo = !0),
            o.length && (await _o.remove(o)),
            await _o.set(t),
            a.postMessage(!0),
            await pe("Reload", i),
            location.reload()
        }),
        (t = await Co.get()),
        e || a.postMessage(!0)
    }
    ;(e[ca] = (a) => {
      const e = R.now()
      return ($o[e] = a), e
    }),
      browser.runtime.onConnect.addListener((a) => {
        if ("undoImport" === a.name) return No(a)
        if (!a.name.startsWith(ca)) return
        const { id: e, cfg: t, tabId: n } = JSON.parse(a.name.slice(12)),
          o = e ? $o[e] : a.postMessage.bind(a)
        Ao(o, t),
          a.onDisconnect.addListener(() => {
            ko(n), Ao(o, t, !1), delete $o[e]
          })
      })
    let Fo = 0,
      Wo = 0,
      Bo = {}
    const Vo = {},
      Go = [],
      Ko = [],
      Jo = RegExp(`^(${Ke}|${Qe}|${et}|${Xe}|${Ve}${Je})`)
    function Yo(a) {
      return +a || 0
    }
    function Xo(a) {
      return null == a ? void 0 : a.props.id
    }
    function Zo(a, e) {
      const t = +ot[Ze].toId(a)
      if (t) {
        if (e) {
          const a = Vo[t],
            n = Go.indexOf(a),
            o = Ko.indexOf(a)
          n >= 0 && (Go[n] = e), o >= 0 && (Ko[o] = e), (Vo[t] = e)
        } else delete Vo[t]
        return !0
      }
    }
    async function Qo() {
      const a = Go.reduce((a, e, t) => {
        const { props: n } = e,
          o = t + 1
        return n.position !== o && ((n.position = o), ((a || (a = {}))[n.id] = e)), a
      }, null)
      return (Wo = Go.length), a && (await ot[Ze].set(a), vt("lastModified", Date.now())), !!a
    }
    async function ai() {
      Go.sort((a, e) => Yo(a.props.position) - Yo(e.props.position))
      const a = await Qo()
      return pe("ScriptsUpdated", null), a
    }
    function ei(a) {
      return Vo[a]
    }
    function ti(a) {
      var e
      return null != (e = null == a ? void 0 : a.map(ei)) ? e : [...Go, ...Ko]
    }
    function ni({ id: a, uri: e, meta: t, removed: n }) {
      let o
      return (
        a
          ? (o = ei(a))
          : (e || (e = co({ meta: t, props: { id: "@@should-have-name" } })),
            (o = (n ? Ko : Go).find(({ props: a }) => e === a.uri))),
        o
      )
    }
    function oi() {
      return [...Go]
    }
    Ae({
      GetScriptVer(a) {
        const e = ni(a)
        return e ? e.meta.version : null
      },
    }),
      Le({
        CheckPosition: ai,
        CheckRemove: ji,
        RemoveScripts: zi,
        GetData: bi,
        GetMoreIds: ({ url: a, [v]: e, [r]: t }) => gi(a, e, null, t),
        GetScript: ni,
        GetSizes: vi,
        async ExportZip({ values: a }) {
          const e = oi(),
            t = e.map(Xo),
            n = await ot[Ge].getMulti(t)
          return {
            items: e.map((a) => ({ script: a, code: n[a.props.id] })),
            values: a ? await ot[at].getMulti(t) : void 0,
          }
        },
        GetScriptCode: (a) => ot[Ge][Array.isArray(a) ? "getMulti" : "getOne"](a),
        async MarkRemoved({ id: a, removed: e }) {
          if (!e && ni({ meta: ei(a).meta })) throw La("msgNamespaceConflictRestore")
          await qi(a, { config: { removed: e ? 1 : 0 }, props: { lastModified: Date.now() } })
          const t = e ? Go : Ko,
            n = t.findIndex((e) => e.props.id === a),
            [o] = t.splice(n, 1)
          ;(e ? Ko : Go).push(o)
        },
        Move({ id: a, offset: e }) {
          const t = ei(a),
            n = Go.indexOf(t)
          return Go.splice(n, 1), Go.splice(n + e, 0, t), Qo()
        },
        ParseMeta: $i,
        ParseScript: Ii,
        UpdateScriptInfo: ({ id: a, config: e, custom: t }) =>
          qi(a, { config: e, custom: t, props: { lastModified: Date.now() } }),
        Vacuum: Ti,
      }),
      (async () => {
        const a = await ot.base.getOne("version"),
          e = "2.19.4"
        a ||
          (await new M((a, e) => {
            const n = { origInclude: !0, origExclude: !0, origMatch: !0, origExcludeMatch: !0 }
            function o(t) {
              const n = t.transaction([h, Ye, Be, g]),
                o = {}
              let s = 3
              const r = () => {
                  ;(s -= 1), s || a(ot.base.set(o))
                },
                l = (a, t) => {
                  const o = n.objectStore(a).getAll()
                  ;(o.onsuccess = () => t(o.result)), (o.onerror = e)
                }
              l(h, (a) => {
                const e = {}
                a.forEach((a) => {
                  const { code: t, id: n, uri: s } = a
                  ;(o[ot[Ze].toKey(n)] = i(a)), (o[ot[Ge].toKey(n)] = t), (e[s] = n)
                }),
                  l(g, (a) => {
                    a.forEach(({ uri: a, [g]: t }) => {
                      const n = e[a]
                      n && (o[ot[at].toKey(n)] = t)
                    }),
                      r()
                  })
              }),
                l(Be, (a) => {
                  a.forEach(({ uri: a, data: e }) => {
                    o[ot[Be].toKey(a)] = e
                  }),
                    r()
                }),
                l(Ye, (a) => {
                  a.forEach(({ uri: a, code: e }) => {
                    o[ot[Ye].toKey(a)] = e
                  }),
                    r()
                })
            }
            function i(a) {
              return {
                meta: ro(a.code),
                custom: I.assign({}, n, a.custom),
                props: { id: a.id, uri: a.uri, position: a.position },
                config: { enabled: a.enabled, shouldUpdate: a.update },
              }
            }
            console.info("Upgrade database..."),
              (() => {
                const a = indexedDB.open(t, 1)
                ;(a.onsuccess = () => {
                  try {
                    o(a.result)
                  } catch (a) {
                    e(a)
                  }
                }),
                  (a.onerror = e),
                  (a.onupgradeneeded = () => {
                    e()
                  })
              })()
          }).catch(() => {})),
          e !== a && ot.base.set({ version: e })
        const o = await ot.base.getMulti(),
          i = {},
          s = { origInclude: !0, origExclude: !0, origMatch: !0, origExcludeMatch: !0 }
        E($a, o, ([a, e]) => {
          const t = +ot[Ze].toId(a)
          if (t && e) {
            const a = co(e)
            if (!e.config.removed) {
              if (Vo[t] && Vo[t] !== e) return
              if (i[a]) return
              i[a] = e
            }
            ;(e.props = { ...e.props, id: t, uri: a }),
              (e.custom = I.assign({}, s, e.custom)),
              (Fo = Math.max(Fo, t)),
              (Wo = Math.max(Wo, Yo(e.props.position))),
              (e.config.removed ? Ko : Go).push(e)
            const { meta: n = (e.meta = {}) } = e
            n.require || (n.require = []),
              n.resources || (n.resources = {}),
              ya in n && (n[ya] = !0),
              (n.grant = [...new Set(n.grant || [])])
          }
        }),
          pt(o),
          e !== a && P && yt("defaultInjectInto") === d && Ka(a, "2.12.7") <= 0 && vt("defaultInjectInto", n),
          ai(),
          Ti(o),
          ji(),
          setInterval(ji, da),
          Ee()
      })()
    const ii = "cacheKeys",
      si = "reqKeys",
      ri = "valueIds",
      li = "promise",
      ci = () => ({ depsMap: {}, [m]: {}, [h]: [] }),
      ui = /^GM[_.](listValues|([gs]et|delete)Values?)$/,
      di = { [Be]: ii, [Ge]: r, [Ye]: si, [at]: ri },
      mi = I.entries(di),
      hi = new Set()
    function gi(a, e, t, n) {
      if (Un(a)) return
      const o = {},
        i = !t
      let s,
        l,
        c = i || !P,
        d = i
      xn(t || !0)
      for (let t = 0; t < Go.length; t++) {
        var g
        const i = Go[t],
          {
            config: { enabled: p },
            custom: f,
            meta: k,
            props: { id: b },
          } = i
        if ((n ? b in n : !p) || (!e && (null != (g = f.noframes) ? g : k.noframes)) || !jn(a, i)) continue
        if (n) {
          o[b] = p ? u : 0
          continue
        }
        if (((o[b] = 1), !s)) {
          ;(s = ci()), (l = ci())
          for (let a = 0; a < mi.length; a++) {
            const [e, t] = mi[a]
            ;(s[e] = {}), (l[e] = {}), (s[t] = []), (l[t] = [])
          }
        }
        const { pathMap: y = Mi(i) } = f,
          v = ze(i),
          w = "start" === v || "body" === v ? s : l,
          { depsMap: x } = w
        if ((w[r].push(b), (w[m][b] = v), k.grant.some(ui.test, ui) && w[ri].push(b), !c || !d))
          for (let a = 0, e = k.grant; a < e.length; a++) {
            const t = e[a]
            c || ("GM_setClipboard" !== t && "GM.setClipboard" !== t) || (c = s.clipFF = !0),
              d ||
                ("GM_xmlhttpRequest" !== t &&
                  "GM.xmlHttpRequest" !== t &&
                  "GM_download" !== t &&
                  "GM.download" !== t) ||
                (d = s.xhr = !0)
          }
        for (
          let a = 0,
            e = [
              [k.require, Ye, Wa],
              [I.values(k.resources), Be],
            ];
          a < e.length;
          a++
        ) {
          const [t, n, o] = e[a],
            i = di[n],
            r = n === Be ? s : w
          for (let a = 0; a < t.length; a++) {
            let e = t[a]
            ;(e = y[e] || e),
              e && (ee(e) ? o && (w[n][e] = o(e)) : r[i].includes(e) || (w[i].push(e), (x[e] || (x[e] = [])).push(b)))
          }
        }
        w[h].push(i)
      }
      return (
        xn(),
        n
          ? o
          : s
            ? i
              ? ((l[li] = pi(l)), l)
              : (s[r].length && (s[li] = pi(s)),
                l[r].length && (l[li] = Me().then(pi.bind(null, l))),
                I.assign(s, { allIds: o, [u]: l }))
            : void 0
      )
    }
    async function pi(a) {
      const e = []
      for (let t = 0; t < mi.length; t++) {
        const [n, o] = mi[t]
        for (let t = 0, i = a[o]; t < i.length; t++) {
          const a = i[t]
          e.push(ot[n].toKey(a))
        }
      }
      const t = await ot.base.getMulti(e),
        n = new Set()
      for (let e = 0; e < mi.length; e++) {
        const [i, s] = mi[e]
        for (let e = 0, r = a[s]; e < r.length; e++) {
          const s = r[e]
          let l = t[ot[i].toKey(s)]
          var o
          l || i !== at || (l = {}),
            (a[i][s] = l),
            null == l && (i === Ge ? n.add(s) : null == (o = a.depsMap[s]) || o.forEach((a) => n.add(a)))
        }
      }
      return n.size && fi(n), (a[li] = null), a
    }
    function fi(a) {
      const e = [],
        t = La("msgMissingResources")
      let n,
        o = La("msgReinstallScripts"),
        i = o
      a.forEach((a) => {
        ;(n = `\n#${a}: ${xe(ei(a))}`), (o += n), hi.has(a) || (hi.add(a), e.push(a), (i += n))
      }),
        console.error(`${t} ${o}`),
        e.length && ki(t, i, e)
    }
    function ki(a, e, t) {
      _e.Notification({
        title: a,
        text: e,
        onclick() {
          t.forEach((a) => _e.OpenEditor(a))
        },
      })
    }
    async function bi({ id: a, ids: e, sizes: t }) {
      a && (e = [a])
      const n = {},
        o = e ? ti(e).filter(q) : ti()
      return (
        o.forEach(ho),
        (n[h] = o),
        t && (n.sizes = vi(e)),
        a || (n.cache = await yi(o)),
        !a && t && (n.sync = _e.SyncGetStates()),
        n
      )
    }
    async function yi(a) {
      const e = [`${V}38.png`],
        t = [],
        n = {}
      for (let n = 0; n < a.length; n++) {
        let { custom: o, meta: i } = a[n],
          s = o.icon || i.icon
        te(s) && ((s = o.pathMap[s] || s), e.push(s), To(Ve + s) || t.push(s))
      }
      t.length && (await ot[Be].getMulti(t))
      for (let a, t, o = 0; o < e.length; o++) (t = e[o]), (a = Wi(t)), (!j(a) || (!o && (a = await a))) && (n[t] = a)
      return n
    }
    function vi(a) {
      const e = ti(a)
      return e.map(({ meta: a, custom: { pathMap: t = {} }, props: { id: n } }, o) => [
        Bo[Ke + n] || 0,
        _a(e[o]),
        Bo[et + n] || 0,
        a.require.reduce(wi, { len: 0, pathMap: t }).len,
        I.values(a.resources).reduce(xi, { len: 0, pathMap: t }).len,
      ])
    }
    function wi(a, e) {
      return (a.len += (Bo[Xe + (a.pathMap[e] || e)] || 0) + e.length), a
    }
    function xi(a, e) {
      return (a.len += (Bo[Ve + (a.pathMap[e] || e)] || 0) + e.length), a
    }
    async function zi(a) {
      const e = [],
        t =
          1 +
          Ko.reduce((t, n, o) => {
            const i = Xo(n)
            return a.includes(i) ? (e.push(Ke + i, Qe + i, et + i), delete Vo[i]) : ++t < o && (Ko[t] = n), t
          }, -1)
      if (Ko.length !== t) return (Ko.length = t), await ot.base.remove(e), pe("RemoveScripts", a)
    }
    function ji({ force: a } = {}) {
      const e = Date.now(),
        t = Ko.filter((t) => {
          const { lastModified: n } = t.props
          return t.config.removed && (a || e - Yo(n) > 6048e5)
        }).map((a) => a.props.id)
      return zi(t)
    }
    const Si = crypto.randomUUID
      ? crypto.randomUUID.bind(crypto)
      : () => {
          const a = new Uint16Array(8)
          return (
            e.crypto.getRandomValues(a),
            (a[3] = (4095 & a[3]) | 16384),
            (a[4] = (16383 & a[4]) | 32768),
            "01-2-3-4-567".replace(/\d/g, (e) => (a[e] + 65536).toString(16).slice(-4))
          )
        }
    async function qi(a, e) {
      const t = Vo[a]
      if (!t) throw null
      return (
        (t.props = { ...t.props, ...e.props }),
        (t.config = { ...t.config, ...e.config }),
        (t.custom = { ...t.custom, ...e.custom }),
        await ot[Ze].setOne(a, t),
        pe("UpdateScript", { where: { id: a }, update: t })
      )
    }
    function $i(a) {
      const e = j(a),
        t = (e && a.custom) || { origInclude: !0, origExclude: !0, origMatch: !0, origExcludeMatch: !0 },
        n = ro(e ? a.code : a),
        o = []
      return (
        n ? (xn(o), jn("", { meta: n, custom: t }), xn()) : o.push(La("labelNoName")),
        { meta: n, errors: o.length ? o : null }
      )
    }
    async function Ii(a) {
      var e
      const { meta: t, errors: n } = a.meta ? a : $i(a)
      if (!t.name) throw `${La("msgInvalidScript")}\n${La("labelNoName")}`
      const o = { message: null == a.message ? La("msgUpdated") : a.message || "" },
        i = { errors: n, update: o },
        { code: s } = a,
        r = Date.now()
      let l,
        { id: c } = a,
        u = ni({ id: c, meta: t })
      u
        ? ((l = u), (c = l.props.id))
        : (({ script: l } = lo()),
          Fo++,
          (c = l.props.id = Fo),
          (i.isNew = !0),
          (o.message = La("msgInstalled")),
          Go.push(l))
      const { config: d, props: m } = l,
        h = co({ meta: t, props: { id: c } })
      if (u) {
        if (a.isNew || (c && Go.some(({ props: a }) => h === a.uri && c !== a.id))) throw La("msgNamespaceConflict")
        delete l[na]
      }
      ;(m.lastModified = r), (m.uuid = m.uuid || Si())
      for (let e = 0, t = ["config", "custom", "props"]; e < t.length; e++) {
        const n = t[e],
          o = l[n]
        E($a, a[n], ([a, e]) => {
          null == e ? delete o[a] : (o[a] = e)
        })
      }
      const g = +a.position
      g ? ((m.position = g), (Wo = Math.max(Wo, g))) : u || (Wo++, (m.position = Wo)),
        (d.enabled = Yo(d.enabled)),
        (d.removed = 0),
        (d.shouldUpdate = Yo(d.shouldUpdate)),
        (l.meta = t),
        (m.uri = co(l)),
        !ve(l) && ne(a.from) && (l.custom.homepageURL = a.from),
        ne(a.url) && (l.custom.lastInstallURL = a.url),
        (l.custom.tags =
          null == (e = l.custom.tags) ? void 0 : e.split(/\s+/).map(se).filter(q).join(" ").toLowerCase()),
        a.update || ot.mod.remove(Se(l, { all: !0 }) || []),
        Mi(l, a.url)
      const p = Ci(l, a),
        f = !u || s !== (await ot[Ge].getOne(c))
      return (
        f && a.bumpDate && (m.lastUpdated = r),
        a.cache && (await p),
        await ot.base.set({ [Qe + c]: l, ...(f && { [Ke + c]: s }) }),
        I.assign(o, l, a.update),
        (i.where = { id: c }),
        (i[Ge] = a[Ge]),
        pe("UpdateScript", i),
        St.emit("scriptChanged", i),
        a.reloadTab && eo(l),
        i
      )
    }
    function Mi(a, e) {
      const { meta: t } = a,
        n = e || a.custom.lastInstallURL,
        o = n
          ? [...t.require, ...I.values(t.resources), t.icon].reduce((a, e) => {
              if (e) {
                const t = qe(e, n)
                t !== e && (a[e] = t)
              }
              return a
            }, {})
          : {}
      return (a.custom.pathMap = o), o
    }
    async function Ci(a, e, t) {
      const { custom: n, meta: o } = a,
        { pathMap: i } = n,
        s = async (a, n, o) => {
          var s
          if (!a || ee(a)) return
          a = i[a] || a
          const r = null == e || null == (s = e[n]) ? void 0 : s[a]
          if (null == r || (o && (null == e || !e.reuseDeps)))
            return !e || o || null == (await ot[n].getOne(a)) ? ot[n].fetch(a, t, o).catch((a) => a) : void 0
          ot[n].setOne(a, r)
        },
        r = n.icon || o.icon,
        l = await M.all([
          ...o.require.map((a) => s(a, Ye)),
          ...I.values(o.resources).map((a) => s(a, Be)),
          ne(r) && M.race([Me(1e3), s(r, Be, Ui)]),
        ])
      if (null == e || !e.ignoreDepsErrors) {
        const e = E(Ce, l.map(Di), "\n")
        if (e) {
          const t = La("msgErrorFetchingResource")
          return pe("UpdateScript", { update: { error: e, message: t }, where: { id: a.props.id } }), `${t}\n${e}`
        }
      }
    }
    function Ui(a, e, t) {
      return new M((n, o) => {
        const i = URL.createObjectURL(new Blob([e], { type: t })),
          s = (e) => {
            URL.revokeObjectURL(i), "load" === e.type ? n() : o(`IMAGE_ERROR: ${a}`)
          },
          r = new Image()
        ;(r.onload = s), (r.onerror = s), (r.src = i)
      })
    }
    function Di(a) {
      return (a && E(Ce, [a.status && `HTTP${a.status}`, a.url], " ")) || a
    }
    let Ri
    async function Ti(a) {
      if (Ri) return Ri
      let e
      Ri = new M((a) => {
        e = a
      })
      const t = a && [],
        n = {},
        o = {},
        i = [],
        s = [],
        r = {},
        l = RegExp(`^(${[et, Ve, Xe, Ke, Je].join("|")})`),
        c = [et, Je],
        u = {},
        d = (e, t, o, i) => {
          if (!t || (i && ee(t))) return 0
          const s = e + ((null == i ? void 0 : i[t]) || t),
            l = r[s]
          l < 0
            ? ((r[s] = 1),
              t !== o && (r[Je + t] = 1),
              e === et
                ? 2 === (n[s] = _a(a[s])) && ((n[s] = 0), (r[s] = -1))
                : e !== Je && (n[s] = _a(a[s]) + s.length))
            : l || c.includes(e) || (r[s] = 2 + o)
        }
      return (
        a || (a = await ot.base.getMulti()),
        E(Ia, a, (a) => {
          l.test(a) && (r[a] = -1)
        }),
        (Bo = n),
        ti().forEach((a) => {
          const { meta: e, props: t } = a,
            n = a.custom.icon || e.icon,
            { id: o } = t,
            i = a.custom.pathMap || Mi(a),
            s = Se(a, { all: !0 })
          s && (s.forEach((a) => d(Je, a, o)), (u[o] = s[0])),
            d(Ke, o, o),
            d(et, o, o),
            e.require.forEach((a) => d(Xe, a, o, i)),
            E(Ma, e.resources, (a) => d(Ve, a, o, i)),
            ne(n) && d(Ve, n, o, i)
        }),
        E($a, r, ([a, e]) => {
          if (e < 0) s.push(a)
          else if (e >= 2) {
            const n = ot.forKey(a),
              o = n.toId(a),
              r = n.name === Ge ? u[o] : o
            t
              ? t.push(r || (+o && je(ei(o))) || a)
              : r && n.fetch && (s.push(Je + r), i.push(n.fetch(r).catch((a) => `${xe(ei(+o || e - 2))}: ${Di(a)}`)))
          }
        }),
        s.length && (await ot.base.remove(s), (o.errors = (await M.all(i)).filter(q))),
        t && t.length && console.warn("Missing required resources. Try vacuuming database in options.", t),
        (Ri = null),
        (o.fixes = i.length + s.length),
        e(o),
        o
      )
    }
    const _i = {},
      Ai = (a) => "SetPopup" + a
    async function Li(a, e, t) {
      a[u] = !0
      const n = a[r],
        o = gi(e.url, e[v], null, n)
      if ((I.assign(n, o), I.assign(a, await bi({ [r]: I.keys(n) })), (a = [a, e]), !t)) return a
      ;(jt.get(t) || jt.put(t, {}))[e[Y]] = a
    }
    async function Ei(a, e) {
      return (
        (e[X] && (await fe(a, t, null, { [Y]: 0 }))) ||
        (await browser.tabs.executeScript(a, { code: "1", [m]: "document_start" }).catch(() => []))[0]
      )
    }
    function Oi({ name: a }) {
      delete _i[a], Pi(+a, !1)
    }
    function Pi(a, e) {
      Gi[a] && fe(a, "PopupShown", e)
    }
    Le({
      async InitPopup() {
        const a = (await Ie()) || {},
          { url: e = "", id: t } = a,
          n = _e.GetTabDomain(e),
          o = Gi[t] || {}
        let i = hs(e, o, ""),
          s = !P && !i[0] && void 0 === o[X],
          l = jt.pop(Ai(t))
        return (
          s && (l ? !l[0] : (l = {})) && (l[0] = await Li({ [r]: {}, menus: {} }, { tab: a, url: e, [Y]: 0, [v]: 1 })),
          i[0] ||
            null != o[X] ||
            ((await Ei(t, o))
              ? s && (s = l[0][0])[h].length && ((i = [La("failureReasonRestarted"), O]), (s[c] = "off"))
              : (i = hs(""))),
          (n.tab = a),
          [l, n, i]
        )
      },
    }),
      Ae({
        SetPopup(a, e) {
          const t = e.tab.id,
            n = Ai(t)
          _i[t] || Li(a, e, n)
        },
      }),
      browser.runtime.onConnect.addListener((a) => {
        const [e, t, n] = a.name.split(":")
        "Popup" === e && (t || Pi(+n, !0), (_i[n] = a), a.onDisconnect.addListener(Oi))
      }),
      browser.webRequest.onBeforeRequest.addListener(
        async () => {
          Pi((await Ie()).id, !0)
        },
        { urls: [D.runtime.getURL(W[K].default_popup)], types: ["main_frame"] }
      )
    const Hi = [16, 32],
      Ni = {},
      Fi = {},
      Wi = (a) => Ni[a] || (Ni[a] = ps(a)),
      Bi = (() => {
        const a = D.browserAction,
          e =
            (e) =>
            (...t) => {
              try {
                E(e, a, ...t, le)
              } catch (n) {
                E(e, a, ...t)
              }
            }
        return Sa(a, ["setIcon", "setBadgeText", "setBadgeBackgroundColor", "setTitle"], (a) => (a ? e(a) : Oa))
      })(),
      Vi = D.contextMenus,
      Gi = {},
      Ki = "showBadge",
      Ji = "badgeColor",
      Yi = "badgeColorBlocked",
      Xi = La("failureReasonBlacklisted"),
      Zi = W[K].default_title,
      Qi = W[K].default_icon[16].match(/\d+(\w*)\./)[1],
      as = La("menuScriptDisabled"),
      es = La("failureReasonNoninjectable"),
      ts = La("skipScriptsMsg")
    let ns, os, is, ss
    function rs(a, e) {
      var t
      const n = Aa(Gi, a)
      return (
        (n.icon = Qi),
        (n.total = 0),
        (n.unique = 0),
        (n[r] = new Set()),
        (n[Y] = void 0),
        (n[X] = e),
        e || null == (t = _i[a]) || t.postMessage(null),
        n
      )
    }
    function ls(a, e, { tab: t, [Y]: n, [v]: o }) {
      const i = t.id,
        s = a === x || "off" === a ? a : !!a,
        l = (!(e && o) && Gi[i]) || rs(i, s)
      if (Array.isArray(a)) {
        const { [r]: e, [Y]: t = (l[Y] = {}) } = l
        a.forEach(e.add, e), (l.unique = e.size), (l.total = 0), (t[n] = a.length)
        for (const a in t) l.total += t[a]
      }
      o && (l[X] = s), us(t, l), ds(t, l)
    }
    function cs({ id: a }, e = Gi[a]) {
      e && Bi.setBadgeText({ text: `${e[os] || ""}`, tabId: a })
    }
    function us({ id: a }, e = Gi[a]) {
      e && Bi.setBadgeBackgroundColor({ color: e[X] ? is : ss, tabId: a })
    }
    function ds(a, e, t) {
      const n = a.id
      e || (e = Gi[n] || rs(n)), t || ([t] = hs(Gn(a), e)), Bi.setTitle({ tabId: n, title: t }), ms(a, e), cs(a, e)
    }
    async function ms({ id: a } = {}, e = Gi[a] || {}) {
      const t = ns ? (!0 !== e[X] ? "b" : "") : "w"
      if (e.icon === t) return
      e.icon = t
      const n = {},
        o = {}
      for (let a = 0; a < Hi.length; a++) {
        const e = Hi[a],
          i = `${V}${e}${t}.png`
        ;(n[e] = i), (o[e] = Fi[i] || ((await (Ni[i] || (Ni[i] = ps(i)))) && Fi[i]))
      }
      Bi.setIcon({ tabId: a, path: n, imageData: o })
    }
    function hs(a, e, t = Zi) {
      return Zn.test(a)
        ? (a = Un(a))
          ? [Xi, "blacklisted", a]
          : ns && "off" !== (null == e ? void 0 : e[X])
            ? e
              ? e[X] === x
                ? [ts, x]
                : [t]
              : []
            : [as, O]
        : [es, c]
    }
    function gs(a, e) {
      if (a === x) _e[x](e)
      else if (a === G) ao(a)
      else if ("dashboard" === a) ao("")
      else if ("newScript" === a) _e.OpenEditor()
      else if ("updateScripts" === a) _e.CheckUpdate()
      else if ("updateScriptsInTab" === a) {
        var t
        ;(a = null == (t = Gi[e.id]) ? void 0 : t[r]) && _e.CheckUpdate([...a])
      } else a.startsWith(Ki) && vt(Ki, a.slice(10))
    }
    async function ps(a) {
      const e = new Image(),
        t = a.startsWith(V)
      let n
      ;(e.src = t
        ? a.slice(F.length)
        : a.startsWith("data:")
          ? a
          : Ue("i" === a[0] ? a : await ot.cache.getOne(a, !0))),
        await new M((a) => {
          ;(e.onload = a), (e.onerror = a)
        })
      let o = !t && 76,
        { width: i, height: s } = e
      if (!i || !s) return (Ni[a] = a), a
      o && (i > o || s > o) && ((o /= i > s ? i : s), (i = Math.round(i * o)), (s = Math.round(s * o)))
      const r = document.createElement("canvas"),
        l = r.getContext("2d")
      ;(r.width = i), (r.height = s), l.drawImage(e, 0, 0, i, s)
      try {
        ;(n = r.toDataURL()), t && (Fi[a] = l.getImageData(0, 0, i, s))
      } catch (e) {
        n = a
      }
      return (Ni[a] = n), n
    }
    function fs() {
      const a = {}
      return {
        on: (e, t) => {
          let n = a[e]
          n || ((n = []), (a[e] = n)), n.push(t)
        },
        off: (e, t) => {
          const n = a[e]
          if (n) {
            const a = n.indexOf(t)
            a >= 0 && n.splice(a, 1)
          }
        },
        fire: (e, t) => {
          const n = a[e]
          n &&
            n.forEach((a) => {
              a(t, e)
            })
        },
      }
    }
    Le({ GetImageData: Wi }),
      gt((a) => {
        let e
        const t = []
        null != (e = a[O]) && ((ns = e), ms(), t.push(ms)),
          null != (e = a[Ki]) && ((os = e), t.push(cs), null == Vi || Vi.update(Ki + ":" + os, { checked: !0 })),
          (((e = a[Ji]) && (is = e)) || ((e = a[Yi]) && (ss = e))) && t.push(us),
          ma in a && t.push(ds),
          t.length && Qn((a) => t.forEach((e) => e(a)))
      }),
      Oe.then(async () => {
        if (((ns = yt(O)), (os = yt(Ki)), (is = yt(Ji)), (ss = yt(Yi)), Qn(ds), ns || ms(), Vi)) {
          const a = (a, e, t) => new M((n) => Vi.create({ contexts: [K], id: a, title: e, ...t }, n)).then(le),
            e = { parentId: Ki, type: "radio" }
          await a(x, La("skipScripts"))
          for (
            let t = 0,
              n = [
                [Ki, La("labelBadge")],
                [`${Ki}:`, La("labelBadgeNone"), e],
                [`${Ki}:unique`, La("labelBadgeUnique"), e],
                [`${Ki}:total`, La("labelBadgeTotal"), e],
              ];
            t < n.length;
            t++
          ) {
            const e = n[t]
            await a(...e)
          }
          Vi.update(Ki + ":" + os, { checked: !0 }), P && (await a(G, La("labelSettings")))
        }
      }),
      null == Vi ||
        Vi.onClicked.addListener(({ menuItemId: a }, e) => {
          gs(a, e)
        }),
      Jn.addListener((a) => delete Gi[a]),
      Kn.addListener(
        (a, { url: e }, t) => {
          if (e) {
            const [n] = hs(e)
            n && ds(t, rs(a, null), n)
          }
        },
        On && { properties: ["status"] }
      )
    const ks = {
        update: Ii,
        list: async () => oi(),
        get: _e.GetScriptCode,
        remove: (a) => _e.MarkRemoved({ id: a, removed: !0 }),
      },
      bs = [],
      ys = [],
      vs = {},
      ws = Ea(Ns, 36e5)
    let xs,
      zs = M.resolve()
    function js({ name: a, uri: e }) {
      return a || `vm@2-${e}`
    }
    function Ss(a) {
      return /^vm(?:@\d+)?-/.test(a)
    }
    function qs(a) {
      const e = a.indexOf("-"),
        [, t] = a.slice(0, e).split("@")
      if ("2" === t) return a.slice(e + 1)
      try {
        return decodeURIComponent(a.slice(3))
      } catch (e) {
        return a.slice(3)
      }
    }
    function $s() {
      function a(a, e) {
        const t = xa(a)
        t.unshift("sync"), vt(t, e)
      }
      return (
        (() => {
          let e = yt("sync")
          ;(e && e.services) || ((e = { services: {} }), a([], e))
        })(),
        {
          get: (a, e) => {
            var t
            const n = xa(a)
            return n.unshift("sync"), null != (t = yt(n)) ? t : e
          },
          set: a,
        }
      )
    }
    function Is(a) {
      function e(e) {
        const t = xa(e)
        return t.unshift("services", a), t
      }
      return {
        get: (a, t) => xs.get(e(a), t),
        set: (a, t) => {
          j(a)
            ? E($a, a, ([a, t]) => {
                xs.set(e(a), t)
              })
            : xs.set(e(a), t)
        },
        clear: () => {
          xs.set(e(), {})
        },
      }
    }
    function Ms(a, e, t) {
      let n = e || a[0]
      function o() {
        return n
      }
      return {
        get: o,
        set: (e) => (a.includes(e) ? ((n = e), t && t()) : console.warn("Invalid state:", e), o()),
        is: (a) => Xa(a).includes(n),
      }
    }
    function Cs() {
      return bs.map((a) => {
        const e = vs[a]
        return {
          name: e.name,
          displayName: e.displayName,
          authState: e.authState.get(),
          syncState: e.syncState.get(),
          lastSync: e.config.get("meta", {}).lastSync,
          progress: e.progress,
          properties: e.properties,
          userConfig: e.getUserConfig(),
        }
      })
    }
    function Us(a, e, t) {
      let n
      return (
        2 === e
          ? (n = { version: e, custom: a.custom, config: a.config, props: Sa(a.props, ["lastUpdated"]) })
          : 1 === e &&
            (n = {
              version: e,
              more: {
                custom: a.custom,
                enabled: a.config.enabled,
                update: a.config.shouldUpdate,
                lastUpdated: a.props.lastUpdated,
              },
            }),
        I.assign(n, t)
      )
    }
    function Ds(a) {
      const e = {}
      try {
        const t = JSON.parse(a)
        ;(e.code = t.code),
          2 === t.version
            ? ((e.config = t.config), (e.custom = t.custom), (e.props = t.props))
            : 1 === t.version &&
              t.more &&
              ((e.custom = t.more.custom),
              (e.config = Rs({ enabled: t.more.enabled, shouldUpdate: t.more.update })),
              (e.props = Rs({ lastUpdated: t.more.lastUpdated })))
      } catch (t) {
        e.code = a
      }
      return e
    }
    function Rs(a) {
      return (
        Array.isArray(a)
          ? a.forEach(Rs)
          : j(a) &&
            E($a, a, ([e, t]) => {
              void 0 === t ? delete a[e] : Rs(t)
            }),
        a
      )
    }
    function Ts(a) {
      const e = function () {
        this.initialize()
      }
      return (e.prototype = a), (e.extend = _s), e
    }
    function _s(a) {
      return Ts(I.assign(I.create(this.prototype), a))
    }
    const As = Ea(() => {
        pe("UpdateSync", Cs())
      }),
      Ls = Ts({
        name: "base",
        displayName: "BaseService",
        delayTime: 1e3,
        urlPrefix: "",
        metaFile: t,
        properties: { authType: "oauth" },
        getUserConfig: Oa,
        setUserConfig: Oa,
        initialize() {
          ;(this.progress = { finished: 0, total: 0 }),
            (this.config = Is(this.name)),
            (this.authState = Ms(
              ["idle", "no-auth", "initializing", "authorizing", "authorized", "unauthorized", "error"],
              null,
              As
            )),
            (this.syncState = Ms(["idle", "ready", "syncing", "error"], null, As)),
            (this.lastFetch = M.resolve()),
            (this.startSync = this.syncFactory())
          const a = fs()
          ;["on", "off", "fire"].forEach((e) => {
            this[e] = (...t) => {
              a[e](...t)
            }
          })
        },
        log(...a) {
          console.log(...a)
        },
        syncFactory() {
          let a, e
          const t = () => this.authState.is("authorized") && Os() === this.name,
            n = () => {
              if (!t()) return M.resolve()
              this.log("Ready to sync:", this.displayName),
                this.syncState.set("ready"),
                (zs = zs
                  .then(
                    () =>
                      new M((a) => {
                        ;(e = Ea(a, 1e4)), e()
                      })
                  )
                  .then(() => {
                    if (t()) return this.sync()
                    this.syncState.set("idle")
                  })
                  .catch((a) => {
                    console.error(a)
                  })
                  .then(() => {
                    ;(a = null), (e = null)
                  })),
                (a = zs)
            }
          return () => (a || n(), e && e(), a)
        },
        prepareHeaders() {
          this.headers = {}
        },
        prepare(a) {
          return (
            this.authState.set("initializing"),
            M.resolve(a)
              .then(() => (this.initToken() ? this.user() : M.reject({ type: "no-auth" })))
              .then(
                () => {
                  this.authState.set("authorized")
                },
                (a) => {
                  throw (
                    (["no-auth", "unauthorized"].includes(null == a ? void 0 : a.type)
                      ? this.authState.set(a.type)
                      : (console.error(a), this.authState.set("error")),
                    this.syncState.set("idle"),
                    a)
                  )
                }
              )
          )
        },
        checkSync(a) {
          return this.prepare(a).then(() => this.startSync())
        },
        user: Oa,
        acquireLock: Oa,
        releaseLock: Oa,
        handleMetaError(a) {
          throw a
        },
        getMeta() {
          return this.get({ name: this.metaFile })
            .then((a) => JSON.parse(a))
            .catch((a) => this.handleMetaError(a))
            .then((a) => ({ name: this.metaFile, data: a }))
        },
        initToken() {
          this.prepareHeaders()
          const a = this.config.get("token")
          return (this.headers.Authorization = a ? `Bearer ${a}` : null), !!a
        },
        loadData(a) {
          const { progress: e } = this,
            { delay: t = this.delayTime } = a
          let n = M.resolve()
          return (
            t &&
              ((n = this.lastFetch.then((a) => Me(t - (Date.now() - a))).then(() => Date.now())), (this.lastFetch = n)),
            (e.total += 1),
            As(),
            n
              .then(() => {
                var e
                ;(a = I.assign({}, a)).headers = I.assign({}, this.headers, a.headers)
                let { url: t } = a
                return t.startsWith("/") && (t = (null != (e = a.prefix) ? e : this.urlPrefix) + t), ie(t, a)
              })
              .then(
                ({ data: a }) => ({ data: a }),
                (a) => ({ error: a })
              )
              .then(({ data: a, error: t }) => ((e.finished += 1), As(), t ? M.reject(t) : a))
          )
        },
        getLocalData: () => ks.list(),
        getSyncData() {
          return this.getMeta().then((a) => M.all([a, this.list(), this.getLocalData()]))
        },
        sync() {
          return (
            (this.progress = { finished: 0, total: 0 }),
            this.syncState.set("syncing"),
            this.prepare()
              .then(() => this.getSyncData())
              .then((a) => M.resolve(this.acquireLock()).then(() => a))
              .then(([a, e, t]) => {
                const n = a.data || {},
                  o = n.info || {},
                  i = n.timestamp || 0
                let s = !i || I.keys(o).length !== e.length
                const r = Date.now(),
                  l = yt("lastModified"),
                  c = {},
                  u = this.config.get("meta", {}),
                  d = !u.timestamp,
                  m = d || i > u.timestamp
                this.log("First sync:", d), this.log("Outdated:", m, "(", "local:", u.timestamp, "remote:", i, ")")
                const h = [],
                  g = [],
                  p = [],
                  f = [],
                  k = []
                ;(n.info = e.reduce((a, e) => {
                  c[e.uri] = e
                  let t = o[e.uri]
                  return t || ((t = {}), (s = !0)), (a[e.uri] = t), t.modified || ((t.modified = r), (s = !0)), a
                }, {})),
                  t.forEach((a) => {
                    const {
                        props: { uri: e, position: t, lastModified: o },
                      } = a,
                      r = n.info[e],
                      u = c[e]
                    r && u
                      ? (d || !o || r.modified > o
                          ? h.push({ local: a, remote: u, info: r })
                          : (r.modified < o && (g.push({ local: a, remote: u }), (r.modified = o), (s = !0)),
                            r.position !== t &&
                              (r.position && l <= i
                                ? k.push({ local: a, remote: u, info: r })
                                : ((r.position = t), (s = !0)))),
                        delete c[e])
                      : d || !m || o > i
                        ? g.push({ local: a })
                        : f.push({ local: a })
                  }),
                  E($a, c, ([a, e]) => {
                    const t = n.info[a]
                    m ? h.push({ remote: e, info: t }) : p.push({ remote: e })
                  })
                const b = [
                  ...h.map(
                    ({ remote: a, info: e }) => (
                      this.log("Download script:", a.uri),
                      this.get(a).then((a) => {
                        const t = Ds(a)
                        if (!t.code) return
                        e.modified && ja(t, "props.lastModified", e.modified)
                        const n = +e.position
                        return (
                          n && (t.position = n),
                          !yt("syncScriptStatus") && t.config && delete t.config.enabled,
                          ks.update(t)
                        )
                      })
                    )
                  ),
                  ...g.map(
                    ({ local: a, remote: e }) => (
                      this.log("Upload script:", a.props.uri),
                      ks.get(a.props.id).then((t) => {
                        const o = Us(a, 1, { code: t })
                        return (
                          (n.info[a.props.uri] = { modified: a.props.lastModified, position: a.props.position }),
                          (s = !0),
                          this.put(I.assign({}, e, { uri: a.props.uri, name: null }), JSON.stringify(o))
                        )
                      })
                    )
                  ),
                  ...p.map(
                    ({ remote: a }) => (
                      this.log("Remove remote script:", a.uri), delete n.info[a.uri], (s = !0), this.remove(a)
                    )
                  ),
                  ...f.map(({ local: a }) => (this.log("Remove local script:", a.props.uri), ks.remove(a.props.id))),
                  ...k.map(({ local: a, info: e }) => {
                    const t = {}
                    return e.position && (t.props = { position: e.position }), qi(a.props.id, t)
                  }),
                ]
                return (
                  b.push(
                    M.all(b)
                      .then(() => ai())
                      .then((a) => {
                        if (a)
                          return (
                            (s = !0),
                            ks.list().then((a) => {
                              a.forEach((a) => {
                                const e = n.info[a.props.uri]
                                e && (e.position = a.props.position)
                              })
                            })
                          )
                      })
                  ),
                  b.push(
                    M.all(b).then(() => {
                      const e = []
                      return (
                        s && ((n.timestamp = Date.now()), e.push(this.put(a, JSON.stringify(n)))),
                        (u.timestamp = n.timestamp),
                        (u.lastSync = Date.now()),
                        this.config.set("meta", u),
                        M.all(e)
                      )
                    })
                  ),
                  M.all(b.map((a) => a.then(Oa, (a) => a || !0)))
                    .then((a) => a.filter(q))
                    .then((a) => {
                      if (a.length) throw a
                    })
                )
              })
              .then(
                () => {
                  this.syncState.set("idle"), this.log("Sync finished:", this.displayName)
                },
                (a) => {
                  this.syncState.set("error"), this.log("Failed syncing:", this.displayName), this.log(a)
                }
              )
              .then(() => M.resolve(this.releaseLock()).catch(Oa))
          )
        },
      })
    function Es(a) {
      ys.push(a)
    }
    function Os() {
      return xs.get("current")
    }
    function Ps(a) {
      return vs[a || Os()]
    }
    function Hs(a) {
      if (!a.syncState.is(["ready", "syncing"]))
        return a.authState.is(["idle", "error"]) ? a.checkSync() : a.authState.is("authorized") ? a.startSync() : void 0
    }
    function Ns() {
      const a = Ps()
      return a && M.resolve(Hs(a)).then(ws)
    }
    let Fs
    async function Ws(a, e) {
      null == Fs || Fs()
      const t = (await browser.tabs.create({ url: a })).id,
        n = (a) => {
          var e, n
          if (null != (e = (n = Ps()).checkAuth) && e.call(n, a.url))
            return browser.tabs.remove(t), setTimeout(Fs, 0), { cancel: !0 }
        }
      ;(Fs = () => {
        browser.webRequest.onBeforeRequest.removeListener(n)
      }),
        (e = e.replace(/:\d+/, "")),
        browser.webRequest.onBeforeRequest.addListener(
          n,
          { urls: [`${e}*`], types: ["main_frame", "xmlhttprequest"] },
          ["blocking"]
        )
    }
    const Bs = { "+": "-", "/": "_" }
    async function Vs(a) {
      const e = new TextEncoder().encode(a),
        t = await crypto.subtle.digest("SHA-256", e)
      return btoa(Na(t)).replace(/[+/=]/g, (a) => Bs[a] || "")
    }
    function Gs() {
      return Pa(43, 128)
    }
    async function Ks(a) {
      return { code_challenge: await Vs(a), code_challenge_method: "S256" }
    }
    const Js = "f0q12zup2uys5w8",
      Ys = "https://violentmonkey.github.io/auth_dropbox.html",
      Xs = /[\u007f-\uffff]/g,
      Zs = (a) => `\\u${(a.charCodeAt(0) + 65536).toString(16).slice(1)}`
    function Qs(a) {
      return JSON.stringify(a).replace(Xs, Zs)
    }
    function ar(a) {
      return { name: a.name, size: a.size, uri: qs(a.name) }
    }
    Es(
      Ls.extend({
        name: "dropbox",
        displayName: "Dropbox",
        refreshToken() {
          const a = this.config.get("refresh_token")
          return this.authorized({ grant_type: "refresh_token", refresh_token: a }).then(() => this.prepare())
        },
        user() {
          const a = () =>
            this.loadData({ method: "POST", url: "https://api.dropboxapi.com/2/users/get_current_account" })
          return a()
            .catch((e) => {
              if (401 === e.status) return this.refreshToken().then(a)
              throw e
            })
            .catch((a) =>
              401 === a.status ? M.reject({ type: "unauthorized" }) : M.reject({ type: "error", data: a })
            )
        },
        handleMetaError(a) {
          if (409 !== a.status) throw a
        },
        list() {
          return this.loadData({
            method: "POST",
            url: "https://api.dropboxapi.com/2/files/list_folder",
            body: { path: "" },
            responseType: "json",
          }).then((a) => a.entries.filter((a) => "file" === a[".tag"] && Ss(a.name)).map(ar))
        },
        get(a) {
          const e = js(a)
          return this.loadData({
            method: "POST",
            url: "https://content.dropboxapi.com/2/files/download",
            headers: { "Dropbox-API-Arg": Qs({ path: `/${e}` }) },
          })
        },
        put(a, e) {
          const t = js(a)
          return this.loadData({
            method: "POST",
            url: "https://content.dropboxapi.com/2/files/upload",
            headers: {
              "Dropbox-API-Arg": Qs({ path: `/${t}`, mode: "overwrite" }),
              "Content-Type": "application/octet-stream",
            },
            body: e,
            responseType: "json",
          }).then(ar)
        },
        remove(a) {
          const e = js(a)
          return this.loadData({
            method: "POST",
            url: "https://api.dropboxapi.com/2/files/delete",
            body: { path: `/${e}` },
            responseType: "json",
          }).then(ar)
        },
        async authorize() {
          ;(this.session = { state: Ha(), codeVerifier: Gs() }),
            Ws(
              `https://www.dropbox.com/oauth2/authorize?${Te({ response_type: "code", token_access_type: "offline", client_id: Js, redirect_uri: Ys, state: this.session.state, ...(await Ks(this.session.codeVerifier)) })}`,
              Ys
            )
        },
        async authorized(a) {
          delete this.headers.Authorization, this.authState.set("authorizing")
          const e = await this.loadData({
            method: "POST",
            url: "https://api.dropbox.com/oauth2/token",
            headers: { "Content-Type": ta },
            body: Te({ client_id: Js, ...a }),
            responseType: "json",
          })
          if (!e.access_token) throw e
          this.config.set({
            uid: e.account_id,
            token: e.access_token,
            refresh_token: e.refresh_token || a.refresh_token,
          })
        },
        checkAuth(a) {
          const e = `${Ys}?`
          if (!a.startsWith(e)) return
          const t = Re(a.slice(e.length)),
            { state: n, codeVerifier: o } = this.session || {}
          return (
            (this.session = null),
            t.state === n && t.code
              ? (this.checkSync(
                  this.authorized({
                    code: t.code,
                    code_verifier: o,
                    grant_type: "authorization_code",
                    redirect_uri: Ys,
                  })
                ),
                !0)
              : void 0
          )
        },
        revoke() {
          return this.config.set({ uid: null, token: null, refresh_token: null }), this.prepare()
        },
      })
    )
    const er = "000000004418358A",
      tr = "https://violentmonkey.github.io/auth_onedrive.html"
    function nr(a) {
      return { name: a.name, size: a.size, uri: qs(a.name) }
    }
    Es(
      Ls.extend({
        name: "onedrive",
        displayName: "OneDrive",
        urlPrefix: "https://api.onedrive.com/v1.0",
        refreshToken() {
          const a = this.config.get("refresh_token")
          return this.authorized({ refresh_token: a, grant_type: "refresh_token" }).then(() => this.prepare())
        },
        user() {
          const a = () => this.loadData({ url: "/drive", responseType: "json" })
          return a()
            .catch((e) => {
              if (401 === e.status) return this.refreshToken().then(a)
              throw e
            })
            .catch((a) =>
              400 === a.status && "invalid_grant" === za(a, "data.error")
                ? M.reject({ type: "unauthorized" })
                : M.reject({ type: "error", data: a })
            )
        },
        handleMetaError(a) {
          if (404 === a.status) {
            var e
            const t = (null == (e = a.headers.get("WWW-Authenticate")) ? void 0 : e[0]) || ""
            return /^Bearer realm="OneDriveAPI"/.test(t) ? this.refreshToken().then(() => this.getMeta()) : void 0
          }
          throw a
        },
        list() {
          return this.loadData({ url: "/drive/special/approot/children", responseType: "json" }).then((a) =>
            a.value.filter((a) => a.file && Ss(a.name)).map(nr)
          )
        },
        get(a) {
          const e = js(a)
          return this.loadData({ url: `/drive/special/approot:/${encodeURIComponent(e)}`, responseType: "json" }).then(
            (a) => this.loadData({ url: a["@content.downloadUrl"], delay: !1 })
          )
        },
        put(a, e) {
          const t = js(a)
          return this.loadData({
            method: "PUT",
            url: `/drive/special/approot:/${encodeURIComponent(t)}:/content`,
            headers: { "Content-Type": "application/octet-stream" },
            body: e,
            responseType: "json",
          }).then(nr)
        },
        remove(a) {
          const e = js(a)
          return this.loadData({ method: "DELETE", url: `/drive/special/approot:/${encodeURIComponent(e)}` }).catch(Oa)
        },
        authorize() {
          Ws(
            `https://login.live.com/oauth20_authorize.srf?${Te({ client_id: er, scope: "onedrive.appfolder wl.offline_access", response_type: "code", redirect_uri: tr })}`,
            tr
          )
        },
        checkAuth(a) {
          const e = `${tr}?code=`
          if (a.startsWith(e))
            return this.authState.set("authorizing"), this.checkSync(this.authorized({ code: a.slice(e.length) })), !0
        },
        revoke() {
          return this.config.set({ uid: null, token: null, refresh_token: null }), this.prepare()
        },
        authorized(a) {
          return this.loadData({
            method: "POST",
            url: "https://login.live.com/oauth20_token.srf",
            prefix: "",
            headers: { "Content-Type": ta },
            body: Te(
              I.assign(
                {},
                {
                  client_id: er,
                  client_secret: "j9x3OVEtHvhiHKDWOGquyMfZKk96040H",
                  redirect_uri: tr,
                  grant_type: "authorization_code",
                },
                a
              )
            ),
            responseType: "json",
          }).then((a) => {
            if (!a.access_token) throw a
            this.config.set({ uid: a.user_id, token: a.access_token, refresh_token: a.refresh_token })
          })
        },
      })
    )
    const or = "590447512361-fa9j9vrskafqi75q2p2o2mkirdo9lavo.ap"+"ps.googleus"+"ercontent.com"/* apps.googleusercontent.com */,
      ir = "http://127.0.0.1:45678/",
      sr = "https://www.googleapis.com/auth/drive.appdata",
      rr = { status: "UNAUTHORIZED" },
      lr = Ls.extend({
        name: "googledrive",
        displayName: "Google Drive",
        urlPrefix: "https://www.googleapis.com/drive/v3",
        refreshToken() {
          const a = this.config.get("refresh_token")
          return a
            ? this.authorized({ refresh_token: a, grant_type: "refresh_token" }).then(() => this.prepare())
            : M.reject({ type: "unauthorized" })
        },
        user() {
          const a = () =>
            this.loadData({
              url: `https://www.googleapis.com/oauth2/v3/tokeninfo?${Te({ access_token: this.config.get("token") })}`,
              responseType: "json",
            })
          return a()
            .then((a) => {
              if (a.scope !== sr) return M.reject(rr)
            })
            .catch((e) =>
              e === rr || (400 === e.status && "Invalid Value" === za(e, "data.error_description"))
                ? this.refreshToken().then(a)
                : M.reject({ type: "error", data: e })
            )
        },
        getSyncData() {
          return this.loadData({
            url: `/files?${Te({ spaces: "appDataFolder", fields: "files(id,name,size)" })}`,
            responseType: "json",
          }).then(({ files: a }) => {
            let e
            const t = a
                .filter((a) => !!Ss(a.name) || (e || a.name !== this.metaFile ? this.remove(a) : (e = a), !1))
                .map(cr)
                .filter((a) => !!a.size || (this.remove(a), !1)),
              n = e ? cr(e) : {},
              o = this.get(n)
                .then((a) => JSON.parse(a))
                .catch((a) => this.handleMetaError(a))
                .then((a) => I.assign({}, n, { name: this.metaFile, uri: null, data: a }))
            return M.all([o, t, this.getLocalData()])
          })
        },
        async authorize() {
          this.session = { state: Ha(), codeVerifier: Gs() }
          const a = {
            response_type: "code",
            client_id: or,
            redirect_uri: ir,
            scope: sr,
            state: this.session.state,
            ...(await Ks(this.session.codeVerifier)),
          }
          this.config.get("refresh_token") || (a.prompt = "consent"),
            Ws(`https://accounts.google.com/o/oauth2/v2/auth?${Te(a)}`, ir)
        },
        checkAuth(a) {
          const e = `${ir}?`
          if (!a.startsWith(e)) return
          const t = Re(a.slice(e.length)),
            { state: n, codeVerifier: o } = this.session || {}
          return (
            (this.session = null),
            t.state === n && t.code
              ? (this.authState.set("authorizing"),
                this.checkSync(
                  this.authorized({
                    code: t.code,
                    code_verifier: o,
                    grant_type: "authorization_code",
                    redirect_uri: ir,
                  })
                ),
                !0)
              : void 0
          )
        },
        revoke() {
          return this.config.set({ token: null, refresh_token: null }), this.prepare()
        },
        authorized(a) {
          return this.loadData({
            method: "POST",
            url: "https://www.googleapis.com/oauth2/v4/token",
            prefix: "",
            headers: { "Content-Type": ta },
            body: Te(I.assign({}, { client_id: or, client_secret: "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" }, a)),
            responseType: "json",
          }).then((a) => {
            if (!a.access_token) throw a
            {
              const e = { token: a.access_token }
              a.refresh_token && (e.refresh_token = a.refresh_token), this.config.set(e)
            }
          })
        },
        handleMetaError: Oa,
        list() {
          throw new $("Not supported")
        },
        get({ id: a }) {
          return a ? this.loadData({ url: `/files/${a}?alt=media` }) : M.reject()
        },
        put(a, e) {
          const t = js(a),
            { id: n } = a,
            o = Ha("violentmonkey-is-great-"),
            i = { "Content-Type": `multipart/related; boundary=${o}` },
            s = n ? { name: t } : { name: t, parents: ["appDataFolder"] },
            r = [
              `--${o}`,
              "Content-Type: application/json; " + ea,
              "",
              JSON.stringify(s),
              `--${o}`,
              "Content-Type: text/plain",
              "",
              e,
              `--${o}--`,
              "",
            ].join("\r\n"),
            l = n
              ? `https://www.googleapis.com/upload/drive/v3/files/${n}?uploadType=multipart`
              : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
          return this.loadData({ url: l, body: r, headers: i, method: n ? "PATCH" : "POST" })
        },
        remove({ id: a }) {
          return this.loadData({ method: "DELETE", url: `/files/${a}` })
        },
      })
    function cr(a) {
      return { id: a.id, name: a.name, size: +a.size, uri: qs(a.name) }
    }
    Es(lr)
    const ur = Symbol("children")
    class dr {
      constructor(a, e) {
        ;(this.node = a), (this.nsMap = { ...e }), this.parseAttrs(), this.parseName()
      }
      static fromXML(a) {
        const e = new DOMParser().parseFromString(a, "application/xml")
        return new dr(e)
      }
      parseAttrs() {
        const { node: a, nsMap: e } = this,
          t = {},
          { attributes: n } = a
        if (n)
          for (let n = 0, o = a.attributes; n < o.length; n++) {
            const a = o[n],
              { name: i, value: s } = a
            "xmlns" === i ? (e.$ = s) : i.startsWith("xmlns:") && (e[i.slice(6)] = s), (t[i] = s)
          }
        this.attrs = t
      }
      parseName() {
        const { node: a, nsMap: e } = this
        if (1 === a.nodeType) {
          let t = a.tagName,
            n = e.$
          if (t.includes(":")) {
            let a
            if ((([a, t] = t.split(":")), (n = e[a]), !n)) throw new $(`Unknown namespace: ${a}`)
          }
          this.name = n + t
        }
      }
      text() {
        const { node: a } = this
        if (a) return (a.textContent || "").trim()
      }
      children() {
        if (!this[ur]) {
          const { node: a, nsMap: e } = this
          this[ur] = [...a.children].map((a) => new dr(a, e))
        }
        return this[ur]
      }
      map(a) {
        return this.children().map(a)
      }
      getCallback(a) {
        return "string" == typeof a ? ((e = a), (a) => a.name === e) : a
        var e
      }
      filter(a) {
        return this.children().filter(this.getCallback(a))
      }
      find(a) {
        return this.children().find(this.getCallback(a))
      }
      attr(a) {
        return this.attrs[a]
      }
    }
    const mr = { serverUrl: "", anonymous: !1, username: "", password: "" },
      hr = Ls.extend({
        name: "webdav",
        displayName: "WebDAV",
        properties: { authType: "password", serverUrl: null },
        getUserConfig() {
          return this.userConfig || (this.userConfig = { ...mr, ...this.config.get("userConfig") }), this.userConfig
        },
        setUserConfig(a) {
          I.assign(this.userConfig, a), this.config.set("userConfig", this.userConfig)
        },
        initToken() {
          var a
          this.prepareHeaders()
          const n = this.getUserConfig()
          let o = (null == (a = n.serverUrl) ? void 0 : a.trim()) || ""
          if ((o.includes("://") || (o = `http://${o}`), o.endsWith("/") || (o += "/"), !oe(o)))
            return (this.properties.serverUrl = null), !1
          this.properties.serverUrl = `${o}${t}/`
          const { anonymous: i, username: s, password: r } = n
          if (i) return !0
          if (!s || !r) return !1
          const l = e.btoa(`${s}:${r}`)
          return (this.headers.Authorization = `Basic ${l}`), !0
        },
        loadData(a) {
          return Ls.prototype.loadData.call(this, I.assign({ credentials: "omit" }, a))
        },
        handleMetaError(a) {
          if (![404, 409].includes(a.status)) throw a
        },
        list() {
          const { serverUrl: a } = this.properties,
            e = () => this.loadData({ method: "MKCOL", url: a }),
            t = () =>
              this.loadData({ method: "PROPFIND", url: a, headers: { depth: "1" } }).then((a) =>
                dr
                  .fromXML(a)
                  .children()[0]
                  .map((a) => {
                    const e = a.find("DAV:propstat").find("DAV:prop")
                    if ("file" == (e.find("DAV:resourcetype").find("DAV:collection") ? "directory" : "file")) {
                      let n
                      const o = e.find("DAV:displayname")
                      if (void 0 !== o) n = o.text()
                      else {
                        const e = a.find("DAV:href").text()
                        n = decodeURIComponent(e.substring(e.lastIndexOf("/") + 1))
                      }
                      if (Ss(n)) {
                        const a = e.find("DAV:getcontentlength")
                        return { name: (t = { name: n, size: a ? +a.text() : 0 }).name, size: t.size, uri: qs(t.name) }
                      }
                    }
                    var t
                    return null
                  })
                  .filter(q)
              )
          return t().catch((a) => {
            if (404 === a.status) return e().then(t)
            throw a
          })
        },
        get(a) {
          const e = js(a),
            { serverUrl: t } = this.properties
          return this.loadData({ url: t + e })
        },
        put(a, e) {
          const t = js(a),
            n = { "Content-Type": "text/plain" },
            o = this.config.get("lock")
          o && (n.If = `(<${o}>)`)
          const { serverUrl: i } = this.properties
          return this.loadData({ method: "PUT", url: i + t, body: e, headers: n })
        },
        remove(a) {
          const e = js(a),
            t = {},
            n = this.config.get("lock")
          n && (t.If = `(<${n}>)`)
          const { serverUrl: o } = this.properties
          return this.loadData({ method: "DELETE", url: o + e, headers: t })
        },
      })
    Es(hr)
    const gr = new RegExp(`^(?:${[Qe, Ke].join("|")})`)
    let pr
    function fr({ keys: a }) {
      for (let e = 0; e < a.length; e++) {
        const t = a[e]
        if (gr.test(t)) {
          Ns()
          break
        }
      }
    }
    bt((a, e) => {
      ;("sync.current" in a || e) &&
        (xs ||
          ((xs = $s()),
          ys.forEach((a) => {
            const e = new a(),
              { name: t } = e
            bs.push(t), (vs[t] = e)
          })),
        Ns() ? pr || (pr = Ro(fr)) : pr && (pr(), (pr = null)))
    }),
      Le({
        SyncAuthorize: () => {
          const a = Ps()
          a && a.authorize()
        },
        SyncGetStates: Cs,
        SyncRevoke: () => {
          const a = Ps()
          a && a.revoke()
        },
        SyncSetConfig: (a) => {
          const e = Ps()
          if (e) return e.setUserConfig(a), e.checkSync()
        },
        SyncStart: Ns,
      })
    const kr = document.createElement("textarea")
    let br
    Ae({
      SetClipboard(a) {
        ;(br = a), kr.focus(), document.execCommand("copy", !1, null)
      },
    }),
      document.body.appendChild(kr),
      C("copy", (a) => {
        a.preventDefault()
        const { type: e, data: t } = br
        a.clipboardData.setData(e || "text/plain", t)
      })
    const yr = {},
      vr = "zombie",
      wr = "zombieTimeout",
      xr = "zombieUrl"
    function zr(a, e) {
      const t = yr[a]
      t &&
        (z(t)
          ? e && t()
          : t > 0
            ? e && Sr(t)
            : t[vr]
              ? e && (_e.TabOpen({ url: t[xr] }, t), qr(a))
              : fe(t.tab.id, e ? "NotificationClick" : "NotificationClose", a, { [Y]: t[Y] }))
    }
    function jr(a, e, t) {
      for (const n in yr) {
        const o = yr[n]
        !j(o) ||
          o.tab.id !== a ||
          (e && o[Y] !== e) ||
          o[vr] ||
          (o[wr] ? ((o[vr] = setTimeout(qr, o[wr], n)), o[xr] || (yr[n] = o[vr]), t && (o._removed = !0)) : qr(n))
      }
    }
    function Sr(a) {
      a > 0 && clearTimeout(a)
    }
    function qr(a) {
      return delete yr[a], browser.notifications.clear(a)
    }
    Ae({
      async Notification({ image: a, text: e, tag: t, title: n, silent: o, onclick: i, [xr]: s, [wr]: r }, l) {
        t && Sr(yr[t])
        const c = await browser.notifications.create(t, {
          type: "basic",
          title: E(Ce, [n, P && La("extName")], " - "),
          message: e,
          iconUrl: a || ue,
          ...(!P && { requireInteraction: !!i }),
          ...(En >= 70 && { silent: o }),
        })
        return z(i) ? (yr[c] = i) : l && ((yr[c] = l), +r > 0 && (l[wr] = +r), null != s && (l[xr] = qe(s, l.url))), c
      },
      RemoveNotification(a) {
        Sr(yr[a]), qr(a)
      },
    }),
      browser.notifications.onClicked.addListener((a) => {
        zr(a, !0)
      }),
      browser.notifications.onClosed.addListener((a) => {
        zr(a, !1), delete yr[a]
      })
    let $r,
      Ir = M.resolve()
    function Mr(a, e, t) {
      if (!t) return void (Ir = Ir.then(() => (Mr(a, e, !0), Me(150))))
      const n = j(a) ? URL.createObjectURL(a) : a,
        o = document.createElement("a")
      ;(o.href = n), (o.download = e || ""), o.click(), j(a) && Me(3e3).then(() => URL.revokeObjectURL(n))
    }
    Ae({
      DownloadBlob(a) {
        Mr(...a)
      },
    })
    const Cr = Ha("VM-Verify"),
      Ur = { __proto__: null },
      Dr = { __proto__: null },
      Rr =
        /^(proxy-|sec-)|^(accept-(charset|encoding)|access-control-request-(headers|method)|connection|content-length|cookie2?|date|dnt|expect|host|keep-alive|origin|referer|te|trailer|transfer-encoding|upgrade|via)$/i,
      Tr = { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
      _r = [browser.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS].filter(q),
      Ar = {},
      Lr = (a) => a.name === Cr,
      Er = "cookie",
      Or = "set-cookie",
      Pr = /^\s*(?:__(Secure|Host)-)?([^=\s]+)\s*=\s*(")?([!#-+\--:<-[\]-~]*)\3(.*)/,
      Hr = /\s*;?\s*(\w+)(?:=(")?([!#-+\--:<-[\]-~]*)\2)?/y,
      Nr = { strict: "strict", lax: "lax", none: "no_restriction" },
      Fr = "requestHeaders",
      Wr = {
        onBeforeSendHeaders: [
          ({ [Fr]: a, requestId: e, url: t }) => {
            var n
            const o = Dr[e] || (null == (n = a.find(Lr)) ? void 0 : n.value),
              i = Ur[o]
            if (i) {
              ;(Dr[e] = o), (i.coreId = e), (i.url = t)
              const n = {},
                s = Ar[o],
                r = s && {}
              let l,
                c = !s
              for (let e = 0; e < a.length; e++) {
                const t = a[e]
                ;(l = t.name) === Cr ||
                  ("origin" === (l = l.toLowerCase()) && t.value === F) ||
                  (l === Er && !i[Er]) ||
                  (!c && l === Er && (c = s[l]) ? (r[l] = { name: l, value: t.value + "; " + c.value }) : (n[l] = t))
              }
              return { [Fr]: I.values(I.assign(n, s, r)) }
            }
          },
          Fr,
          "blocking",
          ..._r,
        ],
        onHeadersReceived: [
          ({ [f]: a, requestId: e, url: t }) => {
            const n = Ur[Dr[e]]
            if (n) {
              n[f] = a.map(Vr).join("")
              const { storeId: e } = n
              if (!n[Or] || e)
                return (
                  (a = a.filter((a) => {
                    if (a.name.toLowerCase() !== Or) return !0
                    e && Gr(a.value, e, t)
                  })),
                  { [f]: a }
                )
            }
          },
          f,
          "blocking",
          ..._r,
        ],
      }
    function Br(a, e) {
      e
        ? (Ya(Ar) &&
            E($a, Wr, ([a, [e, ...t]]) => {
              browser.webRequest[a].addListener(e, Tr, t)
            }),
          (Ar[a] = e))
        : a in Ar &&
          (delete Ar[a],
          Ya(Ar) &&
            E($a, Wr, ([a, [e]]) => {
              browser.webRequest[a].removeListener(e)
            }))
    }
    function Vr({ name: a, value: e, binaryValue: t }) {
      return `${Kr(a)}: ${t ? Na(t) : Kr(e)}\r\n`
    }
    function Gr(a, e, t) {
      let n = Pr.exec(a)
      if (n) {
        var o
        const [, a, i, , s, r] = n,
          l = {},
          c = "Host" === a
        for (Hr.lastIndex = 0; (n = Hr.exec(r)); ) l[n[1].toLowerCase()] = n[3]
        const u = null == (o = l.sameSite) ? void 0 : o.toLowerCase()
        browser.cookies.set({
          url: t,
          name: i,
          value: s,
          domain: c ? void 0 : l.domain,
          expirationDate: Math.max(0, +new Date(1e3 * l["max-age"] || l.expires)) || void 0,
          httpOnly: "httponly" in l,
          path: c ? "/" : l.path,
          sameSite: Nr[u],
          secure: t.startsWith("https:") && (!!a || "none" === u || "secure" in l),
          storeId: e,
        })
      }
    }
    function Kr(a) {
      return /[\u0080-\uFFFF]/.test(a) ? ($r || ($r = new TextEncoder()), Na($r.encode(a))) : a
    }
    En >= 74 && En <= 91 && browser.webRequest.onBeforeSendHeaders.addListener(Oa, Tr, _r),
      Ae({
        HttpRequest(a, e) {
          const t = e.tab.id,
            n = Bn(e),
            { id: o, events: i } = a,
            s = (Ur[o] = { id: o, tabId: t, [Y]: n, frame: Vn(n), xhr: new XMLHttpRequest() }),
            r = (a) => Ur[o] && fe(t, "HttpRequested", a, s.frame)
          return ll(a, i, e, r).catch(
            i.includes("error") && ((a) => r({ id: o, error: a.message, data: null, type: "error" }))
          )
        },
        AbortRequest(a) {
          const e = Ur[a]
          e && (e.xhr.abort(), cl(e))
        },
        RevokeBlob(a) {
          const e = jt.pop(`xhrBlob:${a}`)
          e && (clearTimeout(e), URL.revokeObjectURL(a))
        },
      })
    const Jr = 1e6,
      Yr = P ? 256e6 : 1e7,
      Xr = 6e4,
      Zr = ["readyState", "status", "statusText"],
      Qr = ["lengthComputable", "loaded", "total"],
      al = (a) => `"${a.replace(/[\\"]/g, "\\$&")}"`,
      el = "sec-ch-ua",
      tl = {
        __proto__: null,
        "user-agent": (a) => a,
        [el]: (a) => a.map((a) => `${al(a.brand)};v="${a.version}"`).join(", "),
        [el + "-mobile"]: (a) => "?" + (a ? 1 : 0),
        [el + "-platform"]: al,
      },
      nl = I.keys(tl)
    function ol(a, e, t) {
      return Fa(a, e * t, t)
    }
    function il(a) {
      const e = URL.createObjectURL(a)
      return jt.put(`xhrBlob:${e}`, setTimeout(URL.revokeObjectURL, Xr, e), Xr), e
    }
    function sl(a, e, t) {
      return a.substr(e * t, t)
    }
    function rl(a, e, t, n, o) {
      let i,
        s,
        r,
        l,
        c,
        u,
        d,
        m,
        h = M.resolve(),
        g = 0,
        k = null,
        b = !0,
        y = 0
      const { id: v, xhr: w } = a,
        x = [],
        z = async () => {
          const h = x.shift(),
            { type: z } = h,
            j = e.includes(z),
            q = "loadend" === z,
            $ = 4 === w.readyState || (d = !1)
          if (!j && !q) return
          if ($ && "readystatechange" === z) {
            if (d) return
            d = !0
          }
          i || (i = w.getResponseHeader("Content-Type") || ""),
            k !== w[p] &&
              ((k = c = w[p]),
              (b = !1),
              c &&
                ((m = c.length - y)
                  ? ((n = m > Yr), (r = Yr), (s = m), (l = sl), (c = y ? c.slice(y) : c), (y += s))
                  : ((r = Jr), (s = c.size), (l = t ? il : ol)),
                (g = n ? Math.ceil(s / r) || 1 : t ? 1 : 0))),
            c && q && a[S] && Mr(c, a[S])
          const I = j && (!o || $) && !b
          if (I) {
            b = !0
            for (let e = 1; e < g; e += 1) await a.cb({ id: v, i: e, chunk: e * r, data: await l(c, e, r), size: s })
          }
          await a.cb({
            blobbed: t,
            chunked: n,
            contentType: i,
            id: v,
            type: z,
            data: j
              ? {
                  finalUrl: a.url || w.responseURL,
                  ...Sa(w, Zr),
                  ...Sa(h, Qr),
                  [p]: I ? (g ? await l(c, 0, r) : c) : null,
                  [f]: u !== (m = a[f] || w.getAllResponseHeaders()) ? (u = m) : null,
                }
              : null,
          }),
            q && cl(a)
        }
      return (a) => {
        x.push(a), (h = h.then(z))
      }
    }
    async function ll(a, e, t, n) {
      const { tab: o } = t,
        { incognito: i } = o,
        { anonymous: s, id: r, overrideMimeType: l, [w]: c } = a,
        u = qe(a.url, t.url),
        d = Ur[r]
      if (!d || d.cb) return
      ;(d.cb = n), (d[S] = a[S])
      const { xhr: m } = d,
        h = {},
        g = c && !P,
        p = g && i,
        f = g && !i,
        [k, y] = ml(a.data),
        v = !s && (i || P),
        x = []
      if (
        ((d[Er] = !s && !v),
        (d[Or] = !s),
        m.open(a.method || "GET", u, !0, a.user || "", a.password || ""),
        m.setRequestHeader(Cr, r),
        y && m.setRequestHeader("Content-Type", y),
        E($a, a.headers, ([a, e]) => {
          const t = a.toLowerCase(),
            n = nl.indexOf(t)
          ;(n >= 0 && (x[n] = !0)) || Rr.test(a) ? hl(h, a, e, t) : m.setRequestHeader(a, e)
        }),
        a.ua.forEach((a, e) => {
          if (!x[e] && !Ua(a, e ? _n[ba[e]] : Tn)) {
            const t = nl[e]
            hl(h, t, tl[t](a), t)
          }
        }),
        (m[b] = (g ? "blob" : c) || "text"),
        (m.timeout = Math.max(0, Math.min(2147483647, a.timeout)) || 0),
        l && m.overrideMimeType(l),
        v)
      ) {
        for (let a = 0, e = await browser.cookies.getAllCookieStores(); a < e.length; a++) {
          const t = e[a]
          if (t.tabIds.includes(o.id)) {
            ;(P ? t.id.endsWith("-default") : "0" === t.id) || (d.storeId = t.id)
            break
          }
        }
        const a = Date.now() / 1e3,
          e = (
            await browser.cookies.getAll({ url: u, storeId: d.storeId, ...(On >= 59 && { firstPartyDomain: null }) })
          ).filter((e) => e.session || e.expirationDate > a)
        e.length && hl(h, Er, e.map((a) => `${a.name}=${a.value};`).join(" "))
      }
      Br(r, h)
      const z = rl(d, e, f, p, "json" === a[b])
      e.forEach((a) => {
        m[`on${a}`] = z
      }),
        (m.onloadend = z),
        m.send(k)
    }
    function cl({ id: a, coreId: e }) {
      delete Dr[e], delete Ur[a], Br(a, !1)
    }
    function ul(a, e) {
      E(Ma, Ur, (t) => {
        ;(null != a && t.tabId !== a) || (e && t[Y] !== e) || _e.AbortRequest(t.id)
      })
    }
    function dl(a, e) {
      const t = Vn(0)
      E(Ma, Ur, (n) => {
        n.tabId === a && n[Y] === e && ((n[Y] = 0), (n.frame = t))
      })
    }
    function ml([a, e, t]) {
      if ("fd" === e) {
        const t = new FormData()
        a.forEach((a) => t.set(...a)), (a = t), (e = "")
      } else if ("usp" === e) e = ta + ";" + ea
      else if (null != e) {
        const n = Ba(atob(a.slice(a.indexOf(",") + 1)))
        t ||
          (e = a
            .match(/^data:(.+?);base64/)[1]
            .replace(/(boundary=)[^;]+/, (a, e) => e + String.fromCharCode(...n.slice(2, n.indexOf(13))))),
          (a = n)
      }
      return [a, e]
    }
    function hl(a, e, t, n = e) {
      a[n] = { name: e, value: t }
    }
    let gl,
      pl,
      fl,
      kl = !1,
      bl = P
    const yl = Ha(),
      vl = browser.webRequest.onHeadersReceived,
      wl = { urls: ["*://*/*"], types: ["main_frame", "sub_frame"] },
      xl = ["blocking", f, browser.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS].filter(q),
      zl = (a) => "content-security-policy" === a.name.toLowerCase(),
      jl = /(?:^|[;,])\s*(?:script-src(-elem)?|(d)efault-src)(\s+[^;,]+)/g,
      Sl = /'nonce-([-+/=\w]+)'/,
      ql = "'unsafe-inline'",
      $l = { [X]: {}, [ii]: [] },
      Il = { ...$l, [X]: { [i]: !0, [y]: yl } },
      Ml = "csReg",
      Cl = browser.contentScripts,
      Ul = xt({
        lifetime: 3e5,
        onDispose(a) {
          var e
          null == (e = a[Ml]) || e.then((a) => a.unregister()), Ul.del(a[u])
        },
      }),
      Dl = "{GM,GM_info,unsafeWindow,cloneInto,createObjectIn,exportFunction}",
      Rl = ["description", "name", "namespace", [m], "version"],
      Tl = [[oa, "homepage"]],
      _l = /^(?:(m|excludeM)atch|(ex|in)clude)$/,
      Al = (a, e) => a + (e ? "es" : "s"),
      Ll = (a) => a.replace(_l, Al),
      El = { [Ve]: ii, [Ke]: !0, [Xe]: si, [Qe]: !0, [et]: ri },
      Ol = {},
      Pl = `(${(a, e) => {
        a.vmResolve ? a.vmResolve(e) : (a.vmData = e)
      }})`,
      Hl = (a, e) => (e ? a : `-${a}`),
      Nl = (a) => (pa[a] ? a : pl || n),
      Fl = (a, e) => Nl(a[c] || e[c]),
      Wl = (a, e) => a === o || (a === n && e),
      Bl = (a) => "outermost_frame" === a.frameType || !a[Y],
      Vl = {},
      Gl = {
        [ma]: Ul.destroy,
        defaultInjectInto(a) {
          ;(a = Nl(a)),
            Ul.destroy(),
            pl && (a === o ? vl.removeListener(Xl) : gl && P && !kl && vl.addListener(Xl, wl, xl)),
            (pl = a)
        },
        xhrInject: (a) => {
          a && (a = pl !== o),
            kl !== a && ((kl = a), Ul.destroy(), vl.removeListener(Xl), a && vl.addListener(Xl, wl, xl))
        },
        [O]: (a) => {
          gl = a
          const e = (a ? "add" : "remove") + "Listener",
            t = a ? wl : void 0
          browser.webRequest.onSendHeaders[e](Yl, t),
            (!gl || (P && !kl && pl !== o)) && vl[e](Xl, t, t && xl),
            Jn[e](uc),
            browser.tabs.onReplaced[e](dc),
            a || (Ul.destroy(), mc(), Io.destroy(), Mo.destroy())
        },
        [i](a) {
          E($a, a, ([a, e]) => {
            Ol[decodeURIComponent(a)] = e
          })
        },
      }
    function Kl(a, e) {
      if (a[ii])
        for (let n = 0; n < this.length; n++) {
          var t
          const [o, i, s] = this[n]
          if (null != (t = a[El[o]]) && t.includes(+i || i)) {
            if (o === Xe) a.depsMap[i].forEach((a) => Ul.del(Qe + a))
            else if (o === et && (a[at] && (a[at][i] = s), Jl(a, +i, s), !a[Ml])) continue
            Ul.del(e)
          }
        }
    }
    function Jl(a, e, t) {
      for (let n = 0, o = (a[X] || a)[h]; n < o.length; n++) {
        const a = o[n]
        if (a.id === e) return (a[g] = t || (a[g] && {})), !0
      }
    }
    function Yl(a) {
      const { url: e, tabId: t } = a,
        n = Bl(a),
        o = Hl(e, n)
      Ul.has(o) || Vl[t] || Ql(o, e, n)
    }
    function Xl(a) {
      var e
      const t = Hl(a.url, Bl(a)),
        n = Ul.get(t)
      if (n && !n[s] && null != (e = n[X]) && e[h] && !Vl[a.tabId]) {
        const e = P && a.url.startsWith("https:") && lc(a, n),
          t = kl && Zl(a, n)
        return e ? e.then(t && (() => t)) : t
      }
    }
    function Zl({ [f]: a, [Y]: e, tabId: t }, n) {
      nc(n[X][h], n[s], t, e, n)
      const o = URL.createObjectURL(new Blob([JSON.stringify(n[X])]))
      return (
        a.push({ name: Or, value: `"**VMInitInjection**"=${o.split("/").pop()}; SameSite=Lax` }),
        setTimeout(URL.revokeObjectURL, 6e4, o),
        { [f]: a }
      )
    }
    function Ql(a, e, t) {
      const n = t && e.startsWith("https://") && Ol[e.split("/", 3)[2]],
        o = null != n ? Il : $l
      if (((Il[X][i] = n), !gl)) return o
      const s = [],
        r = gi(e, t, s)
      return r && (r[li] = ac(a, e, t, r, null != n ? { [i]: n } : {}, s)), Ul.put(a, r || o)
    }
    async function ac(a, e, t, n, o, i) {
      await n[li], Ul.batch(!0)
      const s = { [X]: o },
        { allIds: l, [u]: m } = n,
        g = m[r].length && Ha("more")
      return (
        I.assign(
          o,
          {
            [h]: ec(n),
            [c]: pl,
            [u]: g,
            [y]: yl,
            [r]: l,
            info: { ua: Ln },
            errors: i.filter((a) => l[a.split("#").pop()]).join("\n"),
          },
          Sa(n, [Be, "clipFF", "xhr"])
        ),
        E(Ma, El, (a) => {
          !0 !== a && (s[a] = n[a])
        }),
        (s[u] = m),
        fl && Cl && !kl && t && ((o[d] = n[d] || oc(m)), (s[Ml] = sc(o, e))),
        g && (Ul.put(g, m), (m[u] = a)),
        Ul.put(a, s),
        Ul.batch(!1),
        s
      )
    }
    function ec(a) {
      const e = a[h]
      for (let t, n, i, s = 0; s < e.length; s++)
        (t = e[s]),
          (i = t.id),
          t[ka] || ((i = t.props.id), (n = Qe + i), (t = Ul.get(n) || Ul.put(n, tc(t, a))), (e[s] = t)),
          t[c] !== o && (a[d] = !0),
          (t[g] = a[at][i] || null)
      return e
    }
    function tc(a, e) {
      const { custom: t, meta: n, props: o } = a,
        { id: i } = o,
        { [Ye]: s, [m]: r } = e,
        l = e[Ge][i],
        u = Ha(),
        d = Ha(),
        h = { data: u, win: d },
        g = xe(a),
        p = t.pathMap || {},
        f = !n[va],
        k = f && P,
        { grant: b, [ya]: y } = n,
        v = y ? "await(async" : "(",
        w = b.length,
        x = !w || (1 === w && "none" === b[0]),
        z = [],
        j = E(qa, n, null, Ll),
        S = sa.exec(l)
      let $, I, M
      for (let a = 0; a < Rl.length; a++) {
        const e = Rl[a]
        null == j[e] && (j[e] = "")
      }
      for (let a = 0; a < Tl.length; a++) {
        const [e, t] = Tl[a]
        !j[e] && (M = j[t]) && (j[e] = M)
      }
      f &&
        z.push(
          "window.",
          d,
          "=",
          k && y ? "async " : "",
          "function ",
          u,
          "(",
          x ? Dl : "GM",
          k ? `,${u}){try{` : "){",
          x ? "" : "with(this)with(c)delete c,",
          y ? (k ? v : "(async") : "(",
          "(define,module,exports)=>{"
        )
      for (let a = 0, e = n[Ye]; a < e.length; a++) {
        const t = e[a],
          n = s[p[t] || t]
        ;/\S/.test(n) && (z.push(n, la.test(n) ? ";" : "\n;"), ($ = !0))
      }
      return (
        $ && f && z.push(v, "()=>{"),
        (I = z.length),
        z.push(l),
        z.push(
          ...[
            la.test(l) ? "" : "\n",
            $ && f ? "})()" : "",
            k ? `})()}catch(e){${u}(e)}}` : f ? "})()}" : "",
            P ? ";0" : "",
            "\n//# sourceURL=",
            je(a, g),
          ].filter(q)
        ),
        {
          code: "",
          displayName: g,
          gmi: { scriptWillUpdate: !!a.config.shouldUpdate, uuid: o.uuid },
          id: i,
          key: h,
          meta: j,
          pathMap: p,
          [ka]: z,
          [c]: Fl(t, n),
          [ra]: ["", I, (M = S.index + S[1].length), M + S[2].length],
          [m]: r[i],
        }
      )
    }
    function nc(a, e, t, n, o) {
      let i, s
      const r = []
      for (let t = 0; t < a.length; t++) {
        const n = a[t],
          o = n[ra]
        if (Wl(n[c], e)) {
          if (!o[0]) {
            const [, a, e, t] = o
            o[0] = n[ka][a].slice(e, t)
          }
          ;(i = ""), r.push([n.id, n.key.data])
        } else (o[0] = ""), (i = e ? l : n[ka]), e || (s = !0)
        n.code = i
      }
      o && (o[X][d] = s || oc(o[u])), r[0] && setTimeout(ic, 0, r, t, n)
    }
    function oc(a, e) {
      return null == a ? void 0 : a[h].some(cc, e || null)
    }
    function ic(a, e, t) {
      for (let n = 0; n < a.length; n++) {
        const [o, i] = a[n],
          s = Ul.get(Qe + o)
        s &&
          s.key.data === i &&
          browser.tabs
            .executeScript(e, { code: s[ka].join(""), [m]: `document_${s[m]}`.replace("body", "start"), [Y]: t })
            .then(s.meta[va] && (() => fe(e, "Run", o, { [Y]: t })))
      }
    }
    function sc(a, e) {
      for (let e = 0, t = a[h]; e < t.length; e++) {
        const a = t[e]
        a.code = a[ka]
      }
      return Cl.register({
        js: [{ code: `${Pl}(this,${JSON.stringify(a)})` }],
        matches: e.split("#", 1),
        [m]: "document_start",
      })
    }
    function rc(a) {
      const e = a[Ml]
      if (e) return delete a[Ml], e.then((a) => a.unregister())
    }
    function lc(a, e) {
      const t = a[f].find(zl)
      if (!t) return
      let n,
        o,
        i,
        r,
        l = ""
      for (; (n = jl.exec(t.value)); ) l += n[2] ? (r = n[3]) : n[1] ? (i = n[3]) : (o = n[3])
      if (l) {
        if (((l = l.match(Sl)), l)) e[X].nonce = l[1]
        else {
          if (!((o && !o.includes(ql)) || (i && !i.includes(ql)) || (!o && !i && r && !r.includes(ql)))) return
          e[s] = e[X][s] = !0
        }
        return (n = rc(e)), n && !l ? M.all([n, (e[Ml] = sc(e[X], a.url))]) : void 0
      }
    }
    function cc(a) {
      return !Wl(a[c] || Fl(a.custom, a.meta), this)
    }
    function uc(a) {
      mc(a, 0, !0), delete Vl[a]
    }
    function dc(a, e) {
      uc(e)
    }
    function mc(a, e, t) {
      ul(a, e), ko(a, e), jr(a, e, t)
    }
    function hc(a) {
      ;(bl = !0), (a.vivExtData || a.extData) && (Ln.brand = Ln.browserBrand = "Vivaldi")
    }
    function gc(a, e) {
      setTimeout(fe, 0, a, "PopupShown", !0, Vn(e))
    }
    Cl &&
      (Gl.ffInject = (a) => {
        ;(fl = a),
          a
            ? kl || Ul.destroy()
            : Ul.some((a) => {
                rc(a)
              })
      }),
      Le({
        [x]: async (a) => {
          a || (a = await Ie())
          const e = a.id,
            t = Ul.get(Hl(a.url, !0)),
            n = t && rc(t)
          ;(Vl[e] = 1), n && (await n), mc(e), await browser.tabs.reload(e)
        },
      }),
      Ae({
        async GetInjected({ url: a, [s]: e, done: t }, n) {
          const { tab: o, [Y]: i, [v]: r } = n,
            l = Wn(r, n[J], i),
            u = o.id
          a || (a = n.url || o.url), bl || hc(o), mc(u, l)
          let d = Vl[u]
          if (d > 0) return r && (Vl[u] = -1), _i[u] && gc(u, l), { [c]: x }
          d && delete Vl[u]
          const m = Hl(a, r),
            g = Ul.get(m) || Ql(m, a, r),
            p = g[X] ? g : await g[li],
            f = p[X],
            k = f[h]
          return k && (nc(k, p[s] || e, u, i, p), bo(k, u, l)), _i[u] && gc(u, l), gl ? !t && f : { [c]: "off", ...f }
        },
        async InjectionFeedback({ [s]: a, [o]: e, [u]: t, url: n }, i) {
          const { tab: r, [Y]: l } = i,
            c = i[v],
            d = r.id
          if ((ic(e, d, l), !t)) return
          n || (n = i.url || r.url)
          const m = Ul.get(t) || Ul.put(t, gi(n, c)) || { [h]: [] },
            g = (m[li] ? await m[li] : m)[Be],
            p = ec(m)
          return nc(p, a, d, l), bo(p, d, Wn(c, i[J], l)), { [h]: p, [Be]: g }
        },
        Run({ [r]: a, reset: e }, t) {
          const {
              [J]: n,
              [v]: o,
              tab: { id: i },
            } = t,
            s = +(null == a ? void 0 : a[0])
          ls(a, e, t), 3 === o && (s && yo(a, n), dl(i, n), jr(i)), "bfcache" === e && s && bo(a, i, Wn(o, n, t[Y]))
        },
      }),
      bt(function a(e) {
        for (const a in Gl) a in e && Gl[a](e[a])
        for (const t in e) t.includes(".") && a(ja({}, t, e[t]))
      }),
      Ro((a, e) => {
        const t = []
        for (let n = 0; n < a.length; n++) {
          const o = a[n],
            i = o.indexOf(":") + 1,
            s = o.slice(0, i),
            r = o.slice(i)
          if (!0 === El[s]) return void Ul.destroy()
          let l, c
          s === et && ((c = null == e ? void 0 : e[o]), (l = Ul.get(Qe + r)) && (l[g] = c = Ca(c) || (l[g] && {}))),
            s && t.push([s, r, c])
        }
        t.length && Ul.some(Kl, t)
      })
    const pc = {},
      fc = { ...fa, headers: { Accept: "text/x-userscript-meta,*/*" } }
    async function kc(a, e, t) {
      const { id: n } = a.props
      let o, i, s, r
      try {
        const { update: s } = await Ii({ id: n, code: await bc(a, e, t), update: { checking: !1 }, bumpDate: !0 })
        ;(i = La("msgScriptUpdated", [xe(s)])), (r = { ...fa }), (o = !0)
      } catch (a) {
        ;(s = a.error), (r = !a.error && !a.checking && {})
      } finally {
        r && (I.assign(r, t), (s = await Ci(a, null, r))),
          yc(a) && (i || s) && (o = { script: a, text: E(Ce, [i, s], "\n"), err: !!s }),
          delete pc[n]
      }
      return o
    }
    async function bc(a, e, t) {
      let n
      const {
          meta: o,
          props: { id: i },
        } = a,
        [s, r] = e,
        l = {},
        c = { update: l, where: { id: i } }
      u(La("msgCheckingForUpdate"))
      try {
        const { data: a } = (await jc(r, { ...fc, ...t })) || {},
          { version: e, [ka]: i } = a ? ro(a, !0) : {}
        if (Ka(o.version, e) >= 0) u(La("msgNoUpdate"), { checking: !1 })
        else {
          if (s)
            return s === r && null != a && a.replace(sa, "").trim()
              ? (u(La("msgUpdated")), a)
              : (u(La("msgUpdating")),
                (n = La("msgErrorFetchingScript")),
                s === r && i.trim() !== a.trim() ? a : (await jc(s, { ...fa, ...t })).data)
          u(La("msgNewVersion"), { checking: !1 })
        }
      } catch (a) {
        u(n || La("msgErrorFetchingUpdateInfo"), { error: a })
      }
      throw l
      function u(a, { error: e, checking: t = !e } = {}) {
        I.assign(l, { message: a, checking: t, error: e ? `${La("genericError")} ${e.status}, ${e.url}` : null }),
          pe("UpdateScript", c)
      }
    }
    function yc(a) {
      var e
      const t = yt("notifyUpdates")
      return yt("notifyUpdatesGlobal") ? t : null != (e = a.config.notifyUpdates) ? e : t
    }
    function vc() {
      const a = wc()
      if (!a) return
      let e = Date.now() - yt("lastUpdate")
      e >= a && (setTimeout(_e.CheckUpdate, 2e4, n), (e = 0)),
        clearTimeout(vc.timer),
        (vc.timer = setTimeout(vc, Math.min(2147483647, a - e)))
    }
    function wc() {
      return (+yt("autoUpdate") || 0) * da
    }
    Oe.then(vc),
      gt((a) => "autoUpdate" in a && vc()),
      Le({
        async CheckUpdate(a) {
          const e = a === n,
            t = e || !a,
            o = t ? oi() : Xa(a).map(ei).filter(q),
            i = { all: !0, allowedOnly: t, enabledOnly: t && yt("updateEnabledScriptsOnly") },
            s = { [Z]: e ? n : t },
            r = o
              .map((a) => {
                const e = a.props.id,
                  t = Se(a, i)
                return t && (pc[e] || (pc[e] = kc(a, t, s)))
              })
              .filter(q),
            l = await M.all(r),
            c = l.filter((a) => (null == a ? void 0 : a.text))
          return (
            c.length &&
              ki(
                c.some((a) => a.err) ? La("msgOpenUpdateErrors") : P ? La("optionUpdate") : "",
                c.map((a) => `* ${a.text}\n`).join(""),
                c.map((a) => a.script.props.id)
              ),
            t && vt("lastUpdate", Date.now()),
            l.reduce((a, e) => a + (!0 === e), 0)
          )
        },
      })
    const xc = ((a, e, t, n, o) => {
      const i = {},
        s = {},
        r = new Set(),
        l = Math.max(t, n)
      let c, u
      return async (...n) => {
        let d, m
        const h = o(...n),
          g = i[h],
          p = (i[h] = new M((a) => {
            d = a
          }).catch(console.warn))
        for (g && (await g); r.size === e; ) await M.race(r)
        r.add(p),
          h === u ? ((m = s[h]), (m = l - (m ? R.now() - m : 0))) : c && (m = t - (R.now() - c)),
          m > 0 && (await Me(m))
        try {
          return (u = h), await a(...n)
        } finally {
          r.delete(p), i[h] === p && delete i[h], (c = s[h] = R.now()), d()
        }
      }
    })(ie, 4, 100, 1e3, (a) => a.split("/")[2])
    function zc(a = {}) {
      const e = {},
        { init: t, transform: n } = a
      return function (...a) {
        const [t] = a
        return e[t] || (e[t] = E(o, this, ...a))
      }
      async function o(...a) {
        const [o, i] = a
        try {
          const e = await jc(o, t ? t(i) : i)
          if (e) {
            const t = n ? await n(e, ...a) : e.data
            if ((await this.setOne(o, t), "res" === i)) return t
          }
        } finally {
          delete e[o]
        }
      }
    }
    async function jc(a, e) {
      if (ee(a)) return
      let t, o, i
      const s = !ne(a)
      if (
        (!s && e && (t = e[Z]) && j((o = await ot.mod.getOne(a))) && ([o, i] = o), !(t === n && i > Date.now() - wc()))
      )
        for (let n = 0, i = t ? [0, 1] : [1]; n < i.length; n++) {
          const t = i[n]
          if (o || t) {
            const n = await (s ? ie : xc)(a, t ? e : { ...e, ...fa, method: "HEAD" }),
              { headers: i } = n,
              r = i.get("etag") || +new Date(i.get("last-modified")) || +new Date(i.get("date"))
            if (r && r === o) return
            if (t) return r ? ot.mod.setOne(a, [r, Date.now()]) : o && ot.mod.remove(a), n
          }
        }
    }
    ;(ot.cache.fetch = zc({
      init: (a) => ({ ...a, [b]: "blob" }),
      async transform(a, e, t, n) {
        const [o, i] = await De(a, !0)
        return await (null == n ? void 0 : n(e, a.data, o)), `${o},${i}`
      },
    })),
      (ot.require.fetch = zc({
        transform: ({ data: a }, e) =>
          /^\s*</.test(a)
            ? M.reject(
                `NOT_JS: ${e} "${a
                  .slice(0, 100)
                  .trim()
                  .replace(/\s{2,}/g, " ")}"`
              )
            : a,
      })),
      (ot.code.fetch = zc())
    const Sc = `${N}confirm/index.html#`
    Ae({
      async CheckInstallerTab(a, e) {
        const t = P && (e.url || "").startsWith("file:") && (await browser.tabs.get(a).catch(Oa))
        return t && Gn(t).startsWith(Sc)
      },
      async ConfirmInstall({ code: a, from: e, url: t, fs: n }, { tab: o = {} }) {
        if (!n) {
          if ((a || (a = (await ie(t)).data), /^\s*</.test((i = a)) || i.indexOf("// ==UserScript==") < 0))
            throw `${La("msgInvalidScript")}\n\n${a
              .trim()
              .split(/[\r\n]+\s*/, 9)
              .join("\n")
              .slice(0, 500)}...`
          jt.put(t, a, 3e3)
        }
        var i
        const s = Ha(),
          { active: r, id: l, incognito: c } = o,
          u = (!c || P) && (t === e || jt.has(`autoclose:${l}`) || Fn.test(e))
        jt.put(`confirm-${s}`, { incognito: c, url: t, from: e, tabId: l, fs: n, ff: On })
        const d = Sc + s,
          { [Q]: m } = u
            ? await browser.tabs.update(l, { url: d })
            : await _e.TabOpen({ url: d, active: !!r }, { tab: o })
        r && m !== o[Q] && (await (null == ce ? void 0 : ce.update(m, { focused: !0 })))
      },
    })
    const qc =
        /^https:\/\/((greas|sleaz)yfork\.org\/scripts\/[^/]*\/code|openuserjs\.org\/install\/[^/]*|github\.com\/[^/]*\/[^/]*\/(raw\/[^/]*|releases\/download\/[^/]*)|raw\.githubusercontent\.com(\/[^/]*){3}|gist\.github\.com\/.*?)\/[^/]*?\.user\.js([?#]|$)/i,
      $c = /^https?:\/\/((gist\.)?github\.com|((greas|sleaz)yfork|openuserjs)\.org)\//i,
      Ic = (a) => `${B}${H}/${+a.split("#")[1]}`,
      Mc = P && new RegExp(`^(view-source:)?(${N.replace("://", "$&)?")}[^/]*\\.user\\.js#\\d+`),
      Cc =
        Mc &&
        ((a, e) => {
          Mc.test(e) && browser.tabs.update(a, { url: Ic(e) })
        })
    async function Uc(a, e) {
      const t = (a >= 0 && (await browser.tabs.get(a))) || {},
        { data: n } = (await ie(e).catch(Oa)) || {}
      n && ro(n).name
        ? _e.ConfirmInstall({ code: n, url: e, from: t.url }, { tab: t })
        : (jt.put(`bypass:${e}`, !0, 1e4), a >= 0 && browser.tabs.update(a, { url: e }))
    }
    var Dc
    function Rc({ cmd: a, data: e, url: t, [v]: n } = {}, o) {
      if (Oe) return Oe.then(Rc.bind(this, ...arguments))
      const i = L(_e, a) && _e[a]
      if (i) {
        if (o) {
          let e = o.origin
          if ((t && (o.url = t), (e = e ? e === F : `${t || o.url}`.startsWith(N)), !e && i.isOwn && !o.fake))
            throw new _(`Command is only allowed in extension context: ${a}`)
          if (!o.tab) {
            if (!e && (P ? !i.isOwn : !n)) return
            o.tab = !1
          }
          n && (o[v] = n)
        }
        return Tc(i, e, o)
      }
    }
    async function Tc(a, e, t) {
      try {
        return await a(e, t)
      } catch (a) {
        throw a instanceof _ ? a : new _(j(a) ? JSON.stringify(a) : a)
      }
    }
    Mc && Kn.addListener((a, { url: e }) => e && Cc(a, e), On && { properties: [On >= 88 ? "url" : "status"] }),
      browser.tabs.onCreated.addListener((a) => {
        const { id: e, title: t } = a,
          n = Gn(a),
          o = n.startsWith("file:"),
          i = /\.user\.js([?#]|$)/.test(n)
        i && (!o || On < 68) && jt.put(`autoclose:${e}`, !0, 1e4),
          Mc && "about:blank" === n && Cc(e, t),
          i && o && !Yn && !P && yt("helpForLocalFile") && _e.ConfirmInstall({ url: n, fs: !0 }, { tab: a })
      }),
      browser.webRequest.onBeforeRequest.addListener(
        (a) => {
          const { method: e, tabId: t, url: n } = a
          if ("GET" === e)
            return n.startsWith(N)
              ? { redirectUrl: Ic(n) }
              : jt.has(`bypass:${n}`) || ($c.test(n) && !qc.test(n))
                ? void 0
                : (Uc(t, n), P ? { cancel: !0 } : { redirectUrl: "javascript:void 0" })
        },
        {
          urls: ["*://*/*.user.js", "*://*/*.user.js?*", "file://*/*.user.js", "file://*/*.user.js?*", `${N}*.user.js`],
          types: ["main_frame"],
        },
        ["blocking"]
      ),
      Ae({ SetTimeout: (a) => a > 0 && Me(a) }),
      (a.handleCommandMessage = Rc),
      (a.deepCopy = Ca),
      browser.runtime.onMessage.addListener(Rc),
      null == (Dc = browser.commands) ||
        Dc.onCommand.addListener(async (a) => {
          gs(a, await Ie())
        })
  })()
}
