{
  const e = "**VMInitInjection**"
  if (1 !== window[e]) {
    const t = this,
      { window: n } = t,
      o = "Violentmonkey",
      a = "auto",
      r = "content",
      i = "expose",
      c = "forceContent",
      s = "ids",
      l = -1,
      d = 2,
      u = "injectInto",
      p = "more",
      f = "page",
      w = "runAt",
      h = "scripts",
      y = "response",
      g = "responseHeaders",
      m = "sessionId",
      b = "top",
      v = "xhrType",
      k = "SkipScripts",
      _ = (e) => "function" == typeof e,
      R = (e) => null != e && "object" == typeof e,
      L = "prototype",
      C = "__CBID",
      x = "fileName",
      M = (e) => "string" == typeof e,
      $ = (e, t, n) => {
        try {
          e && ee(e, t) && (n = e[t])
        } catch (e) {}
        return n
      },
      S = (e, t, n, o = !0, a) =>
        fe(e, t, { __proto__: null, [a || "value"]: n, [!a && "writable"]: o, configurable: o, enumerable: o }),
      T = (e) => pe(Q(), e),
      E = async (e) => e,
      D = (e = "VM") => e + me(),
      U = (e, ...t) => {
        let n = `[${o}]`
        t[0] &&
          I(te, t[0], (e) => {
            n += `[${e}]`
          }),
          (t[0] = n),
          j(Re[e], Re, t)
      },
      P = (e, t) => S(e, e.length, t),
      { apply: j } = Reflect,
      I = j.call.bind(j.call),
      {
        Blob: O,
        CustomEvent: N,
        Error: F,
        MouseEvent: V,
        Object: A,
        Promise: H,
        Response: q,
        Uint8Array: B,
        atob: G,
        addEventListener: W,
        cloneInto: J,
        chrome: X,
        dispatchEvent: z,
        removeEventListener: K,
      } = t,
      Q = A.create.bind(A, null),
      Y = F,
      Z = q[L],
      ee = j.call.bind({}.hasOwnProperty),
      { forEach: te, includes: ne } = [],
      { then: oe } = H[L],
      { indexOf: ae, slice: re } = "",
      ie = j.call.bind("".charCodeAt),
      { append: ce, appendChild: se, attachShadow: le, remove: de, setAttribute: ue } = Element[L],
      {
        assign: pe,
        defineProperty: fe,
        getOwnPropertyDescriptor: we,
        getPrototypeOf: he,
        setPrototypeOf: ye,
        keys: ge,
      } = A,
      { random: me } = Math,
      { toStringTag: be } = Symbol,
      { stopImmediatePropagation: ve } = Event[L],
      ke = we(N[L], "detail").get,
      _e = we(V[L], "relatedTarget").get,
      Re = T(console),
      Le = X.runtime.getURL(""),
      Ce = (e, t) => {
        for (let n = e; R(n) && (n = he(n)); ) if (n === t) return !0
      },
      xe = (
        (e) => (t) =>
          Ce(t, e)
      )(H[L]),
      { document: Me } = t,
      { getElementsByTagName: $e } = Me,
      Se = "reify"
    let Te = t !== n,
      Ee = n !== top ? 0 : Me.prerendering && "hidden" === Me.visibilityState ? 2 : 1
    ;(() => {
      "use strict"
      var T
      let { browser: A } = t
      if (Te || (null != (T = A) && T.runtime));
      else {
        const { Proxy: e } = t,
          { bind: n } = e,
          a = "message",
          r = "stack",
          i = (e) => "addListener" === e || "removeListener" === e || "hasListener" === e || "hasListeners" === e,
          c = (e, t, o, a) => {
            const r = o[t]
            if (void 0 === r) return
            let c
            return (
              (c = _(a)
                ? a(o, r)
                : _(r)
                  ? 0 === a || i(t) || !ee(o, t)
                    ? I(n, r, o)
                    : l(o, r)
                  : R(r) && 0 !== a
                    ? s(r, a)
                    : r),
              (e[t] = c),
              c
            )
          },
          s = (t, n) =>
            new e(
              { __proto__: null },
              {
                __proto__: null,
                get: (e, o) => {
                  var a
                  return null != (a = e[o]) ? a : c(e, o, t, null == n ? void 0 : n[o])
                },
              }
            ),
          l =
            (e, t, n) =>
            (...i) => {
              let c, s
              const l = new H((e, t) => {
                  ;(c = e), (s = t)
                }),
                d = new Y(`callstack before invoking ${t.name || "chrome API"}:`)
              P(i, (e) => {
                const t = X.runtime.lastError,
                  o = t || (n ? n(c, e) : c(e))
                o && (t || (d[r] = `${o[1]}\n${d[r]}`), (d[a] = t ? o[a] : `${o[0]}`), (d.isRuntime = !!t), s(d))
              })
              try {
                j(t, e, i)
              } catch (e) {
                if ("Extension context invalidated." !== e[a]) throw e
                Re.error(`Please reload the tab to restore ${o} API for userscripts.`)
              }
              return l
            },
          d = (e, t) => [null != e ? e : null, t && (t[a] ? [t[a], t[r]] : [t, new Y()[r]])],
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
              if (a && xe(a)) return u(a, o), !0
              void 0 !== a && o(d(a))
            } catch (e) {
              o(d(0, e))
            }
          },
          f = (e, t) => (t ? t[1] : "null response") || e(t[0]),
          w = (e, t) => l(e, t, f)
        A = t.browser = s(X, {
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
      const fe = A,
        me = "metaStr",
        be = t.browser
      function De(e) {
        for (const t in e) if (ee(e, t)) return !1
        return !0
      }
      const Ue = /(Receiving end does not exist)|The message port closed before|moved into back\/forward cache|$/
      function Pe(e, { retry: t } = {}) {
        return t ? je(e) : be.runtime.sendMessage(e)
      }
      async function je(e, t = 1e4) {
        for (let n = performance.now(); performance.now() - n < t; ) {
          try {
            const t = await Pe(e)
            if (void 0 !== t) return t
          } catch (e) {
            if (!Ue.exec(e)[1]) throw e
          }
          await be.storage.local.get(o)
        }
        throw new F(o + " cannot connect to the background page.")
      }
      const Ie = we(MessageEvent[L], "data").get,
        { port1: Oe, port2: Ne } = new MessageChannel(),
        Fe = Oe.postMessage.bind(Oe),
        Ve = Q()
      let Ae = 0
      function He() {
        return new H((e) => {
          ;(Ve[(Ae += 1)] = e), Fe(Ae)
        })
      }
      Ne.onmessage = (e) => {
        const t = I(Ie, e),
          n = Ve[t]
        delete Ve[t], Ae === t && (Ae -= 1), n()
      }
      const qe = (e, t) => $(I($e, Me, e), t || 0),
        { TextDecoder: Be } = t,
        { createElementNS: Ge } = Me,
        We = Be[L].decode,
        Je = "textContent",
        Xe = we(Node[L], Je).set,
        ze = RegExp[L].test,
        { createObjectURL: Ke } = URL,
        Qe = (e, t, n) =>
          new H((o) => {
            if (qe(e)) o(t(n))
            else {
              const a = new MutationObserver(() => {
                qe(e) && (a.disconnect(), o(t(n)))
              })
              a.observe(Me, { childList: !0, subtree: !0 })
            }
          }),
        Ye = (e, t) => {
          const n = I(Ge, Me, "http://www.w3.org/1999/xhtml", e)
          return (
            t && M(t)
              ? I(Xe, n, t)
              : t &&
                I(te, ge(t), (e) => {
                  e === Je ? I(Xe, n, t[e]) : I(ue, n, e, t[e])
                }),
            n
          )
        },
        Ze = (e, t) => {
          let n
          const o = I(ae, e, ","),
            a = o < 0 ? "" : I(re, e, 0, o),
            r = o < 0 ? e : I(re, e, o + 1)
          if (!1 === t) return `data:${a};base64,${r}`
          if (((n = G(r)), I(ze, /[\x80-\xFF]/, n))) {
            const e = n.length,
              o = new B(e)
            for (let t = 0; t < e; t += 1) o[t] = ie(n, t)
            n = t ? o : I(We, new Be(), o)
          }
          return t ? Ke(new O([n], { type: a })) : n
        },
        et = (e, t, n) => Pe({ cmd: e, data: t, url: location.href, [b]: Ee }, n),
        tt = ["log", "info", "warn", "error", "debug"],
        nt = (e, t) => {
          const o = J ? J(t, Me) : t,
            a = new N(e, { __proto__: null, detail: o })
          I(z, n, a)
        },
        ot = (e, t, a) => {
          let r
          I(
            W,
            n,
            e,
            (e) => {
              if ((I(ve, e), r)) (r.node = I(_e, e)), (e = r), (r = null)
              else {
                try {
                  e = I(ke, e)
                } catch (e) {
                  return
                }
                if (
                  (e || ((e = Q()).data = `[${o}] Non-cloneable property e.g. a DOM node or function.`),
                  J && (e = J(e, n)),
                  e.node && (r = e))
                )
                  return
              }
              a.onHandle(e)
            },
            !0
          ),
            (a.post = (e, o, r, i) => {
              const c = a[s] ? i : r,
                l = c && new V(t, { __proto__: null, relatedTarget: c })
              nt(t, { cmd: e, data: o, node: !!l }), l && I(z, n, l)
            })
        },
        at = Q(),
        rt = Q(),
        it = [],
        ct = (e, t, n) => {
          n || u in dt ? pe(e, t) : it.push(() => pe(e, t))
        },
        st = ct.bind({}, at),
        lt = ct.bind({}, rt),
        dt = {
          __proto__: null,
          [s]: Q(),
          cache: Q(),
          pathMaps: Q(),
          async onHandle({ cmd: e, data: t, node: n }, o) {
            let a,
              r = at[e],
              i = t && $(t, C)
            i && (t = t.data)
            try {
              if (!r) throw t
              r === Se && ((r = !0), (a = dt[Se]), a && (await a)),
                (a = !0 === r ? et(e, t) : I(r, n, t, o || f)),
                xe(a) && (a = await a)
            } catch (e) {
              ;(i = "Error"), (a = e)
            }
            i && dt.post("Callback", { id: i, data: a }, o)
          },
        },
        ut = dt
      let pt, ft, wt, ht
      be.runtime.onMessage.addListener(async ({ cmd: e, data: t }, n) => {
        try {
          const o = rt[e]
          o && (await o(t, n))
        } catch (e) {
          Re.error(e)
        }
      }),
        Te && W("copy", (pt = (e) => wt && ft(e)), !0),
        it.push(({ clipFF: e }) => {
          if (e) {
            const { execCommand: e } = Me,
              { setData: t } = DataTransfer[L],
              { get: n } = we(ClipboardEvent[L], "clipboardData"),
              { preventDefault: o, stopPropagation: a } = Event[L]
            ;(ft = (e) => {
              I(a, e), I(ve, e), I(o, e), I(t, I(n, e), wt.type || "text/plain", wt.data)
            }),
              (ht = async (t) => {
                await ut[Se], (wt = t), I(e, Me, "copy"), (wt = null)
              })
          }
          st({ SetClipboard: ht || Se })
        })
      const yt = Q(),
        gt = ["script", "style", "link", "meta"],
        { toLowerCase: mt } = "",
        { [s]: bt } = ut
      let vt, kt
      async function _t(e) {
        if (kt) {
          if (e) {
            if (vt) return
            ;(vt = He), await vt, (vt = null)
          }
          await et("SetPopup", { [s]: bt, [u]: ut[u], menus: yt })
        }
      }
      lt(
        {
          async PopupShown(e) {
            await ut[Se], (kt = e), _t()
          },
        },
        !0
      ),
        st({
          AddElement({ tag: e, attrs: t, cbId: n }, o) {
            let a, r
            try {
              const n = this || (I(ne, gt, I(mt, `${e}`)) && qe("head")) || qe("body") || qe("*")
              ;(a = Ye(e, t)), Qt(a), I(se, n, a)
            } catch (e) {
              r = [`${e}`, e.stack]
            }
            ut.post("Callback", { id: n, data: r }, o, a)
          },
          GetResource({ id: e, isBlob: t, key: n, raw: o }) {
            var a
            return o || (o = ut.cache[(null == (a = ut.pathMaps[e]) ? void 0 : a[n]) || n]), !o || Ze(o, t)
          },
          RegisterMenu({ id: e, key: t, val: n }) {
            ;((yt[e] || (yt[e] = Q()))[t] = n), _t(!0)
          },
          UnregisterMenu({ id: e, key: t }) {
            var n
            null == (n = yt[e]) || delete n[t], _t(!0)
          },
        })
      const Rt = we(PageTransitionEvent[L], "persisted").get
      let Lt,
        Ct,
        xt,
        Mt = 2 === Ee
      function $t(e) {
        e.isTrusted && (this ? I(Rt, e) && Tt(0, "bfcache") : ((Ee = 3), (xt = ut[Se] = !1), Lt(), Tt(), (Ee = 4)))
      }
      function St(e, t) {
        P(Ct, e), (ut[s][e] = t || f), Mt || (Mt = Tt(2))
      }
      async function Tt(e, t = !xt) {
        for (; --e >= 0; ) await He()
        et("Run", { reset: t, [s]: Ct }), _t(!!Mt), (Mt = !1), (xt = !0)
      }
      function Et(e) {
        Mt || xt || ((e !== k && "off" !== e) || (Ct = e), Tt())
      }
      it.push(() => {
        st({ Run: St }), (Ct = [])
      }),
        W("pageshow", $t),
        Mt && (I(W, Me, "prerenderingchange", $t.bind(null), { once: !0 }), (ut[Se] = new Promise((e) => (Lt = e))))
      const Dt = ut[s]
      let Ut,
        Pt,
        jt,
        It,
        Ot,
        Nt,
        Ft,
        Vt,
        At = n[e]
      function Ht(e) {
        Ot = !1
        const o = e[m] + "VW",
          a = o + "*",
          r = D(),
          i = D(),
          c = D(),
          s = D()
        return (
          (Vt = e.nonce),
          Te
            ? I(
                W,
                n,
                o,
                (e) => {
                  I(ve, e),
                    Nt
                      ? (I(z, Nt, new N(a, { __proto__: null, detail: Kt(I(ke, e), Nt) })), (Nt = null))
                      : (Nt = I(_e, e))
                },
                !0
              )
            : S(t, o, Kt, !1),
          l(opener) || l(n !== top && parent)
            ? d()
            : Gt({ code: `parent["${r}"] = [this, 0]` }, () => {
                ;(Te && !Yt(n.wrappedJSObject[r])) || d()
              }),
          Ot
        )
        function l(e) {
          let t
          try {
            t = e && we(e.location, "href").get
          } catch (e) {}
          if (t)
            if (((t = !1), Te)) {
              const i = (e) => {
                t = I(ke, e)
              }
              I(W, n, a, i, !0)
              try {
                I(z, e, new V(o, { relatedTarget: n })), I(z, e, new N(o, { detail: r }))
              } catch (e) {}
              I(K, n, a, i, !0)
            } else (t = e[o]), (t = t && t(r, n))
          return t
        }
        function d() {
          I(W, n, i, u, { capture: !0, once: !0 }),
            Gt({ code: `(${At}(${Te},'${i}','${r}'))()\n//# sourceURL=${Le}sandbox/injected-web.js` }),
            I(K, n, i, u, !0)
        }
        function u(e) {
          ;(Ot = !0), I(ve, e), ot(c, s, ut), nt(`${i}*`, [s, c])
        }
      }
      async function qt(e, t) {
        var n, o
        const { errors: a, info: i, [p]: s } = e,
          l = "cache"
        a && Re.warn(a),
          Te && (Te = parseFloat(i.ua.browserVersion)),
          (i.gmi = { isIncognito: X.extension.inIncognitoContext }),
          (Pt = Q()),
          (Pt[f] = i),
          (Pt[r] = i),
          pe(ut[l], e[l]),
          t || e[c] ? (Ot = !1) : e[f] && null == Ot && Ht(e)
        const d = e[h].filter((e) => Bt(e) === r).map((e) => [e.id, e.key.data]),
          u = (s || d.length) && et("InjectionFeedback", { [c]: !Ot, [r]: d, [p]: s, url: Te && location.href }),
          w = we(Document[L], "readyState").get,
          y = jt
        if (
          (y && Xt(),
          (Ut = Q()),
          await Qe("*", Wt, "start"),
          ((null != (n = It) && n.body) || (null != (o = jt) && o.body)) && (await Qe("body", Wt, "body")),
          s && (e = await u))
        ) {
          pe(ut[l], e[l]),
            "loading" === I(w, Me) &&
              (await new H((e) => {
                W("DOMContentLoaded", e, { once: !0 })
              }),
              await 0)
          for (let t = 0, n = e[h]; t < n.length; t++) Bt(n[t])
          jt && !y && Xt(), await Wt("end"), await Wt("idle")
        }
        Pt = jt = It = At = null
      }
      function Bt(e) {
        let t = e[u]
        if (((t = (t === a && !Ot) || t === r ? r : Ot && f), t)) {
          const n = t === r ? jt || (jt = Q()) : It || (It = Q()),
            { gmi: o, [me]: a, pathMap: i, [w]: c } = e,
            s = n[c] || (n[c] = [])
          P(s, e),
            S(o, "scriptMetaStr", a[0] || I(re, e.code[a[1]], a[2], a[3])),
            delete e[me],
            i && (ut.pathMaps[e.id] = i)
        } else Dt[e.id] = l
        return t
      }
      function Gt(e, t) {
        const { code: o } = e,
          a = R(o),
          r = Ye("script", !a && o),
          i =
            Te &&
            !t &&
            ((t) => {
              const { stack: n } = t.error
              ;(n && !`${n}`.includes(Le)) || (U("error", [e.displayName], t.error), t.preventDefault())
            }),
          c = Ye("div"),
          s = Ft || (le ? I(le, c, { mode: "closed" }) : c)
        let l, d
        a && j(ce, r, o),
          Qt(r),
          t
            ? ((l = Ye("iframe", {
                src: "javascript:void 0",
                sandbox: "allow-same-origin allow-scripts",
                style: "display:none!important",
              })),
              Te || I(se, s, l))
            : I(se, s, r),
          i && I(W, n, "error", i),
          Ft || I(se, qe("*") || Me, c),
          i && I(K, n, "error", i),
          t &&
            ((Ft = s),
            Te && I(se, s, l),
            (d = l.contentDocument) && (I(se, I($e, d, "*")[0], r), t()),
            I(de, l),
            (Ft = null)),
          I(de, r),
          I(de, c)
      }
      function Wt(e) {
        let t
        for (let n = 1; n >= 0; n--) {
          const o = n ? f : r,
            a = n ? It : jt,
            i = null == a ? void 0 : a[e]
          if (i) {
            ut.post("ScriptData", { items: i, info: Pt[o] }, o), (Pt[o] = !1)
            for (let e = 0; e < i.length; e++) {
              const { id: t } = i[e]
              Ut[t] = 1
            }
            n ? Te || (t = Jt(e)) : I(oe, He(), () => zt(i))
          }
        }
        return t
      }
      async function Jt(e) {
        const t = It[e]
        for (let n = 0; n < t.length; n++) {
          const o = t[n]
          o.code &&
            ("idle" === e && (await He()),
            "end" === e && (await 0),
            zt([o]),
            o.meta.unwrap || ut.post("Plant", o.key),
            Gt(o),
            (o.code = ""),
            o.meta.unwrap && St(o.id))
        }
      }
      function Xt() {
        const e = At(Te)(ut.onHandle, Re),
          t = ut.post
        ut.post = (n, o, a, i) => {
          ;(a === r ? e : t)(n, o, void 0, i)
        }
      }
      function zt(e) {
        for (let t = 0; t < e.length; t++) {
          const { id: n } = e[t]
          Ut[n] && (1 === Dt[n] && (Dt[n] = d), delete Ut[n])
        }
      }
      function Kt(e, t) {
        const { post: n } = ut
        if (n) return n("WriteVault", e, f, t), !0
      }
      function Qt(e) {
        Vt && I(ue, e, "nonce", Vt)
      }
      function Yt(e) {
        if (!e) return
        const t = J(Q(), Me),
          n = J(Q(), Me)
        return (
          I(te, tt, (e) => {
            n[e] = exportFunction(Re[e], Me)
          }),
          (t.console = n),
          (e[1] = t),
          !0
        )
      }
      S(n, e, 1, !1), st({ InjectList: Te && Jt })
      const Zt = Q(),
        en = (e, t) => t && ut.post(e, t.id, t.realm) && t
      st({
        async Notification(e, t) {
          await ut[Se]
          const n = await et("Notification", e)
          Zt[n] = { id: e.id, realm: t }
        },
        RemoveNotification(e) {
          for (const t in Zt) if (Zt[t].id === e) return delete Zt[t], et("RemoveNotification", t)
        },
      }),
        lt({
          NotificationClick(e) {
            en("NotificationClicked", Zt[e])
          },
          NotificationClose(e) {
            en("NotificationClosed", Zt[e]) && delete Zt[e]
          },
        })
      const { fetch: tn, FileReader: nn, FormData: on } = t,
        { arrayBuffer: an, blob: rn } = Z,
        { createObjectURL: cn, revokeObjectURL: sn } = URL,
        ln = O[L],
        dn = we(ln, "type").get,
        un = we(he(B[L]), "buffer").get,
        pn = we(nn[L], "result").get,
        fn = nn[L].readAsDataURL,
        wn = on[L].append,
        hn = "chunks",
        yn = "load",
        gn = "loadend",
        mn = (e) => "blob" === e[v],
        bn = Q()
      let vn,
        kn = E()
      async function _n(e, t, n, o, a, r) {
        for (
          o ? (await Cn(n, o), (t = null)) : (t = await Ln(n, mn(e)));
          Rn(
            (e = { id: e.id, type: a ? yn : gn, data: { finalUrl: n, readyState: 4, status: 200, [y]: t, [g]: "" } }),
            r
          ),
            a;

        )
          a = t = null
      }
      function Rn(e, t) {
        ut.post("HttpRequested", e, t)
      }
      async function Ln(e, t) {
        return I(t ? rn : an, await tn(e))
      }
      function Cn(e, t, n) {
        const o = Ye("a", { href: e, download: t }),
          a = I(oe, kn, () => {
            I(z, o, new V("click")), n && xn(e)
          })
        return (kn = I(oe, a, () => et("SetTimeout", 150))), a
      }
      async function xn(e) {
        await et("SetTimeout", 3e3), sn(e)
      }
      function Mn(e, t, n) {
        if (!e[v]) return void S(e[hn] || (e[hn] = [""]), n ? n.i : 0, t)
        const o = (t = G(t)).length,
          a = e[hn] || (e[hn] = new B(n ? n.size : o))
        for (let e = (null == n ? void 0 : n.chunk) || 0, r = 0; r < o; ) a[e++] = ie(t, r++)
      }
      async function $n(e, t) {
        if ("fd" === t) {
          if (!e.length) return [e, t]
          const n = new on()
          I(te, e, (e) => I(wn, n, e[0], e[1])), (e = n)
        }
        const n = Ce(e, ln),
          o = n ? e : await I(rn, new q(e)),
          a = new nn()
        return new H((e) => {
          I(W, a, yn, () => e([I(pn, a), I(dn, o), n])), I(fn, a, o)
        })
      }
      it.push((e) => {
        e.xhr && (vn = we(Navigator[L], "userAgent").get.bind(navigator))
      }),
        st({
          async HttpRequest(e, t) {
            ye(e, null)
            let { data: n } = e
            const { events: o, url: a, [x]: r } = e,
              i = I(ne, o, yn),
              c = I(re, a, 0, 5)
            return "data:" === c || ("blob:" === c && 5 === I(ae, a, location.origin + "/"))
              ? _n(e, n, a, r, i, t)
              : ((bn[e.id] = { __proto__: null, realm: t, [x]: r, [v]: e[v] }),
                r && !i && P(o, yn),
                !Te && n.length > 1 && "usp" !== n[1] && ((n = await $n(n[0], n[1])), (e.data = J ? J(n, e) : n)),
                (e.ua = vn()),
                et("HttpRequest", e))
          },
          AbortRequest: !0,
        }),
        lt({
          async HttpRequested(e) {
            const { id: t, data: n } = e,
              o = bn[t]
            if (!o) return
            if (ee(e, "chunk")) return void Mn(o, n, e)
            let a = null == n ? void 0 : n[y]
            null != a &&
              (e.blobbed
                ? ((a = await Ln(a, mn(o))), et("RevokeBlob", a))
                : e.chunked &&
                  (Mn(o, a),
                  (a = o[hn]),
                  delete o[hn],
                  mn(o) ? (a = new O([a], { type: e.contentType })) : o[v] && (a = I(un, a))),
              (n[y] = a)),
              a && o[x] && (o[y] = a),
              e.type === yn && o[x] && (await Cn(cn(o[y]), o[x], !0)),
              e.type === gn && delete bn[e.id],
              Rn(e, o.realm)
          },
        })
      const Sn = Q(),
        Tn = Q(),
        En = Q()
      st({
        async TabOpen({ key: e, data: t }, n) {
          await ut[Se]
          const { id: o } = await et("TabOpen", t)
          ;(Sn[e] = o), (Tn[o] = e), (En[o] = n)
        },
        async TabClose(e) {
          await ut[Se]
          const t = Sn[e]
          ;(e && !t) || et("TabClose", { id: t })
        },
      }),
        lt({
          TabClosed(e) {
            const t = Tn[e],
              n = En[e]
            delete En[e], delete Tn[e], delete Sn[t], t && ut.post("TabClosed", t, n)
          },
        })
      const { [s]: Dn } = ut
      async function Un(e) {
        const n =
          t.vmData ||
          (await H.race([
            new H((e) => {
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
              n = `blob:${Le}${o}`
            return e.open("get", n, !1), e.send(), URL.revokeObjectURL(n), JSON.parse(e[y])
          }
        } catch (e) {}
      }
      lt({ [o]: () => !0 }, !0),
        lt({
          Command: (e) => ut.post("Command", e, Dn[e.id]),
          Run: (e) => St(e, r),
          UpdatedValues(e) {
            const t = Q(),
              n = Q()
            I(te, ge(e), (o) => {
              ;(Dn[o] === r ? n : t)[o] = e[o]
            }),
              De(t) || ut.post("UpdatedValues", t),
              De(n) || ut.post("UpdatedValues", n, r)
          },
        }),
        st({ Log: (e) => j(Re[e[0]], Re, e[1]), TabFocus: Se, UpdateValue: Se }),
        (async () => {
          const e = Me instanceof XMLDocument,
            n = Pn(),
            o = et("GetInjected", { url: Te && location.href, [c]: e, done: !(!n && !t.vmData) }, { retry: !0 }),
            a = n || (Te && Event[L].composedPath ? await Un(o) : await o),
            r = (ut[u] = a[u])
          pe(Dn, a[s]),
            Te && !a.clipFF && K("copy", pt, !0),
            null != a[i] && !e && Ht(a) && (st({ GetScriptVer: !0 }), ut.post("Expose", a[i])),
            ge(Dn).length && (it.forEach((e) => e(a)), await qt(a, e)),
            (it.length = 0),
            Et(r)
        })().catch(Te && Re.error),
        Te &&
          1 === Ee &&
          "file:" === location.protocol &&
          location.pathname.endsWith(".user.js") &&
          "application/x-javascript" === Me.contentType &&
          (async () => {
            const { fetch: e, history: n } = t,
              { referrer: o } = Me,
              { text: a } = Z,
              r = "cookie" in Document[L],
              i = location.href,
              c = async () => I(a, await e(i, { mode: "same-origin" }))
            let s,
              l,
              d = await c()
            function u() {
              n.length > 1 ? n.go(-1) : et("TabClose")
            }
            I(ae, d, "// ==UserScript==") < 0 ||
              (await et("ConfirmInstall", { code: d, url: i, from: o }),
              r
                ? fe.runtime.onConnect.addListener((e) => {
                    "FetchSelf" === e.name &&
                      (e.onMessage.addListener(async () => {
                        try {
                          s && (await s), (d = await (s = c()))
                        } finally {
                          s = !1
                        }
                        d === l ? (d = null) : (l = d), e.postMessage(d)
                      }),
                      e.onDisconnect.addListener(async () => {
                        ;(l = null), (await et("CheckInstallerTab", e.sender.tab.id)) || u()
                      }))
                  })
                : u())
          })().catch(Re.error)
    })()
  }
}
