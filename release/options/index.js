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



    const vsPath = "/public/lib/monaco-editor/0.50.0/min/vs";

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
            async getOne(e, t) {
              const n = this.toKey(e),
                { [n]: l = t ? await this.fetch(e, "res").catch(console.warn) : void 0 } = await i.get([n])
              return l
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
        8506: (h, U, z) => {
          "use strict"
          z.d(U, { m: () => ir }), z(1871)
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
          function P(e, t) {
            let n = 0
            for (let l = 0; l < e.length; l++) {
              const { $cache: a } = e[l]
              n += a.show = t.every(V, a)
            }
            return n
          }
          const Y = (0, R.qj)({
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
          function ae(e, t) {
            return (0, D.gj)("MarkRemoved", { id: e.props.id, removed: t })
          }
          async function oe(e, ...t) {
            try {
              await (Y.batch = e(...t) || !0)
            } finally {
              Y.batch = !1
            }
          }
          function ie(e) {
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
          var se = z(6252),
            re = z(2502)
          const ce = { class: "page-options" },
            ue = { key: 0 },
            de = { class: "aside-content" },
            pe = (0, se._)("img", { src: "/public/images/icon128.png" }, null, -1),
            me = ["textContent"],
            ge = (0, se._)("hr", null, null, -1),
            ve = ["href", "data-num-scripts", "textContent"]
          var he = z(7458),
            fe = z(9963),
            we = z(5168),
            be = z(2380),
            ye = z(392),
            xe = z(9824),
            Ce = z(7407),
            _e = z(6877),
            ke = z(6653)
          const Se = ".script",
            Ue = 50,
            ze = 20,
            De = 16,
            $e = 500,
            He = W.T
              ? { start: "touchstart", move: "touchmove", end: "touchend" }
              : { start: "dragstart", move: "mousemove", end: "mouseup" },
            je = W.T && u.assign(document.createElement("div"), { className: "dragging-noscroll" }),
            We = ["scroll", "mouseenter", "mouseleave"]
          let Ie, Re, Te, Me, Oe, Ee, Ze, Ve, Pe, Ye, Ae, Le, Fe, qe, Ne, Be, Ke, Je
          function Ge(e, t, n) {
            const l = n ? p : m
            ;(Ae = e),
              (Le = t),
              w(l, Ae, He.start, W.T ? tt : at),
              W.T || (w(l, Ae, "dblclick", Xe, !0), w(l, Ae, "mousedown", Qe, !0), n || et())
          }
          function Xe(e) {
            const t = getSelection(),
              n = e.target.closest(".script-name")
            n && (t.removeAllRanges(), t.selectAllChildren(n))
          }
          function Qe(e) {
            !e.altKey && gt(e) && (Ye.draggable = !0), w(p, Ae, "mouseup", et, !0)
          }
          function et() {
            Ye && (Ye.draggable = !1), w(m, Ae, "mouseup", et, !0)
          }
          function tt(e) {
            gt(e) && ((Ee = e), (Ze = setTimeout(nt, $e, "timer")), p(He.move, nt), p(He.end, lt))
          }
          function nt(e) {
            lt(), "timer" === e && (w(at, Ye, Ee), b && rt() && ((Ae.scrollTop += 1), (Ae.scrollTop -= 1)))
          }
          function lt() {
            clearTimeout(Ze), m(He.move, nt), m(He.end, lt)
          }
          function at(e) {
            var t
            if (!gt(e)) return
            e.cancelable && e.preventDefault()
            const { clientX: n, clientY: l } = (null == (t = e.touches) ? void 0 : t[0]) || e,
              a = Ye.getBoundingClientRect(),
              o = Ae.getBoundingClientRect()
            ;(Ie = Ye.cloneNode(!0)),
              (Re = w([].filter, Ae.children, (e) => "none" !== e.style.display)),
              (Me = Re.indexOf(Ye)),
              (Oe = Me),
              Re.splice(Me, 1),
              (Te = a.height),
              (Ve = n - a.left),
              (Pe = l - a.top),
              (Fe = o.top + Ue),
              (qe = o.bottom - Ue),
              (Je = {}),
              Ye.classList.add("dragging-placeholder"),
              Ie.classList.add("dragging"),
              (Ie.style.transform = `translate(${a.left}px, ${a.top}px)`),
              (Ie.style.width = `${a.width}px`),
              Ae.appendChild(Ie),
              W.T && Ae.insertAdjacentElement("afterBegin", je),
              p(He.move, ot),
              p(He.end, it)
          }
          function ot(e) {
            var t
            const { clientX: n, clientY: l, target: a } = (null == (t = e.touches) ? void 0 : t[0]) || e
            let o
            const i = W.T ? mt(n, l) : null == a.closest ? void 0 : a.closest(Se)
            if (i && i !== Ye) {
              const e = i.getBoundingClientRect(),
                t = l > e.top + e.height / 2
              ;(o = Ye !== i[(t ? "next" : "previous") + "ElementSibling"]),
                o && (i.insertAdjacentElement(t ? "afterEnd" : "beforeBegin", Ye), st(Re.indexOf(i) + t))
            }
            ;(Ie.style.transform = `translate(${n - Ve}px, ${l - Pe}px)`), (ct(l) || o) && (Je = {})
          }
          function it() {
            m(He.move, ot),
              m(He.end, it),
              dt(),
              Ie.remove(),
              W.T && je.remove(),
              Ye.classList.remove("dragging-placeholder"),
              Le(Me, Oe)
          }
          function st(e) {
            const t = Oe < e ? Te : -Te,
              n = Re.slice(...(Oe < e ? [Oe, e] : [e, Oe]))
            n.forEach((e) => {
              ;(e.style.transition = "none"), (e.style.transform = `translateY(${t}px)`)
            }),
              setTimeout(() =>
                n.forEach(({ style: e }) => {
                  e.removeProperty("transition"), e.removeProperty("transform")
                })
              ),
              (Oe = e)
          }
          function rt() {
            return Ae.scrollHeight > Ae.clientHeight
          }
          function ct(e) {
            const t = rt() && Math.min(1, Math.max(0, e - qe, Fe - e) / Ue)
            return (
              !t && Ne && dt(),
              t && !Ne && ((Ne = setInterval(ut, De)), We.forEach((e) => p(e, pt, !0))),
              (Be = t && (e > qe ? 1 : -1) * ((1 + t * ze) | 0)),
              (Ke = v.now()),
              !!t
            )
          }
          function ut() {
            const e = v.now(),
              t = (Be * (e - Ke)) / De
            ;(Ae.scrollTop += t), (Ke = e)
          }
          function dt() {
            We.forEach((e) => m(e, pt, !0)), Ne && clearInterval(Ne), (Ne = 0)
          }
          function pt(e) {
            e.stopPropagation()
          }
          function mt(e, t) {
            var n
            const l = `${e}:${t}`
            return Je[l] || (Je[l] = null == (n = document.elementFromPoint(e, t)) ? void 0 : n.closest(Se))
          }
          function gt(e) {
            return (Ye = e.target.closest(Se)), Ye
          }
          const vt = ["tabIndex"],
            ht = { class: "script-icon hidden-xs" },
            ft = ["href", "data-hotkey"],
            wt = ["src", "data-no-icon"],
            bt = { class: "script-info-1 ellipsis" },
            yt = ["textContent", "data-order"],
            xt = { key: 0, class: "script-tags" },
            Ct = ["textContent", "onClick", "data-tag"],
            _t = (0, se._)("a", null, "...", -1),
            kt = ["textContent", "onClick", "data-tag"],
            St = { class: "script-info flex ml-1c" },
            Ut = ["href", "textContent", "tabIndex"],
            zt = ["textContent"],
            Dt = ["textContent"],
            $t = { class: "script-buttons script-buttons-left" },
            Ht = ["href", "data-hotkey", "tabIndex"],
            jt = ["data-hotkey", "tabIndex"],
            Wt = ["data-hotkey", "tabIndex"],
            It = (0, se._)("span", { class: "sep" }, null, -1),
            Rt = ["tabIndex"],
            Tt = ["href", "tabIndex"],
            Mt = ["textContent", "title"],
            Ot = { class: "script-buttons script-buttons-right" },
            Et = ["data-hotkey", "tabIndex"],
            Zt = ["data-hotkey", "tabIndex"],
            Vt = {
              props: ["script", "visible", "viewTable", "focused", "hotkeys", "showHotkeys", "activeTags"],
              components: { Dropdown: ye.Z, Icon: _e.Z, Tooltip: xe.Z },
              data() {
                return { canRender: this.visible }
              },
              computed: {
                showRecycle: () => Y.route.paths[0] === k,
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
                      (0, he.u7)((0, W.vY)()) || n.focus({ preventScroll: !0 }),
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
                  he.$J.setContext("scriptFocus", !0)
                },
                onBlur() {
                  he.$J.setContext("scriptFocus", !1)
                },
                onTagClick(e) {
                  this.$emit("clickTag", e)
                },
                toggleTip(e) {
                  ;(0, he.xr)(e.target)
                },
              },
            }
          var Pt = z(3744)
          const Yt = (0, Pt.Z)(Vt, [
            [
              "render",
              (e, t, n, l, a, o) => {
                const i = (0, se.up)("Dropdown"),
                  s = (0, se.up)("icon"),
                  r = (0, se.up)("tooltip")
                return (
                  (0, se.wg)(),
                  (0, se.iD)(
                    "div",
                    {
                      class: (0, re.C_)([
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
                      (0, se._)("div", ht, [
                        (0, se._)(
                          "a",
                          { href: o.url, "data-hotkey": n.hotkeys.edit, "data-hotkey-table": "", tabIndex: "-1" },
                          [(0, se._)("img", { src: n.script.safeIcon, "data-no-icon": n.script.noIcon }, null, 8, wt)],
                          8,
                          ft
                        ),
                      ]),
                      (0, se._)("div", bt, [
                        (0, se._)(
                          "a",
                          (0, se.dG)(
                            { textContent: (0, re.zw)(n.script.$cache.name) },
                            n.viewTable && { draggable: !1, href: o.url, tabIndex: o.tabIndex },
                            {
                              "data-order": n.script.config.removed ? null : n.script.props.position,
                              class: "script-name ellipsis",
                            }
                          ),
                          null,
                          16,
                          yt
                        ),
                        a.canRender
                          ? ((0, se.wg)(),
                            (0, se.iD)("div", xt, [
                              ((0, se.wg)(!0),
                              (0, se.iD)(
                                se.HY,
                                null,
                                (0, se.Ko)(o.tags.slice(0, 2), (e, t) => {
                                  var l
                                  return (
                                    (0, se.wg)(),
                                    (0, se.iD)(
                                      "a",
                                      {
                                        key: t,
                                        textContent: (0, re.zw)(`#${e}`),
                                        onClick: (0, fe.iM)((t) => o.onTagClick(e), ["prevent"]),
                                        class: (0, re.C_)({
                                          active: null == (l = n.activeTags) ? void 0 : l.includes(e),
                                        }),
                                        "data-tag": e,
                                      },
                                      null,
                                      10,
                                      Ct
                                    )
                                  )
                                }),
                                128
                              )),
                              o.tags.length > 2
                                ? ((0, se.wg)(),
                                  (0, se.j4)(
                                    i,
                                    { key: 0 },
                                    {
                                      content: (0, se.w5)(() => [
                                        ((0, se.wg)(!0),
                                        (0, se.iD)(
                                          se.HY,
                                          null,
                                          (0, se.Ko)(o.tags.slice(2), (e, t) => {
                                            var l
                                            return (
                                              (0, se.wg)(),
                                              (0, se.iD)(
                                                "a",
                                                {
                                                  key: t,
                                                  class: (0, re.C_)([
                                                    "dropdown-menu-item",
                                                    { active: null == (l = n.activeTags) ? void 0 : l.includes(e) },
                                                  ]),
                                                  textContent: (0, re.zw)(`#${e}`),
                                                  onClick: (0, fe.iM)((t) => o.onTagClick(e), ["prevent"]),
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
                                      ]),
                                      default: (0, se.w5)(() => [_t]),
                                      _: 1,
                                    }
                                  ))
                                : (0, se.kq)("", !0),
                            ]))
                          : (0, se.kq)("", !0),
                      ]),
                      (0, se._)("div", St, [
                        a.canRender
                          ? ((0, se.wg)(),
                            (0, se.iD)(
                              se.HY,
                              { key: 0 },
                              [
                                o.author
                                  ? ((0, se.wg)(),
                                    (0, se.j4)(
                                      r,
                                      {
                                        key: 0,
                                        content: e.i18n("labelAuthor") + n.script.meta.author,
                                        class: "script-author ml-1c hidden-sm",
                                        align: "end",
                                      },
                                      {
                                        default: (0, se.w5)(() => [
                                          (0, se.Wm)(s, { name: "author" }),
                                          o.author.email
                                            ? ((0, se.wg)(),
                                              (0, se.iD)(
                                                "a",
                                                {
                                                  key: 0,
                                                  class: "ellipsis",
                                                  href: `mailto:${o.author.email}`,
                                                  textContent: (0, re.zw)(o.author.name),
                                                  tabIndex: o.tabIndex,
                                                },
                                                null,
                                                8,
                                                Ut
                                              ))
                                            : ((0, se.wg)(),
                                              (0, se.iD)(
                                                "span",
                                                { key: 1, class: "ellipsis", textContent: (0, re.zw)(o.author.name) },
                                                null,
                                                8,
                                                zt
                                              )),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, se.kq)("", !0),
                                (0, se._)(
                                  "span",
                                  { class: "version ellipsis", textContent: (0, re.zw)(n.script.meta.version) },
                                  null,
                                  8,
                                  Dt
                                ),
                                n.script.config.removed
                                  ? (0, se.kq)("", !0)
                                  : ((0, se.wg)(),
                                    (0, se.j4)(
                                      r,
                                      { key: 1, class: "size hidden-sm", content: n.script.$cache.sizes, align: "end" },
                                      {
                                        default: (0, se.w5)(() => [(0, se.Uk)((0, re.zw)(n.script.$cache.size), 1)]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    )),
                                (0, se.Wm)(
                                  r,
                                  { class: "updated hidden-sm ml-1c", content: o.updatedAt.title, align: "end" },
                                  { default: (0, se.w5)(() => [(0, se.Uk)((0, re.zw)(o.updatedAt.show), 1)]), _: 1 },
                                  8,
                                  ["content"]
                                ),
                              ],
                              64
                            ))
                          : (0, se.kq)("", !0),
                      ]),
                      (0, se._)("div", $t, [
                        a.canRender
                          ? ((0, se.wg)(),
                            (0, se.iD)(
                              se.HY,
                              { key: 0 },
                              [
                                (0, se.Wm)(
                                  r,
                                  { content: e.i18n("buttonEdit"), align: "start" },
                                  {
                                    default: (0, se.w5)(() => [
                                      (0, se._)(
                                        "a",
                                        {
                                          class: "btn-ghost",
                                          href: o.url,
                                          "data-hotkey": n.hotkeys.edit,
                                          tabIndex: o.tabIndex,
                                        },
                                        [(0, se.Wm)(s, { name: "code" })],
                                        8,
                                        Ht
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["content"]
                                ),
                                n.script.config.removed
                                  ? (0, se.kq)("", !0)
                                  : ((0, se.wg)(),
                                    (0, se.iD)(
                                      se.HY,
                                      { key: 0 },
                                      [
                                        (0, se.Wm)(
                                          r,
                                          { content: o.labelEnable, align: "start" },
                                          {
                                            default: (0, se.w5)(() => [
                                              (0, se._)(
                                                "a",
                                                {
                                                  class: "btn-ghost",
                                                  onClick: t[0] || (t[0] = (...e) => o.onToggle && o.onToggle(...e)),
                                                  "data-hotkey": n.hotkeys.toggle,
                                                  tabIndex: o.tabIndex,
                                                },
                                                [
                                                  (0, se.Wm)(
                                                    s,
                                                    { name: "toggle-" + (n.script.config.enabled ? "on" : "off") },
                                                    null,
                                                    8,
                                                    ["name"]
                                                  ),
                                                ],
                                                8,
                                                jt
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ["content"]
                                        ),
                                        (0, se.Wm)(
                                          r,
                                          {
                                            disabled: !n.script.$canUpdate || n.script.checking,
                                            content: e.i18n("updateScript"),
                                            align: "start",
                                          },
                                          {
                                            default: (0, se.w5)(() => [
                                              (0, se._)(
                                                "a",
                                                {
                                                  class: "btn-ghost",
                                                  onClick: t[1] || (t[1] = (...e) => o.onUpdate && o.onUpdate(...e)),
                                                  "data-hotkey": n.hotkeys.update,
                                                  tabIndex: n.script.$canUpdate ? o.tabIndex : -1,
                                                },
                                                [
                                                  (0, se.Wm)(
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
                                                Wt
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
                                (0, se.Wm)(
                                  r,
                                  { disabled: !o.description, content: o.description, align: "start" },
                                  {
                                    default: (0, se.w5)(() => [
                                      (0, se._)(
                                        "a",
                                        {
                                          class: "btn-ghost",
                                          tabIndex: o.description ? o.tabIndex : -1,
                                          onClick: t[2] || (t[2] = (...e) => o.toggleTip && o.toggleTip(...e)),
                                        },
                                        [(0, se.Wm)(s, { name: "info" })],
                                        8,
                                        Rt
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["disabled", "content"]
                                ),
                                ((0, se.wg)(!0),
                                (0, se.iD)(
                                  se.HY,
                                  null,
                                  (0, se.Ko)(
                                    o.urls,
                                    ([e, t], n) => (
                                      (0, se.wg)(),
                                      (0, se.j4)(
                                        r,
                                        { key: n, disabled: !t, content: e, align: "start" },
                                        {
                                          default: (0, se.w5)(() => [
                                            (0, se._)(
                                              "a",
                                              {
                                                class: "btn-ghost",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                href: t,
                                                tabIndex: t ? o.tabIndex : -1,
                                              },
                                              [(0, se.Wm)(s, { name: n }, null, 8, ["name"])],
                                              8,
                                              Tt
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
                                  ? ((0, se.wg)(),
                                    (0, se.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "script-message",
                                        textContent: (0, re.zw)(n.script.message),
                                        title: n.script.error,
                                      },
                                      null,
                                      8,
                                      Mt
                                    ))
                                  : (0, se.kq)("", !0),
                              ],
                              64
                            ))
                          : (0, se.kq)("", !0),
                      ]),
                      (0, se._)("div", Ot, [
                        a.canRender
                          ? ((0, se.wg)(),
                            (0, se.iD)(
                              se.HY,
                              { key: 0 },
                              [
                                o.showRecycle || !n.script.config.removed
                                  ? ((0, se.wg)(),
                                    (0, se.j4)(
                                      r,
                                      { key: 0, content: e.i18n("buttonRemove"), align: "end" },
                                      {
                                        default: (0, se.w5)(() => [
                                          (0, se._)(
                                            "a",
                                            {
                                              class: (0, re.C_)([
                                                "btn-ghost",
                                                { "btn-danger": n.script.config.removed },
                                              ]),
                                              onClick: t[3] || (t[3] = (...e) => o.onRemove && o.onRemove(...e)),
                                              "data-hotkey": n.hotkeys.remove,
                                              tabIndex: o.tabIndex,
                                            },
                                            [(0, se.Wm)(s, { name: "trash" })],
                                            10,
                                            Et
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, se.kq)("", !0),
                                n.script.config.removed
                                  ? ((0, se.wg)(),
                                    (0, se.j4)(
                                      r,
                                      { key: 1, content: e.i18n("buttonRestore"), placement: "left" },
                                      {
                                        default: (0, se.w5)(() => [
                                          (0, se._)(
                                            "a",
                                            {
                                              class: "btn-ghost",
                                              onClick: t[4] || (t[4] = (...e) => o.onRestore && o.onRestore(...e)),
                                              "data-hotkey": n.hotkeys.restore,
                                              tabIndex: o.tabIndex,
                                            },
                                            [(0, se.Wm)(s, { name: "undo" })],
                                            8,
                                            Zt
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, se.kq)("", !0),
                              ],
                              64
                            ))
                          : (0, se.kq)("", !0),
                      ]),
                    ],
                    42,
                    vt
                  )
                )
              },
            ],
          ])
          var At = z(206),
            Lt = z(6115),
            Ft = z(715)
          const qt = { class: "form-group condensed" },
            Nt = ["textContent"],
            Bt = ["textContent"],
            Kt = ["textContent"],
            Jt = ["disabled"],
            Gt = ["textContent"],
            Xt = ["textContent"],
            Qt = {
              __name: "settings-update",
              props: { script: u },
              setup(e) {
                const t = e,
                  n = (0, se.Fl)(() => t.script.config),
                  l = (0, se.Fl)(() => !t.script._remote)
                return (e, t) => (
                  (0, se.wg)(),
                  (0, se.iD)("div", null, [
                    (0, se._)("div", qt, [
                      (0, se._)("label", null, [
                        (0, se.wy)(
                          (0, se._)(
                            "input",
                            (0, se.dG)(
                              {
                                type: "checkbox",
                                "onUpdate:modelValue": t[0] || (t[0] = (e) => (n.value.shouldUpdate = e)),
                              },
                              { disabled: l.value }
                            ),
                            null,
                            16
                          ),
                          [[fe.e8, n.value.shouldUpdate]]
                        ),
                        (0, se._)("span", { textContent: (0, re.zw)(e.i18n("labelAllowUpdate")) }, null, 8, Nt),
                        (0, se._)(
                          "span",
                          { textContent: (0, re.zw)(e.i18n("labelNotifyThisUpdated")), class: "melt" },
                          null,
                          8,
                          Bt
                        ),
                      ]),
                      ((0, se.wg)(!0),
                      (0, se.iD)(
                        se.HY,
                        null,
                        (0, se.Ko)(
                          [
                            [e.i18n("genericOn"), "1"],
                            [e.i18n("genericOff"), "0"],
                            [e.i18n("genericUseGlobal"), ""],
                          ],
                          ([e, a]) => (
                            (0, se.wg)(),
                            (0, se.iD)("label", { class: "ml-1 melt", key: a }, [
                              (0, se.wy)(
                                (0, se._)(
                                  "input",
                                  (0, se.dG)(
                                    { type: "radio" },
                                    { value: a, disabled: l.value },
                                    { "onUpdate:modelValue": t[1] || (t[1] = (e) => (n.value.notifyUpdates = e)) }
                                  ),
                                  null,
                                  16
                                ),
                                [[fe.G2, n.value.notifyUpdates]]
                              ),
                              (0, se.Uk)(),
                              (0, se._)("span", { textContent: (0, re.zw)(e) }, null, 8, Kt),
                            ])
                          )
                        ),
                        128
                      )),
                    ]),
                    (0, se._)("label", null, [
                      (0, se.wy)(
                        (0, se._)(
                          "input",
                          {
                            type: "checkbox",
                            "onUpdate:modelValue": t[2] || (t[2] = (e) => (n.value._editable = e)),
                            class: "scary-switch",
                            disabled: l.value || !n.value.shouldUpdate,
                          },
                          null,
                          8,
                          Jt
                        ),
                        [[fe.e8, n.value._editable]]
                      ),
                      (0, se._)("span", { textContent: (0, re.zw)(e.i18n("readonlyOpt")) }, null, 8, Gt),
                      (0, se.Uk)(),
                      (0, se._)("span", { textContent: (0, re.zw)(e.i18n("readonlyOptWarn")) }, null, 8, Xt),
                    ]),
                  ])
                )
              },
            },
            en = { class: "edit-settings" },
            tn = ["textContent"],
            nn = { class: "mb-2" },
            ln = ["textContent"],
            an = ["textContent"],
            on = ["disabled"],
            sn = ["textContent"],
            rn = (0, se._)("td", null, [(0, se._)("code", null, "@run-at")], -1),
            cn = ["textContent"],
            un = ["disabled"],
            dn = ["textContent"],
            pn = (0, se._)("option", { value: "document-start" }, "document-start", -1),
            mn = (0, se._)("option", { value: "document-body" }, "document-body", -1),
            gn = (0, se._)("option", { value: "document-end" }, "document-end", -1),
            vn = (0, se._)("option", { value: "document-idle" }, "document-idle", -1),
            hn = (0, se._)(
              "td",
              null,
              [
                (0, se._)("code", null, [
                  (0, se.Uk)("@"),
                  (0, se._)("s", { style: { color: "var(--fill-6)" } }, "no"),
                  (0, se.Uk)("frames"),
                ]),
              ],
              -1
            ),
            fn = ["textContent"],
            wn = ["disabled"],
            bn = ["textContent"],
            yn = ["textContent"],
            xn = ["textContent"],
            Cn = (0, se._)("td", null, [(0, se._)("code", null, "@inject-into")], -1),
            _n = ["textContent"],
            kn = ["disabled"],
            Sn = ["textContent"],
            Un = ["textContent"],
            zn = ["textContent"],
            Dn = ["textContent"],
            $n = ["onUpdate:modelValue", "placeholder", "disabled"],
            Hn = ["textContent"],
            jn = ["textContent"],
            Wn = ["textContent"],
            In = ["onUpdate:modelValue", "disabled"],
            Rn = ["textContent"],
            Tn = ["onUpdate:modelValue", "rows", "disabled"],
            Mn = {
              __name: "settings",
              props: { script: u, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, R.XI)(Ft.Wg),
                  l = (e) => {
                    var t
                    return (null == (t = e.match(/^(.*?)(@[-a-z]+)(.*)/)) ? void 0 : t.slice(1)) || [e, "", ""]
                  },
                  a = (0, se.Fl)(() => t.script.config),
                  o = (0, se.Fl)(() => t.script.custom),
                  i = (0, se.Fl)(() => {
                    const { script: e } = t,
                      { meta: n } = e
                    return {
                      ...(0, be.zr)(n, [J, G]),
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
                  (0, se.wg)(),
                  (0, se.iD)("div", en, [
                    (0, se._)("h4", { textContent: (0, re.zw)((0, R.SU)(D.ag)("editLabelSettings")) }, null, 8, tn),
                    (0, se._)("div", nn, [
                      (0, se._)("label", null, [
                        (0, se.wy)(
                          (0, se._)(
                            "input",
                            { type: "checkbox", "onUpdate:modelValue": l[0] || (l[0] = (e) => (a.value.enabled = e)) },
                            null,
                            512
                          ),
                          [[fe.e8, a.value.enabled]]
                        ),
                        (0, se._)("span", { textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonEnable")) }, null, 8, ln),
                      ]),
                    ]),
                    (0, se.Wm)((0, R.SU)(Qt), (0, re.vs)((0, se.F4)({ script: e.script })), null, 16),
                    (0, se._)("table", null, [
                      (0, se._)("tr", null, [
                        (0, se._)("td", { textContent: (0, re.zw)((0, R.SU)(D.ag)("labelTags")) }, null, 8, an),
                        (0, se._)("td", null, [
                          (0, se.wy)(
                            (0, se._)(
                              "input",
                              {
                                type: "text",
                                "onUpdate:modelValue": l[1] || (l[1] = (e) => (o.value.tags = e)),
                                disabled: e.readOnly,
                              },
                              null,
                              8,
                              on
                            ),
                            [[fe.nr, o.value.tags]]
                          ),
                        ]),
                      ]),
                    ]),
                    (0, se._)("h4", { textContent: (0, re.zw)((0, R.SU)(D.ag)("editLabelMeta")) }, null, 8, sn),
                    (0, se._)("table", null, [
                      (0, se._)("tr", null, [
                        rn,
                        (0, se._)("td", null, [
                          (0, se._)("p", { textContent: (0, re.zw)((0, R.SU)(D.ag)("labelRunAt")) }, null, 8, cn),
                        ]),
                        (0, se._)("td", null, [
                          (0, se.wy)(
                            (0, se._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[2] || (l[2] = (e) => (o.value.runAt = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, se._)(
                                  "option",
                                  { value: "", textContent: (0, re.zw)((0, R.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  dn
                                ),
                                pn,
                                mn,
                                gn,
                                vn,
                              ],
                              8,
                              un
                            ),
                            [[fe.bM, o.value.runAt]]
                          ),
                        ]),
                      ]),
                      (0, se._)("tr", null, [
                        hn,
                        (0, se._)("td", null, [
                          (0, se._)("p", { textContent: (0, re.zw)((0, R.SU)(D.ag)("labelNoFrames")) }, null, 8, fn),
                        ]),
                        (0, se._)("td", null, [
                          (0, se.wy)(
                            (0, se._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[3] || (l[3] = (e) => (o.value.noframes = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, se._)(
                                  "option",
                                  { value: "", textContent: (0, re.zw)((0, R.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  bn
                                ),
                                (0, se._)(
                                  "option",
                                  { value: "0", textContent: (0, re.zw)((0, R.SU)(D.ag)("genericOn")) },
                                  null,
                                  8,
                                  yn
                                ),
                                (0, se._)(
                                  "option",
                                  { value: "1", textContent: (0, re.zw)((0, R.SU)(D.ag)("genericOff")) },
                                  null,
                                  8,
                                  xn
                                ),
                              ],
                              8,
                              wn
                            ),
                            [[fe.bM, o.value.noframes]]
                          ),
                        ]),
                      ]),
                      (0, se._)("tr", null, [
                        Cn,
                        (0, se._)("td", null, [
                          (0, se._)(
                            "p",
                            { textContent: (0, re.zw)((0, R.SU)(D.ag)("labelInjectionMode")) },
                            null,
                            8,
                            _n
                          ),
                        ]),
                        (0, se._)("td", null, [
                          (0, se.wy)(
                            (0, se._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[4] || (l[4] = (e) => (o.value.injectInto = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, se._)(
                                  "option",
                                  { value: "", textContent: (0, re.zw)((0, R.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Sn
                                ),
                                ((0, se.wg)(!0),
                                (0, se.iD)(
                                  se.HY,
                                  null,
                                  (0, se.Ko)(
                                    n.value,
                                    (e, t) => (
                                      (0, se.wg)(),
                                      (0, se.iD)("option", { key: t, textContent: (0, re.zw)(t) }, null, 8, Un)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              kn
                            ),
                            [[fe.bM, o.value.injectInto]]
                          ),
                        ]),
                      ]),
                      ((0, se.wg)(),
                      (0, se.iD)(
                        se.HY,
                        null,
                        (0, se.Ko)(s, ([t, n]) =>
                          (0, se._)("tr", { key: t }, [
                            (0, se._)("td", null, [
                              (0, se._)("code", { textContent: (0, re.zw)(`@${t}`) }, null, 8, zn),
                            ]),
                            (0, se._)("td", null, [(0, se._)("p", { textContent: (0, re.zw)(n) }, null, 8, Dn)]),
                            (0, se._)("td", null, [
                              (0, se.wy)(
                                (0, se._)(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": (e) => (o.value[t] = e),
                                    placeholder: i.value[t],
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  $n
                                ),
                                [[fe.nr, o.value[t]]]
                              ),
                            ]),
                          ])
                        ),
                        64
                      )),
                    ]),
                    (0, se._)("table", null, [
                      ((0, se.wg)(),
                      (0, se.iD)(
                        se.HY,
                        null,
                        (0, se.Ko)(r, ([n, l, a, i, s]) =>
                          (0, se._)("tr", { key: n }, [
                            (0, se._)("td", null, [
                              (0, se._)("p", null, [
                                (0, se._)("span", { textContent: (0, re.zw)(a) }, null, 8, Hn),
                                (0, se._)("code", { textContent: (0, re.zw)(i) }, null, 8, jn),
                                (0, se._)("span", { textContent: (0, re.zw)(s) }, null, 8, Wn),
                              ]),
                              (0, se._)("label", null, [
                                (0, se.wy)(
                                  (0, se._)(
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
                                  [[fe.e8, o.value[l]]]
                                ),
                                (0, se._)(
                                  "span",
                                  { textContent: (0, re.zw)((0, R.SU)(D.ag)("labelKeepOriginal")) },
                                  null,
                                  8,
                                  Rn
                                ),
                              ]),
                            ]),
                            (0, se._)("td", null, [
                              (0, se.wy)(
                                (0, se._)(
                                  "textarea",
                                  {
                                    "onUpdate:modelValue": (e) => (o.value[n] = e),
                                    spellcheck: "false",
                                    rows: t.calcRows(o.value[n]),
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  Tn
                                ),
                                [[fe.nr, o.value[n]]]
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
          var On = z(2274)
          const En = ["data-editing"],
            Zn = { class: "flex-1 flex flex-col" },
            Vn = { class: "mb-1" },
            Pn = { key: 1, class: "inline-block ml-2" },
            Yn = ["disabled"],
            An = ["textContent"],
            Ln = ["textContent"],
            Fn = ["disabled"],
            qn = { class: "ml-2 mr-2c" },
            Nn = (0, se._)("kbd", null, "PageUp", -1),
            Bn = (0, se._)("kbd", null, "PageDown", -1),
            Kn = (0, se._)("kbd", null, "\u2191", -1),
            Jn = (0, se._)("kbd", null, "\u2193", -1),
            Gn = (0, se._)("kbd", null, "Tab", -1),
            Xn = (0, se._)("kbd", null, "Shift-Tab", -1),
            Qn = (0, se._)("kbd", null, "Enter", -1),
            el = (0, se._)("kbd", null, "Ctrl-Del", -1),
            tl = ["onKeydown"],
            nl = ["textContent"],
            ll = ["onKeydown", "onClick"],
            al = { class: "ellipsis" },
            ol = ["textContent"],
            il = ["textContent"],
            sl = ["textContent"],
            rl = ["onClick"],
            cl = ["textContent"],
            ul = ["textContent"],
            dl = ["onKeydown"],
            pl = ["onClick"],
            ml = ["textContent"],
            gl = ["textContent"],
            vl = ["textContent"],
            hl = { key: 0, class: "edit-values-panel flex flex-col flex-1 mb-1c" },
            fl = { class: "control" },
            wl = ["textContent"],
            bl = { class: "flex center-items" },
            yl = ["textContent", "onClick", "title", "disabled"],
            xl = ["textContent"],
            Cl = ["innerHTML"],
            _l = ["textContent"],
            kl = ["readOnly", "onKeydown"],
            Sl = ["textContent"],
            Ul = {
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
                  b = (0, se.Fl)(() => q(u.values(f.value), "key")),
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
                  k = (e) => he.$J.setContext("edit", "selectionEnd" in e.target),
                  U = (0, se.Fl)(() => u.keys(h.value || {}).sort()),
                  z = (0, se.Fl)(() => Math.ceil(U.value.length / 25)),
                  $ = (0, se.Fl)(() => {
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
                  ;(0, se.Y3)(() => {
                    l.value[e ? "click" : "focus"]()
                  })
                }
                function V(e) {
                  d.value = Math.max(1, Math.min(z.value, d.value + e))
                }
                function P(e, t) {
                  const n = e.length + (h.value[e] || t).length - 1
                  return n < 1e4 ? n : (0, D.aj)(n)
                }
                function Y(e, t, n) {
                  let l = h.value[e] || n
                  const a = l[0]
                  return (l = l.slice(1)), "s" === a ? (l = JSON.stringify(l)) : t || (l = C(l)), t ? x(l) : l
                }
                function A() {
                  return `{\n${E}${U.value
                    .map((e) => `${JSON.stringify(e)}: ${Y(e)}`)
                    .join(",\n")
                    .replace(/\n/g, "\n" + E)}\n}`
                }
                function L(e, t) {
                  null != e || (e = {})
                  const n = h.value
                  let l
                  if (
                    (t
                      ? (w(be.LI, n, ([t, n]) => {
                          n !== e[t] && (K(t), (l = !0))
                        }),
                        null != l || (l = !0))
                      : (l = !(0, be.vZ)(n, e)),
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
                function K(e, t = h.value[e], n = Y(e, !0), l = P(e, t)) {
                  ;(f.value || (f.value = {}))[e + Math.random()] = { key: e, rawValue: t, cut: n, len: l }
                }
                function J(e) {
                  var t
                  N({ key: e }), K(e), (null == (t = r.value) ? void 0 : t.key) === e && (r.value = null)
                }
                function G(e) {
                  const t = f.value,
                    n = t[e]
                  delete t[e], (0, D.xb)(t) && (f.value = null), N(n)
                }
                function X(e) {
                  r.value = { key: e, value: Y(e), ...y }
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
                    const e = w(be.Xw, n.jsonValue, (e) => (0, D.bd)(e) || "")
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
                function ae(e) {
                  const t = u.values(e)[0].newValue
                  if (t) {
                    const e = r.value,
                      n = null == e ? void 0 : e.key,
                      l = e && (e.isAll ? A : Y)
                    if ((L(t instanceof u ? t : (0, be.p$)(t)), e)) {
                      const t = l(n)
                      H.getValue() === t ? ((e.isNew = !1), (e.dirty = !1)) : e.dirty || ((e.value = t), le())
                    }
                  } else L(t)
                }
                function oe(e) {
                  ;(0, he.nk)(("ArrowDown" === e.key ? 1 : e.target !== l.value && -1) || 0)
                }
                return (
                  (0, se.dl)(() => {
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
                        he.$J.register("pageup", () => V(-1), _),
                        he.$J.register("pagedown", () => V(1), _),
                        (0, we.Z)("valueEditor", (e) => {
                          if (((j = e), (E = " ".repeat((null == e ? void 0 : e.tabSize) || 2)), H && e))
                            for (const t in e) "mode" !== t && H.setOption(t, e[t])
                        }),
                      ]),
                      (O = g.runtime.connect({
                        name:
                          Ft.vy +
                          JSON.stringify({ cfg: { value: a }, id: null == o ? void 0 : o[Ft.vy](ae), tabId: M.tab.id }),
                      })),
                      o || O.onMessage.addListener(ae),
                      (s.value = !0)
                  }),
                  (0, se.se)(() => {
                    var e, t
                    ;(s.value = !1),
                      null == (e = I) || e.forEach((e) => e()),
                      null == (t = O) || t.disconnect(),
                      (I = O = null)
                  }),
                  (0, se.YP)(r, (e, t) => {
                    if (e)
                      (T = (0, W.vY)()),
                        (0, se.Y3)(() => {
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
                  (0, se.YP)(d, () => {
                    ;(T = null), Z()
                  }),
                  (t, u) => (
                    (0, se.wg)(),
                    (0, se.iD)(
                      "div",
                      { class: "edit-values flex", ref_key: "$el", ref: n, "data-editing": r.value && "" },
                      [
                        (0, se._)("div", Zn, [
                          (0, se._)("div", Vn, [
                            e.readOnly
                              ? (0, se.kq)("", !0)
                              : ((0, se.wg)(), (0, se.iD)("button", { key: 0, onClick: B }, "+")),
                            z.value > 1
                              ? ((0, se.wg)(),
                                (0, se.iD)("div", Pn, [
                                  (0, se._)(
                                    "button",
                                    { disabled: 1 === d.value, onClick: u[0] || (u[0] = (e) => (d.value -= 1)) },
                                    "\u2190",
                                    8,
                                    Yn
                                  ),
                                  (0, se._)("span", { class: "ml-1", textContent: (0, re.zw)(d.value) }, null, 8, An),
                                  (0, se.Uk)(" / "),
                                  (0, se._)("span", { class: "mr-1", textContent: (0, re.zw)(z.value) }, null, 8, Ln),
                                  (0, se._)(
                                    "button",
                                    { disabled: d.value >= z.value, onClick: u[1] || (u[1] = (e) => (d.value += 1)) },
                                    "\u2192",
                                    8,
                                    Fn
                                  ),
                                ]))
                              : (0, se.kq)("", !0),
                            (0, se._)("span", qn, [
                              (0, se._)("span", null, [
                                z.value > 1
                                  ? ((0, se.wg)(),
                                    (0, se.iD)(se.HY, { key: 0 }, [Nn, (0, se.Uk)(", "), Bn, (0, se.Uk)(", ")], 64))
                                  : (0, se.kq)("", !0),
                                Kn,
                                (0, se.Uk)(", "),
                                Jn,
                                (0, se.Uk)(", "),
                                Gn,
                                (0, se.Uk)(", "),
                                Xn,
                                (0, se.Uk)(", "),
                              ]),
                              (0, se._)("span", null, [
                                Qn,
                                (0, se.Uk)(": " + (0, re.zw)(t.i18n("buttonEdit")) + ",", 1),
                              ]),
                              (0, se._)("span", null, [el, (0, se.Uk)(": " + (0, re.zw)(t.i18n("buttonRemove")), 1)]),
                            ]),
                          ]),
                          (0, se._)(
                            "div",
                            {
                              class: "edit-values-table main",
                              style: (0, re.j5)($.value.style),
                              onKeydown: [
                                (0, fe.D2)((0, fe.iM)(oe, ["exact"]), ["down"]),
                                (0, fe.D2)((0, fe.iM)(oe, ["exact"]), ["up"]),
                              ],
                            },
                            [
                              (0, se._)(
                                "a",
                                {
                                  ref_key: "$editAll",
                                  ref: l,
                                  class: "edit-values-row flex",
                                  onClick: Q,
                                  tabindex: "0",
                                  textContent: (0, re.zw)(t.i18n("editValueAllHint")),
                                },
                                null,
                                8,
                                nl
                              ),
                              ((0, se.wg)(!0),
                              (0, se.iD)(
                                se.HY,
                                null,
                                (0, se.Ko)(
                                  $.value,
                                  (e) => (
                                    (0, se.wg)(),
                                    (0, se.iD)(
                                      "div",
                                      {
                                        key: e,
                                        class: "edit-values-row flex monospace-font",
                                        onKeydown: (0, fe.D2)(
                                          (0, fe.iM)((t) => J(e), ["ctrl", "exact"]),
                                          ["delete"]
                                        ),
                                        onClick: (t) => X(e),
                                      },
                                      [
                                        (0, se._)("div", al, [
                                          (0, se._)("a", { textContent: (0, re.zw)(e), tabindex: "0" }, null, 8, ol),
                                        ]),
                                        (0, se._)(
                                          "div",
                                          { class: "ellipsis flex-auto", textContent: (0, re.zw)(Y(e, !0)) },
                                          null,
                                          8,
                                          il
                                        ),
                                        (0, se._)("pre", { textContent: (0, re.zw)(P(e)) }, null, 8, sl),
                                        (0, se._)(
                                          "div",
                                          { class: "del", onClick: (0, fe.iM)((t) => J(e), ["stop"]) },
                                          [(0, se.Wm)((0, R.SU)(_e.Z), { name: "trash" })],
                                          8,
                                          rl
                                        ),
                                      ],
                                      40,
                                      ll
                                    )
                                  )
                                ),
                                128
                              )),
                            ],
                            44,
                            tl
                          ),
                          c.value || U.value.length
                            ? (0, se.kq)("", !0)
                            : ((0, se.wg)(),
                              (0, se.iD)(
                                "div",
                                {
                                  key: 0,
                                  class: "edit-values-empty mt-1",
                                  textContent: (0, re.zw)(t.i18n("noValues")),
                                },
                                null,
                                8,
                                cl
                              )),
                          f.value
                            ? ((0, se.wg)(),
                              (0, se.iD)(
                                "h3",
                                { key: 1, textContent: (0, re.zw)(t.i18n("headerRecycleBin")) },
                                null,
                                8,
                                ul
                              ))
                            : (0, se.kq)("", !0),
                          f.value
                            ? ((0, se.wg)(),
                              (0, se.iD)(
                                "div",
                                {
                                  key: 2,
                                  class: "edit-values-table trash monospace-font",
                                  onKeydown: [
                                    (0, fe.D2)((0, fe.iM)(oe, ["exact"]), ["down"]),
                                    (0, fe.D2)((0, fe.iM)(oe, ["exact"]), ["up"]),
                                  ],
                                  style: (0, re.j5)(b.value),
                                },
                                [
                                  ((0, se.wg)(!0),
                                  (0, se.iD)(
                                    se.HY,
                                    null,
                                    (0, se.Ko)(
                                      f.value,
                                      ({ key: e, cut: t, len: n }, l) => (
                                        (0, se.wg)(),
                                        (0, se.iD)(
                                          "div",
                                          { key: l, class: "edit-values-row flex", onClick: (e) => G(l) },
                                          [
                                            (0, se._)(
                                              "a",
                                              { class: "ellipsis", textContent: (0, re.zw)(e), tabindex: "0" },
                                              null,
                                              8,
                                              ml
                                            ),
                                            (0, se._)(
                                              "s",
                                              { class: "ellipsis flex-auto", textContent: (0, re.zw)(t) },
                                              null,
                                              8,
                                              gl
                                            ),
                                            (0, se._)("pre", { textContent: (0, re.zw)(n) }, null, 8, vl),
                                          ],
                                          8,
                                          pl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ],
                                44,
                                dl
                              ))
                            : (0, se.kq)("", !0),
                        ]),
                        r.value
                          ? ((0, se.wg)(),
                            (0, se.iD)("div", hl, [
                              (0, se._)("div", fl, [
                                (0, se._)(
                                  "h4",
                                  {
                                    textContent: (0, re.zw)(
                                      r.value.isAll ? t.i18n("labelEditValueAll") : t.i18n("labelEditValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  wl
                                ),
                                (0, se._)("div", bl, [
                                  (0, se._)(
                                    "a",
                                    {
                                      tabindex: "0",
                                      class: "mr-1 flex",
                                      onClick: u[2] || (u[2] = (e) => (i.value = !i.value)),
                                    },
                                    [
                                      (0, se.Wm)(
                                        (0, R.SU)(_e.Z),
                                        { name: "cog", class: (0, re.C_)({ active: i.value }) },
                                        null,
                                        8,
                                        ["class"]
                                      ),
                                    ]
                                  ),
                                  ((0, se.wg)(!0),
                                  (0, se.iD)(
                                    se.HY,
                                    null,
                                    (0, se.Ko)(
                                      [t.i18n("buttonOK"), t.i18n("buttonApply")],
                                      (e, t) => (
                                        (0, se.wg)(),
                                        (0, se.iD)(
                                          "button",
                                          {
                                            key: e,
                                            textContent: (0, re.zw)(e),
                                            onClick: (e) => ee(t),
                                            class: (0, re.C_)({ "has-error": r.value.error, "save-beacon": !t }),
                                            title: r.value.error,
                                            disabled: r.value.error || !r.value.dirty,
                                          },
                                          null,
                                          10,
                                          yl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, se._)(
                                    "button",
                                    { textContent: (0, re.zw)(t.i18n("buttonCancel")), onClick: te, title: "Esc" },
                                    null,
                                    8,
                                    xl
                                  ),
                                ]),
                              ]),
                              i.value
                                ? ((0, se.wg)(),
                                  (0, se.iD)(
                                    se.HY,
                                    { key: 0 },
                                    [
                                      (0, se._)(
                                        "p",
                                        { class: "my-1", innerHTML: t.i18n("descEditorOptions") },
                                        null,
                                        8,
                                        Cl
                                      ),
                                      (0, se.Wm)(
                                        (0, R.SU)(On.Z),
                                        { name: "valueEditor", json: "", onDblclick: (0, R.SU)(ie), "has-save": !1 },
                                        null,
                                        8,
                                        ["onDblclick"]
                                      ),
                                    ],
                                    64
                                  ))
                                : (0, se.kq)("", !0),
                              (0, se.wy)(
                                (0, se._)(
                                  "label",
                                  null,
                                  [
                                    (0, se._)(
                                      "span",
                                      { textContent: (0, re.zw)(t.i18n("valueLabelKey")) },
                                      null,
                                      8,
                                      _l
                                    ),
                                    (0, se.wy)(
                                      (0, se._)(
                                        "input",
                                        {
                                          type: "text",
                                          "onUpdate:modelValue": u[3] || (u[3] = (e) => (r.value.key = e)),
                                          readOnly: !r.value.isNew || e.readOnly,
                                          ref_key: "$key",
                                          ref: a,
                                          spellcheck: "false",
                                          onKeydown: (0, fe.D2)((0, fe.iM)(te, ["exact", "stop"]), ["esc"]),
                                        },
                                        null,
                                        40,
                                        kl
                                      ),
                                      [[fe.nr, r.value.key]]
                                    ),
                                  ],
                                  512
                                ),
                                [[fe.F8, !r.value.isAll]]
                              ),
                              (0, se._)("label", null, [
                                (0, se._)(
                                  "span",
                                  {
                                    textContent: (0, re.zw)(
                                      r.value.isAll ? t.i18n("valueLabelValueAll") : t.i18n("valueLabelValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  Sl
                                ),
                                (0, se.Wm)(
                                  (0, R.SU)(At.default),
                                  {
                                    value: r.value.value,
                                    "cm-options": (0, R.SU)(j),
                                    ref_key: "$value",
                                    ref: o,
                                    class: "h-100 mt-1",
                                    mode: "application/json",
                                    readOnly: e.readOnly,
                                    onCodeDirty: le,
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
                          : (0, se.kq)("", !0),
                      ],
                      8,
                      En
                    )
                  )
                )
              },
            },
            zl = Ul,
            Dl = { class: "edit-help mb-2c" },
            $l = ["innerHTML"],
            Hl = (0, se._)(
              "a",
              { href: "https://violentmonkey.github.io/api/", rel: "noopener noreferrer", target: "_blank" },
              "violentmonkey.github.io/api/",
              -1
            ),
            jl = { class: "keyboard" },
            Wl = ["textContent"],
            Il = ["textContent"],
            Rl = ["textContent"],
            Tl = {
              __name: "help",
              props: { hotkeys: Array },
              setup: (e) => (t, n) => (
                (0, se.wg)(),
                (0, se.iD)("div", Dl, [
                  (0, se._)("div", null, [
                    (0, se._)("h3", { innerHTML: t.i18n("editHelpDocumention") }, null, 8, $l),
                    Hl,
                  ]),
                  (0, se._)("div", jl, [
                    (0, se._)("h3", { textContent: (0, re.zw)(t.i18n("editHelpKeyboard")) }, null, 8, Wl),
                    ((0, se.wg)(!0),
                    (0, se.iD)(
                      se.HY,
                      null,
                      (0, se.Ko)(
                        e.hotkeys,
                        ([e, t]) => (
                          (0, se.wg)(),
                          (0, se.iD)("dl", { key: e }, [
                            (0, se._)("dt", { class: "monospace-font", textContent: (0, re.zw)(e) }, null, 8, Il),
                            (0, se._)("dd", { textContent: (0, re.zw)(t) }, null, 8, Rl),
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
            Ol = ["textContent", "onClick"],
            El = { class: "edit-name text-center ellipsis flex-1" },
            Zl = ["textContent"],
            Vl = ["textContent"],
            Pl = { key: 1, class: "edit-hint text-right ellipsis" },
            Yl = ["href", "textContent"],
            Al = { class: "mr-1" },
            Ll = ["textContent", "disabled", "title"],
            Fl = ["textContent", "disabled"],
            ql = ["textContent"],
            Nl = { key: 0, class: "frozen-note shelf mr-2c flex flex-wrap" },
            Bl = ["textContent"],
            Kl = { key: 1, class: "shelf fatal" },
            Jl = ["textContent"],
            Gl = { key: 2, class: "errors shelf my-1c" },
            Xl = ["textContent"],
            Ql = ["textContent"],
            ea = { key: 1, class: "my-1" },
            ta = "https://violentmonkey.github.io/api/matching/",
            na = { [G]: "", [K]: "", [le]: "", [B]: "", [J]: "", [ee]: !0, [X]: !0, [te]: !0, [Q]: !0, tags: "" },
            la = (e) => ("" !== e ? e : null),
            aa = [A, L, F, q],
            oa = (e) =>
              e.trim()
                ? e
                    .split("\n")
                    .map((e) => e.trim())
                    .filter(r)
                : null,
            ia = [l, a],
            sa = (e) => e || null,
            ra = (e, t) => (e < t ? -1 : e > t),
            ca = ({ shouldUpdate: e, _editable: t }) => +e && e + t,
            ua = (e, t) => {
              if (t >= 0) {
                const n = e.lastIndexOf("\n", t) + 1,
                  l = e.indexOf("\n", t)
                return e.slice(n, l > 0 ? l : void 0)
              }
            },
            da = /#/,
            pa = {
              __name: "index",
              props: { initial: u, initialCode: String, readOnly: r },
              emits: ["close"],
              setup(t, { emit: n }) {
                const l = t
                let a, o, i, r, c, d, m
                const v = (0, R.iH)(),
                  h = (0, R.iH)(),
                  f = (0, R.iH)("code"),
                  x = (0, R.iH)(!1),
                  C = (0, R.iH)(),
                  _ = (0, R.iH)(""),
                  k = (0, R.iH)(!1),
                  S = { save: Z, close: V },
                  U = (0, R.iH)(),
                  z = (0, R.iH)(),
                  $ = (0, se.Fl)(() => {
                    for (let e = 0, t = ["meta", "custom"]; e < t.length; e++) {
                      const n = t[e]
                      for (let e = 0; e < aa.length; e++) {
                        const t = aa[e]
                        let l = C.value[n][t]
                        if (l && (l = s(l) ? l.find(da.test, da) : ua(l, l.indexOf("#"))))
                          return l.length > 100 ? l.slice(0, 100) + "..." : l
                      }
                    }
                  }),
                  H = (0, R.iH)(),
                  I = (0, R.iH)(!1),
                  M = (0, R.iH)(!1),
                  O = (0, se.Fl)(() => {
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
                  E = (0, se.Fl)(() => (Y.title = (0, D.pV)(C.value)))
                ;(0, se.YP)(
                  f,
                  async (e) => {
                    await (0, se.Y3)(), "code" === e ? a.focus() : (0, W.wO)(h.value.$el)
                  },
                  { immediate: !0 }
                ),
                  (0, se.YP)(x, (e) => {
                    m(e), he.$J.setContext("canSave", e)
                  }),
                  (0, se.YP)(
                    () => l.initial.error,
                    (e) => {
                      e && (0, W.PV)({ text: `${l.initial.message}\n\n${e}` })
                    }
                  ),
                  (0, se.YP)(k, N),
                  (0, se.YP)(C, (e) => {
                    const { custom: t, config: n } = e,
                      { shouldUpdate: l } = n
                    ;(n._editable = 2 === l),
                      (n.enabled = !!n.enabled),
                      (n.shouldUpdate = !!l),
                      (n.notifyUpdates = (0, D.jd)(n.notifyUpdates)),
                      (t.noframes = (0, D.jd)(t.noframes))
                    for (const e in na) null == t[e] && (t[e] = na[e])
                    for (let e = 0; e < ia.length; e++) {
                      const n = ia[e]
                      t[n] || (t[n] = "")
                    }
                    for (let e = 0; e < aa.length; e++) {
                      const n = aa[e],
                        l = t[n]
                      t[n] = l ? `${l.join("\n")}${l.length ? "\n" : ""}` : ""
                    }
                    q(), n.removed || (c = (0, be.p$)(e))
                  })
                {
                  const e = l.initial
                  ;(_.value = l.initialCode),
                    (C.value = (0, be.p$)(e)),
                    (0, se.YP)(() => C.value.config, q, { deep: !0 }),
                    (0, se.YP)(() => C.value.custom, q, { deep: !0 })
                }
                async function Z() {
                  if (!x.value) return
                  d && B()
                  const e = C.value,
                    { config: t, custom: n } = e,
                    { notifyUpdates: l } = t,
                    { noframes: i } = n
                  try {
                    var s
                    const r = e.props.id,
                      c = await (0, D.gj)("ParseScript", {
                        id: r,
                        code: o.getRealContent(),
                        config: { enabled: +t.enabled, notifyUpdates: l ? +l : null, shouldUpdate: ca(t) },
                        custom: {
                          ...(0, be.zr)(n, u.keys(na), la),
                          ...(0, be.zr)(n, aa, oa),
                          ...(0, be.zr)(n, ia, sa),
                          noframes: i ? +i : null,
                        },
                        isNew: !r,
                        message: "",
                        reuseDeps: !0,
                        bumpDate: !0,
                      }),
                      d = null == c || null == (s = c.where) ? void 0 : s.id
                    a.markClean(),
                      (k.value = !1),
                      (x.value = !1),
                      (M.value = !1),
                      (z.value = c.errors),
                      (C.value = c.update),
                      d && !r && history.replaceState(null, E.value, `${y}/${d}`),
                      (H.value = null)
                  } catch (e) {
                    H.value = e.message.split("\n")
                  }
                }
                function V(e) {
                  var t
                  e || "code" === f.value
                    ? (n("close"), b && (null == (t = (0, W.vY)()) || t.blur()))
                    : (f.value = "code")
                }
                async function P() {
                  await Z(), V(!0)
                }
                function A(e) {
                  const t = u.keys(O.value)
                  f.value = t[(t.indexOf(f.value) + e + t.length) % t.length]
                }
                function L() {
                  A(-1)
                }
                function F() {
                  A(1)
                }
                function q(e) {
                  const t = C.value,
                    { config: n } = t,
                    { removed: a } = n,
                    o = (t._remote = !!(0, D.TZ)(t)) && ca(n),
                    i = !(!a && 1 !== o && !l.readOnly)
                  ;(I.value = i), (M.value = !a && (i || o >= 1)), !a && e && N()
                }
                function N() {
                  x.value = k.value || !(0, be.vZ)(C.value, c)
                }
                async function B(e) {
                  j.Z.get("editorWindow") &&
                    (e || (e = (await (null == D.oy ? void 0 : D.oy.getCurrent())) || {}),
                    "normal" === e.state &&
                      j.Z.set("editorWindowPos", (0, be.zr)(e, ["left", "top", "width", "height"])))
                }
                function K({ id: e, tabs: t }) {
                  if (1 === t.length) {
                    const { onBoundsChanged: t } = g.windows
                    t
                      ? t.addListener((t) => {
                          t.id === e && B(t)
                        })
                      : (p("resize", (0, D.Ds)(B, 100)), (d = !0))
                  }
                }
                return (
                  (0, se.bv)(() => {
                    var t, n
                    ;(o = v.value),
                      (a = o.cm),
                      (m = (0, T.Q$)(null, () => a.focus())),
                      j.Z.get("editorWindow") &&
                        1 === e.history.length &&
                        (null == (n = browser.windows) || n.getCurrent({ populate: !0 }).then(K))
                    const l = u.values(O.value),
                      i = (U.value = [
                        ["Alt-PageUp", ` ${l.join(" < ")}`],
                        ["Alt-PageDown", ` ${l.join(" > ")}`],
                        ...u.entries(o.expandKeyMap()).sort((e, t) => ra(e[1], t[1]) || ra(e[0], t[0])),
                      ])
                    ;(r = null == (t = i.find(([, e]) => "save" === e)) ? void 0 : t[0]),
                      r || ((r = "Ctrl-S"), i.unshift([r, "save"]))
                  }),
                  (0, se.dl)(() => {
                    document.body.classList.add("edit-open"),
                      (i = [
                        he.$J.register("a-pageup", L),
                        he.$J.register("a-pagedown", F),
                        he.$J.register(r.replace(/(?:Ctrl|Cmd)-/i, "ctrlcmd-"), Z),
                        he.$J.register("escape", V),
                        he.$J.register("f1", () => {
                          f.value = "help"
                        }),
                      ]),
                      (Y.title = E.value)
                  }),
                  (0, se.se)(() => {
                    var e
                    document.body.classList.remove("edit-open"),
                      (Y.title = null),
                      m(!1),
                      null == (e = i) || e.forEach((e) => e())
                  }),
                  (e, n) => (
                    (0, se.wg)(),
                    (0, se.iD)(
                      "div",
                      { class: (0, re.C_)(["edit frame flex flex-col abs-full", { frozen: I.value }]) },
                      [
                        (0, se._)("div", Ml, [
                          (0, se._)("nav", null, [
                            ((0, se.wg)(!0),
                            (0, se.iD)(
                              se.HY,
                              null,
                              (0, se.Ko)(
                                O.value,
                                (e, t) => (
                                  (0, se.wg)(),
                                  (0, se.iD)(
                                    "div",
                                    {
                                      key: t,
                                      class: (0, re.C_)(["edit-nav-item", { active: f.value === t }]),
                                      textContent: (0, re.zw)(e),
                                      onClick: (e) => (f.value = t),
                                    },
                                    null,
                                    10,
                                    Ol
                                  )
                                )
                              ),
                              128
                            )),
                          ]),
                          (0, se._)("div", El, [
                            C.value.config.removed
                              ? ((0, se.wg)(),
                                (0, se.iD)(
                                  "span",
                                  {
                                    key: 0,
                                    class: "subtle",
                                    textContent: (0, re.zw)((0, R.SU)(D.ag)("headerRecycleBin") + " / "),
                                  },
                                  null,
                                  8,
                                  Zl
                                ))
                              : (0, se.kq)("", !0),
                            (0, se.Uk)(" " + (0, re.zw)(E.value), 1),
                          ]),
                          I.value && "code" === f.value
                            ? ((0, se.wg)(),
                              (0, se.iD)(
                                "p",
                                {
                                  key: 0,
                                  textContent: (0, re.zw)((0, R.SU)(D.ag)("readonly")),
                                  class: "text-upper text-right text-red",
                                },
                                null,
                                8,
                                Vl
                              ))
                            : ((0, se.wg)(),
                              (0, se.iD)("div", Pl, [
                                (0, se._)(
                                  "a",
                                  {
                                    href: (0, R.SU)(W.XB),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    textContent: (0, re.zw)((0, R.SU)(D.ag)("editHowToHint")),
                                  },
                                  null,
                                  8,
                                  Yl
                                ),
                              ])),
                          (0, se._)("div", Al, [
                            (0, se.wy)(
                              (0, se._)(
                                "button",
                                {
                                  textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonSave")),
                                  onClick: Z,
                                  disabled: !x.value,
                                  class: (0, re.C_)({ "has-error": (e.$fe = H.value || z.value) }),
                                  title: e.$fe,
                                },
                                null,
                                10,
                                Ll
                              ),
                              [[fe.F8, x.value || !I.value]]
                            ),
                            (0, se.wy)(
                              (0, se._)(
                                "button",
                                {
                                  textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonSaveClose")),
                                  onClick: P,
                                  disabled: !x.value,
                                },
                                null,
                                8,
                                Fl
                              ),
                              [[fe.F8, x.value || !I.value]]
                            ),
                            (0, se._)(
                              "button",
                              {
                                textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonClose")),
                                onClick: n[0] || (n[0] = (e) => V(!0)),
                                title: "Esc",
                              },
                              null,
                              8,
                              ql
                            ),
                          ]),
                        ]),
                        M.value && "code" === f.value
                          ? ((0, se.wg)(),
                            (0, se.iD)("div", Nl, [
                              (0, se._)("p", { textContent: (0, re.zw)((0, R.SU)(D.ag)("readonlyNote")) }, null, 8, Bl),
                              ((0, se.wg)(),
                              (0, se.j4)(
                                se.Ob,
                                null,
                                [
                                  (0, se.Wm)((0, R.SU)(Qt), { class: "flex ml-2c", script: C.value }, null, 8, [
                                    "script",
                                  ]),
                                ],
                                1024
                              )),
                            ]))
                          : (0, se.kq)("", !0),
                        H.value
                          ? ((0, se.wg)(),
                            (0, se.iD)("p", Kl, [
                              (0, se._)("b", { textContent: (0, re.zw)(H.value[0]) }, null, 8, Jl),
                              (0, se.Uk)(" " + (0, re.zw)(H.value[1]), 1),
                            ]))
                          : (0, se.kq)("", !0),
                        (0, se.wy)(
                          (0, se.Wm)(
                            (0, R.SU)(At.default),
                            {
                              class: (0, re.C_)(["flex-auto", { readonly: I.value }]),
                              value: _.value,
                              readOnly: I.value,
                              ref_key: "$code",
                              ref: v,
                              active: "code" === f.value,
                              commands: S,
                              onCodeDirty: n[1] || (n[1] = (e) => (k.value = e)),
                            },
                            null,
                            8,
                            ["class", "value", "readOnly", "active"]
                          ),
                          [[fe.F8, "code" === f.value]]
                        ),
                        ((0, se.wg)(),
                        (0, se.j4)(
                          se.Ob,
                          { ref_key: "$tabBody", ref: h },
                          [
                            "settings" === f.value
                              ? ((0, se.wg)(),
                                (0, se.j4)(
                                  (0, R.SU)(Mn),
                                  (0, se.dG)({ key: 0, class: "edit-body" }, { readOnly: t.readOnly, script: C.value }),
                                  null,
                                  16
                                ))
                              : "values" === f.value
                                ? ((0, se.wg)(),
                                  (0, se.j4)(
                                    (0, R.SU)(zl),
                                    (0, se.dG)(
                                      { key: 1, class: "edit-body" },
                                      { readOnly: t.readOnly, script: C.value }
                                    ),
                                    null,
                                    16
                                  ))
                                : "externals" === f.value
                                  ? ((0, se.wg)(),
                                    (0, se.j4)(
                                      (0, R.SU)(Lt.Z),
                                      { key: 2, class: "flex-auto", value: C.value },
                                      null,
                                      8,
                                      ["value"]
                                    ))
                                  : "help" === f.value
                                    ? ((0, se.wg)(),
                                      (0, se.j4)(
                                        (0, R.SU)(Tl),
                                        { key: 3, class: "edit-body", hotkeys: U.value },
                                        null,
                                        8,
                                        ["hotkeys"]
                                      ))
                                    : (0, se.kq)("", !0),
                          ],
                          1536
                        )),
                        z.value || $.value
                          ? ((0, se.wg)(),
                            (0, se.iD)("div", Gl, [
                              $.value
                                ? ((0, se.wg)(),
                                  (0, se.j4)(
                                    (0, R.SU)(ke.Z),
                                    { key: 0, "i18n-key": "hashPatternWarning" },
                                    {
                                      default: (0, se.w5)(() => [
                                        (0, se._)("code", { textContent: (0, re.zw)($.value) }, null, 8, Xl),
                                      ]),
                                      _: 1,
                                    }
                                  ))
                                : (0, se.kq)("", !0),
                              ((0, se.wg)(!0),
                              (0, se.iD)(
                                se.HY,
                                null,
                                (0, se.Ko)(
                                  z.value,
                                  (e) => (
                                    (0, se.wg)(),
                                    (0, se.iD)(
                                      "p",
                                      { key: e, textContent: (0, re.zw)(e), class: "text-red" },
                                      null,
                                      8,
                                      Ql
                                    )
                                  )
                                ),
                                128
                              )),
                              z.value
                                ? ((0, se.wg)(),
                                  (0, se.iD)("p", ea, [
                                    (0, se._)("a", {
                                      href: ta,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      textContent: ta,
                                    }),
                                  ]))
                                : (0, se.kq)("", !0),
                            ]))
                          : (0, se.kq)("", !0),
                      ],
                      2
                    )
                  )
                )
              },
            },
            ma = pa,
            ga = { key: 0 },
            va = { class: "flex" },
            ha = { class: "btn-group" },
            fa = { class: "btn-ghost", tabindex: "0" },
            wa = ["textContent"],
            ba = ["textContent"],
            ya = ["textContent"],
            xa = ["textContent", "onClick"],
            Ca = { key: 0, class: "btn-group" },
            _a = ["data-batch-action", "onClick"],
            ka = ["textContent"],
            Sa = { key: 1, class: "ml-1" },
            Ua = ["textContent"],
            za = ["textContent"],
            Da = (0, se._)("div", { class: "flex-auto" }, null, -1),
            $a = ["value"],
            Ha = ["textContent", "value"],
            ja = { class: "btn-ghost", tabindex: "0" },
            Wa = { class: "mr-2c" },
            Ia = ["title", "placeholder"],
            Ra = { class: "filter-search-tooltip" },
            Ta = ["textContent"],
            Ma = ["innerHTML"],
            Oa = { key: 0, class: "hint mx-1 my-1 flex flex-col" },
            Ea = ["textContent"],
            Za = ["textContent"],
            Va = ["textContent"],
            Pa = ["data-columns", "data-show-order", "data-table"],
            Ya = "edit",
            Aa = "remove",
            La = "restore",
            Fa = "toggle",
            qa = "undo",
            Na = "update",
            Ba = "tabScripts",
            Ka = "scrollTop",
            Ja = "toggle-on",
            Ga = {
              __name: "tab-installed",
              setup(e) {
                const n = {
                    sort: {
                      exec: { title: (0, D.ag)("filterExecutionOrder") },
                      alpha: {
                        title: (0, D.ag)("filterAlphabeticalOrder"),
                        compare: ({ $cache: { lowerName: e } }, { $cache: { lowerName: t } }) => (e < t ? -1 : e > t),
                      },
                      [Na]: {
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
                w(be.SE, l, (e) => {
                  ;(0, we.Z)(`filters.${e}`, (t) => {
                    ;(l[e] = t), "sort" !== e || n.sort[t] || (l[e] = u.keys(n.sort)[0])
                  })
                })
                const a = `${Ba} && inputFocus`,
                  i = `${Ba} && !inputFocus`,
                  s = `${i} && selectedScript && !showRecycle`,
                  c = `${i} && selectedScript && showRecycle`,
                  g = `${i} && !buttonFocus`,
                  h = `${i} && selectedScript && showHotkeys`,
                  f = { [Ya]: "e", [Fa]: "space", [Na]: "r", [La]: "r", [Aa]: "x" },
                  y = (e, t) => t.map(([t, n, l]) => he.$J.register(t, e, { condition: n, caseSensitive: l }))
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
                    search: (Y.search = { value: "", error: null, ...Z("") }),
                    sortedScripts: [],
                    filteredScripts: [],
                    script: null,
                    code: "",
                    numColumns: 1,
                    batchRender: { limit: C },
                    batchAction: { action: null, [qa]: null },
                  }),
                  M = (0, se.Fl)(() => Y.route.paths[0] === k),
                  O = (0, se.Fl)(() => !M.value && "exec" === l.sort),
                  E = (0, se.Fl)(() => W.T && O.value),
                  V = (0, se.Fl)(() => {
                    var e
                    return null == (e = n.sort[l.sort]) ? void 0 : e.compare
                  }),
                  A = (0, se.Fl)(() => H.filteredScripts[H.focusedIndex]),
                  L = (0, se.Fl)(() =>
                    Y.loading ||
                    (H.search.rules.length ? H.sortedScripts.find((e) => !1 !== e.$cache.show) : H.sortedScripts.length)
                      ? null
                      : (0, D.ag)("labelNoSearchScripts")
                  ),
                  F = (0, se.Fl)(
                    () =>
                      H.search.rules.some((e) => !e.scope || "code" === e.scope) &&
                      Y.scripts.filter((e) => null == e.$cache.code).map((e) => e.props.id)
                  ),
                  q = (0, se.Fl)(() =>
                    H.search.tokens.filter((e) => "#" === e.prefix && !e.negative).map((e) => e.parsed)
                  ),
                  N = () => (M.value ? Y.removedScripts : Y.scripts),
                  B = (e) => e.target.closest("[data-batch-action]"),
                  K = {
                    [Fa]: {
                      icon: Ja,
                      arg(e) {
                        const t = this.icon === Ja ? 1 : 0
                        return e.filter((e) => +e.config.enabled !== t)
                      },
                      fn: (e) => d.all(e.map(ze)),
                    },
                    [Na]: { icon: "refresh", fn: De, [qa]: !1 },
                    [Aa]: {
                      icon: "trash",
                      async fn(e, t, n) {
                        await d.all(e.map((e) => ae(e, !n))), n || (Y.scripts = [])
                      },
                    },
                  },
                  J = (0, se.Fl)(() => {
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
                      (l[Fa].icon = a ? Ja : "toggle-off"),
                      (l[Fa].num = a < t ? a : ""),
                      o ? (l[Na].num = o < t ? o : "") : ({ [Na]: o, ...l } = l),
                      l
                    )
                  }),
                  G = (0, D.Ds)(() => {
                    try {
                      ;(H.search = Y.search = { ...H.search, ...Z(H.search.value) }), (H.search.error = null)
                    } catch (e) {
                      H.search.error = e.message
                    }
                    const e = F.value
                    null != e && e.length && pe(e), te()
                  }, 100),
                  X = (0, D.Ds)(de)
                function Q() {
                  !M.value &&
                    Y.needRefresh &&
                    ((Y.scripts = Y.scripts.filter((e) => !e.config.removed)), (Y.needRefresh = !1)),
                    (H.focusedIndex = -1),
                    te()
                }
                async function ee() {
                  const e = F.value
                  null != e && e.length && (await pe(e)), te(), ue()
                }
                function te() {
                  const e = [...N()],
                    t = H.search.rules,
                    n = t.length ? P(e, t) : e.length,
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
                    l = Y.scripts,
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
                function ie(e) {
                  j.Z.set("filters.sort", e.target.value)
                }
                function ce(e) {
                  const n = w(D.Hv, [M.value ? k : o, e], "/")
                  e || n !== (0, T.Qs)().pathname ? (0, T.pV)(n) : t.history.back()
                }
                async function ue() {
                  const [e, t, n] = Y.route.paths,
                    l = "_new" === t && (await (0, D.gj)("NewScript", +n)),
                    a = l ? l.script : +t && N().find((e) => e.props.id === +t)
                  if (a) return (H.code = l ? l.code : await (0, D.gj)("GetScriptCode", t)), void (H.script = a)
                  if (
                    (t && (0, T.pV)(e, !0),
                    Y.canRenderScripts || ((Y.canRenderScripts = !0), ir()),
                    de(),
                    (H.script = null),
                    !b)
                  ) {
                    const e = $.value,
                      t = document.scrollingElement,
                      n = e[Ka],
                      l = t[Ka]
                    ;(0, se.Y3)(() => {
                      ;(e[Ka] = n), (t[Ka] = l)
                    })
                  }
                }
                async function de() {
                  if (!Y.canRenderScripts) return
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
                      await new d((e) => (0, se.Y3)(e)),
                      !C && v.now() - l >= 100 && (C = 2 * t),
                      C && t < e && (await (0, D.dL)())
                  }
                }
                async function pe(e) {
                  const t = await (0, D.gj)("GetScriptCode", e)
                  Y.scripts.forEach(({ $cache: e, props: { id: n } }) => {
                    n in t && (e.code = t[n])
                  }),
                    te()
                }
                async function me() {
                  ;(await (0, W.GW)((0, D.ag)("buttonEmptyRecycleBin"))) &&
                    ((0, D.gj)("CheckRemove", { force: !0 }), (Y.removedScripts = []))
                }
                function ge() {
                  const e = l.viewTable ? _ : S
                  H.numColumns = l.viewSingleColumn ? 1 : e.findIndex((e) => t.innerWidth < e) + 1 || e.length + 1
                }
                function ve(e) {
                  ;(e = Math.min(e, H.filteredScripts.length - 1)),
                    (e = Math.max(e, -1)) !== H.focusedIndex && (H.focusedIndex = e)
                }
                function Se(e) {
                  e.config.removed ? (0, D.gj)("RemoveScripts", [e.props.id]) : ae(e, 1)
                }
                async function Ue(e) {
                  try {
                    await ae(e, 0)
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
                  if (Y.batch) return
                  const t = B(e),
                    n = H.batchAction
                  let l = null == t ? void 0 : t.dataset.batchAction
                  if (n.action === l) {
                    const e = J.value[l] || {},
                      a = H.filteredScripts,
                      o = (null == e.arg ? void 0 : e.arg(a)) || a,
                      i = e.fn,
                      s = [i, o, t]
                    i && oe(...s),
                      (n[qa] =
                        i &&
                        !1 !== e[qa] &&
                        (() => {
                          oe(...s, qa), (n[qa] = null)
                        })),
                      (l = ""),
                      t.blur()
                  }
                  n.action = l
                }
                function We() {
                  const e = () => {
                    var e
                    he.$J.setContext("buttonFocus", (null == (e = (0, W.vY)()) ? void 0 : e.tabIndex) >= 0)
                  }
                  p("focus", e, !0)
                  const t = [
                    () => m("focus", e, !0),
                    ...(b
                      ? [
                          he.$J.register("tab", () => {
                            ;(0, he.nk)(1)
                          }),
                          he.$J.register("s-tab", () => {
                            ;(0, he.nk)(-1)
                          }),
                        ]
                      : []),
                    ...y(() => {
                      var e
                      null == (e = U.value) || e.focus()
                    }, [
                      ["ctrlcmd-f", Ba],
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
                      ["ctrlcmd-down", Ba],
                      ["down", Ba],
                      ["j", i, !0],
                    ]),
                    ...y(() => {
                      const e = H.focusedIndex - H.numColumns
                      e >= 0 && ve(e)
                    }, [
                      ["ctrlcmd-up", Ba],
                      ["up", Ba],
                      ["k", i, !0],
                    ]),
                    ...y(() => {
                      ve(H.focusedIndex - 1)
                    }, [
                      ["ctrlcmd-left", Ba],
                      ["left", i],
                      ["h", i, !0],
                    ]),
                    ...y(() => {
                      ve(H.focusedIndex + 1)
                    }, [
                      ["ctrlcmd-right", Ba],
                      ["right", i],
                      ["l", i, !0],
                    ]),
                    ...y(() => {
                      ve(0)
                    }, [
                      ["ctrlcmd-home", Ba],
                      ["g g", i, !0],
                    ]),
                    ...y(() => {
                      ve(H.filteredScripts.length - 1)
                    }, [
                      ["ctrlcmd-end", Ba],
                      ["G", i, !0],
                    ]),
                    ...y(() => {
                      ce(A.value.props.id)
                    }, [
                      [f[Ya], s, !0],
                      ["enter", g],
                    ]),
                    ...y(() => {
                      Se(A.value)
                    }, [
                      ["delete", s],
                      [f[Aa], s, !0],
                    ]),
                    ...y(() => {
                      De(A.value)
                    }, [[f[Na], s, !0]]),
                    ...y(() => {
                      ze(A.value)
                    }, [[f[Fa], s, !0]]),
                    ...y(() => {
                      Ue(A.value)
                    }, [[f[La], c, !0]]),
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
                  (0, se.YP)(M, Q),
                  (0, se.YP)(
                    () => Y.canRenderScripts && z.value && O.value,
                    (e) => Ge(z.value, le, e)
                  ),
                  (0, se.YP)(() => H.search.value, G),
                  (0, se.YP)(() => [l.sort, l.showEnabledFirst], G),
                  screen.availWidth > 767 &&
                    ((0, se.YP)(() => l.viewSingleColumn, ge),
                    (0, se.YP)(
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
                  (0, se.YP)(N, ee),
                  (0, se.YP)(() => Y.route.paths[1], ue),
                  (0, se.YP)(A, (e) => {
                    he.$J.setContext("selectedScript", e)
                  }),
                  (0, se.YP)(
                    () => H.showHotkeys,
                    (e) => {
                      he.$J.setContext("showHotkeys", e)
                    }
                  )
                const Re = []
                return (
                  (0, se.bv)(() => {
                    if ((Y.loading || ee(), !S.length)) {
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
                  (0, se.Jd)(() => {
                    Re.forEach((e) => e())
                  }),
                  (e, t) => (
                    (0, se.wg)(),
                    (0, se.iD)(
                      "div",
                      { class: "tab-installed", ref_key: "scroller", ref: $ },
                      [
                        (0, R.SU)(Y).canRenderScripts
                          ? ((0, se.wg)(),
                            (0, se.iD)("div", ga, [
                              (0, se._)("header", va, [
                                M.value
                                  ? ((0, se.wg)(),
                                    (0, se.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "ml-2",
                                        textContent: (0, re.zw)((0, R.SU)(D.ag)("headerRecycleBin")),
                                      },
                                      null,
                                      8,
                                      za
                                    ))
                                  : ((0, se.wg)(),
                                    (0, se.iD)(
                                      se.HY,
                                      { key: 0 },
                                      [
                                        (0, se._)("div", ha, [
                                          (0, se.Wm)(
                                            (0, R.SU)(ye.Z),
                                            {
                                              modelValue: H.menuNew,
                                              "onUpdate:modelValue": t[1] || (t[1] = (e) => (H.menuNew = e)),
                                              class: (0, re.C_)({ active: H.menuNew }),
                                              closeAfterClick: !0,
                                            },
                                            {
                                              content: (0, se.w5)(() => [
                                                (0, se._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonNew")),
                                                    tabindex: "0",
                                                    onClick:
                                                      t[0] || (t[0] = (0, fe.iM)((e) => ce("_new"), ["prevent"])),
                                                  },
                                                  null,
                                                  8,
                                                  wa
                                                ),
                                                (0, se._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, re.zw)(
                                                      (0, R.SU)(D.ag)("installFrom", "OpenUserJS")
                                                    ),
                                                    href: "https://openuserjs.org/",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  ba
                                                ),
                                                (0, se._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, re.zw)(
                                                      (0, R.SU)(D.ag)("installFrom", "GreasyFork")
                                                    ),
                                                    href: "https://greasyfork.org/scripts",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  ya
                                                ),
                                                (0, se._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonInstallFromURL")),
                                                    tabindex: "0",
                                                    onClick: (0, fe.iM)(ne, ["prevent"]),
                                                  },
                                                  null,
                                                  8,
                                                  xa
                                                ),
                                              ]),
                                              default: (0, se.w5)(() => [
                                                (0, se.Wm)(
                                                  (0, R.SU)(xe.Z),
                                                  {
                                                    content: (0, R.SU)(D.ag)("buttonNew"),
                                                    placement: "bottom",
                                                    align: "start",
                                                    disabled: H.menuNew,
                                                  },
                                                  {
                                                    default: (0, se.w5)(() => [
                                                      (0, se._)("a", fa, [
                                                        (0, se.Wm)((0, R.SU)(_e.Z), { name: "plus" }),
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
                                          (0, se.Wm)(
                                            (0, R.SU)(xe.Z),
                                            {
                                              content: (0, R.SU)(D.ag)("updateScriptsAll"),
                                              placement: "bottom",
                                              align: "start",
                                            },
                                            {
                                              default: (0, se.w5)(() => [
                                                (0, se._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    tabindex: "0",
                                                    onClick: t[2] || (t[2] = (e) => De(null, e.target)),
                                                  },
                                                  [(0, se.Wm)((0, R.SU)(_e.Z), { name: "refresh" })]
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                        ]),
                                        H.filteredScripts.length
                                          ? ((0, se.wg)(),
                                            (0, se.iD)("div", Ca, [
                                              ((0, se.wg)(!0),
                                              (0, se.iD)(
                                                se.HY,
                                                null,
                                                (0, se.Ko)(
                                                  J.value,
                                                  ({ icon: e, num: t }, n) => (
                                                    (0, se.wg)(),
                                                    (0, se.iD)(
                                                      "a",
                                                      {
                                                        key: n,
                                                        class: (0, re.C_)([
                                                          "btn-ghost",
                                                          {
                                                            "has-error": H.batchAction.action === n,
                                                            disabled: (0, R.SU)(Y).batch,
                                                          },
                                                        ]),
                                                        "data-batch-action": n,
                                                        tabindex: "0",
                                                        onClick: (0, fe.iM)(je, ["prevent"]),
                                                      },
                                                      [
                                                        (0, se.Wm)((0, R.SU)(_e.Z), { name: e }, null, 8, ["name"]),
                                                        t
                                                          ? ((0, se.wg)(),
                                                            (0, se.iD)(
                                                              "sub",
                                                              { key: 0, textContent: (0, re.zw)(t) },
                                                              null,
                                                              8,
                                                              ka
                                                            ))
                                                          : (0, se.kq)("", !0),
                                                        H.batchAction.action === n
                                                          ? ((0, se.wg)(), (0, se.iD)("span", Sa, "\u2757"))
                                                          : (0, se.kq)("", !0),
                                                      ],
                                                      10,
                                                      _a
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                              (0, se._)(
                                                "div",
                                                {
                                                  class: "btn-hint subtle",
                                                  textContent: (0, re.zw)(
                                                    (0, R.SU)(D.ag)("hintForBatchAction", `${H.filteredScripts.length}`)
                                                  ),
                                                },
                                                null,
                                                8,
                                                Ua
                                              ),
                                              (0, se.Wm)(
                                                (0, R.SU)(xe.Z),
                                                {
                                                  content: (0, R.SU)(D.ag)("buttonUndo"),
                                                  placement: "bottom",
                                                  align: "start",
                                                },
                                                {
                                                  default: (0, se.w5)(() => [
                                                    H.batchAction.undo
                                                      ? ((0, se.wg)(),
                                                        (0, se.iD)(
                                                          "a",
                                                          {
                                                            key: 0,
                                                            class: "btn-ghost",
                                                            tabindex: "0",
                                                            onClick:
                                                              t[3] ||
                                                              (t[3] = (0, fe.iM)(
                                                                (...e) =>
                                                                  H.batchAction.undo && H.batchAction.undo(...e),
                                                                ["prevent"]
                                                              )),
                                                          },
                                                          [(0, se.Wm)((0, R.SU)(_e.Z), { name: "undo" })]
                                                        ))
                                                      : (0, se.kq)("", !0),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["content"]
                                              ),
                                            ]))
                                          : (0, se.kq)("", !0),
                                      ],
                                      64
                                    )),
                                Da,
                                (0, se.Wm)(
                                  (0, R.SU)(ke.Z),
                                  { "i18n-key": "labelFilterSort", class: "ml-1" },
                                  {
                                    default: (0, se.w5)(() => [
                                      (0, se._)(
                                        "select",
                                        { value: l.sort, onChange: ie, class: "h-100" },
                                        [
                                          ((0, se.wg)(!0),
                                          (0, se.iD)(
                                            se.HY,
                                            null,
                                            (0, se.Ko)(
                                              n.sort,
                                              (e, t) => (
                                                (0, se.wg)(),
                                                (0, se.iD)(
                                                  "option",
                                                  { textContent: (0, re.zw)(e.title), key: t, value: t },
                                                  null,
                                                  8,
                                                  Ha
                                                )
                                              )
                                            ),
                                            128
                                          )),
                                        ],
                                        40,
                                        $a
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                (0, se.Wm)(
                                  (0, R.SU)(ye.Z),
                                  { align: "right", class: "filter-sort" },
                                  {
                                    content: (0, se.w5)(() => [
                                      (0, se.wy)(
                                        (0, se._)(
                                          "div",
                                          null,
                                          [
                                            (0, se.Wm)(
                                              (0, R.SU)(Ce.Z),
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
                                        [[fe.F8, V.value]]
                                      ),
                                      (0, se._)("div", null, [
                                        (0, se.Wm)(
                                          (0, R.SU)(Ce.Z),
                                          { name: "filters.showOrder", label: (0, R.SU)(D.ag)("labelShowOrder") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                      (0, se._)("div", Wa, [
                                        (0, se.Wm)(
                                          (0, R.SU)(Ce.Z),
                                          { name: "filters.viewTable", label: (0, R.SU)(D.ag)("labelViewTable") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                        (0, se.Wm)(
                                          (0, R.SU)(Ce.Z),
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
                                    default: (0, se.w5)(() => [
                                      (0, se.Wm)(
                                        (0, R.SU)(xe.Z),
                                        { content: (0, R.SU)(D.ag)("labelSettings"), placement: "bottom" },
                                        {
                                          default: (0, se.w5)(() => [
                                            (0, se._)("a", ja, [(0, se.Wm)((0, R.SU)(_e.Z), { name: "cog" })]),
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
                                (0, se._)(
                                  "form",
                                  {
                                    class: "filter-search hidden-xs",
                                    onSubmit: t[5] || (t[5] = (0, fe.iM)(() => {}, ["prevent"])),
                                    style: (0, re.j5)({
                                      "min-width": "10em",
                                      "max-width": 5 + Math.max(20, H.search.value.length) + "ex",
                                    }),
                                  },
                                  [
                                    (0, se._)("label", null, [
                                      (0, se.wy)(
                                        (0, se._)(
                                          "input",
                                          {
                                            type: "search",
                                            class: (0, re.C_)({ "has-error": H.search.error }),
                                            title: H.search.error,
                                            placeholder: (0, R.SU)(D.ag)("labelSearchScript"),
                                            "onUpdate:modelValue": t[4] || (t[4] = (e) => (H.search.value = e)),
                                            ref_key: "refSearch",
                                            ref: U,
                                            id: "installed-search",
                                          },
                                          null,
                                          10,
                                          Ia
                                        ),
                                        [[fe.nr, H.search.value]]
                                      ),
                                      (0, se.Wm)((0, R.SU)(_e.Z), { name: "search" }),
                                    ]),
                                  ],
                                  36
                                ),
                                (0, se.Wm)(
                                  (0, R.SU)(ye.Z),
                                  { align: "right" },
                                  {
                                    content: (0, se.w5)(() => [
                                      (0, se._)("div", Ra, [
                                        H.search.error
                                          ? ((0, se.wg)(),
                                            (0, se.iD)(
                                              "div",
                                              { key: 0, class: "has-error", textContent: (0, re.zw)(H.search.error) },
                                              null,
                                              8,
                                              Ta
                                            ))
                                          : (0, se.kq)("", !0),
                                        (0, se._)(
                                          "div",
                                          { innerHTML: (0, R.SU)(D.ag)("titleSearchHintV2") },
                                          null,
                                          8,
                                          Ma
                                        ),
                                      ]),
                                    ]),
                                    default: (0, se.w5)(() => [
                                      (0, se._)(
                                        "a",
                                        {
                                          class: (0, re.C_)(["btn-ghost", { "has-error": H.search.error }]),
                                          tabindex: "0",
                                        },
                                        [(0, se.Wm)((0, R.SU)(_e.Z), { name: "question" })],
                                        2
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              M.value
                                ? ((0, se.wg)(),
                                  (0, se.iD)("div", Oa, [
                                    (0, se._)(
                                      "span",
                                      { textContent: (0, re.zw)((0, R.SU)(D.ag)("hintRecycleBin")) },
                                      null,
                                      8,
                                      Ea
                                    ),
                                    (0, R.SU)(Y).removedScripts.length
                                      ? ((0, se.wg)(),
                                        (0, se.iD)(
                                          "a",
                                          {
                                            key: 0,
                                            textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonEmptyRecycleBin")),
                                            tabindex: "0",
                                            onClick: me,
                                          },
                                          null,
                                          8,
                                          Za
                                        ))
                                      : (0, se.kq)("", !0),
                                  ]))
                                : L.value
                                  ? ((0, se.wg)(),
                                    (0, se.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "hint mx-1 my-1 flex flex-col",
                                        textContent: (0, re.zw)(L.value),
                                      },
                                      null,
                                      8,
                                      Va
                                    ))
                                  : (0, se.kq)("", !0),
                              (0, se.wy)(
                                ((0, se.wg)(),
                                (0, se.iD)(
                                  "div",
                                  {
                                    class: "scripts",
                                    ref_key: "refList",
                                    ref: z,
                                    style: (0, re.j5)(`--num-columns:${H.numColumns}`),
                                    "data-columns": H.numColumns,
                                    "data-show-order": l.showOrder || null,
                                    "data-table": l.viewTable || null,
                                  },
                                  [
                                    ((0, se.wg)(!0),
                                    (0, se.iD)(
                                      se.HY,
                                      null,
                                      (0, se.Ko)(H.sortedScripts, (e, t) =>
                                        (0, se.wy)(
                                          ((0, se.wg)(),
                                          (0, se.j4)(
                                            (0, R.SU)(Yt),
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
                                              onRemove: Se,
                                              onRestore: Ue,
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
                                          [[fe.F8, !H.search.rules.length || !1 !== e.$cache.show]]
                                        )
                                      ),
                                      128
                                    )),
                                  ],
                                  12,
                                  Pa
                                )),
                                [[(0, R.SU)(W.Tu), !H.script]]
                              ),
                            ]))
                          : (0, se.kq)("", !0),
                        ((0, se.wg)(),
                        (0, se.j4)(se.lR, { to: "body" }, [
                          ((0, se.wg)(),
                          (0, se.j4)(
                            se.Ob,
                            { key: (0, R.SU)(Y).route.hash, max: 5 },
                            [
                              H.script
                                ? ((0, se.wg)(),
                                  (0, se.j4)(
                                    (0, R.SU)(ma),
                                    {
                                      key: 0,
                                      initial: H.script,
                                      "initial-code": H.code,
                                      "read-only": !!H.script.config.removed,
                                      onClose: t[6] || (t[6] = (e) => ce()),
                                    },
                                    null,
                                    8,
                                    ["initial", "initial-code", "read-only"]
                                  ))
                                : (0, se.kq)("", !0),
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
            Xa = Ga,
            Qa = ["data-show-advanced"],
            eo = ["textContent"],
            to = { class: "mb-1c" },
            no = ["textContent"],
            lo = { class: "ml-2c flex flex-col" },
            ao = ["textContent"],
            oo = { class: "ml-2c" },
            io = ["onUpdate:modelValue"],
            so = ["value", "textContent"],
            ro = ["onUpdate:modelValue"],
            co = ["value", "textContent"],
            uo = ["textContent"],
            po = ["onUpdate:modelValue"],
            mo = ["value", "textContent"],
            go = ["textContent"],
            vo = ["onUpdate:modelValue"],
            ho = ["textContent"],
            fo = { class: "mb-1c" },
            wo = ["textContent"],
            bo = { class: "ml-2c flex flex-col" },
            yo = { class: "ml-2c flex flex-col" },
            xo = { class: "mb-2c" },
            Co = ["textContent"],
            _o = (0, se._)("hr", null, null, -1),
            ko = ["open"],
            So = ["onClick"],
            Uo = { class: "mb-1c" },
            zo = ["textContent"],
            Do = ["onUpdate:modelValue"],
            $o = ["value", "textContent"],
            Ho = { class: "ml-2c flex flex-col" },
            jo = ["textContent"],
            Wo = ["onUpdate:modelValue"],
            Io = ["textContent"],
            Ro = ["textContent"],
            To = (0, se._)("code", null, "page", -1),
            Mo = ["textContent"],
            Oo = { key: 0 },
            Eo = (0, se._)("code", null, "page", -1),
            Zo = ["textContent"],
            Vo = ["href"],
            Po = ["textContent"],
            Yo = ["textContent"],
            Ao = ["innerHTML"]
          var Lo = z(3657)
          const Fo = (0, z(4288).HP)(async () => {
              await ("/public/lib/zip-no-worker.min.js",
              new d((e, t) => {
                const n = document.createElement("script")
                ;(n.src = "/public/lib/zip-no-worker.min.js"), (n.onload = e), (n.onerror = t), document.body.append(n)
              }))
              const { zip: e } = t,
                n = ["/public/lib/z-worker.js"]
              return e.configure({ workerScripts: { deflate: n, inflate: n } }), e
            }),
            qo = ["textContent", "disabled"],
            No = ["textContent", "title"],
            Bo = { class: "mt-1" },
            Ko = (0, se._)("br", null, null, -1),
            Jo = { class: "import-report" },
            Go = ["data-type"],
            Xo = ["textContent"],
            Qo = ["textContent", "colspan"],
            ei = {
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
                  Y.batch || oe(h, e)
                }
                async function h(e) {
                  if (!e) return
                  t.length = 0
                  const n = j.Z.get("importScriptData"),
                    a = await Fo(),
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
                            runAt: Ft.qh.test(i.run_at) ? i.run_at : void 0,
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
                    const e = Y.route.hash === C ? p : m
                    e("dragend", l), e("dragleave", a), e("dragover", o), e("drop", i)
                  }
                }
                return (
                  (0, se.bv)(() => {
                    const e = b(n.value)
                    p("hashchange", e), e()
                  }),
                  (e, s) => (
                    (0, se.wg)(),
                    (0, se.iD)("div", null, [
                      (0, se._)(
                        "button",
                        {
                          textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonImportData")),
                          onClick: c,
                          ref_key: "buttonImport",
                          ref: n,
                          disabled: (0, R.SU)(Y).batch,
                        },
                        null,
                        8,
                        qo
                      ),
                      l.value
                        ? ((0, se.wg)(),
                          (0, se.iD)(
                            "button",
                            {
                              key: 0,
                              textContent: (0, re.zw)((0, R.SU)(D.ag)("buttonUndo") + l.value),
                              onClick: f,
                              class: "has-error",
                              title: (0, R.SU)(a),
                            },
                            null,
                            8,
                            No
                          ))
                        : (0, se.kq)("", !0),
                      (0, se._)("div", Bo, [
                        (0, se.Wm)((0, R.SU)(Ce.Z), { name: "importScriptData", label: (0, R.SU)(o) }, null, 8, [
                          "label",
                        ]),
                        Ko,
                        (0, se.Wm)((0, R.SU)(Ce.Z), { name: "importSettings", label: (0, R.SU)(i) }, null, 8, [
                          "label",
                        ]),
                      ]),
                      (0, se._)("table", Jo, [
                        ((0, se.wg)(!0),
                        (0, se.iD)(
                          se.HY,
                          null,
                          (0, se.Ko)(
                            t,
                            ({ type: e, name: t, text: n }, l) => (
                              (0, se.wg)(),
                              (0, se.iD)(
                                "tr",
                                { key: l, "data-type": e },
                                [
                                  t
                                    ? ((0, se.wg)(),
                                      (0, se.iD)("td", { key: 0, textContent: (0, re.zw)(t) }, null, 8, Xo))
                                    : (0, se.kq)("", !0),
                                  (0, se._)("td", { textContent: (0, re.zw)(n), colspan: t ? null : 2 }, null, 8, Qo),
                                ],
                                8,
                                Go
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
            ti = ei
          var ni = z(950),
            li = z(4460),
            ai = z(3557)
          const oi = (0, D.ag)("msgDateFormatInfo", u.keys(li.q).join(", ")),
            ii = {
              __name: "vm-date-info",
              setup: (e) => (e, t) => (
                (0, se.wg)(),
                (0, se.j4)(
                  (0, R.SU)(xe.Z),
                  { content: (0, R.SU)(oi), placement: "left", style: { "vertical-align": "middle" } },
                  {
                    default: (0, se.w5)(() => [
                      (0, se._)("a", { href: "https://momentjs.com/docs/#/displaying/format/", target: "_blank" }, [
                        (0, se.Wm)((0, R.SU)(_e.Z), { name: "info" }),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["content"]
                )
              ),
            },
            si = { class: "export" },
            ri = { class: "flex flex-wrap center-items mr-1c" },
            ci = ["textContent", "disabled"],
            ui = ["textContent"],
            di = { class: "mt-1" },
            pi = { class: "modal-content" },
            mi = ["download", "href"],
            gi = (0, se._)("br", null, null, -1),
            vi = (0, se._)("strong", null, "scripts.zip", -1),
            hi = {
              __name: "vm-export",
              setup(e) {
                let t
                const n = (0, R.iH)(),
                  l = (0, R.iH)(!1),
                  a = (0, R.iH)(b && {}),
                  o = (0, se.Fl)(() => {
                    const e = n.value
                    return e && `${(0, li.p)(e.text.trim() || e.defaultValue)}.zip`
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
                  } else (0, ai.l)(e, l)
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
                  const a = ((0, be._M)(t, "items") || []).map(({ script: a, code: o }) => {
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
                  const o = await Fo(),
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
                  (0, se.wg)(),
                  (0, se.iD)("div", si, [
                    (0, se._)("div", ri, [
                      (0, se._)(
                        "button",
                        { textContent: (0, re.zw)(e.i18n("buttonExportData")), onClick: i, disabled: l.value },
                        null,
                        8,
                        ci
                      ),
                      (0, se.Wm)(
                        (0, R.SU)(On.Z),
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
                      (0, se.Wm)((0, R.SU)(ii)),
                      (0, se._)("span", { hidden: "", textContent: (0, re.zw)(o.value) }, null, 8, ui),
                    ]),
                    (0, se._)("div", di, [
                      (0, se.Wm)(
                        (0, R.SU)(Ce.Z),
                        { name: "exportValues", label: e.i18n("labelExportScriptData") },
                        null,
                        8,
                        ["label"]
                      ),
                    ]),
                    a.value
                      ? ((0, se.wg)(),
                        (0, se.j4)(
                          (0, R.SU)(ni.Z),
                          {
                            key: 0,
                            transition: "in-out",
                            show: !!a.value.url,
                            onClose: t[0] || (t[0] = (e) => (a.value = {})),
                          },
                          {
                            default: (0, se.w5)(() => [
                              (0, se._)("div", pi, [
                                (0, se._)(
                                  "a",
                                  { download: a.value.name, href: a.value.url },
                                  [(0, se.Uk)(" Right click and save as"), gi, vi],
                                  8,
                                  mi
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["show"]
                        ))
                      : (0, se.kq)("", !0),
                  ])
                )
              },
            },
            fi = hi,
            wi = { class: "mr-1c" },
            bi = ["disabled", "textContent"],
            yi = ["disabled", "title", "textContent"],
            xi = {
              __name: "vm-maintenance",
              setup(e) {
                const t = (0, R.iH)((0, D.ag)("buttonVacuum")),
                  n = (0, D.ag)("buttonResetSettings"),
                  l = (0, R.iH)(""),
                  a = (0, R.iH)(n)
                async function o(e, t) {
                  if (await (0, W.GW)(t, { ok: { className: "has-error" } })) return oe(e)
                }
                function i() {
                  const e = ["lastModified", "lastUpdate", "sync"],
                    t = w(be.Xw, Lo.ZP, null, (t, n) => !e.includes(t) && !(0, be.vZ)(n, j.Z.get(t)) && t)
                  return (
                    (l.value = JSON.stringify(t, null, 2)
                      .slice(1, -1)
                      .replace(/^\s{2}/gm, "")),
                    (a.value = `${n} (${u.keys(t).length})`),
                    (0, D.gj)("SetOptions", t)
                  )
                }
                async function s() {
                  await oe(async () => {
                    t.value = (0, D.ag)("buttonVacuuming")
                    const { fixes: e, errors: n } = await (0, D.gj)("Vacuum"),
                      l = null == n ? void 0 : n.join("\n")
                    ;(t.value = (0, D.ag)("buttonVacuumed") + (e ? ` (${e})` : "")),
                      l && (0, W.GW)((0, D.ag)("msgErrorFetchingResource") + "\n\n" + l, { cancel: !1 })
                  })
                }
                return (e, r) => (
                  (0, se.wg)(),
                  (0, se.iD)("div", wi, [
                    (0, se.Wm)(
                      (0, R.SU)(xe.Z),
                      { content: (0, R.SU)(D.ag)("hintVacuum") },
                      {
                        default: (0, se.w5)(() => [
                          (0, se._)(
                            "button",
                            { onClick: s, disabled: (0, R.SU)(Y).batch, textContent: (0, re.zw)(t.value) },
                            null,
                            8,
                            bi
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["content"]
                    ),
                    (0, se._)(
                      "button",
                      {
                        onClick: r[0] || (r[0] = (e) => o(i, (0, R.SU)(n))),
                        disabled: (0, R.SU)(Y).batch,
                        title: l.value,
                        textContent: (0, re.zw)(a.value),
                      },
                      null,
                      8,
                      yi
                    ),
                  ])
                )
              },
            },
            Ci = { class: "mb-1c" },
            _i = ["textContent"],
            ki = { key: 0, class: "flex flex-wrap center-items" },
            Si = ["textContent"],
            Ui = ["value"],
            zi = ["textContent", "value"],
            Di = ["textContent", "disabled"],
            $i = ["disabled"],
            Hi = ["textContent"],
            ji = { key: 1, class: "mt-1c" },
            Wi = { class: "sync-server-url" },
            Ii = ["textContent"],
            Ri = ["disabled"],
            Ti = { class: "mr-2c" },
            Mi = ["textContent"],
            Oi = ["disabled"],
            Ei = { class: "inline-block" },
            Zi = ["textContent"],
            Vi = ["disabled"],
            Pi = ["disabled"],
            Yi = ["textContent"],
            Ai = ["textContent", "disabled"],
            Li = { key: 2 },
            Fi = "sync.current",
            qi = { current: "" }
          ;(0, we.Z)(Fi, (e) => {
            qi.current = e || ""
          })
          const Ni = {
              components: { SettingCheck: Ce.Z, Icon: _e.Z, Tooltip: xe.Z },
              data: () => ({ syncConfig: qi, store: Y }),
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
                  j.Z.set(Fi, t)
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
            Bi = (0, Pt.Z)(Ni, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var i, s
                  const r = (0, se.up)("icon"),
                    c = (0, se.up)("tooltip"),
                    u = (0, se.up)("setting-check")
                  return (
                    (0, se.wg)(),
                    (0, se.iD)("section", Ci, [
                      (0, se._)("h3", { textContent: (0, re.zw)(e.i18n("labelSync")) }, null, 8, _i),
                      o.state
                        ? ((0, se.wg)(),
                          (0, se.iD)("div", ki, [
                            (0, se._)("span", { textContent: (0, re.zw)(e.i18n("labelSyncService")) }, null, 8, Si),
                            (0, se._)(
                              "select",
                              {
                                class: "mx-1",
                                value: a.syncConfig.current,
                                onChange: t[0] || (t[0] = (...e) => o.onSyncChange && o.onSyncChange(...e)),
                              },
                              [
                                ((0, se.wg)(!0),
                                (0, se.iD)(
                                  se.HY,
                                  null,
                                  (0, se.Ko)(
                                    o.syncServices,
                                    (e) => (
                                      (0, se.wg)(),
                                      (0, se.iD)(
                                        "option",
                                        { key: e.name, textContent: (0, re.zw)(e.displayName), value: e.name },
                                        null,
                                        8,
                                        zi
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ],
                              40,
                              Ui
                            ),
                            o.service.name && "oauth" === o.state.authType
                              ? ((0, se.wg)(),
                                (0, se.iD)(
                                  "button",
                                  {
                                    key: 0,
                                    textContent: (0, re.zw)(o.state.label),
                                    disabled: !o.state.canAuthorize,
                                    onClick: t[1] || (t[1] = (...e) => o.onAuthorize && o.onAuthorize(...e)),
                                  },
                                  null,
                                  8,
                                  Di
                                ))
                              : (0, se.kq)("", !0),
                            o.service.name
                              ? ((0, se.wg)(),
                                (0, se.j4)(
                                  c,
                                  { key: 1, content: e.i18n("labelSync"), class: "stretch-self flex mr-1" },
                                  {
                                    default: (0, se.w5)(() => [
                                      (0, se._)(
                                        "button",
                                        {
                                          disabled: !o.state.canSync,
                                          onClick: t[2] || (t[2] = (...e) => o.onSync && o.onSync(...e)),
                                          class: "flex center-items",
                                        },
                                        [(0, se.Wm)(r, { name: "refresh" })],
                                        8,
                                        $i
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["content"]
                                ))
                              : (0, se.kq)("", !0),
                            o.state
                              ? ((0, se.wg)(),
                                (0, se.iD)("p", { key: 2, textContent: (0, re.zw)(o.state.message) }, null, 8, Hi))
                              : (0, se.kq)("", !0),
                          ]))
                        : (0, se.kq)("", !0),
                      "password" === (null == (i = o.state) ? void 0 : i.authType)
                        ? ((0, se.wg)(),
                          (0, se.iD)("fieldset", ji, [
                            (0, se._)("label", Wi, [
                              (0, se._)("span", { textContent: (0, re.zw)(e.i18n("labelSyncServerUrl")) }, null, 8, Ii),
                              (0, se.wy)(
                                (0, se._)(
                                  "input",
                                  {
                                    type: "url",
                                    "onUpdate:modelValue": t[3] || (t[3] = (e) => (o.state.userConfig.serverUrl = e)),
                                    disabled: !o.state.canAuthorize,
                                  },
                                  null,
                                  8,
                                  Ri
                                ),
                                [[fe.nr, o.state.userConfig.serverUrl]]
                              ),
                            ]),
                            (0, se._)("div", Ti, [
                              (0, se._)("label", null, [
                                (0, se._)(
                                  "span",
                                  { textContent: (0, re.zw)(e.i18n("labelSyncUsername")) },
                                  null,
                                  8,
                                  Mi
                                ),
                                (0, se.wy)(
                                  (0, se._)(
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
                                  [[fe.nr, o.state.userConfig.username]]
                                ),
                              ]),
                              (0, se._)("label", Ei, [
                                (0, se._)(
                                  "span",
                                  { textContent: (0, re.zw)(e.i18n("labelSyncPassword")) },
                                  null,
                                  8,
                                  Zi
                                ),
                                (0, se.wy)(
                                  (0, se._)(
                                    "input",
                                    {
                                      type: "password",
                                      "onUpdate:modelValue": t[5] || (t[5] = (e) => (o.state.userConfig.password = e)),
                                      disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                    },
                                    null,
                                    8,
                                    Vi
                                  ),
                                  [[fe.nr, o.state.userConfig.password]]
                                ),
                              ]),
                              (0, se._)("label", null, [
                                (0, se.wy)(
                                  (0, se._)(
                                    "input",
                                    {
                                      type: "checkbox",
                                      "onUpdate:modelValue": t[6] || (t[6] = (e) => (o.state.userConfig.anonymous = e)),
                                      disabled: !o.state.canAuthorize,
                                    },
                                    null,
                                    8,
                                    Pi
                                  ),
                                  [[fe.e8, o.state.userConfig.anonymous]]
                                ),
                                (0, se._)(
                                  "span",
                                  { textContent: (0, re.zw)(e.i18n("labelSyncAnonymous")) },
                                  null,
                                  8,
                                  Yi
                                ),
                              ]),
                            ]),
                            (0, se._)("div", null, [
                              (0, se._)(
                                "button",
                                {
                                  textContent: (0, re.zw)(e.i18n("buttonSave")),
                                  onClick:
                                    t[7] ||
                                    (t[7] = (0, fe.iM)(
                                      (...e) => o.onSaveUserConfig && o.onSaveUserConfig(...e),
                                      ["prevent"]
                                    )),
                                  disabled: !o.state.canAuthorize,
                                },
                                null,
                                8,
                                Ai
                              ),
                            ]),
                          ]))
                        : (0, se.kq)("", !0),
                      null != (s = o.service) && s.name
                        ? ((0, se.wg)(),
                          (0, se.iD)("div", Li, [
                            (0, se.Wm)(
                              u,
                              { name: "syncScriptStatus", label: e.i18n("labelSyncScriptStatus") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]))
                        : (0, se.kq)("", !0),
                    ])
                  )
                },
              ],
            ]),
            Ki = ["textContent"],
            Ji = { class: "mb-1 mr-1c flex center-items" },
            Gi = ["textContent"],
            Xi = ["disabled", "title"],
            Qi = ["textContent"],
            es = ["textContent"],
            ts = ["textContent"],
            ns = ["textContent"],
            ls = ["innerHTML"],
            as = { class: "btn-ghost", style: { border: "none" } },
            os = ["textContent"],
            is = ["innerHTML"],
            ss = ["innerHTML"],
            rs = ["textContent"],
            cs = "editorTheme",
            us = "editorThemeName",
            ds = [
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
            ps = "codemirror/CodeMirror",
            ms = "master",
            gs = "theme",
            vs = `https://github.com/${ps}/tree/${ms}/${gs}`,
            hs = "default",
            fs = {
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
                    ;(o.value = !1), await (0, se.Y3)(), null == n || n.focus()
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
                      (await (0, se.Y3)(),
                      t.value.getBoundingClientRect().bottom > innerHeight &&
                        t.value.scrollIntoView({ behavior: "smooth" }))
                }
                return (
                  (0, se.bv)(async () => {
                    let e
                    await j.Z.ready,
                      (0, se.YP)(l, m),
                      (0, se.YP)(c, async (t) => {
                        if (e) return void (e = !1)
                        const n = t && t !== hs && `https://raw.githubusercontent.com/${ps}/${ms}/${gs}/${t}.css`,
                          l = n && (await p(n))
                        j.Z.set(us, !n || l ? t : hs), j.Z.set(cs, l || "")
                      }),
                      (0, we.Z)(us, (t) => {
                        var n
                        c.value != (null != (n = t) ? n : (t = hs)) && ((e = !0), (c.value = t))
                      }),
                      (0, we.Z)(cs, (e) => {
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
                    (0, se.wg)(),
                    (0, se.iD)(
                      "section",
                      { ref_key: "$el", ref: t },
                      [
                        (0, se._)("h3", { textContent: (0, re.zw)(e.i18n("labelEditor")) }, null, 8, Ki),
                        (0, se._)("div", Ji, [
                          (0, se._)("span", { textContent: (0, re.zw)(e.i18n("labelTheme")) }, null, 8, Gi),
                          (0, se.wy)(
                            (0, se._)(
                              "select",
                              {
                                "onUpdate:modelValue": i[0] || (i[0] = (e) => (c.value = e)),
                                disabled: o.value,
                                title: r.value,
                              },
                              [
                                (0, se._)(
                                  "option",
                                  { value: hs, textContent: (0, re.zw)(e.i18n("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Qi
                                ),
                                (0, se._)(
                                  "option",
                                  { value: "", textContent: (0, re.zw)(e.i18n("labelBadgeNone")) },
                                  null,
                                  8,
                                  es
                                ),
                                ((0, se.wg)(!0),
                                (0, se.iD)(
                                  se.HY,
                                  null,
                                  (0, se.Ko)(
                                    (0, R.SU)(ds),
                                    (e) => (
                                      (0, se.wg)(),
                                      (0, se.iD)("option", { key: e, textContent: (0, re.zw)(e) }, null, 8, ts)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              Xi
                            ),
                            [[fe.bM, c.value]]
                          ),
                          (0, se._)("a", { href: vs, target: "_blank" }, "\u2197"),
                          (0, se._)("p", { textContent: (0, re.zw)(s.value) }, null, 8, ns),
                        ]),
                        (0, se._)("p", { class: "my-1", innerHTML: e.i18n("descEditorOptions") }, null, 8, ls),
                        (0, se.Wm)(
                          (0, R.SU)(On.Z),
                          { name: "editor", json: "", "has-reset": "", onDblclick: (0, R.SU)(ie) },
                          {
                            default: (0, se.w5)(() => [
                              (0, se._)(
                                "a",
                                { class: "ml-1", tabindex: "0", onClick: i[1] || (i[1] = (e) => (a.value = !a.value)) },
                                [(0, se.Wm)((0, R.SU)(_e.Z), { name: "info" })]
                              ),
                              (0, se._)("label", as, [
                                (0, se.wy)(
                                  (0, se._)(
                                    "input",
                                    { type: "checkbox", "onUpdate:modelValue": i[2] || (i[2] = (e) => (l.value = e)) },
                                    null,
                                    512
                                  ),
                                  [[fe.e8, l.value]]
                                ),
                                (0, se._)(
                                  "span",
                                  { textContent: (0, re.zw)(e.i18n("buttonShowEditorState")) },
                                  null,
                                  8,
                                  os
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["onDblclick"]
                        ),
                        a.value
                          ? ((0, se.wg)(),
                            (0, se.iD)(
                              se.HY,
                              { key: 0 },
                              [
                                (0, se._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsGeneric") },
                                  null,
                                  8,
                                  is
                                ),
                                (0, se._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsVM") },
                                  null,
                                  8,
                                  ss
                                ),
                              ],
                              64
                            ))
                          : (0, se.kq)("", !0),
                        (0, se._)(
                          "pre",
                          { textContent: (0, re.zw)(n.value), class: "monospace-font dim-hint" },
                          null,
                          8,
                          rs
                        ),
                      ],
                      512
                    )
                  )
                )
              },
            },
            ws = ["textContent"],
            bs = ["textContent"],
            ys = { class: "flex flex-wrap" },
            xs = { key: 0, class: "text-red" },
            Cs = ["textContent"],
            _s = {
              components: { SettingText: On.Z },
              data: () => ({ errors: null }),
              async mounted() {
                this.errors = await (0, D.gj)("Storage", ["base", "getOne", Ft.BZ])
              },
            },
            ks = (0, Pt.Z)(_s, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  const i = (0, se.up)("setting-text")
                  return (
                    (0, se.wg)(),
                    (0, se.iD)("section", null, [
                      (0, se._)("h3", { textContent: (0, re.zw)(e.i18n("labelBlacklist")) }, null, 8, ws),
                      (0, se._)("p", null, [
                        (0, se.Uk)((0, re.zw)(e.i18n("descBlacklist")) + " ", 1),
                        (0, se._)(
                          "a",
                          {
                            href: "https://violentmonkey.github.io/posts/smart-rules-for-blacklist/#blacklist-patterns",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            textContent: (0, re.zw)(e.i18n("learnBlacklist")),
                          },
                          null,
                          8,
                          bs
                        ),
                      ]),
                      (0, se._)("div", ys, [
                        (0, se.Wm)(i, {
                          name: "blacklist",
                          class: "flex-1",
                          onBgError: t[0] || (t[0] = (e) => (a.errors = e)),
                        }),
                        a.errors
                          ? ((0, se.wg)(),
                            (0, se.iD)("ol", xs, [
                              ((0, se.wg)(!0),
                              (0, se.iD)(
                                se.HY,
                                null,
                                (0, se.Ko)(
                                  a.errors,
                                  (e) => (
                                    (0, se.wg)(), (0, se.iD)("li", { key: e, textContent: (0, re.zw)(e) }, null, 8, Cs)
                                  )
                                ),
                                128
                              )),
                            ]))
                          : (0, se.kq)("", !0),
                      ]),
                    ])
                  )
                },
              ],
            ]),
            Ss = { badgeColor: (0, D.ag)("titleBadgeColor"), badgeColorBlocked: (0, D.ag)("titleBadgeColorBlocked") },
            Us = u.keys(Ss),
            zs = { enum: Ss, normalize: (e, t) => (/^#[0-9a-f]{6}$/i.test(e) ? e : Lo.ZP[t]) },
            Ds = {
              autoUpdate: { normalize: (e) => Math.max(0, Math.min(365, +e || 0)) },
              defaultInjectInto: { enum: Ft.Wg },
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
              ...w(be.Xw, Ss, () => zs),
            },
            $s = (e, t) => (f(Ds[t].enum, e) ? e : u.keys(Ds[t].enum)[0]),
            Hs = (e, t) =>
              (0, D.Ds)((n, l) => {
                ;(n = t(n, e)) !== (l = t(l, e)) && j.Z.set(e, n)
              }, 50),
            js = (0, R.qj)({}),
            Ws = {
              components: {
                VmImport: ti,
                VmExport: fi,
                VmMaintenance: xi,
                VmSync: Bi,
                VmEditor: fs,
                VmBlacklist: ks,
                VmDateInfo: ii,
                SettingCheck: Ce.Z,
                SettingText: On.Z,
                LocaleGroup: ke.Z,
                Tooltip: xe.Z,
              },
              data: () => ({ expose: null, items: Ds, settings: js }),
              computed: {
                editorWindowHint() {
                  var e
                  return null != (e = g.windows) && e.onBoundsChanged ? null : this.i18n("optionEditorWindowHint")
                },
                isCustomBadgeColor: () => Us.some((e) => js[e] !== Lo.ZP[e]),
              },
              methods: {
                ctrlS() {
                  ;(0, W.vY)().dispatchEvent(new Event("ctrl-s"))
                },
                onResetBadgeColors() {
                  Us.forEach((e) => {
                    js[e] = Lo.ZP[e]
                  })
                },
              },
              activated() {
                ;(0, W.wO)(this.$el),
                  (this.revokers = [he.$J.register("ctrlcmd-s", this.ctrlS, { condition: "inputFocus" })]),
                  w(be.LI, Ds, ([e, { normalize: t = $s }]) => {
                    this.revokers.push(
                      (0, we.Z)(e, (n) => {
                        js[e] = t(n, e)
                      })
                    ),
                      this.$watch(() => js[e], Hs(e, t))
                  }),
                  (this.expose = u.keys(j.Z.get(n)).map((e) => [e, decodeURIComponent(e)]))
              },
              deactivated() {
                this.revokers.forEach((e) => {
                  e()
                })
              },
            },
            Is = (0, Pt.Z)(Ws, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var i
                  const s = (0, se.up)("setting-check"),
                    r = (0, se.up)("tooltip"),
                    c = (0, se.up)("locale-group"),
                    u = (0, se.up)("vm-import"),
                    d = (0, se.up)("vm-export"),
                    p = (0, se.up)("vm-maintenance"),
                    m = (0, se.up)("vm-sync"),
                    g = (0, se.up)("vm-editor"),
                    v = (0, se.up)("vm-date-info"),
                    h = (0, se.up)("setting-text"),
                    f = (0, se.up)("vm-blacklist")
                  return (
                    (0, se.wg)(),
                    (0, se.iD)(
                      "div",
                      { class: "tab-settings", "data-show-advanced": a.settings.showAdvanced },
                      [
                        (0, se._)("h1", { textContent: (0, re.zw)(e.i18n("labelSettings")) }, null, 8, eo),
                        (0, se._)("section", to, [
                          (0, se._)("h3", { textContent: (0, re.zw)(e.i18n("optionPopup")) }, null, 8, no),
                          (0, se._)("div", null, [
                            (0, se.Wm)(s, { name: "autoReload", label: e.i18n("labelAutoReloadCurrentTab") }, null, 8, [
                              "label",
                            ]),
                          ]),
                          (0, se._)("div", lo, [
                            (0, se.Wm)(
                              s,
                              { name: "editorWindow", class: "mr-2", ref: "EW" },
                              {
                                default: (0, se.w5)(() => [
                                  (0, se.Wm)(
                                    r,
                                    { content: o.editorWindowHint, disabled: !o.editorWindowHint },
                                    {
                                      default: (0, se.w5)(() => [
                                        (0, se._)(
                                          "span",
                                          { textContent: (0, re.zw)(e.i18n("optionEditorWindow")) },
                                          null,
                                          8,
                                          ao
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
                            (0, se.wy)(
                              (0, se.Wm)(
                                s,
                                { name: "editorWindowSimple", label: e.i18n("optionEditorWindowSimple") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[fe.F8, null == (i = e.$refs.EW) ? void 0 : i.value]]
                            ),
                          ]),
                          (0, se._)("div", oo, [
                            (0, se._)("label", null, [
                              (0, se.Wm)(
                                c,
                                { "i18n-key": "labelPopupSort" },
                                {
                                  default: (0, se.w5)(() => [
                                    ((0, se.wg)(!0),
                                    (0, se.iD)(
                                      se.HY,
                                      null,
                                      (0, se.Ko)(["filtersPopup.sort"], (e) =>
                                        (0, se.wy)(
                                          ((0, se.wg)(),
                                          (0, se.iD)(
                                            "select",
                                            { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                            [
                                              ((0, se.wg)(!0),
                                              (0, se.iD)(
                                                se.HY,
                                                null,
                                                (0, se.Ko)(
                                                  a.items[e].enum,
                                                  (t, n) => (
                                                    (0, se.wg)(),
                                                    (0, se.iD)(
                                                      "option",
                                                      { key: `${e}:${n}`, value: n, textContent: (0, re.zw)(t) },
                                                      null,
                                                      8,
                                                      so
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                            ],
                                            8,
                                            io
                                          )),
                                          [[fe.bM, a.settings[e]]]
                                        )
                                      ),
                                      128
                                    )),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, se.wy)(
                              (0, se.Wm)(
                                s,
                                { name: "filtersPopup.groupRunAt", label: e.i18n("optionPopupGroupRunAt") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[fe.F8, "exec" === a.settings["filtersPopup.sort"]]]
                            ),
                            (0, se._)("label", null, [
                              ((0, se.wg)(!0),
                              (0, se.iD)(
                                se.HY,
                                null,
                                (0, se.Ko)(["filtersPopup.hideDisabled"], (e) =>
                                  (0, se.wy)(
                                    ((0, se.wg)(),
                                    (0, se.iD)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, se.wg)(!0),
                                        (0, se.iD)(
                                          se.HY,
                                          null,
                                          (0, se.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, se.wg)(),
                                              (0, se.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, re.zw)(t) },
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
                                    )),
                                    [[fe.bM, a.settings[e]]]
                                  )
                                ),
                                128
                              )),
                            ]),
                            (0, se.wy)(
                              (0, se.Wm)(
                                s,
                                { name: "filtersPopup.enabledFirst", label: e.i18n("optionPopupEnabledFirst") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[fe.F8, !a.settings["filtersPopup.hideDisabled"]]]
                            ),
                          ]),
                          (0, se._)("div", null, [
                            (0, se._)("label", null, [
                              (0, se._)("span", { textContent: (0, re.zw)(e.i18n("labelBadge")) }, null, 8, uo),
                              ((0, se.wg)(),
                              (0, se.iD)(
                                se.HY,
                                null,
                                (0, se.Ko)(["showBadge"], (e) =>
                                  (0, se.wy)(
                                    (0, se._)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, se.wg)(!0),
                                        (0, se.iD)(
                                          se.HY,
                                          null,
                                          (0, se.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, se.wg)(),
                                              (0, se.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, re.zw)(t) },
                                                null,
                                                8,
                                                mo
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ],
                                      8,
                                      po
                                    ),
                                    [[fe.bM, a.settings[e]]]
                                  )
                                ),
                                64
                              )),
                            ]),
                          ]),
                          (0, se._)("div", null, [
                            (0, se._)("label", null, [
                              (0, se._)("span", { textContent: (0, re.zw)(e.i18n("labelBadgeColors")) }, null, 8, go),
                              ((0, se.wg)(!0),
                              (0, se.iD)(
                                se.HY,
                                null,
                                (0, se.Ko)(
                                  a.items.badgeColor.enum,
                                  (e, t) => (
                                    (0, se.wg)(),
                                    (0, se.j4)(
                                      r,
                                      { key: `bc:${t}`, content: e },
                                      {
                                        default: (0, se.w5)(() => [
                                          (0, se.wy)(
                                            (0, se._)(
                                              "input",
                                              { type: "color", "onUpdate:modelValue": (e) => (a.settings[t] = e) },
                                              null,
                                              8,
                                              vo
                                            ),
                                            [[fe.nr, a.settings[t]]]
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
                              (0, se.wy)(
                                (0, se._)(
                                  "button",
                                  {
                                    textContent: (0, re.zw)(e.i18n("buttonReset")),
                                    class: "ml-1",
                                    onClick:
                                      t[0] || (t[0] = (...e) => o.onResetBadgeColors && o.onResetBadgeColors(...e)),
                                  },
                                  null,
                                  8,
                                  ho
                                ),
                                [[fe.F8, o.isCustomBadgeColor]]
                              ),
                            ]),
                          ]),
                        ]),
                        (0, se._)("section", fo, [
                          (0, se._)("h3", { textContent: (0, re.zw)(e.i18n("optionUpdate")) }, null, 8, wo),
                          (0, se._)("div", bo, [
                            (0, se._)("label", null, [
                              (0, se.Wm)(
                                c,
                                { "i18n-key": "labelAutoUpdate" },
                                {
                                  default: (0, se.w5)(() => [
                                    (0, se.wy)(
                                      (0, se._)(
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
                                      [[fe.nr, a.settings.autoUpdate]]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, se.Wm)(
                              s,
                              { name: "updateEnabledScriptsOnly", label: e.i18n("labelEnabledScriptsOnly") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                          (0, se._)("div", yo, [
                            (0, se.Wm)(s, { name: "notifyUpdates", label: e.i18n("labelNotifyUpdates") }, null, 8, [
                              "label",
                            ]),
                            (0, se.Wm)(
                              s,
                              { name: "notifyUpdatesGlobal", label: e.i18n("labelNotifyUpdatesGlobal"), class: "ml-2" },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                        ]),
                        (0, se._)("section", xo, [
                          (0, se._)("h3", { textContent: (0, re.zw)(e.i18n("labelBackupMaintenance")) }, null, 8, Co),
                          (0, se.Wm)(u),
                          (0, se.Wm)(d),
                          _o,
                          (0, se.Wm)(p),
                        ]),
                        (0, se.Wm)(m),
                        ((0, se.wg)(!0),
                        (0, se.iD)(
                          se.HY,
                          null,
                          (0, se.Ko)(
                            { showAdvanced: a.settings },
                            (t, n) => (
                              (0, se.wg)(),
                              (0, se.iD)(
                                "details",
                                { key: n, open: t[n] },
                                [
                                  (0, se._)(
                                    "summary",
                                    { onClick: (0, fe.iM)((e) => (t[n] = !t[n]), ["prevent"]) },
                                    [
                                      ((0, se.wg)(),
                                      (0, se.j4)(
                                        (0, se.LL)(t[n] ? "h1" : "h3"),
                                        { textContent: (0, re.zw)(e.i18n("labelAdvanced")), class: "inline-block" },
                                        null,
                                        8,
                                        ["textContent"]
                                      )),
                                    ],
                                    8,
                                    So
                                  ),
                                  (0, se._)("section", Uo, [
                                    (0, se._)("h3", { textContent: (0, re.zw)(e.i18n("labelGeneral")) }, null, 8, zo),
                                    (0, se._)("div", null, [
                                      (0, se._)("label", null, [
                                        (0, se.Wm)(
                                          c,
                                          { "i18n-key": "optionUiTheme" },
                                          {
                                            default: (0, se.w5)(() => [
                                              ((0, se.wg)(),
                                              (0, se.iD)(
                                                se.HY,
                                                null,
                                                (0, se.Ko)(["uiTheme"], (e) =>
                                                  (0, se.wy)(
                                                    (0, se._)(
                                                      "select",
                                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                      [
                                                        ((0, se.wg)(!0),
                                                        (0, se.iD)(
                                                          se.HY,
                                                          null,
                                                          (0, se.Ko)(
                                                            a.items[e].enum,
                                                            (e, t) => (
                                                              (0, se.wg)(),
                                                              (0, se.iD)(
                                                                "option",
                                                                { key: t, value: t, textContent: (0, re.zw)(e) },
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
                                                    [[fe.bM, a.settings[e]]]
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
                                    (0, se._)("div", Ho, [
                                      (0, se._)("label", null, [
                                        (0, se._)(
                                          "span",
                                          { textContent: (0, re.zw)(e.i18n("labelInjectionMode")) },
                                          null,
                                          8,
                                          jo
                                        ),
                                        ((0, se.wg)(),
                                        (0, se.iD)(
                                          se.HY,
                                          null,
                                          (0, se.Ko)(["defaultInjectInto"], (e) =>
                                            (0, se.wy)(
                                              (0, se._)(
                                                "select",
                                                { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                [
                                                  ((0, se.wg)(!0),
                                                  (0, se.iD)(
                                                    se.HY,
                                                    null,
                                                    (0, se.Ko)(
                                                      a.items[e].enum,
                                                      (e, t) => (
                                                        (0, se.wg)(),
                                                        (0, se.iD)(
                                                          "option",
                                                          { key: t, textContent: (0, re.zw)(t) },
                                                          null,
                                                          8,
                                                          Io
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                ],
                                                8,
                                                Wo
                                              ),
                                              [[fe.bM, a.settings[e]]]
                                            )
                                          ),
                                          64
                                        )),
                                        (0, se._)(
                                          "a",
                                          {
                                            class: "ml-1",
                                            href: "https://violentmonkey.github.io/posts/inject-into-context/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            textContent: (0, re.zw)(e.i18n("learnInjectionMode")),
                                          },
                                          null,
                                          8,
                                          Ro
                                        ),
                                      ]),
                                      (0, se.Wm)(
                                        r,
                                        { content: e.i18n("labelXhrInjectHint") },
                                        {
                                          default: (0, se.w5)(() => [
                                            (0, se.Wm)(
                                              s,
                                              { name: "xhrInject" },
                                              {
                                                default: (0, se.w5)(() => [
                                                  (0, se.Wm)(
                                                    c,
                                                    { "i18n-key": "labelXhrInject" },
                                                    { default: (0, se.w5)(() => [To]), _: 1 }
                                                  ),
                                                  (0, se.Uk)(),
                                                  (0, se._)(
                                                    "ruby",
                                                    { textContent: (0, re.zw)(e.i18n("labelXhrInjectNote")) },
                                                    null,
                                                    8,
                                                    Mo
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
                                        ? (0, se.kq)("", !0)
                                        : ((0, se.wg)(),
                                          (0, se.iD)("label", Oo, [
                                            (0, se.Wm)(s, { name: "ffInject" }),
                                            (0, se.Wm)(
                                              r,
                                              { content: e.i18n("labelFastFirefoxInjectHint") },
                                              {
                                                default: (0, se.w5)(() => [
                                                  (0, se.Wm)(
                                                    c,
                                                    { "i18n-key": "labelFastFirefoxInject" },
                                                    { default: (0, se.w5)(() => [Eo]), _: 1 }
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["content"]
                                            ),
                                          ])),
                                    ]),
                                    (0, se._)("div", null, [
                                      (0, se.Wm)(
                                        c,
                                        { "i18n-key": "labelExposeStatus", class: "flex flex-col" },
                                        {
                                          default: (0, se.w5)(() => [
                                            ((0, se.wg)(!0),
                                            (0, se.iD)(
                                              se.HY,
                                              null,
                                              (0, se.Ko)(
                                                a.expose,
                                                ([e, t]) => (
                                                  (0, se.wg)(),
                                                  (0, se.j4)(
                                                    s,
                                                    { key: t, name: `expose.${e}`, class: "ml-2 mr-1c valign-tb" },
                                                    {
                                                      default: (0, se.w5)(() => [
                                                        (0, se._)("span", { textContent: (0, re.zw)(t) }, null, 8, Zo),
                                                        (0, se._)(
                                                          "a",
                                                          {
                                                            href: `https://${t}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                          },
                                                          "\u2197",
                                                          8,
                                                          Vo
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
                                    (0, se.Wm)(
                                      s,
                                      { name: "helpForLocalFile", label: e.i18n("helpForLocalFile") },
                                      null,
                                      8,
                                      ["label"]
                                    ),
                                  ]),
                                  (0, se.Wm)(g),
                                  (0, se._)("section", null, [
                                    (0, se._)(
                                      "h3",
                                      { textContent: (0, re.zw)(e.i18n("labelScriptTemplate")) },
                                      null,
                                      8,
                                      Po
                                    ),
                                    (0, se._)("p", null, [
                                      ((0, se.wg)(!0),
                                      (0, se.iD)(
                                        se.HY,
                                        null,
                                        (0, se.Ko)(
                                          e.i18n("descScriptTemplate").split(/<(\S+?)>/),
                                          (e, t) => (
                                            (0, se.wg)(),
                                            (0, se.j4)(
                                              (0, se.LL)(t % 2 ? "code" : "span"),
                                              { textContent: (0, re.zw)(e), key: t },
                                              null,
                                              8,
                                              ["textContent"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                      (0, se.Uk)(),
                                      (0, se.Wm)(v),
                                    ]),
                                    (0, se.Wm)(h, { name: "scriptTemplate", "has-reset": "" }),
                                  ]),
                                  (0, se.Wm)(f),
                                  (0, se._)("section", null, [
                                    (0, se._)("h3", { textContent: (0, re.zw)(e.i18n("labelCustomCSS")) }, null, 8, Yo),
                                    (0, se._)("p", { innerHTML: e.i18n("descCustomCSS") }, null, 8, Ao),
                                    (0, se.Wm)(h, { name: "customCSS" }),
                                  ]),
                                ],
                                8,
                                ko
                              )
                            )
                          ),
                          128
                        )),
                      ],
                      8,
                      Qa
                    )
                  )
                },
              ],
            ]),
            Rs = { class: "tab-about mb-2c" },
            Ts = { class: "mt-0 mr-1c" },
            Ms = ["textContent"],
            Os = ["textContent"],
            Es = ["textContent"],
            Zs = ["textContent"],
            Vs = ["textContent"],
            Ps = ["textContent"],
            Ys = ["textContent"],
            As = ["textContent"],
            Ls = ["textContent"],
            Fs = ["textContent"],
            qs = ["textContent"],
            Ns = {
              __name: "tab-about",
              setup(e) {
                const t = x.name,
                  n = browser.i18n.getUILanguage()
                return (e, l) => (
                  (0, se.wg)(),
                  (0, se.iD)("div", Rs, [
                    (0, se._)("h1", Ts, [
                      (0, se._)("span", { textContent: (0, re.zw)((0, R.SU)(t)) }, null, 8, Ms),
                      (0, se._)("small", { textContent: (0, re.zw)(`v${(0, R.SU)("2.19.4")}`) }, null, 8, Os),
                    ]),
                    (0, se._)("p", { textContent: (0, re.zw)(e.i18n("extDescription")) }, null, 8, Es),
                    (0, se._)("div", null, [
                      (0, se._)("label", { textContent: (0, re.zw)(e.i18n("labelRelated")) }, null, 8, Zs),
                      (0, se._)("ul", null, [
                        (0, se._)("li", null, [
                          (0, se._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, re.zw)(e.i18n("labelHomepage")),
                            },
                            null,
                            8,
                            Vs
                          ),
                        ]),
                        (0, se._)("li", null, [
                          (0, se._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/issues",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, re.zw)(e.i18n("labelFeedback")),
                            },
                            null,
                            8,
                            Ps
                          ),
                        ]),
                        (0, se._)("li", null, [
                          (0, se._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/graphs/contributors",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, re.zw)(e.i18n("labelContributors")),
                            },
                            null,
                            8,
                            Ys
                          ),
                        ]),
                        (0, se._)("li", null, [
                          (0, se._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io/privacy/",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, re.zw)(e.i18n("labelPrivacyPolicy")),
                            },
                            null,
                            8,
                            As
                          ),
                        ]),
                      ]),
                    ]),
                    (0, se._)("div", null, [
                      (0, se._)("label", { textContent: (0, re.zw)(e.i18n("labelCurrentLang")) }, null, 8, Ls),
                      (0, se._)("span", { class: "current", textContent: (0, re.zw)((0, R.SU)(n)) }, null, 8, Fs),
                      (0, se.Uk)(" | "),
                      (0, se._)(
                        "a",
                        {
                          href: "https://violentmonkey.github.io/localization/",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          textContent: (0, re.zw)(e.i18n("labelHelpTranslate")),
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
            Bs = [
              { name: o, comp: Xa, label: (0, D.ag)("sideMenuInstalled") },
              { name: C, comp: Is, label: (0, D.ag)("sideMenuSettings") },
              { name: _, comp: Ns, label: (0, D.ag)("sideMenuAbout") },
              { name: k, comp: Xa, label: (0, D.ag)("buttonRecycleBin") },
            ],
            Ks = (0, D.ag)("extName"),
            Js = "!editScript",
            Gs = (0, se.Fl)(() => {
              const e = Y.route.paths[0]
              return Bs.find((t) => t.name === e) || Bs[0]
            }),
            Xs = (0, se.Fl)(() => ({ [o]: Y.scripts.length, [k]: Y.removedScripts.length }))
          function Qs() {
            const e = Gs.value.name === o,
              { paths: t } = Y.route
            he.$J.setContext("editScript", e && t[1]),
              he.$J.setContext("tabScripts", e && !t[1]),
              he.$J.setContext("showRecycle", Gs.value.name === k)
          }
          function er(e) {
            const n = Bs.indexOf(Gs.value),
              l = Bs[(n + e + Bs.length) % Bs.length]
            t.location.hash = (null == l ? void 0 : l.name) || ""
          }
          p(
            "dragover",
            (e) => {
              var t
              Y.route.hash !== C &&
                /^application\/(zip|x-zip-compressed)$/.test(null == (t = e.dataTransfer.items[0]) ? void 0 : t.type) &&
                (location.hash = `#${C}`)
            },
            !0
          )
          const tr = {
              setup() {
                const [e, t] = Y.route.paths,
                  n = (0, R.iH)(e !== o || ("_new" !== t && !Number(t)))
                return (
                  (0, se.m0)(() => {
                    const { title: e } = Y
                    document.title = e ? `${e} - ${Ks}` : Ks
                  }),
                  (0, se.YP)(
                    () => Y.route.paths,
                    () => {
                      ;(n.value = !0), Qs()
                    }
                  ),
                  (0, se.bv)(() => {
                    const e = [
                      he.$J.register("a-pageup", () => er(-1), { condition: Js }),
                      he.$J.register("a-pagedown", () => er(1), { condition: Js }),
                    ]
                    return (
                      he.$J.enable(),
                      Qs(),
                      () => {
                        e.forEach((e) => {
                          e()
                        }),
                          he.$J.disable()
                      }
                    )
                  }),
                  { tabs: Bs, current: Gs, numbers: Xs, canRenderAside: n }
                )
              },
            },
            nr = (0, Pt.Z)(tr, [
              [
                "render",
                (e, t, n, l, a, o) => (
                  (0, se.wg)(),
                  (0, se.iD)("div", ce, [
                    l.canRenderAside
                      ? ((0, se.wg)(),
                        (0, se.iD)("aside", ue, [
                          (0, se._)("div", de, [
                            pe,
                            (0, se._)(
                              "h1",
                              { class: "hidden-sm", textContent: (0, re.zw)(e.i18n("extName")) },
                              null,
                              8,
                              me
                            ),
                            ge,
                            ((0, se.wg)(!0),
                            (0, se.iD)(
                              se.HY,
                              null,
                              (0, se.Ko)(
                                l.tabs,
                                (e) => (
                                  (0, se.wg)(),
                                  (0, se.iD)("div", { class: "aside-menu-item", key: e.name }, [
                                    (0, se._)(
                                      "a",
                                      {
                                        href: `#${e.name}`,
                                        class: (0, re.C_)({ active: e === l.current }),
                                        "data-num-scripts": l.numbers[e.name],
                                        textContent: (0, re.zw)(e.label),
                                      },
                                      null,
                                      10,
                                      ve
                                    ),
                                  ])
                                )
                              ),
                              128
                            )),
                          ]),
                        ]))
                      : (0, se.kq)("", !0),
                    ((0, se.wg)(),
                    (0, se.j4)(
                      se.Ob,
                      null,
                      [((0, se.wg)(), (0, se.j4)((0, se.LL)(l.current.comp), { class: "tab" }))],
                      1024
                    )),
                  ])
                ),
              ],
            ]),
            lr = [
              (0, D.ag)("editNavCode"),
              (0, D.ag)("editNavSettings"),
              (0, D.ag)("editNavValues"),
              "@require",
              "@resource",
            ]
          let ar
          function or(e, t, n) {
            const l = e.$cache || (e.$cache = {}),
              a = e.meta || {},
              { custom: o } = e,
              i = (0, D.iQ)(a, G),
              s = w(D.Hv, [a[G], i, a[N], (0, D.iQ)(a, N), o[G], o[N]], "\n"),
              r = o[G] || i
            let c = 0,
              u = ""
            t.forEach((e, t) => {
              ;(c += e), e && (u += `${lr[t]}: ${(0, D.aj)(e)}\n`)
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
              (0, H.d)(e, Y, !0)
          }
          function ir() {
            const e = +Y.route.paths[1]
            return sr(e).catch(e && (() => sr()))
          }
          async function sr(e) {
            const [t] = await d.all([(0, D.gj)("GetData", { id: e, sizes: !0 }, { retry: !0 }), j.Z.ready]),
              { [o]: n, sizes: l, ...a } = t
            u.assign(Y, a)
            const i = [],
              s = []
            n.forEach((e, t) => {
              or(e, l[t]), (e.config.removed ? s : i).push(e)
            }),
              (Y.scripts = i),
              (Y.removedScripts = s),
              (Y.loading = !1)
          }
          ;(Y.loading = !0),
            ir(),
            u.assign($.Z, {
              ScriptsUpdated() {
                ir()
              },
              UpdateSync(e) {
                Y.sync = e
              },
              async UpdateScript({ update: e, where: t, code: n } = {}) {
                var l
                if (!e) return
                ;(ar || ((ar = Y.batch) && (ar = d.race([ar, (0, D.dL)(500)])))) && (await ar, (ar = null))
                const a = Y.scripts.findIndex((e) => e.props.id === t.id),
                  i = Y.removedScripts.findIndex((e) => e.props.id === t.id),
                  s = Y.scripts[a] || Y.removedScripts[i] || (e.meta && Y.canRenderScripts && {})
                if (!s) return
                const [r] = await (0, D.gj)("GetSizes", [t.id]),
                  { search: c } = Y
                if (
                  (u.assign(s, e),
                  s.error && !e.error && (s.error = null),
                  or(s, r, n),
                  c && P([s], c.rules),
                  null != (null == (l = e.config) ? void 0 : l.removed) &&
                    (e.config.removed
                      ? (Y.needRefresh = !0)
                      : (Y.removedScripts = Y.removedScripts.filter((e) => e.props.id !== t.id))),
                  (s.config.removed ? i : a) < 0)
                ) {
                  s.message = ""
                  const e = s.config.removed ? "removedScripts" : o
                  Y[e] = [...Y[e], s]
                }
              },
              RemoveScripts(e) {
                Y.removedScripts = Y.removedScripts.filter((t) => !e.includes(t.props.id))
              },
            }),
            (0, W.sY)(nr)
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
    var j = H.O(void 0, [386, 84], () => H(8506))
    j = H.O(j)
  })()
}
