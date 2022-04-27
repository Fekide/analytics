!function(){"use strict";var r=window.location,o=window.document,l=o.currentScript,s=l.getAttribute("data-api")||new URL(l.src).origin+"/api/event",p=l&&l.getAttribute("data-exclude").split(",");function c(e){console.warn("Ignoring Event: "+e)}function e(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(r.hostname)||"file:"===r.protocol)return c("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return c("localStorage flag")}catch(e){}if(p)for(var i=0;i<p.length;i++)if("pageview"===e&&r.pathname.match(new RegExp("^"+p[i].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return c("exclusion rule");var a={};a.n=e,a.u=r.href,a.d=l.getAttribute("data-domain"),a.r=o.referrer||null,a.w=window.innerWidth,t&&t.meta&&(a.m=JSON.stringify(t.meta)),t&&t.props&&(a.p=t.props);var n=new XMLHttpRequest;n.open("POST",s,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(a)),n.onreadystatechange=function(){4===n.readyState&&t&&t.callback&&t.callback()}}}function t(e){for(var t=e.target,i="auxclick"===e.type&&2===e.which,a="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==r.host&&((i||a)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!a||(setTimeout(function(){r.href=t.href},150),e.preventDefault()))}o.addEventListener("click",t),o.addEventListener("auxclick",t);var i=window.plausible&&window.plausible.q||[];window.plausible=e;for(var a,n=0;n<i.length;n++)e.apply(this,i[n]);function u(){a!==r.pathname&&(a=r.pathname,e("pageview"))}var d,w=window.history;w.pushState&&(d=w.pushState,w.pushState=function(){d.apply(this,arguments),u()},window.addEventListener("popstate",u)),"prerender"===o.visibilityState?o.addEventListener("visibilitychange",function(){a||"visible"!==o.visibilityState||u()}):u()}();