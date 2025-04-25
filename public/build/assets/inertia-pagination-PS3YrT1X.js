import{a as n,B as c}from"./index-MB3xdT6E.js";import{j as e,$ as f}from"./app-1oEnDyEf.js";import{D as N,b as C,c as D,d as _,e as b,f as w}from"./dialog-DEBuv2dk.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"m11 17-5-5 5-5",key:"13zhaf"}],["path",{d:"m18 17-5-5 5-5",key:"h8a8et"}]],x=n("ChevronsLeft",S);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]],j=n("ChevronsRight",M);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],H=n("SquarePen",T);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],R=n("Trash2",$);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],P=n("TriangleAlert",k),B=({open:h,onClose:i,onConfirm:l,title:o,description:u})=>e.jsx(N,{open:h,onOpenChange:i,children:e.jsxs(C,{children:[e.jsx(D,{children:e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(P,{className:"text-red-500",size:30}),e.jsxs("div",{children:[e.jsx(_,{children:o}),e.jsx(b,{children:u})]})]})}),e.jsxs(w,{children:[e.jsx(c,{onClick:i,className:"cursor-pointer",children:"Cancel"}),e.jsx(c,{className:"bg-red-500 cursor-pointer",onClick:l,children:"Delete"})]})]})});function V({meta:h,range:i=2}){const{current_page:l,last_page:o,from:u,to:m,total:y,links:p}=h,r=p.find(a=>a.label.toLowerCase().includes("previous")),t=p.find(a=>a.label.toLowerCase().includes("next")),v=(()=>{const a=[];if(l>i+2)a.push(1,"...");else for(let s=1;s<l;s++)s>=l-i&&a.push(s);for(let s=l-i;s<=l+i;s++)s>1&&s<o&&a.push(s);if(l<o-i-1)a.push("...",o);else for(let s=l+1;s<=o;s++)s<=l+i&&a.push(s);return[...new Set([1,...a,o])]})();return e.jsxs("div",{className:"mt-4 flex flex-wrap items-center justify-center gap-2 px-10 sm:justify-between",children:[e.jsxs("div",{children:[u," - ",m," of ",y]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-center gap-2",children:[e.jsx(c,{variant:"outline",disabled:!(r!=null&&r.url),className:r!=null&&r.url?"":"opacity-50 cursor-not-allowed",asChild:!!(r!=null&&r.url),children:r!=null&&r.url?e.jsx(f,{href:r.url,preserveScroll:!0,preserveState:!0,children:e.jsx(x,{})}):e.jsx("span",{children:e.jsx(x,{})})}),v.map((a,s)=>{if(typeof a=="string")return e.jsx(c,{variant:"outline",disabled:!0,className:"cursor-default opacity-50",children:"..."},s);const d=p.find(g=>g.label===a.toString());return!d||!d.url?e.jsx(c,{variant:"outline",disabled:!0,className:"opacity-50",children:a},s):e.jsx(c,{asChild:!0,variant:d.active?"default":"outline",children:e.jsx(f,{href:d.url,preserveScroll:!0,preserveState:!0,children:a})},s)}),e.jsx(c,{variant:"outline",disabled:!(t!=null&&t.url),className:t!=null&&t.url?"":"opacity-50 cursor-not-allowed",asChild:!!(t!=null&&t.url),children:t!=null&&t.url?e.jsx(f,{href:t.url,preserveScroll:!0,preserveState:!0,children:e.jsx(j,{})}):e.jsx("span",{children:e.jsx(j,{})})})]})]})}export{B as D,V as I,H as S,R as T};
