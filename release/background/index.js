{
  const e = this,
    { window: a } = e,
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
    z = (e) => "function" == typeof e,
    j = (e) => null != e && "object" == typeof e,
    S = "fileName",
    {
      Boolean: $,
      Error: q,
      Object: I,
      Promise: M,
      addEventListener: C,
      removeEventListener: U,
      chrome: D,
      performance: _,
    } = e,
    T = M,
    R = q,
    { apply: A } = Reflect,
    L = A.call.bind({}.hasOwnProperty),
    E = I.call.bind(I.call),
    O = "isApplied",
    P = "contextualIdentities" in D,
    N = "#" + h,
    H = D.runtime.getURL("/"),
    W = H.slice(0, -1),
    F = D.runtime.getManifest(),
    B = D.runtime.getURL(F.options_ui.page).split("#", 1)[0],
    V = D.runtime.getURL(F.icons[16].replace("16.png", "")),
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
    let { browser: ee } = e
    const ae = "addListener",
      te = "removeListener"
    if (P || (null != (U = ee) && U.runtime));
    else {
      const { Proxy: a } = e,
        { bind: t } = a,
        n = "message",
        o = "stack",
        i = (e) => e === ae || e === te || "hasListener" === e || "hasListeners" === e,
        s = (e, a, n, o) => {
          const s = n[a]
          if (void 0 === s) return
          let c
          return (
            (c = z(o)
              ? o(n, s)
              : z(s)
                ? 0 === o || i(a) || !L(n, a)
                  ? E(t, s, n)
                  : l(n, s)
                : j(s) && 0 !== o
                  ? r(s, o)
                  : s),
            (e[a] = c),
            c
          )
        },
        r = (e, t) =>
          new a(
            { __proto__: null },
            {
              __proto__: null,
              get: (a, n) => {
                var o
                return null != (o = a[n]) ? o : s(a, n, e, null == t ? void 0 : t[n])
              },
            }
          ),
        l =
          (e, a, t) =>
          (...i) => {
            let s, r
            const l = new T((e, a) => {
                ;(s = e), (r = a)
              }),
              c = new R(`callstack before invoking ${a.name || "chrome API"}:`)
            return (
              E(a, e, ...i, (e) => {
                const a = D.runtime.lastError,
                  i = a || (t ? t(s, e) : s(e))
                i && (a || (c[o] = `${i[1]}\n${c[o]}`), (c[n] = a ? i[n] : `${i[0]}`), (c.isRuntime = !!a), r(c))
              }),
              l
            )
          },
        c = (e, a) => [null != e ? e : null, a && (a[n] ? [a[n], a[o]] : [a, new R()[o]])],
        u = async (e, a) => {
          try {
            a(c(await e))
          } catch (e) {
            a(c(0, e))
          }
        },
        d = (e, a, t, n) => {
          try {
            const o = e(a, t)
            if (o && o instanceof M) return u(o, n), !0
            void 0 !== o && n(c(o))
          } catch (e) {
            n(c(0, e))
          }
        },
        m = (e, a) => (a ? a[1] : "null response") || e(a[0]),
        h = (e, a) => l(e, a, m)
      ee = e.browser = r(D, {
        extension: 0,
        i18n: 0,
        runtime: {
          connect: 0,
          getManifest: 0,
          getURL: 0,
          onMessage: { [ae]: (e, a) => (n) => E(a, e, E(t, d, null, n)) },
          sendMessage: h,
        },
        tabs: { connect: 0, sendMessage: h },
      })
    }
    function ne(e) {
      const a = this,
        t = (n) => {
          a[te](t), e(n)
        }
      a[ae](t)
    }
    const oe = "charset=UTF-8",
      ie = "application/x-www-form-urlencoded",
      se = "inferred",
      re = "homepageURL",
      le = "supportURL",
      ce = /((?:^|\n)(.*?)\/\/([\x20\t]*)==UserScript==)([\s\S]*?\n)((.*?)\/\/([\x20\t]*)==\/UserScript==)/,
      ue = "metaStr",
      de = /\n((?!\n)\s)*$/,
      me = "watchStorage",
      he = e.browser,
      ge = 864e5,
      pe = "blacklist",
      fe = pe + "Net",
      ke = /^document-(start|body|end|idle)$/,
      be = { [n]: 1, [d]: 1, [o]: 1 },
      ye = { cache: "no-cache" },
      ve = Symbol("code"),
      we = ["userAgent", "brands", "mobile", "platform"],
      xe = "topLevelAwait",
      ze = "unwrap",
      je = "fetchOpts",
      Se = "https://violentmonkey.github.io/",
      $e = "file://*/*"
    let qe
    function Ie(e) {
      return null == e ? [] : Array.isArray(e) ? e : `${e}`.split(".").filter($)
    }
    function Me(e, a) {
      for (let t = 0, n = Ie(a); t < n.length; t++) {
        const a = n[t]
        if (!e || "object" != typeof e) break
        e = e[a]
      }
      return e
    }
    function Ce(e, a, t, n) {
      a = Ie(a)
      let o,
        i = e || {}
      for (let e = 0; (o = a[e]), e < a.length - 1; e += 1) i = i[o] || (i[o] = {})
      return void 0 === t ? delete i[o] : (i[o] = t), n ? i : e
    }
    function Ue(e, a, t) {
      const n = {}
      for (let o = 0; o < a.length; o++) {
        const i = a[o]
        let s = null == e ? void 0 : e[i]
        t && (s = t(s, i)), void 0 !== s && (n[i] = s)
      }
      return n
    }
    function De(e, a, t) {
      const n = {}
      for (let o = 0, i = I.keys(this); o < i.length; o++) {
        let s = i[o]
        const r = this[s]
        ;(a && !(s = E(a, t, s, r, this))) || (n[s] = e ? E(e, t, r, s, this) : r)
      }
      return n
    }
    function _e(e, a) {
      this && I.entries(this).forEach(e, a)
    }
    function Te(e, a) {
      this && I.keys(this).forEach(e, a)
    }
    function Re(e, a) {
      this && I.values(this).forEach(e, a)
    }
    function Ae(e) {
      return e && "object" == typeof e ? (Array.isArray(e) ? [].concat(e).map(Ae) : E(De, e, Ae)) : e
    }
    function Le(e, a) {
      let t
      if (e && a && typeof e == typeof a && "object" == typeof e)
        if (Array.isArray(e)) t = e.length === a.length && e.every((e, t) => Le(e, a[t]))
        else {
          const n = I.keys(e)
          t = n.length === I.keys(a).length && n.every((t) => Le(e[t], a[t]))
        }
      else t = e === a
      return t
    }
    function Ee(e, a) {
      if (e !== a)
        return e && "object" == typeof e
          ? a && "object" == typeof a
            ? ((qe = !1), (e = (Array.isArray(e) ? Oe : Pe)(e, a)), qe ? e : void 0)
            : Ae(e)
          : e
    }
    function Oe(e, a) {
      const t = []
      e.length !== a.length && (qe = !0)
      for (let n, o, i = 0; i < e.length; i++)
        (n = e[i]),
          (o = a[i]),
          n && "object" == typeof n
            ? o && "object" == typeof o
              ? (n = (Array.isArray(n) ? Oe : Pe)(n, o))
              : ((n = Ae(n)), (qe = !0))
            : n !== o && (qe = !0),
          (t[i] = n)
      return t
    }
    function Pe(e, a) {
      const t = {}
      for (const t in a)
        if (!L(e, t)) {
          qe = !0
          break
        }
      for (const n in e) {
        let o = e[n],
          i = a[n]
        o && "object" == typeof o
          ? i && "object" == typeof i
            ? (o = (Array.isArray(o) ? Oe : Pe)(o, i))
            : ((o = Ae(o)), (qe = !0))
          : o !== i && (qe = !0),
          (t[n] = o)
      }
      return t
    }
    function Ne(e) {
      return void 0 === e
        ? 0
        : !0 === e || null == e
          ? 4
          : !1 === e
            ? 5
            : "string" == typeof e
              ? e.length + 2
              : "object" != typeof e
                ? `${e}`.length
                : Array.isArray(e)
                  ? e.reduce((e, a) => e + 1 + Ne(a), 2)
                  : I.keys(e).reduce((a, t) => a + t.length + 4 + Ne(e[t]), 2)
    }
    function He(e, a) {
      return e[a] || (e[a] = {})
    }
    const We = (function (e) {
      const a = I.create(null)
      return function (...t) {
        const n = 1 === t.length ? `${t[0]}` : JSON.stringify(t),
          o = a[n]
        return void 0 !== o || L(a, n) ? o : (a[n] = A(e, this, t))
      }
    })((e, a) => D.i18n.getMessage(e, a) || e)
    function Fe(e, a) {
      let t, n, o
      function i() {
        ;(n = null), _.now() >= t ? o() : s()
      }
      function s() {
        if (!n) {
          const e = t - _.now()
          n = setTimeout(i, e)
        }
      }
      return (
        (a = Math.max(0, +a || 0)),
        function (...n) {
          ;(t = _.now() + a),
            (o = () => {
              ;(o = null), e.apply(this, n)
            }),
            s()
        }
      )
    }
    function Be() {}
    function Ve(e = 10, a = 0) {
      for (let t = ""; (t += Math.random().toString(36).slice(2)); ) if (t.length >= e) return a ? t.slice(0, a) : t
    }
    function Ge(e = "VM") {
      return e + Ve()
    }
    function Ke(e, a = 0, t = 1e99) {
      const n = 8192,
        o = [],
        i = e.length,
        s = Math.min(i || e.byteLength, a + t),
        r = null == i || a || s > n
      for (; a < s; a += n) o.push(String.fromCharCode.apply(null, r ? new Uint8Array(e, a, Math.min(n, s - a)) : e))
      return o.join("")
    }
    function Je(e, a = 0, t = 1e99) {
      return (
        (a || t < e.size) && (e = e.slice(a, a + t)),
        e.size
          ? new M((a) => {
              const t = new FileReader()
              t.readAsDataURL(e),
                (t.onload = () => {
                  const e = t.result
                  a(e.slice(e.indexOf(",") + 1))
                })
            })
          : ""
      )
    }
    function Ye(e) {
      const a = e.indexOf(","),
        t = e.slice(0, a)
      return (
        (e = decodeURIComponent(e.slice(a + 1))),
        (e = /(^|;)\s*base64\s*(;|$)/.test(t) ? atob(e) : e),
        /[\x80-\xFF]/.test(e) ? new TextDecoder().decode(Xe(e)) : e
      )
    }
    function Xe(e) {
      const a = e.length,
        t = new Uint8Array(a)
      for (let n = 0; n < a; n += 1) t[n] = e.charCodeAt(n)
      return t
    }
    const Ze = /^(.*?)-([-.0-9a-z]+)|$/i,
      Qe = /^\d+$/
    function ea(e, a) {
      const [, t = e || "", n] = Ze.exec(e),
        [, o = a || "", i] = Ze.exec(a),
        s = aa(t, o) || !n - !i || (n && aa(n, i, !0))
      return s < 0 ? -1 : +!!s
    }
    function aa(e, a, t) {
      const n = e.split("."),
        o = a.split("."),
        i = n.length,
        s = o.length,
        r = (t ? Math.min : Math.max)(i, s)
      let l
      for (let e = 0; !l && e < r; e += 1) {
        const a = n[e],
          i = o[e]
        l = t
          ? Qe.test(a) && Qe.test(i)
            ? a - i
            : a > i || (a < i && -1)
          : (parseInt(a, 10) || 0) - (parseInt(i, 10) || 0)
      }
      return l || (t && i - s)
    }
    function ta(e) {
      for (const a in e) if (L(e, a)) return !1
      return !0
    }
    function na(e) {
      return Array.isArray(e) ? e : [e]
    }
    const oa = ["blob", "arraybuffer"]
    async function ia(e, a = {}) {
      return new M((t, n) => {
        const o = new XMLHttpRequest(),
          i = { headers: { get: (e) => o.getResponseHeader(e) }, url: e },
          { [b]: s } = a
        o.open("GET", e, !0),
          oa.includes(s) && (o[b] = s),
          (o.onload = () => {
            if (((i.status = o.status || 200), (i.data = o[oa.includes(s) ? p : k]), "json" === s))
              try {
                i.data = JSON.parse(i.data)
              } catch (e) {}
            t(i)
          }),
          (o.onerror = () => {
            ;(i.status = -1), n(i)
          }),
          o.send()
      })
    }
    const sa =
        /^(file:|about:|data:|https?:\/\/([^@/]*@)?(localhost|127\.0\.0\.1|(192\.168|172\.16|10\.0)\.\d+\.\d+|\[(::1|(fe80|fc00)::[.:0-9a-f]+)]|[^/:]+\.(test|example|invalid|localhost))(:\d+|\/|$))/i,
      ra =
        /^https:\/\/(cdn(js)?\.[^/]+|bundle\.run|(www\.)?gitcdn\.\w+|(ajax\.aspnetcdn|apis\.google|apps\.bdimg|caiyunapp|code\.(bdstatic|jquery)|kit\.fontawesome|lib\.baomitu|libs\.baidu|npm\.elemecdn|registry\.npmmirror|static\.(hdslb|yximgs)|uicdn\.toast|unpkg|www\.(gstatic|layuicdn)|\w+\.googleapis)\.com|(bowercdn|craig\.global\.ssl\.fastly)\.net|[^/.]+\.(github\.(io|com)|zstatic\.net))\//i,
      la = (e) => /^data:/i.test(e),
      ca = (e) => /^https?:\/\//i.test(e) && da(e),
      ua = (e) => e && !sa.test(decodeURI(e))
    function da(e) {
      try {
        if (e && new URL(e)) return e
      } catch (e) {}
    }
    async function ma(e, a = {}) {
      if (e.startsWith("file:")) return ia(e, a)
      const { body: t, headers: n, [b]: o } = a,
        i = t && "[object Object]" === E({}.toString, t),
        [, s, r, l, c] = e.match(/^([-\w]+:\/\/)([^@/]*@)?([^/]*)(.*)|$/),
        u = ("greasyfork.org" === l || "sleazyfork.org" === l) && "application/javascript, text/plain, text/css",
        d = I.assign({}, !ua(e) && ye, a, {
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
      let m = { url: e, status: -1 }
      try {
        const a = r ? s + l + c : e,
          t = await fetch(a, d),
          n = { arraybuffer: "arrayBuffer", blob: "blob", json: "json" }[o] || "text"
        ;(m.status = t.status || 200), (m.headers = t.headers), (m.data = await t[n]())
      } catch (a) {
        ;(m = I.assign(a, m)), (m.message += "\n" + e)
      }
      if (m.status < 0 || m.status > 300) throw m
      return m
    }
    function ha(e) {
      return e.replace(/[^\w.-]/g, "")
    }
    function ga(e) {
      return e.replace(/[\\.?+[\]{}()|^$]/g, "\\$&")
    }
    const pa = () => D.runtime.lastError,
      fa = he.windows,
      ka = `${V}128.png`,
      ba = /[#/?]/g,
      ya = (e) => String.fromCharCode(e.charCodeAt(0) - 32 + 65280),
      va = /(Receiving end does not exist)|The message port closed before|moved into back\/forward cache|$/
    function wa() {
      const e = new Set()
      return {
        hook: (a) => (e.add(a), () => e.delete(a)),
        fire(...a) {
          e.forEach((e) => e(...a))
        },
      }
    }
    function xa(e, a, t) {
      return P && j(a) && (a = Ae(a)), ja({ cmd: e, data: a }, t)
    }
    function za(e, a, t, n) {
      return he.tabs.sendMessage(e, { cmd: a, data: t }, n).catch($a)
    }
    function ja(e, { retry: a } = {}) {
      if (a) return Sa(e)
      let t = he.runtime.sendMessage(e)
      return (t = t.catch($a)), t
    }
    async function Sa(e, a = 1e4) {
      for (let n = _.now(); _.now() - n < a; ) {
        try {
          const a = await ja(e)
          if (void 0 !== a) return a
        } catch (e) {
          if (!va.exec(e)[1]) throw e
        }
        await he.storage.local.get(t)
      }
      throw new q(t + " cannot connect to the background page.")
    }
    function $a(e) {
      if (!va.exec(e)[0]) return M.reject(e)
    }
    function qa(e) {
      var a
      let t
      return (
        e.custom[re] ||
        (t = e.meta)[re] ||
        (null == (a = e[se]) ? void 0 : a[re]) ||
        t.homepage ||
        t.website ||
        t.source
      )
    }
    function Ia(e) {
      var a
      return e.meta[le] || (null == (a = e[se]) ? void 0 : a[le])
    }
    function Ma(e) {
      var a, t, n
      return (
        e.custom.name ||
        ((t = e.meta),
        (n = "name"),
        navigator.languages.map((e) => t[`${n}:${e}`] || t[`${n}:${e.toLowerCase()}`]).find($) || t[n] || "") ||
        `#${null != (a = e.props.id) ? a : We("labelNoName")}`
      )
    }
    function Ca(e) {
      var a
      return (null == (a = `${e.custom[m] || e.meta[m] || ""}`.match(ke)) ? void 0 : a[1]) || "end"
    }
    function Ua(e, a) {
      return `${H}${a && P ? "%20" : ""}${encodeURIComponent((a || Ma(e)).replace(ba, ya))}.user.js#${e.props.id}`
    }
    function Da(e, { all: a, allowedOnly: t, enabledOnly: n } = {}) {
      if ((!t || e.config.shouldUpdate) && (!n || e.config.enabled)) {
        const { custom: t, meta: n } = e,
          o = da(t.downloadURL || n.downloadURL || t.lastInstallURL),
          i = da(t.updateURL || n.updateURL || o),
          s = o || i
        if (s) return a ? [o, i] : s
      }
    }
    function _a(e, a) {
      let t
      try {
        t = new URL(e, a)
      } catch (a) {
        return `data:,${a.message} ${e}`
      }
      return t.href
    }
    function Ta(e) {
      return e.replace(/[-\\/:*?"<>|%\s]/g, (e) => {
        let a = e.charCodeAt(0).toString(16)
        return a.length < 2 && (a = `0${a}`), `-${a}`
      })
    }
    async function Ra(e = -2) {
      return (
        (await he.tabs.query({ active: !0, [Q]: e }))[0] ||
        (fa && (await he.tabs.query({ active: !0, [Q]: (await fa.getCurrent()).id }))[0])
      )
    }
    function Aa(e) {
      return e < 0 ? M.resolve() : new M((a) => setTimeout(a, e))
    }
    function La(e) {
      return this.filter($).join(e)
    }
    function Ea(e, a) {
      if (la(a)) return a
      if (/^(i,|image\/)/.test(e)) {
        const a = e.lastIndexOf(",")
        return `data:${e.startsWith("image/") ? e.slice(0, a) : "image/png"};base64,${e.slice(a + 1)}`
      }
      return e
    }
    async function Oa(e) {
      return `${(e.headers.get("content-type") || "").split(";")[0] || ""},${await Je(e.data)}`
    }
    function Pa(e) {
      const a = {}
      return (
        e &&
          new URLSearchParams(e).forEach((e, t) => {
            a[t] = e
          }),
        a
      )
    }
    function Na(e) {
      return `${new URLSearchParams(e)}`
    }
    const Ha = {},
      Wa = (e) => I.assign(Ha, e),
      Fa = (e) => {
        for (const a in e) (Ha[a] = e[a]).isOwn = !0
      }
    let Ba,
      Va = new M((e) => {
        Ba = () => M.all(Va.deps).then(e)
      })
    ;(Va.deps = []), Va.then(() => (Va = null))
    const Ga = "updateEnabledScriptsOnly",
      Ka = {
        autocompleteOnTyping: 100,
        lineWrapping: !1,
        indentWithTabs: !1,
        indentUnit: 2,
        tabSize: 2,
        undoDepth: 500,
      },
      Ja = { killTrailingSpaceOnSave: !0, showTrailingSpace: !0, ...Ka },
      Ya = {
        [O]: !0,
        [pe]: $e,
        [fe]: $e,
        popupWidth: 320,
        [Ga]: !0,
        autoUpdate: 1,
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
        editor: Ja,
        editorTheme: "",
        editorThemeName: null,
        editorWindow: !1,
        editorWindowPos: {},
        editorWindowSimple: !0,
        scriptTemplate: `// ==UserScript==\n// @name        New script {{name}}\n// @namespace   ${t} Scripts\n// @match       {{url}}\n// @grant       none\n// @version     1.0\n// @author      -\n// @description {{date}}\n// ==/UserScript==\n`,
        showAdvanced: !0,
        valueEditor: Ka,
        uiTheme: "",
      }
    let Xa = browser.storage.local
    class Za {
      constructor(e, a) {
        ;(ut[a] = this), (this.name = e), (this.prefix = a)
      }
      toKey(e) {
        return this.prefix + e
      }
      toId(e) {
        return e.startsWith(this.prefix) ? e.slice(this.prefix.length) : ""
      }
      async getOne(e) {
        const a = this.toKey(e)
        return (await Xa.get([a]))[a]
      }
      async getMulti(e, a) {
        const t = null == e ? void 0 : e.map(this.toKey, this),
          n = await Xa.get(t)
        return a || this.prefix ? E(De, n, a, this.toId, this) : n
      }
      async remove(e) {
        const a = na(e).filter($).map(this.toKey, this)
        a.length && (await Xa.remove(a))
      }
      async setOne(e, a) {
        if (e) return this.set({ [e]: a })
      }
      async set(e) {
        return await Xa.set(this.prefix ? E(De, e, null, this.toKey, this) : e), e
      }
    }
    const Qa = "cache",
      et = "cac:",
      at = "code",
      tt = "code:",
      nt = "mod:",
      ot = "require",
      it = "req:",
      st = "script",
      rt = "scr:",
      lt = "value",
      ct = "val:",
      ut = {},
      dt = {
        get api() {
          return Xa
        },
        set api(e) {
          Xa = e
        },
        forKey: (e) => ut[/^\w+:|$/.exec(e)[0]],
        base: new Za("base", ""),
        [Qa]: new Za(Qa, et),
        [at]: new Za(at, tt),
        mod: new Za("mod", nt),
        [ot]: new Za(ot, it),
        [st]: new Za(st, rt),
        [lt]: new Za(lt, ct),
      },
      mt = dt
    let ht
    Fa({ Storage: ([e, a, ...t]) => dt[e][a](...t) }),
      Fa({
        GetAllOptions: () => I.assign({}, Ya, gt),
        SetOptions(e) {
          for (const a in e) It(a, e[a], !0)
          St()
        },
      })
    const gt = {},
      pt = "options",
      ft = "version",
      kt = "scriptTemplate",
      bt = wa(),
      yt = Fe(St, 100),
      vt = Fe(() => mt.base.setOne(pt, gt), 100),
      wt = new Proxy(Ya, { get: (e, a) => qt(a) }),
      xt = bt.hook
    function zt(e) {
      ;(e = e[pt] || {}),
        I.assign(gt, e),
        gt[ft] || It(ft, 1),
        "// ==UserScript==\n// @name New Script\n// @namespace Violentmonkey Scripts\n// @match {{url}}\n// @grant none\n// ==/UserScript==\n" ===
          gt[kt] && (gt[kt] = Ya[kt]),
        I.keys(gt).map(Mt).some($) && (delete gt[`${kt}Edited`], vt())
    }
    function jt(e, a, t) {
      ht ? delete ht[e] : (ht = {}), (ht[e] = a), t || yt()
    }
    function St() {
      if (!ht) return
      const e = ht
      ;(ht = null), bt.fire(e)
    }
    function $t(e) {
      return Va ? Va.then(() => e(wt, !0)) : e(wt, !0), xt(e)
    }
    function qt(e) {
      var a
      let t = gt[e]
      if (null != t) return t
      const n = Ie(e),
        o = n[0],
        i = null != (a = gt[o]) ? a : Ae(Ya[o])
      return n.length > 1 ? Me(i, n.slice(1)) : i
    }
    function It(e, a, t) {
      if (Va) return Va.then(It.bind(null, ...arguments))
      const n = Ie(e),
        o = n[0]
      if (((e = n.join(".")), !L(Ya, o))) return
      const i = n.length > 1 && n.slice(1),
        s = qt([o])
      Le(a, i ? Me(s, i) : s) || ((gt[o] = i ? Ce(s, i, a) : a), Mt(o), vt(), jt(e, a, t))
    }
    function Mt(e) {
      return Le(gt[e], Ya[e]) && delete gt[e]
    }
    function Ct({ lifetime: e = 3e3, onDispose: a } = {}) {
      let t,
        n,
        o,
        i = I.create(null),
        s = -1
      const r = () => (n && o) || (o = _.now()),
        l = 1e3
      return {
        batch: (e) => {
          ;(n = e), (o = 0)
        },
        get: c,
        some: (e, a) => {
          for (const t in i) {
            const n = i[t]
            if (n && e.call(a, n.value, t)) return !0
          }
        },
        pop: (e, a) => {
          const t = c(e, a)
          return u(e), t
        },
        put: (e, a, t) => (d((i[e] = t ? { value: a, lifetime: t } : { value: a }), t), a),
        del: u,
        has: (e) => e in i,
        hit: (e, a) => {
          const t = i[e]
          t && d(t, a)
        },
        destroy: () => {
          if (a) for (const e in i) u(e)
          else i = I.create(null)
          clearTimeout(t), (t = 0)
        },
      }
      function c(e, a, t = !0) {
        const n = i[e]
        return n && t && d(n, n.lifetime), n ? n.value : a
      }
      function u(e) {
        const t = i[e]
        t && (delete i[e], null == a || a(t.value, e))
      }
      function d(a, n = e) {
        if (((a.expiry = n + r()), t)) {
          if (n >= s) return
          clearTimeout(t)
        }
        ;(s = n), (t = setTimeout(m, n + l))
      }
      function m() {
        const e = _.now()
        let a = Number.MAX_SAFE_INTEGER
        for (const t in i) {
          const { expiry: n } = i[t]
          n < e ? u(t) : n < a && (a = n)
        }
        ;(s = a - e), (t = a < Number.MAX_SAFE_INTEGER ? setTimeout(m, s + l) : 0)
      }
    }
    xt((e) => xa("UpdateOptions", e))
    const Ut = Ct({ lifetime: 3e5 })
    Fa({
      CacheLoad: (e) => Ut.get(e) || null,
      CacheHit(e) {
        Ut.hit(e.key, e.lifetime)
      },
      CachePop: (e) => Ut.pop(e) || null,
    })
    const Dt = Ut,
      _t = new (class {
        constructor(e) {
          ;(this.events = {}), (this.allowed = e)
        }
        checkType(e) {
          if (this.allowed && !this.allowed.includes(e)) throw new q(`Unknown event type: ${e}`)
        }
        on(e, a) {
          this.checkType(e)
          const { events: t } = this
          let n = t[e]
          return n || ((n = []), (t[e] = n)), () => this.off(e, a)
        }
        off(e, a) {
          this.checkType(e)
          const t = this.events[e]
          if (t) {
            const e = t.indexOf(a)
            e >= 0 && t.splice(e, 1)
          }
        }
        emit(e, a) {
          this.checkType(e)
          const t = this.events[e]
          if (t) {
            const n = {
              type: e,
              data: a,
              defaultPrevented: !1,
              preventDefault() {
                n.defaultPrevented = !0
              },
            }
            t.some((e) => (e(n), n.defaultPrevented))
          }
        }
      })(["scriptEdit", "scriptChanged"]),
      Tt = (e) => `${e < 10 ? "0" : ""}${e}`,
      Rt = (e) => e.getFullYear(),
      At = (e) => Math.floor((e - new Date(Rt(e), 0, 1)) / 864e5) + 1,
      Lt = (e) => Math.floor((e - new Date(Rt(e), 0, 1)) / 6048e5) + 1,
      Et = (e, a) => e.toLocaleString([navigator.language], a),
      Ot = {
        M: (e) => e.getMonth() + 1,
        MM: (e) => Tt(e.getMonth() + 1),
        MMM: (e) => Et(e, { month: "short" }),
        MMMM: (e) => Et(e, { month: "long" }),
        Q: (e) => Math.floor(e.getMonth() / 3) + 1,
        D: (e) => e.getDate(),
        DD: (e) => Tt(e.getDate()),
        DDD: At,
        DDDD: (e) => {
          return `${((a = At(e)) < 10 ? "00" : a < 100 && "0") || ""}${a}`
          var a
        },
        d: (e) => e.getDay(),
        dd: (e) => Et(e, { weekday: "short" }).slice(0, 2),
        ddd: (e) => Et(e, { weekday: "short" }),
        dddd: (e) => Et(e, { weekday: "long" }),
        w: Lt,
        ww: (e) => Tt(Lt(e)),
        Y: Rt,
        YY: (e) => Tt(Rt(e) % 100),
        YYYY: (e) => `${Rt(e)}`.slice(-4),
        H: (e) => e.getHours(),
        HH: (e) => Tt(e.getHours()),
        m: (e) => e.getMinutes(),
        mm: (e) => Tt(e.getMinutes()),
        s: (e) => e.getSeconds(),
        ss: (e) => Tt(e.getSeconds()),
        S: (e) => ("" + +e).slice(-3, -2),
        SS: (e) => ("" + +e).slice(-3, -1),
        SSS: (e) => ("" + +e).slice(-3),
        ZZ: (e) => {
          const a = e.getTimezoneOffset(),
            t = Math.abs(a)
          return `${a < 0 ? "-" : "+"}${Tt(Math.floor(t / 60))}${Tt(Math.floor(t % 60))}`
        },
      }
    let Pt
    function Nt(e, a = new Date()) {
      return (
        Pt ||
          (Pt = new RegExp(
            `${/\[([^[\]]*)]/.source}|${I.keys(Ot)
              .sort((e, a) => a.length - e.length)
              .join("|")}`,
            "g"
          )),
        e.replace(Pt, (e, t) => (L(Ot, e) ? Ot[e](a) : null != t ? t : e))
      )
    }
    function Ht(e, a, t) {
      if (null !== t.validHosts) {
        const e = t.validHosts
        for (const t of e)
          if (((e, a) => !!e.endsWith(a) && (e.length === a.length || "." === e[e.length - a.length - 1]))(a, t))
            return t
      }
      let n = 0
      if (a.startsWith(".")) for (; n < a.length && "." === a[n]; ) n += 1
      return e.length === a.length - n
        ? null
        : ((e, a) => {
            const t = e.length - a.length - 2,
              n = e.lastIndexOf(".", t)
            return -1 === n ? e : e.slice(n + 1)
          })(a, e)
    }
    function Wt(e, a) {
      let t = 0,
        n = e.length,
        o = !1
      if (!a) {
        if (e.startsWith("data:")) return null
        for (; t < e.length && e.charCodeAt(t) <= 32; ) t += 1
        for (; n > t + 1 && e.charCodeAt(n - 1) <= 32; ) n -= 1
        if (47 === e.charCodeAt(t) && 47 === e.charCodeAt(t + 1)) t += 2
        else {
          const a = e.indexOf(":/", t)
          if (-1 !== a) {
            const n = a - t,
              o = e.charCodeAt(t),
              i = e.charCodeAt(t + 1),
              s = e.charCodeAt(t + 2),
              r = e.charCodeAt(t + 3),
              l = e.charCodeAt(t + 4)
            if (5 === n && 104 === o && 116 === i && 116 === s && 112 === r && 115 === l);
            else if (4 === n && 104 === o && 116 === i && 116 === s && 112 === r);
            else if (3 === n && 119 === o && 115 === i && 115 === s);
            else if (2 === n && 119 === o && 115 === i);
            else
              for (let n = t; n < a; n += 1) {
                const a = 32 | e.charCodeAt(n)
                if (!((a >= 97 && a <= 122) || (a >= 48 && a <= 57) || 46 === a || 45 === a || 43 === a)) return null
              }
            for (t = a + 2; 47 === e.charCodeAt(t); ) t += 1
          }
        }
        let a = -1,
          i = -1,
          s = -1
        for (let r = t; r < n; r += 1) {
          const t = e.charCodeAt(r)
          if (35 === t || 47 === t || 63 === t) {
            n = r
            break
          }
          64 === t ? (a = r) : 93 === t ? (i = r) : 58 === t ? (s = r) : t >= 65 && t <= 90 && (o = !0)
        }
        if ((-1 !== a && a > t && a < n && (t = a + 1), 91 === e.charCodeAt(t)))
          return -1 !== i ? e.slice(t + 1, i).toLowerCase() : null
        ;-1 !== s && s > t && s < n && (n = s)
      }
      for (; n > t + 1 && 46 === e.charCodeAt(n - 1); ) n -= 1
      const i = 0 !== t || n !== e.length ? e.slice(t, n) : e
      return o ? i.toLowerCase() : i
    }
    function Ft(e) {
      if (e.length < 7) return !1
      if (e.length > 15) return !1
      let a = 0
      for (let t = 0; t < e.length; t += 1) {
        const n = e.charCodeAt(t)
        if (46 === n) a += 1
        else if (n < 48 || n > 57) return !1
      }
      return 3 === a && 46 !== e.charCodeAt(0) && 46 !== e.charCodeAt(e.length - 1)
    }
    function Bt(e) {
      if (e.length < 3) return !1
      let a = e.startsWith("[") ? 1 : 0,
        t = e.length
      if (("]" === e[t - 1] && (t -= 1), t - a > 39)) return !1
      let n = !1
      for (; a < t; a += 1) {
        const t = e.charCodeAt(a)
        if (58 === t) n = !0
        else if (!((t >= 48 && t <= 57) || (t >= 97 && t <= 102) || (t >= 65 && t <= 90))) return !1
      }
      return n
    }
    function Vt(e) {
      return (e >= 97 && e <= 122) || (e >= 48 && e <= 57) || e > 127
    }
    function Gt(e) {
      if (e.length > 255) return !1
      if (0 === e.length) return !1
      if (!Vt(e.charCodeAt(0)) && 46 !== e.charCodeAt(0) && 95 !== e.charCodeAt(0)) return !1
      let a = -1,
        t = -1
      const n = e.length
      for (let o = 0; o < n; o += 1) {
        const n = e.charCodeAt(o)
        if (46 === n) {
          if (o - a > 64 || 46 === t || 45 === t || 95 === t) return !1
          a = o
        } else if (!Vt(n) && 45 !== n && 95 !== n) return !1
        t = n
      }
      return n - a - 1 <= 63 && 45 !== t
    }
    const Kt = (({
      allowIcannDomains: e = !0,
      allowPrivateDomains: a = !1,
      detectIp: t = !0,
      extractHostname: n = !0,
      mixedInputs: o = !0,
      validHosts: i = null,
      validateHostname: s = !0,
    }) => ({
      allowIcannDomains: e,
      allowPrivateDomains: a,
      detectIp: t,
      extractHostname: n,
      mixedInputs: o,
      validHosts: i,
      validateHostname: s,
    }))({})
    function Jt(e, a) {
      return a.length === e.length ? "" : e.slice(0, -a.length - 1)
    }
    function Yt(e, a, t, n, o) {
      const i = ((e) =>
        void 0 === e
          ? Kt
          : (({
              allowIcannDomains: e = !0,
              allowPrivateDomains: a = !1,
              detectIp: t = !0,
              extractHostname: n = !0,
              mixedInputs: o = !0,
              validHosts: i = null,
              validateHostname: s = !0,
            }) => ({
              allowIcannDomains: e,
              allowPrivateDomains: a,
              detectIp: t,
              extractHostname: n,
              mixedInputs: o,
              validHosts: i,
              validateHostname: s,
            }))(e))(n)
      return "string" != typeof e
        ? o
        : (i.extractHostname
            ? i.mixedInputs
              ? (o.hostname = Wt(e, Gt(e)))
              : (o.hostname = Wt(e, !1))
            : (o.hostname = e),
          0 === a || null === o.hostname || (i.detectIp && ((o.isIp = Bt((s = o.hostname)) || Ft(s)), o.isIp))
            ? o
            : i.validateHostname && i.extractHostname && !Gt(o.hostname)
              ? ((o.hostname = null), o)
              : (t(o.hostname, i, o),
                2 === a ||
                  null === o.publicSuffix ||
                  ((o.domain = Ht(o.publicSuffix, o.hostname, i)),
                  3 === a ||
                    null === o.domain ||
                    ((o.subdomain = Jt(o.hostname, o.domain)),
                    4 === a ||
                      (o.domainWithoutSuffix = ((r = o.domain), (l = o.publicSuffix), r.slice(0, -l.length - 1))))),
                o))
      var s, r, l
    }
    function Xt(e, a, t) {
      if (!a.allowPrivateDomains && e.length > 3) {
        const a = e.length - 1,
          n = e.charCodeAt(a),
          o = e.charCodeAt(a - 1),
          i = e.charCodeAt(a - 2),
          s = e.charCodeAt(a - 3)
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
    const Zt = (() => {
        const e = [1, {}],
          a = [0, { city: e }]
        return [
          0,
          {
            ck: [0, { www: e }],
            jp: [0, { kawasaki: a, kitakyushu: a, kobe: a, nagoya: a, sapporo: a, sendai: a, yokohama: a }],
          },
        ]
      })(),
      Qt = (() => {
        const e = [1, {}],
          a = [2, {}],
          t = [1, { gov: e, com: e, org: e, net: e, edu: e }],
          n = [0, { "*": a }],
          o = [1, { blogspot: a }],
          i = [1, { gov: e }],
          s = [0, { "*": e }],
          r = [0, { cloud: a }],
          l = [1, { co: a }],
          c = [2, { nodes: a }],
          u = [0, { s3: a }],
          d = [0, { direct: a }],
          m = [2, { id: a }],
          h = [0, { "webview-assets": a }],
          g = [0, { vfs: a, "webview-assets": a }],
          p = [0, { "aws-cloud9": h, cloud9: g }],
          f = [0, { dualstack: u, "analytics-gateway": a, "aws-cloud9": h, cloud9: g }],
          k = [0, { dualstack: u, s3: a, "s3-website": a, "aws-cloud9": h, cloud9: g }],
          b = [0, { dualstack: u, "aws-cloud9": h, cloud9: g }],
          y = [0, { apps: a }],
          v = [0, { paas: a }],
          w = [0, { app: a }],
          x = [2, { eu: a }],
          z = [0, { site: a }],
          j = [0, { pages: a }],
          S = [1, { com: e, edu: e, net: e, org: e }],
          $ = [0, { j: a }],
          q = [0, { jelastic: a }],
          I = [0, { user: a }],
          M = [1, { ybo: a }],
          C = [0, { cust: a, reservd: a }],
          U = [0, { cust: a }],
          D = [1, { gov: e, edu: e, mil: e, com: e, org: e, net: e }],
          _ = [1, { edu: e, biz: e, net: e, org: e, gov: e, info: e, com: e }],
          T = [1, { gov: e, blogspot: a }],
          R = [1, { framer: a }],
          A = [1, { barsy: a }],
          L = [0, { forgot: a }],
          E = [1, { gs: e }],
          O = [0, { nes: e }],
          P = [1, { k12: e, cc: e, lib: e }],
          N = [1, { cc: e, lib: e }]
        return [
          0,
          {
            ac: [1, { com: e, edu: e, gov: e, net: e, mil: e, org: e, drr: a }],
            ad: [1, { nom: e }],
            ae: [1, { co: e, net: e, org: e, sch: e, ac: e, gov: e, mil: e, blogspot: a }],
            aero: [
              1,
              {
                "accident-investigation": e,
                "accident-prevention": e,
                aerobatic: e,
                aeroclub: e,
                aerodrome: e,
                agents: e,
                aircraft: e,
                airline: e,
                airport: e,
                "air-surveillance": e,
                airtraffic: e,
                "air-traffic-control": e,
                ambulance: e,
                amusement: e,
                association: e,
                author: e,
                ballooning: e,
                broker: e,
                caa: e,
                cargo: e,
                catering: e,
                certification: e,
                championship: e,
                charter: e,
                civilaviation: e,
                club: e,
                conference: e,
                consultant: e,
                consulting: e,
                control: e,
                council: e,
                crew: e,
                design: e,
                dgca: e,
                educator: e,
                emergency: e,
                engine: e,
                engineer: e,
                entertainment: e,
                equipment: e,
                exchange: e,
                express: e,
                federation: e,
                flight: e,
                fuel: e,
                gliding: e,
                government: e,
                groundhandling: e,
                group: e,
                hanggliding: e,
                homebuilt: e,
                insurance: e,
                journal: e,
                journalist: e,
                leasing: e,
                logistics: e,
                magazine: e,
                maintenance: e,
                media: e,
                microlight: e,
                modelling: e,
                navigation: e,
                parachuting: e,
                paragliding: e,
                "passenger-association": e,
                pilot: e,
                press: e,
                production: e,
                recreation: e,
                repbody: e,
                res: e,
                research: e,
                rotorcraft: e,
                safety: e,
                scientist: e,
                services: e,
                show: e,
                skydiving: e,
                software: e,
                student: e,
                trader: e,
                trading: e,
                trainer: e,
                union: e,
                workinggroup: e,
                works: e,
              },
            ],
            af: t,
            ag: [1, { com: e, org: e, net: e, co: e, nom: e }],
            ai: [1, { off: e, com: e, net: e, org: e, uwu: a }],
            al: [1, { com: e, edu: e, gov: e, mil: e, net: e, org: e, blogspot: a }],
            am: [1, { co: e, com: e, commune: e, net: e, org: e, radio: a, blogspot: a, neko: a, nyaa: a }],
            ao: [1, { ed: e, gv: e, og: e, co: e, pb: e, it: e }],
            aq: e,
            ar: [
              1,
              {
                bet: e,
                com: o,
                coop: e,
                edu: e,
                gob: e,
                gov: e,
                int: e,
                mil: e,
                musica: e,
                mutual: e,
                net: e,
                org: e,
                senasa: e,
                tur: e,
              },
            ],
            arpa: [1, { e164: e, "in-addr": e, ip6: e, iris: e, uri: e, urn: e }],
            as: i,
            asia: [1, { cloudns: a }],
            at: [
              1,
              {
                ac: [1, { sth: e }],
                co: o,
                gv: e,
                or: e,
                funkfeuer: [0, { wien: a }],
                futurecms: [0, { "*": a, ex: n, in: n }],
                futurehosting: a,
                futuremailing: a,
                ortsinfo: [0, { ex: n, kunden: n }],
                biz: a,
                info: a,
                "123webseite": a,
                priv: a,
                myspreadshop: a,
                "12hp": a,
                "2ix": a,
                "4lima": a,
                "lima-city": a,
              },
            ],
            au: [
              1,
              {
                com: [1, { blogspot: a, cloudlets: [0, { mel: a }], myspreadshop: a }],
                net: e,
                org: e,
                edu: [
                  1,
                  { act: e, catholic: e, nsw: [1, { schools: e }], nt: e, qld: e, sa: e, tas: e, vic: e, wa: e },
                ],
                gov: [1, { qld: e, sa: e, tas: e, vic: e, wa: e }],
                asn: e,
                id: e,
                info: e,
                conf: e,
                oz: e,
                act: e,
                nsw: e,
                nt: e,
                qld: e,
                sa: e,
                tas: e,
                vic: e,
                wa: e,
              },
            ],
            aw: [1, { com: e }],
            ax: [1, { be: a, cat: a, es: a, eu: a, gg: a, mc: a, us: a, xy: a }],
            az: [
              1,
              { com: e, net: e, int: e, gov: e, org: e, edu: e, info: e, pp: e, mil: e, name: e, pro: e, biz: e },
            ],
            ba: [1, { com: e, edu: e, gov: e, mil: e, net: e, org: e, rs: a, blogspot: a }],
            bb: [1, { biz: e, co: e, com: e, edu: e, gov: e, info: e, net: e, org: e, store: e, tv: e }],
            bd: s,
            be: [
              1,
              {
                ac: e,
                webhosting: a,
                blogspot: a,
                interhostsolutions: r,
                kuleuven: [0, { ezproxy: a }],
                "123website": a,
                myspreadshop: a,
                transurl: n,
              },
            ],
            bf: i,
            bg: [
              1,
              {
                0: e,
                1: e,
                2: e,
                3: e,
                4: e,
                5: e,
                6: e,
                7: e,
                8: e,
                9: e,
                a: e,
                b: e,
                c: e,
                d: e,
                e,
                f: e,
                g: e,
                h: e,
                i: e,
                j: e,
                k: e,
                l: e,
                m: e,
                n: e,
                o: e,
                p: e,
                q: e,
                r: e,
                s: e,
                t: e,
                u: e,
                v: e,
                w: e,
                x: e,
                y: e,
                z: e,
                blogspot: a,
                barsy: a,
              },
            ],
            bh: t,
            bi: [1, { co: e, com: e, edu: e, or: e, org: e }],
            biz: [
              1,
              {
                activetrail: a,
                cloudns: a,
                jozi: a,
                dyndns: a,
                "for-better": a,
                "for-more": a,
                "for-some": a,
                "for-the": a,
                selfip: a,
                webhop: a,
                orx: a,
                mmafan: a,
                myftp: a,
                "no-ip": a,
                dscloud: a,
              },
            ],
            bj: [
              1,
              {
                africa: e,
                agro: e,
                architectes: e,
                assur: e,
                avocats: e,
                co: e,
                com: e,
                eco: e,
                econo: e,
                edu: e,
                info: e,
                loisirs: e,
                money: e,
                net: e,
                org: e,
                ote: e,
                resto: e,
                restaurant: e,
                tourism: e,
                univ: e,
                blogspot: a,
              },
            ],
            bm: t,
            bn: [1, { com: e, edu: e, gov: e, net: e, org: e, co: a }],
            bo: [
              1,
              {
                com: e,
                edu: e,
                gob: e,
                int: e,
                org: e,
                net: e,
                mil: e,
                tv: e,
                web: e,
                academia: e,
                agro: e,
                arte: e,
                blog: e,
                bolivia: e,
                ciencia: e,
                cooperativa: e,
                democracia: e,
                deporte: e,
                ecologia: e,
                economia: e,
                empresa: e,
                indigena: e,
                industria: e,
                info: e,
                medicina: e,
                movimiento: e,
                musica: e,
                natural: e,
                nombre: e,
                noticias: e,
                patria: e,
                politica: e,
                profesional: e,
                plurinacional: e,
                pueblo: e,
                revista: e,
                salud: e,
                tecnologia: e,
                tksat: e,
                transporte: e,
                wiki: e,
              },
            ],
            br: [
              1,
              {
                "9guacu": e,
                abc: e,
                adm: e,
                adv: e,
                agr: e,
                aju: e,
                am: e,
                anani: e,
                aparecida: e,
                app: e,
                arq: e,
                art: e,
                ato: e,
                b: e,
                barueri: e,
                belem: e,
                bhz: e,
                bib: e,
                bio: e,
                blog: e,
                bmd: e,
                boavista: e,
                bsb: e,
                campinagrande: e,
                campinas: e,
                caxias: e,
                cim: e,
                cng: e,
                cnt: e,
                com: [1, { blogspot: a, simplesite: a }],
                contagem: e,
                coop: e,
                coz: e,
                cri: e,
                cuiaba: e,
                curitiba: e,
                def: e,
                des: e,
                det: e,
                dev: e,
                ecn: e,
                eco: e,
                edu: e,
                emp: e,
                enf: e,
                eng: e,
                esp: e,
                etc: e,
                eti: e,
                far: e,
                feira: e,
                flog: e,
                floripa: e,
                fm: e,
                fnd: e,
                fortal: e,
                fot: e,
                foz: e,
                fst: e,
                g12: e,
                geo: e,
                ggf: e,
                goiania: e,
                gov: [
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
                gru: e,
                imb: e,
                ind: e,
                inf: e,
                jab: e,
                jampa: e,
                jdf: e,
                joinville: e,
                jor: e,
                jus: e,
                leg: [
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
                lel: e,
                log: e,
                londrina: e,
                macapa: e,
                maceio: e,
                manaus: e,
                maringa: e,
                mat: e,
                med: e,
                mil: e,
                morena: e,
                mp: e,
                mus: e,
                natal: e,
                net: e,
                niteroi: e,
                nom: s,
                not: e,
                ntr: e,
                odo: e,
                ong: e,
                org: e,
                osasco: e,
                palmas: e,
                poa: e,
                ppg: e,
                pro: e,
                psc: e,
                psi: e,
                pvh: e,
                qsl: e,
                radio: e,
                rec: e,
                recife: e,
                rep: e,
                ribeirao: e,
                rio: e,
                riobranco: e,
                riopreto: e,
                salvador: e,
                sampa: e,
                santamaria: e,
                santoandre: e,
                saobernardo: e,
                saogonca: e,
                seg: e,
                sjc: e,
                slg: e,
                slz: e,
                sorocaba: e,
                srv: e,
                taxi: e,
                tc: e,
                tec: e,
                teo: e,
                the: e,
                tmp: e,
                trd: e,
                tur: e,
                tv: e,
                udi: e,
                vet: e,
                vix: e,
                vlog: e,
                wiki: e,
                zlg: e,
              },
            ],
            bs: [1, { com: e, net: e, org: e, edu: e, gov: e, we: a }],
            bt: t,
            bv: e,
            bw: [1, { co: e, org: e }],
            by: [1, { gov: e, mil: e, com: o, of: e, mycloud: a, mediatech: a }],
            bz: [1, { com: e, net: e, org: e, edu: e, gov: e, za: a, gsj: a }],
            ca: [
              1,
              {
                ab: e,
                bc: e,
                mb: e,
                nb: e,
                nf: e,
                nl: e,
                ns: e,
                nt: e,
                nu: e,
                on: e,
                pe: e,
                qc: e,
                sk: e,
                yk: e,
                gc: e,
                barsy: a,
                awdev: n,
                co: a,
                blogspot: a,
                "no-ip": a,
                myspreadshop: a,
              },
            ],
            cat: e,
            cc: [
              1,
              {
                cloudns: a,
                ftpaccess: a,
                "game-server": a,
                myphotos: a,
                scrapping: a,
                twmail: a,
                csx: a,
                fantasyleague: a,
                spawn: [0, { instances: a }],
              },
            ],
            cd: i,
            cf: o,
            cg: e,
            ch: [
              1,
              {
                square7: a,
                blogspot: a,
                flow: [0, { ae: [0, { alp1: a }], appengine: a }],
                "linkyard-cloud": a,
                dnsking: a,
                gotdns: a,
                "123website": a,
                myspreadshop: a,
                firenet: [0, { "*": a, svc: n }],
                "12hp": a,
                "2ix": a,
                "4lima": a,
                "lima-city": a,
              },
            ],
            ci: [
              1,
              {
                org: e,
                or: e,
                com: e,
                co: e,
                edu: e,
                ed: e,
                ac: e,
                net: e,
                go: e,
                asso: e,
                "xn--aroport-bya": e,
                aéroport: e,
                int: e,
                presse: e,
                md: e,
                gouv: e,
                fin: a,
                nl: a,
              },
            ],
            ck: s,
            cl: [1, { co: e, gob: e, gov: e, mil: e, blogspot: a }],
            cm: [1, { co: e, com: e, gov: e, net: e }],
            cn: [
              1,
              {
                ac: e,
                com: [
                  1,
                  {
                    amazonaws: [
                      0,
                      { compute: n, "cn-north-1": u, eb: [0, { "cn-north-1": a, "cn-northwest-1": a }], elb: n },
                    ],
                  },
                ],
                edu: e,
                gov: e,
                net: e,
                org: e,
                mil: e,
                "xn--55qx5d": e,
                公司: e,
                "xn--io0a7i": e,
                网络: e,
                "xn--od0alg": e,
                網絡: e,
                ah: e,
                bj: e,
                cq: e,
                fj: e,
                gd: e,
                gs: e,
                gz: e,
                gx: e,
                ha: e,
                hb: e,
                he: e,
                hi: e,
                hl: e,
                hn: e,
                jl: e,
                js: e,
                jx: e,
                ln: e,
                nm: e,
                nx: e,
                qh: e,
                sc: e,
                sd: e,
                sh: e,
                sn: e,
                sx: e,
                tj: e,
                xj: e,
                xz: e,
                yn: e,
                zj: e,
                hk: e,
                mo: e,
                tw: e,
                "canva-apps": a,
                instantcloud: a,
                quickconnect: d,
              },
            ],
            co: [
              1,
              {
                arts: e,
                com: o,
                edu: e,
                firm: e,
                gov: e,
                info: e,
                int: e,
                mil: e,
                net: e,
                nom: e,
                org: e,
                rec: e,
                web: e,
                carrd: a,
                crd: a,
                otap: n,
                leadpages: a,
                lpages: a,
                mypi: a,
                n4t: a,
                firewalledreplit: m,
                repl: m,
                supabase: a,
              },
            ],
            com: [
              1,
              {
                devcdnaccesso: n,
                adobeaemcloud: [2, { dev: n }],
                airkitapps: a,
                "airkitapps-au": a,
                aivencloud: a,
                kasserver: a,
                amazonaws: [
                  0,
                  {
                    compute: n,
                    "compute-1": n,
                    "us-east-1": [2, { dualstack: u, "analytics-gateway": a, "aws-cloud9": h, cloud9: g }],
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
                    s3: a,
                    "s3-ap-northeast-1": a,
                    "s3-ap-northeast-2": a,
                    "s3-ap-south-1": a,
                    "s3-ap-southeast-1": a,
                    "s3-ap-southeast-2": a,
                    "s3-ca-central-1": a,
                    "s3-eu-central-1": a,
                    "s3-eu-west-1": a,
                    "s3-eu-west-2": a,
                    "s3-eu-west-3": a,
                    "s3-external-1": a,
                    "s3-fips-us-gov-west-1": a,
                    "s3-sa-east-1": a,
                    "s3-us-east-2": a,
                    "s3-us-gov-west-1": a,
                    "s3-us-west-1": a,
                    "s3-us-west-2": a,
                    "s3-website-ap-northeast-1": a,
                    "s3-website-ap-southeast-1": a,
                    "s3-website-ap-southeast-2": a,
                    "s3-website-eu-west-1": a,
                    "s3-website-sa-east-1": a,
                    "s3-website-us-east-1": a,
                    "s3-website-us-west-1": a,
                    "s3-website-us-west-2": a,
                    "sa-east-1": b,
                    "us-east-2": [
                      0,
                      { dualstack: u, s3: a, "s3-website": a, "analytics-gateway": a, "aws-cloud9": h, cloud9: g },
                    ],
                    "us-west-2": [0, { "analytics-gateway": a, "aws-cloud9": h, cloud9: g }],
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
                    "ap-northeast-1": a,
                    "ap-northeast-2": a,
                    "ap-northeast-3": a,
                    "ap-south-1": a,
                    "ap-southeast-1": a,
                    "ap-southeast-2": a,
                    "ca-central-1": a,
                    "eu-central-1": a,
                    "eu-west-1": a,
                    "eu-west-2": a,
                    "eu-west-3": a,
                    "sa-east-1": a,
                    "us-east-1": a,
                    "us-east-2": a,
                    "us-gov-west-1": a,
                    "us-west-1": a,
                    "us-west-2": a,
                  },
                ],
                awsglobalaccelerator: a,
                siiites: a,
                appspacehosted: a,
                appspaceusercontent: a,
                "on-aptible": a,
                myasustor: a,
                "balena-devices": a,
                betainabox: a,
                boutir: a,
                bplaced: a,
                cafjs: a,
                "canva-apps": a,
                br: a,
                cn: a,
                de: a,
                eu: a,
                jpn: a,
                mex: a,
                ru: a,
                sa: a,
                uk: a,
                us: a,
                za: a,
                ar: a,
                hu: a,
                kr: a,
                no: a,
                qc: a,
                uy: a,
                africa: a,
                gr: a,
                co: a,
                jdevcloud: a,
                wpdevcloud: a,
                cloudcontrolled: a,
                cloudcontrolapp: a,
                "cf-ipfs": a,
                "cloudflare-ipfs": a,
                trycloudflare: a,
                "customer-oci": [0, { "*": a, oci: n, ocp: n, ocs: n }],
                dattolocal: a,
                dattorelay: a,
                dattoweb: a,
                mydatto: a,
                builtwithdark: a,
                datadetect: [0, { demo: a, instance: a }],
                ddns5: a,
                discordsays: a,
                discordsez: a,
                drayddns: a,
                dreamhosters: a,
                mydrobo: a,
                "dyndns-at-home": a,
                "dyndns-at-work": a,
                "dyndns-blog": a,
                "dyndns-free": a,
                "dyndns-home": a,
                "dyndns-ip": a,
                "dyndns-mail": a,
                "dyndns-office": a,
                "dyndns-pics": a,
                "dyndns-remote": a,
                "dyndns-server": a,
                "dyndns-web": a,
                "dyndns-wiki": a,
                "dyndns-work": a,
                blogdns: a,
                cechire: a,
                dnsalias: a,
                dnsdojo: a,
                doesntexist: a,
                dontexist: a,
                doomdns: a,
                "dyn-o-saur": a,
                dynalias: a,
                "est-a-la-maison": a,
                "est-a-la-masion": a,
                "est-le-patron": a,
                "est-mon-blogueur": a,
                "from-ak": a,
                "from-al": a,
                "from-ar": a,
                "from-ca": a,
                "from-ct": a,
                "from-dc": a,
                "from-de": a,
                "from-fl": a,
                "from-ga": a,
                "from-hi": a,
                "from-ia": a,
                "from-id": a,
                "from-il": a,
                "from-in": a,
                "from-ks": a,
                "from-ky": a,
                "from-ma": a,
                "from-md": a,
                "from-mi": a,
                "from-mn": a,
                "from-mo": a,
                "from-ms": a,
                "from-mt": a,
                "from-nc": a,
                "from-nd": a,
                "from-ne": a,
                "from-nh": a,
                "from-nj": a,
                "from-nm": a,
                "from-nv": a,
                "from-oh": a,
                "from-ok": a,
                "from-or": a,
                "from-pa": a,
                "from-pr": a,
                "from-ri": a,
                "from-sc": a,
                "from-sd": a,
                "from-tn": a,
                "from-tx": a,
                "from-ut": a,
                "from-va": a,
                "from-vt": a,
                "from-wa": a,
                "from-wi": a,
                "from-wv": a,
                "from-wy": a,
                getmyip: a,
                gotdns: a,
                "hobby-site": a,
                homelinux: a,
                homeunix: a,
                iamallama: a,
                "is-a-anarchist": a,
                "is-a-blogger": a,
                "is-a-bookkeeper": a,
                "is-a-bulls-fan": a,
                "is-a-caterer": a,
                "is-a-chef": a,
                "is-a-conservative": a,
                "is-a-cpa": a,
                "is-a-cubicle-slave": a,
                "is-a-democrat": a,
                "is-a-designer": a,
                "is-a-doctor": a,
                "is-a-financialadvisor": a,
                "is-a-geek": a,
                "is-a-green": a,
                "is-a-guru": a,
                "is-a-hard-worker": a,
                "is-a-hunter": a,
                "is-a-landscaper": a,
                "is-a-lawyer": a,
                "is-a-liberal": a,
                "is-a-libertarian": a,
                "is-a-llama": a,
                "is-a-musician": a,
                "is-a-nascarfan": a,
                "is-a-nurse": a,
                "is-a-painter": a,
                "is-a-personaltrainer": a,
                "is-a-photographer": a,
                "is-a-player": a,
                "is-a-republican": a,
                "is-a-rockstar": a,
                "is-a-socialist": a,
                "is-a-student": a,
                "is-a-teacher": a,
                "is-a-techie": a,
                "is-a-therapist": a,
                "is-an-accountant": a,
                "is-an-actor": a,
                "is-an-actress": a,
                "is-an-anarchist": a,
                "is-an-artist": a,
                "is-an-engineer": a,
                "is-an-entertainer": a,
                "is-certified": a,
                "is-gone": a,
                "is-into-anime": a,
                "is-into-cars": a,
                "is-into-cartoons": a,
                "is-into-games": a,
                "is-leet": a,
                "is-not-certified": a,
                "is-slick": a,
                "is-uberleet": a,
                "is-with-theband": a,
                "isa-geek": a,
                "isa-hockeynut": a,
                issmarterthanyou: a,
                "likes-pie": a,
                likescandy: a,
                "neat-url": a,
                "saves-the-whales": a,
                selfip: a,
                "sells-for-less": a,
                "sells-for-u": a,
                servebbs: a,
                "simple-url": a,
                "space-to-rent": a,
                "teaches-yoga": a,
                writesthisblog: a,
                digitaloceanspaces: n,
                ddnsfree: a,
                ddnsgeek: a,
                giize: a,
                gleeze: a,
                kozow: a,
                loseyourip: a,
                ooguy: a,
                theworkpc: a,
                mytuleap: a,
                "tuleap-partners": a,
                encoreapi: a,
                evennode: [
                  0,
                  { "eu-1": a, "eu-2": a, "eu-3": a, "eu-4": a, "us-1": a, "us-2": a, "us-3": a, "us-4": a },
                ],
                onfabrica: a,
                fbsbx: y,
                "fastly-edge": a,
                "fastly-terrarium": a,
                "fastvps-server": a,
                mydobiss: a,
                firebaseapp: a,
                fldrv: a,
                forgeblocks: a,
                framercanvas: a,
                "freebox-os": a,
                freeboxos: a,
                freemyip: a,
                gentapps: a,
                gentlentapis: a,
                githubusercontent: a,
                "0emm": n,
                appspot: [2, { r: n }],
                codespot: a,
                googleapis: a,
                googlecode: a,
                pagespeedmobilizer: a,
                publishproxy: a,
                withgoogle: a,
                withyoutube: a,
                blogspot: a,
                awsmppl: a,
                herokuapp: a,
                herokussl: a,
                impertrixcdn: a,
                impertrix: a,
                smushcdn: a,
                wphostedmail: a,
                wpmucdn: a,
                pixolino: a,
                amscompute: a,
                dopaas: a,
                "hosted-by-previder": v,
                hosteur: [0, { "rag-cloud": a, "rag-cloud-ch": a }],
                "ik-server": [0, { jcloud: a, "jcloud-ver-jpc": a }],
                jelastic: [0, { demo: a }],
                kilatiron: a,
                massivegrid: v,
                wafaicloud: [0, { jed: a, lon: a, ryd: a }],
                joyent: [0, { cns: n }],
                ktistory: a,
                lpusercontent: a,
                lmpm: w,
                linode: [0, { members: a, nodebalancer: n }],
                linodeobjects: n,
                linodeusercontent: [0, { ip: a }],
                barsycenter: a,
                barsyonline: a,
                mazeplay: a,
                miniserver: a,
                meteorapp: x,
                hostedpi: a,
                "mythic-beasts": [
                  0,
                  {
                    customer: a,
                    caracal: a,
                    fentiger: a,
                    lynx: a,
                    ocelot: a,
                    oncilla: a,
                    onza: a,
                    sphinx: a,
                    vs: a,
                    x: a,
                    yali: a,
                  },
                ],
                nospamproxy: r,
                "4u": a,
                nfshost: a,
                "001www": a,
                ddnslive: a,
                myiphost: a,
                blogsyte: a,
                ciscofreak: a,
                damnserver: a,
                ditchyourip: a,
                dnsiskinky: a,
                dynns: a,
                geekgalaxy: a,
                "health-carereform": a,
                homesecuritymac: a,
                homesecuritypc: a,
                myactivedirectory: a,
                mysecuritycamera: a,
                "net-freaks": a,
                onthewifi: a,
                point2this: a,
                quicksytes: a,
                securitytactics: a,
                serveexchange: a,
                servehumour: a,
                servep2p: a,
                servesarcasm: a,
                stufftoread: a,
                unusualperson: a,
                workisboring: a,
                "3utilities": a,
                ddnsking: a,
                myvnc: a,
                servebeer: a,
                servecounterstrike: a,
                serveftp: a,
                servegame: a,
                servehalflife: a,
                servehttp: a,
                serveirc: a,
                servemp3: a,
                servepics: a,
                servequake: a,
                observableusercontent: [0, { static: a }],
                simplesite: a,
                orsites: a,
                operaunite: a,
                "authgear-staging": a,
                authgearapps: a,
                skygearapp: a,
                outsystemscloud: a,
                ownprovider: a,
                pgfog: a,
                pagefrontapp: a,
                pagexl: a,
                paywhirl: n,
                gotpantheon: a,
                "platter-app": a,
                pleskns: a,
                "postman-echo": a,
                prgmr: [0, { xen: a }],
                pythonanywhere: x,
                qualifioapp: a,
                ladesk: a,
                qbuser: a,
                qa2: a,
                "dev-myqnapcloud": a,
                "alpha-myqnapcloud": a,
                myqnapcloud: a,
                quipelements: n,
                rackmaze: a,
                rhcloud: a,
                render: w,
                onrender: a,
                "180r": a,
                dojin: a,
                sakuratan: a,
                sakuraweb: a,
                x0: a,
                code: [0, { builder: n, "dev-builder": n, "stg-builder": n }],
                logoip: a,
                scrysec: a,
                "firewall-gateway": a,
                myshopblocks: a,
                myshopify: a,
                shopitsite: a,
                "1kapp": a,
                appchizi: a,
                applinzi: a,
                sinaapp: a,
                vipsinaapp: a,
                "bounty-full": [2, { alpha: a, beta: a }],
                streamlitapp: a,
                "try-snowplow": a,
                "stackhero-network": a,
                "playstation-cloud": a,
                myspreadshop: a,
                stdlib: [0, { api: a }],
                "temp-dns": a,
                dsmynas: a,
                familyds: a,
                mytabit: a,
                "tb-hosting": z,
                reservd: a,
                thingdustdata: a,
                bloxcms: a,
                "townnews-staging": a,
                typeform: [0, { pro: a }],
                hk: a,
                it: a,
                vultrobjects: n,
                wafflecell: a,
                "reserve-online": a,
                hotelwithflight: a,
                remotewd: a,
                wiardweb: j,
                messwithdns: a,
                "woltlab-demo": a,
                wpenginepowered: [2, { js: a }],
                wixsite: a,
                xnbay: [2, { u2: a, "u2-local": a }],
                yolasite: a,
              },
            ],
            coop: e,
            cr: [1, { ac: e, co: e, ed: e, fi: e, go: e, or: e, sa: e }],
            cu: [1, { com: e, edu: e, org: e, net: e, gov: e, inf: e }],
            cv: [1, { com: e, edu: e, int: e, nome: e, org: e, blogspot: a }],
            cw: S,
            cx: [1, { gov: e, ath: a, info: a }],
            cy: [
              1,
              {
                ac: e,
                biz: e,
                com: [1, { blogspot: a, scaleforce: $ }],
                ekloges: e,
                gov: e,
                ltd: e,
                mil: e,
                net: e,
                org: e,
                press: e,
                pro: e,
                tm: e,
              },
            ],
            cz: [
              1,
              {
                co: a,
                realm: a,
                e4: a,
                blogspot: a,
                metacentrum: [0, { cloud: n, custom: a }],
                muni: [0, { cloud: [0, { flt: a, usr: a }] }],
              },
            ],
            de: [
              1,
              {
                bplaced: a,
                square7: a,
                com: a,
                cosidns: [0, { dyn: a }],
                "dynamisches-dns": a,
                dnsupdater: a,
                "internet-dns": a,
                "l-o-g-i-n": a,
                dnshome: a,
                fuettertdasnetz: a,
                isteingeek: a,
                istmein: a,
                lebtimnetz: a,
                leitungsen: a,
                traeumtgerade: a,
                ddnss: [2, { dyn: a, dyndns: a }],
                dyndns1: a,
                "dyn-ip24": a,
                "home-webserver": [2, { dyn: a }],
                "myhome-server": a,
                frusky: n,
                goip: a,
                blogspot: a,
                "xn--gnstigbestellen-zvb": a,
                günstigbestellen: a,
                "xn--gnstigliefern-wob": a,
                günstigliefern: a,
                "hs-heilbronn": [0, { it: j }],
                "dyn-berlin": a,
                "in-berlin": a,
                "in-brb": a,
                "in-butter": a,
                "in-dsl": a,
                "in-vpn": a,
                iservschule: a,
                "mein-iserv": a,
                schulplattform: a,
                schulserver: a,
                "test-iserv": a,
                keymachine: a,
                "git-repos": a,
                "lcube-server": a,
                "svn-repos": a,
                barsy: a,
                "123webseite": a,
                logoip: a,
                "firewall-gateway": a,
                "my-gateway": a,
                "my-router": a,
                spdns: a,
                speedpartner: [0, { customer: a }],
                myspreadshop: a,
                "taifun-dns": a,
                "12hp": a,
                "2ix": a,
                "4lima": a,
                "lima-city": a,
                "dd-dns": a,
                "dray-dns": a,
                draydns: a,
                "dyn-vpn": a,
                dynvpn: a,
                "mein-vigor": a,
                "my-vigor": a,
                "my-wan": a,
                "syno-ds": a,
                "synology-diskstation": a,
                "synology-ds": a,
                uberspace: n,
                virtualuser: a,
                "virtual-user": a,
                "community-pro": a,
                diskussionsbereich: a,
              },
            ],
            dj: e,
            dk: [1, { biz: a, co: a, firm: a, reg: a, store: a, blogspot: a, "123hjemmeside": a, myspreadshop: a }],
            dm: t,
            do: [1, { art: e, com: e, edu: e, gob: e, gov: e, mil: e, net: e, org: e, sld: e, web: e }],
            dz: [1, { art: e, asso: e, com: e, edu: e, gov: e, org: e, net: e, pol: e, soc: e, tm: e }],
            ec: [
              1,
              {
                com: e,
                info: e,
                net: e,
                fin: e,
                k12: e,
                med: e,
                pro: e,
                org: e,
                edu: e,
                gov: e,
                gob: e,
                mil: e,
                base: a,
                official: a,
              },
            ],
            edu: [1, { rit: [0, { "git-pages": a }] }],
            ee: [1, { edu: e, gov: e, riik: e, lib: e, med: e, com: o, pri: e, aip: e, org: e, fie: e }],
            eg: [1, { com: o, edu: e, eun: e, gov: e, mil: e, name: e, net: e, org: e, sci: e }],
            er: s,
            es: [1, { com: o, nom: e, org: e, gob: e, edu: e, "123miweb": a, myspreadshop: a }],
            et: [1, { com: e, gov: e, org: e, edu: e, biz: e, name: e, info: e, net: e }],
            eu: [
              1,
              {
                airkitapps: a,
                mycd: a,
                cloudns: a,
                dogado: q,
                barsy: a,
                wellbeingzone: a,
                spdns: a,
                transurl: n,
                diskstation: a,
              },
            ],
            fi: [
              1,
              {
                aland: e,
                dy: a,
                blogspot: a,
                "xn--hkkinen-5wa": a,
                häkkinen: a,
                iki: a,
                cloudplatform: [0, { fi: a }],
                datacenter: [0, { demo: a, paas: a }],
                kapsi: a,
                "123kotisivu": a,
                myspreadshop: a,
              },
            ],
            fj: [1, { ac: e, biz: e, com: e, gov: e, info: e, mil: e, name: e, net: e, org: e, pro: e }],
            fk: s,
            fm: [1, { com: e, edu: e, net: e, org: e, radio: a, user: n }],
            fo: e,
            fr: [
              1,
              {
                asso: e,
                com: e,
                gouv: e,
                nom: e,
                prd: e,
                tm: e,
                aeroport: e,
                avocat: e,
                avoues: e,
                cci: e,
                chambagri: e,
                "chirurgiens-dentistes": e,
                "experts-comptables": e,
                "geometre-expert": e,
                greta: e,
                "huissier-justice": e,
                medecin: e,
                notaires: e,
                pharmacien: e,
                port: e,
                veterinaire: e,
                "en-root": a,
                "fbx-os": a,
                fbxos: a,
                "freebox-os": a,
                freeboxos: a,
                blogspot: a,
                goupile: a,
                "123siteweb": a,
                "on-web": a,
                "chirurgiens-dentistes-en-france": a,
                dedibox: a,
                myspreadshop: a,
                ynh: a,
              },
            ],
            ga: e,
            gb: e,
            gd: [1, { edu: e, gov: e }],
            ge: [1, { com: e, edu: e, gov: e, org: e, mil: e, net: e, pvt: e }],
            gf: e,
            gg: [1, { co: e, net: e, org: e, kaas: a, cya: a, panel: [2, { daemon: a }] }],
            gh: [1, { com: e, edu: e, gov: e, org: e, mil: e }],
            gi: [1, { com: e, ltd: e, gov: e, mod: e, edu: e, org: e }],
            gl: [1, { co: e, com: e, edu: e, net: e, org: e, biz: a, xx: a }],
            gm: e,
            gn: [1, { ac: e, com: e, edu: e, gov: e, org: e, net: e }],
            gov: e,
            gp: [1, { com: e, net: e, mobi: e, edu: e, org: e, asso: e, app: a }],
            gq: e,
            gr: [1, { com: e, edu: e, net: e, org: e, gov: e, blogspot: a, simplesite: a }],
            gs: e,
            gt: [1, { com: e, edu: e, gob: e, ind: e, mil: e, net: e, org: e, blog: a, de: a, to: a }],
            gu: [1, { com: e, edu: e, gov: e, guam: e, info: e, net: e, org: e, web: e }],
            gw: e,
            gy: [1, { co: e, com: e, edu: e, gov: e, net: e, org: e, be: a }],
            hk: [
              1,
              {
                com: e,
                edu: e,
                gov: e,
                idv: e,
                net: e,
                org: e,
                "xn--55qx5d": e,
                公司: e,
                "xn--wcvs22d": e,
                教育: e,
                "xn--lcvr32d": e,
                敎育: e,
                "xn--mxtq1m": e,
                政府: e,
                "xn--gmqw5a": e,
                個人: e,
                "xn--ciqpn": e,
                个人: e,
                "xn--gmq050i": e,
                箇人: e,
                "xn--zf0avx": e,
                網络: e,
                "xn--io0a7i": e,
                网络: e,
                "xn--mk0axi": e,
                组織: e,
                "xn--od0alg": e,
                網絡: e,
                "xn--od0aq3b": e,
                网絡: e,
                "xn--tn0ag": e,
                组织: e,
                "xn--uc0atv": e,
                組織: e,
                "xn--uc0ay4a": e,
                組织: e,
                blogspot: a,
                secaas: a,
                ltd: a,
                inc: a,
              },
            ],
            hm: e,
            hn: [1, { com: e, edu: e, org: e, net: e, mil: e, gob: e, cc: a }],
            hr: [1, { iz: e, from: e, name: e, com: e, blogspot: a, free: a }],
            ht: [
              1,
              {
                com: e,
                shop: e,
                firm: e,
                info: e,
                adult: e,
                net: e,
                pro: e,
                org: e,
                med: e,
                art: e,
                coop: e,
                pol: e,
                asso: e,
                edu: e,
                rel: e,
                gouv: e,
                perso: e,
              },
            ],
            hu: [
              1,
              {
                2e3: e,
                co: e,
                info: e,
                org: e,
                priv: e,
                sport: e,
                tm: e,
                agrar: e,
                bolt: e,
                casino: e,
                city: e,
                erotica: e,
                erotika: e,
                film: e,
                forum: e,
                games: e,
                hotel: e,
                ingatlan: e,
                jogasz: e,
                konyvelo: e,
                lakas: e,
                media: e,
                news: e,
                reklam: e,
                sex: e,
                shop: e,
                suli: e,
                szex: e,
                tozsde: e,
                utazas: e,
                video: e,
                blogspot: a,
              },
            ],
            id: [
              1,
              {
                ac: e,
                biz: e,
                co: o,
                desa: e,
                go: e,
                mil: e,
                my: [1, { rss: n }],
                net: e,
                or: e,
                ponpes: e,
                sch: e,
                web: e,
                flap: a,
                forte: a,
              },
            ],
            ie: [1, { gov: e, blogspot: a, myspreadshop: a }],
            il: [
              1,
              {
                ac: e,
                co: [1, { ravpage: a, blogspot: a, tabitorder: a, mytabit: a }],
                gov: e,
                idf: e,
                k12: e,
                muni: e,
                net: e,
                org: e,
              },
            ],
            "xn--4dbrk0ce": [1, { "xn--4dbgdty6c": e, "xn--5dbhl8d": e, "xn--8dbq2a": e, "xn--hebda8b": e }],
            ישראל: [1, { אקדמיה: e, ישוב: e, צהל: e, ממשל: e }],
            im: [1, { ac: e, co: [1, { ltd: e, plc: e }], com: e, net: e, org: e, tt: e, tv: e, ro: a }],
            in: [
              1,
              {
                "5g": e,
                "6g": e,
                ac: e,
                ai: e,
                am: e,
                bihar: e,
                biz: e,
                business: e,
                ca: e,
                cn: e,
                co: e,
                com: e,
                coop: e,
                cs: e,
                delhi: e,
                dr: e,
                edu: e,
                er: e,
                firm: e,
                gen: e,
                gov: e,
                gujarat: e,
                ind: e,
                info: e,
                int: e,
                internet: e,
                io: e,
                me: e,
                mil: e,
                net: e,
                nic: e,
                org: e,
                pg: e,
                post: e,
                pro: e,
                res: e,
                travel: e,
                tv: e,
                uk: e,
                up: e,
                us: e,
                web: a,
                cloudns: a,
                blogspot: a,
                barsy: a,
                supabase: a,
              },
            ],
            info: [
              1,
              {
                cloudns: a,
                "dynamic-dns": a,
                dyndns: a,
                "barrel-of-knowledge": a,
                "barrell-of-knowledge": a,
                "for-our": a,
                "groks-the": a,
                "groks-this": a,
                "here-for-more": a,
                knowsitall: a,
                selfip: a,
                webhop: a,
                barsy: a,
                mayfirst: a,
                forumz: a,
                nsupdate: a,
                dvrcam: a,
                ilovecollege: a,
                "no-ip": a,
                dnsupdate: a,
                "v-info": a,
              },
            ],
            int: [1, { eu: e }],
            io: [
              1,
              {
                2038: a,
                com: e,
                "on-acorn": n,
                apigee: a,
                "b-data": a,
                backplaneapp: a,
                banzaicloud: [0, { app: a, backyards: n }],
                beagleboard: a,
                bitbucket: a,
                bluebite: a,
                boxfuse: a,
                browsersafetymark: a,
                bigv: [0, { uk0: a }],
                cleverapps: a,
                dappnode: [0, { dyndns: a }],
                dedyn: a,
                drud: a,
                definima: a,
                "fh-muenster": a,
                shw: a,
                forgerock: [0, { id: a }],
                ghost: a,
                github: a,
                gitlab: a,
                lolipop: a,
                "hasura-app": a,
                hostyhosting: a,
                moonscale: n,
                beebyte: v,
                beebyteapp: [0, { sekd1: a }],
                jele: a,
                unispace: [0, { "cloud-fr1": a }],
                webthings: a,
                loginline: a,
                barsy: a,
                azurecontainer: n,
                ngrok: [2, { ap: a, au: a, eu: a, in: a, jp: a, sa: a, us: a }],
                nodeart: [0, { stage: a }],
                nid: a,
                pantheonsite: a,
                dyn53: a,
                pstmn: [2, { mock: a }],
                protonet: a,
                qoto: a,
                qcx: [2, { sys: n }],
                vaporcloud: a,
                vbrplsbx: [0, { g: a }],
                "on-k3s": n,
                "on-rio": n,
                readthedocs: a,
                resindevice: a,
                resinstaging: [0, { devices: a }],
                hzc: a,
                sandcats: a,
                shiftcrypto: a,
                shiftedit: a,
                "mo-siemens": a,
                musician: a,
                lair: y,
                stolos: n,
                spacekit: a,
                utwente: a,
                s5y: n,
                edugit: a,
                telebit: a,
                thingdust: [0, { dev: C, disrec: C, prod: U, testing: C }],
                tickets: a,
                upli: a,
                wedeploy: a,
                editorx: a,
                basicserver: a,
                virtualserver: a,
              },
            ],
            iq: D,
            ir: [
              1,
              {
                ac: e,
                co: e,
                gov: e,
                id: e,
                net: e,
                org: e,
                sch: e,
                "xn--mgba3a4f16a": e,
                ایران: e,
                "xn--mgba3a4fra": e,
                ايران: e,
              },
            ],
            is: [1, { net: e, com: e, edu: e, gov: e, org: e, int: e, cupcake: a, blogspot: a }],
            it: [
              1,
              {
                gov: e,
                edu: e,
                abr: e,
                abruzzo: e,
                "aosta-valley": e,
                aostavalley: e,
                bas: e,
                basilicata: e,
                cal: e,
                calabria: e,
                cam: e,
                campania: e,
                "emilia-romagna": e,
                emiliaromagna: e,
                emr: e,
                "friuli-v-giulia": e,
                "friuli-ve-giulia": e,
                "friuli-vegiulia": e,
                "friuli-venezia-giulia": e,
                "friuli-veneziagiulia": e,
                "friuli-vgiulia": e,
                "friuliv-giulia": e,
                "friulive-giulia": e,
                friulivegiulia: e,
                "friulivenezia-giulia": e,
                friuliveneziagiulia: e,
                friulivgiulia: e,
                fvg: e,
                laz: e,
                lazio: e,
                lig: e,
                liguria: e,
                lom: e,
                lombardia: e,
                lombardy: e,
                lucania: e,
                mar: e,
                marche: e,
                mol: e,
                molise: e,
                piedmont: e,
                piemonte: e,
                pmn: e,
                pug: e,
                puglia: e,
                sar: e,
                sardegna: e,
                sardinia: e,
                sic: e,
                sicilia: e,
                sicily: e,
                taa: e,
                tos: e,
                toscana: e,
                "trentin-sud-tirol": e,
                "xn--trentin-sd-tirol-rzb": e,
                "trentin-s\xfcd-tirol": e,
                "trentin-sudtirol": e,
                "xn--trentin-sdtirol-7vb": e,
                "trentin-s\xfcdtirol": e,
                "trentin-sued-tirol": e,
                "trentin-suedtirol": e,
                "trentino-a-adige": e,
                "trentino-aadige": e,
                "trentino-alto-adige": e,
                "trentino-altoadige": e,
                "trentino-s-tirol": e,
                "trentino-stirol": e,
                "trentino-sud-tirol": e,
                "xn--trentino-sd-tirol-c3b": e,
                "trentino-s\xfcd-tirol": e,
                "trentino-sudtirol": e,
                "xn--trentino-sdtirol-szb": e,
                "trentino-s\xfcdtirol": e,
                "trentino-sued-tirol": e,
                "trentino-suedtirol": e,
                trentino: e,
                "trentinoa-adige": e,
                trentinoaadige: e,
                "trentinoalto-adige": e,
                trentinoaltoadige: e,
                "trentinos-tirol": e,
                trentinostirol: e,
                "trentinosud-tirol": e,
                "xn--trentinosd-tirol-rzb": e,
                "trentinos\xfcd-tirol": e,
                trentinosudtirol: e,
                "xn--trentinosdtirol-7vb": e,
                trentinosüdtirol: e,
                "trentinosued-tirol": e,
                trentinosuedtirol: e,
                "trentinsud-tirol": e,
                "xn--trentinsd-tirol-6vb": e,
                "trentins\xfcd-tirol": e,
                trentinsudtirol: e,
                "xn--trentinsdtirol-nsb": e,
                trentinsüdtirol: e,
                "trentinsued-tirol": e,
                trentinsuedtirol: e,
                tuscany: e,
                umb: e,
                umbria: e,
                "val-d-aosta": e,
                "val-daosta": e,
                "vald-aosta": e,
                valdaosta: e,
                "valle-aosta": e,
                "valle-d-aosta": e,
                "valle-daosta": e,
                valleaosta: e,
                "valled-aosta": e,
                valledaosta: e,
                "vallee-aoste": e,
                "xn--valle-aoste-ebb": e,
                "vall\xe9e-aoste": e,
                "vallee-d-aoste": e,
                "xn--valle-d-aoste-ehb": e,
                "vall\xe9e-d-aoste": e,
                valleeaoste: e,
                "xn--valleaoste-e7a": e,
                valléeaoste: e,
                valleedaoste: e,
                "xn--valledaoste-ebb": e,
                valléedaoste: e,
                vao: e,
                vda: e,
                ven: e,
                veneto: e,
                ag: e,
                agrigento: e,
                al: e,
                alessandria: e,
                "alto-adige": e,
                altoadige: e,
                an: e,
                ancona: e,
                "andria-barletta-trani": e,
                "andria-trani-barletta": e,
                andriabarlettatrani: e,
                andriatranibarletta: e,
                ao: e,
                aosta: e,
                aoste: e,
                ap: e,
                aq: e,
                aquila: e,
                ar: e,
                arezzo: e,
                "ascoli-piceno": e,
                ascolipiceno: e,
                asti: e,
                at: e,
                av: e,
                avellino: e,
                ba: e,
                "balsan-sudtirol": e,
                "xn--balsan-sdtirol-nsb": e,
                "balsan-s\xfcdtirol": e,
                "balsan-suedtirol": e,
                balsan: e,
                bari: e,
                "barletta-trani-andria": e,
                barlettatraniandria: e,
                belluno: e,
                benevento: e,
                bergamo: e,
                bg: e,
                bi: e,
                biella: e,
                bl: e,
                bn: e,
                bo: e,
                bologna: e,
                "bolzano-altoadige": e,
                bolzano: e,
                "bozen-sudtirol": e,
                "xn--bozen-sdtirol-2ob": e,
                "bozen-s\xfcdtirol": e,
                "bozen-suedtirol": e,
                bozen: e,
                br: e,
                brescia: e,
                brindisi: e,
                bs: e,
                bt: e,
                "bulsan-sudtirol": e,
                "xn--bulsan-sdtirol-nsb": e,
                "bulsan-s\xfcdtirol": e,
                "bulsan-suedtirol": e,
                bulsan: e,
                bz: e,
                ca: e,
                cagliari: e,
                caltanissetta: e,
                "campidano-medio": e,
                campidanomedio: e,
                campobasso: e,
                "carbonia-iglesias": e,
                carboniaiglesias: e,
                "carrara-massa": e,
                carraramassa: e,
                caserta: e,
                catania: e,
                catanzaro: e,
                cb: e,
                ce: e,
                "cesena-forli": e,
                "xn--cesena-forl-mcb": e,
                "cesena-forl\xec": e,
                cesenaforli: e,
                "xn--cesenaforl-i8a": e,
                cesenaforlì: e,
                ch: e,
                chieti: e,
                ci: e,
                cl: e,
                cn: e,
                co: e,
                como: e,
                cosenza: e,
                cr: e,
                cremona: e,
                crotone: e,
                cs: e,
                ct: e,
                cuneo: e,
                cz: e,
                "dell-ogliastra": e,
                dellogliastra: e,
                en: e,
                enna: e,
                fc: e,
                fe: e,
                fermo: e,
                ferrara: e,
                fg: e,
                fi: e,
                firenze: e,
                florence: e,
                fm: e,
                foggia: e,
                "forli-cesena": e,
                "xn--forl-cesena-fcb": e,
                "forl\xec-cesena": e,
                forlicesena: e,
                "xn--forlcesena-c8a": e,
                forlìcesena: e,
                fr: e,
                frosinone: e,
                ge: e,
                genoa: e,
                genova: e,
                go: e,
                gorizia: e,
                gr: e,
                grosseto: e,
                "iglesias-carbonia": e,
                iglesiascarbonia: e,
                im: e,
                imperia: e,
                is: e,
                isernia: e,
                kr: e,
                "la-spezia": e,
                laquila: e,
                laspezia: e,
                latina: e,
                lc: e,
                le: e,
                lecce: e,
                lecco: e,
                li: e,
                livorno: e,
                lo: e,
                lodi: e,
                lt: e,
                lu: e,
                lucca: e,
                macerata: e,
                mantova: e,
                "massa-carrara": e,
                massacarrara: e,
                matera: e,
                mb: e,
                mc: e,
                me: e,
                "medio-campidano": e,
                mediocampidano: e,
                messina: e,
                mi: e,
                milan: e,
                milano: e,
                mn: e,
                mo: e,
                modena: e,
                "monza-brianza": e,
                "monza-e-della-brianza": e,
                monza: e,
                monzabrianza: e,
                monzaebrianza: e,
                monzaedellabrianza: e,
                ms: e,
                mt: e,
                na: e,
                naples: e,
                napoli: e,
                no: e,
                novara: e,
                nu: e,
                nuoro: e,
                og: e,
                ogliastra: e,
                "olbia-tempio": e,
                olbiatempio: e,
                or: e,
                oristano: e,
                ot: e,
                pa: e,
                padova: e,
                padua: e,
                palermo: e,
                parma: e,
                pavia: e,
                pc: e,
                pd: e,
                pe: e,
                perugia: e,
                "pesaro-urbino": e,
                pesarourbino: e,
                pescara: e,
                pg: e,
                pi: e,
                piacenza: e,
                pisa: e,
                pistoia: e,
                pn: e,
                po: e,
                pordenone: e,
                potenza: e,
                pr: e,
                prato: e,
                pt: e,
                pu: e,
                pv: e,
                pz: e,
                ra: e,
                ragusa: e,
                ravenna: e,
                rc: e,
                re: e,
                "reggio-calabria": e,
                "reggio-emilia": e,
                reggiocalabria: e,
                reggioemilia: e,
                rg: e,
                ri: e,
                rieti: e,
                rimini: e,
                rm: e,
                rn: e,
                ro: e,
                roma: e,
                rome: e,
                rovigo: e,
                sa: e,
                salerno: e,
                sassari: e,
                savona: e,
                si: e,
                siena: e,
                siracusa: e,
                so: e,
                sondrio: e,
                sp: e,
                sr: e,
                ss: e,
                suedtirol: e,
                "xn--sdtirol-n2a": e,
                südtirol: e,
                sv: e,
                ta: e,
                taranto: e,
                te: e,
                "tempio-olbia": e,
                tempioolbia: e,
                teramo: e,
                terni: e,
                tn: e,
                to: e,
                torino: e,
                tp: e,
                tr: e,
                "trani-andria-barletta": e,
                "trani-barletta-andria": e,
                traniandriabarletta: e,
                tranibarlettaandria: e,
                trapani: e,
                trento: e,
                treviso: e,
                trieste: e,
                ts: e,
                turin: e,
                tv: e,
                ud: e,
                udine: e,
                "urbino-pesaro": e,
                urbinopesaro: e,
                va: e,
                varese: e,
                vb: e,
                vc: e,
                ve: e,
                venezia: e,
                venice: e,
                verbania: e,
                vercelli: e,
                verona: e,
                vi: e,
                "vibo-valentia": e,
                vibovalentia: e,
                vicenza: e,
                viterbo: e,
                vr: e,
                vs: e,
                vt: e,
                vv: e,
                blogspot: a,
                ibxos: a,
                iliadboxos: a,
                neen: [0, { jc: a }],
                tim: [0, { open: [0, { jelastic: r }] }],
                "16-b": a,
                "32-b": a,
                "64-b": a,
                "123homepage": a,
                myspreadshop: a,
                syncloud: a,
              },
            ],
            je: [1, { co: e, net: e, org: e, of: a }],
            jm: s,
            jo: [1, { com: e, org: e, net: e, edu: e, sch: e, gov: e, mil: e, name: e }],
            jobs: e,
            jp: [
              1,
              {
                ac: e,
                ad: e,
                co: e,
                ed: e,
                go: e,
                gr: e,
                lg: e,
                ne: [
                  1,
                  {
                    aseinet: I,
                    gehirn: a,
                    ivory: a,
                    "mail-box": a,
                    mints: a,
                    mokuren: a,
                    opal: a,
                    sakura: a,
                    sumomo: a,
                    topaz: a,
                  },
                ],
                or: e,
                aichi: [
                  1,
                  {
                    aisai: e,
                    ama: e,
                    anjo: e,
                    asuke: e,
                    chiryu: e,
                    chita: e,
                    fuso: e,
                    gamagori: e,
                    handa: e,
                    hazu: e,
                    hekinan: e,
                    higashiura: e,
                    ichinomiya: e,
                    inazawa: e,
                    inuyama: e,
                    isshiki: e,
                    iwakura: e,
                    kanie: e,
                    kariya: e,
                    kasugai: e,
                    kira: e,
                    kiyosu: e,
                    komaki: e,
                    konan: e,
                    kota: e,
                    mihama: e,
                    miyoshi: e,
                    nishio: e,
                    nisshin: e,
                    obu: e,
                    oguchi: e,
                    oharu: e,
                    okazaki: e,
                    owariasahi: e,
                    seto: e,
                    shikatsu: e,
                    shinshiro: e,
                    shitara: e,
                    tahara: e,
                    takahama: e,
                    tobishima: e,
                    toei: e,
                    togo: e,
                    tokai: e,
                    tokoname: e,
                    toyoake: e,
                    toyohashi: e,
                    toyokawa: e,
                    toyone: e,
                    toyota: e,
                    tsushima: e,
                    yatomi: e,
                  },
                ],
                akita: [
                  1,
                  {
                    akita: e,
                    daisen: e,
                    fujisato: e,
                    gojome: e,
                    hachirogata: e,
                    happou: e,
                    higashinaruse: e,
                    honjo: e,
                    honjyo: e,
                    ikawa: e,
                    kamikoani: e,
                    kamioka: e,
                    katagami: e,
                    kazuno: e,
                    kitaakita: e,
                    kosaka: e,
                    kyowa: e,
                    misato: e,
                    mitane: e,
                    moriyoshi: e,
                    nikaho: e,
                    noshiro: e,
                    odate: e,
                    oga: e,
                    ogata: e,
                    semboku: e,
                    yokote: e,
                    yurihonjo: e,
                  },
                ],
                aomori: [
                  1,
                  {
                    aomori: e,
                    gonohe: e,
                    hachinohe: e,
                    hashikami: e,
                    hiranai: e,
                    hirosaki: e,
                    itayanagi: e,
                    kuroishi: e,
                    misawa: e,
                    mutsu: e,
                    nakadomari: e,
                    noheji: e,
                    oirase: e,
                    owani: e,
                    rokunohe: e,
                    sannohe: e,
                    shichinohe: e,
                    shingo: e,
                    takko: e,
                    towada: e,
                    tsugaru: e,
                    tsuruta: e,
                  },
                ],
                chiba: [
                  1,
                  {
                    abiko: e,
                    asahi: e,
                    chonan: e,
                    chosei: e,
                    choshi: e,
                    chuo: e,
                    funabashi: e,
                    futtsu: e,
                    hanamigawa: e,
                    ichihara: e,
                    ichikawa: e,
                    ichinomiya: e,
                    inzai: e,
                    isumi: e,
                    kamagaya: e,
                    kamogawa: e,
                    kashiwa: e,
                    katori: e,
                    katsuura: e,
                    kimitsu: e,
                    kisarazu: e,
                    kozaki: e,
                    kujukuri: e,
                    kyonan: e,
                    matsudo: e,
                    midori: e,
                    mihama: e,
                    minamiboso: e,
                    mobara: e,
                    mutsuzawa: e,
                    nagara: e,
                    nagareyama: e,
                    narashino: e,
                    narita: e,
                    noda: e,
                    oamishirasato: e,
                    omigawa: e,
                    onjuku: e,
                    otaki: e,
                    sakae: e,
                    sakura: e,
                    shimofusa: e,
                    shirako: e,
                    shiroi: e,
                    shisui: e,
                    sodegaura: e,
                    sosa: e,
                    tako: e,
                    tateyama: e,
                    togane: e,
                    tohnosho: e,
                    tomisato: e,
                    urayasu: e,
                    yachimata: e,
                    yachiyo: e,
                    yokaichiba: e,
                    yokoshibahikari: e,
                    yotsukaido: e,
                  },
                ],
                ehime: [
                  1,
                  {
                    ainan: e,
                    honai: e,
                    ikata: e,
                    imabari: e,
                    iyo: e,
                    kamijima: e,
                    kihoku: e,
                    kumakogen: e,
                    masaki: e,
                    matsuno: e,
                    matsuyama: e,
                    namikata: e,
                    niihama: e,
                    ozu: e,
                    saijo: e,
                    seiyo: e,
                    shikokuchuo: e,
                    tobe: e,
                    toon: e,
                    uchiko: e,
                    uwajima: e,
                    yawatahama: e,
                  },
                ],
                fukui: [
                  1,
                  {
                    echizen: e,
                    eiheiji: e,
                    fukui: e,
                    ikeda: e,
                    katsuyama: e,
                    mihama: e,
                    minamiechizen: e,
                    obama: e,
                    ohi: e,
                    ono: e,
                    sabae: e,
                    sakai: e,
                    takahama: e,
                    tsuruga: e,
                    wakasa: e,
                  },
                ],
                fukuoka: [
                  1,
                  {
                    ashiya: e,
                    buzen: e,
                    chikugo: e,
                    chikuho: e,
                    chikujo: e,
                    chikushino: e,
                    chikuzen: e,
                    chuo: e,
                    dazaifu: e,
                    fukuchi: e,
                    hakata: e,
                    higashi: e,
                    hirokawa: e,
                    hisayama: e,
                    iizuka: e,
                    inatsuki: e,
                    kaho: e,
                    kasuga: e,
                    kasuya: e,
                    kawara: e,
                    keisen: e,
                    koga: e,
                    kurate: e,
                    kurogi: e,
                    kurume: e,
                    minami: e,
                    miyako: e,
                    miyama: e,
                    miyawaka: e,
                    mizumaki: e,
                    munakata: e,
                    nakagawa: e,
                    nakama: e,
                    nishi: e,
                    nogata: e,
                    ogori: e,
                    okagaki: e,
                    okawa: e,
                    oki: e,
                    omuta: e,
                    onga: e,
                    onojo: e,
                    oto: e,
                    saigawa: e,
                    sasaguri: e,
                    shingu: e,
                    shinyoshitomi: e,
                    shonai: e,
                    soeda: e,
                    sue: e,
                    tachiarai: e,
                    tagawa: e,
                    takata: e,
                    toho: e,
                    toyotsu: e,
                    tsuiki: e,
                    ukiha: e,
                    umi: e,
                    usui: e,
                    yamada: e,
                    yame: e,
                    yanagawa: e,
                    yukuhashi: e,
                  },
                ],
                fukushima: [
                  1,
                  {
                    aizubange: e,
                    aizumisato: e,
                    aizuwakamatsu: e,
                    asakawa: e,
                    bandai: e,
                    date: e,
                    fukushima: e,
                    furudono: e,
                    futaba: e,
                    hanawa: e,
                    higashi: e,
                    hirata: e,
                    hirono: e,
                    iitate: e,
                    inawashiro: e,
                    ishikawa: e,
                    iwaki: e,
                    izumizaki: e,
                    kagamiishi: e,
                    kaneyama: e,
                    kawamata: e,
                    kitakata: e,
                    kitashiobara: e,
                    koori: e,
                    koriyama: e,
                    kunimi: e,
                    miharu: e,
                    mishima: e,
                    namie: e,
                    nango: e,
                    nishiaizu: e,
                    nishigo: e,
                    okuma: e,
                    omotego: e,
                    ono: e,
                    otama: e,
                    samegawa: e,
                    shimogo: e,
                    shirakawa: e,
                    showa: e,
                    soma: e,
                    sukagawa: e,
                    taishin: e,
                    tamakawa: e,
                    tanagura: e,
                    tenei: e,
                    yabuki: e,
                    yamato: e,
                    yamatsuri: e,
                    yanaizu: e,
                    yugawa: e,
                  },
                ],
                gifu: [
                  1,
                  {
                    anpachi: e,
                    ena: e,
                    gifu: e,
                    ginan: e,
                    godo: e,
                    gujo: e,
                    hashima: e,
                    hichiso: e,
                    hida: e,
                    higashishirakawa: e,
                    ibigawa: e,
                    ikeda: e,
                    kakamigahara: e,
                    kani: e,
                    kasahara: e,
                    kasamatsu: e,
                    kawaue: e,
                    kitagata: e,
                    mino: e,
                    minokamo: e,
                    mitake: e,
                    mizunami: e,
                    motosu: e,
                    nakatsugawa: e,
                    ogaki: e,
                    sakahogi: e,
                    seki: e,
                    sekigahara: e,
                    shirakawa: e,
                    tajimi: e,
                    takayama: e,
                    tarui: e,
                    toki: e,
                    tomika: e,
                    wanouchi: e,
                    yamagata: e,
                    yaotsu: e,
                    yoro: e,
                  },
                ],
                gunma: [
                  1,
                  {
                    annaka: e,
                    chiyoda: e,
                    fujioka: e,
                    higashiagatsuma: e,
                    isesaki: e,
                    itakura: e,
                    kanna: e,
                    kanra: e,
                    katashina: e,
                    kawaba: e,
                    kiryu: e,
                    kusatsu: e,
                    maebashi: e,
                    meiwa: e,
                    midori: e,
                    minakami: e,
                    naganohara: e,
                    nakanojo: e,
                    nanmoku: e,
                    numata: e,
                    oizumi: e,
                    ora: e,
                    ota: e,
                    shibukawa: e,
                    shimonita: e,
                    shinto: e,
                    showa: e,
                    takasaki: e,
                    takayama: e,
                    tamamura: e,
                    tatebayashi: e,
                    tomioka: e,
                    tsukiyono: e,
                    tsumagoi: e,
                    ueno: e,
                    yoshioka: e,
                  },
                ],
                hiroshima: [
                  1,
                  {
                    asaminami: e,
                    daiwa: e,
                    etajima: e,
                    fuchu: e,
                    fukuyama: e,
                    hatsukaichi: e,
                    higashihiroshima: e,
                    hongo: e,
                    jinsekikogen: e,
                    kaita: e,
                    kui: e,
                    kumano: e,
                    kure: e,
                    mihara: e,
                    miyoshi: e,
                    naka: e,
                    onomichi: e,
                    osakikamijima: e,
                    otake: e,
                    saka: e,
                    sera: e,
                    seranishi: e,
                    shinichi: e,
                    shobara: e,
                    takehara: e,
                  },
                ],
                hokkaido: [
                  1,
                  {
                    abashiri: e,
                    abira: e,
                    aibetsu: e,
                    akabira: e,
                    akkeshi: e,
                    asahikawa: e,
                    ashibetsu: e,
                    ashoro: e,
                    assabu: e,
                    atsuma: e,
                    bibai: e,
                    biei: e,
                    bifuka: e,
                    bihoro: e,
                    biratori: e,
                    chippubetsu: e,
                    chitose: e,
                    date: e,
                    ebetsu: e,
                    embetsu: e,
                    eniwa: e,
                    erimo: e,
                    esan: e,
                    esashi: e,
                    fukagawa: e,
                    fukushima: e,
                    furano: e,
                    furubira: e,
                    haboro: e,
                    hakodate: e,
                    hamatonbetsu: e,
                    hidaka: e,
                    higashikagura: e,
                    higashikawa: e,
                    hiroo: e,
                    hokuryu: e,
                    hokuto: e,
                    honbetsu: e,
                    horokanai: e,
                    horonobe: e,
                    ikeda: e,
                    imakane: e,
                    ishikari: e,
                    iwamizawa: e,
                    iwanai: e,
                    kamifurano: e,
                    kamikawa: e,
                    kamishihoro: e,
                    kamisunagawa: e,
                    kamoenai: e,
                    kayabe: e,
                    kembuchi: e,
                    kikonai: e,
                    kimobetsu: e,
                    kitahiroshima: e,
                    kitami: e,
                    kiyosato: e,
                    koshimizu: e,
                    kunneppu: e,
                    kuriyama: e,
                    kuromatsunai: e,
                    kushiro: e,
                    kutchan: e,
                    kyowa: e,
                    mashike: e,
                    matsumae: e,
                    mikasa: e,
                    minamifurano: e,
                    mombetsu: e,
                    moseushi: e,
                    mukawa: e,
                    muroran: e,
                    naie: e,
                    nakagawa: e,
                    nakasatsunai: e,
                    nakatombetsu: e,
                    nanae: e,
                    nanporo: e,
                    nayoro: e,
                    nemuro: e,
                    niikappu: e,
                    niki: e,
                    nishiokoppe: e,
                    noboribetsu: e,
                    numata: e,
                    obihiro: e,
                    obira: e,
                    oketo: e,
                    okoppe: e,
                    otaru: e,
                    otobe: e,
                    otofuke: e,
                    otoineppu: e,
                    oumu: e,
                    ozora: e,
                    pippu: e,
                    rankoshi: e,
                    rebun: e,
                    rikubetsu: e,
                    rishiri: e,
                    rishirifuji: e,
                    saroma: e,
                    sarufutsu: e,
                    shakotan: e,
                    shari: e,
                    shibecha: e,
                    shibetsu: e,
                    shikabe: e,
                    shikaoi: e,
                    shimamaki: e,
                    shimizu: e,
                    shimokawa: e,
                    shinshinotsu: e,
                    shintoku: e,
                    shiranuka: e,
                    shiraoi: e,
                    shiriuchi: e,
                    sobetsu: e,
                    sunagawa: e,
                    taiki: e,
                    takasu: e,
                    takikawa: e,
                    takinoue: e,
                    teshikaga: e,
                    tobetsu: e,
                    tohma: e,
                    tomakomai: e,
                    tomari: e,
                    toya: e,
                    toyako: e,
                    toyotomi: e,
                    toyoura: e,
                    tsubetsu: e,
                    tsukigata: e,
                    urakawa: e,
                    urausu: e,
                    uryu: e,
                    utashinai: e,
                    wakkanai: e,
                    wassamu: e,
                    yakumo: e,
                    yoichi: e,
                  },
                ],
                hyogo: [
                  1,
                  {
                    aioi: e,
                    akashi: e,
                    ako: e,
                    amagasaki: e,
                    aogaki: e,
                    asago: e,
                    ashiya: e,
                    awaji: e,
                    fukusaki: e,
                    goshiki: e,
                    harima: e,
                    himeji: e,
                    ichikawa: e,
                    inagawa: e,
                    itami: e,
                    kakogawa: e,
                    kamigori: e,
                    kamikawa: e,
                    kasai: e,
                    kasuga: e,
                    kawanishi: e,
                    miki: e,
                    minamiawaji: e,
                    nishinomiya: e,
                    nishiwaki: e,
                    ono: e,
                    sanda: e,
                    sannan: e,
                    sasayama: e,
                    sayo: e,
                    shingu: e,
                    shinonsen: e,
                    shiso: e,
                    sumoto: e,
                    taishi: e,
                    taka: e,
                    takarazuka: e,
                    takasago: e,
                    takino: e,
                    tamba: e,
                    tatsuno: e,
                    toyooka: e,
                    yabu: e,
                    yashiro: e,
                    yoka: e,
                    yokawa: e,
                  },
                ],
                ibaraki: [
                  1,
                  {
                    ami: e,
                    asahi: e,
                    bando: e,
                    chikusei: e,
                    daigo: e,
                    fujishiro: e,
                    hitachi: e,
                    hitachinaka: e,
                    hitachiomiya: e,
                    hitachiota: e,
                    ibaraki: e,
                    ina: e,
                    inashiki: e,
                    itako: e,
                    iwama: e,
                    joso: e,
                    kamisu: e,
                    kasama: e,
                    kashima: e,
                    kasumigaura: e,
                    koga: e,
                    miho: e,
                    mito: e,
                    moriya: e,
                    naka: e,
                    namegata: e,
                    oarai: e,
                    ogawa: e,
                    omitama: e,
                    ryugasaki: e,
                    sakai: e,
                    sakuragawa: e,
                    shimodate: e,
                    shimotsuma: e,
                    shirosato: e,
                    sowa: e,
                    suifu: e,
                    takahagi: e,
                    tamatsukuri: e,
                    tokai: e,
                    tomobe: e,
                    tone: e,
                    toride: e,
                    tsuchiura: e,
                    tsukuba: e,
                    uchihara: e,
                    ushiku: e,
                    yachiyo: e,
                    yamagata: e,
                    yawara: e,
                    yuki: e,
                  },
                ],
                ishikawa: [
                  1,
                  {
                    anamizu: e,
                    hakui: e,
                    hakusan: e,
                    kaga: e,
                    kahoku: e,
                    kanazawa: e,
                    kawakita: e,
                    komatsu: e,
                    nakanoto: e,
                    nanao: e,
                    nomi: e,
                    nonoichi: e,
                    noto: e,
                    shika: e,
                    suzu: e,
                    tsubata: e,
                    tsurugi: e,
                    uchinada: e,
                    wajima: e,
                  },
                ],
                iwate: [
                  1,
                  {
                    fudai: e,
                    fujisawa: e,
                    hanamaki: e,
                    hiraizumi: e,
                    hirono: e,
                    ichinohe: e,
                    ichinoseki: e,
                    iwaizumi: e,
                    iwate: e,
                    joboji: e,
                    kamaishi: e,
                    kanegasaki: e,
                    karumai: e,
                    kawai: e,
                    kitakami: e,
                    kuji: e,
                    kunohe: e,
                    kuzumaki: e,
                    miyako: e,
                    mizusawa: e,
                    morioka: e,
                    ninohe: e,
                    noda: e,
                    ofunato: e,
                    oshu: e,
                    otsuchi: e,
                    rikuzentakata: e,
                    shiwa: e,
                    shizukuishi: e,
                    sumita: e,
                    tanohata: e,
                    tono: e,
                    yahaba: e,
                    yamada: e,
                  },
                ],
                kagawa: [
                  1,
                  {
                    ayagawa: e,
                    higashikagawa: e,
                    kanonji: e,
                    kotohira: e,
                    manno: e,
                    marugame: e,
                    mitoyo: e,
                    naoshima: e,
                    sanuki: e,
                    tadotsu: e,
                    takamatsu: e,
                    tonosho: e,
                    uchinomi: e,
                    utazu: e,
                    zentsuji: e,
                  },
                ],
                kagoshima: [
                  1,
                  {
                    akune: e,
                    amami: e,
                    hioki: e,
                    isa: e,
                    isen: e,
                    izumi: e,
                    kagoshima: e,
                    kanoya: e,
                    kawanabe: e,
                    kinko: e,
                    kouyama: e,
                    makurazaki: e,
                    matsumoto: e,
                    minamitane: e,
                    nakatane: e,
                    nishinoomote: e,
                    satsumasendai: e,
                    soo: e,
                    tarumizu: e,
                    yusui: e,
                  },
                ],
                kanagawa: [
                  1,
                  {
                    aikawa: e,
                    atsugi: e,
                    ayase: e,
                    chigasaki: e,
                    ebina: e,
                    fujisawa: e,
                    hadano: e,
                    hakone: e,
                    hiratsuka: e,
                    isehara: e,
                    kaisei: e,
                    kamakura: e,
                    kiyokawa: e,
                    matsuda: e,
                    minamiashigara: e,
                    miura: e,
                    nakai: e,
                    ninomiya: e,
                    odawara: e,
                    oi: e,
                    oiso: e,
                    sagamihara: e,
                    samukawa: e,
                    tsukui: e,
                    yamakita: e,
                    yamato: e,
                    yokosuka: e,
                    yugawara: e,
                    zama: e,
                    zushi: e,
                  },
                ],
                kochi: [
                  1,
                  {
                    aki: e,
                    geisei: e,
                    hidaka: e,
                    higashitsuno: e,
                    ino: e,
                    kagami: e,
                    kami: e,
                    kitagawa: e,
                    kochi: e,
                    mihara: e,
                    motoyama: e,
                    muroto: e,
                    nahari: e,
                    nakamura: e,
                    nankoku: e,
                    nishitosa: e,
                    niyodogawa: e,
                    ochi: e,
                    okawa: e,
                    otoyo: e,
                    otsuki: e,
                    sakawa: e,
                    sukumo: e,
                    susaki: e,
                    tosa: e,
                    tosashimizu: e,
                    toyo: e,
                    tsuno: e,
                    umaji: e,
                    yasuda: e,
                    yusuhara: e,
                  },
                ],
                kumamoto: [
                  1,
                  {
                    amakusa: e,
                    arao: e,
                    aso: e,
                    choyo: e,
                    gyokuto: e,
                    kamiamakusa: e,
                    kikuchi: e,
                    kumamoto: e,
                    mashiki: e,
                    mifune: e,
                    minamata: e,
                    minamioguni: e,
                    nagasu: e,
                    nishihara: e,
                    oguni: e,
                    ozu: e,
                    sumoto: e,
                    takamori: e,
                    uki: e,
                    uto: e,
                    yamaga: e,
                    yamato: e,
                    yatsushiro: e,
                  },
                ],
                kyoto: [
                  1,
                  {
                    ayabe: e,
                    fukuchiyama: e,
                    higashiyama: e,
                    ide: e,
                    ine: e,
                    joyo: e,
                    kameoka: e,
                    kamo: e,
                    kita: e,
                    kizu: e,
                    kumiyama: e,
                    kyotamba: e,
                    kyotanabe: e,
                    kyotango: e,
                    maizuru: e,
                    minami: e,
                    minamiyamashiro: e,
                    miyazu: e,
                    muko: e,
                    nagaokakyo: e,
                    nakagyo: e,
                    nantan: e,
                    oyamazaki: e,
                    sakyo: e,
                    seika: e,
                    tanabe: e,
                    uji: e,
                    ujitawara: e,
                    wazuka: e,
                    yamashina: e,
                    yawata: e,
                  },
                ],
                mie: [
                  1,
                  {
                    asahi: e,
                    inabe: e,
                    ise: e,
                    kameyama: e,
                    kawagoe: e,
                    kiho: e,
                    kisosaki: e,
                    kiwa: e,
                    komono: e,
                    kumano: e,
                    kuwana: e,
                    matsusaka: e,
                    meiwa: e,
                    mihama: e,
                    minamiise: e,
                    misugi: e,
                    miyama: e,
                    nabari: e,
                    shima: e,
                    suzuka: e,
                    tado: e,
                    taiki: e,
                    taki: e,
                    tamaki: e,
                    toba: e,
                    tsu: e,
                    udono: e,
                    ureshino: e,
                    watarai: e,
                    yokkaichi: e,
                  },
                ],
                miyagi: [
                  1,
                  {
                    furukawa: e,
                    higashimatsushima: e,
                    ishinomaki: e,
                    iwanuma: e,
                    kakuda: e,
                    kami: e,
                    kawasaki: e,
                    marumori: e,
                    matsushima: e,
                    minamisanriku: e,
                    misato: e,
                    murata: e,
                    natori: e,
                    ogawara: e,
                    ohira: e,
                    onagawa: e,
                    osaki: e,
                    rifu: e,
                    semine: e,
                    shibata: e,
                    shichikashuku: e,
                    shikama: e,
                    shiogama: e,
                    shiroishi: e,
                    tagajo: e,
                    taiwa: e,
                    tome: e,
                    tomiya: e,
                    wakuya: e,
                    watari: e,
                    yamamoto: e,
                    zao: e,
                  },
                ],
                miyazaki: [
                  1,
                  {
                    aya: e,
                    ebino: e,
                    gokase: e,
                    hyuga: e,
                    kadogawa: e,
                    kawaminami: e,
                    kijo: e,
                    kitagawa: e,
                    kitakata: e,
                    kitaura: e,
                    kobayashi: e,
                    kunitomi: e,
                    kushima: e,
                    mimata: e,
                    miyakonojo: e,
                    miyazaki: e,
                    morotsuka: e,
                    nichinan: e,
                    nishimera: e,
                    nobeoka: e,
                    saito: e,
                    shiiba: e,
                    shintomi: e,
                    takaharu: e,
                    takanabe: e,
                    takazaki: e,
                    tsuno: e,
                  },
                ],
                nagano: [
                  1,
                  {
                    achi: e,
                    agematsu: e,
                    anan: e,
                    aoki: e,
                    asahi: e,
                    azumino: e,
                    chikuhoku: e,
                    chikuma: e,
                    chino: e,
                    fujimi: e,
                    hakuba: e,
                    hara: e,
                    hiraya: e,
                    iida: e,
                    iijima: e,
                    iiyama: e,
                    iizuna: e,
                    ikeda: e,
                    ikusaka: e,
                    ina: e,
                    karuizawa: e,
                    kawakami: e,
                    kiso: e,
                    kisofukushima: e,
                    kitaaiki: e,
                    komagane: e,
                    komoro: e,
                    matsukawa: e,
                    matsumoto: e,
                    miasa: e,
                    minamiaiki: e,
                    minamimaki: e,
                    minamiminowa: e,
                    minowa: e,
                    miyada: e,
                    miyota: e,
                    mochizuki: e,
                    nagano: e,
                    nagawa: e,
                    nagiso: e,
                    nakagawa: e,
                    nakano: e,
                    nozawaonsen: e,
                    obuse: e,
                    ogawa: e,
                    okaya: e,
                    omachi: e,
                    omi: e,
                    ookuwa: e,
                    ooshika: e,
                    otaki: e,
                    otari: e,
                    sakae: e,
                    sakaki: e,
                    saku: e,
                    sakuho: e,
                    shimosuwa: e,
                    shinanomachi: e,
                    shiojiri: e,
                    suwa: e,
                    suzaka: e,
                    takagi: e,
                    takamori: e,
                    takayama: e,
                    tateshina: e,
                    tatsuno: e,
                    togakushi: e,
                    togura: e,
                    tomi: e,
                    ueda: e,
                    wada: e,
                    yamagata: e,
                    yamanouchi: e,
                    yasaka: e,
                    yasuoka: e,
                  },
                ],
                nagasaki: [
                  1,
                  {
                    chijiwa: e,
                    futsu: e,
                    goto: e,
                    hasami: e,
                    hirado: e,
                    iki: e,
                    isahaya: e,
                    kawatana: e,
                    kuchinotsu: e,
                    matsuura: e,
                    nagasaki: e,
                    obama: e,
                    omura: e,
                    oseto: e,
                    saikai: e,
                    sasebo: e,
                    seihi: e,
                    shimabara: e,
                    shinkamigoto: e,
                    togitsu: e,
                    tsushima: e,
                    unzen: e,
                  },
                ],
                nara: [
                  1,
                  {
                    ando: e,
                    gose: e,
                    heguri: e,
                    higashiyoshino: e,
                    ikaruga: e,
                    ikoma: e,
                    kamikitayama: e,
                    kanmaki: e,
                    kashiba: e,
                    kashihara: e,
                    katsuragi: e,
                    kawai: e,
                    kawakami: e,
                    kawanishi: e,
                    koryo: e,
                    kurotaki: e,
                    mitsue: e,
                    miyake: e,
                    nara: e,
                    nosegawa: e,
                    oji: e,
                    ouda: e,
                    oyodo: e,
                    sakurai: e,
                    sango: e,
                    shimoichi: e,
                    shimokitayama: e,
                    shinjo: e,
                    soni: e,
                    takatori: e,
                    tawaramoto: e,
                    tenkawa: e,
                    tenri: e,
                    uda: e,
                    yamatokoriyama: e,
                    yamatotakada: e,
                    yamazoe: e,
                    yoshino: e,
                  },
                ],
                niigata: [
                  1,
                  {
                    aga: e,
                    agano: e,
                    gosen: e,
                    itoigawa: e,
                    izumozaki: e,
                    joetsu: e,
                    kamo: e,
                    kariwa: e,
                    kashiwazaki: e,
                    minamiuonuma: e,
                    mitsuke: e,
                    muika: e,
                    murakami: e,
                    myoko: e,
                    nagaoka: e,
                    niigata: e,
                    ojiya: e,
                    omi: e,
                    sado: e,
                    sanjo: e,
                    seiro: e,
                    seirou: e,
                    sekikawa: e,
                    shibata: e,
                    tagami: e,
                    tainai: e,
                    tochio: e,
                    tokamachi: e,
                    tsubame: e,
                    tsunan: e,
                    uonuma: e,
                    yahiko: e,
                    yoita: e,
                    yuzawa: e,
                  },
                ],
                oita: [
                  1,
                  {
                    beppu: e,
                    bungoono: e,
                    bungotakada: e,
                    hasama: e,
                    hiji: e,
                    himeshima: e,
                    hita: e,
                    kamitsue: e,
                    kokonoe: e,
                    kuju: e,
                    kunisaki: e,
                    kusu: e,
                    oita: e,
                    saiki: e,
                    taketa: e,
                    tsukumi: e,
                    usa: e,
                    usuki: e,
                    yufu: e,
                  },
                ],
                okayama: [
                  1,
                  {
                    akaiwa: e,
                    asakuchi: e,
                    bizen: e,
                    hayashima: e,
                    ibara: e,
                    kagamino: e,
                    kasaoka: e,
                    kibichuo: e,
                    kumenan: e,
                    kurashiki: e,
                    maniwa: e,
                    misaki: e,
                    nagi: e,
                    niimi: e,
                    nishiawakura: e,
                    okayama: e,
                    satosho: e,
                    setouchi: e,
                    shinjo: e,
                    shoo: e,
                    soja: e,
                    takahashi: e,
                    tamano: e,
                    tsuyama: e,
                    wake: e,
                    yakage: e,
                  },
                ],
                okinawa: [
                  1,
                  {
                    aguni: e,
                    ginowan: e,
                    ginoza: e,
                    gushikami: e,
                    haebaru: e,
                    higashi: e,
                    hirara: e,
                    iheya: e,
                    ishigaki: e,
                    ishikawa: e,
                    itoman: e,
                    izena: e,
                    kadena: e,
                    kin: e,
                    kitadaito: e,
                    kitanakagusuku: e,
                    kumejima: e,
                    kunigami: e,
                    minamidaito: e,
                    motobu: e,
                    nago: e,
                    naha: e,
                    nakagusuku: e,
                    nakijin: e,
                    nanjo: e,
                    nishihara: e,
                    ogimi: e,
                    okinawa: e,
                    onna: e,
                    shimoji: e,
                    taketomi: e,
                    tarama: e,
                    tokashiki: e,
                    tomigusuku: e,
                    tonaki: e,
                    urasoe: e,
                    uruma: e,
                    yaese: e,
                    yomitan: e,
                    yonabaru: e,
                    yonaguni: e,
                    zamami: e,
                  },
                ],
                osaka: [
                  1,
                  {
                    abeno: e,
                    chihayaakasaka: e,
                    chuo: e,
                    daito: e,
                    fujiidera: e,
                    habikino: e,
                    hannan: e,
                    higashiosaka: e,
                    higashisumiyoshi: e,
                    higashiyodogawa: e,
                    hirakata: e,
                    ibaraki: e,
                    ikeda: e,
                    izumi: e,
                    izumiotsu: e,
                    izumisano: e,
                    kadoma: e,
                    kaizuka: e,
                    kanan: e,
                    kashiwara: e,
                    katano: e,
                    kawachinagano: e,
                    kishiwada: e,
                    kita: e,
                    kumatori: e,
                    matsubara: e,
                    minato: e,
                    minoh: e,
                    misaki: e,
                    moriguchi: e,
                    neyagawa: e,
                    nishi: e,
                    nose: e,
                    osakasayama: e,
                    sakai: e,
                    sayama: e,
                    sennan: e,
                    settsu: e,
                    shijonawate: e,
                    shimamoto: e,
                    suita: e,
                    tadaoka: e,
                    taishi: e,
                    tajiri: e,
                    takaishi: e,
                    takatsuki: e,
                    tondabayashi: e,
                    toyonaka: e,
                    toyono: e,
                    yao: e,
                  },
                ],
                saga: [
                  1,
                  {
                    ariake: e,
                    arita: e,
                    fukudomi: e,
                    genkai: e,
                    hamatama: e,
                    hizen: e,
                    imari: e,
                    kamimine: e,
                    kanzaki: e,
                    karatsu: e,
                    kashima: e,
                    kitagata: e,
                    kitahata: e,
                    kiyama: e,
                    kouhoku: e,
                    kyuragi: e,
                    nishiarita: e,
                    ogi: e,
                    omachi: e,
                    ouchi: e,
                    saga: e,
                    shiroishi: e,
                    taku: e,
                    tara: e,
                    tosu: e,
                    yoshinogari: e,
                  },
                ],
                saitama: [
                  1,
                  {
                    arakawa: e,
                    asaka: e,
                    chichibu: e,
                    fujimi: e,
                    fujimino: e,
                    fukaya: e,
                    hanno: e,
                    hanyu: e,
                    hasuda: e,
                    hatogaya: e,
                    hatoyama: e,
                    hidaka: e,
                    higashichichibu: e,
                    higashimatsuyama: e,
                    honjo: e,
                    ina: e,
                    iruma: e,
                    iwatsuki: e,
                    kamiizumi: e,
                    kamikawa: e,
                    kamisato: e,
                    kasukabe: e,
                    kawagoe: e,
                    kawaguchi: e,
                    kawajima: e,
                    kazo: e,
                    kitamoto: e,
                    koshigaya: e,
                    kounosu: e,
                    kuki: e,
                    kumagaya: e,
                    matsubushi: e,
                    minano: e,
                    misato: e,
                    miyashiro: e,
                    miyoshi: e,
                    moroyama: e,
                    nagatoro: e,
                    namegawa: e,
                    niiza: e,
                    ogano: e,
                    ogawa: e,
                    ogose: e,
                    okegawa: e,
                    omiya: e,
                    otaki: e,
                    ranzan: e,
                    ryokami: e,
                    saitama: e,
                    sakado: e,
                    satte: e,
                    sayama: e,
                    shiki: e,
                    shiraoka: e,
                    soka: e,
                    sugito: e,
                    toda: e,
                    tokigawa: e,
                    tokorozawa: e,
                    tsurugashima: e,
                    urawa: e,
                    warabi: e,
                    yashio: e,
                    yokoze: e,
                    yono: e,
                    yorii: e,
                    yoshida: e,
                    yoshikawa: e,
                    yoshimi: e,
                  },
                ],
                shiga: [
                  1,
                  {
                    aisho: e,
                    gamo: e,
                    higashiomi: e,
                    hikone: e,
                    koka: e,
                    konan: e,
                    kosei: e,
                    koto: e,
                    kusatsu: e,
                    maibara: e,
                    moriyama: e,
                    nagahama: e,
                    nishiazai: e,
                    notogawa: e,
                    omihachiman: e,
                    otsu: e,
                    ritto: e,
                    ryuoh: e,
                    takashima: e,
                    takatsuki: e,
                    torahime: e,
                    toyosato: e,
                    yasu: e,
                  },
                ],
                shimane: [
                  1,
                  {
                    akagi: e,
                    ama: e,
                    gotsu: e,
                    hamada: e,
                    higashiizumo: e,
                    hikawa: e,
                    hikimi: e,
                    izumo: e,
                    kakinoki: e,
                    masuda: e,
                    matsue: e,
                    misato: e,
                    nishinoshima: e,
                    ohda: e,
                    okinoshima: e,
                    okuizumo: e,
                    shimane: e,
                    tamayu: e,
                    tsuwano: e,
                    unnan: e,
                    yakumo: e,
                    yasugi: e,
                    yatsuka: e,
                  },
                ],
                shizuoka: [
                  1,
                  {
                    arai: e,
                    atami: e,
                    fuji: e,
                    fujieda: e,
                    fujikawa: e,
                    fujinomiya: e,
                    fukuroi: e,
                    gotemba: e,
                    haibara: e,
                    hamamatsu: e,
                    higashiizu: e,
                    ito: e,
                    iwata: e,
                    izu: e,
                    izunokuni: e,
                    kakegawa: e,
                    kannami: e,
                    kawanehon: e,
                    kawazu: e,
                    kikugawa: e,
                    kosai: e,
                    makinohara: e,
                    matsuzaki: e,
                    minamiizu: e,
                    mishima: e,
                    morimachi: e,
                    nishiizu: e,
                    numazu: e,
                    omaezaki: e,
                    shimada: e,
                    shimizu: e,
                    shimoda: e,
                    shizuoka: e,
                    susono: e,
                    yaizu: e,
                    yoshida: e,
                  },
                ],
                tochigi: [
                  1,
                  {
                    ashikaga: e,
                    bato: e,
                    haga: e,
                    ichikai: e,
                    iwafune: e,
                    kaminokawa: e,
                    kanuma: e,
                    karasuyama: e,
                    kuroiso: e,
                    mashiko: e,
                    mibu: e,
                    moka: e,
                    motegi: e,
                    nasu: e,
                    nasushiobara: e,
                    nikko: e,
                    nishikata: e,
                    nogi: e,
                    ohira: e,
                    ohtawara: e,
                    oyama: e,
                    sakura: e,
                    sano: e,
                    shimotsuke: e,
                    shioya: e,
                    takanezawa: e,
                    tochigi: e,
                    tsuga: e,
                    ujiie: e,
                    utsunomiya: e,
                    yaita: e,
                  },
                ],
                tokushima: [
                  1,
                  {
                    aizumi: e,
                    anan: e,
                    ichiba: e,
                    itano: e,
                    kainan: e,
                    komatsushima: e,
                    matsushige: e,
                    mima: e,
                    minami: e,
                    miyoshi: e,
                    mugi: e,
                    nakagawa: e,
                    naruto: e,
                    sanagochi: e,
                    shishikui: e,
                    tokushima: e,
                    wajiki: e,
                  },
                ],
                tokyo: [
                  1,
                  {
                    adachi: e,
                    akiruno: e,
                    akishima: e,
                    aogashima: e,
                    arakawa: e,
                    bunkyo: e,
                    chiyoda: e,
                    chofu: e,
                    chuo: e,
                    edogawa: e,
                    fuchu: e,
                    fussa: e,
                    hachijo: e,
                    hachioji: e,
                    hamura: e,
                    higashikurume: e,
                    higashimurayama: e,
                    higashiyamato: e,
                    hino: e,
                    hinode: e,
                    hinohara: e,
                    inagi: e,
                    itabashi: e,
                    katsushika: e,
                    kita: e,
                    kiyose: e,
                    kodaira: e,
                    koganei: e,
                    kokubunji: e,
                    komae: e,
                    koto: e,
                    kouzushima: e,
                    kunitachi: e,
                    machida: e,
                    meguro: e,
                    minato: e,
                    mitaka: e,
                    mizuho: e,
                    musashimurayama: e,
                    musashino: e,
                    nakano: e,
                    nerima: e,
                    ogasawara: e,
                    okutama: e,
                    ome: e,
                    oshima: e,
                    ota: e,
                    setagaya: e,
                    shibuya: e,
                    shinagawa: e,
                    shinjuku: e,
                    suginami: e,
                    sumida: e,
                    tachikawa: e,
                    taito: e,
                    tama: e,
                    toshima: e,
                  },
                ],
                tottori: [
                  1,
                  {
                    chizu: e,
                    hino: e,
                    kawahara: e,
                    koge: e,
                    kotoura: e,
                    misasa: e,
                    nanbu: e,
                    nichinan: e,
                    sakaiminato: e,
                    tottori: e,
                    wakasa: e,
                    yazu: e,
                    yonago: e,
                  },
                ],
                toyama: [
                  1,
                  {
                    asahi: e,
                    fuchu: e,
                    fukumitsu: e,
                    funahashi: e,
                    himi: e,
                    imizu: e,
                    inami: e,
                    johana: e,
                    kamiichi: e,
                    kurobe: e,
                    nakaniikawa: e,
                    namerikawa: e,
                    nanto: e,
                    nyuzen: e,
                    oyabe: e,
                    taira: e,
                    takaoka: e,
                    tateyama: e,
                    toga: e,
                    tonami: e,
                    toyama: e,
                    unazuki: e,
                    uozu: e,
                    yamada: e,
                  },
                ],
                wakayama: [
                  1,
                  {
                    arida: e,
                    aridagawa: e,
                    gobo: e,
                    hashimoto: e,
                    hidaka: e,
                    hirogawa: e,
                    inami: e,
                    iwade: e,
                    kainan: e,
                    kamitonda: e,
                    katsuragi: e,
                    kimino: e,
                    kinokawa: e,
                    kitayama: e,
                    koya: e,
                    koza: e,
                    kozagawa: e,
                    kudoyama: e,
                    kushimoto: e,
                    mihama: e,
                    misato: e,
                    nachikatsuura: e,
                    shingu: e,
                    shirahama: e,
                    taiji: e,
                    tanabe: e,
                    wakayama: e,
                    yuasa: e,
                    yura: e,
                  },
                ],
                yamagata: [
                  1,
                  {
                    asahi: e,
                    funagata: e,
                    higashine: e,
                    iide: e,
                    kahoku: e,
                    kaminoyama: e,
                    kaneyama: e,
                    kawanishi: e,
                    mamurogawa: e,
                    mikawa: e,
                    murayama: e,
                    nagai: e,
                    nakayama: e,
                    nanyo: e,
                    nishikawa: e,
                    obanazawa: e,
                    oe: e,
                    oguni: e,
                    ohkura: e,
                    oishida: e,
                    sagae: e,
                    sakata: e,
                    sakegawa: e,
                    shinjo: e,
                    shirataka: e,
                    shonai: e,
                    takahata: e,
                    tendo: e,
                    tozawa: e,
                    tsuruoka: e,
                    yamagata: e,
                    yamanobe: e,
                    yonezawa: e,
                    yuza: e,
                  },
                ],
                yamaguchi: [
                  1,
                  {
                    abu: e,
                    hagi: e,
                    hikari: e,
                    hofu: e,
                    iwakuni: e,
                    kudamatsu: e,
                    mitou: e,
                    nagato: e,
                    oshima: e,
                    shimonoseki: e,
                    shunan: e,
                    tabuse: e,
                    tokuyama: e,
                    toyota: e,
                    ube: e,
                    yuu: e,
                  },
                ],
                yamanashi: [
                  1,
                  {
                    chuo: e,
                    doshi: e,
                    fuefuki: e,
                    fujikawa: e,
                    fujikawaguchiko: e,
                    fujiyoshida: e,
                    hayakawa: e,
                    hokuto: e,
                    ichikawamisato: e,
                    kai: e,
                    kofu: e,
                    koshu: e,
                    kosuge: e,
                    "minami-alps": e,
                    minobu: e,
                    nakamichi: e,
                    nanbu: e,
                    narusawa: e,
                    nirasaki: e,
                    nishikatsura: e,
                    oshino: e,
                    otsuki: e,
                    showa: e,
                    tabayama: e,
                    tsuru: e,
                    uenohara: e,
                    yamanakako: e,
                    yamanashi: e,
                  },
                ],
                "xn--4pvxs": e,
                栃木: e,
                "xn--vgu402c": e,
                愛知: e,
                "xn--c3s14m": e,
                愛媛: e,
                "xn--f6qx53a": e,
                兵庫: e,
                "xn--8pvr4u": e,
                熊本: e,
                "xn--uist22h": e,
                茨城: e,
                "xn--djrs72d6uy": e,
                北海道: e,
                "xn--mkru45i": e,
                千葉: e,
                "xn--0trq7p7nn": e,
                和歌山: e,
                "xn--8ltr62k": e,
                長崎: e,
                "xn--2m4a15e": e,
                長野: e,
                "xn--efvn9s": e,
                新潟: e,
                "xn--32vp30h": e,
                青森: e,
                "xn--4it797k": e,
                静岡: e,
                "xn--1lqs71d": e,
                東京: e,
                "xn--5rtp49c": e,
                石川: e,
                "xn--5js045d": e,
                埼玉: e,
                "xn--ehqz56n": e,
                三重: e,
                "xn--1lqs03n": e,
                京都: e,
                "xn--qqqt11m": e,
                佐賀: e,
                "xn--kbrq7o": e,
                大分: e,
                "xn--pssu33l": e,
                大阪: e,
                "xn--ntsq17g": e,
                奈良: e,
                "xn--uisz3g": e,
                宮城: e,
                "xn--6btw5a": e,
                宮崎: e,
                "xn--1ctwo": e,
                富山: e,
                "xn--6orx2r": e,
                山口: e,
                "xn--rht61e": e,
                山形: e,
                "xn--rht27z": e,
                山梨: e,
                "xn--djty4k": e,
                岩手: e,
                "xn--nit225k": e,
                岐阜: e,
                "xn--rht3d": e,
                岡山: e,
                "xn--klty5x": e,
                島根: e,
                "xn--kltx9a": e,
                広島: e,
                "xn--kltp7d": e,
                徳島: e,
                "xn--uuwu58a": e,
                沖縄: e,
                "xn--zbx025d": e,
                滋賀: e,
                "xn--ntso0iqx3a": e,
                神奈川: e,
                "xn--elqq16h": e,
                福井: e,
                "xn--4it168d": e,
                福岡: e,
                "xn--klt787d": e,
                福島: e,
                "xn--rny31h": e,
                秋田: e,
                "xn--7t0a264c": e,
                群馬: e,
                "xn--5rtq34k": e,
                香川: e,
                "xn--k7yn95e": e,
                高知: e,
                "xn--tor131o": e,
                鳥取: e,
                "xn--d5qv7z876c": e,
                鹿児島: e,
                kawasaki: s,
                kitakyushu: s,
                kobe: s,
                nagoya: s,
                sapporo: s,
                sendai: s,
                yokohama: s,
                buyshop: a,
                fashionstore: a,
                handcrafted: a,
                kawaiishop: a,
                supersale: a,
                theshop: a,
                usercontent: a,
                angry: a,
                babyblue: a,
                babymilk: a,
                backdrop: a,
                bambina: a,
                bitter: a,
                blush: a,
                boo: a,
                boy: a,
                boyfriend: a,
                but: a,
                candypop: a,
                capoo: a,
                catfood: a,
                cheap: a,
                chicappa: a,
                chillout: a,
                chips: a,
                chowder: a,
                chu: a,
                ciao: a,
                cocotte: a,
                coolblog: a,
                cranky: a,
                cutegirl: a,
                daa: a,
                deca: a,
                deci: a,
                digick: a,
                egoism: a,
                fakefur: a,
                fem: a,
                flier: a,
                floppy: a,
                fool: a,
                frenchkiss: a,
                girlfriend: a,
                girly: a,
                gloomy: a,
                gonna: a,
                greater: a,
                hacca: a,
                heavy: a,
                her: a,
                hiho: a,
                hippy: a,
                holy: a,
                hungry: a,
                icurus: a,
                itigo: a,
                jellybean: a,
                kikirara: a,
                kill: a,
                kilo: a,
                kuron: a,
                littlestar: a,
                lolipopmc: a,
                lolitapunk: a,
                lomo: a,
                lovepop: a,
                lovesick: a,
                main: a,
                mods: a,
                mond: a,
                mongolian: a,
                moo: a,
                namaste: a,
                nikita: a,
                nobushi: a,
                noor: a,
                oops: a,
                parallel: a,
                parasite: a,
                pecori: a,
                peewee: a,
                penne: a,
                pepper: a,
                perma: a,
                pigboat: a,
                pinoko: a,
                punyu: a,
                pupu: a,
                pussycat: a,
                pya: a,
                raindrop: a,
                readymade: a,
                sadist: a,
                schoolbus: a,
                secret: a,
                staba: a,
                stripper: a,
                sub: a,
                sunnyday: a,
                thick: a,
                tonkotsu: a,
                under: a,
                upper: a,
                velvet: a,
                verse: a,
                versus: a,
                vivian: a,
                watson: a,
                weblike: a,
                whitesnow: a,
                zombie: a,
                blogspot: a,
                "2-d": a,
                bona: a,
                crap: a,
                daynight: a,
                eek: a,
                flop: a,
                halfmoon: a,
                jeez: a,
                matrix: a,
                mimoza: a,
                netgamers: a,
                nyanta: a,
                o0o0: a,
                rdy: a,
                rgr: a,
                rulez: a,
                sakurastorage: [0, { isk01: u, isk02: u }],
                saloon: a,
                sblo: a,
                skr: a,
                tank: a,
                "uh-oh": a,
                undo: a,
                webaccel: [0, { rs: a, user: a }],
                websozai: a,
                xii: a,
              },
            ],
            ke: [1, { ac: e, co: o, go: e, info: e, me: e, mobi: e, ne: e, or: e, sc: e }],
            kg: [1, { org: e, net: e, com: e, edu: e, gov: e, mil: e, blog: a, io: a, jp: a, tv: a, uk: a, us: a }],
            kh: s,
            ki: _,
            km: [
              1,
              {
                org: e,
                nom: e,
                gov: e,
                prd: e,
                tm: e,
                edu: e,
                mil: e,
                ass: e,
                com: e,
                coop: e,
                asso: e,
                presse: e,
                medecin: e,
                notaires: e,
                pharmaciens: e,
                veterinaire: e,
                gouv: e,
              },
            ],
            kn: [1, { net: e, org: e, edu: e, gov: e }],
            kp: [1, { com: e, edu: e, gov: e, org: e, rep: e, tra: e }],
            kr: [
              1,
              {
                ac: e,
                co: e,
                es: e,
                go: e,
                hs: e,
                kg: e,
                mil: e,
                ms: e,
                ne: e,
                or: e,
                pe: e,
                re: e,
                sc: e,
                busan: e,
                chungbuk: e,
                chungnam: e,
                daegu: e,
                daejeon: e,
                gangwon: e,
                gwangju: e,
                gyeongbuk: e,
                gyeonggi: e,
                gyeongnam: e,
                incheon: e,
                jeju: e,
                jeonbuk: e,
                jeonnam: e,
                seoul: e,
                ulsan: e,
                blogspot: a,
              },
            ],
            kw: [1, { com: e, edu: e, emb: e, gov: e, ind: e, net: e, org: e }],
            ky: S,
            kz: [1, { org: e, edu: e, net: e, gov: e, mil: e, com: e, jcloud: a, kazteleport: [0, { upaas: a }] }],
            la: [1, { int: e, net: e, info: e, edu: e, gov: e, per: e, com: e, org: e, bnr: a, c: a }],
            lb: t,
            lc: [1, { com: e, net: e, co: e, org: e, edu: e, gov: e, oy: a }],
            li: [1, { blogspot: a, caa: a }],
            lk: [
              1,
              {
                gov: e,
                sch: e,
                net: e,
                int: e,
                com: e,
                org: e,
                edu: e,
                ngo: e,
                soc: e,
                web: e,
                ltd: e,
                assn: e,
                grp: e,
                hotel: e,
                ac: e,
              },
            ],
            lr: t,
            ls: [1, { ac: e, biz: e, co: e, edu: e, gov: e, info: e, net: e, org: e, sc: e, de: a }],
            lt: T,
            lu: [1, { blogspot: a, "123website": a }],
            lv: [1, { com: e, edu: e, gov: e, org: e, mil: e, id: e, net: e, asn: e, conf: e }],
            ly: [1, { com: e, net: e, gov: e, plc: e, edu: e, sch: e, med: e, org: e, id: e }],
            ma: [1, { co: e, net: e, gov: e, org: e, ac: e, press: e }],
            mc: [1, { tm: e, asso: e }],
            md: [1, { blogspot: a, at: a, de: a, jp: a, to: a }],
            me: [
              1,
              {
                co: e,
                net: e,
                org: e,
                edu: e,
                ac: e,
                gov: e,
                its: e,
                priv: e,
                c66: a,
                daplie: [2, { localhost: a }],
                edgestack: a,
                filegear: a,
                "filegear-au": a,
                "filegear-de": a,
                "filegear-gb": a,
                "filegear-ie": a,
                "filegear-jp": a,
                "filegear-sg": a,
                glitch: a,
                ravendb: a,
                lohmus: a,
                barsy: a,
                mcpe: a,
                mcdir: a,
                soundcast: a,
                tcp4: a,
                brasilia: a,
                ddns: a,
                dnsfor: a,
                hopto: a,
                loginto: a,
                noip: a,
                webhop: a,
                vp4: a,
                diskstation: a,
                dscloud: a,
                i234: a,
                myds: a,
                synology: a,
                transip: z,
                wedeploy: a,
                yombo: a,
                nohost: a,
              },
            ],
            mg: [1, { org: e, nom: e, gov: e, prd: e, tm: e, edu: e, mil: e, com: e, co: e }],
            mh: e,
            mil: e,
            mk: [1, { com: e, org: e, net: e, edu: e, gov: e, inf: e, name: e, blogspot: a }],
            ml: [1, { com: e, edu: e, gouv: e, gov: e, net: e, org: e, presse: e }],
            mm: s,
            mn: [1, { gov: e, edu: e, org: e, nyc: a }],
            mo: t,
            mobi: [1, { barsy: a, dscloud: a }],
            mp: [1, { ju: a }],
            mq: e,
            mr: T,
            ms: [1, { com: e, edu: e, gov: e, net: e, org: e, lab: a, minisite: a }],
            mt: [1, { com: o, edu: e, net: e, org: e }],
            mu: [1, { com: e, net: e, org: e, gov: e, ac: e, co: e, or: e }],
            museum: e,
            mv: [
              1,
              {
                aero: e,
                biz: e,
                com: e,
                coop: e,
                edu: e,
                gov: e,
                info: e,
                int: e,
                mil: e,
                museum: e,
                name: e,
                net: e,
                org: e,
                pro: e,
              },
            ],
            mw: [1, { ac: e, biz: e, co: e, com: e, coop: e, edu: e, gov: e, int: e, museum: e, net: e, org: e }],
            mx: [1, { com: e, org: e, gob: e, edu: e, net: e, blogspot: a }],
            my: [1, { biz: e, com: e, edu: e, gov: e, mil: e, name: e, net: e, org: e, blogspot: a }],
            mz: [1, { ac: e, adv: e, co: e, edu: e, gov: e, mil: e, net: e, org: e }],
            na: [
              1,
              {
                info: e,
                pro: e,
                name: e,
                school: e,
                or: e,
                dr: e,
                us: e,
                mx: e,
                ca: e,
                in: e,
                cc: e,
                tv: e,
                ws: e,
                mobi: e,
                co: e,
                com: e,
                org: e,
              },
            ],
            name: [1, { her: L, his: L }],
            nc: [1, { asso: e, nom: e }],
            ne: e,
            net: [
              1,
              {
                adobeaemcloud: a,
                "adobeio-static": a,
                adobeioruntime: a,
                akadns: a,
                akamai: a,
                "akamai-staging": a,
                akamaiedge: a,
                "akamaiedge-staging": a,
                akamaihd: a,
                "akamaihd-staging": a,
                akamaiorigin: a,
                "akamaiorigin-staging": a,
                akamaized: a,
                "akamaized-staging": a,
                edgekey: a,
                "edgekey-staging": a,
                edgesuite: a,
                "edgesuite-staging": a,
                alwaysdata: a,
                myamaze: a,
                cloudfront: a,
                t3l3p0rt: a,
                appudo: a,
                "atlassian-dev": [0, { prod: [0, { cdn: a }] }],
                myfritz: a,
                onavstack: a,
                shopselect: a,
                blackbaudcdn: a,
                boomla: a,
                bplaced: a,
                square7: a,
                gb: a,
                hu: a,
                jp: a,
                se: a,
                uk: a,
                in: a,
                clickrising: a,
                cloudaccess: a,
                "cdn77-ssl": a,
                cdn77: [0, { r: a }],
                "feste-ip": a,
                "knx-server": a,
                "static-access": a,
                cryptonomic: n,
                dattolocal: a,
                mydatto: a,
                debian: a,
                bitbridge: a,
                "at-band-camp": a,
                blogdns: a,
                "broke-it": a,
                buyshouses: a,
                dnsalias: a,
                dnsdojo: a,
                "does-it": a,
                dontexist: a,
                dynalias: a,
                dynathome: a,
                endofinternet: a,
                "from-az": a,
                "from-co": a,
                "from-la": a,
                "from-ny": a,
                "gets-it": a,
                "ham-radio-op": a,
                homeftp: a,
                homeip: a,
                homelinux: a,
                homeunix: a,
                "in-the-band": a,
                "is-a-chef": a,
                "is-a-geek": a,
                "isa-geek": a,
                "kicks-ass": a,
                "office-on-the": a,
                podzone: a,
                "scrapper-site": a,
                selfip: a,
                "sells-it": a,
                servebbs: a,
                serveftp: a,
                thruhere: a,
                webhop: a,
                definima: a,
                casacam: a,
                dynu: a,
                dynv6: a,
                twmail: a,
                ru: a,
                channelsdvr: [2, { u: a }],
                fastlylb: [2, { map: a }],
                fastly: [0, { freetls: a, map: a, prod: [0, { a, global: a }], ssl: [0, { a, b: a, global: a }] }],
                edgeapp: a,
                flynnhosting: a,
                "cdn-edges": a,
                heteml: a,
                cloudfunctions: a,
                moonscale: a,
                "in-dsl": a,
                "in-vpn": a,
                ipifony: a,
                iobb: a,
                cloudjiffy: [2, { "fra1-de": a, "west1-us": a }],
                elastx: [0, { "jls-sto1": a, "jls-sto2": a, "jls-sto3": a }],
                faststacks: a,
                massivegrid: [0, { paas: [0, { "fr-1": a, "lon-1": a, "lon-2": a, "ny-1": a, "ny-2": a, "sg-1": a }] }],
                saveincloud: [0, { jelastic: a, "nordeste-idc": a }],
                scaleforce: $,
                tsukaeru: q,
                kinghost: a,
                uni5: a,
                krellian: a,
                barsy: a,
                memset: a,
                azurewebsites: a,
                "azure-mobile": a,
                cloudapp: a,
                azurestaticapps: [
                  2,
                  { 1: a, 2: a, 3: a, centralus: a, eastasia: a, eastus2: a, westeurope: a, westus2: a },
                ],
                dnsup: a,
                hicam: a,
                "now-dns": a,
                ownip: a,
                vpndns: a,
                "eating-organic": a,
                mydissent: a,
                myeffect: a,
                mymediapc: a,
                mypsx: a,
                mysecuritycamera: a,
                nhlfan: a,
                "no-ip": a,
                pgafan: a,
                privatizehealthinsurance: a,
                bounceme: a,
                ddns: a,
                redirectme: a,
                serveblog: a,
                serveminecraft: a,
                sytes: a,
                cloudycluster: a,
                ovh: [0, { webpaas: n, hosting: n }],
                bar0: a,
                bar1: a,
                bar2: a,
                rackmaze: a,
                squares: a,
                schokokeks: a,
                "firewall-gateway": a,
                seidat: a,
                senseering: a,
                siteleaf: a,
                "vps-host": [2, { jelastic: [0, { atl: a, njs: a, ric: a }] }],
                myspreadshop: a,
                srcf: [0, { soc: a, user: a }],
                supabase: a,
                dsmynas: a,
                familyds: a,
                tailscale: [0, { beta: a }],
                ts: a,
                torproject: [2, { pages: a }],
                "reserve-online": a,
                "community-pro": a,
                meinforum: a,
                yandexcloud: [2, { storage: a, website: a }],
                za: a,
              },
            ],
            nf: [1, { com: e, net: e, per: e, rec: e, web: e, arts: e, firm: e, info: e, other: e, store: e }],
            ng: [
              1,
              {
                com: o,
                edu: e,
                gov: e,
                i: e,
                mil: e,
                mobi: e,
                name: e,
                net: e,
                org: e,
                sch: e,
                col: a,
                firm: a,
                gen: a,
                ltd: a,
                ngo: a,
              },
            ],
            ni: [
              1,
              {
                ac: e,
                biz: e,
                co: e,
                com: e,
                edu: e,
                gob: e,
                in: e,
                info: e,
                int: e,
                mil: e,
                net: e,
                nom: e,
                org: e,
                web: e,
              },
            ],
            nl: [
              1,
              {
                co: a,
                "hosting-cluster": a,
                blogspot: a,
                gov: a,
                khplay: a,
                "123website": a,
                myspreadshop: a,
                transurl: n,
                cistron: a,
                demon: a,
              },
            ],
            no: [
              1,
              {
                fhs: e,
                vgs: e,
                fylkesbibl: e,
                folkebibl: e,
                museum: e,
                idrett: e,
                priv: e,
                mil: e,
                stat: e,
                dep: e,
                kommune: e,
                herad: e,
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
                akrehamn: e,
                "xn--krehamn-dxa": e,
                åkrehamn: e,
                algard: e,
                "xn--lgrd-poac": e,
                ålgård: e,
                arna: e,
                brumunddal: e,
                bryne: e,
                bronnoysund: e,
                "xn--brnnysund-m8ac": e,
                brønnøysund: e,
                drobak: e,
                "xn--drbak-wua": e,
                drøbak: e,
                egersund: e,
                fetsund: e,
                floro: e,
                "xn--flor-jra": e,
                florø: e,
                fredrikstad: e,
                hokksund: e,
                honefoss: e,
                "xn--hnefoss-q1a": e,
                hønefoss: e,
                jessheim: e,
                jorpeland: e,
                "xn--jrpeland-54a": e,
                jørpeland: e,
                kirkenes: e,
                kopervik: e,
                krokstadelva: e,
                langevag: e,
                "xn--langevg-jxa": e,
                langevåg: e,
                leirvik: e,
                mjondalen: e,
                "xn--mjndalen-64a": e,
                mjøndalen: e,
                "mo-i-rana": e,
                mosjoen: e,
                "xn--mosjen-eya": e,
                mosjøen: e,
                nesoddtangen: e,
                orkanger: e,
                osoyro: e,
                "xn--osyro-wua": e,
                osøyro: e,
                raholt: e,
                "xn--rholt-mra": e,
                råholt: e,
                sandnessjoen: e,
                "xn--sandnessjen-ogb": e,
                sandnessjøen: e,
                skedsmokorset: e,
                slattum: e,
                spjelkavik: e,
                stathelle: e,
                stavern: e,
                stjordalshalsen: e,
                "xn--stjrdalshalsen-sqb": e,
                stjørdalshalsen: e,
                tananger: e,
                tranby: e,
                vossevangen: e,
                afjord: e,
                "xn--fjord-lra": e,
                åfjord: e,
                agdenes: e,
                al: e,
                "xn--l-1fa": e,
                ål: e,
                alesund: e,
                "xn--lesund-hua": e,
                ålesund: e,
                alstahaug: e,
                alta: e,
                "xn--lt-liac": e,
                áltá: e,
                alaheadju: e,
                "xn--laheadju-7ya": e,
                álaheadju: e,
                alvdal: e,
                amli: e,
                "xn--mli-tla": e,
                åmli: e,
                amot: e,
                "xn--mot-tla": e,
                åmot: e,
                andebu: e,
                andoy: e,
                "xn--andy-ira": e,
                andøy: e,
                andasuolo: e,
                ardal: e,
                "xn--rdal-poa": e,
                årdal: e,
                aremark: e,
                arendal: e,
                "xn--s-1fa": e,
                ås: e,
                aseral: e,
                "xn--seral-lra": e,
                åseral: e,
                asker: e,
                askim: e,
                askvoll: e,
                askoy: e,
                "xn--asky-ira": e,
                askøy: e,
                asnes: e,
                "xn--snes-poa": e,
                åsnes: e,
                audnedaln: e,
                aukra: e,
                aure: e,
                aurland: e,
                "aurskog-holand": e,
                "xn--aurskog-hland-jnb": e,
                "aurskog-h\xf8land": e,
                austevoll: e,
                austrheim: e,
                averoy: e,
                "xn--avery-yua": e,
                averøy: e,
                balestrand: e,
                ballangen: e,
                balat: e,
                "xn--blt-elab": e,
                bálát: e,
                balsfjord: e,
                bahccavuotna: e,
                "xn--bhccavuotna-k7a": e,
                báhccavuotna: e,
                bamble: e,
                bardu: e,
                beardu: e,
                beiarn: e,
                bajddar: e,
                "xn--bjddar-pta": e,
                bájddar: e,
                baidar: e,
                "xn--bidr-5nac": e,
                báidár: e,
                berg: e,
                bergen: e,
                berlevag: e,
                "xn--berlevg-jxa": e,
                berlevåg: e,
                bearalvahki: e,
                "xn--bearalvhki-y4a": e,
                bearalváhki: e,
                bindal: e,
                birkenes: e,
                bjarkoy: e,
                "xn--bjarky-fya": e,
                bjarkøy: e,
                bjerkreim: e,
                bjugn: e,
                bodo: e,
                "xn--bod-2na": e,
                bodø: e,
                badaddja: e,
                "xn--bdddj-mrabd": e,
                bådåddjå: e,
                budejju: e,
                bokn: e,
                bremanger: e,
                bronnoy: e,
                "xn--brnny-wuac": e,
                brønnøy: e,
                bygland: e,
                bykle: e,
                barum: e,
                "xn--brum-voa": e,
                bærum: e,
                telemark: [0, { bo: e, "xn--b-5ga": e, bø: e }],
                nordland: [0, { bo: e, "xn--b-5ga": e, bø: e, heroy: e, "xn--hery-ira": e, herøy: e }],
                bievat: e,
                "xn--bievt-0qa": e,
                bievát: e,
                bomlo: e,
                "xn--bmlo-gra": e,
                bømlo: e,
                batsfjord: e,
                "xn--btsfjord-9za": e,
                båtsfjord: e,
                bahcavuotna: e,
                "xn--bhcavuotna-s4a": e,
                báhcavuotna: e,
                dovre: e,
                drammen: e,
                drangedal: e,
                dyroy: e,
                "xn--dyry-ira": e,
                dyrøy: e,
                donna: e,
                "xn--dnna-gra": e,
                dønna: e,
                eid: e,
                eidfjord: e,
                eidsberg: e,
                eidskog: e,
                eidsvoll: e,
                eigersund: e,
                elverum: e,
                enebakk: e,
                engerdal: e,
                etne: e,
                etnedal: e,
                evenes: e,
                evenassi: e,
                "xn--eveni-0qa01ga": e,
                evenášši: e,
                "evje-og-hornnes": e,
                farsund: e,
                fauske: e,
                fuossko: e,
                fuoisku: e,
                fedje: e,
                fet: e,
                finnoy: e,
                "xn--finny-yua": e,
                finnøy: e,
                fitjar: e,
                fjaler: e,
                fjell: e,
                flakstad: e,
                flatanger: e,
                flekkefjord: e,
                flesberg: e,
                flora: e,
                fla: e,
                "xn--fl-zia": e,
                flå: e,
                folldal: e,
                forsand: e,
                fosnes: e,
                frei: e,
                frogn: e,
                froland: e,
                frosta: e,
                frana: e,
                "xn--frna-woa": e,
                fræna: e,
                froya: e,
                "xn--frya-hra": e,
                frøya: e,
                fusa: e,
                fyresdal: e,
                forde: e,
                "xn--frde-gra": e,
                førde: e,
                gamvik: e,
                gangaviika: e,
                "xn--ggaviika-8ya47h": e,
                gáŋgaviika: e,
                gaular: e,
                gausdal: e,
                gildeskal: e,
                "xn--gildeskl-g0a": e,
                gildeskål: e,
                giske: e,
                gjemnes: e,
                gjerdrum: e,
                gjerstad: e,
                gjesdal: e,
                gjovik: e,
                "xn--gjvik-wua": e,
                gjøvik: e,
                gloppen: e,
                gol: e,
                gran: e,
                grane: e,
                granvin: e,
                gratangen: e,
                grimstad: e,
                grong: e,
                kraanghke: e,
                "xn--kranghke-b0a": e,
                kråanghke: e,
                grue: e,
                gulen: e,
                hadsel: e,
                halden: e,
                halsa: e,
                hamar: e,
                hamaroy: e,
                habmer: e,
                "xn--hbmer-xqa": e,
                hábmer: e,
                hapmir: e,
                "xn--hpmir-xqa": e,
                hápmir: e,
                hammerfest: e,
                hammarfeasta: e,
                "xn--hmmrfeasta-s4ac": e,
                hámmárfeasta: e,
                haram: e,
                hareid: e,
                harstad: e,
                hasvik: e,
                aknoluokta: e,
                "xn--koluokta-7ya57h": e,
                ákŋoluokta: e,
                hattfjelldal: e,
                aarborte: e,
                haugesund: e,
                hemne: e,
                hemnes: e,
                hemsedal: e,
                "more-og-romsdal": [0, { heroy: e, sande: e }],
                "xn--mre-og-romsdal-qqb": [0, { "xn--hery-ira": e, sande: e }],
                "m\xf8re-og-romsdal": [0, { herøy: e, sande: e }],
                hitra: e,
                hjartdal: e,
                hjelmeland: e,
                hobol: e,
                "xn--hobl-ira": e,
                hobøl: e,
                hof: e,
                hol: e,
                hole: e,
                holmestrand: e,
                holtalen: e,
                "xn--holtlen-hxa": e,
                holtålen: e,
                hornindal: e,
                horten: e,
                hurdal: e,
                hurum: e,
                hvaler: e,
                hyllestad: e,
                hagebostad: e,
                "xn--hgebostad-g3a": e,
                hægebostad: e,
                hoyanger: e,
                "xn--hyanger-q1a": e,
                høyanger: e,
                hoylandet: e,
                "xn--hylandet-54a": e,
                høylandet: e,
                ha: e,
                "xn--h-2fa": e,
                hå: e,
                ibestad: e,
                inderoy: e,
                "xn--indery-fya": e,
                inderøy: e,
                iveland: e,
                jevnaker: e,
                jondal: e,
                jolster: e,
                "xn--jlster-bya": e,
                jølster: e,
                karasjok: e,
                karasjohka: e,
                "xn--krjohka-hwab49j": e,
                kárášjohka: e,
                karlsoy: e,
                galsa: e,
                "xn--gls-elac": e,
                gálsá: e,
                karmoy: e,
                "xn--karmy-yua": e,
                karmøy: e,
                kautokeino: e,
                guovdageaidnu: e,
                klepp: e,
                klabu: e,
                "xn--klbu-woa": e,
                klæbu: e,
                kongsberg: e,
                kongsvinger: e,
                kragero: e,
                "xn--krager-gya": e,
                kragerø: e,
                kristiansand: e,
                kristiansund: e,
                krodsherad: e,
                "xn--krdsherad-m8a": e,
                krødsherad: e,
                kvalsund: e,
                rahkkeravju: e,
                "xn--rhkkervju-01af": e,
                ráhkkerávju: e,
                kvam: e,
                kvinesdal: e,
                kvinnherad: e,
                kviteseid: e,
                kvitsoy: e,
                "xn--kvitsy-fya": e,
                kvitsøy: e,
                kvafjord: e,
                "xn--kvfjord-nxa": e,
                kvæfjord: e,
                giehtavuoatna: e,
                kvanangen: e,
                "xn--kvnangen-k0a": e,
                kvænangen: e,
                navuotna: e,
                "xn--nvuotna-hwa": e,
                návuotna: e,
                kafjord: e,
                "xn--kfjord-iua": e,
                kåfjord: e,
                gaivuotna: e,
                "xn--givuotna-8ya": e,
                gáivuotna: e,
                larvik: e,
                lavangen: e,
                lavagis: e,
                loabat: e,
                "xn--loabt-0qa": e,
                loabát: e,
                lebesby: e,
                davvesiida: e,
                leikanger: e,
                leirfjord: e,
                leka: e,
                leksvik: e,
                lenvik: e,
                leangaviika: e,
                "xn--leagaviika-52b": e,
                leaŋgaviika: e,
                lesja: e,
                levanger: e,
                lier: e,
                lierne: e,
                lillehammer: e,
                lillesand: e,
                lindesnes: e,
                lindas: e,
                "xn--linds-pra": e,
                lindås: e,
                lom: e,
                loppa: e,
                lahppi: e,
                "xn--lhppi-xqa": e,
                láhppi: e,
                lund: e,
                lunner: e,
                luroy: e,
                "xn--lury-ira": e,
                lurøy: e,
                luster: e,
                lyngdal: e,
                lyngen: e,
                ivgu: e,
                lardal: e,
                lerdal: e,
                "xn--lrdal-sra": e,
                lærdal: e,
                lodingen: e,
                "xn--ldingen-q1a": e,
                lødingen: e,
                lorenskog: e,
                "xn--lrenskog-54a": e,
                lørenskog: e,
                loten: e,
                "xn--lten-gra": e,
                løten: e,
                malvik: e,
                masoy: e,
                "xn--msy-ula0h": e,
                måsøy: e,
                muosat: e,
                "xn--muost-0qa": e,
                muosát: e,
                mandal: e,
                marker: e,
                marnardal: e,
                masfjorden: e,
                meland: e,
                meldal: e,
                melhus: e,
                meloy: e,
                "xn--mely-ira": e,
                meløy: e,
                meraker: e,
                "xn--merker-kua": e,
                meråker: e,
                moareke: e,
                "xn--moreke-jua": e,
                moåreke: e,
                midsund: e,
                "midtre-gauldal": e,
                modalen: e,
                modum: e,
                molde: e,
                moskenes: e,
                moss: e,
                mosvik: e,
                malselv: e,
                "xn--mlselv-iua": e,
                målselv: e,
                malatvuopmi: e,
                "xn--mlatvuopmi-s4a": e,
                málatvuopmi: e,
                namdalseid: e,
                aejrie: e,
                namsos: e,
                namsskogan: e,
                naamesjevuemie: e,
                "xn--nmesjevuemie-tcba": e,
                nååmesjevuemie: e,
                laakesvuemie: e,
                nannestad: e,
                narvik: e,
                narviika: e,
                naustdal: e,
                "nedre-eiker": e,
                akershus: O,
                buskerud: O,
                nesna: e,
                nesodden: e,
                nesseby: e,
                unjarga: e,
                "xn--unjrga-rta": e,
                unjárga: e,
                nesset: e,
                nissedal: e,
                nittedal: e,
                "nord-aurdal": e,
                "nord-fron": e,
                "nord-odal": e,
                norddal: e,
                nordkapp: e,
                davvenjarga: e,
                "xn--davvenjrga-y4a": e,
                davvenjárga: e,
                "nordre-land": e,
                nordreisa: e,
                raisa: e,
                "xn--risa-5na": e,
                ráisa: e,
                "nore-og-uvdal": e,
                notodden: e,
                naroy: e,
                "xn--nry-yla5g": e,
                nærøy: e,
                notteroy: e,
                "xn--nttery-byae": e,
                nøtterøy: e,
                odda: e,
                oksnes: e,
                "xn--ksnes-uua": e,
                øksnes: e,
                oppdal: e,
                oppegard: e,
                "xn--oppegrd-ixa": e,
                oppegård: e,
                orkdal: e,
                orland: e,
                "xn--rland-uua": e,
                ørland: e,
                orskog: e,
                "xn--rskog-uua": e,
                ørskog: e,
                orsta: e,
                "xn--rsta-fra": e,
                ørsta: e,
                hedmark: [0, { os: e, valer: e, "xn--vler-qoa": e, våler: e }],
                hordaland: [0, { os: e }],
                osen: e,
                osteroy: e,
                "xn--ostery-fya": e,
                osterøy: e,
                "ostre-toten": e,
                "xn--stre-toten-zcb": e,
                "\xf8stre-toten": e,
                overhalla: e,
                "ovre-eiker": e,
                "xn--vre-eiker-k8a": e,
                "\xf8vre-eiker": e,
                oyer: e,
                "xn--yer-zna": e,
                øyer: e,
                oygarden: e,
                "xn--ygarden-p1a": e,
                øygarden: e,
                "oystre-slidre": e,
                "xn--ystre-slidre-ujb": e,
                "\xf8ystre-slidre": e,
                porsanger: e,
                porsangu: e,
                "xn--porsgu-sta26f": e,
                porsáŋgu: e,
                porsgrunn: e,
                radoy: e,
                "xn--rady-ira": e,
                radøy: e,
                rakkestad: e,
                rana: e,
                ruovat: e,
                randaberg: e,
                rauma: e,
                rendalen: e,
                rennebu: e,
                rennesoy: e,
                "xn--rennesy-v1a": e,
                rennesøy: e,
                rindal: e,
                ringebu: e,
                ringerike: e,
                ringsaker: e,
                rissa: e,
                risor: e,
                "xn--risr-ira": e,
                risør: e,
                roan: e,
                rollag: e,
                rygge: e,
                ralingen: e,
                "xn--rlingen-mxa": e,
                rælingen: e,
                rodoy: e,
                "xn--rdy-0nab": e,
                rødøy: e,
                romskog: e,
                "xn--rmskog-bya": e,
                rømskog: e,
                roros: e,
                "xn--rros-gra": e,
                røros: e,
                rost: e,
                "xn--rst-0na": e,
                røst: e,
                royken: e,
                "xn--ryken-vua": e,
                røyken: e,
                royrvik: e,
                "xn--ryrvik-bya": e,
                røyrvik: e,
                rade: e,
                "xn--rde-ula": e,
                råde: e,
                salangen: e,
                siellak: e,
                saltdal: e,
                salat: e,
                "xn--slt-elab": e,
                sálát: e,
                "xn--slat-5na": e,
                sálat: e,
                samnanger: e,
                vestfold: [0, { sande: e }],
                sandefjord: e,
                sandnes: e,
                sandoy: e,
                "xn--sandy-yua": e,
                sandøy: e,
                sarpsborg: e,
                sauda: e,
                sauherad: e,
                sel: e,
                selbu: e,
                selje: e,
                seljord: e,
                sigdal: e,
                siljan: e,
                sirdal: e,
                skaun: e,
                skedsmo: e,
                ski: e,
                skien: e,
                skiptvet: e,
                skjervoy: e,
                "xn--skjervy-v1a": e,
                skjervøy: e,
                skierva: e,
                "xn--skierv-uta": e,
                skiervá: e,
                skjak: e,
                "xn--skjk-soa": e,
                skjåk: e,
                skodje: e,
                skanland: e,
                "xn--sknland-fxa": e,
                skånland: e,
                skanit: e,
                "xn--sknit-yqa": e,
                skánit: e,
                smola: e,
                "xn--smla-hra": e,
                smøla: e,
                snillfjord: e,
                snasa: e,
                "xn--snsa-roa": e,
                snåsa: e,
                snoasa: e,
                snaase: e,
                "xn--snase-nra": e,
                snåase: e,
                sogndal: e,
                sokndal: e,
                sola: e,
                solund: e,
                songdalen: e,
                sortland: e,
                spydeberg: e,
                stange: e,
                stavanger: e,
                steigen: e,
                steinkjer: e,
                stjordal: e,
                "xn--stjrdal-s1a": e,
                stjørdal: e,
                stokke: e,
                "stor-elvdal": e,
                stord: e,
                stordal: e,
                storfjord: e,
                omasvuotna: e,
                strand: e,
                stranda: e,
                stryn: e,
                sula: e,
                suldal: e,
                sund: e,
                sunndal: e,
                surnadal: e,
                sveio: e,
                svelvik: e,
                sykkylven: e,
                sogne: e,
                "xn--sgne-gra": e,
                søgne: e,
                somna: e,
                "xn--smna-gra": e,
                sømna: e,
                "sondre-land": e,
                "xn--sndre-land-0cb": e,
                "s\xf8ndre-land": e,
                "sor-aurdal": e,
                "xn--sr-aurdal-l8a": e,
                "s\xf8r-aurdal": e,
                "sor-fron": e,
                "xn--sr-fron-q1a": e,
                "s\xf8r-fron": e,
                "sor-odal": e,
                "xn--sr-odal-q1a": e,
                "s\xf8r-odal": e,
                "sor-varanger": e,
                "xn--sr-varanger-ggb": e,
                "s\xf8r-varanger": e,
                "matta-varjjat": e,
                "xn--mtta-vrjjat-k7af": e,
                "m\xe1tta-v\xe1rjjat": e,
                sorfold: e,
                "xn--srfold-bya": e,
                sørfold: e,
                sorreisa: e,
                "xn--srreisa-q1a": e,
                sørreisa: e,
                sorum: e,
                "xn--srum-gra": e,
                sørum: e,
                tana: e,
                deatnu: e,
                time: e,
                tingvoll: e,
                tinn: e,
                tjeldsund: e,
                dielddanuorri: e,
                tjome: e,
                "xn--tjme-hra": e,
                tjøme: e,
                tokke: e,
                tolga: e,
                torsken: e,
                tranoy: e,
                "xn--trany-yua": e,
                tranøy: e,
                tromso: e,
                "xn--troms-zua": e,
                tromsø: e,
                tromsa: e,
                romsa: e,
                trondheim: e,
                troandin: e,
                trysil: e,
                trana: e,
                "xn--trna-woa": e,
                træna: e,
                trogstad: e,
                "xn--trgstad-r1a": e,
                trøgstad: e,
                tvedestrand: e,
                tydal: e,
                tynset: e,
                tysfjord: e,
                divtasvuodna: e,
                divttasvuotna: e,
                tysnes: e,
                tysvar: e,
                "xn--tysvr-vra": e,
                tysvær: e,
                tonsberg: e,
                "xn--tnsberg-q1a": e,
                tønsberg: e,
                ullensaker: e,
                ullensvang: e,
                ulvik: e,
                utsira: e,
                vadso: e,
                "xn--vads-jra": e,
                vadsø: e,
                cahcesuolo: e,
                "xn--hcesuolo-7ya35b": e,
                čáhcesuolo: e,
                vaksdal: e,
                valle: e,
                vang: e,
                vanylven: e,
                vardo: e,
                "xn--vard-jra": e,
                vardø: e,
                varggat: e,
                "xn--vrggt-xqad": e,
                várggát: e,
                vefsn: e,
                vaapste: e,
                vega: e,
                vegarshei: e,
                "xn--vegrshei-c0a": e,
                vegårshei: e,
                vennesla: e,
                verdal: e,
                verran: e,
                vestby: e,
                vestnes: e,
                "vestre-slidre": e,
                "vestre-toten": e,
                vestvagoy: e,
                "xn--vestvgy-ixa6o": e,
                vestvågøy: e,
                vevelstad: e,
                vik: e,
                vikna: e,
                vindafjord: e,
                volda: e,
                voss: e,
                varoy: e,
                "xn--vry-yla5g": e,
                værøy: e,
                vagan: e,
                "xn--vgan-qoa": e,
                vågan: e,
                voagat: e,
                vagsoy: e,
                "xn--vgsy-qoa0j": e,
                vågsøy: e,
                vaga: e,
                "xn--vg-yiab": e,
                vågå: e,
                ostfold: [0, { valer: e }],
                "xn--stfold-9xa": [0, { "xn--vler-qoa": e }],
                østfold: [0, { våler: e }],
                co: a,
                blogspot: a,
                "123hjemmeside": a,
                myspreadshop: a,
              },
            ],
            np: s,
            nr: _,
            nu: [1, { merseine: a, mine: a, shacknet: a, enterprisecloud: a }],
            nz: [
              1,
              {
                ac: e,
                co: o,
                cri: e,
                geek: e,
                gen: e,
                govt: e,
                health: e,
                iwi: e,
                kiwi: e,
                maori: e,
                mil: e,
                "xn--mori-qsa": e,
                māori: e,
                net: e,
                org: e,
                parliament: e,
                school: e,
              },
            ],
            om: [1, { co: e, com: e, edu: e, gov: e, med: e, museum: e, net: e, org: e, pro: e }],
            onion: e,
            org: [
              1,
              {
                altervista: a,
                amune: [0, { tele: a }],
                pimienta: a,
                poivron: a,
                potager: a,
                sweetpepper: a,
                ae: a,
                us: a,
                certmgr: a,
                cdn77: [0, { c: a, rsc: a }],
                "cdn77-secure": [0, { origin: [0, { ssl: a }] }],
                cloudns: a,
                duckdns: a,
                tunk: a,
                dyndns: [2, { go: a, home: a }],
                blogdns: a,
                blogsite: a,
                boldlygoingnowhere: a,
                dnsalias: a,
                dnsdojo: a,
                doesntexist: a,
                dontexist: a,
                doomdns: a,
                dvrdns: a,
                dynalias: a,
                endofinternet: a,
                endoftheinternet: a,
                "from-me": a,
                "game-host": a,
                gotdns: a,
                "hobby-site": a,
                homedns: a,
                homeftp: a,
                homelinux: a,
                homeunix: a,
                "is-a-bruinsfan": a,
                "is-a-candidate": a,
                "is-a-celticsfan": a,
                "is-a-chef": a,
                "is-a-geek": a,
                "is-a-knight": a,
                "is-a-linux-user": a,
                "is-a-patsfan": a,
                "is-a-soxfan": a,
                "is-found": a,
                "is-lost": a,
                "is-saved": a,
                "is-very-bad": a,
                "is-very-evil": a,
                "is-very-good": a,
                "is-very-nice": a,
                "is-very-sweet": a,
                "isa-geek": a,
                "kicks-ass": a,
                misconfused: a,
                podzone: a,
                readmyblog: a,
                selfip: a,
                sellsyourhome: a,
                servebbs: a,
                serveftp: a,
                servegame: a,
                "stuff-4-sale": a,
                webhop: a,
                ddnss: a,
                accesscam: a,
                camdvr: a,
                freeddns: a,
                mywire: a,
                webredirect: a,
                eu: [
                  2,
                  {
                    al: a,
                    asso: a,
                    at: a,
                    au: a,
                    be: a,
                    bg: a,
                    ca: a,
                    cd: a,
                    ch: a,
                    cn: a,
                    cy: a,
                    cz: a,
                    de: a,
                    dk: a,
                    edu: a,
                    ee: a,
                    es: a,
                    fi: a,
                    fr: a,
                    gr: a,
                    hr: a,
                    hu: a,
                    ie: a,
                    il: a,
                    in: a,
                    int: a,
                    is: a,
                    it: a,
                    jp: a,
                    kr: a,
                    lt: a,
                    lu: a,
                    lv: a,
                    mc: a,
                    me: a,
                    mk: a,
                    mt: a,
                    my: a,
                    net: a,
                    ng: a,
                    nl: a,
                    no: a,
                    nz: a,
                    paris: a,
                    pl: a,
                    pt: a,
                    "q-a": a,
                    ro: a,
                    ru: a,
                    se: a,
                    si: a,
                    sk: a,
                    tr: a,
                    uk: a,
                    us: a,
                  },
                ],
                twmail: a,
                fedorainfracloud: a,
                fedorapeople: a,
                fedoraproject: [0, { cloud: a, os: w, stg: [0, { os: w }] }],
                freedesktop: a,
                hepforge: a,
                "in-dsl": a,
                "in-vpn": a,
                js: a,
                barsy: a,
                mayfirst: a,
                "mozilla-iot": a,
                bmoattachments: a,
                dynserv: a,
                "now-dns": a,
                "cable-modem": a,
                collegefan: a,
                couchpotatofries: a,
                mlbfan: a,
                mysecuritycamera: a,
                nflfan: a,
                "read-books": a,
                ufcfan: a,
                hopto: a,
                myftp: a,
                "no-ip": a,
                zapto: a,
                httpbin: a,
                pubtls: a,
                jpn: a,
                "my-firewall": a,
                myfirewall: a,
                spdns: a,
                "small-web": a,
                dsmynas: a,
                familyds: a,
                teckids: u,
                tuxfamily: a,
                diskstation: a,
                hk: a,
                wmflabs: a,
                toolforge: a,
                wmcloud: a,
                za: a,
              },
            ],
            pa: [1, { ac: e, gob: e, com: e, org: e, sld: e, edu: e, net: e, ing: e, abo: e, med: e, nom: e }],
            pe: [1, { edu: e, gob: e, nom: e, mil: e, org: e, com: e, net: e, blogspot: a }],
            pf: [1, { com: e, org: e, edu: e }],
            pg: s,
            ph: [1, { com: e, net: e, org: e, gov: e, edu: e, ngo: e, mil: e, i: e }],
            pk: [
              1,
              {
                com: e,
                net: e,
                edu: e,
                org: e,
                fam: e,
                biz: e,
                web: e,
                gov: e,
                gob: e,
                gok: e,
                gon: e,
                gop: e,
                gos: e,
                info: e,
              },
            ],
            pl: [
              1,
              {
                com: e,
                net: e,
                org: e,
                aid: e,
                agro: e,
                atm: e,
                auto: e,
                biz: e,
                edu: e,
                gmina: e,
                gsm: e,
                info: e,
                mail: e,
                miasta: e,
                media: e,
                mil: e,
                nieruchomosci: e,
                nom: e,
                pc: e,
                powiat: e,
                priv: e,
                realestate: e,
                rel: e,
                sex: e,
                shop: e,
                sklep: e,
                sos: e,
                szkola: e,
                targi: e,
                tm: e,
                tourism: e,
                travel: e,
                turystyka: e,
                gov: [
                  1,
                  {
                    ap: e,
                    griw: e,
                    ic: e,
                    is: e,
                    kmpsp: e,
                    konsulat: e,
                    kppsp: e,
                    kwp: e,
                    kwpsp: e,
                    mup: e,
                    mw: e,
                    oia: e,
                    oirm: e,
                    oke: e,
                    oow: e,
                    oschr: e,
                    oum: e,
                    pa: e,
                    pinb: e,
                    piw: e,
                    po: e,
                    pr: e,
                    psp: e,
                    psse: e,
                    pup: e,
                    rzgw: e,
                    sa: e,
                    sdn: e,
                    sko: e,
                    so: e,
                    sr: e,
                    starostwo: e,
                    ug: e,
                    ugim: e,
                    um: e,
                    umig: e,
                    upow: e,
                    uppo: e,
                    us: e,
                    uw: e,
                    uzs: e,
                    wif: e,
                    wiih: e,
                    winb: e,
                    wios: e,
                    witd: e,
                    wiw: e,
                    wkz: e,
                    wsa: e,
                    wskr: e,
                    wsse: e,
                    wuoz: e,
                    wzmiuw: e,
                    zp: e,
                    zpisdn: e,
                  },
                ],
                augustow: e,
                "babia-gora": e,
                bedzin: e,
                beskidy: e,
                bialowieza: e,
                bialystok: e,
                bielawa: e,
                bieszczady: e,
                boleslawiec: e,
                bydgoszcz: e,
                bytom: e,
                cieszyn: e,
                czeladz: e,
                czest: e,
                dlugoleka: e,
                elblag: e,
                elk: e,
                glogow: e,
                gniezno: e,
                gorlice: e,
                grajewo: e,
                ilawa: e,
                jaworzno: e,
                "jelenia-gora": e,
                jgora: e,
                kalisz: e,
                "kazimierz-dolny": e,
                karpacz: e,
                kartuzy: e,
                kaszuby: e,
                katowice: e,
                kepno: e,
                ketrzyn: e,
                klodzko: e,
                kobierzyce: e,
                kolobrzeg: e,
                konin: e,
                konskowola: e,
                kutno: e,
                lapy: e,
                lebork: e,
                legnica: e,
                lezajsk: e,
                limanowa: e,
                lomza: e,
                lowicz: e,
                lubin: e,
                lukow: e,
                malbork: e,
                malopolska: e,
                mazowsze: e,
                mazury: e,
                mielec: e,
                mielno: e,
                mragowo: e,
                naklo: e,
                nowaruda: e,
                nysa: e,
                olawa: e,
                olecko: e,
                olkusz: e,
                olsztyn: e,
                opoczno: e,
                opole: e,
                ostroda: e,
                ostroleka: e,
                ostrowiec: e,
                ostrowwlkp: e,
                pila: e,
                pisz: e,
                podhale: e,
                podlasie: e,
                polkowice: e,
                pomorze: e,
                pomorskie: e,
                prochowice: e,
                pruszkow: e,
                przeworsk: e,
                pulawy: e,
                radom: e,
                "rawa-maz": e,
                rybnik: e,
                rzeszow: e,
                sanok: e,
                sejny: e,
                slask: e,
                slupsk: e,
                sosnowiec: e,
                "stalowa-wola": e,
                skoczow: e,
                starachowice: e,
                stargard: e,
                suwalki: e,
                swidnica: e,
                swiebodzin: e,
                swinoujscie: e,
                szczecin: e,
                szczytno: e,
                tarnobrzeg: e,
                tgory: e,
                turek: e,
                tychy: e,
                ustka: e,
                walbrzych: e,
                warmia: e,
                warszawa: e,
                waw: e,
                wegrow: e,
                wielun: e,
                wlocl: e,
                wloclawek: e,
                wodzislaw: e,
                wolomin: e,
                wroclaw: e,
                zachpomor: e,
                zagan: e,
                zarow: e,
                zgora: e,
                zgorzelec: e,
                beep: a,
                "ecommerce-shop": a,
                shoparena: a,
                homesklep: a,
                sdscloud: a,
                unicloud: a,
                krasnik: a,
                leczna: a,
                lubartow: a,
                lublin: a,
                poniatowa: a,
                swidnik: a,
                co: a,
                simplesite: a,
                art: a,
                gliwice: a,
                krakow: a,
                poznan: a,
                wroc: a,
                zakopane: a,
                myspreadshop: a,
                gda: a,
                gdansk: a,
                gdynia: a,
                med: a,
                sopot: a,
              },
            ],
            pm: [1, { own: a, name: a }],
            pn: [1, { gov: e, co: e, org: e, edu: e, net: e }],
            post: e,
            pr: [
              1,
              {
                com: e,
                net: e,
                org: e,
                gov: e,
                edu: e,
                isla: e,
                pro: e,
                biz: e,
                info: e,
                name: e,
                est: e,
                prof: e,
                ac: e,
              },
            ],
            pro: [
              1,
              {
                aaa: e,
                aca: e,
                acct: e,
                avocat: e,
                bar: e,
                cpa: e,
                eng: e,
                jur: e,
                law: e,
                med: e,
                recht: e,
                cloudns: a,
                dnstrace: [0, { bci: a }],
                barsy: a,
              },
            ],
            ps: [1, { edu: e, gov: e, sec: e, plo: e, com: e, org: e, net: e }],
            pt: [
              1,
              { net: e, gov: e, org: e, edu: e, int: e, publ: e, com: e, nome: e, blogspot: a, "123paginaweb": a },
            ],
            pw: [1, { co: e, ne: e, or: e, ed: e, go: e, belau: e, cloudns: a, x443: a }],
            py: [1, { com: e, coop: e, edu: e, gov: e, mil: e, net: e, org: e }],
            qa: [1, { com: e, edu: e, gov: e, mil: e, name: e, net: e, org: e, sch: e, blogspot: a }],
            re: [1, { asso: e, com: e, nom: e, blogspot: a }],
            ro: [
              1,
              {
                arts: e,
                com: e,
                firm: e,
                info: e,
                nom: e,
                nt: e,
                org: e,
                rec: e,
                store: e,
                tm: e,
                www: e,
                co: a,
                shop: a,
                blogspot: a,
                barsy: a,
              },
            ],
            rs: [
              1,
              { ac: e, co: e, edu: e, gov: e, in: e, org: e, brendly: [0, { shop: a }], blogspot: a, ua: a, ox: a },
            ],
            ru: [
              1,
              {
                ac: a,
                edu: a,
                gov: a,
                int: a,
                mil: a,
                test: a,
                eurodir: a,
                adygeya: a,
                bashkiria: a,
                bir: a,
                cbg: a,
                com: a,
                dagestan: a,
                grozny: a,
                kalmykia: a,
                kustanai: a,
                marine: a,
                mordovia: a,
                msk: a,
                mytis: a,
                nalchik: a,
                nov: a,
                pyatigorsk: a,
                spb: a,
                vladikavkaz: a,
                vladimir: a,
                blogspot: a,
                na4u: a,
                mircloud: a,
                regruhosting: q,
                myjino: [2, { hosting: n, landing: n, spectrum: n, vps: n }],
                cldmail: [0, { hb: a }],
                mcdir: [2, { vps: a }],
                mcpre: a,
                net: a,
                org: a,
                pp: a,
                "123sait": a,
                lk3: a,
                ras: a,
              },
            ],
            rw: [1, { ac: e, co: e, coop: e, gov: e, mil: e, net: e, org: e }],
            sa: [1, { com: e, net: e, org: e, gov: e, med: e, pub: e, edu: e, sch: e }],
            sb: t,
            sc: t,
            sd: [1, { com: e, net: e, org: e, edu: e, med: e, tv: e, gov: e, info: e }],
            se: [
              1,
              {
                a: e,
                ac: e,
                b: e,
                bd: e,
                brand: e,
                c: e,
                d: e,
                e,
                f: e,
                fh: e,
                fhsk: e,
                fhv: e,
                g: e,
                h: e,
                i: e,
                k: e,
                komforb: e,
                kommunalforbund: e,
                komvux: e,
                l: e,
                lanbib: e,
                m: e,
                n: e,
                naturbruksgymn: e,
                o: e,
                org: e,
                p: e,
                parti: e,
                pp: e,
                press: e,
                r: e,
                s: e,
                t: e,
                tm: e,
                u: e,
                w: e,
                x: e,
                y: e,
                z: e,
                com: a,
                blogspot: a,
                conf: a,
                iopsys: a,
                "123minsida": a,
                itcouldbewor: a,
                myspreadshop: a,
                paba: [0, { su: a }],
              },
            ],
            sg: [1, { com: e, net: e, org: e, gov: e, edu: e, per: e, blogspot: a, enscaled: a }],
            sh: [
              1,
              {
                com: e,
                net: e,
                gov: e,
                org: e,
                mil: e,
                bip: a,
                hashbang: a,
                platform: [0, { bc: a, ent: a, eu: a, us: a }],
                now: a,
                vxl: a,
                wedeploy: a,
              },
            ],
            si: [1, { gitapp: a, gitpage: a, blogspot: a }],
            sj: e,
            sk: o,
            sl: t,
            sm: e,
            sn: [1, { art: e, com: e, edu: e, gouv: e, org: e, perso: e, univ: e, blogspot: a }],
            so: [1, { com: e, edu: e, gov: e, me: e, net: e, org: e, sch: a }],
            sr: e,
            ss: [1, { biz: e, com: e, edu: e, gov: e, me: e, net: e, org: e, sch: e }],
            st: [
              1,
              {
                co: e,
                com: e,
                consulado: e,
                edu: e,
                embaixada: e,
                mil: e,
                net: e,
                org: e,
                principe: e,
                saotome: e,
                store: e,
                kirara: a,
                noho: a,
              },
            ],
            su: [
              1,
              {
                abkhazia: a,
                adygeya: a,
                aktyubinsk: a,
                arkhangelsk: a,
                armenia: a,
                ashgabad: a,
                azerbaijan: a,
                balashov: a,
                bashkiria: a,
                bryansk: a,
                bukhara: a,
                chimkent: a,
                dagestan: a,
                "east-kazakhstan": a,
                exnet: a,
                georgia: a,
                grozny: a,
                ivanovo: a,
                jambyl: a,
                kalmykia: a,
                kaluga: a,
                karacol: a,
                karaganda: a,
                karelia: a,
                khakassia: a,
                krasnodar: a,
                kurgan: a,
                kustanai: a,
                lenug: a,
                mangyshlak: a,
                mordovia: a,
                msk: a,
                murmansk: a,
                nalchik: a,
                navoi: a,
                "north-kazakhstan": a,
                nov: a,
                obninsk: a,
                penza: a,
                pokrovsk: a,
                sochi: a,
                spb: a,
                tashkent: a,
                termez: a,
                togliatti: a,
                troitsk: a,
                tselinograd: a,
                tula: a,
                tuva: a,
                vladikavkaz: a,
                vladimir: a,
                vologda: a,
              },
            ],
            sv: [1, { com: e, edu: e, gob: e, org: e, red: e }],
            sx: i,
            sy: D,
            sz: [1, { co: e, ac: e, org: e }],
            tc: [1, { ch: a, me: a, we: a }],
            td: o,
            tel: e,
            tf: [1, { sch: a }],
            tg: e,
            th: [1, { ac: e, co: e, go: e, in: e, mi: e, net: e, or: e, online: a, shop: a }],
            tj: [
              1,
              {
                ac: e,
                biz: e,
                co: e,
                com: e,
                edu: e,
                go: e,
                gov: e,
                int: e,
                mil: e,
                name: e,
                net: e,
                nic: e,
                org: e,
                test: e,
                web: e,
              },
            ],
            tk: e,
            tl: i,
            tm: [1, { com: e, co: e, org: e, net: e, nom: e, gov: e, mil: e, edu: e }],
            tn: [
              1,
              {
                com: e,
                ens: e,
                fin: e,
                gov: e,
                ind: e,
                info: e,
                intl: e,
                mincom: e,
                nat: e,
                net: e,
                org: e,
                perso: e,
                tourism: e,
                orangecloud: a,
              },
            ],
            to: [
              1,
              {
                611: a,
                com: e,
                gov: e,
                net: e,
                org: e,
                edu: e,
                mil: e,
                oya: a,
                rdv: a,
                x0: a,
                vpnplus: a,
                quickconnect: d,
                nyan: a,
              },
            ],
            tr: [
              1,
              {
                av: e,
                bbs: e,
                bel: e,
                biz: e,
                com: o,
                dr: e,
                edu: e,
                gen: e,
                gov: e,
                info: e,
                mil: e,
                k12: e,
                kep: e,
                name: e,
                net: e,
                org: e,
                pol: e,
                tel: e,
                tsk: e,
                tv: e,
                web: e,
                nc: i,
              },
            ],
            tt: [
              1,
              {
                co: e,
                com: e,
                org: e,
                net: e,
                biz: e,
                info: e,
                pro: e,
                int: e,
                coop: e,
                jobs: e,
                mobi: e,
                travel: e,
                museum: e,
                aero: e,
                name: e,
                gov: e,
                edu: e,
              },
            ],
            tv: [1, { dyndns: a, "better-than": a, "on-the-web": a, "worse-than": a, from: a, sakura: a }],
            tw: [
              1,
              {
                edu: e,
                gov: e,
                mil: e,
                com: [1, { mymailer: a }],
                net: e,
                org: e,
                idv: e,
                game: e,
                ebiz: e,
                club: e,
                "xn--zf0ao64a": e,
                網路: e,
                "xn--uc0atv": e,
                組織: e,
                "xn--czrw28b": e,
                商業: e,
                url: a,
                blogspot: a,
              },
            ],
            tz: [1, { ac: e, co: e, go: e, hotel: e, info: e, me: e, mil: e, mobi: e, ne: e, or: e, sc: e, tv: e }],
            ua: [
              1,
              {
                com: e,
                edu: e,
                gov: e,
                in: e,
                net: e,
                org: e,
                cherkassy: e,
                cherkasy: e,
                chernigov: e,
                chernihiv: e,
                chernivtsi: e,
                chernovtsy: e,
                ck: e,
                cn: e,
                cr: e,
                crimea: e,
                cv: e,
                dn: e,
                dnepropetrovsk: e,
                dnipropetrovsk: e,
                donetsk: e,
                dp: e,
                if: e,
                "ivano-frankivsk": e,
                kh: e,
                kharkiv: e,
                kharkov: e,
                kherson: e,
                khmelnitskiy: e,
                khmelnytskyi: e,
                kiev: e,
                kirovograd: e,
                km: e,
                kr: e,
                kropyvnytskyi: e,
                krym: e,
                ks: e,
                kv: e,
                kyiv: e,
                lg: e,
                lt: e,
                lugansk: e,
                lutsk: e,
                lv: e,
                lviv: e,
                mk: e,
                mykolaiv: e,
                nikolaev: e,
                od: e,
                odesa: e,
                odessa: e,
                pl: e,
                poltava: e,
                rivne: e,
                rovno: e,
                rv: e,
                sb: e,
                sebastopol: e,
                sevastopol: e,
                sm: e,
                sumy: e,
                te: e,
                ternopil: e,
                uz: e,
                uzhgorod: e,
                vinnica: e,
                vinnytsia: e,
                vn: e,
                volyn: e,
                yalta: e,
                zaporizhzhe: e,
                zaporizhzhia: e,
                zhitomir: e,
                zhytomyr: e,
                zp: e,
                zt: e,
                cc: a,
                inf: a,
                ltd: a,
                cx: a,
                ie: a,
                biz: a,
                co: a,
                pp: a,
                v: a,
              },
            ],
            ug: [1, { co: e, or: e, ac: e, sc: e, go: e, ne: e, com: e, org: e, blogspot: a }],
            uk: [
              1,
              {
                ac: e,
                co: [
                  1,
                  {
                    bytemark: [0, { dh: a, vm: a }],
                    blogspot: a,
                    layershift: $,
                    barsy: a,
                    barsyonline: a,
                    retrosnub: U,
                    "nh-serv": a,
                    "no-ip": a,
                    wellbeingzone: a,
                    adimo: a,
                    myspreadshop: a,
                  },
                ],
                gov: [1, { campaign: a, service: a, api: a, homeoffice: a }],
                ltd: e,
                me: e,
                net: e,
                nhs: e,
                org: [1, { glug: a, lug: a, lugs: a, affinitylottery: a, raffleentry: a, weeklylottery: a }],
                plc: e,
                police: e,
                sch: s,
                conn: a,
                copro: a,
                hosp: a,
                "independent-commission": a,
                "independent-inquest": a,
                "independent-inquiry": a,
                "independent-panel": a,
                "independent-review": a,
                "public-inquiry": a,
                "royal-commission": a,
                pymnt: a,
                barsy: a,
              },
            ],
            us: [
              1,
              {
                dni: e,
                fed: e,
                isa: e,
                kids: e,
                nsn: e,
                ak: P,
                al: P,
                ar: P,
                as: P,
                az: P,
                ca: P,
                co: P,
                ct: P,
                dc: P,
                de: [1, { k12: e, cc: e, lib: a }],
                fl: P,
                ga: P,
                gu: P,
                hi: N,
                ia: P,
                id: P,
                il: P,
                in: P,
                ks: P,
                ky: P,
                la: P,
                ma: [1, { k12: [1, { pvt: e, chtr: e, paroch: e }], cc: e, lib: e }],
                md: P,
                me: P,
                mi: [
                  1,
                  {
                    k12: e,
                    cc: e,
                    lib: e,
                    "ann-arbor": e,
                    cog: e,
                    dst: e,
                    eaton: e,
                    gen: e,
                    mus: e,
                    tec: e,
                    washtenaw: e,
                  },
                ],
                mn: P,
                mo: P,
                ms: P,
                mt: P,
                nc: P,
                nd: N,
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
                ri: N,
                sc: P,
                sd: N,
                tn: P,
                tx: P,
                ut: P,
                vi: P,
                vt: P,
                va: P,
                wa: P,
                wi: P,
                wv: [1, { cc: e }],
                wy: P,
                graphox: a,
                cloudns: a,
                drud: a,
                "is-by": a,
                "land-4-sale": a,
                "stuff-4-sale": a,
                enscaled: [0, { phx: a }],
                mircloud: a,
                freeddns: a,
                golffan: a,
                noip: a,
                pointto: a,
                platterp: a,
              },
            ],
            uy: [1, { com: o, edu: e, gub: e, mil: e, net: e, org: e }],
            uz: [1, { co: e, com: e, net: e, org: e }],
            va: e,
            vc: [1, { com: e, net: e, org: e, gov: e, mil: e, edu: e, gv: [2, { d: a }], "0e": a }],
            ve: [
              1,
              {
                arts: e,
                bib: e,
                co: e,
                com: e,
                e12: e,
                edu: e,
                firm: e,
                gob: e,
                gov: e,
                info: e,
                int: e,
                mil: e,
                net: e,
                nom: e,
                org: e,
                rar: e,
                rec: e,
                store: e,
                tec: e,
                web: e,
              },
            ],
            vg: [1, { at: a }],
            vi: [1, { co: e, com: e, k12: e, net: e, org: e }],
            vn: [
              1,
              {
                ac: e,
                ai: e,
                biz: e,
                com: e,
                edu: e,
                gov: e,
                health: e,
                id: e,
                info: e,
                int: e,
                io: e,
                name: e,
                net: e,
                org: e,
                pro: e,
                angiang: e,
                bacgiang: e,
                backan: e,
                baclieu: e,
                bacninh: e,
                "baria-vungtau": e,
                bentre: e,
                binhdinh: e,
                binhduong: e,
                binhphuoc: e,
                binhthuan: e,
                camau: e,
                cantho: e,
                caobang: e,
                daklak: e,
                daknong: e,
                danang: e,
                dienbien: e,
                dongnai: e,
                dongthap: e,
                gialai: e,
                hagiang: e,
                haiduong: e,
                haiphong: e,
                hanam: e,
                hanoi: e,
                hatinh: e,
                haugiang: e,
                hoabinh: e,
                hungyen: e,
                khanhhoa: e,
                kiengiang: e,
                kontum: e,
                laichau: e,
                lamdong: e,
                langson: e,
                laocai: e,
                longan: e,
                namdinh: e,
                nghean: e,
                ninhbinh: e,
                ninhthuan: e,
                phutho: e,
                phuyen: e,
                quangbinh: e,
                quangnam: e,
                quangngai: e,
                quangninh: e,
                quangtri: e,
                soctrang: e,
                sonla: e,
                tayninh: e,
                thaibinh: e,
                thainguyen: e,
                thanhhoa: e,
                thanhphohochiminh: e,
                thuathienhue: e,
                tiengiang: e,
                travinh: e,
                tuyenquang: e,
                vinhlong: e,
                vinhphuc: e,
                yenbai: e,
                blogspot: a,
              },
            ],
            vu: [1, { com: e, edu: e, net: e, org: e, cn: a, blog: a, dev: a, me: a }],
            wf: [1, { biz: a, sch: a }],
            ws: [1, { com: e, net: e, org: e, gov: e, edu: e, advisor: n, cloud66: a, dyndns: a, mypets: a }],
            yt: [1, { org: a }],
            "xn--mgbaam7a8h": e,
            امارات: e,
            "xn--y9a3aq": e,
            հայ: e,
            "xn--54b7fta0cc": e,
            বাংলা: e,
            "xn--90ae": e,
            бг: e,
            "xn--mgbcpq6gpa1a": e,
            البحرين: e,
            "xn--90ais": e,
            бел: e,
            "xn--fiqs8s": e,
            中国: e,
            "xn--fiqz9s": e,
            中國: e,
            "xn--lgbbat1ad8j": e,
            الجزائر: e,
            "xn--wgbh1c": e,
            مصر: e,
            "xn--e1a4c": e,
            ею: e,
            "xn--qxa6a": e,
            ευ: e,
            "xn--mgbah1a3hjkrd": e,
            موريتانيا: e,
            "xn--node": e,
            გე: e,
            "xn--qxam": e,
            ελ: e,
            "xn--j6w193g": [
              1,
              { "xn--55qx5d": e, "xn--wcvs22d": e, "xn--mxtq1m": e, "xn--gmqw5a": e, "xn--od0alg": e, "xn--uc0atv": e },
            ],
            香港: [1, { 公司: e, 教育: e, 政府: e, 個人: e, 網絡: e, 組織: e }],
            "xn--2scrj9c": e,
            ಭಾರತ: e,
            "xn--3hcrj9c": e,
            ଭାରତ: e,
            "xn--45br5cyl": e,
            ভাৰত: e,
            "xn--h2breg3eve": e,
            भारतम्: e,
            "xn--h2brj9c8c": e,
            भारोत: e,
            "xn--mgbgu82a": e,
            ڀارت: e,
            "xn--rvc1e0am3e": e,
            ഭാരതം: e,
            "xn--h2brj9c": e,
            भारत: e,
            "xn--mgbbh1a": e,
            بارت: e,
            "xn--mgbbh1a71e": e,
            بھارت: e,
            "xn--fpcrj9c3d": e,
            భారత్: e,
            "xn--gecrj9c": e,
            ભારત: e,
            "xn--s9brj9c": e,
            ਭਾਰਤ: e,
            "xn--45brj9c": e,
            ভারত: e,
            "xn--xkc2dl3a5ee0h": e,
            இந்தியா: e,
            "xn--mgba3a4f16a": e,
            ایران: e,
            "xn--mgba3a4fra": e,
            ايران: e,
            "xn--mgbtx2b": e,
            عراق: e,
            "xn--mgbayh7gpa": e,
            الاردن: e,
            "xn--3e0b707e": e,
            한국: e,
            "xn--80ao21a": e,
            қаз: e,
            "xn--q7ce6a": e,
            ລາວ: e,
            "xn--fzc2c9e2c": e,
            ලංකා: e,
            "xn--xkc2al3hye2a": e,
            இலங்கை: e,
            "xn--mgbc0a9azcg": e,
            المغرب: e,
            "xn--d1alf": e,
            мкд: e,
            "xn--l1acc": e,
            мон: e,
            "xn--mix891f": e,
            澳門: e,
            "xn--mix082f": e,
            澳门: e,
            "xn--mgbx4cd0ab": e,
            مليسيا: e,
            "xn--mgb9awbf": e,
            عمان: e,
            "xn--mgbai9azgqp6j": e,
            پاکستان: e,
            "xn--mgbai9a5eva00b": e,
            پاكستان: e,
            "xn--ygbi2ammx": e,
            فلسطين: e,
            "xn--90a3ac": [
              1,
              { "xn--o1ac": e, "xn--c1avg": e, "xn--90azh": e, "xn--d1at": e, "xn--o1ach": e, "xn--80au": e },
            ],
            срб: [1, { пр: e, орг: e, обр: e, од: e, упр: e, ак: e }],
            "xn--p1ai": e,
            рф: e,
            "xn--wgbl6a": e,
            قطر: e,
            "xn--mgberp4a5d4ar": e,
            السعودية: e,
            "xn--mgberp4a5d4a87g": e,
            السعودیة: e,
            "xn--mgbqly7c0a67fbc": e,
            السعودیۃ: e,
            "xn--mgbqly7cvafr": e,
            السعوديه: e,
            "xn--mgbpl2fh": e,
            سودان: e,
            "xn--yfro4i67o": e,
            新加坡: e,
            "xn--clchc0ea0b2g2a9gcd": e,
            சிங்கப்பூர்: e,
            "xn--ogbpf8fl": e,
            سورية: e,
            "xn--mgbtf8fl": e,
            سوريا: e,
            "xn--o3cw4h": [
              1,
              {
                "xn--12c1fe0br": e,
                "xn--12co0c3b4eva": e,
                "xn--h3cuzk1di": e,
                "xn--o3cyx2a": e,
                "xn--m3ch0j3a": e,
                "xn--12cfi8ixb8l": e,
              },
            ],
            ไทย: [1, { ศึกษา: e, ธุรกิจ: e, รัฐบาล: e, ทหาร: e, เน็ต: e, องค์กร: e }],
            "xn--pgbs0dh": e,
            تونس: e,
            "xn--kpry57d": e,
            台灣: e,
            "xn--kprw13d": e,
            台湾: e,
            "xn--nnx388a": e,
            臺灣: e,
            "xn--j1amh": e,
            укр: e,
            "xn--mgb2ddes": e,
            اليمن: e,
            xxx: e,
            ye: D,
            za: [
              0,
              {
                ac: e,
                agric: e,
                alt: e,
                co: o,
                edu: e,
                gov: e,
                grondar: e,
                law: e,
                mil: e,
                net: e,
                ngo: e,
                nic: e,
                nis: e,
                nom: e,
                org: e,
                school: e,
                tm: e,
                web: e,
              },
            ],
            zm: [1, { ac: e, biz: e, co: e, com: e, edu: e, gov: e, info: e, mil: e, net: e, org: e, sch: e }],
            zw: [1, { ac: e, co: e, gov: e, mil: e, org: e }],
            aaa: e,
            aarp: e,
            abb: e,
            abbott: e,
            abbvie: e,
            abc: e,
            able: e,
            abogado: e,
            abudhabi: e,
            academy: [1, { official: a }],
            accenture: e,
            accountant: e,
            accountants: e,
            aco: e,
            actor: e,
            ads: e,
            adult: e,
            aeg: e,
            aetna: e,
            afl: e,
            africa: e,
            agakhan: e,
            agency: e,
            aig: e,
            airbus: e,
            airforce: e,
            airtel: e,
            akdn: e,
            alibaba: e,
            alipay: e,
            allfinanz: e,
            allstate: e,
            ally: e,
            alsace: e,
            alstom: e,
            amazon: e,
            americanexpress: e,
            americanfamily: e,
            amex: e,
            amfam: e,
            amica: e,
            amsterdam: e,
            analytics: e,
            android: e,
            anquan: e,
            anz: e,
            aol: e,
            apartments: e,
            app: [
              1,
              {
                beget: n,
                clerk: a,
                clerkstage: a,
                wnext: a,
                platform0: a,
                deta: a,
                ondigitalocean: a,
                easypanel: a,
                encr: a,
                edgecompute: a,
                fireweb: a,
                onflashdrive: a,
                framer: a,
                run: [2, { a }],
                web: a,
                hasura: a,
                loginline: a,
                messerli: a,
                netlify: a,
                ngrok: a,
                "ngrok-free": a,
                developer: n,
                noop: a,
                northflank: n,
                snowflake: [2, { privatelink: a }],
                streamlit: a,
                storipress: a,
                telebit: a,
                typedream: a,
                vercel: a,
                bookonline: a,
              },
            ],
            apple: e,
            aquarelle: e,
            arab: e,
            aramco: e,
            archi: e,
            army: e,
            art: e,
            arte: e,
            asda: e,
            associates: e,
            athleta: e,
            attorney: e,
            auction: e,
            audi: e,
            audible: e,
            audio: e,
            auspost: e,
            author: e,
            auto: e,
            autos: e,
            avianca: e,
            aws: e,
            axa: e,
            azure: e,
            baby: e,
            baidu: e,
            banamex: e,
            bananarepublic: e,
            band: e,
            bank: e,
            bar: e,
            barcelona: e,
            barclaycard: e,
            barclays: e,
            barefoot: e,
            bargains: e,
            baseball: e,
            basketball: [1, { aus: a, nz: a }],
            bauhaus: e,
            bayern: e,
            bbc: e,
            bbt: e,
            bbva: e,
            bcg: e,
            bcn: e,
            beats: e,
            beauty: e,
            beer: e,
            bentley: e,
            berlin: e,
            best: e,
            bestbuy: e,
            bet: e,
            bharti: e,
            bible: e,
            bid: e,
            bike: e,
            bing: e,
            bingo: e,
            bio: e,
            black: e,
            blackfriday: e,
            blockbuster: e,
            blog: e,
            bloomberg: e,
            blue: e,
            bms: e,
            bmw: e,
            bnpparibas: e,
            boats: e,
            boehringer: e,
            bofa: e,
            bom: e,
            bond: e,
            boo: e,
            book: e,
            booking: e,
            bosch: e,
            bostik: e,
            boston: e,
            bot: e,
            boutique: e,
            box: e,
            bradesco: e,
            bridgestone: e,
            broadway: e,
            broker: e,
            brother: e,
            brussels: e,
            build: e,
            builders: [1, { cloudsite: a }],
            business: l,
            buy: e,
            buzz: e,
            bzh: e,
            cab: e,
            cafe: e,
            cal: e,
            call: e,
            calvinklein: e,
            cam: e,
            camera: e,
            camp: e,
            canon: e,
            capetown: e,
            capital: e,
            capitalone: e,
            car: e,
            caravan: e,
            cards: e,
            care: e,
            career: e,
            careers: e,
            cars: e,
            casa: [1, { nabu: [0, { ui: a }] }],
            case: e,
            cash: e,
            casino: e,
            catering: e,
            catholic: e,
            cba: e,
            cbn: e,
            cbre: e,
            cbs: e,
            center: e,
            ceo: e,
            cern: e,
            cfa: e,
            cfd: e,
            chanel: e,
            channel: e,
            charity: e,
            chase: e,
            chat: e,
            cheap: e,
            chintai: e,
            christmas: e,
            chrome: e,
            church: e,
            cipriani: e,
            circle: e,
            cisco: e,
            citadel: e,
            citi: e,
            citic: e,
            city: e,
            cityeats: e,
            claims: e,
            cleaning: e,
            click: e,
            clinic: e,
            clinique: e,
            clothing: e,
            cloud: [
              1,
              {
                banzai: n,
                elementor: a,
                encoway: [0, { eu: a }],
                statics: n,
                ravendb: a,
                axarnet: [0, { "es-1": a }],
                diadem: a,
                jelastic: [0, { vip: a }],
                jele: a,
                "jenv-aruba": [0, { aruba: [0, { eur: [0, { it1: a }] }], it1: a }],
                keliweb: [2, { cs: a }],
                oxa: [2, { tn: a, uk: a }],
                primetel: [2, { uk: a }],
                reclaim: [0, { ca: a, uk: a, us: a }],
                trendhosting: [0, { ch: a, de: a }],
                jotelulu: a,
                kuleuven: a,
                linkyard: a,
                magentosite: n,
                perspecta: a,
                vapor: a,
                "on-rancher": n,
                scw: [
                  0,
                  {
                    baremetal: [0, { "fr-par-1": a, "fr-par-2": a, "nl-ams-1": a }],
                    "fr-par": [0, { fnc: [2, { functions: a }], k8s: c, s3: a, "s3-website": a, whm: a }],
                    instances: [0, { priv: a, pub: a }],
                    k8s: a,
                    "nl-ams": [0, { k8s: c, s3: a, "s3-website": a, whm: a }],
                    "pl-waw": [0, { k8s: c, s3: a, "s3-website": a }],
                    scalebook: a,
                    smartlabeling: a,
                  },
                ],
                sensiosite: n,
                trafficplex: a,
                urown: a,
                voorloper: a,
              },
            ],
            club: [1, { cloudns: a, jele: a, barsy: a }],
            clubmed: e,
            coach: e,
            codes: [1, { owo: n }],
            coffee: e,
            college: e,
            cologne: e,
            comcast: e,
            commbank: e,
            community: [1, { nog: a, ravendb: a, myforum: a }],
            company: e,
            compare: e,
            computer: e,
            comsec: e,
            condos: e,
            construction: e,
            consulting: e,
            contact: e,
            contractors: e,
            cooking: e,
            cool: [1, { elementor: a, de: a }],
            corsica: e,
            country: e,
            coupon: e,
            coupons: e,
            courses: e,
            cpa: e,
            credit: e,
            creditcard: e,
            creditunion: e,
            cricket: e,
            crown: e,
            crs: e,
            cruise: e,
            cruises: e,
            cuisinella: e,
            cymru: e,
            cyou: e,
            dabur: e,
            dad: e,
            dance: e,
            data: e,
            date: e,
            dating: e,
            datsun: e,
            day: e,
            dclk: e,
            dds: e,
            deal: e,
            dealer: e,
            deals: e,
            degree: e,
            delivery: e,
            dell: e,
            deloitte: e,
            delta: e,
            democrat: e,
            dental: e,
            dentist: e,
            desi: e,
            design: [1, { bss: a }],
            dev: [
              1,
              {
                autocode: a,
                lcl: n,
                lclstage: n,
                stg: n,
                stgstage: n,
                pages: a,
                r2: a,
                workers: a,
                curv: a,
                deno: a,
                "deno-staging": a,
                deta: a,
                fly: a,
                githubpreview: a,
                gateway: n,
                iserv: a,
                localcert: [0, { user: n }],
                loginline: a,
                mediatech: a,
                ngrok: a,
                "ngrok-free": a,
                "platter-app": a,
                shiftcrypto: a,
                vercel: a,
                webhare: n,
              },
            ],
            dhl: e,
            diamonds: e,
            diet: e,
            digital: [1, { cloudapps: [2, { london: a }] }],
            direct: e,
            directory: e,
            discount: e,
            discover: e,
            dish: e,
            diy: e,
            dnp: e,
            docs: e,
            doctor: e,
            dog: e,
            domains: e,
            dot: e,
            download: e,
            drive: e,
            dtv: e,
            dubai: e,
            dunlop: e,
            dupont: e,
            durban: e,
            dvag: e,
            dvr: e,
            earth: [1, { dapps: [0, { "*": a, bzz: n }] }],
            eat: e,
            eco: e,
            edeka: e,
            education: l,
            email: e,
            emerck: e,
            energy: e,
            engineer: e,
            engineering: e,
            enterprises: e,
            epson: e,
            equipment: e,
            ericsson: e,
            erni: e,
            esq: e,
            estate: [1, { compute: n }],
            etisalat: e,
            eurovision: e,
            eus: [1, { party: I }],
            events: [1, { koobin: a, co: a }],
            exchange: e,
            expert: e,
            exposed: e,
            express: e,
            extraspace: e,
            fage: e,
            fail: e,
            fairwinds: e,
            faith: M,
            family: e,
            fan: e,
            fans: e,
            farm: [1, { storj: a }],
            farmers: e,
            fashion: e,
            fast: e,
            fedex: e,
            feedback: e,
            ferrari: e,
            ferrero: e,
            fidelity: e,
            fido: e,
            film: e,
            final: e,
            finance: e,
            financial: l,
            fire: e,
            firestone: e,
            firmdale: e,
            fish: e,
            fishing: e,
            fit: e,
            fitness: e,
            flickr: e,
            flights: e,
            flir: e,
            florist: e,
            flowers: e,
            fly: e,
            foo: e,
            food: e,
            football: e,
            ford: e,
            forex: e,
            forsale: e,
            forum: e,
            foundation: e,
            fox: e,
            free: e,
            fresenius: e,
            frl: e,
            frogans: e,
            frontdoor: e,
            frontier: e,
            ftr: e,
            fujitsu: e,
            fun: e,
            fund: e,
            furniture: e,
            futbol: e,
            fyi: e,
            gal: e,
            gallery: e,
            gallo: e,
            gallup: e,
            game: e,
            games: e,
            gap: e,
            garden: e,
            gay: e,
            gbiz: e,
            gdn: [1, { cnpy: a }],
            gea: e,
            gent: e,
            genting: e,
            george: e,
            ggee: e,
            gift: e,
            gifts: e,
            gives: e,
            giving: e,
            glass: e,
            gle: e,
            global: e,
            globo: e,
            gmail: e,
            gmbh: e,
            gmo: e,
            gmx: e,
            godaddy: e,
            gold: e,
            goldpoint: e,
            golf: e,
            goo: e,
            goodyear: e,
            goog: [1, { cloud: a, translate: a, usercontent: n }],
            google: e,
            gop: e,
            got: e,
            grainger: e,
            graphics: e,
            gratis: e,
            green: e,
            gripe: e,
            grocery: e,
            group: [1, { discourse: a }],
            guardian: e,
            gucci: e,
            guge: e,
            guide: e,
            guitars: e,
            guru: e,
            hair: e,
            hamburg: e,
            hangout: e,
            haus: e,
            hbo: e,
            hdfc: e,
            hdfcbank: e,
            health: [1, { hra: a }],
            healthcare: e,
            help: e,
            helsinki: e,
            here: e,
            hermes: e,
            hiphop: e,
            hisamitsu: e,
            hitachi: e,
            hiv: e,
            hkt: e,
            hockey: e,
            holdings: e,
            holiday: e,
            homedepot: e,
            homegoods: e,
            homes: e,
            homesense: e,
            honda: e,
            horse: e,
            hospital: e,
            host: [
              1,
              {
                cloudaccess: a,
                freesite: a,
                easypanel: a,
                fastvps: a,
                myfast: a,
                tempurl: a,
                wpmudev: a,
                jele: a,
                mircloud: a,
                pcloud: a,
                half: a,
              },
            ],
            hosting: [1, { opencraft: a }],
            hot: e,
            hotels: e,
            hotmail: e,
            house: e,
            how: e,
            hsbc: e,
            hughes: e,
            hyatt: e,
            hyundai: e,
            ibm: e,
            icbc: e,
            ice: e,
            icu: e,
            ieee: e,
            ifm: e,
            ikano: e,
            imamat: e,
            imdb: e,
            immo: e,
            immobilien: e,
            inc: e,
            industries: e,
            infiniti: e,
            ing: e,
            ink: e,
            institute: e,
            insurance: e,
            insure: e,
            international: e,
            intuit: e,
            investments: e,
            ipiranga: e,
            irish: e,
            ismaili: e,
            ist: e,
            istanbul: e,
            itau: e,
            itv: e,
            jaguar: e,
            java: e,
            jcb: e,
            jeep: e,
            jetzt: e,
            jewelry: e,
            jio: e,
            jll: e,
            jmp: e,
            jnj: e,
            joburg: e,
            jot: e,
            joy: e,
            jpmorgan: e,
            jprs: e,
            juegos: e,
            juniper: e,
            kaufen: e,
            kddi: e,
            kerryhotels: e,
            kerrylogistics: e,
            kerryproperties: e,
            kfh: e,
            kia: e,
            kids: e,
            kim: e,
            kinder: e,
            kindle: e,
            kitchen: e,
            kiwi: e,
            koeln: e,
            komatsu: e,
            kosher: e,
            kpmg: e,
            kpn: e,
            krd: [1, { co: a, edu: a }],
            kred: e,
            kuokgroup: e,
            kyoto: e,
            lacaixa: e,
            lamborghini: e,
            lamer: e,
            lancaster: e,
            land: [1, { static: [2, { dev: a, sites: a }] }],
            landrover: e,
            lanxess: e,
            lasalle: e,
            lat: e,
            latino: e,
            latrobe: e,
            law: e,
            lawyer: e,
            lds: e,
            lease: e,
            leclerc: e,
            lefrak: e,
            legal: e,
            lego: e,
            lexus: e,
            lgbt: e,
            lidl: e,
            life: e,
            lifeinsurance: e,
            lifestyle: e,
            lighting: e,
            like: e,
            lilly: e,
            limited: e,
            limo: e,
            lincoln: e,
            link: [1, { cyon: a, mypep: a, dweb: n }],
            lipsy: e,
            live: [1, { hlx: a }],
            living: e,
            llc: e,
            llp: e,
            loan: e,
            loans: e,
            locker: e,
            locus: e,
            lol: [1, { omg: a }],
            london: e,
            lotte: e,
            lotto: e,
            love: e,
            lpl: e,
            lplfinancial: e,
            ltd: e,
            ltda: e,
            lundbeck: e,
            luxe: e,
            luxury: e,
            madrid: e,
            maif: e,
            maison: e,
            makeup: e,
            man: e,
            management: [1, { router: a }],
            mango: e,
            map: e,
            market: e,
            marketing: e,
            markets: e,
            marriott: e,
            marshalls: e,
            mattel: e,
            mba: e,
            mckinsey: e,
            med: e,
            media: R,
            meet: e,
            melbourne: e,
            meme: e,
            memorial: e,
            men: e,
            menu: A,
            merckmsd: e,
            miami: e,
            microsoft: e,
            mini: e,
            mint: e,
            mit: e,
            mitsubishi: e,
            mlb: e,
            mls: e,
            mma: e,
            mobile: e,
            moda: e,
            moe: e,
            moi: e,
            mom: e,
            monash: e,
            money: e,
            monster: e,
            mormon: e,
            mortgage: e,
            moscow: e,
            moto: e,
            motorcycles: e,
            mov: e,
            movie: e,
            msd: e,
            mtn: e,
            mtr: e,
            music: e,
            nab: e,
            nagoya: e,
            natura: e,
            navy: e,
            nba: e,
            nec: e,
            netbank: e,
            netflix: e,
            network: [1, { alces: n, co: a, arvo: a, azimuth: a, tlon: a }],
            neustar: e,
            new: e,
            news: [1, { noticeable: a }],
            next: e,
            nextdirect: e,
            nexus: e,
            nfl: e,
            ngo: e,
            nhk: e,
            nico: e,
            nike: e,
            nikon: e,
            ninja: e,
            nissan: e,
            nissay: e,
            nokia: e,
            norton: e,
            now: e,
            nowruz: e,
            nowtv: e,
            nra: e,
            nrw: e,
            ntt: e,
            nyc: e,
            obi: e,
            observer: e,
            office: e,
            okinawa: e,
            olayan: e,
            olayangroup: e,
            oldnavy: e,
            ollo: e,
            omega: e,
            one: [1, { onred: [2, { staging: a }], service: a, homelink: a }],
            ong: e,
            onl: e,
            online: [1, { eero: a, "eero-stage": a, barsy: a }],
            ooo: e,
            open: e,
            oracle: e,
            orange: [1, { tech: a }],
            organic: e,
            origins: e,
            osaka: e,
            otsuka: e,
            ott: e,
            ovh: [1, { nerdpol: a }],
            page: [
              1,
              { hlx: a, hlx3: a, translated: a, codeberg: a, pdns: a, plesk: a, prvcy: a, rocky: a, magnet: a },
            ],
            panasonic: e,
            paris: e,
            pars: e,
            partners: e,
            parts: e,
            party: M,
            pay: e,
            pccw: e,
            pet: e,
            pfizer: e,
            pharmacy: e,
            phd: e,
            philips: e,
            phone: e,
            photo: e,
            photography: e,
            photos: R,
            physio: e,
            pics: e,
            pictet: e,
            pictures: [1, { 1337: a }],
            pid: e,
            pin: e,
            ping: e,
            pink: e,
            pioneer: e,
            pizza: [1, { ngrok: a }],
            place: l,
            play: e,
            playstation: e,
            plumbing: e,
            plus: e,
            pnc: e,
            pohl: e,
            poker: e,
            politie: e,
            porn: [1, { indie: a }],
            pramerica: e,
            praxi: e,
            press: e,
            prime: e,
            prod: e,
            productions: e,
            prof: e,
            progressive: e,
            promo: e,
            properties: e,
            property: e,
            protection: e,
            pru: e,
            prudential: e,
            pub: A,
            pwc: e,
            qpon: e,
            quebec: e,
            quest: e,
            racing: e,
            radio: e,
            read: e,
            realestate: e,
            realtor: e,
            realty: e,
            recipes: e,
            red: e,
            redstone: e,
            redumbrella: e,
            rehab: e,
            reise: e,
            reisen: e,
            reit: e,
            reliance: e,
            ren: e,
            rent: e,
            rentals: e,
            repair: e,
            report: e,
            republican: e,
            rest: e,
            restaurant: e,
            review: M,
            reviews: e,
            rexroth: e,
            rich: e,
            richardli: e,
            ricoh: e,
            ril: e,
            rio: e,
            rip: [1, { clan: a }],
            rocher: e,
            rocks: [1, { myddns: a, "lima-city": a, webspace: a }],
            rodeo: e,
            rogers: e,
            room: e,
            rsvp: e,
            rugby: e,
            ruhr: e,
            run: [
              1,
              {
                hs: a,
                development: a,
                ravendb: a,
                servers: a,
                build: n,
                code: n,
                database: n,
                migration: n,
                onporter: a,
                repl: a,
              },
            ],
            rwe: e,
            ryukyu: e,
            saarland: e,
            safe: e,
            safety: e,
            sakura: e,
            sale: e,
            salon: e,
            samsclub: e,
            samsung: e,
            sandvik: e,
            sandvikcoromant: e,
            sanofi: e,
            sap: e,
            sarl: e,
            sas: e,
            save: e,
            saxo: e,
            sbi: e,
            sbs: e,
            sca: e,
            scb: e,
            schaeffler: e,
            schmidt: e,
            scholarships: e,
            school: e,
            schule: e,
            schwarz: e,
            science: M,
            scot: [1, { edu: a, gov: [2, { service: a }] }],
            search: e,
            seat: e,
            secure: e,
            security: e,
            seek: e,
            select: e,
            sener: e,
            services: [1, { loginline: a }],
            seven: e,
            sew: e,
            sex: e,
            sexy: e,
            sfr: e,
            shangrila: e,
            sharp: e,
            shaw: e,
            shell: e,
            shia: e,
            shiksha: e,
            shoes: e,
            shop: [1, { base: a, hoplix: a, barsy: a }],
            shopping: e,
            shouji: e,
            show: e,
            showtime: e,
            silk: e,
            sina: e,
            singles: e,
            site: [
              1,
              {
                cloudera: n,
                cyon: a,
                fnwk: a,
                folionetwork: a,
                fastvps: a,
                jele: a,
                lelux: a,
                loginline: a,
                barsy: a,
                mintere: a,
                omniwe: a,
                opensocial: a,
                platformsh: n,
                tst: n,
                byen: a,
                srht: a,
                novecore: a,
              },
            ],
            ski: e,
            skin: e,
            sky: e,
            skype: e,
            sling: e,
            smart: e,
            smile: e,
            sncf: e,
            soccer: e,
            social: e,
            softbank: e,
            software: e,
            sohu: e,
            solar: e,
            solutions: [1, { diher: n }],
            song: e,
            sony: e,
            soy: e,
            spa: e,
            space: [1, { myfast: a, uber: a, xs4all: a }],
            sport: e,
            spot: e,
            srl: e,
            stada: e,
            staples: e,
            star: e,
            statebank: e,
            statefarm: e,
            stc: e,
            stcgroup: e,
            stockholm: e,
            storage: e,
            store: [1, { sellfy: a, shopware: a, storebase: a }],
            stream: e,
            studio: e,
            study: e,
            style: e,
            sucks: e,
            supplies: e,
            supply: e,
            support: A,
            surf: e,
            surgery: e,
            suzuki: e,
            swatch: e,
            swiss: e,
            sydney: e,
            systems: [1, { knightpoint: a }],
            tab: e,
            taipei: e,
            talk: e,
            taobao: e,
            target: e,
            tatamotors: e,
            tatar: e,
            tattoo: e,
            tax: e,
            taxi: e,
            tci: e,
            tdk: e,
            team: [1, { discourse: a, jelastic: a }],
            tech: e,
            technology: l,
            temasek: e,
            tennis: e,
            teva: e,
            thd: e,
            theater: e,
            theatre: e,
            tiaa: e,
            tickets: e,
            tienda: e,
            tips: e,
            tires: e,
            tirol: e,
            tjmaxx: e,
            tjx: e,
            tkmaxx: e,
            tmall: e,
            today: [1, { prequalifyme: a }],
            tokyo: e,
            tools: e,
            top: [1, { "now-dns": a, ntdll: a }],
            toray: e,
            toshiba: e,
            total: e,
            tours: e,
            town: e,
            toyota: e,
            toys: e,
            trade: M,
            trading: e,
            training: e,
            travel: e,
            travelers: e,
            travelersinsurance: e,
            trust: e,
            trv: e,
            tube: e,
            tui: e,
            tunes: e,
            tushu: e,
            tvs: e,
            ubank: e,
            ubs: e,
            unicom: e,
            university: e,
            uno: e,
            uol: e,
            ups: e,
            vacations: e,
            vana: e,
            vanguard: e,
            vegas: e,
            ventures: e,
            verisign: e,
            versicherung: e,
            vet: e,
            viajes: e,
            video: e,
            vig: e,
            viking: e,
            villas: e,
            vin: e,
            vip: e,
            virgin: e,
            visa: e,
            vision: e,
            viva: e,
            vivo: e,
            vlaanderen: e,
            vodka: e,
            volkswagen: e,
            volvo: e,
            vote: e,
            voting: e,
            voto: e,
            voyage: e,
            wales: e,
            walmart: e,
            walter: e,
            wang: e,
            wanggou: e,
            watch: e,
            watches: e,
            weather: e,
            weatherchannel: e,
            webcam: e,
            weber: e,
            website: R,
            wedding: e,
            weibo: e,
            weir: e,
            whoswho: e,
            wien: e,
            wiki: R,
            williamhill: e,
            win: e,
            windows: e,
            wine: e,
            winners: e,
            wme: e,
            wolterskluwer: e,
            woodside: e,
            work: e,
            works: e,
            world: e,
            wow: e,
            wtc: e,
            wtf: e,
            xbox: e,
            xerox: e,
            xfinity: e,
            xihuan: e,
            xin: e,
            "xn--11b4c3d": e,
            कॉम: e,
            "xn--1ck2e1b": e,
            セール: e,
            "xn--1qqw23a": e,
            佛山: e,
            "xn--30rr7y": e,
            慈善: e,
            "xn--3bst00m": e,
            集团: e,
            "xn--3ds443g": e,
            在线: e,
            "xn--3pxu8k": e,
            点看: e,
            "xn--42c2d9a": e,
            คอม: e,
            "xn--45q11c": e,
            八卦: e,
            "xn--4gbrim": e,
            موقع: e,
            "xn--55qw42g": e,
            公益: e,
            "xn--55qx5d": e,
            公司: e,
            "xn--5su34j936bgsg": e,
            香格里拉: e,
            "xn--5tzm5g": e,
            网站: e,
            "xn--6frz82g": e,
            移动: e,
            "xn--6qq986b3xl": e,
            我爱你: e,
            "xn--80adxhks": e,
            москва: e,
            "xn--80aqecdr1a": e,
            католик: e,
            "xn--80asehdb": e,
            онлайн: e,
            "xn--80aswg": e,
            сайт: e,
            "xn--8y0a063a": e,
            联通: e,
            "xn--9dbq2a": e,
            קום: e,
            "xn--9et52u": e,
            时尚: e,
            "xn--9krt00a": e,
            微博: e,
            "xn--b4w605ferd": e,
            淡马锡: e,
            "xn--bck1b9a5dre4c": e,
            ファッション: e,
            "xn--c1avg": e,
            орг: e,
            "xn--c2br7g": e,
            नेट: e,
            "xn--cck2b3b": e,
            ストア: e,
            "xn--cckwcxetd": e,
            アマゾン: e,
            "xn--cg4bki": e,
            삼성: e,
            "xn--czr694b": e,
            商标: e,
            "xn--czrs0t": e,
            商店: e,
            "xn--czru2d": e,
            商城: e,
            "xn--d1acj3b": e,
            дети: e,
            "xn--eckvdtc9d": e,
            ポイント: e,
            "xn--efvy88h": e,
            新闻: e,
            "xn--fct429k": e,
            家電: e,
            "xn--fhbei": e,
            كوم: e,
            "xn--fiq228c5hs": e,
            中文网: e,
            "xn--fiq64b": e,
            中信: e,
            "xn--fjq720a": e,
            娱乐: e,
            "xn--flw351e": e,
            谷歌: e,
            "xn--fzys8d69uvgm": e,
            電訊盈科: e,
            "xn--g2xx48c": e,
            购物: e,
            "xn--gckr3f0f": e,
            クラウド: e,
            "xn--gk3at1e": e,
            通販: e,
            "xn--hxt814e": e,
            网店: e,
            "xn--i1b6b1a6a2e": e,
            संगठन: e,
            "xn--imr513n": e,
            餐厅: e,
            "xn--io0a7i": e,
            网络: e,
            "xn--j1aef": e,
            ком: e,
            "xn--jlq480n2rg": e,
            亚马逊: e,
            "xn--jvr189m": e,
            食品: e,
            "xn--kcrx77d1x4a": e,
            飞利浦: e,
            "xn--kput3i": e,
            手机: e,
            "xn--mgba3a3ejt": e,
            ارامكو: e,
            "xn--mgba7c0bbn0a": e,
            العليان: e,
            "xn--mgbaakc7dvf": e,
            اتصالات: e,
            "xn--mgbab2bd": e,
            بازار: e,
            "xn--mgbca7dzdo": e,
            ابوظبي: e,
            "xn--mgbi4ecexp": e,
            كاثوليك: e,
            "xn--mgbt3dhd": e,
            همراه: e,
            "xn--mk1bu44c": e,
            닷컴: e,
            "xn--mxtq1m": e,
            政府: e,
            "xn--ngbc5azd": e,
            شبكة: e,
            "xn--ngbe9e0a": e,
            بيتك: e,
            "xn--ngbrx": e,
            عرب: e,
            "xn--nqv7f": e,
            机构: e,
            "xn--nqv7fs00ema": e,
            组织机构: e,
            "xn--nyqy26a": e,
            健康: e,
            "xn--otu796d": e,
            招聘: e,
            "xn--p1acf": [
              1,
              {
                "xn--90amc": a,
                "xn--j1aef": a,
                "xn--j1ael8b": a,
                "xn--h1ahn": a,
                "xn--j1adp": a,
                "xn--c1avg": a,
                "xn--80aaa0cvac": a,
                "xn--h1aliz": a,
                "xn--90a1af": a,
                "xn--41a": a,
              },
            ],
            рус: [1, { биз: a, ком: a, крым: a, мир: a, мск: a, орг: a, самара: a, сочи: a, спб: a, я: a }],
            "xn--pssy2u": e,
            大拿: e,
            "xn--q9jyb4c": e,
            みんな: e,
            "xn--qcka1pmc": e,
            グーグル: e,
            "xn--rhqv96g": e,
            世界: e,
            "xn--rovu88b": e,
            書籍: e,
            "xn--ses554g": e,
            网址: e,
            "xn--t60b56a": e,
            닷넷: e,
            "xn--tckwe": e,
            コム: e,
            "xn--tiq49xqyj": e,
            天主教: e,
            "xn--unup4y": e,
            游戏: e,
            "xn--vermgensberater-ctb": e,
            vermögensberater: e,
            "xn--vermgensberatung-pwb": e,
            vermögensberatung: e,
            "xn--vhquv": e,
            企业: e,
            "xn--vuq861b": e,
            信息: e,
            "xn--w4r85el8fhu5dnra": e,
            嘉里大酒店: e,
            "xn--w4rs40l": e,
            嘉里: e,
            "xn--xhq521b": e,
            广东: e,
            "xn--zfr164b": e,
            政务: e,
            xyz: [1, { blogsite: a, localzone: a, crafting: a, zapto: a, telebit: n }],
            yachts: e,
            yahoo: e,
            yamaxun: e,
            yandex: e,
            yodobashi: e,
            yoga: e,
            yokohama: e,
            you: e,
            youtube: e,
            yun: e,
            zappos: e,
            zara: e,
            zero: e,
            zip: e,
            zone: [1, { cloud66: a, hs: a, triton: n, lima: a }],
            zuerich: e,
          },
        ]
      })()
    function en(e, a, t, n) {
      let o = null,
        i = a
      for (
        ;
        void 0 !== i &&
        (0 != (i[0] & n) && (o = { index: t + 1, isIcann: 1 === i[0], isPrivate: 2 === i[0] }), -1 !== t);

      ) {
        const a = i[1]
        ;(i = I.prototype.hasOwnProperty.call(a, e[t]) ? a[e[t]] : a["*"]), (t -= 1)
      }
      return o
    }
    function an(e, a, t) {
      var n
      if (Xt(e, a, t)) return
      const o = e.split("."),
        i = (a.allowPrivateDomains ? 2 : 0) | (a.allowIcannDomains ? 1 : 0),
        s = en(o, Zt, o.length - 1, i)
      if (null !== s)
        return (
          (t.isIcann = s.isIcann), (t.isPrivate = s.isPrivate), void (t.publicSuffix = o.slice(s.index + 1).join("."))
        )
      const r = en(o, Qt, o.length - 1, i)
      if (null !== r)
        return (t.isIcann = r.isIcann), (t.isPrivate = r.isPrivate), void (t.publicSuffix = o.slice(r.index).join("."))
      ;(t.isIcann = !1),
        (t.isPrivate = !1),
        (t.publicSuffix = null !== (n = o[o.length - 1]) && void 0 !== n ? n : null)
    }
    const tn = {
      domain: null,
      domainWithoutSuffix: null,
      hostname: null,
      isIcann: null,
      isIp: null,
      isPrivate: null,
      publicSuffix: null,
      subdomain: null,
    }
    function nn(e, a = {}) {
      var t
      return (
        ((t = tn).domain = null),
        (t.domainWithoutSuffix = null),
        (t.hostname = null),
        (t.isIcann = null),
        (t.isIp = null),
        (t.isPrivate = null),
        (t.publicSuffix = null),
        (t.subdomain = null),
        Yt(e, 2, an, a, tn).publicSuffix
      )
    }
    function on(e, a = {}) {
      var t
      return (
        ((t = tn).domain = null),
        (t.domainWithoutSuffix = null),
        (t.hostname = null),
        (t.isIcann = null),
        (t.isIp = null),
        (t.isPrivate = null),
        (t.publicSuffix = null),
        (t.subdomain = null),
        Yt(e, 3, an, a, tn).domain
      )
    }
    const sn = { allowPrivateDomains: !0 },
      rn = (e) => on(e, sn),
      ln = (e) => nn(e, sn),
      cn = { test: () => 1 },
      un = Ct({ lifetime: 36e5 }),
      dn = Ct({ lifetime: 36e5 }),
      mn = Ct({ lifetime: 6e4 }),
      hn = Ct({ lifetime: 6e4 }),
      gn = /^(\*|http([s*])?|file|ftp|urn):\/\/([^/]*)\/(.*)/,
      pn = /^(\*|http([s*])?|file|ftp|urn|([^:]*?)(?=:))(:(?:\/(?:\/)?)?)?([^/]*)(?:\/(.*))?/,
      fn = /^([^:]*):\/\/([^/]*)\/(.*)/,
      kn = { [pe]: On(), [fe]: On() },
      { reset: bn, test: yn } = kn[pe],
      vn = kn[fe].test
    let wn, xn, zn, jn, Sn, $n, qn
    $t((e) => {
      for (const a in kn)
        if (a in e) {
          const t = kn[a].reset(e[a] || []),
            n = t.length ? t : null
          if ((mt.base.setOne(a + "Errors", n), n)) throw n
        }
    })
    class In {
      constructor(e, a, t, n, o) {
        const i = "*" === a || "*" === t
        ;(this.scheme = i ? "http" : a),
          (this.scheme2 = i ? "https" : null),
          (this.host = "*" === n ? null : Ln(n)),
          (this.path = "*" === o ? null : En(o))
      }
      test() {
        var e, a
        return (
          (this.scheme === zn || this.scheme2 === zn) &&
          !1 !== (null == (e = this.host) ? void 0 : e.test(jn)) &&
          !1 !== (null == (a = this.path) ? void 0 : a.test(Sn))
        )
      }
      static try(e) {
        let a = e.match(gn)
        if (a) return new In(...a)
        if ("<all_urls>" === e) return cn
        throw (
          ((a = e.match(pn)),
          (a = a
            ? (
                (null != a[3] ? (a[3] ? "unknown" : "missing") + " scheme, " : "") +
                  ("://" !== a[4] ? 'missing "://", ' : "") || (null == a[6] ? 'missing "/" for path, ' : "")
              ).slice(0, -2) + " in "
            : ""),
          `Bad pattern: ${a}${e}`)
        )
      }
    }
    class Mn {
      constructor(e, a, t) {
        ;(this.s = t ? e.toLowerCase() : e), (this.i = !!t), (this.cmp = a < 0 ? "" : a ? "startsWith" : "endsWith")
      }
      test(e) {
        const { s: a, cmp: t } = this,
          n = e.length - a.length
        return (
          n >= 0 &&
          (t && n ? e[t](a) || (this.i && e.toLowerCase()[t](a)) : e === a || (!n && this.i && e.toLowerCase() === a))
        )
      }
      static try(e, a) {
        const t = e.indexOf("*")
        if (t === e.length - 1) e = e.slice(0, -1)
        else if (0 === t && e.indexOf("*", 1) < 0) e = e.slice(1)
        else if (t >= 0) return
        return new Mn(e, t, a)
      }
    }
    function Cn(e) {
      un.batch(e), dn.batch(e), mn.batch(e), hn.batch(e), (wn = Array.isArray(e) && e)
    }
    function Un(e) {
      ;(xn = e),
        ([, zn, jn, Sn] = e ? e.match(fn) : ["", "", "", ""]),
        ($n = e ? mn.get(e) || mn.put(e, {}) : null),
        (qn = e ? hn.get(e) || hn.put(e, {}) : null)
    }
    function Dn(e, a) {
      let t, n, o, i
      const { custom: s, meta: r } = a
      return (
        (!(
          (t = (s.origMatch && r.match) || "").length +
          (n = s.match || "").length +
          (o = (s.origInclude && r.include) || "").length +
          (i = s.include || "").length
        ) ||
          _n(e, a, t, n, o, i)) &&
        !(
          (t = (s.origExcludeMatch && r.excludeMatch) || "").length +
            (n = s.excludeMatch || "").length +
            (o = (s.origExclude && r.exclude) || "").length +
            (i = s.exclude || "").length && _n(e, a, t, n, o, i)
        )
      )
    }
    function _n(e, a, ...t) {
      xn !== e && Un(e)
      for (let n, o, i, s, r, l, c, u, d = 0; d < 4; d += 1) {
        if ((o = t[d]).length) {
          s || (d < 2 ? ((i = In.try), (s = un), (r = $n)) : ((i = Rn), (s = dn), (r = qn)))
          for (let t = 0, d = o; t < d.length; t++) {
            const o = d[t]
            if (e && (l = r[o])) return l
            if (null == l) {
              if (!(n = s.get(o))) {
                try {
                  n = i(o)
                } catch (e) {
                  n = { err: e }
                }
                s.put(o, n)
              }
              if ((c = n.err)) wn && ((c = c.message || c), (c = e ? `${c} - ${u || (u = Ua(a))}` : c), wn.push(c))
              else if (e && (r[o] = +!!n.test(e))) return !0
            }
          }
        }
        1 === d && (s = !1)
      }
    }
    function Tn(e) {
      return ga(e).replace(/\*/g, ".*?")
    }
    function Rn(e) {
      if (e.length > 1 && "/" === e[0] && "/" === e[e.length - 1]) return new RegExp(e.slice(1, -1), "i")
      const a = e.includes(".tld/"),
        t = !a && Mn.try(e, !0)
      if (t) return t
      const n = `^${Tn(e)}$`,
        o = a ? n.replace("\\.tld/", "((?:\\.[-\\w]+)+)/") : n,
        i = RegExp(o, "i")
      return n !== o && (i.test = An), i
    }
    function An(e) {
      var a
      const t = e.match(this),
        n = null == t || null == (a = t[1]) ? void 0 : a.slice(1).toLowerCase()
      return !!n && ln(n) === n
    }
    function Ln(e) {
      const a = e.endsWith(".tld")
      let t,
        n = "",
        o = e,
        i = ""
      if (e.startsWith("*.")) (o = o.slice(2)), (n = "(?:|[^:/]*?\\.)")
      else if (!a && (t = Mn.try(e, !0))) return t
      a && ((o = o.slice(0, -4)), (i = "(|(?:\\.[-\\w]+)+)"))
      const s = RegExp(`^${n}${Tn(o)}${i}$`, "i")
      return a && (s.test = An), s
    }
    function En(e) {
      const a = e.indexOf("?"),
        t = e.indexOf("#", a + 1) >= 0
      return (t && Mn.try(e)) || RegExp(`^${Tn(e)}${t ? "$" : `($|${a >= 0 ? "#" : "[?#]"})`}`)
    }
    function On() {
      let e = {},
        a = 0,
        t = []
      return {
        reset: (o) => {
          const i = []
          Cn(!0), (t = [])
          for (let e = 0, a = Array.isArray(o) ? o : (o || "").split("\n"); e < a.length; e++) {
            let o = a[e]
            try {
              if (((o = o.trim()), !o || o.startsWith("#"))) continue
              const e = o.startsWith("@") && o.split(/\s/, 1)[0],
                a = e ? o.slice(e.length + 1).trim() : o,
                i = "@include" === e,
                s =
                  ((i || "@exclude" === e) && n(dn, a, Rn)) ||
                  (!e && !a.includes("/") && n(un, `*://${a}/*`, In.try)) ||
                  n(un, a, In.try)
              ;(s.reject = !("@match" === e || i)), (s.text = o), t.push(s)
            } catch (e) {
              i.push(e)
            }
          }
          return (e = {}), (a = 0), Cn(), i
        },
        test: (a) => {
          let n = e[a]
          var i
          void 0 === n &&
            (xn !== a && Un(a),
            (n = t.find((e) => e.test(a))),
            (n = (null == (i = n) ? void 0 : i.reject) && n.text),
            o(a, n || !1))
          return n
        },
      }
      function n(e, a, t) {
        return e.get(a) || e.put(a, t(a))
      }
      function o(t, n) {
        if (((e[t] = n), (a += t.length), a > 1e5)) for (const t in e) if (delete e[t] && (a -= t.length) < 75e3) return
      }
    }
    const { userAgent: Pn, userAgentData: Nn } = navigator,
      Hn = Pn.match(/\s(?:Chrom(?:e|ium)|Firefox)\/(\d+[.0-9]*)|$/i)[1],
      Wn = {},
      Fn = P ? void 0 : parseFloat(Hn) || 1
    let Bn = P ? parseFloat(Hn) || 1 : void 0
    function Vn(e) {
      ;(e.vivExtData || e.extData) && Gn("Vivaldi")
    }
    function Gn(e) {
      Wn.browserName = e
    }
    Fa({ UA: () => Wn }),
      Va.deps.push(
        M.all([
          browser.runtime.getPlatformInfo(),
          null == browser.runtime.getBrowserInfo ? void 0 : browser.runtime.getBrowserInfo(),
          null == Nn ? void 0 : Nn.getHighEntropyValues(["fullVersionList"]),
          P ? [] : fa.getAll(),
        ]).then(([{ os: e, arch: a }, { name: t, version: n } = {}, o, [i]]) => {
          var s
          !n &&
            (o = null == (s = o) ? void 0 : s.fullVersionList) &&
            o[0] &&
            ([t, n] = o
              .map(
                ({ brand: e, version: a }) =>
                  (/[^\sa-z]/i.test(e) ? "3" : "Chromium" === e ? "2" + e : "1" + e) + "\n" + a
              )
              .sort()[0]
              .slice(1)
              .split("\n")),
            (Wn.arch = a),
            (Wn.os = e),
            Gn(t || "chrome"),
            (Wn.browserVersion = n || Hn),
            Bn ? (Bn = parseFloat(n)) : i ? Vn(i) : E(ne, fa.onCreated, Vn)
        })
      )
    const Kn = ((e, a, t, n, o) => {
      const i = {},
        s = {},
        r = new Set(),
        l = Math.max(t, n)
      let c, u
      return async (...n) => {
        let d, m
        const h = o(...n),
          g = i[h],
          p = (i[h] = new M((e) => {
            d = e
          }).catch(console.warn))
        for (g && (await g); r.size === a; ) await M.race(r)
        r.add(p),
          h === u ? ((m = s[h]), (m = l - (m ? _.now() - m : 0))) : c && (m = t - (_.now() - c)),
          m > 0 && (await Aa(m))
        try {
          return (u = h), await e(...n)
        } finally {
          r.delete(p), i[h] === p && delete i[h], (c = s[h] = _.now()), d()
        }
      }
    })(ma, 4, 100, 1e3, (e) => e.split("/")[2])
    function Jn(e, a = Se, t) {
      let n, o
      try {
        ;(n = new URL(e, a).href), (n.startsWith(H) || vn(n)) && (o = "Blacklisted")
      } catch (e) {
        o = "Invalid"
      }
      if (o) {
        if (((o = `${o} URL ${n || e}`), t)) throw o
        n = `data:,${o}`
      }
      return n
    }
    Fa({
      async Request({ url: e, ...a }) {
        const t = Jn(e),
          n = ua(t) && !ra.test(t) ? Kn : ma,
          o = await n(t, a)
        return "blob" === a[b] && (o.data = await Oa(o)), o
      },
    })
    const Yn = {},
      Xn = !P || !(!a.AbortSignal || !fa),
      Zn = B + N + "/",
      Qn = /^(about:(home|newtab)|(chrome|edge):\/\/(newtab\/|startpageshared\/|vivaldi-webui\/startpage))$/,
      eo = (e, a, t) => (2 === e && a) || t,
      ao = (e) => (2 === e[v] && e[J]) || e[Y],
      to = (e) => (+e >= 0 ? { [Y]: +e } : { [J]: e }),
      no = (e) => e.pendingUrl || e.url || "",
      oo = browser.tabs.onUpdated,
      io = browser.tabs.onRemoved
    let so,
      ro,
      lo = /^(https?|file|ftps?):/
    try {
      oo.addListener(Be, { properties: ["status"] }), oo.removeListener(Be)
    } catch (e) {
      oo.addListener = new Proxy(oo.addListener, { apply: (e, a, t) => E(e, a, t[0]) })
    }
    async function co(e) {
      const a = await browser.tabs.query({})
      let t = 0
      for (let n = 0; n < a.length; n++) e(a[n]), (t += 1), t % 20 == 0 && (await new M(setTimeout))
    }
    async function uo(e, a) {
      const t = B + (e ? "#" + e : "")
      for (let a = 0, n = await browser.tabs.query({ url: B }); a < n.length; a++) {
        const o = n[a],
          i = o.url
        if (i === t || (!e && i === t + N))
          return null == fa || fa.update(o[Q], { focused: !0 }), browser.tabs.update(o.id, { active: !0 })
      }
      return Ha.TabOpen({ url: t }, a)
    }
    async function mo(e) {
      const { url: a, id: t } = await Ra()
      if (lo.test(a) && Dn(a, e)) return browser.tabs.reload(t)
    }
    Fa({
      GetTabDomain(e) {
        const a = e && new URL(e).hostname
        return { host: a, domain: (a && rn(a)) || a }
      },
      async OpenEditor(e, a) {
        var t
        return uo(`${h}/${e || `_new/${(null == a || null == (t = a.tab) ? void 0 : t.id) || (await Ra()).id}`}`, a)
      },
      OpenDashboard: uo,
    }),
      Wa({
        async TabOpen({ url: e, active: a = !0, container: t, insert: n = !0, pinned: o }, i = {}) {
          const s = i._removed,
            r = (!s && i.tab) || (await Ra(s && i.tab[Q])) || {},
            l = i.url,
            c = !l || l.startsWith(H),
            { incognito: u, [Q]: d } = r,
            m = !u || P || !/^(chrome[-\w]*):/.test(e),
            h = { active: !!a, pinned: !!o }
          let g,
            p = r.cookieStoreId
          if (
            (p &&
              !u &&
              (ro || (ro = (await browser.cookies.getAllCookieStores())[0].id.split("-")[0]),
              c || 0 === t ? (p = ro + "-default") : t > 0 && (p = `${ro}-container-${t}`)),
            p && (p = { cookieStoreId: p }),
            /^[-\w]+:/.test(e) || (e = c ? browser.runtime.getURL(e) : Jn(e, l)),
            c && e.startsWith(Zn) && fa && qt("editorWindow") && (!p || Bn >= 64))
          ) {
            const t = {
                url: e,
                incognito: m && u,
                ...(qt("editorWindowSimple") && { type: "popup" }),
                ...(!P && { focused: !!a }),
                ...p,
              },
              n = qt("editorWindowPos"),
              o = n && "top" in n
            g = ((await fa.create({ ...t, ...n }).catch(o && Be)) || (o && (await fa.create(t)))).tabs[0]
          } else c && m && Qn.test(no(r)) && (g = await browser.tabs.update(r.id, { url: e, ...h }).catch(Be))
          for (let a = 0; !g && a < 2; a++)
            try {
              g = await browser.tabs.create({
                url: e,
                ...h,
                ...p,
                ...(m && {
                  [Q]: d,
                  ...(n && null != r.index && { index: r.index + 1 }),
                  ...(Xn && { openerTabId: r.id }),
                }),
              })
            } catch (e) {
              if (!e.message.startsWith("Illegal to set private")) throw e
              p = null
            }
          return (
            a && g[Q] !== d && (await (null == fa ? void 0 : fa.update(g[Q], { focused: !0 }))),
            c || null == r.id || (Yn[g.id] = r.id),
            c ? g : { id: g.id }
          )
        },
        TabClose({ id: e } = {}, a) {
          var t
          const n = e || (null == a || null == (t = a.tab) ? void 0 : t.id)
          n >= 0 && browser.tabs.remove(n)
        },
        TabFocus(e, a) {
          browser.tabs.update(a.tab.id, { active: !0 }).catch(Be),
            null == fa || fa.update(a.tab[Q], { focused: !0 }).catch(Be)
        },
      }),
      io.addListener((e) => {
        const a = Yn[e]
        a >= 0 && (za(a, "TabClosed", e), delete Yn[e])
      }),
      (async () => {
        const e = P || (await new M((e) => D.extension.isAllowedFileSchemeAccess(e)))
        ;(so = Bn < 68 || (!P && e)),
          (P && [].at) || Fn >= 88 ? (lo = e ? /^(https?|file):/ : /^https?:/) : e || (lo = /^(ht|f)tps?:/)
      })(),
      Fa({
        async NewScript(e) {
          const a = ((e >= 0 && (await browser.tabs.get(e).catch(Be))) || {}).url,
            t = lo.test(a) && `${a.split(/[#?]/)[0]}*`,
            { host: n = "example.org", domain: o } = t ? Ha.GetTabDomain(t) : {}
          return So({ url: t || `*://${n}/*`, name: o || "" })
        },
      })
    const ho = (e) => !/^\s*</.test(e) && ce.exec(e),
      go = { default: () => [], transform: (e, a) => (e.push(a), e) },
      po = { default: () => !1, transform: () => !0 },
      fo = { default: () => null, transform: (e, a) => (null == e ? a : e) },
      ko = {
        include: go,
        exclude: go,
        match: go,
        excludeMatch: go,
        require: go,
        resource: {
          default: () => ({}),
          transform: (e, a) => {
            const t = a.match(/^(\w\S*)\s+(.*)/)
            return t && (e[t[1]] = t[2]), e
          },
        },
        grant: go,
      },
      bo = { antifeature: go, compatible: go, connect: go, noframes: po, [xe]: po, [ze]: po },
      yo = /(?:^|\n)(.*?)\/\/([\x20\t]*)(@\S+)(.*)/g,
      vo = 'Unexpected text before "//" in ',
      wo = 'Expected a single space after "//" in '
    function xo(e, a, t) {
      const n = E(De, ko, (e) => e.default()),
        o = ho(e)
      if (!o) return !1
      let i
      for (t && zo(o, 1, t); (i = yo.exec(o[4])); ) {
        const [e, a] = i[3].slice(1).split(":"),
          o = e.replace(/[-_](\w)/g, (e, a) => a.toUpperCase()),
          s = a ? `${o}:${a.toLowerCase()}` : o,
          r = i[4].trim(),
          l = ko[s] || bo[s] || fo
        let c = n[s]
        void 0 === c && (c = l.default()), t && zo(i, 0, t), (n[s] = l.transform(c, r))
      }
      return t && zo(o, 5, t), (n.resources = n.resource), delete n.resource, a && (n[ve] = o[0]), n
    }
    function zo(e, a, t) {
      let n
      e[a + 1].match(/\S/) && t.push(vo + (n = jo(e[a], 50))), " " !== e[a + 2] && t.push(wo + (n || jo(e[a], 50)))
    }
    function jo(e, a) {
      return (e = e.trim()), JSON.stringify(e.length > a ? e.slice(0, a) + "..." : e)
    }
    function So(e) {
      const a = { url: "*://*/*", name: "", ...e },
        t = qt("scriptTemplate").replace(/{{(\w+)(?::(.+?))?}}/g, (e, t, n) => {
          var o
          return null != (o = a[t]) ? o : "date" !== t ? e : n ? Nt(n) : new Date().toLocaleString()
        })
      return {
        script: {
          custom: { origInclude: !0, origExclude: !0, origMatch: !0, origExcludeMatch: !0 },
          config: { enabled: 1, shouldUpdate: 1 },
          meta: xo(t),
          props: {},
        },
        code: t,
      }
    }
    function $o(e) {
      const a = e.meta.namespace || "",
        t = e.meta.name || ""
      let n = Ta(`${a}\n${t}\n`)
      return a || t || (n += e.props.id || ""), n
    }
    function qo(e) {
      let a = e.custom.lastInstallURL
      if (a) {
        switch (((a = a.split("/", 6)), a[2])) {
          case "update.greasyfork.org":
          case "update.sleazyfork.org":
            a[2] = a[2].slice(7)
          case "greasyfork.org":
          case "sleazyfork.org":
            "scripts" !== a[3] && a.splice(3, 1)
            break
          case "raw.githubusercontent.com":
            a[2] = "github.com"
            break
          case "github.com":
            break
          case "openuserjs.org":
            ;(a[3] = "scripts"), (a[4] = a[4].replace(/(\.min)?\.user\.js$/, ""))
            break
          default:
            a = !1
        }
        a && ((a.length = 5), (a = a.join("/")))
      }
      return (
        a ||
          ((a = e.meta.namespace),
          (a =
            /^https?:\/\/(?!tampermonkey\.net\/)/.test(a) &&
            _a(a).replace(/^https?(:\/\/userscripts)(\.org\/users\/\w)/, "https$1-mirror$2"))),
        a
      )
    }
    function Io(e, a = qa(e)) {
      let t =
        a &&
        a.match(
          /^https:\/\/(?:(?:(greas|sleaz)yfork\.org(?:\/(?!scripts)[^/]+)?|openuserjs\.org)(?=\/scripts\/)|github\.com)\/[^/]+\/[^/]+/
        )
      if (t) return `${t[0]}/${t[1] ? "feedback" : "issues"}`
    }
    function Mo(e) {
      if (!e || L(e, se)) return
      let a, t
      !(a = qa(e)) && (a = qo(e)) && ((t || (t = {}))[re] = a),
        !Ia(e) && (a = Io(e, a)) && ((t || (t = {}))[le] = a),
        (e[se] = t)
    }
    const Co = {}
    let Uo,
      Do = {}
    function _o(e, a) {
      null == e && (Do = {}),
        E(_e, Co, ([t, n]) => {
          const o = n[e]
          o && (a ? (delete o[a], ta(o) && delete n[e]) : delete n[e]), (null == e || ta(n)) && delete Co[t]
        })
    }
    async function To(e, a, t) {
      const n = +e[0] && (await mt[lt].getMulti(e))
      for (let o = 0; o < e.length; o++) {
        const i = e[o],
          s = n ? i : i.id,
          r = n ? n[s] || null : i[g]
        r ? Ce(Co, [s, a, t], I.assign({}, r)) : delete Co[s]
      }
    }
    function Ro(e, a) {
      for (let t = 0; t < e.length; t++) {
        const n = e[t]
        E(Re, Co[n], (e) => {
          a in e && ((e[0] = e[a]), delete e[a])
        })
      }
    }
    function Ao(e, a) {
      var t
      ;(a || mt[lt]).set(e, !!a), (Uo = (null == (t = Uo) ? void 0 : t.catch(console.warn).then(Lo)) || Lo())
    }
    async function Lo() {
      const e = {}
      let a = 0
      E(_e, Do, Eo, e), (Do = {})
      for (let t = 0, n = I.entries(e); t < n.length; t++) {
        const [e, o] = n[t]
        for (let t = 0, n = I.entries(o); t < n.length; t++) {
          const [o, i] = n[t]
          ta(i) || (za(+e, "UpdatedValues", i, to(o)), ++a % 20 || (await Aa()))
        }
      }
      Uo = null
    }
    function Eo([e, a]) {
      const t = I.entries(a)
      E(_e, Co[e], ([a, n]) => {
        if (a < 0) return
        const o = He(this, a)
        E(_e, n, ([a, n]) => {
          const i = He(He(o, a), e)
          t.forEach(([e, a]) => {
            a !== n[e] && (a ? (n[e] = a) : delete n[e], (i[e] = a))
          })
        })
      })
    }
    Fa({
      async GetValueStore(e, { tab: a }) {
        const t = He(He(Co, e), a.id)
        return t[0] || (t[0] = await mt[lt].getOne(e))
      },
      SetValueStores(e) {
        const a = {}
        E(_e, e, ([e, t = {}]) => {
          var n
          ;(e = null == (n = xi({ id: +e, uri: e })) ? void 0 : n.props.id) && ((a[ct + e] = t), (Do[e] = t))
        }),
          Ao(a, Xo)
      },
    }),
      Wa({
        UpdateValue(e, a) {
          const t = {}
          for (const n in e) {
            const o = Me(Co, [n, a.tab.id, ao(a)])
            if (!o) return
            const i = He(Do, n),
              s = e[n]
            for (const e in s) {
              const a = s[e]
              a ? (o[e] = a) : delete o[e], (i[e] = a || null)
            }
            t[n] = o
          }
          Ao(t)
        },
      })
    let Oo,
      Po = {},
      No = {},
      Ho = 0
    const Wo = {},
      Fo = Ct({ lifetime: 36e5 }),
      Bo = Ct({ lifetime: 864e5 }),
      Vo = mt.api,
      { hook: Go, fire: Ko } = wa(),
      Jo = Go,
      Yo = Fo.has,
      Xo = (mt.api = {
        async get(e) {
          var a
          const t = {}
          if (
            (Qo(!0),
            !(e =
              null == (a = e)
                ? void 0
                : a.filter((e) => {
                    const a = Fo.get(e),
                      n = void 0 !== a
                    return n && (t[e] = Ae(a)), !n && 0 !== Bo.get(e)
                  })) || e.length)
          ) {
            var n
            let a
            e || (a = 5e3),
              E(_e, await Vo.get(e), ([e, n]) => {
                ;(t[e] = n), Bo.put(e, 1), Fo.put(e, Ae(n), a), ki(e, n)
              }),
              null == (n = e) || n.forEach((e) => Bo.put(e, +L(t, e)))
          }
          return Qo(!1), t
        },
        async set(e, a) {
          const t = {},
            n = []
          Qo(!0),
            E(_e, e, ([e, o]) => {
              const i = Ee(o, Fo.get(e))
              if (void 0 !== i) {
                if ((Fo.put(e, i), Bo.put(e, 1), n.push(e), Oo)) return void (t[e] = o)
                !a && e.startsWith(ct)
                  ? (Po[e] = i)
                  : ((t[e] = o), ki(e, o) && o[se] && delete (t[e] = { ...o })[se], ei(e, o))
              }
            }),
            Qo(!1),
            ta(t) || (await Vo.set(t)),
            Oo || (n.length && Ko(n, e), ti())
        },
        async remove(e) {
          const a = e.filter((e) => {
            let a = 0 !== Bo.get(e)
            if (a) {
              if ((Fo.del(e), Bo.put(e, 0), Oo)) return a
              mt[lt].toId(e) ? ((Po[e] = null), (a = !1)) : (ki(e), ei(e))
            }
            return a
          })
          a.length && (await Vo.remove(a)), Oo || (e.length && Ko(e), ti())
        },
      })
    function Zo(e, a, t = !0) {
      t && !No && (No = {}),
        E(_e, a, ([a, n]) => {
          const { prefix: o } = mt[a]
          for (let a = 0, i = na(n); a < i.length; a++) {
            const n = o + i[a],
              s = No[n] || (t && (No[n] = [])),
              r = s ? s.indexOf(e) : -1
            r >= 0 && !t ? (s.splice(r, 1), s.length || delete No[n]) : r < 0 && t && s.push(e)
          }
        }),
        ta(No) && (No = null)
    }
    function Qo(e) {
      Fo.batch(e), Bo.batch(e)
    }
    async function ei(e, a) {
      const t = mi.exec(e)
      t && t[0] !== rt && 2 === (ri[e] = Ne(a)) && t[0] === ct && (ri[e] = 0)
    }
    async function ai() {
      const e = I.keys(Po),
        a = [],
        t = Po
      ;(Po = {}),
        (Ho = 0),
        e.forEach((e) => {
          const n = t[e]
          n || (delete t[e], a.push(e)), ei(e, n)
        }),
        ta(t) || (await Vo.set(t)),
        a.length && (await Vo.remove(a)),
        No && setTimeout(ni, 0, t, a)
    }
    function ti() {
      Ho || ta(Po) || (Ho = setTimeout(ai, Math.min(1e3, 100 * Math.max(1, Ne(Po) / 1e6))))
    }
    function ni(e, a) {
      const t = new Map()
      let n, o
      for (const i in No)
        if ((n = e[i]) || a.includes(i))
          for (let e = 0, a = No[i]; e < a.length; e++) {
            const s = a[e]
            ;(o = t.get(s)) || t.set(s, (o = {})), (o[i] = { newValue: n })
          }
      t.forEach((e, a) => a(e))
    }
    async function oi(e) {
      let a, t
      e.onDisconnect.addListener(() => {
        pa(), (a = !0)
      }),
        e.onMessage.addListener(async () => {
          var a
          Po = {}
          const n = await Xo.get(),
            o = I.keys(n).filter((e) => !(e in t)),
            i = Math.max(50, Math.min(500, (null == (a = _.getEntries()[0]) ? void 0 : a.duration) || 200))
          ;(Oo = !0),
            o.length && (await Xo.remove(o)),
            await Xo.set(t),
            e.postMessage(!0),
            await xa("Reload", i),
            location.reload()
        }),
        (t = await Vo.get()),
        a || e.postMessage(!0)
    }
    ;(a[me] = (e) => {
      const a = _.now()
      return (Wo[a] = e), a
    }),
      browser.runtime.onConnect.addListener((e) => {
        if ("undoImport" === e.name) return oi(e)
        if (!e.name.startsWith(me)) return
        const { id: a, cfg: t, tabId: n } = JSON.parse(e.name.slice(12)),
          o = a ? Wo[a] : e.postMessage.bind(e)
        Zo(o, t),
          e.onDisconnect.addListener(() => {
            _o(n), Zo(o, t, !1), delete Wo[a]
          })
      })
    let ii = 0,
      si = 0,
      ri = {}
    const li = {},
      ci = [],
      ui = [],
      di = 1e3,
      mi = RegExp(`^(${tt}|${rt}|${ct}|${it}|${et}${nt})`),
      hi = { [Qa]: {}, [ot]: {} },
      gi = {}
    function pi(e) {
      return +e || 0
    }
    function fi(e) {
      return null == e ? void 0 : e.props.id
    }
    function ki(e, a) {
      const t = +mt[st].toId(e)
      if (t) {
        if (a) {
          const e = li[t],
            n = ci.indexOf(e),
            o = ui.indexOf(e)
          n >= 0 && (ci[n] = a), o >= 0 && (ui[o] = a), (li[t] = a)
        } else delete li[t]
        return !0
      }
    }
    async function bi() {
      const e = ci.reduce((e, a, t) => {
        const { props: n } = a,
          o = t + 1
        return n.position !== o && ((n.position = o), ((e || (e = {}))[n.id] = a)), e
      }, null)
      return (si = ci.length), e && (await mt[st].set(e), It("lastModified", Date.now())), !!e
    }
    async function yi() {
      ci.sort((e, a) => pi(e.props.position) - pi(a.props.position))
      const e = await bi()
      return xa("ScriptsUpdated", null), e
    }
    function vi(e) {
      return li[e]
    }
    function wi(e) {
      var a
      return null != (a = null == e ? void 0 : e.map(vi)) ? a : [...ci, ...ui]
    }
    function xi({ id: e, uri: a, meta: t, removed: n }) {
      let o
      return (
        e
          ? (o = vi(e))
          : (a || (a = $o({ meta: t, props: { id: "@@should-have-name" } })),
            (o = (n ? ui : ci).find(({ props: e }) => a === e.uri))),
        o
      )
    }
    function zi() {
      return [...ci]
    }
    Wa({
      GetScriptVer(e) {
        const a = xi(e)
        return a ? a.meta.version : null
      },
    }),
      Fa({
        CheckPosition: yi,
        CheckRemove: Wi,
        RemoveScripts: Hi,
        GetData: Li,
        GetMoreIds: ({ url: e, [v]: a, [r]: t }) => _i(e, a, null, t),
        GetScript: xi,
        GetSizes: Oi,
        async ExportZip({ values: e }) {
          const a = zi(),
            t = a.map(fi),
            n = await mt[at].getMulti(t)
          return {
            items: a.map((e) => ({ script: e, code: n[e.props.id] })),
            values: e ? await mt[lt].getMulti(t) : void 0,
          }
        },
        GetScriptCode: (e) => mt[at][Array.isArray(e) ? "getMulti" : "getOne"](e),
        async MarkRemoved({ id: e, removed: a }) {
          if (!a && xi({ meta: vi(e).meta })) throw We("msgNamespaceConflictRestore")
          await Bi(e, { config: { removed: a ? 1 : 0 }, props: { lastModified: Date.now() } })
          const t = a ? ci : ui,
            n = t.findIndex((a) => a.props.id === e),
            [o] = t.splice(n, 1)
          ;(a ? ui : ci).push(o)
        },
        Move({ id: e, offset: a }) {
          const t = vi(e),
            n = ci.indexOf(t)
          return ci.splice(n, 1), ci.splice(n + a, 0, t), bi()
        },
        ParseMeta: Vi,
        ParseMetaErrors: (e) => Vi(e).errors,
        ParseScript: Gi,
        UpdateScriptInfo: ({ id: e, config: a, custom: t }) =>
          Bi(e, { config: a, custom: t, props: { lastModified: Date.now() } }),
        Vacuum: es,
      }),
      (async () => {
        const e = await mt.base.getOne("version"),
          a = "2.26.2"
        e ||
          (await new M((e, a) => {
            const n = { origInclude: !0, origExclude: !0, origMatch: !0, origExcludeMatch: !0 }
            function o(t) {
              const n = t.transaction([h, ot, Qa, g]),
                o = {}
              let s = 3
              const r = () => {
                  ;(s -= 1), s || e(mt.base.set(o))
                },
                l = (e, t) => {
                  const o = n.objectStore(e).getAll()
                  ;(o.onsuccess = () => t(o.result)), (o.onerror = a)
                }
              l(h, (e) => {
                const a = {}
                e.forEach((e) => {
                  const { code: t, id: n, uri: s } = e
                  ;(o[mt[st].toKey(n)] = i(e)), (o[mt[at].toKey(n)] = t), (a[s] = n)
                }),
                  l(g, (e) => {
                    e.forEach(({ uri: e, [g]: t }) => {
                      const n = a[e]
                      n && (o[mt[lt].toKey(n)] = t)
                    }),
                      r()
                  })
              }),
                l(Qa, (e) => {
                  e.forEach(({ uri: e, data: a }) => {
                    o[mt[Qa].toKey(e)] = a
                  }),
                    r()
                }),
                l(ot, (e) => {
                  e.forEach(({ uri: e, code: a }) => {
                    o[mt[ot].toKey(e)] = a
                  }),
                    r()
                })
            }
            function i(e) {
              return {
                meta: xo(e.code),
                custom: I.assign({}, n, e.custom),
                props: { id: e.id, uri: e.uri, position: e.position },
                config: { enabled: e.enabled, shouldUpdate: e.update },
              }
            }
            console.info("Upgrade database..."),
              (() => {
                const e = indexedDB.open(t, 1)
                ;(e.onsuccess = () => {
                  try {
                    o(e.result)
                  } catch (e) {
                    a(e)
                  }
                }),
                  (e.onerror = a),
                  (e.onupgradeneeded = () => {
                    a()
                  })
              })()
          }).catch(() => {})),
          a !== e && mt.base.set({ version: a })
        const o = await mt.base.getMulti(),
          i = {},
          s = { origInclude: !0, origExclude: !0, origMatch: !0, origExcludeMatch: !0 }
        E(_e, o, ([e, a]) => {
          const t = +mt[st].toId(e)
          if (t && a) {
            const e = $o(a)
            if (!a.config.removed) {
              if (li[t] && li[t] !== a) return
              if (i[e]) return
              i[e] = a
            }
            ;(a.props = { ...a.props, id: t, uri: e }),
              (a.custom = I.assign({}, s, a.custom)),
              (ii = Math.max(ii, t)),
              (si = Math.max(si, pi(a.props.position))),
              (a.config.removed ? ui : ci).push(a)
            const { meta: n = (a.meta = {}) } = a
            n.require || (n.require = []),
              n.resources || (n.resources = {}),
              xe in n && (n[xe] = !0),
              (n.grant = [...new Set(n.grant || [])])
          }
        }),
          zt(o),
          a !== e && P && qt("defaultInjectInto") === d && ea(e, "2.12.7") <= 0 && It("defaultInjectInto", n),
          yi(),
          es(o),
          Wi(),
          setInterval(Wi, ge),
          Ba()
      })()
    const ji = "cacheKeys",
      Si = "reqKeys",
      $i = "valueIds",
      qi = "promise",
      Ii = () => ({ depsMap: {}, [m]: {}, [h]: [] }),
      Mi = /^GM[_.](listValues|([gs]et|delete)Values?)$/,
      Ci = { [Qa]: ji, [at]: r, [ot]: Si, [lt]: $i },
      Ui = I.entries(Ci),
      Di = new Set()
    function _i(e, a, t, n) {
      if (yn(e)) return
      const o = {},
        i = !t
      let s,
        l,
        c = i || !P
      Cn(t || !0)
      for (let t = 0; t < ci.length; t++) {
        var d
        const i = ci[t],
          {
            config: { enabled: g },
            custom: p,
            meta: f,
            props: { id: k },
          } = i
        if ((n ? k in n : !g) || (!a && (null != (d = p.noframes) ? d : f.noframes)) || !Dn(e, i)) continue
        if (n) {
          o[k] = g ? u : 0
          continue
        }
        if (((o[k] = 1), !s)) {
          ;(s = Ii()), (l = Ii())
          for (let e = 0; e < Ui.length; e++) {
            const [a, t] = Ui[e]
            ;(s[a] = {}), (l[a] = {}), (s[t] = []), (l[t] = [])
          }
        }
        const { pathMap: b = Ki(i) } = p,
          y = Ca(i),
          v = "start" === y || "body" === y ? s : l,
          { depsMap: w } = v
        if ((v[r].push(k), (v[m][k] = y), f.grant.some(Mi.test, Mi) && v[$i].push(k), !c))
          for (let e = 0, a = f.grant; e < a.length; e++) {
            const t = a[e]
            c || ("GM_setClipboard" !== t && "GM.setClipboard" !== t) || (c = s.clipFF = !0)
          }
        for (
          let e = 0,
            a = [
              [f.require, ot, Ye],
              [I.values(f.resources), Qa],
            ];
          e < a.length;
          e++
        ) {
          const [t, n, o] = a[e],
            i = Ci[n],
            r = n === Qa ? s : v
          for (let e = 0; e < t.length; e++) {
            let a = t[e]
            ;(a = b[a] || a),
              a && (la(a) ? o && (v[n][a] = o(a)) : r[i].includes(a) || (v[i].push(a), (w[a] || (w[a] = [])).push(k)))
          }
        }
        v[h].push(i)
      }
      return (
        Cn(),
        n
          ? o
          : s
            ? i
              ? ((l[qi] = Ti(l)), l)
              : (s[r].length && (s[qi] = Ti(s)),
                l[r].length && (l[qi] = Aa().then(Ti.bind(null, l))),
                I.assign(s, { allIds: o, [u]: l }))
            : void 0
      )
    }
    async function Ti(e) {
      const a = []
      for (let t = 0; t < Ui.length; t++) {
        const [n, o] = Ui[t]
        for (let t = 0, i = e[o]; t < i.length; t++) {
          const e = i[t]
          a.push(mt[n].toKey(e))
        }
      }
      const t = await mt.base.getMulti(a),
        n = new Set()
      for (let a = 0; a < Ui.length; a++) {
        const [i, s] = Ui[a]
        for (let a = 0, r = e[s]; a < r.length; a++) {
          const s = r[a]
          let l = t[mt[i].toKey(s)]
          var o
          l || i !== lt || (l = {}),
            (e[i][s] = l),
            null == l && (i === at ? n.add(s) : null == (o = e.depsMap[s]) || o.forEach((e) => n.add(e)))
        }
      }
      return n.size && Ri(n), e
    }
    function Ri(e) {
      const a = [],
        t = We("msgMissingResources")
      let n,
        o = We("msgReinstallScripts"),
        i = o
      e.forEach((e) => {
        ;(n = `\n#${e}: ${Ma(vi(e))}`), (o += n), Di.has(e) || (Di.add(e), a.push(e), (i += n))
      }),
        console.error(`${t} ${o}`),
        a.length && Ai(t, i, a)
    }
    function Ai(e, a, t) {
      Ha.Notification({
        title: e,
        text: a,
        onclick() {
          t.forEach((e) => Ha.OpenEditor(e))
        },
      })
    }
    async function Li({ id: e, ids: a, sizes: t }) {
      e && (a = [e])
      const n = {},
        o = a ? wi(a).filter($) : wi()
      return (
        o.forEach(Mo),
        (n[h] = o),
        t && (n.sizes = Oi(a)),
        e || (n.cache = await Ei(o)),
        !e && t && (n.sync = Ha.SyncGetStates()),
        n
      )
    }
    async function Ei(e) {
      const a = [`${V}38.png`],
        t = [],
        n = {}
      for (let n = 0; n < e.length; n++) {
        let { custom: o, meta: i } = e[n],
          s = o.icon || i.icon
        ca(s) && ((s = o.pathMap[s] || s), a.push(s), Yo(et + s) || t.push(s))
      }
      t.length && (await mt[Qa].getMulti(t))
      for (let e, t, o = 0; o < a.length; o++) (t = a[o]), (e = cs(t)), (!j(e) || (!o && (e = await e))) && (n[t] = e)
      return n
    }
    function Oi(e) {
      const a = wi(e)
      return a.map(({ meta: e, custom: { pathMap: t = {} }, props: { id: n } }, o) => [
        ri[tt + n] || 0,
        Ne(a[o]),
        ri[ct + n] || 0,
        e.require.reduce(Pi, { len: 0, pathMap: t }).len,
        I.values(e.resources).reduce(Ni, { len: 0, pathMap: t }).len,
      ])
    }
    function Pi(e, a) {
      return (e.len += (ri[it + (e.pathMap[a] || a)] || 0) + a.length), e
    }
    function Ni(e, a) {
      return (e.len += (ri[et + (e.pathMap[a] || a)] || 0) + a.length), e
    }
    async function Hi(e) {
      const a = [],
        t =
          1 +
          ui.reduce((t, n, o) => {
            const i = fi(n)
            return e.includes(i) ? (a.push(tt + i, rt + i, ct + i), delete li[i]) : ++t < o && (ui[t] = n), t
          }, -1)
      if (ui.length !== t) return (ui.length = t), await mt.base.remove(a), xa("RemoveScripts", e)
    }
    function Wi({ force: e } = {}) {
      const a = Date.now(),
        t = ui
          .filter((t) => {
            const { lastModified: n } = t.props
            return t.config.removed && (e || a - pi(n) > 6048e5)
          })
          .map((e) => e.props.id)
      return Hi(t)
    }
    const Fi = crypto.randomUUID
      ? crypto.randomUUID.bind(crypto)
      : () => {
          const e = new Uint16Array(8)
          return (
            a.crypto.getRandomValues(e),
            (e[3] = (4095 & e[3]) | 16384),
            (e[4] = (16383 & e[4]) | 32768),
            "01-2-3-4-567".replace(/\d/g, (a) => (e[a] + 65536).toString(16).slice(-4))
          )
        }
    async function Bi(e, a) {
      const t = li[e]
      if (!t) throw null
      return (
        (t.props = { ...t.props, ...a.props }),
        (t.config = { ...t.config, ...a.config }),
        (t.custom = { ...t.custom, ...a.custom }),
        await mt[st].setOne(e, t),
        xa("UpdateScript", { where: { id: e }, update: t })
      )
    }
    function Vi(e) {
      const a = j(e),
        t = (a && e.custom) || { origInclude: !0, origExclude: !0, origMatch: !0, origExcludeMatch: !0 },
        n = [],
        o = xo(a ? e.code : e, !1, n)
      return (
        o ? (Cn(n), Dn("", { meta: o, custom: t }), Cn()) : n.push(We("labelNoName")),
        { meta: o, errors: n.length ? n : null }
      )
    }
    async function Gi(e) {
      var a
      const { meta: t, errors: n } = e.meta ? e : Vi(e)
      if (!t.name) throw `${We("msgInvalidScript")}\n${We("labelNoName")}`
      const o = { message: null == e.message ? We("msgUpdated") : e.message || "" },
        i = { errors: n, update: o },
        { [at]: s, update: r } = e,
        l = Date.now()
      let c,
        { id: u } = e,
        d = xi({ id: u, meta: t })
      d
        ? ((c = d), (u = c.props.id))
        : (({ script: c } = So()),
          ii++,
          (u = c.props.id = ii),
          (i.isNew = !0),
          (o.message = We("msgInstalled")),
          ci.push(c))
      const { config: m, props: h } = c,
        g = $o({ meta: t, props: { id: u } })
      if (d) {
        if (e.isNew || (u && ci.some(({ props: e }) => g === e.uri && u !== e.id))) throw We("msgNamespaceConflict")
        delete c[se]
      }
      ;(h.lastModified = l), (h.uuid = h.uuid || Fi())
      for (let a = 0, t = ["config", "custom", "props"]; a < t.length; a++) {
        const n = t[a],
          o = c[n]
        E(_e, e[n], ([e, a]) => {
          null == a ? delete o[e] : (o[e] = a)
        })
      }
      const p = +e.position
      p ? ((h.position = p), (si = Math.max(si, p))) : d || (si++, (h.position = si)),
        (m.enabled = pi(m.enabled)),
        (m.removed = 0),
        (m.shouldUpdate = pi(m.shouldUpdate)),
        (c.meta = t),
        (h.uri = $o(c)),
        !qa(c) && ua(e.from) && (c.custom.homepageURL = e.from),
        ua(e.url) && (c.custom.lastInstallURL = e.url),
        (c.custom.tags =
          null == (a = c.custom.tags) ? void 0 : a.split(/\s+/).map(ha).filter($).join(" ").toLowerCase()),
        r || mt.mod.remove(Da(c, { all: !0 }) || []),
        Ki(c, e.url)
      const f = Ji(c, e),
        k = !d || s !== (await mt[at].getOne(u))
      return (
        k && e.bumpDate && (h.lastUpdated = l),
        e.cache && (await f),
        await mt.base.set({ [rt + u]: c, ...(k && { [tt + u]: s }) }),
        I.assign(o, c, r),
        (i.where = { id: u }),
        (i[at] = e[at]),
        xa("UpdateScript", i),
        _t.emit("scriptChanged", i),
        e.reloadTab && mo(c),
        i
      )
    }
    function Ki(e, a) {
      const { meta: t } = e,
        n = a || e.custom.lastInstallURL,
        o = n
          ? [...t.require, ...I.values(t.resources), t.icon].reduce((e, a) => {
              if (a) {
                const t = Jn(a, n)
                t !== a && (e[a] = t)
              }
              return e
            }, {})
          : {}
      return (e.custom.pathMap = o), o
    }
    async function Ji(e, a) {
      const { custom: t, meta: n } = e,
        { pathMap: o } = t,
        { resources: i } = n,
        s = t.icon || n.icon,
        r = []
      for (let e = 0, a = n.require; e < a.length; e++) {
        const t = a[e]
        r.push([ot, t])
      }
      for (const e in i) r.push([Qa, i[e]])
      ua(s) && r.push([Qa, s, di])
      for (let e, t, n, i, s = 0; s < r.length; s++)
        ([e, t, n] = r[s]),
          (i = hi[e][t]) ||
            (t &&
              !la(t) &&
              ((t = o[t] || t),
              (i = a[e]) && null != (i = i[t])
                ? (mt[e].setOne(t, i), (i = ""))
                : ((i = Yi(a, e, t)), n && (i = M.race([i, Aa(n)])), (hi[e][t] = i)))),
          (r[s] = i)
      const l = await M.all(r),
        c = E(La, l.map(Zi), "\n")
      if (c) {
        const a = We("msgErrorFetchingResource")
        return xa("UpdateScript", { update: { error: c, message: a }, where: { id: fi(e) } }), `${a}\n${c}`
      }
    }
    async function Yi(e, a, t) {
      if ((!e.reuseDeps && !ua(t)) || null == (await mt[a].getOne(t))) {
        const { portId: n } = e
        n && Xi(gi, n, [t])
        try {
          await mt[a].fetch(t, e[je])
        } catch (e) {
          return e
        } finally {
          n && Xi(gi, n, [t, !0]), delete hi[a][t]
        }
      }
    }
    function Xi(e, a, t) {
      let n = e[a]
      n ||
        ((n = e[a] = D.runtime.connect({ name: a })),
        n.onDisconnect.addListener(() => {
          pa(), delete e[a]
        })),
        n.postMessage(t)
    }
    function Zi(e) {
      return (e && E(La, [e.status && `HTTP${e.status}`, e.url], " ")) || e
    }
    let Qi
    async function es(e) {
      if (Qi) return Qi
      let a
      Qi = new M((e) => {
        a = e
      })
      const t = e && [],
        n = {},
        o = {},
        i = [],
        s = [],
        r = {},
        l = RegExp(`^(${[ct, et, it, tt, nt].join("|")})`),
        c = [ct, nt],
        u = {},
        d = (a, t, o, i) => {
          if (!t || (i && la(t))) return 0
          const s = a + ((null == i ? void 0 : i[t]) || t),
            l = r[s]
          l < 0
            ? ((r[s] = 1),
              t !== o && (r[nt + t] = 1),
              a === ct
                ? 2 === (n[s] = Ne(e[s])) && ((n[s] = 0), (r[s] = -1))
                : a !== nt && (n[s] = Ne(e[s]) + s.length))
            : l || c.includes(a) || (r[s] = 2 + o)
        }
      return (
        e || (e = await mt.base.getMulti()),
        E(Te, e, (e) => {
          l.test(e) && (r[e] = -1)
        }),
        (ri = n),
        wi().forEach((e) => {
          const { meta: a, props: t } = e,
            n = e.custom.icon || a.icon,
            { id: o } = t,
            i = e.custom.pathMap || Ki(e),
            s = Da(e, { all: !0 })
          s && (s.forEach((e) => d(nt, e, o)), (u[o] = s[0])),
            d(tt, o, o),
            d(ct, o, o),
            a.require.forEach((e) => d(it, e, o, i)),
            E(Re, a.resources, (e) => d(et, e, o, i)),
            ua(n) && d(et, n, o, i)
        }),
        E(_e, r, ([e, a]) => {
          if (a < 0) s.push(e)
          else if (a >= 2) {
            const n = mt.forKey(e),
              o = n.toId(e),
              r = n.name === at ? u[o] : o
            t
              ? t.push(r || (+o && Ua(vi(o))) || e)
              : r && n.fetch && (s.push(nt + r), i.push(n.fetch(r).catch((e) => `${Ma(vi(+o || a - 2))}: ${Zi(e)}`)))
          }
        }),
        s.length && (await mt.base.remove(s), (o.errors = (await M.all(i)).filter($))),
        t && t.length && console.warn("Missing required resources. Try vacuuming database in options.", t),
        (Qi = null),
        (o.fixes = i.length + s.length),
        a(o),
        o
      )
    }
    const as = {},
      ts = (e) => "SetPopup" + e
    async function ns(e, a, t) {
      e[u] = !0
      const n = e[r],
        o = _i(a.url, a[v], null, n)
      if ((I.assign(n, o), I.assign(e, await Li({ [r]: I.keys(n) })), (e = [e, a]), !t)) return e
      ;(Dt.get(t) || Dt.put(t, {}))[a[Y]] = e
    }
    async function os(e, a) {
      return (
        (a[X] && (await za(e, t, null, { [Y]: 0 }))) ||
        (await browser.tabs.executeScript(e, { code: "1", [m]: "document_start" }).catch(() => []))[0]
      )
    }
    function is(e, a) {
      ms[e] && za(e, "PopupShown", a)
    }
    Fa({
      async InitPopup() {
        const e = (await Ra()) || {},
          { url: a = "", id: t } = e,
          n = Ha.GetTabDomain(a),
          o = ms[t] || {}
        let i = Ds(a, o, ""),
          s = !P && !i[0] && void 0 === o[X],
          l = Dt.pop(ts(t))
        return (
          s && (l ? !l[0] : (l = {})) && (l[0] = await ns({ [r]: {}, menus: {} }, { tab: e, url: a, [Y]: 0, [v]: 1 })),
          i[0] ||
            null != o[X] ||
            ((await os(t, o))
              ? s && (s = l[0][0])[h].length && ((i = [We("failureReasonRestarted"), O]), (s[c] = "off"))
              : (i = Ds(""))),
          (n.tab = e),
          [l, n, i]
        )
      },
    }),
      Wa({
        SetPopup(e, a) {
          const t = a.tab.id,
            n = ts(t)
          as[t] || ns(e, a, n)
        },
      }),
      browser.runtime.onConnect.addListener((e) => {
        const [a, t, n] = e.name.split(":")
        "Popup" === a &&
          (t || is(+n, !0),
          (as[n] = e),
          e.onDisconnect.addListener(() => {
            delete as[n], is(+n, !1)
          }))
      }),
      browser.webRequest.onBeforeRequest.addListener(
        () => {
          Ra().then((e) => e && is(e.id, !0))
        },
        { urls: [D.runtime.getURL(F[K].default_popup)], types: ["main_frame"] }
      )
    const ss = [16, 32],
      rs = {},
      ls = {},
      cs = (e) => rs[e] || (rs[e] = Ts(e)),
      us = (() => {
        const e = D.browserAction,
          a =
            (a) =>
            (...t) => {
              try {
                E(a, e, ...t, pa)
              } catch (n) {
                E(a, e, ...t)
              }
            }
        return Ue(e, ["setIcon", "setBadgeText", "setBadgeBackgroundColor", "setTitle"], (e) => (e ? a(e) : Be))
      })(),
      ds = D.contextMenus,
      ms = {},
      hs = "showBadge",
      gs = "badgeColor",
      ps = "badgeColorBlocked",
      fs = We("failureReasonBlacklisted"),
      ks = F[K].default_title,
      bs = F[K].default_icon[16].match(/\d+(\w*)\./)[1],
      ys = We("menuScriptDisabled"),
      vs = We("failureReasonNoninjectable"),
      ws = We("skipScriptsMsg")
    let xs, zs, js, Ss
    function $s(e, a) {
      var t
      const n = He(ms, e)
      return (
        (n.icon = bs),
        (n.total = 0),
        (n.unique = 0),
        (n[r] = new Set()),
        (n[Y] = void 0),
        (n[X] = a),
        a || null == (t = as[e]) || t.postMessage(null),
        n
      )
    }
    function qs(e, a, { tab: t, [Y]: n, [v]: o }) {
      const i = t.id,
        s = e === x || "off" === e ? e : !!e,
        l = (!(a && o) && ms[i]) || $s(i, s)
      if (Array.isArray(e)) {
        const { [r]: a, [Y]: t = (l[Y] = {}) } = l
        e.forEach(a.add, a), (l.unique = a.size), (l.total = 0), (t[n] = e.length)
        for (const e in t) l.total += t[e]
      }
      o && (l[X] = s), Ms(t, l), Cs(t, l)
    }
    function Is({ id: e }, a = ms[e]) {
      a && us.setBadgeText({ text: `${a[zs] || ""}`, tabId: e })
    }
    function Ms({ id: e }, a = ms[e]) {
      a && us.setBadgeBackgroundColor({ color: a[X] ? js : Ss, tabId: e })
    }
    function Cs(e, a, t) {
      const n = e.id
      a || (a = ms[n] || $s(n)), t || ([t] = Ds(no(e), a)), us.setTitle({ tabId: n, title: t }), Us(e, a), Is(e, a)
    }
    async function Us({ id: e } = {}, a = ms[e] || {}) {
      const t = xs ? (!0 !== a[X] ? "b" : "") : "w"
      if (a.icon === t) return
      a.icon = t
      const n = {},
        o = {}
      for (let e = 0; e < ss.length; e++) {
        const a = ss[e],
          i = `${V}${a}${t}.png`
        ;(n[a] = i), (o[a] = ls[i] || ((await (rs[i] || (rs[i] = Ts(i)))) && ls[i]))
      }
      us.setIcon({ tabId: e, path: n, imageData: o })
    }
    function Ds(e, a, t = ks) {
      return lo.test(e)
        ? (e = yn(e))
          ? [fs, "blacklisted", e]
          : xs && "off" !== (null == a ? void 0 : a[X])
            ? a
              ? a[X] === x
                ? [ws, x]
                : [t]
              : []
            : [ys, O]
        : [vs, c]
    }
    function _s(e, a) {
      if (e === x) Ha[x](a)
      else if (e === G) uo(e)
      else if ("dashboard" === e) uo("")
      else if ("newScript" === e) Ha.OpenEditor()
      else if ("updateScripts" === e) Ha.CheckUpdate()
      else if ("updateScriptsInTab" === e) {
        var t
        ;(e = null == (t = ms[a.id]) ? void 0 : t[r]) && Ha.CheckUpdate([...e])
      } else e.startsWith(hs) && It(hs, e.slice(10))
    }
    async function Ts(e) {
      const a = new Image(),
        t = e.startsWith(V)
      let n
      ;(a.src = t ? e.slice(W.length) : e.startsWith("data:") ? e : Ea("i" === e[0] ? e : await Rs(e)) || e),
        await new M((e) => {
          ;(a.onload = e), (a.onerror = e)
        })
      let o = !t && 76,
        { width: i, height: s } = a
      if (!i || !s) return (rs[e] = e), e
      o && (i > o || s > o) && ((o /= i > s ? i : s), (i = Math.round(i * o)), (s = Math.round(s * o)))
      const r = document.createElement("canvas"),
        l = r.getContext("2d")
      ;(r.width = i), (r.height = s), l.drawImage(a, 0, 0, i, s)
      try {
        ;(n = r.toDataURL()), t && (ls[e] = l.getImageData(0, 0, i, s))
      } catch (a) {
        n = e
      }
      return (rs[e] = n), n
    }
    async function Rs(e) {
      var a
      return null != (a = await mt[Qa].getOne(e)) ? a : await mt[Qa].fetch(e, "res").catch(console.warn)
    }
    function As() {
      const e = {}
      return {
        on: (a, t) => {
          let n = e[a]
          n || ((n = []), (e[a] = n)), n.push(t)
        },
        off: (a, t) => {
          const n = e[a]
          if (n) {
            const e = n.indexOf(t)
            e >= 0 && n.splice(e, 1)
          }
        },
        fire: (a, t) => {
          const n = e[a]
          n &&
            n.forEach((e) => {
              e(t, a)
            })
        },
      }
    }
    Fa({ GetImageData: cs }),
      xt((e) => {
        let a
        const t = []
        null != (a = e[O]) && ((xs = a), Us(), t.push(Us)),
          null != (a = e[hs]) && ((zs = a), t.push(Is), null == ds || ds.update(hs + ":" + zs, { checked: !0 })),
          (((a = e[gs]) && (js = a)) || ((a = e[ps]) && (Ss = a))) && t.push(Ms),
          pe in e && t.push(Cs),
          t.length && co((e) => t.forEach((a) => a(e)))
      }),
      Va.then(async () => {
        if (((xs = qt(O)), (zs = qt(hs)), (js = qt(gs)), (Ss = qt(ps)), co(Cs), xs || Us(), ds)) {
          const e = (e, a, t) => new M((n) => ds.create({ contexts: [K], id: e, title: a, ...t }, n)).then(pa),
            a = { parentId: hs, type: "radio" }
          await e(x, We("skipScripts"))
          for (
            let t = 0,
              n = [
                [hs, We("labelBadge")],
                [`${hs}:`, We("labelBadgeNone"), a],
                [`${hs}:unique`, We("labelBadgeUnique"), a],
                [`${hs}:total`, We("labelBadgeTotal"), a],
              ];
            t < n.length;
            t++
          ) {
            const a = n[t]
            await e(...a)
          }
          ds.update(hs + ":" + zs, { checked: !0 }), P && (await e(G, We("labelSettings")))
        }
      }),
      null == ds ||
        ds.onClicked.addListener(({ menuItemId: e }, a) => {
          _s(e, a)
        }),
      io.addListener((e) => delete ms[e]),
      oo.addListener(
        (e, { url: a }, t) => {
          if (a) {
            const [n] = Ds(a)
            n && Cs(t, $s(e, null), n)
          }
        },
        Bn && { properties: ["status"] }
      )
    const Ls = {
        update: Gi,
        list: async () => zi(),
        get: Ha.GetScriptCode,
        remove: (e) => Ha.MarkRemoved({ id: e, removed: !0 }),
      },
      Es = [],
      Os = [],
      Ps = {},
      Ns = Fe(lr, 36e5)
    let Hs,
      Ws = M.resolve()
    function Fs({ name: e, uri: a }) {
      return e || `vm@2-${a}`
    }
    function Bs(e) {
      return /^vm(?:@\d+)?-/.test(e)
    }
    function Vs(e) {
      const a = e.indexOf("-"),
        [, t] = e.slice(0, a).split("@")
      if ("2" === t) return e.slice(a + 1)
      try {
        return decodeURIComponent(e.slice(3))
      } catch (a) {
        return e.slice(3)
      }
    }
    function Gs() {
      function e(e, a) {
        const t = Ie(e)
        t.unshift("sync"), It(t, a)
      }
      return (
        (() => {
          let a = qt("sync")
          ;(a && a.services) || ((a = { services: {} }), e([], a))
        })(),
        {
          get: (e, a) => {
            var t
            const n = Ie(e)
            return n.unshift("sync"), null != (t = qt(n)) ? t : a
          },
          set: e,
        }
      )
    }
    function Ks(e) {
      function a(a) {
        const t = Ie(a)
        return t.unshift("services", e), t
      }
      return {
        get: (e, t) => Hs.get(a(e), t),
        set: (e, t) => {
          j(e)
            ? E(_e, e, ([e, t]) => {
                Hs.set(a(e), t)
              })
            : Hs.set(a(e), t)
        },
        clear: () => {
          Hs.set(a(), {})
        },
      }
    }
    function Js(e, a, t) {
      let n = a || e[0]
      function o() {
        return n
      }
      return {
        get: o,
        set: (a) => (e.includes(a) ? ((n = a), t && t()) : console.warn("Invalid state:", a), o()),
        is: (e) => na(e).includes(n),
      }
    }
    function Ys() {
      return Es.map((e) => {
        const a = Ps[e]
        return {
          name: a.name,
          displayName: a.displayName,
          authState: a.authState.get(),
          syncState: a.syncState.get(),
          lastSync: a.config.get("meta", {}).lastSync,
          progress: a.progress,
          properties: a.properties,
          userConfig: a.getUserConfig(),
        }
      })
    }
    function Xs(e, a, t) {
      let n
      return (
        2 === a
          ? (n = { version: a, custom: e.custom, config: e.config, props: Ue(e.props, ["lastUpdated"]) })
          : 1 === a &&
            (n = {
              version: a,
              more: {
                custom: e.custom,
                enabled: e.config.enabled,
                update: e.config.shouldUpdate,
                lastUpdated: e.props.lastUpdated,
              },
            }),
        I.assign(n, t)
      )
    }
    function Zs(e) {
      const a = {}
      try {
        const t = JSON.parse(e)
        ;(a.code = t.code),
          2 === t.version
            ? ((a.config = t.config), (a.custom = t.custom), (a.props = t.props))
            : 1 === t.version &&
              t.more &&
              ((a.custom = t.more.custom),
              (a.config = Qs({ enabled: t.more.enabled, shouldUpdate: t.more.update })),
              (a.props = Qs({ lastUpdated: t.more.lastUpdated })))
      } catch (t) {
        a.code = e
      }
      return a
    }
    function Qs(e) {
      return (
        Array.isArray(e)
          ? e.forEach(Qs)
          : j(e) &&
            E(_e, e, ([a, t]) => {
              void 0 === t ? delete e[a] : Qs(t)
            }),
        e
      )
    }
    function er(e) {
      const a = function () {
        this.initialize()
      }
      return (a.prototype = e), (a.extend = ar), a
    }
    function ar(e) {
      return er(I.assign(I.create(this.prototype), e))
    }
    const tr = Fe(() => {
        xa("UpdateSync", Ys())
      }),
      nr = er({
        name: "base",
        displayName: "BaseService",
        delayTime: 1e3,
        urlPrefix: "",
        metaFile: t,
        properties: { authType: "oauth" },
        getUserConfig: Be,
        setUserConfig: Be,
        initialize() {
          ;(this.progress = { finished: 0, total: 0 }),
            (this.config = Ks(this.name)),
            (this.authState = Js(
              ["idle", "no-auth", "initializing", "authorizing", "authorized", "unauthorized", "error"],
              null,
              tr
            )),
            (this.syncState = Js(["idle", "ready", "syncing", "error"], null, tr)),
            (this.lastFetch = M.resolve()),
            (this.startSync = this.syncFactory())
          const e = As()
          ;["on", "off", "fire"].forEach((a) => {
            this[a] = (...t) => {
              e[a](...t)
            }
          })
        },
        log(...e) {
          console.log(...e)
        },
        syncFactory() {
          let e, a
          const t = () => this.authState.is("authorized") && ir() === this.name,
            n = () => {
              if (!t()) return M.resolve()
              this.log("Ready to sync:", this.displayName),
                this.syncState.set("ready"),
                (Ws = Ws.then(
                  () =>
                    new M((e) => {
                      ;(a = Fe(e, 1e4)), a()
                    })
                )
                  .then(() => {
                    if (t()) return this.sync()
                    this.syncState.set("idle")
                  })
                  .catch((e) => {
                    console.error(e)
                  })
                  .then(() => {
                    ;(e = null), (a = null)
                  })),
                (e = Ws)
            }
          return () => (e || n(), a && a(), e)
        },
        prepareHeaders() {
          this.headers = {}
        },
        prepare(e) {
          return (
            this.authState.set("initializing"),
            M.resolve(e)
              .then(() => (this.initToken() ? this.user() : M.reject({ type: "no-auth" })))
              .then(
                () => {
                  this.authState.set("authorized")
                },
                (e) => {
                  throw (
                    (["no-auth", "unauthorized"].includes(null == e ? void 0 : e.type)
                      ? this.authState.set(e.type)
                      : (console.error(e), this.authState.set("error")),
                    this.syncState.set("idle"),
                    e)
                  )
                }
              )
          )
        },
        checkSync(e) {
          return this.prepare(e).then(() => this.startSync())
        },
        user: Be,
        acquireLock: Be,
        releaseLock: Be,
        handleMetaError(e) {
          throw e
        },
        getMeta() {
          return this.get({ name: this.metaFile })
            .then((e) => JSON.parse(e))
            .catch((e) => this.handleMetaError(e))
            .then((e) => ({ name: this.metaFile, data: e }))
        },
        initToken() {
          this.prepareHeaders()
          const e = this.config.get("token")
          return (this.headers.Authorization = e ? `Bearer ${e}` : null), !!e
        },
        loadData(e) {
          const { progress: a } = this,
            { delay: t = this.delayTime } = e
          let n = M.resolve()
          return (
            t &&
              ((n = this.lastFetch.then((e) => Aa(t - (Date.now() - e))).then(() => Date.now())), (this.lastFetch = n)),
            (a.total += 1),
            tr(),
            n
              .then(() => {
                var a
                ;(e = I.assign({}, e)).headers = I.assign({}, this.headers, e.headers)
                let { url: t } = e
                return t.startsWith("/") && (t = (null != (a = e.prefix) ? a : this.urlPrefix) + t), ma(t, e)
              })
              .then(
                ({ data: e }) => ({ data: e }),
                (e) => ({ error: e })
              )
              .then(({ data: e, error: t }) => ((a.finished += 1), tr(), t ? M.reject(t) : e))
          )
        },
        getLocalData: () => Ls.list(),
        getSyncData() {
          return this.getMeta().then((e) => M.all([e, this.list(), this.getLocalData()]))
        },
        sync() {
          return (
            (this.progress = { finished: 0, total: 0 }),
            this.syncState.set("syncing"),
            this.prepare()
              .then(() => this.getSyncData())
              .then((e) => M.resolve(this.acquireLock()).then(() => e))
              .then(([e, a, t]) => {
                const n = e.data || {},
                  o = n.info || {},
                  i = n.timestamp || 0
                let s = !i || I.keys(o).length !== a.length
                const r = Date.now(),
                  l = qt("lastModified"),
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
                ;(n.info = a.reduce((e, a) => {
                  c[a.uri] = a
                  let t = o[a.uri]
                  return t || ((t = {}), (s = !0)), (e[a.uri] = t), t.modified || ((t.modified = r), (s = !0)), e
                }, {})),
                  t.forEach((e) => {
                    const {
                        props: { uri: a, position: t, lastModified: o },
                      } = e,
                      r = n.info[a],
                      u = c[a]
                    r && u
                      ? (d || !o || r.modified > o
                          ? h.push({ local: e, remote: u, info: r })
                          : (r.modified < o && (g.push({ local: e, remote: u }), (r.modified = o), (s = !0)),
                            r.position !== t &&
                              (r.position && l <= i
                                ? k.push({ local: e, remote: u, info: r })
                                : ((r.position = t), (s = !0)))),
                        delete c[a])
                      : d || !m || o > i
                        ? g.push({ local: e })
                        : f.push({ local: e })
                  }),
                  E(_e, c, ([e, a]) => {
                    const t = n.info[e]
                    m ? h.push({ remote: a, info: t }) : p.push({ remote: a })
                  })
                const b = [
                  ...h.map(
                    ({ remote: e, info: a }) => (
                      this.log("Download script:", e.uri),
                      this.get(e).then((e) => {
                        const t = Zs(e)
                        if (!t.code) return
                        a.modified && Ce(t, "props.lastModified", a.modified)
                        const n = +a.position
                        return (
                          n && (t.position = n),
                          !qt("syncScriptStatus") && t.config && delete t.config.enabled,
                          Ls.update(t)
                        )
                      })
                    )
                  ),
                  ...g.map(
                    ({ local: e, remote: a }) => (
                      this.log("Upload script:", e.props.uri),
                      Ls.get(e.props.id).then((t) => {
                        const o = Xs(e, 1, { code: t })
                        return (
                          (n.info[e.props.uri] = { modified: e.props.lastModified, position: e.props.position }),
                          (s = !0),
                          this.put(I.assign({}, a, { uri: e.props.uri, name: null }), JSON.stringify(o))
                        )
                      })
                    )
                  ),
                  ...p.map(
                    ({ remote: e }) => (
                      this.log("Remove remote script:", e.uri), delete n.info[e.uri], (s = !0), this.remove(e)
                    )
                  ),
                  ...f.map(({ local: e }) => (this.log("Remove local script:", e.props.uri), Ls.remove(e.props.id))),
                  ...k.map(({ local: e, info: a }) => {
                    const t = {}
                    return a.position && (t.props = { position: a.position }), Bi(e.props.id, t)
                  }),
                ]
                return (
                  b.push(
                    M.all(b)
                      .then(() => yi())
                      .then((e) => {
                        if (e)
                          return (
                            (s = !0),
                            Ls.list().then((e) => {
                              e.forEach((e) => {
                                const a = n.info[e.props.uri]
                                a && (a.position = e.props.position)
                              })
                            })
                          )
                      })
                  ),
                  b.push(
                    M.all(b).then(() => {
                      const a = []
                      return (
                        s && ((n.timestamp = Date.now()), a.push(this.put(e, JSON.stringify(n)))),
                        (u.timestamp = n.timestamp),
                        (u.lastSync = Date.now()),
                        this.config.set("meta", u),
                        M.all(a)
                      )
                    })
                  ),
                  M.all(b.map((e) => e.then(Be, (e) => e || !0)))
                    .then((e) => e.filter($))
                    .then((e) => {
                      if (e.length) throw e
                    })
                )
              })
              .then(
                () => {
                  this.syncState.set("idle"), this.log("Sync finished:", this.displayName)
                },
                (e) => {
                  this.syncState.set("error"), this.log("Failed syncing:", this.displayName), this.log(e)
                }
              )
              .then(() => M.resolve(this.releaseLock()).catch(Be))
          )
        },
      })
    function or(e) {
      Os.push(e)
    }
    function ir() {
      return Hs.get("current")
    }
    function sr(e) {
      return Ps[e || ir()]
    }
    function rr(e) {
      if (!e.syncState.is(["ready", "syncing"]))
        return e.authState.is(["idle", "error"]) ? e.checkSync() : e.authState.is("authorized") ? e.startSync() : void 0
    }
    function lr() {
      const e = sr()
      return e && M.resolve(rr(e)).then(Ns)
    }
    let cr
    async function ur(e, a) {
      null == cr || cr()
      const t = (await browser.tabs.create({ url: e })).id,
        n = (e) => {
          var a, n
          if (null != (a = (n = sr()).checkAuth) && a.call(n, e.url))
            return browser.tabs.remove(t), setTimeout(cr, 0), { cancel: !0 }
        }
      ;(cr = () => {
        browser.webRequest.onBeforeRequest.removeListener(n)
      }),
        (a = a.replace(/:\d+/, "")),
        browser.webRequest.onBeforeRequest.addListener(
          n,
          { urls: [`${a}*`], types: ["main_frame", "xmlhttprequest"] },
          ["blocking"]
        )
    }
    const dr = { "+": "-", "/": "_" }
    async function mr(e) {
      const a = new TextEncoder().encode(e),
        t = await crypto.subtle.digest("SHA-256", a)
      return btoa(Ke(t)).replace(/[+/=]/g, (e) => dr[e] || "")
    }
    function hr() {
      return Ve(43, 128)
    }
    async function gr(e) {
      return { code_challenge: await mr(e), code_challenge_method: "S256" }
    }
    const pr = { client_id: "f0q12zup2uys5w8", redirect_uri: Se + "auth_dropbox.html" },
      fr = /[\u007f-\uffff]/g,
      kr = (e) => `\\u${(e.charCodeAt(0) + 65536).toString(16).slice(1)}`
    function br(e) {
      return JSON.stringify(e).replace(fr, kr)
    }
    function yr(e) {
      return { name: e.name, size: e.size, uri: Vs(e.name) }
    }
    or(
      nr.extend({
        name: "dropbox",
        displayName: "Dropbox",
        refreshToken() {
          const e = this.config.get("refresh_token")
          return this.authorized({ grant_type: "refresh_token", refresh_token: e }).then(() => this.prepare())
        },
        user() {
          const e = () =>
            this.loadData({ method: "POST", url: "https://api.dropboxapi.com/2/users/get_current_account" })
          return e()
            .catch((a) => {
              if (401 === a.status) return this.refreshToken().then(e)
              throw a
            })
            .catch((e) =>
              401 === e.status ? M.reject({ type: "unauthorized" }) : M.reject({ type: "error", data: e })
            )
        },
        handleMetaError(e) {
          if (409 !== e.status) throw e
        },
        list() {
          return this.loadData({
            method: "POST",
            url: "https://api.dropboxapi.com/2/files/list_folder",
            body: { path: "" },
            responseType: "json",
          }).then((e) => e.entries.filter((e) => "file" === e[".tag"] && Bs(e.name)).map(yr))
        },
        get(e) {
          const a = Fs(e)
          return this.loadData({
            method: "POST",
            url: "https://content.dropboxapi.com/2/files/download",
            headers: { "Dropbox-API-Arg": br({ path: `/${a}` }) },
          })
        },
        put(e, a) {
          const t = Fs(e)
          return this.loadData({
            method: "POST",
            url: "https://content.dropboxapi.com/2/files/upload",
            headers: {
              "Dropbox-API-Arg": br({ path: `/${t}`, mode: "overwrite" }),
              "Content-Type": "application/octet-stream",
            },
            body: a,
            responseType: "json",
          }).then(yr)
        },
        remove(e) {
          const a = Fs(e)
          return this.loadData({
            method: "POST",
            url: "https://api.dropboxapi.com/2/files/delete",
            body: { path: `/${a}` },
            responseType: "json",
          }).then(yr)
        },
        async authorize() {
          ;(this.session = { state: Ge(), codeVerifier: hr() }),
            ur(
              `https://www.dropbox.com/oauth2/authorize?${Na({ response_type: "code", token_access_type: "offline", client_id: pr.client_id, redirect_uri: pr.redirect_uri, state: this.session.state, ...(await gr(this.session.codeVerifier)) })}`,
              pr.redirect_uri
            )
        },
        async authorized(e) {
          delete this.headers.Authorization, this.authState.set("authorizing")
          const a = await this.loadData({
            method: "POST",
            url: "https://api.dropbox.com/oauth2/token",
            headers: { "Content-Type": ie },
            body: Na({ client_id: pr.client_id, ...e }),
            responseType: "json",
          })
          if (!a.access_token) throw a
          this.config.set({
            uid: a.account_id,
            token: a.access_token,
            refresh_token: a.refresh_token || e.refresh_token,
          })
        },
        checkAuth(e) {
          const a = `${pr.redirect_uri}?`
          if (!e.startsWith(a)) return
          const t = Pa(e.slice(a.length)),
            { state: n, codeVerifier: o } = this.session || {}
          return (
            (this.session = null),
            t.state === n && t.code
              ? (this.checkSync(
                  this.authorized({
                    code: t.code,
                    code_verifier: o,
                    grant_type: "authorization_code",
                    redirect_uri: pr.redirect_uri,
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
    const vr = {
      client_id: "000000004418358A",
      client_secret: "j9x3OVEtHvhiHKDWOGquyMfZKk96040H",
      redirect_uri: Se + "auth_onedrive.html",
    }
    function wr(e) {
      return { name: e.name, size: e.size, uri: Vs(e.name) }
    }
    or(
      nr.extend({
        name: "onedrive",
        displayName: "OneDrive",
        urlPrefix: "https://api.onedrive.com/v1.0",
        refreshToken() {
          const e = this.config.get("refresh_token")
          return this.authorized({ refresh_token: e, grant_type: "refresh_token" }).then(() => this.prepare())
        },
        user() {
          const e = () => this.loadData({ url: "/drive", responseType: "json" })
          return e()
            .catch((a) => {
              if (401 === a.status) return this.refreshToken().then(e)
              throw a
            })
            .catch((e) =>
              400 === e.status && "invalid_grant" === Me(e, "data.error")
                ? M.reject({ type: "unauthorized" })
                : M.reject({ type: "error", data: e })
            )
        },
        handleMetaError(e) {
          if (404 === e.status) {
            var a
            const t = (null == (a = e.headers.get("WWW-Authenticate")) ? void 0 : a[0]) || ""
            return /^Bearer realm="OneDriveAPI"/.test(t) ? this.refreshToken().then(() => this.getMeta()) : void 0
          }
          throw e
        },
        list() {
          return this.loadData({ url: "/drive/special/approot/children", responseType: "json" }).then((e) =>
            e.value.filter((e) => e.file && Bs(e.name)).map(wr)
          )
        },
        get(e) {
          const a = Fs(e)
          return this.loadData({ url: `/drive/special/approot:/${encodeURIComponent(a)}`, responseType: "json" }).then(
            (e) => this.loadData({ url: e["@content.downloadUrl"], delay: !1 })
          )
        },
        put(e, a) {
          const t = Fs(e)
          return this.loadData({
            method: "PUT",
            url: `/drive/special/approot:/${encodeURIComponent(t)}:/content`,
            headers: { "Content-Type": "application/octet-stream" },
            body: a,
            responseType: "json",
          }).then(wr)
        },
        remove(e) {
          const a = Fs(e)
          return this.loadData({ method: "DELETE", url: `/drive/special/approot:/${encodeURIComponent(a)}` }).catch(Be)
        },
        authorize() {
          ur(
            `https://login.live.com/oauth20_authorize.srf?${Na({ client_id: vr.client_id, scope: "onedrive.appfolder wl.offline_access", response_type: "code", redirect_uri: vr.redirect_uri })}`,
            vr.redirect_uri
          )
        },
        checkAuth(e) {
          const a = `${vr.redirect_uri}?code=`
          if (e.startsWith(a))
            return this.authState.set("authorizing"), this.checkSync(this.authorized({ code: e.slice(a.length) })), !0
        },
        revoke() {
          return this.config.set({ uid: null, token: null, refresh_token: null }), this.prepare()
        },
        authorized(e) {
          return this.loadData({
            method: "POST",
            url: "https://login.live.com/oauth20_token.srf",
            prefix: "",
            headers: { "Content-Type": ie },
            body: Na(
              I.assign(
                {},
                {
                  client_id: vr.client_id,
                  client_secret: vr.client_secret,
                  redirect_uri: vr.redirect_uri,
                  grant_type: "authorization_code",
                },
                e
              )
            ),
            responseType: "json",
          }).then((e) => {
            if (!e.access_token) throw e
            this.config.set({ uid: e.user_id, token: e.access_token, refresh_token: e.refresh_token })
          })
        },
      })
    )
    const xr = "590447512361-fa9j9vrskafqi75q2p2o2mkirdo9lavo.ap"+"ps.googleus"+"ercontent.com"/* apps.googleusercontent.com */,
      zr = "http://127.0.0.1:45678/",
      jr = "https://www.googleapis.com/auth/drive.appdata",
      Sr = { status: "UNAUTHORIZED" }
    function $r(e) {
      return { id: e.id, name: e.name, size: +e.size, uri: Vs(e.name) }
    }
    or(
      nr.extend({
        name: "googledrive",
        displayName: "Google Drive",
        urlPrefix: "https://www.googleapis.com/drive/v3",
        refreshToken() {
          const e = this.config.get("refresh_token")
          return e
            ? this.authorized({ refresh_token: e, grant_type: "refresh_token" }).then(() => this.prepare())
            : M.reject({ type: "unauthorized" })
        },
        user() {
          const e = () =>
            this.loadData({
              url: `https://www.googleapis.com/oauth2/v3/tokeninfo?${Na({ access_token: this.config.get("token") })}`,
              responseType: "json",
            })
          return e()
            .then((e) => {
              if (e.scope !== jr) return M.reject(Sr)
            })
            .catch((a) =>
              a === Sr || (400 === a.status && "Invalid Value" === Me(a, "data.error_description"))
                ? this.refreshToken().then(e)
                : M.reject({ type: "error", data: a })
            )
        },
        getSyncData() {
          return this.loadData({
            url: `/files?${Na({ spaces: "appDataFolder", fields: "files(id,name,size)" })}`,
            responseType: "json",
          }).then(({ files: e }) => {
            let a
            const t = e
                .filter((e) => !!Bs(e.name) || (a || e.name !== this.metaFile ? this.remove(e) : (a = e), !1))
                .map($r)
                .filter((e) => !!e.size || (this.remove(e), !1)),
              n = a ? $r(a) : {},
              o = this.get(n)
                .then((e) => JSON.parse(e))
                .catch((e) => this.handleMetaError(e))
                .then((e) => I.assign({}, n, { name: this.metaFile, uri: null, data: e }))
            return M.all([o, t, this.getLocalData()])
          })
        },
        async authorize() {
          this.session = { state: Ge(), codeVerifier: hr() }
          const e = {
            response_type: "code",
            client_id: xr,
            redirect_uri: zr,
            scope: jr,
            state: this.session.state,
            ...(await gr(this.session.codeVerifier)),
          }
          this.config.get("refresh_token") || (e.prompt = "consent"),
            ur(`https://accounts.google.com/o/oauth2/v2/auth?${Na(e)}`, zr)
        },
        checkAuth(e) {
          const a = `${zr}?`
          if (!e.startsWith(a)) return
          const t = Pa(e.slice(a.length)),
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
                    redirect_uri: zr,
                  })
                ),
                !0)
              : void 0
          )
        },
        revoke() {
          return this.config.set({ token: null, refresh_token: null }), this.prepare()
        },
        authorized(e) {
          return this.loadData({
            method: "POST",
            url: "https://www.googleapis.com/oauth2/v4/token",
            prefix: "",
            headers: { "Content-Type": ie },
            body: Na(I.assign({}, { client_id: xr, client_secret: "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" }, e)),
            responseType: "json",
          }).then((e) => {
            if (!e.access_token) throw e
            {
              const a = { token: e.access_token }
              e.refresh_token && (a.refresh_token = e.refresh_token), this.config.set(a)
            }
          })
        },
        handleMetaError: Be,
        list() {
          throw new q("Not supported")
        },
        get({ id: e }) {
          return e ? this.loadData({ url: `/files/${e}?alt=media` }) : M.reject()
        },
        put(e, a) {
          const t = Fs(e),
            { id: n } = e,
            o = Ge("violentmonkey-is-great-"),
            i = { "Content-Type": `multipart/related; boundary=${o}` },
            s = n ? { name: t } : { name: t, parents: ["appDataFolder"] },
            r = [
              `--${o}`,
              "Content-Type: application/json; " + oe,
              "",
              JSON.stringify(s),
              `--${o}`,
              "Content-Type: text/plain",
              "",
              a,
              `--${o}--`,
              "",
            ].join("\r\n"),
            l = n
              ? `https://www.googleapis.com/upload/drive/v3/files/${n}?uploadType=multipart`
              : "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
          return this.loadData({ url: l, body: r, headers: i, method: n ? "PATCH" : "POST" })
        },
        remove({ id: e }) {
          return this.loadData({ method: "DELETE", url: `/files/${e}` })
        },
      })
    )
    const qr = Symbol("children")
    class Ir {
      constructor(e, a) {
        ;(this.node = e), (this.nsMap = { ...a }), this.parseAttrs(), this.parseName()
      }
      static fromXML(e) {
        const a = new DOMParser().parseFromString(e, "application/xml")
        return new Ir(a)
      }
      parseAttrs() {
        const { node: e, nsMap: a } = this,
          t = {},
          { attributes: n } = e
        if (n)
          for (let n = 0, o = e.attributes; n < o.length; n++) {
            const e = o[n],
              { name: i, value: s } = e
            "xmlns" === i ? (a.$ = s) : i.startsWith("xmlns:") && (a[i.slice(6)] = s), (t[i] = s)
          }
        this.attrs = t
      }
      parseName() {
        const { node: e, nsMap: a } = this
        if (1 === e.nodeType) {
          let t = e.tagName,
            n = a.$
          if (t.includes(":")) {
            let e
            if ((([e, t] = t.split(":")), (n = a[e]), !n)) throw new q(`Unknown namespace: ${e}`)
          }
          this.name = n + t
        }
      }
      text() {
        const { node: e } = this
        if (e) return (e.textContent || "").trim()
      }
      children() {
        if (!this[qr]) {
          const { node: e, nsMap: a } = this
          this[qr] = [...e.children].map((e) => new Ir(e, a))
        }
        return this[qr]
      }
      map(e) {
        return this.children().map(e)
      }
      getCallback(e) {
        return "string" == typeof e ? ((a = e), (e) => e.name === a) : e
        var a
      }
      filter(e) {
        return this.children().filter(this.getCallback(e))
      }
      find(e) {
        return this.children().find(this.getCallback(e))
      }
      attr(e) {
        return this.attrs[e]
      }
    }
    const Mr = { serverUrl: "", anonymous: !1, username: "", password: "" },
      Cr = nr.extend({
        name: "webdav",
        displayName: "WebDAV",
        properties: { authType: "password", serverUrl: null },
        getUserConfig() {
          return this.userConfig || (this.userConfig = { ...Mr, ...this.config.get("userConfig") }), this.userConfig
        },
        setUserConfig(e) {
          I.assign(this.userConfig, e), this.config.set("userConfig", this.userConfig)
        },
        initToken() {
          var e
          this.prepareHeaders()
          const n = this.getUserConfig()
          let o = (null == (e = n.serverUrl) ? void 0 : e.trim()) || ""
          if ((o.includes("://") || (o = `http://${o}`), o.endsWith("/") || (o += "/"), !da(o)))
            return (this.properties.serverUrl = null), !1
          this.properties.serverUrl = `${o}${t}/`
          const { anonymous: i, username: s, password: r } = n
          if (i) return !0
          if (!s || !r) return !1
          const l = a.btoa(`${s}:${r}`)
          return (this.headers.Authorization = `Basic ${l}`), !0
        },
        loadData(e) {
          return nr.prototype.loadData.call(this, I.assign({ credentials: "omit" }, e))
        },
        handleMetaError(e) {
          if (![404, 409].includes(e.status)) throw e
        },
        list() {
          const { serverUrl: e } = this.properties,
            a = () => this.loadData({ method: "MKCOL", url: e }),
            t = () =>
              this.loadData({ method: "PROPFIND", url: e, headers: { depth: "1" } }).then((e) =>
                Ir.fromXML(e)
                  .children()[0]
                  .map((e) => {
                    const a = e.find("DAV:propstat").find("DAV:prop")
                    if ("file" == (a.find("DAV:resourcetype").find("DAV:collection") ? "directory" : "file")) {
                      let n
                      const o = a.find("DAV:displayname")
                      if (void 0 !== o) n = o.text()
                      else {
                        const a = e.find("DAV:href").text()
                        n = decodeURIComponent(a.substring(a.lastIndexOf("/") + 1))
                      }
                      if (Bs(n)) {
                        const e = a.find("DAV:getcontentlength")
                        return { name: (t = { name: n, size: e ? +e.text() : 0 }).name, size: t.size, uri: Vs(t.name) }
                      }
                    }
                    var t
                    return null
                  })
                  .filter($)
              )
          return t().catch((e) => {
            if (404 === e.status) return a().then(t)
            throw e
          })
        },
        get(e) {
          const a = Fs(e),
            { serverUrl: t } = this.properties
          return this.loadData({ url: t + a })
        },
        put(e, a) {
          const t = Fs(e),
            n = { "Content-Type": "text/plain" },
            o = this.config.get("lock")
          o && (n.If = `(<${o}>)`)
          const { serverUrl: i } = this.properties
          return this.loadData({ method: "PUT", url: i + t, body: a, headers: n })
        },
        remove(e) {
          const a = Fs(e),
            t = {},
            n = this.config.get("lock")
          n && (t.If = `(<${n}>)`)
          const { serverUrl: o } = this.properties
          return this.loadData({ method: "DELETE", url: o + a, headers: t })
        },
      })
    or(Cr)
    const Ur = new RegExp(`^(?:${[rt, tt].join("|")})`)
    let Dr
    function _r({ keys: e }) {
      for (let a = 0; a < e.length; a++) {
        const t = e[a]
        if (Ur.test(t)) {
          lr()
          break
        }
      }
    }
    $t((e, a) => {
      ;("sync.current" in e || a) &&
        (Hs ||
          ((Hs = Gs()),
          Os.forEach((e) => {
            const a = new e(),
              { name: t } = a
            Es.push(t), (Ps[t] = a)
          })),
        lr() ? Dr || (Dr = Jo(_r)) : Dr && (Dr(), (Dr = null)))
    }),
      Fa({
        SyncAuthorize: () => {
          const e = sr()
          e && e.authorize()
        },
        SyncGetStates: Ys,
        SyncRevoke: () => {
          const e = sr()
          e && e.revoke()
        },
        SyncSetConfig: (e) => {
          const a = sr()
          if (a) return a.setUserConfig(e), a.checkSync()
        },
        SyncStart: lr,
      })
    const Tr = document.createElement("textarea")
    let Rr
    Wa({
      SetClipboard(e) {
        ;(Rr = e), Tr.focus(), document.execCommand("copy", !1, null)
      },
    }),
      document.body.appendChild(Tr),
      C("copy", (e) => {
        e.preventDefault()
        const { type: a, data: t } = Rr
        e.clipboardData.setData(a || "text/plain", t)
      })
    const Ar = {},
      Lr = "zombie",
      Er = "zombieTimeout",
      Or = "zombieUrl"
    function Pr(e, a) {
      const t = Ar[e]
      t &&
        (z(t)
          ? a && t()
          : t > 0
            ? a && Hr(t)
            : t[Lr]
              ? a && (Ha.TabOpen({ url: t[Or] }, t), Wr(e))
              : za(t.tab.id, a ? "NotificationClick" : "NotificationClose", e, { [Y]: t[Y] }))
    }
    function Nr(e, a, t) {
      for (const n in Ar) {
        const o = Ar[n]
        !j(o) ||
          o.tab.id !== e ||
          (a && o[Y] !== a) ||
          o[Lr] ||
          (o[Er] ? ((o[Lr] = setTimeout(Wr, o[Er], n)), o[Or] || (Ar[n] = o[Lr]), t && (o._removed = !0)) : Wr(n))
      }
    }
    function Hr(e) {
      e > 0 && clearTimeout(e)
    }
    function Wr(e) {
      return delete Ar[e], browser.notifications.clear(e)
    }
    Wa({
      async Notification({ image: e, text: a, tag: t, title: n, silent: o, onclick: i, [Or]: s, [Er]: r }, l) {
        t && Hr(Ar[t])
        const c = await browser.notifications.create(t, {
          type: "basic",
          title: E(La, [n, P && We("extName")], " - "),
          message: a,
          iconUrl: e || ka,
          ...(!P && { requireInteraction: !!i }),
          ...(Fn >= 70 && { silent: o }),
        })
        return z(i) ? (Ar[c] = i) : l && ((Ar[c] = l), +r > 0 && (l[Er] = +r), null != s && (l[Or] = Jn(s, l.url))), c
      },
      RemoveNotification(e) {
        Hr(Ar[e]), Wr(e)
      },
    }),
      browser.notifications.onClicked.addListener((e) => {
        Pr(e, !0)
      }),
      browser.notifications.onClosed.addListener((e) => {
        Pr(e, !1), delete Ar[e]
      })
    let Fr,
      Br = M.resolve()
    function Vr(e, a, t) {
      if (!t) return void (Br = Br.then(() => (Vr(e, a, !0), Aa(150))))
      const n = j(e) ? URL.createObjectURL(e) : e,
        o = document.createElement("a")
      ;(o.href = n), (o.download = a || ""), o.click(), j(e) && Aa(3e3).then(() => URL.revokeObjectURL(n))
    }
    Wa({
      DownloadBlob(e) {
        Vr(...e)
      },
    })
    const Gr = Ge("VM-Verify"),
      Kr = { __proto__: null },
      Jr = { __proto__: null },
      Yr =
        /^(proxy-|sec-)|^(accept-(charset|encoding)|access-control-request-(headers|method)|connection|content-length|cookie2?|date|dnt|expect|host|keep-alive|origin|referer|te|trailer|transfer-encoding|upgrade|via)$/i,
      Xr = { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
      Zr = [browser.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS].filter($),
      Qr = {},
      el = (e) => e.name === Gr,
      al = "cookie",
      tl = "set-cookie",
      nl = /^\s*(?:__(Secure|Host)-)?([^=\s]+)\s*=\s*(")?([!#-+\--:<-[\]-~]*)\3(.*)/,
      ol = /\s*;?\s*(\w+)(?:=(")?([!#-+\--:<-[\]-~]*)\2)?/y,
      il = { strict: "strict", lax: "lax", none: "no_restriction" },
      sl = "requestHeaders",
      rl = {
        onBeforeSendHeaders: [
          ({ [sl]: e, requestId: a, url: t }) => {
            var n
            const o = Jr[a] || (null == (n = e.find(el)) ? void 0 : n.value),
              i = Kr[o]
            if (i) {
              ;(Jr[a] = o), (i.coreId = a), (i.url = t)
              const n = {},
                s = Qr[o],
                r = s && {}
              let l,
                c = !s
              for (let a = 0; a < e.length; a++) {
                const t = e[a]
                ;(l = t.name) === Gr ||
                  ("origin" === (l = l.toLowerCase()) && t.value === W) ||
                  (l === al && !i[al]) ||
                  (!c && l === al && (c = s[l]) ? (r[l] = { name: l, value: t.value + "; " + c.value }) : (n[l] = t))
              }
              return { [sl]: I.values(I.assign(n, s, r)) }
            }
          },
          sl,
          "blocking",
          ...Zr,
        ],
        onHeadersReceived: [
          ({ [f]: e, requestId: a, url: t }) => {
            const n = Kr[Jr[a]]
            if (n) {
              n[f] = e.map(cl).join("")
              const { storeId: a } = n
              if (!n[tl] || a)
                return (
                  (e = e.filter((e) => {
                    if (e.name.toLowerCase() !== tl) return !0
                    a && ul(e.value, a, t)
                  })),
                  { [f]: e }
                )
            }
          },
          f,
          "blocking",
          ...Zr,
        ],
      }
    function ll(e, a) {
      a
        ? (ta(Qr) &&
            E(_e, rl, ([e, [a, ...t]]) => {
              browser.webRequest[e].addListener(a, Xr, t)
            }),
          (Qr[e] = a))
        : e in Qr &&
          (delete Qr[e],
          ta(Qr) &&
            E(_e, rl, ([e, [a]]) => {
              browser.webRequest[e].removeListener(a)
            }))
    }
    function cl({ name: e, value: a, binaryValue: t }) {
      return `${dl(e)}: ${t ? Ke(t) : dl(a)}\r\n`
    }
    function ul(e, a, t) {
      let n = nl.exec(e)
      if (n) {
        var o
        const [, e, i, , s, r] = n,
          l = {},
          c = "Host" === e
        for (ol.lastIndex = 0; (n = ol.exec(r)); ) l[n[1].toLowerCase()] = n[3]
        const u = null == (o = l.sameSite) ? void 0 : o.toLowerCase()
        browser.cookies.set({
          url: t,
          name: i,
          value: s,
          domain: c ? void 0 : l.domain,
          expirationDate: Math.max(0, +new Date(1e3 * l["max-age"] || l.expires)) || void 0,
          httpOnly: "httponly" in l,
          path: c ? "/" : l.path,
          sameSite: il[u],
          secure: t.startsWith("https:") && (!!e || "none" === u || "secure" in l),
          storeId: a,
        })
      }
    }
    function dl(e) {
      return /[\u0080-\uFFFF]/.test(e) ? (Fr || (Fr = new TextEncoder()), Ke(Fr.encode(e))) : e
    }
    Fn >= 74 && Fn <= 91 && browser.webRequest.onBeforeSendHeaders.addListener(Be, Xr, Zr),
      Wa({
        HttpRequest(e, a) {
          const t = a.tab.id,
            n = ao(a),
            { id: o, events: i } = e,
            s = (Kr[o] = { id: o, tabId: t, [Y]: n, frame: to(n), xhr: new XMLHttpRequest() }),
            r = (e) => Kr[o] && za(t, "HttpRequested", e, s.frame)
          return Sl(e, i, a, r).catch(
            i.includes("error") && ((e) => r({ id: o, error: e.message || e, data: null, type: "error" }))
          )
        },
        AbortRequest(e) {
          const a = Kr[e]
          a && (a.xhr.abort(), $l(a))
        },
        RevokeBlob(e) {
          const a = Dt.pop(`xhrBlob:${e}`)
          a && (clearTimeout(a), URL.revokeObjectURL(e))
        },
      })
    const ml = 1e6,
      hl = P ? 256e6 : 1e7,
      gl = 6e4,
      pl = ["readyState", "status", "statusText"],
      fl = ["lengthComputable", "loaded", "total"],
      kl = (e) => `"${e.replace(/[\\"]/g, "\\$&")}"`,
      bl = "sec-ch-ua",
      yl = {
        __proto__: null,
        "user-agent": (e) => e,
        [bl]: (e) => e.map((e) => `${kl(e.brand)};v="${e.version}"`).join(", "),
        [bl + "-mobile"]: (e) => "?" + (e ? 1 : 0),
        [bl + "-platform"]: kl,
      },
      vl = I.keys(yl)
    function wl(e, a, t) {
      return Je(e, a * t, t)
    }
    function xl(e) {
      const a = URL.createObjectURL(e)
      return Dt.put(`xhrBlob:${a}`, setTimeout(URL.revokeObjectURL, gl, a), gl), a
    }
    function zl(e, a, t) {
      return e.substr(a * t, t)
    }
    function jl(e, a, t, n, o) {
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
      const { id: v, xhr: w } = e,
        x = [],
        z = async () => {
          const h = x.shift(),
            { type: z } = h,
            j = a.includes(z),
            $ = "loadend" === z,
            q = 4 === w.readyState || (d = !1)
          if (!j && !$) return
          if (q && "readystatechange" === z) {
            if (d) return
            d = !0
          }
          i || (i = w.getResponseHeader("Content-Type") || ""),
            k !== w[p] &&
              ((k = c = w[p]),
              (b = !1),
              c &&
                ((m = c.length - y)
                  ? ((n = m > hl), (r = hl), (s = m), (l = zl), (c = y ? c.slice(y) : c), (y += s))
                  : ((r = ml), (s = c.size), (l = t ? xl : wl)),
                (g = n ? Math.ceil(s / r) || 1 : t ? 1 : 0))),
            c && $ && e[S] && Vr(c, e[S])
          const I = j && (!o || q) && !b
          if (I) {
            b = !0
            for (let a = 1; a < g; a += 1) await e.cb({ id: v, i: a, chunk: a * r, data: await l(c, a, r), size: s })
          }
          await e.cb({
            blobbed: t,
            chunked: n,
            contentType: i,
            id: v,
            type: z,
            data: j
              ? {
                  finalUrl: e.url || w.responseURL,
                  ...Ue(w, pl),
                  ...Ue(h, fl),
                  [p]: I ? (g ? await l(c, 0, r) : c) : null,
                  [f]: u !== (m = e[f] || w.getAllResponseHeaders()) ? (u = m) : null,
                }
              : null,
          }),
            $ && $l(e)
        }
      return (e) => {
        x.push(e), (h = h.then(z))
      }
    }
    async function Sl(e, a, t, n) {
      const { tab: o } = t,
        { incognito: i } = o,
        { anonymous: s, id: r, overrideMimeType: l, [w]: c } = e,
        u = Jn(e.url, t.url, !0),
        d = Kr[r]
      if (!d || d.cb) return
      ;(d.cb = n), (d[S] = e[S])
      const { xhr: m } = d,
        h = {},
        g = c && !P,
        p = g && i,
        f = g && !i,
        [k, y] = Ml(e.data),
        v = !s && (i || P),
        x = []
      if (
        ((d[al] = !s && !v),
        (d[tl] = !s),
        m.open(e.method || "GET", u, !0, e.user || "", e.password || ""),
        m.setRequestHeader(Gr, r),
        y && m.setRequestHeader("Content-Type", y),
        E(_e, e.headers, ([e, a]) => {
          const t = e.toLowerCase(),
            n = vl.indexOf(t)
          ;(n >= 0 && (x[n] = !0)) || Yr.test(e) ? Cl(h, e, a, t) : m.setRequestHeader(e, a)
        }),
        e.ua.forEach((e, a) => {
          if (!x[a] && !Le(e, a ? Nn[we[a]] : Pn)) {
            const t = vl[a]
            Cl(h, t, yl[t](e), t)
          }
        }),
        (m[b] = (g ? "blob" : c) || "text"),
        (m.timeout = Math.max(0, Math.min(2147483647, e.timeout)) || 0),
        l && m.overrideMimeType(l),
        v)
      ) {
        for (let e = 0, a = await browser.cookies.getAllCookieStores(); e < a.length; e++) {
          const t = a[e]
          if (t.tabIds.includes(o.id)) {
            ;(P ? t.id.endsWith("-default") : "0" === t.id) || (d.storeId = t.id)
            break
          }
        }
        const e = Date.now() / 1e3,
          a = (
            await browser.cookies.getAll({ url: u, storeId: d.storeId, ...(Bn >= 59 && { firstPartyDomain: null }) })
          ).filter((a) => a.session || a.expirationDate > e)
        a.length && Cl(h, al, a.map((e) => `${e.name}=${e.value};`).join(" "))
      }
      ll(r, h)
      const z = jl(d, a, f, p, "json" === e[b])
      a.forEach((e) => {
        m[`on${e}`] = z
      }),
        (m.onloadend = z),
        m.send(k)
    }
    function $l({ id: e, coreId: a }) {
      delete Jr[a], delete Kr[e], ll(e, !1)
    }
    function ql(e, a) {
      E(Re, Kr, (t) => {
        ;(null != e && t.tabId !== e) || (a && t[Y] !== a) || Ha.AbortRequest(t.id)
      })
    }
    function Il(e, a) {
      const t = to(0)
      E(Re, Kr, (n) => {
        n.tabId === e && n[Y] === a && ((n[Y] = 0), (n.frame = t))
      })
    }
    function Ml([e, a, t]) {
      if ("fd" === a) {
        const t = new FormData()
        e.forEach((e) => t.append(...e)), (e = t), (a = "")
      } else if ("usp" === a) a = ie + ";" + oe
      else if (null != a) {
        const n = Xe(atob(e.slice(e.indexOf(",") + 1)))
        t ||
          (a = e
            .match(/^data:(.+?);base64/)[1]
            .replace(/(boundary=)[^;]+/, (e, a) => a + String.fromCharCode(...n.slice(2, n.indexOf(13))))),
          (e = n)
      }
      return [e, a]
    }
    function Cl(e, a, t, n = a) {
      e[n] = { name: a, value: t }
    }
    let Ul,
      Dl,
      _l,
      Tl = !1
    const Rl = Ge(),
      Al = browser.webRequest.onHeadersReceived,
      Ll = { urls: ["*://*/*"], types: ["main_frame", "sub_frame"] },
      El = ["blocking", f, browser.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS].filter($),
      Ol = (e) => "content-security-policy" === e.name.toLowerCase(),
      Pl = /(?:^|[;,])\s*(?:script-src(-elem)?|(d)efault-src)(\s+[^;,]+)/g,
      Nl = /'nonce-([-+/=\w]+)'/,
      Hl = /^\s*(?:\/\*[\s\S]*?\*\/|\/\/.*[\r\n]+|\s+)*/u,
      Wl = (e) => 45 === (e = e.charCodeAt(e.match(Hl)[0].length)) || 43 === e || 91 === e || 40 === e,
      Fl = "'unsafe-inline'",
      Bl = { [X]: {}, [ji]: [] },
      Vl = { ...Bl, [X]: { [i]: !0, [y]: Rl } },
      Gl = "csReg",
      Kl = browser.contentScripts,
      Jl = Ct({
        lifetime: 3e5,
        onDispose(e) {
          var a
          null == (a = e[Gl]) || a.then((e) => e.unregister()), Jl.del(e[u])
        },
      }),
      Yl = "{GM,GM_info,unsafeWindow,cloneInto,createObjectIn,exportFunction}",
      Xl = ["description", "name", "namespace", [m], "version"],
      Zl = [[re, "homepage"]],
      Ql = /^(?:(m|excludeM)atch|(ex|in)clude)$/,
      ec = (e, a) => e + (a ? "es" : "s"),
      ac = (e) => e.replace(Ql, ec),
      tc = { [et]: ji, [tt]: !0, [it]: Si, [rt]: !0, [ct]: $i },
      nc = {},
      oc = `(${(e, a) => {
        e.vmResolve ? e.vmResolve(a) : (e.vmData = a)
      }})`,
      ic = (e, a) => (a ? e : `-${e}`),
      sc = (e) => (be[e] ? e : Dl || n),
      rc = (e, a) => sc(e[c] || a[c]),
      lc = (e, a) => e === o || (e === n && a),
      cc = (e) => "outermost_frame" === e.frameType || !e[Y],
      uc = {},
      dc = {
        [pe]: Jl.destroy,
        defaultInjectInto(e) {
          ;(e = sc(e)),
            Jl.destroy(),
            Dl && (e === o ? Al.removeListener(pc) : Ul && P && !Tl && Al.addListener(pc, Ll, El)),
            (Dl = e)
        },
        xhrInject: (e) => {
          e && (e = Dl !== o),
            Tl !== e && ((Tl = e), Jl.destroy(), Al.removeListener(pc), e && Al.addListener(pc, Ll, El))
        },
        [O]: (e) => {
          Ul = e
          const a = (e ? "add" : "remove") + "Listener",
            t = e ? Ll : void 0
          browser.webRequest.onSendHeaders[a](gc, t),
            (!Ul || (P && !Tl && Dl !== o)) && Al[a](pc, t, t && El),
            io[a](Ic),
            browser.tabs.onReplaced[a](Mc),
            e || (Jl.destroy(), Cc(), Fo.destroy(), Bo.destroy())
        },
        [i](e) {
          E(_e, e, ([e, a]) => {
            nc[decodeURIComponent(e)] = a
          })
        },
      }
    function mc(e, a) {
      if (e[ji])
        for (let n = 0; n < this.length; n++) {
          var t
          const [o, i, s] = this[n]
          if (null != (t = e[tc[o]]) && t.includes(+i || i)) {
            if (o === it) e.depsMap[i].forEach((e) => Jl.del(rt + e))
            else if (o === ct && (e[lt] && (e[lt][i] = s), hc(e, +i, s), !e[Gl])) continue
            Jl.del(a)
          }
        }
    }
    function hc(e, a, t) {
      for (let n = 0, o = (e[X] || e)[h]; n < o.length; n++) {
        const e = o[n]
        if (e.id === a) return (e[g] = t || (e[g] && {})), !0
      }
    }
    function gc(e) {
      const { url: a, tabId: t } = e,
        n = cc(e),
        o = ic(a, n)
      Jl.has(o) || uc[t] || kc(o, a, n)
    }
    function pc(e) {
      var a
      const t = ic(e.url, cc(e)),
        n = Jl.get(t)
      if (n && !n[s] && null != (a = n[X]) && a[h] && !uc[e.tabId]) {
        const a = P && e.url.startsWith("https:") && $c(e, n),
          t = Tl && fc(e, n)
        return a ? a.then(t && (() => t)) : t
      }
    }
    function fc({ [f]: e, [Y]: a, tabId: t }, n) {
      wc(n[X][h], n[s], t, a, n)
      const o = URL.createObjectURL(new Blob([JSON.stringify(n[X])]))
      return (
        e.push({ name: tl, value: `"**VMInitInjection**"=${o.split("/").pop()}; SameSite=Lax` }),
        setTimeout(URL.revokeObjectURL, 6e4, o),
        { [f]: e }
      )
    }
    function kc(e, a, t) {
      const n = t && a.startsWith("https://") ? nc[a.split("/", 3)[2]] : null,
        o = null != n ? Vl : Bl
      if (((Vl[X][i] = n), !Ul)) return o
      const s = [],
        r = _i(a, t, s)
      return r && (r[qi] = bc(e, a, t, r, null != n ? { [i]: n } : {}, s)), Jl.put(e, r || o)
    }
    async function bc(e, a, t, n, o, i) {
      n[qi] && (await n[qi]), Jl.batch(!0)
      const s = { [X]: o },
        { allIds: l, [u]: m } = n,
        g = m[r].length && Ge("more")
      return (
        I.assign(
          o,
          {
            [h]: yc(n),
            [c]: Dl,
            [u]: g,
            [y]: Rl,
            [r]: l,
            info: { ua: Wn },
            errors: i.filter((e) => l[e.split("#").pop()]).join("\n"),
          },
          Ue(n, [Qa, "clipFF", "xhr"])
        ),
        E(Re, tc, (e) => {
          !0 !== e && (s[e] = n[e])
        }),
        (s[u] = m),
        _l && Kl && !Tl && t && ((o[d] = n[d] || xc(m)), (s[Gl] = jc(o, a))),
        g && (Jl.put(g, m), (m[u] = e)),
        Jl.put(e, s),
        Jl.batch(!1),
        s
      )
    }
    function yc(e) {
      e[qi] = null
      const a = e[h]
      for (let t, n, i, s = 0; s < a.length; s++)
        (t = a[s]),
          (i = t.id),
          t[ve] || ((i = t.props.id), (n = rt + i), (t = Jl.get(n) || Jl.put(n, vc(t, e))), (a[s] = t)),
          t[c] !== o && (e[d] = !0),
          (t[g] = e[lt][i] || null)
      return a
    }
    function vc(e, a) {
      const { custom: t, meta: n, props: o } = e,
        { id: i } = o,
        { [ot]: s, [m]: r } = a,
        l = a[at][i],
        u = Ge(),
        d = Ge(),
        h = { data: u, win: d },
        g = Ma(e),
        p = t.pathMap || {},
        f = !n[ze],
        k = f && P,
        { grant: b, [xe]: y } = n,
        v = y ? "await(async" : "(",
        w = b.length,
        x = !w || (1 === w && "none" === b[0]),
        z = [],
        j = E(De, n, null, ac),
        S = ce.exec(l)
      let q, I
      for (let e = 0; e < Xl.length; e++) {
        const a = Xl[e]
        null == j[a] && (j[a] = "")
      }
      for (let e = 0; e < Zl.length; e++) {
        const [a, t] = Zl[e]
        !j[a] && (I = j[t]) && (j[a] = I)
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
          x ? Yl : "GM",
          k ? `,${u}){try{` : "){",
          x ? "" : "with(this)with(c)delete c,",
          y ? (k ? v : "(async") : "(",
          "(define,module,exports)=>{"
        ),
        (I = !1)
      for (let e = 0, a = n[ot]; e < a.length; e++) {
        const t = a[e],
          n = s[p[t] || t]
        ;/\S/.test(n) && (z.push(...[I && Wl(n) && ";", n, !de.test(n) && "\n"].filter($)), (I = !0))
      }
      return (
        I && Wl(l) && z.push(";"),
        (q = z.length),
        z.push(l),
        z.push(
          ...[
            !de.test(l) && "\n",
            k ? `})()}catch(e){${u}(e)}}` : f && "})()}",
            P && ";0",
            "\n//# sourceURL=",
            Ua(e, g),
          ].filter($)
        ),
        {
          code: "",
          displayName: g,
          gmi: { scriptWillUpdate: !!e.config.shouldUpdate, uuid: o.uuid },
          id: i,
          key: h,
          meta: j,
          pathMap: p,
          [ve]: z,
          [c]: rc(t, n),
          [ue]: ["", q, (I = S && S.index + S[1].length), I + (null == S ? void 0 : S[4].length)],
          [m]: r[i],
        }
      )
    }
    function wc(e, a, t, n, o) {
      let i, s
      const r = []
      for (let t = 0; t < e.length; t++) {
        const n = e[t],
          o = n[ue]
        if (lc(n[c], a)) {
          if (!o[0]) {
            const [, e, a, t] = o
            o[0] = n[ve][e].slice(a, t)
          }
          ;(i = ""), r.push([n.id, n.key.data])
        } else (o[0] = ""), (i = a ? l : n[ve]), a || (s = !0)
        n.code = i
      }
      o && (o[X][d] = s || xc(o[u])), r[0] && setTimeout(zc, 0, r, t, n)
    }
    function xc(e, a) {
      return null == e ? void 0 : e[h].some(qc, a || null)
    }
    function zc(e, a, t) {
      for (let n = 0; n < e.length; n++) {
        const [o, i] = e[n],
          s = Jl.get(rt + o)
        s &&
          s.key.data === i &&
          browser.tabs
            .executeScript(a, { code: s[ve].join(""), [m]: `document_${s[m]}`.replace("body", "start"), [Y]: t })
            .then(s.meta[ze] && (() => za(a, "Run", o, { [Y]: t })))
      }
    }
    function jc(e, a) {
      for (let a = 0, t = e[h]; a < t.length; a++) {
        const e = t[a]
        e.code = e[ve]
      }
      return Kl.register({
        js: [{ code: `${oc}(this,${JSON.stringify(e)})` }],
        matches: a.split("#", 1),
        [m]: "document_start",
      })
    }
    function Sc(e) {
      const a = e[Gl]
      if (a) return delete e[Gl], a.then((e) => e.unregister())
    }
    function $c(e, a) {
      const t = e[f].find(Ol)
      if (!t) return
      let n,
        o,
        i,
        r,
        l = ""
      for (; (n = Pl.exec(t.value)); ) l += n[2] ? (r = n[3]) : n[1] ? (i = n[3]) : (o = n[3])
      if (l) {
        if (((l = l.match(Nl)), l)) a[X].nonce = l[1]
        else {
          if (!((o && !o.includes(Fl)) || (i && !i.includes(Fl)) || (!o && !i && r && !r.includes(Fl)))) return
          a[s] = a[X][s] = !0
        }
        return (n = Sc(a)), n && !l ? M.all([n, (a[Gl] = jc(a[X], e.url))]) : void 0
      }
    }
    function qc(e) {
      return !lc(e[c] || rc(e.custom, e.meta), this)
    }
    function Ic(e) {
      Cc(e, 0, !0), delete uc[e]
    }
    function Mc(e, a) {
      Ic(a)
    }
    function Cc(e, a, t) {
      ql(e, a), _o(e, a), Nr(e, a, t)
    }
    function Uc(e, a) {
      setTimeout(za, 0, e, "PopupShown", !0, to(a))
    }
    Kl &&
      (dc.ffInject = (e) => {
        ;(_l = e),
          e
            ? Tl || Jl.destroy()
            : Jl.some((e) => {
                Sc(e)
              })
      }),
      Fa({
        [x]: async (e) => {
          e || (e = await Ra())
          const a = e.id,
            t = Jl.get(ic(e.url, !0)),
            n = t && Sc(t)
          ;(uc[a] = 1), n && (await n), Cc(a), await browser.tabs.reload(a)
        },
      }),
      Wa({
        async GetInjected({ url: e, [s]: a, done: t }, n) {
          const { tab: o, [Y]: i, [v]: r } = n,
            l = eo(r, n[J], i),
            u = o.id
          e || (e = n.url || o.url), Cc(u, l)
          let d = uc[u]
          if (d > 0) return r && (uc[u] = -1), as[u] && Uc(u, l), { [c]: x }
          d && delete uc[u]
          const m = ic(e, r),
            g = Jl.get(m) || kc(m, e, r),
            p = g[X] ? g : await g[qi],
            f = p[X],
            k = f[h]
          return k && (wc(k, p[s] || a, u, i, p), To(k, u, l)), as[u] && Uc(u, l), Ul ? !t && f : { [c]: "off", ...f }
        },
        async InjectionFeedback({ [s]: e, [o]: a, [u]: t, url: n }, i) {
          const { tab: r, [Y]: l } = i,
            c = i[v],
            d = r.id
          if ((zc(a, d, l), !t)) return
          n || (n = i.url || r.url)
          const m = Jl.get(t) || Jl.put(t, _i(n, c)) || { [h]: [] },
            g = (m[qi] ? await m[qi] : m)[Qa],
            p = yc(m)
          return wc(p, e, d, l), To(p, d, eo(c, i[J], l)), { [h]: p, [Qa]: g }
        },
        Run({ [r]: e, reset: a }, t) {
          const {
              [J]: n,
              [v]: o,
              tab: { id: i },
            } = t,
            s = +(null == e ? void 0 : e[0])
          qs(e, a, t), 3 === o && (s && Ro(e, n), Il(i, n), Nr(i)), "bfcache" === a && s && To(e, i, eo(o, n, t[Y]))
        },
      }),
      $t(function e(a) {
        for (const e in dc) e in a && dc[e](a[e])
        for (const t in a) t.includes(".") && e(Ce({}, t, a[t]))
      }),
      Jo((e, a) => {
        const t = []
        for (let n = 0; n < e.length; n++) {
          const o = e[n],
            i = o.indexOf(":") + 1,
            s = o.slice(0, i),
            r = o.slice(i)
          if (!0 === tc[s]) return void Jl.destroy()
          let l, c
          s === ct && ((c = null == a ? void 0 : a[o]), (l = Jl.get(rt + r)) && (l[g] = c = Ae(c) || (l[g] && {}))),
            s && t.push([s, r, c])
        }
        t.length && Jl.some(mc, t)
      })
    const Dc = {},
      _c = { ...ye, headers: { Accept: "text/x-userscript-meta,*/*" } },
      Tc = "checking"
    async function Rc(e, a, t, n) {
      let o, i, s
      try {
        const { update: s } = await Gi({ id: e, code: await Ac(a, t, n), bumpDate: !0, update: { [Tc]: !1 }, ...n })
        ;(i = We("msgScriptUpdated", [Ma(s)])), (o = !0)
      } catch (e) {
        s = e.error || (!e[Tc] && (await Ji(a, n)))
      } finally {
        Lc(a) && (i || s) && (o = { script: a, text: E(La, [i, s], "\n"), err: !!s }), delete Dc[e]
      }
      return o
    }
    async function Ac(e, a, t) {
      let n
      const {
          meta: o,
          props: { id: i },
        } = e,
        [s, r] = a,
        l = {},
        c = { update: l, where: { id: i } }
      u(We("msgCheckingForUpdate"))
      try {
        const { data: e } = (await Nc(r, { ..._c, ...t })) || {},
          { version: a, [ve]: i } = e ? xo(e, !0) : {}
        if (ea(o.version, a) >= 0) u(We("msgNoUpdate"), { [Tc]: !1 })
        else {
          if (s)
            return s === r && null != e && e.replace(ce, "").trim()
              ? (u(We("msgUpdated")), e)
              : (u(We("msgUpdating")),
                (n = We("msgErrorFetchingScript")),
                s === r && i.trim() !== e.trim() ? e : (await Nc(s, { ...ye, ...t })).data)
          u(We("msgNewVersion"), { [Tc]: !1 })
        }
      } catch (e) {
        u(n || We("msgErrorFetchingUpdateInfo"), { error: e })
      }
      throw l
      function u(e, { error: a, [Tc]: t = !a } = {}) {
        I.assign(l, { message: e, [Tc]: t, error: a ? `${We("genericError")} ${a.status}, ${a.url}` : null }),
          xa("UpdateScript", c)
      }
    }
    function Lc(e) {
      var a
      const t = qt("notifyUpdates")
      return qt("notifyUpdatesGlobal") ? t : null != (a = e.config.notifyUpdates) ? a : t
    }
    function Ec() {
      const e = Oc()
      if (!e) return
      let a = Date.now() - qt("lastUpdate")
      a >= e && (setTimeout(Ha.CheckUpdate, 2e4, n), (a = 0)),
        clearTimeout(Ec.timer),
        (Ec.timer = setTimeout(Ec, Math.min(2147483647, e - a)))
    }
    function Oc() {
      return (+qt("autoUpdate") || 0) * ge
    }
    function Pc(e = {}) {
      const a = {},
        { init: t, transform: n } = e
      return function (...e) {
        const [t] = e
        return a[t] || (a[t] = E(o, this, ...e))
      }
      async function o(...e) {
        const [o, i] = e
        try {
          const a = await Nc(o, t ? t(i) : i)
          if (a) {
            const t = n ? await n(a, ...e) : a.data
            if ((await this.setOne(o, t), "res" === i)) return t
          }
        } finally {
          delete a[o]
        }
      }
    }
    async function Nc(e, a) {
      if (la(e)) return
      let t, o, i
      const s = !ua(e)
      if (
        (!s && a && (t = a[Z]) && j((o = await mt.mod.getOne(e))) && ([o, i] = o), !(t === n && i > Date.now() - Oc()))
      )
        for (let n = 0, i = t ? [0, 1] : [1]; n < i.length; n++) {
          const t = i[n]
          if (o || t) {
            const n = await (s || ra.test(e) ? ma : Kn)(e, t ? a : { ...a, ...ye, method: "HEAD" }),
              { headers: i } = n,
              r = i.get("etag") || +new Date(i.get("last-modified")) || +new Date(i.get("date"))
            if (r && r === o) return
            if (t) return r ? mt.mod.setOne(e, [r, Date.now()]) : o && mt.mod.remove(e), n
          }
        }
    }
    Va.then(Ec),
      xt((e) => "autoUpdate" in e && Ec()),
      Fa({
        async CheckUpdate(e) {
          const a = e === n,
            t = a || !e,
            o = t ? zi() : na(e).map(vi).filter($),
            i = { all: !0, allowedOnly: t, enabledOnly: t && qt(Ga) },
            s = { [je]: { ...ye, [Z]: a ? n : t } },
            r = o
              .map((e) => {
                const a = e.props.id,
                  t = Da(e, i)
                return t && (Dc[a] || (Dc[a] = Rc(a, e, t, s)))
              })
              .filter($),
            l = await M.all(r),
            c = l.filter((e) => (null == e ? void 0 : e.text))
          return (
            c.length &&
              Ai(
                c.some((e) => e.err) ? We("msgOpenUpdateErrors") : P ? We("optionUpdate") : "",
                c.map((e) => `* ${e.text}\n`).join(""),
                c.map((e) => e.script.props.id)
              ),
            t && It("lastUpdate", Date.now()),
            l.reduce((e, a) => e + (!0 === a), 0)
          )
        },
      }),
      (mt.cache.fetch = Pc({ init: (e) => ({ ...e, [b]: "blob" }), transform: (e) => Oa(e) })),
      (mt.require.fetch = Pc({
        transform: ({ data: e }, a) =>
          /^\s*</.test(e)
            ? M.reject(
                `NOT_JS: ${a} "${e
                  .slice(0, 100)
                  .trim()
                  .replace(/\s{2,}/g, " ")}"`
              )
            : e,
      })),
      (mt.code.fetch = Pc())
    const Hc = `${H}confirm/index.html#`
    Wa({
      async CheckInstallerTab(e, a) {
        const t = P && (a.url || "").startsWith("file:") && (await browser.tabs.get(e).catch(Be))
        return t && no(t).startsWith(Hc)
      },
      async ConfirmInstall({ code: e, from: a, url: t, fs: n, parsed: o }, { tab: i = {} }) {
        if (!n) {
          if ((e || (e = (await ma(t)).data), !o && !ho(e)))
            throw `${We("msgInvalidScript")}\n\n${e
              .trim()
              .split(/[\r\n]+\s*/, 9)
              .join("\n")
              .slice(0, 500)}...`
          Dt.put(t, e, 3e3)
        }
        const s = Ge(),
          { active: r, id: l, incognito: c } = i,
          u = (!c || P) && (t === a || Dt.has(`autoclose:${l}`) || Qn.test(a))
        Dt.put(`confirm-${s}`, { incognito: c, url: t, from: a, tabId: l, fs: n, ff: Bn })
        const d = Hc + s,
          { [Q]: m } = u
            ? await browser.tabs.update(l, { url: d })
            : await Ha.TabOpen({ url: d, active: !!r }, { tab: i })
        r && m !== i[Q] && (await (null == fa ? void 0 : fa.update(m, { focused: !0 })))
      },
    })
    const Wc =
        /^https:\/\/((greas|sleaz)yfork\.org\/scripts\/[^/]*\/code|openuserjs\.org\/install\/[^/]*|github\.com\/[^/]*\/[^/]*\/(raw\/[^/]*|releases\/download\/[^/]*)|raw\.githubusercontent\.com(\/[^/]*){3}|gist\.github\.com\/.*?)\/[^/]*?\.user\.js([?#]|$)/i,
      Fc = /^https?:\/\/((gist\.)?github\.com|((greas|sleaz)yfork|openuserjs)\.org)\//i,
      Bc = (e) => `${B}${N}/${+e.split("#")[1]}`,
      Vc = P && new RegExp(`^(view-source:)?(${H.replace("://", "$&)?")}[^/]*\\.user\\.js#\\d+`),
      Gc =
        Vc &&
        ((e, a) => {
          Vc.test(a) && browser.tabs.update(e, { url: Bc(a) })
        })
    async function Kc(e, a) {
      const n = (e >= 0 && (await browser.tabs.get(e))) || {},
        { data: o } = (await ma(a).catch(Be)) || {}
      if (o && xo(o).name) Ha.ConfirmInstall({ code: o, url: a, from: n.url, parsed: !0 }, { tab: n })
      else {
        Dt.put(`bypass:${a}`, !0, 1e4)
        const n = `${t} installer skipped ${a}.\nEither not a userscript or the metablock comment is malformed:\n${(null == o ? void 0 : o.length) > 1e6 ? o.slice(0, 1e6) + "..." : o}`
        e < 0
          ? console.warn(n)
          : (browser.tabs.executeScript(e, { code: `console.warn(${JSON.stringify(n)})` }),
            browser.tabs.update(e, { url: a }))
      }
    }
    var Jc
    function Yc({ cmd: e, data: a, url: t, [v]: n } = {}, o) {
      if (Va) return Va.then(Yc.bind(this, ...arguments))
      const i = L(Ha, e) && Ha[e]
      if (i) {
        if (o) {
          let a = o.origin
          if ((t && (o.url = t), (a = a ? a === W : `${t || o.url}`.startsWith(H)), !a && i.isOwn && !o.fake))
            throw new R(`Command is only allowed in extension context: ${e}`)
          if (!o.tab) {
            if (!a && (P ? !i.isOwn : !n)) return
            o.tab = !1
          }
          n && (o[v] = n)
        }
        return Xc(i, a, o)
      }
    }
    async function Xc(e, a, t) {
      try {
        return await e(a, t)
      } catch (e) {
        throw e instanceof R ? e : new R(j(e) ? JSON.stringify(e) : e)
      }
    }
    Vc && oo.addListener((e, { url: a }) => a && Gc(e, a), Bn && { properties: [Bn >= 88 ? "url" : "status"] }),
      browser.tabs.onCreated.addListener((e) => {
        const { id: a, title: t } = e,
          n = no(e),
          o = n.startsWith("file:"),
          i = /\.user\.js([?#]|$)/.test(n)
        i && (!o || Bn < 68) && Dt.put(`autoclose:${a}`, !0, 1e4),
          Vc && "about:blank" === n && Gc(a, t),
          i && o && !so && !P && qt("helpForLocalFile") && Ha.ConfirmInstall({ url: n, fs: !0 }, { tab: e })
      }),
      browser.webRequest.onBeforeRequest.addListener(
        (e) => {
          const { method: a, tabId: t, url: n } = e
          if ("GET" === a)
            return n.startsWith(H)
              ? { redirectUrl: Bc(n) }
              : Dt.has(`bypass:${n}`) || (Fc.test(n) && !Wc.test(n))
                ? void 0
                : (Kc(t, n), P ? { cancel: !0 } : { redirectUrl: "javascript:void 0" })
        },
        {
          urls: ["*://*/*.user.js", "*://*/*.user.js?*", `${$e}.user.js`, `${$e}.user.js?*`, `${H}*.user.js`],
          types: ["main_frame"],
        },
        ["blocking"]
      ),
      Wa({ SetTimeout: (e) => e > 0 && Aa(e) }),
      (e.handleCommandMessage = Yc),
      (e.deepCopy = Ae),
      browser.runtime.onMessage.addListener(Yc),
      null == (Jc = browser.commands) ||
        Jc.onCommand.addListener(async (e) => {
          _s(e, await Ra())
        })
  })()
}
