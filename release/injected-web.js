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
        S,
        T,
        E,
        R,
        O,
        A,
        I,
        P,
        N,
        L,
        j,
        U,
        q,
        D,
        H,
        F,
        J,
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
            d,
            p,
            g = -1,
            m = r,
            v = l
          if (
            (n && ((d = l[n]), delete l[n]),
            d &&
              !f(d[0]) &&
              ((m = d[0]), (v = m), e ? (p = d[1]) : (o = !m.document.requestStorageAccessFor), (d = !1)),
            d || (d = { __proto__: null }),
            (d = [
              (T = d[(g += 1)] || m.CustomEvent),
              (E = d[(g += 1)] || m.DOMParser),
              (R = d[(g += 1)] || m.Error),
              (O = d[(g += 1)] || m.EventTarget),
              (A = d[(g += 1)] || m.KeyboardEvent),
              (I = d[(g += 1)] || m.MouseEvent),
              (P = d[(g += 1)] || m.Object),
              (L = d[(g += 1)] || m.Symbol),
              (N = d[(g += 1)] || m.Proxy),
              (q = d[(g += 1)] || m.dispatchEvent),
              (F = d[(g += 1)] || m.removeEventListener),
              (J = d[(g += 1)] || m.addEventListener),
              (B = ((a = P) && d[(g += 1)]) || a.defineProperty),
              (z = d[(g += 1)] || a.getOwnPropertyDescriptor),
              (c = d[(g += 1)] || a.getOwnPropertyNames),
              (X = d[(g += 1)] || a.getPrototypeOf),
              (Q = d[(g += 1)] || a.setPrototypeOf),
              (W = d[(g += 1)] || a.assign),
              (Y = d[(g += 1)] || a.keys),
              (Z = d[(g += 1)] || a.values),
              (ee = d[(g += 1)] || (t = m.Array[_]).concat),
              (te = d[(g += 1)] || t.filter),
              (V = d[(g += 1)] || t.forEach),
              (ne = d[(g += 1)] || t.indexOf),
              (oe = d[(g += 1)] || m.Element[_].remove),
              (re = d[(g += 1)] || m.String[_].slice),
              (k = d[(g += 1)] || (s = m.Reflect).apply),
              ($ = d[(g += 1)] || (u = a.call).bind(u)),
              (S = d[(g += 1)] || u.bind(a.bind)),
              (ie = d[(g += 1)] || m.URL[_].toString),
              (C = d[(g += 1)] || S(a.create, a, null)),
              (ae = d[(g += 1)] || m.FormData[_].entries),
              (ue = d[(g += 1)] || S(u, a[_].hasOwnProperty)),
              (se = d[(g += 1)] || m.Array.isArray),
              (ce = d[(g += 1)] || m.JSON.parse),
              (de = d[(g += 1)] || m.JSON.stringify),
              (fe = d[(g += 1)] || y((p || m).console)),
              (pe = d[(g += 1)] || m.Math.random),
              (_e = d[(g += 1)] || E[_].parseFromString),
              (ge = d[(g += 1)] || s.ownKeys),
              (he = d[(g += 1)] || m.Event[_].stopImmediatePropagation),
              (j = d[(g += 1)] || ((i = (U = m.Promise)[_]), e ? U : i.constructor)),
              (me = d[(g += 1)] || i.then),
              (ye = d[(g += 1)] || m.URLSearchParams[_].toString),
              (ve = d[(g += 1)] || z(m.Document[_], "currentScript").get),
              (we = d[(g += 1)] || z(T[_], "detail").get),
              (be = d[(g += 1)] || z(I[_], "relatedTarget").get),
              (D = d[(g += 1)] || z(v, "length").get || (() => h(l, "length", 1e9))),
              (H = d[(g += 1)] || z(v, "parent").get || (() => h(l, "parent"))),
              (le = d[(g += 1)] || [c(v), m !== v && c(m)]),
            ]),
            (K = L.toStringTag),
            o)
          )
            try {
              U = Promise
            } catch (e) {}
          else e ? (j = X(b())) : (U = S(j, X(b())))
          return d
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
        var pe = { __proto__: null }
        n.r(pe), n.d(pe, { __proto__: null, default: () => on })
        const Ge = C(),
          $e = (e) => W(Ge, e),
          Ce = C(),
          Ve = {
            __proto__: null,
            onHandle({ cmd: e, data: t, node: n }) {
              const o = Ge[e]
              o && $(o, n, t)
            },
            promise(t, n, o) {
              let r, l
              return (
                (l = new U((e) => {
                  r = e
                })),
                e && Q(l, j),
                Se(t, n, o, r),
                l
              )
            },
            call: Se,
          }
        let ke
        function Se(e, t, n, o, r) {
          const l = M()
          if (((Ce[l] = o || Te), r ? m(t, r, l) : (t = { __CBID: l, data: t }), Ve.post(e, t, n), !o)) return ke
        }
        function Te(e) {
          ke = e
        }
        const Ee = Ve,
          Re = C(),
          Oe = C()
        function Ae(e) {
          for (const t in e) if (ue(e, t)) return !1
          return !0
        }
        const Ie = { __proto__: null, string: "s", number: "n", boolean: "b" }
        function Pe(e, t = JSON.stringify) {
          if (void 0 !== e) {
            const n = Ie[typeof e]
            return `${n || "o"}${n ? e : t(e)}`
          }
        }
        const Ne = ["log", "info", "warn", "error", "debug"],
          Le = (e, t) => {
            const n = Me ? Me(t, document) : t,
              o = new T(e, { __proto__: null, detail: n })
            $(q, l, o)
          },
          je = (e, t, n) => {
            let o
            $(
              J,
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
                  a = s && new I(t, { __proto__: null, relatedTarget: s })
                Le(t, { cmd: e, data: o, node: !!a }), a && $(q, l, a)
              })
          }
        let Ue = 0
        const qe = C()
        function De(e) {
          Ue += 1
          const t = Ue,
            n = {
              onclose: null,
              closed: !1,
              close() {
                Ee.post("TabClose", t)
              },
            }
          return (qe[t] = n), Ee.post("TabOpen", { key: t, data: e }), n
        }
        $e({
          TabClosed(e) {
            const t = qe[e]
            t && ((t.closed = !0), delete qe[e], null == t.onclose || t.onclose())
          },
        })
        const He = C(),
          Fe = "text/html",
          Je = "response",
          Ke = "responseXML",
          We = "document",
          Be = "raw",
          ze = "onerror",
          Xe = "onload",
          Qe = ["abort", "error", "load", "loadend", "loadstart", "progress", "readystatechange", "timeout"],
          Ye = ["context", c],
          Ze = ["headers", "method", "overrideMimeType", "password", "timeout", "user"],
          et = ["application/xhtml+xml", "application/xml", "image/svg+xml", "text/xml", Fe],
          tt = { __proto__: null, arraybuffer: 1, blob: 1, json: 0, [We]: 0, text: 0, "": 0 }
        function nt(e, t, n) {
          const { [c]: o } = e
          let r, l, i
          if (Be in e) {
            if (
              ((r = e[Be]),
              e[d] || ((i = r), (r = ""), $(V, i, (e) => (r += e)), (e[Be] = [r]), (e[u] = r)),
              (o === We && (l = Fe)) || (!o && n === Ke && $(ne, et, (l = lt(t) || Fe)) >= 0) || "json" === o)
            )
              try {
                r = l ? $(_e, new E(), r, l) : ce(r)
              } catch (e) {
                r = null
              }
            if (o === We) {
              const t = n === Je ? Ke : Je
              m(this, t, r), (e[t] = r)
            }
            o && delete e[Be], (e[n] = r)
          } else r = e[n]
          return void 0 === r && (r = null), m(this, n, r), r
        }
        function ot(t, n, o) {
          let r,
            l,
            { data: i, url: s, [c]: a = "" } = t
          if (s || "url" in t) {
            if (!g(s)) {
              if (s === location) s = s.href
              else
                try {
                  s = $(ie, s)
                } catch (e) {
                  try {
                    s = `${s}`
                  } catch (e) {
                    r = e
                  }
                }
              t.url = s
            }
          } else r = new R('Required parameter "url" is missing.')
          if (r) return void rt(t, r)
          a in tt || (fe.warn(`Unknown ${c} "${a}"`), (a = ""))
          const u = n.id,
            _ = M("VMxhr"),
            h = C(),
            y = v({ cb: h, id: _, scriptId: u }, t, Ye),
            { withCredentials: w = !0, anonymous: b = !w } = t
          return (
            n.async &&
              (l = new U((e, n) => {
                const { [Xe]: o, [ze]: r } = t
                ;(t[Xe] = o
                  ? (t) => {
                      e(t), o(t)
                    }
                  : e),
                  (t[ze] = r
                    ? (e) => {
                        n(e), r(e)
                      }
                    : n)
              })),
            (He[_] = y),
            (i = (null == i && []) || ((t.binary || !p(i)) && [`${i}`]) || it(i) || (e >= 56 && [i]) || [i, "bin"]),
            Ee.call(
              "HttpRequest",
              v(
                {
                  anonymous: b,
                  data: i,
                  id: _,
                  scriptId: u,
                  url: s,
                  fileName: o,
                  [c]: a,
                  [d]: (y[d] = tt[a] ? a : ""),
                  events: $(te, Qe, (e) => f((h[e] = t[`on${e}`]))),
                },
                t,
                Ze
              )
            ),
            l ? e && Q(l, j) : (l = {}),
            m(l, "abort", () => Ee.post("AbortRequest", _)),
            l
          )
        }
        function rt({ [ze]: e }, t) {
          if (!f(e)) throw t
          e(t)
        }
        function lt(e) {
          const t = e.contentType || "",
            n = t.length
          let o,
            r = 0
          for (; r < n && "," !== (o = t[r]) && ";" !== o && o > " "; ) r += 1
          return $(re, t, 0, r)
        }
        function it(e) {
          try {
            return [[...$(ae, e)], "fd"]
          } catch (e) {}
          try {
            return [$(ye, e), "usp"]
          } catch (e) {}
        }
        $e({
          HttpRequested(e) {
            const t = He[e.id]
            if (!t) return
            const { type: n } = e,
              o = t.cb[n]
            if (("loadend" === n && delete He[t.id], !o)) return
            if (ue(e, "error")) return void o(new R(e.error))
            const { data: r } = e,
              { [Je]: l, [a]: i } = r
            let s = t[Be]
            if (null != l)
              if (t[d]) t[Be] = l
              else if ((s || (s = t[Be] = []), g(l))) G(s, l)
              else
                for (let e = 0; e < l.length; e++) {
                  const t = l[e]
                  G(s, t)
                }
            t[d]
              ? m(r, u, null)
              : !s || s.length <= 1
                ? m(r, u, (s && s[0]) || "")
                : s.length && m(r, u, S(nt, r, t, e, u), !0, "get"),
              null != i && (t[a] = i),
              m(r, "context", t.context),
              m(r, a, t[a]),
              m(r, Ke, S(nt, r, t, e, Ke), !0, "get"),
              m(r, Je, S(nt, r, t, e, Je), !0, "get"),
              o(r)
          },
        })
        const st = C()
        $e({
          NotificationClicked(e) {
            var t
            null == (t = st[e]) || null == t.onclick || t.onclick()
          },
          NotificationClosed(e) {
            const t = st[e]
            t && (delete st[e], null == t.ondone || t.ondone())
          },
        })
        const at = L.isConcatSpreadable,
          ut = (...e) => {
            const t = []
            return m(t, at, !0), $(V, e, (e) => m(e, at, !0)), k(ee, t, e)
          },
          ct = (e, t) => {
            let n
            if (null === e) n = "null"
            else if ("object" == typeof e) {
              if (t) {
                if ($(ne, t, e) >= 0) throw new R("Converting circular structure to JSON")
                m(t, t.length, e)
              } else t = [e]
              if (se(e)) {
                n = "["
                for (let r = 0, l = e.length; r < l; r += 1) {
                  var o
                  n += `${r ? "," : ""}${null != (o = ct(e[r], t)) ? o : "null"}`
                }
                n += "]"
              } else
                (n = "{"),
                  $(V, Y(e), (o) => {
                    const r = ct(e[o], t)
                    void 0 !== r && (n += `${n.length > 1 ? "," : ""}${de(o)}:${r}`)
                  }),
                  (n += "}")
              t.length -= 1
            } else void 0 !== e && (n = de(e))
            return n
          },
          dt = (e = C()) => {
            return {
              clone() {
                const t = C()
                for (const n in e) t[n] = y(e[n])
                return dt(t)
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
                  k(ut, null, t)
                )
              },
            }
            function t(t, n) {
              const o = t.length ? t[0] : ""
              return e[o] || (n ? (e[o] = C()) : null)
            }
          },
          ft = X({}),
          pt = (e) => Q(W(C(), e), ft),
          _t = C(),
          gt = { __proto__: null, o: ce, n: (e) => +e, b: (e) => "true" === e }
        let ht,
          mt,
          yt = C()
        function vt(e, t, n) {
          let o
          const { id: r, async: l } = e,
            i = Oe[r],
            s = _t[r]
          for (let e = 0, l = t ? Y(n) : n; e < l.length; e++) {
            const a = l[e]
            let u, c, d, f
            t ? ((u = n[a]), (c = Pe(u, ct) || null)) : (c = null),
              (d = i[a]),
              t ? (i[a] = c) : delete i[a],
              c !== d &&
                (((o || (o = yt[r] || (yt[r] = C())))[a] = c), (f = null == s ? void 0 : s[a]) && xt(f, a, u, c, d))
          }
          if ((o && ((o = mt || (mt = $(me, b(), Gt))), l && (ht = !0)), l)) return o || b()
        }
        function wt(e) {
          const t = e[0],
            n = gt[t]
          let o = $(re, e, 1)
          try {
            n && (o = n(o))
          } catch (e) {}
          return o
        }
        function bt(e, t) {
          $(V, Y(t), (n) => {
            const o = t[n]
            o ? (e[n] = o) : delete e[n]
          })
        }
        function Mt(e, t, n) {
          $(V, Y(n), (o) => {
            const r = n[o] || void 0,
              l = t[o]
            if (l !== r) {
              r ? (t[o] = r) : delete t[o]
              const n = e[o]
              n && xt(n, o, void 0, r, l, !0)
            }
          })
        }
        function xt(e, t, n, o, r, l = !1) {
          const i = r ? wt(r) : void 0,
            s = void 0 === n && o ? wt(o) : n
          $(V, Z(e), (e) => {
            try {
              e(t, i, s, l)
            } catch (e) {
              x("error", ["GM_addValueChangeListener", "callback"], e)
            }
          })
        }
        function Gt() {
          const e = (ht ? Ee.promise : Ee.post)("UpdateValue", yt)
          return (yt = C()), (mt = ht = !1), e
        }
        $e({
          UpdatedValues(e) {
            $(V, Y(e), (t) => {
              const n = Oe[t]
              if (n) {
                const o = e[t],
                  r = _t[t]
                r ? Mt(r, n, o) : bt(n, o)
              }
            })
          },
        })
        const $t = (e, t) => (e.async ? b(t) : t),
          Ct = C(),
          Vt = {
            __proto__: null,
            GM_deleteValue(e) {
              return vt(this, !1, [e])
            },
            GM_deleteValues(e) {
              return vt(this, !1, e)
            },
            GM_getValue(e, t) {
              const n = Oe[this.id][e]
              return $t(this, n ? wt(n) : t)
            },
            GM_getValues(e) {
              const t = {},
                n = se(e),
                o = Oe[this.id]
              for (let r = 0, l = n ? e : Y(e); r < l.length; r++) {
                const i = l[r],
                  s = o[i]
                s ? m(t, i, wt(s)) : n || m(t, i, e[i])
              }
              return $t(this, t)
            },
            GM_listValues() {
              return $t(this, Y(Oe[this.id]))
            },
            GM_setValue(e, t) {
              return vt(this, !0, { [e]: t })
            },
            GM_setValues(e) {
              return vt(this, !0, e)
            },
            GM_download(e, t) {
              if (
                (g(e) ? (e = { url: e, name: t, __proto__: null }) : e && (t = (e = y(e)).name),
                !(t ? !g(t) && (t = "not a string") : (t = "missing")))
              )
                return (
                  W(e, { [c]: "blob", data: null, method: "GET", overrideMimeType: "application/octet-stream" }),
                  ot(e, this, t)
                )
              rt(e, new R(`Required parameter "name" is ${t}.`))
            },
          },
          kt = {
            __proto__: null,
            GM_addValueChangeListener(e, t) {
              if ((g(e) || (e = `${e}`), !f(t))) return
              const n = w(_t, this.id, e),
                o = $(ne, Z(n), t)
              let r = o >= 0 && Y(n)[o]
              return r || ((r = M("VMvc")), (n[r] = t)), r
            },
            GM_removeValueChangeListener(e) {
              const t = _t[this.id]
              if (t) {
                for (const n in t) {
                  const o = t[n]
                  if (e in o) {
                    delete o[e], Ae(o) && delete t[n]
                    break
                  }
                }
                Ae(t) && delete _t[this.id]
              }
            },
            GM_getResourceText(e) {
              return Et(this, e)
            },
            GM_getResourceURL: (Ct.getResourceUrl = function (e, t) {
              return Et(this, e, !!t, void 0 === t)
            }),
            GM_registerMenuCommand(e, t, n) {
              if ((((n = y(n)).text = e = `${e}`), !e)) throw new R("Menu caption text is required!")
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
                throw new R("Notification `text` is required!")
              const s = `${this.id}:${(l.tag = null != (r = i) ? r : M())}`,
                a = C()
              for (const e in l) a[e] = !!f(l[e]) || l[e]
              return (
                (a.id = s),
                (st[s] = l),
                Ee.post("Notification", a),
                { remove: () => Ee.promise("RemoveNotification", s) }
              )
            },
            GM_xmlhttpRequest: (Ct.xmlHttpRequest = function (e) {
              return ot(y(e), this)
            }),
          },
          St = {
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
            const e = new R(r[0])
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
          return $t(e, !0 === r ? a : r)
        }
        function Rt(e, t) {
          for (const n in t) if (t[n].text === e) return n
        }
        const Ot = "console",
          At = L.unscopables,
          It = C(),
          Pt = C(),
          Nt = dt(),
          Lt = (() => {
            const n = "wrappedJSObject",
              o = !t,
              i = le[0],
              s = $(D, l)
            let a,
              u,
              c = !e
            for (let e = 0; e < i.length; e++) {
              const t = i[e]
              ;(+t >= 0 && t < s) || (o && ("**VMInitInjection**" === t || "browser" === t || "chrome" === t))
                ? (c = !1)
                : (Nt.set(t, 1),
                  t >= "a" &&
                    t <= "z" &&
                    (t.length < 3 || "o" !== t[0] || "n" !== t[1]) &&
                    (a = z(l, t)) &&
                    (Q(a, null),
                    ((a.enumerable && f(a.value) ? Pt : It)[t] = a),
                    t === Ot && p((u = a.value)) && (a.value = y(u))))
            }
            return (
              r !== l &&
                $(V, le[1], (e) => {
                  ;(+e >= 0 && e < s) || (Nt.set(e, -1), (c = !1))
                }),
              e && !t && n in r && !Nt.get(n) && (Nt.set(n, 1), c && m(i, i.length, n)),
              c ? i : Nt.toArray()
            )
          })(),
          jt = C(),
          Ut = (e) => g(e) && (e = +e) >= 0 && e === (0 | e) && e < $(D, l),
          qt = (e) => {
            let t, n
            const o = Pt[e],
              i = o || jt[e] || ((t = Nt.get(e) || (n = Ut(e))) && z((t = t > 0 ? l : r), e))
            if (i) {
              if ((o || Q(i, null), o)) {
                const n = S(i.value, t === r ? r : l)
                ;(i.value = B(n, "name", { __proto__: null, value: e })), (Pt[e] = void 0), (It[e] = i)
              } else n || (It[e] = i)
              return i
            }
          }
        function Dt(e) {
          let t = Nt
          m(e, K, () => "Window", !1, "get")
          const n = C(),
            o = new N(e, {
              __proto__: null,
              defineProperty(t, n, o) {
                if (n in e || !(t = It[n] || qt(n)) || t.configurable) return B(e, n, o)
              },
              deleteProperty: (n, o) => (
                (n = delete e[o]) &&
                  (n = It[o] || qt(o)) &&
                  (n = n.configurable) &&
                  (t === Nt && (t = Nt.clone()), t.delete(o)),
                !!n
              ),
              get: (t, r) => {
                if ("undefined" !== r && r !== At) return void 0 !== (t = e[r]) || r in e ? t : Ft(e, r, o, n, !0)
              },
              getOwnPropertyDescriptor: (t, r) => z(e, r) || Ft(e, r, o, n),
              has: (t, n) => n in It || n in e || qt(n),
              ownKeys: () => Ht(e, t),
              preventExtensions() {},
              set: (t, r, l) => (r in e || Ft(e, r, o, n), (e[r] = l), !0),
            })
          return o
        }
        function Ht(e, t) {
          const n = [],
            o = $(D, l)
          for (let t, r = 0; r < o && h(l, (t = `${r}`)); r += 1) t in e || G(n, t)
          return ut(n, t === Nt ? Lt : t.toArray(), $(te, ge(e), Kt, t.get))
        }
        function Ft(e, t, n, o, i) {
          let s,
            a = (s = It[t]) || qt(t)
          if (!a) return
          let { get: u, set: c, value: d } = a
          const f = !s && Ut(t)
          return (
            d === l ||
            "window" === t ||
            "self" === t ||
            "globalThis" === t ||
            ("top" === t && l === top) ||
            ("parent" === t && l === $(H, l))
              ? ((d = a.value = n), (u = !1), delete a.get, delete a.set)
              : u && c && g(t) && t.length >= 3 && "o" === t[0] && "n" === t[1]
                ? Jt(a, t, o, n)
                : (u && (a.get = S(u, l)), c && (a.set = S(c, l)), d && t === Ot && (a.value = d = pt(d))),
            f || B(e, t, a),
            i ? (u ? (f ? r[t] : e[t]) : d) : a
          )
        }
        function Jt(n, o, r, i) {
          ;(o = $(re, o, 2)),
            (n.get = () => r[o] || null),
            (n.set = (n) => {
              $(F, l, o, r[o]), f(n) ? $(J, l, o, (r[o] = e && t ? (e) => $(n, i, e) : S(n, i))) : delete r[o]
            })
        }
        function Kt(e) {
          return !this(e)
        }
        $(V, [O, P], (e) => {
          e = e[_]
          for (let t = 0, n = ge(e); t < n.length; t++) {
            const o = n[t],
              r = z(e, o)
            Q(r, null), ((f(r.value) ? Pt : jt)[o] = r)
          }
        }),
          (le = null)
        const Wt = ["displayName", "id"],
          Bt = (() => {
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
          zt = "resources",
          Xt = () => Ee.call("UA"),
          Qt = (e) => Ee.promise("UAH", e),
          Yt = () => Ee.uad && m(Ee.call("UAD"), "getHighEntropyValues", Qt),
          Zt = () => Ee.post("TabClose"),
          en = () => Ee.post("TabFocus")
        function tn(e) {
          const { meta: t } = e,
            { grant: n } = t,
            o = Q(t[zt], null),
            l = v({ [zt]: o, resCache: C(), async: !1 }, e, Wt),
            s = e.gmi,
            a = C(),
            u = { __proto__: null, GM: a, unsafeWindow: r }
          let c,
            d,
            f = n.length
          1 === f && "none" === n[0] && (f = 0),
            W(u, Bt),
            p(() => {
              Q(s, null)
              const e = (t[zt] = Y(o))
              for (let t, n = 0; n < e.length; n++) (t = e[n]), (e[n] = { name: t, url: o[t] })
              return (
                W(s, Ee.gmi),
                (s.injectInto = Ee.mode),
                (s.platform = pt(Ee.ua)),
                (s.script = t),
                (s.scriptHandler = i),
                (s.version = "2.27.0"),
                m(s, "userAgent", Xt, !0, "get"),
                m(s, "userAgentData", Yt, !0, "get"),
                p(s),
                Q(s, ft)
              )
            }, "get")
          for (let e = 0; e < n.length; e++) {
            let t,
              o,
              r,
              i,
              s = n[e]
            ;("GM." === $(re, s, 0, 3) && (i = $(re, s, 3)) && (o = Ct[i])) ||
            (t = kt[(r = i ? `GM_${i}` : s)]) ||
            ((t = Vt[r]) && (!i || (o = t)))
              ? (t = S(o || t, o ? c || (c = W(C(), l, { async: !0 })) : l))
              : !(t = St[r]) && (t = ("window.close" === s && Zt) || ("window.focus" === s && en)) && (s = $(re, s, 7)),
              t && (i ? (a[i] = t) : (u[s] = t))
          }
          return f && ((d = Dt(u)), (u.c = u)), { gm: u, wrapper: d }
          function p(e, t) {
            m(u, "GM_info", e, !0, t), m(a, "info", e, !0, t)
          }
        }
        const nn = C()
        function on(n, o) {
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
              J,
              l,
              t + "*",
              (e) => {
                ;(e = $(we, e)), je(e[0], e[1], Ee)
              },
              { __proto__: null, once: !0, capture: !0 }
            ),
            $(q, l, new T(t)),
            (Ee.mode = "page"),
            $e({
              WriteVault(e) {
                this[e] = xe
              },
            }),
            !e)
          ) {
            for (let e = 0; e < Ne.length; e++) {
              const t = Ne[e]
              fe[t] = (...e) => Ee.post("Log", [t, e])
            }
            kt.GM_log = function (...e) {
              Ee.post("Log", ["log", ut([`[${this.displayName}]`], e)])
            }
          }
        }
        function rn(e) {
          const t = nn[e.name],
            n = $(ve, document),
            { gm: o, wrapper: i = r } = tn(t)
          delete l[t.key.win], n && $(oe, n), Ee.post("Run", t.id), $(e, i, o, fe.error)
        }
        $e({
          Command({ id: e, key: t, evt: n }) {
            var o
            null == (o = Re[e]) || null == (o = o[t]) || o.cb(new (n.key ? A : I)(n.type, n))
          },
          Callback({ id: e, data: t }) {
            if ("Error" === e) throw t
            const n = Ce[e]
            delete Ce[e], n && $(n, this, t)
          },
          async Plant({ data: e, win: t }) {
            m(l, t, rn, !0, "set"), await 0, delete nn[e], delete l[t]
          },
          ScriptData({ info: n, items: o }) {
            n && W(Ee, n)
            const r = []
            for (let e = 0; e < o.length; e++) {
              const n = o[e],
                { key: i } = n
              if (((nn[i.data] = n), (Oe[n.id] = Q(n.values || {}, null)), !t)) {
                const e = i.win,
                  t = l[e]
                t ? (G(r, t), delete l[e]) : B(l, e, { __proto__: null, configurable: !0, set: rn })
              }
            }
            t ? e && Ee.post("InjectList", o[0].runAt) : $(V, r, rn)
          },
          Expose(e) {
            const t = "external",
              n = l[t]
            ;(p(n) ? n : (l[t] = {}))[i] = {
              version: "2.27.0",
              isInstalled: (t, n) => (e ? Ee.promise("GetScriptVer", { meta: { name: t, namespace: n } }) : b()),
            }
          },
        }),
          (o.exports = pe)
      })()
      const { exports: Ge } = o
      return Ge.__esModule ? Ge.default : Ge
    })
}
