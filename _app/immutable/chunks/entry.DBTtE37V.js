var Ht=t=>{throw TypeError(t)};var xe=(t,e,n)=>e.has(t)||Ht("Cannot "+n);var b=(t,e,n)=>(xe(t,e,"read from private field"),n?n.call(t):e.get(t)),x=(t,e,n)=>e.has(t)?Ht("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n);import{aw as C,f as O,L as N,av as Pe}from"./runtime.D0LUdKCG.js";import{w as Pt}from"./index.BT908uFy.js";import{a as Ce,b as P}from"./paths.5hg7fLmv.js";import{o as Kt}from"./index-client.CQl7z0PD.js";new URL("sveltekit-internal://");function Oe(t,e){return t==="/"||e==="ignore"?t:e==="never"?t.endsWith("/")?t.slice(0,-1):t:e==="always"&&!t.endsWith("/")?t+"/":t}function Ne(t){return t.split("%25").map(decodeURI).join("%25")}function je(t){for(const e in t)t[e]=decodeURIComponent(t[e]);return t}function Et({href:t}){return t.split("#")[0]}function $e(t,e,n,r=!1){const a=new URL(t);Object.defineProperty(a,"searchParams",{value:new Proxy(a.searchParams,{get(i,s){if(s==="get"||s==="getAll"||s==="has")return f=>(n(f),i[s](f));e();const c=Reflect.get(i,s);return typeof c=="function"?c.bind(i):c}}),enumerable:!0,configurable:!0});const o=["href","pathname","search","toString","toJSON"];r&&o.push("hash");for(const i of o)Object.defineProperty(a,i,{get(){return e(),t[i]},enumerable:!0,configurable:!0});return a}const De="/__data.json",Fe=".html__data.json";function Ve(t){return t.endsWith(".html")?t.replace(/\.html$/,Fe):t.replace(/\/$/,"")+De}function Be(...t){let e=5381;for(const n of t)if(typeof n=="string"){let r=n.length;for(;r;)e=e*33^n.charCodeAt(--r)}else if(ArrayBuffer.isView(n)){const r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let a=r.length;for(;a;)e=e*33^r[--a]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}function Ge(t){const e=atob(t),n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n.buffer}const oe=window.fetch;window.fetch=(t,e)=>((t instanceof Request?t.method:(e==null?void 0:e.method)||"GET")!=="GET"&&W.delete(Ct(t)),oe(t,e));const W=new Map;function Me(t,e){const n=Ct(t,e),r=document.querySelector(n);if(r!=null&&r.textContent){let{body:a,...o}=JSON.parse(r.textContent);const i=r.getAttribute("data-ttl");return i&&W.set(n,{body:a,init:o,ttl:1e3*Number(i)}),r.getAttribute("data-b64")!==null&&(a=Ge(a)),Promise.resolve(new Response(a,o))}return window.fetch(t,e)}function qe(t,e,n){if(W.size>0){const r=Ct(t,n),a=W.get(r);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(a.body,a.init);W.delete(r)}}return window.fetch(e,n)}function Ct(t,e){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;if(e!=null&&e.headers||e!=null&&e.body){const a=[];e.headers&&a.push([...new Headers(e.headers)].join(",")),e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&a.push(e.body),r+=`[data-hash="${Be(...a)}"]`}return r}const He=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Ke(t){const e=[];return{pattern:t==="/"?/^\/$/:new RegExp(`^${Ye(t).map(r=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);if(a)return e.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);if(o)return e.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!r)return;const i=r.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,f)=>{if(f%2){if(c.startsWith("x+"))return Rt(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return Rt(String.fromCharCode(...c.slice(2).split("-").map(l=>parseInt(l,16))));const h=He.exec(c),[,d,y,u,g]=h;return e.push({name:u,matcher:g,optional:!!d,rest:!!y,chained:y?f===1&&i[0]==="":!1}),y?"(.*?)":d?"([^/]*)?":"([^/]+?)"}return Rt(c)}).join("")}).join("")}/?$`),params:e}}function We(t){return!/^\([^)]+\)$/.test(t)}function Ye(t){return t.slice(1).split("/").filter(We)}function Je(t,e,n){const r={},a=t.slice(1),o=a.filter(s=>s!==void 0);let i=0;for(let s=0;s<e.length;s+=1){const c=e[s];let f=a[s-i];if(c.chained&&c.rest&&i&&(f=a.slice(s-i,s+1).filter(h=>h).join("/"),i=0),f===void 0){c.rest&&(r[c.name]="");continue}if(!c.matcher||n[c.matcher](f)){r[c.name]=f;const h=e[s+1],d=a[s+1];h&&!h.rest&&h.optional&&d&&c.chained&&(i=0),!h&&!d&&Object.keys(r).length===o.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return r}function Rt(t){return t.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function ze({nodes:t,server_loads:e,dictionary:n,matchers:r}){const a=new Set(e);return Object.entries(n).map(([s,[c,f,h]])=>{const{pattern:d,params:y}=Ke(s),u={id:s,exec:g=>{const l=d.exec(g);if(l)return Je(l,y,r)},errors:[1,...h||[]].map(g=>t[g]),layouts:[0,...f||[]].map(i),leaf:o(c)};return u.errors.length=u.layouts.length=Math.max(u.errors.length,u.layouts.length),u});function o(s){const c=s<0;return c&&(s=~s),[c,t[s]]}function i(s){return s===void 0?s:[a.has(s),t[s]]}}function se(t,e=JSON.parse){try{return e(sessionStorage[t])}catch{}}function Wt(t,e,n=JSON.stringify){const r=n(e);try{sessionStorage[t]=r}catch{}}const Xe="1735978968473",ie="sveltekit:snapshot",ce="sveltekit:scroll",le="sveltekit:states",Ze="sveltekit:pageurl",G="sveltekit:history",J="sveltekit:navigation",ft={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},lt=location.origin;function fe(t){if(t instanceof URL)return t;let e=document.baseURI;if(!e){const n=document.getElementsByTagName("base");e=n.length?n[0].href:document.URL}return new URL(t,e)}function Ot(){return{x:pageXOffset,y:pageYOffset}}function V(t,e){return t.getAttribute(`data-sveltekit-${e}`)}const Yt={...ft,"":ft.hover};function ue(t){let e=t.assignedSlot??t.parentNode;return(e==null?void 0:e.nodeType)===11&&(e=e.host),e}function he(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=ue(t)}}function Lt(t,e,n){let r;try{r=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const a=t instanceof SVGAElement?t.target.baseVal:t.target,o=!r||!!a||_t(r,e,n)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),i=(r==null?void 0:r.origin)===lt&&t.hasAttribute("download");return{url:r,external:o,target:a,download:i}}function ut(t){let e=null,n=null,r=null,a=null,o=null,i=null,s=t;for(;s&&s!==document.documentElement;)r===null&&(r=V(s,"preload-code")),a===null&&(a=V(s,"preload-data")),e===null&&(e=V(s,"keepfocus")),n===null&&(n=V(s,"noscroll")),o===null&&(o=V(s,"reload")),i===null&&(i=V(s,"replacestate")),s=ue(s);function c(f){switch(f){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Yt[r??"off"],preload_data:Yt[a??"off"],keepfocus:c(e),noscroll:c(n),reload:c(o),replace_state:c(i)}}function Jt(t){const e=Pt(t);let n=!0;function r(){n=!0,e.update(i=>i)}function a(i){n=!1,e.set(i)}function o(i){let s;return e.subscribe(c=>{(s===void 0||n&&c!==s)&&i(s=c)})}return{notify:r,set:a,subscribe:o}}const de={v:()=>{}};function Qe(){const{set:t,subscribe:e}=Pt(!1);let n;async function r(){clearTimeout(n);try{const a=await fetch(`${Ce}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const i=(await a.json()).version!==Xe;return i&&(t(!0),de.v(),clearTimeout(n)),i}catch{return!1}}return{subscribe:e,check:r}}function _t(t,e,n){return t.origin!==lt||!t.pathname.startsWith(e)?!0:n?!(t.pathname===e+"/"||t.protocol==="file:"&&t.pathname.replace(/\/[^/]+\.html?$/,"")===e):!1}function zt(t){const e=en(t),n=new ArrayBuffer(e.length),r=new DataView(n);for(let a=0;a<n.byteLength;a++)r.setUint8(a,e.charCodeAt(a));return n}const tn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function en(t){t.length%4===0&&(t=t.replace(/==?$/,""));let e="",n=0,r=0;for(let a=0;a<t.length;a++)n<<=6,n|=tn.indexOf(t[a]),r+=6,r===24&&(e+=String.fromCharCode((n&16711680)>>16),e+=String.fromCharCode((n&65280)>>8),e+=String.fromCharCode(n&255),n=r=0);return r===12?(n>>=4,e+=String.fromCharCode(n)):r===18&&(n>>=2,e+=String.fromCharCode((n&65280)>>8),e+=String.fromCharCode(n&255)),e}const nn=-1,rn=-2,an=-3,on=-4,sn=-5,cn=-6;function ln(t,e){if(typeof t=="number")return a(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const n=t,r=Array(n.length);function a(o,i=!1){if(o===nn)return;if(o===an)return NaN;if(o===on)return 1/0;if(o===sn)return-1/0;if(o===cn)return-0;if(i)throw new Error("Invalid input");if(o in r)return r[o];const s=n[o];if(!s||typeof s!="object")r[o]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const c=s[0],f=e==null?void 0:e[c];if(f)return r[o]=f(a(s[1]));switch(c){case"Date":r[o]=new Date(s[1]);break;case"Set":const h=new Set;r[o]=h;for(let u=1;u<s.length;u+=1)h.add(a(s[u]));break;case"Map":const d=new Map;r[o]=d;for(let u=1;u<s.length;u+=2)d.set(a(s[u]),a(s[u+1]));break;case"RegExp":r[o]=new RegExp(s[1],s[2]);break;case"Object":r[o]=Object(s[1]);break;case"BigInt":r[o]=BigInt(s[1]);break;case"null":const y=Object.create(null);r[o]=y;for(let u=1;u<s.length;u+=2)y[s[u]]=a(s[u+1]);break;case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":{const u=globalThis[c],g=s[1],l=zt(g),p=new u(l);r[o]=p;break}case"ArrayBuffer":{const u=s[1],g=zt(u);r[o]=g;break}default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(s.length);r[o]=c;for(let f=0;f<s.length;f+=1){const h=s[f];h!==rn&&(c[f]=a(h))}}else{const c={};r[o]=c;for(const f in s){const h=s[f];c[f]=a(h)}}return r[o]}return a(0)}const pe=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...pe];const fn=new Set([...pe]);[...fn];function un(t){return t.filter(e=>e!=null)}class vt{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class ge{constructor(e,n){this.status=e,this.location=n}}class Nt extends Error{constructor(e,n,r){super(r),this.status=e,this.text=n}}const hn="x-sveltekit-invalidated",dn="x-sveltekit-trailing-slash";function ht(t){return t instanceof vt||t instanceof Nt?t.status:500}function pn(t){return t instanceof Nt?t.text:"Internal Error"}let A,z,It;const gn=Kt.toString().includes("$$")||/function \w+\(\) \{\}/.test(Kt.toString());var Q,tt,et,nt,rt,at,ot,st,ne,it,re,ct,ae;gn?(A={data:{},form:null,error:null,params:{},route:{id:null},state:{},status:-1,url:new URL("https://example.com")},z={current:null},It={current:!1}):(A=new(ne=class{constructor(){x(this,Q,C({}));x(this,tt,C(null));x(this,et,C(null));x(this,nt,C({}));x(this,rt,C({id:null}));x(this,at,C({}));x(this,ot,C(-1));x(this,st,C(new URL("https://example.com")))}get data(){return O(b(this,Q))}set data(e){N(b(this,Q),e)}get form(){return O(b(this,tt))}set form(e){N(b(this,tt),e)}get error(){return O(b(this,et))}set error(e){N(b(this,et),e)}get params(){return O(b(this,nt))}set params(e){N(b(this,nt),e)}get route(){return O(b(this,rt))}set route(e){N(b(this,rt),e)}get state(){return O(b(this,at))}set state(e){N(b(this,at),e)}get status(){return O(b(this,ot))}set status(e){N(b(this,ot),e)}get url(){return O(b(this,st))}set url(e){N(b(this,st),e)}},Q=new WeakMap,tt=new WeakMap,et=new WeakMap,nt=new WeakMap,rt=new WeakMap,at=new WeakMap,ot=new WeakMap,st=new WeakMap,ne),z=new(re=class{constructor(){x(this,it,C(null))}get current(){return O(b(this,it))}set current(e){N(b(this,it),e)}},it=new WeakMap,re),It=new(ae=class{constructor(){x(this,ct,C(!1))}get current(){return O(b(this,ct))}set current(e){N(b(this,ct),e)}},ct=new WeakMap,ae),de.v=()=>It.current=!0);function mn(t){Object.assign(A,t)}const yn=new Set(["icon","shortcut icon","apple-touch-icon"]),F=se(ce)??{},X=se(ie)??{},$={url:Jt({}),page:Jt({}),navigating:Pt(null),updated:Qe()};function jt(t){F[t]=Ot()}function wn(t,e){let n=t+1;for(;F[n];)delete F[n],n+=1;for(n=e+1;X[n];)delete X[n],n+=1}function q(t){return location.href=t.href,new Promise(()=>{})}async function me(){if("serviceWorker"in navigator){const t=await navigator.serviceWorker.getRegistration(P||"/");t&&await t.update()}}function Xt(){}let bt,Tt,dt,j,xt,S;const ye=[],pt=[];let L=null;const we=[],_n=[];let B=[],w={branch:[],error:null,url:null},$t=!1,gt=!1,Zt=!0,Z=!1,H=!1,_e=!1,Dt=!1,Ft,U,T,mt;const Y=new Set;async function $n(t,e,n){var a,o,i,s;document.URL!==location.href&&(location.href=location.href),S=t,await((o=(a=t.hooks).init)==null?void 0:o.call(a)),bt=ze(t),j=document.documentElement,xt=e,Tt=t.nodes[0],dt=t.nodes[1],Tt(),dt(),U=(i=history.state)==null?void 0:i[G],T=(s=history.state)==null?void 0:s[J],U||(U=T=Date.now(),history.replaceState({...history.state,[G]:U,[J]:T},""));const r=F[U];r&&(history.scrollRestoration="manual",scrollTo(r.x,r.y)),n?await In(xt,n):En(location.href,{replaceState:!0}),Rn()}function vn(){ye.length=0,Dt=!1}function ve(t){pt.some(e=>e==null?void 0:e.snapshot)&&(X[t]=pt.map(e=>{var n;return(n=e==null?void 0:e.snapshot)==null?void 0:n.capture()}))}function be(t){var e;(e=X[t])==null||e.forEach((n,r)=>{var a,o;(o=(a=pt[r])==null?void 0:a.snapshot)==null||o.restore(n)})}function Qt(){jt(U),Wt(ce,F),ve(T),Wt(ie,X)}async function Ae(t,e,n,r){return K({type:"goto",url:fe(t),keepfocus:e.keepFocus,noscroll:e.noScroll,replace_state:e.replaceState,state:e.state,redirect_count:n,nav_token:r,accept:()=>{e.invalidateAll&&(Dt=!0)}})}async function bn(t){if(t.id!==(L==null?void 0:L.id)){const e={};Y.add(e),L={id:t.id,token:e,promise:Se({...t,preload:e}).then(n=>(Y.delete(e),n.type==="loaded"&&n.state.error&&(L=null),n))}}return L.promise}async function Ut(t){const e=bt.find(n=>n.exec(Ee(t)));e&&await Promise.all([...e.layouts,e.leaf].map(n=>n==null?void 0:n[1]()))}function ke(t,e,n){var o;w=t.state;const r=document.querySelector("style[data-sveltekit]");r&&r.remove(),Object.assign(A,t.props.page),Ft=new S.root({target:e,props:{...t.props,stores:$,components:pt},hydrate:n,sync:!1}),be(T);const a={from:null,to:{params:w.params,route:{id:((o=w.route)==null?void 0:o.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};B.forEach(i=>i(a)),gt=!0}function yt({url:t,params:e,branch:n,status:r,error:a,route:o,form:i}){let s="never";if(P&&(t.pathname===P||t.pathname===P+"/"))s="always";else for(const u of n)(u==null?void 0:u.slash)!==void 0&&(s=u.slash);t.pathname=Oe(t.pathname,s),t.search=t.search;const c={type:"loaded",state:{url:t,params:e,branch:n,error:a,route:o},props:{constructors:un(n).map(u=>u.node.component),page:A}};i!==void 0&&(c.props.form=i);let f={},h=!A,d=0;for(let u=0;u<Math.max(n.length,w.branch.length);u+=1){const g=n[u],l=w.branch[u];(g==null?void 0:g.data)!==(l==null?void 0:l.data)&&(h=!0),g&&(f={...f,...g.data},h&&(c.props[`data_${d}`]=f),d+=1)}return(!w.url||t.href!==w.url.href||w.error!==a||i!==void 0&&i!==A.form||h)&&(c.props.page={error:a,params:e,route:{id:(o==null?void 0:o.id)??null},state:{},status:r,url:new URL(t),form:i??null,data:h?f:A.data}),c}async function Vt({loader:t,parent:e,url:n,params:r,route:a,server_data_node:o}){var h,d,y;let i=null,s=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},f=await t();if((h=f.universal)!=null&&h.load){let u=function(...l){for(const p of l){const{href:k}=new URL(p,n);c.dependencies.add(k)}};const g={route:new Proxy(a,{get:(l,p)=>(s&&(c.route=!0),l[p])}),params:new Proxy(r,{get:(l,p)=>(s&&c.params.add(p),l[p])}),data:(o==null?void 0:o.data)??null,url:$e(n,()=>{s&&(c.url=!0)},l=>{s&&c.search_params.add(l)},S.hash),async fetch(l,p){let k;l instanceof Request?(k=l.url,p={body:l.method==="GET"||l.method==="HEAD"?void 0:await l.blob(),cache:l.cache,credentials:l.credentials,headers:[...l.headers].length?l.headers:void 0,integrity:l.integrity,keepalive:l.keepalive,method:l.method,mode:l.mode,redirect:l.redirect,referrer:l.referrer,referrerPolicy:l.referrerPolicy,signal:l.signal,...p}):k=l;const R=new URL(k,n);return s&&u(R.href),R.origin===n.origin&&(k=R.href.slice(n.origin.length)),gt?qe(k,R.href,p):Me(k,p)},setHeaders:()=>{},depends:u,parent(){return s&&(c.parent=!0),e()},untrack(l){s=!1;try{return l()}finally{s=!0}}};i=await f.universal.load.call(null,g)??null}return{node:f,loader:t,server:o,universal:(d=f.universal)!=null&&d.load?{type:"data",data:i,uses:c}:null,data:i??(o==null?void 0:o.data)??null,slash:((y=f.universal)==null?void 0:y.trailingSlash)??(o==null?void 0:o.slash)}}function te(t,e,n,r,a,o){if(Dt)return!0;if(!a)return!1;if(a.parent&&t||a.route&&e||a.url&&n)return!0;for(const i of a.search_params)if(r.has(i))return!0;for(const i of a.params)if(o[i]!==w.params[i])return!0;for(const i of a.dependencies)if(ye.some(s=>s(new URL(i))))return!0;return!1}function Bt(t,e){return(t==null?void 0:t.type)==="data"?t:(t==null?void 0:t.type)==="skip"?e??null:null}function An(t,e){if(!t)return new Set(e.searchParams.keys());const n=new Set([...t.searchParams.keys(),...e.searchParams.keys()]);for(const r of n){const a=t.searchParams.getAll(r),o=e.searchParams.getAll(r);a.every(i=>o.includes(i))&&o.every(i=>a.includes(i))&&n.delete(r)}return n}function ee({error:t,url:e,route:n,params:r}){return{type:"loaded",state:{error:t,url:e,route:n,params:r,branch:[]},props:{page:A,constructors:[]}}}async function Se({id:t,invalidating:e,url:n,params:r,route:a,preload:o}){if((L==null?void 0:L.id)===t)return Y.delete(L.token),L.promise;const{errors:i,layouts:s,leaf:c}=a,f=[...s,c];i.forEach(m=>m==null?void 0:m().catch(()=>{})),f.forEach(m=>m==null?void 0:m[1]().catch(()=>{}));let h=null;const d=w.url?t!==wt(w.url):!1,y=w.route?a.id!==w.route.id:!1,u=An(w.url,n);let g=!1;const l=f.map((m,v)=>{var D;const E=w.branch[v],I=!!(m!=null&&m[0])&&((E==null?void 0:E.loader)!==m[1]||te(g,y,d,u,(D=E.server)==null?void 0:D.uses,r));return I&&(g=!0),I});if(l.some(Boolean)){try{h=await Ue(n,l)}catch(m){const v=await M(m,{url:n,params:r,route:{id:t}});return Y.has(o)?ee({error:v,url:n,params:r,route:a}):At({status:ht(m),error:v,url:n,route:a})}if(h.type==="redirect")return h}const p=h==null?void 0:h.nodes;let k=!1;const R=f.map(async(m,v)=>{var kt;if(!m)return;const E=w.branch[v],I=p==null?void 0:p[v];if((!I||I.type==="skip")&&m[1]===(E==null?void 0:E.loader)&&!te(k,y,d,u,(kt=E.universal)==null?void 0:kt.uses,r))return E;if(k=!0,(I==null?void 0:I.type)==="error")throw I;return Vt({loader:m[1],url:n,params:r,route:a,parent:async()=>{var qt;const Mt={};for(let St=0;St<v;St+=1)Object.assign(Mt,(qt=await R[St])==null?void 0:qt.data);return Mt},server_data_node:Bt(I===void 0&&m[0]?{type:"skip"}:I??null,m[0]?E==null?void 0:E.server:void 0)})});for(const m of R)m.catch(()=>{});const _=[];for(let m=0;m<f.length;m+=1)if(f[m])try{_.push(await R[m])}catch(v){if(v instanceof ge)return{type:"redirect",location:v.location};if(Y.has(o))return ee({error:await M(v,{params:r,url:n,route:{id:a.id}}),url:n,params:r,route:a});let E=ht(v),I;if(p!=null&&p.includes(v))E=v.status??E,I=v.error;else if(v instanceof vt)I=v.body;else{if(await $.updated.check())return await me(),await q(n);I=await M(v,{params:r,url:n,route:{id:a.id}})}const D=await kn(m,_,i);return D?yt({url:n,params:r,branch:_.slice(0,D.idx).concat(D.node),status:E,error:I,route:a}):await Ie(n,{id:a.id},I,E)}else _.push(void 0);return yt({url:n,params:r,branch:_,status:200,error:null,route:a,form:e?void 0:null})}async function kn(t,e,n){for(;t--;)if(n[t]){let r=t;for(;!e[r];)r-=1;try{return{idx:r+1,node:{node:await n[t](),loader:n[t],data:{},server:null,universal:null}}}catch{continue}}}async function At({status:t,error:e,url:n,route:r}){const a={};let o=null;if(S.server_loads[0]===0)try{const f=await Ue(n,[!0]);if(f.type!=="data"||f.nodes[0]&&f.nodes[0].type!=="data")throw 0;o=f.nodes[0]??null}catch{(n.origin!==lt||n.pathname!==location.pathname||$t)&&await q(n)}const s=await Vt({loader:Tt,url:n,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:Bt(o)}),c={node:await dt(),loader:dt,universal:null,server:null,data:null};return yt({url:n,params:a,branch:[s,c],status:t,error:e,route:null})}function Gt(t,e){if(!t||_t(t,P,S.hash))return;let n;try{if(n=S.hooks.reroute({url:new URL(t)})??t,typeof n=="string"){const a=new URL(t);S.hash?a.hash=n:a.pathname=n,n=a}}catch{return}const r=Ee(n);for(const a of bt){const o=a.exec(r);if(o)return{id:wt(t),invalidating:e,route:a,params:je(o),url:t}}}function Ee(t){return Ne(S.hash?t.hash.replace(/^#/,"").replace(/[?#].+/,""):t.pathname.slice(P.length))||"/"}function wt(t){return(S.hash?t.hash.replace(/^#/,""):t.pathname)+t.search}function Re({url:t,type:e,intent:n,delta:r}){let a=!1;const o=Te(w,n,t,e);r!==void 0&&(o.navigation.delta=r);const i={...o.navigation,cancel:()=>{a=!0,o.reject(new Error("navigation cancelled"))}};return Z||we.forEach(s=>s(i)),a?null:o}async function K({type:t,url:e,popped:n,keepfocus:r,noscroll:a,replace_state:o,state:i={},redirect_count:s=0,nav_token:c={},accept:f=Xt,block:h=Xt}){const d=Gt(e,!1),y=Re({url:e,type:t,delta:n==null?void 0:n.delta,intent:d});if(!y){h();return}const u=U,g=T;f(),Z=!0,gt&&$.navigating.set(z.current=y.navigation),mt=c;let l=d&&await Se(d);if(!l){if(_t(e,P,S.hash))return await q(e);l=await Ie(e,{id:null},await M(new Nt(404,"Not Found",`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=(d==null?void 0:d.url)||e,mt!==c)return y.reject(new Error("navigation aborted")),!1;if(l.type==="redirect")if(s>=20)l=await At({status:500,error:await M(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}});else return Ae(new URL(l.location,e).href,{},s+1,c),!1;else l.props.page.status>=400&&await $.updated.check()&&(await me(),await q(e));if(vn(),jt(u),ve(g),l.props.page.url.pathname!==e.pathname&&(e.pathname=l.props.page.url.pathname),i=n?n.state:i,!n){const _=o?0:1,m={[G]:U+=_,[J]:T+=_,[le]:i};(o?history.replaceState:history.pushState).call(history,m,"",e),o||wn(U,T)}if(L=null,l.props.page.state=i,gt){w=l.state,l.props.page&&(l.props.page.url=e);const _=(await Promise.all(_n.map(m=>m(y.navigation)))).filter(m=>typeof m=="function");if(_.length>0){let m=function(){B=B.filter(v=>!_.includes(v))};_.push(m),B.push(..._)}Ft.$set(l.props),mn(l.props.page),_e=!0}else ke(l,xt,!1);const{activeElement:p}=document;await Pe();const k=n?n.scroll:a?Ot():null;if(Zt){const _=e.hash&&document.getElementById(decodeURIComponent(S.hash?e.hash.split("#")[2]??"":e.hash.slice(1)));k?scrollTo(k.x,k.y):_?_.scrollIntoView():scrollTo(0,0)}const R=document.activeElement!==p&&document.activeElement!==document.body;!r&&!R&&Un(),Zt=!0,l.props.page&&Object.assign(A,l.props.page),Z=!1,t==="popstate"&&be(T),y.fulfil(void 0),B.forEach(_=>_(y.navigation)),$.navigating.set(z.current=null)}async function Ie(t,e,n,r){return t.origin===lt&&t.pathname===location.pathname&&!$t?await At({status:r,error:n,url:t,route:e}):await q(t)}function Sn(){let t;j.addEventListener("mousemove",o=>{const i=o.target;clearTimeout(t),t=setTimeout(()=>{r(i,2)},20)});function e(o){o.defaultPrevented||r(o.composedPath()[0],1)}j.addEventListener("mousedown",e),j.addEventListener("touchstart",e,{passive:!0});const n=new IntersectionObserver(o=>{for(const i of o)i.isIntersecting&&(Ut(new URL(i.target.href)),n.unobserve(i.target))},{threshold:0});function r(o,i){const s=he(o,j);if(!s)return;const{url:c,external:f,download:h}=Lt(s,P,S.hash);if(f||h)return;const d=ut(s),y=c&&wt(w.url)===wt(c);if(!d.reload&&!y)if(i<=d.preload_data){const u=Gt(c,!1);u&&bn(u)}else i<=d.preload_code&&Ut(c)}function a(){n.disconnect();for(const o of j.querySelectorAll("a")){const{url:i,external:s,download:c}=Lt(o,P,S.hash);if(s||c)continue;const f=ut(o);f.reload||(f.preload_code===ft.viewport&&n.observe(o),f.preload_code===ft.eager&&Ut(i))}}B.push(a),a()}function M(t,e){if(t instanceof vt)return t.body;const n=ht(t),r=pn(t);return S.hooks.handleError({error:t,event:e,status:n,message:r})??{message:r}}function En(t,e={}){return t=new URL(fe(t)),t.origin!==lt?Promise.reject(new Error("goto: invalid URL")):Ae(t,e,0)}function Rn(){var e;history.scrollRestoration="manual",addEventListener("beforeunload",n=>{let r=!1;if(Qt(),!Z){const a=Te(w,void 0,null,"leave"),o={...a.navigation,cancel:()=>{r=!0,a.reject(new Error("navigation cancelled"))}};we.forEach(i=>i(o))}r?(n.preventDefault(),n.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Qt()}),(e=navigator.connection)!=null&&e.saveData||Sn(),j.addEventListener("click",async n=>{if(n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const r=he(n.composedPath()[0],j);if(!r)return;const{url:a,external:o,target:i,download:s}=Lt(r,P,S.hash);if(!a)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const c=ut(r);if(!(r instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||s)return;const[h,d]=(S.hash?a.hash.replace(/^#/,""):a.href).split("#"),y=h===Et(location);if(o||c.reload&&(!y||!d)){Re({url:a,type:"link"})?Z=!0:n.preventDefault();return}if(d!==void 0&&y){const[,u]=w.url.href.split("#");if(u===d){if(n.preventDefault(),d===""||d==="top"&&r.ownerDocument.getElementById("top")===null)window.scrollTo({top:0});else{const g=r.ownerDocument.getElementById(decodeURIComponent(d));g&&(g.scrollIntoView(),g.focus())}return}if(H=!0,jt(U),t(a),!c.replace_state)return;H=!1}n.preventDefault(),await new Promise(u=>{requestAnimationFrame(()=>{setTimeout(u,0)}),setTimeout(u,100)}),K({type:"link",url:a,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??a.href===location.href})}),j.addEventListener("submit",n=>{if(n.defaultPrevented)return;const r=HTMLFormElement.prototype.cloneNode.call(n.target),a=n.submitter;if(((a==null?void 0:a.formTarget)||r.target)==="_blank"||((a==null?void 0:a.formMethod)||r.method)!=="get")return;const s=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||r.action);if(_t(s,P,!1))return;const c=n.target,f=ut(c);if(f.reload)return;n.preventDefault(),n.stopPropagation();const h=new FormData(c),d=a==null?void 0:a.getAttribute("name");d&&h.append(d,(a==null?void 0:a.getAttribute("value"))??""),s.search=new URLSearchParams(h).toString(),K({type:"form",url:s,keepfocus:f.keepfocus,noscroll:f.noscroll,replace_state:f.replace_state??s.href===location.href})}),addEventListener("popstate",async n=>{var r;if((r=n.state)!=null&&r[G]){const a=n.state[G];if(mt={},a===U)return;const o=F[a],i=n.state[le]??{},s=new URL(n.state[Ze]??location.href),c=n.state[J],f=Et(location)===Et(w.url);if(c===T&&(_e||f)){t(s),F[U]=Ot(),o&&scrollTo(o.x,o.y),i!==A.state&&(A.state=i,Ft.$set({page:A})),U=a;return}const d=a-U;await K({type:"popstate",url:s,popped:{state:i,scroll:o,delta:d},accept:()=>{U=a,T=c},block:()=>{history.go(-d)},nav_token:mt})}else if(!H){const a=new URL(location.href);t(a)}}),addEventListener("hashchange",()=>{H?(H=!1,history.replaceState({...history.state,[G]:++U,[J]:T},"",location.href)):S.hash&&w.url.hash===location.hash&&K({type:"goto",url:w.url})});for(const n of document.querySelectorAll("link"))yn.has(n.rel)&&(n.href=n.href);addEventListener("pageshow",n=>{n.persisted&&$.navigating.set(z.current=null)});function t(n){w.url=A.url=n,$.page.set({data:A.data,error:A.error,form:A.form,params:A.params,route:A.route,state:A.state,status:A.status,url:n}),$.page.notify()}}async function In(t,{status:e=200,error:n,node_ids:r,params:a,route:o,data:i,form:s}){$t=!0;const c=new URL(location.href);({params:a={},route:o={id:null}}=Gt(c,!1)||{});let f,h=!0;try{const d=r.map(async(g,l)=>{const p=i[l];return p!=null&&p.uses&&(p.uses=Le(p.uses)),Vt({loader:S.nodes[g],url:c,params:a,route:o,parent:async()=>{const k={};for(let R=0;R<l;R+=1)Object.assign(k,(await d[R]).data);return k},server_data_node:Bt(p)})}),y=await Promise.all(d),u=bt.find(({id:g})=>g===o.id);if(u){const g=u.layouts;for(let l=0;l<g.length;l++)g[l]||y.splice(l,0,void 0)}f=yt({url:c,params:a,branch:y,status:e,error:n,form:s,route:u??null})}catch(d){if(d instanceof ge){await q(new URL(d.location,location.href));return}f=await At({status:ht(d),error:await M(d,{url:c,params:a,route:o}),url:c,route:o}),t.textContent="",h=!1}f.props.page&&(f.props.page.state={}),ke(f,t,h)}async function Ue(t,e){var a;const n=new URL(t);n.pathname=Ve(t.pathname),t.pathname.endsWith("/")&&n.searchParams.append(dn,"1"),n.searchParams.append(hn,e.map(o=>o?"1":"0").join(""));const r=await oe(n.href);if(!r.ok){let o;throw(a=r.headers.get("content-type"))!=null&&a.includes("application/json")?o=await r.json():r.status===404?o="Not Found":r.status===500&&(o="Internal Error"),new vt(r.status,o)}return new Promise(async o=>{var d;const i=new Map,s=r.body.getReader(),c=new TextDecoder;function f(y){return ln(y,{...S.decoders,Promise:u=>new Promise((g,l)=>{i.set(u,{fulfil:g,reject:l})})})}let h="";for(;;){const{done:y,value:u}=await s.read();if(y&&!h)break;for(h+=!u&&h?`
`:c.decode(u,{stream:!0});;){const g=h.indexOf(`
`);if(g===-1)break;const l=JSON.parse(h.slice(0,g));if(h=h.slice(g+1),l.type==="redirect")return o(l);if(l.type==="data")(d=l.nodes)==null||d.forEach(p=>{(p==null?void 0:p.type)==="data"&&(p.uses=Le(p.uses),p.data=f(p.data))}),o(l);else if(l.type==="chunk"){const{id:p,data:k,error:R}=l,_=i.get(p);i.delete(p),R?_.reject(f(R)):_.fulfil(f(k))}}}})}function Le(t){return{dependencies:new Set((t==null?void 0:t.dependencies)??[]),params:new Set((t==null?void 0:t.params)??[]),parent:!!(t!=null&&t.parent),route:!!(t!=null&&t.route),url:!!(t!=null&&t.url),search_params:new Set((t==null?void 0:t.search_params)??[])}}function Un(){const t=document.querySelector("[autofocus]");if(t)t.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0,focusVisible:!1}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex");const r=getSelection();if(r&&r.type!=="None"){const a=[];for(let o=0;o<r.rangeCount;o+=1)a.push(r.getRangeAt(o));setTimeout(()=>{if(r.rangeCount===a.length){for(let o=0;o<r.rangeCount;o+=1){const i=a[o],s=r.getRangeAt(o);if(i.commonAncestorContainer!==s.commonAncestorContainer||i.startContainer!==s.startContainer||i.endContainer!==s.endContainer||i.startOffset!==s.startOffset||i.endOffset!==s.endOffset)return}r.removeAllRanges()}})}}}function Te(t,e,n,r){var c,f;let a,o;const i=new Promise((h,d)=>{a=h,o=d});return i.catch(()=>{}),{navigation:{from:{params:t.params,route:{id:((c=t.route)==null?void 0:c.id)??null},url:t.url},to:n&&{params:(e==null?void 0:e.params)??null,route:{id:((f=e==null?void 0:e.route)==null?void 0:f.id)??null},url:n},willUnload:!e,type:r,complete:i},fulfil:a,reject:o}}export{$n as a,En as g,A as p,$ as s,It as u};
