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
      chrome: w,
      performance: C,
    } = e,
    { apply: y } = Reflect,
    h = (y.call.bind({}.hasOwnProperty), v.call.bind(v.call)),
    S = "isApplied",
    U = "contextualIdentities" in w,
    _ = (w.runtime.getURL("/").slice(0, -1), w.runtime.getManifest()),
    D =
      (w.runtime.getURL(_.options_ui.page).split("#", 1)[0],
      w.runtime.getURL(_.icons[16].replace("16.png", "")),
      "settings"),
    I = "frameId"
  ;(() => {
    var e,
      x = {
        8500: (e, f, x) => {
          "use strict"
          x(1871)
          var k = x(5313),
            w = x(6711),
            C = x(2477),
            y = x(2380),
            j = x(1226),
            M = (x(9994), x(6252)),
            z = x(2502),
            F = x(2262),
            $ = x(9963),
            O = x(5010),
            H = x(6877),
            q = x(7458)
          const E = (0, F.qj)({
              scripts: [],
              frameScripts: [],
              idMap: {},
              commands: {},
              domain: "",
              injectionFailure: null,
              injectable: !0,
            }),
            K = ["data-is-applied"],
            Z = { class: "flex menu-buttons" },
            R = (0, M._)("div", { class: "logo" }, [(0, M._)("img", { src: "/public/images/icon128.png" })], -1),
            T = ["data-message", "tabIndex"],
            Y = ["data-message", "tabIndex"],
            P = ["data-message", "tabIndex"],
            L = ["tabIndex"],
            W = { key: 0, class: "menu" },
            J = { class: "menu-item menu-area menu-find" },
            A = ["href", "data-message", "tabIndex"],
            B = { key: 1, class: "failure-reason" },
            N = ["textContent"],
            G = ["textContent"],
            V = ["data-type"],
            X = ["tabIndex", "onClick"],
            Q = ["textContent", "data-totals"],
            ee = { class: "submenu", focusme: "" },
            te = ["tabIndex", "data-message", "onFocus", "onKeydown", "onClick"],
            ne = ["src"],
            ae = ["onClick", "onContextmenu", "onMousedown"],
            le = ["textContent"],
            ie = ["title", "data-error"],
            oe = { class: "submenu-buttons" },
            se = ["tabIndex", "onClick", "title"],
            re = ["tabIndex", "._item"],
            ue = { key: 0, class: "excludes-menu mb-1c mr-1c" },
            ce = ["textContent", "title", "onClick"],
            de = ["onUpdate:modelValue", "onKeypress", "onKeydown"],
            pe = ["textContent", "onClick"],
            ge = ["textContent", "onClick"],
            me = { class: "mb-1" },
            fe = ["textContent"],
            ve = { class: "submenu-commands" },
            be = ["tabIndex", ".cmd", "data-message", "onKeydown"],
            xe = ["textContent"],
            ke = { key: 2, class: "failure-reason" },
            we = ["textContent"],
            Ce = ["textContent", "onClick"],
            ye = ["textContent"],
            he = ["textContent", "tabIndex"],
            Se = ["href", "tabIndex", "textContent"],
            Ue = ["textContent", "data-tall"],
            _e = ["textContent"],
            De = ["textContent"],
            Ie = ["textContent"],
            je = ["href", "data-message", "textContent"],
            Me = ["textContent"],
            ze = ["textContent"],
            Fe = ["textContent"],
            $e = "filtersPopup",
            Oe = "updateEnabledScriptsOnly",
            He = {
              __name: "app",
              setup(e) {
                let a, l
                const i = _.homepage_url.split("/")[2],
                  o = `${_.name} 2.19.2`,
                  s = (0, k.ag)("msgTardyMatch"),
                  r = ["start", "body", "end", "idle"],
                  u = (0, F.qj)({}),
                  c = (0, F.iH)(),
                  d = (0, F.iH)(),
                  f = (0, F.iH)(),
                  b = (0, F.qj)({ [S]: !0, [$e]: {}, [Oe]: !0 }),
                  x = (0, F.iH)("scripts"),
                  C = (0, F.iH)(),
                  h = (0, F.iH)(),
                  He = (0, F.iH)(),
                  qe = (0, F.iH)(),
                  Ee = (0, M.Fl)(() => {
                    const e = C.value.data,
                      t = (0, k.b7)(e),
                      n = !t && (0, k.t$)(e)
                    return [t && [t, (0, k.ag)("menuFeedback")], n && [n, (0, k.ag)("buttonHome")]].filter(m)
                  }),
                  Ke = (0, M.Fl)(() => {
                    const { sort: e, enabledFirst: t, groupRunAt: n, hideDisabled: a } = b[$e],
                      { injectable: l } = E,
                      i = "group" === a,
                      o = b[Oe]
                    let s
                    return [
                      l && ["scripts", (0, k.ag)("menuMatchedScripts"), i || null],
                      l && i && ["disabled", (0, k.ag)("menuMatchedDisabledScripts"), !1],
                      ["frameScripts", (0, k.ag)("menuMatchedFrameScripts")],
                    ]
                      .filter(m)
                      .map(([l, i, u]) => {
                        let c = E[l] || E.scripts
                        null != u && (c = c.filter((e) => !e.config.enabled == !u))
                        const d = c.length,
                          p = null == u ? c.reduce((e, t) => e + t.config.enabled, 0) : d
                        return (
                          ("hide" !== a && !0 !== a) || (c = c.filter((e) => e.config.enabled)),
                          (c = c
                            .map((a) => {
                              const l = (0, k.pV)(a),
                                { id: i } = a.props,
                                { enabled: u, removed: c, shouldUpdate: d } = a.config,
                                p = !c && (0, k.TZ)(a, { enabledOnly: o }),
                                g = {
                                  id: i,
                                  name: l,
                                  data: a,
                                  key: `${t && +!u}${"alpha" === e ? l.toLowerCase() : n && r.indexOf((0, k.xT)(a))}${1e6 + a.props.position}`,
                                  excludes: null,
                                }
                              return p && (g.upd = null), p && d && (s || (s = E.updatableScripts = {}), (s[i] = g)), g
                            })
                            .sort((e, t) => (e.key < t.key ? -1 : e.key > t.key))),
                          d && { name: l, title: i, list: c, totals: p < d ? `${p} / ${d}` : `${d}` }
                        )
                      })
                      .filter(m)
                  }),
                  Ze = (0, M.Fl)(() => {
                    const e = encodeURIComponent(E.domain)
                    return {
                      [`${(0, k.ag)("menuFindScripts")} (GF)`]: `https://greasyfork.org/scripts/by-site/${e}`,
                      OUJS: `https://openuserjs.org/?q=${e}`,
                    }
                  }),
                  Re = (0, M.Fl)(
                    () =>
                      ("scripts-skipped" === E.failure || (S in E && E[S] !== b[S]) || v.values(u).some(m)) &&
                      (0, k.ag)("reloadTab")
                  ),
                  Te = (0, M.Fl)(() => (C.value ? -1 : 0))
                function Ye({ rect: e }, { rect: t }) {
                  return e.top - t.top || e.left - t.left
                }
                function Pe() {
                  return browser.tabs.reload(E.tab.id)
                }
                async function Le(e) {
                  const t = e.currentTarget,
                    n = t._item,
                    a = n.data,
                    l = a ? C : qe
                  if (!l.value) {
                    e.stopPropagation(), (l.value = n), (n.el = t.closest(".script") || t), await (0, M.Y3)()
                    const i = (a ? d : f).value,
                      o = Math.min(innerHeight - i.getBoundingClientRect().height, t.getBoundingClientRect().bottom)
                    i.style.top = `${o}px`
                  }
                }
                function We(e) {
                  return "toggle-" + (e ? "on" : "off")
                }
                function Je() {
                  ;(0, k.gj)(p, E.tab)
                }
                function Ae() {
                  O.Z.set(S, (b[S] = !b[S])), Qe(), pt()
                }
                function Be(e) {
                  ;(0, k.gj)("OpenDashboard", 1 === e ? D : "").then(close)
                }
                function Ne(e) {
                  const t = e.target.closest("a[href][target=_blank]")
                  t && (e.preventDefault(), (0, k.gj)("TabOpen", { url: t.href }).then(close))
                }
                function Ge(e) {
                  ;(0, k.gj)("OpenEditor", e.data.props.id).then(close)
                }
                function Ve(e) {
                  const { type: t, currentTarget: n } = e
                  if ("mousedown" === t) (a = n), e.preventDefault()
                  else if ("keydown" === t || a === n) {
                    const [t, a, l] = n.cmd,
                      i = E.idMap,
                      o = +v.keys(i).find((e) => t in i[e])
                    ;(0, k.Cm)(
                      E.tab.id,
                      "Command",
                      {
                        id: t,
                        key: a,
                        evt: (0, y.zr)(e, [
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
                function Xe(e) {
                  const { data: t } = e,
                    n = !t.config.enabled,
                    { id: a } = t.props
                  ;(0, k.gj)("UpdateScriptInfo", { id: a, config: { enabled: n } }).then(() => {
                    ;(t.config.enabled = n), Qe() || (u[a] = n !== t.runs)
                  })
                }
                function Qe() {
                  if (O.Z.get("autoReload")) return Pe()
                }
                function et() {
                  ;(0, k.gj)("OpenEditor").then(close)
                }
                async function tt() {
                  O.Z.set("defaultInjectInto", n), await (0, k.dL)(100), await browser.tabs.reload(), t.close()
                }
                function nt() {
                  const {
                      config: e,
                      props: { id: t },
                    } = C.value.data,
                    n = +!e.removed
                  ;(e.removed = n), (0, k.gj)("MarkRemoved", { id: t, removed: n })
                }
                function at() {
                  ;(0, k.gj)("CheckUpdate", C.value.data.props.id)
                }
                function lt() {
                  ;(0, k.gj)("CheckUpdate", v.keys(E.updatableScripts).map(Number))
                }
                async function it() {
                  const e = C.value,
                    { data: t } = e,
                    n = t.pageUrl,
                    { host: a, domain: l } = await (0, k.gj)("GetTabDomain", n)
                  ;(e.excludes = [`${n.split("#")[0]}*`, { host: a, group: `*.${l}` }]),
                    await (0, k.dL)(),
                    e.el.querySelector("input").focus()
                }
                function ot(e) {
                  ;(e.excludes = null), ut(e)
                }
                async function st(e, t) {
                  await (0, k.gj)("UpdateScriptInfo", {
                    id: e.data.props.id,
                    custom: {
                      excludeMatch: [...(e.data.custom.excludeMatch || []), ...[t || e.excludes[0].trim()].filter(m)],
                    },
                  }),
                    ot(e),
                    Qe()
                }
                function rt(e) {
                  var t
                  const n = []
                  for (let e = 0, t = c.value.querySelectorAll('[tabindex="0"]'); e < t.length; e++) {
                    const a = t[e],
                      l = a.getBoundingClientRect()
                    l.width && l.height && ((a.rect = l), n.push(a))
                  }
                  n.sort(Ye)
                  let a,
                    l = n.indexOf((0, j.vY)())
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
                function ut(e) {
                  e && (e = e.el) && (e.querySelector(".menu-area") || e).focus()
                }
                function ct({ target: e }) {
                  e.tabIndex >= 0 ? e.focus() : e.closest("[data-message]") || (He.value = "")
                }
                function dt({ target: e }) {
                  e !== (0, j.vY)() || (0, q.u7)(e) || e.blur()
                }
                function pt() {
                  var e
                  He.value = (null == (e = (0, j.vY)()) ? void 0 : e.dataset.message) || ""
                }
                function gt(e) {
                  var t, n
                  return (
                    (null == (t = C.value) ? void 0 : t.id) === e.id ||
                    (null == (n = h.value) ? void 0 : n.id) === e.id ||
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
                  v.assign(w.Z, {
                    async UpdateScript({ update: { error: e, message: t }, where: { id: n } } = {}) {
                      for (let a = 0, l = Ke.value; a < l.length; a++) {
                        const { list: i } = l[a]
                        for (let a = 0; a < i.length; a++) {
                          const l = i[a]
                          if (l.id === n) return (l.upd = e || t), void (l.updError = e)
                        }
                      }
                    },
                  }),
                  (0, M.bv)(() => {
                    const e = c.value,
                      n = e.style,
                      a = !U && devicePixelRatio
                    a &&
                      1 !== a &&
                      (self.onresize = () => {
                        a !== devicePixelRatio &&
                          ((n.maxHeight = parseInt(n.maxHeight) * a + "px"), (self.onresize = null))
                      }),
                      (n.height = screen.height + "px"),
                      new IntersectionObserver(([e], t) => {
                        t.disconnect(),
                          (n.maxHeight = (0 | e.rootBounds.height || document.documentElement.clientHeight) + "px"),
                          (n.height = "")
                      }).observe(e),
                      (0, j.wO)(e),
                      q.$J.enable(),
                      q.$J.register("escape", () => {
                        var e
                        const n = C.value || qe.value
                        n
                          ? ((C.value = qe.value = null), ut(n))
                          : null != (e = (0, j.vY)()) && e.value
                            ? (0, j.vY)().blur()
                            : t.close()
                      }),
                      U && (q.$J.register("tab", () => (0, q.nk)(1)), q.$J.register("s-tab", () => (0, q.nk)(-1)))
                    for (let e = 0, t = ["up", "down", "left", "right"]; e < t.length; e++) {
                      const n = t[e]
                      q.$J.register(n, rt.bind(null, n[0]), { condition: "!inputFocus" })
                    }
                    q.$J.register(
                      "e",
                      () => {
                        Ge(h.value)
                      },
                      { condition: "!inputFocus" }
                    )
                  }),
                  (0, M.dl)(() => {
                    l = !document.hasFocus()
                  }),
                  (e, t) => {
                    var n, a
                    return (
                      (0, M.wg)(),
                      (0, M.iD)(
                        "div",
                        {
                          ref_key: "$root",
                          ref: c,
                          class: (0, z.C_)(["page-popup flex flex-col", (0, F.SU)(E).failure]),
                          onClick: t[1] || (t[1] = (e) => (C.value = qe.value = null)),
                          onClickCapture: Ne,
                          onMouseenterCapture: ct,
                          onMouseleaveCapture: dt,
                          onFocusCapture: pt,
                          "data-is-applied": b.isApplied,
                        },
                        [
                          (0, M._)("div", Z, [
                            R,
                            (0, M._)("div", { class: "flex-1 ext-name", textContent: o }),
                            (0, M._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": b.isApplied
                                  ? (0, F.SU)(k.ag)("menuScriptEnabled")
                                  : (0, F.SU)(k.ag)("menuScriptDisabled"),
                                tabIndex: Te.value,
                                onClick: Ae,
                              },
                              [(0, M.Wm)((0, F.SU)(H.Z), { name: We(b.isApplied) }, null, 8, ["name"])],
                              8,
                              T
                            ),
                            (0, M._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": (0, F.SU)(k.ag)("menuDashboard"),
                                tabIndex: Te.value,
                                onClick: Be,
                              },
                              [(0, M.Wm)((0, F.SU)(H.Z), { name: "cog" })],
                              8,
                              Y
                            ),
                            (0, M._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": (0, F.SU)(k.ag)("menuNewScript"),
                                tabIndex: Te.value,
                                onClick: et,
                              },
                              [(0, M.Wm)((0, F.SU)(H.Z), { name: "plus" })],
                              8,
                              P
                            ),
                            (0, M._)(
                              "span",
                              { class: "menu-area", tabIndex: Te.value, "._item": {}, onClick: Le },
                              [(0, M.Wm)((0, F.SU)(H.Z), { name: "more" })],
                              8,
                              L
                            ),
                          ]),
                          (0, F.SU)(E).injectable
                            ? (0, M.wy)(
                                ((0, M.wg)(),
                                (0, M.iD)(
                                  "div",
                                  W,
                                  [
                                    (0, M._)("div", J, [
                                      ((0, M.wg)(!0),
                                      (0, M.iD)(
                                        M.HY,
                                        null,
                                        (0, M.Ko)(
                                          Ze.value,
                                          (e, t, n) => (
                                            (0, M.wg)(),
                                            (0, M.iD)(
                                              M.HY,
                                              { key: e },
                                              [
                                                (0, M._)(
                                                  "a",
                                                  {
                                                    target: "_blank",
                                                    class: (0, z.C_)({ ellipsis: !n, "mr-1": !n, "ml-1": n }),
                                                    href: e,
                                                    "data-message": e.split("://")[1],
                                                    tabIndex: Te.value,
                                                  },
                                                  [
                                                    n
                                                      ? (0, M.kq)("", !0)
                                                      : ((0, M.wg)(),
                                                        (0, M.j4)((0, F.SU)(H.Z), { key: 0, name: "search" })),
                                                    (0, M.Uk)((0, z.zw)(t), 1),
                                                  ],
                                                  10,
                                                  A
                                                ),
                                                n
                                                  ? (0, M.kq)("", !0)
                                                  : ((0, M.wg)(), (0, M.iD)(M.HY, { key: 0 }, [(0, M.Uk)("/")], 64)),
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
                                [[$.F8, (0, F.SU)(E).domain]]
                              )
                            : (0, M.kq)("", !0),
                          (0, F.SU)(E).failureText
                            ? ((0, M.wg)(),
                              (0, M.iD)("div", B, [
                                (0, M._)("span", { textContent: (0, z.zw)((0, F.SU)(E).failureText) }, null, 8, N),
                                (0, F.SU)(E).blacklisted
                                  ? ((0, M.wg)(),
                                    (0, M.iD)(
                                      "code",
                                      {
                                        key: 0,
                                        textContent: (0, z.zw)((0, F.SU)(E).blacklisted),
                                        class: "ellipsis inline-block",
                                      },
                                      null,
                                      8,
                                      G
                                    ))
                                  : (0, M.kq)("", !0),
                              ]))
                            : (0, M.kq)("", !0),
                          ((0, M.wg)(!0),
                          (0, M.iD)(
                            M.HY,
                            null,
                            (0, M.Ko)(
                              Ke.value,
                              (e) => (
                                (0, M.wg)(),
                                (0, M.iD)(
                                  "div",
                                  {
                                    class: (0, z.C_)([
                                      "menu menu-scripts flex flex-col",
                                      { expand: x.value === e.name, "block-scroll": C.value },
                                    ]),
                                    "data-type": e.name,
                                    key: e.name,
                                  },
                                  [
                                    (0, M._)(
                                      "div",
                                      {
                                        class: "menu-item menu-area menu-group",
                                        tabIndex: Te.value,
                                        onClick: (t) => {
                                          return (n = e.name), void (x.value = x.value === n ? null : n)
                                          var n
                                        },
                                      },
                                      [
                                        (0, M.Wm)((0, F.SU)(H.Z), { name: "arrow", class: "icon-collapse" }),
                                        (0, M._)(
                                          "div",
                                          {
                                            class: "flex-auto",
                                            textContent: (0, z.zw)(e.title),
                                            "data-totals": e.totals,
                                          },
                                          null,
                                          8,
                                          Q
                                        ),
                                      ],
                                      8,
                                      X
                                    ),
                                    (0, M._)("div", ee, [
                                      ((0, M.wg)(!0),
                                      (0, M.iD)(
                                        M.HY,
                                        null,
                                        (0, M.Ko)(
                                          e.list,
                                          (e) => (
                                            (0, M.wg)(),
                                            (0, M.iD)(
                                              "div",
                                              {
                                                key: e.id,
                                                class: (0, z.C_)([
                                                  {
                                                    disabled: !e.data.config.enabled,
                                                    failed: e.data.failed,
                                                    removed: e.data.config.removed,
                                                    runs: e.data.runs,
                                                    "extras-shown": C.value === e,
                                                    "excludes-shown": e.excludes,
                                                  },
                                                  "script",
                                                ]),
                                              },
                                              [
                                                (0, M._)(
                                                  "div",
                                                  {
                                                    class: "menu-item menu-area",
                                                    tabIndex: Te.value,
                                                    "data-message":
                                                      !(0, F.SU)(E).failure && e.data.more ? (0, F.SU)(s) : e.name,
                                                    onFocus: (t) => (h.value = e),
                                                    onKeydown: [
                                                      (0, $.D2)(
                                                        (0, $.iM)((t) => Ge(e), ["exact", "stop"]),
                                                        ["enter"]
                                                      ),
                                                      (0, $.D2)(
                                                        (0, $.iM)((t) => Xe(e), ["exact", "stop"]),
                                                        ["space"]
                                                      ),
                                                    ],
                                                    onClick: (t) => Xe(e),
                                                  },
                                                  [
                                                    (0, M._)(
                                                      "img",
                                                      { class: "script-icon", src: e.data.safeIcon },
                                                      null,
                                                      8,
                                                      ne
                                                    ),
                                                    (0, M.Wm)(
                                                      (0, F.SU)(H.Z),
                                                      { name: We(e.data.config.enabled) },
                                                      null,
                                                      8,
                                                      ["name"]
                                                    ),
                                                    (0, M._)(
                                                      "div",
                                                      {
                                                        class: "script-name flex-auto ellipsis",
                                                        onClick: (0, $.iM)((t) => Ge(e), ["ctrl", "exact", "stop"]),
                                                        onContextmenu: (0, $.iM)(
                                                          (t) => Ge(e),
                                                          ["exact", "stop", "prevent"]
                                                        ),
                                                        onMousedown: (0, $.iM)(
                                                          (t) => Ge(e),
                                                          ["middle", "exact", "stop"]
                                                        ),
                                                      },
                                                      [
                                                        e.data.syntax
                                                          ? ((0, M.wg)(),
                                                            (0, M.iD)(
                                                              "sup",
                                                              {
                                                                key: 0,
                                                                class: "syntax",
                                                                textContent: (0, z.zw)(
                                                                  (0, F.SU)(k.ag)("msgSyntaxError")
                                                                ),
                                                              },
                                                              null,
                                                              8,
                                                              le
                                                            ))
                                                          : (0, M.kq)("", !0),
                                                        (0, M.Uk)(" " + (0, z.zw)(e.name), 1),
                                                      ],
                                                      40,
                                                      ae
                                                    ),
                                                    (0, M._)(
                                                      "div",
                                                      { class: "upd ellipsis", title: e.upd, "data-error": e.updError },
                                                      null,
                                                      8,
                                                      ie
                                                    ),
                                                  ],
                                                  40,
                                                  te
                                                ),
                                                (0, M.wy)(
                                                  (0, M._)(
                                                    "div",
                                                    oe,
                                                    [
                                                      (0, M._)(
                                                        "div",
                                                        {
                                                          class: "submenu-button",
                                                          tabIndex: Te.value,
                                                          onClick: (t) => Ge(e),
                                                          title: (0, F.SU)(k.ag)("buttonEditClickHint"),
                                                        },
                                                        [(0, M.Wm)((0, F.SU)(H.Z), { name: "code" })],
                                                        8,
                                                        se
                                                      ),
                                                      (0, M._)(
                                                        "div",
                                                        {
                                                          class: "submenu-button",
                                                          tabIndex: Te.value,
                                                          "._item": e,
                                                          onClick: Le,
                                                        },
                                                        [(0, M.Wm)((0, F.SU)(H.Z), { name: "more" })],
                                                        8,
                                                        re
                                                      ),
                                                    ],
                                                    512
                                                  ),
                                                  [[$.F8, gt(e)]]
                                                ),
                                                e.excludes
                                                  ? ((0, M.wg)(),
                                                    (0, M.iD)("div", ue, [
                                                      ((0, M.wg)(!0),
                                                      (0, M.iD)(
                                                        M.HY,
                                                        null,
                                                        (0, M.Ko)(
                                                          e.excludes[1],
                                                          (t, n) => (
                                                            (0, M.wg)(),
                                                            (0, M.iD)(
                                                              "button",
                                                              {
                                                                key: n,
                                                                textContent: (0, z.zw)(t),
                                                                class: "ellipsis",
                                                                title: `*://${t}/*`,
                                                                onClick: (n) => st(e, `*://${t}/*`),
                                                              },
                                                              null,
                                                              8,
                                                              ce
                                                            )
                                                          )
                                                        ),
                                                        128
                                                      )),
                                                      (0, M.wy)(
                                                        (0, M._)(
                                                          "input",
                                                          {
                                                            "onUpdate:modelValue": (t) => (e.excludes[0] = t),
                                                            spellcheck: "false",
                                                            onKeypress: (0, $.D2)((t) => st(e), ["enter"]),
                                                            onKeydown: (0, $.D2)(
                                                              (0, $.iM)((t) => ot(e), ["exact", "stop", "prevent"]),
                                                              ["esc"]
                                                            ),
                                                          },
                                                          null,
                                                          40,
                                                          de
                                                        ),
                                                        [[$.nr, e.excludes[0]]]
                                                      ),
                                                      (0, M._)(
                                                        "button",
                                                        {
                                                          textContent: (0, z.zw)((0, F.SU)(k.ag)("buttonOK")),
                                                          onClick: (t) => st(e),
                                                        },
                                                        null,
                                                        8,
                                                        pe
                                                      ),
                                                      (0, M._)(
                                                        "button",
                                                        {
                                                          textContent: (0, z.zw)((0, F.SU)(k.ag)("buttonCancel")),
                                                          onClick: (t) => ot(e),
                                                        },
                                                        null,
                                                        8,
                                                        ge
                                                      ),
                                                      (0, M._)("details", me, [
                                                        (0, M._)("summary", null, [
                                                          (0, M.Wm)((0, F.SU)(H.Z), { name: "info" }),
                                                        ]),
                                                        (0, M._)("small", null, [
                                                          (0, M.Uk)(
                                                            (0, z.zw)((0, F.SU)(k.ag)("menuExcludeHint")) +
                                                              " " +
                                                              (0, z.zw)((0, F.SU)(k.ag)("labelRelated")),
                                                            1
                                                          ),
                                                          (0, M._)(
                                                            "a",
                                                            {
                                                              textContent: (0, z.zw)(
                                                                (0, F.SU)(k.ag)("labelExcludeMatch")
                                                              ),
                                                              target: "_blank",
                                                              href: "https://violentmonkey.github.io/api/matching/",
                                                            },
                                                            null,
                                                            8,
                                                            fe
                                                          ),
                                                        ]),
                                                      ]),
                                                    ]))
                                                  : (0, M.kq)("", !0),
                                                (0, M._)("div", ve, [
                                                  ((0, M.wg)(!0),
                                                  (0, M.iD)(
                                                    M.HY,
                                                    null,
                                                    (0, M.Ko)(
                                                      (0, F.SU)(E).commands[e.id],
                                                      ({ autoClose: t = !0, text: n, title: a }, l) => (
                                                        (0, M.wg)(),
                                                        (0, M.iD)(
                                                          "div",
                                                          {
                                                            class: "menu-item menu-area",
                                                            key: l,
                                                            tabIndex: Te.value,
                                                            ".cmd": [e.id, l, t],
                                                            "data-message": a || n,
                                                            onMousedown: Ve,
                                                            onMouseup: Ve,
                                                            onKeydown: [
                                                              (0, $.D2)(Ve, ["enter"]),
                                                              (0, $.D2)(Ve, ["space"]),
                                                            ],
                                                          },
                                                          [
                                                            (0, M.Wm)((0, F.SU)(H.Z), { name: "command" }),
                                                            (0, M._)(
                                                              "div",
                                                              {
                                                                class: "flex-auto ellipsis",
                                                                textContent: (0, z.zw)(n),
                                                              },
                                                              null,
                                                              8,
                                                              xe
                                                            ),
                                                          ],
                                                          40,
                                                          be
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
                                  V
                                )
                              )
                            ),
                            128
                          )),
                          (0, F.SU)(E).injectionFailure
                            ? ((0, M.wg)(),
                              (0, M.iD)("div", ke, [
                                (0, M._)(
                                  "div",
                                  { textContent: (0, z.zw)((0, F.SU)(k.ag)("menuInjectionFailed")) },
                                  null,
                                  8,
                                  we
                                ),
                                (0, F.SU)(E).injectionFailure.fixable
                                  ? ((0, M.wg)(),
                                    (0, M.iD)(
                                      "a",
                                      {
                                        key: 0,
                                        textContent: (0, z.zw)((0, F.SU)(k.ag)("menuInjectionFailedFix")),
                                        href: "#",
                                        onClick: (0, $.iM)(tt, ["prevent"]),
                                      },
                                      null,
                                      8,
                                      Ce
                                    ))
                                  : (0, M.kq)("", !0),
                              ]))
                            : (0, M.kq)("", !0),
                          null != (n = (0, F.SU)(E).tab) && n.incognito
                            ? ((0, M.wg)(),
                              (0, M.iD)(
                                "div",
                                {
                                  key: 3,
                                  class: "incognito",
                                  textContent: (0, z.zw)((0, F.SU)(k.ag)("msgIncognitoChanges")),
                                },
                                null,
                                8,
                                ye
                              ))
                            : (0, M.kq)("", !0),
                          (0, M._)("footer", null, [
                            Re.value
                              ? ((0, M.wg)(),
                                (0, M.iD)(
                                  "a",
                                  { key: 0, textContent: (0, z.zw)(Re.value), tabIndex: Te.value, onClick: Pe },
                                  null,
                                  8,
                                  he
                                ))
                              : ((0, M.wg)(),
                                (0, M.iD)(
                                  "a",
                                  {
                                    key: 1,
                                    target: "_blank",
                                    href: "https://" + (0, F.SU)(i),
                                    tabIndex: Te.value,
                                    textContent: (0, z.zw)((0, F.SU)(i)),
                                  },
                                  null,
                                  8,
                                  Se
                                )),
                          ]),
                          He.value
                            ? ((0, M.wg)(),
                              (0, M.iD)(
                                "div",
                                {
                                  key: 4,
                                  class: "message",
                                  textContent: (0, z.zw)(He.value),
                                  "data-tall": He.value === (0, F.SU)(s),
                                },
                                null,
                                8,
                                Ue
                              ))
                            : (0, M.kq)("", !0),
                          (0, M.wy)(
                            (0, M._)(
                              "div",
                              { ref_key: "$topExtras", ref: f, class: "extras-menu" },
                              [
                                (0, M._)(
                                  "div",
                                  {
                                    textContent: (0, z.zw)((0, F.SU)(k.ag)("labelSettings")),
                                    onClick: t[0] || (t[0] = (e) => Be(1)),
                                    tabindex: "0",
                                  },
                                  null,
                                  8,
                                  _e
                                ),
                                (0, F.SU)(E).updatableScripts
                                  ? ((0, M.wg)(),
                                    (0, M.iD)(
                                      "div",
                                      {
                                        key: 0,
                                        textContent: (0, z.zw)(
                                          (0, F.SU)(k.ag)(
                                            "updateListedCmd",
                                            `${v.keys((0, F.SU)(E).updatableScripts).length}`
                                          )
                                        ),
                                        onClick: lt,
                                        tabindex: "0",
                                      },
                                      null,
                                      8,
                                      De
                                    ))
                                  : (0, M.kq)("", !0),
                                /^(https?|file):/.test(null == (a = (0, F.SU)(E).tab) ? void 0 : a.url)
                                  ? ((0, M.wg)(),
                                    (0, M.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        textContent: (0, z.zw)((0, F.SU)(k.ag)("skipScripts")),
                                        onClick: Je,
                                        tabindex: "0",
                                      },
                                      null,
                                      8,
                                      Ie
                                    ))
                                  : (0, M.kq)("", !0),
                              ],
                              512
                            ),
                            [[$.F8, qe.value]]
                          ),
                          C.value
                            ? ((0, M.wg)(),
                              (0, M.iD)(
                                "div",
                                { key: 5, ref_key: "$extras", ref: d, class: "extras-menu" },
                                [
                                  ((0, M.wg)(!0),
                                  (0, M.iD)(
                                    M.HY,
                                    null,
                                    (0, M.Ko)(
                                      Ee.value,
                                      ([e, t]) => (
                                        (0, M.wg)(),
                                        (0, M.iD)(
                                          "a",
                                          {
                                            key: e,
                                            href: e,
                                            "data-message": e,
                                            tabindex: "0",
                                            textContent: (0, z.zw)(t),
                                            rel: "noopener noreferrer",
                                            target: "_blank",
                                          },
                                          null,
                                          8,
                                          je
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, M._)(
                                    "div",
                                    {
                                      textContent: (0, z.zw)((0, F.SU)(k.ag)("menuExclude")),
                                      tabindex: "0",
                                      onClick: it,
                                    },
                                    null,
                                    8,
                                    Me
                                  ),
                                  (0, M._)(
                                    "div",
                                    {
                                      textContent: (0, z.zw)(
                                        C.value.data.config.removed
                                          ? (0, F.SU)(k.ag)("buttonRestore")
                                          : (0, F.SU)(k.ag)("buttonRemove")
                                      ),
                                      tabindex: "0",
                                      onClick: nt,
                                    },
                                    null,
                                    8,
                                    ze
                                  ),
                                  "upd" in C.value
                                    ? ((0, M.wg)(),
                                      (0, M.iD)(
                                        "div",
                                        {
                                          key: 0,
                                          textContent: (0, z.zw)((0, F.SU)(k.ag)("buttonUpdate")),
                                          tabindex: "0",
                                          onClick: at,
                                        },
                                        null,
                                        8,
                                        Fe
                                      ))
                                    : (0, M.kq)("", !0),
                                ],
                                512
                              ))
                            : (0, M.kq)("", !0),
                        ],
                        42,
                        K
                      )
                    )
                  }
                )
              },
            }
          let qe, Ee, Ke
          async function Ze(e, { [I]: t, url: n }) {
            const p = 0 === t
            e[r] || v.assign(e[l], await (0, k.gj)("GetMoreIds", { url: n, [d]: p, [l]: e[l] })),
              p ? (E[S] = "off" !== e[s]) : await qe,
              (E.commands = v.assign(e.menus, !p && E.commands))
            const g = E.idMap,
              m = g[0] || (g[0] = {}),
              f = g[t] || (g[t] = {}),
              b = h(y.Xw, e[l], null, (e, t) => t !== f[e] && e),
              x = v.keys(b).map(Number)
            if (x.length) {
              var w
              v.assign(f, b)
              const { frameScripts: t } = E,
                l = p ? E[c] : t
              ;(
                (null == (w = e[c]) ? void 0 : w.filter(({ props: { id: e } }) => x.includes(e))) ||
                v.assign(e, await (0, k.gj)("GetData", { ids: x }))[c]
              ).forEach((c) => {
                ;(0, C.d)(c, e)
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
                  v && !E.injectionFailure && (E.injectionFailure = { fixable: e[s] === u })
              })
            }
            p && Ee()
          }
          function Re(e = 100) {
            qe = new b((t) => {
              ;(Ee = t), setTimeout(t, e)
            })
          }
          async function Te() {
            Re(),
              v.assign(E, {
                scripts: [],
                frameScripts: [],
                idMap: {},
                commands: {},
                domain: "",
                injectionFailure: null,
                injectable: !0,
              })
            let [e, t, [n, a, l]] = await (0, k.gj)("InitPopup")
            if (
              (a
                ? a === s
                  ? ((a = "noninjectable"), (t.injectable = !1), Ee())
                  : a === p
                    ? (a = "scripts-skipped")
                    : a === S
                      ? (a = "scripts-disabled")
                      : (t[a] = l)
                : (n = ""),
              v.assign(E, t, { failure: a, failureText: n }),
              e)
            )
              for (const t in e) w.Z.SetPopup(...e[t])
            Ke ||
              ((Ke = browser.runtime.connect({ name: `Popup:${e ? "C" : ""}:${t.tab.id}` })),
              Ke.onMessage.addListener(Te))
          }
          function Ye(e) {
            return e && (!E.tab || E.tab.id === e.id)
          }
          Te(),
            (0, j.sY)(He),
            v.assign(w.Z, {
              Run({ reset: e }, { [I]: t, tab: n }) {
                e && !t && Ye(n) && Te()
              },
              SetPopup(e, t) {
                if (Ye(t.tab)) return Ze(e, t)
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
      k = {}
    function w(e) {
      var t = k[e]
      if (void 0 !== t) return t.exports
      var n = (k[e] = { exports: {} })
      return x[e].call(n.exports, n, n.exports, w), n.exports
    }
    ;(w.m = x),
      (e = []),
      (w.O = (t, n, a, l) => {
        if (!n) {
          var i = 1 / 0
          for (u = 0; u < e.length; u++) {
            for (var [n, a, l] = e[u], o = !0, s = 0; s < n.length; s++)
              (!1 & l || i >= l) && v.keys(w.O).every((e) => w.O[e](n[s]))
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
      (w.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e
        return w.d(t, { a: t }), t
      }),
      (w.d = (e, t) => {
        for (var n in t) w.o(t, n) && !w.o(e, n) && v.defineProperty(e, n, { enumerable: !0, get: t[n] })
      }),
      (w.o = (e, t) => v.prototype.hasOwnProperty.call(e, t)),
      (w.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          v.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          v.defineProperty(e, "__esModule", { value: !0 })
      }),
      (w.j = 382),
      (() => {
        var e = { 382: 0 }
        w.O.j = (t) => 0 === e[t]
        var t = (t, n) => {
            var a,
              l,
              [i, o, s] = n,
              r = 0
            if (i.some((t) => 0 !== e[t])) {
              for (a in o) w.o(o, a) && (w.m[a] = o[a])
              if (s) var u = s(w)
            }
            for (t && t(n); r < i.length; r++) (l = i[r]), w.o(e, l) && e[l] && e[l][0](), (e[l] = 0)
            return w.O(u)
          },
          n = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
        n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)))
      })()
    var C = w.O(void 0, [84], () => w(8500))
    C = w.O(C)
  })()
}
