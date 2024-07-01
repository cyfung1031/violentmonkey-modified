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
        f = (e) => "function" == typeof e,
        p = (e) => null != e && "object" == typeof e,
        _ = "prototype",
        g = (e) => "string" == typeof e,
        h = (e, t, n) => {
          try {
            e && ae(e, t) && (n = e[t])
          } catch (e) {}
          return n
        },
        m = (e, t, n, o = !0, r) =>
          W(e, t, { __proto__: null, [r || "value"]: n, [!r && "writable"]: o, configurable: o, enumerable: o }),
        y = (e) => K(C(), e),
        v = (e, t, n) => (
          X(e, null),
          t &&
            $(V, n, (n) => {
              ae(t, n) && (e[n] = t[n])
            }),
          e
        ),
        w = (e, t, n, o) => {
          var r
          const l = e[t] || (e[t] = C())
          return null != (r = l[n]) ? r : (l[n] = null != o ? o : C())
        },
        b = async (e) => e,
        M = (e = "VM") => e + fe(),
        x = (e, ...t) => {
          let n = `[${i}]`
          t[0] &&
            $(V, t[0], (e) => {
              n += `[${e}]`
            }),
            (t[0] = n),
            k(de[e], de, t)
        },
        G = (e, t) => m(e, e.length, t)
      let $,
        C,
        V,
        k,
        T,
        R,
        S,
        E,
        O,
        I,
        P,
        N,
        L,
        j,
        A,
        q,
        D,
        H,
        U,
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
        fe,
        pe,
        _e,
        ge,
        he,
        me,
        ye,
        ve,
        we
      const be = t ? null : r.cloneInto,
        Me = (() => {
          let t,
            o,
            i,
            s,
            a,
            u,
            c,
            d = -1,
            p = r,
            g = l
          return (
            n && ((u = l[n]), delete l[n]),
            u && !f(u[0]) && ((p = u[0]), (g = p), (c = e && u[1]), (u = !1)),
            u || (u = { __proto__: null }),
            (u = [
              (R = u[(d += 1)] || p.CustomEvent),
              (S = u[(d += 1)] || p.DOMParser),
              (E = u[(d += 1)] || p.Error),
              (O = u[(d += 1)] || p.EventTarget),
              (I = u[(d += 1)] || p.KeyboardEvent),
              (P = u[(d += 1)] || p.MouseEvent),
              (N = u[(d += 1)] || p.Object),
              (j = u[(d += 1)] || p.Symbol),
              (L = u[(d += 1)] || p.Proxy),
              (q = u[(d += 1)] || p.dispatchEvent),
              (U = u[(d += 1)] || p.removeEventListener),
              (J = u[(d += 1)] || p.addEventListener),
              (W = ((i = N) && u[(d += 1)]) || i.defineProperty),
              (B = u[(d += 1)] || i.getOwnPropertyDescriptor),
              (a = u[(d += 1)] || i.getOwnPropertyNames),
              (z = u[(d += 1)] || i.getPrototypeOf),
              (X = u[(d += 1)] || i.setPrototypeOf),
              (K = u[(d += 1)] || i.assign),
              (Q = u[(d += 1)] || i.keys),
              (Y = u[(d += 1)] || i.values),
              (Z = u[(d += 1)] || (t = p.Array[_]).concat),
              (ee = u[(d += 1)] || t.filter),
              (V = u[(d += 1)] || t.forEach),
              (te = u[(d += 1)] || t.indexOf),
              (ne = u[(d += 1)] || p.Element[_].remove),
              (oe = u[(d += 1)] || p.String[_].slice),
              (k = u[(d += 1)] || (o = p.Reflect).apply),
              ($ = u[(d += 1)] || (s = i.call).bind(s)),
              (T = u[(d += 1)] || s.bind(i.bind)),
              (le = u[(d += 1)] || p.URL[_].toString),
              (C = u[(d += 1)] || T(i.create, i, null)),
              (se = u[(d += 1)] || p.FormData[_].entries),
              (ae = u[(d += 1)] || T(s, i[_].hasOwnProperty)),
              (ie = u[(d += 1)] || p.Array.isArray),
              (ue = u[(d += 1)] || p.JSON.parse),
              (ce = u[(d += 1)] || p.JSON.stringify),
              (de = u[(d += 1)] || y((c || p).console)),
              (fe = u[(d += 1)] || p.Math.random),
              (pe = u[(d += 1)] || S[_].parseFromString),
              (_e = u[(d += 1)] || o.ownKeys),
              (ge = u[(d += 1)] || p.Event[_].stopImmediatePropagation),
              (he = u[(d += 1)] || p.Promise[_].then),
              (me = u[(d += 1)] || p.URLSearchParams[_].toString),
              (ye = u[(d += 1)] || B(p.Document[_], "currentScript").get),
              (ve = u[(d += 1)] || B(R[_], "detail").get),
              (we = u[(d += 1)] || B(P[_], "relatedTarget").get),
              (D = u[(d += 1)] || B(g, "length").get || (() => h(l, "length", 1e9))),
              (H = u[(d += 1)] || B(g, "parent").get || (() => h(l, "parent"))),
              (re = u[(d += 1)] || [a(g), p !== g && a(p)]),
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
        n.r(z), n.d(z, { __proto__: null, default: () => Qt })
        const fe = C(),
          xe = (e) => K(fe, e),
          Ge = C(),
          $e = {
            __proto__: null,
            onHandle({ cmd: e, data: t, node: n }) {
              const o = fe[e]
              o && $(o, n, t)
            },
            send(e, t, n) {
              let o, r
              try {
                r = new A((e) => {
                  o = e
                })
              } catch (e) {}
              return Ve(e, t, n, o), r
            },
            call: Ve,
          }
        let Ce
        function Ve(e, t, n, o, r) {
          const l = M()
          if (((Ge[l] = o || ke), r ? m(t, r, l) : (t = { __CBID: l, data: t }), $e.post(e, t, n), !o)) return Ce
        }
        function ke(e) {
          Ce = e
        }
        const Te = $e,
          Re = C(),
          Se = C()
        function Ee(e) {
          for (const t in e) if (ae(e, t)) return !1
          return !0
        }
        const Oe = { __proto__: null, string: "s", number: "n", boolean: "b" }
        function Ie(e, t = JSON.stringify) {
          if (void 0 !== e) {
            const n = Oe[typeof e]
            return `${n || "o"}${n ? e : t(e)}`
          }
        }
        const Pe = ["log", "info", "warn", "error", "debug"],
          Ne = (e, t) => {
            const n = be ? be(t, document) : t,
              o = new R(e, { __proto__: null, detail: n })
            $(q, l, o)
          },
          Le = (e, t, n) => {
            let o
            $(
              J,
              l,
              e,
              (e) => {
                if (($(ge, e), o)) (o.node = $(we, e)), (e = o), (o = null)
                else {
                  try {
                    e = $(ve, e)
                  } catch (e) {
                    return
                  }
                  if (
                    (e || ((e = C()).data = `[${i}] Non-cloneable property e.g. a DOM node or function.`),
                    be && (e = be(e, l)),
                    e.node && (o = e))
                  )
                    return
                }
                n.onHandle(e)
              },
              !0
            ),
              (n.post = (e, o, r, i) => {
                const s = n.ids ? i : r,
                  a = s && new P(t, { __proto__: null, relatedTarget: s })
                Ne(t, { cmd: e, data: o, node: !!a }), a && $(q, l, a)
              })
          }
        let je = 0
        const Ae = C()
        function qe(e) {
          je += 1
          const t = je,
            n = {
              onclose: null,
              closed: !1,
              close() {
                Te.post("TabClose", t)
              },
            }
          return (Ae[t] = n), Te.post("TabOpen", { key: t, data: e }), n
        }
        xe({
          TabClosed(e) {
            const t = Ae[e]
            t && ((t.closed = !0), delete Ae[e], null == t.onclose || t.onclose())
          },
        })
        const De = C(),
          He = "text/html",
          Ue = "response",
          Je = "responseXML",
          Fe = "document",
          Ke = "raw",
          We = "onerror",
          Be = "onload",
          ze = ["abort", "error", "load", "loadend", "loadstart", "progress", "readystatechange", "timeout"],
          Xe = ["context", c],
          Qe = ["headers", "method", "overrideMimeType", "password", "timeout", "user"],
          Ye = ["application/xhtml+xml", "application/xml", "image/svg+xml", "text/xml", He],
          Ze = { __proto__: null, arraybuffer: 1, blob: 1, json: 0, [Fe]: 0, text: 0, "": 0 }
        function et(e, t, n) {
          const { [c]: o } = e
          let r, l, i
          if (Ke in e) {
            if (
              ((r = e[Ke]),
              e[d] || ((i = r), (r = ""), $(V, i, (e) => (r += e)), (e[Ke] = [r]), (e[u] = r)),
              (o === Fe && (l = He)) || (!o && n === Je && $(te, Ye, (l = ot(t) || He)) >= 0) || "json" === o)
            )
              try {
                r = l ? $(pe, new S(), r, l) : ue(r)
              } catch (e) {
                r = null
              }
            if (o === Fe) {
              const t = n === Ue ? Je : Ue
              m(this, t, r), (e[t] = r)
            }
            o && delete e[Ke], (e[n] = r)
          } else r = e[n]
          return void 0 === r && (r = null), m(this, n, r), r
        }
        function tt(t, n, o) {
          let r,
            { data: l, url: i, [c]: s = "" } = t
          if (i || "url" in t) {
            if (!g(i)) {
              if (i === location) i = i.href
              else
                try {
                  i = $(le, i)
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
          if (r) return void nt(t, r)
          s in Ze || (de.warn(`Unknown ${c} "${s}"`), (s = ""))
          const a = n.id,
            u = M("VMxhr"),
            _ = C(),
            h = v({ cb: _, id: u, scriptId: a }, t, Xe),
            { withCredentials: y = !0, anonymous: w = !y } = t,
            b = n.async
              ? new A((e, n) => {
                  const { [Be]: o, [We]: r } = t
                  ;(t[Be] = o
                    ? (t) => {
                        e(t), o(t)
                      }
                    : e),
                    (t[We] = r
                      ? (e) => {
                          n(e), r(e)
                        }
                      : n)
                })
              : {}
          return (
            (De[u] = h),
            (l = (null == l && []) || ((t.binary || !p(l)) && [`${l}`]) || rt(l) || (e >= 56 && [l]) || [l, "bin"]),
            Te.call(
              "HttpRequest",
              v(
                {
                  anonymous: w,
                  data: l,
                  id: u,
                  scriptId: a,
                  url: i,
                  fileName: o,
                  [c]: s,
                  [d]: (h[d] = Ze[s] ? s : ""),
                  events: $(ee, ze, (e) => f((_[e] = t[`on${e}`]))),
                },
                t,
                Qe
              )
            ),
            m(b, "abort", () => Te.post("AbortRequest", u)),
            b
          )
        }
        function nt({ [We]: e }, t) {
          if (!f(e)) throw t
          e(t)
        }
        function ot(e) {
          const t = e.contentType || "",
            n = t.length
          let o,
            r = 0
          for (; r < n && "," !== (o = t[r]) && ";" !== o && o > " "; ) r += 1
          return $(oe, t, 0, r)
        }
        function rt(e) {
          try {
            return [[...$(se, e)], "fd"]
          } catch (e) {}
          try {
            return [$(me, e), "usp"]
          } catch (e) {}
        }
        xe({
          HttpRequested(e) {
            const t = De[e.id]
            if (!t) return
            const { type: n } = e,
              o = t.cb[n]
            if (("loadend" === n && delete De[t.id], !o)) return
            if (ae(e, "error")) return void o(new E(e.error))
            const { data: r } = e,
              { [Ue]: l, [a]: i } = r
            let s = t[Ke]
            if (null != l)
              if (t[d]) t[Ke] = l
              else if ((s || (s = t[Ke] = []), g(l))) G(s, l)
              else
                for (let e = 0; e < l.length; e++) {
                  const t = l[e]
                  G(s, t)
                }
            t[d]
              ? m(r, u, null)
              : !s || s.length <= 1
                ? m(r, u, (s && s[0]) || "")
                : s.length && m(r, u, T(et, r, t, e, u), !0, "get"),
              null != i && (t[a] = i),
              m(r, "context", t.context),
              m(r, a, t[a]),
              m(r, Je, T(et, r, t, e, Je), !0, "get"),
              m(r, Ue, T(et, r, t, e, Ue), !0, "get"),
              o(r)
          },
        })
        const lt = C()
        xe({
          NotificationClicked(e) {
            var t
            null == (t = lt[e]) || null == t.onclick || t.onclick()
          },
          NotificationClosed(e) {
            const t = lt[e]
            t && (delete lt[e], null == t.ondone || t.ondone())
          },
        })
        const it = j.isConcatSpreadable,
          st = (...e) => {
            const t = []
            return m(t, it, !0), $(V, e, (e) => m(e, it, !0)), k(Z, t, e)
          },
          at = (e, t) => {
            let n
            if (null === e) n = "null"
            else if ("object" == typeof e) {
              if (t) {
                if ($(te, t, e) >= 0) throw new E("Converting circular structure to JSON")
                m(t, t.length, e)
              } else t = [e]
              if (ie(e)) {
                n = "["
                for (let r = 0, l = e.length; r < l; r += 1) {
                  var o
                  n += `${r ? "," : ""}${null != (o = at(e[r], t)) ? o : "null"}`
                }
                n += "]"
              } else
                (n = "{"),
                  $(V, Q(e), (o) => {
                    const r = at(e[o], t)
                    void 0 !== r && (n += `${n.length > 1 ? "," : ""}${ce(o)}:${r}`)
                  }),
                  (n += "}")
              t.length -= 1
            } else void 0 !== e && (n = ce(e))
            return n
          },
          ut = (e = C()) => {
            return {
              clone() {
                const t = C()
                for (const n in e) t[n] = y(e[n])
                return ut(t)
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
                  $(V, t, (e, n) => {
                    t[n] = Q(e)
                  }),
                  k(st, null, t)
                )
              },
            }
            function t(t, n) {
              const o = t.length ? t[0] : ""
              return e[o] || (n ? (e[o] = C()) : null)
            }
          },
          ct = (e, t) => {
            for (let n = 0, o = Q(t); n < o.length; n++) {
              const r = o[n]
              m(e, r, t[r])
            }
            return e
          },
          dt = C(),
          ft = { __proto__: null, o: ue, n: (e) => +e, b: (e) => "true" === e }
        let pt,
          _t,
          gt = C()
        function ht(e, t, n) {
          let o
          const { id: r, async: l } = e,
            i = Se[r],
            s = dt[r]
          for (let e = 0, l = t ? Q(n) : n; e < l.length; e++) {
            const a = l[e]
            let u, c, d, f
            t ? ((u = n[a]), (c = Ie(u, at) || null)) : (c = null),
              (d = i[a]),
              t ? (i[a] = c) : delete i[a],
              c !== d &&
                (((o || (o = gt[r] || (gt[r] = C())))[a] = c), (f = null == s ? void 0 : s[a]) && wt(f, a, u, c, d))
          }
          if ((o && ((o = _t || (_t = $(he, b(), bt))), l && (pt = !0)), l)) return o || b()
        }
        function mt(e) {
          const t = e[0],
            n = ft[t]
          let o = $(oe, e, 1)
          try {
            n && (o = n(o))
          } catch (e) {}
          return o
        }
        function yt(e, t) {
          $(V, Q(t), (n) => {
            const o = t[n]
            o ? (e[n] = o) : delete e[n]
          })
        }
        function vt(e, t, n) {
          $(V, Q(n), (o) => {
            const r = n[o] || void 0,
              l = t[o]
            if (l !== r) {
              r ? (t[o] = r) : delete t[o]
              const n = e[o]
              n && wt(n, o, void 0, r, l, !0)
            }
          })
        }
        function wt(e, t, n, o, r, l = !1) {
          const i = r ? mt(r) : void 0,
            s = void 0 === n && o ? mt(o) : n
          $(V, Y(e), (e) => {
            try {
              e(t, i, s, l)
            } catch (e) {
              x("error", ["GM_addValueChangeListener", "callback"], e)
            }
          })
        }
        function bt() {
          const e = Te[pt ? "send" : "post"]("UpdateValue", gt)
          return (gt = C()), (_t = pt = !1), e
        }
        xe({
          UpdatedValues(e) {
            $(V, Q(e), (t) => {
              const n = Se[t]
              if (n) {
                const o = e[t],
                  r = dt[t]
                r ? vt(r, n, o) : yt(n, o)
              }
            })
          },
        })
        const Mt = (e, t) => (e.async ? b(t) : t),
          xt = C(),
          Gt = {
            __proto__: null,
            GM_deleteValue(e) {
              return ht(this, !1, [e])
            },
            GM_deleteValues(e) {
              return ht(this, !1, e)
            },
            GM_getValue(e, t) {
              const n = Se[this.id][e]
              return Mt(this, n ? mt(n) : t)
            },
            GM_getValues(e) {
              const t = {},
                n = ie(e),
                o = Se[this.id]
              for (let r = 0, l = n ? e : Q(e); r < l.length; r++) {
                const i = l[r],
                  s = o[i]
                s ? m(t, i, mt(s)) : n || m(t, i, e[i])
              }
              return Mt(this, t)
            },
            GM_listValues() {
              return Mt(this, Q(Se[this.id]))
            },
            GM_setValue(e, t) {
              return ht(this, !0, { [e]: t })
            },
            GM_setValues(e) {
              return ht(this, !0, e)
            },
            GM_download(e, t) {
              if (
                (g(e) ? (e = { url: e, name: t, __proto__: null }) : e && (t = (e = y(e)).name),
                !(t ? !g(t) && (t = "not a string") : (t = "missing")))
              )
                return (
                  K(e, { [c]: "blob", data: null, method: "GET", overrideMimeType: "application/octet-stream" }),
                  tt(e, this, t)
                )
              nt(e, new E(`Required parameter "name" is ${t}.`))
            },
          },
          $t = {
            __proto__: null,
            GM_addValueChangeListener(e, t) {
              if ((g(e) || (e = `${e}`), !f(t))) return
              const n = w(dt, this.id, e),
                o = $(te, Y(n), t)
              let r = o >= 0 && Q(n)[o]
              return r || ((r = M("VMvc")), (n[r] = t)), r
            },
            GM_removeValueChangeListener(e) {
              const t = dt[this.id]
              if (t) {
                for (const n in t) {
                  const o = t[n]
                  if (e in o) {
                    delete o[e], Ee(o) && delete t[n]
                    break
                  }
                }
                Ee(t) && delete dt[this.id]
              }
            },
            GM_getResourceText(e) {
              return kt(this, e)
            },
            GM_getResourceURL: (xt.getResourceUrl = function (e, t) {
              return kt(this, e, !!t, void 0 === t)
            }),
            GM_registerMenuCommand(e, t, n) {
              if ((((n = y(n)).text = e = `${e}`), !e)) throw new E("Menu caption text is required!")
              const { id: o } = this,
                r = n.id || e,
                l = w(Re, o, r)
              return (l.cb = t), (l.text = e), Te.post("RegisterMenu", { id: o, key: r, val: n }), r
            },
            GM_unregisterMenuCommand(e) {
              const { id: t } = this,
                n = Re[t]
              n && (n[e] || (e = Tt(e, n))) && (delete n[e], Te.post("UnregisterMenu", { id: t, key: e }))
            },
            GM_notification: function (e, t, n, o) {
              var r
              let l, i
              if (
                (p(e)
                  ? ((l = y(e)), (e = l.text), (i = l.tag))
                  : ((l = C()), (l.text = e), (l.title = t), (l.image = n), (l.onclick = o)),
                !e)
              )
                throw new E("Notification `text` is required!")
              const s = `${this.id}:${(l.tag = null != (r = i) ? r : M())}`,
                a = C()
              for (const e in l) a[e] = !!f(l[e]) || l[e]
              return (
                (a.id = s), (lt[s] = l), Te.post("Notification", a), { remove: () => Te.send("RemoveNotification", s) }
              )
            },
            GM_xmlhttpRequest: (xt.xmlHttpRequest = function (e) {
              return tt(y(e), this)
            }),
          },
          Ct = {
            __proto__: null,
            GM_addElement: (e, t, n) => (g(e) ? Vt(null, e, t) : Vt(e, t, n)),
            GM_addStyle: (e) => Vt(null, "style", { textContent: e, id: M("VMst") }),
            GM_openInTab: (e, t) => (((t = y(p(t) ? t : { active: !t })).url = e), qe(t)),
            GM_setClipboard(e, t) {
              Te.post("SetClipboard", { data: e, type: t })
            },
            GM_log: de.log,
          }
        function Vt(e, t, n) {
          let o, r
          if (
            (Te.call(
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
          return m(o, "then", async (e) => delete o.then && (f(e) ? e(o) : o))
        }
        function kt(e, t, n, o) {
          let r
          const { id: l, resCache: i, resources: s } = e,
            a = s[t]
          if (a) {
            const e = "data:" === $(oe, a, 0, 5),
              t = null == n ? 0 : 1 + (n = o ? !e : n)
            ;(r = (e && !1 === n) || w(i, t, a, !1)),
              r || ((r = Te.call("GetResource", { id: l, isBlob: n, key: a, raw: e && a })), w(i, t, a, r))
          }
          return Mt(e, !0 === r ? a : r)
        }
        function Tt(e, t) {
          for (const n in t) if (t[n].text === e) return n
        }
        const Rt = "console",
          St = j.unscopables,
          Et = C(),
          Ot = C(),
          It = ut(),
          Pt = (() => {
            const n = "wrappedJSObject",
              o = !t,
              i = re[0],
              s = $(D, l)
            let a,
              u,
              c = !e
            for (let e = 0; e < i.length; e++) {
              const t = i[e]
              ;(+t >= 0 && t < s) || (o && ("**VMInitInjection**" === t || "browser" === t || "chrome" === t))
                ? (c = !1)
                : (It.set(t, 1),
                  t >= "a" &&
                    t <= "z" &&
                    (t.length < 3 || "o" !== t[0] || "n" !== t[1]) &&
                    (a = B(l, t)) &&
                    (X(a, null),
                    ((a.enumerable && f(a.value) ? Ot : Et)[t] = a),
                    t === Rt && p((u = a.value)) && (a.value = y(u))))
            }
            return (
              r !== l &&
                $(V, re[1], (e) => {
                  ;(+e >= 0 && e < s) || (It.set(e, -1), (c = !1))
                }),
              e && !t && n in r && !It.get(n) && (It.set(n, 1), c && m(i, i.length, n)),
              c ? i : It.toArray()
            )
          })(),
          Nt = C(),
          Lt = (e) => g(e) && (e = +e) >= 0 && e === (0 | e) && e < $(D, l),
          jt = (e) => {
            let t, n
            const o = Ot[e],
              i = o || Nt[e] || ((t = It.get(e) || (n = Lt(e))) && B((t = t > 0 ? l : r), e))
            if (i) {
              if ((o || X(i, null), o)) {
                const n = T(i.value, t === r ? r : l)
                ;(i.value = W(n, "name", { __proto__: null, value: e })), (Ot[e] = void 0), (Et[e] = i)
              } else n || (Et[e] = i)
              return i
            }
          }
        function At(e) {
          let t = It
          m(e, F, () => "Window", !1, "get")
          const n = C(),
            o = new L(e, {
              __proto__: null,
              defineProperty(t, n, o) {
                if (n in e || !(t = Et[n] || jt(n)) || t.configurable) return W(e, n, o)
              },
              deleteProperty: (n, o) => (
                (n = delete e[o]) &&
                  (n = Et[o] || jt(o)) &&
                  (n = n.configurable) &&
                  (t === It && (t = It.clone()), t.delete(o)),
                !!n
              ),
              get: (t, r) => {
                if ("undefined" !== r && r !== St) return void 0 !== (t = e[r]) || r in e ? t : Dt(e, r, o, n, !0)
              },
              getOwnPropertyDescriptor: (t, r) => B(e, r) || Dt(e, r, o, n),
              has: (t, n) => n in Et || n in e || jt(n),
              ownKeys: () => qt(e, t),
              preventExtensions() {},
              set: (t, r, l) => (r in e || Dt(e, r, o, n), (e[r] = l), !0),
            })
          return o
        }
        function qt(e, t) {
          const n = [],
            o = $(D, l)
          for (let t, r = 0; r < o && h(l, (t = `${r}`)); r += 1) t in e || G(n, t)
          return st(n, t === It ? Pt : t.toArray(), $(ee, _e(e), Ut, t.get))
        }
        function Dt(e, t, n, o, i) {
          let s,
            a = (s = Et[t]) || jt(t)
          if (!a) return
          let { get: u, set: c, value: d } = a
          const f = !s && Lt(t)
          return (
            d === l ||
            "window" === t ||
            "self" === t ||
            "globalThis" === t ||
            ("top" === t && l === top) ||
            ("parent" === t && l === $(H, l))
              ? ((d = a.value = n), (u = !1), delete a.get, delete a.set)
              : u && c && g(t) && t.length >= 3 && "o" === t[0] && "n" === t[1]
                ? Ht(a, t, o, n)
                : (u && (a.get = T(u, l)), c && (a.set = T(c, l)), d && t === Rt && (a.value = d = ct({}, d))),
            f || W(e, t, a),
            i ? (u ? (f ? r[t] : e[t]) : d) : a
          )
        }
        function Ht(n, o, r, i) {
          ;(o = $(oe, o, 2)),
            (n.get = () => r[o] || null),
            (n.set = (n) => {
              $(U, l, o, r[o]), f(n) ? $(J, l, o, (r[o] = e && t ? (e) => $(n, i, e) : T(n, i))) : delete r[o]
            })
        }
        function Ut(e) {
          return !this(e)
        }
        $(V, [O, N], (e) => {
          e = e[_]
          for (let t = 0, n = _e(e); t < n.length; t++) {
            const o = n[t],
              r = B(e, o)
            X(r, null), ((f(r.value) ? Ot : Nt)[o] = r)
          }
        }),
          (re = null)
        const Jt = ["displayName", "id"],
          Ft = (() => {
            const n = "createObjectIn",
              o = "exportFunction",
              l = e && !t && r,
              i = !l && ((e, t, n) => (t && (t = h(t, "defineAs")) && m(e, t, n), n))
            return {
              cloneInto: be || ((e) => e),
              [n]: (l && l[n]) || ((e, t) => i(e, t, {})),
              [o]: (l && l[o]) || ((e, t, n) => i(t, n, e)),
            }
          })(),
          Kt = () => Te.post("TabClose"),
          Wt = () => Te.post("TabFocus")
        function Bt(e) {
          const { meta: t } = e,
            { grant: n } = t,
            o = X(t.resources, null),
            l = v({ resources: o, resCache: C(), async: !1 }, e, Jt),
            i = zt(e.gmi, t, o),
            s = { __proto__: null, info: i },
            a = { __proto__: null, GM: s, GM_info: i, unsafeWindow: r }
          let u,
            c,
            d = n.length
          1 === d && "none" === n[0] && (d = 0), K(a, Ft)
          for (let e = 0; e < n.length; e++) {
            let t,
              o,
              r,
              i,
              c = n[e]
            ;("GM." === $(oe, c, 0, 3) && (i = $(oe, c, 3)) && (o = xt[i])) ||
            (t = $t[(r = i ? `GM_${i}` : c)]) ||
            ((t = Gt[r]) && (!i || (o = t)))
              ? (t = T(o || t, o ? u || (u = K(C(), l, { async: !0 })) : l))
              : !(t = Ct[r]) && (t = ("window.close" === c && Kt) || ("window.focus" === c && Wt)) && (c = $(oe, c, 7)),
              t && (i ? (s[i] = t) : (a[c] = t))
          }
          return d && ((c = At(a)), (a.c = a)), { gm: a, wrapper: c }
        }
        function zt(e, t, n) {
          const o = Q(n)
          return (
            $(V, o, (e, t) => {
              o[t] = { name: e, url: n[e] }
            }),
            (t.resources = o),
            ct(e, Te.gmi),
            ct(e, { injectInto: Te.mode, platform: ct({}, Te.ua), script: t, scriptHandler: i, version: "2.19.4" })
          )
        }
        const Xt = C()
        function Qt(n, o) {
          if (!t)
            return (
              (Te.mode = s),
              (Te.post = (e, t, o) => {
                n({ cmd: e, data: t, node: o }, s)
              }),
              (r.chrome = void 0),
              (r.browser = void 0),
              (de = o),
              (e, t, n, o) => {
                Te.onHandle({ cmd: e, data: t, node: o })
              }
            )
          if (
            ($(
              J,
              l,
              t + "*",
              (e) => {
                ;(e = $(ve, e)), Le(e[0], e[1], Te)
              },
              { __proto__: null, once: !0, capture: !0 }
            ),
            $(q, l, new R(t)),
            (Te.mode = "page"),
            xe({
              WriteVault(e) {
                this[e] = Me
              },
            }),
            !e)
          ) {
            for (let e = 0; e < Pe.length; e++) {
              const t = Pe[e]
              de[t] = (...e) => Te.post("Log", [t, e])
            }
            $t.GM_log = function (...e) {
              Te.post("Log", ["log", st([`[${this.displayName}]`], e)])
            }
          }
        }
        function Yt(e) {
          const t = Xt[e.name],
            n = $(ye, document),
            { gm: o, wrapper: i = r } = Bt(t)
          delete l[t.key.win], n && $(ne, n), Te.post("Run", t.id), $(e, i, o, de.error)
        }
        xe({
          Command({ id: e, key: t, evt: n }) {
            var o
            null == (o = Re[e]) || null == (o = o[t]) || o.cb(new (n.key ? I : P)(n.type, n))
          },
          Callback({ id: e, data: t }) {
            if ("Error" === e) throw t
            const n = Ge[e]
            delete Ge[e], n && $(n, this, t)
          },
          async Plant({ data: e, win: t }) {
            m(l, t, Yt, !0, "set"), await 0, delete Xt[e], delete l[t]
          },
          ScriptData({ info: n, items: o }) {
            n && K(Te, n)
            const r = []
            for (let e = 0; e < o.length; e++) {
              const n = o[e],
                { key: i } = n
              if (((Xt[i.data] = n), (Se[n.id] = X(n.values || {}, null)), !t)) {
                const e = i.win,
                  t = l[e]
                t ? (G(r, t), delete l[e]) : W(l, e, { __proto__: null, configurable: !0, set: Yt })
              }
            }
            t ? e && Te.post("InjectList", o[0].runAt) : $(V, r, Yt)
          },
          Expose(e) {
            const t = "external",
              n = l[t]
            ;(p(n) ? n : (l[t] = {}))[i] = {
              version: "2.19.4",
              isInstalled: (t, n) => (e ? Te.send("GetScriptVer", { meta: { name: t, namespace: n } }) : b()),
            }
          },
        }),
          (o.exports = z)
      })()
      const { exports: xe } = o
      return xe.__esModule ? xe.default : xe
    })
}
