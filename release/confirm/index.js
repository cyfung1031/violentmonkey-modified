{
  const e = this,
    { window: t } = e,
    a = "scripts",
    l = "responseType",
    {
      Boolean: n,
      Error: o,
      Object: i,
      Promise: s,
      addEventListener: u,
      removeEventListener: r,
      chrome: c,
      performance: v,
    } = e,
    { apply: d } = Reflect,
    g = (d.call.bind({}.hasOwnProperty), i.call.bind(i.call)),
    f = "#" + a,
    m = (c.runtime.getURL("/").slice(0, -1), c.runtime.getManifest()),
    p = c.runtime.getURL(m.options_ui.page).split("#", 1)[0]
  c.runtime.getURL(m.icons[16].replace("16.png", "")),
    (() => {
      var a,
        u = {
          8017: (a, o, u) => {
            "use strict"
            u(1871)
            var r = u(5313),
              c = (u(6711), u(5010)),
              d = u(1226),
              m = (u(3700), u(9994), u(6252)),
              w = u(2502),
              h = u(2262),
              y = u(9963),
              b = u(9824),
              k = u(6877),
              x = u(7458),
              C = u(8464),
              _ = u(6115),
              S = u(7407),
              U = u(2477),
              H = u(2380),
              D = u(9518)
            const $ = { key: 0, id: "wall" },
              L = ["textContent"],
              z = ["textContent"],
              Z = (0, m._)("hr", null, null, -1),
              j = ["href", "textContent"],
              O = (0, m._)("hr", null, null, -1),
              T = { class: "frame-block" },
              W = { class: "flex" },
              F = (0, m._)("div", { class: "image" }, [(0, m._)("img", { src: "/public/images/icon128.png" })], -1),
              E = { class: "info" },
              I = ["textContent"],
              q = ["textContent"],
              P = ["textContent"],
              Y = { class: "flex" },
              M = ["textContent"],
              R = ["href"],
              B = ["textContent"],
              G = ["textContent"],
              N = ["data-collapsed"],
              A = ["data-type", "hidden"],
              J = ["textContent"],
              K = ["textContent"],
              Q = { key: 0, class: "flex" },
              V = { class: "image flex" },
              X = ["src"],
              ee = ["data-hotkey", "textContent"],
              te = ["data-verb", "data-hotkey", "textContent"],
              ae = ["data-verb", "data-hotkey", "textContent"],
              le = ["data-hotkey", "disabled", "textContent"],
              ne = { class: "setting-check" },
              oe = ["textContent"],
              ie = ["textContent"],
              se = ["textContent", "title"],
              ue = ["textContent"],
              re = { class: "frame-block flex-1 pos-rel" },
              ce = "file:///*drag-n-drop*/",
              ve = {
                __name: "app",
                setup(a) {
                  const o = ("m" === x.LY.ctrlcmd ? "\u2318" : "Ctrl-") + "Enter",
                    u = (0, C.Z)({ lifetime: 9e3 }),
                    c = (0, r.ag)("labelRunAtDefault"),
                    ve = (0, h.iH)(),
                    de = (0, h.iH)(),
                    ge = (0, h.iH)(),
                    fe = (0, h.iH)(),
                    me = (0, h.iH)(),
                    pe = (0, h.iH)({ lineWrapping: !0 }),
                    we = (0, h.iH)(""),
                    he = (0, h.iH)({ close: ut }),
                    ye = (0, h.iH)({}),
                    be = (0, h.iH)(""),
                    ke = (0, h.iH)(),
                    xe = (0, h.iH)((0, r.ag)("msgLoadingData")),
                    Ce = (0, h.iH)({}),
                    _e = (0, h.iH)(!1),
                    Se = (0, h.iH)(!1),
                    Ue = (0, m.Fl)(() => !(0, r.Q1)(Ce.value.url)),
                    He = (0, h.iH)(),
                    De = (0, h.iH)(!0),
                    $e = (0, h.iH)(""),
                    Le = (0, h.iH)("..."),
                    ze = (0, h.iH)(!1),
                    Ze = (0, h.iH)(!1),
                    je = (0, h.iH)(),
                    Oe = (0, h.iH)(!1),
                    Te = (0, h.iH)(),
                    We = (0, h.iH)(!1),
                    Fe = (0, m.Fl)(() => {
                      var e, t, a
                      return {
                        [Ue.value && null != (e = fe.value) && e.value
                          ? "track"
                          : null != (t = ge.value) && t.value
                            ? "edit"
                            : null != (a = de.value) && a.value
                              ? "close"
                              : 0]: o,
                      }
                    }),
                    Ee = (0, m.Fl)(() => {
                      const e = Te.value,
                        t = e && (0, r.t$)(e),
                        a = null == e ? void 0 : e.meta.supportURL
                      return [
                        t && [t, "home", (0, r.ag)("labelHomepage")],
                        a && [a, "question", (0, r.ag)("buttonSupport")],
                      ].filter(n)
                    })
                  let Ie, qe, Pe, Ye, Me, Re, Be, Ge, Ne, Ae, Je, Ke, Qe, Ve, Xe, et, tt
                  async function at() {
                    await ot(),
                      (await it()) &&
                        (await s.all([
                          ft(),
                          (async () => {
                            let e = 2
                            for (; !(await st()) && e; ) await (0, r.dL)(3e3), (e -= 1)
                          })(),
                        ]),
                        _e.value && (xe.value = ze.value ? (0, r.ag)("labelReinstall") : (0, r.ag)("labelInstall")))
                  }
                  function lt() {
                    ;(Ae = [
                      x.$J.register("ctrlcmd-enter", () => {
                        ve.value.querySelector("[data-hotkey]").click()
                      }),
                    ]),
                      x.$J.enable()
                  }
                  async function nt(e) {
                    ;(Ce.value.fs = _e.value = We.value = !1),
                      null == Ge || Ge(),
                      await tt,
                      await (0, m.Y3)(),
                      (Ie = e),
                      (Ke = Ce.value = { url: e._url || ce + e.name }),
                      (ke.value = je.value = $e.value = Qe = Xe = null),
                      await at(),
                      Ae || lt()
                  }
                  async function ot(e) {
                    var t
                    _e.value = !1
                    const a = Me ? await new s(mt) : await ct(Ke.url)
                    if (null == a || (e && we.value === a)) throw 0
                    const l = null == (t = me.value) ? void 0 : t.$code.cm,
                      n = l && a.split(/\r?\n/)
                    let o,
                      i = -1
                    null == l || l.eachLine(({ text: e }) => (o = e !== n[++i])),
                      (we.value = a),
                      (o || (l && i < n.length - 1)) &&
                        (await (0, m.Y3)(), l.setCursor(i), l.scrollIntoView(null, l.display.lastWrapHeight / 3))
                  }
                  async function it() {
                    const e = await (0, r.gj)("ParseMeta", we.value),
                      { meta: t, errors: a } = e,
                      l = (0, r.iQ)(t, "name")
                    if (
                      ((document.title = `${l.slice(0, 100) || a[0]}${l.length > 100 ? "..." : ""} - ${Re || (Re = document.title)}`),
                      (Le.value = g(r.Hv, [l, t.version], ", ")),
                      (be.value = (0, r.iQ)(t, "description")),
                      (He.value = i.assign(
                        t
                          ? (0, H.zr)(
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
                        { "": (null == a ? void 0 : a.join("\n")) || "" }
                      )),
                      (Te.value = { meta: t || {}, custom: {}, props: {} }),
                      t && ((Ve = [...new Set(t.require)]), (et = [...new Set(i.values(t.resources))])),
                      l)
                    )
                      return e
                    xe.value = (0, r.ag)("msgInvalidScript")
                  }
                  async function st() {
                    if (
                      (je.value ||
                        (0, U.d)(Te.value).then((e) => {
                          je.value = e
                        }),
                      Qe &&
                        (0, H.vZ)([...Ve].sort(), i.keys(Qe).sort()) &&
                        (0, H.vZ)([...et].sort(), i.keys(Xe).sort()))
                    )
                      return
                    ;(Qe = {}), (Xe = {})
                    let e = 0
                    const t = Ve.length + et.length,
                      a = v.now(),
                      l = () => {
                        v.now() - a > 500 && ($e.value = (0, r.ag)("msgLoadingDependency", [e, t]))
                      },
                      n = async (t, a, n) => {
                        const o = (0, r.mn)(t, Ke.url),
                          i = `${+n}${t}`
                        try {
                          ;(ye.value[i] = a[o] = await rt(o, { isBlob: n, useCache: !0 })), (e += 1), l()
                        } catch (e) {
                          return (ye.value[i] = !1), t
                        }
                      },
                      o = setTimeout(l, 500),
                      u = [...Ve.map((e) => n(e, Qe, !1)), ...et.map((e) => n(e, Xe, !0))],
                      c = g(r.Hv, await s.all(u), "\n")
                    if ((clearTimeout(o), !c)) return (ke.value = null), (_e.value = !0), ($e.value = null), !0
                    ;($e.value = (0, r.ag)("msgErrorLoadingDependency")), (ke.value = c)
                  }
                  function ut() {
                    ;(0, r.gj)("TabClose")
                  }
                  async function rt(e, { isBlob: t, useCache: a } = {}) {
                    const n = t ? `blob+${e}` : `text+${e}`
                    if (a && u.has(n)) return u.get(n)
                    const o = await (0, r.WY)(e, { [l]: t ? "blob" : null }),
                      i = t ? await (0, r.LZ)(o) : o.data
                    return a && u.put(n, i), i
                  }
                  async function ct(e) {
                    try {
                      return Ie ? await (await Ie.getFile()).text() : (Be && (await Be)) || (await rt(e))
                    } catch (t) {
                      throw (($e.value = (0, r.ag)("msgErrorLoadingData")), e)
                    } finally {
                      Be = null
                    }
                  }
                  async function vt(e, t) {
                    const a = null == e ? void 0 : e.target.id
                    if ("+track" === a && We.value) null == Ge || Ge(!0)
                    else {
                      _e.value = !1
                      try {
                        const { update: e } = await (0, r.gj)("ParseScript", {
                            ...t,
                            code: we.value,
                            url: Ke.url,
                            from: Ke.from,
                            require: Qe,
                            cache: Xe,
                            reloadTab: Ze.value,
                            reuseDeps: !!Ne,
                            bumpDate: !0,
                          }),
                          l = new Date().toLocaleTimeString(["fr"]),
                          n = Ne || (Ne = l)
                        ;($e.value = `${e.message} ${n}${n === l ? "" : ` --\x3e ${l}`}`),
                          (Se.value = !0),
                          "+track" === a
                            ? (($e.value =
                                (0, r.ag)("trackEditsNote") +
                                (Ke.ff >= 68 ? " " + (0, r.ag)("installOptionTrackTooltip") : "")),
                              dt())
                            : "+edit" === a
                              ? (location.href = p + f + "/" + e.props.id)
                              : "+close" === a && ut()
                      } catch (e) {
                        ;($e.value = `${e}`), (_e.value = !0)
                      }
                    }
                  }
                  async function dt() {
                    if (!We.value && Ue.value && Se.value) {
                      if (
                        ((Be = null),
                        (We.value = !0),
                        Ie && null == qe && (qe = e.FileSystemObserver || !1) && (qe = new qe((0, r.Ds)(gt, 20))),
                        qe)
                      )
                        try {
                          await qe.observe(Ie)
                        } catch (e) {
                          qe = null
                        }
                      for (
                        ;
                        We.value &&
                        ((tt = new s((e) => {
                          Ge = e
                        })),
                        !(await (qe ? tt : s.race([(0, r.dL)(500), tt]))));

                      )
                        await gt(), Ge()
                      qe && qe.unobserve(Ie), (tt = We.value = !1)
                    }
                  }
                  async function gt() {
                    try {
                      await ot(!0)
                      const e = await it()
                      await st(), await vt(null, e), (Oe.value = !1)
                    } catch (e) {}
                  }
                  async function ft() {
                    const { name: e, namespace: t } = Te.value.meta || {},
                      a = await (0, r.gj)("GetScript", { meta: { name: e, namespace: t } })
                    ;(ze.value = !!a), (Oe.value = a && we.value === (await (0, r.gj)("GetScriptCode", a.props.id)))
                  }
                  function mt(e) {
                    ;(Ye = e),
                      Pe ||
                        ((Pe = browser.tabs.connect(Ke.tabId, { name: "FetchSelf" })),
                        Pe.onMessage.addListener((e) => Ye(e)),
                        Pe.onDisconnect.addListener(() => {
                          null == Ge || Ge(!0), (Pe = null)
                        })),
                      Pe.postMessage(null)
                  }
                  return (
                    (0, m.bv)(async () => {
                      const e = `confirm-${D.BC.paths[0]}`
                      ;(Ie = t.fsh),
                        i.defineProperty(t, "fsh", { set: nt }),
                        (Ke = Ce.value = Ie ? { url: Ie._url || ce + Ie.name } : await (0, r.gj)("CacheLoad", e)),
                        Ke
                          ? Ke.fs
                            ? (Ce.value.fs = (0, r.ag)("fileInstallBlocked").split(/<\d+>/))
                            : (Ie ||
                                ((Me = Ke.ff >= 68 && Ke.url.startsWith("file:")),
                                (Be = (0, r.gj)("CachePop", Ke.url)),
                                (Je = setInterval(r.gj, 5e3, "CacheHit", { key: e }))),
                              await at(),
                              lt())
                          : ut()
                    }),
                    (0, m.Jd)(() => {
                      var e
                      clearInterval(Je), null == (e = Ae) || e.forEach((e) => e())
                    }),
                    (e, t) => (
                      (0, m.wg)(),
                      (0, m.iD)(
                        "div",
                        { class: (0, w.C_)(["page-confirm frame flex flex-col h-screen", { reinstall: ze.value }]) },
                        [
                          Ce.value.fs
                            ? ((0, m.wg)(),
                              (0, m.iD)("div", $, [
                                (0, m._)("b", { textContent: (0, w.zw)(Ce.value.fs[0]) }, null, 8, L),
                                (0, m._)("ol", null, [
                                  ((0, m.wg)(!0),
                                  (0, m.iD)(
                                    m.HY,
                                    null,
                                    (0, m.Ko)(
                                      Ce.value.fs.slice(1),
                                      (e, t) => (
                                        (0, m.wg)(),
                                        (0, m.iD)(
                                          "li",
                                          { key: t, textContent: (0, w.zw)(e), class: "mt-1" },
                                          null,
                                          8,
                                          z
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ]),
                                Z,
                                (0, m._)(
                                  "a",
                                  { class: "mt-1", href: (0, h.SU)(d.XB), textContent: (0, w.zw)((0, h.SU)(d.XB)) },
                                  null,
                                  8,
                                  j
                                ),
                                O,
                                (0, m.Wm)(
                                  (0, h.SU)(S.Z),
                                  { name: "helpForLocalFile", label: (0, h.SU)(r.ag)("helpForLocalFile") },
                                  null,
                                  8,
                                  ["label"]
                                ),
                              ]))
                            : ((0, m.wg)(),
                              (0, m.iD)(
                                m.HY,
                                { key: 1 },
                                [
                                  (0, m._)("div", T, [
                                    (0, m._)("div", W, [
                                      F,
                                      (0, m._)("div", E, [
                                        (0, m._)("h1", null, [
                                          (0, m._)("div", null, [
                                            (0, m._)("span", { textContent: (0, w.zw)(xe.value) }, null, 8, I),
                                            Oe.value
                                              ? ((0, m.wg)(),
                                                (0, m.iD)(
                                                  "span",
                                                  {
                                                    key: 0,
                                                    textContent: (0, w.zw)((0, h.SU)(r.ag)("msgSameCode")),
                                                    style: { "font-weight": "normal" },
                                                  },
                                                  null,
                                                  8,
                                                  q
                                                ))
                                              : (0, m.kq)("", !0),
                                          ]),
                                          (0, m._)(
                                            "div",
                                            { class: "ellipsis", textContent: (0, w.zw)(Le.value) },
                                            null,
                                            8,
                                            P
                                          ),
                                        ]),
                                        (0, m._)("div", Y, [
                                          (0, m.Wm)(
                                            (0, h.SU)(b.Z),
                                            {
                                              content: (0, h.SU)(r.ag)("editNavCode"),
                                              class: "abs-center",
                                              placement: "right",
                                            },
                                            {
                                              default: (0, m.w5)(() => [(0, m.Wm)((0, h.SU)(k.Z), { name: "code" })]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                          (0, m._)(
                                            "span",
                                            {
                                              class: "ellipsis",
                                              textContent: (0, w.zw)(
                                                Ce.value.url ? decodeURIComponent(Ce.value.url) : "..."
                                              ),
                                            },
                                            null,
                                            8,
                                            M
                                          ),
                                        ]),
                                        ((0, m.wg)(!0),
                                        (0, m.iD)(
                                          m.HY,
                                          null,
                                          (0, m.Ko)(
                                            Ee.value,
                                            ([e, t, a]) => (
                                              (0, m.wg)(),
                                              (0, m.iD)(
                                                "a",
                                                { key: t, class: "flex", target: "_blank", href: e },
                                                [
                                                  (0, m.Wm)(
                                                    (0, h.SU)(b.Z),
                                                    { content: a, class: "abs-center", placement: "right" },
                                                    {
                                                      default: (0, m.w5)(() => [
                                                        (0, m.Wm)((0, h.SU)(k.Z), { name: t }, null, 8, ["name"]),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1032,
                                                    ["content"]
                                                  ),
                                                  (0, m._)(
                                                    "span",
                                                    {
                                                      class: "ellipsis",
                                                      textContent: (0, w.zw)(decodeURIComponent(e)),
                                                    },
                                                    null,
                                                    8,
                                                    B
                                                  ),
                                                ],
                                                8,
                                                R
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                        (0, m._)("p", { class: "descr", textContent: (0, w.zw)(be.value) }, null, 8, G),
                                        (0, m._)(
                                          "div",
                                          { class: "lists flex flex-wrap", "data-collapsed": !De.value },
                                          [
                                            (0, m._)(
                                              "div",
                                              {
                                                class: "toggle abs-center",
                                                onClick: t[0] || (t[0] = (e) => (De.value = !De.value)),
                                              },
                                              [
                                                He.value
                                                  ? ((0, m.wg)(),
                                                    (0, m.j4)(
                                                      (0, h.SU)(b.Z),
                                                      {
                                                        key: 0,
                                                        content: (0, h.SU)(r.ag)("msgShowHide"),
                                                        placement: "bottom",
                                                        align: "left",
                                                      },
                                                      {
                                                        default: (0, m.w5)(() => [
                                                          (0, m.Wm)((0, h.SU)(k.Z), { name: "info" }),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["content"]
                                                    ))
                                                  : (0, m.kq)("", !0),
                                              ]
                                            ),
                                            ((0, m.wg)(!0),
                                            (0, m.iD)(
                                              m.HY,
                                              null,
                                              (0, m.Ko)(
                                                He.value,
                                                (e, t) => (
                                                  (0, m.wg)(),
                                                  (0, m.iD)(
                                                    "dl",
                                                    { key: t, "data-type": t, hidden: !e.length, tabindex: "0" },
                                                    [
                                                      (0, m._)(
                                                        "dt",
                                                        {
                                                          textContent: (0, w.zw)(
                                                            t ? `@${t}` : (0, h.SU)(r.ag)("genericError")
                                                          ),
                                                        },
                                                        null,
                                                        8,
                                                        J
                                                      ),
                                                      (0, m._)(
                                                        "dd",
                                                        { textContent: (0, w.zw)(e), class: "ellipsis" },
                                                        null,
                                                        8,
                                                        K
                                                      ),
                                                    ],
                                                    8,
                                                    A
                                                  )
                                                )
                                              ),
                                              128
                                            )),
                                          ],
                                          8,
                                          N
                                        ),
                                      ]),
                                    ]),
                                    Te.value
                                      ? ((0, m.wg)(),
                                        (0, m.iD)("div", Q, [
                                          (0, m._)("div", V, [(0, m._)("img", { src: je.value }, null, 8, X)]),
                                          (0, m._)(
                                            "div",
                                            { class: "actions flex flex-wrap ml-1c", ref_key: "$buttons", ref: ve },
                                            [
                                              (0, m._)(
                                                "button",
                                                (0, m.dG)(
                                                  {
                                                    id: "confirm",
                                                    "data-hotkey": Fe.value[0],
                                                    textContent: (0, w.zw)(
                                                      (e._verb = ze.value
                                                        ? (0, h.SU)(r.ag)("reinstall")
                                                        : (0, h.SU)(r.ag)("install"))
                                                    ),
                                                  },
                                                  (e._bind = { disabled: !_e.value, onclick: vt })
                                                ),
                                                null,
                                                16,
                                                ee
                                              ),
                                              (0, m._)(
                                                "button",
                                                (0, m.dG)(
                                                  {
                                                    id: "+close",
                                                    "data-verb": e._verb,
                                                    "data-hotkey": Fe.value.close,
                                                    textContent: (0, w.zw)((0, h.SU)(r.ag)("buttonClose")),
                                                  },
                                                  e._bind
                                                ),
                                                null,
                                                16,
                                                te
                                              ),
                                              (0, m.Wm)(
                                                (0, h.SU)(S.Z),
                                                {
                                                  name: "closeAfterInstall",
                                                  ref_key: "$close",
                                                  ref: de,
                                                  class: (0, w.C_)([
                                                    "btn-ghost",
                                                    { dim: Fe.value.track || Fe.value.edit },
                                                  ]),
                                                  title: (0, h.SU)(c),
                                                },
                                                null,
                                                8,
                                                ["class", "title"]
                                              ),
                                              (0, m._)(
                                                "button",
                                                (0, m.dG)(
                                                  {
                                                    id: "+edit",
                                                    "data-verb": e._verb,
                                                    "data-hotkey": Fe.value.edit,
                                                    textContent: (0, w.zw)((0, h.SU)(r.ag)("buttonEdit")),
                                                  },
                                                  e._bind
                                                ),
                                                null,
                                                16,
                                                ae
                                              ),
                                              (0, m.Wm)(
                                                (0, h.SU)(S.Z),
                                                {
                                                  name: "editAfterInstall",
                                                  ref_key: "$edit",
                                                  ref: ge,
                                                  class: (0, w.C_)(["btn-ghost", { dim: Fe.value.track }]),
                                                  title: (0, h.SU)(c),
                                                },
                                                null,
                                                8,
                                                ["title", "class"]
                                              ),
                                              Ue.value
                                                ? ((0, m.wg)(),
                                                  (0, m.iD)(
                                                    m.HY,
                                                    { key: 0 },
                                                    [
                                                      (0, m._)(
                                                        "button",
                                                        {
                                                          id: "+track",
                                                          onClick: vt,
                                                          "data-hotkey": Fe.value.track,
                                                          disabled: !We.value && !_e.value && !Se.value,
                                                          textContent: (0, w.zw)(
                                                            We.value
                                                              ? (0, h.SU)(r.ag)("stopTracking")
                                                              : `\u271a ${(0, h.SU)(r.ag)("trackEdits")}`
                                                          ),
                                                        },
                                                        null,
                                                        8,
                                                        le
                                                      ),
                                                      (0, m.wy)(
                                                        (0, m.Wm)(
                                                          (0, h.SU)(S.Z),
                                                          {
                                                            name: "trackLocalFile",
                                                            ref_key: "$track",
                                                            ref: fe,
                                                            class: "btn-ghost",
                                                            onChange: dt,
                                                            title: (0, h.SU)(c),
                                                          },
                                                          null,
                                                          8,
                                                          ["title"]
                                                        ),
                                                        [[y.F8, !We.value]]
                                                      ),
                                                      (0, m.wy)(
                                                        (0, m.Wm)(
                                                          (0, h.SU)(b.Z),
                                                          { content: (0, h.SU)(r.ag)("reloadTabTrackHint") },
                                                          {
                                                            default: (0, m.w5)(() => [
                                                              (0, m._)("label", ne, [
                                                                (0, m.wy)(
                                                                  (0, m._)(
                                                                    "input",
                                                                    {
                                                                      type: "checkbox",
                                                                      "onUpdate:modelValue":
                                                                        t[1] || (t[1] = (e) => (Ze.value = e)),
                                                                    },
                                                                    null,
                                                                    512
                                                                  ),
                                                                  [[y.e8, Ze.value]]
                                                                ),
                                                                (0, m._)(
                                                                  "span",
                                                                  {
                                                                    textContent: (0, w.zw)(
                                                                      (0, h.SU)(r.ag)("reloadTab")
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
                                                        [[y.F8, We.value]]
                                                      ),
                                                    ],
                                                    64
                                                  ))
                                                : (0, m.kq)("", !0),
                                              (0, m._)(
                                                "button",
                                                { textContent: (0, w.zw)((0, h.SU)(r.ag)("buttonClose")), onClick: ut },
                                                null,
                                                8,
                                                ie
                                              ),
                                              $e.value
                                                ? ((0, m.wg)(),
                                                  (0, m.iD)(
                                                    "div",
                                                    {
                                                      key: 1,
                                                      textContent: (0, w.zw)($e.value),
                                                      title: ke.value,
                                                      class: "status stretch-self flex center-items ml-2",
                                                    },
                                                    null,
                                                    8,
                                                    se
                                                  ))
                                                : (0, m.kq)("", !0),
                                            ],
                                            512
                                          ),
                                        ]))
                                      : (0, m.kq)("", !0),
                                    Ce.value.incognito
                                      ? ((0, m.wg)(),
                                        (0, m.iD)(
                                          "div",
                                          {
                                            key: 1,
                                            class: "incognito",
                                            textContent: (0, w.zw)((0, h.SU)(r.ag)("msgIncognitoChanges")),
                                          },
                                          null,
                                          8,
                                          ue
                                        ))
                                      : (0, m.kq)("", !0),
                                  ]),
                                  (0, m._)("div", re, [
                                    Te.value
                                      ? ((0, m.wg)(),
                                        (0, m.j4)(
                                          (0, h.SU)(_.Z),
                                          {
                                            key: 0,
                                            ref_key: "$externals",
                                            ref: me,
                                            value: Te.value,
                                            class: "abs-full",
                                            "cm-options": pe.value,
                                            commands: he.value,
                                            install: { code: we.value, deps: ye.value, url: Ce.value.url },
                                          },
                                          null,
                                          8,
                                          ["value", "cm-options", "commands", "install"]
                                        ))
                                      : (0, m.kq)("", !0),
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
            ;(document.title = `${(0, r.ag)("labelInstall")} - ${(0, r.ag)("extName")}`),
              c.Z.ready.then(() => {
                ;(0, d.sY)(ve)
              })
          },
          6291: (e, t, a) => {
            var l = {
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
            function n(e) {
              var t = s(e)
              return a(t)
            }
            function s(e) {
              if (!a.o(l, e)) {
                var t = new o("Cannot find module '" + e + "'")
                throw ((t.code = "MODULE_NOT_FOUND"), t)
              }
              return l[e]
            }
            ;(n.keys = () => i.keys(l)), (n.resolve = s), (e.exports = n), (n.id = 6291)
          },
        },
        r = {}
      function c(e) {
        var t = r[e]
        if (void 0 !== t) return t.exports
        var a = (r[e] = { exports: {} })
        return u[e].call(a.exports, a, a.exports, c), a.exports
      }
      ;(c.m = u),
        (a = []),
        (c.O = (e, t, l, n) => {
          if (!t) {
            var o = 1 / 0
            for (v = 0; v < a.length; v++) {
              for (var [t, l, n] = a[v], s = !0, u = 0; u < t.length; u++)
                (!1 & n || o >= n) && i.keys(c.O).every((e) => c.O[e](t[u]))
                  ? t.splice(u--, 1)
                  : ((s = !1), n < o && (o = n))
              if (s) {
                a.splice(v--, 1)
                var r = l()
                void 0 !== r && (e = r)
              }
            }
            return e
          }
          n = n || 0
          for (var v = a.length; v > 0 && a[v - 1][2] > n; v--) a[v] = a[v - 1]
          a[v] = [t, l, n]
        }),
        (c.n = (e) => {
          var t = e && e.__esModule ? () => e.default : () => e
          return c.d(t, { a: t }), t
        }),
        (c.d = (e, t) => {
          for (var a in t) c.o(t, a) && !c.o(e, a) && i.defineProperty(e, a, { enumerable: !0, get: t[a] })
        }),
        (c.o = (e, t) => i.prototype.hasOwnProperty.call(e, t)),
        (c.r = (e) => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            i.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            i.defineProperty(e, "__esModule", { value: !0 })
        }),
        (c.j = 47),
        (() => {
          var e = { 47: 0 }
          c.O.j = (t) => 0 === e[t]
          var t = (t, a) => {
              var l,
                n,
                [o, i, s] = a,
                u = 0
              if (o.some((t) => 0 !== e[t])) {
                for (l in i) c.o(i, l) && (c.m[l] = i[l])
                if (s) var r = s(c)
              }
              for (t && t(a); u < o.length; u++) (n = o[u]), c.o(e, n) && e[n] && e[n][0](), (e[n] = 0)
              return c.O(r)
            },
            a = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
          a.forEach(t.bind(null, 0)), (a.push = t.bind(null, a.push.bind(a)))
        })()
      var d = c.O(void 0, [386, 84], () => c(8017))
      d = c.O(d)
    })()
}
