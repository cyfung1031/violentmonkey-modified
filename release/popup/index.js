{
  const e = this,
    { window: t } = e,
    n = "auto",
    a = "content",
    l = "ids",
    o = -1,
    i = 2,
    s = "injectInto",
    u = "more",
    r = "page",
    d = "scripts",
    c = "top",
    p = "SkipScripts",
    v = (e) => null != e && "object" == typeof e,
    {
      Boolean: m,
      Error: f,
      Object: b,
      Promise: x,
      addEventListener: g,
      removeEventListener: C,
      chrome: k,
      performance: R,
    } = e,
    { apply: y } = Reflect,
    h = (y.call.bind({}.hasOwnProperty), b.call.bind(b.call)),
    E = "isApplied",
    L = "contextualIdentities" in k || "activityLog" in k,
    I = (k.runtime.getURL("/").slice(0, -1), k.runtime.getManifest()),
    _ =
      (k.runtime.getURL(I.options_ui.page).split("#", 1)[0],
      k.runtime.getURL(I.icons[16].replace("16.png", "")),
      "settings"),
    w = "frameId"
  ;(() => {
    var e,
      g = {
        5848: (e, f, g) => {
          "use strict"
          g(2272)
          var C = g(8916),
            k = g(8387),
            R = g(8852),
            y = g(5329),
            F = g(6808),
            S = (g(5005), g(641)),
            X = g(4526),
            K = g(953),
            j = g(3751),
            $ = g(618),
            A = g(6106),
            M = g(3417),
            O = g(317),
            D = g(9478),
            U = g(7119)
          const W = (0, K.Kh)({
              scripts: [],
              frameScripts: [],
              idMap: {},
              commands: {},
              domain: "",
              injectionFailure: null,
              injectable: !0,
            }),
            Q = ["data-is-applied"],
            T = { class: "flex menu-buttons" },
            q = (0, S.Lk)("div", { class: "logo" }, [(0, S.Lk)("img", { src: "/public/images/icon128.png" })], -1),
            P = ["data-message", "tabIndex"],
            H = ["data-message", "tabIndex"],
            G = ["data-message", "tabIndex"],
            B = ["tabIndex"],
            N = { key: 0, class: "menu" },
            V = { class: "menu-item menu-area menu-find" },
            J = ["href", "data-message", "tabIndex"],
            Y = { key: 1, class: "failure-reason" },
            z = ["textContent"],
            Z = ["textContent"],
            ee = { key: 2, class: "mb-1c menu settings" },
            te = ["textContent"],
            ne = ["data-type"],
            ae = ["tabIndex", "onClick"],
            le = ["textContent", "data-totals"],
            oe = { class: "submenu" },
            ie = ["tabIndex", "data-message", "onFocus", "onKeydown", "onClick"],
            se = ["src"],
            ue = ["onClick", "onContextmenu", "onMousedown"],
            re = ["textContent"],
            de = ["title"],
            ce = ["title", "data-error"],
            pe = { class: "submenu-buttons" },
            ve = ["tabIndex", "onClick", "title"],
            me = ["tabIndex", "._item"],
            fe = { key: 0, class: "excludes-menu mb-1c mr-1c" },
            be = ["textContent", "title", "onClick"],
            xe = ["onUpdate:modelValue", "onKeypress", "onKeydown"],
            ge = ["textContent", "onClick"],
            Ce = ["textContent", "onClick"],
            ke = { class: "mb-1" },
            Re = ["textContent", "href"],
            ye = { class: "submenu-commands" },
            he = ["tabIndex", ".cmd", "data-message"],
            Ee = ["textContent"],
            Le = ["textContent"],
            Ie = ["textContent"],
            _e = ["textContent"],
            we = ["textContent", "tabIndex"],
            Fe = ["href", "tabIndex", "textContent"],
            Se = ["textContent"],
            Xe = ["textContent"],
            Ke = ["textContent"],
            je = ["textContent"],
            $e = ["textContent"],
            Ae = ["href", "data-message", "textContent"],
            Me = ["textContent"],
            Oe = ["textContent"],
            De = ["textContent"],
            Ue = {
              __name: "app",
              setup(e) {
                let a, l
                const o = I.homepage_url.split("/")[2],
                  i = `${I.name} 2.31.0`,
                  s = (0, C.Ru)("msgTardyMatch"),
                  u = ["start", "body", "end", "idle"],
                  r = (0, K.Kh)({}),
                  d = (0, K.KR)(),
                  c = (0, K.KR)(),
                  f = (0, K.Kh)((0, y.je)(M.Ay, [E, M.nx, M.We, M.qL])),
                  x = (0, K.KR)("scripts"),
                  g = (0, K.KR)(),
                  R = (0, K.KR)(),
                  h = (0, K.KR)(),
                  Ue = (0, K.KR)(),
                  We = (0, K.KR)(),
                  Qe = (0, K.KR)(),
                  Te = (0, S.EW)(() => {
                    const e = R.value.data,
                      t = (0, C.wp)(e),
                      n = !t && (0, C.nS)(e)
                    return [t && [t, (0, C.Ru)("menuFeedback")], n && [n, (0, C.Ru)("buttonHome")]].filter(m)
                  }),
                  qe = (0, S.EW)(() => {
                    const { sort: e, enabledFirst: t, groupRunAt: n, hideDisabled: a } = f[M.nx],
                      { injectable: l } = W,
                      o = "group" === a,
                      i = f[M.qL]
                    let s
                    return [
                      l && ["scripts", (0, C.Ru)("menuMatchedScripts"), o || null],
                      l && o && ["disabled", (0, C.Ru)("menuMatchedDisabledScripts"), !1],
                      ["frameScripts", (0, C.Ru)("menuMatchedFrameScripts")],
                    ]
                      .filter(m)
                      .map(([l, o, r]) => {
                        let d = W[l] || W.scripts
                        null != r && (d = d.filter((e) => !e.config.enabled == !r))
                        const c = d.length,
                          p = null == r ? d.reduce((e, t) => e + t.config.enabled, 0) : c
                        return (
                          ("hide" !== a && !0 !== a) || (d = d.filter((e) => e.config.enabled)),
                          (d = d
                            .map((a) => {
                              const l = (0, C.tj)(a),
                                { id: o } = a.props,
                                { enabled: r, removed: d, shouldUpdate: c } = a.config,
                                p = !d && (0, C.MO)(a, { enabledOnly: i }),
                                v = {
                                  id: o,
                                  name: l,
                                  data: a,
                                  key: `${t && +!r}${"alpha" === e ? l.toLowerCase() : n && u.indexOf((0, C.G8)(a))}${1e6 + a.props.position}`,
                                  excludes: null,
                                }
                              return p && (v.upd = null), p && c && (s || (s = W.updatableScripts = {}), (s[o] = v)), v
                            })
                            .sort((e, t) => (e.key < t.key ? -1 : e.key > t.key))),
                          c && { name: l, title: o, list: d, totals: p < c ? `${p} / ${c}` : `${c}` }
                        )
                      })
                      .filter(m)
                  }),
                  Pe = (0, S.EW)(() => {
                    const e = encodeURIComponent(W.domain)
                    return {
                      [`${(0, C.Ru)("menuFindScripts")} (GF)`]: `https://greasyfork.org/scripts/by-site/${e}`,
                      OUJS: `https://openuserjs.org/?q=${e}`,
                    }
                  }),
                  He = (0, S.EW)(
                    () =>
                      ("scripts-skipped" === W.failure || (E in W && W[E] !== f[E]) || b.values(r).some(m)) &&
                      (0, C.Ru)("reloadTab")
                  ),
                  Ge = (0, S.EW)(() => (R.value ? -1 : 0))
                function Be({ rect: e }, { rect: t }) {
                  return e.top - t.top || e.left - t.left
                }
                function Ne() {
                  return browser.tabs.reload(W.tab.id)
                }
                async function Ve(e) {
                  const t = e.currentTarget,
                    n = t._item,
                    a = n.data,
                    l = a ? R : Qe
                  if (!l.value) {
                    e.stopPropagation(), (l.value = n), (n.el = t.closest(".script") || t), await (0, S.dY)()
                    const o = (a ? d : c).value,
                      i = Math.min(innerHeight - o.getBoundingClientRect().height, t.getBoundingClientRect().bottom)
                    o.style.top = `${i}px`
                  }
                }
                function Je(e) {
                  return "toggle-" + (e ? "on" : "off")
                }
                function Ye() {
                  ;(0, C.dr)(p, W.tab)
                }
                function ze() {
                  A.A.set(E, (f[E] = !f[E])), lt(), xt()
                }
                function Ze(e) {
                  ;(0, C.dr)("OpenDashboard", 1 === e || 1 === e.button || e.ctrlKey ? _ : "").then(close)
                }
                function et(e) {
                  const t = e.target.closest("a[href][target=_blank]")
                  t && (e.preventDefault(), (0, C.dr)("TabOpen", { url: t.href }).then(close))
                }
                function tt(e) {
                  ;(0, C.dr)("OpenEditor", e.data.props.id).then(close)
                }
                function nt(e) {
                  const { type: t, currentTarget: n } = e
                  if ("mousedown" === t) (a = n), e.preventDefault()
                  else if ("keydown" === t || a === n) {
                    const [t, a, l] = n.cmd,
                      o = W.idMap,
                      i = +b.keys(o).find((e) => t in o[e])
                    ;(0, C.OV)(
                      W.tab.id,
                      "Command",
                      {
                        id: t,
                        key: a,
                        evt: (0, y.je)(e, [
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
                      { [w]: i }
                    ).then(l && close)
                  }
                }
                function at(e) {
                  const { data: t } = e,
                    n = !t.config.enabled,
                    { id: a } = t.props
                  ;(0, C.dr)("UpdateScriptInfo", { id: a, config: { enabled: n } }).then(() => {
                    ;(t.config.enabled = n), lt() || (r[a] = n !== t.runs)
                  })
                }
                function lt() {
                  if (A.A.get("autoReload")) return Ne()
                }
                function ot() {
                  ;(0, C.dr)("OpenEditor").then(close)
                }
                async function it() {
                  A.A.set("defaultInjectInto", n), await (0, C.F1)(100), await browser.tabs.reload(), t.close()
                }
                function st() {
                  const {
                      config: e,
                      props: { id: t },
                    } = R.value.data,
                    n = +!e.removed
                  ;(e.removed = n), (0, C.dr)("MarkRemoved", { id: t, removed: n })
                }
                function ut() {
                  ;(0, C.dr)("CheckUpdate", R.value.data.props.id)
                }
                function rt() {
                  ;(0, C.dr)("CheckUpdate", b.keys(W.updatableScripts).map(Number))
                }
                async function dt() {
                  const e = R.value,
                    { data: t } = e,
                    n = t.pageUrl,
                    { host: a, domain: l } = await (0, C.dr)("GetTabDomain", n)
                  ;(e.excludes = [`${n.split("#")[0]}*`, { host: a, group: `*.${l}` }]),
                    await (0, C.F1)(),
                    e.el.querySelector("input").focus()
                }
                function ct(e) {
                  ;(e.excludes = null), mt(e)
                }
                async function pt(e, t) {
                  await (0, C.dr)("UpdateScriptInfo", {
                    id: e.data.props.id,
                    custom: {
                      excludeMatch: [...(e.data.custom.excludeMatch || []), ...[t || e.excludes[0].trim()].filter(m)],
                    },
                  }),
                    ct(e),
                    lt()
                }
                function vt(e) {
                  var t
                  const n = []
                  for (let e = 0, t = document.querySelectorAll('[tabindex="0"]'); e < t.length; e++) {
                    const a = t[e],
                      l = a.getBoundingClientRect()
                    l.width && l.height && ((a.rect = l), n.push(a))
                  }
                  n.sort(Be)
                  let a,
                    l = n.indexOf((0, F.bq)())
                  if (l < 0) l = 0
                  else {
                    const t = "u" === e,
                      o = t || "l" === e ? -1 : 1,
                      i = t || "d" === e ? "top" : "left",
                      s = n[l].rect[i]
                    for (let e = l + o; e >= 0 && e < n.length; e += o)
                      if ((s - n[e].rect[i]) * o < 0) {
                        ;(l = e), (a = !0)
                        break
                      }
                    if (!a) return
                    if (t) for (; l > 0 && n[l - 1].rect.top === n[l].rect.top; ) l -= 1
                  }
                  null == (t = n[l]) || t.focus()
                }
                function mt(e) {
                  e && (e = e.el) && (e.querySelector(".menu-area") || e).focus()
                }
                function ft({ target: e }) {
                  e.tabIndex >= 0 ? e.focus() : e.closest("[data-message]") || (Ue.value = "")
                }
                function bt({ target: e }) {
                  e !== (0, F.bq)() || (0, U.Xy)(e) || e.blur()
                }
                function xt() {
                  var e
                  Ue.value = (null == (e = (0, F.bq)()) ? void 0 : e.dataset.message) || ""
                }
                function gt(e) {
                  var t, n
                  return (
                    (null == (t = R.value) ? void 0 : t.id) === e.id ||
                    (null == (n = h.value) ? void 0 : n.id) === e.id ||
                    l
                  )
                }
                return (
                  A.A.hook((e) => {
                    for (const t in f) {
                      const n = e[t]
                      null != n &&
                        ((f[t] = n && v(n) ? { ...f[t], ...n } : n),
                        t === M.We && (document.body.style.width = n + "px"))
                    }
                  }),
                  b.assign(k.A, {
                    async UpdateScript({ update: { error: e, message: t }, where: { id: n } } = {}) {
                      for (let a = 0, l = qe.value; a < l.length; a++) {
                        const { list: o } = l[a]
                        for (let a = 0; a < o.length; a++) {
                          const l = o[a]
                          if (l.id === n) return (l.upd = e || t), void (l.updError = e)
                        }
                      }
                    },
                  }),
                  (0, S.sV)(() => {
                    U.vW.enable(),
                      U.vW.register("escape", () => {
                        var e
                        const n = R.value || Qe.value
                        n
                          ? ((R.value = Qe.value = null), mt(n))
                          : null != (e = (0, F.bq)()) && e.value
                            ? (0, F.bq)().blur()
                            : t.close()
                      }),
                      L && (U.vW.register("tab", () => (0, U.I1)(1)), U.vW.register("s-tab", () => (0, U.I1)(-1)))
                    for (let e = 0, t = ["up", "down", "left", "right"]; e < t.length; e++) {
                      const n = t[e]
                      U.vW.register(n, vt.bind(null, n[0]), { condition: "!inputFocus" })
                    }
                    U.vW.register(
                      "e",
                      () => {
                        tt(h.value)
                      },
                      { condition: "!inputFocus" }
                    )
                  }),
                  (0, S.n)(() => {
                    l = !document.hasFocus()
                  }),
                  (e, t) => {
                    var n, a
                    return (
                      (0, S.uX)(),
                      (0, S.CE)(
                        "div",
                        {
                          class: (0, X.C4)(["page-popup flex flex-col", (0, K.R1)(W).failure]),
                          onClick: t[6] || (t[6] = (e) => (R.value = Qe.value = null)),
                          onClickCapture: et,
                          onMouseenterCapture: ft,
                          onMouseleaveCapture: bt,
                          onFocusCapture: xt,
                          "data-is-applied": f.isApplied,
                          style: (0, X.Tr)({ "max-height": (0, K.R1)(W).maxHeight }),
                        },
                        [
                          (0, S.Lk)("div", T, [
                            q,
                            (0, S.Lk)("div", { class: "flex-1 ext-name", textContent: i }),
                            (0, S.Lk)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": f.isApplied
                                  ? (0, K.R1)(C.Ru)("menuScriptEnabled")
                                  : (0, K.R1)(C.Ru)("menuScriptDisabled"),
                                tabIndex: Ge.value,
                                onClick: ze,
                              },
                              [(0, S.bF)((0, K.R1)(O.A), { name: Je(f.isApplied) }, null, 8, ["name"])],
                              8,
                              P
                            ),
                            (0, S.Lk)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message":
                                  (0, K.R1)(C.Ru)("menuDashboard") + "\n" + (0, K.R1)(C.Ru)("popupSettingsHint"),
                                tabIndex: Ge.value,
                                onContextmenu: t[0] || (t[0] = (0, j.D$)((e) => (g.value = !g.value), ["prevent"])),
                                onAuxclick: t[1] || (t[1] = (e) => 2 !== e.button && Ze(e)),
                                onClick: Ze,
                              },
                              [(0, S.bF)((0, K.R1)(O.A), { name: "cog" })],
                              40,
                              H
                            ),
                            (0, S.Lk)(
                              "span",
                              {
                                class: "menu-area",
                                "data-message": (0, K.R1)(C.Ru)("menuNewScript"),
                                tabIndex: Ge.value,
                                onClick: ot,
                              },
                              [(0, S.bF)((0, K.R1)(O.A), { name: "plus" })],
                              8,
                              G
                            ),
                            (0, S.Lk)(
                              "span",
                              { class: "menu-area", tabIndex: Ge.value, "._item": {}, onClick: Ve },
                              [(0, S.bF)((0, K.R1)(O.A), { name: "more" })],
                              40,
                              B
                            ),
                          ]),
                          (0, K.R1)(W).injectable
                            ? (0, S.bo)(
                                ((0, S.uX)(),
                                (0, S.CE)(
                                  "div",
                                  N,
                                  [
                                    (0, S.Lk)("div", V, [
                                      ((0, S.uX)(!0),
                                      (0, S.CE)(
                                        S.FK,
                                        null,
                                        (0, S.pI)(
                                          Pe.value,
                                          (e, t, n) => (
                                            (0, S.uX)(),
                                            (0, S.CE)(
                                              S.FK,
                                              { key: e },
                                              [
                                                (0, S.Lk)(
                                                  "a",
                                                  {
                                                    target: "_blank",
                                                    class: (0, X.C4)({ ellipsis: !n, "mr-1": !n, "ml-1": n }),
                                                    href: e,
                                                    "data-message": e.split("://")[1],
                                                    tabIndex: Ge.value,
                                                  },
                                                  [
                                                    n
                                                      ? (0, S.Q3)("", !0)
                                                      : ((0, S.uX)(),
                                                        (0, S.Wv)((0, K.R1)(O.A), { key: 0, name: "search" })),
                                                    (0, S.eW)((0, X.v_)(t), 1),
                                                  ],
                                                  10,
                                                  J
                                                ),
                                                n
                                                  ? (0, S.Q3)("", !0)
                                                  : ((0, S.uX)(), (0, S.CE)(S.FK, { key: 0 }, [(0, S.eW)("/")], 64)),
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
                                [[j.aG, (0, K.R1)(W).domain]]
                              )
                            : (0, S.Q3)("", !0),
                          (0, K.R1)(W).failureText
                            ? ((0, S.uX)(),
                              (0, S.CE)("div", Y, [
                                (0, S.Lk)("span", { textContent: (0, X.v_)((0, K.R1)(W).failureText) }, null, 8, z),
                                (0, K.R1)(W).blacklisted
                                  ? ((0, S.uX)(),
                                    (0, S.CE)(
                                      "code",
                                      {
                                        key: 0,
                                        textContent: (0, X.v_)((0, K.R1)(W).blacklisted),
                                        class: "ellipsis inline-block",
                                      },
                                      null,
                                      8,
                                      Z
                                    ))
                                  : (0, S.Q3)("", !0),
                              ]))
                            : (0, S.Q3)("", !0),
                          g.value
                            ? ((0, S.uX)(),
                              (0, S.CE)("div", ee, [
                                (0, S.bF)(D.A),
                                (0, S.Lk)(
                                  "button",
                                  {
                                    textContent: (0, X.v_)((0, K.R1)(C.Ru)("buttonClose")),
                                    onClick: t[2] || (t[2] = (e) => (g.value = !1)),
                                  },
                                  null,
                                  8,
                                  te
                                ),
                              ]))
                            : (0, S.Q3)("", !0),
                          ((0, S.uX)(!0),
                          (0, S.CE)(
                            S.FK,
                            null,
                            (0, S.pI)(
                              qe.value,
                              (e) => (
                                (0, S.uX)(),
                                (0, S.CE)(
                                  "div",
                                  {
                                    class: (0, X.C4)([
                                      "menu menu-scripts flex flex-col",
                                      { expand: x.value === e.name, "block-scroll": R.value },
                                    ]),
                                    "data-type": e.name,
                                    key: e.name,
                                  },
                                  [
                                    (0, S.Lk)(
                                      "div",
                                      {
                                        class: "menu-item menu-area menu-group",
                                        tabIndex: Ge.value,
                                        onClick: (t) => {
                                          return (n = e.name), void (x.value = x.value === n ? null : n)
                                          var n
                                        },
                                      },
                                      [
                                        (0, S.bF)((0, K.R1)(O.A), { name: "arrow", class: "icon-collapse" }),
                                        (0, S.Lk)(
                                          "div",
                                          {
                                            class: "flex-auto",
                                            textContent: (0, X.v_)(e.title),
                                            "data-totals": e.totals,
                                          },
                                          null,
                                          8,
                                          le
                                        ),
                                      ],
                                      8,
                                      ae
                                    ),
                                    (0, S.Lk)("div", oe, [
                                      ((0, S.uX)(!0),
                                      (0, S.CE)(
                                        S.FK,
                                        null,
                                        (0, S.pI)(
                                          e.list,
                                          (e) => (
                                            (0, S.uX)(),
                                            (0, S.CE)(
                                              "div",
                                              {
                                                key: e.id,
                                                class: (0, X.C4)([
                                                  {
                                                    disabled: !e.data.config.enabled,
                                                    failed: e.data.failed,
                                                    removed: e.data.config.removed,
                                                    runs: e.data.runs,
                                                    "extras-shown": R.value === e,
                                                    "excludes-shown": e.excludes,
                                                  },
                                                  "script",
                                                ]),
                                              },
                                              [
                                                (0, S.Lk)(
                                                  "div",
                                                  {
                                                    class: "menu-item menu-area",
                                                    tabIndex: Ge.value,
                                                    "data-message": e.name,
                                                    onFocus: (t) => (h.value = e),
                                                    onKeydown: [
                                                      (0, j.jR)(
                                                        (0, j.D$)((t) => tt(e), ["exact", "stop"]),
                                                        ["enter"]
                                                      ),
                                                      (0, j.jR)(
                                                        (0, j.D$)((t) => at(e), ["exact", "stop"]),
                                                        ["space"]
                                                      ),
                                                    ],
                                                    onClick: (t) => at(e),
                                                  },
                                                  [
                                                    (0, S.Lk)(
                                                      "img",
                                                      { class: "script-icon", src: e.data.safeIcon },
                                                      null,
                                                      8,
                                                      se
                                                    ),
                                                    (0, S.bF)(
                                                      (0, K.R1)(O.A),
                                                      { name: Je(e.data.config.enabled) },
                                                      null,
                                                      8,
                                                      ["name"]
                                                    ),
                                                    (0, S.Lk)(
                                                      "div",
                                                      {
                                                        class: "script-name ellipsis",
                                                        onClick: (0, j.D$)((t) => tt(e), ["ctrl", "exact", "stop"]),
                                                        onContextmenu: (0, j.D$)(
                                                          (t) => tt(e),
                                                          ["exact", "stop", "prevent"]
                                                        ),
                                                        onMousedown: (0, j.D$)(
                                                          (t) => tt(e),
                                                          ["middle", "exact", "stop"]
                                                        ),
                                                      },
                                                      [
                                                        e.data.syntax
                                                          ? ((0, S.uX)(),
                                                            (0, S.CE)(
                                                              "sup",
                                                              {
                                                                key: 0,
                                                                class: "syntax",
                                                                textContent: (0, X.v_)(
                                                                  (0, K.R1)(C.Ru)("msgSyntaxError")
                                                                ),
                                                              },
                                                              null,
                                                              8,
                                                              re
                                                            ))
                                                          : (0, S.Q3)("", !0),
                                                        (0, S.eW)(" " + (0, X.v_)(e.name) + " ", 1),
                                                        !(0, K.R1)(W).failure && e.data.more
                                                          ? ((0, S.uX)(),
                                                            (0, S.CE)(
                                                              "a",
                                                              {
                                                                key: 1,
                                                                class: "tardy",
                                                                tabindex: "0",
                                                                title: (0, K.R1)(s),
                                                                onClick:
                                                                  t[3] ||
                                                                  (t[3] = (0, j.D$)(
                                                                    (e) =>
                                                                      (We.value =
                                                                        We.value === (0, K.R1)(s) ? "" : (0, K.R1)(s)),
                                                                    ["stop"]
                                                                  )),
                                                              },
                                                              [(0, S.bF)((0, K.R1)(O.A), { name: "info" })],
                                                              8,
                                                              de
                                                            ))
                                                          : (0, S.Q3)("", !0),
                                                      ],
                                                      40,
                                                      ue
                                                    ),
                                                    (0, S.Lk)(
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
                                                (0, S.bo)(
                                                  (0, S.Lk)(
                                                    "div",
                                                    pe,
                                                    [
                                                      (0, S.Lk)(
                                                        "div",
                                                        {
                                                          class: "submenu-button",
                                                          tabIndex: Ge.value,
                                                          onClick: (t) => tt(e),
                                                          title: (0, K.R1)(C.Ru)("buttonEditClickHint"),
                                                        },
                                                        [(0, S.bF)((0, K.R1)(O.A), { name: "code" })],
                                                        8,
                                                        ve
                                                      ),
                                                      (0, S.Lk)(
                                                        "div",
                                                        {
                                                          class: "submenu-button",
                                                          tabIndex: Ge.value,
                                                          "._item": e,
                                                          onClick: Ve,
                                                        },
                                                        [(0, S.bF)((0, K.R1)(O.A), { name: "more" })],
                                                        40,
                                                        me
                                                      ),
                                                    ],
                                                    512
                                                  ),
                                                  [[j.aG, gt(e)]]
                                                ),
                                                e.excludes
                                                  ? ((0, S.uX)(),
                                                    (0, S.CE)("div", fe, [
                                                      ((0, S.uX)(!0),
                                                      (0, S.CE)(
                                                        S.FK,
                                                        null,
                                                        (0, S.pI)(
                                                          e.excludes[1],
                                                          (t, n) => (
                                                            (0, S.uX)(),
                                                            (0, S.CE)(
                                                              "button",
                                                              {
                                                                key: n,
                                                                textContent: (0, X.v_)(t),
                                                                class: "ellipsis",
                                                                title: `*://${t}/*`,
                                                                onClick: (n) => pt(e, `*://${t}/*`),
                                                              },
                                                              null,
                                                              8,
                                                              be
                                                            )
                                                          )
                                                        ),
                                                        128
                                                      )),
                                                      (0, S.bo)(
                                                        (0, S.Lk)(
                                                          "input",
                                                          {
                                                            "onUpdate:modelValue": (t) => (e.excludes[0] = t),
                                                            spellcheck: "false",
                                                            onKeypress: (0, j.jR)((t) => pt(e), ["enter"]),
                                                            onKeydown: (0, j.jR)(
                                                              (0, j.D$)((t) => ct(e), ["exact", "stop", "prevent"]),
                                                              ["esc"]
                                                            ),
                                                          },
                                                          null,
                                                          40,
                                                          xe
                                                        ),
                                                        [[j.Jo, e.excludes[0]]]
                                                      ),
                                                      (0, S.Lk)(
                                                        "button",
                                                        {
                                                          textContent: (0, X.v_)((0, K.R1)(C.Ru)("buttonOK")),
                                                          onClick: (t) => pt(e),
                                                        },
                                                        null,
                                                        8,
                                                        ge
                                                      ),
                                                      (0, S.Lk)(
                                                        "button",
                                                        {
                                                          textContent: (0, X.v_)((0, K.R1)(C.Ru)("buttonCancel")),
                                                          onClick: (t) => ct(e),
                                                        },
                                                        null,
                                                        8,
                                                        Ce
                                                      ),
                                                      (0, S.Lk)("details", ke, [
                                                        (0, S.Lk)("summary", null, [
                                                          (0, S.bF)((0, K.R1)(O.A), { name: "info" }),
                                                        ]),
                                                        (0, S.Lk)("small", null, [
                                                          (0, S.eW)(
                                                            (0, X.v_)((0, K.R1)(C.Ru)("menuExcludeHint")) +
                                                              " " +
                                                              (0, X.v_)((0, K.R1)(C.Ru)("labelRelated")),
                                                            1
                                                          ),
                                                          (0, S.Lk)(
                                                            "a",
                                                            {
                                                              textContent: (0, X.v_)(
                                                                (0, K.R1)(C.Ru)("labelExcludeMatch")
                                                              ),
                                                              target: "_blank",
                                                              href: (0, K.R1)($.kh),
                                                            },
                                                            null,
                                                            8,
                                                            Re
                                                          ),
                                                        ]),
                                                      ]),
                                                    ]))
                                                  : (0, S.Q3)("", !0),
                                                (0, S.Lk)("div", ye, [
                                                  ((0, S.uX)(!0),
                                                  (0, S.CE)(
                                                    S.FK,
                                                    null,
                                                    (0, S.pI)(
                                                      (0, K.R1)(W).commands[e.id],
                                                      ({ autoClose: t = !0, text: n, title: a }, l) => (
                                                        (0, S.uX)(),
                                                        (0, S.CE)(
                                                          "div",
                                                          {
                                                            class: "menu-item menu-area",
                                                            key: l,
                                                            tabIndex: Ge.value,
                                                            ".cmd": [e.id, l, t],
                                                            "data-message": a || n,
                                                            onMousedown: nt,
                                                            onMouseup: nt,
                                                            onKeydown: [
                                                              (0, j.jR)(nt, ["enter"]),
                                                              (0, j.jR)(nt, ["space"]),
                                                            ],
                                                          },
                                                          [
                                                            (0, S.bF)((0, K.R1)(O.A), { name: "command" }),
                                                            (0, S.Lk)(
                                                              "div",
                                                              {
                                                                class: "flex-auto ellipsis",
                                                                textContent: (0, X.v_)(n),
                                                              },
                                                              null,
                                                              8,
                                                              Ee
                                                            ),
                                                          ],
                                                          40,
                                                          he
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
                                  ne
                                )
                              )
                            ),
                            128
                          )),
                          We.value || (0, K.R1)(W).injectionFailure
                            ? ((0, S.uX)(),
                              (0, S.CE)(
                                "div",
                                { key: 3, class: (0, X.C4)(["failure-reason", { note: We.value }]) },
                                [
                                  (0, S.Lk)(
                                    "div",
                                    { textContent: (0, X.v_)(We.value || (0, K.R1)(C.Ru)("menuInjectionFailed")) },
                                    null,
                                    8,
                                    Le
                                  ),
                                  !We.value && (0, K.R1)(W).injectionFailure.fixable
                                    ? ((0, S.uX)(),
                                      (0, S.CE)(
                                        "a",
                                        {
                                          key: 0,
                                          textContent: (0, X.v_)((0, K.R1)(C.Ru)("menuInjectionFailedFix")),
                                          href: "#",
                                          onClick: (0, j.D$)(it, ["prevent"]),
                                        },
                                        null,
                                        8,
                                        Ie
                                      ))
                                    : (0, S.Q3)("", !0),
                                ],
                                2
                              ))
                            : (0, S.Q3)("", !0),
                          null != (n = (0, K.R1)(W).tab) && n.incognito
                            ? ((0, S.uX)(),
                              (0, S.CE)(
                                "div",
                                {
                                  key: 4,
                                  class: "incognito",
                                  textContent: (0, X.v_)((0, K.R1)(C.Ru)("msgIncognitoChanges")),
                                },
                                null,
                                8,
                                _e
                              ))
                            : (0, S.Q3)("", !0),
                          (0, S.Lk)("footer", null, [
                            He.value
                              ? ((0, S.uX)(),
                                (0, S.CE)(
                                  "a",
                                  { key: 0, textContent: (0, X.v_)(He.value), tabIndex: Ge.value, onClick: Ne },
                                  null,
                                  8,
                                  we
                                ))
                              : ((0, S.uX)(),
                                (0, S.CE)(
                                  "a",
                                  {
                                    key: 1,
                                    target: "_blank",
                                    href: "https://" + (0, K.R1)(o),
                                    tabIndex: Ge.value,
                                    textContent: (0, X.v_)((0, K.R1)(o)),
                                  },
                                  null,
                                  8,
                                  Fe
                                )),
                          ]),
                          Ue.value
                            ? ((0, S.uX)(),
                              (0, S.CE)(
                                "div",
                                { key: 5, class: "message", textContent: (0, X.v_)(Ue.value) },
                                null,
                                8,
                                Se
                              ))
                            : (0, S.Q3)("", !0),
                          (0, S.bo)(
                            (0, S.Lk)(
                              "div",
                              { ref_key: "$topExtras", ref: c, class: "extras-menu" },
                              [
                                (0, S.Lk)(
                                  "div",
                                  {
                                    textContent: (0, X.v_)((0, K.R1)(C.Ru)("labelSettings")),
                                    onClick: t[4] || (t[4] = (e) => Ze(1)),
                                    tabindex: "0",
                                  },
                                  null,
                                  8,
                                  Xe
                                ),
                                (0, S.Lk)(
                                  "div",
                                  {
                                    textContent: (0, X.v_)((0, K.R1)(C.Ru)("popupSettings")),
                                    onClick: t[5] || (t[5] = (e) => (g.value = !0)),
                                    tabindex: "0",
                                  },
                                  null,
                                  8,
                                  Ke
                                ),
                                (0, K.R1)(W).updatableScripts
                                  ? ((0, S.uX)(),
                                    (0, S.CE)(
                                      "div",
                                      {
                                        key: 0,
                                        textContent: (0, X.v_)(
                                          (0, K.R1)(C.Ru)(
                                            "updateListedCmd",
                                            `${b.keys((0, K.R1)(W).updatableScripts).length}`
                                          )
                                        ),
                                        onClick: rt,
                                        tabindex: "0",
                                      },
                                      null,
                                      8,
                                      je
                                    ))
                                  : (0, S.Q3)("", !0),
                                /^(https?|file):/.test(null == (a = (0, K.R1)(W).tab) ? void 0 : a.url)
                                  ? ((0, S.uX)(),
                                    (0, S.CE)(
                                      "div",
                                      {
                                        key: 1,
                                        textContent: (0, X.v_)((0, K.R1)(C.Ru)("skipScripts")),
                                        onClick: Ye,
                                        tabindex: "0",
                                      },
                                      null,
                                      8,
                                      $e
                                    ))
                                  : (0, S.Q3)("", !0),
                              ],
                              512
                            ),
                            [[j.aG, Qe.value]]
                          ),
                          R.value
                            ? ((0, S.uX)(),
                              (0, S.CE)(
                                "div",
                                { key: 6, ref_key: "$extras", ref: d, class: "extras-menu" },
                                [
                                  ((0, S.uX)(!0),
                                  (0, S.CE)(
                                    S.FK,
                                    null,
                                    (0, S.pI)(
                                      Te.value,
                                      ([e, t]) => (
                                        (0, S.uX)(),
                                        (0, S.CE)(
                                          "a",
                                          (0, S.v6)(
                                            {
                                              key: e,
                                              href: e,
                                              "data-message": e,
                                              tabindex: "0",
                                              textContent: (0, X.v_)(t),
                                              ref_for: !0,
                                            },
                                            (0, K.R1)(F.YY)
                                          ),
                                          null,
                                          16,
                                          Ae
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, S.Lk)(
                                    "div",
                                    {
                                      textContent: (0, X.v_)((0, K.R1)(C.Ru)("menuExclude")),
                                      tabindex: "0",
                                      onClick: dt,
                                    },
                                    null,
                                    8,
                                    Me
                                  ),
                                  (0, S.Lk)(
                                    "div",
                                    {
                                      textContent: (0, X.v_)(
                                        R.value.data.config.removed
                                          ? (0, K.R1)(C.Ru)("buttonRestore")
                                          : (0, K.R1)(C.Ru)("buttonRemove")
                                      ),
                                      tabindex: "0",
                                      onClick: st,
                                    },
                                    null,
                                    8,
                                    Oe
                                  ),
                                  "upd" in R.value
                                    ? ((0, S.uX)(),
                                      (0, S.CE)(
                                        "div",
                                        {
                                          key: 0,
                                          textContent: (0, X.v_)((0, K.R1)(C.Ru)("buttonUpdate")),
                                          tabindex: "0",
                                          onClick: ut,
                                        },
                                        null,
                                        8,
                                        De
                                      ))
                                    : (0, S.Q3)("", !0),
                                ],
                                512
                              ))
                            : (0, S.Q3)("", !0),
                        ],
                        46,
                        Q
                      )
                    )
                  }
                )
              },
            }
          let We, Qe, Te, qe
          async function Pe(e, { [w]: n, url: p }) {
            const v = 0 === n
            e[u] || b.assign(e[l], await (0, C.dr)("GetMoreIds", { url: p, [c]: v, [l]: e[l] })),
              v ? (W[E] = "off" !== e[s]) : await We,
              (W.commands = b.assign(e.menus, !v && W.commands))
            const m = W.idMap,
              f = m[0] || (m[0] = {}),
              x = m[n] || (m[n] = {}),
              g = h(y.BJ, e[l], null, (e, t) => t !== x[e] && e),
              k = b.keys(g).map(Number)
            if (k.length) {
              var L
              b.assign(x, g)
              const { frameScripts: t } = W,
                n = v ? W[d] : t
              ;(
                (null == (L = e[d]) ? void 0 : L.filter(({ props: { id: e } }) => k.includes(e))) ||
                b.assign(e, await (0, C.dr)("GetData", { ids: k }))[d]
              ).forEach((l) => {
                ;(0, R.P)(l, e)
                const { id: d } = l.props,
                  c = g[d],
                  m = c === u,
                  b = c === o,
                  x = n.find(({ props: e }) => e.id === d)
                if (x) l = x
                else if ((v || !(d in f)) && (n.push(l), v)) {
                  const e = t.findIndex(({ props: e }) => e.id === d)
                  e >= 0 && t.splice(e, 1)
                }
                ;(l.runs = c === a || c === r),
                  (l.pageUrl = p),
                  (l.failed = b || c === i || m),
                  (l[u] = m),
                  (l.syntax = c === i),
                  b && !W.injectionFailure && (W.injectionFailure = { fixable: e[s] === r })
              })
            }
            v && Qe(),
              qe ||
                ((qe = Math.max(innerHeight, 100)), (t.onresize = Ne), F.CI && qe > document.body.clientHeight && Ne())
          }
          function He(e = 100) {
            We = new x((t) => {
              ;(Qe = t), setTimeout(t, e)
            })
          }
          async function Ge() {
            He(),
              b.assign(W, {
                scripts: [],
                frameScripts: [],
                idMap: {},
                commands: {},
                domain: "",
                injectionFailure: null,
                injectable: !0,
              })
            let [e, t, [n, a, l]] = await (0, C.dr)("InitPopup")
            if (
              (a
                ? a === s
                  ? ((a = "noninjectable"), (t.injectable = !1), Qe())
                  : a === p
                    ? (a = "scripts-skipped")
                    : a === E
                      ? (a = "scripts-disabled")
                      : (t[a] = l)
                : (n = ""),
              b.assign(W, t, { failure: a, failureText: n }),
              e)
            )
              for (const t in e) k.A.SetPopup(...e[t])
            Te ||
              ((Te = browser.runtime.connect({ name: `Popup:${e ? "C" : ""}:${t.tab.id}` })),
              Te.onMessage.addListener(Ge))
          }
          function Be(e) {
            return e && (!W.tab || W.tab.id === e.id)
          }
          function Ne(e) {
            const n = innerHeight
            ;(!e || (n > qe && "loading" !== document.readyState && document.body.clientHeight - 1 > n)) &&
              ((t.onresize = null), (W.maxHeight = n + "px")),
              (qe = n)
          }
          Ge(),
            (0, F.XX)(Ue),
            b.assign(k.A, {
              Run({ reset: e }, { [w]: t, tab: n }) {
                e && !t && Be(n) && Ge()
              },
              SetPopup(e, t) {
                if (Be(t.tab)) return Pe(e, t)
              },
            })
        },
        9717: (e, t, n) => {
          var a = {
            "./arrow.svg": 3108,
            "./author.svg": 6600,
            "./code.svg": 9010,
            "./cog.svg": 2006,
            "./command.svg": 180,
            "./filter.svg": 75,
            "./home.svg": 5244,
            "./info.svg": 1745,
            "./more.svg": 8974,
            "./plus.svg": 3097,
            "./question.svg": 1057,
            "./refresh.svg": 6390,
            "./search.svg": 7413,
            "./toggle-off.svg": 2541,
            "./toggle-on.svg": 4441,
            "./trash.svg": 9761,
            "./undo.svg": 2523,
          }
          function l(e) {
            var t = o(e)
            return n(t)
          }
          function o(e) {
            if (!n.o(a, e)) {
              var t = new f("Cannot find module '" + e + "'")
              throw ((t.code = "MODULE_NOT_FOUND"), t)
            }
            return a[e]
          }
          ;(l.keys = () => b.keys(a)), (l.resolve = o), (e.exports = l), (l.id = 9717)
        },
      },
      C = {}
    function k(e) {
      var t = C[e]
      if (void 0 !== t) return t.exports
      var n = (C[e] = { exports: {} })
      return g[e].call(n.exports, n, n.exports, k), n.exports
    }
    ;(k.m = g),
      (e = []),
      (k.O = (t, n, a, l) => {
        if (!n) {
          var o = 1 / 0
          for (r = 0; r < e.length; r++) {
            for (var [n, a, l] = e[r], i = !0, s = 0; s < n.length; s++)
              (!1 & l || o >= l) && b.keys(k.O).every((e) => k.O[e](n[s]))
                ? n.splice(s--, 1)
                : ((i = !1), l < o && (o = l))
            if (i) {
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
      (k.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e
        return k.d(t, { a: t }), t
      }),
      (k.d = (e, t) => {
        for (var n in t) k.o(t, n) && !k.o(e, n) && b.defineProperty(e, n, { enumerable: !0, get: t[n] })
      }),
      (k.o = (e, t) => b.prototype.hasOwnProperty.call(e, t)),
      (k.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          b.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          b.defineProperty(e, "__esModule", { value: !0 })
      }),
      (k.j = 942),
      (() => {
        var e = { 942: 0 }
        k.O.j = (t) => 0 === e[t]
        var t = (t, n) => {
            var a,
              l,
              [o, i, s] = n,
              u = 0
            if (o.some((t) => 0 !== e[t])) {
              for (a in i) k.o(i, a) && (k.m[a] = i[a])
              if (s) var r = s(k)
            }
            for (t && t(n); u < o.length; u++) (l = o[u]), k.o(e, l) && e[l] && e[l][0](), (e[l] = 0)
            return k.O(r)
          },
          n = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
        n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)))
      })()
    var R = k.O(void 0, [987], () => k(5848))
    R = k.O(R)
  })()
}
