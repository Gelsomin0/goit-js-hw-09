const t={body:document.querySelector("body"),startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let e;function r(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.stopBtn.setAttribute("disabled",""),t.startBtn.addEventListener("click",(function(){t.body.style.backgroundColor=r(),t.startBtn.setAttribute("disabled",""),t.stopBtn.removeAttribute("disabled"),e=setInterval((()=>{t.body.style.backgroundColor=r()}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled",""),clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.0bb45690.js.map