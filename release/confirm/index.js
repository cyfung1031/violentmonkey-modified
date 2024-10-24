{
  const e = this,
    { window: t } = e,
    l = "scripts",
    a = "responseType",
    {
      Boolean: n,
      Error: u,
      Object: o,
      Promise: s,
      addEventListener: r,
      removeEventListener: i,
      chrome: c,
      performance: v,
    } = e,
    { apply: d } = Reflect,
    f = (d.call.bind({}.hasOwnProperty), o.call.bind(o.call)),
    p = "#" + l,
    m = (c.runtime.getURL("/").slice(0, -1), c.runtime.getManifest()),
    k = c.runtime.getURL(m.options_ui.page).split("#", 1)[0]
  c.runtime.getURL(m.icons[16].replace("16.png", "")),
    (() => {
      var l,
        r = {
          8510: (l, u, r) => {
            "use strict"
            r(2272)
            var i = r(8916),
              c = (r(8387), r(6106)),
              d = r(6808),
              m = (r(951), r(5005), r(641)),
              R = r(4526),
              g = r(953),
              b = r(3751),
              h = r(9773),
              y = r(317),
              C = r(7119),
              x = r(1386),
              w = r(4856),
              L = r(6041),
              _ = r(8852),
              E = r(5329),
              K = r(9503)
            const F = { key: 0, id: "wall" },
              $ = ["textContent"],
              S = ["textContent"],
              X = (0, m.Lk)("hr", null, null, -1),
              A = ["href", "textContent"],
              I = (0, m.Lk)("hr", null, null, -1),
              O = { class: "frame-block" },
              T = { class: "flex" },
              D = (0, m.Lk)("div", { class: "image" }, [(0, m.Lk)("img", { src: "/public/images/icon128.png" })], -1),
              P = { class: "info" },
              U = ["textContent"],
              W = ["textContent"],
              M = ["textContent"],
              j = { class: "flex" },
              Q = ["textContent"],
              q = ["href"],
              H = ["textContent"],
              N = ["textContent"],
              B = ["data-collapsed"],
              G = ["data-type", "hidden"],
              V = ["textContent"],
              Y = ["textContent"],
              z = { key: 0, class: "flex" },
              J = { class: "image flex" },
              Z = ["src"],
              ee = ["data-hotkey", "textContent"],
              te = ["data-verb", "data-hotkey", "textContent"],
              le = ["data-verb", "data-hotkey", "textContent"],
              ae = ["data-hotkey", "disabled", "textContent"],
              ne = { class: "setting-check" },
              ue = ["textContent"],
              oe = ["textContent"],
              se = ["textContent", "title"],
              re = ["textContent"],
              ie = { class: "frame-block flex-1 pos-rel" },
              ce = "file:///*drag-n-drop*/",
              ve = {
                __name: "app",
                setup(l) {
                  const u = ("m" === C.Dv.ctrlcmd ? "\u2318" : "Ctrl-") + "Enter",
                    r = (0, x.A)({ lifetime: 9e3 }),
                    c = (0, i.Ru)("labelRunAtDefault"),
                    ve = (0, g.KR)(),
                    de = (0, g.KR)(),
                    fe = (0, g.KR)(),
                    pe = (0, g.KR)(),
                    me = (0, g.KR)(),
                    ke = (0, g.KR)({ lineWrapping: !0 }),
                    Re = (0, g.KR)(""),
                    ge = (0, g.KR)({ close: rt }),
                    be = (0, g.KR)({}),
                    he = (0, g.KR)(""),
                    ye = (0, g.KR)(),
                    Ce = (0, g.KR)((0, i.Ru)("msgLoadingData")),
                    xe = (0, g.KR)({}),
                    we = (0, g.KR)(!1),
                    Le = (0, g.KR)(!1),
                    _e = (0, m.EW)(() => !(0, i.Vx)(xe.value.url)),
                    Ee = (0, g.KR)(),
                    Ke = (0, g.KR)(!0),
                    Fe = (0, g.KR)(""),
                    $e = (0, g.KR)("..."),
                    Se = (0, g.KR)(!1),
                    Xe = (0, g.KR)(!1),
                    Ae = (0, g.KR)(),
                    Ie = (0, g.KR)(!1),
                    Oe = (0, g.KR)(),
                    Te = (0, g.KR)(!1),
                    De = (0, m.EW)(() => {
                      var e, t, l
                      return {
                        [_e.value && null != (e = pe.value) && e.value
                          ? "track"
                          : null != (t = fe.value) && t.value
                            ? "edit"
                            : null != (l = de.value) && l.value
                              ? "close"
                              : 0]: u,
                      }
                    }),
                    Pe = (0, m.EW)(() => {
                      const e = Oe.value,
                        t = e && (0, i.nS)(e),
                        l = null == e ? void 0 : e.meta.supportURL
                      return [
                        t && [t, "home", (0, i.Ru)("labelHomepage")],
                        l && [l, "question", (0, i.Ru)("buttonSupport")],
                      ].filter(n)
                    })
                  let Ue, We, Me, je, Qe, qe, He, Ne, Be, Ge, Ve, Ye, ze, Je, Ze, et, tt
                  async function lt() {
                    await ut(),
                      (await ot()) &&
                        (await s.all([
                          pt(),
                          (async () => {
                            let e = 2
                            for (; !(await st()) && e; ) await (0, i.F1)(3e3), (e -= 1)
                          })(),
                        ]),
                        we.value && (Ce.value = Se.value ? (0, i.Ru)("labelReinstall") : (0, i.Ru)("labelInstall")))
                  }
                  function at() {
                    ;(Ge = [
                      C.vW.register("ctrlcmd-enter", () => {
                        ve.value.querySelector("[data-hotkey]").click()
                      }),
                    ]),
                      C.vW.enable()
                  }
                  async function nt(e) {
                    ;(xe.value.fs = we.value = Te.value = !1),
                      null == Ne || Ne(),
                      await tt,
                      await (0, m.dY)(),
                      (Ue = e),
                      (Ye = xe.value = { url: e._url || ce + e.name }),
                      (ye.value = Ae.value = Fe.value = ze = Ze = null),
                      await lt(),
                      Ge || at()
                  }
                  async function ut(e) {
                    var t
                    we.value = !1
                    const l = Qe ? await new s(mt) : await ct(Ye.url)
                    if (null == l || (e && Re.value === l)) throw 0
                    const a = null == (t = me.value) ? void 0 : t.$code.cm,
                      n = a && l.split(/\r?\n/)
                    let u,
                      o = -1
                    null == a || a.eachLine(({ text: e }) => (u = e !== n[++o])),
                      (Re.value = l),
                      (u || (a && o < n.length - 1)) &&
                        (await (0, m.dY)(), a.setCursor(o), a.scrollIntoView(null, a.display.lastWrapHeight / 3))
                  }
                  async function ot() {
                    const e = await (0, i.dr)("ParseMeta", Re.value),
                      { meta: t, errors: l } = e,
                      a = (0, i.ak)(t, "name")
                    if (
                      ((document.title = `${a.slice(0, 100) || l[0]}${a.length > 100 ? "..." : ""} - ${qe || (qe = document.title)}`),
                      ($e.value = f(i.fj, [a, t.version], ", ")),
                      (he.value = (0, i.ak)(t, "description")),
                      (Ee.value = o.assign(
                        t
                          ? (0, E.je)(
                              t,
                              [
                                "antifeature",
                                "grant",
                                "match",
                                "include",
                                "exclude",
                                "excludeMatch",
                                "compatible",
                                "connect",
                              ],
                              (e) =>
                                (null == e
                                  ? void 0
                                  : e
                                      .map((e) => [e.replace(/^\W+/, "") || e, e])
                                      .sort(([e], [t]) => (e < t ? -1 : e > t))
                                      .map(([, e]) => e)
                                      .join("\n")) || ""
                            )
                          : {},
                        { "": (null == l ? void 0 : l.join("\n")) || "" }
                      )),
                      (Oe.value = { meta: t || {}, custom: {}, props: {} }),
                      t && ((Je = [...new Set(t.require)]), (et = [...new Set(o.values(t.resources))])),
                      a)
                    )
                      return e
                    Ce.value = (0, i.Ru)("msgInvalidScript")
                  }
                  async function st() {
                    if (
                      (Ae.value ||
                        (0, _.P)(Oe.value).then((e) => {
                          Ae.value = e
                        }),
                      ze &&
                        (0, E.bD)([...Je].sort(), o.keys(ze).sort()) &&
                        (0, E.bD)([...et].sort(), o.keys(Ze).sort()))
                    )
                      return
                    ;(ze = {}), (Ze = {})
                    let e = 0
                    const t = Je.length + et.length,
                      l = v.now(),
                      a = () => {
                        v.now() - l > 500 && (Fe.value = (0, i.Ru)("msgLoadingDependency", [e, t]))
                      },
                      n = async (t, l, n) => {
                        const u = (0, i.bO)(t, Ye.url),
                          o = `${+n}${t}`
                        try {
                          ;(be.value[o] = l[u] = await it(u, { isBlob: n, useCache: !0 })), (e += 1), a()
                        } catch (e) {
                          return (be.value[o] = !1), t
                        }
                      },
                      u = setTimeout(a, 500),
                      r = [...Je.map((e) => n(e, ze, !1)), ...et.map((e) => n(e, Ze, !0))],
                      c = f(i.fj, await s.all(r), "\n")
                    if ((clearTimeout(u), !c)) return (ye.value = null), (we.value = !0), (Fe.value = null), !0
                    ;(Fe.value = (0, i.Ru)("msgErrorLoadingDependency")), (ye.value = c)
                  }
                  function rt() {
                    ;(0, i.dr)("TabClose")
                  }
                  async function it(e, { isBlob: t, useCache: l } = {}) {
                    const n = t ? `blob+${e}` : `text+${e}`
                    if (l && r.has(n)) return r.get(n)
                    const { data: u } = await (0, i.dr)("Request", { url: e, [a]: t ? "blob" : null })
                    return l && r.put(n, u), u
                  }
                  async function ct(e) {
                    try {
                      return Ue ? await (await Ue.getFile()).text() : (He && (await He)) || (await it(e))
                    } catch (t) {
                      throw ((Fe.value = (0, i.Ru)("msgErrorLoadingData")), e)
                    } finally {
                      He = null
                    }
                  }
                  async function vt(e, t) {
                    const l = null == e ? void 0 : e.target.id
                    if ("+track" === l && Te.value) null == Ne || Ne(!0)
                    else {
                      we.value = !1
                      try {
                        const { update: e } = await (0, i.dr)("ParseScript", {
                            ...t,
                            code: Re.value,
                            url: Ye.url,
                            from: Ye.from,
                            require: ze,
                            cache: Ze,
                            reloadTab: Xe.value,
                            reuseDeps: !!Be,
                            bumpDate: !0,
                          }),
                          a = new Date().toLocaleTimeString(["fr"]),
                          n = Be || (Be = a)
                        ;(Fe.value = `${e.message} ${n}${n === a ? "" : ` --\x3e ${a}`}`),
                          (Le.value = !0),
                          "+track" === l
                            ? ((Fe.value =
                                (0, i.Ru)("trackEditsNote") +
                                (Ye.ff >= 68 ? " " + (0, i.Ru)("installOptionTrackTooltip") : "")),
                              dt())
                            : "+edit" === l
                              ? (location.href = k + p + "/" + e.props.id)
                              : "+close" === l && rt()
                      } catch (e) {
                        ;(Fe.value = `${e}`), (we.value = !0)
                      }
                    }
                  }
                  async function dt() {
                    if (!Te.value && _e.value && Le.value) {
                      if (
                        ((He = null),
                        (Te.value = !0),
                        Ue && null == We && (We = e.FileSystemObserver || !1) && (We = new We((0, i.sg)(ft, 20))),
                        We)
                      )
                        try {
                          await We.observe(Ue)
                        } catch (e) {
                          We = null
                        }
                      for (
                        ;
                        Te.value &&
                        ((tt = new s((e) => {
                          Ne = e
                        })),
                        !(await (We ? tt : s.race([(0, i.F1)(500), tt]))));

                      )
                        await ft(), Ne()
                      We && We.disconnect(), (tt = Te.value = !1)
                    }
                  }
                  async function ft() {
                    try {
                      await ut(!0)
                      const e = await ot()
                      await st(), await vt(null, e), (Ie.value = !1)
                    } catch (e) {}
                  }
                  async function pt() {
                    const { name: e, namespace: t } = Oe.value.meta || {},
                      l = await (0, i.dr)("GetScript", { meta: { name: e, namespace: t } })
                    ;(Se.value = !!l), (Ie.value = l && Re.value === (await (0, i.dr)("GetScriptCode", l.props.id)))
                  }
                  function mt(e) {
                    ;(je = e),
                      Me ||
                        ((Me = browser.tabs.connect(Ye.tabId, { name: "FetchSelf" })),
                        Me.onMessage.addListener((e) => je(e)),
                        Me.onDisconnect.addListener(() => {
                          null == Ne || Ne(!0), (Me = null)
                        })),
                      Me.postMessage(null)
                  }
                  return (
                    (0, m.sV)(async () => {
                      const e = `confirm-${K.wE.paths[0]}`
                      ;(Ue = t.fsh),
                        o.defineProperty(t, "fsh", { set: nt }),
                        (Ye = xe.value = Ue ? { url: Ue._url || ce + Ue.name } : await (0, i.dr)("CacheLoad", e)),
                        Ye
                          ? Ye.fs
                            ? (xe.value.fs = (0, i.Ru)("fileInstallBlocked").split(/<\d+>/))
                            : (Ue ||
                                ((Qe = Ye.ff >= 68 && Ye.url.startsWith("file:")),
                                (He = (0, i.dr)("CachePop", Ye.url)),
                                (Ve = setInterval(i.dr, 5e3, "CacheHit", { key: e }))),
                              await lt(),
                              at())
                          : rt()
                    }),
                    (0, m.xo)(() => {
                      var e
                      clearInterval(Ve), null == (e = Ge) || e.forEach((e) => e())
                    }),
                    (e, t) => (
                      (0, m.uX)(),
                      (0, m.CE)(
                        "div",
                        { class: (0, R.C4)(["page-confirm frame flex flex-col h-screen", { reinstall: Se.value }]) },
                        [
                          xe.value.fs
                            ? ((0, m.uX)(),
                              (0, m.CE)("div", F, [
                                (0, m.Lk)("b", { textContent: (0, R.v_)(xe.value.fs[0]) }, null, 8, $),
                                (0, m.Lk)("ol", null, [
                                  ((0, m.uX)(!0),
                                  (0, m.CE)(
                                    m.FK,
                                    null,
                                    (0, m.pI)(
                                      xe.value.fs.slice(1),
                                      (e, t) => (
                                        (0, m.uX)(),
                                        (0, m.CE)(
                                          "li",
                                          { key: t, textContent: (0, R.v_)(e), class: "mt-1" },
                                          null,
                                          8,
                                          S
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ]),
                                X,
                                (0, m.Lk)(
                                  "a",
                                  { class: "mt-1", href: (0, g.R1)(d.U$), textContent: (0, R.v_)((0, g.R1)(d.U$)) },
                                  null,
                                  8,
                                  A
                                ),
                                I,
                                (0, m.bF)(
                                  (0, g.R1)(L.A),
                                  { name: "helpForLocalFile", label: (0, g.R1)(i.Ru)("helpForLocalFile") },
                                  null,
                                  8,
                                  ["label"]
                                ),
                              ]))
                            : ((0, m.uX)(),
                              (0, m.CE)(
                                m.FK,
                                { key: 1 },
                                [
                                  (0, m.Lk)("div", O, [
                                    (0, m.Lk)("div", T, [
                                      D,
                                      (0, m.Lk)("div", P, [
                                        (0, m.Lk)("h1", null, [
                                          (0, m.Lk)("div", null, [
                                            (0, m.Lk)("span", { textContent: (0, R.v_)(Ce.value) }, null, 8, U),
                                            Ie.value
                                              ? ((0, m.uX)(),
                                                (0, m.CE)(
                                                  "span",
                                                  {
                                                    key: 0,
                                                    textContent: (0, R.v_)((0, g.R1)(i.Ru)("msgSameCode")),
                                                    style: { "font-weight": "normal" },
                                                  },
                                                  null,
                                                  8,
                                                  W
                                                ))
                                              : (0, m.Q3)("", !0),
                                          ]),
                                          (0, m.Lk)(
                                            "div",
                                            { class: "ellipsis", textContent: (0, R.v_)($e.value) },
                                            null,
                                            8,
                                            M
                                          ),
                                        ]),
                                        (0, m.Lk)("div", j, [
                                          (0, m.bF)(
                                            (0, g.R1)(h.A),
                                            {
                                              content: (0, g.R1)(i.Ru)("editNavCode"),
                                              class: "abs-center",
                                              placement: "right",
                                            },
                                            {
                                              default: (0, m.k6)(() => [(0, m.bF)((0, g.R1)(y.A), { name: "code" })]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                          (0, m.Lk)(
                                            "span",
                                            {
                                              class: "ellipsis",
                                              textContent: (0, R.v_)(
                                                xe.value.url ? decodeURIComponent(xe.value.url) : "..."
                                              ),
                                            },
                                            null,
                                            8,
                                            Q
                                          ),
                                        ]),
                                        ((0, m.uX)(!0),
                                        (0, m.CE)(
                                          m.FK,
                                          null,
                                          (0, m.pI)(
                                            Pe.value,
                                            ([e, t, l]) => (
                                              (0, m.uX)(),
                                              (0, m.CE)(
                                                "a",
                                                { key: t, class: "flex", target: "_blank", href: e },
                                                [
                                                  (0, m.bF)(
                                                    (0, g.R1)(h.A),
                                                    { content: l, class: "abs-center", placement: "right" },
                                                    {
                                                      default: (0, m.k6)(() => [
                                                        (0, m.bF)((0, g.R1)(y.A), { name: t }, null, 8, ["name"]),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1032,
                                                    ["content"]
                                                  ),
                                                  (0, m.Lk)(
                                                    "span",
                                                    {
                                                      class: "ellipsis",
                                                      textContent: (0, R.v_)(decodeURIComponent(e)),
                                                    },
                                                    null,
                                                    8,
                                                    H
                                                  ),
                                                ],
                                                8,
                                                q
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                        (0, m.Lk)(
                                          "p",
                                          { class: "descr", textContent: (0, R.v_)(he.value) },
                                          null,
                                          8,
                                          N
                                        ),
                                        (0, m.Lk)(
                                          "div",
                                          { class: "lists flex flex-wrap", "data-collapsed": !Ke.value },
                                          [
                                            (0, m.Lk)(
                                              "div",
                                              {
                                                class: "toggle abs-center",
                                                onClick: t[0] || (t[0] = (e) => (Ke.value = !Ke.value)),
                                              },
                                              [
                                                Ee.value
                                                  ? ((0, m.uX)(),
                                                    (0, m.Wv)(
                                                      (0, g.R1)(h.A),
                                                      {
                                                        key: 0,
                                                        content: (0, g.R1)(i.Ru)("msgShowHide"),
                                                        placement: "bottom",
                                                        align: "left",
                                                      },
                                                      {
                                                        default: (0, m.k6)(() => [
                                                          (0, m.bF)((0, g.R1)(y.A), { name: "info" }),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["content"]
                                                    ))
                                                  : (0, m.Q3)("", !0),
                                              ]
                                            ),
                                            ((0, m.uX)(!0),
                                            (0, m.CE)(
                                              m.FK,
                                              null,
                                              (0, m.pI)(
                                                Ee.value,
                                                (e, t) => (
                                                  (0, m.uX)(),
                                                  (0, m.CE)(
                                                    "dl",
                                                    { key: t, "data-type": t, hidden: !e.length, tabindex: "0" },
                                                    [
                                                      (0, m.Lk)(
                                                        "dt",
                                                        {
                                                          textContent: (0, R.v_)(
                                                            t ? `@${t}` : (0, g.R1)(i.Ru)("genericError")
                                                          ),
                                                        },
                                                        null,
                                                        8,
                                                        V
                                                      ),
                                                      (0, m.Lk)(
                                                        "dd",
                                                        { textContent: (0, R.v_)(e), class: "ellipsis" },
                                                        null,
                                                        8,
                                                        Y
                                                      ),
                                                    ],
                                                    8,
                                                    G
                                                  )
                                                )
                                              ),
                                              128
                                            )),
                                          ],
                                          8,
                                          B
                                        ),
                                      ]),
                                    ]),
                                    Oe.value
                                      ? ((0, m.uX)(),
                                        (0, m.CE)("div", z, [
                                          (0, m.Lk)("div", J, [(0, m.Lk)("img", { src: Ae.value }, null, 8, Z)]),
                                          (0, m.Lk)(
                                            "div",
                                            { class: "actions flex flex-wrap ml-1c", ref_key: "$buttons", ref: ve },
                                            [
                                              (0, m.Lk)(
                                                "button",
                                                (0, m.v6)(
                                                  {
                                                    id: "confirm",
                                                    "data-hotkey": De.value[0],
                                                    textContent: (0, R.v_)(
                                                      (e._verb = Se.value
                                                        ? (0, g.R1)(i.Ru)("reinstall")
                                                        : (0, g.R1)(i.Ru)("install"))
                                                    ),
                                                  },
                                                  (e._bind = { disabled: !we.value, onclick: vt })
                                                ),
                                                null,
                                                16,
                                                ee
                                              ),
                                              (0, m.Lk)(
                                                "button",
                                                (0, m.v6)(
                                                  {
                                                    id: "+close",
                                                    "data-verb": e._verb,
                                                    "data-hotkey": De.value.close,
                                                    textContent: (0, R.v_)((0, g.R1)(i.Ru)("buttonClose")),
                                                  },
                                                  e._bind
                                                ),
                                                null,
                                                16,
                                                te
                                              ),
                                              (0, m.bF)(
                                                (0, g.R1)(L.A),
                                                {
                                                  name: "closeAfterInstall",
                                                  ref_key: "$close",
                                                  ref: de,
                                                  class: (0, R.C4)([
                                                    "btn-ghost",
                                                    { dim: De.value.track || De.value.edit },
                                                  ]),
                                                  title: (0, g.R1)(c),
                                                },
                                                null,
                                                8,
                                                ["class", "title"]
                                              ),
                                              (0, m.Lk)(
                                                "button",
                                                (0, m.v6)(
                                                  {
                                                    id: "+edit",
                                                    "data-verb": e._verb,
                                                    "data-hotkey": De.value.edit,
                                                    textContent: (0, R.v_)((0, g.R1)(i.Ru)("buttonEdit")),
                                                  },
                                                  e._bind
                                                ),
                                                null,
                                                16,
                                                le
                                              ),
                                              (0, m.bF)(
                                                (0, g.R1)(L.A),
                                                {
                                                  name: "editAfterInstall",
                                                  ref_key: "$edit",
                                                  ref: fe,
                                                  class: (0, R.C4)(["btn-ghost", { dim: De.value.track }]),
                                                  title: (0, g.R1)(c),
                                                },
                                                null,
                                                8,
                                                ["title", "class"]
                                              ),
                                              _e.value
                                                ? ((0, m.uX)(),
                                                  (0, m.CE)(
                                                    m.FK,
                                                    { key: 0 },
                                                    [
                                                      (0, m.Lk)(
                                                        "button",
                                                        {
                                                          id: "+track",
                                                          onClick: vt,
                                                          "data-hotkey": De.value.track,
                                                          disabled: !Te.value && !we.value && !Le.value,
                                                          textContent: (0, R.v_)(
                                                            Te.value
                                                              ? (0, g.R1)(i.Ru)("stopTracking")
                                                              : `\u271a ${(0, g.R1)(i.Ru)("trackEdits")}`
                                                          ),
                                                        },
                                                        null,
                                                        8,
                                                        ae
                                                      ),
                                                      (0, m.bo)(
                                                        (0, m.bF)(
                                                          (0, g.R1)(L.A),
                                                          {
                                                            name: "trackLocalFile",
                                                            ref_key: "$track",
                                                            ref: pe,
                                                            class: "btn-ghost",
                                                            onChange: dt,
                                                            title: (0, g.R1)(c),
                                                          },
                                                          null,
                                                          8,
                                                          ["title"]
                                                        ),
                                                        [[b.aG, !Te.value]]
                                                      ),
                                                      (0, m.bo)(
                                                        (0, m.bF)(
                                                          (0, g.R1)(h.A),
                                                          { content: (0, g.R1)(i.Ru)("reloadTabTrackHint") },
                                                          {
                                                            default: (0, m.k6)(() => [
                                                              (0, m.Lk)("label", ne, [
                                                                (0, m.bo)(
                                                                  (0, m.Lk)(
                                                                    "input",
                                                                    {
                                                                      type: "checkbox",
                                                                      "onUpdate:modelValue":
                                                                        t[1] || (t[1] = (e) => (Xe.value = e)),
                                                                    },
                                                                    null,
                                                                    512
                                                                  ),
                                                                  [[b.lH, Xe.value]]
                                                                ),
                                                                (0, m.Lk)(
                                                                  "span",
                                                                  {
                                                                    textContent: (0, R.v_)(
                                                                      (0, g.R1)(i.Ru)("reloadTab")
                                                                    ),
                                                                  },
                                                                  null,
                                                                  8,
                                                                  ue
                                                                ),
                                                              ]),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ["content"]
                                                        ),
                                                        [[b.aG, Te.value]]
                                                      ),
                                                    ],
                                                    64
                                                  ))
                                                : (0, m.Q3)("", !0),
                                              (0, m.Lk)(
                                                "button",
                                                { textContent: (0, R.v_)((0, g.R1)(i.Ru)("buttonClose")), onClick: rt },
                                                null,
                                                8,
                                                oe
                                              ),
                                              Fe.value
                                                ? ((0, m.uX)(),
                                                  (0, m.CE)(
                                                    "div",
                                                    {
                                                      key: 1,
                                                      textContent: (0, R.v_)(Fe.value),
                                                      title: ye.value,
                                                      class: "status stretch-self flex center-items ml-2",
                                                    },
                                                    null,
                                                    8,
                                                    se
                                                  ))
                                                : (0, m.Q3)("", !0),
                                            ],
                                            512
                                          ),
                                        ]))
                                      : (0, m.Q3)("", !0),
                                    xe.value.incognito
                                      ? ((0, m.uX)(),
                                        (0, m.CE)(
                                          "div",
                                          {
                                            key: 1,
                                            class: "incognito",
                                            textContent: (0, R.v_)((0, g.R1)(i.Ru)("msgIncognitoChanges")),
                                          },
                                          null,
                                          8,
                                          re
                                        ))
                                      : (0, m.Q3)("", !0),
                                  ]),
                                  (0, m.Lk)("div", ie, [
                                    Oe.value
                                      ? ((0, m.uX)(),
                                        (0, m.Wv)(
                                          (0, g.R1)(w.A),
                                          {
                                            key: 0,
                                            ref_key: "$externals",
                                            ref: me,
                                            value: Oe.value,
                                            class: "abs-full",
                                            "cm-options": ke.value,
                                            commands: ge.value,
                                            install: { code: Re.value, deps: be.value, url: xe.value.url },
                                          },
                                          null,
                                          8,
                                          ["value", "cm-options", "commands", "install"]
                                        ))
                                      : (0, m.Q3)("", !0),
                                  ]),
                                ],
                                64
                              )),
                        ],
                        2
                      )
                    )
                  )
                },
              }
            ;(document.title = `${(0, i.Ru)("labelInstall")} - ${(0, i.Ru)("extName")}`),
              c.A.ready.then(() => {
                ;(0, d.XX)(ve)
              })
          },
          9717: (e, t, l) => {
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
            function n(e) {
              var t = s(e)
              return l(t)
            }
            function s(e) {
              if (!l.o(a, e)) {
                var t = new u("Cannot find module '" + e + "'")
                throw ((t.code = "MODULE_NOT_FOUND"), t)
              }
              return a[e]
            }
            ;(n.keys = () => o.keys(a)), (n.resolve = s), (e.exports = n), (n.id = 9717)
          },
        },
        i = {}
      function c(e) {
        var t = i[e]
        if (void 0 !== t) return t.exports
        var l = (i[e] = { exports: {} })
        return r[e].call(l.exports, l, l.exports, c), l.exports
      }
      ;(c.m = r),
        (l = []),
        (c.O = (e, t, a, n) => {
          if (!t) {
            var u = 1 / 0
            for (v = 0; v < l.length; v++) {
              for (var [t, a, n] = l[v], s = !0, r = 0; r < t.length; r++)
                (!1 & n || u >= n) && o.keys(c.O).every((e) => c.O[e](t[r]))
                  ? t.splice(r--, 1)
                  : ((s = !1), n < u && (u = n))
              if (s) {
                l.splice(v--, 1)
                var i = a()
                void 0 !== i && (e = i)
              }
            }
            return e
          }
          n = n || 0
          for (var v = l.length; v > 0 && l[v - 1][2] > n; v--) l[v] = l[v - 1]
          l[v] = [t, a, n]
        }),
        (c.n = (e) => {
          var t = e && e.__esModule ? () => e.default : () => e
          return c.d(t, { a: t }), t
        }),
        (c.d = (e, t) => {
          for (var l in t) c.o(t, l) && !c.o(e, l) && o.defineProperty(e, l, { enumerable: !0, get: t[l] })
        }),
        (c.o = (e, t) => o.prototype.hasOwnProperty.call(e, t)),
        (c.r = (e) => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            o.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            o.defineProperty(e, "__esModule", { value: !0 })
        }),
        (c.j = 676),
        (() => {
          var e = { 676: 0 }
          c.O.j = (t) => 0 === e[t]
          var t = (t, l) => {
              var a,
                n,
                [u, o, s] = l,
                r = 0
              if (u.some((t) => 0 !== e[t])) {
                for (a in o) c.o(o, a) && (c.m[a] = o[a])
                if (s) var i = s(c)
              }
              for (t && t(l); r < u.length; r++) (n = u[r]), c.o(e, n) && e[n] && e[n][0](), (e[n] = 0)
              return c.O(i)
            },
            l = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
          l.forEach(t.bind(null, 0)), (l.push = t.bind(null, l.push.bind(l)))
        })()
      var d = c.O(void 0, [921, 987], () => c(8510))
      d = c.O(d)
    })()
}
