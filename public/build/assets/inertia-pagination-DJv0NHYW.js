import{a as h,B as c}from"./button-Ck2ugyo2.js";import{j as s,$ as d}from"./app-DD-3xnGx.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]],p=h("ChevronsLeft",C);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]],x=h("ChevronsRight",N);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],I=h("Trash2",b);function $({meta:j,range:o=2}){const{current_page:l,last_page:i,from:m,to:y,total:f,links:u}=j;if(!f||i<=1)return null;const r=u.find(t=>t.label.toLowerCase().includes("previous")),a=u.find(t=>t.label.toLowerCase().includes("next")),v=(()=>{const t=[];if(l>o+2)t.push(1,"...");else for(let e=1;e<l;e++)e>=l-o&&t.push(e);for(let e=l-o;e<=l+o;e++)e>1&&e<i&&t.push(e);if(l<i-o-1)t.push("...",i);else for(let e=l+1;e<=i;e++)e<=l+o&&t.push(e);return[...new Set([1,...t,i])]})();return s.jsxs("div",{className:"mt-4 flex flex-wrap items-center justify-center gap-2 px-10 sm:justify-between",children:[s.jsxs("div",{children:[m," - ",y," of ",f]}),s.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-2",children:[s.jsx(c,{variant:"outline",disabled:!(r!=null&&r.url),className:r!=null&&r.url?"":"opacity-50 cursor-not-allowed",asChild:!!(r!=null&&r.url),children:r!=null&&r.url?s.jsx(d,{href:r.url,preserveScroll:!0,preserveState:!0,children:s.jsx(p,{})}):s.jsx("span",{children:s.jsx(p,{})})}),v.map((t,e)=>{if(typeof t=="string")return s.jsx(c,{variant:"outline",disabled:!0,className:"cursor-default opacity-50",children:"..."},e);const n=u.find(w=>w.label===t.toString());return!n||!n.url?s.jsx(c,{variant:"outline",disabled:!0,className:"opacity-50",children:t},e):s.jsx(c,{asChild:!0,variant:n.active?"default":"outline",children:s.jsx(d,{href:n.url,preserveScroll:!0,preserveState:!0,children:t})},e)}),s.jsx(c,{variant:"outline",disabled:!(a!=null&&a.url),className:a!=null&&a.url?"":"opacity-50 cursor-not-allowed",asChild:!!(a!=null&&a.url),children:a!=null&&a.url?s.jsx(d,{href:a.url,preserveScroll:!0,preserveState:!0,children:s.jsx(x,{})}):s.jsx("span",{children:s.jsx(x,{})})})]})]})}export{$ as I,I as T};
