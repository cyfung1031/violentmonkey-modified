{
  const e = this,
    { window: t } = e,
    n = "auto",
    a = "content",
    l = "ids",
    i = -1,
    o = 2,
    s = "injectInto",
    r = "more",
    u = "page",
    c = "scripts",
    d = "top",
    p = "SkipScripts",
    g = (e) => null != e && "object" == typeof e,
    {
      Boolean: m,
      Error: f,
      Object: v,
      Promise: b,
      addEventListener: x,
      removeEventListener: k,
      chrome: C,
      performance: w,
    } = e,
    { apply: y } = Reflect,
    h = (y.call.bind({}.hasOwnProperty), v.call.bind(v.call)),
    S = "isApplied",
    U = "contextualIdentities" in C,
    _ = (C.runtime.getURL("/").slice(0, -1), C.runtime.getManifest()),
    D =
      (C.runtime.getURL(_.options_ui.page).split("#", 1)[0],
      C.runtime.getURL(_.icons[16].replace("16.png", "")),
      "settings"),
    I = "frameId"
  ;(() => {
    var e,
      C = {
        8500: (e, f, C) => {
          "use strict"
          C(1871)
          var w = C(5313),
            y = C(6711),
            j = C(2477),
            M = C(2380),
            z = C(1226),
            F = (C(9994), C(6252)),
            $ = C(2502),
            H = C(2262),
            q = C(9963),
            O = C(5010),
            Z = C(6877),
            E = C(7458)
          const K = (0, H.qj)({
              scripts: [],
              frameScripts: [],
              idMap: {},
              commands: {},
              domain: "",
              injectionFailure: null,
              injectable: !0,
            }),
            R = ["data-is-applied"],
            T = { class: "flex menu-buttons" },
            Y = (0, F._)("div", { class: "logo" }, [(0, F._)("img", { src: "/public/images/icon128.png" })], -1),
            P = ["data-message", "tabIndex"],
            L = ["data-message", "tabIndex"],
            W = ["data-message", "tabIndex"],
            J = ["tabIndex"],
            A = { key: 0, class: "menu" },
            N = { class: "menu-item menu-area menu-find" },
            B = ["href", "data-message", "tabIndex"],
            G = { key: 1, class: "failure-reason" },
            V = ["textContent"],
            X = ["textContent"],
            Q = ["data-type"],
            ee = ["tabIndex", "onClick"],
            te = ["textContent", "data-totals"],
            ne = { class: "submenu", focusme: "" },
            ae = ["tabIndex", "data-message", "onFocus", "onKeydown", "onClick"],
            le = ["src"],
            ie = ["onClick", "onContextmenu", "onMousedown"],
            oe = ["textContent"],
            se = ["title"],
            re = ["title", "data-error"],
            ue = { class: "submenu-buttons" },
            ce = ["tabIndex", "onClick", "title"],
            de = ["tabIndex", "._item"],
            pe = { key: 0, class: "excludes-menu mb-1c mr-1c" },
            ge = ["textContent", "title", "onClick"],
            me = ["onUpdate:modelValue", "onKeypress", "onKeydown"],
            fe = ["textContent", "onClick"],
            ve = ["textContent", "onClick"],
            be = { class: "mb-1" },
            xe = ["textContent"],
            ke = { class: "submenu-commands" },
            Ce = ["tabIndex", ".cmd", "data-message"],
            we = ["textContent"],
            ye = ["textContent"],
            he = ["textContent"],
            Se = ["textContent"],
            Ue = ["textContent", "tabIndex"],
            _e = ["href", "tabIndex", "textContent"],
            De = ["textContent"],
            Ie = ["textContent"],
            je = ["textContent"],
            Me = ["textContent"],
            ze = ["href", "data-message", "textContent"],
            Fe = ["textContent"],
            $e = ["textContent"],
            He = ["textContent"],
            qe = "filtersPopup",
            Oe = "updateEnabledScriptsOnly",
            Ze = {
              __name: "app",
              setup(e) {
                let a, l
                const i = _.homepage_url.split("/")[2],
                  o = `${_.name} 2.22.0`,
                  s = (0, w.ag)("msgTardyMatch"),
                  r = ["start", "body", "end", "idle"],
                  u = (0, H.qj)({}),
                  c = (0, H.iH)(),
                  d = (0, H.iH)(),
                  f = (0, H.iH)(),
                  b = (0, H.qj)({ [S]: !0, [qe]: {}, [Oe]: !0 }),
                  C = (0, H.iH)("scripts"),
                  h = (0, H.iH)(),
                  j = (0, H.iH)(),
                  Ze = (0, H.iH)(),
                  Ee = (0, H.iH)(),
                  Ke = (0, H.iH)(),
                  Re = (0, F.Fl)(() => {
                    const e = h.value.data,
                      t = (0, w.b7)(e),
                      n = !t && (0, w.t$)(e)
                    return [t && [t, (0, w.ag)("menuFeedback")], n && [n, (0, w.ag)("buttonHome")]].filter(m)
                  }),
                  Te = (0, F.Fl)(() => {
                    const { sort: e, enabledFirst: t, groupRunAt: n, hideDisabled: a } = b[qe],
                      { injectable: l } = K,
                      i = "group" === a,
                      o = b[Oe]
                    let s
                    return [
                      l && ["scripts", (0, w.ag)("menuMatchedScripts"), i || null],
                      l && i && ["disabled", (0, w.ag)("menuMatchedDisabledScripts"), !1],
                      ["frameScripts", (0, w.ag)("menuMatchedFrameScripts")],
                    ]
                      .filter(m)
                      .map(([l, i, u]) => {
                        let c = K[l] || K.scripts
                        null != u && (c = c.filter((e) => !e.config.enabled == !u))
                        const d = c.length,
                          p = null == u ? c.reduce((e, t) => e + t.config.enabled, 0) : d
                        return (
                          ("hide" !== a && !0 !== a) || (c = c.filter((e) => e.config.enabled)),
                          (c = c
                            .map((a) => {
                              const l = (0, w.pV)(a),
                                { id: i } = a.props,
                                { enabled: u, removed: c, shouldUpdate: d } = a.config,
                                p = !c && (0, w.TZ)(a, { enabledOnly: o }),
                                g = {
                                  id: i,
                                  name: l,
                                  data: a,
                                  key: `${t && +!u}${"alpha" === e ? l.toLowerCase() : n && r.indexOf((0, w.xT)(a))}${1e6 + a.props.position}`,
                                  excludes: null,
                                }
                              return p && (g.upd = null), p && d && (s || (s = K.updatableScripts = {}), (s[i] = g)), g
                            })
                            .sort((e, t) => (e.key < t.key ? -1 : e.key > t.key))),
                          d && { name: l, title: i, list: c, totals: p < d ? `${p} / ${d}` : `${d}` }
                        )
                      })
                      .filter(m)
                  }),
                  Ye = (0, F.Fl)(() => {
                    const e = encodeURIComponent(K.domain)
                    return {
                      [`${(0, w.ag)("menuFindScripts")} (GF)`]: `https://greasyfork.org/scripts/by-site/${e}`,
                      OUJS: `https://openuserjs.org/?q=${e}`,
                    }
                  }),
                  Pe = (0, F.Fl)(
                    () =>
                      ("scripts-skipped" === K.failure || (S in K && K[S] !== b[S]) || v.values(u).some(m)) &&
                      (0, w.ag)("reloadTab")
                  ),
                  Le = (0, F.Fl)(() => (h.value ? -1 : 0))
                function We({ rect: e }, { rect: t }) {
                  return e.top - t.top || e.left - t.left
                }
                function Je() {
                  return browser.tabs.reload(K.tab.id)
                }
                async function Ae(e) {
                  const t = e.currentTarget,
                    n = t._item,
                    a = n.data,
                    l = a ? h : Ke
                  if (!l.value) {
                    e.stopPropagation(), (l.value = n), (n.el = t.closest(".script") || t), await (0, F.Y3)()
                    const i = (a ? d : f).value,
                      o = Math.min(innerHeight - i.getBoundingClientRect().height, t.getBoundingClientRect().bottom)
                    i.style.top = `${o}px`
                  }
                }
                function Ne(e) {
                  return "toggle-" + (e ? "on" : "off")
                }
                function Be() {
                  ;(0, w.gj)(p, K.tab)
                }
                function Ge() {
                  O.Z.set(S, (b[S] = !b[S])), nt(), ft()
                }
                function Ve(e) {
                  ;(0, w.gj)("OpenDashboard", 1 === e ? D : "").then(close)
                }
                function Xe(e) {
                  const t = e.target.closest("a[href][target=_blank]")
                  t && (e.preventDefault(), (0, w.gj)("TabOpen", { url: t.href }).then(close))
                }
                function Qe(e) {
                  ;(0, w.gj)("OpenEditor", e.data.props.id).then(close)
                }
                function et(e) {
                  const { type: t, currentTarget: n } = e
                  if ("mousedown" === t) (a = n), e.preventDefault()
                  else if ("keydown" === t || a === n) {
                    const [t, a, l] = n.cmd,
                      i = K.idMap,
                      o = +v.keys(i).find((e) => t in i[e])
                    ;(0, w.Cm)(
                      K.tab.id,
                      "Command",
                      {
                        id: t,
                        key: a,
                        evt: (0, M.zr)(e, [
                          "type",
                          "button",
                          "shiftKey",
                          "altKey",
                          "ctrlKey",
                          "metaKey",
                          "key",
                          "keyCode",
                          "code",
                        ]),
                      },
                      { [I]: o }
                    ).then(l && close)
                  }
                }
                function tt(e) {
                  const { data: t } = e,
                    n = !t.config.enabled,
                    { id: a } = t.props
                  ;(0, w.gj)("UpdateScriptInfo", { id: a, config: { enabled: n } }).then(() => {
                    ;(t.config.enabled = n), nt() || (u[a] = n !== t.runs)
                  })
                }
                function nt() {
                  if (O.Z.get("autoReload")) return Je()
                }
                function at() {
                  ;(0, w.gj)("OpenEditor").then(close)
                }
                async function lt() {
                  O.Z.set("defaultInjectInto", n), await (0, w.dL)(100), await browser.tabs.reload(), t.close()
                }
                function it() {
                  const {
                      config: e,
                      props: { id: t },
                    } = h.value.data,
                    n = +!e.removed
                  ;(e.removed = n), (0, w.gj)("MarkRemoved", { id: t, removed: n })
                }
                function ot() {
                  ;(0, w.gj)("CheckUpdate", h.value.data.props.id)
                }
                function st() {
                  ;(0, w.gj)("CheckUpdate", v.keys(K.updatableScripts).map(Number))
                }
                async function rt() {
                  const e = h.value,
                    { data: t } = e,
                    n = t.pageUrl,
                    { host: a, domain: l } = await (0, w.gj)("GetTabDomain", n)
                  ;(e.excludes = [`${n.split("#")[0]}*`, { host: a, group: `*.${l}` }]),
                    await (0, w.dL)(),
                    e.el.querySelector("input").focus()
                }
                function ut(e) {
                  ;(e.excludes = null), pt(e)
                }
                async function ct(e, t) {
                  await (0, w.gj)("UpdateScriptInfo", {
                    id: e.data.props.id,
                    custom: {
                      excludeMatch: [...(e.data.custom.excludeMatch || []), ...[t || e.excludes[0].trim()].filter(m)],
                    },
                  }),
                    ut(e),
                    nt()
                }
                function dt(e) {
                  var t
                  const n = []
                  for (let e = 0, t = c.value.querySelectorAll('[tabindex="0"]'); e < t.length; e++) {
                    const a = t[e],
                      l = a.getBoundingClientRect()
                    l.width && l.height && ((a.rect = l), n.push(a))
                  }
                  n.sort(We)
                  let a,
                    l = n.indexOf((0, z.vY)())
                  if (l < 0) l = 0
                  else {
                    const t = "u" === e,
                      i = t || "l" === e ? -1 : 1,
                      o = t || "d" === e ? "top" : "left",
                      s = n[l].rect[o]
                    for (let e = l + i; e >= 0 && e < n.length; e += i)
                      if ((s - n[e].rect[o]) * i < 0) {
                        ;(l = e), (a = !0)
                        break
                      }
                    if (!a) return
                    if (t) for (; l > 0 && n[l - 1].rect.top === n[l].rect.top; ) l -= 1
                  }
                  null == (t = n[l]) || t.focus()
                }
                function pt(e) {
                  e && (e = e.el) && (e.querySelector(".menu-area") || e).focus()
                }
                function gt({ target: e }) {
                  e.tabIndex >= 0 ? e.focus() : e.closest("[data-message]") || (Ze.value = "")
                }
                function mt({ target: e }) {
                  e !== (0, z.vY)() || (0, E.u7)(e) || e.blur()
                }
                function ft() {
                  var e
                  Ze.value = (null == (e = (0, z.vY)()) ? void 0 : e.dataset.message) || ""
                }
                function vt(e) {
                  var t, n
                  return (
                    (null == (t = h.value) ? void 0 : t.id) === e.id ||
                    (null == (n = j.value) ? void 0 : n.id) === e.id ||
                    l
                  )
                }
                return (
                  O.Z.hook((e) => {
                    for (const t in b) {
                      const n = e[t]
                      null != n && (b[t] = n && g(n) ? { ...b[t], ...n } : n)
                    }
                  }),
                  v.assign(y.Z, {
                    async UpdateScript({ update: { error: e, message: t }, where: { id: n } } = {}) {
                      for (let a = 0, l = Te.value; a < l.length; a++) {
                        const { list: i } = l[a]
                        for (let a = 0; a < i.length; a++) {
                          const l = i[a]
                          if (l.id === n) return (l.upd = e || t), void (l.updError = e)
                        }
                      }
                    },
                  }),
                  (0, F.bv)(() => {
                    const e = c.value,
                      n = e.style,
                      a = () => {
                        "loading" !== document.readyState &&
                          e.clientHeight > innerHeight &&
                          (k("resize", a), (n.maxHeight = innerHeight + "px"))
                      }
                    x("resize", a),
                      (0, z.wO)(e),
                      E.$J.enable(),
                      E.$J.register("escape", () => {
                        var e
                        const n = h.value || Ke.value
                        n
                          ? ((h.value = Ke.value = null), pt(n))
                          : null != (e = (0, z.vY)()) && e.value
                            ? (0, z.vY)().blur()
                            : t.close()
                      }),
                      U && (E.$J.register("tab", () => (0, E.nk)(1)), E.$J.register("s-tab", () => (0, E.nk)(-1)))
                    for (let e = 0, t = ["up", "down", "left", "right"]; e < t.length; e++) {
                      const n = t[e]
                      E.$J.register(n, dt.bind(null, n[0]), { condition: "!inputFocus" })
                    }
                    E.$J.register(
                      "e",
                      () => {
                        Qe(j.value)
                      },
                      { condition: "!inputFocus" }
                    )
                  }),
                  (0, F.dl)(() => {
                    l = !document.hasFocus()
                  }),
                  (e, t) => {
                    var n, a
                    return (
                      (0, F.wg)(),
                      (0, F.iD)(
                        "div",
                        {
                          ref_key: "$root",
                          ref: c,
                          class: (0, $.C_)(["page-popup flex flex-col", (0, H.SU)(K).failure]),
                          onClick: t[2] || (t[2] = (e) => (h.value = Ke.value = null)),
                          onClickCapture: Xe,
                          onMouseenterCapture: gt,
                          onMouseleaveCapture: mt,
                          onFocusCapture: ft,
                          "data-is-applied": b.isApplied,
                        },
                        [
                          (0, F._)("div", T, [
                            Y,
                            (0, F._)("div", { class: "flex-1 ext-name", textContent: o }),
                            (0, F._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": b.isApplied
                                  ? (0, H.SU)(w.ag)("menuScriptEnabled")
                                  : (0, H.SU)(w.ag)("menuScriptDisabled"),
                                tabIndex: Le.value,
                                onClick: Ge,
                              },
                              [(0, F.Wm)((0, H.SU)(Z.Z), { name: Ne(b.isApplied) }, null, 8, ["name"])],
                              8,
                              P
                            ),
                            (0, F._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": (0, H.SU)(w.ag)("menuDashboard"),
                                tabIndex: Le.value,
                                onClick: Ve,
                              },
                              [(0, F.Wm)((0, H.SU)(Z.Z), { name: "cog" })],
                              8,
                              L
                            ),
                            (0, F._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": (0, H.SU)(w.ag)("menuNewScript"),
                                tabIndex: Le.value,
                                onClick: at,
                              },
                              [(0, F.Wm)((0, H.SU)(Z.Z), { name: "plus" })],
                              8,
                              W
                            ),
                            (0, F._)(
                              "span",
                              { class: "menu-area", tabIndex: Le.value, "._item": {}, onClick: Ae },
                              [(0, F.Wm)((0, H.SU)(Z.Z), { name: "more" })],
                              40,
                              J
                            ),
                          ]),
                          (0, H.SU)(K).injectable
                            ? (0, F.wy)(
                                ((0, F.wg)(),
                                (0, F.iD)(
                                  "div",
                                  A,
                                  [
                                    (0, F._)("div", N, [
                                      ((0, F.wg)(!0),
                                      (0, F.iD)(
                                        F.HY,
                                        null,
                                        (0, F.Ko)(
                                          Ye.value,
                                          (e, t, n) => (
                                            (0, F.wg)(),
                                            (0, F.iD)(
                                              F.HY,
                                              { key: e },
                                              [
                                                (0, F._)(
                                                  "a",
                                                  {
                                                    target: "_blank",
                                                    class: (0, $.C_)({ ellipsis: !n, "mr-1": !n, "ml-1": n }),
                                                    href: e,
                                                    "data-message": e.split("://")[1],
                                                    tabIndex: Le.value,
                                                  },
                                                  [
                                                    n
                                                      ? (0, F.kq)("", !0)
                                                      : ((0, F.wg)(),
                                                        (0, F.j4)((0, H.SU)(Z.Z), { key: 0, name: "search" })),
                                                    (0, F.Uk)((0, $.zw)(t), 1),
                                                  ],
                                                  10,
                                                  B
                                                ),
                                                n
                                                  ? (0, F.kq)("", !0)
                                                  : ((0, F.wg)(), (0, F.iD)(F.HY, { key: 0 }, [(0, F.Uk)("/")], 64)),
                                              ],
                                              64
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ]),
                                  ],
                                  512
                                )),
                                [[q.F8, (0, H.SU)(K).domain]]
                              )
                            : (0, F.kq)("", !0),
                          (0, H.SU)(K).failureText
                            ? ((0, F.wg)(),
                              (0, F.iD)("div", G, [
                                (0, F._)("span", { textContent: (0, $.zw)((0, H.SU)(K).failureText) }, null, 8, V),
                                (0, H.SU)(K).blacklisted
                                  ? ((0, F.wg)(),
                                    (0, F.iD)(
                                      "code",
                                      {
                                        key: 0,
                                        textContent: (0, $.zw)((0, H.SU)(K).blacklisted),
                                        class: "ellipsis inline-block",
                                      },
                                      null,
                                      8,
                                      X
                                    ))
                                  : (0, F.kq)("", !0),
                              ]))
                            : (0, F.kq)("", !0),
                          ((0, F.wg)(!0),
                          (0, F.iD)(
                            F.HY,
                            null,
                            (0, F.Ko)(
                              Te.value,
                              (e) => (
                                (0, F.wg)(),
                                (0, F.iD)(
                                  "div",
                                  {
                                    class: (0, $.C_)([
                                      "menu menu-scripts flex flex-col",
                                      { expand: C.value === e.name, "block-scroll": h.value },
                                    ]),
                                    "data-type": e.name,
                                    key: e.name,
                                  },
                                  [
                                    (0, F._)(
                                      "div",
                                      {
                                        class: "menu-item menu-area menu-group",
                                        tabIndex: Le.value,
                                        onClick: (t) => {
                                          return (n = e.name), void (C.value = C.value === n ? null : n)
                                          var n
                                        },
                                      },
                                      [
                                        (0, F.Wm)((0, H.SU)(Z.Z), { name: "arrow", class: "icon-collapse" }),
                                        (0, F._)(
                                          "div",
                                          {
                                            class: "flex-auto",
                                            textContent: (0, $.zw)(e.title),
                                            "data-totals": e.totals,
                                          },
                                          null,
                                          8,
                                          te
                                        ),
                                      ],
                                      8,
                                      ee
                                    ),
                                    (0, F._)("div", ne, [
                                      ((0, F.wg)(!0),
                                      (0, F.iD)(
                                        F.HY,
                                        null,
                                        (0, F.Ko)(
                                          e.list,
                                          (e) => (
                                            (0, F.wg)(),
                                            (0, F.iD)(
                                              "div",
                                              {
                                                key: e.id,
                                                class: (0, $.C_)([
                                                  {
                                                    disabled: !e.data.config.enabled,
                                                    failed: e.data.failed,
                                                    removed: e.data.config.removed,
                                                    runs: e.data.runs,
                                                    "extras-shown": h.value === e,
                                                    "excludes-shown": e.excludes,
                                                  },
                                                  "script",
                                                ]),
                                              },
                                              [
                                                (0, F._)(
                                                  "div",
                                                  {
                                                    class: "menu-item menu-area",
                                                    tabIndex: Le.value,
                                                    "data-message": e.name,
                                                    onFocus: (t) => (j.value = e),
                                                    onKeydown: [
                                                      (0, q.D2)(
                                                        (0, q.iM)((t) => Qe(e), ["exact", "stop"]),
                                                        ["enter"]
                                                      ),
                                                      (0, q.D2)(
                                                        (0, q.iM)((t) => tt(e), ["exact", "stop"]),
                                                        ["space"]
                                                      ),
                                                    ],
                                                    onClick: (t) => tt(e),
                                                  },
                                                  [
                                                    (0, F._)(
                                                      "img",
                                                      { class: "script-icon", src: e.data.safeIcon },
                                                      null,
                                                      8,
                                                      le
                                                    ),
                                                    (0, F.Wm)(
                                                      (0, H.SU)(Z.Z),
                                                      { name: Ne(e.data.config.enabled) },
                                                      null,
                                                      8,
                                                      ["name"]
                                                    ),
                                                    (0, F._)(
                                                      "div",
                                                      {
                                                        class: "script-name ellipsis",
                                                        onClick: (0, q.iM)((t) => Qe(e), ["ctrl", "exact", "stop"]),
                                                        onContextmenu: (0, q.iM)(
                                                          (t) => Qe(e),
                                                          ["exact", "stop", "prevent"]
                                                        ),
                                                        onMousedown: (0, q.iM)(
                                                          (t) => Qe(e),
                                                          ["middle", "exact", "stop"]
                                                        ),
                                                      },
                                                      [
                                                        e.data.syntax
                                                          ? ((0, F.wg)(),
                                                            (0, F.iD)(
                                                              "sup",
                                                              {
                                                                key: 0,
                                                                class: "syntax",
                                                                textContent: (0, $.zw)(
                                                                  (0, H.SU)(w.ag)("msgSyntaxError")
                                                                ),
                                                              },
                                                              null,
                                                              8,
                                                              oe
                                                            ))
                                                          : (0, F.kq)("", !0),
                                                        (0, F.Uk)(" " + (0, $.zw)(e.name) + " ", 1),
                                                        !(0, H.SU)(K).failure && e.data.more
                                                          ? ((0, F.wg)(),
                                                            (0, F.iD)(
                                                              "a",
                                                              {
                                                                key: 1,
                                                                class: "tardy",
                                                                tabindex: "0",
                                                                title: (0, H.SU)(s),
                                                                onClick:
                                                                  t[0] ||
                                                                  (t[0] = (0, q.iM)(
                                                                    (e) =>
                                                                      (Ee.value =
                                                                        Ee.value === (0, H.SU)(s) ? "" : (0, H.SU)(s)),
                                                                    ["stop"]
                                                                  )),
                                                              },
                                                              [(0, F.Wm)((0, H.SU)(Z.Z), { name: "info" })],
                                                              8,
                                                              se
                                                            ))
                                                          : (0, F.kq)("", !0),
                                                      ],
                                                      40,
                                                      ie
                                                    ),
                                                    (0, F._)(
                                                      "div",
                                                      { class: "upd ellipsis", title: e.upd, "data-error": e.updError },
                                                      null,
                                                      8,
                                                      re
                                                    ),
                                                  ],
                                                  40,
                                                  ae
                                                ),
                                                (0, F.wy)(
                                                  (0, F._)(
                                                    "div",
                                                    ue,
                                                    [
                                                      (0, F._)(
                                                        "div",
                                                        {
                                                          class: "submenu-button",
                                                          tabIndex: Le.value,
                                                          onClick: (t) => Qe(e),
                                                          title: (0, H.SU)(w.ag)("buttonEditClickHint"),
                                                        },
                                                        [(0, F.Wm)((0, H.SU)(Z.Z), { name: "code" })],
                                                        8,
                                                        ce
                                                      ),
                                                      (0, F._)(
                                                        "div",
                                                        {
                                                          class: "submenu-button",
                                                          tabIndex: Le.value,
                                                          "._item": e,
                                                          onClick: Ae,
                                                        },
                                                        [(0, F.Wm)((0, H.SU)(Z.Z), { name: "more" })],
                                                        40,
                                                        de
                                                      ),
                                                    ],
                                                    512
                                                  ),
                                                  [[q.F8, vt(e)]]
                                                ),
                                                e.excludes
                                                  ? ((0, F.wg)(),
                                                    (0, F.iD)("div", pe, [
                                                      ((0, F.wg)(!0),
                                                      (0, F.iD)(
                                                        F.HY,
                                                        null,
                                                        (0, F.Ko)(
                                                          e.excludes[1],
                                                          (t, n) => (
                                                            (0, F.wg)(),
                                                            (0, F.iD)(
                                                              "button",
                                                              {
                                                                key: n,
                                                                textContent: (0, $.zw)(t),
                                                                class: "ellipsis",
                                                                title: `*://${t}/*`,
                                                                onClick: (n) => ct(e, `*://${t}/*`),
                                                              },
                                                              null,
                                                              8,
                                                              ge
                                                            )
                                                          )
                                                        ),
                                                        128
                                                      )),
                                                      (0, F.wy)(
                                                        (0, F._)(
                                                          "input",
                                                          {
                                                            "onUpdate:modelValue": (t) => (e.excludes[0] = t),
                                                            spellcheck: "false",
                                                            onKeypress: (0, q.D2)((t) => ct(e), ["enter"]),
                                                            onKeydown: (0, q.D2)(
                                                              (0, q.iM)((t) => ut(e), ["exact", "stop", "prevent"]),
                                                              ["esc"]
                                                            ),
                                                          },
                                                          null,
                                                          40,
                                                          me
                                                        ),
                                                        [[q.nr, e.excludes[0]]]
                                                      ),
                                                      (0, F._)(
                                                        "button",
                                                        {
                                                          textContent: (0, $.zw)((0, H.SU)(w.ag)("buttonOK")),
                                                          onClick: (t) => ct(e),
                                                        },
                                                        null,
                                                        8,
                                                        fe
                                                      ),
                                                      (0, F._)(
                                                        "button",
                                                        {
                                                          textContent: (0, $.zw)((0, H.SU)(w.ag)("buttonCancel")),
                                                          onClick: (t) => ut(e),
                                                        },
                                                        null,
                                                        8,
                                                        ve
                                                      ),
                                                      (0, F._)("details", be, [
                                                        (0, F._)("summary", null, [
                                                          (0, F.Wm)((0, H.SU)(Z.Z), { name: "info" }),
                                                        ]),
                                                        (0, F._)("small", null, [
                                                          (0, F.Uk)(
                                                            (0, $.zw)((0, H.SU)(w.ag)("menuExcludeHint")) +
                                                              " " +
                                                              (0, $.zw)((0, H.SU)(w.ag)("labelRelated")),
                                                            1
                                                          ),
                                                          (0, F._)(
                                                            "a",
                                                            {
                                                              textContent: (0, $.zw)(
                                                                (0, H.SU)(w.ag)("labelExcludeMatch")
                                                              ),
                                                              target: "_blank",
                                                              href: "https://violentmonkey.github.io/api/matching/",
                                                            },
                                                            null,
                                                            8,
                                                            xe
                                                          ),
                                                        ]),
                                                      ]),
                                                    ]))
                                                  : (0, F.kq)("", !0),
                                                (0, F._)("div", ke, [
                                                  ((0, F.wg)(!0),
                                                  (0, F.iD)(
                                                    F.HY,
                                                    null,
                                                    (0, F.Ko)(
                                                      (0, H.SU)(K).commands[e.id],
                                                      ({ autoClose: t = !0, text: n, title: a }, l) => (
                                                        (0, F.wg)(),
                                                        (0, F.iD)(
                                                          "div",
                                                          {
                                                            class: "menu-item menu-area",
                                                            key: l,
                                                            tabIndex: Le.value,
                                                            ".cmd": [e.id, l, t],
                                                            "data-message": a || n,
                                                            onMousedown: et,
                                                            onMouseup: et,
                                                            onKeydown: [
                                                              (0, q.D2)(et, ["enter"]),
                                                              (0, q.D2)(et, ["space"]),
                                                            ],
                                                          },
                                                          [
                                                            (0, F.Wm)((0, H.SU)(Z.Z), { name: "command" }),
                                                            (0, F._)(
                                                              "div",
                                                              {
                                                                class: "flex-auto ellipsis",
                                                                textContent: (0, $.zw)(n),
                                                              },
                                                              null,
                                                              8,
                                                              we
                                                            ),
                                                          ],
                                                          40,
                                                          Ce
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                ]),
                                              ],
                                              2
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ]),
                                  ],
                                  10,
                                  Q
                                )
                              )
                            ),
                            128
                          )),
                          Ee.value || (0, H.SU)(K).injectionFailure
                            ? ((0, F.wg)(),
                              (0, F.iD)(
                                "div",
                                { key: 2, class: (0, $.C_)(["failure-reason", { note: Ee.value }]) },
                                [
                                  (0, F._)(
                                    "div",
                                    { textContent: (0, $.zw)(Ee.value || (0, H.SU)(w.ag)("menuInjectionFailed")) },
                                    null,
                                    8,
                                    ye
                                  ),
                                  !Ee.value && (0, H.SU)(K).injectionFailure.fixable
                                    ? ((0, F.wg)(),
                                      (0, F.iD)(
                                        "a",
                                        {
                                          key: 0,
                                          textContent: (0, $.zw)((0, H.SU)(w.ag)("menuInjectionFailedFix")),
                                          href: "#",
                                          onClick: (0, q.iM)(lt, ["prevent"]),
                                        },
                                        null,
                                        8,
                                        he
                                      ))
                                    : (0, F.kq)("", !0),
                                ],
                                2
                              ))
                            : (0, F.kq)("", !0),
                          null != (n = (0, H.SU)(K).tab) && n.incognito
                            ? ((0, F.wg)(),
                              (0, F.iD)(
                                "div",
                                {
                                  key: 3,
                                  class: "incognito",
                                  textContent: (0, $.zw)((0, H.SU)(w.ag)("msgIncognitoChanges")),
                                },
                                null,
                                8,
                                Se
                              ))
                            : (0, F.kq)("", !0),
                          (0, F._)("footer", null, [
                            Pe.value
                              ? ((0, F.wg)(),
                                (0, F.iD)(
                                  "a",
                                  { key: 0, textContent: (0, $.zw)(Pe.value), tabIndex: Le.value, onClick: Je },
                                  null,
                                  8,
                                  Ue
                                ))
                              : ((0, F.wg)(),
                                (0, F.iD)(
                                  "a",
                                  {
                                    key: 1,
                                    target: "_blank",
                                    href: "https://" + (0, H.SU)(i),
                                    tabIndex: Le.value,
                                    textContent: (0, $.zw)((0, H.SU)(i)),
                                  },
                                  null,
                                  8,
                                  _e
                                )),
                          ]),
                          Ze.value
                            ? ((0, F.wg)(),
                              (0, F.iD)(
                                "div",
                                { key: 4, class: "message", textContent: (0, $.zw)(Ze.value) },
                                null,
                                8,
                                De
                              ))
                            : (0, F.kq)("", !0),
                          (0, F.wy)(
                            (0, F._)(
                              "div",
                              { ref_key: "$topExtras", ref: f, class: "extras-menu" },
                              [
                                (0, F._)(
                                  "div",
                                  {
                                    textContent: (0, $.zw)((0, H.SU)(w.ag)("labelSettings")),
                                    onClick: t[1] || (t[1] = (e) => Ve(1)),
                                    tabindex: "0",
                                  },
                                  null,
                                  8,
                                  Ie
                                ),
                                (0, H.SU)(K).updatableScripts
                                  ? ((0, F.wg)(),
                                    (0, F.iD)(
                                      "div",
                                      {
                                        key: 0,
                                        textContent: (0, $.zw)(
                                          (0, H.SU)(w.ag)(
                                            "updateListedCmd",
                                            `${v.keys((0, H.SU)(K).updatableScripts).length}`
                                          )
                                        ),
                                        onClick: st,
                                        tabindex: "0",
                                      },
                                      null,
                                      8,
                                      je
                                    ))
                                  : (0, F.kq)("", !0),
                                /^(https?|file):/.test(null == (a = (0, H.SU)(K).tab) ? void 0 : a.url)
                                  ? ((0, F.wg)(),
                                    (0, F.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        textContent: (0, $.zw)((0, H.SU)(w.ag)("skipScripts")),
                                        onClick: Be,
                                        tabindex: "0",
                                      },
                                      null,
                                      8,
                                      Me
                                    ))
                                  : (0, F.kq)("", !0),
                              ],
                              512
                            ),
                            [[q.F8, Ke.value]]
                          ),
                          h.value
                            ? ((0, F.wg)(),
                              (0, F.iD)(
                                "div",
                                { key: 5, ref_key: "$extras", ref: d, class: "extras-menu" },
                                [
                                  ((0, F.wg)(!0),
                                  (0, F.iD)(
                                    F.HY,
                                    null,
                                    (0, F.Ko)(
                                      Re.value,
                                      ([e, t]) => (
                                        (0, F.wg)(),
                                        (0, F.iD)(
                                          "a",
                                          {
                                            key: e,
                                            href: e,
                                            "data-message": e,
                                            tabindex: "0",
                                            textContent: (0, $.zw)(t),
                                            rel: "noopener noreferrer",
                                            target: "_blank",
                                          },
                                          null,
                                          8,
                                          ze
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, F._)(
                                    "div",
                                    {
                                      textContent: (0, $.zw)((0, H.SU)(w.ag)("menuExclude")),
                                      tabindex: "0",
                                      onClick: rt,
                                    },
                                    null,
                                    8,
                                    Fe
                                  ),
                                  (0, F._)(
                                    "div",
                                    {
                                      textContent: (0, $.zw)(
                                        h.value.data.config.removed
                                          ? (0, H.SU)(w.ag)("buttonRestore")
                                          : (0, H.SU)(w.ag)("buttonRemove")
                                      ),
                                      tabindex: "0",
                                      onClick: it,
                                    },
                                    null,
                                    8,
                                    $e
                                  ),
                                  "upd" in h.value
                                    ? ((0, F.wg)(),
                                      (0, F.iD)(
                                        "div",
                                        {
                                          key: 0,
                                          textContent: (0, $.zw)((0, H.SU)(w.ag)("buttonUpdate")),
                                          tabindex: "0",
                                          onClick: ot,
                                        },
                                        null,
                                        8,
                                        He
                                      ))
                                    : (0, F.kq)("", !0),
                                ],
                                512
                              ))
                            : (0, F.kq)("", !0),
                        ],
                        42,
                        R
                      )
                    )
                  }
                )
              },
            }
          let Ee, Ke, Re
          async function Te(e, { [I]: t, url: n }) {
            const p = 0 === t
            e[r] || v.assign(e[l], await (0, w.gj)("GetMoreIds", { url: n, [d]: p, [l]: e[l] })),
              p ? (K[S] = "off" !== e[s]) : await Ee,
              (K.commands = v.assign(e.menus, !p && K.commands))
            const g = K.idMap,
              m = g[0] || (g[0] = {}),
              f = g[t] || (g[t] = {}),
              b = h(M.Xw, e[l], null, (e, t) => t !== f[e] && e),
              x = v.keys(b).map(Number)
            if (x.length) {
              var k
              v.assign(f, b)
              const { frameScripts: t } = K,
                l = p ? K[c] : t
              ;(
                (null == (k = e[c]) ? void 0 : k.filter(({ props: { id: e } }) => x.includes(e))) ||
                v.assign(e, await (0, w.gj)("GetData", { ids: x }))[c]
              ).forEach((c) => {
                ;(0, j.d)(c, e)
                const { id: d } = c.props,
                  g = b[d],
                  f = g === r,
                  v = g === i,
                  x = l.find(({ props: e }) => e.id === d)
                if (x) c = x
                else if ((p || !(d in m)) && (l.push(c), p)) {
                  const e = t.findIndex(({ props: e }) => e.id === d)
                  e >= 0 && t.splice(e, 1)
                }
                ;(c.runs = g === a || g === u),
                  (c.pageUrl = n),
                  (c.failed = v || g === o || f),
                  (c[r] = f),
                  (c.syntax = g === o),
                  v && !K.injectionFailure && (K.injectionFailure = { fixable: e[s] === u })
              })
            }
            p && Ke()
          }
          function Ye(e = 100) {
            Ee = new b((t) => {
              ;(Ke = t), setTimeout(t, e)
            })
          }
          async function Pe() {
            Ye(),
              v.assign(K, {
                scripts: [],
                frameScripts: [],
                idMap: {},
                commands: {},
                domain: "",
                injectionFailure: null,
                injectable: !0,
              })
            let [e, t, [n, a, l]] = await (0, w.gj)("InitPopup")
            if (
              (a
                ? a === s
                  ? ((a = "noninjectable"), (t.injectable = !1), Ke())
                  : a === p
                    ? (a = "scripts-skipped")
                    : a === S
                      ? (a = "scripts-disabled")
                      : (t[a] = l)
                : (n = ""),
              v.assign(K, t, { failure: a, failureText: n }),
              e)
            )
              for (const t in e) y.Z.SetPopup(...e[t])
            Re ||
              ((Re = browser.runtime.connect({ name: `Popup:${e ? "C" : ""}:${t.tab.id}` })),
              Re.onMessage.addListener(Pe))
          }
          function Le(e) {
            return e && (!K.tab || K.tab.id === e.id)
          }
          Pe(),
            (0, z.sY)(Ze),
            v.assign(y.Z, {
              Run({ reset: e }, { [I]: t, tab: n }) {
                e && !t && Le(n) && Pe()
              },
              SetPopup(e, t) {
                if (Le(t.tab)) return Te(e, t)
              },
            })
        },
        6291: (e, t, n) => {
          var a = {
            "./arrow.svg": 943,
            "./author.svg": 7767,
            "./code.svg": 4064,
            "./cog.svg": 9640,
            "./command.svg": 4507,
            "./filter.svg": 5698,
            "./home.svg": 7030,
            "./info.svg": 6501,
            "./more.svg": 8614,
            "./plus.svg": 2996,
            "./question.svg": 1902,
            "./refresh.svg": 1694,
            "./search.svg": 1112,
            "./toggle-off.svg": 6817,
            "./toggle-on.svg": 385,
            "./trash.svg": 4289,
            "./undo.svg": 8947,
          }
          function l(e) {
            var t = i(e)
            return n(t)
          }
          function i(e) {
            if (!n.o(a, e)) {
              var t = new f("Cannot find module '" + e + "'")
              throw ((t.code = "MODULE_NOT_FOUND"), t)
            }
            return a[e]
          }
          ;(l.keys = () => v.keys(a)), (l.resolve = i), (e.exports = l), (l.id = 6291)
        },
      },
      w = {}
    function y(e) {
      var t = w[e]
      if (void 0 !== t) return t.exports
      var n = (w[e] = { exports: {} })
      return C[e].call(n.exports, n, n.exports, y), n.exports
    }
    ;(y.m = C),
      (e = []),
      (y.O = (t, n, a, l) => {
        if (!n) {
          var i = 1 / 0
          for (u = 0; u < e.length; u++) {
            for (var [n, a, l] = e[u], o = !0, s = 0; s < n.length; s++)
              (!1 & l || i >= l) && v.keys(y.O).every((e) => y.O[e](n[s]))
                ? n.splice(s--, 1)
                : ((o = !1), l < i && (i = l))
            if (o) {
              e.splice(u--, 1)
              var r = a()
              void 0 !== r && (t = r)
            }
          }
          return t
        }
        l = l || 0
        for (var u = e.length; u > 0 && e[u - 1][2] > l; u--) e[u] = e[u - 1]
        e[u] = [n, a, l]
      }),
      (y.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e
        return y.d(t, { a: t }), t
      }),
      (y.d = (e, t) => {
        for (var n in t) y.o(t, n) && !y.o(e, n) && v.defineProperty(e, n, { enumerable: !0, get: t[n] })
      }),
      (y.o = (e, t) => v.prototype.hasOwnProperty.call(e, t)),
      (y.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          v.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          v.defineProperty(e, "__esModule", { value: !0 })
      }),
      (y.j = 382),
      (() => {
        var e = { 382: 0 }
        y.O.j = (t) => 0 === e[t]
        var t = (t, n) => {
            var a,
              l,
              [i, o, s] = n,
              r = 0
            if (i.some((t) => 0 !== e[t])) {
              for (a in o) y.o(o, a) && (y.m[a] = o[a])
              if (s) var u = s(y)
            }
            for (t && t(n); r < i.length; r++) (l = i[r]), y.o(e, l) && e[l] && e[l][0](), (e[l] = 0)
            return y.O(u)
          },
          n = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
        n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)))
      })()
    var j = y.O(void 0, [84], () => y(8500))
    j = y.O(j)
  })()
}
