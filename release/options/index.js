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



    const vsPath = "/public/lib/monaco-editor/0.51.0/min/vs";

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
      Error: u,
      Object: c,
      Promise: d,
      addEventListener: p,
      removeEventListener: m,
      chrome: g,
      performance: v,
    } = e,
    { apply: f } = Reflect,
    h = f.call.bind({}.hasOwnProperty),
    w = c.call.bind(c.call),
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
    var f,
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
            a = (e) => c.assign(l, e),
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
            GetAllOptions: () => c.assign({}, o.ZP, u),
            SetOptions(e) {
              for (const t in e) w(t, e[t], !0)
              v()
            },
          })
          const u = {},
            d = (0, l.QC)(),
            p = (0, l.Ds)(v, 100),
            m = (0, l.Ds)(() => s.ZP.base.setOne("options", u), 100)
          function g(e, t, n) {
            r ? delete r[e] : (r = {}), (r[e] = t), n || p()
          }
          function v() {
            if (!r) return
            const e = r
            ;(r = null), d.fire(e)
          }
          function f(e) {
            var t
            let n = u[e]
            if (null != n) return n
            const i = (0, l.Wk)(e),
              s = i[0],
              r = null != (t = u[s]) ? t : (0, a.p$)(o.ZP[s])
            return i.length > 1 ? (0, a._M)(r, i.slice(1)) : r
          }
          function w(e, t, n) {
            if (i.S1) return i.S1.then(w.bind(null, ...arguments))
            const s = (0, l.Wk)(e),
              r = s[0]
            if (((e = s.join(".")), !h(o.ZP, r))) return
            const c = s.length > 1 && s.slice(1),
              d = f([r])
            ;(0, a.vZ)(t, c ? (0, a._M)(d, c) : d) || ((u[r] = c ? (0, a.iA)(d, c, t) : t), b(r), m(), g(e, t, n))
          }
          function b(e) {
            return (0, a.vZ)(u[e], o.ZP[e]) && delete u[e]
          }
          ;(new Proxy(o.ZP, { get: (e, t) => f(t) }), d.hook)((e) => (0, l.NB)("UpdateOptions", e))
        },
        8670: (e, t, n) => {
          "use strict"
          n.d(t, { ZP: () => f })
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
          const u = "cache",
            c = "code",
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
              [u]: new s(u, "cac:"),
              [c]: new s(c, "code:"),
              mod: new s("mod", "mod:"),
              [d]: new s(d, "req:"),
              [p]: new s(p, "scr:"),
              [m]: new s(m, "val:"),
            },
            f = v
          ;(0, o.iU)({ Storage: ([e, t, ...n]) => v[e][t](...n) })
        },
        1835: (f, U, z) => {
          "use strict"
          z.d(U, { m: () => or }), z(1871)
          var D = z(5313),
            $ = z(6711),
            H = z(2477),
            j = z(5010),
            W = z(1226),
            Z = (z(3700), z(9994)),
            O = z(2262),
            M = z(9518)
          const T =
              /\s*(!)?(\#|(name|code|desc)(\+re)?:|(re:)|)('((?:[^']+|'')*)('|$)|"((?:[^"]+|"")*)("|$)|\/(\S+?)\/([a-z]*)|\S+)(?:\s+|$)/y,
            I = /''/g,
            E = /""/g
          function R(e) {
            const t = [],
              n = [],
              l = [],
              a = []
            T.lastIndex = 0
            for (let o; (o = T.exec(e)); ) {
              let e,
                [, i, s, r = "", c, d, p, m, g, v = m, f = g, h, w = ""] = o
              if (v) {
                if (!f) throw new u("Unmatched quotes")
                e = v.replace(m ? I : E, v[0])
              } else e = p
              ;(i = !!i),
                n.push({ negative: i, prefix: s, raw: p, parsed: e }),
                "#" === s
                  ? ((e = (0, D.cn)(e).replace(/\./g, "\\.")), e && (i ? a : l).push(e))
                  : (c || d ? (w = "i") : h ? (e = h) : (v || (w = "i"), (e = (0, D.YC)(e))),
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
          function Y({ re: e, negative: t, scope: n }) {
            return t ^ (e.test(this[n || "desc"]) || (!n && e.test(this.code)))
          }
          function P(e, t) {
            let n = 0
            for (let l = 0; l < e.length; l++) {
              const { $cache: a } = e[l]
              n += a.show = t.every(Y, a)
            }
            return n
          }
          const V = (0, O.qj)({
              route: M.BC,
              batch: null,
              canRenderScripts: [o, k, ""].includes(M.BC.hash),
              scripts: [],
              removedScripts: [],
              loading: !1,
              needRefresh: !1,
              sync: [],
              title: null,
            }),
            F = "include",
            L = "match",
            A = "exclude",
            q = "excludeMatch",
            N = "description",
            K = "downloadURL",
            B = "homepageURL",
            J = "icon",
            G = "name",
            X = "origExclude",
            Q = "origExcludeMatch",
            ee = "origInclude",
            te = "origMatch",
            ne = "storageSize",
            le = "updateURL",
            ae = "toggle-on",
            oe = "toggle-off"
          let ie
          function se(e) {
            var t
            ;(ie = null == (t = e.find(([, e]) => "save" === e)) ? void 0 : t[0]),
              ie || ((ie = "Ctrl-S"), e.unshift([ie, "save"]))
          }
          function re(e, t) {
            return (0, D.gj)("MarkRemoved", { id: e.props.id, removed: t })
          }
          async function ue(e, ...t) {
            try {
              await (V.batch = e(...t) || !0)
            } finally {
              V.batch = !1
            }
          }
          function ce(e) {
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
          var de = z(6252),
            pe = z(2502)
          const me = { class: "page-options" },
            ge = { key: 0 },
            ve = { class: "aside-content" },
            fe = (0, de._)("img", { src: "/public/images/icon128.png" }, null, -1),
            he = ["textContent"],
            we = (0, de._)("hr", null, null, -1),
            be = ["href", "data-num-scripts", "textContent"]
          var ye = z(7458),
            xe = z(9963),
            Ce = z(5168),
            _e = z(2380),
            ke = z(392),
            Se = z(9824),
            Ue = z(7407),
            ze = z(6877),
            De = z(6653)
          const $e = ".script",
            He = 50,
            je = 20,
            We = 16,
            Ze = 500,
            Oe = W.T
              ? { start: "touchstart", move: "touchmove", end: "touchend" }
              : { start: "dragstart", move: "mousemove", end: "mouseup" },
            Me = W.T && c.assign(document.createElement("div"), { className: "dragging-noscroll" }),
            Te = ["scroll", "mouseenter", "mouseleave"]
          let Ie, Ee, Re, Ye, Pe, Ve, Fe, Le, Ae, qe, Ne, Ke, Be, Je, Ge, Xe, Qe, et
          function tt(e, t, n) {
            const l = n ? p : m
            ;(Ne = e),
              (Ke = t),
              w(l, Ne, Oe.start, W.T ? ot : rt),
              W.T || (w(l, Ne, "dblclick", nt, !0), w(l, Ne, "mousedown", lt, !0), n || at())
          }
          function nt(e) {
            const t = getSelection(),
              n = e.target.closest(".script-name")
            n && (t.removeAllRanges(), t.selectAllChildren(n))
          }
          function lt(e) {
            !e.altKey && wt(e) && (qe.draggable = !0), w(p, Ne, "mouseup", at, !0)
          }
          function at() {
            qe && (qe.draggable = !1), w(m, Ne, "mouseup", at, !0)
          }
          function ot(e) {
            wt(e) && ((Ve = e), (Fe = setTimeout(it, Ze, "timer")), p(Oe.move, it), p(Oe.end, st))
          }
          function it(e) {
            st(), "timer" === e && (w(rt, qe, Ve), b && pt() && ((Ne.scrollTop += 1), (Ne.scrollTop -= 1)))
          }
          function st() {
            clearTimeout(Fe), m(Oe.move, it), m(Oe.end, st)
          }
          function rt(e) {
            var t
            if (!wt(e)) return
            e.cancelable && e.preventDefault()
            const { clientX: n, clientY: l } = (null == (t = e.touches) ? void 0 : t[0]) || e,
              a = qe.getBoundingClientRect(),
              o = Ne.getBoundingClientRect()
            ;(Ie = qe.cloneNode(!0)),
              (Ee = w([].filter, Ne.children, (e) => "none" !== e.style.display)),
              (Ye = Ee.indexOf(qe)),
              (Pe = Ye),
              Ee.splice(Ye, 1),
              (Re = a.height),
              (Le = n - a.left),
              (Ae = l - a.top),
              (Be = o.top + He),
              (Je = o.bottom - He),
              (et = {}),
              qe.classList.add("dragging-placeholder"),
              Ie.classList.add("dragging"),
              (Ie.style.transform = `translate(${a.left}px, ${a.top}px)`),
              (Ie.style.width = `${a.width}px`),
              Ne.appendChild(Ie),
              W.T && Ne.insertAdjacentElement("afterBegin", Me),
              p(Oe.move, ut),
              p(Oe.end, ct)
          }
          function ut(e) {
            var t
            const { clientX: n, clientY: l, target: a } = (null == (t = e.touches) ? void 0 : t[0]) || e
            let o
            const i = W.T ? ht(n, l) : null == a.closest ? void 0 : a.closest($e)
            if (i && i !== qe) {
              const e = i.getBoundingClientRect(),
                t = l > e.top + e.height / 2
              ;(o = qe !== i[(t ? "next" : "previous") + "ElementSibling"]),
                o && (i.insertAdjacentElement(t ? "afterEnd" : "beforeBegin", qe), dt(Ee.indexOf(i) + t))
            }
            ;(Ie.style.transform = `translate(${n - Le}px, ${l - Ae}px)`), (mt(l) || o) && (et = {})
          }
          function ct() {
            m(Oe.move, ut),
              m(Oe.end, ct),
              vt(),
              Ie.remove(),
              W.T && Me.remove(),
              qe.classList.remove("dragging-placeholder"),
              Ke(Ye, Pe)
          }
          function dt(e) {
            const t = Pe < e ? Re : -Re,
              n = Ee.slice(...(Pe < e ? [Pe, e] : [e, Pe]))
            n.forEach((e) => {
              ;(e.style.transition = "none"), (e.style.transform = `translateY(${t}px)`)
            }),
              setTimeout(() =>
                n.forEach(({ style: e }) => {
                  e.removeProperty("transition"), e.removeProperty("transform")
                })
              ),
              (Pe = e)
          }
          function pt() {
            return Ne.scrollHeight > Ne.clientHeight
          }
          function mt(e) {
            const t = pt() && Math.min(1, Math.max(0, e - Je, Be - e) / He)
            return (
              !t && Ge && vt(),
              t && !Ge && ((Ge = setInterval(gt, We)), Te.forEach((e) => p(e, ft, !0))),
              (Xe = t && (e > Je ? 1 : -1) * ((1 + t * je) | 0)),
              (Qe = v.now()),
              !!t
            )
          }
          function gt() {
            const e = v.now(),
              t = (Xe * (e - Qe)) / We
            ;(Ne.scrollTop += t), (Qe = e)
          }
          function vt() {
            Te.forEach((e) => m(e, ft, !0)), Ge && clearInterval(Ge), (Ge = 0)
          }
          function ft(e) {
            e.stopPropagation()
          }
          function ht(e, t) {
            var n
            const l = `${e}:${t}`
            return et[l] || (et[l] = null == (n = document.elementFromPoint(e, t)) ? void 0 : n.closest($e))
          }
          function wt(e) {
            return (qe = e.target.closest($e)), qe
          }
          const bt = ["tabIndex"],
            yt = { class: "script-icon hidden-xs" },
            xt = ["href", "data-hotkey"],
            Ct = ["src", "data-no-icon"],
            _t = { class: "script-info-1 ellipsis" },
            kt = ["textContent", "data-order"],
            St = { key: 0, class: "script-tags" },
            Ut = ["textContent", "onClick", "data-tag"],
            zt = (0, de._)("a", null, "...", -1),
            Dt = ["textContent", "onClick", "data-tag"],
            $t = { class: "script-info flex ml-1c" },
            Ht = ["href", "textContent", "tabIndex"],
            jt = ["textContent"],
            Wt = ["textContent"],
            Zt = { class: "script-buttons script-buttons-left" },
            Ot = ["href", "data-hotkey", "tabIndex"],
            Mt = ["data-hotkey", "tabIndex"],
            Tt = ["data-hotkey", "tabIndex"],
            It = (0, de._)("span", { class: "sep" }, null, -1),
            Et = ["tabIndex"],
            Rt = ["href", "tabIndex"],
            Yt = ["textContent", "title"],
            Pt = { class: "script-buttons script-buttons-right" },
            Vt = ["data-hotkey", "tabIndex"],
            Ft = ["data-hotkey", "tabIndex"],
            Lt = (e) => ye.$J.setContext("scriptFocus", e),
            At = {
              __name: "script-item",
              props: ["script", "visible", "viewTable", "focused", "hotkeys", "showHotkeys", "activeTags"],
              emits: ["clickTag", "remove", "restore", "scrollDelta", "toggle", "update"],
              setup(e, { emit: t }) {
                const n = e,
                  l = t,
                  a = (0, O.iH)(),
                  i = (0, O.iH)(n.visible),
                  s = (0, de.Fl)(() => n.script.config.enabled),
                  u = (0, de.Fl)(() => n.script.config.removed),
                  c = (0, de.Fl)(() => V.route.paths[0] === k),
                  d = (0, de.Fl)(() => {
                    const e = n.script.meta.author
                    if (!e) return
                    const t = e.match(/^(.*?)\s<(\S*?@\S*?)>$/)
                    return { email: t && t[2], name: t ? t[1] : e }
                  }),
                  p = (0, de.Fl)(() => n.script.custom[N] || (0, D.iQ)(n.script.meta, N)),
                  m = (0, de.Fl)(() => (s.value ? (0, D.ag)("buttonDisable") : (0, D.ag)("buttonEnable"))),
                  g = (0, de.Fl)(() => (n.focused ? 0 : -1)),
                  v = (0, de.Fl)(() => {
                    var e
                    return (null == (e = n.script.custom.tags) ? void 0 : e.split(" ").filter(r)) || []
                  }),
                  f = (0, de.Fl)(() => {
                    const { props: e } = n.script,
                      t = (!u.value && e.lastUpdated) || e.lastModified,
                      l = t && new Date(t).toLocaleString()
                    return t
                      ? {
                          show: (0, D.mr)(Date.now() - t),
                          title: u.value ? (0, D.ag)("labelRemovedAt", l) : (0, D.ag)("labelLastUpdatedAt", l),
                        }
                      : {}
                  }),
                  h = (0, de.Fl)(() => `#${u.value ? k : o}/${n.script.props.id}\n`),
                  w = (0, de.Fl)(() => ({
                    home: [(0, D.ag)("buttonHome"), (0, D.t$)(n.script)],
                    question: [(0, D.ag)("buttonSupport"), (0, D.b7)(n.script)],
                  })),
                  b = (e) => l(e, n.script),
                  y = () => b("remove"),
                  x = () => b("restore"),
                  C = (e) => l("clickTag", e),
                  _ = () => b("toggle"),
                  S = async () => {
                    ;(-1 !== n.script.$canUpdate || (await (0, W.GW)((0, D.ag)("confirmManualUpdate")))) && b("update")
                  }
                return (
                  (0, de.YP)(
                    () => n.visible,
                    (e) => {
                      e && (i.value = !0)
                    }
                  ),
                  (0, de.YP)(
                    () => n.focused,
                    (e, t) => {
                      const n = a.value
                      if (e && !t && n) {
                        const e = n.getBoundingClientRect(),
                          t = n.parentNode.getBoundingClientRect()
                        let a = 0
                        e.bottom > t.bottom - 8
                          ? (a += e.bottom - t.bottom + 8)
                          : e.top < t.top + 8 && (a -= t.top - e.top + 8),
                          (0, ye.u7)((0, W.vY)()) || n.focus({ preventScroll: !0 }),
                          l("scrollDelta", a)
                      }
                    }
                  ),
                  (t, n) => (
                    (0, de.wg)(),
                    (0, de.iD)(
                      "div",
                      {
                        ref_key: "$root",
                        ref: a,
                        class: (0, pe.C_)([
                          "script",
                          {
                            disabled: !s.value,
                            removed: u.value,
                            error: e.script.error,
                            focused: e.focused,
                            hotkeys: e.focused && e.showHotkeys,
                          },
                        ]),
                        tabIndex: g.value,
                        onFocus: n[1] || (n[1] = (e) => Lt(!0)),
                        onBlur: n[2] || (n[2] = (e) => Lt(!1)),
                      },
                      [
                        (0, de._)("div", yt, [
                          (0, de._)(
                            "a",
                            { href: h.value, "data-hotkey": e.hotkeys.edit, "data-hotkey-table": "", tabIndex: "-1" },
                            [
                              (0, de._)(
                                "img",
                                { src: e.script.safeIcon, "data-no-icon": e.script.noIcon },
                                null,
                                8,
                                Ct
                              ),
                            ],
                            8,
                            xt
                          ),
                        ]),
                        (0, de._)("div", _t, [
                          (0, de._)(
                            "a",
                            (0, de.dG)(
                              { textContent: (0, pe.zw)(e.script.$cache.name) },
                              e.viewTable && { draggable: !1, href: h.value, tabIndex: g.value },
                              { "data-order": u.value ? null : e.script.props.position, class: "script-name ellipsis" }
                            ),
                            null,
                            16,
                            kt
                          ),
                          i.value
                            ? ((0, de.wg)(),
                              (0, de.iD)("div", St, [
                                ((0, de.wg)(!0),
                                (0, de.iD)(
                                  de.HY,
                                  null,
                                  (0, de.Ko)(v.value.slice(0, 2), (t, n) => {
                                    var l
                                    return (
                                      (0, de.wg)(),
                                      (0, de.iD)(
                                        "a",
                                        {
                                          key: n,
                                          textContent: (0, pe.zw)(`#${t}`),
                                          onClick: (0, xe.iM)((e) => C(t), ["prevent"]),
                                          class: (0, pe.C_)({
                                            active: null == (l = e.activeTags) ? void 0 : l.includes(t),
                                          }),
                                          "data-tag": t,
                                        },
                                        null,
                                        10,
                                        Ut
                                      )
                                    )
                                  }),
                                  128
                                )),
                                v.value.length > 2
                                  ? ((0, de.wg)(),
                                    (0, de.j4)(
                                      (0, O.SU)(ke.Z),
                                      { key: 0 },
                                      {
                                        content: (0, de.w5)(() => [
                                          ((0, de.wg)(!0),
                                          (0, de.iD)(
                                            de.HY,
                                            null,
                                            (0, de.Ko)(v.value.slice(2), (t, n) => {
                                              var l
                                              return (
                                                (0, de.wg)(),
                                                (0, de.iD)(
                                                  "a",
                                                  {
                                                    key: n,
                                                    class: (0, pe.C_)([
                                                      "dropdown-menu-item",
                                                      { active: null == (l = e.activeTags) ? void 0 : l.includes(t) },
                                                    ]),
                                                    textContent: (0, pe.zw)(`#${t}`),
                                                    onClick: (0, xe.iM)((e) => C(t), ["prevent"]),
                                                    "data-tag": t,
                                                  },
                                                  null,
                                                  10,
                                                  Dt
                                                )
                                              )
                                            }),
                                            128
                                          )),
                                        ]),
                                        default: (0, de.w5)(() => [zt]),
                                        _: 1,
                                      }
                                    ))
                                  : (0, de.kq)("", !0),
                              ]))
                            : (0, de.kq)("", !0),
                        ]),
                        (0, de._)("div", $t, [
                          i.value
                            ? ((0, de.wg)(),
                              (0, de.iD)(
                                de.HY,
                                { key: 0 },
                                [
                                  d.value
                                    ? ((0, de.wg)(),
                                      (0, de.j4)(
                                        (0, O.SU)(Se.Z),
                                        {
                                          key: 0,
                                          content: (0, O.SU)(D.ag)("labelAuthor") + e.script.meta.author,
                                          class: "script-author ml-1c hidden-sm",
                                          align: "end",
                                        },
                                        {
                                          default: (0, de.w5)(() => [
                                            (0, de.Wm)((0, O.SU)(ze.Z), { name: "author" }),
                                            d.value.email
                                              ? ((0, de.wg)(),
                                                (0, de.iD)(
                                                  "a",
                                                  {
                                                    key: 0,
                                                    class: "ellipsis",
                                                    href: `mailto:${d.value.email}`,
                                                    textContent: (0, pe.zw)(d.value.name),
                                                    tabIndex: g.value,
                                                  },
                                                  null,
                                                  8,
                                                  Ht
                                                ))
                                              : ((0, de.wg)(),
                                                (0, de.iD)(
                                                  "span",
                                                  { key: 1, class: "ellipsis", textContent: (0, pe.zw)(d.value.name) },
                                                  null,
                                                  8,
                                                  jt
                                                )),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, de.kq)("", !0),
                                  (0, de._)(
                                    "span",
                                    { class: "version ellipsis", textContent: (0, pe.zw)(e.script.meta.version) },
                                    null,
                                    8,
                                    Wt
                                  ),
                                  u.value
                                    ? (0, de.kq)("", !0)
                                    : ((0, de.wg)(),
                                      (0, de.j4)(
                                        (0, O.SU)(Se.Z),
                                        {
                                          key: 1,
                                          class: "size hidden-sm",
                                          content: e.script.$cache.sizes,
                                          align: "end",
                                        },
                                        {
                                          default: (0, de.w5)(() => [(0, de.Uk)((0, pe.zw)(e.script.$cache.size), 1)]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      )),
                                  (0, de.Wm)(
                                    (0, O.SU)(Se.Z),
                                    { class: "updated hidden-sm ml-1c", content: f.value.title, align: "end" },
                                    { default: (0, de.w5)(() => [(0, de.Uk)((0, pe.zw)(f.value.show), 1)]), _: 1 },
                                    8,
                                    ["content"]
                                  ),
                                ],
                                64
                              ))
                            : (0, de.kq)("", !0),
                        ]),
                        (0, de._)("div", Zt, [
                          i.value
                            ? ((0, de.wg)(),
                              (0, de.iD)(
                                de.HY,
                                { key: 0 },
                                [
                                  (0, de.Wm)(
                                    (0, O.SU)(Se.Z),
                                    { content: (0, O.SU)(D.ag)("buttonEdit"), align: "start" },
                                    {
                                      default: (0, de.w5)(() => [
                                        (0, de._)(
                                          "a",
                                          {
                                            class: "btn-ghost",
                                            href: h.value,
                                            "data-hotkey": e.hotkeys.edit,
                                            tabIndex: g.value,
                                          },
                                          [(0, de.Wm)((0, O.SU)(ze.Z), { name: "code" })],
                                          8,
                                          Ot
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["content"]
                                  ),
                                  u.value
                                    ? (0, de.kq)("", !0)
                                    : ((0, de.wg)(),
                                      (0, de.iD)(
                                        de.HY,
                                        { key: 0 },
                                        [
                                          (0, de.Wm)(
                                            (0, O.SU)(Se.Z),
                                            { content: m.value, align: "start" },
                                            {
                                              default: (0, de.w5)(() => [
                                                (0, de._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    onClick: _,
                                                    "data-hotkey": e.hotkeys.toggle,
                                                    tabIndex: g.value,
                                                  },
                                                  [
                                                    (0, de.Wm)(
                                                      (0, O.SU)(ze.Z),
                                                      { name: s.value ? (0, O.SU)(ae) : (0, O.SU)(oe) },
                                                      null,
                                                      8,
                                                      ["name"]
                                                    ),
                                                  ],
                                                  8,
                                                  Mt
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                          (0, de.Wm)(
                                            (0, O.SU)(Se.Z),
                                            {
                                              disabled: !(t.$ = e.script.$canUpdate) || e.script.checking,
                                              content: (0, O.SU)(D.ag)("updateScript"),
                                              align: "start",
                                            },
                                            {
                                              default: (0, de.w5)(() => [
                                                (0, de._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    onClick: S,
                                                    "data-hotkey": e.hotkeys.update,
                                                    tabIndex: t.$ ? g.value : -1,
                                                  },
                                                  [
                                                    (0, de.Wm)(
                                                      (0, O.SU)(ze.Z),
                                                      { name: "refresh", "^invert": -1 === t.$ ? "" : null },
                                                      null,
                                                      8,
                                                      ["^invert"]
                                                    ),
                                                  ],
                                                  8,
                                                  Tt
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
                                  It,
                                  (0, de.Wm)(
                                    (0, O.SU)(Se.Z),
                                    { disabled: !p.value, content: p.value, align: "start" },
                                    {
                                      default: (0, de.w5)(() => [
                                        (0, de._)(
                                          "a",
                                          {
                                            class: "btn-ghost",
                                            tabIndex: p.value ? g.value : -1,
                                            onClick: n[0] || (n[0] = (e) => (0, O.SU)(ye.xr)(e.target)),
                                          },
                                          [(0, de.Wm)((0, O.SU)(ze.Z), { name: "info" })],
                                          8,
                                          Et
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["disabled", "content"]
                                  ),
                                  ((0, de.wg)(!0),
                                  (0, de.iD)(
                                    de.HY,
                                    null,
                                    (0, de.Ko)(
                                      w.value,
                                      ([e, t], n) => (
                                        (0, de.wg)(),
                                        (0, de.j4)(
                                          (0, O.SU)(Se.Z),
                                          { key: n, disabled: !t, content: e, align: "start" },
                                          {
                                            default: (0, de.w5)(() => [
                                              (0, de._)(
                                                "a",
                                                {
                                                  class: "btn-ghost",
                                                  target: "_blank",
                                                  rel: "noopener noreferrer",
                                                  href: t,
                                                  tabIndex: t ? g.value : -1,
                                                },
                                                [(0, de.Wm)((0, O.SU)(ze.Z), { name: n }, null, 8, ["name"])],
                                                8,
                                                Rt
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
                                  e.script.message
                                    ? ((0, de.wg)(),
                                      (0, de.iD)(
                                        "div",
                                        {
                                          key: 1,
                                          class: "script-message",
                                          textContent: (0, pe.zw)(e.script.message),
                                          title: e.script.error,
                                        },
                                        null,
                                        8,
                                        Yt
                                      ))
                                    : (0, de.kq)("", !0),
                                ],
                                64
                              ))
                            : (0, de.kq)("", !0),
                        ]),
                        (0, de._)("div", Pt, [
                          i.value
                            ? ((0, de.wg)(),
                              (0, de.iD)(
                                de.HY,
                                { key: 0 },
                                [
                                  c.value || !u.value
                                    ? ((0, de.wg)(),
                                      (0, de.j4)(
                                        (0, O.SU)(Se.Z),
                                        { key: 0, content: (0, O.SU)(D.ag)("buttonRemove"), align: "end" },
                                        {
                                          default: (0, de.w5)(() => [
                                            (0, de._)(
                                              "a",
                                              {
                                                class: (0, pe.C_)(["btn-ghost", { "btn-danger": u.value }]),
                                                onClick: y,
                                                "data-hotkey": e.hotkeys.remove,
                                                tabIndex: g.value,
                                              },
                                              [(0, de.Wm)((0, O.SU)(ze.Z), { name: "trash" })],
                                              10,
                                              Vt
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, de.kq)("", !0),
                                  u.value
                                    ? ((0, de.wg)(),
                                      (0, de.j4)(
                                        (0, O.SU)(Se.Z),
                                        { key: 1, content: (0, O.SU)(D.ag)("buttonRestore"), placement: "left" },
                                        {
                                          default: (0, de.w5)(() => [
                                            (0, de._)(
                                              "a",
                                              {
                                                class: "btn-ghost",
                                                onClick: x,
                                                "data-hotkey": e.hotkeys.restore,
                                                tabIndex: g.value,
                                              },
                                              [(0, de.Wm)((0, O.SU)(ze.Z), { name: "undo" })],
                                              8,
                                              Ft
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, de.kq)("", !0),
                                ],
                                64
                              ))
                            : (0, de.kq)("", !0),
                        ]),
                      ],
                      42,
                      bt
                    )
                  )
                )
              },
            }
          var qt = z(306),
            Nt = z(6115),
            Kt = z(715)
          const Bt = { class: "form-group condensed" },
            Jt = ["textContent"],
            Gt = ["textContent"],
            Xt = ["textContent"],
            Qt = ["disabled"],
            en = ["textContent"],
            tn = ["textContent"],
            nn = {
              __name: "settings-update",
              props: { script: c },
              setup(e) {
                const t = e,
                  n = (0, de.Fl)(() => t.script.config),
                  l = (0, de.Fl)(() => !t.script._remote)
                return (e, t) => (
                  (0, de.wg)(),
                  (0, de.iD)("div", null, [
                    (0, de._)("div", Bt, [
                      (0, de._)("label", null, [
                        (0, de.wy)(
                          (0, de._)(
                            "input",
                            (0, de.dG)(
                              {
                                type: "checkbox",
                                "onUpdate:modelValue": t[0] || (t[0] = (e) => (n.value.shouldUpdate = e)),
                              },
                              { disabled: l.value }
                            ),
                            null,
                            16
                          ),
                          [[xe.e8, n.value.shouldUpdate]]
                        ),
                        (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelAllowUpdate")) }, null, 8, Jt),
                        (0, de._)(
                          "span",
                          { textContent: (0, pe.zw)(e.i18n("labelNotifyThisUpdated")), class: "melt" },
                          null,
                          8,
                          Gt
                        ),
                      ]),
                      ((0, de.wg)(!0),
                      (0, de.iD)(
                        de.HY,
                        null,
                        (0, de.Ko)(
                          [
                            [e.i18n("genericOn"), "1"],
                            [e.i18n("genericOff"), "0"],
                            [e.i18n("genericUseGlobal"), ""],
                          ],
                          ([e, a]) => (
                            (0, de.wg)(),
                            (0, de.iD)("label", { class: "ml-1 melt", key: a }, [
                              (0, de.wy)(
                                (0, de._)(
                                  "input",
                                  (0, de.dG)(
                                    { type: "radio", ref_for: !0 },
                                    { value: a, disabled: l.value },
                                    { "onUpdate:modelValue": t[1] || (t[1] = (e) => (n.value.notifyUpdates = e)) }
                                  ),
                                  null,
                                  16
                                ),
                                [[xe.G2, n.value.notifyUpdates]]
                              ),
                              (0, de.Uk)(),
                              (0, de._)("span", { textContent: (0, pe.zw)(e) }, null, 8, Xt),
                            ])
                          )
                        ),
                        128
                      )),
                    ]),
                    (0, de._)("label", null, [
                      (0, de.wy)(
                        (0, de._)(
                          "input",
                          {
                            type: "checkbox",
                            "onUpdate:modelValue": t[2] || (t[2] = (e) => (n.value._editable = e)),
                            class: "scary-switch",
                            disabled: l.value || !n.value.shouldUpdate,
                          },
                          null,
                          8,
                          Qt
                        ),
                        [[xe.e8, n.value._editable]]
                      ),
                      (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("readonlyOpt")) }, null, 8, en),
                      (0, de.Uk)(),
                      (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("readonlyOptWarn")) }, null, 8, tn),
                    ]),
                  ])
                )
              },
            },
            ln = { class: "edit-settings" },
            an = ["textContent"],
            on = { class: "mb-2" },
            sn = ["textContent"],
            rn = ["textContent"],
            un = ["disabled"],
            cn = ["textContent"],
            dn = (0, de._)("td", null, [(0, de._)("code", null, "@run-at")], -1),
            pn = ["textContent"],
            mn = ["disabled"],
            gn = ["textContent"],
            vn = (0, de._)("option", { value: "document-start" }, "document-start", -1),
            fn = (0, de._)("option", { value: "document-body" }, "document-body", -1),
            hn = (0, de._)("option", { value: "document-end" }, "document-end", -1),
            wn = (0, de._)("option", { value: "document-idle" }, "document-idle", -1),
            bn = (0, de._)(
              "td",
              null,
              [
                (0, de._)("code", null, [
                  (0, de.Uk)("@"),
                  (0, de._)("s", { style: { color: "var(--fill-6)" } }, "no"),
                  (0, de.Uk)("frames"),
                ]),
              ],
              -1
            ),
            yn = ["textContent"],
            xn = ["disabled"],
            Cn = ["textContent"],
            _n = ["textContent"],
            kn = ["textContent"],
            Sn = (0, de._)("td", null, [(0, de._)("code", null, "@inject-into")], -1),
            Un = ["textContent"],
            zn = ["disabled"],
            Dn = ["textContent"],
            $n = ["textContent"],
            Hn = ["textContent"],
            jn = ["textContent"],
            Wn = ["onUpdate:modelValue", "placeholder", "disabled"],
            Zn = ["textContent"],
            On = ["textContent"],
            Mn = ["textContent"],
            Tn = ["onUpdate:modelValue", "disabled"],
            In = ["textContent"],
            En = ["onUpdate:modelValue", "rows", "disabled"],
            Rn = {
              __name: "settings",
              props: { script: c, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, O.XI)(Kt.Wg),
                  l = (e) => {
                    var t
                    return (null == (t = e.match(/^(.*?)(@[-a-z]+)(.*)/)) ? void 0 : t.slice(1)) || [e, "", ""]
                  },
                  a = (0, de.Fl)(() => t.script.config),
                  o = (0, de.Fl)(() => t.script.custom),
                  i = (0, de.Fl)(() => {
                    const { script: e } = t,
                      { meta: n } = e
                    return {
                      ...(0, _e.zr)(n, [J, G]),
                      [B]: (0, D.t$)(e),
                      [le]: n[le] || (0, D.ag)("hintUseDownloadURL"),
                      [K]: n[K] || e.custom.lastInstallURL,
                    }
                  }),
                  s = [
                    [G, (0, D.ag)("labelName")],
                    [B, (0, D.ag)("labelHomepageURL")],
                    [le, (0, D.ag)("labelUpdateURL")],
                    [K, (0, D.ag)("labelDownloadURL")],
                    [J, (0, D.ag)("labelIconURL")],
                  ],
                  r = [
                    [F, ee, ...l((0, D.ag)("labelInclude"))],
                    [L, te, ...l((0, D.ag)("labelMatch"))],
                    [A, X, ...l((0, D.ag)("labelExclude"))],
                    [q, Q, ...l((0, D.ag)("labelExcludeMatch"))],
                  ]
                return (t, l) => (
                  (0, de.wg)(),
                  (0, de.iD)("div", ln, [
                    (0, de._)("h4", { textContent: (0, pe.zw)((0, O.SU)(D.ag)("editLabelSettings")) }, null, 8, an),
                    (0, de._)("div", on, [
                      (0, de._)("label", null, [
                        (0, de.wy)(
                          (0, de._)(
                            "input",
                            { type: "checkbox", "onUpdate:modelValue": l[0] || (l[0] = (e) => (a.value.enabled = e)) },
                            null,
                            512
                          ),
                          [[xe.e8, a.value.enabled]]
                        ),
                        (0, de._)("span", { textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonEnable")) }, null, 8, sn),
                      ]),
                    ]),
                    (0, de.Wm)((0, O.SU)(nn), (0, pe.vs)((0, de.F4)({ script: e.script })), null, 16),
                    (0, de._)("table", null, [
                      (0, de._)("tr", null, [
                        (0, de._)("td", { textContent: (0, pe.zw)((0, O.SU)(D.ag)("labelTags")) }, null, 8, rn),
                        (0, de._)("td", null, [
                          (0, de.wy)(
                            (0, de._)(
                              "input",
                              {
                                type: "text",
                                "onUpdate:modelValue": l[1] || (l[1] = (e) => (o.value.tags = e)),
                                disabled: e.readOnly,
                              },
                              null,
                              8,
                              un
                            ),
                            [[xe.nr, o.value.tags]]
                          ),
                        ]),
                      ]),
                    ]),
                    (0, de._)("h4", { textContent: (0, pe.zw)((0, O.SU)(D.ag)("editLabelMeta")) }, null, 8, cn),
                    (0, de._)("table", null, [
                      (0, de._)("tr", null, [
                        dn,
                        (0, de._)("td", null, [
                          (0, de._)("p", { textContent: (0, pe.zw)((0, O.SU)(D.ag)("labelRunAt")) }, null, 8, pn),
                        ]),
                        (0, de._)("td", null, [
                          (0, de.wy)(
                            (0, de._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[2] || (l[2] = (e) => (o.value.runAt = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, de._)(
                                  "option",
                                  { value: "", textContent: (0, pe.zw)((0, O.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  gn
                                ),
                                vn,
                                fn,
                                hn,
                                wn,
                              ],
                              8,
                              mn
                            ),
                            [[xe.bM, o.value.runAt]]
                          ),
                        ]),
                      ]),
                      (0, de._)("tr", null, [
                        bn,
                        (0, de._)("td", null, [
                          (0, de._)("p", { textContent: (0, pe.zw)((0, O.SU)(D.ag)("labelNoFrames")) }, null, 8, yn),
                        ]),
                        (0, de._)("td", null, [
                          (0, de.wy)(
                            (0, de._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[3] || (l[3] = (e) => (o.value.noframes = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, de._)(
                                  "option",
                                  { value: "", textContent: (0, pe.zw)((0, O.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Cn
                                ),
                                (0, de._)(
                                  "option",
                                  { value: "0", textContent: (0, pe.zw)((0, O.SU)(D.ag)("genericOn")) },
                                  null,
                                  8,
                                  _n
                                ),
                                (0, de._)(
                                  "option",
                                  { value: "1", textContent: (0, pe.zw)((0, O.SU)(D.ag)("genericOff")) },
                                  null,
                                  8,
                                  kn
                                ),
                              ],
                              8,
                              xn
                            ),
                            [[xe.bM, o.value.noframes]]
                          ),
                        ]),
                      ]),
                      (0, de._)("tr", null, [
                        Sn,
                        (0, de._)("td", null, [
                          (0, de._)(
                            "p",
                            { textContent: (0, pe.zw)((0, O.SU)(D.ag)("labelInjectionMode")) },
                            null,
                            8,
                            Un
                          ),
                        ]),
                        (0, de._)("td", null, [
                          (0, de.wy)(
                            (0, de._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[4] || (l[4] = (e) => (o.value.injectInto = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, de._)(
                                  "option",
                                  { value: "", textContent: (0, pe.zw)((0, O.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Dn
                                ),
                                ((0, de.wg)(!0),
                                (0, de.iD)(
                                  de.HY,
                                  null,
                                  (0, de.Ko)(
                                    n.value,
                                    (e, t) => (
                                      (0, de.wg)(),
                                      (0, de.iD)("option", { key: t, textContent: (0, pe.zw)(t) }, null, 8, $n)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              zn
                            ),
                            [[xe.bM, o.value.injectInto]]
                          ),
                        ]),
                      ]),
                      ((0, de.wg)(),
                      (0, de.iD)(
                        de.HY,
                        null,
                        (0, de.Ko)(s, ([t, n]) =>
                          (0, de._)("tr", { key: t }, [
                            (0, de._)("td", null, [
                              (0, de._)("code", { textContent: (0, pe.zw)(`@${t}`) }, null, 8, Hn),
                            ]),
                            (0, de._)("td", null, [(0, de._)("p", { textContent: (0, pe.zw)(n) }, null, 8, jn)]),
                            (0, de._)("td", null, [
                              (0, de.wy)(
                                (0, de._)(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": (e) => (o.value[t] = e),
                                    placeholder: i.value[t],
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  Wn
                                ),
                                [[xe.nr, o.value[t]]]
                              ),
                            ]),
                          ])
                        ),
                        64
                      )),
                    ]),
                    (0, de._)("table", null, [
                      ((0, de.wg)(),
                      (0, de.iD)(
                        de.HY,
                        null,
                        (0, de.Ko)(r, ([n, l, a, i, s]) =>
                          (0, de._)("tr", { key: n }, [
                            (0, de._)("td", null, [
                              (0, de._)("p", null, [
                                (0, de._)("span", { textContent: (0, pe.zw)(a) }, null, 8, Zn),
                                (0, de._)("code", { textContent: (0, pe.zw)(i) }, null, 8, On),
                                (0, de._)("span", { textContent: (0, pe.zw)(s) }, null, 8, Mn),
                              ]),
                              (0, de._)("label", null, [
                                (0, de.wy)(
                                  (0, de._)(
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
                                  [[xe.e8, o.value[l]]]
                                ),
                                (0, de._)(
                                  "span",
                                  { textContent: (0, pe.zw)((0, O.SU)(D.ag)("labelKeepOriginal")) },
                                  null,
                                  8,
                                  In
                                ),
                              ]),
                            ]),
                            (0, de._)("td", null, [
                              (0, de.wy)(
                                (0, de._)(
                                  "textarea",
                                  {
                                    "onUpdate:modelValue": (e) => (o.value[n] = e),
                                    spellcheck: "false",
                                    rows: t.calcRows(o.value[n]),
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  En
                                ),
                                [[xe.nr, o.value[n]]]
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
          var Yn = z(4631),
            Pn = z.n(Yn),
            Vn = z(2274)
          const Fn = ["data-editing"],
            Ln = { class: "flex-1 flex flex-col" },
            An = { class: "mb-1 flex center-items" },
            qn = ["textContent"],
            Nn = { class: "btn-ghost", tabindex: "0" },
            Kn = (0, de._)(
              "li",
              null,
              [(0, de._)("kbd", null, "PageUp"), (0, de.Uk)(", "), (0, de._)("kbd", null, "PageDown")],
              -1
            ),
            Bn = (0, de._)(
              "li",
              null,
              [
                (0, de._)("kbd", null, "\u2191"),
                (0, de.Uk)(", "),
                (0, de._)("kbd", null, "\u2193"),
                (0, de.Uk)(", "),
                (0, de._)("kbd", null, "Tab"),
                (0, de.Uk)(", "),
                (0, de._)("kbd", null, "Shift-Tab"),
              ],
              -1
            ),
            Jn = (0, de._)("kbd", null, "Enter", -1),
            Gn = { key: 0 },
            Xn = (0, de._)("kbd", null, "Ctrl-Del", -1),
            Qn = ["onKeydown"],
            el = ["textContent"],
            tl = ["onKeydown", "onClick"],
            nl = { class: "ellipsis" },
            ll = ["textContent"],
            al = ["textContent"],
            ol = ["textContent"],
            il = ["onClick"],
            sl = ["textContent"],
            rl = ["textContent"],
            ul = ["onKeydown"],
            cl = ["onClick"],
            dl = ["textContent"],
            pl = ["textContent"],
            ml = ["textContent"],
            gl = { key: 0, class: "edit-values-panel flex flex-col flex-1 mb-1c" },
            vl = { class: "control" },
            fl = ["textContent"],
            hl = { class: "flex center-items" },
            wl = ["textContent", "onClick", "title", "disabled"],
            bl = ["textContent"],
            yl = ["innerHTML"],
            xl = ["textContent"],
            Cl = ["readOnly", "onKeydown"],
            _l = ["textContent"],
            kl = {
              __name: "values",
              props: { script: c, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, O.iH)(),
                  l = (0, O.iH)(),
                  a = (0, O.iH)(),
                  o = (0, O.iH)(),
                  i = (0, O.iH)(),
                  s = (0, O.iH)(),
                  r = (0, O.iH)(),
                  u = (0, O.iH)(!0),
                  d = (0, O.iH)(),
                  f = (0, O.iH)(),
                  h = (0, O.iH)(),
                  b = (0, de.Fl)(() => q(c.values(h.value), "key")),
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
                  k = (e) => ye.$J.setContext("edit", "selectionEnd" in e.target),
                  U = (0, de.Fl)(() => c.keys(f.value || {}).sort()),
                  z = (0, de.Fl)(() => Math.ceil(U.value.length / 25)),
                  $ = (0, de.Fl)(() => {
                    const e = 25 * (d.value - 1),
                      t = U.value.slice(e, e + 25)
                    return (t.style = q(t)), t
                  })
                let H,
                  j,
                  Z,
                  M,
                  T,
                  I,
                  E = "  "
                function R(e) {
                  ;(0, de.Y3)(() => {
                    l.value[e ? "click" : "focus"]()
                  })
                }
                function Y(e) {
                  d.value = Math.max(1, Math.min(z.value, d.value + e))
                }
                function P(e, t) {
                  const n = e.length + (f.value[e] || t).length - 1
                  return n < 1e4 ? n : (0, D.aj)(n)
                }
                function V(e, t, n) {
                  let l = f.value[e] || n
                  const a = l[0]
                  return (l = l.slice(1)), "s" === a ? (l = JSON.stringify(l)) : t || (l = C(l)), t ? x(l) : l
                }
                function F() {
                  return `{\n${E}${U.value
                    .map((e) => `${JSON.stringify(e)}: ${V(e)}`)
                    .join(",\n")
                    .replace(/\n/g, "\n" + E)}\n}`
                }
                function L(e, t) {
                  null != e || (e = {})
                  const n = f.value
                  let l
                  if (
                    (t
                      ? (w(_e.LI, n, ([t, n]) => {
                          n !== e[t] && (B(t), (l = !0))
                        }),
                        null != l || (l = !0))
                      : (l = !(0, _e.vZ)(n, e)),
                    l)
                  )
                    return (f.value = e), (d.value = Math.min(d.value, z.value) || 1), A(), !0
                }
                function A() {
                  const { script: e } = t,
                    { $cache: n = (e.$cache = {}) } = e,
                    l = U.value.reduce((e, t) => e + t.length + 4 + f.value[t].length + 2, 0)
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
                  a && U.value.includes(e) && B(e)
                  const { id: o } = t.script.props
                  await (0, D.gj)("UpdateValue", { [o]: { [e]: l } }, void 0, T),
                    l ? (f.value[e] = l) : delete f.value[e],
                    A()
                }
                function K() {
                  r.value = { isNew: !0, key: "", value: "", ...y }
                }
                function B(e, t = f.value[e], n = V(e, !0), l = P(e, t)) {
                  ;(h.value || (h.value = {}))[e + Math.random()] = { key: e, rawValue: t, cut: n, len: l }
                }
                function J(e) {
                  var n
                  t.readOnly ||
                    (N({ key: e }), B(e), (null == (n = r.value) ? void 0 : n.key) === e && (r.value = null))
                }
                function G(e) {
                  const t = h.value,
                    n = t[e]
                  delete t[e], (0, D.xb)(t) && (h.value = null), N(n)
                }
                function X(e) {
                  r.value = { key: e, value: V(e), ...y }
                }
                function Q() {
                  r.value = { isAll: !0, value: F(), ...y }
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
                    const e = w(_e.Xw, n.jsonValue, (e) => (0, D.bd)(e) || "")
                    await (0, D.gj)("SetValueStores", { [t.script.props.id]: e }), L(e, !0)
                  } else await N(n, !0)
                }
                function te() {
                  const e = r.value
                  if (e.dirty) {
                    const t = H.getValue().trim(),
                      { jsonValue: n = t } = e
                    B(e.key, (0, D.bd)(n), x(t))
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
                function ae(e) {
                  Pn().keyName(e) === ie && ee()
                }
                function oe(e) {
                  const t = c.values(e)[0].newValue
                  if (t) {
                    const e = r.value,
                      n = null == e ? void 0 : e.key,
                      l = e && (e.isAll ? F : V)
                    if ((L(t instanceof c ? t : (0, _e.p$)(t)), e)) {
                      const t = l(n)
                      H.getValue() === t ? ((e.isNew = !1), (e.dirty = !1)) : e.dirty || ((e.value = t), le())
                    }
                  } else L(t)
                }
                function se(e) {
                  ;(0, ye.nk)(("ArrowDown" === e.key ? 1 : e.target !== l.value && -1) || 0)
                }
                return (
                  (0, de.dl)(() => {
                    var e
                    const l = n.value,
                      { id: a } = t.script.props,
                      o = (0, D.K0)()
                    w(p, l, "focusin", k),
                      null == (e = r.value ? H : M) || e.focus(),
                      (0, D.gj)("GetValueStore", a, void 0, (T = { tab: { id: Math.random() - 2 }, [S]: 0 })).then(
                        (e) => {
                          const t = !f.value
                          L(e) && t && U.value.length && R(!0), (u.value = !1)
                        }
                      ),
                      (Z = [
                        () => w(m, l, "focusin", k),
                        ye.$J.register("pageup", () => Y(-1), _),
                        ye.$J.register("pagedown", () => Y(1), _),
                        (0, Ce.Z)("valueEditor", (e) => {
                          if (((j = e), (E = " ".repeat((null == e ? void 0 : e.tabSize) || 2)), H && e))
                            for (const t in e) "mode" !== t && H.setOption(t, e[t])
                        }),
                      ]),
                      (I = g.runtime.connect({
                        name:
                          Kt.vy +
                          JSON.stringify({ cfg: { value: a }, id: null == o ? void 0 : o[Kt.vy](oe), tabId: T.tab.id }),
                      })),
                      o || I.onMessage.addListener(oe),
                      (s.value = !0)
                  }),
                  (0, de.se)(() => {
                    var e, t
                    ;(s.value = !1),
                      null == (e = Z) || e.forEach((e) => e()),
                      null == (t = I) || t.disconnect(),
                      (Z = I = null)
                  }),
                  (0, de.YP)(r, (e, t) => {
                    if (e)
                      (M = (0, W.vY)()),
                        (0, de.Y3)(() => {
                          const n = o.value
                          if (((H = n.cm), t && n.updateValue(e.value), e.isNew)) {
                            const e = a.value
                            e.setSelectionRange(0, 0), e.focus()
                          } else H.setCursor(0, 0), H.focus()
                        })
                    else if (t) {
                      var n
                      null == (n = M) || n.focus()
                    }
                  }),
                  (0, de.YP)(d, () => {
                    ;(M = null), R()
                  }),
                  (t, c) => (
                    (0, de.wg)(),
                    (0, de.iD)(
                      "div",
                      { class: "edit-values flex", ref_key: "$el", ref: n, "data-editing": r.value && "" },
                      [
                        (0, de._)("div", Ln, [
                          (0, de._)("nav", An, [
                            e.readOnly
                              ? (0, de.kq)("", !0)
                              : ((0, de.wg)(),
                                (0, de.iD)("a", { key: 0, onClick: K, class: "btn-ghost", tabindex: "0" }, [
                                  (0, de.Wm)((0, O.SU)(ze.Z), { name: "plus" }),
                                ])),
                            z.value > 1
                              ? ((0, de.wg)(),
                                (0, de.iD)(
                                  de.HY,
                                  { key: 1 },
                                  [
                                    (0, de._)(
                                      "a",
                                      {
                                        onClick: c[0] || (c[0] = (e) => Y(-1)),
                                        class: (0, pe.C_)(["btn-ghost", { subtle: 1 === d.value }]),
                                        tabindex: "0",
                                      },
                                      "\u23f4",
                                      2
                                    ),
                                    (0, de.wy)(
                                      (0, de._)(
                                        "input",
                                        {
                                          "onUpdate:modelValue": c[1] || (c[1] = (e) => (d.value = e)),
                                          type: "number",
                                          onWheel: c[2] || (c[2] = (e) => Y(e.deltaY > 0 ? 1 : -1)),
                                        },
                                        null,
                                        544
                                      ),
                                      [[xe.nr, d.value]]
                                    ),
                                    (0, de._)("span", { textContent: (0, pe.zw)(`\xa0/\xa0${z.value}`) }, null, 8, qn),
                                    (0, de._)(
                                      "a",
                                      {
                                        onClick: c[3] || (c[3] = (e) => Y(1)),
                                        class: (0, pe.C_)(["btn-ghost", { subtle: d.value >= z.value }]),
                                        tabindex: "0",
                                      },
                                      "\u23f5",
                                      2
                                    ),
                                  ],
                                  64
                                ))
                              : (0, de.kq)("", !0),
                            (0, de.Wm)((0, O.SU)(ke.Z), null, {
                              content: (0, de.w5)(() => [
                                (0, de._)("ul", null, [
                                  Kn,
                                  Bn,
                                  (0, de._)("li", null, [
                                    (0, de._)("span", null, [
                                      Jn,
                                      (0, de.Uk)(": " + (0, pe.zw)(t.i18n("buttonEdit")) + ",", 1),
                                    ]),
                                  ]),
                                  e.readOnly
                                    ? (0, de.kq)("", !0)
                                    : ((0, de.wg)(),
                                      (0, de.iD)("li", Gn, [
                                        (0, de._)("span", null, [
                                          Xn,
                                          (0, de.Uk)(": " + (0, pe.zw)(t.i18n("buttonRemove")), 1),
                                        ]),
                                      ])),
                                ]),
                              ]),
                              default: (0, de.w5)(() => [
                                (0, de._)("a", Nn, [(0, de.Wm)((0, O.SU)(ze.Z), { name: "info" })]),
                              ]),
                              _: 1,
                            }),
                          ]),
                          (0, de._)(
                            "div",
                            {
                              class: "edit-values-table main",
                              style: (0, pe.j5)($.value.style),
                              onKeydown: [
                                (0, xe.D2)((0, xe.iM)(se, ["exact"]), ["down"]),
                                (0, xe.D2)((0, xe.iM)(se, ["exact"]), ["up"]),
                              ],
                            },
                            [
                              (0, de._)(
                                "a",
                                {
                                  ref_key: "$editAll",
                                  ref: l,
                                  class: "edit-values-row flex",
                                  onClick: Q,
                                  tabindex: "0",
                                  textContent: (0, pe.zw)(t.i18n("editValueAllHint")),
                                },
                                null,
                                8,
                                el
                              ),
                              ((0, de.wg)(!0),
                              (0, de.iD)(
                                de.HY,
                                null,
                                (0, de.Ko)(
                                  $.value,
                                  (t) => (
                                    (0, de.wg)(),
                                    (0, de.iD)(
                                      "div",
                                      {
                                        key: t,
                                        class: "edit-values-row flex monospace-font",
                                        onKeydown: (0, xe.D2)(
                                          (0, xe.iM)((e) => J(t), ["ctrl", "exact"]),
                                          ["delete"]
                                        ),
                                        onClick: (e) => X(t),
                                      },
                                      [
                                        (0, de._)("div", nl, [
                                          (0, de._)("a", { textContent: (0, pe.zw)(t), tabindex: "0" }, null, 8, ll),
                                        ]),
                                        (0, de._)(
                                          "div",
                                          { class: "ellipsis flex-auto", textContent: (0, pe.zw)(V(t, !0)) },
                                          null,
                                          8,
                                          al
                                        ),
                                        (0, de._)("pre", { textContent: (0, pe.zw)(P(t)) }, null, 8, ol),
                                        e.readOnly
                                          ? (0, de.kq)("", !0)
                                          : ((0, de.wg)(),
                                            (0, de.iD)(
                                              "div",
                                              { key: 0, class: "del", onClick: (0, xe.iM)((e) => J(t), ["stop"]) },
                                              [(0, de.Wm)((0, O.SU)(ze.Z), { name: "trash" })],
                                              8,
                                              il
                                            )),
                                      ],
                                      40,
                                      tl
                                    )
                                  )
                                ),
                                128
                              )),
                            ],
                            44,
                            Qn
                          ),
                          u.value || U.value.length
                            ? (0, de.kq)("", !0)
                            : ((0, de.wg)(),
                              (0, de.iD)(
                                "div",
                                {
                                  key: 0,
                                  class: "edit-values-empty mt-1",
                                  textContent: (0, pe.zw)(t.i18n("noValues")),
                                },
                                null,
                                8,
                                sl
                              )),
                          h.value
                            ? ((0, de.wg)(),
                              (0, de.iD)(
                                "h3",
                                { key: 1, textContent: (0, pe.zw)(t.i18n("headerRecycleBin")) },
                                null,
                                8,
                                rl
                              ))
                            : (0, de.kq)("", !0),
                          h.value
                            ? ((0, de.wg)(),
                              (0, de.iD)(
                                "div",
                                {
                                  key: 2,
                                  class: "edit-values-table trash monospace-font",
                                  onKeydown: [
                                    (0, xe.D2)((0, xe.iM)(se, ["exact"]), ["down"]),
                                    (0, xe.D2)((0, xe.iM)(se, ["exact"]), ["up"]),
                                  ],
                                  style: (0, pe.j5)(b.value),
                                },
                                [
                                  ((0, de.wg)(!0),
                                  (0, de.iD)(
                                    de.HY,
                                    null,
                                    (0, de.Ko)(
                                      h.value,
                                      ({ key: e, cut: t, len: n }, l) => (
                                        (0, de.wg)(),
                                        (0, de.iD)(
                                          "div",
                                          { key: l, class: "edit-values-row flex", onClick: (e) => G(l) },
                                          [
                                            (0, de._)(
                                              "a",
                                              { class: "ellipsis", textContent: (0, pe.zw)(e), tabindex: "0" },
                                              null,
                                              8,
                                              dl
                                            ),
                                            (0, de._)(
                                              "s",
                                              { class: "ellipsis flex-auto", textContent: (0, pe.zw)(t) },
                                              null,
                                              8,
                                              pl
                                            ),
                                            (0, de._)("pre", { textContent: (0, pe.zw)(n) }, null, 8, ml),
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
                                ul
                              ))
                            : (0, de.kq)("", !0),
                        ]),
                        r.value
                          ? ((0, de.wg)(),
                            (0, de.iD)("div", gl, [
                              (0, de._)("div", vl, [
                                (0, de._)(
                                  "h4",
                                  {
                                    textContent: (0, pe.zw)(
                                      r.value.isAll ? t.i18n("labelEditValueAll") : t.i18n("labelEditValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  fl
                                ),
                                (0, de._)("div", hl, [
                                  (0, de._)(
                                    "a",
                                    {
                                      tabindex: "0",
                                      class: "mr-1 flex",
                                      onClick: c[4] || (c[4] = (e) => (i.value = !i.value)),
                                    },
                                    [
                                      (0, de.Wm)(
                                        (0, O.SU)(ze.Z),
                                        { name: "cog", class: (0, pe.C_)({ active: i.value }) },
                                        null,
                                        8,
                                        ["class"]
                                      ),
                                    ]
                                  ),
                                  ((0, de.wg)(!0),
                                  (0, de.iD)(
                                    de.HY,
                                    null,
                                    (0, de.Ko)(
                                      [t.i18n("buttonOK"), t.i18n("buttonApply")],
                                      (e, t) => (
                                        (0, de.wg)(),
                                        (0, de.iD)(
                                          "button",
                                          {
                                            key: e,
                                            textContent: (0, pe.zw)(e),
                                            onClick: (e) => ee(t),
                                            class: (0, pe.C_)({ "has-error": r.value.error, "save-beacon": !t }),
                                            title: r.value.error,
                                            disabled: r.value.error || !r.value.dirty,
                                          },
                                          null,
                                          10,
                                          wl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, de._)(
                                    "button",
                                    { textContent: (0, pe.zw)(t.i18n("buttonCancel")), onClick: te, title: "Esc" },
                                    null,
                                    8,
                                    bl
                                  ),
                                ]),
                              ]),
                              i.value
                                ? ((0, de.wg)(),
                                  (0, de.iD)(
                                    de.HY,
                                    { key: 0 },
                                    [
                                      (0, de._)(
                                        "p",
                                        { class: "my-1", innerHTML: t.i18n("descEditorOptions") },
                                        null,
                                        8,
                                        yl
                                      ),
                                      (0, de.Wm)(
                                        (0, O.SU)(Vn.Z),
                                        { name: "valueEditor", json: "", onDblclick: (0, O.SU)(ce), "has-save": !1 },
                                        null,
                                        8,
                                        ["onDblclick"]
                                      ),
                                    ],
                                    64
                                  ))
                                : (0, de.kq)("", !0),
                              (0, de.wy)(
                                (0, de._)(
                                  "label",
                                  null,
                                  [
                                    (0, de._)(
                                      "span",
                                      { textContent: (0, pe.zw)(t.i18n("valueLabelKey")) },
                                      null,
                                      8,
                                      xl
                                    ),
                                    (0, de.wy)(
                                      (0, de._)(
                                        "input",
                                        {
                                          type: "text",
                                          "onUpdate:modelValue": c[5] || (c[5] = (e) => (r.value.key = e)),
                                          readOnly: !r.value.isNew || e.readOnly,
                                          ref_key: "$key",
                                          ref: a,
                                          spellcheck: "false",
                                          onKeydown: [ae, (0, xe.D2)((0, xe.iM)(te, ["exact", "stop"]), ["esc"])],
                                        },
                                        null,
                                        40,
                                        Cl
                                      ),
                                      [[xe.nr, r.value.key]]
                                    ),
                                  ],
                                  512
                                ),
                                [[xe.F8, !r.value.isAll]]
                              ),
                              (0, de._)("label", null, [
                                (0, de._)(
                                  "span",
                                  {
                                    textContent: (0, pe.zw)(
                                      r.value.isAll ? t.i18n("valueLabelValueAll") : t.i18n("valueLabelValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  _l
                                ),
                                (0, de.Wm)(
                                  (0, O.SU)(qt.Z),
                                  {
                                    value: r.value.value,
                                    "cm-options": (0, O.SU)(j),
                                    ref_key: "$value",
                                    ref: o,
                                    class: "h-100 mt-1",
                                    mode: "application/json",
                                    readOnly: e.readOnly,
                                    onCodeDirty: le,
                                    onKeydownCapture:
                                      c[6] ||
                                      (c[6] = (0, xe.D2)(
                                        (0, xe.iM)(() => {}, ["shift", "exact", "stop"]),
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
                          : (0, de.kq)("", !0),
                      ],
                      8,
                      Fn
                    )
                  )
                )
              },
            },
            Sl = kl,
            Ul = { class: "edit-help mb-2c" },
            zl = ["innerHTML"],
            Dl = (0, de._)(
              "a",
              { href: "https://violentmonkey.github.io/api/", rel: "noopener noreferrer", target: "_blank" },
              "violentmonkey.github.io/api/",
              -1
            ),
            $l = { class: "keyboard" },
            Hl = ["textContent"],
            jl = ["textContent"],
            Wl = ["textContent"],
            Zl = {
              __name: "help",
              props: { hotkeys: Array },
              setup: (e) => (t, n) => (
                (0, de.wg)(),
                (0, de.iD)("div", Ul, [
                  (0, de._)("div", null, [
                    (0, de._)("h3", { innerHTML: t.i18n("editHelpDocumention") }, null, 8, zl),
                    Dl,
                  ]),
                  (0, de._)("div", $l, [
                    (0, de._)("h3", { textContent: (0, pe.zw)(t.i18n("editHelpKeyboard")) }, null, 8, Hl),
                    ((0, de.wg)(!0),
                    (0, de.iD)(
                      de.HY,
                      null,
                      (0, de.Ko)(
                        e.hotkeys,
                        ([e, t]) => (
                          (0, de.wg)(),
                          (0, de.iD)("dl", { key: e }, [
                            (0, de._)("dt", { class: "monospace-font", textContent: (0, pe.zw)(e) }, null, 8, jl),
                            (0, de._)("dd", { textContent: (0, pe.zw)(t) }, null, 8, Wl),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                ])
              ),
            },
            Ol = { class: "edit-header flex mr-1c" },
            Ml = ["textContent", "onClick"],
            Tl = { class: "edit-name text-center ellipsis flex-1" },
            Il = ["textContent"],
            El = ["textContent"],
            Rl = { key: 1, class: "edit-hint text-right ellipsis" },
            Yl = ["href", "textContent"],
            Pl = { class: "mr-1" },
            Vl = ["textContent", "disabled", "title"],
            Fl = ["textContent", "disabled"],
            Ll = ["textContent"],
            Al = { key: 0, class: "frozen-note shelf mr-2c flex flex-wrap" },
            ql = ["textContent"],
            Nl = { key: 1, class: "shelf fatal" },
            Kl = ["textContent"],
            Bl = { key: 2, class: "errors shelf my-1c" },
            Jl = ["textContent"],
            Gl = ["textContent"],
            Xl = { key: 1, class: "my-1" },
            Ql = "https://violentmonkey.github.io/api/matching/",
            ea = { [G]: "", [B]: "", [le]: "", [K]: "", [J]: "", [ee]: !0, [X]: !0, [te]: !0, [Q]: !0, tags: "" },
            ta = (e) => ("" !== e ? e : null),
            na = [F, L, A, q],
            la = (e) =>
              e.trim()
                ? e
                    .split("\n")
                    .map((e) => e.trim())
                    .filter(r)
                : null,
            aa = [l, a],
            oa = (e) => e || null,
            ia = (e, t) => (e < t ? -1 : e > t),
            sa = ({ shouldUpdate: e, _editable: t }) => +e && e + t,
            ra = (e, t) => {
              if (t >= 0) {
                const n = e.lastIndexOf("\n", t) + 1,
                  l = e.indexOf("\n", t)
                return e.slice(n, l > 0 ? l : void 0)
              }
            },
            ua = /#/,
            ca = {
              __name: "index",
              props: { initial: c, initialCode: String, readOnly: r },
              emits: ["close"],
              setup(t, { emit: n }) {
                let l, a, o, i, r, u
                const d = n,
                  m = t,
                  v = (0, O.iH)(),
                  f = (0, O.iH)(),
                  h = (0, O.iH)("code"),
                  x = (0, O.iH)(!1),
                  C = (0, O.iH)(),
                  _ = (0, O.iH)(""),
                  k = (0, O.iH)(!1),
                  S = { save: R, close: Y },
                  U = (0, O.iH)(),
                  z = (0, O.iH)(),
                  $ = (0, de.Fl)(() => {
                    for (let e = 0, t = ["meta", "custom"]; e < t.length; e++) {
                      const n = t[e]
                      for (let e = 0; e < na.length; e++) {
                        const t = na[e]
                        let l = C.value[n][t]
                        if (l && (l = s(l) ? l.find(ua.test, ua) : ra(l, l.indexOf("#"))))
                          return l.length > 100 ? l.slice(0, 100) + "..." : l
                      }
                    }
                  }),
                  H = (0, O.iH)(),
                  Z = (0, O.iH)(!1),
                  T = (0, O.iH)(!1),
                  I = (0, de.Fl)(() => {
                    const {
                        meta: e,
                        props: { id: t },
                        $cache: n = {},
                      } = C.value,
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
                  E = (0, de.Fl)(() => (V.title = (0, D.pV)(C.value)))
                ;(0, de.YP)(
                  h,
                  async (e) => {
                    await (0, de.Y3)(), "code" === e ? l.focus() : (0, W.wO)(f.value.$el)
                  },
                  { immediate: !0 }
                ),
                  (0, de.YP)(x, (e) => {
                    u(e), ye.$J.setContext("canSave", e)
                  }),
                  (0, de.YP)(k, N),
                  (0, de.YP)(C, (e) => {
                    const { custom: t, config: n } = e,
                      { shouldUpdate: l } = n
                    ;(n._editable = 2 === l),
                      (n.enabled = !!n.enabled),
                      (n.shouldUpdate = !!l),
                      (n.notifyUpdates = (0, D.jd)(n.notifyUpdates)),
                      (t.noframes = (0, D.jd)(t.noframes))
                    for (const e in ea) null == t[e] && (t[e] = ea[e])
                    for (let e = 0; e < aa.length; e++) {
                      const n = aa[e]
                      t[n] || (t[n] = "")
                    }
                    for (let e = 0; e < na.length; e++) {
                      const n = na[e],
                        l = t[n]
                      t[n] = l ? `${l.join("\n")}${l.length ? "\n" : ""}` : ""
                    }
                    q(), n.removed || (i = (0, _e.p$)(e))
                  })
                {
                  const e = m.initial
                  ;(_.value = m.initialCode),
                    (C.value = (0, _e.p$)(e)),
                    (0, de.YP)(() => C.value.config, q, { deep: !0 }),
                    (0, de.YP)(() => C.value.custom, q, { deep: !0 }),
                    (0, de.YP)(
                      () => e.error,
                      (t) => {
                        t && (0, W.PV)({ text: `${e.message}\n\n${t}` })
                      }
                    ),
                    (0, de.YP)(
                      () => e.config.enabled,
                      (e) => {
                        ;(C.value.config.enabled = e), i && (i.config.enabled = e)
                      }
                    )
                }
                async function R() {
                  if (!x.value) return
                  r && K()
                  const e = C.value,
                    { config: t, custom: n } = e,
                    { notifyUpdates: o } = t,
                    { noframes: i } = n
                  try {
                    var s
                    const r = e.props.id,
                      u = await (0, D.gj)("ParseScript", {
                        id: r,
                        code: a.getRealContent(),
                        config: { enabled: +t.enabled, notifyUpdates: o ? +o : null, shouldUpdate: sa(t) },
                        custom: {
                          ...(0, _e.zr)(n, c.keys(ea), ta),
                          ...(0, _e.zr)(n, na, la),
                          ...(0, _e.zr)(n, aa, oa),
                          noframes: i ? +i : null,
                        },
                        isNew: !r,
                        message: "",
                        bumpDate: !0,
                      }),
                      d = null == u || null == (s = u.where) ? void 0 : s.id
                    l.markClean(),
                      (k.value = !1),
                      (x.value = !1),
                      (T.value = !1),
                      (z.value = u.errors),
                      (C.value = u.update),
                      d && !r && history.replaceState(null, E.value, `${y}/${d}`),
                      (H.value = null)
                  } catch (e) {
                    H.value = e.message.split("\n")
                  }
                }
                function Y(e) {
                  var t
                  e || "code" === h.value
                    ? (d("close"), b && (null == (t = (0, W.vY)()) || t.blur()))
                    : (h.value = "code")
                }
                async function P() {
                  await R(), Y(!0)
                }
                function F(e) {
                  const t = c.keys(I.value)
                  h.value = t[(t.indexOf(h.value) + e + t.length) % t.length]
                }
                function L() {
                  F(-1)
                }
                function A() {
                  F(1)
                }
                function q(e) {
                  const t = C.value,
                    { config: n } = t,
                    { removed: l } = n,
                    a = (t._remote = !!(0, D.TZ)(t)) && sa(n),
                    o = !(!l && 1 !== a && !m.readOnly)
                  ;(Z.value = o), (T.value = !l && (o || a >= 1)), !l && e && N()
                }
                function N() {
                  x.value = k.value || !(0, _e.vZ)(C.value, i)
                }
                async function K(e) {
                  j.Z.get("editorWindow") &&
                    (e || (e = (await (null == D.oy ? void 0 : D.oy.getCurrent())) || {}),
                    "normal" === e.state &&
                      j.Z.set("editorWindowPos", (0, _e.zr)(e, ["left", "top", "width", "height"])))
                }
                function B({ id: e, tabs: t }) {
                  if (1 === t.length) {
                    const { onBoundsChanged: t } = g.windows
                    t
                      ? t.addListener((t) => {
                          t.id === e && K(t)
                        })
                      : (p("resize", (0, D.Ds)(K, 100)), (r = !0))
                  }
                }
                return (
                  (0, de.bv)(() => {
                    var t
                    ;(a = v.value),
                      (l = a.cm),
                      (u = (0, M.Q$)(null, () => l.focus())),
                      j.Z.get("editorWindow") &&
                        1 === e.history.length &&
                        (null == (t = browser.windows) || t.getCurrent({ populate: !0 }).then(B))
                    const n = c.values(I.value),
                      o = (U.value = [
                        ["Alt-PageUp", ` ${n.join(" < ")}`],
                        ["Alt-PageDown", ` ${n.join(" > ")}`],
                        ...c.entries(a.expandKeyMap()).sort((e, t) => ia(e[1], t[1]) || ia(e[0], t[0])),
                      ])
                    ie || se(o)
                  }),
                  (0, de.dl)(() => {
                    document.body.classList.add("edit-open"),
                      (o = [
                        ye.$J.register("a-pageup", L),
                        ye.$J.register("a-pagedown", A),
                        ye.$J.register(ie.replace(/(?:Ctrl|Cmd)-/i, "ctrlcmd-"), R),
                        ye.$J.register("escape", Y),
                        ye.$J.register("f1", () => {
                          h.value = "help"
                        }),
                      ]),
                      (V.title = E.value)
                  }),
                  (0, de.se)(() => {
                    var e
                    document.body.classList.remove("edit-open"),
                      (V.title = null),
                      u(!1),
                      null == (e = o) || e.forEach((e) => e())
                  }),
                  (e, n) => (
                    (0, de.wg)(),
                    (0, de.iD)(
                      "div",
                      { class: (0, pe.C_)(["edit frame flex flex-col abs-full", { frozen: Z.value }]) },
                      [
                        (0, de._)("div", Ol, [
                          (0, de._)("nav", null, [
                            ((0, de.wg)(!0),
                            (0, de.iD)(
                              de.HY,
                              null,
                              (0, de.Ko)(
                                I.value,
                                (e, t) => (
                                  (0, de.wg)(),
                                  (0, de.iD)(
                                    "div",
                                    {
                                      key: t,
                                      class: (0, pe.C_)(["edit-nav-item", { active: h.value === t }]),
                                      textContent: (0, pe.zw)(e),
                                      onClick: (e) => (h.value = t),
                                    },
                                    null,
                                    10,
                                    Ml
                                  )
                                )
                              ),
                              128
                            )),
                          ]),
                          (0, de._)("div", Tl, [
                            C.value.config.removed
                              ? ((0, de.wg)(),
                                (0, de.iD)(
                                  "span",
                                  {
                                    key: 0,
                                    class: "subtle",
                                    textContent: (0, pe.zw)((0, O.SU)(D.ag)("headerRecycleBin") + " / "),
                                  },
                                  null,
                                  8,
                                  Il
                                ))
                              : (0, de.kq)("", !0),
                            (0, de.Uk)(" " + (0, pe.zw)(E.value), 1),
                          ]),
                          Z.value && "code" === h.value
                            ? ((0, de.wg)(),
                              (0, de.iD)(
                                "p",
                                {
                                  key: 0,
                                  textContent: (0, pe.zw)((0, O.SU)(D.ag)("readonly")),
                                  class: "text-upper text-right text-red",
                                },
                                null,
                                8,
                                El
                              ))
                            : ((0, de.wg)(),
                              (0, de.iD)("div", Rl, [
                                (0, de._)(
                                  "a",
                                  {
                                    href: (0, O.SU)(W.XB),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    textContent: (0, pe.zw)((0, O.SU)(D.ag)("editHowToHint")),
                                  },
                                  null,
                                  8,
                                  Yl
                                ),
                              ])),
                          (0, de._)("div", Pl, [
                            (0, de.wy)(
                              (0, de._)(
                                "button",
                                {
                                  textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonSave")),
                                  onClick: R,
                                  disabled: !x.value,
                                  class: (0, pe.C_)({ "has-error": (e.$fe = H.value || z.value) }),
                                  title: e.$fe,
                                },
                                null,
                                10,
                                Vl
                              ),
                              [[xe.F8, x.value || !Z.value]]
                            ),
                            (0, de.wy)(
                              (0, de._)(
                                "button",
                                {
                                  textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonSaveClose")),
                                  onClick: P,
                                  disabled: !x.value,
                                },
                                null,
                                8,
                                Fl
                              ),
                              [[xe.F8, x.value || !Z.value]]
                            ),
                            (0, de._)(
                              "button",
                              {
                                textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonClose")),
                                onClick: n[0] || (n[0] = (e) => Y(!0)),
                                title: "Esc",
                              },
                              null,
                              8,
                              Ll
                            ),
                          ]),
                        ]),
                        T.value && "code" === h.value
                          ? ((0, de.wg)(),
                            (0, de.iD)("div", Al, [
                              (0, de._)("p", { textContent: (0, pe.zw)((0, O.SU)(D.ag)("readonlyNote")) }, null, 8, ql),
                              ((0, de.wg)(),
                              (0, de.j4)(
                                de.Ob,
                                null,
                                [
                                  (0, de.Wm)((0, O.SU)(nn), { class: "flex ml-2c", script: C.value }, null, 8, [
                                    "script",
                                  ]),
                                ],
                                1024
                              )),
                            ]))
                          : (0, de.kq)("", !0),
                        H.value
                          ? ((0, de.wg)(),
                            (0, de.iD)("p", Nl, [
                              (0, de._)("b", { textContent: (0, pe.zw)(H.value[0]) }, null, 8, Kl),
                              (0, de.Uk)(" " + (0, pe.zw)(H.value[1]), 1),
                            ]))
                          : (0, de.kq)("", !0),
                        (0, de.wy)(
                          (0, de.Wm)(
                            (0, O.SU)(qt.Z),
                            {
                              class: (0, pe.C_)(["flex-auto", { readonly: Z.value }]),
                              value: _.value,
                              readOnly: Z.value,
                              ref_key: "$code",
                              ref: v,
                              active: "code" === h.value,
                              commands: S,
                              onCodeDirty: n[1] || (n[1] = (e) => (k.value = e)),
                            },
                            null,
                            8,
                            ["class", "value", "readOnly", "active"]
                          ),
                          [[xe.F8, "code" === h.value]]
                        ),
                        ((0, de.wg)(),
                        (0, de.j4)(
                          de.Ob,
                          { ref_key: "$tabBody", ref: f },
                          [
                            "settings" === h.value
                              ? ((0, de.wg)(),
                                (0, de.j4)(
                                  (0, O.SU)(Rn),
                                  (0, de.dG)({ key: 0, class: "edit-body" }, { readOnly: t.readOnly, script: C.value }),
                                  null,
                                  16
                                ))
                              : "values" === h.value
                                ? ((0, de.wg)(),
                                  (0, de.j4)(
                                    (0, O.SU)(Sl),
                                    (0, de.dG)(
                                      { key: 1, class: "edit-body" },
                                      { readOnly: t.readOnly, script: C.value }
                                    ),
                                    null,
                                    16
                                  ))
                                : "externals" === h.value
                                  ? ((0, de.wg)(),
                                    (0, de.j4)(
                                      (0, O.SU)(Nt.Z),
                                      { key: 2, class: "flex-auto", value: C.value },
                                      null,
                                      8,
                                      ["value"]
                                    ))
                                  : "help" === h.value
                                    ? ((0, de.wg)(),
                                      (0, de.j4)(
                                        (0, O.SU)(Zl),
                                        { key: 3, class: "edit-body", hotkeys: U.value },
                                        null,
                                        8,
                                        ["hotkeys"]
                                      ))
                                    : (0, de.kq)("", !0),
                          ],
                          1536
                        )),
                        z.value || $.value
                          ? ((0, de.wg)(),
                            (0, de.iD)("div", Bl, [
                              $.value
                                ? ((0, de.wg)(),
                                  (0, de.j4)(
                                    (0, O.SU)(De.Z),
                                    { key: 0, "i18n-key": "hashPatternWarning" },
                                    {
                                      default: (0, de.w5)(() => [
                                        (0, de._)("code", { textContent: (0, pe.zw)($.value) }, null, 8, Jl),
                                      ]),
                                      _: 1,
                                    }
                                  ))
                                : (0, de.kq)("", !0),
                              ((0, de.wg)(!0),
                              (0, de.iD)(
                                de.HY,
                                null,
                                (0, de.Ko)(
                                  z.value,
                                  (e) => (
                                    (0, de.wg)(),
                                    (0, de.iD)(
                                      "p",
                                      { key: e, textContent: (0, pe.zw)(e), class: "text-red" },
                                      null,
                                      8,
                                      Gl
                                    )
                                  )
                                ),
                                128
                              )),
                              z.value
                                ? ((0, de.wg)(),
                                  (0, de.iD)("p", Xl, [
                                    (0, de._)("a", {
                                      href: Ql,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      textContent: Ql,
                                    }),
                                  ]))
                                : (0, de.kq)("", !0),
                            ]))
                          : (0, de.kq)("", !0),
                      ],
                      2
                    )
                  )
                )
              },
            },
            da = ca,
            pa = { key: 0 },
            ma = { class: "flex" },
            ga = { class: "btn-group" },
            va = ["textContent"],
            fa = ["textContent"],
            ha = ["textContent"],
            wa = ["textContent"],
            ba = { key: 0, class: "btn-group" },
            ya = ["data-batch-action"],
            xa = ["textContent"],
            Ca = { key: 1, class: "ml-1" },
            _a = ["textContent"],
            ka = ["textContent"],
            Sa = (0, de._)("div", { class: "flex-auto" }, null, -1),
            Ua = ["value"],
            za = ["textContent", "value"],
            Da = { class: "btn-ghost", tabindex: "0" },
            $a = { class: "mr-2c" },
            Ha = ["title", "placeholder"],
            ja = { class: "filter-search-tooltip" },
            Wa = ["textContent"],
            Za = ["innerHTML"],
            Oa = { key: 0, class: "hint mx-1 my-1 flex flex-col" },
            Ma = ["textContent"],
            Ta = ["textContent"],
            Ia = ["textContent"],
            Ea = ["data-columns", "data-show-order", "data-table"],
            Ra = "edit",
            Ya = "remove",
            Pa = "restore",
            Va = "toggle",
            Fa = "undo",
            La = "update",
            Aa = "tabScripts",
            qa = "scrollTop",
            Na = {
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
                  l = (0, O.qj)({
                    searchScope: null,
                    showEnabledFirst: null,
                    showOrder: null,
                    viewSingleColumn: null,
                    viewTable: null,
                    sort: null,
                  })
                w(_e.SE, l, (e) => {
                  ;(0, Ce.Z)(`filters.${e}`, (t) => {
                    ;(l[e] = t), "sort" !== e || n.sort[t] || (l[e] = c.keys(n.sort)[0])
                  })
                })
                const a = `${Aa} && inputFocus`,
                  i = `${Aa} && !inputFocus`,
                  s = `${i} && selectedScript && !showRecycle`,
                  u = `${i} && selectedScript && showRecycle`,
                  g = `${i} && !buttonFocus`,
                  f = `${i} && selectedScript && showHotkeys`,
                  h = { [Ra]: "e", [Va]: "space", [La]: "r", [Pa]: "r", [Ya]: "x" },
                  y = (e, t) => t.map(([t, n, l]) => ye.$J.register(t, e, { condition: n, caseSensitive: l }))
                let x,
                  C = 0,
                  _ = [],
                  S = []
                const U = (0, O.iH)(),
                  z = (0, O.iH)(),
                  $ = (0, O.iH)(),
                  H = (0, O.iH)(),
                  T = (0, O.qj)({
                    focusedIndex: -1,
                    menuNew: !1,
                    showHotkeys: !1,
                    search: (V.search = { value: "", error: null, ...R("") }),
                    sortedScripts: [],
                    filteredScripts: [],
                    script: null,
                    code: "",
                    numColumns: 1,
                    batchRender: { limit: C },
                    batchAction: { action: null, [Fa]: null },
                  }),
                  I = (0, de.Fl)(() => V.route.paths[0] === k),
                  E = (0, de.Fl)(() => !I.value && "exec" === l.sort),
                  Y = (0, de.Fl)(() => W.T && E.value),
                  F = (0, de.Fl)(() => {
                    var e
                    return null == (e = n.sort[l.sort]) ? void 0 : e.compare
                  }),
                  L = (0, de.Fl)(() => T.filteredScripts[T.focusedIndex]),
                  A = (0, de.Fl)(() =>
                    V.loading ||
                    (T.search.rules.length ? T.sortedScripts.find((e) => !1 !== e.$cache.show) : T.sortedScripts.length)
                      ? null
                      : (0, D.ag)("labelNoSearchScripts")
                  ),
                  q = (0, de.Fl)(
                    () =>
                      T.search.rules.some((e) => !e.scope || "code" === e.scope) &&
                      V.scripts.filter((e) => null == e.$cache.code).map((e) => e.props.id)
                  ),
                  N = (0, de.Fl)(() =>
                    T.search.tokens.filter((e) => "#" === e.prefix && !e.negative).map((e) => e.parsed)
                  ),
                  K = () => (I.value ? V.removedScripts : V.scripts),
                  B = (e) => e.target.closest("[data-batch-action]"),
                  J = {
                    [Va]: {
                      icon: ae,
                      arg(e) {
                        const t = this.icon === ae ? 1 : 0
                        return e.filter((e) => +e.config.enabled !== t)
                      },
                      fn: (e) => d.all(e.map(He)),
                    },
                    [La]: { icon: "refresh", fn: je, [Fa]: !1 },
                    [Ya]: {
                      icon: "trash",
                      async fn(e, t, n) {
                        await d.all(e.map((e) => re(e, !n))), n || (V.scripts = [])
                      },
                    },
                  },
                  G = (0, de.Fl)(() => {
                    const e = T.filteredScripts,
                      t = e.length,
                      n = t === T.sortedScripts.length
                    let l = J,
                      a = 0,
                      o = 0
                    for (let t = 0; t < e.length; t++) {
                      const l = e[t]
                      ;(a += !l.config.enabled), n || (o += l.$canUpdate > 0)
                    }
                    return (
                      (l[Va].icon = a ? ae : oe),
                      (l[Va].num = a < t ? a : ""),
                      o ? (l[La].num = o < t ? o : "") : ({ [La]: o, ...l } = l),
                      l
                    )
                  }),
                  X = (0, D.Ds)(() => {
                    try {
                      ;(T.search = V.search = { ...T.search, ...R(T.search.value) }), (T.search.error = null)
                    } catch (e) {
                      T.search.error = e.message
                    }
                    const e = q.value
                    null != e && e.length && ve(e), ne()
                  }, 100),
                  Q = (0, D.Ds)(ge)
                function ee() {
                  !I.value &&
                    V.needRefresh &&
                    ((V.scripts = V.scripts.filter((e) => !e.config.removed)), (V.needRefresh = !1)),
                    (T.focusedIndex = -1),
                    ne()
                }
                async function te() {
                  const e = q.value
                  null != e && e.length && (await ve(e)), ne(), me()
                }
                function ne() {
                  const e = [...K()],
                    t = T.search.rules,
                    n = t.length ? P(e, t) : e.length,
                    a = F.value
                  var o
                  a &&
                    e.sort(
                      ((o = a), l.showEnabledFirst ? (e, t) => t.config.enabled - e.config.enabled || o(e, t) : o)
                    ),
                    (T.sortedScripts = e),
                    (T.filteredScripts = t.length ? e.filter(({ $cache: e }) => e.show) : e),
                    we(T.focusedIndex),
                    !C || n < C ? ge() : Q()
                }
                async function le() {
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
                async function ie(e, t) {
                  if (e === t) return
                  const n = T.filteredScripts,
                    l = V.scripts,
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
                    ne())
                }
                function se(e) {
                  j.Z.set("filters.sort", e.target.value)
                }
                function ce(e) {
                  const n = w(D.Hv, [I.value ? k : o, e], "/")
                  e || n !== (0, M.Qs)().pathname ? (0, M.pV)(n) : t.history.back()
                }
                async function me() {
                  const [e, t, n] = V.route.paths,
                    l = "_new" === t && (await (0, D.gj)("NewScript", +n)),
                    a = l ? l.script : +t && K().find((e) => e.props.id === +t)
                  if (a) return (T.code = l ? l.code : await (0, D.gj)("GetScriptCode", t)), void (T.script = a)
                  if (
                    (t && (0, M.pV)(e, !0),
                    V.canRenderScripts || ((V.canRenderScripts = !0), or()),
                    ge(),
                    (T.script = null),
                    !b)
                  ) {
                    const e = H.value,
                      t = document.scrollingElement,
                      n = e[qa],
                      l = t[qa]
                    ;(0, de.Y3)(() => {
                      ;(e[qa] = n), (t[qa] = l)
                    })
                  }
                }
                async function ge() {
                  if (!V.canRenderScripts) return
                  const { length: e } = T.sortedScripts
                  let t = 9
                  const n = (0, O.qj)({ limit: t })
                  T.batchRender = n
                  const l = v.now()
                  for (; t < e && n === T.batchRender; ) {
                    if (C && T.search.rules.length)
                      for (let n = 0; n < C && t < e; t += 1) n += T.sortedScripts[t].$cache.show ? 1 : 0
                    else t += C || 1
                    ;(n.limit = t),
                      await new d((e) => (0, de.Y3)(e)),
                      !C && v.now() - l >= 100 && (C = 2 * t),
                      C && t < e && (await (0, D.dL)())
                  }
                }
                async function ve(e) {
                  const t = await (0, D.gj)("GetScriptCode", e)
                  V.scripts.forEach(({ $cache: e, props: { id: n } }) => {
                    n in t && (e.code = t[n])
                  }),
                    ne()
                }
                async function fe() {
                  ;(await (0, W.GW)((0, D.ag)("buttonEmptyRecycleBin"))) &&
                    ((0, D.gj)("CheckRemove", { force: !0 }), (V.removedScripts = []))
                }
                function he() {
                  const e = l.viewTable ? _ : S
                  T.numColumns = l.viewSingleColumn ? 1 : e.findIndex((e) => t.innerWidth < e) + 1 || e.length + 1
                }
                function we(e) {
                  ;(e = Math.min(e, T.filteredScripts.length - 1)),
                    (e = Math.max(e, -1)) !== T.focusedIndex && (T.focusedIndex = e)
                }
                function be(e) {
                  e.config.removed ? (0, D.gj)("RemoveScripts", [e.props.id]) : re(e, 1)
                }
                async function $e(e) {
                  try {
                    await re(e, 0)
                  } catch (t) {
                    ;(0, W.GW)(`${t.message || t}\n\n@namespace ${e.meta.namespace}\n@name ${e.meta.name}`, {
                      cancel: !1,
                    })
                  }
                }
                function He(e) {
                  return (0, D.gj)("UpdateScriptInfo", {
                    id: e.props.id,
                    config: { enabled: e.config.enabled ? 0 : 1 },
                  })
                }
                async function je(e, t) {
                  var n
                  t && (t = (t.querySelector("svg") || t).classList).add("rotate"),
                    await (0, D.gj)("CheckUpdate", e && (0, D.rY)(e).map((e) => e.props.id)),
                    null == (n = t) || n.remove("rotate")
                }
                function We(e) {
                  if (N.value.includes(e)) {
                    const t = T.search.tokens.filter((t) => !("#" === t.prefix && t.parsed === e))
                    T.search.value = t.map((e) => `${e.prefix}${e.raw}`).join(" ")
                  } else T.search.value = [T.search.value.trim(), `#${e} `].filter(r).join(" ")
                }
                function Ze(e) {
                  if (!e) return
                  const t = $.value
                  t.scroll({ top: t.scrollTop + e, behavior: "smooth" })
                }
                function Oe(e) {
                  if (V.batch) return
                  const t = B(e),
                    n = T.batchAction
                  let l = null == t ? void 0 : t.dataset.batchAction
                  if (n.action === l) {
                    const e = G.value[l] || {},
                      a = T.filteredScripts,
                      o = (null == e.arg ? void 0 : e.arg(a)) || a,
                      i = e.fn,
                      s = [i, o, t]
                    i && ue(...s),
                      (n[Fa] =
                        i &&
                        !1 !== e[Fa] &&
                        (() => {
                          ue(...s, Fa), (n[Fa] = null)
                        })),
                      (l = ""),
                      t.blur()
                  }
                  n.action = l
                }
                function Me() {
                  const e = () => {
                    var e
                    ye.$J.setContext("buttonFocus", (null == (e = (0, W.vY)()) ? void 0 : e.tabIndex) >= 0)
                  }
                  p("focus", e, !0)
                  const t = [
                    () => m("focus", e, !0),
                    ...(b
                      ? [
                          ye.$J.register("tab", () => {
                            ;(0, ye.nk)(1)
                          }),
                          ye.$J.register("s-tab", () => {
                            ;(0, ye.nk)(-1)
                          }),
                        ]
                      : []),
                    ...y(() => {
                      var e
                      null == (e = z.value) || e.focus()
                    }, [
                      ["ctrlcmd-f", Aa],
                      ["/", i, !0],
                    ]),
                    ...y(() => {
                      var e
                      null == (e = z.value) || e.blur()
                    }, [["enter", a]]),
                    ...y(() => {
                      T.showHotkeys = !1
                    }, [
                      ["escape", f],
                      ["q", f, !0],
                    ]),
                    ...y(() => {
                      let e = T.focusedIndex
                      e < 0 ? (e = 0) : (e += T.numColumns), e < T.filteredScripts.length && we(e)
                    }, [
                      ["ctrlcmd-down", Aa],
                      ["down", Aa],
                      ["j", i, !0],
                    ]),
                    ...y(() => {
                      const e = T.focusedIndex - T.numColumns
                      e >= 0 && we(e)
                    }, [
                      ["ctrlcmd-up", Aa],
                      ["up", Aa],
                      ["k", i, !0],
                    ]),
                    ...y(() => {
                      we(T.focusedIndex - 1)
                    }, [
                      ["ctrlcmd-left", Aa],
                      ["left", i],
                      ["h", i, !0],
                    ]),
                    ...y(() => {
                      we(T.focusedIndex + 1)
                    }, [
                      ["ctrlcmd-right", Aa],
                      ["right", i],
                      ["l", i, !0],
                    ]),
                    ...y(() => {
                      we(0)
                    }, [
                      ["ctrlcmd-home", Aa],
                      ["g g", i, !0],
                    ]),
                    ...y(() => {
                      we(T.filteredScripts.length - 1)
                    }, [
                      ["ctrlcmd-end", Aa],
                      ["G", i, !0],
                    ]),
                    ...y(() => {
                      ce(L.value.props.id)
                    }, [
                      [h[Ra], s, !0],
                      ["enter", g],
                    ]),
                    ...y(() => {
                      be(L.value)
                    }, [
                      ["delete", s],
                      [h[Ya], s, !0],
                    ]),
                    ...y(() => {
                      je(L.value)
                    }, [[h[La], s, !0]]),
                    ...y(() => {
                      He(L.value)
                    }, [[h[Va], s, !0]]),
                    ...y(() => {
                      $e(L.value)
                    }, [[h[Pa], u, !0]]),
                    ...y(() => {
                      T.showHotkeys = !T.showHotkeys
                    }, [["?", i, !0]]),
                  ]
                  return () =>
                    t.forEach((e) => {
                      e()
                    })
                }
                function Te(e) {
                  B(e) || (T.batchAction.action = null)
                }
                ee(),
                  (0, de.YP)(I, ee),
                  (0, de.YP)(
                    () => V.canRenderScripts && $.value && E.value,
                    (e) => tt($.value, ie, e)
                  ),
                  (0, de.YP)(() => T.search.value, X),
                  (0, de.YP)(() => [l.sort, l.showEnabledFirst], X),
                  screen.availWidth > 767 &&
                    ((0, de.YP)(() => l.viewSingleColumn, he),
                    (0, de.YP)(
                      () => l.viewTable,
                      (e) => {
                        if ((he(), e && !x)) {
                          x = (0, Z.w)("-width: 76")
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
                  (0, de.YP)(K, te),
                  (0, de.YP)(() => V.route.paths[1], me),
                  (0, de.YP)(
                    () => V.scripts,
                    (e) => {
                      e.length || ((e = U.value).focus(), e.click())
                    }
                  ),
                  (0, de.YP)(L, (e) => {
                    ye.$J.setContext("selectedScript", e)
                  }),
                  (0, de.YP)(
                    () => T.showHotkeys,
                    (e) => {
                      ye.$J.setContext("showHotkeys", e)
                    }
                  )
                const Ie = []
                return (
                  (0, de.bv)(() => {
                    if ((V.loading || te(), !S.length)) {
                      const e =
                        (null == Z.$ ? void 0 : Z.$.textContent.match(/--columns-(cards|table)\b/)) &&
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
                      p("resize", he)
                    }
                    he(),
                      Ie.push(Me()),
                      document.addEventListener("mousedown", Te),
                      Ie.push(() => document.removeEventListener("mousedown", Te))
                  }),
                  (0, de.Jd)(() => {
                    Ie.forEach((e) => e())
                  }),
                  (e, t) => (
                    (0, de.wg)(),
                    (0, de.iD)(
                      "div",
                      { class: "tab-installed", ref_key: "scroller", ref: H },
                      [
                        (0, O.SU)(V).canRenderScripts
                          ? ((0, de.wg)(),
                            (0, de.iD)("div", pa, [
                              (0, de._)("header", ma, [
                                I.value
                                  ? ((0, de.wg)(),
                                    (0, de.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "ml-2",
                                        textContent: (0, pe.zw)((0, O.SU)(D.ag)("headerRecycleBin")),
                                      },
                                      null,
                                      8,
                                      ka
                                    ))
                                  : ((0, de.wg)(),
                                    (0, de.iD)(
                                      de.HY,
                                      { key: 0 },
                                      [
                                        (0, de._)("div", ga, [
                                          (0, de.Wm)(
                                            (0, O.SU)(ke.Z),
                                            {
                                              modelValue: T.menuNew,
                                              "onUpdate:modelValue": t[1] || (t[1] = (e) => (T.menuNew = e)),
                                              class: (0, pe.C_)({ active: T.menuNew }),
                                              closeAfterClick: !0,
                                            },
                                            {
                                              content: (0, de.w5)(() => [
                                                (0, de._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonNew")),
                                                    tabindex: "0",
                                                    onClick:
                                                      t[0] || (t[0] = (0, xe.iM)((e) => ce("_new"), ["prevent"])),
                                                  },
                                                  null,
                                                  8,
                                                  va
                                                ),
                                                (0, de._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, pe.zw)(
                                                      (0, O.SU)(D.ag)("installFrom", "OpenUserJS")
                                                    ),
                                                    href: "https://openuserjs.org/",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  fa
                                                ),
                                                (0, de._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, pe.zw)(
                                                      (0, O.SU)(D.ag)("installFrom", "GreasyFork")
                                                    ),
                                                    href: "https://greasyfork.org/scripts",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  ha
                                                ),
                                                (0, de._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonInstallFromURL")),
                                                    tabindex: "0",
                                                    onClick: (0, xe.iM)(le, ["prevent"]),
                                                  },
                                                  null,
                                                  8,
                                                  wa
                                                ),
                                              ]),
                                              default: (0, de.w5)(() => [
                                                (0, de.Wm)(
                                                  (0, O.SU)(Se.Z),
                                                  {
                                                    content: (0, O.SU)(D.ag)("buttonNew"),
                                                    placement: "bottom",
                                                    align: "start",
                                                    disabled: T.menuNew,
                                                  },
                                                  {
                                                    default: (0, de.w5)(() => [
                                                      (0, de._)(
                                                        "a",
                                                        {
                                                          class: "btn-ghost",
                                                          tabindex: "0",
                                                          ref_key: "$menuNew",
                                                          ref: U,
                                                        },
                                                        [(0, de.Wm)((0, O.SU)(ze.Z), { name: "plus" })],
                                                        512
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
                                            8,
                                            ["modelValue", "class"]
                                          ),
                                          (0, de.Wm)(
                                            (0, O.SU)(Se.Z),
                                            {
                                              content: (0, O.SU)(D.ag)("updateScriptsAll"),
                                              placement: "bottom",
                                              align: "start",
                                            },
                                            {
                                              default: (0, de.w5)(() => [
                                                (0, de._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    tabindex: "0",
                                                    onClick: t[2] || (t[2] = (e) => je(null, e.target)),
                                                  },
                                                  [(0, de.Wm)((0, O.SU)(ze.Z), { name: "refresh" })]
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                        ]),
                                        T.filteredScripts.length
                                          ? ((0, de.wg)(),
                                            (0, de.iD)("div", ba, [
                                              ((0, de.wg)(!0),
                                              (0, de.iD)(
                                                de.HY,
                                                null,
                                                (0, de.Ko)(
                                                  G.value,
                                                  ({ icon: e, num: t }, n) => (
                                                    (0, de.wg)(),
                                                    (0, de.iD)(
                                                      "a",
                                                      {
                                                        key: n,
                                                        class: (0, pe.C_)([
                                                          "btn-ghost",
                                                          {
                                                            "has-error": T.batchAction.action === n,
                                                            disabled: (0, O.SU)(V).batch,
                                                          },
                                                        ]),
                                                        "data-batch-action": n,
                                                        tabindex: "0",
                                                        onClick: (0, xe.iM)(Oe, ["prevent"]),
                                                      },
                                                      [
                                                        (0, de.Wm)((0, O.SU)(ze.Z), { name: e }, null, 8, ["name"]),
                                                        t
                                                          ? ((0, de.wg)(),
                                                            (0, de.iD)(
                                                              "sub",
                                                              { key: 0, textContent: (0, pe.zw)(t) },
                                                              null,
                                                              8,
                                                              xa
                                                            ))
                                                          : (0, de.kq)("", !0),
                                                        T.batchAction.action === n
                                                          ? ((0, de.wg)(), (0, de.iD)("span", Ca, "\u2757"))
                                                          : (0, de.kq)("", !0),
                                                      ],
                                                      10,
                                                      ya
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                              (0, de._)(
                                                "div",
                                                {
                                                  class: "btn-hint subtle",
                                                  textContent: (0, pe.zw)(
                                                    (0, O.SU)(D.ag)("hintForBatchAction", `${T.filteredScripts.length}`)
                                                  ),
                                                },
                                                null,
                                                8,
                                                _a
                                              ),
                                              (0, de.Wm)(
                                                (0, O.SU)(Se.Z),
                                                {
                                                  content: (0, O.SU)(D.ag)("buttonUndo"),
                                                  placement: "bottom",
                                                  align: "start",
                                                },
                                                {
                                                  default: (0, de.w5)(() => [
                                                    T.batchAction.undo
                                                      ? ((0, de.wg)(),
                                                        (0, de.iD)(
                                                          "a",
                                                          {
                                                            key: 0,
                                                            class: "btn-ghost",
                                                            tabindex: "0",
                                                            onClick:
                                                              t[3] ||
                                                              (t[3] = (0, xe.iM)(
                                                                (...e) =>
                                                                  T.batchAction.undo && T.batchAction.undo(...e),
                                                                ["prevent"]
                                                              )),
                                                          },
                                                          [(0, de.Wm)((0, O.SU)(ze.Z), { name: "undo" })]
                                                        ))
                                                      : (0, de.kq)("", !0),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["content"]
                                              ),
                                            ]))
                                          : (0, de.kq)("", !0),
                                      ],
                                      64
                                    )),
                                Sa,
                                (0, de.Wm)(
                                  (0, O.SU)(De.Z),
                                  { "i18n-key": "labelFilterSort", class: "ml-1" },
                                  {
                                    default: (0, de.w5)(() => [
                                      (0, de._)(
                                        "select",
                                        { value: l.sort, onChange: se, class: "h-100" },
                                        [
                                          ((0, de.wg)(!0),
                                          (0, de.iD)(
                                            de.HY,
                                            null,
                                            (0, de.Ko)(
                                              n.sort,
                                              (e, t) => (
                                                (0, de.wg)(),
                                                (0, de.iD)(
                                                  "option",
                                                  { textContent: (0, pe.zw)(e.title), key: t, value: t },
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
                                (0, de.Wm)(
                                  (0, O.SU)(ke.Z),
                                  { align: "right", class: "filter-sort" },
                                  {
                                    content: (0, de.w5)(() => [
                                      (0, de.wy)(
                                        (0, de._)(
                                          "div",
                                          null,
                                          [
                                            (0, de.Wm)(
                                              (0, O.SU)(Ue.Z),
                                              {
                                                name: "filters.showEnabledFirst",
                                                label: (0, O.SU)(D.ag)("optionShowEnabledFirst"),
                                              },
                                              null,
                                              8,
                                              ["label"]
                                            ),
                                          ],
                                          512
                                        ),
                                        [[xe.F8, F.value]]
                                      ),
                                      (0, de._)("div", null, [
                                        (0, de.Wm)(
                                          (0, O.SU)(Ue.Z),
                                          { name: "filters.showOrder", label: (0, O.SU)(D.ag)("labelShowOrder") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                      (0, de._)("div", $a, [
                                        (0, de.Wm)(
                                          (0, O.SU)(Ue.Z),
                                          { name: "filters.viewTable", label: (0, O.SU)(D.ag)("labelViewTable") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                        (0, de.Wm)(
                                          (0, O.SU)(Ue.Z),
                                          {
                                            name: "filters.viewSingleColumn",
                                            label: (0, O.SU)(D.ag)("labelViewSingleColumn"),
                                          },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                    ]),
                                    default: (0, de.w5)(() => [
                                      (0, de.Wm)(
                                        (0, O.SU)(Se.Z),
                                        { content: (0, O.SU)(D.ag)("labelSettings"), placement: "bottom" },
                                        {
                                          default: (0, de.w5)(() => [
                                            (0, de._)("a", Da, [(0, de.Wm)((0, O.SU)(ze.Z), { name: "cog" })]),
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
                                (0, de._)(
                                  "form",
                                  {
                                    class: "filter-search hidden-xs",
                                    onSubmit: t[5] || (t[5] = (0, xe.iM)(() => {}, ["prevent"])),
                                    style: (0, pe.j5)({
                                      "min-width": "10em",
                                      "max-width": 5 + Math.max(20, T.search.value.length) + "ex",
                                    }),
                                  },
                                  [
                                    (0, de._)("label", null, [
                                      (0, de.wy)(
                                        (0, de._)(
                                          "input",
                                          {
                                            type: "search",
                                            class: (0, pe.C_)({ "has-error": T.search.error }),
                                            title: T.search.error,
                                            placeholder: (0, O.SU)(D.ag)("labelSearchScript"),
                                            "onUpdate:modelValue": t[4] || (t[4] = (e) => (T.search.value = e)),
                                            ref_key: "refSearch",
                                            ref: z,
                                            id: "installed-search",
                                          },
                                          null,
                                          10,
                                          Ha
                                        ),
                                        [[xe.nr, T.search.value]]
                                      ),
                                      (0, de.Wm)((0, O.SU)(ze.Z), { name: "search" }),
                                    ]),
                                  ],
                                  36
                                ),
                                (0, de.Wm)(
                                  (0, O.SU)(ke.Z),
                                  { align: "right" },
                                  {
                                    content: (0, de.w5)(() => [
                                      (0, de._)("div", ja, [
                                        T.search.error
                                          ? ((0, de.wg)(),
                                            (0, de.iD)(
                                              "div",
                                              { key: 0, class: "has-error", textContent: (0, pe.zw)(T.search.error) },
                                              null,
                                              8,
                                              Wa
                                            ))
                                          : (0, de.kq)("", !0),
                                        (0, de._)(
                                          "div",
                                          { innerHTML: (0, O.SU)(D.ag)("titleSearchHintV2") },
                                          null,
                                          8,
                                          Za
                                        ),
                                      ]),
                                    ]),
                                    default: (0, de.w5)(() => [
                                      (0, de._)(
                                        "a",
                                        {
                                          class: (0, pe.C_)(["btn-ghost", { "has-error": T.search.error }]),
                                          tabindex: "0",
                                        },
                                        [(0, de.Wm)((0, O.SU)(ze.Z), { name: "question" })],
                                        2
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              I.value
                                ? ((0, de.wg)(),
                                  (0, de.iD)("div", Oa, [
                                    (0, de._)(
                                      "span",
                                      { textContent: (0, pe.zw)((0, O.SU)(D.ag)("hintRecycleBin")) },
                                      null,
                                      8,
                                      Ma
                                    ),
                                    (0, O.SU)(V).removedScripts.length
                                      ? ((0, de.wg)(),
                                        (0, de.iD)(
                                          "a",
                                          {
                                            key: 0,
                                            textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonEmptyRecycleBin")),
                                            tabindex: "0",
                                            onClick: fe,
                                          },
                                          null,
                                          8,
                                          Ta
                                        ))
                                      : (0, de.kq)("", !0),
                                  ]))
                                : A.value
                                  ? ((0, de.wg)(),
                                    (0, de.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "hint mx-1 my-1 flex flex-col",
                                        textContent: (0, pe.zw)(A.value),
                                      },
                                      null,
                                      8,
                                      Ia
                                    ))
                                  : (0, de.kq)("", !0),
                              (0, de.wy)(
                                ((0, de.wg)(),
                                (0, de.iD)(
                                  "div",
                                  {
                                    class: "scripts",
                                    ref_key: "refList",
                                    ref: $,
                                    style: (0, pe.j5)(`--num-columns:${T.numColumns}`),
                                    "data-columns": T.numColumns,
                                    "data-show-order": l.showOrder || null,
                                    "data-table": l.viewTable || null,
                                  },
                                  [
                                    ((0, de.wg)(!0),
                                    (0, de.iD)(
                                      de.HY,
                                      null,
                                      (0, de.Ko)(T.sortedScripts, (e, t) =>
                                        (0, de.wy)(
                                          ((0, de.wg)(),
                                          (0, de.j4)(
                                            (0, O.SU)(At),
                                            {
                                              key: e.props.id,
                                              focused: L.value === e,
                                              showHotkeys: T.showHotkeys,
                                              script: e,
                                              draggable: Y.value,
                                              visible: t < T.batchRender.limit,
                                              viewTable: l.viewTable,
                                              hotkeys: h,
                                              activeTags: N.value,
                                              onRemove: be,
                                              onRestore: $e,
                                              onToggle: He,
                                              onUpdate: je,
                                              onScrollDelta: Ze,
                                              onClickTag: We,
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
                                          [[xe.F8, !T.search.rules.length || !1 !== e.$cache.show]]
                                        )
                                      ),
                                      128
                                    )),
                                  ],
                                  12,
                                  Ea
                                )),
                                [[(0, O.SU)(W.Tu), !T.script]]
                              ),
                            ]))
                          : (0, de.kq)("", !0),
                        ((0, de.wg)(),
                        (0, de.j4)(de.lR, { to: "body" }, [
                          ((0, de.wg)(),
                          (0, de.j4)(
                            de.Ob,
                            { key: (0, O.SU)(V).route.hash, max: 5 },
                            [
                              T.script
                                ? ((0, de.wg)(),
                                  (0, de.j4)(
                                    (0, O.SU)(da),
                                    {
                                      key: 0,
                                      initial: T.script,
                                      "initial-code": T.code,
                                      "read-only": !!T.script.config.removed,
                                      onClose: t[6] || (t[6] = (e) => ce()),
                                    },
                                    null,
                                    8,
                                    ["initial", "initial-code", "read-only"]
                                  ))
                                : (0, de.kq)("", !0),
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
            Ka = Na,
            Ba = ["data-show-advanced"],
            Ja = ["textContent"],
            Ga = { class: "mb-1c" },
            Xa = ["textContent"],
            Qa = { class: "ml-2c flex flex-col" },
            eo = ["textContent"],
            to = { class: "ml-2c" },
            no = ["onUpdate:modelValue"],
            lo = ["value", "textContent"],
            ao = ["onUpdate:modelValue"],
            oo = ["value", "textContent"],
            io = ["textContent"],
            so = ["onUpdate:modelValue"],
            ro = ["value", "textContent"],
            uo = ["textContent"],
            co = ["onUpdate:modelValue"],
            po = ["textContent"],
            mo = { class: "mb-1c" },
            go = ["textContent"],
            vo = { class: "ml-2c flex flex-col" },
            fo = { class: "ml-2c flex flex-col" },
            ho = { class: "mb-2c" },
            wo = ["textContent"],
            bo = (0, de._)("hr", null, null, -1),
            yo = ["open"],
            xo = ["onClick"],
            Co = { class: "mb-1c" },
            _o = ["textContent"],
            ko = ["onUpdate:modelValue"],
            So = ["value", "textContent"],
            Uo = { class: "ml-2c flex flex-col" },
            zo = ["textContent"],
            Do = ["onUpdate:modelValue"],
            $o = ["textContent"],
            Ho = ["textContent"],
            jo = (0, de._)("code", null, "page", -1),
            Wo = ["textContent"],
            Zo = { key: 0 },
            Oo = (0, de._)("code", null, "page", -1),
            Mo = ["textContent"],
            To = ["href"],
            Io = ["textContent"],
            Eo = ["textContent"],
            Ro = ["innerHTML"]
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
            Vo = ["textContent", "disabled"],
            Fo = ["textContent", "title"],
            Lo = { class: "mt-1" },
            Ao = (0, de._)("br", null, null, -1),
            qo = { class: "import-report" },
            No = ["data-type"],
            Ko = ["textContent"],
            Bo = ["textContent", "colspan"],
            Jo = {
              __name: "vm-import",
              setup(e) {
                const t = (0, O.qj)([]),
                  n = (0, O.iH)(),
                  l = (0, O.iH)(""),
                  a = (0, D.ag)("confirmUndoImport"),
                  o = (0, D.ag)("labelImportScriptData"),
                  i = (0, D.ag)("labelImportSettings")
                let r, u
                function v() {
                  const e = document.createElement("input")
                  ;(e.type = "file"),
                    (e.accept = ".zip"),
                    (e.onchange = () => {
                      var t
                      return f(null == (t = e.files) ? void 0 : t[0])
                    }),
                    e.click()
                }
                async function f(e) {
                  V.batch || ue(h, e)
                }
                async function h(e) {
                  if (!e) return
                  t.length = 0
                  const n = j.Z.get("importScriptData"),
                    a = await Po(),
                    o = new a.ZipReader(new a.BlobReader(e)),
                    i = (await o.getEntries().catch(z)) || []
                  if (t.length) return
                  z("", e.name, "info"), z("", "", "info")
                  const p = {},
                    m = i.reduce((e, t) => {
                      var n
                      return e + (null == (n = t.filename) ? void 0 : n.endsWith(".user.js"))
                    }, 0),
                    v = i.find((e) => {
                      var t
                      return "violentmonkey" === (null == (t = e.filename) ? void 0 : t.toLowerCase())
                    }),
                    f = (v && (await U(v))) || {},
                    h = j.Z.get("importSettings") && f.settings,
                    w = f.scripts || {},
                    y = f.values || {}
                  let x,
                    C = 0,
                    _ = 0
                  function k(e, t) {
                    try {
                      return JSON.parse(e)
                    } catch (e) {
                      z(e, t.filename, null)
                    }
                  }
                  function S(e, t) {
                    return d.all(
                      i.map(async (n) => {
                        const { filename: l } = n
                        if (null != l && l.endsWith(t)) {
                          const a = await U(n)
                          return a && e(n, a, l.slice(0, -t.length))
                        }
                      })
                    )
                  }
                  async function U(e) {
                    const t = await e.getData(new a.TextWriter())
                    return e.filename.endsWith(".js") ? t : k(t, e)
                  }
                  function z(e, n, l = "critical") {
                    t.push({ text: e, name: n, type: l })
                  }
                  function $(e = "") {
                    const n = c.keys(p).length,
                      l = (0, D.ag)("msgImported", [n === m ? n : `${n} / ${m}`])
                    return (t[0].name = l), (t[0].text = e), l
                  }
                  function H(e) {
                    return (0, D.rY)(e).filter((e) => "string" == typeof e)
                  }
                  ;(r = (0, D.xA)()),
                    g.runtime.onConnect.addListener((e) => {
                      e.name === r &&
                        e.onMessage.addListener(([n, l]) => {
                          l ? ++C : ++_,
                            (t[1].name = (0, D.ag)("msgLoadingDependency", [C, _])),
                            C === _ ? ((n = (0, D.ag)("buttonOK")), e.disconnect()) : l || (n += "..."),
                            (t[1].text = n)
                        })
                    }),
                    u ||
                      ((x = " \u2bc8 " + new Date().toLocaleTimeString()),
                      (u = g.runtime.connect({ name: "undoImport" })),
                      await new d(b)),
                    await S(async (e, n, l) => {
                      const { meta: a, settings: o = {}, options: i } = n
                      if (!a || !i) return
                      const s = i.override || {}
                      ;(t[0].text = "Tampermonkey"),
                        (w[l] = {
                          config: { enabled: !1 !== o.enabled ? 1 : 0, shouldUpdate: i.check_for_updates ? 1 : 0 },
                          custom: {
                            [K]: "string" == typeof a.file_url ? a.file_url : void 0,
                            noframes: null == s.noframes ? void 0 : +!!s.noframes,
                            runAt: Kt.qh.test(i.run_at) ? i.run_at : void 0,
                            [A]: H(s.use_excludes),
                            [F]: H(s.use_includes),
                            [L]: H(s.use_matches),
                            [X]: !1 !== s.merge_excludes,
                            [ee]: !1 !== s.merge_includes,
                            [te]: !1 !== s.merge_matches,
                          },
                          position: +o.position || void 0,
                          props: { lastModified: +a.modified, lastUpdated: +a.modified },
                        })
                    }, ".options.json"),
                    await S(async (e, t, n) => {
                      var l, a, o, i
                      const { filename: s } = e,
                        u = w[n],
                        c = {
                          code: t,
                          portId: r,
                          ...(u && {
                            custom: u.custom,
                            config: {
                              enabled: null != (l = u.enabled) ? l : 1,
                              shouldUpdate: null != (a = u.update) ? a : 1,
                              ...u.config,
                            },
                            position: u.position,
                            props: {
                              lastModified:
                                u.lastModified || (null == (o = u.props) ? void 0 : o.lastModified) || +e.lastModDate,
                              lastUpdated:
                                u.lastUpdated || (null == (i = u.props) ? void 0 : i.lastUpdated) || +e.lastModDate,
                            },
                          }),
                        }
                      try {
                        ;(p[n] = (await (0, D.gj)("ParseScript", c)).update.props.uri), $(s)
                      } catch (e) {
                        z(e, s, "script")
                      }
                    }, ".user.js"),
                    n &&
                      (await S(async (e, n, l) => {
                        ;(t[0].text = "Tampermonkey"), (y[p[l]] = n.data)
                      }, ".storage.json"),
                      (0, D.gj)("SetValueStores", y)),
                    s(h) && (delete h.sync, (0, D.gj)("SetOptions", h)),
                    (0, D.gj)("CheckPosition"),
                    await o.close(),
                    $(),
                    x && (l.value = x)
                }
                async function w() {
                  ;(await (0, W.GW)(a)) && ((l.value = ""), u.postMessage(!0), await new d(b))
                }
                function b(e) {
                  u.onMessage.addListener(function t() {
                    u.onMessage.removeListener(t), e()
                  })
                }
                function y(e) {
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
                      ;(await (0, W.GW)((0, D.ag)("buttonImportData"))) && (await f(t))
                    }
                  return () => {
                    const e = V.route.hash === C ? p : m
                    e("dragend", l), e("dragleave", a), e("dragover", o), e("drop", i)
                  }
                }
                return (
                  (0, de.bv)(() => {
                    const e = y(n.value)
                    p("hashchange", e), e()
                  }),
                  (e, s) => (
                    (0, de.wg)(),
                    (0, de.iD)("div", null, [
                      (0, de._)(
                        "button",
                        {
                          textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonImportData")),
                          onClick: v,
                          ref_key: "buttonImport",
                          ref: n,
                          disabled: (0, O.SU)(V).batch,
                        },
                        null,
                        8,
                        Vo
                      ),
                      l.value
                        ? ((0, de.wg)(),
                          (0, de.iD)(
                            "button",
                            {
                              key: 0,
                              textContent: (0, pe.zw)((0, O.SU)(D.ag)("buttonUndo") + l.value),
                              onClick: w,
                              class: "has-error",
                              title: (0, O.SU)(a),
                            },
                            null,
                            8,
                            Fo
                          ))
                        : (0, de.kq)("", !0),
                      (0, de._)("div", Lo, [
                        (0, de.Wm)((0, O.SU)(Ue.Z), { name: "importScriptData", label: (0, O.SU)(o) }, null, 8, [
                          "label",
                        ]),
                        Ao,
                        (0, de.Wm)((0, O.SU)(Ue.Z), { name: "importSettings", label: (0, O.SU)(i) }, null, 8, [
                          "label",
                        ]),
                      ]),
                      (0, de._)("table", qo, [
                        ((0, de.wg)(!0),
                        (0, de.iD)(
                          de.HY,
                          null,
                          (0, de.Ko)(
                            t,
                            ({ type: e, name: t, text: n }, l) => (
                              (0, de.wg)(),
                              (0, de.iD)(
                                "tr",
                                { key: l, "data-type": e },
                                [
                                  t
                                    ? ((0, de.wg)(),
                                      (0, de.iD)("td", { key: 0, textContent: (0, pe.zw)(t) }, null, 8, Ko))
                                    : (0, de.kq)("", !0),
                                  (0, de._)("td", { textContent: (0, pe.zw)(n), colspan: t ? null : 2 }, null, 8, Bo),
                                ],
                                8,
                                No
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
            Go = Jo
          var Xo = z(950),
            Qo = z(4460),
            ei = z(3557)
          const ti = (0, D.ag)("msgDateFormatInfo", c.keys(Qo.q).join(", ")),
            ni = {
              __name: "vm-date-info",
              setup: (e) => (e, t) => (
                (0, de.wg)(),
                (0, de.j4)(
                  (0, O.SU)(Se.Z),
                  { content: (0, O.SU)(ti), placement: "left", style: { "vertical-align": "middle" } },
                  {
                    default: (0, de.w5)(() => [
                      (0, de._)("a", { href: "https://momentjs.com/docs/#/displaying/format/", target: "_blank" }, [
                        (0, de.Wm)((0, O.SU)(ze.Z), { name: "info" }),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["content"]
                )
              ),
            },
            li = { class: "export" },
            ai = { class: "flex flex-wrap center-items mr-1c" },
            oi = ["textContent", "disabled"],
            ii = ["textContent"],
            si = { class: "mt-1" },
            ri = { class: "modal-content" },
            ui = ["download", "href"],
            ci = (0, de._)("br", null, null, -1),
            di = (0, de._)("strong", null, "scripts.zip", -1),
            pi = {
              __name: "vm-export",
              setup(e) {
                let t
                const n = (0, O.iH)(),
                  l = (0, O.iH)(!1),
                  a = (0, O.iH)(b && {}),
                  o = (0, de.Fl)(() => {
                    const e = n.value
                    return e && `${(0, Qo.p)(e.text.trim() || e.defaultValue)}.zip`
                  })
                async function i() {
                  try {
                    ;(l.value = !0), b && !t && (t = await (0, D.gj)("UA")), s(await u())
                  } finally {
                    l.value = !1
                  }
                }
                function s(e) {
                  const n = b && parseFloat(t.browserVersion),
                    l = o.value
                  if (n && ("win" === t.os ? n < 56 : "mac" === t.os ? n < 61 : n < 63)) {
                    const t = new FileReader()
                    ;(t.onload = () => {
                      a.value = { name: l, url: t.result }
                    }),
                      t.readAsDataURL(e)
                  } else (0, ei.l)(e, l)
                }
                function r(e) {
                  return e.replace(/[\\/:*?"<>|]/g, "-")
                }
                async function u() {
                  const e = j.Z.get("exportValues"),
                    t = await (0, D.gj)("ExportZip", { values: e }),
                    n = {},
                    l = { scripts: {}, settings: j.Z.get() }
                  delete l.settings.sync, e && (l.values = {})
                  const a = ((0, _e._M)(t, "items") || []).map(({ script: a, code: o }) => {
                    let i = r((0, D.pV)(a))
                    n[i] ? ((n[i] += 1), (i = `${i}_${n[i]}`)) : (n[i] = 1)
                    const { lastModified: s, lastUpdated: u } = a.props,
                      c = {
                        custom: a.custom,
                        config: a.config,
                        position: a.props.position,
                        lastModified: s,
                        lastUpdated: u,
                      }
                    if (e) {
                      const e = t.values[a.props.id]
                      e && (l.values[a.props.uri] = e)
                    }
                    return (l.scripts[i] = c), { name: `${i}.user.js`, content: o, lastModDate: new Date(u || s) }
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
                  (0, de.wg)(),
                  (0, de.iD)("div", li, [
                    (0, de._)("div", ai, [
                      (0, de._)(
                        "button",
                        { textContent: (0, pe.zw)(e.i18n("buttonExportData")), onClick: i, disabled: l.value },
                        null,
                        8,
                        oi
                      ),
                      (0, de.Wm)(
                        (0, O.SU)(Vn.Z),
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
                      (0, de.Wm)((0, O.SU)(ni)),
                      (0, de._)("span", { hidden: "", textContent: (0, pe.zw)(o.value) }, null, 8, ii),
                    ]),
                    (0, de._)("div", si, [
                      (0, de.Wm)(
                        (0, O.SU)(Ue.Z),
                        { name: "exportValues", label: e.i18n("labelExportScriptData") },
                        null,
                        8,
                        ["label"]
                      ),
                    ]),
                    a.value
                      ? ((0, de.wg)(),
                        (0, de.j4)(
                          (0, O.SU)(Xo.Z),
                          {
                            key: 0,
                            transition: "in-out",
                            show: !!a.value.url,
                            onClose: t[0] || (t[0] = (e) => (a.value = {})),
                          },
                          {
                            default: (0, de.w5)(() => [
                              (0, de._)("div", ri, [
                                (0, de._)(
                                  "a",
                                  { download: a.value.name, href: a.value.url },
                                  [(0, de.Uk)(" Right click and save as"), ci, di],
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
                      : (0, de.kq)("", !0),
                  ])
                )
              },
            },
            mi = pi,
            gi = { class: "mr-1c" },
            vi = ["disabled", "textContent"],
            fi = ["disabled", "title", "textContent"],
            hi = {
              __name: "vm-maintenance",
              setup(e) {
                const t = (0, O.iH)((0, D.ag)("buttonVacuum")),
                  n = (0, D.ag)("buttonResetSettings"),
                  l = (0, O.iH)(""),
                  a = (0, O.iH)(n)
                async function o(e, t) {
                  if (await (0, W.GW)(t, { ok: { className: "has-error" } })) return ue(e)
                }
                function i() {
                  const e = ["lastModified", "lastUpdate", "sync"],
                    t = w(_e.Xw, Yo.ZP, null, (t, n) => !e.includes(t) && !(0, _e.vZ)(n, j.Z.get(t)) && t)
                  return (
                    (l.value = JSON.stringify(t, null, 2)
                      .slice(1, -1)
                      .replace(/^\s{2}/gm, "")),
                    (a.value = `${n} (${c.keys(t).length})`),
                    (0, D.gj)("SetOptions", t)
                  )
                }
                async function s() {
                  await ue(async () => {
                    t.value = (0, D.ag)("buttonVacuuming")
                    const { fixes: e, errors: n } = await (0, D.gj)("Vacuum"),
                      l = null == n ? void 0 : n.join("\n")
                    ;(t.value = (0, D.ag)("buttonVacuumed") + (e ? ` (${e})` : "")),
                      l && (0, W.GW)((0, D.ag)("msgErrorFetchingResource") + "\n\n" + l, { cancel: !1 })
                  })
                }
                return (e, r) => (
                  (0, de.wg)(),
                  (0, de.iD)("div", gi, [
                    (0, de.Wm)(
                      (0, O.SU)(Se.Z),
                      { content: (0, O.SU)(D.ag)("hintVacuum") },
                      {
                        default: (0, de.w5)(() => [
                          (0, de._)(
                            "button",
                            { onClick: s, disabled: (0, O.SU)(V).batch, textContent: (0, pe.zw)(t.value) },
                            null,
                            8,
                            vi
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["content"]
                    ),
                    (0, de._)(
                      "button",
                      {
                        onClick: r[0] || (r[0] = (e) => o(i, (0, O.SU)(n))),
                        disabled: (0, O.SU)(V).batch,
                        title: l.value,
                        textContent: (0, pe.zw)(a.value),
                      },
                      null,
                      8,
                      fi
                    ),
                  ])
                )
              },
            },
            wi = { class: "mb-1c" },
            bi = ["textContent"],
            yi = { key: 0, class: "flex flex-wrap center-items" },
            xi = ["textContent"],
            Ci = ["value"],
            _i = ["textContent", "value"],
            ki = ["textContent", "disabled"],
            Si = ["disabled"],
            Ui = ["textContent"],
            zi = { key: 1, class: "mt-1c" },
            Di = { class: "sync-server-url" },
            $i = ["textContent"],
            Hi = ["disabled"],
            ji = { class: "mr-2c" },
            Wi = ["textContent"],
            Zi = ["disabled"],
            Oi = { class: "inline-block" },
            Mi = ["textContent"],
            Ti = ["disabled"],
            Ii = ["disabled"],
            Ei = ["textContent"],
            Ri = ["textContent", "disabled"],
            Yi = { key: 2 },
            Pi = "sync.current",
            Vi = { current: "" }
          ;(0, Ce.Z)(Pi, (e) => {
            Vi.current = e || ""
          })
          const Fi = {
            components: { SettingCheck: Ue.Z, Icon: ze.Z, Tooltip: Se.Z },
            data: () => ({ syncConfig: Vi, store: V }),
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
          }
          var Li = z(3744)
          const Ai = (0, Li.Z)(Fi, [
            [
              "render",
              (e, t, n, l, a, o) => {
                var i, s
                const r = (0, de.up)("icon"),
                  u = (0, de.up)("tooltip"),
                  c = (0, de.up)("setting-check")
                return (
                  (0, de.wg)(),
                  (0, de.iD)("section", wi, [
                    (0, de._)("h3", { textContent: (0, pe.zw)(e.i18n("labelSync")) }, null, 8, bi),
                    o.state
                      ? ((0, de.wg)(),
                        (0, de.iD)("div", yi, [
                          (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelSyncService")) }, null, 8, xi),
                          (0, de._)(
                            "select",
                            {
                              class: "mx-1",
                              value: a.syncConfig.current,
                              onChange: t[0] || (t[0] = (...e) => o.onSyncChange && o.onSyncChange(...e)),
                            },
                            [
                              ((0, de.wg)(!0),
                              (0, de.iD)(
                                de.HY,
                                null,
                                (0, de.Ko)(
                                  o.syncServices,
                                  (e) => (
                                    (0, de.wg)(),
                                    (0, de.iD)(
                                      "option",
                                      { key: e.name, textContent: (0, pe.zw)(e.displayName), value: e.name },
                                      null,
                                      8,
                                      _i
                                    )
                                  )
                                ),
                                128
                              )),
                            ],
                            40,
                            Ci
                          ),
                          o.service.name && "oauth" === o.state.authType
                            ? ((0, de.wg)(),
                              (0, de.iD)(
                                "button",
                                {
                                  key: 0,
                                  textContent: (0, pe.zw)(o.state.label),
                                  disabled: !o.state.canAuthorize,
                                  onClick: t[1] || (t[1] = (...e) => o.onAuthorize && o.onAuthorize(...e)),
                                },
                                null,
                                8,
                                ki
                              ))
                            : (0, de.kq)("", !0),
                          o.service.name
                            ? ((0, de.wg)(),
                              (0, de.j4)(
                                u,
                                { key: 1, content: e.i18n("labelSync"), class: "stretch-self flex mr-1" },
                                {
                                  default: (0, de.w5)(() => [
                                    (0, de._)(
                                      "button",
                                      {
                                        disabled: !o.state.canSync,
                                        onClick: t[2] || (t[2] = (...e) => o.onSync && o.onSync(...e)),
                                        class: "flex center-items",
                                      },
                                      [(0, de.Wm)(r, { name: "refresh" })],
                                      8,
                                      Si
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["content"]
                              ))
                            : (0, de.kq)("", !0),
                          o.state
                            ? ((0, de.wg)(),
                              (0, de.iD)("p", { key: 2, textContent: (0, pe.zw)(o.state.message) }, null, 8, Ui))
                            : (0, de.kq)("", !0),
                        ]))
                      : (0, de.kq)("", !0),
                    "password" === (null == (i = o.state) ? void 0 : i.authType)
                      ? ((0, de.wg)(),
                        (0, de.iD)("fieldset", zi, [
                          (0, de._)("label", Di, [
                            (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelSyncServerUrl")) }, null, 8, $i),
                            (0, de.wy)(
                              (0, de._)(
                                "input",
                                {
                                  type: "url",
                                  "onUpdate:modelValue": t[3] || (t[3] = (e) => (o.state.userConfig.serverUrl = e)),
                                  disabled: !o.state.canAuthorize,
                                },
                                null,
                                8,
                                Hi
                              ),
                              [[xe.nr, o.state.userConfig.serverUrl]]
                            ),
                          ]),
                          (0, de._)("div", ji, [
                            (0, de._)("label", null, [
                              (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelSyncUsername")) }, null, 8, Wi),
                              (0, de.wy)(
                                (0, de._)(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": t[4] || (t[4] = (e) => (o.state.userConfig.username = e)),
                                    disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                  },
                                  null,
                                  8,
                                  Zi
                                ),
                                [[xe.nr, o.state.userConfig.username]]
                              ),
                            ]),
                            (0, de._)("label", Oi, [
                              (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelSyncPassword")) }, null, 8, Mi),
                              (0, de.wy)(
                                (0, de._)(
                                  "input",
                                  {
                                    type: "password",
                                    "onUpdate:modelValue": t[5] || (t[5] = (e) => (o.state.userConfig.password = e)),
                                    disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                  },
                                  null,
                                  8,
                                  Ti
                                ),
                                [[xe.nr, o.state.userConfig.password]]
                              ),
                            ]),
                            (0, de._)("label", null, [
                              (0, de.wy)(
                                (0, de._)(
                                  "input",
                                  {
                                    type: "checkbox",
                                    "onUpdate:modelValue": t[6] || (t[6] = (e) => (o.state.userConfig.anonymous = e)),
                                    disabled: !o.state.canAuthorize,
                                  },
                                  null,
                                  8,
                                  Ii
                                ),
                                [[xe.e8, o.state.userConfig.anonymous]]
                              ),
                              (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelSyncAnonymous")) }, null, 8, Ei),
                            ]),
                          ]),
                          (0, de._)("div", null, [
                            (0, de._)(
                              "button",
                              {
                                textContent: (0, pe.zw)(e.i18n("buttonSave")),
                                onClick:
                                  t[7] ||
                                  (t[7] = (0, xe.iM)(
                                    (...e) => o.onSaveUserConfig && o.onSaveUserConfig(...e),
                                    ["prevent"]
                                  )),
                                disabled: !o.state.canAuthorize,
                              },
                              null,
                              8,
                              Ri
                            ),
                          ]),
                        ]))
                      : (0, de.kq)("", !0),
                    null != (s = o.service) && s.name
                      ? ((0, de.wg)(),
                        (0, de.iD)("div", Yi, [
                          (0, de.Wm)(c, { name: "syncScriptStatus", label: e.i18n("labelSyncScriptStatus") }, null, 8, [
                            "label",
                          ]),
                        ]))
                      : (0, de.kq)("", !0),
                  ])
                )
              },
            ],
          ])
          var qi = z(8900)
          const Ni = ["textContent"],
            Ki = { class: "mb-1 mr-1c flex center-items" },
            Bi = ["textContent"],
            Ji = ["disabled", "title"],
            Gi = ["textContent"],
            Xi = ["textContent"],
            Qi = ["textContent"],
            es = ["textContent"],
            ts = ["innerHTML"],
            ns = { class: "btn-ghost", style: { border: "none" } },
            ls = ["textContent"],
            as = ["innerHTML"],
            os = ["innerHTML"],
            is = ["textContent"],
            ss = "editorTheme",
            rs = "editorThemeName",
            us = [
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
            ds = "master",
            ps = "theme",
            ms = `https://github.com/${cs}/tree/${ds}/${ps}`,
            gs = "default",
            vs = {
              __name: "vm-editor",
              setup(e) {
                const t = (0, O.iH)(),
                  n = (0, O.iH)(),
                  l = (0, O.iH)(!1),
                  a = (0, O.iH)(),
                  o = (0, O.iH)(),
                  s = (0, O.iH)(),
                  r = (0, O.iH)(),
                  u = (0, O.iH)()
                async function p(e, t = "text") {
                  const n = (0, W.vY)()
                  o.value = !0
                  try {
                    const n = await (await fetch(e))[t]()
                    return (s.value = null), n
                  } catch (e) {
                    s.value = e.message || e.code || `${e}`
                  } finally {
                    ;(o.value = !1), await (0, de.Y3)(), null == n || n.focus()
                  }
                }
                async function m(e) {
                  let l
                  if (e) {
                    const e = ["mode", "value", "configureMouse", "lineNumberFormatter", "specialCharPlaceholder"],
                      t = {}
                    c
                      .entries({
                        ...(await d.resolve().then(z.t.bind(z, 4631, 23))).default.defaults,
                        ...qi.Z,
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
                      (await (0, de.Y3)(),
                      t.value.getBoundingClientRect().bottom > innerHeight &&
                        t.value.scrollIntoView({ behavior: "smooth" }))
                }
                return (
                  (0, de.bv)(async () => {
                    let e
                    await j.Z.ready,
                      (0, de.YP)(l, m),
                      (0, de.YP)(u, async (t) => {
                        if (e) return void (e = !1)
                        const n = t && t !== gs && `https://raw.githubusercontent.com/${cs}/${ds}/${ps}/${t}.css`,
                          l = n && (await p(n))
                        j.Z.set(rs, !n || l ? t : gs), j.Z.set(ss, l || "")
                      }),
                      (0, Ce.Z)(rs, (t) => {
                        var n
                        u.value != (null != (n = t) ? n : (t = gs)) && ((e = !0), (u.value = t))
                      }),
                      (0, Ce.Z)(ss, (e) => {
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
                    (0, de.wg)(),
                    (0, de.iD)(
                      "section",
                      { ref_key: "$el", ref: t },
                      [
                        (0, de._)("h3", { textContent: (0, pe.zw)(e.i18n("labelEditor")) }, null, 8, Ni),
                        (0, de._)("div", Ki, [
                          (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelTheme")) }, null, 8, Bi),
                          (0, de.wy)(
                            (0, de._)(
                              "select",
                              {
                                "onUpdate:modelValue": i[0] || (i[0] = (e) => (u.value = e)),
                                disabled: o.value,
                                title: r.value,
                              },
                              [
                                (0, de._)(
                                  "option",
                                  { value: gs, textContent: (0, pe.zw)(e.i18n("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Gi
                                ),
                                (0, de._)(
                                  "option",
                                  { value: "", textContent: (0, pe.zw)(e.i18n("labelBadgeNone")) },
                                  null,
                                  8,
                                  Xi
                                ),
                                ((0, de.wg)(!0),
                                (0, de.iD)(
                                  de.HY,
                                  null,
                                  (0, de.Ko)(
                                    (0, O.SU)(us),
                                    (e) => (
                                      (0, de.wg)(),
                                      (0, de.iD)("option", { key: e, textContent: (0, pe.zw)(e) }, null, 8, Qi)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              Ji
                            ),
                            [[xe.bM, u.value]]
                          ),
                          (0, de._)("a", { href: ms, target: "_blank" }, "\u2197"),
                          (0, de._)("p", { textContent: (0, pe.zw)(s.value) }, null, 8, es),
                        ]),
                        (0, de._)("p", { class: "my-1", innerHTML: e.i18n("descEditorOptions") }, null, 8, ts),
                        (0, de.Wm)(
                          (0, O.SU)(Vn.Z),
                          { name: "editor", json: "", "has-reset": "", onDblclick: (0, O.SU)(ce) },
                          {
                            default: (0, de.w5)(() => [
                              (0, de._)(
                                "a",
                                { class: "ml-1", tabindex: "0", onClick: i[1] || (i[1] = (e) => (a.value = !a.value)) },
                                [(0, de.Wm)((0, O.SU)(ze.Z), { name: "info" })]
                              ),
                              (0, de._)("label", ns, [
                                (0, de.wy)(
                                  (0, de._)(
                                    "input",
                                    { type: "checkbox", "onUpdate:modelValue": i[2] || (i[2] = (e) => (l.value = e)) },
                                    null,
                                    512
                                  ),
                                  [[xe.e8, l.value]]
                                ),
                                (0, de._)(
                                  "span",
                                  { textContent: (0, pe.zw)(e.i18n("buttonShowEditorState")) },
                                  null,
                                  8,
                                  ls
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["onDblclick"]
                        ),
                        a.value
                          ? ((0, de.wg)(),
                            (0, de.iD)(
                              de.HY,
                              { key: 0 },
                              [
                                (0, de._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsGeneric") },
                                  null,
                                  8,
                                  as
                                ),
                                (0, de._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsVM") },
                                  null,
                                  8,
                                  os
                                ),
                              ],
                              64
                            ))
                          : (0, de.kq)("", !0),
                        (0, de._)(
                          "pre",
                          { textContent: (0, pe.zw)(n.value), class: "monospace-font dim-hint" },
                          null,
                          8,
                          is
                        ),
                      ],
                      512
                    )
                  )
                )
              },
            },
            fs = ["textContent"],
            hs = { class: "flex flex-wrap" },
            ws = { key: 0, class: "text-red" },
            bs = ["textContent"],
            ys = {
              __name: "vm-blacklist-body",
              props: { name: String, desc: String },
              setup(e) {
                const t = (0, O.iH)(),
                  n = e
                return (
                  (0, de.bv)(async () => {
                    t.value = await (0, D.gj)("Storage", ["base", "getOne", n.name + Kt.Sg])
                  }),
                  (e, l) => (
                    (0, de.wg)(),
                    (0, de.iD)(
                      de.HY,
                      null,
                      [
                        (0, de._)("p", { textContent: (0, pe.zw)(n.desc), class: "mt-1" }, null, 8, fs),
                        (0, de._)("div", hs, [
                          (0, de.Wm)(
                            (0, O.SU)(Vn.Z),
                            { name: n.name, class: "flex-1", onBgError: l[0] || (l[0] = (e) => (t.value = e)) },
                            null,
                            8,
                            ["name"]
                          ),
                          t.value
                            ? ((0, de.wg)(),
                              (0, de.iD)("ol", ws, [
                                ((0, de.wg)(!0),
                                (0, de.iD)(
                                  de.HY,
                                  null,
                                  (0, de.Ko)(
                                    t.value,
                                    (e) => (
                                      (0, de.wg)(),
                                      (0, de.iD)("li", { key: e, textContent: (0, pe.zw)(e) }, null, 8, bs)
                                    )
                                  ),
                                  128
                                )),
                              ]))
                            : (0, de.kq)("", !0),
                        ]),
                      ],
                      64
                    )
                  )
                )
              },
            },
            xs = ["textContent"],
            Cs = ["textContent"],
            _s = {
              __name: "vm-blacklist",
              setup: (e) => (e, t) => (
                (0, de.wg)(),
                (0, de.iD)("section", null, [
                  (0, de._)("h3", { textContent: (0, pe.zw)(e.i18n("labelBlacklist")) }, null, 8, xs),
                  (0, de._)("p", null, [
                    (0, de._)(
                      "a",
                      {
                        href: "https://violentmonkey.github.io/posts/smart-rules-for-blacklist/#blacklist-patterns",
                        textContent: (0, pe.zw)(e.i18n("learnBlacklist")),
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                      null,
                      8,
                      Cs
                    ),
                  ]),
                  (0, de.Wm)((0, O.SU)(ys), { name: (0, O.SU)(Kt.hl), desc: e.i18n("descBlacklist") }, null, 8, [
                    "name",
                    "desc",
                  ]),
                  (0, de.Wm)((0, O.SU)(ys), { name: (0, O.SU)(Kt.g4), desc: e.i18n("descBlacklistNet") }, null, 8, [
                    "name",
                    "desc",
                  ]),
                ])
              ),
            },
            ks = { badgeColor: (0, D.ag)("titleBadgeColor"), badgeColorBlocked: (0, D.ag)("titleBadgeColorBlocked") },
            Ss = c.keys(ks),
            Us = { enum: ks, normalize: (e, t) => (/^#[0-9a-f]{6}$/i.test(e) ? e : Yo.ZP[t]) },
            zs = {
              autoUpdate: { normalize: (e) => Math.max(0, Math.min(365, +e || 0)) },
              defaultInjectInto: { enum: Kt.Wg },
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
              ...w(_e.Xw, ks, () => Us),
            },
            Ds = (e, t) => (h(zs[t].enum, e) ? e : c.keys(zs[t].enum)[0]),
            $s = (e, t) =>
              (0, D.Ds)((n, l) => {
                ;(n = t(n, e)) !== (l = t(l, e)) && j.Z.set(e, n)
              }, 50),
            Hs = (0, O.qj)({}),
            js = {
              components: {
                VmImport: Go,
                VmExport: mi,
                VmMaintenance: hi,
                VmSync: Ai,
                VmEditor: vs,
                VmBlacklist: _s,
                VmDateInfo: ni,
                SettingCheck: Ue.Z,
                SettingText: Vn.Z,
                LocaleGroup: De.Z,
                Tooltip: Se.Z,
              },
              data: () => ({ expose: null, items: zs, settings: Hs }),
              computed: {
                editorWindowHint() {
                  var e
                  return null != (e = g.windows) && e.onBoundsChanged ? null : this.i18n("optionEditorWindowHint")
                },
                isCustomBadgeColor: () => Ss.some((e) => Hs[e] !== Yo.ZP[e]),
              },
              methods: {
                ctrlS() {
                  ;(0, W.vY)().dispatchEvent(new Event("ctrl-s"))
                },
                onResetBadgeColors() {
                  Ss.forEach((e) => {
                    Hs[e] = Yo.ZP[e]
                  })
                },
              },
              activated() {
                ;(0, W.wO)(this.$el),
                  (this.revokers = [ye.$J.register("ctrlcmd-s", this.ctrlS, { condition: "inputFocus" })]),
                  w(_e.LI, zs, ([e, { normalize: t = Ds }]) => {
                    this.revokers.push(
                      (0, Ce.Z)(e, (n) => {
                        Hs[e] = t(n, e)
                      })
                    ),
                      this.$watch(() => Hs[e], $s(e, t))
                  }),
                  (this.expose = c.keys(j.Z.get(n)).map((e) => [e, decodeURIComponent(e)]))
              },
              deactivated() {
                this.revokers.forEach((e) => {
                  e()
                })
              },
            },
            Ws = (0, Li.Z)(js, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var i
                  const s = (0, de.up)("setting-check"),
                    r = (0, de.up)("tooltip"),
                    u = (0, de.up)("locale-group"),
                    c = (0, de.up)("vm-import"),
                    d = (0, de.up)("vm-export"),
                    p = (0, de.up)("vm-maintenance"),
                    m = (0, de.up)("vm-sync"),
                    g = (0, de.up)("vm-editor"),
                    v = (0, de.up)("vm-date-info"),
                    f = (0, de.up)("setting-text"),
                    h = (0, de.up)("vm-blacklist")
                  return (
                    (0, de.wg)(),
                    (0, de.iD)(
                      "div",
                      { class: "tab-settings", "data-show-advanced": a.settings.showAdvanced },
                      [
                        (0, de._)("h1", { textContent: (0, pe.zw)(e.i18n("labelSettings")) }, null, 8, Ja),
                        (0, de._)("section", Ga, [
                          (0, de._)("h3", { textContent: (0, pe.zw)(e.i18n("optionPopup")) }, null, 8, Xa),
                          (0, de._)("div", null, [
                            (0, de.Wm)(s, { name: "autoReload", label: e.i18n("labelAutoReloadCurrentTab") }, null, 8, [
                              "label",
                            ]),
                          ]),
                          (0, de._)("div", Qa, [
                            (0, de.Wm)(
                              s,
                              { name: "editorWindow", class: "mr-2", ref: "EW" },
                              {
                                default: (0, de.w5)(() => [
                                  (0, de.Wm)(
                                    r,
                                    { content: o.editorWindowHint, disabled: !o.editorWindowHint },
                                    {
                                      default: (0, de.w5)(() => [
                                        (0, de._)(
                                          "span",
                                          { textContent: (0, pe.zw)(e.i18n("optionEditorWindow")) },
                                          null,
                                          8,
                                          eo
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
                            (0, de.wy)(
                              (0, de.Wm)(
                                s,
                                { name: "editorWindowSimple", label: e.i18n("optionEditorWindowSimple") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[xe.F8, null == (i = e.$refs.EW) ? void 0 : i.value]]
                            ),
                          ]),
                          (0, de._)("div", to, [
                            (0, de._)("label", null, [
                              (0, de.Wm)(
                                u,
                                { "i18n-key": "labelPopupSort" },
                                {
                                  default: (0, de.w5)(() => [
                                    ((0, de.wg)(),
                                    (0, de.iD)(
                                      de.HY,
                                      null,
                                      (0, de.Ko)(["filtersPopup.sort"], (e) =>
                                        (0, de.wy)(
                                          (0, de._)(
                                            "select",
                                            { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                            [
                                              ((0, de.wg)(!0),
                                              (0, de.iD)(
                                                de.HY,
                                                null,
                                                (0, de.Ko)(
                                                  a.items[e].enum,
                                                  (t, n) => (
                                                    (0, de.wg)(),
                                                    (0, de.iD)(
                                                      "option",
                                                      { key: `${e}:${n}`, value: n, textContent: (0, pe.zw)(t) },
                                                      null,
                                                      8,
                                                      lo
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                            ],
                                            8,
                                            no
                                          ),
                                          [[xe.bM, a.settings[e]]]
                                        )
                                      ),
                                      64
                                    )),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, de.wy)(
                              (0, de.Wm)(
                                s,
                                { name: "filtersPopup.groupRunAt", label: e.i18n("optionPopupGroupRunAt") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[xe.F8, "exec" === a.settings["filtersPopup.sort"]]]
                            ),
                            (0, de._)("label", null, [
                              ((0, de.wg)(),
                              (0, de.iD)(
                                de.HY,
                                null,
                                (0, de.Ko)(["filtersPopup.hideDisabled"], (e) =>
                                  (0, de.wy)(
                                    (0, de._)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, de.wg)(!0),
                                        (0, de.iD)(
                                          de.HY,
                                          null,
                                          (0, de.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, de.wg)(),
                                              (0, de.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, pe.zw)(t) },
                                                null,
                                                8,
                                                oo
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ],
                                      8,
                                      ao
                                    ),
                                    [[xe.bM, a.settings[e]]]
                                  )
                                ),
                                64
                              )),
                            ]),
                            (0, de.wy)(
                              (0, de.Wm)(
                                s,
                                { name: "filtersPopup.enabledFirst", label: e.i18n("optionPopupEnabledFirst") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[xe.F8, !a.settings["filtersPopup.hideDisabled"]]]
                            ),
                          ]),
                          (0, de._)("div", null, [
                            (0, de._)("label", null, [
                              (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelBadge")) }, null, 8, io),
                              ((0, de.wg)(),
                              (0, de.iD)(
                                de.HY,
                                null,
                                (0, de.Ko)(["showBadge"], (e) =>
                                  (0, de.wy)(
                                    (0, de._)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, de.wg)(!0),
                                        (0, de.iD)(
                                          de.HY,
                                          null,
                                          (0, de.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, de.wg)(),
                                              (0, de.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, pe.zw)(t) },
                                                null,
                                                8,
                                                ro
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ],
                                      8,
                                      so
                                    ),
                                    [[xe.bM, a.settings[e]]]
                                  )
                                ),
                                64
                              )),
                            ]),
                          ]),
                          (0, de._)("div", null, [
                            (0, de._)("label", null, [
                              (0, de._)("span", { textContent: (0, pe.zw)(e.i18n("labelBadgeColors")) }, null, 8, uo),
                              ((0, de.wg)(!0),
                              (0, de.iD)(
                                de.HY,
                                null,
                                (0, de.Ko)(
                                  a.items.badgeColor.enum,
                                  (e, t) => (
                                    (0, de.wg)(),
                                    (0, de.j4)(
                                      r,
                                      { key: `bc:${t}`, content: e },
                                      {
                                        default: (0, de.w5)(() => [
                                          (0, de.wy)(
                                            (0, de._)(
                                              "input",
                                              { type: "color", "onUpdate:modelValue": (e) => (a.settings[t] = e) },
                                              null,
                                              8,
                                              co
                                            ),
                                            [[xe.nr, a.settings[t]]]
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
                              (0, de.wy)(
                                (0, de._)(
                                  "button",
                                  {
                                    textContent: (0, pe.zw)(e.i18n("buttonReset")),
                                    class: "ml-1",
                                    onClick:
                                      t[0] || (t[0] = (...e) => o.onResetBadgeColors && o.onResetBadgeColors(...e)),
                                  },
                                  null,
                                  8,
                                  po
                                ),
                                [[xe.F8, o.isCustomBadgeColor]]
                              ),
                            ]),
                          ]),
                        ]),
                        (0, de._)("section", mo, [
                          (0, de._)("h3", { textContent: (0, pe.zw)(e.i18n("optionUpdate")) }, null, 8, go),
                          (0, de._)("div", vo, [
                            (0, de._)("label", null, [
                              (0, de.Wm)(
                                u,
                                { "i18n-key": "labelAutoUpdate" },
                                {
                                  default: (0, de.w5)(() => [
                                    (0, de.wy)(
                                      (0, de._)(
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
                                      [[xe.nr, a.settings.autoUpdate]]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, de.Wm)(
                              s,
                              { name: "updateEnabledScriptsOnly", label: e.i18n("labelEnabledScriptsOnly") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                          (0, de._)("div", fo, [
                            (0, de.Wm)(s, { name: "notifyUpdates", label: e.i18n("labelNotifyUpdates") }, null, 8, [
                              "label",
                            ]),
                            (0, de.Wm)(
                              s,
                              { name: "notifyUpdatesGlobal", label: e.i18n("labelNotifyUpdatesGlobal"), class: "ml-2" },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                        ]),
                        (0, de._)("section", ho, [
                          (0, de._)("h3", { textContent: (0, pe.zw)(e.i18n("labelBackupMaintenance")) }, null, 8, wo),
                          (0, de.Wm)(c),
                          (0, de.Wm)(d),
                          bo,
                          (0, de.Wm)(p),
                        ]),
                        (0, de.Wm)(m),
                        ((0, de.wg)(!0),
                        (0, de.iD)(
                          de.HY,
                          null,
                          (0, de.Ko)(
                            { showAdvanced: a.settings },
                            (t, n) => (
                              (0, de.wg)(),
                              (0, de.iD)(
                                "details",
                                { key: n, open: t[n] },
                                [
                                  (0, de._)(
                                    "summary",
                                    { onClick: (0, xe.iM)((e) => (t[n] = !t[n]), ["prevent"]) },
                                    [
                                      ((0, de.wg)(),
                                      (0, de.j4)(
                                        (0, de.LL)(t[n] ? "h1" : "h3"),
                                        { textContent: (0, pe.zw)(e.i18n("labelAdvanced")), class: "inline-block" },
                                        null,
                                        8,
                                        ["textContent"]
                                      )),
                                    ],
                                    8,
                                    xo
                                  ),
                                  (0, de._)("section", Co, [
                                    (0, de._)("h3", { textContent: (0, pe.zw)(e.i18n("labelGeneral")) }, null, 8, _o),
                                    (0, de._)("div", null, [
                                      (0, de._)("label", null, [
                                        (0, de.Wm)(
                                          u,
                                          { "i18n-key": "optionUiTheme" },
                                          {
                                            default: (0, de.w5)(() => [
                                              ((0, de.wg)(),
                                              (0, de.iD)(
                                                de.HY,
                                                null,
                                                (0, de.Ko)(["uiTheme"], (e) =>
                                                  (0, de.wy)(
                                                    (0, de._)(
                                                      "select",
                                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                      [
                                                        ((0, de.wg)(!0),
                                                        (0, de.iD)(
                                                          de.HY,
                                                          null,
                                                          (0, de.Ko)(
                                                            a.items[e].enum,
                                                            (e, t) => (
                                                              (0, de.wg)(),
                                                              (0, de.iD)(
                                                                "option",
                                                                { key: t, value: t, textContent: (0, pe.zw)(e) },
                                                                null,
                                                                8,
                                                                So
                                                              )
                                                            )
                                                          ),
                                                          128
                                                        )),
                                                      ],
                                                      8,
                                                      ko
                                                    ),
                                                    [[xe.bM, a.settings[e]]]
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
                                    (0, de._)("div", Uo, [
                                      (0, de._)("label", null, [
                                        (0, de._)(
                                          "span",
                                          { textContent: (0, pe.zw)(e.i18n("labelInjectionMode")) },
                                          null,
                                          8,
                                          zo
                                        ),
                                        ((0, de.wg)(),
                                        (0, de.iD)(
                                          de.HY,
                                          null,
                                          (0, de.Ko)(["defaultInjectInto"], (e) =>
                                            (0, de.wy)(
                                              (0, de._)(
                                                "select",
                                                { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                [
                                                  ((0, de.wg)(!0),
                                                  (0, de.iD)(
                                                    de.HY,
                                                    null,
                                                    (0, de.Ko)(
                                                      a.items[e].enum,
                                                      (e, t) => (
                                                        (0, de.wg)(),
                                                        (0, de.iD)(
                                                          "option",
                                                          { key: t, textContent: (0, pe.zw)(t) },
                                                          null,
                                                          8,
                                                          $o
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                ],
                                                8,
                                                Do
                                              ),
                                              [[xe.bM, a.settings[e]]]
                                            )
                                          ),
                                          64
                                        )),
                                        (0, de._)(
                                          "a",
                                          {
                                            class: "ml-1",
                                            href: "https://violentmonkey.github.io/posts/inject-into-context/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            textContent: (0, pe.zw)(e.i18n("learnInjectionMode")),
                                          },
                                          null,
                                          8,
                                          Ho
                                        ),
                                      ]),
                                      (0, de.Wm)(
                                        r,
                                        { content: e.i18n("labelXhrInjectHint") },
                                        {
                                          default: (0, de.w5)(() => [
                                            (0, de.Wm)(
                                              s,
                                              { name: "xhrInject" },
                                              {
                                                default: (0, de.w5)(() => [
                                                  (0, de.Wm)(
                                                    u,
                                                    { "i18n-key": "labelXhrInject" },
                                                    { default: (0, de.w5)(() => [jo]), _: 1 }
                                                  ),
                                                  (0, de.Uk)(),
                                                  (0, de._)(
                                                    "ruby",
                                                    { textContent: (0, pe.zw)(e.i18n("labelXhrInjectNote")) },
                                                    null,
                                                    8,
                                                    Wo
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
                                        ? (0, de.kq)("", !0)
                                        : ((0, de.wg)(),
                                          (0, de.iD)("label", Zo, [
                                            (0, de.Wm)(s, { name: "ffInject" }),
                                            (0, de.Wm)(
                                              r,
                                              { content: e.i18n("labelFastFirefoxInjectHint") },
                                              {
                                                default: (0, de.w5)(() => [
                                                  (0, de.Wm)(
                                                    u,
                                                    { "i18n-key": "labelFastFirefoxInject" },
                                                    { default: (0, de.w5)(() => [Oo]), _: 1 }
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["content"]
                                            ),
                                          ])),
                                    ]),
                                    (0, de._)("div", null, [
                                      (0, de.Wm)(
                                        u,
                                        { "i18n-key": "labelExposeStatus", class: "flex flex-col" },
                                        {
                                          default: (0, de.w5)(() => [
                                            ((0, de.wg)(!0),
                                            (0, de.iD)(
                                              de.HY,
                                              null,
                                              (0, de.Ko)(
                                                a.expose,
                                                ([e, t]) => (
                                                  (0, de.wg)(),
                                                  (0, de.j4)(
                                                    s,
                                                    { key: t, name: `expose.${e}`, class: "ml-2 mr-1c valign-tb" },
                                                    {
                                                      default: (0, de.w5)(() => [
                                                        (0, de._)("span", { textContent: (0, pe.zw)(t) }, null, 8, Mo),
                                                        (0, de._)(
                                                          "a",
                                                          {
                                                            href: `https://${t}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                          },
                                                          "\u2197",
                                                          8,
                                                          To
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
                                    (0, de.Wm)(
                                      s,
                                      { name: "helpForLocalFile", label: e.i18n("helpForLocalFile") },
                                      null,
                                      8,
                                      ["label"]
                                    ),
                                  ]),
                                  (0, de.Wm)(g),
                                  (0, de._)("section", null, [
                                    (0, de._)(
                                      "h3",
                                      { textContent: (0, pe.zw)(e.i18n("labelScriptTemplate")) },
                                      null,
                                      8,
                                      Io
                                    ),
                                    (0, de._)("p", null, [
                                      ((0, de.wg)(!0),
                                      (0, de.iD)(
                                        de.HY,
                                        null,
                                        (0, de.Ko)(
                                          e.i18n("descScriptTemplate").split(/<(\S+?)>/),
                                          (e, t) => (
                                            (0, de.wg)(),
                                            (0, de.j4)(
                                              (0, de.LL)(t % 2 ? "code" : "span"),
                                              { textContent: (0, pe.zw)(e), key: t },
                                              null,
                                              8,
                                              ["textContent"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                      (0, de.Uk)(),
                                      (0, de.Wm)(v),
                                    ]),
                                    (0, de.Wm)(f, { name: "scriptTemplate", "has-reset": "" }),
                                  ]),
                                  (0, de.Wm)(h),
                                  (0, de._)("section", null, [
                                    (0, de._)("h3", { textContent: (0, pe.zw)(e.i18n("labelCustomCSS")) }, null, 8, Eo),
                                    (0, de._)("p", { innerHTML: e.i18n("descCustomCSS") }, null, 8, Ro),
                                    (0, de.Wm)(f, { name: "customCSS" }),
                                  ]),
                                ],
                                8,
                                yo
                              )
                            )
                          ),
                          128
                        )),
                      ],
                      8,
                      Ba
                    )
                  )
                },
              ],
            ]),
            Zs = { class: "tab-about mb-2c" },
            Os = { class: "mt-0 mr-1c" },
            Ms = ["textContent"],
            Ts = ["textContent"],
            Is = ["textContent"],
            Es = ["textContent"],
            Rs = ["textContent"],
            Ys = ["textContent"],
            Ps = ["textContent"],
            Vs = ["textContent"],
            Fs = ["textContent"],
            Ls = ["textContent"],
            As = ["textContent"],
            qs = {
              __name: "tab-about",
              setup(e) {
                const t = x.name,
                  n = browser.i18n.getUILanguage()
                return (e, l) => (
                  (0, de.wg)(),
                  (0, de.iD)("div", Zs, [
                    (0, de._)("h1", Os, [
                      (0, de._)("span", { textContent: (0, pe.zw)((0, O.SU)(t)) }, null, 8, Ms),
                      (0, de._)("small", { textContent: (0, pe.zw)(`v${(0, O.SU)("2.21.0")}`) }, null, 8, Ts),
                    ]),
                    (0, de._)("p", { textContent: (0, pe.zw)(e.i18n("extDescription")) }, null, 8, Is),
                    (0, de._)("div", null, [
                      (0, de._)("label", { textContent: (0, pe.zw)(e.i18n("labelRelated")) }, null, 8, Es),
                      (0, de._)("ul", null, [
                        (0, de._)("li", null, [
                          (0, de._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, pe.zw)(e.i18n("labelHomepage")),
                            },
                            null,
                            8,
                            Rs
                          ),
                        ]),
                        (0, de._)("li", null, [
                          (0, de._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/issues",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, pe.zw)(e.i18n("labelFeedback")),
                            },
                            null,
                            8,
                            Ys
                          ),
                        ]),
                        (0, de._)("li", null, [
                          (0, de._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/graphs/contributors",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, pe.zw)(e.i18n("labelContributors")),
                            },
                            null,
                            8,
                            Ps
                          ),
                        ]),
                        (0, de._)("li", null, [
                          (0, de._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io/privacy/",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, pe.zw)(e.i18n("labelPrivacyPolicy")),
                            },
                            null,
                            8,
                            Vs
                          ),
                        ]),
                      ]),
                    ]),
                    (0, de._)("div", null, [
                      (0, de._)("label", { textContent: (0, pe.zw)(e.i18n("labelCurrentLang")) }, null, 8, Fs),
                      (0, de._)("span", { class: "current", textContent: (0, pe.zw)((0, O.SU)(n)) }, null, 8, Ls),
                      (0, de.Uk)(" | "),
                      (0, de._)(
                        "a",
                        {
                          href: "https://violentmonkey.github.io/localization/",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          textContent: (0, pe.zw)(e.i18n("labelHelpTranslate")),
                        },
                        null,
                        8,
                        As
                      ),
                    ]),
                  ])
                )
              },
            },
            Ns = [
              { name: o, comp: Ka, label: (0, D.ag)("sideMenuInstalled") },
              { name: C, comp: Ws, label: (0, D.ag)("sideMenuSettings") },
              { name: _, comp: qs, label: (0, D.ag)("sideMenuAbout") },
              { name: k, comp: Ka, label: (0, D.ag)("buttonRecycleBin") },
            ],
            Ks = (0, D.ag)("extName"),
            Bs = "!editScript",
            Js = (0, de.Fl)(() => {
              const e = V.route.paths[0]
              return Ns.find((t) => t.name === e) || Ns[0]
            }),
            Gs = (0, de.Fl)(() => ({ [o]: V.scripts.length, [k]: V.removedScripts.length }))
          function Xs() {
            const e = Js.value.name === o,
              { paths: t } = V.route
            ye.$J.setContext("editScript", e && t[1]),
              ye.$J.setContext("tabScripts", e && !t[1]),
              ye.$J.setContext("showRecycle", Js.value.name === k)
          }
          function Qs(e) {
            const n = Ns.indexOf(Js.value),
              l = Ns[(n + e + Ns.length) % Ns.length]
            t.location.hash = (null == l ? void 0 : l.name) || ""
          }
          p(
            "dragover",
            (e) => {
              var t
              V.route.hash !== C &&
                /^application\/(zip|x-zip-compressed)$/.test(null == (t = e.dataTransfer.items[0]) ? void 0 : t.type) &&
                (location.hash = `#${C}`)
            },
            !0
          )
          const er = {
              setup() {
                const [e, t] = V.route.paths,
                  n = (0, O.iH)(e !== o || ("_new" !== t && !Number(t)))
                return (
                  (0, de.m0)(() => {
                    const { title: e } = V
                    document.title = e ? `${e} - ${Ks}` : Ks
                  }),
                  (0, de.YP)(
                    () => V.route.paths,
                    () => {
                      ;(n.value = !0), Xs()
                    }
                  ),
                  (0, de.bv)(() => {
                    const e = [
                      ye.$J.register("a-pageup", () => Qs(-1), { condition: Bs }),
                      ye.$J.register("a-pagedown", () => Qs(1), { condition: Bs }),
                    ]
                    return (
                      ye.$J.enable(),
                      Xs(),
                      () => {
                        e.forEach((e) => {
                          e()
                        }),
                          ye.$J.disable()
                      }
                    )
                  }),
                  { tabs: Ns, current: Js, numbers: Gs, canRenderAside: n }
                )
              },
            },
            tr = (0, Li.Z)(er, [
              [
                "render",
                (e, t, n, l, a, o) => (
                  (0, de.wg)(),
                  (0, de.iD)("div", me, [
                    l.canRenderAside
                      ? ((0, de.wg)(),
                        (0, de.iD)("aside", ge, [
                          (0, de._)("div", ve, [
                            fe,
                            (0, de._)(
                              "h1",
                              { class: "hidden-sm", textContent: (0, pe.zw)(e.i18n("extName")) },
                              null,
                              8,
                              he
                            ),
                            we,
                            ((0, de.wg)(!0),
                            (0, de.iD)(
                              de.HY,
                              null,
                              (0, de.Ko)(
                                l.tabs,
                                (e) => (
                                  (0, de.wg)(),
                                  (0, de.iD)("div", { class: "aside-menu-item", key: e.name }, [
                                    (0, de._)(
                                      "a",
                                      {
                                        href: `#${e.name}`,
                                        class: (0, pe.C_)({ active: e === l.current }),
                                        "data-num-scripts": l.numbers[e.name],
                                        textContent: (0, pe.zw)(e.label),
                                      },
                                      null,
                                      10,
                                      be
                                    ),
                                  ])
                                )
                              ),
                              128
                            )),
                          ]),
                        ]))
                      : (0, de.kq)("", !0),
                    ((0, de.wg)(),
                    (0, de.j4)(
                      de.Ob,
                      null,
                      [((0, de.wg)(), (0, de.j4)((0, de.LL)(l.current.comp), { class: "tab" }))],
                      1024
                    )),
                  ])
                ),
              ],
            ]),
            nr = [
              (0, D.ag)("editNavCode"),
              (0, D.ag)("editNavSettings"),
              (0, D.ag)("editNavValues"),
              "@require",
              "@resource",
            ]
          let lr
          function ar(e, t, n) {
            const l = e.$cache || (e.$cache = {}),
              a = e.meta || {},
              { custom: o } = e,
              i = (0, D.iQ)(a, G),
              s = w(D.Hv, [a[G], i, a[N], (0, D.iQ)(a, N), o[G], o[N]], "\n"),
              r = o[G] || i
            let u = 0,
              c = ""
            t.forEach((e, t) => {
              ;(u += e), e && (c += `${nr[t]}: ${(0, D.aj)(e)}\n`)
            }),
              (l.desc = s),
              (l.name = r),
              (l.lowerName = r.toLocaleLowerCase()),
              (l.tags = o.tags || ""),
              (l.size = (0, D.aj)(u, !0).replace(" ", "")),
              (l.sizes = c.slice(0, -1).replace(/\x20/g, "\xa0").replace(/[^B]$/gm, "$&B")),
              (l.sizeNum = u),
              (l[ne] = t[2]),
              n && (l.code = n),
              (e.$canUpdate = (0, D.TZ)(e) && (e.config.shouldUpdate ? 1 : -1)),
              (0, H.d)(e, V, !0)
          }
          function or() {
            const e = +V.route.paths[1]
            return ir(e).catch(e && (() => ir()))
          }
          async function ir(e) {
            const [t] = await d.all([(0, D.gj)("GetData", { id: e, sizes: !0 }, { retry: !0 }), j.Z.ready]),
              { [o]: n, sizes: l, ...a } = t
            c.assign(V, a)
            const i = [],
              s = []
            n.forEach((e, t) => {
              ar(e, l[t]), (e.config.removed ? s : i).push(e)
            }),
              (V.scripts = i),
              (V.removedScripts = s),
              (V.loading = !1)
          }
          ;(V.loading = !0),
            or(),
            c.assign($.Z, {
              ScriptsUpdated() {
                or()
              },
              UpdateSync(e) {
                V.sync = e
              },
              async UpdateScript({ update: e, where: t, code: n } = {}) {
                var l
                if (!e) return
                ;(lr || ((lr = V.batch) && (lr = d.race([lr, (0, D.dL)(500)])))) && (await lr, (lr = null))
                const a = V.scripts.findIndex((e) => e.props.id === t.id),
                  i = V.removedScripts.findIndex((e) => e.props.id === t.id),
                  s = V.scripts[a] || V.removedScripts[i] || (e.meta && V.canRenderScripts && {})
                if (!s) return
                const [r] = await (0, D.gj)("GetSizes", [t.id]),
                  { search: u } = V
                if (
                  (c.assign(s, e),
                  s.error && !e.error && (s.error = null),
                  ar(s, r, n),
                  u && P([s], u.rules),
                  null != (null == (l = e.config) ? void 0 : l.removed) &&
                    (e.config.removed
                      ? (V.needRefresh = !0)
                      : (V.removedScripts = V.removedScripts.filter((e) => e.props.id !== t.id))),
                  (s.config.removed ? i : a) < 0)
                ) {
                  s.message = ""
                  const e = s.config.removed ? "removedScripts" : o
                  V[e] = [...V[e], s]
                }
              },
              RemoveScripts(e) {
                V.removedScripts = V.removedScripts.filter((t) => !e.includes(t.props.id))
              },
            }),
            (0, W.sY)(tr)
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
              var t = new u("Cannot find module '" + e + "'")
              throw ((t.code = "MODULE_NOT_FOUND"), t)
            }
            return l[e]
          }
          ;(a.keys = () => c.keys(l)), (a.resolve = o), (e.exports = a), (a.id = 6291)
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
      (f = []),
      (H.O = (e, t, n, l) => {
        if (!t) {
          var a = 1 / 0
          for (r = 0; r < f.length; r++) {
            for (var [t, n, l] = f[r], o = !0, i = 0; i < t.length; i++)
              (!1 & l || a >= l) && c.keys(H.O).every((e) => H.O[e](t[i]))
                ? t.splice(i--, 1)
                : ((o = !1), l < a && (a = l))
            if (o) {
              f.splice(r--, 1)
              var s = n()
              void 0 !== s && (e = s)
            }
          }
          return e
        }
        l = l || 0
        for (var r = f.length; r > 0 && f[r - 1][2] > l; r--) f[r] = f[r - 1]
        f[r] = [t, n, l]
      }),
      (H.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e
        return H.d(t, { a: t }), t
      }),
      (z = c.getPrototypeOf ? (e) => c.getPrototypeOf(e) : (e) => e.__proto__),
      (H.t = function (e, t) {
        if ((1 & t && (e = this(e)), 8 & t)) return e
        if ("object" == typeof e && e) {
          if (4 & t && e.__esModule) return e
          if (16 & t && "function" == typeof e.then) return e
        }
        var n = c.create(null)
        H.r(n)
        var l = {}
        U = U || [null, z({}), z([]), z(z)]
        for (var a = 2 & t && e; "object" == typeof a && !~U.indexOf(a); a = z(a))
          c.getOwnPropertyNames(a).forEach((t) => (l[t] = () => e[t]))
        return (l.default = () => e), H.d(n, l), n
      }),
      (H.d = (e, t) => {
        for (var n in t) H.o(t, n) && !H.o(e, n) && c.defineProperty(e, n, { enumerable: !0, get: t[n] })
      }),
      (H.o = (e, t) => c.prototype.hasOwnProperty.call(e, t)),
      (H.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          c.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          c.defineProperty(e, "__esModule", { value: !0 })
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
              if (s) var u = s(H)
            }
            for (t && t(n); r < o.length; r++) (a = o[r]), H.o(e, a) && e[a] && e[a][0](), (e[a] = 0)
            return H.O(u)
          },
          n = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
        n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)))
      })()
    var j = H.O(void 0, [386, 84], () => H(1835))
    j = H.O(j)
  })()
}
