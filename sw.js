if(!self.define){let e,t={};const i=(i,n)=>(i=new URL(i+".js",n).href,t[i]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=t,document.head.appendChild(e)}else e=i,importScripts(i),t()})).then((()=>{let e=t[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(t[r])return;let s={};const d=e=>i(e,r),l={module:{uri:r},exports:s,require:d};t[r]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(o(...e),s)))}}define(["./workbox-071b4188"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"a32bb2c0.js",revision:"26a2ffbb3b1c092f5125061f4fd38e89"},{url:"index.html",revision:"63cdfdb5dd474dd6705ef6a3cc48d9d6"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html"))),e.registerRoute("polyfills/*.js",new e.CacheFirst,"GET")}));
//# sourceMappingURL=sw.js.map
