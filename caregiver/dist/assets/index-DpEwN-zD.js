(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function yv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var jp={exports:{}},bl={},Up={exports:{}},z={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rs=Symbol.for("react.element"),vv=Symbol.for("react.portal"),wv=Symbol.for("react.fragment"),Ev=Symbol.for("react.strict_mode"),Sv=Symbol.for("react.profiler"),xv=Symbol.for("react.provider"),Cv=Symbol.for("react.context"),kv=Symbol.for("react.forward_ref"),Iv=Symbol.for("react.suspense"),Tv=Symbol.for("react.memo"),Nv=Symbol.for("react.lazy"),ph=Symbol.iterator;function Rv(t){return t===null||typeof t!="object"?null:(t=ph&&t[ph]||t["@@iterator"],typeof t=="function"?t:null)}var zp={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Wp=Object.assign,Hp={};function ui(t,e,n){this.props=t,this.context=e,this.refs=Hp,this.updater=n||zp}ui.prototype.isReactComponent={};ui.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ui.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Vp(){}Vp.prototype=ui.prototype;function Su(t,e,n){this.props=t,this.context=e,this.refs=Hp,this.updater=n||zp}var xu=Su.prototype=new Vp;xu.constructor=Su;Wp(xu,ui.prototype);xu.isPureReactComponent=!0;var mh=Array.isArray,$p=Object.prototype.hasOwnProperty,Cu={current:null},Bp={key:!0,ref:!0,__self:!0,__source:!0};function Gp(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)$p.call(e,r)&&!Bp.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var a=Array(l),c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:Rs,type:t,key:s,ref:o,props:i,_owner:Cu.current}}function Pv(t,e){return{$$typeof:Rs,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ku(t){return typeof t=="object"&&t!==null&&t.$$typeof===Rs}function Av(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var gh=/\/+/g;function fa(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Av(""+t.key):e.toString(36)}function vo(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Rs:case vv:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+fa(o,0):r,mh(i)?(n="",t!=null&&(n=t.replace(gh,"$&/")+"/"),vo(i,e,n,"",function(c){return c})):i!=null&&(ku(i)&&(i=Pv(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(gh,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",mh(t))for(var l=0;l<t.length;l++){s=t[l];var a=r+fa(s,l);o+=vo(s,e,n,a,i)}else if(a=Rv(t),typeof a=="function")for(t=a.call(t),l=0;!(s=t.next()).done;)s=s.value,a=r+fa(s,l++),o+=vo(s,e,n,a,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Xs(t,e,n){if(t==null)return t;var r=[],i=0;return vo(t,r,"","",function(s){return e.call(n,s,i++)}),r}function bv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var We={current:null},wo={transition:null},Ov={ReactCurrentDispatcher:We,ReactCurrentBatchConfig:wo,ReactCurrentOwner:Cu};function Kp(){throw Error("act(...) is not supported in production builds of React.")}z.Children={map:Xs,forEach:function(t,e,n){Xs(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Xs(t,function(){e++}),e},toArray:function(t){return Xs(t,function(e){return e})||[]},only:function(t){if(!ku(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};z.Component=ui;z.Fragment=wv;z.Profiler=Sv;z.PureComponent=Su;z.StrictMode=Ev;z.Suspense=Iv;z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ov;z.act=Kp;z.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Wp({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Cu.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(a in e)$p.call(e,a)&&!Bp.hasOwnProperty(a)&&(r[a]=e[a]===void 0&&l!==void 0?l[a]:e[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){l=Array(a);for(var c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:Rs,type:t.type,key:i,ref:s,props:r,_owner:o}};z.createContext=function(t){return t={$$typeof:Cv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:xv,_context:t},t.Consumer=t};z.createElement=Gp;z.createFactory=function(t){var e=Gp.bind(null,t);return e.type=t,e};z.createRef=function(){return{current:null}};z.forwardRef=function(t){return{$$typeof:kv,render:t}};z.isValidElement=ku;z.lazy=function(t){return{$$typeof:Nv,_payload:{_status:-1,_result:t},_init:bv}};z.memo=function(t,e){return{$$typeof:Tv,type:t,compare:e===void 0?null:e}};z.startTransition=function(t){var e=wo.transition;wo.transition={};try{t()}finally{wo.transition=e}};z.unstable_act=Kp;z.useCallback=function(t,e){return We.current.useCallback(t,e)};z.useContext=function(t){return We.current.useContext(t)};z.useDebugValue=function(){};z.useDeferredValue=function(t){return We.current.useDeferredValue(t)};z.useEffect=function(t,e){return We.current.useEffect(t,e)};z.useId=function(){return We.current.useId()};z.useImperativeHandle=function(t,e,n){return We.current.useImperativeHandle(t,e,n)};z.useInsertionEffect=function(t,e){return We.current.useInsertionEffect(t,e)};z.useLayoutEffect=function(t,e){return We.current.useLayoutEffect(t,e)};z.useMemo=function(t,e){return We.current.useMemo(t,e)};z.useReducer=function(t,e,n){return We.current.useReducer(t,e,n)};z.useRef=function(t){return We.current.useRef(t)};z.useState=function(t){return We.current.useState(t)};z.useSyncExternalStore=function(t,e,n){return We.current.useSyncExternalStore(t,e,n)};z.useTransition=function(){return We.current.useTransition()};z.version="18.3.1";Up.exports=z;var M=Up.exports;const Dv=yv(M);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lv=M,Mv=Symbol.for("react.element"),Fv=Symbol.for("react.fragment"),jv=Object.prototype.hasOwnProperty,Uv=Lv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,zv={key:!0,ref:!0,__self:!0,__source:!0};function qp(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)jv.call(e,r)&&!zv.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:Mv,type:t,key:s,ref:o,props:i,_owner:Uv.current}}bl.Fragment=Fv;bl.jsx=qp;bl.jsxs=qp;jp.exports=bl;var d=jp.exports,ic={},Qp={exports:{}},tt={},Yp={exports:{}},Xp={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(C,b){var O=C.length;C.push(b);e:for(;0<O;){var re=O-1>>>1,fe=C[re];if(0<i(fe,b))C[re]=b,C[O]=fe,O=re;else break e}}function n(C){return C.length===0?null:C[0]}function r(C){if(C.length===0)return null;var b=C[0],O=C.pop();if(O!==b){C[0]=O;e:for(var re=0,fe=C.length,ae=fe>>>1;re<ae;){var Ot=2*(re+1)-1,Ei=C[Ot],Dt=Ot+1,vr=C[Dt];if(0>i(Ei,O))Dt<fe&&0>i(vr,Ei)?(C[re]=vr,C[Dt]=O,re=Dt):(C[re]=Ei,C[Ot]=O,re=Ot);else if(Dt<fe&&0>i(vr,O))C[re]=vr,C[Dt]=O,re=Dt;else break e}}return b}function i(C,b){var O=C.sortIndex-b.sortIndex;return O!==0?O:C.id-b.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var a=[],c=[],u=1,h=null,f=3,g=!1,y=!1,v=!1,A=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function _(C){for(var b=n(c);b!==null;){if(b.callback===null)r(c);else if(b.startTime<=C)r(c),b.sortIndex=b.expirationTime,e(a,b);else break;b=n(c)}}function w(C){if(v=!1,_(C),!y)if(n(a)!==null)y=!0,wi(x);else{var b=n(c);b!==null&&yr(w,b.startTime-C)}}function x(C,b){y=!1,v&&(v=!1,m(N),N=-1),g=!0;var O=f;try{for(_(b),h=n(a);h!==null&&(!(h.expirationTime>b)||C&&!Ve());){var re=h.callback;if(typeof re=="function"){h.callback=null,f=h.priorityLevel;var fe=re(h.expirationTime<=b);b=t.unstable_now(),typeof fe=="function"?h.callback=fe:h===n(a)&&r(a),_(b)}else r(a);h=n(a)}if(h!==null)var ae=!0;else{var Ot=n(c);Ot!==null&&yr(w,Ot.startTime-b),ae=!1}return ae}finally{h=null,f=O,g=!1}}var I=!1,T=null,N=-1,J=5,L=-1;function Ve(){return!(t.unstable_now()-L<J)}function bt(){if(T!==null){var C=t.unstable_now();L=C;var b=!0;try{b=T(!0,C)}finally{b?en():(I=!1,T=null)}}else I=!1}var en;if(typeof p=="function")en=function(){p(bt)};else if(typeof MessageChannel<"u"){var Qs=new MessageChannel,Ys=Qs.port2;Qs.port1.onmessage=bt,en=function(){Ys.postMessage(null)}}else en=function(){A(bt,0)};function wi(C){T=C,I||(I=!0,en())}function yr(C,b){N=A(function(){C(t.unstable_now())},b)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(C){C.callback=null},t.unstable_continueExecution=function(){y||g||(y=!0,wi(x))},t.unstable_forceFrameRate=function(C){0>C||125<C?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):J=0<C?Math.floor(1e3/C):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(a)},t.unstable_next=function(C){switch(f){case 1:case 2:case 3:var b=3;break;default:b=f}var O=f;f=b;try{return C()}finally{f=O}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(C,b){switch(C){case 1:case 2:case 3:case 4:case 5:break;default:C=3}var O=f;f=C;try{return b()}finally{f=O}},t.unstable_scheduleCallback=function(C,b,O){var re=t.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?re+O:re):O=re,C){case 1:var fe=-1;break;case 2:fe=250;break;case 5:fe=1073741823;break;case 4:fe=1e4;break;default:fe=5e3}return fe=O+fe,C={id:u++,callback:b,priorityLevel:C,startTime:O,expirationTime:fe,sortIndex:-1},O>re?(C.sortIndex=O,e(c,C),n(a)===null&&C===n(c)&&(v?(m(N),N=-1):v=!0,yr(w,O-re))):(C.sortIndex=fe,e(a,C),y||g||(y=!0,wi(x))),C},t.unstable_shouldYield=Ve,t.unstable_wrapCallback=function(C){var b=f;return function(){var O=f;f=b;try{return C.apply(this,arguments)}finally{f=O}}}})(Xp);Yp.exports=Xp;var Wv=Yp.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hv=M,Ze=Wv;function E(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Jp=new Set,ns={};function dr(t,e){Qr(t,e),Qr(t+"Capture",e)}function Qr(t,e){for(ns[t]=e,t=0;t<e.length;t++)Jp.add(e[t])}var Bt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),sc=Object.prototype.hasOwnProperty,Vv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_h={},yh={};function $v(t){return sc.call(yh,t)?!0:sc.call(_h,t)?!1:Vv.test(t)?yh[t]=!0:(_h[t]=!0,!1)}function Bv(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Gv(t,e,n,r){if(e===null||typeof e>"u"||Bv(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function He(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Te[t]=new He(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Te[e]=new He(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Te[t]=new He(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Te[t]=new He(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Te[t]=new He(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Te[t]=new He(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Te[t]=new He(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Te[t]=new He(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Te[t]=new He(t,5,!1,t.toLowerCase(),null,!1,!1)});var Iu=/[\-:]([a-z])/g;function Tu(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Iu,Tu);Te[e]=new He(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Iu,Tu);Te[e]=new He(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Iu,Tu);Te[e]=new He(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Te[t]=new He(t,1,!1,t.toLowerCase(),null,!1,!1)});Te.xlinkHref=new He("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Te[t]=new He(t,1,!1,t.toLowerCase(),null,!0,!0)});function Nu(t,e,n,r){var i=Te.hasOwnProperty(e)?Te[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Gv(e,n,i,r)&&(n=null),r||i===null?$v(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Jt=Hv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Js=Symbol.for("react.element"),xr=Symbol.for("react.portal"),Cr=Symbol.for("react.fragment"),Ru=Symbol.for("react.strict_mode"),oc=Symbol.for("react.profiler"),Zp=Symbol.for("react.provider"),em=Symbol.for("react.context"),Pu=Symbol.for("react.forward_ref"),lc=Symbol.for("react.suspense"),ac=Symbol.for("react.suspense_list"),Au=Symbol.for("react.memo"),sn=Symbol.for("react.lazy"),tm=Symbol.for("react.offscreen"),vh=Symbol.iterator;function Si(t){return t===null||typeof t!="object"?null:(t=vh&&t[vh]||t["@@iterator"],typeof t=="function"?t:null)}var le=Object.assign,pa;function Li(t){if(pa===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);pa=e&&e[1]||""}return`
`+pa+t}var ma=!1;function ga(t,e){if(!t||ma)return"";ma=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var a=`
`+i[o].replace(" at new "," at ");return t.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",t.displayName)),a}while(1<=o&&0<=l);break}}}finally{ma=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Li(t):""}function Kv(t){switch(t.tag){case 5:return Li(t.type);case 16:return Li("Lazy");case 13:return Li("Suspense");case 19:return Li("SuspenseList");case 0:case 2:case 15:return t=ga(t.type,!1),t;case 11:return t=ga(t.type.render,!1),t;case 1:return t=ga(t.type,!0),t;default:return""}}function cc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Cr:return"Fragment";case xr:return"Portal";case oc:return"Profiler";case Ru:return"StrictMode";case lc:return"Suspense";case ac:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case em:return(t.displayName||"Context")+".Consumer";case Zp:return(t._context.displayName||"Context")+".Provider";case Pu:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Au:return e=t.displayName||null,e!==null?e:cc(t.type)||"Memo";case sn:e=t._payload,t=t._init;try{return cc(t(e))}catch{}}return null}function qv(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return cc(e);case 8:return e===Ru?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function An(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function nm(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Qv(t){var e=nm(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Zs(t){t._valueTracker||(t._valueTracker=Qv(t))}function rm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=nm(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Fo(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function uc(t,e){var n=e.checked;return le({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function wh(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=An(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function im(t,e){e=e.checked,e!=null&&Nu(t,"checked",e,!1)}function dc(t,e){im(t,e);var n=An(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?hc(t,e.type,n):e.hasOwnProperty("defaultValue")&&hc(t,e.type,An(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Eh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function hc(t,e,n){(e!=="number"||Fo(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Mi=Array.isArray;function jr(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+An(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function fc(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(E(91));return le({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Sh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(E(92));if(Mi(n)){if(1<n.length)throw Error(E(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:An(n)}}function sm(t,e){var n=An(e.value),r=An(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function xh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function om(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function pc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?om(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var eo,lm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(eo=eo||document.createElement("div"),eo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=eo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function rs(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Wi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Yv=["Webkit","ms","Moz","O"];Object.keys(Wi).forEach(function(t){Yv.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Wi[e]=Wi[t]})});function am(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Wi.hasOwnProperty(t)&&Wi[t]?(""+e).trim():e+"px"}function cm(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=am(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var Xv=le({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mc(t,e){if(e){if(Xv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(E(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(E(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(E(61))}if(e.style!=null&&typeof e.style!="object")throw Error(E(62))}}function gc(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _c=null;function bu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var yc=null,Ur=null,zr=null;function Ch(t){if(t=bs(t)){if(typeof yc!="function")throw Error(E(280));var e=t.stateNode;e&&(e=Fl(e),yc(t.stateNode,t.type,e))}}function um(t){Ur?zr?zr.push(t):zr=[t]:Ur=t}function dm(){if(Ur){var t=Ur,e=zr;if(zr=Ur=null,Ch(t),e)for(t=0;t<e.length;t++)Ch(e[t])}}function hm(t,e){return t(e)}function fm(){}var _a=!1;function pm(t,e,n){if(_a)return t(e,n);_a=!0;try{return hm(t,e,n)}finally{_a=!1,(Ur!==null||zr!==null)&&(fm(),dm())}}function is(t,e){var n=t.stateNode;if(n===null)return null;var r=Fl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(E(231,e,typeof n));return n}var vc=!1;if(Bt)try{var xi={};Object.defineProperty(xi,"passive",{get:function(){vc=!0}}),window.addEventListener("test",xi,xi),window.removeEventListener("test",xi,xi)}catch{vc=!1}function Jv(t,e,n,r,i,s,o,l,a){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var Hi=!1,jo=null,Uo=!1,wc=null,Zv={onError:function(t){Hi=!0,jo=t}};function ew(t,e,n,r,i,s,o,l,a){Hi=!1,jo=null,Jv.apply(Zv,arguments)}function tw(t,e,n,r,i,s,o,l,a){if(ew.apply(this,arguments),Hi){if(Hi){var c=jo;Hi=!1,jo=null}else throw Error(E(198));Uo||(Uo=!0,wc=c)}}function hr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function mm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function kh(t){if(hr(t)!==t)throw Error(E(188))}function nw(t){var e=t.alternate;if(!e){if(e=hr(t),e===null)throw Error(E(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return kh(i),t;if(s===r)return kh(i),e;s=s.sibling}throw Error(E(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(E(189))}}if(n.alternate!==r)throw Error(E(190))}if(n.tag!==3)throw Error(E(188));return n.stateNode.current===n?t:e}function gm(t){return t=nw(t),t!==null?_m(t):null}function _m(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=_m(t);if(e!==null)return e;t=t.sibling}return null}var ym=Ze.unstable_scheduleCallback,Ih=Ze.unstable_cancelCallback,rw=Ze.unstable_shouldYield,iw=Ze.unstable_requestPaint,he=Ze.unstable_now,sw=Ze.unstable_getCurrentPriorityLevel,Ou=Ze.unstable_ImmediatePriority,vm=Ze.unstable_UserBlockingPriority,zo=Ze.unstable_NormalPriority,ow=Ze.unstable_LowPriority,wm=Ze.unstable_IdlePriority,Ol=null,Tt=null;function lw(t){if(Tt&&typeof Tt.onCommitFiberRoot=="function")try{Tt.onCommitFiberRoot(Ol,t,void 0,(t.current.flags&128)===128)}catch{}}var yt=Math.clz32?Math.clz32:uw,aw=Math.log,cw=Math.LN2;function uw(t){return t>>>=0,t===0?32:31-(aw(t)/cw|0)|0}var to=64,no=4194304;function Fi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Wo(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=Fi(l):(s&=o,s!==0&&(r=Fi(s)))}else o=n&~i,o!==0?r=Fi(o):s!==0&&(r=Fi(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-yt(e),i=1<<n,r|=t[n],e&=~i;return r}function dw(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function hw(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-yt(s),l=1<<o,a=i[o];a===-1?(!(l&n)||l&r)&&(i[o]=dw(l,e)):a<=e&&(t.expiredLanes|=l),s&=~l}}function Ec(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Em(){var t=to;return to<<=1,!(to&4194240)&&(to=64),t}function ya(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ps(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-yt(e),t[e]=n}function fw(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-yt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function Du(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-yt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var V=0;function Sm(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var xm,Lu,Cm,km,Im,Sc=!1,ro=[],yn=null,vn=null,wn=null,ss=new Map,os=new Map,an=[],pw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Th(t,e){switch(t){case"focusin":case"focusout":yn=null;break;case"dragenter":case"dragleave":vn=null;break;case"mouseover":case"mouseout":wn=null;break;case"pointerover":case"pointerout":ss.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":os.delete(e.pointerId)}}function Ci(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=bs(e),e!==null&&Lu(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function mw(t,e,n,r,i){switch(e){case"focusin":return yn=Ci(yn,t,e,n,r,i),!0;case"dragenter":return vn=Ci(vn,t,e,n,r,i),!0;case"mouseover":return wn=Ci(wn,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return ss.set(s,Ci(ss.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,os.set(s,Ci(os.get(s)||null,t,e,n,r,i)),!0}return!1}function Tm(t){var e=Gn(t.target);if(e!==null){var n=hr(e);if(n!==null){if(e=n.tag,e===13){if(e=mm(n),e!==null){t.blockedOn=e,Im(t.priority,function(){Cm(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Eo(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=xc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);_c=r,n.target.dispatchEvent(r),_c=null}else return e=bs(n),e!==null&&Lu(e),t.blockedOn=n,!1;e.shift()}return!0}function Nh(t,e,n){Eo(t)&&n.delete(e)}function gw(){Sc=!1,yn!==null&&Eo(yn)&&(yn=null),vn!==null&&Eo(vn)&&(vn=null),wn!==null&&Eo(wn)&&(wn=null),ss.forEach(Nh),os.forEach(Nh)}function ki(t,e){t.blockedOn===e&&(t.blockedOn=null,Sc||(Sc=!0,Ze.unstable_scheduleCallback(Ze.unstable_NormalPriority,gw)))}function ls(t){function e(i){return ki(i,t)}if(0<ro.length){ki(ro[0],t);for(var n=1;n<ro.length;n++){var r=ro[n];r.blockedOn===t&&(r.blockedOn=null)}}for(yn!==null&&ki(yn,t),vn!==null&&ki(vn,t),wn!==null&&ki(wn,t),ss.forEach(e),os.forEach(e),n=0;n<an.length;n++)r=an[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<an.length&&(n=an[0],n.blockedOn===null);)Tm(n),n.blockedOn===null&&an.shift()}var Wr=Jt.ReactCurrentBatchConfig,Ho=!0;function _w(t,e,n,r){var i=V,s=Wr.transition;Wr.transition=null;try{V=1,Mu(t,e,n,r)}finally{V=i,Wr.transition=s}}function yw(t,e,n,r){var i=V,s=Wr.transition;Wr.transition=null;try{V=4,Mu(t,e,n,r)}finally{V=i,Wr.transition=s}}function Mu(t,e,n,r){if(Ho){var i=xc(t,e,n,r);if(i===null)Na(t,e,r,Vo,n),Th(t,r);else if(mw(i,t,e,n,r))r.stopPropagation();else if(Th(t,r),e&4&&-1<pw.indexOf(t)){for(;i!==null;){var s=bs(i);if(s!==null&&xm(s),s=xc(t,e,n,r),s===null&&Na(t,e,r,Vo,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Na(t,e,r,null,n)}}var Vo=null;function xc(t,e,n,r){if(Vo=null,t=bu(r),t=Gn(t),t!==null)if(e=hr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=mm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Vo=t,null}function Nm(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(sw()){case Ou:return 1;case vm:return 4;case zo:case ow:return 16;case wm:return 536870912;default:return 16}default:return 16}}var mn=null,Fu=null,So=null;function Rm(){if(So)return So;var t,e=Fu,n=e.length,r,i="value"in mn?mn.value:mn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return So=i.slice(t,1<r?1-r:void 0)}function xo(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function io(){return!0}function Rh(){return!1}function nt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?io:Rh,this.isPropagationStopped=Rh,this}return le(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=io)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=io)},persist:function(){},isPersistent:io}),e}var di={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ju=nt(di),As=le({},di,{view:0,detail:0}),vw=nt(As),va,wa,Ii,Dl=le({},As,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Uu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ii&&(Ii&&t.type==="mousemove"?(va=t.screenX-Ii.screenX,wa=t.screenY-Ii.screenY):wa=va=0,Ii=t),va)},movementY:function(t){return"movementY"in t?t.movementY:wa}}),Ph=nt(Dl),ww=le({},Dl,{dataTransfer:0}),Ew=nt(ww),Sw=le({},As,{relatedTarget:0}),Ea=nt(Sw),xw=le({},di,{animationName:0,elapsedTime:0,pseudoElement:0}),Cw=nt(xw),kw=le({},di,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Iw=nt(kw),Tw=le({},di,{data:0}),Ah=nt(Tw),Nw={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Rw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Pw={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Aw(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Pw[t])?!!e[t]:!1}function Uu(){return Aw}var bw=le({},As,{key:function(t){if(t.key){var e=Nw[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=xo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Rw[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Uu,charCode:function(t){return t.type==="keypress"?xo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?xo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Ow=nt(bw),Dw=le({},Dl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),bh=nt(Dw),Lw=le({},As,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Uu}),Mw=nt(Lw),Fw=le({},di,{propertyName:0,elapsedTime:0,pseudoElement:0}),jw=nt(Fw),Uw=le({},Dl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),zw=nt(Uw),Ww=[9,13,27,32],zu=Bt&&"CompositionEvent"in window,Vi=null;Bt&&"documentMode"in document&&(Vi=document.documentMode);var Hw=Bt&&"TextEvent"in window&&!Vi,Pm=Bt&&(!zu||Vi&&8<Vi&&11>=Vi),Oh=" ",Dh=!1;function Am(t,e){switch(t){case"keyup":return Ww.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function bm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var kr=!1;function Vw(t,e){switch(t){case"compositionend":return bm(e);case"keypress":return e.which!==32?null:(Dh=!0,Oh);case"textInput":return t=e.data,t===Oh&&Dh?null:t;default:return null}}function $w(t,e){if(kr)return t==="compositionend"||!zu&&Am(t,e)?(t=Rm(),So=Fu=mn=null,kr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Pm&&e.locale!=="ko"?null:e.data;default:return null}}var Bw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Lh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Bw[t.type]:e==="textarea"}function Om(t,e,n,r){um(r),e=$o(e,"onChange"),0<e.length&&(n=new ju("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var $i=null,as=null;function Gw(t){$m(t,0)}function Ll(t){var e=Nr(t);if(rm(e))return t}function Kw(t,e){if(t==="change")return e}var Dm=!1;if(Bt){var Sa;if(Bt){var xa="oninput"in document;if(!xa){var Mh=document.createElement("div");Mh.setAttribute("oninput","return;"),xa=typeof Mh.oninput=="function"}Sa=xa}else Sa=!1;Dm=Sa&&(!document.documentMode||9<document.documentMode)}function Fh(){$i&&($i.detachEvent("onpropertychange",Lm),as=$i=null)}function Lm(t){if(t.propertyName==="value"&&Ll(as)){var e=[];Om(e,as,t,bu(t)),pm(Gw,e)}}function qw(t,e,n){t==="focusin"?(Fh(),$i=e,as=n,$i.attachEvent("onpropertychange",Lm)):t==="focusout"&&Fh()}function Qw(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ll(as)}function Yw(t,e){if(t==="click")return Ll(e)}function Xw(t,e){if(t==="input"||t==="change")return Ll(e)}function Jw(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Et=typeof Object.is=="function"?Object.is:Jw;function cs(t,e){if(Et(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!sc.call(e,i)||!Et(t[i],e[i]))return!1}return!0}function jh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Uh(t,e){var n=jh(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=jh(n)}}function Mm(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Mm(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Fm(){for(var t=window,e=Fo();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Fo(t.document)}return e}function Wu(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function Zw(t){var e=Fm(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Mm(n.ownerDocument.documentElement,n)){if(r!==null&&Wu(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Uh(n,s);var o=Uh(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var e0=Bt&&"documentMode"in document&&11>=document.documentMode,Ir=null,Cc=null,Bi=null,kc=!1;function zh(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;kc||Ir==null||Ir!==Fo(r)||(r=Ir,"selectionStart"in r&&Wu(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Bi&&cs(Bi,r)||(Bi=r,r=$o(Cc,"onSelect"),0<r.length&&(e=new ju("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Ir)))}function so(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Tr={animationend:so("Animation","AnimationEnd"),animationiteration:so("Animation","AnimationIteration"),animationstart:so("Animation","AnimationStart"),transitionend:so("Transition","TransitionEnd")},Ca={},jm={};Bt&&(jm=document.createElement("div").style,"AnimationEvent"in window||(delete Tr.animationend.animation,delete Tr.animationiteration.animation,delete Tr.animationstart.animation),"TransitionEvent"in window||delete Tr.transitionend.transition);function Ml(t){if(Ca[t])return Ca[t];if(!Tr[t])return t;var e=Tr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in jm)return Ca[t]=e[n];return t}var Um=Ml("animationend"),zm=Ml("animationiteration"),Wm=Ml("animationstart"),Hm=Ml("transitionend"),Vm=new Map,Wh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Mn(t,e){Vm.set(t,e),dr(e,[t])}for(var ka=0;ka<Wh.length;ka++){var Ia=Wh[ka],t0=Ia.toLowerCase(),n0=Ia[0].toUpperCase()+Ia.slice(1);Mn(t0,"on"+n0)}Mn(Um,"onAnimationEnd");Mn(zm,"onAnimationIteration");Mn(Wm,"onAnimationStart");Mn("dblclick","onDoubleClick");Mn("focusin","onFocus");Mn("focusout","onBlur");Mn(Hm,"onTransitionEnd");Qr("onMouseEnter",["mouseout","mouseover"]);Qr("onMouseLeave",["mouseout","mouseover"]);Qr("onPointerEnter",["pointerout","pointerover"]);Qr("onPointerLeave",["pointerout","pointerover"]);dr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));dr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));dr("onBeforeInput",["compositionend","keypress","textInput","paste"]);dr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));dr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));dr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ji="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),r0=new Set("cancel close invalid load scroll toggle".split(" ").concat(ji));function Hh(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,tw(r,e,void 0,t),t.currentTarget=null}function $m(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],a=l.instance,c=l.currentTarget;if(l=l.listener,a!==s&&i.isPropagationStopped())break e;Hh(i,l,c),s=a}else for(o=0;o<r.length;o++){if(l=r[o],a=l.instance,c=l.currentTarget,l=l.listener,a!==s&&i.isPropagationStopped())break e;Hh(i,l,c),s=a}}}if(Uo)throw t=wc,Uo=!1,wc=null,t}function Z(t,e){var n=e[Pc];n===void 0&&(n=e[Pc]=new Set);var r=t+"__bubble";n.has(r)||(Bm(e,t,2,!1),n.add(r))}function Ta(t,e,n){var r=0;e&&(r|=4),Bm(n,t,r,e)}var oo="_reactListening"+Math.random().toString(36).slice(2);function us(t){if(!t[oo]){t[oo]=!0,Jp.forEach(function(n){n!=="selectionchange"&&(r0.has(n)||Ta(n,!1,t),Ta(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[oo]||(e[oo]=!0,Ta("selectionchange",!1,e))}}function Bm(t,e,n,r){switch(Nm(e)){case 1:var i=_w;break;case 4:i=yw;break;default:i=Mu}n=i.bind(null,e,n,t),i=void 0,!vc||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Na(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var a=o.tag;if((a===3||a===4)&&(a=o.stateNode.containerInfo,a===i||a.nodeType===8&&a.parentNode===i))return;o=o.return}for(;l!==null;){if(o=Gn(l),o===null)return;if(a=o.tag,a===5||a===6){r=s=o;continue e}l=l.parentNode}}r=r.return}pm(function(){var c=s,u=bu(n),h=[];e:{var f=Vm.get(t);if(f!==void 0){var g=ju,y=t;switch(t){case"keypress":if(xo(n)===0)break e;case"keydown":case"keyup":g=Ow;break;case"focusin":y="focus",g=Ea;break;case"focusout":y="blur",g=Ea;break;case"beforeblur":case"afterblur":g=Ea;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=Ph;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=Ew;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=Mw;break;case Um:case zm:case Wm:g=Cw;break;case Hm:g=jw;break;case"scroll":g=vw;break;case"wheel":g=zw;break;case"copy":case"cut":case"paste":g=Iw;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=bh}var v=(e&4)!==0,A=!v&&t==="scroll",m=v?f!==null?f+"Capture":null:f;v=[];for(var p=c,_;p!==null;){_=p;var w=_.stateNode;if(_.tag===5&&w!==null&&(_=w,m!==null&&(w=is(p,m),w!=null&&v.push(ds(p,w,_)))),A)break;p=p.return}0<v.length&&(f=new g(f,y,null,n,u),h.push({event:f,listeners:v}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout",f&&n!==_c&&(y=n.relatedTarget||n.fromElement)&&(Gn(y)||y[Gt]))break e;if((g||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,g?(y=n.relatedTarget||n.toElement,g=c,y=y?Gn(y):null,y!==null&&(A=hr(y),y!==A||y.tag!==5&&y.tag!==6)&&(y=null)):(g=null,y=c),g!==y)){if(v=Ph,w="onMouseLeave",m="onMouseEnter",p="mouse",(t==="pointerout"||t==="pointerover")&&(v=bh,w="onPointerLeave",m="onPointerEnter",p="pointer"),A=g==null?f:Nr(g),_=y==null?f:Nr(y),f=new v(w,p+"leave",g,n,u),f.target=A,f.relatedTarget=_,w=null,Gn(u)===c&&(v=new v(m,p+"enter",y,n,u),v.target=_,v.relatedTarget=A,w=v),A=w,g&&y)t:{for(v=g,m=y,p=0,_=v;_;_=wr(_))p++;for(_=0,w=m;w;w=wr(w))_++;for(;0<p-_;)v=wr(v),p--;for(;0<_-p;)m=wr(m),_--;for(;p--;){if(v===m||m!==null&&v===m.alternate)break t;v=wr(v),m=wr(m)}v=null}else v=null;g!==null&&Vh(h,f,g,v,!1),y!==null&&A!==null&&Vh(h,A,y,v,!0)}}e:{if(f=c?Nr(c):window,g=f.nodeName&&f.nodeName.toLowerCase(),g==="select"||g==="input"&&f.type==="file")var x=Kw;else if(Lh(f))if(Dm)x=Xw;else{x=Qw;var I=qw}else(g=f.nodeName)&&g.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(x=Yw);if(x&&(x=x(t,c))){Om(h,x,n,u);break e}I&&I(t,f,c),t==="focusout"&&(I=f._wrapperState)&&I.controlled&&f.type==="number"&&hc(f,"number",f.value)}switch(I=c?Nr(c):window,t){case"focusin":(Lh(I)||I.contentEditable==="true")&&(Ir=I,Cc=c,Bi=null);break;case"focusout":Bi=Cc=Ir=null;break;case"mousedown":kc=!0;break;case"contextmenu":case"mouseup":case"dragend":kc=!1,zh(h,n,u);break;case"selectionchange":if(e0)break;case"keydown":case"keyup":zh(h,n,u)}var T;if(zu)e:{switch(t){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else kr?Am(t,n)&&(N="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(Pm&&n.locale!=="ko"&&(kr||N!=="onCompositionStart"?N==="onCompositionEnd"&&kr&&(T=Rm()):(mn=u,Fu="value"in mn?mn.value:mn.textContent,kr=!0)),I=$o(c,N),0<I.length&&(N=new Ah(N,t,null,n,u),h.push({event:N,listeners:I}),T?N.data=T:(T=bm(n),T!==null&&(N.data=T)))),(T=Hw?Vw(t,n):$w(t,n))&&(c=$o(c,"onBeforeInput"),0<c.length&&(u=new Ah("onBeforeInput","beforeinput",null,n,u),h.push({event:u,listeners:c}),u.data=T))}$m(h,e)})}function ds(t,e,n){return{instance:t,listener:e,currentTarget:n}}function $o(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=is(t,n),s!=null&&r.unshift(ds(t,s,i)),s=is(t,e),s!=null&&r.push(ds(t,s,i))),t=t.return}return r}function wr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Vh(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,a=l.alternate,c=l.stateNode;if(a!==null&&a===r)break;l.tag===5&&c!==null&&(l=c,i?(a=is(n,s),a!=null&&o.unshift(ds(n,a,l))):i||(a=is(n,s),a!=null&&o.push(ds(n,a,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var i0=/\r\n?/g,s0=/\u0000|\uFFFD/g;function $h(t){return(typeof t=="string"?t:""+t).replace(i0,`
`).replace(s0,"")}function lo(t,e,n){if(e=$h(e),$h(t)!==e&&n)throw Error(E(425))}function Bo(){}var Ic=null,Tc=null;function Nc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Rc=typeof setTimeout=="function"?setTimeout:void 0,o0=typeof clearTimeout=="function"?clearTimeout:void 0,Bh=typeof Promise=="function"?Promise:void 0,l0=typeof queueMicrotask=="function"?queueMicrotask:typeof Bh<"u"?function(t){return Bh.resolve(null).then(t).catch(a0)}:Rc;function a0(t){setTimeout(function(){throw t})}function Ra(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),ls(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);ls(e)}function En(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Gh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var hi=Math.random().toString(36).slice(2),It="__reactFiber$"+hi,hs="__reactProps$"+hi,Gt="__reactContainer$"+hi,Pc="__reactEvents$"+hi,c0="__reactListeners$"+hi,u0="__reactHandles$"+hi;function Gn(t){var e=t[It];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Gt]||n[It]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Gh(t);t!==null;){if(n=t[It])return n;t=Gh(t)}return e}t=n,n=t.parentNode}return null}function bs(t){return t=t[It]||t[Gt],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Nr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(E(33))}function Fl(t){return t[hs]||null}var Ac=[],Rr=-1;function Fn(t){return{current:t}}function ee(t){0>Rr||(t.current=Ac[Rr],Ac[Rr]=null,Rr--)}function X(t,e){Rr++,Ac[Rr]=t.current,t.current=e}var bn={},De=Fn(bn),Ke=Fn(!1),Jn=bn;function Yr(t,e){var n=t.type.contextTypes;if(!n)return bn;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function qe(t){return t=t.childContextTypes,t!=null}function Go(){ee(Ke),ee(De)}function Kh(t,e,n){if(De.current!==bn)throw Error(E(168));X(De,e),X(Ke,n)}function Gm(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(E(108,qv(t)||"Unknown",i));return le({},n,r)}function Ko(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||bn,Jn=De.current,X(De,t),X(Ke,Ke.current),!0}function qh(t,e,n){var r=t.stateNode;if(!r)throw Error(E(169));n?(t=Gm(t,e,Jn),r.__reactInternalMemoizedMergedChildContext=t,ee(Ke),ee(De),X(De,t)):ee(Ke),X(Ke,n)}var Mt=null,jl=!1,Pa=!1;function Km(t){Mt===null?Mt=[t]:Mt.push(t)}function d0(t){jl=!0,Km(t)}function jn(){if(!Pa&&Mt!==null){Pa=!0;var t=0,e=V;try{var n=Mt;for(V=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}Mt=null,jl=!1}catch(i){throw Mt!==null&&(Mt=Mt.slice(t+1)),ym(Ou,jn),i}finally{V=e,Pa=!1}}return null}var Pr=[],Ar=0,qo=null,Qo=0,rt=[],it=0,Zn=null,Ft=1,jt="";function Hn(t,e){Pr[Ar++]=Qo,Pr[Ar++]=qo,qo=t,Qo=e}function qm(t,e,n){rt[it++]=Ft,rt[it++]=jt,rt[it++]=Zn,Zn=t;var r=Ft;t=jt;var i=32-yt(r)-1;r&=~(1<<i),n+=1;var s=32-yt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ft=1<<32-yt(e)+i|n<<i|r,jt=s+t}else Ft=1<<s|n<<i|r,jt=t}function Hu(t){t.return!==null&&(Hn(t,1),qm(t,1,0))}function Vu(t){for(;t===qo;)qo=Pr[--Ar],Pr[Ar]=null,Qo=Pr[--Ar],Pr[Ar]=null;for(;t===Zn;)Zn=rt[--it],rt[it]=null,jt=rt[--it],rt[it]=null,Ft=rt[--it],rt[it]=null}var Je=null,Xe=null,te=!1,pt=null;function Qm(t,e){var n=ot(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Qh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Je=t,Xe=En(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Je=t,Xe=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Zn!==null?{id:Ft,overflow:jt}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=ot(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Je=t,Xe=null,!0):!1;default:return!1}}function bc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Oc(t){if(te){var e=Xe;if(e){var n=e;if(!Qh(t,e)){if(bc(t))throw Error(E(418));e=En(n.nextSibling);var r=Je;e&&Qh(t,e)?Qm(r,n):(t.flags=t.flags&-4097|2,te=!1,Je=t)}}else{if(bc(t))throw Error(E(418));t.flags=t.flags&-4097|2,te=!1,Je=t}}}function Yh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Je=t}function ao(t){if(t!==Je)return!1;if(!te)return Yh(t),te=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Nc(t.type,t.memoizedProps)),e&&(e=Xe)){if(bc(t))throw Ym(),Error(E(418));for(;e;)Qm(t,e),e=En(e.nextSibling)}if(Yh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(E(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Xe=En(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Xe=null}}else Xe=Je?En(t.stateNode.nextSibling):null;return!0}function Ym(){for(var t=Xe;t;)t=En(t.nextSibling)}function Xr(){Xe=Je=null,te=!1}function $u(t){pt===null?pt=[t]:pt.push(t)}var h0=Jt.ReactCurrentBatchConfig;function Ti(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(E(309));var r=n.stateNode}if(!r)throw Error(E(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(E(284));if(!n._owner)throw Error(E(290,t))}return t}function co(t,e){throw t=Object.prototype.toString.call(e),Error(E(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Xh(t){var e=t._init;return e(t._payload)}function Xm(t){function e(m,p){if(t){var _=m.deletions;_===null?(m.deletions=[p],m.flags|=16):_.push(p)}}function n(m,p){if(!t)return null;for(;p!==null;)e(m,p),p=p.sibling;return null}function r(m,p){for(m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function i(m,p){return m=kn(m,p),m.index=0,m.sibling=null,m}function s(m,p,_){return m.index=_,t?(_=m.alternate,_!==null?(_=_.index,_<p?(m.flags|=2,p):_):(m.flags|=2,p)):(m.flags|=1048576,p)}function o(m){return t&&m.alternate===null&&(m.flags|=2),m}function l(m,p,_,w){return p===null||p.tag!==6?(p=Fa(_,m.mode,w),p.return=m,p):(p=i(p,_),p.return=m,p)}function a(m,p,_,w){var x=_.type;return x===Cr?u(m,p,_.props.children,w,_.key):p!==null&&(p.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===sn&&Xh(x)===p.type)?(w=i(p,_.props),w.ref=Ti(m,p,_),w.return=m,w):(w=Po(_.type,_.key,_.props,null,m.mode,w),w.ref=Ti(m,p,_),w.return=m,w)}function c(m,p,_,w){return p===null||p.tag!==4||p.stateNode.containerInfo!==_.containerInfo||p.stateNode.implementation!==_.implementation?(p=ja(_,m.mode,w),p.return=m,p):(p=i(p,_.children||[]),p.return=m,p)}function u(m,p,_,w,x){return p===null||p.tag!==7?(p=Xn(_,m.mode,w,x),p.return=m,p):(p=i(p,_),p.return=m,p)}function h(m,p,_){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Fa(""+p,m.mode,_),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Js:return _=Po(p.type,p.key,p.props,null,m.mode,_),_.ref=Ti(m,null,p),_.return=m,_;case xr:return p=ja(p,m.mode,_),p.return=m,p;case sn:var w=p._init;return h(m,w(p._payload),_)}if(Mi(p)||Si(p))return p=Xn(p,m.mode,_,null),p.return=m,p;co(m,p)}return null}function f(m,p,_,w){var x=p!==null?p.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return x!==null?null:l(m,p,""+_,w);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Js:return _.key===x?a(m,p,_,w):null;case xr:return _.key===x?c(m,p,_,w):null;case sn:return x=_._init,f(m,p,x(_._payload),w)}if(Mi(_)||Si(_))return x!==null?null:u(m,p,_,w,null);co(m,_)}return null}function g(m,p,_,w,x){if(typeof w=="string"&&w!==""||typeof w=="number")return m=m.get(_)||null,l(p,m,""+w,x);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Js:return m=m.get(w.key===null?_:w.key)||null,a(p,m,w,x);case xr:return m=m.get(w.key===null?_:w.key)||null,c(p,m,w,x);case sn:var I=w._init;return g(m,p,_,I(w._payload),x)}if(Mi(w)||Si(w))return m=m.get(_)||null,u(p,m,w,x,null);co(p,w)}return null}function y(m,p,_,w){for(var x=null,I=null,T=p,N=p=0,J=null;T!==null&&N<_.length;N++){T.index>N?(J=T,T=null):J=T.sibling;var L=f(m,T,_[N],w);if(L===null){T===null&&(T=J);break}t&&T&&L.alternate===null&&e(m,T),p=s(L,p,N),I===null?x=L:I.sibling=L,I=L,T=J}if(N===_.length)return n(m,T),te&&Hn(m,N),x;if(T===null){for(;N<_.length;N++)T=h(m,_[N],w),T!==null&&(p=s(T,p,N),I===null?x=T:I.sibling=T,I=T);return te&&Hn(m,N),x}for(T=r(m,T);N<_.length;N++)J=g(T,m,N,_[N],w),J!==null&&(t&&J.alternate!==null&&T.delete(J.key===null?N:J.key),p=s(J,p,N),I===null?x=J:I.sibling=J,I=J);return t&&T.forEach(function(Ve){return e(m,Ve)}),te&&Hn(m,N),x}function v(m,p,_,w){var x=Si(_);if(typeof x!="function")throw Error(E(150));if(_=x.call(_),_==null)throw Error(E(151));for(var I=x=null,T=p,N=p=0,J=null,L=_.next();T!==null&&!L.done;N++,L=_.next()){T.index>N?(J=T,T=null):J=T.sibling;var Ve=f(m,T,L.value,w);if(Ve===null){T===null&&(T=J);break}t&&T&&Ve.alternate===null&&e(m,T),p=s(Ve,p,N),I===null?x=Ve:I.sibling=Ve,I=Ve,T=J}if(L.done)return n(m,T),te&&Hn(m,N),x;if(T===null){for(;!L.done;N++,L=_.next())L=h(m,L.value,w),L!==null&&(p=s(L,p,N),I===null?x=L:I.sibling=L,I=L);return te&&Hn(m,N),x}for(T=r(m,T);!L.done;N++,L=_.next())L=g(T,m,N,L.value,w),L!==null&&(t&&L.alternate!==null&&T.delete(L.key===null?N:L.key),p=s(L,p,N),I===null?x=L:I.sibling=L,I=L);return t&&T.forEach(function(bt){return e(m,bt)}),te&&Hn(m,N),x}function A(m,p,_,w){if(typeof _=="object"&&_!==null&&_.type===Cr&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case Js:e:{for(var x=_.key,I=p;I!==null;){if(I.key===x){if(x=_.type,x===Cr){if(I.tag===7){n(m,I.sibling),p=i(I,_.props.children),p.return=m,m=p;break e}}else if(I.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===sn&&Xh(x)===I.type){n(m,I.sibling),p=i(I,_.props),p.ref=Ti(m,I,_),p.return=m,m=p;break e}n(m,I);break}else e(m,I);I=I.sibling}_.type===Cr?(p=Xn(_.props.children,m.mode,w,_.key),p.return=m,m=p):(w=Po(_.type,_.key,_.props,null,m.mode,w),w.ref=Ti(m,p,_),w.return=m,m=w)}return o(m);case xr:e:{for(I=_.key;p!==null;){if(p.key===I)if(p.tag===4&&p.stateNode.containerInfo===_.containerInfo&&p.stateNode.implementation===_.implementation){n(m,p.sibling),p=i(p,_.children||[]),p.return=m,m=p;break e}else{n(m,p);break}else e(m,p);p=p.sibling}p=ja(_,m.mode,w),p.return=m,m=p}return o(m);case sn:return I=_._init,A(m,p,I(_._payload),w)}if(Mi(_))return y(m,p,_,w);if(Si(_))return v(m,p,_,w);co(m,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,p!==null&&p.tag===6?(n(m,p.sibling),p=i(p,_),p.return=m,m=p):(n(m,p),p=Fa(_,m.mode,w),p.return=m,m=p),o(m)):n(m,p)}return A}var Jr=Xm(!0),Jm=Xm(!1),Yo=Fn(null),Xo=null,br=null,Bu=null;function Gu(){Bu=br=Xo=null}function Ku(t){var e=Yo.current;ee(Yo),t._currentValue=e}function Dc(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Hr(t,e){Xo=t,Bu=br=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Be=!0),t.firstContext=null)}function ct(t){var e=t._currentValue;if(Bu!==t)if(t={context:t,memoizedValue:e,next:null},br===null){if(Xo===null)throw Error(E(308));br=t,Xo.dependencies={lanes:0,firstContext:t}}else br=br.next=t;return e}var Kn=null;function qu(t){Kn===null?Kn=[t]:Kn.push(t)}function Zm(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,qu(e)):(n.next=i.next,i.next=n),e.interleaved=n,Kt(t,r)}function Kt(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var on=!1;function Qu(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function eg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ht(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Sn(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,W&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,Kt(t,n)}return i=r.interleaved,i===null?(e.next=e,qu(r)):(e.next=i.next,i.next=e),r.interleaved=e,Kt(t,n)}function Co(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Du(t,n)}}function Jh(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Jo(t,e,n,r){var i=t.updateQueue;on=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var a=l,c=a.next;a.next=null,o===null?s=c:o.next=c,o=a;var u=t.alternate;u!==null&&(u=u.updateQueue,l=u.lastBaseUpdate,l!==o&&(l===null?u.firstBaseUpdate=c:l.next=c,u.lastBaseUpdate=a))}if(s!==null){var h=i.baseState;o=0,u=c=a=null,l=s;do{var f=l.lane,g=l.eventTime;if((r&f)===f){u!==null&&(u=u.next={eventTime:g,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=t,v=l;switch(f=e,g=n,v.tag){case 1:if(y=v.payload,typeof y=="function"){h=y.call(g,h,f);break e}h=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=v.payload,f=typeof y=="function"?y.call(g,h,f):y,f==null)break e;h=le({},h,f);break e;case 2:on=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,f=i.effects,f===null?i.effects=[l]:f.push(l))}else g={eventTime:g,lane:f,tag:l.tag,payload:l.payload,callback:l.callback,next:null},u===null?(c=u=g,a=h):u=u.next=g,o|=f;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;f=l,l=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(u===null&&(a=h),i.baseState=a,i.firstBaseUpdate=c,i.lastBaseUpdate=u,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);tr|=o,t.lanes=o,t.memoizedState=h}}function Zh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(E(191,i));i.call(r)}}}var Os={},Nt=Fn(Os),fs=Fn(Os),ps=Fn(Os);function qn(t){if(t===Os)throw Error(E(174));return t}function Yu(t,e){switch(X(ps,e),X(fs,t),X(Nt,Os),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:pc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=pc(e,t)}ee(Nt),X(Nt,e)}function Zr(){ee(Nt),ee(fs),ee(ps)}function tg(t){qn(ps.current);var e=qn(Nt.current),n=pc(e,t.type);e!==n&&(X(fs,t),X(Nt,n))}function Xu(t){fs.current===t&&(ee(Nt),ee(fs))}var ie=Fn(0);function Zo(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Aa=[];function Ju(){for(var t=0;t<Aa.length;t++)Aa[t]._workInProgressVersionPrimary=null;Aa.length=0}var ko=Jt.ReactCurrentDispatcher,ba=Jt.ReactCurrentBatchConfig,er=0,oe=null,_e=null,Ee=null,el=!1,Gi=!1,ms=0,f0=0;function Ae(){throw Error(E(321))}function Zu(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Et(t[n],e[n]))return!1;return!0}function ed(t,e,n,r,i,s){if(er=s,oe=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ko.current=t===null||t.memoizedState===null?_0:y0,t=n(r,i),Gi){s=0;do{if(Gi=!1,ms=0,25<=s)throw Error(E(301));s+=1,Ee=_e=null,e.updateQueue=null,ko.current=v0,t=n(r,i)}while(Gi)}if(ko.current=tl,e=_e!==null&&_e.next!==null,er=0,Ee=_e=oe=null,el=!1,e)throw Error(E(300));return t}function td(){var t=ms!==0;return ms=0,t}function kt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ee===null?oe.memoizedState=Ee=t:Ee=Ee.next=t,Ee}function ut(){if(_e===null){var t=oe.alternate;t=t!==null?t.memoizedState:null}else t=_e.next;var e=Ee===null?oe.memoizedState:Ee.next;if(e!==null)Ee=e,_e=t;else{if(t===null)throw Error(E(310));_e=t,t={memoizedState:_e.memoizedState,baseState:_e.baseState,baseQueue:_e.baseQueue,queue:_e.queue,next:null},Ee===null?oe.memoizedState=Ee=t:Ee=Ee.next=t}return Ee}function gs(t,e){return typeof e=="function"?e(t):e}function Oa(t){var e=ut(),n=e.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=t;var r=_e,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,a=null,c=s;do{var u=c.lane;if((er&u)===u)a!==null&&(a=a.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var h={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};a===null?(l=a=h,o=r):a=a.next=h,oe.lanes|=u,tr|=u}c=c.next}while(c!==null&&c!==s);a===null?o=r:a.next=l,Et(r,e.memoizedState)||(Be=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=a,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,oe.lanes|=s,tr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Da(t){var e=ut(),n=e.queue;if(n===null)throw Error(E(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);Et(s,e.memoizedState)||(Be=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function ng(){}function rg(t,e){var n=oe,r=ut(),i=e(),s=!Et(r.memoizedState,i);if(s&&(r.memoizedState=i,Be=!0),r=r.queue,nd(og.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Ee!==null&&Ee.memoizedState.tag&1){if(n.flags|=2048,_s(9,sg.bind(null,n,r,i,e),void 0,null),xe===null)throw Error(E(349));er&30||ig(n,e,i)}return i}function ig(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=oe.updateQueue,e===null?(e={lastEffect:null,stores:null},oe.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function sg(t,e,n,r){e.value=n,e.getSnapshot=r,lg(e)&&ag(t)}function og(t,e,n){return n(function(){lg(e)&&ag(t)})}function lg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Et(t,n)}catch{return!0}}function ag(t){var e=Kt(t,1);e!==null&&vt(e,t,1,-1)}function ef(t){var e=kt();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:gs,lastRenderedState:t},e.queue=t,t=t.dispatch=g0.bind(null,oe,t),[e.memoizedState,t]}function _s(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=oe.updateQueue,e===null?(e={lastEffect:null,stores:null},oe.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function cg(){return ut().memoizedState}function Io(t,e,n,r){var i=kt();oe.flags|=t,i.memoizedState=_s(1|e,n,void 0,r===void 0?null:r)}function Ul(t,e,n,r){var i=ut();r=r===void 0?null:r;var s=void 0;if(_e!==null){var o=_e.memoizedState;if(s=o.destroy,r!==null&&Zu(r,o.deps)){i.memoizedState=_s(e,n,s,r);return}}oe.flags|=t,i.memoizedState=_s(1|e,n,s,r)}function tf(t,e){return Io(8390656,8,t,e)}function nd(t,e){return Ul(2048,8,t,e)}function ug(t,e){return Ul(4,2,t,e)}function dg(t,e){return Ul(4,4,t,e)}function hg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function fg(t,e,n){return n=n!=null?n.concat([t]):null,Ul(4,4,hg.bind(null,e,t),n)}function rd(){}function pg(t,e){var n=ut();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Zu(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function mg(t,e){var n=ut();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Zu(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function gg(t,e,n){return er&21?(Et(n,e)||(n=Em(),oe.lanes|=n,tr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Be=!0),t.memoizedState=n)}function p0(t,e){var n=V;V=n!==0&&4>n?n:4,t(!0);var r=ba.transition;ba.transition={};try{t(!1),e()}finally{V=n,ba.transition=r}}function _g(){return ut().memoizedState}function m0(t,e,n){var r=Cn(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},yg(t))vg(e,n);else if(n=Zm(t,e,n,r),n!==null){var i=je();vt(n,t,r,i),wg(n,e,r)}}function g0(t,e,n){var r=Cn(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(yg(t))vg(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,Et(l,o)){var a=e.interleaved;a===null?(i.next=i,qu(e)):(i.next=a.next,a.next=i),e.interleaved=i;return}}catch{}finally{}n=Zm(t,e,i,r),n!==null&&(i=je(),vt(n,t,r,i),wg(n,e,r))}}function yg(t){var e=t.alternate;return t===oe||e!==null&&e===oe}function vg(t,e){Gi=el=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function wg(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Du(t,n)}}var tl={readContext:ct,useCallback:Ae,useContext:Ae,useEffect:Ae,useImperativeHandle:Ae,useInsertionEffect:Ae,useLayoutEffect:Ae,useMemo:Ae,useReducer:Ae,useRef:Ae,useState:Ae,useDebugValue:Ae,useDeferredValue:Ae,useTransition:Ae,useMutableSource:Ae,useSyncExternalStore:Ae,useId:Ae,unstable_isNewReconciler:!1},_0={readContext:ct,useCallback:function(t,e){return kt().memoizedState=[t,e===void 0?null:e],t},useContext:ct,useEffect:tf,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Io(4194308,4,hg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Io(4194308,4,t,e)},useInsertionEffect:function(t,e){return Io(4,2,t,e)},useMemo:function(t,e){var n=kt();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=kt();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=m0.bind(null,oe,t),[r.memoizedState,t]},useRef:function(t){var e=kt();return t={current:t},e.memoizedState=t},useState:ef,useDebugValue:rd,useDeferredValue:function(t){return kt().memoizedState=t},useTransition:function(){var t=ef(!1),e=t[0];return t=p0.bind(null,t[1]),kt().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=oe,i=kt();if(te){if(n===void 0)throw Error(E(407));n=n()}else{if(n=e(),xe===null)throw Error(E(349));er&30||ig(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,tf(og.bind(null,r,s,t),[t]),r.flags|=2048,_s(9,sg.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=kt(),e=xe.identifierPrefix;if(te){var n=jt,r=Ft;n=(r&~(1<<32-yt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=ms++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=f0++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},y0={readContext:ct,useCallback:pg,useContext:ct,useEffect:nd,useImperativeHandle:fg,useInsertionEffect:ug,useLayoutEffect:dg,useMemo:mg,useReducer:Oa,useRef:cg,useState:function(){return Oa(gs)},useDebugValue:rd,useDeferredValue:function(t){var e=ut();return gg(e,_e.memoizedState,t)},useTransition:function(){var t=Oa(gs)[0],e=ut().memoizedState;return[t,e]},useMutableSource:ng,useSyncExternalStore:rg,useId:_g,unstable_isNewReconciler:!1},v0={readContext:ct,useCallback:pg,useContext:ct,useEffect:nd,useImperativeHandle:fg,useInsertionEffect:ug,useLayoutEffect:dg,useMemo:mg,useReducer:Da,useRef:cg,useState:function(){return Da(gs)},useDebugValue:rd,useDeferredValue:function(t){var e=ut();return _e===null?e.memoizedState=t:gg(e,_e.memoizedState,t)},useTransition:function(){var t=Da(gs)[0],e=ut().memoizedState;return[t,e]},useMutableSource:ng,useSyncExternalStore:rg,useId:_g,unstable_isNewReconciler:!1};function ht(t,e){if(t&&t.defaultProps){e=le({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Lc(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:le({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var zl={isMounted:function(t){return(t=t._reactInternals)?hr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=je(),i=Cn(t),s=Ht(r,i);s.payload=e,n!=null&&(s.callback=n),e=Sn(t,s,i),e!==null&&(vt(e,t,i,r),Co(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=je(),i=Cn(t),s=Ht(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Sn(t,s,i),e!==null&&(vt(e,t,i,r),Co(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=je(),r=Cn(t),i=Ht(n,r);i.tag=2,e!=null&&(i.callback=e),e=Sn(t,i,r),e!==null&&(vt(e,t,r,n),Co(e,t,r))}};function nf(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!cs(n,r)||!cs(i,s):!0}function Eg(t,e,n){var r=!1,i=bn,s=e.contextType;return typeof s=="object"&&s!==null?s=ct(s):(i=qe(e)?Jn:De.current,r=e.contextTypes,s=(r=r!=null)?Yr(t,i):bn),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=zl,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function rf(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&zl.enqueueReplaceState(e,e.state,null)}function Mc(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Qu(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=ct(s):(s=qe(e)?Jn:De.current,i.context=Yr(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Lc(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&zl.enqueueReplaceState(i,i.state,null),Jo(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function ei(t,e){try{var n="",r=e;do n+=Kv(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function La(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Fc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var w0=typeof WeakMap=="function"?WeakMap:Map;function Sg(t,e,n){n=Ht(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){rl||(rl=!0,Kc=r),Fc(t,e)},n}function xg(t,e,n){n=Ht(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Fc(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Fc(t,e),typeof r!="function"&&(xn===null?xn=new Set([this]):xn.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function sf(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new w0;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=D0.bind(null,t,e,n),e.then(t,t))}function of(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function lf(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ht(-1,1),e.tag=2,Sn(n,e,1))),n.lanes|=1),t)}var E0=Jt.ReactCurrentOwner,Be=!1;function Me(t,e,n,r){e.child=t===null?Jm(e,null,n,r):Jr(e,t.child,n,r)}function af(t,e,n,r,i){n=n.render;var s=e.ref;return Hr(e,i),r=ed(t,e,n,r,s,i),n=td(),t!==null&&!Be?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,qt(t,e,i)):(te&&n&&Hu(e),e.flags|=1,Me(t,e,r,i),e.child)}function cf(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!dd(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Cg(t,e,s,r,i)):(t=Po(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:cs,n(o,r)&&t.ref===e.ref)return qt(t,e,i)}return e.flags|=1,t=kn(s,r),t.ref=e.ref,t.return=e,e.child=t}function Cg(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(cs(s,r)&&t.ref===e.ref)if(Be=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(Be=!0);else return e.lanes=t.lanes,qt(t,e,i)}return jc(t,e,n,r,i)}function kg(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},X(Dr,Ye),Ye|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,X(Dr,Ye),Ye|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,X(Dr,Ye),Ye|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,X(Dr,Ye),Ye|=r;return Me(t,e,i,n),e.child}function Ig(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function jc(t,e,n,r,i){var s=qe(n)?Jn:De.current;return s=Yr(e,s),Hr(e,i),n=ed(t,e,n,r,s,i),r=td(),t!==null&&!Be?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,qt(t,e,i)):(te&&r&&Hu(e),e.flags|=1,Me(t,e,n,i),e.child)}function uf(t,e,n,r,i){if(qe(n)){var s=!0;Ko(e)}else s=!1;if(Hr(e,i),e.stateNode===null)To(t,e),Eg(e,n,r),Mc(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var a=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=ct(c):(c=qe(n)?Jn:De.current,c=Yr(e,c));var u=n.getDerivedStateFromProps,h=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||a!==c)&&rf(e,o,r,c),on=!1;var f=e.memoizedState;o.state=f,Jo(e,r,o,i),a=e.memoizedState,l!==r||f!==a||Ke.current||on?(typeof u=="function"&&(Lc(e,n,u,r),a=e.memoizedState),(l=on||nf(e,n,l,r,f,a,c))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=a),o.props=r,o.state=a,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,eg(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:ht(e.type,l),o.props=c,h=e.pendingProps,f=o.context,a=n.contextType,typeof a=="object"&&a!==null?a=ct(a):(a=qe(n)?Jn:De.current,a=Yr(e,a));var g=n.getDerivedStateFromProps;(u=typeof g=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==h||f!==a)&&rf(e,o,r,a),on=!1,f=e.memoizedState,o.state=f,Jo(e,r,o,i);var y=e.memoizedState;l!==h||f!==y||Ke.current||on?(typeof g=="function"&&(Lc(e,n,g,r),y=e.memoizedState),(c=on||nf(e,n,c,r,f,y,a)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,y,a),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,y,a)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=y),o.props=r,o.state=y,o.context=a,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),r=!1)}return Uc(t,e,n,r,s,i)}function Uc(t,e,n,r,i,s){Ig(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&qh(e,n,!1),qt(t,e,s);r=e.stateNode,E0.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Jr(e,t.child,null,s),e.child=Jr(e,null,l,s)):Me(t,e,l,s),e.memoizedState=r.state,i&&qh(e,n,!0),e.child}function Tg(t){var e=t.stateNode;e.pendingContext?Kh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Kh(t,e.context,!1),Yu(t,e.containerInfo)}function df(t,e,n,r,i){return Xr(),$u(i),e.flags|=256,Me(t,e,n,r),e.child}var zc={dehydrated:null,treeContext:null,retryLane:0};function Wc(t){return{baseLanes:t,cachePool:null,transitions:null}}function Ng(t,e,n){var r=e.pendingProps,i=ie.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),X(ie,i&1),t===null)return Oc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Vl(o,r,0,null),t=Xn(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Wc(n),e.memoizedState=zc,t):id(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return S0(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var a={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=a,e.deletions=null):(r=kn(i,a),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=kn(l,s):(s=Xn(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?Wc(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=zc,r}return s=t.child,t=s.sibling,r=kn(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function id(t,e){return e=Vl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function uo(t,e,n,r){return r!==null&&$u(r),Jr(e,t.child,null,n),t=id(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function S0(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=La(Error(E(422))),uo(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Vl({mode:"visible",children:r.children},i,0,null),s=Xn(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&Jr(e,t.child,null,o),e.child.memoizedState=Wc(o),e.memoizedState=zc,s);if(!(e.mode&1))return uo(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(E(419)),r=La(s,r,void 0),uo(t,e,o,r)}if(l=(o&t.childLanes)!==0,Be||l){if(r=xe,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Kt(t,i),vt(r,t,i,-1))}return ud(),r=La(Error(E(421))),uo(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=L0.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Xe=En(i.nextSibling),Je=e,te=!0,pt=null,t!==null&&(rt[it++]=Ft,rt[it++]=jt,rt[it++]=Zn,Ft=t.id,jt=t.overflow,Zn=e),e=id(e,r.children),e.flags|=4096,e)}function hf(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Dc(t.return,e,n)}function Ma(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Rg(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(Me(t,e,r.children,n),r=ie.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&hf(t,n,e);else if(t.tag===19)hf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(X(ie,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Zo(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Ma(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Zo(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Ma(e,!0,n,null,s);break;case"together":Ma(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function To(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function qt(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),tr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(E(153));if(e.child!==null){for(t=e.child,n=kn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=kn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function x0(t,e,n){switch(e.tag){case 3:Tg(e),Xr();break;case 5:tg(e);break;case 1:qe(e.type)&&Ko(e);break;case 4:Yu(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;X(Yo,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(X(ie,ie.current&1),e.flags|=128,null):n&e.child.childLanes?Ng(t,e,n):(X(ie,ie.current&1),t=qt(t,e,n),t!==null?t.sibling:null);X(ie,ie.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Rg(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),X(ie,ie.current),r)break;return null;case 22:case 23:return e.lanes=0,kg(t,e,n)}return qt(t,e,n)}var Pg,Hc,Ag,bg;Pg=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Hc=function(){};Ag=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,qn(Nt.current);var s=null;switch(n){case"input":i=uc(t,i),r=uc(t,r),s=[];break;case"select":i=le({},i,{value:void 0}),r=le({},r,{value:void 0}),s=[];break;case"textarea":i=fc(t,i),r=fc(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=Bo)}mc(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var l=i[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ns.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var a=r[c];if(l=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&a!==l&&(a!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||a&&a.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in a)a.hasOwnProperty(o)&&l[o]!==a[o]&&(n||(n={}),n[o]=a[o])}else n||(s||(s=[]),s.push(c,n)),n=a;else c==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,l=l?l.__html:void 0,a!=null&&l!==a&&(s=s||[]).push(c,a)):c==="children"?typeof a!="string"&&typeof a!="number"||(s=s||[]).push(c,""+a):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ns.hasOwnProperty(c)?(a!=null&&c==="onScroll"&&Z("scroll",t),s||l===a||(s=[])):(s=s||[]).push(c,a))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};bg=function(t,e,n,r){n!==r&&(e.flags|=4)};function Ni(t,e){if(!te)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function be(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function C0(t,e,n){var r=e.pendingProps;switch(Vu(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return be(e),null;case 1:return qe(e.type)&&Go(),be(e),null;case 3:return r=e.stateNode,Zr(),ee(Ke),ee(De),Ju(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(ao(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,pt!==null&&(Yc(pt),pt=null))),Hc(t,e),be(e),null;case 5:Xu(e);var i=qn(ps.current);if(n=e.type,t!==null&&e.stateNode!=null)Ag(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(E(166));return be(e),null}if(t=qn(Nt.current),ao(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[It]=e,r[hs]=s,t=(e.mode&1)!==0,n){case"dialog":Z("cancel",r),Z("close",r);break;case"iframe":case"object":case"embed":Z("load",r);break;case"video":case"audio":for(i=0;i<ji.length;i++)Z(ji[i],r);break;case"source":Z("error",r);break;case"img":case"image":case"link":Z("error",r),Z("load",r);break;case"details":Z("toggle",r);break;case"input":wh(r,s),Z("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},Z("invalid",r);break;case"textarea":Sh(r,s),Z("invalid",r)}mc(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&lo(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&lo(r.textContent,l,t),i=["children",""+l]):ns.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&Z("scroll",r)}switch(n){case"input":Zs(r),Eh(r,s,!0);break;case"textarea":Zs(r),xh(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Bo)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=om(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[It]=e,t[hs]=r,Pg(t,e,!1,!1),e.stateNode=t;e:{switch(o=gc(n,r),n){case"dialog":Z("cancel",t),Z("close",t),i=r;break;case"iframe":case"object":case"embed":Z("load",t),i=r;break;case"video":case"audio":for(i=0;i<ji.length;i++)Z(ji[i],t);i=r;break;case"source":Z("error",t),i=r;break;case"img":case"image":case"link":Z("error",t),Z("load",t),i=r;break;case"details":Z("toggle",t),i=r;break;case"input":wh(t,r),i=uc(t,r),Z("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=le({},r,{value:void 0}),Z("invalid",t);break;case"textarea":Sh(t,r),i=fc(t,r),Z("invalid",t);break;default:i=r}mc(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var a=l[s];s==="style"?cm(t,a):s==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&lm(t,a)):s==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&rs(t,a):typeof a=="number"&&rs(t,""+a):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ns.hasOwnProperty(s)?a!=null&&s==="onScroll"&&Z("scroll",t):a!=null&&Nu(t,s,a,o))}switch(n){case"input":Zs(t),Eh(t,r,!1);break;case"textarea":Zs(t),xh(t);break;case"option":r.value!=null&&t.setAttribute("value",""+An(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?jr(t,!!r.multiple,s,!1):r.defaultValue!=null&&jr(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=Bo)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return be(e),null;case 6:if(t&&e.stateNode!=null)bg(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(E(166));if(n=qn(ps.current),qn(Nt.current),ao(e)){if(r=e.stateNode,n=e.memoizedProps,r[It]=e,(s=r.nodeValue!==n)&&(t=Je,t!==null))switch(t.tag){case 3:lo(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&lo(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[It]=e,e.stateNode=r}return be(e),null;case 13:if(ee(ie),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(te&&Xe!==null&&e.mode&1&&!(e.flags&128))Ym(),Xr(),e.flags|=98560,s=!1;else if(s=ao(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(E(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(E(317));s[It]=e}else Xr(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;be(e),s=!1}else pt!==null&&(Yc(pt),pt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||ie.current&1?ve===0&&(ve=3):ud())),e.updateQueue!==null&&(e.flags|=4),be(e),null);case 4:return Zr(),Hc(t,e),t===null&&us(e.stateNode.containerInfo),be(e),null;case 10:return Ku(e.type._context),be(e),null;case 17:return qe(e.type)&&Go(),be(e),null;case 19:if(ee(ie),s=e.memoizedState,s===null)return be(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)Ni(s,!1);else{if(ve!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Zo(t),o!==null){for(e.flags|=128,Ni(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return X(ie,ie.current&1|2),e.child}t=t.sibling}s.tail!==null&&he()>ti&&(e.flags|=128,r=!0,Ni(s,!1),e.lanes=4194304)}else{if(!r)if(t=Zo(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ni(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!te)return be(e),null}else 2*he()-s.renderingStartTime>ti&&n!==1073741824&&(e.flags|=128,r=!0,Ni(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=he(),e.sibling=null,n=ie.current,X(ie,r?n&1|2:n&1),e):(be(e),null);case 22:case 23:return cd(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Ye&1073741824&&(be(e),e.subtreeFlags&6&&(e.flags|=8192)):be(e),null;case 24:return null;case 25:return null}throw Error(E(156,e.tag))}function k0(t,e){switch(Vu(e),e.tag){case 1:return qe(e.type)&&Go(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Zr(),ee(Ke),ee(De),Ju(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Xu(e),null;case 13:if(ee(ie),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(E(340));Xr()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ee(ie),null;case 4:return Zr(),null;case 10:return Ku(e.type._context),null;case 22:case 23:return cd(),null;case 24:return null;default:return null}}var ho=!1,Oe=!1,I0=typeof WeakSet=="function"?WeakSet:Set,k=null;function Or(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ue(t,e,r)}else n.current=null}function Vc(t,e,n){try{n()}catch(r){ue(t,e,r)}}var ff=!1;function T0(t,e){if(Ic=Ho,t=Fm(),Wu(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,a=-1,c=0,u=0,h=t,f=null;t:for(;;){for(var g;h!==n||i!==0&&h.nodeType!==3||(l=o+i),h!==s||r!==0&&h.nodeType!==3||(a=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(g=h.firstChild)!==null;)f=h,h=g;for(;;){if(h===t)break t;if(f===n&&++c===i&&(l=o),f===s&&++u===r&&(a=o),(g=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=g}n=l===-1||a===-1?null:{start:l,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(Tc={focusedElem:t,selectionRange:n},Ho=!1,k=e;k!==null;)if(e=k,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,k=t;else for(;k!==null;){e=k;try{var y=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var v=y.memoizedProps,A=y.memoizedState,m=e.stateNode,p=m.getSnapshotBeforeUpdate(e.elementType===e.type?v:ht(e.type,v),A);m.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(E(163))}}catch(w){ue(e,e.return,w)}if(t=e.sibling,t!==null){t.return=e.return,k=t;break}k=e.return}return y=ff,ff=!1,y}function Ki(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Vc(e,n,s)}i=i.next}while(i!==r)}}function Wl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function $c(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Og(t){var e=t.alternate;e!==null&&(t.alternate=null,Og(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[It],delete e[hs],delete e[Pc],delete e[c0],delete e[u0])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Dg(t){return t.tag===5||t.tag===3||t.tag===4}function pf(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Dg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Bc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Bo));else if(r!==4&&(t=t.child,t!==null))for(Bc(t,e,n),t=t.sibling;t!==null;)Bc(t,e,n),t=t.sibling}function Gc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(Gc(t,e,n),t=t.sibling;t!==null;)Gc(t,e,n),t=t.sibling}var Ce=null,ft=!1;function nn(t,e,n){for(n=n.child;n!==null;)Lg(t,e,n),n=n.sibling}function Lg(t,e,n){if(Tt&&typeof Tt.onCommitFiberUnmount=="function")try{Tt.onCommitFiberUnmount(Ol,n)}catch{}switch(n.tag){case 5:Oe||Or(n,e);case 6:var r=Ce,i=ft;Ce=null,nn(t,e,n),Ce=r,ft=i,Ce!==null&&(ft?(t=Ce,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ce.removeChild(n.stateNode));break;case 18:Ce!==null&&(ft?(t=Ce,n=n.stateNode,t.nodeType===8?Ra(t.parentNode,n):t.nodeType===1&&Ra(t,n),ls(t)):Ra(Ce,n.stateNode));break;case 4:r=Ce,i=ft,Ce=n.stateNode.containerInfo,ft=!0,nn(t,e,n),Ce=r,ft=i;break;case 0:case 11:case 14:case 15:if(!Oe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Vc(n,e,o),i=i.next}while(i!==r)}nn(t,e,n);break;case 1:if(!Oe&&(Or(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ue(n,e,l)}nn(t,e,n);break;case 21:nn(t,e,n);break;case 22:n.mode&1?(Oe=(r=Oe)||n.memoizedState!==null,nn(t,e,n),Oe=r):nn(t,e,n);break;default:nn(t,e,n)}}function mf(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new I0),e.forEach(function(r){var i=M0.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function dt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Ce=l.stateNode,ft=!1;break e;case 3:Ce=l.stateNode.containerInfo,ft=!0;break e;case 4:Ce=l.stateNode.containerInfo,ft=!0;break e}l=l.return}if(Ce===null)throw Error(E(160));Lg(s,o,i),Ce=null,ft=!1;var a=i.alternate;a!==null&&(a.return=null),i.return=null}catch(c){ue(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Mg(e,t),e=e.sibling}function Mg(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(dt(e,t),Ct(t),r&4){try{Ki(3,t,t.return),Wl(3,t)}catch(v){ue(t,t.return,v)}try{Ki(5,t,t.return)}catch(v){ue(t,t.return,v)}}break;case 1:dt(e,t),Ct(t),r&512&&n!==null&&Or(n,n.return);break;case 5:if(dt(e,t),Ct(t),r&512&&n!==null&&Or(n,n.return),t.flags&32){var i=t.stateNode;try{rs(i,"")}catch(v){ue(t,t.return,v)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,a=t.updateQueue;if(t.updateQueue=null,a!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&im(i,s),gc(l,o);var c=gc(l,s);for(o=0;o<a.length;o+=2){var u=a[o],h=a[o+1];u==="style"?cm(i,h):u==="dangerouslySetInnerHTML"?lm(i,h):u==="children"?rs(i,h):Nu(i,u,h,c)}switch(l){case"input":dc(i,s);break;case"textarea":sm(i,s);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var g=s.value;g!=null?jr(i,!!s.multiple,g,!1):f!==!!s.multiple&&(s.defaultValue!=null?jr(i,!!s.multiple,s.defaultValue,!0):jr(i,!!s.multiple,s.multiple?[]:"",!1))}i[hs]=s}catch(v){ue(t,t.return,v)}}break;case 6:if(dt(e,t),Ct(t),r&4){if(t.stateNode===null)throw Error(E(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(v){ue(t,t.return,v)}}break;case 3:if(dt(e,t),Ct(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{ls(e.containerInfo)}catch(v){ue(t,t.return,v)}break;case 4:dt(e,t),Ct(t);break;case 13:dt(e,t),Ct(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(ld=he())),r&4&&mf(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(Oe=(c=Oe)||u,dt(e,t),Oe=c):dt(e,t),Ct(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(k=t,u=t.child;u!==null;){for(h=k=u;k!==null;){switch(f=k,g=f.child,f.tag){case 0:case 11:case 14:case 15:Ki(4,f,f.return);break;case 1:Or(f,f.return);var y=f.stateNode;if(typeof y.componentWillUnmount=="function"){r=f,n=f.return;try{e=r,y.props=e.memoizedProps,y.state=e.memoizedState,y.componentWillUnmount()}catch(v){ue(r,n,v)}}break;case 5:Or(f,f.return);break;case 22:if(f.memoizedState!==null){_f(h);continue}}g!==null?(g.return=f,k=g):_f(h)}u=u.sibling}e:for(u=null,h=t;;){if(h.tag===5){if(u===null){u=h;try{i=h.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=h.stateNode,a=h.memoizedProps.style,o=a!=null&&a.hasOwnProperty("display")?a.display:null,l.style.display=am("display",o))}catch(v){ue(t,t.return,v)}}}else if(h.tag===6){if(u===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(v){ue(t,t.return,v)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;u===h&&(u=null),h=h.return}u===h&&(u=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:dt(e,t),Ct(t),r&4&&mf(t);break;case 21:break;default:dt(e,t),Ct(t)}}function Ct(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Dg(n)){var r=n;break e}n=n.return}throw Error(E(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(rs(i,""),r.flags&=-33);var s=pf(t);Gc(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=pf(t);Bc(t,l,o);break;default:throw Error(E(161))}}catch(a){ue(t,t.return,a)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function N0(t,e,n){k=t,Fg(t)}function Fg(t,e,n){for(var r=(t.mode&1)!==0;k!==null;){var i=k,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ho;if(!o){var l=i.alternate,a=l!==null&&l.memoizedState!==null||Oe;l=ho;var c=Oe;if(ho=o,(Oe=a)&&!c)for(k=i;k!==null;)o=k,a=o.child,o.tag===22&&o.memoizedState!==null?yf(i):a!==null?(a.return=o,k=a):yf(i);for(;s!==null;)k=s,Fg(s),s=s.sibling;k=i,ho=l,Oe=c}gf(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,k=s):gf(t)}}function gf(t){for(;k!==null;){var e=k;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Oe||Wl(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Oe)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:ht(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Zh(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Zh(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var a=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var h=u.dehydrated;h!==null&&ls(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(E(163))}Oe||e.flags&512&&$c(e)}catch(f){ue(e,e.return,f)}}if(e===t){k=null;break}if(n=e.sibling,n!==null){n.return=e.return,k=n;break}k=e.return}}function _f(t){for(;k!==null;){var e=k;if(e===t){k=null;break}var n=e.sibling;if(n!==null){n.return=e.return,k=n;break}k=e.return}}function yf(t){for(;k!==null;){var e=k;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Wl(4,e)}catch(a){ue(e,n,a)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(a){ue(e,i,a)}}var s=e.return;try{$c(e)}catch(a){ue(e,s,a)}break;case 5:var o=e.return;try{$c(e)}catch(a){ue(e,o,a)}}}catch(a){ue(e,e.return,a)}if(e===t){k=null;break}var l=e.sibling;if(l!==null){l.return=e.return,k=l;break}k=e.return}}var R0=Math.ceil,nl=Jt.ReactCurrentDispatcher,sd=Jt.ReactCurrentOwner,at=Jt.ReactCurrentBatchConfig,W=0,xe=null,ge=null,Ie=0,Ye=0,Dr=Fn(0),ve=0,ys=null,tr=0,Hl=0,od=0,qi=null,$e=null,ld=0,ti=1/0,Lt=null,rl=!1,Kc=null,xn=null,fo=!1,gn=null,il=0,Qi=0,qc=null,No=-1,Ro=0;function je(){return W&6?he():No!==-1?No:No=he()}function Cn(t){return t.mode&1?W&2&&Ie!==0?Ie&-Ie:h0.transition!==null?(Ro===0&&(Ro=Em()),Ro):(t=V,t!==0||(t=window.event,t=t===void 0?16:Nm(t.type)),t):1}function vt(t,e,n,r){if(50<Qi)throw Qi=0,qc=null,Error(E(185));Ps(t,n,r),(!(W&2)||t!==xe)&&(t===xe&&(!(W&2)&&(Hl|=n),ve===4&&cn(t,Ie)),Qe(t,r),n===1&&W===0&&!(e.mode&1)&&(ti=he()+500,jl&&jn()))}function Qe(t,e){var n=t.callbackNode;hw(t,e);var r=Wo(t,t===xe?Ie:0);if(r===0)n!==null&&Ih(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Ih(n),e===1)t.tag===0?d0(vf.bind(null,t)):Km(vf.bind(null,t)),l0(function(){!(W&6)&&jn()}),n=null;else{switch(Sm(r)){case 1:n=Ou;break;case 4:n=vm;break;case 16:n=zo;break;case 536870912:n=wm;break;default:n=zo}n=Bg(n,jg.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function jg(t,e){if(No=-1,Ro=0,W&6)throw Error(E(327));var n=t.callbackNode;if(Vr()&&t.callbackNode!==n)return null;var r=Wo(t,t===xe?Ie:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=sl(t,r);else{e=r;var i=W;W|=2;var s=zg();(xe!==t||Ie!==e)&&(Lt=null,ti=he()+500,Yn(t,e));do try{b0();break}catch(l){Ug(t,l)}while(!0);Gu(),nl.current=s,W=i,ge!==null?e=0:(xe=null,Ie=0,e=ve)}if(e!==0){if(e===2&&(i=Ec(t),i!==0&&(r=i,e=Qc(t,i))),e===1)throw n=ys,Yn(t,0),cn(t,r),Qe(t,he()),n;if(e===6)cn(t,r);else{if(i=t.current.alternate,!(r&30)&&!P0(i)&&(e=sl(t,r),e===2&&(s=Ec(t),s!==0&&(r=s,e=Qc(t,s))),e===1))throw n=ys,Yn(t,0),cn(t,r),Qe(t,he()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(E(345));case 2:Vn(t,$e,Lt);break;case 3:if(cn(t,r),(r&130023424)===r&&(e=ld+500-he(),10<e)){if(Wo(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){je(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=Rc(Vn.bind(null,t,$e,Lt),e);break}Vn(t,$e,Lt);break;case 4:if(cn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-yt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=he()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*R0(r/1960))-r,10<r){t.timeoutHandle=Rc(Vn.bind(null,t,$e,Lt),r);break}Vn(t,$e,Lt);break;case 5:Vn(t,$e,Lt);break;default:throw Error(E(329))}}}return Qe(t,he()),t.callbackNode===n?jg.bind(null,t):null}function Qc(t,e){var n=qi;return t.current.memoizedState.isDehydrated&&(Yn(t,e).flags|=256),t=sl(t,e),t!==2&&(e=$e,$e=n,e!==null&&Yc(e)),t}function Yc(t){$e===null?$e=t:$e.push.apply($e,t)}function P0(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Et(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function cn(t,e){for(e&=~od,e&=~Hl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-yt(e),r=1<<n;t[n]=-1,e&=~r}}function vf(t){if(W&6)throw Error(E(327));Vr();var e=Wo(t,0);if(!(e&1))return Qe(t,he()),null;var n=sl(t,e);if(t.tag!==0&&n===2){var r=Ec(t);r!==0&&(e=r,n=Qc(t,r))}if(n===1)throw n=ys,Yn(t,0),cn(t,e),Qe(t,he()),n;if(n===6)throw Error(E(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Vn(t,$e,Lt),Qe(t,he()),null}function ad(t,e){var n=W;W|=1;try{return t(e)}finally{W=n,W===0&&(ti=he()+500,jl&&jn())}}function nr(t){gn!==null&&gn.tag===0&&!(W&6)&&Vr();var e=W;W|=1;var n=at.transition,r=V;try{if(at.transition=null,V=1,t)return t()}finally{V=r,at.transition=n,W=e,!(W&6)&&jn()}}function cd(){Ye=Dr.current,ee(Dr)}function Yn(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,o0(n)),ge!==null)for(n=ge.return;n!==null;){var r=n;switch(Vu(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Go();break;case 3:Zr(),ee(Ke),ee(De),Ju();break;case 5:Xu(r);break;case 4:Zr();break;case 13:ee(ie);break;case 19:ee(ie);break;case 10:Ku(r.type._context);break;case 22:case 23:cd()}n=n.return}if(xe=t,ge=t=kn(t.current,null),Ie=Ye=e,ve=0,ys=null,od=Hl=tr=0,$e=qi=null,Kn!==null){for(e=0;e<Kn.length;e++)if(n=Kn[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}Kn=null}return t}function Ug(t,e){do{var n=ge;try{if(Gu(),ko.current=tl,el){for(var r=oe.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}el=!1}if(er=0,Ee=_e=oe=null,Gi=!1,ms=0,sd.current=null,n===null||n.return===null){ve=1,ys=e,ge=null;break}e:{var s=t,o=n.return,l=n,a=e;if(e=Ie,l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var c=a,u=l,h=u.tag;if(!(u.mode&1)&&(h===0||h===11||h===15)){var f=u.alternate;f?(u.updateQueue=f.updateQueue,u.memoizedState=f.memoizedState,u.lanes=f.lanes):(u.updateQueue=null,u.memoizedState=null)}var g=of(o);if(g!==null){g.flags&=-257,lf(g,o,l,s,e),g.mode&1&&sf(s,c,e),e=g,a=c;var y=e.updateQueue;if(y===null){var v=new Set;v.add(a),e.updateQueue=v}else y.add(a);break e}else{if(!(e&1)){sf(s,c,e),ud();break e}a=Error(E(426))}}else if(te&&l.mode&1){var A=of(o);if(A!==null){!(A.flags&65536)&&(A.flags|=256),lf(A,o,l,s,e),$u(ei(a,l));break e}}s=a=ei(a,l),ve!==4&&(ve=2),qi===null?qi=[s]:qi.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var m=Sg(s,a,e);Jh(s,m);break e;case 1:l=a;var p=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof p.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(xn===null||!xn.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var w=xg(s,l,e);Jh(s,w);break e}}s=s.return}while(s!==null)}Hg(n)}catch(x){e=x,ge===n&&n!==null&&(ge=n=n.return);continue}break}while(!0)}function zg(){var t=nl.current;return nl.current=tl,t===null?tl:t}function ud(){(ve===0||ve===3||ve===2)&&(ve=4),xe===null||!(tr&268435455)&&!(Hl&268435455)||cn(xe,Ie)}function sl(t,e){var n=W;W|=2;var r=zg();(xe!==t||Ie!==e)&&(Lt=null,Yn(t,e));do try{A0();break}catch(i){Ug(t,i)}while(!0);if(Gu(),W=n,nl.current=r,ge!==null)throw Error(E(261));return xe=null,Ie=0,ve}function A0(){for(;ge!==null;)Wg(ge)}function b0(){for(;ge!==null&&!rw();)Wg(ge)}function Wg(t){var e=$g(t.alternate,t,Ye);t.memoizedProps=t.pendingProps,e===null?Hg(t):ge=e,sd.current=null}function Hg(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=k0(n,e),n!==null){n.flags&=32767,ge=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{ve=6,ge=null;return}}else if(n=C0(n,e,Ye),n!==null){ge=n;return}if(e=e.sibling,e!==null){ge=e;return}ge=e=t}while(e!==null);ve===0&&(ve=5)}function Vn(t,e,n){var r=V,i=at.transition;try{at.transition=null,V=1,O0(t,e,n,r)}finally{at.transition=i,V=r}return null}function O0(t,e,n,r){do Vr();while(gn!==null);if(W&6)throw Error(E(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(E(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(fw(t,s),t===xe&&(ge=xe=null,Ie=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||fo||(fo=!0,Bg(zo,function(){return Vr(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=at.transition,at.transition=null;var o=V;V=1;var l=W;W|=4,sd.current=null,T0(t,n),Mg(n,t),Zw(Tc),Ho=!!Ic,Tc=Ic=null,t.current=n,N0(n),iw(),W=l,V=o,at.transition=s}else t.current=n;if(fo&&(fo=!1,gn=t,il=i),s=t.pendingLanes,s===0&&(xn=null),lw(n.stateNode),Qe(t,he()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(rl)throw rl=!1,t=Kc,Kc=null,t;return il&1&&t.tag!==0&&Vr(),s=t.pendingLanes,s&1?t===qc?Qi++:(Qi=0,qc=t):Qi=0,jn(),null}function Vr(){if(gn!==null){var t=Sm(il),e=at.transition,n=V;try{if(at.transition=null,V=16>t?16:t,gn===null)var r=!1;else{if(t=gn,gn=null,il=0,W&6)throw Error(E(331));var i=W;for(W|=4,k=t.current;k!==null;){var s=k,o=s.child;if(k.flags&16){var l=s.deletions;if(l!==null){for(var a=0;a<l.length;a++){var c=l[a];for(k=c;k!==null;){var u=k;switch(u.tag){case 0:case 11:case 15:Ki(8,u,s)}var h=u.child;if(h!==null)h.return=u,k=h;else for(;k!==null;){u=k;var f=u.sibling,g=u.return;if(Og(u),u===c){k=null;break}if(f!==null){f.return=g,k=f;break}k=g}}}var y=s.alternate;if(y!==null){var v=y.child;if(v!==null){y.child=null;do{var A=v.sibling;v.sibling=null,v=A}while(v!==null)}}k=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,k=o;else e:for(;k!==null;){if(s=k,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Ki(9,s,s.return)}var m=s.sibling;if(m!==null){m.return=s.return,k=m;break e}k=s.return}}var p=t.current;for(k=p;k!==null;){o=k;var _=o.child;if(o.subtreeFlags&2064&&_!==null)_.return=o,k=_;else e:for(o=p;k!==null;){if(l=k,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Wl(9,l)}}catch(x){ue(l,l.return,x)}if(l===o){k=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,k=w;break e}k=l.return}}if(W=i,jn(),Tt&&typeof Tt.onPostCommitFiberRoot=="function")try{Tt.onPostCommitFiberRoot(Ol,t)}catch{}r=!0}return r}finally{V=n,at.transition=e}}return!1}function wf(t,e,n){e=ei(n,e),e=Sg(t,e,1),t=Sn(t,e,1),e=je(),t!==null&&(Ps(t,1,e),Qe(t,e))}function ue(t,e,n){if(t.tag===3)wf(t,t,n);else for(;e!==null;){if(e.tag===3){wf(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(xn===null||!xn.has(r))){t=ei(n,t),t=xg(e,t,1),e=Sn(e,t,1),t=je(),e!==null&&(Ps(e,1,t),Qe(e,t));break}}e=e.return}}function D0(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=je(),t.pingedLanes|=t.suspendedLanes&n,xe===t&&(Ie&n)===n&&(ve===4||ve===3&&(Ie&130023424)===Ie&&500>he()-ld?Yn(t,0):od|=n),Qe(t,e)}function Vg(t,e){e===0&&(t.mode&1?(e=no,no<<=1,!(no&130023424)&&(no=4194304)):e=1);var n=je();t=Kt(t,e),t!==null&&(Ps(t,e,n),Qe(t,n))}function L0(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Vg(t,n)}function M0(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(E(314))}r!==null&&r.delete(e),Vg(t,n)}var $g;$g=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Ke.current)Be=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Be=!1,x0(t,e,n);Be=!!(t.flags&131072)}else Be=!1,te&&e.flags&1048576&&qm(e,Qo,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;To(t,e),t=e.pendingProps;var i=Yr(e,De.current);Hr(e,n),i=ed(null,e,r,t,i,n);var s=td();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,qe(r)?(s=!0,Ko(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Qu(e),i.updater=zl,e.stateNode=i,i._reactInternals=e,Mc(e,r,t,n),e=Uc(null,e,r,!0,s,n)):(e.tag=0,te&&s&&Hu(e),Me(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(To(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=j0(r),t=ht(r,t),i){case 0:e=jc(null,e,r,t,n);break e;case 1:e=uf(null,e,r,t,n);break e;case 11:e=af(null,e,r,t,n);break e;case 14:e=cf(null,e,r,ht(r.type,t),n);break e}throw Error(E(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ht(r,i),jc(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ht(r,i),uf(t,e,r,i,n);case 3:e:{if(Tg(e),t===null)throw Error(E(387));r=e.pendingProps,s=e.memoizedState,i=s.element,eg(t,e),Jo(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=ei(Error(E(423)),e),e=df(t,e,r,n,i);break e}else if(r!==i){i=ei(Error(E(424)),e),e=df(t,e,r,n,i);break e}else for(Xe=En(e.stateNode.containerInfo.firstChild),Je=e,te=!0,pt=null,n=Jm(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Xr(),r===i){e=qt(t,e,n);break e}Me(t,e,r,n)}e=e.child}return e;case 5:return tg(e),t===null&&Oc(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,Nc(r,i)?o=null:s!==null&&Nc(r,s)&&(e.flags|=32),Ig(t,e),Me(t,e,o,n),e.child;case 6:return t===null&&Oc(e),null;case 13:return Ng(t,e,n);case 4:return Yu(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Jr(e,null,r,n):Me(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ht(r,i),af(t,e,r,i,n);case 7:return Me(t,e,e.pendingProps,n),e.child;case 8:return Me(t,e,e.pendingProps.children,n),e.child;case 12:return Me(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,X(Yo,r._currentValue),r._currentValue=o,s!==null)if(Et(s.value,o)){if(s.children===i.children&&!Ke.current){e=qt(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var a=l.firstContext;a!==null;){if(a.context===r){if(s.tag===1){a=Ht(-1,n&-n),a.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?a.next=a:(a.next=u.next,u.next=a),c.pending=a}}s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),Dc(s.return,n,e),l.lanes|=n;break}a=a.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(E(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Dc(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}Me(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Hr(e,n),i=ct(i),r=r(i),e.flags|=1,Me(t,e,r,n),e.child;case 14:return r=e.type,i=ht(r,e.pendingProps),i=ht(r.type,i),cf(t,e,r,i,n);case 15:return Cg(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:ht(r,i),To(t,e),e.tag=1,qe(r)?(t=!0,Ko(e)):t=!1,Hr(e,n),Eg(e,r,i),Mc(e,r,i,n),Uc(null,e,r,!0,t,n);case 19:return Rg(t,e,n);case 22:return kg(t,e,n)}throw Error(E(156,e.tag))};function Bg(t,e){return ym(t,e)}function F0(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ot(t,e,n,r){return new F0(t,e,n,r)}function dd(t){return t=t.prototype,!(!t||!t.isReactComponent)}function j0(t){if(typeof t=="function")return dd(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Pu)return 11;if(t===Au)return 14}return 2}function kn(t,e){var n=t.alternate;return n===null?(n=ot(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Po(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")dd(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Cr:return Xn(n.children,i,s,e);case Ru:o=8,i|=8;break;case oc:return t=ot(12,n,e,i|2),t.elementType=oc,t.lanes=s,t;case lc:return t=ot(13,n,e,i),t.elementType=lc,t.lanes=s,t;case ac:return t=ot(19,n,e,i),t.elementType=ac,t.lanes=s,t;case tm:return Vl(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Zp:o=10;break e;case em:o=9;break e;case Pu:o=11;break e;case Au:o=14;break e;case sn:o=16,r=null;break e}throw Error(E(130,t==null?t:typeof t,""))}return e=ot(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function Xn(t,e,n,r){return t=ot(7,t,r,e),t.lanes=n,t}function Vl(t,e,n,r){return t=ot(22,t,r,e),t.elementType=tm,t.lanes=n,t.stateNode={isHidden:!1},t}function Fa(t,e,n){return t=ot(6,t,null,e),t.lanes=n,t}function ja(t,e,n){return e=ot(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function U0(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ya(0),this.expirationTimes=ya(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ya(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function hd(t,e,n,r,i,s,o,l,a){return t=new U0(t,e,n,l,a),e===1?(e=1,s===!0&&(e|=8)):e=0,s=ot(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Qu(s),t}function z0(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:xr,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Gg(t){if(!t)return bn;t=t._reactInternals;e:{if(hr(t)!==t||t.tag!==1)throw Error(E(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(qe(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(E(171))}if(t.tag===1){var n=t.type;if(qe(n))return Gm(t,n,e)}return e}function Kg(t,e,n,r,i,s,o,l,a){return t=hd(n,r,!0,t,i,s,o,l,a),t.context=Gg(null),n=t.current,r=je(),i=Cn(n),s=Ht(r,i),s.callback=e??null,Sn(n,s,i),t.current.lanes=i,Ps(t,i,r),Qe(t,r),t}function $l(t,e,n,r){var i=e.current,s=je(),o=Cn(i);return n=Gg(n),e.context===null?e.context=n:e.pendingContext=n,e=Ht(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Sn(i,e,o),t!==null&&(vt(t,i,o,s),Co(t,i,o)),o}function ol(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Ef(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function fd(t,e){Ef(t,e),(t=t.alternate)&&Ef(t,e)}function W0(){return null}var qg=typeof reportError=="function"?reportError:function(t){console.error(t)};function pd(t){this._internalRoot=t}Bl.prototype.render=pd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(E(409));$l(t,e,null,null)};Bl.prototype.unmount=pd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;nr(function(){$l(null,t,null,null)}),e[Gt]=null}};function Bl(t){this._internalRoot=t}Bl.prototype.unstable_scheduleHydration=function(t){if(t){var e=km();t={blockedOn:null,target:t,priority:e};for(var n=0;n<an.length&&e!==0&&e<an[n].priority;n++);an.splice(n,0,t),n===0&&Tm(t)}};function md(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Gl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Sf(){}function H0(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=ol(o);s.call(c)}}var o=Kg(e,r,t,0,null,!1,!1,"",Sf);return t._reactRootContainer=o,t[Gt]=o.current,us(t.nodeType===8?t.parentNode:t),nr(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var c=ol(a);l.call(c)}}var a=hd(t,0,!1,null,null,!1,!1,"",Sf);return t._reactRootContainer=a,t[Gt]=a.current,us(t.nodeType===8?t.parentNode:t),nr(function(){$l(e,a,n,r)}),a}function Kl(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var a=ol(o);l.call(a)}}$l(e,o,t,i)}else o=H0(n,e,t,i,r);return ol(o)}xm=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Fi(e.pendingLanes);n!==0&&(Du(e,n|1),Qe(e,he()),!(W&6)&&(ti=he()+500,jn()))}break;case 13:nr(function(){var r=Kt(t,1);if(r!==null){var i=je();vt(r,t,1,i)}}),fd(t,1)}};Lu=function(t){if(t.tag===13){var e=Kt(t,134217728);if(e!==null){var n=je();vt(e,t,134217728,n)}fd(t,134217728)}};Cm=function(t){if(t.tag===13){var e=Cn(t),n=Kt(t,e);if(n!==null){var r=je();vt(n,t,e,r)}fd(t,e)}};km=function(){return V};Im=function(t,e){var n=V;try{return V=t,e()}finally{V=n}};yc=function(t,e,n){switch(e){case"input":if(dc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Fl(r);if(!i)throw Error(E(90));rm(r),dc(r,i)}}}break;case"textarea":sm(t,n);break;case"select":e=n.value,e!=null&&jr(t,!!n.multiple,e,!1)}};hm=ad;fm=nr;var V0={usingClientEntryPoint:!1,Events:[bs,Nr,Fl,um,dm,ad]},Ri={findFiberByHostInstance:Gn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},$0={bundleType:Ri.bundleType,version:Ri.version,rendererPackageName:Ri.rendererPackageName,rendererConfig:Ri.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Jt.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=gm(t),t===null?null:t.stateNode},findFiberByHostInstance:Ri.findFiberByHostInstance||W0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var po=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!po.isDisabled&&po.supportsFiber)try{Ol=po.inject($0),Tt=po}catch{}}tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=V0;tt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!md(e))throw Error(E(200));return z0(t,e,null,n)};tt.createRoot=function(t,e){if(!md(t))throw Error(E(299));var n=!1,r="",i=qg;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=hd(t,1,!1,null,null,n,!1,r,i),t[Gt]=e.current,us(t.nodeType===8?t.parentNode:t),new pd(e)};tt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(E(188)):(t=Object.keys(t).join(","),Error(E(268,t)));return t=gm(e),t=t===null?null:t.stateNode,t};tt.flushSync=function(t){return nr(t)};tt.hydrate=function(t,e,n){if(!Gl(e))throw Error(E(200));return Kl(null,t,e,!0,n)};tt.hydrateRoot=function(t,e,n){if(!md(t))throw Error(E(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=qg;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Kg(e,null,t,1,n??null,i,!1,s,o),t[Gt]=e.current,us(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Bl(e)};tt.render=function(t,e,n){if(!Gl(e))throw Error(E(200));return Kl(null,t,e,!1,n)};tt.unmountComponentAtNode=function(t){if(!Gl(t))throw Error(E(40));return t._reactRootContainer?(nr(function(){Kl(null,null,t,!1,function(){t._reactRootContainer=null,t[Gt]=null})}),!0):!1};tt.unstable_batchedUpdates=ad;tt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Gl(n))throw Error(E(200));if(t==null||t._reactInternals===void 0)throw Error(E(38));return Kl(t,e,n,!1,r)};tt.version="18.3.1-next-f1338f8080-20240426";function Qg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Qg)}catch(t){console.error(t)}}Qg(),Qp.exports=tt;var B0=Qp.exports,xf=B0;ic.createRoot=xf.createRoot,ic.hydrateRoot=xf.hydrateRoot;/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G0=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Yg=(...t)=>t.filter((e,n,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===n).join(" ").trim();/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var K0={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q0=M.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i="",children:s,iconNode:o,...l},a)=>M.createElement("svg",{ref:a,...K0,width:e,height:e,stroke:t,strokeWidth:r?Number(n)*24/Number(e):n,className:Yg("lucide",i),...l},[...o.map(([c,u])=>M.createElement(c,u)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=(t,e)=>{const n=M.forwardRef(({className:r,...i},s)=>M.createElement(q0,{ref:s,iconNode:e,className:Yg(`lucide-${G0(t)}`,r),...i}));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xc=ne("Bell",[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q0=ne("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y0=ne("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gd=ne("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _d=ne("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ll=ne("Clock3",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16.5 12",key:"1aq6pp"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X0=ne("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xg=ne("HeartPulse",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27",key:"1uw2ng"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J0=ne("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jg=ne("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ua=ne("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z0=ne("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eE=ne("LogIn",[["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}],["polyline",{points:"10 17 15 12 10 7",key:"1ail0h"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tE=ne("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nE=ne("MapPinned",[["path",{d:"M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",key:"11u0oz"}],["circle",{cx:"12",cy:"8",r:"2",key:"1822b1"}],["path",{d:"M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",key:"q8zwxj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=ne("MonitorSmartphone",[["path",{d:"M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8",key:"10dyio"}],["path",{d:"M10 19v-3.96 3.15",key:"1irgej"}],["path",{d:"M7 19h5",key:"qswx4l"}],["rect",{width:"6",height:"10",x:"16",y:"12",rx:"2",key:"1egngj"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rE=ne("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=ne("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iE=ne("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sE=ne("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zg=ne("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jc=ne("UserRound",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=ne("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oE=ne("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function lE({onBellClick:t,avatarSrc:e}){return d.jsxs("header",{className:"mb-8 flex items-center justify-between gap-4",children:[d.jsxs("div",{className:"flex items-center gap-4 sm:gap-5",children:[d.jsx("img",{src:e,alt:"Caregiver avatar",className:"h-12 w-12 rounded-full border-[3px] border-brand object-cover sm:h-16 sm:w-16"}),d.jsx("div",{className:"text-[34px] font-black tracking-tight text-brand sm:text-[52px] lg:text-[68px]",children:"Remember.For.Me"})]}),d.jsx("button",{type:"button",onClick:t,className:"rounded-full p-3 text-brand transition hover:bg-white/70","aria-label":"Notifications",children:d.jsx(Xc,{className:"h-7 w-7 stroke-[2.2]"})})]})}function aE({activeTab:t,onChange:e}){const n=[{label:"Home",icon:Jg,value:"home"},{label:"History",icon:J0,value:"history"},{label:"Settings",icon:sE,value:"settings"}];return d.jsxs(d.Fragment,{children:[d.jsx("nav",{className:"fixed inset-x-3 bottom-0 z-40 rounded-t-[28px] border border-white/80 bg-white/95 px-4 pb-5 pt-4 shadow-[0_-10px_30px_rgba(28,39,72,0.08)] backdrop-blur sm:inset-x-8",children:d.jsx("div",{className:"mx-auto grid max-w-[1720px] grid-cols-3 gap-4",children:n.map(r=>{const i=t===r.value;return d.jsx("button",{type:"button",onClick:()=>e(r.value),className:`flex flex-col items-center justify-center gap-1 rounded-full px-4 py-3 text-lg font-semibold ${i?"text-[#351898]":"text-slate-600"}`,children:d.jsxs("span",{className:`inline-flex h-14 min-w-[110px] items-center justify-center gap-2 rounded-full px-6 transition ${i?"bg-active/85 text-[#351898]":"bg-transparent"}`,children:[d.jsx(r.icon,{className:"h-7 w-7"}),r.label]})},r.label)})})}),d.jsx("button",{type:"button","aria-label":"Help",onClick:()=>e("settings"),className:"fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#2a2a2a] text-3xl font-medium text-white shadow-xl",children:"?"})]})}function cE({message:t,onDismiss:e}){return d.jsx("div",{className:"fixed bottom-28 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl bg-slate-900 px-5 py-4 text-base font-medium text-white shadow-2xl",children:d.jsxs("div",{className:"flex items-start justify-between gap-4",children:[d.jsx("span",{children:t}),d.jsx("button",{type:"button",onClick:e,className:"text-white/70 hover:text-white",children:d.jsx(oE,{className:"h-5 w-5"})})]})})}function Tf({title:t,body:e,confirmLabel:n,onCancel:r,onConfirm:i}){return d.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4",children:d.jsxs("div",{className:"w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl sm:p-8",children:[d.jsx("h3",{className:"text-3xl font-extrabold text-slate-900",children:t}),d.jsx("p",{className:"mt-3 text-lg text-slate-600",children:e}),d.jsxs("div",{className:"mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",children:[d.jsx("button",{type:"button",onClick:r,className:"rounded-full border border-slate-200 px-6 py-3 text-lg font-semibold text-slate-700 transition hover:bg-slate-50",children:"Cancel"}),d.jsx("button",{type:"button",onClick:i,className:"rounded-full bg-[#c91818] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#b11212]",children:n})]})]})})}function al({icon:t,label:e,value:n}){return d.jsxs("article",{className:"info-box min-h-[140px] sm:min-h-[160px]",children:[t?d.jsx("div",{className:"mb-3",children:t}):null,d.jsxs("div",{className:"space-y-1",children:[d.jsx("p",{className:"text-xl font-medium text-slate-600 sm:text-[18px]",children:e}),d.jsx("div",{className:"text-2xl font-extrabold text-slate-900 sm:text-[22px]",children:n})]})]})}const uE=()=>{};var Nf={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const e_={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S=function(t,e){if(!t)throw fi(e)},fi=function(t){return new Error("Firebase Database ("+e_.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const t_=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},dE=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],a=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(a>>10)),e[r++]=String.fromCharCode(56320+(a&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},yd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,a=i+2<t.length,c=a?t[i+2]:0,u=s>>2,h=(s&3)<<4|l>>4;let f=(l&15)<<2|c>>6,g=c&63;a||(g=64,o||(f=64)),r.push(n[u],n[h],n[f],n[g])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(t_(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):dE(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const h=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||c==null||h==null)throw new hE;const f=s<<2|l>>4;if(r.push(f),c!==64){const g=l<<4&240|c>>2;if(r.push(g),h!==64){const y=c<<6&192|h;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class hE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const n_=function(t){const e=t_(t);return yd.encodeByteArray(e,!0)},cl=function(t){return n_(t).replace(/\./g,"")},ul=function(t){try{return yd.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fE(t){return r_(void 0,t)}function r_(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!pE(n)||(t[n]=r_(t[n],e[n]));return t}function pE(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gE=()=>mE().__FIREBASE_DEFAULTS__,_E=()=>{if(typeof process>"u"||typeof Nf>"u")return;const t=Nf.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},yE=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ul(t[1]);return e&&JSON.parse(e)},vd=()=>{try{return uE()||gE()||_E()||yE()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},i_=t=>{var e,n;return(n=(e=vd())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},vE=t=>{const e=i_(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},s_=()=>{var t;return(t=vd())==null?void 0:t.config},o_=t=>{var e;return(e=vd())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[cl(JSON.stringify(n)),cl(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ze(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function wd(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ze())}function EE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function SE(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function l_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xE(){const t=ze();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function CE(){return e_.NODE_ADMIN===!0}function kE(){try{return typeof indexedDB=="object"}catch{return!1}}function IE(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TE="FirebaseError";class Un extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=TE,Object.setPrototypeOf(this,Un.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ds.prototype.create)}}class Ds{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?NE(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Un(i,l,r)}}function NE(t,e){return t.replace(RE,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const RE=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(t){return JSON.parse(t)}function ye(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const a_=function(t){let e={},n={},r={},i="";try{const s=t.split(".");e=vs(ul(s[0])||""),n=vs(ul(s[1])||""),i=s[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:i}},PE=function(t){const e=a_(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},AE=function(t){const e=a_(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function rr(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Zc(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function dl(t,e,n){const r={};for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}function ir(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(Rf(s)&&Rf(o)){if(!ir(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function Rf(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ui(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function zi(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)r[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)r[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const f=r[h-3]^r[h-8]^r[h-14]^r[h-16];r[h]=(f<<1|f>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=l^s&(o^l),u=1518500249):(c=s^o^l,u=1859775393):h<60?(c=s&o|l&(s|o),u=2400959708):(c=s^o^l,u=3395469782);const f=(i<<5|i>>>27)+c+a+u+r[h]&4294967295;a=l,l=o,o=(s<<30|s>>>2)&4294967295,s=i,i=f}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let i=0;const s=this.buf_;let o=this.inbuf_;for(;i<n;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<n;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<n;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}}function OE(t,e){const n=new DE(t,e);return n.subscribe.bind(n)}class DE{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");LE(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=za),i.error===void 0&&(i.error=za),i.complete===void 0&&(i.complete=za);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function LE(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function za(){}function ql(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ME=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);if(i>=55296&&i<=56319){const s=i-55296;r++,S(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):i<65536?(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},Ql=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function c_(t){return(await fetch(t,{credentials:"include"})).ok}class sr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FE{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new fr;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(UE(e))try{this.getOrInitializeService({instanceIdentifier:$n})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=$n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=$n){return this.instances.has(e)}getOptions(e=$n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:jE(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=$n){return this.component?this.component.multipleInstances?e:$n:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jE(t){return t===$n?void 0:t}function UE(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new FE(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})($||($={}));const WE={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},HE=$.INFO,VE={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},$E=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=VE[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ed{constructor(e){this.name=e,this._logLevel=HE,this._logHandler=$E,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in $))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?WE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...e),this._logHandler(this,$.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...e),this._logHandler(this,$.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,$.INFO,...e),this._logHandler(this,$.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,$.WARN,...e),this._logHandler(this,$.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...e),this._logHandler(this,$.ERROR,...e)}}const BE=(t,e)=>e.some(n=>t instanceof n);let Pf,Af;function GE(){return Pf||(Pf=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function KE(){return Af||(Af=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const u_=new WeakMap,eu=new WeakMap,d_=new WeakMap,Wa=new WeakMap,Sd=new WeakMap;function qE(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(In(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&u_.set(n,t)}).catch(()=>{}),Sd.set(e,t),e}function QE(t){if(eu.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});eu.set(t,e)}let tu={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return eu.get(t);if(e==="objectStoreNames")return t.objectStoreNames||d_.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return In(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function YE(t){tu=t(tu)}function XE(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ha(this),e,...n);return d_.set(r,e.sort?e.sort():[e]),In(r)}:KE().includes(t)?function(...e){return t.apply(Ha(this),e),In(u_.get(this))}:function(...e){return In(t.apply(Ha(this),e))}}function JE(t){return typeof t=="function"?XE(t):(t instanceof IDBTransaction&&QE(t),BE(t,GE())?new Proxy(t,tu):t)}function In(t){if(t instanceof IDBRequest)return qE(t);if(Wa.has(t))return Wa.get(t);const e=JE(t);return e!==t&&(Wa.set(t,e),Sd.set(e,t)),e}const Ha=t=>Sd.get(t);function ZE(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=In(o);return r&&o.addEventListener("upgradeneeded",a=>{r(In(o.result),a.oldVersion,a.newVersion,In(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{s&&a.addEventListener("close",()=>s()),i&&a.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const eS=["get","getKey","getAll","getAllKeys","count"],tS=["put","add","delete","clear"],Va=new Map;function bf(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Va.get(e))return Va.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=tS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||eS.includes(n)))return;const s=async function(o,...l){const a=this.transaction(o,i?"readwrite":"readonly");let c=a.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&a.done]))[0]};return Va.set(e,s),s}YE(t=>({...t,get:(e,n,r)=>bf(e,n)||t.get(e,n,r),has:(e,n)=>!!bf(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(rS(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function rS(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const nu="@firebase/app",Of="0.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt=new Ed("@firebase/app"),iS="@firebase/app-compat",sS="@firebase/analytics-compat",oS="@firebase/analytics",lS="@firebase/app-check-compat",aS="@firebase/app-check",cS="@firebase/auth",uS="@firebase/auth-compat",dS="@firebase/database",hS="@firebase/data-connect",fS="@firebase/database-compat",pS="@firebase/functions",mS="@firebase/functions-compat",gS="@firebase/installations",_S="@firebase/installations-compat",yS="@firebase/messaging",vS="@firebase/messaging-compat",wS="@firebase/performance",ES="@firebase/performance-compat",SS="@firebase/remote-config",xS="@firebase/remote-config-compat",CS="@firebase/storage",kS="@firebase/storage-compat",IS="@firebase/firestore",TS="@firebase/ai",NS="@firebase/firestore-compat",RS="firebase",PS="12.15.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru="[DEFAULT]",AS={[nu]:"fire-core",[iS]:"fire-core-compat",[oS]:"fire-analytics",[sS]:"fire-analytics-compat",[aS]:"fire-app-check",[lS]:"fire-app-check-compat",[cS]:"fire-auth",[uS]:"fire-auth-compat",[dS]:"fire-rtdb",[hS]:"fire-data-connect",[fS]:"fire-rtdb-compat",[pS]:"fire-fn",[mS]:"fire-fn-compat",[gS]:"fire-iid",[_S]:"fire-iid-compat",[yS]:"fire-fcm",[vS]:"fire-fcm-compat",[wS]:"fire-perf",[ES]:"fire-perf-compat",[SS]:"fire-rc",[xS]:"fire-rc-compat",[CS]:"fire-gcs",[kS]:"fire-gcs-compat",[IS]:"fire-fst",[NS]:"fire-fst-compat",[TS]:"fire-vertex","fire-js":"fire-js",[RS]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hl=new Map,bS=new Map,iu=new Map;function Df(t,e){try{t.container.addComponent(e)}catch(n){Qt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ni(t){const e=t.name;if(iu.has(e))return Qt.debug(`There were multiple attempts to register component ${e}.`),!1;iu.set(e,t);for(const n of hl.values())Df(n,t);for(const n of bS.values())Df(n,t);return!0}function xd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function st(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Tn=new Ds("app","Firebase",OS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DS{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new sr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Tn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mi=PS;function h_(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:ru,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Tn.create("bad-app-name",{appName:String(i)});if(n||(n=s_()),!n)throw Tn.create("no-options");const s=hl.get(i);if(s){if(ir(n,s.options)&&ir(r,s.config))return s;throw Tn.create("duplicate-app",{appName:i})}const o=new zE(i);for(const a of iu.values())o.addComponent(a);const l=new DS(n,r,o);return hl.set(i,l),l}function f_(t=ru){const e=hl.get(t);if(!e&&t===ru&&s_())return h_();if(!e)throw Tn.create("no-app",{appName:t});return e}function Nn(t,e,n){let r=AS[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Qt.warn(o.join(" "));return}ni(new sr(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LS="firebase-heartbeat-database",MS=1,ws="firebase-heartbeat-store";let $a=null;function p_(){return $a||($a=ZE(LS,MS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ws)}catch(n){console.warn(n)}}}}).catch(t=>{throw Tn.create("idb-open",{originalErrorMessage:t.message})})),$a}async function FS(t){try{const n=(await p_()).transaction(ws),r=await n.objectStore(ws).get(m_(t));return await n.done,r}catch(e){if(e instanceof Un)Qt.warn(e.message);else{const n=Tn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Qt.warn(n.message)}}}async function Lf(t,e){try{const r=(await p_()).transaction(ws,"readwrite");await r.objectStore(ws).put(e,m_(t)),await r.done}catch(n){if(n instanceof Un)Qt.warn(n.message);else{const r=Tn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Qt.warn(r.message)}}}function m_(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jS=1024,US=30;class zS{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new HS(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Mf();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>US){const o=VS(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Qt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Mf(),{heartbeatsToSend:r,unsentEntries:i}=WS(this._heartbeatsCache.heartbeats),s=cl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Qt.warn(n),""}}}function Mf(){return new Date().toISOString().substring(0,10)}function WS(t,e=jS){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Ff(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ff(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class HS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return kE()?IE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await FS(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Lf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Lf(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Ff(t){return cl(JSON.stringify({version:2,heartbeats:t})).length}function VS(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $S(t){ni(new sr("platform-logger",e=>new nS(e),"PRIVATE")),ni(new sr("heartbeat",e=>new zS(e),"PRIVATE")),Nn(nu,Of,t),Nn(nu,Of,"esm2020"),Nn("fire-js","")}$S("");var BS="firebase",GS="12.15.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Nn(BS,GS,"app");function g_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const KS=g_,__=new Ds("auth","Firebase",g_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fl=new Ed("@firebase/auth");function qS(t,...e){fl.logLevel<=$.WARN&&fl.warn(`Auth (${mi}): ${t}`,...e)}function Ao(t,...e){fl.logLevel<=$.ERROR&&fl.error(`Auth (${mi}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(t,...e){throw Cd(t,...e)}function Rt(t,...e){return Cd(t,...e)}function y_(t,e,n){const r={...KS(),[e]:n};return new Ds("auth","Firebase",r).create(e,{appName:t.name})}function Vt(t){return y_(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Cd(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return __.create(t,...e)}function P(t,e,...n){if(!t)throw Cd(e,...n)}function Ut(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Ao(e),new Error(e)}function Yt(t,e){t||Ut(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function su(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function QS(){return jf()==="http:"||jf()==="https:"}function jf(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YS(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(QS()||SE()||"connection"in navigator)?navigator.onLine:!0}function XS(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ms{constructor(e,n){this.shortDelay=e,this.longDelay=n,Yt(n>e,"Short delay should be less than long delay!"),this.isMobile=wd()||l_()}get(){return YS()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kd(t,e){Yt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ut("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ut("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ut("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JS={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZS=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ex=new Ms(3e4,6e4);function zn(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Zt(t,e,n,r,i={}){return w_(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=pi({...o,key:t.config.apiKey}).slice(1),a=await t._getAdditionalHeaders();a["Content-Type"]="application/json",t.languageCode&&(a["X-Firebase-Locale"]=t.languageCode);const c={method:e,headers:a,...s};return EE()||(c.referrerPolicy="strict-origin-when-cross-origin"),t.emulatorConfig&&Ls(t.emulatorConfig.host)&&(c.credentials="include"),v_.fetch()(await E_(t,t.config.apiHost,n,l),c)})}async function w_(t,e,n){t._canInitEmulator=!1;const r={...JS,...e};try{const i=new nx(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw mo(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[a,c]=l.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw mo(t,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw mo(t,"email-already-in-use",o);if(a==="USER_DISABLED")throw mo(t,"user-disabled",o);const u=r[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw y_(t,u,c);St(t,u)}}catch(i){if(i instanceof Un)throw i;St(t,"network-request-failed",{message:String(i)})}}async function Fs(t,e,n,r,i={}){const s=await Zt(t,e,n,r,i);return"mfaPendingCredential"in s&&St(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function E_(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?kd(t.config,i):`${t.config.apiScheme}://${i}`;return ZS.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function tx(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class nx{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Rt(this.auth,"network-request-failed")),ex.get())})}}function mo(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Rt(t,e,r);return i.customData._tokenResponse=n,i}function Uf(t){return t!==void 0&&t.enterprise!==void 0}class rx{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return tx(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ix(t,e){return Zt(t,"GET","/v2/recaptchaConfig",zn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sx(t,e){return Zt(t,"POST","/v1/accounts:delete",e)}async function pl(t,e){return Zt(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ox(t,e=!1){const n=Re(t),r=await n.getIdToken(e),i=Id(r);P(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Yi(Ba(i.auth_time)),issuedAtTime:Yi(Ba(i.iat)),expirationTime:Yi(Ba(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ba(t){return Number(t)*1e3}function Id(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Ao("JWT malformed, contained fewer than 3 sections"),null;try{const i=ul(n);return i?JSON.parse(i):(Ao("Failed to decode base64 JWT payload"),null)}catch(i){return Ao("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function zf(t){const e=Id(t);return P(e,"internal-error"),P(typeof e.exp<"u","internal-error"),P(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ri(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Un&&lx(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function lx({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ax{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Yi(this.lastLoginAt),this.creationTime=Yi(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ml(t){var h;const e=t.auth,n=await t.getIdToken(),r=await ri(t,pl(e,{idToken:n}));P(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=(h=i.providerUserInfo)!=null&&h.length?S_(i.providerUserInfo):[],o=ux(t.providerData,s),l=t.isAnonymous,a=!(t.email&&i.passwordHash)&&!(o!=null&&o.length),c=l?a:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new ou(i.createdAt,i.lastLoginAt),isAnonymous:c};Object.assign(t,u)}async function cx(t){const e=Re(t);await ml(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ux(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function S_(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dx(t,e){const n=await w_(t,{},async()=>{const r=pi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await E_(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:l,body:r};return t.emulatorConfig&&Ls(t.emulatorConfig.host)&&(a.credentials="include"),v_.fetch()(o,a)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function hx(t,e){return Zt(t,"POST","/v2/accounts:revokeToken",zn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){P(e.idToken,"internal-error"),P(typeof e.idToken<"u","internal-error"),P(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){P(e.length!==0,"internal-error");const n=zf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(P(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await dx(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new $r;return r&&(P(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(P(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(P(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new $r,this.toJSON())}_performRefresh(){return Ut("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(t,e){P(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class gt{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new ax(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ou(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ri(this,this.stsTokenManager.getToken(this.auth,e));return P(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return ox(this,e)}reload(){return cx(this)}_assign(e){this!==e&&(P(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new gt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){P(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await ml(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(st(this.auth.app))return Promise.reject(Vt(this.auth));const e=await this.getIdToken();return await ri(this,sx(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,l=n.tenantId??void 0,a=n._redirectEventId??void 0,c=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:h,emailVerified:f,isAnonymous:g,providerData:y,stsTokenManager:v}=n;P(h&&v,e,"internal-error");const A=$r.fromJSON(this.name,v);P(typeof h=="string",e,"internal-error"),rn(r,e.name),rn(i,e.name),P(typeof f=="boolean",e,"internal-error"),P(typeof g=="boolean",e,"internal-error"),rn(s,e.name),rn(o,e.name),rn(l,e.name),rn(a,e.name),rn(c,e.name),rn(u,e.name);const m=new gt({uid:h,auth:e,email:i,emailVerified:f,displayName:r,isAnonymous:g,photoURL:o,phoneNumber:s,tenantId:l,stsTokenManager:A,createdAt:c,lastLoginAt:u});return y&&Array.isArray(y)&&(m.providerData=y.map(p=>({...p}))),a&&(m._redirectEventId=a),m}static async _fromIdTokenResponse(e,n,r=!1){const i=new $r;i.updateFromServerResponse(n);const s=new gt({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ml(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];P(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?S_(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new $r;l.updateFromIdToken(r);const a=new gt({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ou(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(a,c),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf=new Map;function zt(t){Yt(t instanceof Function,"Expected a class definition");let e=Wf.get(t);return e?(Yt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Wf.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}x_.type="NONE";const Hf=x_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bo(t,e,n){return`firebase:${t}:${e}:${n}`}class Br{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=bo(this.userKey,i.apiKey,s),this.fullPersistenceKey=bo("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await pl(this.auth,{idToken:e}).catch(()=>{});return n?gt._fromGetAccountInfoResponse(this.auth,n,e):null}return gt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Br(zt(Hf),e,r);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||zt(Hf);const o=bo(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const u=await c._get(o);if(u){let h;if(typeof u=="string"){const f=await pl(e,{idToken:u}).catch(()=>{});if(!f)break;h=await gt._fromGetAccountInfoResponse(e,f,u)}else h=gt._fromJSON(e,u);c!==s&&(l=h),s=c;break}}catch{}const a=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!a.length?new Br(s,e,r):(s=a[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new Br(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(T_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(C_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(R_(e))return"Blackberry";if(P_(e))return"Webos";if(k_(e))return"Safari";if((e.includes("chrome/")||I_(e))&&!e.includes("edge/"))return"Chrome";if(N_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function C_(t=ze()){return/firefox\//i.test(t)}function k_(t=ze()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function I_(t=ze()){return/crios\//i.test(t)}function T_(t=ze()){return/iemobile/i.test(t)}function N_(t=ze()){return/android/i.test(t)}function R_(t=ze()){return/blackberry/i.test(t)}function P_(t=ze()){return/webos/i.test(t)}function Td(t=ze()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function fx(t=ze()){var e;return Td(t)&&!!((e=window.navigator)!=null&&e.standalone)}function px(){return xE()&&document.documentMode===10}function A_(t=ze()){return Td(t)||N_(t)||P_(t)||R_(t)||/windows phone/i.test(t)||T_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function b_(t,e=[]){let n;switch(t){case"Browser":n=Vf(ze());break;case"Worker":n=`${Vf(ze())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${mi}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mx{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const a=e(s);o(a)}catch(a){l(a)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gx(t,e={}){return Zt(t,"GET","/v2/passwordPolicy",zn(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _x=6;class yx{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??_x,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vx{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new $f(this),this.idTokenSubscription=new $f(this),this.beforeStateQueue=new mx(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=__,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=zt(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Br.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await pl(this,{idToken:e}),r=await gt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(st(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,l=r==null?void 0:r._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===l)&&(a!=null&&a.user)&&(r=a.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return P(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ml(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=XS()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(st(this.app))return Promise.reject(Vt(this));const n=e?Re(e):null;return n&&P(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&P(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return st(this.app)?Promise.reject(Vt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return st(this.app)?Promise.reject(Vt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(zt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await gx(this),n=new yx(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ds("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await hx(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&zt(e)||this._popupRedirectResolver;P(n,this,"argument-error"),this.redirectPersistenceManager=await Br.create(this,[zt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(P(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const a=e.addObserver(n,r,i);return()=>{o=!0,a()}}else{const a=e.addObserver(n);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return P(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=b_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(st(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&qS(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function pr(t){return Re(t)}class $f{constructor(e){this.auth=e,this.observer=null,this.addObserver=OE(n=>this.observer=n)}get next(){return P(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Yl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function wx(t){Yl=t}function O_(t){return Yl.loadJS(t)}function Ex(){return Yl.recaptchaEnterpriseScript}function Sx(){return Yl.gapiScript}function xx(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class Cx{constructor(){this.enterprise=new kx}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class kx{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const Ix="recaptcha-enterprise",D_="NO_RECAPTCHA",Bf="onFirebaseAuthREInstanceReady";class un{constructor(e){this.type=Ix,this.auth=pr(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{ix(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(a=>{if(a.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const c=new rx(a);return s.tenantId==null?s._agentRecaptchaConfig=c:s._tenantRecaptchaConfigs[s.tenantId]=c,o(c.siteKey)}}).catch(a=>{l(a)})})}function i(s,o,l){const a=window.grecaptcha;Uf(a)?a.enterprise.ready(()=>{a.enterprise.execute(s,{action:e}).then(c=>{o(c)}).catch(()=>{o(D_)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Cx().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(async l=>{if(!n&&Uf(window.grecaptcha)&&un.scriptInjectionDeferred)await un.scriptInjectionDeferred.promise,i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let a=Ex();a.length!==0&&(a+=l+`&onload=${Bf}`),un.scriptInjectionDeferred=new fr,window[Bf]=()=>{var c;(c=un.scriptInjectionDeferred)==null||c.resolve()},O_(a).then(()=>{var c;return(c=un.scriptInjectionDeferred)==null?void 0:c.promise}).then(()=>{i(l,s,o)}).catch(c=>{o(c)})}}).catch(l=>{o(l)})})}}un.scriptInjectionDeferred=null;async function Gf(t,e,n,r=!1,i=!1){const s=new un(t);let o;if(i)o=D_;else try{o=await s.verify(n)}catch{o=await s.verify(n,!0)}const l={...e};if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const a=l.phoneEnrollmentInfo.phoneNumber,c=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:a,recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const a=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:a,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function lu(t,e,n,r,i){var s;if((s=t._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Gf(t,e,n,n==="getOobCode");return r(t,o)}else return r(t,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await Gf(t,e,n,n==="getOobCode");return r(t,l)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tx(t,e){const n=xd(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(ir(s,e??{}))return i;St(i,"already-initialized")}return n.initialize({options:e})}function Nx(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(zt);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Rx(t,e,n){const r=pr(t);P(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=L_(e),{host:o,port:l}=Px(e),a=l===null?"":`:${l}`,c={url:`${s}//${o}${a}/`},u=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){P(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),P(ir(c,r.config.emulator)&&ir(u,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=c,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,Ls(o)?c_(`${s}//${o}${a}`):Ax()}function L_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Px(t){const e=L_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Kf(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Kf(o)}}}function Kf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Ax(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Ut("not implemented")}_getIdTokenResponse(e){return Ut("not implemented")}_linkToIdToken(e,n){return Ut("not implemented")}_getReauthenticationResolver(e){return Ut("not implemented")}}async function bx(t,e){return Zt(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ox(t,e){return Fs(t,"POST","/v1/accounts:signInWithPassword",zn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dx(t,e){return Fs(t,"POST","/v1/accounts:signInWithEmailLink",zn(t,e))}async function Lx(t,e){return Fs(t,"POST","/v1/accounts:signInWithEmailLink",zn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Es extends Nd{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Es(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Es(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return lu(e,n,"signInWithPassword",Ox);case"emailLink":return Dx(e,{email:this._email,oobCode:this._password});default:St(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return lu(e,r,"signUpPassword",bx);case"emailLink":return Lx(e,{idToken:n,email:this._email,oobCode:this._password});default:St(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gr(t,e){return Fs(t,"POST","/v1/accounts:signInWithIdp",zn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mx="http://localhost";class or extends Nd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new or(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):St("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new or(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Gr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Gr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Gr(e,n)}buildRequest(){const e={requestUri:Mx,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=pi(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fx(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function jx(t){const e=Ui(zi(t)).link,n=e?Ui(zi(e)).deep_link_id:null,r=Ui(zi(t)).deep_link_id;return(r?Ui(zi(r)).link:null)||r||n||e||t}class Rd{constructor(e){const n=Ui(zi(e)),r=n.apiKey??null,i=n.oobCode??null,s=Fx(n.mode??null);P(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=n.continueUrl??null,this.languageCode=n.lang??null,this.tenantId=n.tenantId??null}static parseLink(e){const n=jx(e);try{return new Rd(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(){this.providerId=gi.PROVIDER_ID}static credential(e,n){return Es._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Rd.parseLink(n);return P(r,"argument-error"),Es._fromEmailAndCode(e,r.code,r.tenantId)}}gi.PROVIDER_ID="password";gi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";gi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js extends M_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn extends js{constructor(){super("facebook.com")}static credential(e){return or._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return dn.credentialFromTaggedObject(e)}static credentialFromError(e){return dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return dn.credential(e.oauthAccessToken)}catch{return null}}}dn.FACEBOOK_SIGN_IN_METHOD="facebook.com";dn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends js{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return or._fromParams({providerId:hn.PROVIDER_ID,signInMethod:hn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return hn.credentialFromTaggedObject(e)}static credentialFromError(e){return hn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return hn.credential(n,r)}catch{return null}}}hn.GOOGLE_SIGN_IN_METHOD="google.com";hn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn extends js{constructor(){super("github.com")}static credential(e){return or._fromParams({providerId:fn.PROVIDER_ID,signInMethod:fn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return fn.credentialFromTaggedObject(e)}static credentialFromError(e){return fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return fn.credential(e.oauthAccessToken)}catch{return null}}}fn.GITHUB_SIGN_IN_METHOD="github.com";fn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn extends js{constructor(){super("twitter.com")}static credential(e,n){return or._fromParams({providerId:pn.PROVIDER_ID,signInMethod:pn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return pn.credentialFromTaggedObject(e)}static credentialFromError(e){return pn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return pn.credential(n,r)}catch{return null}}}pn.TWITTER_SIGN_IN_METHOD="twitter.com";pn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ux(t,e){return Fs(t,"POST","/v1/accounts:signUp",zn(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await gt._fromIdTokenResponse(e,r,i),o=qf(r);return new lr({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=qf(r);return new lr({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function qf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl extends Un{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,gl.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new gl(e,n,r,i)}}function F_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?gl._fromErrorAndOperation(t,s,e,r):s})}async function zx(t,e,n=!1){const r=await ri(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return lr._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wx(t,e,n=!1){const{auth:r}=t;if(st(r.app))return Promise.reject(Vt(r));const i="reauthenticate";try{const s=await ri(t,F_(r,i,e,t),n);P(s.idToken,r,"internal-error");const o=Id(s.idToken);P(o,r,"internal-error");const{sub:l}=o;return P(t.uid===l,r,"user-mismatch"),lr._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&St(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function j_(t,e,n=!1){if(st(t.app))return Promise.reject(Vt(t));const r="signIn",i=await F_(t,r,e),s=await lr._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function Hx(t,e){return j_(pr(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U_(t){const e=pr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Vx(t,e,n){if(st(t.app))return Promise.reject(Vt(t));const r=pr(t),o=await lu(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Ux).catch(a=>{throw a.code==="auth/password-does-not-meet-requirements"&&U_(t),a}),l=await lr._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function $x(t,e,n){return st(t.app)?Promise.reject(Vt(t)):Hx(Re(t),gi.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&U_(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bx(t,e){return Zt(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gx(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=Re(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await ri(r,Bx(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:a})=>a==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function Kx(t,e,n,r){return Re(t).onIdTokenChanged(e,n,r)}function qx(t,e,n){return Re(t).beforeAuthStateChanged(e,n)}function Qx(t,e,n,r){return Re(t).onAuthStateChanged(e,n,r)}function Yx(t){return Re(t).signOut()}const _l="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(_l,"1"),this.storage.removeItem(_l),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xx=1e3,Jx=10;class W_ extends z_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=A_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,a)=>{this.notifyListeners(o,a)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);px()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Jx):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},Xx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}W_.type="LOCAL";const Zx=W_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_ extends z_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}H_.type="SESSION";const V_=H_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eC(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new Xl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async c=>c(n.origin,s)),a=await eC(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:a})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Xl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pd(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,a)=>{const c=Pd("",20);i.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(h){const f=h;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(u),s=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(f.data.response);break;default:clearTimeout(u),clearTimeout(s),a(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(){return window}function nC(t){Pt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $_(){return typeof Pt().WorkerGlobalScope<"u"&&typeof Pt().importScripts=="function"}async function rC(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function iC(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function sC(){return $_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B_="firebaseLocalStorageDb",oC=1,yl="firebaseLocalStorage",G_="fbase_key";class Us{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Jl(t,e){return t.transaction([yl],e?"readwrite":"readonly").objectStore(yl)}function lC(){const t=indexedDB.deleteDatabase(B_);return new Us(t).toPromise()}function K_(){const t=indexedDB.open(B_,oC);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(yl,{keyPath:G_})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(yl)?e(r):(r.close(),await lC(),e(await K_()))})})}async function Qf(t,e,n){const r=Jl(t,!0).put({[G_]:e,value:n});return new Us(r).toPromise()}async function aC(t,e){const n=Jl(t,!1).get(e),r=await new Us(n).toPromise();return r===void 0?null:r.value}function Yf(t,e){const n=Jl(t,!0).delete(e);return new Us(n).toPromise()}const cC=800,uC=3;class q_{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=K_(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>uC)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return $_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Xl._getInstance(sC()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await rC(),!this.activeServiceWorker)return;this.sender=new tC(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||iC()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Qf(e,_l,"1"),await Yf(e,_l)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Qf(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>aC(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Yf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Jl(i,!1).getAll();return new Us(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),cC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}q_.type="LOCAL";const dC=q_;new Ms(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hC(t,e){return e?zt(e):(P(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad extends Nd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Gr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Gr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Gr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function fC(t){return j_(t.auth,new Ad(t),t.bypassAuthState)}function pC(t){const{auth:e,user:n}=t;return P(n,e,"internal-error"),Wx(n,new Ad(t),t.bypassAuthState)}async function mC(t){const{auth:e,user:n}=t;return P(n,e,"internal-error"),zx(n,new Ad(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q_{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return fC;case"linkViaPopup":case"linkViaRedirect":return mC;case"reauthViaPopup":case"reauthViaRedirect":return pC;default:St(this.auth,"internal-error")}}resolve(e){Yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Yt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gC=new Ms(2e3,1e4);class Lr extends Q_{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Lr.currentPopupAction&&Lr.currentPopupAction.cancel(),Lr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return P(e,this.auth,"internal-error"),e}async onExecution(){Yt(this.filter.length===1,"Popup operations only handle one event");const e=Pd();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Lr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,gC.get())};e()}}Lr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _C="pendingRedirect",Oo=new Map;class yC extends Q_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Oo.get(this.auth._key());if(!e){try{const r=await vC(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Oo.set(this.auth._key(),e)}return this.bypassAuthState||Oo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function vC(t,e){const n=SC(e),r=EC(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function wC(t,e){Oo.set(t._key(),e)}function EC(t){return zt(t._redirectPersistence)}function SC(t){return bo(_C,t.config.apiKey,t.name)}async function xC(t,e,n=!1){if(st(t.app))return Promise.reject(Vt(t));const r=pr(t),i=hC(r,e),o=await new yC(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CC=10*60*1e3;class kC{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!IC(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!Y_(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(Rt(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=CC&&this.cachedEventUids.clear(),this.cachedEventUids.has(Xf(e))}saveEventToCache(e){this.cachedEventUids.add(Xf(e)),this.lastProcessedEventTime=Date.now()}}function Xf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Y_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function IC(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Y_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TC(t,e={}){return Zt(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NC=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,RC=/^https?/;async function PC(t){if(t.config.emulator)return;const{authorizedDomains:e}=await TC(t);for(const n of e)try{if(AC(n))return}catch{}St(t,"unauthorized-domain")}function AC(t){const e=su(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!RC.test(n))return!1;if(NC.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bC=new Ms(3e4,6e4);function Jf(){const t=Pt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function OC(t){return new Promise((e,n)=>{var i,s,o;function r(){Jf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Jf(),n(Rt(t,"network-request-failed"))},timeout:bC.get()})}if((s=(i=Pt().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=Pt().gapi)!=null&&o.load)r();else{const l=xx("iframefcb");return Pt()[l]=()=>{gapi.load?r():n(Rt(t,"network-request-failed"))},O_(`${Sx()}?onload=${l}`).catch(a=>n(a))}}).catch(e=>{throw Do=null,e})}let Do=null;function DC(t){return Do=Do||OC(t),Do}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LC=new Ms(5e3,15e3),MC="__/auth/iframe",FC="emulator/auth/iframe",jC={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},UC=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function zC(t){const e=t.config;P(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?kd(e,FC):`https://${t.config.authDomain}/${MC}`,r={apiKey:e.apiKey,appName:t.name,v:mi},i=UC.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${pi(r).slice(1)}`}async function WC(t){const e=await DC(t),n=Pt().gapi;return P(n,t,"internal-error"),e.open({where:document.body,url:zC(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:jC,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Rt(t,"network-request-failed"),l=Pt().setTimeout(()=>{s(o)},LC.get());function a(){Pt().clearTimeout(l),i(r)}r.ping(a).then(a,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HC={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},VC=500,$C=600,BC="_blank",GC="http://localhost";class Zf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function KC(t,e,n,r=VC,i=$C){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const a={...HC,width:r.toString(),height:i.toString(),top:s,left:o},c=ze().toLowerCase();n&&(l=I_(c)?BC:n),C_(c)&&(e=e||GC,a.scrollbars="yes");const u=Object.entries(a).reduce((f,[g,y])=>`${f}${g}=${y},`,"");if(fx(c)&&l!=="_self")return qC(e||"",l),new Zf(null);const h=window.open(e||"",l,u);P(h,t,"popup-blocked");try{h.focus()}catch{}return new Zf(h)}function qC(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QC="__/auth/handler",YC="emulator/auth/handler",XC=encodeURIComponent("fac");async function ep(t,e,n,r,i,s){P(t.config.authDomain,t,"auth-domain-config-required"),P(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:mi,eventId:i};if(e instanceof M_){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Zc(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries({}))o[u]=h}if(e instanceof js){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const u of Object.keys(l))l[u]===void 0&&delete l[u];const a=await t._getAppCheckToken(),c=a?`#${XC}=${encodeURIComponent(a)}`:"";return`${JC(t)}?${pi(l).slice(1)}${c}`}function JC({config:t}){return t.emulator?kd(t,YC):`https://${t.authDomain}/${QC}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga="webStorageSupport";class ZC{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=V_,this._completeRedirectFn=xC,this._overrideRedirectResult=wC}async _openPopup(e,n,r,i){var o;Yt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await ep(e,n,r,su(),i);return KC(e,s,Pd())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await ep(e,n,r,su(),i);return nC(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Yt(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await WC(e),r=new kC(e);return n.register("authEvent",i=>(P(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Ga,{type:Ga},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[Ga];s!==void 0&&n(!!s),St(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=PC(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return A_()||k_()||Td()}}const ek=ZC;var tp="@firebase/auth",np="1.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tk{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){P(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nk(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function rk(t){ni(new sr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;P(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const a={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:b_(t)},c=new vx(r,i,s,a);return Nx(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),ni(new sr("auth-internal",e=>{const n=pr(e.getProvider("auth").getImmediate());return(r=>new tk(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Nn(tp,np,nk(t)),Nn(tp,np,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ik=5*60,sk=o_("authIdTokenMaxAge")||ik;let rp=null;const ok=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>sk)return;const i=n==null?void 0:n.token;rp!==i&&(rp=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function lk(t=f_()){const e=xd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=Tx(t,{popupRedirectResolver:ek,persistence:[dC,Zx,V_]}),r=o_("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=ok(s.toString());qx(n,o,()=>o(n.currentUser)),Kx(n,l=>o(l))}}const i=i_("auth");return i&&Rx(n,`http://${i}`),n}function ak(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}wx({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Rt("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",ak().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});rk("Browser");var ip={};const sp="@firebase/database",op="1.1.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let X_="";function ck(t){X_=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uk{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),ye(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:vs(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dk{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return xt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J_=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new uk(e)}}catch{}return new dk},Qn=J_("localStorage"),hk=J_("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr=new Ed("@firebase/database"),Z_=function(){let t=1;return function(){return t++}}(),ey=function(t){const e=ME(t),n=new bE;n.update(e);const r=n.digest();return yd.encodeByteArray(r)},zs=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=zs.apply(null,r):typeof r=="object"?e+=ye(r):e+=r,e+=" "}return e};let Xi=null,lp=!0;const fk=function(t,e){S(!0,"Can't turn on custom loggers persistently."),Kr.logLevel=$.VERBOSE,Xi=Kr.log.bind(Kr)},ke=function(...t){if(lp===!0&&(lp=!1,Xi===null&&hk.get("logging_enabled")===!0&&fk()),Xi){const e=zs.apply(null,t);Xi(e)}},Ws=function(t){return function(...e){ke(t,...e)}},au=function(...t){const e="FIREBASE INTERNAL ERROR: "+zs(...t);Kr.error(e)},Xt=function(...t){const e=`FIREBASE FATAL ERROR: ${zs(...t)}`;throw Kr.error(e),new Error(e)},Ue=function(...t){const e="FIREBASE WARNING: "+zs(...t);Kr.warn(e)},pk=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ue("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},bd=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},mk=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},ii="[MIN_NAME]",ar="[MAX_NAME]",mr=function(t,e){if(t===e)return 0;if(t===ii||e===ar)return-1;if(e===ii||t===ar)return 1;{const n=ap(t),r=ap(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},gk=function(t,e){return t===e?0:t<e?-1:1},Pi=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+ye(e))},Od=function(t){if(typeof t!="object"||t===null)return ye(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=ye(e[r]),n+=":",n+=Od(t[e[r]]);return n+="}",n},ty=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let i=0;i<n;i+=e)i+e>n?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r};function Ne(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const ny=function(t){S(!bd(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let i,s,o,l,a;t===0?(s=0,o=0,i=1/t===-1/0?1:0):(i=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),r),s=l+r,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(s=0,o=Math.round(t/Math.pow(2,1-r-n))));const c=[];for(a=n;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(s%2?1:0),s=Math.floor(s/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(a=0;a<64;a+=8){let f=parseInt(u.substr(a,8),2).toString(16);f.length===1&&(f="0"+f),h=h+f}return h.toLowerCase()},_k=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},yk=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function vk(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const wk=new RegExp("^-?(0*)\\d{1,10}$"),Ek=-2147483648,Sk=2147483647,ap=function(t){if(wk.test(t)){const e=Number(t);if(e>=Ek&&e<=Sk)return e}return null},_i=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Ue("Exception was thrown by user callback.",n),e},Math.floor(0))}},xk=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ji=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ck{constructor(e,n){this.appCheckProvider=n,this.appName=e.name,st(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)==null||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Ue(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kk{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ke("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ue(e)}}class Lo{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Lo.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd="5",ry="v",iy="s",sy="r",oy="f",ly=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,ay="ls",cy="p",cu="ac",uy="websocket",dy="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hy{constructor(e,n,r,i,s=!1,o="",l=!1,a=!1,c=null){this.secure=n,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Qn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Qn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Ik(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function fy(t,e,n){S(typeof e=="string","typeof type must == string"),S(typeof n=="object","typeof params must == object");let r;if(e===uy)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===dy)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Ik(t)&&(n.ns=t.namespace);const i=[];return Ne(n,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tk{constructor(){this.counters_={}}incrementCounter(e,n=1){xt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return fE(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka={},qa={};function Ld(t){const e=t.toString();return Ka[e]||(Ka[e]=new Tk),Ka[e]}function Nk(t,e){const n=t.toString();return qa[n]||(qa[n]=e()),qa[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rk{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&_i(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp="start",Pk="close",Ak="pLPCommand",bk="pRTLPCB",py="id",my="pw",gy="ser",Ok="cb",Dk="seg",Lk="ts",Mk="d",Fk="dframe",_y=1870,yy=30,jk=_y-yy,Uk=25e3,zk=3e4;class Mr{constructor(e,n,r,i,s,o,l){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ws(e),this.stats_=Ld(n),this.urlFn=a=>(this.appCheckToken&&(a[cu]=this.appCheckToken),fy(n,dy,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new Rk(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(zk)),mk(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Md((...s)=>{const[o,l,a,c,u]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===cp)this.id=l,this.password=a;else if(o===Pk)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{const[o,l]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const r={};r[cp]="t",r[gy]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[Ok]=this.scriptTagHolder.uniqueCallbackIdentifier),r[ry]=Dd,this.transportSessionId&&(r[iy]=this.transportSessionId),this.lastSessionId&&(r[ay]=this.lastSessionId),this.applicationId&&(r[cy]=this.applicationId),this.appCheckToken&&(r[cu]=this.appCheckToken),typeof location<"u"&&location.hostname&&ly.test(location.hostname)&&(r[sy]=oy);const i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Mr.forceAllow_=!0}static forceDisallow(){Mr.forceDisallow_=!0}static isAvailable(){return Mr.forceAllow_?!0:!Mr.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!_k()&&!yk()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=ye(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=n_(n),i=ty(r,jk);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[Fk]="t",r[py]=e,r[my]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=ye(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Md{constructor(e,n,r,i){this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Z_(),window[Ak+this.uniqueCallbackIdentifier]=e,window[bk+this.uniqueCallbackIdentifier]=n,this.myIFrame=Md.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){ke("frame writing exception"),l.stack&&ke(l.stack),ke(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ke("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[py]=this.myID,e[my]=this.myPW,e[gy]=this.currentSerial;let n=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+yy+r.length<=_y;){const o=this.pendingSegs.shift();r=r+"&"+Dk+i+"="+o.seg+"&"+Lk+i+"="+o.ts+"&"+Mk+i+"="+o.d,i++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},i=setTimeout(r,Math.floor(Uk)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{ke("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wk=16384,Hk=45e3;let vl=null;typeof MozWebSocket<"u"?vl=MozWebSocket:typeof WebSocket<"u"&&(vl=WebSocket);class mt{constructor(e,n,r,i,s,o,l){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ws(this.connId),this.stats_=Ld(n),this.connURL=mt.connectionURL_(n,o,l,i,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,i,s){const o={};return o[ry]=Dd,typeof location<"u"&&location.hostname&&ly.test(location.hostname)&&(o[sy]=oy),n&&(o[iy]=n),r&&(o[ay]=r),i&&(o[cu]=i),s&&(o[cy]=s),fy(e,uy,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Qn.set("previous_websocket_failure",!0);try{let r;CE(),this.mySock=new vl(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){mt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&vl!==null&&!mt.forceDisallow_}static previouslyFailed(){return Qn.isInMemoryStorage||Qn.get("previous_websocket_failure")===!0}markConnectionHealthy(){Qn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=vs(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(S(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=ye(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=ty(n,Wk);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Hk))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}mt.responsesRequiredToBeHealthy=2;mt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{static get ALL_TRANSPORTS(){return[Mr,mt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const n=mt&&mt.isAvailable();let r=n&&!mt.previouslyFailed();if(e.webSocketOnly&&(n||Ue("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[mt];else{const i=this.transports_=[];for(const s of Ss.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);Ss.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ss.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vk=6e4,$k=5e3,Bk=10*1024,Gk=100*1024,Qa="t",up="d",Kk="s",dp="r",qk="e",hp="o",fp="a",pp="n",mp="p",Qk="h";class Yk{constructor(e,n,r,i,s,o,l,a,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ws("c:"+this.id+":"),this.transportManager_=new Ss(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ji(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Gk?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Bk?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Qa in e){const n=e[Qa];n===fp?this.upgradeIfSecondaryHealthy_():n===dp?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===hp&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Pi("t",e),r=Pi("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:mp,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:fp,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:pp,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Pi("t",e),r=Pi("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Pi(Qa,e);if(up in e){const r=e[up];if(n===Qk){const i={...r};this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(n===pp){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Kk?this.onConnectionShutdown_(r):n===dp?this.onReset_(r):n===qk?au("Server Error: "+r):n===hp?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):au("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Dd!==r&&Ue("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Ji(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Vk))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ji(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor($k))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:mp,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Qn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vy{put(e,n,r,i){}merge(e,n,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wy{constructor(e){this.allowedEvents_=e,this.listeners_={},S(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const i=this.getInitialEvent(e);i&&n.apply(r,i)}off(e,n,r){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===n&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){S(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl extends wy{static getInstance(){return new wl}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!wd()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return S(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp=32,_p=768;class B{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function H(){return new B("")}function F(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function On(t){return t.pieces_.length-t.pieceNum_}function Y(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new B(t.pieces_,e)}function Fd(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function Xk(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function xs(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function Ey(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new B(e,0)}function de(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof B)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&n.push(r[i])}return new B(n,0)}function U(t){return t.pieceNum_>=t.pieces_.length}function Fe(t,e){const n=F(t),r=F(e);if(n===null)return e;if(n===r)return Fe(Y(t),Y(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Jk(t,e){const n=xs(t,0),r=xs(e,0);for(let i=0;i<n.length&&i<r.length;i++){const s=mr(n[i],r[i]);if(s!==0)return s}return n.length===r.length?0:n.length<r.length?-1:1}function jd(t,e){if(On(t)!==On(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function lt(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(On(t)>On(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class Zk{constructor(e,n){this.errorPrefix_=n,this.parts_=xs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Ql(this.parts_[r]);Sy(this)}}function e1(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Ql(e),Sy(t)}function t1(t){const e=t.parts_.pop();t.byteLength_-=Ql(e),t.parts_.length>0&&(t.byteLength_-=1)}function Sy(t){if(t.byteLength_>_p)throw new Error(t.errorPrefix_+"has a key path longer than "+_p+" bytes ("+t.byteLength_+").");if(t.parts_.length>gp)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+gp+") or object contains a cycle "+Bn(t))}function Bn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud extends wy{static getInstance(){return new Ud}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return S(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai=1e3,n1=60*5*1e3,yp=30*1e3,r1=1.3,i1=3e4,s1="server_kill",vp=3;class $t extends vy{constructor(e,n,r,i,s,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=$t.nextPersistentConnectionId_++,this.log_=Ws("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ai,this.maxReconnectDelay_=n1,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Ud.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&wl.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const i=++this.requestNumber_,s={r:i,a:e,b:n};this.log_(ye(s)),S(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();const n=new fr,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),n.promise}listen(e,n,r,i){this.initConnection_();const s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),S(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:n,query:e,tag:r};this.listens.get(o).set(s,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),i=n._queryIdentifier;this.log_("Listen on "+r+" for "+i);const s={p:r},o="q";e.tag&&(s.q=n._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,l=>{const a=l.d,c=l.s;$t.warnOnListenWarnings_(a,n),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&xt(e,"w")){const r=rr(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const i='".indexOn": "'+n._queryParams.getIndex().toString()+'"',s=n._path.toString();Ue(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||AE(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=yp)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=PE(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,i=>{const s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,n)}sendUnlisten_(e,n,r,i){this.log_("Unlisten on "+e+" for "+n);const s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,i){const s={p:n,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,n,r,i){this.putInternal("p",e,n,r,i)}merge(e,n,r,i){this.putInternal("m",e,n,r,i)}putInternal(e,n,r,i,s){this.initConnection_();const o={p:n,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,s=>{this.log_(n+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+ye(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):au("Unrecognized action received from server: "+ye(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){S(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ai,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ai,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>i1&&(this.reconnectDelay_=Ai),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*r1)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+$t.nextConnectionId_++,s=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,r())},c=function(h){S(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(h)};this.realtime_={close:a,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,f]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?ke("getToken() completed but was canceled"):(ke("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=f&&f.token,l=new Yk(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,g=>{Ue(g+" ("+this.repoInfo_.toString()+")"),this.interrupt(s1)},s))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Ue(h),a())}}}interrupt(e){ke("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ke("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Zc(this.interruptReasons_)&&(this.reconnectDelay_=Ai,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(s=>Od(s)).join("$"):r="default";const i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,n){const r=new B(e).toString();let i;if(this.listens.has(r)){const s=this.listens.get(r);i=s.get(n),s.delete(n),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,n){ke("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=vp&&(this.reconnectDelay_=yp,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ke("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=vp&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+X_.replace(/\./g,"-")]=1,wd()?e["framework.cordova"]=1:l_()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=wl.getInstance().currentlyOnline();return Zc(this.interruptReasons_)&&e}}$t.nextPersistentConnectionId_=0;$t.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new j(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new j(ii,e),i=new j(ii,n);return this.compare(r,i)!==0}minPost(){return j.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let go;class xy extends Zl{static get __EMPTY_NODE(){return go}static set __EMPTY_NODE(e){go=e}compare(e,n){return mr(e.name,n.name)}isDefinedOn(e){throw fi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return j.MIN}maxPost(){return new j(ar,go)}makePost(e,n){return S(typeof e=="string","KeyIndex indexValue must always be a string."),new j(e,go)}toString(){return".key"}}const qr=new xy;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _o{constructor(e,n,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Se{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Se.RED,this.left=i??Ge.EMPTY_NODE,this.right=s??Ge.EMPTY_NODE}copy(e,n,r,i,s){return new Se(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i=i.copy(null,n,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Ge.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,i;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return Ge.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Se.RED=!0;Se.BLACK=!1;class o1{copy(e,n,r,i,s){return this}insert(e,n,r){return new Se(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Ge{constructor(e,n=Ge.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Ge(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,Se.BLACK,null,null))}remove(e){return new Ge(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Se.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,i=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new _o(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new _o(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new _o(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new _o(this.root_,null,this.comparator_,!0,e)}}Ge.EMPTY_NODE=new o1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function l1(t,e){return mr(t.name,e.name)}function zd(t,e){return mr(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let uu;function a1(t){uu=t}const Cy=function(t){return typeof t=="number"?"number:"+ny(t):"string:"+t},ky=function(t){if(t.isLeafNode()){const e=t.val();S(typeof e=="string"||typeof e=="number"||typeof e=="object"&&xt(e,".sv"),"Priority must be a string or number.")}else S(t===uu||t.isEmpty(),"priority of unexpected type.");S(t===uu||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wp;class we{static set __childrenNodeConstructor(e){wp=e}static get __childrenNodeConstructor(){return wp}constructor(e,n=we.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,S(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),ky(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new we(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:we.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return U(e)?this:F(e)===".priority"?this.priorityNode_:we.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:we.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=F(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(S(r!==".priority"||On(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,we.__childrenNodeConstructor.EMPTY_NODE.updateChild(Y(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Cy(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=ny(this.value_):e+=this.value_,this.lazyHash_=ey(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===we.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof we.__childrenNodeConstructor?-1:(S(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,i=we.VALUE_TYPE_ORDER.indexOf(n),s=we.VALUE_TYPE_ORDER.indexOf(r);return S(i>=0,"Unknown leaf type: "+n),S(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}we.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Iy,Ty;function c1(t){Iy=t}function u1(t){Ty=t}class d1 extends Zl{compare(e,n){const r=e.node.getPriority(),i=n.node.getPriority(),s=r.compareTo(i);return s===0?mr(e.name,n.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return j.MIN}maxPost(){return new j(ar,new we("[PRIORITY-POST]",Ty))}makePost(e,n){const r=Iy(e);return new j(n,new we("[PRIORITY-POST]",r))}toString(){return".priority"}}const se=new d1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const h1=Math.log(2);class f1{constructor(e){const n=s=>parseInt(Math.log(s)/h1,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const El=function(t,e,n,r){t.sort(e);const i=function(a,c){const u=c-a;let h,f;if(u===0)return null;if(u===1)return h=t[a],f=n?n(h):h,new Se(f,h.node,Se.BLACK,null,null);{const g=parseInt(u/2,10)+a,y=i(a,g),v=i(g+1,c);return h=t[g],f=n?n(h):h,new Se(f,h.node,Se.BLACK,y,v)}},s=function(a){let c=null,u=null,h=t.length;const f=function(y,v){const A=h-y,m=h;h-=y;const p=i(A+1,m),_=t[A],w=n?n(_):_;g(new Se(w,_.node,v,null,p))},g=function(y){c?(c.left=y,c=y):(u=y,c=y)};for(let y=0;y<a.count;++y){const v=a.nextBitIsOne(),A=Math.pow(2,a.count-(y+1));v?f(A,Se.BLACK):(f(A,Se.BLACK),f(A,Se.RED))}return u},o=new f1(t.length),l=s(o);return new Ge(r||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ya;const Er={};class Wt{static get Default(){return S(Er&&se,"ChildrenNode.ts has not been loaded"),Ya=Ya||new Wt({".priority":Er},{".priority":se}),Ya}constructor(e,n){this.indexes_=e,this.indexSet_=n}get(e){const n=rr(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Ge?n:null}hasIndex(e){return xt(this.indexSet_,e.toString())}addIndex(e,n){S(e!==qr,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let i=!1;const s=n.getIterator(j.Wrap);let o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let l;i?l=El(r,e.getCompare()):l=Er;const a=e.toString(),c={...this.indexSet_};c[a]=e;const u={...this.indexes_};return u[a]=l,new Wt(u,c)}addToIndexes(e,n){const r=dl(this.indexes_,(i,s)=>{const o=rr(this.indexSet_,s);if(S(o,"Missing index implementation for "+s),i===Er)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(j.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),El(l,o.getCompare())}else return Er;else{const l=n.get(e.name);let a=i;return l&&(a=a.remove(new j(e.name,l))),a.insert(e,e.node)}});return new Wt(r,this.indexSet_)}removeFromIndexes(e,n){const r=dl(this.indexes_,i=>{if(i===Er)return i;{const s=n.get(e.name);return s?i.remove(new j(e.name,s)):i}});return new Wt(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bi;class R{static get EMPTY_NODE(){return bi||(bi=new R(new Ge(zd),null,Wt.Default))}constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&ky(this.priorityNode_),this.children_.isEmpty()&&S(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||bi}updatePriority(e){return this.children_.isEmpty()?this:new R(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?bi:n}}getChild(e){const n=F(e);return n===null?this:this.getImmediateChild(n).getChild(Y(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(S(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new j(e,n);let i,s;n.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,n),s=this.indexMap_.addToIndexes(r,this.children_));const o=i.isEmpty()?bi:this.priorityNode_;return new R(i,o,s)}}updateChild(e,n){const r=F(e);if(r===null)return n;{S(F(e)!==".priority"||On(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(r).updateChild(Y(e),n);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,i=0,s=!0;if(this.forEachChild(se,(o,l)=>{n[o]=l.val(e),r++,s&&R.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Cy(this.getPriority().val())+":"),this.forEachChild(se,(n,r)=>{const i=r.hash();i!==""&&(e+=":"+n+":"+i)}),this.lazyHash_=e===""?"":ey(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const i=this.resolveIndex_(r);if(i){const s=i.getPredecessorKey(new j(e,n));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new j(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new j(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>n(i.name,i.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,j.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,j.Wrap);let s=i.peek();for(;s!=null&&n.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Hs?-1:0}withIndex(e){if(e===qr||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new R(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===qr||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(se),i=n.getIterator(se);let s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===qr?null:this.indexMap_.get(e.toString())}}R.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class p1 extends R{constructor(){super(new Ge(zd),R.EMPTY_NODE,Wt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return R.EMPTY_NODE}isEmpty(){return!1}}const Hs=new p1;Object.defineProperties(j,{MIN:{value:new j(ii,R.EMPTY_NODE)},MAX:{value:new j(ar,Hs)}});xy.__EMPTY_NODE=R.EMPTY_NODE;we.__childrenNodeConstructor=R;a1(Hs);u1(Hs);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m1=!0;function me(t,e=null){if(t===null)return R.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),S(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new we(n,me(e))}if(!(t instanceof Array)&&m1){const n=[];let r=!1;if(Ne(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=me(l);a.isEmpty()||(r=r||!a.getPriority().isEmpty(),n.push(new j(o,a)))}}),n.length===0)return R.EMPTY_NODE;const s=El(n,l1,o=>o.name,zd);if(r){const o=El(n,se.getCompare());return new R(s,me(e),new Wt({".priority":o},{".priority":se}))}else return new R(s,me(e),Wt.Default)}else{let n=R.EMPTY_NODE;return Ne(t,(r,i)=>{if(xt(t,r)&&r.substring(0,1)!=="."){const s=me(i);(s.isLeafNode()||!s.isEmpty())&&(n=n.updateImmediateChild(r,s))}}),n.updatePriority(me(e))}}c1(me);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g1 extends Zl{constructor(e){super(),this.indexPath_=e,S(!U(e)&&F(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),i=this.extractChild(n.node),s=r.compareTo(i);return s===0?mr(e.name,n.name):s}makePost(e,n){const r=me(e),i=R.EMPTY_NODE.updateChild(this.indexPath_,r);return new j(n,i)}maxPost(){const e=R.EMPTY_NODE.updateChild(this.indexPath_,Hs);return new j(ar,e)}toString(){return xs(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _1 extends Zl{compare(e,n){const r=e.node.compareTo(n.node);return r===0?mr(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return j.MIN}maxPost(){return j.MAX}makePost(e,n){const r=me(e);return new j(n,r)}toString(){return".value"}}const y1=new _1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ny(t){return{type:"value",snapshotNode:t}}function si(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Cs(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function ks(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function v1(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e){this.index_=e}updateChild(e,n,r,i,s,o){S(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(i).equals(r.getChild(i))&&l.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(Cs(n,l)):S(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(si(n,r)):o.trackChildChange(ks(n,r,l))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(se,(i,s)=>{n.hasChild(i)||r.trackChildChange(Cs(i,s))}),n.isLeafNode()||n.forEachChild(se,(i,s)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(ks(i,s,o))}else r.trackChildChange(si(i,s))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?R.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e){this.indexedFilter_=new Wd(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Is.getStartPost_(e),this.endPost_=Is.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,i,s,o){return this.matches(new j(n,r))||(r=R.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,i,s,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=R.EMPTY_NODE);let i=n.withIndex(this.index_);i=i.updatePriority(R.EMPTY_NODE);const s=this;return n.forEachChild(se,(o,l)=>{s.matches(new j(o,l))||(i=i.updateImmediateChild(o,R.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w1{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Is(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,i,s,o){return this.rangedFilter_.matches(new j(n,r))||(r=R.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,i,s,o):this.fullLimitUpdateChild_(e,n,r,s,o)}updateFullNode(e,n,r){let i;if(n.isLeafNode()||n.isEmpty())i=R.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){i=R.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){const l=s.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=n.withIndex(this.index_),i=i.updatePriority(R.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){const l=s.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,R.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,i,s){let o;if(this.reverse_){const h=this.index_.getCompare();o=(f,g)=>h(g,f)}else o=this.index_.getCompare();const l=e;S(l.numChildren()===this.limit_,"");const a=new j(n,r),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),u=this.rangedFilter_.matches(a);if(l.hasChild(n)){const h=l.getImmediateChild(n);let f=i.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||l.hasChild(f.name));)f=i.getChildAfterChild(this.index_,f,this.reverse_);const g=f==null?1:o(f,a);if(u&&!r.isEmpty()&&g>=0)return s!=null&&s.trackChildChange(ks(n,r,h)),l.updateImmediateChild(n,r);{s!=null&&s.trackChildChange(Cs(n,h));const v=l.updateImmediateChild(n,R.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(s!=null&&s.trackChildChange(si(f.name,f.node)),v.updateImmediateChild(f.name,f.node)):v}}else return r.isEmpty()?e:u&&o(c,a)>=0?(s!=null&&(s.trackChildChange(Cs(c.name,c.node)),s.trackChildChange(si(n,r))),l.updateImmediateChild(n,r).updateImmediateChild(c.name,R.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=se}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return S(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return S(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ii}hasEnd(){return this.endSet_}getIndexEndValue(){return S(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return S(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ar}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return S(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===se}copy(){const e=new Hd;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function E1(t){return t.loadsAllData()?new Wd(t.getIndex()):t.hasLimit()?new w1(t):new Is(t)}function Ep(t){const e={};if(t.isDefault())return e;let n;if(t.index_===se?n="$priority":t.index_===y1?n="$value":t.index_===qr?n="$key":(S(t.index_ instanceof g1,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=ye(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=ye(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+ye(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=ye(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+ye(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Sp(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==se&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl extends vy{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(S(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,n,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=Ws("p:rest:"),this.listens_={}}listen(e,n,r,i){const s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);const o=Sl.getListenId_(e,r),l={};this.listens_[o]=l;const a=Ep(e._queryParams);this.restRequest_(s+".json",a,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(s,h,!1,r),rr(this.listens_,o)===l){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",i(f,null)}})}unlisten(e,n){const r=Sl.getListenId_(e,n);delete this.listens_[r]}get(e){const n=Ep(e._queryParams),r=e._path.toString(),i=new fr;return this.restRequest_(r+".json",n,(s,o)=>{let l=o;s===404&&(l=null,s=null),s===null?(this.onDataUpdate_(r,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(n.auth=i.accessToken),s&&s.token&&(n.ac=s.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+pi(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(r&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=vs(l.responseText)}catch{Ue("Failed to parse JSON response for "+o+": "+l.responseText)}r(null,a)}else l.status!==401&&l.status!==404&&Ue("Got unsuccessful REST response for "+o+" Status: "+l.status),r(l.status);r=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S1{constructor(){this.rootNode_=R.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(){return{value:null,children:new Map}}function Ry(t,e,n){if(U(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=F(e);t.children.has(r)||t.children.set(r,xl());const i=t.children.get(r);e=Y(e),Ry(i,e,n)}}function du(t,e,n){t.value!==null?n(e,t.value):x1(t,(r,i)=>{const s=new B(e.toString()+"/"+r);du(i,s,n)})}function x1(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C1{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n={...e};return this.last_&&Ne(this.last_,(r,i)=>{n[r]=n[r]-i}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp=10*1e3,k1=30*1e3,I1=5*60*1e3;class T1{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new C1(e);const r=xp+(k1-xp)*Math.random();Ji(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;Ne(e,(i,s)=>{s>0&&xt(this.statsToReport_,i)&&(n[i]=s,r=!0)}),r&&this.server_.reportStats(n),Ji(this.reportStats_.bind(this),Math.floor(Math.random()*2*I1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var _t;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(_t||(_t={}));function Vd(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function $d(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Bd(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=_t.ACK_USER_WRITE,this.source=Vd()}operationForChild(e){if(U(this.path)){if(this.affectedTree.value!=null)return S(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new B(e));return new Cl(H(),n,this.revert)}}else return S(F(this.path)===e,"operationForChild called for unrelated child."),new Cl(Y(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,n){this.source=e,this.path=n,this.type=_t.LISTEN_COMPLETE}operationForChild(e){return U(this.path)?new Ts(this.source,H()):new Ts(this.source,Y(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=_t.OVERWRITE}operationForChild(e){return U(this.path)?new cr(this.source,H(),this.snap.getImmediateChild(e)):new cr(this.source,Y(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=_t.MERGE}operationForChild(e){if(U(this.path)){const n=this.children.subtree(new B(e));return n.isEmpty()?null:n.value?new cr(this.source,H(),n.value):new oi(this.source,H(),n)}else return S(F(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new oi(this.source,Y(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(U(e))return this.isFullyInitialized()&&!this.filtered_;const n=F(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N1{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function R1(t,e,n,r){const i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(v1(o.childName,o.snapshotNode))}),Oi(t,i,"child_removed",e,r,n),Oi(t,i,"child_added",e,r,n),Oi(t,i,"child_moved",s,r,n),Oi(t,i,"child_changed",e,r,n),Oi(t,i,"value",e,r,n),i}function Oi(t,e,n,r,i,s){const o=r.filter(l=>l.type===n);o.sort((l,a)=>A1(t,l,a)),o.forEach(l=>{const a=P1(t,l,s);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,t.query_))})})}function P1(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function A1(t,e,n){if(e.childName==null||n.childName==null)throw fi("Should only compare child_ events.");const r=new j(e.childName,e.snapshotNode),i=new j(n.childName,n.snapshotNode);return t.index_.compare(r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(t,e){return{eventCache:t,serverCache:e}}function Zi(t,e,n,r){return ea(new Dn(e,n,r),t.serverCache)}function Py(t,e,n,r){return ea(t.eventCache,new Dn(e,n,r))}function kl(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function ur(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xa;const b1=()=>(Xa||(Xa=new Ge(gk)),Xa);class Q{static fromObject(e){let n=new Q(null);return Ne(e,(r,i)=>{n=n.set(new B(r),i)}),n}constructor(e,n=b1()){this.value=e,this.children=n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:H(),value:this.value};if(U(e))return null;{const r=F(e),i=this.children.get(r);if(i!==null){const s=i.findRootMostMatchingPathAndValue(Y(e),n);return s!=null?{path:de(new B(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(U(e))return this;{const n=F(e),r=this.children.get(n);return r!==null?r.subtree(Y(e)):new Q(null)}}set(e,n){if(U(e))return new Q(n,this.children);{const r=F(e),s=(this.children.get(r)||new Q(null)).set(Y(e),n),o=this.children.insert(r,s);return new Q(this.value,o)}}remove(e){if(U(e))return this.children.isEmpty()?new Q(null):new Q(null,this.children);{const n=F(e),r=this.children.get(n);if(r){const i=r.remove(Y(e));let s;return i.isEmpty()?s=this.children.remove(n):s=this.children.insert(n,i),this.value===null&&s.isEmpty()?new Q(null):new Q(this.value,s)}else return this}}get(e){if(U(e))return this.value;{const n=F(e),r=this.children.get(n);return r?r.get(Y(e)):null}}setTree(e,n){if(U(e))return n;{const r=F(e),s=(this.children.get(r)||new Q(null)).setTree(Y(e),n);let o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new Q(this.value,o)}}fold(e){return this.fold_(H(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(de(e,i),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,H(),n)}findOnPath_(e,n,r){const i=this.value?r(n,this.value):!1;if(i)return i;if(U(e))return null;{const s=F(e),o=this.children.get(s);return o?o.findOnPath_(Y(e),de(n,s),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,H(),n)}foreachOnPath_(e,n,r){if(U(e))return this;{this.value&&r(n,this.value);const i=F(e),s=this.children.get(i);return s?s.foreachOnPath_(Y(e),de(n,i),r):new Q(null)}}foreach(e){this.foreach_(H(),e)}foreach_(e,n){this.children.inorderTraversal((r,i)=>{i.foreach_(de(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.writeTree_=e}static empty(){return new wt(new Q(null))}}function es(t,e,n){if(U(e))return new wt(new Q(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const i=r.path;let s=r.value;const o=Fe(i,e);return s=s.updateChild(o,n),new wt(t.writeTree_.set(i,s))}else{const i=new Q(n),s=t.writeTree_.setTree(e,i);return new wt(s)}}}function hu(t,e,n){let r=t;return Ne(n,(i,s)=>{r=es(r,de(e,i),s)}),r}function Cp(t,e){if(U(e))return wt.empty();{const n=t.writeTree_.setTree(e,new Q(null));return new wt(n)}}function fu(t,e){return gr(t,e)!=null}function gr(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(Fe(n.path,e)):null}function kp(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(se,(r,i)=>{e.push(new j(r,i))}):t.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new j(r,i.value))}),e}function Rn(t,e){if(U(e))return t;{const n=gr(t,e);return n!=null?new wt(new Q(n)):new wt(t.writeTree_.subtree(e))}}function pu(t){return t.writeTree_.isEmpty()}function li(t,e){return Ay(H(),t.writeTree_,e)}function Ay(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(S(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):n=Ay(de(t,i),s,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(de(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(t,e){return Ly(e,t)}function O1(t,e,n,r,i){S(r>t.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:i}),i&&(t.visibleWrites=es(t.visibleWrites,e,n)),t.lastWriteId=r}function D1(t,e,n,r){S(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=hu(t.visibleWrites,e,n),t.lastWriteId=r}function L1(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function M1(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);S(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let i=r.visible,s=!1,o=t.allWrites.length-1;for(;i&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&F1(l,r.path)?i=!1:lt(r.path,l.path)&&(s=!0)),o--}if(i){if(s)return j1(t),!0;if(r.snap)t.visibleWrites=Cp(t.visibleWrites,r.path);else{const l=r.children;Ne(l,a=>{t.visibleWrites=Cp(t.visibleWrites,de(r.path,a))})}return!0}else return!1}function F1(t,e){if(t.snap)return lt(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&lt(de(t.path,n),e))return!0;return!1}function j1(t){t.visibleWrites=by(t.allWrites,U1,H()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function U1(t){return t.visible}function by(t,e,n){let r=wt.empty();for(let i=0;i<t.length;++i){const s=t[i];if(e(s)){const o=s.path;let l;if(s.snap)lt(n,o)?(l=Fe(n,o),r=es(r,l,s.snap)):lt(o,n)&&(l=Fe(o,n),r=es(r,H(),s.snap.getChild(l)));else if(s.children){if(lt(n,o))l=Fe(n,o),r=hu(r,l,s.children);else if(lt(o,n))if(l=Fe(o,n),U(l))r=hu(r,H(),s.children);else{const a=rr(s.children,F(l));if(a){const c=a.getChild(Y(l));r=es(r,H(),c)}}}else throw fi("WriteRecord should have .snap or .children")}}return r}function Oy(t,e,n,r,i){if(!r&&!i){const s=gr(t.visibleWrites,e);if(s!=null)return s;{const o=Rn(t.visibleWrites,e);if(pu(o))return n;if(n==null&&!fu(o,H()))return null;{const l=n||R.EMPTY_NODE;return li(o,l)}}}else{const s=Rn(t.visibleWrites,e);if(!i&&pu(s))return n;if(!i&&n==null&&!fu(s,H()))return null;{const o=function(c){return(c.visible||i)&&(!r||!~r.indexOf(c.writeId))&&(lt(c.path,e)||lt(e,c.path))},l=by(t.allWrites,o,e),a=n||R.EMPTY_NODE;return li(l,a)}}}function z1(t,e,n){let r=R.EMPTY_NODE;const i=gr(t.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(se,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(n){const s=Rn(t.visibleWrites,e);return n.forEachChild(se,(o,l)=>{const a=li(Rn(s,new B(o)),l);r=r.updateImmediateChild(o,a)}),kp(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const s=Rn(t.visibleWrites,e);return kp(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function W1(t,e,n,r,i){S(r||i,"Either existingEventSnap or existingServerSnap must exist");const s=de(e,n);if(fu(t.visibleWrites,s))return null;{const o=Rn(t.visibleWrites,s);return pu(o)?i.getChild(n):li(o,i.getChild(n))}}function H1(t,e,n,r){const i=de(e,n),s=gr(t.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(n)){const o=Rn(t.visibleWrites,i);return li(o,r.getNode().getImmediateChild(n))}else return null}function V1(t,e){return gr(t.visibleWrites,e)}function $1(t,e,n,r,i,s,o){let l;const a=Rn(t.visibleWrites,e),c=gr(a,H());if(c!=null)l=c;else if(n!=null)l=li(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const u=[],h=o.getCompare(),f=s?l.getReverseIteratorFrom(r,o):l.getIteratorFrom(r,o);let g=f.getNext();for(;g&&u.length<i;)h(g,r)!==0&&u.push(g),g=f.getNext();return u}else return[]}function B1(){return{visibleWrites:wt.empty(),allWrites:[],lastWriteId:-1}}function Il(t,e,n,r){return Oy(t.writeTree,t.treePath,e,n,r)}function Gd(t,e){return z1(t.writeTree,t.treePath,e)}function Ip(t,e,n,r){return W1(t.writeTree,t.treePath,e,n,r)}function Tl(t,e){return V1(t.writeTree,de(t.treePath,e))}function G1(t,e,n,r,i,s){return $1(t.writeTree,t.treePath,e,n,r,i,s)}function Kd(t,e,n){return H1(t.writeTree,t.treePath,e,n)}function Dy(t,e){return Ly(de(t.treePath,e),t.writeTree)}function Ly(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K1{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;S(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),S(r!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(r);if(i){const s=i.type;if(n==="child_added"&&s==="child_removed")this.changeMap.set(r,ks(r,e.snapshotNode,i.snapshotNode));else if(n==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&s==="child_changed")this.changeMap.set(r,Cs(r,i.oldSnap));else if(n==="child_changed"&&s==="child_added")this.changeMap.set(r,si(r,e.snapshotNode));else if(n==="child_changed"&&s==="child_changed")this.changeMap.set(r,ks(r,e.snapshotNode,i.oldSnap));else throw fi("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q1{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const My=new q1;class qd{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Dn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Kd(this.writes_,e,r)}}getChildAfterChild(e,n,r){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ur(this.viewCache_),s=G1(this.writes_,i,n,1,r,e);return s.length===0?null:s[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q1(t){return{filter:t}}function Y1(t,e){S(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),S(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function X1(t,e,n,r,i){const s=new K1;let o,l;if(n.type===_t.OVERWRITE){const c=n;c.source.fromUser?o=mu(t,e,c.path,c.snap,r,i,s):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!U(c.path),o=Nl(t,e,c.path,c.snap,r,i,l,s))}else if(n.type===_t.MERGE){const c=n;c.source.fromUser?o=Z1(t,e,c.path,c.children,r,i,s):(S(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=gu(t,e,c.path,c.children,r,i,l,s))}else if(n.type===_t.ACK_USER_WRITE){const c=n;c.revert?o=nI(t,e,c.path,r,i,s):o=eI(t,e,c.path,c.affectedTree,r,i,s)}else if(n.type===_t.LISTEN_COMPLETE)o=tI(t,e,n.path,r,s);else throw fi("Unknown operation type: "+n.type);const a=s.getChanges();return J1(e,o,a),{viewCache:o,changes:a}}function J1(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=kl(t);(n.length>0||!t.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&n.push(Ny(kl(e)))}}function Fy(t,e,n,r,i,s){const o=e.eventCache;if(Tl(r,n)!=null)return e;{let l,a;if(U(n))if(S(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=ur(e),u=c instanceof R?c:R.EMPTY_NODE,h=Gd(r,u);l=t.filter.updateFullNode(e.eventCache.getNode(),h,s)}else{const c=Il(r,ur(e));l=t.filter.updateFullNode(e.eventCache.getNode(),c,s)}else{const c=F(n);if(c===".priority"){S(On(n)===1,"Can't have a priority with additional path components");const u=o.getNode();a=e.serverCache.getNode();const h=Ip(r,n,u,a);h!=null?l=t.filter.updatePriority(u,h):l=o.getNode()}else{const u=Y(n);let h;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const f=Ip(r,n,o.getNode(),a);f!=null?h=o.getNode().getImmediateChild(c).updateChild(u,f):h=o.getNode().getImmediateChild(c)}else h=Kd(r,c,e.serverCache);h!=null?l=t.filter.updateChild(o.getNode(),c,h,u,i,s):l=o.getNode()}}return Zi(e,l,o.isFullyInitialized()||U(n),t.filter.filtersNodes())}}function Nl(t,e,n,r,i,s,o,l){const a=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(U(n))c=u.updateFullNode(a.getNode(),r,null);else if(u.filtersNodes()&&!a.isFiltered()){const g=a.getNode().updateChild(n,r);c=u.updateFullNode(a.getNode(),g,null)}else{const g=F(n);if(!a.isCompleteForPath(n)&&On(n)>1)return e;const y=Y(n),A=a.getNode().getImmediateChild(g).updateChild(y,r);g===".priority"?c=u.updatePriority(a.getNode(),A):c=u.updateChild(a.getNode(),g,A,y,My,null)}const h=Py(e,c,a.isFullyInitialized()||U(n),u.filtersNodes()),f=new qd(i,h,s);return Fy(t,h,n,i,f,l)}function mu(t,e,n,r,i,s,o){const l=e.eventCache;let a,c;const u=new qd(i,e,s);if(U(n))c=t.filter.updateFullNode(e.eventCache.getNode(),r,o),a=Zi(e,c,!0,t.filter.filtersNodes());else{const h=F(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),r),a=Zi(e,c,l.isFullyInitialized(),l.isFiltered());else{const f=Y(n),g=l.getNode().getImmediateChild(h);let y;if(U(f))y=r;else{const v=u.getCompleteChild(h);v!=null?Fd(f)===".priority"&&v.getChild(Ey(f)).isEmpty()?y=v:y=v.updateChild(f,r):y=R.EMPTY_NODE}if(g.equals(y))a=e;else{const v=t.filter.updateChild(l.getNode(),h,y,f,u,o);a=Zi(e,v,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function Tp(t,e){return t.eventCache.isCompleteForChild(e)}function Z1(t,e,n,r,i,s,o){let l=e;return r.foreach((a,c)=>{const u=de(n,a);Tp(e,F(u))&&(l=mu(t,l,u,c,i,s,o))}),r.foreach((a,c)=>{const u=de(n,a);Tp(e,F(u))||(l=mu(t,l,u,c,i,s,o))}),l}function Np(t,e,n){return n.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function gu(t,e,n,r,i,s,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;U(n)?c=r:c=new Q(null).setTree(n,r);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,f)=>{if(u.hasChild(h)){const g=e.serverCache.getNode().getImmediateChild(h),y=Np(t,g,f);a=Nl(t,a,new B(h),y,i,s,o,l)}}),c.children.inorderTraversal((h,f)=>{const g=!e.serverCache.isCompleteForChild(h)&&f.value===null;if(!u.hasChild(h)&&!g){const y=e.serverCache.getNode().getImmediateChild(h),v=Np(t,y,f);a=Nl(t,a,new B(h),v,i,s,o,l)}}),a}function eI(t,e,n,r,i,s,o){if(Tl(i,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(r.value!=null){if(U(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return Nl(t,e,n,a.getNode().getChild(n),i,s,l,o);if(U(n)){let c=new Q(null);return a.getNode().forEachChild(qr,(u,h)=>{c=c.set(new B(u),h)}),gu(t,e,n,c,i,s,l,o)}else return e}else{let c=new Q(null);return r.foreach((u,h)=>{const f=de(n,u);a.isCompleteForPath(f)&&(c=c.set(u,a.getNode().getChild(f)))}),gu(t,e,n,c,i,s,l,o)}}function tI(t,e,n,r,i){const s=e.serverCache,o=Py(e,s.getNode(),s.isFullyInitialized()||U(n),s.isFiltered());return Fy(t,o,n,r,My,i)}function nI(t,e,n,r,i,s){let o;if(Tl(r,n)!=null)return e;{const l=new qd(r,e,i),a=e.eventCache.getNode();let c;if(U(n)||F(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Il(r,ur(e));else{const h=e.serverCache.getNode();S(h instanceof R,"serverChildren would be complete if leaf node"),u=Gd(r,h)}u=u,c=t.filter.updateFullNode(a,u,s)}else{const u=F(n);let h=Kd(r,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=a.getImmediateChild(u)),h!=null?c=t.filter.updateChild(a,u,h,Y(n),l,s):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(a,u,R.EMPTY_NODE,Y(n),l,s):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Il(r,ur(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,s)))}return o=e.serverCache.isFullyInitialized()||Tl(r,H())!=null,Zi(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,i=new Wd(r.getIndex()),s=E1(r);this.processor_=Q1(s);const o=n.serverCache,l=n.eventCache,a=i.updateFullNode(R.EMPTY_NODE,o.getNode(),null),c=s.updateFullNode(R.EMPTY_NODE,l.getNode(),null),u=new Dn(a,o.isFullyInitialized(),i.filtersNodes()),h=new Dn(c,l.isFullyInitialized(),s.filtersNodes());this.viewCache_=ea(h,u),this.eventGenerator_=new N1(this.query_)}get query(){return this.query_}}function iI(t){return t.viewCache_.serverCache.getNode()}function sI(t){return kl(t.viewCache_)}function oI(t,e){const n=ur(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!U(e)&&!n.getImmediateChild(F(e)).isEmpty())?n.getChild(e):null}function Rp(t){return t.eventRegistrations_.length===0}function lI(t,e){t.eventRegistrations_.push(e)}function Pp(t,e,n){const r=[];if(n){S(e==null,"A cancel should cancel all event registrations.");const i=t.query._path;t.eventRegistrations_.forEach(s=>{const o=s.createCancelEvent(n,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<t.eventRegistrations_.length;++s){const o=t.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(t.eventRegistrations_.slice(s+1));break}}t.eventRegistrations_=i}else t.eventRegistrations_=[];return r}function Ap(t,e,n,r){e.type===_t.MERGE&&e.source.queryId!==null&&(S(ur(t.viewCache_),"We should always have a full cache before handling merges"),S(kl(t.viewCache_),"Missing event cache, even though we have a server cache"));const i=t.viewCache_,s=X1(t.processor_,i,e,n,r);return Y1(t.processor_,s.viewCache),S(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=s.viewCache,jy(t,s.changes,s.viewCache.eventCache.getNode(),null)}function aI(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(se,(s,o)=>{r.push(si(s,o))}),n.isFullyInitialized()&&r.push(Ny(n.getNode())),jy(t,r,n.getNode(),e)}function jy(t,e,n,r){const i=r?[r]:t.eventRegistrations_;return R1(t.eventGenerator_,e,n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rl;class Uy{constructor(){this.views=new Map}}function cI(t){S(!Rl,"__referenceConstructor has already been defined"),Rl=t}function uI(){return S(Rl,"Reference.ts has not been loaded"),Rl}function dI(t){return t.views.size===0}function Qd(t,e,n,r){const i=e.source.queryId;if(i!==null){const s=t.views.get(i);return S(s!=null,"SyncTree gave us an op for an invalid query."),Ap(s,e,n,r)}else{let s=[];for(const o of t.views.values())s=s.concat(Ap(o,e,n,r));return s}}function zy(t,e,n,r,i){const s=e._queryIdentifier,o=t.views.get(s);if(!o){let l=Il(n,i?r:null),a=!1;l?a=!0:r instanceof R?(l=Gd(n,r),a=!1):(l=R.EMPTY_NODE,a=!1);const c=ea(new Dn(l,a,!1),new Dn(r,i,!1));return new rI(e,c)}return o}function hI(t,e,n,r,i,s){const o=zy(t,e,r,i,s);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),lI(o,n),aI(o,n)}function fI(t,e,n,r){const i=e._queryIdentifier,s=[];let o=[];const l=Ln(t);if(i==="default")for(const[a,c]of t.views.entries())o=o.concat(Pp(c,n,r)),Rp(c)&&(t.views.delete(a),c.query._queryParams.loadsAllData()||s.push(c.query));else{const a=t.views.get(i);a&&(o=o.concat(Pp(a,n,r)),Rp(a)&&(t.views.delete(i),a.query._queryParams.loadsAllData()||s.push(a.query)))}return l&&!Ln(t)&&s.push(new(uI())(e._repo,e._path)),{removed:s,events:o}}function Wy(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Pn(t,e){let n=null;for(const r of t.views.values())n=n||oI(r,e);return n}function Hy(t,e){if(e._queryParams.loadsAllData())return na(t);{const r=e._queryIdentifier;return t.views.get(r)}}function Vy(t,e){return Hy(t,e)!=null}function Ln(t){return na(t)!=null}function na(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pl;function pI(t){S(!Pl,"__referenceConstructor has already been defined"),Pl=t}function mI(){return S(Pl,"Reference.ts has not been loaded"),Pl}let gI=1;class bp{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Q(null),this.pendingWriteTree_=B1(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Yd(t,e,n,r,i){return O1(t.pendingWriteTree_,e,n,r,i),i?yi(t,new cr(Vd(),e,n)):[]}function _I(t,e,n,r){D1(t.pendingWriteTree_,e,n,r);const i=Q.fromObject(n);return yi(t,new oi(Vd(),e,i))}function _n(t,e,n=!1){const r=L1(t.pendingWriteTree_,e);if(M1(t.pendingWriteTree_,e)){let s=new Q(null);return r.snap!=null?s=s.set(H(),!0):Ne(r.children,o=>{s=s.set(new B(o),!0)}),yi(t,new Cl(r.path,s,n))}else return[]}function Vs(t,e,n){return yi(t,new cr($d(),e,n))}function yI(t,e,n){const r=Q.fromObject(n);return yi(t,new oi($d(),e,r))}function vI(t,e){return yi(t,new Ts($d(),e))}function wI(t,e,n){const r=Xd(t,n);if(r){const i=Jd(r),s=i.path,o=i.queryId,l=Fe(s,e),a=new Ts(Bd(o),l);return Zd(t,s,a)}else return[]}function Al(t,e,n,r,i=!1){const s=e._path,o=t.syncPointTree_.get(s);let l=[];if(o&&(e._queryIdentifier==="default"||Vy(o,e))){const a=fI(o,e,n,r);dI(o)&&(t.syncPointTree_=t.syncPointTree_.remove(s));const c=a.removed;if(l=a.events,!i){const u=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(s,(f,g)=>Ln(g));if(u&&!h){const f=t.syncPointTree_.subtree(s);if(!f.isEmpty()){const g=xI(f);for(let y=0;y<g.length;++y){const v=g[y],A=v.query,m=Ky(t,v);t.listenProvider_.startListening(ts(A),Ns(t,A),m.hashFn,m.onComplete)}}}!h&&c.length>0&&!r&&(u?t.listenProvider_.stopListening(ts(e),null):c.forEach(f=>{const g=t.queryToTagMap.get(ia(f));t.listenProvider_.stopListening(ts(f),g)}))}CI(t,c)}return l}function $y(t,e,n,r){const i=Xd(t,r);if(i!=null){const s=Jd(i),o=s.path,l=s.queryId,a=Fe(o,e),c=new cr(Bd(l),a,n);return Zd(t,o,c)}else return[]}function EI(t,e,n,r){const i=Xd(t,r);if(i){const s=Jd(i),o=s.path,l=s.queryId,a=Fe(o,e),c=Q.fromObject(n),u=new oi(Bd(l),a,c);return Zd(t,o,u)}else return[]}function _u(t,e,n,r=!1){const i=e._path;let s=null,o=!1;t.syncPointTree_.foreachOnPath(i,(f,g)=>{const y=Fe(f,i);s=s||Pn(g,y),o=o||Ln(g)});let l=t.syncPointTree_.get(i);l?(o=o||Ln(l),s=s||Pn(l,H())):(l=new Uy,t.syncPointTree_=t.syncPointTree_.set(i,l));let a;s!=null?a=!0:(a=!1,s=R.EMPTY_NODE,t.syncPointTree_.subtree(i).foreachChild((g,y)=>{const v=Pn(y,H());v&&(s=s.updateImmediateChild(g,v))}));const c=Vy(l,e);if(!c&&!e._queryParams.loadsAllData()){const f=ia(e);S(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const g=kI();t.queryToTagMap.set(f,g),t.tagToQueryMap.set(g,f)}const u=ta(t.pendingWriteTree_,i);let h=hI(l,e,n,u,s,a);if(!c&&!o&&!r){const f=Hy(l,e);h=h.concat(II(t,e,f))}return h}function ra(t,e,n){const i=t.pendingWriteTree_,s=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=Fe(o,e),c=Pn(l,a);if(c)return c});return Oy(i,e,s,n,!0)}function SI(t,e){const n=e._path;let r=null;t.syncPointTree_.foreachOnPath(n,(c,u)=>{const h=Fe(c,n);r=r||Pn(u,h)});let i=t.syncPointTree_.get(n);i?r=r||Pn(i,H()):(i=new Uy,t.syncPointTree_=t.syncPointTree_.set(n,i));const s=r!=null,o=s?new Dn(r,!0,!1):null,l=ta(t.pendingWriteTree_,e._path),a=zy(i,e,l,s?o.getNode():R.EMPTY_NODE,s);return sI(a)}function yi(t,e){return By(e,t.syncPointTree_,null,ta(t.pendingWriteTree_,H()))}function By(t,e,n,r){if(U(t.path))return Gy(t,e,n,r);{const i=e.get(H());n==null&&i!=null&&(n=Pn(i,H()));let s=[];const o=F(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const c=n?n.getImmediateChild(o):null,u=Dy(r,o);s=s.concat(By(l,a,c,u))}return i&&(s=s.concat(Qd(i,t,r,n))),s}}function Gy(t,e,n,r){const i=e.get(H());n==null&&i!=null&&(n=Pn(i,H()));let s=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,c=Dy(r,o),u=t.operationForChild(o);u&&(s=s.concat(Gy(u,l,a,c)))}),i&&(s=s.concat(Qd(i,t,r,n))),s}function Ky(t,e){const n=e.query,r=Ns(t,n);return{hashFn:()=>(iI(e)||R.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?wI(t,n._path,r):vI(t,n._path);{const s=vk(i,n);return Al(t,n,null,s)}}}}function Ns(t,e){const n=ia(e);return t.queryToTagMap.get(n)}function ia(t){return t._path.toString()+"$"+t._queryIdentifier}function Xd(t,e){return t.tagToQueryMap.get(e)}function Jd(t){const e=t.indexOf("$");return S(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new B(t.substr(0,e))}}function Zd(t,e,n){const r=t.syncPointTree_.get(e);S(r,"Missing sync point for query tag that we're tracking");const i=ta(t.pendingWriteTree_,e);return Qd(r,n,i,null)}function xI(t){return t.fold((e,n,r)=>{if(n&&Ln(n))return[na(n)];{let i=[];return n&&(i=Wy(n)),Ne(r,(s,o)=>{i=i.concat(o)}),i}})}function ts(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(mI())(t._repo,t._path):t}function CI(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const i=ia(r),s=t.queryToTagMap.get(i);t.queryToTagMap.delete(i),t.tagToQueryMap.delete(s)}}}function kI(){return gI++}function II(t,e,n){const r=e._path,i=Ns(t,e),s=Ky(t,n),o=t.listenProvider_.startListening(ts(e),i,s.hashFn,s.onComplete),l=t.syncPointTree_.subtree(r);if(i)S(!Ln(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,u,h)=>{if(!U(c)&&u&&Ln(u))return[na(u).query];{let f=[];return u&&(f=f.concat(Wy(u).map(g=>g.query))),Ne(h,(g,y)=>{f=f.concat(y)}),f}});for(let c=0;c<a.length;++c){const u=a[c];t.listenProvider_.stopListening(ts(u),Ns(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eh{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new eh(n)}node(){return this.node_}}class th{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=de(this.path_,e);return new th(this.syncTree_,n)}node(){return ra(this.syncTree_,this.path_)}}const TI=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Op=function(t,e,n){if(!t||typeof t!="object")return t;if(S(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return NI(t[".sv"],e,n);if(typeof t[".sv"]=="object")return RI(t[".sv"],e);S(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},NI=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:S(!1,"Unexpected server value: "+t)}},RI=function(t,e,n){t.hasOwnProperty("increment")||S(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&S(!1,"Unexpected increment value: "+r);const i=e.node();if(S(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;const o=i.getValue();return typeof o!="number"?r:o+r},qy=function(t,e,n,r){return rh(e,new th(n,t),r)},nh=function(t,e,n){return rh(t,new eh(e),n)};function rh(t,e,n){const r=t.getPriority().val(),i=Op(r,e.getImmediateChild(".priority"),n);let s;if(t.isLeafNode()){const o=t,l=Op(o.getValue(),e,n);return l!==o.getValue()||i!==o.getPriority().val()?new we(l,me(i)):t}else{const o=t;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new we(i))),o.forEachChild(se,(l,a)=>{const c=rh(a,e.getImmediateChild(l),n);c!==a&&(s=s.updateImmediateChild(l,c))}),s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function sa(t,e){let n=e instanceof B?e:new B(e),r=t,i=F(n);for(;i!==null;){const s=rr(r.node.children,i)||{children:{},childCount:0};r=new ih(i,r,s),n=Y(n),i=F(n)}return r}function _r(t){return t.node.value}function sh(t,e){t.node.value=e,yu(t)}function Qy(t){return t.node.childCount>0}function PI(t){return _r(t)===void 0&&!Qy(t)}function oa(t,e){Ne(t.node.children,(n,r)=>{e(new ih(n,t,r))})}function Yy(t,e,n,r){n&&e(t),oa(t,i=>{Yy(i,e,!0)})}function AI(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function $s(t){return new B(t.parent===null?t.name:$s(t.parent)+"/"+t.name)}function yu(t){t.parent!==null&&bI(t.parent,t.name,t)}function bI(t,e,n){const r=PI(n),i=xt(t.node.children,e);r&&i?(delete t.node.children[e],t.node.childCount--,yu(t)):!r&&!i&&(t.node.children[e]=n.node,t.node.childCount++,yu(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OI=/[\[\].#$\/\u0000-\u001F\u007F]/,DI=/[\[\].#$\u0000-\u001F\u007F]/,Ja=10*1024*1024,oh=function(t){return typeof t=="string"&&t.length!==0&&!OI.test(t)},Xy=function(t){return typeof t=="string"&&t.length!==0&&!DI.test(t)},LI=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Xy(t)},Jy=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!bd(t)||t&&typeof t=="object"&&xt(t,".sv")},MI=function(t,e,n,r){Bs(ql(t,"value"),e,n)},Bs=function(t,e,n){const r=n instanceof B?new Zk(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Bn(r));if(typeof e=="function")throw new Error(t+"contains a function "+Bn(r)+" with contents = "+e.toString());if(bd(e))throw new Error(t+"contains "+e.toString()+" "+Bn(r));if(typeof e=="string"&&e.length>Ja/3&&Ql(e)>Ja)throw new Error(t+"contains a string greater than "+Ja+" utf8 bytes "+Bn(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(Ne(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!oh(o)))throw new Error(t+" contains an invalid key ("+o+") "+Bn(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);e1(r,o),Bs(t,l,r),t1(r)}),i&&s)throw new Error(t+' contains ".value" child '+Bn(r)+" in addition to actual children.")}},FI=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const s=xs(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!oh(s[o]))throw new Error(t+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Jk);let i=null;for(n=0;n<e.length;n++){if(r=e[n],i!==null&&lt(i,r))throw new Error(t+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},jI=function(t,e,n,r){const i=ql(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const s=[];Ne(e,(o,l)=>{const a=new B(o);if(Bs(i,l,de(n,a)),Fd(a)===".priority"&&!Jy(l))throw new Error(i+"contains an invalid value for '"+a.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(a)}),FI(i,s)},Zy=function(t,e,n,r){if(!Xy(n))throw new Error(ql(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},UI=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Zy(t,e,n)},ev=function(t,e){if(F(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},zI=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!oh(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!LI(n))throw new Error(ql(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WI{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function la(t,e){let n=null;for(let r=0;r<e.length;r++){const i=e[r],s=i.getPath();n!==null&&!jd(s,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:s}),n.events.push(i)}n&&t.eventLists_.push(n)}function tv(t,e,n){la(t,n),nv(t,r=>jd(r,e))}function et(t,e,n){la(t,n),nv(t,r=>lt(r,e)||lt(e,r))}function nv(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const i=t.eventLists_[r];if(i){const s=i.path;e(s)?(HI(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function HI(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();Xi&&ke("event: "+n.toString()),_i(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VI="repo_interrupt",$I=25;class BI{constructor(e,n,r,i){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new WI,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=xl(),this.transactionQueueTree_=new ih,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function GI(t,e,n){if(t.stats_=Ld(t.repoInfo_),t.forceRestClient_||xk())t.server_=new Sl(t.repoInfo_,(r,i,s,o)=>{Dp(t,r,i,s,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>Lp(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{ye(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new $t(t.repoInfo_,e,(r,i,s,o)=>{Dp(t,r,i,s,o)},r=>{Lp(t,r)},r=>{qI(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=Nk(t.repoInfo_,()=>new T1(t.stats_,t.server_)),t.infoData_=new S1,t.infoSyncTree_=new bp({startListening:(r,i,s,o)=>{let l=[];const a=t.infoData_.getNode(r._path);return a.isEmpty()||(l=Vs(t.infoSyncTree_,r._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),lh(t,"connected",!1),t.serverSyncTree_=new bp({startListening:(r,i,s,o)=>(t.server_.listen(r,s,i,(l,a)=>{const c=o(l,a);et(t.eventQueue_,r._path,c)}),[]),stopListening:(r,i)=>{t.server_.unlisten(r,i)}})}function KI(t){const n=t.infoData_.getNode(new B(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function Gs(t){return TI({timestamp:KI(t)})}function Dp(t,e,n,r,i){t.dataUpdateCount++;const s=new B(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(i)if(r){const a=dl(n,c=>me(c));o=EI(t.serverSyncTree_,s,a,i)}else{const a=me(n);o=$y(t.serverSyncTree_,s,a,i)}else if(r){const a=dl(n,c=>me(c));o=yI(t.serverSyncTree_,s,a)}else{const a=me(n);o=Vs(t.serverSyncTree_,s,a)}let l=s;o.length>0&&(l=ai(t,s)),et(t.eventQueue_,l,o)}function Lp(t,e){lh(t,"connected",e),e===!1&&JI(t)}function qI(t,e){Ne(e,(n,r)=>{lh(t,n,r)})}function lh(t,e,n){const r=new B("/.info/"+e),i=me(n);t.infoData_.updateSnapshot(r,i);const s=Vs(t.infoSyncTree_,r,i);et(t.eventQueue_,r,s)}function aa(t){return t.nextWriteId_++}function QI(t,e,n){const r=SI(t.serverSyncTree_,e);return r!=null?Promise.resolve(r):t.server_.get(e).then(i=>{const s=me(i).withIndex(e._queryParams.getIndex());_u(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=Vs(t.serverSyncTree_,e._path,s);else{const l=Ns(t.serverSyncTree_,e);o=$y(t.serverSyncTree_,e._path,s,l)}return et(t.eventQueue_,e._path,o),Al(t.serverSyncTree_,e,n,null,!0),s},i=>(vi(t,"get for query "+ye(e)+" failed: "+i),Promise.reject(new Error(i))))}function YI(t,e,n,r,i){vi(t,"set",{path:e.toString(),value:n,priority:r});const s=Gs(t),o=me(n,r),l=ra(t.serverSyncTree_,e),a=nh(o,l,s),c=aa(t),u=Yd(t.serverSyncTree_,e,a,c,!0);la(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(f,g)=>{const y=f==="ok";y||Ue("set at "+e+" failed: "+f);const v=_n(t.serverSyncTree_,c,!y);et(t.eventQueue_,e,v),vu(t,i,f,g)});const h=ch(t,e);ai(t,h),et(t.eventQueue_,h,[])}function XI(t,e,n,r){vi(t,"update",{path:e.toString(),value:n});let i=!0;const s=Gs(t),o={};if(Ne(n,(l,a)=>{i=!1,o[l]=qy(de(e,l),me(a),t.serverSyncTree_,s)}),i)ke("update() called with empty data.  Don't do anything."),vu(t,r,"ok",void 0);else{const l=aa(t),a=_I(t.serverSyncTree_,e,o,l);la(t.eventQueue_,a),t.server_.merge(e.toString(),n,(c,u)=>{const h=c==="ok";h||Ue("update at "+e+" failed: "+c);const f=_n(t.serverSyncTree_,l,!h),g=f.length>0?ai(t,e):e;et(t.eventQueue_,g,f),vu(t,r,c,u)}),Ne(n,c=>{const u=ch(t,de(e,c));ai(t,u)}),et(t.eventQueue_,e,[])}}function JI(t){vi(t,"onDisconnectEvents");const e=Gs(t),n=xl();du(t.onDisconnect_,H(),(i,s)=>{const o=qy(i,s,t.serverSyncTree_,e);Ry(n,i,o)});let r=[];du(n,H(),(i,s)=>{r=r.concat(Vs(t.serverSyncTree_,i,s));const o=ch(t,i);ai(t,o)}),t.onDisconnect_=xl(),et(t.eventQueue_,H(),r)}function ZI(t,e,n){let r;F(e._path)===".info"?r=_u(t.infoSyncTree_,e,n):r=_u(t.serverSyncTree_,e,n),tv(t.eventQueue_,e._path,r)}function eT(t,e,n){let r;F(e._path)===".info"?r=Al(t.infoSyncTree_,e,n):r=Al(t.serverSyncTree_,e,n),tv(t.eventQueue_,e._path,r)}function tT(t){t.persistentConnection_&&t.persistentConnection_.interrupt(VI)}function vi(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ke(n,...e)}function vu(t,e,n,r){e&&_i(()=>{if(n==="ok")e(null);else{const i=(n||"error").toUpperCase();let s=i;r&&(s+=": "+r);const o=new Error(s);o.code=i,e(o)}})}function nT(t,e,n,r,i,s){vi(t,"transaction on "+e);const o={path:e,update:n,onComplete:r,status:null,order:Z_(),applyLocally:s,retryCount:0,unwatcher:i,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},l=ah(t,e,void 0);o.currentInputSnapshot=l;const a=o.update(l.val());if(a===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Bs("transaction failed: Data returned ",a,o.path),o.status=0;const c=sa(t.transactionQueueTree_,e),u=_r(c)||[];u.push(o),sh(c,u);let h;typeof a=="object"&&a!==null&&xt(a,".priority")?(h=rr(a,".priority"),S(Jy(h),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):h=(ra(t.serverSyncTree_,e)||R.EMPTY_NODE).getPriority().val();const f=Gs(t),g=me(a,h),y=nh(g,l,f);o.currentOutputSnapshotRaw=g,o.currentOutputSnapshotResolved=y,o.currentWriteId=aa(t);const v=Yd(t.serverSyncTree_,e,y,o.currentWriteId,o.applyLocally);et(t.eventQueue_,e,v),ca(t,t.transactionQueueTree_)}}function ah(t,e,n){return ra(t.serverSyncTree_,e,n)||R.EMPTY_NODE}function ca(t,e=t.transactionQueueTree_){if(e||ua(t,e),_r(e)){const n=iv(t,e);S(n.length>0,"Sending zero length transaction queue"),n.every(i=>i.status===0)&&rT(t,$s(e),n)}else Qy(e)&&oa(e,n=>{ca(t,n)})}function rT(t,e,n){const r=n.map(c=>c.currentWriteId),i=ah(t,e,r);let s=i;const o=i.hash();for(let c=0;c<n.length;c++){const u=n[c];S(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=Fe(e,u.path);s=s.updateChild(h,u.currentOutputSnapshotRaw)}const l=s.val(!0),a=e;t.server_.put(a.toString(),l,c=>{vi(t,"transaction put response",{path:a.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let f=0;f<n.length;f++)n[f].status=2,u=u.concat(_n(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&h.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();ua(t,sa(t.transactionQueueTree_,e)),ca(t,t.transactionQueueTree_),et(t.eventQueue_,e,u);for(let f=0;f<h.length;f++)_i(h[f])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{Ue("transaction at "+a.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}ai(t,e)}},o)}function ai(t,e){const n=rv(t,e),r=$s(n),i=iv(t,n);return iT(t,i,r),r}function iT(t,e,n){if(e.length===0)return;const r=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=Fe(n,a.path);let u=!1,h;if(S(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)u=!0,h=a.abortReason,i=i.concat(_n(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=$I)u=!0,h="maxretry",i=i.concat(_n(t.serverSyncTree_,a.currentWriteId,!0));else{const f=ah(t,a.path,o);a.currentInputSnapshot=f;const g=e[l].update(f.val());if(g!==void 0){Bs("transaction failed: Data returned ",g,a.path);let y=me(g);typeof g=="object"&&g!=null&&xt(g,".priority")||(y=y.updatePriority(f.getPriority()));const A=a.currentWriteId,m=Gs(t),p=nh(y,f,m);a.currentOutputSnapshotRaw=y,a.currentOutputSnapshotResolved=p,a.currentWriteId=aa(t),o.splice(o.indexOf(A),1),i=i.concat(Yd(t.serverSyncTree_,a.path,p,a.currentWriteId,a.applyLocally)),i=i.concat(_n(t.serverSyncTree_,A,!0))}else u=!0,h="nodata",i=i.concat(_n(t.serverSyncTree_,a.currentWriteId,!0))}et(t.eventQueue_,n,i),i=[],u&&(e[l].status=2,function(f){setTimeout(f,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(h==="nodata"?r.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):r.push(()=>e[l].onComplete(new Error(h),!1,null))))}ua(t,t.transactionQueueTree_);for(let l=0;l<r.length;l++)_i(r[l]);ca(t,t.transactionQueueTree_)}function rv(t,e){let n,r=t.transactionQueueTree_;for(n=F(e);n!==null&&_r(r)===void 0;)r=sa(r,n),e=Y(e),n=F(e);return r}function iv(t,e){const n=[];return sv(t,e,n),n.sort((r,i)=>r.order-i.order),n}function sv(t,e,n){const r=_r(e);if(r)for(let i=0;i<r.length;i++)n.push(r[i]);oa(e,i=>{sv(t,i,n)})}function ua(t,e){const n=_r(e);if(n){let r=0;for(let i=0;i<n.length;i++)n[i].status!==2&&(n[r]=n[i],r++);n.length=r,sh(e,n.length>0?n:void 0)}oa(e,r=>{ua(t,r)})}function ch(t,e){const n=$s(rv(t,e)),r=sa(t.transactionQueueTree_,e);return AI(r,i=>{Za(t,i)}),Za(t,r),Yy(r,i=>{Za(t,i)}),n}function Za(t,e){const n=_r(e);if(n){const r=[];let i=[],s=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(S(s===o-1,"All SENT items should be at beginning of queue."),s=o,n[o].status=3,n[o].abortReason="set"):(S(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),i=i.concat(_n(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?sh(e,void 0):n.length=s+1,et(t.eventQueue_,$s(e),i);for(let o=0;o<r.length;o++)_i(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sT(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function oT(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Ue(`Invalid query segment '${n}' in query '${t}'`)}return e}const Mp=function(t,e){const n=lT(t),r=n.namespace;n.domain==="firebase.com"&&Xt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Xt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||pk();const i=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new hy(n.host,n.secure,r,i,e,"",r!==n.subdomain),path:new B(n.pathString)}},lT=function(t){let e="",n="",r="",i="",s="",o=!0,l="https",a=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(l=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(i=sT(t.substring(u,h)));const f=oT(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const g=e.slice(0,c);if(g.toLowerCase()==="localhost")n="localhost";else if(g.split(".").length<=2)n=g;else{const y=e.indexOf(".");r=e.substring(0,y).toLowerCase(),n=e.substring(y+1),s=r}"ns"in f&&(s=f.ns)}return{host:e,port:a,domain:n,subdomain:r,secure:o,scheme:l,pathString:i,namespace:s}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(e,n,r,i){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+ye(this.snapshot.exportVal())}}class cT{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ov{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return S(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e,n,r,i){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=i}get key(){return U(this._path)?null:Fd(this._path)}get ref(){return new At(this._repo,this._path)}get _queryIdentifier(){const e=Sp(this._queryParams),n=Od(e);return n==="{}"?"default":n}get _queryObject(){return Sp(this._queryParams)}isEqual(e){if(e=Re(e),!(e instanceof uh))return!1;const n=this._repo===e._repo,r=jd(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return n&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+Xk(this._path)}}class At extends uh{constructor(e,n){super(e,n,new Hd,!1)}get parent(){const e=Ey(this._path);return e===null?null:new At(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class ci{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new B(e),r=wu(this.ref,e);return new ci(this._node.getChild(n),r,se)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new ci(i,wu(this.ref,r),se)))}hasChild(e){const n=new B(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Ks(t,e){return t=Re(t),t._checkNotDeleted("ref"),e!==void 0?wu(t._root,e):t._root}function wu(t,e){return t=Re(t),F(t._path)===null?UI("child","path",e):Zy("child","path",e),new At(t._repo,de(t._path,e))}function uT(t,e){t=Re(t),ev("set",t._path),MI("set",e,t._path);const n=new fr;return YI(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function lv(t,e){jI("update",e,t._path);const n=new fr;return XI(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function av(t){t=Re(t);const e=new ov(()=>{}),n=new da(e);return QI(t._repo,t,n).then(r=>new ci(r,new At(t._repo,t._path),t._queryParams.getIndex()))}class da{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new aT("value",this,new ci(e.snapshotNode,new At(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new cT(this,e,n):null}matches(e){return e instanceof da?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function dT(t,e,n,r,i){const s=new ov(n,void 0),o=new da(s);return ZI(t._repo,t,o),()=>eT(t._repo,t,o)}function dh(t,e,n,r){return dT(t,"value",e)}cI(At);pI(At);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hT="FIREBASE_DATABASE_EMULATOR_HOST",Eu={};let fT=!1;function pT(t,e,n,r){const i=e.lastIndexOf(":"),s=e.substring(0,i),o=Ls(s);t.repoInfo_=new hy(e,o,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0,n),r&&(t.authTokenProvider_=r)}function mT(t,e,n,r,i){let s=r||t.options.databaseURL;s===void 0&&(t.options.projectId||Xt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ke("Using default host for project ",t.options.projectId),s=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Mp(s,i),l=o.repoInfo,a;typeof process<"u"&&ip&&(a=ip[hT]),a?(s=`http://${a}?ns=${l.namespace}`,o=Mp(s,i),l=o.repoInfo):o.repoInfo.secure;const c=new kk(t.name,t.options,e);zI("Invalid Firebase Database URL",o),U(o.path)||Xt("Database URL must point to the root of a Firebase Database (not including a child path).");const u=_T(l,t,c,new Ck(t,n));return new yT(u,t)}function gT(t,e){const n=Eu[e];(!n||n[t.key]!==t)&&Xt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),tT(t),delete n[t.key]}function _T(t,e,n,r){let i=Eu[e.name];i||(i={},Eu[e.name]=i);let s=i[t.toURLString()];return s&&Xt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new BI(t,fT,n,r),i[t.toURLString()]=s,s}class yT{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(GI(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new At(this._repo,H())),this._rootInternal}_delete(){return this._rootInternal!==null&&(gT(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Xt("Cannot call "+e+" on a deleted database.")}}function vT(t=f_(),e){const n=xd(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=vE("database");r&&wT(n,...r)}return n}function wT(t,e,n,r={}){t=Re(t),t._checkNotDeleted("useEmulator");const i=`${e}:${n}`,s=t._repoInternal;if(t._instanceStarted){if(i===t._repoInternal.repoInfo_.host&&ir(r,s.repoInfo_.emulatorOptions))return;Xt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&Xt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Lo(Lo.OWNER);else if(r.mockUserToken){const l=typeof r.mockUserToken=="string"?r.mockUserToken:wE(r.mockUserToken,t.app.options.projectId);o=new Lo(l)}Ls(e)&&c_(e),pT(s,i,r,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ET(t){ck(mi),ni(new sr("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return mT(r,i,s,n)},"PUBLIC").setMultipleInstances(!0)),Nn(sp,op,t),Nn(sp,op,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ST{constructor(e,n){this.committed=e,this.snapshot=n}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function xT(t,e,n){if(t=Re(t),ev("Reference.transaction",t._path),t.key===".length"||t.key===".keys")throw"Reference.transaction failed: "+t.key+" is a read-only object.";const r=!0,i=new fr,s=(l,a,c)=>{let u=null;l?i.reject(l):(u=new ci(c,new At(t._repo,t._path),se),i.resolve(new ST(a,u)))},o=dh(t,()=>{});return nT(t._repo,t._path,e,s,o,r),i.promise}$t.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};$t.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};ET();const CT={apiKey:"AIzaSyDXOR8sYBdXYWcb1nFktWJ-mxgc9-NDbPk",authDomain:"rememberforme-fc18b.firebaseapp.com",databaseURL:"https://rememberforme-fc18b-default-rtdb.firebaseio.com",projectId:"rememberforme-fc18b",storageBucket:"rememberforme-fc18b.firebasestorage.app",messagingSenderId:"453928856195",appId:"1:453928856195:web:b074f1099dea94dc30c9b6"},Mo="family_001",cv=h_(CT),ha=lk(cv),qs=vT(cv);function kT(t){return`families/${t}`}function hh(t,e=""){const n=kT(t);return Ks(qs,e?`${n}/${e}`:n)}function yo(t,e,n){return dh(hh(t,e),n)}function ec(t,e,n){return lv(hh(t,e),n)}async function IT(t,e,n){const r=hh(t,`tasks/${e}`),i=await xT(r,s=>{const o=n(s);return o===void 0?s:o});return{committed:i.committed,snapshot:i.snapshot}}function TT(t){return Qx(ha,t)}async function NT(t,e){return $x(ha,t,e)}async function RT(t,e,n,r=Mo){var l;const i=await Vx(ha,t,e);n.trim()&&await Gx(i.user,{displayName:n.trim()});const s=Ks(qs,`users/${i.user.uid}`);return(await av(s)).exists()||await uT(s,{name:n.trim()||((l=i.user.email)==null?void 0:l.split("@")[0])||"Caregiver",email:i.user.email,role:"Family caregiver",familyId:r,linkedFamilyMembers:["Hy Nguyen","Minh Nguyen","Lan Tran"],preferences:{language:"English",appearance:"Light",timeFormat:"24-hour",notifications:{medicationReminders:!0,routineReminders:!0,trackerAlerts:!0,emergencyAlerts:!0,weeklySummary:!1}},createdAt:Date.now()}),i}async function PT(){return Yx(ha)}async function AT(t){const e=await av(Ks(qs,`users/${t}`));return e.exists()?e.val():null}function bT(t,e){return dh(Ks(qs,`users/${t}`),n=>{e(n.exists()?n.val():null)})}async function OT(t,e){return lv(Ks(qs,`users/${t}`),e)}function DT(t,e,n){const r=`
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${e}" />
          <stop offset="100%" stop-color="${n}" />
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="80" fill="url(#bg)" />
      <circle cx="80" cy="60" r="28" fill="#fff7ef" />
      <path d="M42 136c8-24 24-36 38-36s30 12 38 36" fill="#fff7ef" />
      <rect x="4" y="4" width="152" height="152" rx="76" fill="none" stroke="${t}" stroke-width="8"/>
    </svg>
  `;return`data:image/svg+xml;utf8,${encodeURIComponent(r)}`}function LT(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"}).format(t)}function MT(t){if(!t)return"No recent data";const e=Math.max(1,Math.round((Date.now()-t)/6e4));if(e<60)return`${e} minute${e===1?"":"s"} ago`;const n=Math.round(e/60);return`${n} hour${n===1?"":"s"} ago`}function uv(t){if(!t)return"--:--";const[e="0",n="0"]=t.split(":"),r=Number(e),i=Number(n),s=r>=12?"PM":"AM",o=r%12||12;return`${String(o).padStart(2,"0")}:${String(i).padStart(2,"0")} ${s}`}function FT({elder:t,kiosk:e,routines:n,trackerAlert:r,onAddNew:i,onModeChange:s,onFieldChange:o,onTrigger:l,onSave:a,onOpenEmergency:c}){return d.jsxs(d.Fragment,{children:[d.jsxs("section",{className:"space-y-3",children:[d.jsx("p",{className:"text-lg font-semibold text-slate-600",children:"Welcome back,"}),d.jsx("h1",{className:"text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[58px]",children:t.caregiverGreeting||"Good morning, Sarah"})]}),d.jsx(jT,{elder:t,kiosk:e}),d.jsxs("section",{className:"space-y-5",children:[d.jsxs("div",{className:"flex items-end justify-between gap-4",children:[d.jsx("h2",{className:"text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl",children:"Manage Routines"}),d.jsx("button",{type:"button",onClick:i,className:"text-lg font-bold text-brand transition hover:text-blue-700",children:"Add New"})]}),d.jsx("div",{className:"space-y-6",children:n.map(u=>d.jsx(UT,{routine:u,onModeChange:s,onFieldChange:o,onTrigger:l,onSave:a},u.id))})]}),d.jsx(WT,{trackerAlert:r}),d.jsx(HT,{onOpenModal:c})]})}function jT({elder:t,kiosk:e}){var a,c;const n=e.lastHeartbeatAt&&Date.now()-e.lastHeartbeatAt<3e4,r=e.online&&n,i=t.locationLabel||(t.status==="in_home"?"In Home":"Out of Home"),s=t.lastSeenAt?MT(t.lastSeenAt):"No recent data",o=((a=t.vitals)==null?void 0:a.heartRateBpm)??null,l=((c=t.vitals)==null?void 0:c.status)||"No data";return d.jsxs("section",{className:"card-shell p-6 sm:p-8",children:[d.jsxs("div",{className:"flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",children:[d.jsxs("div",{className:"flex items-center gap-5",children:[d.jsx("img",{src:"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23d9e8d2'/%3E%3Cstop offset='100%25' stop-color='%23eef2ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' rx='80' fill='url(%23bg)' /%3E%3Ccircle cx='80' cy='60' r='28' fill='%23fff7ef' /%3E%3Cpath d='M42 136c8-24 24-36 38-36s30 12 38 36' fill='%23fff7ef' /%3E%3Crect x='4' y='4' width='152' height='152' rx='76' fill='none' stroke='%238b6cff' stroke-width='8'/%3E%3C/svg%3E",alt:t.name||t.displayName||"Mom Eleanor",className:`h-20 w-20 rounded-full border-4 object-cover sm:h-24 sm:w-24 ${t.status==="in_home"?"border-active":"border-slate-300"}`}),d.jsxs("div",{children:[d.jsx("h2",{className:"text-3xl font-extrabold text-slate-900 sm:text-[52px] lg:text-[42px]",children:t.name||t.displayName||"Mom (Eleanor)"}),d.jsx("p",{className:"mt-1 text-2xl font-medium text-slate-600 sm:text-[32px] lg:text-[24px]",children:r?"Home Monitoring Active":"Home Monitoring Inactive"})]})]}),d.jsxs("div",{className:`pill-button gap-2 text-[15px] font-extrabold uppercase tracking-wide ${r?"bg-[#97f3a8] text-[#106228]":"bg-slate-200 text-slate-600"}`,children:[d.jsx("span",{className:`h-3 w-3 rounded-full ${r?"bg-[#106228]":"bg-slate-600"}`}),r?"LIVE":"OFFLINE"]})]}),d.jsxs("div",{className:"mt-8 grid gap-4 lg:grid-cols-2",children:[d.jsx(al,{icon:d.jsx(Jg,{className:"h-9 w-9 text-action"}),label:"Current Location",value:d.jsxs("span",{className:"inline-flex items-center gap-3 text-action",children:[d.jsx("span",{className:`h-6 w-6 rounded-full bg-gradient-to-b ${t.status==="in_home"?"from-[#39d435] to-[#179420] shadow-[0_2px_8px_rgba(43,160,47,0.45)]":"from-red-400 to-red-600 shadow-[0_2px_8px_rgba(220,38,38,0.45)]"}`}),i]})}),d.jsx(al,{icon:d.jsx(ll,{className:"h-9 w-9 text-brand"}),label:"Last detected",value:s})]}),d.jsxs("div",{className:"mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between",children:[d.jsxs("div",{className:"inline-flex items-center gap-3 text-lg font-semibold text-slate-700 sm:text-[18px]",children:[d.jsx(Xg,{className:"h-6 w-6 text-active"}),"Vitals: ",l,o!=null?` (${o} bpm)`:""]}),d.jsx("button",{type:"button",className:"text-xl font-extrabold text-brand transition hover:text-blue-700",children:"View Map >"})]})]})}function UT({routine:t,onModeChange:e,onFieldChange:n,onTrigger:r,onSave:i}){const s=t.status==="Completed",o=t.status==="Running",l=s?"bg-[#e9f6eb] text-action":o?"bg-yellow-100 text-yellow-800 animate-pulse":"bg-[#dfe8ff] text-slate-600";return d.jsxs("article",{className:"card-shell p-5 sm:p-6 lg:p-8",children:[d.jsxs("div",{className:"flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",children:[d.jsx("div",{className:"flex flex-wrap items-center gap-3",children:d.jsxs("span",{className:`pill-button gap-2 ${l}`,children:[s?d.jsx(_d,{className:"h-5 w-5"}):o?d.jsx("span",{className:"inline-flex h-5 w-5 items-center justify-center font-bold",children:"◔"}):d.jsx(ll,{className:"h-5 w-5"}),t.status]})}),d.jsxs("div",{className:"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end",children:[d.jsx("span",{className:"text-base font-medium text-slate-600 sm:text-[18px]",children:t.note}),d.jsx(zT,{mode:t.mode,onChange:a=>e(t.id,a),disabled:o})]})]}),t.mode==="edit"?d.jsxs("div",{className:"mt-6 space-y-6",children:[d.jsxs("div",{className:"grid gap-4 lg:grid-cols-[1.1fr_1fr_120px]",children:[d.jsx(tc,{label:"Name",input:d.jsx("input",{value:t.name,onChange:a=>n(t.id,"name",a.target.value),disabled:o,className:"h-20 w-full rounded-[20px] bg-lavender px-6 text-[22px] font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 disabled:opacity-60"})}),d.jsx(tc,{label:"Scheduled time",input:d.jsx("input",{type:"time",value:t.time,onChange:a=>n(t.id,"time",a.target.value),disabled:o,className:"h-20 w-full rounded-[20px] bg-lavender px-6 text-[22px] font-medium text-slate-800 outline-none ring-0 placeholder:text-slate-400 disabled:opacity-60"})}),d.jsx(tc,{label:"Auto run",input:d.jsx("div",{className:"flex h-20 items-center justify-center rounded-[20px] bg-lavender",children:d.jsx("input",{type:"checkbox",checked:t.autoRun,onChange:a=>n(t.id,"autoRun",a.target.checked),disabled:o,className:"h-9 w-9 rounded-md border-0 disabled:opacity-60"})})})]}),d.jsxs("div",{className:"grid gap-4 lg:grid-cols-2",children:[d.jsx(nc,{icon:kf,label:o?"Running...":"Trigger",onClick:()=>r(t.id),disabled:o}),d.jsx(nc,{icon:iE,label:"Save",onClick:()=>i(t.id),disabled:o})]})]}):d.jsxs("div",{className:"mt-6 space-y-6",children:[d.jsxs("div",{className:"grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center",children:[d.jsx("div",{className:"space-y-2",children:d.jsx("h3",{className:"text-2xl font-extrabold text-slate-900 sm:text-[20px]",children:t.name})}),d.jsx("div",{className:"text-right text-2xl font-semibold text-slate-600 sm:text-[18px]",children:uv(t.time)})]}),d.jsx(nc,{icon:kf,label:o?"Running...":"Trigger",onClick:()=>r(t.id),disabled:o,fullWidth:!0})]})]})}function tc({label:t,input:e}){return d.jsxs("div",{className:"space-y-2",children:[d.jsx("label",{className:"block text-xl font-bold text-slate-600 sm:text-[18px]",children:t}),e]})}function zT({mode:t,onChange:e,disabled:n=!1}){return d.jsx("div",{className:"inline-flex rounded-full bg-[#eef0ff] p-1 shadow-sm",children:["view","edit"].map(r=>{const i=r===t;return d.jsx("button",{type:"button",disabled:n,onClick:()=>e(r),className:`rounded-full px-5 py-2 text-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${i?"bg-white text-brand shadow-sm":"text-slate-600"}`,children:r==="view"?"View":"Edit"},r)})})}function nc({icon:t,label:e,onClick:n,fullWidth:r=!1,disabled:i=!1}){return d.jsxs("button",{type:"button",onClick:n,disabled:i,className:"inline-flex min-h-[72px] items-center justify-center gap-3 rounded-[20px] bg-action px-6 text-2xl font-semibold text-white transition hover:bg-[#0f622b] disabled:cursor-not-allowed disabled:opacity-50 w-full",children:[d.jsx(t,{className:"h-7 w-7"}),e]})}function WT({trackerAlert:t}){const e=t.is_active===!0||t.is_active==="true"||t.is_active==="True",n=r=>r==="abnormal_heart_rate"?"Abnormal heart rate":r==="inactive"?"Inactive":r==="out_of_safe_zone"?"Out of safe zone":"No alert";return d.jsxs("section",{className:"card-shell p-5 sm:p-6 lg:p-8",children:[d.jsxs("div",{className:"flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",children:[d.jsxs("div",{children:[d.jsx("h2",{className:"text-3xl font-extrabold text-slate-900 sm:text-4xl",children:"Tracker Alerts"}),d.jsx("p",{className:"mt-2 text-xl font-medium text-slate-600 sm:text-[18px]",children:"Wrist tracker pushes alerts for abnormal heart rate or inactivity."})]}),d.jsx("span",{className:`pill-button ${e?"bg-[#ffd6d6] text-[#c91818]":"bg-[#e9f6eb] text-action"}`,children:e?"Alert":"Normal"})]}),d.jsxs("div",{className:"mt-6 grid gap-4 lg:grid-cols-2",children:[d.jsx(al,{label:"Latest event",value:n(t.type),icon:null}),d.jsx(al,{label:"Source",value:t.source||"Tracker",icon:null}),d.jsxs("div",{className:"info-box lg:col-span-2",children:[d.jsx("p",{className:"text-xl font-medium text-slate-600 sm:text-[18px]",children:"Updated"}),d.jsx("p",{className:"mt-1 text-2xl font-extrabold text-slate-900 sm:text-[22px]",children:t.updatedAt?LT(new Date(t.updatedAt)):"No events yet"})]})]}),d.jsx("p",{className:"mt-6 text-lg font-medium text-slate-700",children:e?t.message||"Tracker has detected an issue.":"No active tracker alert."})]})}function HT({onOpenModal:t}){return d.jsxs("section",{className:"card-shell border-[#f4b5b5] bg-[#ffd6d6] p-5 shadow-card sm:p-6 lg:p-8",children:[d.jsx("h2",{className:"text-3xl font-extrabold text-[#a50f0f] sm:text-4xl",children:"Need Immediate Attention?"}),d.jsx("p",{className:"mt-3 text-xl font-medium text-[#bf4f4f] sm:text-[18px]",children:"Connecting you directly with emergency services and local responders."}),d.jsxs("button",{type:"button",onClick:t,className:"mt-8 inline-flex min-h-[88px] w-full items-center justify-center gap-3 rounded-full bg-[#c91818] px-8 text-2xl font-semibold text-white transition hover:bg-[#b11212]",children:[d.jsx(Zg,{className:"h-7 w-7"}),"Send Emergency Alert"]})]})}const VT=DT("#1d5bd8","#f0d1c3","#5ca2ff"),Fr={language:"English",appearance:"Light",timeFormat:"24-hour",notifications:{medicationReminders:!0,routineReminders:!0,trackerAlerts:!0,emergencyAlerts:!0,weeklySummary:!1}},ln={name:"Hy Nguyen",role:"Family caregiver",email:"hy@example.com"};function Fp(t){return{...Fr,...t,notifications:{...Fr.notifications,...t==null?void 0:t.notifications}}}function $T(){const[t,e]=M.useState("home"),[n,r]=M.useState("root"),[i,s]=M.useState(Mo),[o,l]=M.useState({name:"Ngoai",displayName:"Mom (Eleanor)",caregiverGreeting:"Good morning, Sarah",status:"in_home",locationLabel:"In Home",lastSeenAt:Date.now()-2*60*1e3,vitals:{status:"No data",heartRateBpm:null}}),[a,c]=M.useState({online:!1,name:"Living Room Kiosk",lastHeartbeatAt:null,volumeForced:!1}),[u,h]=M.useState({is_active:!1,type:null,source:"Tracker",message:null,severity:"normal",updatedAt:null,safeZoneStatus:"inside"}),[f,g]=M.useState([]),[y,v]=M.useState(null),[A,m]=M.useState(!1),[p,_]=M.useState(!1),[w,x]=M.useState(Fr),[I,T]=M.useState(null),[N,J]=M.useState(!0),[L,Ve]=M.useState(!1),[bt,en]=M.useState(null),[Qs,Ys]=M.useState(ln.name),[wi,yr]=M.useState(ln.role),[C,b]=M.useState(ln.email),O=M.useRef(JSON.stringify(Fr));M.useEffect(()=>{if(!y)return;const D=window.setTimeout(()=>v(null),2600);return()=>window.clearTimeout(D)},[y]),M.useEffect(()=>{let D=()=>{};const G=TT(async K=>{if(D(),T(K),J(!0),!K){en(null),s(Mo),Ys(ln.name),yr(ln.role),b(ln.email),x(Fr),O.current=JSON.stringify(Fr),Ve(!0),J(!1);return}const pe=await AT(K.uid).catch(()=>null);if(pe){const Pe=Fp(pe.preferences);x(Pe),O.current=JSON.stringify(Pe)}D=bT(K.uid,Pe=>{var tn;const q=Pe??pe,Wn=Fp(q==null?void 0:q.preferences);en(q),s((q==null?void 0:q.familyId)||Mo),Ys((q==null?void 0:q.name)||K.displayName||((tn=K.email)==null?void 0:tn.split("@")[0])||"Caregiver"),yr((q==null?void 0:q.role)||"Family caregiver"),b((q==null?void 0:q.email)||K.email||"No email"),x(Wn),O.current=JSON.stringify(Wn),Ve(!0),J(!1)})});return()=>{D(),G()}},[]),M.useEffect(()=>{const D=yo(i,"elder",Pe=>{const q=Pe.val();q&&l(q)}),G=yo(i,"kiosk",Pe=>{const q=Pe.val();q&&c(Wn=>({...Wn,...q}))}),K=yo(i,"tracker_alert",Pe=>{const q=Pe.val();q&&h(q)}),pe=yo(i,"tasks",Pe=>{const q=Pe.val()||{},Wn=Object.entries(q).map(([tn,Le])=>({id:tn,name:Le.name||"Untitled task",time:Le.scheduled_time||"09:00",autoRun:!!Le.is_auto,status:Le.status||"Pending",note:YT(Le),updatedAt:Le.updatedAt||Le.completedAt||Le.triggeredAt||Le.lastTriggeredAt||void 0,mode:"view"}));Wn.sort((tn,Le)=>tn.time.localeCompare(Le.time)),g(tn=>Wn.map(Le=>{const fh=tn.find(_v=>_v.id===Le.id);return fh?{...Le,mode:fh.mode}:Le}))});return()=>{D(),G(),K(),pe()}},[i]),M.useEffect(()=>{if(!I||!L)return;const D=JSON.stringify(w);if(D===O.current)return;const G=window.setTimeout(()=>{OT(I.uid,{preferences:w,updatedAt:Date.now()}).then(()=>{O.current=D}).catch(K=>{console.error(K),ae("Could not sync preferences right now.")})},500);return()=>window.clearTimeout(G)},[I,w,L]);const re=M.useMemo(()=>[...f].filter(D=>D.updatedAt).sort((D,G)=>Number(G.updatedAt||0)-Number(D.updatedAt||0)),[f]),fe=(bt==null?void 0:bt.linkedFamilyMembers)||["Hy Nguyen","Minh Nguyen","Lan Tran"];function ae(D){v({id:Date.now(),message:D})}async function Ot(D){const G=f.find(K=>K.id===D);if(G)try{const{committed:K}=await IT(i,D,pe=>!pe||pe.status==="Running"?pe:{...pe,status:"Running",text:G.name,is_triggered:!0,triggeredAt:Date.now(),spokenAt:null,completedAt:null,updatedAt:Date.now(),triggerMode:"manual"});if(!K){ae(`Routine ${G.name} is already running.`);return}ae(`Sent "${G.name}" to the kiosk.`)}catch(K){console.error(K),ae(`Failed to trigger ${G.name}.`)}}function Ei(D,G,K){g(pe=>pe.map(Pe=>Pe.id===D?{...Pe,[G]:K}:Pe))}async function Dt(D){const G=f.find(K=>K.id===D);if(G){if(!G.name.trim()||!G.time){ae("Task name and time are required.");return}try{await ec(i,`tasks/${D}`,{name:G.name.trim(),text:G.name.trim(),scheduled_time:G.time,is_auto:G.autoRun,updatedAt:Date.now()}),g(K=>K.map(pe=>pe.id===D?{...pe,mode:"view"}:pe)),ae("Routine saved.")}catch(K){console.error(K),ae("Failed to save routine.")}}}function vr(D,G){g(K=>K.map(pe=>pe.id===D?{...pe,mode:G}:pe))}async function dv(){const D=`task_${String(Date.now()).slice(-6)}`;try{await ec(i,`tasks/${D}`,{name:`New routine ${f.length+1}`,scheduled_time:"09:00",is_auto:!1,status:"Pending",text:"",is_triggered:!1,createdAt:Date.now(),updatedAt:Date.now(),triggeredAt:null,spokenAt:null,completedAt:null,triggerMode:null}),ae("New routine added.")}catch(G){console.error(G),ae("Failed to add routine.")}}async function hv(){m(!1);try{await ec(i,"emergency",{is_triggered:!0,triggeredAt:Date.now(),message:"Ngoại ơi, con đang gọi. Xin hãy nhìn vào màn hình."}),ae("Emergency services contacted.")}catch(D){console.error(D),ae("Failed to contact emergency services.")}}function fv(D){e(D),D==="settings"&&r("root")}function pv(){if(!I){ae("There is no active caregiver session.");return}_(!0)}function mv(){_(!1),PT().then(()=>{r("root"),ae("Logged out successfully.")}).catch(D=>{console.error(D),ae("Failed to log out. Please try again.")})}function gv(){return t==="history"?d.jsx(BT,{historyItems:re,trackerAlert:u,pushToast:ae}):t==="settings"?d.jsx(GT,{page:n,settings:w,authUser:I,authLoading:N,profileName:Qs,profileRole:wi,profileEmail:C,linkedFamilyMembers:fe,kioskName:a.name||"Living Room Kiosk",kioskStatus:a.online?"Demo connected":"Offline in demo",onOpenPage:r,onBack:()=>r("root"),onUpdateSettings:x,onRequestLogout:pv,pushToast:ae}):d.jsx(FT,{elder:o,kiosk:a,routines:f,trackerAlert:u,onAddNew:()=>void dv(),onModeChange:vr,onFieldChange:Ei,onTrigger:D=>void Ot(D),onSave:D=>void Dt(D),onOpenEmergency:()=>m(!0)})}return d.jsxs("div",{className:"min-h-screen bg-shell text-slate-900",children:[d.jsxs("div",{className:"mx-auto w-full max-w-[1720px] px-4 pb-32 pt-4 sm:px-6 lg:px-8 lg:pt-6",children:[d.jsx(lE,{avatarSrc:VT,onBellClick:()=>ae("No new notifications.")}),d.jsx("main",{className:"space-y-8",children:gv()})]}),d.jsx(aE,{activeTab:t,onChange:fv}),y?d.jsx(cE,{message:y.message,onDismiss:()=>v(null)}):null,A?d.jsx(Tf,{title:"Send emergency alert?",body:"This will notify emergency services and local responders immediately.",confirmLabel:"Send Alert",onCancel:()=>m(!1),onConfirm:()=>void hv()}):null,p?d.jsx(Tf,{title:"Log out of caregiver account?",body:"This signs the caregiver out of Firebase Authentication and returns the app to guest demo mode.",confirmLabel:"Log Out",onCancel:()=>_(!1),onConfirm:mv}):null]})}function BT({historyItems:t,trackerAlert:e,pushToast:n}){return d.jsxs("section",{className:"space-y-6",children:[d.jsxs("div",{className:"card-shell p-6 sm:p-8",children:[d.jsx("p",{className:"text-lg font-semibold text-slate-600",children:"History"}),d.jsx("h1",{className:"mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl",children:"Review activity and care events"}),d.jsx("p",{className:"mt-4 max-w-3xl text-lg font-medium leading-8 text-slate-600",children:"This timeline gives caregivers a quick read of recent reminders, tracker changes, and kiosk-related events in the prototype."})]}),d.jsxs("div",{className:"grid gap-6 xl:grid-cols-[1.4fr_0.9fr]",children:[d.jsxs("section",{className:"card-shell p-5 sm:p-6 lg:p-8",children:[d.jsxs("div",{className:"flex items-center justify-between gap-4",children:[d.jsx("h2",{className:"text-3xl font-extrabold text-slate-900 sm:text-4xl",children:"Recent routines"}),d.jsx("button",{type:"button",onClick:()=>n("Export is not available in demo mode."),className:"text-lg font-bold text-brand transition hover:text-blue-700",children:"Export"})]}),d.jsx("div",{className:"mt-6 space-y-4",children:t.length===0?d.jsx("div",{className:"info-box",children:d.jsx("p",{className:"text-xl font-semibold text-slate-600",children:"No routine history yet."})}):t.slice(0,8).map(r=>d.jsx("div",{className:"rounded-[22px] border border-slate-200/80 bg-lavender px-5 py-4",children:d.jsxs("div",{className:"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",children:[d.jsxs("div",{children:[d.jsx("h3",{className:"text-2xl font-extrabold text-slate-900",children:r.name}),d.jsx("p",{className:"mt-1 text-base font-semibold text-slate-600",children:r.note})]}),d.jsxs("div",{className:"flex items-center gap-3",children:[d.jsx("span",{className:"pill-button bg-white text-slate-700",children:r.status}),d.jsx("span",{className:"text-lg font-bold text-brand",children:uv(r.time)})]})]})},r.id))})]}),d.jsxs("section",{className:"space-y-6",children:[d.jsxs("div",{className:"card-shell p-5 sm:p-6",children:[d.jsx("h2",{className:"text-3xl font-extrabold text-slate-900",children:"Tracker summary"}),d.jsx("p",{className:"mt-3 text-lg font-medium text-slate-600",children:"Latest tracker alert status is shown here for quick review."}),d.jsxs("div",{className:"mt-5 rounded-[22px] bg-lavender p-5",children:[d.jsx("p",{className:"text-sm font-bold uppercase tracking-[0.24em] text-slate-500",children:"Current state"}),d.jsx("p",{className:"mt-3 text-2xl font-extrabold text-slate-900",children:e.is_active?"Alert active":"No active alert"}),d.jsx("p",{className:"mt-2 text-base font-semibold text-slate-600",children:e.message||"The tracker has not reported a new issue."})]})]}),d.jsxs("div",{className:"card-shell p-5 sm:p-6",children:[d.jsx("h2",{className:"text-3xl font-extrabold text-slate-900",children:"Kiosk notes"}),d.jsx("div",{className:"mt-5 space-y-4",children:["Living Room Kiosk connected in demo mode","Tracker stream synced recently","Voice reminder support is active on the kiosk prototype"].map(r=>d.jsxs("div",{className:"flex items-start gap-3 rounded-[20px] bg-lavender p-4",children:[d.jsx(_d,{className:"mt-0.5 h-5 w-5 text-active"}),d.jsx("p",{className:"text-base font-semibold text-slate-700",children:r})]},r))})]})]})]})]})}function GT({page:t,settings:e,authUser:n,authLoading:r,profileName:i,profileRole:s,profileEmail:o,linkedFamilyMembers:l,kioskName:a,kioskStatus:c,onOpenPage:u,onBack:h,onUpdateSettings:f,onRequestLogout:g,pushToast:y}){if(t!=="root")return d.jsx(KT,{page:t,settings:e,authUser:n,profileName:i,profileRole:s,profileEmail:o,linkedFamilyMembers:l,onBack:h,onUpdateSettings:f,pushToast:y});const v=Object.values(e.notifications).filter(Boolean).length;return d.jsxs("section",{className:"space-y-6",children:[d.jsx("div",{className:"card-shell overflow-hidden p-0",children:d.jsxs("div",{className:"bg-[radial-gradient(circle_at_top_left,_rgba(139,108,255,0.16),_transparent_34%),linear-gradient(135deg,#ffffff_0%,#f4efff_100%)] px-6 py-7 sm:px-8 sm:py-8",children:[d.jsx("div",{className:"inline-flex rounded-full bg-active/10 px-4 py-2 text-sm font-extrabold uppercase tracking-[0.22em] text-[#5a34cf]",children:"Settings"}),d.jsx("h1",{className:"mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl",children:"Settings"}),d.jsx("p",{className:"mt-3 max-w-3xl text-lg font-medium leading-8 text-slate-600",children:"Manage your account, kiosk, alerts, and app preferences."})]})}),d.jsxs("div",{className:"grid gap-6 xl:grid-cols-[1.08fr_1fr]",children:[d.jsxs("div",{className:"space-y-6",children:[d.jsx(qT,{onViewProfile:()=>u("profile"),isLoggedIn:!!n,name:i,role:s,email:o}),r?d.jsx("div",{className:"rounded-[20px] bg-lavender px-5 py-4 text-base font-semibold text-slate-600",children:"Checking caregiver session..."}):null,d.jsxs(Di,{title:"Account",children:[d.jsx(ce,{icon:Jc,title:"Profile",subtitle:"View caregiver details",onClick:()=>u("profile")}),d.jsx(ce,{icon:eE,title:"Login / Sign up",subtitle:n?`Signed in as ${o}`:"Open caregiver authentication",onClick:()=>u("login")}),d.jsx(ce,{icon:If,title:"Linked family members",subtitle:`${l.length} connected in this household`,onClick:()=>u("linked-family")}),d.jsx(ce,{icon:tE,title:"Log out",subtitle:n?"Sign out of the current caregiver account":"No active session",onClick:g})]}),d.jsxs(Di,{title:"Kiosk",children:[d.jsx(ce,{icon:Z0,title:"Home kiosk connection",subtitle:`Connected to ${a}`,onClick:()=>u("kiosk-connection")}),d.jsx(ce,{icon:Cf,title:"Kiosk display name",subtitle:a,onClick:()=>y("Renaming the kiosk is not available in demo mode.")}),d.jsx(ce,{icon:Cf,title:"Pair new kiosk",subtitle:"Connect another in-home screen",onClick:()=>y("Kiosk pairing is not available in demo mode.")}),d.jsx(ce,{icon:_d,title:"Kiosk status",subtitle:c,onClick:()=>y(`Kiosk status: ${c}.`)})]}),d.jsxs(Di,{title:"Care settings",children:[d.jsx(ce,{icon:Jc,title:"Elderly profile",subtitle:"Demo care recipient profile",onClick:()=>u("elderly-profile")}),d.jsx(ce,{icon:If,title:"Emergency contacts",subtitle:"2 emergency contacts saved",onClick:()=>u("emergency-contacts")}),d.jsx(ce,{icon:ll,title:"Reminder defaults",subtitle:"Medication and routine preferences",onClick:()=>u("reminder-defaults")}),d.jsx(ce,{icon:Xg,title:"Tracker settings",subtitle:"Wearable and movement alerts",onClick:()=>u("tracker-settings")}),d.jsx(ce,{icon:nE,title:"Geofence settings",subtitle:"Home safe zone demo controls",onClick:()=>u("geofence-settings")})]})]}),d.jsxs("div",{className:"space-y-6",children:[d.jsxs(Di,{title:"Preferences",children:[d.jsx(ce,{icon:X0,title:"Language",subtitle:e.language,onClick:()=>u("language")}),d.jsx(ce,{icon:rE,title:"Appearance",subtitle:e.appearance,onClick:()=>u("appearance")}),d.jsx(ce,{icon:Xc,title:"Notifications",subtitle:`${v} enabled`,onClick:()=>u("notifications")}),d.jsx(ce,{icon:ll,title:"Time format",subtitle:e.timeFormat,onClick:()=>u("time-format")})]}),d.jsxs(Di,{title:"Support",children:[d.jsx(ce,{icon:Ua,title:"Help Centre",subtitle:"FAQs and setup guidance",onClick:()=>u("help-centre")}),d.jsx(ce,{icon:Xc,title:"Contact support",subtitle:"Demo support page",onClick:()=>u("contact-support")}),d.jsx(ce,{icon:Ua,title:"About Remember.For.Me",subtitle:"Version 1.0.0-demo",onClick:()=>u("about")}),d.jsx(ce,{icon:Zg,title:"Privacy Policy",subtitle:"Demo placeholder",onClick:()=>u("privacy")}),d.jsx(ce,{icon:Ua,title:"Terms of Service",subtitle:"Demo placeholder",onClick:()=>u("terms")})]})]})]})]})}function KT({page:t,settings:e,authUser:n,profileName:r,profileRole:i,profileEmail:s,linkedFamilyMembers:o,onBack:l,onUpdateSettings:a,pushToast:c}){const u={profile:{title:"Profile",subtitle:n?"Authenticated caregiver profile":"Guest caregiver profile",body:d.jsxs("div",{className:"space-y-4",children:[d.jsxs("div",{className:"rounded-[22px] bg-lavender p-5",children:[d.jsx("p",{className:"text-sm font-extrabold uppercase tracking-[0.22em] text-[#5a34cf]",children:"Caregiver"}),d.jsx("h3",{className:"mt-3 text-3xl font-extrabold text-slate-900",children:r}),d.jsx("p",{className:"mt-2 text-lg font-semibold text-slate-600",children:i}),d.jsx("p",{className:"mt-1 text-base font-semibold text-slate-500",children:s})]}),d.jsx("div",{className:"rounded-[22px] border border-slate-200/80 bg-white p-5",children:d.jsx("p",{className:"text-base leading-8 text-slate-700",children:n?"This caregiver profile is being read from Firebase Realtime Database and can be extended later with editable fields, avatar upload, and permissions.":"You are viewing guest demo data. Sign in to bind the caregiver profile to a real Firebase Auth account."})})]})},"linked-family":{title:"Linked family members",subtitle:"Care circle for this demo household",body:d.jsx("div",{className:"space-y-3",children:o.map(f=>d.jsx("div",{className:"rounded-[20px] bg-lavender px-5 py-4",children:d.jsx("p",{className:"text-lg font-extrabold text-slate-900",children:f})},f))})},"kiosk-connection":{title:"Home kiosk connection",subtitle:"Living Room Kiosk",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"The caregiver app is linked to a demo kiosk stream. Real kiosk pairing, presence verification, and device reassignment can plug in here later."})},"elderly-profile":{title:"Elderly profile",subtitle:"Demo care recipient details",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"This page will later show personal care preferences, mobility notes, reminder tone preferences, and daily routines shared with the kiosk."})},"emergency-contacts":{title:"Emergency contacts",subtitle:"Demo contact list",body:d.jsx("div",{className:"space-y-3",children:["Anna Nguyen - Daughter","Mr. Minh Tran - Neighbor"].map(f=>d.jsx("div",{className:"rounded-[20px] bg-lavender px-5 py-4",children:d.jsx("p",{className:"text-lg font-extrabold text-slate-900",children:f})},f))})},"reminder-defaults":{title:"Reminder defaults",subtitle:"Demo reminder preferences",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"Default reminder timing, follow-up intervals, and voice prompt behavior will eventually be configured here for both caregiver and kiosk surfaces."})},"tracker-settings":{title:"Tracker settings",subtitle:"Demo wearable preferences",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"Tracker settings will later control wearable syncing, inactivity thresholds, and care alerts. No real hardware configuration is active in this demo."})},"geofence-settings":{title:"Geofence settings",subtitle:"Demo safe zone preferences",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"Safe zone boundaries and exit alerts are mocked in this prototype. Location rules and maps will be powered by real services later."})},"help-centre":{title:"Help Centre",subtitle:"Demo support content",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"This placeholder page can later contain onboarding help, caregiver FAQs, device setup instructions, and kiosk troubleshooting guidance."})},"contact-support":{title:"Contact support",subtitle:"Demo contact page",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"Support messaging is not connected in demo mode. In production, this page would offer live chat, email, and issue reporting for caregivers."})},about:{title:"About Remember.For.Me",subtitle:"Version 1.0.0-demo",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"Remember.For.Me is a caregiver plus home kiosk concept for elderly care. This build is a demo prototype with real Firebase authentication and family-scoped demo data wiring."})},privacy:{title:"Privacy Policy",subtitle:"Demo placeholder",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"This is demo legal content only. A full privacy policy would explain how caregiver, kiosk, and elderly care data are stored and protected."})},terms:{title:"Terms of Service",subtitle:"Demo placeholder",body:d.jsx("p",{className:"text-lg font-medium leading-8 text-slate-700",children:"This prototype page stands in for the final service terms. No real user contract, payment flow, or backend agreement is active yet."})}};if(t==="login")return d.jsx(Sr,{title:"Login / Sign up",subtitle:"Authenticate caregivers with Firebase email and password",onBack:l,children:d.jsx(QT,{authUser:n,profileName:r,profileEmail:s,pushToast:c})});if(t==="language")return d.jsx(Sr,{title:"Language",subtitle:"Choose a display language for the caregiver app",onBack:l,children:d.jsx(rc,{items:["English","Vietnamese","Chinese"],selected:e.language,onSelect:f=>a(g=>({...g,language:f}))})});if(t==="appearance")return d.jsx(Sr,{title:"Appearance",subtitle:"Choose how the app should look",onBack:l,children:d.jsx(rc,{items:["Light","Dark","System"],selected:e.appearance,onSelect:f=>a(g=>({...g,appearance:f}))})});if(t==="time-format")return d.jsx(Sr,{title:"Time format",subtitle:"Choose how time is displayed",onBack:l,children:d.jsx(rc,{items:["12-hour","24-hour"],selected:e.timeFormat,onSelect:f=>a(g=>({...g,timeFormat:f}))})});if(t==="notifications"){const f=[["medicationReminders","Medication reminders"],["routineReminders","Routine reminders"],["trackerAlerts","Tracker alerts"],["emergencyAlerts","Emergency alerts"],["weeklySummary","Weekly summary"]];return d.jsx(Sr,{title:"Notifications",subtitle:"Control which caregiver alerts stay enabled",onBack:l,children:d.jsx("div",{className:"card-shell p-4 sm:p-5",children:d.jsx("div",{className:"divide-y divide-slate-200/80",children:f.map(([g,y])=>d.jsxs("div",{className:"flex items-center justify-between gap-4 px-2 py-4 sm:px-3",children:[d.jsxs("div",{children:[d.jsx("h3",{className:"text-xl font-extrabold text-slate-900",children:y}),d.jsx("p",{className:"mt-1 text-sm font-semibold text-slate-500",children:e.notifications[g]?"Enabled":"Disabled"})]}),d.jsx("button",{type:"button",onClick:()=>a(v=>({...v,notifications:{...v.notifications,[g]:!v.notifications[g]}})),className:`relative inline-flex h-8 w-16 items-center rounded-full transition ${e.notifications[g]?"bg-active":"bg-slate-300"}`,"aria-label":y,children:d.jsx("span",{className:`inline-block h-6 w-6 transform rounded-full bg-white transition ${e.notifications[g]?"translate-x-9":"translate-x-1"}`})})]},g))})})})}const h=u[t];return d.jsx(Sr,{title:h.title,subtitle:h.subtitle,onBack:l,children:d.jsx("div",{className:"card-shell p-6 sm:p-8",children:h.body})})}function Sr({title:t,subtitle:e,onBack:n,children:r}){return d.jsxs("section",{className:"space-y-6",children:[d.jsxs("div",{className:"card-shell p-6 sm:p-8",children:[d.jsxs("button",{type:"button",onClick:n,className:"inline-flex items-center gap-2 rounded-full bg-lavender px-4 py-2 text-sm font-extrabold uppercase tracking-[0.22em] text-[#5a34cf] transition hover:bg-[#e4ddff]",children:[d.jsx(Y0,{className:"h-4 w-4"}),"Back"]}),d.jsx("h1",{className:"mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl",children:t}),d.jsx("p",{className:"mt-3 max-w-3xl text-lg font-medium leading-8 text-slate-600",children:e})]}),r]})}function qT({onViewProfile:t,isLoggedIn:e,name:n,role:r,email:i}){return d.jsx("section",{className:"card-shell p-6 sm:p-8",children:d.jsxs("div",{className:"flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",children:[d.jsxs("div",{className:"flex items-center gap-5",children:[d.jsx("div",{className:"flex h-20 w-20 items-center justify-center rounded-[24px] bg-active/10",children:d.jsx(Jc,{className:"h-10 w-10 text-active"})}),d.jsxs("div",{children:[d.jsx("h2",{className:"text-3xl font-extrabold text-slate-900",children:n}),d.jsx("p",{className:"mt-1 text-lg font-semibold text-slate-600",children:r}),d.jsx("p",{className:"mt-1 text-base font-semibold text-slate-500",children:i})]})]}),d.jsxs("div",{className:"space-y-3 sm:text-right",children:[d.jsx("div",{className:`inline-flex rounded-full px-4 py-2 text-sm font-extrabold uppercase tracking-[0.22em] ${e?"bg-[#e9f6eb] text-action":"bg-[#f3ecff] text-[#5a34cf]"}`,children:e?"Signed in":"Guest mode"}),d.jsx("div",{children:d.jsxs("button",{type:"button",onClick:t,className:"inline-flex items-center gap-2 rounded-full bg-active px-5 py-3 text-lg font-bold text-white transition hover:bg-[#7a5df0]",children:["View profile",d.jsx(gd,{className:"h-5 w-5"})]})})]})]})})}function QT({authUser:t,profileName:e,profileEmail:n,pushToast:r}){const[i,s]=M.useState("login"),[o,l]=M.useState(e===ln.name?"":e),[a,c]=M.useState((t==null?void 0:t.email)||n||""),[u,h]=M.useState(""),[f,g]=M.useState(!1);M.useEffect(()=>{c((t==null?void 0:t.email)||n||""),t&&e!==ln.name&&l(e)},[t,n,e]);async function y(){if(!a.trim()||!u.trim()){r("Email and password are required.");return}if(i==="signup"&&!o.trim()){r("Display name is required for sign up.");return}g(!0);try{i==="login"?(await NT(a.trim(),u),r("Signed in successfully.")):(await RT(a.trim(),u,o.trim()),r("Account created and signed in.")),h("")}catch(v){console.error(v),r((v==null?void 0:v.message)||"Authentication failed.")}finally{g(!1)}}return t?d.jsx("div",{className:"card-shell p-6 sm:p-8",children:d.jsxs("div",{className:"rounded-[22px] bg-lavender p-5",children:[d.jsx("p",{className:"text-sm font-extrabold uppercase tracking-[0.22em] text-[#5a34cf]",children:"Active session"}),d.jsx("h3",{className:"mt-3 text-3xl font-extrabold text-slate-900",children:e}),d.jsx("p",{className:"mt-2 text-lg font-semibold text-slate-600",children:n}),d.jsx("p",{className:"mt-2 text-base font-medium leading-7 text-slate-600",children:"This caregiver is authenticated with Firebase. Use the Log out row in Settings to end the current session."})]})}):d.jsxs("div",{className:"card-shell p-6 sm:p-8",children:[d.jsx("div",{className:"inline-flex rounded-full bg-lavender p-1",children:["login","signup"].map(v=>{const A=i===v;return d.jsx("button",{type:"button",onClick:()=>s(v),className:`rounded-full px-5 py-2 text-sm font-extrabold uppercase tracking-[0.16em] transition ${A?"bg-white text-brand shadow-sm":"text-slate-500"}`,children:v==="login"?"Login":"Sign up"},v)})}),d.jsxs("div",{className:"mt-6 space-y-4",children:[i==="signup"?d.jsxs("label",{className:"block space-y-2",children:[d.jsx("span",{className:"text-sm font-bold uppercase tracking-[0.16em] text-slate-500",children:"Display name"}),d.jsx("input",{value:o,onChange:v=>l(v.target.value),className:"h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none",placeholder:"Hy Nguyen"})]}):null,d.jsxs("label",{className:"block space-y-2",children:[d.jsx("span",{className:"text-sm font-bold uppercase tracking-[0.16em] text-slate-500",children:"Email"}),d.jsx("input",{value:a,onChange:v=>c(v.target.value),className:"h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none",placeholder:"hy@example.com",type:"email"})]}),d.jsxs("label",{className:"block space-y-2",children:[d.jsx("span",{className:"text-sm font-bold uppercase tracking-[0.16em] text-slate-500",children:"Password"}),d.jsx("input",{value:u,onChange:v=>h(v.target.value),className:"h-16 w-full rounded-[18px] bg-lavender px-5 text-lg font-medium text-slate-800 outline-none",placeholder:"At least 6 characters",type:"password"})]})]}),d.jsx("button",{type:"button",onClick:()=>void y(),disabled:f,className:"mt-6 inline-flex min-h-[68px] w-full items-center justify-center rounded-[20px] bg-active px-6 text-xl font-bold text-white transition hover:bg-[#7a5df0] disabled:cursor-not-allowed disabled:opacity-60",children:f?"Please wait...":i==="login"?"Log in":"Create account"})]})}function Di({title:t,children:e}){return d.jsxs("section",{className:"card-shell p-5 sm:p-6",children:[d.jsx("h2",{className:"text-3xl font-extrabold text-slate-900",children:t}),d.jsx("div",{className:"mt-4 divide-y divide-slate-200/80",children:e})]})}function ce({icon:t,title:e,subtitle:n,onClick:r}){return d.jsxs("button",{type:"button",onClick:r,className:"flex w-full items-center gap-4 px-1 py-4 text-left transition hover:opacity-90",children:[d.jsx("span",{className:"inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-active/10 text-active",children:d.jsx(t,{className:"h-6 w-6"})}),d.jsxs("span",{className:"min-w-0 flex-1",children:[d.jsx("span",{className:"block text-lg font-extrabold text-slate-900",children:e}),n?d.jsx("span",{className:"mt-1 block text-sm font-semibold leading-6 text-slate-500",children:n}):null]}),d.jsx(gd,{className:"h-5 w-5 shrink-0 text-slate-400"})]})}function rc({items:t,selected:e,onSelect:n}){return d.jsx("div",{className:"card-shell p-4 sm:p-5",children:d.jsx("div",{className:"divide-y divide-slate-200/80",children:t.map(r=>d.jsxs("button",{type:"button",onClick:()=>n(r),className:"flex w-full items-center justify-between gap-4 px-2 py-4 text-left",children:[d.jsx("span",{className:"text-xl font-extrabold text-slate-900",children:r}),r===e?d.jsx("span",{className:"inline-flex h-9 w-9 items-center justify-center rounded-full bg-active text-white",children:d.jsx(Q0,{className:"h-5 w-5"})}):d.jsx(gd,{className:"h-5 w-5 text-slate-400"})]},r))})})}function YT(t){const e=t.triggeredAt||t.lastTriggeredAt;return t.status==="Running"&&e?`Started at ${new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(e))}`:t.status==="Completed"&&t.completedAt?`Completed at ${new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}).format(new Date(t.completedAt))}`:t.is_auto?"Auto mode enabled":"Manual mode only"}ic.createRoot(document.getElementById("root")).render(d.jsx(Dv.StrictMode,{children:d.jsx($T,{})}));
