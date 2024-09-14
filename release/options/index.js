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
          z.d(U, { m: () => ir })
          var D = z(1871),
            $ = z(5313),
            H = z(6711),
            j = z(2477),
            W = z(5010),
            Z = z(1226),
            O = (z(3700), z(9994)),
            M = z(2262),
            T = z(9518)
          const I =
              /\s*(!)?(\#|(name|code|desc)(\+re)?:|(re:)|)('((?:[^']+|'')*)('|$)|"((?:[^"]+|"")*)("|$)|\/(\S+?)\/([a-z]*)|\S+)(?:\s+|$)/y,
            E = /''/g,
            R = /""/g
          function V(e) {
            const t = [],
              n = [],
              l = [],
              a = []
            I.lastIndex = 0
            for (let o; (o = I.exec(e)); ) {
              let e,
                [, i, s, r = "", c, d, p, m, g, v = m, f = g, h, w = ""] = o
              if (v) {
                if (!f) throw new u("Unmatched quotes")
                e = v.replace(m ? E : R, v[0])
              } else e = p
              ;(i = !!i),
                n.push({ negative: i, prefix: s, raw: p, parsed: e }),
                "#" === s
                  ? ((e = (0, $.cn)(e).replace(/\./g, "\\.")), e && (i ? a : l).push(e))
                  : (c || d ? (w = "i") : h ? (e = h) : (v || (w = "i"), (e = (0, $.YC)(e))),
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
          const F = (0, M.qj)({
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
            L = "include",
            A = "match",
            q = "exclude",
            N = "excludeMatch",
            K = "description",
            B = "downloadURL",
            J = "homepageURL",
            G = "icon",
            X = "name",
            Q = "origExclude",
            ee = "origExcludeMatch",
            te = "origInclude",
            ne = "origMatch",
            le = "storageSize",
            ae = "updateURL",
            oe = "toggle-on",
            ie = "toggle-off"
          let se
          function re(e) {
            var t
            ;(se = null == (t = e.find(([, e]) => "save" === e)) ? void 0 : t[0]),
              se || ((se = "Ctrl-S"), e.unshift([se, "save"]))
          }
          function ue(e, t) {
            return (0, $.gj)("MarkRemoved", { id: e.props.id, removed: t })
          }
          async function ce(e, ...t) {
            try {
              await (F.batch = e(...t) || !0)
            } finally {
              F.batch = !1
            }
          }
          function de(e) {
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
          var pe = z(6252),
            me = z(2502)
          const ge = { class: "page-options" },
            ve = { key: 0 },
            fe = { class: "aside-content" },
            he = (0, pe._)("img", { src: "/public/images/icon128.png" }, null, -1),
            we = ["textContent"],
            be = (0, pe._)("hr", null, null, -1),
            ye = ["href", "data-num-scripts", "textContent"]
          var xe = z(7458),
            Ce = z(9963),
            _e = z(5168),
            ke = z(2380),
            Se = z(392),
            Ue = z(9824),
            ze = z(7407),
            De = z(6877),
            $e = z(6653)
          const He = ".script",
            je = 50,
            We = 20,
            Ze = 16,
            Oe = 500,
            Me = Z.T
              ? { start: "touchstart", move: "touchmove", end: "touchend" }
              : { start: "dragstart", move: "mousemove", end: "mouseup" },
            Te = Z.T && c.assign(document.createElement("div"), { className: "dragging-noscroll" }),
            Ie = ["scroll", "mouseenter", "mouseleave"]
          let Ee, Re, Ve, Ye, Pe, Fe, Le, Ae, qe, Ne, Ke, Be, Je, Ge, Xe, Qe, et, tt
          function nt(e, t, n) {
            const l = n ? p : m
            ;(Ke = e),
              (Be = t),
              w(l, Ke, Me.start, Z.T ? it : ut),
              Z.T || (w(l, Ke, "dblclick", lt, !0), w(l, Ke, "mousedown", at, !0), n || ot())
          }
          function lt(e) {
            const t = getSelection(),
              n = e.target.closest(".script-name")
            n && (t.removeAllRanges(), t.selectAllChildren(n))
          }
          function at(e) {
            !e.altKey && bt(e) && (Ne.draggable = !0), w(p, Ke, "mouseup", ot, !0)
          }
          function ot() {
            Ne && (Ne.draggable = !1), w(m, Ke, "mouseup", ot, !0)
          }
          function it(e) {
            bt(e) && ((Fe = e), (Le = setTimeout(st, Oe, "timer")), p(Me.move, st), p(Me.end, rt))
          }
          function st(e) {
            rt(), "timer" === e && (w(ut, Ne, Fe), b && mt() && ((Ke.scrollTop += 1), (Ke.scrollTop -= 1)))
          }
          function rt() {
            clearTimeout(Le), m(Me.move, st), m(Me.end, rt)
          }
          function ut(e) {
            var t
            if (!bt(e)) return
            e.cancelable && e.preventDefault()
            const { clientX: n, clientY: l } = (null == (t = e.touches) ? void 0 : t[0]) || e,
              a = Ne.getBoundingClientRect(),
              o = Ke.getBoundingClientRect()
            ;(Ee = Ne.cloneNode(!0)),
              (Re = w([].filter, Ke.children, (e) => "none" !== e.style.display)),
              (Ye = Re.indexOf(Ne)),
              (Pe = Ye),
              Re.splice(Ye, 1),
              (Ve = a.height),
              (Ae = n - a.left),
              (qe = l - a.top),
              (Je = o.top + je),
              (Ge = o.bottom - je),
              (tt = {}),
              Ne.classList.add("dragging-placeholder"),
              Ee.classList.add("dragging"),
              (Ee.style.transform = `translate(${a.left}px, ${a.top}px)`),
              (Ee.style.width = `${a.width}px`),
              Ke.appendChild(Ee),
              Z.T && Ke.insertAdjacentElement("afterBegin", Te),
              p(Me.move, ct),
              p(Me.end, dt)
          }
          function ct(e) {
            var t
            const { clientX: n, clientY: l, target: a } = (null == (t = e.touches) ? void 0 : t[0]) || e
            let o
            const i = Z.T ? wt(n, l) : null == a.closest ? void 0 : a.closest(He)
            if (i && i !== Ne) {
              const e = i.getBoundingClientRect(),
                t = l > e.top + e.height / 2
              ;(o = Ne !== i[(t ? "next" : "previous") + "ElementSibling"]),
                o && (i.insertAdjacentElement(t ? "afterEnd" : "beforeBegin", Ne), pt(Re.indexOf(i) + t))
            }
            ;(Ee.style.transform = `translate(${n - Ae}px, ${l - qe}px)`), (gt(l) || o) && (tt = {})
          }
          function dt() {
            m(Me.move, ct),
              m(Me.end, dt),
              ft(),
              Ee.remove(),
              Z.T && Te.remove(),
              Ne.classList.remove("dragging-placeholder"),
              Be(Ye, Pe)
          }
          function pt(e) {
            const t = Pe < e ? Ve : -Ve,
              n = Re.slice(...(Pe < e ? [Pe, e] : [e, Pe]))
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
          function mt() {
            return Ke.scrollHeight > Ke.clientHeight
          }
          function gt(e) {
            const t = mt() && Math.min(1, Math.max(0, e - Ge, Je - e) / je)
            return (
              !t && Xe && ft(),
              t && !Xe && ((Xe = setInterval(vt, Ze)), Ie.forEach((e) => p(e, ht, !0))),
              (Qe = t && (e > Ge ? 1 : -1) * ((1 + t * We) | 0)),
              (et = v.now()),
              !!t
            )
          }
          function vt() {
            const e = v.now(),
              t = (Qe * (e - et)) / Ze
            ;(Ke.scrollTop += t), (et = e)
          }
          function ft() {
            Ie.forEach((e) => m(e, ht, !0)), Xe && clearInterval(Xe), (Xe = 0)
          }
          function ht(e) {
            e.stopPropagation()
          }
          function wt(e, t) {
            var n
            const l = `${e}:${t}`
            return tt[l] || (tt[l] = null == (n = document.elementFromPoint(e, t)) ? void 0 : n.closest(He))
          }
          function bt(e) {
            return (Ne = e.target.closest(He)), Ne
          }
          const yt = ["tabIndex"],
            xt = { class: "script-icon hidden-xs" },
            Ct = ["href", "data-hotkey"],
            _t = ["src", "data-no-icon"],
            kt = { class: "script-info-1 ellipsis" },
            St = ["textContent", "data-order"],
            Ut = { key: 0, class: "script-tags" },
            zt = ["textContent", "onClick", "data-tag"],
            Dt = (0, pe._)("a", null, "...", -1),
            $t = ["textContent", "onClick", "data-tag"],
            Ht = { class: "script-info flex ml-1c" },
            jt = ["href", "textContent", "tabIndex"],
            Wt = ["textContent"],
            Zt = ["textContent"],
            Ot = { class: "script-buttons script-buttons-left" },
            Mt = ["href", "data-hotkey", "tabIndex"],
            Tt = ["data-hotkey", "tabIndex"],
            It = ["data-hotkey", "tabIndex"],
            Et = (0, pe._)("span", { class: "sep" }, null, -1),
            Rt = ["tabIndex"],
            Vt = ["href", "tabIndex"],
            Yt = ["textContent", "title"],
            Pt = { class: "script-buttons script-buttons-right" },
            Ft = ["data-hotkey", "tabIndex"],
            Lt = ["data-hotkey", "tabIndex"],
            At = (e) => xe.$J.setContext("scriptFocus", e),
            qt = {
              __name: "script-item",
              props: ["script", "visible", "viewTable", "focused", "hotkeys", "showHotkeys", "activeTags"],
              emits: ["clickTag", "remove", "restore", "scrollDelta", "toggle", "update"],
              setup(e, { emit: t }) {
                const n = e,
                  l = t,
                  a = (0, M.iH)(),
                  i = (0, M.iH)(n.visible),
                  s = (0, pe.Fl)(() => n.script.config.enabled),
                  u = (0, pe.Fl)(() => n.script.config.removed),
                  c = (0, pe.Fl)(() => F.route.paths[0] === k),
                  d = (0, pe.Fl)(() => {
                    const e = n.script.meta.author
                    if (!e) return
                    const t = e.match(/^(.*?)\s<(\S*?@\S*?)>$/)
                    return { email: t && t[2], name: t ? t[1] : e }
                  }),
                  p = (0, pe.Fl)(() => n.script.custom[K] || (0, $.iQ)(n.script.meta, K)),
                  m = (0, pe.Fl)(() => (s.value ? (0, $.ag)("buttonDisable") : (0, $.ag)("buttonEnable"))),
                  g = (0, pe.Fl)(() => (n.focused ? 0 : -1)),
                  v = (0, pe.Fl)(() => {
                    var e
                    return (null == (e = n.script.custom.tags) ? void 0 : e.split(" ").filter(r)) || []
                  }),
                  f = (0, pe.Fl)(() => {
                    const { props: e } = n.script,
                      t = (!u.value && e.lastUpdated) || e.lastModified,
                      l = t && new Date(t).toLocaleString()
                    return t
                      ? {
                          show: (0, $.mr)(Date.now() - t),
                          title: u.value ? (0, $.ag)("labelRemovedAt", l) : (0, $.ag)("labelLastUpdatedAt", l),
                        }
                      : {}
                  }),
                  h = (0, pe.Fl)(() => `#${u.value ? k : o}/${n.script.props.id}\n`),
                  w = (0, pe.Fl)(() => ({
                    home: [(0, $.ag)("buttonHome"), (0, $.t$)(n.script)],
                    question: [(0, $.ag)("buttonSupport"), (0, $.b7)(n.script)],
                  })),
                  b = (e) => l(e, n.script),
                  y = () => b("remove"),
                  x = () => b("restore"),
                  C = (e) => l("clickTag", e),
                  _ = () => b("toggle"),
                  S = async () => {
                    ;(-1 !== n.script.$canUpdate || (await (0, Z.GW)((0, $.ag)("confirmManualUpdate")))) && b("update")
                  }
                return (
                  (0, pe.YP)(
                    () => n.visible,
                    (e) => {
                      e && (i.value = !0)
                    }
                  ),
                  (0, pe.YP)(
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
                          (0, xe.u7)((0, Z.vY)()) || n.focus({ preventScroll: !0 }),
                          l("scrollDelta", a)
                      }
                    }
                  ),
                  (t, n) => (
                    (0, pe.wg)(),
                    (0, pe.iD)(
                      "div",
                      {
                        ref_key: "$root",
                        ref: a,
                        class: (0, me.C_)([
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
                        onFocus: n[1] || (n[1] = (e) => At(!0)),
                        onBlur: n[2] || (n[2] = (e) => At(!1)),
                      },
                      [
                        (0, pe._)("div", xt, [
                          (0, pe._)(
                            "a",
                            { href: h.value, "data-hotkey": e.hotkeys.edit, "data-hotkey-table": "", tabIndex: "-1" },
                            [
                              (0, pe._)(
                                "img",
                                { src: e.script.safeIcon, "data-no-icon": e.script.noIcon },
                                null,
                                8,
                                _t
                              ),
                            ],
                            8,
                            Ct
                          ),
                        ]),
                        (0, pe._)("div", kt, [
                          (0, pe._)(
                            "a",
                            (0, pe.dG)(
                              { textContent: (0, me.zw)(e.script.$cache.name) },
                              e.viewTable && { draggable: !1, href: h.value, tabIndex: g.value },
                              { "data-order": u.value ? null : e.script.props.position, class: "script-name ellipsis" }
                            ),
                            null,
                            16,
                            St
                          ),
                          i.value
                            ? ((0, pe.wg)(),
                              (0, pe.iD)("div", Ut, [
                                ((0, pe.wg)(!0),
                                (0, pe.iD)(
                                  pe.HY,
                                  null,
                                  (0, pe.Ko)(v.value.slice(0, 2), (t, n) => {
                                    var l
                                    return (
                                      (0, pe.wg)(),
                                      (0, pe.iD)(
                                        "a",
                                        {
                                          key: n,
                                          textContent: (0, me.zw)(`#${t}`),
                                          onClick: (0, Ce.iM)((e) => C(t), ["prevent"]),
                                          class: (0, me.C_)({
                                            active: null == (l = e.activeTags) ? void 0 : l.includes(t),
                                          }),
                                          "data-tag": t,
                                        },
                                        null,
                                        10,
                                        zt
                                      )
                                    )
                                  }),
                                  128
                                )),
                                v.value.length > 2
                                  ? ((0, pe.wg)(),
                                    (0, pe.j4)(
                                      (0, M.SU)(Se.Z),
                                      { key: 0 },
                                      {
                                        content: (0, pe.w5)(() => [
                                          ((0, pe.wg)(!0),
                                          (0, pe.iD)(
                                            pe.HY,
                                            null,
                                            (0, pe.Ko)(v.value.slice(2), (t, n) => {
                                              var l
                                              return (
                                                (0, pe.wg)(),
                                                (0, pe.iD)(
                                                  "a",
                                                  {
                                                    key: n,
                                                    class: (0, me.C_)([
                                                      "dropdown-menu-item",
                                                      { active: null == (l = e.activeTags) ? void 0 : l.includes(t) },
                                                    ]),
                                                    textContent: (0, me.zw)(`#${t}`),
                                                    onClick: (0, Ce.iM)((e) => C(t), ["prevent"]),
                                                    "data-tag": t,
                                                  },
                                                  null,
                                                  10,
                                                  $t
                                                )
                                              )
                                            }),
                                            128
                                          )),
                                        ]),
                                        default: (0, pe.w5)(() => [Dt]),
                                        _: 1,
                                      }
                                    ))
                                  : (0, pe.kq)("", !0),
                              ]))
                            : (0, pe.kq)("", !0),
                        ]),
                        (0, pe._)("div", Ht, [
                          i.value
                            ? ((0, pe.wg)(),
                              (0, pe.iD)(
                                pe.HY,
                                { key: 0 },
                                [
                                  d.value
                                    ? ((0, pe.wg)(),
                                      (0, pe.j4)(
                                        (0, M.SU)(Ue.Z),
                                        {
                                          key: 0,
                                          content: (0, M.SU)($.ag)("labelAuthor") + e.script.meta.author,
                                          class: "script-author ml-1c hidden-sm",
                                          align: "end",
                                        },
                                        {
                                          default: (0, pe.w5)(() => [
                                            (0, pe.Wm)((0, M.SU)(De.Z), { name: "author" }),
                                            d.value.email
                                              ? ((0, pe.wg)(),
                                                (0, pe.iD)(
                                                  "a",
                                                  {
                                                    key: 0,
                                                    class: "ellipsis",
                                                    href: `mailto:${d.value.email}`,
                                                    textContent: (0, me.zw)(d.value.name),
                                                    tabIndex: g.value,
                                                  },
                                                  null,
                                                  8,
                                                  jt
                                                ))
                                              : ((0, pe.wg)(),
                                                (0, pe.iD)(
                                                  "span",
                                                  { key: 1, class: "ellipsis", textContent: (0, me.zw)(d.value.name) },
                                                  null,
                                                  8,
                                                  Wt
                                                )),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, pe.kq)("", !0),
                                  (0, pe._)(
                                    "span",
                                    { class: "version ellipsis", textContent: (0, me.zw)(e.script.meta.version) },
                                    null,
                                    8,
                                    Zt
                                  ),
                                  u.value
                                    ? (0, pe.kq)("", !0)
                                    : ((0, pe.wg)(),
                                      (0, pe.j4)(
                                        (0, M.SU)(Ue.Z),
                                        {
                                          key: 1,
                                          class: "size hidden-sm",
                                          content: e.script.$cache.sizes,
                                          align: "end",
                                        },
                                        {
                                          default: (0, pe.w5)(() => [(0, pe.Uk)((0, me.zw)(e.script.$cache.size), 1)]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      )),
                                  (0, pe.Wm)(
                                    (0, M.SU)(Ue.Z),
                                    { class: "updated hidden-sm ml-1c", content: f.value.title, align: "end" },
                                    { default: (0, pe.w5)(() => [(0, pe.Uk)((0, me.zw)(f.value.show), 1)]), _: 1 },
                                    8,
                                    ["content"]
                                  ),
                                ],
                                64
                              ))
                            : (0, pe.kq)("", !0),
                        ]),
                        (0, pe._)("div", Ot, [
                          i.value
                            ? ((0, pe.wg)(),
                              (0, pe.iD)(
                                pe.HY,
                                { key: 0 },
                                [
                                  (0, pe.Wm)(
                                    (0, M.SU)(Ue.Z),
                                    { content: (0, M.SU)($.ag)("buttonEdit"), align: "start" },
                                    {
                                      default: (0, pe.w5)(() => [
                                        (0, pe._)(
                                          "a",
                                          {
                                            class: "btn-ghost",
                                            href: h.value,
                                            "data-hotkey": e.hotkeys.edit,
                                            tabIndex: g.value,
                                          },
                                          [(0, pe.Wm)((0, M.SU)(De.Z), { name: "code" })],
                                          8,
                                          Mt
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["content"]
                                  ),
                                  u.value
                                    ? (0, pe.kq)("", !0)
                                    : ((0, pe.wg)(),
                                      (0, pe.iD)(
                                        pe.HY,
                                        { key: 0 },
                                        [
                                          (0, pe.Wm)(
                                            (0, M.SU)(Ue.Z),
                                            { content: m.value, align: "start" },
                                            {
                                              default: (0, pe.w5)(() => [
                                                (0, pe._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    onClick: _,
                                                    "data-hotkey": e.hotkeys.toggle,
                                                    tabIndex: g.value,
                                                  },
                                                  [
                                                    (0, pe.Wm)(
                                                      (0, M.SU)(De.Z),
                                                      { name: s.value ? (0, M.SU)(oe) : (0, M.SU)(ie) },
                                                      null,
                                                      8,
                                                      ["name"]
                                                    ),
                                                  ],
                                                  8,
                                                  Tt
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                          (0, pe.Wm)(
                                            (0, M.SU)(Ue.Z),
                                            {
                                              disabled: !(t.$ = e.script.$canUpdate) || e.script.checking,
                                              content: (0, M.SU)($.ag)("updateScript"),
                                              align: "start",
                                            },
                                            {
                                              default: (0, pe.w5)(() => [
                                                (0, pe._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    onClick: S,
                                                    "data-hotkey": e.hotkeys.update,
                                                    tabIndex: t.$ ? g.value : -1,
                                                  },
                                                  [
                                                    (0, pe.Wm)(
                                                      (0, M.SU)(De.Z),
                                                      { name: "refresh", "^invert": -1 === t.$ ? "" : null },
                                                      null,
                                                      8,
                                                      ["^invert"]
                                                    ),
                                                  ],
                                                  8,
                                                  It
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
                                  Et,
                                  (0, pe.Wm)(
                                    (0, M.SU)(Ue.Z),
                                    { disabled: !p.value, content: p.value, align: "start" },
                                    {
                                      default: (0, pe.w5)(() => [
                                        (0, pe._)(
                                          "a",
                                          {
                                            class: "btn-ghost",
                                            tabIndex: p.value ? g.value : -1,
                                            onClick: n[0] || (n[0] = (e) => (0, M.SU)(xe.xr)(e.target)),
                                          },
                                          [(0, pe.Wm)((0, M.SU)(De.Z), { name: "info" })],
                                          8,
                                          Rt
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["disabled", "content"]
                                  ),
                                  ((0, pe.wg)(!0),
                                  (0, pe.iD)(
                                    pe.HY,
                                    null,
                                    (0, pe.Ko)(
                                      w.value,
                                      ([e, t], n) => (
                                        (0, pe.wg)(),
                                        (0, pe.j4)(
                                          (0, M.SU)(Ue.Z),
                                          { key: n, disabled: !t, content: e, align: "start" },
                                          {
                                            default: (0, pe.w5)(() => [
                                              (0, pe._)(
                                                "a",
                                                {
                                                  class: "btn-ghost",
                                                  target: "_blank",
                                                  rel: "noopener noreferrer",
                                                  href: t,
                                                  tabIndex: t ? g.value : -1,
                                                },
                                                [(0, pe.Wm)((0, M.SU)(De.Z), { name: n }, null, 8, ["name"])],
                                                8,
                                                Vt
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
                                    ? ((0, pe.wg)(),
                                      (0, pe.iD)(
                                        "div",
                                        {
                                          key: 1,
                                          class: "script-message",
                                          textContent: (0, me.zw)(e.script.message),
                                          title: e.script.error,
                                        },
                                        null,
                                        8,
                                        Yt
                                      ))
                                    : (0, pe.kq)("", !0),
                                ],
                                64
                              ))
                            : (0, pe.kq)("", !0),
                        ]),
                        (0, pe._)("div", Pt, [
                          i.value
                            ? ((0, pe.wg)(),
                              (0, pe.iD)(
                                pe.HY,
                                { key: 0 },
                                [
                                  c.value || !u.value
                                    ? ((0, pe.wg)(),
                                      (0, pe.j4)(
                                        (0, M.SU)(Ue.Z),
                                        { key: 0, content: (0, M.SU)($.ag)("buttonRemove"), align: "end" },
                                        {
                                          default: (0, pe.w5)(() => [
                                            (0, pe._)(
                                              "a",
                                              {
                                                class: (0, me.C_)(["btn-ghost", { "btn-danger": u.value }]),
                                                onClick: y,
                                                "data-hotkey": e.hotkeys.remove,
                                                tabIndex: g.value,
                                              },
                                              [(0, pe.Wm)((0, M.SU)(De.Z), { name: "trash" })],
                                              10,
                                              Ft
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, pe.kq)("", !0),
                                  u.value
                                    ? ((0, pe.wg)(),
                                      (0, pe.j4)(
                                        (0, M.SU)(Ue.Z),
                                        { key: 1, content: (0, M.SU)($.ag)("buttonRestore"), placement: "left" },
                                        {
                                          default: (0, pe.w5)(() => [
                                            (0, pe._)(
                                              "a",
                                              {
                                                class: "btn-ghost",
                                                onClick: x,
                                                "data-hotkey": e.hotkeys.restore,
                                                tabIndex: g.value,
                                              },
                                              [(0, pe.Wm)((0, M.SU)(De.Z), { name: "undo" })],
                                              8,
                                              Lt
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, pe.kq)("", !0),
                                ],
                                64
                              ))
                            : (0, pe.kq)("", !0),
                        ]),
                      ],
                      42,
                      yt
                    )
                  )
                )
              },
            }
          var Nt = z(306),
            Kt = z(6115),
            Bt = z(715)
          const Jt = { class: "form-group condensed" },
            Gt = ["textContent"],
            Xt = ["textContent"],
            Qt = ["textContent"],
            en = ["disabled"],
            tn = ["textContent"],
            nn = ["textContent"],
            ln = {
              __name: "settings-update",
              props: { script: c },
              setup(e) {
                const t = e,
                  n = (0, pe.Fl)(() => t.script.config),
                  l = (0, pe.Fl)(() => !t.script._remote)
                return (e, t) => (
                  (0, pe.wg)(),
                  (0, pe.iD)("div", null, [
                    (0, pe._)("div", Jt, [
                      (0, pe._)("label", null, [
                        (0, pe.wy)(
                          (0, pe._)(
                            "input",
                            (0, pe.dG)(
                              {
                                type: "checkbox",
                                "onUpdate:modelValue": t[0] || (t[0] = (e) => (n.value.shouldUpdate = e)),
                              },
                              { disabled: l.value }
                            ),
                            null,
                            16
                          ),
                          [[Ce.e8, n.value.shouldUpdate]]
                        ),
                        (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelAllowUpdate")) }, null, 8, Gt),
                        (0, pe._)(
                          "span",
                          { textContent: (0, me.zw)(e.i18n("labelNotifyThisUpdated")), class: "melt" },
                          null,
                          8,
                          Xt
                        ),
                      ]),
                      ((0, pe.wg)(!0),
                      (0, pe.iD)(
                        pe.HY,
                        null,
                        (0, pe.Ko)(
                          [
                            [e.i18n("genericOn"), "1"],
                            [e.i18n("genericOff"), "0"],
                            [e.i18n("genericUseGlobal"), ""],
                          ],
                          ([e, a]) => (
                            (0, pe.wg)(),
                            (0, pe.iD)("label", { class: "ml-1 melt", key: a }, [
                              (0, pe.wy)(
                                (0, pe._)(
                                  "input",
                                  (0, pe.dG)(
                                    { type: "radio", ref_for: !0 },
                                    { value: a, disabled: l.value },
                                    { "onUpdate:modelValue": t[1] || (t[1] = (e) => (n.value.notifyUpdates = e)) }
                                  ),
                                  null,
                                  16
                                ),
                                [[Ce.G2, n.value.notifyUpdates]]
                              ),
                              (0, pe.Uk)(),
                              (0, pe._)("span", { textContent: (0, me.zw)(e) }, null, 8, Qt),
                            ])
                          )
                        ),
                        128
                      )),
                    ]),
                    (0, pe._)("label", null, [
                      (0, pe.wy)(
                        (0, pe._)(
                          "input",
                          {
                            type: "checkbox",
                            "onUpdate:modelValue": t[2] || (t[2] = (e) => (n.value._editable = e)),
                            class: "scary-switch",
                            disabled: l.value || !n.value.shouldUpdate,
                          },
                          null,
                          8,
                          en
                        ),
                        [[Ce.e8, n.value._editable]]
                      ),
                      (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("readonlyOpt")) }, null, 8, tn),
                      (0, pe.Uk)(),
                      (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("readonlyOptWarn")) }, null, 8, nn),
                    ]),
                  ])
                )
              },
            },
            an = { class: "edit-settings" },
            on = ["textContent"],
            sn = { class: "mb-2" },
            rn = ["textContent"],
            un = ["textContent"],
            cn = ["disabled"],
            dn = ["textContent"],
            pn = (0, pe._)("td", null, [(0, pe._)("code", null, "@run-at")], -1),
            mn = ["textContent"],
            gn = ["disabled"],
            vn = ["textContent"],
            fn = (0, pe._)("option", { value: "document-start" }, "document-start", -1),
            hn = (0, pe._)("option", { value: "document-body" }, "document-body", -1),
            wn = (0, pe._)("option", { value: "document-end" }, "document-end", -1),
            bn = (0, pe._)("option", { value: "document-idle" }, "document-idle", -1),
            yn = (0, pe._)(
              "td",
              null,
              [
                (0, pe._)("code", null, [
                  (0, pe.Uk)("@"),
                  (0, pe._)("s", { style: { color: "var(--fill-6)" } }, "no"),
                  (0, pe.Uk)("frames"),
                ]),
              ],
              -1
            ),
            xn = ["textContent"],
            Cn = ["disabled"],
            _n = ["textContent"],
            kn = ["textContent"],
            Sn = ["textContent"],
            Un = (0, pe._)("td", null, [(0, pe._)("code", null, "@inject-into")], -1),
            zn = ["textContent"],
            Dn = ["disabled"],
            $n = ["textContent"],
            Hn = ["textContent"],
            jn = ["textContent"],
            Wn = ["textContent"],
            Zn = ["onUpdate:modelValue", "placeholder", "disabled"],
            On = ["textContent"],
            Mn = ["textContent"],
            Tn = ["textContent"],
            In = ["onUpdate:modelValue", "disabled"],
            En = ["textContent"],
            Rn = ["onUpdate:modelValue", "rows", "disabled"],
            Vn = {
              __name: "settings",
              props: { script: c, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, M.XI)(Bt.Wg),
                  l = (e) => {
                    var t
                    return (null == (t = e.match(/^(.*?)(@[-a-z]+)(.*)/)) ? void 0 : t.slice(1)) || [e, "", ""]
                  },
                  a = (0, pe.Fl)(() => t.script.config),
                  o = (0, pe.Fl)(() => t.script.custom),
                  i = (0, pe.Fl)(() => {
                    const { script: e } = t,
                      { meta: n } = e
                    return {
                      ...(0, ke.zr)(n, [G, X]),
                      [J]: (0, $.t$)(e),
                      [ae]: n[ae] || (0, $.ag)("hintUseDownloadURL"),
                      [B]: n[B] || e.custom.lastInstallURL,
                    }
                  }),
                  s = [
                    [X, (0, $.ag)("labelName")],
                    [J, (0, $.ag)("labelHomepageURL")],
                    [ae, (0, $.ag)("labelUpdateURL")],
                    [B, (0, $.ag)("labelDownloadURL")],
                    [G, (0, $.ag)("labelIconURL")],
                  ],
                  r = [
                    [L, te, ...l((0, $.ag)("labelInclude"))],
                    [A, ne, ...l((0, $.ag)("labelMatch"))],
                    [q, Q, ...l((0, $.ag)("labelExclude"))],
                    [N, ee, ...l((0, $.ag)("labelExcludeMatch"))],
                  ]
                return (t, l) => (
                  (0, pe.wg)(),
                  (0, pe.iD)("div", an, [
                    (0, pe._)("h4", { textContent: (0, me.zw)((0, M.SU)($.ag)("editLabelSettings")) }, null, 8, on),
                    (0, pe._)("div", sn, [
                      (0, pe._)("label", null, [
                        (0, pe.wy)(
                          (0, pe._)(
                            "input",
                            { type: "checkbox", "onUpdate:modelValue": l[0] || (l[0] = (e) => (a.value.enabled = e)) },
                            null,
                            512
                          ),
                          [[Ce.e8, a.value.enabled]]
                        ),
                        (0, pe._)("span", { textContent: (0, me.zw)((0, M.SU)($.ag)("buttonEnable")) }, null, 8, rn),
                      ]),
                    ]),
                    (0, pe.Wm)((0, M.SU)(ln), (0, me.vs)((0, pe.F4)({ script: e.script })), null, 16),
                    (0, pe._)("table", null, [
                      (0, pe._)("tr", null, [
                        (0, pe._)("td", { textContent: (0, me.zw)((0, M.SU)($.ag)("labelTags")) }, null, 8, un),
                        (0, pe._)("td", null, [
                          (0, pe.wy)(
                            (0, pe._)(
                              "input",
                              {
                                type: "text",
                                "onUpdate:modelValue": l[1] || (l[1] = (e) => (o.value.tags = e)),
                                disabled: e.readOnly,
                              },
                              null,
                              8,
                              cn
                            ),
                            [[Ce.nr, o.value.tags]]
                          ),
                        ]),
                      ]),
                    ]),
                    (0, pe._)("h4", { textContent: (0, me.zw)((0, M.SU)($.ag)("editLabelMeta")) }, null, 8, dn),
                    (0, pe._)("table", null, [
                      (0, pe._)("tr", null, [
                        pn,
                        (0, pe._)("td", null, [
                          (0, pe._)("p", { textContent: (0, me.zw)((0, M.SU)($.ag)("labelRunAt")) }, null, 8, mn),
                        ]),
                        (0, pe._)("td", null, [
                          (0, pe.wy)(
                            (0, pe._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[2] || (l[2] = (e) => (o.value.runAt = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, pe._)(
                                  "option",
                                  { value: "", textContent: (0, me.zw)((0, M.SU)($.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  vn
                                ),
                                fn,
                                hn,
                                wn,
                                bn,
                              ],
                              8,
                              gn
                            ),
                            [[Ce.bM, o.value.runAt]]
                          ),
                        ]),
                      ]),
                      (0, pe._)("tr", null, [
                        yn,
                        (0, pe._)("td", null, [
                          (0, pe._)("p", { textContent: (0, me.zw)((0, M.SU)($.ag)("labelNoFrames")) }, null, 8, xn),
                        ]),
                        (0, pe._)("td", null, [
                          (0, pe.wy)(
                            (0, pe._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[3] || (l[3] = (e) => (o.value.noframes = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, pe._)(
                                  "option",
                                  { value: "", textContent: (0, me.zw)((0, M.SU)($.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  _n
                                ),
                                (0, pe._)(
                                  "option",
                                  { value: "0", textContent: (0, me.zw)((0, M.SU)($.ag)("genericOn")) },
                                  null,
                                  8,
                                  kn
                                ),
                                (0, pe._)(
                                  "option",
                                  { value: "1", textContent: (0, me.zw)((0, M.SU)($.ag)("genericOff")) },
                                  null,
                                  8,
                                  Sn
                                ),
                              ],
                              8,
                              Cn
                            ),
                            [[Ce.bM, o.value.noframes]]
                          ),
                        ]),
                      ]),
                      (0, pe._)("tr", null, [
                        Un,
                        (0, pe._)("td", null, [
                          (0, pe._)(
                            "p",
                            { textContent: (0, me.zw)((0, M.SU)($.ag)("labelInjectionMode")) },
                            null,
                            8,
                            zn
                          ),
                        ]),
                        (0, pe._)("td", null, [
                          (0, pe.wy)(
                            (0, pe._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[4] || (l[4] = (e) => (o.value.injectInto = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, pe._)(
                                  "option",
                                  { value: "", textContent: (0, me.zw)((0, M.SU)($.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  $n
                                ),
                                ((0, pe.wg)(!0),
                                (0, pe.iD)(
                                  pe.HY,
                                  null,
                                  (0, pe.Ko)(
                                    n.value,
                                    (e, t) => (
                                      (0, pe.wg)(),
                                      (0, pe.iD)("option", { key: t, textContent: (0, me.zw)(t) }, null, 8, Hn)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              Dn
                            ),
                            [[Ce.bM, o.value.injectInto]]
                          ),
                        ]),
                      ]),
                      ((0, pe.wg)(),
                      (0, pe.iD)(
                        pe.HY,
                        null,
                        (0, pe.Ko)(s, ([t, n]) =>
                          (0, pe._)("tr", { key: t }, [
                            (0, pe._)("td", null, [
                              (0, pe._)("code", { textContent: (0, me.zw)(`@${t}`) }, null, 8, jn),
                            ]),
                            (0, pe._)("td", null, [(0, pe._)("p", { textContent: (0, me.zw)(n) }, null, 8, Wn)]),
                            (0, pe._)("td", null, [
                              (0, pe.wy)(
                                (0, pe._)(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": (e) => (o.value[t] = e),
                                    placeholder: i.value[t],
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  Zn
                                ),
                                [[Ce.nr, o.value[t]]]
                              ),
                            ]),
                          ])
                        ),
                        64
                      )),
                    ]),
                    (0, pe._)("table", null, [
                      ((0, pe.wg)(),
                      (0, pe.iD)(
                        pe.HY,
                        null,
                        (0, pe.Ko)(r, ([n, l, a, i, s]) =>
                          (0, pe._)("tr", { key: n }, [
                            (0, pe._)("td", null, [
                              (0, pe._)("p", null, [
                                (0, pe._)("span", { textContent: (0, me.zw)(a) }, null, 8, On),
                                (0, pe._)("code", { textContent: (0, me.zw)(i) }, null, 8, Mn),
                                (0, pe._)("span", { textContent: (0, me.zw)(s) }, null, 8, Tn),
                              ]),
                              (0, pe._)("label", null, [
                                (0, pe.wy)(
                                  (0, pe._)(
                                    "input",
                                    {
                                      type: "checkbox",
                                      "onUpdate:modelValue": (e) => (o.value[l] = e),
                                      disabled: e.readOnly,
                                    },
                                    null,
                                    8,
                                    In
                                  ),
                                  [[Ce.e8, o.value[l]]]
                                ),
                                (0, pe._)(
                                  "span",
                                  { textContent: (0, me.zw)((0, M.SU)($.ag)("labelKeepOriginal")) },
                                  null,
                                  8,
                                  En
                                ),
                              ]),
                            ]),
                            (0, pe._)("td", null, [
                              (0, pe.wy)(
                                (0, pe._)(
                                  "textarea",
                                  {
                                    "onUpdate:modelValue": (e) => (o.value[n] = e),
                                    spellcheck: "false",
                                    rows: t.calcRows(o.value[n]),
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  Rn
                                ),
                                [[Ce.nr, o.value[n]]]
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
            Fn = z(2274)
          const Ln = ["data-editing"],
            An = { class: "flex-1 flex flex-col" },
            qn = { class: "mb-1 flex center-items" },
            Nn = ["textContent"],
            Kn = { class: "btn-ghost", tabindex: "0" },
            Bn = (0, pe._)(
              "li",
              null,
              [(0, pe._)("kbd", null, "PageUp"), (0, pe.Uk)(", "), (0, pe._)("kbd", null, "PageDown")],
              -1
            ),
            Jn = (0, pe._)(
              "li",
              null,
              [
                (0, pe._)("kbd", null, "\u2191"),
                (0, pe.Uk)(", "),
                (0, pe._)("kbd", null, "\u2193"),
                (0, pe.Uk)(", "),
                (0, pe._)("kbd", null, "Tab"),
                (0, pe.Uk)(", "),
                (0, pe._)("kbd", null, "Shift-Tab"),
              ],
              -1
            ),
            Gn = (0, pe._)("kbd", null, "Enter", -1),
            Xn = { key: 0 },
            Qn = (0, pe._)("kbd", null, "Ctrl-Del", -1),
            el = ["onKeydown"],
            tl = ["textContent"],
            nl = ["onKeydown", "onClick"],
            ll = { class: "ellipsis" },
            al = ["textContent"],
            ol = ["textContent"],
            il = ["textContent"],
            sl = ["onClick"],
            rl = ["textContent"],
            ul = ["textContent"],
            cl = ["onKeydown"],
            dl = ["onClick"],
            pl = ["textContent"],
            ml = ["textContent"],
            gl = ["textContent"],
            vl = { key: 0, class: "edit-values-panel flex flex-col flex-1 mb-1c" },
            fl = { class: "control" },
            hl = ["textContent"],
            wl = { class: "flex center-items" },
            bl = ["textContent", "onClick", "title", "disabled"],
            yl = ["textContent"],
            xl = ["innerHTML"],
            Cl = ["textContent"],
            _l = ["readOnly", "onKeydown"],
            kl = ["textContent"],
            Sl = {
              __name: "values",
              props: { script: c, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, M.iH)(),
                  l = (0, M.iH)(),
                  a = (0, M.iH)(),
                  o = (0, M.iH)(),
                  i = (0, M.iH)(),
                  s = (0, M.iH)(),
                  r = (0, M.iH)(),
                  u = (0, M.iH)(!0),
                  d = (0, M.iH)(),
                  f = (0, M.iH)(),
                  h = (0, M.iH)(),
                  b = (0, pe.Fl)(() => q(c.values(h.value), "key")),
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
                  k = (e) => xe.$J.setContext("edit", "selectionEnd" in e.target),
                  U = (0, pe.Fl)(() => c.keys(f.value || {}).sort()),
                  z = (0, pe.Fl)(() => Math.ceil(U.value.length / 25)),
                  D = (0, pe.Fl)(() => {
                    const e = 25 * (d.value - 1),
                      t = U.value.slice(e, e + 25)
                    return (t.style = q(t)), t
                  })
                let H,
                  j,
                  W,
                  O,
                  T,
                  I,
                  E = "  "
                function R(e) {
                  ;(0, pe.Y3)(() => {
                    l.value[e ? "click" : "focus"]()
                  })
                }
                function V(e) {
                  d.value = Math.max(1, Math.min(z.value, d.value + e))
                }
                function Y(e, t) {
                  const n = e.length + (f.value[e] || t).length - 1
                  return n < 1e4 ? n : (0, $.aj)(n)
                }
                function P(e, t, n) {
                  let l = f.value[e] || n
                  const a = l[0]
                  return (l = l.slice(1)), "s" === a ? (l = JSON.stringify(l)) : t || (l = C(l)), t ? x(l) : l
                }
                function F() {
                  return `{\n${E}${U.value
                    .map((e) => `${JSON.stringify(e)}: ${P(e)}`)
                    .join(",\n")
                    .replace(/\n/g, "\n" + E)}\n}`
                }
                function L(e, t) {
                  null != e || (e = {})
                  const n = f.value
                  let l
                  if (
                    (t
                      ? (w(ke.LI, n, ([t, n]) => {
                          n !== e[t] && (B(t), (l = !0))
                        }),
                        null != l || (l = !0))
                      : (l = !(0, ke.vZ)(n, e)),
                    l)
                  )
                    return (f.value = e), (d.value = Math.min(d.value, z.value) || 1), A(), !0
                }
                function A() {
                  const { script: e } = t,
                    { $cache: n = (e.$cache = {}) } = e,
                    l = U.value.reduce((e, t) => e + t.length + 4 + f.value[t].length + 2, 0)
                  n[le] = l ? l + 2 : l
                }
                function q(e, t) {
                  let n = 0
                  for (let l = 0; l < e.length; l++) {
                    const a = e[l]
                    n = Math.max(n, (t ? a[t] : a).length)
                  }
                  return { "--keyW": `${n}ch` }
                }
                async function N({ key: e, jsonValue: n, rawValue: l = (0, $.bd)(n) || "" }, a) {
                  a && U.value.includes(e) && B(e)
                  const { id: o } = t.script.props
                  await (0, $.gj)("UpdateValue", { [o]: { [e]: l } }, void 0, T),
                    l ? (f.value[e] = l) : delete f.value[e],
                    A()
                }
                function K() {
                  r.value = { isNew: !0, key: "", value: "", ...y }
                }
                function B(e, t = f.value[e], n = P(e, !0), l = Y(e, t)) {
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
                  delete t[e], (0, $.xb)(t) && (h.value = null), N(n)
                }
                function X(e) {
                  r.value = { key: e, value: P(e), ...y }
                }
                function Q() {
                  r.value = { isAll: !0, value: F(), ...y }
                }
                async function ee(e) {
                  const n = r.value
                  if ((n.jsonPaused && ((n.jsonPaused = !1), ne()), n.error)) {
                    const e = n.errorPos
                    return (
                      H.setSelection(e, { line: e.line, ch: e.ch + 1 }), H.focus(), void (0, Z.PV)({ text: n.error })
                    )
                  }
                  if ((1 === e ? (H.markClean(), (n.dirty = !1)) : (r.value = null), n.isAll)) {
                    const e = w(ke.Xw, n.jsonValue, (e) => (0, $.bd)(e) || "")
                    await (0, $.gj)("SetValueStores", { [t.script.props.id]: e }), L(e, !0)
                  } else await N(n, !0)
                }
                function te() {
                  const e = r.value
                  if (e.dirty) {
                    const t = H.getValue().trim(),
                      { jsonValue: n = t } = e
                    B(e.key, (0, $.bd)(n), x(t))
                  }
                  r.value = null
                }
                function ne(e) {
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
                  Pn().keyName(e) === se && ee()
                }
                function oe(e) {
                  const t = c.values(e)[0].newValue
                  if (t) {
                    const e = r.value,
                      n = null == e ? void 0 : e.key,
                      l = e && (e.isAll ? F : P)
                    if ((L(t instanceof c ? t : (0, ke.p$)(t)), e)) {
                      const t = l(n)
                      H.getValue() === t ? ((e.isNew = !1), (e.dirty = !1)) : e.dirty || ((e.value = t), ne())
                    }
                  } else L(t)
                }
                function ie(e) {
                  ;(0, xe.nk)(("ArrowDown" === e.key ? 1 : e.target !== l.value && -1) || 0)
                }
                return (
                  (0, pe.dl)(() => {
                    var e
                    const l = n.value,
                      { id: a } = t.script.props,
                      o = (0, $.K0)()
                    w(p, l, "focusin", k),
                      null == (e = r.value ? H : O) || e.focus(),
                      (0, $.gj)("GetValueStore", a, void 0, (T = { tab: { id: Math.random() - 2 }, [S]: 0 })).then(
                        (e) => {
                          const t = !f.value
                          L(e) && t && U.value.length && R(!0), (u.value = !1)
                        }
                      ),
                      (W = [
                        () => w(m, l, "focusin", k),
                        xe.$J.register("pageup", () => V(-1), _),
                        xe.$J.register("pagedown", () => V(1), _),
                        (0, _e.Z)("valueEditor", (e) => {
                          if (((j = e), (E = " ".repeat((null == e ? void 0 : e.tabSize) || 2)), H && e))
                            for (const t in e) "mode" !== t && H.setOption(t, e[t])
                        }),
                      ]),
                      (I = g.runtime.connect({
                        name:
                          Bt.vy +
                          JSON.stringify({ cfg: { value: a }, id: null == o ? void 0 : o[Bt.vy](oe), tabId: T.tab.id }),
                      })),
                      o || I.onMessage.addListener(oe),
                      (s.value = !0)
                  }),
                  (0, pe.se)(() => {
                    var e, t
                    ;(s.value = !1),
                      null == (e = W) || e.forEach((e) => e()),
                      null == (t = I) || t.disconnect(),
                      (W = I = null)
                  }),
                  (0, pe.YP)(r, (e, t) => {
                    if (e)
                      (O = (0, Z.vY)()),
                        (0, pe.Y3)(() => {
                          const n = o.value
                          if (((H = n.cm), t && n.updateValue(e.value), e.isNew)) {
                            const e = a.value
                            e.setSelectionRange(0, 0), e.focus()
                          } else H.setCursor(0, 0), H.focus()
                        })
                    else if (t) {
                      var n
                      null == (n = O) || n.focus()
                    }
                  }),
                  (0, pe.YP)(d, () => {
                    ;(O = null), R()
                  }),
                  (t, c) => (
                    (0, pe.wg)(),
                    (0, pe.iD)(
                      "div",
                      { class: "edit-values flex", ref_key: "$el", ref: n, "data-editing": r.value && "" },
                      [
                        (0, pe._)("div", An, [
                          (0, pe._)("nav", qn, [
                            e.readOnly
                              ? (0, pe.kq)("", !0)
                              : ((0, pe.wg)(),
                                (0, pe.iD)("a", { key: 0, onClick: K, class: "btn-ghost", tabindex: "0" }, [
                                  (0, pe.Wm)((0, M.SU)(De.Z), { name: "plus" }),
                                ])),
                            z.value > 1
                              ? ((0, pe.wg)(),
                                (0, pe.iD)(
                                  pe.HY,
                                  { key: 1 },
                                  [
                                    (0, pe._)(
                                      "a",
                                      {
                                        onClick: c[0] || (c[0] = (e) => V(-1)),
                                        class: (0, me.C_)(["btn-ghost", { subtle: 1 === d.value }]),
                                        tabindex: "0",
                                      },
                                      "\u23f4",
                                      2
                                    ),
                                    (0, pe.wy)(
                                      (0, pe._)(
                                        "input",
                                        {
                                          "onUpdate:modelValue": c[1] || (c[1] = (e) => (d.value = e)),
                                          type: "number",
                                          onWheel: c[2] || (c[2] = (e) => V(e.deltaY > 0 ? 1 : -1)),
                                        },
                                        null,
                                        544
                                      ),
                                      [[Ce.nr, d.value]]
                                    ),
                                    (0, pe._)("span", { textContent: (0, me.zw)(`\xa0/\xa0${z.value}`) }, null, 8, Nn),
                                    (0, pe._)(
                                      "a",
                                      {
                                        onClick: c[3] || (c[3] = (e) => V(1)),
                                        class: (0, me.C_)(["btn-ghost", { subtle: d.value >= z.value }]),
                                        tabindex: "0",
                                      },
                                      "\u23f5",
                                      2
                                    ),
                                  ],
                                  64
                                ))
                              : (0, pe.kq)("", !0),
                            (0, pe.Wm)((0, M.SU)(Se.Z), null, {
                              content: (0, pe.w5)(() => [
                                (0, pe._)("ul", null, [
                                  Bn,
                                  Jn,
                                  (0, pe._)("li", null, [
                                    (0, pe._)("span", null, [
                                      Gn,
                                      (0, pe.Uk)(": " + (0, me.zw)(t.i18n("buttonEdit")) + ",", 1),
                                    ]),
                                  ]),
                                  e.readOnly
                                    ? (0, pe.kq)("", !0)
                                    : ((0, pe.wg)(),
                                      (0, pe.iD)("li", Xn, [
                                        (0, pe._)("span", null, [
                                          Qn,
                                          (0, pe.Uk)(": " + (0, me.zw)(t.i18n("buttonRemove")), 1),
                                        ]),
                                      ])),
                                ]),
                              ]),
                              default: (0, pe.w5)(() => [
                                (0, pe._)("a", Kn, [(0, pe.Wm)((0, M.SU)(De.Z), { name: "info" })]),
                              ]),
                              _: 1,
                            }),
                          ]),
                          (0, pe._)(
                            "div",
                            {
                              class: "edit-values-table main",
                              style: (0, me.j5)(D.value.style),
                              onKeydown: [
                                (0, Ce.D2)((0, Ce.iM)(ie, ["exact"]), ["down"]),
                                (0, Ce.D2)((0, Ce.iM)(ie, ["exact"]), ["up"]),
                              ],
                            },
                            [
                              (0, pe._)(
                                "a",
                                {
                                  ref_key: "$editAll",
                                  ref: l,
                                  class: "edit-values-row flex",
                                  onClick: Q,
                                  tabindex: "0",
                                  textContent: (0, me.zw)(t.i18n("editValueAllHint")),
                                },
                                null,
                                8,
                                tl
                              ),
                              ((0, pe.wg)(!0),
                              (0, pe.iD)(
                                pe.HY,
                                null,
                                (0, pe.Ko)(
                                  D.value,
                                  (t) => (
                                    (0, pe.wg)(),
                                    (0, pe.iD)(
                                      "div",
                                      {
                                        key: t,
                                        class: "edit-values-row flex monospace-font",
                                        onKeydown: (0, Ce.D2)(
                                          (0, Ce.iM)((e) => J(t), ["ctrl", "exact"]),
                                          ["delete"]
                                        ),
                                        onClick: (e) => X(t),
                                      },
                                      [
                                        (0, pe._)("div", ll, [
                                          (0, pe._)("a", { textContent: (0, me.zw)(t), tabindex: "0" }, null, 8, al),
                                        ]),
                                        (0, pe._)(
                                          "div",
                                          { class: "ellipsis flex-auto", textContent: (0, me.zw)(P(t, !0)) },
                                          null,
                                          8,
                                          ol
                                        ),
                                        (0, pe._)("pre", { textContent: (0, me.zw)(Y(t)) }, null, 8, il),
                                        e.readOnly
                                          ? (0, pe.kq)("", !0)
                                          : ((0, pe.wg)(),
                                            (0, pe.iD)(
                                              "div",
                                              { key: 0, class: "del", onClick: (0, Ce.iM)((e) => J(t), ["stop"]) },
                                              [(0, pe.Wm)((0, M.SU)(De.Z), { name: "trash" })],
                                              8,
                                              sl
                                            )),
                                      ],
                                      40,
                                      nl
                                    )
                                  )
                                ),
                                128
                              )),
                            ],
                            44,
                            el
                          ),
                          u.value || U.value.length
                            ? (0, pe.kq)("", !0)
                            : ((0, pe.wg)(),
                              (0, pe.iD)(
                                "div",
                                {
                                  key: 0,
                                  class: "edit-values-empty mt-1",
                                  textContent: (0, me.zw)(t.i18n("noValues")),
                                },
                                null,
                                8,
                                rl
                              )),
                          h.value
                            ? ((0, pe.wg)(),
                              (0, pe.iD)(
                                "h3",
                                { key: 1, textContent: (0, me.zw)(t.i18n("headerRecycleBin")) },
                                null,
                                8,
                                ul
                              ))
                            : (0, pe.kq)("", !0),
                          h.value
                            ? ((0, pe.wg)(),
                              (0, pe.iD)(
                                "div",
                                {
                                  key: 2,
                                  class: "edit-values-table trash monospace-font",
                                  onKeydown: [
                                    (0, Ce.D2)((0, Ce.iM)(ie, ["exact"]), ["down"]),
                                    (0, Ce.D2)((0, Ce.iM)(ie, ["exact"]), ["up"]),
                                  ],
                                  style: (0, me.j5)(b.value),
                                },
                                [
                                  ((0, pe.wg)(!0),
                                  (0, pe.iD)(
                                    pe.HY,
                                    null,
                                    (0, pe.Ko)(
                                      h.value,
                                      ({ key: e, cut: t, len: n }, l) => (
                                        (0, pe.wg)(),
                                        (0, pe.iD)(
                                          "div",
                                          { key: l, class: "edit-values-row flex", onClick: (e) => G(l) },
                                          [
                                            (0, pe._)(
                                              "a",
                                              { class: "ellipsis", textContent: (0, me.zw)(e), tabindex: "0" },
                                              null,
                                              8,
                                              pl
                                            ),
                                            (0, pe._)(
                                              "s",
                                              { class: "ellipsis flex-auto", textContent: (0, me.zw)(t) },
                                              null,
                                              8,
                                              ml
                                            ),
                                            (0, pe._)("pre", { textContent: (0, me.zw)(n) }, null, 8, gl),
                                          ],
                                          8,
                                          dl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ],
                                44,
                                cl
                              ))
                            : (0, pe.kq)("", !0),
                        ]),
                        r.value
                          ? ((0, pe.wg)(),
                            (0, pe.iD)("div", vl, [
                              (0, pe._)("div", fl, [
                                (0, pe._)(
                                  "h4",
                                  {
                                    textContent: (0, me.zw)(
                                      r.value.isAll ? t.i18n("labelEditValueAll") : t.i18n("labelEditValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  hl
                                ),
                                (0, pe._)("div", wl, [
                                  (0, pe._)(
                                    "a",
                                    {
                                      tabindex: "0",
                                      class: "mr-1 flex",
                                      onClick: c[4] || (c[4] = (e) => (i.value = !i.value)),
                                    },
                                    [
                                      (0, pe.Wm)(
                                        (0, M.SU)(De.Z),
                                        { name: "cog", class: (0, me.C_)({ active: i.value }) },
                                        null,
                                        8,
                                        ["class"]
                                      ),
                                    ]
                                  ),
                                  ((0, pe.wg)(!0),
                                  (0, pe.iD)(
                                    pe.HY,
                                    null,
                                    (0, pe.Ko)(
                                      [t.i18n("buttonOK"), t.i18n("buttonApply")],
                                      (e, t) => (
                                        (0, pe.wg)(),
                                        (0, pe.iD)(
                                          "button",
                                          {
                                            key: e,
                                            textContent: (0, me.zw)(e),
                                            onClick: (e) => ee(t),
                                            class: (0, me.C_)({ "has-error": r.value.error, "save-beacon": !t }),
                                            title: r.value.error,
                                            disabled: r.value.error || !r.value.dirty,
                                          },
                                          null,
                                          10,
                                          bl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, pe._)(
                                    "button",
                                    { textContent: (0, me.zw)(t.i18n("buttonCancel")), onClick: te, title: "Esc" },
                                    null,
                                    8,
                                    yl
                                  ),
                                ]),
                              ]),
                              i.value
                                ? ((0, pe.wg)(),
                                  (0, pe.iD)(
                                    pe.HY,
                                    { key: 0 },
                                    [
                                      (0, pe._)(
                                        "p",
                                        { class: "my-1", innerHTML: t.i18n("descEditorOptions") },
                                        null,
                                        8,
                                        xl
                                      ),
                                      (0, pe.Wm)(
                                        (0, M.SU)(Fn.Z),
                                        { name: "valueEditor", json: "", onDblclick: (0, M.SU)(de), "has-save": !1 },
                                        null,
                                        8,
                                        ["onDblclick"]
                                      ),
                                    ],
                                    64
                                  ))
                                : (0, pe.kq)("", !0),
                              (0, pe.wy)(
                                (0, pe._)(
                                  "label",
                                  null,
                                  [
                                    (0, pe._)(
                                      "span",
                                      { textContent: (0, me.zw)(t.i18n("valueLabelKey")) },
                                      null,
                                      8,
                                      Cl
                                    ),
                                    (0, pe.wy)(
                                      (0, pe._)(
                                        "input",
                                        {
                                          type: "text",
                                          "onUpdate:modelValue": c[5] || (c[5] = (e) => (r.value.key = e)),
                                          readOnly: !r.value.isNew || e.readOnly,
                                          ref_key: "$key",
                                          ref: a,
                                          spellcheck: "false",
                                          onKeydown: [ae, (0, Ce.D2)((0, Ce.iM)(te, ["exact", "stop"]), ["esc"])],
                                        },
                                        null,
                                        40,
                                        _l
                                      ),
                                      [[Ce.nr, r.value.key]]
                                    ),
                                  ],
                                  512
                                ),
                                [[Ce.F8, !r.value.isAll]]
                              ),
                              (0, pe._)("label", null, [
                                (0, pe._)(
                                  "span",
                                  {
                                    textContent: (0, me.zw)(
                                      r.value.isAll ? t.i18n("valueLabelValueAll") : t.i18n("valueLabelValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  kl
                                ),
                                (0, pe.Wm)(
                                  (0, M.SU)(Nt.Z),
                                  {
                                    value: r.value.value,
                                    "cm-options": (0, M.SU)(j),
                                    ref_key: "$value",
                                    ref: o,
                                    class: "h-100 mt-1",
                                    mode: "application/json",
                                    readOnly: e.readOnly,
                                    onCodeDirty: ne,
                                    onKeydownCapture:
                                      c[6] ||
                                      (c[6] = (0, Ce.D2)(
                                        (0, Ce.iM)(() => {}, ["shift", "exact", "stop"]),
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
                          : (0, pe.kq)("", !0),
                      ],
                      8,
                      Ln
                    )
                  )
                )
              },
            },
            Ul = Sl,
            zl = { class: "edit-help mb-2c" },
            Dl = ["innerHTML"],
            $l = (0, pe._)(
              "a",
              { href: "https://violentmonkey.github.io/api/", rel: "noopener noreferrer", target: "_blank" },
              "violentmonkey.github.io/api/",
              -1
            ),
            Hl = { class: "keyboard" },
            jl = ["textContent"],
            Wl = ["textContent"],
            Zl = ["textContent"],
            Ol = {
              __name: "help",
              props: { hotkeys: Array },
              setup: (e) => (t, n) => (
                (0, pe.wg)(),
                (0, pe.iD)("div", zl, [
                  (0, pe._)("div", null, [
                    (0, pe._)("h3", { innerHTML: t.i18n("editHelpDocumention") }, null, 8, Dl),
                    $l,
                  ]),
                  (0, pe._)("div", Hl, [
                    (0, pe._)("h3", { textContent: (0, me.zw)(t.i18n("editHelpKeyboard")) }, null, 8, jl),
                    ((0, pe.wg)(!0),
                    (0, pe.iD)(
                      pe.HY,
                      null,
                      (0, pe.Ko)(
                        e.hotkeys,
                        ([e, t]) => (
                          (0, pe.wg)(),
                          (0, pe.iD)("dl", { key: e }, [
                            (0, pe._)("dt", { class: "monospace-font", textContent: (0, me.zw)(e) }, null, 8, Wl),
                            (0, pe._)("dd", { textContent: (0, me.zw)(t) }, null, 8, Zl),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                ])
              ),
            },
            Ml = { class: "edit-header flex mr-1c" },
            Tl = ["textContent", "onClick"],
            Il = { class: "edit-name text-center ellipsis flex-1" },
            El = ["textContent"],
            Rl = ["textContent"],
            Vl = { key: 1, class: "edit-hint text-right ellipsis" },
            Yl = ["href", "textContent"],
            Pl = { class: "mr-1" },
            Fl = ["textContent", "disabled", "title"],
            Ll = ["textContent", "disabled"],
            Al = ["textContent"],
            ql = { key: 0, class: "frozen-note shelf mr-2c flex flex-wrap" },
            Nl = ["textContent"],
            Kl = { key: 1, class: "shelf fatal" },
            Bl = ["textContent"],
            Jl = { key: 2, class: "errors shelf my-1c" },
            Gl = ["textContent"],
            Xl = ["textContent"],
            Ql = { key: 1, class: "my-1" },
            ea = "https://violentmonkey.github.io/api/matching/",
            ta = { [X]: "", [J]: "", [ae]: "", [B]: "", [G]: "", [te]: !0, [Q]: !0, [ne]: !0, [ee]: !0, tags: "" },
            na = (e) => ("" !== e ? e : null),
            la = [L, A, q, N],
            aa = (e) =>
              e.trim()
                ? e
                    .split("\n")
                    .map((e) => e.trim())
                    .filter(r)
                : null,
            oa = [l, a],
            ia = (e) => e || null,
            sa = (e, t) => (e < t ? -1 : e > t),
            ra = ({ shouldUpdate: e, _editable: t }) => +e && e + t,
            ua = (e, t) => {
              if (t >= 0) {
                const n = e.lastIndexOf("\n", t) + 1,
                  l = e.indexOf("\n", t)
                return e.slice(n, l > 0 ? l : void 0)
              }
            },
            ca = /#/,
            da = {
              __name: "index",
              props: { initial: c, initialCode: String, readOnly: r },
              emits: ["close"],
              setup(t, { emit: n }) {
                let l, a, o, i, r, u
                const d = n,
                  m = t,
                  v = (0, M.iH)(),
                  f = (0, M.iH)(),
                  h = (0, M.iH)("code"),
                  x = (0, M.iH)(!1),
                  C = (0, M.iH)(),
                  _ = (0, M.iH)(""),
                  k = (0, M.iH)(!1),
                  S = { save: R, close: V },
                  U = (0, M.iH)(),
                  z = (0, M.iH)(),
                  D = (0, pe.Fl)(() => {
                    for (let e = 0, t = ["meta", "custom"]; e < t.length; e++) {
                      const n = t[e]
                      for (let e = 0; e < la.length; e++) {
                        const t = la[e]
                        let l = C.value[n][t]
                        if (l && (l = s(l) ? l.find(ca.test, ca) : ua(l, l.indexOf("#"))))
                          return l.length > 100 ? l.slice(0, 100) + "..." : l
                      }
                    }
                  }),
                  H = (0, M.iH)(),
                  j = (0, M.iH)(!1),
                  O = (0, M.iH)(!1),
                  I = (0, pe.Fl)(() => {
                    const {
                        meta: e,
                        props: { id: t },
                        $cache: n = {},
                      } = C.value,
                      l = e.require.length && "@require",
                      a = !(0, $.xb)(e.resources) && "@resource",
                      o = n[le]
                    return {
                      code: (0, $.ag)("editNavCode"),
                      settings: (0, $.ag)("editNavSettings"),
                      ...(t && { values: (0, $.ag)("editNavValues") + (o ? ` (${(0, $.aj)(o)})` : "") }),
                      ...((l || a) && { externals: w($.Hv, [l, a], "/") }),
                      help: "?",
                    }
                  }),
                  E = (0, pe.Fl)(() => (F.title = (0, $.pV)(C.value)))
                ;(0, pe.YP)(
                  h,
                  async (e) => {
                    await (0, pe.Y3)(), "code" === e ? l.focus() : (0, Z.wO)(f.value.$el)
                  },
                  { immediate: !0 }
                ),
                  (0, pe.YP)(x, (e) => {
                    u(e), xe.$J.setContext("canSave", e)
                  }),
                  (0, pe.YP)(k, N),
                  (0, pe.YP)(C, (e) => {
                    const { custom: t, config: n } = e,
                      { shouldUpdate: l } = n
                    ;(n._editable = 2 === l),
                      (n.enabled = !!n.enabled),
                      (n.shouldUpdate = !!l),
                      (n.notifyUpdates = (0, $.jd)(n.notifyUpdates)),
                      (t.noframes = (0, $.jd)(t.noframes))
                    for (const e in ta) null == t[e] && (t[e] = ta[e])
                    for (let e = 0; e < oa.length; e++) {
                      const n = oa[e]
                      t[n] || (t[n] = "")
                    }
                    for (let e = 0; e < la.length; e++) {
                      const n = la[e],
                        l = t[n]
                      t[n] = l ? `${l.join("\n")}${l.length ? "\n" : ""}` : ""
                    }
                    q(), n.removed || (i = (0, ke.p$)(e))
                  })
                {
                  const e = m.initial
                  ;(_.value = m.initialCode),
                    (C.value = (0, ke.p$)(e)),
                    (0, pe.YP)(() => C.value.config, q, { deep: !0 }),
                    (0, pe.YP)(() => C.value.custom, q, { deep: !0 }),
                    (0, pe.YP)(
                      () => e.error,
                      (t) => {
                        t && (0, Z.PV)({ text: `${e.message}\n\n${t}` })
                      }
                    ),
                    (0, pe.YP)(
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
                      u = await (0, $.gj)("ParseScript", {
                        id: r,
                        code: a.getRealContent(),
                        config: { enabled: +t.enabled, notifyUpdates: o ? +o : null, shouldUpdate: ra(t) },
                        custom: {
                          ...(0, ke.zr)(n, c.keys(ta), na),
                          ...(0, ke.zr)(n, la, aa),
                          ...(0, ke.zr)(n, oa, ia),
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
                      (O.value = !1),
                      (z.value = u.errors),
                      (C.value = u.update),
                      d && !r && history.replaceState(null, E.value, `${y}/${d}`),
                      (H.value = null)
                  } catch (e) {
                    H.value = e.message.split("\n")
                  }
                }
                function V(e) {
                  var t
                  e || "code" === h.value
                    ? (d("close"), b && (null == (t = (0, Z.vY)()) || t.blur()))
                    : (h.value = "code")
                }
                async function Y() {
                  await R(), V(!0)
                }
                function P(e) {
                  const t = c.keys(I.value)
                  h.value = t[(t.indexOf(h.value) + e + t.length) % t.length]
                }
                function L() {
                  P(-1)
                }
                function A() {
                  P(1)
                }
                function q(e) {
                  const t = C.value,
                    { config: n } = t,
                    { removed: l } = n,
                    a = (t._remote = !!(0, $.TZ)(t)) && ra(n),
                    o = !(!l && 1 !== a && !m.readOnly)
                  ;(j.value = o), (O.value = !l && (o || a >= 1)), !l && e && N()
                }
                function N() {
                  x.value = k.value || !(0, ke.vZ)(C.value, i)
                }
                async function K(e) {
                  W.Z.get("editorWindow") &&
                    (e || (e = (await (null == $.oy ? void 0 : $.oy.getCurrent())) || {}),
                    "normal" === e.state &&
                      W.Z.set("editorWindowPos", (0, ke.zr)(e, ["left", "top", "width", "height"])))
                }
                function B({ id: e, tabs: t }) {
                  if (1 === t.length) {
                    const { onBoundsChanged: t } = g.windows
                    t
                      ? t.addListener((t) => {
                          t.id === e && K(t)
                        })
                      : (p("resize", (0, $.Ds)(K, 100)), (r = !0))
                  }
                }
                return (
                  (0, pe.bv)(() => {
                    var t
                    ;(a = v.value),
                      (l = a.cm),
                      (u = (0, T.Q$)(null, () => l.focus())),
                      W.Z.get("editorWindow") &&
                        1 === e.history.length &&
                        (null == (t = browser.windows) || t.getCurrent({ populate: !0 }).then(B))
                    const n = c.values(I.value),
                      o = (U.value = [
                        ["Alt-PageUp", ` ${n.join(" < ")}`],
                        ["Alt-PageDown", ` ${n.join(" > ")}`],
                        ...c.entries(a.expandKeyMap()).sort((e, t) => sa(e[1], t[1]) || sa(e[0], t[0])),
                      ])
                    se || re(o)
                  }),
                  (0, pe.dl)(() => {
                    document.body.classList.add("edit-open"),
                      (o = [
                        xe.$J.register("a-pageup", L),
                        xe.$J.register("a-pagedown", A),
                        xe.$J.register(se.replace(/(?:Ctrl|Cmd)-/i, "ctrlcmd-"), R),
                        xe.$J.register("escape", V),
                        xe.$J.register("f1", () => {
                          h.value = "help"
                        }),
                      ]),
                      (F.title = E.value)
                  }),
                  (0, pe.se)(() => {
                    var e
                    document.body.classList.remove("edit-open"),
                      (F.title = null),
                      u(!1),
                      null == (e = o) || e.forEach((e) => e())
                  }),
                  (e, n) => (
                    (0, pe.wg)(),
                    (0, pe.iD)(
                      "div",
                      { class: (0, me.C_)(["edit frame flex flex-col abs-full", { frozen: j.value }]) },
                      [
                        (0, pe._)("div", Ml, [
                          (0, pe._)("nav", null, [
                            ((0, pe.wg)(!0),
                            (0, pe.iD)(
                              pe.HY,
                              null,
                              (0, pe.Ko)(
                                I.value,
                                (e, t) => (
                                  (0, pe.wg)(),
                                  (0, pe.iD)(
                                    "div",
                                    {
                                      key: t,
                                      class: (0, me.C_)(["edit-nav-item", { active: h.value === t }]),
                                      textContent: (0, me.zw)(e),
                                      onClick: (e) => (h.value = t),
                                    },
                                    null,
                                    10,
                                    Tl
                                  )
                                )
                              ),
                              128
                            )),
                          ]),
                          (0, pe._)("div", Il, [
                            C.value.config.removed
                              ? ((0, pe.wg)(),
                                (0, pe.iD)(
                                  "span",
                                  {
                                    key: 0,
                                    class: "subtle",
                                    textContent: (0, me.zw)((0, M.SU)($.ag)("headerRecycleBin") + " / "),
                                  },
                                  null,
                                  8,
                                  El
                                ))
                              : (0, pe.kq)("", !0),
                            (0, pe.Uk)(" " + (0, me.zw)(E.value), 1),
                          ]),
                          j.value && "code" === h.value
                            ? ((0, pe.wg)(),
                              (0, pe.iD)(
                                "p",
                                {
                                  key: 0,
                                  textContent: (0, me.zw)((0, M.SU)($.ag)("readonly")),
                                  class: "text-upper text-right text-red",
                                },
                                null,
                                8,
                                Rl
                              ))
                            : ((0, pe.wg)(),
                              (0, pe.iD)("div", Vl, [
                                (0, pe._)(
                                  "a",
                                  {
                                    href: (0, M.SU)(Z.XB),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    textContent: (0, me.zw)((0, M.SU)($.ag)("editHowToHint")),
                                  },
                                  null,
                                  8,
                                  Yl
                                ),
                              ])),
                          (0, pe._)("div", Pl, [
                            (0, pe.wy)(
                              (0, pe._)(
                                "button",
                                {
                                  textContent: (0, me.zw)((0, M.SU)($.ag)("buttonSave")),
                                  onClick: R,
                                  disabled: !x.value,
                                  class: (0, me.C_)({ "has-error": (e.$fe = H.value || z.value) }),
                                  title: e.$fe,
                                },
                                null,
                                10,
                                Fl
                              ),
                              [[Ce.F8, x.value || !j.value]]
                            ),
                            (0, pe.wy)(
                              (0, pe._)(
                                "button",
                                {
                                  textContent: (0, me.zw)((0, M.SU)($.ag)("buttonSaveClose")),
                                  onClick: Y,
                                  disabled: !x.value,
                                },
                                null,
                                8,
                                Ll
                              ),
                              [[Ce.F8, x.value || !j.value]]
                            ),
                            (0, pe._)(
                              "button",
                              {
                                textContent: (0, me.zw)((0, M.SU)($.ag)("buttonClose")),
                                onClick: n[0] || (n[0] = (e) => V(!0)),
                                title: "Esc",
                              },
                              null,
                              8,
                              Al
                            ),
                          ]),
                        ]),
                        O.value && "code" === h.value
                          ? ((0, pe.wg)(),
                            (0, pe.iD)("div", ql, [
                              (0, pe._)("p", { textContent: (0, me.zw)((0, M.SU)($.ag)("readonlyNote")) }, null, 8, Nl),
                              ((0, pe.wg)(),
                              (0, pe.j4)(
                                pe.Ob,
                                null,
                                [
                                  (0, pe.Wm)((0, M.SU)(ln), { class: "flex ml-2c", script: C.value }, null, 8, [
                                    "script",
                                  ]),
                                ],
                                1024
                              )),
                            ]))
                          : (0, pe.kq)("", !0),
                        H.value
                          ? ((0, pe.wg)(),
                            (0, pe.iD)("p", Kl, [
                              (0, pe._)("b", { textContent: (0, me.zw)(H.value[0]) }, null, 8, Bl),
                              (0, pe.Uk)(" " + (0, me.zw)(H.value[1]), 1),
                            ]))
                          : (0, pe.kq)("", !0),
                        (0, pe.wy)(
                          (0, pe.Wm)(
                            (0, M.SU)(Nt.Z),
                            {
                              class: (0, me.C_)(["flex-auto", { readonly: j.value }]),
                              value: _.value,
                              readOnly: j.value,
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
                          [[Ce.F8, "code" === h.value]]
                        ),
                        ((0, pe.wg)(),
                        (0, pe.j4)(
                          pe.Ob,
                          { ref_key: "$tabBody", ref: f },
                          [
                            "settings" === h.value
                              ? ((0, pe.wg)(),
                                (0, pe.j4)(
                                  (0, M.SU)(Vn),
                                  (0, pe.dG)({ key: 0, class: "edit-body" }, { readOnly: t.readOnly, script: C.value }),
                                  null,
                                  16
                                ))
                              : "values" === h.value
                                ? ((0, pe.wg)(),
                                  (0, pe.j4)(
                                    (0, M.SU)(Ul),
                                    (0, pe.dG)(
                                      { key: 1, class: "edit-body" },
                                      { readOnly: t.readOnly, script: C.value }
                                    ),
                                    null,
                                    16
                                  ))
                                : "externals" === h.value
                                  ? ((0, pe.wg)(),
                                    (0, pe.j4)(
                                      (0, M.SU)(Kt.Z),
                                      { key: 2, class: "flex-auto", value: C.value },
                                      null,
                                      8,
                                      ["value"]
                                    ))
                                  : "help" === h.value
                                    ? ((0, pe.wg)(),
                                      (0, pe.j4)(
                                        (0, M.SU)(Ol),
                                        { key: 3, class: "edit-body", hotkeys: U.value },
                                        null,
                                        8,
                                        ["hotkeys"]
                                      ))
                                    : (0, pe.kq)("", !0),
                          ],
                          1536
                        )),
                        z.value || D.value
                          ? ((0, pe.wg)(),
                            (0, pe.iD)("div", Jl, [
                              D.value
                                ? ((0, pe.wg)(),
                                  (0, pe.j4)(
                                    (0, M.SU)($e.Z),
                                    { key: 0, "i18n-key": "hashPatternWarning" },
                                    {
                                      default: (0, pe.w5)(() => [
                                        (0, pe._)("code", { textContent: (0, me.zw)(D.value) }, null, 8, Gl),
                                      ]),
                                      _: 1,
                                    }
                                  ))
                                : (0, pe.kq)("", !0),
                              ((0, pe.wg)(!0),
                              (0, pe.iD)(
                                pe.HY,
                                null,
                                (0, pe.Ko)(
                                  z.value,
                                  (e) => (
                                    (0, pe.wg)(),
                                    (0, pe.iD)(
                                      "p",
                                      { key: e, textContent: (0, me.zw)(e), class: "text-red" },
                                      null,
                                      8,
                                      Xl
                                    )
                                  )
                                ),
                                128
                              )),
                              z.value
                                ? ((0, pe.wg)(),
                                  (0, pe.iD)("p", Ql, [
                                    (0, pe._)("a", {
                                      href: ea,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      textContent: ea,
                                    }),
                                  ]))
                                : (0, pe.kq)("", !0),
                            ]))
                          : (0, pe.kq)("", !0),
                      ],
                      2
                    )
                  )
                )
              },
            },
            pa = da,
            ma = { key: 0 },
            ga = { class: "flex" },
            va = { class: "btn-group" },
            fa = ["textContent"],
            ha = ["textContent"],
            wa = ["textContent"],
            ba = ["textContent"],
            ya = { key: 0, class: "btn-group" },
            xa = ["data-batch-action"],
            Ca = ["textContent"],
            _a = { key: 1, class: "ml-1" },
            ka = ["textContent"],
            Sa = ["textContent"],
            Ua = (0, pe._)("div", { class: "flex-auto" }, null, -1),
            za = ["value"],
            Da = ["textContent", "value"],
            $a = { class: "btn-ghost", tabindex: "0" },
            Ha = { class: "mr-2c" },
            ja = ["title", "placeholder"],
            Wa = { class: "filter-search-tooltip" },
            Za = ["textContent"],
            Oa = ["innerHTML"],
            Ma = { key: 0, class: "hint mx-1 my-1 flex flex-col" },
            Ta = ["textContent"],
            Ia = ["textContent"],
            Ea = ["textContent"],
            Ra = ["data-columns", "data-show-order", "data-table"],
            Va = "edit",
            Ya = "remove",
            Pa = "restore",
            Fa = "toggle",
            La = "undo",
            Aa = "update",
            qa = "tabScripts",
            Na = "scrollTop",
            Ka = {
              __name: "tab-installed",
              setup(e) {
                const n = {
                    sort: {
                      exec: { title: (0, $.ag)("filterExecutionOrder") },
                      alpha: {
                        title: (0, $.ag)("filterAlphabeticalOrder"),
                        compare: ({ $cache: { lowerName: e } }, { $cache: { lowerName: t } }) => (e < t ? -1 : e > t),
                      },
                      [Aa]: {
                        title: (0, $.ag)("filterLastUpdateOrder"),
                        compare: ({ props: { lastUpdated: e } }, { props: { lastUpdated: t } }) =>
                          (+t || 0) - (+e || 0),
                      },
                      size: { title: (0, $.ag)("filterSize"), compare: (e, t) => t.$cache.sizeNum - e.$cache.sizeNum },
                    },
                  },
                  l = (0, M.qj)({
                    searchScope: null,
                    showEnabledFirst: null,
                    showOrder: null,
                    viewSingleColumn: null,
                    viewTable: null,
                    sort: null,
                  })
                w(ke.SE, l, (e) => {
                  ;(0, _e.Z)(`filters.${e}`, (t) => {
                    ;(l[e] = t), "sort" !== e || n.sort[t] || (l[e] = c.keys(n.sort)[0])
                  })
                })
                const a = `${qa} && inputFocus`,
                  i = `${qa} && !inputFocus`,
                  s = `${i} && selectedScript && !showRecycle`,
                  u = `${i} && selectedScript && showRecycle`,
                  g = `${i} && !buttonFocus`,
                  f = `${i} && selectedScript && showHotkeys`,
                  h = { [Va]: "e", [Fa]: "space", [Aa]: "r", [Pa]: "r", [Ya]: "x" },
                  y = (e, t) => t.map(([t, n, l]) => xe.$J.register(t, e, { condition: n, caseSensitive: l }))
                let x,
                  C = 0,
                  _ = [],
                  S = []
                const U = (0, M.iH)(),
                  z = (0, M.iH)(),
                  D = (0, M.iH)(),
                  H = (0, M.iH)(),
                  j = (0, M.qj)({
                    focusedIndex: -1,
                    menuNew: !1,
                    showHotkeys: !1,
                    search: (F.search = { value: "", error: null, ...V("") }),
                    sortedScripts: [],
                    filteredScripts: [],
                    script: null,
                    code: "",
                    numColumns: 1,
                    batchRender: { limit: C },
                    batchAction: { action: null, [La]: null },
                  }),
                  I = (0, pe.Fl)(() => F.route.paths[0] === k),
                  E = (0, pe.Fl)(() => !I.value && "exec" === l.sort),
                  R = (0, pe.Fl)(() => Z.T && E.value),
                  Y = (0, pe.Fl)(() => {
                    var e
                    return null == (e = n.sort[l.sort]) ? void 0 : e.compare
                  }),
                  L = (0, pe.Fl)(() => j.filteredScripts[j.focusedIndex]),
                  A = (0, pe.Fl)(() =>
                    F.loading ||
                    (j.search.rules.length ? j.sortedScripts.find((e) => !1 !== e.$cache.show) : j.sortedScripts.length)
                      ? null
                      : (0, $.ag)("labelNoSearchScripts")
                  ),
                  q = (0, pe.Fl)(
                    () =>
                      j.search.rules.some((e) => !e.scope || "code" === e.scope) &&
                      F.scripts.filter((e) => null == e.$cache.code).map((e) => e.props.id)
                  ),
                  N = (0, pe.Fl)(() =>
                    j.search.tokens.filter((e) => "#" === e.prefix && !e.negative).map((e) => e.parsed)
                  ),
                  K = () => (I.value ? F.removedScripts : F.scripts),
                  B = (e) => e.target.closest("[data-batch-action]"),
                  J = {
                    [Fa]: {
                      icon: oe,
                      arg(e) {
                        const t = this.icon === oe ? 1 : 0
                        return e.filter((e) => +e.config.enabled !== t)
                      },
                      fn: (e) => d.all(e.map(He)),
                    },
                    [Aa]: { icon: "refresh", fn: je, [La]: !1 },
                    [Ya]: {
                      icon: "trash",
                      async fn(e, t, n) {
                        await d.all(e.map((e) => ue(e, !n))), n || (F.scripts = [])
                      },
                    },
                  },
                  G = (0, pe.Fl)(() => {
                    const e = j.filteredScripts,
                      t = e.length,
                      n = t === j.sortedScripts.length
                    let l = J,
                      a = 0,
                      o = 0
                    for (let t = 0; t < e.length; t++) {
                      const l = e[t]
                      ;(a += !l.config.enabled), n || (o += l.$canUpdate > 0)
                    }
                    return (
                      (l[Fa].icon = a ? oe : ie),
                      (l[Fa].num = a < t ? a : ""),
                      o ? (l[Aa].num = o < t ? o : "") : ({ [Aa]: o, ...l } = l),
                      l
                    )
                  }),
                  X = (0, $.Ds)(() => {
                    try {
                      ;(j.search = F.search = { ...j.search, ...V(j.search.value) }), (j.search.error = null)
                    } catch (e) {
                      j.search.error = e.message
                    }
                    const e = q.value
                    null != e && e.length && ve(e), ne()
                  }, 100),
                  Q = (0, $.Ds)(ge)
                function ee() {
                  !I.value &&
                    F.needRefresh &&
                    ((F.scripts = F.scripts.filter((e) => !e.config.removed)), (F.needRefresh = !1)),
                    (j.focusedIndex = -1),
                    ne()
                }
                async function te() {
                  const e = q.value
                  null != e && e.length && (await ve(e)), ne(), de()
                }
                function ne() {
                  const e = [...K()],
                    t = j.search.rules,
                    n = t.length ? P(e, t) : e.length,
                    a = Y.value
                  var o
                  a &&
                    e.sort(
                      ((o = a), l.showEnabledFirst ? (e, t) => t.config.enabled - e.config.enabled || o(e, t) : o)
                    ),
                    (j.sortedScripts = e),
                    (j.filteredScripts = t.length ? e.filter(({ $cache: e }) => e.show) : e),
                    we(j.focusedIndex),
                    !C || n < C ? ge() : Q()
                }
                async function le() {
                  try {
                    var e
                    let t = await (0, Z.GW)((0, $.ag)("hintInputURL"), { input: "", ok: { type: "submit" } })
                    ;(t = null == (e = t) ? void 0 : e.trim()),
                      t &&
                        (t.includes("://") || (t = `https://${t}`),
                        new URL(t),
                        await (0, $.gj)("ConfirmInstall", { url: t }))
                  } catch (e) {
                    ;(0, Z.PV)({ text: e.message || e })
                  }
                }
                async function ae(e, t) {
                  if (e === t) return
                  const n = j.filteredScripts,
                    l = F.scripts,
                    a = n[e],
                    o = l.indexOf(a),
                    i = l.indexOf(n[t]),
                    { id: s } = a.props
                  ;(await (0, $.gj)("Move", { id: s, offset: i - o })) &&
                    (l.splice(o, 1),
                    l.splice(i, 0, a),
                    l.forEach((e, t) => {
                      e.props.position = t + 1
                    }),
                    ne())
                }
                function se(e) {
                  W.Z.set("filters.sort", e.target.value)
                }
                function re(e) {
                  const n = w($.Hv, [I.value ? k : o, e], "/")
                  e || n !== (0, T.Qs)().pathname ? (0, T.pV)(n) : t.history.back()
                }
                async function de() {
                  const [e, t, n] = F.route.paths,
                    l = "_new" === t && (await (0, $.gj)("NewScript", +n)),
                    a = l ? l.script : +t && K().find((e) => e.props.id === +t)
                  if (a) return (j.code = l ? l.code : await (0, $.gj)("GetScriptCode", t)), void (j.script = a)
                  if (
                    (t && (0, T.pV)(e, !0),
                    F.canRenderScripts || ((F.canRenderScripts = !0), ir()),
                    ge(),
                    (j.script = null),
                    !b)
                  ) {
                    const e = H.value,
                      t = document.scrollingElement,
                      n = e[Na],
                      l = t[Na]
                    ;(0, pe.Y3)(() => {
                      ;(e[Na] = n), (t[Na] = l)
                    })
                  }
                }
                async function ge() {
                  if (!F.canRenderScripts) return
                  const { length: e } = j.sortedScripts
                  let t = 9
                  const n = (0, M.qj)({ limit: t })
                  j.batchRender = n
                  const l = v.now()
                  for (; t < e && n === j.batchRender; ) {
                    if (C && j.search.rules.length)
                      for (let n = 0; n < C && t < e; t += 1) n += j.sortedScripts[t].$cache.show ? 1 : 0
                    else t += C || 1
                    ;(n.limit = t),
                      await new d((e) => (0, pe.Y3)(e)),
                      !C && v.now() - l >= 100 && (C = 2 * t),
                      C && t < e && (await (0, $.dL)())
                  }
                }
                async function ve(e) {
                  const t = await (0, $.gj)("GetScriptCode", e)
                  F.scripts.forEach(({ $cache: e, props: { id: n } }) => {
                    n in t && (e.code = t[n])
                  }),
                    ne()
                }
                async function fe() {
                  ;(await (0, Z.GW)((0, $.ag)("buttonEmptyRecycleBin"))) &&
                    ((0, $.gj)("CheckRemove", { force: !0 }), (F.removedScripts = []))
                }
                function he() {
                  const e = l.viewTable ? _ : S
                  j.numColumns = l.viewSingleColumn ? 1 : e.findIndex((e) => t.innerWidth < e) + 1 || e.length + 1
                }
                function we(e) {
                  ;(e = Math.min(e, j.filteredScripts.length - 1)),
                    (e = Math.max(e, -1)) !== j.focusedIndex && (j.focusedIndex = e)
                }
                function be(e) {
                  e.config.removed ? (0, $.gj)("RemoveScripts", [e.props.id]) : ue(e, 1)
                }
                async function ye(e) {
                  try {
                    await ue(e, 0)
                  } catch (t) {
                    ;(0, Z.GW)(`${t.message || t}\n\n@namespace ${e.meta.namespace}\n@name ${e.meta.name}`, {
                      cancel: !1,
                    })
                  }
                }
                function He(e) {
                  return (0, $.gj)("UpdateScriptInfo", {
                    id: e.props.id,
                    config: { enabled: e.config.enabled ? 0 : 1 },
                  })
                }
                async function je(e, t) {
                  var n
                  t && (t = (t.querySelector("svg") || t).classList).add("rotate"),
                    await (0, $.gj)("CheckUpdate", e && (0, $.rY)(e).map((e) => e.props.id)),
                    null == (n = t) || n.remove("rotate")
                }
                function We(e) {
                  if (N.value.includes(e)) {
                    const t = j.search.tokens.filter((t) => !("#" === t.prefix && t.parsed === e))
                    j.search.value = t.map((e) => `${e.prefix}${e.raw}`).join(" ")
                  } else j.search.value = [j.search.value.trim(), `#${e} `].filter(r).join(" ")
                }
                function Ze(e) {
                  if (!e) return
                  const t = D.value
                  t.scroll({ top: t.scrollTop + e, behavior: "smooth" })
                }
                function Oe(e) {
                  if (F.batch) return
                  const t = B(e),
                    n = j.batchAction
                  let l = null == t ? void 0 : t.dataset.batchAction
                  if (n.action === l) {
                    const e = G.value[l] || {},
                      a = j.filteredScripts,
                      o = (null == e.arg ? void 0 : e.arg(a)) || a,
                      i = e.fn,
                      s = [i, o, t]
                    i && ce(...s),
                      (n[La] =
                        i &&
                        !1 !== e[La] &&
                        (() => {
                          ce(...s, La), (n[La] = null)
                        })),
                      (l = ""),
                      t.blur()
                  }
                  n.action = l
                }
                function Me() {
                  const e = () => {
                    var e
                    xe.$J.setContext("buttonFocus", (null == (e = (0, Z.vY)()) ? void 0 : e.tabIndex) >= 0)
                  }
                  p("focus", e, !0)
                  const t = [
                    () => m("focus", e, !0),
                    ...(b
                      ? [
                          xe.$J.register("tab", () => {
                            ;(0, xe.nk)(1)
                          }),
                          xe.$J.register("s-tab", () => {
                            ;(0, xe.nk)(-1)
                          }),
                        ]
                      : []),
                    ...y(() => {
                      var e
                      null == (e = z.value) || e.focus()
                    }, [
                      ["ctrlcmd-f", qa],
                      ["/", i, !0],
                    ]),
                    ...y(() => {
                      var e
                      null == (e = z.value) || e.blur()
                    }, [["enter", a]]),
                    ...y(() => {
                      j.showHotkeys = !1
                    }, [
                      ["escape", f],
                      ["q", f, !0],
                    ]),
                    ...y(() => {
                      let e = j.focusedIndex
                      e < 0 ? (e = 0) : (e += j.numColumns), e < j.filteredScripts.length && we(e)
                    }, [
                      ["ctrlcmd-down", qa],
                      ["down", qa],
                      ["j", i, !0],
                    ]),
                    ...y(() => {
                      const e = j.focusedIndex - j.numColumns
                      e >= 0 && we(e)
                    }, [
                      ["ctrlcmd-up", qa],
                      ["up", qa],
                      ["k", i, !0],
                    ]),
                    ...y(() => {
                      we(j.focusedIndex - 1)
                    }, [
                      ["ctrlcmd-left", qa],
                      ["left", i],
                      ["h", i, !0],
                    ]),
                    ...y(() => {
                      we(j.focusedIndex + 1)
                    }, [
                      ["ctrlcmd-right", qa],
                      ["right", i],
                      ["l", i, !0],
                    ]),
                    ...y(() => {
                      we(0)
                    }, [
                      ["ctrlcmd-home", qa],
                      ["g g", i, !0],
                    ]),
                    ...y(() => {
                      we(j.filteredScripts.length - 1)
                    }, [
                      ["ctrlcmd-end", qa],
                      ["G", i, !0],
                    ]),
                    ...y(() => {
                      re(L.value.props.id)
                    }, [
                      [h[Va], s, !0],
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
                    }, [[h[Aa], s, !0]]),
                    ...y(() => {
                      He(L.value)
                    }, [[h[Fa], s, !0]]),
                    ...y(() => {
                      ye(L.value)
                    }, [[h[Pa], u, !0]]),
                    ...y(() => {
                      j.showHotkeys = !j.showHotkeys
                    }, [["?", i, !0]]),
                  ]
                  return () =>
                    t.forEach((e) => {
                      e()
                    })
                }
                function Te(e) {
                  B(e) || (j.batchAction.action = null)
                }
                ee(),
                  (0, pe.YP)(I, ee),
                  (0, pe.YP)(
                    () => F.canRenderScripts && D.value && E.value,
                    (e) => nt(D.value, ae, e)
                  ),
                  (0, pe.YP)(() => j.search.value, X),
                  (0, pe.YP)(() => [l.sort, l.showEnabledFirst], X),
                  screen.availWidth > 767 &&
                    ((0, pe.YP)(() => l.viewSingleColumn, he),
                    (0, pe.YP)(
                      () => l.viewTable,
                      (e) => {
                        if ((he(), e && !x)) {
                          x = (0, O.w)("-width: 76")
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
                  (0, pe.YP)(K, te),
                  (0, pe.YP)(() => F.route.paths[1], de),
                  (0, pe.YP)(
                    () => F.scripts,
                    (e) => {
                      !e.length && (e = U.value) && (e.focus(), e.click())
                    }
                  ),
                  (0, pe.YP)(L, (e) => {
                    xe.$J.setContext("selectedScript", e)
                  }),
                  (0, pe.YP)(
                    () => j.showHotkeys,
                    (e) => {
                      xe.$J.setContext("showHotkeys", e)
                    }
                  )
                const Ie = []
                return (
                  (0, pe.bv)(() => {
                    if ((F.loading || te(), !S.length)) {
                      const e =
                        (null == O.$ ? void 0 : O.$.textContent.match(/--columns-(cards|table)\b/)) &&
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
                  (0, pe.Jd)(() => {
                    Ie.forEach((e) => e())
                  }),
                  (e, t) => (
                    (0, pe.wg)(),
                    (0, pe.iD)(
                      "div",
                      { class: "tab-installed", ref_key: "scroller", ref: H },
                      [
                        (0, M.SU)(F).canRenderScripts
                          ? ((0, pe.wg)(),
                            (0, pe.iD)("div", ma, [
                              (0, pe._)("header", ga, [
                                I.value
                                  ? ((0, pe.wg)(),
                                    (0, pe.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "ml-2",
                                        textContent: (0, me.zw)((0, M.SU)($.ag)("headerRecycleBin")),
                                      },
                                      null,
                                      8,
                                      Sa
                                    ))
                                  : ((0, pe.wg)(),
                                    (0, pe.iD)(
                                      pe.HY,
                                      { key: 0 },
                                      [
                                        (0, pe._)("div", va, [
                                          (0, pe.Wm)(
                                            (0, M.SU)(Se.Z),
                                            {
                                              modelValue: j.menuNew,
                                              "onUpdate:modelValue": t[1] || (t[1] = (e) => (j.menuNew = e)),
                                              class: (0, me.C_)({ active: j.menuNew }),
                                              closeAfterClick: !0,
                                            },
                                            {
                                              content: (0, pe.w5)(() => [
                                                (0, pe._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, me.zw)((0, M.SU)($.ag)("buttonNew")),
                                                    tabindex: "0",
                                                    onClick:
                                                      t[0] || (t[0] = (0, Ce.iM)((e) => re("_new"), ["prevent"])),
                                                  },
                                                  null,
                                                  8,
                                                  fa
                                                ),
                                                (0, pe._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, me.zw)(
                                                      (0, M.SU)($.ag)("installFrom", "OpenUserJS")
                                                    ),
                                                    href: "https://openuserjs.org/",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  ha
                                                ),
                                                (0, pe._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, me.zw)(
                                                      (0, M.SU)($.ag)("installFrom", "GreasyFork")
                                                    ),
                                                    href: "https://greasyfork.org/scripts",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  wa
                                                ),
                                                (0, pe._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, me.zw)((0, M.SU)($.ag)("buttonInstallFromURL")),
                                                    tabindex: "0",
                                                    onClick: (0, Ce.iM)(le, ["prevent"]),
                                                  },
                                                  null,
                                                  8,
                                                  ba
                                                ),
                                              ]),
                                              default: (0, pe.w5)(() => [
                                                (0, pe.Wm)(
                                                  (0, M.SU)(Ue.Z),
                                                  {
                                                    content: (0, M.SU)($.ag)("buttonNew"),
                                                    placement: "bottom",
                                                    align: "start",
                                                    disabled: j.menuNew,
                                                  },
                                                  {
                                                    default: (0, pe.w5)(() => [
                                                      (0, pe._)(
                                                        "a",
                                                        {
                                                          class: "btn-ghost",
                                                          tabindex: "0",
                                                          ref_key: "$menuNew",
                                                          ref: U,
                                                        },
                                                        [(0, pe.Wm)((0, M.SU)(De.Z), { name: "plus" })],
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
                                          (0, pe.Wm)(
                                            (0, M.SU)(Ue.Z),
                                            {
                                              content: (0, M.SU)($.ag)("updateScriptsAll"),
                                              placement: "bottom",
                                              align: "start",
                                            },
                                            {
                                              default: (0, pe.w5)(() => [
                                                (0, pe._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    tabindex: "0",
                                                    onClick: t[2] || (t[2] = (e) => je(null, e.target)),
                                                  },
                                                  [(0, pe.Wm)((0, M.SU)(De.Z), { name: "refresh" })]
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                        ]),
                                        j.filteredScripts.length
                                          ? ((0, pe.wg)(),
                                            (0, pe.iD)("div", ya, [
                                              ((0, pe.wg)(!0),
                                              (0, pe.iD)(
                                                pe.HY,
                                                null,
                                                (0, pe.Ko)(
                                                  G.value,
                                                  ({ icon: e, num: t }, n) => (
                                                    (0, pe.wg)(),
                                                    (0, pe.iD)(
                                                      "a",
                                                      {
                                                        key: n,
                                                        class: (0, me.C_)([
                                                          "btn-ghost",
                                                          {
                                                            "has-error": j.batchAction.action === n,
                                                            disabled: (0, M.SU)(F).batch,
                                                          },
                                                        ]),
                                                        "data-batch-action": n,
                                                        tabindex: "0",
                                                        onClick: (0, Ce.iM)(Oe, ["prevent"]),
                                                      },
                                                      [
                                                        (0, pe.Wm)((0, M.SU)(De.Z), { name: e }, null, 8, ["name"]),
                                                        t
                                                          ? ((0, pe.wg)(),
                                                            (0, pe.iD)(
                                                              "sub",
                                                              { key: 0, textContent: (0, me.zw)(t) },
                                                              null,
                                                              8,
                                                              Ca
                                                            ))
                                                          : (0, pe.kq)("", !0),
                                                        j.batchAction.action === n
                                                          ? ((0, pe.wg)(), (0, pe.iD)("span", _a, "\u2757"))
                                                          : (0, pe.kq)("", !0),
                                                      ],
                                                      10,
                                                      xa
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                              (0, pe._)(
                                                "div",
                                                {
                                                  class: "btn-hint subtle",
                                                  textContent: (0, me.zw)(
                                                    (0, M.SU)($.ag)("hintForBatchAction", `${j.filteredScripts.length}`)
                                                  ),
                                                },
                                                null,
                                                8,
                                                ka
                                              ),
                                              (0, pe.Wm)(
                                                (0, M.SU)(Ue.Z),
                                                {
                                                  content: (0, M.SU)($.ag)("buttonUndo"),
                                                  placement: "bottom",
                                                  align: "start",
                                                },
                                                {
                                                  default: (0, pe.w5)(() => [
                                                    j.batchAction.undo
                                                      ? ((0, pe.wg)(),
                                                        (0, pe.iD)(
                                                          "a",
                                                          {
                                                            key: 0,
                                                            class: "btn-ghost",
                                                            tabindex: "0",
                                                            onClick:
                                                              t[3] ||
                                                              (t[3] = (0, Ce.iM)(
                                                                (...e) =>
                                                                  j.batchAction.undo && j.batchAction.undo(...e),
                                                                ["prevent"]
                                                              )),
                                                          },
                                                          [(0, pe.Wm)((0, M.SU)(De.Z), { name: "undo" })]
                                                        ))
                                                      : (0, pe.kq)("", !0),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["content"]
                                              ),
                                            ]))
                                          : (0, pe.kq)("", !0),
                                      ],
                                      64
                                    )),
                                Ua,
                                (0, pe.Wm)(
                                  (0, M.SU)($e.Z),
                                  { "i18n-key": "labelFilterSort", class: "ml-1" },
                                  {
                                    default: (0, pe.w5)(() => [
                                      (0, pe._)(
                                        "select",
                                        { value: l.sort, onChange: se, class: "h-100" },
                                        [
                                          ((0, pe.wg)(!0),
                                          (0, pe.iD)(
                                            pe.HY,
                                            null,
                                            (0, pe.Ko)(
                                              n.sort,
                                              (e, t) => (
                                                (0, pe.wg)(),
                                                (0, pe.iD)(
                                                  "option",
                                                  { textContent: (0, me.zw)(e.title), key: t, value: t },
                                                  null,
                                                  8,
                                                  Da
                                                )
                                              )
                                            ),
                                            128
                                          )),
                                        ],
                                        40,
                                        za
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                (0, pe.Wm)(
                                  (0, M.SU)(Se.Z),
                                  { align: "right", class: "filter-sort" },
                                  {
                                    content: (0, pe.w5)(() => [
                                      (0, pe.wy)(
                                        (0, pe._)(
                                          "div",
                                          null,
                                          [
                                            (0, pe.Wm)(
                                              (0, M.SU)(ze.Z),
                                              {
                                                name: "filters.showEnabledFirst",
                                                label: (0, M.SU)($.ag)("optionShowEnabledFirst"),
                                              },
                                              null,
                                              8,
                                              ["label"]
                                            ),
                                          ],
                                          512
                                        ),
                                        [[Ce.F8, Y.value]]
                                      ),
                                      (0, pe._)("div", null, [
                                        (0, pe.Wm)(
                                          (0, M.SU)(ze.Z),
                                          { name: "filters.showOrder", label: (0, M.SU)($.ag)("labelShowOrder") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                      (0, pe._)("div", Ha, [
                                        (0, pe.Wm)(
                                          (0, M.SU)(ze.Z),
                                          { name: "filters.viewTable", label: (0, M.SU)($.ag)("labelViewTable") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                        (0, pe.Wm)(
                                          (0, M.SU)(ze.Z),
                                          {
                                            name: "filters.viewSingleColumn",
                                            label: (0, M.SU)($.ag)("labelViewSingleColumn"),
                                          },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                    ]),
                                    default: (0, pe.w5)(() => [
                                      (0, pe.Wm)(
                                        (0, M.SU)(Ue.Z),
                                        { content: (0, M.SU)($.ag)("labelSettings"), placement: "bottom" },
                                        {
                                          default: (0, pe.w5)(() => [
                                            (0, pe._)("a", $a, [(0, pe.Wm)((0, M.SU)(De.Z), { name: "cog" })]),
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
                                (0, pe._)(
                                  "form",
                                  {
                                    class: "filter-search hidden-xs",
                                    onSubmit: t[5] || (t[5] = (0, Ce.iM)(() => {}, ["prevent"])),
                                    style: (0, me.j5)({
                                      "min-width": "10em",
                                      "max-width": 5 + Math.max(20, j.search.value.length) + "ex",
                                    }),
                                  },
                                  [
                                    (0, pe._)("label", null, [
                                      (0, pe.wy)(
                                        (0, pe._)(
                                          "input",
                                          {
                                            type: "search",
                                            class: (0, me.C_)({ "has-error": j.search.error }),
                                            title: j.search.error,
                                            placeholder: (0, M.SU)($.ag)("labelSearchScript"),
                                            "onUpdate:modelValue": t[4] || (t[4] = (e) => (j.search.value = e)),
                                            ref_key: "refSearch",
                                            ref: z,
                                            id: "installed-search",
                                          },
                                          null,
                                          10,
                                          ja
                                        ),
                                        [[Ce.nr, j.search.value]]
                                      ),
                                      (0, pe.Wm)((0, M.SU)(De.Z), { name: "search" }),
                                    ]),
                                  ],
                                  36
                                ),
                                (0, pe.Wm)(
                                  (0, M.SU)(Se.Z),
                                  { align: "right" },
                                  {
                                    content: (0, pe.w5)(() => [
                                      (0, pe._)("div", Wa, [
                                        j.search.error
                                          ? ((0, pe.wg)(),
                                            (0, pe.iD)(
                                              "div",
                                              { key: 0, class: "has-error", textContent: (0, me.zw)(j.search.error) },
                                              null,
                                              8,
                                              Za
                                            ))
                                          : (0, pe.kq)("", !0),
                                        (0, pe._)(
                                          "div",
                                          { innerHTML: (0, M.SU)($.ag)("titleSearchHintV2") },
                                          null,
                                          8,
                                          Oa
                                        ),
                                      ]),
                                    ]),
                                    default: (0, pe.w5)(() => [
                                      (0, pe._)(
                                        "a",
                                        {
                                          class: (0, me.C_)(["btn-ghost", { "has-error": j.search.error }]),
                                          tabindex: "0",
                                        },
                                        [(0, pe.Wm)((0, M.SU)(De.Z), { name: "question" })],
                                        2
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              I.value
                                ? ((0, pe.wg)(),
                                  (0, pe.iD)("div", Ma, [
                                    (0, pe._)(
                                      "span",
                                      { textContent: (0, me.zw)((0, M.SU)($.ag)("hintRecycleBin")) },
                                      null,
                                      8,
                                      Ta
                                    ),
                                    (0, M.SU)(F).removedScripts.length
                                      ? ((0, pe.wg)(),
                                        (0, pe.iD)(
                                          "a",
                                          {
                                            key: 0,
                                            textContent: (0, me.zw)((0, M.SU)($.ag)("buttonEmptyRecycleBin")),
                                            tabindex: "0",
                                            onClick: fe,
                                          },
                                          null,
                                          8,
                                          Ia
                                        ))
                                      : (0, pe.kq)("", !0),
                                  ]))
                                : A.value
                                  ? ((0, pe.wg)(),
                                    (0, pe.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "hint mx-1 my-1 flex flex-col",
                                        textContent: (0, me.zw)(A.value),
                                      },
                                      null,
                                      8,
                                      Ea
                                    ))
                                  : (0, pe.kq)("", !0),
                              (0, pe.wy)(
                                ((0, pe.wg)(),
                                (0, pe.iD)(
                                  "div",
                                  {
                                    class: "scripts",
                                    ref_key: "refList",
                                    ref: D,
                                    style: (0, me.j5)(`--num-columns:${j.numColumns}`),
                                    "data-columns": j.numColumns,
                                    "data-show-order": l.showOrder || null,
                                    "data-table": l.viewTable || null,
                                  },
                                  [
                                    ((0, pe.wg)(!0),
                                    (0, pe.iD)(
                                      pe.HY,
                                      null,
                                      (0, pe.Ko)(j.sortedScripts, (e, t) =>
                                        (0, pe.wy)(
                                          ((0, pe.wg)(),
                                          (0, pe.j4)(
                                            (0, M.SU)(qt),
                                            {
                                              key: e.props.id,
                                              focused: L.value === e,
                                              showHotkeys: j.showHotkeys,
                                              script: e,
                                              draggable: R.value,
                                              visible: t < j.batchRender.limit,
                                              viewTable: l.viewTable,
                                              hotkeys: h,
                                              activeTags: N.value,
                                              onRemove: be,
                                              onRestore: ye,
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
                                          [[Ce.F8, !j.search.rules.length || !1 !== e.$cache.show]]
                                        )
                                      ),
                                      128
                                    )),
                                  ],
                                  12,
                                  Ra
                                )),
                                [[(0, M.SU)(Z.Tu), !j.script]]
                              ),
                            ]))
                          : (0, pe.kq)("", !0),
                        ((0, pe.wg)(),
                        (0, pe.j4)(pe.lR, { to: "body" }, [
                          ((0, pe.wg)(),
                          (0, pe.j4)(
                            pe.Ob,
                            { key: (0, M.SU)(F).route.hash, max: 5 },
                            [
                              j.script
                                ? ((0, pe.wg)(),
                                  (0, pe.j4)(
                                    (0, M.SU)(pa),
                                    {
                                      key: 0,
                                      initial: j.script,
                                      "initial-code": j.code,
                                      "read-only": !!j.script.config.removed,
                                      onClose: t[6] || (t[6] = (e) => re()),
                                    },
                                    null,
                                    8,
                                    ["initial", "initial-code", "read-only"]
                                  ))
                                : (0, pe.kq)("", !0),
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
            Ba = Ka,
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
            uo = ["value", "textContent"],
            co = ["textContent"],
            po = ["onUpdate:modelValue"],
            mo = ["textContent"],
            go = { class: "mb-1c" },
            vo = ["textContent"],
            fo = { class: "ml-2c flex flex-col" },
            ho = { class: "ml-2c flex flex-col" },
            wo = { class: "mb-2c" },
            bo = ["textContent"],
            yo = (0, pe._)("hr", null, null, -1),
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
            Wo = (0, pe._)("code", null, "page", -1),
            Zo = ["textContent"],
            Oo = { key: 0 },
            Mo = (0, pe._)("code", null, "page", -1),
            To = ["textContent"],
            Io = ["href"],
            Eo = ["textContent"],
            Ro = ["textContent"],
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
            Fo = ["textContent", "disabled"],
            Lo = ["textContent", "title"],
            Ao = { class: "mt-1" },
            qo = (0, pe._)("br", null, null, -1),
            No = { class: "import-report" },
            Ko = ["data-type"],
            Bo = ["textContent"],
            Jo = ["textContent", "colspan"],
            Go = {
              __name: "vm-import",
              setup(e) {
                const t = (0, M.qj)([]),
                  n = (0, M.iH)(),
                  l = (0, M.iH)(""),
                  a = (0, $.ag)("confirmUndoImport"),
                  o = (0, $.ag)("labelImportScriptData"),
                  i = (0, $.ag)("labelImportSettings")
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
                  F.batch || ce(h, e)
                }
                async function h(e) {
                  if (!e) return
                  t.length = 0
                  const n = W.Z.get("importScriptData"),
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
                    h = W.Z.get("importSettings") && f.settings,
                    w = f.scripts || {},
                    b = f.values || {}
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
                  function D(e = "") {
                    const n = c.keys(p).length,
                      l = (0, $.ag)("msgImported", [n === m ? n : `${n} / ${m}`])
                    return (t[0].name = l), (t[0].text = e), l
                  }
                  function H(e) {
                    return (0, $.rY)(e).filter((e) => "string" == typeof e)
                  }
                  ;(r = (0, $.xA)()),
                    g.runtime.onConnect.addListener((e) => {
                      e.name === r &&
                        e.onMessage.addListener(([n, l]) => {
                          l ? ++C : ++_,
                            (t[1].name = (0, $.ag)("msgLoadingDependency", [C, _])),
                            C === _ ? ((n = (0, $.ag)("buttonOK")), e.disconnect()) : l || (n += "..."),
                            (t[1].text = n)
                        })
                    }),
                    u ||
                      ((x = " \u2bc8 " + new Date().toLocaleTimeString()),
                      (u = g.runtime.connect({ name: "undoImport" })),
                      await new d(y)),
                    await S(async (e, n, l) => {
                      const { meta: a, settings: o = {}, options: i } = n
                      if (!a || !i) return
                      const s = i.override || {}
                      ;(t[0].text = "Tampermonkey"),
                        (w[l] = {
                          config: { enabled: !1 !== o.enabled ? 1 : 0, shouldUpdate: i.check_for_updates ? 1 : 0 },
                          custom: {
                            [B]: "string" == typeof a.file_url ? a.file_url : void 0,
                            noframes: null == s.noframes ? void 0 : +!!s.noframes,
                            runAt: Bt.qh.test(i.run_at) ? i.run_at : void 0,
                            [q]: H(s.use_excludes),
                            [L]: H(s.use_includes),
                            [A]: H(s.use_matches),
                            [Q]: !1 !== s.merge_excludes,
                            [te]: !1 !== s.merge_includes,
                            [ne]: !1 !== s.merge_matches,
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
                        ;(p[n] = (await (0, $.gj)("ParseScript", c)).update.props.uri), D(s)
                      } catch (e) {
                        z(e, s, "script")
                      }
                    }, ".user.js"),
                    n &&
                      (await S(async (e, n, l) => {
                        ;(t[0].text = "Tampermonkey"), (b[p[l]] = n.data)
                      }, ".storage.json"),
                      (0, $.gj)("SetValueStores", b)),
                    s(h) && (delete h.sync, (0, $.gj)("SetOptions", h)),
                    (0, $.gj)("CheckPosition"),
                    await o.close(),
                    D(),
                    x && (l.value = x)
                }
                async function b() {
                  ;(await (0, Z.GW)(a)) && ((l.value = ""), u.postMessage(!0), await new d(y))
                }
                function y(e) {
                  w(D.V, u.onMessage, e)
                }
                function x(e) {
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
                      ;(await (0, Z.GW)((0, $.ag)("buttonImportData"))) && (await f(t))
                    }
                  return () => {
                    const e = F.route.hash === C ? p : m
                    e("dragend", l), e("dragleave", a), e("dragover", o), e("drop", i)
                  }
                }
                return (
                  (0, pe.bv)(() => {
                    const e = x(n.value)
                    p("hashchange", e), e()
                  }),
                  (e, s) => (
                    (0, pe.wg)(),
                    (0, pe.iD)("div", null, [
                      (0, pe._)(
                        "button",
                        {
                          textContent: (0, me.zw)((0, M.SU)($.ag)("buttonImportData")),
                          onClick: v,
                          ref_key: "buttonImport",
                          ref: n,
                          disabled: (0, M.SU)(F).batch,
                        },
                        null,
                        8,
                        Fo
                      ),
                      l.value
                        ? ((0, pe.wg)(),
                          (0, pe.iD)(
                            "button",
                            {
                              key: 0,
                              textContent: (0, me.zw)((0, M.SU)($.ag)("buttonUndo") + l.value),
                              onClick: b,
                              class: "has-error",
                              title: (0, M.SU)(a),
                            },
                            null,
                            8,
                            Lo
                          ))
                        : (0, pe.kq)("", !0),
                      (0, pe._)("div", Ao, [
                        (0, pe.Wm)((0, M.SU)(ze.Z), { name: "importScriptData", label: (0, M.SU)(o) }, null, 8, [
                          "label",
                        ]),
                        qo,
                        (0, pe.Wm)((0, M.SU)(ze.Z), { name: "importSettings", label: (0, M.SU)(i) }, null, 8, [
                          "label",
                        ]),
                      ]),
                      (0, pe._)("table", No, [
                        ((0, pe.wg)(!0),
                        (0, pe.iD)(
                          pe.HY,
                          null,
                          (0, pe.Ko)(
                            t,
                            ({ type: e, name: t, text: n }, l) => (
                              (0, pe.wg)(),
                              (0, pe.iD)(
                                "tr",
                                { key: l, "data-type": e },
                                [
                                  t
                                    ? ((0, pe.wg)(),
                                      (0, pe.iD)("td", { key: 0, textContent: (0, me.zw)(t) }, null, 8, Bo))
                                    : (0, pe.kq)("", !0),
                                  (0, pe._)("td", { textContent: (0, me.zw)(n), colspan: t ? null : 2 }, null, 8, Jo),
                                ],
                                8,
                                Ko
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
          const ni = (0, $.ag)("msgDateFormatInfo", c.keys(ei.q).join(", ")),
            li = {
              __name: "vm-date-info",
              setup: (e) => (e, t) => (
                (0, pe.wg)(),
                (0, pe.j4)(
                  (0, M.SU)(Ue.Z),
                  { content: (0, M.SU)(ni), placement: "left", style: { "vertical-align": "middle" } },
                  {
                    default: (0, pe.w5)(() => [
                      (0, pe._)("a", { href: "https://momentjs.com/docs/#/displaying/format/", target: "_blank" }, [
                        (0, pe.Wm)((0, M.SU)(De.Z), { name: "info" }),
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
            ui = { class: "modal-content" },
            ci = ["download", "href"],
            di = (0, pe._)("br", null, null, -1),
            pi = (0, pe._)("strong", null, "scripts.zip", -1),
            mi = {
              __name: "vm-export",
              setup(e) {
                let t
                const n = (0, M.iH)(),
                  l = (0, M.iH)(!1),
                  a = (0, M.iH)(b && {}),
                  o = (0, pe.Fl)(() => {
                    const e = n.value
                    return e && `${(0, ei.p)(e.text.trim() || e.defaultValue)}.zip`
                  })
                async function i() {
                  try {
                    ;(l.value = !0), b && !t && (t = await (0, $.gj)("UA")), s(await u())
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
                  } else (0, ti.l)(e, l)
                }
                function r(e) {
                  return e.replace(/[\\/:*?"<>|]/g, "-")
                }
                async function u() {
                  const e = W.Z.get("exportValues"),
                    t = await (0, $.gj)("ExportZip", { values: e }),
                    n = {},
                    l = { scripts: {}, settings: W.Z.get() }
                  delete l.settings.sync, e && (l.values = {})
                  const a = ((0, ke._M)(t, "items") || []).map(({ script: a, code: o }) => {
                    let i = r((0, $.pV)(a))
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
                  (0, pe.wg)(),
                  (0, pe.iD)("div", ai, [
                    (0, pe._)("div", oi, [
                      (0, pe._)(
                        "button",
                        { textContent: (0, me.zw)(e.i18n("buttonExportData")), onClick: i, disabled: l.value },
                        null,
                        8,
                        ii
                      ),
                      (0, pe.Wm)(
                        (0, M.SU)(Fn.Z),
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
                      (0, pe.Wm)((0, M.SU)(li)),
                      (0, pe._)("span", { hidden: "", textContent: (0, me.zw)(o.value) }, null, 8, si),
                    ]),
                    (0, pe._)("div", ri, [
                      (0, pe.Wm)(
                        (0, M.SU)(ze.Z),
                        { name: "exportValues", label: e.i18n("labelExportScriptData") },
                        null,
                        8,
                        ["label"]
                      ),
                    ]),
                    a.value
                      ? ((0, pe.wg)(),
                        (0, pe.j4)(
                          (0, M.SU)(Qo.Z),
                          {
                            key: 0,
                            transition: "in-out",
                            show: !!a.value.url,
                            onClose: t[0] || (t[0] = (e) => (a.value = {})),
                          },
                          {
                            default: (0, pe.w5)(() => [
                              (0, pe._)("div", ui, [
                                (0, pe._)(
                                  "a",
                                  { download: a.value.name, href: a.value.url },
                                  [(0, pe.Uk)(" Right click and save as"), di, pi],
                                  8,
                                  ci
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["show"]
                        ))
                      : (0, pe.kq)("", !0),
                  ])
                )
              },
            },
            gi = mi,
            vi = { class: "mr-1c" },
            fi = ["disabled", "textContent"],
            hi = ["disabled", "title", "textContent"],
            wi = {
              __name: "vm-maintenance",
              setup(e) {
                const t = (0, M.iH)((0, $.ag)("buttonVacuum")),
                  n = (0, $.ag)("buttonResetSettings"),
                  l = (0, M.iH)(""),
                  a = (0, M.iH)(n)
                async function o(e, t) {
                  if (await (0, Z.GW)(t, { ok: { className: "has-error" } })) return ce(e)
                }
                function i() {
                  const e = ["lastModified", "lastUpdate", "sync"],
                    t = w(ke.Xw, Yo.ZP, null, (t, n) => !e.includes(t) && !(0, ke.vZ)(n, W.Z.get(t)) && t)
                  return (
                    (l.value = JSON.stringify(t, null, 2)
                      .slice(1, -1)
                      .replace(/^\s{2}/gm, "")),
                    (a.value = `${n} (${c.keys(t).length})`),
                    (0, $.gj)("SetOptions", t)
                  )
                }
                async function s() {
                  await ce(async () => {
                    t.value = (0, $.ag)("buttonVacuuming")
                    const { fixes: e, errors: n } = await (0, $.gj)("Vacuum"),
                      l = null == n ? void 0 : n.join("\n")
                    ;(t.value = (0, $.ag)("buttonVacuumed") + (e ? ` (${e})` : "")),
                      l && (0, Z.GW)((0, $.ag)("msgErrorFetchingResource") + "\n\n" + l, { cancel: !1 })
                  })
                }
                return (e, r) => (
                  (0, pe.wg)(),
                  (0, pe.iD)("div", vi, [
                    (0, pe.Wm)(
                      (0, M.SU)(Ue.Z),
                      { content: (0, M.SU)($.ag)("hintVacuum") },
                      {
                        default: (0, pe.w5)(() => [
                          (0, pe._)(
                            "button",
                            { onClick: s, disabled: (0, M.SU)(F).batch, textContent: (0, me.zw)(t.value) },
                            null,
                            8,
                            fi
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["content"]
                    ),
                    (0, pe._)(
                      "button",
                      {
                        onClick: r[0] || (r[0] = (e) => o(i, (0, M.SU)(n))),
                        disabled: (0, M.SU)(F).batch,
                        title: l.value,
                        textContent: (0, me.zw)(a.value),
                      },
                      null,
                      8,
                      hi
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
            Zi = ["textContent"],
            Oi = ["disabled"],
            Mi = { class: "inline-block" },
            Ti = ["textContent"],
            Ii = ["disabled"],
            Ei = ["disabled"],
            Ri = ["textContent"],
            Vi = ["textContent", "disabled"],
            Yi = { key: 2 },
            Pi = "sync.current",
            Fi = { current: "" }
          ;(0, _e.Z)(Pi, (e) => {
            Fi.current = e || ""
          })
          const Li = {
            components: { SettingCheck: ze.Z, Icon: De.Z, Tooltip: Ue.Z },
            data: () => ({ syncConfig: Fi, store: F }),
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
                ;(0, $.gj)("SyncSetConfig", this.state.userConfig)
              },
              onSyncChange(e) {
                const { value: t } = e.target
                W.Z.set(Pi, t)
              },
              onAuthorize() {
                const { service: e } = this
                ;["authorized"].includes(e.authState)
                  ? (0, $.gj)("SyncRevoke")
                  : ["no-auth", "unauthorized", "error"].includes(e.authState) && (0, $.gj)("SyncAuthorize")
              },
              onSync() {
                ;(0, $.gj)("SyncStart")
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
          var Ai = z(3744)
          const qi = (0, Ai.Z)(Li, [
            [
              "render",
              (e, t, n, l, a, o) => {
                var i, s
                const r = (0, pe.up)("icon"),
                  u = (0, pe.up)("tooltip"),
                  c = (0, pe.up)("setting-check")
                return (
                  (0, pe.wg)(),
                  (0, pe.iD)("section", bi, [
                    (0, pe._)("h3", { textContent: (0, me.zw)(e.i18n("labelSync")) }, null, 8, yi),
                    o.state
                      ? ((0, pe.wg)(),
                        (0, pe.iD)("div", xi, [
                          (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelSyncService")) }, null, 8, Ci),
                          (0, pe._)(
                            "select",
                            {
                              class: "mx-1",
                              value: a.syncConfig.current,
                              onChange: t[0] || (t[0] = (...e) => o.onSyncChange && o.onSyncChange(...e)),
                            },
                            [
                              ((0, pe.wg)(!0),
                              (0, pe.iD)(
                                pe.HY,
                                null,
                                (0, pe.Ko)(
                                  o.syncServices,
                                  (e) => (
                                    (0, pe.wg)(),
                                    (0, pe.iD)(
                                      "option",
                                      { key: e.name, textContent: (0, me.zw)(e.displayName), value: e.name },
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
                            ? ((0, pe.wg)(),
                              (0, pe.iD)(
                                "button",
                                {
                                  key: 0,
                                  textContent: (0, me.zw)(o.state.label),
                                  disabled: !o.state.canAuthorize,
                                  onClick: t[1] || (t[1] = (...e) => o.onAuthorize && o.onAuthorize(...e)),
                                },
                                null,
                                8,
                                Si
                              ))
                            : (0, pe.kq)("", !0),
                          o.service.name
                            ? ((0, pe.wg)(),
                              (0, pe.j4)(
                                u,
                                { key: 1, content: e.i18n("labelSync"), class: "stretch-self flex mr-1" },
                                {
                                  default: (0, pe.w5)(() => [
                                    (0, pe._)(
                                      "button",
                                      {
                                        disabled: !o.state.canSync,
                                        onClick: t[2] || (t[2] = (...e) => o.onSync && o.onSync(...e)),
                                        class: "flex center-items",
                                      },
                                      [(0, pe.Wm)(r, { name: "refresh" })],
                                      8,
                                      Ui
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["content"]
                              ))
                            : (0, pe.kq)("", !0),
                          o.state
                            ? ((0, pe.wg)(),
                              (0, pe.iD)("p", { key: 2, textContent: (0, me.zw)(o.state.message) }, null, 8, zi))
                            : (0, pe.kq)("", !0),
                        ]))
                      : (0, pe.kq)("", !0),
                    "password" === (null == (i = o.state) ? void 0 : i.authType)
                      ? ((0, pe.wg)(),
                        (0, pe.iD)("fieldset", Di, [
                          (0, pe._)("label", $i, [
                            (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelSyncServerUrl")) }, null, 8, Hi),
                            (0, pe.wy)(
                              (0, pe._)(
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
                              [[Ce.nr, o.state.userConfig.serverUrl]]
                            ),
                          ]),
                          (0, pe._)("div", Wi, [
                            (0, pe._)("label", null, [
                              (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelSyncUsername")) }, null, 8, Zi),
                              (0, pe.wy)(
                                (0, pe._)(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": t[4] || (t[4] = (e) => (o.state.userConfig.username = e)),
                                    disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                  },
                                  null,
                                  8,
                                  Oi
                                ),
                                [[Ce.nr, o.state.userConfig.username]]
                              ),
                            ]),
                            (0, pe._)("label", Mi, [
                              (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelSyncPassword")) }, null, 8, Ti),
                              (0, pe.wy)(
                                (0, pe._)(
                                  "input",
                                  {
                                    type: "password",
                                    "onUpdate:modelValue": t[5] || (t[5] = (e) => (o.state.userConfig.password = e)),
                                    disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                  },
                                  null,
                                  8,
                                  Ii
                                ),
                                [[Ce.nr, o.state.userConfig.password]]
                              ),
                            ]),
                            (0, pe._)("label", null, [
                              (0, pe.wy)(
                                (0, pe._)(
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
                                [[Ce.e8, o.state.userConfig.anonymous]]
                              ),
                              (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelSyncAnonymous")) }, null, 8, Ri),
                            ]),
                          ]),
                          (0, pe._)("div", null, [
                            (0, pe._)(
                              "button",
                              {
                                textContent: (0, me.zw)(e.i18n("buttonSave")),
                                onClick:
                                  t[7] ||
                                  (t[7] = (0, Ce.iM)(
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
                      : (0, pe.kq)("", !0),
                    null != (s = o.service) && s.name
                      ? ((0, pe.wg)(),
                        (0, pe.iD)("div", Yi, [
                          (0, pe.Wm)(c, { name: "syncScriptStatus", label: e.i18n("labelSyncScriptStatus") }, null, 8, [
                            "label",
                          ]),
                        ]))
                      : (0, pe.kq)("", !0),
                  ])
                )
              },
            ],
          ])
          var Ni = z(8900)
          const Ki = ["textContent"],
            Bi = { class: "mb-1 mr-1c flex center-items" },
            Ji = ["textContent"],
            Gi = ["disabled", "title"],
            Xi = ["textContent"],
            Qi = ["textContent"],
            es = ["textContent"],
            ts = ["textContent"],
            ns = ["innerHTML"],
            ls = { class: "btn-ghost", style: { border: "none" } },
            as = ["textContent"],
            os = ["innerHTML"],
            is = ["innerHTML"],
            ss = ["textContent"],
            rs = "editorTheme",
            us = "editorThemeName",
            cs = [
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
            ds = "codemirror/CodeMirror",
            ps = "master",
            ms = "theme",
            gs = `https://github.com/${ds}/tree/${ps}/${ms}`,
            vs = "default",
            fs = {
              __name: "vm-editor",
              setup(e) {
                const t = (0, M.iH)(),
                  n = (0, M.iH)(),
                  l = (0, M.iH)(!1),
                  a = (0, M.iH)(),
                  o = (0, M.iH)(),
                  s = (0, M.iH)(),
                  r = (0, M.iH)(),
                  u = (0, M.iH)()
                async function p(e, t = "text") {
                  const n = (0, Z.vY)()
                  o.value = !0
                  try {
                    const n = await (await fetch(e))[t]()
                    return (s.value = null), n
                  } catch (e) {
                    s.value = e.message || e.code || `${e}`
                  } finally {
                    ;(o.value = !1), await (0, pe.Y3)(), null == n || n.focus()
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
                        ...Ni.Z,
                        ...W.Z.get("editor"),
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
                      (await (0, pe.Y3)(),
                      t.value.getBoundingClientRect().bottom > innerHeight &&
                        t.value.scrollIntoView({ behavior: "smooth" }))
                }
                return (
                  (0, pe.bv)(async () => {
                    let e
                    await W.Z.ready,
                      (0, pe.YP)(l, m),
                      (0, pe.YP)(u, async (t) => {
                        if (e) return void (e = !1)
                        const n = t && t !== vs && `https://raw.githubusercontent.com/${ds}/${ps}/${ms}/${t}.css`,
                          l = n && (await p(n))
                        W.Z.set(us, !n || l ? t : vs), W.Z.set(rs, l || "")
                      }),
                      (0, _e.Z)(us, (t) => {
                        var n
                        u.value != (null != (n = t) ? n : (t = vs)) && ((e = !0), (u.value = t))
                      }),
                      (0, _e.Z)(rs, (e) => {
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
                    (0, pe.wg)(),
                    (0, pe.iD)(
                      "section",
                      { ref_key: "$el", ref: t },
                      [
                        (0, pe._)("h3", { textContent: (0, me.zw)(e.i18n("labelEditor")) }, null, 8, Ki),
                        (0, pe._)("div", Bi, [
                          (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelTheme")) }, null, 8, Ji),
                          (0, pe.wy)(
                            (0, pe._)(
                              "select",
                              {
                                "onUpdate:modelValue": i[0] || (i[0] = (e) => (u.value = e)),
                                disabled: o.value,
                                title: r.value,
                              },
                              [
                                (0, pe._)(
                                  "option",
                                  { value: vs, textContent: (0, me.zw)(e.i18n("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Xi
                                ),
                                (0, pe._)(
                                  "option",
                                  { value: "", textContent: (0, me.zw)(e.i18n("labelBadgeNone")) },
                                  null,
                                  8,
                                  Qi
                                ),
                                ((0, pe.wg)(!0),
                                (0, pe.iD)(
                                  pe.HY,
                                  null,
                                  (0, pe.Ko)(
                                    (0, M.SU)(cs),
                                    (e) => (
                                      (0, pe.wg)(),
                                      (0, pe.iD)("option", { key: e, textContent: (0, me.zw)(e) }, null, 8, es)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              Gi
                            ),
                            [[Ce.bM, u.value]]
                          ),
                          (0, pe._)("a", { href: gs, target: "_blank" }, "\u2197"),
                          (0, pe._)("p", { textContent: (0, me.zw)(s.value) }, null, 8, ts),
                        ]),
                        (0, pe._)("p", { class: "my-1", innerHTML: e.i18n("descEditorOptions") }, null, 8, ns),
                        (0, pe.Wm)(
                          (0, M.SU)(Fn.Z),
                          { name: "editor", json: "", "has-reset": "", onDblclick: (0, M.SU)(de) },
                          {
                            default: (0, pe.w5)(() => [
                              (0, pe._)(
                                "a",
                                { class: "ml-1", tabindex: "0", onClick: i[1] || (i[1] = (e) => (a.value = !a.value)) },
                                [(0, pe.Wm)((0, M.SU)(De.Z), { name: "info" })]
                              ),
                              (0, pe._)("label", ls, [
                                (0, pe.wy)(
                                  (0, pe._)(
                                    "input",
                                    { type: "checkbox", "onUpdate:modelValue": i[2] || (i[2] = (e) => (l.value = e)) },
                                    null,
                                    512
                                  ),
                                  [[Ce.e8, l.value]]
                                ),
                                (0, pe._)(
                                  "span",
                                  { textContent: (0, me.zw)(e.i18n("buttonShowEditorState")) },
                                  null,
                                  8,
                                  as
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["onDblclick"]
                        ),
                        a.value
                          ? ((0, pe.wg)(),
                            (0, pe.iD)(
                              pe.HY,
                              { key: 0 },
                              [
                                (0, pe._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsGeneric") },
                                  null,
                                  8,
                                  os
                                ),
                                (0, pe._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsVM") },
                                  null,
                                  8,
                                  is
                                ),
                              ],
                              64
                            ))
                          : (0, pe.kq)("", !0),
                        (0, pe._)(
                          "pre",
                          { textContent: (0, me.zw)(n.value), class: "monospace-font dim-hint" },
                          null,
                          8,
                          ss
                        ),
                      ],
                      512
                    )
                  )
                )
              },
            },
            hs = ["textContent"],
            ws = { class: "flex flex-wrap" },
            bs = { key: 0, class: "text-red" },
            ys = ["textContent"],
            xs = {
              __name: "vm-blacklist-body",
              props: { name: String, desc: String },
              setup(e) {
                const t = (0, M.iH)(),
                  n = e
                return (
                  (0, pe.bv)(async () => {
                    t.value = await (0, $.gj)("Storage", ["base", "getOne", n.name + Bt.Sg])
                  }),
                  (e, l) => (
                    (0, pe.wg)(),
                    (0, pe.iD)(
                      pe.HY,
                      null,
                      [
                        (0, pe._)("p", { textContent: (0, me.zw)(n.desc), class: "mt-1" }, null, 8, hs),
                        (0, pe._)("div", ws, [
                          (0, pe.Wm)(
                            (0, M.SU)(Fn.Z),
                            { name: n.name, class: "flex-1", onBgError: l[0] || (l[0] = (e) => (t.value = e)) },
                            null,
                            8,
                            ["name"]
                          ),
                          t.value
                            ? ((0, pe.wg)(),
                              (0, pe.iD)("ol", bs, [
                                ((0, pe.wg)(!0),
                                (0, pe.iD)(
                                  pe.HY,
                                  null,
                                  (0, pe.Ko)(
                                    t.value,
                                    (e) => (
                                      (0, pe.wg)(),
                                      (0, pe.iD)("li", { key: e, textContent: (0, me.zw)(e) }, null, 8, ys)
                                    )
                                  ),
                                  128
                                )),
                              ]))
                            : (0, pe.kq)("", !0),
                        ]),
                      ],
                      64
                    )
                  )
                )
              },
            },
            Cs = ["textContent"],
            _s = ["textContent"],
            ks = {
              __name: "vm-blacklist",
              setup: (e) => (e, t) => (
                (0, pe.wg)(),
                (0, pe.iD)("section", null, [
                  (0, pe._)("h3", { textContent: (0, me.zw)(e.i18n("labelBlacklist")) }, null, 8, Cs),
                  (0, pe._)("p", null, [
                    (0, pe._)(
                      "a",
                      {
                        href: "https://violentmonkey.github.io/posts/smart-rules-for-blacklist/#blacklist-patterns",
                        textContent: (0, me.zw)(e.i18n("learnBlacklist")),
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                      null,
                      8,
                      _s
                    ),
                  ]),
                  (0, pe.Wm)((0, M.SU)(xs), { name: (0, M.SU)(Bt.hl), desc: e.i18n("descBlacklist") }, null, 8, [
                    "name",
                    "desc",
                  ]),
                  (0, pe.Wm)((0, M.SU)(xs), { name: (0, M.SU)(Bt.g4), desc: e.i18n("descBlacklistNet") }, null, 8, [
                    "name",
                    "desc",
                  ]),
                ])
              ),
            },
            Ss = { badgeColor: (0, $.ag)("titleBadgeColor"), badgeColorBlocked: (0, $.ag)("titleBadgeColorBlocked") },
            Us = c.keys(Ss),
            zs = { enum: Ss, normalize: (e, t) => (/^#[0-9a-f]{6}$/i.test(e) ? e : Yo.ZP[t]) },
            Ds = {
              autoUpdate: { normalize: (e) => Math.max(0, Math.min(365, +e || 0)) },
              defaultInjectInto: { enum: Bt.Wg },
              showAdvanced: { normalize: (e) => e },
              showBadge: {
                enum: {
                  "": (0, $.ag)("labelBadgeNone"),
                  unique: (0, $.ag)("labelBadgeUnique"),
                  total: (0, $.ag)("labelBadgeTotal"),
                },
              },
              "filtersPopup.hideDisabled": {
                enum: {
                  "": (0, $.ag)("optionPopupShowDisabled"),
                  group: (0, $.ag)("optionPopupGroupDisabled"),
                  hide: (0, $.ag)("optionPopupHideDisabled"),
                },
              },
              "filtersPopup.sort": {
                enum: { exec: (0, $.ag)("filterExecutionOrder"), alpha: (0, $.ag)("filterAlphabeticalOrder") },
              },
              uiTheme: {
                enum: {
                  "": (0, $.ag)("optionUiThemeAuto"),
                  dark: (0, $.ag)("optionUiThemeDark"),
                  light: (0, $.ag)("optionUiThemeLight"),
                },
              },
              xhrInject: { normalize: (e) => e },
              ...w(ke.Xw, Ss, () => zs),
            },
            $s = (e, t) => (h(Ds[t].enum, e) ? e : c.keys(Ds[t].enum)[0]),
            Hs = (e, t) =>
              (0, $.Ds)((n, l) => {
                ;(n = t(n, e)) !== (l = t(l, e)) && W.Z.set(e, n)
              }, 50),
            js = (0, M.qj)({}),
            Ws = {
              components: {
                VmImport: Xo,
                VmExport: gi,
                VmMaintenance: wi,
                VmSync: qi,
                VmEditor: fs,
                VmBlacklist: ks,
                VmDateInfo: li,
                SettingCheck: ze.Z,
                SettingText: Fn.Z,
                LocaleGroup: $e.Z,
                Tooltip: Ue.Z,
              },
              data: () => ({ expose: null, items: Ds, settings: js }),
              computed: {
                editorWindowHint() {
                  var e
                  return null != (e = g.windows) && e.onBoundsChanged ? null : this.i18n("optionEditorWindowHint")
                },
                isCustomBadgeColor: () => Us.some((e) => js[e] !== Yo.ZP[e]),
              },
              methods: {
                ctrlS() {
                  ;(0, Z.vY)().dispatchEvent(new Event("ctrl-s"))
                },
                onResetBadgeColors() {
                  Us.forEach((e) => {
                    js[e] = Yo.ZP[e]
                  })
                },
              },
              activated() {
                ;(0, Z.wO)(this.$el),
                  (this.revokers = [xe.$J.register("ctrlcmd-s", this.ctrlS, { condition: "inputFocus" })]),
                  w(ke.LI, Ds, ([e, { normalize: t = $s }]) => {
                    this.revokers.push(
                      (0, _e.Z)(e, (n) => {
                        js[e] = t(n, e)
                      })
                    ),
                      this.$watch(() => js[e], Hs(e, t))
                  }),
                  (this.expose = c.keys(W.Z.get(n)).map((e) => [e, decodeURIComponent(e)]))
              },
              deactivated() {
                this.revokers.forEach((e) => {
                  e()
                })
              },
            },
            Zs = (0, Ai.Z)(Ws, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var i
                  const s = (0, pe.up)("setting-check"),
                    r = (0, pe.up)("tooltip"),
                    u = (0, pe.up)("locale-group"),
                    c = (0, pe.up)("vm-import"),
                    d = (0, pe.up)("vm-export"),
                    p = (0, pe.up)("vm-maintenance"),
                    m = (0, pe.up)("vm-sync"),
                    g = (0, pe.up)("vm-editor"),
                    v = (0, pe.up)("vm-date-info"),
                    f = (0, pe.up)("setting-text"),
                    h = (0, pe.up)("vm-blacklist")
                  return (
                    (0, pe.wg)(),
                    (0, pe.iD)(
                      "div",
                      { class: "tab-settings", "data-show-advanced": a.settings.showAdvanced },
                      [
                        (0, pe._)("h1", { textContent: (0, me.zw)(e.i18n("labelSettings")) }, null, 8, Ga),
                        (0, pe._)("section", Xa, [
                          (0, pe._)("h3", { textContent: (0, me.zw)(e.i18n("optionPopup")) }, null, 8, Qa),
                          (0, pe._)("div", null, [
                            (0, pe.Wm)(s, { name: "autoReload", label: e.i18n("labelAutoReloadCurrentTab") }, null, 8, [
                              "label",
                            ]),
                          ]),
                          (0, pe._)("div", eo, [
                            (0, pe.Wm)(
                              s,
                              { name: "editorWindow", class: "mr-2", ref: "EW" },
                              {
                                default: (0, pe.w5)(() => [
                                  (0, pe.Wm)(
                                    r,
                                    { content: o.editorWindowHint, disabled: !o.editorWindowHint },
                                    {
                                      default: (0, pe.w5)(() => [
                                        (0, pe._)(
                                          "span",
                                          { textContent: (0, me.zw)(e.i18n("optionEditorWindow")) },
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
                            (0, pe.wy)(
                              (0, pe.Wm)(
                                s,
                                { name: "editorWindowSimple", label: e.i18n("optionEditorWindowSimple") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[Ce.F8, null == (i = e.$refs.EW) ? void 0 : i.value]]
                            ),
                          ]),
                          (0, pe._)("div", no, [
                            (0, pe._)("label", null, [
                              (0, pe.Wm)(
                                u,
                                { "i18n-key": "labelPopupSort" },
                                {
                                  default: (0, pe.w5)(() => [
                                    ((0, pe.wg)(),
                                    (0, pe.iD)(
                                      pe.HY,
                                      null,
                                      (0, pe.Ko)(["filtersPopup.sort"], (e) =>
                                        (0, pe.wy)(
                                          (0, pe._)(
                                            "select",
                                            { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                            [
                                              ((0, pe.wg)(!0),
                                              (0, pe.iD)(
                                                pe.HY,
                                                null,
                                                (0, pe.Ko)(
                                                  a.items[e].enum,
                                                  (t, n) => (
                                                    (0, pe.wg)(),
                                                    (0, pe.iD)(
                                                      "option",
                                                      { key: `${e}:${n}`, value: n, textContent: (0, me.zw)(t) },
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
                                          ),
                                          [[Ce.bM, a.settings[e]]]
                                        )
                                      ),
                                      64
                                    )),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, pe.wy)(
                              (0, pe.Wm)(
                                s,
                                { name: "filtersPopup.groupRunAt", label: e.i18n("optionPopupGroupRunAt") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[Ce.F8, "exec" === a.settings["filtersPopup.sort"]]]
                            ),
                            (0, pe._)("label", null, [
                              ((0, pe.wg)(),
                              (0, pe.iD)(
                                pe.HY,
                                null,
                                (0, pe.Ko)(["filtersPopup.hideDisabled"], (e) =>
                                  (0, pe.wy)(
                                    (0, pe._)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, pe.wg)(!0),
                                        (0, pe.iD)(
                                          pe.HY,
                                          null,
                                          (0, pe.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, pe.wg)(),
                                              (0, pe.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, me.zw)(t) },
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
                                    ),
                                    [[Ce.bM, a.settings[e]]]
                                  )
                                ),
                                64
                              )),
                            ]),
                            (0, pe.wy)(
                              (0, pe.Wm)(
                                s,
                                { name: "filtersPopup.enabledFirst", label: e.i18n("optionPopupEnabledFirst") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[Ce.F8, !a.settings["filtersPopup.hideDisabled"]]]
                            ),
                          ]),
                          (0, pe._)("div", null, [
                            (0, pe._)("label", null, [
                              (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelBadge")) }, null, 8, so),
                              ((0, pe.wg)(),
                              (0, pe.iD)(
                                pe.HY,
                                null,
                                (0, pe.Ko)(["showBadge"], (e) =>
                                  (0, pe.wy)(
                                    (0, pe._)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, pe.wg)(!0),
                                        (0, pe.iD)(
                                          pe.HY,
                                          null,
                                          (0, pe.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, pe.wg)(),
                                              (0, pe.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, me.zw)(t) },
                                                null,
                                                8,
                                                uo
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ],
                                      8,
                                      ro
                                    ),
                                    [[Ce.bM, a.settings[e]]]
                                  )
                                ),
                                64
                              )),
                            ]),
                          ]),
                          (0, pe._)("div", null, [
                            (0, pe._)("label", null, [
                              (0, pe._)("span", { textContent: (0, me.zw)(e.i18n("labelBadgeColors")) }, null, 8, co),
                              ((0, pe.wg)(!0),
                              (0, pe.iD)(
                                pe.HY,
                                null,
                                (0, pe.Ko)(
                                  a.items.badgeColor.enum,
                                  (e, t) => (
                                    (0, pe.wg)(),
                                    (0, pe.j4)(
                                      r,
                                      { key: `bc:${t}`, content: e },
                                      {
                                        default: (0, pe.w5)(() => [
                                          (0, pe.wy)(
                                            (0, pe._)(
                                              "input",
                                              { type: "color", "onUpdate:modelValue": (e) => (a.settings[t] = e) },
                                              null,
                                              8,
                                              po
                                            ),
                                            [[Ce.nr, a.settings[t]]]
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
                              (0, pe.wy)(
                                (0, pe._)(
                                  "button",
                                  {
                                    textContent: (0, me.zw)(e.i18n("buttonReset")),
                                    class: "ml-1",
                                    onClick:
                                      t[0] || (t[0] = (...e) => o.onResetBadgeColors && o.onResetBadgeColors(...e)),
                                  },
                                  null,
                                  8,
                                  mo
                                ),
                                [[Ce.F8, o.isCustomBadgeColor]]
                              ),
                            ]),
                          ]),
                        ]),
                        (0, pe._)("section", go, [
                          (0, pe._)("h3", { textContent: (0, me.zw)(e.i18n("optionUpdate")) }, null, 8, vo),
                          (0, pe._)("div", fo, [
                            (0, pe._)("label", null, [
                              (0, pe.Wm)(
                                u,
                                { "i18n-key": "labelAutoUpdate" },
                                {
                                  default: (0, pe.w5)(() => [
                                    (0, pe.wy)(
                                      (0, pe._)(
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
                                      [[Ce.nr, a.settings.autoUpdate]]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, pe.Wm)(
                              s,
                              { name: "updateEnabledScriptsOnly", label: e.i18n("labelEnabledScriptsOnly") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                          (0, pe._)("div", ho, [
                            (0, pe.Wm)(s, { name: "notifyUpdates", label: e.i18n("labelNotifyUpdates") }, null, 8, [
                              "label",
                            ]),
                            (0, pe.Wm)(
                              s,
                              { name: "notifyUpdatesGlobal", label: e.i18n("labelNotifyUpdatesGlobal"), class: "ml-2" },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                        ]),
                        (0, pe._)("section", wo, [
                          (0, pe._)("h3", { textContent: (0, me.zw)(e.i18n("labelBackupMaintenance")) }, null, 8, bo),
                          (0, pe.Wm)(c),
                          (0, pe.Wm)(d),
                          yo,
                          (0, pe.Wm)(p),
                        ]),
                        (0, pe.Wm)(m),
                        ((0, pe.wg)(!0),
                        (0, pe.iD)(
                          pe.HY,
                          null,
                          (0, pe.Ko)(
                            { showAdvanced: a.settings },
                            (t, n) => (
                              (0, pe.wg)(),
                              (0, pe.iD)(
                                "details",
                                { key: n, open: t[n] },
                                [
                                  (0, pe._)(
                                    "summary",
                                    { onClick: (0, Ce.iM)((e) => (t[n] = !t[n]), ["prevent"]) },
                                    [
                                      ((0, pe.wg)(),
                                      (0, pe.j4)(
                                        (0, pe.LL)(t[n] ? "h1" : "h3"),
                                        { textContent: (0, me.zw)(e.i18n("labelAdvanced")), class: "inline-block" },
                                        null,
                                        8,
                                        ["textContent"]
                                      )),
                                    ],
                                    8,
                                    Co
                                  ),
                                  (0, pe._)("section", _o, [
                                    (0, pe._)("h3", { textContent: (0, me.zw)(e.i18n("labelGeneral")) }, null, 8, ko),
                                    (0, pe._)("div", null, [
                                      (0, pe._)("label", null, [
                                        (0, pe.Wm)(
                                          u,
                                          { "i18n-key": "optionUiTheme" },
                                          {
                                            default: (0, pe.w5)(() => [
                                              ((0, pe.wg)(),
                                              (0, pe.iD)(
                                                pe.HY,
                                                null,
                                                (0, pe.Ko)(["uiTheme"], (e) =>
                                                  (0, pe.wy)(
                                                    (0, pe._)(
                                                      "select",
                                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                      [
                                                        ((0, pe.wg)(!0),
                                                        (0, pe.iD)(
                                                          pe.HY,
                                                          null,
                                                          (0, pe.Ko)(
                                                            a.items[e].enum,
                                                            (e, t) => (
                                                              (0, pe.wg)(),
                                                              (0, pe.iD)(
                                                                "option",
                                                                { key: t, value: t, textContent: (0, me.zw)(e) },
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
                                                    [[Ce.bM, a.settings[e]]]
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
                                    (0, pe._)("div", zo, [
                                      (0, pe._)("label", null, [
                                        (0, pe._)(
                                          "span",
                                          { textContent: (0, me.zw)(e.i18n("labelInjectionMode")) },
                                          null,
                                          8,
                                          Do
                                        ),
                                        ((0, pe.wg)(),
                                        (0, pe.iD)(
                                          pe.HY,
                                          null,
                                          (0, pe.Ko)(["defaultInjectInto"], (e) =>
                                            (0, pe.wy)(
                                              (0, pe._)(
                                                "select",
                                                { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                [
                                                  ((0, pe.wg)(!0),
                                                  (0, pe.iD)(
                                                    pe.HY,
                                                    null,
                                                    (0, pe.Ko)(
                                                      a.items[e].enum,
                                                      (e, t) => (
                                                        (0, pe.wg)(),
                                                        (0, pe.iD)(
                                                          "option",
                                                          { key: t, textContent: (0, me.zw)(t) },
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
                                              [[Ce.bM, a.settings[e]]]
                                            )
                                          ),
                                          64
                                        )),
                                        (0, pe._)(
                                          "a",
                                          {
                                            class: "ml-1",
                                            href: "https://violentmonkey.github.io/posts/inject-into-context/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            textContent: (0, me.zw)(e.i18n("learnInjectionMode")),
                                          },
                                          null,
                                          8,
                                          jo
                                        ),
                                      ]),
                                      (0, pe.Wm)(
                                        r,
                                        { content: e.i18n("labelXhrInjectHint") },
                                        {
                                          default: (0, pe.w5)(() => [
                                            (0, pe.Wm)(
                                              s,
                                              { name: "xhrInject" },
                                              {
                                                default: (0, pe.w5)(() => [
                                                  (0, pe.Wm)(
                                                    u,
                                                    { "i18n-key": "labelXhrInject" },
                                                    { default: (0, pe.w5)(() => [Wo]), _: 1 }
                                                  ),
                                                  (0, pe.Uk)(),
                                                  (0, pe._)(
                                                    "ruby",
                                                    { textContent: (0, me.zw)(e.i18n("labelXhrInjectNote")) },
                                                    null,
                                                    8,
                                                    Zo
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
                                        ? (0, pe.kq)("", !0)
                                        : ((0, pe.wg)(),
                                          (0, pe.iD)("label", Oo, [
                                            (0, pe.Wm)(s, { name: "ffInject" }),
                                            (0, pe.Wm)(
                                              r,
                                              { content: e.i18n("labelFastFirefoxInjectHint") },
                                              {
                                                default: (0, pe.w5)(() => [
                                                  (0, pe.Wm)(
                                                    u,
                                                    { "i18n-key": "labelFastFirefoxInject" },
                                                    { default: (0, pe.w5)(() => [Mo]), _: 1 }
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["content"]
                                            ),
                                          ])),
                                    ]),
                                    (0, pe._)("div", null, [
                                      (0, pe.Wm)(
                                        u,
                                        { "i18n-key": "labelExposeStatus", class: "flex flex-col" },
                                        {
                                          default: (0, pe.w5)(() => [
                                            ((0, pe.wg)(!0),
                                            (0, pe.iD)(
                                              pe.HY,
                                              null,
                                              (0, pe.Ko)(
                                                a.expose,
                                                ([e, t]) => (
                                                  (0, pe.wg)(),
                                                  (0, pe.j4)(
                                                    s,
                                                    { key: t, name: `expose.${e}`, class: "ml-2 mr-1c valign-tb" },
                                                    {
                                                      default: (0, pe.w5)(() => [
                                                        (0, pe._)("span", { textContent: (0, me.zw)(t) }, null, 8, To),
                                                        (0, pe._)(
                                                          "a",
                                                          {
                                                            href: `https://${t}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                          },
                                                          "\u2197",
                                                          8,
                                                          Io
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
                                    (0, pe.Wm)(
                                      s,
                                      { name: "helpForLocalFile", label: e.i18n("helpForLocalFile") },
                                      null,
                                      8,
                                      ["label"]
                                    ),
                                  ]),
                                  (0, pe.Wm)(g),
                                  (0, pe._)("section", null, [
                                    (0, pe._)(
                                      "h3",
                                      { textContent: (0, me.zw)(e.i18n("labelScriptTemplate")) },
                                      null,
                                      8,
                                      Eo
                                    ),
                                    (0, pe._)("p", null, [
                                      ((0, pe.wg)(!0),
                                      (0, pe.iD)(
                                        pe.HY,
                                        null,
                                        (0, pe.Ko)(
                                          e.i18n("descScriptTemplate").split(/<(\S+?)>/),
                                          (e, t) => (
                                            (0, pe.wg)(),
                                            (0, pe.j4)(
                                              (0, pe.LL)(t % 2 ? "code" : "span"),
                                              { textContent: (0, me.zw)(e), key: t },
                                              null,
                                              8,
                                              ["textContent"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                      (0, pe.Uk)(),
                                      (0, pe.Wm)(v),
                                    ]),
                                    (0, pe.Wm)(f, { name: "scriptTemplate", "has-reset": "" }),
                                  ]),
                                  (0, pe.Wm)(h),
                                  (0, pe._)("section", null, [
                                    (0, pe._)("h3", { textContent: (0, me.zw)(e.i18n("labelCustomCSS")) }, null, 8, Ro),
                                    (0, pe._)("p", { innerHTML: e.i18n("descCustomCSS") }, null, 8, Vo),
                                    (0, pe.Wm)(f, { name: "customCSS" }),
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
            Os = { class: "tab-about mb-2c" },
            Ms = { class: "mt-0 mr-1c" },
            Ts = ["textContent"],
            Is = ["textContent"],
            Es = ["textContent"],
            Rs = ["textContent"],
            Vs = ["textContent"],
            Ys = ["textContent"],
            Ps = ["textContent"],
            Fs = ["textContent"],
            Ls = ["textContent"],
            As = ["textContent"],
            qs = ["textContent"],
            Ns = {
              __name: "tab-about",
              setup(e) {
                const t = x.name,
                  n = browser.i18n.getUILanguage()
                return (e, l) => (
                  (0, pe.wg)(),
                  (0, pe.iD)("div", Os, [
                    (0, pe._)("h1", Ms, [
                      (0, pe._)("span", { textContent: (0, me.zw)((0, M.SU)(t)) }, null, 8, Ts),
                      (0, pe._)("small", { textContent: (0, me.zw)(`v${(0, M.SU)("2.23.0")}`) }, null, 8, Is),
                    ]),
                    (0, pe._)("p", { textContent: (0, me.zw)(e.i18n("extDescription")) }, null, 8, Es),
                    (0, pe._)("div", null, [
                      (0, pe._)("label", { textContent: (0, me.zw)(e.i18n("labelRelated")) }, null, 8, Rs),
                      (0, pe._)("ul", null, [
                        (0, pe._)("li", null, [
                          (0, pe._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, me.zw)(e.i18n("labelHomepage")),
                            },
                            null,
                            8,
                            Vs
                          ),
                        ]),
                        (0, pe._)("li", null, [
                          (0, pe._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/issues",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, me.zw)(e.i18n("labelFeedback")),
                            },
                            null,
                            8,
                            Ys
                          ),
                        ]),
                        (0, pe._)("li", null, [
                          (0, pe._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/graphs/contributors",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, me.zw)(e.i18n("labelContributors")),
                            },
                            null,
                            8,
                            Ps
                          ),
                        ]),
                        (0, pe._)("li", null, [
                          (0, pe._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io/privacy/",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, me.zw)(e.i18n("labelPrivacyPolicy")),
                            },
                            null,
                            8,
                            Fs
                          ),
                        ]),
                      ]),
                    ]),
                    (0, pe._)("div", null, [
                      (0, pe._)("label", { textContent: (0, me.zw)(e.i18n("labelCurrentLang")) }, null, 8, Ls),
                      (0, pe._)("span", { class: "current", textContent: (0, me.zw)((0, M.SU)(n)) }, null, 8, As),
                      (0, pe.Uk)(" | "),
                      (0, pe._)(
                        "a",
                        {
                          href: "https://violentmonkey.github.io/localization/",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          textContent: (0, me.zw)(e.i18n("labelHelpTranslate")),
                        },
                        null,
                        8,
                        qs
                      ),
                    ]),
                  ])
                )
              },
            },
            Ks = [
              { name: o, comp: Ba, label: (0, $.ag)("sideMenuInstalled") },
              { name: C, comp: Zs, label: (0, $.ag)("sideMenuSettings") },
              { name: _, comp: Ns, label: (0, $.ag)("sideMenuAbout") },
              { name: k, comp: Ba, label: (0, $.ag)("buttonRecycleBin") },
            ],
            Bs = (0, $.ag)("extName"),
            Js = "!editScript",
            Gs = (0, pe.Fl)(() => {
              const e = F.route.paths[0]
              return Ks.find((t) => t.name === e) || Ks[0]
            }),
            Xs = (0, pe.Fl)(() => ({ [o]: F.scripts.length, [k]: F.removedScripts.length }))
          function Qs() {
            const e = Gs.value.name === o,
              { paths: t } = F.route
            xe.$J.setContext("editScript", e && t[1]),
              xe.$J.setContext("tabScripts", e && !t[1]),
              xe.$J.setContext("showRecycle", Gs.value.name === k)
          }
          function er(e) {
            const n = Ks.indexOf(Gs.value),
              l = Ks[(n + e + Ks.length) % Ks.length]
            t.location.hash = (null == l ? void 0 : l.name) || ""
          }
          p(
            "dragover",
            (e) => {
              var t
              F.route.hash !== C &&
                /^application\/(zip|x-zip-compressed)$/.test(null == (t = e.dataTransfer.items[0]) ? void 0 : t.type) &&
                (location.hash = `#${C}`)
            },
            !0
          )
          const tr = {
              setup() {
                const [e, t] = F.route.paths,
                  n = (0, M.iH)(e !== o || ("_new" !== t && !Number(t)))
                return (
                  (0, pe.m0)(() => {
                    const { title: e } = F
                    document.title = e ? `${e} - ${Bs}` : Bs
                  }),
                  (0, pe.YP)(
                    () => F.route.paths,
                    () => {
                      ;(n.value = !0), Qs()
                    }
                  ),
                  (0, pe.bv)(() => {
                    const e = [
                      xe.$J.register("a-pageup", () => er(-1), { condition: Js }),
                      xe.$J.register("a-pagedown", () => er(1), { condition: Js }),
                    ]
                    return (
                      xe.$J.enable(),
                      Qs(),
                      () => {
                        e.forEach((e) => {
                          e()
                        }),
                          xe.$J.disable()
                      }
                    )
                  }),
                  { tabs: Ks, current: Gs, numbers: Xs, canRenderAside: n }
                )
              },
            },
            nr = (0, Ai.Z)(tr, [
              [
                "render",
                (e, t, n, l, a, o) => (
                  (0, pe.wg)(),
                  (0, pe.iD)("div", ge, [
                    l.canRenderAside
                      ? ((0, pe.wg)(),
                        (0, pe.iD)("aside", ve, [
                          (0, pe._)("div", fe, [
                            he,
                            (0, pe._)(
                              "h1",
                              { class: "hidden-sm", textContent: (0, me.zw)(e.i18n("extName")) },
                              null,
                              8,
                              we
                            ),
                            be,
                            ((0, pe.wg)(!0),
                            (0, pe.iD)(
                              pe.HY,
                              null,
                              (0, pe.Ko)(
                                l.tabs,
                                (e) => (
                                  (0, pe.wg)(),
                                  (0, pe.iD)("div", { class: "aside-menu-item", key: e.name }, [
                                    (0, pe._)(
                                      "a",
                                      {
                                        href: `#${e.name}`,
                                        class: (0, me.C_)({ active: e === l.current }),
                                        "data-num-scripts": l.numbers[e.name],
                                        textContent: (0, me.zw)(e.label),
                                      },
                                      null,
                                      10,
                                      ye
                                    ),
                                  ])
                                )
                              ),
                              128
                            )),
                          ]),
                        ]))
                      : (0, pe.kq)("", !0),
                    ((0, pe.wg)(),
                    (0, pe.j4)(
                      pe.Ob,
                      null,
                      [((0, pe.wg)(), (0, pe.j4)((0, pe.LL)(l.current.comp), { class: "tab" }))],
                      1024
                    )),
                  ])
                ),
              ],
            ]),
            lr = [
              (0, $.ag)("editNavCode"),
              (0, $.ag)("editNavSettings"),
              (0, $.ag)("editNavValues"),
              "@require",
              "@resource",
            ]
          let ar
          function or(e, t, n) {
            const l = e.$cache || (e.$cache = {}),
              a = e.meta || {},
              { custom: o } = e,
              i = (0, $.iQ)(a, X),
              s = w($.Hv, [a[X], i, a[K], (0, $.iQ)(a, K), o[X], o[K]], "\n"),
              r = o[X] || i
            let u = 0,
              c = ""
            t.forEach((e, t) => {
              ;(u += e), e && (c += `${lr[t]}: ${(0, $.aj)(e)}\n`)
            }),
              (l.desc = s),
              (l.name = r),
              (l.lowerName = r.toLocaleLowerCase()),
              (l.tags = o.tags || ""),
              (l.size = (0, $.aj)(u, !0).replace(" ", "")),
              (l.sizes = c.slice(0, -1).replace(/\x20/g, "\xa0").replace(/[^B]$/gm, "$&B")),
              (l.sizeNum = u),
              (l[le] = t[2]),
              n && (l.code = n),
              (e.$canUpdate = (0, $.TZ)(e) && (e.config.shouldUpdate ? 1 : -1)),
              (0, j.d)(e, F, !0)
          }
          function ir() {
            const e = +F.route.paths[1]
            return sr(e).catch(e && (() => sr()))
          }
          async function sr(e) {
            const [t] = await d.all([(0, $.gj)("GetData", { id: e, sizes: !0 }, { retry: !0 }), W.Z.ready]),
              { [o]: n, sizes: l, ...a } = t
            c.assign(F, a)
            const i = [],
              s = []
            n.forEach((e, t) => {
              or(e, l[t]), (e.config.removed ? s : i).push(e)
            }),
              (F.scripts = i),
              (F.removedScripts = s),
              (F.loading = !1)
          }
          ;(F.loading = !0),
            ir(),
            c.assign(H.Z, {
              ScriptsUpdated() {
                ir()
              },
              UpdateSync(e) {
                F.sync = e
              },
              async UpdateScript({ update: e, where: t, code: n } = {}) {
                var l
                if (!e) return
                ;(ar || ((ar = F.batch) && (ar = d.race([ar, (0, $.dL)(500)])))) && (await ar, (ar = null))
                const a = F.scripts.findIndex((e) => e.props.id === t.id),
                  i = F.removedScripts.findIndex((e) => e.props.id === t.id),
                  s = F.scripts[a] || F.removedScripts[i] || (e.meta && F.canRenderScripts && {})
                if (!s) return
                const [r] = await (0, $.gj)("GetSizes", [t.id]),
                  { search: u } = F
                if (
                  (c.assign(s, e),
                  s.error && !e.error && (s.error = null),
                  or(s, r, n),
                  u && P([s], u.rules),
                  null != (null == (l = e.config) ? void 0 : l.removed) &&
                    (e.config.removed
                      ? (F.needRefresh = !0)
                      : (F.removedScripts = F.removedScripts.filter((e) => e.props.id !== t.id))),
                  (s.config.removed ? i : a) < 0)
                ) {
                  s.message = ""
                  const e = s.config.removed ? "removedScripts" : o
                  F[e] = [...F[e], s]
                }
              },
              RemoveScripts(e) {
                F.removedScripts = F.removedScripts.filter((t) => !e.includes(t.props.id))
              },
            }),
            (0, Z.sY)(nr)
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
