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
              C = r(317),
              y = r(7119),
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
              O = (0, m.Lk)("hr", null, null, -1),
              T = { class: "frame-block" },
              I = { class: "flex" },
              D = (0, m.Lk)("div", { class: "image" }, [(0, m.Lk)("img", { src: "/public/images/icon128.png" })], -1),
              P = { class: "info" },
              W = ["textContent"],
              U = ["textContent"],
              M = ["textContent"],
              j = { class: "flex" },
              Q = ["textContent"],
              H = ["href"],
              q = ["textContent"],
              N = ["textContent"],
              B = ["data-collapsed"],
              G = ["data-type", "hidden"],
              V = ["textContent"],
              Y = ["textContent"],
              J = ["textContent"],
              z = { key: 0, class: "flex" },
              Z = { class: "image flex" },
              ee = ["src"],
              te = ["data-hotkey", "textContent"],
              le = ["data-verb", "data-hotkey", "textContent"],
              ae = ["data-verb", "data-hotkey", "textContent"],
              ne = ["data-hotkey", "disabled", "textContent"],
              ue = { class: "setting-check" },
              oe = ["textContent"],
              se = ["textContent"],
              re = ["textContent", "title"],
              ie = ["textContent"],
              ce = { class: "frame-block flex-1 pos-rel" },
              ve = "file:///*drag-n-drop*/",
              de = {
                __name: "app",
                setup(l) {
                  const u = ("m" === y.Dv.ctrlcmd ? "\u2318" : "Ctrl-") + "Enter",
                    r = (0, x.A)({ lifetime: 9e3 }),
                    c = (0, i.Ru)("labelRunAtDefault"),
                    de = (0, g.KR)(),
                    fe = (0, g.KR)(),
                    pe = (0, g.KR)(),
                    me = (0, g.KR)(),
                    ke = (0, g.KR)(),
                    Re = (0, g.KR)({ lineWrapping: !0 }),
                    ge = (0, g.KR)(""),
                    be = (0, g.KR)({ close: it }),
                    he = (0, g.KR)({}),
                    Ce = (0, g.KR)(""),
                    ye = (0, g.KR)(),
                    xe = (0, g.KR)((0, i.Ru)("msgLoadingData")),
                    we = (0, g.KR)({}),
                    Le = (0, g.KR)(!1),
                    _e = (0, g.KR)(!1),
                    Ee = (0, m.EW)(() => !(0, i.Vx)(we.value.url)),
                    Ke = (0, g.KR)(),
                    Fe = (0, g.KR)(!0),
                    $e = (0, g.KR)(""),
                    Se = (0, g.KR)("\xa0"),
                    Xe = (0, g.KR)(!1),
                    Ae = (0, g.KR)(!1),
                    Oe = (0, g.KR)(),
                    Te = (0, g.KR)(!1),
                    Ie = (0, g.KR)(),
                    De = (0, g.KR)(!1),
                    Pe = (0, m.EW)(() => {
                      var e, t, l
                      return {
                        [Ee.value && null != (e = me.value) && e.value
                          ? "track"
                          : null != (t = pe.value) && t.value
                            ? "edit"
                            : null != (l = fe.value) && l.value
                              ? "close"
                              : 0]: u,
                      }
                    }),
                    We = (0, m.EW)(() => {
                      const e = Ie.value,
                        t = e && (0, i.nS)(e),
                        l = null == e ? void 0 : e.meta.supportURL
                      return [
                        t && [t, "home", (0, i.Ru)("labelHomepage")],
                        l && [l, "question", (0, i.Ru)("buttonSupport")],
                      ].filter(n)
                    })
                  let Ue, Me, je, Qe, He, qe, Ne, Be, Ge, Ve, Ye, Je, ze, Ze, et, tt, lt
                  async function at() {
                    await ot(),
                      (await st()) &&
                        (await s.all([
                          mt(),
                          (async () => {
                            let e = 2
                            for (; !(await rt()) && e; ) await (0, i.F1)(3e3), (e -= 1)
                          })(),
                        ]),
                        Le.value && (xe.value = Xe.value ? (0, i.Ru)("labelReinstall") : (0, i.Ru)("labelInstall")))
                  }
                  function nt() {
                    ;(Ve = [
                      y.vW.register("ctrlcmd-enter", () => {
                        de.value.querySelector("[data-hotkey]").click()
                      }),
                    ]),
                      y.vW.enable()
                  }
                  async function ut(e) {
                    ;(we.value.fs = Le.value = De.value = !1),
                      null == Be || Be(),
                      await lt,
                      await (0, m.dY)(),
                      (Ue = e),
                      (Je = we.value = { url: e._url || ve + e.name }),
                      (ye.value = Oe.value = $e.value = ze = et = null),
                      await at(),
                      Ve || nt()
                  }
                  async function ot(e) {
                    var t
                    Le.value = !1
                    const l = He ? await new s(kt) : await vt(Je.url)
                    if (null == l || (e && ge.value === l)) throw 0
                    const a = null == (t = ke.value) ? void 0 : t.$code.cm,
                      n = a && l.split(/\r?\n/)
                    let u,
                      o = -1
                    null == a || a.eachLine(({ text: e }) => (u = e !== n[++o])),
                      (ge.value = l),
                      (u || (a && o < n.length - 1)) &&
                        (await (0, m.dY)(), a.setCursor(o), a.scrollIntoView(null, a.display.lastWrapHeight / 3))
                  }
                  async function st() {
                    const e = await (0, i.dr)("ParseMeta", ge.value),
                      { meta: t, errors: l } = e,
                      a = (0, i.ak)(t, "name")
                    if (
                      ((document.title = `${a.slice(0, 100) || l[0]}${a.length > 100 ? "..." : ""} - ${qe || (qe = document.title)}`),
                      (Se.value = f(i.fj, [a, t.version], ", ")),
                      (Ce.value = (0, i.ak)(t, "description")),
                      (Ke.value = o.assign(
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
                      (Ie.value = { meta: t || {}, custom: {}, props: {} }),
                      t && ((Ze = [...new Set(t.require)]), (tt = [...new Set(o.values(t.resources))])),
                      a)
                    )
                      return e
                    xe.value = (0, i.Ru)("msgInvalidScript")
                  }
                  async function rt() {
                    if (
                      (Oe.value ||
                        (0, _.P)(Ie.value).then((e) => {
                          Oe.value = e
                        }),
                      ze &&
                        (0, E.bD)([...Ze].sort(), o.keys(ze).sort()) &&
                        (0, E.bD)([...tt].sort(), o.keys(et).sort()))
                    )
                      return
                    ;(ze = {}), (et = {})
                    let e = 0
                    const t = Ze.length + tt.length,
                      l = v.now(),
                      a = () => {
                        v.now() - l > 500 && ($e.value = (0, i.Ru)("msgLoadingDependency", [e, t]))
                      },
                      n = async (t, l, n) => {
                        const u = (0, i.bO)(t, Je.url),
                          o = `${+n}${t}`
                        try {
                          ;(he.value[o] = l[u] = await ct(u, { isBlob: n, useCache: !0 })), (e += 1), a()
                        } catch (e) {
                          return (he.value[o] = !1), t
                        }
                      },
                      u = setTimeout(a, 500),
                      r = [...Ze.map((e) => n(e, ze, !1)), ...tt.map((e) => n(e, et, !0))],
                      c = f(i.fj, await s.all(r), "\n")
                    if ((clearTimeout(u), !c)) return (ye.value = null), (Le.value = !0), ($e.value = null), !0
                    ;($e.value = (0, i.Ru)("msgErrorLoadingDependency")), (ye.value = c)
                  }
                  function it() {
                    ;(0, i.dr)("TabClose")
                  }
                  async function ct(e, t) {
                    const { isBlob: l, useCache: n } = t || {},
                      u = l ? `blob+${e}` : `text+${e}`
                    if (n && r.has(u)) return r.get(u)
                    const { data: o } = await (0, i.dr)("Request", { url: e, vet: !!t, [a]: l ? "blob" : null })
                    return n && r.put(u, o), o
                  }
                  async function vt(e) {
                    try {
                      return Ue ? await (await Ue.getFile()).text() : (Ne && (await Ne)) || (await ct(e))
                    } catch (e) {
                      var t
                      if (null != (t = e = e.message) && t.startsWith("{"))
                        try {
                          e = "HTTP " + JSON.parse(e).status
                        } catch (e) {}
                      $e.value = (0, i.Ru)("msgErrorLoadingData") + (e ? "\n" + e : "")
                    } finally {
                      Ne = null
                    }
                  }
                  async function dt(e, t) {
                    const l = null == e ? void 0 : e.target.id
                    if ("+track" === l && De.value) null == Be || Be(!0)
                    else {
                      Le.value = !1
                      try {
                        const { update: e } = await (0, i.dr)("ParseScript", {
                            ...t,
                            code: ge.value,
                            url: Je.url,
                            from: Je.from,
                            require: ze,
                            cache: et,
                            reloadTab: Ae.value,
                            reuseDeps: !!Ge,
                            bumpDate: !0,
                          }),
                          a = new Date().toLocaleTimeString(["fr"]),
                          n = Ge || (Ge = a)
                        ;($e.value = `${e.message} ${n}${n === a ? "" : ` --\x3e ${a}`}`),
                          (_e.value = !0),
                          "+track" === l
                            ? (($e.value =
                                (0, i.Ru)("trackEditsNote") +
                                (Je.ff >= 68 ? " " + (0, i.Ru)("installOptionTrackTooltip") : "")),
                              ft())
                            : "+edit" === l
                              ? (location.href = k + p + "/" + e.props.id)
                              : "+close" === l && it()
                      } catch (e) {
                        ;($e.value = `${e}`), (Le.value = !0)
                      }
                    }
                  }
                  async function ft() {
                    if (!De.value && Ee.value && _e.value) {
                      if (
                        ((Ne = null),
                        (De.value = !0),
                        Ue && null == Me && (Me = e.FileSystemObserver || !1) && (Me = new Me((0, i.sg)(pt, 20))),
                        Me)
                      )
                        try {
                          await Me.observe(Ue)
                        } catch (e) {
                          Me = null
                        }
                      for (
                        ;
                        De.value &&
                        ((lt = new s((e) => {
                          Be = e
                        })),
                        !(await (Me ? lt : s.race([(0, i.F1)(500), lt]))));

                      )
                        await pt(), Be()
                      Me && Me.disconnect(), (lt = De.value = !1)
                    }
                  }
                  async function pt() {
                    try {
                      await ot(!0)
                      const e = await st()
                      await rt(), await dt(null, e), (Te.value = !1)
                    } catch (e) {}
                  }
                  async function mt() {
                    const { name: e, namespace: t } = Ie.value.meta || {},
                      l = await (0, i.dr)("GetScript", { meta: { name: e, namespace: t } })
                    ;(Xe.value = !!l), (Te.value = l && ge.value === (await (0, i.dr)("GetScriptCode", l.props.id)))
                  }
                  function kt(e) {
                    ;(Qe = e),
                      je ||
                        ((je = browser.tabs.connect(Je.tabId, { name: "FetchSelf" })),
                        je.onMessage.addListener((e) => Qe(e)),
                        je.onDisconnect.addListener(() => {
                          null == Be || Be(!0), (je = null)
                        })),
                      je.postMessage(null)
                  }
                  return (
                    (0, m.sV)(async () => {
                      const e = `confirm-${K.wE.paths[0]}`
                      ;(Ue = t.fsh),
                        o.defineProperty(t, "fsh", { set: ut }),
                        (Je = we.value = Ue ? { url: Ue._url || ve + Ue.name } : await (0, i.dr)("CacheLoad", e)),
                        Je
                          ? Je.fs
                            ? (we.value.fs = (0, i.Ru)("fileInstallBlocked").split(/<\d+>/))
                            : (Ue ||
                                ((He = Je.ff >= 68 && Je.url.startsWith("file:")),
                                (Ne = (0, i.dr)("CachePop", Je.url)),
                                (Ye = setInterval(i.dr, 5e3, "CacheHit", { key: e }))),
                              await at(),
                              nt())
                          : it()
                    }),
                    (0, m.xo)(() => {
                      var e
                      clearInterval(Ye), null == (e = Ve) || e.forEach((e) => e())
                    }),
                    (e, t) => (
                      (0, m.uX)(),
                      (0, m.CE)(
                        "div",
                        { class: (0, R.C4)(["page-confirm frame flex flex-col h-screen", { reinstall: Xe.value }]) },
                        [
                          we.value.fs
                            ? ((0, m.uX)(),
                              (0, m.CE)("div", F, [
                                (0, m.Lk)("b", { textContent: (0, R.v_)(we.value.fs[0]) }, null, 8, $),
                                (0, m.Lk)("ol", null, [
                                  ((0, m.uX)(!0),
                                  (0, m.CE)(
                                    m.FK,
                                    null,
                                    (0, m.pI)(
                                      we.value.fs.slice(1),
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
                                O,
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
                                  (0, m.Lk)("div", T, [
                                    (0, m.Lk)("div", I, [
                                      D,
                                      (0, m.Lk)("div", P, [
                                        (0, m.Lk)("h1", null, [
                                          (0, m.Lk)("div", null, [
                                            (0, m.Lk)("span", { textContent: (0, R.v_)(xe.value) }, null, 8, W),
                                            Te.value
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
                                                  U
                                                ))
                                              : (0, m.Q3)("", !0),
                                          ]),
                                          (0, m.Lk)(
                                            "div",
                                            { class: "ellipsis", textContent: (0, R.v_)(Se.value) },
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
                                              default: (0, m.k6)(() => [(0, m.bF)((0, g.R1)(C.A), { name: "code" })]),
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
                                                we.value.url ? decodeURIComponent(we.value.url) : "..."
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
                                            We.value,
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
                                                        (0, m.bF)((0, g.R1)(C.A), { name: t }, null, 8, ["name"]),
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
                                                    q
                                                  ),
                                                ],
                                                8,
                                                H
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                        (0, m.Lk)(
                                          "p",
                                          { class: "descr", textContent: (0, R.v_)(Ce.value) },
                                          null,
                                          8,
                                          N
                                        ),
                                        (0, m.Lk)(
                                          "div",
                                          { class: "lists flex flex-wrap", "data-collapsed": !Fe.value },
                                          [
                                            (0, m.Lk)(
                                              "div",
                                              {
                                                class: "toggle abs-center",
                                                onClick: t[0] || (t[0] = (e) => (Fe.value = !Fe.value)),
                                              },
                                              [
                                                Ke.value
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
                                                          (0, m.bF)((0, g.R1)(C.A), { name: "info" }),
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
                                                Ke.value,
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
                                        !Ie.value && $e.value
                                          ? ((0, m.uX)(),
                                            (0, m.CE)(
                                              "div",
                                              { key: 0, textContent: (0, R.v_)($e.value), class: "warning" },
                                              null,
                                              8,
                                              J
                                            ))
                                          : (0, m.Q3)("", !0),
                                      ]),
                                    ]),
                                    Ie.value
                                      ? ((0, m.uX)(),
                                        (0, m.CE)("div", z, [
                                          (0, m.Lk)("div", Z, [(0, m.Lk)("img", { src: Oe.value }, null, 8, ee)]),
                                          (0, m.Lk)(
                                            "div",
                                            { class: "actions flex flex-wrap ml-1c", ref_key: "$buttons", ref: de },
                                            [
                                              (0, m.Lk)(
                                                "button",
                                                (0, m.v6)(
                                                  {
                                                    id: "confirm",
                                                    "data-hotkey": Pe.value[0],
                                                    textContent: (0, R.v_)(
                                                      (e._verb = Xe.value
                                                        ? (0, g.R1)(i.Ru)("reinstall")
                                                        : (0, g.R1)(i.Ru)("install"))
                                                    ),
                                                  },
                                                  (e._bind = { disabled: !Le.value, onclick: dt })
                                                ),
                                                null,
                                                16,
                                                te
                                              ),
                                              (0, m.Lk)(
                                                "button",
                                                (0, m.v6)(
                                                  {
                                                    id: "+close",
                                                    "data-verb": e._verb,
                                                    "data-hotkey": Pe.value.close,
                                                    textContent: (0, R.v_)((0, g.R1)(i.Ru)("buttonClose")),
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
                                                  name: "closeAfterInstall",
                                                  ref_key: "$close",
                                                  ref: fe,
                                                  class: (0, R.C4)([
                                                    "btn-ghost",
                                                    { dim: Pe.value.track || Pe.value.edit },
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
                                                    "data-hotkey": Pe.value.edit,
                                                    textContent: (0, R.v_)((0, g.R1)(i.Ru)("buttonEdit")),
                                                  },
                                                  e._bind
                                                ),
                                                null,
                                                16,
                                                ae
                                              ),
                                              (0, m.bF)(
                                                (0, g.R1)(L.A),
                                                {
                                                  name: "editAfterInstall",
                                                  ref_key: "$edit",
                                                  ref: pe,
                                                  class: (0, R.C4)(["btn-ghost", { dim: Pe.value.track }]),
                                                  title: (0, g.R1)(c),
                                                },
                                                null,
                                                8,
                                                ["title", "class"]
                                              ),
                                              Ee.value
                                                ? ((0, m.uX)(),
                                                  (0, m.CE)(
                                                    m.FK,
                                                    { key: 0 },
                                                    [
                                                      (0, m.Lk)(
                                                        "button",
                                                        {
                                                          id: "+track",
                                                          onClick: dt,
                                                          "data-hotkey": Pe.value.track,
                                                          disabled: !De.value && !Le.value && !_e.value,
                                                          textContent: (0, R.v_)(
                                                            De.value
                                                              ? (0, g.R1)(i.Ru)("stopTracking")
                                                              : `\u271a ${(0, g.R1)(i.Ru)("trackEdits")}`
                                                          ),
                                                        },
                                                        null,
                                                        8,
                                                        ne
                                                      ),
                                                      (0, m.bo)(
                                                        (0, m.bF)(
                                                          (0, g.R1)(L.A),
                                                          {
                                                            name: "trackLocalFile",
                                                            ref_key: "$track",
                                                            ref: me,
                                                            class: "btn-ghost",
                                                            onChange: ft,
                                                            title: (0, g.R1)(c),
                                                          },
                                                          null,
                                                          8,
                                                          ["title"]
                                                        ),
                                                        [[b.aG, !De.value]]
                                                      ),
                                                      (0, m.bo)(
                                                        (0, m.bF)(
                                                          (0, g.R1)(h.A),
                                                          { content: (0, g.R1)(i.Ru)("reloadTabTrackHint") },
                                                          {
                                                            default: (0, m.k6)(() => [
                                                              (0, m.Lk)("label", ue, [
                                                                (0, m.bo)(
                                                                  (0, m.Lk)(
                                                                    "input",
                                                                    {
                                                                      type: "checkbox",
                                                                      "onUpdate:modelValue":
                                                                        t[1] || (t[1] = (e) => (Ae.value = e)),
                                                                    },
                                                                    null,
                                                                    512
                                                                  ),
                                                                  [[b.lH, Ae.value]]
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
                                                                  oe
                                                                ),
                                                              ]),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ["content"]
                                                        ),
                                                        [[b.aG, De.value]]
                                                      ),
                                                    ],
                                                    64
                                                  ))
                                                : (0, m.Q3)("", !0),
                                              (0, m.Lk)(
                                                "button",
                                                { textContent: (0, R.v_)((0, g.R1)(i.Ru)("buttonClose")), onClick: it },
                                                null,
                                                8,
                                                se
                                              ),
                                              $e.value
                                                ? ((0, m.uX)(),
                                                  (0, m.CE)(
                                                    "div",
                                                    {
                                                      key: 1,
                                                      textContent: (0, R.v_)($e.value),
                                                      title: ye.value,
                                                      class: "status stretch-self flex center-items ml-2",
                                                    },
                                                    null,
                                                    8,
                                                    re
                                                  ))
                                                : (0, m.Q3)("", !0),
                                            ],
                                            512
                                          ),
                                        ]))
                                      : (0, m.Q3)("", !0),
                                    we.value.incognito
                                      ? ((0, m.uX)(),
                                        (0, m.CE)(
                                          "div",
                                          {
                                            key: 1,
                                            class: "warning",
                                            textContent: (0, R.v_)((0, g.R1)(i.Ru)("msgIncognitoChanges")),
                                          },
                                          null,
                                          8,
                                          ie
                                        ))
                                      : (0, m.Q3)("", !0),
                                  ]),
                                  (0, m.Lk)("div", ce, [
                                    Ie.value
                                      ? ((0, m.uX)(),
                                        (0, m.Wv)(
                                          (0, g.R1)(w.A),
                                          {
                                            key: 0,
                                            ref_key: "$externals",
                                            ref: ke,
                                            value: Ie.value,
                                            class: "abs-full",
                                            "cm-options": Re.value,
                                            commands: be.value,
                                            install: { code: ge.value, deps: he.value, url: we.value.url },
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
                ;(0, d.XX)(de)
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
