!function(){"use strict";var o=window.location,i=window.document,n=i.currentScript,l=n.getAttribute("data-api")||new URL(n.src).origin+"/api/event";function p(t){console.warn("Ignoring Event: "+t)}function t(t,e){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname)||"file:"===o.protocol)return p("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"===window.localStorage.plausible_ignore)return p("localStorage flag")}catch(t){}var a={};a.n=t,a.u=e&&e.u?e.u:o.href,a.d=n.getAttribute("data-domain"),a.r=i.referrer||null,a.w=window.innerWidth,e&&e.meta&&(a.m=JSON.stringify(e.meta)),e&&e.props&&(a.p=e.props),a.h=1;var r=new XMLHttpRequest;r.open("POST",l,!0),r.setRequestHeader("Content-Type","text/plain"),r.send(JSON.stringify(a)),r.onreadystatechange=function(){4===r.readyState&&e&&e.callback&&e.callback()}}}function e(t){for(var e=t.target,a="auxclick"===t.type&&2===t.which,r="click"===t.type;e&&(void 0===e.tagName||"a"!==e.tagName.toLowerCase()||!e.href);)e=e.parentNode;e&&e.href&&e.host&&e.host!==o.host&&((a||r)&&plausible("Outbound Link: Click",{props:{url:e.href}}),e.target&&!e.target.match(/^_(self|parent|top)$/i)||t.ctrlKey||t.metaKey||t.shiftKey||!r||(setTimeout(function(){o.href=e.href},150),t.preventDefault()))}i.addEventListener("click",e),i.addEventListener("auxclick",e);var a=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],r=n.getAttribute("file-types"),c=n.getAttribute("add-file-types"),s=r&&r.split(",")||c&&c.split(",").concat(a)||a;function u(t){for(var e=t.target,a="auxclick"===t.type&&2===t.which,r="click"===t.type;e&&(void 0===e.tagName||"a"!==e.tagName.toLowerCase()||!e.href);)e=e.parentNode;var i,n=e&&e.href&&e.href.split("?")[0];n&&(i=n.split(".").pop(),s.some(function(t){return t===i}))&&((a||r)&&plausible("File Download",{props:{url:n}}),e.target&&!e.target.match(/^_(self|parent|top)$/i)||t.ctrlKey||t.metaKey||t.shiftKey||!r||(setTimeout(function(){o.href=e.href},150),t.preventDefault()))}i.addEventListener("click",u),i.addEventListener("auxclick",u);var d=window.plausible&&window.plausible.q||[];window.plausible=t;for(var f=0;f<d.length;f++)t.apply(this,d[f])}();