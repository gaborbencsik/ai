(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();/**
* @vue/shared v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Lc(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const lt={},La=[],es=()=>{},Bf=()=>!1,br=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),wr=e=>e.startsWith("onUpdate:"),Et=Object.assign,Oc=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Ly=Object.prototype.hasOwnProperty,nt=(e,t)=>Ly.call(e,t),Le=Array.isArray,Oa=e=>no(e)==="[object Map]",Df=e=>no(e)==="[object Set]",Ju=e=>no(e)==="[object Date]",Me=e=>typeof e=="function",pt=e=>typeof e=="string",Cn=e=>typeof e=="symbol",et=e=>e!==null&&typeof e=="object",Rf=e=>(et(e)||Me(e))&&Me(e.then)&&Me(e.catch),Mf=Object.prototype.toString,no=e=>Mf.call(e),Oy=e=>no(e).slice(8,-1),$f=e=>no(e)==="[object Object]",kr=e=>pt(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Si=Lc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Sr=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},Ny=/-\w/g,Gt=Sr(e=>e.replace(Ny,t=>t.slice(1).toUpperCase())),Py=/\B([A-Z])/g,pa=Sr(e=>e.replace(Py,"-$1").toLowerCase()),ws=Sr(e=>e.charAt(0).toUpperCase()+e.slice(1)),ul=Sr(e=>e?`on${ws(e)}`:""),Qn=(e,t)=>!Object.is(e,t),dl=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},jf=(e,t,n,s=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:s,value:n})},By=e=>{const t=parseFloat(e);return isNaN(t)?e:t},Dy=e=>{const t=pt(e)?Number(e):NaN;return isNaN(t)?e:t};let Qu;const xr=()=>Qu||(Qu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Be(e){if(Le(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],a=pt(s)?jy(s):Be(s);if(a)for(const i in a)t[i]=a[i]}return t}else if(pt(e)||et(e))return e}const Ry=/;(?![^(]*\))/g,My=/:([^]+)/,$y=/\/\*[^]*?\*\//g;function jy(e){const t={};return e.replace($y,"").split(Ry).forEach(n=>{if(n){const s=n.split(My);s.length>1&&(t[s[0].trim()]=s[1].trim())}}),t}function fe(e){let t="";if(pt(e))t=e;else if(Le(e))for(let n=0;n<e.length;n++){const s=fe(e[n]);s&&(t+=s+" ")}else if(et(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const Vy="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Fy=Lc(Vy);function Vf(e){return!!e||e===""}function Wy(e,t){if(e.length!==t.length)return!1;let n=!0;for(let s=0;n&&s<e.length;s++)n=Nc(e[s],t[s]);return n}function Nc(e,t){if(e===t)return!0;let n=Ju(e),s=Ju(t);if(n||s)return n&&s?e.getTime()===t.getTime():!1;if(n=Cn(e),s=Cn(t),n||s)return e===t;if(n=Le(e),s=Le(t),n||s)return n&&s?Wy(e,t):!1;if(n=et(e),s=et(t),n||s){if(!n||!s)return!1;const a=Object.keys(e).length,i=Object.keys(t).length;if(a!==i)return!1;for(const o in e){const r=e.hasOwnProperty(o),l=t.hasOwnProperty(o);if(r&&!l||!r&&l||!Nc(e[o],t[o]))return!1}}return String(e)===String(t)}const Ff=e=>!!(e&&e.__v_isRef===!0),V=e=>pt(e)?e:e==null?"":Le(e)||et(e)&&(e.toString===Mf||!Me(e.toString))?Ff(e)?V(e.value):JSON.stringify(e,Wf,2):String(e),Wf=(e,t)=>Ff(t)?Wf(e,t.value):Oa(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[s,a],i)=>(n[hl(s,i)+" =>"]=a,n),{})}:Df(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>hl(n))}:Cn(t)?hl(t):et(t)&&!Le(t)&&!$f(t)?String(t):t,hl=(e,t="")=>{var n;return Cn(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Bt;class Hf{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!t&&Bt&&(Bt.active?(this.parent=Bt,this.index=(Bt.scopes||(Bt.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Bt;try{return Bt=this,t()}finally{Bt=n}}}on(){++this._on===1&&(this.prevScope=Bt,Bt=this)}off(){if(this._on>0&&--this._on===0){if(Bt===this)Bt=this.prevScope;else{let t=Bt;for(;t;){if(t.prevScope===this){t.prevScope=this.prevScope;break}t=t.prevScope}}this.prevScope=void 0}}stop(t){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const a=this.parent.scopes.pop();a&&a!==this&&(this.parent.scopes[this.index]=a,a.index=this.index)}this.parent=void 0}}}function Di(e){return new Hf(e)}function qf(){return Bt}function sn(e,t=!1){Bt&&Bt.cleanups.push(e)}let dt;const fl=new WeakSet;class zf{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Bt&&(Bt.active?Bt.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,fl.has(this)&&(fl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Gf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Zu(this),Kf(this);const t=dt,n=Pn;dt=this,Pn=!0;try{return this.fn()}finally{Yf(this),dt=t,Pn=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Dc(t);this.deps=this.depsTail=void 0,Zu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?fl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){ql(this)&&this.run()}get dirty(){return ql(this)}}let Uf=0,xi,_i;function Gf(e,t=!1){if(e.flags|=8,t){e.next=_i,_i=e;return}e.next=xi,xi=e}function Pc(){Uf++}function Bc(){if(--Uf>0)return;if(_i){let t=_i;for(_i=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;xi;){let t=xi;for(xi=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(s){e||(e=s)}t=n}}if(e)throw e}function Kf(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Yf(e){let t,n=e.depsTail,s=n;for(;s;){const a=s.prevDep;s.version===-1?(s===n&&(n=a),Dc(s),Hy(s)):t=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=a}e.deps=t,e.depsTail=n}function ql(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Xf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Xf(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Ri)||(e.globalVersion=Ri,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!ql(e))))return;e.flags|=2;const t=e.dep,n=dt,s=Pn;dt=e,Pn=!0;try{Kf(e);const a=e.fn(e._value);(t.version===0||Qn(a,e._value))&&(e.flags|=128,e._value=a,t.version++)}catch(a){throw t.version++,a}finally{dt=n,Pn=s,Yf(e),e.flags&=-3}}function Dc(e,t=!1){const{dep:n,prevSub:s,nextSub:a}=e;if(s&&(s.nextSub=a,e.prevSub=void 0),a&&(a.prevSub=s,e.nextSub=void 0),n.subs===e&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Dc(i,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function Hy(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Pn=!0;const Jf=[];function ms(){Jf.push(Pn),Pn=!1}function gs(){const e=Jf.pop();Pn=e===void 0?!0:e}function Zu(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=dt;dt=void 0;try{t()}finally{dt=n}}}let Ri=0;class qy{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Rc{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!dt||!Pn||dt===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==dt)n=this.activeLink=new qy(dt,this),dt.deps?(n.prevDep=dt.depsTail,dt.depsTail.nextDep=n,dt.depsTail=n):dt.deps=dt.depsTail=n,Qf(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=dt.depsTail,n.nextDep=void 0,dt.depsTail.nextDep=n,dt.depsTail=n,dt.deps===n&&(dt.deps=s)}return n}trigger(t){this.version++,Ri++,this.notify(t)}notify(t){Pc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Bc()}}}function Qf(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let s=t.deps;s;s=s.nextDep)Qf(s)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const zo=new WeakMap,aa=Symbol(""),zl=Symbol(""),Mi=Symbol("");function Ht(e,t,n){if(Pn&&dt){let s=zo.get(e);s||zo.set(e,s=new Map);let a=s.get(n);a||(s.set(n,a=new Rc),a.map=s,a.key=n),a.track()}}function ds(e,t,n,s,a,i){const o=zo.get(e);if(!o){Ri++;return}const r=l=>{l&&l.trigger()};if(Pc(),t==="clear")o.forEach(r);else{const l=Le(e),u=l&&kr(n);if(l&&n==="length"){const d=Number(s);o.forEach((h,f)=>{(f==="length"||f===Mi||!Cn(f)&&f>=d)&&r(h)})}else switch((n!==void 0||o.has(void 0))&&r(o.get(n)),u&&r(o.get(Mi)),t){case"add":l?u&&r(o.get("length")):(r(o.get(aa)),Oa(e)&&r(o.get(zl)));break;case"delete":l||(r(o.get(aa)),Oa(e)&&r(o.get(zl)));break;case"set":Oa(e)&&r(o.get(aa));break}}Bc()}function zy(e,t){const n=zo.get(e);return n&&n.get(t)}function ya(e){const t=Te(e);return t===e?t:(Ht(t,"iterate",Mi),hn(e)?t:t.map(Bn))}function _r(e){return Ht(e=Te(e),"iterate",Mi),e}function Xn(e,t){return vs(e)?Ma(ia(e)?Bn(t):t):Bn(t)}const Uy={__proto__:null,[Symbol.iterator](){return pl(this,Symbol.iterator,e=>Xn(this,e))},concat(...e){return ya(this).concat(...e.map(t=>Le(t)?ya(t):t))},entries(){return pl(this,"entries",e=>(e[1]=Xn(this,e[1]),e))},every(e,t){return os(this,"every",e,t,void 0,arguments)},filter(e,t){return os(this,"filter",e,t,n=>n.map(s=>Xn(this,s)),arguments)},find(e,t){return os(this,"find",e,t,n=>Xn(this,n),arguments)},findIndex(e,t){return os(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return os(this,"findLast",e,t,n=>Xn(this,n),arguments)},findLastIndex(e,t){return os(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return os(this,"forEach",e,t,void 0,arguments)},includes(...e){return ml(this,"includes",e)},indexOf(...e){return ml(this,"indexOf",e)},join(e){return ya(this).join(e)},lastIndexOf(...e){return ml(this,"lastIndexOf",e)},map(e,t){return os(this,"map",e,t,void 0,arguments)},pop(){return ci(this,"pop")},push(...e){return ci(this,"push",e)},reduce(e,...t){return ed(this,"reduce",e,t)},reduceRight(e,...t){return ed(this,"reduceRight",e,t)},shift(){return ci(this,"shift")},some(e,t){return os(this,"some",e,t,void 0,arguments)},splice(...e){return ci(this,"splice",e)},toReversed(){return ya(this).toReversed()},toSorted(e){return ya(this).toSorted(e)},toSpliced(...e){return ya(this).toSpliced(...e)},unshift(...e){return ci(this,"unshift",e)},values(){return pl(this,"values",e=>Xn(this,e))}};function pl(e,t,n){const s=_r(e),a=s[t]();return s!==e&&!hn(e)&&(a._next=a.next,a.next=()=>{const i=a._next();return i.done||(i.value=n(i.value)),i}),a}const Gy=Array.prototype;function os(e,t,n,s,a,i){const o=_r(e),r=o!==e&&!hn(e),l=o[t];if(l!==Gy[t]){const h=l.apply(e,i);return r?Bn(h):h}let u=n;o!==e&&(r?u=function(h,f){return n.call(this,Xn(e,h),f,e)}:n.length>2&&(u=function(h,f){return n.call(this,h,f,e)}));const d=l.call(o,u,s);return r&&a?a(d):d}function ed(e,t,n,s){const a=_r(e),i=a!==e&&!hn(e);let o=n,r=!1;a!==e&&(i?(r=s.length===0,o=function(u,d,h){return r&&(r=!1,u=Xn(e,u)),n.call(this,u,Xn(e,d),h,e)}):n.length>3&&(o=function(u,d,h){return n.call(this,u,d,h,e)}));const l=a[t](o,...s);return r?Xn(e,l):l}function ml(e,t,n){const s=Te(e);Ht(s,"iterate",Mi);const a=s[t](...n);return(a===-1||a===!1)&&Ar(n[0])?(n[0]=Te(n[0]),s[t](...n)):a}function ci(e,t,n=[]){ms(),Pc();const s=Te(e)[t].apply(e,n);return Bc(),gs(),s}const Ky=Lc("__proto__,__v_isRef,__isVue"),Zf=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(Cn));function Yy(e){Cn(e)||(e=String(e));const t=Te(this);return Ht(t,"has",e),t.hasOwnProperty(e)}class ep{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,s){if(n==="__v_skip")return t.__v_skip;const a=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!a;if(n==="__v_isReadonly")return a;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(a?i?ib:ap:i?sp:np).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(s)?t:void 0;const o=Le(t);if(!a){let l;if(o&&(l=Uy[n]))return l;if(n==="hasOwnProperty")return Yy}const r=Reflect.get(t,n,wt(t)?t:s);if((Cn(n)?Zf.has(n):Ky(n))||(a||Ht(t,"get",n),i))return r;if(wt(r)){const l=o&&kr(n)?r:r.value;return a&&et(l)?Ra(l):l}return et(r)?a?Ra(r):jt(r):r}}class tp extends ep{constructor(t=!1){super(!1,t)}set(t,n,s,a){let i=t[n];const o=Le(t)&&kr(n);if(!this._isShallow){const u=vs(i);if(!hn(s)&&!vs(s)&&(i=Te(i),s=Te(s)),!o&&wt(i)&&!wt(s))return u||(i.value=s),!0}const r=o?Number(n)<t.length:nt(t,n),l=Reflect.set(t,n,s,wt(t)?t:a);return t===Te(a)&&(r?Qn(s,i)&&ds(t,"set",n,s):ds(t,"add",n,s)),l}deleteProperty(t,n){const s=nt(t,n);t[n];const a=Reflect.deleteProperty(t,n);return a&&s&&ds(t,"delete",n,void 0),a}has(t,n){const s=Reflect.has(t,n);return(!Cn(n)||!Zf.has(n))&&Ht(t,"has",n),s}ownKeys(t){return Ht(t,"iterate",Le(t)?"length":aa),Reflect.ownKeys(t)}}class Xy extends ep{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const Jy=new tp,Qy=new Xy,Zy=new tp(!0);const Ul=e=>e,_o=e=>Reflect.getPrototypeOf(e);function eb(e,t,n){return function(...s){const a=this.__v_raw,i=Te(a),o=Oa(i),r=e==="entries"||e===Symbol.iterator&&o,l=e==="keys"&&o,u=a[e](...s),d=n?Ul:t?Ma:Bn;return!t&&Ht(i,"iterate",l?zl:aa),Et(Object.create(u),{next(){const{value:h,done:f}=u.next();return f?{value:h,done:f}:{value:r?[d(h[0]),d(h[1])]:d(h),done:f}}})}}function Ao(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function tb(e,t){const n={get(a){const i=this.__v_raw,o=Te(i),r=Te(a);e||(Qn(a,r)&&Ht(o,"get",a),Ht(o,"get",r));const{has:l}=_o(o),u=t?Ul:e?Ma:Bn;if(l.call(o,a))return u(i.get(a));if(l.call(o,r))return u(i.get(r));i!==o&&i.get(a)},get size(){const a=this.__v_raw;return!e&&Ht(Te(a),"iterate",aa),a.size},has(a){const i=this.__v_raw,o=Te(i),r=Te(a);return e||(Qn(a,r)&&Ht(o,"has",a),Ht(o,"has",r)),a===r?i.has(a):i.has(a)||i.has(r)},forEach(a,i){const o=this,r=o.__v_raw,l=Te(r),u=t?Ul:e?Ma:Bn;return!e&&Ht(l,"iterate",aa),r.forEach((d,h)=>a.call(i,u(d),u(h),o))}};return Et(n,e?{add:Ao("add"),set:Ao("set"),delete:Ao("delete"),clear:Ao("clear")}:{add(a){const i=Te(this),o=_o(i),r=Te(a),l=!t&&!hn(a)&&!vs(a)?r:a;return o.has.call(i,l)||Qn(a,l)&&o.has.call(i,a)||Qn(r,l)&&o.has.call(i,r)||(i.add(l),ds(i,"add",l,l)),this},set(a,i){!t&&!hn(i)&&!vs(i)&&(i=Te(i));const o=Te(this),{has:r,get:l}=_o(o);let u=r.call(o,a);u||(a=Te(a),u=r.call(o,a));const d=l.call(o,a);return o.set(a,i),u?Qn(i,d)&&ds(o,"set",a,i):ds(o,"add",a,i),this},delete(a){const i=Te(this),{has:o,get:r}=_o(i);let l=o.call(i,a);l||(a=Te(a),l=o.call(i,a)),r&&r.call(i,a);const u=i.delete(a);return l&&ds(i,"delete",a,void 0),u},clear(){const a=Te(this),i=a.size!==0,o=a.clear();return i&&ds(a,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(a=>{n[a]=eb(a,e,t)}),n}function Mc(e,t){const n=tb(e,t);return(s,a,i)=>a==="__v_isReactive"?!e:a==="__v_isReadonly"?e:a==="__v_raw"?s:Reflect.get(nt(n,a)&&a in s?n:s,a,i)}const nb={get:Mc(!1,!1)},sb={get:Mc(!1,!0)},ab={get:Mc(!0,!1)};const np=new WeakMap,sp=new WeakMap,ap=new WeakMap,ib=new WeakMap;function ob(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function rb(e){return e.__v_skip||!Object.isExtensible(e)?0:ob(Oy(e))}function jt(e){return vs(e)?e:$c(e,!1,Jy,nb,np)}function ip(e){return $c(e,!1,Zy,sb,sp)}function Ra(e){return $c(e,!0,Qy,ab,ap)}function $c(e,t,n,s,a){if(!et(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const i=rb(e);if(i===0)return e;const o=a.get(e);if(o)return o;const r=new Proxy(e,i===2?s:n);return a.set(e,r),r}function ia(e){return vs(e)?ia(e.__v_raw):!!(e&&e.__v_isReactive)}function vs(e){return!!(e&&e.__v_isReadonly)}function hn(e){return!!(e&&e.__v_isShallow)}function Ar(e){return e?!!e.__v_raw:!1}function Te(e){const t=e&&e.__v_raw;return t?Te(t):e}function lb(e){return!nt(e,"__v_skip")&&Object.isExtensible(e)&&jf(e,"__v_skip",!0),e}const Bn=e=>et(e)?jt(e):e,Ma=e=>et(e)?Ra(e):e;function wt(e){return e?e.__v_isRef===!0:!1}function Pe(e){return op(e,!1)}function be(e){return op(e,!0)}function op(e,t){return wt(e)?e:new cb(e,t)}class cb{constructor(t,n){this.dep=new Rc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Te(t),this._value=n?t:Bn(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,s=this.__v_isShallow||hn(t)||vs(t);t=s?t:Te(t),Qn(t,n)&&(this._rawValue=t,this._value=s?t:Bn(t),this.dep.trigger())}}function zt(e){return wt(e)?e.value:e}function Vt(e){return Me(e)?e():zt(e)}const ub={get:(e,t,n)=>t==="__v_raw"?e:zt(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const a=e[t];return wt(a)&&!wt(n)?(a.value=n,!0):Reflect.set(e,t,n,s)}};function rp(e){return ia(e)?e:new Proxy(e,ub)}function lp(e){const t=Le(e)?new Array(e.length):{};for(const n in e)t[n]=cp(e,n);return t}class db{constructor(t,n,s){this._object=t,this._defaultValue=s,this.__v_isRef=!0,this._value=void 0,this._key=Cn(n)?n:String(n),this._raw=Te(t);let a=!0,i=t;if(!Le(t)||Cn(this._key)||!kr(this._key))do a=!Ar(i)||hn(i);while(a&&(i=i.__v_raw));this._shallow=a}get value(){let t=this._object[this._key];return this._shallow&&(t=zt(t)),this._value=t===void 0?this._defaultValue:t}set value(t){if(this._shallow&&wt(this._raw[this._key])){const n=this._object[this._key];if(wt(n)){n.value=t;return}}this._object[this._key]=t}get dep(){return zy(this._raw,this._key)}}class hb{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function j(e,t,n){return wt(e)?e:Me(e)?new hb(e):et(e)&&arguments.length>1?cp(e,t,n):Pe(e)}function cp(e,t,n){return new db(e,t,n)}class fb{constructor(t,n,s){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Rc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ri-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&dt!==this)return Gf(this,!0),!0}get value(){const t=this.dep.track();return Xf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function pb(e,t,n=!1){let s,a;return Me(e)?s=e:(s=e.get,a=e.set),new fb(s,a,n)}const Co={},Uo=new WeakMap;let Xs;function mb(e,t=!1,n=Xs){if(n){let s=Uo.get(n);s||Uo.set(n,s=[]),s.push(e)}}function gb(e,t,n=lt){const{immediate:s,deep:a,once:i,scheduler:o,augmentJob:r,call:l}=n,u=T=>a?T:hn(T)||a===!1||a===0?hs(T,1):hs(T);let d,h,f,p,g=!1,m=!1;if(wt(e)?(h=()=>e.value,g=hn(e)):ia(e)?(h=()=>u(e),g=!0):Le(e)?(m=!0,g=e.some(T=>ia(T)||hn(T)),h=()=>e.map(T=>{if(wt(T))return T.value;if(ia(T))return u(T);if(Me(T))return l?l(T,2):T()})):Me(e)?t?h=l?()=>l(e,2):e:h=()=>{if(f){ms();try{f()}finally{gs()}}const T=Xs;Xs=d;try{return l?l(e,3,[p]):e(p)}finally{Xs=T}}:h=es,t&&a){const T=h,C=a===!0?1/0:a;h=()=>hs(T(),C)}const v=qf(),y=()=>{d.stop(),v&&v.active&&Oc(v.effects,d)};if(i&&t){const T=t;t=(...C)=>{T(...C),y()}}let w=m?new Array(e.length).fill(Co):Co;const x=T=>{if(!(!(d.flags&1)||!d.dirty&&!T))if(t){const C=d.run();if(a||g||(m?C.some((_,I)=>Qn(_,w[I])):Qn(C,w))){f&&f();const _=Xs;Xs=d;try{const I=[C,w===Co?void 0:m&&w[0]===Co?[]:w,p];w=C,l?l(t,3,I):t(...I)}finally{Xs=_}}}else d.run()};return r&&r(x),d=new zf(h),d.scheduler=o?()=>o(x,!1):x,p=T=>mb(T,!1,d),f=d.onStop=()=>{const T=Uo.get(d);if(T){if(l)l(T,4);else for(const C of T)C();Uo.delete(d)}},t?s?x(!0):w=d.run():o?o(x.bind(null,!0),!0):d.run(),y.pause=d.pause.bind(d),y.resume=d.resume.bind(d),y.stop=y,y}function hs(e,t=1/0,n){if(t<=0||!et(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,wt(e))hs(e.value,t,n);else if(Le(e))for(let s=0;s<e.length;s++)hs(e[s],t,n);else if(Df(e)||Oa(e))e.forEach(s=>{hs(s,t,n)});else if($f(e)){for(const s in e)hs(e[s],t,n);for(const s of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,s)&&hs(e[s],t,n)}return e}/**
* @vue/runtime-core v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function so(e,t,n,s){try{return s?e(...s):e()}catch(a){Cr(a,t,n)}}function Dn(e,t,n,s){if(Me(e)){const a=so(e,t,n,s);return a&&Rf(a)&&a.catch(i=>{Cr(i,t,n)}),a}if(Le(e)){const a=[];for(let i=0;i<e.length;i++)a.push(Dn(e[i],t,n,s));return a}}function Cr(e,t,n,s=!0){const a=t?t.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||lt;if(t){let r=t.parent;const l=t.proxy,u=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){const d=r.ec;if(d){for(let h=0;h<d.length;h++)if(d[h](e,l,u)===!1)return}r=r.parent}if(i){ms(),so(i,null,10,[e,l,u]),gs();return}}vb(e,n,a,s,o)}function vb(e,t,n,s=!0,a=!1){if(a)throw e;console.error(e)}const en=[];let Kn=-1;const Na=[];let Ls=null,_a=0;const up=Promise.resolve();let Go=null;function It(e){const t=Go||up;return e?t.then(this?e.bind(this):e):t}function yb(e){let t=Kn+1,n=en.length;for(;t<n;){const s=t+n>>>1,a=en[s],i=$i(a);i<e||i===e&&a.flags&2?t=s+1:n=s}return t}function jc(e){if(!(e.flags&1)){const t=$i(e),n=en[en.length-1];!n||!(e.flags&2)&&t>=$i(n)?en.push(e):en.splice(yb(t),0,e),e.flags|=1,dp()}}function dp(){Go||(Go=up.then(fp))}function bb(e){Le(e)?Na.push(...e):Ls&&e.id===-1?Ls.splice(_a+1,0,e):e.flags&1||(Na.push(e),e.flags|=1),dp()}function td(e,t,n=Kn+1){for(;n<en.length;n++){const s=en[n];if(s&&s.flags&2){if(e&&s.id!==e.uid)continue;en.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function hp(e){if(Na.length){const t=[...new Set(Na)].sort((n,s)=>$i(n)-$i(s));if(Na.length=0,Ls){Ls.push(...t);return}for(Ls=t,_a=0;_a<Ls.length;_a++){const n=Ls[_a];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Ls=null,_a=0}}const $i=e=>e.id==null?e.flags&2?-1:1/0:e.id;function fp(e){try{for(Kn=0;Kn<en.length;Kn++){const t=en[Kn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),so(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Kn<en.length;Kn++){const t=en[Kn];t&&(t.flags&=-2)}Kn=-1,en.length=0,hp(),Go=null,(en.length||Na.length)&&fp()}}let cn=null,pp=null;function Ko(e){const t=cn;return cn=e,pp=e&&e.type.__scopeId||null,t}function D(e,t=cn,n){if(!t||e._n)return e;const s=(...a)=>{s._d&&Jo(-1);const i=Ko(t);let o;try{o=e(...a)}finally{Ko(i),s._d&&Jo(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function pn(e,t){if(cn===null)return e;const n=Or(cn),s=e.dirs||(e.dirs=[]);for(let a=0;a<t.length;a++){let[i,o,r,l=lt]=t[a];i&&(Me(i)&&(i={mounted:i,updated:i}),i.deep&&hs(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:r,modifiers:l}))}return e}function zs(e,t,n,s){const a=e.dirs,i=t&&t.dirs;for(let o=0;o<a.length;o++){const r=a[o];i&&(r.oldValue=i[o].value);let l=r.dir[s];l&&(ms(),Dn(l,n,8,[e.el,r,e,t]),gs())}}function Dt(e,t){if(qt){let n=qt.provides;const s=qt.parent&&qt.parent.provides;s===n&&(n=qt.provides=Object.create(s)),n[e]=t}}function Xe(e,t,n=!1){const s=io();if(s||Pa){let a=Pa?Pa._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(a&&e in a)return a[e];if(arguments.length>1)return n&&Me(t)?t.call(s&&s.proxy):t}}const wb=Symbol.for("v-scx"),kb=()=>Xe(wb);function mn(e,t){return Vc(e,null,t)}function Oe(e,t,n){return Vc(e,t,n)}function Vc(e,t,n=lt){const{immediate:s,deep:a,flush:i,once:o}=n,r=Et({},n),l=t&&s||!t&&i!=="post";let u;if(Fi){if(i==="sync"){const p=kb();u=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=es,p.resume=es,p.pause=es,p}}const d=qt;r.call=(p,g,m)=>Dn(p,d,g,m);let h=!1;i==="post"?r.scheduler=p=>{Jt(p,d&&d.suspense)}:i!=="sync"&&(h=!0,r.scheduler=(p,g)=>{g?p():jc(p)}),r.augmentJob=p=>{t&&(p.flags|=4),h&&(p.flags|=2,d&&(p.id=d.uid,p.i=d))};const f=gb(e,t,r);return Fi&&(u?u.push(f):l&&f()),f}function Sb(e,t,n){const s=this.proxy,a=pt(e)?e.includes(".")?mp(s,e):()=>s[e]:e.bind(s,s);let i;Me(t)?i=t:(i=t.handler,n=t);const o=oo(this),r=Vc(a,i.bind(s),n);return o(),r}function mp(e,t){const n=t.split(".");return()=>{let s=e;for(let a=0;a<n.length&&s;a++)s=s[n[a]];return s}}const Is=new WeakMap,gp=Symbol("_vte"),vp=e=>e.__isTeleport,Qs=e=>e&&(e.disabled||e.disabled===""),xb=e=>e&&(e.defer||e.defer===""),nd=e=>typeof SVGElement<"u"&&e instanceof SVGElement,sd=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Gl=(e,t)=>{const n=e&&e.to;return pt(n)?t?t(n):null:n},_b={name:"Teleport",__isTeleport:!0,process(e,t,n,s,a,i,o,r,l,u){const{mc:d,pc:h,pbc:f,o:{insert:p,querySelector:g,createText:m,createComment:v,parentNode:y}}=u,w=Qs(t.props);let{dynamicChildren:x}=t;const T=(I,k,O)=>{I.shapeFlag&16&&d(I.children,k,O,a,i,o,r,l)},C=(I=t)=>{const k=Qs(I.props),O=I.target=Gl(I.props,g),$=Kl(O,I,m,p);O&&(o!=="svg"&&nd(O)?o="svg":o!=="mathml"&&sd(O)&&(o="mathml"),a&&a.isCE&&(a.ce._teleportTargets||(a.ce._teleportTargets=new Set)).add(O),k||(T(I,O,$),vi(I,!1)))},_=I=>{const k=()=>{if(Is.get(I)===k){if(Is.delete(I),Qs(I.props)){const O=y(I.el)||n;T(I,O,I.anchor),vi(I,!0)}C(I)}};Is.set(I,k),Jt(k,i)};if(e==null){const I=t.el=m(""),k=t.anchor=m("");if(p(I,n,s),p(k,n,s),xb(t.props)||i&&i.pendingBranch){_(t);return}w&&(T(t,n,k),vi(t,!0)),C()}else{t.el=e.el;const I=t.anchor=e.anchor,k=Is.get(e);if(k){k.flags|=8,Is.delete(e),_(t);return}t.targetStart=e.targetStart;const O=t.target=e.target,$=t.targetAnchor=e.targetAnchor,q=Qs(e.props),R=q?n:O,z=q?I:$;if(o==="svg"||nd(O)?o="svg":(o==="mathml"||sd(O))&&(o="mathml"),x?(f(e.dynamicChildren,x,R,a,i,o,r),Uc(e,t,!0)):l||h(e,t,R,z,a,i,o,r,!1),w)q?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):To(t,n,I,u,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const se=t.target=Gl(t.props,g);se&&To(t,se,null,u,0)}else q&&To(t,O,$,u,1);vi(t,w)}},remove(e,t,n,{um:s,o:{remove:a}},i){const{shapeFlag:o,children:r,anchor:l,targetStart:u,targetAnchor:d,target:h,props:f}=e;let p=i||!Qs(f);const g=Is.get(e);if(g&&(g.flags|=8,Is.delete(e),p=!1),h&&(a(u),a(d)),i&&a(l),o&16)for(let m=0;m<r.length;m++){const v=r[m];s(v,t,n,p,!!v.dynamicChildren)}},move:To,hydrate:Ab};function To(e,t,n,{o:{insert:s},m:a},i=2){i===0&&s(e.targetAnchor,t,n);const{el:o,anchor:r,shapeFlag:l,children:u,props:d}=e,h=i===2;if(h&&s(o,t,n),!Is.has(e)&&(!h||Qs(d))&&l&16)for(let f=0;f<u.length;f++)a(u[f],t,n,2);h&&s(r,t,n)}function Ab(e,t,n,s,a,i,{o:{nextSibling:o,parentNode:r,querySelector:l,insert:u,createText:d}},h){function f(v,y){let w=y;for(;w;){if(w&&w.nodeType===8){if(w.data==="teleport start anchor")t.targetStart=w;else if(w.data==="teleport anchor"){t.targetAnchor=w,v._lpa=t.targetAnchor&&o(t.targetAnchor);break}}w=o(w)}}function p(v,y){y.anchor=h(o(v),y,r(v),n,s,a,i)}const g=t.target=Gl(t.props,l),m=Qs(t.props);if(g){const v=g._lpa||g.firstChild;t.shapeFlag&16&&(m?(p(e,t),f(g,v),t.targetAnchor||Kl(g,t,d,u,r(e)===g?e:null)):(t.anchor=o(e),f(g,v),t.targetAnchor||Kl(g,t,d,u),h(v&&o(v),t,g,n,s,a,i))),vi(t,m)}else m&&t.shapeFlag&16&&(p(e,t),t.targetStart=e,t.targetAnchor=o(e));return t.anchor&&o(t.anchor)}const Cb=_b;function vi(e,t){const n=e.ctx;if(n&&n.ut){let s,a;for(t?(s=e.el,a=e.anchor):(s=e.targetStart,a=e.targetAnchor);s&&s!==a;)s.nodeType===1&&s.setAttribute("data-v-owner",n.uid),s=s.nextSibling;n.ut()}}function Kl(e,t,n,s,a=null){const i=t.targetStart=n(""),o=t.targetAnchor=n("");return i[gp]=o,e&&(s(i,e,a),s(o,e,a)),o}const Yn=Symbol("_leaveCb"),ui=Symbol("_enterCb");function yp(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return $s(()=>{e.isMounted=!0}),In(()=>{e.isUnmounting=!0}),e}const kn=[Function,Array],bp={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:kn,onEnter:kn,onAfterEnter:kn,onEnterCancelled:kn,onBeforeLeave:kn,onLeave:kn,onAfterLeave:kn,onLeaveCancelled:kn,onBeforeAppear:kn,onAppear:kn,onAfterAppear:kn,onAppearCancelled:kn},wp=e=>{const t=e.subTree;return t.component?wp(t.component):t},Tb={name:"BaseTransition",props:bp,setup(e,{slots:t}){const n=io(),s=yp();return()=>{const a=t.default&&Fc(t.default(),!0),i=a&&a.length?kp(a):n.subTree?Ee():void 0;if(!i)return;const o=Te(e),{mode:r}=o;if(s.isLeaving)return gl(i);const l=ad(i);if(!l)return gl(i);let u=ji(l,o,s,n,h=>u=h);l.type!==tn&&da(l,u);let d=n.subTree&&ad(n.subTree);if(d&&d.type!==tn&&!Zs(d,l)&&wp(n).type!==tn){let h=ji(d,o,s,n);if(da(d,h),r==="out-in"&&l.type!==tn)return s.isLeaving=!0,h.afterLeave=()=>{s.isLeaving=!1,n.job.flags&8||n.update(),delete h.afterLeave,d=void 0},gl(i);r==="in-out"&&l.type!==tn?h.delayLeave=(f,p,g)=>{const m=Sp(s,d);m[String(d.key)]=d,f[Yn]=()=>{p(),f[Yn]=void 0,delete u.delayedLeave,d=void 0},u.delayedLeave=()=>{g(),delete u.delayedLeave,d=void 0}}:d=void 0}else d&&(d=void 0);return i}}};function kp(e){let t=e[0];if(e.length>1){for(const n of e)if(n.type!==tn){t=n;break}}return t}const Ib=Tb;function Sp(e,t){const{leavingVNodes:n}=e;let s=n.get(t.type);return s||(s=Object.create(null),n.set(t.type,s)),s}function ji(e,t,n,s,a){const{appear:i,mode:o,persisted:r=!1,onBeforeEnter:l,onEnter:u,onAfterEnter:d,onEnterCancelled:h,onBeforeLeave:f,onLeave:p,onAfterLeave:g,onLeaveCancelled:m,onBeforeAppear:v,onAppear:y,onAfterAppear:w,onAppearCancelled:x}=t,T=String(e.key),C=Sp(n,e),_=(O,$)=>{O&&Dn(O,s,9,$)},I=(O,$)=>{const q=$[1];_(O,$),Le(O)?O.every(R=>R.length<=1)&&q():O.length<=1&&q()},k={mode:o,persisted:r,beforeEnter(O){let $=l;if(!n.isMounted)if(i)$=v||l;else return;O[Yn]&&O[Yn](!0);const q=C[T];q&&Zs(e,q)&&q.el[Yn]&&q.el[Yn](),_($,[O])},enter(O){if(C[T]===e)return;let $=u,q=d,R=h;if(!n.isMounted)if(i)$=y||u,q=w||d,R=x||h;else return;let z=!1;O[ui]=re=>{z||(z=!0,re?_(R,[O]):_(q,[O]),k.delayedLeave&&k.delayedLeave(),O[ui]=void 0)};const se=O[ui].bind(null,!1);$?I($,[O,se]):se()},leave(O,$){const q=String(e.key);if(O[ui]&&O[ui](!0),n.isUnmounting)return $();_(f,[O]);let R=!1;O[Yn]=se=>{R||(R=!0,$(),se?_(m,[O]):_(g,[O]),O[Yn]=void 0,C[q]===e&&delete C[q])};const z=O[Yn].bind(null,!1);C[q]=e,p?I(p,[O,z]):z()},clone(O){const $=ji(O,t,n,s,a);return a&&a($),$}};return k}function gl(e){if(Tr(e))return e=Ds(e),e.children=null,e}function ad(e){if(!Tr(e))return vp(e.type)&&e.children?kp(e.children):e;if(e.component)return e.component.subTree;const{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&Me(n.default))return n.default()}}function da(e,t){e.shapeFlag&6&&e.component?(e.transition=t,da(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Fc(e,t=!1,n){let s=[],a=0;for(let i=0;i<e.length;i++){let o=e[i];const r=n==null?o.key:String(n)+String(o.key!=null?o.key:i);o.type===ce?(o.patchFlag&128&&a++,s=s.concat(Fc(o.children,t,r))):(t||o.type!==tn)&&s.push(r!=null?Ds(o,{key:r}):o)}if(a>1)for(let i=0;i<s.length;i++)s[i].patchFlag=-2;return s}function Ct(e,t){return Me(e)?Et({name:e.name},t,{setup:e}):e}function Ya(){const e=io();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function xp(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function id(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const Yo=new WeakMap;function Ai(e,t,n,s,a=!1){if(Le(e)){e.forEach((m,v)=>Ai(m,t&&(Le(t)?t[v]:t),n,s,a));return}if(Ci(s)&&!a){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Ai(e,t,n,s.component.subTree);return}const i=s.shapeFlag&4?Or(s.component):s.el,o=a?null:i,{i:r,r:l}=e,u=t&&t.r,d=r.refs===lt?r.refs={}:r.refs,h=r.setupState,f=Te(h),p=h===lt?Bf:m=>id(d,m)?!1:nt(f,m),g=(m,v)=>!(v&&id(d,v));if(u!=null&&u!==l){if(od(t),pt(u))d[u]=null,p(u)&&(h[u]=null);else if(wt(u)){const m=t;g(u,m.k)&&(u.value=null),m.k&&(d[m.k]=null)}}if(Me(l))so(l,r,12,[o,d]);else{const m=pt(l),v=wt(l);if(m||v){const y=()=>{if(e.f){const w=m?p(l)?h[l]:d[l]:g()||!e.k?l.value:d[e.k];if(a)Le(w)&&Oc(w,i);else if(Le(w))w.includes(i)||w.push(i);else if(m)d[l]=[i],p(l)&&(h[l]=d[l]);else{const x=[i];g(l,e.k)&&(l.value=x),e.k&&(d[e.k]=x)}}else m?(d[l]=o,p(l)&&(h[l]=o)):v&&(g(l,e.k)&&(l.value=o),e.k&&(d[e.k]=o))};if(o){const w=()=>{y(),Yo.delete(e)};w.id=-1,Yo.set(e,w),Jt(w,n)}else od(e),y()}}}function od(e){const t=Yo.get(e);t&&(t.flags|=8,Yo.delete(e))}xr().requestIdleCallback;xr().cancelIdleCallback;const Ci=e=>!!e.type.__asyncLoader,Tr=e=>e.type.__isKeepAlive;function _p(e,t){Ap(e,"a",t)}function Wc(e,t){Ap(e,"da",t)}function Ap(e,t,n=qt){const s=e.__wdc||(e.__wdc=()=>{let a=n;for(;a;){if(a.isDeactivated)return;a=a.parent}return e()});if(Ir(t,s,n),n){let a=n.parent;for(;a&&a.parent;)Tr(a.parent.vnode)&&Eb(s,t,n,a),a=a.parent}}function Eb(e,t,n,s){const a=Ir(t,e,s,!0);Cp(()=>{Oc(s[t],a)},n)}function Ir(e,t,n=qt,s=!1){if(n){const a=n[e]||(n[e]=[]),i=t.__weh||(t.__weh=(...o)=>{ms();const r=oo(n),l=Dn(t,n,e,o);return r(),gs(),l});return s?a.unshift(i):a.push(i),i}}const ks=e=>(t,n=qt)=>{(!Fi||e==="sp")&&Ir(e,(...s)=>t(...s),n)},Er=ks("bm"),$s=ks("m"),Lb=ks("bu"),Hc=ks("u"),In=ks("bum"),Cp=ks("um"),Ob=ks("sp"),Nb=ks("rtg"),Pb=ks("rtc");function Bb(e,t=qt){Ir("ec",e,t)}const Tp="components";function rd(e,t){return Lp(Tp,e,!0,t)||e}const Ip=Symbol.for("v-ndc");function Ep(e){return pt(e)?Lp(Tp,e,!1)||e:e||Ip}function Lp(e,t,n=!0,s=!1){const a=cn||qt;if(a){const i=a.type;{const r=vw(i,!1);if(r&&(r===t||r===Gt(t)||r===ws(Gt(t))))return i}const o=ld(a[e]||i[e],t)||ld(a.appContext[e],t);return!o&&s?i:o}}function ld(e,t){return e&&(e[t]||e[Gt(t)]||e[ws(Gt(t))])}function qe(e,t,n,s){let a;const i=n,o=Le(e);if(o||pt(e)){const r=o&&ia(e);let l=!1,u=!1;r&&(l=!hn(e),u=vs(e),e=_r(e)),a=new Array(e.length);for(let d=0,h=e.length;d<h;d++)a[d]=t(l?u?Ma(Bn(e[d])):Bn(e[d]):e[d],d,void 0,i)}else if(typeof e=="number"){a=new Array(e);for(let r=0;r<e;r++)a[r]=t(r+1,r,void 0,i)}else if(et(e))if(e[Symbol.iterator])a=Array.from(e,(r,l)=>t(r,l,void 0,i));else{const r=Object.keys(e);a=new Array(r.length);for(let l=0,u=r.length;l<u;l++){const d=r[l];a[l]=t(e[d],d,l,i)}}else a=[];return a}const Yl=e=>e?Yp(e)?Or(e):Yl(e.parent):null,Ti=Et(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Yl(e.parent),$root:e=>Yl(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Np(e),$forceUpdate:e=>e.f||(e.f=()=>{jc(e.update)}),$nextTick:e=>e.n||(e.n=It.bind(e.proxy)),$watch:e=>Sb.bind(e)}),vl=(e,t)=>e!==lt&&!e.__isScriptSetup&&nt(e,t),Db={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:s,data:a,props:i,accessCache:o,type:r,appContext:l}=e;if(t[0]!=="$"){const f=o[t];if(f!==void 0)switch(f){case 1:return s[t];case 2:return a[t];case 4:return n[t];case 3:return i[t]}else{if(vl(s,t))return o[t]=1,s[t];if(a!==lt&&nt(a,t))return o[t]=2,a[t];if(nt(i,t))return o[t]=3,i[t];if(n!==lt&&nt(n,t))return o[t]=4,n[t];Xl&&(o[t]=0)}}const u=Ti[t];let d,h;if(u)return t==="$attrs"&&Ht(e.attrs,"get",""),u(e);if((d=r.__cssModules)&&(d=d[t]))return d;if(n!==lt&&nt(n,t))return o[t]=4,n[t];if(h=l.config.globalProperties,nt(h,t))return h[t]},set({_:e},t,n){const{data:s,setupState:a,ctx:i}=e;return vl(a,t)?(a[t]=n,!0):s!==lt&&nt(s,t)?(s[t]=n,!0):nt(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(i[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:s,appContext:a,props:i,type:o}},r){let l;return!!(n[r]||e!==lt&&r[0]!=="$"&&nt(e,r)||vl(t,r)||nt(i,r)||nt(s,r)||nt(Ti,r)||nt(a.config.globalProperties,r)||(l=o.__cssModules)&&l[r])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:nt(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function cd(e){return Le(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let Xl=!0;function Rb(e){const t=Np(e),n=e.proxy,s=e.ctx;Xl=!1,t.beforeCreate&&ud(t.beforeCreate,e,"bc");const{data:a,computed:i,methods:o,watch:r,provide:l,inject:u,created:d,beforeMount:h,mounted:f,beforeUpdate:p,updated:g,activated:m,deactivated:v,beforeDestroy:y,beforeUnmount:w,destroyed:x,unmounted:T,render:C,renderTracked:_,renderTriggered:I,errorCaptured:k,serverPrefetch:O,expose:$,inheritAttrs:q,components:R,directives:z,filters:se}=t;if(u&&Mb(u,s,null),o)for(const me in o){const ge=o[me];Me(ge)&&(s[me]=ge.bind(n))}if(a){const me=a.call(n,n);et(me)&&(e.data=jt(me))}if(Xl=!0,i)for(const me in i){const ge=i[me],Ze=Me(ge)?ge.bind(n,n):Me(ge.get)?ge.get.bind(n,n):es,Ve=!Me(ge)&&Me(ge.set)?ge.set.bind(n):es,Se=N({get:Ze,set:Ve});Object.defineProperty(s,me,{enumerable:!0,configurable:!0,get:()=>Se.value,set:X=>Se.value=X})}if(r)for(const me in r)Op(r[me],s,n,me);if(l){const me=Me(l)?l.call(n):l;Reflect.ownKeys(me).forEach(ge=>{Dt(ge,me[ge])})}d&&ud(d,e,"c");function we(me,ge){Le(ge)?ge.forEach(Ze=>me(Ze.bind(n))):ge&&me(ge.bind(n))}if(we(Er,h),we($s,f),we(Lb,p),we(Hc,g),we(_p,m),we(Wc,v),we(Bb,k),we(Pb,_),we(Nb,I),we(In,w),we(Cp,T),we(Ob,O),Le($))if($.length){const me=e.exposed||(e.exposed={});$.forEach(ge=>{Object.defineProperty(me,ge,{get:()=>n[ge],set:Ze=>n[ge]=Ze,enumerable:!0})})}else e.exposed||(e.exposed={});C&&e.render===es&&(e.render=C),q!=null&&(e.inheritAttrs=q),R&&(e.components=R),z&&(e.directives=z),O&&xp(e)}function Mb(e,t,n=es){Le(e)&&(e=Jl(e));for(const s in e){const a=e[s];let i;et(a)?"default"in a?i=Xe(a.from||s,a.default,!0):i=Xe(a.from||s):i=Xe(a),wt(i)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):t[s]=i}}function ud(e,t,n){Dn(Le(e)?e.map(s=>s.bind(t.proxy)):e.bind(t.proxy),t,n)}function Op(e,t,n,s){let a=s.includes(".")?mp(n,s):()=>n[s];if(pt(e)){const i=t[e];Me(i)&&Oe(a,i)}else if(Me(e))Oe(a,e.bind(n));else if(et(e))if(Le(e))e.forEach(i=>Op(i,t,n,s));else{const i=Me(e.handler)?e.handler.bind(n):t[e.handler];Me(i)&&Oe(a,i,e)}}function Np(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:a,optionsCache:i,config:{optionMergeStrategies:o}}=e.appContext,r=i.get(t);let l;return r?l=r:!a.length&&!n&&!s?l=t:(l={},a.length&&a.forEach(u=>Xo(l,u,o,!0)),Xo(l,t,o)),et(t)&&i.set(t,l),l}function Xo(e,t,n,s=!1){const{mixins:a,extends:i}=t;i&&Xo(e,i,n,!0),a&&a.forEach(o=>Xo(e,o,n,!0));for(const o in t)if(!(s&&o==="expose")){const r=$b[o]||n&&n[o];e[o]=r?r(e[o],t[o]):t[o]}return e}const $b={data:dd,props:hd,emits:hd,methods:yi,computed:yi,beforeCreate:Xt,created:Xt,beforeMount:Xt,mounted:Xt,beforeUpdate:Xt,updated:Xt,beforeDestroy:Xt,beforeUnmount:Xt,destroyed:Xt,unmounted:Xt,activated:Xt,deactivated:Xt,errorCaptured:Xt,serverPrefetch:Xt,components:yi,directives:yi,watch:Vb,provide:dd,inject:jb};function dd(e,t){return t?e?function(){return Et(Me(e)?e.call(this,this):e,Me(t)?t.call(this,this):t)}:t:e}function jb(e,t){return yi(Jl(e),Jl(t))}function Jl(e){if(Le(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Xt(e,t){return e?[...new Set([].concat(e,t))]:t}function yi(e,t){return e?Et(Object.create(null),e,t):t}function hd(e,t){return e?Le(e)&&Le(t)?[...new Set([...e,...t])]:Et(Object.create(null),cd(e),cd(t??{})):t}function Vb(e,t){if(!e)return t;if(!t)return e;const n=Et(Object.create(null),e);for(const s in t)n[s]=Xt(e[s],t[s]);return n}function Pp(){return{app:null,config:{isNativeTag:Bf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Fb=0;function Wb(e,t){return function(s,a=null){Me(s)||(s=Et({},s)),a!=null&&!et(a)&&(a=null);const i=Pp(),o=new WeakSet,r=[];let l=!1;const u=i.app={_uid:Fb++,_component:s,_props:a,_container:null,_context:i,_instance:null,version:bw,get config(){return i.config},set config(d){},use(d,...h){return o.has(d)||(d&&Me(d.install)?(o.add(d),d.install(u,...h)):Me(d)&&(o.add(d),d(u,...h))),u},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),u},component(d,h){return h?(i.components[d]=h,u):i.components[d]},directive(d,h){return h?(i.directives[d]=h,u):i.directives[d]},mount(d,h,f){if(!l){const p=u._ceVNode||S(s,a);return p.appContext=i,f===!0?f="svg":f===!1&&(f=void 0),e(p,d,f),l=!0,u._container=d,d.__vue_app__=u,Or(p.component)}},onUnmount(d){r.push(d)},unmount(){l&&(Dn(r,u._instance,16),e(null,u._container),delete u._container.__vue_app__)},provide(d,h){return i.provides[d]=h,u},runWithContext(d){const h=Pa;Pa=u;try{return d()}finally{Pa=h}}};return u}}let Pa=null;const Hb=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Gt(t)}Modifiers`]||e[`${pa(t)}Modifiers`];function qb(e,t,...n){if(e.isUnmounted)return;const s=e.vnode.props||lt;let a=n;const i=t.startsWith("update:"),o=i&&Hb(s,t.slice(7));o&&(o.trim&&(a=n.map(d=>pt(d)?d.trim():d)),o.number&&(a=n.map(By)));let r,l=s[r=ul(t)]||s[r=ul(Gt(t))];!l&&i&&(l=s[r=ul(pa(t))]),l&&Dn(l,e,6,a);const u=s[r+"Once"];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[r])return;e.emitted[r]=!0,Dn(u,e,6,a)}}const zb=new WeakMap;function Bp(e,t,n=!1){const s=n?zb:t.emitsCache,a=s.get(e);if(a!==void 0)return a;const i=e.emits;let o={},r=!1;if(!Me(e)){const l=u=>{const d=Bp(u,t,!0);d&&(r=!0,Et(o,d))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!i&&!r?(et(e)&&s.set(e,null),null):(Le(i)?i.forEach(l=>o[l]=null):Et(o,i),et(e)&&s.set(e,o),o)}function Lr(e,t){return!e||!br(t)?!1:(t=t.slice(2).replace(/Once$/,""),nt(e,t[0].toLowerCase()+t.slice(1))||nt(e,pa(t))||nt(e,t))}function fd(e){const{type:t,vnode:n,proxy:s,withProxy:a,propsOptions:[i],slots:o,attrs:r,emit:l,render:u,renderCache:d,props:h,data:f,setupState:p,ctx:g,inheritAttrs:m}=e,v=Ko(e);let y,w;try{if(n.shapeFlag&4){const T=a||s,C=T;y=Jn(u.call(C,T,d,h,p,f,g)),w=r}else{const T=t;y=Jn(T.length>1?T(h,{attrs:r,slots:o,emit:l}):T(h,null)),w=t.props?r:Ub(r)}}catch(T){Ii.length=0,Cr(T,e,1),y=S(tn)}let x=y;if(w&&m!==!1){const T=Object.keys(w),{shapeFlag:C}=x;T.length&&C&7&&(i&&T.some(wr)&&(w=Gb(w,i)),x=Ds(x,w,!1,!0))}return n.dirs&&(x=Ds(x,null,!1,!0),x.dirs=x.dirs?x.dirs.concat(n.dirs):n.dirs),n.transition&&da(x,n.transition),y=x,Ko(v),y}const Ub=e=>{let t;for(const n in e)(n==="class"||n==="style"||br(n))&&((t||(t={}))[n]=e[n]);return t},Gb=(e,t)=>{const n={};for(const s in e)(!wr(s)||!(s.slice(9)in t))&&(n[s]=e[s]);return n};function Kb(e,t,n){const{props:s,children:a,component:i}=e,{props:o,children:r,patchFlag:l}=t,u=i.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?pd(s,o,u):!!o;if(l&8){const d=t.dynamicProps;for(let h=0;h<d.length;h++){const f=d[h];if(Dp(o,s,f)&&!Lr(u,f))return!0}}}else return(a||r)&&(!r||!r.$stable)?!0:s===o?!1:s?o?pd(s,o,u):!0:!!o;return!1}function pd(e,t,n){const s=Object.keys(t);if(s.length!==Object.keys(e).length)return!0;for(let a=0;a<s.length;a++){const i=s[a];if(Dp(t,e,i)&&!Lr(n,i))return!0}return!1}function Dp(e,t,n){const s=e[n],a=t[n];return n==="style"&&et(s)&&et(a)?!Nc(s,a):s!==a}function Yb({vnode:e,parent:t,suspense:n},s){for(;t;){const a=t.subTree;if(a.suspense&&a.suspense.activeBranch===e&&(a.suspense.vnode.el=a.el=s,e=a),a===e)(e=t.vnode).el=s,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=s)}const Rp={},Mp=()=>Object.create(Rp),$p=e=>Object.getPrototypeOf(e)===Rp;function Xb(e,t,n,s=!1){const a={},i=Mp();e.propsDefaults=Object.create(null),jp(e,t,a,i);for(const o in e.propsOptions[0])o in a||(a[o]=void 0);n?e.props=s?a:ip(a):e.type.props?e.props=a:e.props=i,e.attrs=i}function Jb(e,t,n,s){const{props:a,attrs:i,vnode:{patchFlag:o}}=e,r=Te(a),[l]=e.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const d=e.vnode.dynamicProps;for(let h=0;h<d.length;h++){let f=d[h];if(Lr(e.emitsOptions,f))continue;const p=t[f];if(l)if(nt(i,f))p!==i[f]&&(i[f]=p,u=!0);else{const g=Gt(f);a[g]=Ql(l,r,g,p,e,!1)}else p!==i[f]&&(i[f]=p,u=!0)}}}else{jp(e,t,a,i)&&(u=!0);let d;for(const h in r)(!t||!nt(t,h)&&((d=pa(h))===h||!nt(t,d)))&&(l?n&&(n[h]!==void 0||n[d]!==void 0)&&(a[h]=Ql(l,r,h,void 0,e,!0)):delete a[h]);if(i!==r)for(const h in i)(!t||!nt(t,h))&&(delete i[h],u=!0)}u&&ds(e.attrs,"set","")}function jp(e,t,n,s){const[a,i]=e.propsOptions;let o=!1,r;if(t)for(let l in t){if(Si(l))continue;const u=t[l];let d;a&&nt(a,d=Gt(l))?!i||!i.includes(d)?n[d]=u:(r||(r={}))[d]=u:Lr(e.emitsOptions,l)||(!(l in s)||u!==s[l])&&(s[l]=u,o=!0)}if(i){const l=Te(n),u=r||lt;for(let d=0;d<i.length;d++){const h=i[d];n[h]=Ql(a,l,h,u[h],e,!nt(u,h))}}return o}function Ql(e,t,n,s,a,i){const o=e[n];if(o!=null){const r=nt(o,"default");if(r&&s===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Me(l)){const{propsDefaults:u}=a;if(n in u)s=u[n];else{const d=oo(a);s=u[n]=l.call(null,t),d()}}else s=l;a.ce&&a.ce._setProp(n,s)}o[0]&&(i&&!r?s=!1:o[1]&&(s===""||s===pa(n))&&(s=!0))}return s}const Qb=new WeakMap;function Vp(e,t,n=!1){const s=n?Qb:t.propsCache,a=s.get(e);if(a)return a;const i=e.props,o={},r=[];let l=!1;if(!Me(e)){const d=h=>{l=!0;const[f,p]=Vp(h,t,!0);Et(o,f),p&&r.push(...p)};!n&&t.mixins.length&&t.mixins.forEach(d),e.extends&&d(e.extends),e.mixins&&e.mixins.forEach(d)}if(!i&&!l)return et(e)&&s.set(e,La),La;if(Le(i))for(let d=0;d<i.length;d++){const h=Gt(i[d]);md(h)&&(o[h]=lt)}else if(i)for(const d in i){const h=Gt(d);if(md(h)){const f=i[d],p=o[h]=Le(f)||Me(f)?{type:f}:Et({},f),g=p.type;let m=!1,v=!0;if(Le(g))for(let y=0;y<g.length;++y){const w=g[y],x=Me(w)&&w.name;if(x==="Boolean"){m=!0;break}else x==="String"&&(v=!1)}else m=Me(g)&&g.name==="Boolean";p[0]=m,p[1]=v,(m||nt(p,"default"))&&r.push(h)}}const u=[o,r];return et(e)&&s.set(e,u),u}function md(e){return e[0]!=="$"&&!Si(e)}const qc=e=>e==="_"||e==="_ctx"||e==="$stable",zc=e=>Le(e)?e.map(Jn):[Jn(e)],Zb=(e,t,n)=>{if(t._n)return t;const s=D((...a)=>zc(t(...a)),n);return s._c=!1,s},Fp=(e,t,n)=>{const s=e._ctx;for(const a in e){if(qc(a))continue;const i=e[a];if(Me(i))t[a]=Zb(a,i,s);else if(i!=null){const o=zc(i);t[a]=()=>o}}},Wp=(e,t)=>{const n=zc(t);e.slots.default=()=>n},Hp=(e,t,n)=>{for(const s in t)(n||!qc(s))&&(e[s]=t[s])},ew=(e,t,n)=>{const s=e.slots=Mp();if(e.vnode.shapeFlag&32){const a=t._;a?(Hp(s,t,n),n&&jf(s,"_",a,!0)):Fp(t,s)}else t&&Wp(e,t)},tw=(e,t,n)=>{const{vnode:s,slots:a}=e;let i=!0,o=lt;if(s.shapeFlag&32){const r=t._;r?n&&r===1?i=!1:Hp(a,t,n):(i=!t.$stable,Fp(t,a)),o=t}else t&&(Wp(e,t),o={default:1});if(i)for(const r in a)!qc(r)&&o[r]==null&&delete a[r]},Jt=ow;function nw(e){return sw(e)}function sw(e,t){const n=xr();n.__VUE__=!0;const{insert:s,remove:a,patchProp:i,createElement:o,createText:r,createComment:l,setText:u,setElementText:d,parentNode:h,nextSibling:f,setScopeId:p=es,insertStaticContent:g}=e,m=(A,E,P,F=null,G=null,W=null,te=void 0,oe=null,ie=!!E.dynamicChildren)=>{if(A===E)return;A&&!Zs(A,E)&&(F=M(A),X(A,G,W,!0),A=null),E.patchFlag===-2&&(ie=!1,E.dynamicChildren=null);const{type:Y,ref:Ce,shapeFlag:de}=E;switch(Y){case ao:v(A,E,P,F);break;case tn:y(A,E,P,F);break;case Ro:A==null&&w(E,P,F,te);break;case ce:R(A,E,P,F,G,W,te,oe,ie);break;default:de&1?C(A,E,P,F,G,W,te,oe,ie):de&6?z(A,E,P,F,G,W,te,oe,ie):(de&64||de&128)&&Y.process(A,E,P,F,G,W,te,oe,ie,Q)}Ce!=null&&G?Ai(Ce,A&&A.ref,W,E||A,!E):Ce==null&&A&&A.ref!=null&&Ai(A.ref,null,W,A,!0)},v=(A,E,P,F)=>{if(A==null)s(E.el=r(E.children),P,F);else{const G=E.el=A.el;E.children!==A.children&&u(G,E.children)}},y=(A,E,P,F)=>{A==null?s(E.el=l(E.children||""),P,F):E.el=A.el},w=(A,E,P,F)=>{[A.el,A.anchor]=g(A.children,E,P,F,A.el,A.anchor)},x=({el:A,anchor:E},P,F)=>{let G;for(;A&&A!==E;)G=f(A),s(A,P,F),A=G;s(E,P,F)},T=({el:A,anchor:E})=>{let P;for(;A&&A!==E;)P=f(A),a(A),A=P;a(E)},C=(A,E,P,F,G,W,te,oe,ie)=>{if(E.type==="svg"?te="svg":E.type==="math"&&(te="mathml"),A==null)_(E,P,F,G,W,te,oe,ie);else{const Y=A.el&&A.el._isVueCE?A.el:null;try{Y&&Y._beginPatch(),O(A,E,G,W,te,oe,ie)}finally{Y&&Y._endPatch()}}},_=(A,E,P,F,G,W,te,oe)=>{let ie,Y;const{props:Ce,shapeFlag:de,transition:ve,dirs:Ne}=A;if(ie=A.el=o(A.type,W,Ce&&Ce.is,Ce),de&8?d(ie,A.children):de&16&&k(A.children,ie,null,F,G,yl(A,W),te,oe),Ne&&zs(A,null,F,"created"),I(ie,A,A.scopeId,te,F),Ce){for(const Qe in Ce)Qe!=="value"&&!Si(Qe)&&i(ie,Qe,null,Ce[Qe],W,F);"value"in Ce&&i(ie,"value",null,Ce.value,W),(Y=Ce.onVnodeBeforeMount)&&Un(Y,F,A)}Ne&&zs(A,null,F,"beforeMount");const ze=aw(G,ve);ze&&ve.beforeEnter(ie),s(ie,E,P),((Y=Ce&&Ce.onVnodeMounted)||ze||Ne)&&Jt(()=>{try{Y&&Un(Y,F,A),ze&&ve.enter(ie),Ne&&zs(A,null,F,"mounted")}finally{}},G)},I=(A,E,P,F,G)=>{if(P&&p(A,P),F)for(let W=0;W<F.length;W++)p(A,F[W]);if(G){let W=G.subTree;if(E===W||Up(W.type)&&(W.ssContent===E||W.ssFallback===E)){const te=G.vnode;I(A,te,te.scopeId,te.slotScopeIds,G.parent)}}},k=(A,E,P,F,G,W,te,oe,ie=0)=>{for(let Y=ie;Y<A.length;Y++){const Ce=A[Y]=oe?us(A[Y]):Jn(A[Y]);m(null,Ce,E,P,F,G,W,te,oe)}},O=(A,E,P,F,G,W,te)=>{const oe=E.el=A.el;let{patchFlag:ie,dynamicChildren:Y,dirs:Ce}=E;ie|=A.patchFlag&16;const de=A.props||lt,ve=E.props||lt;let Ne;if(P&&Us(P,!1),(Ne=ve.onVnodeBeforeUpdate)&&Un(Ne,P,E,A),Ce&&zs(E,A,P,"beforeUpdate"),P&&Us(P,!0),(de.innerHTML&&ve.innerHTML==null||de.textContent&&ve.textContent==null)&&d(oe,""),Y?$(A.dynamicChildren,Y,oe,P,F,yl(E,G),W):te||ge(A,E,oe,null,P,F,yl(E,G),W,!1),ie>0){if(ie&16)q(oe,de,ve,P,G);else if(ie&2&&de.class!==ve.class&&i(oe,"class",null,ve.class,G),ie&4&&i(oe,"style",de.style,ve.style,G),ie&8){const ze=E.dynamicProps;for(let Qe=0;Qe<ze.length;Qe++){const st=ze[Qe],yt=de[st],Ot=ve[st];(Ot!==yt||st==="value")&&i(oe,st,yt,Ot,G,P)}}ie&1&&A.children!==E.children&&d(oe,E.children)}else!te&&Y==null&&q(oe,de,ve,P,G);((Ne=ve.onVnodeUpdated)||Ce)&&Jt(()=>{Ne&&Un(Ne,P,E,A),Ce&&zs(E,A,P,"updated")},F)},$=(A,E,P,F,G,W,te)=>{for(let oe=0;oe<E.length;oe++){const ie=A[oe],Y=E[oe],Ce=ie.el&&(ie.type===ce||!Zs(ie,Y)||ie.shapeFlag&198)?h(ie.el):P;m(ie,Y,Ce,null,F,G,W,te,!0)}},q=(A,E,P,F,G)=>{if(E!==P){if(E!==lt)for(const W in E)!Si(W)&&!(W in P)&&i(A,W,E[W],null,G,F);for(const W in P){if(Si(W))continue;const te=P[W],oe=E[W];te!==oe&&W!=="value"&&i(A,W,oe,te,G,F)}"value"in P&&i(A,"value",E.value,P.value,G)}},R=(A,E,P,F,G,W,te,oe,ie)=>{const Y=E.el=A?A.el:r(""),Ce=E.anchor=A?A.anchor:r("");let{patchFlag:de,dynamicChildren:ve,slotScopeIds:Ne}=E;Ne&&(oe=oe?oe.concat(Ne):Ne),A==null?(s(Y,P,F),s(Ce,P,F),k(E.children||[],P,Ce,G,W,te,oe,ie)):de>0&&de&64&&ve&&A.dynamicChildren&&A.dynamicChildren.length===ve.length?($(A.dynamicChildren,ve,P,G,W,te,oe),(E.key!=null||G&&E===G.subTree)&&Uc(A,E,!0)):ge(A,E,P,Ce,G,W,te,oe,ie)},z=(A,E,P,F,G,W,te,oe,ie)=>{E.slotScopeIds=oe,A==null?E.shapeFlag&512?G.ctx.activate(E,P,F,te,ie):se(E,P,F,G,W,te,ie):re(A,E,ie)},se=(A,E,P,F,G,W,te)=>{const oe=A.component=hw(A,F,G);if(Tr(A)&&(oe.ctx.renderer=Q),fw(oe,!1,te),oe.asyncDep){if(G&&G.registerDep(oe,we,te),!A.el){const ie=oe.subTree=S(tn);y(null,ie,E,P),A.placeholder=ie.el}}else we(oe,A,E,P,G,W,te)},re=(A,E,P)=>{const F=E.component=A.component;if(Kb(A,E,P))if(F.asyncDep&&!F.asyncResolved){me(F,E,P);return}else F.next=E,F.update();else E.el=A.el,F.vnode=E},we=(A,E,P,F,G,W,te)=>{const oe=()=>{if(A.isMounted){let{next:de,bu:ve,u:Ne,parent:ze,vnode:Qe}=A;{const bn=qp(A);if(bn){de&&(de.el=Qe.el,me(A,de,te)),bn.asyncDep.then(()=>{Jt(()=>{A.isUnmounted||Y()},G)});return}}let st=de,yt;Us(A,!1),de?(de.el=Qe.el,me(A,de,te)):de=Qe,ve&&dl(ve),(yt=de.props&&de.props.onVnodeBeforeUpdate)&&Un(yt,ze,de,Qe),Us(A,!0);const Ot=fd(A),yn=A.subTree;A.subTree=Ot,m(yn,Ot,h(yn.el),M(yn),A,G,W),de.el=Ot.el,st===null&&Yb(A,Ot.el),Ne&&Jt(Ne,G),(yt=de.props&&de.props.onVnodeUpdated)&&Jt(()=>Un(yt,ze,de,Qe),G)}else{let de;const{el:ve,props:Ne}=E,{bm:ze,m:Qe,parent:st,root:yt,type:Ot}=A,yn=Ci(E);Us(A,!1),ze&&dl(ze),!yn&&(de=Ne&&Ne.onVnodeBeforeMount)&&Un(de,st,E),Us(A,!0);{yt.ce&&yt.ce._hasShadowRoot()&&yt.ce._injectChildStyle(Ot,A.parent?A.parent.type:void 0);const bn=A.subTree=fd(A);m(null,bn,P,F,A,G,W),E.el=bn.el}if(Qe&&Jt(Qe,G),!yn&&(de=Ne&&Ne.onVnodeMounted)){const bn=E;Jt(()=>Un(de,st,bn),G)}(E.shapeFlag&256||st&&Ci(st.vnode)&&st.vnode.shapeFlag&256)&&A.a&&Jt(A.a,G),A.isMounted=!0,E=P=F=null}};A.scope.on();const ie=A.effect=new zf(oe);A.scope.off();const Y=A.update=ie.run.bind(ie),Ce=A.job=ie.runIfDirty.bind(ie);Ce.i=A,Ce.id=A.uid,ie.scheduler=()=>jc(Ce),Us(A,!0),Y()},me=(A,E,P)=>{E.component=A;const F=A.vnode.props;A.vnode=E,A.next=null,Jb(A,E.props,F,P),tw(A,E.children,P),ms(),td(A),gs()},ge=(A,E,P,F,G,W,te,oe,ie=!1)=>{const Y=A&&A.children,Ce=A?A.shapeFlag:0,de=E.children,{patchFlag:ve,shapeFlag:Ne}=E;if(ve>0){if(ve&128){Ve(Y,de,P,F,G,W,te,oe,ie);return}else if(ve&256){Ze(Y,de,P,F,G,W,te,oe,ie);return}}Ne&8?(Ce&16&&it(Y,G,W),de!==Y&&d(P,de)):Ce&16?Ne&16?Ve(Y,de,P,F,G,W,te,oe,ie):it(Y,G,W,!0):(Ce&8&&d(P,""),Ne&16&&k(de,P,F,G,W,te,oe,ie))},Ze=(A,E,P,F,G,W,te,oe,ie)=>{A=A||La,E=E||La;const Y=A.length,Ce=E.length,de=Math.min(Y,Ce);let ve;for(ve=0;ve<de;ve++){const Ne=E[ve]=ie?us(E[ve]):Jn(E[ve]);m(A[ve],Ne,P,null,G,W,te,oe,ie)}Y>Ce?it(A,G,W,!0,!1,de):k(E,P,F,G,W,te,oe,ie,de)},Ve=(A,E,P,F,G,W,te,oe,ie)=>{let Y=0;const Ce=E.length;let de=A.length-1,ve=Ce-1;for(;Y<=de&&Y<=ve;){const Ne=A[Y],ze=E[Y]=ie?us(E[Y]):Jn(E[Y]);if(Zs(Ne,ze))m(Ne,ze,P,null,G,W,te,oe,ie);else break;Y++}for(;Y<=de&&Y<=ve;){const Ne=A[de],ze=E[ve]=ie?us(E[ve]):Jn(E[ve]);if(Zs(Ne,ze))m(Ne,ze,P,null,G,W,te,oe,ie);else break;de--,ve--}if(Y>de){if(Y<=ve){const Ne=ve+1,ze=Ne<Ce?E[Ne].el:F;for(;Y<=ve;)m(null,E[Y]=ie?us(E[Y]):Jn(E[Y]),P,ze,G,W,te,oe,ie),Y++}}else if(Y>ve)for(;Y<=de;)X(A[Y],G,W,!0),Y++;else{const Ne=Y,ze=Y,Qe=new Map;for(Y=ze;Y<=ve;Y++){const Yt=E[Y]=ie?us(E[Y]):Jn(E[Y]);Yt.key!=null&&Qe.set(Yt.key,Y)}let st,yt=0;const Ot=ve-ze+1;let yn=!1,bn=0;const Hs=new Array(Ot);for(Y=0;Y<Ot;Y++)Hs[Y]=0;for(Y=Ne;Y<=de;Y++){const Yt=A[Y];if(yt>=Ot){X(Yt,G,W,!0);continue}let wn;if(Yt.key!=null)wn=Qe.get(Yt.key);else for(st=ze;st<=ve;st++)if(Hs[st-ze]===0&&Zs(Yt,E[st])){wn=st;break}wn===void 0?X(Yt,G,W,!0):(Hs[wn-ze]=Y+1,wn>=bn?bn=wn:yn=!0,m(Yt,E[wn],P,null,G,W,te,oe,ie),yt++)}const ri=yn?iw(Hs):La;for(st=ri.length-1,Y=Ot-1;Y>=0;Y--){const Yt=ze+Y,wn=E[Yt],yo=E[Yt+1],ga=Yt+1<Ce?yo.el||zp(yo):F;Hs[Y]===0?m(null,wn,P,ga,G,W,te,oe,ie):yn&&(st<0||Y!==ri[st]?Se(wn,P,ga,2):st--)}}},Se=(A,E,P,F,G=null)=>{const{el:W,type:te,transition:oe,children:ie,shapeFlag:Y}=A;if(Y&6){Se(A.component.subTree,E,P,F);return}if(Y&128){A.suspense.move(E,P,F);return}if(Y&64){te.move(A,E,P,Q);return}if(te===ce){s(W,E,P);for(let de=0;de<ie.length;de++)Se(ie[de],E,P,F);s(A.anchor,E,P);return}if(te===Ro){x(A,E,P);return}if(F!==2&&Y&1&&oe)if(F===0)oe.beforeEnter(W),s(W,E,P),Jt(()=>oe.enter(W),G);else{const{leave:de,delayLeave:ve,afterLeave:Ne}=oe,ze=()=>{A.ctx.isUnmounted?a(W):s(W,E,P)},Qe=()=>{W._isLeaving&&W[Yn](!0),de(W,()=>{ze(),Ne&&Ne()})};ve?ve(W,ze,Qe):Qe()}else s(W,E,P)},X=(A,E,P,F=!1,G=!1)=>{const{type:W,props:te,ref:oe,children:ie,dynamicChildren:Y,shapeFlag:Ce,patchFlag:de,dirs:ve,cacheIndex:Ne,memo:ze}=A;if(de===-2&&(G=!1),oe!=null&&(ms(),Ai(oe,null,P,A,!0),gs()),Ne!=null&&(E.renderCache[Ne]=void 0),Ce&256){E.ctx.deactivate(A);return}const Qe=Ce&1&&ve,st=!Ci(A);let yt;if(st&&(yt=te&&te.onVnodeBeforeUnmount)&&Un(yt,E,A),Ce&6)mt(A.component,P,F);else{if(Ce&128){A.suspense.unmount(P,F);return}Qe&&zs(A,null,E,"beforeUnmount"),Ce&64?A.type.remove(A,E,P,Q,F):Y&&!Y.hasOnce&&(W!==ce||de>0&&de&64)?it(Y,E,P,!1,!0):(W===ce&&de&384||!G&&Ce&16)&&it(ie,E,P),F&&J(A)}const Ot=ze!=null&&Ne==null;(st&&(yt=te&&te.onVnodeUnmounted)||Qe||Ot)&&Jt(()=>{yt&&Un(yt,E,A),Qe&&zs(A,null,E,"unmounted"),Ot&&(A.el=null)},P)},J=A=>{const{type:E,el:P,anchor:F,transition:G}=A;if(E===ce){Ie(P,F);return}if(E===Ro){T(A);return}const W=()=>{a(P),G&&!G.persisted&&G.afterLeave&&G.afterLeave()};if(A.shapeFlag&1&&G&&!G.persisted){const{leave:te,delayLeave:oe}=G,ie=()=>te(P,W);oe?oe(A.el,W,ie):ie()}else W()},Ie=(A,E)=>{let P;for(;A!==E;)P=f(A),a(A),A=P;a(E)},mt=(A,E,P)=>{const{bum:F,scope:G,job:W,subTree:te,um:oe,m:ie,a:Y}=A;gd(ie),gd(Y),F&&dl(F),G.stop(),W&&(W.flags|=8,X(te,A,E,P)),oe&&Jt(oe,E),Jt(()=>{A.isUnmounted=!0},E)},it=(A,E,P,F=!1,G=!1,W=0)=>{for(let te=W;te<A.length;te++)X(A[te],E,P,F,G)},M=A=>{if(A.shapeFlag&6)return M(A.component.subTree);if(A.shapeFlag&128)return A.suspense.next();const E=f(A.anchor||A.el),P=E&&E[gp];return P?f(P):E};let Z=!1;const ae=(A,E,P)=>{let F;A==null?E._vnode&&(X(E._vnode,null,null,!0),F=E._vnode.component):m(E._vnode||null,A,E,null,null,null,P),E._vnode=A,Z||(Z=!0,td(F),hp(),Z=!1)},Q={p:m,um:X,m:Se,r:J,mt:se,mc:k,pc:ge,pbc:$,n:M,o:e};return{render:ae,hydrate:void 0,createApp:Wb(ae)}}function yl({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function Us({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function aw(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Uc(e,t,n=!1){const s=e.children,a=t.children;if(Le(s)&&Le(a))for(let i=0;i<s.length;i++){const o=s[i];let r=a[i];r.shapeFlag&1&&!r.dynamicChildren&&((r.patchFlag<=0||r.patchFlag===32)&&(r=a[i]=us(a[i]),r.el=o.el),!n&&r.patchFlag!==-2&&Uc(o,r)),r.type===ao&&(r.patchFlag===-1&&(r=a[i]=us(r)),r.el=o.el),r.type===tn&&!r.el&&(r.el=o.el)}}function iw(e){const t=e.slice(),n=[0];let s,a,i,o,r;const l=e.length;for(s=0;s<l;s++){const u=e[s];if(u!==0){if(a=n[n.length-1],e[a]<u){t[s]=a,n.push(s);continue}for(i=0,o=n.length-1;i<o;)r=i+o>>1,e[n[r]]<u?i=r+1:o=r;u<e[n[i]]&&(i>0&&(t[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=t[o];return n}function qp(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:qp(t)}function gd(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function zp(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?zp(t.subTree):null}const Up=e=>e.__isSuspense;function ow(e,t){t&&t.pendingBranch?Le(e)?t.effects.push(...e):t.effects.push(e):bb(e)}const ce=Symbol.for("v-fgt"),ao=Symbol.for("v-txt"),tn=Symbol.for("v-cmt"),Ro=Symbol.for("v-stc"),Ii=[];let un=null;function B(e=!1){Ii.push(un=e?null:[])}function rw(){Ii.pop(),un=Ii[Ii.length-1]||null}let Vi=1;function Jo(e,t=!1){Vi+=e,e<0&&un&&t&&(un.hasOnce=!0)}function Gp(e){return e.dynamicChildren=Vi>0?un||La:null,rw(),Vi>0&&un&&un.push(e),e}function H(e,t,n,s,a,i){return Gp(b(e,t,n,s,a,i,!0))}function Ge(e,t,n,s,a){return Gp(S(e,t,n,s,a,!0))}function Qo(e){return e?e.__v_isVNode===!0:!1}function Zs(e,t){return e.type===t.type&&e.key===t.key}const Kp=({key:e})=>e??null,Mo=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?pt(e)||wt(e)||Me(e)?{i:cn,r:e,k:t,f:!!n}:e:null);function b(e,t=null,n=null,s=0,a=null,i=e===ce?0:1,o=!1,r=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Kp(t),ref:t&&Mo(t),scopeId:pp,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:a,dynamicChildren:null,appContext:null,ctx:cn};return r?(Gc(l,n),i&128&&e.normalize(l)):n&&(l.shapeFlag|=pt(n)?8:16),Vi>0&&!o&&un&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&un.push(l),l}const S=lw;function lw(e,t=null,n=null,s=0,a=null,i=!1){if((!e||e===Ip)&&(e=tn),Qo(e)){const r=Ds(e,t,!0);return n&&Gc(r,n),Vi>0&&!i&&un&&(r.shapeFlag&6?un[un.indexOf(e)]=r:un.push(r)),r.patchFlag=-2,r}if(yw(e)&&(e=e.__vccOpts),t){t=cw(t);let{class:r,style:l}=t;r&&!pt(r)&&(t.class=fe(r)),et(l)&&(Ar(l)&&!Le(l)&&(l=Et({},l)),t.style=Be(l))}const o=pt(e)?1:Up(e)?128:vp(e)?64:et(e)?4:Me(e)?2:0;return b(e,t,n,s,a,o,i,!0)}function cw(e){return e?Ar(e)||$p(e)?Et({},e):e:null}function Ds(e,t,n=!1,s=!1){const{props:a,ref:i,patchFlag:o,children:r,transition:l}=e,u=t?$e(a||{},t):a,d={__v_isVNode:!0,__v_skip:!0,type:e.type,props:u,key:u&&Kp(u),ref:t&&t.ref?n&&i?Le(i)?i.concat(Mo(t)):[i,Mo(t)]:Mo(t):i,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:r,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==ce?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ds(e.ssContent),ssFallback:e.ssFallback&&Ds(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&s&&da(d,l.clone(d)),d}function K(e=" ",t=0){return S(ao,null,e,t)}function $o(e,t){const n=S(Ro,null,e);return n.staticCount=t,n}function Ee(e="",t=!1){return t?(B(),Ge(tn,null,e)):S(tn,null,e)}function Jn(e){return e==null||typeof e=="boolean"?S(tn):Le(e)?S(ce,null,e.slice()):Qo(e)?us(e):S(ao,null,String(e))}function us(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Ds(e)}function Gc(e,t){let n=0;const{shapeFlag:s}=e;if(t==null)t=null;else if(Le(t))n=16;else if(typeof t=="object")if(s&65){const a=t.default;a&&(a._c&&(a._d=!1),Gc(e,a()),a._c&&(a._d=!0));return}else{n=32;const a=t._;!a&&!$p(t)?t._ctx=cn:a===3&&cn&&(cn.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else Me(t)?(t={default:t,_ctx:cn},n=32):(t=String(t),s&64?(n=16,t=[K(t)]):n=8);e.children=t,e.shapeFlag|=n}function $e(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const a in s)if(a==="class")t.class!==s.class&&(t.class=fe([t.class,s.class]));else if(a==="style")t.style=Be([t.style,s.style]);else if(br(a)){const i=t[a],o=s[a];o&&i!==o&&!(Le(i)&&i.includes(o))?t[a]=i?[].concat(i,o):o:o==null&&i==null&&!wr(a)&&(t[a]=o)}else a!==""&&(t[a]=s[a])}return t}function Un(e,t,n,s=null){Dn(e,t,7,[n,s])}const uw=Pp();let dw=0;function hw(e,t,n){const s=e.type,a=(t?t.appContext:e.appContext)||uw,i={uid:dw++,vnode:e,type:s,parent:t,appContext:a,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Hf(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(a.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Vp(s,a),emitsOptions:Bp(s,a),emit:null,emitted:null,propsDefaults:lt,inheritAttrs:s.inheritAttrs,ctx:lt,data:lt,props:lt,attrs:lt,slots:lt,refs:lt,setupState:lt,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=t?t.root:i,i.emit=qb.bind(null,i),e.ce&&e.ce(i),i}let qt=null;const io=()=>qt||cn;let Zo,Zl;{const e=xr(),t=(n,s)=>{let a;return(a=e[n])||(a=e[n]=[]),a.push(s),i=>{a.length>1?a.forEach(o=>o(i)):a[0](i)}};Zo=t("__VUE_INSTANCE_SETTERS__",n=>qt=n),Zl=t("__VUE_SSR_SETTERS__",n=>Fi=n)}const oo=e=>{const t=qt;return Zo(e),e.scope.on(),()=>{e.scope.off(),Zo(t)}},vd=()=>{qt&&qt.scope.off(),Zo(null)};function Yp(e){return e.vnode.shapeFlag&4}let Fi=!1;function fw(e,t=!1,n=!1){t&&Zl(t);const{props:s,children:a}=e.vnode,i=Yp(e);Xb(e,s,i,t),ew(e,a,n||t);const o=i?pw(e,t):void 0;return t&&Zl(!1),o}function pw(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Db);const{setup:s}=n;if(s){ms();const a=e.setupContext=s.length>1?gw(e):null,i=oo(e),o=so(s,e,0,[e.props,a]),r=Rf(o);if(gs(),i(),(r||e.sp)&&!Ci(e)&&xp(e),r){if(o.then(vd,vd),t)return o.then(l=>{yd(e,l)}).catch(l=>{Cr(l,e,0)});e.asyncDep=o}else yd(e,o)}else Xp(e)}function yd(e,t,n){Me(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:et(t)&&(e.setupState=rp(t)),Xp(e)}function Xp(e,t,n){const s=e.type;e.render||(e.render=s.render||es);{const a=oo(e);ms();try{Rb(e)}finally{gs(),a()}}}const mw={get(e,t){return Ht(e,"get",""),e[t]}};function gw(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,mw),slots:e.slots,emit:e.emit,expose:t}}function Or(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(rp(lb(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Ti)return Ti[n](e)},has(t,n){return n in t||n in Ti}})):e.proxy}function vw(e,t=!0){return Me(e)?e.displayName||e.name:e.name||t&&e.__name}function yw(e){return Me(e)&&"__vccOpts"in e}const N=(e,t)=>pb(e,t,Fi);function Mn(e,t,n){try{Jo(-1);const s=arguments.length;return s===2?et(t)&&!Le(t)?Qo(t)?S(e,null,[t]):S(e,t):S(e,null,t):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&Qo(n)&&(n=[n]),S(e,t,n))}finally{Jo(1)}}const bw="3.5.34";/**
* @vue/runtime-dom v3.5.34
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ec;const bd=typeof window<"u"&&window.trustedTypes;if(bd)try{ec=bd.createPolicy("vue",{createHTML:e=>e})}catch{}const Jp=ec?e=>ec.createHTML(e):e=>e,ww="http://www.w3.org/2000/svg",kw="http://www.w3.org/1998/Math/MathML",cs=typeof document<"u"?document:null,wd=cs&&cs.createElement("template"),Sw={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,s)=>{const a=t==="svg"?cs.createElementNS(ww,e):t==="mathml"?cs.createElementNS(kw,e):n?cs.createElement(e,{is:n}):cs.createElement(e);return e==="select"&&s&&s.multiple!=null&&a.setAttribute("multiple",s.multiple),a},createText:e=>cs.createTextNode(e),createComment:e=>cs.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>cs.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,s,a,i){const o=n?n.previousSibling:t.lastChild;if(a&&(a===i||a.nextSibling))for(;t.insertBefore(a.cloneNode(!0),n),!(a===i||!(a=a.nextSibling)););else{wd.innerHTML=Jp(s==="svg"?`<svg>${e}</svg>`:s==="mathml"?`<math>${e}</math>`:e);const r=wd.content;if(s==="svg"||s==="mathml"){const l=r.firstChild;for(;l.firstChild;)r.appendChild(l.firstChild);r.removeChild(l)}t.insertBefore(r,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Cs="transition",di="animation",$a=Symbol("_vtc"),Qp={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Zp=Et({},bp,Qp),xw=e=>(e.displayName="Transition",e.props=Zp,e),ha=xw((e,{slots:t})=>Mn(Ib,em(e),t)),Gs=(e,t=[])=>{Le(e)?e.forEach(n=>n(...t)):e&&e(...t)},kd=e=>e?Le(e)?e.some(t=>t.length>1):e.length>1:!1;function em(e){const t={};for(const R in e)R in Qp||(t[R]=e[R]);if(e.css===!1)return t;const{name:n="v",type:s,duration:a,enterFromClass:i=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:r=`${n}-enter-to`,appearFromClass:l=i,appearActiveClass:u=o,appearToClass:d=r,leaveFromClass:h=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=e,g=_w(a),m=g&&g[0],v=g&&g[1],{onBeforeEnter:y,onEnter:w,onEnterCancelled:x,onLeave:T,onLeaveCancelled:C,onBeforeAppear:_=y,onAppear:I=w,onAppearCancelled:k=x}=t,O=(R,z,se,re)=>{R._enterCancelled=re,Es(R,z?d:r),Es(R,z?u:o),se&&se()},$=(R,z)=>{R._isLeaving=!1,Es(R,h),Es(R,p),Es(R,f),z&&z()},q=R=>(z,se)=>{const re=R?I:w,we=()=>O(z,R,se);Gs(re,[z,we]),Sd(()=>{Es(z,R?l:i),Gn(z,R?d:r),kd(re)||xd(z,s,m,we)})};return Et(t,{onBeforeEnter(R){Gs(y,[R]),Gn(R,i),Gn(R,o)},onBeforeAppear(R){Gs(_,[R]),Gn(R,l),Gn(R,u)},onEnter:q(!1),onAppear:q(!0),onLeave(R,z){R._isLeaving=!0;const se=()=>$(R,z);Gn(R,h),R._enterCancelled?(Gn(R,f),tc(R)):(tc(R),Gn(R,f)),Sd(()=>{R._isLeaving&&(Es(R,h),Gn(R,p),kd(T)||xd(R,s,v,se))}),Gs(T,[R,se])},onEnterCancelled(R){O(R,!1,void 0,!0),Gs(x,[R])},onAppearCancelled(R){O(R,!0,void 0,!0),Gs(k,[R])},onLeaveCancelled(R){$(R),Gs(C,[R])}})}function _w(e){if(e==null)return null;if(et(e))return[bl(e.enter),bl(e.leave)];{const t=bl(e);return[t,t]}}function bl(e){return Dy(e)}function Gn(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.add(n)),(e[$a]||(e[$a]=new Set)).add(t)}function Es(e,t){t.split(/\s+/).forEach(s=>s&&e.classList.remove(s));const n=e[$a];n&&(n.delete(t),n.size||(e[$a]=void 0))}function Sd(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Aw=0;function xd(e,t,n,s){const a=e._endId=++Aw,i=()=>{a===e._endId&&s()};if(n!=null)return setTimeout(i,n);const{type:o,timeout:r,propCount:l}=tm(e,t);if(!o)return s();const u=o+"end";let d=0;const h=()=>{e.removeEventListener(u,f),i()},f=p=>{p.target===e&&++d>=l&&h()};setTimeout(()=>{d<l&&h()},r+1),e.addEventListener(u,f)}function tm(e,t){const n=window.getComputedStyle(e),s=g=>(n[g]||"").split(", "),a=s(`${Cs}Delay`),i=s(`${Cs}Duration`),o=_d(a,i),r=s(`${di}Delay`),l=s(`${di}Duration`),u=_d(r,l);let d=null,h=0,f=0;t===Cs?o>0&&(d=Cs,h=o,f=i.length):t===di?u>0&&(d=di,h=u,f=l.length):(h=Math.max(o,u),d=h>0?o>u?Cs:di:null,f=d?d===Cs?i.length:l.length:0);const p=d===Cs&&/\b(?:transform|all)(?:,|$)/.test(s(`${Cs}Property`).toString());return{type:d,timeout:h,propCount:f,hasTransform:p}}function _d(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((n,s)=>Ad(n)+Ad(e[s])))}function Ad(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function tc(e){return(e?e.ownerDocument:document).body.offsetHeight}function Cw(e,t,n){const s=e[$a];s&&(t=(t?[t,...s]:[...s]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const er=Symbol("_vod"),nm=Symbol("_vsh"),Xa={name:"show",beforeMount(e,{value:t},{transition:n}){e[er]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):hi(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:s}){!t!=!n&&(s?t?(s.beforeEnter(e),hi(e,!0),s.enter(e)):s.leave(e,()=>{hi(e,!1)}):hi(e,t))},beforeUnmount(e,{value:t}){hi(e,t)}};function hi(e,t){e.style.display=t?e[er]:"none",e[nm]=!t}const Tw=Symbol(""),Iw=/(?:^|;)\s*display\s*:/;function Ew(e,t,n){const s=e.style,a=pt(n);let i=!1;if(n&&!a){if(t)if(pt(t))for(const o of t.split(";")){const r=o.slice(0,o.indexOf(":")).trim();n[r]==null&&bi(s,r,"")}else for(const o in t)n[o]==null&&bi(s,o,"");for(const o in n){o==="display"&&(i=!0);const r=n[o];r!=null?Ow(e,o,!pt(t)&&t?t[o]:void 0,r)||bi(s,o,r):bi(s,o,"")}}else if(a){if(t!==n){const o=s[Tw];o&&(n+=";"+o),s.cssText=n,i=Iw.test(n)}}else t&&e.removeAttribute("style");er in e&&(e[er]=i?s.display:"",e[nm]&&(s.display="none"))}const Cd=/\s*!important$/;function bi(e,t,n){if(Le(n))n.forEach(s=>bi(e,t,s));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const s=Lw(e,t);Cd.test(n)?e.setProperty(pa(s),n.replace(Cd,""),"important"):e[s]=n}}const Td=["Webkit","Moz","ms"],wl={};function Lw(e,t){const n=wl[t];if(n)return n;let s=Gt(t);if(s!=="filter"&&s in e)return wl[t]=s;s=ws(s);for(let a=0;a<Td.length;a++){const i=Td[a]+s;if(i in e)return wl[t]=i}return t}function Ow(e,t,n,s){return e.tagName==="TEXTAREA"&&(t==="width"||t==="height")&&pt(s)&&n===s}const Id="http://www.w3.org/1999/xlink";function Ed(e,t,n,s,a,i=Fy(t)){s&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Id,t.slice(6,t.length)):e.setAttributeNS(Id,t,n):n==null||i&&!Vf(n)?e.removeAttribute(t):e.setAttribute(t,i?"":Cn(n)?String(n):n)}function Ld(e,t,n,s,a){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Jp(n):n);return}const i=e.tagName;if(t==="value"&&i!=="PROGRESS"&&!i.includes("-")){const r=i==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(r!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const r=typeof e[t];r==="boolean"?n=Vf(n):n==null&&r==="string"?(n="",o=!0):r==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(a||t)}function Nw(e,t,n,s){e.addEventListener(t,n,s)}function Pw(e,t,n,s){e.removeEventListener(t,n,s)}const Od=Symbol("_vei");function Bw(e,t,n,s,a=null){const i=e[Od]||(e[Od]={}),o=i[t];if(s&&o)o.value=s;else{const[r,l]=Dw(t);if(s){const u=i[t]=$w(s,a);Nw(e,r,u,l)}else o&&(Pw(e,r,o,l),i[t]=void 0)}}const Nd=/(?:Once|Passive|Capture)$/;function Dw(e){let t;if(Nd.test(e)){t={};let s;for(;s=e.match(Nd);)e=e.slice(0,e.length-s[0].length),t[s[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):pa(e.slice(2)),t]}let kl=0;const Rw=Promise.resolve(),Mw=()=>kl||(Rw.then(()=>kl=0),kl=Date.now());function $w(e,t){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;Dn(jw(s,n.value),t,5,[s])};return n.value=e,n.attached=Mw(),n}function jw(e,t){if(Le(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(s=>a=>!a._stopped&&s&&s(a))}else return t}const Pd=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Vw=(e,t,n,s,a,i)=>{const o=a==="svg";t==="class"?Cw(e,s,o):t==="style"?Ew(e,n,s):br(t)?wr(t)||Bw(e,t,n,s,i):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Fw(e,t,s,o))?(Ld(e,t,s),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Ed(e,t,s,o,i,t!=="value")):e._isVueCE&&(Ww(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!pt(s)))?Ld(e,Gt(t),s,i,t):(t==="true-value"?e._trueValue=s:t==="false-value"&&(e._falseValue=s),Ed(e,t,s,o))};function Fw(e,t,n,s){if(s)return!!(t==="innerHTML"||t==="textContent"||t in e&&Pd(t)&&Me(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const a=e.tagName;if(a==="IMG"||a==="VIDEO"||a==="CANVAS"||a==="SOURCE")return!1}return Pd(t)&&pt(n)?!1:t in e}function Ww(e,t){const n=e._def.props;if(!n)return!1;const s=Gt(t);return Array.isArray(n)?n.some(a=>Gt(a)===s):Object.keys(n).some(a=>Gt(a)===s)}const sm=new WeakMap,am=new WeakMap,tr=Symbol("_moveCb"),Bd=Symbol("_enterCb"),Hw=e=>(delete e.props.mode,e),qw=Hw({name:"TransitionGroup",props:Et({},Zp,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=io(),s=yp();let a,i;return Hc(()=>{if(!a.length)return;const o=e.moveClass||`${e.name||"v"}-move`;if(!Kw(a[0].el,n.vnode.el,o)){a=[];return}a.forEach(zw),a.forEach(Uw);const r=a.filter(Gw);tc(n.vnode.el),r.forEach(l=>{const u=l.el,d=u.style;Gn(u,o),d.transform=d.webkitTransform=d.transitionDuration="";const h=u[tr]=f=>{f&&f.target!==u||(!f||f.propertyName.endsWith("transform"))&&(u.removeEventListener("transitionend",h),u[tr]=null,Es(u,o))};u.addEventListener("transitionend",h)}),a=[]}),()=>{const o=Te(e),r=em(o);let l=o.tag||ce;if(a=[],i)for(let u=0;u<i.length;u++){const d=i[u];d.el&&d.el instanceof Element&&(a.push(d),da(d,ji(d,r,s,n)),sm.set(d,im(d.el)))}i=t.default?Fc(t.default()):[];for(let u=0;u<i.length;u++){const d=i[u];d.key!=null&&da(d,ji(d,r,s,n))}return S(l,null,i)}}}),Kc=qw;function zw(e){const t=e.el;t[tr]&&t[tr](),t[Bd]&&t[Bd]()}function Uw(e){am.set(e,im(e.el))}function Gw(e){const t=sm.get(e),n=am.get(e),s=t.left-n.left,a=t.top-n.top;if(s||a){const i=e.el,o=i.style,r=i.getBoundingClientRect();let l=1,u=1;return i.offsetWidth&&(l=r.width/i.offsetWidth),i.offsetHeight&&(u=r.height/i.offsetHeight),(!Number.isFinite(l)||l===0)&&(l=1),(!Number.isFinite(u)||u===0)&&(u=1),Math.abs(l-1)<.01&&(l=1),Math.abs(u-1)<.01&&(u=1),o.transform=o.webkitTransform=`translate(${s/l}px,${a/u}px)`,o.transitionDuration="0s",e}}function im(e){const t=e.getBoundingClientRect();return{left:t.left,top:t.top}}function Kw(e,t,n){const s=e.cloneNode(),a=e[$a];a&&a.forEach(r=>{r.split(/\s+/).forEach(l=>l&&s.classList.remove(l))}),n.split(/\s+/).forEach(r=>r&&s.classList.add(r)),s.style.display="none";const i=t.nodeType===1?t:t.parentNode;i.appendChild(s);const{hasTransform:o}=tm(s);return i.removeChild(s),o}const Yw=Et({patchProp:Vw},Sw);let Dd;function Xw(){return Dd||(Dd=nw(Yw))}const Jw=((...e)=>{const t=Xw().createApp(...e),{mount:n}=t;return t.mount=s=>{const a=Zw(s);if(!a)return;const i=t._component;!Me(i)&&!i.render&&!i.template&&(i.template=a.innerHTML),a.nodeType===1&&(a.textContent="");const o=n(a,!1,Qw(a));return a instanceof Element&&(a.removeAttribute("v-cloak"),a.setAttribute("data-v-app","")),o},t});function Qw(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function Zw(e){return pt(e)?document.querySelector(e):e}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Aa=typeof document<"u";function om(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function ek(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&om(e.default)}const tt=Object.assign;function Sl(e,t){const n={};for(const s in t){const a=t[s];n[s]=Rn(a)?a.map(e):e(a)}return n}const Ei=()=>{},Rn=Array.isArray;function Rd(e,t){const n={};for(const s in e)n[s]=s in t?t[s]:e[s];return n}const rm=/#/g,tk=/&/g,nk=/\//g,sk=/=/g,ak=/\?/g,lm=/\+/g,ik=/%5B/g,ok=/%5D/g,cm=/%5E/g,rk=/%60/g,um=/%7B/g,lk=/%7C/g,dm=/%7D/g,ck=/%20/g;function Yc(e){return e==null?"":encodeURI(""+e).replace(lk,"|").replace(ik,"[").replace(ok,"]")}function uk(e){return Yc(e).replace(um,"{").replace(dm,"}").replace(cm,"^")}function nc(e){return Yc(e).replace(lm,"%2B").replace(ck,"+").replace(rm,"%23").replace(tk,"%26").replace(rk,"`").replace(um,"{").replace(dm,"}").replace(cm,"^")}function dk(e){return nc(e).replace(sk,"%3D")}function hk(e){return Yc(e).replace(rm,"%23").replace(ak,"%3F")}function fk(e){return hk(e).replace(nk,"%2F")}function Wi(e){if(e==null)return null;try{return decodeURIComponent(""+e)}catch{}return""+e}const pk=/\/$/,mk=e=>e.replace(pk,"");function xl(e,t,n="/"){let s,a={},i="",o="";const r=t.indexOf("#");let l=t.indexOf("?");return l=r>=0&&l>r?-1:l,l>=0&&(s=t.slice(0,l),i=t.slice(l,r>0?r:t.length),a=e(i.slice(1))),r>=0&&(s=s||t.slice(0,r),o=t.slice(r,t.length)),s=bk(s??t,n),{fullPath:s+i+o,path:s,query:a,hash:Wi(o)}}function gk(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function Md(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function vk(e,t,n){const s=t.matched.length-1,a=n.matched.length-1;return s>-1&&s===a&&ja(t.matched[s],n.matched[a])&&hm(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function ja(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function hm(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!yk(e[n],t[n]))return!1;return!0}function yk(e,t){return Rn(e)?$d(e,t):Rn(t)?$d(t,e):(e==null?void 0:e.valueOf())===(t==null?void 0:t.valueOf())}function $d(e,t){return Rn(t)?e.length===t.length&&e.every((n,s)=>n===t[s]):e.length===1&&e[0]===t}function bk(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),s=e.split("/"),a=s[s.length-1];(a===".."||a===".")&&s.push("");let i=n.length-1,o,r;for(o=0;o<s.length;o++)if(r=s[o],r!==".")if(r==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const Ts={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let sc=(function(e){return e.pop="pop",e.push="push",e})({}),_l=(function(e){return e.back="back",e.forward="forward",e.unknown="",e})({});function wk(e){if(!e)if(Aa){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),mk(e)}const kk=/^[^#]+#/;function Sk(e,t){return e.replace(kk,"#")+t}function xk(e,t){const n=document.documentElement.getBoundingClientRect(),s=e.getBoundingClientRect();return{behavior:t.behavior,left:s.left-n.left-(t.left||0),top:s.top-n.top-(t.top||0)}}const Nr=()=>({left:window.scrollX,top:window.scrollY});function _k(e){let t;if("el"in e){const n=e.el,s=typeof n=="string"&&n.startsWith("#"),a=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!a)return;t=xk(a,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function jd(e,t){return(history.state?history.state.position-t:-1)+e}const ac=new Map;function Ak(e,t){ac.set(e,t)}function Ck(e){const t=ac.get(e);return ac.delete(e),t}function Tk(e){return typeof e=="string"||e&&typeof e=="object"}function fm(e){return typeof e=="string"||typeof e=="symbol"}let bt=(function(e){return e[e.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",e[e.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",e[e.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",e[e.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",e[e.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",e})({});const pm=Symbol("");bt.MATCHER_NOT_FOUND+"",bt.NAVIGATION_GUARD_REDIRECT+"",bt.NAVIGATION_ABORTED+"",bt.NAVIGATION_CANCELLED+"",bt.NAVIGATION_DUPLICATED+"";function Va(e,t){return tt(new Error,{type:e,[pm]:!0},t)}function rs(e,t){return e instanceof Error&&pm in e&&(t==null||!!(e.type&t))}const Ik=["params","query","hash"];function Ek(e){if(typeof e=="string")return e;if(e.path!=null)return e.path;const t={};for(const n of Ik)n in e&&(t[n]=e[n]);return JSON.stringify(t,null,2)}function Lk(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let s=0;s<n.length;++s){const a=n[s].replace(lm," "),i=a.indexOf("="),o=Wi(i<0?a:a.slice(0,i)),r=i<0?null:Wi(a.slice(i+1));if(o in t){let l=t[o];Rn(l)||(l=t[o]=[l]),l.push(r)}else t[o]=r}return t}function Vd(e){let t="";for(let n in e){const s=e[n];if(n=dk(n),s==null){s!==void 0&&(t+=(t.length?"&":"")+n);continue}(Rn(s)?s.map(a=>a&&nc(a)):[s&&nc(s)]).forEach(a=>{a!==void 0&&(t+=(t.length?"&":"")+n,a!=null&&(t+="="+a))})}return t}function Ok(e){const t={};for(const n in e){const s=e[n];s!==void 0&&(t[n]=Rn(s)?s.map(a=>a==null?null:""+a):s==null?s:""+s)}return t}const Nk=Symbol(""),Fd=Symbol(""),Xc=Symbol(""),mm=Symbol(""),ic=Symbol("");function fi(){let e=[];function t(s){return e.push(s),()=>{const a=e.indexOf(s);a>-1&&e.splice(a,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function Os(e,t,n,s,a,i=o=>o()){const o=s&&(s.enterCallbacks[a]=s.enterCallbacks[a]||[]);return()=>new Promise((r,l)=>{const u=f=>{f===!1?l(Va(bt.NAVIGATION_ABORTED,{from:n,to:t})):f instanceof Error?l(f):Tk(f)?l(Va(bt.NAVIGATION_GUARD_REDIRECT,{from:t,to:f})):(o&&s.enterCallbacks[a]===o&&typeof f=="function"&&o.push(f),r())},d=i(()=>e.call(s&&s.instances[a],t,n,u));let h=Promise.resolve(d);e.length<3&&(h=h.then(u)),h.catch(f=>l(f))})}function Al(e,t,n,s,a=i=>i()){const i=[];for(const o of e)for(const r in o.components){let l=o.components[r];if(!(t!=="beforeRouteEnter"&&!o.instances[r]))if(om(l)){const u=(l.__vccOpts||l)[t];u&&i.push(Os(u,n,s,o,r,a))}else{let u=l();i.push(()=>u.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${r}" at "${o.path}"`);const h=ek(d)?d.default:d;o.mods[r]=d,o.components[r]=h;const f=(h.__vccOpts||h)[t];return f&&Os(f,n,s,o,r,a)()}))}}return i}function Pk(e,t){const n=[],s=[],a=[],i=Math.max(t.matched.length,e.matched.length);for(let o=0;o<i;o++){const r=t.matched[o];r&&(e.matched.find(u=>ja(u,r))?s.push(r):n.push(r));const l=e.matched[o];l&&(t.matched.find(u=>ja(u,l))||a.push(l))}return[n,s,a]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Bk=()=>location.protocol+"//"+location.host;function gm(e,t){const{pathname:n,search:s,hash:a}=t,i=e.indexOf("#");if(i>-1){let o=a.includes(e.slice(i))?e.slice(i).length:1,r=a.slice(o);return r[0]!=="/"&&(r="/"+r),Md(r,"")}return Md(n,e)+s+a}function Dk(e,t,n,s){let a=[],i=[],o=null;const r=({state:f})=>{const p=gm(e,location),g=n.value,m=t.value;let v=0;if(f){if(n.value=p,t.value=f,o&&o===g){o=null;return}v=m?f.position-m.position:0}else s(p);a.forEach(y=>{y(n.value,g,{delta:v,type:sc.pop,direction:v?v>0?_l.forward:_l.back:_l.unknown})})};function l(){o=n.value}function u(f){a.push(f);const p=()=>{const g=a.indexOf(f);g>-1&&a.splice(g,1)};return i.push(p),p}function d(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(tt({},f.state,{scroll:Nr()}),"")}}function h(){for(const f of i)f();i=[],window.removeEventListener("popstate",r),window.removeEventListener("pagehide",d),document.removeEventListener("visibilitychange",d)}return window.addEventListener("popstate",r),window.addEventListener("pagehide",d),document.addEventListener("visibilitychange",d),{pauseListeners:l,listen:u,destroy:h}}function Wd(e,t,n,s=!1,a=!1){return{back:e,current:t,forward:n,replaced:s,position:window.history.length,scroll:a?Nr():null}}function Rk(e){const{history:t,location:n}=window,s={value:gm(e,n)},a={value:t.state};a.value||i(s.value,{back:null,current:s.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function i(l,u,d){const h=e.indexOf("#"),f=h>-1?(n.host&&document.querySelector("base")?e:e.slice(h))+l:Bk()+e+l;try{t[d?"replaceState":"pushState"](u,"",f),a.value=u}catch(p){console.error(p),n[d?"replace":"assign"](f)}}function o(l,u){i(l,tt({},t.state,Wd(a.value.back,l,a.value.forward,!0),u,{position:a.value.position}),!0),s.value=l}function r(l,u){const d=tt({},a.value,t.state,{forward:l,scroll:Nr()});i(d.current,d,!0),i(l,tt({},Wd(s.value,l,null),{position:d.position+1},u),!1),s.value=l}return{location:s,state:a,push:r,replace:o}}function Mk(e){e=wk(e);const t=Rk(e),n=Dk(e,t.state,t.location,t.replace);function s(i,o=!0){o||n.pauseListeners(),history.go(i)}const a=tt({location:"",base:e,go:s,createHref:Sk.bind(null,e)},t,n);return Object.defineProperty(a,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(a,"state",{enumerable:!0,get:()=>t.state.value}),a}let ea=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.Group=2]="Group",e})({});var Pt=(function(e){return e[e.Static=0]="Static",e[e.Param=1]="Param",e[e.ParamRegExp=2]="ParamRegExp",e[e.ParamRegExpEnd=3]="ParamRegExpEnd",e[e.EscapeNext=4]="EscapeNext",e})(Pt||{});const $k={type:ea.Static,value:""},jk=/[a-zA-Z0-9_]/;function Vk(e){if(!e)return[[]];if(e==="/")return[[$k]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(p){throw new Error(`ERR (${n})/"${u}": ${p}`)}let n=Pt.Static,s=n;const a=[];let i;function o(){i&&a.push(i),i=[]}let r=0,l,u="",d="";function h(){u&&(n===Pt.Static?i.push({type:ea.Static,value:u}):n===Pt.Param||n===Pt.ParamRegExp||n===Pt.ParamRegExpEnd?(i.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:ea.Param,value:u,regexp:d,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),u="")}function f(){u+=l}for(;r<e.length;){if(l=e[r++],l==="\\"&&n!==Pt.ParamRegExp){s=n,n=Pt.EscapeNext;continue}switch(n){case Pt.Static:l==="/"?(u&&h(),o()):l===":"?(h(),n=Pt.Param):f();break;case Pt.EscapeNext:f(),n=s;break;case Pt.Param:l==="("?n=Pt.ParamRegExp:jk.test(l)?f():(h(),n=Pt.Static,l!=="*"&&l!=="?"&&l!=="+"&&r--);break;case Pt.ParamRegExp:l===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+l:n=Pt.ParamRegExpEnd:d+=l;break;case Pt.ParamRegExpEnd:h(),n=Pt.Static,l!=="*"&&l!=="?"&&l!=="+"&&r--,d="";break;default:t("Unknown state");break}}return n===Pt.ParamRegExp&&t(`Unfinished custom RegExp for param "${u}"`),h(),o(),a}const Hd="[^/]+?",Fk={sensitive:!1,strict:!1,start:!0,end:!0};var Qt=(function(e){return e[e._multiplier=10]="_multiplier",e[e.Root=90]="Root",e[e.Segment=40]="Segment",e[e.SubSegment=30]="SubSegment",e[e.Static=40]="Static",e[e.Dynamic=20]="Dynamic",e[e.BonusCustomRegExp=10]="BonusCustomRegExp",e[e.BonusWildcard=-50]="BonusWildcard",e[e.BonusRepeatable=-20]="BonusRepeatable",e[e.BonusOptional=-8]="BonusOptional",e[e.BonusStrict=.7000000000000001]="BonusStrict",e[e.BonusCaseSensitive=.25]="BonusCaseSensitive",e})(Qt||{});const Wk=/[.+*?^${}()[\]/\\]/g;function Hk(e,t){const n=tt({},Fk,t),s=[];let a=n.start?"^":"";const i=[];for(const u of e){const d=u.length?[]:[Qt.Root];n.strict&&!u.length&&(a+="/");for(let h=0;h<u.length;h++){const f=u[h];let p=Qt.Segment+(n.sensitive?Qt.BonusCaseSensitive:0);if(f.type===ea.Static)h||(a+="/"),a+=f.value.replace(Wk,"\\$&"),p+=Qt.Static;else if(f.type===ea.Param){const{value:g,repeatable:m,optional:v,regexp:y}=f;i.push({name:g,repeatable:m,optional:v});const w=y||Hd;if(w!==Hd){p+=Qt.BonusCustomRegExp;try{`${w}`}catch(T){throw new Error(`Invalid custom RegExp for param "${g}" (${w}): `+T.message)}}let x=m?`((?:${w})(?:/(?:${w}))*)`:`(${w})`;h||(x=v&&u.length<2?`(?:/${x})`:"/"+x),v&&(x+="?"),a+=x,p+=Qt.Dynamic,v&&(p+=Qt.BonusOptional),m&&(p+=Qt.BonusRepeatable),w===".*"&&(p+=Qt.BonusWildcard)}d.push(p)}s.push(d)}if(n.strict&&n.end){const u=s.length-1;s[u][s[u].length-1]+=Qt.BonusStrict}n.strict||(a+="/?"),n.end?a+="$":n.strict&&!a.endsWith("/")&&(a+="(?:/|$)");const o=new RegExp(a,n.sensitive?"":"i");function r(u){const d=u.match(o),h={};if(!d)return null;for(let f=1;f<d.length;f++){const p=d[f]||"",g=i[f-1];h[g.name]=p&&g.repeatable?p.split("/"):p}return h}function l(u){let d="",h=!1;for(const f of e){(!h||!d.endsWith("/"))&&(d+="/"),h=!1;for(const p of f)if(p.type===ea.Static)d+=p.value;else if(p.type===ea.Param){const{value:g,repeatable:m,optional:v}=p,y=g in u?u[g]:"";if(Rn(y)&&!m)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const w=Rn(y)?y.join("/"):y;if(!w)if(v)f.length<2&&(d.endsWith("/")?d=d.slice(0,-1):h=!0);else throw new Error(`Missing required param "${g}"`);d+=w}}return d||"/"}return{re:o,score:s,keys:i,parse:r,stringify:l}}function qk(e,t){let n=0;for(;n<e.length&&n<t.length;){const s=t[n]-e[n];if(s)return s;n++}return e.length<t.length?e.length===1&&e[0]===Qt.Static+Qt.Segment?-1:1:e.length>t.length?t.length===1&&t[0]===Qt.Static+Qt.Segment?1:-1:0}function vm(e,t){let n=0;const s=e.score,a=t.score;for(;n<s.length&&n<a.length;){const i=qk(s[n],a[n]);if(i)return i;n++}if(Math.abs(a.length-s.length)===1){if(qd(s))return 1;if(qd(a))return-1}return a.length-s.length}function qd(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const zk={strict:!1,end:!0,sensitive:!1};function Uk(e,t,n){const s=Hk(Vk(e.path),n),a=tt(s,{record:e,parent:t,children:[],alias:[]});return t&&!a.record.aliasOf==!t.record.aliasOf&&t.children.push(a),a}function Gk(e,t){const n=[],s=new Map;t=Rd(zk,t);function a(h){return s.get(h)}function i(h,f,p){const g=!p,m=Ud(h);m.aliasOf=p&&p.record;const v=Rd(t,h),y=[m];if("alias"in h){const T=typeof h.alias=="string"?[h.alias]:h.alias;for(const C of T)y.push(Ud(tt({},m,{components:p?p.record.components:m.components,path:C,aliasOf:p?p.record:m})))}let w,x;for(const T of y){const{path:C}=T;if(f&&C[0]!=="/"){const _=f.record.path,I=_[_.length-1]==="/"?"":"/";T.path=f.record.path+(C&&I+C)}if(w=Uk(T,f,v),p?p.alias.push(w):(x=x||w,x!==w&&x.alias.push(w),g&&h.name&&!Gd(w)&&o(h.name)),ym(w)&&l(w),m.children){const _=m.children;for(let I=0;I<_.length;I++)i(_[I],w,p&&p.children[I])}p=p||w}return x?()=>{o(x)}:Ei}function o(h){if(fm(h)){const f=s.get(h);f&&(s.delete(h),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(h);f>-1&&(n.splice(f,1),h.record.name&&s.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function r(){return n}function l(h){const f=Xk(h,n);n.splice(f,0,h),h.record.name&&!Gd(h)&&s.set(h.record.name,h)}function u(h,f){let p,g={},m,v;if("name"in h&&h.name){if(p=s.get(h.name),!p)throw Va(bt.MATCHER_NOT_FOUND,{location:h});v=p.record.name,g=tt(zd(f.params,p.keys.filter(x=>!x.optional).concat(p.parent?p.parent.keys.filter(x=>x.optional):[]).map(x=>x.name)),h.params&&zd(h.params,p.keys.map(x=>x.name))),m=p.stringify(g)}else if(h.path!=null)m=h.path,p=n.find(x=>x.re.test(m)),p&&(g=p.parse(m),v=p.record.name);else{if(p=f.name?s.get(f.name):n.find(x=>x.re.test(f.path)),!p)throw Va(bt.MATCHER_NOT_FOUND,{location:h,currentLocation:f});v=p.record.name,g=tt({},f.params,h.params),m=p.stringify(g)}const y=[];let w=p;for(;w;)y.unshift(w.record),w=w.parent;return{name:v,path:m,params:g,matched:y,meta:Yk(y)}}e.forEach(h=>i(h));function d(){n.length=0,s.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:d,getRoutes:r,getRecordMatcher:a}}function zd(e,t){const n={};for(const s of t)s in e&&(n[s]=e[s]);return n}function Ud(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:Kk(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function Kk(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const s in e.components)t[s]=typeof n=="object"?n[s]:n;return t}function Gd(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function Yk(e){return e.reduce((t,n)=>tt(t,n.meta),{})}function Xk(e,t){let n=0,s=t.length;for(;n!==s;){const i=n+s>>1;vm(e,t[i])<0?s=i:n=i+1}const a=Jk(e);return a&&(s=t.lastIndexOf(a,s-1)),s}function Jk(e){let t=e;for(;t=t.parent;)if(ym(t)&&vm(e,t)===0)return t}function ym({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function Kd(e){const t=Xe(Xc),n=Xe(mm),s=N(()=>{const l=zt(e.to);return t.resolve(l)}),a=N(()=>{const{matched:l}=s.value,{length:u}=l,d=l[u-1],h=n.matched;if(!d||!h.length)return-1;const f=h.findIndex(ja.bind(null,d));if(f>-1)return f;const p=Yd(l[u-2]);return u>1&&Yd(d)===p&&h[h.length-1].path!==p?h.findIndex(ja.bind(null,l[u-2])):f}),i=N(()=>a.value>-1&&n0(n.params,s.value.params)),o=N(()=>a.value>-1&&a.value===n.matched.length-1&&hm(n.params,s.value.params));function r(l={}){if(t0(l)){const u=t[zt(e.replace)?"replace":"push"](zt(e.to)).catch(Ei);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:N(()=>s.value.href),isActive:i,isExactActive:o,navigate:r}}function Qk(e){return e.length===1?e[0]:e}const Zk=Ct({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Kd,setup(e,{slots:t}){const n=jt(Kd(e)),{options:s}=Xe(Xc),a=N(()=>({[Xd(e.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[Xd(e.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=t.default&&Qk(t.default(n));return e.custom?i:Mn("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:a.value},i)}}}),e0=Zk;function t0(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function n0(e,t){for(const n in t){const s=t[n],a=e[n];if(typeof s=="string"){if(s!==a)return!1}else if(!Rn(a)||a.length!==s.length||s.some((i,o)=>i.valueOf()!==a[o].valueOf()))return!1}return!0}function Yd(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Xd=(e,t,n)=>e??t??n,s0=Ct({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const s=Xe(ic),a=N(()=>e.route||s.value),i=Xe(Fd,0),o=N(()=>{let u=zt(i);const{matched:d}=a.value;let h;for(;(h=d[u])&&!h.components;)u++;return u}),r=N(()=>a.value.matched[o.value]);Dt(Fd,N(()=>o.value+1)),Dt(Nk,r),Dt(ic,a);const l=Pe();return Oe(()=>[l.value,r.value,e.name],([u,d,h],[f,p,g])=>{d&&(d.instances[h]=u,p&&p!==d&&u&&u===f&&(d.leaveGuards.size||(d.leaveGuards=p.leaveGuards),d.updateGuards.size||(d.updateGuards=p.updateGuards))),u&&d&&(!p||!ja(d,p)||!f)&&(d.enterCallbacks[h]||[]).forEach(m=>m(u))},{flush:"post"}),()=>{const u=a.value,d=e.name,h=r.value,f=h&&h.components[d];if(!f)return Jd(n.default,{Component:f,route:u});const p=h.props[d],g=p?p===!0?u.params:typeof p=="function"?p(u):p:null,v=Mn(f,tt({},g,t,{onVnodeUnmounted:y=>{y.component.isUnmounted&&(h.instances[d]=null)},ref:l}));return Jd(n.default,{Component:v,route:u})||v}}});function Jd(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const a0=s0;function i0(e){const t=Gk(e.routes,e),n=e.parseQuery||Lk,s=e.stringifyQuery||Vd,a=e.history,i=fi(),o=fi(),r=fi(),l=be(Ts);let u=Ts;Aa&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Sl.bind(null,M=>""+M),h=Sl.bind(null,fk),f=Sl.bind(null,Wi);function p(M,Z){let ae,Q;return fm(M)?(ae=t.getRecordMatcher(M),Q=Z):Q=M,t.addRoute(Q,ae)}function g(M){const Z=t.getRecordMatcher(M);Z&&t.removeRoute(Z)}function m(){return t.getRoutes().map(M=>M.record)}function v(M){return!!t.getRecordMatcher(M)}function y(M,Z){if(Z=tt({},Z||l.value),typeof M=="string"){const P=xl(n,M,Z.path),F=t.resolve({path:P.path},Z),G=a.createHref(P.fullPath);return tt(P,F,{params:f(F.params),hash:Wi(P.hash),redirectedFrom:void 0,href:G})}let ae;if(M.path!=null)ae=tt({},M,{path:xl(n,M.path,Z.path).path});else{const P=tt({},M.params);for(const F in P)P[F]==null&&delete P[F];ae=tt({},M,{params:h(P)}),Z.params=h(Z.params)}const Q=t.resolve(ae,Z),Ae=M.hash||"";Q.params=d(f(Q.params));const A=gk(s,tt({},M,{hash:uk(Ae),path:Q.path})),E=a.createHref(A);return tt({fullPath:A,hash:Ae,query:s===Vd?Ok(M.query):M.query||{}},Q,{redirectedFrom:void 0,href:E})}function w(M){return typeof M=="string"?xl(n,M,l.value.path):tt({},M)}function x(M,Z){if(u!==M)return Va(bt.NAVIGATION_CANCELLED,{from:Z,to:M})}function T(M){return I(M)}function C(M){return T(tt(w(M),{replace:!0}))}function _(M,Z){const ae=M.matched[M.matched.length-1];if(ae&&ae.redirect){const{redirect:Q}=ae;let Ae=typeof Q=="function"?Q(M,Z):Q;return typeof Ae=="string"&&(Ae=Ae.includes("?")||Ae.includes("#")?Ae=w(Ae):{path:Ae},Ae.params={}),tt({query:M.query,hash:M.hash,params:Ae.path!=null?{}:M.params},Ae)}}function I(M,Z){const ae=u=y(M),Q=l.value,Ae=M.state,A=M.force,E=M.replace===!0,P=_(ae,Q);if(P)return I(tt(w(P),{state:typeof P=="object"?tt({},Ae,P.state):Ae,force:A,replace:E}),Z||ae);const F=ae;F.redirectedFrom=Z;let G;return!A&&vk(s,Q,ae)&&(G=Va(bt.NAVIGATION_DUPLICATED,{to:F,from:Q}),Se(Q,Q,!0,!1)),(G?Promise.resolve(G):$(F,Q)).catch(W=>rs(W)?rs(W,bt.NAVIGATION_GUARD_REDIRECT)?W:Ve(W):ge(W,F,Q)).then(W=>{if(W){if(rs(W,bt.NAVIGATION_GUARD_REDIRECT))return I(tt({replace:E},w(W.to),{state:typeof W.to=="object"?tt({},Ae,W.to.state):Ae,force:A}),Z||F)}else W=R(F,Q,!0,E,Ae);return q(F,Q,W),W})}function k(M,Z){const ae=x(M,Z);return ae?Promise.reject(ae):Promise.resolve()}function O(M){const Z=Ie.values().next().value;return Z&&typeof Z.runWithContext=="function"?Z.runWithContext(M):M()}function $(M,Z){let ae;const[Q,Ae,A]=Pk(M,Z);ae=Al(Q.reverse(),"beforeRouteLeave",M,Z);for(const P of Q)P.leaveGuards.forEach(F=>{ae.push(Os(F,M,Z))});const E=k.bind(null,M,Z);return ae.push(E),it(ae).then(()=>{ae=[];for(const P of i.list())ae.push(Os(P,M,Z));return ae.push(E),it(ae)}).then(()=>{ae=Al(Ae,"beforeRouteUpdate",M,Z);for(const P of Ae)P.updateGuards.forEach(F=>{ae.push(Os(F,M,Z))});return ae.push(E),it(ae)}).then(()=>{ae=[];for(const P of A)if(P.beforeEnter)if(Rn(P.beforeEnter))for(const F of P.beforeEnter)ae.push(Os(F,M,Z));else ae.push(Os(P.beforeEnter,M,Z));return ae.push(E),it(ae)}).then(()=>(M.matched.forEach(P=>P.enterCallbacks={}),ae=Al(A,"beforeRouteEnter",M,Z,O),ae.push(E),it(ae))).then(()=>{ae=[];for(const P of o.list())ae.push(Os(P,M,Z));return ae.push(E),it(ae)}).catch(P=>rs(P,bt.NAVIGATION_CANCELLED)?P:Promise.reject(P))}function q(M,Z,ae){r.list().forEach(Q=>O(()=>Q(M,Z,ae)))}function R(M,Z,ae,Q,Ae){const A=x(M,Z);if(A)return A;const E=Z===Ts,P=Aa?history.state:{};ae&&(Q||E?a.replace(M.fullPath,tt({scroll:E&&P&&P.scroll},Ae)):a.push(M.fullPath,Ae)),l.value=M,Se(M,Z,ae,E),Ve()}let z;function se(){z||(z=a.listen((M,Z,ae)=>{if(!mt.listening)return;const Q=y(M),Ae=_(Q,mt.currentRoute.value);if(Ae){I(tt(Ae,{replace:!0,force:!0}),Q).catch(Ei);return}u=Q;const A=l.value;Aa&&Ak(jd(A.fullPath,ae.delta),Nr()),$(Q,A).catch(E=>rs(E,bt.NAVIGATION_ABORTED|bt.NAVIGATION_CANCELLED)?E:rs(E,bt.NAVIGATION_GUARD_REDIRECT)?(I(tt(w(E.to),{force:!0}),Q).then(P=>{rs(P,bt.NAVIGATION_ABORTED|bt.NAVIGATION_DUPLICATED)&&!ae.delta&&ae.type===sc.pop&&a.go(-1,!1)}).catch(Ei),Promise.reject()):(ae.delta&&a.go(-ae.delta,!1),ge(E,Q,A))).then(E=>{E=E||R(Q,A,!1),E&&(ae.delta&&!rs(E,bt.NAVIGATION_CANCELLED)?a.go(-ae.delta,!1):ae.type===sc.pop&&rs(E,bt.NAVIGATION_ABORTED|bt.NAVIGATION_DUPLICATED)&&a.go(-1,!1)),q(Q,A,E)}).catch(Ei)}))}let re=fi(),we=fi(),me;function ge(M,Z,ae){Ve(M);const Q=we.list();return Q.length?Q.forEach(Ae=>Ae(M,Z,ae)):console.error(M),Promise.reject(M)}function Ze(){return me&&l.value!==Ts?Promise.resolve():new Promise((M,Z)=>{re.add([M,Z])})}function Ve(M){return me||(me=!M,se(),re.list().forEach(([Z,ae])=>M?ae(M):Z()),re.reset()),M}function Se(M,Z,ae,Q){const{scrollBehavior:Ae}=e;if(!Aa||!Ae)return Promise.resolve();const A=!ae&&Ck(jd(M.fullPath,0))||(Q||!ae)&&history.state&&history.state.scroll||null;return It().then(()=>Ae(M,Z,A)).then(E=>E&&_k(E)).catch(E=>ge(E,M,Z))}const X=M=>a.go(M);let J;const Ie=new Set,mt={currentRoute:l,listening:!0,addRoute:p,removeRoute:g,clearRoutes:t.clearRoutes,hasRoute:v,getRoutes:m,resolve:y,options:e,push:T,replace:C,go:X,back:()=>X(-1),forward:()=>X(1),beforeEach:i.add,beforeResolve:o.add,afterEach:r.add,onError:we.add,isReady:Ze,install(M){M.component("RouterLink",e0),M.component("RouterView",a0),M.config.globalProperties.$router=mt,Object.defineProperty(M.config.globalProperties,"$route",{enumerable:!0,get:()=>zt(l)}),Aa&&!J&&l.value===Ts&&(J=!0,T(a.location).catch(Q=>{}));const Z={};for(const Q in Ts)Object.defineProperty(Z,Q,{get:()=>l.value[Q],enumerable:!0});M.provide(Xc,mt),M.provide(mm,ip(Z)),M.provide(ic,l);const ae=M.unmount;Ie.add(M),M.unmount=function(){Ie.delete(M),Ie.size<1&&(u=Ts,z&&z(),z=null,l.value=Ts,J=!1,me=!1),ae()}}};function it(M){return M.reduce((Z,ae)=>Z.then(()=>O(ae)),Promise.resolve())}return mt}function bm(e,t){t=Array.isArray(t)?t.slice(0,-1).map(n=>`'${n}'`).join(", ")+` or '${t.at(-1)}'`:`'${t}'`}const rt=typeof window<"u",Jc=rt&&"IntersectionObserver"in window,o0=rt&&("ontouchstart"in window||window.navigator.maxTouchPoints>0),wm=rt&&"matchMedia"in window&&typeof window.matchMedia=="function",Fa=()=>wm&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;function Qd(e,t,n){r0(e,t),t.set(e,n)}function r0(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function Zd(e,t,n){return e.set(km(e,t),n),n}function ls(e,t){return e.get(km(e,t))}function km(e,t,n){if(typeof e=="function"?e===t:e.has(t))return arguments.length<3?t:n;throw new TypeError("Private element is not present on this object")}function Sm(e,t,n){const s=t.length-1;if(s<0)return e===void 0?n:e;for(let a=0;a<s;a++){if(e==null)return n;e=e[t[a]]}return e==null||e[t[s]]===void 0?n:e[t[s]]}function oc(e,t,n){return e==null||!t||typeof t!="string"?n:e[t]!==void 0?e[t]:(t=t.replace(/\[(\w+)\]/g,".$1"),t=t.replace(/^\./,""),Sm(e,t.split("."),n))}function pi(e,t,n){if(t===!0)return e===void 0?n:e;if(t==null||typeof t=="boolean")return n;if(e!==Object(e)){if(typeof t!="function")return n;const a=t(e,n);return typeof a>"u"?n:a}if(typeof t=="string")return oc(e,t,n);if(Array.isArray(t))return Sm(e,t,n);if(typeof t!="function")return n;const s=t(e,n);return typeof s>"u"?n:s}function xm(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;return Array.from({length:e},(n,s)=>t+s)}function pe(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"px";if(e==null||e==="")return;const n=Number(e);return isNaN(n)?String(e):isFinite(n)?`${n}${t}`:void 0}function nr(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function eh(e){let t;return e!==null&&typeof e=="object"&&((t=Object.getPrototypeOf(e))===Object.prototype||t===null)}function _m(e){if(e&&"$el"in e){const t=e.$el;return(t==null?void 0:t.nodeType)===Node.TEXT_NODE?t.nextElementSibling:t}return e}function Am(e){return Object.keys(e)}function Cl(e,t){return t.every(n=>e.hasOwnProperty(n))}function Pr(e,t){const n={};for(const s of t)Object.prototype.hasOwnProperty.call(e,s)&&(n[s]=e[s]);return n}function ss(e,t){const n={...e};return t.forEach(s=>delete n[s]),n}const l0=/^on[^a-z]/,Cm=e=>l0.test(e);function Qc(e){return e==null?[]:Array.isArray(e)?e:[e]}function ts(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:1;return Math.max(t,Math.min(n,e))}function th(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"0";return e+n.repeat(Math.max(0,t-e.length))}function nh(e,t){return(arguments.length>2&&arguments[2]!==void 0?arguments[2]:"0").repeat(Math.max(0,t-e.length))+e}function c0(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;const n=[];let s=0;for(;s<e.length;)n.push(e.substr(s,t)),s+=t;return n}function Ut(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0;const s={};for(const a in e)s[a]=e[a];for(const a in t){const i=e[a],o=t[a];if(eh(i)&&eh(o)){s[a]=Ut(i,o,n);continue}if(n&&Array.isArray(i)&&Array.isArray(o)){s[a]=n(i,o);continue}s[a]=o}return s}function Tm(e){return e.map(t=>t.type===ce?Tm(t.children):t).flat()}function oa(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";if(oa.cache.has(e))return oa.cache.get(e);const t=e.replace(/[^a-z]/gi,"-").replace(/\B([A-Z])/g,"-$1").toLowerCase();return oa.cache.set(e,t),t}oa.cache=new Map;function Ca(e,t){if(!t||typeof t!="object")return[];if(Array.isArray(t))return t.map(n=>Ca(e,n)).flat(1);if(t.suspense)return Ca(e,t.ssContent);if(Array.isArray(t.children))return t.children.map(n=>Ca(e,n)).flat(1);if(t.component){if(Object.getOwnPropertyDescriptor(t.component.provides,e))return[t.component];if(t.component.subTree)return Ca(e,t.component.subTree).flat(1)}return[]}var ba=new WeakMap,Ks=new WeakMap;class u0{constructor(t){Qd(this,ba,[]),Qd(this,Ks,0),this.size=t}get isFull(){return ls(ba,this).length===this.size}push(t){ls(ba,this)[ls(Ks,this)]=t,Zd(Ks,this,(ls(Ks,this)+1)%this.size)}values(){return ls(ba,this).slice(ls(Ks,this)).concat(ls(ba,this).slice(0,ls(Ks,this)))}clear(){ls(ba,this).length=0,Zd(Ks,this,0)}}function Zc(e){const t=jt({});mn(()=>{const s=e();for(const a in s)t[a]=s[a]},{flush:"sync"});const n={};for(const s in t)n[s]=j(()=>t[s]);return n}function sr(e,t){return e.includes(t)}function Im(e){return e[2].toLowerCase()+e.slice(3)}const ra=()=>[Function,Array];function sh(e,t){return t="on"+ws(t),!!(e[t]||e[`${t}Once`]||e[`${t}Capture`]||e[`${t}OnceCapture`]||e[`${t}CaptureOnce`])}function la(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const n=["button","[href]",'input:not([type="hidden"])',"select","textarea","details:not(:has(> summary))","details > summary","[tabindex]",'[contenteditable]:not([contenteditable="false"])',"audio[controls]","video[controls]"].map(a=>`${a}${t?':not([tabindex="-1"])':""}:not([disabled], [inert])`).join(", ");let s;try{s=[...e.querySelectorAll(n)]}catch{return[]}return s.filter(a=>!a.closest("[inert]")).filter(a=>!!a.offsetParent||a.getClientRects().length>0).filter(a=>{var i,o;return!((i=a.parentElement)!=null&&i.closest("details:not([open])"))||a.tagName==="SUMMARY"&&((o=a.parentElement)==null?void 0:o.tagName)==="DETAILS"})}function Em(e,t,n){let s,a=e.indexOf(document.activeElement);const i=t==="next"?1:-1;do a+=i,s=e[a];while((!s||s.offsetParent==null||!((n==null?void 0:n(s))??!0))&&a<e.length&&a>=0);return s}function Li(e,t,n){var a,i,o,r;const s=la(e);if(t==null)(e===document.activeElement||!e.contains(document.activeElement))&&((a=s[0])==null||a.focus(n));else if(t==="first")(i=s[0])==null||i.focus(n);else if(t==="last")(o=s.at(-1))==null||o.focus(n);else if(typeof t=="number")(r=s[t])==null||r.focus(n);else{const l=Em(s,t);l?l.focus():Li(e,t==="next"?"first":"last",n)}}function d0(e,t){if(!(rt&&typeof CSS<"u"&&typeof CSS.supports<"u"&&CSS.supports(`selector(${t})`)))return null;try{return!!e&&e.matches(t)}catch{return null}}function h0(e,t){if(!rt||e===0)return t(),()=>{};const n=window.setTimeout(t,e);return()=>window.clearTimeout(n)}function f0(e,t){const n=e.clientX,s=e.clientY,a=t.getBoundingClientRect(),i=a.left,o=a.top,r=a.right,l=a.bottom;return n>=i&&n<=r&&s>=o&&s<=l}function rc(){const e=be(),t=n=>{e.value=n};return Object.defineProperty(t,"value",{enumerable:!0,get:()=>e.value,set:n=>e.value=n}),Object.defineProperty(t,"el",{enumerable:!0,get:()=>_m(e.value)}),t}function Wa(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"||typeof e=="bigint"}function p0(e){const t=["checked","disabled"];return Object.fromEntries(Object.entries(e).filter(n=>{let[s,a]=n;return t.includes(s)?!!a:a!==void 0}))}const Lm=["top","bottom"],m0=["start","end","left","right"];function lc(e,t){let[n,s]=e.split(" ");return s||(s=sr(Lm,n)?"start":sr(m0,n)?"top":"center"),{side:ah(n,t),align:ah(s,t)}}function ah(e,t){return e==="start"?t?"right":"left":e==="end"?t?"left":"right":e}function Tl(e){return{side:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.side],align:e.align}}function Il(e){return{side:e.side,align:{center:"center",top:"bottom",bottom:"top",left:"right",right:"left"}[e.align]}}function ih(e){return{side:e.align,align:e.side}}function oh(e){return sr(Lm,e.side)?"y":"x"}class dn{constructor(t){const n=document.body.currentCSSZoom??1,s=t instanceof Element,a=s?1+(1-n)/n:1,{x:i,y:o,width:r,height:l}=s?t.getBoundingClientRect():t;this.x=i*a,this.y=o*a,this.width=r*a,this.height=l*a}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function rh(e,t){return{x:{before:Math.max(0,t.left-e.left),after:Math.max(0,e.right-t.right)},y:{before:Math.max(0,t.top-e.top),after:Math.max(0,e.bottom-t.bottom)}}}function eu(e){if(Array.isArray(e)){const t=document.body.currentCSSZoom??1,n=1+(1-t)/t;return new dn({x:e[0]*n,y:e[1]*n,width:0*n,height:0*n})}else return new dn(e)}function g0(e){if(e===document.documentElement)if(visualViewport){const t=document.body.currentCSSZoom??1;return new dn({x:visualViewport.scale>1?0:visualViewport.offsetLeft,y:visualViewport.scale>1?0:visualViewport.offsetTop,width:visualViewport.width*visualViewport.scale/t,height:visualViewport.height*visualViewport.scale/t})}else return new dn({x:0,y:0,width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});else return new dn(e)}function Om(e){const t=new dn(e),n=getComputedStyle(e),s=n.transform;if(s){let a,i,o,r,l;if(s.startsWith("matrix3d("))a=s.slice(9,-1).split(/, /),i=Number(a[0]),o=Number(a[5]),r=Number(a[12]),l=Number(a[13]);else if(s.startsWith("matrix("))a=s.slice(7,-1).split(/, /),i=Number(a[0]),o=Number(a[3]),r=Number(a[4]),l=Number(a[5]);else return new dn(t);const u=n.transformOrigin,d=t.x-r-(1-i)*parseFloat(u),h=t.y-l-(1-o)*parseFloat(u.slice(u.indexOf(" ")+1)),f=i?t.width/i:e.offsetWidth+1,p=o?t.height/o:e.offsetHeight+1;return new dn({x:d,y:h,width:f,height:p})}else return new dn(t)}function Ns(e,t,n){if(typeof e.animate>"u")return{finished:Promise.resolve()};let s;try{s=e.animate(t,n)}catch{return{finished:Promise.resolve()}}return typeof s.finished>"u"&&(s.finished=new Promise(a=>{s.onfinish=()=>{a(s)}})),s}const jo=new WeakMap;function v0(e,t){Object.keys(t).forEach(n=>{if(Cm(n)){const s=Im(n),a=jo.get(e);if(t[n]==null)a==null||a.forEach(i=>{const[o,r]=i;o===s&&(e.removeEventListener(s,r),a.delete(i))});else if(!a||![...a].some(i=>i[0]===s&&i[1]===t[n])){e.addEventListener(s,t[n]);const i=a||new Set;i.add([s,t[n]]),jo.has(e)||jo.set(e,i)}}else t[n]==null?e.removeAttribute(n):e.setAttribute(n,t[n])})}function y0(e,t){Object.keys(t).forEach(n=>{if(Cm(n)){const s=Im(n),a=jo.get(e);a==null||a.forEach(i=>{const[o,r]=i;o===s&&(e.removeEventListener(s,r),a.delete(i))})}else e.removeAttribute(n)})}const wa=2.4,lh=.2126729,ch=.7151522,uh=.072175,b0=.55,w0=.58,k0=.57,S0=.62,Io=.03,dh=1.45,x0=5e-4,_0=1.25,A0=1.25,hh=.078,fh=12.82051282051282,Eo=.06,ph=.001;function mh(e,t){const n=(e.r/255)**wa,s=(e.g/255)**wa,a=(e.b/255)**wa,i=(t.r/255)**wa,o=(t.g/255)**wa,r=(t.b/255)**wa;let l=n*lh+s*ch+a*uh,u=i*lh+o*ch+r*uh;if(l<=Io&&(l+=(Io-l)**dh),u<=Io&&(u+=(Io-u)**dh),Math.abs(u-l)<x0)return 0;let d;if(u>l){const h=(u**b0-l**w0)*_0;d=h<ph?0:h<hh?h-h*fh*Eo:h-Eo}else{const h=(u**S0-l**k0)*A0;d=h>-ph?0:h>-hh?h-h*fh*Eo:h+Eo}return d*100}const ar=.20689655172413793,C0=e=>e>ar**3?Math.cbrt(e):e/(3*ar**2)+4/29,T0=e=>e>ar?e**3:3*ar**2*(e-4/29);function Nm(e){const t=C0,n=t(e[1]);return[116*n-16,500*(t(e[0]/.95047)-n),200*(n-t(e[2]/1.08883))]}function Pm(e){const t=T0,n=(e[0]+16)/116;return[t(n+e[1]/500)*.95047,t(n),t(n-e[2]/200)*1.08883]}const I0=[[3.2406,-1.5372,-.4986],[-.9689,1.8758,.0415],[.0557,-.204,1.057]],E0=e=>e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055,L0=[[.4124,.3576,.1805],[.2126,.7152,.0722],[.0193,.1192,.9505]],O0=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4;function Bm(e){const t=Array(3),n=E0,s=I0;for(let a=0;a<3;++a)t[a]=Math.round(ts(n(s[a][0]*e[0]+s[a][1]*e[1]+s[a][2]*e[2]))*255);return{r:t[0],g:t[1],b:t[2]}}function tu(e){let{r:t,g:n,b:s}=e;const a=[0,0,0],i=O0,o=L0;t=i(t/255),n=i(n/255),s=i(s/255);for(let r=0;r<3;++r)a[r]=o[r][0]*t+o[r][1]*n+o[r][2]*s;return a}function cc(e){return!!e&&/^(#|var\(--|(rgb|hsl)a?\()/.test(e)}function N0(e){return cc(e)&&!/^((rgb|hsl)a?\()?var\(--/.test(e)}const gh=/^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/,P0={rgb:(e,t,n,s)=>({r:e,g:t,b:n,a:s}),rgba:(e,t,n,s)=>({r:e,g:t,b:n,a:s}),hsl:(e,t,n,s)=>vh({h:e,s:t,l:n,a:s}),hsla:(e,t,n,s)=>vh({h:e,s:t,l:n,a:s}),hsv:(e,t,n,s)=>Hi({h:e,s:t,v:n,a:s}),hsva:(e,t,n,s)=>Hi({h:e,s:t,v:n,a:s})};function Zn(e){if(typeof e=="number")return{r:(e&16711680)>>16,g:(e&65280)>>8,b:e&255};if(typeof e=="string"&&gh.test(e)){const{groups:t}=e.match(gh),{fn:n,values:s}=t,a=s.split(/,\s*|\s*\/\s*|\s+/).map((i,o)=>i.endsWith("%")||o>0&&o<3&&["hsl","hsla","hsv","hsva"].includes(n)?parseFloat(i)/100:parseFloat(i));return P0[n](...a)}else if(typeof e=="string"){let t=e.startsWith("#")?e.slice(1):e;return[3,4].includes(t.length)?t=t.split("").map(n=>n+n).join(""):[6,8].includes(t.length),D0(t)}else if(typeof e=="object"){if(Cl(e,["r","g","b"]))return e;if(Cl(e,["h","s","l"]))return Hi(Dm(e));if(Cl(e,["h","s","v"]))return Hi(e)}throw new TypeError(`Invalid color: ${e==null?e:String(e)||e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`)}function Hi(e){const{h:t,s:n,v:s,a}=e,i=r=>{const l=(r+t/60)%6;return s-s*n*Math.max(Math.min(l,4-l,1),0)},o=[i(5),i(3),i(1)].map(r=>Math.round(r*255));return{r:o[0],g:o[1],b:o[2],a}}function vh(e){return Hi(Dm(e))}function Dm(e){const{h:t,s:n,l:s,a}=e,i=s+n*Math.min(s,1-s),o=i===0?0:2-2*s/i;return{h:t,s:o,v:i,a}}function Lo(e){const t=Math.round(e).toString(16);return("00".substr(0,2-t.length)+t).toUpperCase()}function B0(e){let{r:t,g:n,b:s,a}=e;return`#${[Lo(t),Lo(n),Lo(s),a!==void 0?Lo(Math.round(a*255)):""].join("")}`}function D0(e){e=R0(e);let[t,n,s,a]=c0(e,2).map(i=>parseInt(i,16));return a=a===void 0?a:a/255,{r:t,g:n,b:s,a}}function R0(e){return e.startsWith("#")&&(e=e.slice(1)),e=e.replace(/([^0-9a-f])/gi,"F"),(e.length===3||e.length===4)&&(e=e.split("").map(t=>t+t).join("")),e.length!==6&&(e=th(th(e,6),8,"F")),e}function M0(e,t){const n=Nm(tu(e));return n[0]=n[0]+t*10,Bm(Pm(n))}function $0(e,t){const n=Nm(tu(e));return n[0]=n[0]-t*10,Bm(Pm(n))}function j0(e){const t=Zn(e);return tu(t)[1]}function Rm(e){const t=Math.abs(mh(Zn(0),Zn(e)));return Math.abs(mh(Zn(16777215),Zn(e)))>Math.min(t,50)?"#fff":"#000"}function ee(e,t){return n=>Object.keys(e).reduce((s,a)=>{const o=typeof e[a]=="object"&&e[a]!=null&&!Array.isArray(e[a])?e[a]:{type:e[a]};return n&&a in n?s[a]={...o,default:n[a]}:s[a]=o,t&&!s[a].source&&(s[a].source=t),s},{})}const He=ee({class:[String,Array,Object],style:{type:[String,Array,Object],default:null}},"component");function Rt(e,t){const n=io();if(!n)throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);return n}function js(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"composables";const t=Rt(e).type;return oa((t==null?void 0:t.aliasName)||(t==null?void 0:t.name))}function V0(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:Rt("injectSelf");const{provides:n}=t;if(n&&e in n)return n[e]}const Ha=Symbol.for("vuetify:defaults");function F0(e){return Pe(e)}function nu(){const e=Xe(Ha);if(!e)throw new Error("[Vuetify] Could not find defaults instance");return e}function Ss(e,t){const n=nu(),s=Pe(e),a=N(()=>{if(zt(t==null?void 0:t.disabled))return n.value;const o=zt(t==null?void 0:t.scoped),r=zt(t==null?void 0:t.reset),l=zt(t==null?void 0:t.root);if(s.value==null&&!(o||r||l))return n.value;let u=Ut(s.value,{prev:n.value});if(o)return u;if(r||l){const d=Number(r||1/0);for(let h=0;h<=d&&!(!u||!("prev"in u));h++)u=u.prev;return u&&typeof l=="string"&&l in u&&(u=Ut(Ut(u,{prev:u}),u[l])),u}return u.prev?Ut(u.prev,u):u});return Dt(Ha,a),a}function W0(e,t){return e.props&&(typeof e.props[t]<"u"||typeof e.props[oa(t)]<"u")}function H0(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:nu();const s=Rt("useDefaults");if(t=t??s.type.name??s.type.__name,!t)throw new Error("[Vuetify] Could not determine component name");const a=N(()=>{var l;return(l=n.value)==null?void 0:l[e._as??t]}),i=new Proxy(e,{get(l,u){var p,g,m,v;const d=Reflect.get(l,u);if(u==="class"||u==="style")return[(p=a.value)==null?void 0:p[u],d].filter(y=>y!=null);if(W0(s.vnode,u))return d;const h=(g=a.value)==null?void 0:g[u];if(h!==void 0)return h;const f=(v=(m=n.value)==null?void 0:m.global)==null?void 0:v[u];return f!==void 0?f:d}}),o=be();mn(()=>{if(a.value){const l=Object.entries(a.value).filter(u=>{let[d]=u;return d.startsWith(d[0].toUpperCase())});o.value=l.length?Object.fromEntries(l):void 0}else o.value=void 0});function r(){const l=V0(Ha,s);Dt(Ha,N(()=>o.value?Ut((l==null?void 0:l.value)??{},o.value):l==null?void 0:l.value))}return{props:i,provideSubDefaults:r}}function Ja(e){if(e._setup=e._setup??e.setup,!e.name)return e;if(e._setup){e.props=ee(e.props??{},e.name)();const t=Object.keys(e.props).filter(n=>n!=="class"&&n!=="style");e.filterProps=function(s){return Pr(s,t)},e.props._as=String,e.setup=function(s,a){const i=nu();if(!i.value)return e._setup(s,a);const{props:o,provideSubDefaults:r}=H0(s,s._as??e.name,i),l=e._setup(o,a);return r(),l}}return e}function ke(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return t=>(e?Ja:Ct)(t)}function Br(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"div",n=arguments.length>2?arguments[2]:void 0;return ke()({name:n??ws(Gt(e.replace(/__/g,"-"))),props:{tag:{type:String,default:t},...He()},setup(s,a){let{slots:i}=a;return()=>{var o;return Mn(s.tag,{class:[e,s.class],style:s.style},(o=i.default)==null?void 0:o.call(i))}}})}function q0(e,t,n,s){if(!n||Wa(e)||Wa(t))return;const a=n.get(e);if(a)a.set(t,s);else{const i=new WeakMap;i.set(t,s),n.set(e,i)}}function z0(e,t,n){var i,o;if(!n||Wa(e)||Wa(t))return null;const s=(i=n.get(e))==null?void 0:i.get(t);if(typeof s=="boolean")return s;const a=(o=n.get(t))==null?void 0:o.get(e);return typeof a=="boolean"?a:null}function ca(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:new WeakMap;if(e===t)return!0;if(e instanceof Date&&t instanceof Date&&e.getTime()!==t.getTime()||e!==Object(e)||t!==Object(t))return!1;const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!1;const a=z0(e,t,n);return a||(q0(e,t,n,!0),s.every(i=>ca(e[i],t[i],n)))}function Mm(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const t=e.getRootNode();return t!==document&&t.getRootNode({composed:!0})!==document?null:t}const ir="cubic-bezier(0.4, 0, 0.2, 1)",yh="cubic-bezier(0.0, 0, 0.2, 1)",bh="cubic-bezier(0.4, 0, 1, 1)",U0={linear:e=>e,easeInQuad:e=>e**2,easeOutQuad:e=>e*(2-e),easeInOutQuad:e=>e<.5?2*e**2:-1+(4-2*e)*e,easeInCubic:e=>e**3,easeOutCubic:e=>--e**3+1,easeInOutCubic:e=>e<.5?4*e**3:(e-1)*(2*e-2)*(2*e-2)+1,easeInQuart:e=>e**4,easeOutQuart:e=>1- --e**4,easeInOutQuart:e=>e<.5?8*e**4:1-8*--e**4,easeInQuint:e=>e**5,easeOutQuint:e=>1+--e**5,easeInOutQuint:e=>e<.5?16*e**5:1+16*--e**5,instant:e=>1};function $m(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(t?G0(e):su(e))return e;e=e.parentElement}return document.scrollingElement}function or(e,t){const n=[];if(t&&e&&!t.contains(e))return n;for(;e&&(su(e)&&n.push(e),e!==t);)e=e.parentElement;return n}function su(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e),n=t.overflowY==="scroll"||t.overflowY==="auto"&&e.scrollHeight>e.clientHeight,s=t.overflowX==="scroll"||t.overflowX==="auto"&&e.scrollWidth>e.clientWidth;return n||s}function G0(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return["scroll","auto"].includes(t.overflowY)}function K0(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}function De(e){const t=Rt("useRender");t.render=e}function Y0(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{leading:!0,trailing:!0},s=0,a=0,i=!1,o=0;function r(){clearTimeout(s),i=!1,o=0}const l=function(){for(var u=arguments.length,d=new Array(u),h=0;h<u;h++)d[h]=arguments[h];clearTimeout(s);const f=Date.now();o||(o=f);const p=f-Math.max(o,a);function g(){a=Date.now(),s=setTimeout(r,t),e(...d)}i?p>=t?g():n.trailing&&(s=setTimeout(g,t-p)):(i=!0,n.leading&&g())};return l.clear=r,l.immediate=e,l}const ot=[String,Function,Object,Array],uc=Symbol.for("vuetify:icons"),Dr=ee({icon:{type:ot},tag:{type:[String,Object,Function],required:!0}},"icon"),wh=ke()({name:"VComponentIcon",props:Dr(),setup(e,t){let{slots:n}=t;return()=>{const s=e.icon;return S(e.tag,null,{default:()=>{var a;return[e.icon?S(s,null,null):(a=n.default)==null?void 0:a.call(n)]}})}}}),jm=Ja({name:"VSvgIcon",inheritAttrs:!1,props:Dr(),setup(e,t){let{attrs:n}=t;return()=>S(e.tag,$e(n,{style:null}),{default:()=>[b("svg",{class:"v-icon__svg",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true"},[Array.isArray(e.icon)?e.icon.map(s=>Array.isArray(s)?b("path",{d:s[0],"fill-opacity":s[1]},null):b("path",{d:s},null)):b("path",{d:e.icon},null)])]})}});Ja({name:"VLigatureIcon",props:Dr(),setup(e){return()=>S(e.tag,null,{default:()=>[e.icon]})}});const Vm=Ja({name:"VClassIcon",props:Dr(),setup(e){return()=>S(e.tag,{class:fe(e.icon)},null)}}),X0=e=>{const t=Xe(uc);if(!t)throw new Error("Missing Vuetify Icons provide!");return{iconData:N(()=>{var l;const s=Vt(e);if(!s)return{component:wh};let a=s;if(typeof a=="string"&&(a=a.trim(),a.startsWith("$")&&(a=(l=t.aliases)==null?void 0:l[a.slice(1)])),Array.isArray(a))return{component:jm,icon:a};if(typeof a!="string")return{component:wh,icon:a};const i=Object.keys(t.sets).find(u=>typeof a=="string"&&a.startsWith(`${u}:`)),o=i?a.slice(i.length+1):a;return{component:t.sets[i??t.defaultSet].component,icon:o}})}},J0={collapse:"mdi-chevron-up",complete:"mdi-check",cancel:"mdi-close-circle",close:"mdi-close",delete:"mdi-close-circle",clear:"mdi-close-circle",success:"mdi-check-circle",info:"mdi-information",warning:"mdi-alert-circle",error:"mdi-close-circle",prev:"mdi-chevron-left",next:"mdi-chevron-right",checkboxOn:"mdi-checkbox-marked",checkboxOff:"mdi-checkbox-blank-outline",checkboxIndeterminate:"mdi-minus-box",delimiter:"mdi-circle",sortAsc:"mdi-arrow-up",sortDesc:"mdi-arrow-down",expand:"mdi-chevron-down",menu:"mdi-menu",subgroup:"mdi-menu-down",dropdown:"mdi-menu-down",radioOn:"mdi-radiobox-marked",radioOff:"mdi-radiobox-blank",edit:"mdi-pencil",ratingEmpty:"mdi-star-outline",ratingFull:"mdi-star",ratingHalf:"mdi-star-half-full",loading:"mdi-cached",first:"mdi-page-first",last:"mdi-page-last",unfold:"mdi-unfold-more-horizontal",file:"mdi-paperclip",plus:"mdi-plus",minus:"mdi-minus",calendar:"mdi-calendar",treeviewCollapse:"mdi-menu-down",treeviewExpand:"mdi-menu-right",tableGroupCollapse:"mdi-chevron-down",tableGroupExpand:"mdi-chevron-right",eyeDropper:"mdi-eyedropper",upload:"mdi-cloud-upload",color:"mdi-palette",command:"mdi-apple-keyboard-command",ctrl:"mdi-apple-keyboard-control",space:"mdi-keyboard-space",shift:"mdi-apple-keyboard-shift",alt:"mdi-apple-keyboard-option",enter:"mdi-keyboard-return",arrowup:"mdi-arrow-up",arrowdown:"mdi-arrow-down",arrowleft:"mdi-arrow-left",arrowright:"mdi-arrow-right",backspace:"mdi-backspace",play:"mdi-play",pause:"mdi-pause",fullscreen:"mdi-fullscreen",fullscreenExit:"mdi-fullscreen-exit",volumeHigh:"mdi-volume-high",volumeMedium:"mdi-volume-medium",volumeLow:"mdi-volume-low",volumeOff:"mdi-volume-variant-off",search:"mdi-magnify"},Q0={component:e=>Mn(Vm,{...e,class:"mdi"})};function Z0(){return{svg:{component:jm},class:{component:Vm}}}function e1(e){const t=Z0(),n=(e==null?void 0:e.defaultSet)??"mdi";return n==="mdi"&&!t.mdi&&(t.mdi=Q0),Ut({defaultSet:n,sets:t,aliases:{...J0,vuetify:["M8.2241 14.2009L12 21L22 3H14.4459L8.2241 14.2009Z",["M7.26303 12.4733L7.00113 12L2 3H12.5261C12.5261 3 12.5261 3 12.5261 3L7.26303 12.4733Z",.6]],"vuetify-outline":"svg:M7.26 12.47 12.53 3H2L7.26 12.47ZM14.45 3 8.22 14.2 12 21 22 3H14.45ZM18.6 5 12 16.88 10.51 14.2 15.62 5ZM7.26 8.35 5.4 5H9.13L7.26 8.35Z","vuetify-play":["m6.376 13.184-4.11-7.192C1.505 4.66 2.467 3 4.003 3h8.532l-.953 1.576-.006.01-.396.677c-.429.732-.214 1.507.194 2.015.404.503 1.092.878 1.869.806a3.72 3.72 0 0 1 1.005.022c.276.053.434.143.523.237.138.146.38.635-.25 2.09-.893 1.63-1.553 1.722-1.847 1.677-.213-.033-.468-.158-.756-.406a4.95 4.95 0 0 1-.8-.927c-.39-.564-1.04-.84-1.66-.846-.625-.006-1.316.27-1.693.921l-.478.826-.911 1.506Z",["M9.093 11.552c.046-.079.144-.15.32-.148a.53.53 0 0 1 .43.207c.285.414.636.847 1.046 1.2.405.35.914.662 1.516.754 1.334.205 2.502-.698 3.48-2.495l.014-.028.013-.03c.687-1.574.774-2.852-.005-3.675-.37-.391-.861-.586-1.333-.676a5.243 5.243 0 0 0-1.447-.044c-.173.016-.393-.073-.54-.257-.145-.18-.127-.316-.082-.392l.393-.672L14.287 3h5.71c1.536 0 2.499 1.659 1.737 2.992l-7.997 13.996c-.768 1.344-2.706 1.344-3.473 0l-3.037-5.314 1.377-2.278.004-.006.004-.007.481-.831Z",.6]]}},e)}function Qa(e,t){let n;function s(){n=Di(),n.run(()=>t.length?t(()=>{n==null||n.stop(),s()}):t())}Oe(e,a=>{a&&!n?s():a||(n==null||n.stop(),n=void 0)},{immediate:!0}),sn(()=>{n==null||n.stop()})}function Kt(e,t,n){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:h=>h,a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:h=>h;const i=Rt("useProxiedModel"),o=Pe(e[t]!==void 0?e[t]:n),r=oa(t),u=N(r!==t?()=>{var h,f,p,g;return e[t],!!(((h=i.vnode.props)!=null&&h.hasOwnProperty(t)||(f=i.vnode.props)!=null&&f.hasOwnProperty(r))&&((p=i.vnode.props)!=null&&p.hasOwnProperty(`onUpdate:${t}`)||(g=i.vnode.props)!=null&&g.hasOwnProperty(`onUpdate:${r}`)))}:()=>{var h,f;return e[t],!!((h=i.vnode.props)!=null&&h.hasOwnProperty(t)&&((f=i.vnode.props)!=null&&f.hasOwnProperty(`onUpdate:${t}`)))});Qa(()=>!u.value,()=>{Oe(()=>e[t],h=>{o.value=h})});const d=N({get(){const h=e[t];return s(u.value?h:o.value)},set(h){const f=a(h),p=Te(u.value?e[t]:o.value);p===f||s(p)===h||(o.value=f,i==null||i.emit(`update:${t}`,f))}});return Object.defineProperty(d,"externalValue",{get:()=>u.value?e[t]:o.value}),d}const t1={badge:"Badge",open:"Open",close:"Close",dismiss:"Dismiss",confirmEdit:{ok:"OK",cancel:"Cancel"},dataIterator:{noResultsText:"No matching records found",loadingText:"Loading items..."},dataTable:{itemsPerPageText:"Rows per page:",ariaLabel:{sortDescending:"Sorted descending.",sortAscending:"Sorted ascending.",sortNone:"Not sorted.",activateNone:"Activate to remove sorting.",activateDescending:"Activate to sort descending.",activateAscending:"Activate to sort ascending."},sortBy:"Sort by"},dataFooter:{itemsPerPageText:"Items per page:",itemsPerPageAll:"All",nextPage:"Next page",prevPage:"Previous page",firstPage:"First page",lastPage:"Last page",pageText:"{0}-{1} of {2}"},dateRangeInput:{divider:"to"},datePicker:{itemsSelected:"{0} selected",range:{title:"Select dates",header:"Enter dates"},title:"Select date",header:"Enter date",input:{placeholder:"Enter date"},ariaLabel:{previousMonth:"Previous month",nextMonth:"Next month",selectYear:"Select year",previousYear:"Previous year",nextYear:"Next year",selectMonth:"Select month",selectDate:"{0}",currentDate:"Today, {0}"}},noDataText:"No data available",carousel:{prev:"Previous visual",next:"Next visual",ariaLabel:{delimiter:"Carousel slide {0} of {1}"}},calendar:{moreEvents:"{0} more",today:"Today"},input:{clear:"Clear {0}",prependAction:"{0} prepended action",appendAction:"{0} appended action",otp:"Please enter OTP character {0}"},fileInput:{counter:"{0} files",counterSize:"{0} files ({1} in total)"},fileUpload:{title:"Drag and drop files here",divider:"or",browse:"Browse Files"},timePicker:{am:"AM",pm:"PM",title:"Select Time",hour:"Hour",minute:"Minute",second:"Second",notAllowed:"Value is not allowed"},pagination:{ariaLabel:{root:"Pagination Navigation",next:"Next page",previous:"Previous page",page:"Go to page {0}",currentPage:"Page {0}, Current page",first:"First page",last:"Last page"}},stepper:{next:"Next",prev:"Previous"},rating:{ariaLabel:{item:"Rating {0} of {1}"}},loading:"Loading...",infiniteScroll:{loadMore:"Load more",empty:"No more"},rules:{required:"This field is required",email:"Please enter a valid email",number:"This field can only contain numbers",integer:"This field can only contain integer values",capital:"This field can only contain uppercase letters",maxLength:"You must enter a maximum of {0} characters",minLength:"You must enter a minimum of {0} characters",strictLength:"The length of the entered field is invalid",exclude:"The {0} character is not allowed",notEmpty:"Please choose at least one value",pattern:"Invalid format"},command:{search:"Type a command or search..."},hotkey:{then:"then",ctrl:"Ctrl",command:"Command",space:"Space",shift:"Shift",alt:"Alt",enter:"Enter",escape:"Escape",upArrow:"Up Arrow",downArrow:"Down Arrow",leftArrow:"Left Arrow",rightArrow:"Right Arrow",backspace:"Backspace",option:"Option",plus:"plus",shortcut:"Keyboard shortcut: {0}",or:"or"},video:{play:"Play",pause:"Pause",seek:"Seek",volume:"Volume",showVolume:"Show volume control",mute:"Mute",unmute:"Unmute",enterFullscreen:"Full screen",exitFullscreen:"Exit full screen"},colorPicker:{ariaLabel:{eyedropper:"Select color with eyedropper",hueSlider:"Hue",alphaSlider:"Alpha",redInput:"Red value",greenInput:"Green value",blueInput:"Blue value",alphaInput:"Alpha value",hueInput:"Hue value",saturationInput:"Saturation value",lightnessInput:"Lightness value",hexInput:"HEX value",hexaInput:"HEX with alpha value",changeFormat:"Change color format"}}},kh="$vuetify.",Sh=(e,t)=>e.replace(/\{(\d+)\}/g,(n,s)=>String(t[Number(s)])),Fm=(e,t,n)=>function(s){for(var a=arguments.length,i=new Array(a>1?a-1:0),o=1;o<a;o++)i[o-1]=arguments[o];if(!s.startsWith(kh))return Sh(s,i);const r=s.replace(kh,""),l=e.value&&n.value[e.value],u=t.value&&n.value[t.value];let d=oc(l,r,null);return d||(`${s}${e.value}`,d=oc(u,r,null)),d||(d=s),typeof d!="string"&&(d=s),Sh(d,i)};function au(e,t){return(n,s)=>new Intl.NumberFormat([e.value,t.value],s).format(n)}function Wm(e,t){return au(e,t)(.1).includes(",")?",":"."}function El(e,t,n){const s=Kt(e,t,e[t]??n.value);return s.value=e[t]??n.value,Oe(n,a=>{e[t]==null&&(s.value=n.value)}),s}function Hm(e){return t=>{const n=El(t,"locale",e.current),s=El(t,"fallback",e.fallback),a=El(t,"messages",e.messages);return{name:"vuetify",current:n,fallback:s,messages:a,decimalSeparator:j(()=>Wm(n,s)),t:Fm(n,s,a),n:au(n,s),provide:Hm({current:n,fallback:s,messages:a})}}}function n1(e){const t=be((e==null?void 0:e.locale)??"en"),n=be((e==null?void 0:e.fallback)??"en"),s=Pe({en:t1,...e==null?void 0:e.messages});return{name:"vuetify",current:t,fallback:n,messages:s,decimalSeparator:j(()=>(e==null?void 0:e.decimalSeparator)??Wm(t,n)),t:Fm(t,n,s),n:au(t,n),provide:Hm({current:t,fallback:n,messages:s})}}const rr=Symbol.for("vuetify:locale");function s1(e){return e.name!=null}function a1(e){const t=e!=null&&e.adapter&&s1(e==null?void 0:e.adapter)?e==null?void 0:e.adapter:n1(e),n=o1(t,e);return{...t,...n}}function iu(){const e=Xe(rr);if(!e)throw new Error("[Vuetify] Could not find injected locale instance");return e}function i1(){return{af:!1,ar:!0,bg:!1,ca:!1,ckb:!1,cs:!1,de:!1,el:!1,en:!1,es:!1,et:!1,fa:!0,fi:!1,fr:!1,hr:!1,hu:!1,he:!0,id:!1,it:!1,ja:!1,km:!1,ko:!1,lv:!1,lt:!1,nl:!1,no:!1,pl:!1,pt:!1,ro:!1,ru:!1,sk:!1,sl:!1,srCyrl:!1,srLatn:!1,sv:!1,th:!1,tr:!1,az:!1,uk:!1,vi:!1,zhHans:!1,zhHant:!1}}function o1(e,t){const n=Pe((t==null?void 0:t.rtl)??i1()),s=N(()=>n.value[e.current.value]??!1);return{isRtl:s,rtl:n,rtlClasses:j(()=>`v-locale--is-${s.value?"rtl":"ltr"}`)}}function $n(){const e=Xe(rr);if(!e)throw new Error("[Vuetify] Could not find injected rtl instance");return{isRtl:e.isRtl,rtlClasses:e.rtlClasses}}function ro(e){const t=e.slice(-2).toUpperCase();switch(!0){case e==="GB-alt-variant":return{firstDay:0,firstWeekSize:4};case e==="001":return{firstDay:1,firstWeekSize:1};case`AG AS BD BR BS BT BW BZ CA CO DM DO ET GT GU HK HN ID IL IN JM JP KE
    KH KR LA MH MM MO MT MX MZ NI NP PA PE PH PK PR PY SA SG SV TH TT TW UM US
    VE VI WS YE ZA ZW`.includes(t):return{firstDay:0,firstWeekSize:1};case`AI AL AM AR AU AZ BA BM BN BY CL CM CN CR CY EC GE HR KG KZ LB LK LV
    MD ME MK MN MY NZ RO RS SI TJ TM TR UA UY UZ VN XK`.includes(t):return{firstDay:1,firstWeekSize:1};case`AD AN AT AX BE BG CH CZ DE DK EE ES FI FJ FO FR GB GF GP GR HU IE IS
    IT LI LT LU MC MQ NL NO PL RE RU SE SK SM VA`.includes(t):return{firstDay:1,firstWeekSize:4};case"AE AF BH DJ DZ EG IQ IR JO KW LY OM QA SD SY".includes(t):return{firstDay:6,firstWeekSize:1};case t==="MV":return{firstDay:5,firstWeekSize:1};case t==="PT":return{firstDay:0,firstWeekSize:4};default:return null}}function r1(e,t,n){var d;const s=[];let a=[];const i=qm(e),o=zm(e),r=n??((d=ro(t))==null?void 0:d.firstDay)??0,l=(i.getDay()-r+7)%7,u=(o.getDay()-r+7)%7;for(let h=0;h<l;h++){const f=new Date(i);f.setDate(f.getDate()-(l-h)),a.push(f)}for(let h=1;h<=o.getDate();h++){const f=new Date(e.getFullYear(),e.getMonth(),h);a.push(f),a.length===7&&(s.push(a),a=[])}for(let h=1;h<7-u;h++){const f=new Date(o);f.setDate(f.getDate()+h),a.push(f)}return a.length>0&&s.push(a),s}function Oi(e,t,n){var i;let s=(n??((i=ro(t))==null?void 0:i.firstDay)??0)%7;[0,1,2,3,4,5,6].includes(s)||(s=0);const a=new Date(e);for(;a.getDay()!==s;)a.setDate(a.getDate()-1);return a}function l1(e,t){var a;const n=new Date(e),s=((((a=ro(t))==null?void 0:a.firstDay)??0)+6)%7;for(;n.getDay()!==s;)n.setDate(n.getDate()+1);return n}function qm(e){return new Date(e.getFullYear(),e.getMonth(),1)}function zm(e){return new Date(e.getFullYear(),e.getMonth()+1,0)}function c1(e){const t=e.split("-").map(Number);return new Date(t[0],t[1]-1,t[2])}const u1=/^([12]\d{3}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[12]\d|3[01]))$/;function Um(e){if(e==null)return new Date;if(e instanceof Date)return e;if(typeof e=="string"){let t;if(u1.test(e))return c1(e);if(t=Date.parse(e),!isNaN(t))return new Date(t)}return null}const xh=new Date(2e3,0,2);function d1(e,t,n){var a;const s=t??((a=ro(e))==null?void 0:a.firstDay)??0;return xm(7).map(i=>{const o=new Date(xh);return o.setDate(xh.getDate()+s+i),new Intl.DateTimeFormat(e,{weekday:n??"narrow"}).format(o)})}function h1(e,t,n,s){const a=Um(e)??new Date,i=s==null?void 0:s[t];if(typeof i=="function")return i(a,t,n);let o={};switch(t){case"fullDate":o={year:"numeric",month:"short",day:"numeric"};break;case"fullDateWithWeekday":o={weekday:"long",year:"numeric",month:"long",day:"numeric"};break;case"normalDate":const r=a.getDate(),l=new Intl.DateTimeFormat(n,{month:"long"}).format(a);return`${r} ${l}`;case"normalDateWithWeekday":o={weekday:"short",day:"numeric",month:"short"};break;case"shortDate":o={month:"short",day:"numeric"};break;case"year":o={year:"numeric"};break;case"month":o={month:"long"};break;case"monthShort":o={month:"short"};break;case"monthAndYear":o={month:"long",year:"numeric"};break;case"monthAndDate":o={month:"long",day:"numeric"};break;case"weekday":o={weekday:"long"};break;case"weekdayShort":o={weekday:"short"};break;case"dayOfMonth":return new Intl.NumberFormat(n).format(a.getDate());case"hours12h":o={hour:"numeric",hour12:!0};break;case"hours24h":o={hour:"numeric",hour12:!1};break;case"minutes":o={minute:"numeric"};break;case"seconds":o={second:"numeric"};break;case"fullTime":o={hour:"numeric",minute:"numeric"};break;case"fullTime12h":o={hour:"numeric",minute:"numeric",hour12:!0};break;case"fullTime24h":o={hour:"numeric",minute:"numeric",hour12:!1};break;case"fullDateTime":o={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric"};break;case"fullDateTime12h":o={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",hour12:!0};break;case"fullDateTime24h":o={year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",hour12:!1};break;case"keyboardDate":o={year:"numeric",month:"2-digit",day:"2-digit"};break;case"keyboardDateTime":return o={year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric"},new Intl.DateTimeFormat(n,o).format(a).replace(/, /g," ");case"keyboardDateTime12h":return o={year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",hour12:!0},new Intl.DateTimeFormat(n,o).format(a).replace(/, /g," ");case"keyboardDateTime24h":return o={year:"numeric",month:"2-digit",day:"2-digit",hour:"numeric",minute:"numeric",hour12:!1},new Intl.DateTimeFormat(n,o).format(a).replace(/, /g," ");default:o=i??{timeZone:"UTC",timeZoneName:"short"}}return new Intl.DateTimeFormat(n,o).format(a)}function f1(e,t){const n=e.toJsDate(t),s=n.getFullYear(),a=nh(String(n.getMonth()+1),2,"0"),i=nh(String(n.getDate()),2,"0");return`${s}-${a}-${i}`}function p1(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function m1(e,t){const n=new Date(e);return n.setMinutes(n.getMinutes()+t),n}function g1(e,t){const n=new Date(e);return n.setHours(n.getHours()+t),n}function ua(e,t){const n=new Date(e);return n.setDate(n.getDate()+t),n}function v1(e,t){const n=new Date(e);return n.setDate(n.getDate()+t*7),n}function y1(e,t){const n=new Date(e);return n.setDate(1),n.setMonth(n.getMonth()+t),n}function qi(e){return e.getFullYear()}function b1(e){return e.getMonth()}function w1(e,t,n,s){const a=ro(t),i=n??(a==null?void 0:a.firstDay)??0,o=(a==null?void 0:a.firstWeekSize)??1;return s!==void 0?k1(e,t,i,s):S1(e,t,i,o)}function k1(e,t,n,s){const a=(7+s-n)%7,i=Oi(e,t,n),o=ua(i,6);function r(f){return(7+new Date(f,0,1).getDay()-n)%7}let l=qi(i);l<qi(o)&&r(l+1)<=a&&l++;const u=new Date(l,0,1),d=r(l),h=d<=a?ua(u,-d):ua(u,7-d);return 1+cr(ou(i),zi(h),"weeks")}function S1(e,t,n,s){const a=Oi(e,t,n),i=ua(Oi(e,t,n),6);function o(h){const f=new Date(h,0,1);return 7-cr(f,Oi(f,t,n),"days")}let r=qi(a);r<qi(i)&&o(r+1)>=s&&r++;const l=new Date(r,0,1),u=o(r),d=u>=s?ua(l,u-7):ua(l,u);return 1+cr(ou(a),zi(d),"weeks")}function x1(e){return e.getDate()}function _1(e){return new Date(e.getFullYear(),e.getMonth()+1,1)}function A1(e){return new Date(e.getFullYear(),e.getMonth()-1,1)}function C1(e){return e.getHours()}function T1(e){return e.getMinutes()}function I1(e){return new Date(e.getFullYear(),0,1)}function E1(e){return new Date(e.getFullYear(),11,31)}function L1(e,t){return lr(e,t[0])&&P1(e,t[1])}function O1(e){const t=new Date(e);return t instanceof Date&&!isNaN(t.getTime())}function lr(e,t){return e.getTime()>t.getTime()}function N1(e,t){return lr(zi(e),zi(t))}function P1(e,t){return e.getTime()<t.getTime()}function _h(e,t){return e.getTime()===t.getTime()}function B1(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}function D1(e,t){return e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()}function R1(e,t){return e.getFullYear()===t.getFullYear()}function cr(e,t,n){const s=new Date(e),a=new Date(t);switch(n){case"years":return s.getFullYear()-a.getFullYear();case"quarters":return Math.floor((s.getMonth()-a.getMonth()+(s.getFullYear()-a.getFullYear())*12)/4);case"months":return s.getMonth()-a.getMonth()+(s.getFullYear()-a.getFullYear())*12;case"weeks":return Math.floor((s.getTime()-a.getTime())/(1e3*60*60*24*7));case"days":return Math.floor((s.getTime()-a.getTime())/(1e3*60*60*24));case"hours":return Math.floor((s.getTime()-a.getTime())/(1e3*60*60));case"minutes":return Math.floor((s.getTime()-a.getTime())/(1e3*60));case"seconds":return Math.floor((s.getTime()-a.getTime())/1e3);default:return s.getTime()-a.getTime()}}function M1(e,t){const n=new Date(e);return n.setHours(t),n}function $1(e,t){const n=new Date(e);return n.setMinutes(t),n}function j1(e,t){const n=new Date(e);return n.setMonth(t),n}function V1(e,t){const n=new Date(e);return n.setDate(t),n}function F1(e,t){const n=new Date(e);return n.setFullYear(t),n}function zi(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0)}function ou(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59,999)}class W1{constructor(t){this.locale=t.locale,this.formats=t.formats}date(t){return Um(t)}toJsDate(t){return t}toISO(t){return f1(this,t)}parseISO(t){return p1(t)}addMinutes(t,n){return m1(t,n)}addHours(t,n){return g1(t,n)}addDays(t,n){return ua(t,n)}addWeeks(t,n){return v1(t,n)}addMonths(t,n){return y1(t,n)}getWeekArray(t,n){const s=n!==void 0?Number(n):void 0;return r1(t,this.locale,s)}startOfWeek(t,n){const s=n!==void 0?Number(n):void 0;return Oi(t,this.locale,s)}endOfWeek(t){return l1(t,this.locale)}startOfMonth(t){return qm(t)}endOfMonth(t){return zm(t)}format(t,n){return h1(t,n,this.locale,this.formats)}isEqual(t,n){return _h(t,n)}isValid(t){return O1(t)}isWithinRange(t,n){return L1(t,n)}isAfter(t,n){return lr(t,n)}isAfterDay(t,n){return N1(t,n)}isBefore(t,n){return!lr(t,n)&&!_h(t,n)}isSameDay(t,n){return B1(t,n)}isSameMonth(t,n){return D1(t,n)}isSameYear(t,n){return R1(t,n)}setMinutes(t,n){return $1(t,n)}setHours(t,n){return M1(t,n)}setMonth(t,n){return j1(t,n)}setDate(t,n){return V1(t,n)}setYear(t,n){return F1(t,n)}getDiff(t,n,s){return cr(t,n,s)}getWeekdays(t,n){const s=t!==void 0?Number(t):void 0;return d1(this.locale,s,n)}getYear(t){return qi(t)}getMonth(t){return b1(t)}getWeek(t,n,s){const a=n!==void 0?Number(n):void 0,i=s!==void 0?Number(s):void 0;return w1(t,this.locale,a,i)}getDate(t){return x1(t)}getNextMonth(t){return _1(t)}getPreviousMonth(t){return A1(t)}getHours(t){return C1(t)}getMinutes(t){return T1(t)}startOfDay(t){return zi(t)}endOfDay(t){return ou(t)}startOfYear(t){return I1(t)}endOfYear(t){return E1(t)}}const H1=Symbol.for("vuetify:date-options"),Ah=Symbol.for("vuetify:date-adapter");function q1(e,t){const n=Ut({adapter:W1,locale:{af:"af-ZA",bg:"bg-BG",ca:"ca-ES",ckb:"",cs:"cs-CZ",de:"de-DE",el:"el-GR",en:"en-US",et:"et-EE",fa:"fa-IR",fi:"fi-FI",hr:"hr-HR",hu:"hu-HU",he:"he-IL",id:"id-ID",it:"it-IT",ja:"ja-JP",ko:"ko-KR",lv:"lv-LV",lt:"lt-LT",nl:"nl-NL",no:"no-NO",pl:"pl-PL",pt:"pt-PT",ro:"ro-RO",ru:"ru-RU",sk:"sk-SK",sl:"sl-SI",srCyrl:"sr-SP",srLatn:"sr-SP",sv:"sv-SE",th:"th-TH",tr:"tr-TR",az:"az-AZ",uk:"uk-UA",vi:"vi-VN",zhHans:"zh-CN",zhHant:"zh-TW"}},e);return{options:n,instance:z1(n,t)}}function z1(e,t){const n=jt(typeof e.adapter=="function"?new e.adapter({locale:e.locale[t.current.value]??t.current.value,formats:e.formats}):e.adapter);return Oe(t.current,s=>{n.locale=e.locale[s]??s??n.locale}),n}const Rr=["sm","md","lg","xl","xxl"],dc=Symbol.for("vuetify:display"),Ch={mobileBreakpoint:"lg",thresholds:{xs:0,sm:600,md:960,lg:1280,xl:1920,xxl:2560}},U1=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ch;return Ut(Ch,e)};function Th(e){return rt&&!e?window.innerWidth:typeof e=="object"&&e.clientWidth||0}function Ih(e){return rt&&!e?window.innerHeight:typeof e=="object"&&e.clientHeight||0}function Eh(e){const t=rt&&!e?window.navigator.userAgent:"ssr";function n(g){return!!t.match(g)}const s=n(/android/i),a=n(/iphone|ipad|ipod/i),i=n(/cordova/i),o=n(/electron/i),r=n(/chrome/i),l=n(/edge/i),u=n(/firefox/i),d=n(/opera/i),h=n(/win/i),f=n(/mac/i),p=n(/linux/i);return{android:s,ios:a,cordova:i,electron:o,chrome:r,edge:l,firefox:u,opera:d,win:h,mac:f,linux:p,touch:o0,ssr:t==="ssr"}}function G1(e,t){const{thresholds:n,mobileBreakpoint:s}=U1(e),a=be(Ih(t)),i=be(Eh(t)),o=jt({}),r=be(Th(t));function l(){a.value=Ih(),r.value=Th()}function u(){l(),i.value=Eh()}return mn(()=>{const d=r.value<n.sm,h=r.value<n.md&&!d,f=r.value<n.lg&&!(h||d),p=r.value<n.xl&&!(f||h||d),g=r.value<n.xxl&&!(p||f||h||d),m=r.value>=n.xxl,v=d?"xs":h?"sm":f?"md":p?"lg":g?"xl":"xxl",y=typeof s=="number"?s:n[s],w=r.value<y;o.xs=d,o.sm=h,o.md=f,o.lg=p,o.xl=g,o.xxl=m,o.smAndUp=!d,o.mdAndUp=!(d||h),o.lgAndUp=!(d||h||f),o.xlAndUp=!(d||h||f||p),o.smAndDown=!(f||p||g||m),o.mdAndDown=!(p||g||m),o.lgAndDown=!(g||m),o.xlAndDown=!m,o.name=v,o.height=a.value,o.width=r.value,o.mobile=w,o.mobileBreakpoint=s,o.platform=i.value,o.thresholds=n}),rt&&(window.addEventListener("resize",l,{passive:!0}),sn(()=>{window.removeEventListener("resize",l)},!0)),{...lp(o),update:u,ssr:!!t}}const K1=ee({mobile:{type:Boolean,default:!1},mobileBreakpoint:[Number,String]},"display");function Gm(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{mobile:null},t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:js();const n=Xe(dc);if(!n)throw new Error("Could not find Vuetify display injection");const s=N(()=>e.mobile?!0:typeof e.mobileBreakpoint=="number"?n.width.value<e.mobileBreakpoint:e.mobileBreakpoint?n.width.value<n.thresholds.value[e.mobileBreakpoint]:e.mobile===null?n.mobile.value:!1);return{...n,displayClasses:j(()=>t?{[`${t}--mobile`]:s.value}:{}),mobile:s}}const Km=Symbol.for("vuetify:goto");function Ym(){return{container:void 0,duration:300,layout:!1,offset:0,easing:"easeInOutCubic",patterns:U0}}function Y1(e){return ru(e)??(document.scrollingElement||document.body)}function ru(e){return typeof e=="string"?document.querySelector(e):_m(e)}function Ll(e,t,n){if(typeof e=="number")return t&&n?-e:e;let s=ru(e),a=0;for(;s;)a+=t?s.offsetLeft:s.offsetTop,s=s.offsetParent;return a}function X1(e,t){return{rtl:t.isRtl,options:Ut(Ym(),e)}}async function Lh(e,t,n,s){const a=n?"scrollLeft":"scrollTop",i=Ut((s==null?void 0:s.options)??Ym(),t),o=s==null?void 0:s.rtl.value,r=(typeof e=="number"?e:ru(e))??0,l=i.container==="parent"&&r instanceof HTMLElement?r.parentElement:Y1(i.container),u=Fa()?i.patterns.instant:typeof i.easing=="function"?i.easing:i.patterns[i.easing];if(!u)throw new TypeError(`Easing function "${i.easing}" not found.`);let d;if(typeof r=="number")d=Ll(r,n,o);else if(d=Ll(r,n,o)-Ll(l,n,o),i.layout){const g=window.getComputedStyle(r).getPropertyValue("--v-layout-top");g&&(d-=parseInt(g,10))}d+=i.offset,d=Q1(l,d,!!o,!!n);const h=l[a]??0;if(d===h)return Promise.resolve(d);const f=performance.now();return new Promise(p=>requestAnimationFrame(function g(m){const y=(m-f)/i.duration,w=Math.floor(h+(d-h)*u(ts(y,0,1)));if(l[a]=w,y>=1&&Math.abs(w-l[a])<10)return p(d);if(y>2)return p(l[a]);requestAnimationFrame(g)}))}function J1(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const t=Xe(Km),{isRtl:n}=$n();if(!t)throw new Error("[Vuetify] Could not find injected goto instance");const s={...t,rtl:j(()=>t.rtl.value||n.value)};async function a(i,o){return Lh(i,Ut(e,o),!1,s)}return a.horizontal=async(i,o)=>Lh(i,Ut(e,o),!0,s),a}function Q1(e,t,n,s){const{scrollWidth:a,scrollHeight:i}=e,[o,r]=e===document.scrollingElement?[window.innerWidth,window.innerHeight]:[e.offsetWidth,e.offsetHeight];let l,u;return s?n?(l=-(a-o),u=0):(l=0,u=a-o):(l=0,u=i+-r),ts(t,l,u)}const Ui=Symbol.for("vuetify:theme"),Lt=ee({theme:String},"theme");function Oh(){return{defaultTheme:"light",prefix:"v-",variations:{colors:[],lighten:0,darken:0},themes:{light:{dark:!1,colors:{background:"#FFFFFF",surface:"#FFFFFF","surface-bright":"#FFFFFF","surface-light":"#EEEEEE","surface-variant":"#424242","on-surface-variant":"#EEEEEE",primary:"#1867C0","primary-darken-1":"#1F5592",secondary:"#48A9A6","secondary-darken-1":"#018786",error:"#B00020",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#000000","border-opacity":.12,"high-emphasis-opacity":.87,"medium-emphasis-opacity":.6,"disabled-opacity":.38,"idle-opacity":.04,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.12,"dragged-opacity":.08,"theme-kbd":"#EEEEEE","theme-on-kbd":"#000000","theme-code":"#F5F5F5","theme-on-code":"#000000"}},dark:{dark:!0,colors:{background:"#121212",surface:"#212121","surface-bright":"#ccbfd6","surface-light":"#424242","surface-variant":"#c8c8c8","on-surface-variant":"#000000",primary:"#2196F3","primary-darken-1":"#277CC1",secondary:"#54B6B2","secondary-darken-1":"#48A9A6",error:"#CF6679",info:"#2196F3",success:"#4CAF50",warning:"#FB8C00"},variables:{"border-color":"#FFFFFF","border-opacity":.12,"high-emphasis-opacity":1,"medium-emphasis-opacity":.7,"disabled-opacity":.5,"idle-opacity":.1,"hover-opacity":.04,"focus-opacity":.12,"selected-opacity":.08,"activated-opacity":.12,"pressed-opacity":.16,"dragged-opacity":.08,"theme-kbd":"#424242","theme-on-kbd":"#FFFFFF","theme-code":"#343434","theme-on-code":"#CCCCCC"}}},stylesheetId:"vuetify-theme-stylesheet",scoped:!1,unimportant:!1,utilities:!0}}function Z1(){var s,a;let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Oh();const t=Oh();if(!e)return{...t,isDisabled:!0};const n={};for(const[i,o]of Object.entries(e.themes??{})){const r=o.dark||i==="dark"?(s=t.themes)==null?void 0:s.dark:(a=t.themes)==null?void 0:a.light;n[i]=Ut(r,o)}return Ut(t,{...e,themes:n})}function Ys(e,t,n,s){e.push(`${sS(t,s)} {
`,...n.map(a=>`  ${a};
`),`}
`)}function Nh(e,t){const n=e.dark?2:1,s=e.dark?1:2,a=[];for(const[i,o]of Object.entries(e.colors)){const r=Zn(o);a.push(`--${t}theme-${i}: ${r.r},${r.g},${r.b}`),i.startsWith("on-")||a.push(`--${t}theme-${i}-overlay-multiplier: ${j0(o)>.18?n:s}`)}for(const[i,o]of Object.entries(e.variables)){const r=typeof o=="string"&&o.startsWith("#")?Zn(o):void 0,l=r?`${r.r}, ${r.g}, ${r.b}`:void 0;a.push(`--${t}${i}: ${l??o}`)}return a}function eS(e,t,n){const s={};if(n)for(const a of["lighten","darken"]){const i=a==="lighten"?M0:$0;for(const o of xm(n[a],1))s[`${e}-${a}-${o}`]=B0(i(Zn(t),o))}return s}function tS(e,t){if(!t)return{};let n={};for(const s of t.colors){const a=e[s];a&&(n={...n,...eS(s,a,t)})}return n}function nS(e){const t={};for(const n of Object.keys(e)){if(n.startsWith("on-")||e[`on-${n}`])continue;const s=`on-${n}`,a=Zn(e[n]);t[s]=Rm(a)}return t}function sS(e,t){if(!t)return e;const n=`:where(${t})`;return e===":root"?n:`${n} ${e}`}function aS(e,t,n){const s=iS(e,t);s&&(s.innerHTML=n)}function iS(e,t){if(!rt)return null;let n=document.getElementById(e);return n||(n=document.createElement("style"),n.id=e,n.type="text/css",t&&n.setAttribute("nonce",t),document.head.appendChild(n)),n}function oS(e){const t=Z1(e),n=be(t.defaultTheme),s=Pe(t.themes),a=be("light"),i=N({get(){return n.value==="system"?a.value:n.value},set(w){n.value=w}}),o=N(()=>{const w={};for(const[x,T]of Object.entries(s.value)){const C={...T.colors,...tS(T.colors,t.variations)};w[x]={...T,colors:{...C,...nS(C)}}}return w}),r=j(()=>o.value[i.value]),l=j(()=>n.value==="system"),u=N(()=>{var _;const w=[],x=t.unimportant?"":" !important",T=t.scoped?t.prefix:"";(_=r.value)!=null&&_.dark&&Ys(w,":root",["color-scheme: dark"],t.scope),Ys(w,":root",Nh(r.value,t.prefix),t.scope);for(const[I,k]of Object.entries(o.value))Ys(w,`.${t.prefix}theme--${I}`,[`color-scheme: ${k.dark?"dark":"normal"}`,...Nh(k,t.prefix)],t.scope);if(t.utilities){const I=[],k=[],O=new Set(Object.values(o.value).flatMap($=>Object.keys($.colors)));for(const $ of O)$.startsWith("on-")?Ys(k,`.${$}`,[`color: rgb(var(--${t.prefix}theme-${$}))${x}`],t.scope):(Ys(I,`.${T}bg-${$}`,[`--${t.prefix}theme-overlay-multiplier: var(--${t.prefix}theme-${$}-overlay-multiplier)`,`background-color: rgb(var(--${t.prefix}theme-${$}))${x}`,`color: rgb(var(--${t.prefix}theme-on-${$}))${x}`],t.scope),Ys(k,`.${T}text-${$}`,[`color: rgb(var(--${t.prefix}theme-${$}))${x}`],t.scope),Ys(k,`.${T}border-${$}`,[`--${t.prefix}border-color: var(--${t.prefix}theme-${$})`],t.scope));t.layers?w.push(`@layer background {
`,...I.map($=>`  ${$}`),`}
`,`@layer foreground {
`,...k.map($=>`  ${$}`),`}
`):w.push(...I,...k)}let C=w.map((I,k)=>k===0?I:`    ${I}`).join("");return t.layers&&(C=`@layer vuetify.theme {
`+w.map(I=>`  ${I}`).join("")+`
}`),C}),d=j(()=>t.isDisabled?void 0:`${t.prefix}theme--${i.value}`),h=j(()=>Object.keys(o.value));if(wm){let x=function(){a.value=w.matches?"dark":"light"};var y=x;const w=window.matchMedia("(prefers-color-scheme: dark)");x(),w.addEventListener("change",x,{passive:!0}),qf()&&sn(()=>{w.removeEventListener("change",x)})}function f(w){if(t.isDisabled)return;const x=w._context.provides.usehead;if(x){let _=function(){return{style:[{textContent:u.value,id:t.stylesheetId,nonce:t.cspNonce||!1}]}};var T=_;if(x.push){const I=x.push(_);rt&&Oe(u,()=>{I.patch(_)})}else rt?(x.addHeadObjs(j(_)),mn(()=>x.updateDOM())):x.addHeadObjs(_())}else{let _=function(){aS(t.stylesheetId,t.cspNonce,u.value)};var C=_;rt?Oe(u,_,{immediate:!0}):_()}}function p(w){w!=="system"&&!h.value.includes(w)||(i.value=w)}function g(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:h.value;const x=w.indexOf(i.value),T=x===-1?0:(x+1)%w.length;p(w[T])}function m(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:["light","dark"];g(w)}const v=new Proxy(i,{get(w,x){return Reflect.get(w,x)},set(w,x,T){return x==="value"&&bm(`theme.global.name.value = ${T}`,`theme.change('${T}')`),Reflect.set(w,x,T)}});return{install:f,change:p,cycle:g,toggle:m,isDisabled:t.isDisabled,isSystem:l,name:i,themes:s,current:r,computedThemes:o,prefix:t.prefix,themeClasses:d,styles:u,global:{name:v,current:r}}}function Mt(e){Rt("provideTheme");const t=Xe(Ui,null);if(!t)throw new Error("Could not find Vuetify theme injection");const n=j(()=>e.theme??t.name.value),i={...t,name:n,current:j(()=>t.themes.value[n.value]),themeClasses:j(()=>t.isDisabled?void 0:`${t.prefix}theme--${n.value}`)};return Dt(Ui,i),i}function rS(){Rt("useTheme");const e=Xe(Ui,null);if(!e)throw new Error("Could not find Vuetify theme injection");return e}function Gi(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"content";const n=rc(),s=Pe();if(rt){const a=new ResizeObserver(i=>{e==null||e(i,a),i.length&&(t==="content"?s.value=i[0].contentRect:s.value=i[0].target.getBoundingClientRect())});In(()=>{a.disconnect()}),Oe(()=>n.el,(i,o)=>{o&&(a.unobserve(o),s.value=void 0),i&&a.observe(i)},{flush:"post"})}return{resizeRef:n,contentRect:Ra(s)}}const ur=Symbol.for("vuetify:layout"),Xm=Symbol.for("vuetify:layout-item"),Ph=1e3,lS=ee({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),cS=ee({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function uS(){const e=Xe(ur);if(!e)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}function dS(e){const t=Xe(ur);if(!t)throw new Error("[Vuetify] Could not find injected layout");const n=e.id??`layout-item-${Ya()}`,s=Rt("useLayoutItem");Dt(Xm,{id:n});const a=be(!1);Wc(()=>a.value=!0),_p(()=>a.value=!1);const{layoutItemStyles:i,layoutItemScrimStyles:o}=t.register(s,{...e,active:N(()=>a.value?!1:e.active.value),id:n});return In(()=>t.unregister(n)),{layoutItemStyles:i,layoutRect:t.layoutRect,layoutItemScrimStyles:o}}const hS=(e,t,n,s)=>{let a={top:0,left:0,right:0,bottom:0};const i=[{id:"",layer:{...a}}];for(const o of e){const r=t.get(o),l=n.get(o),u=s.get(o);if(!r||!l||!u)continue;const d={...a,[r.value]:parseInt(a[r.value],10)+(u.value?parseInt(l.value,10):0)};i.push({id:o,layer:d}),a=d}return i};function fS(e){const t=Xe(ur,null),n=N(()=>t?t.rootZIndex.value-100:Ph),s=Pe([]),a=jt(new Map),i=jt(new Map),o=jt(new Map),r=jt(new Map),l=jt(new Map),{resizeRef:u,contentRect:d}=Gi(),h=N(()=>{const _=new Map,I=e.overlaps??[];for(const k of I.filter(O=>O.includes(":"))){const[O,$]=k.split(":");if(!s.value.includes(O)||!s.value.includes($))continue;const q=a.get(O),R=a.get($),z=i.get(O),se=i.get($);!q||!R||!z||!se||(_.set($,{position:q.value,amount:parseInt(z.value,10)}),_.set(O,{position:R.value,amount:-parseInt(se.value,10)}))}return _}),f=N(()=>{const _=[...new Set([...o.values()].map(k=>k.value))].sort((k,O)=>k-O),I=[];for(const k of _){const O=s.value.filter($=>{var q;return((q=o.get($))==null?void 0:q.value)===k});I.push(...O)}return hS(I,a,i,r)}),p=N(()=>!Array.from(l.values()).some(_=>_.value)),g=N(()=>f.value[f.value.length-1].layer),m=j(()=>({"--v-layout-left":pe(g.value.left),"--v-layout-right":pe(g.value.right),"--v-layout-top":pe(g.value.top),"--v-layout-bottom":pe(g.value.bottom),...p.value?void 0:{transition:"none"}})),v=N(()=>f.value.slice(1).map((_,I)=>{let{id:k}=_;const{layer:O}=f.value[I],$=i.get(k),q=a.get(k);return{id:k,...O,size:Number($.value),position:q.value}})),y=_=>v.value.find(I=>I.id===_),w=Rt("createLayout"),x=be(!1);return $s(()=>{x.value=!0}),Dt(ur,{register:(_,I)=>{let{id:k,order:O,position:$,layoutSize:q,elementSize:R,active:z,disableTransitions:se,absolute:re}=I;o.set(k,O),a.set(k,$),i.set(k,q),r.set(k,z),se&&l.set(k,se);const me=Ca(Xm,w==null?void 0:w.vnode).indexOf(_);me>-1?s.value.splice(me,0,k):s.value.push(k);const ge=N(()=>v.value.findIndex(X=>X.id===k)),Ze=N(()=>n.value+f.value.length*2-ge.value*2),Ve=N(()=>{const X=$.value==="left"||$.value==="right",J=$.value==="right",Ie=$.value==="bottom",mt=R.value??q.value,it=mt===0?"%":"px",M={[$.value]:0,zIndex:Ze.value,transform:`translate${X?"X":"Y"}(${(z.value?0:-(mt===0?100:mt))*(J||Ie?-1:1)}${it})`,position:re.value||n.value!==Ph?"absolute":"fixed",...p.value?void 0:{transition:"none"}};if(!x.value)return M;const Z=v.value[ge.value],ae=h.value.get(k);return ae&&(Z[ae.position]+=ae.amount),{...M,height:X?`calc(100% - ${Z.top}px - ${Z.bottom}px)`:R.value?`${R.value}px`:void 0,left:J?void 0:`${Z.left}px`,right:J?`${Z.right}px`:void 0,top:$.value!=="bottom"?`${Z.top}px`:void 0,bottom:$.value!=="top"?`${Z.bottom}px`:void 0,width:X?R.value?`${R.value}px`:void 0:`calc(100% - ${Z.left}px - ${Z.right}px)`}}),Se=N(()=>({zIndex:Ze.value-1}));return{layoutItemStyles:Ve,layoutItemScrimStyles:Se,zIndex:Ze}},unregister:_=>{o.delete(_),a.delete(_),i.delete(_),r.delete(_),l.delete(_),s.value=s.value.filter(I=>I!==_)},mainRect:g,mainStyles:m,getLayoutItem:y,items:v,layoutRect:d,rootZIndex:n}),{layoutClasses:j(()=>["v-layout",{"v-layout--full-height":e.fullHeight}]),layoutStyles:j(()=>({zIndex:t?n.value:void 0,position:t?"relative":void 0,overflow:t?"hidden":void 0})),getLayoutItem:y,items:v,layoutRect:d,layoutRef:u}}function Jm(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{blueprint:t,...n}=e,s=Ut(t,n),{aliases:a={},components:i={},directives:o={}}=s,r=Di();return r.run(()=>{const l=F0(s.defaults),u=G1(s.display,s.ssr),d=oS(s.theme),h=e1(s.icons),f=a1(s.locale),p=q1(s.date,f),g=X1(s.goTo,f);function m(y){for(const x in o)y.directive(x,o[x]);for(const x in i)y.component(x,i[x]);for(const x in a)y.component(x,Ja({...a[x],name:x,aliasName:a[x].name}));const w=Di();if(w.run(()=>{d.install(y)}),y.onUnmount(()=>w.stop()),y.provide(Ha,l),y.provide(dc,u),y.provide(Ui,d),y.provide(uc,h),y.provide(rr,f),y.provide(H1,p.options),y.provide(Ah,p.instance),y.provide(Km,g),rt&&s.ssr)if(y.$nuxt)y.$nuxt.hook("app:suspense:resolve",()=>{u.update()});else{const{mount:x}=y;y.mount=function(){const T=x(...arguments);return It(()=>u.update()),y.mount=x,T}}y.mixin({computed:{$vuetify(){return jt({defaults:ka.call(this,Ha),display:ka.call(this,dc),theme:ka.call(this,Ui),icons:ka.call(this,uc),locale:ka.call(this,rr),date:ka.call(this,Ah)})}}})}function v(){r.stop()}return{install:m,unmount:v,defaults:l,display:u,theme:d,icons:h,locale:f,date:p,goTo:g}})}const pS="3.12.6";Jm.version=pS;function ka(e){var s,a;const t=this.$,n=((s=t.parent)==null?void 0:s.provides)??((a=t.vnode.appContext)==null?void 0:a.provides);if(n&&e in n)return n[e]}const mS=ee({...He(),...ss(lS(),["fullHeight"]),...Lt()},"VApp"),gS=ke()({name:"VApp",props:mS(),setup(e,t){let{slots:n}=t;const s=Mt(e),{layoutClasses:a,getLayoutItem:i,items:o,layoutRef:r}=fS({...e,fullHeight:!0}),{rtlClasses:l}=$n();return De(()=>{var u;return b("div",{ref:r,class:fe(["v-application",s.themeClasses.value,a.value,l.value,e.class]),style:Be([e.style])},[b("div",{class:"v-application__wrap"},[(u=n.default)==null?void 0:u.call(n)])])}),{getLayoutItem:i,items:o,theme:s}}}),Je=ee({tag:{type:[String,Object,Function],default:"div"}},"tag"),Qm=ee({text:String,...He(),...Je()},"VToolbarTitle"),Zm=ke()({name:"VToolbarTitle",props:Qm(),setup(e,t){let{slots:n}=t;return De(()=>{const s=!!(n.default||n.text||e.text);return S(e.tag,{class:fe(["v-toolbar-title",e.class]),style:Be(e.style)},{default:()=>{var a;return[s&&b("div",{class:"v-toolbar-title__placeholder"},[n.text?n.text():e.text,(a=n.default)==null?void 0:a.call(n)])]}})}),{}}}),vS=ee({disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:String,origin:String},"transition");function gn(e,t,n){return ke()({name:e,props:vS({mode:n,origin:t}),setup(s,a){let{slots:i}=a;const o={onBeforeEnter(r){s.origin&&(r.style.transformOrigin=s.origin)},onLeave(r){if(s.leaveAbsolute){const{offsetTop:l,offsetLeft:u,offsetWidth:d,offsetHeight:h}=r;r._transitionInitialStyles={position:r.style.position,top:r.style.top,left:r.style.left,width:r.style.width,height:r.style.height},r.style.position="absolute",r.style.top=`${l}px`,r.style.left=`${u}px`,r.style.width=`${d}px`,r.style.height=`${h}px`}s.hideOnLeave&&r.style.setProperty("display","none","important")},onAfterLeave(r){if(s.leaveAbsolute&&(r!=null&&r._transitionInitialStyles)){const{position:l,top:u,left:d,width:h,height:f}=r._transitionInitialStyles;delete r._transitionInitialStyles,r.style.position=l||"",r.style.top=u||"",r.style.left=d||"",r.style.width=h||"",r.style.height=f||""}}};return()=>{const r=s.group?Kc:ha;return Mn(r,{name:s.disabled?"":e,css:!s.disabled,...s.group?void 0:{mode:s.mode},...s.disabled?{}:o},i.default)}}})}function lu(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return ke()({name:e,props:{mode:{type:String,default:n},disabled:{type:Boolean,default:Fa()},group:Boolean,hideOnLeave:Boolean},setup(s,a){let{slots:i}=a;const o=s.group?Kc:ha;return()=>Mn(o,{name:s.disabled?"":e,css:!s.disabled,...s.disabled?{}:{...t,onLeave:r=>{var l;s.hideOnLeave?r.style.setProperty("display","none","important"):(l=t.onLeave)==null||l.call(t,r)}}},i.default)}})}function cu(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"y";return{onBeforeEnter(a){a._parent=a.parentNode,a._initialStyle={transition:a.style.transition,overflow:a.style.overflow,width:a.style.width,height:a.style.height}},onEnter(a){const i=a._initialStyle;if(!i)return;a.style.setProperty("transition","none","important"),a.style.overflow="hidden";const o=`${a.offsetWidth}px`,r=`${a.offsetHeight}px`;["x","both"].includes(t)&&(a.style.width="0"),["y","both"].includes(t)&&(a.style.height="0"),a.offsetHeight,a.style.transition=i.transition,e&&a._parent&&a._parent.classList.add(e),requestAnimationFrame(()=>{["x","both"].includes(t)&&(a.style.width=o),["y","both"].includes(t)&&(a.style.height=r)})},onAfterEnter:s,onEnterCancelled:s,onLeave(a){a._initialStyle={transition:"",overflow:a.style.overflow,width:a.style.width,height:a.style.height},a.style.overflow="hidden",["x","both"].includes(t)&&(a.style.width=`${a.offsetWidth}px`),["y","both"].includes(t)&&(a.style.height=`${a.offsetHeight}px`),a.offsetHeight,requestAnimationFrame(()=>{["x","both"].includes(t)&&(a.style.width="0"),["y","both"].includes(t)&&(a.style.height="0")})},onAfterLeave:n,onLeaveCancelled:n};function n(a){e&&a._parent&&a._parent.classList.remove(e),s(a)}function s(a){if(!a._initialStyle)return;const{width:i,height:o}=a._initialStyle;a.style.overflow=a._initialStyle.overflow,i!=null&&["x","both"].includes(t)&&(a.style.width=i),o!=null&&["y","both"].includes(t)&&(a.style.height=o),delete a._initialStyle}}const yS=ee({target:[Object,Array]},"v-dialog-transition"),Ol=new WeakMap,eg=ke()({name:"VDialogTransition",props:yS(),setup(e,t){let{slots:n}=t;const s={onBeforeEnter(a){a.style.pointerEvents="none",a.style.visibility="hidden"},async onEnter(a,i){var f;await new Promise(p=>requestAnimationFrame(p)),await new Promise(p=>requestAnimationFrame(p)),a.style.visibility="";const o=Dh(e.target,a),{x:r,y:l,sx:u,sy:d,speed:h}=o;if(Ol.set(a,o),Fa())Ns(a,[{opacity:0},{}],{duration:125*h,easing:yh}).finished.then(()=>i());else{const p=Ns(a,[{transform:`translate(${r}px, ${l}px) scale(${u}, ${d})`,opacity:0},{}],{duration:225*h,easing:yh});(f=Bh(a))==null||f.forEach(g=>{Ns(g,[{opacity:0},{opacity:0,offset:.33},{}],{duration:450*h,easing:ir})}),p.finished.then(()=>i())}},onAfterEnter(a){a.style.removeProperty("pointer-events")},onBeforeLeave(a){a.style.pointerEvents="none"},async onLeave(a,i){var f;await new Promise(p=>requestAnimationFrame(p));let o;!Ol.has(a)||Array.isArray(e.target)||e.target.offsetParent||e.target.getClientRects().length?o=Dh(e.target,a):o=Ol.get(a);const{x:r,y:l,sx:u,sy:d,speed:h}=o;Fa()?Ns(a,[{},{opacity:0}],{duration:85*h,easing:bh}).finished.then(()=>i()):(Ns(a,[{},{transform:`translate(${r}px, ${l}px) scale(${u}, ${d})`,opacity:0}],{duration:125*h,easing:bh}).finished.then(()=>i()),(f=Bh(a))==null||f.forEach(g=>{Ns(g,[{},{opacity:0,offset:.2},{opacity:0}],{duration:250*h,easing:ir})}))},onAfterLeave(a){a.style.removeProperty("pointer-events")}};return()=>e.target?S(ha,$e({name:"dialog-transition"},s,{css:!1}),n):S(ha,{name:"dialog-transition"},n)}});function Bh(e){var n;const t=(n=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:n.children;return t&&[...t]}function Dh(e,t){const n=eu(e),s=Om(t),[a,i]=getComputedStyle(t).transformOrigin.split(" ").map(y=>parseFloat(y)),[o,r]=getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");let l=n.left+n.width/2;o==="left"||r==="left"?l-=n.width/2:(o==="right"||r==="right")&&(l+=n.width/2);let u=n.top+n.height/2;o==="top"||r==="top"?u-=n.height/2:(o==="bottom"||r==="bottom")&&(u+=n.height/2);const d=n.width/s.width,h=n.height/s.height,f=Math.max(1,d,h),p=d/f||0,g=h/f||0,m=s.width*s.height/(window.innerWidth*window.innerHeight),v=m>.12?Math.min(1.5,(m-.12)*10+1):1;return{x:l-(a+s.left),y:u-(i+s.top),sx:p,sy:g,speed:v}}gn("fab-transition","center center","out-in");gn("dialog-bottom-transition");gn("dialog-top-transition");const Rh=gn("fade-transition");gn("scale-transition");gn("scroll-x-transition");gn("scroll-x-reverse-transition");gn("scroll-y-transition");gn("scroll-y-reverse-transition");gn("slide-x-transition");gn("slide-x-reverse-transition");gn("slide-y-transition");gn("slide-y-reverse-transition");const uu=lu("expand-transition",cu()),bS=lu("expand-x-transition",cu("","x"));lu("expand-both-transition",cu("","both"));const wS=ee({defaults:Object,disabled:Boolean,reset:[Number,String],root:[Boolean,String],scoped:Boolean},"VDefaultsProvider"),gt=ke(!1)({name:"VDefaultsProvider",props:wS(),setup(e,t){let{slots:n}=t;const{defaults:s,disabled:a,reset:i,root:o,scoped:r}=lp(e);return Ss(s,{reset:i,root:o,scoped:r,disabled:a}),()=>{var l;return(l=n.default)==null?void 0:l.call(n)}}}),jn=ee({height:[Number,String],maxHeight:[Number,String],maxWidth:[Number,String],minHeight:[Number,String],minWidth:[Number,String],width:[Number,String]},"dimension");function Vn(e){return{dimensionStyles:N(()=>{const n={},s=pe(e.height),a=pe(e.maxHeight),i=pe(e.maxWidth),o=pe(e.minHeight),r=pe(e.minWidth),l=pe(e.width);return s!=null&&(n.height=s),a!=null&&(n.maxHeight=a),i!=null&&(n.maxWidth=i),o!=null&&(n.minHeight=o),r!=null&&(n.minWidth=r),l!=null&&(n.width=l),n})}}function kS(e){return{aspectStyles:N(()=>{const t=Number(e.aspectRatio);return t?{paddingBottom:String(1/t*100)+"%"}:void 0})}}const tg=ee({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...He(),...jn()},"VResponsive"),Mh=ke()({name:"VResponsive",props:tg(),setup(e,t){let{slots:n}=t;const{aspectStyles:s}=kS(e),{dimensionStyles:a}=Vn(e);return De(()=>{var i;return b("div",{class:fe(["v-responsive",{"v-responsive--inline":e.inline},e.class]),style:Be([a.value,e.style])},[b("div",{class:"v-responsive__sizer",style:Be(s.value)},null),(i=n.additional)==null?void 0:i.call(n),n.default&&b("div",{class:fe(["v-responsive__content",e.contentClass])},[n.default()])])}),{}}});function du(e){return Zc(()=>{const{class:t,style:n}=xS(e);return{colorClasses:t,colorStyles:n}})}function Rs(e){const{colorClasses:t,colorStyles:n}=du(()=>({text:Vt(e)}));return{textColorClasses:t,textColorStyles:n}}function fn(e){const{colorClasses:t,colorStyles:n}=du(()=>({background:Vt(e)}));return{backgroundColorClasses:t,backgroundColorStyles:n}}function SS(e){return{text:typeof e.text=="string"?e.text.replace(/^text-/,""):e.text,background:typeof e.background=="string"?e.background.replace(/^bg-/,""):e.background}}function xS(e){const t=SS(Vt(e)),n=[],s={};if(t.background)if(cc(t.background)){if(s.backgroundColor=t.background,!t.text&&N0(t.background)){const a=Zn(t.background);if(a.a==null||a.a===1){const i=Rm(a);s.color=i,s.caretColor=i}}}else n.push(`bg-${t.background}`);return t.text&&(cc(t.text)?(s.color=t.text,s.caretColor=t.text):n.push(`text-${t.text}`)),{class:n,style:s}}const an=ee({rounded:{type:[Boolean,Number,String],default:void 0},tile:Boolean},"rounded");function vn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:js();return{roundedClasses:N(()=>{const s=wt(e)?e.value:e.rounded,a=wt(e)?!1:e.tile,i=[];if(a||s===!1)i.push("rounded-0");else if(s===!0||s==="")i.push(`${t}--rounded`);else if(typeof s=="string"||s===0)for(const o of String(s).split(" "))i.push(`rounded-${o}`);return i})}}const ng=ee({transition:{type:null,default:"fade-transition",validator:e=>e!==!0}},"transition"),ta=(e,t)=>{let{slots:n}=t;const{transition:s,disabled:a,group:i,...o}=e,{component:r=i?Kc:ha,...l}=nr(s)?s:{};let u;return nr(s)?u=$e(l,p0({disabled:a,group:i}),o):u=$e({name:a||!s?"":s},o),Mn(r,u,n)};function $h(e,t){if(!Jc)return;const n=t.modifiers||{},s=t.value,{handler:a,options:i}=typeof s=="object"?s:{handler:s,options:{}},o=new IntersectionObserver(function(){var h;let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],l=arguments.length>1?arguments[1]:void 0;const u=(h=e._observe)==null?void 0:h[t.instance.$.uid];if(!u)return;const d=r.some(f=>f.isIntersecting);a&&(!n.quiet||u.init)&&(!n.once||d||u.init)&&a(d,r,l),d&&n.once?hc(e,t):u.init=!0},i);e._observe=Object(e._observe),e._observe[t.instance.$.uid]={init:!1,observer:o},o.observe(e)}function hc(e,t){var s;const n=(s=e._observe)==null?void 0:s[t.instance.$.uid];n&&(n.observer.unobserve(e),delete e._observe[t.instance.$.uid])}const jh={mounted:$h,unmounted:hc,updated:(e,t)=>{var n;(n=e._observe)!=null&&n[t.instance.$.uid]&&(hc(e,t),$h(e,t))}},_S=ee({absolute:Boolean,alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,imageClass:null,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...tg(),...He(),...an(),...ng()},"VImg"),hu=ke()({name:"VImg",directives:{vIntersect:jh},props:_S(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,t){let{emit:n,slots:s}=t;const{backgroundColorClasses:a,backgroundColorStyles:i}=fn(()=>e.color),{roundedClasses:o}=vn(e),r=Rt("VImg"),l=be(""),u=Pe(),d=be(e.eager?"loading":"idle"),h=be(),f=be(),p=N(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),g=N(()=>p.value.aspect||h.value/f.value||0);Oe(()=>e.src,()=>{m(d.value!=="idle")}),Oe(g,(R,z)=>{!R&&z&&u.value&&T(u.value)}),Er(()=>m());function m(R){if(!(e.eager&&R)&&!(Jc&&!R&&!e.eager)){if(d.value="loading",p.value.lazySrc){const z=new Image;z.src=p.value.lazySrc,T(z,null)}p.value.src&&It(()=>{var z;n("loadstart",((z=u.value)==null?void 0:z.currentSrc)||p.value.src),setTimeout(()=>{var se;if(!r.isUnmounted)if((se=u.value)!=null&&se.complete){if(u.value.naturalWidth||y(),d.value==="error")return;g.value||T(u.value,null),d.value==="loading"&&v()}else g.value||T(u.value),w()})})}}function v(){var R;r.isUnmounted||(w(),T(u.value),d.value="loaded",n("load",((R=u.value)==null?void 0:R.currentSrc)||p.value.src))}function y(){var R;r.isUnmounted||(d.value="error",n("error",((R=u.value)==null?void 0:R.currentSrc)||p.value.src))}function w(){const R=u.value;R&&(l.value=R.currentSrc||R.src)}let x=-1;In(()=>{clearTimeout(x)});function T(R){let z=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const se=()=>{if(clearTimeout(x),r.isUnmounted)return;const{naturalHeight:re,naturalWidth:we}=R;re||we?(h.value=we,f.value=re):!R.complete&&d.value==="loading"&&z!=null?x=window.setTimeout(se,z):(R.currentSrc.endsWith(".svg")||R.currentSrc.startsWith("data:image/svg+xml"))&&(h.value=1,f.value=1)};se()}const C=j(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),_=()=>{var se;if(!p.value.src||d.value==="idle")return null;const R=b("img",{class:fe(["v-img__img",C.value,e.imageClass]),style:{objectPosition:e.position},crossorigin:e.crossorigin,src:p.value.src,srcset:p.value.srcset,alt:e.alt,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:u,onLoad:v,onError:y},null),z=(se=s.sources)==null?void 0:se.call(s);return S(ta,{transition:e.transition,appear:!0},{default:()=>[pn(z?b("picture",{class:"v-img__picture"},[z,R]):R,[[Xa,d.value==="loaded"]])]})},I=()=>S(ta,{transition:e.transition},{default:()=>[p.value.lazySrc&&d.value!=="loaded"&&b("img",{class:fe(["v-img__img","v-img__img--preload",C.value]),style:{objectPosition:e.position},crossorigin:e.crossorigin,src:p.value.lazySrc,alt:e.alt,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),k=()=>s.placeholder?S(ta,{transition:e.transition,appear:!0},{default:()=>[(d.value==="loading"||d.value==="error"&&!s.error)&&b("div",{class:"v-img__placeholder"},[s.placeholder()])]}):null,O=()=>s.error?S(ta,{transition:e.transition,appear:!0},{default:()=>[d.value==="error"&&b("div",{class:"v-img__error"},[s.error()])]}):null,$=()=>e.gradient?b("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,q=be(!1);{const R=Oe(g,z=>{z&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{q.value=!0})}),R())})}return De(()=>{const R=Mh.filterProps(e);return pn(S(Mh,$e({class:["v-img",{"v-img--absolute":e.absolute,"v-img--booting":!q.value,"v-img--fit-content":e.width==="fit-content"},a.value,o.value,e.class],style:[{width:pe(e.width==="auto"?h.value:e.width)},i.value,e.style]},R,{aspectRatio:g.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>b(ce,null,[S(_,null,null),S(I,null,null),S($,null,null),S(k,null,null),S(O,null,null)]),default:s.default}),[[jh,{handler:m,options:e.options},null,{once:!0}]])}),{currentSrc:l,image:u,state:d,naturalWidth:h,naturalHeight:f}}}),Vs=ee({border:[Boolean,Number,String]},"border");function Fs(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:js();return{borderClasses:N(()=>{const s=e.border;return s===!0||s===""?`${t}--border`:typeof s=="string"||s===0?String(s).split(" ").map(a=>`border-${a}`):[]})}}const Fn=ee({elevation:{type:[Number,String],validator(e){const t=parseInt(e);return!isNaN(t)&&t>=0&&t<=24}}},"elevation");function as(e){return{elevationClasses:j(()=>{const n=wt(e)?e.value:e.elevation;return n==null?[]:[`elevation-${n}`]})}}const Vh={center:"center",top:"bottom",bottom:"top",left:"right",right:"left"},lo=ee({location:String},"location");function co(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n=arguments.length>2?arguments[2]:void 0;const{isRtl:s}=$n();return{locationStyles:N(()=>{if(!e.location)return{};const{side:i,align:o}=lc(e.location.split(" ").length>1?e.location:`${e.location} center`,s.value);function r(u){return n?n(u):0}const l={};return i!=="center"&&(t?l[Vh[i]]=`calc(100% - ${r(i)}px)`:l[i]=0),o!=="center"?t?l[Vh[o]]=`calc(100% - ${r(o)}px)`:l[o]=0:(i==="center"?l.top=l.left="50%":l[{top:"left",bottom:"left",left:"top",right:"top"}[i]]="50%",l.transform={top:"translateX(-50%)",bottom:"translateX(-50%)",left:"translateY(-50%)",right:"translateY(-50%)",center:"translate(-50%, -50%)"}[i]),l})}}const AS=[null,"prominent","default","comfortable","compact"],sg=ee({absolute:Boolean,collapse:Boolean,collapsePosition:{type:String,default:"start"},color:String,density:{type:String,default:"default",validator:e=>AS.includes(e)},extended:{type:Boolean,default:null},extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...Vs(),...He(),...Fn(),...lo(),...an(),...Je({tag:"header"}),...Lt()},"VToolbar"),Fh=ke()({name:"VToolbar",props:sg(),setup(e,t){var g;let{slots:n}=t;const{backgroundColorClasses:s,backgroundColorStyles:a}=fn(()=>e.color),{borderClasses:i}=Fs(e),{elevationClasses:o}=as(e),{locationStyles:r}=co(e),{roundedClasses:l}=vn(e),{themeClasses:u}=Mt(e),{rtlClasses:d}=$n(),h=be(e.extended===null?!!((g=n.extension)!=null&&g.call(n)):e.extended),f=N(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),p=N(()=>h.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return Ss({VBtn:{variant:"text"}}),De(()=>{var w;const m=!!(e.title||n.title),v=!!(n.image||e.image),y=(w=n.extension)==null?void 0:w.call(n);return h.value=e.extended===null?!!y:e.extended,S(e.tag,{class:fe(["v-toolbar",`v-toolbar--collapse-${e.collapsePosition}`,{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},s.value,i.value,o.value,l.value,u.value,d.value,e.class]),style:Be([a.value,r.value,e.style])},{default:()=>[v&&b("div",{key:"image",class:"v-toolbar__image"},[n.image?S(gt,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},n.image):S(hu,{key:"image-img",cover:!0,src:e.image},null)]),S(gt,{defaults:{VTabs:{height:pe(f.value)}}},{default:()=>{var x,T,C;return[b("div",{class:"v-toolbar__content",style:{height:pe(f.value)}},[n.prepend&&b("div",{class:"v-toolbar__prepend"},[(x=n.prepend)==null?void 0:x.call(n)]),m&&S(Zm,{key:"title",text:e.title},{text:n.title}),(T=n.default)==null?void 0:T.call(n),n.append&&b("div",{class:"v-toolbar__append"},[(C=n.append)==null?void 0:C.call(n)])])]}}),S(gt,{defaults:{VTabs:{height:pe(p.value)}}},{default:()=>[S(uu,null,{default:()=>[h.value&&b("div",{class:"v-toolbar__extension",style:{height:pe(p.value)}},[y])]})]})]})}),{contentHeight:f,extensionHeight:p}}}),CS=ee({scrollTarget:{type:String},scrollThreshold:{type:[String,Number],default:300}},"scroll");function TS(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{canScroll:n,layoutSize:s}=t;let a=0,i=0;const o=Pe(null),r=be(0),l=be(0),u=be(0),d=be(!1),h=be(!1),f=be(!1),p=be(!1),g=be(!0),m=N(()=>Number(e.scrollThreshold)),v=N(()=>ts((m.value-r.value)/m.value||0));function y(C){const _="window"in C?window.innerHeight:C.clientHeight,I="window"in C?document.documentElement.scrollHeight:C.scrollHeight;return{clientHeight:_,scrollHeight:I}}function w(){const C=o.value;if(!C)return;const{clientHeight:_,scrollHeight:I}=y(C),k=I-_,O=(s==null?void 0:s.value)||0,$=m.value+O;g.value=k>$}function x(){w()}function T(){const C=o.value;if(!C||n&&!n.value)return;a=r.value,r.value="window"in C?C.pageYOffset:C.scrollTop;const _=C instanceof Window?document.documentElement.scrollHeight:C.scrollHeight;i!==_&&(_>i&&w(),i=_),h.value=r.value<a,u.value=Math.abs(r.value-m.value);const{clientHeight:I,scrollHeight:k}=y(C),O=r.value+I>=k-5;!h.value&&O&&r.value>=m.value&&g.value&&(p.value=!0);const $=Math.abs(r.value-a)>100,q=r.value<=5;(h.value&&a-r.value>1&&!O||$&&r.value<m.value||q)&&(p.value=!1),f.value=O}return Oe(h,()=>{l.value=l.value||r.value}),Oe(d,()=>{l.value=0}),$s(()=>{Oe(()=>e.scrollTarget,C=>{var I;const _=C?document.querySelector(C):window;_&&_!==o.value&&((I=o.value)==null||I.removeEventListener("scroll",T),o.value=_,o.value.addEventListener("scroll",T,{passive:!0}),Promise.resolve().then(()=>{w()}))},{immediate:!0}),window.addEventListener("resize",x,{passive:!0})}),In(()=>{var C;(C=o.value)==null||C.removeEventListener("scroll",T),window.removeEventListener("resize",x)}),n&&Oe(n,T,{immediate:!0}),{scrollThreshold:m,currentScroll:r,currentThreshold:u,isScrollActive:d,scrollRatio:v,isScrollingUp:h,savedScroll:l,isAtBottom:f,reachedBottomWhileScrollingDown:p,hasEnoughScrollableSpace:g}}function Mr(){const e=be(!1);return $s(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:j(()=>e.value?void 0:{transition:"none !important"}),isBooted:Ra(e)}}const IS=ee({scrollBehavior:String,modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...ss(sg(),["location"]),...cS(),...CS(),height:{type:[Number,String],default:64}},"VAppBar"),ES=ke()({name:"VAppBar",props:IS(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const s=Pe(),a=Kt(e,"modelValue"),i=N(()=>{var I;const _=new Set(((I=e.scrollBehavior)==null?void 0:I.split(" "))??[]);return{hide:_.has("hide"),fullyHide:_.has("fully-hide"),inverted:_.has("inverted"),collapse:_.has("collapse"),elevate:_.has("elevate"),fadeImage:_.has("fade-image")}}),o=N(()=>{const _=i.value;return _.hide||_.fullyHide||_.inverted||_.collapse||_.elevate||_.fadeImage||!a.value}),r=N(()=>{var k,O;const _=((k=s.value)==null?void 0:k.contentHeight)??0,I=((O=s.value)==null?void 0:O.extensionHeight)??0;return _+I}),{currentScroll:l,scrollThreshold:u,isScrollingUp:d,scrollRatio:h,isAtBottom:f,reachedBottomWhileScrollingDown:p,hasEnoughScrollableSpace:g}=TS(e,{canScroll:o,layoutSize:r}),m=j(()=>i.value.hide||i.value.fullyHide),v=N(()=>e.collapse||i.value.collapse&&(i.value.inverted?h.value>0:h.value===0)),y=N(()=>e.flat||i.value.fullyHide&&!a.value||i.value.elevate&&(i.value.inverted?l.value>0:l.value===0)),w=N(()=>i.value.fadeImage?i.value.inverted?1-h.value:h.value:void 0),x=N(()=>{var k,O;if(i.value.hide&&i.value.inverted)return 0;const _=((k=s.value)==null?void 0:k.contentHeight)??0,I=((O=s.value)==null?void 0:O.extensionHeight)??0;return m.value?l.value<u.value||i.value.fullyHide?_+I:_:_+I});Qa(()=>!!e.scrollBehavior,()=>{mn(()=>{if(!m.value){a.value=!0;return}if(i.value.inverted){a.value=l.value>u.value;return}if(!g.value){a.value=!0;return}if(p.value){a.value=!1;return}a.value=d.value&&!f.value||l.value<u.value})});const{ssrBootStyles:T}=Mr(),{layoutItemStyles:C}=dS({id:e.name,order:N(()=>parseInt(e.order,10)),position:j(()=>e.location),layoutSize:x,elementSize:be(void 0),active:a,absolute:j(()=>e.absolute)});return De(()=>{const _=ss(Fh.filterProps(e),["location"]);return S(Fh,$e({ref:s,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"},e.class],style:[{...C.value,"--v-toolbar-image-opacity":w.value,height:void 0,...T.value},e.style]},_,{collapse:v.value,flat:y.value}),n)}),{}}}),LS=[null,"default","comfortable","compact"],En=ee({density:{type:String,default:"default",validator:e=>LS.includes(e)}},"density");function Wn(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:js();return{densityClasses:j(()=>`${t}--density-${e.density}`)}}const OS=["elevated","flat","tonal","outlined","text","plain"];function Za(e,t){return b(ce,null,[e&&b("span",{key:"overlay",class:fe(`${t}__overlay`)},null),b("span",{key:"underlay",class:fe(`${t}__underlay`)},null)])}const xs=ee({color:String,variant:{type:String,default:"elevated",validator:e=>OS.includes(e)}},"variant");function ei(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:js();const n=j(()=>{const{variant:i}=Vt(e);return`${t}--variant-${i}`}),{colorClasses:s,colorStyles:a}=du(()=>{const{variant:i,color:o}=Vt(e);return{[["elevated","flat"].includes(i)?"background":"text"]:o}});return{colorClasses:s,colorStyles:a,variantClasses:n}}const ag=ee({baseColor:String,divided:Boolean,direction:{type:String,default:"horizontal"},...Vs(),...He(),...En(),...Fn(),...an(),...Je(),...Lt(),...xs()},"VBtnGroup"),Wh=ke()({name:"VBtnGroup",props:ag(),setup(e,t){let{slots:n}=t;const{themeClasses:s}=Mt(e),{densityClasses:a}=Wn(e),{borderClasses:i}=Fs(e),{elevationClasses:o}=as(e),{roundedClasses:r}=vn(e);Ss({VBtn:{height:j(()=>e.direction==="horizontal"?"auto":null),baseColor:j(()=>e.baseColor),color:j(()=>e.color),density:j(()=>e.density),flat:!0,variant:j(()=>e.variant)}}),De(()=>S(e.tag,{class:fe(["v-btn-group",`v-btn-group--${e.direction}`,{"v-btn-group--divided":e.divided},s.value,i.value,a.value,o.value,r.value,e.class]),style:Be(e.style)},n))}}),$r=ee({modelValue:{type:null,default:void 0},multiple:Boolean,mandatory:[Boolean,String],max:Number,selectedClass:String,disabled:Boolean},"group"),jr=ee({value:null,disabled:Boolean,selectedClass:String},"group-item");function Ki(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;const s=Rt("useGroupItem");if(!s)throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");const a=Ya();Dt(Symbol.for(`${t.description}:id`),a);const i=Xe(t,null);if(!i){if(!n)return i;throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`)}const o=j(()=>e.value),r=N(()=>!!(i.disabled.value||e.disabled));function l(){i==null||i.register({id:a,value:o,disabled:r},s)}function u(){i==null||i.unregister(a)}l(),In(()=>u());const d=N(()=>i.isSelected(a)),h=N(()=>i.items.value[0].id===a),f=N(()=>i.items.value[i.items.value.length-1].id===a),p=N(()=>d.value&&[i.selectedClass.value,e.selectedClass]);return Oe(d,g=>{s.emit("group:selected",{value:g})},{flush:"sync"}),{id:a,isSelected:d,isFirst:h,isLast:f,toggle:()=>i.select(a,!d.value),select:g=>i.select(a,g),selectedClass:p,value:o,disabled:r,group:i,register:l,unregister:u}}function uo(e,t){let n=!1;const s=jt([]),a=Kt(e,"modelValue",[],f=>f===void 0?[]:ig(s,f===null?[null]:Qc(f)),f=>{const p=PS(s,f);return e.multiple?p:p[0]}),i=Rt("useGroup");function o(f,p){const g=f,m=Symbol.for(`${t.description}:id`),y=Ca(m,i==null?void 0:i.vnode).indexOf(p);zt(g.value)===void 0&&(g.value=y,g.useIndexAsValue=!0),y>-1?s.splice(y,0,g):s.push(g)}function r(f){if(n)return;l();const p=s.findIndex(g=>g.id===f);s.splice(p,1)}function l(){const f=s.find(p=>!p.disabled);f&&e.mandatory==="force"&&!a.value.length&&(a.value=[f.id])}$s(()=>{l()}),In(()=>{n=!0}),Hc(()=>{for(let f=0;f<s.length;f++)s[f].useIndexAsValue&&(s[f].value=f)});function u(f,p){const g=s.find(m=>m.id===f);if(!(p&&(g!=null&&g.disabled)))if(e.multiple){const m=a.value.slice(),v=m.findIndex(w=>w===f),y=~v;if(p=p??!y,y&&e.mandatory&&m.length<=1||!y&&e.max!=null&&m.length+1>e.max)return;v<0&&p?m.push(f):v>=0&&!p&&m.splice(v,1),a.value=m}else{const m=a.value.includes(f);if(e.mandatory&&m||!m&&!p)return;a.value=p??!m?[f]:[]}}function d(f){if(e.multiple,a.value.length){const p=a.value[0],g=s.findIndex(y=>y.id===p);let m=(g+f)%s.length,v=s[m];for(;v.disabled&&m!==g;)m=(m+f)%s.length,v=s[m];if(v.disabled)return;a.value=[s[m].id]}else{const p=s.find(g=>!g.disabled);p&&(a.value=[p.id])}}const h={register:o,unregister:r,selected:a,select:u,disabled:j(()=>e.disabled),prev:()=>d(s.length-1),next:()=>d(1),isSelected:f=>a.value.includes(f),selectedClass:j(()=>e.selectedClass),items:j(()=>s),getItemIndex:f=>NS(s,f)};return Dt(t,h),h}function NS(e,t){const n=ig(e,[t]);return n.length?e.findIndex(s=>s.id===n[0]):-1}function ig(e,t){const n=[];return t.forEach(s=>{const a=e.find(o=>ca(s,o.value)),i=e[s];(a==null?void 0:a.value)!==void 0?n.push(a.id):i!=null&&i.useIndexAsValue&&n.push(i.id)}),n}function PS(e,t){const n=[];return t.forEach(s=>{const a=e.findIndex(i=>i.id===s);if(~a){const i=e[a];n.push(i.value!==void 0?i.value:a)}}),n}const og=Symbol.for("vuetify:v-btn-toggle"),BS=ee({...ag(),...$r()},"VBtnToggle");ke()({name:"VBtnToggle",props:BS(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const{isSelected:s,next:a,prev:i,select:o,selected:r}=uo(e,og);return De(()=>{const l=Wh.filterProps(e);return S(Wh,$e({class:["v-btn-toggle",e.class]},l,{style:e.style}),{default:()=>{var u;return[(u=n.default)==null?void 0:u.call(n,{isSelected:s,next:a,prev:i,select:o,selected:r})]}})}),{next:a,prev:i,select:o}}});const DS=["x-small","small","default","large","x-large"],ma=ee({size:{type:[String,Number],default:"default"}},"size");function ti(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:js();return Zc(()=>{const n=e.size;let s,a;return sr(DS,n)?s=`${t}--size-${n}`:n&&(a={width:pe(n),height:pe(n)}),{sizeClasses:s,sizeStyles:a}})}const RS=ee({color:String,disabled:Boolean,start:Boolean,end:Boolean,icon:ot,opacity:[String,Number],...He(),...ma(),...Je({tag:"i"}),...Lt()},"VIcon"),Ke=ke()({name:"VIcon",props:RS(),setup(e,t){let{attrs:n,slots:s}=t;const a=be(),{themeClasses:i}=rS(),{iconData:o}=X0(()=>a.value||e.icon),{sizeClasses:r}=ti(e),{textColorClasses:l,textColorStyles:u}=Rs(()=>e.color);return De(()=>{var f,p;const d=(f=s.default)==null?void 0:f.call(s);d&&(a.value=(p=Tm(d).filter(g=>g.type===ao&&g.children&&typeof g.children=="string")[0])==null?void 0:p.children);const h=!!(n.onClick||n.onClickOnce);return S(o.value.component,{tag:e.tag,icon:o.value.icon,class:fe(["v-icon","notranslate",i.value,r.value,l.value,{"v-icon--clickable":h,"v-icon--disabled":e.disabled,"v-icon--start":e.start,"v-icon--end":e.end},e.class]),style:Be([{"--v-icon-opacity":e.opacity},r.value?void 0:{fontSize:pe(e.size),height:pe(e.size),width:pe(e.size)},u.value,e.style]),role:h?"button":void 0,"aria-hidden":!h,tabindex:h?e.disabled?-1:0:void 0},{default:()=>[d]})}),{}}});function rg(e,t){const n=Pe(),s=be(!1);if(Jc){const a=new IntersectionObserver(i=>{s.value=!!i.find(o=>o.isIntersecting)},t);sn(()=>{a.disconnect()}),Oe(n,(i,o)=>{o&&(a.unobserve(o),s.value=!1),i&&a.observe(i)},{flush:"post"})}return{intersectionRef:n,isIntersecting:s}}const MS=ee({reveal:{type:[Boolean,Object],default:!1}},"reveal");function $S(e){const n=j(()=>typeof e.reveal=="object"?Math.max(0,Number(e.reveal.duration??900)):900),s=be(e.reveal?"initial":"disabled");return $s(async()=>{e.reveal&&(s.value="initial",await new Promise(a=>requestAnimationFrame(a)),s.value="pending",await new Promise(a=>setTimeout(a,n.value)),s.value="done")}),{duration:n,state:s}}const jS=ee({bgColor:String,color:String,indeterminate:[Boolean,String],rounded:Boolean,modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...He(),...MS(),...ma(),...Je({tag:"div"}),...Lt()},"VProgressCircular"),VS=ke()({name:"VProgressCircular",props:jS(),setup(e,t){let{slots:n}=t;const s=20,a=2*Math.PI*s,i=Pe(),{themeClasses:o}=Mt(e),{sizeClasses:r,sizeStyles:l}=ti(e),{textColorClasses:u,textColorStyles:d}=Rs(()=>e.color),{textColorClasses:h,textColorStyles:f}=Rs(()=>e.bgColor),{intersectionRef:p,isIntersecting:g}=rg(),{resizeRef:m,contentRect:v}=Gi(),{state:y,duration:w}=$S(e),x=j(()=>y.value==="initial"?0:ts(parseFloat(e.modelValue),0,100)),T=j(()=>Number(e.width)),C=j(()=>l.value?Number(e.size):v.value?v.value.width:Math.max(T.value,32)),_=j(()=>s/(1-T.value/C.value)*2),I=j(()=>T.value/C.value*_.value),k=j(()=>{const $=(100-x.value)/100*a;return e.rounded&&x.value>0&&x.value<100?pe(Math.min(a-.01,$+I.value)):pe($)}),O=N(()=>{const $=Number(e.rotate);return e.rounded?$+I.value/2/a*360:$});return mn(()=>{p.value=i.value,m.value=i.value}),De(()=>S(e.tag,{ref:i,class:fe(["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":g.value,"v-progress-circular--disable-shrink":e.indeterminate&&(e.indeterminate==="disable-shrink"||Fa()),"v-progress-circular--revealing":["initial","pending"].includes(y.value)},o.value,r.value,u.value,e.class]),style:Be([l.value,d.value,{"--progress-reveal-duration":`${w.value}ms`},e.style]),role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:x.value},{default:()=>[b("svg",{style:{transform:`rotate(calc(-90deg + ${O.value}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${_.value} ${_.value}`},[b("circle",{class:fe(["v-progress-circular__underlay",h.value]),style:Be(f.value),fill:"transparent",cx:"50%",cy:"50%",r:s,"stroke-width":I.value,"stroke-dasharray":a,"stroke-dashoffset":0},null),b("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:s,"stroke-width":I.value,"stroke-dasharray":a,"stroke-dashoffset":k.value,"stroke-linecap":e.rounded?"round":void 0},null)]),n.default&&b("div",{class:"v-progress-circular__content"},[n.default({value:x.value})])]})),{}}}),FS=ee({chunkCount:{type:[Number,String],default:null},chunkWidth:{type:[Number,String],default:null},chunkGap:{type:[Number,String],default:4}},"chunks");function WS(e,t){const n=j(()=>!!e.chunkCount||!!e.chunkWidth),s=N(()=>{const r=Vt(t);if(!r)return 0;if(!e.chunkCount)return Number(e.chunkWidth);const l=Number(e.chunkCount);return(r-Number(e.chunkGap)*(l-1))/l}),a=j(()=>Number(e.chunkGap)),i=N(()=>{if(!n.value)return{};const r=pe(a.value),l=pe(s.value);return{maskRepeat:"repeat-x",maskImage:`linear-gradient(90deg, #000, #000 ${l}, transparent ${l}, transparent)`,maskSize:`calc(${l} + ${r}) 100%`}});function o(r){const l=Vt(t);if(!l)return r;const u=100*a.value/l,d=100*(s.value+a.value)/l,h=Math.floor((r+u)/d+1e-9);return ts(h*d-u/2,0,100)}return{hasChunks:n,chunksMaskStyles:i,snapValueToChunk:o}}const HS=ee({absolute:Boolean,active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},bufferColor:String,bufferOpacity:[Number,String],clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},opacity:[Number,String],reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean,...FS(),...He(),...lo({location:"top"}),...an(),...Je(),...Lt()},"VProgressLinear"),qS=ke()({name:"VProgressLinear",props:HS(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const s=Pe(),a=Kt(e,"modelValue"),{isRtl:i,rtlClasses:o}=$n(),{themeClasses:r}=Mt(e),{locationStyles:l}=co(e),{textColorClasses:u,textColorStyles:d}=Rs(()=>e.color),{backgroundColorClasses:h,backgroundColorStyles:f}=fn(()=>e.bgColor||e.color),{backgroundColorClasses:p,backgroundColorStyles:g}=fn(()=>e.bufferColor||e.bgColor||e.color),{backgroundColorClasses:m,backgroundColorStyles:v}=fn(()=>e.color),{roundedClasses:y}=vn(e),{intersectionRef:w,isIntersecting:x}=rg(),T=N(()=>parseFloat(e.max)),C=N(()=>parseFloat(e.height)),_=N(()=>ts(parseFloat(e.bufferValue)/T.value*100,0,100)),I=N(()=>ts(parseFloat(a.value)/T.value*100,0,100)),k=N(()=>i.value!==e.reverse),O=N(()=>e.indeterminate?"fade-transition":"slide-x-transition"),$=be(0),{hasChunks:q,chunksMaskStyles:R,snapValueToChunk:z}=WS(e,$);Qa(q,()=>{const{resizeRef:me}=Gi(ge=>$.value=ge[0].contentRect.width);mn(()=>me.value=s.value)});const se=N(()=>q.value?z(_.value):_.value),re=N(()=>q.value?z(I.value):I.value);function we(me){if(!w.value)return;const{left:ge,right:Ze,width:Ve}=w.value.getBoundingClientRect(),Se=k.value?Ve-me.clientX+(Ze-Ve):me.clientX-ge;a.value=Math.round(Se/Ve*T.value)}return mn(()=>{w.value=s.value}),De(()=>S(e.tag,{ref:s,class:fe(["v-progress-linear",{"v-progress-linear--absolute":e.absolute,"v-progress-linear--active":e.active&&x.value,"v-progress-linear--reverse":k.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped,"v-progress-linear--clickable":e.clickable},y.value,r.value,o.value,e.class]),style:Be([{bottom:e.location==="bottom"?0:void 0,top:e.location==="top"?0:void 0,height:e.active?pe(C.value):0,"--v-progress-linear-height":pe(C.value),...e.absolute?l.value:{}},R.value,e.style]),role:"progressbar","aria-hidden":e.active?"false":"true","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:Math.min(parseFloat(a.value),T.value),onClick:e.clickable&&we},{default:()=>[e.stream&&b("div",{key:"stream",class:fe(["v-progress-linear__stream",u.value]),style:{...d.value,[k.value?"left":"right"]:pe(-C.value),borderTop:`${pe(C.value/2)} dotted`,opacity:parseFloat(e.bufferOpacity),top:`calc(50% - ${pe(C.value/4)})`,width:pe(100-_.value,"%"),"--v-progress-linear-stream-to":pe(C.value*(k.value?1:-1))}},null),b("div",{class:fe(["v-progress-linear__background",h.value]),style:Be([f.value,{opacity:parseFloat(e.bgOpacity),width:e.stream?0:void 0}])},null),b("div",{class:fe(["v-progress-linear__buffer",p.value]),style:Be([g.value,{opacity:parseFloat(e.bufferOpacity),width:pe(se.value,"%")}])},null),S(ha,{name:O.value},{default:()=>[e.indeterminate?b("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(me=>b("div",{key:me,class:fe(["v-progress-linear__indeterminate",me,m.value]),style:Be(v.value)},null))]):b("div",{class:fe(["v-progress-linear__determinate",m.value]),style:Be([v.value,{width:pe(re.value,"%")}])},null)]}),n.default&&b("div",{class:"v-progress-linear__content"},[n.default({value:I.value,buffer:_.value})])]})),{}}}),lg=ee({loading:[Boolean,String]},"loader");function cg(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:js();return{loaderClasses:j(()=>({[`${t}--loading`]:e.loading}))}}function zS(e,t){var s;let{slots:n}=t;return b("div",{class:fe(`${e.name}__loader`)},[((s=n.default)==null?void 0:s.call(n,{color:e.color,isActive:e.active}))||S(qS,{absolute:e.absolute,active:e.active,color:e.color,height:"2",indeterminate:!0},null)])}const US=["static","relative","fixed","absolute","sticky"],fu=ee({position:{type:String,validator:e=>US.includes(e)}},"position");function pu(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:js();return{positionClasses:j(()=>e.position?`${t}--${e.position}`:void 0)}}function GS(){const e=Rt("useRoute");return N(()=>{var t;return(t=e==null?void 0:e.proxy)==null?void 0:t.$route})}function KS(){var e,t;return(t=(e=Rt("useRouter"))==null?void 0:e.proxy)==null?void 0:t.$router}function Vr(e,t){const n=Ep("RouterLink"),s=j(()=>!!(e.href||e.to)),a=N(()=>(s==null?void 0:s.value)||sh(t,"click")||sh(e,"click"));if(typeof n=="string"||!("useLink"in n)){const h=j(()=>e.href);return{isLink:s,isRouterLink:j(()=>!1),isClickable:a,href:h,linkProps:jt({href:h}),route:j(()=>{}),navigate:j(()=>{})}}const i=n.useLink({to:j(()=>e.to||""),replace:j(()=>e.replace)}),o=N(()=>e.to?i:void 0),r=GS(),l=N(()=>{var h,f,p;return o.value?e.exact?r.value?((p=o.value.isExactActive)==null?void 0:p.value)&&ca(o.value.route.value.query,r.value.query):((f=o.value.isExactActive)==null?void 0:f.value)??!1:((h=o.value.isActive)==null?void 0:h.value)??!1:!1}),u=N(()=>{var h;return e.to?(h=o.value)==null?void 0:h.route.value.href:e.href});return{isLink:s,isRouterLink:j(()=>!!e.to),isClickable:a,isActive:l,route:j(()=>{var h;return(h=o.value)==null?void 0:h.route.value}),navigate:j(()=>{var h;return(h=o.value)==null?void 0:h.navigate}),href:u,linkProps:jt({href:u,"aria-current":j(()=>l.value?"page":void 0),"aria-disabled":j(()=>e.disabled&&s.value?"true":void 0),tabindex:j(()=>e.disabled&&s.value?"-1":void 0)})}}const Fr=ee({href:String,replace:Boolean,to:[String,Object],exact:Boolean},"router");let Nl=!1;function YS(e,t){let n=!1,s,a;rt&&(e!=null&&e.beforeEach)&&(It(()=>{window.addEventListener("popstate",i),s=e.beforeEach(()=>Nl?n?t():void 0:(Nl=!0,new Promise(o=>{setTimeout(()=>o(n?t():void 0))}))),a=e==null?void 0:e.afterEach(()=>{Nl=!1})}),sn(()=>{window.removeEventListener("popstate",i),s==null||s(),a==null||a()}));function i(o){var r;(r=o.state)!=null&&r.replaced||(n=!0,setTimeout(()=>n=!1))}}function XS(e,t){Oe(()=>{var n;return(n=e.isActive)==null?void 0:n.value},n=>{e.isLink.value&&n!=null&&t&&It(()=>{t(n)})},{immediate:!0})}const fc=Symbol("rippleStop"),JS=80;function Hh(e,t){e.style.transform=t,e.style.webkitTransform=t}function pc(e){return e.constructor.name==="TouchEvent"}function ug(e){return e.constructor.name==="KeyboardEvent"}const QS=function(e,t){var h;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=0,a=0;if(!ug(e)){const f=new dn(t),p=pc(e)?e.touches[e.touches.length-1]:e,g=eu([p.clientX,p.clientY]);s=g.x-f.left,a=g.y-f.top}let i=0,o=.3;(h=t._ripple)!=null&&h.circle?(o=.15,i=t.clientWidth/2,i=n.center?i:i+Math.sqrt((s-i)**2+(a-i)**2)/4):i=Math.sqrt(t.clientWidth**2+t.clientHeight**2)/2;const r=`${(t.clientWidth-i*2)/2}px`,l=`${(t.clientHeight-i*2)/2}px`,u=n.center?r:`${s-i}px`,d=n.center?l:`${a-i}px`;return{radius:i,scale:o,x:u,y:d,centerX:r,centerY:l}},dr={show(e,t){var p;let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!((p=t==null?void 0:t._ripple)!=null&&p.enabled))return;const s=document.createElement("span"),a=document.createElement("span");s.appendChild(a),s.className="v-ripple__container",n.class&&(s.className+=` ${n.class}`);const{radius:i,scale:o,x:r,y:l,centerX:u,centerY:d}=QS(e,t,n),h=`${i*2}px`;a.className="v-ripple__animation",a.style.width=h,a.style.height=h,t.appendChild(s);const f=window.getComputedStyle(t);f&&f.position==="static"&&(t.style.position="relative",t.dataset.previousPosition="static"),a.classList.add("v-ripple__animation--enter"),a.classList.add("v-ripple__animation--visible"),Hh(a,`translate(${r}, ${l}) scale3d(${o},${o},${o})`),a.dataset.activated=String(performance.now()),requestAnimationFrame(()=>{requestAnimationFrame(()=>{a.classList.remove("v-ripple__animation--enter"),a.classList.add("v-ripple__animation--in"),Hh(a,`translate(${u}, ${d}) scale3d(1,1,1)`)})})},hide(e){var i;if(!((i=e==null?void 0:e._ripple)!=null&&i.enabled))return;const t=e.getElementsByClassName("v-ripple__animation");if(t.length===0)return;const n=Array.from(t).findLast(o=>!o.dataset.isHiding);if(n)n.dataset.isHiding="true";else return;const s=performance.now()-Number(n.dataset.activated),a=Math.max(250-s,0);setTimeout(()=>{n.classList.remove("v-ripple__animation--in"),n.classList.add("v-ripple__animation--out"),setTimeout(()=>{var r;e.getElementsByClassName("v-ripple__animation").length===1&&e.dataset.previousPosition&&(e.style.position=e.dataset.previousPosition,delete e.dataset.previousPosition),((r=n.parentNode)==null?void 0:r.parentNode)===e&&e.removeChild(n.parentNode)},300)},a)}};function dg(e){return typeof e>"u"||!!e}function Yi(e){const t={},n=e.currentTarget;if(!(!(n!=null&&n._ripple)||n._ripple.touched||e[fc])){if(e[fc]=!0,pc(e))n._ripple.touched=!0,n._ripple.isTouch=!0;else if(n._ripple.isTouch)return;if(t.center=n._ripple.centered||ug(e),n._ripple.class&&(t.class=n._ripple.class),pc(e)){if(n._ripple.showTimerCommit)return;n._ripple.showTimerCommit=()=>{dr.show(e,n,t)},n._ripple.showTimer=window.setTimeout(()=>{var s;(s=n==null?void 0:n._ripple)!=null&&s.showTimerCommit&&(n._ripple.showTimerCommit(),n._ripple.showTimerCommit=null)},JS)}else dr.show(e,n,t)}}function hr(e){e[fc]=!0}function rn(e){const t=e.currentTarget;if(t!=null&&t._ripple){if(window.clearTimeout(t._ripple.showTimer),e.type==="touchend"&&t._ripple.showTimerCommit){t._ripple.showTimerCommit(),t._ripple.showTimerCommit=null,t._ripple.showTimer=window.setTimeout(()=>{rn(e)});return}window.setTimeout(()=>{t._ripple&&(t._ripple.touched=!1)}),dr.hide(t)}}function hg(e){const t=e.currentTarget;t!=null&&t._ripple&&(t._ripple.showTimerCommit&&(t._ripple.showTimerCommit=null),window.clearTimeout(t._ripple.showTimer))}let Xi=!1;function ZS(e,t){!Xi&&t.includes(e.key)&&(Xi=!0,Yi(e))}function fg(e){Xi=!1,rn(e)}function pg(e){Xi&&(Xi=!1,rn(e))}function mg(e,t,n){const{value:s,modifiers:a}=t,i=dg(s);i||dr.hide(e),e._ripple=e._ripple??{},e._ripple.enabled=i,e._ripple.centered=a.center,e._ripple.circle=a.circle;const o=nr(s)?s:{};o.class&&(e._ripple.class=o.class);const r=o.keys??["Enter","Space"];if(e._ripple.keyDownHandler=l=>ZS(l,r),i&&!n){if(a.stop){e.addEventListener("touchstart",hr,{passive:!0}),e.addEventListener("mousedown",hr);return}e.addEventListener("touchstart",Yi,{passive:!0}),e.addEventListener("touchend",rn,{passive:!0}),e.addEventListener("touchmove",hg,{passive:!0}),e.addEventListener("touchcancel",rn),e.addEventListener("mousedown",Yi),e.addEventListener("mouseup",rn),e.addEventListener("mouseleave",rn),e.addEventListener("keydown",e._ripple.keyDownHandler),e.addEventListener("keyup",fg),e.addEventListener("blur",pg),e.addEventListener("dragstart",rn,{passive:!0})}else!i&&n&&gg(e)}function gg(e){var t;e.removeEventListener("touchstart",hr),e.removeEventListener("mousedown",hr),e.removeEventListener("touchstart",Yi),e.removeEventListener("touchend",rn),e.removeEventListener("touchmove",hg),e.removeEventListener("touchcancel",rn),e.removeEventListener("mousedown",Yi),e.removeEventListener("mouseup",rn),e.removeEventListener("mouseleave",rn),(t=e._ripple)!=null&&t.keyDownHandler&&e.removeEventListener("keydown",e._ripple.keyDownHandler),e.removeEventListener("keyup",fg),e.removeEventListener("blur",pg),e.removeEventListener("dragstart",rn)}function ex(e,t){mg(e,t,!1)}function tx(e){gg(e),delete e._ripple}function nx(e,t){if(t.value===t.oldValue)return;const n=dg(t.oldValue);mg(e,t,n)}const ys={mounted:ex,unmounted:tx,updated:nx},vg=ee({active:{type:Boolean,default:void 0},activeColor:String,baseColor:String,symbol:{type:null,default:og},flat:Boolean,icon:[Boolean,String,Function,Object],prependIcon:ot,appendIcon:ot,block:Boolean,readonly:Boolean,slim:Boolean,stacked:Boolean,spaced:String,ripple:{type:[Boolean,Object],default:!0},text:{type:[String,Number,Boolean],default:void 0},...Vs(),...He(),...En(),...jn(),...Fn(),...jr(),...lg(),...lo(),...fu(),...an(),...Fr(),...ma(),...Je({tag:"button"}),...Lt(),...xs({variant:"elevated"})},"VBtn"),ht=ke()({name:"VBtn",props:vg(),emits:{"group:selected":e=>!0},setup(e,t){let{attrs:n,slots:s}=t;const{themeClasses:a}=Mt(e),{borderClasses:i}=Fs(e),{densityClasses:o}=Wn(e),{dimensionStyles:r}=Vn(e),{elevationClasses:l}=as(e),{loaderClasses:u}=cg(e),{locationStyles:d}=co(e),{positionClasses:h}=pu(e),{roundedClasses:f}=vn(e),{sizeClasses:p,sizeStyles:g}=ti(e),m=Ki(e,e.symbol,!1),v=Vr(e,n),y=N(()=>{var q;return e.active!==void 0?e.active:v.isRouterLink.value?(q=v.isActive)==null?void 0:q.value:m==null?void 0:m.isSelected.value}),w=j(()=>y.value?e.activeColor??e.color:e.color),x=N(()=>{var R,z;return{color:(m==null?void 0:m.isSelected.value)&&(!v.isLink.value||((R=v.isActive)==null?void 0:R.value))||!m||((z=v.isActive)==null?void 0:z.value)?w.value??e.baseColor:e.baseColor,variant:e.variant}}),{colorClasses:T,colorStyles:C,variantClasses:_}=ei(x),I=N(()=>(m==null?void 0:m.disabled.value)||e.disabled),k=j(()=>e.variant==="elevated"&&!(e.disabled||e.flat||e.border)),O=N(()=>{if(!(e.value===void 0||typeof e.value=="symbol"))return Object(e.value)===e.value?JSON.stringify(e.value,null,0):e.value});function $(q){var R,z;I.value||v.isLink.value&&(q.metaKey||q.ctrlKey||q.shiftKey||q.button!==0||n.target==="_blank")||(v.isRouterLink.value?(z=(R=v.navigate).value)==null||z.call(R,q):m==null||m.toggle())}return XS(v,m==null?void 0:m.select),De(()=>{const q=v.isLink.value?"a":e.tag,R=!!(e.prependIcon||s.prepend),z=!!(e.appendIcon||s.append),se=!!(e.icon&&e.icon!==!0);return pn(S(q,$e(v.linkProps,{type:q==="a"?void 0:"button",class:["v-btn",m==null?void 0:m.selectedClass.value,{"v-btn--active":y.value,"v-btn--block":e.block,"v-btn--disabled":I.value,"v-btn--elevated":k.value,"v-btn--flat":e.flat,"v-btn--icon":!!e.icon,"v-btn--loading":e.loading,"v-btn--readonly":e.readonly,"v-btn--slim":e.slim,"v-btn--stacked":e.stacked},e.spaced?["v-btn--spaced",`v-btn--spaced-${e.spaced}`]:[],a.value,i.value,T.value,o.value,l.value,u.value,h.value,f.value,p.value,_.value,e.class],style:[C.value,r.value,d.value,g.value,e.style],"aria-busy":e.loading?!0:void 0,disabled:I.value&&q!=="a"||void 0,tabindex:e.loading||e.readonly?-1:void 0,onClick:$,value:O.value}),{default:()=>{var re;return[Za(!0,"v-btn"),!e.icon&&R&&b("span",{key:"prepend",class:"v-btn__prepend"},[s.prepend?S(gt,{key:"prepend-defaults",disabled:!e.prependIcon,defaults:{VIcon:{icon:e.prependIcon}}},s.prepend):S(Ke,{key:"prepend-icon",icon:e.prependIcon},null)]),b("span",{class:"v-btn__content","data-no-activator":""},[!s.default&&se?S(Ke,{key:"content-icon",icon:e.icon},null):S(gt,{key:"content-defaults",disabled:!se,defaults:{VIcon:{icon:e.icon}}},{default:()=>{var we;return[((we=s.default)==null?void 0:we.call(s))??V(e.text)]}})]),!e.icon&&z&&b("span",{key:"append",class:"v-btn__append"},[s.append?S(gt,{key:"append-defaults",disabled:!e.appendIcon,defaults:{VIcon:{icon:e.appendIcon}}},s.append):S(Ke,{key:"append-icon",icon:e.appendIcon},null)]),!!e.loading&&b("span",{key:"loader",class:"v-btn__loader"},[((re=s.loader)==null?void 0:re.call(s))??S(VS,{color:typeof e.loading=="boolean"?void 0:e.loading,indeterminate:!0,width:"2"},null)])]}}),[[ys,!I.value&&e.ripple,"",{center:!!e.icon}]])}),{group:m}}}),sx=ke()({name:"VAppBarTitle",props:Qm(),setup(e,t){let{slots:n}=t;return De(()=>S(Zm,$e(e,{class:"v-app-bar-title"}),n)),{}}}),ax=["dotted","dashed","solid","double"],ix=ee({color:String,contentOffset:[Number,String,Array],gradient:Boolean,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,variant:{type:String,default:"solid",validator:e=>ax.includes(e)},...He(),...Lt()},"VDivider"),yg=ke()({name:"VDivider",props:ix(),setup(e,t){let{attrs:n,slots:s}=t;const{themeClasses:a}=Mt(e),{textColorClasses:i,textColorStyles:o}=Rs(()=>e.color),r=N(()=>{const u={};return e.length&&(u[e.vertical?"height":"width"]=pe(e.length)),e.thickness&&(u[e.vertical?"borderRightWidth":"borderTopWidth"]=pe(e.thickness)),u}),l=j(()=>{const u=Array.isArray(e.contentOffset)?e.contentOffset[0]:e.contentOffset,d=Array.isArray(e.contentOffset)?e.contentOffset[1]:0;return{marginBlock:e.vertical&&u?pe(u):void 0,marginInline:!e.vertical&&u?pe(u):void 0,transform:d?`translate${e.vertical?"X":"Y"}(${pe(d)})`:void 0}});return De(()=>{const u=b("hr",{class:fe([{"v-divider":!0,"v-divider--gradient":e.gradient&&!s.default,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},a.value,i.value,e.class]),style:Be([r.value,o.value,{"--v-border-opacity":e.opacity},{"border-style":e.variant},e.style]),"aria-orientation":!n.role||n.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${n.role||"separator"}`},null);return s.default?b("div",{class:fe(["v-divider__wrapper",{"v-divider__wrapper--gradient":e.gradient,"v-divider__wrapper--inset":e.inset,"v-divider__wrapper--vertical":e.vertical}])},[u,b("div",{class:"v-divider__content",style:Be(l.value)},[s.default()]),u]):u}),{}}}),ox=ee({fluid:{type:Boolean,default:!1},...He(),...jn(),...Je()},"VContainer"),rx=ke()({name:"VContainer",props:ox(),setup(e,t){let{slots:n}=t;const{rtlClasses:s}=$n(),{dimensionStyles:a}=Vn(e);return De(()=>S(e.tag,{class:fe(["v-container",{"v-container--fluid":e.fluid},s.value,e.class]),style:Be([a.value,e.style])},n)),{}}}),bg=Rr.reduce((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e),{}),wg=Rr.reduce((e,t)=>{const n="offset"+ws(t);return e[n]={type:[String,Number],default:null},e},{}),kg=Rr.reduce((e,t)=>{const n="order"+ws(t);return e[n]={type:[String,Number],default:null},e},{}),qh={col:Object.keys(bg),offset:Object.keys(wg),order:Object.keys(kg)};function lx(e,t,n){let s=e;if(!(n==null||n===!1)){if(t){const a=t.replace(e,"");s+=`-${a}`}return e==="col"&&(s="v-"+s),e==="col"&&(n===""||n===!0)||(s+=`-${n}`),s.toLowerCase()}}const cx=["auto","start","end","center","baseline","stretch"],ux=ee({cols:{type:[Boolean,String,Number],default:!1},...bg,offset:{type:[String,Number],default:null},...wg,order:{type:[String,Number],default:null},...kg,alignSelf:{type:String,default:null,validator:e=>cx.includes(e)},...He(),...Je()},"VCol"),Nn=ke()({name:"VCol",props:ux(),setup(e,t){let{slots:n}=t;const s=N(()=>{const a=[];let i;for(i in qh)qh[i].forEach(r=>{const l=e[r],u=lx(i,r,l);u&&a.push(u)});const o=a.some(r=>r.startsWith("v-col-"));return a.push({"v-col":!o||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),a});return()=>{var a;return Mn(e.tag,{class:[s.value,e.class],style:e.style},(a=n.default)==null?void 0:a.call(n))}}}),mu=["start","end","center"],Sg=["space-between","space-around","space-evenly"];function gu(e,t){return Rr.reduce((n,s)=>{const a=e+ws(s);return n[a]=t(),n},{})}const dx=[...mu,"baseline","stretch"],xg=e=>dx.includes(e),_g=gu("align",()=>({type:String,default:null,validator:xg})),hx=[...mu,...Sg],Ag=e=>hx.includes(e),Cg=gu("justify",()=>({type:String,default:null,validator:Ag})),fx=[...mu,...Sg,"stretch"],Tg=e=>fx.includes(e),Ig=gu("alignContent",()=>({type:String,default:null,validator:Tg})),zh={align:Object.keys(_g),justify:Object.keys(Cg),alignContent:Object.keys(Ig)},px={align:"align",justify:"justify",alignContent:"align-content"};function mx(e,t,n){let s=px[e];if(n!=null){if(t){const a=t.replace(e,"");s+=`-${a}`}return s+=`-${n}`,s.toLowerCase()}}const gx=ee({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:xg},..._g,justify:{type:String,default:null,validator:Ag},...Cg,alignContent:{type:String,default:null,validator:Tg},...Ig,...He(),...Je()},"VRow"),fr=ke()({name:"VRow",props:gx(),setup(e,t){let{slots:n}=t;const s=N(()=>{const a=[];let i;for(i in zh)zh[i].forEach(o=>{const r=e[o],l=mx(i,o,r);l&&a.push(l)});return a.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),a});return()=>{var a;return Mn(e.tag,{class:["v-row",s.value,e.class],style:e.style},(a=n.default)==null?void 0:a.call(n))}}}),Ji=Br("v-spacer","div","VSpacer"),mc=Symbol.for("vuetify:list");function Eg(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{filterable:!1};const t=Xe(mc,{filterable:!1,hasPrepend:be(!1),updateHasPrepend:()=>null,trackingIndex:be(-1),navigationStrategy:be("focus"),uid:""}),{filterable:n,trackingIndex:s=t.trackingIndex,navigationStrategy:a=t.navigationStrategy,uid:i=t.uid||Ya()}=e,o={filterable:t.filterable||n,hasPrepend:be(!1),updateHasPrepend:r=>{r&&(o.hasPrepend.value=r)},trackingIndex:s,navigationStrategy:a,uid:i};return Dt(mc,o),t}function Lg(){return Xe(mc,null)}const vu=e=>{const t={activate:n=>{let{id:s,value:a,activated:i}=n;return s=Te(s),e&&!a&&i.size===1&&i.has(s)||(a?i.add(s):i.delete(s)),i},in:(n,s,a)=>{let i=new Set;if(n!=null)for(const o of Qc(n))i=t.activate({id:o,value:!0,activated:new Set(i),children:s,parents:a});return i},out:n=>Array.from(n)};return t},Og=e=>{const t=vu(e);return{activate:s=>{let{activated:a,id:i,...o}=s;i=Te(i);const r=a.has(i)?new Set([i]):new Set;return t.activate({...o,id:i,activated:r})},in:(s,a,i)=>{let o=new Set;if(s!=null){const r=Qc(s);r.length&&(o=t.in(r.slice(0,1),a,i))}return o},out:(s,a,i)=>t.out(s,a,i)}},vx=e=>{const t=vu(e);return{activate:s=>{let{id:a,activated:i,children:o,...r}=s;return a=Te(a),o.has(a)?i:t.activate({id:a,activated:i,children:o,...r})},in:t.in,out:t.out}},yx=e=>{const t=Og(e);return{activate:s=>{let{id:a,activated:i,children:o,...r}=s;return a=Te(a),o.has(a)?i:t.activate({id:a,activated:i,children:o,...r})},in:t.in,out:t.out}},bx={open:e=>{let{id:t,value:n,opened:s,parents:a}=e;if(n){const i=new Set;i.add(t);let o=a.get(t);for(;o!=null;)i.add(o),o=a.get(o);return i}else return s.delete(t),s},select:()=>null},Ng={open:e=>{let{id:t,value:n,opened:s,parents:a}=e;if(n){let i=a.get(t);for(s.add(t);i!=null&&i!==t;)s.add(i),i=a.get(i);return s}else s.delete(t);return s},select:()=>null},wx={open:Ng.open,select:e=>{let{id:t,value:n,opened:s,parents:a}=e;if(!n)return s;const i=[];let o=a.get(t);for(;o!=null;)i.push(o),o=a.get(o);return new Set(i)}},yu=e=>{const t={select:n=>{let{id:s,value:a,selected:i}=n;if(s=Te(s),e&&!a){const o=Array.from(i.entries()).reduce((r,l)=>{let[u,d]=l;return d==="on"&&r.push(u),r},[]);if(o.length===1&&o[0]===s)return i}return i.set(s,a?"on":"off"),i},in:(n,s,a,i)=>{const o=new Map;for(const r of n||[])t.select({id:r,value:!0,selected:o,children:s,parents:a,disabled:i});return o},out:n=>{const s=[];for(const[a,i]of n.entries())i==="on"&&s.push(a);return s}};return t},Pg=e=>{const t=yu(e);return{select:s=>{let{selected:a,id:i,...o}=s;i=Te(i);const r=a.has(i)?new Map([[i,a.get(i)]]):new Map;return t.select({...o,id:i,selected:r})},in:(s,a,i,o)=>s!=null&&s.length?t.in(s.slice(0,1),a,i,o):new Map,out:(s,a,i)=>t.out(s,a,i)}},kx=e=>{const t=yu(e);return{select:s=>{let{id:a,selected:i,children:o,...r}=s;return a=Te(a),o.has(a)?i:t.select({id:a,selected:i,children:o,...r})},in:t.in,out:t.out}},Sx=e=>{const t=Pg(e);return{select:s=>{let{id:a,selected:i,children:o,...r}=s;return a=Te(a),o.has(a)?i:t.select({id:a,selected:i,children:o,...r})},in:t.in,out:t.out}},bu=e=>{const t={select:n=>{let{id:s,value:a,selected:i,children:o,parents:r,disabled:l}=n;s=Te(s);const u=new Map(i),d=[s];for(;d.length;){const f=d.shift();l.has(f)||i.set(Te(f),a?"on":"off"),o.has(f)&&d.push(...o.get(f))}let h=Te(r.get(s));for(;h;){let f=!0,p=!0;for(const g of o.get(h)){const m=Te(g);if(!l.has(m)&&(i.get(m)!=="on"&&(f=!1),i.has(m)&&i.get(m)!=="off"&&(p=!1),!f&&!p))break}i.set(h,f?"on":p?"off":"indeterminate"),h=Te(r.get(h))}return e&&!a&&Array.from(i.entries()).reduce((p,g)=>{let[m,v]=g;return v==="on"&&p.push(m),p},[]).length===0?u:i},in:(n,s,a)=>{let i=new Map;for(const o of n||[])i=t.select({id:o,value:!0,selected:i,children:s,parents:a,disabled:new Set});return i},out:(n,s)=>{const a=[];for(const[i,o]of n.entries())o==="on"&&!s.has(i)&&a.push(i);return a}};return t},xx=e=>{const t=bu(e);return{select:t.select,in:t.in,out:(s,a,i)=>{const o=[];for(const[r,l]of s.entries())if(l==="on"){if(i.has(r)){const u=i.get(r);if(s.get(u)==="on")continue}o.push(r)}return o}}},_x=e=>{const n={select:bu(e).select,in:(s,a,i,o)=>{let r=new Map;for(const l of s||[])a.has(l)||(r=n.select({id:l,value:!0,selected:r,children:a,parents:i,disabled:o}));return r},out:s=>{const a=[];for(const[i,o]of s.entries())(o==="on"||o==="indeterminate")&&a.push(i);return a}};return n},qa=Symbol.for("vuetify:nested"),Bg={id:be(),root:{itemsRegistration:Pe("render"),register:()=>null,unregister:()=>null,updateDisabled:()=>null,children:Pe(new Map),parents:Pe(new Map),disabled:Pe(new Set),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:Pe(!1),scrollToActive:Pe(!1),selectable:Pe(!1),opened:Pe(new Set),activated:Pe(new Set),selected:Pe(new Map),selectedValues:Pe([]),getPath:()=>[]}},Ax=ee({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean,itemsRegistration:{type:String,default:"render"}},"nested"),Cx=(e,t)=>{let{items:n,returnObject:s,scrollToActive:a}=t,i=!1;const o=be(new Map),r=be(new Map),l=be(new Set),u=Kt(e,"opened",e.opened,C=>new Set(Array.isArray(C)?C.map(_=>Te(_)):C),C=>[...C.values()]),d=N(()=>{if(typeof e.activeStrategy=="object")return e.activeStrategy;if(typeof e.activeStrategy=="function")return e.activeStrategy(e.mandatory);switch(e.activeStrategy){case"leaf":return vx(e.mandatory);case"single-leaf":return yx(e.mandatory);case"independent":return vu(e.mandatory);case"single-independent":default:return Og(e.mandatory)}}),h=N(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;if(typeof e.selectStrategy=="function")return e.selectStrategy(e.mandatory);switch(e.selectStrategy){case"single-leaf":return Sx(e.mandatory);case"leaf":return kx(e.mandatory);case"independent":return yu(e.mandatory);case"single-independent":return Pg(e.mandatory);case"trunk":return xx(e.mandatory);case"branch":return _x(e.mandatory);case"classic":default:return bu(e.mandatory)}}),f=N(()=>{if(typeof e.openStrategy=="object")return e.openStrategy;switch(e.openStrategy){case"list":return wx;case"single":return bx;case"multiple":default:return Ng}}),p=Kt(e,"activated",e.activated,C=>d.value.in(C,o.value,r.value),C=>d.value.out(C,o.value,r.value)),g=Kt(e,"selected",e.selected,C=>h.value.in(C,o.value,r.value,l.value),C=>h.value.out(C,o.value,r.value));In(()=>{i=!0});function m(C){const _=[];let I=Te(C);for(;I!==void 0;)_.unshift(I),I=r.value.get(I);return _}const v=Rt("nested"),y=new Set,w=Y0(()=>{It(()=>{o.value=new Map(o.value),r.value=new Map(r.value)})},100);Oe(()=>[n.value,Vt(s)],()=>{e.itemsRegistration==="props"&&x()},{immediate:!0});function x(){const C=new Map,_=new Map,I=new Set,k=Vt(s)?q=>Te(q.raw):q=>q.value,O=[...n.value];let $=0;for(;$<O.length;){const q=O[$++],R=k(q);if(q.children){const z=[];for(const se of q.children){const re=k(se);C.set(re,R),z.push(re),O.push(se)}_.set(R,z)}q.props.disabled&&I.add(R)}o.value=_,r.value=C,l.value=I}const T={id:be(),root:{opened:u,activatable:j(()=>e.activatable),scrollToActive:j(()=>Vt(a)),selectable:j(()=>e.selectable),activated:p,selected:g,selectedValues:N(()=>{const C=[];for(const[_,I]of g.value.entries())I==="on"&&C.push(_);return C}),itemsRegistration:j(()=>e.itemsRegistration),register:(C,_,I,k)=>{if(y.has(C)){m(C).map(String).join(" -> "),m(_).concat(C).map(String).join(" -> ");return}else y.add(C);_&&C!==_&&r.value.set(C,_),I&&l.value.add(C),k&&o.value.set(C,[]),_!=null&&o.value.set(_,[...o.value.get(_)||[],C]),w()},unregister:C=>{if(i)return;y.delete(C),o.value.delete(C),l.value.delete(C);const _=r.value.get(C);if(_){const I=o.value.get(_)??[];o.value.set(_,I.filter(k=>k!==C))}r.value.delete(C),w()},updateDisabled:(C,_)=>{_?l.value.add(C):l.value.delete(C)},open:(C,_,I)=>{v.emit("click:open",{id:C,value:_,path:m(C),event:I});const k=f.value.open({id:C,value:_,opened:new Set(u.value),children:o.value,parents:r.value,event:I});k&&(u.value=k)},openOnSelect:(C,_,I)=>{const k=f.value.select({id:C,value:_,selected:new Map(g.value),opened:new Set(u.value),children:o.value,parents:r.value,event:I});k&&(u.value=k)},select:(C,_,I)=>{v.emit("click:select",{id:C,value:_,path:m(C),event:I});const k=h.value.select({id:C,value:_,selected:new Map(g.value),children:o.value,parents:r.value,disabled:l.value,event:I});k&&(g.value=k),T.root.openOnSelect(C,_,I)},activate:(C,_,I)=>{if(!e.activatable)return T.root.select(C,!0,I);v.emit("click:activate",{id:C,value:_,path:m(C),event:I});const k=d.value.activate({id:C,value:_,activated:new Set(p.value),children:o.value,parents:r.value,event:I});if(k.size!==p.value.size)p.value=k;else{for(const O of k)if(!p.value.has(O)){p.value=k;return}for(const O of p.value)if(!k.has(O)){p.value=k;return}}},children:o,parents:r,disabled:l,getPath:m}};return Dt(qa,T),T.root},Dg=(e,t,n)=>{const s=Xe(qa,Bg),a=Symbol("nested item"),i=N(()=>{const r=Te(Vt(e));return r!==void 0?r:a}),o={...s,id:i,open:(r,l)=>s.root.open(i.value,r,l),openOnSelect:(r,l)=>s.root.openOnSelect(i.value,r,l),isOpen:N(()=>s.root.opened.value.has(i.value)),parent:N(()=>s.root.parents.value.get(i.value)),activate:(r,l)=>s.root.activate(i.value,r,l),isActivated:N(()=>s.root.activated.value.has(i.value)),scrollToActive:s.root.scrollToActive,select:(r,l)=>s.root.select(i.value,r,l),isSelected:N(()=>s.root.selected.value.get(i.value)==="on"),isIndeterminate:N(()=>s.root.selected.value.get(i.value)==="indeterminate"),isLeaf:N(()=>!s.root.children.value.get(i.value)),isGroupActivator:s.isGroupActivator};return Er(()=>{s.isGroupActivator||s.root.itemsRegistration.value==="props"||It(()=>{s.root.register(i.value,s.id.value,Vt(t),n)})}),In(()=>{s.isGroupActivator||s.root.itemsRegistration.value==="props"||s.root.unregister(i.value)}),Oe(i,(r,l)=>{s.isGroupActivator||s.root.itemsRegistration.value==="props"||(s.root.unregister(l),It(()=>{s.root.register(r,s.id.value,Vt(t),n)}))}),Oe(()=>Vt(t),r=>{s.root.updateDisabled(i.value,r)}),n&&Dt(qa,o),o},Tx=()=>{const e=Xe(qa,Bg);Dt(qa,{...e,isGroupActivator:!0})},Ix=Ja({name:"VListGroupActivator",setup(e,t){let{slots:n}=t;return Tx(),()=>{var s;return(s=n.default)==null?void 0:s.call(n)}}}),Ex=ee({activeColor:String,baseColor:String,color:String,collapseIcon:{type:ot,default:"$collapse"},disabled:Boolean,expandIcon:{type:ot,default:"$expand"},rawId:[String,Number],prependIcon:ot,appendIcon:ot,fluid:Boolean,subgroup:Boolean,title:String,value:null,...He(),...Je()},"VListGroup"),Uh=ke()({name:"VListGroup",props:Ex(),setup(e,t){let{slots:n}=t;const{isOpen:s,open:a,id:i}=Dg(()=>e.value,()=>e.disabled,!0),o=N(()=>`v-list-group--id-${String(e.rawId??i.value)}`),r=Lg(),{isBooted:l}=Mr(),u=Xe(qa),d=j(()=>{var m;return((m=u==null?void 0:u.root)==null?void 0:m.itemsRegistration.value)==="render"});function h(m){var v;["INPUT","TEXTAREA"].includes((v=m.target)==null?void 0:v.tagName)||a(!s.value,m)}const f=N(()=>({onClick:h,class:"v-list-group__header",id:o.value})),p=N(()=>s.value?e.collapseIcon:e.expandIcon),g=N(()=>({VListItem:{activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&p.value,appendIcon:e.appendIcon||!e.subgroup&&p.value,title:e.title,value:e.value}}));return De(()=>S(e.tag,{class:fe(["v-list-group",{"v-list-group--prepend":r==null?void 0:r.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":s.value},e.class]),style:Be(e.style)},{default:()=>[n.activator&&S(gt,{defaults:g.value},{default:()=>[S(Ix,null,{default:()=>[n.activator({props:f.value,isOpen:s.value})]})]}),S(ta,{transition:{component:uu},disabled:!l.value},{default:()=>{var m,v;return[d.value?pn(b("div",{class:"v-list-group__items",role:"group","aria-labelledby":o.value},[(m=n.default)==null?void 0:m.call(n)]),[[Xa,s.value]]):s.value&&b("div",{class:"v-list-group__items",role:"group","aria-labelledby":o.value},[(v=n.default)==null?void 0:v.call(n)])]}})]})),{isOpen:s}}}),Lx=ee({opacity:[Number,String],...He(),...Je()},"VListItemSubtitle"),Rg=ke()({name:"VListItemSubtitle",props:Lx(),setup(e,t){let{slots:n}=t;return De(()=>S(e.tag,{class:fe(["v-list-item-subtitle",e.class]),style:Be([{"--v-list-item-subtitle-opacity":e.opacity},e.style])},n)),{}}}),Mg=Br("v-list-item-title"),Ox=ee({start:Boolean,end:Boolean,icon:ot,image:String,text:String,...Vs(),...He(),...En(),...an(),...ma(),...Je(),...Lt(),...xs({variant:"flat"})},"VAvatar"),za=ke()({name:"VAvatar",props:Ox(),setup(e,t){let{slots:n}=t;const{themeClasses:s}=Mt(e),{borderClasses:a}=Fs(e),{colorClasses:i,colorStyles:o,variantClasses:r}=ei(e),{densityClasses:l}=Wn(e),{roundedClasses:u}=vn(e),{sizeClasses:d,sizeStyles:h}=ti(e);return De(()=>S(e.tag,{class:fe(["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},s.value,a.value,i.value,l.value,u.value,d.value,r.value,e.class]),style:Be([o.value,h.value,e.style])},{default:()=>[n.default?S(gt,{key:"content-defaults",defaults:{VImg:{cover:!0,src:e.image},VIcon:{icon:e.icon}}},{default:()=>[n.default()]}):e.image?S(hu,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?S(Ke,{key:"icon",icon:e.icon},null):e.text,Za(!1,"v-avatar")]})),{}}}),Nx=ee({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:ot,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:ot,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,prependGap:[Number,String],subtitle:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},value:null,index:Number,tabindex:[Number,String],onClick:ra(),onClickOnce:ra(),...Vs(),...He(),...En(),...jn(),...Fn(),...an(),...Fr(),...Je(),...Lt(),...xs({variant:"text"})},"VListItem"),_n=ke()({name:"VListItem",directives:{vRipple:ys},props:Nx(),emits:{click:e=>!0},setup(e,t){let{attrs:n,slots:s,emit:a}=t;const i=Vr(e,n),o=Pe(),r=N(()=>e.value===void 0?i.href.value:e.value),{activate:l,isActivated:u,select:d,isOpen:h,isSelected:f,isIndeterminate:p,isGroupActivator:g,root:m,parent:v,openOnSelect:y,scrollToActive:w,id:x}=Dg(r,()=>e.disabled,!1),T=Lg(),C=N(()=>{var Q;return e.active!==!1&&(e.active||((Q=i.isActive)==null?void 0:Q.value)||(m.activatable.value?u.value:f.value))}),_=j(()=>e.link!==!1&&i.isLink.value),I=N(()=>!!T&&(m.selectable.value||m.activatable.value||e.value!=null)),k=N(()=>!e.disabled&&e.link!==!1&&(e.link||i.isClickable.value||I.value)),O=N(()=>T&&T.navigationStrategy.value==="track"&&e.index!==void 0&&T.trackingIndex.value===e.index),$=N(()=>T?_.value?"link":I.value?"option":"listitem":void 0),q=N(()=>{if(I.value)return m.activatable.value?u.value:m.selectable.value?f.value:C.value}),R=j(()=>e.rounded||e.nav),z=j(()=>e.color??e.activeColor),se=j(()=>({color:C.value?z.value??e.baseColor:e.baseColor,variant:e.variant}));Oe(()=>{var Q;return(Q=i.isActive)==null?void 0:Q.value},Q=>{Q&&re()}),Oe(u,Q=>{var Ae;!Q||!w||(Ae=o.value)==null||Ae.scrollIntoView({block:"nearest",behavior:"instant"})}),Oe(O,Q=>{var Ae;Q&&((Ae=o.value)==null||Ae.scrollIntoView({block:"nearest",behavior:"instant"}))}),Er(()=>{var Q;(Q=i.isActive)!=null&&Q.value&&It(()=>re())});function re(){v.value!=null&&m.open(v.value,!0),y(!0)}const{themeClasses:we}=Mt(e),{borderClasses:me}=Fs(e),{colorClasses:ge,colorStyles:Ze,variantClasses:Ve}=ei(se),{densityClasses:Se}=Wn(e),{dimensionStyles:X}=Vn(e),{elevationClasses:J}=as(e),{roundedClasses:Ie}=vn(R),mt=j(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),it=j(()=>e.ripple!==void 0&&e.ripple&&(T!=null&&T.filterable)?{keys:["Enter"]}:e.ripple),M=N(()=>({isActive:C.value,select:d,isOpen:h.value,isSelected:f.value,isIndeterminate:p.value,isDisabled:e.disabled}));function Z(Q){var Ae,A,E;a("click",Q),!["INPUT","TEXTAREA"].includes((Ae=Q.target)==null?void 0:Ae.tagName)&&k.value&&((E=(A=i.navigate).value)==null||E.call(A,Q),!g&&(m.activatable.value?l(!u.value,Q):(m.selectable.value||e.value!=null&&!_.value)&&d(!f.value,Q)))}function ae(Q){const Ae=Q.target;["INPUT","TEXTAREA"].includes(Ae.tagName)||(Q.key==="Enter"||Q.key===" "&&!(T!=null&&T.filterable))&&(Q.preventDefault(),Q.stopPropagation(),Q.target.dispatchEvent(new MouseEvent("click",Q)))}return De(()=>{const Q=_.value?"a":e.tag,Ae=s.title||e.title!=null,A=s.subtitle||e.subtitle!=null,P=!!(!!(e.appendAvatar||e.appendIcon)||s.append),G=!!(!!(e.prependAvatar||e.prependIcon)||s.prepend);return T==null||T.updateHasPrepend(G),e.activeColor&&bm("active-color",["color","base-color"]),pn(S(Q,$e(i.linkProps,{ref:o,id:e.index!==void 0&&T?`v-list-item-${T.uid}-${e.index}`:void 0,class:["v-list-item",{"v-list-item--active":C.value,"v-list-item--disabled":e.disabled,"v-list-item--link":k.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!G&&(T==null?void 0:T.hasPrepend.value),"v-list-item--slim":e.slim,"v-list-item--focus-visible":O.value,[`${e.activeClass}`]:e.activeClass&&C.value},we.value,me.value,ge.value,Se.value,J.value,mt.value,Ie.value,Ve.value,e.class],style:[{"--v-list-prepend-gap":pe(e.prependGap)},Ze.value,X.value,e.style],tabindex:e.tabindex??(k.value?T?-2:0:void 0),"aria-selected":q.value,role:$.value,onClick:Z,onKeydown:k.value&&!_.value&&ae}),{default:()=>{var W;return[Za(k.value||C.value,"v-list-item"),G&&b("div",{key:"prepend",class:"v-list-item__prepend"},[s.prepend?S(gt,{key:"prepend-defaults",defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0},VCheckboxBtn:{density:e.density}}},{default:()=>{var te;return[(te=s.prepend)==null?void 0:te.call(s,M.value)]}}):b(ce,null,[e.prependAvatar&&S(za,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&S(Ke,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),b("div",{class:"v-list-item__spacer"},null)]),b("div",{class:"v-list-item__content","data-no-activator":""},[Ae&&S(Mg,{key:"title"},{default:()=>{var te;return[((te=s.title)==null?void 0:te.call(s,{title:e.title}))??V(e.title)]}}),A&&S(Rg,{key:"subtitle"},{default:()=>{var te;return[((te=s.subtitle)==null?void 0:te.call(s,{subtitle:e.subtitle}))??V(e.subtitle)]}}),(W=s.default)==null?void 0:W.call(s,M.value)]),P&&b("div",{key:"append",class:"v-list-item__append"},[s.append?S(gt,{key:"append-defaults",defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0},VCheckboxBtn:{density:e.density}}},{default:()=>{var te;return[(te=s.append)==null?void 0:te.call(s,M.value)]}}):b(ce,null,[e.appendIcon&&S(Ke,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&S(za,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),b("div",{class:"v-list-item__spacer"},null)])]}}),[[ys,k.value&&it.value]])}),{activate:l,isActivated:u,isGroupActivator:g,isSelected:f,list:T,select:d,root:m,id:x,link:i}}}),Px=ee({color:String,inset:Boolean,sticky:Boolean,title:String,...He(),...Je()},"VListSubheader"),$g=ke()({name:"VListSubheader",props:Px(),setup(e,t){let{slots:n}=t;const{textColorClasses:s,textColorStyles:a}=Rs(()=>e.color);return De(()=>{const i=!!(n.default||e.title);return S(e.tag,{class:fe(["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},s.value,e.class]),style:Be([{textColorStyles:a},e.style])},{default:()=>{var o;return[i&&b("div",{class:"v-list-subheader__text"},[((o=n.default)==null?void 0:o.call(n))??e.title])]}})}),{}}}),Bx=ee({items:Array,returnObject:Boolean},"VListChildren"),jg=ke()({name:"VListChildren",props:Bx(),setup(e,t){let{slots:n}=t;return Eg(),()=>{var s,a;return((s=n.default)==null?void 0:s.call(n))??((a=e.items)==null?void 0:a.map((i,o)=>{var p,g;let{children:r,props:l,type:u,raw:d}=i;if(u==="divider")return((p=n.divider)==null?void 0:p.call(n,{props:l}))??S(yg,l,null);if(u==="subheader")return((g=n.subheader)==null?void 0:g.call(n,{props:l}))??S($g,l,null);const h={subtitle:n.subtitle?m=>{var v;return(v=n.subtitle)==null?void 0:v.call(n,{...m,item:d})}:void 0,prepend:n.prepend?m=>{var v;return(v=n.prepend)==null?void 0:v.call(n,{...m,item:d})}:void 0,append:n.append?m=>{var v;return(v=n.append)==null?void 0:v.call(n,{...m,item:d})}:void 0,title:n.title?m=>{var v;return(v=n.title)==null?void 0:v.call(n,{...m,item:d})}:void 0},f=Uh.filterProps(l);return r?S(Uh,$e(f,{value:e.returnObject?d:l==null?void 0:l.value,rawId:l==null?void 0:l.value}),{activator:m=>{let{props:v}=m;const y=$e(l,v,{value:e.returnObject?d:l.value});return n.header?n.header({props:y}):S(_n,$e(y,{index:o}),h)},default:()=>S(jg,{items:r,returnObject:e.returnObject},n)}):n.item?n.item({props:{...l,index:o}}):S(_n,$e(l,{index:o,value:e.returnObject?d:l.value}),h)}))}}}),Dx=ee({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},itemType:{type:[Boolean,String,Array,Function],default:"type"},returnObject:Boolean,valueComparator:Function},"list-items"),Rx=new Set(["item","divider","subheader"]);function Mx(e,t){const n=Wa(t)?t:pi(t,e.itemTitle),s=Wa(t)?t:pi(t,e.itemValue,void 0),a=pi(t,e.itemChildren),i=e.itemProps===!0?ss(t,["children"]):pi(t,e.itemProps);let o=pi(t,e.itemType,"item");Rx.has(o)||(o="item");const r={title:n,value:s,...i};return{type:o,title:r.title,value:r.value,props:r,children:o==="item"&&a?Vg(e,a):void 0,raw:t}}function Vg(e,t){const n=[];for(const s of t)n.push(Mx(e,s));return n}function $x(e){return{items:N(()=>Vg(e,e.items))}}const jx=ee({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,filterable:Boolean,expandIcon:ot,collapseIcon:ot,lines:{type:[Boolean,String],default:"one"},slim:Boolean,prependGap:[Number,String],indent:[Number,String],nav:Boolean,navigationStrategy:{type:String,default:"focus"},navigationIndex:Number,"onClick:open":ra(),"onClick:select":ra(),"onUpdate:opened":ra(),...Ax({selectStrategy:"single-leaf",openStrategy:"list"}),...Vs(),...He(),...En(),...jn(),...Fn(),...Dx(),...an(),...Je(),...Lt(),...xs({variant:"text"})},"VList"),bs=ke()({name:"VList",props:jx(),emits:{"update:selected":e=>!0,"update:activated":e=>!0,"update:opened":e=>!0,"update:navigationIndex":e=>!0,"click:open":e=>!0,"click:activate":e=>!0,"click:select":e=>!0},setup(e,t){let{attrs:n,slots:s,emit:a}=t;const{items:i}=$x(e),{themeClasses:o}=Mt(e),{backgroundColorClasses:r,backgroundColorStyles:l}=fn(()=>e.bgColor),{borderClasses:u}=Fs(e),{densityClasses:d}=Wn(e),{dimensionStyles:h}=Vn(e),{elevationClasses:f}=as(e),{roundedClasses:p}=vn(e),{children:g,open:m,parents:v,select:y,getPath:w}=Cx(e,{items:i,returnObject:j(()=>e.returnObject),scrollToActive:j(()=>e.navigationStrategy==="track")}),x=j(()=>e.lines?`v-list--${e.lines}-line`:void 0),T=j(()=>e.activeColor),C=j(()=>e.baseColor),_=j(()=>e.color),I=j(()=>e.selectable||e.activatable),k=Kt(e,"navigationIndex",-1,Se=>Se??-1),O=Ya();Eg({filterable:e.filterable,trackingIndex:k,navigationStrategy:j(()=>e.navigationStrategy),uid:O}),Oe(i,()=>{e.navigationStrategy==="track"&&(k.value=-1)}),Ss({VListGroup:{activeColor:T,baseColor:C,color:_,expandIcon:j(()=>e.expandIcon),collapseIcon:j(()=>e.collapseIcon)},VListItem:{activeClass:j(()=>e.activeClass),activeColor:T,baseColor:C,color:_,density:j(()=>e.density),disabled:j(()=>e.disabled),lines:j(()=>e.lines),nav:j(()=>e.nav),slim:j(()=>e.slim),variant:j(()=>e.variant),tabindex:j(()=>e.navigationStrategy==="track"?-1:void 0)}});const $=be(!1),q=Pe();function R(Se){$.value=!0}function z(Se){$.value=!1}function se(Se){var X;e.navigationStrategy==="track"?~k.value||(k.value=me("first")):!$.value&&!(Se.relatedTarget&&((X=q.value)!=null&&X.contains(Se.relatedTarget)))&&Ve()}function re(){e.navigationStrategy==="track"&&(k.value=-1)}function we(Se){switch(Se){case"ArrowDown":return"next";case"ArrowUp":return"prev";case"Home":return"first";case"End":return"last";default:return null}}function me(Se){const X=i.value.length;if(X===0)return-1;let J;Se==="first"?J=0:Se==="last"?J=X-1:(J=k.value+(Se==="next"?1:-1),J<0&&(J=X-1),J>=X&&(J=0));const Ie=J;let mt=0;for(;mt<X;){const it=i.value[J];if(it&&it.type!=="divider"&&it.type!=="subheader")return J;if(J+=Se==="next"||Se==="first"?1:-1,J<0&&(J=X-1),J>=X&&(J=0),J===Ie)return-1;mt++}return-1}function ge(Se){const X=Se.target;if(!q.value||X.tagName==="INPUT"&&["Home","End"].includes(Se.key)||X.tagName==="TEXTAREA")return;const J=we(Se.key);if(J!==null)if(Se.preventDefault(),e.navigationStrategy==="track"){const Ie=me(J);Ie!==-1&&(k.value=Ie)}else Ve(J)}function Ze(Se){$.value=!0}function Ve(Se,X){if(q.value)return Li(q.value,Se,X)}return De(()=>{const Se=e.indent??(e.prependGap?Number(e.prependGap)+24:void 0),X=I.value?n.ariaMultiselectable??!String(e.selectStrategy).startsWith("single-"):void 0;return S(e.tag,{ref:q,class:fe(["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav,"v-list--slim":e.slim},o.value,r.value,u.value,d.value,f.value,x.value,p.value,e.class]),style:Be([{"--v-list-indent":pe(Se),"--v-list-group-prepend":Se?"0px":void 0,"--v-list-prepend-gap":pe(e.prependGap)},l.value,h.value,e.style]),tabindex:e.disabled?-1:0,role:I.value?"listbox":"list","aria-activedescendant":e.navigationStrategy==="track"&&k.value>=0?`v-list-item-${O}-${k.value}`:void 0,"aria-multiselectable":X,onFocusin:R,onFocusout:z,onFocus:se,onBlur:re,onKeydown:ge,onMousedown:Ze},{default:()=>[S(jg,{items:i.value,returnObject:e.returnObject},s)]})}),{open:m,select:y,focus:Ve,children:g,parents:v,getPath:w,navigationIndex:k}}}),Vx=ee({scrollable:Boolean,...He(),...jn(),...Je({tag:"main"})},"VMain"),Fx=ke()({name:"VMain",props:Vx(),setup(e,t){let{slots:n}=t;const{dimensionStyles:s}=Vn(e),{mainStyles:a}=uS(),{ssrBootStyles:i}=Mr();return De(()=>S(e.tag,{class:fe(["v-main",{"v-main--scrollable":e.scrollable},e.class]),style:Be([a.value,i.value,s.value,e.style])},{default:()=>{var o,r;return[e.scrollable?b("div",{class:"v-main__scroller"},[(o=n.default)==null?void 0:o.call(n)]):(r=n.default)==null?void 0:r.call(n)]}})),{}}});function Pl(e,t){return{x:e.x+t.x,y:e.y+t.y}}function Wx(e,t){return{x:e.x-t.x,y:e.y-t.y}}function Gh(e,t){if(e.side==="top"||e.side==="bottom"){const{side:n,align:s}=e,a=s==="left"?0:s==="center"?t.width/2:s==="right"?t.width:s,i=n==="top"?0:n==="bottom"?t.height:n;return Pl({x:a,y:i},t)}else if(e.side==="left"||e.side==="right"){const{side:n,align:s}=e,a=n==="left"?0:n==="right"?t.width:n,i=s==="top"?0:s==="center"?t.height/2:s==="bottom"?t.height:s;return Pl({x:a,y:i},t)}return Pl({x:t.width/2,y:t.height/2},t)}const Fg={static:zx,connected:Gx},Hx=ee({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in Fg},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array],stickToTarget:Boolean,viewportMargin:{type:[Number,String],default:12}},"VOverlay-location-strategies");function qx(e,t){const n=Pe({}),s=Pe();rt&&Qa(()=>!!(t.isActive.value&&e.locationStrategy),r=>{var l,u;Oe(()=>e.locationStrategy,r),sn(()=>{window.removeEventListener("resize",a),visualViewport==null||visualViewport.removeEventListener("resize",i),visualViewport==null||visualViewport.removeEventListener("scroll",o),s.value=void 0}),window.addEventListener("resize",a,{passive:!0}),visualViewport==null||visualViewport.addEventListener("resize",i,{passive:!0}),visualViewport==null||visualViewport.addEventListener("scroll",o,{passive:!0}),typeof e.locationStrategy=="function"?s.value=(l=e.locationStrategy(t,e,n))==null?void 0:l.updateLocation:s.value=(u=Fg[e.locationStrategy](t,e,n))==null?void 0:u.updateLocation});function a(r){var l;(l=s.value)==null||l.call(s,r)}function i(r){var l;(l=s.value)==null||l.call(s,r)}function o(r){var l;(l=s.value)==null||l.call(s,r)}return{contentStyles:n,updateLocation:s}}function zx(){}function Ux(e,t){const n=Om(e);return t?n.x+=parseFloat(e.style.right||0):n.x-=parseFloat(e.style.left||0),n.y-=parseFloat(e.style.top||0),n}function Gx(e,t,n){(Array.isArray(e.target.value)||K0(e.target.value))&&Object.assign(n.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:a,preferredOrigin:i}=Zc(()=>{const y=lc(t.location,e.isRtl.value),w=t.origin==="overlap"?y:t.origin==="auto"?Tl(y):lc(t.origin,e.isRtl.value);return y.side===w.side&&y.align===Il(w).align?{preferredAnchor:ih(y),preferredOrigin:ih(w)}:{preferredAnchor:y,preferredOrigin:w}}),[o,r,l,u]=["minWidth","minHeight","maxWidth","maxHeight"].map(y=>N(()=>{const w=parseFloat(t[y]);return isNaN(w)?1/0:w})),d=N(()=>{if(Array.isArray(t.offset))return t.offset;if(typeof t.offset=="string"){const y=t.offset.split(" ").map(parseFloat);return y.length<2&&y.push(0),y}return typeof t.offset=="number"?[t.offset,0]:[0,0]});let h=!1,f=-1;const p=new u0(4),g=new ResizeObserver(()=>{if(!h)return;if(requestAnimationFrame(w=>{w!==f&&p.clear(),requestAnimationFrame(x=>{f=x})}),p.isFull){const w=p.values();if(ca(w.at(-1),w.at(-3))&&!ca(w.at(-1),w.at(-2)))return}const y=v();y&&p.push(y.flipped)});let m=new dn({x:0,y:0,width:0,height:0});Oe(e.target,(y,w)=>{w&&!Array.isArray(w)&&g.unobserve(w),Array.isArray(y)?ca(y,w)||v():y&&g.observe(y)},{immediate:!0}),Oe(e.contentEl,(y,w)=>{w&&g.unobserve(w),y&&g.observe(y)},{immediate:!0}),sn(()=>{g.disconnect()});function v(){if(h=!1,requestAnimationFrame(()=>h=!0),!e.target.value||!e.contentEl.value)return;(Array.isArray(e.target.value)||e.target.value.offsetParent||e.target.value.getClientRects().length)&&(m=eu(e.target.value));const y=Ux(e.contentEl.value,e.isRtl.value),w=or(e.contentEl.value),x=Number(t.viewportMargin);w.length||(w.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(y.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),y.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const T=w.reduce((z,se)=>{const re=g0(se);return z?new dn({x:Math.max(z.left,re.left),y:Math.max(z.top,re.top),width:Math.min(z.right,re.right)-Math.max(z.left,re.left),height:Math.min(z.bottom,re.bottom)-Math.max(z.top,re.top)}):re},void 0);t.stickToTarget?(T.x+=Math.min(x,m.x),T.y+=Math.min(x,m.y),T.width=Math.max(T.width-x*2,m.x+m.width-x),T.height=Math.max(T.height-x*2,m.y+m.height-x)):(T.x+=x,T.y+=x,T.width-=x*2,T.height-=x*2);let C={anchor:a.value,origin:i.value};function _(z){const se=new dn(y),re=Gh(z.anchor,m),we=Gh(z.origin,se);let{x:me,y:ge}=Wx(re,we);switch(z.anchor.side){case"top":ge-=d.value[0];break;case"bottom":ge+=d.value[0];break;case"left":me-=d.value[0];break;case"right":me+=d.value[0];break}switch(z.anchor.align){case"top":ge-=d.value[1];break;case"bottom":ge+=d.value[1];break;case"left":me-=d.value[1];break;case"right":me+=d.value[1];break}return se.x+=me,se.y+=ge,se.width=Math.min(se.width,l.value),se.height=Math.min(se.height,u.value),{overflows:rh(se,T),x:me,y:ge}}let I=0,k=0;const O={x:0,y:0},$={x:!1,y:!1};let q=-1;for(;!(q++>10);){const{x:z,y:se,overflows:re}=_(C);I+=z,k+=se,y.x+=z,y.y+=se;{const we=oh(C.anchor),me=re.x.before||re.x.after,ge=re.y.before||re.y.after;let Ze=!1;if(["x","y"].forEach(Ve=>{if(Ve==="x"&&me&&!$.x||Ve==="y"&&ge&&!$.y){const Se={anchor:{...C.anchor},origin:{...C.origin}},X=Ve==="x"?we==="y"?Il:Tl:we==="y"?Tl:Il;Se.anchor=X(Se.anchor),Se.origin=X(Se.origin);const{overflows:J}=_(Se);(J[Ve].before<=re[Ve].before&&J[Ve].after<=re[Ve].after||J[Ve].before+J[Ve].after<(re[Ve].before+re[Ve].after)/2)&&(C=Se,Ze=$[Ve]=!0)}}),Ze)continue}re.x.before&&(I+=re.x.before,y.x+=re.x.before),re.x.after&&(I-=re.x.after,y.x-=re.x.after),re.y.before&&(k+=re.y.before,y.y+=re.y.before),re.y.after&&(k-=re.y.after,y.y-=re.y.after);{const we=rh(y,T);O.x=T.width-we.x.before-we.x.after,O.y=T.height-we.y.before-we.y.after,I+=we.x.before,y.x+=we.x.before,k+=we.y.before,y.y+=we.y.before}break}const R=oh(C.anchor);return Object.assign(n.value,{"--v-overlay-anchor-origin":`${C.anchor.side} ${C.anchor.align}`,transformOrigin:`${C.origin.side} ${C.origin.align}`,top:pe(Bl(k)),left:e.isRtl.value?void 0:pe(Bl(I)),right:e.isRtl.value?pe(Bl(-I)):void 0,minWidth:pe(R==="y"?Math.min(o.value,m.width):o.value),maxWidth:pe(Kh(ts(O.x,o.value===1/0?0:o.value,l.value))),maxHeight:pe(Kh(ts(O.y,r.value===1/0?0:r.value,u.value)))}),{available:O,contentBox:y,flipped:$}}return Oe(()=>[a.value,i.value,t.offset,t.minWidth,t.minHeight,t.maxWidth,t.maxHeight],()=>v()),It(()=>{const y=v();if(!y)return;const{available:w,contentBox:x}=y;x.height>w.y&&requestAnimationFrame(()=>{v(),requestAnimationFrame(()=>{v()})})}),{updateLocation:v}}function Bl(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function Kh(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let gc=!0;const pr=[];function Kx(e){!gc||pr.length?(pr.push(e),vc()):(gc=!1,e(),vc())}let Yh=-1;function vc(){cancelAnimationFrame(Yh),Yh=requestAnimationFrame(()=>{const e=pr.shift();e&&e(),pr.length?vc():gc=!0})}const Vo={none:null,close:Jx,block:Qx,reposition:Zx},Yx=ee({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in Vo}},"VOverlay-scroll-strategies");function Xx(e,t){if(!rt)return;let n;mn(async()=>{n==null||n.stop(),t.isActive.value&&e.scrollStrategy&&(n=Di(),await new Promise(s=>setTimeout(s)),n.active&&n.run(()=>{var s;typeof e.scrollStrategy=="function"?e.scrollStrategy(t,e,n):(s=Vo[e.scrollStrategy])==null||s.call(Vo,t,e,n)}))}),sn(()=>{n==null||n.stop()})}function Jx(e){function t(n){e.isActive.value=!1}Wg(wu(e.target.value,e.contentEl.value),t)}function Qx(e,t){var r;const n=(r=e.root.value)==null?void 0:r.offsetParent,s=wu(e.target.value,e.contentEl.value),a=[...new Set([...or(s,t.contained?n:void 0),...or(e.contentEl.value,t.contained?n:void 0)])].filter(l=>!l.classList.contains("v-overlay-scroll-blocked")),i=window.innerWidth-document.documentElement.offsetWidth,o=(l=>su(l)&&l)(n||document.documentElement);o&&e.root.value.classList.add("v-overlay--scroll-blocked"),a.forEach((l,u)=>{l.style.setProperty("--v-body-scroll-x",pe(-l.scrollLeft)),l.style.setProperty("--v-body-scroll-y",pe(-l.scrollTop)),l!==document.documentElement&&l.style.setProperty("--v-scrollbar-offset",pe(i)),l.classList.add("v-overlay-scroll-blocked")}),sn(()=>{a.forEach((l,u)=>{const d=parseFloat(l.style.getPropertyValue("--v-body-scroll-x")),h=parseFloat(l.style.getPropertyValue("--v-body-scroll-y")),f=l.style.scrollBehavior;l.style.scrollBehavior="auto",l.style.removeProperty("--v-body-scroll-x"),l.style.removeProperty("--v-body-scroll-y"),l.style.removeProperty("--v-scrollbar-offset"),l.classList.remove("v-overlay-scroll-blocked"),l.scrollLeft=-d,l.scrollTop=-h,l.style.scrollBehavior=f}),o&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function Zx(e,t,n){let s=!1,a=-1,i=-1;function o(r){Kx(()=>{var d,h;const l=performance.now();(h=(d=e.updateLocation).value)==null||h.call(d,r),s=(performance.now()-l)/(1e3/60)>2})}i=(typeof requestIdleCallback>"u"?r=>r():requestIdleCallback)(()=>{n.run(()=>{Wg(wu(e.target.value,e.contentEl.value),r=>{s?(cancelAnimationFrame(a),a=requestAnimationFrame(()=>{a=requestAnimationFrame(()=>{o(r)})})):o(r)})})}),sn(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(i),cancelAnimationFrame(a)})}function wu(e,t){return Array.isArray(e)?document.elementsFromPoint(...e).find(n=>!(t!=null&&t.contains(n))):e??t}function Wg(e,t){const n=[document,...or(e)];n.forEach(s=>{s.addEventListener("scroll",t,{passive:!0})}),sn(()=>{n.forEach(s=>{s.removeEventListener("scroll",t)})})}const yc=Symbol.for("vuetify:v-menu"),e_=ee({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function t_(e,t){let n=()=>{};function s(o,r){n==null||n();const l=o?e.openDelay:e.closeDelay,u=Math.max((r==null?void 0:r.minDelay)??0,Number(l??0));return new Promise(d=>{n=h0(u,()=>{t==null||t(o),d(o)})})}function a(){return s(!0)}function i(o){return s(!1,o)}return{clearDelay:n,runOpenDelay:a,runCloseDelay:i}}const n_=ee({target:[String,Object],activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...e_()},"VOverlay-activator");function s_(e,t){let{isActive:n,isTop:s,contentEl:a}=t;const i=Rt("useActivator"),o=Pe();let r=!1,l=!1,u=!0;const d=N(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),h=N(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!d.value),{runOpenDelay:f,runCloseDelay:p}=t_(e,k=>{k===(e.openOnHover&&r||d.value&&l)&&!(e.openOnHover&&n.value&&!s.value)&&(n.value!==k&&(u=!0),n.value=k)}),g=Pe(),m={onClick:k=>{k.stopPropagation(),o.value=k.currentTarget||k.target,n.value||(g.value=[k.clientX,k.clientY]),n.value=!n.value},onMouseenter:k=>{r=!0,o.value=k.currentTarget||k.target,f()},onMouseleave:k=>{r=!1,p()},onFocus:k=>{d0(k.target,":focus-visible")!==!1&&(l=!0,k.stopPropagation(),o.value=k.currentTarget||k.target,f())},onBlur:k=>{l=!1,k.stopPropagation(),p({minDelay:1})}},v=N(()=>{const k={};return h.value&&(k.onClick=m.onClick),e.openOnHover&&(k.onMouseenter=m.onMouseenter,k.onMouseleave=m.onMouseleave),d.value&&(k.onFocus=m.onFocus,k.onBlur=m.onBlur),k}),y=N(()=>{const k={};if(e.openOnHover&&(k.onMouseenter=()=>{r=!0,f()},k.onMouseleave=()=>{r=!1,p()}),d.value&&(k.onFocusin=O=>{O.target.matches(":focus-visible")&&(l=!0,f())},k.onFocusout=()=>{l=!1,p({minDelay:1})}),e.closeOnContentClick){const O=Xe(yc,null);k.onClick=()=>{n.value=!1,O==null||O.closeParents()}}return k}),w=N(()=>{const k={};return e.openOnHover&&(k.onMouseenter=()=>{u&&(r=!0,u=!1,f())},k.onMouseleave=()=>{r=!1,p()}),k});Oe(s,k=>{var O;k&&(e.openOnHover&&!r&&(!d.value||!l)||d.value&&!l&&(!e.openOnHover||!r))&&!((O=a.value)!=null&&O.contains(document.activeElement))&&p()}),Oe(n,k=>{k||setTimeout(()=>{g.value=void 0})},{flush:"post"});const x=rc();mn(()=>{x.value&&It(()=>{o.value=x.el})});const T=rc(),C=N(()=>e.target==="cursor"&&g.value?g.value:T.value?T.el:Hg(e.target,i)||o.value),_=N(()=>Array.isArray(C.value)?void 0:C.value);let I;return Oe(()=>!!e.activator,k=>{k&&rt?(I=Di(),I.run(()=>{a_(e,i,{activatorEl:o,activatorEvents:v})})):I&&I.stop()},{flush:"post",immediate:!0}),sn(()=>{I==null||I.stop()}),{activatorEl:o,activatorRef:x,target:C,targetEl:_,targetRef:T,activatorEvents:v,contentEvents:y,scrimEvents:w}}function a_(e,t,n){let{activatorEl:s,activatorEvents:a}=n;Oe(()=>e.activator,(l,u)=>{if(u&&l!==u){const d=r(u);d&&o(d)}l&&It(()=>i())},{immediate:!0}),Oe(()=>e.activatorProps,()=>{i()}),sn(()=>{o()});function i(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:r(),u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;l&&v0(l,$e(a.value,u))}function o(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:r(),u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;l&&y0(l,$e(a.value,u))}function r(){let l=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator;const u=Hg(l,t);return s.value=(u==null?void 0:u.nodeType)===Node.ELEMENT_NODE?u:void 0,s.value}}function Hg(e,t){var s,a;if(!e)return;let n;if(e==="parent"){let i=(a=(s=t==null?void 0:t.proxy)==null?void 0:s.$el)==null?void 0:a.parentNode;for(;i!=null&&i.hasAttribute("data-no-activator");)i=i.parentNode;n=i}else typeof e=="string"?n=document.querySelector(e):"$el"in e?n=e.$el:n=e;return n}const i_=ee({retainFocus:Boolean,captureFocus:Boolean,disableInitialFocus:Boolean},"focusTrap"),Fo=new Map;let Xh=0;function Jh(e){const t=document.activeElement;if(e.key!=="Tab"||!t)return;const n=Array.from(Fo.values()).filter(u=>{var f;let{isActive:d,contentEl:h}=u;return d.value&&((f=h.value)==null?void 0:f.contains(t))}).map(u=>u.contentEl.value);let s,a=t.parentElement;for(;a;){if(n.includes(a)){s=a;break}a=a.parentElement}if(!s)return;const i=la(s).filter(u=>u.tabIndex>=0);if(!i.length)return;const o=document.activeElement;if(i.length===1&&i[0].classList.contains("v-list")&&i[0].contains(o)){e.preventDefault();return}const r=i[0],l=i[i.length-1];e.shiftKey&&(o===r||r.classList.contains("v-list")&&r.contains(o))&&(e.preventDefault(),l.focus()),!e.shiftKey&&(o===l||l.classList.contains("v-list")&&l.contains(o))&&(e.preventDefault(),r.focus())}function o_(e,t){let{isActive:n,localTop:s,contentEl:a}=t;const i=Symbol("trap");let o=!1,r=-1;async function l(){o=!0,r=window.setTimeout(()=>{o=!1},100)}async function u(f){var m;const p=f.relatedTarget,g=f.target;document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",d),await It(),n.value&&!o&&p!==g&&a.value&&Vt(s)&&![document,a.value].includes(g)&&!a.value.contains(g)&&((m=la(a.value)[0])==null||m.focus())}function d(f){if(f.key==="Tab"&&(document.removeEventListener("keydown",d),n.value&&a.value&&f.target&&!a.value.contains(f.target))){const p=la(document.documentElement);if(f.shiftKey&&f.target===p.at(0)||!f.shiftKey&&f.target===p.at(-1)){const g=la(a.value);g.length>0&&(f.preventDefault(),g[0].focus())}}}const h=j(()=>n.value&&e.captureFocus&&!e.disableInitialFocus);rt&&(Oe(()=>e.retainFocus,f=>{f?Fo.set(i,{isActive:n,contentEl:a}):Fo.delete(i)},{immediate:!0}),Oe(h,f=>{f?(document.addEventListener("pointerdown",l),document.addEventListener("focusin",u,{once:!0}),document.addEventListener("keydown",d)):(document.removeEventListener("pointerdown",l),document.removeEventListener("focusin",u),document.removeEventListener("keydown",d))},{immediate:!0}),Xh++<1&&document.addEventListener("keydown",Jh)),sn(()=>{Fo.delete(i),clearTimeout(r),document.removeEventListener("pointerdown",l),document.removeEventListener("focusin",u),document.removeEventListener("keydown",d),--Xh<1&&document.removeEventListener("keydown",Jh)})}function r_(){if(!rt)return be(!1);const{ssr:e}=Gm();if(e){const t=be(!1);return $s(()=>{t.value=!0}),t}else return be(!0)}const ku=ee({eager:Boolean},"lazy");function Su(e,t){const n=be(!1),s=j(()=>n.value||e.eager||t.value);Oe(t,()=>n.value=!0);function a(){e.eager||(n.value=!1)}return{isBooted:n,hasContent:s,onAfterLeave:a}}function ho(){const t=Rt("useScopeId").vnode.scopeId;return{scopeId:t?{[t]:""}:void 0}}const Qh=Symbol.for("vuetify:stack"),mi=jt([]);function l_(e,t,n){const s=Rt("useStack"),a=!n,i=Xe(Qh,void 0),o=jt({activeChildren:new Set});Dt(Qh,o);const r=be(Number(Vt(t)));Qa(e,()=>{var h;const d=(h=mi.at(-1))==null?void 0:h[1];r.value=d?d+10:Number(Vt(t)),a&&mi.push([s.uid,r.value]),i==null||i.activeChildren.add(s.uid),sn(()=>{if(a){const f=Te(mi).findIndex(p=>p[0]===s.uid);mi.splice(f,1)}i==null||i.activeChildren.delete(s.uid)})});const l=be(!0);return a&&mn(()=>{var h;const d=((h=mi.at(-1))==null?void 0:h[0])===s.uid;setTimeout(()=>l.value=d)}),{globalTop:Ra(l),localTop:j(()=>!o.activeChildren.size),stackStyles:j(()=>({zIndex:r.value}))}}function c_(e){return{teleportTarget:N(()=>{const n=e();if(n===!0||!rt)return;const s=n===!1?document.body:typeof n=="string"?document.querySelector(n):n;if(s==null)return;let a=[...s.children].find(i=>i.matches(".v-overlay-container"));return a||(a=document.createElement("div"),a.className="v-overlay-container",s.appendChild(a)),a})}}function u_(){return!0}function qg(e,t,n){if(!e||zg(e,n)===!1)return!1;const s=Mm(t);if(typeof ShadowRoot<"u"&&s instanceof ShadowRoot&&s.host===e.target)return!1;const a=(typeof n.value=="object"&&n.value.include||(()=>[]))();return a.push(t),!a.some(i=>i==null?void 0:i.contains(e.target))}function zg(e,t){return(typeof t.value=="object"&&t.value.closeConditional||u_)(e)}function d_(e,t,n){const s=typeof n.value=="function"?n.value:n.value.handler;e.shadowTarget=e.target,t._clickOutside.lastMousedownWasOutside&&qg(e,t,n)&&setTimeout(()=>{zg(e,n)&&s&&s(e)},0)}function Zh(e,t){const n=Mm(e);t(document),typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&t(n)}const ef={mounted(e,t){const n=a=>d_(a,e,t),s=a=>{e._clickOutside.lastMousedownWasOutside=qg(a,e,t)};Zh(e,a=>{a.addEventListener("click",n,!0),a.addEventListener("mousedown",s,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[t.instance.$.uid]={onClick:n,onMousedown:s}},beforeUnmount(e,t){e._clickOutside&&(Zh(e,n=>{var i;if(!n||!((i=e._clickOutside)!=null&&i[t.instance.$.uid]))return;const{onClick:s,onMousedown:a}=e._clickOutside[t.instance.$.uid];n.removeEventListener("click",s,!0),n.removeEventListener("mousedown",a,!0)}),delete e._clickOutside[t.instance.$.uid])}};function h_(e){const{modelValue:t,color:n,...s}=e;return S(ha,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&b("div",$e({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},s),null)]})}const Wr=ee({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,opacity:[Number,String],noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...n_(),...He(),...jn(),...ku(),...Hx(),...Yx(),...i_(),...Lt(),...ng()},"VOverlay"),Ua=ke()({name:"VOverlay",directives:{vClickOutside:ef},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...ss(Wr(),["disableInitialFocus"])},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,keydown:e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,t){let{slots:n,attrs:s,emit:a}=t;const i=Rt("VOverlay"),o=Pe(),r=Pe(),l=Pe(),u=Kt(e,"modelValue"),d=N({get:()=>u.value,set:M=>{M&&e.disabled||(u.value=M)}}),{themeClasses:h}=Mt(e),{rtlClasses:f,isRtl:p}=$n(),{hasContent:g,onAfterLeave:m}=Su(e,d),v=fn(()=>typeof e.scrim=="string"?e.scrim:null),{globalTop:y,localTop:w,stackStyles:x}=l_(d,()=>e.zIndex,e._disableGlobalStack),{activatorEl:T,activatorRef:C,target:_,targetEl:I,targetRef:k,activatorEvents:O,contentEvents:$,scrimEvents:q}=s_(e,{isActive:d,isTop:w,contentEl:l}),{teleportTarget:R}=c_(()=>{var ae,Q,Ae;const M=e.attach||e.contained;if(M)return M;const Z=((ae=T==null?void 0:T.value)==null?void 0:ae.getRootNode())||((Ae=(Q=i.proxy)==null?void 0:Q.$el)==null?void 0:Ae.getRootNode());return Z instanceof ShadowRoot?Z:!1}),{dimensionStyles:z}=Vn(e),se=r_(),{scopeId:re}=ho();Oe(()=>e.disabled,M=>{M&&(d.value=!1)});const{contentStyles:we,updateLocation:me}=qx(e,{isRtl:p,contentEl:l,target:_,isActive:d});Xx(e,{root:o,contentEl:l,targetEl:I,target:_,isActive:d,updateLocation:me});function ge(M){a("click:outside",M),e.persistent?Ie():d.value=!1}function Ze(M){return d.value&&w.value&&(!e.scrim||M.target===r.value||M instanceof MouseEvent&&M.shadowTarget===r.value)}o_(e,{isActive:d,localTop:w,contentEl:l}),rt&&Oe(d,M=>{M?window.addEventListener("keydown",Ve):window.removeEventListener("keydown",Ve)},{immediate:!0}),In(()=>{rt&&window.removeEventListener("keydown",Ve)});function Ve(M){var Z,ae,Q;M.key==="Escape"&&y.value&&((Z=l.value)!=null&&Z.contains(document.activeElement)||a("keydown",M),e.persistent?Ie():(d.value=!1,(ae=l.value)!=null&&ae.contains(document.activeElement)&&((Q=T.value)==null||Q.focus())))}function Se(M){M.key==="Escape"&&!y.value||a("keydown",M)}const X=KS();Qa(()=>e.closeOnBack,()=>{YS(X,()=>{if(y.value&&d.value)return e.persistent?Ie():d.value=!1,!1})});const J=Pe();Oe(()=>d.value&&(e.absolute||e.contained)&&R.value==null,M=>{if(M){const Z=$m(o.value);Z&&Z!==document.scrollingElement&&(J.value=Z.scrollTop)}});function Ie(){e.noClickAnimation||l.value&&Ns(l.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:ir})}function mt(){a("afterEnter")}function it(){m(),a("afterLeave")}return De(()=>{var M;return b(ce,null,[(M=n.activator)==null?void 0:M.call(n,{isActive:d.value,targetRef:k,props:$e({ref:C},O.value,e.activatorProps)}),se.value&&g.value&&S(Cb,{disabled:!R.value,to:R.value},{default:()=>[b("div",$e({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":d.value,"v-overlay--contained":e.contained},h.value,f.value,e.class],style:[x.value,{"--v-overlay-opacity":e.opacity,top:pe(J.value)},e.style],ref:o,onKeydown:Se},re,s),[S(h_,$e({color:v,modelValue:d.value&&!!e.scrim,ref:r},q.value),null),S(ta,{appear:!0,persisted:!0,transition:e.transition,target:_.value,onAfterEnter:mt,onAfterLeave:it},{default:()=>{var Z;return[pn(b("div",$e({ref:l,class:["v-overlay__content",e.contentClass],style:[z.value,we.value]},$.value,e.contentProps),[(Z=n.default)==null?void 0:Z.call(n,{isActive:d})]),[[Xa,d.value],[ef,{handler:ge,closeConditional:Ze,include:()=>[T.value]}]])]}})])]})])}),{activatorEl:T,scrimEl:r,target:_,animateClick:Ie,contentEl:l,rootEl:o,globalTop:y,localTop:w,updateLocation:me}}}),Dl=Symbol("Forwarded refs");function Rl(e,t){let n=e;for(;n;){const s=Reflect.getOwnPropertyDescriptor(n,t);if(s)return s;n=Object.getPrototypeOf(n)}}function Hr(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),s=1;s<t;s++)n[s-1]=arguments[s];return e[Dl]=n,new Proxy(e,{get(a,i){if(Reflect.has(a,i))return Reflect.get(a,i);if(!(typeof i=="symbol"||i.startsWith("$")||i.startsWith("__"))){for(const o of n)if(o.value&&Reflect.has(o.value,i)){const r=Reflect.get(o.value,i);return typeof r=="function"?r.bind(o.value):r}}},has(a,i){if(Reflect.has(a,i))return!0;if(typeof i=="symbol"||i.startsWith("$")||i.startsWith("__"))return!1;for(const o of n)if(o.value&&Reflect.has(o.value,i))return!0;return!1},set(a,i,o){if(Reflect.has(a,i))return Reflect.set(a,i,o);if(typeof i=="symbol"||i.startsWith("$")||i.startsWith("__"))return!1;for(const r of n)if(r.value&&Reflect.has(r.value,i))return Reflect.set(r.value,i,o);return!1},getOwnPropertyDescriptor(a,i){var r;const o=Reflect.getOwnPropertyDescriptor(a,i);if(o)return o;if(!(typeof i=="symbol"||i.startsWith("$")||i.startsWith("__"))){for(const l of n){if(!l.value)continue;const u=Rl(l.value,i)??("_"in l.value?Rl((r=l.value._)==null?void 0:r.setupState,i):void 0);if(u)return u}for(const l of n){const u=l.value&&l.value[Dl];if(!u)continue;const d=u.slice();for(;d.length;){const h=d.shift(),f=Rl(h.value,i);if(f)return f;const p=h.value&&h.value[Dl];p&&d.push(...p)}}}}})}const f_=ee({id:String,submenu:Boolean,...ss(Wr({captureFocus:!0,closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",location:void 0,openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:eg}}),["absolute"])},"VMenu"),tf=ke()({name:"VMenu",props:f_(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const s=Kt(e,"modelValue"),{scopeId:a}=ho(),{isRtl:i}=$n(),o=Ya(),r=j(()=>e.id||`v-menu-${o}`),l=Pe(),u=Xe(yc,null),d=be(new Set);Dt(yc,{register(){d.value.add(o)},unregister(){d.value.delete(o)},closeParents(m){setTimeout(()=>{var v;!d.value.size&&!e.persistent&&(m==null||(v=l.value)!=null&&v.contentEl&&!f0(m,l.value.contentEl))&&(s.value=!1,u==null||u.closeParents())},40)}}),In(()=>u==null?void 0:u.unregister()),Wc(()=>s.value=!1),Oe(s,m=>{m?u==null||u.register():u==null||u.unregister()},{immediate:!0});function h(m){u==null||u.closeParents(m)}function f(m){var v,y,w,x,T;if(!e.disabled)if(m.key==="Tab"||m.key==="Enter"&&!e.closeOnContentClick){if(m.key==="Enter"&&(m.target instanceof HTMLTextAreaElement||m.target instanceof HTMLInputElement&&m.target.closest("form")))return;m.key==="Enter"&&m.preventDefault(),!Em(la((v=l.value)==null?void 0:v.contentEl,!1),m.shiftKey?"prev":"next",_=>_.tabIndex>=0)&&!e.retainFocus&&(s.value=!1,(w=(y=l.value)==null?void 0:y.activatorEl)==null||w.focus())}else e.submenu&&m.key===(i.value?"ArrowRight":"ArrowLeft")&&(s.value=!1,(T=(x=l.value)==null?void 0:x.activatorEl)==null||T.focus())}function p(m){var y;if(e.disabled)return;const v=(y=l.value)==null?void 0:y.contentEl;v&&s.value?m.key==="ArrowDown"?(m.preventDefault(),m.stopImmediatePropagation(),Li(v,"next")):m.key==="ArrowUp"?(m.preventDefault(),m.stopImmediatePropagation(),Li(v,"prev")):e.submenu&&(m.key===(i.value?"ArrowRight":"ArrowLeft")?s.value=!1:m.key===(i.value?"ArrowLeft":"ArrowRight")&&(m.preventDefault(),Li(v,"first"))):(e.submenu?m.key===(i.value?"ArrowLeft":"ArrowRight"):["ArrowDown","ArrowUp"].includes(m.key))&&(s.value=!0,m.preventDefault(),setTimeout(()=>setTimeout(()=>p(m))))}const g=N(()=>$e({"aria-haspopup":"menu","aria-expanded":String(s.value),"aria-controls":r.value,"aria-owns":r.value,onKeydown:p},e.activatorProps));return De(()=>{const m=Ua.filterProps(e);return S(Ua,$e({ref:l,id:r.value,class:["v-menu",e.class],style:e.style},m,{modelValue:s.value,"onUpdate:modelValue":v=>s.value=v,absolute:!0,activatorProps:g.value,location:e.location??(e.submenu?"end":"bottom"),"onClick:outside":h,onKeydown:f},a),{activator:n.activator,default:function(){for(var v=arguments.length,y=new Array(v),w=0;w<v;w++)y[w]=arguments[w];return S(gt,{root:"VMenu"},{default:()=>{var x;return[(x=n.default)==null?void 0:x.call(n,...y)]}})}})}),Hr({id:r,ΨopenChildren:d},l)}}),p_={class:"d-none d-md-flex ga-2"},m_=Ct({__name:"App",setup(e){const t=[{title:"Home",to:"/",icon:"mdi-home-outline",exact:!0},{title:"Feature Development",to:"/features",icon:"mdi-rocket-launch-outline"},{title:"Learnings / Experiments",to:"/experiments",icon:"mdi-flask-outline"},{title:"Presentations",to:"/presentations",icon:"mdi-presentation"}],n=[{title:"Feature Wiki",href:"/wiki/",icon:"mdi-book-open-outline",target:"_blank"},{title:"Specification Wiki",href:"/framework-wiki/",icon:"mdi-book-cog-outline",target:"_blank"},{title:"Prototype",href:"/proto/",icon:"mdi-cube-outline",target:"_blank"},{title:"Specifications",to:"/specifications",icon:"mdi-file-document-outline"}];return(s,a)=>{const i=rd("router-link"),o=rd("router-view");return B(),Ge(gS,null,{default:D(()=>[S(ES,{flat:"",color:"surface",border:""},{default:D(()=>[S(sx,{class:"flex-grow-0 mr-6"},{default:D(()=>[S(i,{to:"/",class:"text-decoration-none text-inherit font-weight-bold"},{default:D(()=>[...a[0]||(a[0]=[K(" 📋 Change Delegation ",-1)])]),_:1})]),_:1}),b("div",p_,[(B(),H(ce,null,qe(t,r=>S(ht,{key:r.to,to:r.to,exact:r.exact,"prepend-icon":r.icon,variant:"text",rounded:"pill"},{default:D(()=>[K(V(r.title),1)]),_:2},1032,["to","exact","prepend-icon"])),64)),S(tf,{"open-on-hover":""},{activator:D(({props:r})=>[S(ht,$e(r,{"prepend-icon":"mdi-target","append-icon":"mdi-menu-down",variant:"text",rounded:"pill"}),{default:D(()=>[...a[1]||(a[1]=[K(" Change Delegation Feature ",-1)])]),_:1},16)]),default:D(()=>[S(bs,{nav:"",density:"comfortable"},{default:D(()=>[(B(),H(ce,null,qe(n,r=>S(_n,{key:r.title,to:r.to,href:r.href,target:r.target,"prepend-icon":r.icon,title:r.title},null,8,["to","href","target","prepend-icon","title"])),64))]),_:1})]),_:1})]),S(Ji),S(tf,{class:"d-md-none"},{activator:D(({props:r})=>[S(ht,$e({icon:""},r,{class:"d-md-none"}),{default:D(()=>[S(Ke,null,{default:D(()=>[...a[2]||(a[2]=[K("mdi-menu",-1)])]),_:1})]),_:1},16)]),default:D(()=>[S(bs,{nav:"",density:"comfortable"},{default:D(()=>[(B(),H(ce,null,qe(t,r=>S(_n,{key:r.to,to:r.to,exact:r.exact,"prepend-icon":r.icon,title:r.title},null,8,["to","exact","prepend-icon","title"])),64)),S(yg,{class:"my-1"}),S($g,null,{default:D(()=>[...a[3]||(a[3]=[K("Change Delegation Feature",-1)])]),_:1}),(B(),H(ce,null,qe(n,r=>S(_n,{key:r.title,to:r.to,href:r.href,target:r.target,"prepend-icon":r.icon,title:r.title},null,8,["to","href","target","prepend-icon","title"])),64))]),_:1})]),_:1})]),_:1}),S(Fx,null,{default:D(()=>[S(rx,{class:"py-6","max-width":"1100"},{default:D(()=>[S(o)]),_:1})]),_:1})]),_:1})}}}),Ni=[{date:"2025-05-05",title:"Kick off",status:"done",phase:"discover",why:"Using AI to prepare the kick-off meant we arrived with a structured problem framing instead of a blank page. The team could align faster because the ambiguity was already reduced before anyone walked into the room.",summary:"Project kicked off. We framed the change-delegation problem, got the stakeholders on the same page, and agreed on the first deliverables.",experiments:["meeting-recordings"]},{date:"2025-05-06",title:"Research",status:"done",phase:"discover",why:"AI let us go genuinely deep across multiple domains in a single day — something that would have taken weeks of manual desk research. Because AI handled the breadth, the team could focus on judgment: deciding what mattered, what to keep, and what to discard.",summary:"Team-wide research into the problem space: how different industries tackle change delegation, what counts as industry standard, what the common domains and naming conventions are, and what the problem space actually contains. We used AI to go deep on each thread, but kept every claim tied to a real source. No hallucinations passed through.",experiments:["deep-research","council","knowledge-base","secure-development","llm-usage-foundation"],links:[{label:"Gábor Schneider",note:"Multi-locale research",url:"https://github.com/emartech/change-delegation-knowledge-base/tree/main/domain/raw/GaborSchneider/Change_Delegation_Multi_Locale_Research_20260506"},{label:"Mihály Hunyady",note:"Deep research",url:"https://github.com/emartech/change-delegation-knowledge-base/tree/main/domain/raw/MihalyHunyady/2026-05-06-deep-research"},{label:"Péter Vasárhelyi",note:"Deep research",url:"https://github.com/emartech/change-delegation-knowledge-base/tree/main/domain/raw/PeterVasarhelyi/2026-05-06-deep-research"},{label:"Vica Barta",note:"Deep research results",url:"https://github.com/emartech/change-delegation-knowledge-base/blob/main/domain/raw/VicaBarta/deep%20research%20results.html"},{label:"Levente Hernádi",note:"Mental model, CMS locale propagation, document merge patterns",url:"https://github.com/emartech/change-delegation-knowledge-base/tree/main/domain/raw/leventehernadi"},{label:"Viktor Somodi",note:"Change delegation research",url:"https://github.com/emartech/change-delegation-knowledge-base/tree/main/domain/raw/ViktorSomodi/change-delegation-research/research-results"}]},{date:"2025-05-07",title:"Design Ideation",status:"done",phase:"discover",why:"When AI handles the visualization, the bottleneck disappears. People stayed in creative flow longer because translating an idea into something visible no longer required drawing skills or design tools. More concepts got explored, and better ones surfaced.",summary:"We dropped the pen-and-paper Crazy 8 format. Each person prompted AI to visualize their idea instead. The output was not only mockups: some came back as slides, some as interactive prototypes. We stayed in idea-space longer because the visualizing step was no longer the bottleneck.",experiments:["crazy8"]},{date:"2025-05-08",title:"Editor full-day workshop — Secure Research",status:"done",phase:"discover",hiddenFromDiamond:!0,summary:"The Editor team built their own tooling around secure AI usage so they can run research and other development tasks without putting prod or IP at risk.",knowledgeTransfer:!0,topicsTaught:["secure-development","deep-research","council"]},{date:"2025-05-08",title:"First prototype",status:"done",phase:"discover",why:"Building with AI meant the gap between idea and working prototype collapsed from weeks to hours. The team could put something real in front of stakeholders before any assumptions had time to calcify into the wrong direction.",summary:"First prototype was built with Loveable."},{date:"2025-05-12",title:"Clickable Concept",status:"done",phase:"define",why:"AI-assisted development meant we didn't have to choose between speed and quality. We got working code fast enough to use as a validation tool — real data, real algorithm — which surfaced issues that any mock-based approach would have hidden.",summary:"We turned the Loveable prototype into actual code. Easier to share, and the dev team could immediately try the concept against real data and the real algorithm instead of mocks.",experiments:["clickable-concept"]},{date:"2025-05-15",title:"Editor full-day workshop — Knowledge Base",status:"done",phase:"define",hiddenFromDiamond:!0,summary:"Second full-day workshop. The Editor team went through every knowledge-base technology we'd touched in the last three years, in theory and in practice.",knowledgeTransfer:!0,topicsTaught:["knowledge-base"]},{date:"2025-05-18",title:"Knowledge Base",status:"done",phase:"define",why:"An AI-managed knowledge base means the team's collective understanding doesn't live in people's heads or scattered documents. AI keeps it structured, queryable, and up to date — so onboarding, spec writing, and future decisions can draw on everything learned without anyone having to re-do the work.",summary:"With the research done, a working prototype, and a mental model we could finally name, we needed somewhere to put it all. The result is an AI-managed knowledge base that documents the concept and the findings together.",experiments:["knowledge-base"]},{date:"2025-05-21",title:"BMW meeting — requirements & short-term workaround implementation",status:"done",phase:"define",why:"Coming into this meeting with AI-prepared context meant we could have a peer-level conversation rather than a catch-up. BMW's own AI-first approach validated the direction we were already heading — the meeting became a signal, not just a requirement-gathering session.",summary:"BMW walked us through how to access their documentation on change delegation, and offered to share the related code on request as long as we tell them exactly which part we want. They also demoed one of their internal AI workflows: agents that generate an Emarsys campaign straight from a Figma design. Conclusion: next week we demo and hand over our concept, including the specification, not just the clickable version.",customerFacing:!0},{date:"2025-05-26",title:"AI-native version of the Clickable Concept",status:"in-progress",phase:"define",why:"This is the AI-first approach taken to its logical conclusion. By writing a spec and letting AI drive the implementation, we proved that the design process itself can be the product — not just a step toward it. Zero hand-written code, working agent.",summary:"Off the back of our ongoing conversations about where AI is going, we ran an ideation session on how change delegation could look if we designed it AI-native from the start. Out of that came a second concept and a working agent. We built it with spec-driven development, no hand-written code: we specified the solution and let the spec drive everything.",experiments:["spec-driven-development","llm-usage-foundation"]},{date:"2025-05-27",title:"BMW demo + Clickable Concept handover",status:"planned",phase:"define",why:"We could demo a working, code-backed concept rather than slides because AI collapsed the time from idea to implementation. BMW received something they could actually evaluate against their real workflow — not a promise of what we'd build.",summary:"",customerFacing:!0},{date:"2025-05-29",title:"Editor full-day workshop — Spec Driven Development",status:"planned",phase:"develop",hiddenFromDiamond:!0,summary:"",knowledgeTransfer:!0,topicsTaught:["spec-driven-development","domain-agent"]},{date:"2025-06-01",title:"Iteration based on feedback",status:"planned",phase:"develop",hiddenFromDiamond:!0,summary:""},{date:"2025-06-08",title:"Delivery of the agreed solution",status:"planned",phase:"deliver",hiddenFromDiamond:!0,summary:""}],g_="modulepreload",v_=function(e){return"/"+e},nf={},Sn=function(t,n,s){let a=Promise.resolve();if(n&&n.length>0){let o=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),l=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));a=o(n.map(u=>{if(u=v_(u),u in nf)return;nf[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":g_,d||(f.as="script"),f.crossOrigin="",f.href=u,l&&f.setAttribute("nonce",l),document.head.appendChild(f),d)return new Promise((p,g)=>{f.addEventListener("load",p),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=o,window.dispatchEvent(r),!r.defaultPrevented)throw o}return a.then(o=>{for(const r of o||[])r.status==="rejected"&&i(r.reason);return t().catch(i)})};function c(e,t,n){const{children:s}=t;return delete t.children,arguments.length>2&&(t.key=n),Mn(e,t,s)}const Ug={title:"Clickable Concept",date:"2025-05-12",outcome:"finished",summary:"Where the prototype ends and a clickable concept begins — fidelity, real data, and integration boundaries."};function sf(e){const t={a:"a",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"A prototype hardcodes the values and the happy path. It looks real until you try the second case. A POC fixes that, but a real POC takes weeks: data layer, error paths, integration with the surrounding systems, all of it."}),`
`,c(t.p,{children:"The gap between the two has been the same trade-off for years. Cheap and shallow, or expensive and real. Pick one."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"With AI in the loop we can deliver a Clickable Concept with the same effort a prototype used to take."}),`
`,c(t.li,{children:"The Clickable Concept holds up like a POC. Real data flows, real edge cases, real integrations."}),`
`,c(t.li,{children:"UX, PM, and devs can all work on the Clickable Concept side by side. Not a hand-off, not one role producing for the others, all three editing the same artefact."}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Non-technical people struggle with data-UI separation. Basic engineering concepts like reusable components and a clean data layer feel obvious to devs, but they're a real barrier for UX and PM contributors. Even in a clickable prototype, once complexity grows past a few screens, these dev best practices become unavoidable."}),`
`,c(t.li,{children:'After a certain size, green tests matter as much as they do in production. We started without tests because it was "just a prototype". Regression bugs crept in within days. Building E2E BDD tests around the prototype became essential to keep the thing from rotting while we iterated on it.'}),`
`,c(t.li,{children:"The prototype needs the same discipline as production code, just slightly differently focused. In-memory data is fine, persistence can wait. Everything is about baby steps and iterations."}),`
`,c(t.li,{children:"Architecture refactoring happens in a prototype too. The main file grew unmanageable within a week. We had to split it into a proper feature-based architecture or the codebase would have become unnavigable. The BDD tests made the refactoring safe."}),`
`,c(t.li,{children:`"Build both and compare" beats "debate and decide". When a design question didn't have a clear answer, building both alternatives into the proto took less time than the meeting would have. We ended up with four diff viewer variants (two-column, three-column center, three-column side, inline) and let the stakeholder pick.`}),`
`,c(t.li,{children:'The prototype is a communication tool with the customer. Showing BMW four working alternatives and asking "which feels right?" got faster, more honest feedback than any slide deck or wireframe ever did.'}),`
`,c(t.li,{children:`UX needs the final call on the prototype, even when a non-UXer builds it. AI lets devs and PMs ship working flows fast, but "it works" and "it's the right UX solution" are different bars. If the person building the proto isn't a UX designer, a UXer must validate it before it goes to the customer, and on UX questions the UXer's call is final. Cross-check is non-negotiable, otherwise the proto's velocity quietly compounds bad UX decisions.`}),`
`]}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:["This experiment grew directly out of ",c(t.a,{href:"/experiments/crazy8",children:"Crazy 8"})," and ",c(t.a,{href:"/experiments/spec-driven-development",children:"Spec Driven Development"}),". The clearest outcome: BDD and E2E tests aren't a dev luxury, they're the mechanism that lets non-devs trust the prototype still works after someone else changed it. Without them, collaboration across roles falls apart the moment the artefact gets complex."]}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:"We started from the core algorithm (diff calculation) and built outward. The UI came second, initially just a minimal shell with use cases that trigger the algorithm and make the output visible."}),`
`,c(t.p,{children:"From there we added UI incrementally, always grounded in the existing algorithm and data structures. No speculative UI that didn't have a working backend path behind it."}),`
`,c(t.p,{children:"After the UI reached a certain density we started writing BDD tests for it, layered on top of the existing Gherkin specs that already covered the algorithm. Two test layers: one for the logic, one for the interaction."}),`
`,c(t.p,{children:"When a design decision came up where the right answer wasn't obvious, we stopped debating and built both options into the prototype as alternatives. Test how it feels, not how it sounds in a meeting. By the end we had four different diff viewer variants in the prototype, so BMW could give feedback on real interactions instead of mockups."}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.h3,{children:"The prototype"}),`
`,c(t.p,{children:["The live Clickable Concept is deployed at ",c(t.a,{href:"https://solid-adventure-92vj45m.pages.github.io/proto/",children:"solid-adventure-92vj45m.pages.github.io/proto/"}),". It covers 17 use cases (from simple text changes to complex multi-locale conflict resolution), includes four diff viewer variants, a working InMemory/Backend data toggle, and a BDD test suite running against the UI."]}),`
`,c(t.p,{children:"Seven days after the first commit we had a working prototype on GitHub Pages with in-memory data. Two days later we had backend integration too."})]})}function y_(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(sf,{...e})}):sf(e)}const b_=Object.freeze(Object.defineProperty({__proto__:null,default:y_,frontmatter:Ug},Symbol.toStringTag,{value:"Module"})),w_=ee({...He(),...Je()},"VCardActions"),Gg=ke()({name:"VCardActions",props:w_(),setup(e,t){let{slots:n}=t;return Ss({VBtn:{slim:!0,variant:"text"}}),De(()=>S(e.tag,{class:fe(["v-card-actions",e.class]),style:Be(e.style)},n)),{}}}),k_=ee({opacity:[Number,String],...He(),...Je()},"VCardSubtitle"),Kg=ke()({name:"VCardSubtitle",props:k_(),setup(e,t){let{slots:n}=t;return De(()=>S(e.tag,{class:fe(["v-card-subtitle",e.class]),style:Be([{"--v-card-subtitle-opacity":e.opacity},e.style])},n)),{}}}),Yg=Br("v-card-title"),S_=ee({appendAvatar:String,appendIcon:ot,prependAvatar:String,prependIcon:ot,subtitle:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},...He(),...En(),...Je()},"VCardItem"),x_=ke()({name:"VCardItem",props:S_(),setup(e,t){let{slots:n}=t;return De(()=>{const s=!!(e.prependAvatar||e.prependIcon),a=!!(s||n.prepend),i=!!(e.appendAvatar||e.appendIcon),o=!!(i||n.append),r=!!(e.title!=null||n.title),l=!!(e.subtitle!=null||n.subtitle);return S(e.tag,{class:fe(["v-card-item",e.class]),style:Be(e.style)},{default:()=>{var u;return[a&&b("div",{key:"prepend",class:"v-card-item__prepend"},[n.prepend?S(gt,{key:"prepend-defaults",disabled:!s,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},n.prepend):b(ce,null,[e.prependAvatar&&S(za,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&S(Ke,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),b("div",{class:"v-card-item__content"},[r&&S(Yg,{key:"title"},{default:()=>{var d;return[((d=n.title)==null?void 0:d.call(n))??V(e.title)]}}),l&&S(Kg,{key:"subtitle"},{default:()=>{var d;return[((d=n.subtitle)==null?void 0:d.call(n))??V(e.subtitle)]}}),(u=n.default)==null?void 0:u.call(n)]),o&&b("div",{key:"append",class:"v-card-item__append"},[n.append?S(gt,{key:"append-defaults",disabled:!i,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},n.append):b(ce,null,[e.appendIcon&&S(Ke,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&S(za,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])]}})}),{}}}),__=ee({opacity:[Number,String],...He(),...Je()},"VCardText"),Xg=ke()({name:"VCardText",props:__(),setup(e,t){let{slots:n}=t;return De(()=>S(e.tag,{class:fe(["v-card-text",e.class]),style:Be([{"--v-card-text-opacity":e.opacity},e.style])},n)),{}}}),A_=ee({appendAvatar:String,appendIcon:ot,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:ot,ripple:{type:[Boolean,Object],default:!0},subtitle:{type:[String,Number,Boolean],default:void 0},text:{type:[String,Number,Boolean],default:void 0},title:{type:[String,Number,Boolean],default:void 0},...Vs(),...He(),...En(),...jn(),...Fn(),...lg(),...lo(),...fu(),...an(),...Fr(),...Je(),...Lt(),...xs({variant:"elevated"})},"VCard"),ln=ke()({name:"VCard",directives:{vRipple:ys},props:A_(),setup(e,t){let{attrs:n,slots:s}=t;const{themeClasses:a}=Mt(e),{borderClasses:i}=Fs(e),{colorClasses:o,colorStyles:r,variantClasses:l}=ei(e),{densityClasses:u}=Wn(e),{dimensionStyles:d}=Vn(e),{elevationClasses:h}=as(e),{loaderClasses:f}=cg(e),{locationStyles:p}=co(e),{positionClasses:g}=pu(e),{roundedClasses:m}=vn(e),v=Vr(e,n),y=be(void 0);return Oe(()=>e.loading,(w,x)=>{y.value=!w&&typeof x=="string"?x:typeof w=="boolean"?void 0:w},{immediate:!0}),De(()=>{const w=e.link!==!1&&v.isLink.value,x=!e.disabled&&e.link!==!1&&(e.link||v.isClickable.value),T=w?"a":e.tag,C=!!(s.title||e.title!=null),_=!!(s.subtitle||e.subtitle!=null),I=C||_,k=!!(s.append||e.appendAvatar||e.appendIcon),O=!!(s.prepend||e.prependAvatar||e.prependIcon),$=!!(s.image||e.image),q=I||O||k,R=!!(s.text||e.text!=null);return pn(S(T,$e(v.linkProps,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":x},a.value,i.value,o.value,u.value,h.value,f.value,g.value,m.value,l.value,e.class],style:[r.value,d.value,p.value,{"--v-card-height":pe(e.height)},e.style],onClick:x&&v.navigate.value,tabindex:e.disabled?-1:void 0}),{default:()=>{var z;return[$&&b("div",{key:"image",class:"v-card__image"},[s.image?S(gt,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},s.image):S(hu,{key:"image-img",cover:!0,src:e.image},null)]),S(zS,{name:"v-card",active:!!e.loading,color:y.value},{default:s.loader}),q&&S(x_,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:s.item,prepend:s.prepend,title:s.title,subtitle:s.subtitle,append:s.append}),R&&S(Xg,{key:"text"},{default:()=>{var se;return[((se=s.text)==null?void 0:se.call(s))??e.text]}}),(z=s.default)==null?void 0:z.call(s),s.actions&&S(Gg,null,{default:s.actions}),Za(x,"v-card")]}}),[[ys,x&&e.ripple]])}),{}}});function C_(e){let{selectedElement:t,containerElement:n,isRtl:s,isHorizontal:a}=e;const i=Qi(a,n),o=Jg(a,s,n),r=Qi(a,t),l=Qg(a,t),u=r*.4;return o>l?l-u:o+i<l+r?l-i+r+u:o}function T_(e){let{selectedElement:t,containerElement:n,isHorizontal:s}=e;const a=Qi(s,n),i=Qg(s,t),o=Qi(s,t);return i-a/2+o/2}function af(e,t){const n=e?"scrollWidth":"scrollHeight";return(t==null?void 0:t[n])||0}function I_(e,t){const n=e?"clientWidth":"clientHeight";return(t==null?void 0:t[n])||0}function Jg(e,t,n){if(!n)return 0;const{scrollLeft:s,offsetWidth:a,scrollWidth:i}=n;return e?t?i-a+s:s:n.scrollTop}function Qi(e,t){const n=e?"offsetWidth":"offsetHeight";return(t==null?void 0:t[n])||0}function Qg(e,t){const n=e?"offsetLeft":"offsetTop";return(t==null?void 0:t[n])||0}const Zg=Symbol.for("vuetify:v-slide-group"),xu=ee({centerActive:Boolean,scrollToActive:{type:Boolean,default:!0},contentClass:null,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Zg},nextIcon:{type:ot,default:"$next"},prevIcon:{type:ot,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile","never"].includes(e)},...He(),...K1({mobile:null}),...Je(),...$r({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),mr=ke()({name:"VSlideGroup",props:xu(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const{isRtl:s}=$n(),{displayClasses:a,mobile:i}=Gm(e),o=uo(e,e.symbol),r=be(!1),l=be(0),u=be(0),d=be(0),h=N(()=>e.direction==="horizontal"),{resizeRef:f,contentRect:p}=Gi(),{resizeRef:g,contentRect:m}=Gi(),v=J1(),y=N(()=>({container:f.el,duration:200,easing:"easeOutQuart"})),w=N(()=>o.selected.value.length?o.items.value.findIndex(X=>X.id===o.selected.value[0]):-1),x=N(()=>o.selected.value.length?o.items.value.findIndex(X=>X.id===o.selected.value[o.selected.value.length-1]):-1);if(rt){let X=-1;Oe(()=>[o.selected.value,p.value,m.value,h.value],()=>{cancelAnimationFrame(X),X=requestAnimationFrame(()=>{if(p.value&&m.value){const J=h.value?"width":"height";u.value=p.value[J],d.value=m.value[J],r.value=u.value+1<d.value}if(e.scrollToActive&&w.value>=0&&g.el){const J=g.el.children[x.value];C(J,e.centerActive)}})})}const T=be(!1);function C(X,J){let Ie=0;J?Ie=T_({containerElement:f.el,isHorizontal:h.value,selectedElement:X}):Ie=C_({containerElement:f.el,isHorizontal:h.value,isRtl:s.value,selectedElement:X}),_(Ie)}function _(X){if(!rt||!f.el)return;const J=Qi(h.value,f.el),Ie=Jg(h.value,s.value,f.el);if(!(af(h.value,f.el)<=J||Math.abs(X-Ie)<16)){if(h.value&&s.value&&f.el){const{scrollWidth:it,offsetWidth:M}=f.el;X=it-M-X}h.value?v.horizontal(X,y.value):v(X,y.value)}}function I(X){const{scrollTop:J,scrollLeft:Ie}=X.target;l.value=h.value?Ie:J}function k(X){if(T.value=!0,!(!r.value||!g.el)){for(const J of X.composedPath())for(const Ie of g.el.children)if(Ie===J){C(Ie);return}}}function O(X){T.value=!1}let $=!1;function q(X){var J;!$&&!T.value&&!(X.relatedTarget&&((J=g.el)!=null&&J.contains(X.relatedTarget)))&&re(),$=!1}function R(){$=!0}function z(X){if(!g.el)return;function J(Ie){X.preventDefault(),re(Ie)}h.value?X.key==="ArrowRight"?J(s.value?"prev":"next"):X.key==="ArrowLeft"&&J(s.value?"next":"prev"):X.key==="ArrowDown"?J("next"):X.key==="ArrowUp"&&J("prev"),X.key==="Home"?J("first"):X.key==="End"&&J("last")}function se(X,J){if(!X)return;let Ie=X;do Ie=Ie==null?void 0:Ie[J==="next"?"nextElementSibling":"previousElementSibling"];while(Ie!=null&&Ie.hasAttribute("disabled"));return Ie}function re(X){if(!g.el)return;let J;if(!X)J=la(g.el)[0];else if(X==="next"){if(J=se(g.el.querySelector(":focus"),X),!J)return re("first")}else if(X==="prev"){if(J=se(g.el.querySelector(":focus"),X),!J)return re("last")}else X==="first"?(J=g.el.firstElementChild,J!=null&&J.hasAttribute("disabled")&&(J=se(J,"next"))):X==="last"&&(J=g.el.lastElementChild,J!=null&&J.hasAttribute("disabled")&&(J=se(J,"prev")));J&&J.focus({preventScroll:!0})}function we(X){const J=h.value&&s.value?-1:1,Ie=(X==="prev"?-J:J)*u.value;let mt=l.value+Ie;if(h.value&&s.value&&f.el){const{scrollWidth:it,offsetWidth:M}=f.el;mt+=it-M}_(mt)}const me=N(()=>({next:o.next,prev:o.prev,select:o.select,isSelected:o.isSelected})),ge=N(()=>r.value||Math.abs(l.value)>0),Ze=N(()=>{switch(e.showArrows){case"never":return!1;case"always":return!0;case"desktop":return!i.value;case!0:return ge.value;case"mobile":return i.value||ge.value;default:return!i.value&&ge.value}}),Ve=N(()=>Math.abs(l.value)>1),Se=N(()=>{if(!f.value||!ge.value)return!1;const X=af(h.value,f.el),J=I_(h.value,f.el);return X-J-Math.abs(l.value)>1});return De(()=>S(e.tag,{class:fe(["v-slide-group",{"v-slide-group--vertical":!h.value,"v-slide-group--has-affixes":Ze.value,"v-slide-group--is-overflowing":r.value},a.value,e.class]),style:Be(e.style),tabindex:T.value||o.selected.value.length?-1:0,onFocus:q},{default:()=>{var X,J,Ie;return[Ze.value&&b("div",{key:"prev",class:fe(["v-slide-group__prev",{"v-slide-group__prev--disabled":!Ve.value}]),onMousedown:R,onClick:()=>Ve.value&&we("prev")},[((X=n.prev)==null?void 0:X.call(n,me.value))??S(Rh,null,{default:()=>[S(Ke,{icon:s.value?e.nextIcon:e.prevIcon},null)]})]),b("div",{key:"container",ref:f,class:fe(["v-slide-group__container",e.contentClass]),onScroll:I},[b("div",{ref:g,class:"v-slide-group__content",onFocusin:k,onFocusout:O,onKeydown:z},[(J=n.default)==null?void 0:J.call(n,me.value)])]),Ze.value&&b("div",{key:"next",class:fe(["v-slide-group__next",{"v-slide-group__next--disabled":!Se.value}]),onMousedown:R,onClick:()=>Se.value&&we("next")},[((Ie=n.next)==null?void 0:Ie.call(n,me.value))??S(Rh,null,{default:()=>[S(Ke,{icon:s.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:o.selected,scrollTo:we,scrollOffset:l,focus:re,hasPrev:Ve,hasNext:Se}}}),ev=Symbol.for("vuetify:v-chip-group"),E_=ee({baseColor:String,column:Boolean,filter:Boolean,valueComparator:{type:Function,default:ca},...xu({scrollToActive:!1}),...He(),...$r({selectedClass:"v-chip--selected"}),...Je(),...Lt(),...xs({variant:"tonal"})},"VChipGroup");ke()({name:"VChipGroup",props:E_(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const{themeClasses:s}=Mt(e),{isSelected:a,select:i,next:o,prev:r,selected:l}=uo(e,ev);return Ss({VChip:{baseColor:j(()=>e.baseColor),color:j(()=>e.color),disabled:j(()=>e.disabled),filter:j(()=>e.filter),variant:j(()=>e.variant)}}),De(()=>{const u=mr.filterProps(e);return S(mr,$e(u,{class:["v-chip-group",{"v-chip-group--column":e.column},s.value,e.class],style:e.style}),{default:()=>{var d;return[(d=n.default)==null?void 0:d.call(n,{isSelected:a,select:i,next:o,prev:r,selected:l.value})]}})}),{}}});const L_=ee({activeClass:String,appendAvatar:String,appendIcon:ot,baseColor:String,closable:Boolean,closeIcon:{type:ot,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:ot,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:ot,ripple:{type:[Boolean,Object],default:!0},text:{type:[String,Number,Boolean],default:void 0},modelValue:{type:Boolean,default:!0},onClick:ra(),onClickOnce:ra(),...Vs(),...He(),...En(),...Fn(),...jr(),...an(),...Fr(),...ma(),...Je({tag:"span"}),...Lt(),...xs({variant:"tonal"})},"VChip"),vt=ke()({name:"VChip",directives:{vRipple:ys},props:L_(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,t){let{attrs:n,emit:s,slots:a}=t;const{t:i}=iu(),{borderClasses:o}=Fs(e),{densityClasses:r}=Wn(e),{elevationClasses:l}=as(e),{roundedClasses:u}=vn(e),{sizeClasses:d}=ti(e),{themeClasses:h}=Mt(e),f=Kt(e,"modelValue"),p=Ki(e,ev,!1),g=Ki(e,Zg,!1),m=Vr(e,n),v=j(()=>e.link!==!1&&m.isLink.value),y=N(()=>!e.disabled&&e.link!==!1&&(!!p||e.link||m.isClickable.value)),w=j(()=>({"aria-label":i(e.closeLabel),disabled:e.disabled,onClick(k){k.preventDefault(),k.stopPropagation(),f.value=!1,s("click:close",k)}}));Oe(f,k=>{k?(p==null||p.register(),g==null||g.register()):(p==null||p.unregister(),g==null||g.unregister())});const{colorClasses:x,colorStyles:T,variantClasses:C}=ei(()=>({color:!p||p.isSelected.value?e.color??e.baseColor:e.baseColor,variant:e.variant}));function _(k){var O,$;s("click",k),y.value&&(($=(O=m.navigate).value)==null||$.call(O,k),p==null||p.toggle())}function I(k){(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),_(k))}return()=>{var re;const k=m.isLink.value?"a":e.tag,O=!!(e.appendIcon||e.appendAvatar),$=!!(O||a.append),q=!!(a.close||e.closable),R=!!(a.filter||e.filter)&&p,z=!!(e.prependIcon||e.prependAvatar),se=!!(z||a.prepend);return f.value&&pn(S(k,$e(m.linkProps,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":y.value,"v-chip--filter":R,"v-chip--pill":e.pill,[`${e.activeClass}`]:e.activeClass&&((re=m.isActive)==null?void 0:re.value)},h.value,o.value,x.value,r.value,l.value,u.value,d.value,C.value,p==null?void 0:p.selectedClass.value,e.class],style:[T.value,e.style],disabled:e.disabled||void 0,draggable:e.draggable,tabindex:y.value?0:void 0,onClick:_,onKeydown:y.value&&!v.value&&I}),{default:()=>{var we;return[Za(y.value,"v-chip"),R&&S(bS,{key:"filter"},{default:()=>[pn(b("div",{class:"v-chip__filter"},[a.filter?S(gt,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},a.filter):S(Ke,{key:"filter-icon",icon:e.filterIcon},null)]),[[Xa,p.isSelected.value]])]}),se&&b("div",{key:"prepend",class:"v-chip__prepend"},[a.prepend?S(gt,{key:"prepend-defaults",disabled:!z,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},a.prepend):b(ce,null,[e.prependIcon&&S(Ke,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&S(za,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),b("div",{class:"v-chip__content","data-no-activator":""},[((we=a.default)==null?void 0:we.call(a,{isSelected:p==null?void 0:p.isSelected.value,selectedClass:p==null?void 0:p.selectedClass.value,select:p==null?void 0:p.select,toggle:p==null?void 0:p.toggle,value:p==null?void 0:p.value.value,disabled:e.disabled}))??V(e.text)]),$&&b("div",{key:"append",class:"v-chip__append"},[a.append?S(gt,{key:"append-defaults",disabled:!O,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},a.append):b(ce,null,[e.appendIcon&&S(Ke,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&S(za,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),q&&b("button",$e({key:"close",class:"v-chip__close",type:"button","data-testid":"close-chip"},w.value),[a.close?S(gt,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},a.close):S(Ke,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[ys,y.value&&e.ripple,null]])}}}),O_=ee({id:String,interactive:Boolean,text:String,...ss(Wr({closeOnBack:!1,location:"end",locationStrategy:"connected",eager:!0,minWidth:0,offset:10,openOnClick:!1,openOnHover:!0,origin:"auto",scrim:!1,scrollStrategy:"reposition",transition:null}),["absolute","retainFocus","captureFocus","disableInitialFocus"])},"VTooltip"),of=ke()({name:"VTooltip",props:O_(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const s=Kt(e,"modelValue"),{scopeId:a}=ho(),i=Ya(),o=j(()=>e.id||`v-tooltip-${i}`),r=Pe(),l=N(()=>e.location.split(" ").length>1?e.location:e.location+" center"),u=N(()=>e.origin==="auto"||e.origin==="overlap"||e.origin.split(" ").length>1||e.location.split(" ").length>1?e.origin:e.origin+" center"),d=j(()=>e.transition!=null?e.transition:s.value?"scale-transition":"fade-transition"),h=N(()=>$e({"aria-describedby":o.value},e.activatorProps));return De(()=>{const f=Ua.filterProps(e);return S(Ua,$e({ref:r,class:["v-tooltip",{"v-tooltip--interactive":e.interactive},e.class],style:e.style,id:o.value},f,{modelValue:s.value,"onUpdate:modelValue":p=>s.value=p,transition:d.value,absolute:!0,location:l.value,origin:u.value,role:"tooltip",activatorProps:h.value,_disableGlobalStack:!0},a),{activator:n.activator,default:function(){var v;for(var p=arguments.length,g=new Array(p),m=0;m<p;m++)g[m]=arguments[m];return((v=n.default)==null?void 0:v.call(n,...g))??e.text}})}),Hr({},r)}}),N_={class:"concurrency-timeline"},P_={class:"d-flex ga-4 mb-4 flex-wrap"},B_={class:"d-flex align-center justify-space-between mb-3"},D_={class:"text-subtitle-2 font-weight-bold text-capitalize"},R_={key:0,class:"timeline-container"},M_={class:"timeline-header text-overline text-medium-emphasis mb-2"},$_={key:0,class:"text-caption ml-2"},j_={class:"lane"},V_={class:"lane-track"},F_={class:"tooltip-content"},W_={class:"font-weight-bold"},H_={class:"text-caption"},q_={key:0,class:"text-caption text-medium-emphasis mt-1"},z_={class:"lane"},U_={class:"lane-track"},G_={class:"tooltip-content"},K_={class:"font-weight-bold"},Y_={class:"text-caption"},X_={key:0,class:"text-caption text-medium-emphasis mt-1"},J_={class:"time-axis"},Q_={key:1,class:"mt-3"},Z_={class:"d-flex flex-wrap ga-2"},eA=Ct({__name:"ConcurrencyTimeline",props:{data:{}},setup(e){const t=e,n=N(()=>t.data.cases),s=N(()=>{const d=n.value.length,h=n.value.filter(p=>p.status==="pass").length,f=n.value.filter(p=>p.status==="fail").length;return{total:d,passed:h,failed:f}});function a(d){return d.outcome==="failed"?"var(--evt-red, #ef4444)":d.tool.toLowerCase().includes("get")||d.tool.toLowerCase().includes("list")?"var(--evt-blue, #3b82f6)":"var(--evt-green, #22c55e)"}function i(d){const h=[...d.agent_a_trace||[],...d.agent_b_trace||[]];return Math.max(...h.map(f=>f.t),1)}function o(d,h){return`${d.t/i(h)*100}%`}function r(d){const h=i(d);return["0s",`${(h/4).toFixed(0)}s`,`${(h/2).toFixed(0)}s`,`${(h*3/4).toFixed(0)}s`,`${h.toFixed(0)}s`]}function l(d){return d==="pass"?"success":d==="fail"?"error":"warning"}function u(d){return d.replace(/^conc-/,"").replace(/-/g," ")}return(d,h)=>(B(),H("div",N_,[b("div",P_,[S(vt,{color:"info",variant:"tonal",size:"small"},{default:D(()=>[K(V(s.value.total)+" cases ",1)]),_:1}),S(vt,{color:"success",variant:"tonal",size:"small"},{default:D(()=>[K(V(s.value.passed)+" passed ",1)]),_:1}),s.value.failed?(B(),Ge(vt,{key:0,color:"error",variant:"tonal",size:"small"},{default:D(()=>[K(V(s.value.failed)+" failed ",1)]),_:1})):Ee("",!0)]),(B(!0),H(ce,null,qe(n.value,f=>(B(),H("div",{key:f.name,class:"case-card mb-4"},[S(ln,{variant:"outlined",class:"pa-4"},{default:D(()=>{var p,g,m;return[b("div",B_,[b("span",D_,V(u(f.name)),1),S(vt,{color:l(f.status),variant:"tonal",size:"x-small"},{default:D(()=>[K(V(f.status),1)]),_:2},1032,["color"])]),(((p=f.agent_a_trace)==null?void 0:p.length)||0)+(((g=f.agent_b_trace)==null?void 0:g.length)||0)>0?(B(),H("div",R_,[b("div",M_,[h[0]||(h[0]=K(" Operation Timeline ",-1)),f.duration_s?(B(),H("span",$_," ("+V(f.duration_s.toFixed(1))+"s total) ",1)):Ee("",!0)]),b("div",j_,[h[1]||(h[1]=b("div",{class:"lane-label text-caption font-weight-bold"},"A",-1)),b("div",V_,[(B(!0),H(ce,null,qe(f.agent_a_trace||[],(v,y)=>(B(),Ge(of,{key:"a-"+y,location:"top"},{activator:D(({props:w})=>[b("div",$e({ref_for:!0},w,{class:"evt",style:{left:o(v,f),backgroundColor:a(v)}}),null,16)]),default:D(()=>[b("div",F_,[b("div",W_,V(v.tool),1),b("div",H_,V(v.t.toFixed(1))+"s",1),v.request?(B(),H("div",q_," ⤷ "+V(v.request),1)):Ee("",!0),v.response?(B(),H("div",{key:1,class:fe(["text-caption mt-1",v.outcome==="failed"?"text-error":"text-success"])},V(v.response),3)):Ee("",!0)])]),_:2},1024))),128))])]),b("div",z_,[h[2]||(h[2]=b("div",{class:"lane-label text-caption font-weight-bold"},"B",-1)),b("div",U_,[(B(!0),H(ce,null,qe(f.agent_b_trace||[],(v,y)=>(B(),Ge(of,{key:"b-"+y,location:"top"},{activator:D(({props:w})=>[b("div",$e({ref_for:!0},w,{class:"evt",style:{left:o(v,f),backgroundColor:a(v)}}),null,16)]),default:D(()=>[b("div",G_,[b("div",K_,V(v.tool),1),b("div",Y_,V(v.t.toFixed(1))+"s",1),v.request?(B(),H("div",X_," ⤷ "+V(v.request),1)):Ee("",!0),v.response?(B(),H("div",{key:1,class:fe(["text-caption mt-1",v.outcome==="failed"?"text-error":"text-success"])},V(v.response),3)):Ee("",!0)])]),_:2},1024))),128))])]),b("div",J_,[(B(!0),H(ce,null,qe(r(f),(v,y)=>(B(),H("span",{key:y},V(v),1))),128))])])):Ee("",!0),(m=f.assertions)!=null&&m.length?(B(),H("div",Q_,[b("div",Z_,[(B(!0),H(ce,null,qe(f.assertions,(v,y)=>(B(),Ge(vt,{key:y,color:v.passed?"success":"error",variant:"tonal",size:"x-small","prepend-icon":v.passed?"mdi-check":"mdi-close"},{default:D(()=>[K(V(v.evaluator),1)]),_:2},1032,["color","prepend-icon"]))),128))])])):Ee("",!0)]}),_:2},1024)]))),128)),h[3]||(h[3]=$o('<div class="d-flex ga-4 align-center mt-2" data-v-0906099d><div class="d-flex align-center ga-1" data-v-0906099d><div class="legend-dot" style="background:var(--evt-blue, #3b82f6);" data-v-0906099d></div><span class="text-caption text-medium-emphasis" data-v-0906099d>Read</span></div><div class="d-flex align-center ga-1" data-v-0906099d><div class="legend-dot" style="background:var(--evt-green, #22c55e);" data-v-0906099d></div><span class="text-caption text-medium-emphasis" data-v-0906099d>Write (ok)</span></div><div class="d-flex align-center ga-1" data-v-0906099d><div class="legend-dot" style="background:var(--evt-red, #ef4444);" data-v-0906099d></div><span class="text-caption text-medium-emphasis" data-v-0906099d>Write (fail)</span></div></div>',1))]))}}),Ws=(e,t)=>{const n=e.__vccOpts||e;for(const[s,a]of t)n[s]=a;return n},tA=Ws(eA,[["__scopeId","data-v-0906099d"]]),nA="2026-07-23T16:39:01.636188",sA=JSON.parse('[{"name":"conc-non-overlap-direct","status":"pass","duration_s":26,"agent_a_output":"Done! The text in `textA_1` on block `hero-block` (default locale, campaign `conc-camp`) has been updated from:\\n\\n- **Before:** `Original Headline`\\n- **After:** `Original Headline | Summer Sale`","agent_b_output":"Done! The text in **block `text-block`** (editable `textA_1`) of the **default locale** has been updated:\\n\\n- **Before:** `Original Body`\\n- **After:** `Original Body | Limited Offer`","agent_a_trace":[{"t":8.02,"tool":"listCampaigns","request":"List campaigns","response":"✓ {\'value\': [], \'next\': None}","outcome":"success"},{"t":11.21,"tool":"listCampaigns","request":"List campaigns","response":"✓ {\'value\': [], \'next\': None}","outcome":"success"},{"t":14.16,"tool":"listCampaigns","request":"List campaigns","response":"✓ {\'value\': [{\'createdAt\': \'2026-07-01T09:00:00Z\', \'fallbac...","outcome":"success"},{"t":18.07,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=?, value=\\"Original Headline\\"","outcome":"success"},{"t":22.31,"tool":"replaceLatestBlockText","request":"Write hero-block/textA_1: \\"Original Headline | Summer Sale\\"","response":"✓ Written — new version=?","outcome":"success"}],"agent_b_trace":[{"t":8.82,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":8.82,"tool":"getLatestBlockText","request":"Read text-block/textA_1","response":"✓ version=?, value=\\"Original Body\\"","outcome":"success"},{"t":12.95,"tool":"replaceLatestBlockText","request":"Write text-block/textA_1: \\"Original Body | Limited Offer\\"","response":"✓ Written — new version=?","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Summer Sale\\", actual=\\"Original Headline | Summer Sale\\""},{"evaluator":"DbFieldContains(blocks.1.contents.textA_1.value)","passed":true,"detail":"substring=\\"Limited Offer\\", actual=\\"Original Body | Limited Offer\\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=3"}]},{"name":"conc-same-field-direct","status":"pass","duration_s":25.8,"agent_a_output":"Done! Here\'s a summary of the change:\\n\\n- **Campaign:** Concurrency Test Campaign (`conc-camp`)\\n- **Locale:** default\\n- **Block:** `hero-block`, editable `textA_1`\\n- **Before:** `Original Headline | Limited Offer`\\n- **After:** `Original Headline | Limited Offer | Summer Sale`","agent_b_output":"Done! The text in block **hero-block** (editable `textA_1`) of the **default** locale in campaign **conc-camp** has been updated:\\n\\n- **Before:** `Original Headline`\\n- **After:** `Original Headline | Limited Offer`","agent_a_trace":[{"t":7.97,"tool":"listCampaigns","request":"List campaigns","response":"✓ {\'value\': [], \'next\': None}","outcome":"success"},{"t":11.36,"tool":"listCampaigns","request":"List campaigns","response":"✓ {\'value\': [], \'next\': None}","outcome":"success"},{"t":14.32,"tool":"listCampaigns","request":"List campaigns","response":"✓ {\'value\': [{\'createdAt\': \'2026-07-01T09:00:00Z\', \'fallbac...","outcome":"success"},{"t":18.39,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=?, value=\\"Original Headline | Limited Offer\\"","outcome":"success"},{"t":22.39,"tool":"replaceLatestBlockText","request":"Write hero-block/textA_1: \\"Original Headline | Limited Offer | S...\\"","response":"✓ Written — new version=?","outcome":"success"}],"agent_b_trace":[{"t":7.82,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=?, value=\\"Original Headline\\"","outcome":"success"},{"t":12.14,"tool":"replaceLatestBlockText","request":"Write hero-block/textA_1: \\"Original Headline | Limited Offer\\"","response":"✓ Written — new version=?","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Summer Sale\\", actual=\\"Original Headline | Limited Offer | Summer Sale\\""},{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Limited Offer\\", actual=\\"Original Headline | Limited Offer | Summer Sale\\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=3"}]},{"name":"conc-same-field-plan-vs-direct","status":"fail","duration_s":27.5,"agent_a_output":"The plan was already successfully applied on the first attempt — the 409 Conflict confirms it\'s now in `applied` status. The output validation error was a display-side issue, not an execution failure.\\n\\nHere\'s a summary of what was done:\\n\\n| Step | Result |\\n|---|---|\\n| **Existing text** | `Original Headline` |\\n| **New text** | `Original Headline \\\\| Summer Sale` |\\n| **Block** | `hero-block` / editable `textA_1` |\\n| **Locale** | `default` |\\n| **Plan ID** | `6a62262c19c14ac0d9f1c180` |\\n| **Status** |","agent_b_output":"Done! Here\'s a summary of what changed:\\n\\n- **Campaign:** `conc-camp`\\n- **Locale:** `default`\\n- **Block:** `hero-block`\\n- **Editable:** `textA_1`\\n- **Before:** `Original Headline`\\n- **After:** `Original Headline | Limited Offer`","agent_a_trace":[{"t":7.78,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":7.78,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=?, value=\\"Original Headline\\"","outcome":"success"},{"t":15.5,"tool":"createPlan","request":"Create plan (localeVersion=1): \\"Append \\" | Summer Sale\\" to the existi...\\"","response":"✓ Plan created: ?...","outcome":"success"},{"t":18.24,"tool":"applyPlan","request":"Apply plan 6a62262c...","response":"❌ Error: Output validation error: \'intent\' is a required property","outcome":"failed"},{"t":23.06,"tool":"updatePlan","request":"updatePlan(campaignId=conc-camp, planId=6a62262c19c14ac0d9f1c180)","response":"❌ Error: Error calling tool \'updatePlan\': HTTP error 409: Conflict - ","outcome":"failed"}],"agent_b_trace":[{"t":8.1,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":8.09,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=?, value=\\"Original Headline\\"","outcome":"success"},{"t":12.06,"tool":"replaceLatestBlockText","request":"Write hero-block/textA_1: \\"Original Headline | Limited Offer\\"","response":"✓ Written — new version=?","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Summer Sale\\", actual=\\"Original Headline | Summer Sale\\""},{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":false,"detail":"substring=\\"Limited Offer\\", actual=\\"Original Headline | Summer Sale\\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=3"}]},{"name":"conc-same-field-plan-vs-plan","status":"fail","duration_s":28.3,"agent_a_output":"The plan was actually **successfully applied** — the `applyPlan` response had a formatting issue on my end, but the plan status confirms `\\"status\\": \\"applied\\"`. Here\'s a summary of what was done:\\n\\n---\\n\\n✅ **Plan applied successfully!**\\n\\n| Field | Details |\\n|---|---|\\n| **Plan ID** | `6a62264719c14ac0d9f1c182` |\\n| **Campaign** | `conc-camp` |\\n| **Locale** | `default` |\\n| **Block** | `hero-block` |\\n| **Editable** | `textA_1` |\\n| **Old value** | `Original Headline` |\\n| **New value** | `Original Headli","agent_b_output":"The plan was successfully created and applied. Here\'s a summary of what was done:\\n\\n- **Plan ID:** `6a62264719c14ac0d9f1c181`\\n- **Status:** ✅ `applied`\\n- **Change:** The text in `hero-block` → `textA_1` (default locale) was updated from:\\n  - **Before:** `\\"Original Headline\\"`\\n  - **After:** `\\"Original Headline | Limited Offer\\"`","agent_a_trace":[{"t":7.54,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":7.54,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=?, value=\\"Original Headline\\"","outcome":"success"},{"t":14.96,"tool":"createPlan","request":"Create plan (localeVersion=1): \\"Append \\" | Summer Sale\\" to the hero b...\\"","response":"✓ Plan created: ?...","outcome":"success"},{"t":19.5,"tool":"applyPlan","request":"Apply plan 6a622647...","response":"❌ Error: Output validation error: \'intent\' is a required property","outcome":"failed"},{"t":22.67,"tool":"getPlan","request":"getPlan(planId=6a62264719c14ac0d9f1c182)","response":"✓ {\'id\': \'6a62264719c14ac0d9f1c182\', \'campaignId\': \'conc-ca...","outcome":"success"}],"agent_b_trace":[{"t":7.43,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":7.43,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=?, value=\\"Original Headline\\"","outcome":"success"},{"t":14.66,"tool":"createPlan","request":"Create plan (localeVersion=1): \\"Append \' | Limited Offer\' to the exis...\\"","response":"✓ Plan created: ?...","outcome":"success"},{"t":17.35,"tool":"applyPlan","request":"Apply plan 6a622647...","response":"❌ Error: Output validation error: \'intent\' is a required property","outcome":"failed"},{"t":20.45,"tool":"getPlan","request":"getPlan(planId=6a62264719c14ac0d9f1c181)","response":"✓ {\'id\': \'6a62264719c14ac0d9f1c181\', \'campaignId\': \'conc-ca...","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Summer Sale\\", actual=\\"Original Headline | Summer Sale\\""},{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":false,"detail":"substring=\\"Limited Offer\\", actual=\\"Original Headline | Summer Sale\\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=3"}]},{"name":"conc-same-field-optimistic-locking","status":"pass","duration_s":25.1,"agent_a_output":"All done! Here\'s a summary of what happened:\\n\\n- **First read:** Text was `\\"Original Headline\\"` (version 1) — but a concurrent edit bumped the locale to version 2 before my write could land, causing a **409 Conflict**.\\n- **Re-read:** Fetched the latest text `\\"Original Headline | Limited Offer\\"` at version 2.\\n- **Retry write:** Successfully appended `\\" | Summer Sale\\"` and the block now reads:\\n\\n> **\\"Original Headline | Limited Offer | Summer Sale\\"** (version 3) ✅","agent_b_output":"All done! Here\'s a summary of what happened:\\n\\n- **Campaign:** `conc-camp`\\n- **Block / Editable:** `hero-block` / `textA_1`\\n- **Locale:** `default`\\n- **Before:** `Original Headline` *(version 1)*\\n- **After:** `Original Headline | Limited Offer` *(version 2)*\\n\\nThe write succeeded on the first attempt with no conflicts. ✅","agent_a_trace":[{"t":6.25,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":8.79,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=1, value=\\"Original Headline\\"","outcome":"success"},{"t":15.39,"tool":"replaceLatestBlockText","request":"Write hero-block/textA_1 (version=1): \\"Original Headline | Summer Sale\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":18.29,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=2, value=\\"Original Headline | Limited Offer\\"","outcome":"success"},{"t":21.27,"tool":"replaceLatestBlockText","request":"Write hero-block/textA_1 (version=2): \\"Original Headline | Limited Offer | S...\\"","response":"✓ Written — new version=3","outcome":"success"}],"agent_b_trace":[{"t":6.69,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":11.02,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=1, value=\\"Original Headline\\"","outcome":"success"},{"t":14.26,"tool":"replaceLatestBlockText","request":"Write hero-block/textA_1 (version=1): \\"Original Headline | Limited Offer\\"","response":"✓ Written — new version=2","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Summer Sale\\", actual=\\"Original Headline | Limited Offer | Summer Sale\\""},{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Limited Offer\\", actual=\\"Original Headline | Limited Offer | Summer Sale\\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=3"}]},{"name":"conc-same-field-plan-vs-direct-locking","status":"pass","duration_s":34.7,"agent_a_output":"All done! Here\'s a summary of what happened:\\n\\n- **First attempt** hit a **409 conflict** — the locale had been updated externally from version 1 → 2, changing the text to `\\"Original Headline | Limited Offer\\"`.\\n- **Retry**: Re-read the current text, created a fresh plan against **version 2**, and successfully applied it.\\n\\n**Final text in `hero-block` / `textA_1` (default locale):**\\n> `Original Headline | Limited Offer | Summer Sale`","agent_b_output":"All done! Here\'s a summary of what happened:\\n\\n- **Campaign:** `conc-camp`\\n- **Locale:** `default`\\n- **Block / Editable:** `hero-block` / `textA_1`\\n- **Before:** `Original Headline`\\n- **After:** `Original Headline | Limited Offer`\\n- **New version:** `2` (write succeeded with no conflicts ✅)","agent_a_trace":[{"t":7.28,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":7.29,"tool":"getCampaign","request":"Get campaign conc-camp","response":"✓ Concurrency Test Campaign","outcome":"success"},{"t":9.96,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=1, value=\\"Original Headline\\"","outcome":"success"},{"t":13.18,"tool":"createPlan","request":"Create plan (localeVersion=1): \\"Append \\" | Summer Sale\\" to the existi...\\"","response":"✓ Plan created: cde83ab6...","outcome":"success"},{"t":17.38,"tool":"appendPlanAction","request":"Append action to plan cde83ab6...","response":"✓ Action appended","outcome":"success"},{"t":19.27,"tool":"applyPlan","request":"Apply plan cde83ab6...","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":22,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=2, value=\\"Original Headline | Limited Offer\\"","outcome":"success"},{"t":25.14,"tool":"createPlan","request":"Create plan (localeVersion=2): \\"Append \\" | Summer Sale\\" to the curren...\\"","response":"✓ Plan created: 4e4777cc...","outcome":"success"},{"t":29.13,"tool":"appendPlanAction","request":"Append action to plan 4e4777cc...","response":"✓ Action appended","outcome":"success"},{"t":30.94,"tool":"applyPlan","request":"Apply plan 4e4777cc...","response":"✓ Plan applied successfully","outcome":"success"}],"agent_b_trace":[{"t":5.74,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":8.55,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=1, value=\\"Original Headline\\"","outcome":"success"},{"t":11.14,"tool":"replaceLatestBlockText","request":"Write hero-block/textA_1 (version=1): \\"Original Headline | Limited Offer\\"","response":"✓ Written — new version=2","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Summer Sale\\", actual=\\"Original Headline | Limited Offer | Summer Sale\\""},{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Limited Offer\\", actual=\\"Original Headline | Limited Offer | Summer Sale\\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=3"}]},{"name":"conc-same-field-plan-vs-plan-locking","status":"pass","duration_s":34.5,"agent_a_output":"Everything went through cleanly — no conflicts! Here\'s a summary of what was done:\\n\\n| Step | Detail |\\n|---|---|\\n| **Campaign** | `conc-camp` |\\n| **Locale** | `default` (version 1) |\\n| **Block / Editable** | `hero-block` / `textA_1` |\\n| **Old text** | `Original Headline` |\\n| **New text** | `Original Headline \\\\| Summer Sale` |\\n| **Plan ID** | `c516f6bf-76b9-4028-879b-091ce1413be5` |\\n| **Status** | ✅ Applied |\\n\\nThe default locale\'s hero block now reads **\\"Original Headline | Summer Sale\\"**.","agent_b_output":"All done! Here\'s a summary of what happened:\\n\\n- **First attempt:** Hit a **409 conflict** — the locale had been updated concurrently from version 1 → 2, and the text had changed to `\\"Original Headline | Summer Sale\\"`.\\n- **Retry:** Re-read the latest text at version 2, created a fresh plan (ID `1321ff68`), appended the action, and applied successfully.\\n\\n**Final result:**\\n- **Block:** `hero-block` / `textA_1` (campaign `conc-camp`, locale `default`)\\n- **Old text:** `\\"Original Headline | Summer Sal","agent_a_trace":[{"t":6.75,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":6.76,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=1, value=\\"Original Headline\\"","outcome":"success"},{"t":10.39,"tool":"createPlan","request":"Create plan (localeVersion=1): \\"Append \\" | Summer Sale\\" to the existi...\\"","response":"✓ Plan created: c516f6bf...","outcome":"success"},{"t":14.55,"tool":"appendPlanAction","request":"Append action to plan c516f6bf...","response":"✓ Action appended","outcome":"success"},{"t":16.62,"tool":"applyPlan","request":"Apply plan c516f6bf...","response":"✓ Plan applied successfully","outcome":"success"}],"agent_b_trace":[{"t":5.95,"tool":"getCampaign","request":"Get campaign conc-camp","response":"✓ Concurrency Test Campaign","outcome":"success"},{"t":5.95,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":8.44,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=1, value=\\"Original Headline\\"","outcome":"success"},{"t":11.5,"tool":"createPlan","request":"Create plan (localeVersion=1): \\"Append \\" | Limited Offer\\" to the exis...\\"","response":"✓ Plan created: 978d1cc0...","outcome":"success"},{"t":15.65,"tool":"appendPlanAction","request":"Append action to plan 978d1cc0...","response":"✓ Action appended","outcome":"success"},{"t":17.87,"tool":"applyPlan","request":"Apply plan 978d1cc0...","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":20.53,"tool":"getLatestBlockText","request":"Read hero-block/textA_1","response":"✓ version=2, value=\\"Original Headline | Summer Sale\\"","outcome":"success"},{"t":24.58,"tool":"createPlan","request":"Create plan (localeVersion=2): \\"Append \\" | Limited Offer\\" to the curr...\\"","response":"✓ Plan created: 1321ff68...","outcome":"success"},{"t":28.43,"tool":"appendPlanAction","request":"Append action to plan 1321ff68...","response":"✓ Action appended","outcome":"success"},{"t":30.24,"tool":"applyPlan","request":"Apply plan 1321ff68...","response":"✓ Plan applied successfully","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Summer Sale\\", actual=\\"Original Headline | Summer Sale | Limited Offer\\""},{"evaluator":"DbFieldContains(blocks.0.contents.textA_1.value)","passed":true,"detail":"substring=\\"Limited Offer\\", actual=\\"Original Headline | Summer Sale | Limited Offer\\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=3"}]},{"name":"conc-multi-field-rewrite-rewrite-direct","status":"error","duration_s":12,"agent_a_output":"","agent_b_output":"","agent_a_trace":[],"agent_b_trace":[],"assertions":[]},{"name":"conc-multi-field-rewrite-rewrite-plan-vs-plan","status":"error","duration_s":11.4,"agent_a_output":"","agent_b_output":"","agent_a_trace":[],"agent_b_trace":[],"assertions":[]},{"name":"conc-multi-field-rewrite-rewrite-optimistic-locking","status":"pass","duration_s":112,"agent_a_output":"All 6 fields are done! 🎉 Here\'s a summary of every change made:\\n\\n---\\n\\n### ✅ All rewrites complete — campaign `conc-camp`, default locale\\n\\n| Block | Editable | New Value |\\n|-------|----------|-----------|\\n| **card-1** | headline | *Yay, Our Summer Sale is LIVE — Save 30% Today! 🎉☀️* |\\n| **card-1** | body | *Peep our latest collection of premium goodies — plus snag 30% off all summer styles! 🔥☀️🛍️* |\\n| **card-2** | headline | *Fan Faves — Now 30% Off This Summer! 💖🔥* |\\n| **card-2** | body | *Psst ","agent_b_output":"All 6 fields are successfully updated. Here\'s a full summary of every change made to campaign **conc-camp** (default locale):\\n\\n---\\n\\n### ✅ card-1\\n| Field | Before | After |\\n|-------|--------|-------|\\n| **headline** | Welcome to Our Store | Welcome to Our Summer Sale — Save **30%** Today! |\\n| **body** | Browse our latest collection of premium products. | Browse our latest collection of premium products and enjoy **30%** off all summer styles. |\\n\\n### ✅ card-2\\n| Field | Before | After |\\n|-------|---","agent_a_trace":[{"t":6.17,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":11.94,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=1, value=\\"Welcome to Our Store\\"","outcome":"success"},{"t":11.95,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=1, value=\\"Browse our latest collection of premium products.\\"","outcome":"success"},{"t":11.95,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=1, value=\\"Customer Favorites\\"","outcome":"success"},{"t":11.96,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=1, value=\\"See what other shoppers are loving this season.\\"","outcome":"success"},{"t":11.96,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=1, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":11.95,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=1, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":22.09,"tool":"replaceLatestBlockText","request":"Write card-1/headline (version=1): \\"Hey, Welcome to Our Store! 👋🎉\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":22.08,"tool":"replaceLatestBlockText","request":"Write card-1/body (version=1): \\"Dive into our latest drop of premium ...\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":22.08,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=1): \\"Fan Faves Are Here! 💖🔥\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":22.08,"tool":"replaceLatestBlockText","request":"Write card-2/body (version=1): \\"Psst — these are the things everyone\'...\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":22.09,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=1): \\"Fresh Drops Just Hit This Week! 🆕🚀\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":22.1,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=1): \\"Brand new styles just landed and they...\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":29.79,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=2, value=\\"Welcome to Our Store\\"","outcome":"success"},{"t":29.79,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=2, value=\\"Browse our latest collection of premium products a\\"","outcome":"success"},{"t":29.79,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=2, value=\\"Customer Favorites\\"","outcome":"success"},{"t":29.79,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=2, value=\\"See what other shoppers are loving this season.\\"","outcome":"success"},{"t":29.79,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=2, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":29.79,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=2, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":39.51,"tool":"replaceLatestBlockText","request":"Write card-1/headline (version=2): \\"Hey, Welcome to Our Store! 👋🎉\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":39.5,"tool":"replaceLatestBlockText","request":"Write card-1/body (version=2): \\"Peep our latest collection of premium...\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":39.52,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=2): \\"Fan Faves Are Here! 💖🔥\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":39.52,"tool":"replaceLatestBlockText","request":"Write card-2/body (version=2): \\"Psst — these are the things everyone\'...\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":39.51,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=2): \\"Fresh Drops Just Hit This Week! 🆕🚀\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":39.51,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=2): \\"Brand new styles just landed and they...\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":45.54,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=3, value=\\"Welcome to Our Summer Sale — Save 30% Today!\\"","outcome":"success"},{"t":45.54,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=3, value=\\"Browse our latest collection of premium products a\\"","outcome":"success"},{"t":45.55,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=3, value=\\"Customer Favorites\\"","outcome":"success"},{"t":45.54,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=3, value=\\"See what other shoppers are loving this season.\\"","outcome":"success"},{"t":45.55,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=3, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":45.55,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=3, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":54.85,"tool":"replaceLatestBlockText","request":"Write card-1/headline (version=3): \\"Yay, Our Summer Sale is LIVE — Save 3...\\"","response":"⚠️ 409 Conflict — current version is 5","outcome":"failed"},{"t":54.85,"tool":"replaceLatestBlockText","request":"Write card-1/body (version=3): \\"Peep our latest collection of premium...\\"","response":"⚠️ 409 Conflict — current version is 5","outcome":"failed"},{"t":54.84,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=3): \\"Fan Faves Are Here! 💖🔥\\"","response":"⚠️ 409 Conflict — current version is 5","outcome":"failed"},{"t":54.85,"tool":"replaceLatestBlockText","request":"Write card-2/body (version=3): \\"Psst — these are the things everyone\'...\\"","response":"⚠️ 409 Conflict — current version is 5","outcome":"failed"},{"t":54.9,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=3): \\"Fresh Drops Just Hit This Week! 🆕🚀\\"","response":"⚠️ 409 Conflict — current version is 5","outcome":"failed"},{"t":54.89,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=3): \\"Brand new styles just landed and they...\\"","response":"⚠️ 409 Conflict — current version is 5","outcome":"failed"},{"t":61.11,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=6, value=\\"Welcome to Our Summer Sale — Save 30% Today!\\"","outcome":"success"},{"t":61.11,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=6, value=\\"Browse our latest collection of premium products a\\"","outcome":"success"},{"t":61.11,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=6, value=\\"Customer Favorites — Now 30% Off This Summer!\\"","outcome":"success"},{"t":61.11,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=6, value=\\"See what other shoppers are loving this season — a\\"","outcome":"success"},{"t":61.11,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=6, value=\\"New Arrivals This Week — Get 30% Off All Summer!\\"","outcome":"success"},{"t":61.11,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=6, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":70.91,"tool":"replaceLatestBlockText","request":"Write card-1/headline (version=6): \\"Yay, Our Summer Sale is LIVE — Save 3...\\"","response":"⚠️ 409 Conflict — current version is 7","outcome":"failed"},{"t":70.91,"tool":"replaceLatestBlockText","request":"Write card-1/body (version=6): \\"Peep our latest collection of premium...\\"","response":"⚠️ 409 Conflict — current version is 7","outcome":"failed"},{"t":70.92,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=6): \\"Fan Faves — Now 30% Off This Summer! 💖🔥\\"","response":"⚠️ 409 Conflict — current version is 7","outcome":"failed"},{"t":70.91,"tool":"replaceLatestBlockText","request":"Write card-2/body (version=6): \\"Psst — these are the things everyone\'...\\"","response":"⚠️ 409 Conflict — current version is 7","outcome":"failed"},{"t":70.95,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=6): \\"Fresh Drops Just Hit — Get 30% Off Al...\\"","response":"⚠️ 409 Conflict — current version is 7","outcome":"failed"},{"t":70.96,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=6): \\"Brand new styles just landed and they...\\"","response":"⚠️ 409 Conflict — current version is 7","outcome":"failed"},{"t":74.81,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=7, value=\\"Welcome to Our Summer Sale — Save 30% Today!\\"","outcome":"success"},{"t":77.3,"tool":"replaceLatestBlockText","request":"Write card-1/headline (version=7): \\"Yay, Our Summer Sale is LIVE — Save 3...\\"","response":"✓ Written — new version=8","outcome":"success"},{"t":81.36,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=8, value=\\"Browse our latest collection of premium products a\\"","outcome":"success"},{"t":84.03,"tool":"replaceLatestBlockText","request":"Write card-1/body (version=8): \\"Peep our latest collection of premium...\\"","response":"✓ Written — new version=9","outcome":"success"},{"t":86.46,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=9, value=\\"Customer Favorites — Now 30% Off This Summer!\\"","outcome":"success"},{"t":89.2,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=9): \\"Fan Faves — Now 30% Off This Summer! 💖🔥\\"","response":"✓ Written — new version=10","outcome":"success"},{"t":91.4,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=10, value=\\"See what other shoppers are loving this season — a\\"","outcome":"success"},{"t":94.65,"tool":"replaceLatestBlockText","request":"Write card-2/body (version=10): \\"Psst — these are the things everyone\'...\\"","response":"✓ Written — new version=11","outcome":"success"},{"t":97.27,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=11, value=\\"New Arrivals This Week — Get 30% Off All Summer!\\"","outcome":"success"},{"t":99.84,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=11): \\"Fresh Drops Just Hit — Get 30% Off Al...\\"","response":"✓ Written — new version=12","outcome":"success"},{"t":102.08,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=12, value=\\"Fresh styles just landed — be the first to explore\\"","outcome":"success"},{"t":104.82,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=12): \\"Brand new styles just landed — be the...\\"","response":"✓ Written — new version=13","outcome":"success"}],"agent_b_trace":[{"t":5.99,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":12.61,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=1, value=\\"Welcome to Our Store\\"","outcome":"success"},{"t":12.61,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=1, value=\\"Browse our latest collection of premium products.\\"","outcome":"success"},{"t":12.61,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=1, value=\\"Customer Favorites\\"","outcome":"success"},{"t":12.61,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=1, value=\\"See what other shoppers are loving this season.\\"","outcome":"success"},{"t":12.61,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=1, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":12.61,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=1, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":21.16,"tool":"replaceLatestBlockText","request":"Write card-1/headline (version=1): \\"Welcome to Our Summer Sale — Save 30%...\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":21.15,"tool":"replaceLatestBlockText","request":"Write card-1/body (version=1): \\"Browse our latest collection of premi...\\"","response":"✓ Written — new version=2","outcome":"success"},{"t":21.15,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=1): \\"Customer Favorites — Now 30% Off This...\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":21.17,"tool":"replaceLatestBlockText","request":"Write card-2/body (version=1): \\"See what other shoppers are loving th...\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":21.16,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=1): \\"New Arrivals This Week — Get 30% Off ...\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":21.17,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=1): \\"Fresh styles just landed — be the fir...\\"","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":27.51,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=2, value=\\"Welcome to Our Store\\"","outcome":"success"},{"t":27.51,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=2, value=\\"Customer Favorites\\"","outcome":"success"},{"t":27.51,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=2, value=\\"See what other shoppers are loving this season.\\"","outcome":"success"},{"t":27.51,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=2, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":27.51,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=2, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":34.68,"tool":"replaceLatestBlockText","request":"Write card-1/headline (version=2): \\"Welcome to Our Summer Sale — Save 30%...\\"","response":"✓ Written — new version=3","outcome":"success"},{"t":34.68,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=2): \\"Customer Favorites — Now 30% Off This...\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":34.67,"tool":"replaceLatestBlockText","request":"Write card-2/body (version=2): \\"See what other shoppers are loving th...\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":34.69,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=2): \\"New Arrivals This Week — Get 30% Off ...\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":34.68,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=2): \\"Fresh styles just landed — be the fir...\\"","response":"⚠️ 409 Conflict — current version is 3","outcome":"failed"},{"t":39.35,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=3, value=\\"Customer Favorites\\"","outcome":"success"},{"t":39.35,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=3, value=\\"See what other shoppers are loving this season.\\"","outcome":"success"},{"t":39.35,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=3, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":39.35,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=3, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":46.11,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=3): \\"Customer Favorites — Now 30% Off This...\\"","response":"⚠️ 409 Conflict — current version is 4","outcome":"failed"},{"t":46.11,"tool":"replaceLatestBlockText","request":"Write card-2/body (version=3): \\"See what other shoppers are loving th...\\"","response":"✓ Written — new version=4","outcome":"success"},{"t":46.11,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=3): \\"New Arrivals This Week — Get 30% Off ...\\"","response":"⚠️ 409 Conflict — current version is 4","outcome":"failed"},{"t":46.11,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=3): \\"Fresh styles just landed — be the fir...\\"","response":"⚠️ 409 Conflict — current version is 4","outcome":"failed"},{"t":49.64,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=4, value=\\"Customer Favorites\\"","outcome":"success"},{"t":49.64,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=4, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":49.64,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=4, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":54,"tool":"replaceLatestBlockText","request":"Write card-2/headline (version=4): \\"Customer Favorites — Now 30% Off This...\\"","response":"✓ Written — new version=5","outcome":"success"},{"t":54.01,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=4): \\"New Arrivals This Week — Get 30% Off ...\\"","response":"⚠️ 409 Conflict — current version is 5","outcome":"failed"},{"t":54,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=4): \\"Fresh styles just landed — be the fir...\\"","response":"⚠️ 409 Conflict — current version is 5","outcome":"failed"},{"t":57.07,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=5, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":57.07,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=5, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":60.4,"tool":"replaceLatestBlockText","request":"Write card-3/headline (version=5): \\"New Arrivals This Week — Get 30% Off ...\\"","response":"✓ Written — new version=6","outcome":"success"},{"t":60.4,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=5): \\"Fresh styles just landed — be the fir...\\"","response":"⚠️ 409 Conflict — current version is 6","outcome":"failed"},{"t":64.05,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=6, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":66.4,"tool":"replaceLatestBlockText","request":"Write card-3/body (version=6): \\"Fresh styles just landed — be the fir...\\"","response":"✓ Written — new version=7","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.headline.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Yay, Our Summer Sale is LIVE — Save 30% Today! 🎉☀️\\""},{"evaluator":"DbFieldMatchesRegex(blocks.0.contents.headline.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Yay, Our Summer Sale is LIVE — Save 30% Today! 🎉☀️\\""},{"evaluator":"DbFieldContains(blocks.0.contents.body.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Peep our latest collection of premium goodies — plus snag 30% off all summer sty\\""},{"evaluator":"DbFieldMatchesRegex(blocks.0.contents.body.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Peep our latest collection of premium goodies — plus snag 30\\""},{"evaluator":"DbFieldContains(blocks.1.contents.headline.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Fan Faves — Now 30% Off This Summer! 💖🔥\\""},{"evaluator":"DbFieldMatchesRegex(blocks.1.contents.headline.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Fan Faves — Now 30% Off This Summer! 💖🔥\\""},{"evaluator":"DbFieldContains(blocks.1.contents.body.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Psst — these are the things everyone\'s obsessing over this season, all at 30% of\\""},{"evaluator":"DbFieldMatchesRegex(blocks.1.contents.body.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Psst — these are the things everyone\'s obsessing over this s\\""},{"evaluator":"DbFieldContains(blocks.2.contents.headline.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Fresh Drops Just Hit — Get 30% Off All Summer! 🆕🚀\\""},{"evaluator":"DbFieldMatchesRegex(blocks.2.contents.headline.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Fresh Drops Just Hit — Get 30% Off All Summer! 🆕🚀\\""},{"evaluator":"DbFieldContains(blocks.2.contents.body.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Brand new styles just landed — be the first to grab \'em and save 30% with our ex\\""},{"evaluator":"DbFieldMatchesRegex(blocks.2.contents.body.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Brand new styles just landed — be the first to grab \'em and \\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=13"}]},{"name":"conc-multi-field-rewrite-rewrite-plan-vs-plan-locking","status":"pass","duration_s":70.5,"agent_a_output":"Plan applied successfully! ✅ Here\'s a full summary of every change made to campaign **conc-camp**, default locale:\\n\\n---\\n\\n### 🃏 card-1\\n| Field | Before | After |\\n|---|---|---|\\n| **headline** | Welcome to Our Store | Hey, welcome to our store! 🎉 |\\n| **body** | Browse our latest collection of premium products. | Dig into our freshest premium picks — something awesome is waiting for you! ✨ |\\n\\n### 🃏 card-2\\n| Field | Before | After |\\n|---|---|---|\\n| **headline** | Customer Favorites | What everyone\'s ","agent_b_output":"✅ Plan applied successfully! Here\'s a full summary of everything that happened and the final state of all 6 fields:\\n\\n---\\n\\n## What happened\\n\\n**First attempt:** Got a 409 conflict — another agent had updated the locale to version 2 while I was working. I re-read all fields, adapted my rewrites to the new content (which now contained emoji), and retried.\\n\\n**Second attempt:** Applied cleanly against version 2. ✅\\n\\n---\\n\\n## Final content (all fields contain \\"30%\\", all emoji preserved)\\n\\n| Block | Editab","agent_a_trace":[{"t":9.26,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":9.26,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=1, value=\\"Welcome to Our Store\\"","outcome":"success"},{"t":9.26,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=1, value=\\"Browse our latest collection of premium products.\\"","outcome":"success"},{"t":9.26,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=1, value=\\"Customer Favorites\\"","outcome":"success"},{"t":9.27,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=1, value=\\"See what other shoppers are loving this season.\\"","outcome":"success"},{"t":9.27,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=1, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":9.27,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=1, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":15.84,"tool":"createPlan","request":"Create plan (localeVersion=1): \\"Rewrite all text fields (headline + b...\\"","response":"✓ Plan created: bde24da4...","outcome":"success"},{"t":29.36,"tool":"appendPlanAction","request":"Append action to plan bde24da4...","response":"✓ Action appended","outcome":"success"},{"t":29.35,"tool":"appendPlanAction","request":"Append action to plan bde24da4...","response":"✓ Action appended","outcome":"success"},{"t":29.36,"tool":"appendPlanAction","request":"Append action to plan bde24da4...","response":"✓ Action appended","outcome":"success"},{"t":29.35,"tool":"appendPlanAction","request":"Append action to plan bde24da4...","response":"✓ Action appended","outcome":"success"},{"t":29.36,"tool":"appendPlanAction","request":"Append action to plan bde24da4...","response":"✓ Action appended","outcome":"success"},{"t":29.36,"tool":"appendPlanAction","request":"Append action to plan bde24da4...","response":"✓ Action appended","outcome":"success"},{"t":31.68,"tool":"applyPlan","request":"Apply plan bde24da4...","response":"✓ Plan applied successfully","outcome":"success"}],"agent_b_trace":[{"t":7.11,"tool":"getCampaign","request":"Get campaign conc-camp","response":"✓ Concurrency Test Campaign","outcome":"success"},{"t":7.11,"tool":"listLocales","request":"List locales","response":"✓ latestVersion=1","outcome":"success"},{"t":12.87,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=1, value=\\"Welcome to Our Store\\"","outcome":"success"},{"t":12.86,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=1, value=\\"Browse our latest collection of premium products.\\"","outcome":"success"},{"t":12.86,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=1, value=\\"Customer Favorites\\"","outcome":"success"},{"t":12.87,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=1, value=\\"See what other shoppers are loving this season.\\"","outcome":"success"},{"t":12.87,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=1, value=\\"New Arrivals This Week\\"","outcome":"success"},{"t":12.87,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=1, value=\\"Fresh styles just landed. Be the first to explore.\\"","outcome":"success"},{"t":18.05,"tool":"createPlan","request":"Create plan (localeVersion=1): \\"Rewrite all text fields (headline and...\\"","response":"✓ Plan created: 6d74bf0f...","outcome":"success"},{"t":31.83,"tool":"appendPlanAction","request":"Append action to plan 6d74bf0f...","response":"✓ Action appended","outcome":"success"},{"t":31.83,"tool":"appendPlanAction","request":"Append action to plan 6d74bf0f...","response":"✓ Action appended","outcome":"success"},{"t":31.83,"tool":"appendPlanAction","request":"Append action to plan 6d74bf0f...","response":"✓ Action appended","outcome":"success"},{"t":31.84,"tool":"appendPlanAction","request":"Append action to plan 6d74bf0f...","response":"✓ Action appended","outcome":"success"},{"t":31.84,"tool":"appendPlanAction","request":"Append action to plan 6d74bf0f...","response":"✓ Action appended","outcome":"success"},{"t":31.83,"tool":"appendPlanAction","request":"Append action to plan 6d74bf0f...","response":"✓ Action appended","outcome":"success"},{"t":34.89,"tool":"applyPlan","request":"Apply plan 6d74bf0f...","response":"⚠️ 409 Conflict — current version is 2","outcome":"failed"},{"t":41.23,"tool":"getLatestBlockText","request":"Read card-1/headline","response":"✓ version=2, value=\\"Hey, welcome to our store! 🎉\\"","outcome":"success"},{"t":41.23,"tool":"getLatestBlockText","request":"Read card-1/body","response":"✓ version=2, value=\\"Dig into our freshest premium picks — something aw\\"","outcome":"success"},{"t":41.23,"tool":"getLatestBlockText","request":"Read card-2/headline","response":"✓ version=2, value=\\"What everyone\\"","outcome":"success"},{"t":41.23,"tool":"getLatestBlockText","request":"Read card-2/body","response":"✓ version=2, value=\\"Find out what fellow shoppers can\\"","outcome":"success"},{"t":41.23,"tool":"getLatestBlockText","request":"Read card-3/headline","response":"✓ version=2, value=\\"Just dropped this week 🆕💫\\"","outcome":"success"},{"t":41.23,"tool":"getLatestBlockText","request":"Read card-3/body","response":"✓ version=2, value=\\"Hot new styles just landed — be the first to snag \\"","outcome":"success"},{"t":47.33,"tool":"createPlan","request":"Create plan (localeVersion=2): \\"Rewrite all text fields (headline and...\\"","response":"✓ Plan created: ccd48ae1...","outcome":"success"},{"t":60.88,"tool":"appendPlanAction","request":"Append action to plan ccd48ae1...","response":"✓ Action appended","outcome":"success"},{"t":60.88,"tool":"appendPlanAction","request":"Append action to plan ccd48ae1...","response":"✓ Action appended","outcome":"success"},{"t":60.88,"tool":"appendPlanAction","request":"Append action to plan ccd48ae1...","response":"✓ Action appended","outcome":"success"},{"t":60.89,"tool":"appendPlanAction","request":"Append action to plan ccd48ae1...","response":"✓ Action appended","outcome":"success"},{"t":60.89,"tool":"appendPlanAction","request":"Append action to plan ccd48ae1...","response":"✓ Action appended","outcome":"success"},{"t":60.88,"tool":"appendPlanAction","request":"Append action to plan ccd48ae1...","response":"✓ Action appended","outcome":"success"},{"t":63.36,"tool":"applyPlan","request":"Apply plan ccd48ae1...","response":"✓ Plan applied successfully","outcome":"success"}],"assertions":[{"evaluator":"DbFieldContains(blocks.0.contents.headline.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Hey, welcome to our Summer Sale — 30% Off Everything! 🎉\\""},{"evaluator":"DbFieldMatchesRegex(blocks.0.contents.headline.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Hey, welcome to our Summer Sale — 30% Off Everything! 🎉\\""},{"evaluator":"DbFieldContains(blocks.0.contents.body.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Dig into our freshest premium picks at 30% off this summer — something awesome i\\""},{"evaluator":"DbFieldMatchesRegex(blocks.0.contents.body.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Dig into our freshest premium picks at 30% off this summer —\\""},{"evaluator":"DbFieldContains(blocks.1.contents.headline.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"What everyone\'s obsessing over — now 30% off this summer! 😍\\""},{"evaluator":"DbFieldMatchesRegex(blocks.1.contents.headline.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"What everyone\'s obsessing over — now 30% off this summer! 😍\\""},{"evaluator":"DbFieldContains(blocks.1.contents.body.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Find out what fellow shoppers can\'t stop raving about this season, all at 30% of\\""},{"evaluator":"DbFieldMatchesRegex(blocks.1.contents.body.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Find out what fellow shoppers can\'t stop raving about this s\\""},{"evaluator":"DbFieldContains(blocks.2.contents.headline.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Just dropped this week — grab it at 30% off! 🆕💫\\""},{"evaluator":"DbFieldMatchesRegex(blocks.2.contents.headline.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Just dropped this week — grab it at 30% off! 🆕💫\\""},{"evaluator":"DbFieldContains(blocks.2.contents.body.value)","passed":true,"detail":"substring=\\"30%\\", actual=\\"Hot new styles just landed at 30% off — be the first to snag \'em! 👀🛍️\\""},{"evaluator":"DbFieldMatchesRegex(blocks.2.contents.body.value)","passed":true,"detail":"pattern=\\"[\\\\U0001f300-\\\\U0001f9ff\\\\u2600-\\\\u26ff\\\\u2700-\\\\u27bf]\\", actual=\\"Hot new styles just landed at 30% off — be the first to snag\\""},{"evaluator":"DbVersionCountAtLeast(conc-camp)","passed":true,"detail":"min=3, actual=3"}]}]'),aA={timestamp:nA,cases:sA},tv={title:"Concurrent Agent Updates",date:"2026-07-22",outcome:"ongoing",summary:"Can two agents edit the same campaign concurrently without losing each other's work? A multi-agent evaluation suite that stress-tests read-modify-write and plan-based mutation approaches."};function rf(e){const t={code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"When two agents modify the same campaign at the same time, one of them loses. Agent A reads the headline, rewrites it. Agent B reads the same headline a moment later, rewrites it differently. Agent B's write lands second and erases Agent A's work. Neither agent knows it happened."}),`
`,c(t.p,{children:`This is the standard lost-update problem, but with a twist: the agents are not humans refreshing a browser. They operate in seconds, they don't read visual diffs, and they cannot "notice" that something changed between their read and their write. If the API does not protect them, they will silently overwrite each other every time.`}),`
`,c(t.p,{children:"We needed to know which combinations of mutation strategy and backend design survive concurrent access, and which ones silently corrupt data."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:[c(t.strong,{children:"Non-overlapping edits should always succeed."})," If Agent A edits block 1 and Agent B edits block 2, both changes should land regardless of timing or approach."]}),`
`,c(t.li,{children:[c(t.strong,{children:"Optimistic locking (version-based 409 rejection + retry) is sufficient for same-field conflicts."})," We do not need pessimistic locks or distributed transactions if the agent can retry on conflict."]}),`
`,c(t.li,{children:[c(t.strong,{children:"The plan workflow has a wider conflict window than direct mutation."})," Because plan-create reads state, then plan-apply writes it later, the gap between read and write is larger, making conflicts more likely without locking."]}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Non-overlapping edits pass trivially with every approach. The baseline works."}),`
`,c(t.li,{children:"Direct read-modify-write on the same field is last-writer-wins without locking."}),`
`,c(t.li,{children:"Plan-based approaches also fail without locking — the plan workflow does not inherently protect against conflicts."}),`
`,c(t.li,{children:"Non-overlapping edits pass trivially with every approach. The baseline works."}),`
`,c(t.li,{children:"Without locking, same-field is last-writer-wins. Direct and plan-based approaches both fail when there's no version check."}),`
`,c(t.li,{children:"Optimistic locking solves concurrent edits across all approaches. With 409 on version conflict + retry, all locking variants pass — direct, plan-vs-direct, and plan-vs-plan — on both same-field appends and multi-field rewrites."}),`
`,c(t.li,{children:"The key to correct retry: re-read content, not just version. When the agent gets a 409, it must re-read the current text (which now includes the other agent's changes) and build its edit on top of that."}),`
`,c(t.li,{children:["The backend must tolerate path/body format variation. Agents constructing plan actions may produce path variants (",c(t.code,{children:"/texts/id"}),", ",c(t.code,{children:"/editables/id/text"}),", ",c(t.code,{children:"/text/id"}),") and body-key variants (",c(t.code,{children:"value"})," vs ",c(t.code,{children:"text"}),"). A robust plan-apply handler normalises these."]}),`
`]}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:"Optimistic locking + content-aware retry prompts is a reliable concurrency strategy for multi-agent access — both for direct mutations and plan-based workflows. The backend should validate versions strictly but parse action formats permissively."}),`
`,c(t.p,{children:"The evaluation suite itself is reusable. Any new mutation approach or backend variant can be added to the matrix and tested against the same scenarios."}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:"We structured the evaluation as a use-case × approach matrix:"}),`
`,c(t.p,{children:[c(t.strong,{children:"Use cases"})," (the what):"]}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:[c(t.code,{children:"non-overlap"})," — two agents edit different blocks"]}),`
`,c(t.li,{children:[c(t.code,{children:"same-field"})," — two agents edit the same block and field"]}),`
`,c(t.li,{children:[c(t.code,{children:"multi-field-rewrite"})," — two agents rewrite all fields across 3 blocks with different creative intents"]}),`
`]}),`
`,c(t.p,{children:[c(t.strong,{children:"Approaches"})," (the how):"]}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:[c(t.code,{children:"direct"})," — raw read-modify-write mutations"]}),`
`,c(t.li,{children:[c(t.code,{children:"plan-vs-direct"})," — one agent uses plan workflow, the other uses direct"]}),`
`,c(t.li,{children:[c(t.code,{children:"plan-vs-plan"})," — both use plan workflow"]}),`
`,c(t.li,{children:[c(t.code,{children:"optimistic-locking"})," — direct mutations with version-aware 409 rejection"]}),`
`,c(t.li,{children:[c(t.code,{children:"plan-vs-direct-locking"})," / ",c(t.code,{children:"plan-vs-plan-locking"})," — plan workflow with version-aware backend"]}),`
`]}),`
`,c(t.p,{children:"Each combination runs against an isolated backend instance with a fresh database seed. Both agents start simultaneously and race to completion. After both finish, evaluators assert that both agents' contributions are present in the final state."}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.h3,{children:"The evaluation suite"}),`
`,c(t.p,{children:["A Python runner (",c(t.code,{children:"runners/concurrent_updates.py"}),") that:"]}),`
`,c(t.ol,{children:[`
`,c(t.li,{children:"Resolves the YAML matrix into flat case definitions"}),`
`,c(t.li,{children:"Seeds a fresh MongoDB per case"}),`
`,c(t.li,{children:"Launches two PydanticAI agents concurrently against the shared backend"}),`
`,c(t.li,{children:"Collects tool-call traces with timestamps"}),`
`,c(t.li,{children:"Runs evaluator assertions against the final DB state"}),`
`,c(t.li,{children:"Produces a JSON results file with traces, assertions, and timings"}),`
`]}),`
`,c(t.h3,{children:"The timeline visualization"}),`
`,c(t.p,{children:"Each case renders an operation timeline showing exactly when each agent made its API calls. Blue dots are reads, green dots are successful writes, red dots are failed writes (409 conflicts). Hover for details."}),`
`,c(tA,{data:aA})]})}function iA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(rf,{...e})}):rf(e)}const oA=Object.freeze(Object.defineProperty({__proto__:null,default:iA,frontmatter:tv},Symbol.toStringTag,{value:"Module"})),nv={title:"Council",date:"2025-05-06",outcome:"finished",summary:"Multi-persona deliberation — conferring with several historical thinkers to stress-test framing."};function lf(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"When the available information is conflicting, or when we just want a second opinion before committing to a direction, finding one expert (let alone several) takes real effort. Networking, scheduling, framing the question well enough that the expert can give a useful answer."}),`
`,c(t.p,{children:"For the small calls, we usually don't bother. The networking cost outweighs the value of the input, so we decide alone. Most of the small calls are fine. Some of them aren't, and we only find out months later."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"AI can stand in for the second-opinion role on a much wider range of decisions than a human expert can. Not a replacement for a real domain expert on critical calls, but an easy way to surface other points of view and to stress-test our own thinking before we commit."}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:["The council is most useful not as a standalone opinion generator, but as a reducer on top of multiple ",c(t.a,{href:"/experiments/deep-research",children:"deep research"})," results. Four research reports covering 30+ approaches across 20+ domains is too much to hold in your head. Feeding them into the council compresses the volume into a prioritized verdict with clear dissent markers."]}),`
`,c(t.li,{children:'The multi-persona format forces the model to argue with itself. When Feynman says "you could build this in a week" and Aristotle says "the ontological classification matters", the tension is productive. Neither voice alone would have surfaced both the simplicity argument and the structural one.'}),`
`,c(t.li,{children:"The output structure (unresolved questions, phased recommendations, points of disagreement, minority report) is more useful than a single recommendation. It maps the decision space rather than collapsing it prematurely."}),`
`,c(t.li,{children:"A council verdict ages well as a reference document. Months later you can revisit it and check: did we follow the phased approach? Was the dissent correct? Did the predicted conflict rate match reality?"}),`
`]}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:["See ",c(t.a,{href:"/experiments/deep-research",children:"Deep Research"}),'. The council sits downstream of deep research in the workflow. Deep research produces volume and breadth; the council produces synthesis and prioritization. Together they replace the "senior architect reads everything and makes a call" bottleneck.']}),`
`,c(t.p,{children:"Any team member can run both. The research doesn't require domain expertise to launch, and the council doesn't require facilitation skills to operate."}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:["We used ",c(t.a,{href:"https://github.com/0xNyk/council-of-high-intelligence",children:"Council of High Intelligence"}),", an open-source multi-persona deliberation framework. It assembles a panel of historical thinkers (configurable per session), routes the input through each persona, and produces a structured verdict with consensus, disagreement, and minority reports."]}),`
`,c(t.p,{children:"The key insight is the input. We don't ask the council a cold question. We feed it the full output of one or more deep research sessions and ask it to synthesize. The council's job is not to research; it's to adjudicate between competing findings that research already surfaced."}),`
`,c(t.p,{children:"The persona composition matters. For our architectural decision we used Aristotle (categorization), Ada Lovelace (formal systems), and Feynman (first-principles simplicity). Different problem types want different panels. A product direction question might use different voices than a technical architecture one."}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.h3,{children:"The workflow: deep research → council"}),`
`,c(t.p,{children:"The concrete workflow for the change delegation architecture decision:"}),`
`,c(t.ol,{children:[`
`,c(t.li,{children:["Ran four separate deep research sessions, each exploring a different angle of the same problem. Total output: ~2200 lines across four reports.",`
`,c(t.ul,{children:[`
`,c(t.li,{children:[c(t.code,{children:"change-delegation-concepts.deep-research.md"})," (general approaches)"]}),`
`,c(t.li,{children:[c(t.code,{children:"change-delegation-similar-problems-report.deep-research.md"})," (analogous systems)"]}),`
`,c(t.li,{children:[c(t.code,{children:"change-delegation-via-git-models.deep-research.md"})," (version control patterns)"]}),`
`,c(t.li,{children:[c(t.code,{children:"cross-industry-change-delegation-analogies.deep-research.md"})," (automotive, pharma, CMS)"]}),`
`]}),`
`]}),`
`,c(t.li,{children:'Fed all four reports into the council as context, with the question: "which approach should we pursue?"'}),`
`,c(t.li,{children:"The council produced a phased verdict with clear stop-conditions at each phase."}),`
`]}),`
`,c(t.p,{children:["The raw output lives at ",c(t.a,{href:"/raw/ViktorSomodi/change-delegation-research/research-results/council-opinion-on-research.council.md",children:"raw/ViktorSomodi/change-delegation-research/research-results/council-opinion-on-research.council.md"}),"."]}),`
`,c(t.h3,{children:"What the verdict gave us"}),`
`,c(t.p,{children:"The council reduced 30+ approaches from the research into a single phased plan: stable block IDs first, then a block-level diff engine, then plan-and-apply delegation UI. It explicitly rejected CRDTs, operational transformation, and continuous inheritance as wrong-genus solutions for our problem."})]})}function rA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(lf,{...e})}):lf(e)}const lA=Object.freeze(Object.defineProperty({__proto__:null,default:rA,frontmatter:nv},Symbol.toStringTag,{value:"Module"})),sv={title:"Crazy 8",date:"2025-05-06",outcome:"finished",summary:"Eight-up sketching session to generate divergent UI ideas under time pressure."};function cf(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:`Crazy 8 is a rapid, core brainstorming and sketching exercise that challenges you to generate eight distinct ideas in eight minutes. You grab a sheet, fold it 3 times, to get 8 sections, and sketch eight ideas each in one minute. After the group finishes, everybody walks the others through their ideas. The time pressure forces you past the obvious first idea.
This technique is widely used in tech and design to rapidly sketch user interfaces, product features, or website landing pages before committing to wireframes.`}),`
`,c(t.p,{children:"However, this technique not great for everyone. Compressing an idea into a 2D sketch is its own skill. People who can't draw lose half the room before they've shown anything, and the ideas die with the sketch. Also if someone has ideas related to architecture, those get lost as well."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"AI image and UI generation has crossed the threshold where it can visualise ideas better than most of us can sketch them in 2D. Mockups, slide decks, even interactive prototypes from a one-line prompt."}),`
`,c(t.li,{children:"Removing the drawing bottleneck does two things at once: people who couldn't sketch get into the room, and the people who could sketch can iterate on a rendered version instead of the doodle."}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"One hour, six people, eight prototypes each. 48 visual artifacts total. Every single one communicated its idea more clearly than a paper sketch would have, because the viewer could see (and sometimes click) the actual interaction, not a symbolic representation of it."}),`
`,c(t.li,{children:"The range of output formats was wider than expected. Some people produced slide-deck presentations, others built fully interactive HTML with clickable state transitions. Nobody was limited by their drawing ability."}),`
`,c(t.li,{children:"Presenting became easier. In traditional crazy8, half the time goes to explaining what the sketch is supposed to show. Here, the prototype showed itself. Walk-throughs were faster and the feedback was about the idea, not about decoding the drawing."}),`
`,c(t.li,{children:"The time pressure still matters. One hour is generous compared to the original eight minutes, but it's still tight enough that people don't over-polish. Most of the prototypes were rough in the right way: clear concept, no pixel-perfection."}),`
`]}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:["See ",c(t.a,{href:"/experiments/clickable-concept",children:"Clickable Concept"}),". The crazy8 variant feeds directly into the clickable prototype workflow. Where clickable-concept focuses on refining one idea to stakeholder-ready fidelity, this technique generates the divergent pool of ideas to pick from."]}),`
`,c(t.p,{children:"Any product team can run this. No UX designer required for the ideation phase. The only prerequisite is access to an LLM that can generate HTML or images from a prompt."}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:"Same structure as the original crazy8: fixed time box, fixed number of outputs, present everything at the end. The only substitution is the medium. Instead of pen on paper, participants use whatever AI tool they're comfortable with (Claude artifacts, Lovable, v0, Cursor) to produce visual explanations of their ideas."}),`
`,c(t.p,{children:"We gave one hour instead of eight minutes. The original time pressure exists to prevent overthinking, not to produce quality output. With AI tools, the bottleneck isn't hand speed but prompt iteration. One hour turned out to be the right balance: enough to try two or three prompt variations per idea, not enough to gold-plate anything."}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.h3,{children:"The session: 6 × 8 prototypes for change delegation UX"}),`
`,c(t.p,{children:"We ran the session on the change delegation problem: how should the UI handle propagating template changes to locale-specific content. Six participants, one hour, eight ideas each."}),`
`,c(t.p,{children:["The raw outputs live under ",c(t.code,{children:"raw/<person>/"})," in the knowledge base. Three examples of the range:"]}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:[c(t.a,{href:"/raw/VicaBarta/crazy8%20claude.html",children:"VicaBarta/crazy8 claude.html"}),". An HTML presentation generated as a Claude artifact. Eight slides, each a different UX concept: propagation matrix, stale field spotlight, conflict cards, visual preview panels, locale health dashboard, field lock toggles, a linear wizard, and a diff timeline."]}),`
`,c(t.li,{children:[c(t.a,{href:"/raw/ViktorSomodi/crazy8/",children:"ViktorSomodi/crazy8/"}),". A Marp markdown presentation with SVG illustrations. More technical in focus: triggering delegation, receiving delegation, state management, patch-based approaches, edge cases, template versioning."]}),`
`,c(t.li,{children:[c(t.a,{href:"/raw/MihalyHunyady/2026-05-07-context8/",children:"MihalyHunyady/2026-05-07-context8/"}),". A fully interactive HTML page with tab navigation. Nine approaches ranging from an IntelliJ-style three-way merge to a sci-fi terminal to a change-delegation RPG. Clickable state transitions, reset buttons, working UI chrome."]}),`
`]}),`
`,c(t.p,{children:"The variety is the point. Same problem, same time box, wildly different lenses. The traditional crazy8 would have produced 48 rectangles with arrows. This produced 48 things you can open in a browser and immediately understand."})]})}function cA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(cf,{...e})}):cf(e)}const uA=Object.freeze(Object.defineProperty({__proto__:null,default:cA,frontmatter:sv},Symbol.toStringTag,{value:"Module"})),av={title:"Deep Research",date:"2025-05-06",outcome:"finished",summary:"Use AI to do the long-running, multi-source research that used to take a human a week, and do it better than we could on our own."};function uf(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"Real research is slow. A serious technical investigation, the kind that drives an architecture decision or a product direction, takes days. Sometimes a week or two. Read enough sources, follow the citations, find the dissenting view, write it up, share it, get challenged, go back and find more."}),`
`,c(t.p,{children:"The discipline around it isn't new. Source triangulation, citation chains, adversarial review, separating claims from evidence. The standards exist. They just don't fit into a Tuesday afternoon. And research isn't only useful for product decisions: picking a database, comparing two queue systems, evaluating a new auth pattern, all benefit from the same discipline."}),`
`,c(t.p,{children:["Recent papers say AI agents can do this kind of research as well as a human, sometimes better. The ",c(t.a,{href:"https://arxiv.org/abs/2506.11763",children:"DeepResearch Bench paper"})," (arXiv 2506.11763, June 2025) put 100 PhD-level research tasks in front of every major deep-research agent and scored the outputs against expert references. Top systems land 40-50 on the RACE framework. Not perfect, but good enough that it changes what's worth a human's time."]}),`
`,c(t.p,{children:["It's also a long-running task. A standard run takes 5-10 minutes, deep mode takes 20-45. That makes it the prototypical use case for ",c(t.a,{href:"/experiments/secure-development",children:"Secure Development"}),": you don't want a research agent with 30 minutes of unattended runtime poking around your prod credentials."]}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"A deep-research agent inside our sandbox lets anyone on the team launch a real research session with a one-line prompt."}),`
`,c(t.li,{children:"The result is at least as good as what a focused human could produce in a day, comes out in a shareable shape, and saves us from writing it up ourselves."}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Deep research isn't faster. The reading and understanding step doesn't shrink. What changes is depth: the same wall-clock effort buys a much broader, multi-source, multi-angle report."}),`
`,c(t.li,{children:"LLMs are biased by how the question is phrased. Phrase it one way and the agent leans one direction, phrase it the opposite way and it leans the other."}),`
`,c(t.li,{children:"The fix is process, not prompts: never run a single pass. Either instruct the agent up front to investigate from multiple angles (pro and con, optimistic and skeptical, vendor and critic), or kick off several runs from deliberately different framings and merge afterwards."}),`
`,c(t.li,{children:["For the merging and deciding step, the ",c(t.a,{href:"/experiments/council",children:"Council"})," helps a lot — reading the contradictions through several historical thinkers surfaces which disagreement actually matters."]}),`
`,c(t.li,{children:"The skill we use is fine, not state of the art. Building something that competes with Perplexity Deep Research or OpenAI Deep Research is feasible from the recent literature (multi-agent retrieval, structured evidence persistence, critique loop-backs), but the team stuck with the existing skill for now."}),`
`]}),`
`,c("aside",{class:"note",children:c(t.p,{children:[c(t.strong,{children:"Note."})," The bias claim isn't just our experience. ",c(t.a,{href:"https://www.science.org/doi/10.1126/sciadv.adz2924",children:"Source framing triggers systematic bias in large language models"})," (Science Advances) shows that subtle changes in prompt wording move the model's output in measurable ways, and ",c(t.a,{href:"https://arxiv.org/html/2601.08785v1",children:"Uncovering Political Bias in LLMs"})," finds the same effect from lexical and syntactic framing."]})}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:"This tool, or any equivalent easy way to run deep research, is a must for the whole organization. Devs, PMs, UX, anyone who has to make a decision based on more than what they already remember."}),`
`,c(t.p,{children:["Combined with ",c(t.a,{href:"/experiments/llm-usage-foundation",children:"LLM Usage Foundation"}),", every research run also leaves a trace. We can see how much each session cost, what it touched, and whether the answer was used. Over time that lets us tune."]}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:["We use the ",c(t.a,{href:"https://github.com/199-biotechnologies/claude-deep-research-skill",children:"claude-deep-research-skill"})," by 199-biotechnologies. It's a Claude Code skill that ships an 8-phase pipeline (scope, plan, retrieve, triangulate, outline, synthesize, critique, package), structured evidence handling, source-credibility scoring, and HTML/PDF report assembly. An okayish implementation: not state of the art, but the cheapest way to get respectable deep research on demand without building anything ourselves."]}),`
`,c(t.p,{children:["The advantage over hosted services like Perplexity or ChatGPT Deep Research is that the skill runs in our environment. It can read our codebase, query our knowledge base, follow links into our internal docs, and output Markdown into a folder we control. Hosted services can't reach any of that. The trade is that we own the search backend, but with ",c(t.a,{href:"/experiments/secure-development#for-controlled-web-access-search-and-fetch-services",children:"SearXNG"})," running locally that's a solved problem."]}),`
`,c(t.p,{children:"It's also trivial to call programmatically. One sandboxxer command kicks off a research run that writes the Markdown and HTML reports into the mounted output folder and exits, which makes it good for cron, CI, or just firing off a few investigations before lunch:"}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:["sandboxxer run --profile deep-research -p ",c(t.span,{className:"hljs-string",children:'"Compare PostgreSQL and ClickHouse for time-series workloads in our usage volume"'}),`
`]})}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.p,{children:"We package the skill together with our search and observability stack into a single sandbox profile. Anyone in the team types one command and gets a working deep-research environment."}),`
`,c(t.p,{children:"The shape:"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"A sandboxxer profile that mounts an output folder, installs the deep-research skill, sets up SearXNG access, and runs in pi or Claude Code."}),`
`,c(t.li,{children:"A neutralised default prompt template that nudges the agent to triangulate across opposing framings instead of running a single biased pass."}),`
`,c(t.li,{children:["Telemetry on by default (",c(t.a,{href:"/experiments/llm-usage-foundation",children:"LLM Usage Foundation"}),") so every research session leaves a trace, including cost."]}),`
`,c(t.li,{children:["Outputs in a known folder structure (",c(t.code,{children:"~/Documents/deep-research/YYYY-MM-DD-<topic-slug>/"}),") so the reports survive the sandbox lifecycle and can be cited later from the wiki."]}),`
`]}),`
`,c(t.h3,{children:"Claude Code as the orchestrator"}),`
`,c(t.p,{children:`Because sandboxxer is a CLI, Claude Code itself can drive it. We can have a normal conversation with Claude Code about a topic ("how should I split the question of 'is moving to event-driven architecture worth it for us'?") and let it propose three or four research angles. Then it spins up sandboxxer for each angle, waits for the reports, and walks us through the merging step itself.`}),`
`,c(t.p,{children:"This turns the host Claude Code session into the planning and synthesis layer, and the sandbox into the execution layer. The host stays cheap and conversational; the sandbox does the long, expensive runs in the background."}),`
`,c(t.h3,{children:"A Raycast extension to skip the terminal"}),`
`,c(t.p,{children:["Dropping into a terminal to type ",c(t.code,{children:"sandboxxer run"})," is fine, but it's still friction. We wrote a small Raycast extension on top of sandboxxer so the whole thing happens in the launcher."]}),`
`,c("img",{src:"/experiments/deep-research/raycast-start.png",alt:"Raycast extension form: Research Topic input, Mode dropdown set to Ultra Deep, and a 'How it works' note that reads 'Launches a sandboxxer deep-research session in the background. The agent will research the topic and save a report to ~/Documents/deep-research/. Check Research History to monitor progress.'"}),`
`,c(t.p,{children:"A second view shows the history of past runs with one click to open the rendered HTML report."}),`
`,c("img",{src:"/experiments/deep-research/raycast-history.png",alt:"Raycast Research History list: dated entries like 'Hungary Climate Crops', 'Karpathy Wiki', 'AI Future Debate' with HTML+MD or MD-only badges and an 'Open HTML Report' action."}),`
`,c(t.p,{children:"Same sandbox underneath. Same telemetry. The only difference is the launcher: ⌘-Space, type a topic, hit enter."})]})}function dA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(uf,{...e})}):uf(e)}const hA=Object.freeze(Object.defineProperty({__proto__:null,default:dA,frontmatter:av},Symbol.toStringTag,{value:"Module"})),iv={title:"Domain Agent",date:"2025-05-29",outcome:"ongoing",summary:"A reusable agent pattern scoped to a single business domain — its capabilities, intents, and contracts declared on an agent card."};function df(e){const t={h2:"h2",li:"li",p:"p",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"In an AI-native version of Emarsys, almost every business domain will need an agent (or several) that can act inside that domain. Authoring those agents one by one, by hand, doesn't scale: every team would re-invent the same harness, the same orchestration patterns, the same observability glue."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"There's a high-level mental model that fits almost every domain agent: same lifecycle, same capability declaration, same intent surface, same boundaries. The differences live in the domain itself, not in the shape of the agent."}),`
`,c(t.li,{children:"If we get spec-driven development right, the agent for a domain follows from the specification of that domain. The specification is the agent's contract."}),`
`,c(t.li,{children:"Given a complete-enough spec, an agent can be generated from it almost 100%, leaving humans to write the domain logic, not the harness around it."}),`
`]})]})}function fA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(df,{...e})}):df(e)}const pA=Object.freeze(Object.defineProperty({__proto__:null,default:fA,frontmatter:iv},Symbol.toStringTag,{value:"Module"})),ov={title:"Knowledge base",date:"2025-05-06",outcome:"ongoing",summary:"A curated wiki of pages, sources, and synthesis to anchor every decision in something we can cite."};function hf(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:`Plenty of work can't be handed over to agents because it requires tribal knowledge. The unwritten rules, the historical context, the "why we don't do X anymore" that lives only in people's heads. When a new developer joins a team, they pick that up over months from Slack threads, hallway conversations, paired sessions, and the occasional outdated wiki page.`}),`
`,c(t.p,{children:["We don't have the documentation or the ",c(t.a,{href:"/experiments/spec-driven-development",children:"specifications"})," that would carry this for us. So when we want an agent to help, either it's missing critical context, or we end up re-explaining the same context for every new prompt."]}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:["With the right pieces in place (",c(t.a,{href:"/experiments/meeting-recordings",children:"meeting recordings"}),", ",c(t.a,{href:"/experiments/spec-driven-development",children:"spec-driven development"}),", the knowledge base itself), we can capture this tribal knowledge as it's generated, instead of having to write it down separately. The knowledge base grows alongside the work, and every later AI step gets to use it."]}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"There's a spectrum of approaches, each with different trade-offs. We explored four: RAG (embedding + vector search), agentic search (agent decides what to look up), Karpathy-style wiki (LLM-maintained interlinked pages), and a knowledge engine (structured extraction into typed stores). No single approach wins everywhere."}),`
`,c(t.li,{children:"Human readability matters more than we expected. RAG and agentic search produce good answers but their intermediate state is opaque. Nobody can browse a vector database. The wiki approach trades some scalability for pages you can actually read, link, and review."}),`
`,c(t.li,{children:"The wiki approach works well up to hundreds of pages. Beyond that, retrieval needs help. Combining the wiki with a local embedding index (qmd) gives both: human-readable pages for browsing, and semantic search for finding things when you don't know where to look."}),`
`,c(t.li,{children:"Structured extraction (knowledge engine) shines for specific query patterns. Recipes to ingredients, meeting notes to action items, transcripts to decisions. The upfront cost is defining evaluation pairs, but once they pass, the queries are fast and precise."}),`
`,c(t.li,{children:"Everything runs locally. No API calls for search, no data leaves the machine. The embedding models (via qmd) are local GGUF files, the wiki is markdown in git, the structured stores are SQLite."}),`
`,c(t.li,{children:'Keyword search and semantic search complement each other. "auth" matches "auth" with keywords, but "login flow" matches "authentication process" only with embeddings. The best retrieval combines both.'}),`
`]}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:"Any team that wants agents to work with internal context needs some form of knowledge base. The approaches we explored are stackable: start with a wiki for the domain knowledge, add qmd for retrieval at scale, add a knowledge engine for structured queries against specific data types."}),`
`,c(t.p,{children:"The workshop format (presentations + hands-on exercises) turned out to be a good way to teach these concepts across roles. Non-technical team members built working wikis and ran semantic search queries within the same session."}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:"We framed the problem as a progression of four techniques, each building on the previous."}),`
`,c(t.h3,{children:"Embedding + RAG"}),`
`,c(t.p,{children:"The baseline. Turn documents into vectors (arrays of numbers that capture meaning), find the closest ones to a query, feed them to an LLM as context."}),`
`,c("img",{src:"/experiments/knowledge-base/rag-flow.svg",alt:"RAG flow: document → chunk → embed → store vectors; query → embed → find nearest → feed to LLM → answer."}),`
`,c(t.p,{children:`The core idea: similar meanings produce similar vectors. "cat" and "dog" end up close in vector space, "cat" and "car" don't. Cosine similarity measures the distance. Documents get chunked (~900 tokens, 15% overlap) so each piece is searchable independently.`}),`
`,c(t.p,{children:"In practice you need more than a naive lookup. Query decomposition breaks complex questions into sub-queries, query expansion adds synonyms, and a reranker re-scores candidates with a cross-attention model for precision."}),`
`,c("img",{src:"/experiments/knowledge-base/rag-flow-enhanced.svg",alt:"Enhanced RAG flow with query decomposition, expansion, and reranking stages between the query and the final answer."}),`
`,c(t.h3,{children:"Agentic search"}),`
`,c(t.p,{children:"Instead of a fixed retrieval pipeline, let the agent decide what to look up and iterate. The agent reads results, decides if it has enough, asks follow-up questions, and searches again until satisfied."}),`
`,c("img",{src:"/experiments/knowledge-base/agentic-flow.svg",alt:"Agentic search flow: agent receives query, decides what to search, reads results, iterates or answers."}),`
`,c(t.p,{children:"When the agent has access to a knowledge base, it can ground its search in existing context:"}),`
`,c("img",{src:"/experiments/knowledge-base/agentic-flow-knowledge.svg",alt:"Agentic search flow with knowledge base: agent queries both external sources and internal knowledge, combines results."}),`
`,c(t.h3,{children:"Karpathy wiki"}),`
`,c(t.p,{children:["An LLM maintains a set of interlinked markdown pages. The structure is simple: a flat folder of slug-named pages, an index, a log, and an overview. Sources go into ",c(t.code,{children:"raw/"}),", synthesized knowledge goes into ",c(t.code,{children:"wiki/pages/"}),"."]}),`
`,c("img",{src:"/experiments/knowledge-base/karpathy-wiki-flow.svg",alt:"Karpathy wiki flow: ingest sources into raw/, LLM creates and updates interlinked wiki pages, query reads pages and synthesizes answers with citations."}),`
`,c(t.p,{children:["Four operations: ",c(t.strong,{children:"ingest"})," (add new source material), ",c(t.strong,{children:"query"})," (ask questions against the wiki), ",c(t.strong,{children:"lint"})," (health audit for contradictions, orphans, gaps), and ",c(t.strong,{children:"update"})," (revise pages when knowledge changes)."]}),`
`,c(t.h3,{children:"Knowledge engine"}),`
`,c(t.p,{children:"Extract structured data from raw inputs into typed stores (JSON, SQLite). Instead of free-text pages, you get queryable fields: ingredients, prep time, calories from recipes; action items, owners, deadlines from meeting notes."}),`
`,c("img",{src:"/experiments/knowledge-base/knowledge-engine-flow.svg",alt:"Knowledge engine flow: raw input → parser extracts structured data → typed store; use-case-specific query language on top."}),`
`,c(t.p,{children:"Each use case has two parts: a parser (extracts structured data) and a query interface. The agent builds both by iterating against evaluation pairs (question → expected answer) until they pass."}),`
`,c("img",{src:"/experiments/knowledge-base/example-meeting.svg",alt:"Example: recipe input is parsed into ingredients, prep time, and calories; queries like 'what can I cook in 20 min' hit the structured store directly."}),`
`,c(t.h3,{children:"Comparison"}),`
`,c(t.p,{children:"The trade-offs across all four approaches:"}),`
`,c(t.table,{children:[c(t.thead,{children:c(t.tr,{children:[c(t.th,{}),c(t.th,{children:"RAG"}),c(t.th,{children:"Agentic Search"}),c(t.th,{children:"Karpathy Wiki"}),c(t.th,{children:"Knowledge Engine"})]})}),c(t.tbody,{children:[c(t.tr,{children:[c(t.td,{children:"Speed"}),c(t.td,{children:"Fast"}),c(t.td,{children:"Slow"}),c(t.td,{children:"Medium"}),c(t.td,{children:"Fast"})]}),c(t.tr,{children:[c(t.td,{children:"Complexity"}),c(t.td,{children:"High"}),c(t.td,{children:"Medium"}),c(t.td,{children:"Low"}),c(t.td,{children:"Medium"})]}),c(t.tr,{children:[c(t.td,{children:"Performance"}),c(t.td,{children:"Good"}),c(t.td,{children:"Best"}),c(t.td,{children:"Great"}),c(t.td,{children:"Best"})]}),c(t.tr,{children:[c(t.td,{children:"Human readable"}),c(t.td,{children:"No"}),c(t.td,{children:"No"}),c(t.td,{children:"Yes"}),c(t.td,{children:"Possible"})]}),c(t.tr,{children:[c(t.td,{children:"Flexibility"}),c(t.td,{children:"Low"}),c(t.td,{children:"High"}),c(t.td,{children:"Medium"}),c(t.td,{children:"Medium"})]}),c(t.tr,{children:[c(t.td,{children:"Scalability"}),c(t.td,{children:"100K+ docs"}),c(t.td,{children:"~Infinite"}),c(t.td,{children:"Hundreds"}),c(t.td,{children:"Thousands"})]}),c(t.tr,{children:[c(t.td,{children:"Manual work"}),c(t.td,{children:"Small"}),c(t.td,{children:"Small"}),c(t.td,{children:"High"}),c(t.td,{children:"Small"})]})]})]}),`
`,c(t.p,{children:"We ran a hands-on workshop where participants tried all four. The materials included deep research reports, a blood test result, and a set of recipes as exercise inputs."}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.h3,{children:"Wiki skills"}),`
`,c(t.p,{children:["A set of agent skills (init, ingest, query, lint, update, audit) that implement the Karpathy wiki pattern. Any agent can bootstrap a wiki from a ",c(t.code,{children:"SCHEMA.md"})," file, ingest sources into interlinked pages, query against the wiki with citations, and run health audits for contradictions and gaps."]}),`
`,c(t.p,{children:"The wiki structure:"}),`
`,c(t.pre,{children:c(t.code,{children:`<wiki-root>/
├── SCHEMA.md        # Conventions + wiki root path
├── raw/             # Immutable source documents
├── wiki/
│   ├── index.md     # Content catalog — every page, one-line summary
│   ├── log.md       # Append-only operation log
│   ├── overview.md  # Evolving synthesis of everything known
│   └── pages/       # All wiki pages, flat, slug-named
└── assets/          # Images, PDFs, attachments
`})}),`
`,c(t.p,{children:"We use these skills in two live wikis: the framework wiki (36 pages covering the spec-driven architecture of the campaign backend) and the Settlers project wiki (306 pages of game design knowledge)."}),`
`,c(t.h3,{children:"qmd integration"}),`
`,c(t.p,{children:["Local semantic search via ",c(t.a,{href:"https://github.com/tobi/qmd",children:"qmd"}),": hybrid BM25 + vector search over markdown collections. Runs entirely on-device with local GGUF models (~2.2GB). We index four collections: second-brain (846 notes), aix docs (56), Settlers wiki (306), and research reports. Agents access it via MCP."]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:[c(t.span,{className:"hljs-comment",children:"# Index a folder"}),`
qmd collection add ~/vault/work --name notes --mask `,c(t.span,{className:"hljs-string",children:'"**/*.md"'}),`
qmd embed

`,c(t.span,{className:"hljs-comment",children:"# Search by meaning, not just keywords"}),`
qmd query `,c(t.span,{className:"hljs-string",children:'"how do we handle rate limiting?"'}),`

`,c(t.span,{className:"hljs-comment",children:"# Run as MCP server for agents"}),`
qmd mcp
`]})}),`
`,c(t.p,{children:"Everything stays local: SQLite database for embeddings and index (~4.1MB), downloaded GGUF model files (2.2GB total). No API calls, no data leaves the machine."}),`
`,c(t.h3,{children:"Workshop materials"}),`
`,c(t.p,{children:["A half-day workshop with four progressive presentations (embedding, agentic search, Karpathy wiki, knowledge engine) plus hands-on exercises. Participants built wikis from deep research reports, queried them, and extracted structured data from recipes into queryable stores. Materials live in the ",c(t.a,{href:"https://github.com/emartech/aix/tree/main/editor-lif-day/2026-05-12",children:"aix repo"}),"."]}),`
`,c(t.h3,{children:"References"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:[c(t.a,{href:"https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",children:"LLM Wiki"})," — Andrej Karpathy's original gist describing the wiki pattern"]}),`
`,c(t.li,{children:[c(t.a,{href:"https://github.com/kfchou/wiki-skills",children:"wiki-skills"})," — the Karpathy wiki skill set we forked and adapted"]}),`
`,c(t.li,{children:[c(t.a,{href:"https://github.com/tobi/qmd",children:"qmd"})," — local semantic search (hybrid BM25 + vector) for markdown collections"]}),`
`]})]})}function mA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(hf,{...e})}):hf(e)}const gA=Object.freeze(Object.defineProperty({__proto__:null,default:mA,frontmatter:ov},Symbol.toStringTag,{value:"Module"})),rv={title:"LLM Usage Foundation",date:"2025-05-06",outcome:"finished",summary:"Store every prompt, response, and tool call from our AI usage so we can analyse it later."};function ff(e){const t={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:['Using LLMs is expensive. Not "API call" expensive, but at the rates a serious agent burns through tokens, the bill matches a human worker on a lot of tasks. ',c(t.a,{href:"https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/",children:"METR's mid-2025 study"})," actually measured experienced open-source developers and found they were ",c(t.em,{children:"slower"})," with AI tools than without, even though they thought the opposite. Practitioner write-ups go further on the cost angle: ",c(t.a,{href:"https://www.cyfrin.io/blog/expensive-and-slow-for-small-changes-why-ai-coding-agents-can-be-overkill",children:"Cyfrin's breakdown"})," shows agents costing an order of magnitude more than a human edit for small changes."]}),`
`,c(t.p,{children:"That doesn't mean we stop using them. It means we have to be deliberate about it. Where is an LLM the right tool, where is it overkill, where does it spiral into burning 50× the tokens it actually needed. We can't answer those questions by feeling. We need data."}),`
`,c(t.p,{children:"There's a second angle, more speculative. If we record what the LLM does, an LLM can read the recordings. And if an LLM can read the recordings, we can build something that watches its own usage and improves its own setup over time. Self-tuning agents."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"We don't need a fancy analysis pipeline today. If we just store every interaction in a structured form, we can ask any question we want of it later, including questions we haven't thought of yet. Storage is the cheap part; re-creating the data after the fact is the impossible part."}),`
`,c(t.li,{children:"SAP-wide telemetry will eventually exist, but GDPR and personal-data rules will make any company-level pipeline coarse and slow. Every individual storing their own usage on their own machine sidesteps most of that. The data lives where it was generated, and the person who generated it owns it."}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Storing per-person usage is cheap. Disk is free at the volumes we're talking about."}),`
`,c(t.li,{children:"For developers it's basically free of friction: they already have a terminal, they already run Docker, the telemetry just shows up."}),`
`,c(t.li,{children:"Non-devs (UX, PMs) are harder. The tooling works fine, but the mental model doesn't come for free. Spans, traces, token counts: all unfamiliar vocabulary, and most people don't want to learn it just to see how much their week cost."}),`
`,c(t.li,{children:"A small dev team can build a packaged, opt-in version of this for the whole company."}),`
`,c(t.li,{children:["Raw metrics (tokens, cost) are necessary but not sufficient. The real diagnostic value comes when the ",c(t.em,{children:"content"})," of the interaction is stored alongside the metrics, in the same observability plane. When something costs too much, you need to read what was asked, not just how many tokens it consumed. The OTel GenAI semantic conventions provide the standard schema for this, and Tempo stores it."]}),`
`]}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:["See ",c(t.a,{href:"/experiments/secure-development#organizational-impact",children:"Secure Development"}),". Same argument applies. AI usage is growing across the company, and the org needs a default-on way to see what's happening before it has to debug something blind."]}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:["In normal software, observability is a solved problem. ",c(t.a,{href:"https://opentelemetry.io/",children:"OpenTelemetry"})," is the de-facto standard for traces, metrics, and logs."]}),`
`,c(t.p,{children:["In the last year, OpenTelemetry has been adding a vocabulary specifically for LLM and agent telemetry: the ",c(t.a,{href:"https://opentelemetry.io/docs/specs/semconv/gen-ai/",children:"GenAI semantic conventions"}),". Standard attribute names like ",c(t.code,{children:"gen_ai.system"}),", ",c(t.code,{children:"gen_ai.request.model"}),", ",c(t.code,{children:"gen_ai.usage.input_tokens"})," and ",c(t.code,{children:"output_tokens"}),", plus events for capturing the full prompt and completion content. Following the spec means anything in the OTel ecosystem (Grafana, Tempo, Phoenix, Langfuse, Honeycomb) can read our data without translation."]}),`
`,c(t.p,{children:"The tracing layer is the single source of truth for both structure and content. A prompt, the tool calls it triggered, the child sessions it spawned, and the cost it generated all live in one trace. TraceQL covers both structured search (by attribute value) and time-ordered browsing (by span timestamp). One backend, one query language, one place to look."}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.h3,{children:"The base: claude-code-monitoring-guide"}),`
`,c(t.p,{children:["We use Anthropic's ",c(t.a,{href:"https://github.com/anthropics/claude-code-monitoring-guide",children:"claude-code-monitoring-guide"})," as the receiving end. It's a Docker Compose stack: an OpenTelemetry Collector, Prometheus, and Grafana, pre-wired with dashboards for Claude Code's metrics."]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:["git ",c(t.span,{className:"hljs-built_in",children:"clone"}),` https://github.com/anthropics/claude-code-monitoring-guide.git
`,c(t.span,{className:"hljs-built_in",children:"cd"}),` claude-code-monitoring-guide
docker compose up -d
`]})}),`
`,c(t.p,{children:["Grafana on ",c(t.code,{children:"http://localhost:3000"})," (admin/admin)."]}),`
`,c(t.p,{children:["Then we tell Claude Code to send telemetry. On the host, in ",c(t.code,{children:"~/.claude/settings.json"}),":"]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-json",children:[c(t.span,{className:"hljs-punctuation",children:"{"}),`
  `,c(t.span,{className:"hljs-attr",children:'"env"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-punctuation",children:"{"}),`
    `,c(t.span,{className:"hljs-attr",children:'"CLAUDE_CODE_ENABLE_TELEMETRY"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"1"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
    `,c(t.span,{className:"hljs-attr",children:'"OTEL_METRICS_EXPORTER"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"otlp"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
    `,c(t.span,{className:"hljs-attr",children:'"OTEL_EXPORTER_OTLP_PROTOCOL"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"grpc"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
    `,c(t.span,{className:"hljs-attr",children:'"OTEL_EXPORTER_OTLP_ENDPOINT"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"http://localhost:4317"'}),`
  `,c(t.span,{className:"hljs-punctuation",children:"}"}),`
`,c(t.span,{className:"hljs-punctuation",children:"}"}),`
`]})}),`
`,c(t.p,{children:["For sandboxed runs, the same settings go into the sandbox kit, but with a small twist: the sandbox uses ",c(t.code,{children:"http/protobuf"})," on port 4318, not gRPC on 4317. The agent process exits before a gRPC batch flushes and the traces get lost. Took us a while to figure that one out."]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-yaml",children:[c(t.span,{className:"hljs-attr",children:"environment:"}),`
  `,c(t.span,{className:"hljs-attr",children:"variables:"}),`
    `,c(t.span,{className:"hljs-attr",children:"CLAUDE_CODE_ENABLE_TELEMETRY:"})," ",c(t.span,{className:"hljs-string",children:'"1"'}),`
    `,c(t.span,{className:"hljs-attr",children:"OTEL_METRICS_EXPORTER:"})," ",c(t.span,{className:"hljs-string",children:'"otlp"'}),`
    `,c(t.span,{className:"hljs-attr",children:"OTEL_EXPORTER_OTLP_PROTOCOL:"})," ",c(t.span,{className:"hljs-string",children:'"http/protobuf"'}),`
    `,c(t.span,{className:"hljs-attr",children:"OTEL_EXPORTER_OTLP_ENDPOINT:"})," ",c(t.span,{className:"hljs-string",children:'"http://host.docker.internal:4318"'}),`
`]})}),`
`,c(t.h3,{children:"Custom Grafana dashboards"}),`
`,c(t.p,{children:`The pre-wired dashboards cover the basics. They don't cover the questions we actually had: "how much did this week's deep-research sessions cost?", "what's my cost per project, broken down by model?". Those needed custom panels.`}),`
`,c(t.p,{children:"We can just ask Claude Code to build the dashboard. The monitoring stack auto-loads dashboard JSON from its provisioning folder, so the agent writes the file straight there. No copy-pasting JSON into the Grafana UI. Most of our dashboards started as a one-line prompt."}),`
`,c("img",{src:"/experiments/llm-usage-foundation/dashboard.png",alt:"Grafana dashboard with token usage by project, total prompts/turns/tool calls overview, token consumption rate, tokens by model, tool call distribution and error rates."}),`
`,c(t.h3,{children:"Per-project metrics and tracing"}),`
`,c(t.p,{children:["Claude Code respects ",c(t.a,{href:"https://code.claude.com/docs/en/monitoring-usage",children:c(t.code,{children:"OTEL_RESOURCE_ATTRIBUTES"})})," and stamps every span and metric with whatever you put in there. Set it per project and you get a ",c(t.code,{children:"project=<name>"})," label everywhere the data shows up."]}),`
`,c(t.p,{children:["The simplest setup: a per-project ",c(t.code,{children:".env"})," or shell hook that exports something like"]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:[c(t.span,{className:"hljs-built_in",children:"export"})," OTEL_RESOURCE_ATTRIBUTES=",c(t.span,{className:"hljs-string",children:'"project=change-delegation,team=editor"'}),`
`]})}),`
`,c(t.p,{children:'and suddenly Grafana can answer "how much did the change-delegation work cost this month" without a single SQL query.'}),`
`,c(t.p,{children:["pi has the same hook through the ",c(t.a,{href:"https://github.com/mprokopov/pi-otel-telemetry",children:"pi-otel-telemetry extension"}),". It forwards the same OTEL env vars, so the same labels apply across both agents."]}),`
`,c(t.h3,{children:"Tracing prompts and responses"}),`
`,c(t.p,{children:["Claude Code's built-in telemetry is mostly metrics: tokens, cost, tool-call counts. The actual prompts and the actual responses don't get traced out of the box. If you want to see ",c(t.em,{children:"what"})," the agent said, you can't, at least not without writing code."]}),`
`,c(t.p,{children:["pi is a different story. The ",c(t.a,{href:"https://github.com/mprokopov/pi-otel-telemetry",children:"pi-otel-telemetry extension"})," emits full OTel GenAI spans for every turn: prompt event, model attributes, token usage, completion event. Following the ",c(t.a,{href:"https://opentelemetry.io/docs/specs/semconv/gen-ai/",children:"GenAI semantic conventions"})," means the spans land in Grafana Tempo, Langfuse, or Phoenix without translation."]}),`
`,c("img",{src:"/experiments/llm-usage-foundation/trace.png",alt:"Tempo trace view of a pi-coding-agent session: agent.prompt and agent.turn spans with nested tool.bash spans, including the full input and output values and resource attributes for project, user and session."}),`
`,c(t.h3,{children:"Prompt content in trace data"}),`
`,c(t.p,{children:["The GenAI semantic conventions define where prompt and completion content belongs inside a trace. ",c(t.code,{children:"gen_ai.input.messages"})," carries the full user prompt as a JSON-encoded span attribute. ",c(t.code,{children:"gen_ai.content.prompt"})," and ",c(t.code,{children:"gen_ai.content.completion"})," are Span Events attached to the inference span, holding the raw text alongside metadata like token count and finish reason."]}),`
`,c(t.p,{children:'Span Events are the correct vehicle for this. They live inside the trace, inherit its context (trace ID, parent span), and are stored together with the span in the tracing backend. "Find the prompt that caused this expensive tool chain" becomes a single TraceQL query, not a cross-system correlation exercise.'}),`
`,c(t.p,{children:"The spec marks content capture as opt-in, because prompts can be large and contain sensitive data. For personal or team usage on a local machine this is a non-issue. For company-wide rollout, the same mechanism supports external storage references instead of inline content, so you can still link to the content without storing it in the trace directly."}),`
`,c(t.p,{children:["TraceQL makes prompt content searchable without separate infrastructure. A query like ",c(t.code,{children:'{ span.gen_ai.input.messages =~ ".*keyword.*" }'}),' finds every trace where the user asked about that keyword. Combined with the causal structure already in the trace (which tool spans are children of which prompt span), you get both "what was asked" and "what happened as a result" in one view.']}),`
`,c(t.h3,{children:"Persistent volumes and retention"}),`
`,c(t.p,{children:["The monitoring stack runs in Docker. Named volumes survive ",c(t.code,{children:"docker compose down"}),", but not a ",c(t.code,{children:"docker volume prune"})," or accidental removal. Without explicit attention to persistence, a 30-day retention policy means nothing if the underlying storage gets wiped on day 3."]}),`
`,c(t.p,{children:["All services should run with ",c(t.code,{children:"restart: unless-stopped"})," so the stack comes back after a Docker or OS restart without manual intervention. This is the difference between telemetry that's always there and telemetry that requires someone to remember to start it."]}),`
`,c(t.p,{children:"Retention must be explicitly configured and matched to the expected analysis window. For cost analysis by week or month you need at minimum 30 days of data. Prometheus defaults to 15 days; Tempo defaults vary by version. Both need to be set consciously."}),`
`,c(t.p,{children:["Agent sessions are bursty: metrics get emitted for 20 minutes while a session is active, then nothing for hours. Without staleness-safe recording rules (using ",c(t.code,{children:"max_over_time"})," windows wider than the quiet gap), aggregated metrics like total cost or cache hit ratio disappear between sessions. The recording rules layer needs to be designed around this burst pattern, not the steady-stream pattern that Prometheus was built for."]})]})}function vA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(ff,{...e})}):ff(e)}const yA=Object.freeze(Object.defineProperty({__proto__:null,default:vA,frontmatter:rv},Symbol.toStringTag,{value:"Module"})),lv={title:"Meeting recordings",date:"2025-05-05",outcome:"ongoing",summary:"Capture and transcribe project meetings so nothing is lost between sessions."};function pf(e){const t={a:"a",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"Writing a summary after every meeting is real work. Someone has to take notes during the meeting, then turn them into something readable afterwards. The cost is enough that most of the time it doesn't happen."}),`
`,c(t.p,{children:"When the summary doesn't exist, we lose information. Decisions, context, who-said-what when something later breaks. And even when a summary exists, it's lossy by design. Sometimes the wording matters. Sometimes the question someone asked five minutes in matters more than the answer."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Recording every meeting end-to-end means later, when we need a knowledge base entry, a specification, a decision doc, or a post-mortem, the source material is already there. Not someone's recollection of it, the actual conversation."}),`
`,c(t.li,{children:"An LLM can produce meeting summaries that are better than what a human would write manually, because it has access to the full transcript and doesn't get tired."}),`
`,c(t.li,{children:"The pipeline from recording to actionable knowledge can be fully automated: record → transcribe → summarize → extract decisions → link to people and projects."}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Teams Premium transcription in Hungarian is surprisingly usable. Not perfect, but good enough that an LLM can read it and produce accurate summaries. The transcript is the raw material, not the end product."}),`
`,c(t.li,{children:"The enrichment step matters more than the transcription step. A raw VTT file is nearly useless for humans. The value comes from the LLM reading it and producing: a structured summary, extracted decisions, action items with owners, and connections to other meetings and projects."}),`
`,c(t.li,{children:"The 22 aiX Container sessions we recorded became the backbone of the entire project's knowledge base. Design debates, vocabulary decisions, architectural choices, domain expert Q&A sessions, all of them searchable and citable months later."}),`
`,c(t.li,{children:"Enrichment doesn't have to happen immediately. We batch-processed weeks of recordings in one go and still got full value. The transcript is immutable, the enrichment can run anytime."}),`
`,c(t.li,{children:"Hungarian-language meetings work fine. The LLM handles mixed Hungarian/English technical discussions without issues. Speaker attribution from Teams is the main quality bottleneck."}),`
`]}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:`Every team that uses Teams already has free transcription available (Teams Premium). The barrier isn't technology, it's habit. Pressing "Start transcription" at the beginning of every meeting is the only manual step. Everything after that can be automated.`}),`
`,c(t.p,{children:["For the aiX team, the recordings feed directly into the ",c(t.a,{href:"/experiments/knowledge-base",children:"Knowledge Base"})," experiment. Meeting transcripts are one of the primary sources that get ingested into the wiki. Without recordings, the knowledge base would be limited to what people remembered to write down."]}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:"The pipeline has three stages:"}),`
`,c(t.ol,{children:[`
`,c(t.li,{children:[`
`,c(t.p,{children:[c(t.strong,{children:"Capture."})," Teams Premium transcribes the meeting live into a VTT file (timestamped, speaker-attributed). After the meeting, the VTT is downloaded via ",c(t.a,{href:"https://github.com/emartech/web-mobile-skills",children:"OAS"})," (our Teams/Outlook CLI) and stored as an immutable raw file."]}),`
`]}),`
`,c(t.li,{children:[`
`,c(t.p,{children:[c(t.strong,{children:"Parse."})," The raw VTT is converted to a readable markdown transcript with speaker labels and timestamps. This is the human-browsable version of the recording."]}),`
`]}),`
`,c(t.li,{children:[`
`,c(t.p,{children:[c(t.strong,{children:"Enrich."})," An LLM reads the full transcript and produces a structured meeting note: summary, key topics, decisions, action items with owners, and connections to people and projects already in the knowledge base. This is where the real value is created."]}),`
`]}),`
`]}),`
`,c(t.p,{children:"The enrichment step is idempotent. Running it again on the same transcript won't lose manual edits (the LLM merges, never overwrites). New information from the transcript gets added, existing human-written notes are preserved."}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.h3,{children:"The pipeline: vault-sync + vault-evolve"}),`
`,c(t.p,{children:"Two agent skills that handle the full flow:"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:[c(t.strong,{children:"vault-sync"})," pulls meeting metadata from Outlook Calendar, downloads VTT transcripts from Teams via ",c(t.a,{href:"https://github.com/emartech/web-mobile-skills",children:"OAS"}),", creates meeting note stubs with attendees and connections."]}),`
`,c(t.li,{children:[c(t.strong,{children:"vault-evolve"})," reads unprocessed transcripts, extracts knowledge into structured meeting notes, and synthesizes patterns into wiki pages."]}),`
`]}),`
`,c(t.p,{children:"The skills run on a schedule (daily sync, weekly evolve) or on demand."}),`
`,c(t.h3,{children:"What it produced for this project"}),`
`,c(t.p,{children:"For the project knowledge base we fed only the project-specific recordings: the aiX Container sessions and the domain expert Q&As. From these the pipeline produced:"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Structured meeting notes with summaries, decisions, and action items"}),`
`,c(t.li,{children:"The full change delegation Q&A extracted from the Day 1 domain expert session"}),`
`,c(t.li,{children:'The vocabulary/naming decisions (project renamed from "Change Delegation" to "Localization Pipeline")'}),`
`,c(t.li,{children:"The 4-state inheritance model debate and resolution"}),`
`,c(t.li,{children:"Cross-linked people profiles, project references, and decision records"}),`
`]}),`
`,c(t.h3,{children:"Multiple knowledge bases"}),`
`,c(t.p,{children:"The same pipeline can feed multiple knowledge bases simultaneously. An other KB could ingest Architecture Forums, Multi Region Open Hours, P&E Demos, standups. The transcript is always the same immutable VTT file; which knowledge base it flows into is a routing decision."})]})}function bA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(pf,{...e})}):pf(e)}const wA=Object.freeze(Object.defineProperty({__proto__:null,default:bA,frontmatter:lv},Symbol.toStringTag,{value:"Module"})),cv={title:"Mutation Testing",date:"2026-06-04",outcome:"mixed",summary:"Mutate the implementation, rerun the tests, see what survives. The survivors point at the holes the spec fixtures haven't filled in."};function mf(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"We extended the OpenAPI spec with a fixture capability so each endpoint carries its own test cases as part of the spec, and we layer Schemathesis fuzz on top of those. Both suites are green, both look thorough, but neither tells us what they actually cover. Line coverage would tell us which lines ran, not whether anything would notice if those lines lied."}),`
`,c(t.p,{children:["We need an answer to a different question. If we change a comparison, drop a guard, or empty an error message in ",c(t.code,{children:"src/implemented/"}),", would any test catch it. That is what tells us whether the spec fixtures and the fuzz really describe the behaviour we care about."]}),`
`,c(t.p,{children:"The same question matters one level up. As we move toward AI-written implementations, we want to know how much of what the agent emits is load-bearing and how much is filler. Tests that survive arbitrary changes to the code are not testing the code, they are testing the agent's English."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:c(t.strong,{children:"Using mutation testing we can understand how well our application is tested against the specification."})}),`
`,c(t.li,{children:[c(t.strong,{children:"Mutation score is a better signal than line coverage."})," We expect it to find gaps that 100% line coverage hides."]}),`
`,c(t.li,{children:[c(t.strong,{children:"Schemathesis closes a lot of those gaps for free."})," Random ",c(t.code,{children:"$filter"}),"/",c(t.code,{children:"$orderby"})," values exercise error branches that hand-written contract fixtures skip."]}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"The pilot ran on two read handlers: 33 lines of code, 27 mutants, five minutes wall-clock."}),`
`,c(t.li,{children:["Contract tests alone scored ",c(t.strong,{children:"44.44%"}),". Adding Schemathesis lifted it to ",c(t.strong,{children:"85.19%"}),". On ",c(t.code,{children:"listCampaigns"})," alone the jump was 22.22% to 83.33%."]}),`
`,c(t.li,{children:["The four mutants that still survived split into one real test gap (we never assert the human-readable error message), two equivalent mutants (defensive ",c(t.code,{children:"?."})," guards on values that are never null in practice), and one mutant that needs a unit test, not a contract test, to kill."]}),`
`,c(t.li,{children:"Mutation testing is slow. Five minutes for two handlers is fine. Fifty handlers will be most of an hour. We run it on demand or nightly, not on every PR."}),`
`,c(t.li,{children:"We need every test green before we start. Stryker aborts the run if the baseline is not clean. One flaky fixture and the score is meaningless."}),`
`]}),`
`,c(t.p,{children:"The score on its own is less interesting than what survives. Each survived mutant points at something specific: a missing assertion, a missing fixture, a defensive branch nobody reaches."}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:["We picked ",c(t.a,{href:"https://stryker-mutator.io/",children:"Stryker"}),". It's the mainstream JS mutation framework and it has a ",c(t.code,{children:"command"})," runner that works when the SUT runs in a separate process from the tests, which is our case."]}),`
`,c(t.p,{children:"We started small: two handlers, both already green under the contract suite, both already covered by spec fixtures. Ran Stryker. Looked at what survived. Added Schemathesis to the same run. Looked again. Two endpoints isn't enough to commit to running this on all 52, but it's enough to see whether the wiring actually works."}),`
`,c(t.p,{children:["The pilot config and the runner script are checked in but not yet wired into ",c(t.code,{children:"gates:all"}),". We want one full clean run on the implemented handlers before we promote it."]}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.h3,{children:"Generated Stryker config"}),`
`,c(t.p,{children:["The scaffold renders ",c(t.code,{children:"apps/campaign-backend/stryker.conf.json"})," from a template, the same way it renders Jest config and the integration runner. The template lives at ",c(t.code,{children:"tools/backend-gates-scaffold/templates/stryker.conf.json.hbs"}),". So it survives ",c(t.code,{children:"harness:generate"})," and stays in sync with project config."]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-json",children:[c(t.span,{className:"hljs-punctuation",children:"{"}),`
  `,c(t.span,{className:"hljs-attr",children:'"testRunner"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"command"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"commandRunner"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-punctuation",children:"{"})," ",c(t.span,{className:"hljs-attr",children:'"command"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"npm run -w apps/campaign-backend gates:integration"'})," ",c(t.span,{className:"hljs-punctuation",children:"}"}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"mutate"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-punctuation",children:"["}),c(t.span,{className:"hljs-string",children:'"src/implemented/**/*.ts"'}),c(t.span,{className:"hljs-punctuation",children:"]"}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"coverageAnalysis"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"off"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"concurrency"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-number",children:"4"}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"thresholds"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-punctuation",children:"{"})," ",c(t.span,{className:"hljs-attr",children:'"high"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-number",children:"80"}),c(t.span,{className:"hljs-punctuation",children:","})," ",c(t.span,{className:"hljs-attr",children:'"low"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-number",children:"60"}),c(t.span,{className:"hljs-punctuation",children:","})," ",c(t.span,{className:"hljs-attr",children:'"break"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-number",children:"0"})," ",c(t.span,{className:"hljs-punctuation",children:"}"}),`
`,c(t.span,{className:"hljs-punctuation",children:"}"}),`
`]})}),`
`,c(t.p,{children:"Five things had to be different from a vanilla setup."}),`
`,c(t.h4,{children:"For HTTP integration tests: command runner, not Jest runner"}),`
`,c(t.p,{children:["Our Jest tests hit ",c(t.code,{children:"BASE_URL"})," over HTTP. They do not import the handlers, so ",c(t.code,{children:"@stryker-mutator/jest-runner"})," cannot see the SUT to inject mutants. We use ",c(t.code,{children:'testRunner: "command"'})," and let Stryker invoke our existing integration gate. Mutants land on disk, the server boots fresh per mutant, picks up the mutated source. Side effect: ",c(t.code,{children:'coverageAnalysis: "off"'})," is forced, so every mutant runs the full filtered suite."]}),`
`,c(t.h4,{children:"For full coverage: Jest plus Schemathesis in one command"}),`
`,c(t.p,{children:["Contract tests cover the happy paths the spec fixtures describe. Fuzz covers everything else. We wrap both in a single runner script that boots the server once, runs Jest scoped by ",c(t.code,{children:"--testNamePattern"}),", then runs ",c(t.code,{children:"python3 -m schemathesis.cli run"})," against the same ",c(t.code,{children:"BASE_URL"})," scoped by ",c(t.code,{children:"--include-operation-id"}),". The 44 to 85 jump came entirely from this."]}),`
`,c(t.h4,{children:"For parallel runs: per-worker Mongo databases"}),`
`,c(t.p,{children:["Stryker workers run in parallel and would otherwise share one database. The integration runner suffixes ",c(t.code,{children:"MONGODB_URI"})," with ",c(t.code,{children:"_w${STRYKER_MUTATOR_WORKER_ID}"})," when Stryker is driving. Outside Stryker the suffix is empty, so behaviour does not change. With this we can run ",c(t.code,{children:"concurrency: 4"}),". The same trick would let ",c(t.code,{children:"gates:integration"})," itself run in parallel, which is a separate speedup we have not done yet."]}),`
`,c(t.h4,{children:["For the agent boundary: mutate ",c(t.code,{children:"src/implemented/"})," only"]}),`
`,c(t.p,{children:["Generated code is a deterministic function of the spec. Mutating it produces noise. We scope ",c(t.code,{children:"mutate"})," to ",c(t.code,{children:"src/implemented/handlers/**/*.ts"}),". The agent has no business writing tests for code it did not write."]}),`
`,c(t.h4,{children:["For the monorepo: ",c(t.code,{children:"inPlace: true"}),", not the sandbox"]}),`
`,c(t.p,{children:["Stryker's default copies the project to a temp dir before mutating. Our integration runner reaches into root ",c(t.code,{children:"node_modules"})," for the Jest binary and uses workspace flags, which break in the sandbox. ",c(t.code,{children:"inPlace: true"})," writes to the real files and restores from ",c(t.code,{children:".stryker-tmp/backup-*"})," on exit. Safe as long as nothing kills the process mid-run. Git is the backstop."]}),`
`,c(t.h3,{children:"Pilot result"}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-text",children:`                     Jest only    Jest + fuzz
  Overall            44.44%   →   85.19%   (+40.75)
  getCampaign        88.89%   →   88.89%   (unchanged)
  listCampaigns      22.22%   →   83.33%   (+61.11)
`})}),`
`,c(t.p,{children:["The HTML report at ",c(t.code,{children:"apps/campaign-backend/reports/mutation/mutation.html"})," lets you click through every mutant and see which tests killed it. Open it locally to see what each survivor looks like in the source."]}),`
`,c("img",{src:"/experiments/mutation-testing/getCampaign-summary.png",alt:"Stryker HTML report for getCampaign.ts: green/red bar showing 23 killed, 4 survived; mutation score 88.89% of total and of covered; 8 killed, 1 survived, 9 total; source listing of the 11-line handler."}),`
`,c("img",{src:"/experiments/mutation-testing/getCampaign-survived.png",alt:"Stryker HTML report for getCampaign.ts with survived mutants visible: the if (!campaign) guard mutated to if (true), shown as a removed red line and an added green line, with markers indicating which tests covered or killed the mutant."}),`
`,c("img",{src:"/experiments/mutation-testing/listCampaigns-summary.png",alt:"Stryker HTML report for listCampaigns.ts: green/red bar showing 23 killed, 4 survived; mutation score 83.33%; 15 killed, 3 survived, 18 total; source listing of the try/catch handler with the INVALID_FILTER || INVALID_ORDERBY branch flagged with surviving mutant markers."})]})}function kA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(mf,{...e})}):mf(e)}const SA=Object.freeze(Object.defineProperty({__proto__:null,default:kA,frontmatter:cv},Symbol.toStringTag,{value:"Module"})),uv={title:"Secure Development",date:"2025-05-06",outcome:"finished",summary:"Built our own tooling around secure AI usage so the team can run research and development tasks without leaking IP or hitting uncontrolled cloud endpoints."};function gf(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",span:"span",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"Most developers on our team have laptops that can reach production and the critical infrastructure around it. The moment we put an AI coding agent on the same laptop, that agent is one accidental click away from the same access. The agent also has the internet, so a prompt-injection on any page it visits can start steering it toward our prod systems."}),`
`,c(t.p,{children:"The bad outcomes are not abstract. A deleted database. A wiped environment. A project torn down by mistake. Secrets pasted into the wrong terminal or shipped off to a third party. CLI tools have some basic confirmations, and they're nowhere near enough."}),`
`,c(t.p,{children:`The first use case made the risk concrete. We wanted to fire off multiple research runs on different topics in parallel, each one 10 to 50 minutes of uninterrupted agent work. No baby-sitting, no "approve this command?" prompts, no human in the loop. That's exactly when "one wrong button" turns into "one wrong button while we were on a coffee break".`}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"A bit of care plus some sandboxing closes most of the risk."}),`
`,c(t.li,{children:"We don't need a full security platform, we just need the agent to never see prod by default."}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Sandbox tooling is easy to build. The resulting workflow stays simple to use."}),`
`,c(t.li,{children:"Non-dev roles (UX, PM) can set up the same sandbox themselves with a small amount of help."}),`
`,c(t.li,{children:"A small dev team can build a company-wide version of this on the cheap."}),`
`]}),`
`,c(t.p,{children:"If anything, the surprise was how little ceremony it took. We expected friction and didn't really hit any."}),`
`,c(t.h2,{children:"Organizational impact"}),`
`,c(t.p,{children:"AI usage is growing fast across the company, and so is the surface area for an AI-caused incident. Sandboxing has to be the default for everyone touching AI, not just engineering."}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:"We let everyone on the team build their own version of the sandbox tooling, with as little guidance as we could get away with. We wanted to see what each person reached for before converging on one recipe."}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.p,{children:"We landed on a small stack. Everything runs on the developer's laptop, no central service."}),`
`,c("img",{src:"/experiments/secure-development/sandbox-architecture.svg",alt:"sandboxxer CLI on the host orchestrating multiple sandboxes in parallel: research containers, a knowledge-base container, each with its own folders and skills. SearXNG and telemetry sit on the host."}),`
`,c(t.p,{children:["In practice we run several at once. The wrapper CLI (",c(t.code,{children:"sandboxxer"}),") reads a profile and spins up a sandbox per task: one for research, one for the knowledge base, one for whatever the agent is working on. Each gets only the folders, skills, and network access it actually needs."]}),`
`,c(t.h3,{children:["For isolation: Docker + ",c(t.code,{children:"sbx"})]}),`
`,c(t.p,{children:["Docker gives us the container. ",c(t.code,{children:"sbx"})," is the CLI that wraps it: creating, running, and tearing down sandboxes, plus a global network policy."]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:`brew install docker/tap/sbx
sbx login
sbx policy set-default deny-all
`})}),`
`,c(t.p,{children:[c(t.code,{children:"deny-all"})," blocks all outbound traffic from sandboxes by default. Anything the sandbox needs (the AI gateway, a search engine, telemetry) we open up explicitly through a kit."]}),`
`,c(t.h3,{children:"For harder isolation: Lima"}),`
`,c(t.p,{children:"Docker is enough for most sandboxes, but not all. Two cases push us further: an agent that needs to use Docker itself, and any tooling that manages sandboxes (a sandbox creating sandboxes). Running those on the host kernel makes us nervous."}),`
`,c(t.p,{children:["For those, we drop the whole stack into a ",c(t.a,{href:"https://lima-vm.io/",children:"Lima"})," VM. The agent gets its own Linux kernel, its own Docker daemon, and a clean blast-radius boundary at the VM layer."]}),`
`,c(t.p,{children:[c(t.code,{children:"sbx"})," itself doesn't run inside Lima yet, so inside the VM we fall back to plain Docker for managing sandboxes. Less polished than the host workflow, but the security trade is worth it for the cases that actually need a VM."]}),`
`,c("img",{src:"/experiments/secure-development/how-it-was-built.svg",alt:"Meta diagram: an agent in a VM uses Docker to build the sandbox manager itself, with profiles, skills, and plugins as inputs."}),`
`,c(t.p,{children:"Worth a wink: the agent built most of the sandbox manager itself. We described what we wanted, and the agent (running inside one of these very sandboxes) iterated on the wrapper, the profiles, the skill installer. Sandbox builds sandbox."}),`
`,c(t.h3,{children:"For config: a kit YAML"}),`
`,c(t.p,{children:`A "kit" is just a YAML file that describes the sandbox. Env vars, install commands, model name. It's the one thing a teammate has to copy to get the same setup.`}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-yaml",children:[c(t.span,{className:"hljs-attr",children:"schemaVersion:"})," ",c(t.span,{className:"hljs-string",children:'"1"'}),`
`,c(t.span,{className:"hljs-attr",children:"kind:"})," ",c(t.span,{className:"hljs-string",children:"mixin"}),`
`,c(t.span,{className:"hljs-attr",children:"name:"})," ",c(t.span,{className:"hljs-string",children:"my-sandbox-kit"}),`
`,c(t.span,{className:"hljs-attr",children:"environment:"}),`
  `,c(t.span,{className:"hljs-attr",children:"variables:"}),`
    `,c(t.span,{className:"hljs-attr",children:"ANTHROPIC_API_KEY:"})," ",c(t.span,{className:"hljs-string",children:'"sk-dummy-value"'}),`
    `,c(t.span,{className:"hljs-attr",children:"ANTHROPIC_BASE_URL:"})," ",c(t.span,{className:"hljs-string",children:'"http://host.docker.internal:7655/anthropic/"'}),`
    `,c(t.span,{className:"hljs-attr",children:"ANTHROPIC_MODEL:"})," ",c(t.span,{className:"hljs-string",children:'"anthropic--claude-4.6-opus"'}),`
`]})}),`
`,c(t.p,{children:"With a kit in place, creating a sandbox is one line:"}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:`sbx create --name my-project --kit ~/kits/my-kit claude .
sbx run my-project
`})}),`
`,c(t.p,{children:["Without it, Claude Code inside the container says ",c(t.code,{children:"Not logged in"}),". That's intentional. A fresh sandbox has no API access until the kit hands it some."]}),`
`,c(t.h3,{children:"For auth: a Caddy sidecar"}),`
`,c(t.p,{children:"The sandbox cannot read the host API key directly. We run Caddy as a tiny auth proxy that injects the key on every request, so the dummy value in the kit never reaches the upstream."}),`
`,c(t.p,{children:[c(t.code,{children:"Caddyfile"}),":"]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-caddy",children:`{
    auto_https off
    admin off
}

:7655 {
    reverse_proxy http://host.docker.internal:6655 {
        header_up x-api-key "{env.HAI_API_KEY}"
        header_up Authorization "Bearer {env.HAI_API_KEY}"
    }
}
`})}),`
`,c(t.p,{children:"Caddy listens on 7655 and forwards to the upstream gateway on 6655 with the real auth header attached. The kit points the sandbox at 7655."}),`
`,c(t.h3,{children:"For installing skills"}),`
`,c(t.p,{children:["Any skill can be dropped into the sandbox at build time via the kit's ",c(t.code,{children:"commands.install"}),". As an example, here is how to install the ",c(t.a,{href:"https://github.com/blader/humanizer",children:"humanizer"})," skill:"]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-yaml",children:[c(t.span,{className:"hljs-attr",children:"commands:"}),`
  `,c(t.span,{className:"hljs-attr",children:"install:"}),`
    `,c(t.span,{className:"hljs-bullet",children:"-"})," ",c(t.span,{className:"hljs-attr",children:"command:"})," ",c(t.span,{className:"hljs-string",children:'"git clone https://github.com/blader/humanizer /home/agent/.claude/skills/humanizer"'}),`
      `,c(t.span,{className:"hljs-attr",children:"user:"})," ",c(t.span,{className:"hljs-string",children:'"1000"'}),`
`]})}),`
`,c(t.p,{children:["Same pattern for any other skill: clone it into ",c(t.code,{children:"/home/agent/.claude/skills/<name>"})," as user ",c(t.code,{children:"1000"}),"."]}),`
`,c(t.h3,{children:"For sharing folders with the sandbox"}),`
`,c(t.p,{children:["A fresh sandbox sees nothing on the host. Mounts are passed as positional arguments to ",c(t.code,{children:"sbx create"}),"/",c(t.code,{children:"sbx run"}),": the first path is the workspace, additional paths are extra workspaces, and appending ",c(t.code,{children:":ro"})," makes a mount read-only."]}),`
`,c(t.p,{children:"Read-write workspace, the agent can edit files:"}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:`sbx run claude ~/work/my-project
`})}),`
`,c(t.p,{children:"Workspace plus an extra read-only reference directory:"}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:`sbx run claude ~/work/my-project ~/docs:ro
`})}),`
`,c(t.p,{children:"Mix and match: one writable workspace plus any number of read-only references. Anything outside the mounted paths is invisible to the sandbox."}),`
`,c(t.h3,{children:"For working with code: git inside, push outside"}),`
`,c(t.p,{children:"The sandbox has git available locally so the agent can branch, commit, diff, rebase, and use the workspace like a normal repo. What it doesn't have is a path to GitHub. Pushing and fetching stay on the host."}),`
`,c(t.p,{children:["The split keeps two concerns separate. The agent can rewrite history all it wants — it can't accidentally push something half-baked, leak a secret to a remote, or pull in a poisoned branch from a PR. When we're happy with what's in the workspace, we run ",c(t.code,{children:"git push"})," from the host, where our SSH keys and GitHub credentials actually live."]}),`
`,c(t.h3,{children:"For repeatable setups: a custom CLI with profiles"}),`
`,c(t.p,{children:["Kits get you most of the way, but in practice every sandbox we spin up has the same shape: a default workspace, a known set of skills, the right env vars, sometimes a system prompt. Typing all that into ",c(t.code,{children:"sbx run"})," every time gets old fast."]}),`
`,c(t.p,{children:["We wrote a small wrapper CLI on top of ",c(t.code,{children:"sbx"}),' that reads JSON "profiles". Each profile bundles everything a particular kind of sandbox needs.']}),`
`,c(t.p,{children:"A profile for working with the BMW architect documents:"}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-json",children:[c(t.span,{className:"hljs-punctuation",children:"{"}),`
  `,c(t.span,{className:"hljs-attr",children:'"name"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"bmw-architect"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"agent"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"pi"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"defaultWorkspace"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"~/Documents/repositories/architect-bmw-documents"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"skills"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-punctuation",children:"["}),`
    `,c(t.span,{className:"hljs-punctuation",children:"{"}),`
      `,c(t.span,{className:"hljs-attr",children:'"name"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"humanizer"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
      `,c(t.span,{className:"hljs-attr",children:'"type"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"github"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
      `,c(t.span,{className:"hljs-attr",children:'"repo"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"https://github.com/blader/humanizer"'}),`
    `,c(t.span,{className:"hljs-punctuation",children:"}"}),`
  `,c(t.span,{className:"hljs-punctuation",children:"]"}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"extensions"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-punctuation",children:"["}),`
    `,c(t.span,{className:"hljs-punctuation",children:"{"})," ",c(t.span,{className:"hljs-attr",children:'"name"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"pi-otel-telemetry"'}),c(t.span,{className:"hljs-punctuation",children:","})," ",c(t.span,{className:"hljs-attr",children:'"path"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"~/.pi/agent/extensions/pi-otel-telemetry"'})," ",c(t.span,{className:"hljs-punctuation",children:"}"}),c(t.span,{className:"hljs-punctuation",children:","}),`
    `,c(t.span,{className:"hljs-punctuation",children:"{"})," ",c(t.span,{className:"hljs-attr",children:'"name"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"pi-http-listener"'}),c(t.span,{className:"hljs-punctuation",children:","})," ",c(t.span,{className:"hljs-attr",children:'"path"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"~/.pi/agent/extensions/pi-http-listener"'})," ",c(t.span,{className:"hljs-punctuation",children:"}"}),`
  `,c(t.span,{className:"hljs-punctuation",children:"]"}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"setup"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-punctuation",children:"["}),`
    `,c(t.span,{className:"hljs-string",children:'"npm install -g bun"'}),c(t.span,{className:"hljs-punctuation",children:","}),`
    `,c(t.span,{className:"hljs-string",children:'"bun install"'}),`
  `,c(t.span,{className:"hljs-punctuation",children:"]"}),c(t.span,{className:"hljs-punctuation",children:","}),`
  `,c(t.span,{className:"hljs-attr",children:'"ports"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-punctuation",children:"["}),`
    `,c(t.span,{className:"hljs-punctuation",children:"{"})," ",c(t.span,{className:"hljs-attr",children:'"name"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"preview"'}),c(t.span,{className:"hljs-punctuation",children:","})," ",c(t.span,{className:"hljs-attr",children:'"host"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-number",children:"3456"}),c(t.span,{className:"hljs-punctuation",children:","})," ",c(t.span,{className:"hljs-attr",children:'"sandbox"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-number",children:"3456"})," ",c(t.span,{className:"hljs-punctuation",children:"}"}),c(t.span,{className:"hljs-punctuation",children:","}),`
    `,c(t.span,{className:"hljs-punctuation",children:"{"})," ",c(t.span,{className:"hljs-attr",children:'"name"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-string",children:'"pi-listener"'}),c(t.span,{className:"hljs-punctuation",children:","})," ",c(t.span,{className:"hljs-attr",children:'"host"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-number",children:"9876"}),c(t.span,{className:"hljs-punctuation",children:","})," ",c(t.span,{className:"hljs-attr",children:'"sandbox"'}),c(t.span,{className:"hljs-punctuation",children:":"})," ",c(t.span,{className:"hljs-number",children:"9876"})," ",c(t.span,{className:"hljs-punctuation",children:"}"}),`
  `,c(t.span,{className:"hljs-punctuation",children:"]"}),`
`,c(t.span,{className:"hljs-punctuation",children:"}"}),`
`]})}),`
`,c(t.p,{children:"Using it is one line:"}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:`sandboxxer run --profile bmw-architect
`})}),`
`,c(t.p,{children:"The wrapper resolves the profile, mounts the default workspace, loads the extensions, runs the setup commands, opens the forwarded ports, and starts the agent."}),`
`,c(t.h3,{children:"For non-interactive runs"}),`
`,c(t.p,{children:["Most of the time we run sandboxes interactively. Sometimes we just want to fire off a prompt and walk away. A deep-research run, a one-shot refactor, an end-of-day question we don't want to babysit. The ",c(t.code,{children:"-p"})," flag pipes a prompt straight to the agent and exits when it's done:"]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:["sandboxxer run --profile bmw-architect -p ",c(t.span,{className:"hljs-string",children:'"summarize the current state of the openapi spec"'}),`
`]})}),`
`,c(t.p,{children:"The agent runs the prompt, prints to stdout, exits. Good for cron jobs, or for kicking something long off and walking away from the laptop."}),`
`,c(t.h3,{children:"For controlled web access: search and fetch services"}),`
`,c(t.p,{children:"A sandbox can reach the internet, but only to read. Outbound POSTs are off the table. Combined with the fact that the sandbox holds no secrets (the API key sits with Caddy on the host, never inside the container), the blast radius of a leaked credential or a prompt injection stays small. And because everything goes through our own services, we can shape, log, or harden the traffic whenever we need to."}),`
`,c(t.p,{children:"It's also opt-in. By default a fresh sandbox cannot search or fetch at all. We only mount these services when the sandbox actually needs them, for a deep-research session, say. Most sandboxes never see the internet."}),`
`,c(t.p,{children:"When we do open it up, two narrow capabilities cover almost everything: searching the web and fetching a specific URL."}),`
`,c(t.p,{children:["Both services run on the host, not inside the sandbox. Because of ",c(t.code,{children:"deny-all"}),", sandboxes cannot reach the host's ",c(t.code,{children:"localhost"})," by default — they have their own network namespace. We open the door from the kit, but only for the two specific ports we need (SearXNG on 8888, the fetch service on whatever port we publish). Sandboxes address the host as ",c(t.code,{children:"host.docker.internal"}),":"]}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-yaml",children:[c(t.span,{className:"hljs-attr",children:"network:"}),`
  `,c(t.span,{className:"hljs-attr",children:"allowedDomains:"}),`
    `,c(t.span,{className:"hljs-bullet",children:"-"})," ",c(t.span,{className:"hljs-string",children:"host.docker.internal:8888"}),`
    `,c(t.span,{className:"hljs-bullet",children:"-"})," ",c(t.span,{className:"hljs-string",children:"host.docker.internal:9999"}),`
`]})}),`
`,c(t.p,{children:"Nothing else on the host is reachable. Other ports stay blocked, including any other services running on the developer's laptop."}),`
`,c(t.h4,{children:"Searching: a local SearXNG"}),`
`,c(t.p,{children:"SearXNG runs locally and gives the agent a search endpoint, paired with a small skill that teaches it how to call it."}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-bash",children:`docker run -d --name searxng -p 8888:8080 searxng/searxng:latest
`})}),`
`,c(t.p,{children:"In the kit:"}),`
`,c(t.pre,{children:c(t.code,{className:"hljs language-yaml",children:[c(t.span,{className:"hljs-attr",children:"environment:"}),`
  `,c(t.span,{className:"hljs-attr",children:"variables:"}),`
    `,c(t.span,{className:"hljs-attr",children:"SEARXNG_URL:"})," ",c(t.span,{className:"hljs-string",children:'"http://host.docker.internal:8888"'}),`
`]})}),`
`,c(t.p,{children:"The skill ships a hook that blocks the default web tools, so the only path out for the agent is SearXNG."}),`
`,c(t.h4,{children:"Fetching: a tiny fetch service"}),`
`,c(t.p,{children:'Search is one half. The other is "fetch this URL and give me back the content".'}),`
`,c(t.p,{children:"The shape of the solution: a minimal script that takes a URL, fetches it, and converts the response to Markdown before returning it. Stripping the HTML chrome down to plain text plus headings makes the body far cheaper for the agent to read — less noise, fewer tokens, no broken JS or tracking pixels in the way. Wrap the script in a Docker image, expose the port, and let the sandbox call it through a small skill that knows the endpoint. Same pattern as SearXNG: the agent never touches the public internet, only our local service."}),`
`,c(t.h3,{children:"For observability"}),`
`,c(t.p,{children:["See the ",c(t.a,{href:"/experiments/llm-usage-foundation",children:"LLM Usage Foundation"})," experiment."]}),`
`,c(t.h3,{children:"For research"}),`
`,c(t.p,{children:["See the ",c(t.a,{href:"/experiments/deep-research",children:"Deep Research"})," experiment."]})]})}function xA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(gf,{...e})}):gf(e)}const _A=Object.freeze(Object.defineProperty({__proto__:null,default:xA,frontmatter:uv},Symbol.toStringTag,{value:"Module"})),dv={title:"Spec driven development",date:"2025-05-26",outcome:"ongoing",summary:"Drive the AI-native Clickable Concept from executable specs (OpenAPI, Arazzo, Gherkin, agent cards) instead of hand-written code."};function vf(e){const t={a:"a",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",ul:"ul",...e.components};return c(ce,{children:[c(t.h2,{children:"Problem"}),`
`,c(t.p,{children:"Today the code is the single source of truth, and the documentation and specification live somewhere on the side, written ad hoc. Most of the time we don't even have a real specification, or the one we have has drifted so far from the code it's actively misleading."}),`
`,c(t.p,{children:"Keeping a specification and the documentation around it up to date is expensive. Someone has to remember to write it. Someone has to remember to update it when the code changes. Reviews take longer because two artefacts have to agree. The cost compounds with every team and every service."}),`
`,c(t.h2,{children:"Assumptions"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"Today's spec-driven-development frameworks are weak and incomplete. None of them are good enough to use out of the box."}),`
`,c(t.li,{children:"With a small set of internal house rules on top of the existing tooling, we can flip the source of truth: the specification becomes primary, and the code derives from it."}),`
`,c(t.li,{children:"Drift detection between the spec and the code is unavoidable. Whatever workflow we land on has to surface drift automatically, not rely on humans to notice."}),`
`,c(t.li,{children:"Owning the specification is a shared responsibility between UX, dev, and PM. Not a hand-off, not a deliverable from one role to another, all three in the same document."}),`
`]}),`
`,c(t.h2,{children:"Main learnings"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"With good specifications, most of the boilerplate code can be generated."}),`
`,c(t.li,{children:"Most of the tests can be generated too, straight from the same specs."}),`
`,c(t.li,{children:"Simple domain agents can be 90%+ generated."}),`
`]}),`
`,c(t.p,{children:"We ran the experiment across the generated outputs — agent, backend, and package — and counted where every line came from. Codegen outputs and specs together account for 74% of the lines; within the implementation outputs themselves, the split is 97% codegen and 3% agent-written implementation."}),`
`,c("img",{src:"/experiments/spec-driven-development/loc-by-provenance.svg",alt:"Horizontal bar chart of lines of code by provenance: codegen outputs 52,409 (51.4%), specs 23,505 (23.0%), shared tooling 22,590 (22.2%), agent outputs 1,868 (1.8%), domain context 1,608 (1.6%)."}),`
`,c(t.h2,{children:"Approach"}),`
`,c(t.p,{children:"When we build with AI, four things have to be in place:"}),`
`,c(t.ul,{children:[`
`,c(t.li,{children:"a way to specify what we want,"}),`
`,c(t.li,{children:"a way to restrict the AI to valid tools and inputs,"}),`
`,c(t.li,{children:"a way to validate that the output is correct,"}),`
`,c(t.li,{children:"building blocks the AI can compose."}),`
`]}),`
`,c(t.p,{children:"A good specification covers more than one of these at once. The same artefact says what we want, constrains the agent, and gives us something to validate against. The fewer documents that have to agree, the less drift there is to police."}),`
`,c(t.p,{children:["Existing spec-driven-development frameworks like GitHub's ",c(t.a,{href:"https://github.com/github/spec-kit",children:"spec-kit"})," stop at the first one. You write a markdown specification and call it done. That is roughly 10% of the full story."]}),`
`,c(t.h2,{children:"What we built"}),`
`,c(t.p,{children:["A backend driven entirely by executable specs, plus a ",c(t.a,{href:"/experiments/domain-agent",children:"Domain Agent"})," on top that uses those same specs as its contract with the world. The backend is described below; the agent has its own write-up."]}),`
`,c(t.h3,{children:"Backend"}),`
`,c(t.p,{children:"For the backend we layered four executable specs. Each one pulls double duty across the four aspects above."}),`
`,c(t.h4,{children:"For domain entities: JSON Schema"}),`
`,c(t.p,{children:"One JSON Schema file per entity describes the shape of everything in the domain. The same file feeds the API schemas, the validation layer, and the data factories used in tests."}),`
`,c(t.h4,{children:"For the API surface: OpenAPI"}),`
`,c(t.p,{children:["OpenAPI defines the endpoints. From it we generate the server, controllers, action layer, request and response schemas, and validation. We feed the same spec to ",c(t.a,{href:"https://schemathesis.readthedocs.io/",children:"Schemathesis"})," to get property-based contract tests for free, so the API can't quietly drift away from what's documented."]}),`
`,c(t.h4,{children:"For the database: JSON Schema"}),`
`,c(t.p,{children:"A second set of JSON Schemas describes the persistence layer. Same trick as the domain entities: one file, multiple generated artefacts."}),`
`,c(t.h4,{children:"For workflows: Arazzo"}),`
`,c(t.p,{children:[c(t.a,{href:"https://spec.openapis.org/arazzo/latest.html",children:"Arazzo"})," describes the multi-step flows a real customer goes through against the API. We execute them with ",c(t.a,{href:"https://redocly.com/respect",children:"Redocly Respect"}),", so the scenarios we care about run on every change as real end-to-end tests."]}),`
`,c(t.h4,{children:"For core business logic: input/output pairs"}),`
`,c(t.p,{children:"For the parts that don't fit a schema (the differ, which is the actual product), we keep curated input/output pairs. They double as the spec and the test suite for the business rules."}),`
`,c(t.h3,{children:"Domain agent"}),`
`,c(t.p,{children:["A thin agent on top of the backend that reuses the same specs as its tool definitions, workflow library, and test harness. Written up in its own experiment: ",c(t.a,{href:"/experiments/domain-agent",children:"Domain Agent"}),"."]})]})}function AA(e={}){const{wrapper:t}=e.components||{};return t?c(t,{...e,children:c(vf,{...e})}):vf(e)}const CA=Object.freeze(Object.defineProperty({__proto__:null,default:AA,frontmatter:dv},Symbol.toStringTag,{value:"Module"})),TA=Object.assign({"../experiments/clickable-concept.mdx":Ug,"../experiments/concurrent-updates.mdx":tv,"../experiments/council.mdx":nv,"../experiments/crazy8.mdx":sv,"../experiments/deep-research.mdx":av,"../experiments/domain-agent.mdx":iv,"../experiments/knowledge-base.mdx":ov,"../experiments/llm-usage-foundation.mdx":rv,"../experiments/meeting-recordings.mdx":lv,"../experiments/mutation-testing.mdx":cv,"../experiments/secure-development.mdx":uv,"../experiments/spec-driven-development.mdx":dv}),IA=Object.assign({"../experiments/clickable-concept.mdx":()=>Sn(()=>Promise.resolve().then(()=>b_),void 0),"../experiments/concurrent-updates.mdx":()=>Sn(()=>Promise.resolve().then(()=>oA),void 0),"../experiments/council.mdx":()=>Sn(()=>Promise.resolve().then(()=>lA),void 0),"../experiments/crazy8.mdx":()=>Sn(()=>Promise.resolve().then(()=>uA),void 0),"../experiments/deep-research.mdx":()=>Sn(()=>Promise.resolve().then(()=>hA),void 0),"../experiments/domain-agent.mdx":()=>Sn(()=>Promise.resolve().then(()=>pA),void 0),"../experiments/knowledge-base.mdx":()=>Sn(()=>Promise.resolve().then(()=>gA),void 0),"../experiments/llm-usage-foundation.mdx":()=>Sn(()=>Promise.resolve().then(()=>yA),void 0),"../experiments/meeting-recordings.mdx":()=>Sn(()=>Promise.resolve().then(()=>wA),void 0),"../experiments/mutation-testing.mdx":()=>Sn(()=>Promise.resolve().then(()=>SA),void 0),"../experiments/secure-development.mdx":()=>Sn(()=>Promise.resolve().then(()=>_A),void 0),"../experiments/spec-driven-development.mdx":()=>Sn(()=>Promise.resolve().then(()=>CA),void 0)});function EA(e){return e.replace(/^.*\//,"").replace(/\.mdx$/,"")}const fo=Object.entries(TA).map(([e,t])=>({slug:EA(e),...t})).sort((e,t)=>t.date.localeCompare(e.date));function hv(e){return fo.find(t=>t.slug===e)}function LA(e){const t=IA[`../experiments/${e}.mdx`];return t?t().then(n=>n.default):null}function OA(e){const t=hv(e);return(t==null?void 0:t.outcome)==="ongoing"}const NA=`@backend
Feature: Backend mode - BMW campaign conflict resolution
  As a content editor using the backend-powered proto
  I want the same conflict resolution experience as InMemory mode
  So that the backend integration works end-to-end

  Background:
    Given the application is loaded in backend mode
    And the backend has a seeded BMW campaign

  @smoke
  Scenario: Locale overview shows Needs review when base is ahead
    When I open the campaign from the list
    Then the base version should be visible
    And at least one translation locale should show "Needs review" status

  @smoke
  Scenario: Conflict resolution shows actual conflicts when locale is behind
    When I open the campaign from the list
    And I click the "Needs review" status for the first unresolved locale
    Then the conflict resolution header should show conflicts remaining
    And the 3-column view should be visible with blocks

  Scenario: Conflict resolution shows correct conflict count
    When I open the campaign from the list
    And I click the "Needs review" status for the first unresolved locale
    Then the conflict count should match the locale's actual diffs

  Scenario: Base column shows blocks
    When I open the campaign from the list
    And I click the "Needs review" status for the first unresolved locale
    Then the base column should show blocks with content

  Scenario: Locale column shows blocks
    When I open the campaign from the list
    And I click the "Needs review" status for the first unresolved locale
    Then the locale column should show blocks with content

  Scenario: Accept all safe changes resolves structure conflicts
    When I open the campaign from the list
    And I click the "Needs review" status for the first unresolved locale
    And I click accept all safe changes in backend mode
    Then the resolved count should increase

  Scenario: Navigate back to overview preserves state
    When I open the campaign from the list
    And I click the "Needs review" status for the first unresolved locale
    And I click cancel in conflict resolution
    Then the locale overview should be visible
    And at least one translation locale should show "Needs review" status

  @bug
  Scenario: Edit base, mark as ready, then conflicts are visible
    When I open the campaign from the list
    And I open the base editor
    And I edit a block text field
    And I click save draft in backend mode
    And I click mark as ready in backend mode
    And I navigate to the locale overview
    Then at least one translation locale should show "Needs review" status
    When I click the "Needs review" status for the first unresolved locale
    Then the conflict resolution header should show conflicts remaining
    And the 3-column view should be visible with blocks
`,PA=`@backend-persistence @phase4 @bug
Feature: Mutations persist through campaign-backend to MongoDB
  As a developer using the playground
  I want every edit, draft, release and resolution to be saved on the backend
  So that page reloads preserve my work
  And the campaign-backend MongoDB is the single source of truth

  # Architectural contract:
  # - vite.config.ts proxies "/backend/*" → http://localhost:3300 (campaign-backend)
  # - HTTP Basic Auth header is injected by the vite proxy from
  #   CAMPAIGN_BACKEND_BASIC_AUTH_USERNAME / _PASSWORD
  # - Every mutating json-render action ("saveDraft", "markAsReady",
  #   "saveResolutions", "createLocale", "deleteLocale", "createBlock",
  #   "updateBlock", "deleteBlock") MUST issue the corresponding
  #   backend call BEFORE updating local state. If the backend rejects,
  #   the local state stays unchanged and a notification is shown.
  # - On view-load (App.vue's onHashChange) the relevant resources are
  #   fetched from the backend instead of using the spec's static
  #   initialState. The spec's initialState is only a fallback for the
  #   first ever load (empty MongoDB).

  Background:
    Given the campaign-backend is running at "/backend"
    And the campaign exists in MongoDB for use case "change-text"

  @smoke
  Scenario: Save Draft writes blocks to MongoDB and survives reload
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor
    When I edit block "b1" via the modal and set its text to "Persisted draft"
    And I click "Save Draft"
    Then a POST request was made to "/backend/campaigns/{id}/locales/default/versions"
    And the version history should contain a new draft entry
    When I reload the page
    Then I should see block "b1" with the text "Persisted draft"
    And the version history should still contain the draft entry

  @smoke
  Scenario: Mark as Ready transitions the version on the backend
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor
    And a draft entry exists in the history
    When I click "Mark as Ready" on the default locale editor
    Then a PATCH request was made to mark the latest version "ready"
    When I reload the page
    Then the latest version history entry should have state "ready"

  Scenario: Creating a locale persists it to the backend
    Given the application is loaded with use case "add-block"
    And I am on the locale overview
    When I click "Create Locale"
    And I select the locale "ja-JP" in the create-locale dialog
    Then a POST request was made to "/backend/campaigns/{id}/locales"
    And I should see a row for the "ja-JP" locale
    When I reload the page
    Then I should still see a row for the "ja-JP" locale

  Scenario: Apply resolutions persists the synced locale
    Given the application is loaded with use case "pre-existing-conflicts"
    When I click on the "de-DE" locale row
    And I resolve all conflicts
    And I click "Apply resolutions"
    Then a POST request was made to "/backend/campaigns/{id}/locales/de-DE/versions"
    And the "de-DE" locale should show "Synced" status
    When I reload the page
    Then the "de-DE" locale should still show "Synced" status

  Scenario: Backend failure surfaces a notification and leaves state intact
    # When the backend returns a 5xx, the optimistic local update must
    # roll back and the user gets a visible error notification.
    Given the application is loaded with use case "change-text"
    And the backend will respond 500 to the next mutation
    And I am on the default locale editor
    When I click "Save Draft"
    Then I should see a notification with tone "critical"
    And the version history should NOT contain a new entry

  Scenario: First load with empty MongoDB falls back to spec initialState
    # The spec's initialState is the seed for a fresh use case.
    # After the first save, the backend becomes authoritative.
    Given the MongoDB database is empty for use case "change-text"
    When the application is loaded with use case "change-text"
    Then I should see the blocks defined in the spec initialState
    When I click "Save Draft"
    And I reload the page
    Then subsequent loads should read from the backend, not the spec
`,BA=`@phase5 @conflict-resolution @bug
Feature: Resolved conflict cards retain block content visibility
  As a locale team member resolving conflicts
  I want to still see the chosen content after accepting base or locale
  So that I can verify my resolution choice and maintain context

  Background:
    Given the application is loaded with use case "pre-existing-conflicts"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible

  # ═══════════════════════════════════════════════════════════════════════════════
  # View mode: 3 Columns — Accept in center
  # ═══════════════════════════════════════════════════════════════════════════════

  Scenario: [3col-center] Accepting base shows the base content in the resolved card
    When I switch the view mode to "3 Columns — Accept in center"
    And I accept the base version on the first conflict card
    Then the resolved conflict card should display the accepted base content

  Scenario: [3col-center] Accepting locale shows the locale content in the resolved card
    When I switch the view mode to "3 Columns — Accept in center"
    And I accept the locale version on the first conflict card
    Then the resolved conflict card should display the accepted locale content

  # ═══════════════════════════════════════════════════════════════════════════════
  # View mode: 2 Columns
  # ═══════════════════════════════════════════════════════════════════════════════

  Scenario: [2col] Accepting base shows the base content in the resolved card
    When I switch the view mode to "2 Columns"
    And I accept the base version on the first conflict card
    Then the resolved conflict card should display the accepted base content

  Scenario: [2col] Accepting locale shows the locale content in the resolved card
    When I switch the view mode to "2 Columns"
    And I accept the locale version on the first conflict card
    Then the resolved conflict card should display the accepted locale content
`,DA=`@conflict-persistence
Feature: Resolved conflicts stay resolved after base edits
  As a locale team member
  I want my resolved conflicts to stay resolved
  So that I only need to handle NEW changes after a base edit

  Background:
    Given the application is loaded with use case "add-block"

  Scenario: Synced locale stays synced during draft edits
    # Resolve all conflicts for de-DE → synced
    When I click on the "de-DE" locale row
    And I resolve all conflicts
    And I click "Apply resolutions"
    Then the "de-DE" locale should show "Synced" status
    # Navigate to editor via UI (no page reload)
    When I click on the base editor
    And I have made an edit to a block
    # Navigate back — locale should still be synced
    When I go back to the locale overview via breadcrumb
    Then the "de-DE" locale should show "Synced" status
`,RA=`@create-locale
Feature: Create Locale starts with clean v1 version
  As a content editor
  I want new locales to always start at v1
  So that each locale has its own independent version history

  Background:
    Given the application is loaded with use case "add-block"

  Scenario: New locale version is v1 regardless of base version
    When I click "Create Locale"
    And I select the locale "fr-FR" in the create-locale dialog
    Then I should see a row for the "fr-FR" locale
    And the "fr-FR" locale version should be "v1"

  Scenario: New locale editor shows clean v1 history
    When I click "Create Locale"
    And I select the locale "fr-FR" in the create-locale dialog
    And I open the locale editor for "fr-FR"
    Then the locale editor version history should show exactly one entry
    And the version history entry should show "v1"

  Scenario: Version history entries never show double-v prefix
    When I click "Create Locale"
    And I select the locale "fr-FR" in the create-locale dialog
    And I open the locale editor for "fr-FR"
    Then the version history should not contain "vv"
`,MA=`@phase3 @distribution
Feature: Distribution Paths
  As the system
  I want to route versions through translation or direct paths
  So that locale teams receive properly processed content

  @smoke @translation
  Scenario: Translation path - locale overview shows Translating for in-flight translations
    Given the application is loaded with use case "version-history"
    Then the "de-DE" locale should show "Under translation" status
    And the "es-ES" locale should show "needs review" status
    And the "fr-FR" locale should show "Under translation" status
    And the "it-IT" locale should show "Under translation" status
    And the "ja-JP" locale should show "needs review" status

  Scenario: Translation path - version becomes ready after Mark as Ready
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor
    And a draft entry exists in the history
    When I click "Mark as Ready"
    Then the version entry should have state "ready"

  Scenario: Translation path - translations complete over time
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor
    And a draft entry exists in the history
    When I click "Mark as Ready"
    And I wait for translation to complete
    And I navigate to the locale overview
    Then no locale should show "Under translation" status

  @smoke @direct
  Scenario: Direct path - version transitions to ready immediately
    Given the application is loaded with use case "no-translations"
    And I am on the default locale editor
    And a draft entry exists in the history
    When I click "Mark as Ready"
    Then the version entry should have state "ready"

  Scenario: Direct path - locale overview accessible after release
    Given the application is loaded with use case "no-translations"
    And I am on the default locale editor
    And a draft entry exists in the history
    When I click "Mark as Ready"
    And I navigate to the locale overview
    Then the locale table should be visible
`,$A=`@e-language
Feature: Language-specific content filtering
  As a user viewing locale-specific content
  I want to see only the content relevant to the selected locale
  So that the preheader and other multi-language blocks are readable

  Background:
    Given the application is loaded with use case "bmw-campaign"

  @smoke
  Scenario: Default locale editor shows only English content
    And I am on the default locale editor
    Then the preheader block should show English content
    And the preheader block should not show Bulgarian content
    And the preheader block should not show French content

  Scenario: 3-column Accept on Sides view shows only German content for DE-DE
    And I navigate to the locale overview
    When I open conflict resolution for "DE-DE"
    And I select view mode "3col-side"
    Then the preheader block should show German content
    And the preheader block should not show Bulgarian content
    And the preheader block should not show French content

  Scenario: 3-column Inline Diffs view shows only German content for DE-DE
    And I navigate to the locale overview
    When I open conflict resolution for "DE-DE"
    And I select view mode "3col-side-inline"
    Then the preheader block should show German content
    And the preheader block should not show Bulgarian content

  Scenario: 3-column Accept in Center view shows only German content for DE-DE
    And I navigate to the locale overview
    When I open conflict resolution for "DE-DE"
    And I select view mode "3col-center"
    Then the preheader block should show German content
    And the preheader block should not show Bulgarian content

  Scenario: 2-column view shows only German content for DE-DE
    And I navigate to the locale overview
    When I open conflict resolution for "DE-DE"
    And I select view mode "2col"
    Then the preheader block should show German content
    And the preheader block should not show Bulgarian content
`,jA=`@phase1 @editing
Feature: Default Locale Editor - Editing and Drafts
  As a Central Team campaign manager
  I want to edit content blocks and save drafts
  So that I can prepare changes before releasing them to locale teams

  Background:
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor

  @smoke
  Scenario: Block cards render with type labels
    Then I should see content block cards
    And I should see type labels on block cards

  Scenario: Edit modal opens and modifies a field
    When I click "Edit" on the first block card
    Then the edit block modal should be visible
    And the modal should contain editable text fields

  Scenario: Saving an edit in the modal
    When I click "Edit" on the first block card
    And I modify the first text field to "Updated content"
    And I click "Save changes" in the modal
    Then the modal should close

  Scenario: Cancelling an edit does not affect pending ops count
    Given I note the pending ops count
    When I click "Edit" on the first block card
    And I modify the first text field to "Temporary content"
    And I close the modal without saving
    Then the pending ops count should not have changed

  Scenario: Op deduplication - editing the same block twice does not add a second op
    When I click "Edit" on the first block card
    And I modify the first text field to "First edit"
    And I click "Save changes" in the modal
    Given I note the pending ops count
    When I click "Edit" on the first block card
    And I modify the first text field to "Second edit"
    And I click "Save changes" in the modal
    Then the pending ops count should not have changed

  Scenario: Version history panel shows pending changes
    Then the editing history panel should be visible
    And it should display entries with state badges

  @smoke
  Scenario: Save Draft creates a new version history entry
    Given I have made an edit to a block
    When I click "Save Draft"
    Then a new entry should appear in the editing history
    And the new entry should have state "draft snapshot"

  Scenario: Save Draft is disabled when no unsaved changes exist
    Then the "Save Draft" button should be disabled

  Scenario: Version history panel shows entries with state badges
    Then the editing history panel should be visible
    And it should display entries with state badges

  Scenario: Personalization validation available in 3-dot menu
    When I open the 3-dot menu
    Then I should see a "Validate Personalization" option
`,VA=`@phase-e2e @empty-campaign
Feature: End-to-end empty campaign lifecycle
  As a Central Team campaign manager
  I want to bootstrap a brand-new campaign from scratch
  So that I can prove the full edit → release → fork → drift loop

  Background:
    Given the application is loaded with use case "empty"

  @smoke
  Scenario: Build base, fork a locale, then drift and surface conflicts
    # 1. Empty campaign starts with zero blocks
    Given I am on the default locale editor
    Then I should see 0 block cards

    # 2. Add three blocks from the picker
    When I open the editor menu
    And I add a block with template "tpl_hero"
    And I open the editor menu
    And I add a block with template "tpl_text"
    And I open the editor menu
    And I add a block with template "tpl_cta"
    Then I should see 3 block cards

    # 3. Save as draft
    When I click "Save Draft"
    Then I should see a "draft snapshot" entry in the version history

    # 4. Mark the latest draft as ready
    When I click "Mark as Ready"
    Then the latest entry should transition to "ready" state

    # 5. Create a new locale forked from the current base
    When I switch to the locale overview
    And I click "Create Locale"
    And I select the locale "hu-HU" in the create-locale dialog
    Then I should see a row for the "hu-HU" locale
    And the "hu-HU" locale should show "Synced" status

    # 6. Edit the locale: add a new block and save + ready
    When I open the locale editor for "hu-HU"
    And I open the editor menu
    And I add a block with template "tpl_image"
    And I click "Save Draft"
    And I click "Mark as Ready"
    Then the latest entry should transition to "ready" state

    # 7. Edit the base: add another block, save + ready (so base advances past the locale's fork point)
    When I switch to the default locale editor
    And I open the editor menu
    And I add a block with template "tpl_feature"
    And I click "Save Draft"
    And I click "Mark as Ready"
    Then the latest entry should transition to "ready" state

    # 8. The locale now lags behind the new base version → conflict surfaces in the overview
    When I switch to the locale overview
    Then the "hu-HU" locale should show "needs review" status
`,FA=`@phase5 @incoming-changes
Feature: Incoming Changes From Base block is read-only
  As a locale team member resolving conflicts
  I expect the "Incoming changes from base" summary block to be informational only
  So that I am not confused by duplicate action buttons outside the resolution area

  Background:
    Given the application is loaded with use case "pre-existing-conflicts"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible

  Scenario: [3col-side] No action buttons in the incoming changes block
    When I switch the view mode to "3 Columns — Accept on sides"
    Then the "Incoming changes from base" block should have no action buttons

  Scenario: [3col-inline] No action buttons in the incoming changes block
    When I switch the view mode to "3 Columns — Inline diffs"
    Then the "Incoming changes from base" block should have no action buttons

  Scenario: [3col-center] No action buttons in the incoming changes block
    When I switch the view mode to "3 Columns — Accept in center"
    Then the "Incoming changes from base" block should have no action buttons

  Scenario: [2col] No action buttons in the incoming changes block
    When I switch the view mode to "2 Columns"
    Then the "Incoming changes from base" block should have no action buttons
`,WA=`@phase5 @locale-resolution
Feature: Locale Overview and Conflict Resolution
  As a locale team member
  I want to see locale sync status and resolve conflicts
  So that my locale stays up to date with the latest base version

  Background:
    Given the application is loaded with use case "pre-existing-conflicts"

  @smoke
  Scenario: BMW campaign overview shows correct status names
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    Then the "de-DE" locale should show "needs review" status
    And the "fr-FR" locale should show "AI generated" status
    And no locale should show "conflicts" status
    And no locale should show "Translating" status
    Given the application is loaded with use case "version-history"
    Then the "de-DE" locale should show "Under translation" status

  @smoke
  Scenario: Locale table renders with expected columns
    Then the locale table should be visible
    And the table headers should be "Locale, Locale version, Fork point, Status, Last updated"

  Scenario: Locale rows show flag and locale information
    Then each locale row should show a flag emoji
    And each locale row should show the locale code

  Scenario: Locales behind base version show conflict status
    Then the "de-DE" locale should show "needs review" status
    And the "fr-FR" locale should show "needs review" status
    And the "es-ES" locale should show "needs review" status

  Scenario: Clicking locale row opens conflict resolution view
    When I click on the "de-DE" locale row
    Then the conflict resolution view should be visible

  Scenario: Conflict resolution view shows resolution sections
    When I click on the "de-DE" locale row
    Then the conflict view should show at least one section: Structure Changes, Content Changes, or Personalization Changes

  Scenario: Resolution counter starts at zero
    When I click on the "de-DE" locale row
    Then the resolution counter should show "0" resolved

  Scenario: Accept all safe changes auto-resolves structure items
    When I click on the "de-DE" locale row
    And the conflict view has an "Accept all safe changes" button
    And I click "Accept all safe changes"
    Then the resolution counter should increase

  @smoke
  Scenario: Resolving all conflicts and applying syncs the locale
    Given the application is loaded with use case "add-block"
    When I click on the "de-DE" locale row
    And I resolve all conflicts
    And I click "Apply resolutions"
    Then the conflict view should close
    And the "de-DE" locale should show "Synced" status

  @bug
  Scenario: Locale shows fork point when base version matches locale version
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v3"
    Then the "de-DE" locale fork point should show "v3/v3"

  @bug
  Scenario: Locale shows conflicts when base is ahead and has diffs
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    Then the "de-DE" locale should show "needs review" status
    And the "de-DE" locale fork point should show "v3/v4"

  @bug
  Scenario: Accepting a conflicting block in base updates the proposed order column in 3-col side view
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    And the view mode should be "3 Columns — Accept on sides"
    When I accept the first conflicting block in the base column
    Then the proposed order column should show the base content for the accepted block

  @bug
  Scenario: Apply resolutions becomes clickable only when all changes are resolved manually
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    And the "Apply resolutions" button should be disabled
    When I manually resolve every change in the columns
    Then the resolution counter should show all resolved
    And the "Apply resolutions" button should be enabled
    And the "Accept all safe changes" banner should not be visible

  @bug
  Scenario: Apply resolutions becomes clickable after accept all safe changes plus manual conflict resolution
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I click "Accept all safe changes"
    Then the resolution counter should not show all resolved
    And the "Apply resolutions" button should be disabled
    When I manually resolve every content conflict
    Then the resolution counter should show all resolved
    And the "Apply resolutions" button should be enabled
    And the "Accept all safe changes" banner should not be visible

  @bug
  Scenario: Accept all safe changes does not resolve content conflicts
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I click "Accept all safe changes"
    Then content conflicts should still be unresolved
    And the resolution counter should not show all resolved
    And the "Apply resolutions" button should be disabled

  # ═══════════════════════════════════════════════════════════════════════════════
  # View mode: 3 Columns — Inline diffs
  # ═══════════════════════════════════════════════════════════════════════════════

  @bug
  Scenario: [3col-inline] Apply resolutions becomes clickable only when all changes are resolved manually
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "3 Columns — Inline diffs"
    Then the "Apply resolutions" button should be disabled
    When I manually resolve every change in the columns
    Then the resolution counter should show all resolved
    And the "Apply resolutions" button should be enabled
    And the "Accept all safe changes" banner should not be visible

  @bug
  Scenario: [3col-inline] Apply resolutions becomes clickable after accept all safe changes plus manual conflict resolution
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "3 Columns — Inline diffs"
    And I click "Accept all safe changes"
    Then the resolution counter should not show all resolved
    And the "Apply resolutions" button should be disabled
    When I manually resolve every content conflict
    Then the resolution counter should show all resolved
    And the "Apply resolutions" button should be enabled
    And the "Accept all safe changes" banner should not be visible

  @bug
  Scenario: [3col-inline] Accept all safe changes does not resolve content conflicts
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "3 Columns — Inline diffs"
    And I click "Accept all safe changes"
    Then content conflicts should still be unresolved
    And the resolution counter should not show all resolved
    And the "Apply resolutions" button should be disabled

  # ═══════════════════════════════════════════════════════════════════════════════
  # View mode: 3 Columns — Accept in center
  # ═══════════════════════════════════════════════════════════════════════════════

  @bug
  Scenario: [3col-center] Apply resolutions becomes clickable only when all changes are resolved manually
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "3 Columns — Accept in center"
    Then the "Apply resolutions" button should be disabled
    When I manually resolve every change in the columns
    Then the resolution counter should show all resolved
    And the "Apply resolutions" button should be enabled
    And the "Accept all safe changes" banner should not be visible

  @bug
  Scenario: [3col-center] Apply resolutions becomes clickable after accept all safe changes plus manual conflict resolution
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "3 Columns — Accept in center"
    And I click "Accept all safe changes"
    Then the resolution counter should not show all resolved
    And the "Apply resolutions" button should be disabled
    When I manually resolve every content conflict
    Then the resolution counter should show all resolved
    And the "Apply resolutions" button should be enabled
    And the "Accept all safe changes" banner should not be visible

  @bug
  Scenario: [3col-center] Accept all safe changes does not resolve content conflicts
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "3 Columns — Accept in center"
    And I click "Accept all safe changes"
    Then content conflicts should still be unresolved
    And the resolution counter should not show all resolved
    And the "Apply resolutions" button should be disabled

  # ═══════════════════════════════════════════════════════════════════════════════
  # View mode: 2 Columns
  # ═══════════════════════════════════════════════════════════════════════════════

  @bug
  Scenario: [2col] Apply resolutions becomes clickable only when all changes are resolved manually
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "2 Columns"
    Then the "Apply resolutions" button should be disabled
    When I manually resolve every change in the columns
    Then the resolution counter should show all resolved
    And the "Apply resolutions" button should be enabled
    And the "Accept all safe changes" banner should not be visible

  @bug
  Scenario: [2col] Apply resolutions becomes clickable after accept all safe changes plus manual conflict resolution
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "2 Columns"
    And I click "Accept all safe changes"
    Then the resolution counter should not show all resolved
    And the "Apply resolutions" button should be disabled
    When I manually resolve every content conflict
    Then the resolution counter should show all resolved
    And the "Apply resolutions" button should be enabled
    And the "Accept all safe changes" banner should not be visible

  @bug
  Scenario: [2col] Accept all safe changes does not resolve content conflicts
    Given the application is loaded with use case "bmw-campaign"
    When I select base version "v4"
    And I click on the "de-DE" locale row
    Then the conflict resolution view should be visible
    When I switch the view mode to "2 Columns"
    And I click "Accept all safe changes"
    Then content conflicts should still be unresolved
    And the resolution counter should not show all resolved
    And the "Apply resolutions" button should be disabled

  Scenario: Synced locales show Synced status badge
    Given the application is loaded with use case "change-text"
    And I click "Mark as Ready" on the default locale editor
    And I wait for translation to complete
    And I navigate to the locale overview
    Then the "de-DE" locale should show "needs review" status
    And the "fr-FR" locale should show "needs review" status
    And the "es-ES" locale should show "needs review" status
`,HA=`@phase2 @release
Feature: Mark as Ready - Release Trigger
  As a Central Team campaign manager
  I want to mark a version as ready for distribution
  So that locale teams can receive and review the changes

  Background:
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor

  @smoke
  Scenario: Mark as Ready transitions latest draft to ready
    Given a draft entry exists in the history
    When I click "Mark as Ready"
    Then the latest entry should transition to "ready" state
    And the entry should show "Pers validated" indicator

  Scenario: Mark as Ready auto-creates version when editor is dirty
    Given I have made an edit to a block
    When I click "Mark as Ready"
    Then a new version entry should be created
    And it should transition to "ready" state

  Scenario: Mark as Ready button disabled when latest entry is already ready
    Given the latest version entry has state "ready"
    Then the "Mark as Ready" button should be disabled

  @phase2 @classification
  Scenario Outline: Use case "<useCase>" produces "<changeCategory>" change type
    Given the application is loaded with use case "<useCase>"
    When I click on a locale row with conflicts or overrides
    Then the conflict view should show "<changeCategory>" section

    Examples:
      | useCase               | changeCategory          |
      | add-block             | Structure Changes       |
      | remove-block          | Structure Changes       |
      | reorder-blocks        | Structure Changes       |
      | toggle-mobile         | Structure Changes       |
      | change-tokens         | Personalization Changes |
`,qA=`@smoke
Feature: Application Loading and Navigation
  As a user of the localization pipeline
  I want the application to load correctly and navigate between views
  So that I can access all features

  @smoke
  Scenario Outline: Use case "<useCase>" loads without errors
    Given the application is loaded with use case "<useCase>"
    Then the page should render without errors
    And the default locale editor should be accessible

    Examples:
      | useCase                   |
      | add-block                 |
      | change-text               |
      | change-tokens             |
      | change-variables          |
      | change-optionals          |
      | change-targeting          |
      | change-campaign-variables |
      | remove-block              |
      | reorder-blocks            |
      | toggle-mobile             |
      | no-translations           |
      | migration                 |
      | pre-existing-conflicts    |

  @smoke
  Scenario: Default view is the Locale overview
    Given the application is loaded with use case "change-text"
    Then I should be on the "Locale overview" view

  Scenario: Switching to Locale overview
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor
    When I navigate to the locale overview
    Then I should be on the "Locale overview" view
    And the locale table should be visible

  Scenario: Switching back to Default locale editor
    Given the application is loaded with use case "change-text"
    And I am on the locale overview
    When I navigate to the default locale editor
    Then I should be on the "Default locale editor" view
    And I should see content block cards

  Scenario: Use case selector changes data
    Given the application is loaded with use case "change-text"
    When I select use case "add-block" from the dropdown
    Then the page should render without errors
`,zA=`@state-reset @smoke
Feature: Use case state isolation
  As a user
  I want each use case to show only its own version history and data
  So that switching between use cases doesn't leak state

  Scenario: Switching from version-history to bmw-campaign resets base version
    Given the application is loaded with use case "version-history"
    Then the base version picker should show version "v13"
    When I select use case "bmw-campaign" from the dropdown
    Then the base version picker should show version "v4"
    And the base version picker should not contain "v13"

  Scenario: Switching use cases resets draft state
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor
    And I have made an edit to a block
    When I select use case "bmw-campaign" from the dropdown
    And I am on the default locale editor
    Then the editor should not show unsaved changes

  Scenario: Version history resets when switching use cases
    Given the application is loaded with use case "version-history"
    And I am on the default locale editor
    Then the version history should show entries with versions starting from "v10"
    Given the application is loaded with use case "change-text"
    And I am on the default locale editor
    Then the version history should not show any version above "v5"
`,UA=`@translation-flow
Feature: Mark as Ready triggers translation and updates version picker
  As a content editor
  I want new ready versions to appear in the base version picker
  And I want to see the translation progress on locale rows
  So that I know when locales have received the latest content

  Background:
    Given the application is loaded with use case "add-block"
    And I am on the default locale editor

  Scenario: New ready version appears in base version picker
    Given a draft entry exists in the history
    When I click "Mark as Ready"
    And I wait for the version to become ready
    Then the version entry should have state "ready"
    When I go back to the locale overview via breadcrumb
    Then the base version picker should contain the new version

  Scenario: Mark as Ready starts translation for all locales
    And I have made an edit to a block
    When I click "Mark as Ready"
    And I wait for the version to become ready
    And I go back to the locale overview via breadcrumb
    Then at least one locale should show "Under translation" status

  Scenario: Translation completes over time and locales become available
    Given a draft entry exists in the history
    When I click "Mark as Ready"
    And I go back to the locale overview via breadcrumb
    And I wait for translation to complete
    Then no locale should show "Under translation" status

  Scenario: Locale version dropdown shows new version after translation completes
    Given a draft entry exists in the history
    When I click "Mark as Ready"
    And I wait for the version to become ready
    And I go back to the locale overview via breadcrumb
    And I wait for translation to complete
    Then the locale version dropdowns should include the new version
`,GA=`@navigation @use-case-list @bug
Feature: Use case picker and navigation hierarchy
  As a developer exploring the change-delegation playground
  I want a home screen that lists all available use cases
  And a consistent navigation hierarchy across views
  So that I can pick a scenario without typing URL hashes
  And I can always find my way back to the use case list

  Background:
    Given the application is loaded with no use case selected

  @smoke
  Scenario: Home view lists all available use cases
    # The home view (URL "/" with empty hash) shows a list of every
    # use case the playground knows about. Mirrors the use-case-list
    # in campaign-frontend: each item shows the use-case id and a
    # one-line description.
    Then I should see the heading "Choose a use case"
    And I should see a list with at least 13 use case items
    And each use case item should show its name and a description
    And each use case item should be clickable

  @smoke
  Scenario: Clicking a use case navigates to its locale overview
    When I click on the "change-text" use case in the list
    Then the URL hash should be "change-text/locale-overview"
    And I should see the locale overview for "change-text"

  @smoke
  Scenario: The locale overview view exposes a "back to use cases" link
    Given the application is loaded with use case "change-text"
    Then I should see a "← Use cases" navigation link
    When I click "← Use cases"
    Then I should be back on the use case list home view
    And the URL hash should be empty

  @smoke
  Scenario: Breadcrumb shows the navigation hierarchy
    # Every non-home view shows a breadcrumb of the form
    # "Use cases / <use-case-id> / <view>"
    Given the application is loaded with use case "change-text"
    Then I should see a breadcrumb containing "Use cases"
    And the breadcrumb should contain "change-text"
    And the breadcrumb should contain "Locale overview"
    When I navigate to the default locale editor
    Then the breadcrumb should contain "Default locale editor"

  Scenario: The use case list survives a page reload
    # The home view is reachable both by clicking the back link
    # and by navigating directly to "/" — both must render the list.
    When I reload the page
    Then I should see the heading "Choose a use case"
    And I should see a list with at least 13 use case items
`,KA="0.3.0",YA="Campaign Agent",XA="Campaign operations assistant for creating and finding campaigns, selecting templates, managing locales and version history, comparing locale changes, producing reviewable change plans, serving plan previews, and coordinating batch reads/writes against the campaign backend.",JA="http://localhost:15001/",QA="0.1.0",ZA={streaming:!0,pushNotifications:!1,stateTransitionHistory:!1},eC=["text/plain"],tC=["application/json","text/plain"],nC=[{id:"change-delegation",name:"Change Delegation",description:"Handles campaign discovery and lifecycle flows, locale setup, version lookup, and change-delegation context. Can list/get/create campaigns, inspect locales and versions, retrieve immutable version snapshots, and batch dependent backend calls. For content changes, it coordinates with the plan-first policy rather than applying edits blindly.",tags:["campaigns","localization","i18n"],examples:["List all campaigns and return only their names.","Find the BMW Post-Service campaign and show its id, templateId, and fallback locale.","Create a campaign called Spring Sale 2026 using template tmpl-promo and fallback locale en-US.","After creating the campaign, add German and Italian locales from the default/base version.","Show me all locales for campaign cmp_123 and their latest version numbers.","Show me the version history of the Holiday 2026 default locale.","Get campaign cmp_123 locale de-DE version 3 so I can inspect its blocks.","Use a batch request to fetch campaign details, locales, and latest version metadata together."],"x-bindings":[{type:"arazzo",file:"../../services/campaign-backend/api/workflows/campaign-creation/workflow.yaml",workflowId:"campaignCreation",informational:!0,"x-note":"Informational only: the campaign-backend workflow engine runs this workflow at runtime."}],"x-tools":[{type:"openapi",file:"../../services/campaign-backend/api/backend.openapi.yaml",includeOperationIds:["listCampaigns","getCampaign","createCampaign","listLocales","listVersions","getVersion","executeBatch"]}],"x-skill":"../skills/change-delegation/SKILL.md"},{id:"image-assets",name:"Image Assets",description:"Find campaign image fields and respond with the image file/reference value as a usable path or link, not just raw JSON. Covers latest and versioned block images such as hero, logo, teaser, and other image content fields.",tags:["images","assets","blocks","media","files"],examples:["Show me the hero image for the BMW campaign default locale.","What image file is used by block 111_001_HEADER_HERO?","Get the logo image from campaign cmp_123 locale en-US.","Return the image asset reference for the latest header hero block, not JSON only."],"x-tools":[{type:"openapi",file:"../../services/campaign-backend/api/backend.openapi.yaml",includeOperationIds:["listCampaigns","getCampaign","listLocales","listVersions","getVersion","listLatestBlocks","getLatestBlock","listLatestBlockImages","getLatestBlockImage","listVersionBlocks","getVersionBlock","listVersionBlockImages","getVersionBlockImage"]}],"x-skill":"../skills/image-assets/SKILL.md","x-bindings":[{type:"arazzo",file:"../../services/campaign-backend/api/workflows/list-block-texts-batch/workflow.yaml",workflowId:"listBlockTextsBatch",informational:!0,"x-note":"Nearest existing block-content read workflow. Image asset lookup itself is performed through the OpenAPI image/block tools in this skill."}]},{id:"rendering",name:"Rendering",description:"Render campaign locale versions to backend-local HTML artifacts and return the backend htmlFileUrl exactly unchanged.",tags:["rendering","html","preview","file-url","artifact"],examples:["Render campaign cmp_123 locale de-DE version 2 and return the file URL.","Render the latest de-DE locale version and give me only the htmlFileUrl.","Preview the rendered HTML artifact for campaign cmp_123 default locale.","Do not paste HTML; just return the file:// render artifact URL."],"x-bindings":[{type:"arazzo",file:"../../services/campaign-backend/api/workflows/compare-versions/workflow.yaml",workflowId:"compareVersions",informational:!0,"x-note":"Nearest existing version-read workflow. Rendering is performed by the renderVersion OpenAPI operation in this skill."}],"x-tools":[{type:"openapi",file:"../../services/campaign-backend/api/backend.openapi.yaml",includeOperationIds:["listCampaigns","getCampaign","listLocales","listVersions","getVersion","renderVersion"]}],"x-skill":"../skills/rendering/SKILL.md"},{id:"plan",name:"Plan",description:"Enforces review-first locale change management. Compares locale versions, detects translation-impacting differences, creates and updates persisted change plans, returns plan preview links, and applies only when the customer explicitly asks. Use this for default-to-translation propagation, locale sync planning, and safe batch execution of approved changes.",tags:["plan","diff","delegation","locale-sync"],examples:["Compare default locale version 2 with version 3 and tell me what de-DE needs to update.","Create a persisted plan for syncing de-DE with the latest default-locale changes.","Show me the plan for campaign cmp_123 locale de-DE and include the preview URL.","Update the existing pending plan with this revised set of block edits.","Apply the pending plan for de-DE only if I explicitly approve it.","Create a review plan before changing headline text in the German locale.","Use batch execution for the approved plan, then summarize which block text/link/image fields changed."],"x-bindings":[{type:"arazzo",file:"../../services/campaign-backend/api/workflows/update-plan/workflow.yaml",workflowId:"updatePlan",informational:!0,"x-note":"Informational: documents the plan update flow."}],"x-tools":[{type:"openapi",file:"../../services/campaign-backend/api/backend.openapi.yaml",includeOperationIds:["compareLocales","createPlan","getPlan","updatePlan","executeBatch"]}],"x-skill":"../skills/plan/SKILL.md"},{id:"locale-sync-status",name:"Locale Sync Status",description:"Knowledge skill: determine a locale's sync status as two orthogonal dimensions (changeDelegationStatus × localeStatus), detect locales behind the base, detect locales with a pending locale-edit on the current head, and classify diff items as conflict vs autoaccept. Detection and classification logic; resolution mechanics live in the change-delegation skill.",tags:["locale-sync","diff","status"],examples:["Which locales are out of sync with the default locale?","Classify these diff items as conflict vs autoaccept.","Explain why de-DE is marked outofsync with a stale plan."],"x-skill":"../skills/locale-sync-status/SKILL.md"},{id:"change-plan-lifecycle",name:"Change Plan Lifecycle",description:"Knowledge skill: understand, communicate, and act on plan statuses (pending/rejected/applied), explain to the customer what stage a plan is at and what can happen next.",tags:["plan","lifecycle","status"],examples:["What does it mean that this plan is pending?","What can happen next to a rejected plan?","Explain the lifecycle of a change plan."],"x-skill":"../skills/change-plan-lifecycle/SKILL.md"}],sC={"$schema-comment":"Campaign Agent card. Change-plan rules live in domain/specs/agents/skills/plan/SKILL.md (shared skill library).",protocolVersion:KA,name:YA,description:XA,url:JA,version:QA,capabilities:ZA,defaultInputModes:eC,defaultOutputModes:tC,skills:nC},aC="0.3.0",iC="UI Agent",oC="Conversational campaign assistant that renders results to a canvas. Has the full campaign skillset (discovery, locales, versions, plans, rendering) and, when a visual answer helps, authors a json-render UI spec for the canvas instead of replying only in text.",rC="http://localhost:15002/",lC="0.1.0",cC={streaming:!0,pushNotifications:!1,stateTransitionHistory:!1},uC=["text/plain"],dC=["application/json","text/plain"],hC=[{id:"change-delegation",name:"Change Delegation",description:"Handles campaign discovery and lifecycle flows, locale setup, version lookup, and change-delegation context. Can list/get/create campaigns, inspect locales and versions, retrieve immutable version snapshots, and batch dependent backend calls. For content changes, it coordinates with the plan-first policy rather than applying edits blindly.",tags:["campaigns","localization","i18n"],examples:["List all campaigns and return only their names.","Find the BMW Post-Service campaign and show its id, templateId, and fallback locale.","Create a campaign called Spring Sale 2026 using template tmpl-promo and fallback locale en-US.","After creating the campaign, add German and Italian locales from the default/base version.","Show me all locales for campaign cmp_123 and their latest version numbers.","Show me the version history of the Holiday 2026 default locale.","Get campaign cmp_123 locale de-DE version 3 so I can inspect its blocks.","Use a batch request to fetch campaign details, locales, and latest version metadata together."],"x-bindings":[{type:"arazzo",file:"../../services/campaign-backend/api/workflows/campaign-creation/workflow.yaml",workflowId:"campaignCreation",informational:!0,"x-note":"Informational only: the campaign-backend workflow engine runs this workflow at runtime."}],"x-tools":[{type:"openapi",file:"../../services/campaign-backend/api/backend.openapi.yaml",includeOperationIds:["listCampaigns","getCampaign","createCampaign","listLocales","listVersions","getVersion","executeBatch"]}],"x-skill":"../skills/change-delegation/SKILL.md"},{id:"image-assets",name:"Image Assets",description:"Find campaign image fields and respond with the image file/reference value as a usable path or link, not just raw JSON. Covers latest and versioned block images such as hero, logo, teaser, and other image content fields.",tags:["images","assets","blocks","media","files"],examples:["Show me the hero image for the BMW campaign default locale.","What image file is used by block 111_001_HEADER_HERO?","Get the logo image from campaign cmp_123 locale en-US.","Return the image asset reference for the latest header hero block, not JSON only."],"x-tools":[{type:"openapi",file:"../../services/campaign-backend/api/backend.openapi.yaml",includeOperationIds:["listCampaigns","getCampaign","listLocales","listVersions","getVersion","listLatestBlocks","getLatestBlock","listLatestBlockImages","getLatestBlockImage","listVersionBlocks","getVersionBlock","listVersionBlockImages","getVersionBlockImage"]}],"x-skill":"../skills/image-assets/SKILL.md","x-bindings":[{type:"arazzo",file:"../../services/campaign-backend/api/workflows/list-block-texts-batch/workflow.yaml",workflowId:"listBlockTextsBatch",informational:!0,"x-note":"Nearest existing block-content read workflow. Image asset lookup itself is performed through the OpenAPI image/block tools in this skill."}]},{id:"rendering",name:"Rendering",description:"Render campaign locale versions to backend-local HTML artifacts and return the backend htmlFileUrl exactly unchanged.",tags:["rendering","html","preview","file-url","artifact"],examples:["Render campaign cmp_123 locale de-DE version 2 and return the file URL.","Render the latest de-DE locale version and give me only the htmlFileUrl.","Preview the rendered HTML artifact for campaign cmp_123 default locale.","Do not paste HTML; just return the file:// render artifact URL."],"x-bindings":[{type:"arazzo",file:"../../services/campaign-backend/api/workflows/compare-versions/workflow.yaml",workflowId:"compareVersions",informational:!0,"x-note":"Nearest existing version-read workflow. Rendering is performed by the renderVersion OpenAPI operation in this skill."}],"x-tools":[{type:"openapi",file:"../../services/campaign-backend/api/backend.openapi.yaml",includeOperationIds:["listCampaigns","getCampaign","listLocales","listVersions","getVersion","renderVersion"]}],"x-skill":"../skills/rendering/SKILL.md"},{id:"plan",name:"Plan",description:"Enforces review-first locale change management. Compares locale versions, detects translation-impacting differences, creates and updates persisted change plans, returns plan preview links, and applies only when the customer explicitly asks. Use this for default-to-translation propagation, locale sync planning, and safe batch execution of approved changes.",tags:["plan","diff","delegation","locale-sync"],examples:["Compare default locale version 2 with version 3 and tell me what de-DE needs to update.","Create a persisted plan for syncing de-DE with the latest default-locale changes.","Show me the plan for campaign cmp_123 locale de-DE and include the preview URL.","Update the existing pending plan with this revised set of block edits.","Apply the pending plan for de-DE only if I explicitly approve it.","Create a review plan before changing headline text in the German locale.","Use batch execution for the approved plan, then summarize which block text/link/image fields changed."],"x-bindings":[{type:"arazzo",file:"../../services/campaign-backend/api/workflows/update-plan/workflow.yaml",workflowId:"updatePlan",informational:!0,"x-note":"Informational: documents the plan update flow."}],"x-tools":[{type:"openapi",file:"../../services/campaign-backend/api/backend.openapi.yaml",includeOperationIds:["compareLocales","createPlan","getPlan","updatePlan","executeBatch"]}],"x-skill":"../skills/plan/SKILL.md"},{id:"locale-sync-status",name:"Locale Sync Status",description:"Knowledge skill: determine a locale's sync status as two orthogonal dimensions (changeDelegationStatus × localeStatus), detect locales behind the base, detect locales with a pending locale-edit on the current head, and classify diff items as conflict vs autoaccept. Detection and classification logic; resolution mechanics live in the change-delegation skill.",tags:["locale-sync","diff","status"],examples:["Which locales are out of sync with the default locale?","Classify these diff items as conflict vs autoaccept.","Explain why de-DE is marked outofsync with a stale plan."],"x-skill":"../skills/locale-sync-status/SKILL.md"},{id:"change-plan-lifecycle",name:"Change Plan Lifecycle",description:"Knowledge skill: understand, communicate, and act on plan statuses (pending/rejected/applied), explain to the customer what stage a plan is at and what can happen next.",tags:["plan","lifecycle","status"],examples:["What does it mean that this plan is pending?","What can happen next to a rejected plan?","Explain the lifecycle of a change plan."],"x-skill":"../skills/change-plan-lifecycle/SKILL.md"},{id:"ui-canvas",name:"UI Canvas",description:"Knowledge skill: when a visual answer helps (lists/grids, locale or version comparisons, KPI/summary cards, confidence readouts, notifications), author a json-render UI spec from the Emarsys catalog and send it to the canvas, alongside a short text reply.",tags:["ui","json-render","canvas","visualization"],examples:["What are my campaigns?","Compare the de-DE and en-GB locales side by side.","Show version 2 vs version 3 of the default locale.","Give me a summary card for this campaign."],"x-skill":"../skills/ui-canvas/SKILL.md"},{id:"ui-pages",name:"UI Pages",description:"Knowledge skill: persist a canvas as a reusable page (create/save, open, close, rename, clone, delete) via the backend page tools and the navigateToPage / resetPageView signal tools, so a view can be reopened and linked to instead of living in one chat turn.",tags:["ui","json-render","canvas","pages","persistence"],examples:["Create a page for my campaigns.","Save this as a page.","Open the campaigns page.","Close this page."],"x-skill":"../skills/ui-pages/SKILL.md"},{id:"ui-dynamic",name:"UI Dynamic",description:"Knowledge skill: make a reusable page fetch its own live data by authoring actionHandlers (small JS functions that call the backend SDK) plus a lifecycle.onLoad that runs one on open, instead of baking a static data snapshot into initialState. Use when the user wants a page that always shows current data or has interactive writes.",tags:["ui","json-render","canvas","dynamic","sdk"],examples:["Make this reusable so it always shows the latest campaigns.","Turn this into a live page.","Add a button to pause a campaign.","The page should refresh its data every time I open it."],"x-skill":"../skills/ui-dynamic/SKILL.md"}],fC={"$schema-comment":"UI Agent card. Shares the campaign skill library at domain/specs/agents/skills/ (referenced via ../skills/). Same capabilities as Campaign Agent; the ui-canvas render skill is what differentiates it.",protocolVersion:aC,name:iC,description:oC,url:rC,version:lC,"x-system-prompt":"system-prompt.md","x-signal-tools":[{name:"render_canvas",description:"Render a json-render UI spec onto the canvas (the left pane). Call this when a visual answer helps — a list/grid of campaigns, a locale or version comparison, a summary or KPI card, or a notification. Pass the full json-render spec as `spec`. The canvas repaints; keep your chat reply short and do not paste the spec into chat.",parameters:{type:"object",properties:{spec:{type:"object",description:"A json-render UI spec: an object with a `root` element id and an `elements` map, using the Emarsys catalog component types. Props may bind to state ($state/$template/$item/$index/$bindState/$bindItem); elements may carry repeat/visible/on/watch; and the spec may carry initialState, lifecycle.onLoad, and actionHandlers for data-driven, reusable pages (see the ui-canvas / ui-pages / ui-dynamic skills)."}},required:["spec"]},"x-spec-schema":"emarsys-catalog",return:"Noted! Rendered to the canvas."},{name:"navigateToPage",description:"Open a persisted page in the canvas view. Call this right after you create/save a page (createPage) so the user immediately sees it, or when the user asks to open/view an existing page. Pass the page's id as `pageId`. If the page declares `parameters` (see its list summary), pass values for them in `params` — the page reads them on load to fetch the right data; a missing REQUIRED parameter makes the page show an error instead of loading. The frontend navigates without a reload and renders the saved spec. Keep your chat reply short.",parameters:{type:"object",properties:{pageId:{type:"string",description:"The id of the persisted page to open (as returned by createPage / listPages / getPage)."},params:{type:"object",additionalProperties:{type:"string"},description:'Optional values for the page\'s declared `parameters`, as a flat name→value map (e.g. { "campaignId": "camp-123" }). They become URL query params the page\'s onLoad reads via `{ "$query": "<name>" }`. Supply every REQUIRED parameter the page declares.'}},required:["pageId"]},return:"Noted! Navigated to the page."},{name:"resetPageView",description:"Reset the canvas view back to its default: clear any open page and all view parameters (e.g. pageId) so the user returns to the live agent canvas. Call this when the user asks to close/leave the current page, start over, or go back to the default view. Takes no arguments.",parameters:{type:"object",properties:{},additionalProperties:!1},return:"Noted! Reset the view."}],capabilities:cC,defaultInputModes:uC,defaultOutputModes:dC,skills:hC},pC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Base Edit Propagation
  version: 0.1.0
  summary: |
    Edit a text slot on the base locale and propagate the diff to a
    translation locale. Creates all required resources from scratch,
    then uses the stateless /diffs endpoint to compute which blocks the
    translation needs to update, and finally writes the translated value.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: baseEditPropagation
    summary: |
      Create campaign + base locale + translation locale, update a text
      slot on the base, compare the two locales to obtain the diff, and
      apply the translated value to the translation locale.
    inputs:
      type: object
      additionalProperties: false
      required:
        - campaignName
        - templateId
        - fallbackLocale
        - translationLocale
        - blockTemplateId
        - editableId
        - baseText
        - translatedText
      properties:
        campaignName:
          type: string
        templateId:
          type: string
        fallbackLocale:
          type: string
        translationLocale:
          type: string
        blockTemplateId:
          type: string
        editableId:
          type: string
        baseText:
          type: string
        translatedText:
          type: string
    steps:
      - stepId: createCampaign
        operationId: createCampaign
        requestBody:
          contentType: application/json
          payload:
            name: $inputs.campaignName
            templateId: $inputs.templateId
            fallbackLocale: $inputs.fallbackLocale
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          campaignId: $response.body#/id

      - stepId: createBaseLocale
        operationId: createBaseLocale
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          baseLocaleId: $response.body#/_id
          baseLocaleVersion: $response.body#/version

      - stepId: createLocale
        operationId: createLocale
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
        requestBody:
          contentType: application/json
          payload:
            baseVersion: $steps.createBaseLocale.outputs.baseLocaleVersion
            locale: $inputs.translationLocale
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          translationLocaleId: $response.body#/_id

      - stepId: updateBaseBlockText
        operationId: updateLatestBlockText
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.fallbackLocale
          - name: blockId
            in: path
            value: $inputs.blockTemplateId
          - name: editableId
            in: path
            value: $inputs.editableId
        requestBody:
          contentType: application/json
          payload:
            value: $inputs.baseText
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          updatedBaseText: $response.body

      - stepId: compareLocales
        operationId: compareLocales
        requestBody:
          contentType: application/json
          payload:
            from:
              _id: $steps.createBaseLocale.outputs.baseLocaleId
              campaignId: $steps.createCampaign.outputs.campaignId
              locale: $inputs.fallbackLocale
              version: 1
              blocks: []
            to:
              _id: $steps.createBaseLocale.outputs.baseLocaleId
              campaignId: $steps.createCampaign.outputs.campaignId
              locale: $inputs.fallbackLocale
              version: 2
              blocks: []
            currentLocale:
              _id: $steps.createLocale.outputs.translationLocaleId
              campaignId: $steps.createCampaign.outputs.campaignId
              locale: $inputs.translationLocale
              version: 1
              blocks: []
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          diff: $response.body

      - stepId: replaceTranslationBlockText
        operationId: replaceLatestBlockText
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.translationLocale
          - name: blockId
            in: path
            value: $inputs.blockTemplateId
          - name: editableId
            in: path
            value: $inputs.editableId
        requestBody:
          contentType: application/json
          payload:
            value: $inputs.translatedText
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          translatedText: $response.body

    outputs:
      campaignId: $steps.createCampaign.outputs.campaignId
      baseLocaleId: $steps.createBaseLocale.outputs.baseLocaleId
      translationLocaleId: $steps.createLocale.outputs.translationLocaleId
      diff: $steps.compareLocales.outputs.diff
      translatedText: $steps.replaceTranslationBlockText.outputs.translatedText
`,mC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Bulk Update Texts
  version: 0.1.0
  summary: |
    Patch multiple text content slots on a single block in one call.
    Batch-compatible: all IDs are known upfront (from seed), so this
    workflow has no inter-step dependencies and collapses cleanly into
    /$batch.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: bulkUpdateTexts
    summary: Update multiple text slots on a block (latest)
    inputs:
      type: object
      additionalProperties: false
      required: [campaignId, localeCode, blockId, headingText, subheadingText, bodyText]
      properties:
        campaignId:
          type: string
        localeCode:
          type: string
        blockId:
          type: string
        headingText:
          type: string
        subheadingText:
          type: string
        bodyText:
          type: string
    steps:
      - stepId: updateTexts
        operationId: updateLatestBlockTexts
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.localeCode
          - name: blockId
            in: path
            value: $inputs.blockId
        requestBody:
          contentType: application/json
          payload:
            heading:
              value: $inputs.headingText
            subheading:
              value: $inputs.subheadingText
            body:
              value: $inputs.bodyText
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          updatedTexts: $response.body
    outputs:
      updatedTexts: $steps.updateTexts.outputs.updatedTexts
`,gC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Campaign Creation
  version: 0.1.0
  summary: |
    Create a campaign, bootstrap its base locale, fork two translation
    locales (de-DE, fr-FR), then verify all locales are listed.
    Not batch-compatible: each step consumes IDs produced by the previous one.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: campaignCreation
    summary: Create campaign → base locale → de-DE → fr-FR → list locales
    inputs:
      type: object
      additionalProperties: false
      required: [campaignName, templateId, fallbackLocale]
      properties:
        campaignName:
          type: string
        templateId:
          type: string
        fallbackLocale:
          type: string
        env:
          type: object
          properties:
            CAMPAIGN_BACKEND_BASIC_AUTH_USERNAME:
              type: string
            CAMPAIGN_BACKEND_BASIC_AUTH_PASSWORD:
              type: string
    x-security:
      - schemeName: basicAuth
        values:
          username: $inputs.env.CAMPAIGN_BACKEND_BASIC_AUTH_USERNAME
          password: $inputs.env.CAMPAIGN_BACKEND_BASIC_AUTH_PASSWORD
    steps:
      - stepId: createCampaign
        operationId: createCampaign
        requestBody:
          contentType: application/json
          payload:
            name: $inputs.campaignName
            templateId: $inputs.templateId
            fallbackLocale: $inputs.fallbackLocale
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          campaignId: $response.body#/id

      - stepId: getBaseLocale
        operationId: getVersion
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: default
          - name: versionId
            in: path
            value: "1"
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          baseLocaleId: $response.body#/_id

      - stepId: createLocaleDE
        operationId: createLocale
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
        requestBody:
          contentType: application/json
          payload:
            locale: de-DE
            baseVersion: $steps.getBaseLocale.outputs.baseLocaleVersion
            version: 1
        successCriteria:
          - condition: $statusCode == 201

      - stepId: createLocaleFR
        operationId: createLocale
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
        requestBody:
          contentType: application/json
          payload:
            locale: fr-FR
            baseVersion: $steps.getBaseLocale.outputs.baseLocaleVersion
            version: 1
        successCriteria:
          - condition: $statusCode == 201

      - stepId: listLocales
        operationId: listLocales
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
        successCriteria:
          - condition: $statusCode == 200
          - context: $response.body
            condition: $[2].locale
            type: jsonpath
        outputs:
          locales: $response.body

    outputs:
      campaignId: $steps.createCampaign.outputs.campaignId
      locales: $steps.listLocales.outputs.locales
`,vC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Change Delegation Flow
  version: 0.1.0
  summary: |
    End-to-end change delegation: create a campaign with a translation,
    POST the delegation plan, retrieve it, and verify the preview shell.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: changeDelegation
    summary: |
      Create campaign → fork locale → POST delegation plan → GET plan → GET preview
    inputs:
      type: object
      additionalProperties: false
      required: [campaignName, templateId, fallbackLocale, translationLocale]
      properties:
        campaignName:
          type: string
        templateId:
          type: string
        fallbackLocale:
          type: string
        translationLocale:
          type: string
        env:
          type: object
          properties:
            CAMPAIGN_BACKEND_BASIC_AUTH_USERNAME:
              type: string
            CAMPAIGN_BACKEND_BASIC_AUTH_PASSWORD:
              type: string
    x-security:
      - schemeName: basicAuth
        values:
          username: $inputs.env.CAMPAIGN_BACKEND_BASIC_AUTH_USERNAME
          password: $inputs.env.CAMPAIGN_BACKEND_BASIC_AUTH_PASSWORD
    steps:
      # 1. Create the campaign
      - stepId: createCampaign
        operationId: createCampaign
        requestBody:
          contentType: application/json
          payload:
            name: $inputs.campaignName
            templateId: $inputs.templateId
            fallbackLocale: $inputs.fallbackLocale
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          campaignId: $response.body#/id

      # 2. Get the base locale (version 1, auto-created)
      - stepId: getBaseLocale
        operationId: getVersion
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: default
          - name: versionId
            in: path
            value: "1"
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          baseLocaleId: $response.body#/_id

      # 3. Fork a translation locale
      - stepId: createTranslation
        operationId: createLocale
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
        requestBody:
          contentType: application/json
          payload:
            locale: $inputs.translationLocale
            baseVersion: $steps.getBaseLocale.outputs.baseLocaleVersion
            version: 1
        successCriteria:
          - condition: $statusCode == 201

      # 4. POST the change plan
      - stepId: createDelegationPlan
        operationId: createChangePlan
        requestBody:
          contentType: application/json
          payload:
            campaignId: $steps.createCampaign.outputs.campaignId
            locale: $inputs.translationLocale
            diff:
              currentBaseVersion: 1
              futureBaseVersion: 2
              locale: $inputs.translationLocale
              localeVersion: 1
              diffs:
                - type: TextChange
                  blockId: block-placeholder
                  textId: title
                  from: "Original"
                  to: "Updated"
            plan:
              summary: "Text change upon approval"
              actions:
                - summary: "Update block-placeholder / title"
                  endpoint:
                    operationId: replaceLatestBlockText
                    method: PUT
                    path: /campaigns/placeholder/locales/de-DE/blocks/block-placeholder/editables/title
                    body:
                      value: "Updated"
                  reasonings:
                    - type: UserPrompt
                      summary: "User requested propagation."
                      citations:
                        - source: userPrompt
                          quote: "Propagate the latest base-locale edits."
                    - type: Diff
                      summary: "The title changed."
                      diff:
                        type: TextChange
                        blockId: block-placeholder
                        textId: title
                        from: "Original"
                        to: "Updated"
                    - type: BaseNotes
                      summary: "Base-locale note guides the copy update."
                      notes:
                        - "Keep translated titles aligned with base-locale campaign naming."
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          delegationId: $response.body#/id

      # 5. GET the plan (Basic Auth from x-security).
      - stepId: getPlan
        operationId: getChangePlan
        parameters:
          - name: changeDelegationId
            in: path
            value: $steps.createDelegationPlan.outputs.delegationId
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          planStatus: $response.body#/status

      # 6. GET the preview HTML shell
      - stepId: getPreview
        operationId: getChangeDelegationPreview
        parameters:
          - name: changeDelegationId
            in: path
            value: $steps.createDelegationPlan.outputs.delegationId
        successCriteria:
          - condition: $statusCode == 200

    outputs:
      campaignId: $steps.createCampaign.outputs.campaignId
      delegationId: $steps.createDelegationPlan.outputs.delegationId
      planStatus: $steps.getPlan.outputs.planStatus
`,yC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Compare Versions
  version: 0.1.0
  summary: |
    Fetch two version snapshots in parallel for client-side comparison.
    Both GETs are independent (same campaignId and localeCode, different
    versionId), so they can be dispatched concurrently. All IDs are
    supplied by the caller — no inter-step dependencies.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: compareVersions
    summary: Fetch version 1 and version 2 snapshots for comparison
    inputs:
      type: object
      additionalProperties: false
      required: [campaignId, localeCode]
      properties:
        campaignId:
          type: string
        localeCode:
          type: string
    steps:
      - stepId: getVersionOne
        operationId: getVersion
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.localeCode
          - name: versionId
            in: path
            value: 1
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/version == 1
        outputs:
          snapshot: $response.body

      - stepId: getVersionTwo
        operationId: getVersion
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.localeCode
          - name: versionId
            in: path
            value: 2
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/version == 2
        outputs:
          snapshot: $response.body

    outputs:
      v1: $steps.getVersionOne.outputs.snapshot
      v2: $steps.getVersionTwo.outputs.snapshot
`,bC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Create and Get Campaign
  version: 0.1.0
  summary: Create a campaign and immediately verify it is readable.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: createAndGetCampaign
    summary: Create a campaign then verify it via GET
    inputs:
      type: object
      additionalProperties: false
      required: [campaignName, templateId, fallbackLocale]
      properties:
        campaignName:
          type: string
        templateId:
          type: string
        fallbackLocale:
          type: string
    steps:
      - stepId: createCampaign
        operationId: createCampaign
        requestBody:
          contentType: application/json
          payload:
            name: $inputs.campaignName
            templateId: $inputs.templateId
            fallbackLocale: $inputs.fallbackLocale
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          campaignId: $response.body#/id

      - stepId: verifyCampaign
        operationId: getCampaign
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/name == $inputs.campaignName
    outputs:
      campaignId: $steps.createCampaign.outputs.campaignId
`,wC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Delete Campaign
  version: 0.1.0
  summary: |
    Delete a campaign then verify it no longer exists (404). Batch-compatible:
    the DELETE operates on a known ID from inputs; the GET is a read with a
    known ID — no inter-step data flow required.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: deleteCampaign
    summary: DELETE campaign then verify GET returns 404
    inputs:
      type: object
      additionalProperties: false
      required: [campaignId]
      properties:
        campaignId:
          type: string
    steps:
      - stepId: deleteCampaign
        operationId: deleteCampaign
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
        successCriteria:
          - condition: $statusCode == 204

      - stepId: verify404
        operationId: getCampaign
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
        successCriteria:
          - condition: $statusCode == 404

    outputs:
      deletedCampaignId: $inputs.campaignId
`,kC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Delete Locale
  version: 0.1.0
  summary: |
    Delete a translation locale and verify it is no longer present by
    checking it is absent from the campaign's locale list.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: deleteLocale
    summary: Delete a locale then verify it is gone via listLocales
    inputs:
      type: object
      additionalProperties: false
      required:
        - campaignId
        - localeCode
      properties:
        campaignId:
          type: string
        localeCode:
          type: string
    steps:
      - stepId: deleteLocale
        operationId: deleteLocale
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.localeCode
        successCriteria:
          - condition: $statusCode == 204

      - stepId: verifyLocaleGone
        operationId: listLocales
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
        successCriteria:
          - condition: $statusCode == 200
          - context: $response.body
            condition: $[*].locale
            type: jsonpath
            # The deleted locale must not appear in the list.
            # Evaluated as: none of the returned locale summaries has
            # locale == inputs.localeCode.
        outputs:
          remainingLocales: $response.body

    outputs:
      remainingLocales: $steps.verifyLocaleGone.outputs.remainingLocales
`,SC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Fork Translation
  version: 0.1.0
  summary: |
    Bootstrap a new campaign, create its base locale, then fork a
    translation locale off the base.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: forkTranslation
    summary: Create campaign → base locale → translation locale
    inputs:
      type: object
      additionalProperties: false
      required:
        - campaignName
        - templateId
        - fallbackLocale
        - translationLocale
      properties:
        campaignName:
          type: string
        templateId:
          type: string
        fallbackLocale:
          type: string
        translationLocale:
          type: string
    steps:
      - stepId: createCampaign
        operationId: createCampaign
        requestBody:
          contentType: application/json
          payload:
            name: $inputs.campaignName
            templateId: $inputs.templateId
            fallbackLocale: $inputs.fallbackLocale
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          campaignId: $response.body#/id

      - stepId: getBaseLocale
        operationId: getVersion
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: default
          - name: versionId
            in: path
            value: 1
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          baseLocaleId: $response.body#/_id
          baseLocaleVersion: $response.body#/version

      - stepId: createLocale
        operationId: createLocale
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
        requestBody:
          contentType: application/json
          payload:
            baseVersion: $steps.getBaseLocale.outputs.baseLocaleVersion
            locale: $inputs.translationLocale
        successCriteria:
          - condition: $statusCode == 201
          - condition: $response.body#/locale == $inputs.translationLocale
          - condition: $response.body#/baseVersion == $steps.getBaseLocale.outputs.baseLocaleVersion
        outputs:
          translationLocaleId: $response.body#/_id
          translationLocaleVersion: $response.body#/version

    outputs:
      campaignId: $steps.createCampaign.outputs.campaignId
      baseLocaleId: $steps.getBaseLocale.outputs.baseLocaleId
      translationLocaleId: $steps.createLocale.outputs.translationLocaleId
`,xC=`arazzo: 1.0.1
info:
  title: Campaign Backend — List and Filter Campaigns
  version: 0.1.0
  summary: |
    List campaigns with a name filter and pagination parameters, then
    verify the response shape and count. Batch-compatible: no inter-step
    data flow — all parameters are known from inputs.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: listAndFilterCampaigns
    summary: List campaigns with name filter and $top/$skip pagination
    inputs:
      type: object
      additionalProperties: false
      required: [nameFilter, top, skip]
      properties:
        nameFilter:
          type: string
          description: OData $filter expression, e.g. "name eq 'Summer Sale 2026'"
        top:
          type: integer
          minimum: 1
          maximum: 100
        skip:
          type: integer
          minimum: 0
    steps:
      - stepId: listCampaigns
        operationId: listCampaigns
        parameters:
          - name: $filter
            in: query
            value: $inputs.nameFilter
          - name: $top
            in: query
            value: $inputs.top
          - name: $skip
            in: query
            value: $inputs.skip
          - name: $count
            in: query
            value: true
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          campaigns: $response.body#/value
          count: $response.body#/@count

    outputs:
      campaigns: $steps.listCampaigns.outputs.campaigns
      count: $steps.listCampaigns.outputs.count
`,_C=`arazzo: 1.0.1
info:
  title: Campaign Backend — List Block Texts Batch
  version: 0.1.0
  summary: |
    Fetch text content slots for multiple known blocks. All IDs are
    supplied by the caller, so the same workflow can collapse into
    /$batch with one GET .../texts sub-request per block.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: listBlockTextsBatch
    summary: Fetch text slots for two known blocks
    inputs:
      type: object
      additionalProperties: false
      required: [campaignId, localeCode, heroBlockId, footerBlockId]
      properties:
        campaignId:
          type: string
        localeCode:
          type: string
        heroBlockId:
          type: string
        footerBlockId:
          type: string
    steps:
      - stepId: listHeroTexts
        operationId: listLatestBlockTexts
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.localeCode
          - name: blockId
            in: path
            value: $inputs.heroBlockId
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/headline/value == "Summer sale starts now"
          - condition: $response.body#/body/value == "Save 20% on selected products."
        outputs:
          texts: $response.body

      - stepId: listFooterTexts
        operationId: listLatestBlockTexts
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.localeCode
          - name: blockId
            in: path
            value: $inputs.footerBlockId
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/legal/value == "Terms and conditions apply."
          - condition: $response.body#/unsubscribe/value == "Unsubscribe"
        outputs:
          texts: $response.body

    outputs:
      heroTexts: $steps.listHeroTexts.outputs.texts
      footerTexts: $steps.listFooterTexts.outputs.texts
`,AC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Restore Version
  version: 0.1.0
  summary: |
    Restore a locale to a previous version snapshot. The seed already
    contains a campaign with a locale at v3. Restoring v1 produces a
    new v4 whose blocks match the v1 snapshot.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: restoreVersion
    summary: Restore a locale to a prior version and verify the new head
    inputs:
      type: object
      additionalProperties: false
      required: [campaignId, localeCode, targetVersion]
      properties:
        campaignId:
          type: string
        localeCode:
          type: string
        targetVersion:
          type: integer
    steps:
      - stepId: restoreVersion
        operationId: restoreVersion
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.localeCode
          - name: versionId
            in: path
            value: $inputs.targetVersion
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          restoredLocale: $response.body
          newVersion: $response.body#/version

    outputs:
      restoredLocale: $steps.restoreVersion.outputs.restoredLocale
      newVersion: $steps.restoreVersion.outputs.newVersion
`,CC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Translate Content
  version: 0.1.0
  summary: |
    Fetch the current text slot on a block from the base locale, then
    write the translated value to the translation locale.
    Requires a fully-seeded graph (campaign + locales + block).

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: translateContent
    summary: |
      Get the base block text for reference, then update the same slot
      on the translation locale with the translated value.
    inputs:
      type: object
      additionalProperties: false
      required:
        - campaignId
        - baseLocaleCode
        - translationLocaleCode
        - blockId
        - editableId
        - translatedValue
      properties:
        campaignId:
          type: string
        baseLocaleCode:
          type: string
        translationLocaleCode:
          type: string
        blockId:
          type: string
        editableId:
          type: string
        translatedValue:
          type: string
    steps:
      - stepId: getBaseBlockText
        operationId: getLatestBlockText
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.baseLocaleCode
          - name: blockId
            in: path
            value: $inputs.blockId
          - name: editableId
            in: path
            value: $inputs.editableId
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          baseText: $response.body

      - stepId: updateTranslationBlockText
        operationId: updateLatestBlockText
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.translationLocaleCode
          - name: blockId
            in: path
            value: $inputs.blockId
          - name: editableId
            in: path
            value: $inputs.editableId
        requestBody:
          contentType: application/json
          payload:
            value: $inputs.translatedValue
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/value == $inputs.translatedValue
        outputs:
          result: $response.body

    outputs:
      baseText: $steps.getBaseBlockText.outputs.baseText
      translatedText: $steps.updateTranslationBlockText.outputs.result
`,TC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Update Campaign Metadata
  version: 0.1.0
  summary: |
    Fetch a campaign by ID, then patch its name. Not batch-compatible:
    the PATCH step uses the campaign ID read from the GET response body
    (inter-step data flow required even though the ID is also in inputs,
    this documents the pattern clearly).

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: updateCampaignMetadata
    summary: GET campaign then PATCH its name
    inputs:
      type: object
      additionalProperties: false
      required: [campaignId, newName]
      properties:
        campaignId:
          type: string
        newName:
          type: string
    steps:
      - stepId: getCampaign
        operationId: getCampaign
        parameters:
          - name: campaignId
            in: path
            value: $inputs.campaignId
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          campaignId: $response.body#/id
          currentName: $response.body#/name

      - stepId: updateCampaign
        operationId: updateCampaign
        parameters:
          - name: campaignId
            in: path
            value: $steps.getCampaign.outputs.campaignId
        requestBody:
          contentType: application/json
          payload:
            name: $inputs.newName
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/name == $inputs.newName
        outputs:
          updatedCampaign: $response.body

    outputs:
      updatedCampaign: $steps.updateCampaign.outputs.updatedCampaign
`,IC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Update Plan
  version: 0.1.0
  summary: |
    Fully replace an existing seeded plan via PUT, then GET it
    to confirm the stored state matches the replacement body.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: updatePlan
    summary: |
      PUT seeded plan (full replace) → GET to verify updated state
    inputs:
      type: object
      additionalProperties: false
      required: [planId]
      properties:
        planId:
          type: string
          minLength: 24
          maxLength: 24
          pattern: '^[0-9a-f]{24}$'
        env:
          type: object
          properties:
            CAMPAIGN_BACKEND_BASIC_AUTH_USERNAME:
              type: string
            CAMPAIGN_BACKEND_BASIC_AUTH_PASSWORD:
              type: string
    x-security:
      - schemeName: basicAuth
        values:
          username: $inputs.env.CAMPAIGN_BACKEND_BASIC_AUTH_USERNAME
          password: $inputs.env.CAMPAIGN_BACKEND_BASIC_AUTH_PASSWORD

    steps:
      # 1. PUT — fully replace the seeded plan with revised content
      - stepId: updatePlan
        operationId: updatePlan
        parameters:
          - name: planId
            in: path
            value: $inputs.planId
        requestBody:
          contentType: application/json
          payload:
            campaignId: c0a1b2c3d4e5f6a7b8c9d0e1
            locale: de-DE
            localeVersion: 2
            intent: "Revised plan: propagate title update to v2 into de-DE."
            status: pending
            changes:
              kind: update-base-version
              toBaseVersion: 3
              summary: "Revised plan: update title to v2"
              diff:
                currentBaseVersion: 2
                futureBaseVersion: 3
                locale: de-DE
                localeVersion: 2
                diffs:
                  - type: TextChange
                    blockId: block-hero
                    textId: title
                    from: "Updated Title v1"
                    to: "Updated Title v2"
              actions: []
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/id == $inputs.planId

      # 2. GET the plan to verify the updated content is persisted.
      - stepId: verifyUpdatedPlan
        operationId: getPlan
        parameters:
          - name: planId
            in: path
            value: $inputs.planId
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/id == $inputs.planId
          - condition: $response.body#/status == "pending"
`,EC=`arazzo: 1.0.1
info:
  title: Campaign Backend — Version History
  version: 0.1.0
  summary: |
    Build up a locale version history from scratch and verify individual
    version snapshots are readable. Creates a campaign, bootstraps the
    base locale, edits it twice (producing v2 and v3), then lists all
    versions and fetches v1 and v2 by number.

sourceDescriptions:
  - name: backend
    url: ../../backend.openapi.yaml
    type: openapi

workflows:
  - workflowId: versionHistory
    summary: Create a campaign, build version history, and read version snapshots
    inputs:
      type: object
      additionalProperties: false
      required: [campaignName, templateId, fallbackLocale, localeCode, blockTemplateId]
      properties:
        campaignName:
          type: string
        templateId:
          type: string
        fallbackLocale:
          type: string
        localeCode:
          type: string
        blockTemplateId:
          type: string
    steps:
      - stepId: createCampaign
        operationId: createCampaign
        requestBody:
          contentType: application/json
          payload:
            name: $inputs.campaignName
            templateId: $inputs.templateId
            fallbackLocale: $inputs.fallbackLocale
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          campaignId: $response.body#/id

      - stepId: getBaseLocale
        operationId: getVersion
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: default
          - name: versionId
            in: path
            value: 1
        successCriteria:
          - condition: $statusCode == 200
        outputs:
          localeId: $response.body#/_id
          baseVersion: $response.body#/version

      - stepId: editV2
        operationId: createLatestBlock
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.fallbackLocale
        requestBody:
          contentType: application/json
          payload:
            blockTemplateId: $inputs.blockTemplateId
            contents:
              headline:
                value: "Version 2 headline"
        successCriteria:
          - condition: $statusCode == 201
        outputs:
          blockId: $response.body#/_id

      - stepId: editV3
        operationId: updateLatestBlockTexts
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.fallbackLocale
          - name: blockId
            in: path
            value: $steps.editV2.outputs.blockId
        requestBody:
          contentType: application/json
          payload:
            headline:
              value: "Version 3 headline"
        successCriteria:
          - condition: $statusCode == 200

      - stepId: listVersions
        operationId: listVersions
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.fallbackLocale
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/2 != null

      - stepId: getVersionOne
        operationId: getVersion
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.fallbackLocale
          - name: versionId
            in: path
            value: 1
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/version == 1
        outputs:
          v1Snapshot: $response.body

      - stepId: getVersionTwo
        operationId: getVersion
        parameters:
          - name: campaignId
            in: path
            value: $steps.createCampaign.outputs.campaignId
          - name: localeCode
            in: path
            value: $inputs.fallbackLocale
          - name: versionId
            in: path
            value: 2
        successCriteria:
          - condition: $statusCode == 200
          - condition: $response.body#/version == 2
        outputs:
          v2Snapshot: $response.body

    outputs:
      campaignId: $steps.createCampaign.outputs.campaignId
      v1Snapshot: $steps.getVersionOne.outputs.v1Snapshot
      v2Snapshot: $steps.getVersionTwo.outputs.v2Snapshot
`,_u=Symbol.for("yaml.alias"),bc=Symbol.for("yaml.document"),Bs=Symbol.for("yaml.map"),fv=Symbol.for("yaml.pair"),ns=Symbol.for("yaml.scalar"),ni=Symbol.for("yaml.seq"),Tn=Symbol.for("yaml.node.type"),si=e=>!!e&&typeof e=="object"&&e[Tn]===_u,qr=e=>!!e&&typeof e=="object"&&e[Tn]===bc,po=e=>!!e&&typeof e=="object"&&e[Tn]===Bs,At=e=>!!e&&typeof e=="object"&&e[Tn]===fv,ft=e=>!!e&&typeof e=="object"&&e[Tn]===ns,mo=e=>!!e&&typeof e=="object"&&e[Tn]===ni;function xt(e){if(e&&typeof e=="object")switch(e[Tn]){case Bs:case ni:return!0}return!1}function _t(e){if(e&&typeof e=="object")switch(e[Tn]){case _u:case Bs:case ns:case ni:return!0}return!1}const pv=e=>(ft(e)||xt(e))&&!!e.anchor,Js=Symbol("break visit"),LC=Symbol("skip children"),Pi=Symbol("remove node");function ai(e,t){const n=OC(t);qr(e)?Ta(null,e.contents,n,Object.freeze([e]))===Pi&&(e.contents=null):Ta(null,e,n,Object.freeze([]))}ai.BREAK=Js;ai.SKIP=LC;ai.REMOVE=Pi;function Ta(e,t,n,s){const a=NC(e,t,n,s);if(_t(a)||At(a))return PC(e,s,a),Ta(e,a,n,s);if(typeof a!="symbol"){if(xt(t)){s=Object.freeze(s.concat(t));for(let i=0;i<t.items.length;++i){const o=Ta(i,t.items[i],n,s);if(typeof o=="number")i=o-1;else{if(o===Js)return Js;o===Pi&&(t.items.splice(i,1),i-=1)}}}else if(At(t)){s=Object.freeze(s.concat(t));const i=Ta("key",t.key,n,s);if(i===Js)return Js;i===Pi&&(t.key=null);const o=Ta("value",t.value,n,s);if(o===Js)return Js;o===Pi&&(t.value=null)}}return a}function OC(e){return typeof e=="object"&&(e.Collection||e.Node||e.Value)?Object.assign({Alias:e.Node,Map:e.Node,Scalar:e.Node,Seq:e.Node},e.Value&&{Map:e.Value,Scalar:e.Value,Seq:e.Value},e.Collection&&{Map:e.Collection,Seq:e.Collection},e):e}function NC(e,t,n,s){var a,i,o,r,l;if(typeof n=="function")return n(e,t,s);if(po(t))return(a=n.Map)==null?void 0:a.call(n,e,t,s);if(mo(t))return(i=n.Seq)==null?void 0:i.call(n,e,t,s);if(At(t))return(o=n.Pair)==null?void 0:o.call(n,e,t,s);if(ft(t))return(r=n.Scalar)==null?void 0:r.call(n,e,t,s);if(si(t))return(l=n.Alias)==null?void 0:l.call(n,e,t,s)}function PC(e,t,n){const s=t[t.length-1];if(xt(s))s.items[e]=n;else if(At(s))e==="key"?s.key=n:s.value=n;else if(qr(s))s.contents=n;else{const a=si(s)?"alias":"scalar";throw new Error(`Cannot replace node with ${a} parent`)}}const BC={"!":"%21",",":"%2C","[":"%5B","]":"%5D","{":"%7B","}":"%7D"},DC=e=>e.replace(/[!,[\]{}]/g,t=>BC[t]);class Zt{constructor(t,n){this.docStart=null,this.docEnd=!1,this.yaml=Object.assign({},Zt.defaultYaml,t),this.tags=Object.assign({},Zt.defaultTags,n)}clone(){const t=new Zt(this.yaml,this.tags);return t.docStart=this.docStart,t}atDocument(){const t=new Zt(this.yaml,this.tags);switch(this.yaml.version){case"1.1":this.atNextDocument=!0;break;case"1.2":this.atNextDocument=!1,this.yaml={explicit:Zt.defaultYaml.explicit,version:"1.2"},this.tags=Object.assign({},Zt.defaultTags);break}return t}add(t,n){this.atNextDocument&&(this.yaml={explicit:Zt.defaultYaml.explicit,version:"1.1"},this.tags=Object.assign({},Zt.defaultTags),this.atNextDocument=!1);const s=t.trim().split(/[ \t]+/),a=s.shift();switch(a){case"%TAG":{if(s.length!==2&&(n(0,"%TAG directive should contain exactly two parts"),s.length<2))return!1;const[i,o]=s;return this.tags[i]=o,!0}case"%YAML":{if(this.yaml.explicit=!0,s.length!==1)return n(0,"%YAML directive should contain exactly one part"),!1;const[i]=s;if(i==="1.1"||i==="1.2")return this.yaml.version=i,!0;{const o=/^\d+\.\d+$/.test(i);return n(6,`Unsupported YAML version ${i}`,o),!1}}default:return n(0,`Unknown directive ${a}`,!0),!1}}tagName(t,n){if(t==="!")return"!";if(t[0]!=="!")return n(`Not a valid tag: ${t}`),null;if(t[1]==="<"){const o=t.slice(2,-1);return o==="!"||o==="!!"?(n(`Verbatim tags aren't resolved, so ${t} is invalid.`),null):(t[t.length-1]!==">"&&n("Verbatim tags must end with a >"),o)}const[,s,a]=t.match(/^(.*!)([^!]*)$/s);a||n(`The ${t} tag has no suffix`);const i=this.tags[s];if(i)try{return i+decodeURIComponent(a)}catch(o){return n(String(o)),null}return s==="!"?t:(n(`Could not resolve tag: ${t}`),null)}tagString(t){for(const[n,s]of Object.entries(this.tags))if(t.startsWith(s))return n+DC(t.substring(s.length));return t[0]==="!"?t:`!<${t}>`}toString(t){const n=this.yaml.explicit?[`%YAML ${this.yaml.version||"1.2"}`]:[],s=Object.entries(this.tags);let a;if(t&&s.length>0&&_t(t.contents)){const i={};ai(t.contents,(o,r)=>{_t(r)&&r.tag&&(i[r.tag]=!0)}),a=Object.keys(i)}else a=[];for(const[i,o]of s)i==="!!"&&o==="tag:yaml.org,2002:"||(!t||a.some(r=>r.startsWith(o)))&&n.push(`%TAG ${i} ${o}`);return n.join(`
`)}}Zt.defaultYaml={explicit:!1,version:"1.2"};Zt.defaultTags={"!!":"tag:yaml.org,2002:"};function mv(e){if(/[\x00-\x19\s,[\]{}]/.test(e)){const n=`Anchor must not contain whitespace or control characters: ${JSON.stringify(e)}`;throw new Error(n)}return!0}function gv(e){const t=new Set;return ai(e,{Value(n,s){s.anchor&&t.add(s.anchor)}}),t}function vv(e,t){for(let n=1;;++n){const s=`${e}${n}`;if(!t.has(s))return s}}function RC(e,t){const n=[],s=new Map;let a=null;return{onAnchor:i=>{n.push(i),a??(a=gv(e));const o=vv(t,a);return a.add(o),o},setAnchors:()=>{for(const i of n){const o=s.get(i);if(typeof o=="object"&&o.anchor&&(ft(o.node)||xt(o.node)))o.node.anchor=o.anchor;else{const r=new Error("Failed to resolve repeated object (this should not happen)");throw r.source=i,r}}},sourceObjects:s}}function Ia(e,t,n,s){if(s&&typeof s=="object")if(Array.isArray(s))for(let a=0,i=s.length;a<i;++a){const o=s[a],r=Ia(e,s,String(a),o);r===void 0?delete s[a]:r!==o&&(s[a]=r)}else if(s instanceof Map)for(const a of Array.from(s.keys())){const i=s.get(a),o=Ia(e,s,a,i);o===void 0?s.delete(a):o!==i&&s.set(a,o)}else if(s instanceof Set)for(const a of Array.from(s)){const i=Ia(e,s,a,a);i===void 0?s.delete(a):i!==a&&(s.delete(a),s.add(i))}else for(const[a,i]of Object.entries(s)){const o=Ia(e,s,a,i);o===void 0?delete s[a]:o!==i&&(s[a]=o)}return e.call(t,n,s)}function An(e,t,n){if(Array.isArray(e))return e.map((s,a)=>An(s,String(a),n));if(e&&typeof e.toJSON=="function"){if(!n||!pv(e))return e.toJSON(t,n);const s={aliasCount:0,count:1,res:void 0};n.anchors.set(e,s),n.onCreate=i=>{s.res=i,delete n.onCreate};const a=e.toJSON(t,n);return n.onCreate&&n.onCreate(a),a}return typeof e=="bigint"&&!(n!=null&&n.keep)?Number(e):e}class Au{constructor(t){Object.defineProperty(this,Tn,{value:t})}clone(){const t=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return this.range&&(t.range=this.range.slice()),t}toJS(t,{mapAsMap:n,maxAliasCount:s,onAnchor:a,reviver:i}={}){if(!qr(t))throw new TypeError("A document argument is required");const o={anchors:new Map,doc:t,keep:!0,mapAsMap:n===!0,mapKeyWarned:!1,maxAliasCount:typeof s=="number"?s:100},r=An(this,"",o);if(typeof a=="function")for(const{count:l,res:u}of o.anchors.values())a(u,l);return typeof i=="function"?Ia(i,{"":r},"",r):r}}class Cu extends Au{constructor(t){super(_u),this.source=t,Object.defineProperty(this,"tag",{set(){throw new Error("Alias nodes cannot have tags")}})}resolve(t,n){if((n==null?void 0:n.maxAliasCount)===0)throw new ReferenceError("Alias resolution is disabled");let s;n!=null&&n.aliasResolveCache?s=n.aliasResolveCache:(s=[],ai(t,{Node:(i,o)=>{(si(o)||pv(o))&&s.push(o)}}),n&&(n.aliasResolveCache=s));let a;for(const i of s){if(i===this)break;i.anchor===this.source&&(a=i)}return a}toJSON(t,n){if(!n)return{source:this.source};const{anchors:s,doc:a,maxAliasCount:i}=n,o=this.resolve(a,n);if(!o){const l=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new ReferenceError(l)}let r=s.get(o);if(r||(An(o,null,n),r=s.get(o)),(r==null?void 0:r.res)===void 0){const l="This should not happen: Alias anchor was not resolved?";throw new ReferenceError(l)}if(i>=0&&(r.count+=1,r.aliasCount===0&&(r.aliasCount=Wo(a,o,s)),r.count*r.aliasCount>i)){const l="Excessive alias count indicates a resource exhaustion attack";throw new ReferenceError(l)}return r.res}toString(t,n,s){const a=`*${this.source}`;if(t){if(mv(this.source),t.options.verifyAliasOrder&&!t.anchors.has(this.source)){const i=`Unresolved alias (the anchor must be set before the alias): ${this.source}`;throw new Error(i)}if(t.implicitKey)return`${a} `}return a}}function Wo(e,t,n){if(si(t)){const s=t.resolve(e),a=n&&s&&n.get(s);return a?a.count*a.aliasCount:0}else if(xt(t)){let s=0;for(const a of t.items){const i=Wo(e,a,n);i>s&&(s=i)}return s}else if(At(t)){const s=Wo(e,t.key,n),a=Wo(e,t.value,n);return Math.max(s,a)}return 1}const yv=e=>!e||typeof e!="function"&&typeof e!="object";class We extends Au{constructor(t){super(ns),this.value=t}toJSON(t,n){return n!=null&&n.keep?this.value:An(this.value,t,n)}toString(){return String(this.value)}}We.BLOCK_FOLDED="BLOCK_FOLDED";We.BLOCK_LITERAL="BLOCK_LITERAL";We.PLAIN="PLAIN";We.QUOTE_DOUBLE="QUOTE_DOUBLE";We.QUOTE_SINGLE="QUOTE_SINGLE";const MC="tag:yaml.org,2002:";function $C(e,t,n){if(t){const s=n.filter(i=>i.tag===t),a=s.find(i=>!i.format)??s[0];if(!a)throw new Error(`Tag ${t} not found`);return a}return n.find(s=>{var a;return((a=s.identify)==null?void 0:a.call(s,e))&&!s.format})}function Zi(e,t,n){var h,f,p;if(qr(e)&&(e=e.contents),_t(e))return e;if(At(e)){const g=(f=(h=n.schema[Bs]).createNode)==null?void 0:f.call(h,n.schema,null,n);return g.items.push(e),g}(e instanceof String||e instanceof Number||e instanceof Boolean||typeof BigInt<"u"&&e instanceof BigInt)&&(e=e.valueOf());const{aliasDuplicateObjects:s,onAnchor:a,onTagObj:i,schema:o,sourceObjects:r}=n;let l;if(s&&e&&typeof e=="object"){if(l=r.get(e),l)return l.anchor??(l.anchor=a(e)),new Cu(l.anchor);l={anchor:null,node:null},r.set(e,l)}t!=null&&t.startsWith("!!")&&(t=MC+t.slice(2));let u=$C(e,t,o.tags);if(!u){if(e&&typeof e.toJSON=="function"&&(e=e.toJSON()),!e||typeof e!="object"){const g=new We(e);return l&&(l.node=g),g}u=e instanceof Map?o[Bs]:Symbol.iterator in Object(e)?o[ni]:o[Bs]}i&&(i(u),delete n.onTagObj);const d=u!=null&&u.createNode?u.createNode(n.schema,e,n):typeof((p=u==null?void 0:u.nodeClass)==null?void 0:p.from)=="function"?u.nodeClass.from(n.schema,e,n):new We(e);return t?d.tag=t:u.default||(d.tag=u.tag),l&&(l.node=d),d}function gr(e,t,n){let s=n;for(let a=t.length-1;a>=0;--a){const i=t[a];if(typeof i=="number"&&Number.isInteger(i)&&i>=0){const o=[];o[i]=s,s=o}else s=new Map([[i,s]])}return Zi(s,void 0,{aliasDuplicateObjects:!1,keepUndefined:!1,onAnchor:()=>{throw new Error("This should not happen, please report a bug.")},schema:e,sourceObjects:new Map})}const wi=e=>e==null||typeof e=="object"&&!!e[Symbol.iterator]().next().done;class bv extends Au{constructor(t,n){super(t),Object.defineProperty(this,"schema",{value:n,configurable:!0,enumerable:!1,writable:!0})}clone(t){const n=Object.create(Object.getPrototypeOf(this),Object.getOwnPropertyDescriptors(this));return t&&(n.schema=t),n.items=n.items.map(s=>_t(s)||At(s)?s.clone(t):s),this.range&&(n.range=this.range.slice()),n}addIn(t,n){if(wi(t))this.add(n);else{const[s,...a]=t,i=this.get(s,!0);if(xt(i))i.addIn(a,n);else if(i===void 0&&this.schema)this.set(s,gr(this.schema,a,n));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${a}`)}}deleteIn(t){const[n,...s]=t;if(s.length===0)return this.delete(n);const a=this.get(n,!0);if(xt(a))return a.deleteIn(s);throw new Error(`Expected YAML collection at ${n}. Remaining path: ${s}`)}getIn(t,n){const[s,...a]=t,i=this.get(s,!0);return a.length===0?!n&&ft(i)?i.value:i:xt(i)?i.getIn(a,n):void 0}hasAllNullValues(t){return this.items.every(n=>{if(!At(n))return!1;const s=n.value;return s==null||t&&ft(s)&&s.value==null&&!s.commentBefore&&!s.comment&&!s.tag})}hasIn(t){const[n,...s]=t;if(s.length===0)return this.has(n);const a=this.get(n,!0);return xt(a)?a.hasIn(s):!1}setIn(t,n){const[s,...a]=t;if(a.length===0)this.set(s,n);else{const i=this.get(s,!0);if(xt(i))i.setIn(a,n);else if(i===void 0&&this.schema)this.set(s,gr(this.schema,a,n));else throw new Error(`Expected YAML collection at ${s}. Remaining path: ${a}`)}}}const jC=e=>e.replace(/^(?!$)(?: $)?/gm,"#");function fs(e,t){return/^\n+$/.test(e)?e.substring(1):t?e.replace(/^(?! *$)/gm,t):e}const na=(e,t,n)=>e.endsWith(`
`)?fs(n,t):n.includes(`
`)?`
`+fs(n,t):(e.endsWith(" ")?"":" ")+n,wv="flow",wc="block",Ho="quoted";function zr(e,t,n="flow",{indentAtStart:s,lineWidth:a=80,minContentWidth:i=20,onFold:o,onOverflow:r}={}){if(!a||a<0)return e;a<i&&(i=0);const l=Math.max(1+i,1+a-t.length);if(e.length<=l)return e;const u=[],d={};let h=a-t.length;typeof s=="number"&&(s>a-Math.max(2,i)?u.push(0):h=a-s);let f,p,g=!1,m=-1,v=-1,y=-1;n===wc&&(m=yf(e,m,t.length),m!==-1&&(h=m+l));for(let x;x=e[m+=1];){if(n===Ho&&x==="\\"){switch(v=m,e[m+1]){case"x":m+=3;break;case"u":m+=5;break;case"U":m+=9;break;default:m+=1}y=m}if(x===`
`)n===wc&&(m=yf(e,m,t.length)),h=m+t.length+l,f=void 0;else{if(x===" "&&p&&p!==" "&&p!==`
`&&p!=="	"){const T=e[m+1];T&&T!==" "&&T!==`
`&&T!=="	"&&(f=m)}if(m>=h)if(f)u.push(f),h=f+l,f=void 0;else if(n===Ho){for(;p===" "||p==="	";)p=x,x=e[m+=1],g=!0;const T=m>y+1?m-2:v-1;if(d[T])return e;u.push(T),d[T]=!0,h=T+l,f=void 0}else g=!0}p=x}if(g&&r&&r(),u.length===0)return e;o&&o();let w=e.slice(0,u[0]);for(let x=0;x<u.length;++x){const T=u[x],C=u[x+1]||e.length;T===0?w=`
${t}${e.slice(0,C)}`:(n===Ho&&d[T]&&(w+=`${e[T]}\\`),w+=`
${t}${e.slice(T+1,C)}`)}return w}function yf(e,t,n){let s=t,a=t+1,i=e[a];for(;i===" "||i==="	";)if(t<a+n)i=e[++t];else{do i=e[++t];while(i&&i!==`
`);s=t,a=t+1,i=e[a]}return s}const Ur=(e,t)=>({indentAtStart:t?e.indent.length:e.indentAtStart,lineWidth:e.options.lineWidth,minContentWidth:e.options.minContentWidth}),Gr=e=>/^(%|---|\.\.\.)/m.test(e);function VC(e,t,n){if(!t||t<0)return!1;const s=t-n,a=e.length;if(a<=s)return!1;for(let i=0,o=0;i<a;++i)if(e[i]===`
`){if(i-o>s)return!0;if(o=i+1,a-o<=s)return!1}return!0}function Bi(e,t){const n=JSON.stringify(e);if(t.options.doubleQuotedAsJSON)return n;const{implicitKey:s}=t,a=t.options.doubleQuotedMinMultiLineLength,i=t.indent||(Gr(e)?"  ":"");let o="",r=0;for(let l=0,u=n[l];u;u=n[++l])if(u===" "&&n[l+1]==="\\"&&n[l+2]==="n"&&(o+=n.slice(r,l)+"\\ ",l+=1,r=l,u="\\"),u==="\\")switch(n[l+1]){case"u":{o+=n.slice(r,l);const d=n.substr(l+2,4);switch(d){case"0000":o+="\\0";break;case"0007":o+="\\a";break;case"000b":o+="\\v";break;case"001b":o+="\\e";break;case"0085":o+="\\N";break;case"00a0":o+="\\_";break;case"2028":o+="\\L";break;case"2029":o+="\\P";break;default:d.substr(0,2)==="00"?o+="\\x"+d.substr(2):o+=n.substr(l,6)}l+=5,r=l+1}break;case"n":if(s||n[l+2]==='"'||n.length<a)l+=1;else{for(o+=n.slice(r,l)+`

`;n[l+2]==="\\"&&n[l+3]==="n"&&n[l+4]!=='"';)o+=`
`,l+=2;o+=i,n[l+2]===" "&&(o+="\\"),l+=1,r=l+1}break;default:l+=1}return o=r?o+n.slice(r):n,s?o:zr(o,i,Ho,Ur(t,!1))}function kc(e,t){if(t.options.singleQuote===!1||t.implicitKey&&e.includes(`
`)||/[ \t]\n|\n[ \t]/.test(e))return Bi(e,t);const n=t.indent||(Gr(e)?"  ":""),s="'"+e.replace(/'/g,"''").replace(/\n+/g,`$&
${n}`)+"'";return t.implicitKey?s:zr(s,n,wv,Ur(t,!1))}function Ea(e,t){const{singleQuote:n}=t.options;let s;if(n===!1)s=Bi;else{const a=e.includes('"'),i=e.includes("'");a&&!i?s=kc:i&&!a?s=Bi:s=n?kc:Bi}return s(e,t)}let Sc;try{Sc=new RegExp(`(^|(?<!
))
+(?!
|$)`,"g")}catch{Sc=/\n+(?!\n|$)/g}function qo({comment:e,type:t,value:n},s,a,i){const{blockQuote:o,commentString:r,lineWidth:l}=s.options;if(!o||/\n[\t ]+$/.test(n))return Ea(n,s);const u=s.indent||(s.forceBlockIndent||Gr(n)?"  ":""),d=o==="literal"?!0:o==="folded"||t===We.BLOCK_FOLDED?!1:t===We.BLOCK_LITERAL?!0:!VC(n,l,u.length);if(!n)return d?`|
`:`>
`;let h,f;for(f=n.length;f>0;--f){const C=n[f-1];if(C!==`
`&&C!=="	"&&C!==" ")break}let p=n.substring(f);const g=p.indexOf(`
`);g===-1?h="-":n===p||g!==p.length-1?(h="+",i&&i()):h="",p&&(n=n.slice(0,-p.length),p[p.length-1]===`
`&&(p=p.slice(0,-1)),p=p.replace(Sc,`$&${u}`));let m=!1,v,y=-1;for(v=0;v<n.length;++v){const C=n[v];if(C===" ")m=!0;else if(C===`
`)y=v;else break}let w=n.substring(0,y<v?y+1:v);w&&(n=n.substring(w.length),w=w.replace(/\n+/g,`$&${u}`));let T=(m?u?"2":"1":"")+h;if(e&&(T+=" "+r(e.replace(/ ?[\r\n]+/g," ")),a&&a()),!d){const C=n.replace(/\n+/g,`
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g,"$1$2").replace(/\n+/g,`$&${u}`);let _=!1;const I=Ur(s,!0);o!=="folded"&&t!==We.BLOCK_FOLDED&&(I.onOverflow=()=>{_=!0});const k=zr(`${w}${C}${p}`,u,wc,I);if(!_)return`>${T}
${u}${k}`}return n=n.replace(/\n+/g,`$&${u}`),`|${T}
${u}${w}${n}${p}`}function FC(e,t,n,s){const{type:a,value:i}=e,{actualString:o,implicitKey:r,indent:l,indentStep:u,inFlow:d}=t;if(r&&i.includes(`
`)||d&&/[[\]{},]/.test(i))return Ea(i,t);if(/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(i))return r||d||!i.includes(`
`)?Ea(i,t):qo(e,t,n,s);if(!r&&!d&&a!==We.PLAIN&&i.includes(`
`))return qo(e,t,n,s);if(Gr(i)){if(l==="")return t.forceBlockIndent=!0,qo(e,t,n,s);if(r&&l===u)return Ea(i,t)}const h=i.replace(/\n+/g,`$&
${l}`);if(o){const f=m=>{var v;return m.default&&m.tag!=="tag:yaml.org,2002:str"&&((v=m.test)==null?void 0:v.test(h))},{compat:p,tags:g}=t.doc.schema;if(g.some(f)||p!=null&&p.some(f))return Ea(i,t)}return r?h:zr(h,l,wv,Ur(t,!1))}function Tu(e,t,n,s){const{implicitKey:a,inFlow:i}=t,o=typeof e.value=="string"?e:Object.assign({},e,{value:String(e.value)});let{type:r}=e;r!==We.QUOTE_DOUBLE&&/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value)&&(r=We.QUOTE_DOUBLE);const l=d=>{switch(d){case We.BLOCK_FOLDED:case We.BLOCK_LITERAL:return a||i?Ea(o.value,t):qo(o,t,n,s);case We.QUOTE_DOUBLE:return Bi(o.value,t);case We.QUOTE_SINGLE:return kc(o.value,t);case We.PLAIN:return FC(o,t,n,s);default:return null}};let u=l(r);if(u===null){const{defaultKeyType:d,defaultStringType:h}=t.options,f=a&&d||h;if(u=l(f),u===null)throw new Error(`Unsupported default string type ${f}`)}return u}function kv(e,t){const n=Object.assign({blockQuote:!0,commentString:jC,defaultKeyType:null,defaultStringType:"PLAIN",directives:null,doubleQuotedAsJSON:!1,doubleQuotedMinMultiLineLength:40,falseStr:"false",flowCollectionPadding:!0,indentSeq:!0,lineWidth:80,minContentWidth:20,nullStr:"null",simpleKeys:!1,singleQuote:null,trailingComma:!1,trueStr:"true",verifyAliasOrder:!0},e.schema.toStringOptions,t);let s;switch(n.collectionStyle){case"block":s=!1;break;case"flow":s=!0;break;default:s=null}return{anchors:new Set,doc:e,flowCollectionPadding:n.flowCollectionPadding?" ":"",indent:"",indentStep:typeof n.indent=="number"?" ".repeat(n.indent):"  ",inFlow:s,options:n}}function WC(e,t){var a;if(t.tag){const i=e.filter(o=>o.tag===t.tag);if(i.length>0)return i.find(o=>o.format===t.format)??i[0]}let n,s;if(ft(t)){s=t.value;let i=e.filter(o=>{var r;return(r=o.identify)==null?void 0:r.call(o,s)});if(i.length>1){const o=i.filter(r=>r.test);o.length>0&&(i=o)}n=i.find(o=>o.format===t.format)??i.find(o=>!o.format)}else s=t,n=e.find(i=>i.nodeClass&&s instanceof i.nodeClass);if(!n){const i=((a=s==null?void 0:s.constructor)==null?void 0:a.name)??(s===null?"null":typeof s);throw new Error(`Tag not resolved for ${i} value`)}return n}function HC(e,t,{anchors:n,doc:s}){if(!s.directives)return"";const a=[],i=(ft(e)||xt(e))&&e.anchor;i&&mv(i)&&(n.add(i),a.push(`&${i}`));const o=e.tag??(t.default?null:t.tag);return o&&a.push(s.directives.tagString(o)),a.join(" ")}function Ga(e,t,n,s){var l;if(At(e))return e.toString(t,n,s);if(si(e)){if(t.doc.directives)return e.toString(t);if((l=t.resolvedAliases)!=null&&l.has(e))throw new TypeError("Cannot stringify circular structure without alias nodes");t.resolvedAliases?t.resolvedAliases.add(e):t.resolvedAliases=new Set([e]),e=e.resolve(t.doc)}let a;const i=_t(e)?e:t.doc.createNode(e,{onTagObj:u=>a=u});a??(a=WC(t.doc.schema.tags,i));const o=HC(i,a,t);o.length>0&&(t.indentAtStart=(t.indentAtStart??0)+o.length+1);const r=typeof a.stringify=="function"?a.stringify(i,t,n,s):ft(i)?Tu(i,t,n,s):i.toString(t,n,s);return o?ft(i)||r[0]==="{"||r[0]==="["?`${o} ${r}`:`${o}
${t.indent}${r}`:r}function qC({key:e,value:t},n,s,a){const{allNullValues:i,doc:o,indent:r,indentStep:l,options:{commentString:u,indentSeq:d,simpleKeys:h}}=n;let f=_t(e)&&e.comment||null;if(h){if(f)throw new Error("With simple keys, key nodes cannot have comments");if(xt(e)||!_t(e)&&typeof e=="object"){const I="With simple keys, collection cannot be used as a key value";throw new Error(I)}}let p=!h&&(!e||f&&t==null&&!n.inFlow||xt(e)||(ft(e)?e.type===We.BLOCK_FOLDED||e.type===We.BLOCK_LITERAL:typeof e=="object"));n=Object.assign({},n,{allNullValues:!1,implicitKey:!p&&(h||!i),indent:r+l});let g=!1,m=!1,v=Ga(e,n,()=>g=!0,()=>m=!0);if(!p&&!n.inFlow&&v.length>1024){if(h)throw new Error("With simple keys, single line scalar must not span more than 1024 characters");p=!0}if(n.inFlow){if(i||t==null)return g&&s&&s(),v===""?"?":p?`? ${v}`:v}else if(i&&!h||t==null&&p)return v=`? ${v}`,f&&!g?v+=na(v,n.indent,u(f)):m&&a&&a(),v;g&&(f=null),p?(f&&(v+=na(v,n.indent,u(f))),v=`? ${v}
${r}:`):(v=`${v}:`,f&&(v+=na(v,n.indent,u(f))));let y,w,x;_t(t)?(y=!!t.spaceBefore,w=t.commentBefore,x=t.comment):(y=!1,w=null,x=null,t&&typeof t=="object"&&(t=o.createNode(t))),n.implicitKey=!1,!p&&!f&&ft(t)&&(n.indentAtStart=v.length+1),m=!1,!d&&l.length>=2&&!n.inFlow&&!p&&mo(t)&&!t.flow&&!t.tag&&!t.anchor&&(n.indent=n.indent.substring(2));let T=!1;const C=Ga(t,n,()=>T=!0,()=>m=!0);let _=" ";if(f||y||w){if(_=y?`
`:"",w){const I=u(w);_+=`
${fs(I,n.indent)}`}C===""&&!n.inFlow?_===`
`&&x&&(_=`

`):_+=`
${n.indent}`}else if(!p&&xt(t)){const I=C[0],k=C.indexOf(`
`),O=k!==-1,$=n.inFlow??t.flow??t.items.length===0;if(O||!$){let q=!1;if(O&&(I==="&"||I==="!")){let R=C.indexOf(" ");I==="&"&&R!==-1&&R<k&&C[R+1]==="!"&&(R=C.indexOf(" ",R+1)),(R===-1||k<R)&&(q=!0)}q||(_=`
${n.indent}`)}}else(C===""||C[0]===`
`)&&(_="");return v+=_+C,n.inFlow?T&&s&&s():x&&!T?v+=na(v,n.indent,u(x)):m&&a&&a(),v}function Sv(e,t){(e==="debug"||e==="warn")&&console.warn(t)}const Oo="<<",ps={identify:e=>e===Oo||typeof e=="symbol"&&e.description===Oo,default:"key",tag:"tag:yaml.org,2002:merge",test:/^<<$/,resolve:()=>Object.assign(new We(Symbol(Oo)),{addToJSMap:xv}),stringify:()=>Oo},zC=(e,t)=>(ps.identify(t)||ft(t)&&(!t.type||t.type===We.PLAIN)&&ps.identify(t.value))&&(e==null?void 0:e.doc.schema.tags.some(n=>n.tag===ps.tag&&n.default));function xv(e,t,n){const s=_v(e,n);if(mo(s))for(const a of s.items)Ml(e,t,a);else if(Array.isArray(s))for(const a of s)Ml(e,t,a);else Ml(e,t,s)}function Ml(e,t,n){const s=_v(e,n);if(!po(s))throw new Error("Merge sources must be maps or map aliases");const a=s.toJSON(null,e,Map);for(const[i,o]of a)t instanceof Map?t.has(i)||t.set(i,o):t instanceof Set?t.add(i):Object.prototype.hasOwnProperty.call(t,i)||Object.defineProperty(t,i,{value:o,writable:!0,enumerable:!0,configurable:!0});return t}function _v(e,t){return e&&si(t)?t.resolve(e.doc,e):t}function Av(e,t,{key:n,value:s}){if(_t(n)&&n.addToJSMap)n.addToJSMap(e,t,s);else if(zC(e,n))xv(e,t,s);else{const a=An(n,"",e);if(t instanceof Map)t.set(a,An(s,a,e));else if(t instanceof Set)t.add(a);else{const i=UC(n,a,e),o=An(s,i,e);i in t?Object.defineProperty(t,i,{value:o,writable:!0,enumerable:!0,configurable:!0}):t[i]=o}}return t}function UC(e,t,n){if(t===null)return"";if(typeof t!="object")return String(t);if(_t(e)&&(n!=null&&n.doc)){const s=kv(n.doc,{});s.anchors=new Set;for(const i of n.anchors.keys())s.anchors.add(i.anchor);s.inFlow=!0,s.inStringifyKey=!0;const a=e.toString(s);if(!n.mapKeyWarned){let i=JSON.stringify(a);i.length>40&&(i=i.substring(0,36)+'..."'),Sv(n.doc.options.logLevel,`Keys with collection values will be stringified due to JS Object restrictions: ${i}. Set mapAsMap: true to use object keys.`),n.mapKeyWarned=!0}return a}return JSON.stringify(t)}function Iu(e,t,n){const s=Zi(e,void 0,n),a=Zi(t,void 0,n);return new nn(s,a)}class nn{constructor(t,n=null){Object.defineProperty(this,Tn,{value:fv}),this.key=t,this.value=n}clone(t){let{key:n,value:s}=this;return _t(n)&&(n=n.clone(t)),_t(s)&&(s=s.clone(t)),new nn(n,s)}toJSON(t,n){const s=n!=null&&n.mapAsMap?new Map:{};return Av(n,s,this)}toString(t,n,s){return t!=null&&t.doc?qC(this,t,n,s):JSON.stringify(this)}}function Cv(e,t,n){return(t.inFlow??e.flow?KC:GC)(e,t,n)}function GC({comment:e,items:t},n,{blockItemPrefix:s,flowChars:a,itemIndent:i,onChompKeep:o,onComment:r}){const{indent:l,options:{commentString:u}}=n,d=Object.assign({},n,{indent:i,type:null});let h=!1;const f=[];for(let g=0;g<t.length;++g){const m=t[g];let v=null;if(_t(m))!h&&m.spaceBefore&&f.push(""),vr(n,f,m.commentBefore,h),m.comment&&(v=m.comment);else if(At(m)){const w=_t(m.key)?m.key:null;w&&(!h&&w.spaceBefore&&f.push(""),vr(n,f,w.commentBefore,h))}h=!1;let y=Ga(m,d,()=>v=null,()=>h=!0);v&&(y+=na(y,i,u(v))),h&&v&&(h=!1),f.push(s+y)}let p;if(f.length===0)p=a.start+a.end;else{p=f[0];for(let g=1;g<f.length;++g){const m=f[g];p+=m?`
${l}${m}`:`
`}}return e?(p+=`
`+fs(u(e),l),r&&r()):h&&o&&o(),p}function KC({items:e},t,{flowChars:n,itemIndent:s}){const{indent:a,indentStep:i,flowCollectionPadding:o,options:{commentString:r}}=t;s+=i;const l=Object.assign({},t,{indent:s,inFlow:!0,type:null});let u=!1,d=0;const h=[];for(let g=0;g<e.length;++g){const m=e[g];let v=null;if(_t(m))m.spaceBefore&&h.push(""),vr(t,h,m.commentBefore,!1),m.comment&&(v=m.comment);else if(At(m)){const w=_t(m.key)?m.key:null;w&&(w.spaceBefore&&h.push(""),vr(t,h,w.commentBefore,!1),w.comment&&(u=!0));const x=_t(m.value)?m.value:null;x?(x.comment&&(v=x.comment),x.commentBefore&&(u=!0)):m.value==null&&(w!=null&&w.comment)&&(v=w.comment)}v&&(u=!0);let y=Ga(m,l,()=>v=null);u||(u=h.length>d||y.includes(`
`)),g<e.length-1?y+=",":t.options.trailingComma&&(t.options.lineWidth>0&&(u||(u=h.reduce((w,x)=>w+x.length+2,2)+(y.length+2)>t.options.lineWidth)),u&&(y+=",")),v&&(y+=na(y,s,r(v))),h.push(y),d=h.length}const{start:f,end:p}=n;if(h.length===0)return f+p;if(!u){const g=h.reduce((m,v)=>m+v.length+2,2);u=t.options.lineWidth>0&&g>t.options.lineWidth}if(u){let g=f;for(const m of h)g+=m?`
${i}${a}${m}`:`
`;return`${g}
${a}${p}`}else return`${f}${o}${h.join(" ")}${o}${p}`}function vr({indent:e,options:{commentString:t}},n,s,a){if(s&&a&&(s=s.replace(/^\n+/,"")),s){const i=fs(t(s),e);n.push(i.trimStart())}}function sa(e,t){const n=ft(t)?t.value:t;for(const s of e)if(At(s)&&(s.key===t||s.key===n||ft(s.key)&&s.key.value===n))return s}class xn extends bv{static get tagName(){return"tag:yaml.org,2002:map"}constructor(t){super(Bs,t),this.items=[]}static from(t,n,s){const{keepUndefined:a,replacer:i}=s,o=new this(t),r=(l,u)=>{if(typeof i=="function")u=i.call(n,l,u);else if(Array.isArray(i)&&!i.includes(l))return;(u!==void 0||a)&&o.items.push(Iu(l,u,s))};if(n instanceof Map)for(const[l,u]of n)r(l,u);else if(n&&typeof n=="object")for(const l of Object.keys(n))r(l,n[l]);return typeof t.sortMapEntries=="function"&&o.items.sort(t.sortMapEntries),o}add(t,n){var o;let s;At(t)?s=t:!t||typeof t!="object"||!("key"in t)?s=new nn(t,t==null?void 0:t.value):s=new nn(t.key,t.value);const a=sa(this.items,s.key),i=(o=this.schema)==null?void 0:o.sortMapEntries;if(a){if(!n)throw new Error(`Key ${s.key} already set`);ft(a.value)&&yv(s.value)?a.value.value=s.value:a.value=s.value}else if(i){const r=this.items.findIndex(l=>i(s,l)<0);r===-1?this.items.push(s):this.items.splice(r,0,s)}else this.items.push(s)}delete(t){const n=sa(this.items,t);return n?this.items.splice(this.items.indexOf(n),1).length>0:!1}get(t,n){const s=sa(this.items,t),a=s==null?void 0:s.value;return(!n&&ft(a)?a.value:a)??void 0}has(t){return!!sa(this.items,t)}set(t,n){this.add(new nn(t,n),!0)}toJSON(t,n,s){const a=s?new s:n!=null&&n.mapAsMap?new Map:{};n!=null&&n.onCreate&&n.onCreate(a);for(const i of this.items)Av(n,a,i);return a}toString(t,n,s){if(!t)return JSON.stringify(this);for(const a of this.items)if(!At(a))throw new Error(`Map items must all be pairs; found ${JSON.stringify(a)} instead`);return!t.allNullValues&&this.hasAllNullValues(!1)&&(t=Object.assign({},t,{allNullValues:!0})),Cv(this,t,{blockItemPrefix:"",flowChars:{start:"{",end:"}"},itemIndent:t.indent||"",onChompKeep:s,onComment:n})}}const ii={collection:"map",default:!0,nodeClass:xn,tag:"tag:yaml.org,2002:map",resolve(e,t){return po(e)||t("Expected a mapping for this tag"),e},createNode:(e,t,n)=>xn.from(e,t,n)};class fa extends bv{static get tagName(){return"tag:yaml.org,2002:seq"}constructor(t){super(ni,t),this.items=[]}add(t){this.items.push(t)}delete(t){const n=No(t);return typeof n!="number"?!1:this.items.splice(n,1).length>0}get(t,n){const s=No(t);if(typeof s!="number")return;const a=this.items[s];return!n&&ft(a)?a.value:a}has(t){const n=No(t);return typeof n=="number"&&n<this.items.length}set(t,n){const s=No(t);if(typeof s!="number")throw new Error(`Expected a valid index, not ${t}.`);const a=this.items[s];ft(a)&&yv(n)?a.value=n:this.items[s]=n}toJSON(t,n){const s=[];n!=null&&n.onCreate&&n.onCreate(s);let a=0;for(const i of this.items)s.push(An(i,String(a++),n));return s}toString(t,n,s){return t?Cv(this,t,{blockItemPrefix:"- ",flowChars:{start:"[",end:"]"},itemIndent:(t.indent||"")+"  ",onChompKeep:s,onComment:n}):JSON.stringify(this)}static from(t,n,s){const{replacer:a}=s,i=new this(t);if(n&&Symbol.iterator in Object(n)){let o=0;for(let r of n){if(typeof a=="function"){const l=n instanceof Set?r:String(o++);r=a.call(n,l,r)}i.items.push(Zi(r,void 0,s))}}return i}}function No(e){let t=ft(e)?e.value:e;return t&&typeof t=="string"&&(t=Number(t)),typeof t=="number"&&Number.isInteger(t)&&t>=0?t:null}const oi={collection:"seq",default:!0,nodeClass:fa,tag:"tag:yaml.org,2002:seq",resolve(e,t){return mo(e)||t("Expected a sequence for this tag"),e},createNode:(e,t,n)=>fa.from(e,t,n)},Kr={identify:e=>typeof e=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:e=>e,stringify(e,t,n,s){return t=Object.assign({actualString:!0},t),Tu(e,t,n,s)}},Yr={identify:e=>e==null,createNode:()=>new We(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^(?:~|[Nn]ull|NULL)?$/,resolve:()=>new We(null),stringify:({source:e},t)=>typeof e=="string"&&Yr.test.test(e)?e:t.options.nullStr},Eu={identify:e=>typeof e=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,resolve:e=>new We(e[0]==="t"||e[0]==="T"),stringify({source:e,value:t},n){if(e&&Eu.test.test(e)){const s=e[0]==="t"||e[0]==="T";if(t===s)return e}return t?n.options.trueStr:n.options.falseStr}};function Hn({format:e,minFractionDigits:t,tag:n,value:s}){if(typeof s=="bigint")return String(s);const a=typeof s=="number"?s:Number(s);if(!isFinite(a))return isNaN(a)?".nan":a<0?"-.inf":".inf";let i=Object.is(s,-0)?"-0":JSON.stringify(s);if(!e&&t&&(!n||n==="tag:yaml.org,2002:float")&&/^-?\d/.test(i)&&!i.includes("e")){let o=i.indexOf(".");o<0&&(o=i.length,i+=".");let r=t-(i.length-o-1);for(;r-- >0;)i+="0"}return i}const Tv={identify:e=>typeof e=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:e=>e.slice(-3).toLowerCase()==="nan"?NaN:e[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Hn},Iv={identify:e=>typeof e=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,resolve:e=>parseFloat(e),stringify(e){const t=Number(e.value);return isFinite(t)?t.toExponential():Hn(e)}},Ev={identify:e=>typeof e=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,resolve(e){const t=new We(parseFloat(e)),n=e.indexOf(".");return n!==-1&&e[e.length-1]==="0"&&(t.minFractionDigits=e.length-n-1),t},stringify:Hn},Xr=e=>typeof e=="bigint"||Number.isInteger(e),Lu=(e,t,n,{intAsBigInt:s})=>s?BigInt(e):parseInt(e.substring(t),n);function Lv(e,t,n){const{value:s}=e;return Xr(s)&&s>=0?n+s.toString(t):Hn(e)}const Ov={identify:e=>Xr(e)&&e>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^0o[0-7]+$/,resolve:(e,t,n)=>Lu(e,2,8,n),stringify:e=>Lv(e,8,"0o")},Nv={identify:Xr,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9]+$/,resolve:(e,t,n)=>Lu(e,0,10,n),stringify:Hn},Pv={identify:e=>Xr(e)&&e>=0,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^0x[0-9a-fA-F]+$/,resolve:(e,t,n)=>Lu(e,2,16,n),stringify:e=>Lv(e,16,"0x")},YC=[ii,oi,Kr,Yr,Eu,Ov,Nv,Pv,Tv,Iv,Ev];function bf(e){return typeof e=="bigint"||Number.isInteger(e)}const Po=({value:e})=>JSON.stringify(e),XC=[{identify:e=>typeof e=="string",default:!0,tag:"tag:yaml.org,2002:str",resolve:e=>e,stringify:Po},{identify:e=>e==null,createNode:()=>new We(null),default:!0,tag:"tag:yaml.org,2002:null",test:/^null$/,resolve:()=>null,stringify:Po},{identify:e=>typeof e=="boolean",default:!0,tag:"tag:yaml.org,2002:bool",test:/^true$|^false$/,resolve:e=>e==="true",stringify:Po},{identify:bf,default:!0,tag:"tag:yaml.org,2002:int",test:/^-?(?:0|[1-9][0-9]*)$/,resolve:(e,t,{intAsBigInt:n})=>n?BigInt(e):parseInt(e,10),stringify:({value:e})=>bf(e)?e.toString():JSON.stringify(e)},{identify:e=>typeof e=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,resolve:e=>parseFloat(e),stringify:Po}],JC={default:!0,tag:"",test:/^/,resolve(e,t){return t(`Unresolved plain scalar ${JSON.stringify(e)}`),e}},QC=[ii,oi].concat(XC,JC),Ou={identify:e=>e instanceof Uint8Array,default:!1,tag:"tag:yaml.org,2002:binary",resolve(e,t){if(typeof atob=="function"){const n=atob(e.replace(/[\n\r]/g,"")),s=new Uint8Array(n.length);for(let a=0;a<n.length;++a)s[a]=n.charCodeAt(a);return s}else return t("This environment does not support reading binary tags; either Buffer or atob is required"),e},stringify({comment:e,type:t,value:n},s,a,i){if(!n)return"";const o=n;let r;if(typeof btoa=="function"){let l="";for(let u=0;u<o.length;++u)l+=String.fromCharCode(o[u]);r=btoa(l)}else throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");if(t??(t=We.BLOCK_LITERAL),t!==We.QUOTE_DOUBLE){const l=Math.max(s.options.lineWidth-s.indent.length,s.options.minContentWidth),u=Math.ceil(r.length/l),d=new Array(u);for(let h=0,f=0;h<u;++h,f+=l)d[h]=r.substr(f,l);r=d.join(t===We.BLOCK_LITERAL?`
`:" ")}return Tu({comment:e,type:t,value:r},s,a,i)}};function Bv(e,t){if(mo(e))for(let n=0;n<e.items.length;++n){let s=e.items[n];if(!At(s)){if(po(s)){s.items.length>1&&t("Each pair must have its own sequence indicator");const a=s.items[0]||new nn(new We(null));if(s.commentBefore&&(a.key.commentBefore=a.key.commentBefore?`${s.commentBefore}
${a.key.commentBefore}`:s.commentBefore),s.comment){const i=a.value??a.key;i.comment=i.comment?`${s.comment}
${i.comment}`:s.comment}s=a}e.items[n]=At(s)?s:new nn(s)}}else t("Expected a sequence for this tag");return e}function Dv(e,t,n){const{replacer:s}=n,a=new fa(e);a.tag="tag:yaml.org,2002:pairs";let i=0;if(t&&Symbol.iterator in Object(t))for(let o of t){typeof s=="function"&&(o=s.call(t,String(i++),o));let r,l;if(Array.isArray(o))if(o.length===2)r=o[0],l=o[1];else throw new TypeError(`Expected [key, value] tuple: ${o}`);else if(o&&o instanceof Object){const u=Object.keys(o);if(u.length===1)r=u[0],l=o[r];else throw new TypeError(`Expected tuple with one key, not ${u.length} keys`)}else r=o;a.items.push(Iu(r,l,n))}return a}const Nu={collection:"seq",default:!1,tag:"tag:yaml.org,2002:pairs",resolve:Bv,createNode:Dv};class Ba extends fa{constructor(){super(),this.add=xn.prototype.add.bind(this),this.delete=xn.prototype.delete.bind(this),this.get=xn.prototype.get.bind(this),this.has=xn.prototype.has.bind(this),this.set=xn.prototype.set.bind(this),this.tag=Ba.tag}toJSON(t,n){if(!n)return super.toJSON(t);const s=new Map;n!=null&&n.onCreate&&n.onCreate(s);for(const a of this.items){let i,o;if(At(a)?(i=An(a.key,"",n),o=An(a.value,i,n)):i=An(a,"",n),s.has(i))throw new Error("Ordered maps must not include duplicate keys");s.set(i,o)}return s}static from(t,n,s){const a=Dv(t,n,s),i=new this;return i.items=a.items,i}}Ba.tag="tag:yaml.org,2002:omap";const Pu={collection:"seq",identify:e=>e instanceof Map,nodeClass:Ba,default:!1,tag:"tag:yaml.org,2002:omap",resolve(e,t){const n=Bv(e,t),s=[];for(const{key:a}of n.items)ft(a)&&(s.includes(a.value)?t(`Ordered maps must not include duplicate keys: ${a.value}`):s.push(a.value));return Object.assign(new Ba,n)},createNode:(e,t,n)=>Ba.from(e,t,n)};function Rv({value:e,source:t},n){return t&&(e?Mv:$v).test.test(t)?t:e?n.options.trueStr:n.options.falseStr}const Mv={identify:e=>e===!0,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,resolve:()=>new We(!0),stringify:Rv},$v={identify:e=>e===!1,default:!0,tag:"tag:yaml.org,2002:bool",test:/^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,resolve:()=>new We(!1),stringify:Rv},ZC={identify:e=>typeof e=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,resolve:e=>e.slice(-3).toLowerCase()==="nan"?NaN:e[0]==="-"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,stringify:Hn},eT={identify:e=>typeof e=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"EXP",test:/^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,resolve:e=>parseFloat(e.replace(/_/g,"")),stringify(e){const t=Number(e.value);return isFinite(t)?t.toExponential():Hn(e)}},tT={identify:e=>typeof e=="number",default:!0,tag:"tag:yaml.org,2002:float",test:/^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,resolve(e){const t=new We(parseFloat(e.replace(/_/g,""))),n=e.indexOf(".");if(n!==-1){const s=e.substring(n+1).replace(/_/g,"");s[s.length-1]==="0"&&(t.minFractionDigits=s.length)}return t},stringify:Hn},go=e=>typeof e=="bigint"||Number.isInteger(e);function Jr(e,t,n,{intAsBigInt:s}){const a=e[0];if((a==="-"||a==="+")&&(t+=1),e=e.substring(t).replace(/_/g,""),s){switch(n){case 2:e=`0b${e}`;break;case 8:e=`0o${e}`;break;case 16:e=`0x${e}`;break}const o=BigInt(e);return a==="-"?BigInt(-1)*o:o}const i=parseInt(e,n);return a==="-"?-1*i:i}function Bu(e,t,n){const{value:s}=e;if(go(s)){const a=s.toString(t);return s<0?"-"+n+a.substr(1):n+a}return Hn(e)}const nT={identify:go,default:!0,tag:"tag:yaml.org,2002:int",format:"BIN",test:/^[-+]?0b[0-1_]+$/,resolve:(e,t,n)=>Jr(e,2,2,n),stringify:e=>Bu(e,2,"0b")},sT={identify:go,default:!0,tag:"tag:yaml.org,2002:int",format:"OCT",test:/^[-+]?0[0-7_]+$/,resolve:(e,t,n)=>Jr(e,1,8,n),stringify:e=>Bu(e,8,"0")},aT={identify:go,default:!0,tag:"tag:yaml.org,2002:int",test:/^[-+]?[0-9][0-9_]*$/,resolve:(e,t,n)=>Jr(e,0,10,n),stringify:Hn},iT={identify:go,default:!0,tag:"tag:yaml.org,2002:int",format:"HEX",test:/^[-+]?0x[0-9a-fA-F_]+$/,resolve:(e,t,n)=>Jr(e,2,16,n),stringify:e=>Bu(e,16,"0x")};class Da extends xn{constructor(t){super(t),this.tag=Da.tag}add(t){let n;At(t)?n=t:t&&typeof t=="object"&&"key"in t&&"value"in t&&t.value===null?n=new nn(t.key,null):n=new nn(t,null),sa(this.items,n.key)||this.items.push(n)}get(t,n){const s=sa(this.items,t);return!n&&At(s)?ft(s.key)?s.key.value:s.key:s}set(t,n){if(typeof n!="boolean")throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof n}`);const s=sa(this.items,t);s&&!n?this.items.splice(this.items.indexOf(s),1):!s&&n&&this.items.push(new nn(t))}toJSON(t,n){return super.toJSON(t,n,Set)}toString(t,n,s){if(!t)return JSON.stringify(this);if(this.hasAllNullValues(!0))return super.toString(Object.assign({},t,{allNullValues:!0}),n,s);throw new Error("Set items must all have null values")}static from(t,n,s){const{replacer:a}=s,i=new this(t);if(n&&Symbol.iterator in Object(n))for(let o of n)typeof a=="function"&&(o=a.call(n,o,o)),i.items.push(Iu(o,null,s));return i}}Da.tag="tag:yaml.org,2002:set";const Du={collection:"map",identify:e=>e instanceof Set,nodeClass:Da,default:!1,tag:"tag:yaml.org,2002:set",createNode:(e,t,n)=>Da.from(e,t,n),resolve(e,t){if(po(e)){if(e.hasAllNullValues(!0))return Object.assign(new Da,e);t("Set items must all have null values")}else t("Expected a mapping for this tag");return e}};function Ru(e,t){const n=e[0],s=n==="-"||n==="+"?e.substring(1):e,a=o=>t?BigInt(o):Number(o),i=s.replace(/_/g,"").split(":").reduce((o,r)=>o*a(60)+a(r),a(0));return n==="-"?a(-1)*i:i}function jv(e){let{value:t}=e,n=o=>o;if(typeof t=="bigint")n=o=>BigInt(o);else if(isNaN(t)||!isFinite(t))return Hn(e);let s="";t<0&&(s="-",t*=n(-1));const a=n(60),i=[t%a];return t<60?i.unshift(0):(t=(t-i[0])/a,i.unshift(t%a),t>=60&&(t=(t-i[0])/a,i.unshift(t))),s+i.map(o=>String(o).padStart(2,"0")).join(":").replace(/000000\d*$/,"")}const Vv={identify:e=>typeof e=="bigint"||Number.isInteger(e),default:!0,tag:"tag:yaml.org,2002:int",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,resolve:(e,t,{intAsBigInt:n})=>Ru(e,n),stringify:jv},Fv={identify:e=>typeof e=="number",default:!0,tag:"tag:yaml.org,2002:float",format:"TIME",test:/^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,resolve:e=>Ru(e,!1),stringify:jv},Qr={identify:e=>e instanceof Date,default:!0,tag:"tag:yaml.org,2002:timestamp",test:RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),resolve(e){const t=e.match(Qr.test);if(!t)throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");const[,n,s,a,i,o,r]=t.map(Number),l=t[7]?Number((t[7]+"00").substr(1,3)):0;let u=Date.UTC(n,s-1,a,i||0,o||0,r||0,l);const d=t[8];if(d&&d!=="Z"){let h=Ru(d,!1);Math.abs(h)<30&&(h*=60),u-=6e4*h}return new Date(u)},stringify:({value:e})=>(e==null?void 0:e.toISOString().replace(/(T00:00:00)?\.000Z$/,""))??""},wf=[ii,oi,Kr,Yr,Mv,$v,nT,sT,aT,iT,ZC,eT,tT,Ou,ps,Pu,Nu,Du,Vv,Fv,Qr],kf=new Map([["core",YC],["failsafe",[ii,oi,Kr]],["json",QC],["yaml11",wf],["yaml-1.1",wf]]),Sf={binary:Ou,bool:Eu,float:Ev,floatExp:Iv,floatNaN:Tv,floatTime:Fv,int:Nv,intHex:Pv,intOct:Ov,intTime:Vv,map:ii,merge:ps,null:Yr,omap:Pu,pairs:Nu,seq:oi,set:Du,timestamp:Qr},oT={"tag:yaml.org,2002:binary":Ou,"tag:yaml.org,2002:merge":ps,"tag:yaml.org,2002:omap":Pu,"tag:yaml.org,2002:pairs":Nu,"tag:yaml.org,2002:set":Du,"tag:yaml.org,2002:timestamp":Qr};function $l(e,t,n){const s=kf.get(t);if(s&&!e)return n&&!s.includes(ps)?s.concat(ps):s.slice();let a=s;if(!a)if(Array.isArray(e))a=[];else{const i=Array.from(kf.keys()).filter(o=>o!=="yaml11").map(o=>JSON.stringify(o)).join(", ");throw new Error(`Unknown schema "${t}"; use one of ${i} or define customTags array`)}if(Array.isArray(e))for(const i of e)a=a.concat(i);else typeof e=="function"&&(a=e(a.slice()));return n&&(a=a.concat(ps)),a.reduce((i,o)=>{const r=typeof o=="string"?Sf[o]:o;if(!r){const l=JSON.stringify(o),u=Object.keys(Sf).map(d=>JSON.stringify(d)).join(", ");throw new Error(`Unknown custom tag ${l}; use one of ${u}`)}return i.includes(r)||i.push(r),i},[])}const rT=(e,t)=>e.key<t.key?-1:e.key>t.key?1:0;class Mu{constructor({compat:t,customTags:n,merge:s,resolveKnownTags:a,schema:i,sortMapEntries:o,toStringDefaults:r}){this.compat=Array.isArray(t)?$l(t,"compat"):t?$l(null,t):null,this.name=typeof i=="string"&&i||"core",this.knownTags=a?oT:{},this.tags=$l(n,this.name,s),this.toStringOptions=r??null,Object.defineProperty(this,Bs,{value:ii}),Object.defineProperty(this,ns,{value:Kr}),Object.defineProperty(this,ni,{value:oi}),this.sortMapEntries=typeof o=="function"?o:o===!0?rT:null}clone(){const t=Object.create(Mu.prototype,Object.getOwnPropertyDescriptors(this));return t.tags=this.tags.slice(),t}}function lT(e,t){var l;const n=[];let s=t.directives===!0;if(t.directives!==!1&&e.directives){const u=e.directives.toString(e);u?(n.push(u),s=!0):e.directives.docStart&&(s=!0)}s&&n.push("---");const a=kv(e,t),{commentString:i}=a.options;if(e.commentBefore){n.length!==1&&n.unshift("");const u=i(e.commentBefore);n.unshift(fs(u,""))}let o=!1,r=null;if(e.contents){if(_t(e.contents)){if(e.contents.spaceBefore&&s&&n.push(""),e.contents.commentBefore){const h=i(e.contents.commentBefore);n.push(fs(h,""))}a.forceBlockIndent=!!e.comment,r=e.contents.comment}const u=r?void 0:()=>o=!0;let d=Ga(e.contents,a,()=>r=null,u);r&&(d+=na(d,"",i(r))),(d[0]==="|"||d[0]===">")&&n[n.length-1]==="---"?n[n.length-1]=`--- ${d}`:n.push(d)}else n.push(Ga(e.contents,a));if((l=e.directives)!=null&&l.docEnd)if(e.comment){const u=i(e.comment);u.includes(`
`)?(n.push("..."),n.push(fs(u,""))):n.push(`... ${u}`)}else n.push("...");else{let u=e.comment;u&&o&&(u=u.replace(/^\n+/,"")),u&&((!o||r)&&n[n.length-1]!==""&&n.push(""),n.push(fs(i(u),"")))}return n.join(`
`)+`
`}class Zr{constructor(t,n,s){this.commentBefore=null,this.comment=null,this.errors=[],this.warnings=[],Object.defineProperty(this,Tn,{value:bc});let a=null;typeof n=="function"||Array.isArray(n)?a=n:s===void 0&&n&&(s=n,n=void 0);const i=Object.assign({intAsBigInt:!1,keepSourceTokens:!1,logLevel:"warn",prettyErrors:!0,strict:!0,stringKeys:!1,uniqueKeys:!0,version:"1.2"},s);this.options=i;let{version:o}=i;s!=null&&s._directives?(this.directives=s._directives.atDocument(),this.directives.yaml.explicit&&(o=this.directives.yaml.version)):this.directives=new Zt({version:o}),this.setSchema(o,s),this.contents=t===void 0?null:this.createNode(t,a,s)}clone(){const t=Object.create(Zr.prototype,{[Tn]:{value:bc}});return t.commentBefore=this.commentBefore,t.comment=this.comment,t.errors=this.errors.slice(),t.warnings=this.warnings.slice(),t.options=Object.assign({},this.options),this.directives&&(t.directives=this.directives.clone()),t.schema=this.schema.clone(),t.contents=_t(this.contents)?this.contents.clone(t.schema):this.contents,this.range&&(t.range=this.range.slice()),t}add(t){Sa(this.contents)&&this.contents.add(t)}addIn(t,n){Sa(this.contents)&&this.contents.addIn(t,n)}createAlias(t,n){if(!t.anchor){const s=gv(this);t.anchor=!n||s.has(n)?vv(n||"a",s):n}return new Cu(t.anchor)}createNode(t,n,s){let a;if(typeof n=="function")t=n.call({"":t},"",t),a=n;else if(Array.isArray(n)){const v=w=>typeof w=="number"||w instanceof String||w instanceof Number,y=n.filter(v).map(String);y.length>0&&(n=n.concat(y)),a=n}else s===void 0&&n&&(s=n,n=void 0);const{aliasDuplicateObjects:i,anchorPrefix:o,flow:r,keepUndefined:l,onTagObj:u,tag:d}=s??{},{onAnchor:h,setAnchors:f,sourceObjects:p}=RC(this,o||"a"),g={aliasDuplicateObjects:i??!0,keepUndefined:l??!1,onAnchor:h,onTagObj:u,replacer:a,schema:this.schema,sourceObjects:p},m=Zi(t,d,g);return r&&xt(m)&&(m.flow=!0),f(),m}createPair(t,n,s={}){const a=this.createNode(t,null,s),i=this.createNode(n,null,s);return new nn(a,i)}delete(t){return Sa(this.contents)?this.contents.delete(t):!1}deleteIn(t){return wi(t)?this.contents==null?!1:(this.contents=null,!0):Sa(this.contents)?this.contents.deleteIn(t):!1}get(t,n){return xt(this.contents)?this.contents.get(t,n):void 0}getIn(t,n){return wi(t)?!n&&ft(this.contents)?this.contents.value:this.contents:xt(this.contents)?this.contents.getIn(t,n):void 0}has(t){return xt(this.contents)?this.contents.has(t):!1}hasIn(t){return wi(t)?this.contents!==void 0:xt(this.contents)?this.contents.hasIn(t):!1}set(t,n){this.contents==null?this.contents=gr(this.schema,[t],n):Sa(this.contents)&&this.contents.set(t,n)}setIn(t,n){wi(t)?this.contents=n:this.contents==null?this.contents=gr(this.schema,Array.from(t),n):Sa(this.contents)&&this.contents.setIn(t,n)}setSchema(t,n={}){typeof t=="number"&&(t=String(t));let s;switch(t){case"1.1":this.directives?this.directives.yaml.version="1.1":this.directives=new Zt({version:"1.1"}),s={resolveKnownTags:!1,schema:"yaml-1.1"};break;case"1.2":case"next":this.directives?this.directives.yaml.version=t:this.directives=new Zt({version:t}),s={resolveKnownTags:!0,schema:"core"};break;case null:this.directives&&delete this.directives,s=null;break;default:{const a=JSON.stringify(t);throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${a}`)}}if(n.schema instanceof Object)this.schema=n.schema;else if(s)this.schema=new Mu(Object.assign(s,n));else throw new Error("With a null YAML version, the { schema: Schema } option is required")}toJS({json:t,jsonArg:n,mapAsMap:s,maxAliasCount:a,onAnchor:i,reviver:o}={}){const r={anchors:new Map,doc:this,keep:!t,mapAsMap:s===!0,mapKeyWarned:!1,maxAliasCount:typeof a=="number"?a:100},l=An(this.contents,n??"",r);if(typeof i=="function")for(const{count:u,res:d}of r.anchors.values())i(d,u);return typeof o=="function"?Ia(o,{"":l},"",l):l}toJSON(t,n){return this.toJS({json:!0,jsonArg:t,mapAsMap:!1,onAnchor:n})}toString(t={}){if(this.errors.length>0)throw new Error("Document with errors cannot be stringified");if("indent"in t&&(!Number.isInteger(t.indent)||Number(t.indent)<=0)){const n=JSON.stringify(t.indent);throw new Error(`"indent" option must be a positive integer, not ${n}`)}return lT(this,t)}}function Sa(e){if(xt(e))return!0;throw new Error("Expected a YAML collection as document contents")}class Wv extends Error{constructor(t,n,s,a){super(),this.name=t,this.code=s,this.message=a,this.pos=n}}class ki extends Wv{constructor(t,n,s){super("YAMLParseError",t,n,s)}}class cT extends Wv{constructor(t,n,s){super("YAMLWarning",t,n,s)}}const xf=(e,t)=>n=>{if(n.pos[0]===-1)return;n.linePos=n.pos.map(r=>t.linePos(r));const{line:s,col:a}=n.linePos[0];n.message+=` at line ${s}, column ${a}`;let i=a-1,o=e.substring(t.lineStarts[s-1],t.lineStarts[s]).replace(/[\n\r]+$/,"");if(i>=60&&o.length>80){const r=Math.min(i-39,o.length-79);o="…"+o.substring(r),i-=r-1}if(o.length>80&&(o=o.substring(0,79)+"…"),s>1&&/^ *$/.test(o.substring(0,i))){let r=e.substring(t.lineStarts[s-2],t.lineStarts[s-1]);r.length>80&&(r=r.substring(0,79)+`…
`),o=r+o}if(/[^ ]/.test(o)){let r=1;const l=n.linePos[1];(l==null?void 0:l.line)===s&&l.col>a&&(r=Math.max(1,Math.min(l.col-a,80-i)));const u=" ".repeat(i)+"^".repeat(r);n.message+=`:

${o}
${u}
`}};function Ka(e,{flow:t,indicator:n,next:s,offset:a,onError:i,parentIndent:o,startOnNewline:r}){let l=!1,u=r,d=r,h="",f="",p=!1,g=!1,m=null,v=null,y=null,w=null,x=null,T=null,C=null;for(const k of e)switch(g&&(k.type!=="space"&&k.type!=="newline"&&k.type!=="comma"&&i(k.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),g=!1),m&&(u&&k.type!=="comment"&&k.type!=="newline"&&i(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),m=null),k.type){case"space":!t&&(n!=="doc-start"||(s==null?void 0:s.type)!=="flow-collection")&&k.source.includes("	")&&(m=k),d=!0;break;case"comment":{d||i(k,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const O=k.source.substring(1)||" ";h?h+=f+O:h=O,f="",u=!1;break}case"newline":u?h?h+=k.source:(!T||n!=="seq-item-ind")&&(l=!0):f+=k.source,u=!0,p=!0,(v||y)&&(w=k),d=!0;break;case"anchor":v&&i(k,"MULTIPLE_ANCHORS","A node can have at most one anchor"),k.source.endsWith(":")&&i(k.offset+k.source.length-1,"BAD_ALIAS","Anchor ending in : is ambiguous",!0),v=k,C??(C=k.offset),u=!1,d=!1,g=!0;break;case"tag":{y&&i(k,"MULTIPLE_TAGS","A node can have at most one tag"),y=k,C??(C=k.offset),u=!1,d=!1,g=!0;break}case n:(v||y)&&i(k,"BAD_PROP_ORDER",`Anchors and tags must be after the ${k.source} indicator`),T&&i(k,"UNEXPECTED_TOKEN",`Unexpected ${k.source} in ${t??"collection"}`),T=k,u=n==="seq-item-ind"||n==="explicit-key-ind",d=!1;break;case"comma":if(t){x&&i(k,"UNEXPECTED_TOKEN",`Unexpected , in ${t}`),x=k,u=!1,d=!1;break}default:i(k,"UNEXPECTED_TOKEN",`Unexpected ${k.type} token`),u=!1,d=!1}const _=e[e.length-1],I=_?_.offset+_.source.length:a;return g&&s&&s.type!=="space"&&s.type!=="newline"&&s.type!=="comma"&&(s.type!=="scalar"||s.source!=="")&&i(s.offset,"MISSING_CHAR","Tags and anchors must be separated from the next token by white space"),m&&(u&&m.indent<=o||(s==null?void 0:s.type)==="block-map"||(s==null?void 0:s.type)==="block-seq")&&i(m,"TAB_AS_INDENT","Tabs are not allowed as indentation"),{comma:x,found:T,spaceBefore:l,comment:h,hasNewline:p,anchor:v,tag:y,newlineAfterProp:w,end:I,start:C??I}}function eo(e){if(!e)return null;switch(e.type){case"alias":case"scalar":case"double-quoted-scalar":case"single-quoted-scalar":if(e.source.includes(`
`))return!0;if(e.end){for(const t of e.end)if(t.type==="newline")return!0}return!1;case"flow-collection":for(const t of e.items){for(const n of t.start)if(n.type==="newline")return!0;if(t.sep){for(const n of t.sep)if(n.type==="newline")return!0}if(eo(t.key)||eo(t.value))return!0}return!1;default:return!0}}function xc(e,t,n){if((t==null?void 0:t.type)==="flow-collection"){const s=t.end[0];s.indent===e&&(s.source==="]"||s.source==="}")&&eo(t)&&n(s,"BAD_INDENT","Flow end indicator should be more indented than parent",!0)}}function Hv(e,t,n){const{uniqueKeys:s}=e.options;if(s===!1)return!1;const a=typeof s=="function"?s:(i,o)=>i===o||ft(i)&&ft(o)&&i.value===o.value;return t.some(i=>a(i.key,n))}const _f="All mapping items must start at the same column";function uT({composeNode:e,composeEmptyNode:t},n,s,a,i){var d;const o=(i==null?void 0:i.nodeClass)??xn,r=new o(n.schema);n.atRoot&&(n.atRoot=!1);let l=s.offset,u=null;for(const h of s.items){const{start:f,key:p,sep:g,value:m}=h,v=Ka(f,{indicator:"explicit-key-ind",next:p??(g==null?void 0:g[0]),offset:l,onError:a,parentIndent:s.indent,startOnNewline:!0}),y=!v.found;if(y){if(p&&(p.type==="block-seq"?a(l,"BLOCK_AS_IMPLICIT_KEY","A block sequence may not be used as an implicit map key"):"indent"in p&&p.indent!==s.indent&&a(l,"BAD_INDENT",_f)),!v.anchor&&!v.tag&&!g){u=v.end,v.comment&&(r.comment?r.comment+=`
`+v.comment:r.comment=v.comment);continue}(v.newlineAfterProp||eo(p))&&a(p??f[f.length-1],"MULTILINE_IMPLICIT_KEY","Implicit keys need to be on a single line")}else((d=v.found)==null?void 0:d.indent)!==s.indent&&a(l,"BAD_INDENT",_f);n.atKey=!0;const w=v.end,x=p?e(n,p,v,a):t(n,w,f,null,v,a);n.schema.compat&&xc(s.indent,p,a),n.atKey=!1,Hv(n,r.items,x)&&a(w,"DUPLICATE_KEY","Map keys must be unique");const T=Ka(g??[],{indicator:"map-value-ind",next:m,offset:x.range[2],onError:a,parentIndent:s.indent,startOnNewline:!p||p.type==="block-scalar"});if(l=T.end,T.found){y&&((m==null?void 0:m.type)==="block-map"&&!T.hasNewline&&a(l,"BLOCK_AS_IMPLICIT_KEY","Nested mappings are not allowed in compact mappings"),n.options.strict&&v.start<T.found.offset-1024&&a(x.range,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));const C=m?e(n,m,T,a):t(n,l,g,null,T,a);n.schema.compat&&xc(s.indent,m,a),l=C.range[2];const _=new nn(x,C);n.options.keepSourceTokens&&(_.srcToken=h),r.items.push(_)}else{y&&a(x.range,"MISSING_CHAR","Implicit map keys need to be followed by map values"),T.comment&&(x.comment?x.comment+=`
`+T.comment:x.comment=T.comment);const C=new nn(x);n.options.keepSourceTokens&&(C.srcToken=h),r.items.push(C)}}return u&&u<l&&a(u,"IMPOSSIBLE","Map comment with trailing content"),r.range=[s.offset,l,u??l],r}function dT({composeNode:e,composeEmptyNode:t},n,s,a,i){const o=(i==null?void 0:i.nodeClass)??fa,r=new o(n.schema);n.atRoot&&(n.atRoot=!1),n.atKey&&(n.atKey=!1);let l=s.offset,u=null;for(const{start:d,value:h}of s.items){const f=Ka(d,{indicator:"seq-item-ind",next:h,offset:l,onError:a,parentIndent:s.indent,startOnNewline:!0});if(!f.found)if(f.anchor||f.tag||h)(h==null?void 0:h.type)==="block-seq"?a(f.end,"BAD_INDENT","All sequence items must start at the same column"):a(l,"MISSING_CHAR","Sequence item without - indicator");else{u=f.end,f.comment&&(r.comment=f.comment);continue}const p=h?e(n,h,f,a):t(n,f.end,d,null,f,a);n.schema.compat&&xc(s.indent,h,a),l=p.range[2],r.items.push(p)}return r.range=[s.offset,l,u??l],r}function vo(e,t,n,s){let a="";if(e){let i=!1,o="";for(const r of e){const{source:l,type:u}=r;switch(u){case"space":i=!0;break;case"comment":{n&&!i&&s(r,"MISSING_CHAR","Comments must be separated from other tokens by white space characters");const d=l.substring(1)||" ";a?a+=o+d:a=d,o="";break}case"newline":a&&(o+=l),i=!0;break;default:s(r,"UNEXPECTED_TOKEN",`Unexpected ${u} at node end`)}t+=l.length}}return{comment:a,offset:t}}const jl="Block collections are not allowed within flow collections",Vl=e=>e&&(e.type==="block-map"||e.type==="block-seq");function hT({composeNode:e,composeEmptyNode:t},n,s,a,i){var v;const o=s.start.source==="{",r=o?"flow map":"flow sequence",l=(i==null?void 0:i.nodeClass)??(o?xn:fa),u=new l(n.schema);u.flow=!0;const d=n.atRoot;d&&(n.atRoot=!1),n.atKey&&(n.atKey=!1);let h=s.offset+s.start.source.length;for(let y=0;y<s.items.length;++y){const w=s.items[y],{start:x,key:T,sep:C,value:_}=w,I=Ka(x,{flow:r,indicator:"explicit-key-ind",next:T??(C==null?void 0:C[0]),offset:h,onError:a,parentIndent:s.indent,startOnNewline:!1});if(!I.found){if(!I.anchor&&!I.tag&&!C&&!_){y===0&&I.comma?a(I.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${r}`):y<s.items.length-1&&a(I.start,"UNEXPECTED_TOKEN",`Unexpected empty item in ${r}`),I.comment&&(u.comment?u.comment+=`
`+I.comment:u.comment=I.comment),h=I.end;continue}!o&&n.options.strict&&eo(T)&&a(T,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line")}if(y===0)I.comma&&a(I.comma,"UNEXPECTED_TOKEN",`Unexpected , in ${r}`);else if(I.comma||a(I.start,"MISSING_CHAR",`Missing , between ${r} items`),I.comment){let k="";e:for(const O of x)switch(O.type){case"comma":case"space":break;case"comment":k=O.source.substring(1);break e;default:break e}if(k){let O=u.items[u.items.length-1];At(O)&&(O=O.value??O.key),O.comment?O.comment+=`
`+k:O.comment=k,I.comment=I.comment.substring(k.length+1)}}if(!o&&!C&&!I.found){const k=_?e(n,_,I,a):t(n,I.end,C,null,I,a);u.items.push(k),h=k.range[2],Vl(_)&&a(k.range,"BLOCK_IN_FLOW",jl)}else{n.atKey=!0;const k=I.end,O=T?e(n,T,I,a):t(n,k,x,null,I,a);Vl(T)&&a(O.range,"BLOCK_IN_FLOW",jl),n.atKey=!1;const $=Ka(C??[],{flow:r,indicator:"map-value-ind",next:_,offset:O.range[2],onError:a,parentIndent:s.indent,startOnNewline:!1});if($.found){if(!o&&!I.found&&n.options.strict){if(C)for(const z of C){if(z===$.found)break;if(z.type==="newline"){a(z,"MULTILINE_IMPLICIT_KEY","Implicit keys of flow sequence pairs need to be on a single line");break}}I.start<$.found.offset-1024&&a($.found,"KEY_OVER_1024_CHARS","The : indicator must be at most 1024 chars after the start of an implicit flow sequence key")}}else _&&("source"in _&&((v=_.source)==null?void 0:v[0])===":"?a(_,"MISSING_CHAR",`Missing space after : in ${r}`):a($.start,"MISSING_CHAR",`Missing , or : between ${r} items`));const q=_?e(n,_,$,a):$.found?t(n,$.end,C,null,$,a):null;q?Vl(_)&&a(q.range,"BLOCK_IN_FLOW",jl):$.comment&&(O.comment?O.comment+=`
`+$.comment:O.comment=$.comment);const R=new nn(O,q);if(n.options.keepSourceTokens&&(R.srcToken=w),o){const z=u;Hv(n,z.items,O)&&a(k,"DUPLICATE_KEY","Map keys must be unique"),z.items.push(R)}else{const z=new xn(n.schema);z.flow=!0,z.items.push(R);const se=(q??O).range;z.range=[O.range[0],se[1],se[2]],u.items.push(z)}h=q?q.range[2]:$.end}}const f=o?"}":"]",[p,...g]=s.end;let m=h;if((p==null?void 0:p.source)===f)m=p.offset+p.source.length;else{const y=r[0].toUpperCase()+r.substring(1),w=d?`${y} must end with a ${f}`:`${y} in block collection must be sufficiently indented and end with a ${f}`;a(h,d?"MISSING_CHAR":"BAD_INDENT",w),p&&p.source.length!==1&&g.unshift(p)}if(g.length>0){const y=vo(g,m,n.options.strict,a);y.comment&&(u.comment?u.comment+=`
`+y.comment:u.comment=y.comment),u.range=[s.offset,m,y.offset]}else u.range=[s.offset,m,m];return u}function Fl(e,t,n,s,a,i){const o=n.type==="block-map"?uT(e,t,n,s,i):n.type==="block-seq"?dT(e,t,n,s,i):hT(e,t,n,s,i),r=o.constructor;return a==="!"||a===r.tagName?(o.tag=r.tagName,o):(a&&(o.tag=a),o)}function fT(e,t,n,s,a){var f;const i=s.tag,o=i?t.directives.tagName(i.source,p=>a(i,"TAG_RESOLVE_FAILED",p)):null;if(n.type==="block-seq"){const{anchor:p,newlineAfterProp:g}=s,m=p&&i?p.offset>i.offset?p:i:p??i;m&&(!g||g.offset<m.offset)&&a(m,"MISSING_CHAR","Missing newline after block sequence props")}const r=n.type==="block-map"?"map":n.type==="block-seq"?"seq":n.start.source==="{"?"map":"seq";if(!i||!o||o==="!"||o===xn.tagName&&r==="map"||o===fa.tagName&&r==="seq")return Fl(e,t,n,a,o);let l=t.schema.tags.find(p=>p.tag===o&&p.collection===r);if(!l){const p=t.schema.knownTags[o];if((p==null?void 0:p.collection)===r)t.schema.tags.push(Object.assign({},p,{default:!1})),l=p;else return p?a(i,"BAD_COLLECTION_TYPE",`${p.tag} used for ${r} collection, but expects ${p.collection??"scalar"}`,!0):a(i,"TAG_RESOLVE_FAILED",`Unresolved tag: ${o}`,!0),Fl(e,t,n,a,o)}const u=Fl(e,t,n,a,o,l),d=((f=l.resolve)==null?void 0:f.call(l,u,p=>a(i,"TAG_RESOLVE_FAILED",p),t.options))??u,h=_t(d)?d:new We(d);return h.range=u.range,h.tag=o,l!=null&&l.format&&(h.format=l.format),h}function pT(e,t,n){const s=t.offset,a=mT(t,e.options.strict,n);if(!a)return{value:"",type:null,comment:"",range:[s,s,s]};const i=a.mode===">"?We.BLOCK_FOLDED:We.BLOCK_LITERAL,o=t.source?gT(t.source):[];let r=o.length;for(let m=o.length-1;m>=0;--m){const v=o[m][1];if(v===""||v==="\r")r=m;else break}if(r===0){const m=a.chomp==="+"&&o.length>0?`
`.repeat(Math.max(1,o.length-1)):"";let v=s+a.length;return t.source&&(v+=t.source.length),{value:m,type:i,comment:a.comment,range:[s,v,v]}}let l=t.indent+a.indent,u=t.offset+a.length,d=0;for(let m=0;m<r;++m){const[v,y]=o[m];if(y===""||y==="\r")a.indent===0&&v.length>l&&(l=v.length);else{v.length<l&&n(u+v.length,"MISSING_CHAR","Block scalars with more-indented leading empty lines must use an explicit indentation indicator"),a.indent===0&&(l=v.length),d=m,l===0&&!e.atRoot&&n(u,"BAD_INDENT","Block scalar values in collections must be indented");break}u+=v.length+y.length+1}for(let m=o.length-1;m>=r;--m)o[m][0].length>l&&(r=m+1);let h="",f="",p=!1;for(let m=0;m<d;++m)h+=o[m][0].slice(l)+`
`;for(let m=d;m<r;++m){let[v,y]=o[m];u+=v.length+y.length+1;const w=y[y.length-1]==="\r";if(w&&(y=y.slice(0,-1)),y&&v.length<l){const T=`Block scalar lines must not be less indented than their ${a.indent?"explicit indentation indicator":"first line"}`;n(u-y.length-(w?2:1),"BAD_INDENT",T),v=""}i===We.BLOCK_LITERAL?(h+=f+v.slice(l)+y,f=`
`):v.length>l||y[0]==="	"?(f===" "?f=`
`:!p&&f===`
`&&(f=`

`),h+=f+v.slice(l)+y,f=`
`,p=!0):y===""?f===`
`?h+=`
`:f=`
`:(h+=f+y,f=" ",p=!1)}switch(a.chomp){case"-":break;case"+":for(let m=r;m<o.length;++m)h+=`
`+o[m][0].slice(l);h[h.length-1]!==`
`&&(h+=`
`);break;default:h+=`
`}const g=s+a.length+t.source.length;return{value:h,type:i,comment:a.comment,range:[s,g,g]}}function mT({offset:e,props:t},n,s){if(t[0].type!=="block-scalar-header")return s(t[0],"IMPOSSIBLE","Block scalar header not found"),null;const{source:a}=t[0],i=a[0];let o=0,r="",l=-1;for(let f=1;f<a.length;++f){const p=a[f];if(!r&&(p==="-"||p==="+"))r=p;else{const g=Number(p);!o&&g?o=g:l===-1&&(l=e+f)}}l!==-1&&s(l,"UNEXPECTED_TOKEN",`Block scalar header includes extra characters: ${a}`);let u=!1,d="",h=a.length;for(let f=1;f<t.length;++f){const p=t[f];switch(p.type){case"space":u=!0;case"newline":h+=p.source.length;break;case"comment":n&&!u&&s(p,"MISSING_CHAR","Comments must be separated from other tokens by white space characters"),h+=p.source.length,d=p.source.substring(1);break;case"error":s(p,"UNEXPECTED_TOKEN",p.message),h+=p.source.length;break;default:{const g=`Unexpected token in block scalar header: ${p.type}`;s(p,"UNEXPECTED_TOKEN",g);const m=p.source;m&&typeof m=="string"&&(h+=m.length)}}}return{mode:i,indent:o,chomp:r,comment:d,length:h}}function gT(e){const t=e.split(/\n( *)/),n=t[0],s=n.match(/^( *)/),i=[s!=null&&s[1]?[s[1],n.slice(s[1].length)]:["",n]];for(let o=1;o<t.length;o+=2)i.push([t[o],t[o+1]]);return i}function vT(e,t,n){const{offset:s,type:a,source:i,end:o}=e;let r,l;const u=(f,p,g)=>n(s+f,p,g);switch(a){case"scalar":r=We.PLAIN,l=yT(i,u);break;case"single-quoted-scalar":r=We.QUOTE_SINGLE,l=bT(i,u);break;case"double-quoted-scalar":r=We.QUOTE_DOUBLE,l=wT(i,u);break;default:return n(e,"UNEXPECTED_TOKEN",`Expected a flow scalar value, but found: ${a}`),{value:"",type:null,comment:"",range:[s,s+i.length,s+i.length]}}const d=s+i.length,h=vo(o,d,t,n);return{value:l,type:r,comment:h.comment,range:[s,d,h.offset]}}function yT(e,t){let n="";switch(e[0]){case"	":n="a tab character";break;case",":n="flow indicator character ,";break;case"%":n="directive indicator character %";break;case"|":case">":{n=`block scalar indicator ${e[0]}`;break}case"@":case"`":{n=`reserved character ${e[0]}`;break}}return n&&t(0,"BAD_SCALAR_START",`Plain value cannot start with ${n}`),qv(e)}function bT(e,t){return(e[e.length-1]!=="'"||e.length===1)&&t(e.length,"MISSING_CHAR","Missing closing 'quote"),qv(e.slice(1,-1)).replace(/''/g,"'")}function qv(e){let t,n;try{t=new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`,"sy"),n=new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`,"sy")}catch{t=/(.*?)[ \t]*\r?\n/sy,n=/[ \t]*(.*?)[ \t]*\r?\n/sy}let s=t.exec(e);if(!s)return e;let a=s[1],i=" ",o=t.lastIndex;for(n.lastIndex=o;s=n.exec(e);)s[1]===""?i===`
`?a+=i:i=`
`:(a+=i+s[1],i=" "),o=n.lastIndex;const r=/[ \t]*(.*)/sy;return r.lastIndex=o,s=r.exec(e),a+i+((s==null?void 0:s[1])??"")}function wT(e,t){let n="";for(let s=1;s<e.length-1;++s){const a=e[s];if(!(a==="\r"&&e[s+1]===`
`))if(a===`
`){const{fold:i,offset:o}=kT(e,s);n+=i,s=o}else if(a==="\\"){let i=e[++s];const o=ST[i];if(o)n+=o;else if(i===`
`)for(i=e[s+1];i===" "||i==="	";)i=e[++s+1];else if(i==="\r"&&e[s+1]===`
`)for(i=e[++s+1];i===" "||i==="	";)i=e[++s+1];else if(i==="x"||i==="u"||i==="U"){const r=i==="x"?2:i==="u"?4:8;n+=xT(e,s+1,r,t),s+=r}else{const r=e.substr(s-1,2);t(s-1,"BAD_DQ_ESCAPE",`Invalid escape sequence ${r}`),n+=r}}else if(a===" "||a==="	"){const i=s;let o=e[s+1];for(;o===" "||o==="	";)o=e[++s+1];o!==`
`&&!(o==="\r"&&e[s+2]===`
`)&&(n+=s>i?e.slice(i,s+1):a)}else n+=a}return(e[e.length-1]!=='"'||e.length===1)&&t(e.length,"MISSING_CHAR",'Missing closing "quote'),n}function kT(e,t){let n="",s=e[t+1];for(;(s===" "||s==="	"||s===`
`||s==="\r")&&!(s==="\r"&&e[t+2]!==`
`);)s===`
`&&(n+=`
`),t+=1,s=e[t+1];return n||(n=" "),{fold:n,offset:t}}const ST={0:"\0",a:"\x07",b:"\b",e:"\x1B",f:"\f",n:`
`,r:"\r",t:"	",v:"\v",N:"",_:" ",L:"\u2028",P:"\u2029"," ":" ",'"':'"',"/":"/","\\":"\\","	":"	"};function xT(e,t,n,s){const a=e.substr(t,n),o=a.length===n&&/^[0-9a-fA-F]+$/.test(a)?parseInt(a,16):NaN;try{return String.fromCodePoint(o)}catch{const r=e.substr(t-2,n+2);return s(t-2,"BAD_DQ_ESCAPE",`Invalid escape sequence ${r}`),r}}function zv(e,t,n,s){const{value:a,type:i,comment:o,range:r}=t.type==="block-scalar"?pT(e,t,s):vT(t,e.options.strict,s),l=n?e.directives.tagName(n.source,h=>s(n,"TAG_RESOLVE_FAILED",h)):null;let u;e.options.stringKeys&&e.atKey?u=e.schema[ns]:l?u=_T(e.schema,a,l,n,s):t.type==="scalar"?u=AT(e,a,t,s):u=e.schema[ns];let d;try{const h=u.resolve(a,f=>s(n??t,"TAG_RESOLVE_FAILED",f),e.options);d=ft(h)?h:new We(h)}catch(h){const f=h instanceof Error?h.message:String(h);s(n??t,"TAG_RESOLVE_FAILED",f),d=new We(a)}return d.range=r,d.source=a,i&&(d.type=i),l&&(d.tag=l),u.format&&(d.format=u.format),o&&(d.comment=o),d}function _T(e,t,n,s,a){var r;if(n==="!")return e[ns];const i=[];for(const l of e.tags)if(!l.collection&&l.tag===n)if(l.default&&l.test)i.push(l);else return l;for(const l of i)if((r=l.test)!=null&&r.test(t))return l;const o=e.knownTags[n];return o&&!o.collection?(e.tags.push(Object.assign({},o,{default:!1,test:void 0})),o):(a(s,"TAG_RESOLVE_FAILED",`Unresolved tag: ${n}`,n!=="tag:yaml.org,2002:str"),e[ns])}function AT({atKey:e,directives:t,schema:n},s,a,i){const o=n.tags.find(r=>{var l;return(r.default===!0||e&&r.default==="key")&&((l=r.test)==null?void 0:l.test(s))})||n[ns];if(n.compat){const r=n.compat.find(l=>{var u;return l.default&&((u=l.test)==null?void 0:u.test(s))})??n[ns];if(o.tag!==r.tag){const l=t.tagString(o.tag),u=t.tagString(r.tag),d=`Value may be parsed as either ${l} or ${u}`;i(a,"TAG_RESOLVE_FAILED",d,!0)}}return o}function CT(e,t,n){if(t){n??(n=t.length);for(let s=n-1;s>=0;--s){let a=t[s];switch(a.type){case"space":case"comment":case"newline":e-=a.source.length;continue}for(a=t[++s];(a==null?void 0:a.type)==="space";)e+=a.source.length,a=t[++s];break}}return e}const TT={composeNode:Uv,composeEmptyNode:$u};function Uv(e,t,n,s){const a=e.atKey,{spaceBefore:i,comment:o,anchor:r,tag:l}=n;let u,d=!0;switch(t.type){case"alias":u=IT(e,t,s),(r||l)&&s(t,"ALIAS_PROPS","An alias node must not specify any properties");break;case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"block-scalar":u=zv(e,t,l,s),r&&(u.anchor=r.source.substring(1));break;case"block-map":case"block-seq":case"flow-collection":try{u=fT(TT,e,t,n,s),r&&(u.anchor=r.source.substring(1))}catch(h){const f=h instanceof Error?h.message:String(h);s(t,"RESOURCE_EXHAUSTION",f)}break;default:{const h=t.type==="error"?t.message:`Unsupported token (type: ${t.type})`;s(t,"UNEXPECTED_TOKEN",h),d=!1}}return u??(u=$u(e,t.offset,void 0,null,n,s)),r&&u.anchor===""&&s(r,"BAD_ALIAS","Anchor cannot be an empty string"),a&&e.options.stringKeys&&(!ft(u)||typeof u.value!="string"||u.tag&&u.tag!=="tag:yaml.org,2002:str")&&s(l??t,"NON_STRING_KEY","With stringKeys, all keys must be strings"),i&&(u.spaceBefore=!0),o&&(t.type==="scalar"&&t.source===""?u.comment=o:u.commentBefore=o),e.options.keepSourceTokens&&d&&(u.srcToken=t),u}function $u(e,t,n,s,{spaceBefore:a,comment:i,anchor:o,tag:r,end:l},u){const d={type:"scalar",offset:CT(t,n,s),indent:-1,source:""},h=zv(e,d,r,u);return o&&(h.anchor=o.source.substring(1),h.anchor===""&&u(o,"BAD_ALIAS","Anchor cannot be an empty string")),a&&(h.spaceBefore=!0),i&&(h.comment=i,h.range[2]=l),h}function IT({options:e},{offset:t,source:n,end:s},a){const i=new Cu(n.substring(1));i.source===""&&a(t,"BAD_ALIAS","Alias cannot be an empty string"),i.source.endsWith(":")&&a(t+n.length-1,"BAD_ALIAS","Alias ending in : is ambiguous",!0);const o=t+n.length,r=vo(s,o,e.strict,a);return i.range=[t,o,r.offset],r.comment&&(i.comment=r.comment),i}function ET(e,t,{offset:n,start:s,value:a,end:i},o){const r=Object.assign({_directives:t},e),l=new Zr(void 0,r),u={atKey:!1,atRoot:!0,directives:l.directives,options:l.options,schema:l.schema},d=Ka(s,{indicator:"doc-start",next:a??(i==null?void 0:i[0]),offset:n,onError:o,parentIndent:0,startOnNewline:!0});d.found&&(l.directives.docStart=!0,a&&(a.type==="block-map"||a.type==="block-seq")&&!d.hasNewline&&o(d.end,"MISSING_CHAR","Block collection cannot start on same line with directives-end marker")),l.contents=a?Uv(u,a,d,o):$u(u,d.end,s,null,d,o);const h=l.contents.range[2],f=vo(i,h,!1,o);return f.comment&&(l.comment=f.comment),l.range=[n,h,f.offset],l}function gi(e){if(typeof e=="number")return[e,e+1];if(Array.isArray(e))return e.length===2?e:[e[0],e[1]];const{offset:t,source:n}=e;return[t,t+(typeof n=="string"?n.length:1)]}function Af(e){var a;let t="",n=!1,s=!1;for(let i=0;i<e.length;++i){const o=e[i];switch(o[0]){case"#":t+=(t===""?"":s?`

`:`
`)+(o.substring(1)||" "),n=!0,s=!1;break;case"%":((a=e[i+1])==null?void 0:a[0])!=="#"&&(i+=1),n=!1;break;default:n||(s=!0),n=!1}}return{comment:t,afterEmptyLine:s}}class LT{constructor(t={}){this.doc=null,this.atDirectives=!1,this.prelude=[],this.errors=[],this.warnings=[],this.onError=(n,s,a,i)=>{const o=gi(n);i?this.warnings.push(new cT(o,s,a)):this.errors.push(new ki(o,s,a))},this.directives=new Zt({version:t.version||"1.2"}),this.options=t}decorate(t,n){const{comment:s,afterEmptyLine:a}=Af(this.prelude);if(s){const i=t.contents;if(n)t.comment=t.comment?`${t.comment}
${s}`:s;else if(a||t.directives.docStart||!i)t.commentBefore=s;else if(xt(i)&&!i.flow&&i.items.length>0){let o=i.items[0];At(o)&&(o=o.key);const r=o.commentBefore;o.commentBefore=r?`${s}
${r}`:s}else{const o=i.commentBefore;i.commentBefore=o?`${s}
${o}`:s}}if(n){for(let i=0;i<this.errors.length;++i)t.errors.push(this.errors[i]);for(let i=0;i<this.warnings.length;++i)t.warnings.push(this.warnings[i])}else t.errors=this.errors,t.warnings=this.warnings;this.prelude=[],this.errors=[],this.warnings=[]}streamInfo(){return{comment:Af(this.prelude).comment,directives:this.directives,errors:this.errors,warnings:this.warnings}}*compose(t,n=!1,s=-1){for(const a of t)yield*this.next(a);yield*this.end(n,s)}*next(t){switch(t.type){case"directive":this.directives.add(t.source,(n,s,a)=>{const i=gi(t);i[0]+=n,this.onError(i,"BAD_DIRECTIVE",s,a)}),this.prelude.push(t.source),this.atDirectives=!0;break;case"document":{const n=ET(this.options,this.directives,t,this.onError);this.atDirectives&&!n.directives.docStart&&this.onError(t,"MISSING_CHAR","Missing directives-end/doc-start indicator line"),this.decorate(n,!1),this.doc&&(yield this.doc),this.doc=n,this.atDirectives=!1;break}case"byte-order-mark":case"space":break;case"comment":case"newline":this.prelude.push(t.source);break;case"error":{const n=t.source?`${t.message}: ${JSON.stringify(t.source)}`:t.message,s=new ki(gi(t),"UNEXPECTED_TOKEN",n);this.atDirectives||!this.doc?this.errors.push(s):this.doc.errors.push(s);break}case"doc-end":{if(!this.doc){const s="Unexpected doc-end without preceding document";this.errors.push(new ki(gi(t),"UNEXPECTED_TOKEN",s));break}this.doc.directives.docEnd=!0;const n=vo(t.end,t.offset+t.source.length,this.doc.options.strict,this.onError);if(this.decorate(this.doc,!0),n.comment){const s=this.doc.comment;this.doc.comment=s?`${s}
${n.comment}`:n.comment}this.doc.range[2]=n.offset;break}default:this.errors.push(new ki(gi(t),"UNEXPECTED_TOKEN",`Unsupported token ${t.type}`))}}*end(t=!1,n=-1){if(this.doc)this.decorate(this.doc,!0),yield this.doc,this.doc=null;else if(t){const s=Object.assign({_directives:this.directives},this.options),a=new Zr(void 0,s);this.atDirectives&&this.onError(n,"MISSING_CHAR","Missing directives-end indicator line"),a.range=[0,n,n],this.decorate(a,!1),yield a}}}const Gv="\uFEFF",Kv="",Yv="",_c="";function OT(e){switch(e){case Gv:return"byte-order-mark";case Kv:return"doc-mode";case Yv:return"flow-error-end";case _c:return"scalar";case"---":return"doc-start";case"...":return"doc-end";case"":case`
`:case`\r
`:return"newline";case"-":return"seq-item-ind";case"?":return"explicit-key-ind";case":":return"map-value-ind";case"{":return"flow-map-start";case"}":return"flow-map-end";case"[":return"flow-seq-start";case"]":return"flow-seq-end";case",":return"comma"}switch(e[0]){case" ":case"	":return"space";case"#":return"comment";case"%":return"directive-line";case"*":return"alias";case"&":return"anchor";case"!":return"tag";case"'":return"single-quoted-scalar";case'"':return"double-quoted-scalar";case"|":case">":return"block-scalar-header"}return null}function On(e){switch(e){case void 0:case" ":case`
`:case"\r":case"	":return!0;default:return!1}}const Cf=new Set("0123456789ABCDEFabcdef"),NT=new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"),Bo=new Set(",[]{}"),PT=new Set(` ,[]{}
\r	`),Wl=e=>!e||PT.has(e);class BT{constructor(){this.atEnd=!1,this.blockScalarIndent=-1,this.blockScalarKeep=!1,this.buffer="",this.flowKey=!1,this.flowLevel=0,this.indentNext=0,this.indentValue=0,this.lineEndPos=null,this.next=null,this.pos=0}*lex(t,n=!1){if(t){if(typeof t!="string")throw TypeError("source is not a string");this.buffer=this.buffer?this.buffer+t:t,this.lineEndPos=null}this.atEnd=!n;let s=this.next??"stream";for(;s&&(n||this.hasChars(1));)s=yield*this.parseNext(s)}atLineEnd(){let t=this.pos,n=this.buffer[t];for(;n===" "||n==="	";)n=this.buffer[++t];return!n||n==="#"||n===`
`?!0:n==="\r"?this.buffer[t+1]===`
`:!1}charAt(t){return this.buffer[this.pos+t]}continueScalar(t){let n=this.buffer[t];if(this.indentNext>0){let s=0;for(;n===" ";)n=this.buffer[++s+t];if(n==="\r"){const a=this.buffer[s+t+1];if(a===`
`||!a&&!this.atEnd)return t+s+1}return n===`
`||s>=this.indentNext||!n&&!this.atEnd?t+s:-1}if(n==="-"||n==="."){const s=this.buffer.substr(t,3);if((s==="---"||s==="...")&&On(this.buffer[t+3]))return-1}return t}getLine(){let t=this.lineEndPos;return(typeof t!="number"||t!==-1&&t<this.pos)&&(t=this.buffer.indexOf(`
`,this.pos),this.lineEndPos=t),t===-1?this.atEnd?this.buffer.substring(this.pos):null:(this.buffer[t-1]==="\r"&&(t-=1),this.buffer.substring(this.pos,t))}hasChars(t){return this.pos+t<=this.buffer.length}setNext(t){return this.buffer=this.buffer.substring(this.pos),this.pos=0,this.lineEndPos=null,this.next=t,null}peek(t){return this.buffer.substr(this.pos,t)}*parseNext(t){switch(t){case"stream":return yield*this.parseStream();case"line-start":return yield*this.parseLineStart();case"block-start":return yield*this.parseBlockStart();case"doc":return yield*this.parseDocument();case"flow":return yield*this.parseFlowCollection();case"quoted-scalar":return yield*this.parseQuotedScalar();case"block-scalar":return yield*this.parseBlockScalar();case"plain-scalar":return yield*this.parsePlainScalar()}}*parseStream(){let t=this.getLine();if(t===null)return this.setNext("stream");if(t[0]===Gv&&(yield*this.pushCount(1),t=t.substring(1)),t[0]==="%"){let n=t.length,s=t.indexOf("#");for(;s!==-1;){const i=t[s-1];if(i===" "||i==="	"){n=s-1;break}else s=t.indexOf("#",s+1)}for(;;){const i=t[n-1];if(i===" "||i==="	")n-=1;else break}const a=(yield*this.pushCount(n))+(yield*this.pushSpaces(!0));return yield*this.pushCount(t.length-a),this.pushNewline(),"stream"}if(this.atLineEnd()){const n=yield*this.pushSpaces(!0);return yield*this.pushCount(t.length-n),yield*this.pushNewline(),"stream"}return yield Kv,yield*this.parseLineStart()}*parseLineStart(){const t=this.charAt(0);if(!t&&!this.atEnd)return this.setNext("line-start");if(t==="-"||t==="."){if(!this.atEnd&&!this.hasChars(4))return this.setNext("line-start");const n=this.peek(3);if((n==="---"||n==="...")&&On(this.charAt(3)))return yield*this.pushCount(3),this.indentValue=0,this.indentNext=0,n==="---"?"doc":"stream"}return this.indentValue=yield*this.pushSpaces(!1),this.indentNext>this.indentValue&&!On(this.charAt(1))&&(this.indentNext=this.indentValue),yield*this.parseBlockStart()}*parseBlockStart(){const[t,n]=this.peek(2);if(!n&&!this.atEnd)return this.setNext("block-start");if((t==="-"||t==="?"||t===":")&&On(n)){const s=(yield*this.pushCount(1))+(yield*this.pushSpaces(!0));return this.indentNext=this.indentValue+1,this.indentValue+=s,"block-start"}return"doc"}*parseDocument(){yield*this.pushSpaces(!0);const t=this.getLine();if(t===null)return this.setNext("doc");let n=yield*this.pushIndicators();switch(t[n]){case"#":yield*this.pushCount(t.length-n);case void 0:return yield*this.pushNewline(),yield*this.parseLineStart();case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel=1,"flow";case"}":case"]":return yield*this.pushCount(1),"doc";case"*":return yield*this.pushUntil(Wl),"doc";case'"':case"'":return yield*this.parseQuotedScalar();case"|":case">":return n+=yield*this.parseBlockScalarHeader(),n+=yield*this.pushSpaces(!0),yield*this.pushCount(t.length-n),yield*this.pushNewline(),yield*this.parseBlockScalar();default:return yield*this.parsePlainScalar()}}*parseFlowCollection(){let t,n,s=-1;do t=yield*this.pushNewline(),t>0?(n=yield*this.pushSpaces(!1),this.indentValue=s=n):n=0,n+=yield*this.pushSpaces(!0);while(t+n>0);const a=this.getLine();if(a===null)return this.setNext("flow");if((s!==-1&&s<this.indentNext&&a[0]!=="#"||s===0&&(a.startsWith("---")||a.startsWith("..."))&&On(a[3]))&&!(s===this.indentNext-1&&this.flowLevel===1&&(a[0]==="]"||a[0]==="}")))return this.flowLevel=0,yield Yv,yield*this.parseLineStart();let i=0;for(;a[i]===",";)i+=yield*this.pushCount(1),i+=yield*this.pushSpaces(!0),this.flowKey=!1;switch(i+=yield*this.pushIndicators(),a[i]){case void 0:return"flow";case"#":return yield*this.pushCount(a.length-i),"flow";case"{":case"[":return yield*this.pushCount(1),this.flowKey=!1,this.flowLevel+=1,"flow";case"}":case"]":return yield*this.pushCount(1),this.flowKey=!0,this.flowLevel-=1,this.flowLevel?"flow":"doc";case"*":return yield*this.pushUntil(Wl),"flow";case'"':case"'":return this.flowKey=!0,yield*this.parseQuotedScalar();case":":{const o=this.charAt(1);if(this.flowKey||On(o)||o===",")return this.flowKey=!1,yield*this.pushCount(1),yield*this.pushSpaces(!0),"flow"}default:return this.flowKey=!1,yield*this.parsePlainScalar()}}*parseQuotedScalar(){const t=this.charAt(0);let n=this.buffer.indexOf(t,this.pos+1);if(t==="'")for(;n!==-1&&this.buffer[n+1]==="'";)n=this.buffer.indexOf("'",n+2);else for(;n!==-1;){let i=0;for(;this.buffer[n-1-i]==="\\";)i+=1;if(i%2===0)break;n=this.buffer.indexOf('"',n+1)}const s=this.buffer.substring(0,n);let a=s.indexOf(`
`,this.pos);if(a!==-1){for(;a!==-1;){const i=this.continueScalar(a+1);if(i===-1)break;a=s.indexOf(`
`,i)}a!==-1&&(n=a-(s[a-1]==="\r"?2:1))}if(n===-1){if(!this.atEnd)return this.setNext("quoted-scalar");n=this.buffer.length}return yield*this.pushToIndex(n+1,!1),this.flowLevel?"flow":"doc"}*parseBlockScalarHeader(){this.blockScalarIndent=-1,this.blockScalarKeep=!1;let t=this.pos;for(;;){const n=this.buffer[++t];if(n==="+")this.blockScalarKeep=!0;else if(n>"0"&&n<="9")this.blockScalarIndent=Number(n)-1;else if(n!=="-")break}return yield*this.pushUntil(n=>On(n)||n==="#")}*parseBlockScalar(){let t=this.pos-1,n=0,s;e:for(let i=this.pos;s=this.buffer[i];++i)switch(s){case" ":n+=1;break;case`
`:t=i,n=0;break;case"\r":{const o=this.buffer[i+1];if(!o&&!this.atEnd)return this.setNext("block-scalar");if(o===`
`)break}default:break e}if(!s&&!this.atEnd)return this.setNext("block-scalar");if(n>=this.indentNext){this.blockScalarIndent===-1?this.indentNext=n:this.indentNext=this.blockScalarIndent+(this.indentNext===0?1:this.indentNext);do{const i=this.continueScalar(t+1);if(i===-1)break;t=this.buffer.indexOf(`
`,i)}while(t!==-1);if(t===-1){if(!this.atEnd)return this.setNext("block-scalar");t=this.buffer.length}}let a=t+1;for(s=this.buffer[a];s===" ";)s=this.buffer[++a];if(s==="	"){for(;s==="	"||s===" "||s==="\r"||s===`
`;)s=this.buffer[++a];t=a-1}else if(!this.blockScalarKeep)do{let i=t-1,o=this.buffer[i];o==="\r"&&(o=this.buffer[--i]);const r=i;for(;o===" ";)o=this.buffer[--i];if(o===`
`&&i>=this.pos&&i+1+n>r)t=i;else break}while(!0);return yield _c,yield*this.pushToIndex(t+1,!0),yield*this.parseLineStart()}*parsePlainScalar(){const t=this.flowLevel>0;let n=this.pos-1,s=this.pos-1,a;for(;a=this.buffer[++s];)if(a===":"){const i=this.buffer[s+1];if(On(i)||t&&Bo.has(i))break;n=s}else if(On(a)){let i=this.buffer[s+1];if(a==="\r"&&(i===`
`?(s+=1,a=`
`,i=this.buffer[s+1]):n=s),i==="#"||t&&Bo.has(i))break;if(a===`
`){const o=this.continueScalar(s+1);if(o===-1)break;s=Math.max(s,o-2)}}else{if(t&&Bo.has(a))break;n=s}return!a&&!this.atEnd?this.setNext("plain-scalar"):(yield _c,yield*this.pushToIndex(n+1,!0),t?"flow":"doc")}*pushCount(t){return t>0?(yield this.buffer.substr(this.pos,t),this.pos+=t,t):0}*pushToIndex(t,n){const s=this.buffer.slice(this.pos,t);return s?(yield s,this.pos+=s.length,s.length):(n&&(yield""),0)}*pushIndicators(){let t=0;e:for(;;){switch(this.charAt(0)){case"!":t+=yield*this.pushTag(),t+=yield*this.pushSpaces(!0);continue e;case"&":t+=yield*this.pushUntil(Wl),t+=yield*this.pushSpaces(!0);continue e;case"-":case"?":case":":{const n=this.flowLevel>0,s=this.charAt(1);if(On(s)||n&&Bo.has(s)){n?this.flowKey&&(this.flowKey=!1):this.indentNext=this.indentValue+1,t+=yield*this.pushCount(1),t+=yield*this.pushSpaces(!0);continue e}}}break e}return t}*pushTag(){if(this.charAt(1)==="<"){let t=this.pos+2,n=this.buffer[t];for(;!On(n)&&n!==">";)n=this.buffer[++t];return yield*this.pushToIndex(n===">"?t+1:t,!1)}else{let t=this.pos+1,n=this.buffer[t];for(;n;)if(NT.has(n))n=this.buffer[++t];else if(n==="%"&&Cf.has(this.buffer[t+1])&&Cf.has(this.buffer[t+2]))n=this.buffer[t+=3];else break;return yield*this.pushToIndex(t,!1)}}*pushNewline(){const t=this.buffer[this.pos];return t===`
`?yield*this.pushCount(1):t==="\r"&&this.charAt(1)===`
`?yield*this.pushCount(2):0}*pushSpaces(t){let n=this.pos-1,s;do s=this.buffer[++n];while(s===" "||t&&s==="	");const a=n-this.pos;return a>0&&(yield this.buffer.substr(this.pos,a),this.pos=n),a}*pushUntil(t){let n=this.pos,s=this.buffer[n];for(;!t(s);)s=this.buffer[++n];return yield*this.pushToIndex(n,!1)}}class DT{constructor(){this.lineStarts=[],this.addNewLine=t=>this.lineStarts.push(t),this.linePos=t=>{let n=0,s=this.lineStarts.length;for(;n<s;){const i=n+s>>1;this.lineStarts[i]<t?n=i+1:s=i}if(this.lineStarts[n]===t)return{line:n+1,col:1};if(n===0)return{line:0,col:t};const a=this.lineStarts[n-1];return{line:n,col:t-a+1}}}}function Ps(e,t){for(let n=0;n<e.length;++n)if(e[n].type===t)return!0;return!1}function Tf(e){for(let t=0;t<e.length;++t)switch(e[t].type){case"space":case"comment":case"newline":break;default:return t}return-1}function Xv(e){switch(e==null?void 0:e.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":case"flow-collection":return!0;default:return!1}}function Do(e){switch(e.type){case"document":return e.start;case"block-map":{const t=e.items[e.items.length-1];return t.sep??t.start}case"block-seq":return e.items[e.items.length-1].start;default:return[]}}function xa(e){var n;if(e.length===0)return[];let t=e.length;e:for(;--t>=0;)switch(e[t].type){case"doc-start":case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":case"newline":break e}for(;((n=e[++t])==null?void 0:n.type)==="space";);return e.splice(t,e.length)}function yr(e,t){if(t.length<1e5)Array.prototype.push.apply(e,t);else for(let n=0;n<t.length;++n)e.push(t[n])}function If(e){if(e.start.type==="flow-seq-start")for(const t of e.items)t.sep&&!t.value&&!Ps(t.start,"explicit-key-ind")&&!Ps(t.sep,"map-value-ind")&&(t.key&&(t.value=t.key),delete t.key,Xv(t.value)?t.value.end?yr(t.value.end,t.sep):t.value.end=t.sep:yr(t.start,t.sep),delete t.sep)}class RT{constructor(t){this.atNewLine=!0,this.atScalar=!1,this.indent=0,this.offset=0,this.onKeyLine=!1,this.stack=[],this.source="",this.type="",this.lexer=new BT,this.onNewLine=t}*parse(t,n=!1){this.onNewLine&&this.offset===0&&this.onNewLine(0);for(const s of this.lexer.lex(t,n))yield*this.next(s);n||(yield*this.end())}*next(t){if(this.source=t,this.atScalar){this.atScalar=!1,yield*this.step(),this.offset+=t.length;return}const n=OT(t);if(n)if(n==="scalar")this.atNewLine=!1,this.atScalar=!0,this.type="scalar";else{switch(this.type=n,yield*this.step(),n){case"newline":this.atNewLine=!0,this.indent=0,this.onNewLine&&this.onNewLine(this.offset+t.length);break;case"space":this.atNewLine&&t[0]===" "&&(this.indent+=t.length);break;case"explicit-key-ind":case"map-value-ind":case"seq-item-ind":this.atNewLine&&(this.indent+=t.length);break;case"doc-mode":case"flow-error-end":return;default:this.atNewLine=!1}this.offset+=t.length}else{const s=`Not a YAML token: ${t}`;yield*this.pop({type:"error",offset:this.offset,message:s,source:t}),this.offset+=t.length}}*end(){for(;this.stack.length>0;)yield*this.pop()}get sourceToken(){return{type:this.type,offset:this.offset,indent:this.indent,source:this.source}}*step(){const t=this.peek(1);if(this.type==="doc-end"&&(t==null?void 0:t.type)!=="doc-end"){for(;this.stack.length>0;)yield*this.pop();this.stack.push({type:"doc-end",offset:this.offset,source:this.source});return}if(!t)return yield*this.stream();switch(t.type){case"document":return yield*this.document(t);case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return yield*this.scalar(t);case"block-scalar":return yield*this.blockScalar(t);case"block-map":return yield*this.blockMap(t);case"block-seq":return yield*this.blockSequence(t);case"flow-collection":return yield*this.flowCollection(t);case"doc-end":return yield*this.documentEnd(t)}yield*this.pop()}peek(t){return this.stack[this.stack.length-t]}*pop(t){const n=t??this.stack.pop();if(!n)yield{type:"error",offset:this.offset,source:"",message:"Tried to pop an empty stack"};else if(this.stack.length===0)yield n;else{const s=this.peek(1);switch(n.type==="block-scalar"?n.indent="indent"in s?s.indent:0:n.type==="flow-collection"&&s.type==="document"&&(n.indent=0),n.type==="flow-collection"&&If(n),s.type){case"document":s.value=n;break;case"block-scalar":s.props.push(n);break;case"block-map":{const a=s.items[s.items.length-1];if(a.value){s.items.push({start:[],key:n,sep:[]}),this.onKeyLine=!0;return}else if(a.sep)a.value=n;else{Object.assign(a,{key:n,sep:[]}),this.onKeyLine=!a.explicitKey;return}break}case"block-seq":{const a=s.items[s.items.length-1];a.value?s.items.push({start:[],value:n}):a.value=n;break}case"flow-collection":{const a=s.items[s.items.length-1];!a||a.value?s.items.push({start:[],key:n,sep:[]}):a.sep?a.value=n:Object.assign(a,{key:n,sep:[]});return}default:yield*this.pop(),yield*this.pop(n)}if((s.type==="document"||s.type==="block-map"||s.type==="block-seq")&&(n.type==="block-map"||n.type==="block-seq")){const a=n.items[n.items.length-1];a&&!a.sep&&!a.value&&a.start.length>0&&Tf(a.start)===-1&&(n.indent===0||a.start.every(i=>i.type!=="comment"||i.indent<n.indent))&&(s.type==="document"?s.end=a.start:s.items.push({start:a.start}),n.items.splice(-1,1))}}}*stream(){switch(this.type){case"directive-line":yield{type:"directive",offset:this.offset,source:this.source};return;case"byte-order-mark":case"space":case"comment":case"newline":yield this.sourceToken;return;case"doc-mode":case"doc-start":{const t={type:"document",offset:this.offset,start:[]};this.type==="doc-start"&&t.start.push(this.sourceToken),this.stack.push(t);return}}yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML stream`,source:this.source}}*document(t){if(t.value)return yield*this.lineEnd(t);switch(this.type){case"doc-start":{Tf(t.start)!==-1?(yield*this.pop(),yield*this.step()):t.start.push(this.sourceToken);return}case"anchor":case"tag":case"space":case"comment":case"newline":t.start.push(this.sourceToken);return}const n=this.startBlockValue(t);n?this.stack.push(n):yield{type:"error",offset:this.offset,message:`Unexpected ${this.type} token in YAML document`,source:this.source}}*scalar(t){if(this.type==="map-value-ind"){const n=Do(this.peek(2)),s=xa(n);let a;t.end?(a=t.end,a.push(this.sourceToken),delete t.end):a=[this.sourceToken];const i={type:"block-map",offset:t.offset,indent:t.indent,items:[{start:s,key:t,sep:a}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=i}else yield*this.lineEnd(t)}*blockScalar(t){switch(this.type){case"space":case"comment":case"newline":t.props.push(this.sourceToken);return;case"scalar":if(t.source=this.source,this.atNewLine=!0,this.indent=0,this.onNewLine){let n=this.source.indexOf(`
`)+1;for(;n!==0;)this.onNewLine(this.offset+n),n=this.source.indexOf(`
`,n)+1}yield*this.pop();break;default:yield*this.pop(),yield*this.step()}}*blockMap(t){var s;const n=t.items[t.items.length-1];switch(this.type){case"newline":if(this.onKeyLine=!1,n.value){const a="end"in n.value?n.value.end:void 0,i=Array.isArray(a)?a[a.length-1]:void 0;(i==null?void 0:i.type)==="comment"?a==null||a.push(this.sourceToken):t.items.push({start:[this.sourceToken]})}else n.sep?n.sep.push(this.sourceToken):n.start.push(this.sourceToken);return;case"space":case"comment":if(n.value)t.items.push({start:[this.sourceToken]});else if(n.sep)n.sep.push(this.sourceToken);else{if(this.atIndentedComment(n.start,t.indent)){const a=t.items[t.items.length-2],i=(s=a==null?void 0:a.value)==null?void 0:s.end;if(Array.isArray(i)){yr(i,n.start),i.push(this.sourceToken),t.items.pop();return}}n.start.push(this.sourceToken)}return}if(this.indent>=t.indent){const a=!this.onKeyLine&&this.indent===t.indent,i=a&&(n.sep||n.explicitKey)&&this.type!=="seq-item-ind";let o=[];if(i&&n.sep&&!n.value){const r=[];for(let l=0;l<n.sep.length;++l){const u=n.sep[l];switch(u.type){case"newline":r.push(l);break;case"space":break;case"comment":u.indent>t.indent&&(r.length=0);break;default:r.length=0}}r.length>=2&&(o=n.sep.splice(r[1]))}switch(this.type){case"anchor":case"tag":i||n.value?(o.push(this.sourceToken),t.items.push({start:o}),this.onKeyLine=!0):n.sep?n.sep.push(this.sourceToken):n.start.push(this.sourceToken);return;case"explicit-key-ind":!n.sep&&!n.explicitKey?(n.start.push(this.sourceToken),n.explicitKey=!0):i||n.value?(o.push(this.sourceToken),t.items.push({start:o,explicitKey:!0})):this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken],explicitKey:!0}]}),this.onKeyLine=!0;return;case"map-value-ind":if(n.explicitKey)if(n.sep)if(n.value)t.items.push({start:[],key:null,sep:[this.sourceToken]});else if(Ps(n.sep,"map-value-ind"))this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:o,key:null,sep:[this.sourceToken]}]});else if(Xv(n.key)&&!Ps(n.sep,"newline")){const r=xa(n.start),l=n.key,u=n.sep;u.push(this.sourceToken),delete n.key,delete n.sep,this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:l,sep:u}]})}else o.length>0?n.sep=n.sep.concat(o,this.sourceToken):n.sep.push(this.sourceToken);else if(Ps(n.start,"newline"))Object.assign(n,{key:null,sep:[this.sourceToken]});else{const r=xa(n.start);this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:r,key:null,sep:[this.sourceToken]}]})}else n.sep?n.value||i?t.items.push({start:o,key:null,sep:[this.sourceToken]}):Ps(n.sep,"map-value-ind")?this.stack.push({type:"block-map",offset:this.offset,indent:this.indent,items:[{start:[],key:null,sep:[this.sourceToken]}]}):n.sep.push(this.sourceToken):Object.assign(n,{key:null,sep:[this.sourceToken]});this.onKeyLine=!0;return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const r=this.flowScalar(this.type);i||n.value?(t.items.push({start:o,key:r,sep:[]}),this.onKeyLine=!0):n.sep?this.stack.push(r):(Object.assign(n,{key:r,sep:[]}),this.onKeyLine=!0);return}default:{const r=this.startBlockValue(t);if(r){if(r.type==="block-seq"){if(!n.explicitKey&&n.sep&&!Ps(n.sep,"newline")){yield*this.pop({type:"error",offset:this.offset,message:"Unexpected block-seq-ind on same line with key",source:this.source});return}}else a&&t.items.push({start:o});this.stack.push(r);return}}}}yield*this.pop(),yield*this.step()}*blockSequence(t){var s;const n=t.items[t.items.length-1];switch(this.type){case"newline":if(n.value){const a="end"in n.value?n.value.end:void 0,i=Array.isArray(a)?a[a.length-1]:void 0;(i==null?void 0:i.type)==="comment"?a==null||a.push(this.sourceToken):t.items.push({start:[this.sourceToken]})}else n.start.push(this.sourceToken);return;case"space":case"comment":if(n.value)t.items.push({start:[this.sourceToken]});else{if(this.atIndentedComment(n.start,t.indent)){const a=t.items[t.items.length-2],i=(s=a==null?void 0:a.value)==null?void 0:s.end;if(Array.isArray(i)){yr(i,n.start),i.push(this.sourceToken),t.items.pop();return}}n.start.push(this.sourceToken)}return;case"anchor":case"tag":if(n.value||this.indent<=t.indent)break;n.start.push(this.sourceToken);return;case"seq-item-ind":if(this.indent!==t.indent)break;n.value||Ps(n.start,"seq-item-ind")?t.items.push({start:[this.sourceToken]}):n.start.push(this.sourceToken);return}if(this.indent>t.indent){const a=this.startBlockValue(t);if(a){this.stack.push(a);return}}yield*this.pop(),yield*this.step()}*flowCollection(t){const n=t.items[t.items.length-1];if(this.type==="flow-error-end"){let s;do yield*this.pop(),s=this.peek(1);while((s==null?void 0:s.type)==="flow-collection")}else if(t.end.length===0){switch(this.type){case"comma":case"explicit-key-ind":!n||n.sep?t.items.push({start:[this.sourceToken]}):n.start.push(this.sourceToken);return;case"map-value-ind":!n||n.value?t.items.push({start:[],key:null,sep:[this.sourceToken]}):n.sep?n.sep.push(this.sourceToken):Object.assign(n,{key:null,sep:[this.sourceToken]});return;case"space":case"comment":case"newline":case"anchor":case"tag":!n||n.value?t.items.push({start:[this.sourceToken]}):n.sep?n.sep.push(this.sourceToken):n.start.push(this.sourceToken);return;case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":{const a=this.flowScalar(this.type);!n||n.value?t.items.push({start:[],key:a,sep:[]}):n.sep?this.stack.push(a):Object.assign(n,{key:a,sep:[]});return}case"flow-map-end":case"flow-seq-end":t.end.push(this.sourceToken);return}const s=this.startBlockValue(t);s?this.stack.push(s):(yield*this.pop(),yield*this.step())}else{const s=this.peek(2);if(s.type==="block-map"&&(this.type==="map-value-ind"&&s.indent===t.indent||this.type==="newline"&&!s.items[s.items.length-1].sep))yield*this.pop(),yield*this.step();else if(this.type==="map-value-ind"&&s.type!=="flow-collection"){const a=Do(s),i=xa(a);If(t);const o=t.end.splice(1,t.end.length);o.push(this.sourceToken);const r={type:"block-map",offset:t.offset,indent:t.indent,items:[{start:i,key:t,sep:o}]};this.onKeyLine=!0,this.stack[this.stack.length-1]=r}else yield*this.lineEnd(t)}}flowScalar(t){if(this.onNewLine){let n=this.source.indexOf(`
`)+1;for(;n!==0;)this.onNewLine(this.offset+n),n=this.source.indexOf(`
`,n)+1}return{type:t,offset:this.offset,indent:this.indent,source:this.source}}startBlockValue(t){switch(this.type){case"alias":case"scalar":case"single-quoted-scalar":case"double-quoted-scalar":return this.flowScalar(this.type);case"block-scalar-header":return{type:"block-scalar",offset:this.offset,indent:this.indent,props:[this.sourceToken],source:""};case"flow-map-start":case"flow-seq-start":return{type:"flow-collection",offset:this.offset,indent:this.indent,start:this.sourceToken,items:[],end:[]};case"seq-item-ind":return{type:"block-seq",offset:this.offset,indent:this.indent,items:[{start:[this.sourceToken]}]};case"explicit-key-ind":{this.onKeyLine=!0;const n=Do(t),s=xa(n);return s.push(this.sourceToken),{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,explicitKey:!0}]}}case"map-value-ind":{this.onKeyLine=!0;const n=Do(t),s=xa(n);return{type:"block-map",offset:this.offset,indent:this.indent,items:[{start:s,key:null,sep:[this.sourceToken]}]}}}return null}atIndentedComment(t,n){return this.type!=="comment"||this.indent<=n?!1:t.every(s=>s.type==="newline"||s.type==="space")}*documentEnd(t){this.type!=="doc-mode"&&(t.end?t.end.push(this.sourceToken):t.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop()))}*lineEnd(t){switch(this.type){case"comma":case"doc-start":case"doc-end":case"flow-seq-end":case"flow-map-end":case"map-value-ind":yield*this.pop(),yield*this.step();break;case"newline":this.onKeyLine=!1;case"space":case"comment":default:t.end?t.end.push(this.sourceToken):t.end=[this.sourceToken],this.type==="newline"&&(yield*this.pop())}}}function MT(e){const t=e.prettyErrors!==!1;return{lineCounter:e.lineCounter||t&&new DT||null,prettyErrors:t}}function $T(e,t={}){const{lineCounter:n,prettyErrors:s}=MT(t),a=new RT(n==null?void 0:n.addNewLine),i=new LT(t);let o=null;for(const r of i.compose(a.parse(e),!0,e.length))if(!o)o=r;else if(o.options.logLevel!=="silent"){o.errors.push(new ki(r.range.slice(0,2),"MULTIPLE_DOCS","Source contains multiple documents; please use YAML.parseAllDocuments()"));break}return s&&n&&(o.errors.forEach(xf(e,n)),o.warnings.forEach(xf(e,n))),o}function Jv(e,t,n){let s;const a=$T(e,n);if(!a)return null;if(a.warnings.forEach(i=>Sv(a.options.logLevel,i)),a.errors.length>0){if(a.options.logLevel!=="silent")throw a.errors[0];a.errors=[]}return a.toJS(Object.assign({reviver:s},n))}function Qv(e){return e.replace(/^.*\//,"")}function Zv(e,t){return Qv(e).replace(t,"")}const jT=Object.assign({"../../../domain/specs/gherkin/backend/conflict-resolution.feature":NA,"../../../domain/specs/gherkin/ui-playground-use-cases/backend-persistence.feature":PA,"../../../domain/specs/gherkin/ui-playground-use-cases/conflict-card-content-visibility.feature":BA,"../../../domain/specs/gherkin/ui-playground-use-cases/conflict-persistence.feature":DA,"../../../domain/specs/gherkin/ui-playground-use-cases/create-locale.feature":RA,"../../../domain/specs/gherkin/ui-playground-use-cases/distribution.feature":MA,"../../../domain/specs/gherkin/ui-playground-use-cases/e-language.feature":$A,"../../../domain/specs/gherkin/ui-playground-use-cases/editing.feature":jA,"../../../domain/specs/gherkin/ui-playground-use-cases/empty-campaign-lifecycle.feature":VA,"../../../domain/specs/gherkin/ui-playground-use-cases/incoming-changes-readonly.feature":FA,"../../../domain/specs/gherkin/ui-playground-use-cases/locale-resolution.feature":WA,"../../../domain/specs/gherkin/ui-playground-use-cases/mark-as-ready.feature":HA,"../../../domain/specs/gherkin/ui-playground-use-cases/smoke.feature":qA,"../../../domain/specs/gherkin/ui-playground-use-cases/state-reset.feature":zA,"../../../domain/specs/gherkin/ui-playground-use-cases/translation-flow.feature":UA,"../../../domain/specs/gherkin/ui-playground-use-cases/use-case-list.feature":GA});function VT(e){const t=e.match(/\/gherkin\/(.+)\.feature$/);return t?t[1].replace(/\//g,"__"):Zv(e,".feature")}function FT(e){const t=e.match(/domain\/specs\/gherkin\/.+$/);return t?t[0]:e}function WT(e){const t=e.match(/^\s*Feature:\s*(.+)$/m);return t?t[1].trim():null}const el=Object.entries(jT).map(([e,t])=>{const n=VT(e);return{slug:n,sourcePath:FT(e),title:WT(t)??n,raw:t}}).sort((e,t)=>e.title.localeCompare(t.title));function HT(e){return el.find(t=>t.slug===e)}const qT=Object.assign({});function ey(e){if(!e)return"—";if(typeof e.type=="string"){if(e.type==="array"&&e.items&&typeof e.items=="object"){const t=e.items;return`array<${ey(t)}>`}return e.type}return Array.isArray(e.type)?e.type.join(" | "):e.$ref?String(e.$ref).replace(/^.*\//,""):e.enum?"enum":e.oneOf?"oneOf":e.anyOf?"anyOf":"object"}function zT(e){const t=e.properties??{},n=e.required??[];return Object.entries(t).map(([s,a])=>({name:s,type:ey(a),description:a.description,required:n.includes(s),example:a.example,enum:a.enum}))}const tl=Object.entries(qT).map(([e,t])=>{const n=Zv(e,".schema.json");return{slug:n,title:t.title??n,description:t.description,properties:zT(t),raw:t}}).sort((e,t)=>e.title.localeCompare(t.title));function UT(e){return tl.find(t=>t.slug===e)}const GT=Object.assign({"../../../domain/specs/agents/campaign-agent/agent.card.json":sC,"../../../domain/specs/agents/ui-agent/agent.card.json":fC});function KT(e){const t=e.match(/domain\/specs\/agents\/.+$/);return t?t[0]:e}const nl=Object.entries(GT).map(([e,t])=>{const n=e.replace(/^.*\/agents\//,"").replace(/\/agent\.card\.json$/,"");return{slug:n,sourcePath:KT(e),name:t.name??n,description:t.description,raw:t}}).sort((e,t)=>e.name.localeCompare(t.name));function YT(e){return nl.find(t=>t.slug===e)}const XT=Object.assign({"../../../domain/specs/services/campaign-backend/api/workflows/base-edit-propagation/workflow.yaml":pC,"../../../domain/specs/services/campaign-backend/api/workflows/bulk-update-texts/workflow.yaml":mC,"../../../domain/specs/services/campaign-backend/api/workflows/campaign-creation/workflow.yaml":gC,"../../../domain/specs/services/campaign-backend/api/workflows/change-delegation/workflow.yaml":vC,"../../../domain/specs/services/campaign-backend/api/workflows/compare-versions/workflow.yaml":yC,"../../../domain/specs/services/campaign-backend/api/workflows/create-and-get-campaign/workflow.yaml":bC,"../../../domain/specs/services/campaign-backend/api/workflows/delete-campaign/workflow.yaml":wC,"../../../domain/specs/services/campaign-backend/api/workflows/delete-locale/workflow.yaml":kC,"../../../domain/specs/services/campaign-backend/api/workflows/fork-translation/workflow.yaml":SC,"../../../domain/specs/services/campaign-backend/api/workflows/list-and-filter-campaigns/workflow.yaml":xC,"../../../domain/specs/services/campaign-backend/api/workflows/list-block-texts-batch/workflow.yaml":_C,"../../../domain/specs/services/campaign-backend/api/workflows/restore-version/workflow.yaml":AC,"../../../domain/specs/services/campaign-backend/api/workflows/translate-content/workflow.yaml":CC,"../../../domain/specs/services/campaign-backend/api/workflows/update-campaign-metadata/workflow.yaml":TC,"../../../domain/specs/services/campaign-backend/api/workflows/update-plan/workflow.yaml":IC,"../../../domain/specs/services/campaign-backend/api/workflows/version-history/workflow.yaml":EC});function JT(e){const t=e.match(/\/services\/([^/]+)\/api\/workflows\/([^/]+)\/workflow\.ya?ml$/);if(!t)return Qv(e).replace(/\.ya?ml$/,"");const[,n,s]=t;return`${n}-${s}`}function QT(e){const t=e.match(/domain\/specs\/services\/.+$/);return t?t[0]:e}const sl=Object.entries(XT).map(([e,t])=>{const n=Jv(t),s=n.workflows??[];return{slug:JT(e),sourcePath:QT(e),arazzo:n.arazzo??"unknown",info:n.info,workflows:s.map(a=>({workflowId:a.workflowId??"",summary:a.summary,description:a.description,inputs:a.inputs,steps:(a.steps??[]).map(i=>({stepId:i.stepId??"",description:i.description,operationId:i.operationId,workflowId:i.workflowId,parameters:i.parameters,outputs:i.outputs,successCriteria:i.successCriteria,onSuccess:i.onSuccess,onFailure:i.onFailure})),outputs:a.outputs})),raw:n}}).sort((e,t)=>e.slug.localeCompare(t.slug));function ZT(e){return sl.find(t=>t.slug===e)}const eI={class:"d-flex align-center mb-3"},tI={class:"d-flex ga-2 flex-wrap"},nI={class:"d-flex align-center mb-3"},sI={class:"d-flex ga-2 flex-wrap"},aI={class:"d-flex align-center mb-3"},iI={class:"d-flex align-center mb-3"},oI={class:"d-flex align-center mb-3"},rI={class:"d-flex ga-2 flex-wrap"},lI=Ct({__name:"HomePage",setup(e){const t=N(()=>Ni.length),n=N(()=>fo.length),s=N(()=>Ni.filter(o=>o.status==="in-progress").length),a=N(()=>Ni.filter(o=>o.status==="planned").length),i=N(()=>1+sl.length+nl.length+el.length+tl.length);return(o,r)=>(B(),H("div",null,[r[17]||(r[17]=b("div",{class:"mb-8"},[b("h1",{class:"text-h3 font-weight-bold mb-2"},"📋 Change Delegation"),b("p",{class:"text-body-1 text-medium-emphasis"}," Knowledge base, prototype, specs, and a running log of the change-delegation work. ")],-1)),S(fr,null,{default:D(()=>[S(Nn,{cols:"12",md:"6"},{default:D(()=>[S(ln,{to:"/features",variant:"elevated",elevation:"2",hover:"",class:"h-100 pa-4"},{default:D(()=>[b("div",eI,[S(Ke,{size:"32",color:"primary",class:"mr-3"},{default:D(()=>[...r[0]||(r[0]=[K(" mdi-rocket-launch-outline ",-1)])]),_:1}),r[1]||(r[1]=b("h2",{class:"text-h5 font-weight-bold mb-0"},"Feature Development",-1))]),r[2]||(r[2]=b("p",{class:"text-body-2 text-medium-emphasis mb-4"}," Timeline of what's been delivered, what's in flight, and what's coming. ",-1)),b("div",tI,[S(vt,{size:"small",color:"success",variant:"tonal"},{default:D(()=>[K(V(t.value)+" entries ",1)]),_:1}),S(vt,{size:"small",color:"warning",variant:"tonal"},{default:D(()=>[K(V(s.value)+" in progress ",1)]),_:1}),S(vt,{size:"small",color:"info",variant:"tonal"},{default:D(()=>[K(V(a.value)+" planned ",1)]),_:1})])]),_:1})]),_:1}),S(Nn,{cols:"12",md:"6"},{default:D(()=>[S(ln,{to:"/experiments",variant:"elevated",elevation:"2",hover:"",class:"h-100 pa-4"},{default:D(()=>[b("div",nI,[S(Ke,{size:"32",color:"secondary",class:"mr-3"},{default:D(()=>[...r[3]||(r[3]=[K(" mdi-flask-outline ",-1)])]),_:1}),r[4]||(r[4]=b("h2",{class:"text-h5 font-weight-bold mb-0"},"Learnings / Experiments",-1))]),r[5]||(r[5]=b("p",{class:"text-body-2 text-medium-emphasis mb-4"}," Spikes, A/B tests, and prompt experiments. Click through any entry for the full write-up. ",-1)),b("div",sI,[S(vt,{size:"small",color:"secondary",variant:"tonal"},{default:D(()=>[K(V(n.value)+" experiments ",1)]),_:1})])]),_:1})]),_:1}),S(Nn,{cols:"12",md:"6"},{default:D(()=>[S(ln,{href:"/wiki/",target:"_blank",variant:"elevated",elevation:"2",hover:"",class:"h-100 pa-4"},{default:D(()=>[b("div",aI,[S(Ke,{size:"32",color:"info",class:"mr-3"},{default:D(()=>[...r[6]||(r[6]=[K(" mdi-book-open-outline ",-1)])]),_:1}),r[8]||(r[8]=b("h2",{class:"text-h5 font-weight-bold mb-0"},"Wiki",-1)),S(Ji),S(Ke,{size:"18",color:"info"},{default:D(()=>[...r[7]||(r[7]=[K("mdi-open-in-new",-1)])]),_:1})]),r[9]||(r[9]=b("p",{class:"text-body-2 text-medium-emphasis mb-0"}," Curated knowledge base: synthesis pages, sourced claims, and references. ",-1))]),_:1})]),_:1}),S(Nn,{cols:"12",md:"6"},{default:D(()=>[S(ln,{href:"/proto/",target:"_blank",variant:"elevated",elevation:"2",hover:"",class:"h-100 pa-4"},{default:D(()=>[b("div",iI,[S(Ke,{size:"32",color:"accent",class:"mr-3"},{default:D(()=>[...r[10]||(r[10]=[K("mdi-cube-outline",-1)])]),_:1}),r[12]||(r[12]=b("h2",{class:"text-h5 font-weight-bold mb-0"},"Prototype",-1)),S(Ji),S(Ke,{size:"18",color:"accent"},{default:D(()=>[...r[11]||(r[11]=[K("mdi-open-in-new",-1)])]),_:1})]),r[13]||(r[13]=b("p",{class:"text-body-2 text-medium-emphasis mb-0"}," Interactive Clickable Concept of the change-delegation flow. ",-1))]),_:1})]),_:1}),S(Nn,{cols:"12"},{default:D(()=>[S(ln,{to:"/specifications",variant:"elevated",elevation:"2",hover:"",class:"pa-4"},{default:D(()=>[b("div",oI,[S(Ke,{size:"32",color:"primary",class:"mr-3"},{default:D(()=>[...r[14]||(r[14]=[K(" mdi-file-document-outline ",-1)])]),_:1}),r[15]||(r[15]=b("h2",{class:"text-h5 font-weight-bold mb-0"},"Specifications",-1))]),r[16]||(r[16]=b("p",{class:"text-body-2 text-medium-emphasis mb-4"}," OpenAPI, Arazzo workflows, agent cards, Gherkin features, and domain models. ",-1)),b("div",rI,[S(vt,{size:"small",color:"primary",variant:"tonal"},{default:D(()=>[K(V(i.value)+" entries ",1)]),_:1})])]),_:1})]),_:1})]),_:1})]))}}),cI=ee({fullscreen:Boolean,scrollable:Boolean,...ss(Wr({captureFocus:!0,origin:"center center",scrollStrategy:"block",transition:{component:eg},zIndex:2400,retainFocus:!0}),["disableInitialFocus"])},"VDialog"),uI=ke()({name:"VDialog",props:cI(),emits:{"update:modelValue":e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,t){let{emit:n,slots:s}=t;const a=Kt(e,"modelValue"),{scopeId:i}=ho(),o=Pe();function r(){var u;n("afterEnter"),(e.scrim||e.retainFocus)&&((u=o.value)!=null&&u.contentEl)&&!o.value.contentEl.contains(document.activeElement)&&o.value.contentEl.focus({preventScroll:!0})}function l(){n("afterLeave")}return Oe(a,async u=>{var d;u||(await It(),(d=o.value.activatorEl)==null||d.focus({preventScroll:!0}))}),De(()=>{const u=Ua.filterProps(e),d=$e({"aria-haspopup":"dialog"},e.activatorProps),h=$e({tabindex:-1},e.contentProps);return S(Ua,$e({ref:o,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable},e.class],style:e.style},u,{modelValue:a.value,"onUpdate:modelValue":f=>a.value=f,"aria-modal":"true",activatorProps:d,contentProps:h,height:e.fullscreen?void 0:e.height,width:e.fullscreen?void 0:e.width,maxHeight:e.fullscreen?void 0:e.maxHeight,maxWidth:e.fullscreen?void 0:e.maxWidth,role:"dialog",onAfterEnter:r,onAfterLeave:l},i),{activator:s.activator,default:function(){for(var f=arguments.length,p=new Array(f),g=0;g<f;g++)p[g]=arguments[g];return S(gt,{root:"VDialog"},{default:()=>{var m;return[(m=s.default)==null?void 0:m.call(s,...p)]}})}})}),Hr({},o)}}),dI={class:"double-diamond-wrapper"},hI={viewBox:"0 0 1600 280",width:"100%",preserveAspectRatio:"xMidYMid meet",class:"diamond-svg"},fI={key:0,x:"1390",y:"137","text-anchor":"middle","font-size":"11",fill:"#d1d5db","font-family":"system-ui","font-style":"italic"},pI=["cx","fill","onClick"],mI=["x","y"],gI=["x","dy"],vI=["x"],yI=["cx","fill","onClick"],bI=["x","y"],wI=["x","dy"],kI=["x"],SI={key:0,class:"mb-4"},xI={key:1,class:"why-callout mb-4"},_I={class:"why-callout-text"},AI={key:2,class:"d-flex flex-wrap ga-2 align-center"},CI=Ct({__name:"DoubleDiamondView",setup(e){const t=Pe(null),n=Pe(!1),s=N(()=>[...Ni].filter(m=>m.phase&&!m.hiddenFromDiamond).sort((m,v)=>m.date.localeCompare(v.date))),a=N(()=>s.value.filter(m=>m.phase==="discover"||m.phase==="define")),i=N(()=>s.value.filter(m=>m.phase==="develop"||m.phase==="deliver"));function o(m,v,y){if(m.length===0)return[];if(m.length===1)return[{item:m[0],x:(v+y)/2,color:r(m[0].status)}];const w=(y-v)/(m.length-1);return m.map((x,T)=>({item:x,x:v+T*w,color:r(x.status)}))}function r(m){switch(m){case"done":return"#22c55e";case"in-progress":return"#f59e0b";default:return"#9ca3af"}}function l(m){switch(m){case"done":return"success";case"in-progress":return"warning";default:return"info"}}const u=N(()=>o(a.value,50,1140)),d=N(()=>o(i.value,1200,1570));function h(m){t.value=m,n.value=!0}function f(m){return new Date(m).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function p(m,v=20){if(m.length<=v)return[m];const y=Math.floor(m.length/2);let w=-1;for(let _=0;_<y;_++){if(m[y+_]===" "||m[y+_]==="—"){w=y+_;break}if(m[y-_]===" "||m[y-_]==="—"){w=y-_;break}}if(w<=0)return[m.slice(0,v-1)+"…"];const x=m.slice(0,w).trim(),T=m.slice(w).replace(/^[— ]+/,"").trim(),C=_=>_.length>v+2?_.slice(0,v+1)+"…":_;return[C(x),C(T)]}const g=N(()=>new Map(fo.map(m=>[m.slug,m])));return(m,v)=>(B(),H("div",dI,[v[7]||(v[7]=$o('<div class="phase-labels" data-v-f6d256dc><span class="phase-label" style="flex:3;" data-v-f6d256dc>Discover</span><span class="phase-label" style="flex:3;" data-v-f6d256dc>Define</span><span class="phase-label phase-label--dim" style="flex:1;" data-v-f6d256dc>Develop</span><span class="phase-label phase-label--dim" style="flex:1;" data-v-f6d256dc>Deliver</span></div>',1)),(B(),H("svg",hI,[v[3]||(v[3]=$o('<polygon points="20,140 600,30 600,250" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="8,5" data-v-f6d256dc></polygon><polygon points="600,30 1180,140 600,250" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="8,5" data-v-f6d256dc></polygon><line x1="600" y1="30" x2="600" y2="250" stroke="#86efac" stroke-width="1.5" stroke-dasharray="6,4" data-v-f6d256dc></line><line x1="20" y1="140" x2="1180" y2="140" stroke="#bbf7d0" stroke-width="1.5" stroke-dasharray="4,4" data-v-f6d256dc></line><polygon points="1180,140 1390,75 1390,205" fill="#fafafa" stroke="#d1d5db" stroke-width="2" stroke-dasharray="6,4" data-v-f6d256dc></polygon><polygon points="1390,75 1580,140 1390,205" fill="#fafafa" stroke="#d1d5db" stroke-width="2" stroke-dasharray="6,4" data-v-f6d256dc></polygon><line x1="1390" y1="75" x2="1390" y2="205" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="6,4" data-v-f6d256dc></line><line x1="1180" y1="140" x2="1580" y2="140" stroke="#e5e7eb" stroke-width="1.5" stroke-dasharray="4,4" data-v-f6d256dc></line>',8)),i.value.length===0?(B(),H("text",fI,"yet to come")):Ee("",!0),(B(!0),H(ce,null,qe(u.value,y=>(B(),H("g",{key:y.item.date+y.item.title},[b("circle",{cx:y.x,cy:"140",r:"7",fill:y.color,style:{cursor:"pointer"},onClick:w=>h(y.item)},null,8,pI),b("text",{x:y.x,y:p(y.item.title).length>1?112:122,"text-anchor":"middle","font-size":"10",fill:"#374151","font-family":"system-ui"},[(B(!0),H(ce,null,qe(p(y.item.title),(w,x)=>(B(),H("tspan",{key:x,x:y.x,dy:x===0?0:13},V(w),9,gI))),128))],8,mI),b("text",{x:y.x,y:"160","text-anchor":"middle","font-size":"9",fill:"#9ca3af","font-family":"system-ui"},V(f(y.item.date).replace(/,?\s*\d{4}/,"")),9,vI)]))),128)),(B(!0),H(ce,null,qe(d.value,y=>(B(),H("g",{key:y.item.date+y.item.title},[b("circle",{cx:y.x,cy:"140",r:"7",fill:y.color,style:{cursor:"pointer"},onClick:w=>h(y.item)},null,8,yI),b("text",{x:y.x,y:p(y.item.title).length>1?112:122,"text-anchor":"middle","font-size":"10",fill:"#374151","font-family":"system-ui"},[(B(!0),H(ce,null,qe(p(y.item.title),(w,x)=>(B(),H("tspan",{key:x,x:y.x,dy:x===0?0:13},V(w),9,wI))),128))],8,bI),b("text",{x:y.x,y:"160","text-anchor":"middle","font-size":"9",fill:"#9ca3af","font-family":"system-ui"},V(f(y.item.date).replace(/,?\s*\d{4}/,"")),9,kI)]))),128))])),v[8]||(v[8]=$o('<div class="diamond-legend" data-v-f6d256dc><span class="legend-item" data-v-f6d256dc><span class="legend-dot" style="background:#22c55e;" data-v-f6d256dc></span> Done </span><span class="legend-item" data-v-f6d256dc><span class="legend-dot" style="background:#f59e0b;" data-v-f6d256dc></span> In progress </span><span class="legend-item" data-v-f6d256dc><span class="legend-dot" style="background:#9ca3af;" data-v-f6d256dc></span> Planned </span><span class="legend-hint" data-v-f6d256dc>Click any event to learn more</span></div>',1)),S(uI,{modelValue:n.value,"onUpdate:modelValue":v[2]||(v[2]=y=>n.value=y),"max-width":"480"},{default:D(()=>[t.value?(B(),Ge(ln,{key:0},{default:D(()=>[S(Yg,{class:"d-flex align-center ga-3 flex-wrap"},{default:D(()=>[b("span",null,V(t.value.title),1),S(vt,{size:"small",color:l(t.value.status),variant:"tonal"},{default:D(()=>[K(V(t.value.status==="in-progress"?"In progress":t.value.status==="done"?"Done":"Planned"),1)]),_:1},8,["color"])]),_:1}),S(Kg,null,{default:D(()=>[K(V(f(t.value.date)),1)]),_:1}),S(Xg,null,{default:D(()=>{var y;return[t.value.summary?(B(),H("p",SI,V(t.value.summary),1)):Ee("",!0),t.value.why?(B(),H("div",xI,[v[4]||(v[4]=b("div",{class:"why-callout-label"},"Why the AI-first approach worked",-1)),b("div",_I,V(t.value.why),1)])):Ee("",!0),(y=t.value.experiments)!=null&&y.length?(B(),H("div",AI,[v[5]||(v[5]=b("span",{class:"text-caption text-medium-emphasis"},"Related:",-1)),(B(!0),H(ce,null,qe(t.value.experiments,w=>(B(),Ge(vt,{key:w,to:`/experiments/${w}`,size:"small",variant:"tonal",color:"secondary",onClick:v[0]||(v[0]=x=>n.value=!1)},{default:D(()=>{var x;return[K(V(((x=g.value.get(w))==null?void 0:x.title)??w),1)]}),_:2},1032,["to"]))),128))])):Ee("",!0)]}),_:1}),S(Gg,null,{default:D(()=>[S(Ji),S(ht,{variant:"text",onClick:v[1]||(v[1]=y=>n.value=!1)},{default:D(()=>[...v[6]||(v[6]=[K("Close",-1)])]),_:1})]),_:1})]),_:1})):Ee("",!0)]),_:1},8,["modelValue"])]))}}),TI=Ws(CI,[["__scopeId","data-v-f6d256dc"]]),to=Symbol.for("vuetify:v-expansion-panel"),ty=ee({...He(),...ku()},"VExpansionPanelText"),Ac=ke()({name:"VExpansionPanelText",props:ty(),setup(e,t){let{slots:n}=t;const s=Xe(to);if(!s)throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");const{hasContent:a,onAfterLeave:i}=Su(e,s.isSelected);return De(()=>S(uu,{onAfterLeave:i},{default:()=>{var o;return[pn(b("div",{class:fe(["v-expansion-panel-text",e.class]),style:Be(e.style)},[n.default&&a.value&&b("div",{class:"v-expansion-panel-text__wrapper"},[(o=n.default)==null?void 0:o.call(n)])]),[[Xa,s.isSelected.value]])]}})),{}}}),ny=ee({color:String,expandIcon:{type:ot,default:"$expand"},collapseIcon:{type:ot,default:"$collapse"},hideActions:Boolean,focusable:Boolean,static:Boolean,ripple:{type:[Boolean,Object],default:!1},readonly:Boolean,...He(),...jn()},"VExpansionPanelTitle"),Cc=ke()({name:"VExpansionPanelTitle",directives:{vRipple:ys},props:ny(),setup(e,t){let{slots:n}=t;const s=Xe(to);if(!s)throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");const{backgroundColorClasses:a,backgroundColorStyles:i}=fn(()=>e.color),{dimensionStyles:o}=Vn(e),r=N(()=>({collapseIcon:e.collapseIcon,disabled:s.disabled.value,expanded:s.isSelected.value,expandIcon:e.expandIcon,readonly:e.readonly})),l=j(()=>s.isSelected.value?e.collapseIcon:e.expandIcon);return De(()=>{var u;return pn(b("button",{class:fe(["v-expansion-panel-title",{"v-expansion-panel-title--active":s.isSelected.value,"v-expansion-panel-title--focusable":e.focusable,"v-expansion-panel-title--static":e.static},a.value,e.class]),style:Be([i.value,o.value,e.style]),type:"button",tabindex:s.disabled.value?-1:void 0,disabled:s.disabled.value,"aria-expanded":s.isSelected.value,onClick:e.readonly?void 0:s.toggle},[b("span",{class:"v-expansion-panel-title__overlay"},null),(u=n.default)==null?void 0:u.call(n,r.value),!e.hideActions&&S(gt,{defaults:{VIcon:{icon:l.value}}},{default:()=>{var d;return[b("span",{class:"v-expansion-panel-title__icon"},[((d=n.actions)==null?void 0:d.call(n,r.value))??S(Ke,null,null)])]}})]),[[ys,e.ripple]])}),{}}}),sy=ee({title:String,text:String,bgColor:String,...Fn(),...jr(),...an(),...Je(),...ny(),...ty()},"VExpansionPanel"),II=ke()({name:"VExpansionPanel",props:sy(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:n}=t;const s=Ki(e,to),{backgroundColorClasses:a,backgroundColorStyles:i}=fn(()=>e.bgColor),{elevationClasses:o}=as(e),{roundedClasses:r}=vn(e),l=j(()=>(s==null?void 0:s.disabled.value)||e.disabled),u=N(()=>s.group.items.value.reduce((f,p,g)=>(s.group.selected.value.includes(p.id)&&f.push(g),f),[])),d=N(()=>{const f=s.group.items.value.findIndex(p=>p.id===s.id);return!s.isSelected.value&&u.value.some(p=>p-f===1)}),h=N(()=>{const f=s.group.items.value.findIndex(p=>p.id===s.id);return!s.isSelected.value&&u.value.some(p=>p-f===-1)});return Dt(to,s),De(()=>{const f=!!(n.text||e.text),p=!!(n.title||e.title),g=Cc.filterProps(e),m=Ac.filterProps(e);return S(e.tag,{class:fe(["v-expansion-panel",{"v-expansion-panel--active":s.isSelected.value,"v-expansion-panel--before-active":d.value,"v-expansion-panel--after-active":h.value,"v-expansion-panel--disabled":l.value},r.value,a.value,e.class]),style:Be([i.value,e.style])},{default:()=>[b("div",{class:fe(["v-expansion-panel__shadow",...o.value])},null),S(gt,{defaults:{VExpansionPanelTitle:{...g},VExpansionPanelText:{...m}}},{default:()=>{var v;return[p&&S(Cc,{key:"title"},{default:()=>[n.title?n.title():e.title]}),f&&S(Ac,{key:"text"},{default:()=>[n.text?n.text():e.text]}),(v=n.default)==null?void 0:v.call(n)]}})]})}),{groupItem:s}}}),EI=["default","accordion","inset","popout"],LI=ee({flat:Boolean,...$r(),...Pr(sy(),["bgColor","collapseIcon","color","eager","elevation","expandIcon","focusable","hideActions","readonly","ripple","rounded","tile","static"]),...Lt(),...He(),...Je(),variant:{type:String,default:"default",validator:e=>EI.includes(e)}},"VExpansionPanels"),OI=ke()({name:"VExpansionPanels",props:LI(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const{next:s,prev:a}=uo(e,to),{themeClasses:i}=Mt(e),o=j(()=>e.variant&&`v-expansion-panels--variant-${e.variant}`);return Ss({VExpansionPanel:{bgColor:j(()=>e.bgColor),collapseIcon:j(()=>e.collapseIcon),color:j(()=>e.color),eager:j(()=>e.eager),elevation:j(()=>e.elevation),expandIcon:j(()=>e.expandIcon),focusable:j(()=>e.focusable),hideActions:j(()=>e.hideActions),readonly:j(()=>e.readonly),ripple:j(()=>e.ripple),rounded:j(()=>e.rounded),static:j(()=>e.static)}}),De(()=>S(e.tag,{class:fe(["v-expansion-panels",{"v-expansion-panels--flat":e.flat,"v-expansion-panels--tile":e.tile},i.value,o.value,e.class]),style:Be(e.style)},{default:()=>{var r;return[(r=n.default)==null?void 0:r.call(n,{prev:a,next:s})]}})),{next:s,prev:a}}}),ju=Symbol.for("vuetify:v-tabs"),ay=ee({fixed:Boolean,sliderColor:String,sliderTransition:String,sliderTransitionDuration:[String,Number],hideSlider:Boolean,inset:Boolean,direction:{type:String,default:"horizontal"},...ss(vg({selectedClass:"v-tab--selected",variant:"text"}),["active","block","flat","location","position","symbol"])},"VTab"),Tc=ke()({name:"VTab",props:ay(),setup(e,t){let{slots:n,attrs:s}=t;const{textColorClasses:a,textColorStyles:i}=Rs(()=>e.sliderColor),{backgroundColorClasses:o,backgroundColorStyles:r}=fn(()=>e.sliderColor),l=Pe(),u=Pe(),d=N(()=>e.direction==="horizontal"),h=N(()=>{var v,y;return((y=(v=l.value)==null?void 0:v.group)==null?void 0:y.isSelected.value)??!1});function f(v,y){return{opacity:[0,1]}}function p(v,y){return e.direction==="vertical"?{transform:["scaleY(0)","scaleY(1)"]}:{transform:["scaleX(0)","scaleX(1)"]}}function g(v,y){const w=y.getBoundingClientRect(),x=v.getBoundingClientRect(),T=d.value?"x":"y",C=d.value?"X":"Y",_=d.value?"right":"bottom",I=d.value?"width":"height",k=w[T],O=x[T],$=k>O?w[_]-x[_]:w[T]-x[T],q=Math.sign($)>0?d.value?"right":"bottom":Math.sign($)<0?d.value?"left":"top":"center",z=(Math.abs($)+(Math.sign($)<0?w[I]:x[I]))/Math.max(w[I],x[I])||0,se=w[I]/x[I]||0,re=1.5;return{transform:[`translate${C}(${$}px) scale${C}(${se})`,`translate${C}(${$/re}px) scale${C}(${(z-1)/re+1})`,"none"],transformOrigin:Array(3).fill(q)}}function m(v){var w,x;let{value:y}=v;if(y){const T=(x=(w=l.value)==null?void 0:w.$el.parentElement)==null?void 0:x.querySelector(".v-tab--selected .v-tab__slider"),C=u.value;if(!T||!C)return;const _=getComputedStyle(T).backgroundColor,I={fade:f,grow:p,shift:g}[e.sliderTransition??"shift"]??g,k=Number(e.sliderTransitionDuration)||({fade:400,grow:350,shift:225}[e.sliderTransition??"shift"]??225);Ns(C,{backgroundColor:[_,_],...I(C,T)},{duration:k,easing:ir})}}return De(()=>{const v=ht.filterProps(e);return S(ht,$e({symbol:ju,ref:l,class:["v-tab",e.class,h.value&&e.inset?o.value:[]],style:[e.style,h.value&&e.inset?r.value:[],{backgroundColor:h.value&&e.inset?"transparent !important":void 0}],tabindex:h.value?0:-1,role:"tab","aria-selected":String(h.value),active:!1},v,s,{block:e.fixed,maxWidth:e.fixed?300:void 0,"onGroup:selected":m}),{...n,default:()=>{var y;return b(ce,null,[((y=n.default)==null?void 0:y.call(n))??e.text,!e.hideSlider&&b("div",{ref:u,class:fe(["v-tab__slider",e.inset?o.value:a.value]),style:Be([i.value,e.inset?r.value:a.value])},null)])}})}),Hr({},l)}}),NI=e=>{const{touchstartX:t,touchendX:n,touchstartY:s,touchendY:a}=e,i=.5,o=16;e.offsetX=n-t,e.offsetY=a-s,Math.abs(e.offsetY)<i*Math.abs(e.offsetX)&&(e.left&&n<t-o&&e.left(e),e.right&&n>t+o&&e.right(e)),Math.abs(e.offsetX)<i*Math.abs(e.offsetY)&&(e.up&&a<s-o&&e.up(e),e.down&&a>s+o&&e.down(e))};function PI(e,t){var s;const n=e.changedTouches[0];t.touchstartX=n.clientX,t.touchstartY=n.clientY,(s=t.start)==null||s.call(t,{originalEvent:e,...t})}function BI(e,t){var s;const n=e.changedTouches[0];t.touchendX=n.clientX,t.touchendY=n.clientY,(s=t.end)==null||s.call(t,{originalEvent:e,...t}),NI(t)}function DI(e,t){var s;const n=e.changedTouches[0];t.touchmoveX=n.clientX,t.touchmoveY=n.clientY,(s=t.move)==null||s.call(t,{originalEvent:e,...t})}function RI(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const t={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:n=>PI(n,t),touchend:n=>BI(n,t),touchmove:n=>DI(n,t)}}function MI(e,t){var r;const n=t.value,s=n!=null&&n.parent?e.parentElement:e,a=(n==null?void 0:n.options)??{passive:!0},i=(r=t.instance)==null?void 0:r.$.uid;if(!s||i===void 0)return;const o=RI(t.value);s._touchHandlers=s._touchHandlers??Object.create(null),s._touchHandlers[i]=o,Am(o).forEach(l=>{s.addEventListener(l,o[l],a)})}function $I(e,t){var i,o;const n=(i=t.value)!=null&&i.parent?e.parentElement:e,s=(o=t.instance)==null?void 0:o.$.uid;if(!(n!=null&&n._touchHandlers)||s===void 0)return;const a=n._touchHandlers[s];Am(a).forEach(r=>{n.removeEventListener(r,a[r])}),delete n._touchHandlers[s]}const Ic={mounted:MI,unmounted:$I},iy=Symbol.for("vuetify:v-window"),oy=Symbol.for("vuetify:v-window-group"),ry=ee({continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},verticalArrows:[Boolean,String],touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{type:[Boolean,String],default:"force"},crossfade:Boolean,transitionDuration:Number,...He(),...Je(),...Lt()},"VWindow"),Ef=ke()({name:"VWindow",directives:{vTouch:Ic},props:ry(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const{themeClasses:s}=Mt(e),{isRtl:a}=$n(),{t:i}=iu(),o=uo(e,oy),r=Pe(),l=N(()=>a.value?!e.reverse:e.reverse),u=be(!1),d=N(()=>{if(e.crossfade)return"v-window-crossfade-transition";const _=e.direction==="vertical"?"y":"x",k=(l.value?!u.value:u.value)?"-reverse":"";return`v-window-${_}${k}-transition`}),h=be(0),f=Pe(void 0),p=N(()=>o.items.value.findIndex(_=>o.selected.value.includes(_.id)));Oe(p,(_,I)=>{let k;const O={left:0,top:0};rt&&I>=0&&(k=$m(r.value),O.left=k==null?void 0:k.scrollLeft,O.top=k==null?void 0:k.scrollTop);const $=o.items.value.length,q=$-1;$<=2?u.value=_<I:_===q&&I===0?u.value=!1:_===0&&I===q?u.value=!0:u.value=_<I,It(()=>{if(!rt||!k)return;k.scrollTop!==O.top&&k.scrollTo({...O,behavior:"instant"}),requestAnimationFrame(()=>{if(!k)return;k.scrollTop!==O.top&&k.scrollTo({...O,behavior:"instant"})})})},{flush:"sync"}),Dt(iy,{transition:d,isReversed:u,transitionCount:h,transitionHeight:f,rootRef:r});const g=j(()=>e.continuous||p.value!==0),m=j(()=>e.continuous||p.value!==o.items.value.length-1);function v(){g.value&&o.prev()}function y(){m.value&&o.next()}const w=N(()=>{const _=[],I={icon:a.value?e.nextIcon:e.prevIcon,class:`v-window__${l.value?"right":"left"}`,onClick:o.prev,"aria-label":i("$vuetify.carousel.prev")};_.push(g.value?n.prev?n.prev({props:I}):S(ht,I,null):b("div",null,null));const k={icon:a.value?e.prevIcon:e.nextIcon,class:`v-window__${l.value?"left":"right"}`,onClick:o.next,"aria-label":i("$vuetify.carousel.next")};return _.push(m.value?n.next?n.next({props:k}):S(ht,k,null):b("div",null,null)),_}),x=N(()=>e.touch===!1?e.touch:{...{left:()=>{l.value?v():y()},right:()=>{l.value?y():v()},start:I=>{let{originalEvent:k}=I;k.stopPropagation()}},...e.touch===!0?{}:e.touch});function T(_){(e.direction==="horizontal"&&_.key==="ArrowLeft"||e.direction==="vertical"&&_.key==="ArrowUp")&&(_.preventDefault(),v(),It(()=>{g.value?C(0):C(1)})),(e.direction==="horizontal"&&_.key==="ArrowRight"||e.direction==="vertical"&&_.key==="ArrowDown")&&(_.preventDefault(),y(),It(()=>{m.value?C(1):C(0)}))}function C(_){var O;const I=w.value[_];if(!I)return;(O=(Array.isArray(I)?I[0]:I).el)==null||O.focus()}return De(()=>pn(S(e.tag,{ref:r,class:fe(["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover","v-window--vertical-arrows":!!e.verticalArrows,"v-window--crossfade":!!e.crossfade},s.value,e.class]),style:Be([e.style,{"--v-window-transition-duration":Fa()?null:pe(e.transitionDuration,"ms")}])},{default:()=>{var _,I;return[b("div",{class:"v-window__container",style:{height:f.value}},[(_=n.default)==null?void 0:_.call(n,{group:o}),e.showArrows!==!1&&b("div",{class:fe(["v-window__controls",{"v-window__controls--left":e.verticalArrows==="left"||e.verticalArrows===!0},{"v-window__controls--right":e.verticalArrows==="right"}]),onKeydown:T},[w.value])]),(I=n.additional)==null?void 0:I.call(n,{group:o})]}}),[[Ic,x.value]])),{group:o}}}),jI=ee({...ss(ry(),["continuous","nextIcon","prevIcon","showArrows","touch","mandatory"])},"VTabsWindow"),ly=ke()({name:"VTabsWindow",props:jI(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:n}=t;const s=Xe(ju,null),a=Kt(e,"modelValue"),i=N({get(){var o;return a.value!=null||!s?a.value:(o=s.items.value.find(r=>s.selected.value.includes(r.id)))==null?void 0:o.value},set(o){a.value=o}});return De(()=>{const o=Ef.filterProps(e);return S(Ef,$e({_as:"VTabsWindow"},o,{modelValue:i.value,"onUpdate:modelValue":r=>i.value=r,class:["v-tabs-window",e.class],style:e.style,mandatory:!1,touch:!1}),n)}),{}}}),cy=ee({reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...He(),...jr(),...ku()},"VWindowItem"),Lf=ke()({name:"VWindowItem",directives:{vTouch:Ic},props:cy(),emits:{"group:selected":e=>!0},setup(e,t){let{slots:n}=t;const s=Xe(iy),a=Ki(e,oy),{isBooted:i}=Mr();if(!s||!a)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const o=be(!1),r=N(()=>i.value&&(s.isReversed.value?e.reverseTransition!==!1:e.transition!==!1));function l(){!o.value||!s||(o.value=!1,s.transitionCount.value>0&&(s.transitionCount.value-=1,s.transitionCount.value===0&&(s.transitionHeight.value=void 0)))}function u(){var g;o.value||!s||(o.value=!0,s.transitionCount.value===0&&(s.transitionHeight.value=pe((g=s.rootRef.value)==null?void 0:g.clientHeight)),s.transitionCount.value+=1)}function d(){l()}function h(g){o.value&&It(()=>{!r.value||!o.value||!s||(s.transitionHeight.value=pe(g.clientHeight))})}const f=N(()=>{const g=s.isReversed.value?e.reverseTransition:e.transition;return r.value?{name:typeof g!="string"?s.transition.value:g,onBeforeEnter:u,onAfterEnter:l,onEnterCancelled:d,onBeforeLeave:u,onAfterLeave:l,onLeaveCancelled:d,onEnter:h}:!1}),{hasContent:p}=Su(e,a.isSelected);return De(()=>S(ta,{transition:f.value,disabled:!i.value},{default:()=>{var g;return[pn(b("div",{class:fe(["v-window-item",a.selectedClass.value,e.class]),style:Be(e.style)},[p.value&&((g=n.default)==null?void 0:g.call(n))]),[[Xa,a.isSelected.value]])]}})),{groupItem:a}}}),VI=ee({...cy()},"VTabsWindowItem"),Ec=ke()({name:"VTabsWindowItem",props:VI(),setup(e,t){let{slots:n}=t;return De(()=>{const s=Lf.filterProps(e);return S(Lf,$e({_as:"VTabsWindowItem"},s,{class:["v-tabs-window-item",e.class],style:e.style}),n)}),{}}});function FI(e){return e?e.map(t=>nr(t)?t:{text:t,value:t}):[]}const WI=ee({alignTabs:{type:String,default:"start"},color:String,fixedTabs:Boolean,items:{type:Array,default:()=>[]},stacked:Boolean,bgColor:String,grow:Boolean,height:{type:[Number,String],default:void 0},hideSlider:Boolean,inset:Boolean,insetPadding:[String,Number],insetRadius:[String,Number],sliderColor:String,...Pr(ay(),["spaced","sliderTransition","sliderTransitionDuration"]),...xu({mandatory:"force",selectedClass:"v-tab-item--selected"}),...En(),...Je()},"VTabs"),HI=ke()({name:"VTabs",props:WI(),emits:{"update:modelValue":e=>!0},setup(e,t){let{attrs:n,slots:s}=t;const a=Kt(e,"modelValue"),i=N(()=>FI(e.items)),{densityClasses:o}=Wn(e),{backgroundColorClasses:r,backgroundColorStyles:l}=fn(()=>e.bgColor),{scopeId:u}=ho();return Ss({VTab:{color:j(e,"color"),direction:j(e,"direction"),stacked:j(e,"stacked"),fixed:j(e,"fixedTabs"),inset:j(e,"inset"),sliderColor:j(e,"sliderColor"),sliderTransition:j(e,"sliderTransition"),sliderTransitionDuration:j(e,"sliderTransitionDuration"),hideSlider:j(e,"hideSlider")}}),De(()=>{const d=mr.filterProps(e),h=!!(s.window||e.items.length>0);return b(ce,null,[S(mr,$e(d,{modelValue:a.value,"onUpdate:modelValue":f=>a.value=f,class:["v-tabs",`v-tabs--${e.direction}`,`v-tabs--align-tabs-${e.alignTabs}`,{"v-tabs--fixed-tabs":e.fixedTabs,"v-tabs--grow":e.grow,"v-tabs--inset":e.inset,"v-tabs--stacked":e.stacked},o.value,r.value,e.class],style:[{"--v-tabs-height":pe(e.height),"--v-tabs-inset-padding":e.inset?pe(e.insetPadding):void 0,"--v-tabs-inset-radius":e.inset?pe(e.insetRadius):void 0},l.value,e.style],role:"tablist",symbol:ju},u,n),{default:s.default??(()=>i.value.map(f=>{var p;return((p=s.tab)==null?void 0:p.call(s,{item:f}))??S(Tc,$e(f,{key:f.text,value:f.value,spaced:e.spaced}),{default:s[`tab.${f.value}`]?()=>{var g;return(g=s[`tab.${f.value}`])==null?void 0:g.call(s,{item:f})}:void 0})})),prev:s.prev,next:s.next}),h&&S(ly,$e({modelValue:a.value,"onUpdate:modelValue":f=>a.value=f,key:"tabs-window"},u),{default:()=>{var f;return[i.value.map(p=>{var g;return((g=s.item)==null?void 0:g.call(s,{item:p}))??S(Ec,{value:p.value},{default:()=>{var m;return(m=s[`item.${p.value}`])==null?void 0:m.call(s,{item:p})}})}),(f=s.window)==null?void 0:f.call(s)]}})])}),{}}}),qI=ee({dotColor:String,fillDot:Boolean,hideDot:Boolean,icon:ot,iconColor:String,lineColor:String,...He(),...an(),...ma(),...Fn()},"VTimelineDivider"),zI=ke()({name:"VTimelineDivider",props:qI(),setup(e,t){let{slots:n}=t;const{sizeClasses:s,sizeStyles:a}=ti(e,"v-timeline-divider__dot"),{backgroundColorStyles:i,backgroundColorClasses:o}=fn(()=>e.dotColor),{roundedClasses:r}=vn(e,"v-timeline-divider__dot"),{elevationClasses:l}=as(e),{backgroundColorClasses:u,backgroundColorStyles:d}=fn(()=>e.lineColor);return De(()=>b("div",{class:fe(["v-timeline-divider",{"v-timeline-divider--fill-dot":e.fillDot},e.class]),style:Be(e.style)},[b("div",{class:fe(["v-timeline-divider__before",u.value]),style:Be(d.value)},null),!e.hideDot&&b("div",{key:"dot",class:fe(["v-timeline-divider__dot",l.value,r.value,s.value]),style:Be(a.value)},[b("div",{class:fe(["v-timeline-divider__inner-dot",o.value,r.value]),style:Be(i.value)},[n.default?S(gt,{key:"icon-defaults",disabled:!e.icon,defaults:{VIcon:{color:e.iconColor,icon:e.icon,size:e.size}}},n.default):S(Ke,{key:"icon",color:e.iconColor,icon:e.icon,size:e.size},null)])]),b("div",{class:fe(["v-timeline-divider__after",u.value]),style:Be(d.value)},null)])),{}}}),uy=ee({density:String,dotColor:String,fillDot:Boolean,hideDot:Boolean,hideOpposite:{type:Boolean,default:void 0},icon:ot,iconColor:String,lineInset:[Number,String],side:{type:String,validator:e=>e==null||["start","end"].includes(e)},...He(),...jn(),...Fn(),...an(),...ma(),...Je()},"VTimelineItem"),UI=ke()({name:"VTimelineItem",props:uy(),setup(e,t){let{slots:n}=t;const{dimensionStyles:s}=Vn(e),a=be(0),i=Pe();return Oe(i,o=>{var r;o&&(a.value=((r=o.$el.querySelector(".v-timeline-divider__dot"))==null?void 0:r.getBoundingClientRect().width)??0)},{flush:"post"}),De(()=>{var o,r;return b("div",{class:fe(["v-timeline-item",{"v-timeline-item--fill-dot":e.fillDot,"v-timeline-item--side-start":e.side==="start","v-timeline-item--side-end":e.side==="end"},e.class]),style:Be([{"--v-timeline-dot-size":pe(a.value),"--v-timeline-line-inset":e.lineInset?`calc(var(--v-timeline-dot-size) / 2 + ${pe(e.lineInset)})`:pe(0)},e.style])},[b("div",{class:"v-timeline-item__body",style:Be(s.value)},[(o=n.default)==null?void 0:o.call(n)]),S(zI,{ref:i,hideDot:e.hideDot,icon:e.icon,iconColor:e.iconColor,size:e.size,elevation:e.elevation,dotColor:e.dotColor,fillDot:e.fillDot,rounded:e.rounded},{default:n.icon}),e.density!=="compact"&&b("div",{class:"v-timeline-item__opposite"},[!e.hideOpposite&&((r=n.opposite)==null?void 0:r.call(n))])])}),{}}}),GI=ee({align:{type:String,default:"center",validator:e=>["center","start"].includes(e)},direction:{type:String,default:"vertical",validator:e=>["vertical","horizontal"].includes(e)},justify:{type:String,default:"auto",validator:e=>["auto","center"].includes(e)},side:{type:String,validator:e=>e==null||["start","end"].includes(e)},lineThickness:{type:[String,Number],default:2},lineColor:String,truncateLine:{type:String,validator:e=>["start","end","both"].includes(e)},...Pr(uy({lineInset:0}),["dotColor","fillDot","hideOpposite","iconColor","lineInset","size"]),...He(),...En(),...Je(),...Lt()},"VTimeline"),KI=ke()({name:"VTimeline",props:GI(),setup(e,t){let{slots:n}=t;const{themeClasses:s}=Mt(e),{densityClasses:a}=Wn(e),{rtlClasses:i}=$n();Ss({VTimelineDivider:{lineColor:j(()=>e.lineColor)},VTimelineItem:{density:j(()=>e.density),dotColor:j(()=>e.dotColor),fillDot:j(()=>e.fillDot),hideOpposite:j(()=>e.hideOpposite),iconColor:j(()=>e.iconColor),lineColor:j(()=>e.lineColor),lineInset:j(()=>e.lineInset),size:j(()=>e.size)}});const o=N(()=>{const l=e.side?e.side:e.density!=="default"?"end":null;return l&&`v-timeline--side-${l}`}),r=N(()=>{const l=["v-timeline--truncate-line-start","v-timeline--truncate-line-end"];switch(e.truncateLine){case"both":return l;case"start":return l[0];case"end":return l[1];default:return null}});return De(()=>S(e.tag,{class:fe(["v-timeline",`v-timeline--${e.direction}`,`v-timeline--align-${e.align}`,`v-timeline--justify-${e.justify}`,r.value,{"v-timeline--inset-line":!!e.lineInset},s.value,a.value,o.value,i.value,e.class]),style:Be([{"--v-timeline-line-thickness":pe(e.lineThickness)},e.style])},n)),{}}}),YI={class:"text-caption text-medium-emphasis"},XI={class:"d-flex align-start justify-space-between flex-wrap ga-2"},JI={class:"text-caption text-medium-emphasis d-md-none mb-1"},QI={class:"text-h6 font-weight-bold mb-1"},ZI={key:0,class:"text-body-2 mb-2"},e2={key:0,class:"text-body-2 text-medium-emphasis mt-2 mb-2"},t2={key:1,class:"mt-3 d-flex flex-wrap ga-2 align-center"},n2={class:"text-caption text-medium-emphasis"},s2={key:2,class:"mt-3 d-flex flex-wrap ga-2 align-center"},a2={class:"text-caption text-medium-emphasis"},i2=Ct({__name:"FeaturesPage",setup(e){const t=Pe("diamond"),n=N(()=>[...Ni].sort((o,r)=>o.date.localeCompare(r.date))),s={done:{color:"success",icon:"mdi-check-circle",label:"Done"},"in-progress":{color:"warning",icon:"mdi-progress-clock",label:"In progress"},planned:{color:"info",icon:"mdi-calendar-clock",label:"Planned"}};function a(o){return new Date(o).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}const i=N(()=>new Map(fo.map(o=>[o.slug,o])));return(o,r)=>(B(),H("div",null,[r[14]||(r[14]=b("div",{class:"mb-6"},[b("h1",{class:"text-h4 font-weight-bold mb-2"}," 🚀 Feature Development "),b("p",{class:"text-body-1 text-medium-emphasis"}," Where we've been, where we are, and where we're going. ")],-1)),S(HI,{modelValue:t.value,"onUpdate:modelValue":r[0]||(r[0]=l=>t.value=l),color:"success",class:"mb-4"},{default:D(()=>[S(Tc,{value:"diamond"},{default:D(()=>[...r[2]||(r[2]=[K("◇ Double Diamond",-1)])]),_:1}),S(Tc,{value:"timeline"},{default:D(()=>[...r[3]||(r[3]=[K("≡ Timeline",-1)])]),_:1})]),_:1},8,["modelValue"]),S(ly,{modelValue:t.value,"onUpdate:modelValue":r[1]||(r[1]=l=>t.value=l)},{default:D(()=>[S(Ec,{value:"diamond"},{default:D(()=>[S(TI)]),_:1}),S(Ec,{value:"timeline"},{default:D(()=>[S(fr,{class:"mb-4",dense:""},{default:D(()=>[S(Nn,{cols:"auto"},{default:D(()=>[S(vt,{"prepend-icon":"mdi-check-circle",color:"success",variant:"tonal"},{default:D(()=>[...r[4]||(r[4]=[K(" Done ",-1)])]),_:1})]),_:1}),S(Nn,{cols:"auto"},{default:D(()=>[S(vt,{"prepend-icon":"mdi-progress-clock",color:"warning",variant:"tonal"},{default:D(()=>[...r[5]||(r[5]=[K(" In progress ",-1)])]),_:1})]),_:1}),S(Nn,{cols:"auto"},{default:D(()=>[S(vt,{"prepend-icon":"mdi-calendar-clock",color:"info",variant:"tonal"},{default:D(()=>[...r[6]||(r[6]=[K(" Planned ",-1)])]),_:1})]),_:1})]),_:1}),S(fr,{class:"mb-2","no-gutters":""},{default:D(()=>[S(Nn,{cols:"6",class:"text-center"},{default:D(()=>[...r[7]||(r[7]=[b("h2",{class:"text-overline text-medium-emphasis"},"External",-1)])]),_:1}),S(Nn,{cols:"6",class:"text-center"},{default:D(()=>[...r[8]||(r[8]=[b("h2",{class:"text-overline text-medium-emphasis"},"Internal",-1)])]),_:1})]),_:1}),S(KI,{align:"center","line-thickness":"2"},{default:D(()=>[(B(!0),H(ce,null,qe(n.value,l=>(B(),Ge(UI,{key:l.date+l.title,side:l.customerFacing||l.knowledgeTransfer?"start":"end","dot-color":s[l.status].color,icon:s[l.status].icon,size:"small","fill-dot":""},{opposite:D(()=>[b("div",YI,V(a(l.date)),1)]),default:D(()=>[S(ln,{variant:"flat",class:fe(["pa-4",l.status==="in-progress"?"bg-orange-lighten-4":"border"])},{default:D(()=>{var u,d,h;return[b("div",XI,[b("div",null,[b("div",JI,V(a(l.date)),1),b("h2",QI,V(l.title),1),l.summary?(B(),H("p",ZI,V(l.summary),1)):Ee("",!0)])]),l.body?(B(),H("p",e2,V(l.body),1)):Ee("",!0),(u=l.experiments)!=null&&u.length?(B(),H("div",t2,[b("span",n2,[S(Ke,{size:"x-small"},{default:D(()=>[...r[9]||(r[9]=[K("mdi-flask-outline",-1)])]),_:1}),r[10]||(r[10]=K(" Related learnings: ",-1))]),(B(!0),H(ce,null,qe(l.experiments,f=>(B(),Ge(ht,{key:f,to:`/experiments/${f}`,variant:"tonal",size:"x-small",color:"secondary","append-icon":"mdi-arrow-right"},{default:D(()=>{var p;return[K(V(((p=i.value.get(f))==null?void 0:p.title)??f),1)]}),_:2},1032,["to"]))),128))])):Ee("",!0),(d=l.topicsTaught)!=null&&d.length?(B(),H("div",s2,[b("span",a2,[S(Ke,{size:"x-small"},{default:D(()=>[...r[11]||(r[11]=[K("mdi-school-outline",-1)])]),_:1}),r[12]||(r[12]=K(" Topics taught: ",-1))]),(B(!0),H(ce,null,qe(l.topicsTaught,f=>(B(),Ge(ht,{key:f,to:`/experiments/${f}`,variant:"tonal",size:"x-small",color:"secondary","append-icon":"mdi-arrow-right"},{default:D(()=>{var p;return[K(V(((p=i.value.get(f))==null?void 0:p.title)??f),1)]}),_:2},1032,["to"]))),128))])):Ee("",!0),(h=l.links)!=null&&h.length?(B(),Ge(OI,{key:3,variant:"accordion",class:"mt-3",flat:""},{default:D(()=>[S(II,null,{default:D(()=>[S(Cc,{class:"text-caption pa-2","min-height":"32"},{default:D(()=>[S(Ke,{size:"x-small",class:"mr-2"},{default:D(()=>[...r[13]||(r[13]=[K("mdi-link-variant",-1)])]),_:1}),K(" Research outputs ("+V(l.links.length)+") ",1)]),_:2},1024),S(Ac,null,{default:D(()=>[S(bs,{density:"compact",class:"pa-0"},{default:D(()=>[(B(!0),H(ce,null,qe(l.links,(f,p)=>(B(),Ge(_n,{key:p,href:f.url,target:"_blank",rel:"noopener","prepend-icon":"mdi-open-in-new"},{default:D(()=>[S(Mg,{class:"text-body-2"},{default:D(()=>[K(V(f.label),1)]),_:2},1024),f.note?(B(),Ge(Rg,{key:0},{default:D(()=>[K(V(f.note),1)]),_:2},1024)):Ee("",!0)]),_:2},1032,["href"]))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)):Ee("",!0)]}),_:2},1032,["class"])]),_:2},1032,["side","dot-color","icon"]))),128))]),_:1})]),_:1})]),_:1},8,["modelValue"])]))}}),o2={class:"text-overline text-medium-emphasis mb-2 d-flex align-center ga-2"},r2={class:"text-caption"},l2={class:"d-flex align-center ga-3"},c2={class:"text-caption text-medium-emphasis"},u2=Ct({__name:"ExperimentsPage",setup(e){const t={finished:"success",mixed:"warning",failed:"error",ongoing:"info"},n={finished:0,ongoing:1,mixed:2,failed:3},s={finished:"Finished",ongoing:"In progress",mixed:"Mixed results",failed:"Did not work"},a=N(()=>{const o=[...fo].sort((l,u)=>{const d=n[l.outcome??"ongoing"]??99,h=n[u.outcome??"ongoing"]??99;return d!==h?d-h:u.date.localeCompare(l.date)});return["finished","ongoing","mixed","failed"].map(l=>({outcome:l,label:s[l],items:o.filter(u=>(u.outcome??"ongoing")===l)})).filter(l=>l.items.length>0)});function i(o){return new Date(o).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}return(o,r)=>(B(),H("div",null,[r[0]||(r[0]=b("div",{class:"mb-6"},[b("h1",{class:"text-h4 font-weight-bold mb-2"},"🧪 Learnings / Experiments"),b("p",{class:"text-body-1 text-medium-emphasis"}," Hypotheses, spikes, and prompt experiments. Click any card to read the full write-up. ")],-1)),(B(!0),H(ce,null,qe(a.value,l=>(B(),H("div",{key:l.outcome,class:"mb-6"},[b("h2",o2,[K(V(l.label)+" ",1),b("span",r2,"("+V(l.items.length)+")",1)]),S(bs,{lines:"two",class:"bg-transparent pa-0"},{default:D(()=>[(B(!0),H(ce,null,qe(l.items,u=>(B(),Ge(_n,{key:u.slug,to:`/experiments/${u.slug}`,title:u.title,subtitle:u.summary,rounded:"lg",border:"",class:"mb-2"},{append:D(()=>[b("div",l2,[u.outcome?(B(),Ge(vt,{key:0,color:t[u.outcome],variant:"tonal",size:"x-small"},{default:D(()=>[K(V(u.outcome),1)]),_:2},1032,["color"])):Ee("",!0),b("span",c2,V(i(u.date)),1)])]),_:2},1032,["to","title","subtitle"]))),128))]),_:2},1024)]))),128))]))}}),d2=Br("v-alert-title"),h2=ee({iconSize:[Number,String],iconSizes:{type:Array,default:()=>[["x-small",10],["small",16],["default",24],["large",28],["x-large",32]]}},"iconSize");function f2(e,t){return{iconSize:N(()=>{const s=new Map(e.iconSizes),a=e.iconSize??t()??"default";return s.has(a)?s.get(a):a})}}const p2=["success","info","warning","error"],m2=ee({border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:ot,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>p2.includes(e)},...He(),...En(),...jn(),...Fn(),...h2(),...lo(),...fu(),...an(),...Je(),...Lt(),...xs({variant:"flat"})},"VAlert"),Ms=ke()({name:"VAlert",props:m2(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0},setup(e,t){let{emit:n,slots:s}=t;const a=Kt(e,"modelValue"),i=j(()=>{if(e.icon!==!1)return e.type?e.icon??`$${e.type}`:e.icon}),{iconSize:o}=f2(e,()=>e.prominent?44:void 0),{themeClasses:r}=Mt(e),{colorClasses:l,colorStyles:u,variantClasses:d}=ei(()=>({color:e.color??e.type,variant:e.variant})),{densityClasses:h}=Wn(e),{dimensionStyles:f}=Vn(e),{elevationClasses:p}=as(e),{locationStyles:g}=co(e),{positionClasses:m}=pu(e),{roundedClasses:v}=vn(e),{textColorClasses:y,textColorStyles:w}=Rs(()=>e.borderColor),{t:x}=iu(),T=j(()=>({"aria-label":x(e.closeLabel),onClick(C){a.value=!1,n("click:close",C)}}));return()=>{const C=!!(s.prepend||i.value),_=!!(s.title||e.title),I=!!(s.close||e.closable),k={density:e.density,icon:i.value,size:e.iconSize||e.prominent?o.value:void 0};return a.value&&S(e.tag,{class:fe(["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},r.value,l.value,h.value,p.value,m.value,v.value,d.value,e.class]),style:Be([u.value,f.value,g.value,e.style]),role:"alert"},{default:()=>{var O,$;return[Za(!1,"v-alert"),e.border&&b("div",{key:"border",class:fe(["v-alert__border",y.value]),style:Be(w.value)},null),C&&b("div",{key:"prepend",class:"v-alert__prepend"},[s.prepend?S(gt,{key:"prepend-defaults",disabled:!i.value,defaults:{VIcon:{...k}}},s.prepend):S(Ke,$e({key:"prepend-icon"},k),null)]),b("div",{class:"v-alert__content"},[_&&S(d2,{key:"title"},{default:()=>{var q;return[((q=s.title)==null?void 0:q.call(s))??e.title]}}),((O=s.text)==null?void 0:O.call(s))??e.text,($=s.default)==null?void 0:$.call(s)]),s.append&&b("div",{key:"append",class:"v-alert__append"},[s.append()]),I&&b("div",{key:"close",class:"v-alert__close"},[s.close?S(gt,{key:"close-defaults",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var q;return[(q=s.close)==null?void 0:q.call(s,{props:T.value})]}}):S(ht,$e({key:"close-btn",icon:e.closeIcon,size:"x-small",variant:"text"},T.value),null)])]}})}}}),g2={key:0},v2={class:"mb-6"},y2={class:"d-flex flex-wrap align-center ga-3 mb-2"},b2={class:"text-h4 font-weight-bold mb-0"},w2={class:"text-body-2 text-medium-emphasis"},k2={class:"mt-2"},S2=Ct({__name:"ExperimentDetailPage",props:{slug:{}},setup(e){const t=e,n=N(()=>hv(t.slug)),s=N(()=>OA(t.slug)),a=be(null),i=Pe(null);mn(async()=>{a.value=null;const l=LA(t.slug);l&&(a.value=await l)}),mn(async()=>{if(!a.value||!s.value)return;await It();const l=i.value;if(!l)return;let u=0,d=!1;for(const h of Array.from(l.children)){if(d){h.style.display="none";continue}h.tagName==="H2"&&(u++,u>2&&(d=!0,h.style.display="none"))}});const o={finished:"success",mixed:"warning",failed:"error",ongoing:"info"};function r(l){return new Date(l).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"})}return(l,u)=>n.value?(B(),H("div",g2,[S(ht,{to:"/experiments",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...u[0]||(u[0]=[K(" Back to experiments ",-1)])]),_:1}),b("div",v2,[b("div",y2,[b("h1",b2,V(n.value.title),1),n.value.outcome?(B(),Ge(vt,{key:0,color:o[n.value.outcome],variant:"tonal"},{default:D(()=>[K(V(n.value.outcome),1)]),_:1},8,["color"])):Ee("",!0)]),b("div",w2,V(r(n.value.date)),1)]),a.value?(B(),H("article",{key:0,ref_key:"bodyEl",ref:i,class:"mdx-body mb-6"},[(B(),Ge(Ep(a.value)))],512)):Ee("",!0),s.value?(B(),Ge(Ms,{key:1,type:"info",variant:"tonal",icon:"mdi-lock-outline",class:"mb-6"},{default:D(()=>[...u[1]||(u[1]=[K(" 🔒 This experiment is ",-1),b("strong",null,"ongoing",-1),K(". The rest of the write-up — main learnings, approach, what we built — is hidden until the experiment lands. ",-1)])]),_:1})):Ee("",!0)])):(B(),Ge(Ms,{key:1,type:"error",variant:"tonal",icon:"mdi-alert-circle-outline"},{default:D(()=>[u[3]||(u[3]=K(" No experiment found for slug ",-1)),b("code",null,V(e.slug),1),u[4]||(u[4]=K(". ",-1)),b("div",k2,[S(ht,{to:"/experiments",variant:"text",size:"small",color:"primary"},{default:D(()=>[...u[2]||(u[2]=[K(" Back to list ",-1)])]),_:1})])]),_:1}))}}),x2=Ws(S2,[["__scopeId","data-v-54f81c17"]]),_2={class:"d-flex align-center mb-2 ga-3"},A2={class:"text-h6 font-weight-bold mb-0"},C2={class:"text-body-2 text-medium-emphasis mb-0"},T2=Ct({__name:"SpecificationsPage",setup(e){const t=N(()=>[{title:"OpenAPI",icon:"mdi-api",color:"primary",to:"/specifications/openapi",description:"Backend HTTP API surface. Endpoints, request and response schemas, error codes.",count:1,countLabel:"spec"},{title:"Arazzo workflows",icon:"mdi-graph-outline",color:"secondary",to:"/specifications/arazzo",description:"Multi-step API workflows that chain endpoints into a single business operation.",count:sl.length,countLabel:"files"},{title:"Agent cards",icon:"mdi-robot-outline",color:"accent",to:"/specifications/agents",description:"Domain agents declared via agent cards: capabilities, intents, contracts.",count:nl.length,countLabel:"agents"},{title:"Gherkin features",icon:"mdi-checkbox-marked-circle-outline",color:"success",to:"/specifications/gherkin",description:"Behaviour-driven scenarios that describe what the system should do, in plain English.",count:el.length,countLabel:"features"},{title:"Domain models",icon:"mdi-cube-outline",color:"info",to:"/specifications/domains",description:"JSON-Schema-typed domain entities. The shape of the data the system passes around.",count:tl.length,countLabel:"schemas"}]);return(n,s)=>(B(),H("div",null,[s[0]||(s[0]=b("div",{class:"mb-6"},[b("h1",{class:"text-h4 font-weight-bold mb-2"},"📜 Specifications"),b("p",{class:"text-body-1 text-medium-emphasis"}," Executable and human-readable specs for the change-delegation feature. ")],-1)),S(fr,null,{default:D(()=>[(B(!0),H(ce,null,qe(t.value,a=>(B(),Ge(Nn,{key:a.title,cols:"12",md:"6"},{default:D(()=>[S(ln,{to:a.to,variant:"outlined",hover:"",class:"h-100 pa-4"},{default:D(()=>[b("div",_2,[S(Ke,{color:a.color,size:"28"},{default:D(()=>[K(V(a.icon),1)]),_:2},1032,["color"]),b("h2",A2,V(a.title),1),S(Ji),S(vt,{size:"x-small",variant:"tonal",color:a.color},{default:D(()=>[K(V(a.count)+" "+V(a.countLabel),1)]),_:2},1032,["color"])]),b("p",C2,V(a.description),1)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1})]))}}),I2=`---
marp: true
theme: default
paginate: true
header: "Agent development"
footer: "AIX Team"
title: Agent development
date: 2026-06-07
abstract: TODO
style: |
  section { padding-top: 40px; padding-bottom: 40px; justify-content: flex-start; }
  section h1 { margin-top: 0; margin-bottom: 0.35em; }
  section h1 + p,
  section h1 + ul,
  section h1 + pre { margin-top: 0.35em; }
  section img { margin-top: 0; margin-bottom: 0.3em; }
  section table { margin-top: 0.4em; }
  table { font-size: 0.525em; }
  section.small { font-size: 0.75em; }
  section.small h1 { font-size: 1.4em; }
  section.small pre, section.small code { font-size: 0.85em; }
---

# Brief history of agents and workflows

---

# Running example: Personalization

A user can do personalization related stuff.

**Tools available:** \`RegisterTemplate\`, \`CompileTemplate\`, \`SendEmail\`

---

# What we have to figure out

- **Available tools** — what can the agent actually do?
- **Available workflows** — none / hand-rolled in code / via prompt / via skill / structured spec?
- **Control** — who decides the next step: code or the LLM?
- **Speed** — how many round-trips before the user sees a result?
- **Reliability** — will it do the same thing twice in a row?
- **Context management** — what stays in the prompt, what gets summarised, what gets dropped?
- **Dynamic** — how easily does the same agent handle a request you didn't think of?

---

# Static workflow

![w:1100](images/workflow-static.svg)

| | Static workflow |
|---|---|
| Available tools | Code |
| Available workflows | Code |
| Control | Code |
| Speed | Fastest |
| Reliability | Best |
| Context management | Code |
| Dynamic | Less |

---

# Building blocks

![w:660](images/building-blocks.svg)

---

<!-- _class: small -->

# Setup — \`editor-agent-workshop\`

Sibling repo, REST backend + back-tools already wired up.

\`\`\`bash
git clone https://github.com/emartech/editor-agent-workshop.git
cd editor-agent-workshop
nvm use && npm install
cp .env.example .env   # add your model key

npm run cli                  # smoke test — should print help
npm run dev:backend          # http://localhost:3010 — leave running
\`\`\`

---

<!-- _class: small -->

# Exercise 1 — build the static workflow

Leave the backend running in a second terminal:

\`\`\`bash
npm run dev:backend            # http://localhost:3010
\`\`\`

Create **\`src/workflow.ts\`**. The REST backend is up and \`src/utils/backend-tools\` (\`registerTemplate\`, \`compileTemplate\`, \`send\`) is ready to use.

**Goal:** turn one free-text prompt into a delivered notification — no agent loop, no tool calls, just code.

**Test message:** \`Send a welcome message to Viktor Somodi\`

**Hints**

- Use \`generateObject\` (from \`ai\`) with a Zod schema to extract:
  - \`templateName\` — short, human-readable
  - \`templateContent\` — body with \`{{ contact.<field> }}\` placeholders
  - \`contact\` — \`Record<string, string>\` whose keys match the placeholders
- Then chain deterministically: \`registerTemplate\` → \`compileTemplate\` → \`send\`
- Model helper: \`buildModel()\` from \`src/utils/model.ts\`
- Backend client: \`src/utils/backend-tools/index.ts\`

**Stretch:** refuse off-topic / under-specified prompts gracefully instead of hallucinating a contact.

---

# ReAct

![w:600](images/agent-react.svg)

| | Static workflow | ReAct agent |
|---|---|---|
| Available tools | Code | Code |
| Available workflows | Code | Prompt |
| Control | Code | LLM |
| Speed | Fastest | Slowest |
| Reliability | Best | Easy to get lost |
| Context management | Code | LLM |
| Dynamic | Less | Most |

---

<!-- _class: small -->

# Exercise 2 — build a ReAct agent

Create **\`src/react.ts\`**. Same backend, same operations — this time the LLM decides what to call.

**Goal:** one prompt in → LLM loops \`Thought → Action → Observation\` until the notification is delivered.

**Hints**

- Use \`generateText\` (from \`ai\`) with \`tools: { registerTemplate, compileTemplate, send }\`
- Wrap each helper from \`src/utils/backend-tools\` with \`tool({ description, inputSchema, execute })\`
- Reuse the request schemas already exported from \`src/utils/backend-tools\` as \`inputSchema\`
- Bound the loop with \`stopWhen: stepCountIs(8)\`
- Inspect \`result.steps\` to see what the model chose at each turn

\`\`\`ts
const registerTemplateTool = tool({
  description: "Register a notification template.",
  inputSchema: RegisterTemplateRequestSchema,
  execute: async (input) => registerTemplate(input),
});
// … same for compileTemplate, send

const { text, steps } = await generateText({
  model,
  tools: { registerTemplate: registerTemplateTool, /* … */ },
  stopWhen: stepCountIs(8),
  prompt,
});
\`\`\`

---

# Plan → Execute

![w:600](images/agent-plan-execute.svg)

| | Static workflow | ReAct agent | Plan-execute agent |
|---|---|---|---|
| Available tools | Code | Code | Code |
| Available workflows | Code | Prompt | Prompt |
| Control | Code | LLM | LLM |
| Speed | Fastest | Slowest | Medium |
| Reliability | Best | Easy to get lost | Nothing enforces the plan |
| Context management | Code | LLM | LLM |
| Dynamic | Less | Most | Most |

---

# Todo list with dependencies

![w:1100](images/agent-todo-dag.svg)

| | Static workflow | ReAct agent | Plan-execute agent | Todo list |
|---|---|---|---|---|
| Available tools | Code | Code | Code | Code |
| Available workflows | Code | Prompt | Prompt | Prompt |
| Control | Code | LLM | LLM | LLM |
| Speed | Fastest | Slowest | Medium | Slow |
| Reliability | Best | Easy to get lost | Nothing enforces the plan | Nothing enforces the todo usage |
| Context management | Code | LLM | LLM | LLM |
| Dynamic | Less | Most | Most | Most |

---

# MCP — Model Context Protocol

A standard wire format for **exposing tools to LLMs over a network** — instead of importing them in code.

- **Server** publishes tools, resources, prompts (over stdio or Streamable HTTP)
- **Client** (the agent) discovers them at runtime and calls them like local tools
- Decouples *who owns the tool* from *who runs the agent* — swap backends, share tools across agents, run them in another process / language / machine
- Same ReAct loop on the agent side; only the wiring changes

---

<!-- _class: small -->

# Exercise 3.1 — wrap the backend with an MCP server

The REST backend already ships an OpenAPI spec (\`specs/rest/openapi.yaml\`). Use **FastMCP** — zero codegen, Streamable HTTP transport.

Create **\`scripts/mcp_proxy.py\`**:

\`\`\`python
from pathlib import Path
import httpx, yaml
from fastmcp import FastMCP

SPEC = Path(__file__).resolve().parent.parent / "specs/rest/openapi.yaml"
spec = yaml.safe_load(SPEC.read_text())
client = httpx.AsyncClient(base_url="http://localhost:3010")
mcp = FastMCP.from_openapi(openapi_spec=spec, client=client, name="backend")
mcp.run(transport="http", host="127.0.0.1", port=3020)
\`\`\`

\`\`\`bash
uv run --with fastmcp --with httpx --with pyyaml \\
  python scripts/mcp_proxy.py     # http://localhost:3020/mcp/
\`\`\`

One MCP tool per OpenAPI operation — schemas, descriptions and HTTP wiring all derived from the spec at runtime.

**Test with MCP Inspector** — no agent yet:

\`\`\`bash
npx @modelcontextprotocol/inspector
# transport: Streamable HTTP · url: http://localhost:3020/mcp/
\`\`\`

---

<!-- _class: small -->

# Exercise 3.2 — attach tools via MCP

Create **\`src/mcp-agent.ts\`**. Same three operations, but the agent discovers them over the wire instead of importing them.

**Goal:** one prompt in → notification delivered, with zero tool schemas in your code.

**Hints**

- Connect with \`createMCPClient\` from \`@ai-sdk/mcp\` (Streamable HTTP transport)
- \`await client.tools()\` already returns AI-SDK-shaped tools — hand them straight to \`generateText({ tools })\`
- \`MCP_URL\` env var points at the server (\`http://localhost:3020/mcp/\`)
- Always \`await client.close()\` in a \`finally\` block
- No Zod, no \`tool({...})\` wrapper, no schemas in your code — the server owns them

\`\`\`ts
const client = await createMCPClient({
  transport: { type: "http", url: process.env.MCP_URL! },
});
try {
  const tools = await client.tools();
  const { text } = await generateText({
    model, tools, prompt,
    stopWhen: stepCountIs(8),
  });
} finally {
  await client.close();
}
\`\`\`

---

# Skill

A markdown playbook (\`SKILL.md\`) the LLM reads as its system prompt. It lists which tools to use, in what order, and points at the specs to consult — no typed \`tool({...})\` definitions in your code.

| | Static | ReAct | Plan-exec | Todo | Skill |
|---|---|---|---|---|---|
| Available tools | Code | Code | Code | Code | Code + Skill |
| Available workflows | Code | Prompt | Prompt | Prompt | Prompt + Skill |
| Control | Code | LLM | LLM | LLM | LLM |
| Speed | Fastest | Slowest | Medium | Slow | Slow |
| Reliability | Best | Easy to get lost | Nothing enforces the plan | Nothing enforces the todo | Depends on the skill |
| Context management | Code | LLM | LLM | LLM | LLM (skill in prompt) |
| Dynamic | Less | Most | Most | Most | Most |

---

<!-- _class: small -->

# Exercise 4.1 — author the skill, test it in Claude Code

Write the skill where Claude Code will pick it up automatically. Bundle the specs **inside** the skill so it's self-contained — no path assumptions about the surrounding repo.

\`\`\`bash
mkdir -p .claude/skills/backend-skill
cp specs/rest/openapi.yaml  .claude/skills/backend-skill/
cp specs/rest/arazzo.yaml   .claude/skills/backend-skill/
\`\`\`

Then author **\`.claude/skills/backend-skill/SKILL.md\`** — keep it as compact as possible:

- mention \`openapi.yaml\` (sibling) for endpoints + schemas
- mention \`arazzo.yaml\` (sibling) for the *register → compile → send* sequence
- mention that calls go via \`curl\` to \`http://localhost:3010\`

That's it. No examples, no commentary — the LLM reads the specs itself.

**Test it before writing any agent code:**

\`\`\`bash
claude
# then prompt:
# /backend-skill Send a welcome message to Viktor Somodi
\`\`\`

Iterate on the wording until it works first try.

---

<!-- _class: small -->

# Exercise 4.2 — drive the agent with the skill

Create **\`src/agent-skill.ts\`** — same task as Exercise 2, but the LLM gets the skill (not typed tools) and **only** a \`bash\` tool.

**Goal:** one prompt in → notification delivered, with no typed tools — the skill + bash do it all.

**Hints**

- Load the skill with \`loadSkill(".claude/skills/backend-skill")\` from \`src/utils/skills\`
- Put \`skill.raw\` into the \`system\` prompt **and** include \`skill.dir\` so the LLM uses absolute paths (the spec files live next to \`SKILL.md\`, not at cwd)
- Attach **only** the \`bash\` tool — no \`registerTemplate\` / \`compileTemplate\` / \`send\`
- Stream tool calls live via \`onStepFinish\` — otherwise the 5-step loop looks frozen
- Bound the loop a bit higher: \`stopWhen: stepCountIs(12)\` (it reads spec files, then curls)
- Compare the run trace against Exercise 2 — same model, no typed tools, but the skill + bash get it there

\`\`\`ts
import { bashTool } from "./utils/tools/bash.ts";
import { loadSkill } from "./utils/skills/index.ts";

const skill = await loadSkill(".claude/skills/backend-skill");
const { text } = await generateText({
  model,
  system: \`Skill directory: \${skill.dir}\\n\\n\${skill.raw}\`,
  tools: { bash: bashTool },
  stopWhen: stepCountIs(12),
  onStepFinish: (s) => console.error(s.toolCalls, s.toolResults, s.text),
  prompt,
});
\`\`\`

<small>AI SDK has no built-in skill loader — see the pattern at <https://ai-sdk.dev/cookbook/guides/agent-skills>.</small>

---

# the new shit! dynamic workflows

![w:630](images/dynamic-workflow.svg)

| | Static workflow | ReAct agent | Plan-execute agent | Todo list | Dynamic workflow |
|---|---|---|---|---|---|
| Available tools | Code | Code | Code | Code | MCP / Skill / Tools |
| Available workflows | Code | Prompt | Prompt | Prompt | Prompt + Skill (structured) |
| Control | Code | LLM | LLM | LLM | Code |
| Speed | Fastest | Slowest | Medium | Slow | Fast |
| Reliability | Best | Easy to get lost | Nothing enforces the plan | Nothing enforces the todo usage | Best |
| Context management | Code | LLM | LLM | LLM | Code |
| Dynamic | Less | Most | Most | Most | More |

---

<!-- _class: small -->

# Exercise 5 — reshape the skill, not the agent

The agent file barely changes — swap \`bash\` for \`{ read, executeArazzo }\`. The interesting work is in **\`.claude/skills/backend-skill/SKILL.md\`**: rewrite the body so the LLM stops hand-rolling \`curl\` and hands the chain back to the Arazzo engine.

**What to change in SKILL.md**

- Drop the *"call endpoints with curl"* instruction
- Tell the LLM to:
  1. read \`arazzo.yaml\` (sibling of \`SKILL.md\`) to discover available \`workflowId\`s
  2. read \`openapi.yaml\` only if it needs schema detail for an input
  3. call \`executeArazzo({ workflowFile, workflowId, inputs })\` once — the engine handles register → compile → send
- Keep it compact — same spirit as 4.1, just a different transport

**Tools → same agent file, different wiring**

- Replace \`{ bash }\` with \`{ read, executeArazzo }\` from \`./utils/tools/read.ts\` / \`./utils/tools/arazzo.ts\`
- Tighten the loop: \`stopWhen: stepCountIs(8)\` — a healthy run is 2-3 steps total

**Test it the same way — first in Claude Code, then with the agent:**

\`\`\`bash
claude
# /backend-skill Send a welcome message to Viktor Somodi
#   → should call executeArazzo, not curl

node src/agent-skill.ts "Send a welcome message to Viktor Somodi"
\`\`\`

---

# How to make the agent usable?

A CLI is fine for hacking, but it doesn't compose. Other agents, other apps, other teams — nobody wants to \`npx\` your script.

We need a **server** with a **stable contract** that anyone can talk to:

- discoverable capabilities (“what can you do?”)
- standard transport (“how do I call you?”)
- async tasks, streaming, push, auth (“what else do I get?”)

→ **Agent-to-Agent (A2A) protocol** — same idea as MCP for tools, but for agents.

---

<!-- _class: small -->

# Agent Card — the public contract

A single JSON document at **\`/.well-known/agent-card.json\`**. Clients fetch it once, learn what the agent does and how to call it, then start sending messages.

\`\`\`json
{
  "name": "editor-agent-workshop / mcp-agent",
  "protocolVersion": "0.3.0",
  "version": "0.1.0",
  "url": "http://localhost:3030/a2a/jsonrpc",
  "preferredTransport": "JSONRPC",
  "skills": [
    { "id": "notify", "name": "Send templated notification", "tags": ["notify"] }
  ],
  "capabilities": { "pushNotifications": false, "streaming": false },
  "defaultInputModes":  ["text"],
  "defaultOutputModes": ["text"]
}
\`\`\`

- **\`url\` + \`preferredTransport\`** — where + how to call (JSON-RPC over HTTP here)
- **\`skills\`** — advertised capabilities, what other agents key off of
- **\`capabilities\`** — streaming, push, auth: opt-in, not assumed
- **\`defaultInputModes\` / \`defaultOutputModes\`** — text in, text out for our server

---

<!-- _class: small -->

# Exercise 6.1 — expose the agent over A2A

Create **two files**:

- \`src/backends/a2a/index.ts\` — Express server, agent card + JSON-RPC handler
- \`src/backends/a2a/executor.ts\` — \`McpAgentExecutor\` that runs \`runMcpAgent\` per message

**Goal:** any A2A client hits \`/.well-known/agent-card.json\`, sends a message, gets back the same notification flow as Exercise 3.2.

**Hints — \`index.ts\` (boilerplate)**

- Build an \`AgentCard\` (slide 21 shape) — \`url: "\${PUBLIC_URL}/a2a/jsonrpc"\`, transport \`JSONRPC\`, skill \`notify\`, no streaming/push.
- Wire \`new DefaultRequestHandler(card, new InMemoryTaskStore(), new McpAgentExecutor())\`.
- Mount \`agentCardHandler\` at \`/\${AGENT_CARD_PATH}\` and \`jsonRpcHandler\` at \`/a2a/jsonrpc\` (use \`UserBuilder.noAuthentication\`).

**Hints — \`executor.ts\` (the actual work)**

Implement \`AgentExecutor\` from \`@a2a-js/sdk/server\`. In \`execute(ctx, bus)\`:

1. Pull the prompt from \`ctx.userMessage.parts\` (filter \`kind === "text"\`, join).
2. **Publish a \`Task\` event first** if \`!ctx.task\` — \`kind: "task"\`, \`state: "submitted"\`, history seeded with \`userMessage\`. Skip this and \`ResultManager\` orphans every status-update → *"Agent execution finished without a result."*
3. Publish a \`working\` status-update (\`final: false\`).
4. \`await runMcpAgent(prompt)\` from \`src/agent-mcp/index.ts\`.
5. Publish a final \`completed\` status-update (\`final: true\`) whose \`status.message\` is an agent \`Message\` carrying the agent text.
6. On error, publish \`failed\` with the error message in the agent \`Message\`.

Implement \`cancelTask\` too — even a flag the execute path checks at safe points is enough.

---

<!-- _class: small -->

# Exercise 6.2 — poke it with the A2A Inspector

[a2aproject/a2a-inspector](https://github.com/a2aproject/a2a-inspector) — official web UI: fetches the Agent Card, validates spec compliance, opens a chat, and shows raw JSON-RPC frames in a debug console. No pre-built image; build it once locally.

\`\`\`bash
docker build -t a2a-inspector https://github.com/a2aproject/a2a-inspector.git
docker run -d -p 8088:8080 a2a-inspector
# → http://127.0.0.1:8088
\`\`\`

**Connect to your agent**

- Start the A2A server from 6.1 (\`node src/backends/a2a/index.ts\`)
- In the inspector, use **\`http://host.docker.internal:3030\`** as the agent URL (the inspector runs in Docker; \`localhost\` would point at the container)
- It auto-fetches \`/.well-known/agent-card.json\`, runs spec checks, then opens a chat — send *"Send a welcome message to Viktor Somodi"*
- Open the debug console to see the raw JSON-RPC \`message/send\` request and the streamed task updates
`,E2=`---
marp: true
theme: default
paginate: true
header: "Agentic Search"
footer: "AIX Team"
title: "KB 3: Agentic Search"
date: 2026-05-12
abstract: "Let the agent decide what to look up and iterate until it has enough context."
style: |
  section { font-size: 28px; }
  table { font-size: 22px; }
---

# Agentic Search

### Let the Agent Drive the Retrieval

---

## The Flow

![agentic-flow](images/agentic-flow.svg)

---

## With a Knowledge Base

![agentic-flow-knowledge](images/agentic-flow-knowledge.svg)

---

## RAG vs Agentic Search

| | RAG | Agentic Search |
|---|---|---|
| **Speed** | Fast | Slow |
| **Complexity** | High | Medium |
| **Performance** | Good | Best |
| **Human Readable** | No | No |
| **Flexibility** | Low | High |
| **Scalability** | 100K+ docs | ~Infinite |
| **Manual Work** | Small | Small |
`,L2=`---
marp: true
theme: default
paginate: true
header: "Embedding + RAG"
footer: "AIX Team"
title: "KB 2: Embedding + RAG"
date: 2026-05-12
abstract: "Turning text into vectors, chunking, semantic search, and qmd as a ready-to-use local tool."
style: |
  section { font-size: 28px; }
  pre { font-size: 20px; }
  table { font-size: 22px; }
math: mathjax
---

# Embedding + RAG

### Turning Words into Numbers Machines Understand

---

## The Simple Picture

![rag-flow](images/rag-flow.svg)

---

## The Problem

Computers don't understand meaning.

\`\`\`
"cat"  →  just 3 characters: c, a, t
"dog"  →  just 3 characters: d, o, g
"pet"  →  just 3 characters: p, e, t
\`\`\`

**How do we teach a machine that "cat" is closer to "dog" than to "car"?**

---

## The Idea

Map words (or sentences, documents) into a **vector** — an array of numbers that captures meaning.

\`\`\`
"cat"  →  [0.21, 0.83, -0.45, 0.12, ...]
"dog"  →  [0.19, 0.79, -0.42, 0.15, ...]
"car"  →  [-0.72, 0.11, 0.88, -0.34, ...]
\`\`\`

Similar meanings → similar numbers → **close in space**.

---

## What Is a Vector?

A vector is just a list of numbers — coordinates in a space.

**2D example:**

\`\`\`
         ↑ y
         |
  queen •|• king
         |
  woman •|• man
         |
         |         • car • Kocsi
         |
  -------+----------→ x
\`\`\`

**Famous example:** king − man + woman ≈ queen

Real embeddings use **hundreds or thousands** of dimensions (not just 2).

---

## Dimensions = Concepts

Each dimension loosely captures a concept:

\`\`\`
                 "royalty"  "gender"  "human"  "has-wheels"  ...
                 
  "king"    →   [ 0.9,       0.1,      0.9,     0.0,         ...]
  "queen"   →   [ 0.9,       0.9,      0.9,     0.0,         ...]
  "man"     →   [ 0.1,       0.1,      0.9,     0.0,         ...]
  "woman"   →   [ 0.1,       0.9,      0.9,     0.0,         ...]
  "car"     →   [ 0.0,       0.0,      0.0,     0.9,         ...]
\`\`\`

> ⚠️ In practice, dimensions aren't this clean — they're learned automatically by neural networks.

---

## Cosine Similarity

$$\\text{cosine\\_sim}(A, B) = \\frac{A \\cdot B}{\\|A\\| \\times \\|B\\|}$$

| Score | Meaning |
|-------|---------|
| 1.0 | Identical |
| 0.7+ | Very similar |
| 0.3–0.7 | Somewhat related |
| ~0 | Unrelated |

---

## Chunking: Why It Matters

A long document needs to be split into searchable pieces:

\`\`\`
┌─────────────────────────────────────────────┐
│              Full Document (5000 tokens)      │
├──────────────────┬──────────────────────────┤
│    Chunk 1       │        Chunk 2            │
│  (900 tokens)    │      (900 tokens)         │
│           ┌──────┴──────┐                    │
│           │   overlap   │                    │
│           │   (15%)     │                    │
│           └─────────────┘                    │
├──────────────────┼──────────────────────────┤
│    Chunk 3       │        Chunk 4            │
│  (900 tokens)    │      (900 tokens)         │
└──────────────────┴──────────────────────────┘
\`\`\`

**Overlap** ensures context isn't lost at chunk boundaries.

---

## Semantic Search: Putting It All Together

\`\`\`
┌──────────────┐       ┌──────────────────────────┐
│  Your Query  │       │   Document Collection     │
│  "auth flow" │       │                          │
└──────┬───────┘       │  doc1.md → [0.2, 0.8, ..]│
       │               │  doc2.md → [0.7, 0.1, ..]│
       ▼               │  doc3.md → [0.3, 0.9, ..]│
┌──────────────┐       │  doc4.md → [0.1, 0.4, ..]│
│ Embed Query  │       └────────────┬─────────────┘
│ → [0.3, 0.85]│                    │
└──────┬───────┘                    │
       │         ┌──────────────────┘
       ▼         ▼
┌─────────────────────┐
│  Compare distances   │
│                     │
│  doc1: 0.92 ✓ BEST  │
│  doc3: 0.87 ✓       │
│  doc2: 0.23 ✗       │
│  doc4: 0.15 ✗       │
└─────────────────────┘
\`\`\`

---

## Why Not Just Use Keywords?

| Keyword Search | Semantic Search |
|---|---|
| "auth" matches "auth" | "login flow" matches "authentication process" |
| Exact string match | Meaning match |
| Misses synonyms | Understands synonyms |
| Fast, simple | Needs embeddings |
| No context | Understands context |

**Best approach: combine both!**

---

## The Enhanced Picture

![rag-flow-enhanced](images/rag-flow-enhanced.svg)

<!--
- Query Decomposition — break complex questions into simpler sub-queries
- Query Expansion — generate synonyms and alternative phrasings to improve recall
- Rerank — re-score candidates with a cross-attention model for precision
-->

---

## The Workflow

![workflow](images/workflow.svg)

---

## Ready to Use: qmd

[qmd](https://github.com/tobi/qmd) — semantic search for your local files.

- **SQLite** — local storage for embeddings and index
- **Chunking** — ~900 tokens with 15% overlap
- **Query Expansion** — generates synonyms and related terms
- **Rerank** — re-scores results for precision
- **BM25** — keyword fallback search
- **MCP** — exposes search to AI agents

---

## qmd — Install & Index

\`\`\`bash
npm install -g @tobilu/qmd

# Index all Markdown files in a folder
qmd collection add ~/Documents/notes --name my-notes --mask "**/*.md"
qmd embed
\`\`\`

---

## qmd — Query

\`\`\`bash
qmd query "how does the authentication flow work?"

# Filter by collection
qmd query "topic" -c my-notes

# Output formats
qmd query "topic" --json
qmd query "topic" --md
qmd query "topic" --files

# Run as MCP server for agents
qmd mcp
\`\`\`

---

## qmd — Local Storage

| Path | Contents |
|---|---|
| \`~/.cache/qmd/index.sqlite\` | SQLite database with all embeddings, chunks, and BM25 index (~4.1MB) |
| \`~/.cache/qmd/models/\` | Downloaded GGUF model files (2.2GB total) |

> Everything runs locally — no API calls, no data leaves your machine.
`,O2=`---
marp: true
theme: default
paginate: true
header: "Knowledge Base"
footer: "AIX Team"
title: "KB 1: Why Agents Need Your Knowledge"
date: 2026-05-12
abstract: "The problem: agents lack context. Why fine-tuning doesn't work and what approaches exist."
style: |
  section { font-size: 28px; }
  pre { font-size: 20px; }
  table { font-size: 22px; }
---

# Knowledge Base

### Why Agents Need Your Knowledge

---

## Today: Knowledge Lives Everywhere

- Jira
- Confluence
- Slack
- Email
- Code repositories
- People's heads

**Humans connect the dots** — we read, remember, and link pieces together.

---

## The Shift: Enter AI Agents

If we want agents to do meaningful work, they need **context**.

They can't read your Jira. They weren't in that Slack thread. They don't know what was decided last Tuesday.

> **Main use case for today:** How do we give agents access to our knowledge?

---

## Without Context, Agents Hallucinate

LLMs are trained on generic, public data.

- Your internal docs are **not** in the training data
- Your decisions, processes, domain specifics — **unknown** to the model
- Result: confident-sounding answers that are **wrong**

---

## Why Not Just Train the Model?

| | Fine-tuning / Retraining |
|---|---|
| 💰 | Extremely expensive |
| 🔒 | You don't want to share everything with a provider |
| 🐌 | Slow — can't keep up with daily changes |
| 🔄 | Needs to be repeated as knowledge evolves |

**We need a different approach.**

---

## The Opportunity: LLMs Can Help With Documentation

Documentation is hard:
- Nobody wants to write it
- It goes stale immediately
- It's never where you need it

But LLMs are good at:
- Summarizing
- Structuring
- Connecting information
- Keeping things consistent

> **If we solve retrieval, LLMs can help manage the knowledge too.**

---

## Four Approaches

→ **Embedding + RAG** — turning text into searchable meaning
→ **Agentic Search** — letting agents find what they need
→ **Karpathy Wiki** — structured, connected, always current
→ **Knowledge Engine** — domain-specific structured extraction
`,N2=`---
marp: true
theme: default
paginate: true
header: "Karpathy Wiki"
footer: "AIX Team"
title: "KB 4: Karpathy Wiki"
date: 2026-05-12
abstract: "An LLM maintains interlinked markdown pages you can read, search, and audit."
style: |
  section { font-size: 28px; }
  pre { font-size: 20px; }
  table { font-size: 22px; }
---

# Karpathy Wiki

### Human-Readable Knowledge, LLM-Maintained

---

## The Flow

![karpathy-wiki-flow](images/karpathy-wiki-flow.svg)

---

## What is a Wiki?

- A collection of interlinked pages
- Each page covers one topic
- Pages reference each other
- Easy to browse, search, and update
- Think: Wikipedia but for your own knowledge

---

## Operations

1. **Ingest** — add new source material
2. **Query** — ask questions against the wiki
3. **Lint** — health audit (contradictions, orphans, gaps)
4. **Update** — revise existing pages when knowledge changes

---

## Structure

\`\`\`
<wiki-root>/
├── SCHEMA.md        # Conventions + wiki root path
├── raw/             # Immutable source documents (you manage)
├── wiki/
│   ├── index.md     # Content catalog — every page, one-line summary
│   ├── log.md       # Append-only operation log
│   ├── overview.md  # Evolving synthesis of everything known
│   └── pages/       # All wiki pages, flat, slug-named
└── assets/          # Images, PDFs, attachments
\`\`\`

---

## Adding Agentic Search to the Wiki

Combining the wiki with qmd gives the best of both: human-readable pages for browsing, semantic search for retrieval.

| | RAG | Agentic Search | Karpathy Wiki | Wiki + RAG |
|---|---|---|---|---|
| **Speed** | Fast | Slow | Medium | Medium |
| **Complexity** | High | Medium | Low | High |
| **Performance** | Good | Best | Great | Best |
| **Human Readable** | No | No | Yes | Yes |
| **Flexibility** | Low | High | Medium | Medium |
| **Scalability** | 100K+ docs | ~Infinite | Hundreds | Hundreds |
| **Manual Work** | Small | Small | High | High |

---

## Skill: wiki-skills

[wiki-skills](https://github.com/kfchou/wiki-skills) — the skill set we forked and adapted.

Based on [Karpathy's LLM Wiki gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).
`,P2=`---
marp: true
theme: default
paginate: true
header: "Knowledge Engine"
footer: "AIX Team"
title: "KB 5: Knowledge Engine"
date: 2026-05-12
abstract: "Extract structured data from raw inputs into typed stores with evaluation-driven iteration."
style: |
  section { font-size: 28px; }
  pre { font-size: 20px; }
  table { font-size: 22px; }
---

# Knowledge Engine

### Structured Extraction into Typed Stores

---

## The Flow

![knowledge-engine-flow](images/knowledge-engine-flow.svg)

- **Ingest** — Knowledge engine processes input into use case specific stores
- **Query** — Use case specific query language

---

## Example: Recipes

![example-meeting](images/example-meeting.svg)

---

## How It Works

A Knowledge Engine use case has two parts:

| | Parser | Query |
|---|---|---|
| **Purpose** | Extract structured data from raw input | How to query the parser result |
| **Example** | Recipe → ingredients, calories, prep time | "What can I cook in under 20 min?" |

Under the hood:

- A set of **evaluation pairs** (question → expected answer)
- A set of **skills** (scripts with descriptions)
- An **agent iterates** — generating the parser and query logic until the evaluations pass

> The agent builds the use case for you — you just define what "correct" looks like.

---

## Full Comparison

| | RAG | Agentic Search | Karpathy Wiki | Knowledge Engine |
|---|---|---|---|---|
| **Speed** | Fast | Slow | Medium | Fast |
| **Complexity** | High | Medium | Low | Medium |
| **Performance** | Good | Best | Great | Best |
| **Human Readable** | No | No | Yes | Possible |
| **Flexibility** | Low | High | Medium | Medium |
| **Scalability** | 100K+ docs | ~Infinite | Hundreds | Thousands |
| **Manual Work** | Small | Small | High | Small |

---

## References

- [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — Andrej Karpathy's original gist
- [wiki-skills](https://github.com/kfchou/wiki-skills) — Karpathy wiki skill set
- [qmd](https://github.com/tobi/qmd) — local semantic search for markdown
`,B2=`---
marp: true
theme: default
paginate: true
header: "Loop Engineering"
footer: "AIX Team"
title: Loop Engineering
date: 2026-06-18
abstract: Designing AI-native engineering systems as closed loops: specify, generate, validate, learn, and repeat.
style: |
  section { padding-top: 40px; padding-bottom: 40px; justify-content: flex-start; }
  section h1 { margin-top: 0; margin-bottom: 0.35em; }
  section h1 + p,
  section h1 + ul,
  section h1 + pre { margin-top: 0.35em; }
  section table { margin-top: 0.4em; }
  table { font-size: 0.6em; }
  section.small { font-size: 0.75em; }
  section.small h1 { font-size: 1.4em; }
---

# Loop Engineering

Designing systems where AI can build, check, and improve software in a closed feedback loop.

---

# The smallest Ralph loop

\`\`\`bash
while true; do
  cat PROMPT.md | agent
done
\`\`\`

Example \`PROMPT.md\`:

\`\`\`text
Get the highest priority Ticket and resolve it
\`\`\`

---

# Lint repair loop

\`\`\`bash
while ! npx eslint .; do
  agent "Run \\\`npx eslint .\\\` and fix the errors."
done
\`\`\`

---

![w:900](images/ralph-loop.svg)

---

![w:900](images/goal-loop.svg)

---

# /loop

\`\`\`text
loop = cron
\`\`\`

---

![w:850](images/loop-harness.svg)

---

# Self improvement

Scheduled improvement loop:

\`\`\`text
/loop every day at 09:00
Digest yesterday's usage of the {XYZ} skill, identify recurring failures,
and propose and implement one concrete improvement.
\`\`\`

Per-session improvement loop:

\`\`\`bash
while session_id=$(agent run "$TASK"); do
  improve_from_session "$session_id"
done
\`\`\`

---

![w:1000](images/road-to-agi.svg)

---

# ROAD to AGI examples

- Few shot
- Chain of thought
- Tool use
- Todo / Planning
- Goal pursuit
- Self improvement (*)

---

![w:1000](images/road-to-agi-overview.svg)

---

![w:1000](images/agi-perspectives.svg)
`,D2=`---
marp: true
theme: default
paginate: true
header: "Spec Driven Development"
footer: "AIX Team"
title: Spec-Driven Development
date: 2026-05-19
abstract: The four pillars of spec-driven development — Specify, Validate, Restrict, Building Blocks — and how they reshape the way we build.
---

# Spec Driven Development

---

# The Old Way

![w:850](images/old-way.svg)

---

# The New Way

![w:850](images/new-way.svg)

---

# My Approach

> Instead of building the application,
> we build a **framework** where AI can build the applications for us.

---

# 4 Pillars

- **Specify**
- **Validate**
- **Restrict**
- **Building Blocks**

![w:350](images/pillars.svg)

---

![bg](images/lego-pieces.jpg)

<!-- _color: white -->

# Specify

---

![bg](images/puzzle-validate.jpg)

<!-- _color: white -->

# Validate

---

![bg](images/lego-restrict.jpg)

<!-- _color: white -->

# Restrict

---

![bg](images/lego-modular-buildings.jpeg)

<!-- _color: white -->

# Building Blocks

---

# The Framework

![w:1000](images/the-framework.svg)

---

# Black Boxes

![w:1000](images/black-boxes.svg)

---

# In numbers

![w:900](images/loc-by-provenance.svg)

![w:900](images/loc-by-provenance-agent.svg)

---

# Others are circling the same problem

- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [Grill me](https://github.com/mattpocock/skills)

---

# Spec Kit: how it works

![w:1000](images/spec-kit-steps.svg)

---

# Exercises

Let's build a spec-driven backend, one layer at a time.

---

# 1 · Bootstrap

<style scoped>
section { font-size: 22px; }
h1 { font-size: 32px; }
</style>

- Check out the codebase
- Start the server
- Run the script that hits the endpoint

\`\`\`bash
git clone git@github.com:emartech/change-delegation-workshop-app.git
cd change-delegation-workshop-app
npm install
npm start                  # in one shell
npm run guard:manual       # in another
\`\`\`

*Baseline: a hand-written server that works.*

---

# 2 · Specify the API surface

<style scoped>
section { font-size: 22px; }
h1 { font-size: 32px; }
</style>

- Read the OpenAPI spec
- Run **Schemathesis** against the running server
- Watch property-based fuzz find what hand-written tests miss

**Schemathesis flags worth knowing**

- \`--url\` — base URL of the running server
- \`--phases examples,coverage,fuzzing\` — skip stateful, keep the deterministic + fuzz phases
- \`--seed 42\` — reproducible runs
- \`--workers auto\` — sane defaults
- Bundle/deref the spec first (\`redocly bundle -d\`) — Schemathesis 4.x chokes on cross-file \`$ref\`

*The spec is now a contract — not a doc.*

---

# 3 · Specify the workflows

<style scoped>
section { font-size: 22px; }
h1 { font-size: 32px; }
</style>

- Write an **Arazzo** spec connecting the two endpoints
- Use **Redocly Respect** to execute it against the server
- Wrap it in a script

**Redocly Respect flags**

- \`--server <url>\` — override the spec's \`servers:\` for the live run
- The OpenAPI spec **must declare \`servers:\`** — Respect refuses to run otherwise
- Pin Arazzo \`1.0.1\` (Respect warns on \`1.0.0\`)

*Multi-step business flows are now executable.*

---

# 4 · Generate the types

<style scoped>
section { font-size: 22px; }
h1 { font-size: 32px; }
</style>

- Wire up **Kubb** to read \`specs/openapi.yaml\`
- Emit Zod schemas + TS types into \`src/zod/\` and \`src/types/\`
- Replace the hand-written validators with the generated ones

**Kubb plugins worth knowing**

- \`@kubb/plugin-oas\` — reads + validates the OpenAPI spec (must run first)
- \`@kubb/plugin-zod\` — emits Zod schemas (request bodies, params, per-status responses)
- \`@kubb/plugin-ts\` — emits TypeScript interfaces for every component schema

**Plugin options that bite**

- \`version: "4"\` — pin Zod v4 explicitly; auto-detect can fall back to v3 and break
- \`typed: false\` — keeps the \`ZodObject\` brand \`@hono/zod-openapi\` needs
- \`wrapOutput\` — append \`.strict()\` for objects with \`additionalProperties: false\`
  (without it, Zod v4 silently strips unknown keys — contract drift)

*Smallest possible step — just schemas + types, no behaviour.*

---

# 5 · Generate the server

<style scoped>
section { font-size: 22px; }
h1 { font-size: 32px; }
</style>

\`src/routes.ts\`, \`src/app.ts\`, \`src/start.ts\` are already in the repo.
Write the generator that produces them from \`specs/openapi.yaml\`.

**What your generator needs to do**

- Parse the OpenAPI YAML, walk every \`paths.<path>.<method>\` entry
- For each operation, render a \`createRoute({...})\` block referencing the
  Zod schemas Kubb already emitted (\`<op>MutationRequestSchema\`, \`<op><status>Schema\`)
- Walk operations again to wire \`app.openapi(<op>Route, <op>Handler)\` and
  emit one \`app.all(<path>, ...)\` block per path for the 405 fallback
- Stamp out the boilerplate (\`defaultHook\`, \`notFound\`, \`onError\`, \`app.doc\`)
- Write \`start.ts\` — three lines that boot \`buildApp()\`

**Hints**

- OpenAPI uses \`{id}\`, Hono uses \`:id\` — transform the path
- Each path's \`Allow:\` header is the documented methods plus \`OPTIONS\` (and \`HEAD\` if \`GET\`)
- Run **after** Kubb so the schema names exist when \`routes.ts\` imports them

*Boilerplate is now derived. Only business logic is hand-written.*

---

# 6 · Hand the glue to the AI

- Ask the AI to implement the action handlers
- Wire up the guards as npm scripts:
  - \`npm run guard\`
  - \`npm run guard:typecheck\`  — \`tsc --noEmit\`
  - \`npm run guard:contract\`  — Schemathesis vs. OpenAPI
  - \`npm run guard:workflow\`  — Respect vs. Arazzo
- The AI iterates until every guard is green

*The framework constrains what the AI can ship.*

`,R2=Object.assign({"../../presentations/agent-development/agent-development.presentation.md":I2,"../../presentations/kb-agentic-search/kb-agentic-search.presentation.md":E2,"../../presentations/kb-embedding/kb-embedding.presentation.md":L2,"../../presentations/kb-intro/kb-intro.presentation.md":O2,"../../presentations/kb-karpathy-wiki/kb-karpathy-wiki.presentation.md":N2,"../../presentations/kb-knowledge-engine/kb-knowledge-engine.presentation.md":P2,"../../presentations/loop-engineering/loop-engineering.presentation.md":B2,"../../presentations/spec-driven-development/spec-driven-development.presentation.md":D2});function M2(e){const t=e.match(/\/presentations\/([^/]+)\/[^/]+\.presentation\.md$/);return t?t[1]:e}function $2(e){const t=e.match(/^---\r?\n([\s\S]*?)\r?\n---/);if(!t)return{};try{return Jv(t[1])??{}}catch{return{}}}function j2(e){return e.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}const Of=Object.entries(R2).map(([e,t])=>{const n=M2(e),s=$2(t);return{slug:n,title:s.title??j2(n),date:s.date,abstract:s.abstract,unlisted:s.unlisted===!0,href:`presentations/${n}/${n}.presentation.html`}}).filter(e=>!e.unlisted).sort((e,t)=>(t.date??"").localeCompare(e.date??"")),V2={class:"d-flex align-center ga-3"},F2={key:0,class:"text-caption text-medium-emphasis"},W2=Ct({__name:"PresentationsPage",setup(e){function t(s){if(!s)return"";const a=new Date(s);return Number.isNaN(a.getTime())?s:a.toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}function n(s){return`${"/".replace(/\/$/,"")}/${s}`}return(s,a)=>(B(),H("div",null,[a[1]||(a[1]=b("div",{class:"mb-6"},[b("h1",{class:"text-h4 font-weight-bold mb-2"},"🎤 Presentations"),b("p",{class:"text-body-1 text-medium-emphasis"}," Slide decks from team sessions and external talks. Each opens in a new tab. ")],-1)),zt(Of).length===0?(B(),Ge(Ms,{key:0,type:"info",variant:"tonal",density:"compact"},{default:D(()=>[...a[0]||(a[0]=[K(" No presentations yet. Drop one under ",-1),b("code",null,"portal/presentations/<slug>/<slug>.presentation.md",-1),K(". ",-1)])]),_:1})):(B(),Ge(bs,{key:1,lines:"two",class:"bg-transparent pa-0"},{default:D(()=>[(B(!0),H(ce,null,qe(zt(Of),i=>(B(),Ge(_n,{key:i.slug,href:n(i.href),target:"_blank",rel:"noopener",title:i.title,subtitle:i.abstract,rounded:"lg",border:"",class:"mb-2"},{prepend:D(()=>[S(Ke,{icon:"mdi-presentation",class:"mr-2"})]),append:D(()=>[b("div",V2,[i.date?(B(),H("span",F2,V(t(i.date)),1)):Ee("",!0),S(Ke,{icon:"mdi-open-in-new",size:"small"})])]),_:2},1032,["href","title","subtitle"]))),128))]),_:1}))]))}}),H2=Ct({__name:"GherkinListPage",setup(e){const t=N(()=>el);return(n,s)=>(B(),H("div",null,[S(ht,{to:"/specifications",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...s[0]||(s[0]=[K(" Back to specifications ",-1)])]),_:1}),s[2]||(s[2]=b("div",{class:"mb-6"},[b("h1",{class:"text-h4 font-weight-bold mb-2"}," ✅ Gherkin features "),b("p",{class:"text-body-1 text-medium-emphasis"}," Behaviour-driven scenarios in Gherkin syntax. ")],-1)),S(bs,{lines:"two",class:"bg-transparent pa-0"},{default:D(()=>[(B(!0),H(ce,null,qe(t.value,a=>(B(),Ge(_n,{key:a.slug,to:`/specifications/gherkin/${a.slug}`,title:a.title,subtitle:a.sourcePath,rounded:"lg",border:"",class:"mb-2"},{prepend:D(()=>[S(Ke,{color:"success"},{default:D(()=>[...s[1]||(s[1]=[K("mdi-checkbox-marked-circle-outline",-1)])]),_:1})]),_:1},8,["to","title","subtitle"]))),128))]),_:1})]))}});function q2(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Hl,Nf;function z2(){if(Nf)return Hl;Nf=1;function e(L){return L instanceof Map?L.clear=L.delete=L.set=function(){throw new Error("map is read-only")}:L instanceof Set&&(L.add=L.clear=L.delete=function(){throw new Error("set is read-only")}),Object.freeze(L),Object.getOwnPropertyNames(L).forEach(U=>{const le=L[U],je=typeof le;(je==="object"||je==="function")&&!Object.isFrozen(le)&&e(le)}),L}class t{constructor(U){U.data===void 0&&(U.data={}),this.data=U.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function n(L){return L.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function s(L,...U){const le=Object.create(null);for(const je in L)le[je]=L[je];return U.forEach(function(je){for(const kt in je)le[kt]=je[kt]}),le}const a="</span>",i=L=>!!L.scope,o=(L,{prefix:U})=>{if(L.startsWith("language:"))return L.replace("language:","language-");if(L.includes(".")){const le=L.split(".");return[`${U}${le.shift()}`,...le.map((je,kt)=>`${je}${"_".repeat(kt+1)}`)].join(" ")}return`${U}${L}`};class r{constructor(U,le){this.buffer="",this.classPrefix=le.classPrefix,U.walk(this)}addText(U){this.buffer+=n(U)}openNode(U){if(!i(U))return;const le=o(U.scope,{prefix:this.classPrefix});this.span(le)}closeNode(U){i(U)&&(this.buffer+=a)}value(){return this.buffer}span(U){this.buffer+=`<span class="${U}">`}}const l=(L={})=>{const U={children:[]};return Object.assign(U,L),U};class u{constructor(){this.rootNode=l(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(U){this.top.children.push(U)}openNode(U){const le=l({scope:U});this.add(le),this.stack.push(le)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(U){return this.constructor._walk(U,this.rootNode)}static _walk(U,le){return typeof le=="string"?U.addText(le):le.children&&(U.openNode(le),le.children.forEach(je=>this._walk(U,je)),U.closeNode(le)),U}static _collapse(U){typeof U!="string"&&U.children&&(U.children.every(le=>typeof le=="string")?U.children=[U.children.join("")]:U.children.forEach(le=>{u._collapse(le)}))}}class d extends u{constructor(U){super(),this.options=U}addText(U){U!==""&&this.add(U)}startScope(U){this.openNode(U)}endScope(){this.closeNode()}__addSublanguage(U,le){const je=U.root;le&&(je.scope=`language:${le}`),this.add(je)}toHTML(){return new r(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function h(L){return L?typeof L=="string"?L:L.source:null}function f(L){return m("(?=",L,")")}function p(L){return m("(?:",L,")*")}function g(L){return m("(?:",L,")?")}function m(...L){return L.map(le=>h(le)).join("")}function v(L){const U=L[L.length-1];return typeof U=="object"&&U.constructor===Object?(L.splice(L.length-1,1),U):{}}function y(...L){return"("+(v(L).capture?"":"?:")+L.map(je=>h(je)).join("|")+")"}function w(L){return new RegExp(L.toString()+"|").exec("").length-1}function x(L,U){const le=L&&L.exec(U);return le&&le.index===0}const T=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function C(L,{joinWith:U}){let le=0;return L.map(je=>{le+=1;const kt=le;let St=h(je),ye="";for(;St.length>0;){const he=T.exec(St);if(!he){ye+=St;break}ye+=St.substring(0,he.index),St=St.substring(he.index+he[0].length),he[0][0]==="\\"&&he[1]?ye+="\\"+String(Number(he[1])+kt):(ye+=he[0],he[0]==="("&&le++)}return ye}).map(je=>`(${je})`).join(U)}const _=/\b\B/,I="[a-zA-Z]\\w*",k="[a-zA-Z_]\\w*",O="\\b\\d+(\\.\\d+)?",$="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",q="\\b(0b[01]+)",R="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",z=(L={})=>{const U=/^#![ ]*\//;return L.binary&&(L.begin=m(U,/.*\b/,L.binary,/\b.*/)),s({scope:"meta",begin:U,end:/$/,relevance:0,"on:begin":(le,je)=>{le.index!==0&&je.ignoreMatch()}},L)},se={begin:"\\\\[\\s\\S]",relevance:0},re={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[se]},we={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[se]},me={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ge=function(L,U,le={}){const je=s({scope:"comment",begin:L,end:U,contains:[]},le);je.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const kt=y("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return je.contains.push({begin:m(/[ ]+/,"(",kt,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),je},Ze=ge("//","$"),Ve=ge("/\\*","\\*/"),Se=ge("#","$"),X={scope:"number",begin:O,relevance:0},J={scope:"number",begin:$,relevance:0},Ie={scope:"number",begin:q,relevance:0},mt={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[se,{begin:/\[/,end:/\]/,relevance:0,contains:[se]}]},it={scope:"title",begin:I,relevance:0},M={scope:"title",begin:k,relevance:0},Z={begin:"\\.\\s*"+k,relevance:0};var Q=Object.freeze({__proto__:null,APOS_STRING_MODE:re,BACKSLASH_ESCAPE:se,BINARY_NUMBER_MODE:Ie,BINARY_NUMBER_RE:q,COMMENT:ge,C_BLOCK_COMMENT_MODE:Ve,C_LINE_COMMENT_MODE:Ze,C_NUMBER_MODE:J,C_NUMBER_RE:$,END_SAME_AS_BEGIN:function(L){return Object.assign(L,{"on:begin":(U,le)=>{le.data._beginMatch=U[1]},"on:end":(U,le)=>{le.data._beginMatch!==U[1]&&le.ignoreMatch()}})},HASH_COMMENT_MODE:Se,IDENT_RE:I,MATCH_NOTHING_RE:_,METHOD_GUARD:Z,NUMBER_MODE:X,NUMBER_RE:O,PHRASAL_WORDS_MODE:me,QUOTE_STRING_MODE:we,REGEXP_MODE:mt,RE_STARTERS_RE:R,SHEBANG:z,TITLE_MODE:it,UNDERSCORE_IDENT_RE:k,UNDERSCORE_TITLE_MODE:M});function Ae(L,U){L.input[L.index-1]==="."&&U.ignoreMatch()}function A(L,U){L.className!==void 0&&(L.scope=L.className,delete L.className)}function E(L,U){U&&L.beginKeywords&&(L.begin="\\b("+L.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",L.__beforeBegin=Ae,L.keywords=L.keywords||L.beginKeywords,delete L.beginKeywords,L.relevance===void 0&&(L.relevance=0))}function P(L,U){Array.isArray(L.illegal)&&(L.illegal=y(...L.illegal))}function F(L,U){if(L.match){if(L.begin||L.end)throw new Error("begin & end are not supported with match");L.begin=L.match,delete L.match}}function G(L,U){L.relevance===void 0&&(L.relevance=1)}const W=(L,U)=>{if(!L.beforeMatch)return;if(L.starts)throw new Error("beforeMatch cannot be used with starts");const le=Object.assign({},L);Object.keys(L).forEach(je=>{delete L[je]}),L.keywords=le.keywords,L.begin=m(le.beforeMatch,f(le.begin)),L.starts={relevance:0,contains:[Object.assign(le,{endsParent:!0})]},L.relevance=0,delete le.beforeMatch},te=["of","and","for","in","not","or","if","then","parent","list","value"],oe="keyword";function ie(L,U,le=oe){const je=Object.create(null);return typeof L=="string"?kt(le,L.split(" ")):Array.isArray(L)?kt(le,L):Object.keys(L).forEach(function(St){Object.assign(je,ie(L[St],U,St))}),je;function kt(St,ye){U&&(ye=ye.map(he=>he.toLowerCase())),ye.forEach(function(he){const Re=he.split("|");je[Re[0]]=[St,Y(Re[0],Re[1])]})}}function Y(L,U){return U?Number(U):Ce(L)?0:1}function Ce(L){return te.includes(L.toLowerCase())}const de={},ve=L=>{console.error(L)},Ne=(L,...U)=>{console.log(`WARN: ${L}`,...U)},ze=(L,U)=>{de[`${L}/${U}`]||(console.log(`Deprecated as of ${L}. ${U}`),de[`${L}/${U}`]=!0)},Qe=new Error;function st(L,U,{key:le}){let je=0;const kt=L[le],St={},ye={};for(let he=1;he<=U.length;he++)ye[he+je]=kt[he],St[he+je]=!0,je+=w(U[he-1]);L[le]=ye,L[le]._emit=St,L[le]._multi=!0}function yt(L){if(Array.isArray(L.begin)){if(L.skip||L.excludeBegin||L.returnBegin)throw ve("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Qe;if(typeof L.beginScope!="object"||L.beginScope===null)throw ve("beginScope must be object"),Qe;st(L,L.begin,{key:"beginScope"}),L.begin=C(L.begin,{joinWith:""})}}function Ot(L){if(Array.isArray(L.end)){if(L.skip||L.excludeEnd||L.returnEnd)throw ve("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Qe;if(typeof L.endScope!="object"||L.endScope===null)throw ve("endScope must be object"),Qe;st(L,L.end,{key:"endScope"}),L.end=C(L.end,{joinWith:""})}}function yn(L){L.scope&&typeof L.scope=="object"&&L.scope!==null&&(L.beginScope=L.scope,delete L.scope)}function bn(L){yn(L),typeof L.beginScope=="string"&&(L.beginScope={_wrap:L.beginScope}),typeof L.endScope=="string"&&(L.endScope={_wrap:L.endScope}),yt(L),Ot(L)}function Hs(L){function U(ye,he){return new RegExp(h(ye),"m"+(L.case_insensitive?"i":"")+(L.unicodeRegex?"u":"")+(he?"g":""))}class le{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(he,Re){Re.position=this.position++,this.matchIndexes[this.matchAt]=Re,this.regexes.push([Re,he]),this.matchAt+=w(he)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const he=this.regexes.map(Re=>Re[1]);this.matcherRe=U(C(he,{joinWith:"|"}),!0),this.lastIndex=0}exec(he){this.matcherRe.lastIndex=this.lastIndex;const Re=this.matcherRe.exec(he);if(!Re)return null;const $t=Re.findIndex((li,al)=>al>0&&li!==void 0),Tt=this.matchIndexes[$t];return Re.splice(0,$t),Object.assign(Re,Tt)}}class je{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(he){if(this.multiRegexes[he])return this.multiRegexes[he];const Re=new le;return this.rules.slice(he).forEach(([$t,Tt])=>Re.addRule($t,Tt)),Re.compile(),this.multiRegexes[he]=Re,Re}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(he,Re){this.rules.push([he,Re]),Re.type==="begin"&&this.count++}exec(he){const Re=this.getMatcher(this.regexIndex);Re.lastIndex=this.lastIndex;let $t=Re.exec(he);if(this.resumingScanAtSamePosition()&&!($t&&$t.index===this.lastIndex)){const Tt=this.getMatcher(0);Tt.lastIndex=this.lastIndex+1,$t=Tt.exec(he)}return $t&&(this.regexIndex+=$t.position+1,this.regexIndex===this.count&&this.considerAll()),$t}}function kt(ye){const he=new je;return ye.contains.forEach(Re=>he.addRule(Re.begin,{rule:Re,type:"begin"})),ye.terminatorEnd&&he.addRule(ye.terminatorEnd,{type:"end"}),ye.illegal&&he.addRule(ye.illegal,{type:"illegal"}),he}function St(ye,he){const Re=ye;if(ye.isCompiled)return Re;[A,F,bn,W].forEach(Tt=>Tt(ye,he)),L.compilerExtensions.forEach(Tt=>Tt(ye,he)),ye.__beforeBegin=null,[E,P,G].forEach(Tt=>Tt(ye,he)),ye.isCompiled=!0;let $t=null;return typeof ye.keywords=="object"&&ye.keywords.$pattern&&(ye.keywords=Object.assign({},ye.keywords),$t=ye.keywords.$pattern,delete ye.keywords.$pattern),$t=$t||/\w+/,ye.keywords&&(ye.keywords=ie(ye.keywords,L.case_insensitive)),Re.keywordPatternRe=U($t,!0),he&&(ye.begin||(ye.begin=/\B|\b/),Re.beginRe=U(Re.begin),!ye.end&&!ye.endsWithParent&&(ye.end=/\B|\b/),ye.end&&(Re.endRe=U(Re.end)),Re.terminatorEnd=h(Re.end)||"",ye.endsWithParent&&he.terminatorEnd&&(Re.terminatorEnd+=(ye.end?"|":"")+he.terminatorEnd)),ye.illegal&&(Re.illegalRe=U(ye.illegal)),ye.contains||(ye.contains=[]),ye.contains=[].concat(...ye.contains.map(function(Tt){return Yt(Tt==="self"?ye:Tt)})),ye.contains.forEach(function(Tt){St(Tt,Re)}),ye.starts&&St(ye.starts,he),Re.matcher=kt(Re),Re}if(L.compilerExtensions||(L.compilerExtensions=[]),L.contains&&L.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return L.classNameAliases=s(L.classNameAliases||{}),St(L)}function ri(L){return L?L.endsWithParent||ri(L.starts):!1}function Yt(L){return L.variants&&!L.cachedVariants&&(L.cachedVariants=L.variants.map(function(U){return s(L,{variants:null},U)})),L.cachedVariants?L.cachedVariants:ri(L)?s(L,{starts:L.starts?s(L.starts):null}):Object.isFrozen(L)?s(L):L}var wn="11.11.1";class yo extends Error{constructor(U,le){super(U),this.name="HTMLInjectionError",this.html=le}}const ga=n,Vu=s,Fu=Symbol("nomatch"),dy=7,Wu=function(L){const U=Object.create(null),le=Object.create(null),je=[];let kt=!0;const St="Could not find the language '{}', did you forget to load/include a language module?",ye={disableAutodetect:!0,name:"Plain text",contains:[]};let he={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:d};function Re(ne){return he.noHighlightRe.test(ne)}function $t(ne){let _e=ne.className+" ";_e+=ne.parentNode?ne.parentNode.className:"";const Ye=he.languageDetectRe.exec(_e);if(Ye){const ct=_s(Ye[1]);return ct||(Ne(St.replace("{}",Ye[1])),Ne("Falling back to no-highlight mode for this block.",ne)),ct?Ye[1]:"no-highlight"}return _e.split(/\s+/).find(ct=>Re(ct)||_s(ct))}function Tt(ne,_e,Ye){let ct="",Nt="";typeof _e=="object"?(ct=ne,Ye=_e.ignoreIllegals,Nt=_e.language):(ze("10.7.0","highlight(lang, code, ...args) has been deprecated."),ze("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),Nt=ne,ct=_e),Ye===void 0&&(Ye=!0);const Ln={code:ct,language:Nt};wo("before:highlight",Ln);const As=Ln.result?Ln.result:li(Ln.language,Ln.code,Ye);return As.code=Ln.code,wo("after:highlight",As),As}function li(ne,_e,Ye,ct){const Nt=Object.create(null);function Ln(ue,xe){return ue.keywords[xe]}function As(){if(!Fe.keywords){Ft.addText(ut);return}let ue=0;Fe.keywordPatternRe.lastIndex=0;let xe=Fe.keywordPatternRe.exec(ut),Ue="";for(;xe;){Ue+=ut.substring(ue,xe.index);const at=zn.case_insensitive?xe[0].toLowerCase():xe[0],Wt=Ln(Fe,at);if(Wt){const[is,Iy]=Wt;if(Ft.addText(Ue),Ue="",Nt[at]=(Nt[at]||0)+1,Nt[at]<=dy&&(xo+=Iy),is.startsWith("_"))Ue+=xe[0];else{const Ey=zn.classNameAliases[is]||is;qn(xe[0],Ey)}}else Ue+=xe[0];ue=Fe.keywordPatternRe.lastIndex,xe=Fe.keywordPatternRe.exec(ut)}Ue+=ut.substring(ue),Ft.addText(Ue)}function ko(){if(ut==="")return;let ue=null;if(typeof Fe.subLanguage=="string"){if(!U[Fe.subLanguage]){Ft.addText(ut);return}ue=li(Fe.subLanguage,ut,!0,Xu[Fe.subLanguage]),Xu[Fe.subLanguage]=ue._top}else ue=il(ut,Fe.subLanguage.length?Fe.subLanguage:null);Fe.relevance>0&&(xo+=ue.relevance),Ft.__addSublanguage(ue._emitter,ue.language)}function on(){Fe.subLanguage!=null?ko():As(),ut=""}function qn(ue,xe){ue!==""&&(Ft.startScope(xe),Ft.addText(ue),Ft.endScope())}function Uu(ue,xe){let Ue=1;const at=xe.length-1;for(;Ue<=at;){if(!ue._emit[Ue]){Ue++;continue}const Wt=zn.classNameAliases[ue[Ue]]||ue[Ue],is=xe[Ue];Wt?qn(is,Wt):(ut=is,As(),ut=""),Ue++}}function Gu(ue,xe){return ue.scope&&typeof ue.scope=="string"&&Ft.openNode(zn.classNameAliases[ue.scope]||ue.scope),ue.beginScope&&(ue.beginScope._wrap?(qn(ut,zn.classNameAliases[ue.beginScope._wrap]||ue.beginScope._wrap),ut=""):ue.beginScope._multi&&(Uu(ue.beginScope,xe),ut="")),Fe=Object.create(ue,{parent:{value:Fe}}),Fe}function Ku(ue,xe,Ue){let at=x(ue.endRe,Ue);if(at){if(ue["on:end"]){const Wt=new t(ue);ue["on:end"](xe,Wt),Wt.isMatchIgnored&&(at=!1)}if(at){for(;ue.endsParent&&ue.parent;)ue=ue.parent;return ue}}if(ue.endsWithParent)return Ku(ue.parent,xe,Ue)}function xy(ue){return Fe.matcher.regexIndex===0?(ut+=ue[0],1):(cl=!0,0)}function _y(ue){const xe=ue[0],Ue=ue.rule,at=new t(Ue),Wt=[Ue.__beforeBegin,Ue["on:begin"]];for(const is of Wt)if(is&&(is(ue,at),at.isMatchIgnored))return xy(xe);return Ue.skip?ut+=xe:(Ue.excludeBegin&&(ut+=xe),on(),!Ue.returnBegin&&!Ue.excludeBegin&&(ut=xe)),Gu(Ue,ue),Ue.returnBegin?0:xe.length}function Ay(ue){const xe=ue[0],Ue=_e.substring(ue.index),at=Ku(Fe,ue,Ue);if(!at)return Fu;const Wt=Fe;Fe.endScope&&Fe.endScope._wrap?(on(),qn(xe,Fe.endScope._wrap)):Fe.endScope&&Fe.endScope._multi?(on(),Uu(Fe.endScope,ue)):Wt.skip?ut+=xe:(Wt.returnEnd||Wt.excludeEnd||(ut+=xe),on(),Wt.excludeEnd&&(ut=xe));do Fe.scope&&Ft.closeNode(),!Fe.skip&&!Fe.subLanguage&&(xo+=Fe.relevance),Fe=Fe.parent;while(Fe!==at.parent);return at.starts&&Gu(at.starts,ue),Wt.returnEnd?0:xe.length}function Cy(){const ue=[];for(let xe=Fe;xe!==zn;xe=xe.parent)xe.scope&&ue.unshift(xe.scope);ue.forEach(xe=>Ft.openNode(xe))}let So={};function Yu(ue,xe){const Ue=xe&&xe[0];if(ut+=ue,Ue==null)return on(),0;if(So.type==="begin"&&xe.type==="end"&&So.index===xe.index&&Ue===""){if(ut+=_e.slice(xe.index,xe.index+1),!kt){const at=new Error(`0 width match regex (${ne})`);throw at.languageName=ne,at.badRule=So.rule,at}return 1}if(So=xe,xe.type==="begin")return _y(xe);if(xe.type==="illegal"&&!Ye){const at=new Error('Illegal lexeme "'+Ue+'" for mode "'+(Fe.scope||"<unnamed>")+'"');throw at.mode=Fe,at}else if(xe.type==="end"){const at=Ay(xe);if(at!==Fu)return at}if(xe.type==="illegal"&&Ue==="")return ut+=`
`,1;if(ll>1e5&&ll>xe.index*3)throw new Error("potential infinite loop, way more iterations than matches");return ut+=Ue,Ue.length}const zn=_s(ne);if(!zn)throw ve(St.replace("{}",ne)),new Error('Unknown language: "'+ne+'"');const Ty=Hs(zn);let rl="",Fe=ct||Ty;const Xu={},Ft=new he.__emitter(he);Cy();let ut="",xo=0,qs=0,ll=0,cl=!1;try{if(zn.__emitTokens)zn.__emitTokens(_e,Ft);else{for(Fe.matcher.considerAll();;){ll++,cl?cl=!1:Fe.matcher.considerAll(),Fe.matcher.lastIndex=qs;const ue=Fe.matcher.exec(_e);if(!ue)break;const xe=_e.substring(qs,ue.index),Ue=Yu(xe,ue);qs=ue.index+Ue}Yu(_e.substring(qs))}return Ft.finalize(),rl=Ft.toHTML(),{language:ne,value:rl,relevance:xo,illegal:!1,_emitter:Ft,_top:Fe}}catch(ue){if(ue.message&&ue.message.includes("Illegal"))return{language:ne,value:ga(_e),illegal:!0,relevance:0,_illegalBy:{message:ue.message,index:qs,context:_e.slice(qs-100,qs+100),mode:ue.mode,resultSoFar:rl},_emitter:Ft};if(kt)return{language:ne,value:ga(_e),illegal:!1,relevance:0,errorRaised:ue,_emitter:Ft,_top:Fe};throw ue}}function al(ne){const _e={value:ga(ne),illegal:!1,relevance:0,_top:ye,_emitter:new he.__emitter(he)};return _e._emitter.addText(ne),_e}function il(ne,_e){_e=_e||he.languages||Object.keys(U);const Ye=al(ne),ct=_e.filter(_s).filter(zu).map(on=>li(on,ne,!1));ct.unshift(Ye);const Nt=ct.sort((on,qn)=>{if(on.relevance!==qn.relevance)return qn.relevance-on.relevance;if(on.language&&qn.language){if(_s(on.language).supersetOf===qn.language)return 1;if(_s(qn.language).supersetOf===on.language)return-1}return 0}),[Ln,As]=Nt,ko=Ln;return ko.secondBest=As,ko}function hy(ne,_e,Ye){const ct=_e&&le[_e]||Ye;ne.classList.add("hljs"),ne.classList.add(`language-${ct}`)}function ol(ne){let _e=null;const Ye=$t(ne);if(Re(Ye))return;if(wo("before:highlightElement",{el:ne,language:Ye}),ne.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",ne);return}if(ne.children.length>0&&(he.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(ne)),he.throwUnescapedHTML))throw new yo("One of your code blocks includes unescaped HTML.",ne.innerHTML);_e=ne;const ct=_e.textContent,Nt=Ye?Tt(ct,{language:Ye,ignoreIllegals:!0}):il(ct);ne.innerHTML=Nt.value,ne.dataset.highlighted="yes",hy(ne,Ye,Nt.language),ne.result={language:Nt.language,re:Nt.relevance,relevance:Nt.relevance},Nt.secondBest&&(ne.secondBest={language:Nt.secondBest.language,relevance:Nt.secondBest.relevance}),wo("after:highlightElement",{el:ne,result:Nt,text:ct})}function fy(ne){he=Vu(he,ne)}const py=()=>{bo(),ze("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function my(){bo(),ze("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let Hu=!1;function bo(){function ne(){bo()}if(document.readyState==="loading"){Hu||window.addEventListener("DOMContentLoaded",ne,!1),Hu=!0;return}document.querySelectorAll(he.cssSelector).forEach(ol)}function gy(ne,_e){let Ye=null;try{Ye=_e(L)}catch(ct){if(ve("Language definition for '{}' could not be registered.".replace("{}",ne)),kt)ve(ct);else throw ct;Ye=ye}Ye.name||(Ye.name=ne),U[ne]=Ye,Ye.rawDefinition=_e.bind(null,L),Ye.aliases&&qu(Ye.aliases,{languageName:ne})}function vy(ne){delete U[ne];for(const _e of Object.keys(le))le[_e]===ne&&delete le[_e]}function yy(){return Object.keys(U)}function _s(ne){return ne=(ne||"").toLowerCase(),U[ne]||U[le[ne]]}function qu(ne,{languageName:_e}){typeof ne=="string"&&(ne=[ne]),ne.forEach(Ye=>{le[Ye.toLowerCase()]=_e})}function zu(ne){const _e=_s(ne);return _e&&!_e.disableAutodetect}function by(ne){ne["before:highlightBlock"]&&!ne["before:highlightElement"]&&(ne["before:highlightElement"]=_e=>{ne["before:highlightBlock"](Object.assign({block:_e.el},_e))}),ne["after:highlightBlock"]&&!ne["after:highlightElement"]&&(ne["after:highlightElement"]=_e=>{ne["after:highlightBlock"](Object.assign({block:_e.el},_e))})}function wy(ne){by(ne),je.push(ne)}function ky(ne){const _e=je.indexOf(ne);_e!==-1&&je.splice(_e,1)}function wo(ne,_e){const Ye=ne;je.forEach(function(ct){ct[Ye]&&ct[Ye](_e)})}function Sy(ne){return ze("10.7.0","highlightBlock will be removed entirely in v12.0"),ze("10.7.0","Please use highlightElement now."),ol(ne)}Object.assign(L,{highlight:Tt,highlightAuto:il,highlightAll:bo,highlightElement:ol,highlightBlock:Sy,configure:fy,initHighlighting:py,initHighlightingOnLoad:my,registerLanguage:gy,unregisterLanguage:vy,listLanguages:yy,getLanguage:_s,registerAliases:qu,autoDetection:zu,inherit:Vu,addPlugin:wy,removePlugin:ky}),L.debugMode=function(){kt=!1},L.safeMode=function(){kt=!0},L.versionString=wn,L.regex={concat:m,lookahead:f,either:y,optional:g,anyNumberOfTimes:p};for(const ne in Q)typeof Q[ne]=="object"&&e(Q[ne]);return Object.assign(L,Q),L},va=Wu({});return va.newInstance=()=>Wu({}),Hl=va,va.HighlightJS=va,va.default=va,Hl}var U2=z2();const Pf=q2(U2);function G2(e){return{name:"Gherkin",aliases:["feature"],keywords:"Feature Background Ability Business Need Scenario Scenarios Scenario Outline Scenario Template Examples Given And Then But When",contains:[{className:"symbol",begin:"\\*",relevance:0},{className:"meta",begin:"@[^@\\s]+"},{begin:"\\|",end:"\\|\\w*$",contains:[{className:"string",begin:"[^|]+"}]},{className:"variable",begin:"<",end:">"},e.HASH_COMMENT_MODE,{className:"string",begin:'"""',end:'"""'},e.QUOTE_STRING_MODE]}}const K2={key:0},Y2={class:"mb-6"},X2={class:"text-h4 font-weight-bold mb-2"},J2={class:"text-caption text-medium-emphasis"},Q2={class:"hljs language-gherkin"},Z2=["innerHTML"],eE={class:"mt-2"},tE=Ct({__name:"GherkinDetailPage",props:{slug:{}},setup(e){Pf.registerLanguage("gherkin",G2);const t=e,n=N(()=>HT(t.slug)),s=N(()=>n.value?Pf.highlight(n.value.raw,{language:"gherkin"}).value:"");return(a,i)=>n.value?(B(),H("div",K2,[S(ht,{to:"/specifications/gherkin",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...i[0]||(i[0]=[K(" Back to Gherkin features ",-1)])]),_:1}),b("div",Y2,[b("h1",X2,V(n.value.title),1),b("code",J2,V(n.value.sourcePath),1)]),S(ln,{variant:"outlined",class:"pa-4"},{default:D(()=>[b("pre",Q2,[b("code",{innerHTML:s.value},null,8,Z2)])]),_:1})])):(B(),Ge(Ms,{key:1,type:"error",variant:"tonal",icon:"mdi-alert-circle-outline"},{default:D(()=>[i[2]||(i[2]=K(" No Gherkin feature found for slug ",-1)),b("code",null,V(e.slug),1),i[3]||(i[3]=K(". ",-1)),b("div",eE,[S(ht,{to:"/specifications/gherkin",variant:"text",size:"small",color:"primary"},{default:D(()=>[...i[1]||(i[1]=[K(" Back to list ",-1)])]),_:1})])]),_:1}))}}),nE=Ws(tE,[["__scopeId","data-v-f157bc1d"]]),sE=Ct({__name:"DomainsListPage",setup(e){const t=N(()=>tl);return(n,s)=>(B(),H("div",null,[S(ht,{to:"/specifications",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...s[0]||(s[0]=[K(" Back to specifications ",-1)])]),_:1}),s[2]||(s[2]=b("div",{class:"mb-6"},[b("h1",{class:"text-h4 font-weight-bold mb-2"},"🧊 Domain models"),b("p",{class:"text-body-1 text-medium-emphasis"}," JSON-Schema-typed entities the system passes around. ")],-1)),S(bs,{lines:"two",class:"bg-transparent pa-0"},{default:D(()=>[(B(!0),H(ce,null,qe(t.value,a=>(B(),Ge(_n,{key:a.slug,to:`/specifications/domains/${a.slug}`,title:a.title,subtitle:a.description??a.slug,rounded:"lg",border:"",class:"mb-2"},{prepend:D(()=>[S(Ke,{color:"info"},{default:D(()=>[...s[1]||(s[1]=[K("mdi-cube-outline",-1)])]),_:1})]),append:D(()=>[S(vt,{size:"x-small",variant:"tonal",color:"info"},{default:D(()=>[K(V(a.properties.length)+" props ",1)]),_:2},1024)]),_:2},1032,["to","title","subtitle"]))),128))]),_:1})]))}}),aE=ee({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,striped:{type:String,default:null,validator:e=>["even","odd"].includes(e)},...He(),...En(),...Je(),...Lt()},"VTable"),iE=ke()({name:"VTable",props:aE(),setup(e,t){let{slots:n,emit:s}=t;const{themeClasses:a}=Mt(e),{densityClasses:i}=Wn(e);return De(()=>S(e.tag,{class:fe(["v-table",{"v-table--fixed-height":!!e.height,"v-table--fixed-header":e.fixedHeader,"v-table--fixed-footer":e.fixedFooter,"v-table--has-top":!!n.top,"v-table--has-bottom":!!n.bottom,"v-table--hover":e.hover,"v-table--striped-even":e.striped==="even","v-table--striped-odd":e.striped==="odd"},a.value,i.value,e.class]),style:Be(e.style)},{default:()=>{var o,r,l;return[(o=n.top)==null?void 0:o.call(n),n.default?b("div",{class:"v-table__wrapper",style:{height:pe(e.height)}},[b("table",null,[n.default()])]):(r=n.wrapper)==null?void 0:r.call(n),(l=n.bottom)==null?void 0:l.call(n)]}})),{}}}),oE={key:0},rE={class:"mb-6"},lE={class:"text-h4 font-weight-bold mb-2"},cE={class:"text-caption text-medium-emphasis"},uE={key:0,class:"text-body-1 mt-3 mb-0"},dE={class:"text-caption"},hE={key:1,class:"text-medium-emphasis"},fE={class:"text-body-2"},pE={key:0,class:"text-caption text-medium-emphasis mt-1"},mE={key:1,class:"text-caption text-medium-emphasis mt-1"},gE={class:"text-body-2"},vE={class:"hljs language-json mt-2 pa-3"},yE={class:"mt-2"},bE=Ct({__name:"DomainDetailPage",props:{slug:{}},setup(e){const t=e,n=N(()=>UT(t.slug));function s(i){return i===void 0?"":typeof i=="string"?i:JSON.stringify(i)}function a(i){return!i||i.length===0?"":i.length<=4?i.map(o=>JSON.stringify(o)).join(", "):i.slice(0,4).map(o=>JSON.stringify(o)).join(", ")+` … (${i.length-4} more)`}return(i,o)=>n.value?(B(),H("div",oE,[S(ht,{to:"/specifications/domains",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...o[0]||(o[0]=[K(" Back to domain models ",-1)])]),_:1}),b("div",rE,[b("h1",lE,V(n.value.title),1),b("code",cE,V(n.value.slug)+".schema.json",1),n.value.description?(B(),H("p",uE,V(n.value.description),1)):Ee("",!0)]),S(ln,{variant:"outlined",class:"pa-0 mb-6"},{default:D(()=>[S(iE,{density:"comfortable"},{default:D(()=>[o[5]||(o[5]=b("thead",null,[b("tr",null,[b("th",null,"Property"),b("th",null,"Type"),b("th",null,"Required"),b("th",null,"Description")])],-1)),b("tbody",null,[(B(!0),H(ce,null,qe(n.value.properties,r=>(B(),H("tr",{key:r.name},[b("td",null,[b("code",null,V(r.name),1)]),b("td",null,[b("code",dE,V(r.type),1)]),b("td",null,[r.required?(B(),Ge(Ke,{key:0,color:"success",size:"small"},{default:D(()=>[...o[1]||(o[1]=[K(" mdi-check ",-1)])]),_:1})):(B(),H("span",hE,"—"))]),b("td",null,[b("div",fE,V(r.description??"—"),1),r.enum?(B(),H("div",pE,[o[2]||(o[2]=b("strong",null,"enum:",-1)),K(" "+V(a(r.enum)),1)])):Ee("",!0),r.example!==void 0?(B(),H("div",mE,[o[3]||(o[3]=b("strong",null,"example:",-1)),o[4]||(o[4]=K()),b("code",null,V(s(r.example)),1)])):Ee("",!0)])]))),128))])]),_:1})]),_:1}),b("details",gE,[o[6]||(o[6]=b("summary",{class:"text-medium-emphasis cursor-pointer"},"Raw JSON schema",-1)),b("pre",vE,[b("code",null,V(JSON.stringify(n.value.raw,null,2)),1)])])])):(B(),Ge(Ms,{key:1,type:"error",variant:"tonal",icon:"mdi-alert-circle-outline"},{default:D(()=>[o[8]||(o[8]=K(" No domain model found for slug ",-1)),b("code",null,V(e.slug),1),o[9]||(o[9]=K(". ",-1)),b("div",yE,[S(ht,{to:"/specifications/domains",variant:"text",size:"small",color:"primary"},{default:D(()=>[...o[7]||(o[7]=[K(" Back to list ",-1)])]),_:1})])]),_:1}))}}),wE=Ws(bE,[["__scopeId","data-v-05650576"]]),kE=Ct({__name:"AgentsListPage",setup(e){const t=N(()=>nl);return(n,s)=>(B(),H("div",null,[S(ht,{to:"/specifications",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...s[0]||(s[0]=[K(" Back to specifications ",-1)])]),_:1}),s[2]||(s[2]=b("div",{class:"mb-6"},[b("h1",{class:"text-h4 font-weight-bold mb-2"},"🤖 Agent cards"),b("p",{class:"text-body-1 text-medium-emphasis"}," Domain agents declared via agent cards: capabilities, skills, contracts. ")],-1)),S(bs,{lines:"two",class:"bg-transparent pa-0"},{default:D(()=>[(B(!0),H(ce,null,qe(t.value,a=>(B(),Ge(_n,{key:a.slug,to:`/specifications/agents/${a.slug}`,title:a.name,subtitle:a.description??a.sourcePath,rounded:"lg",border:"",class:"mb-2"},{prepend:D(()=>[S(Ke,{color:"accent"},{default:D(()=>[...s[1]||(s[1]=[K("mdi-robot-outline",-1)])]),_:1})]),_:1},8,["to","title","subtitle"]))),128))]),_:1})]))}}),SE={key:0},xE={class:"mb-6"},_E={class:"text-h4 font-weight-bold mb-2"},AE={class:"text-caption text-medium-emphasis"},CE={key:0,class:"text-body-1 mt-3 mb-0"},TE={class:"d-flex flex-wrap ga-2"},IE={class:"text-subtitle-1 font-weight-bold"},EE={class:"text-caption text-medium-emphasis"},LE={key:0,class:"text-body-2 mt-2 mb-3"},OE={key:1,class:"d-flex flex-wrap ga-1 mb-3"},NE={key:2,class:"mb-3"},PE={class:"text-body-2 pl-5"},BE={key:3},DE={class:"d-flex flex-wrap ga-2"},RE={class:"text-body-2 mt-4"},ME={class:"mt-2 pa-3"},$E={class:"mt-2"},jE=Ct({__name:"AgentDetailPage",props:{slug:{}},setup(e){const t=e,n=N(()=>YT(t.slug)),s=N(()=>{var o;const i=(o=n.value)==null?void 0:o.raw;return(i==null?void 0:i.skills)??[]}),a=N(()=>{var o;const i=(o=n.value)==null?void 0:o.raw;return(i==null?void 0:i.capabilities)??{}});return(i,o)=>n.value?(B(),H("div",SE,[S(ht,{to:"/specifications/agents",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...o[0]||(o[0]=[K(" Back to agent cards ",-1)])]),_:1}),b("div",xE,[b("h1",_E,V(n.value.name),1),b("code",AE,V(n.value.sourcePath),1),n.value.description?(B(),H("p",CE,V(n.value.description),1)):Ee("",!0)]),o[4]||(o[4]=b("h2",{class:"text-h6 font-weight-bold mb-3"},"Capabilities",-1)),S(ln,{variant:"outlined",class:"pa-4 mb-6"},{default:D(()=>[b("div",TE,[(B(!0),H(ce,null,qe(a.value,(r,l)=>(B(),Ge(vt,{key:String(l),size:"small",color:r?"success":"default",variant:"tonal"},{default:D(()=>[K(V(l)+": "+V(r?"yes":"no"),1)]),_:2},1032,["color"]))),128))])]),_:1}),o[5]||(o[5]=b("h2",{class:"text-h6 font-weight-bold mb-3"},"Skills",-1)),(B(!0),H(ce,null,qe(s.value,r=>(B(),Ge(ln,{key:r.id,variant:"outlined",class:"pa-4 mb-3"},{default:D(()=>{var l,u,d;return[b("h3",IE,V(r.name),1),b("code",EE,V(r.id),1),r.description?(B(),H("p",LE,V(r.description),1)):Ee("",!0),(l=r.tags)!=null&&l.length?(B(),H("div",OE,[(B(!0),H(ce,null,qe(r.tags,h=>(B(),Ge(vt,{key:h,size:"x-small",variant:"tonal",color:"accent"},{default:D(()=>[K(V(h),1)]),_:2},1024))),128))])):Ee("",!0),(u=r.examples)!=null&&u.length?(B(),H("div",NE,[o[1]||(o[1]=b("div",{class:"text-caption text-medium-emphasis mb-1"},"Examples",-1)),b("ul",PE,[(B(!0),H(ce,null,qe(r.examples,(h,f)=>(B(),H("li",{key:f},V(h),1))),128))])])):Ee("",!0),(d=r["x-bindings"])!=null&&d.length?(B(),H("div",BE,[o[2]||(o[2]=b("div",{class:"text-caption text-medium-emphasis mb-1"},"Bindings",-1)),b("div",DE,[(B(!0),H(ce,null,qe(r["x-bindings"],(h,f)=>(B(),Ge(vt,{key:f,size:"small",variant:"tonal",color:"secondary","prepend-icon":"mdi-link-variant"},{default:D(()=>[K(V(h.type)+V(h.workflowId?` · ${h.workflowId}`:""),1)]),_:2},1024))),128))])])):Ee("",!0)]}),_:2},1024))),128)),b("details",RE,[o[3]||(o[3]=b("summary",{class:"text-medium-emphasis cursor-pointer"},"Raw agent card",-1)),b("pre",ME,[b("code",null,V(JSON.stringify(n.value.raw,null,2)),1)])])])):(B(),Ge(Ms,{key:1,type:"error",variant:"tonal",icon:"mdi-alert-circle-outline"},{default:D(()=>[o[7]||(o[7]=K(" No agent found for slug ",-1)),b("code",null,V(e.slug),1),o[8]||(o[8]=K(". ",-1)),b("div",$E,[S(ht,{to:"/specifications/agents",variant:"text",size:"small",color:"primary"},{default:D(()=>[...o[6]||(o[6]=[K(" Back to list ",-1)])]),_:1})])]),_:1}))}}),VE=Ws(jE,[["__scopeId","data-v-212d0043"]]),FE=Ct({__name:"ArazzoListPage",setup(e){const t=N(()=>sl);function n(a){return a.workflows.map(i=>i.workflowId).join(", ")}function s(a){var o;const i=(o=a.info)==null?void 0:o.title;return typeof i=="string"?i:a.slug}return(a,i)=>(B(),H("div",null,[S(ht,{to:"/specifications",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...i[0]||(i[0]=[K(" Back to specifications ",-1)])]),_:1}),i[2]||(i[2]=b("div",{class:"mb-6"},[b("h1",{class:"text-h4 font-weight-bold mb-2"},"🔀 Arazzo workflows"),b("p",{class:"text-body-1 text-medium-emphasis"}," Multi-step API workflows that chain endpoints into a single business operation. ")],-1)),S(bs,{lines:"two",class:"bg-transparent pa-0"},{default:D(()=>[(B(!0),H(ce,null,qe(t.value,o=>(B(),Ge(_n,{key:o.slug,to:`/specifications/arazzo/${o.slug}`,title:s(o),subtitle:n(o),rounded:"lg",border:"",class:"mb-2"},{prepend:D(()=>[S(Ke,{color:"secondary"},{default:D(()=>[...i[1]||(i[1]=[K("mdi-graph-outline",-1)])]),_:1})]),append:D(()=>[S(vt,{size:"x-small",variant:"tonal",color:"secondary"},{default:D(()=>[K(V(o.workflows.length)+" workflows ",1)]),_:2},1024)]),_:2},1032,["to","title","subtitle"]))),128))]),_:1})]))}}),WE={key:0},HE={class:"mb-6"},qE={class:"text-h4 font-weight-bold mb-2"},zE={class:"text-caption text-medium-emphasis"},UE={key:0,class:"text-body-1 mt-3 mb-0"},GE={class:"workflow-summary-bar"},KE={class:"step-count-badge"},YE={key:0},XE={class:"workflow-summary-title"},JE={class:"workflow-summary-text"},QE={class:"workflow-details-content"},ZE={key:0,class:"workflow-description"},eL={key:1,class:"doc-section"},tL={key:0},nL={key:2,class:"timeline"},sL={class:"timeline-marker"},aL={class:"timeline-dot"},iL={key:0,class:"timeline-line"},oL={class:"timeline-content"},rL={class:"step-card"},lL={class:"timeline-step-header"},cL={class:"timeline-step-name"},uL={class:"step-description"},dL={class:"step-op-ref"},hL={key:0,class:"step-detail",open:""},fL={class:"step-detail-summary"},pL={class:"step-detail-count"},mL={class:"step-detail-body step-grid-3"},gL={key:0,class:"step-in"},vL={key:1,class:"step-detail",open:""},yL={class:"step-detail-summary"},bL={class:"step-detail-count"},wL={class:"step-detail-body"},kL={key:0,class:"step-in"},SL={key:1,class:"step-in"},xL={key:2,class:"step-detail",open:""},_L={class:"step-detail-summary"},AL={class:"step-detail-count"},CL={class:"step-detail-body step-grid-3"},TL={key:3,class:"step-detail",open:""},IL={class:"step-detail-summary"},EL={class:"step-detail-count"},LL={class:"step-detail-body step-grid-3"},OL={key:3,class:"doc-section"},NL={class:"mt-2"},PL=Ct({__name:"ArazzoDetailPage",props:{slug:{}},setup(e){const t=e,n=N(()=>ZT(t.slug));function s(){var f,p,g;const h=(p=(f=n.value)==null?void 0:f.info)==null?void 0:p.title;return typeof h=="string"?h:((g=n.value)==null?void 0:g.slug)??""}function a(){var f,p;const h=(p=(f=n.value)==null?void 0:f.info)==null?void 0:p.summary;return typeof h=="string"?h:void 0}function i(h){return h==null?"":typeof h=="string"?h:typeof h=="number"||typeof h=="boolean"?String(h):JSON.stringify(h)}function o(h){if(!(h!=null&&h.properties))return[];const f=new Set(h.required??[]);return Object.entries(h.properties).map(([p,g])=>({name:p,type:g.type??"",description:g.description??"",required:f.has(p)}))}function r(h){return h?Object.entries(h).map(([f,p])=>({key:f,value:p})):[]}function l(h){const f=String(h.type??"").toLowerCase();if(f==="end")return{badge:"END",badgeColor:"error",label:"Workflow terminates"};if(f==="goto")return{badge:"GOTO",badgeColor:"info",label:`Go to ${h.stepId||h.workflowId||""}`};if(f==="retry"){const p=h.retryAfter?` (wait ${h.retryAfter}s)`:"";return{badge:"RETRY",badgeColor:"warning",label:h.retryLimit!=null?`Retry ${h.retryLimit} times${p}`:`Retry${p}`}}return{badge:"",badgeColor:"default",label:h.type??""}}function u(h,f){return[...h??[],...f??[]]}function d(h){const f=h.description??"",p=h.operationId??h.workflowId;return p?f.includes(p)?{text:f,opName:""}:{text:f,opName:p}:{text:f,opName:""}}return(h,f)=>n.value?(B(),H("div",WE,[S(ht,{to:"/specifications/arazzo",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...f[0]||(f[0]=[K(" Back to Arazzo workflows ",-1)])]),_:1}),b("div",HE,[b("h1",qE,V(s()),1),b("code",zE,V(n.value.sourcePath),1),a()?(B(),H("p",UE,V(a()),1)):Ee("",!0)]),f[15]||(f[15]=b("div",{class:"workflows-header-row"},[b("span",{class:"sources-header"},"Workflows")],-1)),(B(!0),H(ce,null,qe(n.value.workflows,p=>(B(),H("details",{key:p.workflowId,class:"workflow-details",open:""},[b("summary",GE,[b("span",KE,[K(V(p.steps.length)+" Step",1),p.steps.length!==1?(B(),H("span",YE,"s")):Ee("",!0)]),b("span",XE,V(p.workflowId),1),b("span",JE,V(p.summary??""),1)]),b("div",QE,[p.description?(B(),H("div",ZE,V(p.description),1)):Ee("",!0),o(p.inputs).length?(B(),H("div",eL,[f[2]||(f[2]=b("h3",null,"↓ Inputs",-1)),f[3]||(f[3]=b("p",null,"Before starting this workflow, you need to provide the following inputs:",-1)),b("table",null,[f[1]||(f[1]=b("thead",null,[b("tr",null,[b("th",null,"Parameter"),b("th",null,"Type"),b("th",null,"Description")])],-1)),b("tbody",null,[(B(!0),H(ce,null,qe(o(p.inputs),g=>(B(),H("tr",{key:g.name},[b("td",null,[b("code",null,V(g.name),1)]),b("td",null,V(g.type),1),b("td",null,[g.required?(B(),H("strong",tL,"REQUIRED. ")):Ee("",!0),K(V(g.description),1)])]))),128))])])])):Ee("",!0),p.steps.length?(B(),H("div",nL,[(B(!0),H(ce,null,qe(p.steps,(g,m)=>{var v,y;return B(),H("div",{key:g.stepId,class:fe(["timeline-item",{"timeline-item-last":m===p.steps.length-1}])},[b("div",sL,[b("div",aL,V(m+1),1),m!==p.steps.length-1?(B(),H("div",iL)):Ee("",!0)]),b("div",oL,[b("div",rL,[b("div",lL,[b("span",cL,V(g.stepId),1)]),b("div",uL,[K(V(d(g).text),1),d(g).opName?(B(),H(ce,{key:0},[K(V(d(g).text?" ":"")+"via ",1),b("span",dL,V(d(g).opName),1),f[4]||(f[4]=K(" Operation ",-1))],64)):Ee("",!0)]),(v=g.parameters)!=null&&v.length?(B(),H("details",hL,[b("summary",fL,[f[5]||(f[5]=K(" Parameters ",-1)),b("span",pL,V(g.parameters.length),1)]),b("div",mL,[(B(!0),H(ce,null,qe(g.parameters,(w,x)=>(B(),H("div",{key:x,class:"step-grid-row"},[b("span",null,[b("code",null,V(w.name),1),w.in?(B(),H("span",gL,V(w.in),1)):Ee("",!0)]),f[6]||(f[6]=b("span",{class:"step-arrow"},"←",-1)),b("span",null,[b("code",null,V(i(w.value)),1)])]))),128))])])):Ee("",!0),(y=g.successCriteria)!=null&&y.length?(B(),H("details",vL,[b("summary",yL,[f[7]||(f[7]=K(" Success Criteria ",-1)),b("span",bL,V(g.successCriteria.length),1)]),b("div",wL,[(B(!0),H(ce,null,qe(g.successCriteria,(w,x)=>(B(),H("div",{key:x,class:"step-row"},[b("code",null,V(w.condition??""),1),w.type?(B(),H("span",kL,"type="+V(w.type),1)):Ee("",!0),w.context?(B(),H("span",SL,"context="+V(w.context),1)):Ee("",!0)]))),128))])])):Ee("",!0),g.outputs&&Object.keys(g.outputs).length?(B(),H("details",xL,[b("summary",_L,[f[8]||(f[8]=K(" Outputs ",-1)),b("span",AL,V(Object.keys(g.outputs).length),1)]),b("div",CL,[(B(!0),H(ce,null,qe(g.outputs,(w,x)=>(B(),H("div",{key:x,class:"step-grid-row"},[b("span",null,[b("code",null,V(x),1)]),f[9]||(f[9]=b("span",{class:"step-arrow"},"←",-1)),b("span",null,[b("code",null,V(i(w)),1)])]))),128))])])):Ee("",!0),u(g.onSuccess,g.onFailure).length?(B(),H("details",TL,[b("summary",IL,[f[10]||(f[10]=K(" Actions ",-1)),b("span",EL,V(u(g.onSuccess,g.onFailure).length),1)]),b("div",LL,[(B(!0),H(ce,null,qe(u(g.onSuccess,g.onFailure),(w,x)=>(B(),H("div",{key:x,class:"step-grid-row"},[b("span",null,[b("strong",null,V(w.name??"(unnamed)"),1)]),f[11]||(f[11]=b("span",{class:"step-arrow"},"→",-1)),b("span",null,[K(V(l(w).label)+" ",1),l(w).badge?(B(),H("span",{key:0,class:fe(["badge",`badge-${l(w).badgeColor}`])},V(l(w).badge),3)):Ee("",!0)])]))),128))])])):Ee("",!0)])])],2)}),128))])):Ee("",!0),r(p.outputs).length?(B(),H("div",OL,[f[13]||(f[13]=b("h3",null,"↓ Outputs",-1)),f[14]||(f[14]=b("p",null,"When this workflow completes successfully, it returns:",-1)),b("table",null,[f[12]||(f[12]=b("thead",null,[b("tr",null,[b("th",null,"Output"),b("th",null,"Source")])],-1)),b("tbody",null,[(B(!0),H(ce,null,qe(r(p.outputs),g=>(B(),H("tr",{key:g.key},[b("td",null,[b("strong",null,[b("code",null,V(g.key),1)])]),b("td",null,[b("code",null,V(i(g.value)),1)])]))),128))])])])):Ee("",!0)])]))),128))])):(B(),Ge(Ms,{key:1,type:"error",variant:"tonal",icon:"mdi-alert-circle-outline"},{default:D(()=>[f[17]||(f[17]=K(" No workflow found for slug ",-1)),b("code",null,V(e.slug),1),f[18]||(f[18]=K(". ",-1)),b("div",NL,[S(ht,{to:"/specifications/arazzo",variant:"text",size:"small",color:"primary"},{default:D(()=>[...f[16]||(f[16]=[K(" Back to list ",-1)])]),_:1})])]),_:1}))}}),BL=Ws(PL,[["__scopeId","data-v-47a6383c"]]),DL="/specs/openapi.html",RL=Ct({__name:"OpenApiPage",setup(e){return(n,s)=>(B(),H("div",null,[S(ht,{to:"/specifications",variant:"text","prepend-icon":"mdi-arrow-left",size:"small",color:"primary",class:"mb-4"},{default:D(()=>[...s[0]||(s[0]=[K(" Back to specifications ",-1)])]),_:1}),s[2]||(s[2]=b("div",{class:"mb-4"},[b("h1",{class:"text-h4 font-weight-bold mb-2"},"🔌 OpenAPI"),b("p",{class:"text-body-1 text-medium-emphasis"}," Backend HTTP API surface, rendered with Redoc. ")],-1)),zt(!1)?(B(),Ge(Ms,{key:0,type:"info",variant:"tonal",icon:"mdi-information-outline",class:"mb-4"},{default:D(()=>[...s[1]||(s[1]=[K(" The OpenAPI Redoc page is built by the deploy workflow and lives at ",-1),b("code",null,"/specs/openapi.html",-1),K(". It won't render in ",-1),b("code",null,"npm run dev",-1),K(". Either run ",-1),b("code",null,"npx redocly build-docs specs/services/apis/backend.openapi.yaml -o public/specs/openapi.html",-1),K(" first, or push and check the deployed site. ",-1)])]),_:1})):Ee("",!0),b("iframe",{src:DL,class:"redoc-frame",title:"OpenAPI documentation"})]))}}),ML=Ws(RL,[["__scopeId","data-v-e3dcafa4"]]),$L=[{path:"/",name:"home",component:lI,meta:{title:"Home"}},{path:"/features",name:"features",component:i2,meta:{title:"Feature Development"}},{path:"/experiments",name:"experiments",component:u2,meta:{title:"Learnings / Experiments"}},{path:"/experiments/:slug",name:"experiment-detail",component:x2,props:!0,meta:{title:"Experiment"}},{path:"/specifications",name:"specifications",component:T2,meta:{title:"Specifications"}},{path:"/presentations",name:"presentations",component:W2,meta:{title:"Presentations"}},{path:"/specifications/openapi",name:"openapi",component:ML,meta:{title:"OpenAPI"}},{path:"/specifications/gherkin",name:"gherkin",component:H2,meta:{title:"Gherkin features"}},{path:"/specifications/gherkin/:slug",name:"gherkin-detail",component:nE,props:!0,meta:{title:"Gherkin feature"}},{path:"/specifications/domains",name:"domains",component:sE,meta:{title:"Domain models"}},{path:"/specifications/domains/:slug",name:"domain-detail",component:wE,props:!0,meta:{title:"Domain model"}},{path:"/specifications/agents",name:"agents",component:kE,meta:{title:"Agent cards"}},{path:"/specifications/agents/:slug",name:"agent-detail",component:VE,props:!0,meta:{title:"Agent"}},{path:"/specifications/arazzo",name:"arazzo",component:FE,meta:{title:"Arazzo workflows"}},{path:"/specifications/arazzo/:slug",name:"arazzo-detail",component:BL,props:!0,meta:{title:"Arazzo workflow"}},{path:"/:pathMatch(.*)*",redirect:"/"}],jL=Jm({theme:{defaultTheme:"diaryLight",themes:{diaryLight:{dark:!1,colors:{background:"#faf8f8",surface:"#ffffff",primary:"#284b63",secondary:"#84a59d",accent:"#f28482",error:"#b00020",info:"#7b97aa",success:"#3a8e5a",warning:"#e6a700","on-background":"#2b2b2b","on-surface":"#2b2b2b"}}}},defaults:{VCard:{rounded:"lg"},VBtn:{rounded:"lg"}}}),VL=i0({history:Mk("/"),routes:$L,scrollBehavior(){return{top:0}}});Jw(m_).use(jL).use(VL).mount("#app");
