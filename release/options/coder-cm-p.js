(()=>{
  // coder-cm.js
  // javascript:((script,ci,b,bu)=>{(ci='d39c598537ba8b58200f933bddce9d060d2387aa')&&fetch(`https://raw.githubusercontent.com/cyfung1031/userscript-supports/${ci}/tools/coder.js`).then(r=>r.text()).then(t=>[(b=new Blob([t],{type:'text/javascript; charset=UTF-8'})),(bu=URL.createObjectURL(b)),(script.src=bu),document.head.appendChild(script)]&&new Promise(r=>script.onload=r)).then(k=>URL.revokeObjectURL(bu)).then(e=>console.log('JS Injected'))})(document.createElement('script'));

  console.log('Coder.js');

  if (typeof mozInnerScreenX === 'number') {
    console.log('Skip Coder.js for Firefox') // Loading failed for the <script> with source “blob:moz-extension://8258ebd6-d03a-4087-ac07-66b9d99c8f0f/c100eb6d-f193-499d-a90f-39a15741715e”.
    return;
  }

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


      for (const ElementClass of [HTMLLinkElement, HTMLScriptElement]) {
        if (!ElementClass.prototype.setAttribute78) {

          const setAttribute = ElementClass.prototype.setAttribute78 = (ElementClass.prototype.setAttribute || HTMLElement.prototype.setAttribute || Element.prototype.setAttribute || Node.prototype.setAttribute || EventTarget.prototype.setAttribute);
          ElementClass.prototype.setAttribute79 = function (a, b) {
            if (this instanceof HTMLElement) {
              if (a === 'href' || a === 'src') {
                let c = urlMap.get(b);
                if (c) b = c;
              }
              return arguments.length === 2 && typeof this.setAttribute78 === 'function' ? this.setAttribute78(a, b) : setAttribute.apply(this, arguments);
            }
          };

        }

        ElementClass.prototype.setAttribute = enabled ? ElementClass.prototype.setAttribute79 : ElementClass.prototype.setAttribute78;

      }

      if (!window.Worker78) window.Worker78 = Worker;

      window.Worker = enabled ? undefined : window.Worker78;
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
      function loadResourceWithBlobURL(type, url, urlMap) {

        return new Promise(resolve => {
          let b, bu;
          const mime = type === 'js' ? 'text/javascript; charset=UTF-8' : type === 'css' ? 'text/css; charset=UTF-8' : 'text/plain; charset=UTF-8';
          fetch(url).then(r => r.text()).then(t => [(b = new Blob([t], { type: mime })), (bu = URL.createObjectURL(b))]).then(() => {


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

      function analyseURL(type, url, urlMap) {

        return new Promise(resolve => {
          let b, bu;
          const mime = type === 'js' ? 'text/javascript; charset=UTF-8' : type === 'css' ? 'text/css; charset=UTF-8' : 'text/plain; charset=UTF-8';
          fetch(url).then(r => r.text()).then(t => [(b = new Blob([t], { type: mime })), (bu = URL.createObjectURL(b))]).then(() => {

            if (urlMap) urlMap.set(url, bu);
            resolve(bu);

          });

        })

      }



      const vsPath = "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.48.0/min/vs";

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
            }
        
            .editor-code.flex-auto>div.monaco-editor-container {
                position: relative;
                flex-grow: 1;
            }
  
        `;

    const firstInjection = async () => {


      // https://microsoft.github.io/vscode-codicons/dist/codicon.ttf
      document.head.appendChild(document.createElement('style')).textContent = `                
          @font-face {
            font-family: "codicon";
            font-display: block;
            src: url("./codicon.ttf?38dcd33a732ebca5a557e04831e9e235") format("truetype");
          }
        `;

      /*
      await loadResourceWithBlobURL(
        "css",
        "https://microsoft.github.io/vscode-codicons/dist/codicon.css",
        urlMap,
      );*/

      await analyseURL('js', `${vsPath}/language/typescript/tsWorker.js`, urlMap);

      // Dynamically load CSS and JS
      await loadResourceWithBlobURL('css', `${vsPath}/editor/editor.main.css`, urlMap);
      await loadResourceWithBlobURL('js', `${vsPath}/loader.js`, urlMap);
      await loadResourceWithBlobURL('js', `${vsPath}/editor/editor.main.nls.js`, urlMap);
      await loadResourceWithBlobURL('js', `${vsPath}/editor/editor.main.js`, urlMap);

      await loadResourceWithBlobURL('js', `${vsPath}/basic-languages/javascript/javascript.js`, urlMap);
      await loadResourceWithBlobURL('js', `${vsPath}/basic-languages/typescript/typescript.js`, urlMap);
      await loadResourceWithBlobURL('js', `${vsPath}/language/typescript/tsMode.js`, urlMap);
      await loadResourceWithBlobURL('js', `${vsPath}/language/typescript/tsWorker.js`, urlMap);


      await darkThemeChecked.then();


      addCssText('rmbnctzOOksi', cssText01);


    };

    let elmSet = null;
    let injected = false;
    let promiseReady = null;

    let oldValue;


    let cmObj = null;
    let byPass = false;

    async function createEditor(cmTextArea, containerSetup) {

      if(elmSet && elmSet.container){

        byPass = true;

        const container = elmSet.container;

        elmSet.cmTextArea = cmTextArea;
        elmSet.container = container;

        if (cmTextArea.style.display) cmTextArea.style.display = '';

        container.style.display = '';
        const editor = elmSet.editor;

        oldValue = cmTextArea.value;
        editor.getModel().setValue(cmTextArea.value);
        oldValue = cmTextArea.value;

        const theme = document.documentElement.hasAttribute('dark') ? 'vs-dark' : 'vs';
        monaco.editor.setTheme(theme);

        containerSetup(container);

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

        monaco.editor.onDidCreateEditor(function (event) {
          if(byPass || !cmObj) return;
          const container = ((elmSet || 0).container || 0);
          if (!container) return;
          container.style.display = '';
          // console.log('editor created');
        });


        const editor = monaco.editor.create(container, Object.assign({
          value: '',
          language: monacoLang
        }, editorOptions));
        
        editor.getModel().setValue(cmTextArea.value);

        elmSet.editor = editor;


        const theme = document.documentElement.hasAttribute('dark') ? 'vs-dark' : 'vs';
        monaco.editor.setTheme(theme);

        // window.cm = cm;
        // window.cmBox = cmBox;

        oldValue = editor.getValue();
        editor.onDidChangeModelContent(e => {
          if(byPass || !cmObj) return;
          const editor = ((elmSet || 0).editor || 0);
          if (!editor) return;
          const value = editor.getValue();
          if (value === oldValue) return;
          oldValue = value;
          const cmTextArea = elmSet ? elmSet.cmTextArea : null;
          if(cmTextArea){
            elmSet.cmTextArea.value = value;
          }
          const cm = cmObj;
          if(cm) {
            cm.replaceRange(" ", { line: 0, ch: 0 });
            cm.setValue(value);
          }
        });


        getEditor = ()=>editor;
 


    }

    const idlePreload = async ()=>{
      if (location.hash === '#settings') return;
      if(promiseReady) await promiseReady.then();
      if(!elmSet || !elmSet.editor){
        promiseReady = new PromiseExternal();
        await createEditor(document.createElement('textarea'),()=>{
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

      if(promiseReady) await promiseReady.then();
      promiseReady = new PromiseExternal();
      cmBox.setAttribute('cm-checked', '');

      lastCMBox = cmBox;
      cmObj = cm;

      Object.assign(cmBox.style, {
        display: 'none'
      });

      let cmTextArea;
      if(elmSet && elmSet.cmTextArea){
        cmTextArea = elmSet.cmTextArea;
        cmTextArea.value = cm.getValue();
      }else{
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

      

      await createEditor(cmTextArea, (container)=>{
        cmBox.parentNode.insertBefore(container, cmBox);
      });

      injected = true;
      promiseReady.resolve();

    }


  });


})();
