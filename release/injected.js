{
  const e = "**VMInitInjection**"
  if (1 !== window[e]) {
    const t = this,
      { window: n } = t,
      o = "Violentmonkey",
      a = "auto",
      r = "content",
      i = "expose",
      s = "forceContent",
      c = "ids",
      l = -1,
      d = 2,
      u = "injectInto",
      p = "more",
      f = "page",
      w = "runAt",
      h = "scripts",
      g = "response",
      m = "responseHeaders",
      y = "sessionId",
      b = "top",
      v = "xhrType",
      _ = "SkipScripts",
      k = (e) => "function" == typeof e,
      R = (e) => null != e && "object" == typeof e,
      C = "fileName",
      x = "prototype",
      L = "__CBID",
      M = (e) => "string" == typeof e,
      $ = (e, t, n) => {
        try {
          e && Z(e, t) && (n = e[t])
        } catch (e) {}
        return n
      },
      D = (e, t, n, o = !0, a) =>
        fe(e, t, { __proto__: null, [a || "value"]: n, [!a && "writable"]: o, configurable: o, enumerable: o }),
      E = (e) => pe(K(), e),
      S = (e = "VM") => e + ye(),
      T = (e, ...t) => {
        let n = `[${o}]`
        t[0] &&
          I(ee, t[0], (e) => {
            n += `[${e}]`
          }),
          (t[0] = n),
          P(Re[e], Re, t)
      },
      U = (e, t) => D(e, e.length, t),
      { apply: P } = Reflect,
      I = P.call.bind(P.call),
      {
        Blob: j,
        CustomEvent: N,
        Error: O,
        MouseEvent: A,
        Object: F,
        Promise: V,
        Response: H,
        Uint8Array: B,
        atob: q,
        addEventListener: G,
        cloneInto: W,
        chrome: J,
        dispatchEvent: X,
        removeEventListener: z,
      } = t,
      K = F.create.bind(F, null),
      Q = O,
      Y = H[x],
      Z = P.call.bind({}.hasOwnProperty),
      { forEach: ee, includes: te, map: ne } = [],
      { then: oe } = V[x],
      { indexOf: ae, slice: re } = "",
      ie = P.call.bind("".charCodeAt),
      { append: se, appendChild: ce, attachShadow: le, remove: de, setAttribute: ue } = Element[x],
      {
        assign: pe,
        defineProperty: fe,
        getOwnPropertyDescriptor: we,
        getPrototypeOf: he,
        setPrototypeOf: ge,
        keys: me,
      } = F,
      { random: ye } = Math,
      { toStringTag: be } = Symbol,
      { stopImmediatePropagation: ve } = Event[x],
      _e = we(N[x], "detail").get,
      ke = we(A[x], "relatedTarget").get,
      Re = E(console),
      Ce = J.runtime.getURL(""),
      xe = (e, t) => {
        for (let n = e; R(n) && (n = he(n)); ) if (n === t) return !0
      },
      Le = (
        (e) => (t) =>
          xe(t, e)
      )(V[x]),
      { document: Me } = t,
      { getElementsByTagName: $e } = Me,
      De = "reify"
    let Ee = t !== n,
      Se = n !== top ? 0 : Me.prerendering && "hidden" === Me.visibilityState ? 2 : 1
    ;(() => {
      "use strict"
      var F
      let { browser: fe } = t
      const ye = "addListener"
      if (Ee || (null != (F = fe) && F.runtime));
      else {
        const { Proxy: e } = t,
          { bind: n } = e,
          a = "message",
          r = "stack",
          i = (e) => e === ye || "removeListener" === e || "hasListener" === e || "hasListeners" === e,
          s = (e, t, o, a) => {
            const r = o[t]
            if (void 0 === r) return
            let s
            return (
              (s = k(a)
                ? a(o, r)
                : k(r)
                  ? 0 === a || i(t) || !Z(o, t)
                    ? I(n, r, o)
                    : l(o, r)
                  : R(r) && 0 !== a
                    ? c(r, a)
                    : r),
              (e[t] = s),
              s
            )
          },
          c = (t, n) =>
            new e(
              { __proto__: null },
              {
                __proto__: null,
                get: (e, o) => {
                  var a
                  return null != (a = e[o]) ? a : s(e, o, t, null == n ? void 0 : n[o])
                },
              }
            ),
          l =
            (e, t, n) =>
            (...i) => {
              let s, c
              const l = new V((e, t) => {
                  ;(s = e), (c = t)
                }),
                d = new Q(`callstack before invoking ${t.name || "chrome API"}:`)
              U(i, (e) => {
                const t = J.runtime.lastError,
                  o = t || (n ? n(s, e) : s(e))
                o && (t || (d[r] = `${o[1]}\n${d[r]}`), (d[a] = t ? o[a] : `${o[0]}`), (d.isRuntime = !!t), c(d))
              })
              try {
                P(t, e, i)
              } catch (e) {
                if ("Extension context invalidated." !== e[a]) throw e
                Re.error(`Please reload the tab to restore ${o} API for userscripts.`)
              }
              return l
            },
          d = (e, t) => [null != e ? e : null, t && (t[a] ? [t[a], t[r]] : [t, new Q()[r]])],
          u = async (e, t) => {
            try {
              t(d(await e))
            } catch (e) {
              t(d(0, e))
            }
          },
          p = (e, t, n, o) => {
            try {
              const a = e(t, n)
              if (a && Le(a)) return u(a, o), !0
              void 0 !== a && o(d(a))
            } catch (e) {
              o(d(0, e))
            }
          },
          f = (e, t) => (t ? t[1] : "null response") || e(t[0]),
          w = (e, t) => l(e, t, f)
        fe = t.browser = c(J, {
          extension: 0,
          i18n: 0,
          runtime: {
            connect: 0,
            getManifest: 0,
            getURL: 0,
            onMessage: { [ye]: (e, t) => (o) => I(t, e, I(n, p, null, o)) },
            sendMessage: w,
          },
          tabs: !1,
        })
      }
      const be = fe,
        Te = "metaStr",
        Ue = t.browser,
        Pe = ["userAgent", "brands", "mobile", "platform"]
      function Ie(e) {
        for (const t in e) if (Z(e, t)) return !1
        return !0
      }
      const je = /(Receiving end does not exist)|The message port closed before|moved into back\/forward cache|$/
      function Ne(e, { retry: t } = {}) {
        return t ? Oe(e) : Ue.runtime.sendMessage(e)
      }
      async function Oe(e, t = 1e4) {
        for (let n = performance.now(); performance.now() - n < t; ) {
          try {
            const t = await Ne(e)
            if (void 0 !== t) return t
          } catch (e) {
            if (!je.exec(e)[1]) throw e
          }
          await Ue.storage.local.get(o)
        }
        throw new O(o + " cannot connect to the background page.")
      }
      const Ae = we(MessageEvent[x], "data").get,
        { port1: Fe, port2: Ve } = new MessageChannel(),
        He = Fe.postMessage.bind(Fe),
        Be = K()
      let qe = 0
      function Ge() {
        return new V((e) => {
          ;(Be[(qe += 1)] = e), He(qe)
        })
      }
      Ve.onmessage = (e) => {
        const t = I(Ae, e),
          n = Be[t]
        delete Be[t], qe === t && (qe -= 1), n()
      }
      const We = (e, t) => $(I($e, Me, e), t || 0),
        { TextDecoder: Je } = t,
        { createElementNS: Xe } = Me,
        ze = Je[x].decode,
        Ke = "textContent",
        Qe = we(Node[x], Ke).set,
        Ye = RegExp[x].test,
        { createObjectURL: Ze } = URL,
        et = (e, t, n) =>
          new V((o) => {
            if (We(e)) o(t(n))
            else {
              const a = new MutationObserver(() => {
                We(e) && (a.disconnect(), o(t(n)))
              })
              a.observe(Me, { childList: !0, subtree: !0 })
            }
          }),
        tt = (e, t) => {
          const n = I(Xe, Me, "http://www.w3.org/1999/xhtml", e)
          return (
            t && M(t)
              ? I(Qe, n, t)
              : t &&
                I(ee, me(t), (e) => {
                  e === Ke ? I(Qe, n, t[e]) : I(ue, n, e, t[e])
                }),
            n
          )
        },
        nt = (e, t) => {
          let n
          const o = I(ae, e, ","),
            a = o < 0 ? "" : I(re, e, 0, o),
            r = o < 0 ? e : I(re, e, o + 1)
          if (!1 === t) return `data:${a};base64,${r}`
          if (((n = q(r)), I(Ye, /[\x80-\xFF]/, n))) {
            const e = n.length,
              o = new B(e)
            for (let t = 0; t < e; t += 1) o[t] = ie(n, t)
            n = t ? o : I(ze, new Je(), o)
          }
          return t ? Ze(new j([n], { type: a })) : n
        },
        ot = (e, t, n) => Ne({ cmd: e, data: t, url: location.href, [b]: Se }, n),
        at = ["log", "info", "warn", "error", "debug"],
        rt = (e, t) => {
          const o = W ? W(t, Me) : t,
            a = new N(e, { __proto__: null, detail: o })
          I(X, n, a)
        },
        it = (e, t, a) => {
          let r
          I(
            G,
            n,
            e,
            (e) => {
              if ((I(ve, e), r)) (r.node = I(ke, e)), (e = r), (r = null)
              else {
                try {
                  e = I(_e, e)
                } catch (e) {
                  return
                }
                if (
                  (e || ((e = K()).data = `[${o}] Non-cloneable property e.g. a DOM node or function.`),
                  W && (e = W(e, n)),
                  e.node && (r = e))
                )
                  return
              }
              a.onHandle(e)
            },
            !0
          ),
            (a.post = (e, o, r, i) => {
              const s = a[c] ? i : r,
                l = s && new A(t, { __proto__: null, relatedTarget: s })
              rt(t, { cmd: e, data: o, node: !!l }), l && I(X, n, l)
            })
        },
        st = K(),
        ct = K(),
        lt = [],
        dt = (e, t, n) => {
          n || u in ft ? pe(e, t) : lt.push(() => pe(e, t))
        },
        ut = dt.bind({}, st),
        pt = dt.bind({}, ct),
        ft = {
          __proto__: null,
          [c]: K(),
          cache: K(),
          pathMaps: K(),
          async onHandle({ cmd: e, data: t, node: n }, o) {
            let a,
              r = st[e],
              i = t && $(t, L)
            i && (t = t.data)
            try {
              if (!r) throw t
              r === De && ((r = !0), (a = ft[De]), a && (await a)),
                (a = !0 === r ? ot(e, t) : I(r, n, t, o || f)),
                Le(a) && (a = await a)
            } catch (e) {
              ;(i = "Error"), (a = e)
            }
            i && ft.post("Callback", { id: i, data: a }, o)
          },
        },
        wt = ft
      let ht, gt, mt, yt
      Ue.runtime.onMessage.addListener(({ cmd: e, data: t }, n) => {
        if ((e = ct[e])) return (t = e(t, n)) && Le(t) && I(oe, t, null, Re.error), t
      }),
        Ee && G("copy", (ht = (e) => mt && gt(e)), !0),
        lt.push(({ clipFF: e }) => {
          if (e) {
            const { execCommand: e } = Me,
              { setData: t } = DataTransfer[x],
              { get: n } = we(ClipboardEvent[x], "clipboardData"),
              { preventDefault: o, stopPropagation: a } = Event[x]
            ;(gt = (e) => {
              I(a, e), I(ve, e), I(o, e), I(t, I(n, e), mt.type || "text/plain", mt.data)
            }),
              (yt = async (t) => {
                await wt[De], (mt = t), I(e, Me, "copy"), (mt = null)
              })
          }
          ut({ SetClipboard: yt || De })
        })
      const bt = K(),
        vt = ["script", "style", "link", "meta"],
        { toLowerCase: _t } = "",
        { [c]: kt } = wt
      let Rt, Ct
      async function xt(e) {
        if (Ct) {
          if (e) {
            if (Rt) return
            ;(Rt = Ge), await Rt, (Rt = null)
          }
          await ot("SetPopup", { [c]: kt, [u]: wt[u], menus: bt })
        }
      }
      pt(
        {
          async PopupShown(e) {
            await wt[De], (Ct = e), xt()
          },
        },
        !0
      ),
        ut({
          AddElement({ tag: e, attrs: t, cbId: n }, o) {
            let a, r
            try {
              const n = this || (I(te, vt, I(_t, `${e}`)) && We("head")) || We("body") || We("*")
              ;(a = tt(e, t)), en(a), I(ce, n, a)
            } catch (e) {
              r = [`${e}`, e.stack]
            }
            wt.post("Callback", { id: n, data: r }, o, a)
          },
          GetResource({ id: e, isBlob: t, key: n, raw: o }) {
            var a
            return o || (o = wt.cache[(null == (a = wt.pathMaps[e]) ? void 0 : a[n]) || n]), !o || nt(o, t)
          },
          RegisterMenu({ id: e, key: t, val: n }) {
            ;((bt[e] || (bt[e] = K()))[t] = n), xt(!0)
          },
          UnregisterMenu({ id: e, key: t }) {
            var n
            null == (n = bt[e]) || delete n[t], xt(!0)
          },
        })
      const Lt = we(PageTransitionEvent[x], "persisted").get
      let Mt,
        $t,
        Dt,
        Et = 2 === Se
      function St(e) {
        e.isTrusted && (this ? I(Lt, e) && Ut(0, "bfcache") : ((Se = 3), (Dt = wt[De] = !1), Mt(), Ut(), (Se = 4)))
      }
      function Tt(e, t) {
        U($t, e), (wt[c][e] = t || f), Et || (Et = Ut(2))
      }
      async function Ut(e, t = !Dt) {
        for (; --e >= 0; ) await Ge()
        ot("Run", { reset: t, [c]: $t }), xt(!!Et), (Et = !1), (Dt = !0)
      }
      function Pt(e) {
        Et || Dt || ((e !== _ && "off" !== e) || ($t = e), Ut())
      }
      lt.push(() => {
        ut({ Run: Tt }), ($t = [])
      }),
        G("pageshow", St),
        Et && (I(G, Me, "prerenderingchange", St.bind(null), { once: !0 }), (wt[De] = new Promise((e) => (Mt = e))))
      const It = wt[c]
      let jt,
        Nt,
        Ot,
        At,
        Ft,
        Vt,
        Ht,
        Bt,
        qt = n[e]
      function Gt(e) {
        Ft = !1
        const o = e[y] + "VW",
          a = o + "*",
          r = S(),
          i = S(),
          s = S(),
          c = S()
        return (
          (Bt = e.nonce),
          Ee
            ? I(
                G,
                n,
                o,
                (e) => {
                  I(ve, e),
                    Vt
                      ? (I(X, Vt, new N(a, { __proto__: null, detail: Zt(I(_e, e), Vt) })), (Vt = null))
                      : (Vt = I(ke, e))
                },
                !0
              )
            : D(t, o, Zt, !1),
          l(opener) || l(n !== top && parent)
            ? d()
            : Xt({ code: `parent["${r}"] = [this, 0]` }, () => {
                ;(Ee && !tn(n.wrappedJSObject[r])) || d()
              }),
          Ft
        )
        function l(e) {
          let t
          try {
            t = e && we(e.location, "href").get
          } catch (e) {}
          if (t)
            if (((t = !1), Ee)) {
              const i = (e) => {
                t = I(_e, e)
              }
              I(G, n, a, i, !0)
              try {
                I(X, e, new A(o, { relatedTarget: n })), I(X, e, new N(o, { detail: r }))
              } catch (e) {}
              I(z, n, a, i, !0)
            } else (t = e[o]), (t = t && t(r, n))
          return t
        }
        function d() {
          I(G, n, i, u, { capture: !0, once: !0 }),
            Xt({ code: `(${qt}(${Ee},'${i}','${r}'))()\n//# sourceURL=${Ce}sandbox/injected-web.js` }),
            I(z, n, i, u, !0)
        }
        function u(e) {
          ;(Ft = !0), I(ve, e), it(s, c, wt), rt(`${i}*`, [c, s])
        }
      }
      async function Wt(e, t) {
        var n, o
        const { errors: a, info: i, [p]: c } = e,
          l = "cache"
        a && Re.warn(a),
          Ee && (Ee = parseFloat(i.ua.browserVersion)),
          (i.gmi = { isIncognito: J.extension.inIncognitoContext }),
          (Nt = K()),
          (Nt[f] = i),
          (Nt[r] = i),
          pe(wt[l], e[l]),
          t || e[s] ? (Ft = !1) : e[f] && null == Ft && Gt(e)
        const d = e[h].filter((e) => Jt(e) === r).map((e) => [e.id, e.key.data]),
          u = (c || d.length) && ot("InjectionFeedback", { [s]: !Ft, [r]: d, [p]: c, url: Ee && location.href }),
          w = we(Document[x], "readyState").get,
          g = Ot
        if (
          (g && Qt(),
          (jt = K()),
          await et("*", zt, "start"),
          ((null != (n = At) && n.body) || (null != (o = Ot) && o.body)) && (await et("body", zt, "body")),
          c && (e = await u))
        ) {
          pe(wt[l], e[l]),
            "loading" === I(w, Me) &&
              (await new V((e) => {
                G("DOMContentLoaded", e, { once: !0 })
              }),
              await 0)
          for (let t = 0, n = e[h]; t < n.length; t++) Jt(n[t])
          Ot && !g && Qt(), await zt("end"), await zt("idle")
        }
        Nt = Ot = At = qt = null
      }
      function Jt(e) {
        let t = e[u]
        if (((t = (t === a && !Ft) || t === r ? r : Ft && f), t)) {
          const n = t === r ? Ot || (Ot = K()) : At || (At = K()),
            { gmi: o, [Te]: a, pathMap: i, [w]: s } = e,
            c = n[s] || (n[s] = [])
          U(c, e),
            D(o, "scriptMetaStr", a[0] || I(re, e.code[a[1]], a[2], a[3])),
            delete e[Te],
            i && (wt.pathMaps[e.id] = i)
        } else It[e.id] = l
        return t
      }
      function Xt(e, t) {
        const { code: o } = e,
          a = R(o),
          r = tt("script", !a && o),
          i =
            Ee &&
            !t &&
            ((t) => {
              const { stack: n } = t.error
              ;(n && !`${n}`.includes(Ce)) || (T("error", [e.displayName], t.error), t.preventDefault())
            }),
          s = tt("div"),
          c = Ht || (le ? I(le, s, { mode: "closed" }) : s)
        let l, d
        a && P(se, r, o),
          en(r),
          t
            ? ((l = tt("iframe", {
                src: "javascript:void 0",
                sandbox: "allow-same-origin allow-scripts",
                style: "display:none!important",
              })),
              Ee || I(ce, c, l))
            : I(ce, c, r),
          i && I(G, n, "error", i),
          Ht || I(ce, We("*") || Me, s),
          i && I(z, n, "error", i),
          t &&
            ((Ht = c),
            Ee && I(ce, c, l),
            (d = l.contentDocument) && (I(ce, I($e, d, "*")[0], r), t()),
            I(de, l),
            (Ht = null)),
          I(de, r),
          I(de, s)
      }
      function zt(e) {
        let t
        for (let n = 1; n >= 0; n--) {
          const o = n ? f : r,
            a = n ? At : Ot,
            i = null == a ? void 0 : a[e]
          if (i) {
            wt.post("ScriptData", { items: i, info: Nt[o] }, o), (Nt[o] = !1)
            for (let e = 0; e < i.length; e++) {
              const { id: t } = i[e]
              jt[t] = 1
            }
            n ? Ee || (t = Kt(e)) : I(oe, Ge(), () => Yt(i))
          }
        }
        return t
      }
      async function Kt(e) {
        const t = At[e]
        for (let n = 0; n < t.length; n++) {
          const o = t[n]
          o.code &&
            ("idle" === e && (await Ge()),
            "end" === e && (await 0),
            Yt([o]),
            o.meta.unwrap || wt.post("Plant", o.key),
            Xt(o),
            (o.code = ""),
            o.meta.unwrap && Tt(o.id))
        }
      }
      function Qt() {
        const e = qt(Ee)(wt.onHandle, Re),
          t = wt.post
        wt.post = (n, o, a, i) => {
          ;(a === r ? e : t)(n, o, void 0, i)
        }
      }
      function Yt(e) {
        for (let t = 0; t < e.length; t++) {
          const { id: n } = e[t]
          jt[n] && (1 === It[n] && (It[n] = d), delete jt[n])
        }
      }
      function Zt(e, t) {
        const { post: n } = wt
        if (n) return n("WriteVault", e, f, t), !0
      }
      function en(e) {
        Bt && I(ue, e, "nonce", Bt)
      }
      function tn(e) {
        if (!e) return
        const t = W(K(), Me),
          n = W(K(), Me)
        return (
          I(ee, at, (e) => {
            n[e] = exportFunction(Re[e], Me)
          }),
          (t.console = n),
          (t.then = exportFunction(oe, Me)),
          (e[1] = t),
          !0
        )
      }
      D(n, e, 1, !1), ut({ InjectList: Ee && Kt })
      const nn = K(),
        on = (e, t) => t && wt.post(e, t.id, t.realm) && t
      ut({
        async Notification(e, t) {
          await wt[De]
          const n = await ot("Notification", e)
          nn[n] = { id: e.id, realm: t }
        },
        RemoveNotification(e) {
          for (const t in nn) if (nn[t].id === e) return delete nn[t], ot("RemoveNotification", t)
        },
      }),
        pt({
          NotificationClick(e) {
            on("NotificationClicked", nn[e])
          },
          NotificationClose(e) {
            on("NotificationClosed", nn[e]) && delete nn[e]
          },
        })
      const { fetch: an, FileReader: rn, FormData: sn } = t,
        { arrayBuffer: cn, blob: ln } = Y,
        dn = j[x],
        un = we(dn, "type").get,
        pn = we(he(B[x]), "buffer").get,
        fn = we(rn[x], "result").get,
        wn = rn[x].readAsDataURL,
        hn = sn[x].append,
        gn = "chunks",
        mn = "load",
        yn = "loadend",
        bn = (e) => "blob" === e[v],
        vn = K()
      let _n, kn, Rn, Cn
      async function xn(e, t, n) {
        let o, a
        const { events: r, [C]: i } = e
        for (
          ((a = I(te, r, mn)) || I(te, r, yn) || (i && Ee)) && (o = await Mn(t, bn(e))),
            i && (ot("DownloadBlob", [Ee ? o : t, i]), (o = null));
          Ln(
            (e = { id: e.id, type: a ? mn : yn, data: { finalUrl: t, readyState: 4, status: 200, [g]: o, [m]: "" } }),
            n
          ),
            a;

        )
          a = o = null
      }
      function Ln(e, t) {
        wt.post("HttpRequested", e, t)
      }
      async function Mn(e, t) {
        return I(t ? ln : cn, await an(e))
      }
      function $n(e, t, n) {
        if (!e[v]) return void D(e[gn] || (e[gn] = [""]), n ? n.i : 0, t)
        const o = (t = q(t)).length,
          a = e[gn] || (e[gn] = new B(n ? n.size : o))
        for (let e = (null == n ? void 0 : n.chunk) || 0, r = 0; r < o; ) a[e++] = ie(t, r++)
      }
      async function Dn(e, t) {
        if ("fd" === t) {
          if (!e.length) return [e, t]
          const n = new sn()
          I(ee, e, (e) => I(hn, n, e[0], e[1])), (e = n)
        }
        const n = xe(e, dn),
          o = n ? e : await I(ln, new H(e)),
          a = new rn()
        return new V((e) => {
          I(G, a, mn, () => e([I(fn, a), I(un, o), n])), I(wn, a, o)
        })
      }
      lt.push((e) => {
        ;(_n = t.navigator), (Rn = [])
        for (let t = he(_n), n = 0; t && n < Pe.length; n++)
          (Rn[n] = we(t, Pe[n]).get),
            !n &&
              (t = we(t, "userAgentData")) &&
              (kn = t.get) &&
              ((t = I(kn, _n)) && (t = he(t)) && (Cn = t.getHighEntropyValues) ? (e.info.uad = !0) : (t = kn = null))
      }),
        ut({
          async HttpRequest(e, t) {
            Ee ? (e = E(e)) : ge(e, null)
            const { url: n } = e,
              o = !Ee && e.data,
              a = kn && I(kn, _n),
              r = I(re, n, 0, 5)
            return "data:" === r || "blob:" === r
              ? xn(e, n, t)
              : ((vn[e.id] = { __proto__: null, realm: t, [v]: e[v] }),
                o && o.length > 1 && "usp" !== o[1] && (e.data = await Dn(o[0], o[1])),
                (e.ua = I(ne, Rn, (e, t) => I(e, t ? a : _n))),
                ot("HttpRequest", e))
          },
          AbortRequest: !0,
          UA: () => I(Rn[0], _n),
          UAD() {
            if (kn) {
              const e = K(),
                t = I(kn, _n)
              for (let n = 1; n < Rn.length; n++) e[Pe[n]] = I(Rn[n], t)
              return e
            }
          },
          UAH: (e) => I(Cn, I(kn, _n), e),
        }),
        pt({
          async HttpRequested(e) {
            const { id: t, data: n } = e,
              o = vn[t]
            if (!o) return
            if (Z(e, "chunk")) return void $n(o, n, e)
            let a = null == n ? void 0 : n[g]
            null != a &&
              (e.blobbed
                ? ((a = await Mn(a, bn(o))), ot("RevokeBlob", a))
                : e.chunked &&
                  ($n(o, a),
                  (a = o[gn]),
                  delete o[gn],
                  bn(o) ? (a = new j([a], { type: e.contentType })) : o[v] && (a = I(pn, a))),
              (n[g] = a)),
              e.type === yn && delete vn[e.id],
              Ln(e, o.realm)
          },
        })
      const En = K(),
        Sn = K(),
        Tn = K()
      ut({
        async TabOpen({ key: e, data: t }, n) {
          await wt[De]
          const { id: o } = await ot("TabOpen", t)
          ;(En[e] = o), (Sn[o] = e), (Tn[o] = n)
        },
        async TabClose(e) {
          await wt[De]
          const t = En[e]
          ;(e && !t) || ot("TabClose", { id: t })
        },
      }),
        pt({
          TabClosed(e) {
            const t = Sn[e],
              n = Tn[e]
            delete Tn[e], delete Sn[e], delete En[t], t && wt.post("TabClosed", t, n)
          },
        })
      const { [c]: Un } = wt
      async function Pn(e) {
        const n =
          t.vmData ||
          (await V.race([
            new V((e) => {
              t.vmResolve = e
            }),
            e,
          ]))
        return delete t.vmResolve, delete t.vmData, n
      }
      function In() {
        try {
          const t = `"${e}"`,
            n = Me.cookie.split(`${t}=`)[1],
            o = n && n.split(";", 1)[0]
          if (o) {
            Me.cookie = `${t}=0; max-age=0; SameSite=Lax`
            const e = new XMLHttpRequest(),
              n = `blob:${Ce}${o}`
            return e.open("get", n, !1), e.send(), URL.revokeObjectURL(n), JSON.parse(e[g])
          }
        } catch (e) {}
      }
      pt({ [o]: () => !0 }, !0),
        pt({
          Command: (e) => wt.post("Command", e, Un[e.id]),
          Run: (e) => Tt(e, r),
          UpdatedValues(e) {
            const t = K(),
              n = K()
            I(ee, me(e), (o) => {
              ;(Un[o] === r ? n : t)[o] = e[o]
            }),
              Ie(t) || wt.post("UpdatedValues", t),
              Ie(n) || wt.post("UpdatedValues", n, r)
          },
        }),
        ut({ Log: (e) => P(Re[e[0]], Re, e[1]), TabFocus: De, UpdateValue: De }),
        (async () => {
          const e = Me instanceof XMLDocument,
            n = In(),
            o = ot("GetInjected", { url: Ee && location.href, [s]: e, done: !(!n && !t.vmData) }, { retry: !0 }),
            a = n || (Ee && Event[x].composedPath ? await Pn(o) : await o),
            r = (wt[u] = a[u])
          pe(Un, a[c]),
            Ee && !a.clipFF && z("copy", ht, !0),
            null != a[i] && !e && Gt(a) && (ut({ GetScriptVer: !0 }), wt.post("Expose", a[i])),
            me(Un).length && (lt.forEach((e) => e(a)), await Wt(a, e)),
            (lt.length = 0),
            Pt(r)
        })().catch(Ee && Re.error),
        Ee &&
          1 === Se &&
          "file:" === location.protocol &&
          location.pathname.endsWith(".user.js") &&
          "application/x-javascript" === Me.contentType &&
          (async () => {
            const { fetch: e, history: n } = t,
              { referrer: o } = Me,
              { text: a } = Y,
              r = "cookie" in Document[x],
              i = location.href,
              s = async () => I(a, await e(i, { mode: "same-origin" }))
            let c,
              l,
              d = await s()
            function u() {
              n.length > 1 ? n.go(-1) : ot("TabClose")
            }
            I(ae, d, "// ==UserScript==") < 0 ||
              (await ot("ConfirmInstall", { code: d, url: i, from: o }),
              r
                ? be.runtime.onConnect.addListener((e) => {
                    "FetchSelf" === e.name &&
                      (e.onMessage.addListener(async () => {
                        try {
                          c && (await c), (d = await (c = s()))
                        } finally {
                          c = !1
                        }
                        d === l ? (d = null) : (l = d), e.postMessage(d)
                      }),
                      e.onDisconnect.addListener(async () => {
                        ;(l = null), (await ot("CheckInstallerTab", e.sender.tab.id)) || u()
                      }))
                  })
                : u())
          })().catch(Re.error)
    })()
  }
}
