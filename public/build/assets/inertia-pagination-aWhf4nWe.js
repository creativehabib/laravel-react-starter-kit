import{a as u,B as c}from"./button-B5NM5FpF.js";import{j as t,$ as h}from"./app-DRCHVdHn.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]],p=u("ChevronsLeft",g);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]],x=u("ChevronsRight",w);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],P=u("SquarePen",N);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],$=u("Trash2",_);function I({meta:j,range:o=2}){const{current_page:l,last_page:i,from:m,to:y,total:f,links:d}=j;if(!f||i<=1)return null;const r=d.find(s=>s.label.toLowerCase().includes("previous")),a=d.find(s=>s.label.toLowerCase().includes("next")),v=(()=>{const s=[];if(l>o+2)s.push(1,"...");else for(let e=1;e<l;e++)e>=l-o&&s.push(e);for(let e=l-o;e<=l+o;e++)e>1&&e<i&&s.push(e);if(l<i-o-1)s.push("...",i);else for(let e=l+1;e<=i;e++)e<=l+o&&s.push(e);return[...new Set([1,...s,i])]})();return t.jsxs("div",{className:"mt-4 flex flex-wrap items-center justify-center gap-2 px-10 sm:justify-between",children:[t.jsxs("div",{children:[m," - ",y," of ",f]}),t.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-2",children:[t.jsx(c,{variant:"outline",disabled:!(r!=null&&r.url),className:r!=null&&r.url?"":"opacity-50 cursor-not-allowed",asChild:!!(r!=null&&r.url),children:r!=null&&r.url?t.jsx(h,{href:r.url,preserveScroll:!0,preserveState:!0,children:t.jsx(p,{})}):t.jsx("span",{children:t.jsx(p,{})})}),v.map((s,e)=>{if(typeof s=="string")return t.jsx(c,{variant:"outline",disabled:!0,className:"cursor-default opacity-50",children:"..."},e);const n=d.find(S=>S.label===s.toString());return!n||!n.url?t.jsx(c,{variant:"outline",disabled:!0,className:"opacity-50",children:s},e):t.jsx(c,{asChild:!0,variant:n.active?"default":"outline",children:t.jsx(h,{href:n.url,preserveScroll:!0,preserveState:!0,children:s})},e)}),t.jsx(c,{variant:"outline",disabled:!(a!=null&&a.url),className:a!=null&&a.url?"":"opacity-50 cursor-not-allowed",asChild:!!(a!=null&&a.url),children:a!=null&&a.url?t.jsx(h,{href:a.url,preserveScroll:!0,preserveState:!0,children:t.jsx(x,{})}):t.jsx("span",{children:t.jsx(x,{})})})]})]})}export{I,P as S,$ as T};
