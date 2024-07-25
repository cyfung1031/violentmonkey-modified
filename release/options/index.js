(() => {
  // coder-cm-p.js
  console.log('Coder.js');

  const observablePromise = (proc, timeoutPromise) => {
    let promise = null;
    return {
      obtain() {
        if (!promise) {
          promise = new Promise(resolve => {
            let mo = null;
            const f = () => {
              let t = proc();
              if (t) {
                mo.disconnect();
                mo.takeRecords();
                mo = null;
                resolve(t);
              }
            }
            mo = new MutationObserver(f);
            mo.observe(document, { subtree: true, childList: true })
            f();
            timeoutPromise && timeoutPromise.then(() => {
              resolve(null)
            });
          });
        }
        return promise
      }
    }
  }

  const PromiseExternal = ((resolve_, reject_) => {
    const h = (resolve, reject) => { resolve_ = resolve; reject_ = reject };
    return class PromiseExternal extends Promise {
      constructor(cb = h) {
        super(cb);
        if (cb === h) {
          /** @type {(value: any) => void} */
          this.resolve = resolve_;
          /** @type {(reason?: any) => void} */
          this.reject = reject_;
        }
      }
    };
  })();

  const onReadyPromise = new Promise(resolve => {
    if (document.readyState !== 'loading') {
      resolve();
    } else {
      window.addEventListener("DOMContentLoaded", resolve, false);
    }
  });

  const darkThemeChecked = onReadyPromise.then(() => {

    const bodyTextColor = window.getComputedStyle(document.body).color;

    let bodyM;
    if (bodyM = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(bodyTextColor)) {
      bodyM = [...bodyM].map(e => +e);
      if (bodyM[1] === bodyM[2] && bodyM[2] === bodyM[3]) {
        if (bodyM[1] < 80) document.documentElement.removeAttribute('dark');
        else if (bodyM[1] > 175) document.documentElement.setAttribute('dark', '');
      }
    }

  });

  onReadyPromise.then(async () => {

    const addCssText = (id, text) => {
      if (document.getElementById(id)) return;
      const style = document.createElement('style');
      style.id = id;
      style.textContent = text;
      document.head.appendChild(style);
    }

    addCssText('qp16t38f2a42', `
        html body .CodeMirror[class]{
          display:none !important;
        }
      `);

    let lastCMBox = null;

    const urlMap = new Map();
    function globalModify(enabled) {

    }


    let lastCMBoxConnection = null;
    observablePromise(() => {
      let isCMBoxConnected = lastCMBox && lastCMBox.isConnected;
      if (lastCMBoxConnection === isCMBoxConnected) return;
      lastCMBoxConnection = isCMBoxConnected;
      cmObj && globalModify(isCMBoxConnected ? 1 : 0);

    }).obtain();


    let getEditor = () => {
      return null;
    };
    let nextCopyPromise = null;
    async function makeTextCopy() {

      // await new Promise(resolve => requestAnimationFrame(resolve));

      let textarea = document.createElement("TEXTAREA"); // Create a new <strong> element
      textarea.id = 'bHTSIJrAqiDV';
      textarea.style.position = 'fixed';
      textarea.style.left = '-422vw';
      textarea.style.top = '-422vh';
      textarea.style.width = '40px';
      textarea.style.height = '40px';
      textarea.style.zIndex = '99999';
      document.body.appendChild(textarea);
      const editor = getEditor();
      textarea.value = editor.getModel().getValueInRange(editor.getSelection());

      const n = window.getSelection();
      n.removeAllRanges();
      textarea.select();

      const p = nextCopyPromise = new PromiseExternal();
      document.execCommand('copy');

      await p.then();

      // await new Promise(resolve => requestAnimationFrame(resolve));
      Promise.resolve().then(() => textarea.remove())
      editor.focus();


    }
    document.addEventListener('copy', (evt) => {
      const target = ((evt || 0).target || 0);
      if (target.id === 'bHTSIJrAqiDV') {
        if (nextCopyPromise) {
          nextCopyPromise.resolve();
          nextCopyPromise = null;
        }
        return;
      }
      if (!(target === document.activeElement && document.activeElement instanceof HTMLTextAreaElement && document.activeElement.matches('.inputarea.monaco-mouse-cursor-text'))) return;
      const selectionText = getSelection() + ""
      if (selectionText.length > 0) {

        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        makeTextCopy();


      }

    }, true);




    /** @param {Map} urlMap */
    function loadResourceByURL(type, url, urlMap) {

      return new Promise(resolve => {
        let bu = url;
        Promise.resolve().then(() => {


          if (type === 'css') {
            var link = document.createElement('link');
            link.dataset.url = url;
            var onload = function () {
              link.removeEventListener('load', onload, false);
              if (urlMap) urlMap.set(url, bu);
              resolve(bu);
            }
            link.addEventListener('load', onload, false);
            link.rel = 'stylesheet';
            link.href = bu;
            document.head.appendChild(link);
          } else if (type === 'js') {
            var script = document.createElement('script');
            script.dataset.url = url;
            var onload = function () {
              script.removeEventListener('load', onload, false);
              if (urlMap) urlMap.set(url, bu);
              resolve(bu);
            }
            script.addEventListener('load', onload, false);
            script.src = bu;
            document.head.appendChild(script);
          }


        });

      })
    }

    // function analyseURL(type, url, urlMap) {

    //   return new Promise(resolve => {
    //     let b, bu;
    //     const mime = type === 'js' ? 'text/javascript; charset=UTF-8' : type === 'css' ? 'text/css; charset=UTF-8' : 'text/plain; charset=UTF-8';
    //     fetch(url).then(r => r.text()).then(t => [(b = new Blob([t], { type: mime })), (bu = URL.createObjectURL(b))]).then(() => {

    //       if (urlMap) urlMap.set(url, bu);
    //       resolve(bu);

    //     });

    //   })

    // }



    const vsPath = "/public/lib/monaco-editor/0.30.1/min/vs";

    const editorOptions = {
      automaticLayout: true,
      foldingStrategy: 'indentation',
      lineNumbers: 'on',
      readOnly: false,
      minimap: {
        enabled: false,
      },
      cursorStyle: 'line',
      scrollBeyondLastLine: false,
      showUnused: true,
      showDeprecated: true,
    };

    const compilerOptions = {
      allowNonTsExtensions: true,
      checkJs: true,
      noImplicitAny: true,

      allowJs: true,
      noUnusedLocals: false,
      noFallthroughCasesInSwitch: false,
      noImplicitThis: false,

    };

    const cssText01 = `
        .monaco-editor-container{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            /*display: none;*/
        }
        [monaco-editor-status="1"] .monaco-editor-container{
            display: block;
        }
        [monaco-editor-status="1"] .monaco-controlled-textarea{
            display: none;
        }
        [monaco-editor-status="2"] .monaco-editor-container{
            display: none;
        }
        [monaco-editor-status="2"] .monaco-controlled-textarea{
            display: block;
        }
    
    
        .editor-code {
            position: relative;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: 0;
        }

        @supports not (contain: strict) {
          .monaco-editor-container {
              display: block;
              position: absolute;
              width: 100%;
              height: 100%;
          }
        }
    
        @supports (contain: strict) {
          .monaco-editor-container {
              display: block;
              position: relative;
              contain: strict;
              width: 100%;
              height: 100%;
          }
        }

        html body .edit.frame[class] > .flex.flex-col:last-child {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          height: 0;
        }

        textarea.inputarea.monaco-mouse-cursor-text[class] {
          opacity: 0;
        }
    `;

    const firstInjection = async () => {


      // https://microsoft.github.io/vscode-codicons/dist/codicon.ttf

      /*
      await loadResourceWithBlobURL(
        "css",
        "https://microsoft.github.io/vscode-codicons/dist/codicon.css",
        urlMap,
      );*/

      // await analyseURL('js', `${vsPath}/language/typescript/tsWorker.js`, urlMap);

      // Dynamically load CSS and JS
      await loadResourceByURL('css', `${vsPath}/editor/editor.main.css`, urlMap);
      await loadResourceByURL('js', `${vsPath}/loader.js`, urlMap);
      await loadResourceByURL('js', `${vsPath}/editor/editor.main.nls.js`, urlMap);
      await loadResourceByURL('js', `${vsPath}/editor/editor.main.js`, urlMap);

      await loadResourceByURL('js', `${vsPath}/basic-languages/javascript/javascript.js`, urlMap);
      await loadResourceByURL('js', `${vsPath}/basic-languages/typescript/typescript.js`, urlMap);
      await loadResourceByURL('js', `${vsPath}/language/typescript/tsMode.js`, urlMap);
      await loadResourceByURL('js', `${vsPath}/language/typescript/tsWorker.js`, urlMap);


      await darkThemeChecked.then();


      addCssText('rmbnctzOOksi', cssText01);


    };

    let elmSet = null;
    let injected = false;
    let promiseReady = null;

    let oldValue;


    let cmObj = null;
    let byPass = false;

    let lastTabSize = null;

    async function createEditor(cmTextArea, containerSetup) {

      if (elmSet && elmSet.container) {

        byPass = true;

        const container = elmSet.container;

        elmSet.cmTextArea = cmTextArea;
        elmSet.container = container;

        if (cmTextArea.style.display) cmTextArea.style.display = '';

        container.style.display = '';
        const editor = elmSet.editor;

        const value = cmTextArea.value;
        oldValue = value;
        editor.getModel().setValue(value);
        oldValue = value;

        const theme = document.documentElement.hasAttribute('dark') ? 'vs-dark' : 'vs';
        monaco.editor.setTheme(theme);

        containerSetup(container);

        editor.updateTabSize(value);

        byPass = false;
        return;
      }

      elmSet = {
        cmTextArea: null,
        container: null,
        editor: null,
      };

      const isInjected = !!injected;

      if (!isInjected) {

        // Setting up Monaco Editor requirements
        let require = {
          paths: {
            vs: vsPath,
          },
        };

        window.require = (window.require || {});
        window.require.paths = (window.require.paths || {});
        Object.assign(window.require.paths, require.paths);

      }


      const codeLang = 'javascript';


      cmObj && globalModify(1);
      if (!isInjected) await firstInjection();

      monaco.languages.typescript.javascriptDefaults.setCompilerOptions(Object.assign({
        target: monaco.languages.typescript.ScriptTarget.ES2018,
      }, compilerOptions));

      const container = document.createElement('div');
      container.className = 'monaco-editor-container';
      container.style.display = 'none';
      containerSetup(container);

      elmSet.cmTextArea = cmTextArea;
      elmSet.container = container;

      if (cmTextArea.style.display) cmTextArea.style.display = '';

      const monacoLangs = {
        'javascript': 'javascript',
        'css': 'css',
      };

      const monacoLang = monacoLangs[codeLang];

      const value0 = cmTextArea.value;
      monaco.editor.onDidCreateEditor(function (event) {
        if (byPass || !cmObj) return;
        const container = ((elmSet || 0).container || 0);
        if (!container) return;
        container.style.display = '';
        // console.log('editor created');
      });


      const editor = monaco.editor.create(container, Object.assign({
        value: '',
        language: monacoLang
      }, editorOptions));

      editor.getModel().setValue(value0);
      editor.updateTabSize = updateTabSize;
      editor.updateTabSize(value0);

      elmSet.editor = editor;


      const theme = document.documentElement.hasAttribute('dark') ? 'vs-dark' : 'vs';
      monaco.editor.setTheme(theme);

      // window.cm = cm;
      // window.cmBox = cmBox;

      oldValue = editor.getValue();
      let lz = 0;
      editor.onDidChangeModelContent(e => {
        if (byPass || !cmObj) return;
        const editor = ((elmSet || 0).editor || 0);
        if (!editor) return;
        const value = editor.getValue();
        if (value === oldValue) return;
        oldValue = value;
        let tz = ++lz;
        requestAnimationFrame(() => {
          if (tz !== lz) return;
          const cmTextArea = elmSet ? elmSet.cmTextArea : null;
          if (cmTextArea) {
            elmSet.cmTextArea.value = value;
          }
          const cm = cmObj;
          if (cm) {
            cm.replaceRange(" ", { line: 0, ch: 0 });
            cm.setValue(value);
          }
          editor.updateTabSize(value);
        });
      });


      getEditor = () => editor;

      function updateTabSize (value){
        const editor = this;
        const m = /[\r\n](\x20{4}|\x20{2})[A-Za-z]+/.exec(value);
        if (m) {
          const k = m[1].length;
          if (lastTabSize !== k) {
            lastTabSize = k;
            editor.updateOptions({
              tabSize: k
            });
          }
        }
      };


    }

    const idlePreload = async () => {
      if (location.hash === '#settings') return;
      if (promiseReady) await promiseReady.then();
      if (!elmSet || !elmSet.editor) {
        promiseReady = new PromiseExternal();
        await createEditor(document.createElement('textarea'), () => {
        });
        injected = true;
        promiseReady.resolve();
      }
    };

    typeof requestIdleCallback === "function" ? requestIdleCallback(idlePreload) : requestAnimationFrame(idlePreload);

    let loadedFromSettings = location.hash === '#settings';
    window.addEventListener('hashchange', () => {
      if (!loadedFromSettings && location.hash === '#settings' && urlMap.size > 0) {
        location.reload();
      } else if (loadedFromSettings && location.hash !== '#settings' && urlMap.size == 0) {
        location.reload();
      }
    }, false);

    const noscript = document.createElement('noscript')
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('element-visible', '')
          const cmBox = entry.target.querySelector('.CodeMirror')
          if (cmBox) cmBox.removeAttribute('cm-checked')
          if (noscript.isConnected) noscript.remove(); else document.documentElement.appendChild(noscript);
        } else {
          entry.target.removeAttribute('element-visible')
        }
      }
    }, {
      root: null,
      rootMargin: "0px",
      threshold: [0.05, 0.95]
    });

    while (1) {

      const cmBox = await observablePromise(() => [...document.querySelectorAll('.CodeMirror:not([cm-checked])')].filter(e => e.CodeMirror && typeof e.CodeMirror.getValue === 'function' && typeof e.CodeMirror.setValue === 'function')[0]).obtain();
      cmBox && cmBox.setAttribute('cm-checked', '');
      const cm = cmBox ? cmBox.CodeMirror : null;
      if (!cm) return;
      io.observe(cmBox.parentElement);

      if (promiseReady) await promiseReady.then();
      promiseReady = new PromiseExternal();

      lastCMBox = cmBox;
      cmObj = cm;

      Object.assign(cmBox.style, {
        display: 'none'
      });

      let cmTextArea;
      if (elmSet && elmSet.cmTextArea) {
        cmTextArea = elmSet.cmTextArea;
        cmTextArea.value = cm.getValue();
      } else {
        cmTextArea = document.createElement('textarea');
        cmTextArea.value = cm.getValue();
        Object.assign(cmTextArea.style, {
          position: 'fixed',
          top: '-299vh',
          left: '-299vw',
          height: '99px',
          width: '99px',
          top: '-200px',
          zIndex: -1,
          display: 'none'
        });
        document.body.appendChild(cmTextArea);
      }



      await createEditor(cmTextArea, (container) => {
        cmBox.parentNode.insertBefore(container, cmBox);
      });

      injected = true;
      promiseReady.resolve();

    }


  });


})();
{
  const e = this,
    { window: t } = e,
    n = "expose",
    l = "injectInto",
    a = "runAt",
    o = "scripts",
    i = (e) => "function" == typeof e,
    s = (e) => null != e && "object" == typeof e,
    {
      Boolean: r,
      Error: c,
      Object: u,
      Promise: d,
      addEventListener: p,
      removeEventListener: m,
      chrome: g,
      performance: v,
    } = e,
    { apply: h } = Reflect,
    f = h.call.bind({}.hasOwnProperty),
    w = u.call.bind(u.call),
    b = "contextualIdentities" in g,
    y = "#" + o,
    x = (g.runtime.getURL("/").slice(0, -1), g.runtime.getManifest()),
    C =
      (g.runtime.getURL(x.options_ui.page).split("#", 1)[0],
      g.runtime.getURL(x.icons[16].replace("16.png", "")),
      "settings"),
    _ = "about",
    k = "recycleBin",
    S = "frameId"
  ;(() => {
    var h,
      U,
      z,
      D = {
        7076: (e, t, n) => {
          "use strict"
          var l = n(8464),
            a = n(3258)
          const o = (0, l.Z)({ lifetime: 3e5 })
          ;(0, a.iU)({
            CacheLoad: (e) => o.get(e) || null,
            CacheHit(e) {
              o.hit(e.key, e.lifetime)
            },
            CachePop: (e) => o.pop(e) || null,
          })
        },
        5186: (e, t, n) => {
          "use strict"
          n.d(t, { n9: () => l.n9 }), n(7076)
          var l = n(3258)
          n(5630)
        },
        3258: (e, t, n) => {
          "use strict"
          n.d(t, { S1: () => s, iU: () => o, n9: () => a })
          const l = {},
            a = (e) => u.assign(l, e),
            o = (e) => {
              for (const t in e) (l[t] = e[t]).isOwn = !0
            }
          let i,
            s = new d((e) => {
              i = () => d.all(s.deps).then(e)
            })
          ;(s.deps = []), s.then(() => (s = null))
        },
        5630: (e, t, n) => {
          "use strict"
          var l = n(5313),
            a = n(2380),
            o = n(3657),
            i = n(3258),
            s = n(8670)
          let r
          ;(0, i.iU)({
            GetAllOptions: () => u.assign({}, o.ZP, c),
            SetOptions(e) {
              for (const t in e) w(t, e[t], !0)
              v()
            },
          })
          const c = {},
            d = (0, l.QC)(),
            p = (0, l.Ds)(v, 100),
            m = (0, l.Ds)(() => s.ZP.base.setOne("options", c), 100)
          function g(e, t, n) {
            r ? delete r[e] : (r = {}), (r[e] = t), n || p()
          }
          function v() {
            if (!r) return
            const e = r
            ;(r = null), d.fire(e)
          }
          function h(e) {
            var t
            let n = c[e]
            if (null != n) return n
            const i = (0, l.Wk)(e),
              s = i[0],
              r = null != (t = c[s]) ? t : (0, a.p$)(o.ZP[s])
            return i.length > 1 ? (0, a._M)(r, i.slice(1)) : r
          }
          function w(e, t, n) {
            if (i.S1) return i.S1.then(w.bind(null, ...arguments))
            const s = (0, l.Wk)(e),
              r = s[0]
            if (((e = s.join(".")), !f(o.ZP, r))) return
            const u = s.length > 1 && s.slice(1),
              d = h([r])
            ;(0, a.vZ)(t, u ? (0, a._M)(d, u) : d) || ((c[r] = u ? (0, a.iA)(d, u, t) : t), b(r), m(), g(e, t, n))
          }
          function b(e) {
            return (0, a.vZ)(c[e], o.ZP[e]) && delete c[e]
          }
          ;(new Proxy(o.ZP, { get: (e, t) => h(t) }), d.hook)((e) => (0, l.NB)("UpdateOptions", e))
        },
        8670: (e, t, n) => {
          "use strict"
          n.d(t, { ZP: () => h })
          var l = n(2380),
            a = n(4288),
            o = n(3258)
          let i = browser.storage.local
          class s {
            constructor(e, t) {
              ;(g[t] = this), (this.name = e), (this.prefix = t)
            }
            toKey(e) {
              return this.prefix + e
            }
            toId(e) {
              return e.startsWith(this.prefix) ? e.slice(this.prefix.length) : ""
            }
            async getOne(e) {
              const t = this.toKey(e)
              return (await i.get([t]))[t]
            }
            async getMulti(e, t) {
              const n = null == e ? void 0 : e.map(this.toKey, this),
                a = await i.get(n)
              return t || this.prefix ? w(l.Xw, a, t, this.toId, this) : a
            }
            async remove(e) {
              const t = (0, a.rY)(e).filter(r).map(this.toKey, this)
              t.length && (await i.remove(t))
            }
            async setOne(e, t) {
              if (e) return this.set({ [e]: t })
            }
            async set(e) {
              return await i.set(this.prefix ? w(l.Xw, e, null, this.toKey, this) : e), e
            }
          }
          const c = "cache",
            u = "code",
            d = "require",
            p = "script",
            m = "value",
            g = {},
            v = {
              get api() {
                return i
              },
              set api(e) {
                i = e
              },
              forKey: (e) => g[/^\w+:|$/.exec(e)[0]],
              base: new s("base", ""),
              [c]: new s(c, "cac:"),
              [u]: new s(u, "code:"),
              mod: new s("mod", "mod:"),
              [d]: new s(d, "req:"),
              [p]: new s(p, "scr:"),
              [m]: new s(m, "val:"),
            },
            h = v
          ;(0, o.iU)({ Storage: ([e, t, ...n]) => v[e][t](...n) })
        },
        5475: (h, U, z) => {
          "use strict"
          z.d(U, { m: () => ar }), z(1871)
          var D = z(5313),
            $ = z(6711),
            H = z(2477),
            j = z(5010),
            W = z(1226),
            I = (z(3700), z(9994)),
            R = z(2262),
            T = z(9518)
          const M =
              /\s*(!)?(\#|(name|code|desc)(\+re)?:|(re:)|)('((?:[^']+|'')*)('|$)|"((?:[^"]+|"")*)("|$)|\/(\S+?)\/([a-z]*)|\S+)(?:\s+|$)/y,
            O = /''/g,
            E = /""/g
          function Z(e) {
            const t = [],
              n = [],
              l = [],
              a = []
            M.lastIndex = 0
            for (let o; (o = M.exec(e)); ) {
              let e,
                [, i, s, r = "", u, d, p, m, g, v = m, h = g, f, w = ""] = o
              if (v) {
                if (!h) throw new c("Unmatched quotes")
                e = v.replace(m ? O : E, v[0])
              } else e = p
              ;(i = !!i),
                n.push({ negative: i, prefix: s, raw: p, parsed: e }),
                "#" === s
                  ? ((e = (0, D.cn)(e).replace(/\./g, "\\.")), e && (i ? a : l).push(e))
                  : (u || d ? (w = "i") : f ? (e = f) : (v || (w = "i"), (e = (0, D.YC)(e))),
                    t.push({ negative: i, scope: r, re: new RegExp(e, w.includes("u") ? w : w + "u") }))
            }
            return (
              [l, a].forEach((e, n) => {
                e.length &&
                  t.unshift({
                    scope: "tags",
                    re: new RegExp(`(?:^|\\s)(${e.join("|").toLowerCase()})(\\s|$)`, "u"),
                    negative: !!n,
                  })
              }),
              { tokens: n, rules: t }
            )
          }
          function V({ re: e, negative: t, scope: n }) {
            return t ^ (e.test(this[n || "desc"]) || (!n && e.test(this.code)))
          }
          function Y(e, t) {
            let n = 0
            for (let l = 0; l < e.length; l++) {
              const { $cache: a } = e[l]
              n += a.show = t.every(V, a)
            }
            return n
          }
          const P = (0, R.qj)({
              route: T.BC,
              batch: null,
              canRenderScripts: [o, k, ""].includes(T.BC.hash),
              scripts: [],
              removedScripts: [],
              loading: !1,
              needRefresh: !1,
              sync: [],
              title: null,
            }),
            A = "include",
            L = "match",
            F = "exclude",
            q = "excludeMatch",
            N = "description",
            B = "downloadURL",
            K = "homepageURL",
            J = "icon",
            G = "name",
            X = "origExclude",
            Q = "origExcludeMatch",
            ee = "origInclude",
            te = "origMatch",
            ne = "storageSize",
            le = "updateURL"
          let ae
          function oe(e) {
            var t
            ;(ae = null == (t = e.find(([, e]) => "save" === e)) ? void 0 : t[0]),
              ae || ((ae = "Ctrl-S"), e.unshift([ae, "save"]))
          }
          function ie(e, t) {
            return (0, D.gj)("MarkRemoved", { id: e.props.id, removed: t })
          }
          async function se(e, ...t) {
            try {
              await (P.batch = e(...t) || !0)
            } finally {
              P.batch = !1
            }
          }
          function re(e) {
            const t = e.target,
              { selectionStart: n, selectionEnd: l, value: a } = t,
              o = l && { false: "true", true: "false" }[a.slice(n, l)]
            o &&
              !document.execCommand("insertText", !1, o) &&
              ((t.value = a.slice(0, n) + o + a.slice(l)),
              t.setSelectionRange(n + o.length, n + o.length),
              t.dispatchEvent(new Event("input")),
              (t.onblur = () => t.dispatchEvent(new Event("change"))))
          }
          var ce = z(6252),
            ue = z(2502)
          const de = { class: "page-options" },
            pe = { key: 0 },
            me = { class: "aside-content" },
            ge = (0, ce._)("img", { src: "/public/images/icon128.png" }, null, -1),
            ve = ["textContent"],
            he = (0, ce._)("hr", null, null, -1),
            fe = ["href", "data-num-scripts", "textContent"]
          var we = z(7458),
            be = z(9963),
            ye = z(5168),
            xe = z(2380),
            Ce = z(392),
            _e = z(9824),
            ke = z(7407),
            Se = z(6877),
            Ue = z(6653)
          const ze = ".script",
            De = 50,
            $e = 20,
            He = 16,
            je = 500,
            We = W.T
              ? { start: "touchstart", move: "touchmove", end: "touchend" }
              : { start: "dragstart", move: "mousemove", end: "mouseup" },
            Ie = W.T && u.assign(document.createElement("div"), { className: "dragging-noscroll" }),
            Re = ["scroll", "mouseenter", "mouseleave"]
          let Te, Me, Oe, Ee, Ze, Ve, Ye, Pe, Ae, Le, Fe, qe, Ne, Be, Ke, Je, Ge, Xe
          function Qe(e, t, n) {
            const l = n ? p : m
            ;(Fe = e),
              (qe = t),
              w(l, Fe, We.start, W.T ? lt : it),
              W.T || (w(l, Fe, "dblclick", et, !0), w(l, Fe, "mousedown", tt, !0), n || nt())
          }
          function et(e) {
            const t = getSelection(),
              n = e.target.closest(".script-name")
            n && (t.removeAllRanges(), t.selectAllChildren(n))
          }
          function tt(e) {
            !e.altKey && ht(e) && (Le.draggable = !0), w(p, Fe, "mouseup", nt, !0)
          }
          function nt() {
            Le && (Le.draggable = !1), w(m, Fe, "mouseup", nt, !0)
          }
          function lt(e) {
            ht(e) && ((Ve = e), (Ye = setTimeout(at, je, "timer")), p(We.move, at), p(We.end, ot))
          }
          function at(e) {
            ot(), "timer" === e && (w(it, Le, Ve), b && ut() && ((Fe.scrollTop += 1), (Fe.scrollTop -= 1)))
          }
          function ot() {
            clearTimeout(Ye), m(We.move, at), m(We.end, ot)
          }
          function it(e) {
            var t
            if (!ht(e)) return
            e.cancelable && e.preventDefault()
            const { clientX: n, clientY: l } = (null == (t = e.touches) ? void 0 : t[0]) || e,
              a = Le.getBoundingClientRect(),
              o = Fe.getBoundingClientRect()
            ;(Te = Le.cloneNode(!0)),
              (Me = w([].filter, Fe.children, (e) => "none" !== e.style.display)),
              (Ee = Me.indexOf(Le)),
              (Ze = Ee),
              Me.splice(Ee, 1),
              (Oe = a.height),
              (Pe = n - a.left),
              (Ae = l - a.top),
              (Ne = o.top + De),
              (Be = o.bottom - De),
              (Xe = {}),
              Le.classList.add("dragging-placeholder"),
              Te.classList.add("dragging"),
              (Te.style.transform = `translate(${a.left}px, ${a.top}px)`),
              (Te.style.width = `${a.width}px`),
              Fe.appendChild(Te),
              W.T && Fe.insertAdjacentElement("afterBegin", Ie),
              p(We.move, st),
              p(We.end, rt)
          }
          function st(e) {
            var t
            const { clientX: n, clientY: l, target: a } = (null == (t = e.touches) ? void 0 : t[0]) || e
            let o
            const i = W.T ? vt(n, l) : null == a.closest ? void 0 : a.closest(ze)
            if (i && i !== Le) {
              const e = i.getBoundingClientRect(),
                t = l > e.top + e.height / 2
              ;(o = Le !== i[(t ? "next" : "previous") + "ElementSibling"]),
                o && (i.insertAdjacentElement(t ? "afterEnd" : "beforeBegin", Le), ct(Me.indexOf(i) + t))
            }
            ;(Te.style.transform = `translate(${n - Pe}px, ${l - Ae}px)`), (dt(l) || o) && (Xe = {})
          }
          function rt() {
            m(We.move, st),
              m(We.end, rt),
              mt(),
              Te.remove(),
              W.T && Ie.remove(),
              Le.classList.remove("dragging-placeholder"),
              qe(Ee, Ze)
          }
          function ct(e) {
            const t = Ze < e ? Oe : -Oe,
              n = Me.slice(...(Ze < e ? [Ze, e] : [e, Ze]))
            n.forEach((e) => {
              ;(e.style.transition = "none"), (e.style.transform = `translateY(${t}px)`)
            }),
              setTimeout(() =>
                n.forEach(({ style: e }) => {
                  e.removeProperty("transition"), e.removeProperty("transform")
                })
              ),
              (Ze = e)
          }
          function ut() {
            return Fe.scrollHeight > Fe.clientHeight
          }
          function dt(e) {
            const t = ut() && Math.min(1, Math.max(0, e - Be, Ne - e) / De)
            return (
              !t && Ke && mt(),
              t && !Ke && ((Ke = setInterval(pt, He)), Re.forEach((e) => p(e, gt, !0))),
              (Je = t && (e > Be ? 1 : -1) * ((1 + t * $e) | 0)),
              (Ge = v.now()),
              !!t
            )
          }
          function pt() {
            const e = v.now(),
              t = (Je * (e - Ge)) / He
            ;(Fe.scrollTop += t), (Ge = e)
          }
          function mt() {
            Re.forEach((e) => m(e, gt, !0)), Ke && clearInterval(Ke), (Ke = 0)
          }
          function gt(e) {
            e.stopPropagation()
          }
          function vt(e, t) {
            var n
            const l = `${e}:${t}`
            return Xe[l] || (Xe[l] = null == (n = document.elementFromPoint(e, t)) ? void 0 : n.closest(ze))
          }
          function ht(e) {
            return (Le = e.target.closest(ze)), Le
          }
          const ft = ["tabIndex"],
            wt = { class: "script-icon hidden-xs" },
            bt = ["href", "data-hotkey"],
            yt = ["src", "data-no-icon"],
            xt = { class: "script-info-1 ellipsis" },
            Ct = ["textContent", "data-order"],
            _t = { key: 0, class: "script-tags" },
            kt = ["textContent", "onClick", "data-tag"],
            St = (0, ce._)("a", null, "...", -1),
            Ut = ["textContent", "onClick", "data-tag"],
            zt = { class: "script-info flex ml-1c" },
            Dt = ["href", "textContent", "tabIndex"],
            $t = ["textContent"],
            Ht = ["textContent"],
            jt = { class: "script-buttons script-buttons-left" },
            Wt = ["href", "data-hotkey", "tabIndex"],
            It = ["data-hotkey", "tabIndex"],
            Rt = ["data-hotkey", "tabIndex"],
            Tt = (0, ce._)("span", { class: "sep" }, null, -1),
            Mt = ["tabIndex"],
            Ot = ["href", "tabIndex"],
            Et = ["textContent", "title"],
            Zt = { class: "script-buttons script-buttons-right" },
            Vt = ["data-hotkey", "tabIndex"],
            Yt = ["data-hotkey", "tabIndex"],
            Pt = {
              props: ["script", "visible", "viewTable", "focused", "hotkeys", "showHotkeys", "activeTags"],
              components: { Dropdown: Ce.Z, Icon: Se.Z, Tooltip: _e.Z },
              data() {
                return { canRender: this.visible }
              },
              computed: {
                showRecycle: () => P.route.paths[0] === k,
                author() {
                  const e = this.script.meta.author
                  if (!e) return
                  const t = e.match(/^(.*?)\s<(\S*?@\S*?)>$/)
                  return { email: t && t[2], name: t ? t[1] : e }
                },
                tags() {
                  var e
                  return (null == (e = this.script.custom.tags) ? void 0 : e.split(" ").filter(r)) || []
                },
                labelEnable() {
                  return this.script.config.enabled ? this.i18n("buttonDisable") : this.i18n("buttonEnable")
                },
                description() {
                  return this.script.custom[N] || (0, D.iQ)(this.script.meta, N)
                },
                updatedAt() {
                  const { props: e, config: t } = this.script,
                    n = {}
                  let l
                  if ((t.removed ? ({ lastModified: l } = e) : (l = e.lastUpdated || e.lastModified), l)) {
                    const e = new Date(l)
                    ;(n.show = (0, D.mr)(Date.now() - l)),
                      t.removed
                        ? (n.title = this.i18n("labelRemovedAt", e.toLocaleString()))
                        : (n.title = this.i18n("labelLastUpdatedAt", e.toLocaleString()))
                  }
                  return n
                },
                tabIndex() {
                  return this.focused ? 0 : -1
                },
                url() {
                  return `#${this.script.config.removed ? k : o}/${this.script.props.id}`
                },
                urls() {
                  return {
                    home: [(0, D.ag)("buttonHome"), (0, D.t$)(this.script)],
                    question: [(0, D.ag)("buttonSupport"), (0, D.b7)(this.script)],
                  }
                },
              },
              watch: {
                visible(e) {
                  e && (this.canRender = !0)
                },
                focused(e, t) {
                  const { $el: n } = this
                  if (e && !t && n) {
                    const e = n.getBoundingClientRect(),
                      t = n.parentNode.getBoundingClientRect()
                    let l = 0
                    e.bottom > t.bottom - 8
                      ? (l += e.bottom - t.bottom + 8)
                      : e.top < t.top + 8 && (l -= t.top - e.top + 8),
                      (0, we.u7)((0, W.vY)()) || n.focus({ preventScroll: !0 }),
                      this.$emit("scrollDelta", l)
                  }
                },
              },
              methods: {
                onRemove() {
                  this.$emit("remove", this.script)
                },
                onRestore() {
                  this.$emit("restore", this.script)
                },
                onToggle() {
                  this.$emit("toggle", this.script)
                },
                async onUpdate() {
                  ;(-1 !== this.script.$canUpdate || (await (0, W.GW)((0, D.ag)("confirmManualUpdate")))) &&
                    this.$emit("update", this.script)
                },
                onFocus() {
                  we.$J.setContext("scriptFocus", !0)
                },
                onBlur() {
                  we.$J.setContext("scriptFocus", !1)
                },
                onTagClick(e) {
                  this.$emit("clickTag", e)
                },
                toggleTip(e) {
                  ;(0, we.xr)(e.target)
                },
              },
            }
          var At = z(3744)
          const Lt = (0, At.Z)(Pt, [
            [
              "render",
              (e, t, n, l, a, o) => {
                const i = (0, ce.up)("Dropdown"),
                  s = (0, ce.up)("icon"),
                  r = (0, ce.up)("tooltip")
                return (
                  (0, ce.wg)(),
                  (0, ce.iD)(
                    "div",
                    {
                      class: (0, ue.C_)([
                        "script",
                        {
                          disabled: !n.script.config.enabled,
                          removed: n.script.config.removed,
                          error: n.script.error,
                          focused: n.focused,
                          hotkeys: n.focused && n.showHotkeys,
                        },
                      ]),
                      tabIndex: o.tabIndex,
                      onFocus: t[5] || (t[5] = (...e) => o.onFocus && o.onFocus(...e)),
                      onBlur: t[6] || (t[6] = (...e) => o.onBlur && o.onBlur(...e)),
                    },
                    [
                      (0, ce._)("div", wt, [
                        (0, ce._)(
                          "a",
                          { href: o.url, "data-hotkey": n.hotkeys.edit, "data-hotkey-table": "", tabIndex: "-1" },
                          [(0, ce._)("img", { src: n.script.safeIcon, "data-no-icon": n.script.noIcon }, null, 8, yt)],
                          8,
                          bt
                        ),
                      ]),
                      (0, ce._)("div", xt, [
                        (0, ce._)(
                          "a",
                          (0, ce.dG)(
                            { textContent: (0, ue.zw)(n.script.$cache.name) },
                            n.viewTable && { draggable: !1, href: o.url, tabIndex: o.tabIndex },
                            {
                              "data-order": n.script.config.removed ? null : n.script.props.position,
                              class: "script-name ellipsis",
                            }
                          ),
                          null,
                          16,
                          Ct
                        ),
                        a.canRender
                          ? ((0, ce.wg)(),
                            (0, ce.iD)("div", _t, [
                              ((0, ce.wg)(!0),
                              (0, ce.iD)(
                                ce.HY,
                                null,
                                (0, ce.Ko)(o.tags.slice(0, 2), (e, t) => {
                                  var l
                                  return (
                                    (0, ce.wg)(),
                                    (0, ce.iD)(
                                      "a",
                                      {
                                        key: t,
                                        textContent: (0, ue.zw)(`#${e}`),
                                        onClick: (0, be.iM)((t) => o.onTagClick(e), ["prevent"]),
                                        class: (0, ue.C_)({
                                          active: null == (l = n.activeTags) ? void 0 : l.includes(e),
                                        }),
                                        "data-tag": e,
                                      },
                                      null,
                                      10,
                                      kt
                                    )
                                  )
                                }),
                                128
                              )),
                              o.tags.length > 2
                                ? ((0, ce.wg)(),
                                  (0, ce.j4)(
                                    i,
                                    { key: 0 },
                                    {
                                      content: (0, ce.w5)(() => [
                                        ((0, ce.wg)(!0),
                                        (0, ce.iD)(
                                          ce.HY,
                                          null,
                                          (0, ce.Ko)(o.tags.slice(2), (e, t) => {
                                            var l
                                            return (
                                              (0, ce.wg)(),
                                              (0, ce.iD)(
                                                "a",
                                                {
                                                  key: t,
                                                  class: (0, ue.C_)([
                                                    "dropdown-menu-item",
                                                    { active: null == (l = n.activeTags) ? void 0 : l.includes(e) },
                                                  ]),
                                                  textContent: (0, ue.zw)(`#${e}`),
                                                  onClick: (0, be.iM)((t) => o.onTagClick(e), ["prevent"]),
                                                  "data-tag": e,
                                                },
                                                null,
                                                10,
                                                Ut
                                              )
                                            )
                                          }),
                                          128
                                        )),
                                      ]),
                                      default: (0, ce.w5)(() => [St]),
                                      _: 1,
                                    }
                                  ))
                                : (0, ce.kq)("", !0),
                            ]))
                          : (0, ce.kq)("", !0),
                      ]),
                      (0, ce._)("div", zt, [
                        a.canRender
                          ? ((0, ce.wg)(),
                            (0, ce.iD)(
                              ce.HY,
                              { key: 0 },
                              [
                                o.author
                                  ? ((0, ce.wg)(),
                                    (0, ce.j4)(
                                      r,
                                      {
                                        key: 0,
                                        content: e.i18n("labelAuthor") + n.script.meta.author,
                                        class: "script-author ml-1c hidden-sm",
                                        align: "end",
                                      },
                                      {
                                        default: (0, ce.w5)(() => [
                                          (0, ce.Wm)(s, { name: "author" }),
                                          o.author.email
                                            ? ((0, ce.wg)(),
                                              (0, ce.iD)(
                                                "a",
                                                {
                                                  key: 0,
                                                  class: "ellipsis",
                                                  href: `mailto:${o.author.email}`,
                                                  textContent: (0, ue.zw)(o.author.name),
                                                  tabIndex: o.tabIndex,
                                                },
                                                null,
                                                8,
                                                Dt
                                              ))
                                            : ((0, ce.wg)(),
                                              (0, ce.iD)(
                                                "span",
                                                { key: 1, class: "ellipsis", textContent: (0, ue.zw)(o.author.name) },
                                                null,
                                                8,
                                                $t
                                              )),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, ce.kq)("", !0),
                                (0, ce._)(
                                  "span",
                                  { class: "version ellipsis", textContent: (0, ue.zw)(n.script.meta.version) },
                                  null,
                                  8,
                                  Ht
                                ),
                                n.script.config.removed
                                  ? (0, ce.kq)("", !0)
                                  : ((0, ce.wg)(),
                                    (0, ce.j4)(
                                      r,
                                      { key: 1, class: "size hidden-sm", content: n.script.$cache.sizes, align: "end" },
                                      {
                                        default: (0, ce.w5)(() => [(0, ce.Uk)((0, ue.zw)(n.script.$cache.size), 1)]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    )),
                                (0, ce.Wm)(
                                  r,
                                  { class: "updated hidden-sm ml-1c", content: o.updatedAt.title, align: "end" },
                                  { default: (0, ce.w5)(() => [(0, ce.Uk)((0, ue.zw)(o.updatedAt.show), 1)]), _: 1 },
                                  8,
                                  ["content"]
                                ),
                              ],
                              64
                            ))
                          : (0, ce.kq)("", !0),
                      ]),
                      (0, ce._)("div", jt, [
                        a.canRender
                          ? ((0, ce.wg)(),
                            (0, ce.iD)(
                              ce.HY,
                              { key: 0 },
                              [
                                (0, ce.Wm)(
                                  r,
                                  { content: e.i18n("buttonEdit"), align: "start" },
                                  {
                                    default: (0, ce.w5)(() => [
                                      (0, ce._)(
                                        "a",
                                        {
                                          class: "btn-ghost",
                                          href: o.url,
                                          "data-hotkey": n.hotkeys.edit,
                                          tabIndex: o.tabIndex,
                                        },
                                        [(0, ce.Wm)(s, { name: "code" })],
                                        8,
                                        Wt
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["content"]
                                ),
                                n.script.config.removed
                                  ? (0, ce.kq)("", !0)
                                  : ((0, ce.wg)(),
                                    (0, ce.iD)(
                                      ce.HY,
                                      { key: 0 },
                                      [
                                        (0, ce.Wm)(
                                          r,
                                          { content: o.labelEnable, align: "start" },
                                          {
                                            default: (0, ce.w5)(() => [
                                              (0, ce._)(
                                                "a",
                                                {
                                                  class: "btn-ghost",
                                                  onClick: t[0] || (t[0] = (...e) => o.onToggle && o.onToggle(...e)),
                                                  "data-hotkey": n.hotkeys.toggle,
                                                  tabIndex: o.tabIndex,
                                                },
                                                [
                                                  (0, ce.Wm)(
                                                    s,
                                                    { name: "toggle-" + (n.script.config.enabled ? "on" : "off") },
                                                    null,
                                                    8,
                                                    ["name"]
                                                  ),
                                                ],
                                                8,
                                                It
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ["content"]
                                        ),
                                        (0, ce.Wm)(
                                          r,
                                          {
                                            disabled: !n.script.$canUpdate || n.script.checking,
                                            content: e.i18n("updateScript"),
                                            align: "start",
                                          },
                                          {
                                            default: (0, ce.w5)(() => [
                                              (0, ce._)(
                                                "a",
                                                {
                                                  class: "btn-ghost",
                                                  onClick: t[1] || (t[1] = (...e) => o.onUpdate && o.onUpdate(...e)),
                                                  "data-hotkey": n.hotkeys.update,
                                                  tabIndex: n.script.$canUpdate ? o.tabIndex : -1,
                                                },
                                                [
                                                  (0, ce.Wm)(
                                                    s,
                                                    {
                                                      name: "refresh",
                                                      "^invert": -1 === n.script.$canUpdate ? "" : null,
                                                    },
                                                    null,
                                                    8,
                                                    ["^invert"]
                                                  ),
                                                ],
                                                8,
                                                Rt
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ["disabled", "content"]
                                        ),
                                      ],
                                      64
                                    )),
                                Tt,
                                (0, ce.Wm)(
                                  r,
                                  { disabled: !o.description, content: o.description, align: "start" },
                                  {
                                    default: (0, ce.w5)(() => [
                                      (0, ce._)(
                                        "a",
                                        {
                                          class: "btn-ghost",
                                          tabIndex: o.description ? o.tabIndex : -1,
                                          onClick: t[2] || (t[2] = (...e) => o.toggleTip && o.toggleTip(...e)),
                                        },
                                        [(0, ce.Wm)(s, { name: "info" })],
                                        8,
                                        Mt
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["disabled", "content"]
                                ),
                                ((0, ce.wg)(!0),
                                (0, ce.iD)(
                                  ce.HY,
                                  null,
                                  (0, ce.Ko)(
                                    o.urls,
                                    ([e, t], n) => (
                                      (0, ce.wg)(),
                                      (0, ce.j4)(
                                        r,
                                        { key: n, disabled: !t, content: e, align: "start" },
                                        {
                                          default: (0, ce.w5)(() => [
                                            (0, ce._)(
                                              "a",
                                              {
                                                class: "btn-ghost",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                href: t,
                                                tabIndex: t ? o.tabIndex : -1,
                                              },
                                              [(0, ce.Wm)(s, { name: n }, null, 8, ["name"])],
                                              8,
                                              Ot
                                            ),
                                          ]),
                                          _: 2,
                                        },
                                        1032,
                                        ["disabled", "content"]
                                      )
                                    )
                                  ),
                                  128
                                )),
                                n.script.message
                                  ? ((0, ce.wg)(),
                                    (0, ce.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "script-message",
                                        textContent: (0, ue.zw)(n.script.message),
                                        title: n.script.error,
                                      },
                                      null,
                                      8,
                                      Et
                                    ))
                                  : (0, ce.kq)("", !0),
                              ],
                              64
                            ))
                          : (0, ce.kq)("", !0),
                      ]),
                      (0, ce._)("div", Zt, [
                        a.canRender
                          ? ((0, ce.wg)(),
                            (0, ce.iD)(
                              ce.HY,
                              { key: 0 },
                              [
                                o.showRecycle || !n.script.config.removed
                                  ? ((0, ce.wg)(),
                                    (0, ce.j4)(
                                      r,
                                      { key: 0, content: e.i18n("buttonRemove"), align: "end" },
                                      {
                                        default: (0, ce.w5)(() => [
                                          (0, ce._)(
                                            "a",
                                            {
                                              class: (0, ue.C_)([
                                                "btn-ghost",
                                                { "btn-danger": n.script.config.removed },
                                              ]),
                                              onClick: t[3] || (t[3] = (...e) => o.onRemove && o.onRemove(...e)),
                                              "data-hotkey": n.hotkeys.remove,
                                              tabIndex: o.tabIndex,
                                            },
                                            [(0, ce.Wm)(s, { name: "trash" })],
                                            10,
                                            Vt
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, ce.kq)("", !0),
                                n.script.config.removed
                                  ? ((0, ce.wg)(),
                                    (0, ce.j4)(
                                      r,
                                      { key: 1, content: e.i18n("buttonRestore"), placement: "left" },
                                      {
                                        default: (0, ce.w5)(() => [
                                          (0, ce._)(
                                            "a",
                                            {
                                              class: "btn-ghost",
                                              onClick: t[4] || (t[4] = (...e) => o.onRestore && o.onRestore(...e)),
                                              "data-hotkey": n.hotkeys.restore,
                                              tabIndex: o.tabIndex,
                                            },
                                            [(0, ce.Wm)(s, { name: "undo" })],
                                            8,
                                            Yt
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, ce.kq)("", !0),
                              ],
                              64
                            ))
                          : (0, ce.kq)("", !0),
                      ]),
                    ],
                    42,
                    ft
                  )
                )
              },
            ],
          ])
          var Ft = z(206),
            qt = z(6115),
            Nt = z(715)
          const Bt = { class: "form-group condensed" },
            Kt = ["textContent"],
            Jt = ["textContent"],
            Gt = ["textContent"],
            Xt = ["disabled"],
            Qt = ["textContent"],
            en = ["textContent"],
            tn = {
              __name: "settings-update",
              props: { script: u },
              setup(e) {
                const t = e,
                  n = (0, ce.Fl)(() => t.script.config),
                  l = (0, ce.Fl)(() => !t.script._remote)
                return (e, t) => (
                  (0, ce.wg)(),
                  (0, ce.iD)("div", null, [
                    (0, ce._)("div", Bt, [
                      (0, ce._)("label", null, [
                        (0, ce.wy)(
                          (0, ce._)(
                            "input",
                            (0, ce.dG)(
                              {
                                type: "checkbox",
                                "onUpdate:modelValue": t[0] || (t[0] = (e) => (n.value.shouldUpdate = e)),
                              },
                              { disabled: l.value }
                            ),
                            null,
                            16
                          ),
                          [[be.e8, n.value.shouldUpdate]]
                        ),
                        (0, ce._)("span", { textContent: (0, ue.zw)(e.i18n("labelAllowUpdate")) }, null, 8, Kt),
                        (0, ce._)(
                          "span",
                          { textContent: (0, ue.zw)(e.i18n("labelNotifyThisUpdated")), class: "melt" },
                          null,
                          8,
                          Jt
                        ),
                      ]),
                      ((0, ce.wg)(!0),
                      (0, ce.iD)(
                        ce.HY,
                        null,
                        (0, ce.Ko)(
                          [
                            [e.i18n("genericOn"), "1"],
                            [e.i18n("genericOff"), "0"],
                            [e.i18n("genericUseGlobal"), ""],
                          ],
                          ([e, a]) => (
                            (0, ce.wg)(),
                            (0, ce.iD)("label", { class: "ml-1 melt", key: a }, [
                              (0, ce.wy)(
                                (0, ce._)(
                                  "input",
                                  (0, ce.dG)(
                                    { type: "radio" },
                                    { value: a, disabled: l.value },
                                    { "onUpdate:modelValue": t[1] || (t[1] = (e) => (n.value.notifyUpdates = e)) }
                                  ),
                                  null,
                                  16
                                ),
                                [[be.G2, n.value.notifyUpdates]]
                              ),
                              (0, ce.Uk)(),
                              (0, ce._)("span", { textContent: (0, ue.zw)(e) }, null, 8, Gt),
                            ])
                          )
                        ),
                        128
                      )),
                    ]),
                    (0, ce._)("label", null, [
                      (0, ce.wy)(
                        (0, ce._)(
                          "input",
                          {
                            type: "checkbox",
                            "onUpdate:modelValue": t[2] || (t[2] = (e) => (n.value._editable = e)),
                            class: "scary-switch",
                            disabled: l.value || !n.value.shouldUpdate,
                          },
                          null,
                          8,
                          Xt
                        ),
                        [[be.e8, n.value._editable]]
                      ),
                      (0, ce._)("span", { textContent: (0, ue.zw)(e.i18n("readonlyOpt")) }, null, 8, Qt),
                      (0, ce.Uk)(),
                      (0, ce._)("span", { textContent: (0, ue.zw)(e.i18n("readonlyOptWarn")) }, null, 8, en),
                    ]),
                  ])
                )
              },
            },
            nn = { class: "edit-settings" },
            ln = ["textContent"],
            an = { class: "mb-2" },
            on = ["textContent"],
            sn = ["textContent"],
            rn = ["disabled"],
            cn = ["textContent"],
            un = (0, ce._)("td", null, [(0, ce._)("code", null, "@run-at")], -1),
            dn = ["textContent"],
            pn = ["disabled"],
            mn = ["textContent"],
            gn = (0, ce._)("option", { value: "document-start" }, "document-start", -1),
            vn = (0, ce._)("option", { value: "document-body" }, "document-body", -1),
            hn = (0, ce._)("option", { value: "document-end" }, "document-end", -1),
            fn = (0, ce._)("option", { value: "document-idle" }, "document-idle", -1),
            wn = (0, ce._)(
              "td",
              null,
              [
                (0, ce._)("code", null, [
                  (0, ce.Uk)("@"),
                  (0, ce._)("s", { style: { color: "var(--fill-6)" } }, "no"),
                  (0, ce.Uk)("frames"),
                ]),
              ],
              -1
            ),
            bn = ["textContent"],
            yn = ["disabled"],
            xn = ["textContent"],
            Cn = ["textContent"],
            _n = ["textContent"],
            kn = (0, ce._)("td", null, [(0, ce._)("code", null, "@inject-into")], -1),
            Sn = ["textContent"],
            Un = ["disabled"],
            zn = ["textContent"],
            Dn = ["textContent"],
            $n = ["textContent"],
            Hn = ["textContent"],
            jn = ["onUpdate:modelValue", "placeholder", "disabled"],
            Wn = ["textContent"],
            In = ["textContent"],
            Rn = ["textContent"],
            Tn = ["onUpdate:modelValue", "disabled"],
            Mn = ["textContent"],
            On = ["onUpdate:modelValue", "rows", "disabled"],
            En = {
              __name: "settings",
              props: { script: u, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, R.XI)(Nt.Wg),
                  l = (e) => {
                    var t
                    return (null == (t = e.match(/^(.*?)(@[-a-z]+)(.*)/)) ? void 0 : t.slice(1)) || [e, "", ""]
                  },
                  a = (0, ce.Fl)(() => t.script.config),
                  o = (0, ce.Fl)(() => t.script.custom),
                  i = (0, ce.Fl)(() => {
                    const { script: e } = t,
                      { meta: n } = e
                    return {
                      ...(0, xe.zr)(n, [J, G]),
                      [K]: (0, D.t$)(e),
                      [le]: n[le] || (0, D.ag)("hintUseDownloadURL"),
                      [B]: n[B] || e.custom.lastInstallURL,
                    }
                  }),
                  s = [
                    [G, (0, D.ag)("labelName")],
                    [K, (0, D.ag)("labelHomepageURL")],
                    [le, (0, D.ag)("labelUpdateURL")],
                    [B, (0, D.ag)("labelDownloadURL")],
                    [J, (0, D.ag)("labelIconURL")],
                  ],
                  r = [
                    [A, ee, ...l((0, D.ag)("labelInclude"))],
                    [L, te, ...l((0, D.ag)("labelMatch"))],
                    [F, X, ...l((0, D.ag)("labelExclude"))],
                    [q, Q, ...l((0, D.ag)("labelExcludeMatch"))],
                  ]
                return (t, l) => (
                  (0, ce.wg)(),
                  (0, ce.iD)("div", nn, [
                    (0, ce._)("h4", { textContent: (0, ue.zw)((0, R.SU)(D.ag)("editLabelSettings")) }, null, 8, ln),
                    (0, ce._)("div", an, [
                      (0, ce._)("label", null, [
                        (0, ce.wy)(
                          (0, ce._)(
                            "input",
                            { type: "checkbox", "onUpdate:modelValue": l[0] || (l[0] = (e) => (a.value.enabled = e)) },
                            null,
                            512
                          ),
                          [[be.e8, a.value.enabled]]
                        ),
                        (0, ce._)("span", { textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonEnable")) }, null, 8, on),
                      ]),
                    ]),
                    (0, ce.Wm)((0, R.SU)(tn), (0, ue.vs)((0, ce.F4)({ script: e.script })), null, 16),
                    (0, ce._)("table", null, [
                      (0, ce._)("tr", null, [
                        (0, ce._)("td", { textContent: (0, ue.zw)((0, R.SU)(D.ag)("labelTags")) }, null, 8, sn),
                        (0, ce._)("td", null, [
                          (0, ce.wy)(
                            (0, ce._)(
                              "input",
                              {
                                type: "text",
                                "onUpdate:modelValue": l[1] || (l[1] = (e) => (o.value.tags = e)),
                                disabled: e.readOnly,
                              },
                              null,
                              8,
                              rn
                            ),
                            [[be.nr, o.value.tags]]
                          ),
                        ]),
                      ]),
                    ]),
                    (0, ce._)("h4", { textContent: (0, ue.zw)((0, R.SU)(D.ag)("editLabelMeta")) }, null, 8, cn),
                    (0, ce._)("table", null, [
                      (0, ce._)("tr", null, [
                        un,
                        (0, ce._)("td", null, [
                          (0, ce._)("p", { textContent: (0, ue.zw)((0, R.SU)(D.ag)("labelRunAt")) }, null, 8, dn),
                        ]),
                        (0, ce._)("td", null, [
                          (0, ce.wy)(
                            (0, ce._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[2] || (l[2] = (e) => (o.value.runAt = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, ce._)(
                                  "option",
                                  { value: "", textContent: (0, ue.zw)((0, R.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  mn
                                ),
                                gn,
                                vn,
                                hn,
                                fn,
                              ],
                              8,
                              pn
                            ),
                            [[be.bM, o.value.runAt]]
                          ),
                        ]),
                      ]),
                      (0, ce._)("tr", null, [
                        wn,
                        (0, ce._)("td", null, [
                          (0, ce._)("p", { textContent: (0, ue.zw)((0, R.SU)(D.ag)("labelNoFrames")) }, null, 8, bn),
                        ]),
                        (0, ce._)("td", null, [
                          (0, ce.wy)(
                            (0, ce._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[3] || (l[3] = (e) => (o.value.noframes = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, ce._)(
                                  "option",
                                  { value: "", textContent: (0, ue.zw)((0, R.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  xn
                                ),
                                (0, ce._)(
                                  "option",
                                  { value: "0", textContent: (0, ue.zw)((0, R.SU)(D.ag)("genericOn")) },
                                  null,
                                  8,
                                  Cn
                                ),
                                (0, ce._)(
                                  "option",
                                  { value: "1", textContent: (0, ue.zw)((0, R.SU)(D.ag)("genericOff")) },
                                  null,
                                  8,
                                  _n
                                ),
                              ],
                              8,
                              yn
                            ),
                            [[be.bM, o.value.noframes]]
                          ),
                        ]),
                      ]),
                      (0, ce._)("tr", null, [
                        kn,
                        (0, ce._)("td", null, [
                          (0, ce._)(
                            "p",
                            { textContent: (0, ue.zw)((0, R.SU)(D.ag)("labelInjectionMode")) },
                            null,
                            8,
                            Sn
                          ),
                        ]),
                        (0, ce._)("td", null, [
                          (0, ce.wy)(
                            (0, ce._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[4] || (l[4] = (e) => (o.value.injectInto = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, ce._)(
                                  "option",
                                  { value: "", textContent: (0, ue.zw)((0, R.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  zn
                                ),
                                ((0, ce.wg)(!0),
                                (0, ce.iD)(
                                  ce.HY,
                                  null,
                                  (0, ce.Ko)(
                                    n.value,
                                    (e, t) => (
                                      (0, ce.wg)(),
                                      (0, ce.iD)("option", { key: t, textContent: (0, ue.zw)(t) }, null, 8, Dn)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              Un
                            ),
                            [[be.bM, o.value.injectInto]]
                          ),
                        ]),
                      ]),
                      ((0, ce.wg)(),
                      (0, ce.iD)(
                        ce.HY,
                        null,
                        (0, ce.Ko)(s, ([t, n]) =>
                          (0, ce._)("tr", { key: t }, [
                            (0, ce._)("td", null, [
                              (0, ce._)("code", { textContent: (0, ue.zw)(`@${t}`) }, null, 8, $n),
                            ]),
                            (0, ce._)("td", null, [(0, ce._)("p", { textContent: (0, ue.zw)(n) }, null, 8, Hn)]),
                            (0, ce._)("td", null, [
                              (0, ce.wy)(
                                (0, ce._)(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": (e) => (o.value[t] = e),
                                    placeholder: i.value[t],
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  jn
                                ),
                                [[be.nr, o.value[t]]]
                              ),
                            ]),
                          ])
                        ),
                        64
                      )),
                    ]),
                    (0, ce._)("table", null, [
                      ((0, ce.wg)(),
                      (0, ce.iD)(
                        ce.HY,
                        null,
                        (0, ce.Ko)(r, ([n, l, a, i, s]) =>
                          (0, ce._)("tr", { key: n }, [
                            (0, ce._)("td", null, [
                              (0, ce._)("p", null, [
                                (0, ce._)("span", { textContent: (0, ue.zw)(a) }, null, 8, Wn),
                                (0, ce._)("code", { textContent: (0, ue.zw)(i) }, null, 8, In),
                                (0, ce._)("span", { textContent: (0, ue.zw)(s) }, null, 8, Rn),
                              ]),
                              (0, ce._)("label", null, [
                                (0, ce.wy)(
                                  (0, ce._)(
                                    "input",
                                    {
                                      type: "checkbox",
                                      "onUpdate:modelValue": (e) => (o.value[l] = e),
                                      disabled: e.readOnly,
                                    },
                                    null,
                                    8,
                                    Tn
                                  ),
                                  [[be.e8, o.value[l]]]
                                ),
                                (0, ce._)(
                                  "span",
                                  { textContent: (0, ue.zw)((0, R.SU)(D.ag)("labelKeepOriginal")) },
                                  null,
                                  8,
                                  Mn
                                ),
                              ]),
                            ]),
                            (0, ce._)("td", null, [
                              (0, ce.wy)(
                                (0, ce._)(
                                  "textarea",
                                  {
                                    "onUpdate:modelValue": (e) => (o.value[n] = e),
                                    spellcheck: "false",
                                    rows: t.calcRows(o.value[n]),
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  On
                                ),
                                [[be.nr, o.value[n]]]
                              ),
                            ]),
                          ])
                        ),
                        64
                      )),
                    ]),
                  ])
                )
              },
            }
          var Zn = z(4631),
            Vn = z.n(Zn),
            Yn = z(2274)
          const Pn = ["data-editing"],
            An = { class: "flex-1 flex flex-col" },
            Ln = { class: "mb-1 flex center-items" },
            Fn = ["textContent"],
            qn = { class: "btn-ghost", tabindex: "0" },
            Nn = (0, ce._)(
              "li",
              null,
              [(0, ce._)("kbd", null, "PageUp"), (0, ce.Uk)(", "), (0, ce._)("kbd", null, "PageDown")],
              -1
            ),
            Bn = (0, ce._)(
              "li",
              null,
              [
                (0, ce._)("kbd", null, "\u2191"),
                (0, ce.Uk)(", "),
                (0, ce._)("kbd", null, "\u2193"),
                (0, ce.Uk)(", "),
                (0, ce._)("kbd", null, "Tab"),
                (0, ce.Uk)(", "),
                (0, ce._)("kbd", null, "Shift-Tab"),
              ],
              -1
            ),
            Kn = (0, ce._)("kbd", null, "Enter", -1),
            Jn = { key: 0 },
            Gn = (0, ce._)("kbd", null, "Ctrl-Del", -1),
            Xn = ["onKeydown"],
            Qn = ["textContent"],
            el = ["onKeydown", "onClick"],
            tl = { class: "ellipsis" },
            nl = ["textContent"],
            ll = ["textContent"],
            al = ["textContent"],
            ol = ["onClick"],
            il = ["textContent"],
            sl = ["textContent"],
            rl = ["onKeydown"],
            cl = ["onClick"],
            ul = ["textContent"],
            dl = ["textContent"],
            pl = ["textContent"],
            ml = { key: 0, class: "edit-values-panel flex flex-col flex-1 mb-1c" },
            gl = { class: "control" },
            vl = ["textContent"],
            hl = { class: "flex center-items" },
            fl = ["textContent", "onClick", "title", "disabled"],
            wl = ["textContent"],
            bl = ["innerHTML"],
            yl = ["textContent"],
            xl = ["readOnly", "onKeydown"],
            Cl = ["textContent"],
            _l = {
              __name: "values",
              props: { script: u, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, R.iH)(),
                  l = (0, R.iH)(),
                  a = (0, R.iH)(),
                  o = (0, R.iH)(),
                  i = (0, R.iH)(),
                  s = (0, R.iH)(),
                  r = (0, R.iH)(),
                  c = (0, R.iH)(!0),
                  d = (0, R.iH)(),
                  h = (0, R.iH)(),
                  f = (0, R.iH)(),
                  b = (0, ce.Fl)(() => q(u.values(f.value), "key")),
                  y = { error: "", dirty: !1 },
                  x = (e) => (e.length > 1024 ? e.slice(0, 1024) : e),
                  C = (e) => {
                    try {
                      return JSON.stringify(JSON.parse(e), null, E)
                    } catch (t) {
                      return e
                    }
                  },
                  _ = { condition: "!edit" },
                  k = (e) => we.$J.setContext("edit", "selectionEnd" in e.target),
                  U = (0, ce.Fl)(() => u.keys(h.value || {}).sort()),
                  z = (0, ce.Fl)(() => Math.ceil(U.value.length / 25)),
                  $ = (0, ce.Fl)(() => {
                    const e = 25 * (d.value - 1),
                      t = U.value.slice(e, e + 25)
                    return (t.style = q(t)), t
                  })
                let H,
                  j,
                  I,
                  T,
                  M,
                  O,
                  E = "  "
                function Z(e) {
                  ;(0, ce.Y3)(() => {
                    l.value[e ? "click" : "focus"]()
                  })
                }
                function V(e) {
                  d.value = Math.max(1, Math.min(z.value, d.value + e))
                }
                function Y(e, t) {
                  const n = e.length + (h.value[e] || t).length - 1
                  return n < 1e4 ? n : (0, D.aj)(n)
                }
                function P(e, t, n) {
                  let l = h.value[e] || n
                  const a = l[0]
                  return (l = l.slice(1)), "s" === a ? (l = JSON.stringify(l)) : t || (l = C(l)), t ? x(l) : l
                }
                function A() {
                  return `{\n${E}${U.value
                    .map((e) => `${JSON.stringify(e)}: ${P(e)}`)
                    .join(",\n")
                    .replace(/\n/g, "\n" + E)}\n}`
                }
                function L(e, t) {
                  null != e || (e = {})
                  const n = h.value
                  let l
                  if (
                    (t
                      ? (w(xe.LI, n, ([t, n]) => {
                          n !== e[t] && (K(t), (l = !0))
                        }),
                        null != l || (l = !0))
                      : (l = !(0, xe.vZ)(n, e)),
                    l)
                  )
                    return (h.value = e), (d.value = Math.min(d.value, z.value) || 1), F(), !0
                }
                function F() {
                  const { script: e } = t,
                    { $cache: n = (e.$cache = {}) } = e,
                    l = U.value.reduce((e, t) => e + t.length + 4 + h.value[t].length + 2, 0)
                  n[ne] = l ? l + 2 : l
                }
                function q(e, t) {
                  let n = 0
                  for (let l = 0; l < e.length; l++) {
                    const a = e[l]
                    n = Math.max(n, (t ? a[t] : a).length)
                  }
                  return { "--keyW": `${n}ch` }
                }
                async function N({ key: e, jsonValue: n, rawValue: l = (0, D.bd)(n) || "" }, a) {
                  a && U.value.includes(e) && K(e)
                  const { id: o } = t.script.props
                  await (0, D.gj)("UpdateValue", { [o]: { [e]: l } }, void 0, M),
                    l ? (h.value[e] = l) : delete h.value[e],
                    F()
                }
                function B() {
                  r.value = { isNew: !0, key: "", value: "", ...y }
                }
                function K(e, t = h.value[e], n = P(e, !0), l = Y(e, t)) {
                  ;(f.value || (f.value = {}))[e + Math.random()] = { key: e, rawValue: t, cut: n, len: l }
                }
                function J(e) {
                  var n
                  t.readOnly ||
                    (N({ key: e }), K(e), (null == (n = r.value) ? void 0 : n.key) === e && (r.value = null))
                }
                function G(e) {
                  const t = f.value,
                    n = t[e]
                  delete t[e], (0, D.xb)(t) && (f.value = null), N(n)
                }
                function X(e) {
                  r.value = { key: e, value: P(e), ...y }
                }
                function Q() {
                  r.value = { isAll: !0, value: A(), ...y }
                }
                async function ee(e) {
                  const n = r.value
                  if ((n.jsonPaused && ((n.jsonPaused = !1), le()), n.error)) {
                    const e = n.errorPos
                    return (
                      H.setSelection(e, { line: e.line, ch: e.ch + 1 }), H.focus(), void (0, W.PV)({ text: n.error })
                    )
                  }
                  if ((1 === e ? (H.markClean(), (n.dirty = !1)) : (r.value = null), n.isAll)) {
                    const e = w(xe.Xw, n.jsonValue, (e) => (0, D.bd)(e) || "")
                    await (0, D.gj)("SetValueStores", { [t.script.props.id]: e }), L(e, !0)
                  } else await N(n, !0)
                }
                function te() {
                  const e = r.value
                  if (e.dirty) {
                    const t = H.getValue().trim(),
                      { jsonValue: n = t } = e
                    K(e.key, (0, D.bd)(n), x(t))
                  }
                  r.value = null
                }
                function le(e) {
                  const t = r.value
                  ;(t.dirty = e), (t.error = null)
                  const n = v.now(),
                    l = H.getValue().trim()
                  try {
                    if (t.isAll && "{" !== l[0]) throw "Expected { at position 0"
                    if (t.jsonPaused) return
                    t.jsonValue = JSON.parse(l)
                  } catch (e) {
                    const n = /(position\s+)(\d+)|$/,
                      l = H.posFromIndex(+`${e}`.match(n)[2] || 0)
                    ;(t.error = `${e}`.replace(n, `$1${l.line + 1}:${l.ch + 1}`)),
                      (t.errorPos = l),
                      (t.jsonValue = void 0)
                  }
                  t.jsonPaused = v.now() - n > 10
                }
                function oe(e) {
                  Vn().keyName(e) === ae && ee()
                }
                function ie(e) {
                  const t = u.values(e)[0].newValue
                  if (t) {
                    const e = r.value,
                      n = null == e ? void 0 : e.key,
                      l = e && (e.isAll ? A : P)
                    if ((L(t instanceof u ? t : (0, xe.p$)(t)), e)) {
                      const t = l(n)
                      H.getValue() === t ? ((e.isNew = !1), (e.dirty = !1)) : e.dirty || ((e.value = t), le())
                    }
                  } else L(t)
                }
                function se(e) {
                  ;(0, we.nk)(("ArrowDown" === e.key ? 1 : e.target !== l.value && -1) || 0)
                }
                return (
                  (0, ce.dl)(() => {
                    var e
                    const l = n.value,
                      { id: a } = t.script.props,
                      o = (0, D.K0)()
                    w(p, l, "focusin", k),
                      null == (e = r.value ? H : T) || e.focus(),
                      (0, D.gj)("GetValueStore", a, void 0, (M = { tab: { id: Math.random() - 2 }, [S]: 0 })).then(
                        (e) => {
                          const t = !h.value
                          L(e) && t && U.value.length && Z(!0), (c.value = !1)
                        }
                      ),
                      (I = [
                        () => w(m, l, "focusin", k),
                        we.$J.register("pageup", () => V(-1), _),
                        we.$J.register("pagedown", () => V(1), _),
                        (0, ye.Z)("valueEditor", (e) => {
                          if (((j = e), (E = " ".repeat((null == e ? void 0 : e.tabSize) || 2)), H && e))
                            for (const t in e) "mode" !== t && H.setOption(t, e[t])
                        }),
                      ]),
                      (O = g.runtime.connect({
                        name:
                          Nt.vy +
                          JSON.stringify({ cfg: { value: a }, id: null == o ? void 0 : o[Nt.vy](ie), tabId: M.tab.id }),
                      })),
                      o || O.onMessage.addListener(ie),
                      (s.value = !0)
                  }),
                  (0, ce.se)(() => {
                    var e, t
                    ;(s.value = !1),
                      null == (e = I) || e.forEach((e) => e()),
                      null == (t = O) || t.disconnect(),
                      (I = O = null)
                  }),
                  (0, ce.YP)(r, (e, t) => {
                    if (e)
                      (T = (0, W.vY)()),
                        (0, ce.Y3)(() => {
                          const n = o.value
                          if (((H = n.cm), t && n.updateValue(e.value), e.isNew)) {
                            const e = a.value
                            e.setSelectionRange(0, 0), e.focus()
                          } else H.setCursor(0, 0), H.focus()
                        })
                    else if (t) {
                      var n
                      null == (n = T) || n.focus()
                    }
                  }),
                  (0, ce.YP)(d, () => {
                    ;(T = null), Z()
                  }),
                  (t, u) => (
                    (0, ce.wg)(),
                    (0, ce.iD)(
                      "div",
                      { class: "edit-values flex", ref_key: "$el", ref: n, "data-editing": r.value && "" },
                      [
                        (0, ce._)("div", An, [
                          (0, ce._)("nav", Ln, [
                            e.readOnly
                              ? (0, ce.kq)("", !0)
                              : ((0, ce.wg)(),
                                (0, ce.iD)("a", { key: 0, onClick: B, class: "btn-ghost", tabindex: "0" }, [
                                  (0, ce.Wm)((0, R.SU)(Se.Z), { name: "plus" }),
                                ])),
                            z.value > 1
                              ? ((0, ce.wg)(),
                                (0, ce.iD)(
                                  ce.HY,
                                  { key: 1 },
                                  [
                                    (0, ce._)(
                                      "a",
                                      {
                                        onClick: u[0] || (u[0] = (e) => V(-1)),
                                        class: (0, ue.C_)(["btn-ghost", { subtle: 1 === d.value }]),
                                        tabindex: "0",
                                      },
                                      "\u23f4",
                                      2
                                    ),
                                    (0, ce.wy)(
                                      (0, ce._)(
                                        "input",
                                        {
                                          "onUpdate:modelValue": u[1] || (u[1] = (e) => (d.value = e)),
                                          type: "number",
                                          onWheel: u[2] || (u[2] = (e) => V(e.deltaY > 0 ? 1 : -1)),
                                        },
                                        null,
                                        544
                                      ),
                                      [[be.nr, d.value]]
                                    ),
                                    (0, ce._)("span", { textContent: (0, ue.zw)(`\xa0/\xa0${z.value}`) }, null, 8, Fn),
                                    (0, ce._)(
                                      "a",
                                      {
                                        onClick: u[3] || (u[3] = (e) => V(1)),
                                        class: (0, ue.C_)(["btn-ghost", { subtle: d.value >= z.value }]),
                                        tabindex: "0",
                                      },
                                      "\u23f5",
                                      2
                                    ),
                                  ],
                                  64
                                ))
                              : (0, ce.kq)("", !0),
                            (0, ce.Wm)((0, R.SU)(Ce.Z), null, {
                              content: (0, ce.w5)(() => [
                                (0, ce._)("ul", null, [
                                  Nn,
                                  Bn,
                                  (0, ce._)("li", null, [
                                    (0, ce._)("span", null, [
                                      Kn,
                                      (0, ce.Uk)(": " + (0, ue.zw)(t.i18n("buttonEdit")) + ",", 1),
                                    ]),
                                  ]),
                                  e.readOnly
                                    ? (0, ce.kq)("", !0)
                                    : ((0, ce.wg)(),
                                      (0, ce.iD)("li", Jn, [
                                        (0, ce._)("span", null, [
                                          Gn,
                                          (0, ce.Uk)(": " + (0, ue.zw)(t.i18n("buttonRemove")), 1),
                                        ]),
                                      ])),
                                ]),
                              ]),
                              default: (0, ce.w5)(() => [
                                (0, ce._)("a", qn, [(0, ce.Wm)((0, R.SU)(Se.Z), { name: "info" })]),
                              ]),
                              _: 1,
                            }),
                          ]),
                          (0, ce._)(
                            "div",
                            {
                              class: "edit-values-table main",
                              style: (0, ue.j5)($.value.style),
                              onKeydown: [
                                (0, be.D2)((0, be.iM)(se, ["exact"]), ["down"]),
                                (0, be.D2)((0, be.iM)(se, ["exact"]), ["up"]),
                              ],
                            },
                            [
                              (0, ce._)(
                                "a",
                                {
                                  ref_key: "$editAll",
                                  ref: l,
                                  class: "edit-values-row flex",
                                  onClick: Q,
                                  tabindex: "0",
                                  textContent: (0, ue.zw)(t.i18n("editValueAllHint")),
                                },
                                null,
                                8,
                                Qn
                              ),
                              ((0, ce.wg)(!0),
                              (0, ce.iD)(
                                ce.HY,
                                null,
                                (0, ce.Ko)(
                                  $.value,
                                  (t) => (
                                    (0, ce.wg)(),
                                    (0, ce.iD)(
                                      "div",
                                      {
                                        key: t,
                                        class: "edit-values-row flex monospace-font",
                                        onKeydown: (0, be.D2)(
                                          (0, be.iM)((e) => J(t), ["ctrl", "exact"]),
                                          ["delete"]
                                        ),
                                        onClick: (e) => X(t),
                                      },
                                      [
                                        (0, ce._)("div", tl, [
                                          (0, ce._)("a", { textContent: (0, ue.zw)(t), tabindex: "0" }, null, 8, nl),
                                        ]),
                                        (0, ce._)(
                                          "div",
                                          { class: "ellipsis flex-auto", textContent: (0, ue.zw)(P(t, !0)) },
                                          null,
                                          8,
                                          ll
                                        ),
                                        (0, ce._)("pre", { textContent: (0, ue.zw)(Y(t)) }, null, 8, al),
                                        e.readOnly
                                          ? (0, ce.kq)("", !0)
                                          : ((0, ce.wg)(),
                                            (0, ce.iD)(
                                              "div",
                                              { key: 0, class: "del", onClick: (0, be.iM)((e) => J(t), ["stop"]) },
                                              [(0, ce.Wm)((0, R.SU)(Se.Z), { name: "trash" })],
                                              8,
                                              ol
                                            )),
                                      ],
                                      40,
                                      el
                                    )
                                  )
                                ),
                                128
                              )),
                            ],
                            44,
                            Xn
                          ),
                          c.value || U.value.length
                            ? (0, ce.kq)("", !0)
                            : ((0, ce.wg)(),
                              (0, ce.iD)(
                                "div",
                                {
                                  key: 0,
                                  class: "edit-values-empty mt-1",
                                  textContent: (0, ue.zw)(t.i18n("noValues")),
                                },
                                null,
                                8,
                                il
                              )),
                          f.value
                            ? ((0, ce.wg)(),
                              (0, ce.iD)(
                                "h3",
                                { key: 1, textContent: (0, ue.zw)(t.i18n("headerRecycleBin")) },
                                null,
                                8,
                                sl
                              ))
                            : (0, ce.kq)("", !0),
                          f.value
                            ? ((0, ce.wg)(),
                              (0, ce.iD)(
                                "div",
                                {
                                  key: 2,
                                  class: "edit-values-table trash monospace-font",
                                  onKeydown: [
                                    (0, be.D2)((0, be.iM)(se, ["exact"]), ["down"]),
                                    (0, be.D2)((0, be.iM)(se, ["exact"]), ["up"]),
                                  ],
                                  style: (0, ue.j5)(b.value),
                                },
                                [
                                  ((0, ce.wg)(!0),
                                  (0, ce.iD)(
                                    ce.HY,
                                    null,
                                    (0, ce.Ko)(
                                      f.value,
                                      ({ key: e, cut: t, len: n }, l) => (
                                        (0, ce.wg)(),
                                        (0, ce.iD)(
                                          "div",
                                          { key: l, class: "edit-values-row flex", onClick: (e) => G(l) },
                                          [
                                            (0, ce._)(
                                              "a",
                                              { class: "ellipsis", textContent: (0, ue.zw)(e), tabindex: "0" },
                                              null,
                                              8,
                                              ul
                                            ),
                                            (0, ce._)(
                                              "s",
                                              { class: "ellipsis flex-auto", textContent: (0, ue.zw)(t) },
                                              null,
                                              8,
                                              dl
                                            ),
                                            (0, ce._)("pre", { textContent: (0, ue.zw)(n) }, null, 8, pl),
                                          ],
                                          8,
                                          cl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ],
                                44,
                                rl
                              ))
                            : (0, ce.kq)("", !0),
                        ]),
                        r.value
                          ? ((0, ce.wg)(),
                            (0, ce.iD)("div", ml, [
                              (0, ce._)("div", gl, [
                                (0, ce._)(
                                  "h4",
                                  {
                                    textContent: (0, ue.zw)(
                                      r.value.isAll ? t.i18n("labelEditValueAll") : t.i18n("labelEditValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  vl
                                ),
                                (0, ce._)("div", hl, [
                                  (0, ce._)(
                                    "a",
                                    {
                                      tabindex: "0",
                                      class: "mr-1 flex",
                                      onClick: u[4] || (u[4] = (e) => (i.value = !i.value)),
                                    },
                                    [
                                      (0, ce.Wm)(
                                        (0, R.SU)(Se.Z),
                                        { name: "cog", class: (0, ue.C_)({ active: i.value }) },
                                        null,
                                        8,
                                        ["class"]
                                      ),
                                    ]
                                  ),
                                  ((0, ce.wg)(!0),
                                  (0, ce.iD)(
                                    ce.HY,
                                    null,
                                    (0, ce.Ko)(
                                      [t.i18n("buttonOK"), t.i18n("buttonApply")],
                                      (e, t) => (
                                        (0, ce.wg)(),
                                        (0, ce.iD)(
                                          "button",
                                          {
                                            key: e,
                                            textContent: (0, ue.zw)(e),
                                            onClick: (e) => ee(t),
                                            class: (0, ue.C_)({ "has-error": r.value.error, "save-beacon": !t }),
                                            title: r.value.error,
                                            disabled: r.value.error || !r.value.dirty,
                                          },
                                          null,
                                          10,
                                          fl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, ce._)(
                                    "button",
                                    { textContent: (0, ue.zw)(t.i18n("buttonCancel")), onClick: te, title: "Esc" },
                                    null,
                                    8,
                                    wl
                                  ),
                                ]),
                              ]),
                              i.value
                                ? ((0, ce.wg)(),
                                  (0, ce.iD)(
                                    ce.HY,
                                    { key: 0 },
                                    [
                                      (0, ce._)(
                                        "p",
                                        { class: "my-1", innerHTML: t.i18n("descEditorOptions") },
                                        null,
                                        8,
                                        bl
                                      ),
                                      (0, ce.Wm)(
                                        (0, R.SU)(Yn.Z),
                                        { name: "valueEditor", json: "", onDblclick: (0, R.SU)(re), "has-save": !1 },
                                        null,
                                        8,
                                        ["onDblclick"]
                                      ),
                                    ],
                                    64
                                  ))
                                : (0, ce.kq)("", !0),
                              (0, ce.wy)(
                                (0, ce._)(
                                  "label",
                                  null,
                                  [
                                    (0, ce._)(
                                      "span",
                                      { textContent: (0, ue.zw)(t.i18n("valueLabelKey")) },
                                      null,
                                      8,
                                      yl
                                    ),
                                    (0, ce.wy)(
                                      (0, ce._)(
                                        "input",
                                        {
                                          type: "text",
                                          "onUpdate:modelValue": u[5] || (u[5] = (e) => (r.value.key = e)),
                                          readOnly: !r.value.isNew || e.readOnly,
                                          ref_key: "$key",
                                          ref: a,
                                          spellcheck: "false",
                                          onKeydown: [oe, (0, be.D2)((0, be.iM)(te, ["exact", "stop"]), ["esc"])],
                                        },
                                        null,
                                        40,
                                        xl
                                      ),
                                      [[be.nr, r.value.key]]
                                    ),
                                  ],
                                  512
                                ),
                                [[be.F8, !r.value.isAll]]
                              ),
                              (0, ce._)("label", null, [
                                (0, ce._)(
                                  "span",
                                  {
                                    textContent: (0, ue.zw)(
                                      r.value.isAll ? t.i18n("valueLabelValueAll") : t.i18n("valueLabelValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  Cl
                                ),
                                (0, ce.Wm)(
                                  (0, R.SU)(Ft.default),
                                  {
                                    value: r.value.value,
                                    "cm-options": (0, R.SU)(j),
                                    ref_key: "$value",
                                    ref: o,
                                    class: "h-100 mt-1",
                                    mode: "application/json",
                                    readOnly: e.readOnly,
                                    onCodeDirty: le,
                                    onKeydownCapture:
                                      u[6] ||
                                      (u[6] = (0, be.D2)(
                                        (0, be.iM)(() => {}, ["shift", "exact", "stop"]),
                                        ["tab"]
                                      )),
                                    commands: { close: te, save: ee },
                                    active: s.value,
                                    focusme: "",
                                  },
                                  null,
                                  8,
                                  ["value", "cm-options", "readOnly", "commands", "active"]
                                ),
                              ]),
                            ]))
                          : (0, ce.kq)("", !0),
                      ],
                      8,
                      Pn
                    )
                  )
                )
              },
            },
            kl = _l,
            Sl = { class: "edit-help mb-2c" },
            Ul = ["innerHTML"],
            zl = (0, ce._)(
              "a",
              { href: "https://violentmonkey.github.io/api/", rel: "noopener noreferrer", target: "_blank" },
              "violentmonkey.github.io/api/",
              -1
            ),
            Dl = { class: "keyboard" },
            $l = ["textContent"],
            Hl = ["textContent"],
            jl = ["textContent"],
            Wl = {
              __name: "help",
              props: { hotkeys: Array },
              setup: (e) => (t, n) => (
                (0, ce.wg)(),
                (0, ce.iD)("div", Sl, [
                  (0, ce._)("div", null, [
                    (0, ce._)("h3", { innerHTML: t.i18n("editHelpDocumention") }, null, 8, Ul),
                    zl,
                  ]),
                  (0, ce._)("div", Dl, [
                    (0, ce._)("h3", { textContent: (0, ue.zw)(t.i18n("editHelpKeyboard")) }, null, 8, $l),
                    ((0, ce.wg)(!0),
                    (0, ce.iD)(
                      ce.HY,
                      null,
                      (0, ce.Ko)(
                        e.hotkeys,
                        ([e, t]) => (
                          (0, ce.wg)(),
                          (0, ce.iD)("dl", { key: e }, [
                            (0, ce._)("dt", { class: "monospace-font", textContent: (0, ue.zw)(e) }, null, 8, Hl),
                            (0, ce._)("dd", { textContent: (0, ue.zw)(t) }, null, 8, jl),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                ])
              ),
            },
            Il = { class: "edit-header flex mr-1c" },
            Rl = ["textContent", "onClick"],
            Tl = { class: "edit-name text-center ellipsis flex-1" },
            Ml = ["textContent"],
            Ol = ["textContent"],
            El = { key: 1, class: "edit-hint text-right ellipsis" },
            Zl = ["href", "textContent"],
            Vl = { class: "mr-1" },
            Yl = ["textContent", "disabled", "title"],
            Pl = ["textContent", "disabled"],
            Al = ["textContent"],
            Ll = { key: 0, class: "frozen-note shelf mr-2c flex flex-wrap" },
            Fl = ["textContent"],
            ql = { key: 1, class: "shelf fatal" },
            Nl = ["textContent"],
            Bl = { key: 2, class: "errors shelf my-1c" },
            Kl = ["textContent"],
            Jl = ["textContent"],
            Gl = { key: 1, class: "my-1" },
            Xl = "https://violentmonkey.github.io/api/matching/",
            Ql = { [G]: "", [K]: "", [le]: "", [B]: "", [J]: "", [ee]: !0, [X]: !0, [te]: !0, [Q]: !0, tags: "" },
            ea = (e) => ("" !== e ? e : null),
            ta = [A, L, F, q],
            na = (e) =>
              e.trim()
                ? e
                    .split("\n")
                    .map((e) => e.trim())
                    .filter(r)
                : null,
            la = [l, a],
            aa = (e) => e || null,
            oa = (e, t) => (e < t ? -1 : e > t),
            ia = ({ shouldUpdate: e, _editable: t }) => +e && e + t,
            sa = (e, t) => {
              if (t >= 0) {
                const n = e.lastIndexOf("\n", t) + 1,
                  l = e.indexOf("\n", t)
                return e.slice(n, l > 0 ? l : void 0)
              }
            },
            ra = /#/,
            ca = {
              __name: "index",
              props: { initial: u, initialCode: String, readOnly: r },
              emits: ["close"],
              setup(t, { emit: n }) {
                const l = t
                let a, o, i, r, c, d
                const m = (0, R.iH)(),
                  v = (0, R.iH)(),
                  h = (0, R.iH)("code"),
                  f = (0, R.iH)(!1),
                  x = (0, R.iH)(),
                  C = (0, R.iH)(""),
                  _ = (0, R.iH)(!1),
                  k = { save: E, close: Z },
                  S = (0, R.iH)(),
                  U = (0, R.iH)(),
                  z = (0, ce.Fl)(() => {
                    for (let e = 0, t = ["meta", "custom"]; e < t.length; e++) {
                      const n = t[e]
                      for (let e = 0; e < ta.length; e++) {
                        const t = ta[e]
                        let l = x.value[n][t]
                        if (l && (l = s(l) ? l.find(ra.test, ra) : sa(l, l.indexOf("#"))))
                          return l.length > 100 ? l.slice(0, 100) + "..." : l
                      }
                    }
                  }),
                  $ = (0, R.iH)(),
                  H = (0, R.iH)(!1),
                  I = (0, R.iH)(!1),
                  M = (0, ce.Fl)(() => {
                    const {
                        meta: e,
                        props: { id: t },
                        $cache: n = {},
                      } = x.value,
                      l = e.require.length && "@require",
                      a = !(0, D.xb)(e.resources) && "@resource",
                      o = n[ne]
                    return {
                      code: (0, D.ag)("editNavCode"),
                      settings: (0, D.ag)("editNavSettings"),
                      ...(t && { values: (0, D.ag)("editNavValues") + (o ? ` (${(0, D.aj)(o)})` : "") }),
                      ...((l || a) && { externals: w(D.Hv, [l, a], "/") }),
                      help: "?",
                    }
                  }),
                  O = (0, ce.Fl)(() => (P.title = (0, D.pV)(x.value)))
                ;(0, ce.YP)(
                  h,
                  async (e) => {
                    await (0, ce.Y3)(), "code" === e ? a.focus() : (0, W.wO)(v.value.$el)
                  },
                  { immediate: !0 }
                ),
                  (0, ce.YP)(f, (e) => {
                    d(e), we.$J.setContext("canSave", e)
                  }),
                  (0, ce.YP)(
                    () => l.initial.error,
                    (e) => {
                      e && (0, W.PV)({ text: `${l.initial.message}\n\n${e}` })
                    }
                  ),
                  (0, ce.YP)(_, q),
                  (0, ce.YP)(x, (e) => {
                    const { custom: t, config: n } = e,
                      { shouldUpdate: l } = n
                    ;(n._editable = 2 === l),
                      (n.enabled = !!n.enabled),
                      (n.shouldUpdate = !!l),
                      (n.notifyUpdates = (0, D.jd)(n.notifyUpdates)),
                      (t.noframes = (0, D.jd)(t.noframes))
                    for (const e in Ql) null == t[e] && (t[e] = Ql[e])
                    for (let e = 0; e < la.length; e++) {
                      const n = la[e]
                      t[n] || (t[n] = "")
                    }
                    for (let e = 0; e < ta.length; e++) {
                      const n = ta[e],
                        l = t[n]
                      t[n] = l ? `${l.join("\n")}${l.length ? "\n" : ""}` : ""
                    }
                    F(), n.removed || (r = (0, xe.p$)(e))
                  })
                {
                  const e = l.initial
                  ;(C.value = l.initialCode),
                    (x.value = (0, xe.p$)(e)),
                    (0, ce.YP)(() => x.value.config, F, { deep: !0 }),
                    (0, ce.YP)(() => x.value.custom, F, { deep: !0 })
                }
                async function E() {
                  if (!f.value) return
                  c && N()
                  const e = x.value,
                    { config: t, custom: n } = e,
                    { notifyUpdates: l } = t,
                    { noframes: i } = n
                  try {
                    var s
                    const r = e.props.id,
                      c = await (0, D.gj)("ParseScript", {
                        id: r,
                        code: o.getRealContent(),
                        config: { enabled: +t.enabled, notifyUpdates: l ? +l : null, shouldUpdate: ia(t) },
                        custom: {
                          ...(0, xe.zr)(n, u.keys(Ql), ea),
                          ...(0, xe.zr)(n, ta, na),
                          ...(0, xe.zr)(n, la, aa),
                          noframes: i ? +i : null,
                        },
                        isNew: !r,
                        message: "",
                        bumpDate: !0,
                      }),
                      d = null == c || null == (s = c.where) ? void 0 : s.id
                    a.markClean(),
                      (_.value = !1),
                      (f.value = !1),
                      (I.value = !1),
                      (U.value = c.errors),
                      (x.value = c.update),
                      d && !r && history.replaceState(null, O.value, `${y}/${d}`),
                      ($.value = null)
                  } catch (e) {
                    $.value = e.message.split("\n")
                  }
                }
                function Z(e) {
                  var t
                  e || "code" === h.value
                    ? (n("close"), b && (null == (t = (0, W.vY)()) || t.blur()))
                    : (h.value = "code")
                }
                async function V() {
                  await E(), Z(!0)
                }
                function Y(e) {
                  const t = u.keys(M.value)
                  h.value = t[(t.indexOf(h.value) + e + t.length) % t.length]
                }
                function A() {
                  Y(-1)
                }
                function L() {
                  Y(1)
                }
                function F(e) {
                  const t = x.value,
                    { config: n } = t,
                    { removed: a } = n,
                    o = (t._remote = !!(0, D.TZ)(t)) && ia(n),
                    i = !(!a && 1 !== o && !l.readOnly)
                  ;(H.value = i), (I.value = !a && (i || o >= 1)), !a && e && q()
                }
                function q() {
                  f.value = _.value || !(0, xe.vZ)(x.value, r)
                }
                async function N(e) {
                  j.Z.get("editorWindow") &&
                    (e || (e = (await (null == D.oy ? void 0 : D.oy.getCurrent())) || {}),
                    "normal" === e.state &&
                      j.Z.set("editorWindowPos", (0, xe.zr)(e, ["left", "top", "width", "height"])))
                }
                function B({ id: e, tabs: t }) {
                  if (1 === t.length) {
                    const { onBoundsChanged: t } = g.windows
                    t
                      ? t.addListener((t) => {
                          t.id === e && N(t)
                        })
                      : (p("resize", (0, D.Ds)(N, 100)), (c = !0))
                  }
                }
                return (
                  (0, ce.bv)(() => {
                    var t
                    ;(o = m.value),
                      (a = o.cm),
                      (d = (0, T.Q$)(null, () => a.focus())),
                      j.Z.get("editorWindow") &&
                        1 === e.history.length &&
                        (null == (t = browser.windows) || t.getCurrent({ populate: !0 }).then(B))
                    const n = u.values(M.value),
                      l = (S.value = [
                        ["Alt-PageUp", ` ${n.join(" < ")}`],
                        ["Alt-PageDown", ` ${n.join(" > ")}`],
                        ...u.entries(o.expandKeyMap()).sort((e, t) => oa(e[1], t[1]) || oa(e[0], t[0])),
                      ])
                    ae || oe(l)
                  }),
                  (0, ce.dl)(() => {
                    document.body.classList.add("edit-open"),
                      (i = [
                        we.$J.register("a-pageup", A),
                        we.$J.register("a-pagedown", L),
                        we.$J.register(ae.replace(/(?:Ctrl|Cmd)-/i, "ctrlcmd-"), E),
                        we.$J.register("escape", Z),
                        we.$J.register("f1", () => {
                          h.value = "help"
                        }),
                      ]),
                      (P.title = O.value)
                  }),
                  (0, ce.se)(() => {
                    var e
                    document.body.classList.remove("edit-open"),
                      (P.title = null),
                      d(!1),
                      null == (e = i) || e.forEach((e) => e())
                  }),
                  (e, n) => (
                    (0, ce.wg)(),
                    (0, ce.iD)(
                      "div",
                      { class: (0, ue.C_)(["edit frame flex flex-col abs-full", { frozen: H.value }]) },
                      [
                        (0, ce._)("div", Il, [
                          (0, ce._)("nav", null, [
                            ((0, ce.wg)(!0),
                            (0, ce.iD)(
                              ce.HY,
                              null,
                              (0, ce.Ko)(
                                M.value,
                                (e, t) => (
                                  (0, ce.wg)(),
                                  (0, ce.iD)(
                                    "div",
                                    {
                                      key: t,
                                      class: (0, ue.C_)(["edit-nav-item", { active: h.value === t }]),
                                      textContent: (0, ue.zw)(e),
                                      onClick: (e) => (h.value = t),
                                    },
                                    null,
                                    10,
                                    Rl
                                  )
                                )
                              ),
                              128
                            )),
                          ]),
                          (0, ce._)("div", Tl, [
                            x.value.config.removed
                              ? ((0, ce.wg)(),
                                (0, ce.iD)(
                                  "span",
                                  {
                                    key: 0,
                                    class: "subtle",
                                    textContent: (0, ue.zw)((0, R.SU)(D.ag)("headerRecycleBin") + " / "),
                                  },
                                  null,
                                  8,
                                  Ml
                                ))
                              : (0, ce.kq)("", !0),
                            (0, ce.Uk)(" " + (0, ue.zw)(O.value), 1),
                          ]),
                          H.value && "code" === h.value
                            ? ((0, ce.wg)(),
                              (0, ce.iD)(
                                "p",
                                {
                                  key: 0,
                                  textContent: (0, ue.zw)((0, R.SU)(D.ag)("readonly")),
                                  class: "text-upper text-right text-red",
                                },
                                null,
                                8,
                                Ol
                              ))
                            : ((0, ce.wg)(),
                              (0, ce.iD)("div", El, [
                                (0, ce._)(
                                  "a",
                                  {
                                    href: (0, R.SU)(W.XB),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    textContent: (0, ue.zw)((0, R.SU)(D.ag)("editHowToHint")),
                                  },
                                  null,
                                  8,
                                  Zl
                                ),
                              ])),
                          (0, ce._)("div", Vl, [
                            (0, ce.wy)(
                              (0, ce._)(
                                "button",
                                {
                                  textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonSave")),
                                  onClick: E,
                                  disabled: !f.value,
                                  class: (0, ue.C_)({ "has-error": (e.$fe = $.value || U.value) }),
                                  title: e.$fe,
                                },
                                null,
                                10,
                                Yl
                              ),
                              [[be.F8, f.value || !H.value]]
                            ),
                            (0, ce.wy)(
                              (0, ce._)(
                                "button",
                                {
                                  textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonSaveClose")),
                                  onClick: V,
                                  disabled: !f.value,
                                },
                                null,
                                8,
                                Pl
                              ),
                              [[be.F8, f.value || !H.value]]
                            ),
                            (0, ce._)(
                              "button",
                              {
                                textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonClose")),
                                onClick: n[0] || (n[0] = (e) => Z(!0)),
                                title: "Esc",
                              },
                              null,
                              8,
                              Al
                            ),
                          ]),
                        ]),
                        I.value && "code" === h.value
                          ? ((0, ce.wg)(),
                            (0, ce.iD)("div", Ll, [
                              (0, ce._)("p", { textContent: (0, ue.zw)((0, R.SU)(D.ag)("readonlyNote")) }, null, 8, Fl),
                              ((0, ce.wg)(),
                              (0, ce.j4)(
                                ce.Ob,
                                null,
                                [
                                  (0, ce.Wm)((0, R.SU)(tn), { class: "flex ml-2c", script: x.value }, null, 8, [
                                    "script",
                                  ]),
                                ],
                                1024
                              )),
                            ]))
                          : (0, ce.kq)("", !0),
                        $.value
                          ? ((0, ce.wg)(),
                            (0, ce.iD)("p", ql, [
                              (0, ce._)("b", { textContent: (0, ue.zw)($.value[0]) }, null, 8, Nl),
                              (0, ce.Uk)(" " + (0, ue.zw)($.value[1]), 1),
                            ]))
                          : (0, ce.kq)("", !0),
                        (0, ce.wy)(
                          (0, ce.Wm)(
                            (0, R.SU)(Ft.default),
                            {
                              class: (0, ue.C_)(["flex-auto", { readonly: H.value }]),
                              value: C.value,
                              readOnly: H.value,
                              ref_key: "$code",
                              ref: m,
                              active: "code" === h.value,
                              commands: k,
                              onCodeDirty: n[1] || (n[1] = (e) => (_.value = e)),
                            },
                            null,
                            8,
                            ["class", "value", "readOnly", "active"]
                          ),
                          [[be.F8, "code" === h.value]]
                        ),
                        ((0, ce.wg)(),
                        (0, ce.j4)(
                          ce.Ob,
                          { ref_key: "$tabBody", ref: v },
                          [
                            "settings" === h.value
                              ? ((0, ce.wg)(),
                                (0, ce.j4)(
                                  (0, R.SU)(En),
                                  (0, ce.dG)({ key: 0, class: "edit-body" }, { readOnly: t.readOnly, script: x.value }),
                                  null,
                                  16
                                ))
                              : "values" === h.value
                                ? ((0, ce.wg)(),
                                  (0, ce.j4)(
                                    (0, R.SU)(kl),
                                    (0, ce.dG)(
                                      { key: 1, class: "edit-body" },
                                      { readOnly: t.readOnly, script: x.value }
                                    ),
                                    null,
                                    16
                                  ))
                                : "externals" === h.value
                                  ? ((0, ce.wg)(),
                                    (0, ce.j4)(
                                      (0, R.SU)(qt.Z),
                                      { key: 2, class: "flex-auto", value: x.value },
                                      null,
                                      8,
                                      ["value"]
                                    ))
                                  : "help" === h.value
                                    ? ((0, ce.wg)(),
                                      (0, ce.j4)(
                                        (0, R.SU)(Wl),
                                        { key: 3, class: "edit-body", hotkeys: S.value },
                                        null,
                                        8,
                                        ["hotkeys"]
                                      ))
                                    : (0, ce.kq)("", !0),
                          ],
                          1536
                        )),
                        U.value || z.value
                          ? ((0, ce.wg)(),
                            (0, ce.iD)("div", Bl, [
                              z.value
                                ? ((0, ce.wg)(),
                                  (0, ce.j4)(
                                    (0, R.SU)(Ue.Z),
                                    { key: 0, "i18n-key": "hashPatternWarning" },
                                    {
                                      default: (0, ce.w5)(() => [
                                        (0, ce._)("code", { textContent: (0, ue.zw)(z.value) }, null, 8, Kl),
                                      ]),
                                      _: 1,
                                    }
                                  ))
                                : (0, ce.kq)("", !0),
                              ((0, ce.wg)(!0),
                              (0, ce.iD)(
                                ce.HY,
                                null,
                                (0, ce.Ko)(
                                  U.value,
                                  (e) => (
                                    (0, ce.wg)(),
                                    (0, ce.iD)(
                                      "p",
                                      { key: e, textContent: (0, ue.zw)(e), class: "text-red" },
                                      null,
                                      8,
                                      Jl
                                    )
                                  )
                                ),
                                128
                              )),
                              U.value
                                ? ((0, ce.wg)(),
                                  (0, ce.iD)("p", Gl, [
                                    (0, ce._)("a", {
                                      href: Xl,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      textContent: Xl,
                                    }),
                                  ]))
                                : (0, ce.kq)("", !0),
                            ]))
                          : (0, ce.kq)("", !0),
                      ],
                      2
                    )
                  )
                )
              },
            },
            ua = ca,
            da = { key: 0 },
            pa = { class: "flex" },
            ma = { class: "btn-group" },
            ga = { class: "btn-ghost", tabindex: "0" },
            va = ["textContent"],
            ha = ["textContent"],
            fa = ["textContent"],
            wa = ["textContent", "onClick"],
            ba = { key: 0, class: "btn-group" },
            ya = ["data-batch-action", "onClick"],
            xa = ["textContent"],
            Ca = { key: 1, class: "ml-1" },
            _a = ["textContent"],
            ka = ["textContent"],
            Sa = (0, ce._)("div", { class: "flex-auto" }, null, -1),
            Ua = ["value"],
            za = ["textContent", "value"],
            Da = { class: "btn-ghost", tabindex: "0" },
            $a = { class: "mr-2c" },
            Ha = ["title", "placeholder"],
            ja = { class: "filter-search-tooltip" },
            Wa = ["textContent"],
            Ia = ["innerHTML"],
            Ra = { key: 0, class: "hint mx-1 my-1 flex flex-col" },
            Ta = ["textContent"],
            Ma = ["textContent"],
            Oa = ["textContent"],
            Ea = ["data-columns", "data-show-order", "data-table"],
            Za = "edit",
            Va = "remove",
            Ya = "restore",
            Pa = "toggle",
            Aa = "undo",
            La = "update",
            Fa = "tabScripts",
            qa = "scrollTop",
            Na = "toggle-on",
            Ba = {
              __name: "tab-installed",
              setup(e) {
                const n = {
                    sort: {
                      exec: { title: (0, D.ag)("filterExecutionOrder") },
                      alpha: {
                        title: (0, D.ag)("filterAlphabeticalOrder"),
                        compare: ({ $cache: { lowerName: e } }, { $cache: { lowerName: t } }) => (e < t ? -1 : e > t),
                      },
                      [La]: {
                        title: (0, D.ag)("filterLastUpdateOrder"),
                        compare: ({ props: { lastUpdated: e } }, { props: { lastUpdated: t } }) =>
                          (+t || 0) - (+e || 0),
                      },
                      size: { title: (0, D.ag)("filterSize"), compare: (e, t) => t.$cache.sizeNum - e.$cache.sizeNum },
                    },
                  },
                  l = (0, R.qj)({
                    searchScope: null,
                    showEnabledFirst: null,
                    showOrder: null,
                    viewSingleColumn: null,
                    viewTable: null,
                    sort: null,
                  })
                w(xe.SE, l, (e) => {
                  ;(0, ye.Z)(`filters.${e}`, (t) => {
                    ;(l[e] = t), "sort" !== e || n.sort[t] || (l[e] = u.keys(n.sort)[0])
                  })
                })
                const a = `${Fa} && inputFocus`,
                  i = `${Fa} && !inputFocus`,
                  s = `${i} && selectedScript && !showRecycle`,
                  c = `${i} && selectedScript && showRecycle`,
                  g = `${i} && !buttonFocus`,
                  h = `${i} && selectedScript && showHotkeys`,
                  f = { [Za]: "e", [Pa]: "space", [La]: "r", [Ya]: "r", [Va]: "x" },
                  y = (e, t) => t.map(([t, n, l]) => we.$J.register(t, e, { condition: n, caseSensitive: l }))
                let x,
                  C = 0,
                  _ = [],
                  S = []
                const U = (0, R.iH)(),
                  z = (0, R.iH)(),
                  $ = (0, R.iH)(),
                  H = (0, R.qj)({
                    focusedIndex: -1,
                    menuNew: !1,
                    showHotkeys: !1,
                    search: (P.search = { value: "", error: null, ...Z("") }),
                    sortedScripts: [],
                    filteredScripts: [],
                    script: null,
                    code: "",
                    numColumns: 1,
                    batchRender: { limit: C },
                    batchAction: { action: null, [Aa]: null },
                  }),
                  M = (0, ce.Fl)(() => P.route.paths[0] === k),
                  O = (0, ce.Fl)(() => !M.value && "exec" === l.sort),
                  E = (0, ce.Fl)(() => W.T && O.value),
                  V = (0, ce.Fl)(() => {
                    var e
                    return null == (e = n.sort[l.sort]) ? void 0 : e.compare
                  }),
                  A = (0, ce.Fl)(() => H.filteredScripts[H.focusedIndex]),
                  L = (0, ce.Fl)(() =>
                    P.loading ||
                    (H.search.rules.length ? H.sortedScripts.find((e) => !1 !== e.$cache.show) : H.sortedScripts.length)
                      ? null
                      : (0, D.ag)("labelNoSearchScripts")
                  ),
                  F = (0, ce.Fl)(
                    () =>
                      H.search.rules.some((e) => !e.scope || "code" === e.scope) &&
                      P.scripts.filter((e) => null == e.$cache.code).map((e) => e.props.id)
                  ),
                  q = (0, ce.Fl)(() =>
                    H.search.tokens.filter((e) => "#" === e.prefix && !e.negative).map((e) => e.parsed)
                  ),
                  N = () => (M.value ? P.removedScripts : P.scripts),
                  B = (e) => e.target.closest("[data-batch-action]"),
                  K = {
                    [Pa]: {
                      icon: Na,
                      arg(e) {
                        const t = this.icon === Na ? 1 : 0
                        return e.filter((e) => +e.config.enabled !== t)
                      },
                      fn: (e) => d.all(e.map(ze)),
                    },
                    [La]: { icon: "refresh", fn: De, [Aa]: !1 },
                    [Va]: {
                      icon: "trash",
                      async fn(e, t, n) {
                        await d.all(e.map((e) => ie(e, !n))), n || (P.scripts = [])
                      },
                    },
                  },
                  J = (0, ce.Fl)(() => {
                    const e = H.filteredScripts,
                      t = e.length,
                      n = t === H.sortedScripts.length
                    let l = K,
                      a = 0,
                      o = 0
                    for (let t = 0; t < e.length; t++) {
                      const l = e[t]
                      ;(a += !l.config.enabled), n || (o += l.$canUpdate > 0)
                    }
                    return (
                      (l[Pa].icon = a ? Na : "toggle-off"),
                      (l[Pa].num = a < t ? a : ""),
                      o ? (l[La].num = o < t ? o : "") : ({ [La]: o, ...l } = l),
                      l
                    )
                  }),
                  G = (0, D.Ds)(() => {
                    try {
                      ;(H.search = P.search = { ...H.search, ...Z(H.search.value) }), (H.search.error = null)
                    } catch (e) {
                      H.search.error = e.message
                    }
                    const e = F.value
                    null != e && e.length && pe(e), te()
                  }, 100),
                  X = (0, D.Ds)(de)
                function Q() {
                  !M.value &&
                    P.needRefresh &&
                    ((P.scripts = P.scripts.filter((e) => !e.config.removed)), (P.needRefresh = !1)),
                    (H.focusedIndex = -1),
                    te()
                }
                async function ee() {
                  const e = F.value
                  null != e && e.length && (await pe(e)), te(), re()
                }
                function te() {
                  const e = [...N()],
                    t = H.search.rules,
                    n = t.length ? Y(e, t) : e.length,
                    a = V.value
                  var o
                  a &&
                    e.sort(
                      ((o = a), l.showEnabledFirst ? (e, t) => t.config.enabled - e.config.enabled || o(e, t) : o)
                    ),
                    (H.sortedScripts = e),
                    (H.filteredScripts = t.length ? e.filter(({ $cache: e }) => e.show) : e),
                    ve(H.focusedIndex),
                    !C || n < C ? de() : X()
                }
                async function ne() {
                  try {
                    var e
                    let t = await (0, W.GW)((0, D.ag)("hintInputURL"), { input: "", ok: { type: "submit" } })
                    ;(t = null == (e = t) ? void 0 : e.trim()),
                      t &&
                        (t.includes("://") || (t = `https://${t}`),
                        new URL(t),
                        await (0, D.gj)("ConfirmInstall", { url: t }))
                  } catch (e) {
                    ;(0, W.PV)({ text: e.message || e })
                  }
                }
                async function le(e, t) {
                  if (e === t) return
                  const n = H.filteredScripts,
                    l = P.scripts,
                    a = n[e],
                    o = l.indexOf(a),
                    i = l.indexOf(n[t]),
                    { id: s } = a.props
                  ;(await (0, D.gj)("Move", { id: s, offset: i - o })) &&
                    (l.splice(o, 1),
                    l.splice(i, 0, a),
                    l.forEach((e, t) => {
                      e.props.position = t + 1
                    }),
                    te())
                }
                function ae(e) {
                  j.Z.set("filters.sort", e.target.value)
                }
                function oe(e) {
                  const n = w(D.Hv, [M.value ? k : o, e], "/")
                  e || n !== (0, T.Qs)().pathname ? (0, T.pV)(n) : t.history.back()
                }
                async function re() {
                  const [e, t, n] = P.route.paths,
                    l = "_new" === t && (await (0, D.gj)("NewScript", +n)),
                    a = l ? l.script : +t && N().find((e) => e.props.id === +t)
                  if (a) return (H.code = l ? l.code : await (0, D.gj)("GetScriptCode", t)), void (H.script = a)
                  if (
                    (t && (0, T.pV)(e, !0),
                    P.canRenderScripts || ((P.canRenderScripts = !0), ar()),
                    de(),
                    (H.script = null),
                    !b)
                  ) {
                    const e = $.value,
                      t = document.scrollingElement,
                      n = e[qa],
                      l = t[qa]
                    ;(0, ce.Y3)(() => {
                      ;(e[qa] = n), (t[qa] = l)
                    })
                  }
                }
                async function de() {
                  if (!P.canRenderScripts) return
                  const { length: e } = H.sortedScripts
                  let t = 9
                  const n = (0, R.qj)({ limit: t })
                  H.batchRender = n
                  const l = v.now()
                  for (; t < e && n === H.batchRender; ) {
                    if (C && H.search.rules.length)
                      for (let n = 0; n < C && t < e; t += 1) n += H.sortedScripts[t].$cache.show ? 1 : 0
                    else t += C || 1
                    ;(n.limit = t),
                      await new d((e) => (0, ce.Y3)(e)),
                      !C && v.now() - l >= 100 && (C = 2 * t),
                      C && t < e && (await (0, D.dL)())
                  }
                }
                async function pe(e) {
                  const t = await (0, D.gj)("GetScriptCode", e)
                  P.scripts.forEach(({ $cache: e, props: { id: n } }) => {
                    n in t && (e.code = t[n])
                  }),
                    te()
                }
                async function me() {
                  ;(await (0, W.GW)((0, D.ag)("buttonEmptyRecycleBin"))) &&
                    ((0, D.gj)("CheckRemove", { force: !0 }), (P.removedScripts = []))
                }
                function ge() {
                  const e = l.viewTable ? _ : S
                  H.numColumns = l.viewSingleColumn ? 1 : e.findIndex((e) => t.innerWidth < e) + 1 || e.length + 1
                }
                function ve(e) {
                  ;(e = Math.min(e, H.filteredScripts.length - 1)),
                    (e = Math.max(e, -1)) !== H.focusedIndex && (H.focusedIndex = e)
                }
                function he(e) {
                  e.config.removed ? (0, D.gj)("RemoveScripts", [e.props.id]) : ie(e, 1)
                }
                async function fe(e) {
                  try {
                    await ie(e, 0)
                  } catch (t) {
                    ;(0, W.GW)(`${t.message || t}\n\n@namespace ${e.meta.namespace}\n@name ${e.meta.name}`, {
                      cancel: !1,
                    })
                  }
                }
                function ze(e) {
                  return (0, D.gj)("UpdateScriptInfo", {
                    id: e.props.id,
                    config: { enabled: e.config.enabled ? 0 : 1 },
                  })
                }
                async function De(e, t) {
                  var n
                  t && (t = (t.querySelector("svg") || t).classList).add("rotate"),
                    await (0, D.gj)("CheckUpdate", e && (0, D.rY)(e).map((e) => e.props.id)),
                    null == (n = t) || n.remove("rotate")
                }
                function $e(e) {
                  if (q.value.includes(e)) {
                    const t = H.search.tokens.filter((t) => !("#" === t.prefix && t.parsed === e))
                    H.search.value = t.map((e) => `${e.prefix}${e.raw}`).join(" ")
                  } else H.search.value = [H.search.value.trim(), `#${e} `].filter(r).join(" ")
                }
                function He(e) {
                  if (!e) return
                  const t = z.value
                  t.scroll({ top: t.scrollTop + e, behavior: "smooth" })
                }
                function je(e) {
                  if (P.batch) return
                  const t = B(e),
                    n = H.batchAction
                  let l = null == t ? void 0 : t.dataset.batchAction
                  if (n.action === l) {
                    const e = J.value[l] || {},
                      a = H.filteredScripts,
                      o = (null == e.arg ? void 0 : e.arg(a)) || a,
                      i = e.fn,
                      s = [i, o, t]
                    i && se(...s),
                      (n[Aa] =
                        i &&
                        !1 !== e[Aa] &&
                        (() => {
                          se(...s, Aa), (n[Aa] = null)
                        })),
                      (l = ""),
                      t.blur()
                  }
                  n.action = l
                }
                function We() {
                  const e = () => {
                    var e
                    we.$J.setContext("buttonFocus", (null == (e = (0, W.vY)()) ? void 0 : e.tabIndex) >= 0)
                  }
                  p("focus", e, !0)
                  const t = [
                    () => m("focus", e, !0),
                    ...(b
                      ? [
                          we.$J.register("tab", () => {
                            ;(0, we.nk)(1)
                          }),
                          we.$J.register("s-tab", () => {
                            ;(0, we.nk)(-1)
                          }),
                        ]
                      : []),
                    ...y(() => {
                      var e
                      null == (e = U.value) || e.focus()
                    }, [
                      ["ctrlcmd-f", Fa],
                      ["/", i, !0],
                    ]),
                    ...y(() => {
                      var e
                      null == (e = U.value) || e.blur()
                    }, [["enter", a]]),
                    ...y(() => {
                      H.showHotkeys = !1
                    }, [
                      ["escape", h],
                      ["q", h, !0],
                    ]),
                    ...y(() => {
                      let e = H.focusedIndex
                      e < 0 ? (e = 0) : (e += H.numColumns), e < H.filteredScripts.length && ve(e)
                    }, [
                      ["ctrlcmd-down", Fa],
                      ["down", Fa],
                      ["j", i, !0],
                    ]),
                    ...y(() => {
                      const e = H.focusedIndex - H.numColumns
                      e >= 0 && ve(e)
                    }, [
                      ["ctrlcmd-up", Fa],
                      ["up", Fa],
                      ["k", i, !0],
                    ]),
                    ...y(() => {
                      ve(H.focusedIndex - 1)
                    }, [
                      ["ctrlcmd-left", Fa],
                      ["left", i],
                      ["h", i, !0],
                    ]),
                    ...y(() => {
                      ve(H.focusedIndex + 1)
                    }, [
                      ["ctrlcmd-right", Fa],
                      ["right", i],
                      ["l", i, !0],
                    ]),
                    ...y(() => {
                      ve(0)
                    }, [
                      ["ctrlcmd-home", Fa],
                      ["g g", i, !0],
                    ]),
                    ...y(() => {
                      ve(H.filteredScripts.length - 1)
                    }, [
                      ["ctrlcmd-end", Fa],
                      ["G", i, !0],
                    ]),
                    ...y(() => {
                      oe(A.value.props.id)
                    }, [
                      [f[Za], s, !0],
                      ["enter", g],
                    ]),
                    ...y(() => {
                      he(A.value)
                    }, [
                      ["delete", s],
                      [f[Va], s, !0],
                    ]),
                    ...y(() => {
                      De(A.value)
                    }, [[f[La], s, !0]]),
                    ...y(() => {
                      ze(A.value)
                    }, [[f[Pa], s, !0]]),
                    ...y(() => {
                      fe(A.value)
                    }, [[f[Ya], c, !0]]),
                    ...y(() => {
                      H.showHotkeys = !H.showHotkeys
                    }, [["?", i, !0]]),
                  ]
                  return () =>
                    t.forEach((e) => {
                      e()
                    })
                }
                function Ie(e) {
                  B(e) || (H.batchAction.action = null)
                }
                Q(),
                  (0, ce.YP)(M, Q),
                  (0, ce.YP)(
                    () => P.canRenderScripts && z.value && O.value,
                    (e) => Qe(z.value, le, e)
                  ),
                  (0, ce.YP)(() => H.search.value, G),
                  (0, ce.YP)(() => [l.sort, l.showEnabledFirst], G),
                  screen.availWidth > 767 &&
                    ((0, ce.YP)(() => l.viewSingleColumn, ge),
                    (0, ce.YP)(
                      () => l.viewTable,
                      (e) => {
                        if ((ge(), e && !x)) {
                          x = (0, I.w)("-width: 76")
                          for (let e = 0, t = x; e < t.length; e++) {
                            const n = t[e]
                            n._orig = n.conditionText
                          }
                        }
                        if (x)
                          for (let t = 0, n = x; t < n.length; t++) {
                            const l = n[t],
                              a = l._orig
                            l.media.mediaText = e ? a.replace(/\d+/g, (e) => +e + 90 / devicePixelRatio) : a
                          }
                      }
                    )),
                  (0, ce.YP)(N, ee),
                  (0, ce.YP)(() => P.route.paths[1], re),
                  (0, ce.YP)(A, (e) => {
                    we.$J.setContext("selectedScript", e)
                  }),
                  (0, ce.YP)(
                    () => H.showHotkeys,
                    (e) => {
                      we.$J.setContext("showHotkeys", e)
                    }
                  )
                const Re = []
                return (
                  (0, ce.bv)(() => {
                    if ((P.loading || ee(), !S.length)) {
                      const e =
                        (null == I.$ ? void 0 : I.$.textContent.match(/--columns-(cards|table)\b/)) &&
                        getComputedStyle(document.documentElement)
                      if (e)
                        for (
                          let t = 0,
                            n = [
                              ["cards", S],
                              ["table", _],
                            ];
                          t < n.length;
                          t++
                        ) {
                          const [l, a] = n[t],
                            o = e.getPropertyValue(`--columns-${l}`)
                          o && a.push(...o.split(",").map(Number).filter(r))
                        }
                      else S.push(1300, 1900, 2500), _.push(1600, 2500, 3400)
                      p("resize", ge)
                    }
                    ge(),
                      Re.push(We()),
                      document.addEventListener("mousedown", Ie),
                      Re.push(() => document.removeEventListener("mousedown", Ie))
                  }),
                  (0, ce.Jd)(() => {
                    Re.forEach((e) => e())
                  }),
                  (e, t) => (
                    (0, ce.wg)(),
                    (0, ce.iD)(
                      "div",
                      { class: "tab-installed", ref_key: "scroller", ref: $ },
                      [
                        (0, R.SU)(P).canRenderScripts
                          ? ((0, ce.wg)(),
                            (0, ce.iD)("div", da, [
                              (0, ce._)("header", pa, [
                                M.value
                                  ? ((0, ce.wg)(),
                                    (0, ce.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "ml-2",
                                        textContent: (0, ue.zw)((0, R.SU)(D.ag)("headerRecycleBin")),
                                      },
                                      null,
                                      8,
                                      ka
                                    ))
                                  : ((0, ce.wg)(),
                                    (0, ce.iD)(
                                      ce.HY,
                                      { key: 0 },
                                      [
                                        (0, ce._)("div", ma, [
                                          (0, ce.Wm)(
                                            (0, R.SU)(Ce.Z),
                                            {
                                              modelValue: H.menuNew,
                                              "onUpdate:modelValue": t[1] || (t[1] = (e) => (H.menuNew = e)),
                                              class: (0, ue.C_)({ active: H.menuNew }),
                                              closeAfterClick: !0,
                                            },
                                            {
                                              content: (0, ce.w5)(() => [
                                                (0, ce._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonNew")),
                                                    tabindex: "0",
                                                    onClick:
                                                      t[0] || (t[0] = (0, be.iM)((e) => oe("_new"), ["prevent"])),
                                                  },
                                                  null,
                                                  8,
                                                  va
                                                ),
                                                (0, ce._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, ue.zw)(
                                                      (0, R.SU)(D.ag)("installFrom", "OpenUserJS")
                                                    ),
                                                    href: "https://openuserjs.org/",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  ha
                                                ),
                                                (0, ce._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, ue.zw)(
                                                      (0, R.SU)(D.ag)("installFrom", "GreasyFork")
                                                    ),
                                                    href: "https://greasyfork.org/scripts",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  fa
                                                ),
                                                (0, ce._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonInstallFromURL")),
                                                    tabindex: "0",
                                                    onClick: (0, be.iM)(ne, ["prevent"]),
                                                  },
                                                  null,
                                                  8,
                                                  wa
                                                ),
                                              ]),
                                              default: (0, ce.w5)(() => [
                                                (0, ce.Wm)(
                                                  (0, R.SU)(_e.Z),
                                                  {
                                                    content: (0, R.SU)(D.ag)("buttonNew"),
                                                    placement: "bottom",
                                                    align: "start",
                                                    disabled: H.menuNew,
                                                  },
                                                  {
                                                    default: (0, ce.w5)(() => [
                                                      (0, ce._)("a", ga, [
                                                        (0, ce.Wm)((0, R.SU)(Se.Z), { name: "plus" }),
                                                      ]),
                                                    ]),
                                                    _: 1,
                                                  },
                                                  8,
                                                  ["content", "disabled"]
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["modelValue", "class"]
                                          ),
                                          (0, ce.Wm)(
                                            (0, R.SU)(_e.Z),
                                            {
                                              content: (0, R.SU)(D.ag)("updateScriptsAll"),
                                              placement: "bottom",
                                              align: "start",
                                            },
                                            {
                                              default: (0, ce.w5)(() => [
                                                (0, ce._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    tabindex: "0",
                                                    onClick: t[2] || (t[2] = (e) => De(null, e.target)),
                                                  },
                                                  [(0, ce.Wm)((0, R.SU)(Se.Z), { name: "refresh" })]
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                        ]),
                                        H.filteredScripts.length
                                          ? ((0, ce.wg)(),
                                            (0, ce.iD)("div", ba, [
                                              ((0, ce.wg)(!0),
                                              (0, ce.iD)(
                                                ce.HY,
                                                null,
                                                (0, ce.Ko)(
                                                  J.value,
                                                  ({ icon: e, num: t }, n) => (
                                                    (0, ce.wg)(),
                                                    (0, ce.iD)(
                                                      "a",
                                                      {
                                                        key: n,
                                                        class: (0, ue.C_)([
                                                          "btn-ghost",
                                                          {
                                                            "has-error": H.batchAction.action === n,
                                                            disabled: (0, R.SU)(P).batch,
                                                          },
                                                        ]),
                                                        "data-batch-action": n,
                                                        tabindex: "0",
                                                        onClick: (0, be.iM)(je, ["prevent"]),
                                                      },
                                                      [
                                                        (0, ce.Wm)((0, R.SU)(Se.Z), { name: e }, null, 8, ["name"]),
                                                        t
                                                          ? ((0, ce.wg)(),
                                                            (0, ce.iD)(
                                                              "sub",
                                                              { key: 0, textContent: (0, ue.zw)(t) },
                                                              null,
                                                              8,
                                                              xa
                                                            ))
                                                          : (0, ce.kq)("", !0),
                                                        H.batchAction.action === n
                                                          ? ((0, ce.wg)(), (0, ce.iD)("span", Ca, "\u2757"))
                                                          : (0, ce.kq)("", !0),
                                                      ],
                                                      10,
                                                      ya
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                              (0, ce._)(
                                                "div",
                                                {
                                                  class: "btn-hint subtle",
                                                  textContent: (0, ue.zw)(
                                                    (0, R.SU)(D.ag)("hintForBatchAction", `${H.filteredScripts.length}`)
                                                  ),
                                                },
                                                null,
                                                8,
                                                _a
                                              ),
                                              (0, ce.Wm)(
                                                (0, R.SU)(_e.Z),
                                                {
                                                  content: (0, R.SU)(D.ag)("buttonUndo"),
                                                  placement: "bottom",
                                                  align: "start",
                                                },
                                                {
                                                  default: (0, ce.w5)(() => [
                                                    H.batchAction.undo
                                                      ? ((0, ce.wg)(),
                                                        (0, ce.iD)(
                                                          "a",
                                                          {
                                                            key: 0,
                                                            class: "btn-ghost",
                                                            tabindex: "0",
                                                            onClick:
                                                              t[3] ||
                                                              (t[3] = (0, be.iM)(
                                                                (...e) =>
                                                                  H.batchAction.undo && H.batchAction.undo(...e),
                                                                ["prevent"]
                                                              )),
                                                          },
                                                          [(0, ce.Wm)((0, R.SU)(Se.Z), { name: "undo" })]
                                                        ))
                                                      : (0, ce.kq)("", !0),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["content"]
                                              ),
                                            ]))
                                          : (0, ce.kq)("", !0),
                                      ],
                                      64
                                    )),
                                Sa,
                                (0, ce.Wm)(
                                  (0, R.SU)(Ue.Z),
                                  { "i18n-key": "labelFilterSort", class: "ml-1" },
                                  {
                                    default: (0, ce.w5)(() => [
                                      (0, ce._)(
                                        "select",
                                        { value: l.sort, onChange: ae, class: "h-100" },
                                        [
                                          ((0, ce.wg)(!0),
                                          (0, ce.iD)(
                                            ce.HY,
                                            null,
                                            (0, ce.Ko)(
                                              n.sort,
                                              (e, t) => (
                                                (0, ce.wg)(),
                                                (0, ce.iD)(
                                                  "option",
                                                  { textContent: (0, ue.zw)(e.title), key: t, value: t },
                                                  null,
                                                  8,
                                                  za
                                                )
                                              )
                                            ),
                                            128
                                          )),
                                        ],
                                        40,
                                        Ua
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                (0, ce.Wm)(
                                  (0, R.SU)(Ce.Z),
                                  { align: "right", class: "filter-sort" },
                                  {
                                    content: (0, ce.w5)(() => [
                                      (0, ce.wy)(
                                        (0, ce._)(
                                          "div",
                                          null,
                                          [
                                            (0, ce.Wm)(
                                              (0, R.SU)(ke.Z),
                                              {
                                                name: "filters.showEnabledFirst",
                                                label: (0, R.SU)(D.ag)("optionShowEnabledFirst"),
                                              },
                                              null,
                                              8,
                                              ["label"]
                                            ),
                                          ],
                                          512
                                        ),
                                        [[be.F8, V.value]]
                                      ),
                                      (0, ce._)("div", null, [
                                        (0, ce.Wm)(
                                          (0, R.SU)(ke.Z),
                                          { name: "filters.showOrder", label: (0, R.SU)(D.ag)("labelShowOrder") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                      (0, ce._)("div", $a, [
                                        (0, ce.Wm)(
                                          (0, R.SU)(ke.Z),
                                          { name: "filters.viewTable", label: (0, R.SU)(D.ag)("labelViewTable") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                        (0, ce.Wm)(
                                          (0, R.SU)(ke.Z),
                                          {
                                            name: "filters.viewSingleColumn",
                                            label: (0, R.SU)(D.ag)("labelViewSingleColumn"),
                                          },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                    ]),
                                    default: (0, ce.w5)(() => [
                                      (0, ce.Wm)(
                                        (0, R.SU)(_e.Z),
                                        { content: (0, R.SU)(D.ag)("labelSettings"), placement: "bottom" },
                                        {
                                          default: (0, ce.w5)(() => [
                                            (0, ce._)("a", Da, [(0, ce.Wm)((0, R.SU)(Se.Z), { name: "cog" })]),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                (0, ce._)(
                                  "form",
                                  {
                                    class: "filter-search hidden-xs",
                                    onSubmit: t[5] || (t[5] = (0, be.iM)(() => {}, ["prevent"])),
                                    style: (0, ue.j5)({
                                      "min-width": "10em",
                                      "max-width": 5 + Math.max(20, H.search.value.length) + "ex",
                                    }),
                                  },
                                  [
                                    (0, ce._)("label", null, [
                                      (0, ce.wy)(
                                        (0, ce._)(
                                          "input",
                                          {
                                            type: "search",
                                            class: (0, ue.C_)({ "has-error": H.search.error }),
                                            title: H.search.error,
                                            placeholder: (0, R.SU)(D.ag)("labelSearchScript"),
                                            "onUpdate:modelValue": t[4] || (t[4] = (e) => (H.search.value = e)),
                                            ref_key: "refSearch",
                                            ref: U,
                                            id: "installed-search",
                                          },
                                          null,
                                          10,
                                          Ha
                                        ),
                                        [[be.nr, H.search.value]]
                                      ),
                                      (0, ce.Wm)((0, R.SU)(Se.Z), { name: "search" }),
                                    ]),
                                  ],
                                  36
                                ),
                                (0, ce.Wm)(
                                  (0, R.SU)(Ce.Z),
                                  { align: "right" },
                                  {
                                    content: (0, ce.w5)(() => [
                                      (0, ce._)("div", ja, [
                                        H.search.error
                                          ? ((0, ce.wg)(),
                                            (0, ce.iD)(
                                              "div",
                                              { key: 0, class: "has-error", textContent: (0, ue.zw)(H.search.error) },
                                              null,
                                              8,
                                              Wa
                                            ))
                                          : (0, ce.kq)("", !0),
                                        (0, ce._)(
                                          "div",
                                          { innerHTML: (0, R.SU)(D.ag)("titleSearchHintV2") },
                                          null,
                                          8,
                                          Ia
                                        ),
                                      ]),
                                    ]),
                                    default: (0, ce.w5)(() => [
                                      (0, ce._)(
                                        "a",
                                        {
                                          class: (0, ue.C_)(["btn-ghost", { "has-error": H.search.error }]),
                                          tabindex: "0",
                                        },
                                        [(0, ce.Wm)((0, R.SU)(Se.Z), { name: "question" })],
                                        2
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              M.value
                                ? ((0, ce.wg)(),
                                  (0, ce.iD)("div", Ra, [
                                    (0, ce._)(
                                      "span",
                                      { textContent: (0, ue.zw)((0, R.SU)(D.ag)("hintRecycleBin")) },
                                      null,
                                      8,
                                      Ta
                                    ),
                                    (0, R.SU)(P).removedScripts.length
                                      ? ((0, ce.wg)(),
                                        (0, ce.iD)(
                                          "a",
                                          {
                                            key: 0,
                                            textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonEmptyRecycleBin")),
                                            tabindex: "0",
                                            onClick: me,
                                          },
                                          null,
                                          8,
                                          Ma
                                        ))
                                      : (0, ce.kq)("", !0),
                                  ]))
                                : L.value
                                  ? ((0, ce.wg)(),
                                    (0, ce.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "hint mx-1 my-1 flex flex-col",
                                        textContent: (0, ue.zw)(L.value),
                                      },
                                      null,
                                      8,
                                      Oa
                                    ))
                                  : (0, ce.kq)("", !0),
                              (0, ce.wy)(
                                ((0, ce.wg)(),
                                (0, ce.iD)(
                                  "div",
                                  {
                                    class: "scripts",
                                    ref_key: "refList",
                                    ref: z,
                                    style: (0, ue.j5)(`--num-columns:${H.numColumns}`),
                                    "data-columns": H.numColumns,
                                    "data-show-order": l.showOrder || null,
                                    "data-table": l.viewTable || null,
                                  },
                                  [
                                    ((0, ce.wg)(!0),
                                    (0, ce.iD)(
                                      ce.HY,
                                      null,
                                      (0, ce.Ko)(H.sortedScripts, (e, t) =>
                                        (0, ce.wy)(
                                          ((0, ce.wg)(),
                                          (0, ce.j4)(
                                            (0, R.SU)(Lt),
                                            {
                                              key: e.props.id,
                                              focused: A.value === e,
                                              showHotkeys: H.showHotkeys,
                                              script: e,
                                              draggable: E.value,
                                              visible: t < H.batchRender.limit,
                                              viewTable: l.viewTable,
                                              hotkeys: f,
                                              activeTags: q.value,
                                              onRemove: he,
                                              onRestore: fe,
                                              onToggle: ze,
                                              onUpdate: De,
                                              onScrollDelta: He,
                                              onClickTag: $e,
                                            },
                                            null,
                                            8,
                                            [
                                              "focused",
                                              "showHotkeys",
                                              "script",
                                              "draggable",
                                              "visible",
                                              "viewTable",
                                              "activeTags",
                                            ]
                                          )),
                                          [[be.F8, !H.search.rules.length || !1 !== e.$cache.show]]
                                        )
                                      ),
                                      128
                                    )),
                                  ],
                                  12,
                                  Ea
                                )),
                                [[(0, R.SU)(W.Tu), !H.script]]
                              ),
                            ]))
                          : (0, ce.kq)("", !0),
                        ((0, ce.wg)(),
                        (0, ce.j4)(ce.lR, { to: "body" }, [
                          ((0, ce.wg)(),
                          (0, ce.j4)(
                            ce.Ob,
                            { key: (0, R.SU)(P).route.hash, max: 5 },
                            [
                              H.script
                                ? ((0, ce.wg)(),
                                  (0, ce.j4)(
                                    (0, R.SU)(ua),
                                    {
                                      key: 0,
                                      initial: H.script,
                                      "initial-code": H.code,
                                      "read-only": !!H.script.config.removed,
                                      onClose: t[6] || (t[6] = (e) => oe()),
                                    },
                                    null,
                                    8,
                                    ["initial", "initial-code", "read-only"]
                                  ))
                                : (0, ce.kq)("", !0),
                            ],
                            1024
                          )),
                        ])),
                      ],
                      512
                    )
                  )
                )
              },
            },
            Ka = Ba,
            Ja = ["data-show-advanced"],
            Ga = ["textContent"],
            Xa = { class: "mb-1c" },
            Qa = ["textContent"],
            eo = { class: "ml-2c flex flex-col" },
            to = ["textContent"],
            no = { class: "ml-2c" },
            lo = ["onUpdate:modelValue"],
            ao = ["value", "textContent"],
            oo = ["onUpdate:modelValue"],
            io = ["value", "textContent"],
            so = ["textContent"],
            ro = ["onUpdate:modelValue"],
            co = ["value", "textContent"],
            uo = ["textContent"],
            po = ["onUpdate:modelValue"],
            mo = ["textContent"],
            go = { class: "mb-1c" },
            vo = ["textContent"],
            ho = { class: "ml-2c flex flex-col" },
            fo = { class: "ml-2c flex flex-col" },
            wo = { class: "mb-2c" },
            bo = ["textContent"],
            yo = (0, ce._)("hr", null, null, -1),
            xo = ["open"],
            Co = ["onClick"],
            _o = { class: "mb-1c" },
            ko = ["textContent"],
            So = ["onUpdate:modelValue"],
            Uo = ["value", "textContent"],
            zo = { class: "ml-2c flex flex-col" },
            Do = ["textContent"],
            $o = ["onUpdate:modelValue"],
            Ho = ["textContent"],
            jo = ["textContent"],
            Wo = (0, ce._)("code", null, "page", -1),
            Io = ["textContent"],
            Ro = { key: 0 },
            To = (0, ce._)("code", null, "page", -1),
            Mo = ["textContent"],
            Oo = ["href"],
            Eo = ["textContent"],
            Zo = ["textContent"],
            Vo = ["innerHTML"]
          var Yo = z(3657)
          const Po = (0, z(4288).HP)(async () => {
              await ("/public/lib/zip-no-worker.min.js",
              new d((e, t) => {
                const n = document.createElement("script")
                ;(n.src = "/public/lib/zip-no-worker.min.js"), (n.onload = e), (n.onerror = t), document.body.append(n)
              }))
              const { zip: e } = t,
                n = ["/public/lib/z-worker.js"]
              return e.configure({ workerScripts: { deflate: n, inflate: n } }), e
            }),
            Ao = ["textContent", "disabled"],
            Lo = ["textContent", "title"],
            Fo = { class: "mt-1" },
            qo = (0, ce._)("br", null, null, -1),
            No = { class: "import-report" },
            Bo = ["data-type"],
            Ko = ["textContent"],
            Jo = ["textContent", "colspan"],
            Go = {
              __name: "vm-import",
              setup(e) {
                const t = (0, R.qj)([]),
                  n = (0, R.iH)(),
                  l = (0, R.iH)(""),
                  a = (0, D.ag)("confirmUndoImport"),
                  o = (0, D.ag)("labelImportScriptData"),
                  i = (0, D.ag)("labelImportSettings")
                let r
                function c() {
                  const e = document.createElement("input")
                  ;(e.type = "file"),
                    (e.accept = ".zip"),
                    (e.onchange = () => {
                      var t
                      return v(null == (t = e.files) ? void 0 : t[0])
                    }),
                    e.click()
                }
                async function v(e) {
                  P.batch || se(h, e)
                }
                async function h(e) {
                  if (!e) return
                  t.length = 0
                  const n = j.Z.get("importScriptData"),
                    a = await Po(),
                    o = new a.ZipReader(new a.BlobReader(e)),
                    i = (await o.getEntries().catch(k)) || []
                  if (t.length) return
                  k("", e.name, "info")
                  const c = {},
                    p = i.reduce((e, t) => {
                      var n
                      return e + (null == (n = t.filename) ? void 0 : n.endsWith(".user.js"))
                    }, 0),
                    m = i.find((e) => {
                      var t
                      return "violentmonkey" === (null == (t = e.filename) ? void 0 : t.toLowerCase())
                    }),
                    v = (m && (await _(m))) || {},
                    h = j.Z.get("importSettings") && v.settings,
                    f = v.scripts || {},
                    b = v.values || {}
                  let y
                  function x(e, t) {
                    try {
                      return JSON.parse(e)
                    } catch (e) {
                      k(e, t.filename, null)
                    }
                  }
                  function C(e, t) {
                    return d.all(
                      i.map(async (n) => {
                        const { filename: l } = n
                        if (null != l && l.endsWith(t)) {
                          const a = await _(n)
                          return a && e(n, a, l.slice(0, -t.length))
                        }
                      })
                    )
                  }
                  async function _(e) {
                    const t = await e.getData(new a.TextWriter())
                    return e.filename.endsWith(".js") ? t : x(t, e)
                  }
                  function k(e, n, l = "critical") {
                    t.push({ text: e, name: n, type: l })
                  }
                  function S(e = "") {
                    const n = u.keys(c).length,
                      l = (0, D.ag)("msgImported", [n === p ? n : `${n} / ${p}`])
                    return (t[0].name = l), (t[0].text = e), l
                  }
                  function U(e) {
                    return (0, D.rY)(e).filter((e) => "string" == typeof e)
                  }
                  r ||
                    ((y = " \u2bc8 " + new Date().toLocaleTimeString()),
                    (r = g.runtime.connect({ name: "undoImport" })),
                    await new d(w)),
                    await C(async (e, n, l) => {
                      const { meta: a, settings: o = {}, options: i } = n
                      if (!a || !i) return
                      const s = i.override || {}
                      ;(t[0].text = "Tampermonkey"),
                        (f[l] = {
                          config: { enabled: !1 !== o.enabled ? 1 : 0, shouldUpdate: i.check_for_updates ? 1 : 0 },
                          custom: {
                            [B]: "string" == typeof a.file_url ? a.file_url : void 0,
                            noframes: null == s.noframes ? void 0 : +!!s.noframes,
                            runAt: Nt.qh.test(i.run_at) ? i.run_at : void 0,
                            [F]: U(s.use_excludes),
                            [A]: U(s.use_includes),
                            [L]: U(s.use_matches),
                            [X]: !1 !== s.merge_excludes,
                            [ee]: !1 !== s.merge_includes,
                            [te]: !1 !== s.merge_matches,
                          },
                          position: +o.position || void 0,
                          props: { lastModified: +a.modified, lastUpdated: +a.modified },
                        })
                    }, ".options.json"),
                    await C(async (e, t, n) => {
                      var l, a, o, i
                      const { filename: s } = e,
                        r = f[n],
                        u = {
                          code: t,
                          ...(r && {
                            custom: r.custom,
                            config: {
                              enabled: null != (l = r.enabled) ? l : 1,
                              shouldUpdate: null != (a = r.update) ? a : 1,
                              ...r.config,
                            },
                            position: r.position,
                            props: {
                              lastModified:
                                r.lastModified || (null == (o = r.props) ? void 0 : o.lastModified) || +e.lastModDate,
                              lastUpdated:
                                r.lastUpdated || (null == (i = r.props) ? void 0 : i.lastUpdated) || +e.lastModDate,
                            },
                          }),
                        }
                      try {
                        ;(c[n] = (await (0, D.gj)("ParseScript", u)).update.props.uri), S(s)
                      } catch (e) {
                        k(e, s, "script")
                      }
                    }, ".user.js"),
                    n &&
                      (await C(async (e, n, l) => {
                        ;(t[0].text = "Tampermonkey"), (b[c[l]] = n.data)
                      }, ".storage.json"),
                      (0, D.gj)("SetValueStores", b)),
                    s(h) && (delete h.sync, (0, D.gj)("SetOptions", h)),
                    (0, D.gj)("CheckPosition"),
                    await o.close(),
                    S(),
                    y && (l.value = y)
                }
                async function f() {
                  ;(await (0, W.GW)(a)) && ((l.value = ""), r.postMessage(!0), await new d(w))
                }
                function w(e) {
                  r.onMessage.addListener(function t() {
                    r.onMessage.removeListener(t), e()
                  })
                }
                function b(e) {
                  let t
                  const n = (t) => e.classList.toggle("drop-allowed", t),
                    l = () => n(!1),
                    a = () => {
                      clearTimeout(t), (t = setTimeout(l, 250))
                    },
                    o = (e) => {
                      clearTimeout(t)
                      const l = e.dataTransfer.types.includes("Files")
                      l && e.preventDefault(), n(l)
                    },
                    i = async (e) => {
                      e.preventDefault(), n(!1)
                      const t = e.dataTransfer.files[0]
                      ;(await (0, W.GW)((0, D.ag)("buttonImportData"))) && (await v(t))
                    }
                  return () => {
                    const e = P.route.hash === C ? p : m
                    e("dragend", l), e("dragleave", a), e("dragover", o), e("drop", i)
                  }
                }
                return (
                  (0, ce.bv)(() => {
                    const e = b(n.value)
                    p("hashchange", e), e()
                  }),
                  (e, s) => (
                    (0, ce.wg)(),
                    (0, ce.iD)("div", null, [
                      (0, ce._)(
                        "button",
                        {
                          textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonImportData")),
                          onClick: c,
                          ref_key: "buttonImport",
                          ref: n,
                          disabled: (0, R.SU)(P).batch,
                        },
                        null,
                        8,
                        Ao
                      ),
                      l.value
                        ? ((0, ce.wg)(),
                          (0, ce.iD)(
                            "button",
                            {
                              key: 0,
                              textContent: (0, ue.zw)((0, R.SU)(D.ag)("buttonUndo") + l.value),
                              onClick: f,
                              class: "has-error",
                              title: (0, R.SU)(a),
                            },
                            null,
                            8,
                            Lo
                          ))
                        : (0, ce.kq)("", !0),
                      (0, ce._)("div", Fo, [
                        (0, ce.Wm)((0, R.SU)(ke.Z), { name: "importScriptData", label: (0, R.SU)(o) }, null, 8, [
                          "label",
                        ]),
                        qo,
                        (0, ce.Wm)((0, R.SU)(ke.Z), { name: "importSettings", label: (0, R.SU)(i) }, null, 8, [
                          "label",
                        ]),
                      ]),
                      (0, ce._)("table", No, [
                        ((0, ce.wg)(!0),
                        (0, ce.iD)(
                          ce.HY,
                          null,
                          (0, ce.Ko)(
                            t,
                            ({ type: e, name: t, text: n }, l) => (
                              (0, ce.wg)(),
                              (0, ce.iD)(
                                "tr",
                                { key: l, "data-type": e },
                                [
                                  t
                                    ? ((0, ce.wg)(),
                                      (0, ce.iD)("td", { key: 0, textContent: (0, ue.zw)(t) }, null, 8, Ko))
                                    : (0, ce.kq)("", !0),
                                  (0, ce._)("td", { textContent: (0, ue.zw)(n), colspan: t ? null : 2 }, null, 8, Jo),
                                ],
                                8,
                                Bo
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                    ])
                  )
                )
              },
            },
            Xo = Go
          var Qo = z(950),
            ei = z(4460),
            ti = z(3557)
          const ni = (0, D.ag)("msgDateFormatInfo", u.keys(ei.q).join(", ")),
            li = {
              __name: "vm-date-info",
              setup: (e) => (e, t) => (
                (0, ce.wg)(),
                (0, ce.j4)(
                  (0, R.SU)(_e.Z),
                  { content: (0, R.SU)(ni), placement: "left", style: { "vertical-align": "middle" } },
                  {
                    default: (0, ce.w5)(() => [
                      (0, ce._)("a", { href: "https://momentjs.com/docs/#/displaying/format/", target: "_blank" }, [
                        (0, ce.Wm)((0, R.SU)(Se.Z), { name: "info" }),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["content"]
                )
              ),
            },
            ai = { class: "export" },
            oi = { class: "flex flex-wrap center-items mr-1c" },
            ii = ["textContent", "disabled"],
            si = ["textContent"],
            ri = { class: "mt-1" },
            ci = { class: "modal-content" },
            ui = ["download", "href"],
            di = (0, ce._)("br", null, null, -1),
            pi = (0, ce._)("strong", null, "scripts.zip", -1),
            mi = {
              __name: "vm-export",
              setup(e) {
                let t
                const n = (0, R.iH)(),
                  l = (0, R.iH)(!1),
                  a = (0, R.iH)(b && {}),
                  o = (0, ce.Fl)(() => {
                    const e = n.value
                    return e && `${(0, ei.p)(e.text.trim() || e.defaultValue)}.zip`
                  })
                async function i() {
                  try {
                    ;(l.value = !0), b && !t && (t = await (0, D.gj)("UA")), s(await c())
                  } finally {
                    l.value = !1
                  }
                }
                function s(e) {
                  const n = b && parseFloat(t.version),
                    l = o.value
                  if (n && ("win" === t.os ? n < 56 : "mac" === t.os ? n < 61 : n < 63)) {
                    const t = new FileReader()
                    ;(t.onload = () => {
                      a.value = { name: l, url: t.result }
                    }),
                      t.readAsDataURL(e)
                  } else (0, ti.l)(e, l)
                }
                function r(e) {
                  return e.replace(/[\\/:*?"<>|]/g, "-")
                }
                async function c() {
                  const e = j.Z.get("exportValues"),
                    t = await (0, D.gj)("ExportZip", { values: e }),
                    n = {},
                    l = { scripts: {}, settings: j.Z.get() }
                  delete l.settings.sync, e && (l.values = {})
                  const a = ((0, xe._M)(t, "items") || []).map(({ script: a, code: o }) => {
                    let i = r((0, D.pV)(a))
                    n[i] ? ((n[i] += 1), (i = `${i}_${n[i]}`)) : (n[i] = 1)
                    const { lastModified: s, lastUpdated: c } = a.props,
                      u = {
                        custom: a.custom,
                        config: a.config,
                        position: a.props.position,
                        lastModified: s,
                        lastUpdated: c,
                      }
                    if (e) {
                      const e = t.values[a.props.id]
                      e && (l.values[a.props.uri] = e)
                    }
                    return (l.scripts[i] = u), { name: `${i}.user.js`, content: o, lastModDate: new Date(c || s) }
                  })
                  a.push({ name: "violentmonkey", content: JSON.stringify(l, null, 2) })
                  const o = await Po(),
                    i = new o.BlobWriter("application/zip"),
                    s = new o.ZipWriter(i, { bufferedWrite: !0, keepOrder: !1 })
                  return (
                    await d.all(
                      a.map((e) => s.add(e.name, new o.TextReader(e.content), { lastModDate: e.lastModDate }))
                    ),
                    await s.close()
                  )
                }
                return (e, t) => (
                  (0, ce.wg)(),
                  (0, ce.iD)("div", ai, [
                    (0, ce._)("div", oi, [
                      (0, ce._)(
                        "button",
                        { textContent: (0, ue.zw)(e.i18n("buttonExportData")), onClick: i, disabled: l.value },
                        null,
                        8,
                        ii
                      ),
                      (0, ce.Wm)(
                        (0, R.SU)(Yn.Z),
                        {
                          name: "exportNameTemplate",
                          ref_key: "tpl",
                          ref: n,
                          "has-reset": "",
                          "has-save": !1,
                          rows: 1,
                          class: "tpl flex flex-1 center-items ml-1c",
                        },
                        null,
                        512
                      ),
                      (0, ce.Wm)((0, R.SU)(li)),
                      (0, ce._)("span", { hidden: "", textContent: (0, ue.zw)(o.value) }, null, 8, si),
                    ]),
                    (0, ce._)("div", ri, [
                      (0, ce.Wm)(
                        (0, R.SU)(ke.Z),
                        { name: "exportValues", label: e.i18n("labelExportScriptData") },
                        null,
                        8,
                        ["label"]
                      ),
                    ]),
                    a.value
                      ? ((0, ce.wg)(),
                        (0, ce.j4)(
                          (0, R.SU)(Qo.Z),
                          {
                            key: 0,
                            transition: "in-out",
                            show: !!a.value.url,
                            onClose: t[0] || (t[0] = (e) => (a.value = {})),
                          },
                          {
                            default: (0, ce.w5)(() => [
                              (0, ce._)("div", ci, [
                                (0, ce._)(
                                  "a",
                                  { download: a.value.name, href: a.value.url },
                                  [(0, ce.Uk)(" Right click and save as"), di, pi],
                                  8,
                                  ui
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["show"]
                        ))
                      : (0, ce.kq)("", !0),
                  ])
                )
              },
            },
            gi = mi,
            vi = { class: "mr-1c" },
            hi = ["disabled", "textContent"],
            fi = ["disabled", "title", "textContent"],
            wi = {
              __name: "vm-maintenance",
              setup(e) {
                const t = (0, R.iH)((0, D.ag)("buttonVacuum")),
                  n = (0, D.ag)("buttonResetSettings"),
                  l = (0, R.iH)(""),
                  a = (0, R.iH)(n)
                async function o(e, t) {
                  if (await (0, W.GW)(t, { ok: { className: "has-error" } })) return se(e)
                }
                function i() {
                  const e = ["lastModified", "lastUpdate", "sync"],
                    t = w(xe.Xw, Yo.ZP, null, (t, n) => !e.includes(t) && !(0, xe.vZ)(n, j.Z.get(t)) && t)
                  return (
                    (l.value = JSON.stringify(t, null, 2)
                      .slice(1, -1)
                      .replace(/^\s{2}/gm, "")),
                    (a.value = `${n} (${u.keys(t).length})`),
                    (0, D.gj)("SetOptions", t)
                  )
                }
                async function s() {
                  await se(async () => {
                    t.value = (0, D.ag)("buttonVacuuming")
                    const { fixes: e, errors: n } = await (0, D.gj)("Vacuum"),
                      l = null == n ? void 0 : n.join("\n")
                    ;(t.value = (0, D.ag)("buttonVacuumed") + (e ? ` (${e})` : "")),
                      l && (0, W.GW)((0, D.ag)("msgErrorFetchingResource") + "\n\n" + l, { cancel: !1 })
                  })
                }
                return (e, r) => (
                  (0, ce.wg)(),
                  (0, ce.iD)("div", vi, [
                    (0, ce.Wm)(
                      (0, R.SU)(_e.Z),
                      { content: (0, R.SU)(D.ag)("hintVacuum") },
                      {
                        default: (0, ce.w5)(() => [
                          (0, ce._)(
                            "button",
                            { onClick: s, disabled: (0, R.SU)(P).batch, textContent: (0, ue.zw)(t.value) },
                            null,
                            8,
                            hi
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["content"]
                    ),
                    (0, ce._)(
                      "button",
                      {
                        onClick: r[0] || (r[0] = (e) => o(i, (0, R.SU)(n))),
                        disabled: (0, R.SU)(P).batch,
                        title: l.value,
                        textContent: (0, ue.zw)(a.value),
                      },
                      null,
                      8,
                      fi
                    ),
                  ])
                )
              },
            },
            bi = { class: "mb-1c" },
            yi = ["textContent"],
            xi = { key: 0, class: "flex flex-wrap center-items" },
            Ci = ["textContent"],
            _i = ["value"],
            ki = ["textContent", "value"],
            Si = ["textContent", "disabled"],
            Ui = ["disabled"],
            zi = ["textContent"],
            Di = { key: 1, class: "mt-1c" },
            $i = { class: "sync-server-url" },
            Hi = ["textContent"],
            ji = ["disabled"],
            Wi = { class: "mr-2c" },
            Ii = ["textContent"],
            Ri = ["disabled"],
            Ti = { class: "inline-block" },
            Mi = ["textContent"],
            Oi = ["disabled"],
            Ei = ["disabled"],
            Zi = ["textContent"],
            Vi = ["textContent", "disabled"],
            Yi = { key: 2 },
            Pi = "sync.current",
            Ai = { current: "" }
          ;(0, ye.Z)(Pi, (e) => {
            Ai.current = e || ""
          })
          const Li = {
              components: { SettingCheck: ke.Z, Icon: Se.Z, Tooltip: _e.Z },
              data: () => ({ syncConfig: Ai, store: P }),
              computed: {
                syncServices() {
                  const e = this.store.sync
                  return e && e.length
                    ? [{ displayName: this.i18n("labelSyncDisabled"), name: "", properties: {} }, ...e]
                    : null
                },
                service() {
                  if (this.syncServices) {
                    const e = this.syncConfig.current || ""
                    let t = this.syncServices.find((t) => t.name === e)
                    return t || (console.warn("Invalid current service:", e), (t = this.syncServices[0])), t
                  }
                  return null
                },
                state() {
                  const { service: e } = this
                  if (e) {
                    const t =
                        ["idle", "error"].includes(e.syncState) &&
                        ["no-auth", "unauthorized", "error", "authorized"].includes(e.authState),
                      n = t && "authorized" === e.authState
                    return {
                      message: this.getMessage(),
                      label: this.getLabel(),
                      canAuthorize: t,
                      canSync: n,
                      authType: e.properties.authType,
                      userConfig: e.userConfig || {},
                    }
                  }
                  return null
                },
              },
              methods: {
                onSaveUserConfig() {
                  ;(0, D.gj)("SyncSetConfig", this.state.userConfig)
                },
                onSyncChange(e) {
                  const { value: t } = e.target
                  j.Z.set(Pi, t)
                },
                onAuthorize() {
                  const { service: e } = this
                  ;["authorized"].includes(e.authState)
                    ? (0, D.gj)("SyncRevoke")
                    : ["no-auth", "unauthorized", "error"].includes(e.authState) && (0, D.gj)("SyncAuthorize")
                },
                onSync() {
                  ;(0, D.gj)("SyncStart")
                },
                getMessage() {
                  const { service: e } = this
                  if ("initializing" === e.authState) return this.i18n("msgSyncInit")
                  if ("no-auth" === e.authState) return this.i18n("msgSyncNoAuthYet")
                  if ("error" === e.authState) return this.i18n("msgSyncInitError")
                  if ("unauthorized" === e.authState) return this.i18n("msgSyncInitError")
                  if ("error" === e.syncState) return this.i18n("msgSyncError")
                  if ("ready" === e.syncState) return this.i18n("msgSyncReady")
                  if ("syncing" === e.syncState) {
                    let t = ""
                    return (
                      e.progress && e.progress.total && (t = ` (${e.progress.finished}/${e.progress.total})`),
                      this.i18n("msgSyncing") + t
                    )
                  }
                  if (e.lastSync) {
                    const t = new Date(e.lastSync).toLocaleString()
                    return this.i18n("lastSync", t)
                  }
                },
                getLabel() {
                  const { service: e } = this
                  return "authorizing" === e.authState
                    ? this.i18n("labelSyncAuthorizing")
                    : "authorized" === e.authState
                      ? this.i18n("labelSyncRevoke")
                      : this.i18n("labelSyncAuthorize")
                },
              },
            },
            Fi = (0, At.Z)(Li, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var i, s
                  const r = (0, ce.up)("icon"),
                    c = (0, ce.up)("tooltip"),
                    u = (0, ce.up)("setting-check")
                  return (
                    (0, ce.wg)(),
                    (0, ce.iD)("section", bi, [
                      (0, ce._)("h3", { textContent: (0, ue.zw)(e.i18n("labelSync")) }, null, 8, yi),
                      o.state
                        ? ((0, ce.wg)(),
                          (0, ce.iD)("div", xi, [
                            (0, ce._)("span", { textContent: (0, ue.zw)(e.i18n("labelSyncService")) }, null, 8, Ci),
                            (0, ce._)(
                              "select",
                              {
                                class: "mx-1",
                                value: a.syncConfig.current,
                                onChange: t[0] || (t[0] = (...e) => o.onSyncChange && o.onSyncChange(...e)),
                              },
                              [
                                ((0, ce.wg)(!0),
                                (0, ce.iD)(
                                  ce.HY,
                                  null,
                                  (0, ce.Ko)(
                                    o.syncServices,
                                    (e) => (
                                      (0, ce.wg)(),
                                      (0, ce.iD)(
                                        "option",
                                        { key: e.name, textContent: (0, ue.zw)(e.displayName), value: e.name },
                                        null,
                                        8,
                                        ki
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ],
                              40,
                              _i
                            ),
                            o.service.name && "oauth" === o.state.authType
                              ? ((0, ce.wg)(),
                                (0, ce.iD)(
                                  "button",
                                  {
                                    key: 0,
                                    textContent: (0, ue.zw)(o.state.label),
                                    disabled: !o.state.canAuthorize,
                                    onClick: t[1] || (t[1] = (...e) => o.onAuthorize && o.onAuthorize(...e)),
                                  },
                                  null,
                                  8,
                                  Si
                                ))
                              : (0, ce.kq)("", !0),
                            o.service.name
                              ? ((0, ce.wg)(),
                                (0, ce.j4)(
                                  c,
                                  { key: 1, content: e.i18n("labelSync"), class: "stretch-self flex mr-1" },
                                  {
                                    default: (0, ce.w5)(() => [
                                      (0, ce._)(
                                        "button",
                                        {
                                          disabled: !o.state.canSync,
                                          onClick: t[2] || (t[2] = (...e) => o.onSync && o.onSync(...e)),
                                          class: "flex center-items",
                                        },
                                        [(0, ce.Wm)(r, { name: "refresh" })],
                                        8,
                                        Ui
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["content"]
                                ))
                              : (0, ce.kq)("", !0),
                            o.state
                              ? ((0, ce.wg)(),
                                (0, ce.iD)("p", { key: 2, textContent: (0, ue.zw)(o.state.message) }, null, 8, zi))
                              : (0, ce.kq)("", !0),
                          ]))
                        : (0, ce.kq)("", !0),
                      "password" === (null == (i = o.state) ? void 0 : i.authType)
                        ? ((0, ce.wg)(),
                          (0, ce.iD)("fieldset", Di, [
                            (0, ce._)("label", $i, [
                              (0, ce._)("span", { textContent: (0, ue.zw)(e.i18n("labelSyncServerUrl")) }, null, 8, Hi),
                              (0, ce.wy)(
                                (0, ce._)(
                                  "input",
                                  {
                                    type: "url",
                                    "onUpdate:modelValue": t[3] || (t[3] = (e) => (o.state.userConfig.serverUrl = e)),
                                    disabled: !o.state.canAuthorize,
                                  },
                                  null,
                                  8,
                                  ji
                                ),
                                [[be.nr, o.state.userConfig.serverUrl]]
                              ),
                            ]),
                            (0, ce._)("div", Wi, [
                              (0, ce._)("label", null, [
                                (0, ce._)(
                                  "span",
                                  { textContent: (0, ue.zw)(e.i18n("labelSyncUsername")) },
                                  null,
                                  8,
                                  Ii
                                ),
                                (0, ce.wy)(
                                  (0, ce._)(
                                    "input",
                                    {
                                      type: "text",
                                      "onUpdate:modelValue": t[4] || (t[4] = (e) => (o.state.userConfig.username = e)),
                                      disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                    },
                                    null,
                                    8,
                                    Ri
                                  ),
                                  [[be.nr, o.state.userConfig.username]]
                                ),
                              ]),
                              (0, ce._)("label", Ti, [
                                (0, ce._)(
                                  "span",
                                  { textContent: (0, ue.zw)(e.i18n("labelSyncPassword")) },
                                  null,
                                  8,
                                  Mi
                                ),
                                (0, ce.wy)(
                                  (0, ce._)(
                                    "input",
                                    {
                                      type: "password",
                                      "onUpdate:modelValue": t[5] || (t[5] = (e) => (o.state.userConfig.password = e)),
                                      disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                    },
                                    null,
                                    8,
                                    Oi
                                  ),
                                  [[be.nr, o.state.userConfig.password]]
                                ),
                              ]),
                              (0, ce._)("label", null, [
                                (0, ce.wy)(
                                  (0, ce._)(
                                    "input",
                                    {
                                      type: "checkbox",
                                      "onUpdate:modelValue": t[6] || (t[6] = (e) => (o.state.userConfig.anonymous = e)),
                                      disabled: !o.state.canAuthorize,
                                    },
                                    null,
                                    8,
                                    Ei
                                  ),
                                  [[be.e8, o.state.userConfig.anonymous]]
                                ),
                                (0, ce._)(
                                  "span",
                                  { textContent: (0, ue.zw)(e.i18n("labelSyncAnonymous")) },
                                  null,
                                  8,
                                  Zi
                                ),
                              ]),
                            ]),
                            (0, ce._)("div", null, [
                              (0, ce._)(
                                "button",
                                {
                                  textContent: (0, ue.zw)(e.i18n("buttonSave")),
                                  onClick:
                                    t[7] ||
                                    (t[7] = (0, be.iM)(
                                      (...e) => o.onSaveUserConfig && o.onSaveUserConfig(...e),
                                      ["prevent"]
                                    )),
                                  disabled: !o.state.canAuthorize,
                                },
                                null,
                                8,
                                Vi
                              ),
                            ]),
                          ]))
                        : (0, ce.kq)("", !0),
                      null != (s = o.service) && s.name
                        ? ((0, ce.wg)(),
                          (0, ce.iD)("div", Yi, [
                            (0, ce.Wm)(
                              u,
                              { name: "syncScriptStatus", label: e.i18n("labelSyncScriptStatus") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]))
                        : (0, ce.kq)("", !0),
                    ])
                  )
                },
              ],
            ]),
            qi = ["textContent"],
            Ni = { class: "mb-1 mr-1c flex center-items" },
            Bi = ["textContent"],
            Ki = ["disabled", "title"],
            Ji = ["textContent"],
            Gi = ["textContent"],
            Xi = ["textContent"],
            Qi = ["textContent"],
            es = ["innerHTML"],
            ts = { class: "btn-ghost", style: { border: "none" } },
            ns = ["textContent"],
            ls = ["innerHTML"],
            as = ["innerHTML"],
            os = ["textContent"],
            is = "editorTheme",
            ss = "editorThemeName",
            rs = [
              "3024-day",
              "3024-night",
              "abbott",
              "abcdef",
              "ambiance-mobile",
              "ambiance",
              "ayu-dark",
              "ayu-mirage",
              "base16-dark",
              "base16-light",
              "bespin",
              "blackboard",
              "cobalt",
              "colorforth",
              "darcula",
              "dracula",
              "duotone-dark",
              "duotone-light",
              "eclipse",
              "elegant",
              "erlang-dark",
              "gruvbox-dark",
              "hopscotch",
              "icecoder",
              "idea",
              "isotope",
              "juejin",
              "lesser-dark",
              "liquibyte",
              "lucario",
              "material-darker",
              "material-ocean",
              "material-palenight",
              "material",
              "mbo",
              "mdn-like",
              "midnight",
              "monokai",
              "moxer",
              "neat",
              "neo",
              "night",
              "nord",
              "oceanic-next",
              "panda-syntax",
              "paraiso-dark",
              "paraiso-light",
              "pastel-on-dark",
              "railscasts",
              "rubyblue",
              "seti",
              "shadowfox",
              "solarized",
              "ssms",
              "the-matrix",
              "tomorrow-night-bright",
              "tomorrow-night-eighties",
              "ttcn",
              "twilight",
              "vibrant-ink",
              "xq-dark",
              "xq-light",
              "yeti",
              "yonce",
              "zenburn",
            ],
            cs = "codemirror/CodeMirror",
            us = "master",
            ds = "theme",
            ps = `https://github.com/${cs}/tree/${us}/${ds}`,
            ms = "default",
            gs = {
              __name: "vm-editor",
              setup(e) {
                const t = (0, R.iH)(),
                  n = (0, R.iH)(),
                  l = (0, R.iH)(!1),
                  a = (0, R.iH)(),
                  o = (0, R.iH)(),
                  s = (0, R.iH)(),
                  r = (0, R.iH)(),
                  c = (0, R.iH)()
                async function p(e, t = "text") {
                  const n = (0, W.vY)()
                  o.value = !0
                  try {
                    const n = await (await fetch(e))[t]()
                    return (s.value = null), n
                  } catch (e) {
                    s.value = e.message || e.code || `${e}`
                  } finally {
                    ;(o.value = !1), await (0, ce.Y3)(), null == n || n.focus()
                  }
                }
                async function m(e) {
                  let l
                  if (e) {
                    const e = ["mode", "value", "configureMouse", "lineNumberFormatter", "specialCharPlaceholder"],
                      t = {}
                    u
                      .entries({
                        ...(await d.resolve().then(z.t.bind(z, 4631, 23))).default.defaults,
                        ...(await d.resolve().then(z.bind(z, 206))).default.data().cmDefaults,
                        ...j.Z.get("editor"),
                      })
                      .sort(([e], [t]) => (e < t ? -1 : e > t))
                      .filter(([t, n]) => !e.includes(t) && !i(n))
                      .forEach(([e, n]) => {
                        t[e] = n
                      }),
                      (l = JSON.stringify(t, null, "  "))
                  }
                  ;(n.value = l),
                    l &&
                      (await (0, ce.Y3)(),
                      t.value.getBoundingClientRect().bottom > innerHeight &&
                        t.value.scrollIntoView({ behavior: "smooth" }))
                }
                return (
                  (0, ce.bv)(async () => {
                    let e
                    await j.Z.ready,
                      (0, ce.YP)(l, m),
                      (0, ce.YP)(c, async (t) => {
                        if (e) return void (e = !1)
                        const n = t && t !== ms && `https://raw.githubusercontent.com/${cs}/${us}/${ds}/${t}.css`,
                          l = n && (await p(n))
                        j.Z.set(ss, !n || l ? t : ms), j.Z.set(is, l || "")
                      }),
                      (0, ye.Z)(ss, (t) => {
                        var n
                        c.value != (null != (n = t) ? n : (t = ms)) && ((e = !0), (c.value = t))
                      }),
                      (0, ye.Z)(is, (e) => {
                        var t
                        r.value = (t = e)
                          ? t
                              .split("\n", 21)
                              .map((e, t) => (20 === t ? "..." : e.length > 100 && `${e.slice(0, 100)}...`) || e)
                              .join("\n")
                          : null
                      })
                  }),
                  (e, i) => (
                    (0, ce.wg)(),
                    (0, ce.iD)(
                      "section",
                      { ref_key: "$el", ref: t },
                      [
                        (0, ce._)("h3", { textContent: (0, ue.zw)(e.i18n("labelEditor")) }, null, 8, qi),
                        (0, ce._)("div", Ni, [
                          (0, ce._)("span", { textContent: (0, ue.zw)(e.i18n("labelTheme")) }, null, 8, Bi),
                          (0, ce.wy)(
                            (0, ce._)(
                              "select",
                              {
                                "onUpdate:modelValue": i[0] || (i[0] = (e) => (c.value = e)),
                                disabled: o.value,
                                title: r.value,
                              },
                              [
                                (0, ce._)(
                                  "option",
                                  { value: ms, textContent: (0, ue.zw)(e.i18n("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Ji
                                ),
                                (0, ce._)(
                                  "option",
                                  { value: "", textContent: (0, ue.zw)(e.i18n("labelBadgeNone")) },
                                  null,
                                  8,
                                  Gi
                                ),
                                ((0, ce.wg)(!0),
                                (0, ce.iD)(
                                  ce.HY,
                                  null,
                                  (0, ce.Ko)(
                                    (0, R.SU)(rs),
                                    (e) => (
                                      (0, ce.wg)(),
                                      (0, ce.iD)("option", { key: e, textContent: (0, ue.zw)(e) }, null, 8, Xi)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              Ki
                            ),
                            [[be.bM, c.value]]
                          ),
                          (0, ce._)("a", { href: ps, target: "_blank" }, "\u2197"),
                          (0, ce._)("p", { textContent: (0, ue.zw)(s.value) }, null, 8, Qi),
                        ]),
                        (0, ce._)("p", { class: "my-1", innerHTML: e.i18n("descEditorOptions") }, null, 8, es),
                        (0, ce.Wm)(
                          (0, R.SU)(Yn.Z),
                          { name: "editor", json: "", "has-reset": "", onDblclick: (0, R.SU)(re) },
                          {
                            default: (0, ce.w5)(() => [
                              (0, ce._)(
                                "a",
                                { class: "ml-1", tabindex: "0", onClick: i[1] || (i[1] = (e) => (a.value = !a.value)) },
                                [(0, ce.Wm)((0, R.SU)(Se.Z), { name: "info" })]
                              ),
                              (0, ce._)("label", ts, [
                                (0, ce.wy)(
                                  (0, ce._)(
                                    "input",
                                    { type: "checkbox", "onUpdate:modelValue": i[2] || (i[2] = (e) => (l.value = e)) },
                                    null,
                                    512
                                  ),
                                  [[be.e8, l.value]]
                                ),
                                (0, ce._)(
                                  "span",
                                  { textContent: (0, ue.zw)(e.i18n("buttonShowEditorState")) },
                                  null,
                                  8,
                                  ns
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["onDblclick"]
                        ),
                        a.value
                          ? ((0, ce.wg)(),
                            (0, ce.iD)(
                              ce.HY,
                              { key: 0 },
                              [
                                (0, ce._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsGeneric") },
                                  null,
                                  8,
                                  ls
                                ),
                                (0, ce._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsVM") },
                                  null,
                                  8,
                                  as
                                ),
                              ],
                              64
                            ))
                          : (0, ce.kq)("", !0),
                        (0, ce._)(
                          "pre",
                          { textContent: (0, ue.zw)(n.value), class: "monospace-font dim-hint" },
                          null,
                          8,
                          os
                        ),
                      ],
                      512
                    )
                  )
                )
              },
            },
            vs = ["textContent"],
            hs = { class: "flex flex-wrap" },
            fs = { key: 0, class: "text-red" },
            ws = ["textContent"],
            bs = {
              __name: "vm-blacklist-body",
              props: { name: String, desc: String },
              setup(e) {
                const t = e,
                  n = (0, R.iH)()
                return (
                  (0, ce.bv)(async () => {
                    n.value = await (0, D.gj)("Storage", ["base", "getOne", t.name + Nt.Sg])
                  }),
                  (e, l) => (
                    (0, ce.wg)(),
                    (0, ce.iD)(
                      ce.HY,
                      null,
                      [
                        (0, ce._)("p", { textContent: (0, ue.zw)(t.desc), class: "mt-1" }, null, 8, vs),
                        (0, ce._)("div", hs, [
                          (0, ce.Wm)(
                            (0, R.SU)(Yn.Z),
                            { name: t.name, class: "flex-1", onBgError: l[0] || (l[0] = (e) => (n.value = e)) },
                            null,
                            8,
                            ["name"]
                          ),
                          n.value
                            ? ((0, ce.wg)(),
                              (0, ce.iD)("ol", fs, [
                                ((0, ce.wg)(!0),
                                (0, ce.iD)(
                                  ce.HY,
                                  null,
                                  (0, ce.Ko)(
                                    n.value,
                                    (e) => (
                                      (0, ce.wg)(),
                                      (0, ce.iD)("li", { key: e, textContent: (0, ue.zw)(e) }, null, 8, ws)
                                    )
                                  ),
                                  128
                                )),
                              ]))
                            : (0, ce.kq)("", !0),
                        ]),
                      ],
                      64
                    )
                  )
                )
              },
            },
            ys = ["textContent"],
            xs = ["textContent"],
            Cs = {
              __name: "vm-blacklist",
              setup: (e) => (e, t) => (
                (0, ce.wg)(),
                (0, ce.iD)("section", null, [
                  (0, ce._)("h3", { textContent: (0, ue.zw)(e.i18n("labelBlacklist")) }, null, 8, ys),
                  (0, ce._)("p", null, [
                    (0, ce._)(
                      "a",
                      {
                        href: "https://violentmonkey.github.io/posts/smart-rules-for-blacklist/#blacklist-patterns",
                        textContent: (0, ue.zw)(e.i18n("learnBlacklist")),
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                      null,
                      8,
                      xs
                    ),
                  ]),
                  (0, ce.Wm)((0, R.SU)(bs), { name: (0, R.SU)(Nt.hl), desc: e.i18n("descBlacklist") }, null, 8, [
                    "name",
                    "desc",
                  ]),
                  (0, ce.Wm)((0, R.SU)(bs), { name: (0, R.SU)(Nt.g4), desc: e.i18n("descBlacklistNet") }, null, 8, [
                    "name",
                    "desc",
                  ]),
                ])
              ),
            },
            _s = { badgeColor: (0, D.ag)("titleBadgeColor"), badgeColorBlocked: (0, D.ag)("titleBadgeColorBlocked") },
            ks = u.keys(_s),
            Ss = { enum: _s, normalize: (e, t) => (/^#[0-9a-f]{6}$/i.test(e) ? e : Yo.ZP[t]) },
            Us = {
              autoUpdate: { normalize: (e) => Math.max(0, Math.min(365, +e || 0)) },
              defaultInjectInto: { enum: Nt.Wg },
              showAdvanced: { normalize: (e) => e },
              showBadge: {
                enum: {
                  "": (0, D.ag)("labelBadgeNone"),
                  unique: (0, D.ag)("labelBadgeUnique"),
                  total: (0, D.ag)("labelBadgeTotal"),
                },
              },
              "filtersPopup.hideDisabled": {
                enum: {
                  "": (0, D.ag)("optionPopupShowDisabled"),
                  group: (0, D.ag)("optionPopupGroupDisabled"),
                  hide: (0, D.ag)("optionPopupHideDisabled"),
                },
              },
              "filtersPopup.sort": {
                enum: { exec: (0, D.ag)("filterExecutionOrder"), alpha: (0, D.ag)("filterAlphabeticalOrder") },
              },
              uiTheme: {
                enum: {
                  "": (0, D.ag)("optionUiThemeAuto"),
                  dark: (0, D.ag)("optionUiThemeDark"),
                  light: (0, D.ag)("optionUiThemeLight"),
                },
              },
              xhrInject: { normalize: (e) => e },
              ...w(xe.Xw, _s, () => Ss),
            },
            zs = (e, t) => (f(Us[t].enum, e) ? e : u.keys(Us[t].enum)[0]),
            Ds = (e, t) =>
              (0, D.Ds)((n, l) => {
                ;(n = t(n, e)) !== (l = t(l, e)) && j.Z.set(e, n)
              }, 50),
            $s = (0, R.qj)({}),
            Hs = {
              components: {
                VmImport: Xo,
                VmExport: gi,
                VmMaintenance: wi,
                VmSync: Fi,
                VmEditor: gs,
                VmBlacklist: Cs,
                VmDateInfo: li,
                SettingCheck: ke.Z,
                SettingText: Yn.Z,
                LocaleGroup: Ue.Z,
                Tooltip: _e.Z,
              },
              data: () => ({ expose: null, items: Us, settings: $s }),
              computed: {
                editorWindowHint() {
                  var e
                  return null != (e = g.windows) && e.onBoundsChanged ? null : this.i18n("optionEditorWindowHint")
                },
                isCustomBadgeColor: () => ks.some((e) => $s[e] !== Yo.ZP[e]),
              },
              methods: {
                ctrlS() {
                  ;(0, W.vY)().dispatchEvent(new Event("ctrl-s"))
                },
                onResetBadgeColors() {
                  ks.forEach((e) => {
                    $s[e] = Yo.ZP[e]
                  })
                },
              },
              activated() {
                ;(0, W.wO)(this.$el),
                  (this.revokers = [we.$J.register("ctrlcmd-s", this.ctrlS, { condition: "inputFocus" })]),
                  w(xe.LI, Us, ([e, { normalize: t = zs }]) => {
                    this.revokers.push(
                      (0, ye.Z)(e, (n) => {
                        $s[e] = t(n, e)
                      })
                    ),
                      this.$watch(() => $s[e], Ds(e, t))
                  }),
                  (this.expose = u.keys(j.Z.get(n)).map((e) => [e, decodeURIComponent(e)]))
              },
              deactivated() {
                this.revokers.forEach((e) => {
                  e()
                })
              },
            },
            js = (0, At.Z)(Hs, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var i
                  const s = (0, ce.up)("setting-check"),
                    r = (0, ce.up)("tooltip"),
                    c = (0, ce.up)("locale-group"),
                    u = (0, ce.up)("vm-import"),
                    d = (0, ce.up)("vm-export"),
                    p = (0, ce.up)("vm-maintenance"),
                    m = (0, ce.up)("vm-sync"),
                    g = (0, ce.up)("vm-editor"),
                    v = (0, ce.up)("vm-date-info"),
                    h = (0, ce.up)("setting-text"),
                    f = (0, ce.up)("vm-blacklist")
                  return (
                    (0, ce.wg)(),
                    (0, ce.iD)(
                      "div",
                      { class: "tab-settings", "data-show-advanced": a.settings.showAdvanced },
                      [
                        (0, ce._)("h1", { textContent: (0, ue.zw)(e.i18n("labelSettings")) }, null, 8, Ga),
                        (0, ce._)("section", Xa, [
                          (0, ce._)("h3", { textContent: (0, ue.zw)(e.i18n("optionPopup")) }, null, 8, Qa),
                          (0, ce._)("div", null, [
                            (0, ce.Wm)(s, { name: "autoReload", label: e.i18n("labelAutoReloadCurrentTab") }, null, 8, [
                              "label",
                            ]),
                          ]),
                          (0, ce._)("div", eo, [
                            (0, ce.Wm)(
                              s,
                              { name: "editorWindow", class: "mr-2", ref: "EW" },
                              {
                                default: (0, ce.w5)(() => [
                                  (0, ce.Wm)(
                                    r,
                                    { content: o.editorWindowHint, disabled: !o.editorWindowHint },
                                    {
                                      default: (0, ce.w5)(() => [
                                        (0, ce._)(
                                          "span",
                                          { textContent: (0, ue.zw)(e.i18n("optionEditorWindow")) },
                                          null,
                                          8,
                                          to
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["content", "disabled"]
                                  ),
                                ]),
                                _: 1,
                              },
                              512
                            ),
                            (0, ce.wy)(
                              (0, ce.Wm)(
                                s,
                                { name: "editorWindowSimple", label: e.i18n("optionEditorWindowSimple") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[be.F8, null == (i = e.$refs.EW) ? void 0 : i.value]]
                            ),
                          ]),
                          (0, ce._)("div", no, [
                            (0, ce._)("label", null, [
                              (0, ce.Wm)(
                                c,
                                { "i18n-key": "labelPopupSort" },
                                {
                                  default: (0, ce.w5)(() => [
                                    ((0, ce.wg)(!0),
                                    (0, ce.iD)(
                                      ce.HY,
                                      null,
                                      (0, ce.Ko)(["filtersPopup.sort"], (e) =>
                                        (0, ce.wy)(
                                          ((0, ce.wg)(),
                                          (0, ce.iD)(
                                            "select",
                                            { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                            [
                                              ((0, ce.wg)(!0),
                                              (0, ce.iD)(
                                                ce.HY,
                                                null,
                                                (0, ce.Ko)(
                                                  a.items[e].enum,
                                                  (t, n) => (
                                                    (0, ce.wg)(),
                                                    (0, ce.iD)(
                                                      "option",
                                                      { key: `${e}:${n}`, value: n, textContent: (0, ue.zw)(t) },
                                                      null,
                                                      8,
                                                      ao
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                            ],
                                            8,
                                            lo
                                          )),
                                          [[be.bM, a.settings[e]]]
                                        )
                                      ),
                                      128
                                    )),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, ce.wy)(
                              (0, ce.Wm)(
                                s,
                                { name: "filtersPopup.groupRunAt", label: e.i18n("optionPopupGroupRunAt") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[be.F8, "exec" === a.settings["filtersPopup.sort"]]]
                            ),
                            (0, ce._)("label", null, [
                              ((0, ce.wg)(!0),
                              (0, ce.iD)(
                                ce.HY,
                                null,
                                (0, ce.Ko)(["filtersPopup.hideDisabled"], (e) =>
                                  (0, ce.wy)(
                                    ((0, ce.wg)(),
                                    (0, ce.iD)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, ce.wg)(!0),
                                        (0, ce.iD)(
                                          ce.HY,
                                          null,
                                          (0, ce.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, ce.wg)(),
                                              (0, ce.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, ue.zw)(t) },
                                                null,
                                                8,
                                                io
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ],
                                      8,
                                      oo
                                    )),
                                    [[be.bM, a.settings[e]]]
                                  )
                                ),
                                128
                              )),
                            ]),
                            (0, ce.wy)(
                              (0, ce.Wm)(
                                s,
                                { name: "filtersPopup.enabledFirst", label: e.i18n("optionPopupEnabledFirst") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[be.F8, !a.settings["filtersPopup.hideDisabled"]]]
                            ),
                          ]),
                          (0, ce._)("div", null, [
                            (0, ce._)("label", null, [
                              (0, ce._)("span", { textContent: (0, ue.zw)(e.i18n("labelBadge")) }, null, 8, so),
                              ((0, ce.wg)(),
                              (0, ce.iD)(
                                ce.HY,
                                null,
                                (0, ce.Ko)(["showBadge"], (e) =>
                                  (0, ce.wy)(
                                    (0, ce._)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, ce.wg)(!0),
                                        (0, ce.iD)(
                                          ce.HY,
                                          null,
                                          (0, ce.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, ce.wg)(),
                                              (0, ce.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, ue.zw)(t) },
                                                null,
                                                8,
                                                co
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ],
                                      8,
                                      ro
                                    ),
                                    [[be.bM, a.settings[e]]]
                                  )
                                ),
                                64
                              )),
                            ]),
                          ]),
                          (0, ce._)("div", null, [
                            (0, ce._)("label", null, [
                              (0, ce._)("span", { textContent: (0, ue.zw)(e.i18n("labelBadgeColors")) }, null, 8, uo),
                              ((0, ce.wg)(!0),
                              (0, ce.iD)(
                                ce.HY,
                                null,
                                (0, ce.Ko)(
                                  a.items.badgeColor.enum,
                                  (e, t) => (
                                    (0, ce.wg)(),
                                    (0, ce.j4)(
                                      r,
                                      { key: `bc:${t}`, content: e },
                                      {
                                        default: (0, ce.w5)(() => [
                                          (0, ce.wy)(
                                            (0, ce._)(
                                              "input",
                                              { type: "color", "onUpdate:modelValue": (e) => (a.settings[t] = e) },
                                              null,
                                              8,
                                              po
                                            ),
                                            [[be.nr, a.settings[t]]]
                                          ),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ["content"]
                                    )
                                  )
                                ),
                                128
                              )),
                              (0, ce.wy)(
                                (0, ce._)(
                                  "button",
                                  {
                                    textContent: (0, ue.zw)(e.i18n("buttonReset")),
                                    class: "ml-1",
                                    onClick:
                                      t[0] || (t[0] = (...e) => o.onResetBadgeColors && o.onResetBadgeColors(...e)),
                                  },
                                  null,
                                  8,
                                  mo
                                ),
                                [[be.F8, o.isCustomBadgeColor]]
                              ),
                            ]),
                          ]),
                        ]),
                        (0, ce._)("section", go, [
                          (0, ce._)("h3", { textContent: (0, ue.zw)(e.i18n("optionUpdate")) }, null, 8, vo),
                          (0, ce._)("div", ho, [
                            (0, ce._)("label", null, [
                              (0, ce.Wm)(
                                c,
                                { "i18n-key": "labelAutoUpdate" },
                                {
                                  default: (0, ce.w5)(() => [
                                    (0, ce.wy)(
                                      (0, ce._)(
                                        "input",
                                        {
                                          "onUpdate:modelValue": t[1] || (t[1] = (e) => (a.settings.autoUpdate = e)),
                                          type: "number",
                                          min: "0",
                                          max: "365",
                                          step: "1/",
                                        },
                                        null,
                                        512
                                      ),
                                      [[be.nr, a.settings.autoUpdate]]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, ce.Wm)(
                              s,
                              { name: "updateEnabledScriptsOnly", label: e.i18n("labelEnabledScriptsOnly") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                          (0, ce._)("div", fo, [
                            (0, ce.Wm)(s, { name: "notifyUpdates", label: e.i18n("labelNotifyUpdates") }, null, 8, [
                              "label",
                            ]),
                            (0, ce.Wm)(
                              s,
                              { name: "notifyUpdatesGlobal", label: e.i18n("labelNotifyUpdatesGlobal"), class: "ml-2" },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                        ]),
                        (0, ce._)("section", wo, [
                          (0, ce._)("h3", { textContent: (0, ue.zw)(e.i18n("labelBackupMaintenance")) }, null, 8, bo),
                          (0, ce.Wm)(u),
                          (0, ce.Wm)(d),
                          yo,
                          (0, ce.Wm)(p),
                        ]),
                        (0, ce.Wm)(m),
                        ((0, ce.wg)(!0),
                        (0, ce.iD)(
                          ce.HY,
                          null,
                          (0, ce.Ko)(
                            { showAdvanced: a.settings },
                            (t, n) => (
                              (0, ce.wg)(),
                              (0, ce.iD)(
                                "details",
                                { key: n, open: t[n] },
                                [
                                  (0, ce._)(
                                    "summary",
                                    { onClick: (0, be.iM)((e) => (t[n] = !t[n]), ["prevent"]) },
                                    [
                                      ((0, ce.wg)(),
                                      (0, ce.j4)(
                                        (0, ce.LL)(t[n] ? "h1" : "h3"),
                                        { textContent: (0, ue.zw)(e.i18n("labelAdvanced")), class: "inline-block" },
                                        null,
                                        8,
                                        ["textContent"]
                                      )),
                                    ],
                                    8,
                                    Co
                                  ),
                                  (0, ce._)("section", _o, [
                                    (0, ce._)("h3", { textContent: (0, ue.zw)(e.i18n("labelGeneral")) }, null, 8, ko),
                                    (0, ce._)("div", null, [
                                      (0, ce._)("label", null, [
                                        (0, ce.Wm)(
                                          c,
                                          { "i18n-key": "optionUiTheme" },
                                          {
                                            default: (0, ce.w5)(() => [
                                              ((0, ce.wg)(),
                                              (0, ce.iD)(
                                                ce.HY,
                                                null,
                                                (0, ce.Ko)(["uiTheme"], (e) =>
                                                  (0, ce.wy)(
                                                    (0, ce._)(
                                                      "select",
                                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                      [
                                                        ((0, ce.wg)(!0),
                                                        (0, ce.iD)(
                                                          ce.HY,
                                                          null,
                                                          (0, ce.Ko)(
                                                            a.items[e].enum,
                                                            (e, t) => (
                                                              (0, ce.wg)(),
                                                              (0, ce.iD)(
                                                                "option",
                                                                { key: t, value: t, textContent: (0, ue.zw)(e) },
                                                                null,
                                                                8,
                                                                Uo
                                                              )
                                                            )
                                                          ),
                                                          128
                                                        )),
                                                      ],
                                                      8,
                                                      So
                                                    ),
                                                    [[be.bM, a.settings[e]]]
                                                  )
                                                ),
                                                64
                                              )),
                                            ]),
                                            _: 1,
                                          }
                                        ),
                                      ]),
                                    ]),
                                    (0, ce._)("div", zo, [
                                      (0, ce._)("label", null, [
                                        (0, ce._)(
                                          "span",
                                          { textContent: (0, ue.zw)(e.i18n("labelInjectionMode")) },
                                          null,
                                          8,
                                          Do
                                        ),
                                        ((0, ce.wg)(),
                                        (0, ce.iD)(
                                          ce.HY,
                                          null,
                                          (0, ce.Ko)(["defaultInjectInto"], (e) =>
                                            (0, ce.wy)(
                                              (0, ce._)(
                                                "select",
                                                { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                [
                                                  ((0, ce.wg)(!0),
                                                  (0, ce.iD)(
                                                    ce.HY,
                                                    null,
                                                    (0, ce.Ko)(
                                                      a.items[e].enum,
                                                      (e, t) => (
                                                        (0, ce.wg)(),
                                                        (0, ce.iD)(
                                                          "option",
                                                          { key: t, textContent: (0, ue.zw)(t) },
                                                          null,
                                                          8,
                                                          Ho
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                ],
                                                8,
                                                $o
                                              ),
                                              [[be.bM, a.settings[e]]]
                                            )
                                          ),
                                          64
                                        )),
                                        (0, ce._)(
                                          "a",
                                          {
                                            class: "ml-1",
                                            href: "https://violentmonkey.github.io/posts/inject-into-context/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            textContent: (0, ue.zw)(e.i18n("learnInjectionMode")),
                                          },
                                          null,
                                          8,
                                          jo
                                        ),
                                      ]),
                                      (0, ce.Wm)(
                                        r,
                                        { content: e.i18n("labelXhrInjectHint") },
                                        {
                                          default: (0, ce.w5)(() => [
                                            (0, ce.Wm)(
                                              s,
                                              { name: "xhrInject" },
                                              {
                                                default: (0, ce.w5)(() => [
                                                  (0, ce.Wm)(
                                                    c,
                                                    { "i18n-key": "labelXhrInject" },
                                                    { default: (0, ce.w5)(() => [Wo]), _: 1 }
                                                  ),
                                                  (0, ce.Uk)(),
                                                  (0, ce._)(
                                                    "ruby",
                                                    { textContent: (0, ue.zw)(e.i18n("labelXhrInjectNote")) },
                                                    null,
                                                    8,
                                                    Io
                                                  ),
                                                ]),
                                                _: 1,
                                              }
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ),
                                      a.settings.xhrInject
                                        ? (0, ce.kq)("", !0)
                                        : ((0, ce.wg)(),
                                          (0, ce.iD)("label", Ro, [
                                            (0, ce.Wm)(s, { name: "ffInject" }),
                                            (0, ce.Wm)(
                                              r,
                                              { content: e.i18n("labelFastFirefoxInjectHint") },
                                              {
                                                default: (0, ce.w5)(() => [
                                                  (0, ce.Wm)(
                                                    c,
                                                    { "i18n-key": "labelFastFirefoxInject" },
                                                    { default: (0, ce.w5)(() => [To]), _: 1 }
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["content"]
                                            ),
                                          ])),
                                    ]),
                                    (0, ce._)("div", null, [
                                      (0, ce.Wm)(
                                        c,
                                        { "i18n-key": "labelExposeStatus", class: "flex flex-col" },
                                        {
                                          default: (0, ce.w5)(() => [
                                            ((0, ce.wg)(!0),
                                            (0, ce.iD)(
                                              ce.HY,
                                              null,
                                              (0, ce.Ko)(
                                                a.expose,
                                                ([e, t]) => (
                                                  (0, ce.wg)(),
                                                  (0, ce.j4)(
                                                    s,
                                                    { key: t, name: `expose.${e}`, class: "ml-2 mr-1c valign-tb" },
                                                    {
                                                      default: (0, ce.w5)(() => [
                                                        (0, ce._)("span", { textContent: (0, ue.zw)(t) }, null, 8, Mo),
                                                        (0, ce._)(
                                                          "a",
                                                          {
                                                            href: `https://${t}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                          },
                                                          "\u2197",
                                                          8,
                                                          Oo
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1032,
                                                    ["name"]
                                                  )
                                                )
                                              ),
                                              128
                                            )),
                                          ]),
                                          _: 2,
                                        },
                                        1024
                                      ),
                                    ]),
                                    (0, ce.Wm)(
                                      s,
                                      { name: "helpForLocalFile", label: e.i18n("helpForLocalFile") },
                                      null,
                                      8,
                                      ["label"]
                                    ),
                                  ]),
                                  (0, ce.Wm)(g),
                                  (0, ce._)("section", null, [
                                    (0, ce._)(
                                      "h3",
                                      { textContent: (0, ue.zw)(e.i18n("labelScriptTemplate")) },
                                      null,
                                      8,
                                      Eo
                                    ),
                                    (0, ce._)("p", null, [
                                      ((0, ce.wg)(!0),
                                      (0, ce.iD)(
                                        ce.HY,
                                        null,
                                        (0, ce.Ko)(
                                          e.i18n("descScriptTemplate").split(/<(\S+?)>/),
                                          (e, t) => (
                                            (0, ce.wg)(),
                                            (0, ce.j4)(
                                              (0, ce.LL)(t % 2 ? "code" : "span"),
                                              { textContent: (0, ue.zw)(e), key: t },
                                              null,
                                              8,
                                              ["textContent"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                      (0, ce.Uk)(),
                                      (0, ce.Wm)(v),
                                    ]),
                                    (0, ce.Wm)(h, { name: "scriptTemplate", "has-reset": "" }),
                                  ]),
                                  (0, ce.Wm)(f),
                                  (0, ce._)("section", null, [
                                    (0, ce._)("h3", { textContent: (0, ue.zw)(e.i18n("labelCustomCSS")) }, null, 8, Zo),
                                    (0, ce._)("p", { innerHTML: e.i18n("descCustomCSS") }, null, 8, Vo),
                                    (0, ce.Wm)(h, { name: "customCSS" }),
                                  ]),
                                ],
                                8,
                                xo
                              )
                            )
                          ),
                          128
                        )),
                      ],
                      8,
                      Ja
                    )
                  )
                },
              ],
            ]),
            Ws = { class: "tab-about mb-2c" },
            Is = { class: "mt-0 mr-1c" },
            Rs = ["textContent"],
            Ts = ["textContent"],
            Ms = ["textContent"],
            Os = ["textContent"],
            Es = ["textContent"],
            Zs = ["textContent"],
            Vs = ["textContent"],
            Ys = ["textContent"],
            Ps = ["textContent"],
            As = ["textContent"],
            Ls = ["textContent"],
            Fs = {
              __name: "tab-about",
              setup(e) {
                const t = x.name,
                  n = browser.i18n.getUILanguage()
                return (e, l) => (
                  (0, ce.wg)(),
                  (0, ce.iD)("div", Ws, [
                    (0, ce._)("h1", Is, [
                      (0, ce._)("span", { textContent: (0, ue.zw)((0, R.SU)(t)) }, null, 8, Rs),
                      (0, ce._)("small", { textContent: (0, ue.zw)(`v${(0, R.SU)("2.20.1")}`) }, null, 8, Ts),
                    ]),
                    (0, ce._)("p", { textContent: (0, ue.zw)(e.i18n("extDescription")) }, null, 8, Ms),
                    (0, ce._)("div", null, [
                      (0, ce._)("label", { textContent: (0, ue.zw)(e.i18n("labelRelated")) }, null, 8, Os),
                      (0, ce._)("ul", null, [
                        (0, ce._)("li", null, [
                          (0, ce._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, ue.zw)(e.i18n("labelHomepage")),
                            },
                            null,
                            8,
                            Es
                          ),
                        ]),
                        (0, ce._)("li", null, [
                          (0, ce._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/issues",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, ue.zw)(e.i18n("labelFeedback")),
                            },
                            null,
                            8,
                            Zs
                          ),
                        ]),
                        (0, ce._)("li", null, [
                          (0, ce._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/graphs/contributors",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, ue.zw)(e.i18n("labelContributors")),
                            },
                            null,
                            8,
                            Vs
                          ),
                        ]),
                        (0, ce._)("li", null, [
                          (0, ce._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io/privacy/",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, ue.zw)(e.i18n("labelPrivacyPolicy")),
                            },
                            null,
                            8,
                            Ys
                          ),
                        ]),
                      ]),
                    ]),
                    (0, ce._)("div", null, [
                      (0, ce._)("label", { textContent: (0, ue.zw)(e.i18n("labelCurrentLang")) }, null, 8, Ps),
                      (0, ce._)("span", { class: "current", textContent: (0, ue.zw)((0, R.SU)(n)) }, null, 8, As),
                      (0, ce.Uk)(" | "),
                      (0, ce._)(
                        "a",
                        {
                          href: "https://violentmonkey.github.io/localization/",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          textContent: (0, ue.zw)(e.i18n("labelHelpTranslate")),
                        },
                        null,
                        8,
                        Ls
                      ),
                    ]),
                  ])
                )
              },
            },
            qs = [
              { name: o, comp: Ka, label: (0, D.ag)("sideMenuInstalled") },
              { name: C, comp: js, label: (0, D.ag)("sideMenuSettings") },
              { name: _, comp: Fs, label: (0, D.ag)("sideMenuAbout") },
              { name: k, comp: Ka, label: (0, D.ag)("buttonRecycleBin") },
            ],
            Ns = (0, D.ag)("extName"),
            Bs = "!editScript",
            Ks = (0, ce.Fl)(() => {
              const e = P.route.paths[0]
              return qs.find((t) => t.name === e) || qs[0]
            }),
            Js = (0, ce.Fl)(() => ({ [o]: P.scripts.length, [k]: P.removedScripts.length }))
          function Gs() {
            const e = Ks.value.name === o,
              { paths: t } = P.route
            we.$J.setContext("editScript", e && t[1]),
              we.$J.setContext("tabScripts", e && !t[1]),
              we.$J.setContext("showRecycle", Ks.value.name === k)
          }
          function Xs(e) {
            const n = qs.indexOf(Ks.value),
              l = qs[(n + e + qs.length) % qs.length]
            t.location.hash = (null == l ? void 0 : l.name) || ""
          }
          p(
            "dragover",
            (e) => {
              var t
              P.route.hash !== C &&
                /^application\/(zip|x-zip-compressed)$/.test(null == (t = e.dataTransfer.items[0]) ? void 0 : t.type) &&
                (location.hash = `#${C}`)
            },
            !0
          )
          const Qs = {
              setup() {
                const [e, t] = P.route.paths,
                  n = (0, R.iH)(e !== o || ("_new" !== t && !Number(t)))
                return (
                  (0, ce.m0)(() => {
                    const { title: e } = P
                    document.title = e ? `${e} - ${Ns}` : Ns
                  }),
                  (0, ce.YP)(
                    () => P.route.paths,
                    () => {
                      ;(n.value = !0), Gs()
                    }
                  ),
                  (0, ce.bv)(() => {
                    const e = [
                      we.$J.register("a-pageup", () => Xs(-1), { condition: Bs }),
                      we.$J.register("a-pagedown", () => Xs(1), { condition: Bs }),
                    ]
                    return (
                      we.$J.enable(),
                      Gs(),
                      () => {
                        e.forEach((e) => {
                          e()
                        }),
                          we.$J.disable()
                      }
                    )
                  }),
                  { tabs: qs, current: Ks, numbers: Js, canRenderAside: n }
                )
              },
            },
            er = (0, At.Z)(Qs, [
              [
                "render",
                (e, t, n, l, a, o) => (
                  (0, ce.wg)(),
                  (0, ce.iD)("div", de, [
                    l.canRenderAside
                      ? ((0, ce.wg)(),
                        (0, ce.iD)("aside", pe, [
                          (0, ce._)("div", me, [
                            ge,
                            (0, ce._)(
                              "h1",
                              { class: "hidden-sm", textContent: (0, ue.zw)(e.i18n("extName")) },
                              null,
                              8,
                              ve
                            ),
                            he,
                            ((0, ce.wg)(!0),
                            (0, ce.iD)(
                              ce.HY,
                              null,
                              (0, ce.Ko)(
                                l.tabs,
                                (e) => (
                                  (0, ce.wg)(),
                                  (0, ce.iD)("div", { class: "aside-menu-item", key: e.name }, [
                                    (0, ce._)(
                                      "a",
                                      {
                                        href: `#${e.name}`,
                                        class: (0, ue.C_)({ active: e === l.current }),
                                        "data-num-scripts": l.numbers[e.name],
                                        textContent: (0, ue.zw)(e.label),
                                      },
                                      null,
                                      10,
                                      fe
                                    ),
                                  ])
                                )
                              ),
                              128
                            )),
                          ]),
                        ]))
                      : (0, ce.kq)("", !0),
                    ((0, ce.wg)(),
                    (0, ce.j4)(
                      ce.Ob,
                      null,
                      [((0, ce.wg)(), (0, ce.j4)((0, ce.LL)(l.current.comp), { class: "tab" }))],
                      1024
                    )),
                  ])
                ),
              ],
            ]),
            tr = [
              (0, D.ag)("editNavCode"),
              (0, D.ag)("editNavSettings"),
              (0, D.ag)("editNavValues"),
              "@require",
              "@resource",
            ]
          let nr
          function lr(e, t, n) {
            const l = e.$cache || (e.$cache = {}),
              a = e.meta || {},
              { custom: o } = e,
              i = (0, D.iQ)(a, G),
              s = w(D.Hv, [a[G], i, a[N], (0, D.iQ)(a, N), o[G], o[N]], "\n"),
              r = o[G] || i
            let c = 0,
              u = ""
            t.forEach((e, t) => {
              ;(c += e), e && (u += `${tr[t]}: ${(0, D.aj)(e)}\n`)
            }),
              (l.desc = s),
              (l.name = r),
              (l.lowerName = r.toLocaleLowerCase()),
              (l.tags = o.tags || ""),
              (l.size = (0, D.aj)(c, !0).replace(" ", "")),
              (l.sizes = u.slice(0, -1).replace(/\x20/g, "\xa0").replace(/[^B]$/gm, "$&B")),
              (l.sizeNum = c),
              (l[ne] = t[2]),
              n && (l.code = n),
              (e.$canUpdate = (0, D.TZ)(e) && (e.config.shouldUpdate ? 1 : -1)),
              (0, H.d)(e, P, !0)
          }
          function ar() {
            const e = +P.route.paths[1]
            return or(e).catch(e && (() => or()))
          }
          async function or(e) {
            const [t] = await d.all([(0, D.gj)("GetData", { id: e, sizes: !0 }, { retry: !0 }), j.Z.ready]),
              { [o]: n, sizes: l, ...a } = t
            u.assign(P, a)
            const i = [],
              s = []
            n.forEach((e, t) => {
              lr(e, l[t]), (e.config.removed ? s : i).push(e)
            }),
              (P.scripts = i),
              (P.removedScripts = s),
              (P.loading = !1)
          }
          ;(P.loading = !0),
            ar(),
            u.assign($.Z, {
              ScriptsUpdated() {
                ar()
              },
              UpdateSync(e) {
                P.sync = e
              },
              async UpdateScript({ update: e, where: t, code: n } = {}) {
                var l
                if (!e) return
                ;(nr || ((nr = P.batch) && (nr = d.race([nr, (0, D.dL)(500)])))) && (await nr, (nr = null))
                const a = P.scripts.findIndex((e) => e.props.id === t.id),
                  i = P.removedScripts.findIndex((e) => e.props.id === t.id),
                  s = P.scripts[a] || P.removedScripts[i] || (e.meta && P.canRenderScripts && {})
                if (!s) return
                const [r] = await (0, D.gj)("GetSizes", [t.id]),
                  { search: c } = P
                if (
                  (u.assign(s, e),
                  s.error && !e.error && (s.error = null),
                  lr(s, r, n),
                  c && Y([s], c.rules),
                  null != (null == (l = e.config) ? void 0 : l.removed) &&
                    (e.config.removed
                      ? (P.needRefresh = !0)
                      : (P.removedScripts = P.removedScripts.filter((e) => e.props.id !== t.id))),
                  (s.config.removed ? i : a) < 0)
                ) {
                  s.message = ""
                  const e = s.config.removed ? "removedScripts" : o
                  P[e] = [...P[e], s]
                }
              },
              RemoveScripts(e) {
                P.removedScripts = P.removedScripts.filter((t) => !e.includes(t.props.id))
              },
            }),
            (0, W.sY)(er)
        },
        6291: (e, t, n) => {
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
          function a(e) {
            var t = o(e)
            return n(t)
          }
          function o(e) {
            if (!n.o(l, e)) {
              var t = new c("Cannot find module '" + e + "'")
              throw ((t.code = "MODULE_NOT_FOUND"), t)
            }
            return l[e]
          }
          ;(a.keys = () => u.keys(l)), (a.resolve = o), (e.exports = a), (a.id = 6291)
        },
      },
      $ = {}
    function H(e) {
      var t = $[e]
      if (void 0 !== t) return t.exports
      var n = ($[e] = { exports: {} })
      return D[e].call(n.exports, n, n.exports, H), n.exports
    }
    ;(H.m = D),
      (h = []),
      (H.O = (e, t, n, l) => {
        if (!t) {
          var a = 1 / 0
          for (r = 0; r < h.length; r++) {
            for (var [t, n, l] = h[r], o = !0, i = 0; i < t.length; i++)
              (!1 & l || a >= l) && u.keys(H.O).every((e) => H.O[e](t[i]))
                ? t.splice(i--, 1)
                : ((o = !1), l < a && (a = l))
            if (o) {
              h.splice(r--, 1)
              var s = n()
              void 0 !== s && (e = s)
            }
          }
          return e
        }
        l = l || 0
        for (var r = h.length; r > 0 && h[r - 1][2] > l; r--) h[r] = h[r - 1]
        h[r] = [t, n, l]
      }),
      (H.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e
        return H.d(t, { a: t }), t
      }),
      (z = u.getPrototypeOf ? (e) => u.getPrototypeOf(e) : (e) => e.__proto__),
      (H.t = function (e, t) {
        if ((1 & t && (e = this(e)), 8 & t)) return e
        if ("object" == typeof e && e) {
          if (4 & t && e.__esModule) return e
          if (16 & t && "function" == typeof e.then) return e
        }
        var n = u.create(null)
        H.r(n)
        var l = {}
        U = U || [null, z({}), z([]), z(z)]
        for (var a = 2 & t && e; "object" == typeof a && !~U.indexOf(a); a = z(a))
          u.getOwnPropertyNames(a).forEach((t) => (l[t] = () => e[t]))
        return (l.default = () => e), H.d(n, l), n
      }),
      (H.d = (e, t) => {
        for (var n in t) H.o(t, n) && !H.o(e, n) && u.defineProperty(e, n, { enumerable: !0, get: t[n] })
      }),
      (H.o = (e, t) => u.prototype.hasOwnProperty.call(e, t)),
      (H.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          u.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          u.defineProperty(e, "__esModule", { value: !0 })
      }),
      (H.j = 360),
      (() => {
        var e = { 360: 0 }
        H.O.j = (t) => 0 === e[t]
        var t = (t, n) => {
            var l,
              a,
              [o, i, s] = n,
              r = 0
            if (o.some((t) => 0 !== e[t])) {
              for (l in i) H.o(i, l) && (H.m[l] = i[l])
              if (s) var c = s(H)
            }
            for (t && t(n); r < o.length; r++) (a = o[r]), H.o(e, a) && e[a] && e[a][0](), (e[a] = 0)
            return H.O(c)
          },
          n = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
        n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)))
      })()
    var j = H.O(void 0, [386, 84], () => H(5475))
    j = H.O(j)
  })()
}
