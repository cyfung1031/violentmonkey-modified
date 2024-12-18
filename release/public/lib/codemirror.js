;(self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || []).push([
  [921],
  {
    7829: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t = {},
          n = /[^\s\u00a0]/,
          r = e.Pos,
          i = e.cmpPos
        function o(e) {
          var t = e.search(n)
          return -1 == t ? 0 : t
        }
        function a(e, t, n) {
          return /\bstring\b/.test(e.getTokenTypeAt(r(t.line, 0))) && !/^[\'\"\`]/.test(n)
        }
        function l(e, t) {
          var n = e.getMode()
          return !1 !== n.useInnerComments && n.innerMode ? e.getModeAt(t) : n
        }
        ;(e.commands.toggleComment = function (e) {
          e.toggleComment()
        }),
          e.defineExtension("toggleComment", function (e) {
            e || (e = t)
            for (var n = this, i = 1 / 0, o = this.listSelections(), a = null, l = o.length - 1; l >= 0; l--) {
              var s = o[l].from(),
                c = o[l].to()
              s.line >= i ||
                (c.line >= i && (c = r(i, 0)),
                (i = s.line),
                null == a
                  ? n.uncomment(s, c, e)
                    ? (a = "un")
                    : (n.lineComment(s, c, e), (a = "line"))
                  : "un" == a
                    ? n.uncomment(s, c, e)
                    : n.lineComment(s, c, e))
            }
          }),
          e.defineExtension("lineComment", function (e, i, s) {
            s || (s = t)
            var c = this,
              u = l(c, e),
              f = c.getLine(e.line)
            if (null != f && !a(c, e, f)) {
              var h = s.lineComment || u.lineComment
              if (h) {
                var d = Math.min(0 != i.ch || i.line == e.line ? i.line + 1 : i.line, c.lastLine() + 1),
                  p = null == s.padding ? " " : s.padding,
                  g = s.commentBlankLines || e.line == i.line
                c.operation(function () {
                  if (s.indent) {
                    for (var t = null, i = e.line; i < d; ++i) {
                      var a = -1 === (l = c.getLine(i)).search(n) ? l : l.slice(0, o(l))
                      ;(null == t || t.length > a.length) && (t = a)
                    }
                    for (i = e.line; i < d; ++i) {
                      var l = c.getLine(i),
                        u = t.length
                      ;(g || n.test(l)) &&
                        (l.slice(0, u) != t && (u = o(l)), c.replaceRange(t + h + p, r(i, 0), r(i, u)))
                    }
                  } else for (i = e.line; i < d; ++i) (g || n.test(c.getLine(i))) && c.replaceRange(h + p, r(i, 0))
                })
              } else (s.blockCommentStart || u.blockCommentStart) && ((s.fullLines = !0), c.blockComment(e, i, s))
            }
          }),
          e.defineExtension("blockComment", function (e, o, a) {
            a || (a = t)
            var s = this,
              c = l(s, e),
              u = a.blockCommentStart || c.blockCommentStart,
              f = a.blockCommentEnd || c.blockCommentEnd
            if (u && f) {
              if (!/\bcomment\b/.test(s.getTokenTypeAt(r(e.line, 0)))) {
                var h = Math.min(o.line, s.lastLine())
                h != e.line && 0 == o.ch && n.test(s.getLine(h)) && --h
                var d = null == a.padding ? " " : a.padding
                e.line > h ||
                  s.operation(function () {
                    if (0 != a.fullLines) {
                      var t = n.test(s.getLine(h))
                      s.replaceRange(d + f, r(h)), s.replaceRange(u + d, r(e.line, 0))
                      var l = a.blockCommentLead || c.blockCommentLead
                      if (null != l)
                        for (var p = e.line + 1; p <= h; ++p) (p != h || t) && s.replaceRange(l + d, r(p, 0))
                    } else {
                      var g = 0 == i(s.getCursor("to"), o),
                        m = !s.somethingSelected()
                      s.replaceRange(f, o), g && s.setSelection(m ? o : s.getCursor("from"), o), s.replaceRange(u, e)
                    }
                  })
              }
            } else (a.lineComment || c.lineComment) && 0 != a.fullLines && s.lineComment(e, o, a)
          }),
          e.defineExtension("uncomment", function (e, i, o) {
            o || (o = t)
            var a,
              s = this,
              c = l(s, e),
              u = Math.min(0 != i.ch || i.line == e.line ? i.line : i.line - 1, s.lastLine()),
              f = Math.min(e.line, u),
              h = o.lineComment || c.lineComment,
              d = [],
              p = null == o.padding ? " " : o.padding
            e: if (h) {
              for (var g = f; g <= u; ++g) {
                var m = s.getLine(g),
                  v = m.indexOf(h)
                if ((v > -1 && !/comment/.test(s.getTokenTypeAt(r(g, v + 1))) && (v = -1), -1 == v && n.test(m)))
                  break e
                if (v > -1 && n.test(m.slice(0, v))) break e
                d.push(m)
              }
              if (
                (s.operation(function () {
                  for (var e = f; e <= u; ++e) {
                    var t = d[e - f],
                      n = t.indexOf(h),
                      i = n + h.length
                    n < 0 ||
                      (t.slice(i, i + p.length) == p && (i += p.length), (a = !0), s.replaceRange("", r(e, n), r(e, i)))
                  }
                }),
                a)
              )
                return !0
            }
            var y = o.blockCommentStart || c.blockCommentStart,
              b = o.blockCommentEnd || c.blockCommentEnd
            if (!y || !b) return !1
            var w = o.blockCommentLead || c.blockCommentLead,
              x = s.getLine(f),
              k = x.indexOf(y)
            if (-1 == k) return !1
            var C = u == f ? x : s.getLine(u),
              S = C.indexOf(b, u == f ? k + y.length : 0),
              L = r(f, k + 1),
              T = r(u, S + 1)
            if (
              -1 == S ||
              !/comment/.test(s.getTokenTypeAt(L)) ||
              !/comment/.test(s.getTokenTypeAt(T)) ||
              s.getRange(L, T, "\n").indexOf(b) > -1
            )
              return !1
            var M = x.lastIndexOf(y, e.ch),
              A = -1 == M ? -1 : x.slice(0, e.ch).indexOf(b, M + y.length)
            if (-1 != M && -1 != A && A + b.length != e.ch) return !1
            A = C.indexOf(b, i.ch)
            var O = C.slice(i.ch).lastIndexOf(y, A - i.ch)
            return (
              (M = -1 == A || -1 == O ? -1 : i.ch + O),
              (-1 == A || -1 == M || M == i.ch) &&
                (s.operation(function () {
                  s.replaceRange("", r(u, S - (p && C.slice(S - p.length, S) == p ? p.length : 0)), r(u, S + b.length))
                  var e = k + y.length
                  if ((p && x.slice(e, e + p.length) == p && (e += p.length), s.replaceRange("", r(f, k), r(f, e)), w))
                    for (var t = f + 1; t <= u; ++t) {
                      var i = s.getLine(t),
                        o = i.indexOf(w)
                      if (-1 != o && !n.test(i.slice(0, o))) {
                        var a = o + w.length
                        p && i.slice(a, a + p.length) == p && (a += p.length), s.replaceRange("", r(t, o), r(t, a))
                      }
                    }
                }),
                !0)
            )
          })
      })(n(5237))
    },
    998: (e, t, n) => {
      !(function (e) {
        var t = /\S/g,
          n =
            String.prototype.repeat ||
            function (e) {
              return Array(e + 1).join(this)
            }
        function r(t) {
          if (t.getOption("disableInput")) return e.Pass
          for (var r, a = t.listSelections(), l = [], s = 0; s < a.length; s++) {
            var c = a[s].head
            if (!/\bcomment\b/.test(t.getTokenTypeAt(c))) return e.Pass
            var u = t.getModeAt(c)
            if (r) {
              if (r != u) return e.Pass
            } else r = u
            var f,
              h,
              d = null,
              p = r.blockCommentStart,
              g = r.lineComment
            if (p && r.blockCommentContinue) {
              var m = (f = t.getLine(c.line)).lastIndexOf(r.blockCommentEnd, c.ch - r.blockCommentEnd.length)
              if (
                (-1 != m && m == c.ch - r.blockCommentEnd.length) ||
                (g &&
                  (h = f.lastIndexOf(g, c.ch - 1)) > -1 &&
                  /\bcomment\b/.test(t.getTokenTypeAt({ line: c.line, ch: h + 1 })))
              );
              else if (c.ch >= p.length && (h = f.lastIndexOf(p, c.ch - p.length)) > -1 && h > m)
                if (i(0, f) >= h) d = f.slice(0, h)
                else {
                  var v,
                    y = t.options.tabSize
                  ;(h = e.countColumn(f, h, y)),
                    (d = t.options.indentWithTabs
                      ? n.call("\t", (v = Math.floor(h / y))) + n.call(" ", h - y * v)
                      : n.call(" ", h))
                }
              else (h = f.indexOf(r.blockCommentContinue)) > -1 && h <= c.ch && h <= i(0, f) && (d = f.slice(0, h))
              null != d && (d += r.blockCommentContinue)
            }
            if (null == d && g && o(t))
              if ((null == f && (f = t.getLine(c.line)), (h = f.indexOf(g)), c.ch || h)) {
                if (h > -1 && i(0, f) >= h) {
                  if (!(d = i(c.ch, f) > -1)) {
                    var b = t.getLine(c.line + 1) || "",
                      w = b.indexOf(g)
                    d = (w > -1 && i(0, b) >= w) || null
                  }
                  d && (d = f.slice(0, h) + g + f.slice(h + g.length).match(/^\s*/)[0])
                }
              } else d = ""
            if (null == d) return e.Pass
            l[s] = "\n" + d
          }
          t.operation(function () {
            for (var e = a.length - 1; e >= 0; e--) t.replaceRange(l[e], a[e].from(), a[e].to(), "+insert")
          })
        }
        function i(e, n) {
          t.lastIndex = e
          var r = t.exec(n)
          return r ? r.index : -1
        }
        function o(e) {
          var t = e.getOption("continueComments")
          return !t || "object" != typeof t || !1 !== t.continueLineComment
        }
        e.defineOption("continueComments", null, function (t, n, i) {
          if ((i && i != e.Init && t.removeKeyMap("continueComment"), n)) {
            var o = "Enter"
            "string" == typeof n ? (o = n) : "object" == typeof n && n.key && (o = n.key)
            var a = { name: "continueComment" }
            ;(a[o] = r), t.addKeyMap(a)
          }
        })
      })(n(5237))
    },
    5218: (e, t, n) => {
      !(function (e) {
        var t = { pairs: "()[]{}''\"\"", closeBefore: ")]}'\":;>", triples: "", explode: "[]{}" },
          n = e.Pos
        function r(e, n) {
          return "pairs" == n && "string" == typeof e ? e : "object" == typeof e && null != e[n] ? e[n] : t[n]
        }
        e.defineOption("autoCloseBrackets", !1, function (t, n, a) {
          a && a != e.Init && (t.removeKeyMap(i), (t.state.closeBrackets = null)),
            n && (o(r(n, "pairs")), (t.state.closeBrackets = n), t.addKeyMap(i))
        })
        var i = { Backspace: s, Enter: c }
        function o(e) {
          for (var t = 0; t < e.length; t++) {
            var n = e.charAt(t),
              r = "'" + n + "'"
            i[r] || (i[r] = a(n))
          }
        }
        function a(e) {
          return function (t) {
            return h(t, e)
          }
        }
        function l(e) {
          var t = e.state.closeBrackets
          return !t || t.override ? t : e.getModeAt(e.getCursor()).closeBrackets || t
        }
        function s(t) {
          var i = l(t)
          if (!i || t.getOption("disableInput")) return e.Pass
          for (var o = r(i, "pairs"), a = t.listSelections(), s = 0; s < a.length; s++) {
            if (!a[s].empty()) return e.Pass
            var c = d(t, a[s].head)
            if (!c || o.indexOf(c) % 2 != 0) return e.Pass
          }
          for (s = a.length - 1; s >= 0; s--) {
            var u = a[s].head
            t.replaceRange("", n(u.line, u.ch - 1), n(u.line, u.ch + 1), "+delete")
          }
        }
        function c(t) {
          var n = l(t),
            i = n && r(n, "explode")
          if (!i || t.getOption("disableInput")) return e.Pass
          for (var o = t.listSelections(), a = 0; a < o.length; a++) {
            if (!o[a].empty()) return e.Pass
            var s = d(t, o[a].head)
            if (!s || i.indexOf(s) % 2 != 0) return e.Pass
          }
          t.operation(function () {
            var e = t.lineSeparator() || "\n"
            t.replaceSelection(e + e, null), u(t, -1), (o = t.listSelections())
            for (var n = 0; n < o.length; n++) {
              var r = o[n].head.line
              t.indentLine(r, null, !0), t.indentLine(r + 1, null, !0)
            }
          })
        }
        function u(e, t) {
          for (var n = [], r = e.listSelections(), i = 0, o = 0; o < r.length; o++) {
            var a = r[o]
            a.head == e.getCursor() && (i = o)
            var l = a.head.ch || t > 0 ? { line: a.head.line, ch: a.head.ch + t } : { line: a.head.line - 1 }
            n.push({ anchor: l, head: l })
          }
          e.setSelections(n, i)
        }
        function f(t) {
          var r = e.cmpPos(t.anchor, t.head) > 0
          return {
            anchor: new n(t.anchor.line, t.anchor.ch + (r ? -1 : 1)),
            head: new n(t.head.line, t.head.ch + (r ? 1 : -1)),
          }
        }
        function h(t, i) {
          var o = l(t)
          if (!o || t.getOption("disableInput")) return e.Pass
          var a = r(o, "pairs"),
            s = a.indexOf(i)
          if (-1 == s) return e.Pass
          for (
            var c,
              h = r(o, "closeBefore"),
              d = r(o, "triples"),
              g = a.charAt(s + 1) == i,
              m = t.listSelections(),
              v = s % 2 == 0,
              y = 0;
            y < m.length;
            y++
          ) {
            var b,
              w = m[y],
              x = w.head,
              k = t.getRange(x, n(x.line, x.ch + 1))
            if (v && !w.empty()) b = "surround"
            else if ((!g && v) || k != i)
              if (g && x.ch > 1 && d.indexOf(i) >= 0 && t.getRange(n(x.line, x.ch - 2), x) == i + i) {
                if (x.ch > 2 && /\bstring/.test(t.getTokenTypeAt(n(x.line, x.ch - 2)))) return e.Pass
                b = "addFour"
              } else if (g) {
                var C = 0 == x.ch ? " " : t.getRange(n(x.line, x.ch - 1), x)
                if (e.isWordChar(k) || C == i || e.isWordChar(C)) return e.Pass
                b = "both"
              } else {
                if (!v || !(0 === k.length || /\s/.test(k) || h.indexOf(k) > -1)) return e.Pass
                b = "both"
              }
            else
              b =
                g && p(t, x)
                  ? "both"
                  : d.indexOf(i) >= 0 && t.getRange(x, n(x.line, x.ch + 3)) == i + i + i
                    ? "skipThree"
                    : "skip"
            if (c) {
              if (c != b) return e.Pass
            } else c = b
          }
          var S = s % 2 ? a.charAt(s - 1) : i,
            L = s % 2 ? i : a.charAt(s + 1)
          t.operation(function () {
            if ("skip" == c) u(t, 1)
            else if ("skipThree" == c) u(t, 3)
            else if ("surround" == c) {
              for (var e = t.getSelections(), n = 0; n < e.length; n++) e[n] = S + e[n] + L
              for (t.replaceSelections(e, "around"), e = t.listSelections().slice(), n = 0; n < e.length; n++)
                e[n] = f(e[n])
              t.setSelections(e)
            } else
              "both" == c
                ? (t.replaceSelection(S + L, null), t.triggerElectric(S + L), u(t, -1))
                : "addFour" == c && (t.replaceSelection(S + S + S + S, "before"), u(t, 1))
          })
        }
        function d(e, t) {
          var r = e.getRange(n(t.line, t.ch - 1), n(t.line, t.ch + 1))
          return 2 == r.length ? r : null
        }
        function p(e, t) {
          var r = e.getTokenAt(n(t.line, t.ch + 1))
          return /\bstring/.test(r.type) && r.start == t.ch && (0 == t.ch || !/\bstring/.test(e.getTokenTypeAt(t)))
        }
        o(t.pairs + "`")
      })(n(5237))
    },
    7923: (e, t, n) => {
      !(function (e) {
        var t = /MSIE \d/.test(navigator.userAgent) && (null == document.documentMode || document.documentMode < 8),
          n = e.Pos,
          r = { "(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<", "<": ">>", ">": "<<" }
        function i(e) {
          return (e && e.bracketRegex) || /[(){}[\]]/
        }
        function o(e, t, o) {
          var l = e.getLineHandle(t.line),
            s = t.ch - 1,
            c = o && o.afterCursor
          null == c && (c = /(^| )cm-fat-cursor($| )/.test(e.getWrapperElement().className))
          var u = i(o),
            f =
              (!c && s >= 0 && u.test(l.text.charAt(s)) && r[l.text.charAt(s)]) ||
              (u.test(l.text.charAt(s + 1)) && r[l.text.charAt(++s)])
          if (!f) return null
          var h = ">" == f.charAt(1) ? 1 : -1
          if (o && o.strict && h > 0 != (s == t.ch)) return null
          var d = e.getTokenTypeAt(n(t.line, s + 1)),
            p = a(e, n(t.line, s + (h > 0 ? 1 : 0)), h, d, o)
          return null == p
            ? null
            : { from: n(t.line, s), to: p && p.pos, match: p && p.ch == f.charAt(0), forward: h > 0 }
        }
        function a(e, t, o, a, l) {
          for (
            var s = (l && l.maxScanLineLength) || 1e4,
              c = (l && l.maxScanLines) || 1e3,
              u = [],
              f = i(l),
              h = o > 0 ? Math.min(t.line + c, e.lastLine() + 1) : Math.max(e.firstLine() - 1, t.line - c),
              d = t.line;
            d != h;
            d += o
          ) {
            var p = e.getLine(d)
            if (p) {
              var g = o > 0 ? 0 : p.length - 1,
                m = o > 0 ? p.length : -1
              if (!(p.length > s))
                for (d == t.line && (g = t.ch - (o < 0 ? 1 : 0)); g != m; g += o) {
                  var v = p.charAt(g)
                  if (f.test(v) && (void 0 === a || (e.getTokenTypeAt(n(d, g + 1)) || "") == (a || ""))) {
                    var y = r[v]
                    if (y && (">" == y.charAt(1)) == o > 0) u.push(v)
                    else {
                      if (!u.length) return { pos: n(d, g), ch: v }
                      u.pop()
                    }
                  }
                }
            }
          }
          return d - o != (o > 0 ? e.lastLine() : e.firstLine()) && null
        }
        function l(e, r, i) {
          for (
            var a = e.state.matchBrackets.maxHighlightLineLength || 1e3,
              l = i && i.highlightNonMatching,
              s = [],
              c = e.listSelections(),
              u = 0;
            u < c.length;
            u++
          ) {
            var f = c[u].empty() && o(e, c[u].head, i)
            if (f && (f.match || !1 !== l) && e.getLine(f.from.line).length <= a) {
              var h = f.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket"
              s.push(e.markText(f.from, n(f.from.line, f.from.ch + 1), { className: h })),
                f.to &&
                  e.getLine(f.to.line).length <= a &&
                  s.push(e.markText(f.to, n(f.to.line, f.to.ch + 1), { className: h }))
            }
          }
          if (s.length) {
            t && e.state.focused && e.focus()
            var d = function () {
              e.operation(function () {
                for (var e = 0; e < s.length; e++) s[e].clear()
              })
            }
            if (!r) return d
            setTimeout(d, 800)
          }
        }
        function s(e) {
          e.operation(function () {
            e.state.matchBrackets.currentlyHighlighted &&
              (e.state.matchBrackets.currentlyHighlighted(), (e.state.matchBrackets.currentlyHighlighted = null)),
              (e.state.matchBrackets.currentlyHighlighted = l(e, !1, e.state.matchBrackets))
          })
        }
        function c(e) {
          e.state.matchBrackets &&
            e.state.matchBrackets.currentlyHighlighted &&
            (e.state.matchBrackets.currentlyHighlighted(), (e.state.matchBrackets.currentlyHighlighted = null))
        }
        e.defineOption("matchBrackets", !1, function (t, n, r) {
          r && r != e.Init && (t.off("cursorActivity", s), t.off("focus", s), t.off("blur", c), c(t)),
            n &&
              ((t.state.matchBrackets = "object" == typeof n ? n : {}),
              t.on("cursorActivity", s),
              t.on("focus", s),
              t.on("blur", c))
        }),
          e.defineExtension("matchBrackets", function () {
            l(this, !0)
          }),
          e.defineExtension("findMatchingBracket", function (e, t, n) {
            return (
              (n || "boolean" == typeof t) && (n ? ((n.strict = t), (t = n)) : (t = t ? { strict: !0 } : null)),
              o(this, e, t)
            )
          }),
          e.defineExtension("scanForBracket", function (e, t, n, r) {
            return a(this, e, t, n, r)
          })
      })(n(5237))
    },
    795: (e, t, n) => {
      !(function (e) {
        "use strict"
        function t(t) {
          return function (n, r) {
            var i = r.line,
              o = n.getLine(i)
            function a(t) {
              for (var a, l = r.ch, s = 0; ; ) {
                var c = l <= 0 ? -1 : o.lastIndexOf(t[0], l - 1)
                if (-1 != c) {
                  if (1 == s && c < r.ch) break
                  if (((a = n.getTokenTypeAt(e.Pos(i, c + 1))), !/^(comment|string)/.test(a)))
                    return { ch: c + 1, tokenType: a, pair: t }
                  l = c - 1
                } else {
                  if (1 == s) break
                  ;(s = 1), (l = o.length)
                }
              }
            }
            function l(t) {
              var r,
                o,
                a = 1,
                l = n.lastLine(),
                s = t.ch
              e: for (var c = i; c <= l; ++c)
                for (var u = n.getLine(c), f = c == i ? s : 0; ; ) {
                  var h = u.indexOf(t.pair[0], f),
                    d = u.indexOf(t.pair[1], f)
                  if ((h < 0 && (h = u.length), d < 0 && (d = u.length), (f = Math.min(h, d)) == u.length)) break
                  if (n.getTokenTypeAt(e.Pos(c, f + 1)) == t.tokenType)
                    if (f == h) ++a
                    else if (!--a) {
                      ;(r = c), (o = f)
                      break e
                    }
                  ++f
                }
              return null == r || i == r ? null : { from: e.Pos(i, s), to: e.Pos(r, o) }
            }
            for (var s = [], c = 0; c < t.length; c++) {
              var u = a(t[c])
              u && s.push(u)
            }
            for (
              s.sort(function (e, t) {
                return e.ch - t.ch
              }),
                c = 0;
              c < s.length;
              c++
            ) {
              var f = l(s[c])
              if (f) return f
            }
            return null
          }
        }
        e.registerHelper(
          "fold",
          "brace",
          t([
            ["{", "}"],
            ["[", "]"],
          ])
        ),
          e.registerHelper(
            "fold",
            "brace-paren",
            t([
              ["{", "}"],
              ["[", "]"],
              ["(", ")"],
            ])
          ),
          e.registerHelper("fold", "import", function (t, n) {
            function r(n) {
              if (n < t.firstLine() || n > t.lastLine()) return null
              var r = t.getTokenAt(e.Pos(n, 1))
              if (
                (/\S/.test(r.string) || (r = t.getTokenAt(e.Pos(n, r.end + 1))),
                "keyword" != r.type || "import" != r.string)
              )
                return null
              for (var i = n, o = Math.min(t.lastLine(), n + 10); i <= o; ++i) {
                var a = t.getLine(i).indexOf(";")
                if (-1 != a) return { startCh: r.end, end: e.Pos(i, a) }
              }
            }
            var i,
              o = n.line,
              a = r(o)
            if (!a || r(o - 1) || ((i = r(o - 2)) && i.end.line == o - 1)) return null
            for (var l = a.end; ; ) {
              var s = r(l.line + 1)
              if (null == s) break
              l = s.end
            }
            return { from: t.clipPos(e.Pos(o, a.startCh + 1)), to: l }
          }),
          e.registerHelper("fold", "include", function (t, n) {
            function r(n) {
              if (n < t.firstLine() || n > t.lastLine()) return null
              var r = t.getTokenAt(e.Pos(n, 1))
              return (
                /\S/.test(r.string) || (r = t.getTokenAt(e.Pos(n, r.end + 1))),
                "meta" == r.type && "#include" == r.string.slice(0, 8) ? r.start + 8 : void 0
              )
            }
            var i = n.line,
              o = r(i)
            if (null == o || null != r(i - 1)) return null
            for (var a = i; null != r(a + 1); ) ++a
            return { from: e.Pos(i, o + 1), to: t.clipPos(e.Pos(a)) }
          })
      })(n(5237))
    },
    9257: (e, t, n) => {
      !(function (e) {
        "use strict"
        e.registerGlobalHelper(
          "fold",
          "comment",
          function (e) {
            return e.blockCommentStart && e.blockCommentEnd
          },
          function (t, n) {
            var r = t.getModeAt(n),
              i = r.blockCommentStart,
              o = r.blockCommentEnd
            if (i && o) {
              for (var a, l = n.line, s = t.getLine(l), c = n.ch, u = 0; ; ) {
                var f = c <= 0 ? -1 : s.lastIndexOf(i, c - 1)
                if (-1 != f) {
                  if (1 == u && f < n.ch) return
                  if (
                    /comment/.test(t.getTokenTypeAt(e.Pos(l, f + 1))) &&
                    (0 == f || s.slice(f - o.length, f) == o || !/comment/.test(t.getTokenTypeAt(e.Pos(l, f))))
                  ) {
                    a = f + i.length
                    break
                  }
                  c = f - 1
                } else {
                  if (1 == u) return
                  ;(u = 1), (c = s.length)
                }
              }
              var h,
                d,
                p = 1,
                g = t.lastLine()
              e: for (var m = l; m <= g; ++m)
                for (var v = t.getLine(m), y = m == l ? a : 0; ; ) {
                  var b = v.indexOf(i, y),
                    w = v.indexOf(o, y)
                  if ((b < 0 && (b = v.length), w < 0 && (w = v.length), (y = Math.min(b, w)) == v.length)) break
                  if (y == b) ++p
                  else if (!--p) {
                    ;(h = m), (d = y)
                    break e
                  }
                  ++y
                }
              if (null != h && (l != h || d != a)) return { from: e.Pos(l, a), to: e.Pos(h, d) }
            }
          }
        )
      })(n(5237))
    },
    8948: (e, t, n) => {
      !(function (e) {
        "use strict"
        function t(t, r, o, a) {
          if (o && o.call) {
            var l = o
            o = null
          } else l = i(t, o, "rangeFinder")
          "number" == typeof r && (r = e.Pos(r, 0))
          var s = i(t, o, "minFoldSize")
          function c(e) {
            var n = l(t, r)
            if (!n || n.to.line - n.from.line < s) return null
            if ("fold" === a) return n
            for (var i = t.findMarksAt(n.from), o = 0; o < i.length; ++o)
              if (i[o].__isFold) {
                if (!e) return null
                ;(n.cleared = !0), i[o].clear()
              }
            return n
          }
          var u = c(!0)
          if (i(t, o, "scanUp")) for (; !u && r.line > t.firstLine(); ) (r = e.Pos(r.line - 1, 0)), (u = c(!1))
          if (u && !u.cleared && "unfold" !== a) {
            var f = n(t, o, u)
            e.on(f, "mousedown", function (t) {
              h.clear(), e.e_preventDefault(t)
            })
            var h = t.markText(u.from, u.to, { replacedWith: f, clearOnEnter: i(t, o, "clearOnEnter"), __isFold: !0 })
            h.on("clear", function (n, r) {
              e.signal(t, "unfold", t, n, r)
            }),
              e.signal(t, "fold", t, u.from, u.to)
          }
        }
        function n(e, t, n) {
          var r = i(e, t, "widget")
          if (("function" == typeof r && (r = r(n.from, n.to)), "string" == typeof r)) {
            var o = document.createTextNode(r)
            ;(r = document.createElement("span")).appendChild(o), (r.className = "CodeMirror-foldmarker")
          } else r && (r = r.cloneNode(!0))
          return r
        }
        ;(e.newFoldFunction = function (e, n) {
          return function (r, i) {
            t(r, i, { rangeFinder: e, widget: n })
          }
        }),
          e.defineExtension("foldCode", function (e, n, r) {
            t(this, e, n, r)
          }),
          e.defineExtension("isFolded", function (e) {
            for (var t = this.findMarksAt(e), n = 0; n < t.length; ++n) if (t[n].__isFold) return !0
          }),
          (e.commands.toggleFold = function (e) {
            e.foldCode(e.getCursor())
          }),
          (e.commands.fold = function (e) {
            e.foldCode(e.getCursor(), null, "fold")
          }),
          (e.commands.unfold = function (e) {
            e.foldCode(e.getCursor(), { scanUp: !1 }, "unfold")
          }),
          (e.commands.foldAll = function (t) {
            t.operation(function () {
              for (var n = t.firstLine(), r = t.lastLine(); n <= r; n++) t.foldCode(e.Pos(n, 0), { scanUp: !1 }, "fold")
            })
          }),
          (e.commands.unfoldAll = function (t) {
            t.operation(function () {
              for (var n = t.firstLine(), r = t.lastLine(); n <= r; n++)
                t.foldCode(e.Pos(n, 0), { scanUp: !1 }, "unfold")
            })
          }),
          e.registerHelper("fold", "combine", function () {
            var e = Array.prototype.slice.call(arguments, 0)
            return function (t, n) {
              for (var r = 0; r < e.length; ++r) {
                var i = e[r](t, n)
                if (i) return i
              }
            }
          }),
          e.registerHelper("fold", "auto", function (e, t) {
            for (var n = e.getHelpers(t, "fold"), r = 0; r < n.length; r++) {
              var i = n[r](e, t)
              if (i) return i
            }
          })
        var r = { rangeFinder: e.fold.auto, widget: "\u2194", minFoldSize: 0, scanUp: !1, clearOnEnter: !0 }
        function i(e, t, n) {
          if (t && void 0 !== t[n]) return t[n]
          var i = e.options.foldOptions
          return i && void 0 !== i[n] ? i[n] : r[n]
        }
        e.defineOption("foldOptions", null),
          e.defineExtension("foldOption", function (e, t) {
            return i(this, e, t)
          })
      })(n(5237))
    },
    1274: (e, t, n) => {
      !(function (e) {
        "use strict"
        e.defineOption("foldGutter", !1, function (t, i, o) {
          o &&
            o != e.Init &&
            (t.clearGutter(t.state.foldGutter.options.gutter),
            (t.state.foldGutter = null),
            t.off("gutterClick", c),
            t.off("changes", f),
            t.off("viewportChange", h),
            t.off("fold", d),
            t.off("unfold", d),
            t.off("swapDoc", f),
            t.off("optionChange", u)),
            i &&
              ((t.state.foldGutter = new n(r(i))),
              s(t),
              t.on("gutterClick", c),
              t.on("changes", f),
              t.on("viewportChange", h),
              t.on("fold", d),
              t.on("unfold", d),
              t.on("swapDoc", f),
              t.on("optionChange", u))
        })
        var t = e.Pos
        function n(e) {
          ;(this.options = e), (this.from = this.to = 0)
        }
        function r(e) {
          return (
            !0 === e && (e = {}),
            null == e.gutter && (e.gutter = "CodeMirror-foldgutter"),
            null == e.indicatorOpen && (e.indicatorOpen = "CodeMirror-foldgutter-open"),
            null == e.indicatorFolded && (e.indicatorFolded = "CodeMirror-foldgutter-folded"),
            e
          )
        }
        function i(e, n) {
          for (var r = e.findMarks(t(n, 0), t(n + 1, 0)), i = 0; i < r.length; ++i)
            if (r[i].__isFold) {
              var o = r[i].find(-1)
              if (o && o.line === n) return r[i]
            }
        }
        function o(e) {
          if ("string" == typeof e) {
            var t = document.createElement("div")
            return (t.className = e + " CodeMirror-guttermarker-subtle"), t
          }
          return e.cloneNode(!0)
        }
        function a(e, n, r) {
          var a = e.state.foldGutter.options,
            s = n - 1,
            c = e.foldOption(a, "minFoldSize"),
            u = e.foldOption(a, "rangeFinder"),
            f = "string" == typeof a.indicatorFolded && l(a.indicatorFolded),
            h = "string" == typeof a.indicatorOpen && l(a.indicatorOpen)
          e.eachLine(n, r, function (n) {
            ++s
            var r = null,
              l = n.gutterMarkers
            if ((l && (l = l[a.gutter]), i(e, s))) {
              if (f && l && f.test(l.className)) return
              r = o(a.indicatorFolded)
            } else {
              var d = t(s, 0),
                p = u && u(e, d)
              if (p && p.to.line - p.from.line >= c) {
                if (h && l && h.test(l.className)) return
                r = o(a.indicatorOpen)
              }
            }
            ;(r || l) && e.setGutterMarker(n, a.gutter, r)
          })
        }
        function l(e) {
          return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
        }
        function s(e) {
          var t = e.getViewport(),
            n = e.state.foldGutter
          n &&
            (e.operation(function () {
              a(e, t.from, t.to)
            }),
            (n.from = t.from),
            (n.to = t.to))
        }
        function c(e, n, r) {
          var o = e.state.foldGutter
          if (o) {
            var a = o.options
            if (r == a.gutter) {
              var l = i(e, n)
              l ? l.clear() : e.foldCode(t(n, 0), a)
            }
          }
        }
        function u(e, t) {
          "mode" == t && f(e)
        }
        function f(e) {
          var t = e.state.foldGutter
          if (t) {
            var n = t.options
            ;(t.from = t.to = 0),
              clearTimeout(t.changeUpdate),
              (t.changeUpdate = setTimeout(function () {
                s(e)
              }, n.foldOnChangeTimeSpan || 600))
          }
        }
        function h(e) {
          var t = e.state.foldGutter
          if (t) {
            var n = t.options
            clearTimeout(t.changeUpdate),
              (t.changeUpdate = setTimeout(function () {
                var n = e.getViewport()
                t.from == t.to || n.from - t.to > 20 || t.from - n.to > 20
                  ? s(e)
                  : e.operation(function () {
                      n.from < t.from && (a(e, n.from, t.from), (t.from = n.from)),
                        n.to > t.to && (a(e, t.to, n.to), (t.to = n.to))
                    })
              }, n.updateViewportTimeSpan || 400))
          }
        }
        function d(e, t) {
          var n = e.state.foldGutter
          if (n) {
            var r = t.line
            r >= n.from && r < n.to && a(e, r, r + 1)
          }
        }
      })(n(5237), n(8948))
    },
    6564: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t = /[\w$]+/,
          n = 500
        e.registerHelper("hint", "anyword", function (r, i) {
          for (
            var o = (i && i.word) || t,
              a = (i && i.range) || n,
              l = r.getCursor(),
              s = r.getLine(l.line),
              c = l.ch,
              u = c;
            u && o.test(s.charAt(u - 1));

          )
            --u
          for (
            var f = u != c && s.slice(u, c), h = (i && i.list) || [], d = {}, p = new RegExp(o.source, "g"), g = -1;
            g <= 1;
            g += 2
          )
            for (var m = l.line, v = Math.min(Math.max(m + g * a, r.firstLine()), r.lastLine()) + g; m != v; m += g)
              for (var y, b = r.getLine(m); (y = p.exec(b)); )
                (m == l.line && y[0] === f) ||
                  (f && 0 != y[0].lastIndexOf(f, 0)) ||
                  Object.prototype.hasOwnProperty.call(d, y[0]) ||
                  ((d[y[0]] = !0), h.push(y[0]))
          return { list: h, from: e.Pos(l.line, u), to: e.Pos(l.line, c) }
        })
      })(n(5237))
    },
    5489: (e, t, n) => {
      !(function (e) {
        var t = e.Pos
        function n(e, t) {
          for (var n = 0, r = e.length; n < r; ++n) t(e[n])
        }
        function r(e, t) {
          if (!Array.prototype.indexOf) {
            for (var n = e.length; n--; ) if (e[n] === t) return !0
            return !1
          }
          return -1 != e.indexOf(t)
        }
        function i(n, r, i, o) {
          var a = n.getCursor(),
            l = i(n, a)
          if (!/\b(?:string|comment)\b/.test(l.type)) {
            var s = e.innerMode(n.getMode(), l.state)
            if ("json" !== s.mode.helperType) {
              ;(l.state = s.state),
                /^[\w$_]*$/.test(l.string)
                  ? l.end > a.ch && ((l.end = a.ch), (l.string = l.string.slice(0, a.ch - l.start)))
                  : (l = {
                      start: a.ch,
                      end: a.ch,
                      string: "",
                      state: l.state,
                      type: "." == l.string ? "property" : null,
                    })
              for (var c = l; "property" == c.type; ) {
                if ("." != (c = i(n, t(a.line, c.start))).string) return
                if (((c = i(n, t(a.line, c.start))), !u)) var u = []
                u.push(c)
              }
              return { list: p(l, u, r, o), from: t(a.line, l.start), to: t(a.line, l.end) }
            }
          }
        }
        function o(e, t) {
          return i(
            e,
            f,
            function (e, t) {
              return e.getTokenAt(t)
            },
            t
          )
        }
        function a(e, t) {
          var n = e.getTokenAt(t)
          return (
            t.ch == n.start + 1 && "." == n.string.charAt(0)
              ? ((n.end = n.start), (n.string = "."), (n.type = "property"))
              : /^\.[\w$_]*$/.test(n.string) &&
                ((n.type = "property"), n.start++, (n.string = n.string.replace(/\./, ""))),
            n
          )
        }
        function l(e, t) {
          return i(e, h, a, t)
        }
        e.registerHelper("hint", "javascript", o), e.registerHelper("hint", "coffeescript", l)
        var s =
            "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(
              " "
            ),
          c =
            "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(
              " "
            ),
          u = "prototype apply call bind".split(" "),
          f =
            "break case catch class const continue debugger default delete do else export extends false finally for function if in import instanceof new null return super switch this throw true try typeof var void while with yield".split(
              " "
            ),
          h =
            "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(
              " "
            )
        function d(e, t) {
          if (Object.getOwnPropertyNames && Object.getPrototypeOf)
            for (var n = e; n; n = Object.getPrototypeOf(n)) Object.getOwnPropertyNames(n).forEach(t)
          else for (var r in e) t(r)
        }
        function p(e, t, i, o) {
          var a = [],
            l = e.string,
            f = (o && o.globalScope) || window
          function h(e) {
            0 != e.lastIndexOf(l, 0) || r(a, e) || a.push(e)
          }
          function p(e) {
            "string" == typeof e ? n(s, h) : e instanceof Array ? n(c, h) : e instanceof Function && n(u, h), d(e, h)
          }
          if (t && t.length) {
            var g,
              m = t.pop()
            for (
              m.type && 0 === m.type.indexOf("variable")
                ? (o && o.additionalContext && (g = o.additionalContext[m.string]),
                  (o && !1 === o.useGlobalScope) || (g = g || f[m.string]))
                : "string" == m.type
                  ? (g = "")
                  : "atom" == m.type
                    ? (g = 1)
                    : "function" == m.type &&
                      (null == f.jQuery || ("$" != m.string && "jQuery" != m.string) || "function" != typeof f.jQuery
                        ? null != f._ && "_" == m.string && "function" == typeof f._ && (g = f._())
                        : (g = f.jQuery()));
              null != g && t.length;

            )
              g = g[t.pop().string]
            null != g && p(g)
          } else {
            for (var v = e.state.localVars; v; v = v.next) h(v.name)
            for (var y = e.state.context; y; y = y.prev) for (v = y.vars; v; v = v.next) h(v.name)
            for (v = e.state.globalVars; v; v = v.next) h(v.name)
            if (o && null != o.additionalContext) for (var b in o.additionalContext) h(b)
            ;(o && !1 === o.useGlobalScope) || p(f), n(i, h)
          }
          return a
        }
      })(n(5237))
    },
    9751: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t = "CodeMirror-hint",
          n = "CodeMirror-hint-active"
        function r(e, t) {
          if (
            ((this.cm = e),
            (this.options = t),
            (this.widget = null),
            (this.debounce = 0),
            (this.tick = 0),
            (this.startPos = this.cm.getCursor("start")),
            (this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length),
            this.options.updateOnCursorActivity)
          ) {
            var n = this
            e.on(
              "cursorActivity",
              (this.activityFunc = function () {
                n.cursorActivity()
              })
            )
          }
        }
        ;(e.showHint = function (e, t, n) {
          if (!t) return e.showHint(n)
          n && n.async && (t.async = !0)
          var r = { hint: t }
          if (n) for (var i in n) r[i] = n[i]
          return e.showHint(r)
        }),
          e.defineExtension("showHint", function (t) {
            t = a(this, this.getCursor("start"), t)
            var n = this.listSelections()
            if (!(n.length > 1)) {
              if (this.somethingSelected()) {
                if (!t.hint.supportsSelection) return
                for (var i = 0; i < n.length; i++) if (n[i].head.line != n[i].anchor.line) return
              }
              this.state.completionActive && this.state.completionActive.close()
              var o = (this.state.completionActive = new r(this, t))
              o.options.hint && (e.signal(this, "startCompletion", this), o.update(!0))
            }
          }),
          e.defineExtension("closeHint", function () {
            this.state.completionActive && this.state.completionActive.close()
          })
        var i =
            window.requestAnimationFrame ||
            function (e) {
              return setTimeout(e, 1e3 / 60)
            },
          o = window.cancelAnimationFrame || clearTimeout
        function a(e, t, n) {
          var r = e.options.hintOptions,
            i = {}
          for (var o in p) i[o] = p[o]
          if (r) for (var o in r) void 0 !== r[o] && (i[o] = r[o])
          if (n) for (var o in n) void 0 !== n[o] && (i[o] = n[o])
          return i.hint.resolve && (i.hint = i.hint.resolve(e, t)), i
        }
        function l(e) {
          return "string" == typeof e ? e : e.text
        }
        function s(e, t) {
          var n = {
            Up: function () {
              t.moveFocus(-1)
            },
            Down: function () {
              t.moveFocus(1)
            },
            PageUp: function () {
              t.moveFocus(1 - t.menuSize(), !0)
            },
            PageDown: function () {
              t.moveFocus(t.menuSize() - 1, !0)
            },
            Home: function () {
              t.setFocus(0)
            },
            End: function () {
              t.setFocus(t.length - 1)
            },
            Enter: t.pick,
            Tab: t.pick,
            Esc: t.close,
          }
          ;/Mac/.test(navigator.platform) &&
            ((n["Ctrl-P"] = function () {
              t.moveFocus(-1)
            }),
            (n["Ctrl-N"] = function () {
              t.moveFocus(1)
            }))
          var r = e.options.customKeys,
            i = r ? {} : n
          function o(e, r) {
            var o
            ;(o =
              "string" != typeof r
                ? function (e) {
                    return r(e, t)
                  }
                : n.hasOwnProperty(r)
                  ? n[r]
                  : r),
              (i[e] = o)
          }
          if (r) for (var a in r) r.hasOwnProperty(a) && o(a, r[a])
          var l = e.options.extraKeys
          if (l) for (var a in l) l.hasOwnProperty(a) && o(a, l[a])
          return i
        }
        function c(e, t) {
          for (; t && t != e; ) {
            if ("LI" === t.nodeName.toUpperCase() && t.parentNode == e) return t
            t = t.parentNode
          }
        }
        function u(r, i) {
          ;(this.id = "cm-complete-" + Math.floor(Math.random(1e6))),
            (this.completion = r),
            (this.data = i),
            (this.picked = !1)
          var o = this,
            a = r.cm,
            u = a.getInputField().ownerDocument,
            f = u.defaultView || u.parentWindow,
            h = (this.hints = u.createElement("ul"))
          h.setAttribute("role", "listbox"), h.setAttribute("aria-expanded", "true"), (h.id = this.id)
          var d = r.cm.options.theme
          ;(h.className = "CodeMirror-hints " + d), (this.selectedHint = i.selectedHint || 0)
          for (var p = i.list, g = 0; g < p.length; ++g) {
            var m = h.appendChild(u.createElement("li")),
              v = p[g],
              y = t + (g != this.selectedHint ? "" : " " + n)
            null != v.className && (y = v.className + " " + y),
              (m.className = y),
              g == this.selectedHint && m.setAttribute("aria-selected", "true"),
              (m.id = this.id + "-" + g),
              m.setAttribute("role", "option"),
              v.render ? v.render(m, i, v) : m.appendChild(u.createTextNode(v.displayText || l(v))),
              (m.hintId = g)
          }
          var b = r.options.container || u.body,
            w = a.cursorCoords(r.options.alignWithWord ? i.from : null),
            x = w.left,
            k = w.bottom,
            C = !0,
            S = 0,
            L = 0
          if (b !== u.body) {
            var T =
                -1 !== ["absolute", "relative", "fixed"].indexOf(f.getComputedStyle(b).position) ? b : b.offsetParent,
              M = T.getBoundingClientRect(),
              A = u.body.getBoundingClientRect()
            ;(S = M.left - A.left - T.scrollLeft), (L = M.top - A.top - T.scrollTop)
          }
          ;(h.style.left = x - S + "px"), (h.style.top = k - L + "px")
          var O = f.innerWidth || Math.max(u.body.offsetWidth, u.documentElement.offsetWidth),
            N = f.innerHeight || Math.max(u.body.offsetHeight, u.documentElement.offsetHeight)
          b.appendChild(h),
            a.getInputField().setAttribute("aria-autocomplete", "list"),
            a.getInputField().setAttribute("aria-owns", this.id),
            a.getInputField().setAttribute("aria-activedescendant", this.id + "-" + this.selectedHint)
          var P,
            H = r.options.moveOnOverlap ? h.getBoundingClientRect() : new DOMRect(),
            F = !!r.options.paddingForScrollbar && h.scrollHeight > h.clientHeight + 1
          if (
            (setTimeout(function () {
              P = a.getScrollInfo()
            }),
            H.bottom - N > 0)
          ) {
            var D = H.bottom - H.top,
              W = H.top - (w.bottom - w.top) - 2
            N - H.top < W
              ? (D > W && (h.style.height = (D = W) + "px"), (h.style.top = (k = w.top - D) + L + "px"), (C = !1))
              : (h.style.height = N - H.top - 2 + "px")
          }
          var E,
            z = H.right - O
          if (
            (F && (z += a.display.nativeBarWidth),
            z > 0 &&
              (H.right - H.left > O && ((h.style.width = O - 5 + "px"), (z -= H.right - H.left - O)),
              (h.style.left = (x = Math.max(w.left - z - S, 0)) + "px")),
            F)
          )
            for (var I = h.firstChild; I; I = I.nextSibling) I.style.paddingRight = a.display.nativeBarWidth + "px"
          a.addKeyMap(
            (this.keyMap = s(r, {
              moveFocus: function (e, t) {
                o.changeActive(o.selectedHint + e, t)
              },
              setFocus: function (e) {
                o.changeActive(e)
              },
              menuSize: function () {
                return o.screenAmount()
              },
              length: p.length,
              close: function () {
                r.close()
              },
              pick: function () {
                o.pick()
              },
              data: i,
            }))
          ),
            r.options.closeOnUnfocus &&
              (a.on(
                "blur",
                (this.onBlur = function () {
                  E = setTimeout(function () {
                    r.close()
                  }, 100)
                })
              ),
              a.on(
                "focus",
                (this.onFocus = function () {
                  clearTimeout(E)
                })
              )),
            a.on(
              "scroll",
              (this.onScroll = function () {
                var e = a.getScrollInfo(),
                  t = a.getWrapperElement().getBoundingClientRect()
                P || (P = a.getScrollInfo())
                var n = k + P.top - e.top,
                  i = n - (f.pageYOffset || (u.documentElement || u.body).scrollTop)
                if ((C || (i += h.offsetHeight), i <= t.top || i >= t.bottom)) return r.close()
                ;(h.style.top = n + "px"), (h.style.left = x + P.left - e.left + "px")
              })
            ),
            e.on(h, "dblclick", function (e) {
              var t = c(h, e.target || e.srcElement)
              t && null != t.hintId && (o.changeActive(t.hintId), o.pick())
            }),
            e.on(h, "click", function (e) {
              var t = c(h, e.target || e.srcElement)
              t && null != t.hintId && (o.changeActive(t.hintId), r.options.completeOnSingleClick && o.pick())
            }),
            e.on(h, "mousedown", function () {
              setTimeout(function () {
                a.focus()
              }, 20)
            })
          var B = this.getSelectedHintRange()
          return (
            (0 === B.from && 0 === B.to) || this.scrollToActive(),
            e.signal(i, "select", p[this.selectedHint], h.childNodes[this.selectedHint]),
            !0
          )
        }
        function f(e, t) {
          if (!e.somethingSelected()) return t
          for (var n = [], r = 0; r < t.length; r++) t[r].supportsSelection && n.push(t[r])
          return n
        }
        function h(e, t, n, r) {
          if (e.async) e(t, r, n)
          else {
            var i = e(t, n)
            i && i.then ? i.then(r) : r(i)
          }
        }
        function d(t, n) {
          var r,
            i = t.getHelpers(n, "hint")
          if (i.length) {
            var o = function (e, t, n) {
              var r = f(e, i)
              function o(i) {
                if (i == r.length) return t(null)
                h(r[i], e, n, function (e) {
                  e && e.list.length > 0 ? t(e) : o(i + 1)
                })
              }
              o(0)
            }
            return (o.async = !0), (o.supportsSelection = !0), o
          }
          return (r = t.getHelper(t.getCursor(), "hintWords"))
            ? function (t) {
                return e.hint.fromList(t, { words: r })
              }
            : e.hint.anyword
              ? function (t, n) {
                  return e.hint.anyword(t, n)
                }
              : function () {}
        }
        ;(r.prototype = {
          close: function () {
            this.active() &&
              ((this.cm.state.completionActive = null),
              (this.tick = null),
              this.options.updateOnCursorActivity && this.cm.off("cursorActivity", this.activityFunc),
              this.widget && this.data && e.signal(this.data, "close"),
              this.widget && this.widget.close(),
              e.signal(this.cm, "endCompletion", this.cm))
          },
          active: function () {
            return this.cm.state.completionActive == this
          },
          pick: function (t, n) {
            var r = t.list[n],
              i = this
            this.cm.operation(function () {
              r.hint ? r.hint(i.cm, t, r) : i.cm.replaceRange(l(r), r.from || t.from, r.to || t.to, "complete"),
                e.signal(t, "pick", r),
                i.cm.scrollIntoView()
            }),
              this.options.closeOnPick && this.close()
          },
          cursorActivity: function () {
            this.debounce && (o(this.debounce), (this.debounce = 0))
            var e = this.startPos
            this.data && (e = this.data.from)
            var t = this.cm.getCursor(),
              n = this.cm.getLine(t.line)
            if (
              t.line != this.startPos.line ||
              n.length - t.ch != this.startLen - this.startPos.ch ||
              t.ch < e.ch ||
              this.cm.somethingSelected() ||
              !t.ch ||
              this.options.closeCharacters.test(n.charAt(t.ch - 1))
            )
              this.close()
            else {
              var r = this
              ;(this.debounce = i(function () {
                r.update()
              })),
                this.widget && this.widget.disable()
            }
          },
          update: function (e) {
            if (null != this.tick) {
              var t = this,
                n = ++this.tick
              h(this.options.hint, this.cm, this.options, function (r) {
                t.tick == n && t.finishUpdate(r, e)
              })
            }
          },
          finishUpdate: function (t, n) {
            this.data && e.signal(this.data, "update")
            var r = (this.widget && this.widget.picked) || (n && this.options.completeSingle)
            this.widget && this.widget.close(),
              (this.data = t),
              t &&
                t.list.length &&
                (r && 1 == t.list.length ? this.pick(t, 0) : ((this.widget = new u(this, t)), e.signal(t, "shown")))
          },
        }),
          (u.prototype = {
            close: function () {
              if (this.completion.widget == this) {
                ;(this.completion.widget = null),
                  this.hints.parentNode && this.hints.parentNode.removeChild(this.hints),
                  this.completion.cm.removeKeyMap(this.keyMap)
                var e = this.completion.cm.getInputField()
                e.removeAttribute("aria-activedescendant"), e.removeAttribute("aria-owns")
                var t = this.completion.cm
                this.completion.options.closeOnUnfocus && (t.off("blur", this.onBlur), t.off("focus", this.onFocus)),
                  t.off("scroll", this.onScroll)
              }
            },
            disable: function () {
              this.completion.cm.removeKeyMap(this.keyMap)
              var e = this
              ;(this.keyMap = {
                Enter: function () {
                  e.picked = !0
                },
              }),
                this.completion.cm.addKeyMap(this.keyMap)
            },
            pick: function () {
              this.completion.pick(this.data, this.selectedHint)
            },
            changeActive: function (t, r) {
              if (
                (t >= this.data.list.length
                  ? (t = r ? this.data.list.length - 1 : 0)
                  : t < 0 && (t = r ? 0 : this.data.list.length - 1),
                this.selectedHint != t)
              ) {
                var i = this.hints.childNodes[this.selectedHint]
                i && ((i.className = i.className.replace(" " + n, "")), i.removeAttribute("aria-selected")),
                  ((i = this.hints.childNodes[(this.selectedHint = t)]).className += " " + n),
                  i.setAttribute("aria-selected", "true"),
                  this.completion.cm.getInputField().setAttribute("aria-activedescendant", i.id),
                  this.scrollToActive(),
                  e.signal(this.data, "select", this.data.list[this.selectedHint], i)
              }
            },
            scrollToActive: function () {
              var e = this.getSelectedHintRange(),
                t = this.hints.childNodes[e.from],
                n = this.hints.childNodes[e.to],
                r = this.hints.firstChild
              t.offsetTop < this.hints.scrollTop
                ? (this.hints.scrollTop = t.offsetTop - r.offsetTop)
                : n.offsetTop + n.offsetHeight > this.hints.scrollTop + this.hints.clientHeight &&
                  (this.hints.scrollTop = n.offsetTop + n.offsetHeight - this.hints.clientHeight + r.offsetTop)
            },
            screenAmount: function () {
              return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1
            },
            getSelectedHintRange: function () {
              var e = this.completion.options.scrollMargin || 0
              return {
                from: Math.max(0, this.selectedHint - e),
                to: Math.min(this.data.list.length - 1, this.selectedHint + e),
              }
            },
          }),
          e.registerHelper("hint", "auto", { resolve: d }),
          e.registerHelper("hint", "fromList", function (t, n) {
            var r,
              i = t.getCursor(),
              o = t.getTokenAt(i),
              a = e.Pos(i.line, o.start),
              l = i
            o.start < i.ch && /\w/.test(o.string.charAt(i.ch - o.start - 1))
              ? (r = o.string.substr(0, i.ch - o.start))
              : ((r = ""), (a = i))
            for (var s = [], c = 0; c < n.words.length; c++) {
              var u = n.words[c]
              u.slice(0, r.length) == r && s.push(u)
            }
            if (s.length) return { list: s, from: a, to: l }
          }),
          (e.commands.autocomplete = e.showHint)
        var p = {
          hint: e.hint.auto,
          completeSingle: !0,
          alignWithWord: !0,
          closeCharacters: /[\s()\[\]{};:>,]/,
          closeOnPick: !0,
          closeOnUnfocus: !0,
          updateOnCursorActivity: !0,
          completeOnSingleClick: !0,
          container: null,
          customKeys: null,
          extraKeys: null,
          paddingForScrollbar: !0,
          moveOnOverlap: !0,
        }
        e.defineOption("hintOptions", null)
      })(n(5237))
    },
    3004: (e, t, n) => {
      !(function (e) {
        "use strict"
        function t(e, t) {
          function n(e) {
            clearTimeout(r.doRedraw),
              (r.doRedraw = setTimeout(function () {
                r.redraw()
              }, e))
          }
          ;(this.cm = e),
            (this.options = t),
            (this.buttonHeight = t.scrollButtonHeight || e.getOption("scrollButtonHeight")),
            (this.annotations = []),
            (this.doRedraw = this.doUpdate = null),
            (this.div = e.getWrapperElement().appendChild(document.createElement("div"))),
            (this.div.style.cssText = "position: absolute; right: 0; top: 0; z-index: 7; pointer-events: none"),
            this.computeScale()
          var r = this
          e.on(
            "refresh",
            (this.resizeHandler = function () {
              clearTimeout(r.doUpdate),
                (r.doUpdate = setTimeout(function () {
                  r.computeScale() && n(20)
                }, 100))
            })
          ),
            e.on("markerAdded", this.resizeHandler),
            e.on("markerCleared", this.resizeHandler),
            !1 !== t.listenForChanges &&
              e.on(
                "changes",
                (this.changeHandler = function () {
                  n(250)
                })
              )
        }
        e.defineExtension("annotateScrollbar", function (e) {
          return "string" == typeof e && (e = { className: e }), new t(this, e)
        }),
          e.defineOption("scrollButtonHeight", 0),
          (t.prototype.computeScale = function () {
            var e = this.cm,
              t =
                (e.getWrapperElement().clientHeight - e.display.barHeight - 2 * this.buttonHeight) /
                e.getScrollerElement().scrollHeight
            if (t != this.hScale) return (this.hScale = t), !0
          }),
          (t.prototype.update = function (e) {
            ;(this.annotations = e), this.redraw()
          }),
          (t.prototype.redraw = function (e) {
            !1 !== e && this.computeScale()
            var t = this.cm,
              n = this.hScale,
              r = document.createDocumentFragment(),
              i = this.annotations,
              o = t.getOption("lineWrapping"),
              a = o && 1.5 * t.defaultTextHeight(),
              l = null,
              s = null
            function c(e, n) {
              if (l != e.line) {
                ;(l = e.line), (s = t.getLineHandle(e.line))
                var r = t.getLineHandleVisualStart(s)
                r != s && ((l = t.getLineNumber(r)), (s = r))
              }
              return (s.widgets && s.widgets.length) || (o && s.height > a)
                ? t.charCoords(e, "local")[n ? "top" : "bottom"]
                : t.heightAtLine(s, "local") + (n ? 0 : s.height)
            }
            var u = t.lastLine()
            if (t.display.barWidth)
              for (var f, h = 0; h < i.length; h++) {
                var d = i[h]
                if (!(d.to.line > u)) {
                  for (
                    var p = f || c(d.from, !0) * n, g = c(d.to, !1) * n;
                    h < i.length - 1 && !(i[h + 1].to.line > u) && !((f = c(i[h + 1].from, !0) * n) > g + 0.9);

                  )
                    g = c((d = i[++h]).to, !1) * n
                  if (g != p) {
                    var m = Math.max(g - p, 3),
                      v = r.appendChild(document.createElement("div"))
                    ;(v.style.cssText =
                      "position: absolute; right: 0px; width: " +
                      Math.max(t.display.barWidth - 1, 2) +
                      "px; top: " +
                      (p + this.buttonHeight) +
                      "px; height: " +
                      m +
                      "px"),
                      (v.className = this.options.className),
                      d.id && v.setAttribute("annotation-id", d.id)
                  }
                }
              }
            ;(this.div.textContent = ""), this.div.appendChild(r)
          }),
          (t.prototype.clear = function () {
            this.cm.off("refresh", this.resizeHandler),
              this.cm.off("markerAdded", this.resizeHandler),
              this.cm.off("markerCleared", this.resizeHandler),
              this.changeHandler && this.cm.off("changes", this.changeHandler),
              this.div.parentNode.removeChild(this.div)
          })
      })(n(5237))
    },
    6700: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t = {
          style: "matchhighlight",
          minChars: 2,
          delay: 100,
          wordsOnly: !1,
          annotateScrollbar: !1,
          showToken: !1,
          trim: !0,
        }
        function n(e) {
          for (var n in ((this.options = {}), t)) this.options[n] = (e && e.hasOwnProperty(n) ? e : t)[n]
          ;(this.overlay = this.timeout = null), (this.matchesonscroll = null), (this.active = !1)
        }
        function r(e) {
          var t = e.state.matchHighlighter
          ;(t.active || e.hasFocus()) && o(e, t)
        }
        function i(e) {
          var t = e.state.matchHighlighter
          t.active || ((t.active = !0), o(e, t))
        }
        function o(e, t) {
          clearTimeout(t.timeout),
            (t.timeout = setTimeout(function () {
              s(e)
            }, t.options.delay))
        }
        function a(e, t, n, r) {
          var i = e.state.matchHighlighter
          if ((e.addOverlay((i.overlay = f(t, n, r))), i.options.annotateScrollbar && e.showMatchesOnScrollbar)) {
            var o = n
              ? new RegExp(
                  (/\w/.test(t.charAt(0)) ? "\\b" : "") +
                    t.replace(/[\\\[.+*?(){|^$]/g, "\\$&") +
                    (/\w/.test(t.charAt(t.length - 1)) ? "\\b" : "")
                )
              : t
            i.matchesonscroll = e.showMatchesOnScrollbar(o, !1, {
              className: "CodeMirror-selection-highlight-scrollbar",
            })
          }
        }
        function l(e) {
          var t = e.state.matchHighlighter
          t.overlay &&
            (e.removeOverlay(t.overlay),
            (t.overlay = null),
            t.matchesonscroll && (t.matchesonscroll.clear(), (t.matchesonscroll = null)))
        }
        function s(e) {
          e.operation(function () {
            var t = e.state.matchHighlighter
            if ((l(e), e.somethingSelected() || !t.options.showToken)) {
              var n = e.getCursor("from"),
                r = e.getCursor("to")
              if (n.line == r.line && (!t.options.wordsOnly || c(e, n, r))) {
                var i = e.getRange(n, r)
                t.options.trim && (i = i.replace(/^\s+|\s+$/g, "")),
                  i.length >= t.options.minChars && a(e, i, !1, t.options.style)
              }
            } else {
              for (
                var o = !0 === t.options.showToken ? /[\w$]/ : t.options.showToken,
                  s = e.getCursor(),
                  u = e.getLine(s.line),
                  f = s.ch,
                  h = f;
                f && o.test(u.charAt(f - 1));

              )
                --f
              for (; h < u.length && o.test(u.charAt(h)); ) ++h
              f < h && a(e, u.slice(f, h), o, t.options.style)
            }
          })
        }
        function c(e, t, n) {
          if (null !== e.getRange(t, n).match(/^\w+$/)) {
            if (t.ch > 0) {
              var r = { line: t.line, ch: t.ch - 1 }
              if (null === e.getRange(r, t).match(/\W/)) return !1
            }
            return !(
              n.ch < e.getLine(t.line).length &&
              ((r = { line: n.line, ch: n.ch + 1 }), null === e.getRange(n, r).match(/\W/))
            )
          }
          return !1
        }
        function u(e, t) {
          return !(
            (e.start && t.test(e.string.charAt(e.start - 1))) ||
            (e.pos != e.string.length && t.test(e.string.charAt(e.pos)))
          )
        }
        function f(e, t, n) {
          return {
            token: function (r) {
              if (r.match(e) && (!t || u(r, t))) return n
              r.next(), r.skipTo(e.charAt(0)) || r.skipToEnd()
            },
          }
        }
        e.defineOption("highlightSelectionMatches", !1, function (t, o, a) {
          if (
            (a &&
              a != e.Init &&
              (l(t),
              clearTimeout(t.state.matchHighlighter.timeout),
              (t.state.matchHighlighter = null),
              t.off("cursorActivity", r),
              t.off("focus", i)),
            o)
          ) {
            var c = (t.state.matchHighlighter = new n(o))
            t.hasFocus() ? ((c.active = !0), s(t)) : t.on("focus", i), t.on("cursorActivity", r)
          }
        })
      })(n(5237), n(6685))
    },
    6685: (e, t, n) => {
      !(function (e) {
        "use strict"
        function t(e, t, n, r) {
          ;(this.cm = e), (this.options = r)
          var i = { listenForChanges: !1 }
          for (var o in r) i[o] = r[o]
          i.className || (i.className = "CodeMirror-search-match"),
            (this.annotation = e.annotateScrollbar(i)),
            (this.query = t),
            (this.caseFold = n),
            (this.gap = { from: e.firstLine(), to: e.lastLine() + 1 }),
            (this.matches = []),
            (this.update = null),
            this.findMatches(),
            this.annotation.update(this.matches)
          var a = this
          e.on(
            "change",
            (this.changeHandler = function (e, t) {
              a.onChange(t)
            })
          )
        }
        e.defineExtension("showMatchesOnScrollbar", function (e, n, r) {
          return "string" == typeof r && (r = { className: r }), r || (r = {}), new t(this, e, n, r)
        })
        var n = 1e3
        function r(e, t, n) {
          return e <= t ? e : Math.max(t, e + n)
        }
        ;(t.prototype.findMatches = function () {
          if (this.gap) {
            for (var t = 0; t < this.matches.length && !((o = this.matches[t]).from.line >= this.gap.to); t++)
              o.to.line >= this.gap.from && this.matches.splice(t--, 1)
            for (
              var r = this.cm.getSearchCursor(this.query, e.Pos(this.gap.from, 0), {
                  caseFold: this.caseFold,
                  multiline: this.options.multiline,
                }),
                i = (this.options && this.options.maxMatches) || n;
              r.findNext();

            ) {
              var o
              if ((o = { from: r.from(), to: r.to() }).from.line >= this.gap.to) break
              if ((this.matches.splice(t++, 0, o), this.matches.length > i)) break
            }
            this.gap = null
          }
        }),
          (t.prototype.onChange = function (t) {
            var n = t.from.line,
              i = e.changeEnd(t).line,
              o = i - t.to.line
            if (
              (this.gap
                ? ((this.gap.from = Math.min(r(this.gap.from, n, o), t.from.line)),
                  (this.gap.to = Math.max(r(this.gap.to, n, o), t.from.line)))
                : (this.gap = { from: t.from.line, to: i + 1 }),
              o)
            )
              for (var a = 0; a < this.matches.length; a++) {
                var l = this.matches[a],
                  s = r(l.from.line, n, o)
                s != l.from.line && (l.from = e.Pos(s, l.from.ch))
                var c = r(l.to.line, n, o)
                c != l.to.line && (l.to = e.Pos(c, l.to.ch))
              }
            clearTimeout(this.update)
            var u = this
            this.update = setTimeout(function () {
              u.updateAfterChange()
            }, 250)
          }),
          (t.prototype.updateAfterChange = function () {
            this.findMatches(), this.annotation.update(this.matches)
          }),
          (t.prototype.clear = function () {
            this.cm.off("change", this.changeHandler), this.annotation.clear()
          })
      })(n(5237), n(3653), n(3004))
    },
    3653: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t,
          n,
          r = e.Pos
        function i(e) {
          var t = e.flags
          return null != t ? t : (e.ignoreCase ? "i" : "") + (e.global ? "g" : "") + (e.multiline ? "m" : "")
        }
        function o(e, t) {
          for (var n = i(e), r = n, o = 0; o < t.length; o++) -1 == r.indexOf(t.charAt(o)) && (r += t.charAt(o))
          return n == r ? e : new RegExp(e.source, r)
        }
        function a(e) {
          return /\\s|\\n|\n|\\W|\\D|\[\^/.test(e.source)
        }
        function l(e, t, n) {
          t = o(t, "g")
          for (var i = n.line, a = n.ch, l = e.lastLine(); i <= l; i++, a = 0) {
            t.lastIndex = a
            var s = e.getLine(i),
              c = t.exec(s)
            if (c) return { from: r(i, c.index), to: r(i, c.index + c[0].length), match: c }
          }
        }
        function s(e, t, n) {
          if (!a(t)) return l(e, t, n)
          t = o(t, "gm")
          for (var i, s = 1, c = n.line, u = e.lastLine(); c <= u; ) {
            for (var f = 0; f < s && !(c > u); f++) {
              var h = e.getLine(c++)
              i = null == i ? h : i + "\n" + h
            }
            ;(s *= 2), (t.lastIndex = n.ch)
            var d = t.exec(i)
            if (d) {
              var p = i.slice(0, d.index).split("\n"),
                g = d[0].split("\n"),
                m = n.line + p.length - 1,
                v = p[p.length - 1].length
              return {
                from: r(m, v),
                to: r(m + g.length - 1, 1 == g.length ? v + g[0].length : g[g.length - 1].length),
                match: d,
              }
            }
          }
        }
        function c(e, t, n) {
          for (var r, i = 0; i <= e.length; ) {
            t.lastIndex = i
            var o = t.exec(e)
            if (!o) break
            var a = o.index + o[0].length
            if (a > e.length - n) break
            ;(!r || a > r.index + r[0].length) && (r = o), (i = o.index + 1)
          }
          return r
        }
        function u(e, t, n) {
          t = o(t, "g")
          for (var i = n.line, a = n.ch, l = e.firstLine(); i >= l; i--, a = -1) {
            var s = e.getLine(i),
              u = c(s, t, a < 0 ? 0 : s.length - a)
            if (u) return { from: r(i, u.index), to: r(i, u.index + u[0].length), match: u }
          }
        }
        function f(e, t, n) {
          if (!a(t)) return u(e, t, n)
          t = o(t, "gm")
          for (var i, l = 1, s = e.getLine(n.line).length - n.ch, f = n.line, h = e.firstLine(); f >= h; ) {
            for (var d = 0; d < l && f >= h; d++) {
              var p = e.getLine(f--)
              i = null == i ? p : p + "\n" + i
            }
            l *= 2
            var g = c(i, t, s)
            if (g) {
              var m = i.slice(0, g.index).split("\n"),
                v = g[0].split("\n"),
                y = f + m.length,
                b = m[m.length - 1].length
              return {
                from: r(y, b),
                to: r(y + v.length - 1, 1 == v.length ? b + v[0].length : v[v.length - 1].length),
                match: g,
              }
            }
          }
        }
        function h(e, t, n, r) {
          if (e.length == t.length) return n
          for (var i = 0, o = n + Math.max(0, e.length - t.length); ; ) {
            if (i == o) return i
            var a = (i + o) >> 1,
              l = r(e.slice(0, a)).length
            if (l == n) return a
            l > n ? (o = a) : (i = a + 1)
          }
        }
        function d(e, i, o, a) {
          if (!i.length) return null
          var l = a ? t : n,
            s = l(i).split(/\r|\n\r?/)
          e: for (var c = o.line, u = o.ch, f = e.lastLine() + 1 - s.length; c <= f; c++, u = 0) {
            var d = e.getLine(c).slice(u),
              p = l(d)
            if (1 == s.length) {
              var g = p.indexOf(s[0])
              if (-1 == g) continue e
              return (
                (o = h(d, p, g, l) + u), { from: r(c, h(d, p, g, l) + u), to: r(c, h(d, p, g + s[0].length, l) + u) }
              )
            }
            var m = p.length - s[0].length
            if (p.slice(m) == s[0]) {
              for (var v = 1; v < s.length - 1; v++) if (l(e.getLine(c + v)) != s[v]) continue e
              var y = e.getLine(c + s.length - 1),
                b = l(y),
                w = s[s.length - 1]
              if (b.slice(0, w.length) == w)
                return { from: r(c, h(d, p, m, l) + u), to: r(c + s.length - 1, h(y, b, w.length, l)) }
            }
          }
        }
        function p(e, i, o, a) {
          if (!i.length) return null
          var l = a ? t : n,
            s = l(i).split(/\r|\n\r?/)
          e: for (var c = o.line, u = o.ch, f = e.firstLine() - 1 + s.length; c >= f; c--, u = -1) {
            var d = e.getLine(c)
            u > -1 && (d = d.slice(0, u))
            var p = l(d)
            if (1 == s.length) {
              var g = p.lastIndexOf(s[0])
              if (-1 == g) continue e
              return { from: r(c, h(d, p, g, l)), to: r(c, h(d, p, g + s[0].length, l)) }
            }
            var m = s[s.length - 1]
            if (p.slice(0, m.length) == m) {
              var v = 1
              for (o = c - s.length + 1; v < s.length - 1; v++) if (l(e.getLine(o + v)) != s[v]) continue e
              var y = e.getLine(c + 1 - s.length),
                b = l(y)
              if (b.slice(b.length - s[0].length) == s[0])
                return { from: r(c + 1 - s.length, h(y, b, y.length - s[0].length, l)), to: r(c, h(d, p, m.length, l)) }
            }
          }
        }
        function g(e, t, n, i) {
          var a
          ;(this.atOccurrence = !1),
            (this.afterEmptyMatch = !1),
            (this.doc = e),
            (n = n ? e.clipPos(n) : r(0, 0)),
            (this.pos = { from: n, to: n }),
            "object" == typeof i ? (a = i.caseFold) : ((a = i), (i = null)),
            "string" == typeof t
              ? (null == a && (a = !1),
                (this.matches = function (n, r) {
                  return (n ? p : d)(e, t, r, a)
                }))
              : ((t = o(t, "gm")),
                i && !1 === i.multiline
                  ? (this.matches = function (n, r) {
                      return (n ? u : l)(e, t, r)
                    })
                  : (this.matches = function (n, r) {
                      return (n ? f : s)(e, t, r)
                    }))
        }
        String.prototype.normalize
          ? ((t = function (e) {
              return e.normalize("NFD").toLowerCase()
            }),
            (n = function (e) {
              return e.normalize("NFD")
            }))
          : ((t = function (e) {
              return e.toLowerCase()
            }),
            (n = function (e) {
              return e
            })),
          (g.prototype = {
            findNext: function () {
              return this.find(!1)
            },
            findPrevious: function () {
              return this.find(!0)
            },
            find: function (t) {
              var n = this.doc.clipPos(t ? this.pos.from : this.pos.to)
              if (
                this.afterEmptyMatch &&
                this.atOccurrence &&
                ((n = r(n.line, n.ch)),
                t
                  ? (n.ch--, n.ch < 0 && (n.line--, (n.ch = (this.doc.getLine(n.line) || "").length)))
                  : (n.ch++, n.ch > (this.doc.getLine(n.line) || "").length && ((n.ch = 0), n.line++)),
                0 != e.cmpPos(n, this.doc.clipPos(n)))
              )
                return (this.atOccurrence = !1)
              var i = this.matches(t, n)
              if (((this.afterEmptyMatch = i && 0 == e.cmpPos(i.from, i.to)), i))
                return (this.pos = i), (this.atOccurrence = !0), this.pos.match || !0
              var o = r(t ? this.doc.firstLine() : this.doc.lastLine() + 1, 0)
              return (this.pos = { from: o, to: o }), (this.atOccurrence = !1)
            },
            from: function () {
              if (this.atOccurrence) return this.pos.from
            },
            to: function () {
              if (this.atOccurrence) return this.pos.to
            },
            replace: function (t, n) {
              if (this.atOccurrence) {
                var i = e.splitLines(t)
                this.doc.replaceRange(i, this.pos.from, this.pos.to, n),
                  (this.pos.to = r(
                    this.pos.from.line + i.length - 1,
                    i[i.length - 1].length + (1 == i.length ? this.pos.from.ch : 0)
                  ))
              }
            },
          }),
          e.defineExtension("getSearchCursor", function (e, t, n) {
            return new g(this.doc, e, t, n)
          }),
          e.defineDocExtension("getSearchCursor", function (e, t, n) {
            return new g(this, e, t, n)
          }),
          e.defineExtension("selectMatches", function (t, n) {
            for (
              var r = [], i = this.getSearchCursor(t, this.getCursor("from"), n);
              i.findNext() && !(e.cmpPos(i.to(), this.getCursor("to")) > 0);

            )
              r.push({ anchor: i.from(), head: i.to() })
            r.length && this.setSelections(r, 0)
          })
      })(n(5237))
    },
    436: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t = "CodeMirror-activeline",
          n = "CodeMirror-activeline-background",
          r = "CodeMirror-activeline-gutter"
        function i(e) {
          for (var i = 0; i < e.state.activeLines.length; i++)
            e.removeLineClass(e.state.activeLines[i], "wrap", t),
              e.removeLineClass(e.state.activeLines[i], "background", n),
              e.removeLineClass(e.state.activeLines[i], "gutter", r)
        }
        function o(e, t) {
          if (e.length != t.length) return !1
          for (var n = 0; n < e.length; n++) if (e[n] != t[n]) return !1
          return !0
        }
        function a(e, a) {
          for (var l = [], s = 0; s < a.length; s++) {
            var c = a[s],
              u = e.getOption("styleActiveLine")
            if ("object" == typeof u && u.nonEmpty ? c.anchor.line == c.head.line : c.empty()) {
              var f = e.getLineHandleVisualStart(c.head.line)
              l[l.length - 1] != f && l.push(f)
            }
          }
          o(e.state.activeLines, l) ||
            e.operation(function () {
              i(e)
              for (var o = 0; o < l.length; o++)
                e.addLineClass(l[o], "wrap", t),
                  e.addLineClass(l[o], "background", n),
                  e.addLineClass(l[o], "gutter", r)
              e.state.activeLines = l
            })
        }
        function l(e, t) {
          a(e, t.ranges)
        }
        e.defineOption("styleActiveLine", !1, function (t, n, r) {
          var o = r != e.Init && r
          n != o &&
            (o && (t.off("beforeSelectionChange", l), i(t), delete t.state.activeLines),
            n && ((t.state.activeLines = []), a(t, t.listSelections()), t.on("beforeSelectionChange", l)))
        })
      })(n(5237))
    },
    8208: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t = e.commands,
          n = e.Pos
        function r(t, r, i) {
          if (i < 0 && 0 == r.ch) return t.clipPos(n(r.line - 1))
          var o = t.getLine(r.line)
          if (i > 0 && r.ch >= o.length) return t.clipPos(n(r.line + 1, 0))
          for (var a, l = "start", s = r.ch, c = s, u = i < 0 ? 0 : o.length, f = 0; c != u; c += i, f++) {
            var h = o.charAt(i < 0 ? c - 1 : c),
              d = "_" != h && e.isWordChar(h) ? "w" : "o"
            if (("w" == d && h.toUpperCase() == h && (d = "W"), "start" == l))
              "o" != d ? ((l = "in"), (a = d)) : (s = c + i)
            else if ("in" == l && a != d) {
              if (("w" == a && "W" == d && i < 0 && c--, "W" == a && "w" == d && i > 0)) {
                if (c == s + 1) {
                  a = "w"
                  continue
                }
                c--
              }
              break
            }
          }
          return n(r.line, c)
        }
        function i(e, t) {
          e.extendSelectionsBy(function (n) {
            return e.display.shift || e.doc.extend || n.empty() ? r(e.doc, n.head, t) : t < 0 ? n.from() : n.to()
          })
        }
        function o(t, r) {
          if (t.isReadOnly()) return e.Pass
          t.operation(function () {
            for (var e = t.listSelections().length, i = [], o = -1, a = 0; a < e; a++) {
              var l = t.listSelections()[a].head
              if (!(l.line <= o)) {
                var s = n(l.line + (r ? 0 : 1), 0)
                t.replaceRange("\n", s, null, "+insertLine"),
                  t.indentLine(s.line, null, !0),
                  i.push({ head: s, anchor: s }),
                  (o = l.line + 1)
              }
            }
            t.setSelections(i)
          }),
            t.execCommand("indentAuto")
        }
        function a(t, r) {
          for (var i = r.ch, o = i, a = t.getLine(r.line); i && e.isWordChar(a.charAt(i - 1)); ) --i
          for (; o < a.length && e.isWordChar(a.charAt(o)); ) ++o
          return { from: n(r.line, i), to: n(r.line, o), word: a.slice(i, o) }
        }
        function l(e, t) {
          for (var n = e.listSelections(), r = [], i = 0; i < n.length; i++) {
            var o = n[i],
              a = e.findPosV(o.anchor, t, "line", o.anchor.goalColumn),
              l = e.findPosV(o.head, t, "line", o.head.goalColumn)
            ;(a.goalColumn = null != o.anchor.goalColumn ? o.anchor.goalColumn : e.cursorCoords(o.anchor, "div").left),
              (l.goalColumn = null != o.head.goalColumn ? o.head.goalColumn : e.cursorCoords(o.head, "div").left)
            var s = { anchor: a, head: l }
            r.push(o), r.push(s)
          }
          e.setSelections(r)
        }
        function s(t, n, r) {
          for (var i = 0; i < t.length; i++) if (0 == e.cmpPos(t[i].from(), n) && 0 == e.cmpPos(t[i].to(), r)) return !0
          return !1
        }
        ;(t.goSubwordLeft = function (e) {
          i(e, -1)
        }),
          (t.goSubwordRight = function (e) {
            i(e, 1)
          }),
          (t.scrollLineUp = function (e) {
            var t = e.getScrollInfo()
            if (!e.somethingSelected()) {
              var n = e.lineAtHeight(t.top + t.clientHeight, "local")
              e.getCursor().line >= n && e.execCommand("goLineUp")
            }
            e.scrollTo(null, t.top - e.defaultTextHeight())
          }),
          (t.scrollLineDown = function (e) {
            var t = e.getScrollInfo()
            if (!e.somethingSelected()) {
              var n = e.lineAtHeight(t.top, "local") + 1
              e.getCursor().line <= n && e.execCommand("goLineDown")
            }
            e.scrollTo(null, t.top + e.defaultTextHeight())
          }),
          (t.splitSelectionByLine = function (e) {
            for (var t = e.listSelections(), r = [], i = 0; i < t.length; i++)
              for (var o = t[i].from(), a = t[i].to(), l = o.line; l <= a.line; ++l)
                (a.line > o.line && l == a.line && 0 == a.ch) ||
                  r.push({ anchor: l == o.line ? o : n(l, 0), head: l == a.line ? a : n(l) })
            e.setSelections(r, 0)
          }),
          (t.singleSelectionTop = function (e) {
            var t = e.listSelections()[0]
            e.setSelection(t.anchor, t.head, { scroll: !1 })
          }),
          (t.selectLine = function (e) {
            for (var t = e.listSelections(), r = [], i = 0; i < t.length; i++) {
              var o = t[i]
              r.push({ anchor: n(o.from().line, 0), head: n(o.to().line + 1, 0) })
            }
            e.setSelections(r)
          }),
          (t.insertLineAfter = function (e) {
            return o(e, !1)
          }),
          (t.insertLineBefore = function (e) {
            return o(e, !0)
          }),
          (t.selectNextOccurrence = function (t) {
            var r = t.getCursor("from"),
              i = t.getCursor("to"),
              o = t.state.sublimeFindFullWord == t.doc.sel
            if (0 == e.cmpPos(r, i)) {
              var l = a(t, r)
              if (!l.word) return
              t.setSelection(l.from, l.to), (o = !0)
            } else {
              var c = t.getRange(r, i),
                u = o ? new RegExp("\\b" + c + "\\b") : c,
                f = t.getSearchCursor(u, i),
                h = f.findNext()
              if (
                (h || (h = (f = t.getSearchCursor(u, n(t.firstLine(), 0))).findNext()),
                !h || s(t.listSelections(), f.from(), f.to()))
              )
                return
              t.addSelection(f.from(), f.to())
            }
            o && (t.state.sublimeFindFullWord = t.doc.sel)
          }),
          (t.skipAndSelectNextOccurrence = function (n) {
            var r = n.getCursor("anchor"),
              i = n.getCursor("head")
            t.selectNextOccurrence(n),
              0 != e.cmpPos(r, i) &&
                n.doc.setSelections(
                  n.doc.listSelections().filter(function (e) {
                    return e.anchor != r || e.head != i
                  })
                )
          }),
          (t.addCursorToPrevLine = function (e) {
            l(e, -1)
          }),
          (t.addCursorToNextLine = function (e) {
            l(e, 1)
          })
        var c = "(){}[]"
        function u(t) {
          for (var r = t.listSelections(), i = [], o = 0; o < r.length; o++) {
            var a = r[o],
              l = a.head,
              s = t.scanForBracket(l, -1)
            if (!s) return !1
            for (;;) {
              var u = t.scanForBracket(l, 1)
              if (!u) return !1
              if (u.ch == c.charAt(c.indexOf(s.ch) + 1)) {
                var f = n(s.pos.line, s.pos.ch + 1)
                if (0 != e.cmpPos(f, a.from()) || 0 != e.cmpPos(u.pos, a.to())) {
                  i.push({ anchor: f, head: u.pos })
                  break
                }
                if (!(s = t.scanForBracket(s.pos, -1))) return !1
              }
              l = n(u.pos.line, u.pos.ch + 1)
            }
          }
          return t.setSelections(i), !0
        }
        function f(e) {
          return e ? (/\bpunctuation\b/.test(e) ? e : void 0) : null
        }
        function h(t, r, i) {
          if (t.isReadOnly()) return e.Pass
          for (var o, a = t.listSelections(), l = [], s = 0; s < a.length; s++) {
            var c = a[s]
            if (!c.empty()) {
              for (var u = c.from().line, f = c.to().line; s < a.length - 1 && a[s + 1].from().line == f; )
                f = a[++s].to().line
              a[s].to().ch || f--, l.push(u, f)
            }
          }
          l.length ? (o = !0) : l.push(t.firstLine(), t.lastLine()),
            t.operation(function () {
              for (var e = [], a = 0; a < l.length; a += 2) {
                var s = l[a],
                  c = l[a + 1],
                  u = n(s, 0),
                  f = n(c),
                  h = t.getRange(u, f, !1)
                r
                  ? h.sort(function (e, t) {
                      return e < t ? -i : e == t ? 0 : i
                    })
                  : h.sort(function (e, t) {
                      var n = e.toUpperCase(),
                        r = t.toUpperCase()
                      return n != r && ((e = n), (t = r)), e < t ? -i : e == t ? 0 : i
                    }),
                  t.replaceRange(h, u, f),
                  o && e.push({ anchor: u, head: n(c + 1, 0) })
              }
              o && t.setSelections(e, 0)
            })
        }
        function d(t, n) {
          t.operation(function () {
            for (var r = t.listSelections(), i = [], o = [], l = 0; l < r.length; l++)
              (c = r[l]).empty() ? (i.push(l), o.push("")) : o.push(n(t.getRange(c.from(), c.to())))
            var s
            for (t.replaceSelections(o, "around", "case"), l = i.length - 1; l >= 0; l--) {
              var c = r[i[l]]
              if (!(s && e.cmpPos(c.head, s) > 0)) {
                var u = a(t, c.head)
                ;(s = u.from), t.replaceRange(n(u.word), u.from, u.to)
              }
            }
          })
        }
        function p(t) {
          var n = t.getCursor("from"),
            r = t.getCursor("to")
          if (0 == e.cmpPos(n, r)) {
            var i = a(t, n)
            if (!i.word) return
            ;(n = i.from), (r = i.to)
          }
          return { from: n, to: r, query: t.getRange(n, r), word: i }
        }
        function g(e, t) {
          var r = p(e)
          if (r) {
            var i = r.query,
              o = e.getSearchCursor(i, t ? r.to : r.from)
            ;(t ? o.findNext() : o.findPrevious())
              ? e.setSelection(o.from(), o.to())
              : ((o = e.getSearchCursor(i, t ? n(e.firstLine(), 0) : e.clipPos(n(e.lastLine())))),
                (t ? o.findNext() : o.findPrevious())
                  ? e.setSelection(o.from(), o.to())
                  : r.word && e.setSelection(r.from, r.to))
          }
        }
        ;(t.selectScope = function (e) {
          u(e) || e.execCommand("selectAll")
        }),
          (t.selectBetweenBrackets = function (t) {
            if (!u(t)) return e.Pass
          }),
          (t.goToBracket = function (t) {
            t.extendSelectionsBy(function (r) {
              var i = t.scanForBracket(r.head, 1, f(t.getTokenTypeAt(r.head)))
              if (i && 0 != e.cmpPos(i.pos, r.head)) return i.pos
              var o = t.scanForBracket(r.head, -1, f(t.getTokenTypeAt(n(r.head.line, r.head.ch + 1))))
              return (o && n(o.pos.line, o.pos.ch + 1)) || r.head
            })
          }),
          (t.swapLineUp = function (t) {
            if (t.isReadOnly()) return e.Pass
            for (var r = t.listSelections(), i = [], o = t.firstLine() - 1, a = [], l = 0; l < r.length; l++) {
              var s = r[l],
                c = s.from().line - 1,
                u = s.to().line
              a.push({ anchor: n(s.anchor.line - 1, s.anchor.ch), head: n(s.head.line - 1, s.head.ch) }),
                0 != s.to().ch || s.empty() || --u,
                c > o ? i.push(c, u) : i.length && (i[i.length - 1] = u),
                (o = u)
            }
            t.operation(function () {
              for (var e = 0; e < i.length; e += 2) {
                var r = i[e],
                  o = i[e + 1],
                  l = t.getLine(r)
                t.replaceRange("", n(r, 0), n(r + 1, 0), "+swapLine"),
                  o > t.lastLine()
                    ? t.replaceRange("\n" + l, n(t.lastLine()), null, "+swapLine")
                    : t.replaceRange(l + "\n", n(o, 0), null, "+swapLine")
              }
              t.setSelections(a), t.scrollIntoView()
            })
          }),
          (t.swapLineDown = function (t) {
            if (t.isReadOnly()) return e.Pass
            for (var r = t.listSelections(), i = [], o = t.lastLine() + 1, a = r.length - 1; a >= 0; a--) {
              var l = r[a],
                s = l.to().line + 1,
                c = l.from().line
              0 != l.to().ch || l.empty() || s--, s < o ? i.push(s, c) : i.length && (i[i.length - 1] = c), (o = c)
            }
            t.operation(function () {
              for (var e = i.length - 2; e >= 0; e -= 2) {
                var r = i[e],
                  o = i[e + 1],
                  a = t.getLine(r)
                r == t.lastLine()
                  ? t.replaceRange("", n(r - 1), n(r), "+swapLine")
                  : t.replaceRange("", n(r, 0), n(r + 1, 0), "+swapLine"),
                  t.replaceRange(a + "\n", n(o, 0), null, "+swapLine")
              }
              t.scrollIntoView()
            })
          }),
          (t.toggleCommentIndented = function (e) {
            e.toggleComment({ indent: !0 })
          }),
          (t.joinLines = function (e) {
            for (var t = e.listSelections(), r = [], i = 0; i < t.length; i++) {
              for (
                var o = t[i], a = o.from(), l = a.line, s = o.to().line;
                i < t.length - 1 && t[i + 1].from().line == s;

              )
                s = t[++i].to().line
              r.push({ start: l, end: s, anchor: !o.empty() && a })
            }
            e.operation(function () {
              for (var t = 0, i = [], o = 0; o < r.length; o++) {
                for (var a, l = r[o], s = l.anchor && n(l.anchor.line - t, l.anchor.ch), c = l.start; c <= l.end; c++) {
                  var u = c - t
                  c == l.end && (a = n(u, e.getLine(u).length + 1)),
                    u < e.lastLine() &&
                      (e.replaceRange(" ", n(u), n(u + 1, /^\s*/.exec(e.getLine(u + 1))[0].length)), ++t)
                }
                i.push({ anchor: s || a, head: a })
              }
              e.setSelections(i, 0)
            })
          }),
          (t.duplicateLine = function (e) {
            e.operation(function () {
              for (var t = e.listSelections().length, r = 0; r < t; r++) {
                var i = e.listSelections()[r]
                i.empty()
                  ? e.replaceRange(e.getLine(i.head.line) + "\n", n(i.head.line, 0))
                  : e.replaceRange(e.getRange(i.from(), i.to()), i.from())
              }
              e.scrollIntoView()
            })
          }),
          (t.sortLines = function (e) {
            h(e, !0, 1)
          }),
          (t.reverseSortLines = function (e) {
            h(e, !0, -1)
          }),
          (t.sortLinesInsensitive = function (e) {
            h(e, !1, 1)
          }),
          (t.reverseSortLinesInsensitive = function (e) {
            h(e, !1, -1)
          }),
          (t.nextBookmark = function (e) {
            var t = e.state.sublimeBookmarks
            if (t)
              for (; t.length; ) {
                var n = t.shift(),
                  r = n.find()
                if (r) return t.push(n), e.setSelection(r.from, r.to)
              }
          }),
          (t.prevBookmark = function (e) {
            var t = e.state.sublimeBookmarks
            if (t)
              for (; t.length; ) {
                t.unshift(t.pop())
                var n = t[t.length - 1].find()
                if (n) return e.setSelection(n.from, n.to)
                t.pop()
              }
          }),
          (t.toggleBookmark = function (e) {
            for (
              var t = e.listSelections(), n = e.state.sublimeBookmarks || (e.state.sublimeBookmarks = []), r = 0;
              r < t.length;
              r++
            ) {
              for (
                var i = t[r].from(), o = t[r].to(), a = t[r].empty() ? e.findMarksAt(i) : e.findMarks(i, o), l = 0;
                l < a.length;
                l++
              )
                if (a[l].sublimeBookmark) {
                  a[l].clear()
                  for (var s = 0; s < n.length; s++) n[s] == a[l] && n.splice(s--, 1)
                  break
                }
              l == a.length && n.push(e.markText(i, o, { sublimeBookmark: !0, clearWhenEmpty: !1 }))
            }
          }),
          (t.clearBookmarks = function (e) {
            var t = e.state.sublimeBookmarks
            if (t) for (var n = 0; n < t.length; n++) t[n].clear()
            t.length = 0
          }),
          (t.selectBookmarks = function (e) {
            var t = e.state.sublimeBookmarks,
              n = []
            if (t)
              for (var r = 0; r < t.length; r++) {
                var i = t[r].find()
                i ? n.push({ anchor: i.from, head: i.to }) : t.splice(r--, 0)
              }
            n.length && e.setSelections(n, 0)
          }),
          (t.smartBackspace = function (t) {
            if (t.somethingSelected()) return e.Pass
            t.operation(function () {
              for (var r = t.listSelections(), i = t.getOption("indentUnit"), o = r.length - 1; o >= 0; o--) {
                var a = r[o].head,
                  l = t.getRange({ line: a.line, ch: 0 }, a),
                  s = e.countColumn(l, null, t.getOption("tabSize")),
                  c = t.findPosH(a, -1, "char", !1)
                if (l && !/\S/.test(l) && s % i == 0) {
                  var u = new n(a.line, e.findColumn(l, s - i, i))
                  u.ch != a.ch && (c = u)
                }
                t.replaceRange("", c, a, "+delete")
              }
            })
          }),
          (t.delLineRight = function (e) {
            e.operation(function () {
              for (var t = e.listSelections(), r = t.length - 1; r >= 0; r--)
                e.replaceRange("", t[r].anchor, n(t[r].to().line), "+delete")
              e.scrollIntoView()
            })
          }),
          (t.upcaseAtCursor = function (e) {
            d(e, function (e) {
              return e.toUpperCase()
            })
          }),
          (t.downcaseAtCursor = function (e) {
            d(e, function (e) {
              return e.toLowerCase()
            })
          }),
          (t.setSublimeMark = function (e) {
            e.state.sublimeMark && e.state.sublimeMark.clear(), (e.state.sublimeMark = e.setBookmark(e.getCursor()))
          }),
          (t.selectToSublimeMark = function (e) {
            var t = e.state.sublimeMark && e.state.sublimeMark.find()
            t && e.setSelection(e.getCursor(), t)
          }),
          (t.deleteToSublimeMark = function (t) {
            var n = t.state.sublimeMark && t.state.sublimeMark.find()
            if (n) {
              var r = t.getCursor(),
                i = n
              if (e.cmpPos(r, i) > 0) {
                var o = i
                ;(i = r), (r = o)
              }
              ;(t.state.sublimeKilled = t.getRange(r, i)), t.replaceRange("", r, i)
            }
          }),
          (t.swapWithSublimeMark = function (e) {
            var t = e.state.sublimeMark && e.state.sublimeMark.find()
            t && (e.state.sublimeMark.clear(), (e.state.sublimeMark = e.setBookmark(e.getCursor())), e.setCursor(t))
          }),
          (t.sublimeYank = function (e) {
            null != e.state.sublimeKilled && e.replaceSelection(e.state.sublimeKilled, null, "paste")
          }),
          (t.showInCenter = function (e) {
            var t = e.cursorCoords(null, "local")
            e.scrollTo(null, (t.top + t.bottom) / 2 - e.getScrollInfo().clientHeight / 2)
          }),
          (t.findUnder = function (e) {
            g(e, !0)
          }),
          (t.findUnderPrevious = function (e) {
            g(e, !1)
          }),
          (t.findAllUnder = function (e) {
            var t = p(e)
            if (t) {
              for (var n = e.getSearchCursor(t.query), r = [], i = -1; n.findNext(); )
                r.push({ anchor: n.from(), head: n.to() }),
                  n.from().line <= t.from.line && n.from().ch <= t.from.ch && i++
              e.setSelections(r, i)
            }
          })
        var m = e.keyMap
        ;(m.macSublime = {
          "Cmd-Left": "goLineStartSmart",
          "Shift-Tab": "indentLess",
          "Shift-Ctrl-K": "deleteLine",
          "Alt-Q": "wrapLines",
          "Ctrl-Left": "goSubwordLeft",
          "Ctrl-Right": "goSubwordRight",
          "Ctrl-Alt-Up": "scrollLineUp",
          "Ctrl-Alt-Down": "scrollLineDown",
          "Cmd-L": "selectLine",
          "Shift-Cmd-L": "splitSelectionByLine",
          Esc: "singleSelectionTop",
          "Cmd-Enter": "insertLineAfter",
          "Shift-Cmd-Enter": "insertLineBefore",
          "Cmd-D": "selectNextOccurrence",
          "Shift-Cmd-Space": "selectScope",
          "Shift-Cmd-M": "selectBetweenBrackets",
          "Cmd-M": "goToBracket",
          "Cmd-Ctrl-Up": "swapLineUp",
          "Cmd-Ctrl-Down": "swapLineDown",
          "Cmd-/": "toggleCommentIndented",
          "Cmd-J": "joinLines",
          "Shift-Cmd-D": "duplicateLine",
          F5: "sortLines",
          "Shift-F5": "reverseSortLines",
          "Cmd-F5": "sortLinesInsensitive",
          "Shift-Cmd-F5": "reverseSortLinesInsensitive",
          F2: "nextBookmark",
          "Shift-F2": "prevBookmark",
          "Cmd-F2": "toggleBookmark",
          "Shift-Cmd-F2": "clearBookmarks",
          "Alt-F2": "selectBookmarks",
          Backspace: "smartBackspace",
          "Cmd-K Cmd-D": "skipAndSelectNextOccurrence",
          "Cmd-K Cmd-K": "delLineRight",
          "Cmd-K Cmd-U": "upcaseAtCursor",
          "Cmd-K Cmd-L": "downcaseAtCursor",
          "Cmd-K Cmd-Space": "setSublimeMark",
          "Cmd-K Cmd-A": "selectToSublimeMark",
          "Cmd-K Cmd-W": "deleteToSublimeMark",
          "Cmd-K Cmd-X": "swapWithSublimeMark",
          "Cmd-K Cmd-Y": "sublimeYank",
          "Cmd-K Cmd-C": "showInCenter",
          "Cmd-K Cmd-G": "clearBookmarks",
          "Cmd-K Cmd-Backspace": "delLineLeft",
          "Cmd-K Cmd-1": "foldAll",
          "Cmd-K Cmd-0": "unfoldAll",
          "Cmd-K Cmd-J": "unfoldAll",
          "Ctrl-Shift-Up": "addCursorToPrevLine",
          "Ctrl-Shift-Down": "addCursorToNextLine",
          "Cmd-F3": "findUnder",
          "Shift-Cmd-F3": "findUnderPrevious",
          "Alt-F3": "findAllUnder",
          "Shift-Cmd-[": "fold",
          "Shift-Cmd-]": "unfold",
          "Cmd-I": "findIncremental",
          "Shift-Cmd-I": "findIncrementalReverse",
          "Cmd-H": "replace",
          F3: "findNext",
          "Shift-F3": "findPrev",
          fallthrough: "macDefault",
        }),
          e.normalizeKeyMap(m.macSublime),
          (m.pcSublime = {
            "Shift-Tab": "indentLess",
            "Shift-Ctrl-K": "deleteLine",
            "Alt-Q": "wrapLines",
            "Ctrl-T": "transposeChars",
            "Alt-Left": "goSubwordLeft",
            "Alt-Right": "goSubwordRight",
            "Ctrl-Up": "scrollLineUp",
            "Ctrl-Down": "scrollLineDown",
            "Ctrl-L": "selectLine",
            "Shift-Ctrl-L": "splitSelectionByLine",
            Esc: "singleSelectionTop",
            "Ctrl-Enter": "insertLineAfter",
            "Shift-Ctrl-Enter": "insertLineBefore",
            "Ctrl-D": "selectNextOccurrence",
            "Shift-Ctrl-Space": "selectScope",
            "Shift-Ctrl-M": "selectBetweenBrackets",
            "Ctrl-M": "goToBracket",
            "Shift-Ctrl-Up": "swapLineUp",
            "Shift-Ctrl-Down": "swapLineDown",
            "Ctrl-/": "toggleCommentIndented",
            "Ctrl-J": "joinLines",
            "Shift-Ctrl-D": "duplicateLine",
            F9: "sortLines",
            "Shift-F9": "reverseSortLines",
            "Ctrl-F9": "sortLinesInsensitive",
            "Shift-Ctrl-F9": "reverseSortLinesInsensitive",
            F2: "nextBookmark",
            "Shift-F2": "prevBookmark",
            "Ctrl-F2": "toggleBookmark",
            "Shift-Ctrl-F2": "clearBookmarks",
            "Alt-F2": "selectBookmarks",
            Backspace: "smartBackspace",
            "Ctrl-K Ctrl-D": "skipAndSelectNextOccurrence",
            "Ctrl-K Ctrl-K": "delLineRight",
            "Ctrl-K Ctrl-U": "upcaseAtCursor",
            "Ctrl-K Ctrl-L": "downcaseAtCursor",
            "Ctrl-K Ctrl-Space": "setSublimeMark",
            "Ctrl-K Ctrl-A": "selectToSublimeMark",
            "Ctrl-K Ctrl-W": "deleteToSublimeMark",
            "Ctrl-K Ctrl-X": "swapWithSublimeMark",
            "Ctrl-K Ctrl-Y": "sublimeYank",
            "Ctrl-K Ctrl-C": "showInCenter",
            "Ctrl-K Ctrl-G": "clearBookmarks",
            "Ctrl-K Ctrl-Backspace": "delLineLeft",
            "Ctrl-K Ctrl-1": "foldAll",
            "Ctrl-K Ctrl-0": "unfoldAll",
            "Ctrl-K Ctrl-J": "unfoldAll",
            "Ctrl-Alt-Up": "addCursorToPrevLine",
            "Ctrl-Alt-Down": "addCursorToNextLine",
            "Ctrl-F3": "findUnder",
            "Shift-Ctrl-F3": "findUnderPrevious",
            "Alt-F3": "findAllUnder",
            "Shift-Ctrl-[": "fold",
            "Shift-Ctrl-]": "unfold",
            "Ctrl-I": "findIncremental",
            "Shift-Ctrl-I": "findIncrementalReverse",
            "Ctrl-H": "replace",
            F3: "findNext",
            "Shift-F3": "findPrev",
            fallthrough: "pcDefault",
          }),
          e.normalizeKeyMap(m.pcSublime)
        var v = m.default == m.macDefault
        m.sublime = v ? m.macSublime : m.pcSublime
      })(n(5237), n(3653), n(7923))
    },
    5237: function (e) {
      e.exports = (function () {
        "use strict"
        var e = navigator.userAgent,
          t = navigator.platform,
          n = /gecko\/\d/i.test(e),
          r = /MSIE \d/.test(e),
          i = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),
          o = /Edge\/(\d+)/.exec(e),
          a = r || i || o,
          l = a && (r ? document.documentMode || 6 : +(o || i)[1]),
          s = !o && /WebKit\//.test(e),
          c = s && /Qt\/\d+\.\d+/.test(e),
          u = !o && /Chrome\/(\d+)/.exec(e),
          f = u && +u[1],
          h = /Opera\//.test(e),
          d = /Apple Computer/.test(navigator.vendor),
          p = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),
          g = /PhantomJS/.test(e),
          m = d && (/Mobile\/\w+/.test(e) || navigator.maxTouchPoints > 2),
          v = /Android/.test(e),
          y = m || v || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),
          b = m || /Mac/.test(t),
          w = /\bCrOS\b/.test(e),
          x = /win/i.test(t),
          k = h && e.match(/Version\/(\d*\.\d*)/)
        k && (k = Number(k[1])), k && k >= 15 && ((h = !1), (s = !0))
        var C = b && (c || (h && (null == k || k < 12.11))),
          S = n || (a && l >= 9)
        function L(e) {
          return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*")
        }
        var T,
          M = function (e, t) {
            var n = e.className,
              r = L(t).exec(n)
            if (r) {
              var i = n.slice(r.index + r[0].length)
              e.className = n.slice(0, r.index) + (i ? r[1] + i : "")
            }
          }
        function A(e) {
          for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild)
          return e
        }
        function O(e, t) {
          return A(e).appendChild(t)
        }
        function N(e, t, n, r) {
          var i = document.createElement(e)
          if ((n && (i.className = n), r && (i.style.cssText = r), "string" == typeof t))
            i.appendChild(document.createTextNode(t))
          else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o])
          return i
        }
        function P(e, t, n, r) {
          var i = N(e, t, n, r)
          return i.setAttribute("role", "presentation"), i
        }
        function H(e, t) {
          if ((3 == t.nodeType && (t = t.parentNode), e.contains)) return e.contains(t)
          do {
            if ((11 == t.nodeType && (t = t.host), t == e)) return !0
          } while ((t = t.parentNode))
        }
        function F(e) {
          var t
          try {
            t = e.activeElement
          } catch (n) {
            t = e.body || null
          }
          for (; t && t.shadowRoot && t.shadowRoot.activeElement; ) t = t.shadowRoot.activeElement
          return t
        }
        function D(e, t) {
          var n = e.className
          L(t).test(n) || (e.className += (n ? " " : "") + t)
        }
        function W(e, t) {
          for (var n = e.split(" "), r = 0; r < n.length; r++) n[r] && !L(n[r]).test(t) && (t += " " + n[r])
          return t
        }
        T = document.createRange
          ? function (e, t, n, r) {
              var i = document.createRange()
              return i.setEnd(r || e, n), i.setStart(e, t), i
            }
          : function (e, t, n) {
              var r = document.body.createTextRange()
              try {
                r.moveToElementText(e.parentNode)
              } catch (e) {
                return r
              }
              return r.collapse(!0), r.moveEnd("character", n), r.moveStart("character", t), r
            }
        var E = function (e) {
          e.select()
        }
        function z(e) {
          return e.display.wrapper.ownerDocument
        }
        function I(e) {
          return z(e).defaultView
        }
        function B(e) {
          var t = Array.prototype.slice.call(arguments, 1)
          return function () {
            return e.apply(null, t)
          }
        }
        function R(e, t, n) {
          for (var r in (t || (t = {}), e)) !e.hasOwnProperty(r) || (!1 === n && t.hasOwnProperty(r)) || (t[r] = e[r])
          return t
        }
        function K(e, t, n, r, i) {
          null == t && -1 == (t = e.search(/[^\s\u00a0]/)) && (t = e.length)
          for (var o = r || 0, a = i || 0; ; ) {
            var l = e.indexOf("\t", o)
            if (l < 0 || l >= t) return a + (t - o)
            ;(a += l - o), (a += n - (a % n)), (o = l + 1)
          }
        }
        m
          ? (E = function (e) {
              ;(e.selectionStart = 0), (e.selectionEnd = e.value.length)
            })
          : a &&
            (E = function (e) {
              try {
                e.select()
              } catch (e) {}
            })
        var j = function () {
          ;(this.id = null), (this.f = null), (this.time = 0), (this.handler = B(this.onTimeout, this))
        }
        function U(e, t) {
          for (var n = 0; n < e.length; ++n) if (e[n] == t) return n
          return -1
        }
        ;(j.prototype.onTimeout = function (e) {
          ;(e.id = 0), e.time <= +new Date() ? e.f() : setTimeout(e.handler, e.time - +new Date())
        }),
          (j.prototype.set = function (e, t) {
            this.f = t
            var n = +new Date() + e
            ;(!this.id || n < this.time) &&
              (clearTimeout(this.id), (this.id = setTimeout(this.handler, e)), (this.time = n))
          })
        var V = 50,
          G = {
            toString: function () {
              return "CodeMirror.Pass"
            },
          },
          _ = { scroll: !1 },
          q = { origin: "*mouse" },
          $ = { origin: "+move" }
        function X(e, t, n) {
          for (var r = 0, i = 0; ; ) {
            var o = e.indexOf("\t", r)
            ;-1 == o && (o = e.length)
            var a = o - r
            if (o == e.length || i + a >= t) return r + Math.min(a, t - i)
            if (((i += o - r), (r = o + 1), (i += n - (i % n)) >= t)) return r
          }
        }
        var Y = [""]
        function Z(e) {
          for (; Y.length <= e; ) Y.push(Q(Y) + " ")
          return Y[e]
        }
        function Q(e) {
          return e[e.length - 1]
        }
        function J(e, t) {
          for (var n = [], r = 0; r < e.length; r++) n[r] = t(e[r], r)
          return n
        }
        function ee(e, t, n) {
          for (var r = 0, i = n(t); r < e.length && n(e[r]) <= i; ) r++
          e.splice(r, 0, t)
        }
        function te() {}
        function ne(e, t) {
          var n
          return Object.create ? (n = Object.create(e)) : ((te.prototype = e), (n = new te())), t && R(t, n), n
        }
        var re =
          /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/
        function ie(e) {
          return /\w/.test(e) || (e > "\x80" && (e.toUpperCase() != e.toLowerCase() || re.test(e)))
        }
        function oe(e, t) {
          return t ? !!(t.source.indexOf("\\w") > -1 && ie(e)) || t.test(e) : ie(e)
        }
        function ae(e) {
          for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1
          return !0
        }
        var le =
          /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/
        function se(e) {
          return e.charCodeAt(0) >= 768 && le.test(e)
        }
        function ce(e, t, n) {
          for (; (n < 0 ? t > 0 : t < e.length) && se(e.charAt(t)); ) t += n
          return t
        }
        function ue(e, t, n) {
          for (var r = t > n ? -1 : 1; ; ) {
            if (t == n) return t
            var i = (t + n) / 2,
              o = r < 0 ? Math.ceil(i) : Math.floor(i)
            if (o == t) return e(o) ? t : n
            e(o) ? (n = o) : (t = o + r)
          }
        }
        function fe(e, t, n, r) {
          if (!e) return r(t, n, "ltr", 0)
          for (var i = !1, o = 0; o < e.length; ++o) {
            var a = e[o]
            ;((a.from < n && a.to > t) || (t == n && a.to == t)) &&
              (r(Math.max(a.from, t), Math.min(a.to, n), 1 == a.level ? "rtl" : "ltr", o), (i = !0))
          }
          i || r(t, n, "ltr")
        }
        var he = null
        function de(e, t, n) {
          var r
          he = null
          for (var i = 0; i < e.length; ++i) {
            var o = e[i]
            if (o.from < t && o.to > t) return i
            o.to == t && (o.from != o.to && "before" == n ? (r = i) : (he = i)),
              o.from == t && (o.from != o.to && "before" != n ? (r = i) : (he = i))
          }
          return null != r ? r : he
        }
        var pe = (function () {
          var e =
              "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
            t =
              "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111"
          function n(n) {
            return n <= 247
              ? e.charAt(n)
              : 1424 <= n && n <= 1524
                ? "R"
                : 1536 <= n && n <= 1785
                  ? t.charAt(n - 1536)
                  : 1774 <= n && n <= 2220
                    ? "r"
                    : 8192 <= n && n <= 8203
                      ? "w"
                      : 8204 == n
                        ? "b"
                        : "L"
          }
          var r = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
            i = /[stwN]/,
            o = /[LRr]/,
            a = /[Lb1n]/,
            l = /[1n]/
          function s(e, t, n) {
            ;(this.level = e), (this.from = t), (this.to = n)
          }
          return function (e, t) {
            var c = "ltr" == t ? "L" : "R"
            if (0 == e.length || ("ltr" == t && !r.test(e))) return !1
            for (var u = e.length, f = [], h = 0; h < u; ++h) f.push(n(e.charCodeAt(h)))
            for (var d = 0, p = c; d < u; ++d) {
              var g = f[d]
              "m" == g ? (f[d] = p) : (p = g)
            }
            for (var m = 0, v = c; m < u; ++m) {
              var y = f[m]
              "1" == y && "r" == v ? (f[m] = "n") : o.test(y) && ((v = y), "r" == y && (f[m] = "R"))
            }
            for (var b = 1, w = f[0]; b < u - 1; ++b) {
              var x = f[b]
              "+" == x && "1" == w && "1" == f[b + 1]
                ? (f[b] = "1")
                : "," != x || w != f[b + 1] || ("1" != w && "n" != w) || (f[b] = w),
                (w = x)
            }
            for (var k = 0; k < u; ++k) {
              var C = f[k]
              if ("," == C) f[k] = "N"
              else if ("%" == C) {
                var S = void 0
                for (S = k + 1; S < u && "%" == f[S]; ++S);
                for (var L = (k && "!" == f[k - 1]) || (S < u && "1" == f[S]) ? "1" : "N", T = k; T < S; ++T) f[T] = L
                k = S - 1
              }
            }
            for (var M = 0, A = c; M < u; ++M) {
              var O = f[M]
              "L" == A && "1" == O ? (f[M] = "L") : o.test(O) && (A = O)
            }
            for (var N = 0; N < u; ++N)
              if (i.test(f[N])) {
                var P = void 0
                for (P = N + 1; P < u && i.test(f[P]); ++P);
                for (
                  var H = "L" == (N ? f[N - 1] : c), F = H == ("L" == (P < u ? f[P] : c)) ? (H ? "L" : "R") : c, D = N;
                  D < P;
                  ++D
                )
                  f[D] = F
                N = P - 1
              }
            for (var W, E = [], z = 0; z < u; )
              if (a.test(f[z])) {
                var I = z
                for (++z; z < u && a.test(f[z]); ++z);
                E.push(new s(0, I, z))
              } else {
                var B = z,
                  R = E.length,
                  K = "rtl" == t ? 1 : 0
                for (++z; z < u && "L" != f[z]; ++z);
                for (var j = B; j < z; )
                  if (l.test(f[j])) {
                    B < j && (E.splice(R, 0, new s(1, B, j)), (R += K))
                    var U = j
                    for (++j; j < z && l.test(f[j]); ++j);
                    E.splice(R, 0, new s(2, U, j)), (R += K), (B = j)
                  } else ++j
                B < z && E.splice(R, 0, new s(1, B, z))
              }
            return (
              "ltr" == t &&
                (1 == E[0].level &&
                  (W = e.match(/^\s+/)) &&
                  ((E[0].from = W[0].length), E.unshift(new s(0, 0, W[0].length))),
                1 == Q(E).level &&
                  (W = e.match(/\s+$/)) &&
                  ((Q(E).to -= W[0].length), E.push(new s(0, u - W[0].length, u)))),
              "rtl" == t ? E.reverse() : E
            )
          }
        })()
        function ge(e, t) {
          var n = e.order
          return null == n && (n = e.order = pe(e.text, t)), n
        }
        var me = [],
          ve = function (e, t, n) {
            if (e.addEventListener) e.addEventListener(t, n, !1)
            else if (e.attachEvent) e.attachEvent("on" + t, n)
            else {
              var r = e._handlers || (e._handlers = {})
              r[t] = (r[t] || me).concat(n)
            }
          }
        function ye(e, t) {
          return (e._handlers && e._handlers[t]) || me
        }
        function be(e, t, n) {
          if (e.removeEventListener) e.removeEventListener(t, n, !1)
          else if (e.detachEvent) e.detachEvent("on" + t, n)
          else {
            var r = e._handlers,
              i = r && r[t]
            if (i) {
              var o = U(i, n)
              o > -1 && (r[t] = i.slice(0, o).concat(i.slice(o + 1)))
            }
          }
        }
        function we(e, t) {
          var n = ye(e, t)
          if (n.length)
            for (var r = Array.prototype.slice.call(arguments, 2), i = 0; i < n.length; ++i) n[i].apply(null, r)
        }
        function xe(e, t, n) {
          return (
            "string" == typeof t &&
              (t = {
                type: t,
                preventDefault: function () {
                  this.defaultPrevented = !0
                },
              }),
            we(e, n || t.type, e, t),
            Me(t) || t.codemirrorIgnore
          )
        }
        function ke(e) {
          var t = e._handlers && e._handlers.cursorActivity
          if (t)
            for (
              var n = e.curOp.cursorActivityHandlers || (e.curOp.cursorActivityHandlers = []), r = 0;
              r < t.length;
              ++r
            )
              -1 == U(n, t[r]) && n.push(t[r])
        }
        function Ce(e, t) {
          return ye(e, t).length > 0
        }
        function Se(e) {
          ;(e.prototype.on = function (e, t) {
            ve(this, e, t)
          }),
            (e.prototype.off = function (e, t) {
              be(this, e, t)
            })
        }
        function Le(e) {
          e.preventDefault ? e.preventDefault() : (e.returnValue = !1)
        }
        function Te(e) {
          e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0)
        }
        function Me(e) {
          return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue
        }
        function Ae(e) {
          Le(e), Te(e)
        }
        function Oe(e) {
          return e.target || e.srcElement
        }
        function Ne(e) {
          var t = e.which
          return (
            null == t && (1 & e.button ? (t = 1) : 2 & e.button ? (t = 3) : 4 & e.button && (t = 2)),
            b && e.ctrlKey && 1 == t && (t = 3),
            t
          )
        }
        var Pe,
          He,
          Fe = (function () {
            if (a && l < 9) return !1
            var e = N("div")
            return "draggable" in e || "dragDrop" in e
          })()
        function De(e) {
          if (null == Pe) {
            var t = N("span", "\u200b")
            O(e, N("span", [t, document.createTextNode("x")])),
              0 != e.firstChild.offsetHeight && (Pe = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(a && l < 8))
          }
          var n = Pe
            ? N("span", "\u200b")
            : N("span", "\xa0", null, "display: inline-block; width: 1px; margin-right: -1px")
          return n.setAttribute("cm-text", ""), n
        }
        function We(e) {
          if (null != He) return He
          var t = O(e, document.createTextNode("A\u062eA")),
            n = T(t, 0, 1).getBoundingClientRect(),
            r = T(t, 1, 2).getBoundingClientRect()
          return A(e), !(!n || n.left == n.right) && (He = r.right - n.right < 3)
        }
        var Ee,
          ze =
            3 != "\n\nb".split(/\n/).length
              ? function (e) {
                  for (var t = 0, n = [], r = e.length; t <= r; ) {
                    var i = e.indexOf("\n", t)
                    ;-1 == i && (i = e.length)
                    var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                      a = o.indexOf("\r")
                    ;-1 != a ? (n.push(o.slice(0, a)), (t += a + 1)) : (n.push(o), (t = i + 1))
                  }
                  return n
                }
              : function (e) {
                  return e.split(/\r\n?|\n/)
                },
          Ie = window.getSelection
            ? function (e) {
                try {
                  return e.selectionStart != e.selectionEnd
                } catch (e) {
                  return !1
                }
              }
            : function (e) {
                var t
                try {
                  t = e.ownerDocument.selection.createRange()
                } catch (e) {}
                return !(!t || t.parentElement() != e) && 0 != t.compareEndPoints("StartToEnd", t)
              },
          Be = "oncopy" in (Ee = N("div")) || (Ee.setAttribute("oncopy", "return;"), "function" == typeof Ee.oncopy),
          Re = null
        function Ke(e) {
          if (null != Re) return Re
          var t = O(e, N("span", "x")),
            n = t.getBoundingClientRect(),
            r = T(t, 0, 1).getBoundingClientRect()
          return (Re = Math.abs(n.left - r.left) > 1)
        }
        var je = {},
          Ue = {}
        function Ve(e, t) {
          arguments.length > 2 && (t.dependencies = Array.prototype.slice.call(arguments, 2)), (je[e] = t)
        }
        function Ge(e, t) {
          Ue[e] = t
        }
        function _e(e) {
          if ("string" == typeof e && Ue.hasOwnProperty(e)) e = Ue[e]
          else if (e && "string" == typeof e.name && Ue.hasOwnProperty(e.name)) {
            var t = Ue[e.name]
            "string" == typeof t && (t = { name: t }), ((e = ne(t, e)).name = t.name)
          } else {
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+xml$/.test(e)) return _e("application/xml")
            if ("string" == typeof e && /^[\w\-]+\/[\w\-]+\+json$/.test(e)) return _e("application/json")
          }
          return "string" == typeof e ? { name: e } : e || { name: "null" }
        }
        function qe(e, t) {
          t = _e(t)
          var n = je[t.name]
          if (!n) return qe(e, "text/plain")
          var r = n(e, t)
          if ($e.hasOwnProperty(t.name)) {
            var i = $e[t.name]
            for (var o in i) i.hasOwnProperty(o) && (r.hasOwnProperty(o) && (r["_" + o] = r[o]), (r[o] = i[o]))
          }
          if (((r.name = t.name), t.helperType && (r.helperType = t.helperType), t.modeProps))
            for (var a in t.modeProps) r[a] = t.modeProps[a]
          return r
        }
        var $e = {}
        function Xe(e, t) {
          R(t, $e.hasOwnProperty(e) ? $e[e] : ($e[e] = {}))
        }
        function Ye(e, t) {
          if (!0 === t) return t
          if (e.copyState) return e.copyState(t)
          var n = {}
          for (var r in t) {
            var i = t[r]
            i instanceof Array && (i = i.concat([])), (n[r] = i)
          }
          return n
        }
        function Ze(e, t) {
          for (var n; e.innerMode && (n = e.innerMode(t)) && n.mode != e; ) (t = n.state), (e = n.mode)
          return n || { mode: e, state: t }
        }
        function Qe(e, t, n) {
          return !e.startState || e.startState(t, n)
        }
        var Je = function (e, t, n) {
          ;(this.pos = this.start = 0),
            (this.string = e),
            (this.tabSize = t || 8),
            (this.lastColumnPos = this.lastColumnValue = 0),
            (this.lineStart = 0),
            (this.lineOracle = n)
        }
        function et(e, t) {
          if ((t -= e.first) < 0 || t >= e.size)
            throw new Error("There is no line " + (t + e.first) + " in the document.")
          for (var n = e; !n.lines; )
            for (var r = 0; ; ++r) {
              var i = n.children[r],
                o = i.chunkSize()
              if (t < o) {
                n = i
                break
              }
              t -= o
            }
          return n.lines[t]
        }
        function tt(e, t, n) {
          var r = [],
            i = t.line
          return (
            e.iter(t.line, n.line + 1, function (e) {
              var o = e.text
              i == n.line && (o = o.slice(0, n.ch)), i == t.line && (o = o.slice(t.ch)), r.push(o), ++i
            }),
            r
          )
        }
        function nt(e, t, n) {
          var r = []
          return (
            e.iter(t, n, function (e) {
              r.push(e.text)
            }),
            r
          )
        }
        function rt(e, t) {
          var n = t - e.height
          if (n) for (var r = e; r; r = r.parent) r.height += n
        }
        function it(e) {
          if (null == e.parent) return null
          for (var t = e.parent, n = U(t.lines, e), r = t.parent; r; t = r, r = r.parent)
            for (var i = 0; r.children[i] != t; ++i) n += r.children[i].chunkSize()
          return n + t.first
        }
        function ot(e, t) {
          var n = e.first
          e: do {
            for (var r = 0; r < e.children.length; ++r) {
              var i = e.children[r],
                o = i.height
              if (t < o) {
                e = i
                continue e
              }
              ;(t -= o), (n += i.chunkSize())
            }
            return n
          } while (!e.lines)
          for (var a = 0; a < e.lines.length; ++a) {
            var l = e.lines[a].height
            if (t < l) break
            t -= l
          }
          return n + a
        }
        function at(e, t) {
          return t >= e.first && t < e.first + e.size
        }
        function lt(e, t) {
          return String(e.lineNumberFormatter(t + e.firstLineNumber))
        }
        function st(e, t, n) {
          if ((void 0 === n && (n = null), !(this instanceof st))) return new st(e, t, n)
          ;(this.line = e), (this.ch = t), (this.sticky = n)
        }
        function ct(e, t) {
          return e.line - t.line || e.ch - t.ch
        }
        function ut(e, t) {
          return e.sticky == t.sticky && 0 == ct(e, t)
        }
        function ft(e) {
          return st(e.line, e.ch)
        }
        function ht(e, t) {
          return ct(e, t) < 0 ? t : e
        }
        function dt(e, t) {
          return ct(e, t) < 0 ? e : t
        }
        function pt(e, t) {
          return Math.max(e.first, Math.min(t, e.first + e.size - 1))
        }
        function gt(e, t) {
          if (t.line < e.first) return st(e.first, 0)
          var n = e.first + e.size - 1
          return t.line > n ? st(n, et(e, n).text.length) : mt(t, et(e, t.line).text.length)
        }
        function mt(e, t) {
          var n = e.ch
          return null == n || n > t ? st(e.line, t) : n < 0 ? st(e.line, 0) : e
        }
        function vt(e, t) {
          for (var n = [], r = 0; r < t.length; r++) n[r] = gt(e, t[r])
          return n
        }
        ;(Je.prototype.eol = function () {
          return this.pos >= this.string.length
        }),
          (Je.prototype.sol = function () {
            return this.pos == this.lineStart
          }),
          (Je.prototype.peek = function () {
            return this.string.charAt(this.pos) || void 0
          }),
          (Je.prototype.next = function () {
            if (this.pos < this.string.length) return this.string.charAt(this.pos++)
          }),
          (Je.prototype.eat = function (e) {
            var t = this.string.charAt(this.pos)
            if ("string" == typeof e ? t == e : t && (e.test ? e.test(t) : e(t))) return ++this.pos, t
          }),
          (Je.prototype.eatWhile = function (e) {
            for (var t = this.pos; this.eat(e); );
            return this.pos > t
          }),
          (Je.prototype.eatSpace = function () {
            for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); ) ++this.pos
            return this.pos > e
          }),
          (Je.prototype.skipToEnd = function () {
            this.pos = this.string.length
          }),
          (Je.prototype.skipTo = function (e) {
            var t = this.string.indexOf(e, this.pos)
            if (t > -1) return (this.pos = t), !0
          }),
          (Je.prototype.backUp = function (e) {
            this.pos -= e
          }),
          (Je.prototype.column = function () {
            return (
              this.lastColumnPos < this.start &&
                ((this.lastColumnValue = K(
                  this.string,
                  this.start,
                  this.tabSize,
                  this.lastColumnPos,
                  this.lastColumnValue
                )),
                (this.lastColumnPos = this.start)),
              this.lastColumnValue - (this.lineStart ? K(this.string, this.lineStart, this.tabSize) : 0)
            )
          }),
          (Je.prototype.indentation = function () {
            return (
              K(this.string, null, this.tabSize) - (this.lineStart ? K(this.string, this.lineStart, this.tabSize) : 0)
            )
          }),
          (Je.prototype.match = function (e, t, n) {
            if ("string" != typeof e) {
              var r = this.string.slice(this.pos).match(e)
              return r && r.index > 0 ? null : (r && !1 !== t && (this.pos += r[0].length), r)
            }
            var i = function (e) {
              return n ? e.toLowerCase() : e
            }
            if (i(this.string.substr(this.pos, e.length)) == i(e)) return !1 !== t && (this.pos += e.length), !0
          }),
          (Je.prototype.current = function () {
            return this.string.slice(this.start, this.pos)
          }),
          (Je.prototype.hideFirstChars = function (e, t) {
            this.lineStart += e
            try {
              return t()
            } finally {
              this.lineStart -= e
            }
          }),
          (Je.prototype.lookAhead = function (e) {
            var t = this.lineOracle
            return t && t.lookAhead(e)
          }),
          (Je.prototype.baseToken = function () {
            var e = this.lineOracle
            return e && e.baseToken(this.pos)
          })
        var yt = function (e, t) {
            ;(this.state = e), (this.lookAhead = t)
          },
          bt = function (e, t, n, r) {
            ;(this.state = t),
              (this.doc = e),
              (this.line = n),
              (this.maxLookAhead = r || 0),
              (this.baseTokens = null),
              (this.baseTokenPos = 1)
          }
        function wt(e, t, n, r) {
          var i = [e.state.modeGen],
            o = {}
          Ot(
            e,
            t.text,
            e.doc.mode,
            n,
            function (e, t) {
              return i.push(e, t)
            },
            o,
            r
          )
          for (
            var a = n.state,
              l = function (r) {
                n.baseTokens = i
                var l = e.state.overlays[r],
                  s = 1,
                  c = 0
                ;(n.state = !0),
                  Ot(
                    e,
                    t.text,
                    l.mode,
                    n,
                    function (e, t) {
                      for (var n = s; c < e; ) {
                        var r = i[s]
                        r > e && i.splice(s, 1, e, i[s + 1], r), (s += 2), (c = Math.min(e, r))
                      }
                      if (t)
                        if (l.opaque) i.splice(n, s - n, e, "overlay " + t), (s = n + 2)
                        else
                          for (; n < s; n += 2) {
                            var o = i[n + 1]
                            i[n + 1] = (o ? o + " " : "") + "overlay " + t
                          }
                    },
                    o
                  ),
                  (n.state = a),
                  (n.baseTokens = null),
                  (n.baseTokenPos = 1)
              },
              s = 0;
            s < e.state.overlays.length;
            ++s
          )
            l(s)
          return { styles: i, classes: o.bgClass || o.textClass ? o : null }
        }
        function xt(e, t, n) {
          if (!t.styles || t.styles[0] != e.state.modeGen) {
            var r = kt(e, it(t)),
              i = t.text.length > e.options.maxHighlightLength && Ye(e.doc.mode, r.state),
              o = wt(e, t, r)
            i && (r.state = i),
              (t.stateAfter = r.save(!i)),
              (t.styles = o.styles),
              o.classes ? (t.styleClasses = o.classes) : t.styleClasses && (t.styleClasses = null),
              n === e.doc.highlightFrontier &&
                (e.doc.modeFrontier = Math.max(e.doc.modeFrontier, ++e.doc.highlightFrontier))
          }
          return t.styles
        }
        function kt(e, t, n) {
          var r = e.doc,
            i = e.display
          if (!r.mode.startState) return new bt(r, !0, t)
          var o = Nt(e, t, n),
            a = o > r.first && et(r, o - 1).stateAfter,
            l = a ? bt.fromSaved(r, a, o) : new bt(r, Qe(r.mode), o)
          return (
            r.iter(o, t, function (n) {
              Ct(e, n.text, l)
              var r = l.line
              ;(n.stateAfter = r == t - 1 || r % 5 == 0 || (r >= i.viewFrom && r < i.viewTo) ? l.save() : null),
                l.nextLine()
            }),
            n && (r.modeFrontier = l.line),
            l
          )
        }
        function Ct(e, t, n, r) {
          var i = e.doc.mode,
            o = new Je(t, e.options.tabSize, n)
          for (o.start = o.pos = r || 0, "" == t && St(i, n.state); !o.eol(); ) Lt(i, o, n.state), (o.start = o.pos)
        }
        function St(e, t) {
          if (e.blankLine) return e.blankLine(t)
          if (e.innerMode) {
            var n = Ze(e, t)
            return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0
          }
        }
        function Lt(e, t, n, r) {
          for (var i = 0; i < 10; i++) {
            r && (r[0] = Ze(e, n).mode)
            var o = e.token(t, n)
            if (t.pos > t.start) return o
          }
          throw new Error("Mode " + e.name + " failed to advance stream.")
        }
        ;(bt.prototype.lookAhead = function (e) {
          var t = this.doc.getLine(this.line + e)
          return null != t && e > this.maxLookAhead && (this.maxLookAhead = e), t
        }),
          (bt.prototype.baseToken = function (e) {
            if (!this.baseTokens) return null
            for (; this.baseTokens[this.baseTokenPos] <= e; ) this.baseTokenPos += 2
            var t = this.baseTokens[this.baseTokenPos + 1]
            return { type: t && t.replace(/( |^)overlay .*/, ""), size: this.baseTokens[this.baseTokenPos] - e }
          }),
          (bt.prototype.nextLine = function () {
            this.line++, this.maxLookAhead > 0 && this.maxLookAhead--
          }),
          (bt.fromSaved = function (e, t, n) {
            return t instanceof yt ? new bt(e, Ye(e.mode, t.state), n, t.lookAhead) : new bt(e, Ye(e.mode, t), n)
          }),
          (bt.prototype.save = function (e) {
            var t = !1 !== e ? Ye(this.doc.mode, this.state) : this.state
            return this.maxLookAhead > 0 ? new yt(t, this.maxLookAhead) : t
          })
        var Tt = function (e, t, n) {
          ;(this.start = e.start),
            (this.end = e.pos),
            (this.string = e.current()),
            (this.type = t || null),
            (this.state = n)
        }
        function Mt(e, t, n, r) {
          var i,
            o,
            a = e.doc,
            l = a.mode,
            s = et(a, (t = gt(a, t)).line),
            c = kt(e, t.line, n),
            u = new Je(s.text, e.options.tabSize, c)
          for (r && (o = []); (r || u.pos < t.ch) && !u.eol(); )
            (u.start = u.pos), (i = Lt(l, u, c.state)), r && o.push(new Tt(u, i, Ye(a.mode, c.state)))
          return r ? o : new Tt(u, i, c.state)
        }
        function At(e, t) {
          if (e)
            for (;;) {
              var n = e.match(/(?:^|\s+)line-(background-)?(\S+)/)
              if (!n) break
              e = e.slice(0, n.index) + e.slice(n.index + n[0].length)
              var r = n[1] ? "bgClass" : "textClass"
              null == t[r]
                ? (t[r] = n[2])
                : new RegExp("(?:^|\\s)" + n[2] + "(?:$|\\s)").test(t[r]) || (t[r] += " " + n[2])
            }
          return e
        }
        function Ot(e, t, n, r, i, o, a) {
          var l = n.flattenSpans
          null == l && (l = e.options.flattenSpans)
          var s,
            c = 0,
            u = null,
            f = new Je(t, e.options.tabSize, r),
            h = e.options.addModeClass && [null]
          for ("" == t && At(St(n, r.state), o); !f.eol(); ) {
            if (
              (f.pos > e.options.maxHighlightLength
                ? ((l = !1), a && Ct(e, t, r, f.pos), (f.pos = t.length), (s = null))
                : (s = At(Lt(n, f, r.state, h), o)),
              h)
            ) {
              var d = h[0].name
              d && (s = "m-" + (s ? d + " " + s : d))
            }
            if (!l || u != s) {
              for (; c < f.start; ) i((c = Math.min(f.start, c + 5e3)), u)
              u = s
            }
            f.start = f.pos
          }
          for (; c < f.pos; ) {
            var p = Math.min(f.pos, c + 5e3)
            i(p, u), (c = p)
          }
        }
        function Nt(e, t, n) {
          for (var r, i, o = e.doc, a = n ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100), l = t; l > a; --l) {
            if (l <= o.first) return o.first
            var s = et(o, l - 1),
              c = s.stateAfter
            if (c && (!n || l + (c instanceof yt ? c.lookAhead : 0) <= o.modeFrontier)) return l
            var u = K(s.text, null, e.options.tabSize)
            ;(null == i || r > u) && ((i = l - 1), (r = u))
          }
          return i
        }
        function Pt(e, t) {
          if (((e.modeFrontier = Math.min(e.modeFrontier, t)), !(e.highlightFrontier < t - 10))) {
            for (var n = e.first, r = t - 1; r > n; r--) {
              var i = et(e, r).stateAfter
              if (i && (!(i instanceof yt) || r + i.lookAhead < t)) {
                n = r + 1
                break
              }
            }
            e.highlightFrontier = Math.min(e.highlightFrontier, n)
          }
        }
        var Ht = !1,
          Ft = !1
        function Dt() {
          Ht = !0
        }
        function Wt() {
          Ft = !0
        }
        function Et(e, t, n) {
          ;(this.marker = e), (this.from = t), (this.to = n)
        }
        function zt(e, t) {
          if (e)
            for (var n = 0; n < e.length; ++n) {
              var r = e[n]
              if (r.marker == t) return r
            }
        }
        function It(e, t) {
          for (var n, r = 0; r < e.length; ++r) e[r] != t && (n || (n = [])).push(e[r])
          return n
        }
        function Bt(e, t, n) {
          var r = n && window.WeakSet && (n.markedSpans || (n.markedSpans = new WeakSet()))
          r && e.markedSpans && r.has(e.markedSpans)
            ? e.markedSpans.push(t)
            : ((e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t]), r && r.add(e.markedSpans)),
            t.marker.attachLine(e)
        }
        function Rt(e, t, n) {
          var r
          if (e)
            for (var i = 0; i < e.length; ++i) {
              var o = e[i],
                a = o.marker
              if (
                null == o.from ||
                (a.inclusiveLeft ? o.from <= t : o.from < t) ||
                (o.from == t && "bookmark" == a.type && (!n || !o.marker.insertLeft))
              ) {
                var l = null == o.to || (a.inclusiveRight ? o.to >= t : o.to > t)
                ;(r || (r = [])).push(new Et(a, o.from, l ? null : o.to))
              }
            }
          return r
        }
        function Kt(e, t, n) {
          var r
          if (e)
            for (var i = 0; i < e.length; ++i) {
              var o = e[i],
                a = o.marker
              if (
                null == o.to ||
                (a.inclusiveRight ? o.to >= t : o.to > t) ||
                (o.from == t && "bookmark" == a.type && (!n || o.marker.insertLeft))
              ) {
                var l = null == o.from || (a.inclusiveLeft ? o.from <= t : o.from < t)
                ;(r || (r = [])).push(new Et(a, l ? null : o.from - t, null == o.to ? null : o.to - t))
              }
            }
          return r
        }
        function jt(e, t) {
          if (t.full) return null
          var n = at(e, t.from.line) && et(e, t.from.line).markedSpans,
            r = at(e, t.to.line) && et(e, t.to.line).markedSpans
          if (!n && !r) return null
          var i = t.from.ch,
            o = t.to.ch,
            a = 0 == ct(t.from, t.to),
            l = Rt(n, i, a),
            s = Kt(r, o, a),
            c = 1 == t.text.length,
            u = Q(t.text).length + (c ? i : 0)
          if (l)
            for (var f = 0; f < l.length; ++f) {
              var h = l[f]
              if (null == h.to) {
                var d = zt(s, h.marker)
                d ? c && (h.to = null == d.to ? null : d.to + u) : (h.to = i)
              }
            }
          if (s)
            for (var p = 0; p < s.length; ++p) {
              var g = s[p]
              null != g.to && (g.to += u),
                null == g.from
                  ? zt(l, g.marker) || ((g.from = u), c && (l || (l = [])).push(g))
                  : ((g.from += u), c && (l || (l = [])).push(g))
            }
          l && (l = Ut(l)), s && s != l && (s = Ut(s))
          var m = [l]
          if (!c) {
            var v,
              y = t.text.length - 2
            if (y > 0 && l)
              for (var b = 0; b < l.length; ++b)
                null == l[b].to && (v || (v = [])).push(new Et(l[b].marker, null, null))
            for (var w = 0; w < y; ++w) m.push(v)
            m.push(s)
          }
          return m
        }
        function Ut(e) {
          for (var t = 0; t < e.length; ++t) {
            var n = e[t]
            null != n.from && n.from == n.to && !1 !== n.marker.clearWhenEmpty && e.splice(t--, 1)
          }
          return e.length ? e : null
        }
        function Vt(e, t, n) {
          var r = null
          if (
            (e.iter(t.line, n.line + 1, function (e) {
              if (e.markedSpans)
                for (var t = 0; t < e.markedSpans.length; ++t) {
                  var n = e.markedSpans[t].marker
                  !n.readOnly || (r && -1 != U(r, n)) || (r || (r = [])).push(n)
                }
            }),
            !r)
          )
            return null
          for (var i = [{ from: t, to: n }], o = 0; o < r.length; ++o)
            for (var a = r[o], l = a.find(0), s = 0; s < i.length; ++s) {
              var c = i[s]
              if (!(ct(c.to, l.from) < 0 || ct(c.from, l.to) > 0)) {
                var u = [s, 1],
                  f = ct(c.from, l.from),
                  h = ct(c.to, l.to)
                ;(f < 0 || (!a.inclusiveLeft && !f)) && u.push({ from: c.from, to: l.from }),
                  (h > 0 || (!a.inclusiveRight && !h)) && u.push({ from: l.to, to: c.to }),
                  i.splice.apply(i, u),
                  (s += u.length - 3)
              }
            }
          return i
        }
        function Gt(e) {
          var t = e.markedSpans
          if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.detachLine(e)
            e.markedSpans = null
          }
        }
        function _t(e, t) {
          if (t) {
            for (var n = 0; n < t.length; ++n) t[n].marker.attachLine(e)
            e.markedSpans = t
          }
        }
        function qt(e) {
          return e.inclusiveLeft ? -1 : 0
        }
        function $t(e) {
          return e.inclusiveRight ? 1 : 0
        }
        function Xt(e, t) {
          var n = e.lines.length - t.lines.length
          if (0 != n) return n
          var r = e.find(),
            i = t.find(),
            o = ct(r.from, i.from) || qt(e) - qt(t)
          if (o) return -o
          var a = ct(r.to, i.to) || $t(e) - $t(t)
          return a || t.id - e.id
        }
        function Yt(e, t) {
          var n,
            r = Ft && e.markedSpans
          if (r)
            for (var i = void 0, o = 0; o < r.length; ++o)
              (i = r[o]).marker.collapsed &&
                null == (t ? i.from : i.to) &&
                (!n || Xt(n, i.marker) < 0) &&
                (n = i.marker)
          return n
        }
        function Zt(e) {
          return Yt(e, !0)
        }
        function Qt(e) {
          return Yt(e, !1)
        }
        function Jt(e, t) {
          var n,
            r = Ft && e.markedSpans
          if (r)
            for (var i = 0; i < r.length; ++i) {
              var o = r[i]
              o.marker.collapsed &&
                (null == o.from || o.from < t) &&
                (null == o.to || o.to > t) &&
                (!n || Xt(n, o.marker) < 0) &&
                (n = o.marker)
            }
          return n
        }
        function en(e, t, n, r, i) {
          var o = et(e, t),
            a = Ft && o.markedSpans
          if (a)
            for (var l = 0; l < a.length; ++l) {
              var s = a[l]
              if (s.marker.collapsed) {
                var c = s.marker.find(0),
                  u = ct(c.from, n) || qt(s.marker) - qt(i),
                  f = ct(c.to, r) || $t(s.marker) - $t(i)
                if (
                  !((u >= 0 && f <= 0) || (u <= 0 && f >= 0)) &&
                  ((u <= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? ct(c.to, n) >= 0 : ct(c.to, n) > 0)) ||
                    (u >= 0 && (s.marker.inclusiveRight && i.inclusiveLeft ? ct(c.from, r) <= 0 : ct(c.from, r) < 0)))
                )
                  return !0
              }
            }
        }
        function tn(e) {
          for (var t; (t = Zt(e)); ) e = t.find(-1, !0).line
          return e
        }
        function nn(e) {
          for (var t; (t = Qt(e)); ) e = t.find(1, !0).line
          return e
        }
        function rn(e) {
          for (var t, n; (t = Qt(e)); ) (e = t.find(1, !0).line), (n || (n = [])).push(e)
          return n
        }
        function on(e, t) {
          var n = et(e, t),
            r = tn(n)
          return n == r ? t : it(r)
        }
        function an(e, t) {
          if (t > e.lastLine()) return t
          var n,
            r = et(e, t)
          if (!ln(e, r)) return t
          for (; (n = Qt(r)); ) r = n.find(1, !0).line
          return it(r) + 1
        }
        function ln(e, t) {
          var n = Ft && t.markedSpans
          if (n)
            for (var r = void 0, i = 0; i < n.length; ++i)
              if ((r = n[i]).marker.collapsed) {
                if (null == r.from) return !0
                if (!r.marker.widgetNode && 0 == r.from && r.marker.inclusiveLeft && sn(e, t, r)) return !0
              }
        }
        function sn(e, t, n) {
          if (null == n.to) {
            var r = n.marker.find(1, !0)
            return sn(e, r.line, zt(r.line.markedSpans, n.marker))
          }
          if (n.marker.inclusiveRight && n.to == t.text.length) return !0
          for (var i = void 0, o = 0; o < t.markedSpans.length; ++o)
            if (
              (i = t.markedSpans[o]).marker.collapsed &&
              !i.marker.widgetNode &&
              i.from == n.to &&
              (null == i.to || i.to != n.from) &&
              (i.marker.inclusiveLeft || n.marker.inclusiveRight) &&
              sn(e, t, i)
            )
              return !0
        }
        function cn(e) {
          for (var t = 0, n = (e = tn(e)).parent, r = 0; r < n.lines.length; ++r) {
            var i = n.lines[r]
            if (i == e) break
            t += i.height
          }
          for (var o = n.parent; o; o = (n = o).parent)
            for (var a = 0; a < o.children.length; ++a) {
              var l = o.children[a]
              if (l == n) break
              t += l.height
            }
          return t
        }
        function un(e) {
          if (0 == e.height) return 0
          for (var t, n = e.text.length, r = e; (t = Zt(r)); ) {
            var i = t.find(0, !0)
            ;(r = i.from.line), (n += i.from.ch - i.to.ch)
          }
          for (r = e; (t = Qt(r)); ) {
            var o = t.find(0, !0)
            ;(n -= r.text.length - o.from.ch), (n += (r = o.to.line).text.length - o.to.ch)
          }
          return n
        }
        function fn(e) {
          var t = e.display,
            n = e.doc
          ;(t.maxLine = et(n, n.first)),
            (t.maxLineLength = un(t.maxLine)),
            (t.maxLineChanged = !0),
            n.iter(function (e) {
              var n = un(e)
              n > t.maxLineLength && ((t.maxLineLength = n), (t.maxLine = e))
            })
        }
        var hn = function (e, t, n) {
          ;(this.text = e), _t(this, t), (this.height = n ? n(this) : 1)
        }
        function dn(e, t, n, r) {
          ;(e.text = t),
            e.stateAfter && (e.stateAfter = null),
            e.styles && (e.styles = null),
            null != e.order && (e.order = null),
            Gt(e),
            _t(e, n)
          var i = r ? r(e) : 1
          i != e.height && rt(e, i)
        }
        function pn(e) {
          ;(e.parent = null), Gt(e)
        }
        ;(hn.prototype.lineNo = function () {
          return it(this)
        }),
          Se(hn)
        var gn = {},
          mn = {}
        function vn(e, t) {
          if (!e || /^\s*$/.test(e)) return null
          var n = t.addModeClass ? mn : gn
          return n[e] || (n[e] = e.replace(/\S+/g, "cm-$&"))
        }
        function yn(e, t) {
          var n = P("span", null, null, s ? "padding-right: .1px" : null),
            r = {
              pre: P("pre", [n], "CodeMirror-line"),
              content: n,
              col: 0,
              pos: 0,
              cm: e,
              trailingSpace: !1,
              splitSpaces: e.getOption("lineWrapping"),
            }
          t.measure = {}
          for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
            var o = i ? t.rest[i - 1] : t.line,
              a = void 0
            ;(r.pos = 0),
              (r.addToken = wn),
              We(e.display.measure) && (a = ge(o, e.doc.direction)) && (r.addToken = kn(r.addToken, a)),
              (r.map = []),
              Sn(o, r, xt(e, o, t != e.display.externalMeasured && it(o))),
              o.styleClasses &&
                (o.styleClasses.bgClass && (r.bgClass = W(o.styleClasses.bgClass, r.bgClass || "")),
                o.styleClasses.textClass && (r.textClass = W(o.styleClasses.textClass, r.textClass || ""))),
              0 == r.map.length && r.map.push(0, 0, r.content.appendChild(De(e.display.measure))),
              0 == i
                ? ((t.measure.map = r.map), (t.measure.cache = {}))
                : ((t.measure.maps || (t.measure.maps = [])).push(r.map),
                  (t.measure.caches || (t.measure.caches = [])).push({}))
          }
          if (s) {
            var l = r.content.lastChild
            ;(/\bcm-tab\b/.test(l.className) || (l.querySelector && l.querySelector(".cm-tab"))) &&
              (r.content.className = "cm-tab-wrap-hack")
          }
          return (
            we(e, "renderLine", e, t.line, r.pre),
            r.pre.className && (r.textClass = W(r.pre.className, r.textClass || "")),
            r
          )
        }
        function bn(e) {
          var t = N("span", "\u2022", "cm-invalidchar")
          return (t.title = "\\u" + e.charCodeAt(0).toString(16)), t.setAttribute("aria-label", t.title), t
        }
        function wn(e, t, n, r, i, o, s) {
          if (t) {
            var c,
              u = e.splitSpaces ? xn(t, e.trailingSpace) : t,
              f = e.cm.state.specialChars,
              h = !1
            if (f.test(t)) {
              c = document.createDocumentFragment()
              for (var d = 0; ; ) {
                f.lastIndex = d
                var p = f.exec(t),
                  g = p ? p.index - d : t.length - d
                if (g) {
                  var m = document.createTextNode(u.slice(d, d + g))
                  a && l < 9 ? c.appendChild(N("span", [m])) : c.appendChild(m),
                    e.map.push(e.pos, e.pos + g, m),
                    (e.col += g),
                    (e.pos += g)
                }
                if (!p) break
                d += g + 1
                var v = void 0
                if ("\t" == p[0]) {
                  var y = e.cm.options.tabSize,
                    b = y - (e.col % y)
                  ;(v = c.appendChild(N("span", Z(b), "cm-tab"))).setAttribute("role", "presentation"),
                    v.setAttribute("cm-text", "\t"),
                    (e.col += b)
                } else
                  "\r" == p[0] || "\n" == p[0]
                    ? ((v = c.appendChild(
                        N("span", "\r" == p[0] ? "\u240d" : "\u2424", "cm-invalidchar")
                      )).setAttribute("cm-text", p[0]),
                      (e.col += 1))
                    : ((v = e.cm.options.specialCharPlaceholder(p[0])).setAttribute("cm-text", p[0]),
                      a && l < 9 ? c.appendChild(N("span", [v])) : c.appendChild(v),
                      (e.col += 1))
                e.map.push(e.pos, e.pos + 1, v), e.pos++
              }
            } else
              (e.col += t.length),
                (c = document.createTextNode(u)),
                e.map.push(e.pos, e.pos + t.length, c),
                a && l < 9 && (h = !0),
                (e.pos += t.length)
            if (((e.trailingSpace = 32 == u.charCodeAt(t.length - 1)), n || r || i || h || o || s)) {
              var w = n || ""
              r && (w += r), i && (w += i)
              var x = N("span", [c], w, o)
              if (s) for (var k in s) s.hasOwnProperty(k) && "style" != k && "class" != k && x.setAttribute(k, s[k])
              return e.content.appendChild(x)
            }
            e.content.appendChild(c)
          }
        }
        function xn(e, t) {
          if (e.length > 1 && !/  /.test(e)) return e
          for (var n = t, r = "", i = 0; i < e.length; i++) {
            var o = e.charAt(i)
            " " != o || !n || (i != e.length - 1 && 32 != e.charCodeAt(i + 1)) || (o = "\xa0"), (r += o), (n = " " == o)
          }
          return r
        }
        function kn(e, t) {
          return function (n, r, i, o, a, l, s) {
            i = i ? i + " cm-force-border" : "cm-force-border"
            for (var c = n.pos, u = c + r.length; ; ) {
              for (var f = void 0, h = 0; h < t.length && !((f = t[h]).to > c && f.from <= c); h++);
              if (f.to >= u) return e(n, r, i, o, a, l, s)
              e(n, r.slice(0, f.to - c), i, o, null, l, s), (o = null), (r = r.slice(f.to - c)), (c = f.to)
            }
          }
        }
        function Cn(e, t, n, r) {
          var i = !r && n.widgetNode
          i && e.map.push(e.pos, e.pos + t, i),
            !r &&
              e.cm.display.input.needsContentAttribute &&
              (i || (i = e.content.appendChild(document.createElement("span"))), i.setAttribute("cm-marker", n.id)),
            i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)),
            (e.pos += t),
            (e.trailingSpace = !1)
        }
        function Sn(e, t, n) {
          var r = e.markedSpans,
            i = e.text,
            o = 0
          if (r)
            for (var a, l, s, c, u, f, h, d = i.length, p = 0, g = 1, m = "", v = 0; ; ) {
              if (v == p) {
                ;(s = c = u = l = ""), (h = null), (f = null), (v = 1 / 0)
                for (var y = [], b = void 0, w = 0; w < r.length; ++w) {
                  var x = r[w],
                    k = x.marker
                  if ("bookmark" == k.type && x.from == p && k.widgetNode) y.push(k)
                  else if (x.from <= p && (null == x.to || x.to > p || (k.collapsed && x.to == p && x.from == p))) {
                    if (
                      (null != x.to && x.to != p && v > x.to && ((v = x.to), (c = "")),
                      k.className && (s += " " + k.className),
                      k.css && (l = (l ? l + ";" : "") + k.css),
                      k.startStyle && x.from == p && (u += " " + k.startStyle),
                      k.endStyle && x.to == v && (b || (b = [])).push(k.endStyle, x.to),
                      k.title && ((h || (h = {})).title = k.title),
                      k.attributes)
                    )
                      for (var C in k.attributes) (h || (h = {}))[C] = k.attributes[C]
                    k.collapsed && (!f || Xt(f.marker, k) < 0) && (f = x)
                  } else x.from > p && v > x.from && (v = x.from)
                }
                if (b) for (var S = 0; S < b.length; S += 2) b[S + 1] == v && (c += " " + b[S])
                if (!f || f.from == p) for (var L = 0; L < y.length; ++L) Cn(t, 0, y[L])
                if (f && (f.from || 0) == p) {
                  if ((Cn(t, (null == f.to ? d + 1 : f.to) - p, f.marker, null == f.from), null == f.to)) return
                  f.to == p && (f = !1)
                }
              }
              if (p >= d) break
              for (var T = Math.min(d, v); ; ) {
                if (m) {
                  var M = p + m.length
                  if (!f) {
                    var A = M > T ? m.slice(0, T - p) : m
                    t.addToken(t, A, a ? a + s : s, u, p + A.length == v ? c : "", l, h)
                  }
                  if (M >= T) {
                    ;(m = m.slice(T - p)), (p = T)
                    break
                  }
                  ;(p = M), (u = "")
                }
                ;(m = i.slice(o, (o = n[g++]))), (a = vn(n[g++], t.cm.options))
              }
            }
          else for (var O = 1; O < n.length; O += 2) t.addToken(t, i.slice(o, (o = n[O])), vn(n[O + 1], t.cm.options))
        }
        function Ln(e, t, n) {
          ;(this.line = t),
            (this.rest = rn(t)),
            (this.size = this.rest ? it(Q(this.rest)) - n + 1 : 1),
            (this.node = this.text = null),
            (this.hidden = ln(e, t))
        }
        function Tn(e, t, n) {
          for (var r, i = [], o = t; o < n; o = r) {
            var a = new Ln(e.doc, et(e.doc, o), o)
            ;(r = o + a.size), i.push(a)
          }
          return i
        }
        var Mn = null
        function An(e) {
          Mn ? Mn.ops.push(e) : (e.ownsGroup = Mn = { ops: [e], delayedCallbacks: [] })
        }
        function On(e) {
          var t = e.delayedCallbacks,
            n = 0
          do {
            for (; n < t.length; n++) t[n].call(null)
            for (var r = 0; r < e.ops.length; r++) {
              var i = e.ops[r]
              if (i.cursorActivityHandlers)
                for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; )
                  i.cursorActivityHandlers[i.cursorActivityCalled++].call(null, i.cm)
            }
          } while (n < t.length)
        }
        function Nn(e, t) {
          var n = e.ownsGroup
          if (n)
            try {
              On(n)
            } finally {
              ;(Mn = null), t(n)
            }
        }
        var Pn = null
        function Hn(e, t) {
          var n = ye(e, t)
          if (n.length) {
            var r,
              i = Array.prototype.slice.call(arguments, 2)
            Mn ? (r = Mn.delayedCallbacks) : Pn ? (r = Pn) : ((r = Pn = []), setTimeout(Fn, 0))
            for (
              var o = function (e) {
                  r.push(function () {
                    return n[e].apply(null, i)
                  })
                },
                a = 0;
              a < n.length;
              ++a
            )
              o(a)
          }
        }
        function Fn() {
          var e = Pn
          Pn = null
          for (var t = 0; t < e.length; ++t) e[t]()
        }
        function Dn(e, t, n, r) {
          for (var i = 0; i < t.changes.length; i++) {
            var o = t.changes[i]
            "text" == o
              ? In(e, t)
              : "gutter" == o
                ? Rn(e, t, n, r)
                : "class" == o
                  ? Bn(e, t)
                  : "widget" == o && Kn(e, t, r)
          }
          t.changes = null
        }
        function Wn(e) {
          return (
            e.node == e.text &&
              ((e.node = N("div", null, null, "position: relative")),
              e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text),
              e.node.appendChild(e.text),
              a && l < 8 && (e.node.style.zIndex = 2)),
            e.node
          )
        }
        function En(e, t) {
          var n = t.bgClass ? t.bgClass + " " + (t.line.bgClass || "") : t.line.bgClass
          if ((n && (n += " CodeMirror-linebackground"), t.background))
            n
              ? (t.background.className = n)
              : (t.background.parentNode.removeChild(t.background), (t.background = null))
          else if (n) {
            var r = Wn(t)
            ;(t.background = r.insertBefore(N("div", null, n), r.firstChild)),
              e.display.input.setUneditable(t.background)
          }
        }
        function zn(e, t) {
          var n = e.display.externalMeasured
          return n && n.line == t.line
            ? ((e.display.externalMeasured = null), (t.measure = n.measure), n.built)
            : yn(e, t)
        }
        function In(e, t) {
          var n = t.text.className,
            r = zn(e, t)
          t.text == t.node && (t.node = r.pre),
            t.text.parentNode.replaceChild(r.pre, t.text),
            (t.text = r.pre),
            r.bgClass != t.bgClass || r.textClass != t.textClass
              ? ((t.bgClass = r.bgClass), (t.textClass = r.textClass), Bn(e, t))
              : n && (t.text.className = n)
        }
        function Bn(e, t) {
          En(e, t),
            t.line.wrapClass ? (Wn(t).className = t.line.wrapClass) : t.node != t.text && (t.node.className = "")
          var n = t.textClass ? t.textClass + " " + (t.line.textClass || "") : t.line.textClass
          t.text.className = n || ""
        }
        function Rn(e, t, n, r) {
          if (
            (t.gutter && (t.node.removeChild(t.gutter), (t.gutter = null)),
            t.gutterBackground && (t.node.removeChild(t.gutterBackground), (t.gutterBackground = null)),
            t.line.gutterClass)
          ) {
            var i = Wn(t)
            ;(t.gutterBackground = N(
              "div",
              null,
              "CodeMirror-gutter-background " + t.line.gutterClass,
              "left: " +
                (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) +
                "px; width: " +
                r.gutterTotalWidth +
                "px"
            )),
              e.display.input.setUneditable(t.gutterBackground),
              i.insertBefore(t.gutterBackground, t.text)
          }
          var o = t.line.gutterMarkers
          if (e.options.lineNumbers || o) {
            var a = Wn(t),
              l = (t.gutter = N(
                "div",
                null,
                "CodeMirror-gutter-wrapper",
                "left: " + (e.options.fixedGutter ? r.fixedPos : -r.gutterTotalWidth) + "px"
              ))
            if (
              (l.setAttribute("aria-hidden", "true"),
              e.display.input.setUneditable(l),
              a.insertBefore(l, t.text),
              t.line.gutterClass && (l.className += " " + t.line.gutterClass),
              !e.options.lineNumbers ||
                (o && o["CodeMirror-linenumbers"]) ||
                (t.lineNumber = l.appendChild(
                  N(
                    "div",
                    lt(e.options, n),
                    "CodeMirror-linenumber CodeMirror-gutter-elt",
                    "left: " +
                      r.gutterLeft["CodeMirror-linenumbers"] +
                      "px; width: " +
                      e.display.lineNumInnerWidth +
                      "px"
                  )
                )),
              o)
            )
              for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
                var c = e.display.gutterSpecs[s].className,
                  u = o.hasOwnProperty(c) && o[c]
                u &&
                  l.appendChild(
                    N(
                      "div",
                      [u],
                      "CodeMirror-gutter-elt",
                      "left: " + r.gutterLeft[c] + "px; width: " + r.gutterWidth[c] + "px"
                    )
                  )
              }
          }
        }
        function Kn(e, t, n) {
          t.alignable && (t.alignable = null)
          for (var r = L("CodeMirror-linewidget"), i = t.node.firstChild, o = void 0; i; i = o)
            (o = i.nextSibling), r.test(i.className) && t.node.removeChild(i)
          Un(e, t, n)
        }
        function jn(e, t, n, r) {
          var i = zn(e, t)
          return (
            (t.text = t.node = i.pre),
            i.bgClass && (t.bgClass = i.bgClass),
            i.textClass && (t.textClass = i.textClass),
            Bn(e, t),
            Rn(e, t, n, r),
            Un(e, t, r),
            t.node
          )
        }
        function Un(e, t, n) {
          if ((Vn(e, t.line, t, n, !0), t.rest)) for (var r = 0; r < t.rest.length; r++) Vn(e, t.rest[r], t, n, !1)
        }
        function Vn(e, t, n, r, i) {
          if (t.widgets)
            for (var o = Wn(n), a = 0, l = t.widgets; a < l.length; ++a) {
              var s = l[a],
                c = N("div", [s.node], "CodeMirror-linewidget" + (s.className ? " " + s.className : ""))
              s.handleMouseEvents || c.setAttribute("cm-ignore-events", "true"),
                Gn(s, c, n, r),
                e.display.input.setUneditable(c),
                i && s.above ? o.insertBefore(c, n.gutter || n.text) : o.appendChild(c),
                Hn(s, "redraw")
            }
        }
        function Gn(e, t, n, r) {
          if (e.noHScroll) {
            ;(n.alignable || (n.alignable = [])).push(t)
            var i = r.wrapperWidth
            ;(t.style.left = r.fixedPos + "px"),
              e.coverGutter || ((i -= r.gutterTotalWidth), (t.style.paddingLeft = r.gutterTotalWidth + "px")),
              (t.style.width = i + "px")
          }
          e.coverGutter &&
            ((t.style.zIndex = 5),
            (t.style.position = "relative"),
            e.noHScroll || (t.style.marginLeft = -r.gutterTotalWidth + "px"))
        }
        function _n(e) {
          if (null != e.height) return e.height
          var t = e.doc.cm
          if (!t) return 0
          if (!H(document.body, e.node)) {
            var n = "position: relative;"
            e.coverGutter && (n += "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
              e.noHScroll && (n += "width: " + t.display.wrapper.clientWidth + "px;"),
              O(t.display.measure, N("div", [e.node], null, n))
          }
          return (e.height = e.node.parentNode.offsetHeight)
        }
        function qn(e, t) {
          for (var n = Oe(t); n != e.wrapper; n = n.parentNode)
            if (
              !n ||
              (1 == n.nodeType && "true" == n.getAttribute("cm-ignore-events")) ||
              (n.parentNode == e.sizer && n != e.mover)
            )
              return !0
        }
        function $n(e) {
          return e.lineSpace.offsetTop
        }
        function Xn(e) {
          return e.mover.offsetHeight - e.lineSpace.offsetHeight
        }
        function Yn(e) {
          if (e.cachedPaddingH) return e.cachedPaddingH
          var t = O(e.measure, N("pre", "x", "CodeMirror-line-like")),
            n = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
            r = { left: parseInt(n.paddingLeft), right: parseInt(n.paddingRight) }
          return isNaN(r.left) || isNaN(r.right) || (e.cachedPaddingH = r), r
        }
        function Zn(e) {
          return V - e.display.nativeBarWidth
        }
        function Qn(e) {
          return e.display.scroller.clientWidth - Zn(e) - e.display.barWidth
        }
        function Jn(e) {
          return e.display.scroller.clientHeight - Zn(e) - e.display.barHeight
        }
        function er(e, t, n) {
          var r = e.options.lineWrapping,
            i = r && Qn(e)
          if (!t.measure.heights || (r && t.measure.width != i)) {
            var o = (t.measure.heights = [])
            if (r) {
              t.measure.width = i
              for (var a = t.text.firstChild.getClientRects(), l = 0; l < a.length - 1; l++) {
                var s = a[l],
                  c = a[l + 1]
                Math.abs(s.bottom - c.bottom) > 2 && o.push((s.bottom + c.top) / 2 - n.top)
              }
            }
            o.push(n.bottom - n.top)
          }
        }
        function tr(e, t, n) {
          if (e.line == t) return { map: e.measure.map, cache: e.measure.cache }
          if (e.rest) {
            for (var r = 0; r < e.rest.length; r++)
              if (e.rest[r] == t) return { map: e.measure.maps[r], cache: e.measure.caches[r] }
            for (var i = 0; i < e.rest.length; i++)
              if (it(e.rest[i]) > n) return { map: e.measure.maps[i], cache: e.measure.caches[i], before: !0 }
          }
        }
        function nr(e, t) {
          var n = it((t = tn(t))),
            r = (e.display.externalMeasured = new Ln(e.doc, t, n))
          r.lineN = n
          var i = (r.built = yn(e, r))
          return (r.text = i.pre), O(e.display.lineMeasure, i.pre), r
        }
        function rr(e, t, n, r) {
          return ar(e, or(e, t), n, r)
        }
        function ir(e, t) {
          if (t >= e.display.viewFrom && t < e.display.viewTo) return e.display.view[Br(e, t)]
          var n = e.display.externalMeasured
          return n && t >= n.lineN && t < n.lineN + n.size ? n : void 0
        }
        function or(e, t) {
          var n = it(t),
            r = ir(e, n)
          r && !r.text ? (r = null) : r && r.changes && (Dn(e, r, n, Dr(e)), (e.curOp.forceUpdate = !0)),
            r || (r = nr(e, t))
          var i = tr(r, t, n)
          return { line: t, view: r, rect: null, map: i.map, cache: i.cache, before: i.before, hasHeights: !1 }
        }
        function ar(e, t, n, r, i) {
          t.before && (n = -1)
          var o,
            a = n + (r || "")
          return (
            t.cache.hasOwnProperty(a)
              ? (o = t.cache[a])
              : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
                t.hasHeights || (er(e, t.view, t.rect), (t.hasHeights = !0)),
                (o = fr(e, t, n, r)).bogus || (t.cache[a] = o)),
            { left: o.left, right: o.right, top: i ? o.rtop : o.top, bottom: i ? o.rbottom : o.bottom }
          )
        }
        var lr,
          sr = { left: 0, right: 0, top: 0, bottom: 0 }
        function cr(e, t, n) {
          for (var r, i, o, a, l, s, c = 0; c < e.length; c += 3)
            if (
              ((l = e[c]),
              (s = e[c + 1]),
              t < l
                ? ((i = 0), (o = 1), (a = "left"))
                : t < s
                  ? (o = 1 + (i = t - l))
                  : (c == e.length - 3 || (t == s && e[c + 3] > t)) && ((i = (o = s - l) - 1), t >= s && (a = "right")),
              null != i)
            ) {
              if (((r = e[c + 2]), l == s && n == (r.insertLeft ? "left" : "right") && (a = n), "left" == n && 0 == i))
                for (; c && e[c - 2] == e[c - 3] && e[c - 1].insertLeft; ) (r = e[2 + (c -= 3)]), (a = "left")
              if ("right" == n && i == s - l)
                for (; c < e.length - 3 && e[c + 3] == e[c + 4] && !e[c + 5].insertLeft; )
                  (r = e[(c += 3) + 2]), (a = "right")
              break
            }
          return { node: r, start: i, end: o, collapse: a, coverStart: l, coverEnd: s }
        }
        function ur(e, t) {
          var n = sr
          if ("left" == t) for (var r = 0; r < e.length && (n = e[r]).left == n.right; r++);
          else for (var i = e.length - 1; i >= 0 && (n = e[i]).left == n.right; i--);
          return n
        }
        function fr(e, t, n, r) {
          var i,
            o = cr(t.map, n, r),
            s = o.node,
            c = o.start,
            u = o.end,
            f = o.collapse
          if (3 == s.nodeType) {
            for (var h = 0; h < 4; h++) {
              for (; c && se(t.line.text.charAt(o.coverStart + c)); ) --c
              for (; o.coverStart + u < o.coverEnd && se(t.line.text.charAt(o.coverStart + u)); ) ++u
              if (
                (i =
                  a && l < 9 && 0 == c && u == o.coverEnd - o.coverStart
                    ? s.parentNode.getBoundingClientRect()
                    : ur(T(s, c, u).getClientRects(), r)).left ||
                i.right ||
                0 == c
              )
                break
              ;(u = c), (c -= 1), (f = "right")
            }
            a && l < 11 && (i = hr(e.display.measure, i))
          } else {
            var d
            c > 0 && (f = r = "right"),
              (i =
                e.options.lineWrapping && (d = s.getClientRects()).length > 1
                  ? d["right" == r ? d.length - 1 : 0]
                  : s.getBoundingClientRect())
          }
          if (a && l < 9 && !c && (!i || (!i.left && !i.right))) {
            var p = s.parentNode.getClientRects()[0]
            i = p ? { left: p.left, right: p.left + Fr(e.display), top: p.top, bottom: p.bottom } : sr
          }
          for (
            var g = i.top - t.rect.top, m = i.bottom - t.rect.top, v = (g + m) / 2, y = t.view.measure.heights, b = 0;
            b < y.length - 1 && !(v < y[b]);
            b++
          );
          var w = b ? y[b - 1] : 0,
            x = y[b],
            k = {
              left: ("right" == f ? i.right : i.left) - t.rect.left,
              right: ("left" == f ? i.left : i.right) - t.rect.left,
              top: w,
              bottom: x,
            }
          return (
            i.left || i.right || (k.bogus = !0),
            e.options.singleCursorHeightPerLine || ((k.rtop = g), (k.rbottom = m)),
            k
          )
        }
        function hr(e, t) {
          if (!window.screen || null == screen.logicalXDPI || screen.logicalXDPI == screen.deviceXDPI || !Ke(e))
            return t
          var n = screen.logicalXDPI / screen.deviceXDPI,
            r = screen.logicalYDPI / screen.deviceYDPI
          return { left: t.left * n, right: t.right * n, top: t.top * r, bottom: t.bottom * r }
        }
        function dr(e) {
          if (e.measure && ((e.measure.cache = {}), (e.measure.heights = null), e.rest))
            for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {}
        }
        function pr(e) {
          ;(e.display.externalMeasure = null), A(e.display.lineMeasure)
          for (var t = 0; t < e.display.view.length; t++) dr(e.display.view[t])
        }
        function gr(e) {
          pr(e),
            (e.display.cachedCharWidth = e.display.cachedTextHeight = e.display.cachedPaddingH = null),
            e.options.lineWrapping || (e.display.maxLineChanged = !0),
            (e.display.lineNumChars = null)
        }
        function mr(e) {
          return u && v
            ? -(e.body.getBoundingClientRect().left - parseInt(getComputedStyle(e.body).marginLeft))
            : e.defaultView.pageXOffset || (e.documentElement || e.body).scrollLeft
        }
        function vr(e) {
          return u && v
            ? -(e.body.getBoundingClientRect().top - parseInt(getComputedStyle(e.body).marginTop))
            : e.defaultView.pageYOffset || (e.documentElement || e.body).scrollTop
        }
        function yr(e) {
          var t = tn(e).widgets,
            n = 0
          if (t) for (var r = 0; r < t.length; ++r) t[r].above && (n += _n(t[r]))
          return n
        }
        function br(e, t, n, r, i) {
          if (!i) {
            var o = yr(t)
            ;(n.top += o), (n.bottom += o)
          }
          if ("line" == r) return n
          r || (r = "local")
          var a = cn(t)
          if (("local" == r ? (a += $n(e.display)) : (a -= e.display.viewOffset), "page" == r || "window" == r)) {
            var l = e.display.lineSpace.getBoundingClientRect()
            a += l.top + ("window" == r ? 0 : vr(z(e)))
            var s = l.left + ("window" == r ? 0 : mr(z(e)))
            ;(n.left += s), (n.right += s)
          }
          return (n.top += a), (n.bottom += a), n
        }
        function wr(e, t, n) {
          if ("div" == n) return t
          var r = t.left,
            i = t.top
          if ("page" == n) (r -= mr(z(e))), (i -= vr(z(e)))
          else if ("local" == n || !n) {
            var o = e.display.sizer.getBoundingClientRect()
            ;(r += o.left), (i += o.top)
          }
          var a = e.display.lineSpace.getBoundingClientRect()
          return { left: r - a.left, top: i - a.top }
        }
        function xr(e, t, n, r, i) {
          return r || (r = et(e.doc, t.line)), br(e, r, rr(e, r, t.ch, i), n)
        }
        function kr(e, t, n, r, i, o) {
          function a(t, a) {
            var l = ar(e, i, t, a ? "right" : "left", o)
            return a ? (l.left = l.right) : (l.right = l.left), br(e, r, l, n)
          }
          ;(r = r || et(e.doc, t.line)), i || (i = or(e, r))
          var l = ge(r, e.doc.direction),
            s = t.ch,
            c = t.sticky
          if ((s >= r.text.length ? ((s = r.text.length), (c = "before")) : s <= 0 && ((s = 0), (c = "after")), !l))
            return a("before" == c ? s - 1 : s, "before" == c)
          function u(e, t, n) {
            return a(n ? e - 1 : e, (1 == l[t].level) != n)
          }
          var f = de(l, s, c),
            h = he,
            d = u(s, f, "before" == c)
          return null != h && (d.other = u(s, h, "before" != c)), d
        }
        function Cr(e, t) {
          var n = 0
          ;(t = gt(e.doc, t)), e.options.lineWrapping || (n = Fr(e.display) * t.ch)
          var r = et(e.doc, t.line),
            i = cn(r) + $n(e.display)
          return { left: n, right: n, top: i, bottom: i + r.height }
        }
        function Sr(e, t, n, r, i) {
          var o = st(e, t, n)
          return (o.xRel = i), r && (o.outside = r), o
        }
        function Lr(e, t, n) {
          var r = e.doc
          if ((n += e.display.viewOffset) < 0) return Sr(r.first, 0, null, -1, -1)
          var i = ot(r, n),
            o = r.first + r.size - 1
          if (i > o) return Sr(r.first + r.size - 1, et(r, o).text.length, null, 1, 1)
          t < 0 && (t = 0)
          for (var a = et(r, i); ; ) {
            var l = Or(e, a, i, t, n),
              s = Jt(a, l.ch + (l.xRel > 0 || l.outside > 0 ? 1 : 0))
            if (!s) return l
            var c = s.find(1)
            if (c.line == i) return c
            a = et(r, (i = c.line))
          }
        }
        function Tr(e, t, n, r) {
          r -= yr(t)
          var i = t.text.length,
            o = ue(
              function (t) {
                return ar(e, n, t - 1).bottom <= r
              },
              i,
              0
            )
          return {
            begin: o,
            end: (i = ue(
              function (t) {
                return ar(e, n, t).top > r
              },
              o,
              i
            )),
          }
        }
        function Mr(e, t, n, r) {
          return n || (n = or(e, t)), Tr(e, t, n, br(e, t, ar(e, n, r), "line").top)
        }
        function Ar(e, t, n, r) {
          return !(e.bottom <= n) && (e.top > n || (r ? e.left : e.right) > t)
        }
        function Or(e, t, n, r, i) {
          i -= cn(t)
          var o = or(e, t),
            a = yr(t),
            l = 0,
            s = t.text.length,
            c = !0,
            u = ge(t, e.doc.direction)
          if (u) {
            var f = (e.options.lineWrapping ? Pr : Nr)(e, t, n, o, u, r, i)
            ;(l = (c = 1 != f.level) ? f.from : f.to - 1), (s = c ? f.to : f.from - 1)
          }
          var h,
            d,
            p = null,
            g = null,
            m = ue(
              function (t) {
                var n = ar(e, o, t)
                return (
                  (n.top += a),
                  (n.bottom += a),
                  !!Ar(n, r, i, !1) && (n.top <= i && n.left <= r && ((p = t), (g = n)), !0)
                )
              },
              l,
              s
            ),
            v = !1
          if (g) {
            var y = r - g.left < g.right - r,
              b = y == c
            ;(m = p + (b ? 0 : 1)), (d = b ? "after" : "before"), (h = y ? g.left : g.right)
          } else {
            c || (m != s && m != l) || m++,
              (d =
                0 == m
                  ? "after"
                  : m == t.text.length
                    ? "before"
                    : ar(e, o, m - (c ? 1 : 0)).bottom + a <= i == c
                      ? "after"
                      : "before")
            var w = kr(e, st(n, m, d), "line", t, o)
            ;(h = w.left), (v = i < w.top ? -1 : i >= w.bottom ? 1 : 0)
          }
          return Sr(n, (m = ce(t.text, m, 1)), d, v, r - h)
        }
        function Nr(e, t, n, r, i, o, a) {
          var l = ue(
              function (l) {
                var s = i[l],
                  c = 1 != s.level
                return Ar(kr(e, st(n, c ? s.to : s.from, c ? "before" : "after"), "line", t, r), o, a, !0)
              },
              0,
              i.length - 1
            ),
            s = i[l]
          if (l > 0) {
            var c = 1 != s.level,
              u = kr(e, st(n, c ? s.from : s.to, c ? "after" : "before"), "line", t, r)
            Ar(u, o, a, !0) && u.top > a && (s = i[l - 1])
          }
          return s
        }
        function Pr(e, t, n, r, i, o, a) {
          var l = Tr(e, t, r, a),
            s = l.begin,
            c = l.end
          ;/\s/.test(t.text.charAt(c - 1)) && c--
          for (var u = null, f = null, h = 0; h < i.length; h++) {
            var d = i[h]
            if (!(d.from >= c || d.to <= s)) {
              var p = ar(e, r, 1 != d.level ? Math.min(c, d.to) - 1 : Math.max(s, d.from)).right,
                g = p < o ? o - p + 1e9 : p - o
              ;(!u || f > g) && ((u = d), (f = g))
            }
          }
          return (
            u || (u = i[i.length - 1]),
            u.from < s && (u = { from: s, to: u.to, level: u.level }),
            u.to > c && (u = { from: u.from, to: c, level: u.level }),
            u
          )
        }
        function Hr(e) {
          if (null != e.cachedTextHeight) return e.cachedTextHeight
          if (null == lr) {
            lr = N("pre", null, "CodeMirror-line-like")
            for (var t = 0; t < 49; ++t) lr.appendChild(document.createTextNode("x")), lr.appendChild(N("br"))
            lr.appendChild(document.createTextNode("x"))
          }
          O(e.measure, lr)
          var n = lr.offsetHeight / 50
          return n > 3 && (e.cachedTextHeight = n), A(e.measure), n || 1
        }
        function Fr(e) {
          if (null != e.cachedCharWidth) return e.cachedCharWidth
          var t = N("span", "xxxxxxxxxx"),
            n = N("pre", [t], "CodeMirror-line-like")
          O(e.measure, n)
          var r = t.getBoundingClientRect(),
            i = (r.right - r.left) / 10
          return i > 2 && (e.cachedCharWidth = i), i || 10
        }
        function Dr(e) {
          for (
            var t = e.display, n = {}, r = {}, i = t.gutters.clientLeft, o = t.gutters.firstChild, a = 0;
            o;
            o = o.nextSibling, ++a
          ) {
            var l = e.display.gutterSpecs[a].className
            ;(n[l] = o.offsetLeft + o.clientLeft + i), (r[l] = o.clientWidth)
          }
          return {
            fixedPos: Wr(t),
            gutterTotalWidth: t.gutters.offsetWidth,
            gutterLeft: n,
            gutterWidth: r,
            wrapperWidth: t.wrapper.clientWidth,
          }
        }
        function Wr(e) {
          return e.scroller.getBoundingClientRect().left - e.sizer.getBoundingClientRect().left
        }
        function Er(e) {
          var t = Hr(e.display),
            n = e.options.lineWrapping,
            r = n && Math.max(5, e.display.scroller.clientWidth / Fr(e.display) - 3)
          return function (i) {
            if (ln(e.doc, i)) return 0
            var o = 0
            if (i.widgets) for (var a = 0; a < i.widgets.length; a++) i.widgets[a].height && (o += i.widgets[a].height)
            return n ? o + (Math.ceil(i.text.length / r) || 1) * t : o + t
          }
        }
        function zr(e) {
          var t = e.doc,
            n = Er(e)
          t.iter(function (e) {
            var t = n(e)
            t != e.height && rt(e, t)
          })
        }
        function Ir(e, t, n, r) {
          var i = e.display
          if (!n && "true" == Oe(t).getAttribute("cm-not-content")) return null
          var o,
            a,
            l = i.lineSpace.getBoundingClientRect()
          try {
            ;(o = t.clientX - l.left), (a = t.clientY - l.top)
          } catch (e) {
            return null
          }
          var s,
            c = Lr(e, o, a)
          if (r && c.xRel > 0 && (s = et(e.doc, c.line).text).length == c.ch) {
            var u = K(s, s.length, e.options.tabSize) - s.length
            c = st(c.line, Math.max(0, Math.round((o - Yn(e.display).left) / Fr(e.display)) - u))
          }
          return c
        }
        function Br(e, t) {
          if (t >= e.display.viewTo) return null
          if ((t -= e.display.viewFrom) < 0) return null
          for (var n = e.display.view, r = 0; r < n.length; r++) if ((t -= n[r].size) < 0) return r
        }
        function Rr(e, t, n, r) {
          null == t && (t = e.doc.first), null == n && (n = e.doc.first + e.doc.size), r || (r = 0)
          var i = e.display
          if (
            (r && n < i.viewTo && (null == i.updateLineNumbers || i.updateLineNumbers > t) && (i.updateLineNumbers = t),
            (e.curOp.viewChanged = !0),
            t >= i.viewTo)
          )
            Ft && on(e.doc, t) < i.viewTo && jr(e)
          else if (n <= i.viewFrom) Ft && an(e.doc, n + r) > i.viewFrom ? jr(e) : ((i.viewFrom += r), (i.viewTo += r))
          else if (t <= i.viewFrom && n >= i.viewTo) jr(e)
          else if (t <= i.viewFrom) {
            var o = Ur(e, n, n + r, 1)
            o ? ((i.view = i.view.slice(o.index)), (i.viewFrom = o.lineN), (i.viewTo += r)) : jr(e)
          } else if (n >= i.viewTo) {
            var a = Ur(e, t, t, -1)
            a ? ((i.view = i.view.slice(0, a.index)), (i.viewTo = a.lineN)) : jr(e)
          } else {
            var l = Ur(e, t, t, -1),
              s = Ur(e, n, n + r, 1)
            l && s
              ? ((i.view = i.view
                  .slice(0, l.index)
                  .concat(Tn(e, l.lineN, s.lineN))
                  .concat(i.view.slice(s.index))),
                (i.viewTo += r))
              : jr(e)
          }
          var c = i.externalMeasured
          c && (n < c.lineN ? (c.lineN += r) : t < c.lineN + c.size && (i.externalMeasured = null))
        }
        function Kr(e, t, n) {
          e.curOp.viewChanged = !0
          var r = e.display,
            i = e.display.externalMeasured
          if (
            (i && t >= i.lineN && t < i.lineN + i.size && (r.externalMeasured = null),
            !(t < r.viewFrom || t >= r.viewTo))
          ) {
            var o = r.view[Br(e, t)]
            if (null != o.node) {
              var a = o.changes || (o.changes = [])
              ;-1 == U(a, n) && a.push(n)
            }
          }
        }
        function jr(e) {
          ;(e.display.viewFrom = e.display.viewTo = e.doc.first), (e.display.view = []), (e.display.viewOffset = 0)
        }
        function Ur(e, t, n, r) {
          var i,
            o = Br(e, t),
            a = e.display.view
          if (!Ft || n == e.doc.first + e.doc.size) return { index: o, lineN: n }
          for (var l = e.display.viewFrom, s = 0; s < o; s++) l += a[s].size
          if (l != t) {
            if (r > 0) {
              if (o == a.length - 1) return null
              ;(i = l + a[o].size - t), o++
            } else i = l - t
            ;(t += i), (n += i)
          }
          for (; on(e.doc, n) != n; ) {
            if (o == (r < 0 ? 0 : a.length - 1)) return null
            ;(n += r * a[o - (r < 0 ? 1 : 0)].size), (o += r)
          }
          return { index: o, lineN: n }
        }
        function Vr(e, t, n) {
          var r = e.display
          0 == r.view.length || t >= r.viewTo || n <= r.viewFrom
            ? ((r.view = Tn(e, t, n)), (r.viewFrom = t))
            : (r.viewFrom > t
                ? (r.view = Tn(e, t, r.viewFrom).concat(r.view))
                : r.viewFrom < t && (r.view = r.view.slice(Br(e, t))),
              (r.viewFrom = t),
              r.viewTo < n
                ? (r.view = r.view.concat(Tn(e, r.viewTo, n)))
                : r.viewTo > n && (r.view = r.view.slice(0, Br(e, n)))),
            (r.viewTo = n)
        }
        function Gr(e) {
          for (var t = e.display.view, n = 0, r = 0; r < t.length; r++) {
            var i = t[r]
            i.hidden || (i.node && !i.changes) || ++n
          }
          return n
        }
        function _r(e) {
          e.display.input.showSelection(e.display.input.prepareSelection())
        }
        function qr(e, t) {
          void 0 === t && (t = !0)
          var n = e.doc,
            r = {},
            i = (r.cursors = document.createDocumentFragment()),
            o = (r.selection = document.createDocumentFragment()),
            a = e.options.$customCursor
          a && (t = !0)
          for (var l = 0; l < n.sel.ranges.length; l++)
            if (t || l != n.sel.primIndex) {
              var s = n.sel.ranges[l]
              if (!(s.from().line >= e.display.viewTo || s.to().line < e.display.viewFrom)) {
                var c = s.empty()
                if (a) {
                  var u = a(e, s)
                  u && $r(e, u, i)
                } else (c || e.options.showCursorWhenSelecting) && $r(e, s.head, i)
                c || Yr(e, s, o)
              }
            }
          return r
        }
        function $r(e, t, n) {
          var r = kr(e, t, "div", null, null, !e.options.singleCursorHeightPerLine),
            i = n.appendChild(N("div", "\xa0", "CodeMirror-cursor"))
          if (
            ((i.style.left = r.left + "px"),
            (i.style.top = r.top + "px"),
            (i.style.height = Math.max(0, r.bottom - r.top) * e.options.cursorHeight + "px"),
            /\bcm-fat-cursor\b/.test(e.getWrapperElement().className))
          ) {
            var o = xr(e, t, "div", null, null),
              a = o.right - o.left
            i.style.width = (a > 0 ? a : e.defaultCharWidth()) + "px"
          }
          if (r.other) {
            var l = n.appendChild(N("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"))
            ;(l.style.display = ""),
              (l.style.left = r.other.left + "px"),
              (l.style.top = r.other.top + "px"),
              (l.style.height = 0.85 * (r.other.bottom - r.other.top) + "px")
          }
        }
        function Xr(e, t) {
          return e.top - t.top || e.left - t.left
        }
        function Yr(e, t, n) {
          var r = e.display,
            i = e.doc,
            o = document.createDocumentFragment(),
            a = Yn(e.display),
            l = a.left,
            s = Math.max(r.sizerWidth, Qn(e) - r.sizer.offsetLeft) - a.right,
            c = "ltr" == i.direction
          function u(e, t, n, r) {
            t < 0 && (t = 0),
              (t = Math.round(t)),
              (r = Math.round(r)),
              o.appendChild(
                N(
                  "div",
                  null,
                  "CodeMirror-selected",
                  "position: absolute; left: " +
                    e +
                    "px;\n                             top: " +
                    t +
                    "px; width: " +
                    (null == n ? s - e : n) +
                    "px;\n                             height: " +
                    (r - t) +
                    "px"
                )
              )
          }
          function f(t, n, r) {
            var o,
              a,
              f = et(i, t),
              h = f.text.length
            function d(n, r) {
              return xr(e, st(t, n), "div", f, r)
            }
            function p(t, n, r) {
              var i = Mr(e, f, null, t),
                o = ("ltr" == n) == ("after" == r) ? "left" : "right"
              return d("after" == r ? i.begin : i.end - (/\s/.test(f.text.charAt(i.end - 1)) ? 2 : 1), o)[o]
            }
            var g = ge(f, i.direction)
            return (
              fe(g, n || 0, null == r ? h : r, function (e, t, i, f) {
                var m = "ltr" == i,
                  v = d(e, m ? "left" : "right"),
                  y = d(t - 1, m ? "right" : "left"),
                  b = null == n && 0 == e,
                  w = null == r && t == h,
                  x = 0 == f,
                  k = !g || f == g.length - 1
                if (y.top - v.top <= 3) {
                  var C = (c ? w : b) && k,
                    S = (c ? b : w) && x ? l : (m ? v : y).left,
                    L = C ? s : (m ? y : v).right
                  u(S, v.top, L - S, v.bottom)
                } else {
                  var T, M, A, O
                  m
                    ? ((T = c && b && x ? l : v.left),
                      (M = c ? s : p(e, i, "before")),
                      (A = c ? l : p(t, i, "after")),
                      (O = c && w && k ? s : y.right))
                    : ((T = c ? p(e, i, "before") : l),
                      (M = !c && b && x ? s : v.right),
                      (A = !c && w && k ? l : y.left),
                      (O = c ? p(t, i, "after") : s)),
                    u(T, v.top, M - T, v.bottom),
                    v.bottom < y.top && u(l, v.bottom, null, y.top),
                    u(A, y.top, O - A, y.bottom)
                }
                ;(!o || Xr(v, o) < 0) && (o = v),
                  Xr(y, o) < 0 && (o = y),
                  (!a || Xr(v, a) < 0) && (a = v),
                  Xr(y, a) < 0 && (a = y)
              }),
              { start: o, end: a }
            )
          }
          var h = t.from(),
            d = t.to()
          if (h.line == d.line) f(h.line, h.ch, d.ch)
          else {
            var p = et(i, h.line),
              g = et(i, d.line),
              m = tn(p) == tn(g),
              v = f(h.line, h.ch, m ? p.text.length + 1 : null).end,
              y = f(d.line, m ? 0 : null, d.ch).start
            m &&
              (v.top < y.top - 2
                ? (u(v.right, v.top, null, v.bottom), u(l, y.top, y.left, y.bottom))
                : u(v.right, v.top, y.left - v.right, v.bottom)),
              v.bottom < y.top && u(l, v.bottom, null, y.top)
          }
          n.appendChild(o)
        }
        function Zr(e) {
          if (e.state.focused) {
            var t = e.display
            clearInterval(t.blinker)
            var n = !0
            ;(t.cursorDiv.style.visibility = ""),
              e.options.cursorBlinkRate > 0
                ? (t.blinker = setInterval(function () {
                    e.hasFocus() || ti(e), (t.cursorDiv.style.visibility = (n = !n) ? "" : "hidden")
                  }, e.options.cursorBlinkRate))
                : e.options.cursorBlinkRate < 0 && (t.cursorDiv.style.visibility = "hidden")
          }
        }
        function Qr(e) {
          e.hasFocus() || (e.display.input.focus(), e.state.focused || ei(e))
        }
        function Jr(e) {
          ;(e.state.delayingBlurEvent = !0),
            setTimeout(function () {
              e.state.delayingBlurEvent && ((e.state.delayingBlurEvent = !1), e.state.focused && ti(e))
            }, 100)
        }
        function ei(e, t) {
          e.state.delayingBlurEvent && !e.state.draggingText && (e.state.delayingBlurEvent = !1),
            "nocursor" != e.options.readOnly &&
              (e.state.focused ||
                (we(e, "focus", e, t),
                (e.state.focused = !0),
                D(e.display.wrapper, "CodeMirror-focused"),
                e.curOp ||
                  e.display.selForContextMenu == e.doc.sel ||
                  (e.display.input.reset(),
                  s &&
                    setTimeout(function () {
                      return e.display.input.reset(!0)
                    }, 20)),
                e.display.input.receivedFocus()),
              Zr(e))
        }
        function ti(e, t) {
          e.state.delayingBlurEvent ||
            (e.state.focused &&
              (we(e, "blur", e, t), (e.state.focused = !1), M(e.display.wrapper, "CodeMirror-focused")),
            clearInterval(e.display.blinker),
            setTimeout(function () {
              e.state.focused || (e.display.shift = !1)
            }, 150))
        }
        function ni(e) {
          for (
            var t = e.display,
              n = t.lineDiv.offsetTop,
              r = Math.max(0, t.scroller.getBoundingClientRect().top),
              i = t.lineDiv.getBoundingClientRect().top,
              o = 0,
              s = 0;
            s < t.view.length;
            s++
          ) {
            var c = t.view[s],
              u = e.options.lineWrapping,
              f = void 0,
              h = 0
            if (!c.hidden) {
              if (((i += c.line.height), a && l < 8)) {
                var d = c.node.offsetTop + c.node.offsetHeight
                ;(f = d - n), (n = d)
              } else {
                var p = c.node.getBoundingClientRect()
                ;(f = p.bottom - p.top),
                  !u && c.text.firstChild && (h = c.text.firstChild.getBoundingClientRect().right - p.left - 1)
              }
              var g = c.line.height - f
              if ((g > 0.005 || g < -0.005) && (i < r && (o -= g), rt(c.line, f), ri(c.line), c.rest))
                for (var m = 0; m < c.rest.length; m++) ri(c.rest[m])
              if (h > e.display.sizerWidth) {
                var v = Math.ceil(h / Fr(e.display))
                v > e.display.maxLineLength &&
                  ((e.display.maxLineLength = v), (e.display.maxLine = c.line), (e.display.maxLineChanged = !0))
              }
            }
          }
          Math.abs(o) > 2 && (t.scroller.scrollTop += o)
        }
        function ri(e) {
          if (e.widgets)
            for (var t = 0; t < e.widgets.length; ++t) {
              var n = e.widgets[t],
                r = n.node.parentNode
              r && (n.height = r.offsetHeight)
            }
        }
        function ii(e, t, n) {
          var r = n && null != n.top ? Math.max(0, n.top) : e.scroller.scrollTop
          r = Math.floor(r - $n(e))
          var i = n && null != n.bottom ? n.bottom : r + e.wrapper.clientHeight,
            o = ot(t, r),
            a = ot(t, i)
          if (n && n.ensure) {
            var l = n.ensure.from.line,
              s = n.ensure.to.line
            l < o
              ? ((o = l), (a = ot(t, cn(et(t, l)) + e.wrapper.clientHeight)))
              : Math.min(s, t.lastLine()) >= a && ((o = ot(t, cn(et(t, s)) - e.wrapper.clientHeight)), (a = s))
          }
          return { from: o, to: Math.max(a, o + 1) }
        }
        function oi(e, t) {
          if (!xe(e, "scrollCursorIntoView")) {
            var n = e.display,
              r = n.sizer.getBoundingClientRect(),
              i = null,
              o = n.wrapper.ownerDocument
            if (
              (t.top + r.top < 0
                ? (i = !0)
                : t.bottom + r.top > (o.defaultView.innerHeight || o.documentElement.clientHeight) && (i = !1),
              null != i && !g)
            ) {
              var a = N(
                "div",
                "\u200b",
                null,
                "position: absolute;\n                         top: " +
                  (t.top - n.viewOffset - $n(e.display)) +
                  "px;\n                         height: " +
                  (t.bottom - t.top + Zn(e) + n.barHeight) +
                  "px;\n                         left: " +
                  t.left +
                  "px; width: " +
                  Math.max(2, t.right - t.left) +
                  "px;"
              )
              e.display.lineSpace.appendChild(a), a.scrollIntoView(i), e.display.lineSpace.removeChild(a)
            }
          }
        }
        function ai(e, t, n, r) {
          var i
          null == r && (r = 0),
            e.options.lineWrapping ||
              t != n ||
              ((n = "before" == t.sticky ? st(t.line, t.ch + 1, "before") : t),
              (t = t.ch ? st(t.line, "before" == t.sticky ? t.ch - 1 : t.ch, "after") : t))
          for (var o = 0; o < 5; o++) {
            var a = !1,
              l = kr(e, t),
              s = n && n != t ? kr(e, n) : l,
              c = si(
                e,
                (i = {
                  left: Math.min(l.left, s.left),
                  top: Math.min(l.top, s.top) - r,
                  right: Math.max(l.left, s.left),
                  bottom: Math.max(l.bottom, s.bottom) + r,
                })
              ),
              u = e.doc.scrollTop,
              f = e.doc.scrollLeft
            if (
              (null != c.scrollTop && (gi(e, c.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (a = !0)),
              null != c.scrollLeft && (vi(e, c.scrollLeft), Math.abs(e.doc.scrollLeft - f) > 1 && (a = !0)),
              !a)
            )
              break
          }
          return i
        }
        function li(e, t) {
          var n = si(e, t)
          null != n.scrollTop && gi(e, n.scrollTop), null != n.scrollLeft && vi(e, n.scrollLeft)
        }
        function si(e, t) {
          var n = e.display,
            r = Hr(e.display)
          t.top < 0 && (t.top = 0)
          var i = e.curOp && null != e.curOp.scrollTop ? e.curOp.scrollTop : n.scroller.scrollTop,
            o = Jn(e),
            a = {}
          t.bottom - t.top > o && (t.bottom = t.top + o)
          var l = e.doc.height + Xn(n),
            s = t.top < r,
            c = t.bottom > l - r
          if (t.top < i) a.scrollTop = s ? 0 : t.top
          else if (t.bottom > i + o) {
            var u = Math.min(t.top, (c ? l : t.bottom) - o)
            u != i && (a.scrollTop = u)
          }
          var f = e.options.fixedGutter ? 0 : n.gutters.offsetWidth,
            h = e.curOp && null != e.curOp.scrollLeft ? e.curOp.scrollLeft : n.scroller.scrollLeft - f,
            d = Qn(e) - n.gutters.offsetWidth,
            p = t.right - t.left > d
          return (
            p && (t.right = t.left + d),
            t.left < 10
              ? (a.scrollLeft = 0)
              : t.left < h
                ? (a.scrollLeft = Math.max(0, t.left + f - (p ? 0 : 10)))
                : t.right > d + h - 3 && (a.scrollLeft = t.right + (p ? 0 : 10) - d),
            a
          )
        }
        function ci(e, t) {
          null != t &&
            (di(e), (e.curOp.scrollTop = (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) + t))
        }
        function ui(e) {
          di(e)
          var t = e.getCursor()
          e.curOp.scrollToPos = { from: t, to: t, margin: e.options.cursorScrollMargin }
        }
        function fi(e, t, n) {
          ;(null == t && null == n) || di(e),
            null != t && (e.curOp.scrollLeft = t),
            null != n && (e.curOp.scrollTop = n)
        }
        function hi(e, t) {
          di(e), (e.curOp.scrollToPos = t)
        }
        function di(e) {
          var t = e.curOp.scrollToPos
          t && ((e.curOp.scrollToPos = null), pi(e, Cr(e, t.from), Cr(e, t.to), t.margin))
        }
        function pi(e, t, n, r) {
          var i = si(e, {
            left: Math.min(t.left, n.left),
            top: Math.min(t.top, n.top) - r,
            right: Math.max(t.right, n.right),
            bottom: Math.max(t.bottom, n.bottom) + r,
          })
          fi(e, i.scrollLeft, i.scrollTop)
        }
        function gi(e, t) {
          Math.abs(e.doc.scrollTop - t) < 2 || (n || _i(e, { top: t }), mi(e, t, !0), n && _i(e), Ii(e, 100))
        }
        function mi(e, t, n) {
          ;(t = Math.max(0, Math.min(e.display.scroller.scrollHeight - e.display.scroller.clientHeight, t))),
            (e.display.scroller.scrollTop != t || n) &&
              ((e.doc.scrollTop = t),
              e.display.scrollbars.setScrollTop(t),
              e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t))
        }
        function vi(e, t, n, r) {
          ;(t = Math.max(0, Math.min(t, e.display.scroller.scrollWidth - e.display.scroller.clientWidth))),
            ((n ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) && !r) ||
              ((e.doc.scrollLeft = t),
              Yi(e),
              e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t),
              e.display.scrollbars.setScrollLeft(t))
        }
        function yi(e) {
          var t = e.display,
            n = t.gutters.offsetWidth,
            r = Math.round(e.doc.height + Xn(e.display))
          return {
            clientHeight: t.scroller.clientHeight,
            viewHeight: t.wrapper.clientHeight,
            scrollWidth: t.scroller.scrollWidth,
            clientWidth: t.scroller.clientWidth,
            viewWidth: t.wrapper.clientWidth,
            barLeft: e.options.fixedGutter ? n : 0,
            docHeight: r,
            scrollHeight: r + Zn(e) + t.barHeight,
            nativeBarWidth: t.nativeBarWidth,
            gutterWidth: n,
          }
        }
        var bi = function (e, t, n) {
          this.cm = n
          var r = (this.vert = N("div", [N("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar")),
            i = (this.horiz = N(
              "div",
              [N("div", null, null, "height: 100%; min-height: 1px")],
              "CodeMirror-hscrollbar"
            ))
          ;(r.tabIndex = i.tabIndex = -1),
            e(r),
            e(i),
            ve(r, "scroll", function () {
              r.clientHeight && t(r.scrollTop, "vertical")
            }),
            ve(i, "scroll", function () {
              i.clientWidth && t(i.scrollLeft, "horizontal")
            }),
            (this.checkedZeroWidth = !1),
            a && l < 8 && (this.horiz.style.minHeight = this.vert.style.minWidth = "18px")
        }
        ;(bi.prototype.update = function (e) {
          var t = e.scrollWidth > e.clientWidth + 1,
            n = e.scrollHeight > e.clientHeight + 1,
            r = e.nativeBarWidth
          if (n) {
            ;(this.vert.style.display = "block"), (this.vert.style.bottom = t ? r + "px" : "0")
            var i = e.viewHeight - (t ? r : 0)
            this.vert.firstChild.style.height = Math.max(0, e.scrollHeight - e.clientHeight + i) + "px"
          } else (this.vert.scrollTop = 0), (this.vert.style.display = ""), (this.vert.firstChild.style.height = "0")
          if (t) {
            ;(this.horiz.style.display = "block"),
              (this.horiz.style.right = n ? r + "px" : "0"),
              (this.horiz.style.left = e.barLeft + "px")
            var o = e.viewWidth - e.barLeft - (n ? r : 0)
            this.horiz.firstChild.style.width = Math.max(0, e.scrollWidth - e.clientWidth + o) + "px"
          } else (this.horiz.style.display = ""), (this.horiz.firstChild.style.width = "0")
          return (
            !this.checkedZeroWidth &&
              e.clientHeight > 0 &&
              (0 == r && this.zeroWidthHack(), (this.checkedZeroWidth = !0)),
            { right: n ? r : 0, bottom: t ? r : 0 }
          )
        }),
          (bi.prototype.setScrollLeft = function (e) {
            this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e),
              this.disableHoriz && this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz")
          }),
          (bi.prototype.setScrollTop = function (e) {
            this.vert.scrollTop != e && (this.vert.scrollTop = e),
              this.disableVert && this.enableZeroWidthBar(this.vert, this.disableVert, "vert")
          }),
          (bi.prototype.zeroWidthHack = function () {
            var e = b && !p ? "12px" : "18px"
            ;(this.horiz.style.height = this.vert.style.width = e),
              (this.horiz.style.visibility = this.vert.style.visibility = "hidden"),
              (this.disableHoriz = new j()),
              (this.disableVert = new j())
          }),
          (bi.prototype.enableZeroWidthBar = function (e, t, n) {
            function r() {
              var i = e.getBoundingClientRect()
              ;("vert" == n
                ? document.elementFromPoint(i.right - 1, (i.top + i.bottom) / 2)
                : document.elementFromPoint((i.right + i.left) / 2, i.bottom - 1)) != e
                ? (e.style.visibility = "hidden")
                : t.set(1e3, r)
            }
            ;(e.style.visibility = ""), t.set(1e3, r)
          }),
          (bi.prototype.clear = function () {
            var e = this.horiz.parentNode
            e.removeChild(this.horiz), e.removeChild(this.vert)
          })
        var wi = function () {}
        function xi(e, t) {
          t || (t = yi(e))
          var n = e.display.barWidth,
            r = e.display.barHeight
          ki(e, t)
          for (var i = 0; (i < 4 && n != e.display.barWidth) || r != e.display.barHeight; i++)
            n != e.display.barWidth && e.options.lineWrapping && ni(e),
              ki(e, yi(e)),
              (n = e.display.barWidth),
              (r = e.display.barHeight)
        }
        function ki(e, t) {
          var n = e.display,
            r = n.scrollbars.update(t)
          ;(n.sizer.style.paddingRight = (n.barWidth = r.right) + "px"),
            (n.sizer.style.paddingBottom = (n.barHeight = r.bottom) + "px"),
            (n.heightForcer.style.borderBottom = r.bottom + "px solid transparent"),
            r.right && r.bottom
              ? ((n.scrollbarFiller.style.display = "block"),
                (n.scrollbarFiller.style.height = r.bottom + "px"),
                (n.scrollbarFiller.style.width = r.right + "px"))
              : (n.scrollbarFiller.style.display = ""),
            r.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter
              ? ((n.gutterFiller.style.display = "block"),
                (n.gutterFiller.style.height = r.bottom + "px"),
                (n.gutterFiller.style.width = t.gutterWidth + "px"))
              : (n.gutterFiller.style.display = "")
        }
        ;(wi.prototype.update = function () {
          return { bottom: 0, right: 0 }
        }),
          (wi.prototype.setScrollLeft = function () {}),
          (wi.prototype.setScrollTop = function () {}),
          (wi.prototype.clear = function () {})
        var Ci = { native: bi, null: wi }
        function Si(e) {
          e.display.scrollbars &&
            (e.display.scrollbars.clear(),
            e.display.scrollbars.addClass && M(e.display.wrapper, e.display.scrollbars.addClass)),
            (e.display.scrollbars = new Ci[e.options.scrollbarStyle](
              function (t) {
                e.display.wrapper.insertBefore(t, e.display.scrollbarFiller),
                  ve(t, "mousedown", function () {
                    e.state.focused &&
                      setTimeout(function () {
                        return e.display.input.focus()
                      }, 0)
                  }),
                  t.setAttribute("cm-not-content", "true")
              },
              function (t, n) {
                "horizontal" == n ? vi(e, t) : gi(e, t)
              },
              e
            )),
            e.display.scrollbars.addClass && D(e.display.wrapper, e.display.scrollbars.addClass)
        }
        var Li = 0
        function Ti(e) {
          ;(e.curOp = {
            cm: e,
            viewChanged: !1,
            startHeight: e.doc.height,
            forceUpdate: !1,
            updateInput: 0,
            typing: !1,
            changeObjs: null,
            cursorActivityHandlers: null,
            cursorActivityCalled: 0,
            selectionChanged: !1,
            updateMaxLine: !1,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            focus: !1,
            id: ++Li,
            markArrays: null,
          }),
            An(e.curOp)
        }
        function Mi(e) {
          var t = e.curOp
          t &&
            Nn(t, function (e) {
              for (var t = 0; t < e.ops.length; t++) e.ops[t].cm.curOp = null
              Ai(e)
            })
        }
        function Ai(e) {
          for (var t = e.ops, n = 0; n < t.length; n++) Oi(t[n])
          for (var r = 0; r < t.length; r++) Ni(t[r])
          for (var i = 0; i < t.length; i++) Pi(t[i])
          for (var o = 0; o < t.length; o++) Hi(t[o])
          for (var a = 0; a < t.length; a++) Fi(t[a])
        }
        function Oi(e) {
          var t = e.cm,
            n = t.display
          Ki(t),
            e.updateMaxLine && fn(t),
            (e.mustUpdate =
              e.viewChanged ||
              e.forceUpdate ||
              null != e.scrollTop ||
              (e.scrollToPos && (e.scrollToPos.from.line < n.viewFrom || e.scrollToPos.to.line >= n.viewTo)) ||
              (n.maxLineChanged && t.options.lineWrapping)),
            (e.update =
              e.mustUpdate && new Ri(t, e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos }, e.forceUpdate))
        }
        function Ni(e) {
          e.updatedDisplay = e.mustUpdate && Vi(e.cm, e.update)
        }
        function Pi(e) {
          var t = e.cm,
            n = t.display
          e.updatedDisplay && ni(t),
            (e.barMeasure = yi(t)),
            n.maxLineChanged &&
              !t.options.lineWrapping &&
              ((e.adjustWidthTo = rr(t, n.maxLine, n.maxLine.text.length).left + 3),
              (t.display.sizerWidth = e.adjustWidthTo),
              (e.barMeasure.scrollWidth = Math.max(
                n.scroller.clientWidth,
                n.sizer.offsetLeft + e.adjustWidthTo + Zn(t) + t.display.barWidth
              )),
              (e.maxScrollLeft = Math.max(0, n.sizer.offsetLeft + e.adjustWidthTo - Qn(t)))),
            (e.updatedDisplay || e.selectionChanged) && (e.preparedSelection = n.input.prepareSelection())
        }
        function Hi(e) {
          var t = e.cm
          null != e.adjustWidthTo &&
            ((t.display.sizer.style.minWidth = e.adjustWidthTo + "px"),
            e.maxScrollLeft < t.doc.scrollLeft && vi(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0),
            (t.display.maxLineChanged = !1))
          var n = e.focus && e.focus == F(z(t))
          e.preparedSelection && t.display.input.showSelection(e.preparedSelection, n),
            (e.updatedDisplay || e.startHeight != t.doc.height) && xi(t, e.barMeasure),
            e.updatedDisplay && Xi(t, e.barMeasure),
            e.selectionChanged && Zr(t),
            t.state.focused && e.updateInput && t.display.input.reset(e.typing),
            n && Qr(e.cm)
        }
        function Fi(e) {
          var t = e.cm,
            n = t.display,
            r = t.doc
          e.updatedDisplay && Gi(t, e.update),
            null == n.wheelStartX ||
              (null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos) ||
              (n.wheelStartX = n.wheelStartY = null),
            null != e.scrollTop && mi(t, e.scrollTop, e.forceScroll),
            null != e.scrollLeft && vi(t, e.scrollLeft, !0, !0),
            e.scrollToPos && oi(t, ai(t, gt(r, e.scrollToPos.from), gt(r, e.scrollToPos.to), e.scrollToPos.margin))
          var i = e.maybeHiddenMarkers,
            o = e.maybeUnhiddenMarkers
          if (i) for (var a = 0; a < i.length; ++a) i[a].lines.length || we(i[a], "hide")
          if (o) for (var l = 0; l < o.length; ++l) o[l].lines.length && we(o[l], "unhide")
          n.wrapper.offsetHeight && (r.scrollTop = t.display.scroller.scrollTop),
            e.changeObjs && we(t, "changes", t, e.changeObjs),
            e.update && e.update.finish()
        }
        function Di(e, t) {
          if (e.curOp) return t()
          Ti(e)
          try {
            return t()
          } finally {
            Mi(e)
          }
        }
        function Wi(e, t) {
          return function () {
            if (e.curOp) return t.apply(e, arguments)
            Ti(e)
            try {
              return t.apply(e, arguments)
            } finally {
              Mi(e)
            }
          }
        }
        function Ei(e) {
          return function () {
            if (this.curOp) return e.apply(this, arguments)
            Ti(this)
            try {
              return e.apply(this, arguments)
            } finally {
              Mi(this)
            }
          }
        }
        function zi(e) {
          return function () {
            var t = this.cm
            if (!t || t.curOp) return e.apply(this, arguments)
            Ti(t)
            try {
              return e.apply(this, arguments)
            } finally {
              Mi(t)
            }
          }
        }
        function Ii(e, t) {
          e.doc.highlightFrontier < e.display.viewTo && e.state.highlight.set(t, B(Bi, e))
        }
        function Bi(e) {
          var t = e.doc
          if (!(t.highlightFrontier >= e.display.viewTo)) {
            var n = +new Date() + e.options.workTime,
              r = kt(e, t.highlightFrontier),
              i = []
            t.iter(r.line, Math.min(t.first + t.size, e.display.viewTo + 500), function (o) {
              if (r.line >= e.display.viewFrom) {
                var a = o.styles,
                  l = o.text.length > e.options.maxHighlightLength ? Ye(t.mode, r.state) : null,
                  s = wt(e, o, r, !0)
                l && (r.state = l), (o.styles = s.styles)
                var c = o.styleClasses,
                  u = s.classes
                u ? (o.styleClasses = u) : c && (o.styleClasses = null)
                for (
                  var f =
                      !a ||
                      a.length != o.styles.length ||
                      (c != u && (!c || !u || c.bgClass != u.bgClass || c.textClass != u.textClass)),
                    h = 0;
                  !f && h < a.length;
                  ++h
                )
                  f = a[h] != o.styles[h]
                f && i.push(r.line), (o.stateAfter = r.save()), r.nextLine()
              } else
                o.text.length <= e.options.maxHighlightLength && Ct(e, o.text, r),
                  (o.stateAfter = r.line % 5 == 0 ? r.save() : null),
                  r.nextLine()
              if (+new Date() > n) return Ii(e, e.options.workDelay), !0
            }),
              (t.highlightFrontier = r.line),
              (t.modeFrontier = Math.max(t.modeFrontier, r.line)),
              i.length &&
                Di(e, function () {
                  for (var t = 0; t < i.length; t++) Kr(e, i[t], "text")
                })
          }
        }
        var Ri = function (e, t, n) {
          var r = e.display
          ;(this.viewport = t),
            (this.visible = ii(r, e.doc, t)),
            (this.editorIsHidden = !r.wrapper.offsetWidth),
            (this.wrapperHeight = r.wrapper.clientHeight),
            (this.wrapperWidth = r.wrapper.clientWidth),
            (this.oldDisplayWidth = Qn(e)),
            (this.force = n),
            (this.dims = Dr(e)),
            (this.events = [])
        }
        function Ki(e) {
          var t = e.display
          !t.scrollbarsClipped &&
            t.scroller.offsetWidth &&
            ((t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth),
            (t.heightForcer.style.height = Zn(e) + "px"),
            (t.sizer.style.marginBottom = -t.nativeBarWidth + "px"),
            (t.sizer.style.borderRightWidth = Zn(e) + "px"),
            (t.scrollbarsClipped = !0))
        }
        function ji(e) {
          if (e.hasFocus()) return null
          var t = F(z(e))
          if (!t || !H(e.display.lineDiv, t)) return null
          var n = { activeElt: t }
          if (window.getSelection) {
            var r = I(e).getSelection()
            r.anchorNode &&
              r.extend &&
              H(e.display.lineDiv, r.anchorNode) &&
              ((n.anchorNode = r.anchorNode),
              (n.anchorOffset = r.anchorOffset),
              (n.focusNode = r.focusNode),
              (n.focusOffset = r.focusOffset))
          }
          return n
        }
        function Ui(e) {
          if (
            e &&
            e.activeElt &&
            e.activeElt != F(e.activeElt.ownerDocument) &&
            (e.activeElt.focus(),
            !/^(INPUT|TEXTAREA)$/.test(e.activeElt.nodeName) &&
              e.anchorNode &&
              H(document.body, e.anchorNode) &&
              H(document.body, e.focusNode))
          ) {
            var t = e.activeElt.ownerDocument,
              n = t.defaultView.getSelection(),
              r = t.createRange()
            r.setEnd(e.anchorNode, e.anchorOffset),
              r.collapse(!1),
              n.removeAllRanges(),
              n.addRange(r),
              n.extend(e.focusNode, e.focusOffset)
          }
        }
        function Vi(e, t) {
          var n = e.display,
            r = e.doc
          if (t.editorIsHidden) return jr(e), !1
          if (
            !t.force &&
            t.visible.from >= n.viewFrom &&
            t.visible.to <= n.viewTo &&
            (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo) &&
            n.renderedView == n.view &&
            0 == Gr(e)
          )
            return !1
          Zi(e) && (jr(e), (t.dims = Dr(e)))
          var i = r.first + r.size,
            o = Math.max(t.visible.from - e.options.viewportMargin, r.first),
            a = Math.min(i, t.visible.to + e.options.viewportMargin)
          n.viewFrom < o && o - n.viewFrom < 20 && (o = Math.max(r.first, n.viewFrom)),
            n.viewTo > a && n.viewTo - a < 20 && (a = Math.min(i, n.viewTo)),
            Ft && ((o = on(e.doc, o)), (a = an(e.doc, a)))
          var l =
            o != n.viewFrom || a != n.viewTo || n.lastWrapHeight != t.wrapperHeight || n.lastWrapWidth != t.wrapperWidth
          Vr(e, o, a), (n.viewOffset = cn(et(e.doc, n.viewFrom))), (e.display.mover.style.top = n.viewOffset + "px")
          var s = Gr(e)
          if (
            !l &&
            0 == s &&
            !t.force &&
            n.renderedView == n.view &&
            (null == n.updateLineNumbers || n.updateLineNumbers >= n.viewTo)
          )
            return !1
          var c = ji(e)
          return (
            s > 4 && (n.lineDiv.style.display = "none"),
            qi(e, n.updateLineNumbers, t.dims),
            s > 4 && (n.lineDiv.style.display = ""),
            (n.renderedView = n.view),
            Ui(c),
            A(n.cursorDiv),
            A(n.selectionDiv),
            (n.gutters.style.height = n.sizer.style.minHeight = 0),
            l && ((n.lastWrapHeight = t.wrapperHeight), (n.lastWrapWidth = t.wrapperWidth), Ii(e, 400)),
            (n.updateLineNumbers = null),
            !0
          )
        }
        function Gi(e, t) {
          for (var n = t.viewport, r = !0; ; r = !1) {
            if (r && e.options.lineWrapping && t.oldDisplayWidth != Qn(e)) r && (t.visible = ii(e.display, e.doc, n))
            else if (
              (n && null != n.top && (n = { top: Math.min(e.doc.height + Xn(e.display) - Jn(e), n.top) }),
              (t.visible = ii(e.display, e.doc, n)),
              t.visible.from >= e.display.viewFrom && t.visible.to <= e.display.viewTo)
            )
              break
            if (!Vi(e, t)) break
            ni(e)
            var i = yi(e)
            _r(e), xi(e, i), Xi(e, i), (t.force = !1)
          }
          t.signal(e, "update", e),
            (e.display.viewFrom == e.display.reportedViewFrom && e.display.viewTo == e.display.reportedViewTo) ||
              (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo),
              (e.display.reportedViewFrom = e.display.viewFrom),
              (e.display.reportedViewTo = e.display.viewTo))
        }
        function _i(e, t) {
          var n = new Ri(e, t)
          if (Vi(e, n)) {
            ni(e), Gi(e, n)
            var r = yi(e)
            _r(e), xi(e, r), Xi(e, r), n.finish()
          }
        }
        function qi(e, t, n) {
          var r = e.display,
            i = e.options.lineNumbers,
            o = r.lineDiv,
            a = o.firstChild
          function l(t) {
            var n = t.nextSibling
            return (
              s && b && e.display.currentWheelTarget == t ? (t.style.display = "none") : t.parentNode.removeChild(t), n
            )
          }
          for (var c = r.view, u = r.viewFrom, f = 0; f < c.length; f++) {
            var h = c[f]
            if (h.hidden);
            else if (h.node && h.node.parentNode == o) {
              for (; a != h.node; ) a = l(a)
              var d = i && null != t && t <= u && h.lineNumber
              h.changes && (U(h.changes, "gutter") > -1 && (d = !1), Dn(e, h, u, n)),
                d && (A(h.lineNumber), h.lineNumber.appendChild(document.createTextNode(lt(e.options, u)))),
                (a = h.node.nextSibling)
            } else {
              var p = jn(e, h, u, n)
              o.insertBefore(p, a)
            }
            u += h.size
          }
          for (; a; ) a = l(a)
        }
        function $i(e) {
          var t = e.gutters.offsetWidth
          ;(e.sizer.style.marginLeft = t + "px"), Hn(e, "gutterChanged", e)
        }
        function Xi(e, t) {
          ;(e.display.sizer.style.minHeight = t.docHeight + "px"),
            (e.display.heightForcer.style.top = t.docHeight + "px"),
            (e.display.gutters.style.height = t.docHeight + e.display.barHeight + Zn(e) + "px")
        }
        function Yi(e) {
          var t = e.display,
            n = t.view
          if (t.alignWidgets || (t.gutters.firstChild && e.options.fixedGutter)) {
            for (
              var r = Wr(t) - t.scroller.scrollLeft + e.doc.scrollLeft, i = t.gutters.offsetWidth, o = r + "px", a = 0;
              a < n.length;
              a++
            )
              if (!n[a].hidden) {
                e.options.fixedGutter &&
                  (n[a].gutter && (n[a].gutter.style.left = o),
                  n[a].gutterBackground && (n[a].gutterBackground.style.left = o))
                var l = n[a].alignable
                if (l) for (var s = 0; s < l.length; s++) l[s].style.left = o
              }
            e.options.fixedGutter && (t.gutters.style.left = r + i + "px")
          }
        }
        function Zi(e) {
          if (!e.options.lineNumbers) return !1
          var t = e.doc,
            n = lt(e.options, t.first + t.size - 1),
            r = e.display
          if (n.length != r.lineNumChars) {
            var i = r.measure.appendChild(N("div", [N("div", n)], "CodeMirror-linenumber CodeMirror-gutter-elt")),
              o = i.firstChild.offsetWidth,
              a = i.offsetWidth - o
            return (
              (r.lineGutter.style.width = ""),
              (r.lineNumInnerWidth = Math.max(o, r.lineGutter.offsetWidth - a) + 1),
              (r.lineNumWidth = r.lineNumInnerWidth + a),
              (r.lineNumChars = r.lineNumInnerWidth ? n.length : -1),
              (r.lineGutter.style.width = r.lineNumWidth + "px"),
              $i(e.display),
              !0
            )
          }
          return !1
        }
        function Qi(e, t) {
          for (var n = [], r = !1, i = 0; i < e.length; i++) {
            var o = e[i],
              a = null
            if (("string" != typeof o && ((a = o.style), (o = o.className)), "CodeMirror-linenumbers" == o)) {
              if (!t) continue
              r = !0
            }
            n.push({ className: o, style: a })
          }
          return t && !r && n.push({ className: "CodeMirror-linenumbers", style: null }), n
        }
        function Ji(e) {
          var t = e.gutters,
            n = e.gutterSpecs
          A(t), (e.lineGutter = null)
          for (var r = 0; r < n.length; ++r) {
            var i = n[r],
              o = i.className,
              a = i.style,
              l = t.appendChild(N("div", null, "CodeMirror-gutter " + o))
            a && (l.style.cssText = a),
              "CodeMirror-linenumbers" == o && ((e.lineGutter = l), (l.style.width = (e.lineNumWidth || 1) + "px"))
          }
          ;(t.style.display = n.length ? "" : "none"), $i(e)
        }
        function eo(e) {
          Ji(e.display), Rr(e), Yi(e)
        }
        function to(e, t, r, i) {
          var o = this
          ;(this.input = r),
            (o.scrollbarFiller = N("div", null, "CodeMirror-scrollbar-filler")),
            o.scrollbarFiller.setAttribute("cm-not-content", "true"),
            (o.gutterFiller = N("div", null, "CodeMirror-gutter-filler")),
            o.gutterFiller.setAttribute("cm-not-content", "true"),
            (o.lineDiv = P("div", null, "CodeMirror-code")),
            (o.selectionDiv = N("div", null, null, "position: relative; z-index: 1")),
            (o.cursorDiv = N("div", null, "CodeMirror-cursors")),
            (o.measure = N("div", null, "CodeMirror-measure")),
            (o.lineMeasure = N("div", null, "CodeMirror-measure")),
            (o.lineSpace = P(
              "div",
              [o.measure, o.lineMeasure, o.selectionDiv, o.cursorDiv, o.lineDiv],
              null,
              "position: relative; outline: none"
            ))
          var c = P("div", [o.lineSpace], "CodeMirror-lines")
          ;(o.mover = N("div", [c], null, "position: relative")),
            (o.sizer = N("div", [o.mover], "CodeMirror-sizer")),
            (o.sizerWidth = null),
            (o.heightForcer = N("div", null, null, "position: absolute; height: " + V + "px; width: 1px;")),
            (o.gutters = N("div", null, "CodeMirror-gutters")),
            (o.lineGutter = null),
            (o.scroller = N("div", [o.sizer, o.heightForcer, o.gutters], "CodeMirror-scroll")),
            o.scroller.setAttribute("tabIndex", "-1"),
            (o.wrapper = N("div", [o.scrollbarFiller, o.gutterFiller, o.scroller], "CodeMirror")),
            u && f >= 105 && (o.wrapper.style.clipPath = "inset(0px)"),
            o.wrapper.setAttribute("translate", "no"),
            a && l < 8 && ((o.gutters.style.zIndex = -1), (o.scroller.style.paddingRight = 0)),
            s || (n && y) || (o.scroller.draggable = !0),
            e && (e.appendChild ? e.appendChild(o.wrapper) : e(o.wrapper)),
            (o.viewFrom = o.viewTo = t.first),
            (o.reportedViewFrom = o.reportedViewTo = t.first),
            (o.view = []),
            (o.renderedView = null),
            (o.externalMeasured = null),
            (o.viewOffset = 0),
            (o.lastWrapHeight = o.lastWrapWidth = 0),
            (o.updateLineNumbers = null),
            (o.nativeBarWidth = o.barHeight = o.barWidth = 0),
            (o.scrollbarsClipped = !1),
            (o.lineNumWidth = o.lineNumInnerWidth = o.lineNumChars = null),
            (o.alignWidgets = !1),
            (o.cachedCharWidth = o.cachedTextHeight = o.cachedPaddingH = null),
            (o.maxLine = null),
            (o.maxLineLength = 0),
            (o.maxLineChanged = !1),
            (o.wheelDX = o.wheelDY = o.wheelStartX = o.wheelStartY = null),
            (o.shift = !1),
            (o.selForContextMenu = null),
            (o.activeTouch = null),
            (o.gutterSpecs = Qi(i.gutters, i.lineNumbers)),
            Ji(o),
            r.init(o)
        }
        ;(Ri.prototype.signal = function (e, t) {
          Ce(e, t) && this.events.push(arguments)
        }),
          (Ri.prototype.finish = function () {
            for (var e = 0; e < this.events.length; e++) we.apply(null, this.events[e])
          })
        var no = 0,
          ro = null
        function io(e) {
          var t = e.wheelDeltaX,
            n = e.wheelDeltaY
          return (
            null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail),
            null == n && e.detail && e.axis == e.VERTICAL_AXIS ? (n = e.detail) : null == n && (n = e.wheelDelta),
            { x: t, y: n }
          )
        }
        function oo(e) {
          var t = io(e)
          return (t.x *= ro), (t.y *= ro), t
        }
        function ao(e, t) {
          u &&
            102 == f &&
            (null == e.display.chromeScrollHack
              ? (e.display.sizer.style.pointerEvents = "none")
              : clearTimeout(e.display.chromeScrollHack),
            (e.display.chromeScrollHack = setTimeout(function () {
              ;(e.display.chromeScrollHack = null), (e.display.sizer.style.pointerEvents = "")
            }, 100)))
          var r = io(t),
            i = r.x,
            o = r.y,
            a = ro
          0 === t.deltaMode && ((i = t.deltaX), (o = t.deltaY), (a = 1))
          var l = e.display,
            c = l.scroller,
            d = c.scrollWidth > c.clientWidth,
            p = c.scrollHeight > c.clientHeight
          if ((i && d) || (o && p)) {
            if (o && b && s)
              e: for (var g = t.target, m = l.view; g != c; g = g.parentNode)
                for (var v = 0; v < m.length; v++)
                  if (m[v].node == g) {
                    e.display.currentWheelTarget = g
                    break e
                  }
            if (i && !n && !h && null != a)
              return (
                o && p && gi(e, Math.max(0, c.scrollTop + o * a)),
                vi(e, Math.max(0, c.scrollLeft + i * a)),
                (!o || (o && p)) && Le(t),
                void (l.wheelStartX = null)
              )
            if (o && null != a) {
              var y = o * a,
                w = e.doc.scrollTop,
                x = w + l.wrapper.clientHeight
              y < 0 ? (w = Math.max(0, w + y - 50)) : (x = Math.min(e.doc.height, x + y + 50)),
                _i(e, { top: w, bottom: x })
            }
            no < 20 &&
              0 !== t.deltaMode &&
              (null == l.wheelStartX
                ? ((l.wheelStartX = c.scrollLeft),
                  (l.wheelStartY = c.scrollTop),
                  (l.wheelDX = i),
                  (l.wheelDY = o),
                  setTimeout(function () {
                    if (null != l.wheelStartX) {
                      var e = c.scrollLeft - l.wheelStartX,
                        t = c.scrollTop - l.wheelStartY,
                        n = (t && l.wheelDY && t / l.wheelDY) || (e && l.wheelDX && e / l.wheelDX)
                      ;(l.wheelStartX = l.wheelStartY = null), n && ((ro = (ro * no + n) / (no + 1)), ++no)
                    }
                  }, 200))
                : ((l.wheelDX += i), (l.wheelDY += o)))
          }
        }
        a ? (ro = -0.53) : n ? (ro = 15) : u ? (ro = -0.7) : d && (ro = -1 / 3)
        var lo = function (e, t) {
          ;(this.ranges = e), (this.primIndex = t)
        }
        ;(lo.prototype.primary = function () {
          return this.ranges[this.primIndex]
        }),
          (lo.prototype.equals = function (e) {
            if (e == this) return !0
            if (e.primIndex != this.primIndex || e.ranges.length != this.ranges.length) return !1
            for (var t = 0; t < this.ranges.length; t++) {
              var n = this.ranges[t],
                r = e.ranges[t]
              if (!ut(n.anchor, r.anchor) || !ut(n.head, r.head)) return !1
            }
            return !0
          }),
          (lo.prototype.deepCopy = function () {
            for (var e = [], t = 0; t < this.ranges.length; t++)
              e[t] = new so(ft(this.ranges[t].anchor), ft(this.ranges[t].head))
            return new lo(e, this.primIndex)
          }),
          (lo.prototype.somethingSelected = function () {
            for (var e = 0; e < this.ranges.length; e++) if (!this.ranges[e].empty()) return !0
            return !1
          }),
          (lo.prototype.contains = function (e, t) {
            t || (t = e)
            for (var n = 0; n < this.ranges.length; n++) {
              var r = this.ranges[n]
              if (ct(t, r.from()) >= 0 && ct(e, r.to()) <= 0) return n
            }
            return -1
          })
        var so = function (e, t) {
          ;(this.anchor = e), (this.head = t)
        }
        function co(e, t, n) {
          var r = e && e.options.selectionsMayTouch,
            i = t[n]
          t.sort(function (e, t) {
            return ct(e.from(), t.from())
          }),
            (n = U(t, i))
          for (var o = 1; o < t.length; o++) {
            var a = t[o],
              l = t[o - 1],
              s = ct(l.to(), a.from())
            if (r && !a.empty() ? s > 0 : s >= 0) {
              var c = dt(l.from(), a.from()),
                u = ht(l.to(), a.to()),
                f = l.empty() ? a.from() == a.head : l.from() == l.head
              o <= n && --n, t.splice(--o, 2, new so(f ? u : c, f ? c : u))
            }
          }
          return new lo(t, n)
        }
        function uo(e, t) {
          return new lo([new so(e, t || e)], 0)
        }
        function fo(e) {
          return e.text
            ? st(e.from.line + e.text.length - 1, Q(e.text).length + (1 == e.text.length ? e.from.ch : 0))
            : e.to
        }
        function ho(e, t) {
          if (ct(e, t.from) < 0) return e
          if (ct(e, t.to) <= 0) return fo(t)
          var n = e.line + t.text.length - (t.to.line - t.from.line) - 1,
            r = e.ch
          return e.line == t.to.line && (r += fo(t).ch - t.to.ch), st(n, r)
        }
        function po(e, t) {
          for (var n = [], r = 0; r < e.sel.ranges.length; r++) {
            var i = e.sel.ranges[r]
            n.push(new so(ho(i.anchor, t), ho(i.head, t)))
          }
          return co(e.cm, n, e.sel.primIndex)
        }
        function go(e, t, n) {
          return e.line == t.line ? st(n.line, e.ch - t.ch + n.ch) : st(n.line + (e.line - t.line), e.ch)
        }
        function mo(e, t, n) {
          for (var r = [], i = st(e.first, 0), o = i, a = 0; a < t.length; a++) {
            var l = t[a],
              s = go(l.from, i, o),
              c = go(fo(l), i, o)
            if (((i = l.to), (o = c), "around" == n)) {
              var u = e.sel.ranges[a],
                f = ct(u.head, u.anchor) < 0
              r[a] = new so(f ? c : s, f ? s : c)
            } else r[a] = new so(s, s)
          }
          return new lo(r, e.sel.primIndex)
        }
        function vo(e) {
          ;(e.doc.mode = qe(e.options, e.doc.modeOption)), yo(e)
        }
        function yo(e) {
          e.doc.iter(function (e) {
            e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null)
          }),
            (e.doc.modeFrontier = e.doc.highlightFrontier = e.doc.first),
            Ii(e, 100),
            e.state.modeGen++,
            e.curOp && Rr(e)
        }
        function bo(e, t) {
          return 0 == t.from.ch && 0 == t.to.ch && "" == Q(t.text) && (!e.cm || e.cm.options.wholeLineUpdateBefore)
        }
        function wo(e, t, n, r) {
          function i(e) {
            return n ? n[e] : null
          }
          function o(e, n, i) {
            dn(e, n, i, r), Hn(e, "change", e, t)
          }
          function a(e, t) {
            for (var n = [], o = e; o < t; ++o) n.push(new hn(c[o], i(o), r))
            return n
          }
          var l = t.from,
            s = t.to,
            c = t.text,
            u = et(e, l.line),
            f = et(e, s.line),
            h = Q(c),
            d = i(c.length - 1),
            p = s.line - l.line
          if (t.full) e.insert(0, a(0, c.length)), e.remove(c.length, e.size - c.length)
          else if (bo(e, t)) {
            var g = a(0, c.length - 1)
            o(f, f.text, d), p && e.remove(l.line, p), g.length && e.insert(l.line, g)
          } else if (u == f)
            if (1 == c.length) o(u, u.text.slice(0, l.ch) + h + u.text.slice(s.ch), d)
            else {
              var m = a(1, c.length - 1)
              m.push(new hn(h + u.text.slice(s.ch), d, r)),
                o(u, u.text.slice(0, l.ch) + c[0], i(0)),
                e.insert(l.line + 1, m)
            }
          else if (1 == c.length) o(u, u.text.slice(0, l.ch) + c[0] + f.text.slice(s.ch), i(0)), e.remove(l.line + 1, p)
          else {
            o(u, u.text.slice(0, l.ch) + c[0], i(0)), o(f, h + f.text.slice(s.ch), d)
            var v = a(1, c.length - 1)
            p > 1 && e.remove(l.line + 1, p - 1), e.insert(l.line + 1, v)
          }
          Hn(e, "change", e, t)
        }
        function xo(e, t, n) {
          function r(e, i, o) {
            if (e.linked)
              for (var a = 0; a < e.linked.length; ++a) {
                var l = e.linked[a]
                if (l.doc != i) {
                  var s = o && l.sharedHist
                  ;(n && !s) || (t(l.doc, s), r(l.doc, e, s))
                }
              }
          }
          r(e, null, !0)
        }
        function ko(e, t) {
          if (t.cm) throw new Error("This document is already in use.")
          ;(e.doc = t),
            (t.cm = e),
            zr(e),
            vo(e),
            Co(e),
            (e.options.direction = t.direction),
            e.options.lineWrapping || fn(e),
            (e.options.mode = t.modeOption),
            Rr(e)
        }
        function Co(e) {
          ;("rtl" == e.doc.direction ? D : M)(e.display.lineDiv, "CodeMirror-rtl")
        }
        function So(e) {
          Di(e, function () {
            Co(e), Rr(e)
          })
        }
        function Lo(e) {
          ;(this.done = []),
            (this.undone = []),
            (this.undoDepth = e ? e.undoDepth : 1 / 0),
            (this.lastModTime = this.lastSelTime = 0),
            (this.lastOp = this.lastSelOp = null),
            (this.lastOrigin = this.lastSelOrigin = null),
            (this.generation = this.maxGeneration = e ? e.maxGeneration : 1)
        }
        function To(e, t) {
          var n = { from: ft(t.from), to: fo(t), text: tt(e, t.from, t.to) }
          return (
            Fo(e, n, t.from.line, t.to.line + 1),
            xo(
              e,
              function (e) {
                return Fo(e, n, t.from.line, t.to.line + 1)
              },
              !0
            ),
            n
          )
        }
        function Mo(e) {
          for (; e.length && Q(e).ranges; ) e.pop()
        }
        function Ao(e, t) {
          return t
            ? (Mo(e.done), Q(e.done))
            : e.done.length && !Q(e.done).ranges
              ? Q(e.done)
              : e.done.length > 1 && !e.done[e.done.length - 2].ranges
                ? (e.done.pop(), Q(e.done))
                : void 0
        }
        function Oo(e, t, n, r) {
          var i = e.history
          i.undone.length = 0
          var o,
            a,
            l = +new Date()
          if (
            (i.lastOp == r ||
              (i.lastOrigin == t.origin &&
                t.origin &&
                (("+" == t.origin.charAt(0) && i.lastModTime > l - (e.cm ? e.cm.options.historyEventDelay : 500)) ||
                  "*" == t.origin.charAt(0)))) &&
            (o = Ao(i, i.lastOp == r))
          )
            (a = Q(o.changes)),
              0 == ct(t.from, t.to) && 0 == ct(t.from, a.to) ? (a.to = fo(t)) : o.changes.push(To(e, t))
          else {
            var s = Q(i.done)
            for (
              (s && s.ranges) || Ho(e.sel, i.done),
                o = { changes: [To(e, t)], generation: i.generation },
                i.done.push(o);
              i.done.length > i.undoDepth;

            )
              i.done.shift(), i.done[0].ranges || i.done.shift()
          }
          i.done.push(n),
            (i.generation = ++i.maxGeneration),
            (i.lastModTime = i.lastSelTime = l),
            (i.lastOp = i.lastSelOp = r),
            (i.lastOrigin = i.lastSelOrigin = t.origin),
            a || we(e, "historyAdded")
        }
        function No(e, t, n, r) {
          var i = t.charAt(0)
          return (
            "*" == i ||
            ("+" == i &&
              n.ranges.length == r.ranges.length &&
              n.somethingSelected() == r.somethingSelected() &&
              new Date() - e.history.lastSelTime <= (e.cm ? e.cm.options.historyEventDelay : 500))
          )
        }
        function Po(e, t, n, r) {
          var i = e.history,
            o = r && r.origin
          n == i.lastSelOp ||
          (o &&
            i.lastSelOrigin == o &&
            ((i.lastModTime == i.lastSelTime && i.lastOrigin == o) || No(e, o, Q(i.done), t)))
            ? (i.done[i.done.length - 1] = t)
            : Ho(t, i.done),
            (i.lastSelTime = +new Date()),
            (i.lastSelOrigin = o),
            (i.lastSelOp = n),
            r && !1 !== r.clearRedo && Mo(i.undone)
        }
        function Ho(e, t) {
          var n = Q(t)
          ;(n && n.ranges && n.equals(e)) || t.push(e)
        }
        function Fo(e, t, n, r) {
          var i = t["spans_" + e.id],
            o = 0
          e.iter(Math.max(e.first, n), Math.min(e.first + e.size, r), function (n) {
            n.markedSpans && ((i || (i = t["spans_" + e.id] = {}))[o] = n.markedSpans), ++o
          })
        }
        function Do(e) {
          if (!e) return null
          for (var t, n = 0; n < e.length; ++n)
            e[n].marker.explicitlyCleared ? t || (t = e.slice(0, n)) : t && t.push(e[n])
          return t ? (t.length ? t : null) : e
        }
        function Wo(e, t) {
          var n = t["spans_" + e.id]
          if (!n) return null
          for (var r = [], i = 0; i < t.text.length; ++i) r.push(Do(n[i]))
          return r
        }
        function Eo(e, t) {
          var n = Wo(e, t),
            r = jt(e, t)
          if (!n) return r
          if (!r) return n
          for (var i = 0; i < n.length; ++i) {
            var o = n[i],
              a = r[i]
            if (o && a)
              e: for (var l = 0; l < a.length; ++l) {
                for (var s = a[l], c = 0; c < o.length; ++c) if (o[c].marker == s.marker) continue e
                o.push(s)
              }
            else a && (n[i] = a)
          }
          return n
        }
        function zo(e, t, n) {
          for (var r = [], i = 0; i < e.length; ++i) {
            var o = e[i]
            if (o.ranges) r.push(n ? lo.prototype.deepCopy.call(o) : o)
            else {
              var a = o.changes,
                l = []
              r.push({ changes: l })
              for (var s = 0; s < a.length; ++s) {
                var c = a[s],
                  u = void 0
                if ((l.push({ from: c.from, to: c.to, text: c.text }), t))
                  for (var f in c)
                    (u = f.match(/^spans_(\d+)$/)) && U(t, Number(u[1])) > -1 && ((Q(l)[f] = c[f]), delete c[f])
              }
            }
          }
          return r
        }
        function Io(e, t, n, r) {
          if (r) {
            var i = e.anchor
            if (n) {
              var o = ct(t, i) < 0
              o != ct(n, i) < 0 ? ((i = t), (t = n)) : o != ct(t, n) < 0 && (t = n)
            }
            return new so(i, t)
          }
          return new so(n || t, t)
        }
        function Bo(e, t, n, r, i) {
          null == i && (i = e.cm && (e.cm.display.shift || e.extend)),
            Go(e, new lo([Io(e.sel.primary(), t, n, i)], 0), r)
        }
        function Ro(e, t, n) {
          for (var r = [], i = e.cm && (e.cm.display.shift || e.extend), o = 0; o < e.sel.ranges.length; o++)
            r[o] = Io(e.sel.ranges[o], t[o], null, i)
          Go(e, co(e.cm, r, e.sel.primIndex), n)
        }
        function Ko(e, t, n, r) {
          var i = e.sel.ranges.slice(0)
          ;(i[t] = n), Go(e, co(e.cm, i, e.sel.primIndex), r)
        }
        function jo(e, t, n, r) {
          Go(e, uo(t, n), r)
        }
        function Uo(e, t, n) {
          var r = {
            ranges: t.ranges,
            update: function (t) {
              this.ranges = []
              for (var n = 0; n < t.length; n++) this.ranges[n] = new so(gt(e, t[n].anchor), gt(e, t[n].head))
            },
            origin: n && n.origin,
          }
          return (
            we(e, "beforeSelectionChange", e, r),
            e.cm && we(e.cm, "beforeSelectionChange", e.cm, r),
            r.ranges != t.ranges ? co(e.cm, r.ranges, r.ranges.length - 1) : t
          )
        }
        function Vo(e, t, n) {
          var r = e.history.done,
            i = Q(r)
          i && i.ranges ? ((r[r.length - 1] = t), _o(e, t, n)) : Go(e, t, n)
        }
        function Go(e, t, n) {
          _o(e, t, n), Po(e, e.sel, e.cm ? e.cm.curOp.id : NaN, n)
        }
        function _o(e, t, n) {
          ;(Ce(e, "beforeSelectionChange") || (e.cm && Ce(e.cm, "beforeSelectionChange"))) && (t = Uo(e, t, n))
          var r = (n && n.bias) || (ct(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1)
          qo(e, Xo(e, t, r, !0)),
            (n && !1 === n.scroll) || !e.cm || "nocursor" == e.cm.getOption("readOnly") || ui(e.cm)
        }
        function qo(e, t) {
          t.equals(e.sel) ||
            ((e.sel = t),
            e.cm && ((e.cm.curOp.updateInput = 1), (e.cm.curOp.selectionChanged = !0), ke(e.cm)),
            Hn(e, "cursorActivity", e))
        }
        function $o(e) {
          qo(e, Xo(e, e.sel, null, !1))
        }
        function Xo(e, t, n, r) {
          for (var i, o = 0; o < t.ranges.length; o++) {
            var a = t.ranges[o],
              l = t.ranges.length == e.sel.ranges.length && e.sel.ranges[o],
              s = Zo(e, a.anchor, l && l.anchor, n, r),
              c = a.head == a.anchor ? s : Zo(e, a.head, l && l.head, n, r)
            ;(i || s != a.anchor || c != a.head) && (i || (i = t.ranges.slice(0, o)), (i[o] = new so(s, c)))
          }
          return i ? co(e.cm, i, t.primIndex) : t
        }
        function Yo(e, t, n, r, i) {
          var o = et(e, t.line)
          if (o.markedSpans)
            for (var a = 0; a < o.markedSpans.length; ++a) {
              var l = o.markedSpans[a],
                s = l.marker,
                c = "selectLeft" in s ? !s.selectLeft : s.inclusiveLeft,
                u = "selectRight" in s ? !s.selectRight : s.inclusiveRight
              if (
                (null == l.from || (c ? l.from <= t.ch : l.from < t.ch)) &&
                (null == l.to || (u ? l.to >= t.ch : l.to > t.ch))
              ) {
                if (i && (we(s, "beforeCursorEnter"), s.explicitlyCleared)) {
                  if (o.markedSpans) {
                    --a
                    continue
                  }
                  break
                }
                if (!s.atomic) continue
                if (n) {
                  var f = s.find(r < 0 ? 1 : -1),
                    h = void 0
                  if (
                    ((r < 0 ? u : c) && (f = Qo(e, f, -r, f && f.line == t.line ? o : null)),
                    f && f.line == t.line && (h = ct(f, n)) && (r < 0 ? h < 0 : h > 0))
                  )
                    return Yo(e, f, t, r, i)
                }
                var d = s.find(r < 0 ? -1 : 1)
                return (r < 0 ? c : u) && (d = Qo(e, d, r, d.line == t.line ? o : null)), d ? Yo(e, d, t, r, i) : null
              }
            }
          return t
        }
        function Zo(e, t, n, r, i) {
          var o = r || 1,
            a = Yo(e, t, n, o, i) || (!i && Yo(e, t, n, o, !0)) || Yo(e, t, n, -o, i) || (!i && Yo(e, t, n, -o, !0))
          return a || ((e.cantEdit = !0), st(e.first, 0))
        }
        function Qo(e, t, n, r) {
          return n < 0 && 0 == t.ch
            ? t.line > e.first
              ? gt(e, st(t.line - 1))
              : null
            : n > 0 && t.ch == (r || et(e, t.line)).text.length
              ? t.line < e.first + e.size - 1
                ? st(t.line + 1, 0)
                : null
              : new st(t.line, t.ch + n)
        }
        function Jo(e) {
          e.setSelection(st(e.firstLine(), 0), st(e.lastLine()), _)
        }
        function ea(e, t, n) {
          var r = {
            canceled: !1,
            from: t.from,
            to: t.to,
            text: t.text,
            origin: t.origin,
            cancel: function () {
              return (r.canceled = !0)
            },
          }
          return (
            n &&
              (r.update = function (t, n, i, o) {
                t && (r.from = gt(e, t)), n && (r.to = gt(e, n)), i && (r.text = i), void 0 !== o && (r.origin = o)
              }),
            we(e, "beforeChange", e, r),
            e.cm && we(e.cm, "beforeChange", e.cm, r),
            r.canceled
              ? (e.cm && (e.cm.curOp.updateInput = 2), null)
              : { from: r.from, to: r.to, text: r.text, origin: r.origin }
          )
        }
        function ta(e, t, n) {
          if (e.cm) {
            if (!e.cm.curOp) return Wi(e.cm, ta)(e, t, n)
            if (e.cm.state.suppressEdits) return
          }
          if (!(Ce(e, "beforeChange") || (e.cm && Ce(e.cm, "beforeChange"))) || (t = ea(e, t, !0))) {
            var r = Ht && !n && Vt(e, t.from, t.to)
            if (r)
              for (var i = r.length - 1; i >= 0; --i)
                na(e, { from: r[i].from, to: r[i].to, text: i ? [""] : t.text, origin: t.origin })
            else na(e, t)
          }
        }
        function na(e, t) {
          if (1 != t.text.length || "" != t.text[0] || 0 != ct(t.from, t.to)) {
            var n = po(e, t)
            Oo(e, t, n, e.cm ? e.cm.curOp.id : NaN), oa(e, t, n, jt(e, t))
            var r = []
            xo(e, function (e, n) {
              n || -1 != U(r, e.history) || (ua(e.history, t), r.push(e.history)), oa(e, t, null, jt(e, t))
            })
          }
        }
        function ra(e, t, n) {
          var r = e.cm && e.cm.state.suppressEdits
          if (!r || n) {
            for (
              var i,
                o = e.history,
                a = e.sel,
                l = "undo" == t ? o.done : o.undone,
                s = "undo" == t ? o.undone : o.done,
                c = 0;
              c < l.length && ((i = l[c]), n ? !i.ranges || i.equals(e.sel) : i.ranges);
              c++
            );
            if (c != l.length) {
              for (o.lastOrigin = o.lastSelOrigin = null; ; ) {
                if (!(i = l.pop()).ranges) {
                  if (r) return void l.push(i)
                  break
                }
                if ((Ho(i, s), n && !i.equals(e.sel))) return void Go(e, i, { clearRedo: !1 })
                a = i
              }
              var u = []
              Ho(a, s),
                s.push({ changes: u, generation: o.generation }),
                (o.generation = i.generation || ++o.maxGeneration)
              for (
                var f = Ce(e, "beforeChange") || (e.cm && Ce(e.cm, "beforeChange")),
                  h = function (n) {
                    var r = i.changes[n]
                    if (((r.origin = t), f && !ea(e, r, !1))) return (l.length = 0), {}
                    u.push(To(e, r))
                    var o = n ? po(e, r) : Q(l)
                    oa(e, r, o, Eo(e, r)), !n && e.cm && e.cm.scrollIntoView({ from: r.from, to: fo(r) })
                    var a = []
                    xo(e, function (e, t) {
                      t || -1 != U(a, e.history) || (ua(e.history, r), a.push(e.history)), oa(e, r, null, Eo(e, r))
                    })
                  },
                  d = i.changes.length - 1;
                d >= 0;
                --d
              ) {
                var p = h(d)
                if (p) return p.v
              }
            }
          }
        }
        function ia(e, t) {
          if (
            0 != t &&
            ((e.first += t),
            (e.sel = new lo(
              J(e.sel.ranges, function (e) {
                return new so(st(e.anchor.line + t, e.anchor.ch), st(e.head.line + t, e.head.ch))
              }),
              e.sel.primIndex
            )),
            e.cm)
          ) {
            Rr(e.cm, e.first, e.first - t, t)
            for (var n = e.cm.display, r = n.viewFrom; r < n.viewTo; r++) Kr(e.cm, r, "gutter")
          }
        }
        function oa(e, t, n, r) {
          if (e.cm && !e.cm.curOp) return Wi(e.cm, oa)(e, t, n, r)
          if (t.to.line < e.first) ia(e, t.text.length - 1 - (t.to.line - t.from.line))
          else if (!(t.from.line > e.lastLine())) {
            if (t.from.line < e.first) {
              var i = t.text.length - 1 - (e.first - t.from.line)
              ia(e, i),
                (t = { from: st(e.first, 0), to: st(t.to.line + i, t.to.ch), text: [Q(t.text)], origin: t.origin })
            }
            var o = e.lastLine()
            t.to.line > o &&
              (t = { from: t.from, to: st(o, et(e, o).text.length), text: [t.text[0]], origin: t.origin }),
              (t.removed = tt(e, t.from, t.to)),
              n || (n = po(e, t)),
              e.cm ? aa(e.cm, t, r) : wo(e, t, r),
              _o(e, n, _),
              e.cantEdit && Zo(e, st(e.firstLine(), 0)) && (e.cantEdit = !1)
          }
        }
        function aa(e, t, n) {
          var r = e.doc,
            i = e.display,
            o = t.from,
            a = t.to,
            l = !1,
            s = o.line
          e.options.lineWrapping ||
            ((s = it(tn(et(r, o.line)))),
            r.iter(s, a.line + 1, function (e) {
              if (e == i.maxLine) return (l = !0), !0
            })),
            r.sel.contains(t.from, t.to) > -1 && ke(e),
            wo(r, t, n, Er(e)),
            e.options.lineWrapping ||
              (r.iter(s, o.line + t.text.length, function (e) {
                var t = un(e)
                t > i.maxLineLength && ((i.maxLine = e), (i.maxLineLength = t), (i.maxLineChanged = !0), (l = !1))
              }),
              l && (e.curOp.updateMaxLine = !0)),
            Pt(r, o.line),
            Ii(e, 400)
          var c = t.text.length - (a.line - o.line) - 1
          t.full
            ? Rr(e)
            : o.line != a.line || 1 != t.text.length || bo(e.doc, t)
              ? Rr(e, o.line, a.line + 1, c)
              : Kr(e, o.line, "text")
          var u = Ce(e, "changes"),
            f = Ce(e, "change")
          if (f || u) {
            var h = { from: o, to: a, text: t.text, removed: t.removed, origin: t.origin }
            f && Hn(e, "change", e, h), u && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(h)
          }
          e.display.selForContextMenu = null
        }
        function la(e, t, n, r, i) {
          var o
          r || (r = n),
            ct(r, n) < 0 && ((n = (o = [r, n])[0]), (r = o[1])),
            "string" == typeof t && (t = e.splitLines(t)),
            ta(e, { from: n, to: r, text: t, origin: i })
        }
        function sa(e, t, n, r) {
          n < e.line ? (e.line += r) : t < e.line && ((e.line = t), (e.ch = 0))
        }
        function ca(e, t, n, r) {
          for (var i = 0; i < e.length; ++i) {
            var o = e[i],
              a = !0
            if (o.ranges) {
              o.copied || ((o = e[i] = o.deepCopy()).copied = !0)
              for (var l = 0; l < o.ranges.length; l++) sa(o.ranges[l].anchor, t, n, r), sa(o.ranges[l].head, t, n, r)
            } else {
              for (var s = 0; s < o.changes.length; ++s) {
                var c = o.changes[s]
                if (n < c.from.line) (c.from = st(c.from.line + r, c.from.ch)), (c.to = st(c.to.line + r, c.to.ch))
                else if (t <= c.to.line) {
                  a = !1
                  break
                }
              }
              a || (e.splice(0, i + 1), (i = 0))
            }
          }
        }
        function ua(e, t) {
          var n = t.from.line,
            r = t.to.line,
            i = t.text.length - (r - n) - 1
          ca(e.done, n, r, i), ca(e.undone, n, r, i)
        }
        function fa(e, t, n, r) {
          var i = t,
            o = t
          return (
            "number" == typeof t ? (o = et(e, pt(e, t))) : (i = it(t)),
            null == i ? null : (r(o, i) && e.cm && Kr(e.cm, i, n), o)
          )
        }
        function ha(e) {
          ;(this.lines = e), (this.parent = null)
          for (var t = 0, n = 0; n < e.length; ++n) (e[n].parent = this), (t += e[n].height)
          this.height = t
        }
        function da(e) {
          this.children = e
          for (var t = 0, n = 0, r = 0; r < e.length; ++r) {
            var i = e[r]
            ;(t += i.chunkSize()), (n += i.height), (i.parent = this)
          }
          ;(this.size = t), (this.height = n), (this.parent = null)
        }
        ;(so.prototype.from = function () {
          return dt(this.anchor, this.head)
        }),
          (so.prototype.to = function () {
            return ht(this.anchor, this.head)
          }),
          (so.prototype.empty = function () {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
          }),
          (ha.prototype = {
            chunkSize: function () {
              return this.lines.length
            },
            removeInner: function (e, t) {
              for (var n = e, r = e + t; n < r; ++n) {
                var i = this.lines[n]
                ;(this.height -= i.height), pn(i), Hn(i, "delete")
              }
              this.lines.splice(e, t)
            },
            collapse: function (e) {
              e.push.apply(e, this.lines)
            },
            insertInner: function (e, t, n) {
              ;(this.height += n), (this.lines = this.lines.slice(0, e).concat(t).concat(this.lines.slice(e)))
              for (var r = 0; r < t.length; ++r) t[r].parent = this
            },
            iterN: function (e, t, n) {
              for (var r = e + t; e < r; ++e) if (n(this.lines[e])) return !0
            },
          }),
          (da.prototype = {
            chunkSize: function () {
              return this.size
            },
            removeInner: function (e, t) {
              this.size -= t
              for (var n = 0; n < this.children.length; ++n) {
                var r = this.children[n],
                  i = r.chunkSize()
                if (e < i) {
                  var o = Math.min(t, i - e),
                    a = r.height
                  if (
                    (r.removeInner(e, o),
                    (this.height -= a - r.height),
                    i == o && (this.children.splice(n--, 1), (r.parent = null)),
                    0 == (t -= o))
                  )
                    break
                  e = 0
                } else e -= i
              }
              if (this.size - t < 25 && (this.children.length > 1 || !(this.children[0] instanceof ha))) {
                var l = []
                this.collapse(l), (this.children = [new ha(l)]), (this.children[0].parent = this)
              }
            },
            collapse: function (e) {
              for (var t = 0; t < this.children.length; ++t) this.children[t].collapse(e)
            },
            insertInner: function (e, t, n) {
              ;(this.size += t.length), (this.height += n)
              for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                  o = i.chunkSize()
                if (e <= o) {
                  if ((i.insertInner(e, t, n), i.lines && i.lines.length > 50)) {
                    for (var a = (i.lines.length % 25) + 25, l = a; l < i.lines.length; ) {
                      var s = new ha(i.lines.slice(l, (l += 25)))
                      ;(i.height -= s.height), this.children.splice(++r, 0, s), (s.parent = this)
                    }
                    ;(i.lines = i.lines.slice(0, a)), this.maybeSpill()
                  }
                  break
                }
                e -= o
              }
            },
            maybeSpill: function () {
              if (!(this.children.length <= 10)) {
                var e = this
                do {
                  var t = new da(e.children.splice(e.children.length - 5, 5))
                  if (e.parent) {
                    ;(e.size -= t.size), (e.height -= t.height)
                    var n = U(e.parent.children, e)
                    e.parent.children.splice(n + 1, 0, t)
                  } else {
                    var r = new da(e.children)
                    ;(r.parent = e), (e.children = [r, t]), (e = r)
                  }
                  t.parent = e.parent
                } while (e.children.length > 10)
                e.parent.maybeSpill()
              }
            },
            iterN: function (e, t, n) {
              for (var r = 0; r < this.children.length; ++r) {
                var i = this.children[r],
                  o = i.chunkSize()
                if (e < o) {
                  var a = Math.min(t, o - e)
                  if (i.iterN(e, a, n)) return !0
                  if (0 == (t -= a)) break
                  e = 0
                } else e -= o
              }
            },
          })
        var pa = function (e, t, n) {
          if (n) for (var r in n) n.hasOwnProperty(r) && (this[r] = n[r])
          ;(this.doc = e), (this.node = t)
        }
        function ga(e, t, n) {
          cn(t) < ((e.curOp && e.curOp.scrollTop) || e.doc.scrollTop) && ci(e, n)
        }
        function ma(e, t, n, r) {
          var i = new pa(e, n, r),
            o = e.cm
          return (
            o && i.noHScroll && (o.display.alignWidgets = !0),
            fa(e, t, "widget", function (t) {
              var n = t.widgets || (t.widgets = [])
              if (
                (null == i.insertAt ? n.push(i) : n.splice(Math.min(n.length, Math.max(0, i.insertAt)), 0, i),
                (i.line = t),
                o && !ln(e, t))
              ) {
                var r = cn(t) < e.scrollTop
                rt(t, t.height + _n(i)), r && ci(o, i.height), (o.curOp.forceUpdate = !0)
              }
              return !0
            }),
            o && Hn(o, "lineWidgetAdded", o, i, "number" == typeof t ? t : it(t)),
            i
          )
        }
        ;(pa.prototype.clear = function () {
          var e = this.doc.cm,
            t = this.line.widgets,
            n = this.line,
            r = it(n)
          if (null != r && t) {
            for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1)
            t.length || (n.widgets = null)
            var o = _n(this)
            rt(n, Math.max(0, n.height - o)),
              e &&
                (Di(e, function () {
                  ga(e, n, -o), Kr(e, r, "widget")
                }),
                Hn(e, "lineWidgetCleared", e, this, r))
          }
        }),
          (pa.prototype.changed = function () {
            var e = this,
              t = this.height,
              n = this.doc.cm,
              r = this.line
            this.height = null
            var i = _n(this) - t
            i &&
              (ln(this.doc, r) || rt(r, r.height + i),
              n &&
                Di(n, function () {
                  ;(n.curOp.forceUpdate = !0), ga(n, r, i), Hn(n, "lineWidgetChanged", n, e, it(r))
                }))
          }),
          Se(pa)
        var va = 0,
          ya = function (e, t) {
            ;(this.lines = []), (this.type = t), (this.doc = e), (this.id = ++va)
          }
        function ba(e, t, n, r, i) {
          if (r && r.shared) return xa(e, t, n, r, i)
          if (e.cm && !e.cm.curOp) return Wi(e.cm, ba)(e, t, n, r, i)
          var o = new ya(e, i),
            a = ct(t, n)
          if ((r && R(r, o, !1), a > 0 || (0 == a && !1 !== o.clearWhenEmpty))) return o
          if (
            (o.replacedWith &&
              ((o.collapsed = !0),
              (o.widgetNode = P("span", [o.replacedWith], "CodeMirror-widget")),
              r.handleMouseEvents || o.widgetNode.setAttribute("cm-ignore-events", "true"),
              r.insertLeft && (o.widgetNode.insertLeft = !0)),
            o.collapsed)
          ) {
            if (en(e, t.line, t, n, o) || (t.line != n.line && en(e, n.line, t, n, o)))
              throw new Error("Inserting collapsed marker partially overlapping an existing one")
            Wt()
          }
          o.addToHistory && Oo(e, { from: t, to: n, origin: "markText" }, e.sel, NaN)
          var l,
            s = t.line,
            c = e.cm
          if (
            (e.iter(s, n.line + 1, function (r) {
              c && o.collapsed && !c.options.lineWrapping && tn(r) == c.display.maxLine && (l = !0),
                o.collapsed && s != t.line && rt(r, 0),
                Bt(r, new Et(o, s == t.line ? t.ch : null, s == n.line ? n.ch : null), e.cm && e.cm.curOp),
                ++s
            }),
            o.collapsed &&
              e.iter(t.line, n.line + 1, function (t) {
                ln(e, t) && rt(t, 0)
              }),
            o.clearOnEnter &&
              ve(o, "beforeCursorEnter", function () {
                return o.clear()
              }),
            o.readOnly && (Dt(), (e.history.done.length || e.history.undone.length) && e.clearHistory()),
            o.collapsed && ((o.id = ++va), (o.atomic = !0)),
            c)
          ) {
            if ((l && (c.curOp.updateMaxLine = !0), o.collapsed)) Rr(c, t.line, n.line + 1)
            else if (o.className || o.startStyle || o.endStyle || o.css || o.attributes || o.title)
              for (var u = t.line; u <= n.line; u++) Kr(c, u, "text")
            o.atomic && $o(c.doc), Hn(c, "markerAdded", c, o)
          }
          return o
        }
        ;(ya.prototype.clear = function () {
          if (!this.explicitlyCleared) {
            var e = this.doc.cm,
              t = e && !e.curOp
            if ((t && Ti(e), Ce(this, "clear"))) {
              var n = this.find()
              n && Hn(this, "clear", n.from, n.to)
            }
            for (var r = null, i = null, o = 0; o < this.lines.length; ++o) {
              var a = this.lines[o],
                l = zt(a.markedSpans, this)
              e && !this.collapsed
                ? Kr(e, it(a), "text")
                : e && (null != l.to && (i = it(a)), null != l.from && (r = it(a))),
                (a.markedSpans = It(a.markedSpans, l)),
                null == l.from && this.collapsed && !ln(this.doc, a) && e && rt(a, Hr(e.display))
            }
            if (e && this.collapsed && !e.options.lineWrapping)
              for (var s = 0; s < this.lines.length; ++s) {
                var c = tn(this.lines[s]),
                  u = un(c)
                u > e.display.maxLineLength &&
                  ((e.display.maxLine = c), (e.display.maxLineLength = u), (e.display.maxLineChanged = !0))
              }
            null != r && e && this.collapsed && Rr(e, r, i + 1),
              (this.lines.length = 0),
              (this.explicitlyCleared = !0),
              this.atomic && this.doc.cantEdit && ((this.doc.cantEdit = !1), e && $o(e.doc)),
              e && Hn(e, "markerCleared", e, this, r, i),
              t && Mi(e),
              this.parent && this.parent.clear()
          }
        }),
          (ya.prototype.find = function (e, t) {
            var n, r
            null == e && "bookmark" == this.type && (e = 1)
            for (var i = 0; i < this.lines.length; ++i) {
              var o = this.lines[i],
                a = zt(o.markedSpans, this)
              if (null != a.from && ((n = st(t ? o : it(o), a.from)), -1 == e)) return n
              if (null != a.to && ((r = st(t ? o : it(o), a.to)), 1 == e)) return r
            }
            return n && { from: n, to: r }
          }),
          (ya.prototype.changed = function () {
            var e = this,
              t = this.find(-1, !0),
              n = this,
              r = this.doc.cm
            t &&
              r &&
              Di(r, function () {
                var i = t.line,
                  o = it(t.line),
                  a = ir(r, o)
                if (
                  (a && (dr(a), (r.curOp.selectionChanged = r.curOp.forceUpdate = !0)),
                  (r.curOp.updateMaxLine = !0),
                  !ln(n.doc, i) && null != n.height)
                ) {
                  var l = n.height
                  n.height = null
                  var s = _n(n) - l
                  s && rt(i, i.height + s)
                }
                Hn(r, "markerChanged", r, e)
              })
          }),
          (ya.prototype.attachLine = function (e) {
            if (!this.lines.length && this.doc.cm) {
              var t = this.doc.cm.curOp
              ;(t.maybeHiddenMarkers && -1 != U(t.maybeHiddenMarkers, this)) ||
                (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this)
            }
            this.lines.push(e)
          }),
          (ya.prototype.detachLine = function (e) {
            if ((this.lines.splice(U(this.lines, e), 1), !this.lines.length && this.doc.cm)) {
              var t = this.doc.cm.curOp
              ;(t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this)
            }
          }),
          Se(ya)
        var wa = function (e, t) {
          ;(this.markers = e), (this.primary = t)
          for (var n = 0; n < e.length; ++n) e[n].parent = this
        }
        function xa(e, t, n, r, i) {
          ;(r = R(r)).shared = !1
          var o = [ba(e, t, n, r, i)],
            a = o[0],
            l = r.widgetNode
          return (
            xo(e, function (e) {
              l && (r.widgetNode = l.cloneNode(!0)), o.push(ba(e, gt(e, t), gt(e, n), r, i))
              for (var s = 0; s < e.linked.length; ++s) if (e.linked[s].isParent) return
              a = Q(o)
            }),
            new wa(o, a)
          )
        }
        function ka(e) {
          return e.findMarks(st(e.first, 0), e.clipPos(st(e.lastLine())), function (e) {
            return e.parent
          })
        }
        function Ca(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n],
              i = r.find(),
              o = e.clipPos(i.from),
              a = e.clipPos(i.to)
            if (ct(o, a)) {
              var l = ba(e, o, a, r.primary, r.primary.type)
              r.markers.push(l), (l.parent = r)
            }
          }
        }
        function Sa(e) {
          for (
            var t = function (t) {
                var n = e[t],
                  r = [n.primary.doc]
                xo(n.primary.doc, function (e) {
                  return r.push(e)
                })
                for (var i = 0; i < n.markers.length; i++) {
                  var o = n.markers[i]
                  ;-1 == U(r, o.doc) && ((o.parent = null), n.markers.splice(i--, 1))
                }
              },
              n = 0;
            n < e.length;
            n++
          )
            t(n)
        }
        ;(wa.prototype.clear = function () {
          if (!this.explicitlyCleared) {
            this.explicitlyCleared = !0
            for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear()
            Hn(this, "clear")
          }
        }),
          (wa.prototype.find = function (e, t) {
            return this.primary.find(e, t)
          }),
          Se(wa)
        var La = 0,
          Ta = function (e, t, n, r, i) {
            if (!(this instanceof Ta)) return new Ta(e, t, n, r, i)
            null == n && (n = 0),
              da.call(this, [new ha([new hn("", null)])]),
              (this.first = n),
              (this.scrollTop = this.scrollLeft = 0),
              (this.cantEdit = !1),
              (this.cleanGeneration = 1),
              (this.modeFrontier = this.highlightFrontier = n)
            var o = st(n, 0)
            ;(this.sel = uo(o)),
              (this.history = new Lo(null)),
              (this.id = ++La),
              (this.modeOption = t),
              (this.lineSep = r),
              (this.direction = "rtl" == i ? "rtl" : "ltr"),
              (this.extend = !1),
              "string" == typeof e && (e = this.splitLines(e)),
              wo(this, { from: o, to: o, text: e }),
              Go(this, uo(o), _)
          }
        ;(Ta.prototype = ne(da.prototype, {
          constructor: Ta,
          iter: function (e, t, n) {
            n ? this.iterN(e - this.first, t - e, n) : this.iterN(this.first, this.first + this.size, e)
          },
          insert: function (e, t) {
            for (var n = 0, r = 0; r < t.length; ++r) n += t[r].height
            this.insertInner(e - this.first, t, n)
          },
          remove: function (e, t) {
            this.removeInner(e - this.first, t)
          },
          getValue: function (e) {
            var t = nt(this, this.first, this.first + this.size)
            return !1 === e ? t : t.join(e || this.lineSeparator())
          },
          setValue: zi(function (e) {
            var t = st(this.first, 0),
              n = this.first + this.size - 1
            ta(
              this,
              { from: t, to: st(n, et(this, n).text.length), text: this.splitLines(e), origin: "setValue", full: !0 },
              !0
            ),
              this.cm && fi(this.cm, 0, 0),
              Go(this, uo(t), _)
          }),
          replaceRange: function (e, t, n, r) {
            la(this, e, (t = gt(this, t)), (n = n ? gt(this, n) : t), r)
          },
          getRange: function (e, t, n) {
            var r = tt(this, gt(this, e), gt(this, t))
            return !1 === n ? r : "" === n ? r.join("") : r.join(n || this.lineSeparator())
          },
          getLine: function (e) {
            var t = this.getLineHandle(e)
            return t && t.text
          },
          getLineHandle: function (e) {
            if (at(this, e)) return et(this, e)
          },
          getLineNumber: function (e) {
            return it(e)
          },
          getLineHandleVisualStart: function (e) {
            return "number" == typeof e && (e = et(this, e)), tn(e)
          },
          lineCount: function () {
            return this.size
          },
          firstLine: function () {
            return this.first
          },
          lastLine: function () {
            return this.first + this.size - 1
          },
          clipPos: function (e) {
            return gt(this, e)
          },
          getCursor: function (e) {
            var t = this.sel.primary()
            return null == e || "head" == e
              ? t.head
              : "anchor" == e
                ? t.anchor
                : "end" == e || "to" == e || !1 === e
                  ? t.to()
                  : t.from()
          },
          listSelections: function () {
            return this.sel.ranges
          },
          somethingSelected: function () {
            return this.sel.somethingSelected()
          },
          setCursor: zi(function (e, t, n) {
            jo(this, gt(this, "number" == typeof e ? st(e, t || 0) : e), null, n)
          }),
          setSelection: zi(function (e, t, n) {
            jo(this, gt(this, e), gt(this, t || e), n)
          }),
          extendSelection: zi(function (e, t, n) {
            Bo(this, gt(this, e), t && gt(this, t), n)
          }),
          extendSelections: zi(function (e, t) {
            Ro(this, vt(this, e), t)
          }),
          extendSelectionsBy: zi(function (e, t) {
            Ro(this, vt(this, J(this.sel.ranges, e)), t)
          }),
          setSelections: zi(function (e, t, n) {
            if (e.length) {
              for (var r = [], i = 0; i < e.length; i++)
                r[i] = new so(gt(this, e[i].anchor), gt(this, e[i].head || e[i].anchor))
              null == t && (t = Math.min(e.length - 1, this.sel.primIndex)), Go(this, co(this.cm, r, t), n)
            }
          }),
          addSelection: zi(function (e, t, n) {
            var r = this.sel.ranges.slice(0)
            r.push(new so(gt(this, e), gt(this, t || e))), Go(this, co(this.cm, r, r.length - 1), n)
          }),
          getSelection: function (e) {
            for (var t, n = this.sel.ranges, r = 0; r < n.length; r++) {
              var i = tt(this, n[r].from(), n[r].to())
              t = t ? t.concat(i) : i
            }
            return !1 === e ? t : t.join(e || this.lineSeparator())
          },
          getSelections: function (e) {
            for (var t = [], n = this.sel.ranges, r = 0; r < n.length; r++) {
              var i = tt(this, n[r].from(), n[r].to())
              !1 !== e && (i = i.join(e || this.lineSeparator())), (t[r] = i)
            }
            return t
          },
          replaceSelection: function (e, t, n) {
            for (var r = [], i = 0; i < this.sel.ranges.length; i++) r[i] = e
            this.replaceSelections(r, t, n || "+input")
          },
          replaceSelections: zi(function (e, t, n) {
            for (var r = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
              var a = i.ranges[o]
              r[o] = { from: a.from(), to: a.to(), text: this.splitLines(e[o]), origin: n }
            }
            for (var l = t && "end" != t && mo(this, r, t), s = r.length - 1; s >= 0; s--) ta(this, r[s])
            l ? Vo(this, l) : this.cm && ui(this.cm)
          }),
          undo: zi(function () {
            ra(this, "undo")
          }),
          redo: zi(function () {
            ra(this, "redo")
          }),
          undoSelection: zi(function () {
            ra(this, "undo", !0)
          }),
          redoSelection: zi(function () {
            ra(this, "redo", !0)
          }),
          setExtending: function (e) {
            this.extend = e
          },
          getExtending: function () {
            return this.extend
          },
          historySize: function () {
            for (var e = this.history, t = 0, n = 0, r = 0; r < e.done.length; r++) e.done[r].ranges || ++t
            for (var i = 0; i < e.undone.length; i++) e.undone[i].ranges || ++n
            return { undo: t, redo: n }
          },
          clearHistory: function () {
            var e = this
            ;(this.history = new Lo(this.history)),
              xo(
                this,
                function (t) {
                  return (t.history = e.history)
                },
                !0
              )
          },
          markClean: function () {
            this.cleanGeneration = this.changeGeneration(!0)
          },
          changeGeneration: function (e) {
            return (
              e && (this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null),
              this.history.generation
            )
          },
          isClean: function (e) {
            return this.history.generation == (e || this.cleanGeneration)
          },
          getHistory: function () {
            return { done: zo(this.history.done), undone: zo(this.history.undone) }
          },
          setHistory: function (e) {
            var t = (this.history = new Lo(this.history))
            ;(t.done = zo(e.done.slice(0), null, !0)), (t.undone = zo(e.undone.slice(0), null, !0))
          },
          setGutterMarker: zi(function (e, t, n) {
            return fa(this, e, "gutter", function (e) {
              var r = e.gutterMarkers || (e.gutterMarkers = {})
              return (r[t] = n), !n && ae(r) && (e.gutterMarkers = null), !0
            })
          }),
          clearGutter: zi(function (e) {
            var t = this
            this.iter(function (n) {
              n.gutterMarkers &&
                n.gutterMarkers[e] &&
                fa(t, n, "gutter", function () {
                  return (n.gutterMarkers[e] = null), ae(n.gutterMarkers) && (n.gutterMarkers = null), !0
                })
            })
          }),
          lineInfo: function (e) {
            var t
            if ("number" == typeof e) {
              if (!at(this, e)) return null
              if (((t = e), !(e = et(this, e)))) return null
            } else if (null == (t = it(e))) return null
            return {
              line: t,
              handle: e,
              text: e.text,
              gutterMarkers: e.gutterMarkers,
              textClass: e.textClass,
              bgClass: e.bgClass,
              wrapClass: e.wrapClass,
              widgets: e.widgets,
            }
          },
          addLineClass: zi(function (e, t, n) {
            return fa(this, e, "gutter" == t ? "gutter" : "class", function (e) {
              var r =
                "text" == t ? "textClass" : "background" == t ? "bgClass" : "gutter" == t ? "gutterClass" : "wrapClass"
              if (e[r]) {
                if (L(n).test(e[r])) return !1
                e[r] += " " + n
              } else e[r] = n
              return !0
            })
          }),
          removeLineClass: zi(function (e, t, n) {
            return fa(this, e, "gutter" == t ? "gutter" : "class", function (e) {
              var r =
                  "text" == t
                    ? "textClass"
                    : "background" == t
                      ? "bgClass"
                      : "gutter" == t
                        ? "gutterClass"
                        : "wrapClass",
                i = e[r]
              if (!i) return !1
              if (null == n) e[r] = null
              else {
                var o = i.match(L(n))
                if (!o) return !1
                var a = o.index + o[0].length
                e[r] = i.slice(0, o.index) + (o.index && a != i.length ? " " : "") + i.slice(a) || null
              }
              return !0
            })
          }),
          addLineWidget: zi(function (e, t, n) {
            return ma(this, e, t, n)
          }),
          removeLineWidget: function (e) {
            e.clear()
          },
          markText: function (e, t, n) {
            return ba(this, gt(this, e), gt(this, t), n, (n && n.type) || "range")
          },
          setBookmark: function (e, t) {
            var n = {
              replacedWith: t && (null == t.nodeType ? t.widget : t),
              insertLeft: t && t.insertLeft,
              clearWhenEmpty: !1,
              shared: t && t.shared,
              handleMouseEvents: t && t.handleMouseEvents,
            }
            return ba(this, (e = gt(this, e)), e, n, "bookmark")
          },
          findMarksAt: function (e) {
            var t = [],
              n = et(this, (e = gt(this, e)).line).markedSpans
            if (n)
              for (var r = 0; r < n.length; ++r) {
                var i = n[r]
                ;(null == i.from || i.from <= e.ch) &&
                  (null == i.to || i.to >= e.ch) &&
                  t.push(i.marker.parent || i.marker)
              }
            return t
          },
          findMarks: function (e, t, n) {
            ;(e = gt(this, e)), (t = gt(this, t))
            var r = [],
              i = e.line
            return (
              this.iter(e.line, t.line + 1, function (o) {
                var a = o.markedSpans
                if (a)
                  for (var l = 0; l < a.length; l++) {
                    var s = a[l]
                    ;(null != s.to && i == e.line && e.ch >= s.to) ||
                      (null == s.from && i != e.line) ||
                      (null != s.from && i == t.line && s.from >= t.ch) ||
                      (n && !n(s.marker)) ||
                      r.push(s.marker.parent || s.marker)
                  }
                ++i
              }),
              r
            )
          },
          getAllMarks: function () {
            var e = []
            return (
              this.iter(function (t) {
                var n = t.markedSpans
                if (n) for (var r = 0; r < n.length; ++r) null != n[r].from && e.push(n[r].marker)
              }),
              e
            )
          },
          posFromIndex: function (e) {
            var t,
              n = this.first,
              r = this.lineSeparator().length
            return (
              this.iter(function (i) {
                var o = i.text.length + r
                if (o > e) return (t = e), !0
                ;(e -= o), ++n
              }),
              gt(this, st(n, t))
            )
          },
          indexFromPos: function (e) {
            var t = (e = gt(this, e)).ch
            if (e.line < this.first || e.ch < 0) return 0
            var n = this.lineSeparator().length
            return (
              this.iter(this.first, e.line, function (e) {
                t += e.text.length + n
              }),
              t
            )
          },
          copy: function (e) {
            var t = new Ta(
              nt(this, this.first, this.first + this.size),
              this.modeOption,
              this.first,
              this.lineSep,
              this.direction
            )
            return (
              (t.scrollTop = this.scrollTop),
              (t.scrollLeft = this.scrollLeft),
              (t.sel = this.sel),
              (t.extend = !1),
              e && ((t.history.undoDepth = this.history.undoDepth), t.setHistory(this.getHistory())),
              t
            )
          },
          linkedDoc: function (e) {
            e || (e = {})
            var t = this.first,
              n = this.first + this.size
            null != e.from && e.from > t && (t = e.from), null != e.to && e.to < n && (n = e.to)
            var r = new Ta(nt(this, t, n), e.mode || this.modeOption, t, this.lineSep, this.direction)
            return (
              e.sharedHist && (r.history = this.history),
              (this.linked || (this.linked = [])).push({ doc: r, sharedHist: e.sharedHist }),
              (r.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }]),
              Ca(r, ka(this)),
              r
            )
          },
          unlinkDoc: function (e) {
            if ((e instanceof Rl && (e = e.doc), this.linked))
              for (var t = 0; t < this.linked.length; ++t)
                if (this.linked[t].doc == e) {
                  this.linked.splice(t, 1), e.unlinkDoc(this), Sa(ka(this))
                  break
                }
            if (e.history == this.history) {
              var n = [e.id]
              xo(
                e,
                function (e) {
                  return n.push(e.id)
                },
                !0
              ),
                (e.history = new Lo(null)),
                (e.history.done = zo(this.history.done, n)),
                (e.history.undone = zo(this.history.undone, n))
            }
          },
          iterLinkedDocs: function (e) {
            xo(this, e)
          },
          getMode: function () {
            return this.mode
          },
          getEditor: function () {
            return this.cm
          },
          splitLines: function (e) {
            return this.lineSep ? e.split(this.lineSep) : ze(e)
          },
          lineSeparator: function () {
            return this.lineSep || "\n"
          },
          setDirection: zi(function (e) {
            "rtl" != e && (e = "ltr"),
              e != this.direction &&
                ((this.direction = e),
                this.iter(function (e) {
                  return (e.order = null)
                }),
                this.cm && So(this.cm))
          }),
        })),
          (Ta.prototype.eachLine = Ta.prototype.iter)
        var Ma = 0
        function Aa(e) {
          var t = this
          if ((Pa(t), !xe(t, e) && !qn(t.display, e))) {
            Le(e), a && (Ma = +new Date())
            var n = Ir(t, e, !0),
              r = e.dataTransfer.files
            if (n && !t.isReadOnly())
              if (r && r.length && window.FileReader && window.File)
                for (
                  var i = r.length,
                    o = Array(i),
                    l = 0,
                    s = function () {
                      ++l == i &&
                        Wi(t, function () {
                          var e = {
                            from: (n = gt(t.doc, n)),
                            to: n,
                            text: t.doc.splitLines(
                              o
                                .filter(function (e) {
                                  return null != e
                                })
                                .join(t.doc.lineSeparator())
                            ),
                            origin: "paste",
                          }
                          ta(t.doc, e), Vo(t.doc, uo(gt(t.doc, n), gt(t.doc, fo(e))))
                        })()
                    },
                    c = function (e, n) {
                      if (t.options.allowDropFileTypes && -1 == U(t.options.allowDropFileTypes, e.type)) s()
                      else {
                        var r = new FileReader()
                        ;(r.onerror = function () {
                          return s()
                        }),
                          (r.onload = function () {
                            var e = r.result
                            ;/[\x00-\x08\x0e-\x1f]{2}/.test(e) || (o[n] = e), s()
                          }),
                          r.readAsText(e)
                      }
                    },
                    u = 0;
                  u < r.length;
                  u++
                )
                  c(r[u], u)
              else {
                if (t.state.draggingText && t.doc.sel.contains(n) > -1)
                  return (
                    t.state.draggingText(e),
                    void setTimeout(function () {
                      return t.display.input.focus()
                    }, 20)
                  )
                try {
                  var f = e.dataTransfer.getData("Text")
                  if (f) {
                    var h
                    if (
                      (t.state.draggingText && !t.state.draggingText.copy && (h = t.listSelections()),
                      _o(t.doc, uo(n, n)),
                      h)
                    )
                      for (var d = 0; d < h.length; ++d) la(t.doc, "", h[d].anchor, h[d].head, "drag")
                    t.replaceSelection(f, "around", "paste"), t.display.input.focus()
                  }
                } catch (e) {}
              }
          }
        }
        function Oa(e, t) {
          if (a && (!e.state.draggingText || +new Date() - Ma < 100)) Ae(t)
          else if (
            !xe(e, t) &&
            !qn(e.display, t) &&
            (t.dataTransfer.setData("Text", e.getSelection()),
            (t.dataTransfer.effectAllowed = "copyMove"),
            t.dataTransfer.setDragImage && !d)
          ) {
            var n = N("img", null, null, "position: fixed; left: 0; top: 0;")
            ;(n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
              h && ((n.width = n.height = 1), e.display.wrapper.appendChild(n), (n._top = n.offsetTop)),
              t.dataTransfer.setDragImage(n, 0, 0),
              h && n.parentNode.removeChild(n)
          }
        }
        function Na(e, t) {
          var n = Ir(e, t)
          if (n) {
            var r = document.createDocumentFragment()
            $r(e, n, r),
              e.display.dragCursor ||
                ((e.display.dragCursor = N("div", null, "CodeMirror-cursors CodeMirror-dragcursors")),
                e.display.lineSpace.insertBefore(e.display.dragCursor, e.display.cursorDiv)),
              O(e.display.dragCursor, r)
          }
        }
        function Pa(e) {
          e.display.dragCursor && (e.display.lineSpace.removeChild(e.display.dragCursor), (e.display.dragCursor = null))
        }
        function Ha(e) {
          if (document.getElementsByClassName) {
            for (var t = document.getElementsByClassName("CodeMirror"), n = [], r = 0; r < t.length; r++) {
              var i = t[r].CodeMirror
              i && n.push(i)
            }
            n.length &&
              n[0].operation(function () {
                for (var t = 0; t < n.length; t++) e(n[t])
              })
          }
        }
        var Fa = !1
        function Da() {
          Fa || (Wa(), (Fa = !0))
        }
        function Wa() {
          var e
          ve(window, "resize", function () {
            null == e &&
              (e = setTimeout(function () {
                ;(e = null), Ha(Ea)
              }, 100))
          }),
            ve(window, "blur", function () {
              return Ha(ti)
            })
        }
        function Ea(e) {
          var t = e.display
          ;(t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null), (t.scrollbarsClipped = !1), e.setSize()
        }
        for (
          var za = {
              3: "Pause",
              8: "Backspace",
              9: "Tab",
              13: "Enter",
              16: "Shift",
              17: "Ctrl",
              18: "Alt",
              19: "Pause",
              20: "CapsLock",
              27: "Esc",
              32: "Space",
              33: "PageUp",
              34: "PageDown",
              35: "End",
              36: "Home",
              37: "Left",
              38: "Up",
              39: "Right",
              40: "Down",
              44: "PrintScrn",
              45: "Insert",
              46: "Delete",
              59: ";",
              61: "=",
              91: "Mod",
              92: "Mod",
              93: "Mod",
              106: "*",
              107: "=",
              109: "-",
              110: ".",
              111: "/",
              145: "ScrollLock",
              173: "-",
              186: ";",
              187: "=",
              188: ",",
              189: "-",
              190: ".",
              191: "/",
              192: "`",
              219: "[",
              220: "\\",
              221: "]",
              222: "'",
              224: "Mod",
              63232: "Up",
              63233: "Down",
              63234: "Left",
              63235: "Right",
              63272: "Delete",
              63273: "Home",
              63275: "End",
              63276: "PageUp",
              63277: "PageDown",
              63302: "Insert",
            },
            Ia = 0;
          Ia < 10;
          Ia++
        )
          za[Ia + 48] = za[Ia + 96] = String(Ia)
        for (var Ba = 65; Ba <= 90; Ba++) za[Ba] = String.fromCharCode(Ba)
        for (var Ra = 1; Ra <= 12; Ra++) za[Ra + 111] = za[Ra + 63235] = "F" + Ra
        var Ka = {}
        function ja(e) {
          var t,
            n,
            r,
            i,
            o = e.split(/-(?!$)/)
          e = o[o.length - 1]
          for (var a = 0; a < o.length - 1; a++) {
            var l = o[a]
            if (/^(cmd|meta|m)$/i.test(l)) i = !0
            else if (/^a(lt)?$/i.test(l)) t = !0
            else if (/^(c|ctrl|control)$/i.test(l)) n = !0
            else {
              if (!/^s(hift)?$/i.test(l)) throw new Error("Unrecognized modifier name: " + l)
              r = !0
            }
          }
          return t && (e = "Alt-" + e), n && (e = "Ctrl-" + e), i && (e = "Cmd-" + e), r && (e = "Shift-" + e), e
        }
        function Ua(e) {
          var t = {}
          for (var n in e)
            if (e.hasOwnProperty(n)) {
              var r = e[n]
              if (/^(name|fallthrough|(de|at)tach)$/.test(n)) continue
              if ("..." == r) {
                delete e[n]
                continue
              }
              for (var i = J(n.split(" "), ja), o = 0; o < i.length; o++) {
                var a = void 0,
                  l = void 0
                o == i.length - 1 ? ((l = i.join(" ")), (a = r)) : ((l = i.slice(0, o + 1).join(" ")), (a = "..."))
                var s = t[l]
                if (s) {
                  if (s != a) throw new Error("Inconsistent bindings for " + l)
                } else t[l] = a
              }
              delete e[n]
            }
          for (var c in t) e[c] = t[c]
          return e
        }
        function Va(e, t, n, r) {
          var i = (t = $a(t)).call ? t.call(e, r) : t[e]
          if (!1 === i) return "nothing"
          if ("..." === i) return "multi"
          if (null != i && n(i)) return "handled"
          if (t.fallthrough) {
            if ("[object Array]" != Object.prototype.toString.call(t.fallthrough)) return Va(e, t.fallthrough, n, r)
            for (var o = 0; o < t.fallthrough.length; o++) {
              var a = Va(e, t.fallthrough[o], n, r)
              if (a) return a
            }
          }
        }
        function Ga(e) {
          var t = "string" == typeof e ? e : za[e.keyCode]
          return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t
        }
        function _a(e, t, n) {
          var r = e
          return (
            t.altKey && "Alt" != r && (e = "Alt-" + e),
            (C ? t.metaKey : t.ctrlKey) && "Ctrl" != r && (e = "Ctrl-" + e),
            (C ? t.ctrlKey : t.metaKey) && "Mod" != r && (e = "Cmd-" + e),
            !n && t.shiftKey && "Shift" != r && (e = "Shift-" + e),
            e
          )
        }
        function qa(e, t) {
          if (h && 34 == e.keyCode && e.char) return !1
          var n = za[e.keyCode]
          return null != n && !e.altGraphKey && (3 == e.keyCode && e.code && (n = e.code), _a(n, e, t))
        }
        function $a(e) {
          return "string" == typeof e ? Ka[e] : e
        }
        function Xa(e, t) {
          for (var n = e.doc.sel.ranges, r = [], i = 0; i < n.length; i++) {
            for (var o = t(n[i]); r.length && ct(o.from, Q(r).to) <= 0; ) {
              var a = r.pop()
              if (ct(a.from, o.from) < 0) {
                o.from = a.from
                break
              }
            }
            r.push(o)
          }
          Di(e, function () {
            for (var t = r.length - 1; t >= 0; t--) la(e.doc, "", r[t].from, r[t].to, "+delete")
            ui(e)
          })
        }
        function Ya(e, t, n) {
          var r = ce(e.text, t + n, n)
          return r < 0 || r > e.text.length ? null : r
        }
        function Za(e, t, n) {
          var r = Ya(e, t.ch, n)
          return null == r ? null : new st(t.line, r, n < 0 ? "after" : "before")
        }
        function Qa(e, t, n, r, i) {
          if (e) {
            "rtl" == t.doc.direction && (i = -i)
            var o = ge(n, t.doc.direction)
            if (o) {
              var a,
                l = i < 0 ? Q(o) : o[0],
                s = i < 0 == (1 == l.level) ? "after" : "before"
              if (l.level > 0 || "rtl" == t.doc.direction) {
                var c = or(t, n)
                a = i < 0 ? n.text.length - 1 : 0
                var u = ar(t, c, a).top
                ;(a = ue(
                  function (e) {
                    return ar(t, c, e).top == u
                  },
                  i < 0 == (1 == l.level) ? l.from : l.to - 1,
                  a
                )),
                  "before" == s && (a = Ya(n, a, 1))
              } else a = i < 0 ? l.to : l.from
              return new st(r, a, s)
            }
          }
          return new st(r, i < 0 ? n.text.length : 0, i < 0 ? "before" : "after")
        }
        function Ja(e, t, n, r) {
          var i = ge(t, e.doc.direction)
          if (!i) return Za(t, n, r)
          n.ch >= t.text.length
            ? ((n.ch = t.text.length), (n.sticky = "before"))
            : n.ch <= 0 && ((n.ch = 0), (n.sticky = "after"))
          var o = de(i, n.ch, n.sticky),
            a = i[o]
          if ("ltr" == e.doc.direction && a.level % 2 == 0 && (r > 0 ? a.to > n.ch : a.from < n.ch)) return Za(t, n, r)
          var l,
            s = function (e, n) {
              return Ya(t, e instanceof st ? e.ch : e, n)
            },
            c = function (n) {
              return e.options.lineWrapping ? ((l = l || or(e, t)), Mr(e, t, l, n)) : { begin: 0, end: t.text.length }
            },
            u = c("before" == n.sticky ? s(n, -1) : n.ch)
          if ("rtl" == e.doc.direction || 1 == a.level) {
            var f = (1 == a.level) == r < 0,
              h = s(n, f ? 1 : -1)
            if (null != h && (f ? h <= a.to && h <= u.end : h >= a.from && h >= u.begin)) {
              var d = f ? "before" : "after"
              return new st(n.line, h, d)
            }
          }
          var p = function (e, t, r) {
              for (
                var o = function (e, t) {
                  return t ? new st(n.line, s(e, 1), "before") : new st(n.line, e, "after")
                };
                e >= 0 && e < i.length;
                e += t
              ) {
                var a = i[e],
                  l = t > 0 == (1 != a.level),
                  c = l ? r.begin : s(r.end, -1)
                if (a.from <= c && c < a.to) return o(c, l)
                if (((c = l ? a.from : s(a.to, -1)), r.begin <= c && c < r.end)) return o(c, l)
              }
            },
            g = p(o + r, r, u)
          if (g) return g
          var m = r > 0 ? u.end : s(u.begin, -1)
          return null == m || (r > 0 && m == t.text.length) || !(g = p(r > 0 ? 0 : i.length - 1, r, c(m))) ? null : g
        }
        ;(Ka.basic = {
          Left: "goCharLeft",
          Right: "goCharRight",
          Up: "goLineUp",
          Down: "goLineDown",
          End: "goLineEnd",
          Home: "goLineStartSmart",
          PageUp: "goPageUp",
          PageDown: "goPageDown",
          Delete: "delCharAfter",
          Backspace: "delCharBefore",
          "Shift-Backspace": "delCharBefore",
          Tab: "defaultTab",
          "Shift-Tab": "indentAuto",
          Enter: "newlineAndIndent",
          Insert: "toggleOverwrite",
          Esc: "singleSelection",
        }),
          (Ka.pcDefault = {
            "Ctrl-A": "selectAll",
            "Ctrl-D": "deleteLine",
            "Ctrl-Z": "undo",
            "Shift-Ctrl-Z": "redo",
            "Ctrl-Y": "redo",
            "Ctrl-Home": "goDocStart",
            "Ctrl-End": "goDocEnd",
            "Ctrl-Up": "goLineUp",
            "Ctrl-Down": "goLineDown",
            "Ctrl-Left": "goGroupLeft",
            "Ctrl-Right": "goGroupRight",
            "Alt-Left": "goLineStart",
            "Alt-Right": "goLineEnd",
            "Ctrl-Backspace": "delGroupBefore",
            "Ctrl-Delete": "delGroupAfter",
            "Ctrl-S": "save",
            "Ctrl-F": "find",
            "Ctrl-G": "findNext",
            "Shift-Ctrl-G": "findPrev",
            "Shift-Ctrl-F": "replace",
            "Shift-Ctrl-R": "replaceAll",
            "Ctrl-[": "indentLess",
            "Ctrl-]": "indentMore",
            "Ctrl-U": "undoSelection",
            "Shift-Ctrl-U": "redoSelection",
            "Alt-U": "redoSelection",
            fallthrough: "basic",
          }),
          (Ka.emacsy = {
            "Ctrl-F": "goCharRight",
            "Ctrl-B": "goCharLeft",
            "Ctrl-P": "goLineUp",
            "Ctrl-N": "goLineDown",
            "Ctrl-A": "goLineStart",
            "Ctrl-E": "goLineEnd",
            "Ctrl-V": "goPageDown",
            "Shift-Ctrl-V": "goPageUp",
            "Ctrl-D": "delCharAfter",
            "Ctrl-H": "delCharBefore",
            "Alt-Backspace": "delWordBefore",
            "Ctrl-K": "killLine",
            "Ctrl-T": "transposeChars",
            "Ctrl-O": "openLine",
          }),
          (Ka.macDefault = {
            "Cmd-A": "selectAll",
            "Cmd-D": "deleteLine",
            "Cmd-Z": "undo",
            "Shift-Cmd-Z": "redo",
            "Cmd-Y": "redo",
            "Cmd-Home": "goDocStart",
            "Cmd-Up": "goDocStart",
            "Cmd-End": "goDocEnd",
            "Cmd-Down": "goDocEnd",
            "Alt-Left": "goGroupLeft",
            "Alt-Right": "goGroupRight",
            "Cmd-Left": "goLineLeft",
            "Cmd-Right": "goLineRight",
            "Alt-Backspace": "delGroupBefore",
            "Ctrl-Alt-Backspace": "delGroupAfter",
            "Alt-Delete": "delGroupAfter",
            "Cmd-S": "save",
            "Cmd-F": "find",
            "Cmd-G": "findNext",
            "Shift-Cmd-G": "findPrev",
            "Cmd-Alt-F": "replace",
            "Shift-Cmd-Alt-F": "replaceAll",
            "Cmd-[": "indentLess",
            "Cmd-]": "indentMore",
            "Cmd-Backspace": "delWrappedLineLeft",
            "Cmd-Delete": "delWrappedLineRight",
            "Cmd-U": "undoSelection",
            "Shift-Cmd-U": "redoSelection",
            "Ctrl-Up": "goDocStart",
            "Ctrl-Down": "goDocEnd",
            fallthrough: ["basic", "emacsy"],
          }),
          (Ka.default = b ? Ka.macDefault : Ka.pcDefault)
        var el = {
          selectAll: Jo,
          singleSelection: function (e) {
            return e.setSelection(e.getCursor("anchor"), e.getCursor("head"), _)
          },
          killLine: function (e) {
            return Xa(e, function (t) {
              if (t.empty()) {
                var n = et(e.doc, t.head.line).text.length
                return t.head.ch == n && t.head.line < e.lastLine()
                  ? { from: t.head, to: st(t.head.line + 1, 0) }
                  : { from: t.head, to: st(t.head.line, n) }
              }
              return { from: t.from(), to: t.to() }
            })
          },
          deleteLine: function (e) {
            return Xa(e, function (t) {
              return { from: st(t.from().line, 0), to: gt(e.doc, st(t.to().line + 1, 0)) }
            })
          },
          delLineLeft: function (e) {
            return Xa(e, function (e) {
              return { from: st(e.from().line, 0), to: e.from() }
            })
          },
          delWrappedLineLeft: function (e) {
            return Xa(e, function (t) {
              var n = e.charCoords(t.head, "div").top + 5
              return { from: e.coordsChar({ left: 0, top: n }, "div"), to: t.from() }
            })
          },
          delWrappedLineRight: function (e) {
            return Xa(e, function (t) {
              var n = e.charCoords(t.head, "div").top + 5,
                r = e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div")
              return { from: t.from(), to: r }
            })
          },
          undo: function (e) {
            return e.undo()
          },
          redo: function (e) {
            return e.redo()
          },
          undoSelection: function (e) {
            return e.undoSelection()
          },
          redoSelection: function (e) {
            return e.redoSelection()
          },
          goDocStart: function (e) {
            return e.extendSelection(st(e.firstLine(), 0))
          },
          goDocEnd: function (e) {
            return e.extendSelection(st(e.lastLine()))
          },
          goLineStart: function (e) {
            return e.extendSelectionsBy(
              function (t) {
                return tl(e, t.head.line)
              },
              { origin: "+move", bias: 1 }
            )
          },
          goLineStartSmart: function (e) {
            return e.extendSelectionsBy(
              function (t) {
                return rl(e, t.head)
              },
              { origin: "+move", bias: 1 }
            )
          },
          goLineEnd: function (e) {
            return e.extendSelectionsBy(
              function (t) {
                return nl(e, t.head.line)
              },
              { origin: "+move", bias: -1 }
            )
          },
          goLineRight: function (e) {
            return e.extendSelectionsBy(function (t) {
              var n = e.cursorCoords(t.head, "div").top + 5
              return e.coordsChar({ left: e.display.lineDiv.offsetWidth + 100, top: n }, "div")
            }, $)
          },
          goLineLeft: function (e) {
            return e.extendSelectionsBy(function (t) {
              var n = e.cursorCoords(t.head, "div").top + 5
              return e.coordsChar({ left: 0, top: n }, "div")
            }, $)
          },
          goLineLeftSmart: function (e) {
            return e.extendSelectionsBy(function (t) {
              var n = e.cursorCoords(t.head, "div").top + 5,
                r = e.coordsChar({ left: 0, top: n }, "div")
              return r.ch < e.getLine(r.line).search(/\S/) ? rl(e, t.head) : r
            }, $)
          },
          goLineUp: function (e) {
            return e.moveV(-1, "line")
          },
          goLineDown: function (e) {
            return e.moveV(1, "line")
          },
          goPageUp: function (e) {
            return e.moveV(-1, "page")
          },
          goPageDown: function (e) {
            return e.moveV(1, "page")
          },
          goCharLeft: function (e) {
            return e.moveH(-1, "char")
          },
          goCharRight: function (e) {
            return e.moveH(1, "char")
          },
          goColumnLeft: function (e) {
            return e.moveH(-1, "column")
          },
          goColumnRight: function (e) {
            return e.moveH(1, "column")
          },
          goWordLeft: function (e) {
            return e.moveH(-1, "word")
          },
          goGroupRight: function (e) {
            return e.moveH(1, "group")
          },
          goGroupLeft: function (e) {
            return e.moveH(-1, "group")
          },
          goWordRight: function (e) {
            return e.moveH(1, "word")
          },
          delCharBefore: function (e) {
            return e.deleteH(-1, "codepoint")
          },
          delCharAfter: function (e) {
            return e.deleteH(1, "char")
          },
          delWordBefore: function (e) {
            return e.deleteH(-1, "word")
          },
          delWordAfter: function (e) {
            return e.deleteH(1, "word")
          },
          delGroupBefore: function (e) {
            return e.deleteH(-1, "group")
          },
          delGroupAfter: function (e) {
            return e.deleteH(1, "group")
          },
          indentAuto: function (e) {
            return e.indentSelection("smart")
          },
          indentMore: function (e) {
            return e.indentSelection("add")
          },
          indentLess: function (e) {
            return e.indentSelection("subtract")
          },
          insertTab: function (e) {
            return e.replaceSelection("\t")
          },
          insertSoftTab: function (e) {
            for (var t = [], n = e.listSelections(), r = e.options.tabSize, i = 0; i < n.length; i++) {
              var o = n[i].from(),
                a = K(e.getLine(o.line), o.ch, r)
              t.push(Z(r - (a % r)))
            }
            e.replaceSelections(t)
          },
          defaultTab: function (e) {
            e.somethingSelected() ? e.indentSelection("add") : e.execCommand("insertTab")
          },
          transposeChars: function (e) {
            return Di(e, function () {
              for (var t = e.listSelections(), n = [], r = 0; r < t.length; r++)
                if (t[r].empty()) {
                  var i = t[r].head,
                    o = et(e.doc, i.line).text
                  if (o)
                    if ((i.ch == o.length && (i = new st(i.line, i.ch - 1)), i.ch > 0))
                      (i = new st(i.line, i.ch + 1)),
                        e.replaceRange(o.charAt(i.ch - 1) + o.charAt(i.ch - 2), st(i.line, i.ch - 2), i, "+transpose")
                    else if (i.line > e.doc.first) {
                      var a = et(e.doc, i.line - 1).text
                      a &&
                        ((i = new st(i.line, 1)),
                        e.replaceRange(
                          o.charAt(0) + e.doc.lineSeparator() + a.charAt(a.length - 1),
                          st(i.line - 1, a.length - 1),
                          i,
                          "+transpose"
                        ))
                    }
                  n.push(new so(i, i))
                }
              e.setSelections(n)
            })
          },
          newlineAndIndent: function (e) {
            return Di(e, function () {
              for (var t = e.listSelections(), n = t.length - 1; n >= 0; n--)
                e.replaceRange(e.doc.lineSeparator(), t[n].anchor, t[n].head, "+input")
              t = e.listSelections()
              for (var r = 0; r < t.length; r++) e.indentLine(t[r].from().line, null, !0)
              ui(e)
            })
          },
          openLine: function (e) {
            return e.replaceSelection("\n", "start")
          },
          toggleOverwrite: function (e) {
            return e.toggleOverwrite()
          },
        }
        function tl(e, t) {
          var n = et(e.doc, t),
            r = tn(n)
          return r != n && (t = it(r)), Qa(!0, e, r, t, 1)
        }
        function nl(e, t) {
          var n = et(e.doc, t),
            r = nn(n)
          return r != n && (t = it(r)), Qa(!0, e, n, t, -1)
        }
        function rl(e, t) {
          var n = tl(e, t.line),
            r = et(e.doc, n.line),
            i = ge(r, e.doc.direction)
          if (!i || 0 == i[0].level) {
            var o = Math.max(n.ch, r.text.search(/\S/)),
              a = t.line == n.line && t.ch <= o && t.ch
            return st(n.line, a ? 0 : o, n.sticky)
          }
          return n
        }
        function il(e, t, n) {
          if ("string" == typeof t && !(t = el[t])) return !1
          e.display.input.ensurePolled()
          var r = e.display.shift,
            i = !1
          try {
            e.isReadOnly() && (e.state.suppressEdits = !0), n && (e.display.shift = !1), (i = t(e) != G)
          } finally {
            ;(e.display.shift = r), (e.state.suppressEdits = !1)
          }
          return i
        }
        function ol(e, t, n) {
          for (var r = 0; r < e.state.keyMaps.length; r++) {
            var i = Va(t, e.state.keyMaps[r], n, e)
            if (i) return i
          }
          return (e.options.extraKeys && Va(t, e.options.extraKeys, n, e)) || Va(t, e.options.keyMap, n, e)
        }
        var al = new j()
        function ll(e, t, n, r) {
          var i = e.state.keySeq
          if (i) {
            if (Ga(t)) return "handled"
            if (
              (/\'$/.test(t)
                ? (e.state.keySeq = null)
                : al.set(50, function () {
                    e.state.keySeq == i && ((e.state.keySeq = null), e.display.input.reset())
                  }),
              sl(e, i + " " + t, n, r))
            )
              return !0
          }
          return sl(e, t, n, r)
        }
        function sl(e, t, n, r) {
          var i = ol(e, t, r)
          return (
            "multi" == i && (e.state.keySeq = t),
            "handled" == i && Hn(e, "keyHandled", e, t, n),
            ("handled" != i && "multi" != i) || (Le(n), Zr(e)),
            !!i
          )
        }
        function cl(e, t) {
          var n = qa(t, !0)
          return (
            !!n &&
            (t.shiftKey && !e.state.keySeq
              ? ll(e, "Shift-" + n, t, function (t) {
                  return il(e, t, !0)
                }) ||
                ll(e, n, t, function (t) {
                  if ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion) return il(e, t)
                })
              : ll(e, n, t, function (t) {
                  return il(e, t)
                }))
          )
        }
        function ul(e, t, n) {
          return ll(e, "'" + n + "'", t, function (t) {
            return il(e, t, !0)
          })
        }
        var fl = null
        function hl(e) {
          var t = this
          if (!((e.target && e.target != t.display.input.getField()) || ((t.curOp.focus = F(z(t))), xe(t, e)))) {
            a && l < 11 && 27 == e.keyCode && (e.returnValue = !1)
            var r = e.keyCode
            t.display.shift = 16 == r || e.shiftKey
            var i = cl(t, e)
            h &&
              ((fl = i ? r : null),
              i || 88 != r || Be || !(b ? e.metaKey : e.ctrlKey) || t.replaceSelection("", null, "cut")),
              n &&
                !b &&
                !i &&
                46 == r &&
                e.shiftKey &&
                !e.ctrlKey &&
                document.execCommand &&
                document.execCommand("cut"),
              18 != r || /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) || dl(t)
          }
        }
        function dl(e) {
          var t = e.display.lineDiv
          function n(e) {
            ;(18 != e.keyCode && e.altKey) ||
              (M(t, "CodeMirror-crosshair"), be(document, "keyup", n), be(document, "mouseover", n))
          }
          D(t, "CodeMirror-crosshair"), ve(document, "keyup", n), ve(document, "mouseover", n)
        }
        function pl(e) {
          16 == e.keyCode && (this.doc.sel.shift = !1), xe(this, e)
        }
        function gl(e) {
          var t = this
          if (
            !(
              (e.target && e.target != t.display.input.getField()) ||
              qn(t.display, e) ||
              xe(t, e) ||
              (e.ctrlKey && !e.altKey) ||
              (b && e.metaKey)
            )
          ) {
            var n = e.keyCode,
              r = e.charCode
            if (h && n == fl) return (fl = null), void Le(e)
            if (!h || (e.which && !(e.which < 10)) || !cl(t, e)) {
              var i = String.fromCharCode(null == r ? n : r)
              "\b" != i && (ul(t, e, i) || t.display.input.onKeyPress(e))
            }
          }
        }
        var ml,
          vl,
          yl = 400,
          bl = function (e, t, n) {
            ;(this.time = e), (this.pos = t), (this.button = n)
          }
        function wl(e, t) {
          var n = +new Date()
          return vl && vl.compare(n, e, t)
            ? ((ml = vl = null), "triple")
            : ml && ml.compare(n, e, t)
              ? ((vl = new bl(n, e, t)), (ml = null), "double")
              : ((ml = new bl(n, e, t)), (vl = null), "single")
        }
        function xl(e) {
          var t = this,
            n = t.display
          if (!(xe(t, e) || (n.activeTouch && n.input.supportsTouch())))
            if ((n.input.ensurePolled(), (n.shift = e.shiftKey), qn(n, e)))
              s ||
                ((n.scroller.draggable = !1),
                setTimeout(function () {
                  return (n.scroller.draggable = !0)
                }, 100))
            else if (!Nl(t, e)) {
              var r = Ir(t, e),
                i = Ne(e),
                o = r ? wl(r, i) : "single"
              I(t).focus(),
                1 == i && t.state.selectingText && t.state.selectingText(e),
                (r && kl(t, i, r, o, e)) ||
                  (1 == i
                    ? r
                      ? Sl(t, r, o, e)
                      : Oe(e) == n.scroller && Le(e)
                    : 2 == i
                      ? (r && Bo(t.doc, r),
                        setTimeout(function () {
                          return n.input.focus()
                        }, 20))
                      : 3 == i && (S ? t.display.input.onContextMenu(e) : Jr(t)))
            }
        }
        function kl(e, t, n, r, i) {
          var o = "Click"
          return (
            "double" == r ? (o = "Double" + o) : "triple" == r && (o = "Triple" + o),
            ll(e, _a((o = (1 == t ? "Left" : 2 == t ? "Middle" : "Right") + o), i), i, function (t) {
              if (("string" == typeof t && (t = el[t]), !t)) return !1
              var r = !1
              try {
                e.isReadOnly() && (e.state.suppressEdits = !0), (r = t(e, n) != G)
              } finally {
                e.state.suppressEdits = !1
              }
              return r
            })
          )
        }
        function Cl(e, t, n) {
          var r = e.getOption("configureMouse"),
            i = r ? r(e, t, n) : {}
          if (null == i.unit) {
            var o = w ? n.shiftKey && n.metaKey : n.altKey
            i.unit = o ? "rectangle" : "single" == t ? "char" : "double" == t ? "word" : "line"
          }
          return (
            (null == i.extend || e.doc.extend) && (i.extend = e.doc.extend || n.shiftKey),
            null == i.addNew && (i.addNew = b ? n.metaKey : n.ctrlKey),
            null == i.moveOnDrag && (i.moveOnDrag = !(b ? n.altKey : n.ctrlKey)),
            i
          )
        }
        function Sl(e, t, n, r) {
          a ? setTimeout(B(Qr, e), 0) : (e.curOp.focus = F(z(e)))
          var i,
            o = Cl(e, n, r),
            l = e.doc.sel
          e.options.dragDrop &&
          Fe &&
          !e.isReadOnly() &&
          "single" == n &&
          (i = l.contains(t)) > -1 &&
          (ct((i = l.ranges[i]).from(), t) < 0 || t.xRel > 0) &&
          (ct(i.to(), t) > 0 || t.xRel < 0)
            ? Ll(e, r, t, o)
            : Ml(e, r, t, o)
        }
        function Ll(e, t, n, r) {
          var i = e.display,
            o = !1,
            c = Wi(e, function (t) {
              s && (i.scroller.draggable = !1),
                (e.state.draggingText = !1),
                e.state.delayingBlurEvent && (e.hasFocus() ? (e.state.delayingBlurEvent = !1) : Jr(e)),
                be(i.wrapper.ownerDocument, "mouseup", c),
                be(i.wrapper.ownerDocument, "mousemove", u),
                be(i.scroller, "dragstart", f),
                be(i.scroller, "drop", c),
                o ||
                  (Le(t),
                  r.addNew || Bo(e.doc, n, null, null, r.extend),
                  (s && !d) || (a && 9 == l)
                    ? setTimeout(function () {
                        i.wrapper.ownerDocument.body.focus({ preventScroll: !0 }), i.input.focus()
                      }, 20)
                    : i.input.focus())
            }),
            u = function (e) {
              o = o || Math.abs(t.clientX - e.clientX) + Math.abs(t.clientY - e.clientY) >= 10
            },
            f = function () {
              return (o = !0)
            }
          s && (i.scroller.draggable = !0),
            (e.state.draggingText = c),
            (c.copy = !r.moveOnDrag),
            ve(i.wrapper.ownerDocument, "mouseup", c),
            ve(i.wrapper.ownerDocument, "mousemove", u),
            ve(i.scroller, "dragstart", f),
            ve(i.scroller, "drop", c),
            (e.state.delayingBlurEvent = !0),
            setTimeout(function () {
              return i.input.focus()
            }, 20),
            i.scroller.dragDrop && i.scroller.dragDrop()
        }
        function Tl(e, t, n) {
          if ("char" == n) return new so(t, t)
          if ("word" == n) return e.findWordAt(t)
          if ("line" == n) return new so(st(t.line, 0), gt(e.doc, st(t.line + 1, 0)))
          var r = n(e, t)
          return new so(r.from, r.to)
        }
        function Ml(e, t, n, r) {
          a && Jr(e)
          var i = e.display,
            o = e.doc
          Le(t)
          var l,
            s,
            c = o.sel,
            u = c.ranges
          if (
            (r.addNew && !r.extend
              ? ((s = o.sel.contains(n)), (l = s > -1 ? u[s] : new so(n, n)))
              : ((l = o.sel.primary()), (s = o.sel.primIndex)),
            "rectangle" == r.unit)
          )
            r.addNew || (l = new so(n, n)), (n = Ir(e, t, !0, !0)), (s = -1)
          else {
            var f = Tl(e, n, r.unit)
            l = r.extend ? Io(l, f.anchor, f.head, r.extend) : f
          }
          r.addNew
            ? -1 == s
              ? ((s = u.length), Go(o, co(e, u.concat([l]), s), { scroll: !1, origin: "*mouse" }))
              : u.length > 1 && u[s].empty() && "char" == r.unit && !r.extend
                ? (Go(o, co(e, u.slice(0, s).concat(u.slice(s + 1)), 0), { scroll: !1, origin: "*mouse" }), (c = o.sel))
                : Ko(o, s, l, q)
            : ((s = 0), Go(o, new lo([l], 0), q), (c = o.sel))
          var h = n
          function d(t) {
            if (0 != ct(h, t))
              if (((h = t), "rectangle" == r.unit)) {
                for (
                  var i = [],
                    a = e.options.tabSize,
                    u = K(et(o, n.line).text, n.ch, a),
                    f = K(et(o, t.line).text, t.ch, a),
                    d = Math.min(u, f),
                    p = Math.max(u, f),
                    g = Math.min(n.line, t.line),
                    m = Math.min(e.lastLine(), Math.max(n.line, t.line));
                  g <= m;
                  g++
                ) {
                  var v = et(o, g).text,
                    y = X(v, d, a)
                  d == p
                    ? i.push(new so(st(g, y), st(g, y)))
                    : v.length > y && i.push(new so(st(g, y), st(g, X(v, p, a))))
                }
                i.length || i.push(new so(n, n)),
                  Go(o, co(e, c.ranges.slice(0, s).concat(i), s), { origin: "*mouse", scroll: !1 }),
                  e.scrollIntoView(t)
              } else {
                var b,
                  w = l,
                  x = Tl(e, t, r.unit),
                  k = w.anchor
                ct(x.anchor, k) > 0
                  ? ((b = x.head), (k = dt(w.from(), x.anchor)))
                  : ((b = x.anchor), (k = ht(w.to(), x.head)))
                var C = c.ranges.slice(0)
                ;(C[s] = Al(e, new so(gt(o, k), b))), Go(o, co(e, C, s), q)
              }
          }
          var p = i.wrapper.getBoundingClientRect(),
            g = 0
          function m(t) {
            var n = ++g,
              a = Ir(e, t, !0, "rectangle" == r.unit)
            if (a)
              if (0 != ct(a, h)) {
                ;(e.curOp.focus = F(z(e))), d(a)
                var l = ii(i, o)
                ;(a.line >= l.to || a.line < l.from) &&
                  setTimeout(
                    Wi(e, function () {
                      g == n && m(t)
                    }),
                    150
                  )
              } else {
                var s = t.clientY < p.top ? -20 : t.clientY > p.bottom ? 20 : 0
                s &&
                  setTimeout(
                    Wi(e, function () {
                      g == n && ((i.scroller.scrollTop += s), m(t))
                    }),
                    50
                  )
              }
          }
          function v(t) {
            ;(e.state.selectingText = !1),
              (g = 1 / 0),
              t && (Le(t), i.input.focus()),
              be(i.wrapper.ownerDocument, "mousemove", y),
              be(i.wrapper.ownerDocument, "mouseup", b),
              (o.history.lastSelOrigin = null)
          }
          var y = Wi(e, function (e) {
              0 !== e.buttons && Ne(e) ? m(e) : v(e)
            }),
            b = Wi(e, v)
          ;(e.state.selectingText = b),
            ve(i.wrapper.ownerDocument, "mousemove", y),
            ve(i.wrapper.ownerDocument, "mouseup", b)
        }
        function Al(e, t) {
          var n = t.anchor,
            r = t.head,
            i = et(e.doc, n.line)
          if (0 == ct(n, r) && n.sticky == r.sticky) return t
          var o = ge(i)
          if (!o) return t
          var a = de(o, n.ch, n.sticky),
            l = o[a]
          if (l.from != n.ch && l.to != n.ch) return t
          var s,
            c = a + ((l.from == n.ch) == (1 != l.level) ? 0 : 1)
          if (0 == c || c == o.length) return t
          if (r.line != n.line) s = (r.line - n.line) * ("ltr" == e.doc.direction ? 1 : -1) > 0
          else {
            var u = de(o, r.ch, r.sticky),
              f = u - a || (r.ch - n.ch) * (1 == l.level ? -1 : 1)
            s = u == c - 1 || u == c ? f < 0 : f > 0
          }
          var h = o[c + (s ? -1 : 0)],
            d = s == (1 == h.level),
            p = d ? h.from : h.to,
            g = d ? "after" : "before"
          return n.ch == p && n.sticky == g ? t : new so(new st(n.line, p, g), r)
        }
        function Ol(e, t, n, r) {
          var i, o
          if (t.touches) (i = t.touches[0].clientX), (o = t.touches[0].clientY)
          else
            try {
              ;(i = t.clientX), (o = t.clientY)
            } catch (e) {
              return !1
            }
          if (i >= Math.floor(e.display.gutters.getBoundingClientRect().right)) return !1
          r && Le(t)
          var a = e.display,
            l = a.lineDiv.getBoundingClientRect()
          if (o > l.bottom || !Ce(e, n)) return Me(t)
          o -= l.top - a.viewOffset
          for (var s = 0; s < e.display.gutterSpecs.length; ++s) {
            var c = a.gutters.childNodes[s]
            if (c && c.getBoundingClientRect().right >= i)
              return we(e, n, e, ot(e.doc, o), e.display.gutterSpecs[s].className, t), Me(t)
          }
        }
        function Nl(e, t) {
          return Ol(e, t, "gutterClick", !0)
        }
        function Pl(e, t) {
          qn(e.display, t) || Hl(e, t) || xe(e, t, "contextmenu") || S || e.display.input.onContextMenu(t)
        }
        function Hl(e, t) {
          return !!Ce(e, "gutterContextMenu") && Ol(e, t, "gutterContextMenu", !1)
        }
        function Fl(e) {
          ;(e.display.wrapper.className =
            e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + e.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
            gr(e)
        }
        bl.prototype.compare = function (e, t, n) {
          return this.time + yl > e && 0 == ct(t, this.pos) && n == this.button
        }
        var Dl = {
            toString: function () {
              return "CodeMirror.Init"
            },
          },
          Wl = {},
          El = {}
        function zl(e) {
          var t = e.optionHandlers
          function n(n, r, i, o) {
            ;(e.defaults[n] = r),
              i &&
                (t[n] = o
                  ? function (e, t, n) {
                      n != Dl && i(e, t, n)
                    }
                  : i)
          }
          ;(e.defineOption = n),
            (e.Init = Dl),
            n(
              "value",
              "",
              function (e, t) {
                return e.setValue(t)
              },
              !0
            ),
            n(
              "mode",
              null,
              function (e, t) {
                ;(e.doc.modeOption = t), vo(e)
              },
              !0
            ),
            n("indentUnit", 2, vo, !0),
            n("indentWithTabs", !1),
            n("smartIndent", !0),
            n(
              "tabSize",
              4,
              function (e) {
                yo(e), gr(e), Rr(e)
              },
              !0
            ),
            n("lineSeparator", null, function (e, t) {
              if (((e.doc.lineSep = t), t)) {
                var n = [],
                  r = e.doc.first
                e.doc.iter(function (e) {
                  for (var i = 0; ; ) {
                    var o = e.text.indexOf(t, i)
                    if (-1 == o) break
                    ;(i = o + t.length), n.push(st(r, o))
                  }
                  r++
                })
                for (var i = n.length - 1; i >= 0; i--) la(e.doc, t, n[i], st(n[i].line, n[i].ch + t.length))
              }
            }),
            n(
              "specialChars",
              /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g,
              function (e, t, n) {
                ;(e.state.specialChars = new RegExp(t.source + (t.test("\t") ? "" : "|\t"), "g")),
                  n != Dl && e.refresh()
              }
            ),
            n(
              "specialCharPlaceholder",
              bn,
              function (e) {
                return e.refresh()
              },
              !0
            ),
            n("electricChars", !0),
            n(
              "inputStyle",
              y ? "contenteditable" : "textarea",
              function () {
                throw new Error("inputStyle can not (yet) be changed in a running editor")
              },
              !0
            ),
            n(
              "spellcheck",
              !1,
              function (e, t) {
                return (e.getInputField().spellcheck = t)
              },
              !0
            ),
            n(
              "autocorrect",
              !1,
              function (e, t) {
                return (e.getInputField().autocorrect = t)
              },
              !0
            ),
            n(
              "autocapitalize",
              !1,
              function (e, t) {
                return (e.getInputField().autocapitalize = t)
              },
              !0
            ),
            n("rtlMoveVisually", !x),
            n("wholeLineUpdateBefore", !0),
            n(
              "theme",
              "default",
              function (e) {
                Fl(e), eo(e)
              },
              !0
            ),
            n("keyMap", "default", function (e, t, n) {
              var r = $a(t),
                i = n != Dl && $a(n)
              i && i.detach && i.detach(e, r), r.attach && r.attach(e, i || null)
            }),
            n("extraKeys", null),
            n("configureMouse", null),
            n("lineWrapping", !1, Bl, !0),
            n(
              "gutters",
              [],
              function (e, t) {
                ;(e.display.gutterSpecs = Qi(t, e.options.lineNumbers)), eo(e)
              },
              !0
            ),
            n(
              "fixedGutter",
              !0,
              function (e, t) {
                ;(e.display.gutters.style.left = t ? Wr(e.display) + "px" : "0"), e.refresh()
              },
              !0
            ),
            n(
              "coverGutterNextToScrollbar",
              !1,
              function (e) {
                return xi(e)
              },
              !0
            ),
            n(
              "scrollbarStyle",
              "native",
              function (e) {
                Si(e),
                  xi(e),
                  e.display.scrollbars.setScrollTop(e.doc.scrollTop),
                  e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)
              },
              !0
            ),
            n(
              "lineNumbers",
              !1,
              function (e, t) {
                ;(e.display.gutterSpecs = Qi(e.options.gutters, t)), eo(e)
              },
              !0
            ),
            n("firstLineNumber", 1, eo, !0),
            n(
              "lineNumberFormatter",
              function (e) {
                return e
              },
              eo,
              !0
            ),
            n("showCursorWhenSelecting", !1, _r, !0),
            n("resetSelectionOnContextMenu", !0),
            n("lineWiseCopyCut", !0),
            n("pasteLinesPerSelection", !0),
            n("selectionsMayTouch", !1),
            n("readOnly", !1, function (e, t) {
              "nocursor" == t && (ti(e), e.display.input.blur()), e.display.input.readOnlyChanged(t)
            }),
            n("screenReaderLabel", null, function (e, t) {
              ;(t = "" === t ? null : t), e.display.input.screenReaderLabelChanged(t)
            }),
            n(
              "disableInput",
              !1,
              function (e, t) {
                t || e.display.input.reset()
              },
              !0
            ),
            n("dragDrop", !0, Il),
            n("allowDropFileTypes", null),
            n("cursorBlinkRate", 530),
            n("cursorScrollMargin", 0),
            n("cursorHeight", 1, _r, !0),
            n("singleCursorHeightPerLine", !0, _r, !0),
            n("workTime", 100),
            n("workDelay", 100),
            n("flattenSpans", !0, yo, !0),
            n("addModeClass", !1, yo, !0),
            n("pollInterval", 100),
            n("undoDepth", 200, function (e, t) {
              return (e.doc.history.undoDepth = t)
            }),
            n("historyEventDelay", 1250),
            n(
              "viewportMargin",
              10,
              function (e) {
                return e.refresh()
              },
              !0
            ),
            n("maxHighlightLength", 1e4, yo, !0),
            n("moveInputWithCursor", !0, function (e, t) {
              t || e.display.input.resetPosition()
            }),
            n("tabindex", null, function (e, t) {
              return (e.display.input.getField().tabIndex = t || "")
            }),
            n("autofocus", null),
            n(
              "direction",
              "ltr",
              function (e, t) {
                return e.doc.setDirection(t)
              },
              !0
            ),
            n("phrases", null)
        }
        function Il(e, t, n) {
          if (!t != !(n && n != Dl)) {
            var r = e.display.dragFunctions,
              i = t ? ve : be
            i(e.display.scroller, "dragstart", r.start),
              i(e.display.scroller, "dragenter", r.enter),
              i(e.display.scroller, "dragover", r.over),
              i(e.display.scroller, "dragleave", r.leave),
              i(e.display.scroller, "drop", r.drop)
          }
        }
        function Bl(e) {
          e.options.lineWrapping
            ? (D(e.display.wrapper, "CodeMirror-wrap"),
              (e.display.sizer.style.minWidth = ""),
              (e.display.sizerWidth = null))
            : (M(e.display.wrapper, "CodeMirror-wrap"), fn(e)),
            zr(e),
            Rr(e),
            gr(e),
            setTimeout(function () {
              return xi(e)
            }, 100)
        }
        function Rl(e, t) {
          var n = this
          if (!(this instanceof Rl)) return new Rl(e, t)
          ;(this.options = t = t ? R(t) : {}), R(Wl, t, !1)
          var r = t.value
          "string" == typeof r
            ? (r = new Ta(r, t.mode, null, t.lineSeparator, t.direction))
            : t.mode && (r.modeOption = t.mode),
            (this.doc = r)
          var i = new Rl.inputStyles[t.inputStyle](this),
            o = (this.display = new to(e, r, i, t))
          for (var c in ((o.wrapper.CodeMirror = this),
          Fl(this),
          t.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
          Si(this),
          (this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: !1,
            delayingBlurEvent: !1,
            focused: !1,
            suppressEdits: !1,
            pasteIncoming: -1,
            cutIncoming: -1,
            selectingText: !1,
            draggingText: !1,
            highlight: new j(),
            keySeq: null,
            specialChars: null,
          }),
          t.autofocus && !y && o.input.focus(),
          a &&
            l < 11 &&
            setTimeout(function () {
              return n.display.input.reset(!0)
            }, 20),
          Kl(this),
          Da(),
          Ti(this),
          (this.curOp.forceUpdate = !0),
          ko(this, r),
          (t.autofocus && !y) || this.hasFocus()
            ? setTimeout(function () {
                n.hasFocus() && !n.state.focused && ei(n)
              }, 20)
            : ti(this),
          El))
            El.hasOwnProperty(c) && El[c](this, t[c], Dl)
          Zi(this), t.finishInit && t.finishInit(this)
          for (var u = 0; u < jl.length; ++u) jl[u](this)
          Mi(this),
            s &&
              t.lineWrapping &&
              "optimizelegibility" == getComputedStyle(o.lineDiv).textRendering &&
              (o.lineDiv.style.textRendering = "auto")
        }
        function Kl(e) {
          var t = e.display
          ve(t.scroller, "mousedown", Wi(e, xl)),
            ve(
              t.scroller,
              "dblclick",
              a && l < 11
                ? Wi(e, function (t) {
                    if (!xe(e, t)) {
                      var n = Ir(e, t)
                      if (n && !Nl(e, t) && !qn(e.display, t)) {
                        Le(t)
                        var r = e.findWordAt(n)
                        Bo(e.doc, r.anchor, r.head)
                      }
                    }
                  })
                : function (t) {
                    return xe(e, t) || Le(t)
                  }
            ),
            ve(t.scroller, "contextmenu", function (t) {
              return Pl(e, t)
            }),
            ve(t.input.getField(), "contextmenu", function (n) {
              t.scroller.contains(n.target) || Pl(e, n)
            })
          var n,
            r = { end: 0 }
          function i() {
            t.activeTouch &&
              ((n = setTimeout(function () {
                return (t.activeTouch = null)
              }, 1e3)),
              ((r = t.activeTouch).end = +new Date()))
          }
          function o(e) {
            if (1 != e.touches.length) return !1
            var t = e.touches[0]
            return t.radiusX <= 1 && t.radiusY <= 1
          }
          function s(e, t) {
            if (null == t.left) return !0
            var n = t.left - e.left,
              r = t.top - e.top
            return n * n + r * r > 400
          }
          ve(t.scroller, "touchstart", function (i) {
            if (!xe(e, i) && !o(i) && !Nl(e, i)) {
              t.input.ensurePolled(), clearTimeout(n)
              var a = +new Date()
              ;(t.activeTouch = { start: a, moved: !1, prev: a - r.end <= 300 ? r : null }),
                1 == i.touches.length &&
                  ((t.activeTouch.left = i.touches[0].pageX), (t.activeTouch.top = i.touches[0].pageY))
            }
          }),
            ve(t.scroller, "touchmove", function () {
              t.activeTouch && (t.activeTouch.moved = !0)
            }),
            ve(t.scroller, "touchend", function (n) {
              var r = t.activeTouch
              if (r && !qn(t, n) && null != r.left && !r.moved && new Date() - r.start < 300) {
                var o,
                  a = e.coordsChar(t.activeTouch, "page")
                ;(o =
                  !r.prev || s(r, r.prev)
                    ? new so(a, a)
                    : !r.prev.prev || s(r, r.prev.prev)
                      ? e.findWordAt(a)
                      : new so(st(a.line, 0), gt(e.doc, st(a.line + 1, 0)))),
                  e.setSelection(o.anchor, o.head),
                  e.focus(),
                  Le(n)
              }
              i()
            }),
            ve(t.scroller, "touchcancel", i),
            ve(t.scroller, "scroll", function () {
              t.scroller.clientHeight &&
                (gi(e, t.scroller.scrollTop), vi(e, t.scroller.scrollLeft, !0), we(e, "scroll", e))
            }),
            ve(t.scroller, "mousewheel", function (t) {
              return ao(e, t)
            }),
            ve(t.scroller, "DOMMouseScroll", function (t) {
              return ao(e, t)
            }),
            ve(t.wrapper, "scroll", function () {
              return (t.wrapper.scrollTop = t.wrapper.scrollLeft = 0)
            }),
            (t.dragFunctions = {
              enter: function (t) {
                xe(e, t) || Ae(t)
              },
              over: function (t) {
                xe(e, t) || (Na(e, t), Ae(t))
              },
              start: function (t) {
                return Oa(e, t)
              },
              drop: Wi(e, Aa),
              leave: function (t) {
                xe(e, t) || Pa(e)
              },
            })
          var c = t.input.getField()
          ve(c, "keyup", function (t) {
            return pl.call(e, t)
          }),
            ve(c, "keydown", Wi(e, hl)),
            ve(c, "keypress", Wi(e, gl)),
            ve(c, "focus", function (t) {
              return ei(e, t)
            }),
            ve(c, "blur", function (t) {
              return ti(e, t)
            })
        }
        ;(Rl.defaults = Wl), (Rl.optionHandlers = El)
        var jl = []
        function Ul(e, t, n, r) {
          var i,
            o = e.doc
          null == n && (n = "add"), "smart" == n && (o.mode.indent ? (i = kt(e, t).state) : (n = "prev"))
          var a = e.options.tabSize,
            l = et(o, t),
            s = K(l.text, null, a)
          l.stateAfter && (l.stateAfter = null)
          var c,
            u = l.text.match(/^\s*/)[0]
          if (r || /\S/.test(l.text)) {
            if ("smart" == n && ((c = o.mode.indent(i, l.text.slice(u.length), l.text)) == G || c > 150)) {
              if (!r) return
              n = "prev"
            }
          } else (c = 0), (n = "not")
          "prev" == n
            ? (c = t > o.first ? K(et(o, t - 1).text, null, a) : 0)
            : "add" == n
              ? (c = s + e.options.indentUnit)
              : "subtract" == n
                ? (c = s - e.options.indentUnit)
                : "number" == typeof n && (c = s + n),
            (c = Math.max(0, c))
          var f = "",
            h = 0
          if (e.options.indentWithTabs) for (var d = Math.floor(c / a); d; --d) (h += a), (f += "\t")
          if ((h < c && (f += Z(c - h)), f != u))
            return la(o, f, st(t, 0), st(t, u.length), "+input"), (l.stateAfter = null), !0
          for (var p = 0; p < o.sel.ranges.length; p++) {
            var g = o.sel.ranges[p]
            if (g.head.line == t && g.head.ch < u.length) {
              var m = st(t, u.length)
              Ko(o, p, new so(m, m))
              break
            }
          }
        }
        Rl.defineInitHook = function (e) {
          return jl.push(e)
        }
        var Vl = null
        function Gl(e) {
          Vl = e
        }
        function _l(e, t, n, r, i) {
          var o = e.doc
          ;(e.display.shift = !1), r || (r = o.sel)
          var a = +new Date() - 200,
            l = "paste" == i || e.state.pasteIncoming > a,
            s = ze(t),
            c = null
          if (l && r.ranges.length > 1)
            if (Vl && Vl.text.join("\n") == t) {
              if (r.ranges.length % Vl.text.length == 0) {
                c = []
                for (var u = 0; u < Vl.text.length; u++) c.push(o.splitLines(Vl.text[u]))
              }
            } else
              s.length == r.ranges.length &&
                e.options.pasteLinesPerSelection &&
                (c = J(s, function (e) {
                  return [e]
                }))
          for (var f = e.curOp.updateInput, h = r.ranges.length - 1; h >= 0; h--) {
            var d = r.ranges[h],
              p = d.from(),
              g = d.to()
            d.empty() &&
              (n && n > 0
                ? (p = st(p.line, p.ch - n))
                : e.state.overwrite && !l
                  ? (g = st(g.line, Math.min(et(o, g.line).text.length, g.ch + Q(s).length)))
                  : l && Vl && Vl.lineWise && Vl.text.join("\n") == s.join("\n") && (p = g = st(p.line, 0)))
            var m = {
              from: p,
              to: g,
              text: c ? c[h % c.length] : s,
              origin: i || (l ? "paste" : e.state.cutIncoming > a ? "cut" : "+input"),
            }
            ta(e.doc, m), Hn(e, "inputRead", e, m)
          }
          t && !l && $l(e, t),
            ui(e),
            e.curOp.updateInput < 2 && (e.curOp.updateInput = f),
            (e.curOp.typing = !0),
            (e.state.pasteIncoming = e.state.cutIncoming = -1)
        }
        function ql(e, t) {
          var n = e.clipboardData && e.clipboardData.getData("Text")
          if (n)
            return (
              e.preventDefault(),
              t.isReadOnly() ||
                t.options.disableInput ||
                !t.hasFocus() ||
                Di(t, function () {
                  return _l(t, n, 0, null, "paste")
                }),
              !0
            )
        }
        function $l(e, t) {
          if (e.options.electricChars && e.options.smartIndent)
            for (var n = e.doc.sel, r = n.ranges.length - 1; r >= 0; r--) {
              var i = n.ranges[r]
              if (!(i.head.ch > 100 || (r && n.ranges[r - 1].head.line == i.head.line))) {
                var o = e.getModeAt(i.head),
                  a = !1
                if (o.electricChars) {
                  for (var l = 0; l < o.electricChars.length; l++)
                    if (t.indexOf(o.electricChars.charAt(l)) > -1) {
                      a = Ul(e, i.head.line, "smart")
                      break
                    }
                } else
                  o.electricInput &&
                    o.electricInput.test(et(e.doc, i.head.line).text.slice(0, i.head.ch)) &&
                    (a = Ul(e, i.head.line, "smart"))
                a && Hn(e, "electricInput", e, i.head.line)
              }
            }
        }
        function Xl(e) {
          for (var t = [], n = [], r = 0; r < e.doc.sel.ranges.length; r++) {
            var i = e.doc.sel.ranges[r].head.line,
              o = { anchor: st(i, 0), head: st(i + 1, 0) }
            n.push(o), t.push(e.getRange(o.anchor, o.head))
          }
          return { text: t, ranges: n }
        }
        function Yl(e, t, n, r) {
          e.setAttribute("autocorrect", n ? "" : "off"),
            e.setAttribute("autocapitalize", r ? "" : "off"),
            e.setAttribute("spellcheck", !!t)
        }
        function Zl() {
          var e = N(
              "textarea",
              null,
              null,
              "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"
            ),
            t = N("div", [e], null, "overflow: hidden; position: relative; width: 3px; height: 0px;")
          return (
            s ? (e.style.width = "1000px") : e.setAttribute("wrap", "off"),
            m && (e.style.border = "1px solid black"),
            Yl(e),
            t
          )
        }
        function Ql(e) {
          var t = e.optionHandlers,
            n = (e.helpers = {})
          ;(e.prototype = {
            constructor: e,
            focus: function () {
              I(this).focus(), this.display.input.focus()
            },
            setOption: function (e, n) {
              var r = this.options,
                i = r[e]
              ;(r[e] == n && "mode" != e) ||
                ((r[e] = n), t.hasOwnProperty(e) && Wi(this, t[e])(this, n, i), we(this, "optionChange", this, e))
            },
            getOption: function (e) {
              return this.options[e]
            },
            getDoc: function () {
              return this.doc
            },
            addKeyMap: function (e, t) {
              this.state.keyMaps[t ? "push" : "unshift"]($a(e))
            },
            removeKeyMap: function (e) {
              for (var t = this.state.keyMaps, n = 0; n < t.length; ++n)
                if (t[n] == e || t[n].name == e) return t.splice(n, 1), !0
            },
            addOverlay: Ei(function (t, n) {
              var r = t.token ? t : e.getMode(this.options, t)
              if (r.startState) throw new Error("Overlays may not be stateful.")
              ee(
                this.state.overlays,
                { mode: r, modeSpec: t, opaque: n && n.opaque, priority: (n && n.priority) || 0 },
                function (e) {
                  return e.priority
                }
              ),
                this.state.modeGen++,
                Rr(this)
            }),
            removeOverlay: Ei(function (e) {
              for (var t = this.state.overlays, n = 0; n < t.length; ++n) {
                var r = t[n].modeSpec
                if (r == e || ("string" == typeof e && r.name == e))
                  return t.splice(n, 1), this.state.modeGen++, void Rr(this)
              }
            }),
            indentLine: Ei(function (e, t, n) {
              "string" != typeof t &&
                "number" != typeof t &&
                (t = null == t ? (this.options.smartIndent ? "smart" : "prev") : t ? "add" : "subtract"),
                at(this.doc, e) && Ul(this, e, t, n)
            }),
            indentSelection: Ei(function (e) {
              for (var t = this.doc.sel.ranges, n = -1, r = 0; r < t.length; r++) {
                var i = t[r]
                if (i.empty())
                  i.head.line > n &&
                    (Ul(this, i.head.line, e, !0), (n = i.head.line), r == this.doc.sel.primIndex && ui(this))
                else {
                  var o = i.from(),
                    a = i.to(),
                    l = Math.max(n, o.line)
                  n = Math.min(this.lastLine(), a.line - (a.ch ? 0 : 1)) + 1
                  for (var s = l; s < n; ++s) Ul(this, s, e)
                  var c = this.doc.sel.ranges
                  0 == o.ch && t.length == c.length && c[r].from().ch > 0 && Ko(this.doc, r, new so(o, c[r].to()), _)
                }
              }
            }),
            getTokenAt: function (e, t) {
              return Mt(this, e, t)
            },
            getLineTokens: function (e, t) {
              return Mt(this, st(e), t, !0)
            },
            getTokenTypeAt: function (e) {
              e = gt(this.doc, e)
              var t,
                n = xt(this, et(this.doc, e.line)),
                r = 0,
                i = (n.length - 1) / 2,
                o = e.ch
              if (0 == o) t = n[2]
              else
                for (;;) {
                  var a = (r + i) >> 1
                  if ((a ? n[2 * a - 1] : 0) >= o) i = a
                  else {
                    if (!(n[2 * a + 1] < o)) {
                      t = n[2 * a + 2]
                      break
                    }
                    r = a + 1
                  }
                }
              var l = t ? t.indexOf("overlay ") : -1
              return l < 0 ? t : 0 == l ? null : t.slice(0, l - 1)
            },
            getModeAt: function (t) {
              var n = this.doc.mode
              return n.innerMode ? e.innerMode(n, this.getTokenAt(t).state).mode : n
            },
            getHelper: function (e, t) {
              return this.getHelpers(e, t)[0]
            },
            getHelpers: function (e, t) {
              var r = []
              if (!n.hasOwnProperty(t)) return r
              var i = n[t],
                o = this.getModeAt(e)
              if ("string" == typeof o[t]) i[o[t]] && r.push(i[o[t]])
              else if (o[t])
                for (var a = 0; a < o[t].length; a++) {
                  var l = i[o[t][a]]
                  l && r.push(l)
                }
              else o.helperType && i[o.helperType] ? r.push(i[o.helperType]) : i[o.name] && r.push(i[o.name])
              for (var s = 0; s < i._global.length; s++) {
                var c = i._global[s]
                c.pred(o, this) && -1 == U(r, c.val) && r.push(c.val)
              }
              return r
            },
            getStateAfter: function (e, t) {
              var n = this.doc
              return kt(this, (e = pt(n, null == e ? n.first + n.size - 1 : e)) + 1, t).state
            },
            cursorCoords: function (e, t) {
              var n = this.doc.sel.primary()
              return kr(
                this,
                null == e ? n.head : "object" == typeof e ? gt(this.doc, e) : e ? n.from() : n.to(),
                t || "page"
              )
            },
            charCoords: function (e, t) {
              return xr(this, gt(this.doc, e), t || "page")
            },
            coordsChar: function (e, t) {
              return Lr(this, (e = wr(this, e, t || "page")).left, e.top)
            },
            lineAtHeight: function (e, t) {
              return (e = wr(this, { top: e, left: 0 }, t || "page").top), ot(this.doc, e + this.display.viewOffset)
            },
            heightAtLine: function (e, t, n) {
              var r,
                i = !1
              if ("number" == typeof e) {
                var o = this.doc.first + this.doc.size - 1
                e < this.doc.first ? (e = this.doc.first) : e > o && ((e = o), (i = !0)), (r = et(this.doc, e))
              } else r = e
              return br(this, r, { top: 0, left: 0 }, t || "page", n || i).top + (i ? this.doc.height - cn(r) : 0)
            },
            defaultTextHeight: function () {
              return Hr(this.display)
            },
            defaultCharWidth: function () {
              return Fr(this.display)
            },
            getViewport: function () {
              return { from: this.display.viewFrom, to: this.display.viewTo }
            },
            addWidget: function (e, t, n, r, i) {
              var o = this.display,
                a = (e = kr(this, gt(this.doc, e))).bottom,
                l = e.left
              if (
                ((t.style.position = "absolute"),
                t.setAttribute("cm-ignore-events", "true"),
                this.display.input.setUneditable(t),
                o.sizer.appendChild(t),
                "over" == r)
              )
                a = e.top
              else if ("above" == r || "near" == r) {
                var s = Math.max(o.wrapper.clientHeight, this.doc.height),
                  c = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth)
                ;("above" == r || e.bottom + t.offsetHeight > s) && e.top > t.offsetHeight
                  ? (a = e.top - t.offsetHeight)
                  : e.bottom + t.offsetHeight <= s && (a = e.bottom),
                  l + t.offsetWidth > c && (l = c - t.offsetWidth)
              }
              ;(t.style.top = a + "px"),
                (t.style.left = t.style.right = ""),
                "right" == i
                  ? ((l = o.sizer.clientWidth - t.offsetWidth), (t.style.right = "0px"))
                  : ("left" == i ? (l = 0) : "middle" == i && (l = (o.sizer.clientWidth - t.offsetWidth) / 2),
                    (t.style.left = l + "px")),
                n && li(this, { left: l, top: a, right: l + t.offsetWidth, bottom: a + t.offsetHeight })
            },
            triggerOnKeyDown: Ei(hl),
            triggerOnKeyPress: Ei(gl),
            triggerOnKeyUp: pl,
            triggerOnMouseDown: Ei(xl),
            execCommand: function (e) {
              if (el.hasOwnProperty(e)) return el[e].call(null, this)
            },
            triggerElectric: Ei(function (e) {
              $l(this, e)
            }),
            findPosH: function (e, t, n, r) {
              var i = 1
              t < 0 && ((i = -1), (t = -t))
              for (var o = gt(this.doc, e), a = 0; a < t && !(o = Jl(this.doc, o, i, n, r)).hitSide; ++a);
              return o
            },
            moveH: Ei(function (e, t) {
              var n = this
              this.extendSelectionsBy(function (r) {
                return n.display.shift || n.doc.extend || r.empty()
                  ? Jl(n.doc, r.head, e, t, n.options.rtlMoveVisually)
                  : e < 0
                    ? r.from()
                    : r.to()
              }, $)
            }),
            deleteH: Ei(function (e, t) {
              var n = this.doc.sel,
                r = this.doc
              n.somethingSelected()
                ? r.replaceSelection("", null, "+delete")
                : Xa(this, function (n) {
                    var i = Jl(r, n.head, e, t, !1)
                    return e < 0 ? { from: i, to: n.head } : { from: n.head, to: i }
                  })
            }),
            findPosV: function (e, t, n, r) {
              var i = 1,
                o = r
              t < 0 && ((i = -1), (t = -t))
              for (var a = gt(this.doc, e), l = 0; l < t; ++l) {
                var s = kr(this, a, "div")
                if ((null == o ? (o = s.left) : (s.left = o), (a = es(this, s, i, n)).hitSide)) break
              }
              return a
            },
            moveV: Ei(function (e, t) {
              var n = this,
                r = this.doc,
                i = [],
                o = !this.display.shift && !r.extend && r.sel.somethingSelected()
              if (
                (r.extendSelectionsBy(function (a) {
                  if (o) return e < 0 ? a.from() : a.to()
                  var l = kr(n, a.head, "div")
                  null != a.goalColumn && (l.left = a.goalColumn), i.push(l.left)
                  var s = es(n, l, e, t)
                  return "page" == t && a == r.sel.primary() && ci(n, xr(n, s, "div").top - l.top), s
                }, $),
                i.length)
              )
                for (var a = 0; a < r.sel.ranges.length; a++) r.sel.ranges[a].goalColumn = i[a]
            }),
            findWordAt: function (e) {
              var t = et(this.doc, e.line).text,
                n = e.ch,
                r = e.ch
              if (t) {
                var i = this.getHelper(e, "wordChars")
                ;("before" != e.sticky && r != t.length) || !n ? ++r : --n
                for (
                  var o = t.charAt(n),
                    a = oe(o, i)
                      ? function (e) {
                          return oe(e, i)
                        }
                      : /\s/.test(o)
                        ? function (e) {
                            return /\s/.test(e)
                          }
                        : function (e) {
                            return !/\s/.test(e) && !oe(e)
                          };
                  n > 0 && a(t.charAt(n - 1));

                )
                  --n
                for (; r < t.length && a(t.charAt(r)); ) ++r
              }
              return new so(st(e.line, n), st(e.line, r))
            },
            toggleOverwrite: function (e) {
              ;(null != e && e == this.state.overwrite) ||
                ((this.state.overwrite = !this.state.overwrite)
                  ? D(this.display.cursorDiv, "CodeMirror-overwrite")
                  : M(this.display.cursorDiv, "CodeMirror-overwrite"),
                we(this, "overwriteToggle", this, this.state.overwrite))
            },
            hasFocus: function () {
              return this.display.input.getField() == F(z(this))
            },
            isReadOnly: function () {
              return !(!this.options.readOnly && !this.doc.cantEdit)
            },
            scrollTo: Ei(function (e, t) {
              fi(this, e, t)
            }),
            getScrollInfo: function () {
              var e = this.display.scroller
              return {
                left: e.scrollLeft,
                top: e.scrollTop,
                height: e.scrollHeight - Zn(this) - this.display.barHeight,
                width: e.scrollWidth - Zn(this) - this.display.barWidth,
                clientHeight: Jn(this),
                clientWidth: Qn(this),
              }
            },
            scrollIntoView: Ei(function (e, t) {
              null == e
                ? ((e = { from: this.doc.sel.primary().head, to: null }),
                  null == t && (t = this.options.cursorScrollMargin))
                : "number" == typeof e
                  ? (e = { from: st(e, 0), to: null })
                  : null == e.from && (e = { from: e, to: null }),
                e.to || (e.to = e.from),
                (e.margin = t || 0),
                null != e.from.line ? hi(this, e) : pi(this, e.from, e.to, e.margin)
            }),
            setSize: Ei(function (e, t) {
              var n = this,
                r = function (e) {
                  return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e
                }
              null != e && (this.display.wrapper.style.width = r(e)),
                null != t && (this.display.wrapper.style.height = r(t)),
                this.options.lineWrapping && pr(this)
              var i = this.display.viewFrom
              this.doc.iter(i, this.display.viewTo, function (e) {
                if (e.widgets)
                  for (var t = 0; t < e.widgets.length; t++)
                    if (e.widgets[t].noHScroll) {
                      Kr(n, i, "widget")
                      break
                    }
                ++i
              }),
                (this.curOp.forceUpdate = !0),
                we(this, "refresh", this)
            }),
            operation: function (e) {
              return Di(this, e)
            },
            startOperation: function () {
              return Ti(this)
            },
            endOperation: function () {
              return Mi(this)
            },
            refresh: Ei(function () {
              var e = this.display.cachedTextHeight
              Rr(this),
                (this.curOp.forceUpdate = !0),
                gr(this),
                fi(this, this.doc.scrollLeft, this.doc.scrollTop),
                $i(this.display),
                (null == e || Math.abs(e - Hr(this.display)) > 0.5 || this.options.lineWrapping) && zr(this),
                we(this, "refresh", this)
            }),
            swapDoc: Ei(function (e) {
              var t = this.doc
              return (
                (t.cm = null),
                this.state.selectingText && this.state.selectingText(),
                ko(this, e),
                gr(this),
                this.display.input.reset(),
                fi(this, e.scrollLeft, e.scrollTop),
                (this.curOp.forceScroll = !0),
                Hn(this, "swapDoc", this, t),
                t
              )
            }),
            phrase: function (e) {
              var t = this.options.phrases
              return t && Object.prototype.hasOwnProperty.call(t, e) ? t[e] : e
            },
            getInputField: function () {
              return this.display.input.getField()
            },
            getWrapperElement: function () {
              return this.display.wrapper
            },
            getScrollerElement: function () {
              return this.display.scroller
            },
            getGutterElement: function () {
              return this.display.gutters
            },
          }),
            Se(e),
            (e.registerHelper = function (t, r, i) {
              n.hasOwnProperty(t) || (n[t] = e[t] = { _global: [] }), (n[t][r] = i)
            }),
            (e.registerGlobalHelper = function (t, r, i, o) {
              e.registerHelper(t, r, o), n[t]._global.push({ pred: i, val: o })
            })
        }
        function Jl(e, t, n, r, i) {
          var o = t,
            a = n,
            l = et(e, t.line),
            s = i && "rtl" == e.direction ? -n : n
          function c() {
            var n = t.line + s
            return !(n < e.first || n >= e.first + e.size) && ((t = new st(n, t.ch, t.sticky)), (l = et(e, n)))
          }
          function u(o) {
            var a
            if ("codepoint" == r) {
              var u = l.text.charCodeAt(t.ch + (n > 0 ? 0 : -1))
              if (isNaN(u)) a = null
              else {
                var f = n > 0 ? u >= 55296 && u < 56320 : u >= 56320 && u < 57343
                a = new st(t.line, Math.max(0, Math.min(l.text.length, t.ch + n * (f ? 2 : 1))), -n)
              }
            } else a = i ? Ja(e.cm, l, t, n) : Za(l, t, n)
            if (null == a) {
              if (o || !c()) return !1
              t = Qa(i, e.cm, l, t.line, s)
            } else t = a
            return !0
          }
          if ("char" == r || "codepoint" == r) u()
          else if ("column" == r) u(!0)
          else if ("word" == r || "group" == r)
            for (
              var f = null, h = "group" == r, d = e.cm && e.cm.getHelper(t, "wordChars"), p = !0;
              !(n < 0) || u(!p);
              p = !1
            ) {
              var g = l.text.charAt(t.ch) || "\n",
                m = oe(g, d) ? "w" : h && "\n" == g ? "n" : !h || /\s/.test(g) ? null : "p"
              if ((!h || p || m || (m = "s"), f && f != m)) {
                n < 0 && ((n = 1), u(), (t.sticky = "after"))
                break
              }
              if ((m && (f = m), n > 0 && !u(!p))) break
            }
          var v = Zo(e, t, o, a, !0)
          return ut(o, v) && (v.hitSide = !0), v
        }
        function es(e, t, n, r) {
          var i,
            o,
            a = e.doc,
            l = t.left
          if ("page" == r) {
            var s = Math.min(e.display.wrapper.clientHeight, I(e).innerHeight || a(e).documentElement.clientHeight),
              c = Math.max(s - 0.5 * Hr(e.display), 3)
            i = (n > 0 ? t.bottom : t.top) + n * c
          } else "line" == r && (i = n > 0 ? t.bottom + 3 : t.top - 3)
          for (; (o = Lr(e, l, i)).outside; ) {
            if (n < 0 ? i <= 0 : i >= a.height) {
              o.hitSide = !0
              break
            }
            i += 5 * n
          }
          return o
        }
        var ts = function (e) {
          ;(this.cm = e),
            (this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null),
            (this.polling = new j()),
            (this.composing = null),
            (this.gracePeriod = !1),
            (this.readDOMTimeout = null)
        }
        function ns(e, t) {
          var n = ir(e, t.line)
          if (!n || n.hidden) return null
          var r = et(e.doc, t.line),
            i = tr(n, r, t.line),
            o = ge(r, e.doc.direction),
            a = "left"
          o && (a = de(o, t.ch) % 2 ? "right" : "left")
          var l = cr(i.map, t.ch, a)
          return (l.offset = "right" == l.collapse ? l.end : l.start), l
        }
        function rs(e) {
          for (var t = e; t; t = t.parentNode) if (/CodeMirror-gutter-wrapper/.test(t.className)) return !0
          return !1
        }
        function is(e, t) {
          return t && (e.bad = !0), e
        }
        function os(e, t, n, r, i) {
          var o = "",
            a = !1,
            l = e.doc.lineSeparator(),
            s = !1
          function c(e) {
            return function (t) {
              return t.id == e
            }
          }
          function u() {
            a && ((o += l), s && (o += l), (a = s = !1))
          }
          function f(e) {
            e && (u(), (o += e))
          }
          function h(t) {
            if (1 == t.nodeType) {
              var n = t.getAttribute("cm-text")
              if (n) return void f(n)
              var o,
                d = t.getAttribute("cm-marker")
              if (d) {
                var p = e.findMarks(st(r, 0), st(i + 1, 0), c(+d))
                return void (p.length && (o = p[0].find(0)) && f(tt(e.doc, o.from, o.to).join(l)))
              }
              if ("false" == t.getAttribute("contenteditable")) return
              var g = /^(pre|div|p|li|table|br)$/i.test(t.nodeName)
              if (!/^br$/i.test(t.nodeName) && 0 == t.textContent.length) return
              g && u()
              for (var m = 0; m < t.childNodes.length; m++) h(t.childNodes[m])
              ;/^(pre|p)$/i.test(t.nodeName) && (s = !0), g && (a = !0)
            } else 3 == t.nodeType && f(t.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "))
          }
          for (; h(t), t != n; ) (t = t.nextSibling), (s = !1)
          return o
        }
        function as(e, t, n) {
          var r
          if (t == e.display.lineDiv) {
            if (!(r = e.display.lineDiv.childNodes[n])) return is(e.clipPos(st(e.display.viewTo - 1)), !0)
            ;(t = null), (n = 0)
          } else
            for (r = t; ; r = r.parentNode) {
              if (!r || r == e.display.lineDiv) return null
              if (r.parentNode && r.parentNode == e.display.lineDiv) break
            }
          for (var i = 0; i < e.display.view.length; i++) {
            var o = e.display.view[i]
            if (o.node == r) return ls(o, t, n)
          }
        }
        function ls(e, t, n) {
          var r = e.text.firstChild,
            i = !1
          if (!t || !H(r, t)) return is(st(it(e.line), 0), !0)
          if (t == r && ((i = !0), (t = r.childNodes[n]), (n = 0), !t)) {
            var o = e.rest ? Q(e.rest) : e.line
            return is(st(it(o), o.text.length), i)
          }
          var a = 3 == t.nodeType ? t : null,
            l = t
          for (
            a ||
            1 != t.childNodes.length ||
            3 != t.firstChild.nodeType ||
            ((a = t.firstChild), n && (n = a.nodeValue.length));
            l.parentNode != r;

          )
            l = l.parentNode
          var s = e.measure,
            c = s.maps
          function u(t, n, r) {
            for (var i = -1; i < (c ? c.length : 0); i++)
              for (var o = i < 0 ? s.map : c[i], a = 0; a < o.length; a += 3) {
                var l = o[a + 2]
                if (l == t || l == n) {
                  var u = it(i < 0 ? e.line : e.rest[i]),
                    f = o[a] + r
                  return (r < 0 || l != t) && (f = o[a + (r ? 1 : 0)]), st(u, f)
                }
              }
          }
          var f = u(a, l, n)
          if (f) return is(f, i)
          for (var h = l.nextSibling, d = a ? a.nodeValue.length - n : 0; h; h = h.nextSibling) {
            if ((f = u(h, h.firstChild, 0))) return is(st(f.line, f.ch - d), i)
            d += h.textContent.length
          }
          for (var p = l.previousSibling, g = n; p; p = p.previousSibling) {
            if ((f = u(p, p.firstChild, -1))) return is(st(f.line, f.ch + g), i)
            g += p.textContent.length
          }
        }
        ;(ts.prototype.init = function (e) {
          var t = this,
            n = this,
            r = n.cm,
            i = (n.div = e.lineDiv)
          function o(e) {
            for (var t = e.target; t; t = t.parentNode) {
              if (t == i) return !0
              if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) break
            }
            return !1
          }
          function a(e) {
            if (o(e) && !xe(r, e)) {
              if (r.somethingSelected())
                Gl({ lineWise: !1, text: r.getSelections() }), "cut" == e.type && r.replaceSelection("", null, "cut")
              else {
                if (!r.options.lineWiseCopyCut) return
                var t = Xl(r)
                Gl({ lineWise: !0, text: t.text }),
                  "cut" == e.type &&
                    r.operation(function () {
                      r.setSelections(t.ranges, 0, _), r.replaceSelection("", null, "cut")
                    })
              }
              if (e.clipboardData) {
                e.clipboardData.clearData()
                var a = Vl.text.join("\n")
                if ((e.clipboardData.setData("Text", a), e.clipboardData.getData("Text") == a))
                  return void e.preventDefault()
              }
              var l = Zl(),
                s = l.firstChild
              r.display.lineSpace.insertBefore(l, r.display.lineSpace.firstChild), (s.value = Vl.text.join("\n"))
              var c = F(i.ownerDocument)
              E(s),
                setTimeout(function () {
                  r.display.lineSpace.removeChild(l), c.focus(), c == i && n.showPrimarySelection()
                }, 50)
            }
          }
          ;(i.contentEditable = !0),
            Yl(i, r.options.spellcheck, r.options.autocorrect, r.options.autocapitalize),
            ve(i, "paste", function (e) {
              !o(e) ||
                xe(r, e) ||
                ql(e, r) ||
                (l <= 11 &&
                  setTimeout(
                    Wi(r, function () {
                      return t.updateFromDOM()
                    }),
                    20
                  ))
            }),
            ve(i, "compositionstart", function (e) {
              t.composing = { data: e.data, done: !1 }
            }),
            ve(i, "compositionupdate", function (e) {
              t.composing || (t.composing = { data: e.data, done: !1 })
            }),
            ve(i, "compositionend", function (e) {
              t.composing && (e.data != t.composing.data && t.readFromDOMSoon(), (t.composing.done = !0))
            }),
            ve(i, "touchstart", function () {
              return n.forceCompositionEnd()
            }),
            ve(i, "input", function () {
              t.composing || t.readFromDOMSoon()
            }),
            ve(i, "copy", a),
            ve(i, "cut", a)
        }),
          (ts.prototype.screenReaderLabelChanged = function (e) {
            e ? this.div.setAttribute("aria-label", e) : this.div.removeAttribute("aria-label")
          }),
          (ts.prototype.prepareSelection = function () {
            var e = qr(this.cm, !1)
            return (e.focus = F(this.div.ownerDocument) == this.div), e
          }),
          (ts.prototype.showSelection = function (e, t) {
            e &&
              this.cm.display.view.length &&
              ((e.focus || t) && this.showPrimarySelection(), this.showMultipleSelections(e))
          }),
          (ts.prototype.getSelection = function () {
            return this.cm.display.wrapper.ownerDocument.getSelection()
          }),
          (ts.prototype.showPrimarySelection = function () {
            var e = this.getSelection(),
              t = this.cm,
              r = t.doc.sel.primary(),
              i = r.from(),
              o = r.to()
            if (t.display.viewTo == t.display.viewFrom || i.line >= t.display.viewTo || o.line < t.display.viewFrom)
              e.removeAllRanges()
            else {
              var a = as(t, e.anchorNode, e.anchorOffset),
                l = as(t, e.focusNode, e.focusOffset)
              if (!a || a.bad || !l || l.bad || 0 != ct(dt(a, l), i) || 0 != ct(ht(a, l), o)) {
                var s = t.display.view,
                  c = (i.line >= t.display.viewFrom && ns(t, i)) || { node: s[0].measure.map[2], offset: 0 },
                  u = o.line < t.display.viewTo && ns(t, o)
                if (!u) {
                  var f = s[s.length - 1].measure,
                    h = f.maps ? f.maps[f.maps.length - 1] : f.map
                  u = { node: h[h.length - 1], offset: h[h.length - 2] - h[h.length - 3] }
                }
                if (c && u) {
                  var d,
                    p = e.rangeCount && e.getRangeAt(0)
                  try {
                    d = T(c.node, c.offset, u.offset, u.node)
                  } catch (e) {}
                  d &&
                    (!n && t.state.focused
                      ? (e.collapse(c.node, c.offset), d.collapsed || (e.removeAllRanges(), e.addRange(d)))
                      : (e.removeAllRanges(), e.addRange(d)),
                    p && null == e.anchorNode ? e.addRange(p) : n && this.startGracePeriod()),
                    this.rememberSelection()
                } else e.removeAllRanges()
              }
            }
          }),
          (ts.prototype.startGracePeriod = function () {
            var e = this
            clearTimeout(this.gracePeriod),
              (this.gracePeriod = setTimeout(function () {
                ;(e.gracePeriod = !1),
                  e.selectionChanged() &&
                    e.cm.operation(function () {
                      return (e.cm.curOp.selectionChanged = !0)
                    })
              }, 20))
          }),
          (ts.prototype.showMultipleSelections = function (e) {
            O(this.cm.display.cursorDiv, e.cursors), O(this.cm.display.selectionDiv, e.selection)
          }),
          (ts.prototype.rememberSelection = function () {
            var e = this.getSelection()
            ;(this.lastAnchorNode = e.anchorNode),
              (this.lastAnchorOffset = e.anchorOffset),
              (this.lastFocusNode = e.focusNode),
              (this.lastFocusOffset = e.focusOffset)
          }),
          (ts.prototype.selectionInEditor = function () {
            var e = this.getSelection()
            if (!e.rangeCount) return !1
            var t = e.getRangeAt(0).commonAncestorContainer
            return H(this.div, t)
          }),
          (ts.prototype.focus = function () {
            "nocursor" != this.cm.options.readOnly &&
              ((this.selectionInEditor() && F(this.div.ownerDocument) == this.div) ||
                this.showSelection(this.prepareSelection(), !0),
              this.div.focus())
          }),
          (ts.prototype.blur = function () {
            this.div.blur()
          }),
          (ts.prototype.getField = function () {
            return this.div
          }),
          (ts.prototype.supportsTouch = function () {
            return !0
          }),
          (ts.prototype.receivedFocus = function () {
            var e = this,
              t = this
            function n() {
              t.cm.state.focused && (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, n))
            }
            this.selectionInEditor()
              ? setTimeout(function () {
                  return e.pollSelection()
                }, 20)
              : Di(this.cm, function () {
                  return (t.cm.curOp.selectionChanged = !0)
                }),
              this.polling.set(this.cm.options.pollInterval, n)
          }),
          (ts.prototype.selectionChanged = function () {
            var e = this.getSelection()
            return (
              e.anchorNode != this.lastAnchorNode ||
              e.anchorOffset != this.lastAnchorOffset ||
              e.focusNode != this.lastFocusNode ||
              e.focusOffset != this.lastFocusOffset
            )
          }),
          (ts.prototype.pollSelection = function () {
            if (null == this.readDOMTimeout && !this.gracePeriod && this.selectionChanged()) {
              var e = this.getSelection(),
                t = this.cm
              if (v && u && this.cm.display.gutterSpecs.length && rs(e.anchorNode))
                return (
                  this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs }),
                  this.blur(),
                  void this.focus()
                )
              if (!this.composing) {
                this.rememberSelection()
                var n = as(t, e.anchorNode, e.anchorOffset),
                  r = as(t, e.focusNode, e.focusOffset)
                n &&
                  r &&
                  Di(t, function () {
                    Go(t.doc, uo(n, r), _), (n.bad || r.bad) && (t.curOp.selectionChanged = !0)
                  })
              }
            }
          }),
          (ts.prototype.pollContent = function () {
            null != this.readDOMTimeout && (clearTimeout(this.readDOMTimeout), (this.readDOMTimeout = null))
            var e,
              t,
              n,
              r = this.cm,
              i = r.display,
              o = r.doc.sel.primary(),
              a = o.from(),
              l = o.to()
            if (
              (0 == a.ch && a.line > r.firstLine() && (a = st(a.line - 1, et(r.doc, a.line - 1).length)),
              l.ch == et(r.doc, l.line).text.length && l.line < r.lastLine() && (l = st(l.line + 1, 0)),
              a.line < i.viewFrom || l.line > i.viewTo - 1)
            )
              return !1
            a.line == i.viewFrom || 0 == (e = Br(r, a.line))
              ? ((t = it(i.view[0].line)), (n = i.view[0].node))
              : ((t = it(i.view[e].line)), (n = i.view[e - 1].node.nextSibling))
            var s,
              c,
              u = Br(r, l.line)
            if (
              (u == i.view.length - 1
                ? ((s = i.viewTo - 1), (c = i.lineDiv.lastChild))
                : ((s = it(i.view[u + 1].line) - 1), (c = i.view[u + 1].node.previousSibling)),
              !n)
            )
              return !1
            for (
              var f = r.doc.splitLines(os(r, n, c, t, s)), h = tt(r.doc, st(t, 0), st(s, et(r.doc, s).text.length));
              f.length > 1 && h.length > 1;

            )
              if (Q(f) == Q(h)) f.pop(), h.pop(), s--
              else {
                if (f[0] != h[0]) break
                f.shift(), h.shift(), t++
              }
            for (
              var d = 0, p = 0, g = f[0], m = h[0], v = Math.min(g.length, m.length);
              d < v && g.charCodeAt(d) == m.charCodeAt(d);

            )
              ++d
            for (
              var y = Q(f),
                b = Q(h),
                w = Math.min(y.length - (1 == f.length ? d : 0), b.length - (1 == h.length ? d : 0));
              p < w && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);

            )
              ++p
            if (1 == f.length && 1 == h.length && t == a.line)
              for (; d && d > a.ch && y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1); ) d--, p++
            ;(f[f.length - 1] = y.slice(0, y.length - p).replace(/^\u200b+/, "")),
              (f[0] = f[0].slice(d).replace(/\u200b+$/, ""))
            var x = st(t, d),
              k = st(s, h.length ? Q(h).length - p : 0)
            return f.length > 1 || f[0] || ct(x, k) ? (la(r.doc, f, x, k, "+input"), !0) : void 0
          }),
          (ts.prototype.ensurePolled = function () {
            this.forceCompositionEnd()
          }),
          (ts.prototype.reset = function () {
            this.forceCompositionEnd()
          }),
          (ts.prototype.forceCompositionEnd = function () {
            this.composing &&
              (clearTimeout(this.readDOMTimeout),
              (this.composing = null),
              this.updateFromDOM(),
              this.div.blur(),
              this.div.focus())
          }),
          (ts.prototype.readFromDOMSoon = function () {
            var e = this
            null == this.readDOMTimeout &&
              (this.readDOMTimeout = setTimeout(function () {
                if (((e.readDOMTimeout = null), e.composing)) {
                  if (!e.composing.done) return
                  e.composing = null
                }
                e.updateFromDOM()
              }, 80))
          }),
          (ts.prototype.updateFromDOM = function () {
            var e = this
            ;(!this.cm.isReadOnly() && this.pollContent()) ||
              Di(this.cm, function () {
                return Rr(e.cm)
              })
          }),
          (ts.prototype.setUneditable = function (e) {
            e.contentEditable = "false"
          }),
          (ts.prototype.onKeyPress = function (e) {
            0 == e.charCode ||
              this.composing ||
              (e.preventDefault(),
              this.cm.isReadOnly() ||
                Wi(this.cm, _l)(this.cm, String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), 0))
          }),
          (ts.prototype.readOnlyChanged = function (e) {
            this.div.contentEditable = String("nocursor" != e)
          }),
          (ts.prototype.onContextMenu = function () {}),
          (ts.prototype.resetPosition = function () {}),
          (ts.prototype.needsContentAttribute = !0)
        var ss = function (e) {
          ;(this.cm = e),
            (this.prevInput = ""),
            (this.pollingFast = !1),
            (this.polling = new j()),
            (this.hasSelection = !1),
            (this.composing = null),
            (this.resetting = !1)
        }
        function cs(e, t) {
          if (
            (((t = t ? R(t) : {}).value = e.value),
            !t.tabindex && e.tabIndex && (t.tabindex = e.tabIndex),
            !t.placeholder && e.placeholder && (t.placeholder = e.placeholder),
            null == t.autofocus)
          ) {
            var n = F(e.ownerDocument)
            t.autofocus = n == e || (null != e.getAttribute("autofocus") && n == document.body)
          }
          function r() {
            e.value = l.getValue()
          }
          var i
          if (e.form && (ve(e.form, "submit", r), !t.leaveSubmitMethodAlone)) {
            var o = e.form
            i = o.submit
            try {
              var a = (o.submit = function () {
                r(), (o.submit = i), o.submit(), (o.submit = a)
              })
            } catch (e) {}
          }
          ;(t.finishInit = function (n) {
            ;(n.save = r),
              (n.getTextArea = function () {
                return e
              }),
              (n.toTextArea = function () {
                ;(n.toTextArea = isNaN),
                  r(),
                  e.parentNode.removeChild(n.getWrapperElement()),
                  (e.style.display = ""),
                  e.form &&
                    (be(e.form, "submit", r),
                    t.leaveSubmitMethodAlone || "function" != typeof e.form.submit || (e.form.submit = i))
              })
          }),
            (e.style.display = "none")
          var l = Rl(function (t) {
            return e.parentNode.insertBefore(t, e.nextSibling)
          }, t)
          return l
        }
        function us(e) {
          ;(e.off = be),
            (e.on = ve),
            (e.wheelEventPixels = oo),
            (e.Doc = Ta),
            (e.splitLines = ze),
            (e.countColumn = K),
            (e.findColumn = X),
            (e.isWordChar = ie),
            (e.Pass = G),
            (e.signal = we),
            (e.Line = hn),
            (e.changeEnd = fo),
            (e.scrollbarModel = Ci),
            (e.Pos = st),
            (e.cmpPos = ct),
            (e.modes = je),
            (e.mimeModes = Ue),
            (e.resolveMode = _e),
            (e.getMode = qe),
            (e.modeExtensions = $e),
            (e.extendMode = Xe),
            (e.copyState = Ye),
            (e.startState = Qe),
            (e.innerMode = Ze),
            (e.commands = el),
            (e.keyMap = Ka),
            (e.keyName = qa),
            (e.isModifierKey = Ga),
            (e.lookupKey = Va),
            (e.normalizeKeyMap = Ua),
            (e.StringStream = Je),
            (e.SharedTextMarker = wa),
            (e.TextMarker = ya),
            (e.LineWidget = pa),
            (e.e_preventDefault = Le),
            (e.e_stopPropagation = Te),
            (e.e_stop = Ae),
            (e.addClass = D),
            (e.contains = H),
            (e.rmClass = M),
            (e.keyNames = za)
        }
        ;(ss.prototype.init = function (e) {
          var t = this,
            n = this,
            r = this.cm
          this.createField(e)
          var i = this.textarea
          function o(e) {
            if (!xe(r, e)) {
              if (r.somethingSelected()) Gl({ lineWise: !1, text: r.getSelections() })
              else {
                if (!r.options.lineWiseCopyCut) return
                var t = Xl(r)
                Gl({ lineWise: !0, text: t.text }),
                  "cut" == e.type
                    ? r.setSelections(t.ranges, null, _)
                    : ((n.prevInput = ""), (i.value = t.text.join("\n")), E(i))
              }
              "cut" == e.type && (r.state.cutIncoming = +new Date())
            }
          }
          e.wrapper.insertBefore(this.wrapper, e.wrapper.firstChild),
            m && (i.style.width = "0px"),
            ve(i, "input", function () {
              a && l >= 9 && t.hasSelection && (t.hasSelection = null), n.poll()
            }),
            ve(i, "paste", function (e) {
              xe(r, e) || ql(e, r) || ((r.state.pasteIncoming = +new Date()), n.fastPoll())
            }),
            ve(i, "cut", o),
            ve(i, "copy", o),
            ve(e.scroller, "paste", function (t) {
              if (!qn(e, t) && !xe(r, t)) {
                if (!i.dispatchEvent) return (r.state.pasteIncoming = +new Date()), void n.focus()
                var o = new Event("paste")
                ;(o.clipboardData = t.clipboardData), i.dispatchEvent(o)
              }
            }),
            ve(e.lineSpace, "selectstart", function (t) {
              qn(e, t) || Le(t)
            }),
            ve(i, "compositionstart", function () {
              var e = r.getCursor("from")
              n.composing && n.composing.range.clear(),
                (n.composing = {
                  start: e,
                  range: r.markText(e, r.getCursor("to"), { className: "CodeMirror-composing" }),
                })
            }),
            ve(i, "compositionend", function () {
              n.composing && (n.poll(), n.composing.range.clear(), (n.composing = null))
            })
        }),
          (ss.prototype.createField = function (e) {
            ;(this.wrapper = Zl()), (this.textarea = this.wrapper.firstChild)
          }),
          (ss.prototype.screenReaderLabelChanged = function (e) {
            e ? this.textarea.setAttribute("aria-label", e) : this.textarea.removeAttribute("aria-label")
          }),
          (ss.prototype.prepareSelection = function () {
            var e = this.cm,
              t = e.display,
              n = e.doc,
              r = qr(e)
            if (e.options.moveInputWithCursor) {
              var i = kr(e, n.sel.primary().head, "div"),
                o = t.wrapper.getBoundingClientRect(),
                a = t.lineDiv.getBoundingClientRect()
              ;(r.teTop = Math.max(0, Math.min(t.wrapper.clientHeight - 10, i.top + a.top - o.top))),
                (r.teLeft = Math.max(0, Math.min(t.wrapper.clientWidth - 10, i.left + a.left - o.left)))
            }
            return r
          }),
          (ss.prototype.showSelection = function (e) {
            var t = this.cm.display
            O(t.cursorDiv, e.cursors),
              O(t.selectionDiv, e.selection),
              null != e.teTop &&
                ((this.wrapper.style.top = e.teTop + "px"), (this.wrapper.style.left = e.teLeft + "px"))
          }),
          (ss.prototype.reset = function (e) {
            if (!(this.contextMenuPending || (this.composing && e))) {
              var t = this.cm
              if (((this.resetting = !0), t.somethingSelected())) {
                this.prevInput = ""
                var n = t.getSelection()
                ;(this.textarea.value = n), t.state.focused && E(this.textarea), a && l >= 9 && (this.hasSelection = n)
              } else e || ((this.prevInput = this.textarea.value = ""), a && l >= 9 && (this.hasSelection = null))
              this.resetting = !1
            }
          }),
          (ss.prototype.getField = function () {
            return this.textarea
          }),
          (ss.prototype.supportsTouch = function () {
            return !1
          }),
          (ss.prototype.focus = function () {
            if ("nocursor" != this.cm.options.readOnly && (!y || F(this.textarea.ownerDocument) != this.textarea))
              try {
                this.textarea.focus()
              } catch (e) {}
          }),
          (ss.prototype.blur = function () {
            this.textarea.blur()
          }),
          (ss.prototype.resetPosition = function () {
            this.wrapper.style.top = this.wrapper.style.left = 0
          }),
          (ss.prototype.receivedFocus = function () {
            this.slowPoll()
          }),
          (ss.prototype.slowPoll = function () {
            var e = this
            this.pollingFast ||
              this.polling.set(this.cm.options.pollInterval, function () {
                e.poll(), e.cm.state.focused && e.slowPoll()
              })
          }),
          (ss.prototype.fastPoll = function () {
            var e = !1,
              t = this
            function n() {
              t.poll() || e ? ((t.pollingFast = !1), t.slowPoll()) : ((e = !0), t.polling.set(60, n))
            }
            ;(t.pollingFast = !0), t.polling.set(20, n)
          }),
          (ss.prototype.poll = function () {
            var e = this,
              t = this.cm,
              n = this.textarea,
              r = this.prevInput
            if (
              this.contextMenuPending ||
              this.resetting ||
              !t.state.focused ||
              (Ie(n) && !r && !this.composing) ||
              t.isReadOnly() ||
              t.options.disableInput ||
              t.state.keySeq
            )
              return !1
            var i = n.value
            if (i == r && !t.somethingSelected()) return !1
            if ((a && l >= 9 && this.hasSelection === i) || (b && /[\uf700-\uf7ff]/.test(i)))
              return t.display.input.reset(), !1
            if (t.doc.sel == t.display.selForContextMenu) {
              var o = i.charCodeAt(0)
              if ((8203 != o || r || (r = "\u200b"), 8666 == o)) return this.reset(), this.cm.execCommand("undo")
            }
            for (var s = 0, c = Math.min(r.length, i.length); s < c && r.charCodeAt(s) == i.charCodeAt(s); ) ++s
            return (
              Di(t, function () {
                _l(t, i.slice(s), r.length - s, null, e.composing ? "*compose" : null),
                  i.length > 1e3 || i.indexOf("\n") > -1 ? (n.value = e.prevInput = "") : (e.prevInput = i),
                  e.composing &&
                    (e.composing.range.clear(),
                    (e.composing.range = t.markText(e.composing.start, t.getCursor("to"), {
                      className: "CodeMirror-composing",
                    })))
              }),
              !0
            )
          }),
          (ss.prototype.ensurePolled = function () {
            this.pollingFast && this.poll() && (this.pollingFast = !1)
          }),
          (ss.prototype.onKeyPress = function () {
            a && l >= 9 && (this.hasSelection = null), this.fastPoll()
          }),
          (ss.prototype.onContextMenu = function (e) {
            var t = this,
              n = t.cm,
              r = n.display,
              i = t.textarea
            t.contextMenuPending && t.contextMenuPending()
            var o = Ir(n, e),
              c = r.scroller.scrollTop
            if (o && !h) {
              n.options.resetSelectionOnContextMenu && -1 == n.doc.sel.contains(o) && Wi(n, Go)(n.doc, uo(o), _)
              var u,
                f = i.style.cssText,
                d = t.wrapper.style.cssText,
                p = t.wrapper.offsetParent.getBoundingClientRect()
              if (
                ((t.wrapper.style.cssText = "position: static"),
                (i.style.cssText =
                  "position: absolute; width: 30px; height: 30px;\n      top: " +
                  (e.clientY - p.top - 5) +
                  "px; left: " +
                  (e.clientX - p.left - 5) +
                  "px;\n      z-index: 1000; background: " +
                  (a ? "rgba(255, 255, 255, .05)" : "transparent") +
                  ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);"),
                s && (u = i.ownerDocument.defaultView.scrollY),
                r.input.focus(),
                s && i.ownerDocument.defaultView.scrollTo(null, u),
                r.input.reset(),
                n.somethingSelected() || (i.value = t.prevInput = " "),
                (t.contextMenuPending = v),
                (r.selForContextMenu = n.doc.sel),
                clearTimeout(r.detectingSelectAll),
                a && l >= 9 && m(),
                S)
              ) {
                Ae(e)
                var g = function () {
                  be(window, "mouseup", g), setTimeout(v, 20)
                }
                ve(window, "mouseup", g)
              } else setTimeout(v, 50)
            }
            function m() {
              if (null != i.selectionStart) {
                var e = n.somethingSelected(),
                  o = "\u200b" + (e ? i.value : "")
                ;(i.value = "\u21da"),
                  (i.value = o),
                  (t.prevInput = e ? "" : "\u200b"),
                  (i.selectionStart = 1),
                  (i.selectionEnd = o.length),
                  (r.selForContextMenu = n.doc.sel)
              }
            }
            function v() {
              if (
                t.contextMenuPending == v &&
                ((t.contextMenuPending = !1),
                (t.wrapper.style.cssText = d),
                (i.style.cssText = f),
                a && l < 9 && r.scrollbars.setScrollTop((r.scroller.scrollTop = c)),
                null != i.selectionStart)
              ) {
                ;(!a || (a && l < 9)) && m()
                var e = 0,
                  o = function () {
                    r.selForContextMenu == n.doc.sel &&
                    0 == i.selectionStart &&
                    i.selectionEnd > 0 &&
                    "\u200b" == t.prevInput
                      ? Wi(n, Jo)(n)
                      : e++ < 10
                        ? (r.detectingSelectAll = setTimeout(o, 500))
                        : ((r.selForContextMenu = null), r.input.reset())
                  }
                r.detectingSelectAll = setTimeout(o, 200)
              }
            }
          }),
          (ss.prototype.readOnlyChanged = function (e) {
            e || this.reset(), (this.textarea.disabled = "nocursor" == e), (this.textarea.readOnly = !!e)
          }),
          (ss.prototype.setUneditable = function () {}),
          (ss.prototype.needsContentAttribute = !1),
          zl(Rl),
          Ql(Rl)
        var fs = "iter insert remove copy getEditor constructor".split(" ")
        for (var hs in Ta.prototype)
          Ta.prototype.hasOwnProperty(hs) &&
            U(fs, hs) < 0 &&
            (Rl.prototype[hs] = (function (e) {
              return function () {
                return e.apply(this.doc, arguments)
              }
            })(Ta.prototype[hs]))
        return (
          Se(Ta),
          (Rl.inputStyles = { textarea: ss, contenteditable: ts }),
          (Rl.defineMode = function (e) {
            Rl.defaults.mode || "null" == e || (Rl.defaults.mode = e), Ve.apply(this, arguments)
          }),
          (Rl.defineMIME = Ge),
          Rl.defineMode("null", function () {
            return {
              token: function (e) {
                return e.skipToEnd()
              },
            }
          }),
          Rl.defineMIME("text/plain", "null"),
          (Rl.defineExtension = function (e, t) {
            Rl.prototype[e] = t
          }),
          (Rl.defineDocExtension = function (e, t) {
            Ta.prototype[e] = t
          }),
          (Rl.fromTextArea = cs),
          us(Rl),
          (Rl.version = "5.65.10"),
          Rl
        )
      })()
    },
    8656: (e, t, n) => {
      !(function (e) {
        "use strict"
        function t(e) {
          for (var t = {}, n = 0; n < e.length; ++n) t[e[n].toLowerCase()] = !0
          return t
        }
        e.defineMode("css", function (t, n) {
          var r = n.inline
          n.propertyKeywords || (n = e.resolveMode("text/css"))
          var i,
            o,
            a = t.indentUnit,
            l = n.tokenHooks,
            s = n.documentTypes || {},
            c = n.mediaTypes || {},
            u = n.mediaFeatures || {},
            f = n.mediaValueKeywords || {},
            h = n.propertyKeywords || {},
            d = n.nonStandardPropertyKeywords || {},
            p = n.fontProperties || {},
            g = n.counterDescriptors || {},
            m = n.colorKeywords || {},
            v = n.valueKeywords || {},
            y = n.allowNested,
            b = n.lineComment,
            w = !0 === n.supportsAtComponent,
            x = !1 !== t.highlightNonStandardPropertyKeywords
          function k(e, t) {
            return (i = t), e
          }
          function C(e, t) {
            var n = e.next()
            if (l[n]) {
              var r = l[n](e, t)
              if (!1 !== r) return r
            }
            return "@" == n
              ? (e.eatWhile(/[\w\\\-]/), k("def", e.current()))
              : "=" == n || (("~" == n || "|" == n) && e.eat("="))
                ? k(null, "compare")
                : '"' == n || "'" == n
                  ? ((t.tokenize = S(n)), t.tokenize(e, t))
                  : "#" == n
                    ? (e.eatWhile(/[\w\\\-]/), k("atom", "hash"))
                    : "!" == n
                      ? (e.match(/^\s*\w*/), k("keyword", "important"))
                      : /\d/.test(n) || ("." == n && e.eat(/\d/))
                        ? (e.eatWhile(/[\w.%]/), k("number", "unit"))
                        : "-" !== n
                          ? /[,+>*\/]/.test(n)
                            ? k(null, "select-op")
                            : "." == n && e.match(/^-?[_a-z][_a-z0-9-]*/i)
                              ? k("qualifier", "qualifier")
                              : /[:;{}\[\]\(\)]/.test(n)
                                ? k(null, n)
                                : e.match(/^[\w-.]+(?=\()/)
                                  ? (/^(url(-prefix)?|domain|regexp)$/i.test(e.current()) && (t.tokenize = L),
                                    k("variable callee", "variable"))
                                  : /[\w\\\-]/.test(n)
                                    ? (e.eatWhile(/[\w\\\-]/), k("property", "word"))
                                    : k(null, null)
                          : /[\d.]/.test(e.peek())
                            ? (e.eatWhile(/[\w.%]/), k("number", "unit"))
                            : e.match(/^-[\w\\\-]*/)
                              ? (e.eatWhile(/[\w\\\-]/),
                                e.match(/^\s*:/, !1)
                                  ? k("variable-2", "variable-definition")
                                  : k("variable-2", "variable"))
                              : e.match(/^\w+-/)
                                ? k("meta", "meta")
                                : void 0
          }
          function S(e) {
            return function (t, n) {
              for (var r, i = !1; null != (r = t.next()); ) {
                if (r == e && !i) {
                  ")" == e && t.backUp(1)
                  break
                }
                i = !i && "\\" == r
              }
              return (r == e || (!i && ")" != e)) && (n.tokenize = null), k("string", "string")
            }
          }
          function L(e, t) {
            return e.next(), e.match(/^\s*[\"\')]/, !1) ? (t.tokenize = null) : (t.tokenize = S(")")), k(null, "(")
          }
          function T(e, t, n) {
            ;(this.type = e), (this.indent = t), (this.prev = n)
          }
          function M(e, t, n, r) {
            return (e.context = new T(n, t.indentation() + (!1 === r ? 0 : a), e.context)), n
          }
          function A(e) {
            return e.context.prev && (e.context = e.context.prev), e.context.type
          }
          function O(e, t, n) {
            return H[n.context.type](e, t, n)
          }
          function N(e, t, n, r) {
            for (var i = r || 1; i > 0; i--) n.context = n.context.prev
            return O(e, t, n)
          }
          function P(e) {
            var t = e.current().toLowerCase()
            o = v.hasOwnProperty(t) ? "atom" : m.hasOwnProperty(t) ? "keyword" : "variable"
          }
          var H = {
            top: function (e, t, n) {
              if ("{" == e) return M(n, t, "block")
              if ("}" == e && n.context.prev) return A(n)
              if (w && /@component/i.test(e)) return M(n, t, "atComponentBlock")
              if (/^@(-moz-)?document$/i.test(e)) return M(n, t, "documentTypes")
              if (/^@(media|supports|(-moz-)?document|import)$/i.test(e)) return M(n, t, "atBlock")
              if (/^@(font-face|counter-style)/i.test(e)) return (n.stateArg = e), "restricted_atBlock_before"
              if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(e)) return "keyframes"
              if (e && "@" == e.charAt(0)) return M(n, t, "at")
              if ("hash" == e) o = "builtin"
              else if ("word" == e) o = "tag"
              else {
                if ("variable-definition" == e) return "maybeprop"
                if ("interpolation" == e) return M(n, t, "interpolation")
                if (":" == e) return "pseudo"
                if (y && "(" == e) return M(n, t, "parens")
              }
              return n.context.type
            },
            block: function (e, t, n) {
              if ("word" == e) {
                var r = t.current().toLowerCase()
                return h.hasOwnProperty(r)
                  ? ((o = "property"), "maybeprop")
                  : d.hasOwnProperty(r)
                    ? ((o = x ? "string-2" : "property"), "maybeprop")
                    : y
                      ? ((o = t.match(/^\s*:(?:\s|$)/, !1) ? "property" : "tag"), "block")
                      : ((o += " error"), "maybeprop")
              }
              return "meta" == e
                ? "block"
                : y || ("hash" != e && "qualifier" != e)
                  ? H.top(e, t, n)
                  : ((o = "error"), "block")
            },
            maybeprop: function (e, t, n) {
              return ":" == e ? M(n, t, "prop") : O(e, t, n)
            },
            prop: function (e, t, n) {
              if (";" == e) return A(n)
              if ("{" == e && y) return M(n, t, "propBlock")
              if ("}" == e || "{" == e) return N(e, t, n)
              if ("(" == e) return M(n, t, "parens")
              if ("hash" != e || /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(t.current())) {
                if ("word" == e) P(t)
                else if ("interpolation" == e) return M(n, t, "interpolation")
              } else o += " error"
              return "prop"
            },
            propBlock: function (e, t, n) {
              return "}" == e ? A(n) : "word" == e ? ((o = "property"), "maybeprop") : n.context.type
            },
            parens: function (e, t, n) {
              return "{" == e || "}" == e
                ? N(e, t, n)
                : ")" == e
                  ? A(n)
                  : "(" == e
                    ? M(n, t, "parens")
                    : "interpolation" == e
                      ? M(n, t, "interpolation")
                      : ("word" == e && P(t), "parens")
            },
            pseudo: function (e, t, n) {
              return "meta" == e ? "pseudo" : "word" == e ? ((o = "variable-3"), n.context.type) : O(e, t, n)
            },
            documentTypes: function (e, t, n) {
              return "word" == e && s.hasOwnProperty(t.current()) ? ((o = "tag"), n.context.type) : H.atBlock(e, t, n)
            },
            atBlock: function (e, t, n) {
              if ("(" == e) return M(n, t, "atBlock_parens")
              if ("}" == e || ";" == e) return N(e, t, n)
              if ("{" == e) return A(n) && M(n, t, y ? "block" : "top")
              if ("interpolation" == e) return M(n, t, "interpolation")
              if ("word" == e) {
                var r = t.current().toLowerCase()
                o =
                  "only" == r || "not" == r || "and" == r || "or" == r
                    ? "keyword"
                    : c.hasOwnProperty(r)
                      ? "attribute"
                      : u.hasOwnProperty(r)
                        ? "property"
                        : f.hasOwnProperty(r)
                          ? "keyword"
                          : h.hasOwnProperty(r)
                            ? "property"
                            : d.hasOwnProperty(r)
                              ? x
                                ? "string-2"
                                : "property"
                              : v.hasOwnProperty(r)
                                ? "atom"
                                : m.hasOwnProperty(r)
                                  ? "keyword"
                                  : "error"
              }
              return n.context.type
            },
            atComponentBlock: function (e, t, n) {
              return "}" == e
                ? N(e, t, n)
                : "{" == e
                  ? A(n) && M(n, t, y ? "block" : "top", !1)
                  : ("word" == e && (o = "error"), n.context.type)
            },
            atBlock_parens: function (e, t, n) {
              return ")" == e ? A(n) : "{" == e || "}" == e ? N(e, t, n, 2) : H.atBlock(e, t, n)
            },
            restricted_atBlock_before: function (e, t, n) {
              return "{" == e
                ? M(n, t, "restricted_atBlock")
                : "word" == e && "@counter-style" == n.stateArg
                  ? ((o = "variable"), "restricted_atBlock_before")
                  : O(e, t, n)
            },
            restricted_atBlock: function (e, t, n) {
              return "}" == e
                ? ((n.stateArg = null), A(n))
                : "word" == e
                  ? ((o =
                      ("@font-face" == n.stateArg && !p.hasOwnProperty(t.current().toLowerCase())) ||
                      ("@counter-style" == n.stateArg && !g.hasOwnProperty(t.current().toLowerCase()))
                        ? "error"
                        : "property"),
                    "maybeprop")
                  : "restricted_atBlock"
            },
            keyframes: function (e, t, n) {
              return "word" == e ? ((o = "variable"), "keyframes") : "{" == e ? M(n, t, "top") : O(e, t, n)
            },
            at: function (e, t, n) {
              return ";" == e
                ? A(n)
                : "{" == e || "}" == e
                  ? N(e, t, n)
                  : ("word" == e ? (o = "tag") : "hash" == e && (o = "builtin"), "at")
            },
            interpolation: function (e, t, n) {
              return "}" == e
                ? A(n)
                : "{" == e || ";" == e
                  ? N(e, t, n)
                  : ("word" == e ? (o = "variable") : "variable" != e && "(" != e && ")" != e && (o = "error"),
                    "interpolation")
            },
          }
          return {
            startState: function (e) {
              return {
                tokenize: null,
                state: r ? "block" : "top",
                stateArg: null,
                context: new T(r ? "block" : "top", e || 0, null),
              }
            },
            token: function (e, t) {
              if (!t.tokenize && e.eatSpace()) return null
              var n = (t.tokenize || C)(e, t)
              return (
                n && "object" == typeof n && ((i = n[1]), (n = n[0])),
                (o = n),
                "comment" != i && (t.state = H[t.state](i, e, t)),
                o
              )
            },
            indent: function (e, t) {
              var n = e.context,
                r = t && t.charAt(0),
                i = n.indent
              return (
                "prop" != n.type || ("}" != r && ")" != r) || (n = n.prev),
                n.prev &&
                  ("}" != r ||
                  ("block" != n.type && "top" != n.type && "interpolation" != n.type && "restricted_atBlock" != n.type)
                    ? ((")" != r || ("parens" != n.type && "atBlock_parens" != n.type)) &&
                        ("{" != r || ("at" != n.type && "atBlock" != n.type))) ||
                      (i = Math.max(0, n.indent - a))
                    : (i = (n = n.prev).indent)),
                i
              )
            },
            electricChars: "}",
            blockCommentStart: "/*",
            blockCommentEnd: "*/",
            blockCommentContinue: " * ",
            lineComment: b,
            fold: "brace",
          }
        })
        var n = ["domain", "regexp", "url", "url-prefix"],
          r = t(n),
          i = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
          o = t(i),
          a = [
            "width",
            "min-width",
            "max-width",
            "height",
            "min-height",
            "max-height",
            "device-width",
            "min-device-width",
            "max-device-width",
            "device-height",
            "min-device-height",
            "max-device-height",
            "aspect-ratio",
            "min-aspect-ratio",
            "max-aspect-ratio",
            "device-aspect-ratio",
            "min-device-aspect-ratio",
            "max-device-aspect-ratio",
            "color",
            "min-color",
            "max-color",
            "color-index",
            "min-color-index",
            "max-color-index",
            "monochrome",
            "min-monochrome",
            "max-monochrome",
            "resolution",
            "min-resolution",
            "max-resolution",
            "scan",
            "grid",
            "orientation",
            "device-pixel-ratio",
            "min-device-pixel-ratio",
            "max-device-pixel-ratio",
            "pointer",
            "any-pointer",
            "hover",
            "any-hover",
            "prefers-color-scheme",
            "dynamic-range",
            "video-dynamic-range",
          ],
          l = t(a),
          s = [
            "landscape",
            "portrait",
            "none",
            "coarse",
            "fine",
            "on-demand",
            "hover",
            "interlace",
            "progressive",
            "dark",
            "light",
            "standard",
            "high",
          ],
          c = t(s),
          u = [
            "align-content",
            "align-items",
            "align-self",
            "alignment-adjust",
            "alignment-baseline",
            "all",
            "anchor-point",
            "animation",
            "animation-delay",
            "animation-direction",
            "animation-duration",
            "animation-fill-mode",
            "animation-iteration-count",
            "animation-name",
            "animation-play-state",
            "animation-timing-function",
            "appearance",
            "azimuth",
            "backdrop-filter",
            "backface-visibility",
            "background",
            "background-attachment",
            "background-blend-mode",
            "background-clip",
            "background-color",
            "background-image",
            "background-origin",
            "background-position",
            "background-position-x",
            "background-position-y",
            "background-repeat",
            "background-size",
            "baseline-shift",
            "binding",
            "bleed",
            "block-size",
            "bookmark-label",
            "bookmark-level",
            "bookmark-state",
            "bookmark-target",
            "border",
            "border-bottom",
            "border-bottom-color",
            "border-bottom-left-radius",
            "border-bottom-right-radius",
            "border-bottom-style",
            "border-bottom-width",
            "border-collapse",
            "border-color",
            "border-image",
            "border-image-outset",
            "border-image-repeat",
            "border-image-slice",
            "border-image-source",
            "border-image-width",
            "border-left",
            "border-left-color",
            "border-left-style",
            "border-left-width",
            "border-radius",
            "border-right",
            "border-right-color",
            "border-right-style",
            "border-right-width",
            "border-spacing",
            "border-style",
            "border-top",
            "border-top-color",
            "border-top-left-radius",
            "border-top-right-radius",
            "border-top-style",
            "border-top-width",
            "border-width",
            "bottom",
            "box-decoration-break",
            "box-shadow",
            "box-sizing",
            "break-after",
            "break-before",
            "break-inside",
            "caption-side",
            "caret-color",
            "clear",
            "clip",
            "color",
            "color-profile",
            "column-count",
            "column-fill",
            "column-gap",
            "column-rule",
            "column-rule-color",
            "column-rule-style",
            "column-rule-width",
            "column-span",
            "column-width",
            "columns",
            "contain",
            "content",
            "counter-increment",
            "counter-reset",
            "crop",
            "cue",
            "cue-after",
            "cue-before",
            "cursor",
            "direction",
            "display",
            "dominant-baseline",
            "drop-initial-after-adjust",
            "drop-initial-after-align",
            "drop-initial-before-adjust",
            "drop-initial-before-align",
            "drop-initial-size",
            "drop-initial-value",
            "elevation",
            "empty-cells",
            "fit",
            "fit-content",
            "fit-position",
            "flex",
            "flex-basis",
            "flex-direction",
            "flex-flow",
            "flex-grow",
            "flex-shrink",
            "flex-wrap",
            "float",
            "float-offset",
            "flow-from",
            "flow-into",
            "font",
            "font-family",
            "font-feature-settings",
            "font-kerning",
            "font-language-override",
            "font-optical-sizing",
            "font-size",
            "font-size-adjust",
            "font-stretch",
            "font-style",
            "font-synthesis",
            "font-variant",
            "font-variant-alternates",
            "font-variant-caps",
            "font-variant-east-asian",
            "font-variant-ligatures",
            "font-variant-numeric",
            "font-variant-position",
            "font-variation-settings",
            "font-weight",
            "gap",
            "grid",
            "grid-area",
            "grid-auto-columns",
            "grid-auto-flow",
            "grid-auto-rows",
            "grid-column",
            "grid-column-end",
            "grid-column-gap",
            "grid-column-start",
            "grid-gap",
            "grid-row",
            "grid-row-end",
            "grid-row-gap",
            "grid-row-start",
            "grid-template",
            "grid-template-areas",
            "grid-template-columns",
            "grid-template-rows",
            "hanging-punctuation",
            "height",
            "hyphens",
            "icon",
            "image-orientation",
            "image-rendering",
            "image-resolution",
            "inline-box-align",
            "inset",
            "inset-block",
            "inset-block-end",
            "inset-block-start",
            "inset-inline",
            "inset-inline-end",
            "inset-inline-start",
            "isolation",
            "justify-content",
            "justify-items",
            "justify-self",
            "left",
            "letter-spacing",
            "line-break",
            "line-height",
            "line-height-step",
            "line-stacking",
            "line-stacking-ruby",
            "line-stacking-shift",
            "line-stacking-strategy",
            "list-style",
            "list-style-image",
            "list-style-position",
            "list-style-type",
            "margin",
            "margin-bottom",
            "margin-left",
            "margin-right",
            "margin-top",
            "marks",
            "marquee-direction",
            "marquee-loop",
            "marquee-play-count",
            "marquee-speed",
            "marquee-style",
            "mask-clip",
            "mask-composite",
            "mask-image",
            "mask-mode",
            "mask-origin",
            "mask-position",
            "mask-repeat",
            "mask-size",
            "mask-type",
            "max-block-size",
            "max-height",
            "max-inline-size",
            "max-width",
            "min-block-size",
            "min-height",
            "min-inline-size",
            "min-width",
            "mix-blend-mode",
            "move-to",
            "nav-down",
            "nav-index",
            "nav-left",
            "nav-right",
            "nav-up",
            "object-fit",
            "object-position",
            "offset",
            "offset-anchor",
            "offset-distance",
            "offset-path",
            "offset-position",
            "offset-rotate",
            "opacity",
            "order",
            "orphans",
            "outline",
            "outline-color",
            "outline-offset",
            "outline-style",
            "outline-width",
            "overflow",
            "overflow-style",
            "overflow-wrap",
            "overflow-x",
            "overflow-y",
            "padding",
            "padding-bottom",
            "padding-left",
            "padding-right",
            "padding-top",
            "page",
            "page-break-after",
            "page-break-before",
            "page-break-inside",
            "page-policy",
            "pause",
            "pause-after",
            "pause-before",
            "perspective",
            "perspective-origin",
            "pitch",
            "pitch-range",
            "place-content",
            "place-items",
            "place-self",
            "play-during",
            "position",
            "presentation-level",
            "punctuation-trim",
            "quotes",
            "region-break-after",
            "region-break-before",
            "region-break-inside",
            "region-fragment",
            "rendering-intent",
            "resize",
            "rest",
            "rest-after",
            "rest-before",
            "richness",
            "right",
            "rotate",
            "rotation",
            "rotation-point",
            "row-gap",
            "ruby-align",
            "ruby-overhang",
            "ruby-position",
            "ruby-span",
            "scale",
            "scroll-behavior",
            "scroll-margin",
            "scroll-margin-block",
            "scroll-margin-block-end",
            "scroll-margin-block-start",
            "scroll-margin-bottom",
            "scroll-margin-inline",
            "scroll-margin-inline-end",
            "scroll-margin-inline-start",
            "scroll-margin-left",
            "scroll-margin-right",
            "scroll-margin-top",
            "scroll-padding",
            "scroll-padding-block",
            "scroll-padding-block-end",
            "scroll-padding-block-start",
            "scroll-padding-bottom",
            "scroll-padding-inline",
            "scroll-padding-inline-end",
            "scroll-padding-inline-start",
            "scroll-padding-left",
            "scroll-padding-right",
            "scroll-padding-top",
            "scroll-snap-align",
            "scroll-snap-type",
            "shape-image-threshold",
            "shape-inside",
            "shape-margin",
            "shape-outside",
            "size",
            "speak",
            "speak-as",
            "speak-header",
            "speak-numeral",
            "speak-punctuation",
            "speech-rate",
            "stress",
            "string-set",
            "tab-size",
            "table-layout",
            "target",
            "target-name",
            "target-new",
            "target-position",
            "text-align",
            "text-align-last",
            "text-combine-upright",
            "text-decoration",
            "text-decoration-color",
            "text-decoration-line",
            "text-decoration-skip",
            "text-decoration-skip-ink",
            "text-decoration-style",
            "text-emphasis",
            "text-emphasis-color",
            "text-emphasis-position",
            "text-emphasis-style",
            "text-height",
            "text-indent",
            "text-justify",
            "text-orientation",
            "text-outline",
            "text-overflow",
            "text-rendering",
            "text-shadow",
            "text-size-adjust",
            "text-space-collapse",
            "text-transform",
            "text-underline-position",
            "text-wrap",
            "top",
            "touch-action",
            "transform",
            "transform-origin",
            "transform-style",
            "transition",
            "transition-delay",
            "transition-duration",
            "transition-property",
            "transition-timing-function",
            "translate",
            "unicode-bidi",
            "user-select",
            "vertical-align",
            "visibility",
            "voice-balance",
            "voice-duration",
            "voice-family",
            "voice-pitch",
            "voice-range",
            "voice-rate",
            "voice-stress",
            "voice-volume",
            "volume",
            "white-space",
            "widows",
            "width",
            "will-change",
            "word-break",
            "word-spacing",
            "word-wrap",
            "writing-mode",
            "z-index",
            "clip-path",
            "clip-rule",
            "mask",
            "enable-background",
            "filter",
            "flood-color",
            "flood-opacity",
            "lighting-color",
            "stop-color",
            "stop-opacity",
            "pointer-events",
            "color-interpolation",
            "color-interpolation-filters",
            "color-rendering",
            "fill",
            "fill-opacity",
            "fill-rule",
            "image-rendering",
            "marker",
            "marker-end",
            "marker-mid",
            "marker-start",
            "paint-order",
            "shape-rendering",
            "stroke",
            "stroke-dasharray",
            "stroke-dashoffset",
            "stroke-linecap",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke-width",
            "text-rendering",
            "baseline-shift",
            "dominant-baseline",
            "glyph-orientation-horizontal",
            "glyph-orientation-vertical",
            "text-anchor",
            "writing-mode",
          ],
          f = t(u),
          h = [
            "accent-color",
            "aspect-ratio",
            "border-block",
            "border-block-color",
            "border-block-end",
            "border-block-end-color",
            "border-block-end-style",
            "border-block-end-width",
            "border-block-start",
            "border-block-start-color",
            "border-block-start-style",
            "border-block-start-width",
            "border-block-style",
            "border-block-width",
            "border-inline",
            "border-inline-color",
            "border-inline-end",
            "border-inline-end-color",
            "border-inline-end-style",
            "border-inline-end-width",
            "border-inline-start",
            "border-inline-start-color",
            "border-inline-start-style",
            "border-inline-start-width",
            "border-inline-style",
            "border-inline-width",
            "content-visibility",
            "margin-block",
            "margin-block-end",
            "margin-block-start",
            "margin-inline",
            "margin-inline-end",
            "margin-inline-start",
            "overflow-anchor",
            "overscroll-behavior",
            "padding-block",
            "padding-block-end",
            "padding-block-start",
            "padding-inline",
            "padding-inline-end",
            "padding-inline-start",
            "scroll-snap-stop",
            "scrollbar-3d-light-color",
            "scrollbar-arrow-color",
            "scrollbar-base-color",
            "scrollbar-dark-shadow-color",
            "scrollbar-face-color",
            "scrollbar-highlight-color",
            "scrollbar-shadow-color",
            "scrollbar-track-color",
            "searchfield-cancel-button",
            "searchfield-decoration",
            "searchfield-results-button",
            "searchfield-results-decoration",
            "shape-inside",
            "zoom",
          ],
          d = t(h),
          p = t([
            "font-display",
            "font-family",
            "src",
            "unicode-range",
            "font-variant",
            "font-feature-settings",
            "font-stretch",
            "font-weight",
            "font-style",
          ]),
          g = t([
            "additive-symbols",
            "fallback",
            "negative",
            "pad",
            "prefix",
            "range",
            "speak-as",
            "suffix",
            "symbols",
            "system",
          ]),
          m = [
            "aliceblue",
            "antiquewhite",
            "aqua",
            "aquamarine",
            "azure",
            "beige",
            "bisque",
            "black",
            "blanchedalmond",
            "blue",
            "blueviolet",
            "brown",
            "burlywood",
            "cadetblue",
            "chartreuse",
            "chocolate",
            "coral",
            "cornflowerblue",
            "cornsilk",
            "crimson",
            "cyan",
            "darkblue",
            "darkcyan",
            "darkgoldenrod",
            "darkgray",
            "darkgreen",
            "darkgrey",
            "darkkhaki",
            "darkmagenta",
            "darkolivegreen",
            "darkorange",
            "darkorchid",
            "darkred",
            "darksalmon",
            "darkseagreen",
            "darkslateblue",
            "darkslategray",
            "darkslategrey",
            "darkturquoise",
            "darkviolet",
            "deeppink",
            "deepskyblue",
            "dimgray",
            "dimgrey",
            "dodgerblue",
            "firebrick",
            "floralwhite",
            "forestgreen",
            "fuchsia",
            "gainsboro",
            "ghostwhite",
            "gold",
            "goldenrod",
            "gray",
            "grey",
            "green",
            "greenyellow",
            "honeydew",
            "hotpink",
            "indianred",
            "indigo",
            "ivory",
            "khaki",
            "lavender",
            "lavenderblush",
            "lawngreen",
            "lemonchiffon",
            "lightblue",
            "lightcoral",
            "lightcyan",
            "lightgoldenrodyellow",
            "lightgray",
            "lightgreen",
            "lightgrey",
            "lightpink",
            "lightsalmon",
            "lightseagreen",
            "lightskyblue",
            "lightslategray",
            "lightslategrey",
            "lightsteelblue",
            "lightyellow",
            "lime",
            "limegreen",
            "linen",
            "magenta",
            "maroon",
            "mediumaquamarine",
            "mediumblue",
            "mediumorchid",
            "mediumpurple",
            "mediumseagreen",
            "mediumslateblue",
            "mediumspringgreen",
            "mediumturquoise",
            "mediumvioletred",
            "midnightblue",
            "mintcream",
            "mistyrose",
            "moccasin",
            "navajowhite",
            "navy",
            "oldlace",
            "olive",
            "olivedrab",
            "orange",
            "orangered",
            "orchid",
            "palegoldenrod",
            "palegreen",
            "paleturquoise",
            "palevioletred",
            "papayawhip",
            "peachpuff",
            "peru",
            "pink",
            "plum",
            "powderblue",
            "purple",
            "rebeccapurple",
            "red",
            "rosybrown",
            "royalblue",
            "saddlebrown",
            "salmon",
            "sandybrown",
            "seagreen",
            "seashell",
            "sienna",
            "silver",
            "skyblue",
            "slateblue",
            "slategray",
            "slategrey",
            "snow",
            "springgreen",
            "steelblue",
            "tan",
            "teal",
            "thistle",
            "tomato",
            "turquoise",
            "violet",
            "wheat",
            "white",
            "whitesmoke",
            "yellow",
            "yellowgreen",
          ],
          v = t(m),
          y = [
            "above",
            "absolute",
            "activeborder",
            "additive",
            "activecaption",
            "afar",
            "after-white-space",
            "ahead",
            "alias",
            "all",
            "all-scroll",
            "alphabetic",
            "alternate",
            "always",
            "amharic",
            "amharic-abegede",
            "antialiased",
            "appworkspace",
            "arabic-indic",
            "armenian",
            "asterisks",
            "attr",
            "auto",
            "auto-flow",
            "avoid",
            "avoid-column",
            "avoid-page",
            "avoid-region",
            "axis-pan",
            "background",
            "backwards",
            "baseline",
            "below",
            "bidi-override",
            "binary",
            "bengali",
            "blink",
            "block",
            "block-axis",
            "blur",
            "bold",
            "bolder",
            "border",
            "border-box",
            "both",
            "bottom",
            "break",
            "break-all",
            "break-word",
            "brightness",
            "bullets",
            "button",
            "buttonface",
            "buttonhighlight",
            "buttonshadow",
            "buttontext",
            "calc",
            "cambodian",
            "capitalize",
            "caps-lock-indicator",
            "caption",
            "captiontext",
            "caret",
            "cell",
            "center",
            "checkbox",
            "circle",
            "cjk-decimal",
            "cjk-earthly-branch",
            "cjk-heavenly-stem",
            "cjk-ideographic",
            "clear",
            "clip",
            "close-quote",
            "col-resize",
            "collapse",
            "color",
            "color-burn",
            "color-dodge",
            "column",
            "column-reverse",
            "compact",
            "condensed",
            "conic-gradient",
            "contain",
            "content",
            "contents",
            "content-box",
            "context-menu",
            "continuous",
            "contrast",
            "copy",
            "counter",
            "counters",
            "cover",
            "crop",
            "cross",
            "crosshair",
            "cubic-bezier",
            "currentcolor",
            "cursive",
            "cyclic",
            "darken",
            "dashed",
            "decimal",
            "decimal-leading-zero",
            "default",
            "default-button",
            "dense",
            "destination-atop",
            "destination-in",
            "destination-out",
            "destination-over",
            "devanagari",
            "difference",
            "disc",
            "discard",
            "disclosure-closed",
            "disclosure-open",
            "document",
            "dot-dash",
            "dot-dot-dash",
            "dotted",
            "double",
            "down",
            "drop-shadow",
            "e-resize",
            "ease",
            "ease-in",
            "ease-in-out",
            "ease-out",
            "element",
            "ellipse",
            "ellipsis",
            "embed",
            "end",
            "ethiopic",
            "ethiopic-abegede",
            "ethiopic-abegede-am-et",
            "ethiopic-abegede-gez",
            "ethiopic-abegede-ti-er",
            "ethiopic-abegede-ti-et",
            "ethiopic-halehame-aa-er",
            "ethiopic-halehame-aa-et",
            "ethiopic-halehame-am-et",
            "ethiopic-halehame-gez",
            "ethiopic-halehame-om-et",
            "ethiopic-halehame-sid-et",
            "ethiopic-halehame-so-et",
            "ethiopic-halehame-ti-er",
            "ethiopic-halehame-ti-et",
            "ethiopic-halehame-tig",
            "ethiopic-numeric",
            "ew-resize",
            "exclusion",
            "expanded",
            "extends",
            "extra-condensed",
            "extra-expanded",
            "fantasy",
            "fast",
            "fill",
            "fill-box",
            "fixed",
            "flat",
            "flex",
            "flex-end",
            "flex-start",
            "footnotes",
            "forwards",
            "from",
            "geometricPrecision",
            "georgian",
            "grayscale",
            "graytext",
            "grid",
            "groove",
            "gujarati",
            "gurmukhi",
            "hand",
            "hangul",
            "hangul-consonant",
            "hard-light",
            "hebrew",
            "help",
            "hidden",
            "hide",
            "higher",
            "highlight",
            "highlighttext",
            "hiragana",
            "hiragana-iroha",
            "horizontal",
            "hsl",
            "hsla",
            "hue",
            "hue-rotate",
            "icon",
            "ignore",
            "inactiveborder",
            "inactivecaption",
            "inactivecaptiontext",
            "infinite",
            "infobackground",
            "infotext",
            "inherit",
            "initial",
            "inline",
            "inline-axis",
            "inline-block",
            "inline-flex",
            "inline-grid",
            "inline-table",
            "inset",
            "inside",
            "intrinsic",
            "invert",
            "italic",
            "japanese-formal",
            "japanese-informal",
            "justify",
            "kannada",
            "katakana",
            "katakana-iroha",
            "keep-all",
            "khmer",
            "korean-hangul-formal",
            "korean-hanja-formal",
            "korean-hanja-informal",
            "landscape",
            "lao",
            "large",
            "larger",
            "left",
            "level",
            "lighter",
            "lighten",
            "line-through",
            "linear",
            "linear-gradient",
            "lines",
            "list-item",
            "listbox",
            "listitem",
            "local",
            "logical",
            "loud",
            "lower",
            "lower-alpha",
            "lower-armenian",
            "lower-greek",
            "lower-hexadecimal",
            "lower-latin",
            "lower-norwegian",
            "lower-roman",
            "lowercase",
            "ltr",
            "luminosity",
            "malayalam",
            "manipulation",
            "match",
            "matrix",
            "matrix3d",
            "media-play-button",
            "media-slider",
            "media-sliderthumb",
            "media-volume-slider",
            "media-volume-sliderthumb",
            "medium",
            "menu",
            "menulist",
            "menulist-button",
            "menutext",
            "message-box",
            "middle",
            "min-intrinsic",
            "mix",
            "mongolian",
            "monospace",
            "move",
            "multiple",
            "multiple_mask_images",
            "multiply",
            "myanmar",
            "n-resize",
            "narrower",
            "ne-resize",
            "nesw-resize",
            "no-close-quote",
            "no-drop",
            "no-open-quote",
            "no-repeat",
            "none",
            "normal",
            "not-allowed",
            "nowrap",
            "ns-resize",
            "numbers",
            "numeric",
            "nw-resize",
            "nwse-resize",
            "oblique",
            "octal",
            "opacity",
            "open-quote",
            "optimizeLegibility",
            "optimizeSpeed",
            "oriya",
            "oromo",
            "outset",
            "outside",
            "outside-shape",
            "overlay",
            "overline",
            "padding",
            "padding-box",
            "painted",
            "page",
            "paused",
            "persian",
            "perspective",
            "pinch-zoom",
            "plus-darker",
            "plus-lighter",
            "pointer",
            "polygon",
            "portrait",
            "pre",
            "pre-line",
            "pre-wrap",
            "preserve-3d",
            "progress",
            "push-button",
            "radial-gradient",
            "radio",
            "read-only",
            "read-write",
            "read-write-plaintext-only",
            "rectangle",
            "region",
            "relative",
            "repeat",
            "repeating-linear-gradient",
            "repeating-radial-gradient",
            "repeating-conic-gradient",
            "repeat-x",
            "repeat-y",
            "reset",
            "reverse",
            "rgb",
            "rgba",
            "ridge",
            "right",
            "rotate",
            "rotate3d",
            "rotateX",
            "rotateY",
            "rotateZ",
            "round",
            "row",
            "row-resize",
            "row-reverse",
            "rtl",
            "run-in",
            "running",
            "s-resize",
            "sans-serif",
            "saturate",
            "saturation",
            "scale",
            "scale3d",
            "scaleX",
            "scaleY",
            "scaleZ",
            "screen",
            "scroll",
            "scrollbar",
            "scroll-position",
            "se-resize",
            "searchfield",
            "searchfield-cancel-button",
            "searchfield-decoration",
            "searchfield-results-button",
            "searchfield-results-decoration",
            "self-start",
            "self-end",
            "semi-condensed",
            "semi-expanded",
            "separate",
            "sepia",
            "serif",
            "show",
            "sidama",
            "simp-chinese-formal",
            "simp-chinese-informal",
            "single",
            "skew",
            "skewX",
            "skewY",
            "skip-white-space",
            "slide",
            "slider-horizontal",
            "slider-vertical",
            "sliderthumb-horizontal",
            "sliderthumb-vertical",
            "slow",
            "small",
            "small-caps",
            "small-caption",
            "smaller",
            "soft-light",
            "solid",
            "somali",
            "source-atop",
            "source-in",
            "source-out",
            "source-over",
            "space",
            "space-around",
            "space-between",
            "space-evenly",
            "spell-out",
            "square",
            "square-button",
            "start",
            "static",
            "status-bar",
            "stretch",
            "stroke",
            "stroke-box",
            "sub",
            "subpixel-antialiased",
            "svg_masks",
            "super",
            "sw-resize",
            "symbolic",
            "symbols",
            "system-ui",
            "table",
            "table-caption",
            "table-cell",
            "table-column",
            "table-column-group",
            "table-footer-group",
            "table-header-group",
            "table-row",
            "table-row-group",
            "tamil",
            "telugu",
            "text",
            "text-bottom",
            "text-top",
            "textarea",
            "textfield",
            "thai",
            "thick",
            "thin",
            "threeddarkshadow",
            "threedface",
            "threedhighlight",
            "threedlightshadow",
            "threedshadow",
            "tibetan",
            "tigre",
            "tigrinya-er",
            "tigrinya-er-abegede",
            "tigrinya-et",
            "tigrinya-et-abegede",
            "to",
            "top",
            "trad-chinese-formal",
            "trad-chinese-informal",
            "transform",
            "translate",
            "translate3d",
            "translateX",
            "translateY",
            "translateZ",
            "transparent",
            "ultra-condensed",
            "ultra-expanded",
            "underline",
            "unidirectional-pan",
            "unset",
            "up",
            "upper-alpha",
            "upper-armenian",
            "upper-greek",
            "upper-hexadecimal",
            "upper-latin",
            "upper-norwegian",
            "upper-roman",
            "uppercase",
            "urdu",
            "url",
            "var",
            "vertical",
            "vertical-text",
            "view-box",
            "visible",
            "visibleFill",
            "visiblePainted",
            "visibleStroke",
            "visual",
            "w-resize",
            "wait",
            "wave",
            "wider",
            "window",
            "windowframe",
            "windowtext",
            "words",
            "wrap",
            "wrap-reverse",
            "x-large",
            "x-small",
            "xor",
            "xx-large",
            "xx-small",
          ],
          b = t(y),
          w = n.concat(i).concat(a).concat(s).concat(u).concat(h).concat(m).concat(y)
        function x(e, t) {
          for (var n, r = !1; null != (n = e.next()); ) {
            if (r && "/" == n) {
              t.tokenize = null
              break
            }
            r = "*" == n
          }
          return ["comment", "comment"]
        }
        e.registerHelper("hintWords", "css", w),
          e.defineMIME("text/css", {
            documentTypes: r,
            mediaTypes: o,
            mediaFeatures: l,
            mediaValueKeywords: c,
            propertyKeywords: f,
            nonStandardPropertyKeywords: d,
            fontProperties: p,
            counterDescriptors: g,
            colorKeywords: v,
            valueKeywords: b,
            tokenHooks: {
              "/": function (e, t) {
                return !!e.eat("*") && ((t.tokenize = x), x(e, t))
              },
            },
            name: "css",
          }),
          e.defineMIME("text/x-scss", {
            mediaTypes: o,
            mediaFeatures: l,
            mediaValueKeywords: c,
            propertyKeywords: f,
            nonStandardPropertyKeywords: d,
            colorKeywords: v,
            valueKeywords: b,
            fontProperties: p,
            allowNested: !0,
            lineComment: "//",
            tokenHooks: {
              "/": function (e, t) {
                return e.eat("/")
                  ? (e.skipToEnd(), ["comment", "comment"])
                  : e.eat("*")
                    ? ((t.tokenize = x), x(e, t))
                    : ["operator", "operator"]
              },
              ":": function (e) {
                return !!e.match(/^\s*\{/, !1) && [null, null]
              },
              $: function (e) {
                return (
                  e.match(/^[\w-]+/),
                  e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"]
                )
              },
              "#": function (e) {
                return !!e.eat("{") && [null, "interpolation"]
              },
            },
            name: "css",
            helperType: "scss",
          }),
          e.defineMIME("text/x-less", {
            mediaTypes: o,
            mediaFeatures: l,
            mediaValueKeywords: c,
            propertyKeywords: f,
            nonStandardPropertyKeywords: d,
            colorKeywords: v,
            valueKeywords: b,
            fontProperties: p,
            allowNested: !0,
            lineComment: "//",
            tokenHooks: {
              "/": function (e, t) {
                return e.eat("/")
                  ? (e.skipToEnd(), ["comment", "comment"])
                  : e.eat("*")
                    ? ((t.tokenize = x), x(e, t))
                    : ["operator", "operator"]
              },
              "@": function (e) {
                return e.eat("{")
                  ? [null, "interpolation"]
                  : !e.match(
                      /^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i,
                      !1
                    ) &&
                      (e.eatWhile(/[\w\\\-]/),
                      e.match(/^\s*:/, !1) ? ["variable-2", "variable-definition"] : ["variable-2", "variable"])
              },
              "&": function () {
                return ["atom", "atom"]
              },
            },
            name: "css",
            helperType: "less",
          }),
          e.defineMIME("text/x-gss", {
            documentTypes: r,
            mediaTypes: o,
            mediaFeatures: l,
            propertyKeywords: f,
            nonStandardPropertyKeywords: d,
            fontProperties: p,
            counterDescriptors: g,
            colorKeywords: v,
            valueKeywords: b,
            supportsAtComponent: !0,
            tokenHooks: {
              "/": function (e, t) {
                return !!e.eat("*") && ((t.tokenize = x), x(e, t))
              },
            },
            name: "css",
            helperType: "gss",
          })
      })(n(5237))
    },
    2520: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t = {
          script: [
            ["lang", /(javascript|babel)/i, "javascript"],
            ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
            ["type", /./, "text/plain"],
            [null, null, "javascript"],
          ],
          style: [
            ["lang", /^css$/i, "css"],
            ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
            ["type", /./, "text/plain"],
            [null, null, "css"],
          ],
        }
        function n(e, t, n) {
          var r = e.current(),
            i = r.search(t)
          return (
            i > -1 ? e.backUp(r.length - i) : r.match(/<\/?$/) && (e.backUp(r.length), e.match(t, !1) || e.match(r)), n
          )
        }
        var r = {}
        function i(e) {
          var t = r[e]
          return t || (r[e] = new RegExp("\\s+" + e + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*"))
        }
        function o(e, t) {
          var n = e.match(i(t))
          return n ? /^\s*(.*?)\s*$/.exec(n[2])[1] : ""
        }
        function a(e, t) {
          return new RegExp((t ? "^" : "") + "</\\s*" + e + "\\s*>", "i")
        }
        function l(e, t) {
          for (var n in e) for (var r = t[n] || (t[n] = []), i = e[n], o = i.length - 1; o >= 0; o--) r.unshift(i[o])
        }
        function s(e, t) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n]
            if (!r[0] || r[1].test(o(t, r[0]))) return r[2]
          }
        }
        e.defineMode(
          "htmlmixed",
          function (r, i) {
            var o = e.getMode(r, {
                name: "xml",
                htmlMode: !0,
                multilineTagIndentFactor: i.multilineTagIndentFactor,
                multilineTagIndentPastTag: i.multilineTagIndentPastTag,
                allowMissingTagName: i.allowMissingTagName,
              }),
              c = {},
              u = i && i.tags,
              f = i && i.scriptTypes
            if ((l(t, c), u && l(u, c), f))
              for (var h = f.length - 1; h >= 0; h--) c.script.unshift(["type", f[h].matches, f[h].mode])
            function d(t, i) {
              var l,
                u = o.token(t, i.htmlState),
                f = /\btag\b/.test(u)
              if (
                f &&
                !/[<>\s\/]/.test(t.current()) &&
                (l = i.htmlState.tagName && i.htmlState.tagName.toLowerCase()) &&
                c.hasOwnProperty(l)
              )
                i.inTag = l + " "
              else if (i.inTag && f && />$/.test(t.current())) {
                var h = /^([\S]+) (.*)/.exec(i.inTag)
                i.inTag = null
                var p = ">" == t.current() && s(c[h[1]], h[2]),
                  g = e.getMode(r, p),
                  m = a(h[1], !0),
                  v = a(h[1], !1)
                ;(i.token = function (e, t) {
                  return e.match(m, !1)
                    ? ((t.token = d), (t.localState = t.localMode = null), null)
                    : n(e, v, t.localMode.token(e, t.localState))
                }),
                  (i.localMode = g),
                  (i.localState = e.startState(g, o.indent(i.htmlState, "", "")))
              } else i.inTag && ((i.inTag += t.current()), t.eol() && (i.inTag += " "))
              return u
            }
            return {
              startState: function () {
                return { token: d, inTag: null, localMode: null, localState: null, htmlState: e.startState(o) }
              },
              copyState: function (t) {
                var n
                return (
                  t.localState && (n = e.copyState(t.localMode, t.localState)),
                  {
                    token: t.token,
                    inTag: t.inTag,
                    localMode: t.localMode,
                    localState: n,
                    htmlState: e.copyState(o, t.htmlState),
                  }
                )
              },
              token: function (e, t) {
                return t.token(e, t)
              },
              indent: function (t, n, r) {
                return !t.localMode || /^\s*<\//.test(n)
                  ? o.indent(t.htmlState, n, r)
                  : t.localMode.indent
                    ? t.localMode.indent(t.localState, n, r)
                    : e.Pass
              },
              innerMode: function (e) {
                return { state: e.localState || e.htmlState, mode: e.localMode || o }
              },
            }
          },
          "xml",
          "javascript",
          "css"
        ),
          e.defineMIME("text/html", "htmlmixed")
      })(n(5237), n(576), n(6792), n(8656))
    },
    6792: (e, t, n) => {
      !(function (e) {
        "use strict"
        e.defineMode("javascript", function (t, n) {
          var r,
            i,
            o = t.indentUnit,
            a = n.statementIndent,
            l = n.jsonld,
            s = n.json || l,
            c = !1 !== n.trackScope,
            u = n.typescript,
            f = n.wordCharacters || /[\w$\xa1-\uffff]/,
            h = (function () {
              function e(e) {
                return { type: e, style: "keyword" }
              }
              var t = e("keyword a"),
                n = e("keyword b"),
                r = e("keyword c"),
                i = e("keyword d"),
                o = e("operator"),
                a = { type: "atom", style: "atom" }
              return {
                if: e("if"),
                while: t,
                with: t,
                else: n,
                do: n,
                try: n,
                finally: n,
                return: i,
                break: i,
                continue: i,
                new: e("new"),
                delete: r,
                void: r,
                throw: r,
                debugger: e("debugger"),
                var: e("var"),
                const: e("var"),
                let: e("var"),
                function: e("function"),
                catch: e("catch"),
                for: e("for"),
                switch: e("switch"),
                case: e("case"),
                default: e("default"),
                in: o,
                typeof: o,
                instanceof: o,
                true: a,
                false: a,
                null: a,
                undefined: a,
                NaN: a,
                Infinity: a,
                this: e("this"),
                class: e("class"),
                super: e("atom"),
                yield: r,
                export: e("export"),
                import: e("import"),
                extends: r,
                await: r,
              }
            })(),
            d = /[+\-*&%=<>!?|~^@]/,
            p = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/
          function g(e) {
            for (var t, n = !1, r = !1; null != (t = e.next()); ) {
              if (!n) {
                if ("/" == t && !r) return
                "[" == t ? (r = !0) : r && "]" == t && (r = !1)
              }
              n = !n && "\\" == t
            }
          }
          function m(e, t, n) {
            return (r = e), (i = n), t
          }
          function v(e, t) {
            var n = e.next()
            if ('"' == n || "'" == n) return (t.tokenize = y(n)), t.tokenize(e, t)
            if ("." == n && e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) return m("number", "number")
            if ("." == n && e.match("..")) return m("spread", "meta")
            if (/[\[\]{}\(\),;\:\.]/.test(n)) return m(n)
            if ("=" == n && e.eat(">")) return m("=>", "operator")
            if ("0" == n && e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) return m("number", "number")
            if (/\d/.test(n)) return e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/), m("number", "number")
            if ("/" == n)
              return e.eat("*")
                ? ((t.tokenize = b), b(e, t))
                : e.eat("/")
                  ? (e.skipToEnd(), m("comment", "comment"))
                  : it(e, t, 1)
                    ? (g(e), e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/), m("regexp", "string-2"))
                    : (e.eat("="), m("operator", "operator", e.current()))
            if ("`" == n) return (t.tokenize = w), w(e, t)
            if ("#" == n && "!" == e.peek()) return e.skipToEnd(), m("meta", "meta")
            if ("#" == n && e.eatWhile(f)) return m("variable", "property")
            if (("<" == n && e.match("!--")) || ("-" == n && e.match("->") && !/\S/.test(e.string.slice(0, e.start))))
              return e.skipToEnd(), m("comment", "comment")
            if (d.test(n))
              return (
                (">" == n && t.lexical && ">" == t.lexical.type) ||
                  (e.eat("=")
                    ? ("!" != n && "=" != n) || e.eat("=")
                    : /[<>*+\-|&?]/.test(n) && (e.eat(n), ">" == n && e.eat(n))),
                "?" == n && e.eat(".") ? m(".") : m("operator", "operator", e.current())
              )
            if (f.test(n)) {
              e.eatWhile(f)
              var r = e.current()
              if ("." != t.lastType) {
                if (h.propertyIsEnumerable(r)) {
                  var i = h[r]
                  return m(i.type, i.style, r)
                }
                if ("async" == r && e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, !1))
                  return m("async", "keyword", r)
              }
              return m("variable", "variable", r)
            }
          }
          function y(e) {
            return function (t, n) {
              var r,
                i = !1
              if (l && "@" == t.peek() && t.match(p)) return (n.tokenize = v), m("jsonld-keyword", "meta")
              for (; null != (r = t.next()) && (r != e || i); ) i = !i && "\\" == r
              return i || (n.tokenize = v), m("string", "string")
            }
          }
          function b(e, t) {
            for (var n, r = !1; (n = e.next()); ) {
              if ("/" == n && r) {
                t.tokenize = v
                break
              }
              r = "*" == n
            }
            return m("comment", "comment")
          }
          function w(e, t) {
            for (var n, r = !1; null != (n = e.next()); ) {
              if (!r && ("`" == n || ("$" == n && e.eat("{")))) {
                t.tokenize = v
                break
              }
              r = !r && "\\" == n
            }
            return m("quasi", "string-2", e.current())
          }
          var x = "([{}])"
          function k(e, t) {
            t.fatArrowAt && (t.fatArrowAt = null)
            var n = e.string.indexOf("=>", e.start)
            if (!(n < 0)) {
              if (u) {
                var r = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start, n))
                r && (n = r.index)
              }
              for (var i = 0, o = !1, a = n - 1; a >= 0; --a) {
                var l = e.string.charAt(a),
                  s = x.indexOf(l)
                if (s >= 0 && s < 3) {
                  if (!i) {
                    ++a
                    break
                  }
                  if (0 == --i) {
                    "(" == l && (o = !0)
                    break
                  }
                } else if (s >= 3 && s < 6) ++i
                else if (f.test(l)) o = !0
                else if (/["'\/`]/.test(l))
                  for (; ; --a) {
                    if (0 == a) return
                    if (e.string.charAt(a - 1) == l && "\\" != e.string.charAt(a - 2)) {
                      a--
                      break
                    }
                  }
                else if (o && !i) {
                  ++a
                  break
                }
              }
              o && !i && (t.fatArrowAt = a)
            }
          }
          var C = {
            atom: !0,
            number: !0,
            variable: !0,
            string: !0,
            regexp: !0,
            this: !0,
            import: !0,
            "jsonld-keyword": !0,
          }
          function S(e, t, n, r, i, o) {
            ;(this.indented = e),
              (this.column = t),
              (this.type = n),
              (this.prev = i),
              (this.info = o),
              null != r && (this.align = r)
          }
          function L(e, t) {
            if (!c) return !1
            for (var n = e.localVars; n; n = n.next) if (n.name == t) return !0
            for (var r = e.context; r; r = r.prev) for (n = r.vars; n; n = n.next) if (n.name == t) return !0
          }
          function T(e, t, n, r, i) {
            var o = e.cc
            for (
              M.state = e,
                M.stream = i,
                M.marked = null,
                M.cc = o,
                M.style = t,
                e.lexical.hasOwnProperty("align") || (e.lexical.align = !0);
              ;

            )
              if ((o.length ? o.pop() : s ? G : U)(n, r)) {
                for (; o.length && o[o.length - 1].lex; ) o.pop()()
                return M.marked ? M.marked : "variable" == n && L(e, r) ? "variable-2" : t
              }
          }
          var M = { state: null, column: null, marked: null, cc: null }
          function A() {
            for (var e = arguments.length - 1; e >= 0; e--) M.cc.push(arguments[e])
          }
          function O() {
            return A.apply(null, arguments), !0
          }
          function N(e, t) {
            for (var n = t; n; n = n.next) if (n.name == e) return !0
            return !1
          }
          function P(e) {
            var t = M.state
            if (((M.marked = "def"), c)) {
              if (t.context)
                if ("var" == t.lexical.info && t.context && t.context.block) {
                  var r = H(e, t.context)
                  if (null != r) return void (t.context = r)
                } else if (!N(e, t.localVars)) return void (t.localVars = new W(e, t.localVars))
              n.globalVars && !N(e, t.globalVars) && (t.globalVars = new W(e, t.globalVars))
            }
          }
          function H(e, t) {
            if (t) {
              if (t.block) {
                var n = H(e, t.prev)
                return n ? (n == t.prev ? t : new D(n, t.vars, !0)) : null
              }
              return N(e, t.vars) ? t : new D(t.prev, new W(e, t.vars), !1)
            }
            return null
          }
          function F(e) {
            return "public" == e || "private" == e || "protected" == e || "abstract" == e || "readonly" == e
          }
          function D(e, t, n) {
            ;(this.prev = e), (this.vars = t), (this.block = n)
          }
          function W(e, t) {
            ;(this.name = e), (this.next = t)
          }
          var E = new W("this", new W("arguments", null))
          function z() {
            ;(M.state.context = new D(M.state.context, M.state.localVars, !1)), (M.state.localVars = E)
          }
          function I() {
            ;(M.state.context = new D(M.state.context, M.state.localVars, !0)), (M.state.localVars = null)
          }
          function B() {
            ;(M.state.localVars = M.state.context.vars), (M.state.context = M.state.context.prev)
          }
          function R(e, t) {
            var n = function () {
              var n = M.state,
                r = n.indented
              if ("stat" == n.lexical.type) r = n.lexical.indented
              else for (var i = n.lexical; i && ")" == i.type && i.align; i = i.prev) r = i.indented
              n.lexical = new S(r, M.stream.column(), e, null, n.lexical, t)
            }
            return (n.lex = !0), n
          }
          function K() {
            var e = M.state
            e.lexical.prev && (")" == e.lexical.type && (e.indented = e.lexical.indented), (e.lexical = e.lexical.prev))
          }
          function j(e) {
            function t(n) {
              return n == e ? O() : ";" == e || "}" == n || ")" == n || "]" == n ? A() : O(t)
            }
            return t
          }
          function U(e, t) {
            return "var" == e
              ? O(R("vardef", t), Ae, j(";"), K)
              : "keyword a" == e
                ? O(R("form"), q, U, K)
                : "keyword b" == e
                  ? O(R("form"), U, K)
                  : "keyword d" == e
                    ? M.stream.match(/^\s*$/, !1)
                      ? O()
                      : O(R("stat"), X, j(";"), K)
                    : "debugger" == e
                      ? O(j(";"))
                      : "{" == e
                        ? O(R("}"), I, he, K, B)
                        : ";" == e
                          ? O()
                          : "if" == e
                            ? ("else" == M.state.lexical.info &&
                                M.state.cc[M.state.cc.length - 1] == K &&
                                M.state.cc.pop()(),
                              O(R("form"), q, U, K, De))
                            : "function" == e
                              ? O(Ie)
                              : "for" == e
                                ? O(R("form"), I, We, U, B, K)
                                : "class" == e || (u && "interface" == t)
                                  ? ((M.marked = "keyword"), O(R("form", "class" == e ? e : t), Ue, K))
                                  : "variable" == e
                                    ? u && "declare" == t
                                      ? ((M.marked = "keyword"), O(U))
                                      : u &&
                                          ("module" == t || "enum" == t || "type" == t) &&
                                          M.stream.match(/^\s*\w/, !1)
                                        ? ((M.marked = "keyword"),
                                          "enum" == t
                                            ? O(tt)
                                            : "type" == t
                                              ? O(Re, j("operator"), ve, j(";"))
                                              : O(R("form"), Oe, j("{"), R("}"), he, K, K))
                                        : u && "namespace" == t
                                          ? ((M.marked = "keyword"), O(R("form"), G, U, K))
                                          : u && "abstract" == t
                                            ? ((M.marked = "keyword"), O(U))
                                            : O(R("stat"), oe)
                                    : "switch" == e
                                      ? O(R("form"), q, j("{"), R("}", "switch"), I, he, K, K, B)
                                      : "case" == e
                                        ? O(G, j(":"))
                                        : "default" == e
                                          ? O(j(":"))
                                          : "catch" == e
                                            ? O(R("form"), z, V, U, K, B)
                                            : "export" == e
                                              ? O(R("stat"), qe, K)
                                              : "import" == e
                                                ? O(R("stat"), Xe, K)
                                                : "async" == e
                                                  ? O(U)
                                                  : "@" == t
                                                    ? O(G, U)
                                                    : A(R("stat"), G, j(";"), K)
          }
          function V(e) {
            if ("(" == e) return O(Ke, j(")"))
          }
          function G(e, t) {
            return $(e, t, !1)
          }
          function _(e, t) {
            return $(e, t, !0)
          }
          function q(e) {
            return "(" != e ? A() : O(R(")"), X, j(")"), K)
          }
          function $(e, t, n) {
            if (M.state.fatArrowAt == M.stream.start) {
              var r = n ? te : ee
              if ("(" == e) return O(z, R(")"), ue(Ke, ")"), K, j("=>"), r, B)
              if ("variable" == e) return A(z, Oe, j("=>"), r, B)
            }
            var i = n ? Z : Y
            return C.hasOwnProperty(e)
              ? O(i)
              : "function" == e
                ? O(Ie, i)
                : "class" == e || (u && "interface" == t)
                  ? ((M.marked = "keyword"), O(R("form"), je, K))
                  : "keyword c" == e || "async" == e
                    ? O(n ? _ : G)
                    : "(" == e
                      ? O(R(")"), X, j(")"), K, i)
                      : "operator" == e || "spread" == e
                        ? O(n ? _ : G)
                        : "[" == e
                          ? O(R("]"), et, K, i)
                          : "{" == e
                            ? fe(le, "}", null, i)
                            : "quasi" == e
                              ? A(Q, i)
                              : "new" == e
                                ? O(ne(n))
                                : O()
          }
          function X(e) {
            return e.match(/[;\}\)\],]/) ? A() : A(G)
          }
          function Y(e, t) {
            return "," == e ? O(X) : Z(e, t, !1)
          }
          function Z(e, t, n) {
            var r = 0 == n ? Y : Z,
              i = 0 == n ? G : _
            return "=>" == e
              ? O(z, n ? te : ee, B)
              : "operator" == e
                ? /\+\+|--/.test(t) || (u && "!" == t)
                  ? O(r)
                  : u && "<" == t && M.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, !1)
                    ? O(R(">"), ue(ve, ">"), K, r)
                    : "?" == t
                      ? O(G, j(":"), i)
                      : O(i)
                : "quasi" == e
                  ? A(Q, r)
                  : ";" != e
                    ? "(" == e
                      ? fe(_, ")", "call", r)
                      : "." == e
                        ? O(ae, r)
                        : "[" == e
                          ? O(R("]"), X, j("]"), K, r)
                          : u && "as" == t
                            ? ((M.marked = "keyword"), O(ve, r))
                            : "regexp" == e
                              ? ((M.state.lastType = M.marked = "operator"),
                                M.stream.backUp(M.stream.pos - M.stream.start - 1),
                                O(i))
                              : void 0
                    : void 0
          }
          function Q(e, t) {
            return "quasi" != e ? A() : "${" != t.slice(t.length - 2) ? O(Q) : O(X, J)
          }
          function J(e) {
            if ("}" == e) return (M.marked = "string-2"), (M.state.tokenize = w), O(Q)
          }
          function ee(e) {
            return k(M.stream, M.state), A("{" == e ? U : G)
          }
          function te(e) {
            return k(M.stream, M.state), A("{" == e ? U : _)
          }
          function ne(e) {
            return function (t) {
              return "." == t ? O(e ? ie : re) : "variable" == t && u ? O(Le, e ? Z : Y) : A(e ? _ : G)
            }
          }
          function re(e, t) {
            if ("target" == t) return (M.marked = "keyword"), O(Y)
          }
          function ie(e, t) {
            if ("target" == t) return (M.marked = "keyword"), O(Z)
          }
          function oe(e) {
            return ":" == e ? O(K, U) : A(Y, j(";"), K)
          }
          function ae(e) {
            if ("variable" == e) return (M.marked = "property"), O()
          }
          function le(e, t) {
            return "async" == e
              ? ((M.marked = "property"), O(le))
              : "variable" == e || "keyword" == M.style
                ? ((M.marked = "property"),
                  "get" == t || "set" == t
                    ? O(se)
                    : (u &&
                        M.state.fatArrowAt == M.stream.start &&
                        (n = M.stream.match(/^\s*:\s*/, !1)) &&
                        (M.state.fatArrowAt = M.stream.pos + n[0].length),
                      O(ce)))
                : "number" == e || "string" == e
                  ? ((M.marked = l ? "property" : M.style + " property"), O(ce))
                  : "jsonld-keyword" == e
                    ? O(ce)
                    : u && F(t)
                      ? ((M.marked = "keyword"), O(le))
                      : "[" == e
                        ? O(G, de, j("]"), ce)
                        : "spread" == e
                          ? O(_, ce)
                          : "*" == t
                            ? ((M.marked = "keyword"), O(le))
                            : ":" == e
                              ? A(ce)
                              : void 0
            var n
          }
          function se(e) {
            return "variable" != e ? A(ce) : ((M.marked = "property"), O(Ie))
          }
          function ce(e) {
            return ":" == e ? O(_) : "(" == e ? A(Ie) : void 0
          }
          function ue(e, t, n) {
            function r(i, o) {
              if (n ? n.indexOf(i) > -1 : "," == i) {
                var a = M.state.lexical
                return (
                  "call" == a.info && (a.pos = (a.pos || 0) + 1),
                  O(function (n, r) {
                    return n == t || r == t ? A() : A(e)
                  }, r)
                )
              }
              return i == t || o == t ? O() : n && n.indexOf(";") > -1 ? A(e) : O(j(t))
            }
            return function (n, i) {
              return n == t || i == t ? O() : A(e, r)
            }
          }
          function fe(e, t, n) {
            for (var r = 3; r < arguments.length; r++) M.cc.push(arguments[r])
            return O(R(t, n), ue(e, t), K)
          }
          function he(e) {
            return "}" == e ? O() : A(U, he)
          }
          function de(e, t) {
            if (u) {
              if (":" == e) return O(ve)
              if ("?" == t) return O(de)
            }
          }
          function pe(e, t) {
            if (u && (":" == e || "in" == t)) return O(ve)
          }
          function ge(e) {
            if (u && ":" == e) return M.stream.match(/^\s*\w+\s+is\b/, !1) ? O(G, me, ve) : O(ve)
          }
          function me(e, t) {
            if ("is" == t) return (M.marked = "keyword"), O()
          }
          function ve(e, t) {
            return "keyof" == t || "typeof" == t || "infer" == t || "readonly" == t
              ? ((M.marked = "keyword"), O("typeof" == t ? _ : ve))
              : "variable" == e || "void" == t
                ? ((M.marked = "type"), O(Se))
                : "|" == t || "&" == t
                  ? O(ve)
                  : "string" == e || "number" == e || "atom" == e
                    ? O(Se)
                    : "[" == e
                      ? O(R("]"), ue(ve, "]", ","), K, Se)
                      : "{" == e
                        ? O(R("}"), be, K, Se)
                        : "(" == e
                          ? O(ue(Ce, ")"), ye, Se)
                          : "<" == e
                            ? O(ue(ve, ">"), ve)
                            : "quasi" == e
                              ? A(xe, Se)
                              : void 0
          }
          function ye(e) {
            if ("=>" == e) return O(ve)
          }
          function be(e) {
            return e.match(/[\}\)\]]/) ? O() : "," == e || ";" == e ? O(be) : A(we, be)
          }
          function we(e, t) {
            return "variable" == e || "keyword" == M.style
              ? ((M.marked = "property"), O(we))
              : "?" == t || "number" == e || "string" == e
                ? O(we)
                : ":" == e
                  ? O(ve)
                  : "[" == e
                    ? O(j("variable"), pe, j("]"), we)
                    : "(" == e
                      ? A(Be, we)
                      : e.match(/[;\}\)\],]/)
                        ? void 0
                        : O()
          }
          function xe(e, t) {
            return "quasi" != e ? A() : "${" != t.slice(t.length - 2) ? O(xe) : O(ve, ke)
          }
          function ke(e) {
            if ("}" == e) return (M.marked = "string-2"), (M.state.tokenize = w), O(xe)
          }
          function Ce(e, t) {
            return ("variable" == e && M.stream.match(/^\s*[?:]/, !1)) || "?" == t
              ? O(Ce)
              : ":" == e
                ? O(ve)
                : "spread" == e
                  ? O(Ce)
                  : A(ve)
          }
          function Se(e, t) {
            return "<" == t
              ? O(R(">"), ue(ve, ">"), K, Se)
              : "|" == t || "." == e || "&" == t
                ? O(ve)
                : "[" == e
                  ? O(ve, j("]"), Se)
                  : "extends" == t || "implements" == t
                    ? ((M.marked = "keyword"), O(ve))
                    : "?" == t
                      ? O(ve, j(":"), ve)
                      : void 0
          }
          function Le(e, t) {
            if ("<" == t) return O(R(">"), ue(ve, ">"), K, Se)
          }
          function Te() {
            return A(ve, Me)
          }
          function Me(e, t) {
            if ("=" == t) return O(ve)
          }
          function Ae(e, t) {
            return "enum" == t ? ((M.marked = "keyword"), O(tt)) : A(Oe, de, He, Fe)
          }
          function Oe(e, t) {
            return u && F(t)
              ? ((M.marked = "keyword"), O(Oe))
              : "variable" == e
                ? (P(t), O())
                : "spread" == e
                  ? O(Oe)
                  : "[" == e
                    ? fe(Pe, "]")
                    : "{" == e
                      ? fe(Ne, "}")
                      : void 0
          }
          function Ne(e, t) {
            return "variable" != e || M.stream.match(/^\s*:/, !1)
              ? ("variable" == e && (M.marked = "property"),
                "spread" == e ? O(Oe) : "}" == e ? A() : "[" == e ? O(G, j("]"), j(":"), Ne) : O(j(":"), Oe, He))
              : (P(t), O(He))
          }
          function Pe() {
            return A(Oe, He)
          }
          function He(e, t) {
            if ("=" == t) return O(_)
          }
          function Fe(e) {
            if ("," == e) return O(Ae)
          }
          function De(e, t) {
            if ("keyword b" == e && "else" == t) return O(R("form", "else"), U, K)
          }
          function We(e, t) {
            return "await" == t ? O(We) : "(" == e ? O(R(")"), Ee, K) : void 0
          }
          function Ee(e) {
            return "var" == e ? O(Ae, ze) : "variable" == e ? O(ze) : A(ze)
          }
          function ze(e, t) {
            return ")" == e
              ? O()
              : ";" == e
                ? O(ze)
                : "in" == t || "of" == t
                  ? ((M.marked = "keyword"), O(G, ze))
                  : A(G, ze)
          }
          function Ie(e, t) {
            return "*" == t
              ? ((M.marked = "keyword"), O(Ie))
              : "variable" == e
                ? (P(t), O(Ie))
                : "(" == e
                  ? O(z, R(")"), ue(Ke, ")"), K, ge, U, B)
                  : u && "<" == t
                    ? O(R(">"), ue(Te, ">"), K, Ie)
                    : void 0
          }
          function Be(e, t) {
            return "*" == t
              ? ((M.marked = "keyword"), O(Be))
              : "variable" == e
                ? (P(t), O(Be))
                : "(" == e
                  ? O(z, R(")"), ue(Ke, ")"), K, ge, B)
                  : u && "<" == t
                    ? O(R(">"), ue(Te, ">"), K, Be)
                    : void 0
          }
          function Re(e, t) {
            return "keyword" == e || "variable" == e
              ? ((M.marked = "type"), O(Re))
              : "<" == t
                ? O(R(">"), ue(Te, ">"), K)
                : void 0
          }
          function Ke(e, t) {
            return (
              "@" == t && O(G, Ke),
              "spread" == e
                ? O(Ke)
                : u && F(t)
                  ? ((M.marked = "keyword"), O(Ke))
                  : u && "this" == e
                    ? O(de, He)
                    : A(Oe, de, He)
            )
          }
          function je(e, t) {
            return "variable" == e ? Ue(e, t) : Ve(e, t)
          }
          function Ue(e, t) {
            if ("variable" == e) return P(t), O(Ve)
          }
          function Ve(e, t) {
            return "<" == t
              ? O(R(">"), ue(Te, ">"), K, Ve)
              : "extends" == t || "implements" == t || (u && "," == e)
                ? ("implements" == t && (M.marked = "keyword"), O(u ? ve : G, Ve))
                : "{" == e
                  ? O(R("}"), Ge, K)
                  : void 0
          }
          function Ge(e, t) {
            return "async" == e ||
              ("variable" == e &&
                ("static" == t || "get" == t || "set" == t || (u && F(t))) &&
                M.stream.match(/^\s+#?[\w$\xa1-\uffff]/, !1))
              ? ((M.marked = "keyword"), O(Ge))
              : "variable" == e || "keyword" == M.style
                ? ((M.marked = "property"), O(_e, Ge))
                : "number" == e || "string" == e
                  ? O(_e, Ge)
                  : "[" == e
                    ? O(G, de, j("]"), _e, Ge)
                    : "*" == t
                      ? ((M.marked = "keyword"), O(Ge))
                      : u && "(" == e
                        ? A(Be, Ge)
                        : ";" == e || "," == e
                          ? O(Ge)
                          : "}" == e
                            ? O()
                            : "@" == t
                              ? O(G, Ge)
                              : void 0
          }
          function _e(e, t) {
            if ("!" == t) return O(_e)
            if ("?" == t) return O(_e)
            if (":" == e) return O(ve, He)
            if ("=" == t) return O(_)
            var n = M.state.lexical.prev
            return A(n && "interface" == n.info ? Be : Ie)
          }
          function qe(e, t) {
            return "*" == t
              ? ((M.marked = "keyword"), O(Je, j(";")))
              : "default" == t
                ? ((M.marked = "keyword"), O(G, j(";")))
                : "{" == e
                  ? O(ue($e, "}"), Je, j(";"))
                  : A(U)
          }
          function $e(e, t) {
            return "as" == t ? ((M.marked = "keyword"), O(j("variable"))) : "variable" == e ? A(_, $e) : void 0
          }
          function Xe(e) {
            return "string" == e ? O() : "(" == e ? A(G) : "." == e ? A(Y) : A(Ye, Ze, Je)
          }
          function Ye(e, t) {
            return "{" == e ? fe(Ye, "}") : ("variable" == e && P(t), "*" == t && (M.marked = "keyword"), O(Qe))
          }
          function Ze(e) {
            if ("," == e) return O(Ye, Ze)
          }
          function Qe(e, t) {
            if ("as" == t) return (M.marked = "keyword"), O(Ye)
          }
          function Je(e, t) {
            if ("from" == t) return (M.marked = "keyword"), O(G)
          }
          function et(e) {
            return "]" == e ? O() : A(ue(_, "]"))
          }
          function tt() {
            return A(R("form"), Oe, j("{"), R("}"), ue(nt, "}"), K, K)
          }
          function nt() {
            return A(Oe, He)
          }
          function rt(e, t) {
            return "operator" == e.lastType || "," == e.lastType || d.test(t.charAt(0)) || /[,.]/.test(t.charAt(0))
          }
          function it(e, t, n) {
            return (
              (t.tokenize == v &&
                /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)) ||
              ("quasi" == t.lastType && /\{\s*$/.test(e.string.slice(0, e.pos - (n || 0))))
            )
          }
          return (
            (z.lex = I.lex = !0),
            (B.lex = !0),
            (K.lex = !0),
            {
              startState: function (e) {
                var t = {
                  tokenize: v,
                  lastType: "sof",
                  cc: [],
                  lexical: new S((e || 0) - o, 0, "block", !1),
                  localVars: n.localVars,
                  context: n.localVars && new D(null, null, !1),
                  indented: e || 0,
                }
                return n.globalVars && "object" == typeof n.globalVars && (t.globalVars = n.globalVars), t
              },
              token: function (e, t) {
                if (
                  (e.sol() &&
                    (t.lexical.hasOwnProperty("align") || (t.lexical.align = !1),
                    (t.indented = e.indentation()),
                    k(e, t)),
                  t.tokenize != b && e.eatSpace())
                )
                  return null
                var n = t.tokenize(e, t)
                return "comment" == r
                  ? n
                  : ((t.lastType = "operator" != r || ("++" != i && "--" != i) ? r : "incdec"), T(t, n, r, i, e))
              },
              indent: function (t, r) {
                if (t.tokenize == b || t.tokenize == w) return e.Pass
                if (t.tokenize != v) return 0
                var i,
                  l = r && r.charAt(0),
                  s = t.lexical
                if (!/^\s*else\b/.test(r))
                  for (var c = t.cc.length - 1; c >= 0; --c) {
                    var u = t.cc[c]
                    if (u == K) s = s.prev
                    else if (u != De && u != B) break
                  }
                for (
                  ;
                  ("stat" == s.type || "form" == s.type) &&
                  ("}" == l || ((i = t.cc[t.cc.length - 1]) && (i == Y || i == Z) && !/^[,\.=+\-*:?[\(]/.test(r)));

                )
                  s = s.prev
                a && ")" == s.type && "stat" == s.prev.type && (s = s.prev)
                var f = s.type,
                  h = l == f
                return "vardef" == f
                  ? s.indented + ("operator" == t.lastType || "," == t.lastType ? s.info.length + 1 : 0)
                  : "form" == f && "{" == l
                    ? s.indented
                    : "form" == f
                      ? s.indented + o
                      : "stat" == f
                        ? s.indented + (rt(t, r) ? a || o : 0)
                        : "switch" != s.info || h || 0 == n.doubleIndentSwitch
                          ? s.align
                            ? s.column + (h ? 0 : 1)
                            : s.indented + (h ? 0 : o)
                          : s.indented + (/^(?:case|default)\b/.test(r) ? o : 2 * o)
              },
              electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
              blockCommentStart: s ? null : "/*",
              blockCommentEnd: s ? null : "*/",
              blockCommentContinue: s ? null : " * ",
              lineComment: s ? null : "//",
              fold: "brace",
              closeBrackets: "()[]{}''\"\"``",
              helperType: s ? "json" : "javascript",
              jsonldMode: l,
              jsonMode: s,
              expressionAllowed: it,
              skipExpression: function (t) {
                T(t, "atom", "atom", "true", new e.StringStream("", 2, null))
              },
            }
          )
        }),
          e.registerHelper("wordChars", "javascript", /[\w$]/),
          e.defineMIME("text/javascript", "javascript"),
          e.defineMIME("text/ecmascript", "javascript"),
          e.defineMIME("application/javascript", "javascript"),
          e.defineMIME("application/x-javascript", "javascript"),
          e.defineMIME("application/ecmascript", "javascript"),
          e.defineMIME("application/json", { name: "javascript", json: !0 }),
          e.defineMIME("application/x-json", { name: "javascript", json: !0 }),
          e.defineMIME("application/manifest+json", { name: "javascript", json: !0 }),
          e.defineMIME("application/ld+json", { name: "javascript", jsonld: !0 }),
          e.defineMIME("text/typescript", { name: "javascript", typescript: !0 }),
          e.defineMIME("application/typescript", { name: "javascript", typescript: !0 })
      })(n(5237))
    },
    576: (e, t, n) => {
      !(function (e) {
        "use strict"
        var t = {
            autoSelfClosers: {
              area: !0,
              base: !0,
              br: !0,
              col: !0,
              command: !0,
              embed: !0,
              frame: !0,
              hr: !0,
              img: !0,
              input: !0,
              keygen: !0,
              link: !0,
              meta: !0,
              param: !0,
              source: !0,
              track: !0,
              wbr: !0,
              menuitem: !0,
            },
            implicitlyClosed: {
              dd: !0,
              li: !0,
              optgroup: !0,
              option: !0,
              p: !0,
              rp: !0,
              rt: !0,
              tbody: !0,
              td: !0,
              tfoot: !0,
              th: !0,
              tr: !0,
            },
            contextGrabbers: {
              dd: { dd: !0, dt: !0 },
              dt: { dd: !0, dt: !0 },
              li: { li: !0 },
              option: { option: !0, optgroup: !0 },
              optgroup: { optgroup: !0 },
              p: {
                address: !0,
                article: !0,
                aside: !0,
                blockquote: !0,
                dir: !0,
                div: !0,
                dl: !0,
                fieldset: !0,
                footer: !0,
                form: !0,
                h1: !0,
                h2: !0,
                h3: !0,
                h4: !0,
                h5: !0,
                h6: !0,
                header: !0,
                hgroup: !0,
                hr: !0,
                menu: !0,
                nav: !0,
                ol: !0,
                p: !0,
                pre: !0,
                section: !0,
                table: !0,
                ul: !0,
              },
              rp: { rp: !0, rt: !0 },
              rt: { rp: !0, rt: !0 },
              tbody: { tbody: !0, tfoot: !0 },
              td: { td: !0, th: !0 },
              tfoot: { tbody: !0 },
              th: { td: !0, th: !0 },
              thead: { tbody: !0, tfoot: !0 },
              tr: { tr: !0 },
            },
            doNotIndent: { pre: !0 },
            allowUnquoted: !0,
            allowMissing: !0,
            caseFold: !0,
          },
          n = {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: !1,
            allowMissing: !1,
            allowMissingTagName: !1,
            caseFold: !1,
          }
        e.defineMode("xml", function (r, i) {
          var o,
            a,
            l = r.indentUnit,
            s = {},
            c = i.htmlMode ? t : n
          for (var u in c) s[u] = c[u]
          for (var u in i) s[u] = i[u]
          function f(e, t) {
            function n(n) {
              return (t.tokenize = n), n(e, t)
            }
            var r = e.next()
            return "<" == r
              ? e.eat("!")
                ? e.eat("[")
                  ? e.match("CDATA[")
                    ? n(p("atom", "]]>"))
                    : null
                  : e.match("--")
                    ? n(p("comment", "--\x3e"))
                    : e.match("DOCTYPE", !0, !0)
                      ? (e.eatWhile(/[\w\._\-]/), n(g(1)))
                      : null
                : e.eat("?")
                  ? (e.eatWhile(/[\w\._\-]/), (t.tokenize = p("meta", "?>")), "meta")
                  : ((o = e.eat("/") ? "closeTag" : "openTag"), (t.tokenize = h), "tag bracket")
              : "&" == r
                ? (
                    e.eat("#")
                      ? e.eat("x")
                        ? e.eatWhile(/[a-fA-F\d]/) && e.eat(";")
                        : e.eatWhile(/[\d]/) && e.eat(";")
                      : e.eatWhile(/[\w\.\-:]/) && e.eat(";")
                  )
                  ? "atom"
                  : "error"
                : (e.eatWhile(/[^&<]/), null)
          }
          function h(e, t) {
            var n = e.next()
            if (">" == n || ("/" == n && e.eat(">")))
              return (t.tokenize = f), (o = ">" == n ? "endTag" : "selfcloseTag"), "tag bracket"
            if ("=" == n) return (o = "equals"), null
            if ("<" == n) {
              ;(t.tokenize = f), (t.state = w), (t.tagName = t.tagStart = null)
              var r = t.tokenize(e, t)
              return r ? r + " tag error" : "tag error"
            }
            return /[\'\"]/.test(n)
              ? ((t.tokenize = d(n)), (t.stringStartCol = e.column()), t.tokenize(e, t))
              : (e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/), "word")
          }
          function d(e) {
            var t = function (t, n) {
              for (; !t.eol(); )
                if (t.next() == e) {
                  n.tokenize = h
                  break
                }
              return "string"
            }
            return (t.isInAttribute = !0), t
          }
          function p(e, t) {
            return function (n, r) {
              for (; !n.eol(); ) {
                if (n.match(t)) {
                  r.tokenize = f
                  break
                }
                n.next()
              }
              return e
            }
          }
          function g(e) {
            return function (t, n) {
              for (var r; null != (r = t.next()); ) {
                if ("<" == r) return (n.tokenize = g(e + 1)), n.tokenize(t, n)
                if (">" == r) {
                  if (1 == e) {
                    n.tokenize = f
                    break
                  }
                  return (n.tokenize = g(e - 1)), n.tokenize(t, n)
                }
              }
              return "meta"
            }
          }
          function m(e) {
            return e && e.toLowerCase()
          }
          function v(e, t, n) {
            ;(this.prev = e.context),
              (this.tagName = t || ""),
              (this.indent = e.indented),
              (this.startOfLine = n),
              (s.doNotIndent.hasOwnProperty(t) || (e.context && e.context.noIndent)) && (this.noIndent = !0)
          }
          function y(e) {
            e.context && (e.context = e.context.prev)
          }
          function b(e, t) {
            for (var n; ; ) {
              if (!e.context) return
              if (
                ((n = e.context.tagName),
                !s.contextGrabbers.hasOwnProperty(m(n)) || !s.contextGrabbers[m(n)].hasOwnProperty(m(t)))
              )
                return
              y(e)
            }
          }
          function w(e, t, n) {
            return "openTag" == e ? ((n.tagStart = t.column()), x) : "closeTag" == e ? k : w
          }
          function x(e, t, n) {
            return "word" == e
              ? ((n.tagName = t.current()), (a = "tag"), L)
              : s.allowMissingTagName && "endTag" == e
                ? ((a = "tag bracket"), L(e, t, n))
                : ((a = "error"), x)
          }
          function k(e, t, n) {
            if ("word" == e) {
              var r = t.current()
              return (
                n.context && n.context.tagName != r && s.implicitlyClosed.hasOwnProperty(m(n.context.tagName)) && y(n),
                (n.context && n.context.tagName == r) || !1 === s.matchClosing
                  ? ((a = "tag"), C)
                  : ((a = "tag error"), S)
              )
            }
            return s.allowMissingTagName && "endTag" == e ? ((a = "tag bracket"), C(e, t, n)) : ((a = "error"), S)
          }
          function C(e, t, n) {
            return "endTag" != e ? ((a = "error"), C) : (y(n), w)
          }
          function S(e, t, n) {
            return (a = "error"), C(e, t, n)
          }
          function L(e, t, n) {
            if ("word" == e) return (a = "attribute"), T
            if ("endTag" == e || "selfcloseTag" == e) {
              var r = n.tagName,
                i = n.tagStart
              return (
                (n.tagName = n.tagStart = null),
                "selfcloseTag" == e || s.autoSelfClosers.hasOwnProperty(m(r))
                  ? b(n, r)
                  : (b(n, r), (n.context = new v(n, r, i == n.indented))),
                w
              )
            }
            return (a = "error"), L
          }
          function T(e, t, n) {
            return "equals" == e ? M : (s.allowMissing || (a = "error"), L(e, t, n))
          }
          function M(e, t, n) {
            return "string" == e
              ? A
              : "word" == e && s.allowUnquoted
                ? ((a = "string"), L)
                : ((a = "error"), L(e, t, n))
          }
          function A(e, t, n) {
            return "string" == e ? A : L(e, t, n)
          }
          return (
            (f.isInText = !0),
            {
              startState: function (e) {
                var t = { tokenize: f, state: w, indented: e || 0, tagName: null, tagStart: null, context: null }
                return null != e && (t.baseIndent = e), t
              },
              token: function (e, t) {
                if ((!t.tagName && e.sol() && (t.indented = e.indentation()), e.eatSpace())) return null
                o = null
                var n = t.tokenize(e, t)
                return (
                  (n || o) &&
                    "comment" != n &&
                    ((a = null), (t.state = t.state(o || n, e, t)), a && (n = "error" == a ? n + " error" : a)),
                  n
                )
              },
              indent: function (t, n, r) {
                var i = t.context
                if (t.tokenize.isInAttribute) return t.tagStart == t.indented ? t.stringStartCol + 1 : t.indented + l
                if (i && i.noIndent) return e.Pass
                if (t.tokenize != h && t.tokenize != f) return r ? r.match(/^(\s*)/)[0].length : 0
                if (t.tagName)
                  return !1 !== s.multilineTagIndentPastTag
                    ? t.tagStart + t.tagName.length + 2
                    : t.tagStart + l * (s.multilineTagIndentFactor || 1)
                if (s.alignCDATA && /<!\[CDATA\[/.test(n)) return 0
                var o = n && /^<(\/)?([\w_:\.-]*)/.exec(n)
                if (o && o[1])
                  for (; i; ) {
                    if (i.tagName == o[2]) {
                      i = i.prev
                      break
                    }
                    if (!s.implicitlyClosed.hasOwnProperty(m(i.tagName))) break
                    i = i.prev
                  }
                else if (o)
                  for (; i; ) {
                    var a = s.contextGrabbers[m(i.tagName)]
                    if (!a || !a.hasOwnProperty(m(o[2]))) break
                    i = i.prev
                  }
                for (; i && i.prev && !i.startOfLine; ) i = i.prev
                return i ? i.indent + l : t.baseIndent || 0
              },
              electricInput: /<\/[\s\w:]+>$/,
              blockCommentStart: "\x3c!--",
              blockCommentEnd: "--\x3e",
              configuration: s.htmlMode ? "html" : "xml",
              helperType: s.htmlMode ? "html" : "xml",
              skipAttribute: function (e) {
                e.state == M && (e.state = L)
              },
              xmlCurrentTag: function (e) {
                return e.tagName ? { name: e.tagName, close: "closeTag" == e.type } : null
              },
              xmlCurrentContext: function (e) {
                for (var t = [], n = e.context; n; n = n.prev) t.push(n.tagName)
                return t.reverse()
              },
            }
          )
        }),
          e.defineMIME("text/xml", "xml"),
          e.defineMIME("application/xml", "xml"),
          e.mimeModes.hasOwnProperty("text/html") || e.defineMIME("text/html", { name: "xml", htmlMode: !0 })
      })(n(5237))
    },
  },
])
