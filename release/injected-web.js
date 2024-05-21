{
  const e = "**VMInitInjection**"
  1 !== window[e] &&
    (window[e] = function (e, t, n) {
      const o = { __proto__: null },
        r = this,
        { window: l } = r,
        i = "Violentmonkey",
        s = "content",
        a = "responseHeaders",
        u = "responseText",
        c = "responseType",
        d = "xhrType",
        _ = (e) => "function" == typeof e,
        f = (e) => null != e && "object" == typeof e,
        p = "prototype",
        g = (e) => "string" == typeof e,
        h = (e, t, n) => {
          try {
            e && ae(e, t) && (n = e[t])
          } catch (e) {}
          return n
        },
        m = (e, t, n, o = !0, r) =>
          W(e, t, { __proto__: null, [r || "value"]: n, [!r && "writable"]: o, configurable: o, enumerable: o }),
        y = (e) => K($(), e),
        v = (e, t, n) => (
          X(e, null),
          t &&
            k(C, n, (n) => {
              ae(t, n) && (e[n] = t[n])
            }),
          e
        ),
        b = (e, t, n, o) => {
          var r
          const l = e[t] || (e[t] = $())
          return null != (r = l[n]) ? r : (l[n] = null != o ? o : $())
        },
        w = async (e) => e,
        M = (e = "VM") => e + _e(),
        x = (e, ...t) => {
          let n = `[${i}]`
          t[0] &&
            k(C, t[0], (e) => {
              n += `[${e}]`
            }),
            (t[0] = n),
            V(de[e], de, t)
        },
        G = (e, t) => m(e, e.length, t)
      let k,
        $,
        C,
        V,
        T,
        R,
        S,
        E,
        I,
        O,
        P,
        L,
        N,
        j,
        A,
        q,
        H,
        U,
        D,
        J,
        F,
        K,
        W,
        B,
        z,
        X,
        Q,
        Y,
        Z,
        ee,
        te,
        ne,
        oe,
        re,
        le,
        ie,
        se,
        ae,
        ue,
        ce,
        de,
        _e,
        fe,
        pe,
        ge,
        he,
        me,
        ye,
        ve,
        be
      const we = t ? null : r.cloneInto,
        Me = (() => {
          let t,
            o,
            i,
            s,
            a,
            u,
            c,
            d = -1,
            f = r,
            g = l
          return (
            n && ((u = l[n]), delete l[n]),
            u && !_(u[0]) && ((f = u[0]), (g = f), (c = e && u[1]), (u = !1)),
            u || (u = { __proto__: null }),
            (u = [
              (R = u[(d += 1)] || f.CustomEvent),
              (S = u[(d += 1)] || f.DOMParser),
              (E = u[(d += 1)] || f.Error),
              (I = u[(d += 1)] || f.EventTarget),
              (O = u[(d += 1)] || f.KeyboardEvent),
              (P = u[(d += 1)] || f.MouseEvent),
              (L = u[(d += 1)] || f.Object),
              (j = u[(d += 1)] || f.Symbol),
              (N = u[(d += 1)] || f.Proxy),
              (q = u[(d += 1)] || f.dispatchEvent),
              (D = u[(d += 1)] || f.removeEventListener),
              (J = u[(d += 1)] || f.addEventListener),
              (W = ((i = L) && u[(d += 1)]) || i.defineProperty),
              (B = u[(d += 1)] || i.getOwnPropertyDescriptor),
              (a = u[(d += 1)] || i.getOwnPropertyNames),
              (z = u[(d += 1)] || i.getPrototypeOf),
              (X = u[(d += 1)] || i.setPrototypeOf),
              (K = u[(d += 1)] || i.assign),
              (Q = u[(d += 1)] || i.keys),
              (Y = u[(d += 1)] || i.values),
              (Z = u[(d += 1)] || (t = f.Array[p]).concat),
              (ee = u[(d += 1)] || t.filter),
              (C = u[(d += 1)] || t.forEach),
              (te = u[(d += 1)] || t.indexOf),
              (ne = u[(d += 1)] || f.Element[p].remove),
              (oe = u[(d += 1)] || f.String[p].slice),
              (V = u[(d += 1)] || (o = f.Reflect).apply),
              (k = u[(d += 1)] || (s = i.call).bind(s)),
              (T = u[(d += 1)] || s.bind(i.bind)),
              (le = u[(d += 1)] || f.URL[p].toString),
              ($ = u[(d += 1)] || T(i.create, i, null)),
              (se = u[(d += 1)] || f.FormData[p].entries),
              (ae = u[(d += 1)] || T(s, i[p].hasOwnProperty)),
              (ie = u[(d += 1)] || f.Array.isArray),
              (ue = u[(d += 1)] || f.JSON.parse),
              (ce = u[(d += 1)] || f.JSON.stringify),
              (de = u[(d += 1)] || y((c || f).console)),
              (_e = u[(d += 1)] || f.Math.random),
              (fe = u[(d += 1)] || S[p].parseFromString),
              (pe = u[(d += 1)] || o.ownKeys),
              (ge = u[(d += 1)] || f.Event[p].stopImmediatePropagation),
              (he = u[(d += 1)] || f.Promise[p].then),
              (me = u[(d += 1)] || f.URLSearchParams[p].toString),
              (ye = u[(d += 1)] || B(f.Document[p], "currentScript").get),
              (ve = u[(d += 1)] || B(R[p], "detail").get),
              (be = u[(d += 1)] || B(P[p], "relatedTarget").get),
              (H = u[(d += 1)] || B(g, "length").get || (() => h(l, "length", 1e9))),
              (U = u[(d += 1)] || B(g, "parent").get || (() => h(l, "parent"))),
              (re = u[(d += 1)] || [a(g), f !== g && a(f)]),
            ]),
            (F = j.toStringTag),
            u
          )
        })()
      try {
        A = Promise
      } catch (e) {}
      ;(() => {
        "use strict"
        var n = { __proto__: null }
        for (let e = 0, t = "dor"; e < t.length; e++) W(n, t[e], { __proto__: null, value: 0, writable: 1 })
        ;(n.d = (e, t) => {
          for (var n in t) n in e || W(e, n, { __proto__: null, enumerable: !0, get: t[n] })
        }),
          (n.o = (e, t) => ae(e, t)),
          (n.r = (e) => {
            W(e, F, { __proto__: null, value: "Module" }), W(e, "__esModule", { __proto__: null, value: !0 })
          })
        var z = { __proto__: null }
        n.r(z), n.d(z, { __proto__: null, default: () => Kt })
        const _e = $(),
          he = (e) => K(_e, e),
          xe = {
            __proto__: null,
            Error(e) {
              throw e
            },
          },
          Ge = {
            __proto__: null,
            callbacks: xe,
            onHandle({ cmd: e, data: t, node: n }) {
              const o = _e[e]
              o && k(o, n, t)
            },
            send(e, t, n) {
              let o, r
              try {
                r = new A((e) => {
                  o = e
                })
              } catch (e) {}
              return $e(e, t, n, o), r
            },
            call: $e,
          }
        let ke
        function $e(e, t, n, o, r) {
          const l = M()
          if (((xe[l] = o || Ce), r ? m(t, r, l) : (t = { __CBID: l, data: t }), Ge.post(e, t, n), !o)) return ke
        }
        function Ce(e) {
          ke = e
        }
        const Ve = Ge,
          Te = $(),
          Re = $()
        function Se(e) {
          for (const t in e) if (ae(e, t)) return !1
          return !0
        }
        const Ee = { __proto__: null, string: "s", number: "n", boolean: "b" }
        function Ie(e, t = JSON.stringify) {
          if (void 0 !== e) {
            const n = Ee[typeof e]
            return `${n || "o"}${n ? e : t(e)}`
          }
        }
        const Oe = ["log", "info", "warn", "error", "debug"],
          Pe = (e, t) => {
            const n = we ? we(t, document) : t,
              o = new R(e, { __proto__: null, detail: n })
            k(q, l, o)
          },
          Le = (e, t, n) => {
            let o
            k(
              J,
              l,
              e,
              (e) => {
                if ((k(ge, e), o)) (o.node = k(be, e)), (e = o), (o = null)
                else if (((e = k(ve, e)), we && (e = we(e, l)), e.node && (o = e))) return
                n.onHandle(e)
              },
              !0
            ),
              (n.post = (e, o, r, i) => {
                const s = n.ids ? i : r,
                  a = s && new P(t, { __proto__: null, relatedTarget: s })
                Pe(t, { cmd: e, data: o, node: !!a }), a && k(q, l, a)
              })
          }
        let Ne = 0
        const je = $()
        function Ae(e) {
          Ne += 1
          const t = Ne,
            n = {
              onclose: null,
              closed: !1,
              close() {
                Ve.post("TabClose", t)
              },
            }
          return (je[t] = n), Ve.post("TabOpen", { key: t, data: e }), n
        }
        he({
          TabClosed(e) {
            const t = je[e]
            t && ((t.closed = !0), delete je[e], null == t.onclose || t.onclose())
          },
        })
        const qe = $(),
          He = "text/html",
          Ue = "response",
          De = "responseXML",
          Je = "document",
          Fe = "raw",
          Ke = "onerror",
          We = "onload",
          Be = ["abort", "error", "load", "loadend", "loadstart", "progress", "readystatechange", "timeout"],
          ze = ["context", c],
          Xe = ["headers", "method", "overrideMimeType", "password", "timeout", "user"],
          Qe = ["application/xhtml+xml", "application/xml", "image/svg+xml", "text/xml", He],
          Ye = { __proto__: null, arraybuffer: 1, blob: 1, json: 0, [Je]: 0, text: 0, "": 0 }
        function Ze(e, t, n) {
          const { [c]: o } = e
          let r, l, i
          if (Fe in e) {
            if (
              ((r = e[Fe]),
              e[d] || ((i = r), (r = ""), k(C, i, (e) => (r += e)), (e[Fe] = [r]), (e[u] = r)),
              (o === Je && (l = He)) || (!o && n === De && k(te, Qe, (l = nt(t) || He)) >= 0) || "json" === o)
            )
              try {
                r = l ? k(fe, new S(), r, l) : ue(r)
              } catch (e) {
                r = null
              }
            if (o === Je) {
              const t = n === Ue ? De : Ue
              m(this, t, r), (e[t] = r)
            }
            o && delete e[Fe], (e[n] = r)
          } else r = e[n]
          return void 0 === r && (r = null), m(this, n, r), r
        }
        function et(t, n, o) {
          let r,
            { data: l, url: i, [c]: s = "" } = t
          if (i || "url" in t) {
            if (!g(i)) {
              if (i === location) i = i.href
              else
                try {
                  i = k(le, i)
                } catch (e) {
                  try {
                    i = `${i}`
                  } catch (e) {
                    r = e
                  }
                }
              t.url = i
            }
          } else r = new E('Required parameter "url" is missing.')
          if (r) return void tt(t, r)
          s in Ye || (de.warn(`Unknown ${c} "${s}"`), (s = ""))
          const a = n.id,
            u = M("VMxhr"),
            p = $(),
            h = v({ cb: p, id: u, scriptId: a }, t, ze),
            { withCredentials: y = !0, anonymous: b = !y } = t,
            w = n.async
              ? new A((e, n) => {
                  const { [We]: o, [Ke]: r } = t
                  ;(t[We] = o
                    ? (t) => {
                        e(t), o(t)
                      }
                    : e),
                    (t[Ke] = r
                      ? (e) => {
                          n(e), r(e)
                        }
                      : n)
                })
              : {}
          return (
            (qe[u] = h),
            (l = (null == l && []) || ((t.binary || !f(l)) && [`${l}`]) || ot(l) || (e >= 56 && [l]) || [l, "bin"]),
            Ve.call(
              "HttpRequest",
              v(
                {
                  anonymous: b,
                  data: l,
                  id: u,
                  scriptId: a,
                  url: i,
                  fileName: o,
                  [c]: s,
                  [d]: (h[d] = Ye[s] ? s : ""),
                  events: k(ee, Be, (e) => _((p[e] = t[`on${e}`]))),
                },
                t,
                Xe
              )
            ),
            m(w, "abort", () => Ve.post("AbortRequest", u)),
            w
          )
        }
        function tt({ [Ke]: e }, t) {
          if (!_(e)) throw t
          e(t)
        }
        function nt(e) {
          const t = e.contentType || "",
            n = t.length
          let o,
            r = 0
          for (; r < n && "," !== (o = t[r]) && ";" !== o && o > " "; ) r += 1
          return k(oe, t, 0, r)
        }
        function ot(e) {
          try {
            return [[...k(se, e)], "fd"]
          } catch (e) {}
          try {
            return [k(me, e), "usp"]
          } catch (e) {}
        }
        he({
          HttpRequested(e) {
            const t = qe[e.id]
            if (!t) return
            const { type: n } = e,
              o = t.cb[n]
            if (("loadend" === n && delete qe[t.id], !o)) return
            if (ae(e, "error")) return void o(new E(e.error))
            const { data: r } = e,
              { [Ue]: l, [a]: i } = r
            let s = t[Fe]
            if (null != l)
              if (t[d]) t[Fe] = l
              else if ((s || (s = t[Fe] = []), g(l))) G(s, l)
              else
                for (let e = 0; e < l.length; e++) {
                  const t = l[e]
                  G(s, t)
                }
            t[d]
              ? m(r, u, null)
              : !s || s.length <= 1
                ? m(r, u, (s && s[0]) || "")
                : s.length && m(r, u, T(Ze, r, t, e, u), !0, "get"),
              null != i && (t[a] = i),
              m(r, "context", t.context),
              m(r, a, t[a]),
              m(r, De, T(Ze, r, t, e, De), !0, "get"),
              m(r, Ue, T(Ze, r, t, e, Ue), !0, "get"),
              o(r)
          },
        })
        const rt = $()
        he({
          NotificationClicked(e) {
            var t
            null == (t = rt[e]) || null == t.onclick || t.onclick()
          },
          NotificationClosed(e) {
            const t = rt[e]
            t && (delete rt[e], null == t.ondone || t.ondone())
          },
        })
        const lt = $(),
          it = { __proto__: null, o: ue, n: (e) => +e, b: (e) => "true" === e }
        function st(e) {
          return Re[e]
        }
        function at(e, t, n, o, r, l) {
          let i
          if (o !== r) {
            var s
            i = Ve[l.async ? "send" : "post"]("UpdateValue", { id: e, key: t, raw: o })
            const a = null == (s = lt[e]) ? void 0 : s[t]
            a && _t(a, t, n, o, r)
          } else l.async && (i = w())
          return i
        }
        function ut(e) {
          const t = e[0],
            n = it[t]
          let o = k(oe, e, 1)
          try {
            n && (o = n(o))
          } catch (e) {}
          return o
        }
        function ct(e, t) {
          k(C, Q(t), (n) => {
            const o = t[n]
            o ? (e[n] = o) : delete e[n]
          })
        }
        function dt(e, t, n) {
          k(C, Q(n), (o) => {
            const r = n[o] || void 0,
              l = t[o]
            if (l !== r) {
              r ? (t[o] = r) : delete t[o]
              const n = e[o]
              n && _t(n, o, void 0, r, l, !0)
            }
          })
        }
        function _t(e, t, n, o, r, l = !1) {
          const i = r ? ut(r) : void 0,
            s = void 0 === n && o ? ut(o) : n
          k(C, Y(e), (e) => {
            try {
              e(t, i, s, l)
            } catch (e) {
              x("error", ["GM_addValueChangeListener", "callback"], e)
            }
          })
        }
        he({
          UpdatedValues(e) {
            k(C, Q(e), (t) => {
              const n = Re[t]
              if (n) {
                const o = e[t],
                  r = lt[t]
                r ? dt(r, n, o) : ct(n, o)
              }
            })
          },
        })
        const ft = j.isConcatSpreadable,
          pt = (...e) => {
            const t = []
            return m(t, ft, !0), k(C, e, (e) => m(e, ft, !0)), V(Z, t, e)
          },
          gt = (e, t) => {
            let n
            if (null === e) n = "null"
            else if ("object" == typeof e) {
              if (t) {
                if (k(te, t, e) >= 0) throw new E("Converting circular structure to JSON")
                m(t, t.length, e)
              } else t = [e]
              if (ie(e)) {
                n = "["
                for (let r = 0, l = e.length; r < l; r += 1) {
                  var o
                  n += `${r ? "," : ""}${null != (o = gt(e[r], t)) ? o : "null"}`
                }
                n += "]"
              } else
                (n = "{"),
                  k(C, Q(e), (o) => {
                    const r = gt(e[o], t)
                    void 0 !== r && (n += `${n.length > 1 ? "," : ""}${ce(o)}:${r}`)
                  }),
                  (n += "}")
              t.length -= 1
            } else void 0 !== e && (n = ce(e))
            return n
          },
          ht = (e = $()) => {
            return {
              clone() {
                const t = $()
                for (const n in e) t[n] = y(e[n])
                return ht(t)
              },
              delete: (e) => {
                var n
                return null == (n = t(e)) || delete n[e]
              },
              get: (e) => {
                var n
                return null == (n = t(e)) ? void 0 : n[e]
              },
              set: (e, n) => (t(e, !0)[e] = n),
              toArray: () => {
                const t = Y(e)
                return (
                  k(C, t, (e, n) => {
                    t[n] = Q(e)
                  }),
                  V(pt, null, t)
                )
              },
            }
            function t(t, n) {
              const o = t.length ? t[0] : ""
              return e[o] || (n ? (e[o] = $()) : null)
            }
          },
          mt = (e, t) => {
            for (let n = 0, o = Q(t); n < o.length; n++) {
              const r = o[n]
              m(e, r, t[r])
            }
            return e
          },
          yt = (e, t) => (e.async ? w(t) : t),
          vt = {
            bound: {
              __proto__: null,
              GM_deleteValue(e) {
                const { id: t } = this,
                  n = st(t),
                  o = n[e]
                return delete n[e], at(t, e, void 0, null, o, this)
              },
              GM_getValue(e, t) {
                const n = st(this.id)[e]
                return yt(this, n ? ut(n) : t)
              },
              GM_listValues() {
                return yt(this, Q(st(this.id)))
              },
              GM_setValue(e, t) {
                const { id: n } = this,
                  o = Ie(t, gt) || null,
                  r = st(n),
                  l = r[e]
                return (r[e] = o), at(n, e, t, o, l, this)
              },
              GM_addValueChangeListener(e, t) {
                if ((g(e) || (e = `${e}`), !_(t))) return
                const n = b(lt, this.id, e),
                  o = k(te, Y(n), t)
                let r = o >= 0 && Q(n)[o]
                return r || ((r = M("VMvc")), (n[r] = t)), r
              },
              GM_removeValueChangeListener(e) {
                const t = lt[this.id]
                if (t) {
                  for (const n in t) {
                    const o = t[n]
                    if (e in o) {
                      delete o[e], Se(o) && delete t[n]
                      break
                    }
                  }
                  Se(t) && delete lt[this.id]
                }
              },
              GM_getResourceText(e) {
                return xt(this, e)
              },
              GM_getResourceURL: bt,
              GM_registerMenuCommand(e, t, n) {
                if ((((n = y(n)).text = e = `${e}`), !e)) throw new E("Menu caption text is required!")
                const { id: o } = this,
                  r = n.id || e,
                  l = b(Te, o, r)
                return (l.cb = t), (l.text = e), Ve.post("RegisterMenu", { id: o, key: r, val: n }), r
              },
              GM_unregisterMenuCommand(e) {
                const { id: t } = this,
                  n = Te[t]
                n && (n[e] || (e = Gt(e, n))) && (delete n[e], Ve.post("UnregisterMenu", { id: t, key: e }))
              },
              GM_download(e, t) {
                if (
                  (g(e) ? (e = { url: e, name: t, __proto__: null }) : e && (t = (e = y(e)).name),
                  !(t ? !g(t) && (t = "not a string") : (t = "missing")))
                )
                  return (
                    K(e, { [c]: "blob", data: null, method: "GET", overrideMimeType: "application/octet-stream" }),
                    et(e, this, t)
                  )
                tt(e, new E(`Required parameter "name" is ${t}.`))
              },
              GM_notification: function (e, t, n, o) {
                var r
                let l, i
                if (
                  (f(e)
                    ? ((l = y(e)), (e = l.text), (i = l.tag))
                    : ((l = $()), (l.text = e), (l.title = t), (l.image = n), (l.onclick = o)),
                  !e)
                )
                  throw new E("Notification `text` is required!")
                const s = `${this.id}:${(l.tag = null != (r = i) ? r : M())}`,
                  a = $()
                for (const e in l) a[e] = !!_(l[e]) || l[e]
                return (
                  (a.id = s),
                  (rt[s] = l),
                  Ve.post("Notification", a),
                  { remove: () => Ve.send("RemoveNotification", s) }
                )
              },
              GM_xmlhttpRequest: wt,
            },
            free: {
              __proto__: null,
              GM_addElement: (e, t, n) => (g(e) ? Mt(null, e, t) : Mt(e, t, n)),
              GM_addStyle: (e) => Mt(null, "style", { textContent: e, id: M("VMst") }),
              GM_openInTab: (e, t) => (((t = y(f(t) ? t : { active: !t })).url = e), Ae(t)),
              GM_setClipboard(e, t) {
                Ve.post("SetClipboard", { data: e, type: t })
              },
              GM_log: de.log,
            },
          }
        function bt(e, t) {
          return xt(this, e, !!t, void 0 === t)
        }
        function wt(e) {
          return et(y(e), this)
        }
        function Mt(e, t, n) {
          let o, r
          if (
            (Ve.call(
              "AddElement",
              { tag: t, attrs: n },
              e,
              function (e) {
                ;(o = this), (r = e)
              },
              "cbId"
            ),
            r)
          ) {
            const e = new E(r[0])
            throw ((e.stack += `\n${r[1]}`), e)
          }
          return m(o, "then", async (e) => delete o.then && (_(e) ? e(o) : o))
        }
        function xt(e, t, n, o) {
          let r
          const { id: l, resCache: i, resources: s } = e,
            a = s[t]
          if (a) {
            const e = "data:" === k(oe, a, 0, 5),
              t = null == n ? 0 : 1 + (n = o ? !e : n)
            ;(r = (e && !1 === n) || b(i, t, a, !1)),
              r || ((r = Ve.call("GetResource", { id: l, isBlob: n, key: a, raw: e && a })), b(i, t, a, r))
          }
          return yt(e, !0 === r ? a : r)
        }
        function Gt(e, t) {
          for (const n in t) if (t[n].text === e) return n
        }
        const kt = "console",
          $t = j.unscopables,
          Ct = $(),
          Vt = $(),
          Tt = ht(),
          Rt = (() => {
            const n = "wrappedJSObject",
              o = !t,
              i = re[0],
              s = k(H, l)
            let a,
              u,
              c = !e
            for (let e = 0; e < i.length; e++) {
              const t = i[e]
              ;(+t >= 0 && t < s) || (o && ("**VMInitInjection**" === t || "browser" === t || "chrome" === t))
                ? (c = !1)
                : (Tt.set(t, 1),
                  t >= "a" &&
                    t <= "z" &&
                    (t.length < 3 || "o" !== t[0] || "n" !== t[1]) &&
                    (a = B(l, t)) &&
                    (X(a, null),
                    ((a.enumerable && _(a.value) ? Vt : Ct)[t] = a),
                    t === kt && f((u = a.value)) && (a.value = y(u))))
            }
            return (
              r !== l &&
                k(C, re[1], (e) => {
                  ;(+e >= 0 && e < s) || (Tt.set(e, -1), (c = !1))
                }),
              e && !t && n in r && !Tt.get(n) && (Tt.set(n, 1), c && m(i, i.length, n)),
              c ? i : Tt.toArray()
            )
          })(),
          St = $(),
          Et = (e) => {
            let t
            const n = Vt[e],
              o = n || St[e] || ((t = Tt.get(e)) && B((t = t > 0 ? l : r), e))
            if (o) {
              if ((n || X(o, null), n)) {
                const n = T(o.value, t === r ? r : l)
                ;(o.value = W(n, "name", { __proto__: null, value: e })), (Vt[e] = void 0), (Ct[e] = o)
              } else (+e >= 0 && e < k(H, l)) || (Ct[e] = o)
              return o
            }
          }
        function It(e) {
          let t = Tt
          m(e, F, () => "Window", !1, "get")
          const n = $(),
            o = new N(e, {
              __proto__: null,
              defineProperty(t, n, o) {
                if (n in e || !(t = Ct[n] || Et(n)) || t.configurable) return W(e, n, o)
              },
              deleteProperty: (n, o) => (
                (n = delete e[o]) &&
                  (n = Ct[o] || Et(o)) &&
                  (n = n.configurable) &&
                  (t === Tt && (t = Tt.clone()), t.delete(o)),
                !!n
              ),
              get: (t, r) => {
                if ("undefined" !== r && r !== $t) return void 0 !== (t = e[r]) || r in e ? t : Pt(e, r, o, n) && e[r]
              },
              getOwnPropertyDescriptor: (t, r) => B(e, r) || Pt(e, r, o, n),
              has: (t, n) => n in Ct || n in e || Et(n),
              ownKeys: () => Ot(e, t),
              preventExtensions() {},
              set: (t, r, l) => (r in e || Pt(e, r, o, n), (e[r] = l), !0),
            })
          return o
        }
        function Ot(e, t) {
          const n = [],
            o = k(H, l)
          for (let t, r = 0; r < o && h(l, (t = `${r}`)); r += 1) t in e || G(n, t)
          return pt(n, t === Tt ? Rt : t.toArray(), k(ee, pe(e), Nt, t.get))
        }
        function Pt(e, t, n, o) {
          let r = Ct[t] || Et(t)
          if (!r) return
          const { get: i, set: s, value: a } = r
          return (
            a === l ||
            "window" === t ||
            "self" === t ||
            "globalThis" === t ||
            ("top" === t && l === top) ||
            ("parent" === t && l === k(U, l))
              ? ((r.value = n), delete r.get, delete r.set)
              : i && s && "string" == typeof t && t.length >= 3 && "o" === t[0] && "n" === t[1]
                ? Lt(r, t, o, n)
                : (i && (r.get = T(i, l)), s && (r.set = T(s, l)), a && t === kt && (r.value = mt({}, a))),
            W(e, t, r),
            r
          )
        }
        function Lt(n, o, r, i) {
          ;(o = k(oe, o, 2)),
            (n.get = () => r[o] || null),
            (n.set = (n) => {
              k(D, l, o, r[o]), _(n) ? k(J, l, o, (r[o] = e && t ? (e) => k(n, i, e) : T(n, i))) : delete r[o]
            })
        }
        function Nt(e) {
          return !this(e)
        }
        k(C, [I, L], (e) => {
          e = e[p]
          for (let t = 0, n = pe(e); t < n.length; t++) {
            const o = n[t],
              r = B(e, o)
            X(r, null), ((_(r.value) ? Vt : St)[o] = r)
          }
        }),
          (re = null)
        const jt = { __proto__: null, getResourceUrl: bt, xmlHttpRequest: wt },
          At = { __proto__: null, download: 1, getValue: 1, deleteValue: 1, setValue: 1, listValues: 1 },
          qt = (() => {
            const n = "createObjectIn",
              o = "exportFunction",
              l = e && !t && r,
              i = !l && ((e, t, n) => (t && (t = h(t, "defineAs")) && m(e, t, n), n))
            return {
              cloneInto: we || ((e) => e),
              [n]: (l && l[n]) || ((e, t) => i(e, t, {})),
              [o]: (l && l[o]) || ((e, t, n) => i(t, n, e)),
            }
          })(),
          Ht = () => Ve.post("TabClose"),
          Ut = () => Ve.post("TabFocus")
        function Dt(e) {
          const { id: t, meta: n } = e,
            { grant: o } = n,
            l = X(n.resources, null),
            i = { __proto__: null, id: t, script: e, resources: l, resCache: $() },
            s = Jt(e.gmi, n, l),
            a = { __proto__: null, info: s },
            u = { __proto__: null, GM: a, GM_info: s, unsafeWindow: r }
          let c,
            d,
            _ = o.length
          1 === _ && "none" === o[0] && (_ = 0), K(u, qt)
          for (let e = 0; e < o.length; e++) {
            let t,
              n,
              r,
              l,
              s = o[e]
            ;("GM." === k(oe, s, 0, 3) && (l = k(oe, s, 3)) && (n = jt[l])) || (t = vt.bound[(r = l ? `GM_${l}` : s)])
              ? (t = T(n || t, n || l in At ? c || (c = K($(), { async: !0 }, i)) : i))
              : !(t = vt.free[r]) &&
                (t = ("window.close" === s && Ht) || ("window.focus" === s && Ut)) &&
                (s = k(oe, s, 7)),
              t && (l ? (a[l] = t) : (u[s] = t))
          }
          return _ && ((d = It(u)), (u.c = u)), { gm: u, wrapper: d }
        }
        function Jt(e, t, n) {
          const o = Q(n)
          return (
            k(C, o, (e, t) => {
              o[t] = { name: e, url: n[e] }
            }),
            (t.resources = o),
            mt(e, Ve.gmi),
            mt(e, { injectInto: Ve.mode, platform: mt({}, Ve.ua), script: t, scriptHandler: i, version: "2.18.3" })
          )
        }
        const Ft = $()
        function Kt(n, o) {
          if (!t)
            return (
              (Ve.mode = s),
              (Ve.post = (e, t, o) => {
                n({ cmd: e, data: t, node: o }, s)
              }),
              (r.chrome = void 0),
              (r.browser = void 0),
              (de = o),
              (e, t, n, o) => {
                Ve.onHandle({ cmd: e, data: t, node: o })
              }
            )
          if (
            (k(
              J,
              l,
              t + "*",
              (e) => {
                ;(e = k(ve, e)), Le(e[0], e[1], Ve)
              },
              { __proto__: null, once: !0, capture: !0 }
            ),
            k(q, l, new R(t)),
            (Ve.mode = "page"),
            he({
              WriteVault(e) {
                this[e] = Me
              },
            }),
            !e)
          ) {
            for (let e = 0; e < Oe.length; e++) {
              const t = Oe[e]
              de[t] = (...e) => Ve.post("Log", [t, e])
            }
            vt.bound.GM_log = function (...e) {
              Ve.post("Log", ["log", pt([`[${this.script.displayName}]`], e)])
            }
          }
        }
        function Wt(e) {
          const t = Ft[e.name],
            n = k(ye, document),
            { gm: o, wrapper: i = r } = Dt(t)
          delete l[t.key.win], n && k(ne, n), Ve.post("Run", t.id), k(e, i, o, de.error)
        }
        he({
          Command({ id: e, key: t, evt: n }) {
            var o
            null == (o = Te[e]) || null == (o = o[t]) || o.cb(new (n.key ? O : P)(n.type, n))
          },
          Callback({ id: e, data: t }) {
            const n = Ve.callbacks[e]
            delete Ve.callbacks[e], n && k(n, this, t)
          },
          async Plant({ data: e, win: t }) {
            m(l, t, Wt, !0, "set"), await 0, delete Ft[e], delete l[t]
          },
          ScriptData({ info: n, items: o }) {
            n && K(Ve, n)
            const r = []
            for (let e = 0; e < o.length; e++) {
              const n = o[e],
                { key: i } = n
              if (((Ft[i.data] = n), (Re[n.id] = X(n.values || {}, null)), !t)) {
                const e = i.win,
                  t = l[e]
                t ? (G(r, t), delete l[e]) : W(l, e, { __proto__: null, configurable: !0, set: Wt })
              }
            }
            t ? e && Ve.post("InjectList", o[0].runAt) : k(C, r, Wt)
          },
          Expose(e) {
            const t = "external",
              n = l[t]
            ;(f(n) ? n : (l[t] = {}))[i] = {
              version: "2.18.3",
              isInstalled: (t, n) => (e ? Ve.send("GetScriptVer", { meta: { name: t, namespace: n } }) : w()),
            }
          },
        }),
          (o.exports = z)
      })()
      const { exports: xe } = o
      return xe.__esModule ? xe.default : xe
    })
}
