import{j as A,r as c}from"./app-BPPluLms.js";function ke(e){return A.jsx("svg",{...e,viewBox:"0 0 40 42",xmlns:"http://www.w3.org/2000/svg",children:A.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M17.2 5.63325L8.6 0.855469L0 5.63325V32.1434L16.2 41.1434L32.4 32.1434V23.699L40 19.4767V9.85547L31.4 5.07769L22.8 9.85547V18.2999L17.2 21.411V5.63325ZM38 18.2999L32.4 21.411V15.2545L38 12.1434V18.2999ZM36.9409 10.4439L31.4 13.5221L25.8591 10.4439L31.4 7.36561L36.9409 10.4439ZM24.8 18.2999V12.1434L30.4 15.2545V21.411L24.8 18.2999ZM23.8 20.0323L29.3409 23.1105L16.2 30.411L10.6591 27.3328L23.8 20.0323ZM7.6 27.9212L15.2 32.1434V38.2999L2 30.9666V7.92116L7.6 11.0323V27.9212ZM8.6 9.29991L3.05913 6.22165L8.6 3.14339L14.1409 6.22165L8.6 9.29991ZM30.4 24.8101L17.2 32.1434V38.2999L30.4 30.9666V24.8101ZM9.6 11.0323L15.2 7.92117V22.5221L9.6 25.6333V11.0323Z"})})}let P={data:""},S=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||P,T=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,F=/\/\*[^]*?\*\/|  +/g,C=/\n+/g,b=(e,t)=>{let a="",o="",n="";for(let r in e){let i=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+i+";":o+=r[1]=="f"?b(i,r):r+"{"+b(i,r[1]=="k"?"":t)+"}":typeof i=="object"?o+=b(i,t?t.replace(/([^,])+/g,s=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,s):s?s+" "+l:l)):r):i!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=b.p?b.p(r,i):r+":"+i+";")}return a+(t&&n?t+"{"+n+"}":n)+o},y={},N=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+N(e[a]);return t}return e},R=(e,t,a,o,n)=>{let r=N(e),i=y[r]||(y[r]=(l=>{let d=0,p=11;for(;d<l.length;)p=101*p+l.charCodeAt(d++)>>>0;return"go"+p})(r));if(!y[i]){let l=r!==e?e:(d=>{let p,f,m=[{}];for(;p=T.exec(d.replace(F,""));)p[4]?m.shift():p[3]?(f=p[3].replace(C," ").trim(),m.unshift(m[0][f]=m[0][f]||{})):m[0][p[1]]=p[2].replace(C," ").trim();return m[0]})(e);y[i]=b(n?{["@keyframes "+i]:l}:l,a?"":"."+i)}let s=a&&y.g?y.g:null;return a&&(y.g=y[i]),((l,d,p,f)=>{f?d.data=d.data.replace(f,l):d.data.indexOf(l)===-1&&(d.data=p?l+d.data:d.data+l)})(y[i],t,o,s),i},_=(e,t,a)=>e.reduce((o,n,r)=>{let i=t[r];if(i&&i.call){let s=i(a),l=s&&s.props&&s.props.className||/^go/.test(s)&&s;i=l?"."+l:s&&typeof s=="object"?s.props?"":b(s,""):s===!1?"":s}return o+n+(i??"")},"");function k(e){let t=this||{},a=e.call?e(t.p):e;return R(a.unshift?a.raw?_(a,[].slice.call(arguments,1),t.p):a.reduce((o,n)=>Object.assign(o,n&&n.call?n(t.p):n),{}):a,S(t.target),t.g,t.o,t.k)}let Z,M,O;k.bind({g:1});let h=k.bind({k:1});function H(e,t,a,o){b.p=t,Z=e,M=a,O=o}function v(e,t){let a=this||{};return function(){let o=arguments;function n(r,i){let s=Object.assign({},r),l=s.className||n.className;a.p=Object.assign({theme:M&&M()},s),a.o=/ *go\d+/.test(l),s.className=k.apply(a,o)+(l?" "+l:"");let d=e;return e[0]&&(d=s.as||e,delete s.as),O&&d[0]&&O(s),Z(d,s)}return t?t(n):n}}var U=e=>typeof e=="function",j=(e,t)=>U(e)?e(t):e,q=(()=>{let e=0;return()=>(++e).toString()})(),z=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),B=20,I=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,B)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:a}=t;return I(e,{type:e.toasts.find(r=>r.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(r=>r.id===o||o===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+n}))}}},V=[],x={toasts:[],pausedAt:void 0},w=e=>{x=I(x,e),V.forEach(t=>{t(x)})},Y={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},J=(e={})=>{let[t,a]=c.useState(x),o=c.useRef(x);c.useEffect(()=>(o.current!==x&&a(x),V.push(a),()=>{let r=V.indexOf(a);r>-1&&V.splice(r,1)}),[]);let n=t.toasts.map(r=>{var i,s,l;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||((i=e[r.type])==null?void 0:i.removeDelay)||(e==null?void 0:e.removeDelay),duration:r.duration||((s=e[r.type])==null?void 0:s.duration)||(e==null?void 0:e.duration)||Y[r.type],style:{...e.style,...(l=e[r.type])==null?void 0:l.style,...r.style}}});return{...t,toasts:n}},K=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||q()}),E=e=>(t,a)=>{let o=K(t,e,a);return w({type:2,toast:o}),o.id},u=(e,t)=>E("blank")(e,t);u.error=E("error");u.success=E("success");u.loading=E("loading");u.custom=E("custom");u.dismiss=e=>{w({type:3,toastId:e})};u.remove=e=>w({type:4,toastId:e});u.promise=(e,t,a)=>{let o=u.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(n=>{let r=t.success?j(t.success,n):void 0;return r?u.success(r,{id:o,...a,...a==null?void 0:a.success}):u.dismiss(o),n}).catch(n=>{let r=t.error?j(t.error,n):void 0;r?u.error(r,{id:o,...a,...a==null?void 0:a.error}):u.dismiss(o)}),e};var W=(e,t)=>{w({type:1,toast:{id:e,height:t}})},X=()=>{w({type:5,time:Date.now()})},L=new Map,G=1e3,Q=(e,t=G)=>{if(L.has(e))return;let a=setTimeout(()=>{L.delete(e),w({type:4,toastId:e})},t);L.set(e,a)},ee=e=>{let{toasts:t,pausedAt:a}=J(e);c.useEffect(()=>{if(a)return;let r=Date.now(),i=t.map(s=>{if(s.duration===1/0)return;let l=(s.duration||0)+s.pauseDuration-(r-s.createdAt);if(l<0){s.visible&&u.dismiss(s.id);return}return setTimeout(()=>u.dismiss(s.id),l)});return()=>{i.forEach(s=>s&&clearTimeout(s))}},[t,a]);let o=c.useCallback(()=>{a&&w({type:6,time:Date.now()})},[a]),n=c.useCallback((r,i)=>{let{reverseOrder:s=!1,gutter:l=8,defaultPosition:d}=i||{},p=t.filter(g=>(g.position||d)===(r.position||d)&&g.height),f=p.findIndex(g=>g.id===r.id),m=p.filter((g,D)=>D<f&&g.visible).length;return p.filter(g=>g.visible).slice(...s?[m+1]:[0,m]).reduce((g,D)=>g+(D.height||0)+l,0)},[t]);return c.useEffect(()=>{t.forEach(r=>{if(r.dismissed)Q(r.id,r.removeDelay);else{let i=L.get(r.id);i&&(clearTimeout(i),L.delete(r.id))}})},[t]),{toasts:t,handlers:{updateHeight:W,startPause:X,endPause:o,calculateOffset:n}}},te=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,re=h`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ae=h`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,se=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${te} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${re} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${ae} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,oe=h`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ie=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${oe} 1s linear infinite;
`,ne=h`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,le=h`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,de=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ne} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${le} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,ce=v("div")`
  position: absolute;
`,pe=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ue=h`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,me=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ue} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,fe=({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?c.createElement(me,null,t):t:a==="blank"?null:c.createElement(pe,null,c.createElement(ie,{...o}),a!=="loading"&&c.createElement(ce,null,a==="error"?c.createElement(se,{...o}):c.createElement(de,{...o})))},ge=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ye=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,he="0%{opacity:0;} 100%{opacity:1;}",be="0%{opacity:1;} 100%{opacity:0;}",ve=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,xe=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,we=(e,t)=>{let a=e.includes("top")?1:-1,[o,n]=z()?[he,be]:[ge(a),ye(a)];return{animation:t?`${h(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${h(n)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Le=c.memo(({toast:e,position:t,style:a,children:o})=>{let n=e.height?we(e.position||t||"top-center",e.visible):{opacity:0},r=c.createElement(fe,{toast:e}),i=c.createElement(xe,{...e.ariaProps},j(e.message,e));return c.createElement(ve,{className:e.className,style:{...n,...a,...e.style}},typeof o=="function"?o({icon:r,message:i}):c.createElement(c.Fragment,null,r,i))});H(c.createElement);var Ee=({id:e,className:t,style:a,onHeightUpdate:o,children:n})=>{let r=c.useCallback(i=>{if(i){let s=()=>{let l=i.getBoundingClientRect().height;o(e,l)};s(),new MutationObserver(s).observe(i,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return c.createElement("div",{ref:r,className:t,style:a},n)},$e=(e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},n=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:z()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...n}},Ve=k`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,De=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:n,containerStyle:r,containerClassName:i})=>{let{toasts:s,handlers:l}=ee(a);return c.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:"none",...r},className:i,onMouseEnter:l.startPause,onMouseLeave:l.endPause},s.map(d=>{let p=d.position||t,f=l.calculateOffset(d,{reverseOrder:e,gutter:o,defaultPosition:t}),m=$e(p,f);return c.createElement(Ee,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?Ve:"",style:m},d.type==="custom"?j(d.message,d):n?n(d):c.createElement(Le,{toast:d,position:p}))}))},Me=u;export{ke as A,De as O,Me as V};
