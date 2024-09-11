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
      if (Ee || (null != (F = fe) && F.runtime));
      else {
        const { Proxy: e } = t,
          { bind: n } = e,
          a = "message",
          r = "stack",
          i = (e) => "addListener" === e || "removeListener" === e || "hasListener" === e || "hasListeners" === e,
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
            onMessage: { addListener: (e, t) => (o) => I(t, e, I(n, p, null, o)) },
            sendMessage: w,
          },
          tabs: !1,
        })
      }
      const ye = fe,
        be = "metaStr",
        Te = t.browser,
        Ue = ["userAgent", "brands", "mobile", "platform"]
      function Pe(e) {
        for (const t in e) if (Z(e, t)) return !1
        return !0
      }
      const Ie = /(Receiving end does not exist)|The message port closed before|moved into back\/forward cache|$/
      function je(e, { retry: t } = {}) {
        return t ? Ne(e) : Te.runtime.sendMessage(e)
      }
      async function Ne(e, t = 1e4) {
        for (let n = performance.now(); performance.now() - n < t; ) {
          try {
            const t = await je(e)
            if (void 0 !== t) return t
          } catch (e) {
            if (!Ie.exec(e)[1]) throw e
          }
          await Te.storage.local.get(o)
        }
        throw new O(o + " cannot connect to the background page.")
      }
      const Oe = we(MessageEvent[x], "data").get,
        { port1: Ae, port2: Fe } = new MessageChannel(),
        Ve = Ae.postMessage.bind(Ae),
        He = K()
      let Be = 0
      function qe() {
        return new V((e) => {
          ;(He[(Be += 1)] = e), Ve(Be)
        })
      }
      Fe.onmessage = (e) => {
        const t = I(Oe, e),
          n = He[t]
        delete He[t], Be === t && (Be -= 1), n()
      }
      const Ge = (e, t) => $(I($e, Me, e), t || 0),
        { TextDecoder: We } = t,
        { createElementNS: Je } = Me,
        Xe = We[x].decode,
        ze = "textContent",
        Ke = we(Node[x], ze).set,
        Qe = RegExp[x].test,
        { createObjectURL: Ye } = URL,
        Ze = (e, t, n) =>
          new V((o) => {
            if (Ge(e)) o(t(n))
            else {
              const a = new MutationObserver(() => {
                Ge(e) && (a.disconnect(), o(t(n)))
              })
              a.observe(Me, { childList: !0, subtree: !0 })
            }
          }),
        et = (e, t) => {
          const n = I(Je, Me, "http://www.w3.org/1999/xhtml", e)
          return (
            t && M(t)
              ? I(Ke, n, t)
              : t &&
                I(ee, me(t), (e) => {
                  e === ze ? I(Ke, n, t[e]) : I(ue, n, e, t[e])
                }),
            n
          )
        },
        tt = (e, t) => {
          let n
          const o = I(ae, e, ","),
            a = o < 0 ? "" : I(re, e, 0, o),
            r = o < 0 ? e : I(re, e, o + 1)
          if (!1 === t) return `data:${a};base64,${r}`
          if (((n = q(r)), I(Qe, /[\x80-\xFF]/, n))) {
            const e = n.length,
              o = new B(e)
            for (let t = 0; t < e; t += 1) o[t] = ie(n, t)
            n = t ? o : I(Xe, new We(), o)
          }
          return t ? Ye(new j([n], { type: a })) : n
        },
        nt = (e, t, n) => je({ cmd: e, data: t, url: location.href, [b]: Se }, n),
        ot = ["log", "info", "warn", "error", "debug"],
        at = (e, t) => {
          const o = W ? W(t, Me) : t,
            a = new N(e, { __proto__: null, detail: o })
          I(X, n, a)
        },
        rt = (e, t, a) => {
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
              at(t, { cmd: e, data: o, node: !!l }), l && I(X, n, l)
            })
        },
        it = K(),
        st = K(),
        ct = [],
        lt = (e, t, n) => {
          n || u in pt ? pe(e, t) : ct.push(() => pe(e, t))
        },
        dt = lt.bind({}, it),
        ut = lt.bind({}, st),
        pt = {
          __proto__: null,
          [c]: K(),
          cache: K(),
          pathMaps: K(),
          async onHandle({ cmd: e, data: t, node: n }, o) {
            let a,
              r = it[e],
              i = t && $(t, L)
            i && (t = t.data)
            try {
              if (!r) throw t
              r === De && ((r = !0), (a = pt[De]), a && (await a)),
                (a = !0 === r ? nt(e, t) : I(r, n, t, o || f)),
                Le(a) && (a = await a)
            } catch (e) {
              ;(i = "Error"), (a = e)
            }
            i && pt.post("Callback", { id: i, data: a }, o)
          },
        },
        ft = pt
      let wt, ht, gt, mt
      Te.runtime.onMessage.addListener(({ cmd: e, data: t }, n) => {
        if ((e = st[e])) return (t = e(t, n)) && Le(t) && I(oe, t, null, Re.error), t
      }),
        Ee && G("copy", (wt = (e) => gt && ht(e)), !0),
        ct.push(({ clipFF: e }) => {
          if (e) {
            const { execCommand: e } = Me,
              { setData: t } = DataTransfer[x],
              { get: n } = we(ClipboardEvent[x], "clipboardData"),
              { preventDefault: o, stopPropagation: a } = Event[x]
            ;(ht = (e) => {
              I(a, e), I(ve, e), I(o, e), I(t, I(n, e), gt.type || "text/plain", gt.data)
            }),
              (mt = async (t) => {
                await ft[De], (gt = t), I(e, Me, "copy"), (gt = null)
              })
          }
          dt({ SetClipboard: mt || De })
        })
      const yt = K(),
        bt = ["script", "style", "link", "meta"],
        { toLowerCase: vt } = "",
        { [c]: _t } = ft
      let kt, Rt
      async function Ct(e) {
        if (Rt) {
          if (e) {
            if (kt) return
            ;(kt = qe), await kt, (kt = null)
          }
          await nt("SetPopup", { [c]: _t, [u]: ft[u], menus: yt })
        }
      }
      ut(
        {
          async PopupShown(e) {
            await ft[De], (Rt = e), Ct()
          },
        },
        !0
      ),
        dt({
          AddElement({ tag: e, attrs: t, cbId: n }, o) {
            let a, r
            try {
              const n = this || (I(te, bt, I(vt, `${e}`)) && Ge("head")) || Ge("body") || Ge("*")
              ;(a = et(e, t)), Zt(a), I(ce, n, a)
            } catch (e) {
              r = [`${e}`, e.stack]
            }
            ft.post("Callback", { id: n, data: r }, o, a)
          },
          GetResource({ id: e, isBlob: t, key: n, raw: o }) {
            var a
            return o || (o = ft.cache[(null == (a = ft.pathMaps[e]) ? void 0 : a[n]) || n]), !o || tt(o, t)
          },
          RegisterMenu({ id: e, key: t, val: n }) {
            ;((yt[e] || (yt[e] = K()))[t] = n), Ct(!0)
          },
          UnregisterMenu({ id: e, key: t }) {
            var n
            null == (n = yt[e]) || delete n[t], Ct(!0)
          },
        })
      const xt = we(PageTransitionEvent[x], "persisted").get
      let Lt,
        Mt,
        $t,
        Dt = 2 === Se
      function Et(e) {
        e.isTrusted && (this ? I(xt, e) && Tt(0, "bfcache") : ((Se = 3), ($t = ft[De] = !1), Lt(), Tt(), (Se = 4)))
      }
      function St(e, t) {
        U(Mt, e), (ft[c][e] = t || f), Dt || (Dt = Tt(2))
      }
      async function Tt(e, t = !$t) {
        for (; --e >= 0; ) await qe()
        nt("Run", { reset: t, [c]: Mt }), Ct(!!Dt), (Dt = !1), ($t = !0)
      }
      function Ut(e) {
        Dt || $t || ((e !== _ && "off" !== e) || (Mt = e), Tt())
      }
      ct.push(() => {
        dt({ Run: St }), (Mt = [])
      }),
        G("pageshow", Et),
        Dt && (I(G, Me, "prerenderingchange", Et.bind(null), { once: !0 }), (ft[De] = new Promise((e) => (Lt = e))))
      const Pt = ft[c]
      let It,
        jt,
        Nt,
        Ot,
        At,
        Ft,
        Vt,
        Ht,
        Bt = n[e]
      function qt(e) {
        At = !1
        const o = e[y] + "VW",
          a = o + "*",
          r = S(),
          i = S(),
          s = S(),
          c = S()
        return (
          (Ht = e.nonce),
          Ee
            ? I(
                G,
                n,
                o,
                (e) => {
                  I(ve, e),
                    Ft
                      ? (I(X, Ft, new N(a, { __proto__: null, detail: Yt(I(_e, e), Ft) })), (Ft = null))
                      : (Ft = I(ke, e))
                },
                !0
              )
            : D(t, o, Yt, !1),
          l(opener) || l(n !== top && parent)
            ? d()
            : Jt({ code: `parent["${r}"] = [this, 0]` }, () => {
                ;(Ee && !en(n.wrappedJSObject[r])) || d()
              }),
          At
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
            Jt({ code: `(${Bt}(${Ee},'${i}','${r}'))()\n//# sourceURL=${Ce}sandbox/injected-web.js` }),
            I(z, n, i, u, !0)
        }
        function u(e) {
          ;(At = !0), I(ve, e), rt(s, c, ft), at(`${i}*`, [c, s])
        }
      }
      async function Gt(e, t) {
        var n, o
        const { errors: a, info: i, [p]: c } = e,
          l = "cache"
        a && Re.warn(a),
          Ee && (Ee = parseFloat(i.ua.browserVersion)),
          (i.gmi = { isIncognito: J.extension.inIncognitoContext }),
          (jt = K()),
          (jt[f] = i),
          (jt[r] = i),
          pe(ft[l], e[l]),
          t || e[s] ? (At = !1) : e[f] && null == At && qt(e)
        const d = e[h].filter((e) => Wt(e) === r).map((e) => [e.id, e.key.data]),
          u = (c || d.length) && nt("InjectionFeedback", { [s]: !At, [r]: d, [p]: c, url: Ee && location.href }),
          w = we(Document[x], "readyState").get,
          g = Nt
        if (
          (g && Kt(),
          (It = K()),
          await Ze("*", Xt, "start"),
          ((null != (n = Ot) && n.body) || (null != (o = Nt) && o.body)) && (await Ze("body", Xt, "body")),
          c && (e = await u))
        ) {
          pe(ft[l], e[l]),
            "loading" === I(w, Me) &&
              (await new V((e) => {
                G("DOMContentLoaded", e, { once: !0 })
              }),
              await 0)
          for (let t = 0, n = e[h]; t < n.length; t++) Wt(n[t])
          Nt && !g && Kt(), await Xt("end"), await Xt("idle")
        }
        jt = Nt = Ot = Bt = null
      }
      function Wt(e) {
        let t = e[u]
        if (((t = (t === a && !At) || t === r ? r : At && f), t)) {
          const n = t === r ? Nt || (Nt = K()) : Ot || (Ot = K()),
            { gmi: o, [be]: a, pathMap: i, [w]: s } = e,
            c = n[s] || (n[s] = [])
          U(c, e),
            D(o, "scriptMetaStr", a[0] || I(re, e.code[a[1]], a[2], a[3])),
            delete e[be],
            i && (ft.pathMaps[e.id] = i)
        } else Pt[e.id] = l
        return t
      }
      function Jt(e, t) {
        const { code: o } = e,
          a = R(o),
          r = et("script", !a && o),
          i =
            Ee &&
            !t &&
            ((t) => {
              const { stack: n } = t.error
              ;(n && !`${n}`.includes(Ce)) || (T("error", [e.displayName], t.error), t.preventDefault())
            }),
          s = et("div"),
          c = Vt || (le ? I(le, s, { mode: "closed" }) : s)
        let l, d
        a && P(se, r, o),
          Zt(r),
          t
            ? ((l = et("iframe", {
                src: "javascript:void 0",
                sandbox: "allow-same-origin allow-scripts",
                style: "display:none!important",
              })),
              Ee || I(ce, c, l))
            : I(ce, c, r),
          i && I(G, n, "error", i),
          Vt || I(ce, Ge("*") || Me, s),
          i && I(z, n, "error", i),
          t &&
            ((Vt = c),
            Ee && I(ce, c, l),
            (d = l.contentDocument) && (I(ce, I($e, d, "*")[0], r), t()),
            I(de, l),
            (Vt = null)),
          I(de, r),
          I(de, s)
      }
      function Xt(e) {
        let t
        for (let n = 1; n >= 0; n--) {
          const o = n ? f : r,
            a = n ? Ot : Nt,
            i = null == a ? void 0 : a[e]
          if (i) {
            ft.post("ScriptData", { items: i, info: jt[o] }, o), (jt[o] = !1)
            for (let e = 0; e < i.length; e++) {
              const { id: t } = i[e]
              It[t] = 1
            }
            n ? Ee || (t = zt(e)) : I(oe, qe(), () => Qt(i))
          }
        }
        return t
      }
      async function zt(e) {
        const t = Ot[e]
        for (let n = 0; n < t.length; n++) {
          const o = t[n]
          o.code &&
            ("idle" === e && (await qe()),
            "end" === e && (await 0),
            Qt([o]),
            o.meta.unwrap || ft.post("Plant", o.key),
            Jt(o),
            (o.code = ""),
            o.meta.unwrap && St(o.id))
        }
      }
      function Kt() {
        const e = Bt(Ee)(ft.onHandle, Re),
          t = ft.post
        ft.post = (n, o, a, i) => {
          ;(a === r ? e : t)(n, o, void 0, i)
        }
      }
      function Qt(e) {
        for (let t = 0; t < e.length; t++) {
          const { id: n } = e[t]
          It[n] && (1 === Pt[n] && (Pt[n] = d), delete It[n])
        }
      }
      function Yt(e, t) {
        const { post: n } = ft
        if (n) return n("WriteVault", e, f, t), !0
      }
      function Zt(e) {
        Ht && I(ue, e, "nonce", Ht)
      }
      function en(e) {
        if (!e) return
        const t = W(K(), Me),
          n = W(K(), Me)
        return (
          I(ee, ot, (e) => {
            n[e] = exportFunction(Re[e], Me)
          }),
          (t.console = n),
          (e[1] = t),
          !0
        )
      }
      D(n, e, 1, !1), dt({ InjectList: Ee && zt })
      const tn = K(),
        nn = (e, t) => t && ft.post(e, t.id, t.realm) && t
      dt({
        async Notification(e, t) {
          await ft[De]
          const n = await nt("Notification", e)
          tn[n] = { id: e.id, realm: t }
        },
        RemoveNotification(e) {
          for (const t in tn) if (tn[t].id === e) return delete tn[t], nt("RemoveNotification", t)
        },
      }),
        ut({
          NotificationClick(e) {
            nn("NotificationClicked", tn[e])
          },
          NotificationClose(e) {
            nn("NotificationClosed", tn[e]) && delete tn[e]
          },
        })
      const { fetch: on, FileReader: an, FormData: rn } = t,
        { arrayBuffer: sn, blob: cn } = Y,
        ln = j[x],
        dn = we(ln, "type").get,
        un = we(he(B[x]), "buffer").get,
        pn = we(an[x], "result").get,
        fn = an[x].readAsDataURL,
        wn = rn[x].append,
        hn = "chunks",
        gn = "load",
        mn = "loadend",
        yn = (e) => "blob" === e[v],
        bn = K()
      let vn, _n, kn, Rn
      async function Cn(e, t, n) {
        let o, a
        const { events: r, [C]: i } = e
        for (
          ((a = I(te, r, gn)) || I(te, r, mn) || (i && Ee)) && (o = await Ln(t, yn(e))),
            i && (nt("DownloadBlob", [Ee ? o : t, i]), (o = null));
          xn(
            (e = { id: e.id, type: a ? gn : mn, data: { finalUrl: t, readyState: 4, status: 200, [g]: o, [m]: "" } }),
            n
          ),
            a;

        )
          a = o = null
      }
      function xn(e, t) {
        ft.post("HttpRequested", e, t)
      }
      async function Ln(e, t) {
        return I(t ? cn : sn, await on(e))
      }
      function Mn(e, t, n) {
        if (!e[v]) return void D(e[hn] || (e[hn] = [""]), n ? n.i : 0, t)
        const o = (t = q(t)).length,
          a = e[hn] || (e[hn] = new B(n ? n.size : o))
        for (let e = (null == n ? void 0 : n.chunk) || 0, r = 0; r < o; ) a[e++] = ie(t, r++)
      }
      async function $n(e, t) {
        if ("fd" === t) {
          if (!e.length) return [e, t]
          const n = new rn()
          I(ee, e, (e) => I(wn, n, e[0], e[1])), (e = n)
        }
        const n = xe(e, ln),
          o = n ? e : await I(cn, new H(e)),
          a = new an()
        return new V((e) => {
          I(G, a, gn, () => e([I(pn, a), I(dn, o), n])), I(fn, a, o)
        })
      }
      ct.push((e) => {
        ;(vn = t.navigator), (kn = [])
        for (let t = he(vn), n = 0; t && n < Ue.length; n++)
          (kn[n] = we(t, Ue[n]).get),
            !n &&
              (t = we(t, "userAgentData")) &&
              ((_n = t.get), (t = he(I(_n, vn))), (Rn = t.getHighEntropyValues), (e.info.uad = !0))
      }),
        dt({
          async HttpRequest(e, t) {
            Ee ? (e = E(e)) : ge(e, null)
            const { url: n } = e,
              o = !Ee && e.data,
              a = _n && I(_n, vn),
              r = I(re, n, 0, 5)
            return "data:" === r || "blob:" === r
              ? Cn(e, n, t)
              : ((bn[e.id] = { __proto__: null, realm: t, [v]: e[v] }),
                o && o.length > 1 && "usp" !== o[1] && (e.data = await $n(o[0], o[1])),
                (e.ua = I(ne, kn, (e, t) => I(e, t ? a : vn))),
                nt("HttpRequest", e))
          },
          AbortRequest: !0,
          UA: () => I(kn[0], vn),
          UAD() {
            if (_n) {
              const e = K(),
                t = I(_n, vn)
              for (let n = 1; n < kn.length; n++) e[Ue[n]] = I(kn[n], t)
              return e
            }
          },
          UAH: (e) => I(Rn, I(_n, vn), e),
        }),
        ut({
          async HttpRequested(e) {
            const { id: t, data: n } = e,
              o = bn[t]
            if (!o) return
            if (Z(e, "chunk")) return void Mn(o, n, e)
            let a = null == n ? void 0 : n[g]
            null != a &&
              (e.blobbed
                ? ((a = await Ln(a, yn(o))), nt("RevokeBlob", a))
                : e.chunked &&
                  (Mn(o, a),
                  (a = o[hn]),
                  delete o[hn],
                  yn(o) ? (a = new j([a], { type: e.contentType })) : o[v] && (a = I(un, a))),
              (n[g] = a)),
              e.type === mn && delete bn[e.id],
              xn(e, o.realm)
          },
        })
      const Dn = K(),
        En = K(),
        Sn = K()
      dt({
        async TabOpen({ key: e, data: t }, n) {
          await ft[De]
          const { id: o } = await nt("TabOpen", t)
          ;(Dn[e] = o), (En[o] = e), (Sn[o] = n)
        },
        async TabClose(e) {
          await ft[De]
          const t = Dn[e]
          ;(e && !t) || nt("TabClose", { id: t })
        },
      }),
        ut({
          TabClosed(e) {
            const t = En[e],
              n = Sn[e]
            delete Sn[e], delete En[e], delete Dn[t], t && ft.post("TabClosed", t, n)
          },
        })
      const { [c]: Tn } = ft
      async function Un(e) {
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
      function Pn() {
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
      ut({ [o]: () => !0 }, !0),
        ut({
          Command: (e) => ft.post("Command", e, Tn[e.id]),
          Run: (e) => St(e, r),
          UpdatedValues(e) {
            const t = K(),
              n = K()
            I(ee, me(e), (o) => {
              ;(Tn[o] === r ? n : t)[o] = e[o]
            }),
              Pe(t) || ft.post("UpdatedValues", t),
              Pe(n) || ft.post("UpdatedValues", n, r)
          },
        }),
        dt({ Log: (e) => P(Re[e[0]], Re, e[1]), TabFocus: De, UpdateValue: De }),
        (async () => {
          const e = Me instanceof XMLDocument,
            n = Pn(),
            o = nt("GetInjected", { url: Ee && location.href, [s]: e, done: !(!n && !t.vmData) }, { retry: !0 }),
            a = n || (Ee && Event[x].composedPath ? await Un(o) : await o),
            r = (ft[u] = a[u])
          pe(Tn, a[c]),
            Ee && !a.clipFF && z("copy", wt, !0),
            null != a[i] && !e && qt(a) && (dt({ GetScriptVer: !0 }), ft.post("Expose", a[i])),
            me(Tn).length && (ct.forEach((e) => e(a)), await Gt(a, e)),
            (ct.length = 0),
            Ut(r)
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
              n.length > 1 ? n.go(-1) : nt("TabClose")
            }
            I(ae, d, "// ==UserScript==") < 0 ||
              (await nt("ConfirmInstall", { code: d, url: i, from: o }),
              r
                ? ye.runtime.onConnect.addListener((e) => {
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
                        ;(l = null), (await nt("CheckInstallerTab", e.sender.tab.id)) || u()
                      }))
                  })
                : u())
          })().catch(Re.error)
    })()
  }
}
