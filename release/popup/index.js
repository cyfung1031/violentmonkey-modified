{
  const e = this,
    { window: t } = e,
    n = "auto",
    a = "content",
    l = "ids",
    i = -1,
    o = 2,
    s = "injectInto",
    u = "more",
    r = "page",
    c = "scripts",
    d = "top",
    p = "SkipScripts",
    g = (e) => null != e && "object" == typeof e,
    {
      Boolean: m,
      Error: v,
      Object: f,
      Promise: b,
      addEventListener: x,
      removeEventListener: k,
      chrome: C,
      performance: w,
    } = e,
    { apply: y } = Reflect,
    h = (y.call.bind({}.hasOwnProperty), f.call.bind(f.call)),
    S = "isApplied",
    U = "contextualIdentities" in C,
    _ = (C.runtime.getURL("/").slice(0, -1), C.runtime.getManifest()),
    D =
      (C.runtime.getURL(_.options_ui.page).split("#", 1)[0],
      C.runtime.getURL(_.icons[16].replace("16.png", "")),
      "settings"),
    j = "frameId"
  ;(() => {
    var e,
      x = {
        8500: (e, v, x) => {
          "use strict"
          x(1871)
          var k = x(5313),
            C = x(6711),
            w = x(2477),
            y = x(2380),
            I = x(1226),
            M = (x(9994), x(6252)),
            z = x(2502),
            F = x(2262),
            H = x(9963),
            $ = x(5010),
            q = x(3657),
            O = x(6877),
            Z = x(4174),
            K = x(7458)
          const E = (0, F.qj)({
              scripts: [],
              frameScripts: [],
              idMap: {},
              commands: {},
              domain: "",
              injectionFailure: null,
              injectable: !0,
            }),
            T = ["data-is-applied"],
            R = { class: "flex menu-buttons" },
            Y = (0, M._)("div", { class: "logo" }, [(0, M._)("img", { src: "/public/images/icon128.png" })], -1),
            L = ["data-message", "tabIndex"],
            P = ["data-message", "tabIndex"],
            W = ["data-message", "tabIndex"],
            A = ["tabIndex"],
            J = { key: 0, class: "menu" },
            N = { class: "menu-item menu-area menu-find" },
            V = ["href", "data-message", "tabIndex"],
            B = { key: 1, class: "failure-reason" },
            G = ["textContent"],
            X = ["textContent"],
            Q = { key: 2, class: "mb-1c menu settings" },
            ee = ["textContent"],
            te = ["data-type"],
            ne = ["tabIndex", "onClick"],
            ae = ["textContent", "data-totals"],
            le = { class: "submenu" },
            ie = ["tabIndex", "data-message", "onFocus", "onKeydown", "onClick"],
            oe = ["src"],
            se = ["onClick", "onContextmenu", "onMousedown"],
            ue = ["textContent"],
            re = ["title"],
            ce = ["title", "data-error"],
            de = { class: "submenu-buttons" },
            pe = ["tabIndex", "onClick", "title"],
            ge = ["tabIndex", "._item"],
            me = { key: 0, class: "excludes-menu mb-1c mr-1c" },
            ve = ["textContent", "title", "onClick"],
            fe = ["onUpdate:modelValue", "onKeypress", "onKeydown"],
            be = ["textContent", "onClick"],
            xe = ["textContent", "onClick"],
            ke = { class: "mb-1" },
            Ce = ["textContent"],
            we = { class: "submenu-commands" },
            ye = ["tabIndex", ".cmd", "data-message"],
            he = ["textContent"],
            Se = ["textContent"],
            Ue = ["textContent"],
            _e = ["textContent"],
            De = ["textContent", "tabIndex"],
            je = ["href", "tabIndex", "textContent"],
            Ie = ["textContent"],
            Me = ["textContent"],
            ze = ["textContent"],
            Fe = ["textContent"],
            He = ["textContent"],
            $e = ["href", "data-message", "textContent"],
            qe = ["textContent"],
            Oe = ["textContent"],
            Ze = ["textContent"],
            Ke = {
              __name: "app",
              setup(e) {
                let a, l
                const i = _.homepage_url.split("/")[2],
                  o = `${_.name} 2.26.0`,
                  s = (0, k.ag)("msgTardyMatch"),
                  u = ["start", "body", "end", "idle"],
                  r = (0, F.qj)({}),
                  c = (0, F.iH)(),
                  d = (0, F.iH)(),
                  v = (0, F.qj)((0, y.zr)(q.ZP, [S, q.Fb, q.L0, q.CV])),
                  b = (0, F.iH)("scripts"),
                  x = (0, F.iH)(),
                  w = (0, F.iH)(),
                  h = (0, F.iH)(),
                  Ke = (0, F.iH)(),
                  Ee = (0, F.iH)(),
                  Te = (0, F.iH)(),
                  Re = (0, M.Fl)(() => {
                    const e = w.value.data,
                      t = (0, k.b7)(e),
                      n = !t && (0, k.t$)(e)
                    return [t && [t, (0, k.ag)("menuFeedback")], n && [n, (0, k.ag)("buttonHome")]].filter(m)
                  }),
                  Ye = (0, M.Fl)(() => {
                    const { sort: e, enabledFirst: t, groupRunAt: n, hideDisabled: a } = v[q.Fb],
                      { injectable: l } = E,
                      i = "group" === a,
                      o = v[q.CV]
                    let s
                    return [
                      l && ["scripts", (0, k.ag)("menuMatchedScripts"), i || null],
                      l && i && ["disabled", (0, k.ag)("menuMatchedDisabledScripts"), !1],
                      ["frameScripts", (0, k.ag)("menuMatchedFrameScripts")],
                    ]
                      .filter(m)
                      .map(([l, i, r]) => {
                        let c = E[l] || E.scripts
                        null != r && (c = c.filter((e) => !e.config.enabled == !r))
                        const d = c.length,
                          p = null == r ? c.reduce((e, t) => e + t.config.enabled, 0) : d
                        return (
                          ("hide" !== a && !0 !== a) || (c = c.filter((e) => e.config.enabled)),
                          (c = c
                            .map((a) => {
                              const l = (0, k.pV)(a),
                                { id: i } = a.props,
                                { enabled: r, removed: c, shouldUpdate: d } = a.config,
                                p = !c && (0, k.TZ)(a, { enabledOnly: o }),
                                g = {
                                  id: i,
                                  name: l,
                                  data: a,
                                  key: `${t && +!r}${"alpha" === e ? l.toLowerCase() : n && u.indexOf((0, k.xT)(a))}${1e6 + a.props.position}`,
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
                  Le = (0, M.Fl)(() => {
                    const e = encodeURIComponent(E.domain)
                    return {
                      [`${(0, k.ag)("menuFindScripts")} (GF)`]: `https://greasyfork.org/scripts/by-site/${e}`,
                      OUJS: `https://openuserjs.org/?q=${e}`,
                    }
                  }),
                  Pe = (0, M.Fl)(
                    () =>
                      ("scripts-skipped" === E.failure || (S in E && E[S] !== v[S]) || f.values(r).some(m)) &&
                      (0, k.ag)("reloadTab")
                  ),
                  We = (0, M.Fl)(() => (w.value ? -1 : 0))
                function Ae({ rect: e }, { rect: t }) {
                  return e.top - t.top || e.left - t.left
                }
                function Je() {
                  return browser.tabs.reload(E.tab.id)
                }
                async function Ne(e) {
                  const t = e.currentTarget,
                    n = t._item,
                    a = n.data,
                    l = a ? w : Te
                  if (!l.value) {
                    e.stopPropagation(), (l.value = n), (n.el = t.closest(".script") || t), await (0, M.Y3)()
                    const i = (a ? c : d).value,
                      o = Math.min(innerHeight - i.getBoundingClientRect().height, t.getBoundingClientRect().bottom)
                    i.style.top = `${o}px`
                  }
                }
                function Ve(e) {
                  return "toggle-" + (e ? "on" : "off")
                }
                function Be() {
                  ;(0, k.gj)(p, E.tab)
                }
                function Ge() {
                  $.Z.set(S, (v[S] = !v[S])), at(), ft()
                }
                function Xe(e) {
                  ;(0, k.gj)("OpenDashboard", 1 === e || 1 === e.button || e.ctrlKey ? D : "").then(close)
                }
                function Qe(e) {
                  const t = e.target.closest("a[href][target=_blank]")
                  t && (e.preventDefault(), (0, k.gj)("TabOpen", { url: t.href }).then(close))
                }
                function et(e) {
                  ;(0, k.gj)("OpenEditor", e.data.props.id).then(close)
                }
                function tt(e) {
                  const { type: t, currentTarget: n } = e
                  if ("mousedown" === t) (a = n), e.preventDefault()
                  else if ("keydown" === t || a === n) {
                    const [t, a, l] = n.cmd,
                      i = E.idMap,
                      o = +f.keys(i).find((e) => t in i[e])
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
                      { [j]: o }
                    ).then(l && close)
                  }
                }
                function nt(e) {
                  const { data: t } = e,
                    n = !t.config.enabled,
                    { id: a } = t.props
                  ;(0, k.gj)("UpdateScriptInfo", { id: a, config: { enabled: n } }).then(() => {
                    ;(t.config.enabled = n), at() || (r[a] = n !== t.runs)
                  })
                }
                function at() {
                  if ($.Z.get("autoReload")) return Je()
                }
                function lt() {
                  ;(0, k.gj)("OpenEditor").then(close)
                }
                async function it() {
                  $.Z.set("defaultInjectInto", n), await (0, k.dL)(100), await browser.tabs.reload(), t.close()
                }
                function ot() {
                  const {
                      config: e,
                      props: { id: t },
                    } = w.value.data,
                    n = +!e.removed
                  ;(e.removed = n), (0, k.gj)("MarkRemoved", { id: t, removed: n })
                }
                function st() {
                  ;(0, k.gj)("CheckUpdate", w.value.data.props.id)
                }
                function ut() {
                  ;(0, k.gj)("CheckUpdate", f.keys(E.updatableScripts).map(Number))
                }
                async function rt() {
                  const e = w.value,
                    { data: t } = e,
                    n = t.pageUrl,
                    { host: a, domain: l } = await (0, k.gj)("GetTabDomain", n)
                  ;(e.excludes = [`${n.split("#")[0]}*`, { host: a, group: `*.${l}` }]),
                    await (0, k.dL)(),
                    e.el.querySelector("input").focus()
                }
                function ct(e) {
                  ;(e.excludes = null), gt(e)
                }
                async function dt(e, t) {
                  await (0, k.gj)("UpdateScriptInfo", {
                    id: e.data.props.id,
                    custom: {
                      excludeMatch: [...(e.data.custom.excludeMatch || []), ...[t || e.excludes[0].trim()].filter(m)],
                    },
                  }),
                    ct(e),
                    at()
                }
                function pt(e) {
                  var t
                  const n = []
                  for (let e = 0, t = document.querySelectorAll('[tabindex="0"]'); e < t.length; e++) {
                    const a = t[e],
                      l = a.getBoundingClientRect()
                    l.width && l.height && ((a.rect = l), n.push(a))
                  }
                  n.sort(Ae)
                  let a,
                    l = n.indexOf((0, I.vY)())
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
                function gt(e) {
                  e && (e = e.el) && (e.querySelector(".menu-area") || e).focus()
                }
                function mt({ target: e }) {
                  e.tabIndex >= 0 ? e.focus() : e.closest("[data-message]") || (Ke.value = "")
                }
                function vt({ target: e }) {
                  e !== (0, I.vY)() || (0, K.u7)(e) || e.blur()
                }
                function ft() {
                  var e
                  Ke.value = (null == (e = (0, I.vY)()) ? void 0 : e.dataset.message) || ""
                }
                function bt(e) {
                  var t, n
                  return (
                    (null == (t = w.value) ? void 0 : t.id) === e.id ||
                    (null == (n = h.value) ? void 0 : n.id) === e.id ||
                    l
                  )
                }
                return (
                  $.Z.hook((e) => {
                    for (const t in v) {
                      const n = e[t]
                      null != n &&
                        ((v[t] = n && g(n) ? { ...v[t], ...n } : n),
                        t === q.L0 && (document.body.style.width = n + "px"))
                    }
                  }),
                  f.assign(C.Z, {
                    async UpdateScript({ update: { error: e, message: t }, where: { id: n } } = {}) {
                      for (let a = 0, l = Ye.value; a < l.length; a++) {
                        const { list: i } = l[a]
                        for (let a = 0; a < i.length; a++) {
                          const l = i[a]
                          if (l.id === n) return (l.upd = e || t), void (l.updError = e)
                        }
                      }
                    },
                  }),
                  (0, M.bv)(() => {
                    K.$J.enable(),
                      K.$J.register("escape", () => {
                        var e
                        const n = w.value || Te.value
                        n
                          ? ((w.value = Te.value = null), gt(n))
                          : null != (e = (0, I.vY)()) && e.value
                            ? (0, I.vY)().blur()
                            : t.close()
                      }),
                      U && (K.$J.register("tab", () => (0, K.nk)(1)), K.$J.register("s-tab", () => (0, K.nk)(-1)))
                    for (let e = 0, t = ["up", "down", "left", "right"]; e < t.length; e++) {
                      const n = t[e]
                      K.$J.register(n, pt.bind(null, n[0]), { condition: "!inputFocus" })
                    }
                    K.$J.register(
                      "e",
                      () => {
                        et(h.value)
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
                          class: (0, z.C_)(["page-popup flex flex-col", (0, F.SU)(E).failure]),
                          onClick: t[6] || (t[6] = (e) => (w.value = Te.value = null)),
                          onClickCapture: Qe,
                          onMouseenterCapture: mt,
                          onMouseleaveCapture: vt,
                          onFocusCapture: ft,
                          "data-is-applied": v.isApplied,
                          style: (0, z.j5)({ "max-height": (0, F.SU)(E).maxHeight }),
                        },
                        [
                          (0, M._)("div", R, [
                            Y,
                            (0, M._)("div", { class: "flex-1 ext-name", textContent: o }),
                            (0, M._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": v.isApplied
                                  ? (0, F.SU)(k.ag)("menuScriptEnabled")
                                  : (0, F.SU)(k.ag)("menuScriptDisabled"),
                                tabIndex: We.value,
                                onClick: Ge,
                              },
                              [(0, M.Wm)((0, F.SU)(O.Z), { name: Ve(v.isApplied) }, null, 8, ["name"])],
                              8,
                              L
                            ),
                            (0, M._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message":
                                  (0, F.SU)(k.ag)("menuDashboard") + "\n" + (0, F.SU)(k.ag)("popupSettingsHint"),
                                tabIndex: We.value,
                                onContextmenu: t[0] || (t[0] = (0, H.iM)((e) => (x.value = !x.value), ["prevent"])),
                                onAuxclick: t[1] || (t[1] = (e) => 2 !== e.button && Xe(e)),
                                onClick: Xe,
                              },
                              [(0, M.Wm)((0, F.SU)(O.Z), { name: "cog" })],
                              40,
                              P
                            ),
                            (0, M._)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": (0, F.SU)(k.ag)("menuNewScript"),
                                tabIndex: We.value,
                                onClick: lt,
                              },
                              [(0, M.Wm)((0, F.SU)(O.Z), { name: "plus" })],
                              8,
                              W
                            ),
                            (0, M._)(
                              "span",
                              { class: "menu-area", tabIndex: We.value, "._item": {}, onClick: Ne },
                              [(0, M.Wm)((0, F.SU)(O.Z), { name: "more" })],
                              40,
                              A
                            ),
                          ]),
                          (0, F.SU)(E).injectable
                            ? (0, M.wy)(
                                ((0, M.wg)(),
                                (0, M.iD)(
                                  "div",
                                  J,
                                  [
                                    (0, M._)("div", N, [
                                      ((0, M.wg)(!0),
                                      (0, M.iD)(
                                        M.HY,
                                        null,
                                        (0, M.Ko)(
                                          Le.value,
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
                                                    tabIndex: We.value,
                                                  },
                                                  [
                                                    n
                                                      ? (0, M.kq)("", !0)
                                                      : ((0, M.wg)(),
                                                        (0, M.j4)((0, F.SU)(O.Z), { key: 0, name: "search" })),
                                                    (0, M.Uk)((0, z.zw)(t), 1),
                                                  ],
                                                  10,
                                                  V
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
                                [[H.F8, (0, F.SU)(E).domain]]
                              )
                            : (0, M.kq)("", !0),
                          (0, F.SU)(E).failureText
                            ? ((0, M.wg)(),
                              (0, M.iD)("div", B, [
                                (0, M._)("span", { textContent: (0, z.zw)((0, F.SU)(E).failureText) }, null, 8, G),
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
                                      X
                                    ))
                                  : (0, M.kq)("", !0),
                              ]))
                            : (0, M.kq)("", !0),
                          x.value
                            ? ((0, M.wg)(),
                              (0, M.iD)("div", Q, [
                                (0, M.Wm)(Z.Z),
                                (0, M._)(
                                  "button",
                                  {
                                    textContent: (0, z.zw)((0, F.SU)(k.ag)("buttonClose")),
                                    onClick: t[2] || (t[2] = (e) => (x.value = !1)),
                                  },
                                  null,
                                  8,
                                  ee
                                ),
                              ]))
                            : (0, M.kq)("", !0),
                          ((0, M.wg)(!0),
                          (0, M.iD)(
                            M.HY,
                            null,
                            (0, M.Ko)(
                              Ye.value,
                              (e) => (
                                (0, M.wg)(),
                                (0, M.iD)(
                                  "div",
                                  {
                                    class: (0, z.C_)([
                                      "menu menu-scripts flex flex-col",
                                      { expand: b.value === e.name, "block-scroll": w.value },
                                    ]),
                                    "data-type": e.name,
                                    key: e.name,
                                  },
                                  [
                                    (0, M._)(
                                      "div",
                                      {
                                        class: "menu-item menu-area menu-group",
                                        tabIndex: We.value,
                                        onClick: (t) => {
                                          return (n = e.name), void (b.value = b.value === n ? null : n)
                                          var n
                                        },
                                      },
                                      [
                                        (0, M.Wm)((0, F.SU)(O.Z), { name: "arrow", class: "icon-collapse" }),
                                        (0, M._)(
                                          "div",
                                          {
                                            class: "flex-auto",
                                            textContent: (0, z.zw)(e.title),
                                            "data-totals": e.totals,
                                          },
                                          null,
                                          8,
                                          ae
                                        ),
                                      ],
                                      8,
                                      ne
                                    ),
                                    (0, M._)("div", le, [
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
                                                    "extras-shown": w.value === e,
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
                                                    tabIndex: We.value,
                                                    "data-message": e.name,
                                                    onFocus: (t) => (h.value = e),
                                                    onKeydown: [
                                                      (0, H.D2)(
                                                        (0, H.iM)((t) => et(e), ["exact", "stop"]),
                                                        ["enter"]
                                                      ),
                                                      (0, H.D2)(
                                                        (0, H.iM)((t) => nt(e), ["exact", "stop"]),
                                                        ["space"]
                                                      ),
                                                    ],
                                                    onClick: (t) => nt(e),
                                                  },
                                                  [
                                                    (0, M._)(
                                                      "img",
                                                      { class: "script-icon", src: e.data.safeIcon },
                                                      null,
                                                      8,
                                                      oe
                                                    ),
                                                    (0, M.Wm)(
                                                      (0, F.SU)(O.Z),
                                                      { name: Ve(e.data.config.enabled) },
                                                      null,
                                                      8,
                                                      ["name"]
                                                    ),
                                                    (0, M._)(
                                                      "div",
                                                      {
                                                        class: "script-name ellipsis",
                                                        onClick: (0, H.iM)((t) => et(e), ["ctrl", "exact", "stop"]),
                                                        onContextmenu: (0, H.iM)(
                                                          (t) => et(e),
                                                          ["exact", "stop", "prevent"]
                                                        ),
                                                        onMousedown: (0, H.iM)(
                                                          (t) => et(e),
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
                                                              ue
                                                            ))
                                                          : (0, M.kq)("", !0),
                                                        (0, M.Uk)(" " + (0, z.zw)(e.name) + " ", 1),
                                                        !(0, F.SU)(E).failure && e.data.more
                                                          ? ((0, M.wg)(),
                                                            (0, M.iD)(
                                                              "a",
                                                              {
                                                                key: 1,
                                                                class: "tardy",
                                                                tabindex: "0",
                                                                title: (0, F.SU)(s),
                                                                onClick:
                                                                  t[3] ||
                                                                  (t[3] = (0, H.iM)(
                                                                    (e) =>
                                                                      (Ee.value =
                                                                        Ee.value === (0, F.SU)(s) ? "" : (0, F.SU)(s)),
                                                                    ["stop"]
                                                                  )),
                                                              },
                                                              [(0, M.Wm)((0, F.SU)(O.Z), { name: "info" })],
                                                              8,
                                                              re
                                                            ))
                                                          : (0, M.kq)("", !0),
                                                      ],
                                                      40,
                                                      se
                                                    ),
                                                    (0, M._)(
                                                      "div",
                                                      { class: "upd ellipsis", title: e.upd, "data-error": e.updError },
                                                      null,
                                                      8,
                                                      ce
                                                    ),
                                                  ],
                                                  40,
                                                  ie
                                                ),
                                                (0, M.wy)(
                                                  (0, M._)(
                                                    "div",
                                                    de,
                                                    [
                                                      (0, M._)(
                                                        "div",
                                                        {
                                                          class: "submenu-button",
                                                          tabIndex: We.value,
                                                          onClick: (t) => et(e),
                                                          title: (0, F.SU)(k.ag)("buttonEditClickHint"),
                                                        },
                                                        [(0, M.Wm)((0, F.SU)(O.Z), { name: "code" })],
                                                        8,
                                                        pe
                                                      ),
                                                      (0, M._)(
                                                        "div",
                                                        {
                                                          class: "submenu-button",
                                                          tabIndex: We.value,
                                                          "._item": e,
                                                          onClick: Ne,
                                                        },
                                                        [(0, M.Wm)((0, F.SU)(O.Z), { name: "more" })],
                                                        40,
                                                        ge
                                                      ),
                                                    ],
                                                    512
                                                  ),
                                                  [[H.F8, bt(e)]]
                                                ),
                                                e.excludes
                                                  ? ((0, M.wg)(),
                                                    (0, M.iD)("div", me, [
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
                                                                onClick: (n) => dt(e, `*://${t}/*`),
                                                              },
                                                              null,
                                                              8,
                                                              ve
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
                                                            onKeypress: (0, H.D2)((t) => dt(e), ["enter"]),
                                                            onKeydown: (0, H.D2)(
                                                              (0, H.iM)((t) => ct(e), ["exact", "stop", "prevent"]),
                                                              ["esc"]
                                                            ),
                                                          },
                                                          null,
                                                          40,
                                                          fe
                                                        ),
                                                        [[H.nr, e.excludes[0]]]
                                                      ),
                                                      (0, M._)(
                                                        "button",
                                                        {
                                                          textContent: (0, z.zw)((0, F.SU)(k.ag)("buttonOK")),
                                                          onClick: (t) => dt(e),
                                                        },
                                                        null,
                                                        8,
                                                        be
                                                      ),
                                                      (0, M._)(
                                                        "button",
                                                        {
                                                          textContent: (0, z.zw)((0, F.SU)(k.ag)("buttonCancel")),
                                                          onClick: (t) => ct(e),
                                                        },
                                                        null,
                                                        8,
                                                        xe
                                                      ),
                                                      (0, M._)("details", ke, [
                                                        (0, M._)("summary", null, [
                                                          (0, M.Wm)((0, F.SU)(O.Z), { name: "info" }),
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
                                                            Ce
                                                          ),
                                                        ]),
                                                      ]),
                                                    ]))
                                                  : (0, M.kq)("", !0),
                                                (0, M._)("div", we, [
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
                                                            tabIndex: We.value,
                                                            ".cmd": [e.id, l, t],
                                                            "data-message": a || n,
                                                            onMousedown: tt,
                                                            onMouseup: tt,
                                                            onKeydown: [
                                                              (0, H.D2)(tt, ["enter"]),
                                                              (0, H.D2)(tt, ["space"]),
                                                            ],
                                                          },
                                                          [
                                                            (0, M.Wm)((0, F.SU)(O.Z), { name: "command" }),
                                                            (0, M._)(
                                                              "div",
                                                              {
                                                                class: "flex-auto ellipsis",
                                                                textContent: (0, z.zw)(n),
                                                              },
                                                              null,
                                                              8,
                                                              he
                                                            ),
                                                          ],
                                                          40,
                                                          ye
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
                                  te
                                )
                              )
                            ),
                            128
                          )),
                          Ee.value || (0, F.SU)(E).injectionFailure
                            ? ((0, M.wg)(),
                              (0, M.iD)(
                                "div",
                                { key: 3, class: (0, z.C_)(["failure-reason", { note: Ee.value }]) },
                                [
                                  (0, M._)(
                                    "div",
                                    { textContent: (0, z.zw)(Ee.value || (0, F.SU)(k.ag)("menuInjectionFailed")) },
                                    null,
                                    8,
                                    Se
                                  ),
                                  !Ee.value && (0, F.SU)(E).injectionFailure.fixable
                                    ? ((0, M.wg)(),
                                      (0, M.iD)(
                                        "a",
                                        {
                                          key: 0,
                                          textContent: (0, z.zw)((0, F.SU)(k.ag)("menuInjectionFailedFix")),
                                          href: "#",
                                          onClick: (0, H.iM)(it, ["prevent"]),
                                        },
                                        null,
                                        8,
                                        Ue
                                      ))
                                    : (0, M.kq)("", !0),
                                ],
                                2
                              ))
                            : (0, M.kq)("", !0),
                          null != (n = (0, F.SU)(E).tab) && n.incognito
                            ? ((0, M.wg)(),
                              (0, M.iD)(
                                "div",
                                {
                                  key: 4,
                                  class: "incognito",
                                  textContent: (0, z.zw)((0, F.SU)(k.ag)("msgIncognitoChanges")),
                                },
                                null,
                                8,
                                _e
                              ))
                            : (0, M.kq)("", !0),
                          (0, M._)("footer", null, [
                            Pe.value
                              ? ((0, M.wg)(),
                                (0, M.iD)(
                                  "a",
                                  { key: 0, textContent: (0, z.zw)(Pe.value), tabIndex: We.value, onClick: Je },
                                  null,
                                  8,
                                  De
                                ))
                              : ((0, M.wg)(),
                                (0, M.iD)(
                                  "a",
                                  {
                                    key: 1,
                                    target: "_blank",
                                    href: "https://" + (0, F.SU)(i),
                                    tabIndex: We.value,
                                    textContent: (0, z.zw)((0, F.SU)(i)),
                                  },
                                  null,
                                  8,
                                  je
                                )),
                          ]),
                          Ke.value
                            ? ((0, M.wg)(),
                              (0, M.iD)(
                                "div",
                                { key: 5, class: "message", textContent: (0, z.zw)(Ke.value) },
                                null,
                                8,
                                Ie
                              ))
                            : (0, M.kq)("", !0),
                          (0, M.wy)(
                            (0, M._)(
                              "div",
                              { ref_key: "$topExtras", ref: d, class: "extras-menu" },
                              [
                                (0, M._)(
                                  "div",
                                  {
                                    textContent: (0, z.zw)((0, F.SU)(k.ag)("labelSettings")),
                                    onClick: t[4] || (t[4] = (e) => Xe(1)),
                                    tabindex: "0",
                                  },
                                  null,
                                  8,
                                  Me
                                ),
                                (0, M._)(
                                  "div",
                                  {
                                    textContent: (0, z.zw)((0, F.SU)(k.ag)("popupSettings")),
                                    onClick: t[5] || (t[5] = (e) => (x.value = !0)),
                                    tabindex: "0",
                                  },
                                  null,
                                  8,
                                  ze
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
                                            `${f.keys((0, F.SU)(E).updatableScripts).length}`
                                          )
                                        ),
                                        onClick: ut,
                                        tabindex: "0",
                                      },
                                      null,
                                      8,
                                      Fe
                                    ))
                                  : (0, M.kq)("", !0),
                                /^(https?|file):/.test(null == (a = (0, F.SU)(E).tab) ? void 0 : a.url)
                                  ? ((0, M.wg)(),
                                    (0, M.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        textContent: (0, z.zw)((0, F.SU)(k.ag)("skipScripts")),
                                        onClick: Be,
                                        tabindex: "0",
                                      },
                                      null,
                                      8,
                                      He
                                    ))
                                  : (0, M.kq)("", !0),
                              ],
                              512
                            ),
                            [[H.F8, Te.value]]
                          ),
                          w.value
                            ? ((0, M.wg)(),
                              (0, M.iD)(
                                "div",
                                { key: 6, ref_key: "$extras", ref: c, class: "extras-menu" },
                                [
                                  ((0, M.wg)(!0),
                                  (0, M.iD)(
                                    M.HY,
                                    null,
                                    (0, M.Ko)(
                                      Re.value,
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
                                          $e
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
                                      onClick: rt,
                                    },
                                    null,
                                    8,
                                    qe
                                  ),
                                  (0, M._)(
                                    "div",
                                    {
                                      textContent: (0, z.zw)(
                                        w.value.data.config.removed
                                          ? (0, F.SU)(k.ag)("buttonRestore")
                                          : (0, F.SU)(k.ag)("buttonRemove")
                                      ),
                                      tabindex: "0",
                                      onClick: ot,
                                    },
                                    null,
                                    8,
                                    Oe
                                  ),
                                  "upd" in w.value
                                    ? ((0, M.wg)(),
                                      (0, M.iD)(
                                        "div",
                                        {
                                          key: 0,
                                          textContent: (0, z.zw)((0, F.SU)(k.ag)("buttonUpdate")),
                                          tabindex: "0",
                                          onClick: st,
                                        },
                                        null,
                                        8,
                                        Ze
                                      ))
                                    : (0, M.kq)("", !0),
                                ],
                                512
                              ))
                            : (0, M.kq)("", !0),
                        ],
                        46,
                        T
                      )
                    )
                  }
                )
              },
            }
          let Ee, Te, Re, Ye
          async function Le(e, { [j]: n, url: p }) {
            const g = 0 === n
            e[u] || f.assign(e[l], await (0, k.gj)("GetMoreIds", { url: p, [d]: g, [l]: e[l] })),
              g ? (E[S] = "off" !== e[s]) : await Ee,
              (E.commands = f.assign(e.menus, !g && E.commands))
            const m = E.idMap,
              v = m[0] || (m[0] = {}),
              b = m[n] || (m[n] = {}),
              x = h(y.Xw, e[l], null, (e, t) => t !== b[e] && e),
              C = f.keys(x).map(Number)
            if (C.length) {
              var U
              f.assign(b, x)
              const { frameScripts: t } = E,
                n = g ? E[c] : t
              ;(
                (null == (U = e[c]) ? void 0 : U.filter(({ props: { id: e } }) => C.includes(e))) ||
                f.assign(e, await (0, k.gj)("GetData", { ids: C }))[c]
              ).forEach((l) => {
                ;(0, w.d)(l, e)
                const { id: c } = l.props,
                  d = x[c],
                  m = d === u,
                  f = d === i,
                  b = n.find(({ props: e }) => e.id === c)
                if (b) l = b
                else if ((g || !(c in v)) && (n.push(l), g)) {
                  const e = t.findIndex(({ props: e }) => e.id === c)
                  e >= 0 && t.splice(e, 1)
                }
                ;(l.runs = d === a || d === r),
                  (l.pageUrl = p),
                  (l.failed = f || d === o || m),
                  (l[u] = m),
                  (l.syntax = d === o),
                  f && !E.injectionFailure && (E.injectionFailure = { fixable: e[s] === r })
              })
            }
            g && Te(),
              Ye ||
                ((Ye = Math.max(innerHeight, 100)), (t.onresize = Je), I.T && Ye > document.body.clientHeight && Je())
          }
          function Pe(e = 100) {
            Ee = new b((t) => {
              ;(Te = t), setTimeout(t, e)
            })
          }
          async function We() {
            Pe(),
              f.assign(E, {
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
                  ? ((a = "noninjectable"), (t.injectable = !1), Te())
                  : a === p
                    ? (a = "scripts-skipped")
                    : a === S
                      ? (a = "scripts-disabled")
                      : (t[a] = l)
                : (n = ""),
              f.assign(E, t, { failure: a, failureText: n }),
              e)
            )
              for (const t in e) C.Z.SetPopup(...e[t])
            Re ||
              ((Re = browser.runtime.connect({ name: `Popup:${e ? "C" : ""}:${t.tab.id}` })),
              Re.onMessage.addListener(We))
          }
          function Ae(e) {
            return e && (!E.tab || E.tab.id === e.id)
          }
          function Je(e) {
            const n = innerHeight
            ;(!e || (n > Ye && "loading" !== document.readyState && document.body.clientHeight - 1 > n)) &&
              ((t.onresize = null), (E.maxHeight = n + "px")),
              (Ye = n)
          }
          We(),
            (0, I.sY)(Ke),
            f.assign(C.Z, {
              Run({ reset: e }, { [j]: t, tab: n }) {
                e && !t && Ae(n) && We()
              },
              SetPopup(e, t) {
                if (Ae(t.tab)) return Le(e, t)
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
              var t = new v("Cannot find module '" + e + "'")
              throw ((t.code = "MODULE_NOT_FOUND"), t)
            }
            return a[e]
          }
          ;(l.keys = () => f.keys(a)), (l.resolve = i), (e.exports = l), (l.id = 6291)
        },
      },
      k = {}
    function C(e) {
      var t = k[e]
      if (void 0 !== t) return t.exports
      var n = (k[e] = { exports: {} })
      return x[e].call(n.exports, n, n.exports, C), n.exports
    }
    ;(C.m = x),
      (e = []),
      (C.O = (t, n, a, l) => {
        if (!n) {
          var i = 1 / 0
          for (r = 0; r < e.length; r++) {
            for (var [n, a, l] = e[r], o = !0, s = 0; s < n.length; s++)
              (!1 & l || i >= l) && f.keys(C.O).every((e) => C.O[e](n[s]))
                ? n.splice(s--, 1)
                : ((o = !1), l < i && (i = l))
            if (o) {
              e.splice(r--, 1)
              var u = a()
              void 0 !== u && (t = u)
            }
          }
          return t
        }
        l = l || 0
        for (var r = e.length; r > 0 && e[r - 1][2] > l; r--) e[r] = e[r - 1]
        e[r] = [n, a, l]
      }),
      (C.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e
        return C.d(t, { a: t }), t
      }),
      (C.d = (e, t) => {
        for (var n in t) C.o(t, n) && !C.o(e, n) && f.defineProperty(e, n, { enumerable: !0, get: t[n] })
      }),
      (C.o = (e, t) => f.prototype.hasOwnProperty.call(e, t)),
      (C.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          f.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          f.defineProperty(e, "__esModule", { value: !0 })
      }),
      (C.j = 382),
      (() => {
        var e = { 382: 0 }
        C.O.j = (t) => 0 === e[t]
        var t = (t, n) => {
            var a,
              l,
              [i, o, s] = n,
              u = 0
            if (i.some((t) => 0 !== e[t])) {
              for (a in o) C.o(o, a) && (C.m[a] = o[a])
              if (s) var r = s(C)
            }
            for (t && t(n); u < i.length; u++) (l = i[u]), C.o(e, l) && e[l] && e[l][0](), (e[l] = 0)
            return C.O(r)
          },
          n = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
        n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)))
      })()
    var w = C.O(void 0, [84], () => C(8500))
    w = C.O(w)
  })()
}
