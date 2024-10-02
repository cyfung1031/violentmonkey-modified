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
            e && ue(e, t) && (n = e[t])
          } catch (e) {}
          return n
        },
        m = (e, t, n, o = !0, r) =>
          B(e, t, { __proto__: null, [r || "value"]: n, [!r && "writable"]: o, configurable: o, enumerable: o }),
        y = (e) => W(C(), e),
        v = (e, t, n) => (
          Q(e, null),
          t &&
            $(V, n, (n) => {
              ue(t, n) && (e[n] = t[n])
            }),
          e
        ),
        w = (e, t, n, o) => {
          var r
          const l = e[t] || (e[t] = C())
          return null != (r = l[n]) ? r : (l[n] = null != o ? o : C())
        },
        b = async (e) => e,
        M = (e = "VM") => e + pe(),
        x = (e, ...t) => {
          let n = `[${i}]`
          t[0] &&
            $(V, t[0], (e) => {
              n += `[${e}]`
            }),
            (t[0] = n),
            k(fe[e], fe, t)
        },
        G = (e, t) => m(e, e.length, t)
      let $,
        C,
        V,
        k,
        T,
        E,
        R,
        S,
        O,
        I,
        A,
        P,
        N,
        L,
        j,
        U,
        D,
        H,
        q,
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
        we,
        be
      const Me = t ? null : r.cloneInto,
        xe = (() => {
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
              (E = u[(d += 1)] || p.CustomEvent),
              (R = u[(d += 1)] || p.DOMParser),
              (S = u[(d += 1)] || p.Error),
              (O = u[(d += 1)] || p.EventTarget),
              (I = u[(d += 1)] || p.KeyboardEvent),
              (A = u[(d += 1)] || p.MouseEvent),
              (P = u[(d += 1)] || p.Object),
              (L = u[(d += 1)] || p.Symbol),
              (N = u[(d += 1)] || p.Proxy),
              (D = u[(d += 1)] || p.dispatchEvent),
              (J = u[(d += 1)] || p.removeEventListener),
              (F = u[(d += 1)] || p.addEventListener),
              (B = ((i = P) && u[(d += 1)]) || i.defineProperty),
              (z = u[(d += 1)] || i.getOwnPropertyDescriptor),
              (a = u[(d += 1)] || i.getOwnPropertyNames),
              (X = u[(d += 1)] || i.getPrototypeOf),
              (Q = u[(d += 1)] || i.setPrototypeOf),
              (W = u[(d += 1)] || i.assign),
              (Y = u[(d += 1)] || i.keys),
              (Z = u[(d += 1)] || i.values),
              (ee = u[(d += 1)] || (t = p.Array[_]).concat),
              (te = u[(d += 1)] || t.filter),
              (V = u[(d += 1)] || t.forEach),
              (ne = u[(d += 1)] || t.indexOf),
              (oe = u[(d += 1)] || p.Element[_].remove),
              (re = u[(d += 1)] || p.String[_].slice),
              (k = u[(d += 1)] || (o = p.Reflect).apply),
              ($ = u[(d += 1)] || (s = i.call).bind(s)),
              (T = u[(d += 1)] || s.bind(i.bind)),
              (ie = u[(d += 1)] || p.URL[_].toString),
              (C = u[(d += 1)] || T(i.create, i, null)),
              (ae = u[(d += 1)] || p.FormData[_].entries),
              (ue = u[(d += 1)] || T(s, i[_].hasOwnProperty)),
              (se = u[(d += 1)] || p.Array.isArray),
              (ce = u[(d += 1)] || p.JSON.parse),
              (de = u[(d += 1)] || p.JSON.stringify),
              (fe = u[(d += 1)] || y((c || p).console)),
              (pe = u[(d += 1)] || p.Math.random),
              (_e = u[(d += 1)] || R[_].parseFromString),
              (ge = u[(d += 1)] || o.ownKeys),
              (he = u[(d += 1)] || p.Event[_].stopImmediatePropagation),
              (j = u[(d += 1)] || (t = p.Promise[_]).constructor),
              (me = u[(d += 1)] || (c || t).then),
              (ye = u[(d += 1)] || p.URLSearchParams[_].toString),
              (ve = u[(d += 1)] || z(p.Document[_], "currentScript").get),
              (we = u[(d += 1)] || z(E[_], "detail").get),
              (be = u[(d += 1)] || z(A[_], "relatedTarget").get),
              (H = u[(d += 1)] || z(g, "length").get || (() => h(l, "length", 1e9))),
              (q = u[(d += 1)] || z(g, "parent").get || (() => h(l, "parent"))),
              (le = u[(d += 1)] || [a(g), p !== g && a(p)]),
            ]),
            (K = L.toStringTag),
            (U = T(j, X(b()))),
            u
          )
        })()
      ;(() => {
        "use strict"
        var n = { __proto__: null }
        for (let e = 0, t = "dor"; e < t.length; e++) B(n, t[e], { __proto__: null, value: 0, writable: 1 })
        ;(n.d = (e, t) => {
          for (var n in t) n in e || B(e, n, { __proto__: null, enumerable: !0, get: t[n] })
        }),
          (n.o = (e, t) => ue(e, t)),
          (n.r = (e) => {
            B(e, K, { __proto__: null, value: "Module" }), B(e, "__esModule", { __proto__: null, value: !0 })
          })
        var j = { __proto__: null }
        n.r(j), n.d(j, { __proto__: null, default: () => nn })
        const pe = C(),
          Ge = (e) => W(pe, e),
          $e = C(),
          Ce = {
            __proto__: null,
            onHandle({ cmd: e, data: t, node: n }) {
              const o = pe[e]
              o && $(o, n, t)
            },
            promise(e, t, n) {
              let o, r
              return (
                (r = new U((e) => {
                  o = e
                })),
                ke(e, t, n, o),
                r
              )
            },
            call: ke,
          }
        let Ve
        function ke(e, t, n, o, r) {
          const l = M()
          if ((($e[l] = o || Te), r ? m(t, r, l) : (t = { __CBID: l, data: t }), Ce.post(e, t, n), !o)) return Ve
        }
        function Te(e) {
          Ve = e
        }
        const Ee = Ce,
          Re = C(),
          Se = C()
        function Oe(e) {
          for (const t in e) if (ue(e, t)) return !1
          return !0
        }
        const Ie = { __proto__: null, string: "s", number: "n", boolean: "b" }
        function Ae(e, t = JSON.stringify) {
          if (void 0 !== e) {
            const n = Ie[typeof e]
            return `${n || "o"}${n ? e : t(e)}`
          }
        }
        const Pe = ["log", "info", "warn", "error", "debug"],
          Ne = (e, t) => {
            const n = Me ? Me(t, document) : t,
              o = new E(e, { __proto__: null, detail: n })
            $(D, l, o)
          },
          Le = (e, t, n) => {
            let o
            $(
              F,
              l,
              e,
              (e) => {
                if (($(he, e), o)) (o.node = $(be, e)), (e = o), (o = null)
                else {
                  try {
                    e = $(we, e)
                  } catch (e) {
                    return
                  }
                  if (
                    (e || ((e = C()).data = `[${i}] Non-cloneable property e.g. a DOM node or function.`),
                    Me && (e = Me(e, l)),
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
                  a = s && new A(t, { __proto__: null, relatedTarget: s })
                Ne(t, { cmd: e, data: o, node: !!a }), a && $(D, l, a)
              })
          }
        let je = 0
        const Ue = C()
        function De(e) {
          je += 1
          const t = je,
            n = {
              onclose: null,
              closed: !1,
              close() {
                Ee.post("TabClose", t)
              },
            }
          return (Ue[t] = n), Ee.post("TabOpen", { key: t, data: e }), n
        }
        Ge({
          TabClosed(e) {
            const t = Ue[e]
            t && ((t.closed = !0), delete Ue[e], null == t.onclose || t.onclose())
          },
        })
        const He = C(),
          qe = "text/html",
          Je = "response",
          Fe = "responseXML",
          Ke = "document",
          We = "raw",
          Be = "onerror",
          ze = "onload",
          Xe = ["abort", "error", "load", "loadend", "loadstart", "progress", "readystatechange", "timeout"],
          Qe = ["context", c],
          Ye = ["headers", "method", "overrideMimeType", "password", "timeout", "user"],
          Ze = ["application/xhtml+xml", "application/xml", "image/svg+xml", "text/xml", qe],
          et = { __proto__: null, arraybuffer: 1, blob: 1, json: 0, [Ke]: 0, text: 0, "": 0 }
        function tt(e, t, n) {
          const { [c]: o } = e
          let r, l, i
          if (We in e) {
            if (
              ((r = e[We]),
              e[d] || ((i = r), (r = ""), $(V, i, (e) => (r += e)), (e[We] = [r]), (e[u] = r)),
              (o === Ke && (l = qe)) || (!o && n === Fe && $(ne, Ze, (l = rt(t) || qe)) >= 0) || "json" === o)
            )
              try {
                r = l ? $(_e, new R(), r, l) : ce(r)
              } catch (e) {
                r = null
              }
            if (o === Ke) {
              const t = n === Je ? Fe : Je
              m(this, t, r), (e[t] = r)
            }
            o && delete e[We], (e[n] = r)
          } else r = e[n]
          return void 0 === r && (r = null), m(this, n, r), r
        }
        function nt(t, n, o) {
          let r,
            { data: l, url: i, [c]: s = "" } = t
          if (i || "url" in t) {
            if (!g(i)) {
              if (i === location) i = i.href
              else
                try {
                  i = $(ie, i)
                } catch (e) {
                  try {
                    i = `${i}`
                  } catch (e) {
                    r = e
                  }
                }
              t.url = i
            }
          } else r = new S('Required parameter "url" is missing.')
          if (r) return void ot(t, r)
          s in et || (fe.warn(`Unknown ${c} "${s}"`), (s = ""))
          const a = n.id,
            u = M("VMxhr"),
            _ = C(),
            h = v({ cb: _, id: u, scriptId: a }, t, Qe),
            { withCredentials: y = !0, anonymous: w = !y } = t,
            b = n.async
              ? new U((e, n) => {
                  const { [ze]: o, [Be]: r } = t
                  ;(t[ze] = o
                    ? (t) => {
                        e(t), o(t)
                      }
                    : e),
                    (t[Be] = r
                      ? (e) => {
                          n(e), r(e)
                        }
                      : n)
                })
              : {}
          return (
            (He[u] = h),
            (l = (null == l && []) || ((t.binary || !p(l)) && [`${l}`]) || lt(l) || (e >= 56 && [l]) || [l, "bin"]),
            Ee.call(
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
                  [d]: (h[d] = et[s] ? s : ""),
                  events: $(te, Xe, (e) => f((_[e] = t[`on${e}`]))),
                },
                t,
                Ye
              )
            ),
            m(b, "abort", () => Ee.post("AbortRequest", u)),
            e && n.async && m(b, "then", me),
            b
          )
        }
        function ot({ [Be]: e }, t) {
          if (!f(e)) throw t
          e(t)
        }
        function rt(e) {
          const t = e.contentType || "",
            n = t.length
          let o,
            r = 0
          for (; r < n && "," !== (o = t[r]) && ";" !== o && o > " "; ) r += 1
          return $(re, t, 0, r)
        }
        function lt(e) {
          try {
            return [[...$(ae, e)], "fd"]
          } catch (e) {}
          try {
            return [$(ye, e), "usp"]
          } catch (e) {}
        }
        Ge({
          HttpRequested(e) {
            const t = He[e.id]
            if (!t) return
            const { type: n } = e,
              o = t.cb[n]
            if (("loadend" === n && delete He[t.id], !o)) return
            if (ue(e, "error")) return void o(new S(e.error))
            const { data: r } = e,
              { [Je]: l, [a]: i } = r
            let s = t[We]
            if (null != l)
              if (t[d]) t[We] = l
              else if ((s || (s = t[We] = []), g(l))) G(s, l)
              else
                for (let e = 0; e < l.length; e++) {
                  const t = l[e]
                  G(s, t)
                }
            t[d]
              ? m(r, u, null)
              : !s || s.length <= 1
                ? m(r, u, (s && s[0]) || "")
                : s.length && m(r, u, T(tt, r, t, e, u), !0, "get"),
              null != i && (t[a] = i),
              m(r, "context", t.context),
              m(r, a, t[a]),
              m(r, Fe, T(tt, r, t, e, Fe), !0, "get"),
              m(r, Je, T(tt, r, t, e, Je), !0, "get"),
              o(r)
          },
        })
        const it = C()
        Ge({
          NotificationClicked(e) {
            var t
            null == (t = it[e]) || null == t.onclick || t.onclick()
          },
          NotificationClosed(e) {
            const t = it[e]
            t && (delete it[e], null == t.ondone || t.ondone())
          },
        })
        const st = L.isConcatSpreadable,
          at = (...e) => {
            const t = []
            return m(t, st, !0), $(V, e, (e) => m(e, st, !0)), k(ee, t, e)
          },
          ut = (e, t) => {
            let n
            if (null === e) n = "null"
            else if ("object" == typeof e) {
              if (t) {
                if ($(ne, t, e) >= 0) throw new S("Converting circular structure to JSON")
                m(t, t.length, e)
              } else t = [e]
              if (se(e)) {
                n = "["
                for (let r = 0, l = e.length; r < l; r += 1) {
                  var o
                  n += `${r ? "," : ""}${null != (o = ut(e[r], t)) ? o : "null"}`
                }
                n += "]"
              } else
                (n = "{"),
                  $(V, Y(e), (o) => {
                    const r = ut(e[o], t)
                    void 0 !== r && (n += `${n.length > 1 ? "," : ""}${de(o)}:${r}`)
                  }),
                  (n += "}")
              t.length -= 1
            } else void 0 !== e && (n = de(e))
            return n
          },
          ct = (e = C()) => {
            return {
              clone() {
                const t = C()
                for (const n in e) t[n] = y(e[n])
                return ct(t)
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
                const t = Z(e)
                return (
                  $(V, t, (e, n) => {
                    t[n] = Y(e)
                  }),
                  k(at, null, t)
                )
              },
            }
            function t(t, n) {
              const o = t.length ? t[0] : ""
              return e[o] || (n ? (e[o] = C()) : null)
            }
          },
          dt = X({}),
          ft = (e) => Q(W(C(), e), dt),
          pt = C(),
          _t = { __proto__: null, o: ce, n: (e) => +e, b: (e) => "true" === e }
        let gt,
          ht,
          mt = C()
        function yt(e, t, n) {
          let o
          const { id: r, async: l } = e,
            i = Se[r],
            s = pt[r]
          for (let e = 0, l = t ? Y(n) : n; e < l.length; e++) {
            const a = l[e]
            let u, c, d, f
            t ? ((u = n[a]), (c = Ae(u, ut) || null)) : (c = null),
              (d = i[a]),
              t ? (i[a] = c) : delete i[a],
              c !== d &&
                (((o || (o = mt[r] || (mt[r] = C())))[a] = c), (f = null == s ? void 0 : s[a]) && Mt(f, a, u, c, d))
          }
          if ((o && ((o = ht || (ht = $(me, b(), xt))), l && (gt = !0)), l)) return o || b()
        }
        function vt(e) {
          const t = e[0],
            n = _t[t]
          let o = $(re, e, 1)
          try {
            n && (o = n(o))
          } catch (e) {}
          return o
        }
        function wt(e, t) {
          $(V, Y(t), (n) => {
            const o = t[n]
            o ? (e[n] = o) : delete e[n]
          })
        }
        function bt(e, t, n) {
          $(V, Y(n), (o) => {
            const r = n[o] || void 0,
              l = t[o]
            if (l !== r) {
              r ? (t[o] = r) : delete t[o]
              const n = e[o]
              n && Mt(n, o, void 0, r, l, !0)
            }
          })
        }
        function Mt(e, t, n, o, r, l = !1) {
          const i = r ? vt(r) : void 0,
            s = void 0 === n && o ? vt(o) : n
          $(V, Z(e), (e) => {
            try {
              e(t, i, s, l)
            } catch (e) {
              x("error", ["GM_addValueChangeListener", "callback"], e)
            }
          })
        }
        function xt() {
          const e = (gt ? Ee.promise : Ee.post)("UpdateValue", mt)
          return (mt = C()), (ht = gt = !1), e
        }
        Ge({
          UpdatedValues(e) {
            $(V, Y(e), (t) => {
              const n = Se[t]
              if (n) {
                const o = e[t],
                  r = pt[t]
                r ? bt(r, n, o) : wt(n, o)
              }
            })
          },
        })
        const Gt = (e, t) => (e.async ? b(t) : t),
          $t = C(),
          Ct = {
            __proto__: null,
            GM_deleteValue(e) {
              return yt(this, !1, [e])
            },
            GM_deleteValues(e) {
              return yt(this, !1, e)
            },
            GM_getValue(e, t) {
              const n = Se[this.id][e]
              return Gt(this, n ? vt(n) : t)
            },
            GM_getValues(e) {
              const t = {},
                n = se(e),
                o = Se[this.id]
              for (let r = 0, l = n ? e : Y(e); r < l.length; r++) {
                const i = l[r],
                  s = o[i]
                s ? m(t, i, vt(s)) : n || m(t, i, e[i])
              }
              return Gt(this, t)
            },
            GM_listValues() {
              return Gt(this, Y(Se[this.id]))
            },
            GM_setValue(e, t) {
              return yt(this, !0, { [e]: t })
            },
            GM_setValues(e) {
              return yt(this, !0, e)
            },
            GM_download(e, t) {
              if (
                (g(e) ? (e = { url: e, name: t, __proto__: null }) : e && (t = (e = y(e)).name),
                !(t ? !g(t) && (t = "not a string") : (t = "missing")))
              )
                return (
                  W(e, { [c]: "blob", data: null, method: "GET", overrideMimeType: "application/octet-stream" }),
                  nt(e, this, t)
                )
              ot(e, new S(`Required parameter "name" is ${t}.`))
            },
          },
          Vt = {
            __proto__: null,
            GM_addValueChangeListener(e, t) {
              if ((g(e) || (e = `${e}`), !f(t))) return
              const n = w(pt, this.id, e),
                o = $(ne, Z(n), t)
              let r = o >= 0 && Y(n)[o]
              return r || ((r = M("VMvc")), (n[r] = t)), r
            },
            GM_removeValueChangeListener(e) {
              const t = pt[this.id]
              if (t) {
                for (const n in t) {
                  const o = t[n]
                  if (e in o) {
                    delete o[e], Oe(o) && delete t[n]
                    break
                  }
                }
                Oe(t) && delete pt[this.id]
              }
            },
            GM_getResourceText(e) {
              return Et(this, e)
            },
            GM_getResourceURL: ($t.getResourceUrl = function (e, t) {
              return Et(this, e, !!t, void 0 === t)
            }),
            GM_registerMenuCommand(e, t, n) {
              if ((((n = y(n)).text = e = `${e}`), !e)) throw new S("Menu caption text is required!")
              const { id: o } = this,
                r = n.id || e,
                l = w(Re, o, r)
              return (l.cb = t), (l.text = e), Ee.post("RegisterMenu", { id: o, key: r, val: n }), r
            },
            GM_unregisterMenuCommand(e) {
              const { id: t } = this,
                n = Re[t]
              n && (n[e] || (e = Rt(e, n))) && (delete n[e], Ee.post("UnregisterMenu", { id: t, key: e }))
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
                throw new S("Notification `text` is required!")
              const s = `${this.id}:${(l.tag = null != (r = i) ? r : M())}`,
                a = C()
              for (const e in l) a[e] = !!f(l[e]) || l[e]
              return (
                (a.id = s),
                (it[s] = l),
                Ee.post("Notification", a),
                { remove: () => Ee.promise("RemoveNotification", s) }
              )
            },
            GM_xmlhttpRequest: ($t.xmlHttpRequest = function (e) {
              return nt(y(e), this)
            }),
          },
          kt = {
            __proto__: null,
            GM_addElement: (e, t, n) => (g(e) ? Tt(null, e, t) : Tt(e, t, n)),
            GM_addStyle: (e) => Tt(null, "style", { textContent: e, id: M("VMst") }),
            GM_openInTab: (e, t) => (((t = y(p(t) ? t : { active: !t })).url = e), De(t)),
            GM_setClipboard(e, t) {
              Ee.post("SetClipboard", { data: e, type: t })
            },
            GM_log: fe.log,
          }
        function Tt(e, t, n) {
          let o, r
          if (
            (Ee.call(
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
            const e = new S(r[0])
            throw ((e.stack += `\n${r[1]}`), e)
          }
          return m(o, "then", async (e) => delete o.then && (f(e) ? e(o) : o))
        }
        function Et(e, t, n, o) {
          let r
          const { id: l, resCache: i, resources: s } = e,
            a = s[t]
          if (a) {
            const e = "data:" === $(re, a, 0, 5),
              t = null == n ? 0 : 1 + (n = o ? !e : n)
            ;(r = (e && !1 === n) || w(i, t, a, !1)),
              r || ((r = Ee.call("GetResource", { id: l, isBlob: n, key: a, raw: e && a })), w(i, t, a, r))
          }
          return Gt(e, !0 === r ? a : r)
        }
        function Rt(e, t) {
          for (const n in t) if (t[n].text === e) return n
        }
        const St = "console",
          Ot = L.unscopables,
          It = C(),
          At = C(),
          Pt = ct(),
          Nt = (() => {
            const n = "wrappedJSObject",
              o = !t,
              i = le[0],
              s = $(H, l)
            let a,
              u,
              c = !e
            for (let e = 0; e < i.length; e++) {
              const t = i[e]
              ;(+t >= 0 && t < s) || (o && ("**VMInitInjection**" === t || "browser" === t || "chrome" === t))
                ? (c = !1)
                : (Pt.set(t, 1),
                  t >= "a" &&
                    t <= "z" &&
                    (t.length < 3 || "o" !== t[0] || "n" !== t[1]) &&
                    (a = z(l, t)) &&
                    (Q(a, null),
                    ((a.enumerable && f(a.value) ? At : It)[t] = a),
                    t === St && p((u = a.value)) && (a.value = y(u))))
            }
            return (
              r !== l &&
                $(V, le[1], (e) => {
                  ;(+e >= 0 && e < s) || (Pt.set(e, -1), (c = !1))
                }),
              e && !t && n in r && !Pt.get(n) && (Pt.set(n, 1), c && m(i, i.length, n)),
              c ? i : Pt.toArray()
            )
          })(),
          Lt = C(),
          jt = (e) => g(e) && (e = +e) >= 0 && e === (0 | e) && e < $(H, l),
          Ut = (e) => {
            let t, n
            const o = At[e],
              i = o || Lt[e] || ((t = Pt.get(e) || (n = jt(e))) && z((t = t > 0 ? l : r), e))
            if (i) {
              if ((o || Q(i, null), o)) {
                const n = T(i.value, t === r ? r : l)
                ;(i.value = B(n, "name", { __proto__: null, value: e })), (At[e] = void 0), (It[e] = i)
              } else n || (It[e] = i)
              return i
            }
          }
        function Dt(e) {
          let t = Pt
          m(e, K, () => "Window", !1, "get")
          const n = C(),
            o = new N(e, {
              __proto__: null,
              defineProperty(t, n, o) {
                if (n in e || !(t = It[n] || Ut(n)) || t.configurable) return B(e, n, o)
              },
              deleteProperty: (n, o) => (
                (n = delete e[o]) &&
                  (n = It[o] || Ut(o)) &&
                  (n = n.configurable) &&
                  (t === Pt && (t = Pt.clone()), t.delete(o)),
                !!n
              ),
              get: (t, r) => {
                if ("undefined" !== r && r !== Ot) return void 0 !== (t = e[r]) || r in e ? t : qt(e, r, o, n, !0)
              },
              getOwnPropertyDescriptor: (t, r) => z(e, r) || qt(e, r, o, n),
              has: (t, n) => n in It || n in e || Ut(n),
              ownKeys: () => Ht(e, t),
              preventExtensions() {},
              set: (t, r, l) => (r in e || qt(e, r, o, n), (e[r] = l), !0),
            })
          return o
        }
        function Ht(e, t) {
          const n = [],
            o = $(H, l)
          for (let t, r = 0; r < o && h(l, (t = `${r}`)); r += 1) t in e || G(n, t)
          return at(n, t === Pt ? Nt : t.toArray(), $(te, ge(e), Ft, t.get))
        }
        function qt(e, t, n, o, i) {
          let s,
            a = (s = It[t]) || Ut(t)
          if (!a) return
          let { get: u, set: c, value: d } = a
          const f = !s && jt(t)
          return (
            d === l ||
            "window" === t ||
            "self" === t ||
            "globalThis" === t ||
            ("top" === t && l === top) ||
            ("parent" === t && l === $(q, l))
              ? ((d = a.value = n), (u = !1), delete a.get, delete a.set)
              : u && c && g(t) && t.length >= 3 && "o" === t[0] && "n" === t[1]
                ? Jt(a, t, o, n)
                : (u && (a.get = T(u, l)), c && (a.set = T(c, l)), d && t === St && (a.value = d = ft(d))),
            f || B(e, t, a),
            i ? (u ? (f ? r[t] : e[t]) : d) : a
          )
        }
        function Jt(n, o, r, i) {
          ;(o = $(re, o, 2)),
            (n.get = () => r[o] || null),
            (n.set = (n) => {
              $(J, l, o, r[o]), f(n) ? $(F, l, o, (r[o] = e && t ? (e) => $(n, i, e) : T(n, i))) : delete r[o]
            })
        }
        function Ft(e) {
          return !this(e)
        }
        $(V, [O, P], (e) => {
          e = e[_]
          for (let t = 0, n = ge(e); t < n.length; t++) {
            const o = n[t],
              r = z(e, o)
            Q(r, null), ((f(r.value) ? At : Lt)[o] = r)
          }
        }),
          (le = null)
        const Kt = ["displayName", "id"],
          Wt = (() => {
            const n = "createObjectIn",
              o = "exportFunction",
              l = e && !t && r,
              i = !l && ((e, t, n) => (t && (t = h(t, "defineAs")) && m(e, t, n), n))
            return {
              cloneInto: Me || ((e) => e),
              [n]: (l && l[n]) || ((e, t) => i(e, t, {})),
              [o]: (l && l[o]) || ((e, t, n) => i(t, n, e)),
            }
          })(),
          Bt = "resources",
          zt = () => Ee.call("UA"),
          Xt = (e) => Ee.promise("UAH", e),
          Qt = () => Ee.uad && m(Ee.call("UAD"), "getHighEntropyValues", Xt),
          Yt = () => Ee.post("TabClose"),
          Zt = () => Ee.post("TabFocus")
        function en(e) {
          const { meta: t } = e,
            { grant: n } = t,
            o = Q(t[Bt], null),
            l = v({ [Bt]: o, resCache: C(), async: !1 }, e, Kt),
            s = e.gmi,
            a = C(),
            u = { __proto__: null, GM: a, unsafeWindow: r }
          let c,
            d,
            f = n.length
          1 === f && "none" === n[0] && (f = 0),
            W(u, Wt),
            p(() => {
              Q(s, null)
              const e = (t[Bt] = Y(o))
              for (let t, n = 0; n < e.length; n++) (t = e[n]), (e[n] = { name: t, url: o[t] })
              return (
                W(s, Ee.gmi),
                (s.injectInto = Ee.mode),
                (s.platform = ft(Ee.ua)),
                (s.script = t),
                (s.scriptHandler = i),
                (s.version = "2.26.0"),
                m(s, "userAgent", zt, !0, "get"),
                m(s, "userAgentData", Qt, !0, "get"),
                p(s),
                Q(s, dt)
              )
            }, "get")
          for (let e = 0; e < n.length; e++) {
            let t,
              o,
              r,
              i,
              s = n[e]
            ;("GM." === $(re, s, 0, 3) && (i = $(re, s, 3)) && (o = $t[i])) ||
            (t = Vt[(r = i ? `GM_${i}` : s)]) ||
            ((t = Ct[r]) && (!i || (o = t)))
              ? (t = T(o || t, o ? c || (c = W(C(), l, { async: !0 })) : l))
              : !(t = kt[r]) && (t = ("window.close" === s && Yt) || ("window.focus" === s && Zt)) && (s = $(re, s, 7)),
              t && (i ? (a[i] = t) : (u[s] = t))
          }
          return f && ((d = Dt(u)), (u.c = u)), { gm: u, wrapper: d }
          function p(e, t) {
            m(u, "GM_info", e, !0, t), m(a, "info", e, !0, t)
          }
        }
        const tn = C()
        function nn(n, o) {
          if (!t)
            return (
              (Ee.mode = s),
              (Ee.post = (e, t, o) => {
                n({ cmd: e, data: t, node: o }, s)
              }),
              (r.chrome = void 0),
              (r.browser = void 0),
              (fe = o),
              (e, t, n, o) => {
                Ee.onHandle({ cmd: e, data: t, node: o })
              }
            )
          if (
            ($(
              F,
              l,
              t + "*",
              (e) => {
                ;(e = $(we, e)), Le(e[0], e[1], Ee)
              },
              { __proto__: null, once: !0, capture: !0 }
            ),
            $(D, l, new E(t)),
            (Ee.mode = "page"),
            Ge({
              WriteVault(e) {
                this[e] = xe
              },
            }),
            !e)
          ) {
            for (let e = 0; e < Pe.length; e++) {
              const t = Pe[e]
              fe[t] = (...e) => Ee.post("Log", [t, e])
            }
            Vt.GM_log = function (...e) {
              Ee.post("Log", ["log", at([`[${this.displayName}]`], e)])
            }
          }
        }
        function on(e) {
          const t = tn[e.name],
            n = $(ve, document),
            { gm: o, wrapper: i = r } = en(t)
          delete l[t.key.win], n && $(oe, n), Ee.post("Run", t.id), $(e, i, o, fe.error)
        }
        Ge({
          Command({ id: e, key: t, evt: n }) {
            var o
            null == (o = Re[e]) || null == (o = o[t]) || o.cb(new (n.key ? I : A)(n.type, n))
          },
          Callback({ id: e, data: t }) {
            if ("Error" === e) throw t
            const n = $e[e]
            delete $e[e], n && $(n, this, t)
          },
          async Plant({ data: e, win: t }) {
            m(l, t, on, !0, "set"), await 0, delete tn[e], delete l[t]
          },
          ScriptData({ info: n, items: o }) {
            n && W(Ee, n)
            const r = []
            for (let e = 0; e < o.length; e++) {
              const n = o[e],
                { key: i } = n
              if (((tn[i.data] = n), (Se[n.id] = Q(n.values || {}, null)), !t)) {
                const e = i.win,
                  t = l[e]
                t ? (G(r, t), delete l[e]) : B(l, e, { __proto__: null, configurable: !0, set: on })
              }
            }
            t ? e && Ee.post("InjectList", o[0].runAt) : $(V, r, on)
          },
          Expose(e) {
            const t = "external",
              n = l[t]
            ;(p(n) ? n : (l[t] = {}))[i] = {
              version: "2.26.0",
              isInstalled: (t, n) => (e ? Ee.promise("GetScriptVer", { meta: { name: t, namespace: n } }) : b()),
            }
          },
        }),
          (o.exports = j)
      })()
      const { exports: Ge } = o
      return Ge.__esModule ? Ge.default : Ge
    })
}
