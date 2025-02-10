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
            const link = document.createElement('link');
            link.dataset.url = url;
            const onload = function () {
              link.removeEventListener('load', onload, false);
              link.removeEventListener('error', onerror, false);
              if (urlMap) urlMap.set(url, bu);
              resolve(bu);
            }
            const onerror = function () {
              link.removeEventListener('load', onload, false);
              link.removeEventListener('error', onerror, false);
              if (urlMap) urlMap.set(url, bu);
              resolve(bu);
            }
            
            link.addEventListener('load', onload, false);
            link.addEventListener('error', onerror, false);
            link.rel = 'stylesheet';
            link.href = bu;
            document.head.appendChild(link);
          } else if (type === 'js') {
            const script = document.createElement('script');
            script.dataset.url = url;
            const onload = function () {
              script.removeEventListener('load', onload, false);
              script.removeEventListener('error', onerror, false);
              if (urlMap) urlMap.set(url, bu);
              resolve(bu);
            }
            const onerror = function () {
              script.removeEventListener('load', onload, false);
              script.removeEventListener('error', onerror, false);
              if (urlMap) urlMap.set(url, bu);
              resolve(bu);
            }
            script.addEventListener('load', onload, false);
            script.addEventListener('error', onerror, false);
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



    const vsPath = "/public/lib/monaco-editor/0.52.2/min/vs";

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

    function compareVersions(a, b) {
      if (a === b) return 0;
      // This regex splits a version “part” into up to two numeric sections and two string sections.
      const re = /^(\d*)(\D*)(\d*)(\D*)$/;
      const partsA = a.split('.');
      const partsB = b.split('.');
      for (let i = 0; i < partsA.length; i++) {
        // For missing parts, use an empty string.
        const partA = partsA[i];
        const partB = partsB[i] || "";
        // Simulate parseVersionPart:
        // If the part is falsy (undefined or empty), treat it as if it were "0" (for numeric groups)
        // with no extra string.
        const mA = partA ? re.exec(partA) : ["", "0", "", "0", ""];
        const mB = partB ? re.exec(partB) : ["", "0", "", "0", ""];
        // Compare the numeric groups (the 1st and 3rd captured groups)
        for (const j of [1, 3]) {
          const numA = parseInt(mA[j] || "0", 10);
          const numB = parseInt(mB[j] || "0", 10);
          if (numA !== numB) return numA > numB ? 1 : -1;
        }
        // Compare the string groups (the 2nd and 4th captured groups)
        // According to the rule: a non‐empty string is “less” than an empty one.
        for (const j of [2, 4]) {
          const strA = mA[j] || "";
          const strB = mB[j] || "";
          if (strA && !strB) return -1;
          if (!strA && strB) return 1;
          if (strA !== strB) return strA > strB ? 1 : -1;
        }
      }
      // If all of a’s parts match b’s parts but b has additional parts, b is considered greater.
      return partsB.length > partsA.length ? -1 : 0;
    }
    

    const firstInjection = async () => {

      const versionCodeM = /monaco-editor\/([\d\.]+)\/min/.exec(vsPath);
      const versionCode = versionCodeM ? versionCodeM[1] : '';
      const below_0_52_0 = versionCode ? ((compareVersions(versionCode, '0.52.0') < 0)) : false;

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
      if (!below_0_52_0) await loadResourceByURL('js', `${vsPath}/editor/editor.main.nls.js`, urlMap);
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
    s = (e) => "function" == typeof e,
    i = (e) => null != e && "object" == typeof e,
    {
      Boolean: u,
      Error: r,
      Object: c,
      Promise: d,
      addEventListener: v,
      removeEventListener: p,
      chrome: m,
      performance: f,
    } = e,
    { apply: h } = Reflect,
    b = h.call.bind({}.hasOwnProperty),
    k = c.call.bind(c.call),
    g = "contextualIdentities" in m,
    C = "#" + o,
    y = (m.runtime.getURL("/").slice(0, -1), m.runtime.getManifest()),
    x =
      (m.runtime.getURL(y.options_ui.page).split("#", 1)[0],
      m.runtime.getURL(y.icons[16].replace("16.png", "")),
      "settings"),
    R = "about",
    L = "recycleBin",
    w = "frameId"
  ;(() => {
    var h,
      _,
      E,
      S = {
        8678: (e, t, n) => {
          "use strict"
          var l = n(1386),
            a = n(5720)
          const o = (0, l.A)({ lifetime: 3e5 })
          ;(0, a.Ui)({
            CacheLoad: (e) => o.get(e) || null,
            CacheHit(e) {
              o.hit(e.key, e.lifetime)
            },
            CachePop: (e) => o.pop(e) || null,
          })
        },
        288: (e, t, n) => {
          "use strict"
          n.d(t, { f2: () => l.f2 }), n(8678)
          var l = n(5720)
          n(8654)
        },
        5720: (e, t, n) => {
          "use strict"
          n.d(t, { Ts: () => i, Ui: () => o, f2: () => a })
          const l = {},
            a = (e) => c.assign(l, e),
            o = (e) => {
              for (const t in e) (l[t] = e[t]).isOwn = !0
            }
          let s,
            i = new d((e) => {
              s = () => d.all(i.deps).then(e)
            })
          ;(i.deps = []), i.then(() => (i = null))
        },
        8654: (e, t, n) => {
          "use strict"
          var l = n(8916),
            a = n(5329),
            o = n(3417),
            s = n(5720),
            i = n(3785)
          let u
          ;(0, s.Ui)({
            GetAllOptions: () => c.assign({}, o.Ay, r),
            SetOptions(e) {
              for (const t in e) k(t, e[t], !0)
              f()
            },
          })
          const r = {},
            d = (0, l.RI)(),
            v = (0, l.sg)(f, 100),
            p = (0, l.sg)(() => i.Ay.base.setOne("options", r), 100)
          function m(e, t, n) {
            u ? delete u[e] : (u = {}), (u[e] = t), n || v()
          }
          function f() {
            if (!u) return
            const e = u
            ;(u = null), d.fire(e)
          }
          function h(e) {
            var t
            let n = r[e]
            if (null != n) return n
            const s = (0, l.qC)(e),
              i = s[0],
              u = null != (t = r[i]) ? t : (0, a.A4)(o.Ay[i])
            return s.length > 1 ? (0, a.Wt)(u, s.slice(1)) : u
          }
          function k(e, t, n) {
            if (s.Ts) return s.Ts.then(k.bind(null, ...arguments))
            const i = (0, l.qC)(e),
              u = i[0]
            if (((e = i.join(".")), !b(o.Ay, u))) return
            const c = i.length > 1 && i.slice(1),
              d = h([u])
            ;(0, a.bD)(t, c ? (0, a.Wt)(d, c) : d) || ((r[u] = c ? (0, a.MK)(d, c, t) : t), g(u), p(), m(e, t, n))
          }
          function g(e) {
            return (0, a.bD)(r[e], o.Ay[e]) && delete r[e]
          }
          ;(new Proxy(o.Ay, { get: (e, t) => h(t) }), d.hook)((e) => (0, l.ZM)("UpdateOptions", e))
        },
        3785: (e, t, n) => {
          "use strict"
          n.d(t, { Ay: () => h })
          var l = n(5329),
            a = n(4758),
            o = n(5720)
          let s = browser.storage.local
          class i {
            constructor(e, t) {
              ;(m[t] = this), (this.name = e), (this.prefix = t)
            }
            toKey(e) {
              return this.prefix + e
            }
            toId(e) {
              return e.startsWith(this.prefix) ? e.slice(this.prefix.length) : ""
            }
            async getOne(e) {
              const t = this.toKey(e)
              return (await s.get([t]))[t]
            }
            async getMulti(e, t) {
              const n = null == e ? void 0 : e.map(this.toKey, this),
                a = await s.get(n)
              return t || this.prefix ? k(l.BJ, a, t, this.toId, this) : a
            }
            async remove(e) {
              const t = (0, a.eC)(e).filter(u).map(this.toKey, this)
              t.length && (await s.remove(t))
            }
            async setOne(e, t) {
              if (e) return this.set({ [e]: t })
            }
            async set(e) {
              return await s.set(this.prefix ? k(l.BJ, e, null, this.toKey, this) : e), e
            }
          }
          s.getKeys
          const r = "cache",
            c = "code",
            d = "require",
            v = "script",
            p = "value",
            m = {},
            f = {
              get api() {
                return s
              },
              set api(e) {
                s = e
              },
              forKey: (e) => m[/^\w+:|$/.exec(e)[0]],
              base: new i("base", ""),
              [r]: new i(r, "cac:"),
              [c]: new i(c, "code:"),
              mod: new i("mod", "mod:"),
              [d]: new i(d, "req:"),
              [v]: new i(v, "scr:"),
              [p]: new i(p, "val:"),
            },
            h = f
          ;(0, o.Ui)({ Storage: ([e, t, ...n]) => f[e][t](...n) })
        },
        9653: (h, b, _) => {
          "use strict"
          _.d(b, { Z: () => Ii })
          var E = _(2272),
            S = _(8916),
            A = _(8387),
            F = _(8852),
            $ = _(6106),
            X = _(6808),
            I = (_(951), _(5005)),
            U = _(953),
            W = _(9503)
          const K =
              /\s*(!)?(\#|(name|code|desc)(\+re)?:|(re:)|)('((?:[^']+|'')*)('|$)|"((?:[^"]+|"")*)("|$)|\/(\S+?)\/([a-z]*)|\S+)(?:\s+|$)/y,
            O = /''/g,
            T = /""/g
          function j(e) {
            const t = [],
              n = [],
              l = [],
              a = []
            K.lastIndex = 0
            for (let o; (o = K.exec(e)); ) {
              let e,
                [, s, i, u = "", c, d, v, p, m, f = p, h = m, b, k = ""] = o
              if (f) {
                if (!h) throw new r("Unmatched quotes")
                e = f.replace(p ? O : T, f[0])
              } else e = v
              ;(s = !!s),
                n.push({ negative: s, prefix: i, raw: v, parsed: e }),
                "#" === i
                  ? ((e = (0, S.CW)(e).replace(/\./g, "\\.")), e && (s ? a : l).push(e))
                  : (c || d ? (k = "i") : b ? (e = b) : (f || (k = "i"), (e = (0, S.J7)(e))),
                    t.push({ negative: s, scope: u, re: new RegExp(e, k.includes("u") ? k : k + "u") }))
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
          function M({ re: e, negative: t, scope: n }) {
            return t ^ (e.test(this[n || "desc"]) || (!n && e.test(this.code)))
          }
          function D(e, t) {
            let n = 0
            for (let l = 0; l < e.length; l++) {
              const { $cache: a } = e[l]
              n += a.show = t.every(M, a)
            }
            return n
          }
          const V = (0, U.Kh)({
              route: W.wE,
              batch: null,
              canRenderScripts: [o, L, ""].includes(W.wE.hash),
              scripts: [],
              removedScripts: [],
              loading: !1,
              needRefresh: !1,
              sync: [],
              title: null,
            }),
            B = "include",
            N = "match",
            z = "exclude",
            H = "excludeMatch",
            Q = "description",
            P = "downloadURL",
            Y = "homepageURL",
            J = "icon",
            q = "name",
            G = "origExclude",
            Z = "origExcludeMatch",
            ee = "origInclude",
            te = "origMatch",
            ne = "storageSize",
            le = "updateURL",
            ae = "toggle-on",
            oe = "toggle-off"
          let se
          function ie(e) {
            var t
            ;(se = null == (t = e.find(([, e]) => "save" === e)) ? void 0 : t[0]),
              se || ((se = "Ctrl-S"), e.unshift([se, "save"]))
          }
          function ue(e, t) {
            return (0, S.dr)("MarkRemoved", { id: e.props.id, removed: t })
          }
          async function re(e, ...t) {
            try {
              await (V.batch = e(...t) || !0)
            } finally {
              V.batch = !1
            }
          }
          function ce(e) {
            location.hash = e || ""
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
          var ve = _(641),
            pe = _(4526),
            me = _(7119),
            fe = _(3751),
            he = _(6836),
            be = _(5329),
            ke = _(6650),
            ge = _(1284),
            Ce = _(9773),
            ye = _(6041),
            xe = _(317)
          const Re = ".script",
            Le = 50,
            we = 20,
            _e = 16,
            Ee = 500,
            Se = X.CI
              ? { start: "touchstart", move: "touchmove", end: "touchend" }
              : { start: "dragstart", move: "mousemove", end: "mouseup" },
            Ae = X.CI && c.assign(document.createElement("div"), { className: "dragging-noscroll" }),
            Fe = ["scroll", "mouseenter", "mouseleave"]
          let $e, Xe, Ie, Ue, We, Ke, Oe, Te, je, Me, De, Ve, Be, Ne, ze, He, Qe, Pe
          function Ye(e, t, n) {
            const l = n ? v : p
            ;(De = e),
              (Ve = t),
              k(l, De, Se.start, X.CI ? Ze : nt),
              X.CI || (k(l, De, "dblclick", Je, !0), k(l, De, "mousedown", qe, !0), n || Ge())
          }
          function Je(e) {
            const t = getSelection(),
              n = e.target.closest(".script-name")
            n && (t.removeAllRanges(), t.selectAllChildren(n))
          }
          function qe(e) {
            !e.altKey && vt(e) && (Me.draggable = !0), k(v, De, "mouseup", Ge, !0)
          }
          function Ge() {
            Me && (Me.draggable = !1), k(p, De, "mouseup", Ge, !0)
          }
          function Ze(e) {
            vt(e) && ((Ke = e), (Oe = setTimeout(et, Ee, "timer")), v(Se.move, et), v(Se.end, tt))
          }
          function et(e) {
            tt(), "timer" === e && (k(nt, Me, Ke), g && st() && ((De.scrollTop += 1), (De.scrollTop -= 1)))
          }
          function tt() {
            clearTimeout(Oe), p(Se.move, et), p(Se.end, tt)
          }
          function nt(e) {
            var t
            if (!vt(e)) return
            e.cancelable && e.preventDefault()
            const { clientX: n, clientY: l } = (null == (t = e.touches) ? void 0 : t[0]) || e,
              a = Me.getBoundingClientRect(),
              o = De.getBoundingClientRect()
            ;($e = Me.cloneNode(!0)),
              (Xe = k([].filter, De.children, (e) => "none" !== e.style.display)),
              (Ue = Xe.indexOf(Me)),
              (We = Ue),
              Xe.splice(Ue, 1),
              (Ie = a.height),
              (Te = n - a.left),
              (je = l - a.top),
              (Be = o.top + Le),
              (Ne = o.bottom - Le),
              (Pe = {}),
              Me.classList.add("dragging-placeholder"),
              $e.classList.add("dragging"),
              ($e.style.transform = `translate(${a.left}px, ${a.top}px)`),
              ($e.style.width = `${a.width}px`),
              De.appendChild($e),
              X.CI && De.insertAdjacentElement("afterBegin", Ae),
              v(Se.move, lt),
              v(Se.end, at)
          }
          function lt(e) {
            var t
            const { clientX: n, clientY: l, target: a } = (null == (t = e.touches) ? void 0 : t[0]) || e
            let o
            const s = X.CI ? dt(n, l) : null == a.closest ? void 0 : a.closest(Re)
            if (s && s !== Me) {
              const e = s.getBoundingClientRect(),
                t = l > e.top + e.height / 2
              ;(o = Me !== s[(t ? "next" : "previous") + "ElementSibling"]),
                o && (s.insertAdjacentElement(t ? "afterEnd" : "beforeBegin", Me), ot(Xe.indexOf(s) + t))
            }
            ;($e.style.transform = `translate(${n - Te}px, ${l - je}px)`), (it(l) || o) && (Pe = {})
          }
          function at() {
            p(Se.move, lt),
              p(Se.end, at),
              rt(),
              $e.remove(),
              X.CI && Ae.remove(),
              Me.classList.remove("dragging-placeholder"),
              Ve(Ue, We)
          }
          function ot(e) {
            const t = We < e ? Ie : -Ie,
              n = Xe.slice(...(We < e ? [We, e] : [e, We]))
            n.forEach((e) => {
              ;(e.style.transition = "none"), (e.style.transform = `translateY(${t}px)`)
            }),
              setTimeout(() =>
                n.forEach(({ style: e }) => {
                  e.removeProperty("transition"), e.removeProperty("transform")
                })
              ),
              (We = e)
          }
          function st() {
            return De.scrollHeight > De.clientHeight
          }
          function it(e) {
            const t = st() && Math.min(1, Math.max(0, e - Ne, Be - e) / Le)
            return (
              !t && ze && rt(),
              t && !ze && ((ze = setInterval(ut, _e)), Fe.forEach((e) => v(e, ct, !0))),
              (He = t && (e > Ne ? 1 : -1) * ((1 + t * we) | 0)),
              (Qe = f.now()),
              !!t
            )
          }
          function ut() {
            const e = f.now(),
              t = (He * (e - Qe)) / _e
            ;(De.scrollTop += t), (Qe = e)
          }
          function rt() {
            Fe.forEach((e) => p(e, ct, !0)), ze && clearInterval(ze), (ze = 0)
          }
          function ct(e) {
            e.stopPropagation()
          }
          function dt(e, t) {
            var n
            const l = `${e}:${t}`
            return Pe[l] || (Pe[l] = null == (n = document.elementFromPoint(e, t)) ? void 0 : n.closest(Re))
          }
          function vt(e) {
            return (Me = e.target.closest(Re)), Me
          }
          const pt = ["tabIndex"],
            mt = { class: "script-icon hidden-xs" },
            ft = ["href", "data-hotkey"],
            ht = ["src", "data-no-icon"],
            bt = { class: "script-info-1 ellipsis" },
            kt = ["textContent", "data-order"],
            gt = { key: 0, class: "script-tags" },
            Ct = ["textContent", "onClick", "data-tag"],
            yt = (0, ve.Lk)("a", null, "...", -1),
            xt = ["textContent", "onClick", "data-tag"],
            Rt = { class: "script-info flex ml-1c" },
            Lt = ["href", "textContent", "tabIndex"],
            wt = ["textContent"],
            _t = ["textContent"],
            Et = { class: "script-buttons script-buttons-left" },
            St = ["href", "data-hotkey", "tabIndex"],
            At = ["data-hotkey", "tabIndex"],
            Ft = ["data-hotkey", "tabIndex"],
            $t = (0, ve.Lk)("span", { class: "sep" }, null, -1),
            Xt = ["tabIndex"],
            It = ["href", "tabIndex"],
            Ut = ["textContent", "title"],
            Wt = { class: "script-buttons script-buttons-right" },
            Kt = ["data-hotkey", "tabIndex"],
            Ot = ["data-hotkey", "tabIndex"],
            Tt = (e) => me.vW.setContext("scriptFocus", e),
            jt = {
              __name: "script-item",
              props: ["script", "visible", "viewTable", "focused", "hotkeys", "showHotkeys", "activeTags"],
              emits: ["clickTag", "remove", "restore", "scrollDelta", "toggle", "update"],
              setup(e, { emit: t }) {
                const n = e,
                  l = t,
                  a = (0, U.KR)(),
                  s = (0, U.KR)(n.visible),
                  i = (0, ve.EW)(() => n.script.config.enabled),
                  r = (0, ve.EW)(() => n.script.config.removed),
                  c = (0, ve.EW)(() => V.route.paths[0] === L),
                  d = (0, ve.EW)(() => {
                    const e = n.script.meta.author
                    if (!e) return
                    const t = e.match(/^(.*?)\s<(\S*?@\S*?)>$/)
                    return { email: t && t[2], name: t ? t[1] : e }
                  }),
                  v = (0, ve.EW)(() => n.script.$canUpdate),
                  p = (0, ve.EW)(() => n.script.custom[Q] || (0, S.ak)(n.script.meta, Q)),
                  m = (0, ve.EW)(() => (i.value ? (0, S.Ru)("buttonDisable") : (0, S.Ru)("buttonEnable"))),
                  f = (0, ve.EW)(() => (n.focused ? 0 : -1)),
                  h = (0, ve.EW)(() => {
                    var e
                    return (null == (e = n.script.custom.tags) ? void 0 : e.split(" ").filter(u)) || []
                  }),
                  b = (0, ve.EW)(() => {
                    const { props: e } = n.script,
                      t = (!r.value && e.lastUpdated) || e.lastModified,
                      l = t && new Date(t).toLocaleString()
                    return t
                      ? {
                          show: (0, S.fU)(Date.now() - t),
                          title: r.value ? (0, S.Ru)("labelRemovedAt", l) : (0, S.Ru)("labelLastUpdatedAt", l),
                        }
                      : {}
                  }),
                  k = (0, ve.EW)(() => `#${r.value ? L : o}/${n.script.props.id}\n`),
                  g = (0, ve.EW)(() => ({
                    home: [(0, S.Ru)("buttonHome"), (0, S.nS)(n.script)],
                    question: [(0, S.Ru)("buttonSupport"), (0, S.wp)(n.script)],
                  })),
                  C = (e) => l(e, n.script),
                  y = () => C("remove"),
                  x = () => C("restore"),
                  R = (e) => l("clickTag", e),
                  w = () => C("toggle"),
                  _ = async () => {
                    ;(-1 !== n.script.$canUpdate || (await (0, X.$T)((0, S.Ru)("confirmManualUpdate")))) && C("update")
                  }
                return (
                  (0, ve.wB)(
                    () => n.visible,
                    (e) => {
                      e && (s.value = !0)
                    }
                  ),
                  (0, ve.wB)(
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
                          (0, me.Xy)((0, X.bq)()) || n.focus({ preventScroll: !0 }),
                          l("scrollDelta", a)
                      }
                    }
                  ),
                  (t, n) => (
                    (0, ve.uX)(),
                    (0, ve.CE)(
                      "div",
                      {
                        ref_key: "$root",
                        ref: a,
                        class: (0, pe.C4)([
                          "script",
                          {
                            disabled: !i.value,
                            removed: r.value,
                            error: e.script.error,
                            focused: e.focused,
                            hotkeys: e.focused && e.showHotkeys,
                          },
                        ]),
                        tabIndex: f.value,
                        onFocus: n[1] || (n[1] = (e) => Tt(!0)),
                        onBlur: n[2] || (n[2] = (e) => Tt(!1)),
                      },
                      [
                        (0, ve.Lk)("div", mt, [
                          (0, ve.Lk)(
                            "a",
                            { href: k.value, "data-hotkey": e.hotkeys.edit, "data-hotkey-table": "", tabIndex: "-1" },
                            [
                              (0, ve.Lk)(
                                "img",
                                { src: e.script.safeIcon, "data-no-icon": e.script.noIcon },
                                null,
                                8,
                                ht
                              ),
                            ],
                            8,
                            ft
                          ),
                        ]),
                        (0, ve.Lk)("div", bt, [
                          (0, ve.Lk)(
                            "a",
                            (0, ve.v6)(
                              { textContent: (0, pe.v_)(e.script.$cache.name) },
                              e.viewTable && { draggable: !1, href: k.value, tabIndex: f.value },
                              { "data-order": r.value ? null : e.script.props.position, class: "script-name ellipsis" }
                            ),
                            null,
                            16,
                            kt
                          ),
                          s.value
                            ? ((0, ve.uX)(),
                              (0, ve.CE)("div", gt, [
                                ((0, ve.uX)(!0),
                                (0, ve.CE)(
                                  ve.FK,
                                  null,
                                  (0, ve.pI)(h.value.slice(0, 2), (t, n) => {
                                    var l
                                    return (
                                      (0, ve.uX)(),
                                      (0, ve.CE)(
                                        "a",
                                        {
                                          key: n,
                                          textContent: (0, pe.v_)(`#${t}`),
                                          onClick: (0, fe.D$)((e) => R(t), ["prevent"]),
                                          class: (0, pe.C4)({
                                            active: null == (l = e.activeTags) ? void 0 : l.includes(t),
                                          }),
                                          "data-tag": t,
                                        },
                                        null,
                                        10,
                                        Ct
                                      )
                                    )
                                  }),
                                  128
                                )),
                                h.value.length > 2
                                  ? ((0, ve.uX)(),
                                    (0, ve.Wv)(
                                      (0, U.R1)(ge.A),
                                      { key: 0 },
                                      {
                                        content: (0, ve.k6)(() => [
                                          ((0, ve.uX)(!0),
                                          (0, ve.CE)(
                                            ve.FK,
                                            null,
                                            (0, ve.pI)(h.value.slice(2), (t, n) => {
                                              var l
                                              return (
                                                (0, ve.uX)(),
                                                (0, ve.CE)(
                                                  "a",
                                                  {
                                                    key: n,
                                                    class: (0, pe.C4)([
                                                      "dropdown-menu-item",
                                                      { active: null == (l = e.activeTags) ? void 0 : l.includes(t) },
                                                    ]),
                                                    textContent: (0, pe.v_)(`#${t}`),
                                                    onClick: (0, fe.D$)((e) => R(t), ["prevent"]),
                                                    "data-tag": t,
                                                  },
                                                  null,
                                                  10,
                                                  xt
                                                )
                                              )
                                            }),
                                            128
                                          )),
                                        ]),
                                        default: (0, ve.k6)(() => [yt]),
                                        _: 1,
                                      }
                                    ))
                                  : (0, ve.Q3)("", !0),
                              ]))
                            : (0, ve.Q3)("", !0),
                        ]),
                        (0, ve.Lk)("div", Rt, [
                          s.value
                            ? ((0, ve.uX)(),
                              (0, ve.CE)(
                                ve.FK,
                                { key: 0 },
                                [
                                  d.value
                                    ? ((0, ve.uX)(),
                                      (0, ve.Wv)(
                                        (0, U.R1)(Ce.A),
                                        {
                                          key: 0,
                                          content: (0, U.R1)(S.Ru)("labelAuthor") + e.script.meta.author,
                                          class: "script-author ml-1c hidden-sm",
                                          align: "end",
                                        },
                                        {
                                          default: (0, ve.k6)(() => [
                                            (0, ve.bF)((0, U.R1)(xe.A), { name: "author" }),
                                            d.value.email
                                              ? ((0, ve.uX)(),
                                                (0, ve.CE)(
                                                  "a",
                                                  {
                                                    key: 0,
                                                    class: "ellipsis",
                                                    href: `mailto:${d.value.email}`,
                                                    textContent: (0, pe.v_)(d.value.name),
                                                    tabIndex: f.value,
                                                  },
                                                  null,
                                                  8,
                                                  Lt
                                                ))
                                              : ((0, ve.uX)(),
                                                (0, ve.CE)(
                                                  "span",
                                                  { key: 1, class: "ellipsis", textContent: (0, pe.v_)(d.value.name) },
                                                  null,
                                                  8,
                                                  wt
                                                )),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, ve.Q3)("", !0),
                                  (0, ve.Lk)(
                                    "span",
                                    { class: "version ellipsis", textContent: (0, pe.v_)(e.script.meta.version) },
                                    null,
                                    8,
                                    _t
                                  ),
                                  r.value
                                    ? (0, ve.Q3)("", !0)
                                    : ((0, ve.uX)(),
                                      (0, ve.Wv)(
                                        (0, U.R1)(Ce.A),
                                        {
                                          key: 1,
                                          class: "size hidden-sm",
                                          content: e.script.$cache.sizes,
                                          align: "end",
                                        },
                                        {
                                          default: (0, ve.k6)(() => [(0, ve.eW)((0, pe.v_)(e.script.$cache.size), 1)]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      )),
                                  (0, ve.bF)(
                                    (0, U.R1)(Ce.A),
                                    { class: "updated hidden-sm ml-1c", content: b.value.title, align: "end" },
                                    { default: (0, ve.k6)(() => [(0, ve.eW)((0, pe.v_)(b.value.show), 1)]), _: 1 },
                                    8,
                                    ["content"]
                                  ),
                                ],
                                64
                              ))
                            : (0, ve.Q3)("", !0),
                        ]),
                        (0, ve.Lk)("div", Et, [
                          s.value
                            ? ((0, ve.uX)(),
                              (0, ve.CE)(
                                ve.FK,
                                { key: 0 },
                                [
                                  (0, ve.bF)(
                                    (0, U.R1)(Ce.A),
                                    { content: (0, U.R1)(S.Ru)("buttonEdit"), align: "start" },
                                    {
                                      default: (0, ve.k6)(() => [
                                        (0, ve.Lk)(
                                          "a",
                                          {
                                            class: "btn-ghost",
                                            href: k.value,
                                            "data-hotkey": e.hotkeys.edit,
                                            tabIndex: f.value,
                                          },
                                          [(0, ve.bF)((0, U.R1)(xe.A), { name: "code" })],
                                          8,
                                          St
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["content"]
                                  ),
                                  r.value
                                    ? (0, ve.Q3)("", !0)
                                    : ((0, ve.uX)(),
                                      (0, ve.CE)(
                                        ve.FK,
                                        { key: 0 },
                                        [
                                          (0, ve.bF)(
                                            (0, U.R1)(Ce.A),
                                            { content: m.value, align: "start" },
                                            {
                                              default: (0, ve.k6)(() => [
                                                (0, ve.Lk)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    onClick: w,
                                                    "data-hotkey": e.hotkeys.toggle,
                                                    tabIndex: f.value,
                                                  },
                                                  [
                                                    (0, ve.bF)(
                                                      (0, U.R1)(xe.A),
                                                      { name: i.value ? (0, U.R1)(ae) : (0, U.R1)(oe) },
                                                      null,
                                                      8,
                                                      ["name"]
                                                    ),
                                                  ],
                                                  8,
                                                  At
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                          (0, ve.bF)(
                                            (0, U.R1)(Ce.A),
                                            {
                                              disabled: !v.value || e.script.checking,
                                              content: (0, U.R1)(S.Ru)("updateScript"),
                                              align: "start",
                                            },
                                            {
                                              default: (0, ve.k6)(() => [
                                                (0, ve.Lk)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    onClick: _,
                                                    "data-hotkey": e.hotkeys.update,
                                                    tabIndex: v.value ? f.value : -1,
                                                  },
                                                  [
                                                    (0, ve.bF)(
                                                      (0, U.R1)(xe.A),
                                                      { name: "refresh", "^invert": -1 === v.value ? "" : null },
                                                      null,
                                                      8,
                                                      ["^invert"]
                                                    ),
                                                  ],
                                                  8,
                                                  Ft
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
                                  $t,
                                  (0, ve.bF)(
                                    (0, U.R1)(Ce.A),
                                    { disabled: !p.value, content: p.value, align: "start" },
                                    {
                                      default: (0, ve.k6)(() => [
                                        (0, ve.Lk)(
                                          "a",
                                          {
                                            class: "btn-ghost",
                                            tabIndex: p.value ? f.value : -1,
                                            onClick: n[0] || (n[0] = (e) => (0, U.R1)(me.iP)(e.target)),
                                          },
                                          [(0, ve.bF)((0, U.R1)(xe.A), { name: "info" })],
                                          8,
                                          Xt
                                        ),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["disabled", "content"]
                                  ),
                                  ((0, ve.uX)(!0),
                                  (0, ve.CE)(
                                    ve.FK,
                                    null,
                                    (0, ve.pI)(
                                      g.value,
                                      ([e, t], n) => (
                                        (0, ve.uX)(),
                                        (0, ve.Wv)(
                                          (0, U.R1)(Ce.A),
                                          { key: n, disabled: !t, content: e, align: "start" },
                                          {
                                            default: (0, ve.k6)(() => [
                                              (0, ve.Lk)(
                                                "a",
                                                (0, ve.v6)({ class: "btn-ghost", ref_for: !0 }, (0, U.R1)(X.YY), {
                                                  href: t,
                                                  tabIndex: t ? f.value : -1,
                                                }),
                                                [(0, ve.bF)((0, U.R1)(xe.A), { name: n }, null, 8, ["name"])],
                                                16,
                                                It
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
                                    ? ((0, ve.uX)(),
                                      (0, ve.CE)(
                                        "div",
                                        {
                                          key: 1,
                                          class: "script-message",
                                          textContent: (0, pe.v_)(e.script.message),
                                          title: e.script.error,
                                        },
                                        null,
                                        8,
                                        Ut
                                      ))
                                    : (0, ve.Q3)("", !0),
                                ],
                                64
                              ))
                            : (0, ve.Q3)("", !0),
                        ]),
                        (0, ve.Lk)("div", Wt, [
                          s.value
                            ? ((0, ve.uX)(),
                              (0, ve.CE)(
                                ve.FK,
                                { key: 0 },
                                [
                                  c.value || !r.value
                                    ? ((0, ve.uX)(),
                                      (0, ve.Wv)(
                                        (0, U.R1)(Ce.A),
                                        { key: 0, content: (0, U.R1)(S.Ru)("buttonRemove"), align: "end" },
                                        {
                                          default: (0, ve.k6)(() => [
                                            (0, ve.Lk)(
                                              "a",
                                              {
                                                class: (0, pe.C4)(["btn-ghost", { "btn-danger": r.value }]),
                                                onClick: y,
                                                "data-hotkey": e.hotkeys.remove,
                                                tabIndex: f.value,
                                              },
                                              [(0, ve.bF)((0, U.R1)(xe.A), { name: "trash" })],
                                              10,
                                              Kt
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, ve.Q3)("", !0),
                                  r.value
                                    ? ((0, ve.uX)(),
                                      (0, ve.Wv)(
                                        (0, U.R1)(Ce.A),
                                        { key: 1, content: (0, U.R1)(S.Ru)("buttonRestore"), placement: "left" },
                                        {
                                          default: (0, ve.k6)(() => [
                                            (0, ve.Lk)(
                                              "a",
                                              {
                                                class: "btn-ghost",
                                                onClick: x,
                                                "data-hotkey": e.hotkeys.restore,
                                                tabIndex: f.value,
                                              },
                                              [(0, ve.bF)((0, U.R1)(xe.A), { name: "undo" })],
                                              8,
                                              Ot
                                            ),
                                          ]),
                                          _: 1,
                                        },
                                        8,
                                        ["content"]
                                      ))
                                    : (0, ve.Q3)("", !0),
                                ],
                                64
                              ))
                            : (0, ve.Q3)("", !0),
                        ]),
                      ],
                      42,
                      pt
                    )
                  )
                )
              },
            }
          var Mt = _(8634),
            Dt = _(4856),
            Vt = _(4295),
            Bt = _(618)
          const Nt = { class: "form-group condensed" },
            zt = ["textContent"],
            Ht = ["textContent"],
            Qt = ["textContent"],
            Pt = ["disabled"],
            Yt = ["textContent"],
            Jt = ["textContent"],
            qt = {
              __name: "settings-update",
              props: { script: c },
              setup(e) {
                const t = e,
                  n = (0, ve.EW)(() => t.script.config),
                  l = (0, ve.EW)(() => !t.script._remote)
                return (e, t) => (
                  (0, ve.uX)(),
                  (0, ve.CE)("div", null, [
                    (0, ve.Lk)("div", Nt, [
                      (0, ve.Lk)("label", null, [
                        (0, ve.bo)(
                          (0, ve.Lk)(
                            "input",
                            (0, ve.v6)(
                              {
                                type: "checkbox",
                                "onUpdate:modelValue": t[0] || (t[0] = (e) => (n.value.shouldUpdate = e)),
                              },
                              { disabled: l.value }
                            ),
                            null,
                            16
                          ),
                          [[fe.lH, n.value.shouldUpdate]]
                        ),
                        (0, ve.Lk)("span", { textContent: (0, pe.v_)(e.i18n("labelAllowUpdate")) }, null, 8, zt),
                        (0, ve.Lk)(
                          "span",
                          { textContent: (0, pe.v_)(e.i18n("labelNotifyThisUpdated")), class: "melt" },
                          null,
                          8,
                          Ht
                        ),
                      ]),
                      ((0, ve.uX)(!0),
                      (0, ve.CE)(
                        ve.FK,
                        null,
                        (0, ve.pI)(
                          [
                            [e.i18n("genericOn"), "1"],
                            [e.i18n("genericOff"), "0"],
                            [e.i18n("genericUseGlobal"), ""],
                          ],
                          ([e, a]) => (
                            (0, ve.uX)(),
                            (0, ve.CE)("label", { class: "ml-1 melt", key: a }, [
                              (0, ve.bo)(
                                (0, ve.Lk)(
                                  "input",
                                  (0, ve.v6)(
                                    { type: "radio", ref_for: !0 },
                                    { value: a, disabled: l.value },
                                    { "onUpdate:modelValue": t[1] || (t[1] = (e) => (n.value.notifyUpdates = e)) }
                                  ),
                                  null,
                                  16
                                ),
                                [[fe.XL, n.value.notifyUpdates]]
                              ),
                              (0, ve.eW)(),
                              (0, ve.Lk)("span", { textContent: (0, pe.v_)(e) }, null, 8, Qt),
                            ])
                          )
                        ),
                        128
                      )),
                    ]),
                    (0, ve.Lk)("label", null, [
                      (0, ve.bo)(
                        (0, ve.Lk)(
                          "input",
                          {
                            type: "checkbox",
                            "onUpdate:modelValue": t[2] || (t[2] = (e) => (n.value._editable = e)),
                            class: "scary-switch",
                            disabled: l.value || !n.value.shouldUpdate,
                          },
                          null,
                          8,
                          Pt
                        ),
                        [[fe.lH, n.value._editable]]
                      ),
                      (0, ve.Lk)("span", { textContent: (0, pe.v_)(e.i18n("readonlyOpt")) }, null, 8, Yt),
                      (0, ve.eW)(),
                      (0, ve.Lk)("span", { textContent: (0, pe.v_)(e.i18n("readonlyOptWarn")) }, null, 8, Jt),
                    ]),
                  ])
                )
              },
            },
            Gt = { class: "edit-settings" },
            Zt = ["textContent"],
            en = { class: "mb-2" },
            tn = ["textContent"],
            nn = ["textContent"],
            ln = ["disabled"],
            an = ["textContent"],
            on = (0, ve.Lk)("td", null, [(0, ve.Lk)("code", null, "@run-at")], -1),
            sn = ["textContent"],
            un = ["disabled"],
            rn = ["textContent"],
            cn = (0, ve.Lk)("option", { value: "document-start" }, "document-start", -1),
            dn = (0, ve.Lk)("option", { value: "document-body" }, "document-body", -1),
            vn = (0, ve.Lk)("option", { value: "document-end" }, "document-end", -1),
            pn = (0, ve.Lk)("option", { value: "document-idle" }, "document-idle", -1),
            mn = (0, ve.Lk)(
              "td",
              null,
              [
                (0, ve.Lk)("code", null, [
                  (0, ve.eW)("@"),
                  (0, ve.Lk)("s", { style: { color: "var(--fill-6)" } }, "no"),
                  (0, ve.eW)("frames"),
                ]),
              ],
              -1
            ),
            fn = ["textContent"],
            hn = ["disabled"],
            bn = ["textContent"],
            kn = ["textContent"],
            gn = ["textContent"],
            Cn = (0, ve.Lk)("td", null, [(0, ve.Lk)("code", null, "@inject-into")], -1),
            yn = ["textContent"],
            xn = ["disabled"],
            Rn = ["textContent"],
            Ln = ["textContent"],
            wn = ["textContent"],
            _n = ["textContent"],
            En = ["onUpdate:modelValue", "placeholder", "disabled"],
            Sn = ["textContent"],
            An = ["textContent"],
            Fn = ["textContent"],
            $n = ["onUpdate:modelValue", "disabled"],
            Xn = ["textContent"],
            In = ["onUpdate:modelValue", "rows", "disabled"],
            Un = {
              __name: "settings",
              props: { script: c, readOnly: u },
              setup(e) {
                const t = e,
                  n = (0, U.IJ)(Bt.FB),
                  l = (e) => {
                    var t
                    return (null == (t = e.match(/^(.*?)(@[-a-z]+)(.*)/)) ? void 0 : t.slice(1)) || [e, "", ""]
                  },
                  a = (0, ve.EW)(() => t.script.config),
                  o = (0, ve.EW)(() => t.script.custom),
                  s = (0, ve.EW)(() => {
                    const { script: e } = t,
                      { meta: n } = e
                    return {
                      ...(0, be.je)(n, [J, q]),
                      [Y]: (0, S.nS)(e),
                      [le]: n[le] || (0, S.Ru)("hintUseDownloadURL"),
                      [P]: n[P] || e.custom.lastInstallURL,
                    }
                  }),
                  i = [
                    [q, (0, S.Ru)("labelName")],
                    [Y, (0, S.Ru)("labelHomepageURL")],
                    [le, (0, S.Ru)("labelUpdateURL")],
                    [P, (0, S.Ru)("labelDownloadURL")],
                    [J, (0, S.Ru)("labelIconURL")],
                  ],
                  u = [
                    [B, ee, ...l((0, S.Ru)("labelInclude"))],
                    [N, te, ...l((0, S.Ru)("labelMatch"))],
                    [z, G, ...l((0, S.Ru)("labelExclude"))],
                    [H, Z, ...l((0, S.Ru)("labelExcludeMatch"))],
                  ]
                return (t, l) => (
                  (0, ve.uX)(),
                  (0, ve.CE)("div", Gt, [
                    (0, ve.Lk)("h4", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("editLabelSettings")) }, null, 8, Zt),
                    (0, ve.Lk)("div", en, [
                      (0, ve.Lk)("label", null, [
                        (0, ve.bo)(
                          (0, ve.Lk)(
                            "input",
                            { type: "checkbox", "onUpdate:modelValue": l[0] || (l[0] = (e) => (a.value.enabled = e)) },
                            null,
                            512
                          ),
                          [[fe.lH, a.value.enabled]]
                        ),
                        (0, ve.Lk)("span", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("buttonEnable")) }, null, 8, tn),
                      ]),
                    ]),
                    (0, ve.bF)((0, U.R1)(qt), (0, pe._B)((0, ve.Ng)({ script: e.script })), null, 16),
                    (0, ve.Lk)("table", null, [
                      (0, ve.Lk)("tr", null, [
                        (0, ve.Lk)("td", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelTags")) }, null, 8, nn),
                        (0, ve.Lk)("td", null, [
                          (0, ve.bo)(
                            (0, ve.Lk)(
                              "input",
                              {
                                type: "text",
                                "onUpdate:modelValue": l[1] || (l[1] = (e) => (o.value.tags = e)),
                                disabled: e.readOnly,
                              },
                              null,
                              8,
                              ln
                            ),
                            [[fe.Jo, o.value.tags]]
                          ),
                        ]),
                      ]),
                    ]),
                    (0, ve.Lk)("h4", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("editLabelMeta")) }, null, 8, an),
                    (0, ve.Lk)("table", null, [
                      (0, ve.Lk)("tr", null, [
                        on,
                        (0, ve.Lk)("td", null, [
                          (0, ve.Lk)("p", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelRunAt")) }, null, 8, sn),
                        ]),
                        (0, ve.Lk)("td", null, [
                          (0, ve.bo)(
                            (0, ve.Lk)(
                              "select",
                              {
                                "onUpdate:modelValue": l[2] || (l[2] = (e) => (o.value.runAt = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, ve.Lk)(
                                  "option",
                                  { value: "", textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  rn
                                ),
                                cn,
                                dn,
                                vn,
                                pn,
                              ],
                              8,
                              un
                            ),
                            [[fe.u1, o.value.runAt]]
                          ),
                        ]),
                      ]),
                      (0, ve.Lk)("tr", null, [
                        mn,
                        (0, ve.Lk)("td", null, [
                          (0, ve.Lk)("p", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelNoFrames")) }, null, 8, fn),
                        ]),
                        (0, ve.Lk)("td", null, [
                          (0, ve.bo)(
                            (0, ve.Lk)(
                              "select",
                              {
                                "onUpdate:modelValue": l[3] || (l[3] = (e) => (o.value.noframes = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, ve.Lk)(
                                  "option",
                                  { value: "", textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  bn
                                ),
                                (0, ve.Lk)(
                                  "option",
                                  { value: "0", textContent: (0, pe.v_)((0, U.R1)(S.Ru)("genericOn")) },
                                  null,
                                  8,
                                  kn
                                ),
                                (0, ve.Lk)(
                                  "option",
                                  { value: "1", textContent: (0, pe.v_)((0, U.R1)(S.Ru)("genericOff")) },
                                  null,
                                  8,
                                  gn
                                ),
                              ],
                              8,
                              hn
                            ),
                            [[fe.u1, o.value.noframes]]
                          ),
                        ]),
                      ]),
                      (0, ve.Lk)("tr", null, [
                        Cn,
                        (0, ve.Lk)("td", null, [
                          (0, ve.Lk)(
                            "p",
                            { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelInjectionMode")) },
                            null,
                            8,
                            yn
                          ),
                        ]),
                        (0, ve.Lk)("td", null, [
                          (0, ve.bo)(
                            (0, ve.Lk)(
                              "select",
                              {
                                "onUpdate:modelValue": l[4] || (l[4] = (e) => (o.value.injectInto = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, ve.Lk)(
                                  "option",
                                  { value: "", textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Rn
                                ),
                                ((0, ve.uX)(!0),
                                (0, ve.CE)(
                                  ve.FK,
                                  null,
                                  (0, ve.pI)(
                                    n.value,
                                    (e, t) => (
                                      (0, ve.uX)(),
                                      (0, ve.CE)("option", { key: t, textContent: (0, pe.v_)(t) }, null, 8, Ln)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              xn
                            ),
                            [[fe.u1, o.value.injectInto]]
                          ),
                        ]),
                      ]),
                      ((0, ve.uX)(),
                      (0, ve.CE)(
                        ve.FK,
                        null,
                        (0, ve.pI)(i, ([t, n]) =>
                          (0, ve.Lk)("tr", { key: t }, [
                            (0, ve.Lk)("td", null, [
                              (0, ve.Lk)("code", { textContent: (0, pe.v_)(`@${t}`) }, null, 8, wn),
                            ]),
                            (0, ve.Lk)("td", null, [(0, ve.Lk)("p", { textContent: (0, pe.v_)(n) }, null, 8, _n)]),
                            (0, ve.Lk)("td", null, [
                              (0, ve.bo)(
                                (0, ve.Lk)(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": (e) => (o.value[t] = e),
                                    placeholder: s.value[t],
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  En
                                ),
                                [[fe.Jo, o.value[t]]]
                              ),
                            ]),
                          ])
                        ),
                        64
                      )),
                    ]),
                    (0, ve.Lk)("table", null, [
                      ((0, ve.uX)(),
                      (0, ve.CE)(
                        ve.FK,
                        null,
                        (0, ve.pI)(u, ([n, l, a, s, i]) =>
                          (0, ve.Lk)("tr", { key: n }, [
                            (0, ve.Lk)("td", null, [
                              (0, ve.Lk)("p", null, [
                                (0, ve.Lk)("span", { textContent: (0, pe.v_)(a) }, null, 8, Sn),
                                (0, ve.Lk)("code", { textContent: (0, pe.v_)(s) }, null, 8, An),
                                (0, ve.Lk)("span", { textContent: (0, pe.v_)(i) }, null, 8, Fn),
                              ]),
                              (0, ve.Lk)("label", null, [
                                (0, ve.bo)(
                                  (0, ve.Lk)(
                                    "input",
                                    {
                                      type: "checkbox",
                                      "onUpdate:modelValue": (e) => (o.value[l] = e),
                                      disabled: e.readOnly,
                                    },
                                    null,
                                    8,
                                    $n
                                  ),
                                  [[fe.lH, o.value[l]]]
                                ),
                                (0, ve.Lk)(
                                  "span",
                                  { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelKeepOriginal")) },
                                  null,
                                  8,
                                  Xn
                                ),
                              ]),
                            ]),
                            (0, ve.Lk)("td", null, [
                              (0, ve.bo)(
                                (0, ve.Lk)(
                                  "textarea",
                                  {
                                    "onUpdate:modelValue": (e) => (o.value[n] = e),
                                    spellcheck: "false",
                                    rows: t.calcRows(o.value[n]),
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  In
                                ),
                                [[fe.Jo, o.value[n]]]
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
          var Wn = _(5237),
            Kn = _.n(Wn),
            On = _(3901)
          const Tn = ["data-editing"],
            jn = { class: "flex-1 flex flex-col" },
            Mn = { class: "mb-1 flex center-items" },
            Dn = ["textContent"],
            Vn = { class: "btn-ghost", tabindex: "0" },
            Bn = (0, ve.Lk)(
              "li",
              null,
              [(0, ve.Lk)("kbd", null, "PageUp"), (0, ve.eW)(", "), (0, ve.Lk)("kbd", null, "PageDown")],
              -1
            ),
            Nn = (0, ve.Lk)(
              "li",
              null,
              [
                (0, ve.Lk)("kbd", null, "\u2191"),
                (0, ve.eW)(", "),
                (0, ve.Lk)("kbd", null, "\u2193"),
                (0, ve.eW)(", "),
                (0, ve.Lk)("kbd", null, "Tab"),
                (0, ve.eW)(", "),
                (0, ve.Lk)("kbd", null, "Shift-Tab"),
              ],
              -1
            ),
            zn = (0, ve.Lk)("kbd", null, "Enter", -1),
            Hn = { key: 0 },
            Qn = (0, ve.Lk)("kbd", null, "Ctrl-Del", -1),
            Pn = ["onKeydown"],
            Yn = ["textContent"],
            Jn = ["onKeydown", "onClick"],
            qn = { class: "ellipsis" },
            Gn = ["textContent"],
            Zn = ["textContent"],
            el = ["textContent"],
            tl = ["onClick"],
            nl = ["textContent"],
            ll = ["textContent"],
            al = ["onKeydown"],
            ol = ["onClick"],
            sl = ["textContent"],
            il = ["textContent"],
            ul = ["textContent"],
            rl = { key: 0, class: "edit-values-panel flex flex-col flex-1 mb-1c" },
            cl = { class: "control" },
            dl = ["textContent"],
            vl = { class: "flex center-items" },
            pl = ["textContent", "onClick", "title", "disabled"],
            ml = ["textContent"],
            fl = ["innerHTML"],
            hl = ["textContent"],
            bl = ["readOnly", "onKeydown"],
            kl = ["textContent"],
            gl = {
              __name: "values",
              props: { script: c, readOnly: u },
              setup(e) {
                const t = e,
                  n = (0, U.KR)(),
                  l = (0, U.KR)(),
                  a = (0, U.KR)(),
                  o = (0, U.KR)(),
                  s = (0, U.KR)(),
                  i = (0, U.KR)(),
                  u = (0, U.KR)(),
                  r = (0, U.KR)(!0),
                  d = (0, U.KR)(),
                  h = (0, U.KR)(),
                  b = (0, U.KR)(),
                  g = (0, ve.EW)(() => H(c.values(b.value), "key")),
                  C = { error: "", dirty: !1 },
                  y = (e) => (e.length > 1024 ? e.slice(0, 1024) : e),
                  x = (e) => {
                    try {
                      return JSON.stringify(JSON.parse(e), null, T)
                    } catch (t) {
                      return e
                    }
                  },
                  R = { condition: "!edit" },
                  L = (e) => me.vW.setContext("edit", "selectionEnd" in e.target),
                  _ = (0, ve.EW)(() => c.keys(h.value || {}).sort()),
                  E = (0, ve.EW)(() => Math.ceil(_.value.length / 25)),
                  A = (0, ve.EW)(() => {
                    const e = 25 * (d.value - 1),
                      t = _.value.slice(e, e + 25)
                    return (t.style = H(t)), t
                  })
                let F,
                  $,
                  I,
                  W,
                  K,
                  O,
                  T = "  "
                function j(e) {
                  ;(0, ve.dY)(() => {
                    l.value[e ? "click" : "focus"]()
                  })
                }
                function M(e) {
                  d.value = Math.max(1, Math.min(E.value, d.value + e))
                }
                function D(e, t) {
                  const n = e.length + (h.value[e] || t).length - 1
                  return n < 1e4 ? n : (0, S.Ad)(n)
                }
                function V(e, t, n) {
                  let l = h.value[e] || n
                  const a = l[0]
                  return (l = l.slice(1)), "s" === a ? (l = JSON.stringify(l)) : t || (l = x(l)), t ? y(l) : l
                }
                function B() {
                  return `{\n${T}${_.value
                    .map((e) => `${JSON.stringify(e)}: ${V(e)}`)
                    .join(",\n")
                    .replace(/\n/g, "\n" + T)}\n}`
                }
                function N(e, t) {
                  null != e || (e = {})
                  const n = h.value
                  let l
                  if (
                    (t
                      ? (k(be.ZB, n, ([t, n]) => {
                          n !== e[t] && (Y(t), (l = !0))
                        }),
                        null != l || (l = !0))
                      : (l = !(0, be.bD)(n, e)),
                    l)
                  )
                    return (h.value = e), (d.value = Math.min(d.value, E.value) || 1), z(), !0
                }
                function z() {
                  const { script: e } = t,
                    { $cache: n = (e.$cache = {}) } = e,
                    l = _.value.reduce((e, t) => e + t.length + 4 + h.value[t].length + 2, 0)
                  n[ne] = l ? l + 2 : l
                }
                function H(e, t) {
                  let n = 0
                  for (let l = 0; l < e.length; l++) {
                    const a = e[l]
                    n = Math.max(n, (t ? a[t] : a).length)
                  }
                  return { "--keyW": `${n}ch` }
                }
                async function Q({ key: e, jsonValue: n, rawValue: l = (0, S.rt)(n) || "" }, a) {
                  a && _.value.includes(e) && Y(e)
                  const { id: o } = t.script.props
                  await (0, S.dr)("UpdateValue", { [o]: { [e]: l } }, void 0, K),
                    l ? (h.value[e] = l) : delete h.value[e],
                    z()
                }
                function P() {
                  u.value = { isNew: !0, key: "", value: "", ...C }
                }
                function Y(e, t = h.value[e], n = V(e, !0), l = D(e, t)) {
                  ;(b.value || (b.value = {}))[e + Math.random()] = { key: e, rawValue: t, cut: n, len: l }
                }
                function J(e) {
                  var n
                  t.readOnly ||
                    (Q({ key: e }), Y(e), (null == (n = u.value) ? void 0 : n.key) === e && (u.value = null))
                }
                function q(e) {
                  const t = b.value,
                    n = t[e]
                  delete t[e], (0, S.Im)(t) && (b.value = null), Q(n)
                }
                function G(e) {
                  u.value = { key: e, value: V(e), ...C }
                }
                function Z() {
                  u.value = { isAll: !0, value: B(), ...C }
                }
                async function ee(e) {
                  const n = u.value
                  if ((n.jsonPaused && ((n.jsonPaused = !1), le()), n.error)) {
                    const e = n.errorPos
                    return (
                      F.setSelection(e, { line: e.line, ch: e.ch + 1 }), F.focus(), void (0, X.rG)({ text: n.error })
                    )
                  }
                  if ((1 === e ? (F.markClean(), (n.dirty = !1)) : (u.value = null), n.isAll)) {
                    const e = k(be.BJ, n.jsonValue, (e) => (0, S.rt)(e) || "")
                    await (0, S.dr)("SetValueStores", { [t.script.props.id]: e }), N(e, !0)
                  } else await Q(n, !0)
                }
                function te() {
                  const e = u.value
                  if (e.dirty) {
                    const t = F.getValue().trim(),
                      { jsonValue: n = t } = e
                    Y(e.key, (0, S.rt)(n), y(t))
                  }
                  u.value = null
                }
                function le(e) {
                  const t = u.value
                  ;(t.dirty = e), (t.error = null)
                  const n = f.now(),
                    l = F.getValue().trim()
                  try {
                    if (t.isAll && "{" !== l[0]) throw "Expected { at position 0"
                    if (t.jsonPaused) return
                    t.jsonValue = JSON.parse(l)
                  } catch (e) {
                    const n = /(position\s+)(\d+)|$/,
                      l = F.posFromIndex(+`${e}`.match(n)[2] || 0)
                    ;(t.error = `${e}`.replace(n, `$1${l.line + 1}:${l.ch + 1}`)),
                      (t.errorPos = l),
                      (t.jsonValue = void 0)
                  }
                  t.jsonPaused = f.now() - n > 10
                }
                function ae(e) {
                  Kn().keyName(e) === se && ee()
                }
                function oe(e) {
                  const t = c.values(e)[0].newValue
                  if (t) {
                    const e = u.value,
                      n = null == e ? void 0 : e.key,
                      l = e && (e.isAll ? B : V)
                    if ((N(t instanceof c ? t : (0, be.A4)(t)), e)) {
                      const t = l(n)
                      F.getValue() === t ? ((e.isNew = !1), (e.dirty = !1)) : e.dirty || ((e.value = t), le())
                    }
                  } else N(t)
                }
                function ie(e) {
                  ;(0, me.I1)(("ArrowDown" === e.key ? 1 : e.target !== l.value && -1) || 0)
                }
                return (
                  (0, ve.n)(() => {
                    var e
                    const l = n.value,
                      { id: a } = t.script.props,
                      o = (0, S.Fp)()
                    k(v, l, "focusin", L),
                      null == (e = u.value ? F : W) || e.focus(),
                      (0, S.dr)("GetValueStore", a, void 0, (K = { tab: { id: Math.random() - 2 }, [w]: 0 })).then(
                        (e) => {
                          const t = !h.value
                          N(e) && t && _.value.length && j(!0), (r.value = !1)
                        }
                      ),
                      (I = [
                        () => k(p, l, "focusin", L),
                        me.vW.register("pageup", () => M(-1), R),
                        me.vW.register("pagedown", () => M(1), R),
                        (0, he.A)("valueEditor", (e) => {
                          if ((($ = e), (T = " ".repeat((null == e ? void 0 : e.tabSize) || 2)), F && e))
                            for (const t in e) "mode" !== t && F.setOption(t, e[t])
                        }),
                      ]),
                      (O = m.runtime.connect({
                        name:
                          Bt.ev +
                          JSON.stringify({ cfg: { value: a }, id: null == o ? void 0 : o[Bt.ev](oe), tabId: K.tab.id }),
                      })),
                      o || O.onMessage.addListener(oe),
                      (i.value = !0)
                  }),
                  (0, ve.Y4)(() => {
                    var e, t
                    ;(i.value = !1),
                      null == (e = I) || e.forEach((e) => e()),
                      null == (t = O) || t.disconnect(),
                      (I = O = null)
                  }),
                  (0, ve.wB)(u, (e, t) => {
                    if (e)
                      (W = (0, X.bq)()),
                        (0, ve.dY)(() => {
                          if (((F = o.value.cm), e.isNew)) {
                            const e = a.value
                            e.setSelectionRange(0, 0), e.focus()
                          } else F.setCursor(0, 0), F.focus()
                        })
                    else if (t) {
                      var n
                      null == (n = W) || n.focus()
                    }
                  }),
                  (0, ve.wB)(d, () => {
                    ;(W = null), j()
                  }),
                  (t, c) => (
                    (0, ve.uX)(),
                    (0, ve.CE)(
                      "div",
                      { class: "edit-values flex", ref_key: "$el", ref: n, "data-editing": u.value && "" },
                      [
                        (0, ve.Lk)("div", jn, [
                          (0, ve.Lk)("nav", Mn, [
                            e.readOnly
                              ? (0, ve.Q3)("", !0)
                              : ((0, ve.uX)(),
                                (0, ve.CE)("a", { key: 0, onClick: P, class: "btn-ghost", tabindex: "0" }, [
                                  (0, ve.bF)((0, U.R1)(xe.A), { name: "plus" }),
                                ])),
                            E.value > 1
                              ? ((0, ve.uX)(),
                                (0, ve.CE)(
                                  ve.FK,
                                  { key: 1 },
                                  [
                                    (0, ve.Lk)(
                                      "a",
                                      {
                                        onClick: c[0] || (c[0] = (e) => M(-1)),
                                        class: (0, pe.C4)(["btn-ghost", { subtle: 1 === d.value }]),
                                        tabindex: "0",
                                      },
                                      "\u23f4",
                                      2
                                    ),
                                    (0, ve.bo)(
                                      (0, ve.Lk)(
                                        "input",
                                        {
                                          "onUpdate:modelValue": c[1] || (c[1] = (e) => (d.value = e)),
                                          type: "number",
                                          onWheel: c[2] || (c[2] = (e) => M(e.deltaY > 0 ? 1 : -1)),
                                        },
                                        null,
                                        544
                                      ),
                                      [[fe.Jo, d.value]]
                                    ),
                                    (0, ve.Lk)("span", { textContent: (0, pe.v_)(`\xa0/\xa0${E.value}`) }, null, 8, Dn),
                                    (0, ve.Lk)(
                                      "a",
                                      {
                                        onClick: c[3] || (c[3] = (e) => M(1)),
                                        class: (0, pe.C4)(["btn-ghost", { subtle: d.value >= E.value }]),
                                        tabindex: "0",
                                      },
                                      "\u23f5",
                                      2
                                    ),
                                  ],
                                  64
                                ))
                              : (0, ve.Q3)("", !0),
                            (0, ve.bF)((0, U.R1)(ge.A), null, {
                              content: (0, ve.k6)(() => [
                                (0, ve.Lk)("ul", null, [
                                  Bn,
                                  Nn,
                                  (0, ve.Lk)("li", null, [
                                    (0, ve.Lk)("span", null, [
                                      zn,
                                      (0, ve.eW)(": " + (0, pe.v_)(t.i18n("buttonEdit")) + ",", 1),
                                    ]),
                                  ]),
                                  e.readOnly
                                    ? (0, ve.Q3)("", !0)
                                    : ((0, ve.uX)(),
                                      (0, ve.CE)("li", Hn, [
                                        (0, ve.Lk)("span", null, [
                                          Qn,
                                          (0, ve.eW)(": " + (0, pe.v_)(t.i18n("buttonRemove")), 1),
                                        ]),
                                      ])),
                                ]),
                              ]),
                              default: (0, ve.k6)(() => [
                                (0, ve.Lk)("a", Vn, [(0, ve.bF)((0, U.R1)(xe.A), { name: "info" })]),
                              ]),
                              _: 1,
                            }),
                          ]),
                          (0, ve.Lk)(
                            "div",
                            {
                              class: "edit-values-table main",
                              style: (0, pe.Tr)(A.value.style),
                              onKeydown: [
                                (0, fe.jR)((0, fe.D$)(ie, ["exact"]), ["down"]),
                                (0, fe.jR)((0, fe.D$)(ie, ["exact"]), ["up"]),
                              ],
                            },
                            [
                              (0, ve.Lk)(
                                "a",
                                {
                                  ref_key: "$editAll",
                                  ref: l,
                                  class: "edit-values-row flex",
                                  onClick: Z,
                                  tabindex: "0",
                                  textContent: (0, pe.v_)(t.i18n("editValueAllHint")),
                                },
                                null,
                                8,
                                Yn
                              ),
                              ((0, ve.uX)(!0),
                              (0, ve.CE)(
                                ve.FK,
                                null,
                                (0, ve.pI)(
                                  A.value,
                                  (t) => (
                                    (0, ve.uX)(),
                                    (0, ve.CE)(
                                      "div",
                                      {
                                        key: t,
                                        class: "edit-values-row flex monospace-font",
                                        onKeydown: (0, fe.jR)(
                                          (0, fe.D$)((e) => J(t), ["ctrl", "exact"]),
                                          ["delete"]
                                        ),
                                        onClick: (e) => G(t),
                                      },
                                      [
                                        (0, ve.Lk)("div", qn, [
                                          (0, ve.Lk)("a", { textContent: (0, pe.v_)(t), tabindex: "0" }, null, 8, Gn),
                                        ]),
                                        (0, ve.Lk)(
                                          "div",
                                          { class: "ellipsis flex-auto", textContent: (0, pe.v_)(V(t, !0)) },
                                          null,
                                          8,
                                          Zn
                                        ),
                                        (0, ve.Lk)("pre", { textContent: (0, pe.v_)(D(t)) }, null, 8, el),
                                        e.readOnly
                                          ? (0, ve.Q3)("", !0)
                                          : ((0, ve.uX)(),
                                            (0, ve.CE)(
                                              "div",
                                              { key: 0, class: "del", onClick: (0, fe.D$)((e) => J(t), ["stop"]) },
                                              [(0, ve.bF)((0, U.R1)(xe.A), { name: "trash" })],
                                              8,
                                              tl
                                            )),
                                      ],
                                      40,
                                      Jn
                                    )
                                  )
                                ),
                                128
                              )),
                            ],
                            44,
                            Pn
                          ),
                          r.value || _.value.length
                            ? (0, ve.Q3)("", !0)
                            : ((0, ve.uX)(),
                              (0, ve.CE)(
                                "div",
                                {
                                  key: 0,
                                  class: "edit-values-empty mt-1",
                                  textContent: (0, pe.v_)(t.i18n("noValues")),
                                },
                                null,
                                8,
                                nl
                              )),
                          b.value
                            ? ((0, ve.uX)(),
                              (0, ve.CE)(
                                "h3",
                                { key: 1, textContent: (0, pe.v_)(t.i18n("headerRecycleBin")) },
                                null,
                                8,
                                ll
                              ))
                            : (0, ve.Q3)("", !0),
                          b.value
                            ? ((0, ve.uX)(),
                              (0, ve.CE)(
                                "div",
                                {
                                  key: 2,
                                  class: "edit-values-table trash monospace-font",
                                  onKeydown: [
                                    (0, fe.jR)((0, fe.D$)(ie, ["exact"]), ["down"]),
                                    (0, fe.jR)((0, fe.D$)(ie, ["exact"]), ["up"]),
                                  ],
                                  style: (0, pe.Tr)(g.value),
                                },
                                [
                                  ((0, ve.uX)(!0),
                                  (0, ve.CE)(
                                    ve.FK,
                                    null,
                                    (0, ve.pI)(
                                      b.value,
                                      ({ key: e, cut: t, len: n }, l) => (
                                        (0, ve.uX)(),
                                        (0, ve.CE)(
                                          "div",
                                          { key: l, class: "edit-values-row flex", onClick: (e) => q(l) },
                                          [
                                            (0, ve.Lk)(
                                              "a",
                                              { class: "ellipsis", textContent: (0, pe.v_)(e), tabindex: "0" },
                                              null,
                                              8,
                                              sl
                                            ),
                                            (0, ve.Lk)(
                                              "s",
                                              { class: "ellipsis flex-auto", textContent: (0, pe.v_)(t) },
                                              null,
                                              8,
                                              il
                                            ),
                                            (0, ve.Lk)("pre", { textContent: (0, pe.v_)(n) }, null, 8, ul),
                                          ],
                                          8,
                                          ol
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ],
                                44,
                                al
                              ))
                            : (0, ve.Q3)("", !0),
                        ]),
                        u.value
                          ? ((0, ve.uX)(),
                            (0, ve.CE)("div", rl, [
                              (0, ve.Lk)("div", cl, [
                                (0, ve.Lk)(
                                  "h4",
                                  {
                                    textContent: (0, pe.v_)(
                                      u.value.isAll ? t.i18n("labelEditValueAll") : t.i18n("labelEditValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  dl
                                ),
                                (0, ve.Lk)("div", vl, [
                                  (0, ve.Lk)(
                                    "a",
                                    {
                                      tabindex: "0",
                                      class: "mr-1 flex",
                                      onClick: c[4] || (c[4] = (e) => (s.value = !s.value)),
                                    },
                                    [
                                      (0, ve.bF)(
                                        (0, U.R1)(xe.A),
                                        { name: "cog", class: (0, pe.C4)({ active: s.value }) },
                                        null,
                                        8,
                                        ["class"]
                                      ),
                                    ]
                                  ),
                                  ((0, ve.uX)(!0),
                                  (0, ve.CE)(
                                    ve.FK,
                                    null,
                                    (0, ve.pI)(
                                      [t.i18n("buttonOK"), t.i18n("buttonApply")],
                                      (e, t) => (
                                        (0, ve.uX)(),
                                        (0, ve.CE)(
                                          "button",
                                          {
                                            key: e,
                                            textContent: (0, pe.v_)(e),
                                            onClick: (e) => ee(t),
                                            class: (0, pe.C4)({ "has-error": u.value.error, "save-beacon": !t }),
                                            title: u.value.error,
                                            disabled: u.value.error || !u.value.dirty,
                                          },
                                          null,
                                          10,
                                          pl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, ve.Lk)(
                                    "button",
                                    { textContent: (0, pe.v_)(t.i18n("buttonCancel")), onClick: te, title: "Esc" },
                                    null,
                                    8,
                                    ml
                                  ),
                                ]),
                              ]),
                              s.value
                                ? ((0, ve.uX)(),
                                  (0, ve.CE)(
                                    ve.FK,
                                    { key: 0 },
                                    [
                                      (0, ve.Lk)(
                                        "p",
                                        { class: "my-1", innerHTML: t.i18n("descEditorOptions") },
                                        null,
                                        8,
                                        fl
                                      ),
                                      (0, ve.bF)(
                                        (0, U.R1)(On.A),
                                        { name: "valueEditor", json: "", onDblclick: (0, U.R1)(de), "has-save": !1 },
                                        null,
                                        8,
                                        ["onDblclick"]
                                      ),
                                    ],
                                    64
                                  ))
                                : (0, ve.Q3)("", !0),
                              (0, ve.bo)(
                                (0, ve.Lk)(
                                  "label",
                                  null,
                                  [
                                    (0, ve.Lk)(
                                      "span",
                                      { textContent: (0, pe.v_)(t.i18n("valueLabelKey")) },
                                      null,
                                      8,
                                      hl
                                    ),
                                    (0, ve.bo)(
                                      (0, ve.Lk)(
                                        "input",
                                        {
                                          type: "text",
                                          "onUpdate:modelValue": c[5] || (c[5] = (e) => (u.value.key = e)),
                                          readOnly: !u.value.isNew || e.readOnly,
                                          ref_key: "$key",
                                          ref: a,
                                          spellcheck: "false",
                                          onKeydown: [ae, (0, fe.jR)((0, fe.D$)(te, ["exact", "stop"]), ["esc"])],
                                        },
                                        null,
                                        40,
                                        bl
                                      ),
                                      [[fe.Jo, u.value.key]]
                                    ),
                                  ],
                                  512
                                ),
                                [[fe.aG, !u.value.isAll]]
                              ),
                              (0, ve.Lk)("label", null, [
                                (0, ve.Lk)(
                                  "span",
                                  {
                                    textContent: (0, pe.v_)(
                                      u.value.isAll ? t.i18n("valueLabelValueAll") : t.i18n("valueLabelValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  kl
                                ),
                                (0, ve.bF)(
                                  (0, U.R1)(Mt.A),
                                  {
                                    value: u.value.value,
                                    "cm-options": (0, U.R1)($),
                                    ref_key: "$value",
                                    ref: o,
                                    class: "h-100 mt-1",
                                    mode: "application/json",
                                    readOnly: e.readOnly,
                                    onCodeDirty: le,
                                    onKeydownCapture:
                                      c[6] ||
                                      (c[6] = (0, fe.jR)(
                                        (0, fe.D$)(() => {}, ["shift", "exact", "stop"]),
                                        ["tab"]
                                      )),
                                    commands: { close: te, save: ee },
                                    active: i.value,
                                    focusme: "",
                                  },
                                  null,
                                  8,
                                  ["value", "cm-options", "readOnly", "commands", "active"]
                                ),
                              ]),
                            ]))
                          : (0, ve.Q3)("", !0),
                      ],
                      8,
                      Tn
                    )
                  )
                )
              },
            },
            Cl = gl,
            yl = { class: "edit-help mb-2c" },
            xl = ["innerHTML"],
            Rl = ["textContent"],
            Ll = { class: "keyboard" },
            wl = ["textContent"],
            _l = ["textContent"],
            El = ["textContent"],
            Sl = Bt.oO + "api/gm/",
            Al = Sl.split("://")[1],
            Fl = {
              __name: "help",
              props: { hotkeys: Array },
              setup: (e) => (t, n) => (
                (0, ve.uX)(),
                (0, ve.CE)("div", yl, [
                  (0, ve.Lk)("div", null, [
                    (0, ve.Lk)("h3", { innerHTML: t.i18n("editHelpDocumention") }, null, 8, xl),
                    (0, ve.Lk)(
                      "a",
                      (0, ve.v6)({ href: Sl }, (0, U.R1)(X.YY), { textContent: (0, pe.v_)((0, U.R1)(Al)) }),
                      null,
                      16,
                      Rl
                    ),
                  ]),
                  (0, ve.Lk)("div", Ll, [
                    (0, ve.Lk)("h3", { textContent: (0, pe.v_)(t.i18n("editHelpKeyboard")) }, null, 8, wl),
                    ((0, ve.uX)(!0),
                    (0, ve.CE)(
                      ve.FK,
                      null,
                      (0, ve.pI)(
                        e.hotkeys,
                        ([e, t]) => (
                          (0, ve.uX)(),
                          (0, ve.CE)("dl", { key: e }, [
                            (0, ve.Lk)("dt", { class: "monospace-font", textContent: (0, pe.v_)(e) }, null, 8, _l),
                            (0, ve.Lk)("dd", { textContent: (0, pe.v_)(t) }, null, 8, El),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                ])
              ),
            },
            $l = { class: "edit-header flex mr-1c" },
            Xl = ["textContent", "onClick"],
            Il = { class: "edit-name text-center ellipsis flex-1" },
            Ul = ["textContent"],
            Wl = ["textContent"],
            Kl = { key: 1, class: "edit-hint text-right ellipsis" },
            Ol = ["href", "textContent"],
            Tl = { class: "mr-1" },
            jl = ["textContent", "disabled", "title"],
            Ml = ["textContent", "disabled"],
            Dl = ["textContent"],
            Vl = { key: 0, class: "frozen-note shelf mr-2c flex flex-wrap" },
            Bl = ["textContent"],
            Nl = { key: 1, class: "shelf fatal" },
            zl = ["textContent"],
            Hl = { key: 2, class: "errors shelf my-1c" },
            Ql = ["textContent"],
            Pl = ["textContent"],
            Yl = ["href", "textContent"],
            Jl = { [q]: "", [Y]: "", [le]: "", [P]: "", [J]: "", [ee]: !0, [G]: !0, [te]: !0, [Z]: !0, tags: "" },
            ql = (e) => ("" !== e ? e : null),
            Gl = [B, N, z, H],
            Zl = (e) =>
              e.trim()
                ? e
                    .split("\n")
                    .map((e) => e.trim())
                    .filter(u)
                : null,
            ea = [l, a],
            ta = (e) => e || null,
            na = (e, t) => (e < t ? -1 : e > t),
            la = ({ shouldUpdate: e, _editable: t }) => +e && e + t,
            aa = (e, t) => {
              if (t >= 0) {
                const n = e.lastIndexOf("\n", t) + 1,
                  l = e.indexOf("\n", t)
                return e.slice(n, l > 0 ? l : void 0)
              }
            },
            oa = /#/,
            sa = {
              __name: "index",
              props: { initial: c, initialCode: String, readOnly: u },
              emits: ["close"],
              setup(t, { emit: n }) {
                let l, a, o, s, r, d
                const p = n,
                  f = t,
                  h = (0, U.KR)(),
                  b = (0, U.KR)(),
                  y = (0, U.KR)("code"),
                  x = (0, U.KR)(!1),
                  R = (0, U.KR)(),
                  L = (0, U.KR)(""),
                  w = (0, U.KR)(!1),
                  _ = { save: D, close: B },
                  E = (0, U.KR)(),
                  A = (0, U.KR)(),
                  F = (0, ve.EW)(() => {
                    let e = 0
                    const t = A.value
                    for (let n = 0; n < t.length; n++) t[n].startsWith(Bt.D7) && e++
                    return [e < t.length && `${Bt.oO}api/metadata-block/`, e && Bt.kh].filter(u)
                  }),
                  I = (0, ve.EW)(() => {
                    for (let e = 0, t = ["meta", "custom"]; e < t.length; e++) {
                      const n = t[e]
                      for (let e = 0; e < Gl.length; e++) {
                        const t = Gl[e]
                        let l = R.value[n][t]
                        if (l && (l = i(l) ? l.find(oa.test, oa) : aa(l, l.indexOf("#"))))
                          return l.length > 100 ? l.slice(0, 100) + "..." : l
                      }
                    }
                  }),
                  K = (0, U.KR)(),
                  O = (0, U.KR)(!1),
                  T = (0, U.KR)(!1),
                  j = (0, ve.EW)(() => {
                    const {
                        meta: e,
                        props: { id: t },
                        $cache: n = {},
                      } = R.value,
                      l = e.require.length && "@require",
                      a = !(0, S.Im)(e.resources) && "@resource",
                      o = n[ne]
                    return {
                      code: (0, S.Ru)("editNavCode"),
                      settings: (0, S.Ru)("editNavSettings"),
                      ...(t && { values: (0, S.Ru)("editNavValues") + (o ? ` (${(0, S.Ad)(o)})` : "") }),
                      ...((l || a) && { externals: k(S.fj, [l, a], "/") }),
                      help: "?",
                    }
                  }),
                  M = (0, ve.EW)(() => (V.title = (0, S.tj)(R.value)))
                ;(0, ve.wB)(
                  y,
                  async (e) => {
                    await (0, ve.dY)(), "code" === e ? l.focus() : (0, X.T3)(b.value.$el)
                  },
                  { immediate: !0 }
                ),
                  (0, ve.wB)(x, (e) => {
                    d(e), me.vW.setContext("canSave", e)
                  }),
                  (0, ve.wB)(w, Y),
                  (0, ve.wB)(R, (e) => {
                    const { custom: t, config: n } = e,
                      { shouldUpdate: l } = n
                    ;(n._editable = 2 === l),
                      (n.enabled = !!n.enabled),
                      (n.shouldUpdate = !!l),
                      (n.notifyUpdates = (0, S.Ds)(n.notifyUpdates)),
                      (t.noframes = (0, S.Ds)(t.noframes))
                    for (const e in Jl) null == t[e] && (t[e] = Jl[e])
                    for (let e = 0; e < ea.length; e++) {
                      const n = ea[e]
                      t[n] || (t[n] = "")
                    }
                    for (let e = 0; e < Gl.length; e++) {
                      const n = Gl[e],
                        l = t[n]
                      t[n] = l ? `${l.join("\n")}${l.length ? "\n" : ""}` : ""
                    }
                    P(), n.removed || (s = (0, be.A4)(e))
                  })
                {
                  const e = f.initial,
                    t = (L.value = f.initialCode)
                  ;(R.value = (0, be.A4)(e)),
                    (0, S.dr)("ParseMetaErrors", t).then((e) => {
                      A.value = e
                    }),
                    (0, ve.wB)(() => R.value.config, P, { deep: !0 }),
                    (0, ve.wB)(() => R.value.custom, P, { deep: !0 }),
                    (0, ve.wB)(
                      () => e.error,
                      (t) => {
                        t && (0, X.rG)({ text: `${e.message}\n\n${t}` })
                      }
                    ),
                    (0, ve.wB)(
                      () => e.config.enabled,
                      (e) => {
                        ;(R.value.config.enabled = e), s && (s.config.enabled = e)
                      }
                    )
                }
                async function D() {
                  if (!x.value) return
                  r && J()
                  const e = R.value,
                    { config: t, custom: n } = e,
                    { notifyUpdates: o } = t,
                    { noframes: s } = n
                  try {
                    var i
                    const u = e.props.id,
                      r = await (0, S.dr)("ParseScript", {
                        id: u,
                        code: a.getRealContent(),
                        config: { enabled: +t.enabled, notifyUpdates: o ? +o : null, shouldUpdate: la(t) },
                        custom: {
                          ...(0, be.je)(n, c.keys(Jl), ql),
                          ...(0, be.je)(n, Gl, Zl),
                          ...(0, be.je)(n, ea, ta),
                          noframes: s ? +s : null,
                        },
                        isNew: !u,
                        message: "",
                        bumpDate: !0,
                      }),
                      d = null == r || null == (i = r.where) ? void 0 : i.id
                    l.markClean(),
                      (w.value = !1),
                      (x.value = !1),
                      (T.value = !1),
                      (A.value = r.errors),
                      (R.value = r.update),
                      d && !u && history.replaceState(null, M.value, `${C}/${d}`),
                      (K.value = null)
                  } catch (e) {
                    K.value = e.message.split("\n")
                  }
                }
                function B(e) {
                  var t
                  e || "code" === y.value
                    ? (p("close"), g && (null == (t = (0, X.bq)()) || t.blur()))
                    : (y.value = "code")
                }
                async function N() {
                  await D(), B(!0)
                }
                function z(e) {
                  const t = c.keys(j.value)
                  y.value = t[(t.indexOf(y.value) + e + t.length) % t.length]
                }
                function H() {
                  z(-1)
                }
                function Q() {
                  z(1)
                }
                function P(e) {
                  const t = R.value,
                    { config: n } = t,
                    { removed: l } = n,
                    a = (t._remote = !!(0, S.MO)(t)) && la(n),
                    o = !(!l && 1 !== a && !f.readOnly)
                  ;(O.value = o), (T.value = !l && (o || a >= 1)), !l && e && Y()
                }
                function Y() {
                  x.value = w.value || !(0, be.bD)(R.value, s)
                }
                async function J(e) {
                  $.A.get("editorWindow") &&
                    (e || (e = (await (null == S.E1 ? void 0 : S.E1.getCurrent())) || {}),
                    "normal" === e.state &&
                      $.A.set("editorWindowPos", (0, be.je)(e, ["left", "top", "width", "height"])))
                }
                function q({ id: e, tabs: t }) {
                  if (1 === t.length) {
                    const { onBoundsChanged: t } = m.windows
                    t
                      ? t.addListener((t) => {
                          t.id === e && J(t)
                        })
                      : (v("resize", (0, S.sg)(J, 100)), (r = !0))
                  }
                }
                return (
                  (0, ve.sV)(() => {
                    var t
                    ;(a = h.value),
                      (l = a.cm),
                      (d = (0, W.PO)(null, () => l.focus())),
                      $.A.get("editorWindow") &&
                        1 === e.history.length &&
                        (null == (t = browser.windows) || t.getCurrent({ populate: !0 }).then(q))
                    const n = c.values(j.value),
                      o = (E.value = [
                        ["Alt-PageUp", ` ${n.join(" < ")}`],
                        ["Alt-PageDown", ` ${n.join(" > ")}`],
                        ...c.entries(a.expandKeyMap()).sort((e, t) => na(e[1], t[1]) || na(e[0], t[0])),
                      ])
                    se || ie(o)
                  }),
                  (0, ve.n)(() => {
                    document.body.classList.add("edit-open"),
                      (o = [
                        me.vW.register("a-pageup", H),
                        me.vW.register("a-pagedown", Q),
                        me.vW.register(se.replace(/(?:Ctrl|Cmd)-/i, "ctrlcmd-"), D),
                        me.vW.register("escape", B),
                        me.vW.register("f1", () => {
                          y.value = "help"
                        }),
                      ]),
                      (V.title = M.value)
                  }),
                  (0, ve.Y4)(() => {
                    var e
                    document.body.classList.remove("edit-open"),
                      (V.title = null),
                      d(!1),
                      null == (e = o) || e.forEach((e) => e())
                  }),
                  (e, n) => (
                    (0, ve.uX)(),
                    (0, ve.CE)(
                      "div",
                      { class: (0, pe.C4)(["edit frame flex flex-col abs-full", { frozen: O.value }]) },
                      [
                        (0, ve.Lk)("div", $l, [
                          (0, ve.Lk)("nav", null, [
                            ((0, ve.uX)(!0),
                            (0, ve.CE)(
                              ve.FK,
                              null,
                              (0, ve.pI)(
                                j.value,
                                (e, t) => (
                                  (0, ve.uX)(),
                                  (0, ve.CE)(
                                    "div",
                                    {
                                      key: t,
                                      class: (0, pe.C4)(["edit-nav-item", { active: y.value === t }]),
                                      textContent: (0, pe.v_)(e),
                                      onClick: (e) => (y.value = t),
                                    },
                                    null,
                                    10,
                                    Xl
                                  )
                                )
                              ),
                              128
                            )),
                          ]),
                          (0, ve.Lk)("div", Il, [
                            R.value.config.removed
                              ? ((0, ve.uX)(),
                                (0, ve.CE)(
                                  "span",
                                  {
                                    key: 0,
                                    class: "subtle",
                                    textContent: (0, pe.v_)((0, U.R1)(S.Ru)("headerRecycleBin") + " / "),
                                  },
                                  null,
                                  8,
                                  Ul
                                ))
                              : (0, ve.Q3)("", !0),
                            (0, ve.eW)(" " + (0, pe.v_)(M.value), 1),
                          ]),
                          O.value && "code" === y.value
                            ? ((0, ve.uX)(),
                              (0, ve.CE)(
                                "p",
                                {
                                  key: 0,
                                  textContent: (0, pe.v_)((0, U.R1)(S.Ru)("readonly")),
                                  class: "text-upper text-right text-red",
                                },
                                null,
                                8,
                                Wl
                              ))
                            : ((0, ve.uX)(),
                              (0, ve.CE)("div", Kl, [
                                (0, ve.Lk)(
                                  "a",
                                  (0, ve.v6)({ href: (0, U.R1)(X.U$) }, (0, U.R1)(X.YY), {
                                    textContent: (0, pe.v_)((0, U.R1)(S.Ru)("editHowToHint")),
                                  }),
                                  null,
                                  16,
                                  Ol
                                ),
                              ])),
                          (0, ve.Lk)("div", Tl, [
                            (0, ve.bo)(
                              (0, ve.Lk)(
                                "button",
                                {
                                  textContent: (0, pe.v_)((0, U.R1)(S.Ru)("buttonSave")),
                                  onClick: D,
                                  disabled: !x.value,
                                  class: (0, pe.C4)({ "has-error": (e.$fe = K.value || A.value) }),
                                  title: e.$fe,
                                },
                                null,
                                10,
                                jl
                              ),
                              [[fe.aG, x.value || !O.value]]
                            ),
                            (0, ve.bo)(
                              (0, ve.Lk)(
                                "button",
                                {
                                  textContent: (0, pe.v_)((0, U.R1)(S.Ru)("buttonSaveClose")),
                                  onClick: N,
                                  disabled: !x.value,
                                },
                                null,
                                8,
                                Ml
                              ),
                              [[fe.aG, x.value || !O.value]]
                            ),
                            (0, ve.Lk)(
                              "button",
                              {
                                textContent: (0, pe.v_)((0, U.R1)(S.Ru)("buttonClose")),
                                onClick: n[0] || (n[0] = (e) => B(!0)),
                                title: "Esc",
                              },
                              null,
                              8,
                              Dl
                            ),
                          ]),
                        ]),
                        T.value && "code" === y.value
                          ? ((0, ve.uX)(),
                            (0, ve.CE)("div", Vl, [
                              (0, ve.Lk)(
                                "p",
                                { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("readonlyNote")) },
                                null,
                                8,
                                Bl
                              ),
                              ((0, ve.uX)(),
                              (0, ve.Wv)(
                                ve.PR,
                                null,
                                [
                                  (0, ve.bF)((0, U.R1)(qt), { class: "flex ml-2c", script: R.value }, null, 8, [
                                    "script",
                                  ]),
                                ],
                                1024
                              )),
                            ]))
                          : (0, ve.Q3)("", !0),
                        K.value
                          ? ((0, ve.uX)(),
                            (0, ve.CE)("p", Nl, [
                              (0, ve.Lk)("b", { textContent: (0, pe.v_)(K.value[0]) }, null, 8, zl),
                              (0, ve.eW)(" " + (0, pe.v_)(K.value[1]), 1),
                            ]))
                          : (0, ve.Q3)("", !0),
                        (0, ve.bo)(
                          (0, ve.bF)(
                            (0, U.R1)(Mt.A),
                            {
                              class: (0, pe.C4)(["flex-auto", { readonly: O.value }]),
                              value: L.value,
                              readOnly: O.value,
                              ref_key: "$code",
                              ref: h,
                              active: "code" === y.value,
                              commands: _,
                              onCodeDirty: n[1] || (n[1] = (e) => (w.value = e)),
                            },
                            null,
                            8,
                            ["class", "value", "readOnly", "active"]
                          ),
                          [[fe.aG, "code" === y.value]]
                        ),
                        ((0, ve.uX)(),
                        (0, ve.Wv)(
                          ve.PR,
                          { ref_key: "$tabBody", ref: b },
                          [
                            "settings" === y.value
                              ? ((0, ve.uX)(),
                                (0, ve.Wv)(
                                  (0, U.R1)(Un),
                                  (0, ve.v6)({ key: 0, class: "edit-body" }, { readOnly: t.readOnly, script: R.value }),
                                  null,
                                  16
                                ))
                              : "values" === y.value
                                ? ((0, ve.uX)(),
                                  (0, ve.Wv)(
                                    (0, U.R1)(Cl),
                                    (0, ve.v6)(
                                      { key: 1, class: "edit-body" },
                                      { readOnly: t.readOnly, script: R.value }
                                    ),
                                    null,
                                    16
                                  ))
                                : "externals" === y.value
                                  ? ((0, ve.uX)(),
                                    (0, ve.Wv)(
                                      (0, U.R1)(Dt.A),
                                      { key: 2, class: "flex-auto", value: R.value },
                                      null,
                                      8,
                                      ["value"]
                                    ))
                                  : "help" === y.value
                                    ? ((0, ve.uX)(),
                                      (0, ve.Wv)(
                                        (0, U.R1)(Fl),
                                        { key: 3, class: "edit-body", hotkeys: E.value },
                                        null,
                                        8,
                                        ["hotkeys"]
                                      ))
                                    : (0, ve.Q3)("", !0),
                          ],
                          1536
                        )),
                        A.value || I.value
                          ? ((0, ve.uX)(),
                            (0, ve.CE)("div", Hl, [
                              I.value
                                ? ((0, ve.uX)(),
                                  (0, ve.Wv)(
                                    (0, U.R1)(Vt.A),
                                    { key: 0, "i18n-key": "hashPatternWarning" },
                                    {
                                      default: (0, ve.k6)(() => [
                                        (0, ve.Lk)("code", { textContent: (0, pe.v_)(I.value) }, null, 8, Ql),
                                      ]),
                                      _: 1,
                                    }
                                  ))
                                : (0, ve.Q3)("", !0),
                              ((0, ve.uX)(!0),
                              (0, ve.CE)(
                                ve.FK,
                                null,
                                (0, ve.pI)(
                                  A.value,
                                  (e) => (
                                    (0, ve.uX)(),
                                    (0, ve.CE)(
                                      "p",
                                      { key: e, textContent: (0, pe.v_)(e), class: "text-red" },
                                      null,
                                      8,
                                      Pl
                                    )
                                  )
                                ),
                                128
                              )),
                              A.value
                                ? ((0, ve.uX)(!0),
                                  (0, ve.CE)(
                                    ve.FK,
                                    { key: 1 },
                                    (0, ve.pI)(
                                      F.value,
                                      (e) => (
                                        (0, ve.uX)(),
                                        (0, ve.CE)("p", { class: "my-1", key: e }, [
                                          (0, ve.Lk)(
                                            "a",
                                            (0, ve.v6)({ href: e, ref_for: !0 }, (0, U.R1)(X.YY), {
                                              textContent: (0, pe.v_)(e),
                                            }),
                                            null,
                                            16,
                                            Yl
                                          ),
                                        ])
                                      )
                                    ),
                                    128
                                  ))
                                : (0, ve.Q3)("", !0),
                            ]))
                          : (0, ve.Q3)("", !0),
                      ],
                      2
                    )
                  )
                )
              },
            },
            ia = { key: 0 },
            ua = { class: "flex" },
            ra = { class: "btn-group" },
            ca = ["textContent"],
            da = ["textContent"],
            va = { key: 0, class: "btn-group" },
            pa = ["data-batch-action"],
            ma = ["textContent"],
            fa = { key: 1, class: "ml-1" },
            ha = ["textContent"],
            ba = ["textContent"],
            ka = (0, ve.Lk)("div", { class: "flex-auto" }, null, -1),
            ga = { class: "ml-1" },
            Ca = ["value"],
            ya = ["textContent", "value"],
            xa = { class: "btn-ghost", tabindex: "0" },
            Ra = { class: "mr-2c" },
            La = ["title", "placeholder"],
            wa = { class: "filter-search-tooltip" },
            _a = ["textContent"],
            Ea = ["innerHTML"],
            Sa = { key: 0, class: "hint mx-1 my-1 flex flex-col" },
            Aa = ["textContent"],
            Fa = ["textContent"],
            $a = ["textContent"],
            Xa = ["data-columns", "data-show-order", "data-table"],
            Ia = "edit",
            Ua = "remove",
            Wa = "restore",
            Ka = "toggle",
            Oa = "undo",
            Ta = "update",
            ja = "tabScripts",
            Ma = "scrollTop",
            Da = {
              __name: "tab-installed",
              setup(e) {
                const n = [
                    [(0, S.Ru)("buttonNew"), { tabIndex: 0, onclick: () => Re("_new") }],
                    [(0, S.Ru)("installFrom", "OpenUserJS"), { href: "https://openuserjs.org/", ...X.YY }],
                    [(0, S.Ru)("installFrom", "GreasyFork"), { href: "https://greasyfork.org/scripts", ...X.YY }],
                    [
                      (0, S.Ru)("buttonInstallFromURL"),
                      {
                        tabIndex: 0,
                        onclick: async () => {
                          try {
                            var e
                            let t = await (0, X.$T)((0, S.Ru)("hintInputURL"), { input: "", ok: { type: "submit" } })
                            ;(t = null == (e = t) ? void 0 : e.trim()),
                              t &&
                                (t.includes("://") || (t = `https://${t}`),
                                new URL(t),
                                await (0, S.dr)("ConfirmInstall", { url: t }))
                          } catch (e) {
                            ;(0, X.rG)({ text: e.message || e })
                          }
                        },
                      },
                    ],
                  ],
                  l = {
                    sort: {
                      exec: { title: (0, S.Ru)("filterExecutionOrder") },
                      alpha: {
                        title: (0, S.Ru)("filterAlphabeticalOrder"),
                        compare: ({ $cache: { lowerName: e } }, { $cache: { lowerName: t } }) => (e < t ? -1 : e > t),
                      },
                      [Ta]: {
                        title: (0, S.Ru)("filterLastUpdateOrder"),
                        compare: ({ props: { lastUpdated: e } }, { props: { lastUpdated: t } }) =>
                          (+t || 0) - (+e || 0),
                      },
                      size: { title: (0, S.Ru)("filterSize"), compare: (e, t) => t.$cache.sizeNum - e.$cache.sizeNum },
                    },
                  },
                  a = (0, U.Kh)({
                    searchScope: null,
                    showEnabledFirst: null,
                    showOrder: null,
                    viewSingleColumn: null,
                    viewTable: null,
                    sort: null,
                  })
                k(be.gN, a, (e) => {
                  ;(0, he.A)(`filters.${e}`, (t) => {
                    ;(a[e] = t), "sort" !== e || l.sort[t] || (a[e] = c.keys(l.sort)[0])
                  })
                })
                const s = `${ja} && inputFocus`,
                  i = `${ja} && !inputFocus`,
                  r = `${i} && selectedScript && !showRecycle`,
                  m = `${i} && selectedScript && showRecycle`,
                  h = `${i} && !buttonFocus`,
                  b = `${i} && selectedScript && showHotkeys`,
                  C = { [Ia]: "e", [Ka]: "space", [Ta]: "r", [Wa]: "r", [Ua]: "x" },
                  y = (e, t) => t.map(([t, n, l]) => me.vW.register(t, e, { condition: n, caseSensitive: l }))
                let x,
                  R = 0,
                  w = [],
                  _ = []
                const E = (0, U.KR)(),
                  A = (0, U.KR)(),
                  F = (0, U.KR)(),
                  K = (0, U.KR)(),
                  O = (0, U.KR)(),
                  T = (0, U.Kh)({
                    focusedIndex: -1,
                    menuNew: !1,
                    showHotkeys: !1,
                    search: (V.search = { value: "", error: null, ...j("") }),
                    sortedScripts: [],
                    filteredScripts: [],
                    script: null,
                    code: "",
                    numColumns: 1,
                    batchRender: { limit: R },
                    batchAction: { action: null, [Oa]: null },
                  }),
                  M = (0, ve.EW)(() => V.route.paths[0] === L),
                  B = (0, ve.EW)(() => !M.value && "exec" === a.sort),
                  N = (0, ve.EW)(() => X.CI && B.value),
                  z = (0, ve.EW)(() => {
                    var e
                    return null == (e = l.sort[a.sort]) ? void 0 : e.compare
                  }),
                  H = (0, ve.EW)(() => T.filteredScripts[T.focusedIndex]),
                  Q = (0, ve.EW)(() =>
                    V.loading ||
                    (T.search.rules.length ? T.sortedScripts.find((e) => !1 !== e.$cache.show) : T.sortedScripts.length)
                      ? null
                      : (0, S.Ru)("labelNoSearchScripts")
                  ),
                  P = (0, ve.EW)(
                    () =>
                      T.search.rules.some((e) => !e.scope || "code" === e.scope) &&
                      V.scripts.filter((e) => null == e.$cache.code).map((e) => e.props.id)
                  ),
                  Y = (0, ve.EW)(() =>
                    T.search.tokens.filter((e) => "#" === e.prefix && !e.negative).map((e) => e.parsed)
                  ),
                  J = () => (M.value ? V.removedScripts : V.scripts),
                  q = (e) => e.target.closest("[data-batch-action]"),
                  G = {
                    [Ka]: {
                      icon: ae,
                      arg(e) {
                        const t = this.icon === ae ? 1 : 0
                        return e.filter((e) => +e.config.enabled !== t)
                      },
                      fn: (e) => d.all(e.map(Xe)),
                    },
                    [Ta]: { icon: "refresh", fn: Ie, [Oa]: !1 },
                    [Ua]: {
                      icon: "trash",
                      async fn(e, t, n) {
                        await d.all(e.map((e) => ue(e, !n))), n || (V.scripts = [])
                      },
                    },
                  },
                  Z = (0, ve.EW)(() => {
                    const e = T.filteredScripts,
                      t = e.length,
                      n = t === T.sortedScripts.length
                    let l = G,
                      a = 0,
                      o = 0
                    for (let t = 0; t < e.length; t++) {
                      const l = e[t]
                      ;(a += !l.config.enabled), n || (o += l.$canUpdate > 0)
                    }
                    return (
                      (l[Ka].icon = a ? ae : oe),
                      (l[Ka].num = a < t ? a : ""),
                      o ? (l[Ta].num = o < t ? o : "") : ({ [Ta]: o, ...l } = l),
                      l
                    )
                  }),
                  ee = (0, S.sg)(() => {
                    try {
                      ;(T.search = V.search = { ...T.search, ...j(T.search.value) }), (T.search.error = null)
                    } catch (e) {
                      T.search.error = e.message
                    }
                    const e = P.value
                    null != e && e.length && _e(e), se()
                  }, 100),
                  te = (0, S.sg)(we)
                function ne() {
                  !M.value &&
                    V.needRefresh &&
                    ((V.scripts = V.scripts.filter((e) => !e.config.removed)), (V.needRefresh = !1)),
                    (T.focusedIndex = -1),
                    se()
                }
                async function le() {
                  const e = P.value
                  null != e && e.length && (await _e(e)), se(), Le()
                }
                function se() {
                  const e = [...J()],
                    t = T.search.rules,
                    n = t.length ? D(e, t) : e.length,
                    l = z.value
                  var o
                  l &&
                    e.sort(
                      ((o = l), a.showEnabledFirst ? (e, t) => t.config.enabled - e.config.enabled || o(e, t) : o)
                    ),
                    (T.sortedScripts = e),
                    (T.filteredScripts = t.length ? e.filter(({ $cache: e }) => e.show) : e),
                    Ae(T.focusedIndex),
                    !R || n < R ? we() : te()
                }
                async function ie(e, t) {
                  if (e === t) return
                  const n = T.filteredScripts,
                    l = V.scripts,
                    a = n[e],
                    o = l.indexOf(a),
                    s = l.indexOf(n[t]),
                    { id: i } = a.props
                  ;(await (0, S.dr)("Move", { id: i, offset: s - o })) &&
                    (l.splice(o, 1),
                    l.splice(s, 0, a),
                    l.forEach((e, t) => {
                      e.props.position = t + 1
                    }),
                    se())
                }
                function de(e) {
                  $.A.set("filters.sort", e.target.value)
                }
                function Re(e) {
                  const n = k(S.fj, [M.value ? L : o, e], "/")
                  e || n !== (0, W.Oj)().pathname ? (0, W.gN)(n) : t.history.back()
                }
                async function Le() {
                  const [e, t, n] = V.route.paths,
                    l = "_new" === t && (await (0, S.dr)("NewScript", +n)),
                    a = l ? l.script : +t && J().find((e) => e.props.id === +t)
                  if (a) return (T.code = l ? l.code : await (0, S.dr)("GetScriptCode", t)), void (T.script = a)
                  if (
                    (t && (0, W.gN)(e, !0),
                    V.canRenderScripts || ((V.canRenderScripts = !0), Ii()),
                    we(),
                    (T.script = null),
                    !g)
                  ) {
                    const e = O.value,
                      t = document.scrollingElement,
                      n = e[Ma],
                      l = t[Ma]
                    ;(0, ve.dY)(() => {
                      ;(e[Ma] = n), (t[Ma] = l)
                    })
                  }
                }
                async function we() {
                  if (!V.canRenderScripts) return
                  const { length: e } = T.sortedScripts
                  let t = 9
                  const n = (0, U.Kh)({ limit: t })
                  T.batchRender = n
                  const l = f.now()
                  for (; t < e && n === T.batchRender; ) {
                    if (R && T.search.rules.length)
                      for (let n = 0; n < R && t < e; t += 1) n += T.sortedScripts[t].$cache.show ? 1 : 0
                    else t += R || 1
                    ;(n.limit = t),
                      await new d((e) => (0, ve.dY)(e)),
                      !R && f.now() - l >= 100 && (R = 2 * t),
                      R && t < e && (await (0, S.F1)())
                  }
                }
                async function _e(e) {
                  const t = await (0, S.dr)("GetScriptCode", e)
                  V.scripts.forEach(({ $cache: e, props: { id: n } }) => {
                    n in t && (e.code = t[n])
                  }),
                    se()
                }
                async function Ee() {
                  ;(await (0, X.$T)((0, S.Ru)("buttonEmptyRecycleBin"))) &&
                    ((0, S.dr)("CheckRemove", { force: !0 }), (V.removedScripts = []))
                }
                function Se() {
                  const e = a.viewTable ? w : _
                  T.numColumns = a.viewSingleColumn ? 1 : e.findIndex((e) => t.innerWidth < e) + 1 || e.length + 1
                }
                function Ae(e) {
                  ;(e = Math.min(e, T.filteredScripts.length - 1)),
                    (e = Math.max(e, -1)) !== T.focusedIndex && (T.focusedIndex = e)
                }
                function Fe(e) {
                  e.config.removed ? (0, S.dr)("RemoveScripts", [e.props.id]) : ue(e, 1)
                }
                async function $e(e) {
                  try {
                    await ue(e, 0)
                  } catch (t) {
                    ;(0, X.$T)(`${t.message || t}\n\n@namespace ${e.meta.namespace}\n@name ${e.meta.name}`, {
                      cancel: !1,
                    })
                  }
                }
                function Xe(e) {
                  return (0, S.dr)("UpdateScriptInfo", {
                    id: e.props.id,
                    config: { enabled: e.config.enabled ? 0 : 1 },
                  })
                }
                async function Ie(e, t) {
                  var n
                  t && (t = (t.querySelector("svg") || t.closest("svg") || t).classList).add("rotate"),
                    await (0, S.dr)("CheckUpdate", e && (0, S.eC)(e).map((e) => e.props.id)),
                    null == (n = t) || n.remove("rotate")
                }
                function Ue(e) {
                  if (Y.value.includes(e)) {
                    const t = T.search.tokens.filter((t) => !("#" === t.prefix && t.parsed === e))
                    T.search.value = t.map((e) => `${e.prefix}${e.raw}`).join(" ")
                  } else T.search.value = [T.search.value.trim(), `#${e} `].filter(u).join(" ")
                }
                function We(e) {
                  if (!e) return
                  const t = K.value
                  t.scroll({ top: t.scrollTop + e, behavior: "smooth" })
                }
                function Ke(e) {
                  if (V.batch) return
                  const t = q(e),
                    n = T.batchAction
                  let l = null == t ? void 0 : t.dataset.batchAction
                  if (n.action === l) {
                    const e = Z.value[l] || {},
                      a = T.filteredScripts,
                      o = (null == e.arg ? void 0 : e.arg(a)) || a,
                      s = e.fn,
                      i = [s, o, t]
                    s && re(...i),
                      (n[Oa] =
                        s &&
                        !1 !== e[Oa] &&
                        (() => {
                          re(...i, Oa), (n[Oa] = null)
                        })),
                      (l = ""),
                      t.blur()
                  }
                  n.action = l
                }
                function Oe() {
                  const e = () => {
                    var e
                    me.vW.setContext("buttonFocus", (null == (e = (0, X.bq)()) ? void 0 : e.tabIndex) >= 0)
                  }
                  v("focus", e, !0)
                  const t = [
                    () => p("focus", e, !0),
                    ...(g
                      ? [
                          me.vW.register("tab", () => {
                            ;(0, me.I1)(1)
                          }),
                          me.vW.register("s-tab", () => {
                            ;(0, me.I1)(-1)
                          }),
                        ]
                      : []),
                    ...y(() => {
                      var e
                      null == (e = F.value) || e.focus()
                    }, [
                      ["ctrlcmd-f", ja],
                      ["/", i, !0],
                    ]),
                    ...y(() => {
                      var e
                      null == (e = F.value) || e.blur()
                    }, [["enter", s]]),
                    ...y(() => {
                      T.showHotkeys = !1
                    }, [
                      ["escape", b],
                      ["q", b, !0],
                    ]),
                    ...y(() => {
                      let e = T.focusedIndex
                      e < 0 ? (e = 0) : (e += T.numColumns), e < T.filteredScripts.length && Ae(e)
                    }, [
                      ["ctrlcmd-down", ja],
                      ["down", ja],
                      ["j", i, !0],
                    ]),
                    ...y(() => {
                      const e = T.focusedIndex - T.numColumns
                      e >= 0 && Ae(e)
                    }, [
                      ["ctrlcmd-up", ja],
                      ["up", ja],
                      ["k", i, !0],
                    ]),
                    ...y(() => {
                      Ae(T.focusedIndex - 1)
                    }, [
                      ["ctrlcmd-left", ja],
                      ["left", i],
                      ["h", i, !0],
                    ]),
                    ...y(() => {
                      Ae(T.focusedIndex + 1)
                    }, [
                      ["ctrlcmd-right", ja],
                      ["right", i],
                      ["l", i, !0],
                    ]),
                    ...y(() => {
                      Ae(0)
                    }, [
                      ["ctrlcmd-home", ja],
                      ["g g", i, !0],
                    ]),
                    ...y(() => {
                      Ae(T.filteredScripts.length - 1)
                    }, [
                      ["ctrlcmd-end", ja],
                      ["G", i, !0],
                    ]),
                    ...y(() => {
                      Re(H.value.props.id)
                    }, [
                      [C[Ia], r, !0],
                      ["enter", h],
                    ]),
                    ...y(() => {
                      Fe(H.value)
                    }, [
                      ["delete", r],
                      [C[Ua], r, !0],
                    ]),
                    ...y(() => {
                      Ie(H.value)
                    }, [[C[Ta], r, !0]]),
                    ...y(() => {
                      Xe(H.value)
                    }, [[C[Ka], r, !0]]),
                    ...y(() => {
                      $e(H.value)
                    }, [[C[Wa], m, !0]]),
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
                  q(e) || (T.batchAction.action = null)
                }
                ne(),
                  (0, ve.wB)(M, ne),
                  (0, ve.wB)(
                    () => V.canRenderScripts && K.value && B.value,
                    (e) => Ye(K.value, ie, e)
                  ),
                  (0, ve.wB)(() => T.search.value, ee),
                  (0, ve.wB)(() => [a.sort, a.showEnabledFirst], ee),
                  screen.availWidth > 767 &&
                    ((0, ve.wB)(() => a.viewSingleColumn, Se),
                    (0, ve.wB)(
                      () => a.viewTable,
                      (e) => {
                        if ((Se(), e && !x)) {
                          x = (0, I.T)("-width: 76")
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
                  (0, ve.wB)(J, le),
                  (0, ve.wB)(() => V.route.paths[1], Le),
                  (0, ve.wB)(
                    () => V.scripts,
                    (e) => {
                      ;(A.value = !e.length) && (e = E.value) && (e.focus(), e.click())
                    }
                  ),
                  (0, ve.wB)(H, (e) => {
                    me.vW.setContext("selectedScript", e)
                  }),
                  (0, ve.wB)(
                    () => T.showHotkeys,
                    (e) => {
                      me.vW.setContext("showHotkeys", e)
                    }
                  )
                const je = []
                return (
                  (0, ve.sV)(() => {
                    if ((V.loading || le(), !_.length)) {
                      const e =
                        (null == I.o ? void 0 : I.o.textContent.match(/--columns-(cards|table)\b/)) &&
                        getComputedStyle(document.documentElement)
                      if (e)
                        for (
                          let t = 0,
                            n = [
                              ["cards", _],
                              ["table", w],
                            ];
                          t < n.length;
                          t++
                        ) {
                          const [l, a] = n[t],
                            o = e.getPropertyValue(`--columns-${l}`)
                          o && a.push(...o.split(",").map(Number).filter(u))
                        }
                      else _.push(1300, 1900, 2500), w.push(1600, 2500, 3400)
                      v("resize", Se)
                    }
                    Se(),
                      je.push(Oe()),
                      document.addEventListener("mousedown", Te),
                      je.push(() => document.removeEventListener("mousedown", Te))
                  }),
                  (0, ve.xo)(() => {
                    je.forEach((e) => e())
                  }),
                  (e, t) => (
                    (0, ve.uX)(),
                    (0, ve.CE)(
                      "div",
                      { class: "tab-installed", ref_key: "scroller", ref: O },
                      [
                        (0, U.R1)(V).canRenderScripts
                          ? ((0, ve.uX)(),
                            (0, ve.CE)("div", ia, [
                              (0, ve.Lk)("header", ua, [
                                M.value
                                  ? ((0, ve.uX)(),
                                    (0, ve.CE)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "ml-2",
                                        textContent: (0, pe.v_)((0, U.R1)(S.Ru)("headerRecycleBin")),
                                      },
                                      null,
                                      8,
                                      ba
                                    ))
                                  : ((0, ve.uX)(),
                                    (0, ve.CE)(
                                      ve.FK,
                                      { key: 0 },
                                      [
                                        (0, ve.Lk)("div", ra, [
                                          (0, ve.bF)(
                                            (0, U.R1)(ge.A),
                                            {
                                              modelValue: T.menuNew,
                                              "onUpdate:modelValue": t[1] || (t[1] = (e) => (T.menuNew = e)),
                                              class: (0, pe.C4)({ active: T.menuNew }),
                                              closeAfterClick: !0,
                                            },
                                            {
                                              content: (0, ve.k6)(() => [
                                                ((0, ve.uX)(),
                                                (0, ve.CE)(
                                                  ve.FK,
                                                  null,
                                                  (0, ve.pI)(n, ([e, t], n) =>
                                                    (0, ve.Lk)(
                                                      "a",
                                                      (0, ve.v6)(
                                                        {
                                                          class: "dropdown-menu-item",
                                                          key: n,
                                                          textContent: (0, pe.v_)(e),
                                                          ref_for: !0,
                                                        },
                                                        t
                                                      ),
                                                      null,
                                                      16,
                                                      ca
                                                    )
                                                  ),
                                                  64
                                                )),
                                                A.value
                                                  ? ((0, ve.uX)(),
                                                    (0, ve.CE)(
                                                      "a",
                                                      {
                                                        key: 0,
                                                        class: "dropdown-menu-item",
                                                        textContent: (0, pe.v_)(
                                                          `${(0, U.R1)(S.Ru)("buttonImportData")} / ${(0, U.R1)(S.Ru)("labelSync")}...`
                                                        ),
                                                        onClick:
                                                          t[0] ||
                                                          (t[0] = (e) => {
                                                            ;((0, U.R1)(V).isEmpty = 1), (0, U.R1)(ce)((0, U.R1)(ke.Mz))
                                                          }),
                                                      },
                                                      null,
                                                      8,
                                                      da
                                                    ))
                                                  : (0, ve.Q3)("", !0),
                                              ]),
                                              default: (0, ve.k6)(() => [
                                                (0, ve.bF)(
                                                  (0, U.R1)(Ce.A),
                                                  {
                                                    content: (0, U.R1)(S.Ru)("buttonNew"),
                                                    placement: "bottom",
                                                    align: "start",
                                                    disabled: T.menuNew,
                                                  },
                                                  {
                                                    default: (0, ve.k6)(() => [
                                                      (0, ve.Lk)(
                                                        "a",
                                                        {
                                                          class: "btn-ghost",
                                                          tabindex: "0",
                                                          ref_key: "$menuNew",
                                                          ref: E,
                                                        },
                                                        [(0, ve.bF)((0, U.R1)(xe.A), { name: "plus" })],
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
                                          (0, ve.bF)(
                                            (0, U.R1)(Ce.A),
                                            {
                                              content: (0, U.R1)(S.Ru)("updateScriptsAll"),
                                              placement: "bottom",
                                              align: "start",
                                            },
                                            {
                                              default: (0, ve.k6)(() => [
                                                (0, ve.Lk)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    tabindex: "0",
                                                    onClick: t[2] || (t[2] = (e) => Ie(null, e.target)),
                                                  },
                                                  [(0, ve.bF)((0, U.R1)(xe.A), { name: "refresh" })]
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                        ]),
                                        T.filteredScripts.length
                                          ? ((0, ve.uX)(),
                                            (0, ve.CE)("div", va, [
                                              ((0, ve.uX)(!0),
                                              (0, ve.CE)(
                                                ve.FK,
                                                null,
                                                (0, ve.pI)(
                                                  Z.value,
                                                  ({ icon: e, num: t }, n) => (
                                                    (0, ve.uX)(),
                                                    (0, ve.CE)(
                                                      "a",
                                                      {
                                                        key: n,
                                                        class: (0, pe.C4)([
                                                          "btn-ghost",
                                                          {
                                                            "has-error": T.batchAction.action === n,
                                                            disabled: (0, U.R1)(V).batch,
                                                          },
                                                        ]),
                                                        "data-batch-action": n,
                                                        tabindex: "0",
                                                        onClick: (0, fe.D$)(Ke, ["prevent"]),
                                                      },
                                                      [
                                                        (0, ve.bF)((0, U.R1)(xe.A), { name: e }, null, 8, ["name"]),
                                                        t
                                                          ? ((0, ve.uX)(),
                                                            (0, ve.CE)(
                                                              "sub",
                                                              { key: 0, textContent: (0, pe.v_)(t) },
                                                              null,
                                                              8,
                                                              ma
                                                            ))
                                                          : (0, ve.Q3)("", !0),
                                                        T.batchAction.action === n
                                                          ? ((0, ve.uX)(), (0, ve.CE)("span", fa, "\u2757"))
                                                          : (0, ve.Q3)("", !0),
                                                      ],
                                                      10,
                                                      pa
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                              (0, ve.Lk)(
                                                "div",
                                                {
                                                  class: "btn-hint subtle",
                                                  textContent: (0, pe.v_)(
                                                    (0, U.R1)(S.Ru)("hintForBatchAction", `${T.filteredScripts.length}`)
                                                  ),
                                                },
                                                null,
                                                8,
                                                ha
                                              ),
                                              (0, ve.bF)(
                                                (0, U.R1)(Ce.A),
                                                {
                                                  content: (0, U.R1)(S.Ru)("buttonUndo"),
                                                  placement: "bottom",
                                                  align: "start",
                                                },
                                                {
                                                  default: (0, ve.k6)(() => [
                                                    T.batchAction.undo
                                                      ? ((0, ve.uX)(),
                                                        (0, ve.CE)(
                                                          "a",
                                                          {
                                                            key: 0,
                                                            class: "btn-ghost",
                                                            tabindex: "0",
                                                            onClick:
                                                              t[3] ||
                                                              (t[3] = (0, fe.D$)(
                                                                (...e) =>
                                                                  T.batchAction.undo && T.batchAction.undo(...e),
                                                                ["prevent"]
                                                              )),
                                                          },
                                                          [(0, ve.bF)((0, U.R1)(xe.A), { name: "undo" })]
                                                        ))
                                                      : (0, ve.Q3)("", !0),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["content"]
                                              ),
                                            ]))
                                          : (0, ve.Q3)("", !0),
                                      ],
                                      64
                                    )),
                                ka,
                                (0, ve.Lk)("span", ga, [
                                  (0, ve.eW)((0, pe.v_)((0, U.R1)(S.Ru)("sortOrder")) + " ", 1),
                                  (0, ve.Lk)(
                                    "select",
                                    { value: a.sort, onChange: de, class: "h-100" },
                                    [
                                      ((0, ve.uX)(!0),
                                      (0, ve.CE)(
                                        ve.FK,
                                        null,
                                        (0, ve.pI)(
                                          l.sort,
                                          (e, t) => (
                                            (0, ve.uX)(),
                                            (0, ve.CE)(
                                              "option",
                                              { textContent: (0, pe.v_)(e.title), key: t, value: t },
                                              null,
                                              8,
                                              ya
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ],
                                    40,
                                    Ca
                                  ),
                                ]),
                                (0, ve.bF)(
                                  (0, U.R1)(ge.A),
                                  { align: "right", class: "filter-sort" },
                                  {
                                    content: (0, ve.k6)(() => [
                                      (0, ve.bo)(
                                        (0, ve.Lk)(
                                          "div",
                                          null,
                                          [
                                            (0, ve.bF)(
                                              (0, U.R1)(ye.A),
                                              {
                                                name: "filters.showEnabledFirst",
                                                label: (0, U.R1)(S.Ru)("optionShowEnabledFirst"),
                                              },
                                              null,
                                              8,
                                              ["label"]
                                            ),
                                          ],
                                          512
                                        ),
                                        [[fe.aG, z.value]]
                                      ),
                                      (0, ve.Lk)("div", null, [
                                        (0, ve.bF)(
                                          (0, U.R1)(ye.A),
                                          { name: "filters.showOrder", label: (0, U.R1)(S.Ru)("labelShowOrder") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                      (0, ve.Lk)("div", Ra, [
                                        (0, ve.bF)(
                                          (0, U.R1)(ye.A),
                                          { name: "filters.viewTable", label: (0, U.R1)(S.Ru)("labelViewTable") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                        (0, ve.bF)(
                                          (0, U.R1)(ye.A),
                                          {
                                            name: "filters.viewSingleColumn",
                                            label: (0, U.R1)(S.Ru)("labelViewSingleColumn"),
                                          },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                    ]),
                                    default: (0, ve.k6)(() => [
                                      (0, ve.bF)(
                                        (0, U.R1)(Ce.A),
                                        { content: (0, U.R1)(S.Ru)("labelSettings"), placement: "bottom" },
                                        {
                                          default: (0, ve.k6)(() => [
                                            (0, ve.Lk)("a", xa, [(0, ve.bF)((0, U.R1)(xe.A), { name: "cog" })]),
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
                                (0, ve.Lk)(
                                  "form",
                                  {
                                    class: "filter-search hidden-xs",
                                    onSubmit: t[5] || (t[5] = (0, fe.D$)(() => {}, ["prevent"])),
                                    style: (0, pe.Tr)({
                                      "min-width": "10em",
                                      "max-width": 5 + Math.max(20, T.search.value.length) + "ex",
                                    }),
                                  },
                                  [
                                    (0, ve.Lk)("label", null, [
                                      (0, ve.bo)(
                                        (0, ve.Lk)(
                                          "input",
                                          {
                                            type: "search",
                                            class: (0, pe.C4)({ "has-error": T.search.error }),
                                            title: T.search.error,
                                            placeholder: (0, U.R1)(S.Ru)("labelSearchScript"),
                                            "onUpdate:modelValue": t[4] || (t[4] = (e) => (T.search.value = e)),
                                            ref_key: "refSearch",
                                            ref: F,
                                            id: "installed-search",
                                          },
                                          null,
                                          10,
                                          La
                                        ),
                                        [[fe.Jo, T.search.value]]
                                      ),
                                      (0, ve.bF)((0, U.R1)(xe.A), { name: "search" }),
                                    ]),
                                  ],
                                  36
                                ),
                                (0, ve.bF)(
                                  (0, U.R1)(ge.A),
                                  { align: "right" },
                                  {
                                    content: (0, ve.k6)(() => [
                                      (0, ve.Lk)("div", wa, [
                                        T.search.error
                                          ? ((0, ve.uX)(),
                                            (0, ve.CE)(
                                              "div",
                                              { key: 0, class: "has-error", textContent: (0, pe.v_)(T.search.error) },
                                              null,
                                              8,
                                              _a
                                            ))
                                          : (0, ve.Q3)("", !0),
                                        (0, ve.Lk)(
                                          "div",
                                          { innerHTML: (0, U.R1)(S.Ru)("titleSearchHintV2") },
                                          null,
                                          8,
                                          Ea
                                        ),
                                      ]),
                                    ]),
                                    default: (0, ve.k6)(() => [
                                      (0, ve.Lk)(
                                        "a",
                                        {
                                          class: (0, pe.C4)(["btn-ghost", { "has-error": T.search.error }]),
                                          tabindex: "0",
                                        },
                                        [(0, ve.bF)((0, U.R1)(xe.A), { name: "question" })],
                                        2
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              M.value
                                ? ((0, ve.uX)(),
                                  (0, ve.CE)("div", Sa, [
                                    (0, ve.Lk)(
                                      "span",
                                      { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("hintRecycleBin")) },
                                      null,
                                      8,
                                      Aa
                                    ),
                                    (0, U.R1)(V).removedScripts.length
                                      ? ((0, ve.uX)(),
                                        (0, ve.CE)(
                                          "a",
                                          {
                                            key: 0,
                                            textContent: (0, pe.v_)((0, U.R1)(S.Ru)("buttonEmptyRecycleBin")),
                                            tabindex: "0",
                                            onClick: Ee,
                                          },
                                          null,
                                          8,
                                          Fa
                                        ))
                                      : (0, ve.Q3)("", !0),
                                  ]))
                                : Q.value
                                  ? ((0, ve.uX)(),
                                    (0, ve.CE)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "hint mx-1 my-1 flex flex-col",
                                        textContent: (0, pe.v_)(Q.value),
                                      },
                                      null,
                                      8,
                                      $a
                                    ))
                                  : (0, ve.Q3)("", !0),
                              (0, ve.bo)(
                                ((0, ve.uX)(),
                                (0, ve.CE)(
                                  "div",
                                  {
                                    class: "scripts",
                                    ref_key: "refList",
                                    ref: K,
                                    style: (0, pe.Tr)(`--num-columns:${T.numColumns}`),
                                    "data-columns": T.numColumns,
                                    "data-show-order": a.showOrder || null,
                                    "data-table": a.viewTable || null,
                                  },
                                  [
                                    ((0, ve.uX)(!0),
                                    (0, ve.CE)(
                                      ve.FK,
                                      null,
                                      (0, ve.pI)(T.sortedScripts, (e, t) =>
                                        (0, ve.bo)(
                                          ((0, ve.uX)(),
                                          (0, ve.Wv)(
                                            (0, U.R1)(jt),
                                            {
                                              key: e.props.id,
                                              focused: H.value === e,
                                              showHotkeys: T.showHotkeys,
                                              script: e,
                                              draggable: N.value,
                                              visible: t < T.batchRender.limit,
                                              viewTable: a.viewTable,
                                              hotkeys: C,
                                              activeTags: Y.value,
                                              onRemove: Fe,
                                              onRestore: $e,
                                              onToggle: Xe,
                                              onUpdate: Ie,
                                              onScrollDelta: We,
                                              onClickTag: Ue,
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
                                          [[fe.aG, !T.search.rules.length || !1 !== e.$cache.show]]
                                        )
                                      ),
                                      128
                                    )),
                                  ],
                                  12,
                                  Xa
                                )),
                                [[(0, U.R1)(X.dl), !T.script]]
                              ),
                            ]))
                          : (0, ve.Q3)("", !0),
                        ((0, ve.uX)(),
                        (0, ve.Wv)(ve.Im, { to: "body" }, [
                          ((0, ve.uX)(),
                          (0, ve.Wv)(
                            ve.PR,
                            { key: (0, U.R1)(V).route.hash, max: 5 },
                            [
                              T.script
                                ? ((0, ve.uX)(),
                                  (0, ve.Wv)(
                                    (0, U.R1)(sa),
                                    {
                                      key: 0,
                                      initial: T.script,
                                      "initial-code": T.code,
                                      "read-only": !!T.script.config.removed,
                                      onClose: t[6] || (t[6] = (e) => Re()),
                                    },
                                    null,
                                    8,
                                    ["initial", "initial-code", "read-only"]
                                  ))
                                : (0, ve.Q3)("", !0),
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
            Va = Da
          var Ba = _(9478)
          const Na = (0, _(4758).Bj)(async () => {
              await ("/public/lib/zip-no-worker.min.js",
              new d((e, t) => {
                const n = document.createElement("script")
                ;(n.src = "/public/lib/zip-no-worker.min.js"), (n.onload = e), (n.onerror = t), document.body.append(n)
              }))
              const { zip: e } = t,
                n = ["/public/lib/z-worker.js"]
              return e.configure({ workerScripts: { deflate: n, inflate: n } }), e
            }),
            za = ["textContent", "disabled"],
            Ha = ["textContent", "title"],
            Qa = { class: "mt-1" },
            Pa = (0, ve.Lk)("br", null, null, -1),
            Ya = { class: "import-report" },
            Ja = ["data-type"],
            qa = ["textContent"],
            Ga = ["textContent", "colspan"],
            Za = {
              __name: "vm-import",
              setup(e) {
                const t = (0, U.Kh)([]),
                  n = (0, U.KR)(),
                  l = (0, U.KR)(""),
                  a = (0, S.Ru)("confirmUndoImport"),
                  o = (0, S.Ru)("labelImportScriptData"),
                  s = (0, S.Ru)("labelImportSettings")
                let u, r
                function f() {
                  const e = document.createElement("input")
                  ;(e.type = "file"),
                    (e.accept = ".zip"),
                    (e.onchange = () => {
                      var t
                      return h(null == (t = e.files) ? void 0 : t[0])
                    }),
                    e.click()
                }
                async function h(e) {
                  V.batch || re(b, e)
                }
                async function b(e) {
                  if (!e) return
                  t.length = 0
                  const n = $.A.get("importScriptData"),
                    a = await Na(),
                    o = new a.ZipReader(new a.BlobReader(e)),
                    s = (await o.getEntries().catch(E)) || []
                  if (t.length) return
                  E("", e.name, "info"), E("", "", "info")
                  const v = {},
                    p = s.reduce((e, t) => {
                      var n
                      return e + (null == (n = t.filename) ? void 0 : n.endsWith(".user.js"))
                    }, 0),
                    f = s.find((e) => {
                      var t
                      return "violentmonkey" === (null == (t = e.filename) ? void 0 : t.toLowerCase())
                    }),
                    h = (f && (await _(f))) || {},
                    b = $.A.get("importSettings") && h.settings,
                    k = h.scripts || {},
                    g = h.values || {}
                  let y,
                    x = 0,
                    R = 0
                  function L(e, t) {
                    try {
                      return JSON.parse(e)
                    } catch (e) {
                      E(e, t.filename, null)
                    }
                  }
                  function w(e, t) {
                    return d.all(
                      s.map(async (n) => {
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
                    return e.filename.endsWith(".js") ? t : L(t, e)
                  }
                  function E(e, n, l = "critical") {
                    t.push({ text: e, name: n, type: l })
                  }
                  function A(e = "") {
                    const n = c.keys(v).length,
                      l = (0, S.Ru)("msgImported", [n === p ? n : `${n} / ${p}`])
                    return (t[0].name = l), (t[0].text = e), l
                  }
                  function F(e) {
                    return (0, S.eC)(e).filter((e) => "string" == typeof e)
                  }
                  ;(u = (0, S.zm)()),
                    m.runtime.onConnect.addListener((e) => {
                      e.name === u &&
                        e.onMessage.addListener(([n, l]) => {
                          l ? ++x : ++R,
                            (t[1].name = (0, S.Ru)("msgLoadingDependency", [x, R])),
                            x === R ? ((n = (0, S.Ru)("buttonOK")), e.disconnect()) : l || (n += "..."),
                            (t[1].text = n)
                        })
                    }),
                    r ||
                      ((y = " \u2bc8 " + new Date().toLocaleTimeString()),
                      (r = m.runtime.connect({ name: "undoImport" })),
                      await new d(C)),
                    await w(async (e, n, l) => {
                      const { meta: a, settings: o = {}, options: s } = n
                      if (!a || !s) return
                      const i = s.override || {}
                      ;(t[0].text = "Tampermonkey"),
                        (k[l] = {
                          config: { enabled: !1 !== o.enabled ? 1 : 0, shouldUpdate: s.check_for_updates ? 1 : 0 },
                          custom: {
                            [P]: "string" == typeof a.file_url ? a.file_url : void 0,
                            noframes: null == i.noframes ? void 0 : +!!i.noframes,
                            runAt: Bt.a7.test(s.run_at) ? s.run_at : void 0,
                            [z]: F(i.use_excludes),
                            [B]: F(i.use_includes),
                            [N]: F(i.use_matches),
                            [G]: !1 !== i.merge_excludes,
                            [ee]: !1 !== i.merge_includes,
                            [te]: !1 !== i.merge_matches,
                          },
                          position: +o.position || void 0,
                          props: { lastModified: +a.modified, lastUpdated: +a.modified },
                        })
                    }, ".options.json"),
                    await w(async (e, t, n) => {
                      var l, a, o, s
                      const { filename: i } = e,
                        r = k[n],
                        c = {
                          code: t,
                          portId: u,
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
                                r.lastUpdated || (null == (s = r.props) ? void 0 : s.lastUpdated) || +e.lastModDate,
                            },
                          }),
                        }
                      try {
                        ;(v[n] = (await (0, S.dr)("ParseScript", c)).update.props.uri), A(i)
                      } catch (e) {
                        E(e, i, "script")
                      }
                    }, ".user.js"),
                    n &&
                      (await w(async (e, n, l) => {
                        ;(t[0].text = "Tampermonkey"), (g[v[l]] = n.data)
                      }, ".storage.json"),
                      (0, S.dr)("SetValueStores", g)),
                    i(b) && (delete b.sync, (0, S.dr)("SetOptions", b)),
                    (0, S.dr)("CheckPosition"),
                    await o.close(),
                    A(),
                    y && (l.value = y)
                }
                async function g() {
                  ;(await (0, X.$T)(a)) && ((l.value = ""), r.postMessage(!0), await new d(C))
                }
                function C(e) {
                  k(E.J, r.onMessage, e)
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
                    s = async (e) => {
                      e.preventDefault(), n(!1)
                      const t = e.dataTransfer.files[0]
                      ;(await (0, X.$T)((0, S.Ru)("buttonImportData"))) && (await h(t))
                    }
                  return () => {
                    const e = V.route.hash === x ? v : p
                    e("dragend", l), e("dragleave", a), e("dragover", o), e("drop", s)
                  }
                }
                return (
                  (0, ve.sV)(() => {
                    const e = y(n.value)
                    v("hashchange", e), e()
                  }),
                  (0, ve.n)(() => {
                    if (2 == ++V.isEmpty) {
                      const e = n.value
                      e.getBoundingClientRect().y > innerHeight / 2 &&
                        e.scrollIntoView({ behavior: "smooth", block: "center" }),
                        setTimeout(() => e.focus())
                    }
                  }),
                  (e, i) => (
                    (0, ve.uX)(),
                    (0, ve.CE)("div", null, [
                      (0, ve.Lk)(
                        "button",
                        {
                          textContent: (0, pe.v_)((0, U.R1)(S.Ru)("buttonImportData")),
                          onClick: f,
                          ref_key: "buttonImport",
                          ref: n,
                          disabled: (0, U.R1)(V).batch,
                        },
                        null,
                        8,
                        za
                      ),
                      l.value
                        ? ((0, ve.uX)(),
                          (0, ve.CE)(
                            "button",
                            {
                              key: 0,
                              textContent: (0, pe.v_)((0, U.R1)(S.Ru)("buttonUndo") + l.value),
                              onClick: g,
                              class: "has-error",
                              title: (0, U.R1)(a),
                            },
                            null,
                            8,
                            Ha
                          ))
                        : (0, ve.Q3)("", !0),
                      (0, ve.Lk)("div", Qa, [
                        (0, ve.bF)((0, U.R1)(ye.A), { name: "importScriptData", label: (0, U.R1)(o) }, null, 8, [
                          "label",
                        ]),
                        Pa,
                        (0, ve.bF)((0, U.R1)(ye.A), { name: "importSettings", label: (0, U.R1)(s) }, null, 8, [
                          "label",
                        ]),
                      ]),
                      (0, ve.Lk)("table", Ya, [
                        ((0, ve.uX)(!0),
                        (0, ve.CE)(
                          ve.FK,
                          null,
                          (0, ve.pI)(
                            t,
                            ({ type: e, name: t, text: n }, l) => (
                              (0, ve.uX)(),
                              (0, ve.CE)(
                                "tr",
                                { key: l, "data-type": e },
                                [
                                  t
                                    ? ((0, ve.uX)(),
                                      (0, ve.CE)("td", { key: 0, textContent: (0, pe.v_)(t) }, null, 8, qa))
                                    : (0, ve.Q3)("", !0),
                                  (0, ve.Lk)("td", { textContent: (0, pe.v_)(n), colspan: t ? null : 2 }, null, 8, Ga),
                                ],
                                8,
                                Ja
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
            eo = Za
          var to = _(8111),
            no = _(1174),
            lo = _(8342)
          const ao = (0, S.Ru)("msgDateFormatInfo", c.keys(no.Z).join(", ")),
            oo = {
              __name: "vm-date-info",
              setup: (e) => (e, t) => (
                (0, ve.uX)(),
                (0, ve.Wv)(
                  (0, U.R1)(Ce.A),
                  { content: (0, U.R1)(ao), placement: "left", style: { "vertical-align": "middle" } },
                  {
                    default: (0, ve.k6)(() => [
                      (0, ve.Lk)("a", { href: "https://momentjs.com/docs/#/displaying/format/", target: "_blank" }, [
                        (0, ve.bF)((0, U.R1)(xe.A), { name: "info" }),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["content"]
                )
              ),
            },
            so = { class: "export" },
            io = { class: "flex flex-wrap center-items mr-1c" },
            uo = ["textContent", "disabled"],
            ro = ["textContent"],
            co = { class: "mt-1" },
            vo = { class: "modal-content" },
            po = ["download", "href"],
            mo = (0, ve.Lk)("br", null, null, -1),
            fo = (0, ve.Lk)("strong", null, "scripts.zip", -1),
            ho = {
              __name: "vm-export",
              setup(e) {
                let t
                const n = (0, U.KR)(),
                  l = (0, U.KR)(!1),
                  a = (0, U.KR)(g && {}),
                  o = (0, ve.EW)(() => {
                    const e = n.value
                    return e && `${(0, no.Y)(e.text.trim() || e.defaultValue)}.zip`
                  })
                async function s() {
                  try {
                    ;(l.value = !0), g && !t && (t = await (0, S.dr)("UA")), i(await r())
                  } finally {
                    l.value = !1
                  }
                }
                function i(e) {
                  const n = g && parseFloat(t.browserVersion),
                    l = o.value
                  if (n && ("win" === t.os ? n < 56 : "mac" === t.os ? n < 61 : n < 63)) {
                    const t = new FileReader()
                    ;(t.onload = () => {
                      a.value = { name: l, url: t.result }
                    }),
                      t.readAsDataURL(e)
                  } else (0, lo.W)(e, l)
                }
                function u(e) {
                  return e.replace(/[\\/:*?"<>|]/g, "-")
                }
                async function r() {
                  const e = $.A.get("exportValues"),
                    t = await (0, S.dr)("ExportZip", { values: e }),
                    n = {},
                    l = { scripts: {}, settings: $.A.get() }
                  delete l.settings.sync, e && (l.values = {})
                  const a = ((0, be.Wt)(t, "items") || []).map(({ script: a, code: o }) => {
                    let s = u((0, S.tj)(a))
                    n[s] ? ((n[s] += 1), (s = `${s}_${n[s]}`)) : (n[s] = 1)
                    const { lastModified: i, lastUpdated: r } = a.props,
                      c = {
                        custom: a.custom,
                        config: a.config,
                        position: a.props.position,
                        lastModified: i,
                        lastUpdated: r,
                      }
                    if (e) {
                      const e = t.values[a.props.id]
                      e && (l.values[a.props.uri] = e)
                    }
                    return (l.scripts[s] = c), { name: `${s}.user.js`, content: o, lastModDate: new Date(r || i) }
                  })
                  a.push({ name: "violentmonkey", content: JSON.stringify(l, null, 2) })
                  const o = await Na(),
                    s = new o.BlobWriter("application/zip"),
                    i = new o.ZipWriter(s, { bufferedWrite: !0, keepOrder: !1 })
                  return (
                    await d.all(
                      a.map((e) => i.add(e.name, new o.TextReader(e.content), { lastModDate: e.lastModDate }))
                    ),
                    await i.close()
                  )
                }
                return (e, t) => (
                  (0, ve.uX)(),
                  (0, ve.CE)("div", so, [
                    (0, ve.Lk)("div", io, [
                      (0, ve.Lk)(
                        "button",
                        { textContent: (0, pe.v_)(e.i18n("buttonExportData")), onClick: s, disabled: l.value },
                        null,
                        8,
                        uo
                      ),
                      (0, ve.bF)(
                        (0, U.R1)(On.A),
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
                      (0, ve.bF)((0, U.R1)(oo)),
                      (0, ve.Lk)("span", { hidden: "", textContent: (0, pe.v_)(o.value) }, null, 8, ro),
                    ]),
                    (0, ve.Lk)("div", co, [
                      (0, ve.bF)(
                        (0, U.R1)(ye.A),
                        { name: "exportValues", label: e.i18n("labelExportScriptData") },
                        null,
                        8,
                        ["label"]
                      ),
                    ]),
                    a.value
                      ? ((0, ve.uX)(),
                        (0, ve.Wv)(
                          (0, U.R1)(to.A),
                          {
                            key: 0,
                            transition: "in-out",
                            show: !!a.value.url,
                            onClose: t[0] || (t[0] = (e) => (a.value = {})),
                          },
                          {
                            default: (0, ve.k6)(() => [
                              (0, ve.Lk)("div", vo, [
                                (0, ve.Lk)(
                                  "a",
                                  { download: a.value.name, href: a.value.url },
                                  [(0, ve.eW)(" Right click and save as"), mo, fo],
                                  8,
                                  po
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["show"]
                        ))
                      : (0, ve.Q3)("", !0),
                  ])
                )
              },
            },
            bo = ho
          var ko = _(3417)
          const go = { class: "mr-1c" },
            Co = ["disabled", "textContent"],
            yo = ["disabled", "title", "textContent"],
            xo = {
              __name: "vm-maintenance",
              setup(e) {
                const t = (0, U.KR)((0, S.Ru)("buttonVacuum")),
                  n = (0, S.Ru)("buttonResetSettings"),
                  l = (0, U.KR)(""),
                  a = (0, U.KR)(n)
                async function o(e, t) {
                  if (await (0, X.$T)(t, { ok: { className: "has-error" } })) return re(e)
                }
                function s() {
                  const e = ["lastModified", "lastUpdate", "sync"],
                    t = k(be.BJ, ko.Ay, null, (t, n) => !e.includes(t) && !(0, be.bD)(n, $.A.get(t)) && t)
                  return (
                    (l.value = JSON.stringify(t, null, 2)
                      .slice(1, -1)
                      .replace(/^\s{2}/gm, "")),
                    (a.value = `${n} (${c.keys(t).length})`),
                    (0, S.dr)("SetOptions", t)
                  )
                }
                async function i() {
                  await re(async () => {
                    t.value = (0, S.Ru)("buttonVacuuming")
                    const { fixes: e, errors: n } = await (0, S.dr)("Vacuum"),
                      l = null == n ? void 0 : n.join("\n")
                    ;(t.value = (0, S.Ru)("buttonVacuumed") + (e ? ` (${e})` : "")),
                      l && (0, X.$T)((0, S.Ru)("msgErrorFetchingResource") + "\n\n" + l, { cancel: !1 })
                  })
                }
                return (e, u) => (
                  (0, ve.uX)(),
                  (0, ve.CE)("div", go, [
                    (0, ve.bF)(
                      (0, U.R1)(Ce.A),
                      { content: (0, U.R1)(S.Ru)("hintVacuum") },
                      {
                        default: (0, ve.k6)(() => [
                          (0, ve.Lk)(
                            "button",
                            { onClick: i, disabled: (0, U.R1)(V).batch, textContent: (0, pe.v_)(t.value) },
                            null,
                            8,
                            Co
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["content"]
                    ),
                    (0, ve.Lk)(
                      "button",
                      {
                        onClick: u[0] || (u[0] = (e) => o(s, (0, U.R1)(n))),
                        disabled: (0, U.R1)(V).batch,
                        title: l.value,
                        textContent: (0, pe.v_)(a.value),
                      },
                      null,
                      8,
                      yo
                    ),
                  ])
                )
              },
            },
            Ro = { class: "mb-1c" },
            Lo = ["textContent"],
            wo = { key: 0, class: "flex flex-wrap center-items" },
            _o = ["textContent"],
            Eo = ["value"],
            So = ["textContent", "value"],
            Ao = ["textContent", "disabled"],
            Fo = ["disabled"],
            $o = ["textContent"],
            Xo = { key: 1, class: "mt-1c" },
            Io = { class: "sync-server-url" },
            Uo = ["textContent"],
            Wo = ["disabled"],
            Ko = { class: "mr-2c" },
            Oo = ["textContent"],
            To = ["disabled"],
            jo = { class: "inline-block" },
            Mo = ["textContent"],
            Do = ["disabled"],
            Vo = ["disabled"],
            Bo = ["textContent"],
            No = ["textContent", "disabled"],
            zo = { key: 2 },
            Ho = "sync.current",
            Qo = { current: "" }
          ;(0, he.A)(Ho, (e) => {
            Qo.current = e || ""
          })
          const Po = {
              components: { SettingCheck: ye.A, Icon: xe.A, Tooltip: Ce.A },
              data: () => ({ syncConfig: Qo, store: V }),
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
                  ;(0, S.dr)("SyncSetConfig", this.state.userConfig)
                },
                onSyncChange(e) {
                  const { value: t } = e.target
                  $.A.set(Ho, t)
                },
                onAuthorize() {
                  const { service: e } = this
                  ;["authorized"].includes(e.authState)
                    ? (0, S.dr)("SyncRevoke")
                    : ["no-auth", "unauthorized", "error"].includes(e.authState) && (0, S.dr)("SyncAuthorize")
                },
                onSync() {
                  ;(0, S.dr)("SyncStart")
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
            Yo = (0, _(6262).A)(Po, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var s, i
                  const u = (0, ve.g2)("icon"),
                    r = (0, ve.g2)("tooltip"),
                    c = (0, ve.g2)("setting-check")
                  return (
                    (0, ve.uX)(),
                    (0, ve.CE)("section", Ro, [
                      (0, ve.Lk)(
                        "h3",
                        {
                          textContent: (0, pe.v_)(e.i18n("labelSync")),
                          class: (0, pe.C4)({ bright: 1 === a.store.isEmpty }),
                        },
                        null,
                        10,
                        Lo
                      ),
                      o.state
                        ? ((0, ve.uX)(),
                          (0, ve.CE)("div", wo, [
                            (0, ve.Lk)("span", { textContent: (0, pe.v_)(e.i18n("labelSyncService")) }, null, 8, _o),
                            (0, ve.Lk)(
                              "select",
                              {
                                class: "mx-1",
                                value: a.syncConfig.current,
                                onChange: t[0] || (t[0] = (...e) => o.onSyncChange && o.onSyncChange(...e)),
                              },
                              [
                                ((0, ve.uX)(!0),
                                (0, ve.CE)(
                                  ve.FK,
                                  null,
                                  (0, ve.pI)(
                                    o.syncServices,
                                    (e) => (
                                      (0, ve.uX)(),
                                      (0, ve.CE)(
                                        "option",
                                        { key: e.name, textContent: (0, pe.v_)(e.displayName), value: e.name },
                                        null,
                                        8,
                                        So
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ],
                              40,
                              Eo
                            ),
                            o.service.name && "oauth" === o.state.authType
                              ? ((0, ve.uX)(),
                                (0, ve.CE)(
                                  "button",
                                  {
                                    key: 0,
                                    textContent: (0, pe.v_)(o.state.label),
                                    disabled: !o.state.canAuthorize,
                                    onClick: t[1] || (t[1] = (...e) => o.onAuthorize && o.onAuthorize(...e)),
                                  },
                                  null,
                                  8,
                                  Ao
                                ))
                              : (0, ve.Q3)("", !0),
                            o.service.name
                              ? ((0, ve.uX)(),
                                (0, ve.Wv)(
                                  r,
                                  { key: 1, content: e.i18n("labelSync"), class: "stretch-self flex mr-1" },
                                  {
                                    default: (0, ve.k6)(() => [
                                      (0, ve.Lk)(
                                        "button",
                                        {
                                          disabled: !o.state.canSync,
                                          onClick: t[2] || (t[2] = (...e) => o.onSync && o.onSync(...e)),
                                          class: "flex center-items",
                                        },
                                        [(0, ve.bF)(u, { name: "refresh" })],
                                        8,
                                        Fo
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["content"]
                                ))
                              : (0, ve.Q3)("", !0),
                            o.state
                              ? ((0, ve.uX)(),
                                (0, ve.CE)("p", { key: 2, textContent: (0, pe.v_)(o.state.message) }, null, 8, $o))
                              : (0, ve.Q3)("", !0),
                          ]))
                        : (0, ve.Q3)("", !0),
                      "password" === (null == (s = o.state) ? void 0 : s.authType)
                        ? ((0, ve.uX)(),
                          (0, ve.CE)("fieldset", Xo, [
                            (0, ve.Lk)("label", Io, [
                              (0, ve.Lk)(
                                "span",
                                { textContent: (0, pe.v_)(e.i18n("labelSyncServerUrl")) },
                                null,
                                8,
                                Uo
                              ),
                              (0, ve.bo)(
                                (0, ve.Lk)(
                                  "input",
                                  {
                                    type: "url",
                                    "onUpdate:modelValue": t[3] || (t[3] = (e) => (o.state.userConfig.serverUrl = e)),
                                    disabled: !o.state.canAuthorize,
                                  },
                                  null,
                                  8,
                                  Wo
                                ),
                                [[fe.Jo, o.state.userConfig.serverUrl]]
                              ),
                            ]),
                            (0, ve.Lk)("div", Ko, [
                              (0, ve.Lk)("label", null, [
                                (0, ve.Lk)(
                                  "span",
                                  { textContent: (0, pe.v_)(e.i18n("labelSyncUsername")) },
                                  null,
                                  8,
                                  Oo
                                ),
                                (0, ve.bo)(
                                  (0, ve.Lk)(
                                    "input",
                                    {
                                      type: "text",
                                      "onUpdate:modelValue": t[4] || (t[4] = (e) => (o.state.userConfig.username = e)),
                                      disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                    },
                                    null,
                                    8,
                                    To
                                  ),
                                  [[fe.Jo, o.state.userConfig.username]]
                                ),
                              ]),
                              (0, ve.Lk)("label", jo, [
                                (0, ve.Lk)(
                                  "span",
                                  { textContent: (0, pe.v_)(e.i18n("labelSyncPassword")) },
                                  null,
                                  8,
                                  Mo
                                ),
                                (0, ve.bo)(
                                  (0, ve.Lk)(
                                    "input",
                                    {
                                      type: "password",
                                      "onUpdate:modelValue": t[5] || (t[5] = (e) => (o.state.userConfig.password = e)),
                                      disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                    },
                                    null,
                                    8,
                                    Do
                                  ),
                                  [[fe.Jo, o.state.userConfig.password]]
                                ),
                              ]),
                              (0, ve.Lk)("label", null, [
                                (0, ve.bo)(
                                  (0, ve.Lk)(
                                    "input",
                                    {
                                      type: "checkbox",
                                      "onUpdate:modelValue": t[6] || (t[6] = (e) => (o.state.userConfig.anonymous = e)),
                                      disabled: !o.state.canAuthorize,
                                    },
                                    null,
                                    8,
                                    Vo
                                  ),
                                  [[fe.lH, o.state.userConfig.anonymous]]
                                ),
                                (0, ve.Lk)(
                                  "span",
                                  { textContent: (0, pe.v_)(e.i18n("labelSyncAnonymous")) },
                                  null,
                                  8,
                                  Bo
                                ),
                              ]),
                            ]),
                            (0, ve.Lk)("div", null, [
                              (0, ve.Lk)(
                                "button",
                                {
                                  textContent: (0, pe.v_)(e.i18n("buttonSave")),
                                  onClick:
                                    t[7] ||
                                    (t[7] = (0, fe.D$)(
                                      (...e) => o.onSaveUserConfig && o.onSaveUserConfig(...e),
                                      ["prevent"]
                                    )),
                                  disabled: !o.state.canAuthorize,
                                },
                                null,
                                8,
                                No
                              ),
                            ]),
                          ]))
                        : (0, ve.Q3)("", !0),
                      null != (i = o.service) && i.name
                        ? ((0, ve.uX)(),
                          (0, ve.CE)("div", zo, [
                            (0, ve.bF)(
                              c,
                              { name: "syncScriptStatus", label: e.i18n("labelSyncScriptStatus") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]))
                        : (0, ve.Q3)("", !0),
                    ])
                  )
                },
              ],
            ])
          var Jo = _(7029)
          const qo = ["textContent"],
            Go = { class: "mb-1 mr-1c flex center-items" },
            Zo = ["textContent"],
            es = ["disabled", "title"],
            ts = ["textContent"],
            ns = ["textContent"],
            ls = ["textContent"],
            as = ["textContent"],
            os = ["innerHTML"],
            ss = { class: "btn-ghost", style: { border: "none" } },
            is = ["textContent"],
            us = ["innerHTML"],
            rs = ["innerHTML"],
            cs = ["textContent"],
            ds = "editorTheme",
            vs = "editorThemeName",
            ps = [
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
            ms = "codemirror/CodeMirror",
            fs = "master",
            hs = "theme",
            bs = `https://github.com/${ms}/tree/${fs}/${hs}`,
            ks = "default",
            gs = {
              __name: "vm-editor",
              setup(e) {
                const t = (0, U.KR)(),
                  n = (0, U.KR)(),
                  l = (0, U.KR)(!1),
                  a = (0, U.KR)(),
                  o = (0, U.KR)(),
                  i = (0, U.KR)(),
                  u = (0, U.KR)(),
                  r = (0, U.KR)()
                async function v(e, t = "text") {
                  const n = (0, X.bq)()
                  o.value = !0
                  try {
                    const n = await (await fetch(e))[t]()
                    return (i.value = null), n
                  } catch (e) {
                    i.value = e.message || e.code || `${e}`
                  } finally {
                    ;(o.value = !1), await (0, ve.dY)(), null == n || n.focus()
                  }
                }
                async function p(e) {
                  let l
                  if (e) {
                    const e = ["mode", "value", "configureMouse", "lineNumberFormatter", "specialCharPlaceholder"],
                      t = {}
                    c
                      .entries({
                        ...(await d.resolve().then(_.t.bind(_, 5237, 23))).default.defaults,
                        ...Jo.A,
                        ...$.A.get("editor"),
                      })
                      .sort(([e], [t]) => (e < t ? -1 : e > t))
                      .filter(([t, n]) => !e.includes(t) && !s(n))
                      .forEach(([e, n]) => {
                        t[e] = n
                      }),
                      (l = JSON.stringify(t, null, "  "))
                  }
                  ;(n.value = l),
                    l &&
                      (await (0, ve.dY)(),
                      t.value.getBoundingClientRect().bottom > innerHeight &&
                        t.value.scrollIntoView({ behavior: "smooth" }))
                }
                return (
                  (0, ve.sV)(async () => {
                    let e
                    await $.A.ready,
                      (0, ve.wB)(l, p),
                      (0, ve.wB)(r, async (t) => {
                        if (e) return void (e = !1)
                        const n = t && t !== ks && `https://raw.githubusercontent.com/${ms}/${fs}/${hs}/${t}.css`,
                          l = n && (await v(n))
                        $.A.set(vs, !n || l ? t : ks), $.A.set(ds, l || "")
                      }),
                      (0, he.A)(vs, (t) => {
                        var n
                        r.value != (null != (n = t) ? n : (t = ks)) && ((e = !0), (r.value = t))
                      }),
                      (0, he.A)(ds, (e) => {
                        var t
                        u.value = (t = e)
                          ? t
                              .split("\n", 21)
                              .map((e, t) => (20 === t ? "..." : e.length > 100 && `${e.slice(0, 100)}...`) || e)
                              .join("\n")
                          : null
                      })
                  }),
                  (e, s) => (
                    (0, ve.uX)(),
                    (0, ve.CE)(
                      "section",
                      { ref_key: "$el", ref: t },
                      [
                        (0, ve.Lk)("h3", { textContent: (0, pe.v_)(e.i18n("labelEditor")) }, null, 8, qo),
                        (0, ve.Lk)("div", Go, [
                          (0, ve.Lk)("span", { textContent: (0, pe.v_)(e.i18n("labelTheme")) }, null, 8, Zo),
                          (0, ve.bo)(
                            (0, ve.Lk)(
                              "select",
                              {
                                "onUpdate:modelValue": s[0] || (s[0] = (e) => (r.value = e)),
                                disabled: o.value,
                                title: u.value,
                              },
                              [
                                (0, ve.Lk)(
                                  "option",
                                  { value: ks, textContent: (0, pe.v_)(e.i18n("labelRunAtDefault")) },
                                  null,
                                  8,
                                  ts
                                ),
                                (0, ve.Lk)(
                                  "option",
                                  { value: "", textContent: (0, pe.v_)(e.i18n("labelBadgeNone")) },
                                  null,
                                  8,
                                  ns
                                ),
                                ((0, ve.uX)(!0),
                                (0, ve.CE)(
                                  ve.FK,
                                  null,
                                  (0, ve.pI)(
                                    (0, U.R1)(ps),
                                    (e) => (
                                      (0, ve.uX)(),
                                      (0, ve.CE)("option", { key: e, textContent: (0, pe.v_)(e) }, null, 8, ls)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              es
                            ),
                            [[fe.u1, r.value]]
                          ),
                          (0, ve.Lk)("a", { href: bs, target: "_blank" }, "\u2197"),
                          (0, ve.Lk)("p", { textContent: (0, pe.v_)(i.value) }, null, 8, as),
                        ]),
                        (0, ve.Lk)("p", { class: "my-1", innerHTML: e.i18n("descEditorOptions") }, null, 8, os),
                        (0, ve.bF)(
                          (0, U.R1)(On.A),
                          { name: "editor", json: "", "has-reset": "", onDblclick: (0, U.R1)(de) },
                          {
                            default: (0, ve.k6)(() => [
                              (0, ve.Lk)(
                                "a",
                                { class: "ml-1", tabindex: "0", onClick: s[1] || (s[1] = (e) => (a.value = !a.value)) },
                                [(0, ve.bF)((0, U.R1)(xe.A), { name: "info" })]
                              ),
                              (0, ve.Lk)("label", ss, [
                                (0, ve.bo)(
                                  (0, ve.Lk)(
                                    "input",
                                    { type: "checkbox", "onUpdate:modelValue": s[2] || (s[2] = (e) => (l.value = e)) },
                                    null,
                                    512
                                  ),
                                  [[fe.lH, l.value]]
                                ),
                                (0, ve.Lk)(
                                  "span",
                                  { textContent: (0, pe.v_)(e.i18n("buttonShowEditorState")) },
                                  null,
                                  8,
                                  is
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["onDblclick"]
                        ),
                        a.value
                          ? ((0, ve.uX)(),
                            (0, ve.CE)(
                              ve.FK,
                              { key: 0 },
                              [
                                (0, ve.Lk)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsGeneric") },
                                  null,
                                  8,
                                  us
                                ),
                                (0, ve.Lk)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsVM") },
                                  null,
                                  8,
                                  rs
                                ),
                              ],
                              64
                            ))
                          : (0, ve.Q3)("", !0),
                        (0, ve.Lk)(
                          "pre",
                          { textContent: (0, pe.v_)(n.value), class: "monospace-font dim-hint" },
                          null,
                          8,
                          cs
                        ),
                      ],
                      512
                    )
                  )
                )
              },
            },
            Cs = ["textContent"],
            ys = { class: "flex flex-wrap" },
            xs = {
              __name: "vm-blacklist-body",
              props: { name: String, desc: String },
              setup(e) {
                const t = e,
                  n = () => (0, S.dr)("Storage", ["base", "getOne", t.name + Bt.Sr])
                return (t, l) => (
                  (0, ve.uX)(),
                  (0, ve.CE)(
                    ve.FK,
                    null,
                    [
                      (0, ve.Lk)("p", { textContent: (0, pe.v_)(e.desc), class: "mt-1" }, null, 8, Cs),
                      (0, ve.Lk)("div", ys, [
                        (0, ve.bF)((0, U.R1)(On.A), { name: e.name, class: "flex-1", "get-errors": n }, null, 8, [
                          "name",
                        ]),
                      ]),
                    ],
                    64
                  )
                )
              },
            },
            Rs = ["textContent"],
            Ls = ["href", "textContent"],
            ws = {
              __name: "vm-blacklist",
              setup: (e) => (e, t) => (
                (0, ve.uX)(),
                (0, ve.CE)("section", null, [
                  (0, ve.Lk)("h3", { textContent: (0, pe.v_)(e.i18n("labelBlacklist")) }, null, 8, Rs),
                  (0, ve.Lk)("p", null, [
                    (0, ve.Lk)(
                      "a",
                      (0, ve.v6)(
                        {
                          href: (0, U.R1)(Bt.oO) + "posts/smart-rules-for-blacklist/#blacklist-patterns",
                          textContent: (0, pe.v_)(e.i18n("learnBlacklist")),
                        },
                        (0, U.R1)(X.YY)
                      ),
                      null,
                      16,
                      Ls
                    ),
                  ]),
                  (0, ve.bF)((0, U.R1)(xs), { name: (0, U.R1)(Bt.kF), desc: e.i18n("descBlacklist") }, null, 8, [
                    "name",
                    "desc",
                  ]),
                  (0, ve.bF)((0, U.R1)(xs), { name: (0, U.R1)(Bt.Ez), desc: e.i18n("descBlacklistNet") }, null, 8, [
                    "name",
                    "desc",
                  ]),
                ])
              ),
            }
          var _s = _(8275)
          const Es = ["data-show-advanced"],
            Ss = ["textContent"],
            As = { class: "mb-1c" },
            Fs = ["textContent"],
            $s = { class: "mb-1c" },
            Xs = ["textContent"],
            Is = { class: "ml-2c flex flex-col" },
            Us = { class: "ml-2c flex flex-col" },
            Ws = { class: "mb-2c" },
            Ks = ["textContent"],
            Os = (0, ve.Lk)("hr", null, null, -1),
            Ts = ["open"],
            js = ["onClick"],
            Ms = { class: "mb-1c" },
            Ds = ["textContent"],
            Vs = ["onUpdate:modelValue"],
            Bs = ["value", "textContent"],
            Ns = { class: "ml-2c flex flex-col" },
            zs = ["textContent"],
            Hs = ["onUpdate:modelValue"],
            Qs = ["textContent"],
            Ps = ["href", "textContent"],
            Ys = (0, ve.Lk)("code", null, "page", -1),
            Js = ["textContent"],
            qs = { key: 0 },
            Gs = (0, ve.Lk)("code", null, "page", -1),
            Zs = { class: "flex flex-col" },
            ei = ["textContent"],
            ti = ["href"],
            ni = ["textContent"],
            li = ["textContent"],
            ai = ["innerHTML"],
            oi = {
              autoUpdate: (e) => Math.max(0, Math.min(365, +e || 0)),
              defaultInjectInto: { ...Bt.FB },
              showAdvanced: (e) => e,
              uiTheme: {
                "": (0, S.Ru)("optionUiThemeAuto"),
                dark: (0, S.Ru)("optionUiThemeDark"),
                light: (0, S.Ru)("optionUiThemeLight"),
              },
              xhrInject: (e) => e,
            },
            si = {
              __name: "index",
              setup(e) {
                const t = (0, U.KR)(),
                  l = (0, U.Kh)({}),
                  a = (0, U.KR)(),
                  o = () => (0, X.bq)().dispatchEvent(new Event("ctrl-s"))
                let s
                return (
                  (0, ve.n)(() => {
                    ;(0, X.T3)(t.value),
                      (s = [
                        me.vW.register("ctrlcmd-s", o, { condition: "inputFocus" }),
                        ...(0, _s.Gg)(oi, l, ve.wB, 50),
                      ]),
                      (a.value = c.keys($.A.get(n)).map((e) => [e, decodeURIComponent(e)]))
                  }),
                  (0, ve.Y4)(() => {
                    s.forEach((e) => e()), (s = null)
                  }),
                  (e, n) => (
                    (0, ve.uX)(),
                    (0, ve.CE)(
                      "div",
                      { ref_key: "$el", ref: t, class: "tab-settings", "data-show-advanced": l.showAdvanced },
                      [
                        (0, ve.Lk)("h1", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelSettings")) }, null, 8, Ss),
                        (0, ve.Lk)("section", As, [
                          (0, ve.Lk)("h3", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("optionPopup")) }, null, 8, Fs),
                          (0, ve.bF)(Ba.A),
                        ]),
                        (0, ve.Lk)("section", $s, [
                          (0, ve.Lk)("h3", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("optionUpdate")) }, null, 8, Xs),
                          (0, ve.Lk)("div", Is, [
                            (0, ve.Lk)("label", null, [
                              (0, ve.bF)(
                                (0, U.R1)(Vt.A),
                                { "i18n-key": "labelAutoUpdate" },
                                {
                                  default: (0, ve.k6)(() => [
                                    (0, ve.bo)(
                                      (0, ve.Lk)(
                                        "input",
                                        {
                                          "onUpdate:modelValue": n[0] || (n[0] = (e) => (l.autoUpdate = e)),
                                          type: "number",
                                          min: "0",
                                          max: "365",
                                          step: "1/",
                                        },
                                        null,
                                        512
                                      ),
                                      [[fe.Jo, l.autoUpdate]]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, ve.bF)(
                              (0, U.R1)(ye.A),
                              { name: (0, U.R1)(ko.qL), label: (0, U.R1)(S.Ru)("labelEnabledScriptsOnly") },
                              null,
                              8,
                              ["name", "label"]
                            ),
                          ]),
                          (0, ve.Lk)("div", Us, [
                            (0, ve.bF)(
                              (0, U.R1)(ye.A),
                              { name: "notifyUpdates", label: (0, U.R1)(S.Ru)("labelNotifyUpdates") },
                              null,
                              8,
                              ["label"]
                            ),
                            (0, ve.bF)(
                              (0, U.R1)(ye.A),
                              {
                                name: "notifyUpdatesGlobal",
                                label: (0, U.R1)(S.Ru)("labelNotifyUpdatesGlobal"),
                                class: "ml-2",
                              },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                        ]),
                        (0, ve.Lk)("section", Ws, [
                          (0, ve.Lk)(
                            "h3",
                            {
                              textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelBackupMaintenance")),
                              class: (0, pe.C4)({ bright: 1 === (0, U.R1)(V).isEmpty }),
                            },
                            null,
                            10,
                            Ks
                          ),
                          (0, ve.bF)((0, U.R1)(eo)),
                          (0, ve.bF)((0, U.R1)(bo)),
                          Os,
                          (0, ve.bF)((0, U.R1)(xo)),
                        ]),
                        (0, ve.bF)((0, U.R1)(Yo)),
                        ((0, ve.uX)(!0),
                        (0, ve.CE)(
                          ve.FK,
                          null,
                          (0, ve.pI)(
                            { showAdvanced: l },
                            (e, t) => (
                              (0, ve.uX)(),
                              (0, ve.CE)(
                                "details",
                                { key: t, open: e[t] },
                                [
                                  (0, ve.Lk)(
                                    "summary",
                                    { onClick: (0, fe.D$)((n) => (e[t] = !e[t]), ["prevent"]) },
                                    [
                                      ((0, ve.uX)(),
                                      (0, ve.Wv)(
                                        (0, ve.$y)(e[t] ? "h1" : "h3"),
                                        {
                                          textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelAdvanced")),
                                          class: "inline-block",
                                        },
                                        null,
                                        8,
                                        ["textContent"]
                                      )),
                                    ],
                                    8,
                                    js
                                  ),
                                  (0, ve.Lk)("section", Ms, [
                                    (0, ve.Lk)(
                                      "h3",
                                      { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelGeneral")) },
                                      null,
                                      8,
                                      Ds
                                    ),
                                    (0, ve.Lk)("div", null, [
                                      (0, ve.Lk)("label", null, [
                                        (0, ve.bF)(
                                          (0, U.R1)(Vt.A),
                                          { "i18n-key": "optionUiTheme" },
                                          {
                                            default: (0, ve.k6)(() => [
                                              ((0, ve.uX)(),
                                              (0, ve.CE)(
                                                ve.FK,
                                                null,
                                                (0, ve.pI)(["uiTheme"], (e) =>
                                                  (0, ve.bo)(
                                                    (0, ve.Lk)(
                                                      "select",
                                                      { "onUpdate:modelValue": (t) => (l[e] = t), key: e },
                                                      [
                                                        ((0, ve.uX)(!0),
                                                        (0, ve.CE)(
                                                          ve.FK,
                                                          null,
                                                          (0, ve.pI)(
                                                            oi[e],
                                                            (e, t) => (
                                                              (0, ve.uX)(),
                                                              (0, ve.CE)(
                                                                "option",
                                                                { key: t, value: t, textContent: (0, pe.v_)(e) },
                                                                null,
                                                                8,
                                                                Bs
                                                              )
                                                            )
                                                          ),
                                                          128
                                                        )),
                                                      ],
                                                      8,
                                                      Vs
                                                    ),
                                                    [[fe.u1, l[e]]]
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
                                    (0, ve.Lk)("div", Ns, [
                                      (0, ve.Lk)("label", null, [
                                        (0, ve.Lk)(
                                          "span",
                                          { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelInjectionMode")) },
                                          null,
                                          8,
                                          zs
                                        ),
                                        ((0, ve.uX)(),
                                        (0, ve.CE)(
                                          ve.FK,
                                          null,
                                          (0, ve.pI)(["defaultInjectInto"], (e) =>
                                            (0, ve.bo)(
                                              (0, ve.Lk)(
                                                "select",
                                                { "onUpdate:modelValue": (t) => (l[e] = t), key: e },
                                                [
                                                  ((0, ve.uX)(!0),
                                                  (0, ve.CE)(
                                                    ve.FK,
                                                    null,
                                                    (0, ve.pI)(
                                                      oi[e],
                                                      (e, t) => (
                                                        (0, ve.uX)(),
                                                        (0, ve.CE)(
                                                          "option",
                                                          { key: t, textContent: (0, pe.v_)(t) },
                                                          null,
                                                          8,
                                                          Qs
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                ],
                                                8,
                                                Hs
                                              ),
                                              [[fe.u1, l[e]]]
                                            )
                                          ),
                                          64
                                        )),
                                        (0, ve.Lk)(
                                          "a",
                                          (0, ve.v6)(
                                            {
                                              class: "ml-1",
                                              href: (0, U.R1)(Bt.oO) + "posts/inject-into-context/",
                                              ref_for: !0,
                                            },
                                            (0, U.R1)(X.YY),
                                            { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("learnInjectionMode")) }
                                          ),
                                          null,
                                          16,
                                          Ps
                                        ),
                                      ]),
                                      (0, ve.bF)(
                                        (0, U.R1)(Ce.A),
                                        { content: (0, U.R1)(S.Ru)("labelXhrInjectHint") },
                                        {
                                          default: (0, ve.k6)(() => [
                                            (0, ve.bF)(
                                              (0, U.R1)(ye.A),
                                              { name: "xhrInject" },
                                              {
                                                default: (0, ve.k6)(() => [
                                                  (0, ve.bF)(
                                                    (0, U.R1)(Vt.A),
                                                    { "i18n-key": "labelXhrInject" },
                                                    { default: (0, ve.k6)(() => [Ys]), _: 1 }
                                                  ),
                                                  (0, ve.eW)(),
                                                  (0, ve.Lk)(
                                                    "ruby",
                                                    { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelXhrInjectNote")) },
                                                    null,
                                                    8,
                                                    Js
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
                                      l.xhrInject
                                        ? (0, ve.Q3)("", !0)
                                        : ((0, ve.uX)(),
                                          (0, ve.CE)("label", qs, [
                                            (0, ve.bF)((0, U.R1)(ye.A), { name: "ffInject" }),
                                            (0, ve.bF)(
                                              (0, U.R1)(Ce.A),
                                              { content: (0, U.R1)(S.Ru)("labelFastFirefoxInjectHint") },
                                              {
                                                default: (0, ve.k6)(() => [
                                                  (0, ve.bF)(
                                                    (0, U.R1)(Vt.A),
                                                    { "i18n-key": "labelFastFirefoxInject" },
                                                    { default: (0, ve.k6)(() => [Gs]), _: 1 }
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["content"]
                                            ),
                                          ])),
                                    ]),
                                    (0, ve.Lk)("div", Zs, [
                                      (0, ve.bF)(
                                        (0, U.R1)(Vt.A),
                                        { "i18n-key": "labelExposeStatus" },
                                        {
                                          default: (0, ve.k6)(() => [
                                            ((0, ve.uX)(!0),
                                            (0, ve.CE)(
                                              ve.FK,
                                              null,
                                              (0, ve.pI)(
                                                a.value,
                                                ([e, t]) => (
                                                  (0, ve.uX)(),
                                                  (0, ve.Wv)(
                                                    (0, U.R1)(ye.A),
                                                    { key: t, name: `expose.${e}`, class: "ml-2 mr-1c" },
                                                    {
                                                      default: (0, ve.k6)(() => [
                                                        (0, ve.Lk)("span", { textContent: (0, pe.v_)(t) }, null, 8, ei),
                                                        (0, ve.Lk)(
                                                          "a",
                                                          (0, ve.v6)(
                                                            { href: `https://${t}`, ref_for: !0 },
                                                            (0, U.R1)(X.YY)
                                                          ),
                                                          "\u2197",
                                                          16,
                                                          ti
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
                                    (0, ve.bF)(
                                      (0, U.R1)(ye.A),
                                      { name: "helpForLocalFile", label: (0, U.R1)(S.Ru)("helpForLocalFile") },
                                      null,
                                      8,
                                      ["label"]
                                    ),
                                  ]),
                                  (0, ve.bF)((0, U.R1)(gs)),
                                  (0, ve.Lk)("section", null, [
                                    (0, ve.Lk)(
                                      "h3",
                                      { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelScriptTemplate")) },
                                      null,
                                      8,
                                      ni
                                    ),
                                    (0, ve.Lk)("p", null, [
                                      ((0, ve.uX)(!0),
                                      (0, ve.CE)(
                                        ve.FK,
                                        null,
                                        (0, ve.pI)(
                                          (0, U.R1)(S.Ru)("descScriptTemplate").split(/<(\S+?)>/),
                                          (e, t) => (
                                            (0, ve.uX)(),
                                            (0, ve.Wv)(
                                              (0, ve.$y)(t % 2 ? "code" : "span"),
                                              { textContent: (0, pe.v_)(e), key: t },
                                              null,
                                              8,
                                              ["textContent"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                      (0, ve.eW)(),
                                      (0, ve.bF)((0, U.R1)(oo)),
                                    ]),
                                    (0, ve.bF)((0, U.R1)(On.A), { name: (0, U.R1)(ko.jI), "has-reset": "" }, null, 8, [
                                      "name",
                                    ]),
                                  ]),
                                  (0, ve.bF)((0, U.R1)(ws)),
                                  (0, ve.Lk)("section", null, [
                                    (0, ve.Lk)(
                                      "h3",
                                      { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelCustomCSS")) },
                                      null,
                                      8,
                                      li
                                    ),
                                    (0, ve.Lk)("p", { innerHTML: (0, U.R1)(S.Ru)("descCustomCSS") }, null, 8, ai),
                                    (0, ve.bF)((0, U.R1)(On.A), { name: "customCSS" }),
                                  ]),
                                ],
                                8,
                                Ts
                              )
                            )
                          ),
                          128
                        )),
                      ],
                      8,
                      Es
                    )
                  )
                )
              },
            },
            ii = si,
            ui = { class: "tab-about mb-2c" },
            ri = { class: "mt-0 mr-1c" },
            ci = ["textContent"],
            di = ["textContent"],
            vi = ["textContent"],
            pi = ["textContent"],
            mi = ["href", "textContent"],
            fi = ["textContent"],
            hi = ["textContent"],
            bi = ["href", "textContent"],
            ki = "https://github.com/violentmonkey/violentmonkey/",
            gi = {
              __name: "tab-about",
              setup(e) {
                const t = y.name,
                  n = browser.i18n.getUILanguage(),
                  l = {
                    [Bt.oO]: (0, S.Ru)("labelHomepage"),
                    [ki + "issues"]: (0, S.Ru)("labelFeedback"),
                    [ki + "graphs/contributors"]: (0, S.Ru)("labelContributors"),
                    [Bt.oO + "privacy/"]: (0, S.Ru)("labelPrivacyPolicy"),
                  }
                return (e, a) => (
                  (0, ve.uX)(),
                  (0, ve.CE)("div", ui, [
                    (0, ve.Lk)("h1", ri, [
                      (0, ve.Lk)("span", { textContent: (0, pe.v_)((0, U.R1)(t)) }, null, 8, ci),
                      (0, ve.Lk)("small", { textContent: (0, pe.v_)(`v${(0, U.R1)("2.30.0")}`) }, null, 8, di),
                    ]),
                    (0, ve.Lk)("p", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("extDescription")) }, null, 8, vi),
                    (0, ve.Lk)("div", null, [
                      (0, ve.Lk)("label", { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelRelated")) }, null, 8, pi),
                      (0, ve.Lk)("ul", null, [
                        ((0, ve.uX)(),
                        (0, ve.CE)(
                          ve.FK,
                          null,
                          (0, ve.pI)(l, (e, t) =>
                            (0, ve.Lk)("li", { key: t }, [
                              (0, ve.Lk)(
                                "a",
                                (0, ve.v6)({ href: t, ref_for: !0 }, (0, U.R1)(X.YY), { textContent: (0, pe.v_)(e) }),
                                null,
                                16,
                                mi
                              ),
                            ])
                          ),
                          64
                        )),
                      ]),
                    ]),
                    (0, ve.Lk)("div", null, [
                      (0, ve.Lk)(
                        "label",
                        { textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelCurrentLang")) },
                        null,
                        8,
                        fi
                      ),
                      (0, ve.Lk)("span", { class: "current", textContent: (0, pe.v_)((0, U.R1)(n)) }, null, 8, hi),
                      (0, ve.eW)(" | "),
                      (0, ve.Lk)(
                        "a",
                        (0, ve.v6)({ href: (0, U.R1)(Bt.oO) + "localization/" }, (0, U.R1)(X.YY), {
                          textContent: (0, pe.v_)((0, U.R1)(S.Ru)("labelHelpTranslate")),
                        }),
                        null,
                        16,
                        bi
                      ),
                    ]),
                  ])
                )
              },
            },
            Ci = { class: "page-options" },
            yi = { key: 0 },
            xi = { class: "aside-content" },
            Ri = (0, ve.Lk)("img", { src: "/public/images/icon128.png" }, null, -1),
            Li = ["textContent"],
            wi = (0, ve.Lk)("hr", null, null, -1),
            _i = ["href", "data-num-scripts", "textContent"],
            Ei = "!editScript",
            Si = {
              __name: "app",
              setup(e) {
                const t = [
                    { name: o, comp: Va, label: (0, S.Ru)("sideMenuInstalled") },
                    { name: x, comp: ii, label: (0, S.Ru)("sideMenuSettings") },
                    { name: R, comp: gi, label: (0, S.Ru)("sideMenuAbout") },
                    { name: L, comp: Va, label: (0, S.Ru)("buttonRecycleBin") },
                  ],
                  n = (0, S.Ru)("extName"),
                  l = (0, ve.EW)(() => {
                    const e = V.route.paths[0]
                    return t.find((t) => t.name === e) || t[0]
                  }),
                  a = (0, ve.EW)(() => ({ [o]: V.scripts.length, [L]: V.removedScripts.length }))
                function s() {
                  const e = l.value.name === o,
                    { paths: t } = V.route
                  me.vW.setContext("editScript", e && t[1]),
                    me.vW.setContext("tabScripts", e && !t[1]),
                    me.vW.setContext("showRecycle", l.value.name === L)
                }
                function i(e) {
                  const n = t.indexOf(l.value),
                    a = t[(n + e + t.length) % t.length]
                  ce((null == a ? void 0 : a.name) || "")
                }
                v(
                  "dragover",
                  (e) => {
                    var t
                    V.route.hash !== x &&
                      /^application\/(zip|x-zip-compressed)$/.test(
                        null == (t = e.dataTransfer.items[0]) ? void 0 : t.type
                      ) &&
                      ce(x)
                  },
                  !0
                )
                const [u, r] = V.route.paths,
                  c = (0, U.KR)(u !== o || ("_new" !== r && !Number(r)))
                return (
                  (0, ve.nT)(() => {
                    const { title: e } = V
                    document.title = e ? `${e} - ${n}` : n
                  }),
                  (0, ve.wB)(
                    () => V.route.paths,
                    () => {
                      ;(c.value = !0), s()
                    }
                  ),
                  (0, ve.sV)(() => {
                    const e = [
                      me.vW.register("a-pageup", () => i(-1), { condition: Ei }),
                      me.vW.register("a-pagedown", () => i(1), { condition: Ei }),
                    ]
                    return (
                      me.vW.enable(),
                      s(),
                      () => {
                        e.forEach((e) => {
                          e()
                        }),
                          me.vW.disable()
                      }
                    )
                  }),
                  (e, n) => (
                    (0, ve.uX)(),
                    (0, ve.CE)("div", Ci, [
                      c.value
                        ? ((0, ve.uX)(),
                          (0, ve.CE)("aside", yi, [
                            (0, ve.Lk)("div", xi, [
                              Ri,
                              (0, ve.Lk)(
                                "h1",
                                { class: "hidden-sm", textContent: (0, pe.v_)((0, U.R1)(S.Ru)("extName")) },
                                null,
                                8,
                                Li
                              ),
                              wi,
                              ((0, ve.uX)(),
                              (0, ve.CE)(
                                ve.FK,
                                null,
                                (0, ve.pI)(t, (e) =>
                                  (0, ve.Lk)("div", { class: "aside-menu-item", key: e.name }, [
                                    (0, ve.Lk)(
                                      "a",
                                      {
                                        href: `#${e.name}`,
                                        class: (0, pe.C4)({ active: e === l.value }),
                                        "data-num-scripts": a.value[e.name],
                                        textContent: (0, pe.v_)(e.label),
                                      },
                                      null,
                                      10,
                                      _i
                                    ),
                                  ])
                                ),
                                64
                              )),
                            ]),
                          ]))
                        : (0, ve.Q3)("", !0),
                      ((0, ve.uX)(),
                      (0, ve.Wv)(
                        ve.PR,
                        null,
                        [((0, ve.uX)(), (0, ve.Wv)((0, ve.$y)(l.value.comp), { class: "tab" }))],
                        1024
                      )),
                    ])
                  )
                )
              },
            },
            Ai = Si,
            Fi = [
              (0, S.Ru)("editNavCode"),
              (0, S.Ru)("editNavSettings"),
              (0, S.Ru)("editNavValues"),
              "@require",
              "@resource",
            ]
          let $i
          function Xi(e, t, n) {
            const l = e.$cache || (e.$cache = {}),
              a = e.meta || {},
              { custom: o } = e,
              s = (0, S.ak)(a, q),
              i = k(S.fj, [a[q], s, a[Q], (0, S.ak)(a, Q), o[q], o[Q]], "\n"),
              u = o[q] || s
            let r = 0,
              c = ""
            t.forEach((e, t) => {
              ;(r += e), e && (c += `${Fi[t]}: ${(0, S.Ad)(e)}\n`)
            }),
              (l.desc = i),
              (l.name = u),
              (l.lowerName = u.toLocaleLowerCase()),
              (l.tags = o.tags || ""),
              (l.size = (0, S.Ad)(r, !0).replace(" ", "")),
              (l.sizes = c.slice(0, -1).replace(/\x20/g, "\xa0").replace(/[^B]$/gm, "$&B")),
              (l.sizeNum = r),
              (l[ne] = t[2]),
              n && (l.code = n),
              (e.$canUpdate = (0, S.MO)(e) && (e.config.shouldUpdate ? 1 : -1)),
              (0, F.P)(e, V, !0)
          }
          function Ii() {
            const e = +V.route.paths[1]
            return Ui(e).catch(e && (() => Ui()))
          }
          async function Ui(e) {
            const [t] = await d.all([(0, S.dr)("GetData", { id: e, sizes: !0 }, { retry: !0 }), $.A.ready]),
              { [o]: n, sizes: l, ...a } = t
            c.assign(V, a)
            const s = [],
              i = []
            n.forEach((e, t) => {
              Xi(e, l[t]), (e.config.removed ? i : s).push(e)
            }),
              (V.scripts = s),
              (V.removedScripts = i),
              (V.loading = !1)
          }
          ;(V.loading = !0),
            Ii(),
            c.assign(A.A, {
              ScriptsUpdated() {
                Ii()
              },
              UpdateSync(e) {
                V.sync = e
              },
              async UpdateScript({ update: e, where: t, code: n } = {}) {
                var l
                if (!e) return
                ;($i || (($i = V.batch) && ($i = d.race([$i, (0, S.F1)(500)])))) && (await $i, ($i = null))
                const a = V.scripts.findIndex((e) => e.props.id === t.id),
                  s = V.removedScripts.findIndex((e) => e.props.id === t.id),
                  i = V.scripts[a] || V.removedScripts[s] || (e.meta && V.canRenderScripts && {})
                if (!i) return
                const [u] = await (0, S.dr)("GetSizes", [t.id]),
                  { search: r } = V
                if (
                  (c.assign(i, e),
                  i.error && !e.error && (i.error = null),
                  Xi(i, u, n),
                  r && D([i], r.rules),
                  null != (null == (l = e.config) ? void 0 : l.removed) &&
                    (e.config.removed
                      ? (V.needRefresh = !0)
                      : (V.removedScripts = V.removedScripts.filter((e) => e.props.id !== t.id))),
                  (i.config.removed ? s : a) < 0)
                ) {
                  i.message = ""
                  const e = i.config.removed ? "removedScripts" : o
                  V[e] = [...V[e], i]
                }
              },
              RemoveScripts(e) {
                V.removedScripts = V.removedScripts.filter((t) => !e.includes(t.props.id))
              },
            }),
            (0, X.XX)(Ai)
        },
        9717: (e, t, n) => {
          var l = {
            "./arrow.svg": 3108,
            "./author.svg": 6600,
            "./code.svg": 9010,
            "./cog.svg": 2006,
            "./command.svg": 180,
            "./filter.svg": 75,
            "./home.svg": 5244,
            "./info.svg": 1745,
            "./more.svg": 8974,
            "./plus.svg": 3097,
            "./question.svg": 1057,
            "./refresh.svg": 6390,
            "./search.svg": 7413,
            "./toggle-off.svg": 2541,
            "./toggle-on.svg": 4441,
            "./trash.svg": 9761,
            "./undo.svg": 2523,
          }
          function a(e) {
            var t = o(e)
            return n(t)
          }
          function o(e) {
            if (!n.o(l, e)) {
              var t = new r("Cannot find module '" + e + "'")
              throw ((t.code = "MODULE_NOT_FOUND"), t)
            }
            return l[e]
          }
          ;(a.keys = () => c.keys(l)), (a.resolve = o), (e.exports = a), (a.id = 9717)
        },
      },
      A = {}
    function F(e) {
      var t = A[e]
      if (void 0 !== t) return t.exports
      var n = (A[e] = { exports: {} })
      return S[e].call(n.exports, n, n.exports, F), n.exports
    }
    ;(F.m = S),
      (h = []),
      (F.O = (e, t, n, l) => {
        if (!t) {
          var a = 1 / 0
          for (u = 0; u < h.length; u++) {
            for (var [t, n, l] = h[u], o = !0, s = 0; s < t.length; s++)
              (!1 & l || a >= l) && c.keys(F.O).every((e) => F.O[e](t[s]))
                ? t.splice(s--, 1)
                : ((o = !1), l < a && (a = l))
            if (o) {
              h.splice(u--, 1)
              var i = n()
              void 0 !== i && (e = i)
            }
          }
          return e
        }
        l = l || 0
        for (var u = h.length; u > 0 && h[u - 1][2] > l; u--) h[u] = h[u - 1]
        h[u] = [t, n, l]
      }),
      (F.n = (e) => {
        var t = e && e.__esModule ? () => e.default : () => e
        return F.d(t, { a: t }), t
      }),
      (E = c.getPrototypeOf ? (e) => c.getPrototypeOf(e) : (e) => e.__proto__),
      (F.t = function (e, t) {
        if ((1 & t && (e = this(e)), 8 & t)) return e
        if ("object" == typeof e && e) {
          if (4 & t && e.__esModule) return e
          if (16 & t && "function" == typeof e.then) return e
        }
        var n = c.create(null)
        F.r(n)
        var l = {}
        _ = _ || [null, E({}), E([]), E(E)]
        for (var a = 2 & t && e; "object" == typeof a && !~_.indexOf(a); a = E(a))
          c.getOwnPropertyNames(a).forEach((t) => (l[t] = () => e[t]))
        return (l.default = () => e), F.d(n, l), n
      }),
      (F.d = (e, t) => {
        for (var n in t) F.o(t, n) && !F.o(e, n) && c.defineProperty(e, n, { enumerable: !0, get: t[n] })
      }),
      (F.o = (e, t) => c.prototype.hasOwnProperty.call(e, t)),
      (F.r = (e) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          c.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          c.defineProperty(e, "__esModule", { value: !0 })
      }),
      (F.j = 905),
      (() => {
        var e = { 905: 0 }
        F.O.j = (t) => 0 === e[t]
        var t = (t, n) => {
            var l,
              a,
              [o, s, i] = n,
              u = 0
            if (o.some((t) => 0 !== e[t])) {
              for (l in s) F.o(s, l) && (F.m[l] = s[l])
              if (i) var r = i(F)
            }
            for (t && t(n); u < o.length; u++) (a = o[u]), F.o(e, a) && e[a] && e[a][0](), (e[a] = 0)
            return F.O(r)
          },
          n = (self.webpackChunkviolentmonkey = self.webpackChunkviolentmonkey || [])
        n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)))
      })()
    var $ = F.O(void 0, [921, 987], () => F(9653))
    $ = F.O($)
  })()
}
