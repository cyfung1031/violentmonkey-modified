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

    while (1) {

      const cmBox = await observablePromise(() => [...document.querySelectorAll('.CodeMirror:not([cm-checked])')].filter(e => e.CodeMirror && typeof e.CodeMirror.getValue === 'function' && typeof e.CodeMirror.setValue === 'function')[0]).obtain();
      const cm = cmBox.CodeMirror;
      if (!cm) return;

      if (promiseReady) await promiseReady.then();
      promiseReady = new PromiseExternal();
      cmBox.setAttribute('cm-checked', '');

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
    b = u.call.bind(u.call),
    w = "contextualIdentities" in g,
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
        7044: (h, U, z) => {
          "use strict"
          z.d(U, { m: () => Gs }), z(1871)
          var D = z(5313),
            $ = z(6711),
            H = z(2477),
            j = z(5010),
            W = z(1226),
            R = (z(3700), z(9994)),
            T = z(2262),
            I = z(9518)
          const M =
              /\s*(!)?(\#|(name|code|desc)(\+re)?:|(re:)|)('((?:[^']+|'')*)('|$)|"((?:[^"]+|"")*)("|$)|\/(\S+?)\/([a-z]*)|\S+)(?:\s+|$)/y,
            E = /''/g,
            O = /""/g
          function V(e) {
            const t = [],
              n = [],
              l = [],
              a = []
            M.lastIndex = 0
            for (let o; (o = M.exec(e)); ) {
              let e,
                [, i, s, r = "", u, d, p, m, g, v = m, h = g, f, b = ""] = o
              if (v) {
                if (!h) throw new c("Unmatched quotes")
                e = v.replace(m ? E : O, v[0])
              } else e = p
              ;(i = !!i),
                n.push({ negative: i, prefix: s, raw: p, parsed: e }),
                "#" === s
                  ? ((e = (0, D.cn)(e).replace(/\./g, "\\.")), e && (i ? a : l).push(e))
                  : (u || d ? (b = "i") : f ? (e = f) : (e === e.toLocaleLowerCase() && (b = "i"), (e = (0, D.YC)(e))),
                    t.push({ negative: i, scope: r, re: new RegExp(e, b.includes("u") ? b : b + "u") }))
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
          function Z({ re: e, negative: t, scope: n }) {
            return t ^ (e.test(this[n || "desc"]) || (!n && e.test(this.code)))
          }
          function Y(e, t) {
            let n = 0
            for (let l = 0; l < e.length; l++) {
              const { $cache: a } = e[l]
              n += a.show = t.every(Z, a)
            }
            return n
          }
          const L = (0, T.qj)({
              route: I.BC,
              batch: null,
              canRenderScripts: [o, k, ""].includes(I.BC.hash),
              scripts: [],
              removedScripts: [],
              loading: !1,
              needRefresh: !1,
              storageSize: 0,
              sync: [],
              title: null,
            }),
            P = "include",
            A = "match",
            F = "exclude",
            q = "excludeMatch"
          function N(e, t) {
            return (0, D.gj)("MarkRemoved", { id: e.props.id, removed: t })
          }
          async function B(e, ...t) {
            try {
              await (L.batch = e(...t) || !0)
            } finally {
              L.batch = !1
            }
          }
          function K(e) {
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
          var J = z(6252),
            G = z(2502)
          const X = { class: "page-options" },
            Q = { key: 0 },
            ee = { class: "aside-content" },
            te = (0, J._)("img", { src: "/public/images/icon128.png" }, null, -1),
            ne = ["textContent"],
            le = (0, J._)("hr", null, null, -1),
            ae = ["href", "data-num-scripts", "textContent"]
          var oe = z(7458),
            ie = z(9963),
            se = z(5168),
            re = z(2380),
            ce = z(392),
            ue = z(9824),
            de = z(7407),
            pe = z(6877),
            me = z(6653)
          const ge = ".script",
            ve = 50,
            he = 20,
            fe = 16,
            be = 500,
            we = W.T
              ? { start: "touchstart", move: "touchmove", end: "touchend" }
              : { start: "dragstart", move: "mousemove", end: "mouseup" },
            ye = W.T && u.assign(document.createElement("div"), { className: "dragging-noscroll" }),
            xe = ["scroll", "mouseenter", "mouseleave"]
          let Ce, _e, ke, Se, Ue, ze, De, $e, He, je, We, Re, Te, Ie, Me, Ee, Oe, Ve
          function Ze(e, t, n) {
            const l = n ? p : m
            ;(We = e),
              (Re = t),
              b(l, We, we.start, W.T ? Ae : Ne),
              W.T || (b(l, We, "dblclick", Ye, !0), b(l, We, "mousedown", Le, !0), n || Pe())
          }
          function Ye(e) {
            const t = getSelection(),
              n = e.target.closest(".script-name")
            n && (t.removeAllRanges(), t.selectAllChildren(n))
          }
          function Le(e) {
            !e.altKey && lt(e) && (je.draggable = !0), b(p, We, "mouseup", Pe, !0)
          }
          function Pe() {
            je && (je.draggable = !1), b(m, We, "mouseup", Pe, !0)
          }
          function Ae(e) {
            lt(e) && ((ze = e), (De = setTimeout(Fe, be, "timer")), p(we.move, Fe), p(we.end, qe))
          }
          function Fe(e) {
            qe(), "timer" === e && (b(Ne, je, ze), w && Ge() && ((We.scrollTop += 1), (We.scrollTop -= 1)))
          }
          function qe() {
            clearTimeout(De), m(we.move, Fe), m(we.end, qe)
          }
          function Ne(e) {
            var t
            if (!lt(e)) return
            e.cancelable && e.preventDefault()
            const { clientX: n, clientY: l } = (null == (t = e.touches) ? void 0 : t[0]) || e,
              a = je.getBoundingClientRect(),
              o = We.getBoundingClientRect()
            ;(Ce = je.cloneNode(!0)),
              (_e = b([].filter, We.children, (e) => "none" !== e.style.display)),
              (Se = _e.indexOf(je)),
              (Ue = Se),
              _e.splice(Se, 1),
              (ke = a.height),
              ($e = n - a.left),
              (He = l - a.top),
              (Te = o.top + ve),
              (Ie = o.bottom - ve),
              (Ve = {}),
              je.classList.add("dragging-placeholder"),
              Ce.classList.add("dragging"),
              (Ce.style.transform = `translate(${a.left}px, ${a.top}px)`),
              (Ce.style.width = `${a.width}px`),
              We.appendChild(Ce),
              W.T && We.insertAdjacentElement("afterBegin", ye),
              p(we.move, Be),
              p(we.end, Ke)
          }
          function Be(e) {
            var t
            const { clientX: n, clientY: l, target: a } = (null == (t = e.touches) ? void 0 : t[0]) || e
            let o
            const i = W.T ? nt(n, l) : null == a.closest ? void 0 : a.closest(ge)
            if (i && i !== je) {
              const e = i.getBoundingClientRect(),
                t = l > e.top + e.height / 2
              ;(o = je !== i[(t ? "next" : "previous") + "ElementSibling"]),
                o && (i.insertAdjacentElement(t ? "afterEnd" : "beforeBegin", je), Je(_e.indexOf(i) + t))
            }
            ;(Ce.style.transform = `translate(${n - $e}px, ${l - He}px)`), (Xe(l) || o) && (Ve = {})
          }
          function Ke() {
            m(we.move, Be),
              m(we.end, Ke),
              et(),
              Ce.remove(),
              W.T && ye.remove(),
              je.classList.remove("dragging-placeholder"),
              Re(Se, Ue)
          }
          function Je(e) {
            const t = Ue < e ? ke : -ke,
              n = _e.slice(...(Ue < e ? [Ue, e] : [e, Ue]))
            n.forEach((e) => {
              ;(e.style.transition = "none"), (e.style.transform = `translateY(${t}px)`)
            }),
              setTimeout(() =>
                n.forEach(({ style: e }) => {
                  e.removeProperty("transition"), e.removeProperty("transform")
                })
              ),
              (Ue = e)
          }
          function Ge() {
            return We.scrollHeight > We.clientHeight
          }
          function Xe(e) {
            const t = Ge() && Math.min(1, Math.max(0, e - Ie, Te - e) / ve)
            return (
              !t && Me && et(),
              t && !Me && ((Me = setInterval(Qe, fe)), xe.forEach((e) => p(e, tt, !0))),
              (Ee = t && (e > Ie ? 1 : -1) * ((1 + t * he) | 0)),
              (Oe = v.now()),
              !!t
            )
          }
          function Qe() {
            const e = v.now(),
              t = (Ee * (e - Oe)) / fe
            ;(We.scrollTop += t), (Oe = e)
          }
          function et() {
            xe.forEach((e) => m(e, tt, !0)), Me && clearInterval(Me), (Me = 0)
          }
          function tt(e) {
            e.stopPropagation()
          }
          function nt(e, t) {
            var n
            const l = `${e}:${t}`
            return Ve[l] || (Ve[l] = null == (n = document.elementFromPoint(e, t)) ? void 0 : n.closest(ge))
          }
          function lt(e) {
            return (je = e.target.closest(ge)), je
          }
          const at = ["tabIndex"],
            ot = { class: "script-icon hidden-xs" },
            it = ["href", "data-hotkey"],
            st = ["src", "data-no-icon"],
            rt = { class: "script-info-1 ellipsis" },
            ct = ["textContent", "data-order"],
            ut = { key: 0, class: "script-tags" },
            dt = ["textContent", "onClick", "data-tag"],
            pt = (0, J._)("a", null, "...", -1),
            mt = ["textContent", "onClick", "data-tag"],
            gt = { class: "script-info flex ml-1c" },
            vt = ["href", "textContent", "tabIndex"],
            ht = ["textContent"],
            ft = ["textContent"],
            bt = { class: "script-buttons script-buttons-left" },
            wt = ["href", "data-hotkey", "tabIndex"],
            yt = ["data-hotkey", "tabIndex"],
            xt = ["data-hotkey", "tabIndex"],
            Ct = (0, J._)("span", { class: "sep" }, null, -1),
            _t = ["tabIndex"],
            kt = ["href", "tabIndex"],
            St = ["textContent", "title"],
            Ut = { class: "script-buttons script-buttons-right" },
            zt = ["data-hotkey", "tabIndex"],
            Dt = ["data-hotkey", "tabIndex"],
            $t = {
              props: ["script", "visible", "viewTable", "focused", "hotkeys", "showHotkeys", "activeTags"],
              components: { Dropdown: ce.Z, Icon: pe.Z, Tooltip: ue.Z },
              data() {
                return { canRender: this.visible }
              },
              computed: {
                showRecycle: () => L.route.paths[0] === k,
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
                  return this.script.custom.description || (0, D.iQ)(this.script.meta, "description")
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
                      (0, oe.u7)((0, W.vY)()) || n.focus({ preventScroll: !0 }),
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
                  oe.$J.setContext("scriptFocus", !0)
                },
                onBlur() {
                  oe.$J.setContext("scriptFocus", !1)
                },
                onTagClick(e) {
                  this.$emit("clickTag", e)
                },
                toggleTip(e) {
                  ;(0, oe.xr)(e.target)
                },
              },
            }
          var Ht = z(3744)
          const jt = (0, Ht.Z)($t, [
            [
              "render",
              (e, t, n, l, a, o) => {
                const i = (0, J.up)("Dropdown"),
                  s = (0, J.up)("icon"),
                  r = (0, J.up)("tooltip")
                return (
                  (0, J.wg)(),
                  (0, J.iD)(
                    "div",
                    {
                      class: (0, G.C_)([
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
                      (0, J._)("div", ot, [
                        (0, J._)(
                          "a",
                          { href: o.url, "data-hotkey": n.hotkeys.edit, "data-hotkey-table": "", tabIndex: "-1" },
                          [(0, J._)("img", { src: n.script.safeIcon, "data-no-icon": n.script.noIcon }, null, 8, st)],
                          8,
                          it
                        ),
                      ]),
                      (0, J._)("div", rt, [
                        (0, J._)(
                          "a",
                          (0, J.dG)(
                            { textContent: (0, G.zw)(n.script.$cache.name) },
                            n.viewTable && { draggable: !1, href: o.url, tabIndex: o.tabIndex },
                            {
                              "data-order": n.script.config.removed ? null : n.script.props.position,
                              class: "script-name ellipsis",
                            }
                          ),
                          null,
                          16,
                          ct
                        ),
                        a.canRender
                          ? ((0, J.wg)(),
                            (0, J.iD)("div", ut, [
                              ((0, J.wg)(!0),
                              (0, J.iD)(
                                J.HY,
                                null,
                                (0, J.Ko)(o.tags.slice(0, 2), (e, t) => {
                                  var l
                                  return (
                                    (0, J.wg)(),
                                    (0, J.iD)(
                                      "a",
                                      {
                                        key: t,
                                        textContent: (0, G.zw)(`#${e}`),
                                        onClick: (0, ie.iM)((t) => o.onTagClick(e), ["prevent"]),
                                        class: (0, G.C_)({
                                          active: null == (l = n.activeTags) ? void 0 : l.includes(e),
                                        }),
                                        "data-tag": e,
                                      },
                                      null,
                                      10,
                                      dt
                                    )
                                  )
                                }),
                                128
                              )),
                              o.tags.length > 2
                                ? ((0, J.wg)(),
                                  (0, J.j4)(
                                    i,
                                    { key: 0 },
                                    {
                                      content: (0, J.w5)(() => [
                                        ((0, J.wg)(!0),
                                        (0, J.iD)(
                                          J.HY,
                                          null,
                                          (0, J.Ko)(o.tags.slice(2), (e, t) => {
                                            var l
                                            return (
                                              (0, J.wg)(),
                                              (0, J.iD)(
                                                "a",
                                                {
                                                  key: t,
                                                  class: (0, G.C_)([
                                                    "dropdown-menu-item",
                                                    { active: null == (l = n.activeTags) ? void 0 : l.includes(e) },
                                                  ]),
                                                  textContent: (0, G.zw)(`#${e}`),
                                                  onClick: (0, ie.iM)((t) => o.onTagClick(e), ["prevent"]),
                                                  "data-tag": e,
                                                },
                                                null,
                                                10,
                                                mt
                                              )
                                            )
                                          }),
                                          128
                                        )),
                                      ]),
                                      default: (0, J.w5)(() => [pt]),
                                      _: 1,
                                    }
                                  ))
                                : (0, J.kq)("", !0),
                            ]))
                          : (0, J.kq)("", !0),
                      ]),
                      (0, J._)("div", gt, [
                        a.canRender
                          ? ((0, J.wg)(),
                            (0, J.iD)(
                              J.HY,
                              { key: 0 },
                              [
                                o.author
                                  ? ((0, J.wg)(),
                                    (0, J.j4)(
                                      r,
                                      {
                                        key: 0,
                                        content: e.i18n("labelAuthor") + n.script.meta.author,
                                        class: "script-author ml-1c hidden-sm",
                                        align: "end",
                                      },
                                      {
                                        default: (0, J.w5)(() => [
                                          (0, J.Wm)(s, { name: "author" }),
                                          o.author.email
                                            ? ((0, J.wg)(),
                                              (0, J.iD)(
                                                "a",
                                                {
                                                  key: 0,
                                                  class: "ellipsis",
                                                  href: `mailto:${o.author.email}`,
                                                  textContent: (0, G.zw)(o.author.name),
                                                  tabIndex: o.tabIndex,
                                                },
                                                null,
                                                8,
                                                vt
                                              ))
                                            : ((0, J.wg)(),
                                              (0, J.iD)(
                                                "span",
                                                { key: 1, class: "ellipsis", textContent: (0, G.zw)(o.author.name) },
                                                null,
                                                8,
                                                ht
                                              )),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, J.kq)("", !0),
                                (0, J._)(
                                  "span",
                                  { class: "version ellipsis", textContent: (0, G.zw)(n.script.meta.version) },
                                  null,
                                  8,
                                  ft
                                ),
                                n.script.config.removed
                                  ? (0, J.kq)("", !0)
                                  : ((0, J.wg)(),
                                    (0, J.j4)(
                                      r,
                                      { key: 1, class: "size hidden-sm", content: n.script.$cache.sizes, align: "end" },
                                      {
                                        default: (0, J.w5)(() => [(0, J.Uk)((0, G.zw)(n.script.$cache.size), 1)]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    )),
                                (0, J.Wm)(
                                  r,
                                  { class: "updated hidden-sm ml-1c", content: o.updatedAt.title, align: "end" },
                                  { default: (0, J.w5)(() => [(0, J.Uk)((0, G.zw)(o.updatedAt.show), 1)]), _: 1 },
                                  8,
                                  ["content"]
                                ),
                              ],
                              64
                            ))
                          : (0, J.kq)("", !0),
                      ]),
                      (0, J._)("div", bt, [
                        a.canRender
                          ? ((0, J.wg)(),
                            (0, J.iD)(
                              J.HY,
                              { key: 0 },
                              [
                                (0, J.Wm)(
                                  r,
                                  { content: e.i18n("buttonEdit"), align: "start" },
                                  {
                                    default: (0, J.w5)(() => [
                                      (0, J._)(
                                        "a",
                                        {
                                          class: "btn-ghost",
                                          href: o.url,
                                          "data-hotkey": n.hotkeys.edit,
                                          tabIndex: o.tabIndex,
                                        },
                                        [(0, J.Wm)(s, { name: "code" })],
                                        8,
                                        wt
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["content"]
                                ),
                                n.script.config.removed
                                  ? (0, J.kq)("", !0)
                                  : ((0, J.wg)(),
                                    (0, J.iD)(
                                      J.HY,
                                      { key: 0 },
                                      [
                                        (0, J.Wm)(
                                          r,
                                          { content: o.labelEnable, align: "start" },
                                          {
                                            default: (0, J.w5)(() => [
                                              (0, J._)(
                                                "a",
                                                {
                                                  class: "btn-ghost",
                                                  onClick: t[0] || (t[0] = (...e) => o.onToggle && o.onToggle(...e)),
                                                  "data-hotkey": n.hotkeys.toggle,
                                                  tabIndex: o.tabIndex,
                                                },
                                                [
                                                  (0, J.Wm)(
                                                    s,
                                                    { name: "toggle-" + (n.script.config.enabled ? "on" : "off") },
                                                    null,
                                                    8,
                                                    ["name"]
                                                  ),
                                                ],
                                                8,
                                                yt
                                              ),
                                            ]),
                                            _: 1,
                                          },
                                          8,
                                          ["content"]
                                        ),
                                        (0, J.Wm)(
                                          r,
                                          {
                                            disabled: !n.script.$canUpdate || n.script.checking,
                                            content: e.i18n("buttonCheckForUpdates"),
                                            align: "start",
                                          },
                                          {
                                            default: (0, J.w5)(() => [
                                              (0, J._)(
                                                "a",
                                                {
                                                  class: "btn-ghost",
                                                  onClick: t[1] || (t[1] = (...e) => o.onUpdate && o.onUpdate(...e)),
                                                  "data-hotkey": n.hotkeys.update,
                                                  tabIndex: n.script.$canUpdate ? o.tabIndex : -1,
                                                },
                                                [
                                                  (0, J.Wm)(
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
                                                xt
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
                                Ct,
                                (0, J.Wm)(
                                  r,
                                  { disabled: !o.description, content: o.description, align: "start" },
                                  {
                                    default: (0, J.w5)(() => [
                                      (0, J._)(
                                        "a",
                                        {
                                          class: "btn-ghost",
                                          tabIndex: o.description ? o.tabIndex : -1,
                                          onClick: t[2] || (t[2] = (...e) => o.toggleTip && o.toggleTip(...e)),
                                        },
                                        [(0, J.Wm)(s, { name: "info" })],
                                        8,
                                        _t
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["disabled", "content"]
                                ),
                                ((0, J.wg)(!0),
                                (0, J.iD)(
                                  J.HY,
                                  null,
                                  (0, J.Ko)(
                                    o.urls,
                                    ([e, t], n) => (
                                      (0, J.wg)(),
                                      (0, J.j4)(
                                        r,
                                        { key: n, disabled: !t, content: e, align: "start" },
                                        {
                                          default: (0, J.w5)(() => [
                                            (0, J._)(
                                              "a",
                                              {
                                                class: "btn-ghost",
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                href: t,
                                                tabIndex: t ? o.tabIndex : -1,
                                              },
                                              [(0, J.Wm)(s, { name: n }, null, 8, ["name"])],
                                              8,
                                              kt
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
                                  ? ((0, J.wg)(),
                                    (0, J.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "script-message",
                                        textContent: (0, G.zw)(n.script.message),
                                        title: n.script.error,
                                      },
                                      null,
                                      8,
                                      St
                                    ))
                                  : (0, J.kq)("", !0),
                              ],
                              64
                            ))
                          : (0, J.kq)("", !0),
                      ]),
                      (0, J._)("div", Ut, [
                        a.canRender
                          ? ((0, J.wg)(),
                            (0, J.iD)(
                              J.HY,
                              { key: 0 },
                              [
                                o.showRecycle || !n.script.config.removed
                                  ? ((0, J.wg)(),
                                    (0, J.j4)(
                                      r,
                                      { key: 0, content: e.i18n("buttonRemove"), align: "end" },
                                      {
                                        default: (0, J.w5)(() => [
                                          (0, J._)(
                                            "a",
                                            {
                                              class: (0, G.C_)([
                                                "btn-ghost",
                                                { "btn-danger": n.script.config.removed },
                                              ]),
                                              onClick: t[3] || (t[3] = (...e) => o.onRemove && o.onRemove(...e)),
                                              "data-hotkey": n.hotkeys.remove,
                                              tabIndex: o.tabIndex,
                                            },
                                            [(0, J.Wm)(s, { name: "trash" })],
                                            10,
                                            zt
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, J.kq)("", !0),
                                n.script.config.removed
                                  ? ((0, J.wg)(),
                                    (0, J.j4)(
                                      r,
                                      { key: 1, content: e.i18n("buttonRestore"), placement: "left" },
                                      {
                                        default: (0, J.w5)(() => [
                                          (0, J._)(
                                            "a",
                                            {
                                              class: "btn-ghost",
                                              onClick: t[4] || (t[4] = (...e) => o.onRestore && o.onRestore(...e)),
                                              "data-hotkey": n.hotkeys.restore,
                                              tabIndex: o.tabIndex,
                                            },
                                            [(0, J.Wm)(s, { name: "undo" })],
                                            8,
                                            Dt
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["content"]
                                    ))
                                  : (0, J.kq)("", !0),
                              ],
                              64
                            ))
                          : (0, J.kq)("", !0),
                      ]),
                    ],
                    42,
                    at
                  )
                )
              },
            ],
          ])
          var Wt = z(206),
            Rt = z(6115),
            Tt = z(715)
          const It = { class: "form-group condensed" },
            Mt = ["textContent"],
            Et = ["textContent"],
            Ot = ["textContent"],
            Vt = ["disabled"],
            Zt = ["textContent"],
            Yt = ["textContent"],
            Lt = {
              __name: "settings-update",
              props: { script: u },
              setup(e) {
                const t = e,
                  n = (0, J.Fl)(() => t.script.config),
                  l = (0, J.Fl)(() => !t.script._remote)
                return (e, t) => (
                  (0, J.wg)(),
                  (0, J.iD)("div", null, [
                    (0, J._)("div", It, [
                      (0, J._)("label", null, [
                        (0, J.wy)(
                          (0, J._)(
                            "input",
                            (0, J.dG)(
                              {
                                type: "checkbox",
                                "onUpdate:modelValue": t[0] || (t[0] = (e) => (n.value.shouldUpdate = e)),
                              },
                              { disabled: l.value }
                            ),
                            null,
                            16
                          ),
                          [[ie.e8, n.value.shouldUpdate]]
                        ),
                        (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelAllowUpdate")) }, null, 8, Mt),
                        (0, J._)(
                          "span",
                          { textContent: (0, G.zw)(e.i18n("labelNotifyThisUpdated")), class: "melt" },
                          null,
                          8,
                          Et
                        ),
                      ]),
                      ((0, J.wg)(!0),
                      (0, J.iD)(
                        J.HY,
                        null,
                        (0, J.Ko)(
                          [
                            [e.i18n("genericOn"), "1"],
                            [e.i18n("genericOff"), "0"],
                            [e.i18n("genericUseGlobal"), ""],
                          ],
                          ([e, a]) => (
                            (0, J.wg)(),
                            (0, J.iD)("label", { class: "ml-1 melt", key: a }, [
                              (0, J.wy)(
                                (0, J._)(
                                  "input",
                                  (0, J.dG)(
                                    { type: "radio" },
                                    { value: a, disabled: l.value },
                                    { "onUpdate:modelValue": t[1] || (t[1] = (e) => (n.value.notifyUpdates = e)) }
                                  ),
                                  null,
                                  16
                                ),
                                [[ie.G2, n.value.notifyUpdates]]
                              ),
                              (0, J.Uk)(),
                              (0, J._)("span", { textContent: (0, G.zw)(e) }, null, 8, Ot),
                            ])
                          )
                        ),
                        128
                      )),
                    ]),
                    (0, J._)("label", null, [
                      (0, J.wy)(
                        (0, J._)(
                          "input",
                          {
                            type: "checkbox",
                            "onUpdate:modelValue": t[2] || (t[2] = (e) => (n.value._editable = e)),
                            class: "scary-switch",
                            disabled: l.value || !n.value.shouldUpdate,
                          },
                          null,
                          8,
                          Vt
                        ),
                        [[ie.e8, n.value._editable]]
                      ),
                      (0, J._)("span", { textContent: (0, G.zw)(e.i18n("readonlyOpt")) }, null, 8, Zt),
                      (0, J.Uk)(),
                      (0, J._)("span", { textContent: (0, G.zw)(e.i18n("readonlyOptWarn")) }, null, 8, Yt),
                    ]),
                  ])
                )
              },
            },
            Pt = { class: "edit-settings" },
            At = ["textContent"],
            Ft = { class: "mb-2" },
            qt = ["textContent"],
            Nt = ["textContent"],
            Bt = ["disabled"],
            Kt = ["textContent"],
            Jt = (0, J._)("td", null, [(0, J._)("code", null, "@run-at")], -1),
            Gt = ["textContent"],
            Xt = ["disabled"],
            Qt = ["textContent"],
            en = (0, J._)("option", { value: "document-start" }, "document-start", -1),
            tn = (0, J._)("option", { value: "document-body" }, "document-body", -1),
            nn = (0, J._)("option", { value: "document-end" }, "document-end", -1),
            ln = (0, J._)("option", { value: "document-idle" }, "document-idle", -1),
            an = (0, J._)(
              "td",
              null,
              [
                (0, J._)("code", null, [
                  (0, J.Uk)("@"),
                  (0, J._)("s", { style: { color: "var(--fill-6)" } }, "no"),
                  (0, J.Uk)("frames"),
                ]),
              ],
              -1
            ),
            on = ["textContent"],
            sn = ["disabled"],
            rn = ["textContent"],
            cn = ["textContent"],
            un = ["textContent"],
            dn = (0, J._)("td", null, [(0, J._)("code", null, "@inject-into")], -1),
            pn = ["textContent"],
            mn = ["disabled"],
            gn = ["textContent"],
            vn = ["textContent"],
            hn = ["textContent"],
            fn = ["textContent"],
            bn = ["onUpdate:modelValue", "placeholder", "disabled"],
            wn = ["textContent"],
            yn = ["textContent"],
            xn = ["textContent"],
            Cn = ["onUpdate:modelValue", "disabled"],
            _n = ["textContent"],
            kn = ["onUpdate:modelValue", "rows", "disabled"],
            Sn = "downloadURL",
            Un = "homepageURL",
            zn = "updateURL",
            Dn = {
              __name: "settings",
              props: { script: u, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, T.XI)(Tt.Wg),
                  l = (e) => {
                    var t
                    return (null == (t = e.match(/^(.*?)(@[-a-z]+)(.*)/)) ? void 0 : t.slice(1)) || [e, "", ""]
                  },
                  a = (0, J.Fl)(() => t.script.config),
                  o = (0, J.Fl)(() => t.script.custom),
                  i = (0, J.Fl)(() => {
                    const { script: e } = t,
                      { meta: n } = e
                    return {
                      name: n.name,
                      [Un]: (0, D.t$)(e),
                      [zn]: n[zn] || (0, D.ag)("hintUseDownloadURL"),
                      [Sn]: n[Sn] || e.custom.lastInstallURL,
                    }
                  }),
                  s = [
                    ["name", (0, D.ag)("labelName")],
                    [Un, (0, D.ag)("labelHomepageURL")],
                    [zn, (0, D.ag)("labelUpdateURL")],
                    [Sn, (0, D.ag)("labelDownloadURL")],
                  ],
                  r = [
                    [P, "origInclude", ...l((0, D.ag)("labelInclude"))],
                    [A, "origMatch", ...l((0, D.ag)("labelMatch"))],
                    [F, "origExclude", ...l((0, D.ag)("labelExclude"))],
                    [q, "origExcludeMatch", ...l((0, D.ag)("labelExcludeMatch"))],
                  ]
                return (t, l) => (
                  (0, J.wg)(),
                  (0, J.iD)("div", Pt, [
                    (0, J._)("h4", { textContent: (0, G.zw)((0, T.SU)(D.ag)("editLabelSettings")) }, null, 8, At),
                    (0, J._)("div", Ft, [
                      (0, J._)("label", null, [
                        (0, J.wy)(
                          (0, J._)(
                            "input",
                            { type: "checkbox", "onUpdate:modelValue": l[0] || (l[0] = (e) => (a.value.enabled = e)) },
                            null,
                            512
                          ),
                          [[ie.e8, a.value.enabled]]
                        ),
                        (0, J._)("span", { textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonEnable")) }, null, 8, qt),
                      ]),
                    ]),
                    (0, J.Wm)((0, T.SU)(Lt), (0, G.vs)((0, J.F4)({ script: e.script })), null, 16),
                    (0, J._)("table", null, [
                      (0, J._)("tr", null, [
                        (0, J._)("td", { textContent: (0, G.zw)((0, T.SU)(D.ag)("labelTags")) }, null, 8, Nt),
                        (0, J._)("td", null, [
                          (0, J.wy)(
                            (0, J._)(
                              "input",
                              {
                                type: "text",
                                "onUpdate:modelValue": l[1] || (l[1] = (e) => (o.value.tags = e)),
                                disabled: e.readOnly,
                              },
                              null,
                              8,
                              Bt
                            ),
                            [[ie.nr, o.value.tags]]
                          ),
                        ]),
                      ]),
                    ]),
                    (0, J._)("h4", { textContent: (0, G.zw)((0, T.SU)(D.ag)("editLabelMeta")) }, null, 8, Kt),
                    (0, J._)("table", null, [
                      (0, J._)("tr", null, [
                        Jt,
                        (0, J._)("td", null, [
                          (0, J._)("p", { textContent: (0, G.zw)((0, T.SU)(D.ag)("labelRunAt")) }, null, 8, Gt),
                        ]),
                        (0, J._)("td", null, [
                          (0, J.wy)(
                            (0, J._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[2] || (l[2] = (e) => (o.value.runAt = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, J._)(
                                  "option",
                                  { value: "", textContent: (0, G.zw)((0, T.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Qt
                                ),
                                en,
                                tn,
                                nn,
                                ln,
                              ],
                              8,
                              Xt
                            ),
                            [[ie.bM, o.value.runAt]]
                          ),
                        ]),
                      ]),
                      (0, J._)("tr", null, [
                        an,
                        (0, J._)("td", null, [
                          (0, J._)("p", { textContent: (0, G.zw)((0, T.SU)(D.ag)("labelNoFrames")) }, null, 8, on),
                        ]),
                        (0, J._)("td", null, [
                          (0, J.wy)(
                            (0, J._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[3] || (l[3] = (e) => (o.value.noframes = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, J._)(
                                  "option",
                                  { value: "", textContent: (0, G.zw)((0, T.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  rn
                                ),
                                (0, J._)(
                                  "option",
                                  { value: "0", textContent: (0, G.zw)((0, T.SU)(D.ag)("genericOn")) },
                                  null,
                                  8,
                                  cn
                                ),
                                (0, J._)(
                                  "option",
                                  { value: "1", textContent: (0, G.zw)((0, T.SU)(D.ag)("genericOff")) },
                                  null,
                                  8,
                                  un
                                ),
                              ],
                              8,
                              sn
                            ),
                            [[ie.bM, o.value.noframes]]
                          ),
                        ]),
                      ]),
                      (0, J._)("tr", null, [
                        dn,
                        (0, J._)("td", null, [
                          (0, J._)("p", { textContent: (0, G.zw)((0, T.SU)(D.ag)("labelInjectionMode")) }, null, 8, pn),
                        ]),
                        (0, J._)("td", null, [
                          (0, J.wy)(
                            (0, J._)(
                              "select",
                              {
                                "onUpdate:modelValue": l[4] || (l[4] = (e) => (o.value.injectInto = e)),
                                disabled: e.readOnly,
                              },
                              [
                                (0, J._)(
                                  "option",
                                  { value: "", textContent: (0, G.zw)((0, T.SU)(D.ag)("labelRunAtDefault")) },
                                  null,
                                  8,
                                  gn
                                ),
                                ((0, J.wg)(!0),
                                (0, J.iD)(
                                  J.HY,
                                  null,
                                  (0, J.Ko)(
                                    n.value,
                                    (e, t) => (
                                      (0, J.wg)(),
                                      (0, J.iD)("option", { key: t, textContent: (0, G.zw)(t) }, null, 8, vn)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              mn
                            ),
                            [[ie.bM, o.value.injectInto]]
                          ),
                        ]),
                      ]),
                      ((0, J.wg)(),
                      (0, J.iD)(
                        J.HY,
                        null,
                        (0, J.Ko)(s, ([t, n]) =>
                          (0, J._)("tr", { key: t }, [
                            (0, J._)("td", null, [(0, J._)("code", { textContent: (0, G.zw)(`@${t}`) }, null, 8, hn)]),
                            (0, J._)("td", null, [(0, J._)("p", { textContent: (0, G.zw)(n) }, null, 8, fn)]),
                            (0, J._)("td", null, [
                              (0, J.wy)(
                                (0, J._)(
                                  "input",
                                  {
                                    type: "text",
                                    "onUpdate:modelValue": (e) => (o.value[t] = e),
                                    placeholder: i.value[t],
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  bn
                                ),
                                [[ie.nr, o.value[t]]]
                              ),
                            ]),
                          ])
                        ),
                        64
                      )),
                    ]),
                    (0, J._)("table", null, [
                      ((0, J.wg)(),
                      (0, J.iD)(
                        J.HY,
                        null,
                        (0, J.Ko)(r, ([n, l, a, i, s]) =>
                          (0, J._)("tr", { key: n }, [
                            (0, J._)("td", null, [
                              (0, J._)("p", null, [
                                (0, J._)("span", { textContent: (0, G.zw)(a) }, null, 8, wn),
                                (0, J._)("code", { textContent: (0, G.zw)(i) }, null, 8, yn),
                                (0, J._)("span", { textContent: (0, G.zw)(s) }, null, 8, xn),
                              ]),
                              (0, J._)("label", null, [
                                (0, J.wy)(
                                  (0, J._)(
                                    "input",
                                    {
                                      type: "checkbox",
                                      "onUpdate:modelValue": (e) => (o.value[l] = e),
                                      disabled: e.readOnly,
                                    },
                                    null,
                                    8,
                                    Cn
                                  ),
                                  [[ie.e8, o.value[l]]]
                                ),
                                (0, J._)(
                                  "span",
                                  { textContent: (0, G.zw)((0, T.SU)(D.ag)("labelKeepOriginal")) },
                                  null,
                                  8,
                                  _n
                                ),
                              ]),
                            ]),
                            (0, J._)("td", null, [
                              (0, J.wy)(
                                (0, J._)(
                                  "textarea",
                                  {
                                    "onUpdate:modelValue": (e) => (o.value[n] = e),
                                    spellcheck: "false",
                                    rows: t.calcRows(o.value[n]),
                                    disabled: e.readOnly,
                                  },
                                  null,
                                  8,
                                  kn
                                ),
                                [[ie.nr, o.value[n]]]
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
          var $n = z(2274)
          const Hn = ["data-editing"],
            jn = { class: "flex-1 flex flex-col" },
            Wn = { class: "mb-1" },
            Rn = { key: 1, class: "inline-block ml-2" },
            Tn = ["disabled"],
            In = ["textContent"],
            Mn = ["textContent"],
            En = ["disabled"],
            On = { class: "ml-2 mr-2c" },
            Vn = (0, J._)("kbd", null, "PageUp", -1),
            Zn = (0, J._)("kbd", null, "PageDown", -1),
            Yn = (0, J._)("kbd", null, "\u2191", -1),
            Ln = (0, J._)("kbd", null, "\u2193", -1),
            Pn = (0, J._)("kbd", null, "Tab", -1),
            An = (0, J._)("kbd", null, "Shift-Tab", -1),
            Fn = (0, J._)("kbd", null, "Enter", -1),
            qn = (0, J._)("kbd", null, "Ctrl-Del", -1),
            Nn = ["onKeydown"],
            Bn = ["textContent"],
            Kn = ["onKeydown", "onClick"],
            Jn = { class: "ellipsis" },
            Gn = ["textContent"],
            Xn = ["textContent"],
            Qn = ["textContent"],
            el = ["onClick"],
            tl = ["textContent"],
            nl = ["onKeydown"],
            ll = ["onClick"],
            al = ["textContent"],
            ol = ["textContent"],
            il = ["textContent"],
            sl = ["textContent"],
            rl = { key: 0, class: "edit-values-panel flex flex-col flex-1 mb-1c" },
            cl = { class: "control" },
            ul = ["textContent"],
            dl = { class: "flex center-items" },
            pl = ["textContent", "onClick", "title", "disabled"],
            ml = ["textContent"],
            gl = ["innerHTML"],
            vl = ["textContent"],
            hl = ["readOnly", "onKeydown"],
            fl = ["textContent"],
            bl = {
              __name: "values",
              props: { script: u, readOnly: r },
              setup(e) {
                const t = e,
                  n = (0, T.iH)(),
                  l = (0, T.iH)(),
                  a = (0, T.iH)(),
                  o = (0, T.iH)(),
                  i = (0, T.iH)(),
                  s = (0, T.iH)(),
                  r = (0, T.iH)(),
                  c = (0, T.iH)(!0),
                  d = (0, T.iH)(),
                  h = (0, T.iH)(),
                  f = (0, T.iH)(),
                  w = { error: "", dirty: !1 },
                  y = (e) => (e.length > 1024 ? e.slice(0, 1024) : e),
                  x = (e) => {
                    try {
                      return JSON.stringify(JSON.parse(e), null, E)
                    } catch (t) {
                      return e
                    }
                  },
                  C = { condition: "!edit" },
                  _ = (e) => oe.$J.setContext("edit", "selectionEnd" in e.target),
                  k = (0, J.Fl)(() => u.keys(h.value || {}).sort()),
                  U = (0, J.Fl)(() => Math.ceil(k.value.length / 25)),
                  z = (0, J.Fl)(() => {
                    const e = 25 * (d.value - 1),
                      t = k.value.slice(e, e + 25)
                    for (let e = 0, n = 0; e < t.length; e++) t.width = n = Math.max(n, t[e].length)
                    return t
                  })
                let $,
                  H,
                  j,
                  R,
                  I,
                  M,
                  E = "  "
                function O(e) {
                  ;(0, J.Y3)(() => {
                    l.value[e ? "click" : "focus"]()
                  })
                }
                function V(e) {
                  d.value = Math.max(1, Math.min(U.value, d.value + e))
                }
                function Z(e, t) {
                  const n = e.length + (h.value[e] || t).length - 1
                  return n < 1e4 ? n : (0, D.aj)(n)
                }
                function Y(e, t, n) {
                  let l = h.value[e] || n
                  const a = l[0]
                  return (l = l.slice(1)), "s" === a ? (l = JSON.stringify(l)) : t || (l = x(l)), t ? y(l) : l
                }
                function P() {
                  return `{\n${E}${k.value
                    .map((e) => `${JSON.stringify(e)}: ${Y(e)}`)
                    .join(",\n")
                    .replace(/\n/g, "\n" + E)}\n}`
                }
                function A(e) {
                  if ((null != e || (e = {}), !(0, re.vZ)(h.value, e)))
                    return (h.value = e), (d.value = Math.min(d.value, U.value) || 1), F(), !0
                }
                function F() {
                  L.storageSize = k.value.reduce((e, t) => e + t.length + 4 + h.value[t].length + 2, 0)
                }
                async function q({ key: e, jsonValue: n, rawValue: l = (0, D.bd)(n) || "" }) {
                  const { id: a } = t.script.props
                  await (0, D.gj)("UpdateValue", { id: a, key: e, raw: l }, void 0, I),
                    l ? (h.value[e] = l) : delete h.value[e],
                    F()
                }
                function N() {
                  r.value = { isNew: !0, key: "", value: "", ...w }
                }
                async function B(e) {
                  var t
                  q({ key: e }),
                    ((f.value || (f.value = {}))[e + Math.random()] = {
                      key: e,
                      rawValue: h.value[e],
                      cut: Y(e, !0),
                      len: Z(e),
                    }),
                    (null == (t = r.value) ? void 0 : t.key) === e && (r.value = null)
                }
                function X(e) {
                  const t = f.value,
                    n = t[e]
                  delete t[e], (0, D.xb)(t) && (f.value = null), q(n)
                }
                function Q(e) {
                  r.value = { key: e, value: Y(e), ...w }
                }
                function ee() {
                  r.value = { isAll: !0, value: P(), ...w }
                }
                async function te(e) {
                  const n = r.value
                  if ((n.jsonPaused && ((n.jsonPaused = !1), le()), n.error)) {
                    const e = n.errorPos
                    return (
                      $.setSelection(e, { line: e.line, ch: e.ch + 1 }), $.focus(), void (0, W.PV)({ text: n.error })
                    )
                  }
                  if ((1 === e ? ($.markClean(), (n.dirty = !1)) : (r.value = null), n.isAll)) {
                    const e = b(re.Xw, n.jsonValue, (e) => (0, D.bd)(e) || "")
                    await (0, D.gj)("SetValueStores", { [t.script.props.id]: e }), A(e)
                  } else await q(n)
                }
                function ne() {
                  const e = r.value
                  if (e.dirty) {
                    const t = `${e.key} ${(1e9 * Math.random()) | 0}`,
                      n = $.getValue(),
                      l = (0, D.bd)(n)
                    ;(f.value || (f.value = {}))[t] = { key: t, rawValue: l, cut: y(n), len: Z(t, l) }
                  }
                  r.value = null
                }
                function le(e) {
                  const t = r.value
                  if (((t.dirty = e), (t.error = null), t.jsonPaused)) return
                  const n = v.now()
                  try {
                    const e = $.getValue()
                    t.jsonValue = e.trim() ? JSON.parse(e) : void 0
                  } catch (e) {
                    const n = /(position\s+)(\d+)|$/,
                      l = $.posFromIndex(+`${e}`.match(n)[2] || 0)
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
                      l = e && (e.isAll ? P : Y)
                    if ((A(t instanceof u ? t : (0, re.p$)(t)), e)) {
                      const t = l(n)
                      $.getValue() === t ? ((e.isNew = !1), (e.dirty = !1)) : e.dirty || ((e.value = t), le())
                    }
                  } else A(t)
                }
                function ce(e) {
                  ;(0, oe.nk)(("ArrowDown" === e.key ? 1 : e.target !== l.value && -1) || 0)
                }
                return (
                  (0, J.dl)(() => {
                    var e
                    const l = n.value,
                      { id: a } = t.script.props,
                      o = (0, D.K0)()
                    b(p, l, "focusin", _),
                      null == (e = r.value ? $ : R) || e.focus(),
                      (0, D.gj)("GetValueStore", a, void 0, (I = { tab: { id: Math.random() - 2 }, [S]: 0 })).then(
                        (e) => {
                          const t = !h.value
                          A(e) && t && k.value.length && O(!0), (c.value = !1)
                        }
                      ),
                      (j = [
                        () => b(m, l, "focusin", _),
                        oe.$J.register("pageup", () => V(-1), C),
                        oe.$J.register("pagedown", () => V(1), C),
                        (0, se.Z)("valueEditor", (e) => {
                          if (((H = e), (E = " ".repeat((null == e ? void 0 : e.tabSize) || 2)), $ && e))
                            for (const t in e) "mode" !== t && $.setOption(t, e[t])
                        }),
                      ]),
                      (M = g.runtime.connect({
                        name:
                          Tt.vy +
                          JSON.stringify({ cfg: { value: a }, id: null == o ? void 0 : o[Tt.vy](ae), tabId: I.tab.id }),
                      })),
                      o || M.onMessage.addListener(ae),
                      (s.value = !0)
                  }),
                  (0, J.se)(() => {
                    var e, t
                    ;(s.value = !1),
                      null == (e = j) || e.forEach((e) => e()),
                      null == (t = M) || t.disconnect(),
                      (j = M = null)
                  }),
                  (0, J.YP)(r, (e, t) => {
                    if (e)
                      (R = (0, W.vY)()),
                        (0, J.Y3)(() => {
                          const n = o.value
                          if ((($ = n.cm), t && n.updateValue(e.value), e.isNew)) {
                            const e = a.value
                            e.setSelectionRange(0, 0), e.focus()
                          } else $.setCursor(0, 0), $.focus()
                        })
                    else if (t) {
                      var n
                      null == (n = R) || n.focus()
                    }
                  }),
                  (0, J.YP)(d, () => {
                    ;(R = null), O()
                  }),
                  (t, u) => (
                    (0, J.wg)(),
                    (0, J.iD)(
                      "div",
                      { class: "edit-values flex", ref_key: "$el", ref: n, "data-editing": r.value && "" },
                      [
                        (0, J._)("div", jn, [
                          (0, J._)("div", Wn, [
                            e.readOnly
                              ? (0, J.kq)("", !0)
                              : ((0, J.wg)(), (0, J.iD)("button", { key: 0, onClick: N }, "+")),
                            U.value > 1
                              ? ((0, J.wg)(),
                                (0, J.iD)("div", Rn, [
                                  (0, J._)(
                                    "button",
                                    { disabled: 1 === d.value, onClick: u[0] || (u[0] = (e) => (d.value -= 1)) },
                                    "\u2190",
                                    8,
                                    Tn
                                  ),
                                  (0, J._)("span", { class: "ml-1", textContent: (0, G.zw)(d.value) }, null, 8, In),
                                  (0, J.Uk)(" / "),
                                  (0, J._)("span", { class: "mr-1", textContent: (0, G.zw)(U.value) }, null, 8, Mn),
                                  (0, J._)(
                                    "button",
                                    { disabled: d.value >= U.value, onClick: u[1] || (u[1] = (e) => (d.value += 1)) },
                                    "\u2192",
                                    8,
                                    En
                                  ),
                                ]))
                              : (0, J.kq)("", !0),
                            (0, J._)("span", On, [
                              (0, J._)("span", null, [
                                U.value > 1
                                  ? ((0, J.wg)(),
                                    (0, J.iD)(J.HY, { key: 0 }, [Vn, (0, J.Uk)(", "), Zn, (0, J.Uk)(", ")], 64))
                                  : (0, J.kq)("", !0),
                                Yn,
                                (0, J.Uk)(", "),
                                Ln,
                                (0, J.Uk)(", "),
                                Pn,
                                (0, J.Uk)(", "),
                                An,
                                (0, J.Uk)(", "),
                              ]),
                              (0, J._)("span", null, [Fn, (0, J.Uk)(": " + (0, G.zw)(t.i18n("buttonEdit")) + ",", 1)]),
                              (0, J._)("span", null, [qn, (0, J.Uk)(": " + (0, G.zw)(t.i18n("buttonRemove")), 1)]),
                            ]),
                          ]),
                          (0, J._)(
                            "div",
                            {
                              class: "edit-values-table main",
                              style: (0, G.j5)({ "--keyW": z.value.width + "ch" }),
                              onKeydown: [
                                (0, ie.D2)((0, ie.iM)(ce, ["exact"]), ["down"]),
                                (0, ie.D2)((0, ie.iM)(ce, ["exact"]), ["up"]),
                              ],
                            },
                            [
                              (0, J._)(
                                "a",
                                {
                                  ref_key: "$editAll",
                                  ref: l,
                                  class: "edit-values-row flex",
                                  onClick: ee,
                                  tabindex: "0",
                                  textContent: (0, G.zw)(t.i18n("editValueAllHint")),
                                },
                                null,
                                8,
                                Bn
                              ),
                              ((0, J.wg)(!0),
                              (0, J.iD)(
                                J.HY,
                                null,
                                (0, J.Ko)(
                                  z.value,
                                  (e) => (
                                    (0, J.wg)(),
                                    (0, J.iD)(
                                      "div",
                                      {
                                        key: e,
                                        class: "edit-values-row flex monospace-font",
                                        onKeydown: (0, ie.D2)(
                                          (0, ie.iM)((t) => B(e), ["ctrl", "exact"]),
                                          ["delete"]
                                        ),
                                        onClick: (t) => Q(e),
                                      },
                                      [
                                        (0, J._)("div", Jn, [
                                          (0, J._)("a", { textContent: (0, G.zw)(e), tabindex: "0" }, null, 8, Gn),
                                        ]),
                                        (0, J._)(
                                          "div",
                                          { class: "ellipsis flex-auto", textContent: (0, G.zw)(Y(e, !0)) },
                                          null,
                                          8,
                                          Xn
                                        ),
                                        (0, J._)("pre", { textContent: (0, G.zw)(Z(e)) }, null, 8, Qn),
                                        (0, J._)(
                                          "div",
                                          { class: "del", onClick: (0, ie.iM)((t) => B(e), ["stop"]) },
                                          [(0, J.Wm)((0, T.SU)(pe.Z), { name: "trash" })],
                                          8,
                                          el
                                        ),
                                      ],
                                      40,
                                      Kn
                                    )
                                  )
                                ),
                                128
                              )),
                            ],
                            44,
                            Nn
                          ),
                          f.value
                            ? ((0, J.wg)(),
                              (0, J.iD)(
                                "h3",
                                { key: 0, textContent: (0, G.zw)(t.i18n("headerRecycleBin")) },
                                null,
                                8,
                                tl
                              ))
                            : (0, J.kq)("", !0),
                          f.value
                            ? ((0, J.wg)(),
                              (0, J.iD)(
                                "div",
                                {
                                  key: 1,
                                  class: "edit-values-table trash monospace-font",
                                  onKeydown: [
                                    (0, ie.D2)((0, ie.iM)(ce, ["exact"]), ["down"]),
                                    (0, ie.D2)((0, ie.iM)(ce, ["exact"]), ["up"]),
                                  ],
                                },
                                [
                                  ((0, J.wg)(!0),
                                  (0, J.iD)(
                                    J.HY,
                                    null,
                                    (0, J.Ko)(
                                      f.value,
                                      ({ key: e, cut: t, len: n }, l) => (
                                        (0, J.wg)(),
                                        (0, J.iD)(
                                          "div",
                                          { key: l, class: "edit-values-row flex", onClick: (e) => X(l) },
                                          [
                                            (0, J._)(
                                              "a",
                                              { class: "ellipsis", textContent: (0, G.zw)(e), tabindex: "0" },
                                              null,
                                              8,
                                              al
                                            ),
                                            (0, J._)(
                                              "s",
                                              { class: "ellipsis flex-auto", textContent: (0, G.zw)(t) },
                                              null,
                                              8,
                                              ol
                                            ),
                                            (0, J._)("pre", { textContent: (0, G.zw)(n) }, null, 8, il),
                                          ],
                                          8,
                                          ll
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                ],
                                40,
                                nl
                              ))
                            : (0, J.kq)("", !0),
                          c.value || k.value.length
                            ? (0, J.kq)("", !0)
                            : ((0, J.wg)(),
                              (0, J.iD)(
                                "div",
                                { key: 2, class: "edit-values-empty mt-1", textContent: (0, G.zw)(t.i18n("noValues")) },
                                null,
                                8,
                                sl
                              )),
                        ]),
                        r.value
                          ? ((0, J.wg)(),
                            (0, J.iD)("div", rl, [
                              (0, J._)("div", cl, [
                                (0, J._)(
                                  "h4",
                                  {
                                    textContent: (0, G.zw)(
                                      r.value.isAll ? t.i18n("labelEditValueAll") : t.i18n("labelEditValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  ul
                                ),
                                (0, J._)("div", dl, [
                                  (0, J._)(
                                    "a",
                                    {
                                      tabindex: "0",
                                      class: "mr-1 flex",
                                      onClick: u[2] || (u[2] = (e) => (i.value = !i.value)),
                                    },
                                    [
                                      (0, J.Wm)(
                                        (0, T.SU)(pe.Z),
                                        { name: "cog", class: (0, G.C_)({ active: i.value }) },
                                        null,
                                        8,
                                        ["class"]
                                      ),
                                    ]
                                  ),
                                  ((0, J.wg)(!0),
                                  (0, J.iD)(
                                    J.HY,
                                    null,
                                    (0, J.Ko)(
                                      [t.i18n("buttonOK"), t.i18n("buttonApply")],
                                      (e, t) => (
                                        (0, J.wg)(),
                                        (0, J.iD)(
                                          "button",
                                          {
                                            key: e,
                                            textContent: (0, G.zw)(e),
                                            onClick: (e) => te(t),
                                            class: (0, G.C_)({ "has-error": r.value.error, "save-beacon": !t }),
                                            title: r.value.error,
                                            disabled: r.value.error || !r.value.dirty,
                                          },
                                          null,
                                          10,
                                          pl
                                        )
                                      )
                                    ),
                                    128
                                  )),
                                  (0, J._)(
                                    "button",
                                    { textContent: (0, G.zw)(t.i18n("buttonCancel")), onClick: ne, title: "Esc" },
                                    null,
                                    8,
                                    ml
                                  ),
                                ]),
                              ]),
                              i.value
                                ? ((0, J.wg)(),
                                  (0, J.iD)(
                                    J.HY,
                                    { key: 0 },
                                    [
                                      (0, J._)(
                                        "p",
                                        { class: "my-1", innerHTML: t.i18n("descEditorOptions") },
                                        null,
                                        8,
                                        gl
                                      ),
                                      (0, J.Wm)(
                                        (0, T.SU)($n.Z),
                                        { name: "valueEditor", json: "", onDblclick: (0, T.SU)(K), "has-save": !1 },
                                        null,
                                        8,
                                        ["onDblclick"]
                                      ),
                                    ],
                                    64
                                  ))
                                : (0, J.kq)("", !0),
                              (0, J.wy)(
                                (0, J._)(
                                  "label",
                                  null,
                                  [
                                    (0, J._)("span", { textContent: (0, G.zw)(t.i18n("valueLabelKey")) }, null, 8, vl),
                                    (0, J.wy)(
                                      (0, J._)(
                                        "input",
                                        {
                                          type: "text",
                                          "onUpdate:modelValue": u[3] || (u[3] = (e) => (r.value.key = e)),
                                          readOnly: !r.value.isNew || e.readOnly,
                                          ref_key: "$key",
                                          ref: a,
                                          spellcheck: "false",
                                          onKeydown: (0, ie.D2)((0, ie.iM)(ne, ["exact", "stop"]), ["esc"]),
                                        },
                                        null,
                                        40,
                                        hl
                                      ),
                                      [[ie.nr, r.value.key]]
                                    ),
                                  ],
                                  512
                                ),
                                [[ie.F8, !r.value.isAll]]
                              ),
                              (0, J._)("label", null, [
                                (0, J._)(
                                  "span",
                                  {
                                    textContent: (0, G.zw)(
                                      r.value.isAll ? t.i18n("valueLabelValueAll") : t.i18n("valueLabelValue")
                                    ),
                                  },
                                  null,
                                  8,
                                  fl
                                ),
                                (0, J.Wm)(
                                  (0, T.SU)(Wt.default),
                                  {
                                    value: r.value.value,
                                    "cm-options": (0, T.SU)(H),
                                    ref_key: "$value",
                                    ref: o,
                                    class: "h-100 mt-1",
                                    mode: "application/json",
                                    readOnly: e.readOnly,
                                    onCodeDirty: le,
                                    commands: { close: ne, save: te },
                                    active: s.value,
                                    focusme: "",
                                  },
                                  null,
                                  8,
                                  ["value", "cm-options", "readOnly", "commands", "active"]
                                ),
                              ]),
                            ]))
                          : (0, J.kq)("", !0),
                      ],
                      8,
                      Hn
                    )
                  )
                )
              },
            },
            wl = bl,
            yl = { class: "edit-help mb-2c" },
            xl = ["innerHTML"],
            Cl = (0, J._)(
              "a",
              { href: "https://violentmonkey.github.io/api/", rel: "noopener noreferrer", target: "_blank" },
              "violentmonkey.github.io/api/",
              -1
            ),
            _l = { class: "keyboard" },
            kl = ["textContent"],
            Sl = ["textContent"],
            Ul = ["textContent"],
            zl = {
              __name: "help",
              props: { hotkeys: Array },
              setup: (e) => (t, n) => (
                (0, J.wg)(),
                (0, J.iD)("div", yl, [
                  (0, J._)("div", null, [
                    (0, J._)("h3", { innerHTML: t.i18n("editHelpDocumention") }, null, 8, xl),
                    Cl,
                  ]),
                  (0, J._)("div", _l, [
                    (0, J._)("h3", { textContent: (0, G.zw)(t.i18n("editHelpKeyboard")) }, null, 8, kl),
                    ((0, J.wg)(!0),
                    (0, J.iD)(
                      J.HY,
                      null,
                      (0, J.Ko)(
                        e.hotkeys,
                        ([e, t]) => (
                          (0, J.wg)(),
                          (0, J.iD)("dl", { key: e }, [
                            (0, J._)("dt", { class: "monospace-font", textContent: (0, G.zw)(e) }, null, 8, Sl),
                            (0, J._)("dd", { textContent: (0, G.zw)(t) }, null, 8, Ul),
                          ])
                        )
                      ),
                      128
                    )),
                  ]),
                ])
              ),
            },
            Dl = { class: "edit-header flex mr-1c" },
            $l = ["textContent", "onClick"],
            Hl = { class: "edit-name text-center ellipsis flex-1" },
            jl = ["textContent"],
            Wl = ["textContent"],
            Rl = { key: 1, class: "edit-hint text-right ellipsis" },
            Tl = ["href", "textContent"],
            Il = { class: "mr-1" },
            Ml = ["textContent", "disabled", "title"],
            El = ["textContent", "disabled"],
            Ol = ["textContent"],
            Vl = { key: 0, class: "frozen-note shelf mr-2c flex flex-wrap" },
            Zl = ["textContent"],
            Yl = { key: 1, class: "shelf fatal" },
            Ll = ["textContent"],
            Pl = { key: 2, class: "errors shelf my-1c" },
            Al = ["textContent"],
            Fl = ["textContent"],
            ql = { key: 1, class: "my-1" },
            Nl = "https://violentmonkey.github.io/api/matching/",
            Bl = {
              name: "",
              homepageURL: "",
              updateURL: "",
              downloadURL: "",
              tags: "",
              origInclude: !0,
              origExclude: !0,
              origMatch: !0,
              origExcludeMatch: !0,
            },
            Kl = (e) => ("" !== e ? e : null),
            Jl = [P, A, F, q],
            Gl = (e) =>
              e.trim()
                ? e
                    .split("\n")
                    .map((e) => e.trim())
                    .filter(r)
                : null,
            Xl = [l, a],
            Ql = (e) => e || null,
            ea = (e, t) => (e < t ? -1 : e > t),
            ta = ({ shouldUpdate: e, _editable: t }) => +e && e + t,
            na = (e, t) => {
              if (t >= 0) {
                const n = e.lastIndexOf("\n", t) + 1,
                  l = e.indexOf("\n", t)
                return e.slice(n, l > 0 ? l : void 0)
              }
            },
            la = /#/,
            aa = {
              __name: "index",
              props: { initial: u, initialCode: String, readOnly: r },
              emits: ["close"],
              setup(t, { emit: n }) {
                const l = t
                let a, o, i, r, c, d, m
                const v = (0, T.iH)(),
                  h = (0, T.iH)(),
                  f = (0, T.iH)("code"),
                  x = (0, T.iH)(!1),
                  C = (0, T.iH)(),
                  _ = (0, T.iH)(""),
                  k = (0, T.iH)(!1),
                  S = { save: V, close: Z },
                  U = (0, T.iH)(),
                  z = (0, T.iH)(),
                  $ = (0, J.Fl)(() => {
                    for (let e = 0, t = ["meta", "custom"]; e < t.length; e++) {
                      const n = t[e]
                      for (let e = 0; e < Jl.length; e++) {
                        const t = Jl[e]
                        let l = C.value[n][t]
                        if (l && (l = s(l) ? l.find(la.test, la) : na(l, l.indexOf("#"))))
                          return l.length > 100 ? l.slice(0, 100) + "..." : l
                      }
                    }
                  }),
                  H = (0, T.iH)(),
                  R = (0, T.iH)(!1),
                  M = (0, T.iH)(!1),
                  E = (0, J.Fl)(() => {
                    const {
                        meta: e,
                        props: { id: t },
                      } = C.value,
                      n = e.require.length && "@require",
                      l = !(0, D.xb)(e.resources) && "@resource",
                      a = L.storageSize
                    return {
                      code: (0, D.ag)("editNavCode"),
                      settings: (0, D.ag)("editNavSettings"),
                      ...(t && { values: (0, D.ag)("editNavValues") + (a ? ` (${(0, D.aj)(a)})` : "") }),
                      ...((n || l) && { externals: b(D.Hv, [n, l], "/") }),
                      help: "?",
                    }
                  }),
                  O = (0, J.Fl)(() => (L.title = (0, D.pV)(C.value)))
                ;(0, J.YP)(
                  f,
                  async (e) => {
                    await (0, J.Y3)(), "code" === e ? a.focus() : (0, W.wO)(h.value.$el)
                  },
                  { immediate: !0 }
                ),
                  (0, J.YP)(x, (e) => {
                    m(e), oe.$J.setContext("canSave", e)
                  }),
                  (0, J.YP)(
                    () => l.initial.error,
                    (e) => {
                      e && (0, W.PV)({ text: `${l.initial.message}\n\n${e}` })
                    }
                  ),
                  (0, J.YP)(k, N),
                  (0, J.YP)(C, (e) => {
                    const { custom: t, config: n } = e,
                      { shouldUpdate: l } = n
                    ;(n._editable = 2 === l),
                      (n.enabled = !!n.enabled),
                      (n.shouldUpdate = !!l),
                      (n.notifyUpdates = (0, D.jd)(n.notifyUpdates)),
                      (t.noframes = (0, D.jd)(t.noframes))
                    for (const e in Bl) null == t[e] && (t[e] = Bl[e])
                    for (let e = 0; e < Xl.length; e++) {
                      const n = Xl[e]
                      t[n] || (t[n] = "")
                    }
                    for (let e = 0; e < Jl.length; e++) {
                      const n = Jl[e],
                        l = t[n]
                      t[n] = l ? `${l.join("\n")}${l.length ? "\n" : ""}` : ""
                    }
                    q(), n.removed || (c = (0, re.p$)(e))
                  })
                {
                  const e = l.initial
                  ;(_.value = l.initialCode),
                    (C.value = (0, re.p$)(e)),
                    (0, J.YP)(() => C.value.config, q, { deep: !0 }),
                    (0, J.YP)(() => C.value.custom, q, { deep: !0 })
                }
                async function V() {
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
                        config: { enabled: +t.enabled, notifyUpdates: l ? +l : null, shouldUpdate: ta(t) },
                        custom: {
                          ...(0, re.zr)(n, u.keys(Bl), Kl),
                          ...(0, re.zr)(n, Jl, Gl),
                          ...(0, re.zr)(n, Xl, Ql),
                          noframes: i ? +i : null,
                        },
                        isNew: !r,
                        message: "",
                        reuseDeps: !0,
                      }),
                      d = null == c || null == (s = c.where) ? void 0 : s.id
                    a.markClean(),
                      (k.value = !1),
                      (x.value = !1),
                      (M.value = !1),
                      (z.value = c.errors),
                      (C.value = c.update),
                      d && !r && history.replaceState(null, O.value, `${y}/${d}`),
                      (H.value = null)
                  } catch (e) {
                    H.value = e.message.split("\n")
                  }
                }
                function Z(e) {
                  var t
                  e || "code" === f.value
                    ? (n("close"), w && (null == (t = (0, W.vY)()) || t.blur()))
                    : (f.value = "code")
                }
                async function Y() {
                  await V(), Z(!0)
                }
                function P(e) {
                  const t = u.keys(E.value)
                  f.value = t[(t.indexOf(f.value) + e + t.length) % t.length]
                }
                function A() {
                  P(-1)
                }
                function F() {
                  P(1)
                }
                function q(e) {
                  const t = C.value,
                    { config: n } = t,
                    { removed: a } = n,
                    o = (t._remote = !!(0, D.TZ)(t)) && ta(n),
                    i = !(!a && 1 !== o && !l.readOnly)
                  ;(R.value = i), (M.value = !a && (i || o >= 1)), !a && e && N()
                }
                function N() {
                  x.value = k.value || !(0, re.vZ)(C.value, c)
                }
                async function B(e) {
                  j.Z.get("editorWindow") &&
                    (e || (e = (await (null == D.oy ? void 0 : D.oy.getCurrent())) || {}),
                    "normal" === e.state &&
                      j.Z.set("editorWindowPos", (0, re.zr)(e, ["left", "top", "width", "height"])))
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
                  (0, J.bv)(() => {
                    var t, n
                    ;(o = v.value),
                      (a = o.cm),
                      (m = (0, I.Q$)(null, () => a.focus())),
                      j.Z.get("editorWindow") &&
                        1 === e.history.length &&
                        (null == (n = browser.windows) || n.getCurrent({ populate: !0 }).then(K)),
                      (L.storageSize = 0)
                    const l = u.values(E.value),
                      i = (U.value = [
                        ["Alt-PageUp", ` ${l.join(" < ")}`],
                        ["Alt-PageDown", ` ${l.join(" > ")}`],
                        ...u.entries(o.expandKeyMap()).sort((e, t) => ea(e[1], t[1]) || ea(e[0], t[0])),
                      ])
                    ;(r = null == (t = i.find(([, e]) => "save" === e)) ? void 0 : t[0]),
                      r || ((r = "Ctrl-S"), i.unshift([r, "save"]))
                  }),
                  (0, J.dl)(() => {
                    document.body.classList.add("edit-open"),
                      (i = [
                        oe.$J.register("a-pageup", A),
                        oe.$J.register("a-pagedown", F),
                        oe.$J.register(r.replace(/(?:Ctrl|Cmd)-/i, "ctrlcmd-"), V),
                        oe.$J.register("escape", Z),
                        oe.$J.register("f1", () => {
                          f.value = "help"
                        }),
                      ]),
                      (L.title = O.value)
                  }),
                  (0, J.se)(() => {
                    var e
                    document.body.classList.remove("edit-open"),
                      (L.title = null),
                      m(!1),
                      null == (e = i) || e.forEach((e) => e())
                  }),
                  (e, n) => (
                    (0, J.wg)(),
                    (0, J.iD)(
                      "div",
                      { class: (0, G.C_)(["edit frame flex flex-col abs-full", { frozen: R.value }]) },
                      [
                        (0, J._)("div", Dl, [
                          (0, J._)("nav", null, [
                            ((0, J.wg)(!0),
                            (0, J.iD)(
                              J.HY,
                              null,
                              (0, J.Ko)(
                                E.value,
                                (e, t) => (
                                  (0, J.wg)(),
                                  (0, J.iD)(
                                    "div",
                                    {
                                      key: t,
                                      class: (0, G.C_)(["edit-nav-item", { active: f.value === t }]),
                                      textContent: (0, G.zw)(e),
                                      onClick: (e) => (f.value = t),
                                    },
                                    null,
                                    10,
                                    $l
                                  )
                                )
                              ),
                              128
                            )),
                          ]),
                          (0, J._)("div", Hl, [
                            C.value.config.removed
                              ? ((0, J.wg)(),
                                (0, J.iD)(
                                  "span",
                                  {
                                    key: 0,
                                    class: "subtle",
                                    textContent: (0, G.zw)((0, T.SU)(D.ag)("headerRecycleBin") + " / "),
                                  },
                                  null,
                                  8,
                                  jl
                                ))
                              : (0, J.kq)("", !0),
                            (0, J.Uk)(" " + (0, G.zw)(O.value), 1),
                          ]),
                          R.value && "code" === f.value
                            ? ((0, J.wg)(),
                              (0, J.iD)(
                                "p",
                                {
                                  key: 0,
                                  textContent: (0, G.zw)((0, T.SU)(D.ag)("readonly")),
                                  class: "text-upper text-right text-red",
                                },
                                null,
                                8,
                                Wl
                              ))
                            : ((0, J.wg)(),
                              (0, J.iD)("div", Rl, [
                                (0, J._)(
                                  "a",
                                  {
                                    href: (0, T.SU)(W.XB),
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    textContent: (0, G.zw)((0, T.SU)(D.ag)("editHowToHint")),
                                  },
                                  null,
                                  8,
                                  Tl
                                ),
                              ])),
                          (0, J._)("div", Il, [
                            (0, J.wy)(
                              (0, J._)(
                                "button",
                                {
                                  textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonSave")),
                                  onClick: V,
                                  disabled: !x.value,
                                  class: (0, G.C_)({ "has-error": (e.$fe = H.value || z.value) }),
                                  title: e.$fe,
                                },
                                null,
                                10,
                                Ml
                              ),
                              [[ie.F8, x.value || !R.value]]
                            ),
                            (0, J.wy)(
                              (0, J._)(
                                "button",
                                {
                                  textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonSaveClose")),
                                  onClick: Y,
                                  disabled: !x.value,
                                },
                                null,
                                8,
                                El
                              ),
                              [[ie.F8, x.value || !R.value]]
                            ),
                            (0, J._)(
                              "button",
                              {
                                textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonClose")),
                                onClick: n[0] || (n[0] = (e) => Z(!0)),
                                title: "Esc",
                              },
                              null,
                              8,
                              Ol
                            ),
                          ]),
                        ]),
                        M.value && "code" === f.value
                          ? ((0, J.wg)(),
                            (0, J.iD)("div", Vl, [
                              (0, J._)("p", { textContent: (0, G.zw)((0, T.SU)(D.ag)("readonlyNote")) }, null, 8, Zl),
                              ((0, J.wg)(),
                              (0, J.j4)(
                                J.Ob,
                                null,
                                [
                                  (0, J.Wm)((0, T.SU)(Lt), { class: "flex ml-2c", script: C.value }, null, 8, [
                                    "script",
                                  ]),
                                ],
                                1024
                              )),
                            ]))
                          : (0, J.kq)("", !0),
                        H.value
                          ? ((0, J.wg)(),
                            (0, J.iD)("p", Yl, [
                              (0, J._)("b", { textContent: (0, G.zw)(H.value[0]) }, null, 8, Ll),
                              (0, J.Uk)(" " + (0, G.zw)(H.value[1]), 1),
                            ]))
                          : (0, J.kq)("", !0),
                        (0, J.wy)(
                          (0, J.Wm)(
                            (0, T.SU)(Wt.default),
                            {
                              class: (0, G.C_)(["flex-auto", { readonly: R.value }]),
                              value: _.value,
                              readOnly: R.value,
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
                          [[ie.F8, "code" === f.value]]
                        ),
                        ((0, J.wg)(),
                        (0, J.j4)(
                          J.Ob,
                          { ref_key: "$tabBody", ref: h },
                          [
                            "settings" === f.value
                              ? ((0, J.wg)(),
                                (0, J.j4)(
                                  (0, T.SU)(Dn),
                                  (0, J.dG)({ key: 0, class: "edit-body" }, { readOnly: t.readOnly, script: C.value }),
                                  null,
                                  16
                                ))
                              : "values" === f.value
                                ? ((0, J.wg)(),
                                  (0, J.j4)(
                                    (0, T.SU)(wl),
                                    (0, J.dG)(
                                      { key: 1, class: "edit-body" },
                                      { readOnly: t.readOnly, script: C.value }
                                    ),
                                    null,
                                    16
                                  ))
                                : "externals" === f.value
                                  ? ((0, J.wg)(),
                                    (0, J.j4)(
                                      (0, T.SU)(Rt.Z),
                                      { key: 2, class: "flex-auto", value: C.value },
                                      null,
                                      8,
                                      ["value"]
                                    ))
                                  : "help" === f.value
                                    ? ((0, J.wg)(),
                                      (0, J.j4)(
                                        (0, T.SU)(zl),
                                        { key: 3, class: "edit-body", hotkeys: U.value },
                                        null,
                                        8,
                                        ["hotkeys"]
                                      ))
                                    : (0, J.kq)("", !0),
                          ],
                          1536
                        )),
                        z.value || $.value
                          ? ((0, J.wg)(),
                            (0, J.iD)("div", Pl, [
                              $.value
                                ? ((0, J.wg)(),
                                  (0, J.j4)(
                                    (0, T.SU)(me.Z),
                                    { key: 0, "i18n-key": "hashPatternWarning" },
                                    {
                                      default: (0, J.w5)(() => [
                                        (0, J._)("code", { textContent: (0, G.zw)($.value) }, null, 8, Al),
                                      ]),
                                      _: 1,
                                    }
                                  ))
                                : (0, J.kq)("", !0),
                              ((0, J.wg)(!0),
                              (0, J.iD)(
                                J.HY,
                                null,
                                (0, J.Ko)(
                                  z.value,
                                  (e) => (
                                    (0, J.wg)(),
                                    (0, J.iD)(
                                      "p",
                                      { key: e, textContent: (0, G.zw)(e), class: "text-red" },
                                      null,
                                      8,
                                      Fl
                                    )
                                  )
                                ),
                                128
                              )),
                              z.value
                                ? ((0, J.wg)(),
                                  (0, J.iD)("p", ql, [
                                    (0, J._)("a", {
                                      href: Nl,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      textContent: Nl,
                                    }),
                                  ]))
                                : (0, J.kq)("", !0),
                            ]))
                          : (0, J.kq)("", !0),
                      ],
                      2
                    )
                  )
                )
              },
            },
            oa = aa,
            ia = { key: 0 },
            sa = { class: "flex" },
            ra = { class: "btn-group" },
            ca = { class: "btn-ghost", tabindex: "0" },
            ua = ["textContent"],
            da = ["textContent"],
            pa = ["textContent"],
            ma = ["textContent", "onClick"],
            ga = { key: 0, class: "btn-group" },
            va = ["data-batch-action", "onClick"],
            ha = ["textContent"],
            fa = { key: 1, class: "ml-1" },
            ba = ["textContent"],
            wa = ["textContent"],
            ya = (0, J._)("div", { class: "flex-auto" }, null, -1),
            xa = ["value"],
            Ca = ["textContent", "value"],
            _a = { class: "btn-ghost", tabindex: "0" },
            ka = { class: "mr-2c" },
            Sa = ["title", "placeholder"],
            Ua = { class: "filter-search-tooltip" },
            za = ["textContent"],
            Da = ["innerHTML"],
            $a = { key: 0, class: "hint mx-1 my-1 flex flex-col" },
            Ha = ["textContent"],
            ja = ["textContent"],
            Wa = ["textContent"],
            Ra = ["data-columns", "data-show-order", "data-table"],
            Ta = "edit",
            Ia = "remove",
            Ma = "restore",
            Ea = "toggle",
            Oa = "undo",
            Va = "update",
            Za = "tabScripts",
            Ya = "toggle-on",
            La = {
              __name: "tab-installed",
              setup(e) {
                const n = {
                    sort: {
                      exec: { title: (0, D.ag)("filterExecutionOrder") },
                      alpha: {
                        title: (0, D.ag)("filterAlphabeticalOrder"),
                        compare: ({ $cache: { lowerName: e } }, { $cache: { lowerName: t } }) => (e < t ? -1 : e > t),
                      },
                      [Va]: {
                        title: (0, D.ag)("filterLastUpdateOrder"),
                        compare: ({ props: { lastUpdated: e } }, { props: { lastUpdated: t } }) =>
                          (+t || 0) - (+e || 0),
                      },
                      size: { title: (0, D.ag)("filterSize"), compare: (e, t) => t.$cache.sizeNum - e.$cache.sizeNum },
                    },
                  },
                  l = (0, T.qj)({
                    searchScope: null,
                    showEnabledFirst: null,
                    showOrder: null,
                    viewSingleColumn: null,
                    viewTable: null,
                    sort: null,
                  })
                b(re.SE, l, (e) => {
                  ;(0, se.Z)(`filters.${e}`, (t) => {
                    ;(l[e] = t), "sort" !== e || n.sort[t] || (l[e] = u.keys(n.sort)[0])
                  })
                })
                const a = `${Za} && inputFocus`,
                  i = `${Za} && !inputFocus`,
                  s = `${i} && selectedScript && !showRecycle`,
                  c = `${i} && selectedScript && showRecycle`,
                  g = `${i} && !buttonFocus`,
                  h = `${i} && selectedScript && showHotkeys`,
                  f = { [Ta]: "e", [Ea]: "space", [Va]: "r", [Ma]: "r", [Ia]: "x" },
                  y = (e, t) => t.map(([t, n, l]) => oe.$J.register(t, e, { condition: n, caseSensitive: l }))
                let x,
                  C = 0,
                  _ = [],
                  S = []
                const U = (0, T.iH)(),
                  z = (0, T.iH)(),
                  $ = (0, T.iH)(),
                  H = (0, T.qj)({
                    focusedIndex: -1,
                    menuNew: !1,
                    showHotkeys: !1,
                    search: (L.search = { value: "", error: null, ...V("") }),
                    sortedScripts: [],
                    filteredScripts: [],
                    script: null,
                    code: "",
                    numColumns: 1,
                    batchRender: { limit: C },
                    batchAction: { action: null, [Oa]: null },
                  }),
                  M = (0, J.Fl)(() => L.route.paths[0] === k),
                  E = (0, J.Fl)(() => !M.value && "exec" === l.sort),
                  O = (0, J.Fl)(() => W.T && E.value),
                  Z = (0, J.Fl)(() => {
                    var e
                    return null == (e = n.sort[l.sort]) ? void 0 : e.compare
                  }),
                  P = (0, J.Fl)(() => H.filteredScripts[H.focusedIndex]),
                  A = (0, J.Fl)(() =>
                    L.loading ||
                    (H.search.rules.length ? H.sortedScripts.find((e) => !1 !== e.$cache.show) : H.sortedScripts.length)
                      ? null
                      : (0, D.ag)("labelNoSearchScripts")
                  ),
                  F = (0, J.Fl)(
                    () =>
                      H.search.rules.some((e) => !e.scope || "code" === e.scope) &&
                      L.scripts.filter((e) => null == e.$cache.code).map((e) => e.props.id)
                  ),
                  q = (0, J.Fl)(() =>
                    H.search.tokens.filter((e) => "#" === e.prefix && !e.negative).map((e) => e.parsed)
                  ),
                  K = () => (M.value ? L.removedScripts : L.scripts),
                  X = (e) => e.target.closest("[data-batch-action]"),
                  Q = {
                    [Ea]: {
                      icon: Ya,
                      arg(e) {
                        const t = this.icon === Ya ? 1 : 0
                        return e.filter((e) => +e.config.enabled !== t)
                      },
                      fn: (e) => d.all(e.map(ze)),
                    },
                    [Va]: { icon: "refresh", fn: De, [Oa]: !1 },
                    [Ia]: {
                      icon: "trash",
                      async fn(e, t, n) {
                        await d.all(e.map((e) => N(e, !n))), n || (L.scripts = [])
                      },
                    },
                  },
                  ee = (0, J.Fl)(() => {
                    const e = H.filteredScripts,
                      t = e.length,
                      n = t === H.sortedScripts.length
                    let l = Q,
                      a = 0,
                      o = 0
                    for (let t = 0; t < e.length; t++) {
                      const l = e[t]
                      ;(a += !l.config.enabled), n || (o += l.$canUpdate > 0)
                    }
                    return (
                      (l[Ea].icon = a ? Ya : "toggle-off"),
                      (l[Ea].num = a < t ? a : ""),
                      o ? (l[Va].num = o < t ? o : "") : ({ [Va]: o, ...l } = l),
                      l
                    )
                  }),
                  te = (0, D.Ds)(() => {
                    try {
                      ;(H.search = L.search = { ...H.search, ...V(H.search.value) }), (H.search.error = null)
                    } catch (e) {
                      H.search.error = e.message
                    }
                    const e = F.value
                    null != e && e.length && xe(e), ge()
                  }, 100),
                  ne = (0, D.Ds)(ye)
                function le() {
                  !M.value &&
                    L.needRefresh &&
                    ((L.scripts = L.scripts.filter((e) => !e.config.removed)), (L.needRefresh = !1)),
                    (H.focusedIndex = -1),
                    ge()
                }
                async function ae() {
                  const e = F.value
                  null != e && e.length && (await xe(e)), ge(), we()
                }
                function ge() {
                  const e = [...K()],
                    t = H.search.rules,
                    n = t.length ? Y(e, t) : e.length,
                    a = Z.value
                  var o
                  a &&
                    e.sort(
                      ((o = a), l.showEnabledFirst ? (e, t) => t.config.enabled - e.config.enabled || o(e, t) : o)
                    ),
                    (H.sortedScripts = e),
                    (H.filteredScripts = t.length ? e.filter(({ $cache: e }) => e.show) : e),
                    ke(H.focusedIndex),
                    !C || n < C ? ye() : ne()
                }
                async function ve() {
                  try {
                    var e
                    let t = await (0, W.GW)((0, D.ag)("hintInputURL"), { input: "", ok: { type: "submit" } })
                    ;(t = null == (e = t) ? void 0 : e.trim()),
                      t &&
                        (t.includes("://") || (t = `https://${t}`),
                        new URL(t),
                        await (0, D.gj)("ConfirmInstall", { url: t }))
                  } catch (e) {
                    e && (0, W.PV)({ text: e })
                  }
                }
                async function he(e, t) {
                  if (e === t) return
                  const n = H.filteredScripts,
                    l = L.scripts,
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
                    ge())
                }
                function fe(e) {
                  j.Z.set("filters.sort", e.target.value)
                }
                function be(e) {
                  const n = b(D.Hv, [M.value ? k : o, e], "/")
                  e || n !== (0, I.Qs)().pathname ? (0, I.pV)(n) : t.history.back()
                }
                async function we() {
                  const [e, t, n] = L.route.paths,
                    l = "_new" === t && (await (0, D.gj)("NewScript", +n)),
                    a = l ? l.script : +t && K().find((e) => e.props.id === +t)
                  if (a) return (H.code = l ? l.code : await (0, D.gj)("GetScriptCode", t)), void (H.script = a)
                  if (
                    (t && (0, I.pV)(e, !0),
                    L.canRenderScripts || ((L.canRenderScripts = !0), Gs()),
                    ye(),
                    (H.script = null),
                    !w)
                  ) {
                    const e = $.value,
                      t = e.scrollTop
                    ;(0, J.Y3)(() => {
                      e.scrollTop = t
                    })
                  }
                }
                async function ye() {
                  if (!L.canRenderScripts) return
                  const { length: e } = H.sortedScripts
                  let t = 9
                  const n = (0, T.qj)({ limit: t })
                  H.batchRender = n
                  const l = v.now()
                  for (; t < e && n === H.batchRender; ) {
                    if (C && H.search.rules.length)
                      for (let n = 0; n < C && t < e; t += 1) n += H.sortedScripts[t].$cache.show ? 1 : 0
                    else t += C || 1
                    ;(n.limit = t),
                      await new d((e) => (0, J.Y3)(e)),
                      !C && v.now() - l >= 100 && (C = 2 * t),
                      C && t < e && (await (0, D.dL)())
                  }
                }
                async function xe(e) {
                  const t = await (0, D.gj)("GetScriptCode", e)
                  L.scripts.forEach(({ $cache: e, props: { id: n } }) => {
                    n in t && (e.code = t[n])
                  }),
                    ge()
                }
                async function Ce() {
                  ;(await (0, W.GW)((0, D.ag)("buttonEmptyRecycleBin"))) &&
                    ((0, D.gj)("CheckRemove", { force: !0 }), (L.removedScripts = []))
                }
                function _e() {
                  const e = l.viewTable ? _ : S
                  H.numColumns = l.viewSingleColumn ? 1 : e.findIndex((e) => t.innerWidth < e) + 1 || e.length + 1
                }
                function ke(e) {
                  ;(e = Math.min(e, H.filteredScripts.length - 1)),
                    (e = Math.max(e, -1)) !== H.focusedIndex && (H.focusedIndex = e)
                }
                function Se(e) {
                  e.config.removed ? (0, D.gj)("RemoveScripts", [e.props.id]) : N(e, 1)
                }
                async function Ue(e) {
                  try {
                    await N(e, 0)
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
                  if (L.batch) return
                  const t = X(e),
                    n = H.batchAction
                  let l = null == t ? void 0 : t.dataset.batchAction
                  if (n.action === l) {
                    const e = ee.value[l] || {},
                      a = H.filteredScripts,
                      o = (null == e.arg ? void 0 : e.arg(a)) || a,
                      i = e.fn,
                      s = [i, o, t]
                    i && B(...s),
                      (n[Oa] =
                        i &&
                        !1 !== e[Oa] &&
                        (() => {
                          B(...s, Oa), (n[Oa] = null)
                        })),
                      (l = ""),
                      t.blur()
                  }
                  n.action = l
                }
                function We() {
                  const e = () => {
                    var e
                    oe.$J.setContext("buttonFocus", (null == (e = (0, W.vY)()) ? void 0 : e.tabIndex) >= 0)
                  }
                  p("focus", e, !0)
                  const t = [
                    () => m("focus", e, !0),
                    ...(w
                      ? [
                          oe.$J.register("tab", () => {
                            ;(0, oe.nk)(1)
                          }),
                          oe.$J.register("s-tab", () => {
                            ;(0, oe.nk)(-1)
                          }),
                        ]
                      : []),
                    ...y(() => {
                      var e
                      null == (e = U.value) || e.focus()
                    }, [
                      ["ctrlcmd-f", Za],
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
                      e < 0 ? (e = 0) : (e += H.numColumns), e < H.filteredScripts.length && ke(e)
                    }, [
                      ["ctrlcmd-down", Za],
                      ["down", Za],
                      ["j", i, !0],
                    ]),
                    ...y(() => {
                      const e = H.focusedIndex - H.numColumns
                      e >= 0 && ke(e)
                    }, [
                      ["ctrlcmd-up", Za],
                      ["up", Za],
                      ["k", i, !0],
                    ]),
                    ...y(() => {
                      ke(H.focusedIndex - 1)
                    }, [
                      ["ctrlcmd-left", Za],
                      ["left", i],
                      ["h", i, !0],
                    ]),
                    ...y(() => {
                      ke(H.focusedIndex + 1)
                    }, [
                      ["ctrlcmd-right", Za],
                      ["right", i],
                      ["l", i, !0],
                    ]),
                    ...y(() => {
                      ke(0)
                    }, [
                      ["ctrlcmd-home", Za],
                      ["g g", i, !0],
                    ]),
                    ...y(() => {
                      ke(H.filteredScripts.length - 1)
                    }, [
                      ["ctrlcmd-end", Za],
                      ["G", i, !0],
                    ]),
                    ...y(() => {
                      be(P.value.props.id)
                    }, [
                      [f[Ta], s, !0],
                      ["enter", g],
                    ]),
                    ...y(() => {
                      Se(P.value)
                    }, [
                      ["delete", s],
                      [f[Ia], s, !0],
                    ]),
                    ...y(() => {
                      De(P.value)
                    }, [[f[Va], s, !0]]),
                    ...y(() => {
                      ze(P.value)
                    }, [[f[Ea], s, !0]]),
                    ...y(() => {
                      Ue(P.value)
                    }, [[f[Ma], c, !0]]),
                    ...y(() => {
                      H.showHotkeys = !H.showHotkeys
                    }, [["?", i, !0]]),
                  ]
                  return () =>
                    t.forEach((e) => {
                      e()
                    })
                }
                function Re(e) {
                  X(e) || (H.batchAction.action = null)
                }
                le(),
                  (0, J.YP)(M, le),
                  (0, J.YP)(
                    () => L.canRenderScripts && z.value && E.value,
                    (e) => Ze(z.value, he, e)
                  ),
                  (0, J.YP)(() => H.search.value, te),
                  (0, J.YP)(() => [l.sort, l.showEnabledFirst], te),
                  screen.availWidth > 767 &&
                    ((0, J.YP)(() => l.viewSingleColumn, _e),
                    (0, J.YP)(
                      () => l.viewTable,
                      (e) => {
                        if ((_e(), e && !x)) {
                          x = (0, R.w)("-width: 76")
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
                  (0, J.YP)(K, ae),
                  (0, J.YP)(() => L.route.paths[1], we),
                  (0, J.YP)(P, (e) => {
                    oe.$J.setContext("selectedScript", e)
                  }),
                  (0, J.YP)(
                    () => H.showHotkeys,
                    (e) => {
                      oe.$J.setContext("showHotkeys", e)
                    }
                  )
                const Te = []
                return (
                  (0, J.bv)(() => {
                    if ((L.loading || ae(), !S.length)) {
                      const e =
                        (null == R.$ ? void 0 : R.$.textContent.match(/--columns-(cards|table)\b/)) &&
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
                      p("resize", _e)
                    }
                    _e(),
                      Te.push(We()),
                      document.addEventListener("mousedown", Re),
                      Te.push(() => document.removeEventListener("mousedown", Re))
                  }),
                  (0, J.Jd)(() => {
                    Te.forEach((e) => e())
                  }),
                  (e, t) => (
                    (0, J.wg)(),
                    (0, J.iD)(
                      "div",
                      { class: "tab-installed", ref_key: "scroller", ref: $ },
                      [
                        (0, T.SU)(L).canRenderScripts
                          ? ((0, J.wg)(),
                            (0, J.iD)("div", ia, [
                              (0, J._)("header", sa, [
                                M.value
                                  ? ((0, J.wg)(),
                                    (0, J.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "ml-2",
                                        textContent: (0, G.zw)((0, T.SU)(D.ag)("headerRecycleBin")),
                                      },
                                      null,
                                      8,
                                      wa
                                    ))
                                  : ((0, J.wg)(),
                                    (0, J.iD)(
                                      J.HY,
                                      { key: 0 },
                                      [
                                        (0, J._)("div", ra, [
                                          (0, J.Wm)(
                                            (0, T.SU)(ce.Z),
                                            {
                                              modelValue: H.menuNew,
                                              "onUpdate:modelValue": t[1] || (t[1] = (e) => (H.menuNew = e)),
                                              class: (0, G.C_)({ active: H.menuNew }),
                                              closeAfterClick: !0,
                                            },
                                            {
                                              content: (0, J.w5)(() => [
                                                (0, J._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonNew")),
                                                    tabindex: "0",
                                                    onClick:
                                                      t[0] || (t[0] = (0, ie.iM)((e) => be("_new"), ["prevent"])),
                                                  },
                                                  null,
                                                  8,
                                                  ua
                                                ),
                                                (0, J._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, G.zw)(
                                                      (0, T.SU)(D.ag)("installFrom", "OpenUserJS")
                                                    ),
                                                    href: "https://openuserjs.org/",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  da
                                                ),
                                                (0, J._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, G.zw)(
                                                      (0, T.SU)(D.ag)("installFrom", "GreasyFork")
                                                    ),
                                                    href: "https://greasyfork.org/scripts",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                  },
                                                  null,
                                                  8,
                                                  pa
                                                ),
                                                (0, J._)(
                                                  "a",
                                                  {
                                                    class: "dropdown-menu-item",
                                                    textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonInstallFromURL")),
                                                    tabindex: "0",
                                                    onClick: (0, ie.iM)(ve, ["prevent"]),
                                                  },
                                                  null,
                                                  8,
                                                  ma
                                                ),
                                              ]),
                                              default: (0, J.w5)(() => [
                                                (0, J.Wm)(
                                                  (0, T.SU)(ue.Z),
                                                  {
                                                    content: (0, T.SU)(D.ag)("buttonNew"),
                                                    placement: "bottom",
                                                    align: "start",
                                                    disabled: H.menuNew,
                                                  },
                                                  {
                                                    default: (0, J.w5)(() => [
                                                      (0, J._)("a", ca, [(0, J.Wm)((0, T.SU)(pe.Z), { name: "plus" })]),
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
                                          (0, J.Wm)(
                                            (0, T.SU)(ue.Z),
                                            {
                                              content: (0, T.SU)(D.ag)("buttonUpdateAll"),
                                              placement: "bottom",
                                              align: "start",
                                            },
                                            {
                                              default: (0, J.w5)(() => [
                                                (0, J._)(
                                                  "a",
                                                  {
                                                    class: "btn-ghost",
                                                    tabindex: "0",
                                                    onClick: t[2] || (t[2] = (e) => De(null, e.target)),
                                                  },
                                                  [(0, J.Wm)((0, T.SU)(pe.Z), { name: "refresh" })]
                                                ),
                                              ]),
                                              _: 1,
                                            },
                                            8,
                                            ["content"]
                                          ),
                                        ]),
                                        H.filteredScripts.length
                                          ? ((0, J.wg)(),
                                            (0, J.iD)("div", ga, [
                                              ((0, J.wg)(!0),
                                              (0, J.iD)(
                                                J.HY,
                                                null,
                                                (0, J.Ko)(
                                                  ee.value,
                                                  ({ icon: e, num: t }, n) => (
                                                    (0, J.wg)(),
                                                    (0, J.iD)(
                                                      "a",
                                                      {
                                                        key: n,
                                                        class: (0, G.C_)([
                                                          "btn-ghost",
                                                          {
                                                            "has-error": H.batchAction.action === n,
                                                            disabled: (0, T.SU)(L).batch,
                                                          },
                                                        ]),
                                                        "data-batch-action": n,
                                                        tabindex: "0",
                                                        onClick: (0, ie.iM)(je, ["prevent"]),
                                                      },
                                                      [
                                                        (0, J.Wm)((0, T.SU)(pe.Z), { name: e }, null, 8, ["name"]),
                                                        t
                                                          ? ((0, J.wg)(),
                                                            (0, J.iD)(
                                                              "sub",
                                                              { key: 0, textContent: (0, G.zw)(t) },
                                                              null,
                                                              8,
                                                              ha
                                                            ))
                                                          : (0, J.kq)("", !0),
                                                        H.batchAction.action === n
                                                          ? ((0, J.wg)(), (0, J.iD)("span", fa, "\u2757"))
                                                          : (0, J.kq)("", !0),
                                                      ],
                                                      10,
                                                      va
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                              (0, J._)(
                                                "div",
                                                {
                                                  class: "btn-hint subtle",
                                                  textContent: (0, G.zw)(
                                                    (0, T.SU)(D.ag)("hintForBatchAction", `${H.filteredScripts.length}`)
                                                  ),
                                                },
                                                null,
                                                8,
                                                ba
                                              ),
                                              (0, J.Wm)(
                                                (0, T.SU)(ue.Z),
                                                {
                                                  content: (0, T.SU)(D.ag)("buttonUndo"),
                                                  placement: "bottom",
                                                  align: "start",
                                                },
                                                {
                                                  default: (0, J.w5)(() => [
                                                    H.batchAction.undo
                                                      ? ((0, J.wg)(),
                                                        (0, J.iD)(
                                                          "a",
                                                          {
                                                            key: 0,
                                                            class: "btn-ghost",
                                                            tabindex: "0",
                                                            onClick:
                                                              t[3] ||
                                                              (t[3] = (0, ie.iM)(
                                                                (...e) =>
                                                                  H.batchAction.undo && H.batchAction.undo(...e),
                                                                ["prevent"]
                                                              )),
                                                          },
                                                          [(0, J.Wm)((0, T.SU)(pe.Z), { name: "undo" })]
                                                        ))
                                                      : (0, J.kq)("", !0),
                                                  ]),
                                                  _: 1,
                                                },
                                                8,
                                                ["content"]
                                              ),
                                            ]))
                                          : (0, J.kq)("", !0),
                                      ],
                                      64
                                    )),
                                ya,
                                (0, J.Wm)(
                                  (0, T.SU)(me.Z),
                                  { "i18n-key": "labelFilterSort", class: "ml-1" },
                                  {
                                    default: (0, J.w5)(() => [
                                      (0, J._)(
                                        "select",
                                        { value: l.sort, onChange: fe, class: "h-100" },
                                        [
                                          ((0, J.wg)(!0),
                                          (0, J.iD)(
                                            J.HY,
                                            null,
                                            (0, J.Ko)(
                                              n.sort,
                                              (e, t) => (
                                                (0, J.wg)(),
                                                (0, J.iD)(
                                                  "option",
                                                  { textContent: (0, G.zw)(e.title), key: t, value: t },
                                                  null,
                                                  8,
                                                  Ca
                                                )
                                              )
                                            ),
                                            128
                                          )),
                                        ],
                                        40,
                                        xa
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                                (0, J.Wm)(
                                  (0, T.SU)(ce.Z),
                                  { align: "right", class: "filter-sort" },
                                  {
                                    content: (0, J.w5)(() => [
                                      (0, J.wy)(
                                        (0, J._)(
                                          "div",
                                          null,
                                          [
                                            (0, J.Wm)(
                                              (0, T.SU)(de.Z),
                                              {
                                                name: "filters.showEnabledFirst",
                                                label: (0, T.SU)(D.ag)("optionShowEnabledFirst"),
                                              },
                                              null,
                                              8,
                                              ["label"]
                                            ),
                                          ],
                                          512
                                        ),
                                        [[ie.F8, Z.value]]
                                      ),
                                      (0, J._)("div", null, [
                                        (0, J.Wm)(
                                          (0, T.SU)(de.Z),
                                          { name: "filters.showOrder", label: (0, T.SU)(D.ag)("labelShowOrder") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                      (0, J._)("div", ka, [
                                        (0, J.Wm)(
                                          (0, T.SU)(de.Z),
                                          { name: "filters.viewTable", label: (0, T.SU)(D.ag)("labelViewTable") },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                        (0, J.Wm)(
                                          (0, T.SU)(de.Z),
                                          {
                                            name: "filters.viewSingleColumn",
                                            label: (0, T.SU)(D.ag)("labelViewSingleColumn"),
                                          },
                                          null,
                                          8,
                                          ["label"]
                                        ),
                                      ]),
                                    ]),
                                    default: (0, J.w5)(() => [
                                      (0, J.Wm)(
                                        (0, T.SU)(ue.Z),
                                        { content: (0, T.SU)(D.ag)("labelSettings"), placement: "bottom" },
                                        {
                                          default: (0, J.w5)(() => [
                                            (0, J._)("a", _a, [(0, J.Wm)((0, T.SU)(pe.Z), { name: "cog" })]),
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
                                (0, J._)(
                                  "form",
                                  {
                                    class: "filter-search hidden-xs",
                                    onSubmit: t[5] || (t[5] = (0, ie.iM)(() => {}, ["prevent"])),
                                    style: (0, G.j5)({ "max-width": 5 + Math.max(20, H.search.value.length) + "ex" }),
                                  },
                                  [
                                    (0, J._)("label", null, [
                                      (0, J.wy)(
                                        (0, J._)(
                                          "input",
                                          {
                                            type: "search",
                                            class: (0, G.C_)({ "has-error": H.search.error }),
                                            title: H.search.error,
                                            placeholder: (0, T.SU)(D.ag)("labelSearchScript"),
                                            "onUpdate:modelValue": t[4] || (t[4] = (e) => (H.search.value = e)),
                                            ref_key: "refSearch",
                                            ref: U,
                                            id: "installed-search",
                                          },
                                          null,
                                          10,
                                          Sa
                                        ),
                                        [[ie.nr, H.search.value]]
                                      ),
                                      (0, J.Wm)((0, T.SU)(pe.Z), { name: "search" }),
                                    ]),
                                  ],
                                  36
                                ),
                                (0, J.Wm)(
                                  (0, T.SU)(ce.Z),
                                  { align: "right" },
                                  {
                                    content: (0, J.w5)(() => [
                                      (0, J._)("div", Ua, [
                                        H.search.error
                                          ? ((0, J.wg)(),
                                            (0, J.iD)(
                                              "div",
                                              { key: 0, class: "has-error", textContent: (0, G.zw)(H.search.error) },
                                              null,
                                              8,
                                              za
                                            ))
                                          : (0, J.kq)("", !0),
                                        (0, J._)(
                                          "div",
                                          { innerHTML: (0, T.SU)(D.ag)("titleSearchHintV2") },
                                          null,
                                          8,
                                          Da
                                        ),
                                      ]),
                                    ]),
                                    default: (0, J.w5)(() => [
                                      (0, J._)(
                                        "a",
                                        {
                                          class: (0, G.C_)(["btn-ghost", { "has-error": H.search.error }]),
                                          tabindex: "0",
                                        },
                                        [(0, J.Wm)((0, T.SU)(pe.Z), { name: "question" })],
                                        2
                                      ),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                              M.value
                                ? ((0, J.wg)(),
                                  (0, J.iD)("div", $a, [
                                    (0, J._)(
                                      "span",
                                      { textContent: (0, G.zw)((0, T.SU)(D.ag)("hintRecycleBin")) },
                                      null,
                                      8,
                                      Ha
                                    ),
                                    (0, T.SU)(L).removedScripts.length
                                      ? ((0, J.wg)(),
                                        (0, J.iD)(
                                          "a",
                                          {
                                            key: 0,
                                            textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonEmptyRecycleBin")),
                                            tabindex: "0",
                                            onClick: Ce,
                                          },
                                          null,
                                          8,
                                          ja
                                        ))
                                      : (0, J.kq)("", !0),
                                  ]))
                                : A.value
                                  ? ((0, J.wg)(),
                                    (0, J.iD)(
                                      "div",
                                      {
                                        key: 1,
                                        class: "hint mx-1 my-1 flex flex-col",
                                        textContent: (0, G.zw)(A.value),
                                      },
                                      null,
                                      8,
                                      Wa
                                    ))
                                  : (0, J.kq)("", !0),
                              (0, J.wy)(
                                ((0, J.wg)(),
                                (0, J.iD)(
                                  "div",
                                  {
                                    class: "scripts",
                                    ref_key: "refList",
                                    ref: z,
                                    style: (0, G.j5)(`--num-columns:${H.numColumns}`),
                                    "data-columns": H.numColumns,
                                    "data-show-order": l.showOrder || null,
                                    "data-table": l.viewTable || null,
                                  },
                                  [
                                    ((0, J.wg)(!0),
                                    (0, J.iD)(
                                      J.HY,
                                      null,
                                      (0, J.Ko)(H.sortedScripts, (e, t) =>
                                        (0, J.wy)(
                                          ((0, J.wg)(),
                                          (0, J.j4)(
                                            (0, T.SU)(jt),
                                            {
                                              key: e.props.id,
                                              focused: P.value === e,
                                              showHotkeys: H.showHotkeys,
                                              script: e,
                                              draggable: O.value,
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
                                          [[ie.F8, !H.search.rules.length || !1 !== e.$cache.show]]
                                        )
                                      ),
                                      128
                                    )),
                                  ],
                                  12,
                                  Ra
                                )),
                                [[(0, T.SU)(W.Tu), !H.script]]
                              ),
                            ]))
                          : (0, J.kq)("", !0),
                        ((0, J.wg)(),
                        (0, J.j4)(J.lR, { to: "body" }, [
                          ((0, J.wg)(),
                          (0, J.j4)(
                            J.Ob,
                            { key: (0, T.SU)(L).route.hash, max: 5 },
                            [
                              H.script
                                ? ((0, J.wg)(),
                                  (0, J.j4)(
                                    (0, T.SU)(oa),
                                    {
                                      key: 0,
                                      initial: H.script,
                                      "initial-code": H.code,
                                      "read-only": !!H.script.config.removed,
                                      onClose: t[6] || (t[6] = (e) => be()),
                                    },
                                    null,
                                    8,
                                    ["initial", "initial-code", "read-only"]
                                  ))
                                : (0, J.kq)("", !0),
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
            Pa = La,
            Aa = ["data-show-advanced"],
            Fa = ["textContent"],
            qa = { class: "mb-1c" },
            Na = ["textContent"],
            Ba = { class: "ml-2c flex flex-col" },
            Ka = ["textContent"],
            Ja = { class: "ml-2c" },
            Ga = ["onUpdate:modelValue"],
            Xa = ["value", "textContent"],
            Qa = ["onUpdate:modelValue"],
            eo = ["value", "textContent"],
            to = ["textContent"],
            no = ["onUpdate:modelValue"],
            lo = ["value", "textContent"],
            ao = ["textContent"],
            oo = ["onUpdate:modelValue"],
            io = ["textContent"],
            so = { class: "mb-1c" },
            ro = ["textContent"],
            co = { class: "ml-2c flex flex-col" },
            uo = { class: "ml-2c flex flex-col" },
            po = { class: "mb-2c" },
            mo = ["textContent"],
            go = (0, J._)("hr", null, null, -1),
            vo = ["open"],
            ho = ["onClick"],
            fo = { class: "mb-1c" },
            bo = ["textContent"],
            wo = ["onUpdate:modelValue"],
            yo = ["value", "textContent"],
            xo = { class: "ml-2c flex flex-col" },
            Co = ["textContent"],
            _o = ["onUpdate:modelValue"],
            ko = ["textContent"],
            So = ["textContent"],
            Uo = (0, J._)("code", null, "page", -1),
            zo = ["textContent"],
            Do = { key: 0 },
            $o = (0, J._)("code", null, "page", -1),
            Ho = ["textContent"],
            jo = ["href"],
            Wo = ["textContent"],
            Ro = ["textContent"],
            To = ["innerHTML"]
          var Io = z(3657)
          const Mo = (0, z(4288).HP)(async () => {
              await ("/public/lib/zip-no-worker.min.js",
              new d((e, t) => {
                const n = document.createElement("script")
                ;(n.src = "/public/lib/zip-no-worker.min.js"), (n.onload = e), (n.onerror = t), document.body.append(n)
              }))
              const { zip: e } = t,
                n = ["/public/lib/z-worker.js"]
              return e.configure({ workerScripts: { deflate: n, inflate: n } }), e
            }),
            Eo = ["textContent", "disabled"],
            Oo = ["textContent", "title"],
            Vo = { class: "mt-1" },
            Zo = (0, J._)("br", null, null, -1),
            Yo = { class: "import-report" },
            Lo = ["data-type"],
            Po = ["textContent"],
            Ao = ["textContent", "colspan"],
            Fo = {
              __name: "vm-import",
              setup(e) {
                const t = (0, T.qj)([]),
                  n = (0, T.iH)(),
                  l = (0, T.iH)(""),
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
                  L.batch || B(h, e)
                }
                async function h(e) {
                  if (!e) return
                  t.length = 0
                  const n = j.Z.get("importScriptData"),
                    a = await Mo(),
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
                    w = v.values || {}
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
                    await new d(b)),
                    await C(async (e, n, l) => {
                      const { meta: a, settings: o = {}, options: i } = n
                      if (!a || !i) return
                      const s = i.override || {}
                      ;(t[0].text = "Tampermonkey"),
                        (f[l] = {
                          config: { enabled: !1 !== o.enabled ? 1 : 0, shouldUpdate: i.check_for_updates ? 1 : 0 },
                          custom: {
                            downloadURL: "string" == typeof a.file_url ? a.file_url : void 0,
                            noframes: null == s.noframes ? void 0 : +!!s.noframes,
                            runAt: Tt.qh.test(i.run_at) ? i.run_at : void 0,
                            exclude: U(s.use_excludes),
                            include: U(s.use_includes),
                            match: U(s.use_matches),
                            origExclude: !1 !== s.merge_excludes,
                            origInclude: !1 !== s.merge_includes,
                            origMatch: !1 !== s.merge_matches,
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
                        ;(t[0].text = "Tampermonkey"), (w[c[l]] = n.data)
                      }, ".storage.json"),
                      (0, D.gj)("SetValueStores", w)),
                    s(h) && (delete h.sync, (0, D.gj)("SetOptions", h)),
                    (0, D.gj)("CheckPosition"),
                    await o.close(),
                    S(),
                    y && (l.value = y)
                }
                async function f() {
                  ;(await (0, W.GW)(a)) && ((l.value = ""), r.postMessage(!0), await new d(b))
                }
                function b(e) {
                  r.onMessage.addListener(function t() {
                    r.onMessage.removeListener(t), e()
                  })
                }
                function w(e) {
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
                    const e = L.route.hash === C ? p : m
                    e("dragend", l), e("dragleave", a), e("dragover", o), e("drop", i)
                  }
                }
                return (
                  (0, J.bv)(() => {
                    const e = w(n.value)
                    p("hashchange", e), e()
                  }),
                  (e, s) => (
                    (0, J.wg)(),
                    (0, J.iD)("div", null, [
                      (0, J._)(
                        "button",
                        {
                          textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonImportData")),
                          onClick: c,
                          ref_key: "buttonImport",
                          ref: n,
                          disabled: (0, T.SU)(L).batch,
                        },
                        null,
                        8,
                        Eo
                      ),
                      l.value
                        ? ((0, J.wg)(),
                          (0, J.iD)(
                            "button",
                            {
                              key: 0,
                              textContent: (0, G.zw)((0, T.SU)(D.ag)("buttonUndo") + l.value),
                              onClick: f,
                              class: "has-error",
                              title: (0, T.SU)(a),
                            },
                            null,
                            8,
                            Oo
                          ))
                        : (0, J.kq)("", !0),
                      (0, J._)("div", Vo, [
                        (0, J.Wm)((0, T.SU)(de.Z), { name: "importScriptData", label: (0, T.SU)(o) }, null, 8, [
                          "label",
                        ]),
                        Zo,
                        (0, J.Wm)((0, T.SU)(de.Z), { name: "importSettings", label: (0, T.SU)(i) }, null, 8, ["label"]),
                      ]),
                      (0, J._)("table", Yo, [
                        ((0, J.wg)(!0),
                        (0, J.iD)(
                          J.HY,
                          null,
                          (0, J.Ko)(
                            t,
                            ({ type: e, name: t, text: n }, l) => (
                              (0, J.wg)(),
                              (0, J.iD)(
                                "tr",
                                { key: l, "data-type": e },
                                [
                                  t
                                    ? ((0, J.wg)(), (0, J.iD)("td", { key: 0, textContent: (0, G.zw)(t) }, null, 8, Po))
                                    : (0, J.kq)("", !0),
                                  (0, J._)("td", { textContent: (0, G.zw)(n), colspan: t ? null : 2 }, null, 8, Ao),
                                ],
                                8,
                                Lo
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
            qo = Fo
          var No = z(950),
            Bo = z(4460),
            Ko = z(3557)
          const Jo = (0, D.ag)("msgDateFormatInfo", u.keys(Bo.q).join(", ")),
            Go = {
              __name: "vm-date-info",
              setup: (e) => (e, t) => (
                (0, J.wg)(),
                (0, J.j4)(
                  (0, T.SU)(ue.Z),
                  { content: (0, T.SU)(Jo), placement: "left", style: { "vertical-align": "middle" } },
                  {
                    default: (0, J.w5)(() => [
                      (0, J._)("a", { href: "https://momentjs.com/docs/#/displaying/format/", target: "_blank" }, [
                        (0, J.Wm)((0, T.SU)(pe.Z), { name: "info" }),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ["content"]
                )
              ),
            },
            Xo = { class: "export" },
            Qo = { class: "flex flex-wrap center-items mr-1c" },
            ei = ["textContent", "disabled"],
            ti = ["textContent"],
            ni = { class: "mt-1" },
            li = { class: "modal-content" },
            ai = ["download", "href"],
            oi = (0, J._)("br", null, null, -1),
            ii = (0, J._)("strong", null, "scripts.zip", -1),
            si = {
              __name: "vm-export",
              setup(e) {
                let t
                const n = (0, T.iH)(),
                  l = (0, T.iH)(!1),
                  a = (0, T.iH)(w && {}),
                  o = (0, J.Fl)(() => {
                    const e = n.value
                    return e && `${(0, Bo.p)(e.text.trim() || e.defaultValue)}.zip`
                  })
                async function i() {
                  try {
                    ;(l.value = !0), w && !t && (t = await (0, D.gj)("UA")), s(await c())
                  } finally {
                    l.value = !1
                  }
                }
                function s(e) {
                  const n = w && parseFloat(t.version),
                    l = o.value
                  if (n && ("win" === t.os ? n < 56 : "mac" === t.os ? n < 61 : n < 63)) {
                    const t = new FileReader()
                    ;(t.onload = () => {
                      a.value = { name: l, url: t.result }
                    }),
                      t.readAsDataURL(e)
                  } else (0, Ko.l)(e, l)
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
                  const a = ((0, re._M)(t, "items") || []).map(({ script: a, code: o }) => {
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
                  const o = await Mo(),
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
                  (0, J.wg)(),
                  (0, J.iD)("div", Xo, [
                    (0, J._)("div", Qo, [
                      (0, J._)(
                        "button",
                        { textContent: (0, G.zw)(e.i18n("buttonExportData")), onClick: i, disabled: l.value },
                        null,
                        8,
                        ei
                      ),
                      (0, J.Wm)(
                        (0, T.SU)($n.Z),
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
                      (0, J.Wm)((0, T.SU)(Go)),
                      (0, J._)("span", { hidden: "", textContent: (0, G.zw)(o.value) }, null, 8, ti),
                    ]),
                    (0, J._)("div", ni, [
                      (0, J.Wm)(
                        (0, T.SU)(de.Z),
                        { name: "exportValues", label: e.i18n("labelExportScriptData") },
                        null,
                        8,
                        ["label"]
                      ),
                    ]),
                    a.value
                      ? ((0, J.wg)(),
                        (0, J.j4)(
                          (0, T.SU)(No.Z),
                          {
                            key: 0,
                            transition: "in-out",
                            show: !!a.value.url,
                            onClose: t[0] || (t[0] = (e) => (a.value = {})),
                          },
                          {
                            default: (0, J.w5)(() => [
                              (0, J._)("div", li, [
                                (0, J._)(
                                  "a",
                                  { download: a.value.name, href: a.value.url },
                                  [(0, J.Uk)(" Right click and save as"), oi, ii],
                                  8,
                                  ai
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["show"]
                        ))
                      : (0, J.kq)("", !0),
                  ])
                )
              },
            },
            ri = si,
            ci = { class: "mr-1c" },
            ui = ["disabled", "textContent"],
            di = ["disabled", "title", "textContent"],
            pi = {
              __name: "vm-maintenance",
              setup(e) {
                const t = (0, T.iH)((0, D.ag)("buttonVacuum")),
                  n = (0, D.ag)("buttonResetSettings"),
                  l = (0, T.iH)(""),
                  a = (0, T.iH)(n)
                async function o(e, t) {
                  if (await (0, W.GW)(t, { ok: { className: "has-error" } })) return B(e)
                }
                function i() {
                  const e = ["lastModified", "lastUpdate", "sync"],
                    t = b(re.Xw, Io.ZP, null, (t, n) => !e.includes(t) && !(0, re.vZ)(n, j.Z.get(t)) && t)
                  return (
                    (l.value = JSON.stringify(t, null, 2)
                      .slice(1, -1)
                      .replace(/^\s{2}/gm, "")),
                    (a.value = `${n} (${u.keys(t).length})`),
                    (0, D.gj)("SetOptions", t)
                  )
                }
                async function s() {
                  await B(async () => {
                    t.value = (0, D.ag)("buttonVacuuming")
                    const { fixes: e, errors: n } = await (0, D.gj)("Vacuum"),
                      l = null == n ? void 0 : n.join("\n")
                    ;(t.value = (0, D.ag)("buttonVacuumed") + (e ? ` (${e})` : "")),
                      l && (0, W.GW)((0, D.ag)("msgErrorFetchingResource") + "\n\n" + l, { cancel: !1 })
                  })
                }
                return (e, r) => (
                  (0, J.wg)(),
                  (0, J.iD)("div", ci, [
                    (0, J.Wm)(
                      (0, T.SU)(ue.Z),
                      { content: (0, T.SU)(D.ag)("hintVacuum") },
                      {
                        default: (0, J.w5)(() => [
                          (0, J._)(
                            "button",
                            { onClick: s, disabled: (0, T.SU)(L).batch, textContent: (0, G.zw)(t.value) },
                            null,
                            8,
                            ui
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ["content"]
                    ),
                    (0, J._)(
                      "button",
                      {
                        onClick: r[0] || (r[0] = (e) => o(i, (0, T.SU)(n))),
                        disabled: (0, T.SU)(L).batch,
                        title: l.value,
                        textContent: (0, G.zw)(a.value),
                      },
                      null,
                      8,
                      di
                    ),
                  ])
                )
              },
            },
            mi = { class: "mb-1c" },
            gi = ["textContent"],
            vi = { key: 0, class: "flex flex-wrap center-items" },
            hi = ["textContent"],
            fi = ["value"],
            bi = ["textContent", "value"],
            wi = ["textContent", "disabled"],
            yi = ["disabled"],
            xi = ["textContent"],
            Ci = { key: 1, class: "mt-1c" },
            _i = { class: "sync-server-url" },
            ki = ["textContent"],
            Si = ["disabled"],
            Ui = { class: "mr-2c" },
            zi = ["textContent"],
            Di = ["disabled"],
            $i = { class: "inline-block" },
            Hi = ["textContent"],
            ji = ["disabled"],
            Wi = ["disabled"],
            Ri = ["textContent"],
            Ti = ["textContent", "disabled"],
            Ii = { key: 2 },
            Mi = "sync.current",
            Ei = { current: "" }
          ;(0, se.Z)(Mi, (e) => {
            Ei.current = e || ""
          })
          const Oi = {
              components: { SettingCheck: de.Z, Icon: pe.Z, Tooltip: ue.Z },
              data: () => ({ syncConfig: Ei, store: L }),
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
                  j.Z.set(Mi, t)
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
            Vi = (0, Ht.Z)(Oi, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var i, s
                  const r = (0, J.up)("icon"),
                    c = (0, J.up)("tooltip"),
                    u = (0, J.up)("setting-check")
                  return (
                    (0, J.wg)(),
                    (0, J.iD)("section", mi, [
                      (0, J._)("h3", { textContent: (0, G.zw)(e.i18n("labelSync")) }, null, 8, gi),
                      o.state
                        ? ((0, J.wg)(),
                          (0, J.iD)("div", vi, [
                            (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelSyncService")) }, null, 8, hi),
                            (0, J._)(
                              "select",
                              {
                                class: "mx-1",
                                value: a.syncConfig.current,
                                onChange: t[0] || (t[0] = (...e) => o.onSyncChange && o.onSyncChange(...e)),
                              },
                              [
                                ((0, J.wg)(!0),
                                (0, J.iD)(
                                  J.HY,
                                  null,
                                  (0, J.Ko)(
                                    o.syncServices,
                                    (e) => (
                                      (0, J.wg)(),
                                      (0, J.iD)(
                                        "option",
                                        { key: e.name, textContent: (0, G.zw)(e.displayName), value: e.name },
                                        null,
                                        8,
                                        bi
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ],
                              40,
                              fi
                            ),
                            o.service.name && "oauth" === o.state.authType
                              ? ((0, J.wg)(),
                                (0, J.iD)(
                                  "button",
                                  {
                                    key: 0,
                                    textContent: (0, G.zw)(o.state.label),
                                    disabled: !o.state.canAuthorize,
                                    onClick: t[1] || (t[1] = (...e) => o.onAuthorize && o.onAuthorize(...e)),
                                  },
                                  null,
                                  8,
                                  wi
                                ))
                              : (0, J.kq)("", !0),
                            o.service.name
                              ? ((0, J.wg)(),
                                (0, J.j4)(
                                  c,
                                  { key: 1, content: e.i18n("labelSync"), class: "stretch-self flex mr-1" },
                                  {
                                    default: (0, J.w5)(() => [
                                      (0, J._)(
                                        "button",
                                        {
                                          disabled: !o.state.canSync,
                                          onClick: t[2] || (t[2] = (...e) => o.onSync && o.onSync(...e)),
                                          class: "flex center-items",
                                        },
                                        [(0, J.Wm)(r, { name: "refresh" })],
                                        8,
                                        yi
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["content"]
                                ))
                              : (0, J.kq)("", !0),
                            o.state
                              ? ((0, J.wg)(),
                                (0, J.iD)("p", { key: 2, textContent: (0, G.zw)(o.state.message) }, null, 8, xi))
                              : (0, J.kq)("", !0),
                          ]))
                        : (0, J.kq)("", !0),
                      "password" === (null == (i = o.state) ? void 0 : i.authType)
                        ? ((0, J.wg)(),
                          (0, J.iD)("fieldset", Ci, [
                            (0, J._)("label", _i, [
                              (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelSyncServerUrl")) }, null, 8, ki),
                              (0, J.wy)(
                                (0, J._)(
                                  "input",
                                  {
                                    type: "url",
                                    "onUpdate:modelValue": t[3] || (t[3] = (e) => (o.state.userConfig.serverUrl = e)),
                                    disabled: !o.state.canAuthorize,
                                  },
                                  null,
                                  8,
                                  Si
                                ),
                                [[ie.nr, o.state.userConfig.serverUrl]]
                              ),
                            ]),
                            (0, J._)("div", Ui, [
                              (0, J._)("label", null, [
                                (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelSyncUsername")) }, null, 8, zi),
                                (0, J.wy)(
                                  (0, J._)(
                                    "input",
                                    {
                                      type: "text",
                                      "onUpdate:modelValue": t[4] || (t[4] = (e) => (o.state.userConfig.username = e)),
                                      disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                    },
                                    null,
                                    8,
                                    Di
                                  ),
                                  [[ie.nr, o.state.userConfig.username]]
                                ),
                              ]),
                              (0, J._)("label", $i, [
                                (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelSyncPassword")) }, null, 8, Hi),
                                (0, J.wy)(
                                  (0, J._)(
                                    "input",
                                    {
                                      type: "password",
                                      "onUpdate:modelValue": t[5] || (t[5] = (e) => (o.state.userConfig.password = e)),
                                      disabled: !o.state.canAuthorize || o.state.userConfig.anonymous,
                                    },
                                    null,
                                    8,
                                    ji
                                  ),
                                  [[ie.nr, o.state.userConfig.password]]
                                ),
                              ]),
                              (0, J._)("label", null, [
                                (0, J.wy)(
                                  (0, J._)(
                                    "input",
                                    {
                                      type: "checkbox",
                                      "onUpdate:modelValue": t[6] || (t[6] = (e) => (o.state.userConfig.anonymous = e)),
                                      disabled: !o.state.canAuthorize,
                                    },
                                    null,
                                    8,
                                    Wi
                                  ),
                                  [[ie.e8, o.state.userConfig.anonymous]]
                                ),
                                (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelSyncAnonymous")) }, null, 8, Ri),
                              ]),
                            ]),
                            (0, J._)("div", null, [
                              (0, J._)(
                                "button",
                                {
                                  textContent: (0, G.zw)(e.i18n("buttonSave")),
                                  onClick:
                                    t[7] ||
                                    (t[7] = (0, ie.iM)(
                                      (...e) => o.onSaveUserConfig && o.onSaveUserConfig(...e),
                                      ["prevent"]
                                    )),
                                  disabled: !o.state.canAuthorize,
                                },
                                null,
                                8,
                                Ti
                              ),
                            ]),
                          ]))
                        : (0, J.kq)("", !0),
                      null != (s = o.service) && s.name
                        ? ((0, J.wg)(),
                          (0, J.iD)("div", Ii, [
                            (0, J.Wm)(
                              u,
                              { name: "syncScriptStatus", label: e.i18n("labelSyncScriptStatus") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]))
                        : (0, J.kq)("", !0),
                    ])
                  )
                },
              ],
            ]),
            Zi = ["textContent"],
            Yi = { class: "mb-1 mr-1c flex center-items" },
            Li = ["textContent"],
            Pi = ["disabled", "title"],
            Ai = ["textContent"],
            Fi = ["textContent"],
            qi = ["textContent"],
            Ni = ["textContent"],
            Bi = ["innerHTML"],
            Ki = { class: "btn-ghost", style: { border: "none" } },
            Ji = ["textContent"],
            Gi = ["innerHTML"],
            Xi = ["innerHTML"],
            Qi = ["textContent"],
            es = "editorTheme",
            ts = "editorThemeName",
            ns = [
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
            ls = "codemirror/CodeMirror",
            as = "master",
            os = "theme",
            is = `https://github.com/${ls}/tree/${as}/${os}`,
            ss = "default",
            rs = {
              __name: "vm-editor",
              setup(e) {
                const t = (0, T.iH)(),
                  n = (0, T.iH)(),
                  l = (0, T.iH)(!1),
                  a = (0, T.iH)(),
                  o = (0, T.iH)(),
                  s = (0, T.iH)(),
                  r = (0, T.iH)(),
                  c = (0, T.iH)()
                async function p(e, t = "text") {
                  const n = (0, W.vY)()
                  o.value = !0
                  try {
                    const n = await (await fetch(e))[t]()
                    return (s.value = null), n
                  } catch (e) {
                    s.value = e.message || e.code || `${e}`
                  } finally {
                    ;(o.value = !1), await (0, J.Y3)(), null == n || n.focus()
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
                      (await (0, J.Y3)(),
                      t.value.getBoundingClientRect().bottom > innerHeight &&
                        t.value.scrollIntoView({ behavior: "smooth" }))
                }
                return (
                  (0, J.bv)(async () => {
                    let e
                    await j.Z.ready,
                      (0, J.YP)(l, m),
                      (0, J.YP)(c, async (t) => {
                        if (e) return void (e = !1)
                        const n = t && t !== ss && `https://raw.githubusercontent.com/${ls}/${as}/${os}/${t}.css`,
                          l = n && (await p(n))
                        j.Z.set(ts, !n || l ? t : ss), j.Z.set(es, l || "")
                      }),
                      (0, se.Z)(ts, (t) => {
                        var n
                        c.value != (null != (n = t) ? n : (t = ss)) && ((e = !0), (c.value = t))
                      }),
                      (0, se.Z)(es, (e) => {
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
                    (0, J.wg)(),
                    (0, J.iD)(
                      "section",
                      { ref_key: "$el", ref: t },
                      [
                        (0, J._)("h3", { textContent: (0, G.zw)(e.i18n("labelEditor")) }, null, 8, Zi),
                        (0, J._)("div", Yi, [
                          (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelTheme")) }, null, 8, Li),
                          (0, J.wy)(
                            (0, J._)(
                              "select",
                              {
                                "onUpdate:modelValue": i[0] || (i[0] = (e) => (c.value = e)),
                                disabled: o.value,
                                title: r.value,
                              },
                              [
                                (0, J._)(
                                  "option",
                                  { value: ss, textContent: (0, G.zw)(e.i18n("labelRunAtDefault")) },
                                  null,
                                  8,
                                  Ai
                                ),
                                (0, J._)(
                                  "option",
                                  { value: "", textContent: (0, G.zw)(e.i18n("labelBadgeNone")) },
                                  null,
                                  8,
                                  Fi
                                ),
                                ((0, J.wg)(!0),
                                (0, J.iD)(
                                  J.HY,
                                  null,
                                  (0, J.Ko)(
                                    (0, T.SU)(ns),
                                    (e) => (
                                      (0, J.wg)(),
                                      (0, J.iD)("option", { key: e, textContent: (0, G.zw)(e) }, null, 8, qi)
                                    )
                                  ),
                                  128
                                )),
                              ],
                              8,
                              Pi
                            ),
                            [[ie.bM, c.value]]
                          ),
                          (0, J._)("a", { href: is, target: "_blank" }, "\u2197"),
                          (0, J._)("p", { textContent: (0, G.zw)(s.value) }, null, 8, Ni),
                        ]),
                        (0, J._)("p", { class: "my-1", innerHTML: e.i18n("descEditorOptions") }, null, 8, Bi),
                        (0, J.Wm)(
                          (0, T.SU)($n.Z),
                          { name: "editor", json: "", "has-reset": "", onDblclick: (0, T.SU)(K) },
                          {
                            default: (0, J.w5)(() => [
                              (0, J._)(
                                "a",
                                { class: "ml-1", tabindex: "0", onClick: i[1] || (i[1] = (e) => (a.value = !a.value)) },
                                [(0, J.Wm)((0, T.SU)(pe.Z), { name: "info" })]
                              ),
                              (0, J._)("label", Ki, [
                                (0, J.wy)(
                                  (0, J._)(
                                    "input",
                                    { type: "checkbox", "onUpdate:modelValue": i[2] || (i[2] = (e) => (l.value = e)) },
                                    null,
                                    512
                                  ),
                                  [[ie.e8, l.value]]
                                ),
                                (0, J._)(
                                  "span",
                                  { textContent: (0, G.zw)(e.i18n("buttonShowEditorState")) },
                                  null,
                                  8,
                                  Ji
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                          8,
                          ["onDblclick"]
                        ),
                        a.value
                          ? ((0, J.wg)(),
                            (0, J.iD)(
                              J.HY,
                              { key: 0 },
                              [
                                (0, J._)(
                                  "p",
                                  { class: "mt-1", innerHTML: e.i18n("descEditorOptionsGeneric") },
                                  null,
                                  8,
                                  Gi
                                ),
                                (0, J._)("p", { class: "mt-1", innerHTML: e.i18n("descEditorOptionsVM") }, null, 8, Xi),
                              ],
                              64
                            ))
                          : (0, J.kq)("", !0),
                        (0, J._)(
                          "pre",
                          { textContent: (0, G.zw)(n.value), class: "monospace-font dim-hint" },
                          null,
                          8,
                          Qi
                        ),
                      ],
                      512
                    )
                  )
                )
              },
            },
            cs = ["textContent"],
            us = ["textContent"],
            ds = { class: "flex flex-wrap" },
            ps = { key: 0, class: "text-red" },
            ms = ["textContent"],
            gs = {
              components: { SettingText: $n.Z },
              data: () => ({ errors: null }),
              async mounted() {
                this.errors = await (0, D.gj)("Storage", ["base", "getOne", Tt.BZ])
              },
            },
            vs = (0, Ht.Z)(gs, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  const i = (0, J.up)("setting-text")
                  return (
                    (0, J.wg)(),
                    (0, J.iD)("section", null, [
                      (0, J._)("h3", { textContent: (0, G.zw)(e.i18n("labelBlacklist")) }, null, 8, cs),
                      (0, J._)("p", null, [
                        (0, J.Uk)((0, G.zw)(e.i18n("descBlacklist")) + " ", 1),
                        (0, J._)(
                          "a",
                          {
                            href: "https://violentmonkey.github.io/posts/smart-rules-for-blacklist/#blacklist-patterns",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            textContent: (0, G.zw)(e.i18n("learnBlacklist")),
                          },
                          null,
                          8,
                          us
                        ),
                      ]),
                      (0, J._)("div", ds, [
                        (0, J.Wm)(i, {
                          name: "blacklist",
                          class: "flex-1",
                          onBgError: t[0] || (t[0] = (e) => (a.errors = e)),
                        }),
                        a.errors
                          ? ((0, J.wg)(),
                            (0, J.iD)("ol", ps, [
                              ((0, J.wg)(!0),
                              (0, J.iD)(
                                J.HY,
                                null,
                                (0, J.Ko)(
                                  a.errors,
                                  (e) => (
                                    (0, J.wg)(), (0, J.iD)("li", { key: e, textContent: (0, G.zw)(e) }, null, 8, ms)
                                  )
                                ),
                                128
                              )),
                            ]))
                          : (0, J.kq)("", !0),
                      ]),
                    ])
                  )
                },
              ],
            ]),
            hs = { badgeColor: (0, D.ag)("titleBadgeColor"), badgeColorBlocked: (0, D.ag)("titleBadgeColorBlocked") },
            fs = u.keys(hs),
            bs = { enum: hs, normalize: (e, t) => (/^#[0-9a-f]{6}$/i.test(e) ? e : Io.ZP[t]) },
            ws = {
              autoUpdate: { normalize: (e) => Math.max(0, Math.min(365, +e || 0)) },
              defaultInjectInto: { enum: Tt.Wg },
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
              ...b(re.Xw, hs, () => bs),
            },
            ys = (e, t) => (f(ws[t].enum, e) ? e : u.keys(ws[t].enum)[0]),
            xs = (e, t) =>
              (0, D.Ds)((n, l) => {
                ;(n = t(n, e)) !== (l = t(l, e)) && j.Z.set(e, n)
              }, 50),
            Cs = (0, T.qj)({}),
            _s = {
              components: {
                VmImport: qo,
                VmExport: ri,
                VmMaintenance: pi,
                VmSync: Vi,
                VmEditor: rs,
                VmBlacklist: vs,
                VmDateInfo: Go,
                SettingCheck: de.Z,
                SettingText: $n.Z,
                LocaleGroup: me.Z,
                Tooltip: ue.Z,
              },
              data: () => ({ expose: null, items: ws, settings: Cs }),
              computed: {
                editorWindowHint() {
                  var e
                  return null != (e = g.windows) && e.onBoundsChanged ? null : this.i18n("optionEditorWindowHint")
                },
                isCustomBadgeColor: () => fs.some((e) => Cs[e] !== Io.ZP[e]),
              },
              methods: {
                ctrlS() {
                  ;(0, W.vY)().dispatchEvent(new Event("ctrl-s"))
                },
                onResetBadgeColors() {
                  fs.forEach((e) => {
                    Cs[e] = Io.ZP[e]
                  })
                },
              },
              activated() {
                ;(0, W.wO)(this.$el),
                  (this.revokers = [oe.$J.register("ctrlcmd-s", this.ctrlS, { condition: "inputFocus" })]),
                  b(re.LI, ws, ([e, { normalize: t = ys }]) => {
                    this.revokers.push(
                      (0, se.Z)(e, (n) => {
                        Cs[e] = t(n, e)
                      })
                    ),
                      this.$watch(() => Cs[e], xs(e, t))
                  }),
                  (this.expose = u.keys(j.Z.get(n)).map((e) => [e, decodeURIComponent(e)]))
              },
              deactivated() {
                this.revokers.forEach((e) => {
                  e()
                })
              },
            },
            ks = (0, Ht.Z)(_s, [
              [
                "render",
                (e, t, n, l, a, o) => {
                  var i
                  const s = (0, J.up)("setting-check"),
                    r = (0, J.up)("tooltip"),
                    c = (0, J.up)("locale-group"),
                    u = (0, J.up)("vm-import"),
                    d = (0, J.up)("vm-export"),
                    p = (0, J.up)("vm-maintenance"),
                    m = (0, J.up)("vm-sync"),
                    g = (0, J.up)("vm-editor"),
                    v = (0, J.up)("vm-date-info"),
                    h = (0, J.up)("setting-text"),
                    f = (0, J.up)("vm-blacklist")
                  return (
                    (0, J.wg)(),
                    (0, J.iD)(
                      "div",
                      { class: "tab-settings", "data-show-advanced": a.settings.showAdvanced },
                      [
                        (0, J._)("h1", { textContent: (0, G.zw)(e.i18n("labelSettings")) }, null, 8, Fa),
                        (0, J._)("section", qa, [
                          (0, J._)("h3", { textContent: (0, G.zw)(e.i18n("optionPopup")) }, null, 8, Na),
                          (0, J._)("div", null, [
                            (0, J.Wm)(s, { name: "autoReload", label: e.i18n("labelAutoReloadCurrentTab") }, null, 8, [
                              "label",
                            ]),
                          ]),
                          (0, J._)("div", Ba, [
                            (0, J.Wm)(
                              s,
                              { name: "editorWindow", class: "mr-2", ref: "EW" },
                              {
                                default: (0, J.w5)(() => [
                                  (0, J.Wm)(
                                    r,
                                    { content: o.editorWindowHint, disabled: !o.editorWindowHint },
                                    {
                                      default: (0, J.w5)(() => [
                                        (0, J._)(
                                          "span",
                                          { textContent: (0, G.zw)(e.i18n("optionEditorWindow")) },
                                          null,
                                          8,
                                          Ka
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
                            (0, J.wy)(
                              (0, J.Wm)(
                                s,
                                { name: "editorWindowSimple", label: e.i18n("optionEditorWindowSimple") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[ie.F8, null == (i = e.$refs.EW) ? void 0 : i.value]]
                            ),
                          ]),
                          (0, J._)("div", Ja, [
                            (0, J._)("label", null, [
                              (0, J.Wm)(
                                c,
                                { "i18n-key": "labelPopupSort" },
                                {
                                  default: (0, J.w5)(() => [
                                    ((0, J.wg)(!0),
                                    (0, J.iD)(
                                      J.HY,
                                      null,
                                      (0, J.Ko)(["filtersPopup.sort"], (e) =>
                                        (0, J.wy)(
                                          ((0, J.wg)(),
                                          (0, J.iD)(
                                            "select",
                                            { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                            [
                                              ((0, J.wg)(!0),
                                              (0, J.iD)(
                                                J.HY,
                                                null,
                                                (0, J.Ko)(
                                                  a.items[e].enum,
                                                  (t, n) => (
                                                    (0, J.wg)(),
                                                    (0, J.iD)(
                                                      "option",
                                                      { key: `${e}:${n}`, value: n, textContent: (0, G.zw)(t) },
                                                      null,
                                                      8,
                                                      Xa
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                            ],
                                            8,
                                            Ga
                                          )),
                                          [[ie.bM, a.settings[e]]]
                                        )
                                      ),
                                      128
                                    )),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, J.wy)(
                              (0, J.Wm)(
                                s,
                                { name: "filtersPopup.groupRunAt", label: e.i18n("optionPopupGroupRunAt") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[ie.F8, "exec" === a.settings["filtersPopup.sort"]]]
                            ),
                            (0, J._)("label", null, [
                              ((0, J.wg)(!0),
                              (0, J.iD)(
                                J.HY,
                                null,
                                (0, J.Ko)(["filtersPopup.hideDisabled"], (e) =>
                                  (0, J.wy)(
                                    ((0, J.wg)(),
                                    (0, J.iD)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, J.wg)(!0),
                                        (0, J.iD)(
                                          J.HY,
                                          null,
                                          (0, J.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, J.wg)(),
                                              (0, J.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, G.zw)(t) },
                                                null,
                                                8,
                                                eo
                                              )
                                            )
                                          ),
                                          128
                                        )),
                                      ],
                                      8,
                                      Qa
                                    )),
                                    [[ie.bM, a.settings[e]]]
                                  )
                                ),
                                128
                              )),
                            ]),
                            (0, J.wy)(
                              (0, J.Wm)(
                                s,
                                { name: "filtersPopup.enabledFirst", label: e.i18n("optionPopupEnabledFirst") },
                                null,
                                8,
                                ["label"]
                              ),
                              [[ie.F8, !a.settings["filtersPopup.hideDisabled"]]]
                            ),
                          ]),
                          (0, J._)("div", null, [
                            (0, J._)("label", null, [
                              (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelBadge")) }, null, 8, to),
                              ((0, J.wg)(),
                              (0, J.iD)(
                                J.HY,
                                null,
                                (0, J.Ko)(["showBadge"], (e) =>
                                  (0, J.wy)(
                                    (0, J._)(
                                      "select",
                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                      [
                                        ((0, J.wg)(!0),
                                        (0, J.iD)(
                                          J.HY,
                                          null,
                                          (0, J.Ko)(
                                            a.items[e].enum,
                                            (t, n) => (
                                              (0, J.wg)(),
                                              (0, J.iD)(
                                                "option",
                                                { key: `${e}:${n}`, value: n, textContent: (0, G.zw)(t) },
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
                                    [[ie.bM, a.settings[e]]]
                                  )
                                ),
                                64
                              )),
                            ]),
                          ]),
                          (0, J._)("div", null, [
                            (0, J._)("label", null, [
                              (0, J._)("span", { textContent: (0, G.zw)(e.i18n("labelBadgeColors")) }, null, 8, ao),
                              ((0, J.wg)(!0),
                              (0, J.iD)(
                                J.HY,
                                null,
                                (0, J.Ko)(
                                  a.items.badgeColor.enum,
                                  (e, t) => (
                                    (0, J.wg)(),
                                    (0, J.j4)(
                                      r,
                                      { key: `bc:${t}`, content: e },
                                      {
                                        default: (0, J.w5)(() => [
                                          (0, J.wy)(
                                            (0, J._)(
                                              "input",
                                              { type: "color", "onUpdate:modelValue": (e) => (a.settings[t] = e) },
                                              null,
                                              8,
                                              oo
                                            ),
                                            [[ie.nr, a.settings[t]]]
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
                              (0, J.wy)(
                                (0, J._)(
                                  "button",
                                  {
                                    textContent: (0, G.zw)(e.i18n("buttonReset")),
                                    class: "ml-1",
                                    onClick:
                                      t[0] || (t[0] = (...e) => o.onResetBadgeColors && o.onResetBadgeColors(...e)),
                                  },
                                  null,
                                  8,
                                  io
                                ),
                                [[ie.F8, o.isCustomBadgeColor]]
                              ),
                            ]),
                          ]),
                        ]),
                        (0, J._)("section", so, [
                          (0, J._)("h3", { textContent: (0, G.zw)(e.i18n("optionUpdate")) }, null, 8, ro),
                          (0, J._)("div", co, [
                            (0, J._)("label", null, [
                              (0, J.Wm)(
                                c,
                                { "i18n-key": "labelAutoUpdate" },
                                {
                                  default: (0, J.w5)(() => [
                                    (0, J.wy)(
                                      (0, J._)(
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
                                      [[ie.nr, a.settings.autoUpdate]]
                                    ),
                                  ]),
                                  _: 1,
                                }
                              ),
                            ]),
                            (0, J.Wm)(
                              s,
                              { name: "updateEnabledScriptsOnly", label: e.i18n("labelEnabledScriptsOnly") },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                          (0, J._)("div", uo, [
                            (0, J.Wm)(s, { name: "notifyUpdates", label: e.i18n("labelNotifyUpdates") }, null, 8, [
                              "label",
                            ]),
                            (0, J.Wm)(
                              s,
                              { name: "notifyUpdatesGlobal", label: e.i18n("labelNotifyUpdatesGlobal"), class: "ml-2" },
                              null,
                              8,
                              ["label"]
                            ),
                          ]),
                        ]),
                        (0, J._)("section", po, [
                          (0, J._)("h3", { textContent: (0, G.zw)(e.i18n("labelBackupMaintenance")) }, null, 8, mo),
                          (0, J.Wm)(u),
                          (0, J.Wm)(d),
                          go,
                          (0, J.Wm)(p),
                        ]),
                        (0, J.Wm)(m),
                        ((0, J.wg)(!0),
                        (0, J.iD)(
                          J.HY,
                          null,
                          (0, J.Ko)(
                            { showAdvanced: a.settings },
                            (t, n) => (
                              (0, J.wg)(),
                              (0, J.iD)(
                                "details",
                                { key: n, open: t[n] },
                                [
                                  (0, J._)(
                                    "summary",
                                    { onClick: (0, ie.iM)((e) => (t[n] = !t[n]), ["prevent"]) },
                                    [
                                      ((0, J.wg)(),
                                      (0, J.j4)(
                                        (0, J.LL)(t[n] ? "h1" : "h3"),
                                        { textContent: (0, G.zw)(e.i18n("labelAdvanced")), class: "inline-block" },
                                        null,
                                        8,
                                        ["textContent"]
                                      )),
                                    ],
                                    8,
                                    ho
                                  ),
                                  (0, J._)("section", fo, [
                                    (0, J._)("h3", { textContent: (0, G.zw)(e.i18n("labelGeneral")) }, null, 8, bo),
                                    (0, J._)("div", null, [
                                      (0, J._)("label", null, [
                                        (0, J.Wm)(
                                          c,
                                          { "i18n-key": "optionUiTheme" },
                                          {
                                            default: (0, J.w5)(() => [
                                              ((0, J.wg)(),
                                              (0, J.iD)(
                                                J.HY,
                                                null,
                                                (0, J.Ko)(["uiTheme"], (e) =>
                                                  (0, J.wy)(
                                                    (0, J._)(
                                                      "select",
                                                      { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                      [
                                                        ((0, J.wg)(!0),
                                                        (0, J.iD)(
                                                          J.HY,
                                                          null,
                                                          (0, J.Ko)(
                                                            a.items[e].enum,
                                                            (e, t) => (
                                                              (0, J.wg)(),
                                                              (0, J.iD)(
                                                                "option",
                                                                { key: t, value: t, textContent: (0, G.zw)(e) },
                                                                null,
                                                                8,
                                                                yo
                                                              )
                                                            )
                                                          ),
                                                          128
                                                        )),
                                                      ],
                                                      8,
                                                      wo
                                                    ),
                                                    [[ie.bM, a.settings[e]]]
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
                                    (0, J._)("div", xo, [
                                      (0, J._)("label", null, [
                                        (0, J._)(
                                          "span",
                                          { textContent: (0, G.zw)(e.i18n("labelInjectionMode")) },
                                          null,
                                          8,
                                          Co
                                        ),
                                        ((0, J.wg)(),
                                        (0, J.iD)(
                                          J.HY,
                                          null,
                                          (0, J.Ko)(["defaultInjectInto"], (e) =>
                                            (0, J.wy)(
                                              (0, J._)(
                                                "select",
                                                { "onUpdate:modelValue": (t) => (a.settings[e] = t), key: e },
                                                [
                                                  ((0, J.wg)(!0),
                                                  (0, J.iD)(
                                                    J.HY,
                                                    null,
                                                    (0, J.Ko)(
                                                      a.items[e].enum,
                                                      (e, t) => (
                                                        (0, J.wg)(),
                                                        (0, J.iD)(
                                                          "option",
                                                          { key: t, textContent: (0, G.zw)(t) },
                                                          null,
                                                          8,
                                                          ko
                                                        )
                                                      )
                                                    ),
                                                    128
                                                  )),
                                                ],
                                                8,
                                                _o
                                              ),
                                              [[ie.bM, a.settings[e]]]
                                            )
                                          ),
                                          64
                                        )),
                                        (0, J._)(
                                          "a",
                                          {
                                            class: "ml-1",
                                            href: "https://violentmonkey.github.io/posts/inject-into-context/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            textContent: (0, G.zw)(e.i18n("learnInjectionMode")),
                                          },
                                          null,
                                          8,
                                          So
                                        ),
                                      ]),
                                      (0, J.Wm)(
                                        r,
                                        { content: e.i18n("labelXhrInjectHint") },
                                        {
                                          default: (0, J.w5)(() => [
                                            (0, J.Wm)(
                                              s,
                                              { name: "xhrInject" },
                                              {
                                                default: (0, J.w5)(() => [
                                                  (0, J.Wm)(
                                                    c,
                                                    { "i18n-key": "labelXhrInject" },
                                                    { default: (0, J.w5)(() => [Uo]), _: 1 }
                                                  ),
                                                  (0, J.Uk)(),
                                                  (0, J._)(
                                                    "ruby",
                                                    { textContent: (0, G.zw)(e.i18n("labelXhrInjectNote")) },
                                                    null,
                                                    8,
                                                    zo
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
                                        ? (0, J.kq)("", !0)
                                        : ((0, J.wg)(),
                                          (0, J.iD)("label", Do, [
                                            (0, J.Wm)(s, { name: "ffInject" }),
                                            (0, J.Wm)(
                                              r,
                                              { content: e.i18n("labelFastFirefoxInjectHint") },
                                              {
                                                default: (0, J.w5)(() => [
                                                  (0, J.Wm)(
                                                    c,
                                                    { "i18n-key": "labelFastFirefoxInject" },
                                                    { default: (0, J.w5)(() => [$o]), _: 1 }
                                                  ),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["content"]
                                            ),
                                          ])),
                                    ]),
                                    (0, J._)("div", null, [
                                      (0, J.Wm)(
                                        c,
                                        { "i18n-key": "labelExposeStatus", class: "flex flex-col" },
                                        {
                                          default: (0, J.w5)(() => [
                                            ((0, J.wg)(!0),
                                            (0, J.iD)(
                                              J.HY,
                                              null,
                                              (0, J.Ko)(
                                                a.expose,
                                                ([e, t]) => (
                                                  (0, J.wg)(),
                                                  (0, J.j4)(
                                                    s,
                                                    { key: t, name: `expose.${e}`, class: "ml-2 mr-1c valign-tb" },
                                                    {
                                                      default: (0, J.w5)(() => [
                                                        (0, J._)("span", { textContent: (0, G.zw)(t) }, null, 8, Ho),
                                                        (0, J._)(
                                                          "a",
                                                          {
                                                            href: `https://${t}`,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                          },
                                                          "\u2197",
                                                          8,
                                                          jo
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
                                    (0, J.Wm)(
                                      s,
                                      { name: "helpForLocalFile", label: e.i18n("helpForLocalFile") },
                                      null,
                                      8,
                                      ["label"]
                                    ),
                                  ]),
                                  (0, J.Wm)(g),
                                  (0, J._)("section", null, [
                                    (0, J._)(
                                      "h3",
                                      { textContent: (0, G.zw)(e.i18n("labelScriptTemplate")) },
                                      null,
                                      8,
                                      Wo
                                    ),
                                    (0, J._)("p", null, [
                                      ((0, J.wg)(!0),
                                      (0, J.iD)(
                                        J.HY,
                                        null,
                                        (0, J.Ko)(
                                          e.i18n("descScriptTemplate").split(/<(\S+?)>/),
                                          (e, t) => (
                                            (0, J.wg)(),
                                            (0, J.j4)(
                                              (0, J.LL)(t % 2 ? "code" : "span"),
                                              { textContent: (0, G.zw)(e), key: t },
                                              null,
                                              8,
                                              ["textContent"]
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                      (0, J.Uk)(),
                                      (0, J.Wm)(v),
                                    ]),
                                    (0, J.Wm)(h, { name: "scriptTemplate", "has-reset": "" }),
                                  ]),
                                  (0, J.Wm)(f),
                                  (0, J._)("section", null, [
                                    (0, J._)("h3", { textContent: (0, G.zw)(e.i18n("labelCustomCSS")) }, null, 8, Ro),
                                    (0, J._)("p", { innerHTML: e.i18n("descCustomCSS") }, null, 8, To),
                                    (0, J.Wm)(h, { name: "customCSS" }),
                                  ]),
                                ],
                                8,
                                vo
                              )
                            )
                          ),
                          128
                        )),
                      ],
                      8,
                      Aa
                    )
                  )
                },
              ],
            ]),
            Ss = { class: "tab-about mb-2c" },
            Us = { class: "mt-0 mr-1c" },
            zs = ["textContent"],
            Ds = ["textContent"],
            $s = ["textContent"],
            Hs = ["textContent"],
            js = ["textContent"],
            Ws = ["textContent"],
            Rs = ["textContent"],
            Ts = ["textContent"],
            Is = ["textContent"],
            Ms = ["textContent"],
            Es = ["textContent"],
            Os = {
              __name: "tab-about",
              setup(e) {
                const t = x.name,
                  n = browser.i18n.getUILanguage()
                return (e, l) => (
                  (0, J.wg)(),
                  (0, J.iD)("div", Ss, [
                    (0, J._)("h1", Us, [
                      (0, J._)("span", { textContent: (0, G.zw)((0, T.SU)(t)) }, null, 8, zs),
                      (0, J._)("small", { textContent: (0, G.zw)(`v${(0, T.SU)("2.18.3")}`) }, null, 8, Ds),
                    ]),
                    (0, J._)("p", { textContent: (0, G.zw)(e.i18n("extDescription")) }, null, 8, $s),
                    (0, J._)("div", null, [
                      (0, J._)("label", { textContent: (0, G.zw)(e.i18n("labelRelated")) }, null, 8, Hs),
                      (0, J._)("ul", null, [
                        (0, J._)("li", null, [
                          (0, J._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, G.zw)(e.i18n("labelHomepage")),
                            },
                            null,
                            8,
                            js
                          ),
                        ]),
                        (0, J._)("li", null, [
                          (0, J._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/issues",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, G.zw)(e.i18n("labelFeedback")),
                            },
                            null,
                            8,
                            Ws
                          ),
                        ]),
                        (0, J._)("li", null, [
                          (0, J._)(
                            "a",
                            {
                              href: "https://github.com/violentmonkey/violentmonkey/graphs/contributors",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, G.zw)(e.i18n("labelContributors")),
                            },
                            null,
                            8,
                            Rs
                          ),
                        ]),
                        (0, J._)("li", null, [
                          (0, J._)(
                            "a",
                            {
                              href: "https://violentmonkey.github.io/privacy/",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              textContent: (0, G.zw)(e.i18n("labelPrivacyPolicy")),
                            },
                            null,
                            8,
                            Ts
                          ),
                        ]),
                      ]),
                    ]),
                    (0, J._)("div", null, [
                      (0, J._)("label", { textContent: (0, G.zw)(e.i18n("labelCurrentLang")) }, null, 8, Is),
                      (0, J._)("span", { class: "current", textContent: (0, G.zw)((0, T.SU)(n)) }, null, 8, Ms),
                      (0, J.Uk)(" | "),
                      (0, J._)(
                        "a",
                        {
                          href: "https://violentmonkey.github.io/localization/",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          textContent: (0, G.zw)(e.i18n("labelHelpTranslate")),
                        },
                        null,
                        8,
                        Es
                      ),
                    ]),
                  ])
                )
              },
            },
            Vs = [
              { name: o, comp: Pa, label: (0, D.ag)("sideMenuInstalled") },
              { name: C, comp: ks, label: (0, D.ag)("sideMenuSettings") },
              { name: _, comp: Os, label: (0, D.ag)("sideMenuAbout") },
              { name: k, comp: Pa, label: (0, D.ag)("buttonRecycleBin") },
            ],
            Zs = (0, D.ag)("extName"),
            Ys = "!editScript",
            Ls = (0, J.Fl)(() => {
              const e = L.route.paths[0]
              return Vs.find((t) => t.name === e) || Vs[0]
            }),
            Ps = (0, J.Fl)(() => ({ [o]: L.scripts.length, [k]: L.removedScripts.length }))
          function As() {
            const e = Ls.value.name === o,
              { paths: t } = L.route
            oe.$J.setContext("editScript", e && t[1]),
              oe.$J.setContext("tabScripts", e && !t[1]),
              oe.$J.setContext("showRecycle", Ls.value.name === k)
          }
          function Fs(e) {
            const n = Vs.indexOf(Ls.value),
              l = Vs[(n + e + Vs.length) % Vs.length]
            t.location.hash = (null == l ? void 0 : l.name) || ""
          }
          p(
            "dragover",
            (e) => {
              var t
              L.route.hash !== C &&
                /^application\/(zip|x-zip-compressed)$/.test(null == (t = e.dataTransfer.items[0]) ? void 0 : t.type) &&
                (location.hash = `#${C}`)
            },
            !0
          )
          const qs = {
              setup() {
                const [e, t] = L.route.paths,
                  n = (0, T.iH)(e !== o || ("_new" !== t && !Number(t)))
                return (
                  (0, J.m0)(() => {
                    const { title: e } = L
                    document.title = e ? `${e} - ${Zs}` : Zs
                  }),
                  (0, J.YP)(
                    () => L.route.paths,
                    () => {
                      ;(n.value = !0), As()
                    }
                  ),
                  (0, J.bv)(() => {
                    const e = [
                      oe.$J.register("a-pageup", () => Fs(-1), { condition: Ys }),
                      oe.$J.register("a-pagedown", () => Fs(1), { condition: Ys }),
                    ]
                    return (
                      oe.$J.enable(),
                      As(),
                      () => {
                        e.forEach((e) => {
                          e()
                        }),
                          oe.$J.disable()
                      }
                    )
                  }),
                  { tabs: Vs, current: Ls, numbers: Ps, canRenderAside: n }
                )
              },
            },
            Ns = (0, Ht.Z)(qs, [
              [
                "render",
                (e, t, n, l, a, o) => (
                  (0, J.wg)(),
                  (0, J.iD)("div", X, [
                    l.canRenderAside
                      ? ((0, J.wg)(),
                        (0, J.iD)("aside", Q, [
                          (0, J._)("div", ee, [
                            te,
                            (0, J._)(
                              "h1",
                              { class: "hidden-sm", textContent: (0, G.zw)(e.i18n("extName")) },
                              null,
                              8,
                              ne
                            ),
                            le,
                            ((0, J.wg)(!0),
                            (0, J.iD)(
                              J.HY,
                              null,
                              (0, J.Ko)(
                                l.tabs,
                                (e) => (
                                  (0, J.wg)(),
                                  (0, J.iD)("div", { class: "aside-menu-item", key: e.name }, [
                                    (0, J._)(
                                      "a",
                                      {
                                        href: `#${e.name}`,
                                        class: (0, G.C_)({ active: e === l.current }),
                                        "data-num-scripts": l.numbers[e.name],
                                        textContent: (0, G.zw)(e.label),
                                      },
                                      null,
                                      10,
                                      ae
                                    ),
                                  ])
                                )
                              ),
                              128
                            )),
                          ]),
                        ]))
                      : (0, J.kq)("", !0),
                    ((0, J.wg)(),
                    (0, J.j4)(
                      J.Ob,
                      null,
                      [((0, J.wg)(), (0, J.j4)((0, J.LL)(l.current.comp), { class: "tab" }))],
                      1024
                    )),
                  ])
                ),
              ],
            ]),
            Bs = [
              (0, D.ag)("editNavCode"),
              (0, D.ag)("editNavSettings"),
              (0, D.ag)("editNavValues"),
              "@require",
              "@resource",
            ]
          let Ks
          function Js(e, t, n) {
            const l = e.$cache || (e.$cache = {}),
              a = e.meta || {},
              o = (0, D.iQ)(a, "name"),
              i = b(
                D.Hv,
                [a.name, o, a.description, (0, D.iQ)(a, "description"), e.custom.name, e.custom.description],
                "\n"
              ),
              s = e.custom.name || o
            let r = 0,
              c = ""
            t.forEach((e, t) => {
              ;(r += e), e && (c += `${Bs[t]}: ${(0, D.aj)(e)}\n`)
            }),
              (l.desc = i),
              (l.name = s),
              (l.lowerName = s.toLocaleLowerCase()),
              (l.tags = e.custom.tags || ""),
              (l.size = (0, D.aj)(r, !0).replace(" ", "")),
              (l.sizes = c.slice(0, -1).replace(/\x20/g, "\xa0").replace(/[^B]$/gm, "$&B")),
              (l.sizeNum = r),
              n && (l.code = n),
              (e.$canUpdate = (0, D.TZ)(e) && (e.config.shouldUpdate ? 1 : -1)),
              (0, H.d)(e, L, !0)
          }
          function Gs() {
            const e = +L.route.paths[1]
            return Xs(e ? [e] : null).catch(e && (() => Xs()))
          }
          async function Xs(e) {
            const [t] = await d.all([(0, D.gj)("GetData", { ids: e, sizes: !0 }, { retry: !0 }), j.Z.ready]),
              { [o]: n, sizes: l, ...a } = t
            u.assign(L, a)
            const i = [],
              s = []
            n.forEach((e, t) => {
              Js(e, l[t]), (e.config.removed ? s : i).push(e)
            }),
              (L.scripts = i),
              (L.removedScripts = s),
              (L.loading = !1)
          }
          ;(L.loading = !0),
            Gs(),
            u.assign($.Z, {
              ScriptsUpdated() {
                Gs()
              },
              UpdateSync(e) {
                L.sync = e
              },
              async UpdateScript({ update: e, where: t, code: n } = {}) {
                var l
                if (!e) return
                ;(Ks || ((Ks = L.batch) && (Ks = d.race([Ks, (0, D.dL)(500)])))) && (await Ks, (Ks = null))
                const a = L.scripts.findIndex((e) => e.props.id === t.id),
                  i = L.removedScripts.findIndex((e) => e.props.id === t.id),
                  s = L.scripts[a] || L.removedScripts[i] || (e.meta && L.canRenderScripts && {})
                if (!s) return
                const [r] = await (0, D.gj)("GetSizes", [t.id]),
                  { search: c } = L
                if (
                  (u.assign(s, e),
                  s.error && !e.error && (s.error = null),
                  Js(s, r, n),
                  c && Y([s], c.rules),
                  null != (null == (l = e.config) ? void 0 : l.removed) &&
                    (e.config.removed
                      ? (L.needRefresh = !0)
                      : (L.removedScripts = L.removedScripts.filter((e) => e.props.id !== t.id))),
                  (s.config.removed ? i : a) < 0)
                ) {
                  s.message = ""
                  const e = s.config.removed ? "removedScripts" : o
                  L[e] = [...L[e], s]
                }
              },
              RemoveScripts(e) {
                L.removedScripts = L.removedScripts.filter((t) => !e.includes(t.props.id))
              },
            }),
            (0, W.sY)(Ns)
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
    var j = H.O(void 0, [386, 84], () => H(7044))
    j = H.O(j)
  })()
}
