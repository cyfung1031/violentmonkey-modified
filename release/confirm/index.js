{
  const e = this,
    { window: t } = e,
    l = "scripts",
    a = "responseType",
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
    f = "#" + l,
    m = (c.runtime.getURL("/").slice(0, -1), c.runtime.getManifest()),
    p = c.runtime.getURL(m.options_ui.page).split("#", 1)[0]
  c.runtime.getURL(m.icons[16].replace("16.png", "")),
    (() => {
      var e,
        l = {
          8017: (e, l, o) => {
            "use strict"
            o(1871)
            var u = o(5313),
              r = (o(6711), o(5010)),
              c = o(1226),
              d = (o(3700), o(9994), o(6252)),
              m = o(2502),
              w = o(2262),
              h = o(9963),
              y = o(9824),
              b = o(6877),
              k = o(7458),
              x = o(8464),
              C = o(6115),
              _ = o(7407),
              S = o(2477),
              U = o(2380),
              H = o(9518)
            const $ = { key: 0, id: "wall" },
              D = ["textContent"],
              L = ["textContent"],
              z = (0, d._)("hr", null, null, -1),
              Z = ["href", "textContent"],
              j = (0, d._)("hr", null, null, -1),
              T = { class: "frame-block" },
              W = { class: "flex" },
              O = (0, d._)("div", { class: "image" }, [(0, d._)("img", { src: "/public/images/icon128.png" })], -1),
              E = { class: "info" },
              F = ["textContent"],
              I = ["textContent"],
              q = ["textContent"],
              P = { class: "flex" },
              Y = ["textContent"],
              M = ["href"],
              R = ["textContent"],
              B = ["textContent"],
              G = ["data-collapsed"],
              N = ["data-type", "hidden"],
              A = ["textContent"],
              J = ["textContent"],
              K = { key: 0, class: "flex" },
              Q = { class: "image flex" },
              V = ["src"],
              X = ["data-hotkey", "textContent"],
              ee = ["data-verb", "data-hotkey", "textContent"],
              te = ["data-verb", "data-hotkey", "textContent"],
              le = ["data-hotkey", "disabled", "textContent"],
              ae = { class: "setting-check" },
              ne = ["textContent"],
              oe = ["textContent"],
              ie = ["textContent", "title"],
              se = ["textContent"],
              ue = { class: "frame-block flex-1 pos-rel" },
              re = "file:///*drag-n-drop*/",
              ce = {
                __name: "app",
                setup(e) {
                  const l = ("m" === k.LY.ctrlcmd ? "\u2318" : "Ctrl-") + "Enter",
                    o = (0, x.Z)({ lifetime: 9e3 }),
                    r = (0, u.ag)("labelRunAtDefault"),
                    ce = (0, w.iH)(),
                    ve = (0, w.iH)(),
                    de = (0, w.iH)(),
                    ge = (0, w.iH)(),
                    fe = (0, w.iH)(),
                    me = (0, w.iH)({ lineWrapping: !0 }),
                    pe = (0, w.iH)(""),
                    we = (0, w.iH)({ close: it }),
                    he = (0, w.iH)({}),
                    ye = (0, w.iH)(""),
                    be = (0, w.iH)(),
                    ke = (0, w.iH)((0, u.ag)("msgLoadingData")),
                    xe = (0, w.iH)({}),
                    Ce = (0, w.iH)(!1),
                    _e = (0, w.iH)(!1),
                    Se = (0, d.Fl)(() => !(0, u.Q1)(xe.value.url)),
                    Ue = (0, w.iH)(),
                    He = (0, w.iH)(!0),
                    $e = (0, w.iH)(""),
                    De = (0, w.iH)("..."),
                    Le = (0, w.iH)(!1),
                    ze = (0, w.iH)(!1),
                    Ze = (0, w.iH)(),
                    je = (0, w.iH)(!1),
                    Te = (0, w.iH)(),
                    We = (0, w.iH)(!1),
                    Oe = (0, d.Fl)(() => {
                      var e, t, a
                      return {
                        [Se.value && null != (e = ge.value) && e.value
                          ? "track"
                          : null != (t = de.value) && t.value
                            ? "edit"
                            : null != (a = ve.value) && a.value
                              ? "close"
                              : 0]: l,
                      }
                    }),
                    Ee = (0, d.Fl)(() => {
                      const e = Te.value,
                        t = e && (0, u.t$)(e),
                        l = null == e ? void 0 : e.meta.supportURL
                      return [
                        t && [t, "home", (0, u.ag)("labelHomepage")],
                        l && [l, "question", (0, u.ag)("buttonSupport")],
                      ].filter(n)
                    })
                  let Fe, Ie, qe, Pe, Ye, Me, Re, Be, Ge, Ne, Ae, Je, Ke, Qe, Ve, Xe
                  async function et() {
                    await at(),
                      (await nt()) &&
                        (await s.all([
                          vt(),
                          (async () => {
                            let e = 2
                            for (; !(await ot()) && e; ) await (0, u.dL)(3e3), (e -= 1)
                          })(),
                        ]),
                        Ce.value && (ke.value = Le.value ? (0, u.ag)("labelReinstall") : (0, u.ag)("labelInstall")))
                  }
                  function tt() {
                    ;(Ge = [
                      k.$J.register("ctrlcmd-enter", () => {
                        ce.value.querySelector("[data-hotkey]").click()
                      }),
                    ]),
                      k.$J.enable()
                  }
                  async function lt(e) {
                    ;(xe.value.fs = Ce.value = We.value = !1),
                      null == Re || Re(),
                      await Xe,
                      await (0, d.Y3)(),
                      (Fe = e),
                      (Ae = xe.value = { url: e._url || re + e.name }),
                      (be.value = Ze.value = $e.value = Je = Qe = null),
                      await et(),
                      Ge || tt()
                  }
                  async function at(e) {
                    var t
                    Ce.value = !1
                    const l = Pe ? await new s(dt) : await ut(Ae.url)
                    if (null == l || (e && pe.value === l)) throw 0
                    const a = null == (t = fe.value) ? void 0 : t.$code.cm,
                      n = a && l.split(/\r?\n/)
                    let o,
                      i = -1
                    null == a || a.eachLine(({ text: e }) => (o = e !== n[++i])),
                      (pe.value = l),
                      (o || (a && i < n.length - 1)) &&
                        (await (0, d.Y3)(), a.setCursor(i), a.scrollIntoView(null, a.display.lastWrapHeight / 3))
                  }
                  async function nt() {
                    const e = await (0, u.gj)("ParseMeta", pe.value),
                      { meta: t, errors: l } = e,
                      a = (0, u.iQ)(t, "name")
                    if (
                      ((document.title = `${a.slice(0, 100) || l[0]}${a.length > 100 ? "..." : ""} - ${Ye || (Ye = document.title)}`),
                      (De.value = g(u.Hv, [a, t.version], ", ")),
                      (ye.value = (0, u.iQ)(t, "description")),
                      (Ue.value = i.assign(
                        t
                          ? (0, U.zr)(
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
                      (Te.value = { meta: t || {}, custom: {}, props: {} }),
                      t && ((Ke = [...new Set(t.require)]), (Ve = [...new Set(i.values(t.resources))])),
                      a)
                    )
                      return e
                    ke.value = (0, u.ag)("msgInvalidScript")
                  }
                  async function ot() {
                    if (
                      (Ze.value ||
                        (0, S.d)(Te.value).then((e) => {
                          Ze.value = e
                        }),
                      Je &&
                        (0, U.vZ)([...Ke].sort(), i.keys(Je).sort()) &&
                        (0, U.vZ)([...Ve].sort(), i.keys(Qe).sort()))
                    )
                      return
                    ;(Je = {}), (Qe = {})
                    let e = 0
                    const t = Ke.length + Ve.length,
                      l = v.now(),
                      a = () => {
                        v.now() - l > 500 && ($e.value = (0, u.ag)("msgLoadingDependency", [e, t]))
                      },
                      n = async (t, l, n) => {
                        const o = (0, u.mn)(t, Ae.url),
                          i = `${+n}${t}`
                        try {
                          ;(he.value[i] = l[o] = await st(o, { isBlob: n, useCache: !0 })), (e += 1), a()
                        } catch (e) {
                          return (he.value[i] = !1), t
                        }
                      },
                      o = setTimeout(a, 500),
                      r = [...Ke.map((e) => n(e, Je, !1)), ...Ve.map((e) => n(e, Qe, !0))],
                      c = g(u.Hv, await s.all(r), "\n")
                    if ((clearTimeout(o), !c)) return (be.value = null), (Ce.value = !0), ($e.value = null), !0
                    ;($e.value = (0, u.ag)("msgErrorLoadingDependency")), (be.value = c)
                  }
                  function it() {
                    ;(0, u.gj)("TabClose")
                  }
                  async function st(e, { isBlob: t, useCache: l } = {}) {
                    const n = t ? `blob+${e}` : `text+${e}`
                    if (l && o.has(n)) return o.get(n)
                    const i = await (0, u.WY)(e, { [a]: t ? "blob" : null }),
                      s = t ? await (0, u.LZ)(i) : i.data
                    return l && o.put(n, s), s
                  }
                  async function ut(e) {
                    try {
                      return Fe ? await (await Fe.getFile()).text() : (Me && (await Me)) || (await st(e))
                    } catch (t) {
                      throw (($e.value = (0, u.ag)("msgErrorLoadingData")), e)
                    } finally {
                      Me = null
                    }
                  }
                  async function rt(e, t) {
                    const l = null == e ? void 0 : e.target.id
                    if ("+track" === l && We.value) null == Re || Re(!0)
                    else {
                      Ce.value = !1
                      try {
                        const { update: e } = await (0, u.gj)("ParseScript", {
                            ...t,
                            code: pe.value,
                            url: Ae.url,
                            from: Ae.from,
                            require: Je,
                            cache: Qe,
                            reloadTab: ze.value,
                            reuseDeps: !!Be,
                          }),
                          a = new Date().toLocaleTimeString(["fr"]),
                          n = Be || (Be = a)
                        ;($e.value = `${e.message} ${n}${n === a ? "" : ` --\x3e ${a}`}`),
                          (_e.value = !0),
                          "+track" === l
                            ? (($e.value =
                                (0, u.ag)("trackEditsNote") +
                                (Ae.ff >= 68 ? " " + (0, u.ag)("installOptionTrackTooltip") : "")),
                              ct())
                            : "+edit" === l
                              ? (location.href = p + f + "/" + e.props.id)
                              : "+close" === l && it()
                      } catch (e) {
                        ;($e.value = `${e}`), (Ce.value = !0)
                      }
                    }
                  }
                  async function ct() {
                    if (!We.value && Se.value && _e.value) {
                      for (
                        Me = null, We.value = !0;
                        We.value &&
                        !(await s.race([
                          (0, u.dL)(500),
                          (Xe = new s((e) => {
                            Re = e
                          })),
                        ]));

                      ) {
                        try {
                          await at(!0)
                          const e = await nt()
                          await ot(), await rt(null, e), (je.value = !1)
                        } catch (e) {}
                        Re()
                      }
                      Xe = We.value = !1
                    }
                  }
                  async function vt() {
                    const { name: e, namespace: t } = Te.value.meta || {},
                      l = await (0, u.gj)("GetScript", { meta: { name: e, namespace: t } })
                    ;(Le.value = !!l), (je.value = l && pe.value === (await (0, u.gj)("GetScriptCode", l.props.id)))
                  }
                  function dt(e) {
                    ;(qe = e),
                      Ie ||
                        ((Ie = browser.tabs.connect(Ae.tabId, { name: "FetchSelf" })),
                        Ie.onMessage.addListener((e) => qe(e)),
                        Ie.onDisconnect.addListener(() => {
                          null == Re || Re(!0), (Ie = null)
                        })),
                      Ie.postMessage(null)
                  }
                  return (
                    (0, d.bv)(async () => {
                      const e = `confirm-${H.BC.paths[0]}`
                      ;(Fe = t.fsh),
                        i.defineProperty(t, "fsh", { set: lt }),
                        (Ae = xe.value = Fe ? { url: Fe._url || re + Fe.name } : await (0, u.gj)("CacheLoad", e)),
                        Ae
                          ? Ae.fs
                            ? (xe.value.fs = (0, u.ag)("fileInstallBlocked").split(/<\d+>/))
                            : (Fe ||
                                ((Pe = Ae.ff >= 68 && Ae.url.startsWith("file:")),
                                (Me = (0, u.gj)("CachePop", Ae.url)),
                                (Ne = setInterval(u.gj, 5e3, "CacheHit", { key: e }))),
                              await et(),
                              tt())
                          : it()
                    }),
                    (0, d.Jd)(() => {
                      var e
                      clearInterval(Ne), null == (e = Ge) || e.forEach((e) => e())
                    }),
                    (e, t) => (
                      (0, d.wg)(),
                      (0, d.iD)(
                        "div",
                        { class: (0, m.C_)(["page-confirm frame flex flex-col h-screen", { reinstall: Le.value }]) },
                        [
                          xe.value.fs
                            ? ((0, d.wg)(),
                              (0, d.iD)("div", $, [
                                (0, d._)("b", { textContent: (0, m.zw)(xe.value.fs[0]) }, null, 8, D),
                                (0, d._)("ol", null, [
                                  ((0, d.wg)(!0),
                                  (0, d.iD)(
                                    d.HY,
                                    null,
                                    (0, d.Ko)(
                                      xe.value.fs.slice(1),
                                      (e, t) => (
                                        (0, d.wg)(),
                                        (0, d.iD)(
                                          "li",
                                          { key: t, textContent: (0, m.zw)(e), class: "mt-1" },
                                          null,
                                          8,
                                          L
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ]),
                                z,
                                (0, d._)(
                                  "a",
                                  { class: "mt-1", href: (0, w.SU)(c.XB), textContent: (0, m.zw)((0, w.SU)(c.XB)) },
                                  null,
                                  8,
                                  Z
                                ),
                                j,
                                (0, d.Wm)(
                                  (0, w.SU)(_.Z),
                                  { name: "helpForLocalFile", label: (0, w.SU)(u.ag)("helpForLocalFile") },
                                  null,
                                  8,
                                  ["label"]
                                ),
                              ]))
                            : ((0, d.wg)(),
                              (0, d.iD)(
                                d.HY,
                                { key: 1 },
                                [
                                  (0, d._)("div", T, [
                                    (0, d._)("div", W, [
                                      O,
                                      (0, d._)("div", E, [
                                        (0, d._)("h1", null, [
                                          (0, d._)("div", null, [
                                            (0, d._)("span", { textContent: (0, m.zw)(ke.value) }, null, 8, F),
                                            je.value
                                              ? ((0, d.wg)(),
                                                (0, d.iD)(
                                                  "span",
                                                  {
                                                    key: 0,
                                                    textContent: (0, m.zw)((0, w.SU)(u.ag)("msgSameCode")),
                                                    style: { "font-weight": "normal" },
                                                  },
                                                  null,
                                                  8,
                                                  I
                                                ))
                                              : (0, d.kq)("", !0),
                                          ]),
                                          (0, d._)(
                                            "div",
                                            { class: "ellipsis", textContent: (0, m.zw)(De.value) },
                                            null,
                                            8,
                                            q
                                          ),
                                        ]),
                                        (0, d._)("div", P, [
                                          (0, d.Wm)(
                                            (0, w.SU)(y.Z),
                                            {
                                              content: (0, w.SU)(u.ag)("editNavCode"),
                                              class: "abs-center",
                                              placement: "right",
                                            },
                                            {
                                              default: (0, d.w5)(() => [(0, d.Wm)((0, w.SU)(b.Z), { name: "code" })]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                          (0, d._)(
                                            "span",
                                            {
                                              class: "ellipsis",
                                              textContent: (0, m.zw)(
                                                xe.value.url ? decodeURIComponent(xe.value.url) : "..."
                                              ),
                                            },
                                            null,
                                            8,
                                            Y
                                          ),
                                        ]),
                                        ((0, d.wg)(!0),
                                        (0, d.iD)(
                                          d.HY,
                                          null,
                                          (0, d.Ko)(
                                            Ee.value,
                                            ([e, t, l]) => (
                                              (0, d.wg)(),
                                              (0, d.iD)(
                                                "a",
                                                { key: t, class: "flex", target: "_blank", href: e },
                                                [
                                                  (0, d.Wm)(
                                                    (0, w.SU)(y.Z),
                                                    { content: l, class: "abs-center", placement: "right" },
                                                    {
                                                      default: (0, d.w5)(() => [
                                                        (0, d.Wm)((0, w.SU)(b.Z), { name: t }, null, 8, ["name"]),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1032,
                                                    ["content"]
                                                  ),
                                                  (0, d._)(
                                                    "span",
                                                    {
                                                      class: "ellipsis",
                                                      textContent: (0, m.zw)(decodeURIComponent(e)),
                                                    },
                                                    null,
                                                    8,
                                                    R
                                                  ),
                                                ],
                                                8,
                                                M
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                        (0, d._)("p", { class: "descr", textContent: (0, m.zw)(ye.value) }, null, 8, B),
                                        (0, d._)(
                                          "div",
                                          { class: "lists flex flex-wrap", "data-collapsed": !He.value },
                                          [
                                            (0, d._)(
                                              "div",
                                              {
                                                class: "toggle abs-center",
                                                onClick: t[0] || (t[0] = (e) => (He.value = !He.value)),
                                              },
                                              [
                                                Ue.value
                                                  ? ((0, d.wg)(),
                                                    (0, d.j4)(
                                                      (0, w.SU)(y.Z),
                                                      {
                                                        key: 0,
                                                        content: (0, w.SU)(u.ag)("msgShowHide"),
                                                        placement: "bottom",
                                                        align: "left",
                                                      },
                                                      {
                                                        default: (0, d.w5)(() => [
                                                          (0, d.Wm)((0, w.SU)(b.Z), { name: "info" }),
                                                        ]),
                                                        _: 1,
                                                      },
                                                      8,
                                                      ["content"]
                                                    ))
                                                  : (0, d.kq)("", !0),
                                              ]
                                            ),
                                            ((0, d.wg)(!0),
                                            (0, d.iD)(
                                              d.HY,
                                              null,
                                              (0, d.Ko)(
                                                Ue.value,
                                                (e, t) => (
                                                  (0, d.wg)(),
                                                  (0, d.iD)(
                                                    "dl",
                                                    { key: t, "data-type": t, hidden: !e.length, tabindex: "0" },
                                                    [
                                                      (0, d._)(
                                                        "dt",
                                                        {
                                                          textContent: (0, m.zw)(
                                                            t ? `@${t}` : (0, w.SU)(u.ag)("genericError")
                                                          ),
                                                        },
                                                        null,
                                                        8,
                                                        A
                                                      ),
                                                      (0, d._)(
                                                        "dd",
                                                        { textContent: (0, m.zw)(e), class: "ellipsis" },
                                                        null,
                                                        8,
                                                        J
                                                      ),
                                                    ],
                                                    8,
                                                    N
                                                  )
                                                )
                                              ),
                                              128
                                            )),
                                          ],
                                          8,
                                          G
                                        ),
                                      ]),
                                    ]),
                                    Te.value
                                      ? ((0, d.wg)(),
                                        (0, d.iD)("div", K, [
                                          (0, d._)("div", Q, [(0, d._)("img", { src: Ze.value }, null, 8, V)]),
                                          (0, d._)(
                                            "div",
                                            { class: "actions flex flex-wrap ml-1c", ref_key: "$buttons", ref: ce },
                                            [
                                              (0, d._)(
                                                "button",
                                                (0, d.dG)(
                                                  {
                                                    id: "confirm",
                                                    "data-hotkey": Oe.value[0],
                                                    textContent: (0, m.zw)(
                                                      (e._verb = Le.value
                                                        ? (0, w.SU)(u.ag)("reinstall")
                                                        : (0, w.SU)(u.ag)("install"))
                                                    ),
                                                  },
                                                  (e._bind = { disabled: !Ce.value, onclick: rt })
                                                ),
                                                null,
                                                16,
                                                X
                                              ),
                                              (0, d._)(
                                                "button",
                                                (0, d.dG)(
                                                  {
                                                    id: "+close",
                                                    "data-verb": e._verb,
                                                    "data-hotkey": Oe.value.close,
                                                    textContent: (0, m.zw)((0, w.SU)(u.ag)("buttonClose")),
                                                  },
                                                  e._bind
                                                ),
                                                null,
                                                16,
                                                ee
                                              ),
                                              (0, d.Wm)(
                                                (0, w.SU)(_.Z),
                                                {
                                                  name: "closeAfterInstall",
                                                  ref_key: "$close",
                                                  ref: ve,
                                                  class: (0, m.C_)([
                                                    "btn-ghost",
                                                    { dim: Oe.value.track || Oe.value.edit },
                                                  ]),
                                                  title: (0, w.SU)(r),
                                                },
                                                null,
                                                8,
                                                ["class", "title"]
                                              ),
                                              (0, d._)(
                                                "button",
                                                (0, d.dG)(
                                                  {
                                                    id: "+edit",
                                                    "data-verb": e._verb,
                                                    "data-hotkey": Oe.value.edit,
                                                    textContent: (0, m.zw)((0, w.SU)(u.ag)("buttonEdit")),
                                                  },
                                                  e._bind
                                                ),
                                                null,
                                                16,
                                                te
                                              ),
                                              (0, d.Wm)(
                                                (0, w.SU)(_.Z),
                                                {
                                                  name: "editAfterInstall",
                                                  ref_key: "$edit",
                                                  ref: de,
                                                  class: (0, m.C_)(["btn-ghost", { dim: Oe.value.track }]),
                                                  title: (0, w.SU)(r),
                                                },
                                                null,
                                                8,
                                                ["title", "class"]
                                              ),
                                              Se.value
                                                ? ((0, d.wg)(),
                                                  (0, d.iD)(
                                                    d.HY,
                                                    { key: 0 },
                                                    [
                                                      (0, d._)(
                                                        "button",
                                                        {
                                                          id: "+track",
                                                          onClick: rt,
                                                          "data-hotkey": Oe.value.track,
                                                          disabled: !We.value && !Ce.value && !_e.value,
                                                          textContent: (0, m.zw)(
                                                            We.value
                                                              ? (0, w.SU)(u.ag)("stopTracking")
                                                              : `\u271a ${(0, w.SU)(u.ag)("trackEdits")}`
                                                          ),
                                                        },
                                                        null,
                                                        8,
                                                        le
                                                      ),
                                                      (0, d.wy)(
                                                        (0, d.Wm)(
                                                          (0, w.SU)(_.Z),
                                                          {
                                                            name: "trackLocalFile",
                                                            ref_key: "$track",
                                                            ref: ge,
                                                            class: "btn-ghost",
                                                            onChange: ct,
                                                            title: (0, w.SU)(r),
                                                          },
                                                          null,
                                                          8,
                                                          ["title"]
                                                        ),
                                                        [[h.F8, !We.value]]
                                                      ),
                                                      (0, d.wy)(
                                                        (0, d.Wm)(
                                                          (0, w.SU)(y.Z),
                                                          { content: (0, w.SU)(u.ag)("reloadTabTrackHint") },
                                                          {
                                                            default: (0, d.w5)(() => [
                                                              (0, d._)("label", ae, [
                                                                (0, d.wy)(
                                                                  (0, d._)(
                                                                    "input",
                                                                    {
                                                                      type: "checkbox",
                                                                      "onUpdate:modelValue":
                                                                        t[1] || (t[1] = (e) => (ze.value = e)),
                                                                    },
                                                                    null,
                                                                    512
                                                                  ),
                                                                  [[h.e8, ze.value]]
                                                                ),
                                                                (0, d._)(
                                                                  "span",
                                                                  {
                                                                    textContent: (0, m.zw)(
                                                                      (0, w.SU)(u.ag)("reloadTab")
                                                                    ),
                                                                  },
                                                                  null,
                                                                  8,
                                                                  ne
                                                                ),
                                                              ]),
                                                            ]),
                                                            _: 1,
                                                          },
                                                          8,
                                                          ["content"]
                                                        ),
                                                        [[h.F8, We.value]]
                                                      ),
                                                    ],
                                                    64
                                                  ))
                                                : (0, d.kq)("", !0),
                                              (0, d._)(
                                                "button",
                                                { textContent: (0, m.zw)((0, w.SU)(u.ag)("buttonClose")), onClick: it },
                                                null,
                                                8,
                                                oe
                                              ),
                                              $e.value
                                                ? ((0, d.wg)(),
                                                  (0, d.iD)(
                                                    "div",
                                                    {
                                                      key: 1,
                                                      textContent: (0, m.zw)($e.value),
                                                      title: be.value,
                                                      class: "status stretch-self flex center-items ml-2",
                                                    },
                                                    null,
                                                    8,
                                                    ie
                                                  ))
                                                : (0, d.kq)("", !0),
                                            ],
                                            512
                                          ),
                                        ]))
                                      : (0, d.kq)("", !0),
                                    xe.value.incognito
                                      ? ((0, d.wg)(),
                                        (0, d.iD)(
                                          "div",
                                          {
                                            key: 1,
                                            class: "incognito",
                                            textContent: (0, m.zw)((0, w.SU)(u.ag)("msgIncognitoChanges")),
                                          },
                                          null,
                                          8,
                                          se
                                        ))
                                      : (0, d.kq)("", !0),
                                  ]),
                                  (0, d._)("div", ue, [
                                    Te.value
                                      ? ((0, d.wg)(),
                                        (0, d.j4)(
                                          (0, w.SU)(C.Z),
                                          {
                                            key: 0,
                                            ref_key: "$externals",
                                            ref: fe,
                                            value: Te.value,
                                            class: "abs-full",
                                            "cm-options": me.value,
                                            commands: we.value,
                                            install: { code: pe.value, deps: he.value, url: xe.value.url },
                                          },
                                          null,
                                          8,
                                          ["value", "cm-options", "commands", "install"]
                                        ))
                                      : (0, d.kq)("", !0),
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
            ;(document.title = `${(0, u.ag)("labelInstall")} - ${(0, u.ag)("extName")}`),
              r.Z.ready.then(() => {
                ;(0, c.sY)(ce)
              })
          },
          6291: (e, t, l) => {
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
            function n(e) {
              var t = s(e)
              return l(t)
            }
            function s(e) {
              if (!l.o(a, e)) {
                var t = new o("Cannot find module '" + e + "'")
                throw ((t.code = "MODULE_NOT_FOUND"), t)
              }
              return a[e]
            }
            ;(n.keys = () => i.keys(a)), (n.resolve = s), (e.exports = n), (n.id = 6291)
          },
        },
        u = {}
      function r(e) {
        var t = u[e]
        if (void 0 !== t) return t.exports
        var a = (u[e] = { exports: {} })
        return l[e].call(a.exports, a, a.exports, r), a.exports
      }
      ;(r.m = l),
        (e = []),
        (r.O = (t, l, a, n) => {
          if (!l) {
            var o = 1 / 0
            for (v = 0; v < e.length; v++) {
              for (var [l, a, n] = e[v], s = !0, u = 0; u < l.length; u++)
                (!1 & n || o >= n) && i.keys(r.O).every((e) => r.O[e](l[u]))
                  ? l.splice(u--, 1)
                  : ((s = !1), n < o && (o = n))
              if (s) {
                e.splice(v--, 1)
                var c = a()
                void 0 !== c && (t = c)
              }
            }
            return t
          }
          n = n || 0
          for (var v = e.length; v > 0 && e[v - 1][2] > n; v--) e[v] = e[v - 1]
          e[v] = [l, a, n]
        }),
        (r.n = (e) => {
          var t = e && e.__esModule ? () => e.default : () => e
          return r.d(t, { a: t }), t
        }),
        (r.d = (e, t) => {
          for (var l in t) r.o(t, l) && !r.o(e, l) && i.defineProperty(e, l, { enumerable: !0, get: t[l] })
        }),
        (r.o = (e, t) => i.prototype.hasOwnProperty.call(e, t)),
        (r.r = (e) => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            i.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            i.defineProperty(e, "__esModule", { value: !0 })
        }),
        (r.j = 47),
        (() => {
          var e = { 47: 0 }
          r.O.j = (t) => 0 === e[t]
          var t = (t, l) => {
              var a,
                n,
                [o, i, s] = l,
                u = 0
              if (o.some((t) => 0 !== e[t])) {
                for (a in i) r.o(i, a) && (r.m[a] = i[a])
                if (s) var c = s(r)
              }
              for (t && t(l); u < o.length; u++) (n = o[u]), r.o(e, n) && e[n] && e[n][0](), (e[n] = 0)
              return r.O(c)
            },
            l = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
          l.forEach(t.bind(null, 0)), (l.push = t.bind(null, l.push.bind(l)))
        })()
      var c = r.O(void 0, [386, 84], () => r(8017))
      c = r.O(c)
    })()
}
