/*! For license information please see main-8c27c148.50c913c671409756916d.js.LICENSE.txt */
"use strict";(self.webpackChunkrotating_globe=self.webpackChunkrotating_globe||[]).push([[79],{954:(t,e,r)=>{var n=r(437),o=r(24),i=r(436),a=r(529);function c(t){return c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c(t)}function u(){u=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",l=i.asyncIterator||"@@asyncIterator",h=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var i=e&&e.prototype instanceof m?e:m,a=Object.create(i.prototype),c=new F(n||[]);return o(a,"_invoke",{value:O(t,r,c)}),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var y="suspendedStart",d="suspendedYield",v="executing",g="completed",w={};function m(){}function b(){}function x(){}var L={};s(L,a,(function(){return this}));var E=Object.getPrototypeOf,P=E&&E(E(I([])));P&&P!==r&&n.call(P,a)&&(L=P);var _=x.prototype=m.prototype=Object.create(L);function S(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function j(t,e){function r(o,i,a,u){var l=p(t[o],t,i);if("throw"!==l.type){var h=l.arg,s=h.value;return s&&"object"==c(s)&&n.call(s,"__await")?e.resolve(s.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(s).then((function(t){h.value=t,a(h)}),(function(t){return r("throw",t,a,u)}))}u(l.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function O(e,r,n){var o=y;return function(i,a){if(o===v)throw new Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var u=k(c,n);if(u){if(u===w)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===y)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=v;var l=p(e,r,n);if("normal"===l.type){if(o=n.done?g:d,l.arg===w)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(o=g,n.method="throw",n.arg=l.arg)}}}function k(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,k(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),w;var i=p(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,w;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,w):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,w)}function G(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function N(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function F(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(G,this),this.reset(!0)}function I(e){if(e||""===e){var r=e[a];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(c(e)+" is not iterable")}return b.prototype=x,o(_,"constructor",{value:x,configurable:!0}),o(x,"constructor",{value:b,configurable:!0}),b.displayName=s(x,h,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,s(t,h,"GeneratorFunction")),t.prototype=Object.create(_),t},e.awrap=function(t){return{__await:t}},S(j.prototype),s(j.prototype,l,(function(){return this})),e.AsyncIterator=j,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new j(f(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},S(_),s(_,h,"Generator"),s(_,a,(function(){return this})),s(_,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=I,F.prototype={constructor:F,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(N),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),l=n.call(a,"finallyLoc");if(u&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,w):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),w},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),N(r),w}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;N(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:I(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),w}},e}function l(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function h(){var t;return t=u().mark((function t(){var e,r,c,l,h,s,f,p,y,d;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d=function(){requestAnimationFrame(d),l.update(),c.render(e,r)},e=new n.Z58,r=new n.ubm(75,window.innerWidth/window.innerHeight,.1,1e3),(c=new n.JeP).setSize(window.innerWidth,window.innerHeight),c.setClearColor(16777215),document.getElementById("globeContainer").appendChild(c.domElement),(l=new o.N(r,c.domElement)).enableDamping=!0,l.dampingFactor=.05,l.screenSpacePanning=!1,l.enableZoom=!1,l.enablePan=!1,l.maxDistance=25,l.minPolarAngle=Math.PI/2,l.maxPolarAngle=Math.PI/2,l.rotateSpeed=1.5,h=new n.Gu$(10,32,32),s=new n.V9B({color:13421772,wireframe:!0,transparent:!0,opacity:.1,depthTest:!1}),f=new n.eaF(h,s),e.add(f),r.position.z=35,p=(0,i.A)(),t.next=25,(0,a.A)();case 25:y=t.sent,p.position.set(0,0,0),y.position.set(0,0,0),y.rotation.y=Math.PI/2,p.rotation.y=Math.PI,e.add(p),e.add(y),d(),window.addEventListener("resize",(function(){var t=window.innerWidth,e=window.innerHeight;c.setSize(t,e),r.aspect=t/e,r.updateProjectionMatrix()}));case 34:case"end":return t.stop()}}),t)})),h=function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){l(i,n,o,a,c,"next",t)}function c(t){l(i,n,o,a,c,"throw",t)}a(void 0)}))},h.apply(this,arguments)}!function(){h.apply(this,arguments)}()}}]);