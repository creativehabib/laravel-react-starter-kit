import{r as f,j as K}from"./app-Dn8LgUSy.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),je=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Je={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=f.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:s="",children:n,iconNode:i,...a},l)=>f.createElement("svg",{ref:l,...Je,width:t,height:t,stroke:e,strokeWidth:o?Number(r)*24/Number(t):r,className:je("lucide",s),...a},[...i.map(([u,m])=>f.createElement(u,m)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=(e,t)=>{const r=f.forwardRef(({className:o,...s},n)=>f.createElement(Xe,{ref:n,iconNode:t,className:je(`lucide-${Ke(e)}`,o),...s}));return r.displayName=`${e}`,r};function Ne(e){var t,r,o="";if(typeof e=="string"||typeof e=="number")o+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(r=Ne(e[t]))&&(o&&(o+=" "),o+=r)}else for(r in e)e[r]&&(o&&(o+=" "),o+=r);return o}function Oe(){for(var e,t,r=0,o="",s=arguments.length;r<s;r++)(e=arguments[r])&&(t=Ne(e))&&(o&&(o+=" "),o+=t);return o}const he="-",Ye=e=>{const t=et(e),{conflictingClassGroups:r,conflictingClassGroupModifiers:o}=e;return{getClassGroupId:i=>{const a=i.split(he);return a[0]===""&&a.length!==1&&a.shift(),$e(a,t)||Qe(i)},getConflictingClassGroupIds:(i,a)=>{const l=r[i]||[];return a&&o[i]?[...l,...o[i]]:l}}},$e=(e,t)=>{var i;if(e.length===0)return t.classGroupId;const r=e[0],o=t.nextPart.get(r),s=o?$e(e.slice(1),o):void 0;if(s)return s;if(t.validators.length===0)return;const n=e.join(he);return(i=t.validators.find(({validator:a})=>a(n)))==null?void 0:i.classGroupId},Ae=/^\[(.+)\]$/,Qe=e=>{if(Ae.test(e)){const t=Ae.exec(e)[1],r=t==null?void 0:t.substring(0,t.indexOf(":"));if(r)return"arbitrary.."+r}},et=e=>{const{theme:t,classGroups:r}=e,o={nextPart:new Map,validators:[]};for(const s in r)ue(r[s],o,s,t);return o},ue=(e,t,r,o)=>{e.forEach(s=>{if(typeof s=="string"){const n=s===""?t:Ee(t,s);n.classGroupId=r;return}if(typeof s=="function"){if(tt(s)){ue(s(o),t,r,o);return}t.validators.push({validator:s,classGroupId:r});return}Object.entries(s).forEach(([n,i])=>{ue(i,Ee(t,n),r,o)})})},Ee=(e,t)=>{let r=e;return t.split(he).forEach(o=>{r.nextPart.has(o)||r.nextPart.set(o,{nextPart:new Map,validators:[]}),r=r.nextPart.get(o)}),r},tt=e=>e.isThemeGetter,rt=e=>{if(e<1)return{get:()=>{},set:()=>{}};let t=0,r=new Map,o=new Map;const s=(n,i)=>{r.set(n,i),t++,t>e&&(t=0,o=r,r=new Map)};return{get(n){let i=r.get(n);if(i!==void 0)return i;if((i=o.get(n))!==void 0)return s(n,i),i},set(n,i){r.has(n)?r.set(n,i):s(n,i)}}},pe="!",fe=":",ot=fe.length,nt=e=>{const{prefix:t,experimentalParseClassName:r}=e;let o=s=>{const n=[];let i=0,a=0,l=0,u;for(let x=0;x<s.length;x++){let z=s[x];if(i===0&&a===0){if(z===fe){n.push(s.slice(l,x)),l=x+ot;continue}if(z==="/"){u=x;continue}}z==="["?i++:z==="]"?i--:z==="("?a++:z===")"&&a--}const m=n.length===0?s:s.substring(l),h=st(m),y=h!==m,v=u&&u>l?u-l:void 0;return{modifiers:n,hasImportantModifier:y,baseClassName:h,maybePostfixModifierPosition:v}};if(t){const s=t+fe,n=o;o=i=>i.startsWith(s)?n(i.substring(s.length)):{isExternal:!0,modifiers:[],hasImportantModifier:!1,baseClassName:i,maybePostfixModifierPosition:void 0}}if(r){const s=o;o=n=>r({className:n,parseClassName:s})}return o},st=e=>e.endsWith(pe)?e.substring(0,e.length-1):e.startsWith(pe)?e.substring(1):e,it=e=>{const t=Object.fromEntries(e.orderSensitiveModifiers.map(o=>[o,!0]));return o=>{if(o.length<=1)return o;const s=[];let n=[];return o.forEach(i=>{i[0]==="["||t[i]?(s.push(...n.sort(),i),n=[]):n.push(i)}),s.push(...n.sort()),s}},at=e=>({cache:rt(e.cacheSize),parseClassName:nt(e),sortModifiers:it(e),...Ye(e)}),lt=/\s+/,ct=(e,t)=>{const{parseClassName:r,getClassGroupId:o,getConflictingClassGroupIds:s,sortModifiers:n}=t,i=[],a=e.trim().split(lt);let l="";for(let u=a.length-1;u>=0;u-=1){const m=a[u],{isExternal:h,modifiers:y,hasImportantModifier:v,baseClassName:x,maybePostfixModifierPosition:z}=r(m);if(h){l=m+(l.length>0?" "+l:l);continue}let S=!!z,O=o(S?x.substring(0,z):x);if(!O){if(!S){l=m+(l.length>0?" "+l:l);continue}if(O=o(x),!O){l=m+(l.length>0?" "+l:l);continue}S=!1}const H=n(y).join(":"),q=v?H+pe:H,_=q+O;if(i.includes(_))continue;i.push(_);const F=s(O,S);for(let p=0;p<F.length;++p){const E=F[p];i.push(q+E)}l=m+(l.length>0?" "+l:l)}return l};function dt(){let e=0,t,r,o="";for(;e<arguments.length;)(t=arguments[e++])&&(r=Ve(t))&&(o&&(o+=" "),o+=r);return o}const Ve=e=>{if(typeof e=="string")return e;let t,r="";for(let o=0;o<e.length;o++)e[o]&&(t=Ve(e[o]))&&(r&&(r+=" "),r+=t);return r};function ut(e,...t){let r,o,s,n=i;function i(l){const u=t.reduce((m,h)=>h(m),e());return r=at(u),o=r.cache.get,s=r.cache.set,n=a,a(l)}function a(l){const u=o(l);if(u)return u;const m=ct(l,r);return s(l,m),m}return function(){return n(dt.apply(null,arguments))}}const w=e=>{const t=r=>r[e]||[];return t.isThemeGetter=!0,t},Ge=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Te=/^\((?:(\w[\w-]*):)?(.+)\)$/i,pt=/^\d+\/\d+$/,ft=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,mt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,bt=/^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,gt=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,ht=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,W=e=>pt.test(e),b=e=>!!e&&!Number.isNaN(Number(e)),V=e=>!!e&&Number.isInteger(Number(e)),Se=e=>e.endsWith("%")&&b(e.slice(0,-1)),I=e=>ft.test(e),yt=()=>!0,vt=e=>mt.test(e)&&!bt.test(e),ye=()=>!1,xt=e=>gt.test(e),wt=e=>ht.test(e),kt=e=>!c(e)&&!d(e),Ct=e=>B(e,Fe,ye),c=e=>Ge.test(e),G=e=>B(e,De,vt),de=e=>B(e,Ot,b),zt=e=>B(e,Le,ye),At=e=>B(e,_e,wt),Et=e=>B(e,ye,xt),d=e=>Te.test(e),re=e=>U(e,De),St=e=>U(e,$t),Mt=e=>U(e,Le),Rt=e=>U(e,Fe),Pt=e=>U(e,_e),It=e=>U(e,Vt,!0),B=(e,t,r)=>{const o=Ge.exec(e);return o?o[1]?t(o[1]):r(o[2]):!1},U=(e,t,r=!1)=>{const o=Te.exec(e);return o?o[1]?t(o[1]):r:!1},Le=e=>e==="position",jt=new Set(["image","url"]),_e=e=>jt.has(e),Nt=new Set(["length","size","percentage"]),Fe=e=>Nt.has(e),De=e=>e==="length",Ot=e=>e==="number",$t=e=>e==="family-name",Vt=e=>e==="shadow",Gt=()=>{const e=w("color"),t=w("font"),r=w("text"),o=w("font-weight"),s=w("tracking"),n=w("leading"),i=w("breakpoint"),a=w("container"),l=w("spacing"),u=w("radius"),m=w("shadow"),h=w("inset-shadow"),y=w("drop-shadow"),v=w("blur"),x=w("perspective"),z=w("aspect"),S=w("ease"),O=w("animate"),H=()=>["auto","avoid","all","avoid-page","page","left","right","column"],q=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],_=()=>["auto","hidden","clip","visible","scroll"],F=()=>["auto","contain","none"],p=()=>[d,c,l],E=()=>[W,"full","auto",...p()],ve=()=>[V,"none","subgrid",d,c],xe=()=>["auto",{span:["full",V,d,c]},d,c],X=()=>[V,"auto",d,c],we=()=>["auto","min","max","fr",d,c],ae=()=>["start","end","center","between","around","evenly","stretch","baseline"],D=()=>["start","end","center","stretch"],M=()=>["auto",...p()],$=()=>[W,"auto","full","dvw","dvh","lvw","lvh","svw","svh","min","max","fit",...p()],g=()=>[e,d,c],le=()=>[Se,G],k=()=>["","none","full",u,d,c],A=()=>["",b,re,G],Y=()=>["solid","dashed","dotted","double"],ke=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],Ce=()=>["","none",v,d,c],ze=()=>["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",d,c],Q=()=>["none",b,d,c],ee=()=>["none",b,d,c],ce=()=>[b,d,c],te=()=>[W,"full",...p()];return{cacheSize:500,theme:{animate:["spin","ping","pulse","bounce"],aspect:["video"],blur:[I],breakpoint:[I],color:[yt],container:[I],"drop-shadow":[I],ease:["in","out","in-out"],font:[kt],"font-weight":["thin","extralight","light","normal","medium","semibold","bold","extrabold","black"],"inset-shadow":[I],leading:["none","tight","snug","normal","relaxed","loose"],perspective:["dramatic","near","normal","midrange","distant","none"],radius:[I],shadow:[I],spacing:["px",b],text:[I],tracking:["tighter","tight","normal","wide","wider","widest"]},classGroups:{aspect:[{aspect:["auto","square",W,c,d,z]}],container:["container"],columns:[{columns:[b,c,d,a]}],"break-after":[{"break-after":H()}],"break-before":[{"break-before":H()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],sr:["sr-only","not-sr-only"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...q(),c,d]}],overflow:[{overflow:_()}],"overflow-x":[{"overflow-x":_()}],"overflow-y":[{"overflow-y":_()}],overscroll:[{overscroll:F()}],"overscroll-x":[{"overscroll-x":F()}],"overscroll-y":[{"overscroll-y":F()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:E()}],"inset-x":[{"inset-x":E()}],"inset-y":[{"inset-y":E()}],start:[{start:E()}],end:[{end:E()}],top:[{top:E()}],right:[{right:E()}],bottom:[{bottom:E()}],left:[{left:E()}],visibility:["visible","invisible","collapse"],z:[{z:[V,"auto",d,c]}],basis:[{basis:[W,"full","auto",a,...p()]}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["nowrap","wrap","wrap-reverse"]}],flex:[{flex:[b,W,"auto","initial","none",c]}],grow:[{grow:["",b,d,c]}],shrink:[{shrink:["",b,d,c]}],order:[{order:[V,"first","last","none",d,c]}],"grid-cols":[{"grid-cols":ve()}],"col-start-end":[{col:xe()}],"col-start":[{"col-start":X()}],"col-end":[{"col-end":X()}],"grid-rows":[{"grid-rows":ve()}],"row-start-end":[{row:xe()}],"row-start":[{"row-start":X()}],"row-end":[{"row-end":X()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":we()}],"auto-rows":[{"auto-rows":we()}],gap:[{gap:p()}],"gap-x":[{"gap-x":p()}],"gap-y":[{"gap-y":p()}],"justify-content":[{justify:[...ae(),"normal"]}],"justify-items":[{"justify-items":[...D(),"normal"]}],"justify-self":[{"justify-self":["auto",...D()]}],"align-content":[{content:["normal",...ae()]}],"align-items":[{items:[...D(),"baseline"]}],"align-self":[{self:["auto",...D(),"baseline"]}],"place-content":[{"place-content":ae()}],"place-items":[{"place-items":[...D(),"baseline"]}],"place-self":[{"place-self":["auto",...D()]}],p:[{p:p()}],px:[{px:p()}],py:[{py:p()}],ps:[{ps:p()}],pe:[{pe:p()}],pt:[{pt:p()}],pr:[{pr:p()}],pb:[{pb:p()}],pl:[{pl:p()}],m:[{m:M()}],mx:[{mx:M()}],my:[{my:M()}],ms:[{ms:M()}],me:[{me:M()}],mt:[{mt:M()}],mr:[{mr:M()}],mb:[{mb:M()}],ml:[{ml:M()}],"space-x":[{"space-x":p()}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":p()}],"space-y-reverse":["space-y-reverse"],size:[{size:$()}],w:[{w:[a,"screen",...$()]}],"min-w":[{"min-w":[a,"screen","none",...$()]}],"max-w":[{"max-w":[a,"screen","none","prose",{screen:[i]},...$()]}],h:[{h:["screen",...$()]}],"min-h":[{"min-h":["screen","none",...$()]}],"max-h":[{"max-h":["screen",...$()]}],"font-size":[{text:["base",r,re,G]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:[o,d,de]}],"font-stretch":[{"font-stretch":["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded",Se,c]}],"font-family":[{font:[St,c,t]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:[s,d,c]}],"line-clamp":[{"line-clamp":[b,"none",d,de]}],leading:[{leading:[n,...p()]}],"list-image":[{"list-image":["none",d,c]}],"list-style-position":[{list:["inside","outside"]}],"list-style-type":[{list:["disc","decimal","none",d,c]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"placeholder-color":[{placeholder:g()}],"text-color":[{text:g()}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...Y(),"wavy"]}],"text-decoration-thickness":[{decoration:[b,"from-font","auto",d,G]}],"text-decoration-color":[{decoration:g()}],"underline-offset":[{"underline-offset":[b,"auto",d,c]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:p()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",d,c]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",d,c]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...q(),Mt,zt]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","space","round"]}]}],"bg-size":[{bg:["auto","cover","contain",Rt,Ct]}],"bg-image":[{bg:["none",{linear:[{to:["t","tr","r","br","b","bl","l","tl"]},V,d,c],radial:["",d,c],conic:[V,d,c]},Pt,At]}],"bg-color":[{bg:g()}],"gradient-from-pos":[{from:le()}],"gradient-via-pos":[{via:le()}],"gradient-to-pos":[{to:le()}],"gradient-from":[{from:g()}],"gradient-via":[{via:g()}],"gradient-to":[{to:g()}],rounded:[{rounded:k()}],"rounded-s":[{"rounded-s":k()}],"rounded-e":[{"rounded-e":k()}],"rounded-t":[{"rounded-t":k()}],"rounded-r":[{"rounded-r":k()}],"rounded-b":[{"rounded-b":k()}],"rounded-l":[{"rounded-l":k()}],"rounded-ss":[{"rounded-ss":k()}],"rounded-se":[{"rounded-se":k()}],"rounded-ee":[{"rounded-ee":k()}],"rounded-es":[{"rounded-es":k()}],"rounded-tl":[{"rounded-tl":k()}],"rounded-tr":[{"rounded-tr":k()}],"rounded-br":[{"rounded-br":k()}],"rounded-bl":[{"rounded-bl":k()}],"border-w":[{border:A()}],"border-w-x":[{"border-x":A()}],"border-w-y":[{"border-y":A()}],"border-w-s":[{"border-s":A()}],"border-w-e":[{"border-e":A()}],"border-w-t":[{"border-t":A()}],"border-w-r":[{"border-r":A()}],"border-w-b":[{"border-b":A()}],"border-w-l":[{"border-l":A()}],"divide-x":[{"divide-x":A()}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":A()}],"divide-y-reverse":["divide-y-reverse"],"border-style":[{border:[...Y(),"hidden","none"]}],"divide-style":[{divide:[...Y(),"hidden","none"]}],"border-color":[{border:g()}],"border-color-x":[{"border-x":g()}],"border-color-y":[{"border-y":g()}],"border-color-s":[{"border-s":g()}],"border-color-e":[{"border-e":g()}],"border-color-t":[{"border-t":g()}],"border-color-r":[{"border-r":g()}],"border-color-b":[{"border-b":g()}],"border-color-l":[{"border-l":g()}],"divide-color":[{divide:g()}],"outline-style":[{outline:[...Y(),"none","hidden"]}],"outline-offset":[{"outline-offset":[b,d,c]}],"outline-w":[{outline:["",b,re,G]}],"outline-color":[{outline:[e]}],shadow:[{shadow:["","none",m,It,Et]}],"shadow-color":[{shadow:g()}],"inset-shadow":[{"inset-shadow":["none",d,c,h]}],"inset-shadow-color":[{"inset-shadow":g()}],"ring-w":[{ring:A()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:g()}],"ring-offset-w":[{"ring-offset":[b,G]}],"ring-offset-color":[{"ring-offset":g()}],"inset-ring-w":[{"inset-ring":A()}],"inset-ring-color":[{"inset-ring":g()}],opacity:[{opacity:[b,d,c]}],"mix-blend":[{"mix-blend":[...ke(),"plus-darker","plus-lighter"]}],"bg-blend":[{"bg-blend":ke()}],filter:[{filter:["","none",d,c]}],blur:[{blur:Ce()}],brightness:[{brightness:[b,d,c]}],contrast:[{contrast:[b,d,c]}],"drop-shadow":[{"drop-shadow":["","none",y,d,c]}],grayscale:[{grayscale:["",b,d,c]}],"hue-rotate":[{"hue-rotate":[b,d,c]}],invert:[{invert:["",b,d,c]}],saturate:[{saturate:[b,d,c]}],sepia:[{sepia:["",b,d,c]}],"backdrop-filter":[{"backdrop-filter":["","none",d,c]}],"backdrop-blur":[{"backdrop-blur":Ce()}],"backdrop-brightness":[{"backdrop-brightness":[b,d,c]}],"backdrop-contrast":[{"backdrop-contrast":[b,d,c]}],"backdrop-grayscale":[{"backdrop-grayscale":["",b,d,c]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[b,d,c]}],"backdrop-invert":[{"backdrop-invert":["",b,d,c]}],"backdrop-opacity":[{"backdrop-opacity":[b,d,c]}],"backdrop-saturate":[{"backdrop-saturate":[b,d,c]}],"backdrop-sepia":[{"backdrop-sepia":["",b,d,c]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":p()}],"border-spacing-x":[{"border-spacing-x":p()}],"border-spacing-y":[{"border-spacing-y":p()}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["","all","colors","opacity","shadow","transform","none",d,c]}],"transition-behavior":[{transition:["normal","discrete"]}],duration:[{duration:[b,"initial",d,c]}],ease:[{ease:["linear","initial",S,d,c]}],delay:[{delay:[b,d,c]}],animate:[{animate:["none",O,d,c]}],backface:[{backface:["hidden","visible"]}],perspective:[{perspective:[x,d,c]}],"perspective-origin":[{"perspective-origin":ze()}],rotate:[{rotate:Q()}],"rotate-x":[{"rotate-x":Q()}],"rotate-y":[{"rotate-y":Q()}],"rotate-z":[{"rotate-z":Q()}],scale:[{scale:ee()}],"scale-x":[{"scale-x":ee()}],"scale-y":[{"scale-y":ee()}],"scale-z":[{"scale-z":ee()}],"scale-3d":["scale-3d"],skew:[{skew:ce()}],"skew-x":[{"skew-x":ce()}],"skew-y":[{"skew-y":ce()}],transform:[{transform:[d,c,"","none","gpu","cpu"]}],"transform-origin":[{origin:ze()}],"transform-style":[{transform:["3d","flat"]}],translate:[{translate:te()}],"translate-x":[{"translate-x":te()}],"translate-y":[{"translate-y":te()}],"translate-z":[{"translate-z":te()}],"translate-none":["translate-none"],accent:[{accent:g()}],appearance:[{appearance:["none","auto"]}],"caret-color":[{caret:g()}],"color-scheme":[{scheme:["normal","dark","light","light-dark","only-dark","only-light"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",d,c]}],"field-sizing":[{"field-sizing":["fixed","content"]}],"pointer-events":[{"pointer-events":["auto","none"]}],resize:[{resize:["none","","y","x"]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":p()}],"scroll-mx":[{"scroll-mx":p()}],"scroll-my":[{"scroll-my":p()}],"scroll-ms":[{"scroll-ms":p()}],"scroll-me":[{"scroll-me":p()}],"scroll-mt":[{"scroll-mt":p()}],"scroll-mr":[{"scroll-mr":p()}],"scroll-mb":[{"scroll-mb":p()}],"scroll-ml":[{"scroll-ml":p()}],"scroll-p":[{"scroll-p":p()}],"scroll-px":[{"scroll-px":p()}],"scroll-py":[{"scroll-py":p()}],"scroll-ps":[{"scroll-ps":p()}],"scroll-pe":[{"scroll-pe":p()}],"scroll-pt":[{"scroll-pt":p()}],"scroll-pr":[{"scroll-pr":p()}],"scroll-pb":[{"scroll-pb":p()}],"scroll-pl":[{"scroll-pl":p()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",d,c]}],fill:[{fill:["none",...g()]}],"stroke-w":[{stroke:[b,re,G,de]}],stroke:[{stroke:["none",...g()]}],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],translate:["translate-x","translate-y","translate-none"],"translate-none":["translate","translate-x","translate-y","translate-z"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]},orderSensitiveModifiers:["before","after","placeholder","file","marker","selection","first-line","first-letter","backdrop","*","**"]}},Tt=ut(Gt);function Lt(...e){return Tt(Oe(e))}function Me(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function We(...e){return t=>{let r=!1;const o=e.map(s=>{const n=Me(s,t);return!r&&typeof n=="function"&&(r=!0),n});if(r)return()=>{for(let s=0;s<o.length;s++){const n=o[s];typeof n=="function"?n():Me(e[s],null)}}}}function Gr(...e){return f.useCallback(We(...e),e)}var Be=f.forwardRef((e,t)=>{const{children:r,...o}=e,s=f.Children.toArray(r),n=s.find(Ft);if(n){const i=n.props.children,a=s.map(l=>l===n?f.Children.count(i)>1?f.Children.only(null):f.isValidElement(i)?i.props.children:null:l);return K.jsx(me,{...o,ref:t,children:f.isValidElement(i)?f.cloneElement(i,void 0,a):null})}return K.jsx(me,{...o,ref:t,children:r})});Be.displayName="Slot";var me=f.forwardRef((e,t)=>{const{children:r,...o}=e;if(f.isValidElement(r)){const s=Wt(r),n=Dt(o,r.props);return r.type!==f.Fragment&&(n.ref=t?We(t,s):s),f.cloneElement(r,n)}return f.Children.count(r)>1?f.Children.only(null):null});me.displayName="SlotClone";var _t=({children:e})=>K.jsx(K.Fragment,{children:e});function Ft(e){return f.isValidElement(e)&&e.type===_t}function Dt(e,t){const r={...t};for(const o in t){const s=e[o],n=t[o];/^on[A-Z]/.test(o)?s&&n?r[o]=(...a)=>{n(...a),s(...a)}:s&&(r[o]=s):o==="style"?r[o]={...s,...n}:o==="className"&&(r[o]=[s,n].filter(Boolean).join(" "))}return{...e,...r}}function Wt(e){var o,s;let t=(o=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:o.get,r=t&&"isReactWarning"in t&&t.isReactWarning;return r?e.ref:(t=(s=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:s.get,r=t&&"isReactWarning"in t&&t.isReactWarning,r?e.props.ref:e.props.ref||e.ref)}const Re=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,Pe=Oe,Bt=(e,t)=>r=>{var o;if((t==null?void 0:t.variants)==null)return Pe(e,r==null?void 0:r.class,r==null?void 0:r.className);const{variants:s,defaultVariants:n}=t,i=Object.keys(s).map(u=>{const m=r==null?void 0:r[u],h=n==null?void 0:n[u];if(m===null)return null;const y=Re(m)||Re(h);return s[u][y]}),a=r&&Object.entries(r).reduce((u,m)=>{let[h,y]=m;return y===void 0||(u[h]=y),u},{}),l=t==null||(o=t.compoundVariants)===null||o===void 0?void 0:o.reduce((u,m)=>{let{class:h,className:y,...v}=m;return Object.entries(v).every(x=>{let[z,S]=x;return Array.isArray(S)?S.includes({...n,...a}[z]):{...n,...a}[z]===S})?[...u,h,y]:u},[]);return Pe(e,i,l,r==null?void 0:r.class,r==null?void 0:r.className)},Ut=Bt("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",destructive:"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",outline:"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});function Tr({className:e,variant:t,size:r,asChild:o=!1,...s}){const n=o?Be:"button";return K.jsx(n,{"data-slot":"button",className:Lt(Ut({variant:t,size:r,className:e})),...s})}let Ht={data:""},qt=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||Ht,Zt=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Kt=/\/\*[^]*?\*\/|  +/g,Ie=/\n+/g,j=(e,t)=>{let r="",o="",s="";for(let n in e){let i=e[n];n[0]=="@"?n[1]=="i"?r=n+" "+i+";":o+=n[1]=="f"?j(i,n):n+"{"+j(i,n[1]=="k"?"":t)+"}":typeof i=="object"?o+=j(i,t?t.replace(/([^,])+/g,a=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,a):a?a+" "+l:l)):n):i!=null&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=j.p?j.p(n,i):n+":"+i+";")}return r+(t&&s?t+"{"+s+"}":s)+o},R={},Ue=e=>{if(typeof e=="object"){let t="";for(let r in e)t+=r+Ue(e[r]);return t}return e},Jt=(e,t,r,o,s)=>{let n=Ue(e),i=R[n]||(R[n]=(l=>{let u=0,m=11;for(;u<l.length;)m=101*m+l.charCodeAt(u++)>>>0;return"go"+m})(n));if(!R[i]){let l=n!==e?e:(u=>{let m,h,y=[{}];for(;m=Zt.exec(u.replace(Kt,""));)m[4]?y.shift():m[3]?(h=m[3].replace(Ie," ").trim(),y.unshift(y[0][h]=y[0][h]||{})):y[0][m[1]]=m[2].replace(Ie," ").trim();return y[0]})(e);R[i]=j(s?{["@keyframes "+i]:l}:l,r?"":"."+i)}let a=r&&R.g?R.g:null;return r&&(R.g=R[i]),((l,u,m,h)=>{h?u.data=u.data.replace(h,l):u.data.indexOf(l)===-1&&(u.data=m?l+u.data:u.data+l)})(R[i],t,o,a),i},Xt=(e,t,r)=>e.reduce((o,s,n)=>{let i=t[n];if(i&&i.call){let a=i(r),l=a&&a.props&&a.props.className||/^go/.test(a)&&a;i=l?"."+l:a&&typeof a=="object"?a.props?"":j(a,""):a===!1?"":a}return o+s+(i??"")},"");function ie(e){let t=this||{},r=e.call?e(t.p):e;return Jt(r.unshift?r.raw?Xt(r,[].slice.call(arguments,1),t.p):r.reduce((o,s)=>Object.assign(o,s&&s.call?s(t.p):s),{}):r,qt(t.target),t.g,t.o,t.k)}let He,be,ge;ie.bind({g:1});let P=ie.bind({k:1});function Yt(e,t,r,o){j.p=t,He=e,be=r,ge=o}function N(e,t){let r=this||{};return function(){let o=arguments;function s(n,i){let a=Object.assign({},n),l=a.className||s.className;r.p=Object.assign({theme:be&&be()},a),r.o=/ *go\d+/.test(l),a.className=ie.apply(r,o)+(l?" "+l:"");let u=e;return e[0]&&(u=a.as||e,delete a.as),ge&&u[0]&&ge(a),He(u,a)}return t?t(s):s}}var Qt=e=>typeof e=="function",se=(e,t)=>Qt(e)?e(t):e,er=(()=>{let e=0;return()=>(++e).toString()})(),qe=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),tr=20,Ze=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,tr)};case 1:return{...e,toasts:e.toasts.map(n=>n.id===t.toast.id?{...n,...t.toast}:n)};case 2:let{toast:r}=t;return Ze(e,{type:e.toasts.find(n=>n.id===r.id)?1:0,toast:r});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(n=>n.id===o||o===void 0?{...n,dismissed:!0,visible:!1}:n)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(n=>n.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(n=>({...n,pauseDuration:n.pauseDuration+s}))}}},ne=[],T={toasts:[],pausedAt:void 0},L=e=>{T=Ze(T,e),ne.forEach(t=>{t(T)})},rr={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},or=(e={})=>{let[t,r]=f.useState(T),o=f.useRef(T);f.useEffect(()=>(o.current!==T&&r(T),ne.push(r),()=>{let n=ne.indexOf(r);n>-1&&ne.splice(n,1)}),[]);let s=t.toasts.map(n=>{var i,a,l;return{...e,...e[n.type],...n,removeDelay:n.removeDelay||((i=e[n.type])==null?void 0:i.removeDelay)||(e==null?void 0:e.removeDelay),duration:n.duration||((a=e[n.type])==null?void 0:a.duration)||(e==null?void 0:e.duration)||rr[n.type],style:{...e.style,...(l=e[n.type])==null?void 0:l.style,...n.style}}});return{...t,toasts:s}},nr=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(r==null?void 0:r.id)||er()}),J=e=>(t,r)=>{let o=nr(t,e,r);return L({type:2,toast:o}),o.id},C=(e,t)=>J("blank")(e,t);C.error=J("error");C.success=J("success");C.loading=J("loading");C.custom=J("custom");C.dismiss=e=>{L({type:3,toastId:e})};C.remove=e=>L({type:4,toastId:e});C.promise=(e,t,r)=>{let o=C.loading(t.loading,{...r,...r==null?void 0:r.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let n=t.success?se(t.success,s):void 0;return n?C.success(n,{id:o,...r,...r==null?void 0:r.success}):C.dismiss(o),s}).catch(s=>{let n=t.error?se(t.error,s):void 0;n?C.error(n,{id:o,...r,...r==null?void 0:r.error}):C.dismiss(o)}),e};var sr=(e,t)=>{L({type:1,toast:{id:e,height:t}})},ir=()=>{L({type:5,time:Date.now()})},Z=new Map,ar=1e3,lr=(e,t=ar)=>{if(Z.has(e))return;let r=setTimeout(()=>{Z.delete(e),L({type:4,toastId:e})},t);Z.set(e,r)},cr=e=>{let{toasts:t,pausedAt:r}=or(e);f.useEffect(()=>{if(r)return;let n=Date.now(),i=t.map(a=>{if(a.duration===1/0)return;let l=(a.duration||0)+a.pauseDuration-(n-a.createdAt);if(l<0){a.visible&&C.dismiss(a.id);return}return setTimeout(()=>C.dismiss(a.id),l)});return()=>{i.forEach(a=>a&&clearTimeout(a))}},[t,r]);let o=f.useCallback(()=>{r&&L({type:6,time:Date.now()})},[r]),s=f.useCallback((n,i)=>{let{reverseOrder:a=!1,gutter:l=8,defaultPosition:u}=i||{},m=t.filter(v=>(v.position||u)===(n.position||u)&&v.height),h=m.findIndex(v=>v.id===n.id),y=m.filter((v,x)=>x<h&&v.visible).length;return m.filter(v=>v.visible).slice(...a?[y+1]:[0,y]).reduce((v,x)=>v+(x.height||0)+l,0)},[t]);return f.useEffect(()=>{t.forEach(n=>{if(n.dismissed)lr(n.id,n.removeDelay);else{let i=Z.get(n.id);i&&(clearTimeout(i),Z.delete(n.id))}})},[t]),{toasts:t,handlers:{updateHeight:sr,startPause:ir,endPause:o,calculateOffset:s}}},dr=P`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ur=P`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,pr=P`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,fr=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${dr} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ur} 0.15s ease-out forwards;
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
    animation: ${pr} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,mr=P`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,br=N("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${mr} 1s linear infinite;
`,gr=P`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,hr=P`
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
}`,yr=N("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${gr} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${hr} 0.2s ease-out forwards;
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
`,vr=N("div")`
  position: absolute;
`,xr=N("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,wr=P`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,kr=N("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${wr} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Cr=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return t!==void 0?typeof t=="string"?f.createElement(kr,null,t):t:r==="blank"?null:f.createElement(xr,null,f.createElement(br,{...o}),r!=="loading"&&f.createElement(vr,null,r==="error"?f.createElement(fr,{...o}):f.createElement(yr,{...o})))},zr=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ar=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Er="0%{opacity:0;} 100%{opacity:1;}",Sr="0%{opacity:1;} 100%{opacity:0;}",Mr=N("div")`
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
`,Rr=N("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Pr=(e,t)=>{let r=e.includes("top")?1:-1,[o,s]=qe()?[Er,Sr]:[zr(r),Ar(r)];return{animation:t?`${P(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${P(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ir=f.memo(({toast:e,position:t,style:r,children:o})=>{let s=e.height?Pr(e.position||t||"top-center",e.visible):{opacity:0},n=f.createElement(Cr,{toast:e}),i=f.createElement(Rr,{...e.ariaProps},se(e.message,e));return f.createElement(Mr,{className:e.className,style:{...s,...r,...e.style}},typeof o=="function"?o({icon:n,message:i}):f.createElement(f.Fragment,null,n,i))});Yt(f.createElement);var jr=({id:e,className:t,style:r,onHeightUpdate:o,children:s})=>{let n=f.useCallback(i=>{if(i){let a=()=>{let l=i.getBoundingClientRect().height;o(e,l)};a(),new MutationObserver(a).observe(i,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return f.createElement("div",{ref:n,className:t,style:r},s)},Nr=(e,t)=>{let r=e.includes("top"),o=r?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:qe()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...o,...s}},Or=ie`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,oe=16,Lr=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:s,containerStyle:n,containerClassName:i})=>{let{toasts:a,handlers:l}=cr(r);return f.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:oe,left:oe,right:oe,bottom:oe,pointerEvents:"none",...n},className:i,onMouseEnter:l.startPause,onMouseLeave:l.endPause},a.map(u=>{let m=u.position||t,h=l.calculateOffset(u,{reverseOrder:e,gutter:o,defaultPosition:t}),y=Nr(m,h);return f.createElement(jr,{id:u.id,key:u.id,onHeightUpdate:l.updateHeight,className:u.visible?Or:"",style:y},u.type==="custom"?se(u.message,u):s?s(u):f.createElement(Ir,{toast:u,position:m}))}))},_r=C;export{Tr as B,Lr as O,Be as S,_r as V,Vr as a,_t as b,Lt as c,Bt as d,We as e,Gr as u};
