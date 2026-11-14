var D_=Object.defineProperty;var N_=(t,e,n)=>e in t?D_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ge=(t,e,n)=>N_(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function U_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Ng={exports:{}},wc={},Ug={exports:{}},Ke={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wo=Symbol.for("react.element"),O_=Symbol.for("react.portal"),F_=Symbol.for("react.fragment"),k_=Symbol.for("react.strict_mode"),B_=Symbol.for("react.profiler"),z_=Symbol.for("react.provider"),G_=Symbol.for("react.context"),H_=Symbol.for("react.forward_ref"),V_=Symbol.for("react.suspense"),W_=Symbol.for("react.memo"),j_=Symbol.for("react.lazy"),ip=Symbol.iterator;function X_(t){return t===null||typeof t!="object"?null:(t=ip&&t[ip]||t["@@iterator"],typeof t=="function"?t:null)}var Og={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Fg=Object.assign,kg={};function fa(t,e,n){this.props=t,this.context=e,this.refs=kg,this.updater=n||Og}fa.prototype.isReactComponent={};fa.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};fa.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Bg(){}Bg.prototype=fa.prototype;function Xf(t,e,n){this.props=t,this.context=e,this.refs=kg,this.updater=n||Og}var $f=Xf.prototype=new Bg;$f.constructor=Xf;Fg($f,fa.prototype);$f.isPureReactComponent=!0;var rp=Array.isArray,zg=Object.prototype.hasOwnProperty,qf={current:null},Gg={key:!0,ref:!0,__self:!0,__source:!0};function Hg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)zg.call(e,i)&&!Gg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:wo,type:t,key:s,ref:a,props:r,_owner:qf.current}}function $_(t,e){return{$$typeof:wo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Yf(t){return typeof t=="object"&&t!==null&&t.$$typeof===wo}function q_(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var sp=/\/+/g;function eu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?q_(""+t.key):e.toString(36)}function bl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case wo:case O_:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+eu(a,0):i,rp(r)?(n="",t!=null&&(n=t.replace(sp,"$&/")+"/"),bl(r,e,n,"",function(c){return c})):r!=null&&(Yf(r)&&(r=$_(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(sp,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",rp(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+eu(s,o);a+=bl(s,e,n,l,r)}else if(l=X_(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+eu(s,o++),a+=bl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function ko(t,e,n){if(t==null)return t;var i=[],r=0;return bl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Y_(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var vn={current:null},Cl={transition:null},K_={ReactCurrentDispatcher:vn,ReactCurrentBatchConfig:Cl,ReactCurrentOwner:qf};function Vg(){throw Error("act(...) is not supported in production builds of React.")}Ke.Children={map:ko,forEach:function(t,e,n){ko(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ko(t,function(){e++}),e},toArray:function(t){return ko(t,function(e){return e})||[]},only:function(t){if(!Yf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ke.Component=fa;Ke.Fragment=F_;Ke.Profiler=B_;Ke.PureComponent=Xf;Ke.StrictMode=k_;Ke.Suspense=V_;Ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=K_;Ke.act=Vg;Ke.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Fg({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=qf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)zg.call(e,l)&&!Gg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:wo,type:t.type,key:r,ref:s,props:i,_owner:a}};Ke.createContext=function(t){return t={$$typeof:G_,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:z_,_context:t},t.Consumer=t};Ke.createElement=Hg;Ke.createFactory=function(t){var e=Hg.bind(null,t);return e.type=t,e};Ke.createRef=function(){return{current:null}};Ke.forwardRef=function(t){return{$$typeof:H_,render:t}};Ke.isValidElement=Yf;Ke.lazy=function(t){return{$$typeof:j_,_payload:{_status:-1,_result:t},_init:Y_}};Ke.memo=function(t,e){return{$$typeof:W_,type:t,compare:e===void 0?null:e}};Ke.startTransition=function(t){var e=Cl.transition;Cl.transition={};try{t()}finally{Cl.transition=e}};Ke.unstable_act=Vg;Ke.useCallback=function(t,e){return vn.current.useCallback(t,e)};Ke.useContext=function(t){return vn.current.useContext(t)};Ke.useDebugValue=function(){};Ke.useDeferredValue=function(t){return vn.current.useDeferredValue(t)};Ke.useEffect=function(t,e){return vn.current.useEffect(t,e)};Ke.useId=function(){return vn.current.useId()};Ke.useImperativeHandle=function(t,e,n){return vn.current.useImperativeHandle(t,e,n)};Ke.useInsertionEffect=function(t,e){return vn.current.useInsertionEffect(t,e)};Ke.useLayoutEffect=function(t,e){return vn.current.useLayoutEffect(t,e)};Ke.useMemo=function(t,e){return vn.current.useMemo(t,e)};Ke.useReducer=function(t,e,n){return vn.current.useReducer(t,e,n)};Ke.useRef=function(t){return vn.current.useRef(t)};Ke.useState=function(t){return vn.current.useState(t)};Ke.useSyncExternalStore=function(t,e,n){return vn.current.useSyncExternalStore(t,e,n)};Ke.useTransition=function(){return vn.current.useTransition()};Ke.version="18.3.1";Ug.exports=Ke;var jn=Ug.exports;const Rl=U_(jn);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Z_=jn,Q_=Symbol.for("react.element"),J_=Symbol.for("react.fragment"),eM=Object.prototype.hasOwnProperty,tM=Z_.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,nM={key:!0,ref:!0,__self:!0,__source:!0};function Wg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)eM.call(e,i)&&!nM.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Q_,type:t,key:s,ref:a,props:r,_owner:tM.current}}wc.Fragment=J_;wc.jsx=Wg;wc.jsxs=Wg;Ng.exports=wc;var I=Ng.exports,ld={},jg={exports:{}},zn={},Xg={exports:{}},$g={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,Q){var J=D.length;D.push(Q);e:for(;0<J;){var $=J-1>>>1,N=D[$];if(0<r(N,Q))D[$]=Q,D[J]=N,J=$;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var Q=D[0],J=D.pop();if(J!==Q){D[0]=J;e:for(var $=0,N=D.length,ce=N>>>1;$<ce;){var G=2*($+1)-1,X=D[G],le=G+1,ne=D[le];if(0>r(X,J))le<N&&0>r(ne,X)?(D[$]=ne,D[le]=J,$=le):(D[$]=X,D[G]=J,$=G);else if(le<N&&0>r(ne,J))D[$]=ne,D[le]=J,$=le;else break e}}return Q}function r(D,Q){var J=D.sortIndex-Q.sortIndex;return J!==0?J:D.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],u=1,f=null,h=3,p=!1,_=!1,g=!1,m=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function M(D){for(var Q=n(c);Q!==null;){if(Q.callback===null)i(c);else if(Q.startTime<=D)i(c),Q.sortIndex=Q.expirationTime,e(l,Q);else break;Q=n(c)}}function y(D){if(g=!1,M(D),!_)if(n(l)!==null)_=!0,z(C);else{var Q=n(c);Q!==null&&K(y,Q.startTime-D)}}function C(D,Q){_=!1,g&&(g=!1,d(b),b=-1),p=!0;var J=h;try{for(M(Q),f=n(l);f!==null&&(!(f.expirationTime>Q)||D&&!P());){var $=f.callback;if(typeof $=="function"){f.callback=null,h=f.priorityLevel;var N=$(f.expirationTime<=Q);Q=t.unstable_now(),typeof N=="function"?f.callback=N:f===n(l)&&i(l),M(Q)}else i(l);f=n(l)}if(f!==null)var ce=!0;else{var G=n(c);G!==null&&K(y,G.startTime-Q),ce=!1}return ce}finally{f=null,h=J,p=!1}}var w=!1,A=null,b=-1,E=5,x=-1;function P(){return!(t.unstable_now()-x<E)}function B(){if(A!==null){var D=t.unstable_now();x=D;var Q=!0;try{Q=A(!0,D)}finally{Q?H():(w=!1,A=null)}}else w=!1}var H;if(typeof v=="function")H=function(){v(B)};else if(typeof MessageChannel<"u"){var Y=new MessageChannel,V=Y.port2;Y.port1.onmessage=B,H=function(){V.postMessage(null)}}else H=function(){m(B,0)};function z(D){A=D,w||(w=!0,H())}function K(D,Q){b=m(function(){D(t.unstable_now())},Q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,z(C))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(h){case 1:case 2:case 3:var Q=3;break;default:Q=h}var J=h;h=Q;try{return D()}finally{h=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,Q){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var J=h;h=D;try{return Q()}finally{h=J}},t.unstable_scheduleCallback=function(D,Q,J){var $=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?$+J:$):J=$,D){case 1:var N=-1;break;case 2:N=250;break;case 5:N=1073741823;break;case 4:N=1e4;break;default:N=5e3}return N=J+N,D={id:u++,callback:Q,priorityLevel:D,startTime:J,expirationTime:N,sortIndex:-1},J>$?(D.sortIndex=J,e(c,D),n(l)===null&&D===n(c)&&(g?(d(b),b=-1):g=!0,K(y,J-$))):(D.sortIndex=N,e(l,D),_||p||(_=!0,z(C))),D},t.unstable_shouldYield=P,t.unstable_wrapCallback=function(D){var Q=h;return function(){var J=h;h=Q;try{return D.apply(this,arguments)}finally{h=J}}}})($g);Xg.exports=$g;var iM=Xg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rM=jn,Bn=iM;function ae(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var qg=new Set,no={};function ss(t,e){Qs(t,e),Qs(t+"Capture",e)}function Qs(t,e){for(no[t]=e,t=0;t<e.length;t++)qg.add(e[t])}var Hi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),cd=Object.prototype.hasOwnProperty,sM=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ap={},op={};function aM(t){return cd.call(op,t)?!0:cd.call(ap,t)?!1:sM.test(t)?op[t]=!0:(ap[t]=!0,!1)}function oM(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function lM(t,e,n,i){if(e===null||typeof e>"u"||oM(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function _n(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var tn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tn[t]=new _n(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tn[e]=new _n(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tn[t]=new _n(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tn[t]=new _n(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tn[t]=new _n(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tn[t]=new _n(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tn[t]=new _n(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tn[t]=new _n(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tn[t]=new _n(t,5,!1,t.toLowerCase(),null,!1,!1)});var Kf=/[\-:]([a-z])/g;function Zf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Kf,Zf);tn[e]=new _n(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Kf,Zf);tn[e]=new _n(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Kf,Zf);tn[e]=new _n(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tn[t]=new _n(t,1,!1,t.toLowerCase(),null,!1,!1)});tn.xlinkHref=new _n("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tn[t]=new _n(t,1,!1,t.toLowerCase(),null,!0,!0)});function Qf(t,e,n,i){var r=tn.hasOwnProperty(e)?tn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(lM(e,n,r,i)&&(n=null),i||r===null?aM(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Yi=rM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Bo=Symbol.for("react.element"),ws=Symbol.for("react.portal"),Ts=Symbol.for("react.fragment"),Jf=Symbol.for("react.strict_mode"),ud=Symbol.for("react.profiler"),Yg=Symbol.for("react.provider"),Kg=Symbol.for("react.context"),eh=Symbol.for("react.forward_ref"),dd=Symbol.for("react.suspense"),fd=Symbol.for("react.suspense_list"),th=Symbol.for("react.memo"),ar=Symbol.for("react.lazy"),Zg=Symbol.for("react.offscreen"),lp=Symbol.iterator;function Sa(t){return t===null||typeof t!="object"?null:(t=lp&&t[lp]||t["@@iterator"],typeof t=="function"?t:null)}var It=Object.assign,tu;function Ba(t){if(tu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);tu=e&&e[1]||""}return`
`+tu+t}var nu=!1;function iu(t,e){if(!t||nu)return"";nu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{nu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?Ba(t):""}function cM(t){switch(t.tag){case 5:return Ba(t.type);case 16:return Ba("Lazy");case 13:return Ba("Suspense");case 19:return Ba("SuspenseList");case 0:case 2:case 15:return t=iu(t.type,!1),t;case 11:return t=iu(t.type.render,!1),t;case 1:return t=iu(t.type,!0),t;default:return""}}function hd(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ts:return"Fragment";case ws:return"Portal";case ud:return"Profiler";case Jf:return"StrictMode";case dd:return"Suspense";case fd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Kg:return(t.displayName||"Context")+".Consumer";case Yg:return(t._context.displayName||"Context")+".Provider";case eh:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case th:return e=t.displayName||null,e!==null?e:hd(t.type)||"Memo";case ar:e=t._payload,t=t._init;try{return hd(t(e))}catch{}}return null}function uM(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return hd(e);case 8:return e===Jf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Tr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Qg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function dM(t){var e=Qg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function zo(t){t._valueTracker||(t._valueTracker=dM(t))}function Jg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Qg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Xl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function pd(t,e){var n=e.checked;return It({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function cp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Tr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function e0(t,e){e=e.checked,e!=null&&Qf(t,"checked",e,!1)}function md(t,e){e0(t,e);var n=Tr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?gd(t,e.type,n):e.hasOwnProperty("defaultValue")&&gd(t,e.type,Tr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function up(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function gd(t,e,n){(e!=="number"||Xl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var za=Array.isArray;function ks(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Tr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function vd(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ae(91));return It({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function dp(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ae(92));if(za(n)){if(1<n.length)throw Error(ae(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Tr(n)}}function t0(t,e){var n=Tr(e.value),i=Tr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function fp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function n0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function _d(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?n0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Go,i0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Go=Go||document.createElement("div"),Go.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Go.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function io(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Xa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},fM=["Webkit","ms","Moz","O"];Object.keys(Xa).forEach(function(t){fM.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Xa[e]=Xa[t]})});function r0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Xa.hasOwnProperty(t)&&Xa[t]?(""+e).trim():e+"px"}function s0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=r0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var hM=It({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Md(t,e){if(e){if(hM[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ae(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ae(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ae(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ae(62))}}function yd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var xd=null;function nh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Sd=null,Bs=null,zs=null;function hp(t){if(t=bo(t)){if(typeof Sd!="function")throw Error(ae(280));var e=t.stateNode;e&&(e=Rc(e),Sd(t.stateNode,t.type,e))}}function a0(t){Bs?zs?zs.push(t):zs=[t]:Bs=t}function o0(){if(Bs){var t=Bs,e=zs;if(zs=Bs=null,hp(t),e)for(t=0;t<e.length;t++)hp(e[t])}}function l0(t,e){return t(e)}function c0(){}var ru=!1;function u0(t,e,n){if(ru)return t(e,n);ru=!0;try{return l0(t,e,n)}finally{ru=!1,(Bs!==null||zs!==null)&&(c0(),o0())}}function ro(t,e){var n=t.stateNode;if(n===null)return null;var i=Rc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ae(231,e,typeof n));return n}var Ed=!1;if(Hi)try{var Ea={};Object.defineProperty(Ea,"passive",{get:function(){Ed=!0}}),window.addEventListener("test",Ea,Ea),window.removeEventListener("test",Ea,Ea)}catch{Ed=!1}function pM(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var $a=!1,$l=null,ql=!1,wd=null,mM={onError:function(t){$a=!0,$l=t}};function gM(t,e,n,i,r,s,a,o,l){$a=!1,$l=null,pM.apply(mM,arguments)}function vM(t,e,n,i,r,s,a,o,l){if(gM.apply(this,arguments),$a){if($a){var c=$l;$a=!1,$l=null}else throw Error(ae(198));ql||(ql=!0,wd=c)}}function as(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function d0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function pp(t){if(as(t)!==t)throw Error(ae(188))}function _M(t){var e=t.alternate;if(!e){if(e=as(t),e===null)throw Error(ae(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return pp(r),t;if(s===i)return pp(r),e;s=s.sibling}throw Error(ae(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(ae(189))}}if(n.alternate!==i)throw Error(ae(190))}if(n.tag!==3)throw Error(ae(188));return n.stateNode.current===n?t:e}function f0(t){return t=_M(t),t!==null?h0(t):null}function h0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=h0(t);if(e!==null)return e;t=t.sibling}return null}var p0=Bn.unstable_scheduleCallback,mp=Bn.unstable_cancelCallback,MM=Bn.unstable_shouldYield,yM=Bn.unstable_requestPaint,Ut=Bn.unstable_now,xM=Bn.unstable_getCurrentPriorityLevel,ih=Bn.unstable_ImmediatePriority,m0=Bn.unstable_UserBlockingPriority,Yl=Bn.unstable_NormalPriority,SM=Bn.unstable_LowPriority,g0=Bn.unstable_IdlePriority,Tc=null,Si=null;function EM(t){if(Si&&typeof Si.onCommitFiberRoot=="function")try{Si.onCommitFiberRoot(Tc,t,void 0,(t.current.flags&128)===128)}catch{}}var ui=Math.clz32?Math.clz32:AM,wM=Math.log,TM=Math.LN2;function AM(t){return t>>>=0,t===0?32:31-(wM(t)/TM|0)|0}var Ho=64,Vo=4194304;function Ga(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Kl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Ga(o):(s&=a,s!==0&&(i=Ga(s)))}else a=n&~r,a!==0?i=Ga(a):s!==0&&(i=Ga(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ui(e),r=1<<n,i|=t[n],e&=~r;return i}function bM(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function CM(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-ui(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=bM(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function Td(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function v0(){var t=Ho;return Ho<<=1,!(Ho&4194240)&&(Ho=64),t}function su(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function To(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ui(e),t[e]=n}function RM(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ui(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function rh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ui(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var ut=0;function _0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var M0,sh,y0,x0,S0,Ad=!1,Wo=[],pr=null,mr=null,gr=null,so=new Map,ao=new Map,lr=[],PM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function gp(t,e){switch(t){case"focusin":case"focusout":pr=null;break;case"dragenter":case"dragleave":mr=null;break;case"mouseover":case"mouseout":gr=null;break;case"pointerover":case"pointerout":so.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ao.delete(e.pointerId)}}function wa(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=bo(e),e!==null&&sh(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function IM(t,e,n,i,r){switch(e){case"focusin":return pr=wa(pr,t,e,n,i,r),!0;case"dragenter":return mr=wa(mr,t,e,n,i,r),!0;case"mouseover":return gr=wa(gr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return so.set(s,wa(so.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ao.set(s,wa(ao.get(s)||null,t,e,n,i,r)),!0}return!1}function E0(t){var e=Hr(t.target);if(e!==null){var n=as(e);if(n!==null){if(e=n.tag,e===13){if(e=d0(n),e!==null){t.blockedOn=e,S0(t.priority,function(){y0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Pl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=bd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);xd=i,n.target.dispatchEvent(i),xd=null}else return e=bo(n),e!==null&&sh(e),t.blockedOn=n,!1;e.shift()}return!0}function vp(t,e,n){Pl(t)&&n.delete(e)}function LM(){Ad=!1,pr!==null&&Pl(pr)&&(pr=null),mr!==null&&Pl(mr)&&(mr=null),gr!==null&&Pl(gr)&&(gr=null),so.forEach(vp),ao.forEach(vp)}function Ta(t,e){t.blockedOn===e&&(t.blockedOn=null,Ad||(Ad=!0,Bn.unstable_scheduleCallback(Bn.unstable_NormalPriority,LM)))}function oo(t){function e(r){return Ta(r,t)}if(0<Wo.length){Ta(Wo[0],t);for(var n=1;n<Wo.length;n++){var i=Wo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(pr!==null&&Ta(pr,t),mr!==null&&Ta(mr,t),gr!==null&&Ta(gr,t),so.forEach(e),ao.forEach(e),n=0;n<lr.length;n++)i=lr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<lr.length&&(n=lr[0],n.blockedOn===null);)E0(n),n.blockedOn===null&&lr.shift()}var Gs=Yi.ReactCurrentBatchConfig,Zl=!0;function DM(t,e,n,i){var r=ut,s=Gs.transition;Gs.transition=null;try{ut=1,ah(t,e,n,i)}finally{ut=r,Gs.transition=s}}function NM(t,e,n,i){var r=ut,s=Gs.transition;Gs.transition=null;try{ut=4,ah(t,e,n,i)}finally{ut=r,Gs.transition=s}}function ah(t,e,n,i){if(Zl){var r=bd(t,e,n,i);if(r===null)mu(t,e,i,Ql,n),gp(t,i);else if(IM(r,t,e,n,i))i.stopPropagation();else if(gp(t,i),e&4&&-1<PM.indexOf(t)){for(;r!==null;){var s=bo(r);if(s!==null&&M0(s),s=bd(t,e,n,i),s===null&&mu(t,e,i,Ql,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else mu(t,e,i,null,n)}}var Ql=null;function bd(t,e,n,i){if(Ql=null,t=nh(i),t=Hr(t),t!==null)if(e=as(t),e===null)t=null;else if(n=e.tag,n===13){if(t=d0(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ql=t,null}function w0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(xM()){case ih:return 1;case m0:return 4;case Yl:case SM:return 16;case g0:return 536870912;default:return 16}default:return 16}}var fr=null,oh=null,Il=null;function T0(){if(Il)return Il;var t,e=oh,n=e.length,i,r="value"in fr?fr.value:fr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return Il=r.slice(t,1<i?1-i:void 0)}function Ll(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function jo(){return!0}function _p(){return!1}function Gn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?jo:_p,this.isPropagationStopped=_p,this}return It(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=jo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=jo)},persist:function(){},isPersistent:jo}),e}var ha={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lh=Gn(ha),Ao=It({},ha,{view:0,detail:0}),UM=Gn(Ao),au,ou,Aa,Ac=It({},Ao,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ch,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Aa&&(Aa&&t.type==="mousemove"?(au=t.screenX-Aa.screenX,ou=t.screenY-Aa.screenY):ou=au=0,Aa=t),au)},movementY:function(t){return"movementY"in t?t.movementY:ou}}),Mp=Gn(Ac),OM=It({},Ac,{dataTransfer:0}),FM=Gn(OM),kM=It({},Ao,{relatedTarget:0}),lu=Gn(kM),BM=It({},ha,{animationName:0,elapsedTime:0,pseudoElement:0}),zM=Gn(BM),GM=It({},ha,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),HM=Gn(GM),VM=It({},ha,{data:0}),yp=Gn(VM),WM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},jM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},XM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function $M(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=XM[t])?!!e[t]:!1}function ch(){return $M}var qM=It({},Ao,{key:function(t){if(t.key){var e=WM[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ll(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?jM[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ch,charCode:function(t){return t.type==="keypress"?Ll(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ll(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),YM=Gn(qM),KM=It({},Ac,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xp=Gn(KM),ZM=It({},Ao,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ch}),QM=Gn(ZM),JM=It({},ha,{propertyName:0,elapsedTime:0,pseudoElement:0}),ey=Gn(JM),ty=It({},Ac,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ny=Gn(ty),iy=[9,13,27,32],uh=Hi&&"CompositionEvent"in window,qa=null;Hi&&"documentMode"in document&&(qa=document.documentMode);var ry=Hi&&"TextEvent"in window&&!qa,A0=Hi&&(!uh||qa&&8<qa&&11>=qa),Sp=" ",Ep=!1;function b0(t,e){switch(t){case"keyup":return iy.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function C0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var As=!1;function sy(t,e){switch(t){case"compositionend":return C0(e);case"keypress":return e.which!==32?null:(Ep=!0,Sp);case"textInput":return t=e.data,t===Sp&&Ep?null:t;default:return null}}function ay(t,e){if(As)return t==="compositionend"||!uh&&b0(t,e)?(t=T0(),Il=oh=fr=null,As=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return A0&&e.locale!=="ko"?null:e.data;default:return null}}var oy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!oy[t.type]:e==="textarea"}function R0(t,e,n,i){a0(i),e=Jl(e,"onChange"),0<e.length&&(n=new lh("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Ya=null,lo=null;function ly(t){z0(t,0)}function bc(t){var e=Rs(t);if(Jg(e))return t}function cy(t,e){if(t==="change")return e}var P0=!1;if(Hi){var cu;if(Hi){var uu="oninput"in document;if(!uu){var Tp=document.createElement("div");Tp.setAttribute("oninput","return;"),uu=typeof Tp.oninput=="function"}cu=uu}else cu=!1;P0=cu&&(!document.documentMode||9<document.documentMode)}function Ap(){Ya&&(Ya.detachEvent("onpropertychange",I0),lo=Ya=null)}function I0(t){if(t.propertyName==="value"&&bc(lo)){var e=[];R0(e,lo,t,nh(t)),u0(ly,e)}}function uy(t,e,n){t==="focusin"?(Ap(),Ya=e,lo=n,Ya.attachEvent("onpropertychange",I0)):t==="focusout"&&Ap()}function dy(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return bc(lo)}function fy(t,e){if(t==="click")return bc(e)}function hy(t,e){if(t==="input"||t==="change")return bc(e)}function py(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var pi=typeof Object.is=="function"?Object.is:py;function co(t,e){if(pi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!cd.call(e,r)||!pi(t[r],e[r]))return!1}return!0}function bp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Cp(t,e){var n=bp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=bp(n)}}function L0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?L0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function D0(){for(var t=window,e=Xl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Xl(t.document)}return e}function dh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function my(t){var e=D0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&L0(n.ownerDocument.documentElement,n)){if(i!==null&&dh(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Cp(n,s);var a=Cp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var gy=Hi&&"documentMode"in document&&11>=document.documentMode,bs=null,Cd=null,Ka=null,Rd=!1;function Rp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Rd||bs==null||bs!==Xl(i)||(i=bs,"selectionStart"in i&&dh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ka&&co(Ka,i)||(Ka=i,i=Jl(Cd,"onSelect"),0<i.length&&(e=new lh("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=bs)))}function Xo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Cs={animationend:Xo("Animation","AnimationEnd"),animationiteration:Xo("Animation","AnimationIteration"),animationstart:Xo("Animation","AnimationStart"),transitionend:Xo("Transition","TransitionEnd")},du={},N0={};Hi&&(N0=document.createElement("div").style,"AnimationEvent"in window||(delete Cs.animationend.animation,delete Cs.animationiteration.animation,delete Cs.animationstart.animation),"TransitionEvent"in window||delete Cs.transitionend.transition);function Cc(t){if(du[t])return du[t];if(!Cs[t])return t;var e=Cs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in N0)return du[t]=e[n];return t}var U0=Cc("animationend"),O0=Cc("animationiteration"),F0=Cc("animationstart"),k0=Cc("transitionend"),B0=new Map,Pp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function br(t,e){B0.set(t,e),ss(e,[t])}for(var fu=0;fu<Pp.length;fu++){var hu=Pp[fu],vy=hu.toLowerCase(),_y=hu[0].toUpperCase()+hu.slice(1);br(vy,"on"+_y)}br(U0,"onAnimationEnd");br(O0,"onAnimationIteration");br(F0,"onAnimationStart");br("dblclick","onDoubleClick");br("focusin","onFocus");br("focusout","onBlur");br(k0,"onTransitionEnd");Qs("onMouseEnter",["mouseout","mouseover"]);Qs("onMouseLeave",["mouseout","mouseover"]);Qs("onPointerEnter",["pointerout","pointerover"]);Qs("onPointerLeave",["pointerout","pointerover"]);ss("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ss("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ss("onBeforeInput",["compositionend","keypress","textInput","paste"]);ss("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ss("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ss("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ha="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),My=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ha));function Ip(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,vM(i,e,void 0,t),t.currentTarget=null}function z0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Ip(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Ip(r,o,c),s=l}}}if(ql)throw t=wd,ql=!1,wd=null,t}function St(t,e){var n=e[Nd];n===void 0&&(n=e[Nd]=new Set);var i=t+"__bubble";n.has(i)||(G0(e,t,2,!1),n.add(i))}function pu(t,e,n){var i=0;e&&(i|=4),G0(n,t,i,e)}var $o="_reactListening"+Math.random().toString(36).slice(2);function uo(t){if(!t[$o]){t[$o]=!0,qg.forEach(function(n){n!=="selectionchange"&&(My.has(n)||pu(n,!1,t),pu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[$o]||(e[$o]=!0,pu("selectionchange",!1,e))}}function G0(t,e,n,i){switch(w0(e)){case 1:var r=DM;break;case 4:r=NM;break;default:r=ah}n=r.bind(null,e,n,t),r=void 0,!Ed||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function mu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Hr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}u0(function(){var c=s,u=nh(n),f=[];e:{var h=B0.get(t);if(h!==void 0){var p=lh,_=t;switch(t){case"keypress":if(Ll(n)===0)break e;case"keydown":case"keyup":p=YM;break;case"focusin":_="focus",p=lu;break;case"focusout":_="blur",p=lu;break;case"beforeblur":case"afterblur":p=lu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Mp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=FM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=QM;break;case U0:case O0:case F0:p=zM;break;case k0:p=ey;break;case"scroll":p=UM;break;case"wheel":p=ny;break;case"copy":case"cut":case"paste":p=HM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=xp}var g=(e&4)!==0,m=!g&&t==="scroll",d=g?h!==null?h+"Capture":null:h;g=[];for(var v=c,M;v!==null;){M=v;var y=M.stateNode;if(M.tag===5&&y!==null&&(M=y,d!==null&&(y=ro(v,d),y!=null&&g.push(fo(v,y,M)))),m)break;v=v.return}0<g.length&&(h=new p(h,_,null,n,u),f.push({event:h,listeners:g}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==xd&&(_=n.relatedTarget||n.fromElement)&&(Hr(_)||_[Vi]))break e;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?Hr(_):null,_!==null&&(m=as(_),_!==m||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(g=Mp,y="onMouseLeave",d="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(g=xp,y="onPointerLeave",d="onPointerEnter",v="pointer"),m=p==null?h:Rs(p),M=_==null?h:Rs(_),h=new g(y,v+"leave",p,n,u),h.target=m,h.relatedTarget=M,y=null,Hr(u)===c&&(g=new g(d,v+"enter",_,n,u),g.target=M,g.relatedTarget=m,y=g),m=y,p&&_)t:{for(g=p,d=_,v=0,M=g;M;M=cs(M))v++;for(M=0,y=d;y;y=cs(y))M++;for(;0<v-M;)g=cs(g),v--;for(;0<M-v;)d=cs(d),M--;for(;v--;){if(g===d||d!==null&&g===d.alternate)break t;g=cs(g),d=cs(d)}g=null}else g=null;p!==null&&Lp(f,h,p,g,!1),_!==null&&m!==null&&Lp(f,m,_,g,!0)}}e:{if(h=c?Rs(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var C=cy;else if(wp(h))if(P0)C=hy;else{C=dy;var w=uy}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(C=fy);if(C&&(C=C(t,c))){R0(f,C,n,u);break e}w&&w(t,h,c),t==="focusout"&&(w=h._wrapperState)&&w.controlled&&h.type==="number"&&gd(h,"number",h.value)}switch(w=c?Rs(c):window,t){case"focusin":(wp(w)||w.contentEditable==="true")&&(bs=w,Cd=c,Ka=null);break;case"focusout":Ka=Cd=bs=null;break;case"mousedown":Rd=!0;break;case"contextmenu":case"mouseup":case"dragend":Rd=!1,Rp(f,n,u);break;case"selectionchange":if(gy)break;case"keydown":case"keyup":Rp(f,n,u)}var A;if(uh)e:{switch(t){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else As?b0(t,n)&&(b="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(A0&&n.locale!=="ko"&&(As||b!=="onCompositionStart"?b==="onCompositionEnd"&&As&&(A=T0()):(fr=u,oh="value"in fr?fr.value:fr.textContent,As=!0)),w=Jl(c,b),0<w.length&&(b=new yp(b,t,null,n,u),f.push({event:b,listeners:w}),A?b.data=A:(A=C0(n),A!==null&&(b.data=A)))),(A=ry?sy(t,n):ay(t,n))&&(c=Jl(c,"onBeforeInput"),0<c.length&&(u=new yp("onBeforeInput","beforeinput",null,n,u),f.push({event:u,listeners:c}),u.data=A))}z0(f,e)})}function fo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Jl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ro(t,n),s!=null&&i.unshift(fo(t,s,r)),s=ro(t,e),s!=null&&i.push(fo(t,s,r))),t=t.return}return i}function cs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Lp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=ro(n,s),l!=null&&a.unshift(fo(n,l,o))):r||(l=ro(n,s),l!=null&&a.push(fo(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var yy=/\r\n?/g,xy=/\u0000|\uFFFD/g;function Dp(t){return(typeof t=="string"?t:""+t).replace(yy,`
`).replace(xy,"")}function qo(t,e,n){if(e=Dp(e),Dp(t)!==e&&n)throw Error(ae(425))}function ec(){}var Pd=null,Id=null;function Ld(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Dd=typeof setTimeout=="function"?setTimeout:void 0,Sy=typeof clearTimeout=="function"?clearTimeout:void 0,Np=typeof Promise=="function"?Promise:void 0,Ey=typeof queueMicrotask=="function"?queueMicrotask:typeof Np<"u"?function(t){return Np.resolve(null).then(t).catch(wy)}:Dd;function wy(t){setTimeout(function(){throw t})}function gu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),oo(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);oo(e)}function vr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Up(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var pa=Math.random().toString(36).slice(2),yi="__reactFiber$"+pa,ho="__reactProps$"+pa,Vi="__reactContainer$"+pa,Nd="__reactEvents$"+pa,Ty="__reactListeners$"+pa,Ay="__reactHandles$"+pa;function Hr(t){var e=t[yi];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Vi]||n[yi]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Up(t);t!==null;){if(n=t[yi])return n;t=Up(t)}return e}t=n,n=t.parentNode}return null}function bo(t){return t=t[yi]||t[Vi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Rs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ae(33))}function Rc(t){return t[ho]||null}var Ud=[],Ps=-1;function Cr(t){return{current:t}}function Tt(t){0>Ps||(t.current=Ud[Ps],Ud[Ps]=null,Ps--)}function vt(t,e){Ps++,Ud[Ps]=t.current,t.current=e}var Ar={},un=Cr(Ar),bn=Cr(!1),Zr=Ar;function Js(t,e){var n=t.type.contextTypes;if(!n)return Ar;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Cn(t){return t=t.childContextTypes,t!=null}function tc(){Tt(bn),Tt(un)}function Op(t,e,n){if(un.current!==Ar)throw Error(ae(168));vt(un,e),vt(bn,n)}function H0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ae(108,uM(t)||"Unknown",r));return It({},n,i)}function nc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Ar,Zr=un.current,vt(un,t),vt(bn,bn.current),!0}function Fp(t,e,n){var i=t.stateNode;if(!i)throw Error(ae(169));n?(t=H0(t,e,Zr),i.__reactInternalMemoizedMergedChildContext=t,Tt(bn),Tt(un),vt(un,t)):Tt(bn),vt(bn,n)}var Ni=null,Pc=!1,vu=!1;function V0(t){Ni===null?Ni=[t]:Ni.push(t)}function by(t){Pc=!0,V0(t)}function Rr(){if(!vu&&Ni!==null){vu=!0;var t=0,e=ut;try{var n=Ni;for(ut=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ni=null,Pc=!1}catch(r){throw Ni!==null&&(Ni=Ni.slice(t+1)),p0(ih,Rr),r}finally{ut=e,vu=!1}}return null}var Is=[],Ls=0,ic=null,rc=0,Xn=[],$n=0,Qr=null,Oi=1,Fi="";function Or(t,e){Is[Ls++]=rc,Is[Ls++]=ic,ic=t,rc=e}function W0(t,e,n){Xn[$n++]=Oi,Xn[$n++]=Fi,Xn[$n++]=Qr,Qr=t;var i=Oi;t=Fi;var r=32-ui(i)-1;i&=~(1<<r),n+=1;var s=32-ui(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,Oi=1<<32-ui(e)+r|n<<r|i,Fi=s+t}else Oi=1<<s|n<<r|i,Fi=t}function fh(t){t.return!==null&&(Or(t,1),W0(t,1,0))}function hh(t){for(;t===ic;)ic=Is[--Ls],Is[Ls]=null,rc=Is[--Ls],Is[Ls]=null;for(;t===Qr;)Qr=Xn[--$n],Xn[$n]=null,Fi=Xn[--$n],Xn[$n]=null,Oi=Xn[--$n],Xn[$n]=null}var kn=null,Fn=null,At=!1,oi=null;function j0(t,e){var n=Yn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function kp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,kn=t,Fn=vr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,kn=t,Fn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Qr!==null?{id:Oi,overflow:Fi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Yn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,kn=t,Fn=null,!0):!1;default:return!1}}function Od(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Fd(t){if(At){var e=Fn;if(e){var n=e;if(!kp(t,e)){if(Od(t))throw Error(ae(418));e=vr(n.nextSibling);var i=kn;e&&kp(t,e)?j0(i,n):(t.flags=t.flags&-4097|2,At=!1,kn=t)}}else{if(Od(t))throw Error(ae(418));t.flags=t.flags&-4097|2,At=!1,kn=t}}}function Bp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;kn=t}function Yo(t){if(t!==kn)return!1;if(!At)return Bp(t),At=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Ld(t.type,t.memoizedProps)),e&&(e=Fn)){if(Od(t))throw X0(),Error(ae(418));for(;e;)j0(t,e),e=vr(e.nextSibling)}if(Bp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ae(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Fn=vr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Fn=null}}else Fn=kn?vr(t.stateNode.nextSibling):null;return!0}function X0(){for(var t=Fn;t;)t=vr(t.nextSibling)}function ea(){Fn=kn=null,At=!1}function ph(t){oi===null?oi=[t]:oi.push(t)}var Cy=Yi.ReactCurrentBatchConfig;function ba(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ae(309));var i=n.stateNode}if(!i)throw Error(ae(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(ae(284));if(!n._owner)throw Error(ae(290,t))}return t}function Ko(t,e){throw t=Object.prototype.toString.call(e),Error(ae(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function zp(t){var e=t._init;return e(t._payload)}function $0(t){function e(d,v){if(t){var M=d.deletions;M===null?(d.deletions=[v],d.flags|=16):M.push(v)}}function n(d,v){if(!t)return null;for(;v!==null;)e(d,v),v=v.sibling;return null}function i(d,v){for(d=new Map;v!==null;)v.key!==null?d.set(v.key,v):d.set(v.index,v),v=v.sibling;return d}function r(d,v){return d=xr(d,v),d.index=0,d.sibling=null,d}function s(d,v,M){return d.index=M,t?(M=d.alternate,M!==null?(M=M.index,M<v?(d.flags|=2,v):M):(d.flags|=2,v)):(d.flags|=1048576,v)}function a(d){return t&&d.alternate===null&&(d.flags|=2),d}function o(d,v,M,y){return v===null||v.tag!==6?(v=wu(M,d.mode,y),v.return=d,v):(v=r(v,M),v.return=d,v)}function l(d,v,M,y){var C=M.type;return C===Ts?u(d,v,M.props.children,y,M.key):v!==null&&(v.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===ar&&zp(C)===v.type)?(y=r(v,M.props),y.ref=ba(d,v,M),y.return=d,y):(y=Bl(M.type,M.key,M.props,null,d.mode,y),y.ref=ba(d,v,M),y.return=d,y)}function c(d,v,M,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==M.containerInfo||v.stateNode.implementation!==M.implementation?(v=Tu(M,d.mode,y),v.return=d,v):(v=r(v,M.children||[]),v.return=d,v)}function u(d,v,M,y,C){return v===null||v.tag!==7?(v=Yr(M,d.mode,y,C),v.return=d,v):(v=r(v,M),v.return=d,v)}function f(d,v,M){if(typeof v=="string"&&v!==""||typeof v=="number")return v=wu(""+v,d.mode,M),v.return=d,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Bo:return M=Bl(v.type,v.key,v.props,null,d.mode,M),M.ref=ba(d,null,v),M.return=d,M;case ws:return v=Tu(v,d.mode,M),v.return=d,v;case ar:var y=v._init;return f(d,y(v._payload),M)}if(za(v)||Sa(v))return v=Yr(v,d.mode,M,null),v.return=d,v;Ko(d,v)}return null}function h(d,v,M,y){var C=v!==null?v.key:null;if(typeof M=="string"&&M!==""||typeof M=="number")return C!==null?null:o(d,v,""+M,y);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case Bo:return M.key===C?l(d,v,M,y):null;case ws:return M.key===C?c(d,v,M,y):null;case ar:return C=M._init,h(d,v,C(M._payload),y)}if(za(M)||Sa(M))return C!==null?null:u(d,v,M,y,null);Ko(d,M)}return null}function p(d,v,M,y,C){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(M)||null,o(v,d,""+y,C);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Bo:return d=d.get(y.key===null?M:y.key)||null,l(v,d,y,C);case ws:return d=d.get(y.key===null?M:y.key)||null,c(v,d,y,C);case ar:var w=y._init;return p(d,v,M,w(y._payload),C)}if(za(y)||Sa(y))return d=d.get(M)||null,u(v,d,y,C,null);Ko(v,y)}return null}function _(d,v,M,y){for(var C=null,w=null,A=v,b=v=0,E=null;A!==null&&b<M.length;b++){A.index>b?(E=A,A=null):E=A.sibling;var x=h(d,A,M[b],y);if(x===null){A===null&&(A=E);break}t&&A&&x.alternate===null&&e(d,A),v=s(x,v,b),w===null?C=x:w.sibling=x,w=x,A=E}if(b===M.length)return n(d,A),At&&Or(d,b),C;if(A===null){for(;b<M.length;b++)A=f(d,M[b],y),A!==null&&(v=s(A,v,b),w===null?C=A:w.sibling=A,w=A);return At&&Or(d,b),C}for(A=i(d,A);b<M.length;b++)E=p(A,d,b,M[b],y),E!==null&&(t&&E.alternate!==null&&A.delete(E.key===null?b:E.key),v=s(E,v,b),w===null?C=E:w.sibling=E,w=E);return t&&A.forEach(function(P){return e(d,P)}),At&&Or(d,b),C}function g(d,v,M,y){var C=Sa(M);if(typeof C!="function")throw Error(ae(150));if(M=C.call(M),M==null)throw Error(ae(151));for(var w=C=null,A=v,b=v=0,E=null,x=M.next();A!==null&&!x.done;b++,x=M.next()){A.index>b?(E=A,A=null):E=A.sibling;var P=h(d,A,x.value,y);if(P===null){A===null&&(A=E);break}t&&A&&P.alternate===null&&e(d,A),v=s(P,v,b),w===null?C=P:w.sibling=P,w=P,A=E}if(x.done)return n(d,A),At&&Or(d,b),C;if(A===null){for(;!x.done;b++,x=M.next())x=f(d,x.value,y),x!==null&&(v=s(x,v,b),w===null?C=x:w.sibling=x,w=x);return At&&Or(d,b),C}for(A=i(d,A);!x.done;b++,x=M.next())x=p(A,d,b,x.value,y),x!==null&&(t&&x.alternate!==null&&A.delete(x.key===null?b:x.key),v=s(x,v,b),w===null?C=x:w.sibling=x,w=x);return t&&A.forEach(function(B){return e(d,B)}),At&&Or(d,b),C}function m(d,v,M,y){if(typeof M=="object"&&M!==null&&M.type===Ts&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case Bo:e:{for(var C=M.key,w=v;w!==null;){if(w.key===C){if(C=M.type,C===Ts){if(w.tag===7){n(d,w.sibling),v=r(w,M.props.children),v.return=d,d=v;break e}}else if(w.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===ar&&zp(C)===w.type){n(d,w.sibling),v=r(w,M.props),v.ref=ba(d,w,M),v.return=d,d=v;break e}n(d,w);break}else e(d,w);w=w.sibling}M.type===Ts?(v=Yr(M.props.children,d.mode,y,M.key),v.return=d,d=v):(y=Bl(M.type,M.key,M.props,null,d.mode,y),y.ref=ba(d,v,M),y.return=d,d=y)}return a(d);case ws:e:{for(w=M.key;v!==null;){if(v.key===w)if(v.tag===4&&v.stateNode.containerInfo===M.containerInfo&&v.stateNode.implementation===M.implementation){n(d,v.sibling),v=r(v,M.children||[]),v.return=d,d=v;break e}else{n(d,v);break}else e(d,v);v=v.sibling}v=Tu(M,d.mode,y),v.return=d,d=v}return a(d);case ar:return w=M._init,m(d,v,w(M._payload),y)}if(za(M))return _(d,v,M,y);if(Sa(M))return g(d,v,M,y);Ko(d,M)}return typeof M=="string"&&M!==""||typeof M=="number"?(M=""+M,v!==null&&v.tag===6?(n(d,v.sibling),v=r(v,M),v.return=d,d=v):(n(d,v),v=wu(M,d.mode,y),v.return=d,d=v),a(d)):n(d,v)}return m}var ta=$0(!0),q0=$0(!1),sc=Cr(null),ac=null,Ds=null,mh=null;function gh(){mh=Ds=ac=null}function vh(t){var e=sc.current;Tt(sc),t._currentValue=e}function kd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Hs(t,e){ac=t,mh=Ds=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(An=!0),t.firstContext=null)}function Zn(t){var e=t._currentValue;if(mh!==t)if(t={context:t,memoizedValue:e,next:null},Ds===null){if(ac===null)throw Error(ae(308));Ds=t,ac.dependencies={lanes:0,firstContext:t}}else Ds=Ds.next=t;return e}var Vr=null;function _h(t){Vr===null?Vr=[t]:Vr.push(t)}function Y0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,_h(e)):(n.next=r.next,r.next=n),e.interleaved=n,Wi(t,i)}function Wi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var or=!1;function Mh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function K0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function zi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function _r(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,tt&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Wi(t,n)}return r=i.interleaved,r===null?(e.next=e,_h(i)):(e.next=r.next,r.next=e),i.interleaved=e,Wi(t,n)}function Dl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,rh(t,n)}}function Gp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function oc(t,e,n,i){var r=t.updateQueue;or=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var u=t.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==a&&(o===null?u.firstBaseUpdate=c:o.next=c,u.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;a=0,u=c=l=null,o=s;do{var h=o.lane,p=o.eventTime;if((i&h)===h){u!==null&&(u=u.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var _=t,g=o;switch(h=e,p=n,g.tag){case 1:if(_=g.payload,typeof _=="function"){f=_.call(p,f,h);break e}f=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=g.payload,h=typeof _=="function"?_.call(p,f,h):_,h==null)break e;f=It({},f,h);break e;case 2:or=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[o]:h.push(o))}else p={eventTime:p,lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(c=u=p,l=f):u=u.next=p,a|=h;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;h=o,o=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(u===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);es|=a,t.lanes=a,t.memoizedState=f}}function Hp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ae(191,r));r.call(i)}}}var Co={},Ei=Cr(Co),po=Cr(Co),mo=Cr(Co);function Wr(t){if(t===Co)throw Error(ae(174));return t}function yh(t,e){switch(vt(mo,e),vt(po,t),vt(Ei,Co),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:_d(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=_d(e,t)}Tt(Ei),vt(Ei,e)}function na(){Tt(Ei),Tt(po),Tt(mo)}function Z0(t){Wr(mo.current);var e=Wr(Ei.current),n=_d(e,t.type);e!==n&&(vt(po,t),vt(Ei,n))}function xh(t){po.current===t&&(Tt(Ei),Tt(po))}var Ct=Cr(0);function lc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var _u=[];function Sh(){for(var t=0;t<_u.length;t++)_u[t]._workInProgressVersionPrimary=null;_u.length=0}var Nl=Yi.ReactCurrentDispatcher,Mu=Yi.ReactCurrentBatchConfig,Jr=0,Pt=null,Vt=null,Yt=null,cc=!1,Za=!1,go=0,Ry=0;function nn(){throw Error(ae(321))}function Eh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!pi(t[n],e[n]))return!1;return!0}function wh(t,e,n,i,r,s){if(Jr=s,Pt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Nl.current=t===null||t.memoizedState===null?Dy:Ny,t=n(i,r),Za){s=0;do{if(Za=!1,go=0,25<=s)throw Error(ae(301));s+=1,Yt=Vt=null,e.updateQueue=null,Nl.current=Uy,t=n(i,r)}while(Za)}if(Nl.current=uc,e=Vt!==null&&Vt.next!==null,Jr=0,Yt=Vt=Pt=null,cc=!1,e)throw Error(ae(300));return t}function Th(){var t=go!==0;return go=0,t}function vi(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Yt===null?Pt.memoizedState=Yt=t:Yt=Yt.next=t,Yt}function Qn(){if(Vt===null){var t=Pt.alternate;t=t!==null?t.memoizedState:null}else t=Vt.next;var e=Yt===null?Pt.memoizedState:Yt.next;if(e!==null)Yt=e,Vt=t;else{if(t===null)throw Error(ae(310));Vt=t,t={memoizedState:Vt.memoizedState,baseState:Vt.baseState,baseQueue:Vt.baseQueue,queue:Vt.queue,next:null},Yt===null?Pt.memoizedState=Yt=t:Yt=Yt.next=t}return Yt}function vo(t,e){return typeof e=="function"?e(t):e}function yu(t){var e=Qn(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=Vt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var u=c.lane;if((Jr&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=f,a=i):l=l.next=f,Pt.lanes|=u,es|=u}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,pi(i,e.memoizedState)||(An=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Pt.lanes|=s,es|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function xu(t){var e=Qn(),n=e.queue;if(n===null)throw Error(ae(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);pi(s,e.memoizedState)||(An=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function Q0(){}function J0(t,e){var n=Pt,i=Qn(),r=e(),s=!pi(i.memoizedState,r);if(s&&(i.memoizedState=r,An=!0),i=i.queue,Ah(nv.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Yt!==null&&Yt.memoizedState.tag&1){if(n.flags|=2048,_o(9,tv.bind(null,n,i,r,e),void 0,null),Kt===null)throw Error(ae(349));Jr&30||ev(n,e,r)}return r}function ev(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Pt.updateQueue,e===null?(e={lastEffect:null,stores:null},Pt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function tv(t,e,n,i){e.value=n,e.getSnapshot=i,iv(e)&&rv(t)}function nv(t,e,n){return n(function(){iv(e)&&rv(t)})}function iv(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!pi(t,n)}catch{return!0}}function rv(t){var e=Wi(t,1);e!==null&&di(e,t,1,-1)}function Vp(t){var e=vi();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:vo,lastRenderedState:t},e.queue=t,t=t.dispatch=Ly.bind(null,Pt,t),[e.memoizedState,t]}function _o(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Pt.updateQueue,e===null?(e={lastEffect:null,stores:null},Pt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function sv(){return Qn().memoizedState}function Ul(t,e,n,i){var r=vi();Pt.flags|=t,r.memoizedState=_o(1|e,n,void 0,i===void 0?null:i)}function Ic(t,e,n,i){var r=Qn();i=i===void 0?null:i;var s=void 0;if(Vt!==null){var a=Vt.memoizedState;if(s=a.destroy,i!==null&&Eh(i,a.deps)){r.memoizedState=_o(e,n,s,i);return}}Pt.flags|=t,r.memoizedState=_o(1|e,n,s,i)}function Wp(t,e){return Ul(8390656,8,t,e)}function Ah(t,e){return Ic(2048,8,t,e)}function av(t,e){return Ic(4,2,t,e)}function ov(t,e){return Ic(4,4,t,e)}function lv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function cv(t,e,n){return n=n!=null?n.concat([t]):null,Ic(4,4,lv.bind(null,e,t),n)}function bh(){}function uv(t,e){var n=Qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Eh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function dv(t,e){var n=Qn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Eh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function fv(t,e,n){return Jr&21?(pi(n,e)||(n=v0(),Pt.lanes|=n,es|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,An=!0),t.memoizedState=n)}function Py(t,e){var n=ut;ut=n!==0&&4>n?n:4,t(!0);var i=Mu.transition;Mu.transition={};try{t(!1),e()}finally{ut=n,Mu.transition=i}}function hv(){return Qn().memoizedState}function Iy(t,e,n){var i=yr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},pv(t))mv(e,n);else if(n=Y0(t,e,n,i),n!==null){var r=pn();di(n,t,i,r),gv(n,e,i)}}function Ly(t,e,n){var i=yr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(pv(t))mv(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,pi(o,a)){var l=e.interleaved;l===null?(r.next=r,_h(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Y0(t,e,r,i),n!==null&&(r=pn(),di(n,t,i,r),gv(n,e,i))}}function pv(t){var e=t.alternate;return t===Pt||e!==null&&e===Pt}function mv(t,e){Za=cc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function gv(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,rh(t,n)}}var uc={readContext:Zn,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useInsertionEffect:nn,useLayoutEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useMutableSource:nn,useSyncExternalStore:nn,useId:nn,unstable_isNewReconciler:!1},Dy={readContext:Zn,useCallback:function(t,e){return vi().memoizedState=[t,e===void 0?null:e],t},useContext:Zn,useEffect:Wp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ul(4194308,4,lv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ul(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ul(4,2,t,e)},useMemo:function(t,e){var n=vi();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=vi();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Iy.bind(null,Pt,t),[i.memoizedState,t]},useRef:function(t){var e=vi();return t={current:t},e.memoizedState=t},useState:Vp,useDebugValue:bh,useDeferredValue:function(t){return vi().memoizedState=t},useTransition:function(){var t=Vp(!1),e=t[0];return t=Py.bind(null,t[1]),vi().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Pt,r=vi();if(At){if(n===void 0)throw Error(ae(407));n=n()}else{if(n=e(),Kt===null)throw Error(ae(349));Jr&30||ev(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Wp(nv.bind(null,i,s,t),[t]),i.flags|=2048,_o(9,tv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=vi(),e=Kt.identifierPrefix;if(At){var n=Fi,i=Oi;n=(i&~(1<<32-ui(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=go++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Ry++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Ny={readContext:Zn,useCallback:uv,useContext:Zn,useEffect:Ah,useImperativeHandle:cv,useInsertionEffect:av,useLayoutEffect:ov,useMemo:dv,useReducer:yu,useRef:sv,useState:function(){return yu(vo)},useDebugValue:bh,useDeferredValue:function(t){var e=Qn();return fv(e,Vt.memoizedState,t)},useTransition:function(){var t=yu(vo)[0],e=Qn().memoizedState;return[t,e]},useMutableSource:Q0,useSyncExternalStore:J0,useId:hv,unstable_isNewReconciler:!1},Uy={readContext:Zn,useCallback:uv,useContext:Zn,useEffect:Ah,useImperativeHandle:cv,useInsertionEffect:av,useLayoutEffect:ov,useMemo:dv,useReducer:xu,useRef:sv,useState:function(){return xu(vo)},useDebugValue:bh,useDeferredValue:function(t){var e=Qn();return Vt===null?e.memoizedState=t:fv(e,Vt.memoizedState,t)},useTransition:function(){var t=xu(vo)[0],e=Qn().memoizedState;return[t,e]},useMutableSource:Q0,useSyncExternalStore:J0,useId:hv,unstable_isNewReconciler:!1};function si(t,e){if(t&&t.defaultProps){e=It({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Bd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:It({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Lc={isMounted:function(t){return(t=t._reactInternals)?as(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=pn(),r=yr(t),s=zi(i,r);s.payload=e,n!=null&&(s.callback=n),e=_r(t,s,r),e!==null&&(di(e,t,r,i),Dl(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=pn(),r=yr(t),s=zi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=_r(t,s,r),e!==null&&(di(e,t,r,i),Dl(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=pn(),i=yr(t),r=zi(n,i);r.tag=2,e!=null&&(r.callback=e),e=_r(t,r,i),e!==null&&(di(e,t,i,n),Dl(e,t,i))}};function jp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!co(n,i)||!co(r,s):!0}function vv(t,e,n){var i=!1,r=Ar,s=e.contextType;return typeof s=="object"&&s!==null?s=Zn(s):(r=Cn(e)?Zr:un.current,i=e.contextTypes,s=(i=i!=null)?Js(t,r):Ar),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Lc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Xp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Lc.enqueueReplaceState(e,e.state,null)}function zd(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Mh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Zn(s):(s=Cn(e)?Zr:un.current,r.context=Js(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Bd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Lc.enqueueReplaceState(r,r.state,null),oc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function ia(t,e){try{var n="",i=e;do n+=cM(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Su(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Gd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Oy=typeof WeakMap=="function"?WeakMap:Map;function _v(t,e,n){n=zi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){fc||(fc=!0,Zd=i),Gd(t,e)},n}function Mv(t,e,n){n=zi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Gd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Gd(t,e),typeof i!="function"&&(Mr===null?Mr=new Set([this]):Mr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function $p(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Oy;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Ky.bind(null,t,e,n),e.then(t,t))}function qp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Yp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=zi(-1,1),e.tag=2,_r(n,e,1))),n.lanes|=1),t)}var Fy=Yi.ReactCurrentOwner,An=!1;function hn(t,e,n,i){e.child=t===null?q0(e,null,n,i):ta(e,t.child,n,i)}function Kp(t,e,n,i,r){n=n.render;var s=e.ref;return Hs(e,r),i=wh(t,e,n,i,s,r),n=Th(),t!==null&&!An?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,ji(t,e,r)):(At&&n&&fh(e),e.flags|=1,hn(t,e,i,r),e.child)}function Zp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Uh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,yv(t,e,s,i,r)):(t=Bl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:co,n(a,i)&&t.ref===e.ref)return ji(t,e,r)}return e.flags|=1,t=xr(s,i),t.ref=e.ref,t.return=e,e.child=t}function yv(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(co(s,i)&&t.ref===e.ref)if(An=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(An=!0);else return e.lanes=t.lanes,ji(t,e,r)}return Hd(t,e,n,i,r)}function xv(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},vt(Us,Un),Un|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,vt(Us,Un),Un|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,vt(Us,Un),Un|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,vt(Us,Un),Un|=i;return hn(t,e,r,n),e.child}function Sv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Hd(t,e,n,i,r){var s=Cn(n)?Zr:un.current;return s=Js(e,s),Hs(e,r),n=wh(t,e,n,i,s,r),i=Th(),t!==null&&!An?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,ji(t,e,r)):(At&&i&&fh(e),e.flags|=1,hn(t,e,n,r),e.child)}function Qp(t,e,n,i,r){if(Cn(n)){var s=!0;nc(e)}else s=!1;if(Hs(e,r),e.stateNode===null)Ol(t,e),vv(e,n,i),zd(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=Zn(c):(c=Cn(n)?Zr:un.current,c=Js(e,c));var u=n.getDerivedStateFromProps,f=typeof u=="function"||typeof a.getSnapshotBeforeUpdate=="function";f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&Xp(e,a,i,c),or=!1;var h=e.memoizedState;a.state=h,oc(e,i,a,r),l=e.memoizedState,o!==i||h!==l||bn.current||or?(typeof u=="function"&&(Bd(e,n,u,i),l=e.memoizedState),(o=or||jp(e,n,o,i,h,l,c))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,K0(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:si(e.type,o),a.props=c,f=e.pendingProps,h=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=Zn(l):(l=Cn(n)?Zr:un.current,l=Js(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==f||h!==l)&&Xp(e,a,i,l),or=!1,h=e.memoizedState,a.state=h,oc(e,i,a,r);var _=e.memoizedState;o!==f||h!==_||bn.current||or?(typeof p=="function"&&(Bd(e,n,p,i),_=e.memoizedState),(c=or||jp(e,n,c,i,h,_,l)||!1)?(u||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,_,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,_,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),a.props=i,a.state=_,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Vd(t,e,n,i,s,r)}function Vd(t,e,n,i,r,s){Sv(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Fp(e,n,!1),ji(t,e,s);i=e.stateNode,Fy.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=ta(e,t.child,null,s),e.child=ta(e,null,o,s)):hn(t,e,o,s),e.memoizedState=i.state,r&&Fp(e,n,!0),e.child}function Ev(t){var e=t.stateNode;e.pendingContext?Op(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Op(t,e.context,!1),yh(t,e.containerInfo)}function Jp(t,e,n,i,r){return ea(),ph(r),e.flags|=256,hn(t,e,n,i),e.child}var Wd={dehydrated:null,treeContext:null,retryLane:0};function jd(t){return{baseLanes:t,cachePool:null,transitions:null}}function wv(t,e,n){var i=e.pendingProps,r=Ct.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),vt(Ct,r&1),t===null)return Fd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=Uc(a,i,0,null),t=Yr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=jd(n),e.memoizedState=Wd,t):Ch(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return ky(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=xr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=xr(o,s):(s=Yr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?jd(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Wd,i}return s=t.child,t=s.sibling,i=xr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Ch(t,e){return e=Uc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Zo(t,e,n,i){return i!==null&&ph(i),ta(e,t.child,null,n),t=Ch(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function ky(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=Su(Error(ae(422))),Zo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=Uc({mode:"visible",children:i.children},r,0,null),s=Yr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&ta(e,t.child,null,a),e.child.memoizedState=jd(a),e.memoizedState=Wd,s);if(!(e.mode&1))return Zo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(ae(419)),i=Su(s,i,void 0),Zo(t,e,a,i)}if(o=(a&t.childLanes)!==0,An||o){if(i=Kt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Wi(t,r),di(i,t,r,-1))}return Nh(),i=Su(Error(ae(421))),Zo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Zy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Fn=vr(r.nextSibling),kn=e,At=!0,oi=null,t!==null&&(Xn[$n++]=Oi,Xn[$n++]=Fi,Xn[$n++]=Qr,Oi=t.id,Fi=t.overflow,Qr=e),e=Ch(e,i.children),e.flags|=4096,e)}function em(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),kd(t.return,e,n)}function Eu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Tv(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(hn(t,e,i.children,n),i=Ct.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&em(t,n,e);else if(t.tag===19)em(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(vt(Ct,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&lc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Eu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&lc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Eu(e,!0,n,null,s);break;case"together":Eu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ol(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function ji(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),es|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ae(153));if(e.child!==null){for(t=e.child,n=xr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=xr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function By(t,e,n){switch(e.tag){case 3:Ev(e),ea();break;case 5:Z0(e);break;case 1:Cn(e.type)&&nc(e);break;case 4:yh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;vt(sc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(vt(Ct,Ct.current&1),e.flags|=128,null):n&e.child.childLanes?wv(t,e,n):(vt(Ct,Ct.current&1),t=ji(t,e,n),t!==null?t.sibling:null);vt(Ct,Ct.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Tv(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),vt(Ct,Ct.current),i)break;return null;case 22:case 23:return e.lanes=0,xv(t,e,n)}return ji(t,e,n)}var Av,Xd,bv,Cv;Av=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Xd=function(){};bv=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Wr(Ei.current);var s=null;switch(n){case"input":r=pd(t,r),i=pd(t,i),s=[];break;case"select":r=It({},r,{value:void 0}),i=It({},i,{value:void 0}),s=[];break;case"textarea":r=vd(t,r),i=vd(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=ec)}Md(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(no.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(no.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&St("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};Cv=function(t,e,n,i){n!==i&&(e.flags|=4)};function Ca(t,e){if(!At)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function rn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function zy(t,e,n){var i=e.pendingProps;switch(hh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rn(e),null;case 1:return Cn(e.type)&&tc(),rn(e),null;case 3:return i=e.stateNode,na(),Tt(bn),Tt(un),Sh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Yo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,oi!==null&&(ef(oi),oi=null))),Xd(t,e),rn(e),null;case 5:xh(e);var r=Wr(mo.current);if(n=e.type,t!==null&&e.stateNode!=null)bv(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ae(166));return rn(e),null}if(t=Wr(Ei.current),Yo(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[yi]=e,i[ho]=s,t=(e.mode&1)!==0,n){case"dialog":St("cancel",i),St("close",i);break;case"iframe":case"object":case"embed":St("load",i);break;case"video":case"audio":for(r=0;r<Ha.length;r++)St(Ha[r],i);break;case"source":St("error",i);break;case"img":case"image":case"link":St("error",i),St("load",i);break;case"details":St("toggle",i);break;case"input":cp(i,s),St("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},St("invalid",i);break;case"textarea":dp(i,s),St("invalid",i)}Md(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&qo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&qo(i.textContent,o,t),r=["children",""+o]):no.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&St("scroll",i)}switch(n){case"input":zo(i),up(i,s,!0);break;case"textarea":zo(i),fp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=ec)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=n0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[yi]=e,t[ho]=i,Av(t,e,!1,!1),e.stateNode=t;e:{switch(a=yd(n,i),n){case"dialog":St("cancel",t),St("close",t),r=i;break;case"iframe":case"object":case"embed":St("load",t),r=i;break;case"video":case"audio":for(r=0;r<Ha.length;r++)St(Ha[r],t);r=i;break;case"source":St("error",t),r=i;break;case"img":case"image":case"link":St("error",t),St("load",t),r=i;break;case"details":St("toggle",t),r=i;break;case"input":cp(t,i),r=pd(t,i),St("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=It({},i,{value:void 0}),St("invalid",t);break;case"textarea":dp(t,i),r=vd(t,i),St("invalid",t);break;default:r=i}Md(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?s0(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&i0(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&io(t,l):typeof l=="number"&&io(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(no.hasOwnProperty(s)?l!=null&&s==="onScroll"&&St("scroll",t):l!=null&&Qf(t,s,l,a))}switch(n){case"input":zo(t),up(t,i,!1);break;case"textarea":zo(t),fp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Tr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?ks(t,!!i.multiple,s,!1):i.defaultValue!=null&&ks(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=ec)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return rn(e),null;case 6:if(t&&e.stateNode!=null)Cv(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ae(166));if(n=Wr(mo.current),Wr(Ei.current),Yo(e)){if(i=e.stateNode,n=e.memoizedProps,i[yi]=e,(s=i.nodeValue!==n)&&(t=kn,t!==null))switch(t.tag){case 3:qo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&qo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[yi]=e,e.stateNode=i}return rn(e),null;case 13:if(Tt(Ct),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(At&&Fn!==null&&e.mode&1&&!(e.flags&128))X0(),ea(),e.flags|=98560,s=!1;else if(s=Yo(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ae(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ae(317));s[yi]=e}else ea(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;rn(e),s=!1}else oi!==null&&(ef(oi),oi=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Ct.current&1?Wt===0&&(Wt=3):Nh())),e.updateQueue!==null&&(e.flags|=4),rn(e),null);case 4:return na(),Xd(t,e),t===null&&uo(e.stateNode.containerInfo),rn(e),null;case 10:return vh(e.type._context),rn(e),null;case 17:return Cn(e.type)&&tc(),rn(e),null;case 19:if(Tt(Ct),s=e.memoizedState,s===null)return rn(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)Ca(s,!1);else{if(Wt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=lc(t),a!==null){for(e.flags|=128,Ca(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return vt(Ct,Ct.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ut()>ra&&(e.flags|=128,i=!0,Ca(s,!1),e.lanes=4194304)}else{if(!i)if(t=lc(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Ca(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!At)return rn(e),null}else 2*Ut()-s.renderingStartTime>ra&&n!==1073741824&&(e.flags|=128,i=!0,Ca(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ut(),e.sibling=null,n=Ct.current,vt(Ct,i?n&1|2:n&1),e):(rn(e),null);case 22:case 23:return Dh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Un&1073741824&&(rn(e),e.subtreeFlags&6&&(e.flags|=8192)):rn(e),null;case 24:return null;case 25:return null}throw Error(ae(156,e.tag))}function Gy(t,e){switch(hh(e),e.tag){case 1:return Cn(e.type)&&tc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return na(),Tt(bn),Tt(un),Sh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return xh(e),null;case 13:if(Tt(Ct),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ae(340));ea()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Tt(Ct),null;case 4:return na(),null;case 10:return vh(e.type._context),null;case 22:case 23:return Dh(),null;case 24:return null;default:return null}}var Qo=!1,ln=!1,Hy=typeof WeakSet=="function"?WeakSet:Set,Se=null;function Ns(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Lt(t,e,i)}else n.current=null}function $d(t,e,n){try{n()}catch(i){Lt(t,e,i)}}var tm=!1;function Vy(t,e){if(Pd=Zl,t=D0(),dh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,u=0,f=t,h=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(o=a+r),f!==s||i!==0&&f.nodeType!==3||(l=a+i),f.nodeType===3&&(a+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===t)break t;if(h===n&&++c===r&&(o=a),h===s&&++u===i&&(l=a),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Id={focusedElem:t,selectionRange:n},Zl=!1,Se=e;Se!==null;)if(e=Se,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Se=t;else for(;Se!==null;){e=Se;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var g=_.memoizedProps,m=_.memoizedState,d=e.stateNode,v=d.getSnapshotBeforeUpdate(e.elementType===e.type?g:si(e.type,g),m);d.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var M=e.stateNode.containerInfo;M.nodeType===1?M.textContent="":M.nodeType===9&&M.documentElement&&M.removeChild(M.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ae(163))}}catch(y){Lt(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,Se=t;break}Se=e.return}return _=tm,tm=!1,_}function Qa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&$d(e,n,s)}r=r.next}while(r!==i)}}function Dc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function qd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Rv(t){var e=t.alternate;e!==null&&(t.alternate=null,Rv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[yi],delete e[ho],delete e[Nd],delete e[Ty],delete e[Ay])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Pv(t){return t.tag===5||t.tag===3||t.tag===4}function nm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Pv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Yd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ec));else if(i!==4&&(t=t.child,t!==null))for(Yd(t,e,n),t=t.sibling;t!==null;)Yd(t,e,n),t=t.sibling}function Kd(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Kd(t,e,n),t=t.sibling;t!==null;)Kd(t,e,n),t=t.sibling}var Jt=null,ai=!1;function Qi(t,e,n){for(n=n.child;n!==null;)Iv(t,e,n),n=n.sibling}function Iv(t,e,n){if(Si&&typeof Si.onCommitFiberUnmount=="function")try{Si.onCommitFiberUnmount(Tc,n)}catch{}switch(n.tag){case 5:ln||Ns(n,e);case 6:var i=Jt,r=ai;Jt=null,Qi(t,e,n),Jt=i,ai=r,Jt!==null&&(ai?(t=Jt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Jt.removeChild(n.stateNode));break;case 18:Jt!==null&&(ai?(t=Jt,n=n.stateNode,t.nodeType===8?gu(t.parentNode,n):t.nodeType===1&&gu(t,n),oo(t)):gu(Jt,n.stateNode));break;case 4:i=Jt,r=ai,Jt=n.stateNode.containerInfo,ai=!0,Qi(t,e,n),Jt=i,ai=r;break;case 0:case 11:case 14:case 15:if(!ln&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&$d(n,e,a),r=r.next}while(r!==i)}Qi(t,e,n);break;case 1:if(!ln&&(Ns(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Lt(n,e,o)}Qi(t,e,n);break;case 21:Qi(t,e,n);break;case 22:n.mode&1?(ln=(i=ln)||n.memoizedState!==null,Qi(t,e,n),ln=i):Qi(t,e,n);break;default:Qi(t,e,n)}}function im(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Hy),e.forEach(function(i){var r=Qy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function ti(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Jt=o.stateNode,ai=!1;break e;case 3:Jt=o.stateNode.containerInfo,ai=!0;break e;case 4:Jt=o.stateNode.containerInfo,ai=!0;break e}o=o.return}if(Jt===null)throw Error(ae(160));Iv(s,a,r),Jt=null,ai=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Lt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Lv(e,t),e=e.sibling}function Lv(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(ti(e,t),gi(t),i&4){try{Qa(3,t,t.return),Dc(3,t)}catch(g){Lt(t,t.return,g)}try{Qa(5,t,t.return)}catch(g){Lt(t,t.return,g)}}break;case 1:ti(e,t),gi(t),i&512&&n!==null&&Ns(n,n.return);break;case 5:if(ti(e,t),gi(t),i&512&&n!==null&&Ns(n,n.return),t.flags&32){var r=t.stateNode;try{io(r,"")}catch(g){Lt(t,t.return,g)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&e0(r,s),yd(o,a);var c=yd(o,s);for(a=0;a<l.length;a+=2){var u=l[a],f=l[a+1];u==="style"?s0(r,f):u==="dangerouslySetInnerHTML"?i0(r,f):u==="children"?io(r,f):Qf(r,u,f,c)}switch(o){case"input":md(r,s);break;case"textarea":t0(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ks(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?ks(r,!!s.multiple,s.defaultValue,!0):ks(r,!!s.multiple,s.multiple?[]:"",!1))}r[ho]=s}catch(g){Lt(t,t.return,g)}}break;case 6:if(ti(e,t),gi(t),i&4){if(t.stateNode===null)throw Error(ae(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(g){Lt(t,t.return,g)}}break;case 3:if(ti(e,t),gi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{oo(e.containerInfo)}catch(g){Lt(t,t.return,g)}break;case 4:ti(e,t),gi(t);break;case 13:ti(e,t),gi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Ih=Ut())),i&4&&im(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(ln=(c=ln)||u,ti(e,t),ln=c):ti(e,t),gi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(Se=t,u=t.child;u!==null;){for(f=Se=u;Se!==null;){switch(h=Se,p=h.child,h.tag){case 0:case 11:case 14:case 15:Qa(4,h,h.return);break;case 1:Ns(h,h.return);var _=h.stateNode;if(typeof _.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(g){Lt(i,n,g)}}break;case 5:Ns(h,h.return);break;case 22:if(h.memoizedState!==null){sm(f);continue}}p!==null?(p.return=h,Se=p):sm(f)}u=u.sibling}e:for(u=null,f=t;;){if(f.tag===5){if(u===null){u=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=f.stateNode,l=f.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=r0("display",a))}catch(g){Lt(t,t.return,g)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(g){Lt(t,t.return,g)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ti(e,t),gi(t),i&4&&im(t);break;case 21:break;default:ti(e,t),gi(t)}}function gi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Pv(n)){var i=n;break e}n=n.return}throw Error(ae(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(io(r,""),i.flags&=-33);var s=nm(t);Kd(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=nm(t);Yd(t,o,a);break;default:throw Error(ae(161))}}catch(l){Lt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Wy(t,e,n){Se=t,Dv(t)}function Dv(t,e,n){for(var i=(t.mode&1)!==0;Se!==null;){var r=Se,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Qo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||ln;o=Qo;var c=ln;if(Qo=a,(ln=l)&&!c)for(Se=r;Se!==null;)a=Se,l=a.child,a.tag===22&&a.memoizedState!==null?am(r):l!==null?(l.return=a,Se=l):am(r);for(;s!==null;)Se=s,Dv(s),s=s.sibling;Se=r,Qo=o,ln=c}rm(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Se=s):rm(t)}}function rm(t){for(;Se!==null;){var e=Se;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ln||Dc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!ln)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:si(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Hp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Hp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&oo(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ae(163))}ln||e.flags&512&&qd(e)}catch(h){Lt(e,e.return,h)}}if(e===t){Se=null;break}if(n=e.sibling,n!==null){n.return=e.return,Se=n;break}Se=e.return}}function sm(t){for(;Se!==null;){var e=Se;if(e===t){Se=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Se=n;break}Se=e.return}}function am(t){for(;Se!==null;){var e=Se;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Dc(4,e)}catch(l){Lt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Lt(e,r,l)}}var s=e.return;try{qd(e)}catch(l){Lt(e,s,l)}break;case 5:var a=e.return;try{qd(e)}catch(l){Lt(e,a,l)}}}catch(l){Lt(e,e.return,l)}if(e===t){Se=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Se=o;break}Se=e.return}}var jy=Math.ceil,dc=Yi.ReactCurrentDispatcher,Rh=Yi.ReactCurrentOwner,Kn=Yi.ReactCurrentBatchConfig,tt=0,Kt=null,Bt=null,en=0,Un=0,Us=Cr(0),Wt=0,Mo=null,es=0,Nc=0,Ph=0,Ja=null,En=null,Ih=0,ra=1/0,Di=null,fc=!1,Zd=null,Mr=null,Jo=!1,hr=null,hc=0,eo=0,Qd=null,Fl=-1,kl=0;function pn(){return tt&6?Ut():Fl!==-1?Fl:Fl=Ut()}function yr(t){return t.mode&1?tt&2&&en!==0?en&-en:Cy.transition!==null?(kl===0&&(kl=v0()),kl):(t=ut,t!==0||(t=window.event,t=t===void 0?16:w0(t.type)),t):1}function di(t,e,n,i){if(50<eo)throw eo=0,Qd=null,Error(ae(185));To(t,n,i),(!(tt&2)||t!==Kt)&&(t===Kt&&(!(tt&2)&&(Nc|=n),Wt===4&&cr(t,en)),Rn(t,i),n===1&&tt===0&&!(e.mode&1)&&(ra=Ut()+500,Pc&&Rr()))}function Rn(t,e){var n=t.callbackNode;CM(t,e);var i=Kl(t,t===Kt?en:0);if(i===0)n!==null&&mp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&mp(n),e===1)t.tag===0?by(om.bind(null,t)):V0(om.bind(null,t)),Ey(function(){!(tt&6)&&Rr()}),n=null;else{switch(_0(i)){case 1:n=ih;break;case 4:n=m0;break;case 16:n=Yl;break;case 536870912:n=g0;break;default:n=Yl}n=Gv(n,Nv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Nv(t,e){if(Fl=-1,kl=0,tt&6)throw Error(ae(327));var n=t.callbackNode;if(Vs()&&t.callbackNode!==n)return null;var i=Kl(t,t===Kt?en:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=pc(t,i);else{e=i;var r=tt;tt|=2;var s=Ov();(Kt!==t||en!==e)&&(Di=null,ra=Ut()+500,qr(t,e));do try{qy();break}catch(o){Uv(t,o)}while(!0);gh(),dc.current=s,tt=r,Bt!==null?e=0:(Kt=null,en=0,e=Wt)}if(e!==0){if(e===2&&(r=Td(t),r!==0&&(i=r,e=Jd(t,r))),e===1)throw n=Mo,qr(t,0),cr(t,i),Rn(t,Ut()),n;if(e===6)cr(t,i);else{if(r=t.current.alternate,!(i&30)&&!Xy(r)&&(e=pc(t,i),e===2&&(s=Td(t),s!==0&&(i=s,e=Jd(t,s))),e===1))throw n=Mo,qr(t,0),cr(t,i),Rn(t,Ut()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ae(345));case 2:Fr(t,En,Di);break;case 3:if(cr(t,i),(i&130023424)===i&&(e=Ih+500-Ut(),10<e)){if(Kl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){pn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Dd(Fr.bind(null,t,En,Di),e);break}Fr(t,En,Di);break;case 4:if(cr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-ui(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Ut()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*jy(i/1960))-i,10<i){t.timeoutHandle=Dd(Fr.bind(null,t,En,Di),i);break}Fr(t,En,Di);break;case 5:Fr(t,En,Di);break;default:throw Error(ae(329))}}}return Rn(t,Ut()),t.callbackNode===n?Nv.bind(null,t):null}function Jd(t,e){var n=Ja;return t.current.memoizedState.isDehydrated&&(qr(t,e).flags|=256),t=pc(t,e),t!==2&&(e=En,En=n,e!==null&&ef(e)),t}function ef(t){En===null?En=t:En.push.apply(En,t)}function Xy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!pi(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function cr(t,e){for(e&=~Ph,e&=~Nc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ui(e),i=1<<n;t[n]=-1,e&=~i}}function om(t){if(tt&6)throw Error(ae(327));Vs();var e=Kl(t,0);if(!(e&1))return Rn(t,Ut()),null;var n=pc(t,e);if(t.tag!==0&&n===2){var i=Td(t);i!==0&&(e=i,n=Jd(t,i))}if(n===1)throw n=Mo,qr(t,0),cr(t,e),Rn(t,Ut()),n;if(n===6)throw Error(ae(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Fr(t,En,Di),Rn(t,Ut()),null}function Lh(t,e){var n=tt;tt|=1;try{return t(e)}finally{tt=n,tt===0&&(ra=Ut()+500,Pc&&Rr())}}function ts(t){hr!==null&&hr.tag===0&&!(tt&6)&&Vs();var e=tt;tt|=1;var n=Kn.transition,i=ut;try{if(Kn.transition=null,ut=1,t)return t()}finally{ut=i,Kn.transition=n,tt=e,!(tt&6)&&Rr()}}function Dh(){Un=Us.current,Tt(Us)}function qr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Sy(n)),Bt!==null)for(n=Bt.return;n!==null;){var i=n;switch(hh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&tc();break;case 3:na(),Tt(bn),Tt(un),Sh();break;case 5:xh(i);break;case 4:na();break;case 13:Tt(Ct);break;case 19:Tt(Ct);break;case 10:vh(i.type._context);break;case 22:case 23:Dh()}n=n.return}if(Kt=t,Bt=t=xr(t.current,null),en=Un=e,Wt=0,Mo=null,Ph=Nc=es=0,En=Ja=null,Vr!==null){for(e=0;e<Vr.length;e++)if(n=Vr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Vr=null}return t}function Uv(t,e){do{var n=Bt;try{if(gh(),Nl.current=uc,cc){for(var i=Pt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}cc=!1}if(Jr=0,Yt=Vt=Pt=null,Za=!1,go=0,Rh.current=null,n===null||n.return===null){Wt=1,Mo=e,Bt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=en,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=o,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=qp(a);if(p!==null){p.flags&=-257,Yp(p,a,o,s,e),p.mode&1&&$p(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var g=new Set;g.add(l),e.updateQueue=g}else _.add(l);break e}else{if(!(e&1)){$p(s,c,e),Nh();break e}l=Error(ae(426))}}else if(At&&o.mode&1){var m=qp(a);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Yp(m,a,o,s,e),ph(ia(l,o));break e}}s=l=ia(l,o),Wt!==4&&(Wt=2),Ja===null?Ja=[s]:Ja.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=_v(s,l,e);Gp(s,d);break e;case 1:o=l;var v=s.type,M=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||M!==null&&typeof M.componentDidCatch=="function"&&(Mr===null||!Mr.has(M)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=Mv(s,o,e);Gp(s,y);break e}}s=s.return}while(s!==null)}kv(n)}catch(C){e=C,Bt===n&&n!==null&&(Bt=n=n.return);continue}break}while(!0)}function Ov(){var t=dc.current;return dc.current=uc,t===null?uc:t}function Nh(){(Wt===0||Wt===3||Wt===2)&&(Wt=4),Kt===null||!(es&268435455)&&!(Nc&268435455)||cr(Kt,en)}function pc(t,e){var n=tt;tt|=2;var i=Ov();(Kt!==t||en!==e)&&(Di=null,qr(t,e));do try{$y();break}catch(r){Uv(t,r)}while(!0);if(gh(),tt=n,dc.current=i,Bt!==null)throw Error(ae(261));return Kt=null,en=0,Wt}function $y(){for(;Bt!==null;)Fv(Bt)}function qy(){for(;Bt!==null&&!MM();)Fv(Bt)}function Fv(t){var e=zv(t.alternate,t,Un);t.memoizedProps=t.pendingProps,e===null?kv(t):Bt=e,Rh.current=null}function kv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Gy(n,e),n!==null){n.flags&=32767,Bt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Wt=6,Bt=null;return}}else if(n=zy(n,e,Un),n!==null){Bt=n;return}if(e=e.sibling,e!==null){Bt=e;return}Bt=e=t}while(e!==null);Wt===0&&(Wt=5)}function Fr(t,e,n){var i=ut,r=Kn.transition;try{Kn.transition=null,ut=1,Yy(t,e,n,i)}finally{Kn.transition=r,ut=i}return null}function Yy(t,e,n,i){do Vs();while(hr!==null);if(tt&6)throw Error(ae(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ae(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(RM(t,s),t===Kt&&(Bt=Kt=null,en=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Jo||(Jo=!0,Gv(Yl,function(){return Vs(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Kn.transition,Kn.transition=null;var a=ut;ut=1;var o=tt;tt|=4,Rh.current=null,Vy(t,n),Lv(n,t),my(Id),Zl=!!Pd,Id=Pd=null,t.current=n,Wy(n),yM(),tt=o,ut=a,Kn.transition=s}else t.current=n;if(Jo&&(Jo=!1,hr=t,hc=r),s=t.pendingLanes,s===0&&(Mr=null),EM(n.stateNode),Rn(t,Ut()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(fc)throw fc=!1,t=Zd,Zd=null,t;return hc&1&&t.tag!==0&&Vs(),s=t.pendingLanes,s&1?t===Qd?eo++:(eo=0,Qd=t):eo=0,Rr(),null}function Vs(){if(hr!==null){var t=_0(hc),e=Kn.transition,n=ut;try{if(Kn.transition=null,ut=16>t?16:t,hr===null)var i=!1;else{if(t=hr,hr=null,hc=0,tt&6)throw Error(ae(331));var r=tt;for(tt|=4,Se=t.current;Se!==null;){var s=Se,a=s.child;if(Se.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(Se=c;Se!==null;){var u=Se;switch(u.tag){case 0:case 11:case 15:Qa(8,u,s)}var f=u.child;if(f!==null)f.return=u,Se=f;else for(;Se!==null;){u=Se;var h=u.sibling,p=u.return;if(Rv(u),u===c){Se=null;break}if(h!==null){h.return=p,Se=h;break}Se=p}}}var _=s.alternate;if(_!==null){var g=_.child;if(g!==null){_.child=null;do{var m=g.sibling;g.sibling=null,g=m}while(g!==null)}}Se=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Se=a;else e:for(;Se!==null;){if(s=Se,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Qa(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,Se=d;break e}Se=s.return}}var v=t.current;for(Se=v;Se!==null;){a=Se;var M=a.child;if(a.subtreeFlags&2064&&M!==null)M.return=a,Se=M;else e:for(a=v;Se!==null;){if(o=Se,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Dc(9,o)}}catch(C){Lt(o,o.return,C)}if(o===a){Se=null;break e}var y=o.sibling;if(y!==null){y.return=o.return,Se=y;break e}Se=o.return}}if(tt=r,Rr(),Si&&typeof Si.onPostCommitFiberRoot=="function")try{Si.onPostCommitFiberRoot(Tc,t)}catch{}i=!0}return i}finally{ut=n,Kn.transition=e}}return!1}function lm(t,e,n){e=ia(n,e),e=_v(t,e,1),t=_r(t,e,1),e=pn(),t!==null&&(To(t,1,e),Rn(t,e))}function Lt(t,e,n){if(t.tag===3)lm(t,t,n);else for(;e!==null;){if(e.tag===3){lm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Mr===null||!Mr.has(i))){t=ia(n,t),t=Mv(e,t,1),e=_r(e,t,1),t=pn(),e!==null&&(To(e,1,t),Rn(e,t));break}}e=e.return}}function Ky(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=pn(),t.pingedLanes|=t.suspendedLanes&n,Kt===t&&(en&n)===n&&(Wt===4||Wt===3&&(en&130023424)===en&&500>Ut()-Ih?qr(t,0):Ph|=n),Rn(t,e)}function Bv(t,e){e===0&&(t.mode&1?(e=Vo,Vo<<=1,!(Vo&130023424)&&(Vo=4194304)):e=1);var n=pn();t=Wi(t,e),t!==null&&(To(t,e,n),Rn(t,n))}function Zy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Bv(t,n)}function Qy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ae(314))}i!==null&&i.delete(e),Bv(t,n)}var zv;zv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||bn.current)An=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return An=!1,By(t,e,n);An=!!(t.flags&131072)}else An=!1,At&&e.flags&1048576&&W0(e,rc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Ol(t,e),t=e.pendingProps;var r=Js(e,un.current);Hs(e,n),r=wh(null,e,i,t,r,n);var s=Th();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Cn(i)?(s=!0,nc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Mh(e),r.updater=Lc,e.stateNode=r,r._reactInternals=e,zd(e,i,t,n),e=Vd(null,e,i,!0,s,n)):(e.tag=0,At&&s&&fh(e),hn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Ol(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=ex(i),t=si(i,t),r){case 0:e=Hd(null,e,i,t,n);break e;case 1:e=Qp(null,e,i,t,n);break e;case 11:e=Kp(null,e,i,t,n);break e;case 14:e=Zp(null,e,i,si(i.type,t),n);break e}throw Error(ae(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:si(i,r),Hd(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:si(i,r),Qp(t,e,i,r,n);case 3:e:{if(Ev(e),t===null)throw Error(ae(387));i=e.pendingProps,s=e.memoizedState,r=s.element,K0(t,e),oc(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=ia(Error(ae(423)),e),e=Jp(t,e,i,n,r);break e}else if(i!==r){r=ia(Error(ae(424)),e),e=Jp(t,e,i,n,r);break e}else for(Fn=vr(e.stateNode.containerInfo.firstChild),kn=e,At=!0,oi=null,n=q0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ea(),i===r){e=ji(t,e,n);break e}hn(t,e,i,n)}e=e.child}return e;case 5:return Z0(e),t===null&&Fd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Ld(i,r)?a=null:s!==null&&Ld(i,s)&&(e.flags|=32),Sv(t,e),hn(t,e,a,n),e.child;case 6:return t===null&&Fd(e),null;case 13:return wv(t,e,n);case 4:return yh(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=ta(e,null,i,n):hn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:si(i,r),Kp(t,e,i,r,n);case 7:return hn(t,e,e.pendingProps,n),e.child;case 8:return hn(t,e,e.pendingProps.children,n),e.child;case 12:return hn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,vt(sc,i._currentValue),i._currentValue=a,s!==null)if(pi(s.value,a)){if(s.children===r.children&&!bn.current){e=ji(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=zi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),kd(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(ae(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),kd(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}hn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Hs(e,n),r=Zn(r),i=i(r),e.flags|=1,hn(t,e,i,n),e.child;case 14:return i=e.type,r=si(i,e.pendingProps),r=si(i.type,r),Zp(t,e,i,r,n);case 15:return yv(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:si(i,r),Ol(t,e),e.tag=1,Cn(i)?(t=!0,nc(e)):t=!1,Hs(e,n),vv(e,i,r),zd(e,i,r,n),Vd(null,e,i,!0,t,n);case 19:return Tv(t,e,n);case 22:return xv(t,e,n)}throw Error(ae(156,e.tag))};function Gv(t,e){return p0(t,e)}function Jy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,e,n,i){return new Jy(t,e,n,i)}function Uh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ex(t){if(typeof t=="function")return Uh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===eh)return 11;if(t===th)return 14}return 2}function xr(t,e){var n=t.alternate;return n===null?(n=Yn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Bl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")Uh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case Ts:return Yr(n.children,r,s,e);case Jf:a=8,r|=8;break;case ud:return t=Yn(12,n,e,r|2),t.elementType=ud,t.lanes=s,t;case dd:return t=Yn(13,n,e,r),t.elementType=dd,t.lanes=s,t;case fd:return t=Yn(19,n,e,r),t.elementType=fd,t.lanes=s,t;case Zg:return Uc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Yg:a=10;break e;case Kg:a=9;break e;case eh:a=11;break e;case th:a=14;break e;case ar:a=16,i=null;break e}throw Error(ae(130,t==null?t:typeof t,""))}return e=Yn(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Yr(t,e,n,i){return t=Yn(7,t,i,e),t.lanes=n,t}function Uc(t,e,n,i){return t=Yn(22,t,i,e),t.elementType=Zg,t.lanes=n,t.stateNode={isHidden:!1},t}function wu(t,e,n){return t=Yn(6,t,null,e),t.lanes=n,t}function Tu(t,e,n){return e=Yn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function tx(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=su(0),this.expirationTimes=su(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=su(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Oh(t,e,n,i,r,s,a,o,l){return t=new tx(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Yn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Mh(s),t}function nx(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ws,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Hv(t){if(!t)return Ar;t=t._reactInternals;e:{if(as(t)!==t||t.tag!==1)throw Error(ae(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Cn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ae(171))}if(t.tag===1){var n=t.type;if(Cn(n))return H0(t,n,e)}return e}function Vv(t,e,n,i,r,s,a,o,l){return t=Oh(n,i,!0,t,r,s,a,o,l),t.context=Hv(null),n=t.current,i=pn(),r=yr(n),s=zi(i,r),s.callback=e??null,_r(n,s,r),t.current.lanes=r,To(t,r,i),Rn(t,i),t}function Oc(t,e,n,i){var r=e.current,s=pn(),a=yr(r);return n=Hv(n),e.context===null?e.context=n:e.pendingContext=n,e=zi(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=_r(r,e,a),t!==null&&(di(t,r,a,s),Dl(t,r,a)),a}function mc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function cm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Fh(t,e){cm(t,e),(t=t.alternate)&&cm(t,e)}function ix(){return null}var Wv=typeof reportError=="function"?reportError:function(t){console.error(t)};function kh(t){this._internalRoot=t}Fc.prototype.render=kh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ae(409));Oc(t,e,null,null)};Fc.prototype.unmount=kh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ts(function(){Oc(null,t,null,null)}),e[Vi]=null}};function Fc(t){this._internalRoot=t}Fc.prototype.unstable_scheduleHydration=function(t){if(t){var e=x0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<lr.length&&e!==0&&e<lr[n].priority;n++);lr.splice(n,0,t),n===0&&E0(t)}};function Bh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function kc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function um(){}function rx(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=mc(a);s.call(c)}}var a=Vv(e,i,t,0,null,!1,!1,"",um);return t._reactRootContainer=a,t[Vi]=a.current,uo(t.nodeType===8?t.parentNode:t),ts(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=mc(l);o.call(c)}}var l=Oh(t,0,!1,null,null,!1,!1,"",um);return t._reactRootContainer=l,t[Vi]=l.current,uo(t.nodeType===8?t.parentNode:t),ts(function(){Oc(e,l,n,i)}),l}function Bc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=mc(a);o.call(l)}}Oc(e,a,t,r)}else a=rx(n,e,t,r,i);return mc(a)}M0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ga(e.pendingLanes);n!==0&&(rh(e,n|1),Rn(e,Ut()),!(tt&6)&&(ra=Ut()+500,Rr()))}break;case 13:ts(function(){var i=Wi(t,1);if(i!==null){var r=pn();di(i,t,1,r)}}),Fh(t,1)}};sh=function(t){if(t.tag===13){var e=Wi(t,134217728);if(e!==null){var n=pn();di(e,t,134217728,n)}Fh(t,134217728)}};y0=function(t){if(t.tag===13){var e=yr(t),n=Wi(t,e);if(n!==null){var i=pn();di(n,t,e,i)}Fh(t,e)}};x0=function(){return ut};S0=function(t,e){var n=ut;try{return ut=t,e()}finally{ut=n}};Sd=function(t,e,n){switch(e){case"input":if(md(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Rc(i);if(!r)throw Error(ae(90));Jg(i),md(i,r)}}}break;case"textarea":t0(t,n);break;case"select":e=n.value,e!=null&&ks(t,!!n.multiple,e,!1)}};l0=Lh;c0=ts;var sx={usingClientEntryPoint:!1,Events:[bo,Rs,Rc,a0,o0,Lh]},Ra={findFiberByHostInstance:Hr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ax={bundleType:Ra.bundleType,version:Ra.version,rendererPackageName:Ra.rendererPackageName,rendererConfig:Ra.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Yi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=f0(t),t===null?null:t.stateNode},findFiberByHostInstance:Ra.findFiberByHostInstance||ix,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var el=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!el.isDisabled&&el.supportsFiber)try{Tc=el.inject(ax),Si=el}catch{}}zn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sx;zn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Bh(e))throw Error(ae(200));return nx(t,e,null,n)};zn.createRoot=function(t,e){if(!Bh(t))throw Error(ae(299));var n=!1,i="",r=Wv;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Oh(t,1,!1,null,null,n,!1,i,r),t[Vi]=e.current,uo(t.nodeType===8?t.parentNode:t),new kh(e)};zn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ae(188)):(t=Object.keys(t).join(","),Error(ae(268,t)));return t=f0(e),t=t===null?null:t.stateNode,t};zn.flushSync=function(t){return ts(t)};zn.hydrate=function(t,e,n){if(!kc(e))throw Error(ae(200));return Bc(null,t,e,!0,n)};zn.hydrateRoot=function(t,e,n){if(!Bh(t))throw Error(ae(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=Wv;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=Vv(e,null,t,1,n??null,r,!1,s,a),t[Vi]=e.current,uo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new Fc(e)};zn.render=function(t,e,n){if(!kc(e))throw Error(ae(200));return Bc(null,t,e,!1,n)};zn.unmountComponentAtNode=function(t){if(!kc(t))throw Error(ae(40));return t._reactRootContainer?(ts(function(){Bc(null,null,t,!1,function(){t._reactRootContainer=null,t[Vi]=null})}),!0):!1};zn.unstable_batchedUpdates=Lh;zn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!kc(n))throw Error(ae(200));if(t==null||t._reactInternals===void 0)throw Error(ae(38));return Bc(t,e,n,!1,i)};zn.version="18.3.1-next-f1338f8080-20240426";function jv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jv)}catch(t){console.error(t)}}jv(),jg.exports=zn;var ox=jg.exports,dm=ox;ld.createRoot=dm.createRoot,ld.hydrateRoot=dm.hydrateRoot;const Ws=9.80665,Rt=6e5,Ro=384e10,gc=8e4,lx=11e3,cx=1.225,Xv=2*Math.PI/1800,js=32e5,Ui=16e4,zh=11e10,jr=55e4,fm=Math.sqrt(Ro/Math.pow(js,3)),Xs=65e5,_i=32e4,Gh=42e10,ux=45e3,dx=9e3,fx=.04,ur=9e5,hx=.43,hm=Math.sqrt(Ro/Math.pow(Xs,3))*.5,tf=24e5,to={x:1,y:0,z:0},px={1:6,3:15,5:25},Ti={EARTH_OBSERVATION:{id:"EARTH_OBSERVATION",title:"Earth Climate & Wildfire Sentinel",subtitle:"Low Earth Orbit (150 km) Multispectral Mapper",targetType:"LEO",targetDeltaVMs:3100,budgetCapM:175,scheduleLimitMonths:18,irradianceFactor:1,eclipseDurationSec:520,requiredPayloadMatch:"EARTH_OBSERVATION",requiredAdcsTier:1,requiresDeepSpaceAdcs:!1,requiresRadHardCpu:!1,requiredThermalTier:1,requiresHeatShield:!1,requiresLanderStructure:!1,targetScienceMb:300,orbitAltitudeTargetM:15e4,distanceCommsFactor:1,observationDutyCycle:.22,referencePeriodSec:1960,pros:["Lowest Δv & launch cost — Light launcher handles it cleanly","Full 100% solar irradiance & fast DSN ground passes","Short 18-month build & quick orbital insertion"],challenges:["Orbit below 80 km suffers rapid atmospheric drag & decay","Frequent Earth shadow eclipses drain undersized batteries","High-rate multispectral bursts overflow S-Band links"],beginnerBrief:"Put a climate-tracking camera into Low Earth Orbit above 100 km, keep power alive through Earth shadow, and beam 300 MB of imagery home.",realisticBrief:"Insert a multispectral EO bus into >100 km LEO (v_circ ≈ 2,310 m/s), balance 520 s eclipse DoD, and avoid buffer saturation via X-Band downlink."},SPACE_TELESCOPE:{id:"SPACE_TELESCOPE",title:"Deep-Space Infrared Observatory",subtitle:"High Earth Orbit (1,800 km) Cryogenic Telescope",targetType:"DEEP_SPACE_ORBIT",targetDeltaVMs:4100,budgetCapM:320,scheduleLimitMonths:24,irradianceFactor:1,eclipseDurationSec:360,requiredPayloadMatch:"SPACE_TELESCOPE",requiredAdcsTier:3,requiresDeepSpaceAdcs:!0,requiresRadHardCpu:!0,requiredThermalTier:2,requiresHeatShield:!1,requiresLanderStructure:!1,targetScienceMb:600,orbitAltitudeTargetM:tf-Rt,distanceCommsFactor:.8,observationDutyCycle:.25,referencePeriodSec:6e3,pros:["Minimal eclipse time in 1,800 km high orbit","Zero atmospheric drag once circularized","Massive science return per observation dwell"],challenges:["Demands arcsecond CMG pointing (Tier 3 ADCS) to avoid blurred stars","75 Mbps IR detector requires high-throughput OBC + Ka-Band downlink","Radiation belt exposure requires rad-hardened flight computer"],beginnerBrief:"Boost a giant infrared telescope 1,800 km above Earth with razor-sharp gyro pointing, radiation shielding, and ultra-fast Ka-Band radio.",realisticBrief:"Execute Hohmann transfer to r = 2,400 km (Δv ≈ 3,720 m/s), maintain Tier-3 CMG pointing stability, and clear 75 Mbps detector data via Ka-Band."},MOON_LANDING:{id:"MOON_LANDING",title:"Artemis Polar Ice Prospecting Lander",subtitle:"Lunar Transfer, Capture & Soft Touchdown",targetType:"MOON_SURFACE",targetDeltaVMs:4800,budgetCapM:330,scheduleLimitMonths:24,irradianceFactor:1,eclipseDurationSec:900,requiredPayloadMatch:"SURFACE_LANDER",requiredAdcsTier:2,requiresDeepSpaceAdcs:!0,requiresRadHardCpu:!0,requiredThermalTier:2,requiresHeatShield:!1,requiresLanderStructure:!0,targetScienceMb:400,orbitAltitudeTargetM:js-Rt,distanceCommsFactor:.65,observationDutyCycle:.16,referencePeriodSec:3600,pros:["No atmosphere to burn through — pure propulsive descent","Full 1.0x solar irradiance in sunlit lunar zones","Medium launcher reaches lunar orbit & touchdown cleanly"],challenges:["Needs reinforced lander legs for surface touchdown","Long 900 s lunar eclipses require deep battery reserves","Earth-Moon line-of-sight benefits strongly from Lunar Relay"],beginnerBrief:"Fly from Earth orbit to the Moon, brake gently onto the lunar surface with reinforced lander legs, drill ice samples, and radio 400 MB back.",realisticBrief:"Perform TLI to 3,200 km Moon orbit, capture inside Moon SOI (μ = 1.1e11), execute powered descent (<12 m/s touchdown), and sustain 900 s eclipse."},MARS_LANDING:{id:"MARS_LANDING",title:"Ares Astrobiology Surface Rover",subtitle:"Interplanetary Transfer, Aerobrake & Mars Landing",targetType:"MARS_SURFACE",targetDeltaVMs:6e3,budgetCapM:420,scheduleLimitMonths:30,irradianceFactor:hx,eclipseDurationSec:1200,requiredPayloadMatch:"SURFACE_LANDER",requiredAdcsTier:2,requiresDeepSpaceAdcs:!0,requiresRadHardCpu:!0,requiredThermalTier:3,requiresHeatShield:!0,requiresLanderStructure:!0,targetScienceMb:500,orbitAltitudeTargetM:Xs-Rt,distanceCommsFactor:.35,observationDutyCycle:.12,referencePeriodSec:4800,pros:["Mars upper atmosphere enables free aerobraking deceleration","Premier flagship science return across all subsystems"],challenges:["Sunlight drops to 43% (0.43x) — solar arrays lose over half their output","Atmospheric entry burns up any lander missing PICA-X heatshield","Heavy launcher + rad-hard computer + X/Ka-Band essential for deep space"],beginnerBrief:"Our toughest voyage: ride a Heavy rocket to Mars, survive fiery entry behind a heatshield, power through dim 43% sunlight with RTG nuclear power, and send 500 MB home.",realisticBrief:"Execute TMI to 6,500 km Mars SOI, survive 45 km atmospheric entry peak heating with aeroshell shield, manage 0.43x irradiance & 0.35x deep-space link margin."}},$v=[{id:"struct-micro-bus",name:"MicroSat Composite Frame",category:"structure",massKg:180,costM:10,leadMonths:2,drawW:0,maxPayloadKg:180,structuralIntegrity:1,beginnerDesc:"Featherweight satellite frame for Earth orbit. Too fragile for landing.",realisticDesc:"180 kg carbon-honeycomb bus; 180 kg payload cap; Tier-1 structural load (no landing struts)."},{id:"struct-modular-bus",name:"Modular Hex Bus",category:"structure",massKg:320,costM:20,leadMonths:4,drawW:0,maxPayloadKg:350,structuralIntegrity:2,beginnerDesc:"Sturdy mid-weight octagonal spacecraft frame built for large telescopes.",realisticDesc:"320 kg Al-Li hex frame; 350 kg payload cap; Tier-2 stiffness for precision optical benches."},{id:"struct-lander-chassis",name:"Reinforced Lander Chassis",category:"structure",massKg:480,costM:34,leadMonths:6,drawW:0,maxPayloadKg:600,structuralIntegrity:3,beginnerDesc:"Heavy-duty spacecraft frame with crushable landing legs for Moon or Mars.",realisticDesc:"480 kg Ti-6Al-4V chassis with 4-leg shock attenuation; 600 kg payload cap; Tier-3 landing rated."},{id:"power-small-solar",name:"Compact Solar Wings",category:"power",massKg:45,costM:8,leadMonths:1,drawW:0,baseOutputW:220,isSolar:!0,beginnerDesc:"Light fold-out solar panels. Great near Earth, weak out at Mars.",realisticDesc:"220 W BOL @ 1 AU (0 W in eclipse; 94.6 W @ Mars 0.43x irradiance); 45 kg."},{id:"power-large-solar",name:"High-Area Deployable Arrays",category:"power",massKg:110,costM:18,leadMonths:3,drawW:0,baseOutputW:560,isSolar:!0,beginnerDesc:"Huge high-efficiency solar wings for hungry telescopes or lunar craft.",realisticDesc:"560 W BOL @ 1 AU (0 W in eclipse; 240.8 W @ Mars 0.43x irradiance); 110 kg."},{id:"power-rtg",name:"Multi-Mission RTG Nuclear",category:"power",massKg:140,costM:42,leadMonths:5,drawW:0,baseOutputW:280,isSolar:!1,beginnerDesc:"Pu-238 nuclear battery that outputs steady 280 W day and night—even at Mars!",realisticDesc:"280 W continuous radioisotope thermoelectric generator (100% duty in eclipse & Mars); 140 kg."},{id:"bat-liion-small",name:"Small Li-Ion Pack",category:"battery",massKg:15,costM:5,leadMonths:1,drawW:0,capacityWh:35,beginnerDesc:"Tiny backup battery (35 Wh) for quick LEO passes or RTG-powered missions.",realisticDesc:"35 Wh secondary Li-Ion cell stack; 15 kg; insufficient for long deep-space eclipses."},{id:"bat-liion-med",name:"Dual-Bus Li-Ion Bank",category:"battery",massKg:60,costM:12,leadMonths:2,drawW:0,capacityWh:520,beginnerDesc:"Balanced energy storage to keep instruments alive through orbital night.",realisticDesc:"520 Wh redundant dual-string Li-Ion bank; handles LEO & HEO eclipses cleanly; 60 kg."},{id:"bat-solid-state",name:"High-Density Solid-State Bank",category:"battery",massKg:95,costM:22,leadMonths:4,drawW:0,capacityWh:1100,beginnerDesc:"Massive energy reserve built to survive freezing 15-minute lunar nights.",realisticDesc:"1,100 Wh solid-state cold-rated bank for high-draw lunar/deep-space eclipses; 95 kg."},{id:"cpu-basic-mcu",name:"COTS Flight MCU",category:"computer",massKg:12,costM:4,leadMonths:1,drawW:18,maxDataMbps:30,storageMb:450,radHardened:!1,beginnerDesc:"Cheap Earth-orbit processor. Can glitch in deep-space radiation and holds small memory.",realisticDesc:"30 Mbps bus, 450 MB flash, unshielded COTS silicon (SEU risk beyond LEO); 18 W."},{id:"cpu-radhard-obc",name:"Rad-Hardened Flight OBC",category:"computer",massKg:28,costM:16,leadMonths:3,drawW:32,maxDataMbps:60,storageMb:2400,radHardened:!0,beginnerDesc:"Space-hardened computer immune to cosmic radiation with big 2.4 GB buffer.",realisticDesc:"60 Mbps ECC bus, 2,400 MB rad-tolerant buffer, triple-modular redundancy; 32 W."},{id:"cpu-ai-edge",name:"Deep-Space AI Edge Processor",category:"computer",massKg:42,costM:28,leadMonths:5,drawW:55,maxDataMbps:160,storageMb:8e3,radHardened:!0,beginnerDesc:"Ultra-fast rad-hard supercomputer for giant telescopes and autonomous Mars landings.",realisticDesc:"160 Mbps DMA bus, 8,000 MB NVM buffer, rad-hardened vision/EDL co-processor; 55 W."},{id:"adcs-magnetorquer",name:"Magnetorquer + Sun Sensor",category:"adcs",massKg:15,costM:5,leadMonths:1,drawW:12,pointingTier:1,deepSpaceCapable:!1,beginnerDesc:"Simple magnetic steering coils. Works only close to Earth; useless near Moon/Mars.",realisticDesc:"Tier-1 (1.5°); 3-axis torque rods requiring Earth magnetosphere (LEO only); 12 W."},{id:"adcs-reaction-wheels",name:"Reaction Wheels + Star Tracker",category:"adcs",massKg:38,costM:16,leadMonths:3,drawW:30,pointingTier:2,deepSpaceCapable:!0,beginnerDesc:"Spinning gyro wheels & star camera for steady deep-space navigation and landings.",realisticDesc:"Tier-2 (0.05°); 4-wheel skewed assembly + optical star tracker; deep-space rated; 30 W."},{id:"adcs-cmg-precision",name:"Dual CMG + Laser IMU",category:"adcs",massKg:68,costM:30,leadMonths:4,drawW:52,pointingTier:3,deepSpaceCapable:!0,beginnerDesc:"Arcsecond precision gyroscopes needed so space telescopes stay rock-steady.",realisticDesc:"Tier-3 (0.002°); control moment gyros + ring-laser IMU for diffraction-limited optics; 52 W."},{id:"thermal-passive-mli",name:"Passive MLI Gold Blankets",category:"thermal",massKg:18,costM:4,leadMonths:1,drawW:10,thermalTier:1,heatShield:!1,beginnerDesc:"Foil insulation blankets for mild Earth orbit. Cannot survive deep-space cold or entry.",realisticDesc:"Tier-1 Kapton MLI; adequate for LEO only; no radiator louvers or aeroshell; 10 W."},{id:"thermal-active-louvers",name:"Active Heat Pipes & Louvers",category:"thermal",massKg:45,costM:14,leadMonths:2,drawW:25,thermalTier:2,heatShield:!1,beginnerDesc:"Active cooling & heating loops built for Lunar and deep-space temperature swings.",realisticDesc:"Tier-2 variable-conductance heat pipes + mechanical louvers; Moon/HEO rated; 25 W."},{id:"thermal-heavy-rad-shield",name:"PICA-X Aeroshell & Cryo Shield",category:"thermal",massKg:125,costM:28,leadMonths:4,drawW:35,thermalTier:3,heatShield:!0,beginnerDesc:"Armored ablative heatshield essential to survive fiery atmospheric entry at Mars.",realisticDesc:"Tier-3 phenolic-impregnated carbon ablator heatshield + deep-space MLI; Mars EDL rated; 35 W."},{id:"payload-eo-camera",name:"Multispectral Earth Imager",category:"payload",massKg:75,costM:18,leadMonths:3,drawW:45,dataRateMbps:28,missionMatch:"EARTH_OBSERVATION",beginnerDesc:"High-res Earth climate & wildfire camera.",realisticDesc:"28 Mbps pushbroom VNIR/SWIR mapper; 75 kg; 45 W; Earth Observation mission."},{id:"payload-ir-telescope",name:"Cryogenic IR Space Telescope",category:"payload",massKg:210,costM:46,leadMonths:6,drawW:90,dataRateMbps:75,missionMatch:"SPACE_TELESCOPE",beginnerDesc:"Massive cooled mirror array for peering at distant galaxies.",realisticDesc:"75 Mbps HgCdTe focal plane; 210 kg; 90 W; requires Tier-3 ADCS; Space Telescope mission."},{id:"payload-surface-lander",name:"Autonomous Drill & ChemCam Lab",category:"payload",massKg:195,costM:38,leadMonths:5,drawW:65,dataRateMbps:36,missionMatch:"SURFACE_LANDER",beginnerDesc:"Robotic core drill & laser spectrometer for Moon or Mars surface science.",realisticDesc:"36 Mbps LIBS spectrometer + regolith drill; 195 kg; 65 W; Moon & Mars surface missions."}],on=Object.fromEntries($v.map(t=>[t.id,t])),qv=[{id:"launcher-light",name:"Vega-L SmallSat Launcher",costM:38,leadMonths:4,stage1DryKg:1100,stage1PropKg:7200,stage1ThrustN:26e4,stage1IspS:150,stage2DryKg:380,stage2PropKg:2400,stage2ThrustN:6e4,stage2IspS:195,beginnerDesc:"Affordable light rocket (~4,010 m/s Δv) perfect for Earth orbit satellites.",realisticDesc:"2-stage kerolox light vehicle: 260 kN S1 / 60 kN S2; ~4.01 km/s Δv @ 450 kg payload."},{id:"launcher-medium",name:"Falcon-M Medium Lift",costM:72,leadMonths:6,stage1DryKg:2400,stage1PropKg:18e3,stage1ThrustN:62e4,stage1IspS:165,stage2DryKg:680,stage2PropKg:6200,stage2ThrustN:145e3,stage2IspS:270,beginnerDesc:"Dependable workhorse rocket (~5,850 m/s Δv) built for Moon landers & telescopes.",realisticDesc:"2-stage reusable-class medium lift: 620 kN S1 / 145 kN S2; ~5.85 km/s Δv @ 1,000 kg."},{id:"launcher-heavy",name:"Ares-H Heavy Interplanetary",costM:125,leadMonths:8,stage1DryKg:4200,stage1PropKg:34e3,stage1ThrustN:118e4,stage1IspS:185,stage2DryKg:1150,stage2PropKg:11500,stage2ThrustN:255e3,stage2IspS:275,beginnerDesc:"Colossal interplanetary booster (~6,850 m/s Δv) with muscle to reach Mars.",realisticDesc:"2-stage heavy hydrolox upper stage: 1.18 MN S1 / 255 kN S2; ~6.85 km/s Δv @ 1,100 kg."}],zc=Object.fromEntries(qv.map(t=>[t.id,t])),Gc=[{id:"goldstone",name:"DSN Goldstone (California)",latDeg:35.4,lonDeg:-116.9,costM:0,leadMonths:0,minElevationDeg:5,beginnerDesc:"Included NASA deep-space dish covering North America & Pacific passes.",realisticDesc:"70m DSS-14 complex (35.4°N, 116.9°W); 5° horizon mask; baseline NASA allocation."},{id:"madrid",name:"DSN Madrid (Spain)",latDeg:40.4,lonDeg:-4.2,costM:0,leadMonths:0,minElevationDeg:5,beginnerDesc:"Included NASA dish covering Europe, Africa & Atlantic passes.",realisticDesc:"70m DSS-63 complex (40.4°N, 4.2°W); 5° horizon mask; baseline NASA allocation."},{id:"canberra",name:"DSN Canberra (Australia)",latDeg:-35.4,lonDeg:149,costM:0,leadMonths:0,minElevationDeg:5,beginnerDesc:"Included Southern Hemisphere NASA dish completing global longitude coverage.",realisticDesc:"70m DSS-43 complex (35.4°S, 149.0°E); 5° horizon mask; baseline NASA allocation."},{id:"svalbard",name:"Svalbard Polar Station (Norway)",latDeg:78.2,lonDeg:15.4,costM:14,leadMonths:2,minElevationDeg:5,beginnerDesc:"High-latitude Arctic dish adding frequent polar & LEO contact passes.",realisticDesc:"SvalSat 78.2°N polar gateway; +18% LEO contact duty cycle; $14M / +2 mo."},{id:"lunar-relay",name:"Lunar Orbital Relay Constellation",latDeg:0,lonDeg:0,costM:24,leadMonths:3,isOrbitalRelay:!0,minElevationDeg:0,beginnerDesc:"Dedicated relay satellites keeping continuous line-of-sight to deep space & the Moon.",realisticDesc:"Cis-lunar relay mesh providing continuous deep-space & far-side visibility; $24M / +3 mo."}],Hc=Object.fromEntries(Gc.map(t=>[t.id,t])),ma={S_BAND:{id:"S_BAND",name:"S-Band (2.2 GHz)",bandwidthMbps:8,costM:0,leadMonths:0,drawW:15,beginnerDesc:"Basic low-speed radio (8 Mbps). Free, but high-res cameras can overflow memory!",realisticDesc:"8 Mbps S-band TT&C transceiver; 15 W RF draw; $0M / 0 mo; prone to science backlog."},X_BAND:{id:"X_BAND",name:"X-Band (8.4 GHz)",bandwidthMbps:45,costM:12,leadMonths:2,drawW:35,beginnerDesc:"Fast science radio (45 Mbps) ideal for Earth cameras, Moon landers & Mars.",realisticDesc:"45 Mbps X-band high-gain dish; 35 W RF draw; $12M / +2 mo; standard deep-space link."},KA_BAND:{id:"KA_BAND",name:"Ka-Band (32 GHz)",bandwidthMbps:120,costM:26,leadMonths:4,drawW:60,beginnerDesc:"Blazing-fast laser-grade radio (120 Mbps) built for massive space telescope data.",realisticDesc:"120 Mbps Ka-band phased array; 60 W RF draw; $26M / +4 mo; clears 75 Mbps IR imagers."}},mx={EARTH_OBSERVATION:{structureId:"struct-micro-bus",powerId:"power-small-solar",batteryId:"bat-liion-med",computerId:"cpu-radhard-obc",adcsId:"adcs-reaction-wheels",thermalId:"thermal-passive-mli",payloadId:"payload-eo-camera",launcherId:"launcher-light"},SPACE_TELESCOPE:{structureId:"struct-modular-bus",powerId:"power-large-solar",batteryId:"bat-liion-med",computerId:"cpu-ai-edge",adcsId:"adcs-cmg-precision",thermalId:"thermal-active-louvers",payloadId:"payload-ir-telescope",launcherId:"launcher-medium"},MOON_LANDING:{structureId:"struct-lander-chassis",powerId:"power-large-solar",batteryId:"bat-solid-state",computerId:"cpu-radhard-obc",adcsId:"adcs-reaction-wheels",thermalId:"thermal-active-louvers",payloadId:"payload-surface-lander",launcherId:"launcher-medium"},MARS_LANDING:{structureId:"struct-lander-chassis",powerId:"power-rtg",batteryId:"bat-liion-med",computerId:"cpu-ai-edge",adcsId:"adcs-reaction-wheels",thermalId:"thermal-heavy-rad-shield",payloadId:"payload-surface-lander",launcherId:"launcher-heavy"}},gx={EARTH_OBSERVATION:{activeStationIds:["goldstone","madrid","canberra"],bandId:"X_BAND",plannedLifetimeYears:1},SPACE_TELESCOPE:{activeStationIds:["goldstone","madrid","canberra"],bandId:"KA_BAND",plannedLifetimeYears:3},MOON_LANDING:{activeStationIds:["goldstone","madrid","canberra","lunar-relay"],bandId:"X_BAND",plannedLifetimeYears:1},MARS_LANDING:{activeStationIds:["goldstone","madrid","canberra","lunar-relay"],bandId:"X_BAND",plannedLifetimeYears:3}};function vx(t,e){if(t.length===0)return e;const n=Math.max(...t.map(r=>r.leadMonths)),i=t.reduce((r,s)=>r+s.leadMonths,0);return n+Math.ceil(i*.2)+e}function ga(t,e,n,i){const r=Ti[t],s=e.structureId?on[e.structureId]:void 0,a=e.powerId?on[e.powerId]:void 0,o=e.batteryId?on[e.batteryId]:void 0,l=e.computerId?on[e.computerId]:void 0,c=e.adcsId?on[e.adcsId]:void 0,u=e.thermalId?on[e.thermalId]:void 0,f=e.payloadId?on[e.payloadId]:void 0,h=e.launcherId?zc[e.launcherId]:void 0,p=[s,a,o,l,c,u,f].filter(de=>!!de),_=p.length===7&&!!h,g=[],m=p.reduce((de,je)=>de+je.massKg,0),d=p.filter(de=>de.category!=="structure").reduce((de,je)=>de+je.massKg,0);let v=0,M=0,y=m,C=0,w=0,A=0;if(h){v=h.stage1DryKg+h.stage1PropKg,M=h.stage2DryKg+h.stage2PropKg,y=v+M+m,C=h.stage1ThrustN/(y*Ws);const de=y,je=y-h.stage1PropKg;w=h.stage1IspS*Ws*Math.log(de/je);const Xe=M+m,mt=h.stage2DryKg+m;A=h.stage2IspS*Ws*Math.log(Xe/mt)}const b=w+A,E=i?ma[i.bandId].drawW:15,P=p.reduce((de,je)=>de+je.drawW,0)+E;let B=0,H=0;a&&a.baseOutputW!==void 0&&(a.isSolar?(B=a.baseOutputW*r.irradianceFactor,H=0):(B=a.baseOutputW,H=a.baseOutputW));const Y=B-P,z=Math.max(0,P-H)*r.eclipseDurationSec/3600,K=(o==null?void 0:o.capacityWh)??0,D=(f==null?void 0:f.dataRateMbps)??0,Q=(l==null?void 0:l.maxDataMbps)??0,J=(l==null?void 0:l.storageMb)??0,$=p.reduce((de,je)=>de+je.costM,0),N=(h==null?void 0:h.costM)??0,ce=$+N,G=vx(p,(h==null?void 0:h.leadMonths)??0);if(s){const de=s.maxPayloadKg??0;f&&f.massKg>de&&g.push({id:"struct-payload-overload",severity:"CRITICAL",resource:"mass",affectedCategory:"structure",beginnerMessage:`Instrument (${f.massKg} kg) is too heavy for ${s.name} (max ${de} kg).`,realisticMessage:`Payload mass ${f.massKg} kg exceeds ${s.name} structural rating (${de} kg).`}),r.requiresLanderStructure&&(s.structuralIntegrity??0)<2&&g.push({id:"struct-no-landing-legs",severity:"CRITICAL",resource:"mass",affectedCategory:"structure",beginnerMessage:`${s.name} has no landing legs — it will smash on ${r.targetType==="MOON_SURFACE"?"the Moon":"Mars"}!`,realisticMessage:`Surface touchdown requires Tier >= 2 landing-strut chassis; ${s.name} is Tier 1.`})}a&&(B<P?g.push({id:"power-deficit",severity:"CRITICAL",resource:"power",affectedCategory:"power",beginnerMessage:`Not enough power! Subsystems need ${P} W, but ${a.name} only makes ${B.toFixed(0)} W here.`,realisticMessage:`Sunlit power deficit: ${B.toFixed(1)} W gen < ${P} W load at ${r.irradianceFactor}x irradiance.`}):Y<P*.15&&g.push({id:"power-low-margin",severity:"WARNING",resource:"power",affectedCategory:"power",beginnerMessage:`Power margin is razor-thin (+${Y.toFixed(0)} W). Battery will recharge very slowly.`,realisticMessage:`Low sunlit recharge margin (+${Y.toFixed(1)} W < 15% of load); consider higher-output power or RTG.`})),o&&(K<z?g.push({id:"battery-eclipse-blackout",severity:"CRITICAL",resource:"power",affectedCategory:"battery",beginnerMessage:`Battery (${K} Wh) will run flat during the ${r.eclipseDurationSec}s shadow (needs ${z.toFixed(0)} Wh)!`,realisticMessage:`Eclipse energy shortfall: ${K} Wh < ${z.toFixed(1)} Wh required for ${r.eclipseDurationSec}s umbra.`}):K<z*1.25&&z>0&&g.push({id:"battery-tight-dod",severity:"WARNING",resource:"power",affectedCategory:"battery",beginnerMessage:`Battery reserves are tight for shadow crossings (${K} Wh vs ${z.toFixed(0)} Wh needed).`,realisticMessage:"High eclipse Depth-of-Discharge (>80% DoD); consider larger battery bank for margin."})),l&&(f&&D>Q&&g.push({id:"cpu-bottleneck",severity:"CRITICAL",resource:"data",affectedCategory:"computer",beginnerMessage:`${f.name} pumps ${D} Mbps, choking ${l.name} (${Q} Mbps max)!`,realisticMessage:`Data bus bottleneck: payload ${D} Mbps > ${l.name} ${Q} Mbps DMA limit.`}),r.requiresRadHardCpu&&!l.radHardened&&g.push({id:"cpu-radiation-risk",severity:"CRITICAL",resource:"data",affectedCategory:"computer",beginnerMessage:`${l.name} isn't radiation-shielded and will crash in deep space!`,realisticMessage:"Non-rad-hard COTS MCU exposed to Van Allen / deep-space SEU faults; rad-hard OBC required."})),c&&(r.requiresDeepSpaceAdcs&&!c.deepSpaceCapable?g.push({id:"adcs-no-mag-field",severity:"CRITICAL",resource:"comms",affectedCategory:"adcs",beginnerMessage:"Magnetorquers only steer near Earth's magnetic field — useless for this deep-space flight!",realisticMessage:`${c.name} requires planetary magnetosphere; ineffective beyond LEO.`}):(c.pointingTier??0)<r.requiredAdcsTier&&g.push({id:"adcs-pointing-insufficient",severity:"CRITICAL",resource:"comms",affectedCategory:"adcs",beginnerMessage:`Pointing isn't steady enough! This mission needs Tier ${r.requiredAdcsTier} precision (${r.id==="SPACE_TELESCOPE"?"CMG Gyros":"Reaction Wheels"}).`,realisticMessage:`ADCS Tier ${c.pointingTier??0} fails mission pointing jitter limit (requires Tier ${r.requiredAdcsTier}).`})),u&&(r.requiresHeatShield&&!u.heatShield?g.push({id:"thermal-missing-heatshield",severity:"CRITICAL",resource:"mass",affectedCategory:"thermal",beginnerMessage:"Mars entry burns at thousands of degrees — you MUST equip the PICA-X Heatshield!",realisticMessage:"Mars EDL atmospheric entry at 45 km without ablative heatshield causes catastrophic structural burn-up."}):(u.thermalTier??0)<r.requiredThermalTier&&g.push({id:"thermal-insufficient",severity:"CRITICAL",resource:"power",affectedCategory:"thermal",beginnerMessage:`${u.name} cannot survive deep-space temperature extremes here.`,realisticMessage:`Thermal control Tier ${u.thermalTier??0} below mission Tier ${r.requiredThermalTier} requirement.`})),f&&f.missionMatch!==r.requiredPayloadMatch&&g.push({id:"payload-mismatch",severity:"CRITICAL",resource:"data",affectedCategory:"payload",beginnerMessage:`${f.name} is the wrong instrument for ${r.title}!`,realisticMessage:`Payload ${f.id} (${f.missionMatch}) does not satisfy mission objective (${r.requiredPayloadMatch}).`}),h&&(C<1.05&&g.push({id:"launcher-twr-low",severity:"CRITICAL",resource:"mass",affectedCategory:"launcher",beginnerMessage:`Rocket is too weak to lift off the pad! (Thrust-to-Weight ${C.toFixed(2)} < 1.05).`,realisticMessage:`Insufficient liftoff TWR (${C.toFixed(2)} < 1.05); vehicle remains grounded on pad.`}),b<r.targetDeltaVMs&&g.push({id:"launcher-deltav-short",severity:"CRITICAL",resource:"mass",affectedCategory:"launcher",beginnerMessage:`Not enough fuel/Δv! Rocket provides ${b.toFixed(0)} m/s, mission needs ${r.targetDeltaVMs} m/s.`,realisticMessage:`Δv shortfall: ${b.toFixed(0)} m/s available < ${r.targetDeltaVMs} m/s mission budget.`})),ce>r.budgetCapM&&g.push({id:"budget-craft-over-cap",severity:"CRITICAL",resource:"budget",affectedCategory:"launcher",beginnerMessage:`Spacecraft + Rocket ($${ce}M) already blows past the $${r.budgetCapM}M budget!`,realisticMessage:`Hardware capex $${ce}M exceeds campaign ceiling $${r.budgetCapM}M before ground segment.`}),G>r.scheduleLimitMonths&&g.push({id:"schedule-craft-over-cap",severity:"CRITICAL",resource:"time",affectedCategory:"launcher",beginnerMessage:`Build time (${G} mo) misses the ${r.scheduleLimitMonths}-month launch window!`,realisticMessage:`Integration lead time (${G} mo) exceeds ${r.scheduleLimitMonths}-month launch window deadline.`});const X=g.filter(de=>de.severity==="CRITICAL").length,le=g.filter(de=>de.severity==="WARNING").length;let ne="HAPPY",se="All subsystems green! Ready for Ground Segment & Launch.";return _?X>0?(ne="ALERT",se=`${X} critical engineering conflict(s) detected — fix before launch!`):le>0&&(ne="CONCERNED",se=`Launchable with ${le} margin warning(s) — check Kap's telemetry notes.`):(ne=X>0?"ALERT":"CONCERNED",se=X>0?`${X} critical issue(s) spotted — finish selecting all parts and resolve alerts.`:"Select all 7 spacecraft subsystems plus a Launch Vehicle to complete assembly."),{isComplete:_,isLaunchable:_&&X===0,kapMood:ne,kapHeadline:se,conflicts:g,mass:{spacecraftDryKg:m,payloadPlusSubsystemsKg:d,stage1TotalKg:v,stage2TotalKg:M,launchTotalMassKg:y,padTwr:C,stage1DeltaVMs:w,stage2DeltaVMs:A,totalDeltaVMs:b},power:{sunlitGenerationW:B,eclipseGenerationW:H,totalDrawW:P,netSunlitW:Y,eclipseDurationSec:r.eclipseDurationSec,requiredEclipseWh:z,batteryWh:K},data:{payloadDataRateMbps:D,cpuMaxMbps:Q,storageMaxMb:J},budget:{craftCostM:$,launcherCostM:N,totalCraftAndLauncherM:ce},schedule:{buildMonths:G}}}function _x(t,e,n){if(t.length===0)return 0;const i=Array.from(new Set(t));let r=0;const s=n==="LEO"||e<5e5;for(const a of i){const o=Hc[a];o&&(o.isOrbitalRelay?r+=s?12:35:a==="svalbard"?r+=s?18:8:r+=s?14:18.5)}return Math.min(96,Math.round(r*10)/10)}function Vc(t,e,n,i){const r=Ti[t],s=ga(t,e,i,n),a=ma[n.bandId],o=Array.from(new Set(n.activeStationIds)).map(x=>Hc[x]).filter(Boolean),l=_x(n.activeStationIds,r.orbitAltitudeTargetM,r.targetType),c=Math.round(l/100*r.referencePeriodSec),f=s.data.payloadDataRateMbps*r.observationDutyCycle*r.referencePeriodSec/8,p=a.bandwidthMbps*r.distanceCommsFactor*c/8;let _="NONE";l===0||p<f*.9?_="CRITICAL":p<f*1.15&&(_="WARNING");const m=o.reduce((x,P)=>x+P.costM,0)+a.costM,d=px[n.plannedLifetimeYears],v=s.budget.totalCraftAndLauncherM+m+d,M=o.reduce((x,P)=>x+P.leadMonths,0),y=a.leadMonths+M,C=s.schedule.buildMonths+y,w=[...s.conflicts];o.length===0&&w.push({id:"ground-no-stations",severity:"CRITICAL",resource:"comms",affectedCategory:"ground",beginnerMessage:"No ground stations active! Your spacecraft will never be able to call home.",realisticMessage:"Zero DSN apertures allocated; 0% downlink duty cycle."}),_==="CRITICAL"&&o.length>0?w.push({id:"ground-buffer-overflow",severity:"CRITICAL",resource:"data",affectedCategory:"ground",beginnerMessage:`Radio too slow! ${a.name} only downloads ${p.toFixed(0)} MB/orbit while your camera makes ${f.toFixed(0)} MB/orbit — upgrade to X-Band or Ka-Band!`,realisticMessage:`Downlink deficit: ${p.toFixed(0)} MB/orbit < ${f.toFixed(0)} MB/orbit science generation; onboard buffer will saturate & drop packets.`}):_==="WARNING"&&w.push({id:"ground-tight-margin",severity:"WARNING",resource:"comms",affectedCategory:"ground",beginnerMessage:`Radio link margin is tight (${p.toFixed(0)} MB downlink vs ${f.toFixed(0)} MB/orbit). Adding another dish or faster band helps.`,realisticMessage:"Slim link margin (<15% downlink headroom); consider higher band or polar/relay aperture."}),v>r.budgetCapM&&(w.some(P=>P.id==="budget-craft-over-cap")||w.push({id:"budget-campaign-over-cap",severity:"CRITICAL",resource:"budget",affectedCategory:"ground",beginnerMessage:`Total campaign cost ($${v}M) exceeds the $${r.budgetCapM}M NASA budget!`,realisticMessage:`Total campaign EAC $${v}M exceeds $${r.budgetCapM}M cap (Craft $${s.budget.totalCraftAndLauncherM}M + Ground $${m}M + Ops $${d}M).`})),C>r.scheduleLimitMonths&&(w.some(P=>P.id==="schedule-craft-over-cap")||w.push({id:"schedule-campaign-over-cap",severity:"CRITICAL",resource:"time",affectedCategory:"ground",beginnerMessage:`Campaign timeline (${C} mo) misses the ${r.scheduleLimitMonths}-month launch window!`,realisticMessage:`Total campaign integration (${C} mo) misses ${r.scheduleLimitMonths}-month planetary/orbital window.`}));const A=w.filter(x=>x.severity==="CRITICAL").length,b=s.isComplete&&A===0;let E="Ground & Spacecraft integrated within budget, schedule, and link margin. Greenlit for Launch!";if(b)_==="WARNING"&&(E="Launch cleared, though link margin is tight — watch onboard memory during orbital passes.");else{const x=w.find(P=>P.severity==="CRITICAL");E=x?i==="BEGINNER"?x.beginnerMessage:x.realisticMessage:"Finish spacecraft assembly before launch clearance."}return{contactCoveragePct:l,contactSecPerOrbit:c,dataGeneratedPerOrbitMb:f,downlinkCapacityPerOrbitMb:p,bufferOverflowRisk:_,groundCostM:m,opsCostM:d,totalCampaignCostM:v,groundLeadMonths:y,totalCampaignMonths:C,canGreenlight:b,conflicts:w,kapRecommendation:E}}const pm=t=>{let e;const n=new Set,i=(c,u)=>{const f=typeof c=="function"?c(e):c;if(!Object.is(f,e)){const h=e;e=u??(typeof f!="object"||f===null)?f:Object.assign({},e,f),n.forEach(p=>p(e,h))}},r=()=>e,o={setState:i,getState:r,getInitialState:()=>l,subscribe:c=>(n.add(c),()=>n.delete(c))},l=e=t(i,r,o);return o},Mx=t=>t?pm(t):pm,yx=t=>t;function xx(t,e=yx){const n=Rl.useSyncExternalStore(t.subscribe,Rl.useCallback(()=>e(t.getState()),[t,e]),()=>e(t.getInitialState()));return Rl.useDebugValue(n),n}const mm=t=>{const e=Mx(t),n=i=>xx(e,i);return Object.assign(n,e),n},Sx=t=>t?mm(t):mm;function gm(t,e,n,i,r){var V,z;const s=Ti[t],a=ga(t,e,r,n),o=Vc(t,e,n,r),l=i.status==="SUCCESS"?"SUCCESS":"FAILED",c=ma[n.bandId],u=a.mass.totalDeltaVMs-s.targetDeltaVMs,h=l==="FAILED"&&!!((V=i.failureReason)!=null&&V.match(/TWR|Thrust-to-weight|crash|shock|Orbital decay|Suborbital|Burned up/i))?"CRITICAL":u<150?"WARNING":"OPTIMAL",p={status:h,whatWentRight:h==="OPTIMAL"?`Delivered ${a.mass.spacecraftDryKg} kg spacecraft cleanly with ${i.deltaVRemainingMs.toFixed(0)} m/s fuel reserve.`:`Rocket structural integration achieved ${a.mass.padTwr.toFixed(2)} pad TWR.`,whatWentWrong:h==="CRITICAL"?i.failureReason??"Insufficient propulsion or landing/entry protection.":h==="WARNING"?`Thin Δv margin (${u.toFixed(0)} m/s above target).`:"No structural or Δv anomalies detected.",beginnerNote:h==="OPTIMAL"?"Your rocket had enough muscle to lift off, climb into space, and finish the flight with spare fuel.":"Lighter spacecraft parts or a stronger rocket/heatshield would give you much safer flight margins.",realisticMetrics:`Dry: ${a.mass.spacecraftDryKg} kg | Wet: ${a.mass.launchTotalMassKg} kg | TWR: ${a.mass.padTwr.toFixed(2)} | Δv Expended: ${i.deltaVExpendedMs.toFixed(0)} m/s | Remaining: ${i.deltaVRemainingMs.toFixed(0)} m/s`},g=l==="FAILED"&&!!((z=i.failureReason)!=null&&z.match(/Power blackout|battery/i))?"CRITICAL":i.minBatteryPct<30?"WARNING":"OPTIMAL",m={status:g,whatWentRight:g!=="CRITICAL"?`Power bus stayed online through eclipses (lowest battery: ${i.minBatteryPct.toFixed(0)}%).`:`Solar/RTG array peaked at ${a.power.sunlitGenerationW.toFixed(0)} W.`,whatWentWrong:g==="CRITICAL"?i.failureReason??"Battery ran dry during shadow crossing.":g==="WARNING"?`Battery dipped to ${i.minBatteryPct.toFixed(0)}% during shadow.`:"Zero brownouts or power bus resets.",beginnerNote:g==="OPTIMAL"?"Your solar panels/RTG and battery kept the lights on even on the dark side of the planet.":"In shadow, solar panels produce 0 W — bring a bigger battery or an RTG nuclear battery for dark/deep space.",realisticMetrics:`Gen: ${a.power.sunlitGenerationW.toFixed(0)} W sunlit (${a.power.eclipseGenerationW.toFixed(0)} W eclipse) | Load: ${a.power.totalDrawW} W | Min SoC: ${i.minBatteryPct.toFixed(1)}%`},d=o.totalCampaignCostM>s.budgetCapM,v=o.totalCampaignCostM/s.budgetCapM*100,y={status:d?"CRITICAL":v>92?"WARNING":"OPTIMAL",whatWentRight:d?`Invested $${a.budget.totalCraftAndLauncherM}M in flight hardware.`:`Campaign cost $${o.totalCampaignCostM}M stayed within $${s.budgetCapM}M NASA ceiling.`,whatWentWrong:d?`Over budget by $${o.totalCampaignCostM-s.budgetCapM}M.`:v>92?`Used ${v.toFixed(0)}% of budget ceiling — minimal contingency reserve.`:"All hardware, launch, and ops costs balanced cleanly.",beginnerNote:d?"Try swapping to a lighter launcher or cheaper subsystem options to stay under NASA’s budget cap.":"Smart cost discipline — you delivered mission science without overspending.",realisticMetrics:`Craft+LV: $${a.budget.totalCraftAndLauncherM}M | Ground: $${o.groundCostM}M | Ops (${n.plannedLifetimeYears}y): $${o.opsCostM}M | Cap: $${s.budgetCapM}M`},w={status:l==="FAILED"&&i.deliveredDataMb<s.targetScienceMb?"CRITICAL":i.droppedDataMb>10?"WARNING":"OPTIMAL",whatWentRight:`Delivered ${i.deliveredDataMb.toFixed(1)} / ${s.targetScienceMb} MB of target science data.`,whatWentWrong:i.droppedDataMb>10?`Buffer overflow dropped ${i.droppedDataMb.toFixed(1)} MB of science packets.`:l==="FAILED"?"Mission ended before science target was fully transmitted.":"Zero packet loss during science operations.",beginnerNote:i.droppedDataMb>10?"Your camera filled onboard memory faster than the radio could empty it — upgrade computer storage or radio speed!":"Every byte of science data was captured cleanly and beamed home.",realisticMetrics:`Delivered: ${i.deliveredDataMb.toFixed(1)} MB | Dropped: ${i.droppedDataMb.toFixed(1)} MB | Buffer: ${i.storageMaxMb} MB | Rate: ${a.data.payloadDataRateMbps} Mbps`},b=n.activeStationIds.length===0?"CRITICAL":o.bufferOverflowRisk==="CRITICAL"?"WARNING":"OPTIMAL",E={status:b,whatWentRight:`${c.name} link over ${n.activeStationIds.length} ground station(s) achieved ${o.contactCoveragePct}% coverage.`,whatWentWrong:n.activeStationIds.length===0?"Zero ground stations selected — total communications blackout.":o.bufferOverflowRisk!=="NONE"?"Downlink bandwidth trailed peak payload generation rate.":"Clean carrier lock during ground station passes.",beginnerNote:b==="OPTIMAL"?"Your Deep Space Network dishes and radio band kept strong contact with the spacecraft.":"Adding DSN dishes or upgrading from S-Band to X-Band/Ka-Band boosts download speed.",realisticMetrics:`Band: ${c.name} (${c.bandwidthMbps} Mbps) | Coverage: ${o.contactCoveragePct}% | Contact/Orbit: ${o.contactSecPerOrbit}s`},x=o.totalCampaignMonths>s.scheduleLimitMonths,B={status:x?"CRITICAL":l==="FAILED"?"WARNING":"OPTIMAL",whatWentRight:x?`Flight simulation logged ${Math.round(i.elapsedFlightSec)}s telemetry.`:`Built in ${o.totalCampaignMonths} months (limit ${s.scheduleLimitMonths} mo); flight elapsed ${Math.round(i.elapsedFlightSec)}s.`,whatWentWrong:x?`Exceeded launch window by ${o.totalCampaignMonths-s.scheduleLimitMonths} months.`:l==="FAILED"?`Flight terminated prematurely at T+${Math.round(i.elapsedFlightSec)}s.`:"Met integration window and flight milestones on time.",beginnerNote:x?"Faster-to-build parts help you hit strict planetary launch windows.":"Great schedule management — integrated on time and reached operational phase smoothly.",realisticMetrics:`Campaign Build: ${o.totalCampaignMonths}/${s.scheduleLimitMonths} mo | Orbit: ${i.enteredOrbitAtSec?`T+${Math.round(i.enteredOrbitAtSec)}s`:"N/A"} | Target: ${i.reachedTargetAtSec?`T+${Math.round(i.reachedTargetAtSec)}s`:"N/A"}`},H=l==="SUCCESS"?`${s.title}: MISSION ACCOMPLISHED`:`${s.title}: MISSION FAILURE`,Y=l==="SUCCESS"?r==="BEGINNER"?`Outstanding flight, Commander! Your ${a.mass.spacecraftDryKg} kg spacecraft survived launch, powered through shadows, and beamed all ${s.targetScienceMb} MB of science back to Earth.`:`Nominal campaign completion. All ${s.targetScienceMb} MB science telemetry downlinked via ${c.name}; remaining Δv ${i.deltaVRemainingMs.toFixed(0)} m/s.`:r==="BEGINNER"?`Flight ended early: ${i.failureReason??"Unknown anomaly"}. Review the red cards below and tweak your build in the Hangar!`:`Anomaly termination at T+${Math.round(i.elapsedFlightSec)}s: ${i.failureReason??"Telemetry lost"}. Inspect subsystem margins below.`;return{outcome:l,headline:H,kapSummary:Y,resources:{mass:p,power:m,budget:y,data:w,comms:E,time:B}}}function Qt(t,e){return{x:t.x+e.x,y:t.y+e.y,z:t.z+e.z}}function wt(t,e){return{x:t.x-e.x,y:t.y-e.y,z:t.z-e.z}}function bt(t,e){return{x:t.x*e,y:t.y*e,z:t.z*e}}function Os(t,e){return t.x*e.x+t.y*e.y+t.z*e.z}function vm(t,e){return{x:t.y*e.z-t.z*e.y,y:t.z*e.x-t.x*e.z,z:t.x*e.y-t.y*e.x}}function $e(t){return Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z)}function ct(t){const e=$e(t);return e<1e-9?{x:1,y:0,z:0}:{x:t.x/e,y:t.y/e,z:t.z/e}}const Ex=2,wx=2.85;function $s(t){const e=Ex+fm*t,n=js*fm;return{pos:{x:js*Math.cos(e),y:0,z:js*Math.sin(e)},vel:{x:-n*Math.sin(e),y:0,z:n*Math.cos(e)}}}function qs(t){const e=wx+hm*t,n=Xs*hm;return{pos:{x:Xs*Math.cos(e),y:0,z:Xs*Math.sin(e)},vel:{x:-n*Math.sin(e),y:0,z:n*Math.cos(e)}}}function Va(t,e,n=Ro,i=Rt,r=gc){const s=$e(t),a=$e(e),o=s-i,l=a*a/2-n/Math.max(s,1),c=vm(t,e),u=vm(e,c),f=wt(bt(u,1/n),ct(t)),h=$e(f);let p,_,g,m;if(l>=-1e-6)p=-n/(2*Math.max(l,.001)),g=$e(c)*$e(c)/(n*(1+h))-i,_=1/0,m=1/0;else{p=-n/(2*l);const v=p*(1+h),M=p*(1-h);_=v-i,g=M-i,m=2*Math.PI*Math.sqrt(Math.pow(p,3)/n)}const d=g<r&&o>0;return{semiMajorAxisM:p,eccentricity:h,apoapsisAltM:_,periapsisAltM:g,periodSec:m,speedMs:a,altitudeM:o,isDecaying:d}}function Au(t,e={x:0,y:0,z:0},n=Rt,i=to){const r=wt(t,e),s=ct(i),a=Os(r,s);if(a>=0)return!1;const o=bt(s,a),l=wt(r,o);return $e(l)<n*.99}function Yv(t,e){const n=Hc[t];if(!n)return{x:Rt,y:0,z:0};const i=n.latDeg*Math.PI/180,r=n.lonDeg*Math.PI/180+Xv*e,s=n.isOrbitalRelay?Rt*2.2:Rt;return{x:s*Math.cos(i)*Math.cos(r),y:s*Math.sin(i),z:s*Math.cos(i)*Math.sin(r)}}function nf(t,e,n){const i=[];if($e(t)<Rt*.95)return i;for(const s of n){const a=Hc[s];if(!a)continue;if(a.isOrbitalRelay){i.push(s);continue}const o=Yv(s,e),l=ct(o),c=wt(t,o),u=$e(c);if(u<1){i.push(s);continue}const f=Os(l,c)/u,h=Math.sin(a.minElevationDeg*Math.PI/180);f>=h&&i.push(s)}return i}function Kv(t){return[t.structureId,t.powerId,t.batteryId,t.computerId,t.adcsId,t.thermalId,t.payloadId].map(n=>n?on[n]:void 0).filter(n=>!!n)}function Zv(t,e,n,i,r){const s=e?zc[e]:void 0;if(!s)return 0;let a=0;if(n===0&&i>0){const o=t+s.stage2DryKg+r+s.stage1DryKg+i,l=o-i;a+=s.stage1IspS*Ws*Math.log(o/l)}if(r>0){const o=t+s.stage2DryKg+r,l=t+s.stage2DryKg;a+=s.stage2IspS*Ws*Math.log(o/l)}return a}function Tx(t,e,n,i=!0){const s=Kv(e).reduce((d,v)=>d+v.massKg,0),a=e.launcherId?zc[e.launcherId]:void 0,o=e.batteryId?on[e.batteryId]:void 0,l=e.computerId?on[e.computerId]:void 0,c=(a==null?void 0:a.stage1PropKg)??0,u=(a==null?void 0:a.stage2PropKg)??0,f=(o==null?void 0:o.capacityWh)??180,h=(l==null?void 0:l.storageMb)??400,p={x:Rt,y:0,z:0},_={x:0,y:0,z:0},g=$s(0),m=qs(0);return{position:p,velocity:_,heading:{x:1,y:0,z:0},throttle:0,activeStageIndex:0,stage1PropKg:c,stage2PropKg:u,batteryWh:f,batteryMaxWh:f,onboardDataMb:0,storageMaxMb:h,deliveredDataMb:0,droppedDataMb:0,observationProgress:0,targetAchieved:!1,elapsedFlightSec:0,timeWarp:1,flightAssistEnabled:i,status:"PRELAUNCH",failureReason:null,inEclipse:!1,activeDsnStationIds:nf(p,0,n.activeStationIds),currentPowerGenW:0,currentPowerDrawW:0,deltaVRemainingMs:Zv(s,e.launcherId,0,c,u),deltaVExpendedMs:0,orbitalElements:Va(p,_),targetPhaseStatus:{moonDistanceM:$e(wt(p,g.pos)),marsDistanceM:$e(wt(p,m.pos)),lunarCaptureProgress:0,marsCaptureProgress:0,landedOnTarget:!1,targetOrbitAchieved:!1},events:[{timeSec:0,kind:"INFO",message:`Vehicle on launchpad for ${Ti[t].title}. Ready for ignition.`}],minBatteryPct:100,peakDynamicPressurePa:0,enteredOrbitAtSec:null,reachedTargetAtSec:null}}function Dt(t,e,n,i){const r=t[t.length-1];r&&r.message===i||(t.push({timeSec:e,kind:n,message:i}),t.length>60&&t.shift())}function _m(t,e,n){const i=t.x*t.x+t.y*t.y+t.z*t.z,r=Math.sqrt(Math.max(i,Rt*Rt*.5));let s=bt(t,-Ro/(r*r*r));if(n==="MOON_LANDING"){const a=$s(e),o=wt(t,a.pos),l=$e(o);if(l<jr*1.4){const c=Math.max(l,Ui*.5);s=Qt(s,bt(o,-zh/(c*c*c)))}}else if(n==="MARS_LANDING"){const a=qs(e),o=wt(t,a.pos),l=$e(o);if(l<ur*1.4){const c=Math.max(l,_i*.5);s=Qt(s,bt(o,-Gh/(c*c*c)))}}return s}function Ax(t,e,n,i,r,s,a){if(t.status==="SUCCESS"||t.status==="FAILED"||s<=0)return t;const o=Ti[e],l=Kv(n),c=n.structureId?on[n.structureId]:void 0,u=n.powerId?on[n.powerId]:void 0,f=n.computerId?on[n.computerId]:void 0,h=n.adcsId?on[n.adcsId]:void 0,p=n.thermalId?on[n.thermalId]:void 0,_=n.payloadId?on[n.payloadId]:void 0,g=n.launcherId?zc[n.launcherId]:void 0,m=l.reduce((Ie,dt)=>Ie+dt.massKg,0),d=ma[i.bandId];let v={...t.position},M={...t.velocity},y={...t.heading},C=Math.max(0,Math.min(1,r.throttle)),w=t.activeStageIndex,A=t.stage1PropKg,b=t.stage2PropKg,E=t.batteryWh,x=t.onboardDataMb,P=t.deliveredDataMb,B=t.droppedDataMb,H=t.observationProgress,Y=t.targetAchieved,V=t.elapsedFlightSec,z=t.status,K=t.failureReason,D=t.deltaVExpendedMs,Q=t.minBatteryPct,J=t.peakDynamicPressurePa,$=t.enteredOrbitAtSec,N=t.reachedTargetAtSec,ce=t.targetPhaseStatus.landedOnTarget,G=t.targetPhaseStatus.targetOrbitAchieved,X=t.targetPhaseStatus.lunarCaptureProgress,le=t.targetPhaseStatus.marsCaptureProgress;const ne=[...t.events],Ne=Math.max(1,Math.ceil(s/.25)),de=s/Ne;let je=t.inEclipse,Xe=t.currentPowerGenW,mt=t.currentPowerDrawW;for(let Ie=0;Ie<Ne&&!(z==="SUCCESS"||z==="FAILED");Ie++){const Te=$e(v)-Rt,R=ct(v),S=ct({x:-R.z,y:0,z:R.x}),W=Va(v,M),te=$s(V),re=qs(V),ee=wt(v,te.pos),Ae=wt(M,te.vel),pe=$e(ee),ye=wt(v,re.pos),qe=wt(M,re.vel),oe=$e(ye);if(ce){if(e==="MOON_LANDING"){const Le=ct(ee);v=Qt(te.pos,bt(Le,Ui)),M={...te.vel}}else if(e==="MARS_LANDING"){const Le=ct(ye);v=Qt(re.pos,bt(Le,_i)),M={...re.vel}}C=0}if(r.stageRequested&&w===0&&(w=1,A=0,Dt(ne,V,"MILESTONE","Stage 1 separation confirmed.")),w===0&&A<=.01&&(w=1,A=0,Dt(ne,V,"MILESTONE","MECO & Stage 2 ignition.")),z==="PRELAUNCH")if(C>0||t.flightAssistEnabled&&r.autoGuidance)z="ASCENT",Dt(ne,V,"MILESTONE","Liftoff! Booster ignition confirmed.");else{V+=de;continue}const Ee=t.flightAssistEnabled||!!r.autoGuidance;if(Math.abs(r.pitchInput)>.05||Math.abs(r.yawInput)>.05){const Le=r.pitchInput*1.2*de,De=r.yawInput*1.2*de;y=ct({x:y.x+R.x*Le,y:y.y+De,z:y.z+R.z*Le})}else if(Ee&&!ce){if(z==="ASCENT"){const Le=o.targetType==="LEO"?215e3:12e4,De=Os(M,R);if(Te<1500)y=R,C=1;else if(Te<42e3){const ke=Math.min(1,(Te-1500)/40500),rt=Math.pow(ke,.62)*(Math.PI*.44);y=ct(Qt(bt(R,Math.cos(rt)),bt(S,Math.sin(rt)))),C=1}else if(W.apoapsisAltM<Le){const ke=De<25?.25:.04;y=ct(Qt(S,bt(R,ke))),C=1}else if(W.periapsisAltM<105e3)if(De>25&&Te>65e3)y=$e(M)>10?ct(M):S,C=0;else{const ke=De<-15?Math.min(.4,-De*.01):0;y=ct(Qt(S,bt(R,ke))),C=1}else C=0,y=$e(M)>10?ct(M):S}else if(z==="ORBIT"){if(C=0,y=$e(M)>10?ct(M):S,e==="SPACE_TELESCOPE"&&!G){const Le=tf;W.apoapsisAltM<Le-Rt-8e4?(y=ct(M),C=1,z="TRANSIT",Dt(ne,V,"MILESTONE","Hohmann transfer burn to 1,800 km orbit.")):G=!0}else if(e==="MOON_LANDING"&&!G){const Le=Math.atan2(v.z,v.x);let ke=Math.atan2(te.pos.z,te.pos.x)-Le;for(;ke<0;)ke+=Math.PI*2;for(;ke>=Math.PI*2;)ke-=Math.PI*2;ke>=1.55&&ke<=1.82&&(y=ct(M),C=1,z="TRANSIT",Dt(ne,V,"MILESTONE","Trans-Lunar Injection (TLI) burn started!"))}else if(e==="MARS_LANDING"&&!G){const Le=Math.atan2(v.z,v.x);let ke=Math.atan2(re.pos.z,re.pos.x)-Le;for(;ke<0;)ke+=Math.PI*2;for(;ke>=Math.PI*2;)ke-=Math.PI*2;ke>=2.4&&ke<=2.68&&(y=ct(M),C=1,z="TRANSIT",Dt(ne,V,"MILESTONE","Trans-Mars Injection (TMI) burn started!"))}}else if(z==="TRANSIT"){if(e==="SPACE_TELESCOPE"){const Le=Os(M,R),De=tf-Rt;W.apoapsisAltM<De-4e4?(y=ct(M),C=.6):Le>25&&Te<De-12e4?(y=ct(M),C=0):W.periapsisAltM<De-32e4?(y=S,C=Te>=De-25e4?.35:0):(C=0,G=!0,z="ORBIT",N=N??V,Dt(ne,V,"MILESTONE","Deep-Space Observatory circularized at 1,800 km!"))}else if(e==="MOON_LANDING"||e==="MARS_LANDING"){const De=e==="MOON_LANDING"?js:Xs;W.apoapsisAltM+Rt<De*.96?(y=ct(M),C=1):(C=0,y=$e(M)>10?ct(M):S)}}else if(z==="TARGET_CAPTURE"||z==="LANDING"){const Le=e==="MOON_LANDING",De=Le?ee:ye,ke=Le?Ae:qe,rt=Le?Ui:_i,Ht=Le?zh:Gh,Zt=$e(De)-rt,In=$e(ke),Hn=ct(De),Uo=Os(ke,Hn),Oo=Va(De,ke,Ht,rt,0);if(Zt>(Le?32e3:12e3))Oo.periapsisAltM>(Le?55e3:28e3)?(y=ct(wt(bt(Hn,-260),ke)),C=.12):(y=In>5?ct(bt(ke,-1)):Hn,C=0);else{z="LANDING";const Fo=Ht/(rt*rt),Jc=m+(g?g.stage2DryKg+b:0),T=g?g.stage2ThrustN:6e4,O=Math.max(2,T/Math.max(Jc,100)-Fo),j=Math.max(4,Math.sqrt(2*O*.52*Math.max(Zt-120,0)));y=In>2?ct(bt(ke,-1)):Hn,In>j?C=Math.min(1,.35+(In-j)/30):Uo<-j*.9?C=.4:C=0}}}const Fe=w===0?A:b,we=w===0&&g?g.stage1DryKg+A:0,Je=g?g.stage2DryKg+b:0,ze=Math.max(100,m+we+Je);let at={x:0,y:0,z:0};if(g&&C>0&&Fe>0&&!ce){const Le=w===0?g.stage1ThrustN:g.stage2ThrustN,De=w===0?g.stage1IspS:g.stage2IspS,ke=Le*C,rt=ke/(De*Ws),Ht=Math.min(Fe,rt*de),Zt=Ht/Math.max(rt*de,1e-9),In=ke*Zt;w===0?A-=Ht:b-=Ht;const Hn=In/ze;D+=Hn*de,at=bt(ct(y),Hn)}let U={x:0,y:0,z:0};if(Te>=0&&Te<gc){const Le=cx*Math.exp(-Te/lx),De=$e(M),ke=.5*Le*De*De;ke>J&&(J=ke);const rt=ke*.22/Math.max(ze,1);De>.1&&(U=bt(ct(M),-rt))}if(e==="MARS_LANDING"&&oe<=ur&&!ce){const Le=oe-_i,De=$e(qe);if(Le>=0&&Le<ux){if(De>260&&!(p!=null&&p.heatShield)){z="FAILED",K="Burned up during Mars atmospheric entry — missing PICA-X heatshield!",Dt(ne,V,"CRITICAL",K);break}const rt=.5*(fx*Math.exp(-Le/dx))*De*De;rt>J&&(J=rt);const Ht=rt*18/Math.max(ze,1);De>.5&&(U=Qt(U,bt(ct(qe),-Ht)))}}const he=_m(v,V,e);let Z=Qt(Qt(he,at),U);if(Te<=1&&Os(Z,R)<=0&&$e(M)<1){if(M={x:0,y:0,z:0},v=bt(R,Rt),A<=.01&&b<=.01&&C>0){z="FAILED",K="Thrust-to-weight < 1.0 — rocket burned out on pad without lifting off.",Dt(ne,V,"CRITICAL",K);break}}else if(!ce){const Le=Qt(M,bt(Z,.5*de)),De=Qt(v,bt(Le,de)),ke=_m(De,V+de,e),rt=Qt(Qt(ke,at),U),Ht=Qt(Le,bt(rt,.5*de));v=De,M=Ht}V+=de;const ve=$e(v)-Rt;if(ve<-10){z="FAILED",K=$!==null?"Orbital decay & atmospheric reentry crash.":"Suborbital impact on Earth surface.",Dt(ne,V,"CRITICAL",K);break}const me=Va(v,M);if(z==="ASCENT"&&me.periapsisAltM>=gc+5e3&&ve>=85e3&&(z="ORBIT",$=$??V,e==="EARTH_OBSERVATION"&&(G=!0),Dt(ne,V,"MILESTONE","Stable Earth parking orbit achieved!")),e==="MOON_LANDING"&&!ce){const Le=$s(V),De=wt(v,Le.pos),ke=wt(M,Le.vel),rt=$e(De),Ht=rt-Ui;if(rt<=jr&&(z==="TRANSIT"||z==="ORBIT")&&(z="TARGET_CAPTURE",N=N??V,Dt(ne,V,"MILESTONE","Entered Lunar Sphere of Influence!")),rt<=jr&&(X=Math.min(1,Math.max(X,1-Ht/jr))),Ht<=0){const Zt=$e(ke);if(Zt>28){z="FAILED",K=`Lunar crash landing at ${Zt.toFixed(1)} m/s!`,Dt(ne,V,"CRITICAL",K);break}if(((c==null?void 0:c.structuralIntegrity)??0)<2){z="FAILED",K=`Landing shock destroyed ${(c==null?void 0:c.name)??"frame"} — reinforced lander legs required!`,Dt(ne,V,"CRITICAL",K);break}ce=!0,G=!0,X=1,z="LANDING";const In=ct(De);v=Qt(Le.pos,bt(In,Ui)),M={...Le.vel},Dt(ne,V,"MILESTONE",`Soft touchdown on the Moon (${Zt.toFixed(1)} m/s)!`)}}else if(e==="MARS_LANDING"&&!ce){const Le=qs(V),De=wt(v,Le.pos),ke=wt(M,Le.vel),rt=$e(De),Ht=rt-_i;if(rt<=ur&&(z==="TRANSIT"||z==="ORBIT")&&(z="TARGET_CAPTURE",N=N??V,Dt(ne,V,"MILESTONE","Entered Mars Sphere of Influence!")),rt<=ur&&(le=Math.min(1,Math.max(le,1-Ht/ur))),Ht<=0){const Zt=$e(ke);if(Zt>28){z="FAILED",K=`Mars crash landing at ${Zt.toFixed(1)} m/s!`,Dt(ne,V,"CRITICAL",K);break}if(((c==null?void 0:c.structuralIntegrity)??0)<2){z="FAILED",K=`Landing shock crushed ${(c==null?void 0:c.name)??"frame"} — reinforced lander chassis required!`,Dt(ne,V,"CRITICAL",K);break}ce=!0,G=!0,le=1,z="LANDING";const In=ct(De);v=Qt(Le.pos,bt(In,_i)),M={...Le.vel},Dt(ne,V,"MILESTONE",`Touchdown on Mars (${Zt.toFixed(1)} m/s)!`)}}let Oe=Au(v,{x:0,y:0,z:0},Rt,to);e==="MOON_LANDING"&&pe<jr?Oe=Oe||Au(v,te.pos,Ui,to):e==="MARS_LANDING"&&oe<ur&&(Oe=Oe||Au(v,re.pos,_i,to));let pt=0;u!=null&&u.baseOutputW&&(u.isSolar?pt=Oe?0:u.baseOutputW*o.irradianceFactor:pt=u.baseOutputW);const Gt=l.reduce((Le,De)=>Le+De.drawW,0)+d.drawW,it=pt-Gt;E=Math.max(0,Math.min(t.batteryMaxWh,E+it*de/3600));const yn=E/Math.max(1,t.batteryMaxWh)*100;if(yn<Q&&(Q=yn),je=Oe,Xe=pt,mt=Gt,E<=0){z="FAILED",K=Oe?"Power blackout in Earth/planetary shadow — battery depleted!":"Power blackout — solar/RTG output insufficient for spacecraft load!",Dt(ne,V,"CRITICAL",K);break}const Jn=nf(v,V,i.activeStationIds);if((e==="EARTH_OBSERVATION"&&z==="ORBIT"&&me.periapsisAltM>=85e3||e==="SPACE_TELESCOPE"&&z==="ORBIT"&&G&&((h==null?void 0:h.pointingTier)??0)>=3&&!!(f!=null&&f.radHardened)||(e==="MOON_LANDING"||e==="MARS_LANDING")&&ce&&!!(f!=null&&f.radHardened))&&(_==null?void 0:_.missionMatch)===o.requiredPayloadMatch&&(_!=null&&_.dataRateMbps)){const Le=(f==null?void 0:f.maxDataMbps)??15,ke=Math.min(_.dataRateMbps,Le)*.25*de/8;if(x+ke>t.storageMaxMb){const rt=x+ke-t.storageMaxMb;B+=rt,x=t.storageMaxMb}else x+=ke}if(Jn.length>0&&x>0){const Le=d.bandwidthMbps*o.distanceCommsFactor,De=Math.min(x,Le*de/8);x-=De,P+=De}if(H=Math.min(1,P/o.targetScienceMb),P>=o.targetScienceMb){Y=!0,z="SUCCESS",Dt(ne,V,"MILESTONE",`Mission Complete! ${o.targetScienceMb} MB science downlinked.`);break}}const k=Va(v,M),Mn=$s(V),Ze=qs(V),Qe=nf(v,V,i.activeStationIds);return{...t,position:v,velocity:M,heading:y,throttle:C,activeStageIndex:w,stage1PropKg:A,stage2PropKg:b,batteryWh:E,onboardDataMb:x,deliveredDataMb:P,droppedDataMb:B,observationProgress:H,targetAchieved:Y,elapsedFlightSec:V,status:z,failureReason:K,inEclipse:je,activeDsnStationIds:Qe,currentPowerGenW:Xe,currentPowerDrawW:mt,deltaVRemainingMs:Zv(m,n.launcherId,w,A,b),deltaVExpendedMs:D,orbitalElements:k,targetPhaseStatus:{moonDistanceM:$e(wt(v,Mn.pos)),marsDistanceM:$e(wt(v,Ze.pos)),lunarCaptureProgress:X,marsCaptureProgress:le,landedOnTarget:ce,targetOrbitAchieved:G},events:ne,minBatteryPct:Q,peakDynamicPressurePa:J,enteredOrbitAtSec:$,reachedTargetAtSec:N}}const Mm={structureId:null,powerId:null,batteryId:null,computerId:null,adcsId:null,thermalId:null,payloadId:null,launcherId:null},tl={activeStationIds:["goldstone","madrid","canberra"],bandId:"S_BAND",plannedLifetimeYears:1},ym={structure:"structureId",power:"powerId",battery:"batteryId",computer:"computerId",adcs:"adcsId",thermal:"thermalId",payload:"payloadId",launcher:"launcherId"},xe=Sx((t,e)=>({phase:"TITLE",difficulty:"BEGINNER",selectedObjective:null,missionId:"EARTH_OBSERVATION",exploreSubChoiceOpen:!1,spacecraft:{...Mm},activeSnapCategory:"structure",ground:{...tl,activeStationIds:[...tl.activeStationIds]},flight:null,flightControls:{throttle:0,pitchInput:0,yawInput:0,autoGuidance:!0,autoStage:!0,stageRequested:!1},debrief:null,startSingleplayer:()=>{t({phase:"OBJECTIVE_SELECT",selectedObjective:null,exploreSubChoiceOpen:!1})},setDifficulty:n=>{const{flight:i,flightControls:r}=e();t({difficulty:n,flight:i?{...i,flightAssistEnabled:n==="BEGINNER"}:null,flightControls:{...r,autoGuidance:n==="BEGINNER",autoStage:n==="BEGINNER"}})},selectTopObjective:n=>{if(n==="EXPLORE_SPACE"){const r=e().missionId==="SPACE_TELESCOPE"?"SPACE_TELESCOPE":"EARTH_OBSERVATION";t({selectedObjective:"EXPLORE_SPACE",exploreSubChoiceOpen:!0,missionId:r})}else t({selectedObjective:n,exploreSubChoiceOpen:!1,missionId:n})},selectExploreSubMission:n=>{t({selectedObjective:"EXPLORE_SPACE",exploreSubChoiceOpen:!0,missionId:n})},enterHangar:()=>{t({phase:"HANGAR",activeSnapCategory:"structure",debrief:null,flight:null})},setActiveSnapCategory:n=>{t({activeSnapCategory:n})},equipPart:(n,i)=>{const r=ym[n];t(s=>({spacecraft:{...s.spacecraft,[r]:i}}))},clearSlot:n=>{const i=ym[n];t(r=>({spacecraft:{...r.spacecraft,[i]:null}}))},applyRecommendedLoadout:()=>{const{missionId:n}=e();t({spacecraft:{...mx[n]}})},rolloutToGround:()=>{t({phase:"GROUND_SEGMENT"})},backToHangar:()=>{t({phase:"HANGAR",activeSnapCategory:"structure"})},toggleStation:n=>{t(i=>{const s=i.ground.activeStationIds.includes(n)?i.ground.activeStationIds.filter(a=>a!==n):[...i.ground.activeStationIds,n];return{ground:{...i.ground,activeStationIds:s}}})},setCommsBand:n=>{t(i=>({ground:{...i.ground,bandId:n}}))},setPlannedLifetime:n=>{t(i=>({ground:{...i.ground,plannedLifetimeYears:n}}))},applyRecommendedGround:()=>{const{missionId:n}=e(),i=gx[n];t({ground:{activeStationIds:[...i.activeStationIds],bandId:i.bandId,plannedLifetimeYears:i.plannedLifetimeYears}})},greenlightLiftoff:()=>{const{missionId:n,spacecraft:i,ground:r,difficulty:s}=e(),a=s==="BEGINNER",o=Tx(n,i,r,a);t({phase:"FLIGHT",flight:o,debrief:null,flightControls:{throttle:0,pitchInput:0,yawInput:0,autoGuidance:a,autoStage:a,stageRequested:!1}})},igniteLaunch:()=>{const{flight:n,flightControls:i,difficulty:r}=e();if(!n)return;const s=r==="BEGINNER"||i.autoGuidance;t({flight:{...n,flightAssistEnabled:s},flightControls:{...i,throttle:1,autoGuidance:s}})},tickFlight:n=>{const i=e();if(i.phase!=="FLIGHT"||!i.flight||i.flight.status==="SUCCESS"||i.flight.status==="FAILED")return;const r=Math.min(Math.max(n,0),.1);if(r<=0)return;const s=r*i.flight.timeWarp,{flightControls:a,missionId:o,spacecraft:l,ground:c,difficulty:u}=i,h=i.flight.status==="PRELAUNCH"?!1:a.autoGuidance,p=Ax({...i.flight,flightAssistEnabled:h},o,l,c,{throttle:a.throttle,pitchInput:a.pitchInput,yawInput:a.yawInput,autoGuidance:h,stageRequested:a.stageRequested},s),_=a.stageRequested;if(p.status==="SUCCESS"||p.status==="FAILED"){const g=gm(o,l,c,p,u);t({flight:p,debrief:g,phase:"DEBRIEF",flightControls:_?{...a,stageRequested:!1}:a})}else t({flight:p,flightControls:_?{...a,stageRequested:!1}:a})},setThrottle:n=>{const i=Math.max(0,Math.min(1,n));t(r=>({flightControls:{...r.flightControls,throttle:i}}))},setPitchYaw:(n,i)=>{t(r=>({flightControls:{...r.flightControls,pitchInput:Math.max(-1,Math.min(1,n)),yawInput:Math.max(-1,Math.min(1,i))}}))},requestStage:()=>{t(n=>({flightControls:{...n.flightControls,stageRequested:!0}}))},setTimeWarp:n=>{t(i=>({flight:i.flight?{...i.flight,timeWarp:n}:null}))},toggleFlightAssist:()=>{t(n=>{const i=!n.flightControls.autoGuidance;return{flightControls:{...n.flightControls,autoGuidance:i},flight:n.flight?{...n.flight,flightAssistEnabled:i}:null}})},toggleAutoStage:()=>{t(n=>({flightControls:{...n.flightControls,autoStage:!n.flightControls.autoStage}}))},abortMission:()=>{const n=e();if(!n.flight)return;const i={...n.flight,status:"FAILED",failureReason:"Flight terminated by Flight Director abort command.",events:[...n.flight.events,{timeSec:n.flight.elapsedFlightSec,kind:"CRITICAL",message:`Mission aborted for ${Ti[n.missionId].title}.`}]},r=gm(n.missionId,n.spacecraft,n.ground,i,n.difficulty);t({flight:i,debrief:r,phase:"DEBRIEF"})},returnToHangarKeepDesign:()=>{t({phase:"HANGAR",activeSnapCategory:"structure",flight:null,debrief:null})},restartCampaign:()=>{t({phase:"OBJECTIVE_SELECT",selectedObjective:null,exploreSubChoiceOpen:!1,spacecraft:{...Mm},ground:{...tl,activeStationIds:[...tl.activeStationIds]},flight:null,debrief:null})}}));typeof window<"u"&&(window.__MISSION_STORE__=xe);const bx=()=>{const t=xe(g=>g.phase),e=xe(g=>g.difficulty),n=xe(g=>g.missionId),i=xe(g=>g.spacecraft),r=xe(g=>g.ground),s=xe(g=>g.flight),a=xe(g=>g.debrief),[o,l]=jn.useState(!1);if(t==="TITLE")return null;const c=Ti[n];let u="HAPPY",f="",h=[];if(t==="OBJECTIVE_SELECT")u="HAPPY",f=e==="BEGINNER"?`Pick a target in 3D space! ${c.beginnerBrief}`:`${c.title} — ${c.realisticBrief}`;else if(t==="HANGAR"){const g=ga(n,i,e,r);if(u=g.kapMood,h=g.conflicts,h.length>0){const m=h[0];f=e==="BEGINNER"?m.beginnerMessage:m.realisticMessage}else f=g.kapHeadline}else if(t==="GROUND_SEGMENT"){const g=Vc(n,i,r,e);h=g.conflicts,u=g.canGreenlight?g.bufferOverflowRisk==="WARNING"?"CONCERNED":"HAPPY":"ALERT",f=g.kapRecommendation}else if(t==="FLIGHT"&&s){const g=s.events[s.events.length-1];s.inEclipse&&s.batteryWh<s.batteryMaxWh*.25?(u="ALERT",f=e==="BEGINNER"?"Shadow crossing! Battery running low — hang tight until sunlight!":`Umbra power alert: ${s.batteryWh.toFixed(0)} Wh remaining.`):s.droppedDataMb>5?(u="CONCERNED",f=e==="BEGINNER"?"Memory full! Dropping camera packets while waiting for a ground dish.":`Onboard buffer overflow: ${s.droppedDataMb.toFixed(1)} MB dropped.`):g?(u=g.kind==="CRITICAL"?"ALERT":g.kind==="WARN"?"CONCERNED":"HAPPY",f=g.message):f="All flight telemetry nominal."}else t==="DEBRIEF"&&a&&(u=a.outcome==="SUCCESS"?"HAPPY":"ALERT",f=a.kapSummary);const p=u==="HAPPY"?"#34d399":u==="CONCERNED"?"#f59e0b":"#ef4444",_=u==="HAPPY"?"#38bdf8":u==="CONCERNED"?"#fbbf24":"#f87171";return I.jsxs("aside",{className:`kap-comms-bubble mood-${u.toLowerCase()}`,"data-testid":"kap-comms-bubble","data-kap-mood":u,children:[I.jsx("div",{className:"kap-avatar-wrap","aria-hidden":"true",children:I.jsxs("svg",{viewBox:"0 0 72 72",className:"kap-svg",children:[I.jsx("circle",{cx:"36",cy:"36",r:"31",fill:"#0f1b33",stroke:p,strokeWidth:"2.5"}),I.jsx("rect",{x:"2",y:"26",width:"7",height:"20",rx:"3.5",fill:"#1e293b",stroke:"#64748b",strokeWidth:"1.5"}),I.jsx("rect",{x:"63",y:"26",width:"7",height:"20",rx:"3.5",fill:"#1e293b",stroke:"#64748b",strokeWidth:"1.5"}),I.jsx("rect",{x:"13",y:"16",width:"46",height:"36",rx:"16",fill:"#071122",stroke:_,strokeWidth:"1.6"}),I.jsx("path",{d:"M 19 22 Q 28 18 42 20",stroke:"rgba(255,255,255,0.28)",strokeWidth:"2.4",fill:"none",strokeLinecap:"round"}),u==="HAPPY"&&I.jsxs(I.Fragment,{children:[I.jsx("path",{d:"M 23 30 Q 27 27 31 30",stroke:"#7dd3fc",strokeWidth:"2",fill:"none",strokeLinecap:"round"}),I.jsx("path",{d:"M 41 30 Q 45 27 49 30",stroke:"#7dd3fc",strokeWidth:"2",fill:"none",strokeLinecap:"round"}),I.jsx("circle",{cx:"27",cy:"34",r:"2.7",fill:"#e0f2fe"}),I.jsx("circle",{cx:"45",cy:"34",r:"2.7",fill:"#e0f2fe"}),I.jsx("path",{d:"M 29 42 Q 36 47 43 42",stroke:"#34d399",strokeWidth:"2.4",fill:"none",strokeLinecap:"round"})]}),u==="CONCERNED"&&I.jsxs(I.Fragment,{children:[I.jsx("line",{x1:"22",y1:"30",x2:"31",y2:"28",stroke:"#fcd34d",strokeWidth:"2.2",strokeLinecap:"round"}),I.jsx("line",{x1:"41",y1:"28",x2:"50",y2:"30",stroke:"#fcd34d",strokeWidth:"2.2",strokeLinecap:"round"}),I.jsx("circle",{cx:"27",cy:"34",r:"2.6",fill:"#fef3c7"}),I.jsx("circle",{cx:"45",cy:"34",r:"2.6",fill:"#fef3c7"}),I.jsx("path",{d:"M 30 44 Q 36 42 42 44",stroke:"#f59e0b",strokeWidth:"2.3",fill:"none",strokeLinecap:"round"})]}),u==="ALERT"&&I.jsxs(I.Fragment,{children:[I.jsx("line",{x1:"22",y1:"28",x2:"31",y2:"32",stroke:"#fca5a5",strokeWidth:"2.4",strokeLinecap:"round"}),I.jsx("line",{x1:"41",y1:"32",x2:"50",y2:"28",stroke:"#fca5a5",strokeWidth:"2.4",strokeLinecap:"round"}),I.jsx("circle",{cx:"27",cy:"35",r:"2.8",fill:"#fee2e2"}),I.jsx("circle",{cx:"45",cy:"35",r:"2.8",fill:"#fee2e2"}),I.jsx("ellipse",{cx:"36",cy:"44",rx:"4.5",ry:"3.2",fill:"none",stroke:"#ef4444",strokeWidth:"2.2"})]}),I.jsx("path",{d:"M 65 42 Q 58 53 45 53",stroke:"#94a3b8",strokeWidth:"2",fill:"none",strokeLinecap:"round"}),I.jsx("circle",{cx:"44",cy:"53",r:"2.4",fill:p}),I.jsx("circle",{cx:"36",cy:"8",r:"2.5",fill:p})]})}),I.jsxs("div",{className:"kap-text-col",children:[I.jsxs("div",{className:"kap-header-row",children:[I.jsx("span",{className:"kap-name",children:"KAP // FLIGHT ENGINEER"}),I.jsx("span",{className:"kap-mood-pill",style:{color:p,borderColor:p},children:u}),h.length>1&&I.jsx("button",{type:"button",className:"kap-expand-btn",onClick:()=>l(g=>!g),children:o?"HIDE":`+${h.length-1} MORE`})]}),I.jsx("p",{className:"kap-message","data-testid":"kap-message",children:f}),o&&h.length>1&&I.jsx("div",{className:"kap-conflict-list",children:h.slice(1).map(g=>I.jsx("div",{className:`kap-conflict-item sev-${g.severity.toLowerCase()}`,children:e==="BEGINNER"?g.beginnerMessage:g.realisticMessage},g.id))})]})]})},Cx=[{key:"structure",label:"FRAME"},{key:"power",label:"POWER"},{key:"battery",label:"BATTERY"},{key:"computer",label:"CPU"},{key:"adcs",label:"ADCS"},{key:"thermal",label:"THERMAL"},{key:"payload",label:"PAYLOAD"},{key:"launcher",label:"ROCKET"}],Rx={mass:"MASS & Δv",power:"POWER BUS",budget:"BUDGET",data:"SCIENCE DATA",comms:"COMMS LINK",time:"SCHEDULE"};function bu(t){return Number.isFinite(t)?Math.abs(t)>=1e3?`${(t/1e3).toFixed(1)} km`:`${Math.round(t)} m`:"ESC"}const Px=()=>{const t=xe(N=>N.phase),e=xe(N=>N.difficulty),n=xe(N=>N.selectedObjective),i=xe(N=>N.missionId),r=xe(N=>N.exploreSubChoiceOpen),s=xe(N=>N.spacecraft),a=xe(N=>N.activeSnapCategory),o=xe(N=>N.ground),l=xe(N=>N.flight),c=xe(N=>N.flightControls),u=xe(N=>N.debrief),f=xe(N=>N.startSingleplayer),h=xe(N=>N.setDifficulty),p=xe(N=>N.selectTopObjective),_=xe(N=>N.selectExploreSubMission),g=xe(N=>N.enterHangar),m=xe(N=>N.setActiveSnapCategory),d=xe(N=>N.equipPart),v=xe(N=>N.applyRecommendedLoadout),M=xe(N=>N.rolloutToGround),y=xe(N=>N.backToHangar),C=xe(N=>N.toggleStation),w=xe(N=>N.setCommsBand),A=xe(N=>N.setPlannedLifetime),b=xe(N=>N.greenlightLiftoff),E=xe(N=>N.igniteLaunch),x=xe(N=>N.setThrottle),P=xe(N=>N.requestStage),B=xe(N=>N.setTimeWarp),H=xe(N=>N.toggleFlightAssist),Y=xe(N=>N.toggleAutoStage),V=xe(N=>N.abortMission),z=xe(N=>N.returnToHangarKeepDesign),K=xe(N=>N.restartCampaign),[D,Q]=jn.useState(null),J=Ti[i],$=e==="BEGINNER";if(t==="TITLE")return I.jsx("div",{className:"hud-layer title-overlay","data-testid":"title-screen",children:I.jsxs("div",{className:"title-frame",children:[I.jsx("div",{className:"title-badge",children:"NASA SPACEAPPS // FLIGHT ENGINEERING SIM"}),I.jsx("h1",{className:"game-logo",children:"ORBITAL ARCHITECT 3D"}),I.jsx("p",{className:"game-tagline",children:"Design spacecraft buses, balance power & radio links, and fly orbital or interplanetary missions in real-time 3D."}),I.jsxs("div",{className:"title-mode-row",role:"group","aria-label":"Flight Difficulty",children:[I.jsxs("button",{type:"button","data-testid":"title-mode-beginner",className:`hud-pill-btn ${e==="BEGINNER"?"active":""}`,onClick:()=>h("BEGINNER"),children:["BEGINNER MODE",I.jsx("span",{className:"pill-sub",children:"Plain-English Tips & Flight Assist"})]}),I.jsxs("button",{type:"button","data-testid":"title-mode-realistic",className:`hud-pill-btn ${e==="REALISTIC"?"active":""}`,onClick:()=>h("REALISTIC"),children:["REALISTIC MODE",I.jsx("span",{className:"pill-sub",children:"Full Δv, Isp & Manual Steering"})]})]}),I.jsxs("div",{className:"title-actions",children:[I.jsx("button",{type:"button","data-testid":"btn-singleplayer",className:"primary-cta-btn",onClick:f,children:"SINGLEPLAYER MISSION"}),I.jsx("button",{type:"button","data-testid":"btn-multiplayer",className:"locked-cta-btn",disabled:!0,"aria-disabled":"true",children:"MULTIPLAYER (LOCKED — COMING SOON)"})]})]})});if(t==="OBJECTIVE_SELECT")return I.jsx("div",{className:"hud-layer pointer-pass","data-testid":"objective-select-hud",children:I.jsxs("div",{className:"tactical-reticle",children:[I.jsx("div",{className:"reticle-kicker",children:"PHASE 1 // TARGET ACQUISITION"}),I.jsxs("div",{className:"target-chip-row",children:[I.jsx("button",{type:"button","data-testid":"obj-explore-space",className:`target-chip ${n==="EXPLORE_SPACE"?"active":""}`,onClick:()=>p("EXPLORE_SPACE"),children:"EXPLORE SPACE"}),I.jsx("button",{type:"button","data-testid":"obj-moon-landing",className:`target-chip ${n==="MOON_LANDING"?"active":""}`,onClick:()=>p("MOON_LANDING"),children:"MOON LANDING"}),I.jsx("button",{type:"button","data-testid":"obj-mars-landing",className:`target-chip ${n==="MARS_LANDING"?"active":""}`,onClick:()=>p("MARS_LANDING"),children:"MARS LANDING"})]}),r&&I.jsxs("div",{className:"subchoice-row","data-testid":"explore-subchoice",children:[I.jsx("button",{type:"button","data-testid":"subobj-earth-observation",className:`sub-chip ${i==="EARTH_OBSERVATION"?"active":""}`,onClick:()=>_("EARTH_OBSERVATION"),children:"EARTH OBSERVATION (LEO)"}),I.jsx("button",{type:"button","data-testid":"subobj-space-telescope",className:`sub-chip ${i==="SPACE_TELESCOPE"?"active":""}`,onClick:()=>_("SPACE_TELESCOPE"),children:"SPACE TELESCOPE (1,800 KM)"})]}),I.jsx("div",{className:"reticle-divider"}),I.jsx("h2",{className:"reticle-title",children:J.title}),I.jsx("div",{className:"reticle-sub",children:J.subtitle}),I.jsxs("div",{className:"reticle-specs-row",children:[I.jsxs("span",{children:["Δv TARGET: ",J.targetDeltaVMs," m/s"]}),I.jsxs("span",{children:["CAP: $",J.budgetCapM,"M"]}),I.jsxs("span",{children:["WINDOW: ",J.scheduleLimitMonths," mo"]})]}),I.jsxs("div",{className:"reticle-intel",children:[I.jsxs("div",{className:"intel-col",children:[I.jsx("div",{className:"intel-hdr pros",children:"ADVANTAGES"}),J.pros.map(N=>I.jsxs("div",{className:"intel-line",children:["+ ",N]},N))]}),I.jsxs("div",{className:"intel-col",children:[I.jsx("div",{className:"intel-hdr cons",children:"HAZARDS"}),J.challenges.map(N=>I.jsxs("div",{className:"intel-line",children:["! ",N]},N))]})]}),I.jsx("button",{type:"button","data-testid":"enter-hangar-btn",className:"primary-cta-btn full-w",onClick:g,children:"ENTER VAB HANGAR"})]})});if(t==="HANGAR"){const N=ga(i,s,e,o),ce=a??"structure",G=new Set(N.conflicts.map(se=>se.affectedCategory)),X=ce==="launcher"?qv.map(se=>({id:se.id,name:se.name,costM:se.costM,leadMonths:se.leadMonths,desc:$?se.beginnerDesc:se.realisticDesc,meta:`${se.stage1ThrustN/1e3} kN · $${se.costM}M`})):$v.filter(se=>se.category===ce).map(se=>({id:se.id,name:se.name,costM:se.costM,leadMonths:se.leadMonths,desc:$?se.beginnerDesc:se.realisticDesc,meta:`${se.massKg} kg · $${se.costM}M`})),le=ce==="launcher"?s.launcherId:s[`${ce}Id`],ne=X.find(se=>se.id===D)??X.find(se=>se.id===le)??X[0];return I.jsxs("div",{className:"hud-layer pointer-pass","data-testid":"hangar-hud",children:[I.jsxs("div",{className:"hangar-right-actions",children:[I.jsxs("div",{className:"vab-readout-pill",children:[I.jsxs("span",{children:["PAD TWR: ",N.mass.padTwr.toFixed(2)]}),I.jsxs("span",{children:["TOTAL Δv: ",Math.round(N.mass.totalDeltaVMs)," m/s"]})]}),I.jsx("button",{type:"button","data-testid":"kap-auto-engineer-btn",className:"secondary-hud-btn",onClick:v,children:"KAP AUTO-ENGINEER"}),I.jsx("button",{type:"button","data-testid":"rollout-ground-btn",className:`primary-cta-btn ${N.isLaunchable?"ready":N.isComplete?"warn":""}`,disabled:!N.isComplete,onClick:M,children:N.isLaunchable?"ROLL OUT TO GROUND CONTROL":N.isComplete?"ROLL OUT (CONFLICTS ACTIVE)":"EQUIP ALL 8 SLOTS"})]}),I.jsxs("div",{className:"hangar-bottom-dock",children:[ne&&I.jsxs("div",{className:"part-inspector-bar",children:[I.jsxs("strong",{children:[ne.name,":"]})," ",ne.desc]}),I.jsx("div",{className:"part-tier-row",children:X.map(se=>{const Ne=le===se.id;return I.jsxs("button",{type:"button",draggable:!0,"data-testid":`part-chip-${se.id}`,className:`part-tier-chip ${Ne?"selected":""}`,onMouseEnter:()=>Q(se.id),onMouseLeave:()=>Q(null),onDragStart:de=>{de.dataTransfer.setData("application/json",JSON.stringify({category:ce,partId:se.id}))},onClick:()=>d(ce,se.id),children:[I.jsx("div",{className:"part-chip-name",children:se.name}),I.jsx("div",{className:"part-chip-meta",children:se.meta})]},se.id)})}),I.jsx("div",{className:"slot-dock-row",children:Cx.map(se=>{const Ne=se.key==="launcher"?s.launcherId:s[`${se.key}Id`],de=ce===se.key,je=G.has(se.key);return I.jsxs("button",{type:"button","data-testid":`slot-btn-${se.key}`,className:`slot-dock-btn ${de?"active":""} ${Ne?"filled":"empty"} ${je?"conflict":""}`,onClick:()=>m(se.key),children:[I.jsx("span",{className:"slot-dot"}),I.jsx("span",{children:se.label})]},se.key)})})]})]})}if(t==="GROUND_SEGMENT"){const N=Vc(i,s,o,e),ce=["S_BAND","X_BAND","KA_BAND"],G=[1,3,5];return I.jsx("div",{className:"hud-layer pointer-pass","data-testid":"ground-segment-hud",children:I.jsxs("div",{className:"ground-console",children:[I.jsx("div",{className:"reticle-kicker",children:"PHASE 3 // DSN & COMMS GREENLIGHT"}),I.jsx("div",{className:"console-subhint",children:"Click dishes on the 3D Earth or toggle below"}),I.jsx("div",{className:"console-section-label",children:"GROUND STATIONS"}),I.jsx("div",{className:"station-chip-grid",children:Gc.map(X=>{const le=o.activeStationIds.includes(X.id);return I.jsxs("button",{type:"button","data-testid":`station-btn-${X.id}`,className:`station-chip ${le?"active":""}`,onClick:()=>C(X.id),children:[I.jsx("span",{children:X.name.replace(/\s*\(.*?\)/,"")}),I.jsx("span",{className:"chip-cost",children:X.costM>0?`$${X.costM}M`:"INCL"})]},X.id)})}),I.jsx("div",{className:"console-section-label",children:"RADIO FREQUENCY BAND"}),I.jsx("div",{className:"band-row",children:ce.map(X=>{const le=ma[X];return I.jsxs("button",{type:"button","data-testid":`band-btn-${X}`,className:`band-chip ${o.bandId===X?"active":""}`,onClick:()=>w(X),children:[I.jsx("div",{children:le.id.replace("_BAND","-BAND")}),I.jsxs("div",{className:"chip-cost",children:[le.bandwidthMbps," Mbps · $",le.costM,"M"]})]},X)})}),I.jsx("div",{className:"console-section-label",children:"OPERATIONS LIFETIME"}),I.jsx("div",{className:"band-row",children:G.map(X=>I.jsxs("button",{type:"button","data-testid":`lifetime-btn-${X}`,className:`band-chip ${o.plannedLifetimeYears===X?"active":""}`,onClick:()=>A(X),children:[X," YEAR",X>1?"S":""]},X))}),I.jsxs("div",{className:"link-clearance-box",children:[I.jsxs("div",{className:"clearance-row",children:[I.jsx("span",{children:"CONTACT COVERAGE"}),I.jsxs("strong",{children:[N.contactCoveragePct,"%"]})]}),I.jsxs("div",{className:"clearance-row",children:[I.jsx("span",{children:"ORBIT DATA GEN / DOWNLINK"}),I.jsxs("strong",{children:[Math.round(N.dataGeneratedPerOrbitMb)," /"," ",Math.round(N.downlinkCapacityPerOrbitMb)," MB"]})]}),I.jsx("div",{className:"clearance-bar-track",children:I.jsx("div",{className:`clearance-bar-fill risk-${N.bufferOverflowRisk.toLowerCase()}`,style:{width:`${Math.min(100,N.downlinkCapacityPerOrbitMb/Math.max(1,N.dataGeneratedPerOrbitMb)*60)}%`}})})]}),I.jsxs("div",{className:"ground-cta-row",children:[I.jsx("button",{type:"button","data-testid":"back-to-hangar-btn",className:"secondary-hud-btn",onClick:y,children:"BACK TO VAB"}),I.jsx("button",{type:"button","data-testid":"greenlight-liftoff-btn",className:"primary-cta-btn",disabled:!N.canGreenlight,onClick:b,children:"GREENLIGHT LIFTOFF"})]})]})})}if(t==="FLIGHT"&&l){const N=[1,5,25,100,500],ce=Math.round(l.batteryWh/Math.max(1,l.batteryMaxWh)*100),G=l.activeStageIndex===0?l.stage1PropKg:l.stage2PropKg;return I.jsxs("div",{className:"hud-layer pointer-pass","data-testid":"flight-hud",children:[I.jsxs("div",{className:"flight-left-throttle",children:[I.jsxs("div",{className:"stage-badge","data-testid":"flight-stage-badge",children:["STAGE ",l.activeStageIndex+1]}),I.jsx("input",{type:"range",min:0,max:100,value:Math.round(c.throttle*100),onChange:X=>x(Number(X.target.value)/100),"aria-label":"Throttle",className:"throttle-slider","data-testid":"throttle-slider"}),I.jsxs("div",{className:"throttle-pct",children:[Math.round(c.throttle*100),"%"]}),I.jsx("button",{type:"button","data-testid":"stage-btn",className:"stage-trigger-btn",disabled:l.activeStageIndex===1,onClick:P,children:"STAGE"})]}),I.jsxs("div",{className:"flight-right-controls",children:[I.jsxs("div",{className:"flight-phase-pill","data-testid":"flight-status-pill",children:["PHASE: ",l.status]}),l.status==="PRELAUNCH"?I.jsx("button",{type:"button","data-testid":"ignite-launch-btn",className:"primary-cta-btn ignite",onClick:E,children:"IGNITE LAUNCH"}):I.jsx("button",{type:"button","data-testid":"abort-mission-btn",className:"abort-hud-btn",onClick:V,children:"END MISSION"})]}),I.jsxs("div",{className:"flight-bottom-strip",children:[I.jsxs("div",{className:"flight-controls-row",children:[I.jsx("button",{type:"button","data-testid":"toggle-autopilot-btn",className:`mini-toggle-btn ${c.autoGuidance?"active":""}`,onClick:H,children:c.autoGuidance?"AUTO PILOT: ON":"MANUAL STEER"}),I.jsxs("button",{type:"button","data-testid":"toggle-autostage-btn",className:`mini-toggle-btn ${c.autoStage?"active":""}`,onClick:Y,children:["AUTO-STAGE: ",c.autoStage?"ON":"OFF"]}),I.jsxs("div",{className:"warp-group",children:[I.jsx("span",{className:"warp-label",children:"WARP"}),N.map(X=>I.jsxs("button",{type:"button","data-testid":`warp-btn-${X}`,className:`warp-btn ${l.timeWarp===X?"active":""}`,onClick:()=>B(X),children:[X,"x"]},X))]})]}),I.jsxs("div",{className:"instrument-row",children:[I.jsxs("div",{className:"inst-pill",children:[I.jsx("span",{className:"inst-k",children:"ALT"}),I.jsx("span",{className:"inst-v","data-testid":"inst-alt",children:bu(l.orbitalElements.altitudeM)})]}),I.jsxs("div",{className:"inst-pill",children:[I.jsx("span",{className:"inst-k",children:"SPD"}),I.jsxs("span",{className:"inst-v","data-testid":"inst-spd",children:[Math.round(l.orbitalElements.speedMs)," m/s"]})]}),I.jsxs("div",{className:"inst-pill",children:[I.jsx("span",{className:"inst-k",children:"AP"}),I.jsx("span",{className:"inst-v",children:bu(l.orbitalElements.apoapsisAltM)})]}),I.jsxs("div",{className:"inst-pill",children:[I.jsx("span",{className:"inst-k",children:"PE"}),I.jsx("span",{className:"inst-v",children:bu(l.orbitalElements.periapsisAltM)})]}),I.jsxs("div",{className:"inst-pill",children:[I.jsx("span",{className:"inst-k",children:"FUEL"}),I.jsxs("span",{className:"inst-v",children:[Math.round(G)," kg"]})]}),I.jsxs("div",{className:"inst-pill",children:[I.jsx("span",{className:"inst-k",children:"BAT"}),I.jsxs("span",{className:"inst-v",children:[ce,"%",l.inEclipse?" (ECLIPSE)":""]})]}),I.jsxs("div",{className:"inst-pill",children:[I.jsx("span",{className:"inst-k",children:"SCIENCE"}),I.jsxs("span",{className:"inst-v","data-testid":"inst-science",children:[l.deliveredDataMb.toFixed(0),"/",J.targetScienceMb," MB"]})]})]})]})]})}if(t==="DEBRIEF"&&u){const N=["mass","power","budget","data","comms","time"];return I.jsx("div",{className:"hud-layer debrief-overlay","data-testid":"debrief-hud",children:I.jsxs("div",{className:"debrief-frame",children:[I.jsxs("div",{className:"debrief-header",children:[I.jsx("span",{className:`outcome-badge ${u.outcome==="SUCCESS"?"success":"failed"}`,"data-testid":"debrief-outcome",children:u.outcome==="SUCCESS"?"MISSION ACCOMPLISHED":"MISSION FAILED"}),I.jsx("h2",{className:"debrief-title",children:u.headline})]}),I.jsx("div",{className:"debrief-resource-grid",children:N.map(ce=>{const G=u.resources[ce];return I.jsxs("div",{className:`debrief-res-cell status-${G.status.toLowerCase()}`,"data-testid":`debrief-res-${ce}`,children:[I.jsxs("div",{className:"debrief-cell-top",children:[I.jsx("span",{className:"debrief-cell-name",children:Rx[ce]}),I.jsx("span",{className:"debrief-cell-status",children:G.status})]}),I.jsxs("div",{className:"debrief-line right",children:[I.jsx("strong",{children:"RIGHT:"})," ",G.whatWentRight]}),I.jsxs("div",{className:"debrief-line wrong",children:[I.jsx("strong",{children:"ISSUE:"})," ",G.whatWentWrong]}),I.jsx("div",{className:"debrief-line note",children:$?G.beginnerNote:G.realisticMetrics})]},ce)})}),I.jsxs("div",{className:"debrief-actions",children:[I.jsx("button",{type:"button","data-testid":"return-hangar-keep-btn",className:"primary-cta-btn",onClick:z,children:"RETURN TO HANGAR (KEEP DESIGN)"}),I.jsx("button",{type:"button","data-testid":"new-mission-btn",className:"secondary-hud-btn",onClick:K,children:"NEW MISSION"})]})]})})}return null},Ix=()=>{const t=xe(b=>b.phase),e=xe(b=>b.difficulty),n=xe(b=>b.missionId),i=xe(b=>b.spacecraft),r=xe(b=>b.ground),s=xe(b=>b.flight),a=xe(b=>b.setDifficulty);if(t==="TITLE")return null;const o=Ti[n],l=ga(n,i,e,r),c=Vc(n,i,r,e),u=ma[r.bandId],f=e==="BEGINNER",h=t==="FLIGHT"&&s?f?`${Math.round(s.deltaVRemainingMs)} m/s fuel`:`${Math.round(s.deltaVRemainingMs)} m/s Δv`:f?`${l.mass.spacecraftDryKg} kg`:`${l.mass.spacecraftDryKg}kg · ${Math.round(l.mass.totalDeltaVMs)}m/s`,p=t==="FLIGHT"&&s?f?`${Math.round(s.batteryWh/Math.max(1,s.batteryMaxWh)*100)}% bat`:`${Math.round(s.currentPowerGenW-s.currentPowerDrawW)}W · ${Math.round(s.batteryWh)}Wh`:f?`${Math.round(l.power.netSunlitW)}W net`:`${Math.round(l.power.sunlitGenerationW)}/${l.power.totalDrawW}W · ${l.power.batteryWh}Wh`,_=t==="HANGAR"||t==="OBJECTIVE_SELECT"?l.budget.totalCraftAndLauncherM:c.totalCampaignCostM,g=_>o.budgetCapM,m=t==="FLIGHT"&&s?`${Math.round(s.deliveredDataMb)}/${o.targetScienceMb} MB`:f?`${l.data.payloadDataRateMbps} Mbps`:`${l.data.payloadDataRateMbps}/${l.data.cpuMaxMbps} Mbps`,d=t==="FLIGHT"&&s?`${s.activeDsnStationIds.length} link · ${u.id.replace("_BAND","")}`:`${c.contactCoveragePct}% · ${u.id.replace("_BAND","")}`,v=t==="HANGAR"||t==="OBJECTIVE_SELECT"?l.schedule.buildMonths:c.totalCampaignMonths,M=v>o.scheduleLimitMonths,y=l.conflicts.some(b=>b.resource==="mass"&&b.severity==="CRITICAL"),C=l.conflicts.some(b=>b.resource==="power"&&b.severity==="CRITICAL"),w=l.conflicts.some(b=>b.resource==="data"&&b.severity==="CRITICAL")||t==="GROUND_SEGMENT"&&c.bufferOverflowRisk==="CRITICAL",A=l.conflicts.some(b=>b.resource==="comms"&&b.severity==="CRITICAL")||r.activeStationIds.length===0;return I.jsxs("header",{className:"top-resource-strip","data-testid":"top-resource-strip",children:[I.jsxs("div",{className:"top-mission-tag",children:[I.jsx("span",{className:"mission-dot"}),I.jsx("span",{className:"mission-title-text",children:o.title})]}),I.jsxs("div",{className:"resource-gauges",children:[I.jsxs("div",{className:`res-pill ${y?"alert":""}`,children:[I.jsx("span",{className:"res-label",children:"MASS"}),I.jsx("span",{className:"res-val",children:h})]}),I.jsxs("div",{className:`res-pill ${C?"alert":""}`,children:[I.jsx("span",{className:"res-label",children:"POWER"}),I.jsx("span",{className:"res-val",children:p})]}),I.jsxs("div",{className:`res-pill ${g?"alert":""}`,children:[I.jsx("span",{className:"res-label",children:"BUDGET"}),I.jsxs("span",{className:"res-val",children:["$",_,"M / $",o.budgetCapM,"M"]})]}),I.jsxs("div",{className:`res-pill ${w?"alert":""}`,children:[I.jsx("span",{className:"res-label",children:"DATA"}),I.jsx("span",{className:"res-val",children:m})]}),I.jsxs("div",{className:`res-pill ${A?"alert":""}`,children:[I.jsx("span",{className:"res-label",children:"COMMS"}),I.jsx("span",{className:"res-val",children:d})]}),I.jsxs("div",{className:`res-pill ${M?"alert":""}`,children:[I.jsx("span",{className:"res-label",children:"TIME"}),I.jsx("span",{className:"res-val",children:t==="FLIGHT"&&s?`T+${Math.round(s.elapsedFlightSec)}s`:`${v}/${o.scheduleLimitMonths} mo`})]})]}),I.jsxs("div",{className:"mode-toggle-group",role:"group","aria-label":"Difficulty Mode",children:[I.jsx("button",{type:"button","data-testid":"hud-mode-beginner",className:`mode-btn ${e==="BEGINNER"?"active":""}`,onClick:()=>a("BEGINNER"),children:"BEGINNER"}),I.jsx("button",{type:"button","data-testid":"hud-mode-realistic",className:`mode-btn ${e==="REALISTIC"?"active":""}`,onClick:()=>a("REALISTIC"),children:"REALISTIC"})]})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hh="170",Lx=0,xm=1,Dx=2,Qv=1,Nx=2,Li=3,Xi=0,mn=1,cn=2,Sr=0,Ys=1,sa=2,Sm=3,Em=4,Ux=5,zr=100,Ox=101,Fx=102,kx=103,Bx=104,zx=200,Gx=201,Hx=202,Vx=203,rf=204,sf=205,Wx=206,jx=207,Xx=208,$x=209,qx=210,Yx=211,Kx=212,Zx=213,Qx=214,af=0,of=1,lf=2,aa=3,cf=4,uf=5,df=6,ff=7,Jv=0,Jx=1,eS=2,Er=0,tS=1,nS=2,iS=3,e_=4,rS=5,sS=6,aS=7,t_=300,oa=301,la=302,hf=303,pf=304,Wc=306,vc=1e3,Xr=1001,mf=1002,fi=1003,oS=1004,nl=1005,xi=1006,Cu=1007,$r=1008,$i=1009,n_=1010,i_=1011,yo=1012,Vh=1013,ns=1014,ki=1015,Po=1016,Wh=1017,jh=1018,ca=1020,r_=35902,s_=1021,a_=1022,ci=1023,o_=1024,l_=1025,Ks=1026,ua=1027,c_=1028,Xh=1029,u_=1030,$h=1031,qh=1033,zl=33776,Gl=33777,Hl=33778,Vl=33779,gf=35840,vf=35841,_f=35842,Mf=35843,yf=36196,xf=37492,Sf=37496,Ef=37808,wf=37809,Tf=37810,Af=37811,bf=37812,Cf=37813,Rf=37814,Pf=37815,If=37816,Lf=37817,Df=37818,Nf=37819,Uf=37820,Of=37821,Wl=36492,Ff=36494,kf=36495,d_=36283,Bf=36284,zf=36285,Gf=36286,lS=3200,cS=3201,f_=0,uS=1,dr="",On="srgb",va="srgb-linear",jc="linear",ft="srgb",us=7680,wm=519,dS=512,fS=513,hS=514,h_=515,pS=516,mS=517,gS=518,vS=519,Tm=35044,Am="300 es",Bi=2e3,_c=2001;class _a{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ru=Math.PI/180,Mc=180/Math.PI;function Io(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[t&255]+sn[t>>8&255]+sn[t>>16&255]+sn[t>>24&255]+"-"+sn[e&255]+sn[e>>8&255]+"-"+sn[e>>16&15|64]+sn[e>>24&255]+"-"+sn[n&63|128]+sn[n>>8&255]+"-"+sn[n>>16&255]+sn[n>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function wn(t,e,n){return Math.max(e,Math.min(n,t))}function _S(t,e){return(t%e+e)%e}function Pu(t,e,n){return(1-n)*t+n*e}function Pa(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function Sn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class Ye{constructor(e=0,n=0){Ye.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(wn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,n,i,r,s,a,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],_=i[8],g=r[0],m=r[3],d=r[6],v=r[1],M=r[4],y=r[7],C=r[2],w=r[5],A=r[8];return s[0]=a*g+o*v+l*C,s[3]=a*m+o*M+l*w,s[6]=a*d+o*y+l*A,s[1]=c*g+u*v+f*C,s[4]=c*m+u*M+f*w,s[7]=c*d+u*y+f*A,s[2]=h*g+p*v+_*C,s[5]=h*m+p*M+_*w,s[8]=h*d+p*y+_*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return n*a*u-n*o*c-i*s*u+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=u*a-o*c,h=o*l-u*s,p=c*s-a*l,_=n*f+i*h+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(r*c-u*i)*g,e[2]=(o*i-r*a)*g,e[3]=h*g,e[4]=(u*n-r*l)*g,e[5]=(r*s-o*n)*g,e[6]=p*g,e[7]=(i*l-c*n)*g,e[8]=(a*n-i*s)*g,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(Iu.makeScale(e,n)),this}rotate(e){return this.premultiply(Iu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Iu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Iu=new Ve;function p_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function yc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function MS(){const t=yc("canvas");return t.style.display="block",t}const bm={};function Wa(t){t in bm||(bm[t]=!0,console.warn(t))}function yS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function xS(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function SS(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const et={enabled:!0,workingColorSpace:va,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===ft&&(t.r=Gi(t.r),t.g=Gi(t.g),t.b=Gi(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===ft&&(t.r=Zs(t.r),t.g=Zs(t.g),t.b=Zs(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===dr?jc:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function Gi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Zs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}const Cm=[.64,.33,.3,.6,.15,.06],Rm=[.2126,.7152,.0722],Pm=[.3127,.329],Im=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lm=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);et.define({[va]:{primaries:Cm,whitePoint:Pm,transfer:jc,toXYZ:Im,fromXYZ:Lm,luminanceCoefficients:Rm,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:Cm,whitePoint:Pm,transfer:ft,toXYZ:Im,fromXYZ:Lm,luminanceCoefficients:Rm,outputColorSpaceConfig:{drawingBufferColorSpace:On}}});let ds;class ES{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ds===void 0&&(ds=yc("canvas")),ds.width=e.width,ds.height=e.height;const i=ds.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ds}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=yc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Gi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Gi(n[i]/255)*255):n[i]=Gi(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wS=0;class m_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wS++}),this.uuid=Io(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Lu(r[a].image)):s.push(Lu(r[a]))}else s=Lu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Lu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?ES.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let TS=0;class gn extends _a{constructor(e=gn.DEFAULT_IMAGE,n=gn.DEFAULT_MAPPING,i=Xr,r=Xr,s=xi,a=$r,o=ci,l=$i,c=gn.DEFAULT_ANISOTROPY,u=dr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:TS++}),this.uuid=Io(),this.name="",this.source=new m_(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==t_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vc:e.x=e.x-Math.floor(e.x);break;case Xr:e.x=e.x<0?0:1;break;case mf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vc:e.y=e.y-Math.floor(e.y);break;case Xr:e.y=e.y<0?0:1;break;case mf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=t_;gn.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,n=0,i=0,r=1){ht.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],_=l[9],g=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,y=(p+1)/2,C=(d+1)/2,w=(u+h)/4,A=(f+g)/4,b=(_+m)/4;return M>y&&M>C?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=w/i,s=A/i):y>C?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=w/r,s=b/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=b/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-_)*(m-_)+(f-g)*(f-g)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-_)/v,this.y=(f-g)/v,this.z=(h-u)/v,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class AS extends _a{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new ht(0,0,e,n),this.scissorTest=!1,this.viewport=new ht(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new gn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new m_(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class is extends AS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class g_ extends gn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=fi,this.minFilter=fi,this.wrapR=Xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bS extends gn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=fi,this.minFilter=fi,this.wrapR=Xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[a+0],p=s[a+1],_=s[a+2],g=s[a+3];if(o===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f;return}if(o===1){e[n+0]=h,e[n+1]=p,e[n+2]=_,e[n+3]=g;return}if(f!==g||l!==h||c!==p||u!==_){let m=1-o;const d=l*h+c*p+u*_+f*g,v=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const C=Math.sqrt(M),w=Math.atan2(C,d*v);m=Math.sin(m*w)/C,o=Math.sin(o*w)/C}const y=o*v;if(l=l*m+h*y,c=c*m+p*y,u=u*m+_*y,f=f*m+g*y,m===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=C,c*=C,u*=C,f*=C}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[a],h=s[a+1],p=s[a+2],_=s[a+3];return e[n]=o*_+u*f+l*p-c*h,e[n+1]=l*_+u*h+c*f-o*p,e[n+2]=c*_+u*p+o*h-l*f,e[n+3]=u*_-o*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(r/2),f=o(s/2),h=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"YXZ":this._x=h*u*f+c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"ZXY":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f-h*p*_;break;case"ZYX":this._x=h*u*f-c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f+h*p*_;break;case"YZX":this._x=h*u*f+c*p*_,this._y=c*p*f+h*u*_,this._z=c*u*_-h*p*f,this._w=c*u*f-h*p*_;break;case"XZY":this._x=h*u*f-c*p*_,this._y=c*p*f-h*u*_,this._z=c*u*_+h*p*f,this._w=c*u*f+h*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],u=n[6],f=n[10],h=i+o+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wn(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-i*c,this._z=s*u+a*c+i*l-r*o,this._w=a*u-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-n;return this._w=p*a+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-n)*u)/c,h=Math.sin(n*u)/c;return this._w=a*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,n=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Dm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Dm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),u=2*(o*n-s*r),f=2*(s*i-a*n);return this.x=n+l*c+a*f-o*u,this.y=i+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Du.copy(this).projectOnVector(e),this.sub(Du)}reflect(e){return this.sub(Du.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(wn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Du=new L,Dm=new Lo;class Do{constructor(e=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ni.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ni.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ni.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ni):ni.fromBufferAttribute(s,a),ni.applyMatrix4(e.matrixWorld),this.expandByPoint(ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),il.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),il.copy(i.boundingBox)),il.applyMatrix4(e.matrixWorld),this.union(il)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ni),ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ia),rl.subVectors(this.max,Ia),fs.subVectors(e.a,Ia),hs.subVectors(e.b,Ia),ps.subVectors(e.c,Ia),Ji.subVectors(hs,fs),er.subVectors(ps,hs),Pr.subVectors(fs,ps);let n=[0,-Ji.z,Ji.y,0,-er.z,er.y,0,-Pr.z,Pr.y,Ji.z,0,-Ji.x,er.z,0,-er.x,Pr.z,0,-Pr.x,-Ji.y,Ji.x,0,-er.y,er.x,0,-Pr.y,Pr.x,0];return!Nu(n,fs,hs,ps,rl)||(n=[1,0,0,0,1,0,0,0,1],!Nu(n,fs,hs,ps,rl))?!1:(sl.crossVectors(Ji,er),n=[sl.x,sl.y,sl.z],Nu(n,fs,hs,ps,rl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const bi=[new L,new L,new L,new L,new L,new L,new L,new L],ni=new L,il=new Do,fs=new L,hs=new L,ps=new L,Ji=new L,er=new L,Pr=new L,Ia=new L,rl=new L,sl=new L,Ir=new L;function Nu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Ir.fromArray(t,s);const o=r.x*Math.abs(Ir.x)+r.y*Math.abs(Ir.y)+r.z*Math.abs(Ir.z),l=e.dot(Ir),c=n.dot(Ir),u=i.dot(Ir);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const CS=new Do,La=new L,Uu=new L;class No{constructor(e=new L,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):CS.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;La.subVectors(e,this.center);const n=La.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(La,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Uu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(La.copy(e.center).add(Uu)),this.expandByPoint(La.copy(e.center).sub(Uu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ci=new L,Ou=new L,al=new L,tr=new L,Fu=new L,ol=new L,ku=new L;class Xc{constructor(e=new L,n=new L(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ci)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ci.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ci.copy(this.origin).addScaledVector(this.direction,n),Ci.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Ou.copy(e).add(n).multiplyScalar(.5),al.copy(n).sub(e).normalize(),tr.copy(this.origin).sub(Ou);const s=e.distanceTo(n)*.5,a=-this.direction.dot(al),o=tr.dot(this.direction),l=-tr.dot(al),c=tr.lengthSq(),u=Math.abs(1-a*a);let f,h,p,_;if(u>0)if(f=a*l-o,h=a*o-l,_=s*u,f>=0)if(h>=-_)if(h<=_){const g=1/u;f*=g,h*=g,p=f*(f+a*h+2*o)+h*(a*f+h+2*l)+c}else h=s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ou).addScaledVector(al,h),p}intersectSphere(e,n){Ci.subVectors(e.center,this.origin);const i=Ci.dot(this.direction),r=Ci.dot(Ci)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(o=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ci)!==null}intersectTriangle(e,n,i,r,s){Fu.subVectors(n,e),ol.subVectors(i,e),ku.crossVectors(Fu,ol);let a=this.direction.dot(ku),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;tr.subVectors(this.origin,e);const l=o*this.direction.dot(ol.crossVectors(tr,ol));if(l<0)return null;const c=o*this.direction.dot(Fu.cross(tr));if(c<0||l+c>a)return null;const u=-o*tr.dot(ku);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _t{constructor(e,n,i,r,s,a,o,l,c,u,f,h,p,_,g,m){_t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,u,f,h,p,_,g,m)}set(e,n,i,r,s,a,o,l,c,u,f,h,p,_,g,m){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=_,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/ms.setFromMatrixColumn(e,0).length(),s=1/ms.setFromMatrixColumn(e,1).length(),a=1/ms.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=a*u,p=a*f,_=o*u,g=o*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=p+_*c,n[5]=h-g*c,n[9]=-o*l,n[2]=g-h*c,n[6]=_+p*c,n[10]=a*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,_=c*u,g=c*f;n[0]=h+g*o,n[4]=_*o-p,n[8]=a*c,n[1]=a*f,n[5]=a*u,n[9]=-o,n[2]=p*o-_,n[6]=g+h*o,n[10]=a*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,_=c*u,g=c*f;n[0]=h-g*o,n[4]=-a*f,n[8]=_+p*o,n[1]=p+_*o,n[5]=a*u,n[9]=g-h*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const h=a*u,p=a*f,_=o*u,g=o*f;n[0]=l*u,n[4]=_*c-p,n[8]=h*c+g,n[1]=l*f,n[5]=g*c+h,n[9]=p*c-_,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const h=a*l,p=a*c,_=o*l,g=o*c;n[0]=l*u,n[4]=g-h*f,n[8]=_*f+p,n[1]=f,n[5]=a*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*f+_,n[10]=h-g*f}else if(e.order==="XZY"){const h=a*l,p=a*c,_=o*l,g=o*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=h*f+g,n[5]=a*u,n[9]=p*f-_,n[2]=_*f-p,n[6]=o*u,n[10]=g*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(RS,e,PS)}lookAt(e,n,i){const r=this.elements;return Dn.subVectors(e,n),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),nr.crossVectors(i,Dn),nr.lengthSq()===0&&(Math.abs(i.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),nr.crossVectors(i,Dn)),nr.normalize(),ll.crossVectors(Dn,nr),r[0]=nr.x,r[4]=ll.x,r[8]=Dn.x,r[1]=nr.y,r[5]=ll.y,r[9]=Dn.y,r[2]=nr.z,r[6]=ll.z,r[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],_=i[2],g=i[6],m=i[10],d=i[14],v=i[3],M=i[7],y=i[11],C=i[15],w=r[0],A=r[4],b=r[8],E=r[12],x=r[1],P=r[5],B=r[9],H=r[13],Y=r[2],V=r[6],z=r[10],K=r[14],D=r[3],Q=r[7],J=r[11],$=r[15];return s[0]=a*w+o*x+l*Y+c*D,s[4]=a*A+o*P+l*V+c*Q,s[8]=a*b+o*B+l*z+c*J,s[12]=a*E+o*H+l*K+c*$,s[1]=u*w+f*x+h*Y+p*D,s[5]=u*A+f*P+h*V+p*Q,s[9]=u*b+f*B+h*z+p*J,s[13]=u*E+f*H+h*K+p*$,s[2]=_*w+g*x+m*Y+d*D,s[6]=_*A+g*P+m*V+d*Q,s[10]=_*b+g*B+m*z+d*J,s[14]=_*E+g*H+m*K+d*$,s[3]=v*w+M*x+y*Y+C*D,s[7]=v*A+M*P+y*V+C*Q,s[11]=v*b+M*B+y*z+C*J,s[15]=v*E+M*H+y*K+C*$,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],_=e[3],g=e[7],m=e[11],d=e[15];return _*(+s*l*f-r*c*f-s*o*h+i*c*h+r*o*p-i*l*p)+g*(+n*l*p-n*c*h+s*a*h-r*a*p+r*c*u-s*l*u)+m*(+n*c*f-n*o*p-s*a*f+i*a*p+s*o*u-i*c*u)+d*(-r*o*u-n*l*f+n*o*h+r*a*f-i*a*h+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],_=e[12],g=e[13],m=e[14],d=e[15],v=f*m*c-g*h*c+g*l*p-o*m*p-f*l*d+o*h*d,M=_*h*c-u*m*c-_*l*p+a*m*p+u*l*d-a*h*d,y=u*g*c-_*f*c+_*o*p-a*g*p-u*o*d+a*f*d,C=_*f*l-u*g*l-_*o*h+a*g*h+u*o*m-a*f*m,w=n*v+i*M+r*y+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=v*A,e[1]=(g*h*s-f*m*s-g*r*p+i*m*p+f*r*d-i*h*d)*A,e[2]=(o*m*s-g*l*s+g*r*c-i*m*c-o*r*d+i*l*d)*A,e[3]=(f*l*s-o*h*s-f*r*c+i*h*c+o*r*p-i*l*p)*A,e[4]=M*A,e[5]=(u*m*s-_*h*s+_*r*p-n*m*p-u*r*d+n*h*d)*A,e[6]=(_*l*s-a*m*s-_*r*c+n*m*c+a*r*d-n*l*d)*A,e[7]=(a*h*s-u*l*s+u*r*c-n*h*c-a*r*p+n*l*p)*A,e[8]=y*A,e[9]=(_*f*s-u*g*s-_*i*p+n*g*p+u*i*d-n*f*d)*A,e[10]=(a*g*s-_*o*s+_*i*c-n*g*c-a*i*d+n*o*d)*A,e[11]=(u*o*s-a*f*s-u*i*c+n*f*c+a*i*p-n*o*p)*A,e[12]=C*A,e[13]=(u*g*r-_*f*r+_*i*h-n*g*h-u*i*m+n*f*m)*A,e[14]=(_*o*r-a*g*r-_*i*l+n*g*l+a*i*m-n*o*m)*A,e[15]=(a*f*r-u*o*r+u*i*l-n*f*l-a*i*h+n*o*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+i,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,u=a+a,f=o+o,h=s*c,p=s*u,_=s*f,g=a*u,m=a*f,d=o*f,v=l*c,M=l*u,y=l*f,C=i.x,w=i.y,A=i.z;return r[0]=(1-(g+d))*C,r[1]=(p+y)*C,r[2]=(_-M)*C,r[3]=0,r[4]=(p-y)*w,r[5]=(1-(h+d))*w,r[6]=(m+v)*w,r[7]=0,r[8]=(_+M)*A,r[9]=(m-v)*A,r[10]=(1-(h+g))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=ms.set(r[0],r[1],r[2]).length();const a=ms.set(r[4],r[5],r[6]).length(),o=ms.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ii.copy(this);const c=1/s,u=1/a,f=1/o;return ii.elements[0]*=c,ii.elements[1]*=c,ii.elements[2]*=c,ii.elements[4]*=u,ii.elements[5]*=u,ii.elements[6]*=u,ii.elements[8]*=f,ii.elements[9]*=f,ii.elements[10]*=f,n.setFromRotationMatrix(ii),i.x=s,i.y=a,i.z=o,this}makePerspective(e,n,i,r,s,a,o=Bi){const l=this.elements,c=2*s/(n-e),u=2*s/(i-r),f=(n+e)/(n-e),h=(i+r)/(i-r);let p,_;if(o===Bi)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===_c)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Bi){const l=this.elements,c=1/(n-e),u=1/(i-r),f=1/(a-s),h=(n+e)*c,p=(i+r)*u;let _,g;if(o===Bi)_=(a+s)*f,g=-2*f;else if(o===_c)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const ms=new L,ii=new _t,RS=new L(0,0,0),PS=new L(1,1,1),nr=new L,ll=new L,Dn=new L,Nm=new _t,Um=new Lo;class wi{constructor(e=0,n=0,i=0,r=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(wn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(wn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-wn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(wn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-wn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Nm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Um.setFromEuler(this),this.setFromQuaternion(Um,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class Yh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let IS=0;const Om=new L,gs=new Lo,Ri=new _t,cl=new L,Da=new L,LS=new L,DS=new Lo,Fm=new L(1,0,0),km=new L(0,1,0),Bm=new L(0,0,1),zm={type:"added"},NS={type:"removed"},vs={type:"childadded",child:null},Bu={type:"childremoved",child:null};class zt extends _a{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:IS++}),this.uuid=Io(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new L,n=new wi,i=new Lo,r=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new Ve}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return gs.setFromAxisAngle(e,n),this.quaternion.multiply(gs),this}rotateOnWorldAxis(e,n){return gs.setFromAxisAngle(e,n),this.quaternion.premultiply(gs),this}rotateX(e){return this.rotateOnAxis(Fm,e)}rotateY(e){return this.rotateOnAxis(km,e)}rotateZ(e){return this.rotateOnAxis(Bm,e)}translateOnAxis(e,n){return Om.copy(e).applyQuaternion(this.quaternion),this.position.add(Om.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Fm,e)}translateY(e){return this.translateOnAxis(km,e)}translateZ(e){return this.translateOnAxis(Bm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?cl.copy(e):cl.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Da.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(Da,cl,this.up):Ri.lookAt(cl,Da,this.up),this.quaternion.setFromRotationMatrix(Ri),r&&(Ri.extractRotation(r.matrixWorld),gs.setFromRotationMatrix(Ri),this.quaternion.premultiply(gs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zm),vs.child=e,this.dispatchEvent(vs),vs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(NS),Bu.child=e,this.dispatchEvent(Bu),Bu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zm),vs.child=e,this.dispatchEvent(vs),vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Da,e,LS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Da,DS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),f=a(e.shapes),h=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}zt.DEFAULT_UP=new L(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ri=new L,Pi=new L,zu=new L,Ii=new L,_s=new L,Ms=new L,Gm=new L,Gu=new L,Hu=new L,Vu=new L,Wu=new ht,ju=new ht,Xu=new ht;class li{constructor(e=new L,n=new L,i=new L){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),ri.subVectors(e,n),r.cross(ri);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){ri.subVectors(r,n),Pi.subVectors(i,n),zu.subVectors(e,n);const a=ri.dot(ri),o=ri.dot(Pi),l=ri.dot(zu),c=Pi.dot(Pi),u=Pi.dot(zu),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-o*u)*h,_=(a*u-o*l)*h;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ii.x),l.addScaledVector(a,Ii.y),l.addScaledVector(o,Ii.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return Wu.setScalar(0),ju.setScalar(0),Xu.setScalar(0),Wu.fromBufferAttribute(e,n),ju.fromBufferAttribute(e,i),Xu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Wu,s.x),a.addScaledVector(ju,s.y),a.addScaledVector(Xu,s.z),a}static isFrontFacing(e,n,i,r){return ri.subVectors(i,n),Pi.subVectors(e,n),ri.cross(Pi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ri.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ri.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return li.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return li.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return li.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return li.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return li.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;_s.subVectors(r,i),Ms.subVectors(s,i),Gu.subVectors(e,i);const l=_s.dot(Gu),c=Ms.dot(Gu);if(l<=0&&c<=0)return n.copy(i);Hu.subVectors(e,r);const u=_s.dot(Hu),f=Ms.dot(Hu);if(u>=0&&f<=u)return n.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),n.copy(i).addScaledVector(_s,a);Vu.subVectors(e,s);const p=_s.dot(Vu),_=Ms.dot(Vu);if(_>=0&&p<=_)return n.copy(s);const g=p*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(Ms,o);const m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return Gm.subVectors(s,r),o=(f-u)/(f-u+(p-_)),n.copy(r).addScaledVector(Gm,o);const d=1/(m+g+h);return a=g*d,o=h*d,n.copy(i).addScaledVector(_s,a).addScaledVector(Ms,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const v_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ir={h:0,s:0,l:0},ul={h:0,s:0,l:0};function $u(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Be{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=On){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=et.workingColorSpace){return this.r=e,this.g=n,this.b=i,et.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=et.workingColorSpace){if(e=_S(e,1),n=wn(n,0,1),i=wn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=$u(a,s,e+1/3),this.g=$u(a,s,e),this.b=$u(a,s,e-1/3)}return et.toWorkingColorSpace(this,r),this}setStyle(e,n=On){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=On){const i=v_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}copyLinearToSRGB(e){return this.r=Zs(e.r),this.g=Zs(e.g),this.b=Zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=On){return et.fromWorkingColorSpace(an.copy(this),e),Math.round(wn(an.r*255,0,255))*65536+Math.round(wn(an.g*255,0,255))*256+Math.round(wn(an.b*255,0,255))}getHexString(e=On){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=et.workingColorSpace){et.fromWorkingColorSpace(an.copy(this),n);const i=an.r,r=an.g,s=an.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=et.workingColorSpace){return et.fromWorkingColorSpace(an.copy(this),n),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=On){et.fromWorkingColorSpace(an.copy(this),e);const n=an.r,i=an.g,r=an.b;return e!==On?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(ir),this.setHSL(ir.h+e,ir.s+n,ir.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(ir),e.getHSL(ul);const i=Pu(ir.h,ul.h,n),r=Pu(ir.s,ul.s,n),s=Pu(ir.l,ul.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new Be;Be.NAMES=v_;let US=0;class os extends _a{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:US++}),this.uuid=Io(),this.name="",this.blending=Ys,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rf,this.blendDst=sf,this.blendEquation=zr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=aa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=us,this.stencilZFail=us,this.stencilZPass=us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ys&&(i.blending=this.blending),this.side!==Xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==rf&&(i.blendSrc=this.blendSrc),this.blendDst!==sf&&(i.blendDst=this.blendDst),this.blendEquation!==zr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==aa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==us&&(i.stencilFail=this.stencilFail),this.stencilZFail!==us&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==us&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class kt extends os{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Jv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ot=new L,dl=new Ye;class Pn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Tm,this.updateRanges=[],this.gpuType=ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)dl.fromBufferAttribute(this,n),dl.applyMatrix3(e),this.setXY(n,dl.x,dl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix3(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyMatrix4(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.applyNormalMatrix(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ot.fromBufferAttribute(this,n),Ot.transformDirection(e),this.setXYZ(n,Ot.x,Ot.y,Ot.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Pa(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Sn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Pa(n,this.array)),n}setX(e,n){return this.normalized&&(n=Sn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Pa(n,this.array)),n}setY(e,n){return this.normalized&&(n=Sn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Pa(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Sn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Pa(n,this.array)),n}setW(e,n){return this.normalized&&(n=Sn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Sn(n,this.array),i=Sn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=Sn(n,this.array),i=Sn(i,this.array),r=Sn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=Sn(n,this.array),i=Sn(i,this.array),r=Sn(r,this.array),s=Sn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Tm&&(e.usage=this.usage),e}}class __ extends Pn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class M_ extends Pn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Mt extends Pn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let OS=0;const Wn=new _t,qu=new zt,ys=new L,Nn=new Do,Na=new Do,qt=new L;class jt extends _a{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:OS++}),this.uuid=Io(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(p_(e)?M_:__)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wn.makeRotationFromQuaternion(e),this.applyMatrix4(Wn),this}rotateX(e){return Wn.makeRotationX(e),this.applyMatrix4(Wn),this}rotateY(e){return Wn.makeRotationY(e),this.applyMatrix4(Wn),this}rotateZ(e){return Wn.makeRotationZ(e),this.applyMatrix4(Wn),this}translate(e,n,i){return Wn.makeTranslation(e,n,i),this.applyMatrix4(Wn),this}scale(e,n,i){return Wn.makeScale(e,n,i),this.applyMatrix4(Wn),this}lookAt(e){return qu.lookAt(e),qu.updateMatrix(),this.applyMatrix4(qu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Mt(i,3))}else{for(let i=0,r=n.count;i<r;i++){const s=e[i];n.setXYZ(i,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Do);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Nn.setFromBufferAttribute(s),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new No);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];Na.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(Nn.min,Na.min),Nn.expandByPoint(qt),qt.addVectors(Nn.max,Na.max),Nn.expandByPoint(qt)):(Nn.expandByPoint(Na.min),Nn.expandByPoint(Na.max))}Nn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(qt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)qt.fromBufferAttribute(o,c),l&&(ys.fromBufferAttribute(e,c),qt.add(ys)),r=Math.max(r,i.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let b=0;b<i.count;b++)o[b]=new L,l[b]=new L;const c=new L,u=new L,f=new L,h=new Ye,p=new Ye,_=new Ye,g=new L,m=new L;function d(b,E,x){c.fromBufferAttribute(i,b),u.fromBufferAttribute(i,E),f.fromBufferAttribute(i,x),h.fromBufferAttribute(s,b),p.fromBufferAttribute(s,E),_.fromBufferAttribute(s,x),u.sub(c),f.sub(c),p.sub(h),_.sub(h);const P=1/(p.x*_.y-_.x*p.y);isFinite(P)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(P),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(P),o[b].add(g),o[E].add(g),o[x].add(g),l[b].add(m),l[E].add(m),l[x].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,E=v.length;b<E;++b){const x=v[b],P=x.start,B=x.count;for(let H=P,Y=P+B;H<Y;H+=3)d(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const M=new L,y=new L,C=new L,w=new L;function A(b){C.fromBufferAttribute(r,b),w.copy(C);const E=o[b];M.copy(E),M.sub(C.multiplyScalar(C.dot(E))).normalize(),y.crossVectors(w,E);const P=y.dot(l[b])<0?-1:1;a.setXYZW(b,M.x,M.y,M.z,P)}for(let b=0,E=v.length;b<E;++b){const x=v[b],P=x.start,B=x.count;for(let H=P,Y=P+B;H<Y;H+=3)A(e.getX(H+0)),A(e.getX(H+1)),A(e.getX(H+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Pn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new L,s=new L,a=new L,o=new L,l=new L,c=new L,u=new L,f=new L;if(e)for(let h=0,p=e.count;h<p;h+=3){const _=e.getX(h+0),g=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,g),a.fromBufferAttribute(n,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)qt.fromBufferAttribute(e,n),qt.normalize(),e.setXYZ(n,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,f=o.normalized,h=new c.constructor(l.length*u);let p=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let d=0;d<u;d++)h[_++]=c[p++]}return new Pn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new jt,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hm=new _t,Lr=new Xc,fl=new No,Vm=new L,hl=new L,pl=new L,ml=new L,Yu=new L,gl=new L,Wm=new L,vl=new L;class _e extends zt{constructor(e=new jt,n=new kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){gl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Yu.fromBufferAttribute(f,e),a?gl.addScaledVector(Yu,u):gl.addScaledVector(Yu.sub(n),u))}n.add(gl)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fl.copy(i.boundingSphere),fl.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!(fl.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(fl,Vm)===null||Lr.origin.distanceToSquared(Vm)>(e.far-e.near)**2))&&(Hm.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(Hm),!(i.boundingBox!==null&&Lr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Lr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=h.length;_<g;_++){const m=h[_],d=a[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,C=M;y<C;y+=3){const w=o.getX(y),A=o.getX(y+1),b=o.getX(y+2);r=_l(this,d,e,i,c,u,f,w,A,b),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=_,d=g;m<d;m+=3){const v=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);r=_l(this,a,e,i,c,u,f,v,M,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,g=h.length;_<g;_++){const m=h[_],d=a[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,C=M;y<C;y+=3){const w=y,A=y+1,b=y+2;r=_l(this,d,e,i,c,u,f,w,A,b),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=_,d=g;m<d;m+=3){const v=m,M=m+1,y=m+2;r=_l(this,a,e,i,c,u,f,v,M,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function FS(t,e,n,i,r,s,a,o){let l;if(e.side===mn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===Xi,o),l===null)return null;vl.copy(o),vl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(vl);return c<n.near||c>n.far?null:{distance:c,point:vl.clone(),object:t}}function _l(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,hl),t.getVertexPosition(l,pl),t.getVertexPosition(c,ml);const u=FS(t,e,n,i,hl,pl,ml,Wm);if(u){const f=new L;li.getBarycoord(Wm,hl,pl,ml,f),r&&(u.uv=li.getInterpolatedAttribute(r,o,l,c,f,new Ye)),s&&(u.uv1=li.getInterpolatedAttribute(s,o,l,c,f,new Ye)),a&&(u.normal=li.getInterpolatedAttribute(a,o,l,c,f,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};li.getNormal(hl,pl,ml,h.normal),u.face=h,u.barycoord=f}return u}class Ft extends jt{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let h=0,p=0;_("z","y","x",-1,-1,i,n,e,a,s,0),_("z","y","x",1,-1,i,n,-e,a,s,1),_("x","z","y",1,1,e,i,n,r,a,2),_("x","z","y",1,-1,e,i,-n,r,a,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Mt(c,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(f,2));function _(g,m,d,v,M,y,C,w,A,b,E){const x=y/A,P=C/b,B=y/2,H=C/2,Y=w/2,V=A+1,z=b+1;let K=0,D=0;const Q=new L;for(let J=0;J<z;J++){const $=J*P-H;for(let N=0;N<V;N++){const ce=N*x-B;Q[g]=ce*v,Q[m]=$*M,Q[d]=Y,c.push(Q.x,Q.y,Q.z),Q[g]=0,Q[m]=0,Q[d]=w>0?1:-1,u.push(Q.x,Q.y,Q.z),f.push(N/A),f.push(1-J/b),K+=1}}for(let J=0;J<b;J++)for(let $=0;$<A;$++){const N=h+$+V*J,ce=h+$+V*(J+1),G=h+($+1)+V*(J+1),X=h+($+1)+V*J;l.push(N,ce,X),l.push(ce,G,X),D+=6}o.addGroup(p,D,E),p+=D,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function da(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function dn(t){const e={};for(let n=0;n<t.length;n++){const i=da(t[n]);for(const r in i)e[r]=i[r]}return e}function kS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function y_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const BS={clone:da,merge:dn};var zS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,GS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class qi extends os{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zS,this.fragmentShader=GS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=da(e.uniforms),this.uniformsGroups=kS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class x_ extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Bi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const rr=new L,jm=new Ye,Xm=new Ye;class Tn extends x_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Mc*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ru*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mc*2*Math.atan(Math.tan(Ru*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){rr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(rr.x,rr.y).multiplyScalar(-e/rr.z),rr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(rr.x,rr.y).multiplyScalar(-e/rr.z)}getViewSize(e,n){return this.getViewBounds(e,jm,Xm),n.subVectors(Xm,jm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Ru*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const xs=-90,Ss=1;class HS extends zt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Tn(xs,Ss,e,n);r.layers=this.layers,this.add(r);const s=new Tn(xs,Ss,e,n);s.layers=this.layers,this.add(s);const a=new Tn(xs,Ss,e,n);a.layers=this.layers,this.add(a);const o=new Tn(xs,Ss,e,n);o.layers=this.layers,this.add(o);const l=new Tn(xs,Ss,e,n);l.layers=this.layers,this.add(l);const c=new Tn(xs,Ss,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===Bi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===_c)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,a),e.setRenderTarget(i,2,r),e.render(n,o),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(f,h,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class S_ extends gn{constructor(e,n,i,r,s,a,o,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:oa,super(e,n,i,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class VS extends is{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new S_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:xi}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ft(5,5,5),s=new qi({name:"CubemapFromEquirect",uniforms:da(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:Sr});s.uniforms.tEquirect.value=n;const a=new _e(r,s),o=n.minFilter;return n.minFilter===$r&&(n.minFilter=xi),new HS(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}const Ku=new L,WS=new L,jS=new Ve;class kr{constructor(e=new L(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Ku.subVectors(i,n).cross(WS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Ku),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||jS.getNormalMatrix(e),r=this.coplanarPoint(Ku).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dr=new No,Ml=new L;class Kh{constructor(e=new kr,n=new kr,i=new kr,r=new kr,s=new kr,a=new kr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Bi){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],p=r[8],_=r[9],g=r[10],m=r[11],d=r[12],v=r[13],M=r[14],y=r[15];if(i[0].setComponents(l-s,h-c,m-p,y-d).normalize(),i[1].setComponents(l+s,h+c,m+p,y+d).normalize(),i[2].setComponents(l+a,h+u,m+_,y+v).normalize(),i[3].setComponents(l-a,h-u,m-_,y-v).normalize(),i[4].setComponents(l-o,h-f,m-g,y-M).normalize(),n===Bi)i[5].setComponents(l+o,h+f,m+g,y+M).normalize();else if(n===_c)i[5].setComponents(o,f,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dr)}intersectsSprite(e){return Dr.center.set(0,0,0),Dr.radius=.7071067811865476,Dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ml.x=r.normal.x>0?e.max.x:e.min.x,Ml.y=r.normal.y>0?e.max.y:e.min.y,Ml.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ml)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function E_(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function XS(t){const e=new WeakMap;function n(o,l){const c=o.array,u=o.usage,f=c.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const u=l.array,f=l.updateRanges;if(t.bindBuffer(c,o),f.length===0)t.bufferSubData(c,0,u);else{f.sort((p,_)=>p.start-_.start);let h=0;for(let p=1;p<f.length;p++){const _=f[h],g=f[p];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++h,f[h]=g)}f.length=h+1;for(let p=0,_=f.length;p<_;p++){const g=f[p];t.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class $c extends jt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,u=l+1,f=e/o,h=n/l,p=[],_=[],g=[],m=[];for(let d=0;d<u;d++){const v=d*h-a;for(let M=0;M<c;M++){const y=M*f-s;_.push(y,-v,0),g.push(0,0,1),m.push(M/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let v=0;v<o;v++){const M=v+c*d,y=v+c*(d+1),C=v+1+c*(d+1),w=v+1+c*d;p.push(M,y,w),p.push(y,C,w)}this.setIndex(p),this.setAttribute("position",new Mt(_,3)),this.setAttribute("normal",new Mt(g,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $c(e.width,e.height,e.widthSegments,e.heightSegments)}}var $S=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,YS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,KS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ZS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,QS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,JS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,eE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,nE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,iE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,aE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,oE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,mE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,gE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_E=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ME=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,SE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,EE="gl_FragColor = linearToOutputTexel( gl_FragColor );",wE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,TE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,AE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,CE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,RE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,PE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,IE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,LE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,DE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,NE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,UE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,OE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,FE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,BE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,zE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,GE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,HE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,VE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,WE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,XE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$E=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,YE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,KE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ZE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,QE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,JE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ew=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,tw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,nw=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,aw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ow=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,cw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,gw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_w=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xw=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Sw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ew=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ww=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Aw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Rw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Pw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Iw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Lw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dw=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Nw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Uw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ow=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,zw=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Hw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ww=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Xw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$w=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qw=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Jw=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,e1=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,t1=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,n1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,i1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r1=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,s1=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,a1=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,o1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,l1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,c1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,d1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,h1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,p1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,m1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,v1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,x1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,S1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,E1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,w1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,T1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:$S,alphahash_pars_fragment:qS,alphamap_fragment:YS,alphamap_pars_fragment:KS,alphatest_fragment:ZS,alphatest_pars_fragment:QS,aomap_fragment:JS,aomap_pars_fragment:eE,batching_pars_vertex:tE,batching_vertex:nE,begin_vertex:iE,beginnormal_vertex:rE,bsdfs:sE,iridescence_fragment:aE,bumpmap_pars_fragment:oE,clipping_planes_fragment:lE,clipping_planes_pars_fragment:cE,clipping_planes_pars_vertex:uE,clipping_planes_vertex:dE,color_fragment:fE,color_pars_fragment:hE,color_pars_vertex:pE,color_vertex:mE,common:gE,cube_uv_reflection_fragment:vE,defaultnormal_vertex:_E,displacementmap_pars_vertex:ME,displacementmap_vertex:yE,emissivemap_fragment:xE,emissivemap_pars_fragment:SE,colorspace_fragment:EE,colorspace_pars_fragment:wE,envmap_fragment:TE,envmap_common_pars_fragment:AE,envmap_pars_fragment:bE,envmap_pars_vertex:CE,envmap_physical_pars_fragment:BE,envmap_vertex:RE,fog_vertex:PE,fog_pars_vertex:IE,fog_fragment:LE,fog_pars_fragment:DE,gradientmap_pars_fragment:NE,lightmap_pars_fragment:UE,lights_lambert_fragment:OE,lights_lambert_pars_fragment:FE,lights_pars_begin:kE,lights_toon_fragment:zE,lights_toon_pars_fragment:GE,lights_phong_fragment:HE,lights_phong_pars_fragment:VE,lights_physical_fragment:WE,lights_physical_pars_fragment:jE,lights_fragment_begin:XE,lights_fragment_maps:$E,lights_fragment_end:qE,logdepthbuf_fragment:YE,logdepthbuf_pars_fragment:KE,logdepthbuf_pars_vertex:ZE,logdepthbuf_vertex:QE,map_fragment:JE,map_pars_fragment:ew,map_particle_fragment:tw,map_particle_pars_fragment:nw,metalnessmap_fragment:iw,metalnessmap_pars_fragment:rw,morphinstance_vertex:sw,morphcolor_vertex:aw,morphnormal_vertex:ow,morphtarget_pars_vertex:lw,morphtarget_vertex:cw,normal_fragment_begin:uw,normal_fragment_maps:dw,normal_pars_fragment:fw,normal_pars_vertex:hw,normal_vertex:pw,normalmap_pars_fragment:mw,clearcoat_normal_fragment_begin:gw,clearcoat_normal_fragment_maps:vw,clearcoat_pars_fragment:_w,iridescence_pars_fragment:Mw,opaque_fragment:yw,packing:xw,premultiplied_alpha_fragment:Sw,project_vertex:Ew,dithering_fragment:ww,dithering_pars_fragment:Tw,roughnessmap_fragment:Aw,roughnessmap_pars_fragment:bw,shadowmap_pars_fragment:Cw,shadowmap_pars_vertex:Rw,shadowmap_vertex:Pw,shadowmask_pars_fragment:Iw,skinbase_vertex:Lw,skinning_pars_vertex:Dw,skinning_vertex:Nw,skinnormal_vertex:Uw,specularmap_fragment:Ow,specularmap_pars_fragment:Fw,tonemapping_fragment:kw,tonemapping_pars_fragment:Bw,transmission_fragment:zw,transmission_pars_fragment:Gw,uv_pars_fragment:Hw,uv_pars_vertex:Vw,uv_vertex:Ww,worldpos_vertex:jw,background_vert:Xw,background_frag:$w,backgroundCube_vert:qw,backgroundCube_frag:Yw,cube_vert:Kw,cube_frag:Zw,depth_vert:Qw,depth_frag:Jw,distanceRGBA_vert:e1,distanceRGBA_frag:t1,equirect_vert:n1,equirect_frag:i1,linedashed_vert:r1,linedashed_frag:s1,meshbasic_vert:a1,meshbasic_frag:o1,meshlambert_vert:l1,meshlambert_frag:c1,meshmatcap_vert:u1,meshmatcap_frag:d1,meshnormal_vert:f1,meshnormal_frag:h1,meshphong_vert:p1,meshphong_frag:m1,meshphysical_vert:g1,meshphysical_frag:v1,meshtoon_vert:_1,meshtoon_frag:M1,points_vert:y1,points_frag:x1,shadow_vert:S1,shadow_frag:E1,sprite_vert:w1,sprite_frag:T1},fe={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Mi={basic:{uniforms:dn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:dn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Be(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:dn([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:dn([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:dn([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Be(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:dn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:dn([fe.points,fe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:dn([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:dn([fe.common,fe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:dn([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:dn([fe.sprite,fe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:dn([fe.common,fe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:dn([fe.lights,fe.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};Mi.physical={uniforms:dn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const yl={r:0,b:0,g:0},Nr=new wi,A1=new _t;function b1(t,e,n,i,r,s,a){const o=new Be(0);let l=s===!0?0:1,c,u,f=null,h=0,p=null;function _(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?n:e).get(M)),M}function g(v){let M=!1;const y=_(v);y===null?d(o,l):y&&y.isColor&&(d(y,1),M=!0);const C=t.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(t.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(v,M){const y=_(M);y&&(y.isCubeTexture||y.mapping===Wc)?(u===void 0&&(u=new _e(new Ft(1,1,1),new qi({name:"BackgroundCubeMaterial",uniforms:da(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Nr.copy(M.backgroundRotation),Nr.x*=-1,Nr.y*=-1,Nr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Nr.y*=-1,Nr.z*=-1),u.material.uniforms.envMap.value=y,u.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(A1.makeRotationFromEuler(Nr)),u.material.toneMapped=et.getTransfer(y.colorSpace)!==ft,(f!==y||h!==y.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,f=y,h=y.version,p=t.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new _e(new $c(2,2),new qi({name:"BackgroundMaterial",uniforms:da(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=et.getTransfer(y.colorSpace)!==ft,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||h!==y.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,f=y,h=y.version,p=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function d(v,M){v.getRGB(yl,y_(t)),i.buffers.color.setClear(yl.r,yl.g,yl.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),l=M,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,d(o,l)},render:g,addToRenderList:m}}function C1(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(x,P,B,H,Y){let V=!1;const z=f(H,B,P);s!==z&&(s=z,c(s.object)),V=p(x,H,B,Y),V&&_(x,H,B,Y),Y!==null&&e.update(Y,t.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,y(x,P,B,H),Y!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return t.createVertexArray()}function c(x){return t.bindVertexArray(x)}function u(x){return t.deleteVertexArray(x)}function f(x,P,B){const H=B.wireframe===!0;let Y=i[x.id];Y===void 0&&(Y={},i[x.id]=Y);let V=Y[P.id];V===void 0&&(V={},Y[P.id]=V);let z=V[H];return z===void 0&&(z=h(l()),V[H]=z),z}function h(x){const P=[],B=[],H=[];for(let Y=0;Y<n;Y++)P[Y]=0,B[Y]=0,H[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:H,object:x,attributes:{},index:null}}function p(x,P,B,H){const Y=s.attributes,V=P.attributes;let z=0;const K=B.getAttributes();for(const D in K)if(K[D].location>=0){const J=Y[D];let $=V[D];if($===void 0&&(D==="instanceMatrix"&&x.instanceMatrix&&($=x.instanceMatrix),D==="instanceColor"&&x.instanceColor&&($=x.instanceColor)),J===void 0||J.attribute!==$||$&&J.data!==$.data)return!0;z++}return s.attributesNum!==z||s.index!==H}function _(x,P,B,H){const Y={},V=P.attributes;let z=0;const K=B.getAttributes();for(const D in K)if(K[D].location>=0){let J=V[D];J===void 0&&(D==="instanceMatrix"&&x.instanceMatrix&&(J=x.instanceMatrix),D==="instanceColor"&&x.instanceColor&&(J=x.instanceColor));const $={};$.attribute=J,J&&J.data&&($.data=J.data),Y[D]=$,z++}s.attributes=Y,s.attributesNum=z,s.index=H}function g(){const x=s.newAttributes;for(let P=0,B=x.length;P<B;P++)x[P]=0}function m(x){d(x,0)}function d(x,P){const B=s.newAttributes,H=s.enabledAttributes,Y=s.attributeDivisors;B[x]=1,H[x]===0&&(t.enableVertexAttribArray(x),H[x]=1),Y[x]!==P&&(t.vertexAttribDivisor(x,P),Y[x]=P)}function v(){const x=s.newAttributes,P=s.enabledAttributes;for(let B=0,H=P.length;B<H;B++)P[B]!==x[B]&&(t.disableVertexAttribArray(B),P[B]=0)}function M(x,P,B,H,Y,V,z){z===!0?t.vertexAttribIPointer(x,P,B,Y,V):t.vertexAttribPointer(x,P,B,H,Y,V)}function y(x,P,B,H){g();const Y=H.attributes,V=B.getAttributes(),z=P.defaultAttributeValues;for(const K in V){const D=V[K];if(D.location>=0){let Q=Y[K];if(Q===void 0&&(K==="instanceMatrix"&&x.instanceMatrix&&(Q=x.instanceMatrix),K==="instanceColor"&&x.instanceColor&&(Q=x.instanceColor)),Q!==void 0){const J=Q.normalized,$=Q.itemSize,N=e.get(Q);if(N===void 0)continue;const ce=N.buffer,G=N.type,X=N.bytesPerElement,le=G===t.INT||G===t.UNSIGNED_INT||Q.gpuType===Vh;if(Q.isInterleavedBufferAttribute){const ne=Q.data,se=ne.stride,Ne=Q.offset;if(ne.isInstancedInterleavedBuffer){for(let de=0;de<D.locationSize;de++)d(D.location+de,ne.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let de=0;de<D.locationSize;de++)m(D.location+de);t.bindBuffer(t.ARRAY_BUFFER,ce);for(let de=0;de<D.locationSize;de++)M(D.location+de,$/D.locationSize,G,J,se*X,(Ne+$/D.locationSize*de)*X,le)}else{if(Q.isInstancedBufferAttribute){for(let ne=0;ne<D.locationSize;ne++)d(D.location+ne,Q.meshPerAttribute);x.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ne=0;ne<D.locationSize;ne++)m(D.location+ne);t.bindBuffer(t.ARRAY_BUFFER,ce);for(let ne=0;ne<D.locationSize;ne++)M(D.location+ne,$/D.locationSize,G,J,$*X,$/D.locationSize*ne*X,le)}}else if(z!==void 0){const J=z[K];if(J!==void 0)switch(J.length){case 2:t.vertexAttrib2fv(D.location,J);break;case 3:t.vertexAttrib3fv(D.location,J);break;case 4:t.vertexAttrib4fv(D.location,J);break;default:t.vertexAttrib1fv(D.location,J)}}}}v()}function C(){b();for(const x in i){const P=i[x];for(const B in P){const H=P[B];for(const Y in H)u(H[Y].object),delete H[Y];delete P[B]}delete i[x]}}function w(x){if(i[x.id]===void 0)return;const P=i[x.id];for(const B in P){const H=P[B];for(const Y in H)u(H[Y].object),delete H[Y];delete P[B]}delete i[x.id]}function A(x){for(const P in i){const B=i[P];if(B[x.id]===void 0)continue;const H=B[x.id];for(const Y in H)u(H[Y].object),delete H[Y];delete B[x.id]}}function b(){E(),a=!0,s!==r&&(s=r,c(s.object))}function E(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:v}}function R1(t,e,n){let i;function r(c){i=c}function s(c,u){t.drawArrays(i,c,u),n.update(u,i,1)}function a(c,u,f){f!==0&&(t.drawArraysInstanced(i,c,u,f),n.update(u,i,f))}function o(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let p=0;for(let _=0;_<f;_++)p+=u[_];n.update(p,i,1)}function l(c,u,f,h){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)a(c[_],u[_],h[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g]*h[g];n.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function P1(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==ci&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const b=A===Po&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==$i&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==ki&&!b)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=n.logarithmicDepthBuffer===!0,h=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,w=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:C,maxSamples:w}}function I1(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new kr,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=u(f,h,0)},this.setState=function(f,h,p){const _=f.clippingPlanes,g=f.clipIntersection,m=f.clipShadows,d=t.get(f);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const v=s?0:i,M=v*4;let y=d.clippingState||null;l.value=y,y=u(_,h,M,p);for(let C=0;C!==M;++C)y[C]=n[C];d.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,_){const g=f!==null?f.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const d=p+g*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,y=p;M!==g;++M,y+=4)a.copy(f[M]).applyMatrix4(v,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function L1(t){let e=new WeakMap;function n(a,o){return o===hf?a.mapping=oa:o===pf&&(a.mapping=la),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===hf||o===pf)if(e.has(a)){const l=e.get(a).texture;return n(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new VS(l.height);return c.fromEquirectangularTexture(t,a),e.set(a,c),a.addEventListener("dispose",r),n(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class w_ extends x_{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Fs=4,$m=[.125,.215,.35,.446,.526,.582],Gr=20,Zu=new w_,qm=new Be;let Qu=null,Ju=0,ed=0,td=!1;const Br=(1+Math.sqrt(5))/2,Es=1/Br,Ym=[new L(-Br,Es,0),new L(Br,Es,0),new L(-Es,0,Br),new L(Es,0,Br),new L(0,Br,-Es),new L(0,Br,Es),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Km{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){Qu=this._renderer.getRenderTarget(),Ju=this._renderer.getActiveCubeFace(),ed=this._renderer.getActiveMipmapLevel(),td=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Qu,Ju,ed),this._renderer.xr.enabled=td,e.scissorTest=!1,xl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===oa||e.mapping===la?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qu=this._renderer.getRenderTarget(),Ju=this._renderer.getActiveCubeFace(),ed=this._renderer.getActiveMipmapLevel(),td=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:xi,minFilter:xi,generateMipmaps:!1,type:Po,format:ci,colorSpace:va,depthBuffer:!1},r=Zm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zm(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=D1(s)),this._blurMaterial=N1(s,e,n)}return r}_compileMaterial(e){const n=new _e(this._lodPlanes[0],e);this._renderer.compile(n,Zu)}_sceneToCubeUV(e,n,i,r){const o=new Tn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(qm),u.toneMapping=Er,u.autoClear=!1;const p=new kt({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1}),_=new _e(new Ft,p);let g=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,g=!0):(p.color.copy(qm),g=!0);for(let d=0;d<6;d++){const v=d%3;v===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):v===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const M=this._cubeSize;xl(r,v*M,d>2?M:0,M,M),u.setRenderTarget(r),g&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===oa||e.mapping===la;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new _e(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;xl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,Zu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ym[(r-s-1)%Ym.length];this._blur(e,s-1,s,a,o)}n.autoClear=i}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new _e(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Gr-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Gr;m>Gr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gr}`);const d=[];let v=0;for(let A=0;A<Gr;++A){const b=A/g,E=Math.exp(-b*b/2);d.push(E),A===0?v+=E:A<m&&(v+=2*E)}for(let A=0;A<d.length;A++)d[A]=d[A]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:M}=this;h.dTheta.value=_,h.mipInt.value=M-i;const y=this._sizeLods[r],C=3*y*(r>M-Fs?r-M+Fs:0),w=4*(this._cubeSize-y);xl(n,C,w,3*y,2*y),l.setRenderTarget(n),l.render(f,Zu)}}function D1(t){const e=[],n=[],i=[];let r=t;const s=t-Fs+1+$m.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);n.push(o);let l=1/o;a>t-Fs?l=$m[a-t+Fs-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,_=6,g=3,m=2,d=1,v=new Float32Array(g*_*p),M=new Float32Array(m*_*p),y=new Float32Array(d*_*p);for(let w=0;w<p;w++){const A=w%3*2/3-1,b=w>2?0:-1,E=[A,b,0,A+2/3,b,0,A+2/3,b+1,0,A,b,0,A+2/3,b+1,0,A,b+1,0];v.set(E,g*_*w),M.set(h,m*_*w);const x=[w,w,w,w,w,w];y.set(x,d*_*w)}const C=new jt;C.setAttribute("position",new Pn(v,g)),C.setAttribute("uv",new Pn(M,m)),C.setAttribute("faceIndex",new Pn(y,d)),e.push(C),r>Fs&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Zm(t,e,n){const i=new is(t,e,n);return i.texture.mapping=Wc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function N1(t,e,n){const i=new Float32Array(Gr),r=new L(0,1,0);return new qi({name:"SphericalGaussianBlur",defines:{n:Gr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function Qm(){return new qi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function Jm(){return new qi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sr,depthTest:!1,depthWrite:!1})}function Zh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function U1(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===hf||l===pf,u=l===oa||l===la;if(c||u){let f=e.get(o);const h=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new Km(t)),f=c?n.fromEquirectangular(o,f):n.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&r(p)?(n===null&&(n=new Km(t)),f=c?n.fromEquirectangular(o):n.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:a}}function O1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Wa("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function F1(t,e,n,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const g=h.morphAttributes[_];for(let m=0,d=g.length;m<d;m++)e.remove(g[m])}h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,n.memory.geometries++),h}function l(f){const h=f.attributes;for(const _ in h)e.update(h[_],t.ARRAY_BUFFER);const p=f.morphAttributes;for(const _ in p){const g=p[_];for(let m=0,d=g.length;m<d;m++)e.update(g[m],t.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,_=f.attributes.position;let g=0;if(p!==null){const v=p.array;g=p.version;for(let M=0,y=v.length;M<y;M+=3){const C=v[M+0],w=v[M+1],A=v[M+2];h.push(C,w,w,A,A,C)}}else if(_!==void 0){const v=_.array;g=_.version;for(let M=0,y=v.length/3-1;M<y;M+=3){const C=M+0,w=M+1,A=M+2;h.push(C,w,w,A,A,C)}}else return;const m=new(p_(h)?M_:__)(h,1);m.version=g;const d=s.get(f);d&&e.remove(d),s.set(f,m)}function u(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function k1(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,p){t.drawElements(i,p,s,h*a),n.update(p,i,1)}function c(h,p,_){_!==0&&(t.drawElementsInstanced(i,p,s,h*a,_),n.update(p,i,_))}function u(h,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,_);let m=0;for(let d=0;d<_;d++)m+=p[d];n.update(m,i,1)}function f(h,p,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<h.length;d++)c(h[d]/a,p[d],g[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,g,0,_);let d=0;for(let v=0;v<_;v++)d+=p[v]*g[v];n.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function B1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function z1(t,e,n){const i=new WeakMap,r=new ht;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let x=function(){b.dispose(),i.delete(o),o.removeEventListener("dispose",x)};var p=x;h!==void 0&&h.texture.dispose();const _=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),g===!0&&(y=2),m===!0&&(y=3);let C=o.attributes.position.count*y,w=1;C>e.maxTextureSize&&(w=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const A=new Float32Array(C*w*4*f),b=new g_(A,C,w,f);b.type=ki,b.needsUpdate=!0;const E=y*4;for(let P=0;P<f;P++){const B=d[P],H=v[P],Y=M[P],V=C*w*4*P;for(let z=0;z<B.count;z++){const K=z*E;_===!0&&(r.fromBufferAttribute(B,z),A[V+K+0]=r.x,A[V+K+1]=r.y,A[V+K+2]=r.z,A[V+K+3]=0),g===!0&&(r.fromBufferAttribute(H,z),A[V+K+4]=r.x,A[V+K+5]=r.y,A[V+K+6]=r.z,A[V+K+7]=0),m===!0&&(r.fromBufferAttribute(Y,z),A[V+K+8]=r.x,A[V+K+9]=r.y,A[V+K+10]=r.z,A[V+K+11]=Y.itemSize===4?r.w:1)}}h={count:f,texture:b,size:new Ye(C,w)},i.set(o,h),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",g),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function G1(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:a}}class T_ extends gn{constructor(e,n,i,r,s,a,o,l,c,u=Ks){if(u!==Ks&&u!==ua)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Ks&&(i=ns),i===void 0&&u===ua&&(i=ca),super(null,r,s,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=o!==void 0?o:fi,this.minFilter=l!==void 0?l:fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const A_=new gn,eg=new T_(1,1),b_=new g_,C_=new bS,R_=new S_,tg=[],ng=[],ig=new Float32Array(16),rg=new Float32Array(9),sg=new Float32Array(4);function Ma(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=tg[r];if(s===void 0&&(s=new Float32Array(r),tg[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Xt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function $t(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function qc(t,e){let n=ng[e];n===void 0&&(n=new Int32Array(e),ng[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function H1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function V1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Xt(n,e))return;t.uniform2fv(this.addr,e),$t(n,e)}}function W1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Xt(n,e))return;t.uniform3fv(this.addr,e),$t(n,e)}}function j1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Xt(n,e))return;t.uniform4fv(this.addr,e),$t(n,e)}}function X1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Xt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),$t(n,e)}else{if(Xt(n,i))return;sg.set(i),t.uniformMatrix2fv(this.addr,!1,sg),$t(n,i)}}function $1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Xt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),$t(n,e)}else{if(Xt(n,i))return;rg.set(i),t.uniformMatrix3fv(this.addr,!1,rg),$t(n,i)}}function q1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Xt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),$t(n,e)}else{if(Xt(n,i))return;ig.set(i),t.uniformMatrix4fv(this.addr,!1,ig),$t(n,i)}}function Y1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function K1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Xt(n,e))return;t.uniform2iv(this.addr,e),$t(n,e)}}function Z1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Xt(n,e))return;t.uniform3iv(this.addr,e),$t(n,e)}}function Q1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Xt(n,e))return;t.uniform4iv(this.addr,e),$t(n,e)}}function J1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function eT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Xt(n,e))return;t.uniform2uiv(this.addr,e),$t(n,e)}}function tT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Xt(n,e))return;t.uniform3uiv(this.addr,e),$t(n,e)}}function nT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Xt(n,e))return;t.uniform4uiv(this.addr,e),$t(n,e)}}function iT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(eg.compareFunction=h_,s=eg):s=A_,n.setTexture2D(e||s,r)}function rT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||C_,r)}function sT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||R_,r)}function aT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||b_,r)}function oT(t){switch(t){case 5126:return H1;case 35664:return V1;case 35665:return W1;case 35666:return j1;case 35674:return X1;case 35675:return $1;case 35676:return q1;case 5124:case 35670:return Y1;case 35667:case 35671:return K1;case 35668:case 35672:return Z1;case 35669:case 35673:return Q1;case 5125:return J1;case 36294:return eT;case 36295:return tT;case 36296:return nT;case 35678:case 36198:case 36298:case 36306:case 35682:return iT;case 35679:case 36299:case 36307:return rT;case 35680:case 36300:case 36308:case 36293:return sT;case 36289:case 36303:case 36311:case 36292:return aT}}function lT(t,e){t.uniform1fv(this.addr,e)}function cT(t,e){const n=Ma(e,this.size,2);t.uniform2fv(this.addr,n)}function uT(t,e){const n=Ma(e,this.size,3);t.uniform3fv(this.addr,n)}function dT(t,e){const n=Ma(e,this.size,4);t.uniform4fv(this.addr,n)}function fT(t,e){const n=Ma(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function hT(t,e){const n=Ma(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function pT(t,e){const n=Ma(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function mT(t,e){t.uniform1iv(this.addr,e)}function gT(t,e){t.uniform2iv(this.addr,e)}function vT(t,e){t.uniform3iv(this.addr,e)}function _T(t,e){t.uniform4iv(this.addr,e)}function MT(t,e){t.uniform1uiv(this.addr,e)}function yT(t,e){t.uniform2uiv(this.addr,e)}function xT(t,e){t.uniform3uiv(this.addr,e)}function ST(t,e){t.uniform4uiv(this.addr,e)}function ET(t,e,n){const i=this.cache,r=e.length,s=qc(n,r);Xt(i,s)||(t.uniform1iv(this.addr,s),$t(i,s));for(let a=0;a!==r;++a)n.setTexture2D(e[a]||A_,s[a])}function wT(t,e,n){const i=this.cache,r=e.length,s=qc(n,r);Xt(i,s)||(t.uniform1iv(this.addr,s),$t(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||C_,s[a])}function TT(t,e,n){const i=this.cache,r=e.length,s=qc(n,r);Xt(i,s)||(t.uniform1iv(this.addr,s),$t(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||R_,s[a])}function AT(t,e,n){const i=this.cache,r=e.length,s=qc(n,r);Xt(i,s)||(t.uniform1iv(this.addr,s),$t(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||b_,s[a])}function bT(t){switch(t){case 5126:return lT;case 35664:return cT;case 35665:return uT;case 35666:return dT;case 35674:return fT;case 35675:return hT;case 35676:return pT;case 5124:case 35670:return mT;case 35667:case 35671:return gT;case 35668:case 35672:return vT;case 35669:case 35673:return _T;case 5125:return MT;case 36294:return yT;case 36295:return xT;case 36296:return ST;case 35678:case 36198:case 36298:case 36306:case 35682:return ET;case 35679:case 36299:case 36307:return wT;case 35680:case 36300:case 36308:case 36293:return TT;case 36289:case 36303:case 36311:case 36292:return AT}}class CT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=oT(n.type)}}class RT{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=bT(n.type)}}class PT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const nd=/(\w+)(\])?(\[|\.)?/g;function ag(t,e){t.seq.push(e),t.map[e.id]=e}function IT(t,e,n){const i=t.name,r=i.length;for(nd.lastIndex=0;;){const s=nd.exec(i),a=nd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ag(n,c===void 0?new CT(o,t,e):new RT(o,t,e));break}else{let f=n.map[o];f===void 0&&(f=new PT(o),ag(n,f)),n=f}}}class jl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),a=e.getUniformLocation(n,s.name);IT(s,a,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function og(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const LT=37297;let DT=0;function NT(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const lg=new Ve;function UT(t){et._getMatrix(lg,et.workingColorSpace,t);const e=`mat3( ${lg.elements.map(n=>n.toFixed(4))} )`;switch(et.getTransfer(t)){case jc:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function cg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+NT(t.getShaderSource(e),a)}else return r}function OT(t,e){const n=UT(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function FT(t,e){let n;switch(e){case tS:n="Linear";break;case nS:n="Reinhard";break;case iS:n="Cineon";break;case e_:n="ACESFilmic";break;case sS:n="AgX";break;case aS:n="Neutral";break;case rS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Sl=new L;function kT(){et.getLuminanceCoefficients(Sl);const t=Sl.x.toFixed(4),e=Sl.y.toFixed(4),n=Sl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function BT(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ja).join(`
`)}function zT(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function GT(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function ja(t){return t!==""}function ug(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const HT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hf(t){return t.replace(HT,WT)}const VT=new Map;function WT(t,e){let n=We[e];if(n===void 0){const i=VT.get(e);if(i!==void 0)n=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Hf(n)}const jT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fg(t){return t.replace(jT,XT)}function XT(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function hg(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $T(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Qv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Nx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Li&&(e="SHADOWMAP_TYPE_VSM"),e}function qT(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case oa:case la:e="ENVMAP_TYPE_CUBE";break;case Wc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function YT(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case la:e="ENVMAP_MODE_REFRACTION";break}return e}function KT(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Jv:e="ENVMAP_BLENDING_MULTIPLY";break;case Jx:e="ENVMAP_BLENDING_MIX";break;case eS:e="ENVMAP_BLENDING_ADD";break}return e}function ZT(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function QT(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=$T(n),c=qT(n),u=YT(n),f=KT(n),h=ZT(n),p=BT(n),_=zT(s),g=r.createProgram();let m,d,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(ja).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(ja).join(`
`),d.length>0&&(d+=`
`)):(m=[hg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ja).join(`
`),d=[hg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Er?"#define TONE_MAPPING":"",n.toneMapping!==Er?We.tonemapping_pars_fragment:"",n.toneMapping!==Er?FT("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,OT("linearToOutputTexel",n.outputColorSpace),kT(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ja).join(`
`)),a=Hf(a),a=ug(a,n),a=dg(a,n),o=Hf(o),o=ug(o,n),o=dg(o,n),a=fg(a),o=fg(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",n.glslVersion===Am?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Am?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=v+m+a,y=v+d+o,C=og(r,r.VERTEX_SHADER,M),w=og(r,r.FRAGMENT_SHADER,y);r.attachShader(g,C),r.attachShader(g,w),n.index0AttributeName!==void 0?r.bindAttribLocation(g,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function A(P){if(t.debug.checkShaderErrors){const B=r.getProgramInfoLog(g).trim(),H=r.getShaderInfoLog(C).trim(),Y=r.getShaderInfoLog(w).trim();let V=!0,z=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(V=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,g,C,w);else{const K=cg(r,C,"vertex"),D=cg(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+K+`
`+D)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(H===""||Y==="")&&(z=!1);z&&(P.diagnostics={runnable:V,programLog:B,vertexShader:{log:H,prefix:m},fragmentShader:{log:Y,prefix:d}})}r.deleteShader(C),r.deleteShader(w),b=new jl(r,g),E=GT(r,g)}let b;this.getUniforms=function(){return b===void 0&&A(this),b};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let x=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(g,LT)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=DT++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=w,this}let JT=0;class eA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new tA(e),n.set(e,i)),i}}class tA{constructor(e){this.id=JT++,this.code=e,this.usedTimes=0}}function nA(t,e,n,i,r,s,a){const o=new Yh,l=new eA,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,x,P,B,H){const Y=B.fog,V=H.geometry,z=E.isMeshStandardMaterial?B.environment:null,K=(E.isMeshStandardMaterial?n:e).get(E.envMap||z),D=K&&K.mapping===Wc?K.image.height:null,Q=_[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const J=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,$=J!==void 0?J.length:0;let N=0;V.morphAttributes.position!==void 0&&(N=1),V.morphAttributes.normal!==void 0&&(N=2),V.morphAttributes.color!==void 0&&(N=3);let ce,G,X,le;if(Q){const it=Mi[Q];ce=it.vertexShader,G=it.fragmentShader}else ce=E.vertexShader,G=E.fragmentShader,l.update(E),X=l.getVertexShaderID(E),le=l.getFragmentShaderID(E);const ne=t.getRenderTarget(),se=t.state.buffers.depth.getReversed(),Ne=H.isInstancedMesh===!0,de=H.isBatchedMesh===!0,je=!!E.map,Xe=!!E.matcap,mt=!!K,k=!!E.aoMap,Mn=!!E.lightMap,Ze=!!E.bumpMap,Qe=!!E.normalMap,Ie=!!E.displacementMap,dt=!!E.emissiveMap,Te=!!E.metalnessMap,R=!!E.roughnessMap,S=E.anisotropy>0,W=E.clearcoat>0,te=E.dispersion>0,re=E.iridescence>0,ee=E.sheen>0,Ae=E.transmission>0,pe=S&&!!E.anisotropyMap,ye=W&&!!E.clearcoatMap,qe=W&&!!E.clearcoatNormalMap,oe=W&&!!E.clearcoatRoughnessMap,Ee=re&&!!E.iridescenceMap,Ue=re&&!!E.iridescenceThicknessMap,Fe=ee&&!!E.sheenColorMap,we=ee&&!!E.sheenRoughnessMap,Je=!!E.specularMap,ze=!!E.specularColorMap,at=!!E.specularIntensityMap,U=Ae&&!!E.transmissionMap,he=Ae&&!!E.thicknessMap,Z=!!E.gradientMap,ie=!!E.alphaMap,ve=E.alphaTest>0,me=!!E.alphaHash,Oe=!!E.extensions;let pt=Er;E.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(pt=t.toneMapping);const Gt={shaderID:Q,shaderType:E.type,shaderName:E.name,vertexShader:ce,fragmentShader:G,defines:E.defines,customVertexShaderID:X,customFragmentShaderID:le,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:de,batchingColor:de&&H._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&H.instanceColor!==null,instancingMorph:Ne&&H.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ne===null?t.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:va,alphaToCoverage:!!E.alphaToCoverage,map:je,matcap:Xe,envMap:mt,envMapMode:mt&&K.mapping,envMapCubeUVHeight:D,aoMap:k,lightMap:Mn,bumpMap:Ze,normalMap:Qe,displacementMap:h&&Ie,emissiveMap:dt,normalMapObjectSpace:Qe&&E.normalMapType===uS,normalMapTangentSpace:Qe&&E.normalMapType===f_,metalnessMap:Te,roughnessMap:R,anisotropy:S,anisotropyMap:pe,clearcoat:W,clearcoatMap:ye,clearcoatNormalMap:qe,clearcoatRoughnessMap:oe,dispersion:te,iridescence:re,iridescenceMap:Ee,iridescenceThicknessMap:Ue,sheen:ee,sheenColorMap:Fe,sheenRoughnessMap:we,specularMap:Je,specularColorMap:ze,specularIntensityMap:at,transmission:Ae,transmissionMap:U,thicknessMap:he,gradientMap:Z,opaque:E.transparent===!1&&E.blending===Ys&&E.alphaToCoverage===!1,alphaMap:ie,alphaTest:ve,alphaHash:me,combine:E.combine,mapUv:je&&g(E.map.channel),aoMapUv:k&&g(E.aoMap.channel),lightMapUv:Mn&&g(E.lightMap.channel),bumpMapUv:Ze&&g(E.bumpMap.channel),normalMapUv:Qe&&g(E.normalMap.channel),displacementMapUv:Ie&&g(E.displacementMap.channel),emissiveMapUv:dt&&g(E.emissiveMap.channel),metalnessMapUv:Te&&g(E.metalnessMap.channel),roughnessMapUv:R&&g(E.roughnessMap.channel),anisotropyMapUv:pe&&g(E.anisotropyMap.channel),clearcoatMapUv:ye&&g(E.clearcoatMap.channel),clearcoatNormalMapUv:qe&&g(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&g(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ee&&g(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&g(E.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&g(E.sheenColorMap.channel),sheenRoughnessMapUv:we&&g(E.sheenRoughnessMap.channel),specularMapUv:Je&&g(E.specularMap.channel),specularColorMapUv:ze&&g(E.specularColorMap.channel),specularIntensityMapUv:at&&g(E.specularIntensityMap.channel),transmissionMapUv:U&&g(E.transmissionMap.channel),thicknessMapUv:he&&g(E.thicknessMap.channel),alphaMapUv:ie&&g(E.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Qe||S),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!V.attributes.uv&&(je||ie),fog:!!Y,useFog:E.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:se,skinning:H.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:N,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:t.shadowMap.enabled&&P.length>0,shadowMapType:t.shadowMap.type,toneMapping:pt,decodeVideoTexture:je&&E.map.isVideoTexture===!0&&et.getTransfer(E.map.colorSpace)===ft,decodeVideoTextureEmissive:dt&&E.emissiveMap.isVideoTexture===!0&&et.getTransfer(E.emissiveMap.colorSpace)===ft,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===cn,flipSided:E.side===mn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Oe&&E.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&E.extensions.multiDraw===!0||de)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Gt.vertexUv1s=c.has(1),Gt.vertexUv2s=c.has(2),Gt.vertexUv3s=c.has(3),c.clear(),Gt}function d(E){const x=[];if(E.shaderID?x.push(E.shaderID):(x.push(E.customVertexShaderID),x.push(E.customFragmentShaderID)),E.defines!==void 0)for(const P in E.defines)x.push(P),x.push(E.defines[P]);return E.isRawShaderMaterial===!1&&(v(x,E),M(x,E),x.push(t.outputColorSpace)),x.push(E.customProgramCacheKey),x.join()}function v(E,x){E.push(x.precision),E.push(x.outputColorSpace),E.push(x.envMapMode),E.push(x.envMapCubeUVHeight),E.push(x.mapUv),E.push(x.alphaMapUv),E.push(x.lightMapUv),E.push(x.aoMapUv),E.push(x.bumpMapUv),E.push(x.normalMapUv),E.push(x.displacementMapUv),E.push(x.emissiveMapUv),E.push(x.metalnessMapUv),E.push(x.roughnessMapUv),E.push(x.anisotropyMapUv),E.push(x.clearcoatMapUv),E.push(x.clearcoatNormalMapUv),E.push(x.clearcoatRoughnessMapUv),E.push(x.iridescenceMapUv),E.push(x.iridescenceThicknessMapUv),E.push(x.sheenColorMapUv),E.push(x.sheenRoughnessMapUv),E.push(x.specularMapUv),E.push(x.specularColorMapUv),E.push(x.specularIntensityMapUv),E.push(x.transmissionMapUv),E.push(x.thicknessMapUv),E.push(x.combine),E.push(x.fogExp2),E.push(x.sizeAttenuation),E.push(x.morphTargetsCount),E.push(x.morphAttributeCount),E.push(x.numDirLights),E.push(x.numPointLights),E.push(x.numSpotLights),E.push(x.numSpotLightMaps),E.push(x.numHemiLights),E.push(x.numRectAreaLights),E.push(x.numDirLightShadows),E.push(x.numPointLightShadows),E.push(x.numSpotLightShadows),E.push(x.numSpotLightShadowsWithMaps),E.push(x.numLightProbes),E.push(x.shadowMapType),E.push(x.toneMapping),E.push(x.numClippingPlanes),E.push(x.numClipIntersection),E.push(x.depthPacking)}function M(E,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),E.push(o.mask)}function y(E){const x=_[E.type];let P;if(x){const B=Mi[x];P=BS.clone(B.uniforms)}else P=E.uniforms;return P}function C(E,x){let P;for(let B=0,H=u.length;B<H;B++){const Y=u[B];if(Y.cacheKey===x){P=Y,++P.usedTimes;break}}return P===void 0&&(P=new QT(t,x,E,s),u.push(P)),P}function w(E){if(--E.usedTimes===0){const x=u.indexOf(E);u[x]=u[u.length-1],u.pop(),E.destroy()}}function A(E){l.remove(E)}function b(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:u,dispose:b}}function iA(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function rA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function pg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function mg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(f,h,p,_,g,m){let d=t[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:_,renderOrder:f.renderOrder,z:g,group:m},t[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=_,d.renderOrder=f.renderOrder,d.z=g,d.group=m),e++,d}function o(f,h,p,_,g,m){const d=a(f,h,p,_,g,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):n.push(d)}function l(f,h,p,_,g,m){const d=a(f,h,p,_,g,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):n.unshift(d)}function c(f,h){n.length>1&&n.sort(f||rA),i.length>1&&i.sort(h||pg),r.length>1&&r.sort(h||pg)}function u(){for(let f=e,h=t.length;f<h;f++){const p=t[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function sA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new mg,t.set(i,[a])):r>=s.length?(a=new mg,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function aA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new L,color:new Be};break;case"SpotLight":n={position:new L,direction:new L,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new Be,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":n={color:new Be,position:new L,halfWidth:new L,halfHeight:new L};break}return t[e.id]=n,n}}}function oA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let lA=0;function cA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function uA(t){const e=new aA,n=oA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const r=new L,s=new _t,a=new _t;function o(c){let u=0,f=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let p=0,_=0,g=0,m=0,d=0,v=0,M=0,y=0,C=0,w=0,A=0;c.sort(cA);for(let E=0,x=c.length;E<x;E++){const P=c[E],B=P.color,H=P.intensity,Y=P.distance,V=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=B.r*H,f+=B.g*H,h+=B.b*H;else if(P.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(P.sh.coefficients[z],H);A++}else if(P.isDirectionalLight){const z=e.get(P);if(z.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,D=n.get(P);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=V,i.directionalShadowMatrix[p]=P.shadow.matrix,v++}i.directional[p]=z,p++}else if(P.isSpotLight){const z=e.get(P);z.position.setFromMatrixPosition(P.matrixWorld),z.color.copy(B).multiplyScalar(H),z.distance=Y,z.coneCos=Math.cos(P.angle),z.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),z.decay=P.decay,i.spot[g]=z;const K=P.shadow;if(P.map&&(i.spotLightMap[C]=P.map,C++,K.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[g]=K.matrix,P.castShadow){const D=n.get(P);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,i.spotShadow[g]=D,i.spotShadowMap[g]=V,y++}g++}else if(P.isRectAreaLight){const z=e.get(P);z.color.copy(B).multiplyScalar(H),z.halfWidth.set(P.width*.5,0,0),z.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=z,m++}else if(P.isPointLight){const z=e.get(P);if(z.color.copy(P.color).multiplyScalar(P.intensity),z.distance=P.distance,z.decay=P.decay,P.castShadow){const K=P.shadow,D=n.get(P);D.shadowIntensity=K.intensity,D.shadowBias=K.bias,D.shadowNormalBias=K.normalBias,D.shadowRadius=K.radius,D.shadowMapSize=K.mapSize,D.shadowCameraNear=K.camera.near,D.shadowCameraFar=K.camera.far,i.pointShadow[_]=D,i.pointShadowMap[_]=V,i.pointShadowMatrix[_]=P.shadow.matrix,M++}i.point[_]=z,_++}else if(P.isHemisphereLight){const z=e.get(P);z.skyColor.copy(P.color).multiplyScalar(H),z.groundColor.copy(P.groundColor).multiplyScalar(H),i.hemi[d]=z,d++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const b=i.hash;(b.directionalLength!==p||b.pointLength!==_||b.spotLength!==g||b.rectAreaLength!==m||b.hemiLength!==d||b.numDirectionalShadows!==v||b.numPointShadows!==M||b.numSpotShadows!==y||b.numSpotMaps!==C||b.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=y+C-w,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,b.directionalLength=p,b.pointLength=_,b.spotLength=g,b.rectAreaLength=m,b.hemiLength=d,b.numDirectionalShadows=v,b.numPointShadows=M,b.numSpotShadows=y,b.numSpotMaps=C,b.numLightProbes=A,i.version=lA++)}function l(c,u){let f=0,h=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let d=0,v=c.length;d<v;d++){const M=c[d];if(M.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(M.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),h++}else if(M.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function gg(t){const e=new uA(t),n=[],i=[];function r(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function a(u){i.push(u)}function o(){e.setup(n)}function l(u){e.setupView(n,u)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function dA(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new gg(t),e.set(r,[o])):s>=a.length?(o=new gg(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}class fA extends os{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=lS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hA extends os{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const pA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gA(t,e,n){let i=new Kh;const r=new Ye,s=new Ye,a=new ht,o=new fA({depthPacking:cS}),l=new hA,c={},u=n.maxTextureSize,f={[Xi]:mn,[mn]:Xi,[cn]:cn},h=new qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:pA,fragmentShader:mA}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const _=new jt;_.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new _e(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qv;let d=this.type;this.render=function(w,A,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=t.getRenderTarget(),x=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),B=t.state;B.setBlending(Sr),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const H=d!==Li&&this.type===Li,Y=d===Li&&this.type!==Li;for(let V=0,z=w.length;V<z;V++){const K=w[V],D=K.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const Q=D.getFrameExtents();if(r.multiply(Q),s.copy(D.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,D.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,D.mapSize.y=s.y)),D.map===null||H===!0||Y===!0){const $=this.type!==Li?{minFilter:fi,magFilter:fi}:{};D.map!==null&&D.map.dispose(),D.map=new is(r.x,r.y,$),D.map.texture.name=K.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const J=D.getViewportCount();for(let $=0;$<J;$++){const N=D.getViewport($);a.set(s.x*N.x,s.y*N.y,s.x*N.z,s.y*N.w),B.viewport(a),D.updateMatrices(K,$),i=D.getFrustum(),y(A,b,D.camera,K,this.type)}D.isPointLightShadow!==!0&&this.type===Li&&v(D,b),D.needsUpdate=!1}d=this.type,m.needsUpdate=!1,t.setRenderTarget(E,x,P)};function v(w,A){const b=e.update(g);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new is(r.x,r.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(A,null,b,h,g,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(A,null,b,p,g,null)}function M(w,A,b,E){let x=null;const P=b.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)x=P;else if(x=b.isPointLight===!0?l:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=x.uuid,H=A.uuid;let Y=c[B];Y===void 0&&(Y={},c[B]=Y);let V=Y[H];V===void 0&&(V=x.clone(),Y[H]=V,A.addEventListener("dispose",C)),x=V}if(x.visible=A.visible,x.wireframe=A.wireframe,E===Li?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:f[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,b.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const B=t.properties.get(x);B.light=b}return x}function y(w,A,b,E,x){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===Li)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,w.matrixWorld);const H=e.update(w),Y=w.material;if(Array.isArray(Y)){const V=H.groups;for(let z=0,K=V.length;z<K;z++){const D=V[z],Q=Y[D.materialIndex];if(Q&&Q.visible){const J=M(w,Q,E,x);w.onBeforeShadow(t,w,A,b,H,J,D),t.renderBufferDirect(b,null,H,J,w,D),w.onAfterShadow(t,w,A,b,H,J,D)}}}else if(Y.visible){const V=M(w,Y,E,x);w.onBeforeShadow(t,w,A,b,H,V,null),t.renderBufferDirect(b,null,H,V,w,null),w.onAfterShadow(t,w,A,b,H,V,null)}}const B=w.children;for(let H=0,Y=B.length;H<Y;H++)y(B[H],A,b,E,x)}function C(w){w.target.removeEventListener("dispose",C);for(const b in c){const E=c[b],x=w.target.uuid;x in E&&(E[x].dispose(),delete E[x])}}}const vA={[af]:of,[lf]:df,[cf]:ff,[aa]:uf,[of]:af,[df]:lf,[ff]:cf,[uf]:aa};function _A(t,e){function n(){let U=!1;const he=new ht;let Z=null;const ie=new ht(0,0,0,0);return{setMask:function(ve){Z!==ve&&!U&&(t.colorMask(ve,ve,ve,ve),Z=ve)},setLocked:function(ve){U=ve},setClear:function(ve,me,Oe,pt,Gt){Gt===!0&&(ve*=pt,me*=pt,Oe*=pt),he.set(ve,me,Oe,pt),ie.equals(he)===!1&&(t.clearColor(ve,me,Oe,pt),ie.copy(he))},reset:function(){U=!1,Z=null,ie.set(-1,0,0,0)}}}function i(){let U=!1,he=!1,Z=null,ie=null,ve=null;return{setReversed:function(me){if(he!==me){const Oe=e.get("EXT_clip_control");he?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT);const pt=ve;ve=null,this.setClear(pt)}he=me},getReversed:function(){return he},setTest:function(me){me?ne(t.DEPTH_TEST):se(t.DEPTH_TEST)},setMask:function(me){Z!==me&&!U&&(t.depthMask(me),Z=me)},setFunc:function(me){if(he&&(me=vA[me]),ie!==me){switch(me){case af:t.depthFunc(t.NEVER);break;case of:t.depthFunc(t.ALWAYS);break;case lf:t.depthFunc(t.LESS);break;case aa:t.depthFunc(t.LEQUAL);break;case cf:t.depthFunc(t.EQUAL);break;case uf:t.depthFunc(t.GEQUAL);break;case df:t.depthFunc(t.GREATER);break;case ff:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ie=me}},setLocked:function(me){U=me},setClear:function(me){ve!==me&&(he&&(me=1-me),t.clearDepth(me),ve=me)},reset:function(){U=!1,Z=null,ie=null,ve=null,he=!1}}}function r(){let U=!1,he=null,Z=null,ie=null,ve=null,me=null,Oe=null,pt=null,Gt=null;return{setTest:function(it){U||(it?ne(t.STENCIL_TEST):se(t.STENCIL_TEST))},setMask:function(it){he!==it&&!U&&(t.stencilMask(it),he=it)},setFunc:function(it,yn,Jn){(Z!==it||ie!==yn||ve!==Jn)&&(t.stencilFunc(it,yn,Jn),Z=it,ie=yn,ve=Jn)},setOp:function(it,yn,Jn){(me!==it||Oe!==yn||pt!==Jn)&&(t.stencilOp(it,yn,Jn),me=it,Oe=yn,pt=Jn)},setLocked:function(it){U=it},setClear:function(it){Gt!==it&&(t.clearStencil(it),Gt=it)},reset:function(){U=!1,he=null,Z=null,ie=null,ve=null,me=null,Oe=null,pt=null,Gt=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,p=[],_=null,g=!1,m=null,d=null,v=null,M=null,y=null,C=null,w=null,A=new Be(0,0,0),b=0,E=!1,x=null,P=null,B=null,H=null,Y=null;const V=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,K=0;const D=t.getParameter(t.VERSION);D.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(D)[1]),z=K>=1):D.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),z=K>=2);let Q=null,J={};const $=t.getParameter(t.SCISSOR_BOX),N=t.getParameter(t.VIEWPORT),ce=new ht().fromArray($),G=new ht().fromArray(N);function X(U,he,Z,ie){const ve=new Uint8Array(4),me=t.createTexture();t.bindTexture(U,me),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Oe=0;Oe<Z;Oe++)U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY?t.texImage3D(he,0,t.RGBA,1,1,ie,0,t.RGBA,t.UNSIGNED_BYTE,ve):t.texImage2D(he+Oe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ve);return me}const le={};le[t.TEXTURE_2D]=X(t.TEXTURE_2D,t.TEXTURE_2D,1),le[t.TEXTURE_CUBE_MAP]=X(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[t.TEXTURE_2D_ARRAY]=X(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),le[t.TEXTURE_3D]=X(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(t.DEPTH_TEST),a.setFunc(aa),Ze(!1),Qe(xm),ne(t.CULL_FACE),k(Sr);function ne(U){u[U]!==!0&&(t.enable(U),u[U]=!0)}function se(U){u[U]!==!1&&(t.disable(U),u[U]=!1)}function Ne(U,he){return f[U]!==he?(t.bindFramebuffer(U,he),f[U]=he,U===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=he),U===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=he),!0):!1}function de(U,he){let Z=p,ie=!1;if(U){Z=h.get(he),Z===void 0&&(Z=[],h.set(he,Z));const ve=U.textures;if(Z.length!==ve.length||Z[0]!==t.COLOR_ATTACHMENT0){for(let me=0,Oe=ve.length;me<Oe;me++)Z[me]=t.COLOR_ATTACHMENT0+me;Z.length=ve.length,ie=!0}}else Z[0]!==t.BACK&&(Z[0]=t.BACK,ie=!0);ie&&t.drawBuffers(Z)}function je(U){return _!==U?(t.useProgram(U),_=U,!0):!1}const Xe={[zr]:t.FUNC_ADD,[Ox]:t.FUNC_SUBTRACT,[Fx]:t.FUNC_REVERSE_SUBTRACT};Xe[kx]=t.MIN,Xe[Bx]=t.MAX;const mt={[zx]:t.ZERO,[Gx]:t.ONE,[Hx]:t.SRC_COLOR,[rf]:t.SRC_ALPHA,[qx]:t.SRC_ALPHA_SATURATE,[Xx]:t.DST_COLOR,[Wx]:t.DST_ALPHA,[Vx]:t.ONE_MINUS_SRC_COLOR,[sf]:t.ONE_MINUS_SRC_ALPHA,[$x]:t.ONE_MINUS_DST_COLOR,[jx]:t.ONE_MINUS_DST_ALPHA,[Yx]:t.CONSTANT_COLOR,[Kx]:t.ONE_MINUS_CONSTANT_COLOR,[Zx]:t.CONSTANT_ALPHA,[Qx]:t.ONE_MINUS_CONSTANT_ALPHA};function k(U,he,Z,ie,ve,me,Oe,pt,Gt,it){if(U===Sr){g===!0&&(se(t.BLEND),g=!1);return}if(g===!1&&(ne(t.BLEND),g=!0),U!==Ux){if(U!==m||it!==E){if((d!==zr||y!==zr)&&(t.blendEquation(t.FUNC_ADD),d=zr,y=zr),it)switch(U){case Ys:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case sa:t.blendFunc(t.ONE,t.ONE);break;case Sm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Em:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Ys:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case sa:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case Sm:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Em:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,M=null,C=null,w=null,A.set(0,0,0),b=0,m=U,E=it}return}ve=ve||he,me=me||Z,Oe=Oe||ie,(he!==d||ve!==y)&&(t.blendEquationSeparate(Xe[he],Xe[ve]),d=he,y=ve),(Z!==v||ie!==M||me!==C||Oe!==w)&&(t.blendFuncSeparate(mt[Z],mt[ie],mt[me],mt[Oe]),v=Z,M=ie,C=me,w=Oe),(pt.equals(A)===!1||Gt!==b)&&(t.blendColor(pt.r,pt.g,pt.b,Gt),A.copy(pt),b=Gt),m=U,E=!1}function Mn(U,he){U.side===cn?se(t.CULL_FACE):ne(t.CULL_FACE);let Z=U.side===mn;he&&(Z=!Z),Ze(Z),U.blending===Ys&&U.transparent===!1?k(Sr):k(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),s.setMask(U.colorWrite);const ie=U.stencilWrite;o.setTest(ie),ie&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ne(t.SAMPLE_ALPHA_TO_COVERAGE):se(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ze(U){x!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),x=U)}function Qe(U){U!==Lx?(ne(t.CULL_FACE),U!==P&&(U===xm?t.cullFace(t.BACK):U===Dx?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):se(t.CULL_FACE),P=U}function Ie(U){U!==B&&(z&&t.lineWidth(U),B=U)}function dt(U,he,Z){U?(ne(t.POLYGON_OFFSET_FILL),(H!==he||Y!==Z)&&(t.polygonOffset(he,Z),H=he,Y=Z)):se(t.POLYGON_OFFSET_FILL)}function Te(U){U?ne(t.SCISSOR_TEST):se(t.SCISSOR_TEST)}function R(U){U===void 0&&(U=t.TEXTURE0+V-1),Q!==U&&(t.activeTexture(U),Q=U)}function S(U,he,Z){Z===void 0&&(Q===null?Z=t.TEXTURE0+V-1:Z=Q);let ie=J[Z];ie===void 0&&(ie={type:void 0,texture:void 0},J[Z]=ie),(ie.type!==U||ie.texture!==he)&&(Q!==Z&&(t.activeTexture(Z),Q=Z),t.bindTexture(U,he||le[U]),ie.type=U,ie.texture=he)}function W(){const U=J[Q];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function te(){try{t.compressedTexImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function re(){try{t.compressedTexImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{t.texSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{t.texSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function qe(){try{t.texStorage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{t.texStorage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ee(){try{t.texImage2D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ue(){try{t.texImage3D.apply(t,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Fe(U){ce.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),ce.copy(U))}function we(U){G.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),G.copy(U))}function Je(U,he){let Z=c.get(he);Z===void 0&&(Z=new WeakMap,c.set(he,Z));let ie=Z.get(U);ie===void 0&&(ie=t.getUniformBlockIndex(he,U.name),Z.set(U,ie))}function ze(U,he){const ie=c.get(he).get(U);l.get(he)!==ie&&(t.uniformBlockBinding(he,ie,U.__bindingPointIndex),l.set(he,ie))}function at(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},Q=null,J={},f={},h=new WeakMap,p=[],_=null,g=!1,m=null,d=null,v=null,M=null,y=null,C=null,w=null,A=new Be(0,0,0),b=0,E=!1,x=null,P=null,B=null,H=null,Y=null,ce.set(0,0,t.canvas.width,t.canvas.height),G.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:se,bindFramebuffer:Ne,drawBuffers:de,useProgram:je,setBlending:k,setMaterial:Mn,setFlipSided:Ze,setCullFace:Qe,setLineWidth:Ie,setPolygonOffset:dt,setScissorTest:Te,activeTexture:R,bindTexture:S,unbindTexture:W,compressedTexImage2D:te,compressedTexImage3D:re,texImage2D:Ee,texImage3D:Ue,updateUBOMapping:Je,uniformBlockBinding:ze,texStorage2D:qe,texStorage3D:oe,texSubImage2D:ee,texSubImage3D:Ae,compressedTexSubImage2D:pe,compressedTexSubImage3D:ye,scissor:Fe,viewport:we,reset:at}}function vg(t,e,n,i){const r=MA(i);switch(n){case s_:return t*e;case o_:return t*e;case l_:return t*e*2;case c_:return t*e/r.components*r.byteLength;case Xh:return t*e/r.components*r.byteLength;case u_:return t*e*2/r.components*r.byteLength;case $h:return t*e*2/r.components*r.byteLength;case a_:return t*e*3/r.components*r.byteLength;case ci:return t*e*4/r.components*r.byteLength;case qh:return t*e*4/r.components*r.byteLength;case zl:case Gl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Hl:case Vl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case vf:case Mf:return Math.max(t,16)*Math.max(e,8)/4;case gf:case _f:return Math.max(t,8)*Math.max(e,8)/2;case yf:case xf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Sf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ef:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case wf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Tf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Af:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case bf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Cf:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Rf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Pf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case If:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Lf:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Df:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Nf:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Uf:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Of:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Wl:case Ff:case kf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case d_:case Bf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case zf:case Gf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function MA(t){switch(t){case $i:case n_:return{byteLength:1,components:1};case yo:case i_:case Po:return{byteLength:2,components:1};case Wh:case jh:return{byteLength:2,components:4};case ns:case Vh:case ki:return{byteLength:4,components:1};case r_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function yA(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ye,u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(R,S){return p?new OffscreenCanvas(R,S):yc("canvas")}function g(R,S,W){let te=1;const re=Te(R);if((re.width>W||re.height>W)&&(te=W/Math.max(re.width,re.height)),te<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ee=Math.floor(te*re.width),Ae=Math.floor(te*re.height);f===void 0&&(f=_(ee,Ae));const pe=S?_(ee,Ae):f;return pe.width=ee,pe.height=Ae,pe.getContext("2d").drawImage(R,0,0,ee,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+ee+"x"+Ae+")."),pe}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),R;return R}function m(R){return R.generateMipmaps}function d(R){t.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?t.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function M(R,S,W,te,re=!1){if(R!==null){if(t[R]!==void 0)return t[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ee=S;if(S===t.RED&&(W===t.FLOAT&&(ee=t.R32F),W===t.HALF_FLOAT&&(ee=t.R16F),W===t.UNSIGNED_BYTE&&(ee=t.R8)),S===t.RED_INTEGER&&(W===t.UNSIGNED_BYTE&&(ee=t.R8UI),W===t.UNSIGNED_SHORT&&(ee=t.R16UI),W===t.UNSIGNED_INT&&(ee=t.R32UI),W===t.BYTE&&(ee=t.R8I),W===t.SHORT&&(ee=t.R16I),W===t.INT&&(ee=t.R32I)),S===t.RG&&(W===t.FLOAT&&(ee=t.RG32F),W===t.HALF_FLOAT&&(ee=t.RG16F),W===t.UNSIGNED_BYTE&&(ee=t.RG8)),S===t.RG_INTEGER&&(W===t.UNSIGNED_BYTE&&(ee=t.RG8UI),W===t.UNSIGNED_SHORT&&(ee=t.RG16UI),W===t.UNSIGNED_INT&&(ee=t.RG32UI),W===t.BYTE&&(ee=t.RG8I),W===t.SHORT&&(ee=t.RG16I),W===t.INT&&(ee=t.RG32I)),S===t.RGB_INTEGER&&(W===t.UNSIGNED_BYTE&&(ee=t.RGB8UI),W===t.UNSIGNED_SHORT&&(ee=t.RGB16UI),W===t.UNSIGNED_INT&&(ee=t.RGB32UI),W===t.BYTE&&(ee=t.RGB8I),W===t.SHORT&&(ee=t.RGB16I),W===t.INT&&(ee=t.RGB32I)),S===t.RGBA_INTEGER&&(W===t.UNSIGNED_BYTE&&(ee=t.RGBA8UI),W===t.UNSIGNED_SHORT&&(ee=t.RGBA16UI),W===t.UNSIGNED_INT&&(ee=t.RGBA32UI),W===t.BYTE&&(ee=t.RGBA8I),W===t.SHORT&&(ee=t.RGBA16I),W===t.INT&&(ee=t.RGBA32I)),S===t.RGB&&W===t.UNSIGNED_INT_5_9_9_9_REV&&(ee=t.RGB9_E5),S===t.RGBA){const Ae=re?jc:et.getTransfer(te);W===t.FLOAT&&(ee=t.RGBA32F),W===t.HALF_FLOAT&&(ee=t.RGBA16F),W===t.UNSIGNED_BYTE&&(ee=Ae===ft?t.SRGB8_ALPHA8:t.RGBA8),W===t.UNSIGNED_SHORT_4_4_4_4&&(ee=t.RGBA4),W===t.UNSIGNED_SHORT_5_5_5_1&&(ee=t.RGB5_A1)}return(ee===t.R16F||ee===t.R32F||ee===t.RG16F||ee===t.RG32F||ee===t.RGBA16F||ee===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function y(R,S){let W;return R?S===null||S===ns||S===ca?W=t.DEPTH24_STENCIL8:S===ki?W=t.DEPTH32F_STENCIL8:S===yo&&(W=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ns||S===ca?W=t.DEPTH_COMPONENT24:S===ki?W=t.DEPTH_COMPONENT32F:S===yo&&(W=t.DEPTH_COMPONENT16),W}function C(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==fi&&R.minFilter!==xi?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function w(R){const S=R.target;S.removeEventListener("dispose",w),b(S),S.isVideoTexture&&u.delete(S)}function A(R){const S=R.target;S.removeEventListener("dispose",A),x(S)}function b(R){const S=i.get(R);if(S.__webglInit===void 0)return;const W=R.source,te=h.get(W);if(te){const re=te[S.__cacheKey];re.usedTimes--,re.usedTimes===0&&E(R),Object.keys(te).length===0&&h.delete(W)}i.remove(R)}function E(R){const S=i.get(R);t.deleteTexture(S.__webglTexture);const W=R.source,te=h.get(W);delete te[S.__cacheKey],a.memory.textures--}function x(R){const S=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(S.__webglFramebuffer[te]))for(let re=0;re<S.__webglFramebuffer[te].length;re++)t.deleteFramebuffer(S.__webglFramebuffer[te][re]);else t.deleteFramebuffer(S.__webglFramebuffer[te]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[te])}else{if(Array.isArray(S.__webglFramebuffer))for(let te=0;te<S.__webglFramebuffer.length;te++)t.deleteFramebuffer(S.__webglFramebuffer[te]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let te=0;te<S.__webglColorRenderbuffer.length;te++)S.__webglColorRenderbuffer[te]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[te]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const W=R.textures;for(let te=0,re=W.length;te<re;te++){const ee=i.get(W[te]);ee.__webglTexture&&(t.deleteTexture(ee.__webglTexture),a.memory.textures--),i.remove(W[te])}i.remove(R)}let P=0;function B(){P=0}function H(){const R=P;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),P+=1,R}function Y(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function V(R,S){const W=i.get(R);if(R.isVideoTexture&&Ie(R),R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){const te=R.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(W,R,S);return}}n.bindTexture(t.TEXTURE_2D,W.__webglTexture,t.TEXTURE0+S)}function z(R,S){const W=i.get(R);if(R.version>0&&W.__version!==R.version){G(W,R,S);return}n.bindTexture(t.TEXTURE_2D_ARRAY,W.__webglTexture,t.TEXTURE0+S)}function K(R,S){const W=i.get(R);if(R.version>0&&W.__version!==R.version){G(W,R,S);return}n.bindTexture(t.TEXTURE_3D,W.__webglTexture,t.TEXTURE0+S)}function D(R,S){const W=i.get(R);if(R.version>0&&W.__version!==R.version){X(W,R,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,W.__webglTexture,t.TEXTURE0+S)}const Q={[vc]:t.REPEAT,[Xr]:t.CLAMP_TO_EDGE,[mf]:t.MIRRORED_REPEAT},J={[fi]:t.NEAREST,[oS]:t.NEAREST_MIPMAP_NEAREST,[nl]:t.NEAREST_MIPMAP_LINEAR,[xi]:t.LINEAR,[Cu]:t.LINEAR_MIPMAP_NEAREST,[$r]:t.LINEAR_MIPMAP_LINEAR},$={[dS]:t.NEVER,[vS]:t.ALWAYS,[fS]:t.LESS,[h_]:t.LEQUAL,[hS]:t.EQUAL,[gS]:t.GEQUAL,[pS]:t.GREATER,[mS]:t.NOTEQUAL};function N(R,S){if(S.type===ki&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===xi||S.magFilter===Cu||S.magFilter===nl||S.magFilter===$r||S.minFilter===xi||S.minFilter===Cu||S.minFilter===nl||S.minFilter===$r)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,Q[S.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,Q[S.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,Q[S.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,J[S.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,J[S.minFilter]),S.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,$[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===fi||S.minFilter!==nl&&S.minFilter!==$r||S.type===ki&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function ce(R,S){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",w));const te=S.source;let re=h.get(te);re===void 0&&(re={},h.set(te,re));const ee=Y(S);if(ee!==R.__cacheKey){re[ee]===void 0&&(re[ee]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,W=!0),re[ee].usedTimes++;const Ae=re[R.__cacheKey];Ae!==void 0&&(re[R.__cacheKey].usedTimes--,Ae.usedTimes===0&&E(S)),R.__cacheKey=ee,R.__webglTexture=re[ee].texture}return W}function G(R,S,W){let te=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(te=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(te=t.TEXTURE_3D);const re=ce(R,S),ee=S.source;n.bindTexture(te,R.__webglTexture,t.TEXTURE0+W);const Ae=i.get(ee);if(ee.version!==Ae.__version||re===!0){n.activeTexture(t.TEXTURE0+W);const pe=et.getPrimaries(et.workingColorSpace),ye=S.colorSpace===dr?null:et.getPrimaries(S.colorSpace),qe=S.colorSpace===dr||pe===ye?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,qe);let oe=g(S.image,!1,r.maxTextureSize);oe=dt(S,oe);const Ee=s.convert(S.format,S.colorSpace),Ue=s.convert(S.type);let Fe=M(S.internalFormat,Ee,Ue,S.colorSpace,S.isVideoTexture);N(te,S);let we;const Je=S.mipmaps,ze=S.isVideoTexture!==!0,at=Ae.__version===void 0||re===!0,U=ee.dataReady,he=C(S,oe);if(S.isDepthTexture)Fe=y(S.format===ua,S.type),at&&(ze?n.texStorage2D(t.TEXTURE_2D,1,Fe,oe.width,oe.height):n.texImage2D(t.TEXTURE_2D,0,Fe,oe.width,oe.height,0,Ee,Ue,null));else if(S.isDataTexture)if(Je.length>0){ze&&at&&n.texStorage2D(t.TEXTURE_2D,he,Fe,Je[0].width,Je[0].height);for(let Z=0,ie=Je.length;Z<ie;Z++)we=Je[Z],ze?U&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,we.width,we.height,Ee,Ue,we.data):n.texImage2D(t.TEXTURE_2D,Z,Fe,we.width,we.height,0,Ee,Ue,we.data);S.generateMipmaps=!1}else ze?(at&&n.texStorage2D(t.TEXTURE_2D,he,Fe,oe.width,oe.height),U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,oe.width,oe.height,Ee,Ue,oe.data)):n.texImage2D(t.TEXTURE_2D,0,Fe,oe.width,oe.height,0,Ee,Ue,oe.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ze&&at&&n.texStorage3D(t.TEXTURE_2D_ARRAY,he,Fe,Je[0].width,Je[0].height,oe.depth);for(let Z=0,ie=Je.length;Z<ie;Z++)if(we=Je[Z],S.format!==ci)if(Ee!==null)if(ze){if(U)if(S.layerUpdates.size>0){const ve=vg(we.width,we.height,S.format,S.type);for(const me of S.layerUpdates){const Oe=we.data.subarray(me*ve/we.data.BYTES_PER_ELEMENT,(me+1)*ve/we.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,me,we.width,we.height,1,Ee,Oe)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,0,we.width,we.height,oe.depth,Ee,we.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Z,Fe,we.width,we.height,oe.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?U&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,0,we.width,we.height,oe.depth,Ee,Ue,we.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Z,Fe,we.width,we.height,oe.depth,0,Ee,Ue,we.data)}else{ze&&at&&n.texStorage2D(t.TEXTURE_2D,he,Fe,Je[0].width,Je[0].height);for(let Z=0,ie=Je.length;Z<ie;Z++)we=Je[Z],S.format!==ci?Ee!==null?ze?U&&n.compressedTexSubImage2D(t.TEXTURE_2D,Z,0,0,we.width,we.height,Ee,we.data):n.compressedTexImage2D(t.TEXTURE_2D,Z,Fe,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?U&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,we.width,we.height,Ee,Ue,we.data):n.texImage2D(t.TEXTURE_2D,Z,Fe,we.width,we.height,0,Ee,Ue,we.data)}else if(S.isDataArrayTexture)if(ze){if(at&&n.texStorage3D(t.TEXTURE_2D_ARRAY,he,Fe,oe.width,oe.height,oe.depth),U)if(S.layerUpdates.size>0){const Z=vg(oe.width,oe.height,S.format,S.type);for(const ie of S.layerUpdates){const ve=oe.data.subarray(ie*Z/oe.data.BYTES_PER_ELEMENT,(ie+1)*Z/oe.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ie,oe.width,oe.height,1,Ee,Ue,ve)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,Ee,Ue,oe.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Fe,oe.width,oe.height,oe.depth,0,Ee,Ue,oe.data);else if(S.isData3DTexture)ze?(at&&n.texStorage3D(t.TEXTURE_3D,he,Fe,oe.width,oe.height,oe.depth),U&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,Ee,Ue,oe.data)):n.texImage3D(t.TEXTURE_3D,0,Fe,oe.width,oe.height,oe.depth,0,Ee,Ue,oe.data);else if(S.isFramebufferTexture){if(at)if(ze)n.texStorage2D(t.TEXTURE_2D,he,Fe,oe.width,oe.height);else{let Z=oe.width,ie=oe.height;for(let ve=0;ve<he;ve++)n.texImage2D(t.TEXTURE_2D,ve,Fe,Z,ie,0,Ee,Ue,null),Z>>=1,ie>>=1}}else if(Je.length>0){if(ze&&at){const Z=Te(Je[0]);n.texStorage2D(t.TEXTURE_2D,he,Fe,Z.width,Z.height)}for(let Z=0,ie=Je.length;Z<ie;Z++)we=Je[Z],ze?U&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,Ee,Ue,we):n.texImage2D(t.TEXTURE_2D,Z,Fe,Ee,Ue,we);S.generateMipmaps=!1}else if(ze){if(at){const Z=Te(oe);n.texStorage2D(t.TEXTURE_2D,he,Fe,Z.width,Z.height)}U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ee,Ue,oe)}else n.texImage2D(t.TEXTURE_2D,0,Fe,Ee,Ue,oe);m(S)&&d(te),Ae.__version=ee.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function X(R,S,W){if(S.image.length!==6)return;const te=ce(R,S),re=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+W);const ee=i.get(re);if(re.version!==ee.__version||te===!0){n.activeTexture(t.TEXTURE0+W);const Ae=et.getPrimaries(et.workingColorSpace),pe=S.colorSpace===dr?null:et.getPrimaries(S.colorSpace),ye=S.colorSpace===dr||Ae===pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const qe=S.isCompressedTexture||S.image[0].isCompressedTexture,oe=S.image[0]&&S.image[0].isDataTexture,Ee=[];for(let ie=0;ie<6;ie++)!qe&&!oe?Ee[ie]=g(S.image[ie],!0,r.maxCubemapSize):Ee[ie]=oe?S.image[ie].image:S.image[ie],Ee[ie]=dt(S,Ee[ie]);const Ue=Ee[0],Fe=s.convert(S.format,S.colorSpace),we=s.convert(S.type),Je=M(S.internalFormat,Fe,we,S.colorSpace),ze=S.isVideoTexture!==!0,at=ee.__version===void 0||te===!0,U=re.dataReady;let he=C(S,Ue);N(t.TEXTURE_CUBE_MAP,S);let Z;if(qe){ze&&at&&n.texStorage2D(t.TEXTURE_CUBE_MAP,he,Je,Ue.width,Ue.height);for(let ie=0;ie<6;ie++){Z=Ee[ie].mipmaps;for(let ve=0;ve<Z.length;ve++){const me=Z[ve];S.format!==ci?Fe!==null?ze?U&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,0,0,me.width,me.height,Fe,me.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,Je,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,0,0,me.width,me.height,Fe,we,me.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve,Je,me.width,me.height,0,Fe,we,me.data)}}}else{if(Z=S.mipmaps,ze&&at){Z.length>0&&he++;const ie=Te(Ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,he,Je,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(oe){ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ee[ie].width,Ee[ie].height,Fe,we,Ee[ie].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Je,Ee[ie].width,Ee[ie].height,0,Fe,we,Ee[ie].data);for(let ve=0;ve<Z.length;ve++){const Oe=Z[ve].image[ie].image;ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,0,0,Oe.width,Oe.height,Fe,we,Oe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,Je,Oe.width,Oe.height,0,Fe,we,Oe.data)}}else{ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Fe,we,Ee[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Je,Fe,we,Ee[ie]);for(let ve=0;ve<Z.length;ve++){const me=Z[ve];ze?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,0,0,Fe,we,me.image[ie]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,ve+1,Je,Fe,we,me.image[ie])}}}m(S)&&d(t.TEXTURE_CUBE_MAP),ee.__version=re.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function le(R,S,W,te,re,ee){const Ae=s.convert(W.format,W.colorSpace),pe=s.convert(W.type),ye=M(W.internalFormat,Ae,pe,W.colorSpace),qe=i.get(S),oe=i.get(W);if(oe.__renderTarget=S,!qe.__hasExternalTextures){const Ee=Math.max(1,S.width>>ee),Ue=Math.max(1,S.height>>ee);re===t.TEXTURE_3D||re===t.TEXTURE_2D_ARRAY?n.texImage3D(re,ee,ye,Ee,Ue,S.depth,0,Ae,pe,null):n.texImage2D(re,ee,ye,Ee,Ue,0,Ae,pe,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),Qe(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,re,oe.__webglTexture,0,Ze(S)):(re===t.TEXTURE_2D||re>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,te,re,oe.__webglTexture,ee),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ne(R,S,W){if(t.bindRenderbuffer(t.RENDERBUFFER,R),S.depthBuffer){const te=S.depthTexture,re=te&&te.isDepthTexture?te.type:null,ee=y(S.stencilBuffer,re),Ae=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=Ze(S);Qe(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,pe,ee,S.width,S.height):W?t.renderbufferStorageMultisample(t.RENDERBUFFER,pe,ee,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,ee,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Ae,t.RENDERBUFFER,R)}else{const te=S.textures;for(let re=0;re<te.length;re++){const ee=te[re],Ae=s.convert(ee.format,ee.colorSpace),pe=s.convert(ee.type),ye=M(ee.internalFormat,Ae,pe,ee.colorSpace),qe=Ze(S);W&&Qe(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,qe,ye,S.width,S.height):Qe(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,qe,ye,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,ye,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function se(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=i.get(S.depthTexture);te.__renderTarget=S,(!te.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const re=te.__webglTexture,ee=Ze(S);if(S.depthTexture.format===Ks)Qe(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,re,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,re,0);else if(S.depthTexture.format===ua)Qe(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,re,0,ee):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Ne(R){const S=i.get(R),W=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const te=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),te){const re=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,te.removeEventListener("dispose",re)};te.addEventListener("dispose",re),S.__depthDisposeCallback=re}S.__boundDepthTexture=te}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");se(S.__webglFramebuffer,R)}else if(W){S.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[te]),S.__webglDepthbuffer[te]===void 0)S.__webglDepthbuffer[te]=t.createRenderbuffer(),ne(S.__webglDepthbuffer[te],R,!1);else{const re=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ee=S.__webglDepthbuffer[te];t.bindRenderbuffer(t.RENDERBUFFER,ee),t.framebufferRenderbuffer(t.FRAMEBUFFER,re,t.RENDERBUFFER,ee)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),ne(S.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,re=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,re),t.framebufferRenderbuffer(t.FRAMEBUFFER,te,t.RENDERBUFFER,re)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function de(R,S,W){const te=i.get(R);S!==void 0&&le(te.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),W!==void 0&&Ne(R)}function je(R){const S=R.texture,W=i.get(R),te=i.get(S);R.addEventListener("dispose",A);const re=R.textures,ee=R.isWebGLCubeRenderTarget===!0,Ae=re.length>1;if(Ae||(te.__webglTexture===void 0&&(te.__webglTexture=t.createTexture()),te.__version=S.version,a.memory.textures++),ee){W.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[pe]=[];for(let ye=0;ye<S.mipmaps.length;ye++)W.__webglFramebuffer[pe][ye]=t.createFramebuffer()}else W.__webglFramebuffer[pe]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let pe=0;pe<S.mipmaps.length;pe++)W.__webglFramebuffer[pe]=t.createFramebuffer()}else W.__webglFramebuffer=t.createFramebuffer();if(Ae)for(let pe=0,ye=re.length;pe<ye;pe++){const qe=i.get(re[pe]);qe.__webglTexture===void 0&&(qe.__webglTexture=t.createTexture(),a.memory.textures++)}if(R.samples>0&&Qe(R)===!1){W.__webglMultisampledFramebuffer=t.createFramebuffer(),W.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let pe=0;pe<re.length;pe++){const ye=re[pe];W.__webglColorRenderbuffer[pe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,W.__webglColorRenderbuffer[pe]);const qe=s.convert(ye.format,ye.colorSpace),oe=s.convert(ye.type),Ee=M(ye.internalFormat,qe,oe,ye.colorSpace,R.isXRRenderTarget===!0),Ue=Ze(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ue,Ee,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+pe,t.RENDERBUFFER,W.__webglColorRenderbuffer[pe])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=t.createRenderbuffer(),ne(W.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ee){n.bindTexture(t.TEXTURE_CUBE_MAP,te.__webglTexture),N(t.TEXTURE_CUBE_MAP,S);for(let pe=0;pe<6;pe++)if(S.mipmaps&&S.mipmaps.length>0)for(let ye=0;ye<S.mipmaps.length;ye++)le(W.__webglFramebuffer[pe][ye],R,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,ye);else le(W.__webglFramebuffer[pe],R,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);m(S)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ae){for(let pe=0,ye=re.length;pe<ye;pe++){const qe=re[pe],oe=i.get(qe);n.bindTexture(t.TEXTURE_2D,oe.__webglTexture),N(t.TEXTURE_2D,qe),le(W.__webglFramebuffer,R,qe,t.COLOR_ATTACHMENT0+pe,t.TEXTURE_2D,0),m(qe)&&d(t.TEXTURE_2D)}n.unbindTexture()}else{let pe=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(pe=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(pe,te.__webglTexture),N(pe,S),S.mipmaps&&S.mipmaps.length>0)for(let ye=0;ye<S.mipmaps.length;ye++)le(W.__webglFramebuffer[ye],R,S,t.COLOR_ATTACHMENT0,pe,ye);else le(W.__webglFramebuffer,R,S,t.COLOR_ATTACHMENT0,pe,0);m(S)&&d(pe),n.unbindTexture()}R.depthBuffer&&Ne(R)}function Xe(R){const S=R.textures;for(let W=0,te=S.length;W<te;W++){const re=S[W];if(m(re)){const ee=v(R),Ae=i.get(re).__webglTexture;n.bindTexture(ee,Ae),d(ee),n.unbindTexture()}}}const mt=[],k=[];function Mn(R){if(R.samples>0){if(Qe(R)===!1){const S=R.textures,W=R.width,te=R.height;let re=t.COLOR_BUFFER_BIT;const ee=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ae=i.get(R),pe=S.length>1;if(pe)for(let ye=0;ye<S.length;ye++)n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let ye=0;ye<S.length;ye++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(re|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(re|=t.STENCIL_BUFFER_BIT)),pe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ae.__webglColorRenderbuffer[ye]);const qe=i.get(S[ye]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,qe,0)}t.blitFramebuffer(0,0,W,te,0,0,W,te,re,t.NEAREST),l===!0&&(mt.length=0,k.length=0,mt.push(t.COLOR_ATTACHMENT0+ye),R.depthBuffer&&R.resolveDepthBuffer===!1&&(mt.push(ee),k.push(ee),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,k)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,mt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),pe)for(let ye=0;ye<S.length;ye++){n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.RENDERBUFFER,Ae.__webglColorRenderbuffer[ye]);const qe=i.get(S[ye]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ae.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ye,t.TEXTURE_2D,qe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function Ze(R){return Math.min(r.maxSamples,R.samples)}function Qe(R){const S=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ie(R){const S=a.render.frame;u.get(R)!==S&&(u.set(R,S),R.update())}function dt(R,S){const W=R.colorSpace,te=R.format,re=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||W!==va&&W!==dr&&(et.getTransfer(W)===ft?(te!==ci||re!==$i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),S}function Te(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.setTexture2D=V,this.setTexture2DArray=z,this.setTexture3D=K,this.setTextureCube=D,this.rebindTextures=de,this.setupRenderTarget=je,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=Mn,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=le,this.useMultisampledRTT=Qe}function xA(t,e){function n(i,r=dr){let s;const a=et.getTransfer(r);if(i===$i)return t.UNSIGNED_BYTE;if(i===Wh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===jh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===r_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===n_)return t.BYTE;if(i===i_)return t.SHORT;if(i===yo)return t.UNSIGNED_SHORT;if(i===Vh)return t.INT;if(i===ns)return t.UNSIGNED_INT;if(i===ki)return t.FLOAT;if(i===Po)return t.HALF_FLOAT;if(i===s_)return t.ALPHA;if(i===a_)return t.RGB;if(i===ci)return t.RGBA;if(i===o_)return t.LUMINANCE;if(i===l_)return t.LUMINANCE_ALPHA;if(i===Ks)return t.DEPTH_COMPONENT;if(i===ua)return t.DEPTH_STENCIL;if(i===c_)return t.RED;if(i===Xh)return t.RED_INTEGER;if(i===u_)return t.RG;if(i===$h)return t.RG_INTEGER;if(i===qh)return t.RGBA_INTEGER;if(i===zl||i===Gl||i===Hl||i===Vl)if(a===ft)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===zl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Gl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Hl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Vl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===zl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Gl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Hl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Vl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===gf||i===vf||i===_f||i===Mf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===gf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===vf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===_f)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Mf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yf||i===xf||i===Sf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===yf||i===xf)return a===ft?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Sf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ef||i===wf||i===Tf||i===Af||i===bf||i===Cf||i===Rf||i===Pf||i===If||i===Lf||i===Df||i===Nf||i===Uf||i===Of)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ef)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Tf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Af)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===bf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Cf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Rf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Pf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===If)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Lf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Df)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Nf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Uf)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Of)return a===ft?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Wl||i===Ff||i===kf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Wl)return a===ft?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ff)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===kf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===d_||i===Bf||i===zf||i===Gf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Wl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Bf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===zf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Gf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ca?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class SA extends Tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class st extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const EA={type:"move"};class id{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new st,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new st,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new st,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=n.getJointPose(g,i),d=this._getHandJoint(c,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&h>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(EA)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new st;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const wA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,TA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class AA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new gn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new qi({vertexShader:wA,fragmentShader:TA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new _e(new $c(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bA extends _a{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,_=null;const g=new AA,m=n.getContextAttributes();let d=null,v=null;const M=[],y=[],C=new Ye;let w=null;const A=new Tn;A.viewport=new ht;const b=new Tn;b.viewport=new ht;const E=[A,b],x=new SA;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let X=M[G];return X===void 0&&(X=new id,M[G]=X),X.getTargetRaySpace()},this.getControllerGrip=function(G){let X=M[G];return X===void 0&&(X=new id,M[G]=X),X.getGripSpace()},this.getHand=function(G){let X=M[G];return X===void 0&&(X=new id,M[G]=X),X.getHandSpace()};function H(G){const X=y.indexOf(G.inputSource);if(X===-1)return;const le=M[X];le!==void 0&&(le.update(G.inputSource,G.frame,c||a),le.dispatchEvent({type:G.type,data:G.inputSource}))}function Y(){r.removeEventListener("select",H),r.removeEventListener("selectstart",H),r.removeEventListener("selectend",H),r.removeEventListener("squeeze",H),r.removeEventListener("squeezestart",H),r.removeEventListener("squeezeend",H),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",V);for(let G=0;G<M.length;G++){const X=y[G];X!==null&&(y[G]=null,M[G].disconnect(X))}P=null,B=null,g.reset(),e.setRenderTarget(d),p=null,h=null,f=null,r=null,v=null,ce.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",H),r.addEventListener("selectstart",H),r.addEventListener("selectend",H),r.addEventListener("squeeze",H),r.addEventListener("squeezestart",H),r.addEventListener("squeezeend",H),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",V),m.xrCompatible!==!0&&await n.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){const X={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,X),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new is(p.framebufferWidth,p.framebufferHeight,{format:ci,type:$i,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let X=null,le=null,ne=null;m.depth&&(ne=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,X=m.stencil?ua:Ks,le=m.stencil?ca:ns);const se={colorFormat:n.RGBA8,depthFormat:ne,scaleFactor:s};f=new XRWebGLBinding(r,n),h=f.createProjectionLayer(se),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new is(h.textureWidth,h.textureHeight,{format:ci,type:$i,depthTexture:new T_(h.textureWidth,h.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ce.setContext(r),ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function V(G){for(let X=0;X<G.removed.length;X++){const le=G.removed[X],ne=y.indexOf(le);ne>=0&&(y[ne]=null,M[ne].disconnect(le))}for(let X=0;X<G.added.length;X++){const le=G.added[X];let ne=y.indexOf(le);if(ne===-1){for(let Ne=0;Ne<M.length;Ne++)if(Ne>=y.length){y.push(le),ne=Ne;break}else if(y[Ne]===null){y[Ne]=le,ne=Ne;break}if(ne===-1)break}const se=M[ne];se&&se.connect(le)}}const z=new L,K=new L;function D(G,X,le){z.setFromMatrixPosition(X.matrixWorld),K.setFromMatrixPosition(le.matrixWorld);const ne=z.distanceTo(K),se=X.projectionMatrix.elements,Ne=le.projectionMatrix.elements,de=se[14]/(se[10]-1),je=se[14]/(se[10]+1),Xe=(se[9]+1)/se[5],mt=(se[9]-1)/se[5],k=(se[8]-1)/se[0],Mn=(Ne[8]+1)/Ne[0],Ze=de*k,Qe=de*Mn,Ie=ne/(-k+Mn),dt=Ie*-k;if(X.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(dt),G.translateZ(Ie),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),se[10]===-1)G.projectionMatrix.copy(X.projectionMatrix),G.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{const Te=de+Ie,R=je+Ie,S=Ze-dt,W=Qe+(ne-dt),te=Xe*je/R*Te,re=mt*je/R*Te;G.projectionMatrix.makePerspective(S,W,te,re,Te,R),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Q(G,X){X===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(X.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let X=G.near,le=G.far;g.texture!==null&&(g.depthNear>0&&(X=g.depthNear),g.depthFar>0&&(le=g.depthFar)),x.near=b.near=A.near=X,x.far=b.far=A.far=le,(P!==x.near||B!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,B=x.far),A.layers.mask=G.layers.mask|2,b.layers.mask=G.layers.mask|4,x.layers.mask=A.layers.mask|b.layers.mask;const ne=G.parent,se=x.cameras;Q(x,ne);for(let Ne=0;Ne<se.length;Ne++)Q(se[Ne],ne);se.length===2?D(x,A,b):x.projectionMatrix.copy(A.projectionMatrix),J(G,x,ne)};function J(G,X,le){le===null?G.matrix.copy(X.matrixWorld):(G.matrix.copy(le.matrixWorld),G.matrix.invert(),G.matrix.multiply(X.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(X.projectionMatrix),G.projectionMatrixInverse.copy(X.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Mc*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(G){l=G,h!==null&&(h.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let $=null;function N(G,X){if(u=X.getViewerPose(c||a),_=X,u!==null){const le=u.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let ne=!1;le.length!==x.cameras.length&&(x.cameras.length=0,ne=!0);for(let Ne=0;Ne<le.length;Ne++){const de=le[Ne];let je=null;if(p!==null)je=p.getViewport(de);else{const mt=f.getViewSubImage(h,de);je=mt.viewport,Ne===0&&(e.setRenderTargetTextures(v,mt.colorTexture,h.ignoreDepthValues?void 0:mt.depthStencilTexture),e.setRenderTarget(v))}let Xe=E[Ne];Xe===void 0&&(Xe=new Tn,Xe.layers.enable(Ne),Xe.viewport=new ht,E[Ne]=Xe),Xe.matrix.fromArray(de.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(de.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(je.x,je.y,je.width,je.height),Ne===0&&(x.matrix.copy(Xe.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ne===!0&&x.cameras.push(Xe)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")){const Ne=f.getDepthInformation(le[0]);Ne&&Ne.isValid&&Ne.texture&&g.init(e,Ne,r.renderState)}}for(let le=0;le<M.length;le++){const ne=y[le],se=M[le];ne!==null&&se!==void 0&&se.update(ne,X,c||a)}$&&$(G,X),X.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:X}),_=null}const ce=new E_;ce.setAnimationLoop(N),this.setAnimationLoop=function(G){$=G},this.dispose=function(){}}}const Ur=new wi,CA=new _t;function RA(t,e){function n(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,y_(t)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,v,M,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(s(m,d),_(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),g(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,v,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,n(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===mn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,n(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===mn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,n(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,n(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const v=e.get(d),M=v.envMap,y=v.envMapRotation;M&&(m.envMap.value=M,Ur.copy(y),Ur.x*=-1,Ur.y*=-1,Ur.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ur.y*=-1,Ur.z*=-1),m.envMapRotation.value.setFromMatrix4(CA.makeRotationFromEuler(Ur)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,v,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*v,m.scale.value=M*.5,d.map&&(m.map.value=d.map,n(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,n(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,n(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,v){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===mn&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){const v=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function PA(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){const y=M.program;i.uniformBlockBinding(v,y)}function c(v,M){let y=r[v.id];y===void 0&&(_(v),y=u(v),r[v.id]=y,v.addEventListener("dispose",m));const C=M.program;i.updateUBOMapping(v,C);const w=e.render.frame;s[v.id]!==w&&(h(v),s[v.id]=w)}function u(v){const M=f();v.__bindingPointIndex=M;const y=t.createBuffer(),C=v.__size,w=v.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,C,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,M,y),y}function f(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const M=r[v.id],y=v.uniforms,C=v.__cache;t.bindBuffer(t.UNIFORM_BUFFER,M);for(let w=0,A=y.length;w<A;w++){const b=Array.isArray(y[w])?y[w]:[y[w]];for(let E=0,x=b.length;E<x;E++){const P=b[E];if(p(P,w,E,C)===!0){const B=P.__offset,H=Array.isArray(P.value)?P.value:[P.value];let Y=0;for(let V=0;V<H.length;V++){const z=H[V],K=g(z);typeof z=="number"||typeof z=="boolean"?(P.__data[0]=z,t.bufferSubData(t.UNIFORM_BUFFER,B+Y,P.__data)):z.isMatrix3?(P.__data[0]=z.elements[0],P.__data[1]=z.elements[1],P.__data[2]=z.elements[2],P.__data[3]=0,P.__data[4]=z.elements[3],P.__data[5]=z.elements[4],P.__data[6]=z.elements[5],P.__data[7]=0,P.__data[8]=z.elements[6],P.__data[9]=z.elements[7],P.__data[10]=z.elements[8],P.__data[11]=0):(z.toArray(P.__data,Y),Y+=K.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,B,P.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(v,M,y,C){const w=v.value,A=M+"_"+y;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const b=C[A];if(typeof w=="number"||typeof w=="boolean"){if(b!==w)return C[A]=w,!0}else if(b.equals(w)===!1)return b.copy(w),!0}return!1}function _(v){const M=v.uniforms;let y=0;const C=16;for(let A=0,b=M.length;A<b;A++){const E=Array.isArray(M[A])?M[A]:[M[A]];for(let x=0,P=E.length;x<P;x++){const B=E[x],H=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,V=H.length;Y<V;Y++){const z=H[Y],K=g(z),D=y%C,Q=D%K.boundary,J=D+Q;y+=Q,J!==0&&C-J<K.storage&&(y+=C-J),B.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=K.storage}}}const w=y%C;return w>0&&(y+=C-w),v.__size=y,v.__cache={},this}function g(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const y=a.indexOf(M.__bindingPointIndex);a.splice(y,1),t.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function d(){for(const v in r)t.deleteBuffer(r[v]);a=[],r={},s={}}return{bind:l,update:c,dispose:d}}class IA{constructor(e={}){const{canvas:n=MS(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const v=[],M=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=On,this.toneMapping=Er,this.toneMappingExposure=1;const y=this;let C=!1,w=0,A=0,b=null,E=-1,x=null;const P=new ht,B=new ht;let H=null;const Y=new Be(0);let V=0,z=n.width,K=n.height,D=1,Q=null,J=null;const $=new ht(0,0,z,K),N=new ht(0,0,z,K);let ce=!1;const G=new Kh;let X=!1,le=!1;const ne=new _t,se=new _t,Ne=new L,de=new ht,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xe=!1;function mt(){return b===null?D:1}let k=i;function Mn(T,O){return n.getContext(T,O)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Hh}`),n.addEventListener("webglcontextlost",ie,!1),n.addEventListener("webglcontextrestored",ve,!1),n.addEventListener("webglcontextcreationerror",me,!1),k===null){const O="webgl2";if(k=Mn(O,T),k===null)throw Mn(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ze,Qe,Ie,dt,Te,R,S,W,te,re,ee,Ae,pe,ye,qe,oe,Ee,Ue,Fe,we,Je,ze,at,U;function he(){Ze=new O1(k),Ze.init(),ze=new xA(k,Ze),Qe=new P1(k,Ze,e,ze),Ie=new _A(k,Ze),Qe.reverseDepthBuffer&&h&&Ie.buffers.depth.setReversed(!0),dt=new B1(k),Te=new iA,R=new yA(k,Ze,Ie,Te,Qe,ze,dt),S=new L1(y),W=new U1(y),te=new XS(k),at=new C1(k,te),re=new F1(k,te,dt,at),ee=new G1(k,re,te,dt),Fe=new z1(k,Qe,R),oe=new I1(Te),Ae=new nA(y,S,W,Ze,Qe,at,oe),pe=new RA(y,Te),ye=new sA,qe=new dA(Ze),Ue=new b1(y,S,W,Ie,ee,p,l),Ee=new gA(y,ee,Qe),U=new PA(k,dt,Qe,Ie),we=new R1(k,Ze,dt),Je=new k1(k,Ze,dt),dt.programs=Ae.programs,y.capabilities=Qe,y.extensions=Ze,y.properties=Te,y.renderLists=ye,y.shadowMap=Ee,y.state=Ie,y.info=dt}he();const Z=new bA(y,k);this.xr=Z,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const T=Ze.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ze.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(T){T!==void 0&&(D=T,this.setSize(z,K,!1))},this.getSize=function(T){return T.set(z,K)},this.setSize=function(T,O,j=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=T,K=O,n.width=Math.floor(T*D),n.height=Math.floor(O*D),j===!0&&(n.style.width=T+"px",n.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(z*D,K*D).floor()},this.setDrawingBufferSize=function(T,O,j){z=T,K=O,D=j,n.width=Math.floor(T*j),n.height=Math.floor(O*j),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy($)},this.setViewport=function(T,O,j,q){T.isVector4?$.set(T.x,T.y,T.z,T.w):$.set(T,O,j,q),Ie.viewport(P.copy($).multiplyScalar(D).round())},this.getScissor=function(T){return T.copy(N)},this.setScissor=function(T,O,j,q){T.isVector4?N.set(T.x,T.y,T.z,T.w):N.set(T,O,j,q),Ie.scissor(B.copy(N).multiplyScalar(D).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(T){Ie.setScissorTest(ce=T)},this.setOpaqueSort=function(T){Q=T},this.setTransparentSort=function(T){J=T},this.getClearColor=function(T){return T.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor.apply(Ue,arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha.apply(Ue,arguments)},this.clear=function(T=!0,O=!0,j=!0){let q=0;if(T){let F=!1;if(b!==null){const ue=b.texture.format;F=ue===qh||ue===$h||ue===Xh}if(F){const ue=b.texture.type,Me=ue===$i||ue===ns||ue===yo||ue===ca||ue===Wh||ue===jh,be=Ue.getClearColor(),Ce=Ue.getClearAlpha(),Ge=be.r,He=be.g,Re=be.b;Me?(_[0]=Ge,_[1]=He,_[2]=Re,_[3]=Ce,k.clearBufferuiv(k.COLOR,0,_)):(g[0]=Ge,g[1]=He,g[2]=Re,g[3]=Ce,k.clearBufferiv(k.COLOR,0,g))}else q|=k.COLOR_BUFFER_BIT}O&&(q|=k.DEPTH_BUFFER_BIT),j&&(q|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ie,!1),n.removeEventListener("webglcontextrestored",ve,!1),n.removeEventListener("webglcontextcreationerror",me,!1),ye.dispose(),qe.dispose(),Te.dispose(),S.dispose(),W.dispose(),ee.dispose(),at.dispose(),U.dispose(),Ae.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Qc),Z.removeEventListener("sessionend",Le),De.stop()};function ie(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ve(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=dt.autoReset,O=Ee.enabled,j=Ee.autoUpdate,q=Ee.needsUpdate,F=Ee.type;he(),dt.autoReset=T,Ee.enabled=O,Ee.autoUpdate=j,Ee.needsUpdate=q,Ee.type=F}function me(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Oe(T){const O=T.target;O.removeEventListener("dispose",Oe),pt(O)}function pt(T){Gt(T),Te.remove(T)}function Gt(T){const O=Te.get(T).programs;O!==void 0&&(O.forEach(function(j){Ae.releaseProgram(j)}),T.isShaderMaterial&&Ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,j,q,F,ue){O===null&&(O=je);const Me=F.isMesh&&F.matrixWorld.determinant()<0,be=tp(T,O,j,q,F);Ie.setMaterial(q,Me);let Ce=j.index,Ge=1;if(q.wireframe===!0){if(Ce=re.getWireframeAttribute(j),Ce===void 0)return;Ge=2}const He=j.drawRange,Re=j.attributes.position;let nt=He.start*Ge,gt=(He.start+He.count)*Ge;ue!==null&&(nt=Math.max(nt,ue.start*Ge),gt=Math.min(gt,(ue.start+ue.count)*Ge)),Ce!==null?(nt=Math.max(nt,0),gt=Math.min(gt,Ce.count)):Re!=null&&(nt=Math.max(nt,0),gt=Math.min(gt,Re.count));const yt=gt-nt;if(yt<0||yt===1/0)return;at.setup(F,q,be,j,Ce);let xn,ot=we;if(Ce!==null&&(xn=te.get(Ce),ot=Je,ot.setIndex(xn)),F.isMesh)q.wireframe===!0?(Ie.setLineWidth(q.wireframeLinewidth*mt()),ot.setMode(k.LINES)):ot.setMode(k.TRIANGLES);else if(F.isLine){let Pe=q.linewidth;Pe===void 0&&(Pe=1),Ie.setLineWidth(Pe*mt()),F.isLineSegments?ot.setMode(k.LINES):F.isLineLoop?ot.setMode(k.LINE_LOOP):ot.setMode(k.LINE_STRIP)}else F.isPoints?ot.setMode(k.POINTS):F.isSprite&&ot.setMode(k.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ot.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ze.get("WEBGL_multi_draw"))ot.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Pe=F._multiDrawStarts,Ai=F._multiDrawCounts,lt=F._multiDrawCount,ei=Ce?te.get(Ce).bytesPerElement:1,ls=Te.get(q).currentProgram.getUniforms();for(let Ln=0;Ln<lt;Ln++)ls.setValue(k,"_gl_DrawID",Ln),ot.render(Pe[Ln]/ei,Ai[Ln])}else if(F.isInstancedMesh)ot.renderInstances(nt,yt,F.count);else if(j.isInstancedBufferGeometry){const Pe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Ai=Math.min(j.instanceCount,Pe);ot.renderInstances(nt,yt,Ai)}else ot.render(nt,yt)};function it(T,O,j){T.transparent===!0&&T.side===cn&&T.forceSinglePass===!1?(T.side=mn,T.needsUpdate=!0,Hn(T,O,j),T.side=Xi,T.needsUpdate=!0,Hn(T,O,j),T.side=cn):Hn(T,O,j)}this.compile=function(T,O,j=null){j===null&&(j=T),d=qe.get(j),d.init(O),M.push(d),j.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),T!==j&&T.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights();const q=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ue=F.material;if(ue)if(Array.isArray(ue))for(let Me=0;Me<ue.length;Me++){const be=ue[Me];it(be,j,F),q.add(be)}else it(ue,j,F),q.add(ue)}),M.pop(),d=null,q},this.compileAsync=function(T,O,j=null){const q=this.compile(T,O,j);return new Promise(F=>{function ue(){if(q.forEach(function(Me){Te.get(Me).currentProgram.isReady()&&q.delete(Me)}),q.size===0){F(T);return}setTimeout(ue,10)}Ze.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let yn=null;function Jn(T){yn&&yn(T)}function Qc(){De.stop()}function Le(){De.start()}const De=new E_;De.setAnimationLoop(Jn),typeof self<"u"&&De.setContext(self),this.setAnimationLoop=function(T){yn=T,Z.setAnimationLoop(T),T===null?De.stop():De.start()},Z.addEventListener("sessionstart",Qc),Z.addEventListener("sessionend",Le),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(O),O=Z.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,O,b),d=qe.get(T,M.length),d.init(O),M.push(d),se.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),G.setFromProjectionMatrix(se),le=this.localClippingEnabled,X=oe.init(this.clippingPlanes,le),m=ye.get(T,v.length),m.init(),v.push(m),Z.enabled===!0&&Z.isPresenting===!0){const ue=y.xr.getDepthSensingMesh();ue!==null&&ke(ue,O,-1/0,y.sortObjects)}ke(T,O,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(Q,J),Xe=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Xe&&Ue.addToRenderList(m,T),this.info.render.frame++,X===!0&&oe.beginShadows();const j=d.state.shadowsArray;Ee.render(j,T,O),X===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=m.opaque,F=m.transmissive;if(d.setupLights(),O.isArrayCamera){const ue=O.cameras;if(F.length>0)for(let Me=0,be=ue.length;Me<be;Me++){const Ce=ue[Me];Ht(q,F,T,Ce)}Xe&&Ue.render(T);for(let Me=0,be=ue.length;Me<be;Me++){const Ce=ue[Me];rt(m,T,Ce,Ce.viewport)}}else F.length>0&&Ht(q,F,T,O),Xe&&Ue.render(T),rt(m,T,O);b!==null&&(R.updateMultisampleRenderTarget(b),R.updateRenderTargetMipmap(b)),T.isScene===!0&&T.onAfterRender(y,T,O),at.resetDefaultState(),E=-1,x=null,M.pop(),M.length>0?(d=M[M.length-1],X===!0&&oe.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function ke(T,O,j,q){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||G.intersectsSprite(T)){q&&de.setFromMatrixPosition(T.matrixWorld).applyMatrix4(se);const Me=ee.update(T),be=T.material;be.visible&&m.push(T,Me,be,j,de.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||G.intersectsObject(T))){const Me=ee.update(T),be=T.material;if(q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),de.copy(T.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),de.copy(Me.boundingSphere.center)),de.applyMatrix4(T.matrixWorld).applyMatrix4(se)),Array.isArray(be)){const Ce=Me.groups;for(let Ge=0,He=Ce.length;Ge<He;Ge++){const Re=Ce[Ge],nt=be[Re.materialIndex];nt&&nt.visible&&m.push(T,Me,nt,j,de.z,Re)}}else be.visible&&m.push(T,Me,be,j,de.z,null)}}const ue=T.children;for(let Me=0,be=ue.length;Me<be;Me++)ke(ue[Me],O,j,q)}function rt(T,O,j,q){const F=T.opaque,ue=T.transmissive,Me=T.transparent;d.setupLightsView(j),X===!0&&oe.setGlobalState(y.clippingPlanes,j),q&&Ie.viewport(P.copy(q)),F.length>0&&Zt(F,O,j),ue.length>0&&Zt(ue,O,j),Me.length>0&&Zt(Me,O,j),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Ht(T,O,j,q){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[q.id]===void 0&&(d.state.transmissionRenderTarget[q.id]=new is(1,1,{generateMipmaps:!0,type:Ze.has("EXT_color_buffer_half_float")||Ze.has("EXT_color_buffer_float")?Po:$i,minFilter:$r,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const ue=d.state.transmissionRenderTarget[q.id],Me=q.viewport||P;ue.setSize(Me.z,Me.w);const be=y.getRenderTarget();y.setRenderTarget(ue),y.getClearColor(Y),V=y.getClearAlpha(),V<1&&y.setClearColor(16777215,.5),y.clear(),Xe&&Ue.render(j);const Ce=y.toneMapping;y.toneMapping=Er;const Ge=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),d.setupLightsView(q),X===!0&&oe.setGlobalState(y.clippingPlanes,q),Zt(T,j,q),R.updateMultisampleRenderTarget(ue),R.updateRenderTargetMipmap(ue),Ze.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Re=0,nt=O.length;Re<nt;Re++){const gt=O[Re],yt=gt.object,xn=gt.geometry,ot=gt.material,Pe=gt.group;if(ot.side===cn&&yt.layers.test(q.layers)){const Ai=ot.side;ot.side=mn,ot.needsUpdate=!0,In(yt,j,q,xn,ot,Pe),ot.side=Ai,ot.needsUpdate=!0,He=!0}}He===!0&&(R.updateMultisampleRenderTarget(ue),R.updateRenderTargetMipmap(ue))}y.setRenderTarget(be),y.setClearColor(Y,V),Ge!==void 0&&(q.viewport=Ge),y.toneMapping=Ce}function Zt(T,O,j){const q=O.isScene===!0?O.overrideMaterial:null;for(let F=0,ue=T.length;F<ue;F++){const Me=T[F],be=Me.object,Ce=Me.geometry,Ge=q===null?Me.material:q,He=Me.group;be.layers.test(j.layers)&&In(be,O,j,Ce,Ge,He)}}function In(T,O,j,q,F,ue){T.onBeforeRender(y,O,j,q,F,ue),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(y,O,j,q,T,ue),F.transparent===!0&&F.side===cn&&F.forceSinglePass===!1?(F.side=mn,F.needsUpdate=!0,y.renderBufferDirect(j,O,q,F,T,ue),F.side=Xi,F.needsUpdate=!0,y.renderBufferDirect(j,O,q,F,T,ue),F.side=cn):y.renderBufferDirect(j,O,q,F,T,ue),T.onAfterRender(y,O,j,q,F,ue)}function Hn(T,O,j){O.isScene!==!0&&(O=je);const q=Te.get(T),F=d.state.lights,ue=d.state.shadowsArray,Me=F.state.version,be=Ae.getParameters(T,F.state,ue,O,j),Ce=Ae.getProgramCacheKey(be);let Ge=q.programs;q.environment=T.isMeshStandardMaterial?O.environment:null,q.fog=O.fog,q.envMap=(T.isMeshStandardMaterial?W:S).get(T.envMap||q.environment),q.envMapRotation=q.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Ge===void 0&&(T.addEventListener("dispose",Oe),Ge=new Map,q.programs=Ge);let He=Ge.get(Ce);if(He!==void 0){if(q.currentProgram===He&&q.lightsStateVersion===Me)return Oo(T,be),He}else be.uniforms=Ae.getUniforms(T),T.onBeforeCompile(be,y),He=Ae.acquireProgram(be,Ce),Ge.set(Ce,He),q.uniforms=be.uniforms;const Re=q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Re.clippingPlanes=oe.uniform),Oo(T,be),q.needsLights=Jc(T),q.lightsStateVersion=Me,q.needsLights&&(Re.ambientLightColor.value=F.state.ambient,Re.lightProbe.value=F.state.probe,Re.directionalLights.value=F.state.directional,Re.directionalLightShadows.value=F.state.directionalShadow,Re.spotLights.value=F.state.spot,Re.spotLightShadows.value=F.state.spotShadow,Re.rectAreaLights.value=F.state.rectArea,Re.ltc_1.value=F.state.rectAreaLTC1,Re.ltc_2.value=F.state.rectAreaLTC2,Re.pointLights.value=F.state.point,Re.pointLightShadows.value=F.state.pointShadow,Re.hemisphereLights.value=F.state.hemi,Re.directionalShadowMap.value=F.state.directionalShadowMap,Re.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Re.spotShadowMap.value=F.state.spotShadowMap,Re.spotLightMatrix.value=F.state.spotLightMatrix,Re.spotLightMap.value=F.state.spotLightMap,Re.pointShadowMap.value=F.state.pointShadowMap,Re.pointShadowMatrix.value=F.state.pointShadowMatrix),q.currentProgram=He,q.uniformsList=null,He}function Uo(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=jl.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function Oo(T,O){const j=Te.get(T);j.outputColorSpace=O.outputColorSpace,j.batching=O.batching,j.batchingColor=O.batchingColor,j.instancing=O.instancing,j.instancingColor=O.instancingColor,j.instancingMorph=O.instancingMorph,j.skinning=O.skinning,j.morphTargets=O.morphTargets,j.morphNormals=O.morphNormals,j.morphColors=O.morphColors,j.morphTargetsCount=O.morphTargetsCount,j.numClippingPlanes=O.numClippingPlanes,j.numIntersection=O.numClipIntersection,j.vertexAlphas=O.vertexAlphas,j.vertexTangents=O.vertexTangents,j.toneMapping=O.toneMapping}function tp(T,O,j,q,F){O.isScene!==!0&&(O=je),R.resetTextureUnits();const ue=O.fog,Me=q.isMeshStandardMaterial?O.environment:null,be=b===null?y.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:va,Ce=(q.isMeshStandardMaterial?W:S).get(q.envMap||Me),Ge=q.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,He=!!j.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Re=!!j.morphAttributes.position,nt=!!j.morphAttributes.normal,gt=!!j.morphAttributes.color;let yt=Er;q.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(yt=y.toneMapping);const xn=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ot=xn!==void 0?xn.length:0,Pe=Te.get(q),Ai=d.state.lights;if(X===!0&&(le===!0||T!==x)){const Vn=T===x&&q.id===E;oe.setState(q,T,Vn)}let lt=!1;q.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==Ai.state.version||Pe.outputColorSpace!==be||F.isBatchedMesh&&Pe.batching===!1||!F.isBatchedMesh&&Pe.batching===!0||F.isBatchedMesh&&Pe.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pe.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pe.instancing===!1||!F.isInstancedMesh&&Pe.instancing===!0||F.isSkinnedMesh&&Pe.skinning===!1||!F.isSkinnedMesh&&Pe.skinning===!0||F.isInstancedMesh&&Pe.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pe.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pe.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pe.instancingMorph===!1&&F.morphTexture!==null||Pe.envMap!==Ce||q.fog===!0&&Pe.fog!==ue||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==oe.numPlanes||Pe.numIntersection!==oe.numIntersection)||Pe.vertexAlphas!==Ge||Pe.vertexTangents!==He||Pe.morphTargets!==Re||Pe.morphNormals!==nt||Pe.morphColors!==gt||Pe.toneMapping!==yt||Pe.morphTargetsCount!==ot)&&(lt=!0):(lt=!0,Pe.__version=q.version);let ei=Pe.currentProgram;lt===!0&&(ei=Hn(q,O,F));let ls=!1,Ln=!1,ya=!1;const xt=ei.getUniforms(),mi=Pe.uniforms;if(Ie.useProgram(ei.program)&&(ls=!0,Ln=!0,ya=!0),q.id!==E&&(E=q.id,Ln=!0),ls||x!==T){Ie.buffers.depth.getReversed()?(ne.copy(T.projectionMatrix),xS(ne),SS(ne),xt.setValue(k,"projectionMatrix",ne)):xt.setValue(k,"projectionMatrix",T.projectionMatrix),xt.setValue(k,"viewMatrix",T.matrixWorldInverse);const Ki=xt.map.cameraPosition;Ki!==void 0&&Ki.setValue(k,Ne.setFromMatrixPosition(T.matrixWorld)),Qe.logarithmicDepthBuffer&&xt.setValue(k,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&xt.setValue(k,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,Ln=!0,ya=!0)}if(F.isSkinnedMesh){xt.setOptional(k,F,"bindMatrix"),xt.setOptional(k,F,"bindMatrixInverse");const Vn=F.skeleton;Vn&&(Vn.boneTexture===null&&Vn.computeBoneTexture(),xt.setValue(k,"boneTexture",Vn.boneTexture,R))}F.isBatchedMesh&&(xt.setOptional(k,F,"batchingTexture"),xt.setValue(k,"batchingTexture",F._matricesTexture,R),xt.setOptional(k,F,"batchingIdTexture"),xt.setValue(k,"batchingIdTexture",F._indirectTexture,R),xt.setOptional(k,F,"batchingColorTexture"),F._colorsTexture!==null&&xt.setValue(k,"batchingColorTexture",F._colorsTexture,R));const xa=j.morphAttributes;if((xa.position!==void 0||xa.normal!==void 0||xa.color!==void 0)&&Fe.update(F,j,ei),(Ln||Pe.receiveShadow!==F.receiveShadow)&&(Pe.receiveShadow=F.receiveShadow,xt.setValue(k,"receiveShadow",F.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(mi.envMap.value=Ce,mi.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&O.environment!==null&&(mi.envMapIntensity.value=O.environmentIntensity),Ln&&(xt.setValue(k,"toneMappingExposure",y.toneMappingExposure),Pe.needsLights&&Fo(mi,ya),ue&&q.fog===!0&&pe.refreshFogUniforms(mi,ue),pe.refreshMaterialUniforms(mi,q,D,K,d.state.transmissionRenderTarget[T.id]),jl.upload(k,Uo(Pe),mi,R)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(jl.upload(k,Uo(Pe),mi,R),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&xt.setValue(k,"center",F.center),xt.setValue(k,"modelViewMatrix",F.modelViewMatrix),xt.setValue(k,"normalMatrix",F.normalMatrix),xt.setValue(k,"modelMatrix",F.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){const Vn=q.uniformsGroups;for(let Ki=0,Zi=Vn.length;Ki<Zi;Ki++){const np=Vn[Ki];U.update(np,ei),U.bind(np,ei)}}return ei}function Fo(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Jc(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(T,O,j){Te.get(T.texture).__webglTexture=O,Te.get(T.depthTexture).__webglTexture=j;const q=Te.get(T);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=j===void 0,q.__autoAllocateDepthBuffer||Ze.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){const j=Te.get(T);j.__webglFramebuffer=O,j.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,j=0){b=T,w=O,A=j;let q=!0,F=null,ue=!1,Me=!1;if(T){const Ce=Te.get(T);if(Ce.__useDefaultFramebuffer!==void 0)Ie.bindFramebuffer(k.FRAMEBUFFER,null),q=!1;else if(Ce.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(Ce.__hasExternalTextures)R.rebindTextures(T,Te.get(T.texture).__webglTexture,Te.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Re=T.depthTexture;if(Ce.__boundDepthTexture!==Re){if(Re!==null&&Te.has(Re)&&(T.width!==Re.image.width||T.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}const Ge=T.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Me=!0);const He=Te.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(He[O])?F=He[O][j]:F=He[O],ue=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?F=Te.get(T).__webglMultisampledFramebuffer:Array.isArray(He)?F=He[j]:F=He,P.copy(T.viewport),B.copy(T.scissor),H=T.scissorTest}else P.copy($).multiplyScalar(D).floor(),B.copy(N).multiplyScalar(D).floor(),H=ce;if(Ie.bindFramebuffer(k.FRAMEBUFFER,F)&&q&&Ie.drawBuffers(T,F),Ie.viewport(P),Ie.scissor(B),Ie.setScissorTest(H),ue){const Ce=Te.get(T.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ce.__webglTexture,j)}else if(Me){const Ce=Te.get(T.texture),Ge=O||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ce.__webglTexture,j||0,Ge)}E=-1},this.readRenderTargetPixels=function(T,O,j,q,F,ue,Me){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me]),be){Ie.bindFramebuffer(k.FRAMEBUFFER,be);try{const Ce=T.texture,Ge=Ce.format,He=Ce.type;if(!Qe.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Qe.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-q&&j>=0&&j<=T.height-F&&k.readPixels(O,j,q,F,ze.convert(Ge),ze.convert(He),ue)}finally{const Ce=b!==null?Te.get(b).__webglFramebuffer:null;Ie.bindFramebuffer(k.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(T,O,j,q,F,ue,Me){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Te.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Me!==void 0&&(be=be[Me]),be){const Ce=T.texture,Ge=Ce.format,He=Ce.type;if(!Qe.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Qe.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-q&&j>=0&&j<=T.height-F){Ie.bindFramebuffer(k.FRAMEBUFFER,be);const Re=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Re),k.bufferData(k.PIXEL_PACK_BUFFER,ue.byteLength,k.STREAM_READ),k.readPixels(O,j,q,F,ze.convert(Ge),ze.convert(He),0);const nt=b!==null?Te.get(b).__webglFramebuffer:null;Ie.bindFramebuffer(k.FRAMEBUFFER,nt);const gt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await yS(k,gt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Re),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ue),k.deleteBuffer(Re),k.deleteSync(gt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,j=0){T.isTexture!==!0&&(Wa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);const q=Math.pow(2,-j),F=Math.floor(T.image.width*q),ue=Math.floor(T.image.height*q),Me=O!==null?O.x:0,be=O!==null?O.y:0;R.setTexture2D(T,0),k.copyTexSubImage2D(k.TEXTURE_2D,j,0,0,Me,be,F,ue),Ie.unbindTexture()},this.copyTextureToTexture=function(T,O,j=null,q=null,F=0){T.isTexture!==!0&&(Wa("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,T=arguments[1],O=arguments[2],F=arguments[3]||0,j=null);let ue,Me,be,Ce,Ge,He,Re,nt,gt;const yt=T.isCompressedTexture?T.mipmaps[F]:T.image;j!==null?(ue=j.max.x-j.min.x,Me=j.max.y-j.min.y,be=j.isBox3?j.max.z-j.min.z:1,Ce=j.min.x,Ge=j.min.y,He=j.isBox3?j.min.z:0):(ue=yt.width,Me=yt.height,be=yt.depth||1,Ce=0,Ge=0,He=0),q!==null?(Re=q.x,nt=q.y,gt=q.z):(Re=0,nt=0,gt=0);const xn=ze.convert(O.format),ot=ze.convert(O.type);let Pe;O.isData3DTexture?(R.setTexture3D(O,0),Pe=k.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),Pe=k.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),Pe=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,O.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,O.unpackAlignment);const Ai=k.getParameter(k.UNPACK_ROW_LENGTH),lt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),ei=k.getParameter(k.UNPACK_SKIP_PIXELS),ls=k.getParameter(k.UNPACK_SKIP_ROWS),Ln=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,yt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,yt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Ce),k.pixelStorei(k.UNPACK_SKIP_ROWS,Ge),k.pixelStorei(k.UNPACK_SKIP_IMAGES,He);const ya=T.isDataArrayTexture||T.isData3DTexture,xt=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const mi=Te.get(T),xa=Te.get(O),Vn=Te.get(mi.__renderTarget),Ki=Te.get(xa.__renderTarget);Ie.bindFramebuffer(k.READ_FRAMEBUFFER,Vn.__webglFramebuffer),Ie.bindFramebuffer(k.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let Zi=0;Zi<be;Zi++)ya&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Te.get(T).__webglTexture,F,He+Zi),T.isDepthTexture?(xt&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Te.get(O).__webglTexture,F,gt+Zi),k.blitFramebuffer(Ce,Ge,ue,Me,Re,nt,ue,Me,k.DEPTH_BUFFER_BIT,k.NEAREST)):xt?k.copyTexSubImage3D(Pe,F,Re,nt,gt+Zi,Ce,Ge,ue,Me):k.copyTexSubImage2D(Pe,F,Re,nt,gt+Zi,Ce,Ge,ue,Me);Ie.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ie.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else xt?T.isDataTexture||T.isData3DTexture?k.texSubImage3D(Pe,F,Re,nt,gt,ue,Me,be,xn,ot,yt.data):O.isCompressedArrayTexture?k.compressedTexSubImage3D(Pe,F,Re,nt,gt,ue,Me,be,xn,yt.data):k.texSubImage3D(Pe,F,Re,nt,gt,ue,Me,be,xn,ot,yt):T.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,F,Re,nt,ue,Me,xn,ot,yt.data):T.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,F,Re,nt,yt.width,yt.height,xn,yt.data):k.texSubImage2D(k.TEXTURE_2D,F,Re,nt,ue,Me,xn,ot,yt);k.pixelStorei(k.UNPACK_ROW_LENGTH,Ai),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,lt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,ei),k.pixelStorei(k.UNPACK_SKIP_ROWS,ls),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Ln),F===0&&O.generateMipmaps&&k.generateMipmap(Pe),Ie.unbindTexture()},this.copyTextureToTexture3D=function(T,O,j=null,q=null,F=0){return T.isTexture!==!0&&(Wa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,q=arguments[1]||null,T=arguments[2],O=arguments[3],F=arguments[4]||0),Wa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,j,q,F)},this.initRenderTarget=function(T){Te.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),Ie.unbindTexture()},this.resetState=function(){w=0,A=0,b=null,Ie.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=et._getDrawingBufferColorSpace(e),n.unpackColorSpace=et._getUnpackColorSpace()}}class LA extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class xo extends os{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xc=new L,Sc=new L,_g=new _t,Ua=new Xc,El=new No,rd=new L,Mg=new L;class Ec extends zt{constructor(e=new jt,n=new xo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)xc.fromBufferAttribute(n,r-1),Sc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=xc.distanceTo(Sc);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),El.copy(i.boundingSphere),El.applyMatrix4(r),El.radius+=s,e.ray.intersectsSphere(El)===!1)return;_g.copy(r).invert(),Ua.copy(e.ray).applyMatrix4(_g);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let g=p,m=_-1;g<m;g+=c){const d=u.getX(g),v=u.getX(g+1),M=wl(this,e,Ua,l,d,v);M&&n.push(M)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(p),d=wl(this,e,Ua,l,g,m);d&&n.push(d)}}else{const p=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let g=p,m=_-1;g<m;g+=c){const d=wl(this,e,Ua,l,g,g+1);d&&n.push(d)}if(this.isLineLoop){const g=wl(this,e,Ua,l,_-1,p);g&&n.push(g)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function wl(t,e,n,i,r,s){const a=t.geometry.attributes.position;if(xc.fromBufferAttribute(a,r),Sc.fromBufferAttribute(a,s),n.distanceSqToSegment(xc,Sc,rd,Mg)>i)return;rd.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(rd);if(!(l<e.near||l>e.far))return{distance:l,point:Mg.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const yg=new L,xg=new L;class DA extends Ec{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)yg.fromBufferAttribute(n,r),xg.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+yg.distanceTo(xg);e.setAttribute("lineDistance",new Mt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class P_ extends os{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Sg=new _t,Vf=new Xc,Tl=new No,Al=new L;class NA extends zt{constructor(e=new jt,n=new P_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Tl.copy(i.boundingSphere),Tl.applyMatrix4(r),Tl.radius+=s,e.ray.intersectsSphere(Tl)===!1)return;Sg.copy(r).invert(),Vf.copy(e.ray).applyMatrix4(Sg);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=h,g=p;_<g;_++){const m=c.getX(_);Al.fromBufferAttribute(f,m),Eg(Al,m,l,r,e,n,this)}}else{const h=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let _=h,g=p;_<g;_++)Al.fromBufferAttribute(f,_),Eg(Al,_,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Eg(t,e,n,i,r,s,a){const o=Vf.distanceSqToPoint(t);if(o<n){const l=new L;Vf.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class UA extends gn{constructor(e,n,i,r,s,a,o,l,c){super(e,n,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Et extends jt{constructor(e=1,n=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],p=[];let _=0;const g=[],m=i/2;let d=0;v(),a===!1&&(e>0&&M(!0),n>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new Mt(f,3)),this.setAttribute("normal",new Mt(h,3)),this.setAttribute("uv",new Mt(p,2));function v(){const y=new L,C=new L;let w=0;const A=(n-e)/i;for(let b=0;b<=s;b++){const E=[],x=b/s,P=x*(n-e)+e;for(let B=0;B<=r;B++){const H=B/r,Y=H*l+o,V=Math.sin(Y),z=Math.cos(Y);C.x=P*V,C.y=-x*i+m,C.z=P*z,f.push(C.x,C.y,C.z),y.set(V,A,z).normalize(),h.push(y.x,y.y,y.z),p.push(H,1-x),E.push(_++)}g.push(E)}for(let b=0;b<r;b++)for(let E=0;E<s;E++){const x=g[E][b],P=g[E+1][b],B=g[E+1][b+1],H=g[E][b+1];(e>0||E!==0)&&(u.push(x,P,H),w+=3),(n>0||E!==s-1)&&(u.push(P,B,H),w+=3)}c.addGroup(d,w,0),d+=w}function M(y){const C=_,w=new Ye,A=new L;let b=0;const E=y===!0?e:n,x=y===!0?1:-1;for(let B=1;B<=r;B++)f.push(0,m*x,0),h.push(0,x,0),p.push(.5,.5),_++;const P=_;for(let B=0;B<=r;B++){const Y=B/r*l+o,V=Math.cos(Y),z=Math.sin(Y);A.x=E*z,A.y=m*x,A.z=E*V,f.push(A.x,A.y,A.z),h.push(0,x,0),w.x=V*.5+.5,w.y=z*.5*x+.5,p.push(w.x,w.y),_++}for(let B=0;B<r;B++){const H=C+B,Y=P+B;y===!0?u.push(Y,Y+1,H):u.push(Y+1,Y,H),b+=3}c.addGroup(d,b,y===!0?1:2),d+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Et(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class qn extends Et{constructor(e=1,n=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,n,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new qn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qh extends jt{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],a=[];o(r),c(i),u(),this.setAttribute("position",new Mt(s,3)),this.setAttribute("normal",new Mt(s.slice(),3)),this.setAttribute("uv",new Mt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new L,y=new L,C=new L;for(let w=0;w<n.length;w+=3)p(n[w+0],M),p(n[w+1],y),p(n[w+2],C),l(M,y,C,v)}function l(v,M,y,C){const w=C+1,A=[];for(let b=0;b<=w;b++){A[b]=[];const E=v.clone().lerp(y,b/w),x=M.clone().lerp(y,b/w),P=w-b;for(let B=0;B<=P;B++)B===0&&b===w?A[b][B]=E:A[b][B]=E.clone().lerp(x,B/P)}for(let b=0;b<w;b++)for(let E=0;E<2*(w-b)-1;E++){const x=Math.floor(E/2);E%2===0?(h(A[b][x+1]),h(A[b+1][x]),h(A[b][x])):(h(A[b][x+1]),h(A[b+1][x+1]),h(A[b+1][x]))}}function c(v){const M=new L;for(let y=0;y<s.length;y+=3)M.x=s[y+0],M.y=s[y+1],M.z=s[y+2],M.normalize().multiplyScalar(v),s[y+0]=M.x,s[y+1]=M.y,s[y+2]=M.z}function u(){const v=new L;for(let M=0;M<s.length;M+=3){v.x=s[M+0],v.y=s[M+1],v.z=s[M+2];const y=m(v)/2/Math.PI+.5,C=d(v)/Math.PI+.5;a.push(y,1-C)}_(),f()}function f(){for(let v=0;v<a.length;v+=6){const M=a[v+0],y=a[v+2],C=a[v+4],w=Math.max(M,y,C),A=Math.min(M,y,C);w>.9&&A<.1&&(M<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),C<.2&&(a[v+4]+=1))}}function h(v){s.push(v.x,v.y,v.z)}function p(v,M){const y=v*3;M.x=e[y+0],M.y=e[y+1],M.z=e[y+2]}function _(){const v=new L,M=new L,y=new L,C=new L,w=new Ye,A=new Ye,b=new Ye;for(let E=0,x=0;E<s.length;E+=9,x+=6){v.set(s[E+0],s[E+1],s[E+2]),M.set(s[E+3],s[E+4],s[E+5]),y.set(s[E+6],s[E+7],s[E+8]),w.set(a[x+0],a[x+1]),A.set(a[x+2],a[x+3]),b.set(a[x+4],a[x+5]),C.copy(v).add(M).add(y).divideScalar(3);const P=m(C);g(w,x+0,v,P),g(A,x+2,M,P),g(b,x+4,y,P)}}function g(v,M,y,C){C<0&&v.x===1&&(a[M]=v.x-1),y.x===0&&y.z===0&&(a[M]=C/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function d(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qh(e.vertices,e.indices,e.radius,e.details)}}class Yc extends Qh{constructor(e=1,n=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,n),this.type="OctahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new Yc(e.radius,e.detail)}}class So extends jt{constructor(e=.5,n=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],u=[];let f=e;const h=(n-e)/r,p=new L,_=new Ye;for(let g=0;g<=r;g++){for(let m=0;m<=i;m++){const d=s+m/i*a;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/n+1)/2,_.y=(p.y/n+1)/2,u.push(_.x,_.y)}f+=h}for(let g=0;g<r;g++){const m=g*(i+1);for(let d=0;d<i;d++){const v=d+m,M=v,y=v+i+1,C=v+i+2,w=v+1;o.push(M,y,w),o.push(y,C,w)}}this.setIndex(o),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new So(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class hi extends jt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new L,h=new L,p=[],_=[],g=[],m=[];for(let d=0;d<=i;d++){const v=[],M=d/i;let y=0;d===0&&a===0?y=.5/n:d===i&&l===Math.PI&&(y=-.5/n);for(let C=0;C<=n;C++){const w=C/n;f.x=-e*Math.cos(r+w*s)*Math.sin(a+M*o),f.y=e*Math.cos(a+M*o),f.z=e*Math.sin(r+w*s)*Math.sin(a+M*o),_.push(f.x,f.y,f.z),h.copy(f).normalize(),g.push(h.x,h.y,h.z),m.push(w+y,1-M),v.push(c++)}u.push(v)}for(let d=0;d<i;d++)for(let v=0;v<n;v++){const M=u[d][v+1],y=u[d][v],C=u[d+1][v],w=u[d+1][v+1];(d!==0||a>0)&&p.push(M,y,w),(d!==i-1||l<Math.PI)&&p.push(y,C,w)}this.setIndex(p),this.setAttribute("position",new Mt(_,3)),this.setAttribute("normal",new Mt(g,3)),this.setAttribute("uv",new Mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Eo extends jt{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const a=[],o=[],l=[],c=[],u=new L,f=new L,h=new L;for(let p=0;p<=i;p++)for(let _=0;_<=r;_++){const g=_/r*s,m=p/i*Math.PI*2;f.x=(e+n*Math.cos(m))*Math.cos(g),f.y=(e+n*Math.cos(m))*Math.sin(g),f.z=n*Math.sin(m),o.push(f.x,f.y,f.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(_/r),c.push(p/i)}for(let p=1;p<=i;p++)for(let _=1;_<=r;_++){const g=(r+1)*p+_-1,m=(r+1)*(p-1)+_-1,d=(r+1)*(p-1)+_,v=(r+1)*p+_;a.push(g,m,v),a.push(m,d,v)}this.setIndex(a),this.setAttribute("position",new Mt(o,3)),this.setAttribute("normal",new Mt(l,3)),this.setAttribute("uv",new Mt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Eo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Nt extends os{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=f_,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Kc extends zt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const sd=new _t,wg=new L,Tg=new L;class Jh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kh,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;wg.setFromMatrixPosition(e.matrixWorld),n.position.copy(wg),Tg.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Tg),n.updateMatrixWorld(),sd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sd),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class OA extends Jh{constructor(){super(new Tn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const n=this.camera,i=Mc*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,s=e.distance||n.far;(i!==n.fov||r!==n.aspect||s!==n.far)&&(n.fov=i,n.aspect=r,n.far=s,n.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class FA extends Kc{constructor(e,n,i=0,r=Math.PI/3,s=0,a=2){super(e,n),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.distance=i,this.angle=r,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new OA}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ag=new _t,Oa=new L,ad=new L;class kA extends Jh{constructor(){super(new Tn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ye(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Oa.setFromMatrixPosition(e.matrixWorld),i.position.copy(Oa),ad.copy(i.position),ad.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(ad),i.updateMatrixWorld(),r.makeTranslation(-Oa.x,-Oa.y,-Oa.z),Ag.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ag)}}class BA extends Kc{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new kA}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class zA extends Jh{constructor(){super(new w_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rs extends Kc{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(zt.DEFAULT_UP),this.updateMatrix(),this.target=new zt,this.shadow=new zA}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Zc extends Kc{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const bg=new _t;class GA{constructor(e,n,i=0,r=1/0){this.ray=new Xc(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Yh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):console.error("THREE.Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return bg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bg),this}intersectObject(e,n=!0,i=[]){return Wf(e,this,i,n),i.sort(Cg),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Wf(e[r],this,i,n);return i.sort(Cg),i}}function Cg(t,e){return t.distance-e.distance}function Wf(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let a=0,o=s.length;a<o;a++)Wf(s[a],e,n,!0)}}class HA extends DA{constructor(e=10,n=10,i=4473924,r=8947848){i=new Be(i),r=new Be(r);const s=n/2,a=e/n,o=e/2,l=[],c=[];for(let h=0,p=0,_=-o;h<=n;h++,_+=a){l.push(-o,0,_,o,0,_),l.push(_,0,-o,_,0,o);const g=h===s?i:r;g.toArray(c,p),p+=3,g.toArray(c,p),p+=3,g.toArray(c,p),p+=3,g.toArray(c,p),p+=3}const u=new jt;u.setAttribute("position",new Mt(l,3)),u.setAttribute("color",new Mt(c,3));const f=new xo({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hh);function wr(t){t.traverse(e=>{var r,s,a;const n=e;n.geometry&&n.geometry.dispose();const i=n.material;if(i){const o=Array.isArray(i)?i:[i];for(const l of o){const c=l;(r=c.map)==null||r.dispose(),(s=c.emissiveMap)==null||s.dispose(),(a=c.bumpMap)==null||a.dispose(),l.dispose()}}})}function ep(t=1600,e=3200){const n=new Float32Array(t*3),i=new Float32Array(t*3),r=[new Be("#ffffff"),new Be("#cbe4ff"),new Be("#ffe5b4"),new Be("#9ecbff"),new Be("#ffd3a6")];let s=421337;const a=()=>(s=s*1664525+1013904223>>>0,s/4294967296);for(let u=0;u<t;u++){const f=a(),h=a(),p=2*Math.PI*f,_=Math.acos(2*h-1),g=e*(.75+a()*.35);n[u*3]=g*Math.sin(_)*Math.cos(p),n[u*3+1]=g*Math.cos(_),n[u*3+2]=g*Math.sin(_)*Math.sin(p);const m=r[Math.floor(a()*r.length)],d=.5+a()*.5;i[u*3]=m.r*d,i[u*3+1]=m.g*d,i[u*3+2]=m.b*d}const o=new jt;o.setAttribute("position",new Pn(n,3)),o.setAttribute("color",new Pn(i,3));const l=new P_({size:2.2,sizeAttenuation:!0,vertexColors:!0,transparent:!0,opacity:.92,depthWrite:!1}),c=new NA(o,l);return c.name="starfield",c}function VA(t){const i=document.createElement("canvas");i.width=512,i.height=256;const r=i.getContext("2d");let s=t==="EARTH"?101:t==="MOON"?202:303;const a=()=>(s=s*1664525+1013904223>>>0,s/4294967296);if(t==="EARTH"){const l=r.createLinearGradient(0,0,0,256);l.addColorStop(0,"#0a3366"),l.addColorStop(.5,"#0c4b8c"),l.addColorStop(1,"#092e5e"),r.fillStyle=l,r.fillRect(0,0,512,256);for(let c=0;c<42;c++){const u=a()*512,f=28+a()*200,h=18+a()*44,p=12+a()*28;r.fillStyle=a()>.35?"#267847":"#80774a",r.beginPath(),r.ellipse(u,f,h,p,a()*Math.PI,0,Math.PI*2),r.fill()}r.fillStyle="#e8f5ff",r.fillRect(0,0,512,14),r.fillRect(0,242,512,14),r.fillStyle="rgba(255, 255, 255, 0.24)";for(let c=0;c<60;c++){const u=a()*512,f=a()*256,h=16+a()*54,p=3+a()*7;r.beginPath(),r.ellipse(u,f,h,p,(a()-.5)*.4,0,Math.PI*2),r.fill()}}else if(t==="MOON"){r.fillStyle="#7e838b",r.fillRect(0,0,512,256);for(let l=0;l<18;l++)r.fillStyle="rgba(65, 70, 78, 0.45)",r.beginPath(),r.ellipse(a()*512,a()*256,24+a()*46,18+a()*34,a()*Math.PI,0,Math.PI*2),r.fill();for(let l=0;l<95;l++){const c=a()*512,u=a()*256,f=2+a()*14;r.fillStyle="rgba(55, 58, 66, 0.55)",r.beginPath(),r.arc(c,u,f,0,Math.PI*2),r.fill(),r.strokeStyle="rgba(210, 215, 224, 0.45)",r.lineWidth=1.1,r.beginPath(),r.arc(c-.6,u-.6,f,0,Math.PI*2),r.stroke()}}else{const l=r.createLinearGradient(0,0,0,256);l.addColorStop(0,"#9d4a2c"),l.addColorStop(.5,"#ba5531"),l.addColorStop(1,"#8c3d22"),r.fillStyle=l,r.fillRect(0,0,512,256);for(let c=0;c<36;c++)r.fillStyle=a()>.4?"rgba(104, 38, 22, 0.45)":"rgba(214, 118, 70, 0.35)",r.beginPath(),r.ellipse(a()*512,20+a()*216,16+a()*48,6+a()*20,(a()-.5)*.8,0,Math.PI*2),r.fill();r.fillStyle="#f2e8e4",r.fillRect(0,0,512,10),r.fillRect(0,246,512,10)}const o=new UA(i);return o.colorSpace=On,o.wrapS=vc,o.needsUpdate=!0,o}function Kr(t,e){const n=new st;n.name=`planet-${t.toLowerCase()}`;const i=VA(t),r=40,s=new hi(e,r,r),a=new Nt({map:i,roughness:t==="EARTH"?.65:.9,metalness:.05}),o=new _e(s,a);if(o.name=`${t.toLowerCase()}-surface`,n.add(o),t==="EARTH"||t==="MARS"){const l=new hi(e*1.045,r,r),c=t==="EARTH"?new Be("#3ca8ff"):new Be("#ff8c5a"),u=new qi({uniforms:{glowColor:{value:c}},vertexShader:`
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,fragmentShader:`
        uniform vec3 glowColor;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.8);
          gl_FragColor = vec4(glowColor, fresnel * 0.72);
        }
      `,transparent:!0,blending:sa,side:Xi,depthWrite:!1}),f=new _e(l,u);f.name=`${t.toLowerCase()}-atmosphere`,n.add(f)}return n}function WA(){const t=new st;t.name="vab-hangar";const e=new Et(16,16,.4,36),n=new Nt({color:"#111a2b",roughness:.45,metalness:.65}),i=new _e(e,n);i.position.y=-.2,t.add(i);const r=new HA(30,30,"#22d3ee","#132842");r.position.y=.02,t.add(r);const s=new So(2.2,3.4,36),a=new kt({color:"#f59e0b",side:cn,transparent:!0,opacity:.45}),o=new _e(s,a);o.rotation.x=-Math.PI/2,o.position.y=.04,t.add(o);const l=new Nt({color:"#2b394d",metalness:.75,roughness:.35}),c=new Nt({color:"#d97706",metalness:.5,roughness:.4}),u=-4.6,f=-2.2;for(const[_,g]of[[-.5,-.5],[.5,-.5],[-.5,.5],[.5,.5]]){const m=new _e(new Ft(.18,12.5,.18),l);m.position.set(u+_,6.25,f+g),t.add(m)}for(let _=1.5;_<=11.5;_+=2){const g=new _e(new Ft(1.4,.14,1.4),l);g.position.set(u,_,f),t.add(g);const m=new _e(new Ft(3.2,.14,.22),c);m.position.set(u+1.8,_,f+.9),m.rotation.y=-.45,t.add(m)}const h=new Nt({color:"#0b1424",metalness:.6,roughness:.5,side:mn}),p=new _e(new Et(18,18,22,16,1,!0),h);p.position.y=11,t.add(p);for(let _=0;_<8;_++){const g=_/8*Math.PI*2,m=new _e(new Ft(.45,20,.7),l);m.position.set(Math.cos(g)*16.5,10,Math.sin(g)*16.5),m.rotation.y=-g,t.add(m);const d=new _e(new Ft(.08,16,.12),new kt({color:"#38bdf8"}));d.position.set(Math.cos(g)*16.05,9,Math.sin(g)*16.05),d.rotation.y=-g,t.add(d)}return t}function jA(t){switch(t){case"launcher":return 2.4;case"structure":return 6.35;case"thermal":return 5.75;case"battery":return 6.35;case"computer":return 6.95;case"adcs":return 7.45;case"power":return 6.6;case"payload":return 8.35}}function XA(t){const e=new st,n=t==="launcher-heavy"?1.35:t==="launcher-medium"?1.05:.78,i=new Nt({color:"#d8dee9",roughness:.4,metalness:.35}),r=new Nt({color:"#1e293b",roughness:.5,metalness:.6}),s=new _e(new Et(.55*n,.58*n,3.6,20),i);s.position.y=0,e.add(s);const a=new _e(new qn(.32*n,.55,16),r);return a.position.y=-2,e.add(a),e}function I_(t,e,n={}){const i=new st;i.name="rocket-stack";const{activeCategory:r=null,hideStage1:s=!1,showSnapRings:a=!1}=n,o=(u,f)=>{const h=e.has(f),p=r===f;return new Nt({color:u,roughness:.38,metalness:.48,emissive:h?new Be("#ef4444"):p?new Be("#0284c7"):new Be("#000000"),emissiveIntensity:h?.65:p?.35:0})},l=t.launcherId,c=l==="launcher-heavy"?1.35:l==="launcher-medium"?1.05:.8;if(l){const u=new st;u.name="slot-launcher",u.userData.category="launcher";const f=o("#e2e8f0","launcher"),h=new Nt({color:l==="launcher-heavy"?"#f97316":l==="launcher-medium"?"#0ea5e9":"#22c55e",roughness:.4,metalness:.3}),p=new Nt({color:"#1e293b",roughness:.5,metalness:.7});if(!s){const m=new _e(new Et(.55*c,.6*c,3.6,24),f);m.position.y=2,u.add(m);const d=new _e(new Et(.56*c,.56*c,.35,24),h);if(d.position.y=3.2,u.add(d),l==="launcher-heavy")for(const M of[-1,1]){const y=new _e(new Et(.32,.34,3.1,16),f);y.position.set(M*.98,1.75,0),u.add(y);const C=new _e(new qn(.32,.6,16),h);C.position.set(M*.98,3.6,0),u.add(C);const w=new _e(new qn(.24,.45,14),p);w.position.set(M*.98,.05,0),u.add(w)}const v=new _e(new qn(.36*c,.55,18),p);v.position.y=.05,u.add(v)}const _=new _e(new Et(.48*c,.54*c,1.55,24),f);_.position.y=4.65,u.add(_);const g=new _e(new qn(.25*c,.35,14),p);g.position.y=3.78,u.add(g),i.add(u)}if(t.structureId){const u=new st;u.name="slot-structure",u.userData.category="structure";const f=o(t.structureId==="struct-lander-chassis"?"#cbd5e1":t.structureId==="struct-modular-bus"?"#94a3b8":"#64748b","structure"),h=t.structureId==="struct-modular-bus"?6:8,p=t.structureId==="struct-lander-chassis"?.74:t.structureId==="struct-modular-bus"?.62:.48,_=new _e(new Et(p,p,1.65,h),f);if(_.position.y=6.35,u.add(_),t.structureId==="struct-lander-chassis"){const g=new Nt({color:"#f59e0b",metalness:.65,roughness:.35});for(let m=0;m<4;m++){const d=m/4*Math.PI*2+Math.PI/4,v=new _e(new Et(.05,.04,1.3,8),g);v.position.set(Math.cos(d)*.9,5.4,Math.sin(d)*.9),v.rotation.z=Math.cos(d)*.5,v.rotation.x=-Math.sin(d)*.5,u.add(v);const M=new _e(new Et(.16,.18,.08,10),g);M.position.set(Math.cos(d)*1.18,4.82,Math.sin(d)*1.18),u.add(M)}}i.add(u)}if(t.thermalId){const u=new st;if(u.name="slot-thermal",u.userData.category="thermal",t.thermalId==="thermal-heavy-rad-shield"){const f=o("#451a03","thermal"),h=new _e(new qn(.95,.52,24),f);h.rotation.x=Math.PI,h.position.y=5.48,u.add(h)}else if(t.thermalId==="thermal-active-louvers"){const f=o("#e2e8f0","thermal");for(const h of[-1,1]){const p=new _e(new Ft(.14,.95,.65),f);p.position.set(0,6.25,h*.68),u.add(p)}}else{const f=o("#eab308","thermal"),h=new _e(new Et(.56,.56,.55,16),f);h.position.y=5.82,u.add(h)}i.add(u)}if(t.batteryId){const u=new st;u.name="slot-battery",u.userData.category="battery";const f=t.batteryId==="bat-solid-state"?1.25:t.batteryId==="bat-liion-med"?1:.72,h=o("#06b6d4","battery");for(const p of[-1,1]){const _=new _e(new Ft(.24*f,.62*f,.36*f),h);_.position.set(p*.56,6.35,0),u.add(_)}i.add(u)}if(t.computerId){const u=new st;u.name="slot-computer",u.userData.category="computer";const f=t.computerId==="cpu-ai-edge"?"#a855f7":t.computerId==="cpu-radhard-obc"?"#3b82f6":"#64748b",h=o(f,"computer"),p=new _e(new Ft(.55,.38,.55),h);p.position.y=6.95,u.add(p),i.add(u)}if(t.adcsId){const u=new st;u.name="slot-adcs",u.userData.category="adcs";const f=o(t.adcsId==="adcs-cmg-precision"?"#f43f5e":t.adcsId==="adcs-reaction-wheels"?"#38bdf8":"#94a3b8","adcs"),h=new _e(new Eo(.55,.09,10,24),f);if(h.rotation.x=Math.PI/2,h.position.y=7.45,u.add(h),t.adcsId!=="adcs-magnetorquer"){const p=new _e(new qn(.14,.32,12),f);p.position.set(.5,7.52,.25),p.rotation.z=-.6,u.add(p)}i.add(u)}if(t.powerId){const u=new st;if(u.name="slot-power",u.userData.category="power",t.powerId==="power-rtg"){const f=o("#334155","power"),h=new Nt({color:"#f97316",emissive:"#ea580c",emissiveIntensity:.7,roughness:.4}),p=new _e(new Et(.22,.22,1.05,12),f);p.rotation.z=Math.PI/2.6,p.position.set(.95,6.45,0),u.add(p);for(let _=0;_<4;_++){const g=new _e(new Ft(.06,.95,.55),h);g.position.set(.95,6.45,0),g.rotation.y=_/4*Math.PI,g.rotation.z=Math.PI/2.6,u.add(g)}}else{const f=t.powerId==="power-large-solar"?2.6:1.5,h=t.powerId==="power-large-solar"?.95:.58,p=o("#1d4ed8","power"),_=new Nt({color:"#cbd5e1",metalness:.7,roughness:.3});for(const g of[-1,1]){const m=new _e(new Ft(f,.04,h),p);m.position.set(g*(.65+f*.5),6.65,0),u.add(m);const d=new _e(new Et(.04,.04,.45,8),_);d.rotation.z=Math.PI/2,d.position.set(g*.55,6.65,0),u.add(d)}}i.add(u)}if(t.payloadId){const u=new st;if(u.name="slot-payload",u.userData.category="payload",t.payloadId==="payload-ir-telescope"){const f=o("#facc15","payload"),h=new Nt({color:"#1e293b",metalness:.6,roughness:.35}),p=new _e(new Ft(1.6,.08,1.3),new Nt({color:"#c084fc",metalness:.6,roughness:.25}));p.position.y=7.92,u.add(p);const _=new _e(new Et(.68,.68,.14,6),f);_.rotation.x=Math.PI/2.4,_.position.y=8.45,u.add(_);const g=new _e(new Et(.16,.16,.16,12),h);g.position.set(0,8.85,.45),u.add(g)}else if(t.payloadId==="payload-surface-lander"){const f=o("#e2e8f0","payload"),h=new Nt({color:"#f59e0b",metalness:.5}),p=new _e(new Ft(.9,.55,.85),f);p.position.y=8.05,u.add(p);const _=new _e(new Et(.05,.06,.65,8),h);_.position.set(.2,8.55,.15),u.add(_);const g=new _e(new Ft(.28,.18,.2),f);g.position.set(.2,8.9,.15),u.add(g)}else{const f=o("#38bdf8","payload"),h=new _e(new Et(.42,.48,.85,16),f);h.position.y=8.2,u.add(h);const p=new _e(new Et(.32,.32,.12,16),new Nt({color:"#0ea5e9",emissive:"#0284c7",emissiveIntensity:.4}));p.position.y=8.66,u.add(p)}i.add(u)}if(a){const u=["launcher","structure","thermal","battery","computer","adcs","power","payload"];for(const f of u){const h=jA(f),p=!!t[f==="launcher"?"launcherId":`${f}Id`],_=r===f,m=e.has(f)?"#ef4444":_?"#22d3ee":p?"#10b981":"#f59e0b",d=new Eo(_?1.15:.95,.045,8,32),v=new kt({color:m,transparent:!0,opacity:_?.95:p?.38:.78}),M=new _e(d,v);M.rotation.x=Math.PI/2,M.position.y=h,M.name=`snap-${f}`,M.userData.snapCategory=f,i.add(M);const y=new Et(1.25,1.25,.55,12),C=new kt({transparent:!0,opacity:0,depthWrite:!1}),w=new _e(y,C);w.position.y=h,w.name=`snap-hit-${f}`,w.userData.snapCategory=f,i.add(w)}}return i}function $A(){const t=new st;t.name="exhaust-plume";const e=new qn(.48,3.2,16,1,!0);e.translate(0,-1.6,0);const n=new kt({color:"#f97316",transparent:!0,opacity:.72,blending:sa,side:cn,depthWrite:!1}),i=new _e(e,n);t.add(i);const r=new qn(.24,2,14,1,!0);r.translate(0,-1,0);const s=new kt({color:"#fef08a",transparent:!0,opacity:.9,blending:sa,side:cn,depthWrite:!1}),a=new _e(r,s);return t.add(a),t.userData.update=(o,l,c)=>{if(o<=.01){t.visible=!1;return}t.visible=!0;const u=.88+Math.sin(c*48)*.12,f=l?1.45:.95,h=(.45+o*1.25)*u;i.scale.set(f,h,f),a.scale.set(f*.85,h*.9,f*.85),n.opacity=Math.min(.85,.28+o*.55)},t}function L_(t,e,n=.75){const i=new jt().setFromPoints(t),r=new xo({color:e,transparent:n<1,opacity:n});return new Ec(i,r)}function jf(t,e,n,i){const r=new qn(e,t,24,1,!0);r.translate(0,-t/2,0),r.rotateX(Math.PI);const s=new kt({color:n,transparent:!0,opacity:i,side:cn,blending:sa,depthWrite:!1});return new _e(r,s)}const fn=1/1e4,Fa=new L(0,1,0);function ka(t){return new L(t.x*fn,t.y*fn,t.z*fn)}const od=96;class Rg{constructor(){ge(this,"scene");ge(this,"camera");ge(this,"root",new st);ge(this,"earth");ge(this,"moon");ge(this,"mars");ge(this,"padTower");ge(this,"craftPivot",new st);ge(this,"craftVisual",null);ge(this,"plume");ge(this,"sensorCone");ge(this,"orbitLine");ge(this,"orbitPositions",new Float32Array((od+1)*3));ge(this,"apMarker");ge(this,"peMarker");ge(this,"earthShadow");ge(this,"moonShadow");ge(this,"marsShadow");ge(this,"dsnConesGroup",new st);ge(this,"downlinkLinesGroup",new st);ge(this,"dsnPool",new Map);ge(this,"spentBoosters",[]);ge(this,"builtStageIndex",null);ge(this,"builtLauncherId",null);ge(this,"yaw",.8);ge(this,"pitch",.45);ge(this,"distance",22)}mount(e,n){this.scene=e,this.camera=n,this.camera.near=.25,this.camera.far=6500,this.camera.updateProjectionMatrix(),this.scene.add(this.root);const i=new Zc("#435e86",.72),r=new rs("#fff8ea",2.6);r.position.set(to.x*1200,140,200);const s=new rs("#38bdf8",.45);s.position.set(-400,-100,-200),this.root.add(i,r,s),this.root.add(ep(1800,3400)),this.earth=Kr("EARTH",Rt*fn),this.moon=Kr("MOON",Ui*fn),this.mars=Kr("MARS",_i*fn),this.root.add(this.earth,this.moon,this.mars);const a=(c,u)=>{const f=new Et(c*.98,c*.98,u,24,1,!0);f.rotateZ(Math.PI/2),f.translate(-u/2,0,0);const h=new kt({color:"#030816",transparent:!0,opacity:.44,side:cn,depthWrite:!1});return new _e(f,h)};this.earthShadow=a(Rt*fn,360),this.moonShadow=a(Ui*fn,90),this.marsShadow=a(_i*fn,140),this.root.add(this.earthShadow,this.moonShadow,this.marsShadow),this.padTower=this.createLaunchpadTower(),this.padTower.position.set(Rt*fn,0,0),this.padTower.quaternion.setFromUnitVectors(Fa,new L(1,0,0)),this.root.add(this.padTower),this.plume=$A(),this.plume.visible=!1,this.craftPivot.add(this.plume),this.sensorCone=jf(6.5,2.2,3462041,.22),this.sensorCone.visible=!1,this.root.add(this.sensorCone),this.root.add(this.craftPivot),this.apMarker=new _e(new hi(1.4,12,12),new kt({color:"#34d399"})),this.peMarker=new _e(new hi(1.4,12,12),new kt({color:"#f59e0b"})),this.apMarker.visible=!1,this.peMarker.visible=!1,this.root.add(this.apMarker,this.peMarker),this.root.add(this.dsnConesGroup,this.downlinkLinesGroup);const o=new jt;o.setAttribute("position",new Pn(this.orbitPositions,3)),o.setDrawRange(0,0),this.orbitLine=new Ec(o,new xo({color:3718648,transparent:!0,opacity:.72})),this.orbitLine.frustumCulled=!1,this.root.add(this.orbitLine);const l=new hi(.95,8,8);for(const c of Gc){const u=new kt({color:"#38bdf8"}),f=new _e(l,u);f.visible=!1;const h=jf(18,8,2282478,.1),p=h.material;h.visible=!1;const _=new Float32Array(6),g=new jt;g.setAttribute("position",new Pn(_,3));const m=new Ec(g,new xo({color:4906624,transparent:!0,opacity:.92}));m.frustumCulled=!1,m.visible=!1,this.dsnConesGroup.add(f,h),this.downlinkLinesGroup.add(m),this.dsnPool.set(c.id,{dot:f,dotMat:u,cone:h,coneMat:p,beam:m,beamPositions:_})}this.rebuildCraftMesh(0),this.update(0,0)}createLaunchpadTower(){const e=new st,n=new Nt({color:"#475569",metalness:.7,roughness:.4}),i=new _e(new Et(1.4,1.8,.35,16),n);i.position.y=.15;const r=new _e(new Ft(.42,3.8,.42),n);r.position.set(-.95,1.9,-.6);const s=new _e(new Ft(1.1,.12,.16),new Nt({color:"#f59e0b"}));return s.position.set(-.4,3.1,-.3),e.add(i,r,s),e}rebuildCraftMesh(e){const n=xe.getState();this.craftVisual&&(this.craftPivot.remove(this.craftVisual),wr(this.craftVisual),this.craftVisual=null),this.craftVisual=I_(n.spacecraft,new Set,{hideStage1:e===1,showSnapRings:!1}),this.craftVisual.scale.setScalar(.32),this.craftVisual.position.y=e===1?-1.4:0,this.craftPivot.add(this.craftVisual),this.plume.scale.setScalar(.32),this.plume.position.y=e===1?-.18:0,this.builtStageIndex=e,this.builtLauncherId=n.spacecraft.launcherId}spawnSpentStage1(e,n){const i=XA(this.builtLauncherId);i.scale.setScalar(.32),i.position.copy(e),i.quaternion.setFromUnitVectors(Fa,n),this.root.add(i);const r=n.clone().multiplyScalar(-1.6).add(new L(0,-.5,.4));this.spentBoosters.push({mesh:i,vel:r,rotAxis:new L(.7,.2,.6).normalize(),age:0})}updateOrbitTrajectory(e,n,i,r,s,a){this.orbitLine.geometry.setDrawRange(0,0),this.apMarker.visible=!1,this.peMarker.visible=!1;const o=wt(e,i),l=wt(n,r),c=$e(o),u=$e(l);if(c<a*1.005||u<20)return;const f=new L(o.x,o.y,o.z),h=new L(l.x,l.y,l.z),p=new L().crossVectors(f,h),_=p.length();if(_<1e4)return;const g=new L().crossVectors(h,p).divideScalar(s).sub(f.clone().normalize()),m=g.length(),d=_*_/s;if(!Number.isFinite(d)||d<=0)return;const v=p.clone().normalize(),M=m>1e-4?g.clone().normalize():f.clone().normalize(),y=new L().crossVectors(v,M).normalize(),C=ka(i),w=m<.99?Math.PI:Math.acos(-1/m)*.88;let A=0;for(let E=0;E<=od;E++){const x=-w+E/od*(2*w),P=1+m*Math.cos(x);if(P<=.05)continue;const B=d/P;if(B>12e6)continue;const H=C.x+(M.x*Math.cos(x)+y.x*Math.sin(x))*B*fn,Y=C.y+(M.y*Math.cos(x)+y.y*Math.sin(x))*B*fn,V=C.z+(M.z*Math.cos(x)+y.z*Math.sin(x))*B*fn;this.orbitPositions[A*3]=H,this.orbitPositions[A*3+1]=Y,this.orbitPositions[A*3+2]=V,A++}if(A>=2){const E=this.orbitLine.geometry.getAttribute("position");E.needsUpdate=!0,this.orbitLine.geometry.setDrawRange(0,A)}const b=d/(1+m);if(b>a*.95&&b<1e7&&(this.peMarker.position.copy(C).addScaledVector(M,b*fn),this.peMarker.visible=!0),m<.98){const E=d/(1-m);E<1e7&&(this.apMarker.position.copy(C).addScaledVector(M,-E*fn),this.apMarker.visible=!0)}}updateDsnVisuals(e,n,i,r,s){const a=new Set(i),o=new Set(r);for(const[l,c]of this.dsnPool.entries()){if(!a.has(l)){c.dot.visible=!1,c.cone.visible=!1,c.beam.visible=!1;continue}const u=Yv(l,n),f=ka(u),h=o.has(l);c.dot.visible=!0,c.dot.position.copy(f),c.dotMat.color.set(h?"#34d399":"#38bdf8"),c.cone.visible=!0,c.cone.position.copy(f);const p=l==="lunar-relay"?f.clone().normalize().negate():f.clone().normalize();if(c.cone.quaternion.setFromUnitVectors(Fa,p),c.coneMat.color.setHex(h?3462041:2282478),c.coneMat.opacity=h?.14:.06,h&&s){c.beam.visible=!0,c.beamPositions[0]=e.x,c.beamPositions[1]=e.y,c.beamPositions[2]=e.z,c.beamPositions[3]=f.x,c.beamPositions[4]=f.y,c.beamPositions[5]=f.z;const _=c.beam.geometry.getAttribute("position");_.needsUpdate=!0}else c.beam.visible=!1}}update(e,n){const i=xe.getState(),r=i.flight;if(!r)return;const s=r.elapsedFlightSec;this.earth.rotation.y=-Xv*s;const a=$s(s),o=qs(s);if(this.moon.position.copy(ka(a.pos)),this.mars.position.copy(ka(o.pos)),this.moonShadow.position.copy(this.moon.position),this.marsShadow.position.copy(this.mars.position),this.builtStageIndex===0&&r.activeStageIndex===1){const C=new L(r.heading.x,r.heading.y,r.heading.z).normalize();this.spawnSpentStage1(this.craftPivot.position.clone(),C),this.rebuildCraftMesh(1)}else this.builtStageIndex===null&&this.rebuildCraftMesh(r.activeStageIndex);const l=ka(r.position);this.craftPivot.position.copy(l);const c=new L(r.heading.x,r.heading.y,r.heading.z);c.lengthSq()>1e-6&&(c.normalize(),this.craftPivot.quaternion.setFromUnitVectors(Fa,c));const u=Math.max(.45,Math.min(3.4,this.distance*.036));this.craftPivot.scale.setScalar(u);const f=r.activeStageIndex===0?r.stage1PropKg:r.stage2PropKg,h=r.throttle>.01&&f>0&&!r.targetPhaseStatus.landedOnTarget&&r.status!=="SUCCESS"&&r.status!=="FAILED",p=r.orbitalElements.altitudeM>gc*.7,_=this.plume.userData.update;_==null||_(h?r.throttle:0,p,n);for(let C=this.spentBoosters.length-1;C>=0;C--){const w=this.spentBoosters[C];w.age+=e,w.mesh.position.addScaledVector(w.vel,e),w.mesh.rotateOnAxis(w.rotAxis,e*1.8),w.age>10&&(this.root.remove(w.mesh),wr(w.mesh),this.spentBoosters.splice(C,1))}if(r.status==="ORBIT"||r.status==="LANDING"||r.status==="TARGET_CAPTURE"){let C=new L(0,0,0);i.missionId==="MOON_LANDING"&&$e(wt(r.position,a.pos))<jr?C=this.moon.position:i.missionId==="MARS_LANDING"&&$e(wt(r.position,o.pos))<ur&&(C=this.mars.position);const w=C.clone().sub(l),A=w.length();if(A>1&&A<140){this.sensorCone.visible=!0,this.sensorCone.position.copy(l),this.sensorCone.quaternion.setFromUnitVectors(Fa,w.normalize());const b=Math.min(A*.65,24);this.sensorCone.scale.set(b/6.5,b/6.5,b/6.5)}else this.sensorCone.visible=!1}else this.sensorCone.visible=!1;const m=$e(wt(r.position,a.pos)),d=$e(wt(r.position,o.pos));i.missionId==="MOON_LANDING"&&m<jr?this.updateOrbitTrajectory(r.position,r.velocity,a.pos,a.vel,zh,Ui):i.missionId==="MARS_LANDING"&&d<ur?this.updateOrbitTrajectory(r.position,r.velocity,o.pos,o.vel,Gh,_i):this.updateOrbitTrajectory(r.position,r.velocity,{x:0,y:0,z:0},{x:0,y:0,z:0},Ro,Rt);const v=r.activeDsnStationIds.length>0&&(r.onboardDataMb>.05||r.deliveredDataMb>0);this.updateDsnVisuals(l,s,i.ground.activeStationIds,r.activeDsnStationIds,v),i.phase==="DEBRIEF"&&(this.yaw+=e*.25);const M=Math.cos(this.pitch)*this.distance,y=new L(Math.cos(this.yaw)*M,Math.sin(this.pitch)*this.distance,Math.sin(this.yaw)*M);this.camera.position.copy(l).add(y),this.camera.lookAt(l)}onOrbitDelta(e,n){this.yaw+=e*.007,this.pitch=Math.max(-1.2,Math.min(1.2,this.pitch+n*.006))}onZoomDelta(e){this.distance=Math.max(4.5,Math.min(420,this.distance*(1+e*.001)))}dispose(){this.scene.remove(this.root),wr(this.root)}}const sr=10;class Pg{constructor(){ge(this,"scene");ge(this,"camera");ge(this,"root",new st);ge(this,"earthGroup");ge(this,"stationGroup",new st);ge(this,"stationVisuals",[]);ge(this,"targetOrbitRing",null);ge(this,"lastMissionId","");ge(this,"yaw",.5);ge(this,"pitch",.35);ge(this,"distance",28);ge(this,"rotAngle",0)}mount(e,n){this.scene=e,this.camera=n,this.camera.near=.2,this.camera.far=3e3,this.camera.updateProjectionMatrix(),this.scene.add(this.root);const i=new Zc("#5b7aa8",.95),r=new rs("#fff8eb",2.3);r.position.set(80,20,40);const s=new rs("#22d3ee",.65);s.position.set(-50,-25,-40),this.root.add(i,r,s),this.root.add(ep(1400,1800)),this.earthGroup=Kr("EARTH",sr),this.root.add(this.earthGroup),this.root.add(this.stationGroup),this.buildStationMarkers(),this.rebuildTargetOrbitRing(),this.updateCamera()}buildStationMarkers(){const e=new L(0,1,0);for(const n of Gc){const i=new st;i.userData.stationId=n.id;const r=n.latDeg*Math.PI/180,s=n.lonDeg*Math.PI/180,a=n.isOrbitalRelay?sr*2.05:sr,o=new L(a*Math.cos(r)*Math.cos(s),a*Math.sin(r),a*Math.cos(r)*Math.sin(s));i.position.copy(o);const l=o.clone().normalize();n.isOrbitalRelay?i.quaternion.setFromUnitVectors(e,l.clone().negate()):i.quaternion.setFromUnitVectors(e,l);const c=new Nt({color:"#34d399",emissive:"#10b981",emissiveIntensity:.7,roughness:.3}),u=new _e(n.isOrbitalRelay?new Yc(.65,0):new Et(.45,.25,.45,12),c);u.position.y=n.isOrbitalRelay?0:.22,u.userData.stationId=n.id,i.add(u);const f=new _e(new hi(1.35,10,10),new kt({transparent:!0,opacity:0,depthWrite:!1}));f.userData.stationId=n.id,i.add(f);const h=jf(n.isOrbitalRelay?14:11,n.isOrbitalRelay?4.8:5.6,2282478,.16);h.userData.stationId=n.id,i.add(h),this.stationGroup.add(i),this.stationVisuals.push({id:n.id,anchor:i,markerMat:c,cone:h,isRelay:!!n.isOrbitalRelay})}}rebuildTargetOrbitRing(){const e=xe.getState().missionId;if(e===this.lastMissionId)return;this.lastMissionId=e,this.targetOrbitRing&&(this.root.remove(this.targetOrbitRing),wr(this.targetOrbitRing));const n=Ti[e],i=n.targetType==="LEO"?sr*1.28:n.targetType==="DEEP_SPACE_ORBIT"?sr*1.95:sr*2.55,r=[];for(let s=0;s<=96;s++){const a=s/96*Math.PI*2;r.push(new L(Math.cos(a)*i,0,Math.sin(a)*i))}this.targetOrbitRing=L_(r,3718648,.72),this.root.add(this.targetOrbitRing)}updateCamera(){const e=Math.cos(this.pitch)*this.distance;this.camera.position.set(Math.cos(this.yaw)*e,Math.sin(this.pitch)*this.distance,Math.sin(this.yaw)*e),this.camera.lookAt(0,0,0)}update(e,n){this.rebuildTargetOrbitRing(),this.rotAngle+=e*.12,this.earthGroup.rotation.y=-this.rotAngle,this.stationGroup.rotation.y=-this.rotAngle;const i=new Set(xe.getState().ground.activeStationIds);for(const r of this.stationVisuals){const s=i.has(r.id);if(r.cone.visible=s,r.markerMat.color.set(s?"#34d399":"#64748b"),r.markerMat.emissive.set(s?"#10b981":"#1e293b"),r.markerMat.emissiveIntensity=s?.8+Math.sin(n*4)*.2:.2,r.isRelay){const a=n*.55;r.anchor.position.set(Math.cos(a)*sr*2.05,Math.sin(a*.7)*2.2,Math.sin(a)*sr*2.05);const o=r.anchor.position.clone().normalize().negate();r.anchor.quaternion.setFromUnitVectors(new L(0,1,0),o)}}this.updateCamera()}onOrbitDelta(e,n){this.yaw+=e*.007,this.pitch=Math.max(-1.1,Math.min(1.1,this.pitch+n*.006))}onZoomDelta(e){this.distance=Math.max(16,Math.min(48,this.distance+e*.02))}onPointerMove(e,n){n.setFromCamera(e,this.camera);const r=n.intersectObjects(this.stationGroup.children,!0).find(s=>!!s.object.userData.stationId);document.body.style.cursor=r?"pointer":"grab"}onPointerDown(e,n){n.setFromCamera(e,this.camera);const i=n.intersectObjects(this.stationGroup.children,!0);for(const r of i){const s=r.object.userData.stationId;if(s){xe.getState().toggleStation(s);return}}}dispose(){document.body.style.cursor="default",this.scene.remove(this.root),wr(this.root)}}class Ig{constructor(){ge(this,"scene");ge(this,"camera");ge(this,"root",new st);ge(this,"stackContainer",new st);ge(this,"rocketGroup",null);ge(this,"yaw",.65);ge(this,"pitch",.22);ge(this,"distance",15.5);ge(this,"lookAtY",4.9);ge(this,"lastSignature","");ge(this,"bounceAmount",0)}mount(e,n){this.scene=e,this.camera=n,this.camera.near=.1,this.camera.far=400,this.camera.updateProjectionMatrix(),this.scene.add(this.root);const i=new Zc("#6b8ab8",.9),r=new FA("#fff3db",160,60,Math.PI/4,.4,1.2);r.position.set(10,17,11);const s=new rs("#38bdf8",1.15);s.position.set(-12,8,-8);const a=new BA("#f59e0b",18,22);a.position.set(0,1.2,2.5),this.root.add(i,r,s,a),this.root.add(WA()),this.root.add(this.stackContainer),this.rebuildRocketIfNeeded(),this.updateCamera()}rebuildRocketIfNeeded(){const e=xe.getState(),n=JSON.stringify({sc:e.spacecraft,m:e.missionId,d:e.difficulty,ac:e.activeSnapCategory,g:e.ground.bandId});if(n===this.lastSignature)return;const i=this.lastSignature==="";this.lastSignature=n,this.rocketGroup&&(this.stackContainer.remove(this.rocketGroup),wr(this.rocketGroup),this.rocketGroup=null);const r=ga(e.missionId,e.spacecraft,e.difficulty,e.ground),s=new Set;for(const a of r.conflicts)a.affectedCategory!=="ground"&&s.add(a.affectedCategory);this.rocketGroup=I_(e.spacecraft,s,{activeCategory:e.activeSnapCategory,showSnapRings:!0}),this.stackContainer.add(this.rocketGroup),i||(this.bounceAmount=1)}updateCamera(){const e=Math.cos(this.pitch)*this.distance,n=this.lookAtY+Math.sin(this.pitch)*this.distance,i=Math.cos(this.yaw)*e,r=Math.sin(this.yaw)*e;this.camera.position.set(i,Math.max(1.2,n),r),this.camera.lookAt(0,this.lookAtY,0)}update(e,n){if(this.rebuildRocketIfNeeded(),this.bounceAmount>0){this.bounceAmount=Math.max(0,this.bounceAmount-e*3.8);const i=1+Math.sin(this.bounceAmount*Math.PI)*.08;this.stackContainer.scale.set(i,1/Math.sqrt(i),i)}else this.stackContainer.scale.set(1,1,1);if(this.rocketGroup){this.rocketGroup.rotation.y=Math.sin(n*.25)*.14;const i=.55+Math.sin(n*5.2)*.35;this.rocketGroup.traverse(r=>{if(r.name.startsWith("snap-")){const s=r.material;r.userData.snapCategory===xe.getState().activeSnapCategory&&(s.opacity=.75+Math.sin(n*6)*.25)}else{const s=r.material;s&&s.emissive&&s.emissive.r>.5&&(s.emissiveIntensity=i)}})}this.updateCamera()}onOrbitDelta(e,n){this.yaw+=e*.007,this.pitch=Math.max(-.12,Math.min(.85,this.pitch+n*.005))}onZoomDelta(e){this.distance=Math.max(7.5,Math.min(26,this.distance+e*.01))}onPointerMove(e,n){if(!this.rocketGroup)return;n.setFromCamera(e,this.camera);const r=n.intersectObjects(this.rocketGroup.children,!0).find(s=>!!(s.object.userData.snapCategory||s.object.userData.category));document.body.style.cursor=r?"pointer":"grab"}onPointerDown(e,n){if(!this.rocketGroup)return;n.setFromCamera(e,this.camera);const i=n.intersectObjects(this.rocketGroup.children,!0);for(const r of i){let s=r.object;for(;s;){const a=s.userData.snapCategory??s.userData.category;if(a){xe.getState().setActiveSnapCategory(a);return}s=s.parent}}}onDropPart(e,n){const i=xe.getState(),r=e;i.setActiveSnapCategory(r),i.equipPart(r,n),this.bounceAmount=1}dispose(){document.body.style.cursor="default",this.scene.remove(this.root),wr(this.root)}}class Lg{constructor(){ge(this,"scene");ge(this,"camera");ge(this,"root",new st);ge(this,"earth");ge(this,"moon");ge(this,"mars");ge(this,"moonBeacon");ge(this,"marsBeacon");ge(this,"exploreRing");ge(this,"eoProbeGroup",new st);ge(this,"telescopeProbeGroup",new st);ge(this,"reticleRing");ge(this,"targetLookAt",new L(0,0,0));ge(this,"currentLookAt",new L(0,0,0));ge(this,"targetCamPos",new L(18,12,34));ge(this,"orbitYawOffset",0);ge(this,"orbitPitchOffset",.28);ge(this,"hoveredTarget",null);ge(this,"moonPos",new L(34,2,-16));ge(this,"marsPos",new L(64,-3,22));ge(this,"eoBeaconPos",new L(11.5,1.5,4));ge(this,"teleBeaconPos",new L(-15.5,4.2,8))}mount(e,n){this.scene=e,this.camera=n,this.camera.near=.2,this.camera.far=4500,this.camera.updateProjectionMatrix(),this.scene.add(this.root);const i=new Zc("#4d6b94",.85),r=new rs("#fff5e4",2.4);r.position.set(120,40,60);const s=new rs("#38bdf8",.7);s.position.set(-80,-30,-50),this.root.add(i,r,s),this.root.add(ep(1500,2200)),this.earth=Kr("EARTH",8.5),this.root.add(this.earth),this.moon=Kr("MOON",2.4),this.moon.position.copy(this.moonPos),this.root.add(this.moon),this.mars=Kr("MARS",4.1),this.mars.position.copy(this.marsPos),this.root.add(this.mars);const a=(u,f,h)=>{const p=[];for(let _=0;_<=96;_++){const g=_/96*Math.PI*2;p.push(new L(Math.cos(g)*u,0,Math.sin(g)*u))}return L_(p,f,h)};this.root.add(a(this.moonPos.length(),6583435,.35)),this.root.add(a(this.marsPos.length(),10105874,.3));const o=new Eo(12.2,.28,12,72),l=new kt({color:"#22d3ee",transparent:!0,opacity:.78});this.exploreRing=new _e(o,l),this.exploreRing.rotation.x=Math.PI/2-.14,this.exploreRing.userData.objectiveTarget="EXPLORE_SPACE",this.root.add(this.exploreRing),this.moonBeacon=new _e(new hi(3.5,20,20),new kt({color:"#94a3b8",transparent:!0,opacity:.18,wireframe:!0})),this.moonBeacon.position.copy(this.moonPos),this.moonBeacon.userData.objectiveTarget="MOON_LANDING",this.root.add(this.moonBeacon),this.marsBeacon=new _e(new hi(5.3,20,20),new kt({color:"#fb923c",transparent:!0,opacity:.22,wireframe:!0})),this.marsBeacon.position.copy(this.marsPos),this.marsBeacon.userData.objectiveTarget="MARS_LANDING",this.root.add(this.marsBeacon);const c=(u,f)=>{const h=new st,p=new _e(new Yc(.95,0),new Nt({color:u,emissive:u,emissiveIntensity:.6,metalness:.5,roughness:.3}));p.userData.subMissionTarget=f;const _=new _e(new So(1.3,1.65,28),new kt({color:u,side:cn,transparent:!0,opacity:.85}));_.userData.subMissionTarget=f;const g=new _e(new hi(2.1,12,12),new kt({transparent:!0,opacity:0,depthWrite:!1}));return g.userData.subMissionTarget=f,h.add(p,_,g),h};this.eoProbeGroup=c("#34d399","EARTH_OBSERVATION"),this.eoProbeGroup.position.copy(this.eoBeaconPos),this.root.add(this.eoProbeGroup),this.telescopeProbeGroup=c("#c084fc","SPACE_TELESCOPE"),this.telescopeProbeGroup.position.copy(this.teleBeaconPos),this.root.add(this.telescopeProbeGroup),this.reticleRing=new _e(new So(4.2,4.6,36),new kt({color:"#22d3ee",side:cn,transparent:!0,opacity:.9})),this.reticleRing.visible=!1,this.root.add(this.reticleRing),this.camera.position.set(16,10,30),this.camera.lookAt(this.currentLookAt)}update(e,n){const i=xe.getState();this.earth.rotation.y+=e*.08,this.moon.rotation.y+=e*.05,this.mars.rotation.y+=e*.07;const r=i.phase==="OBJECTIVE_SELECT";this.exploreRing.visible=r,this.moonBeacon.visible=r,this.marsBeacon.visible=r;const s=r&&i.exploreSubChoiceOpen;if(this.eoProbeGroup.visible=s,this.telescopeProbeGroup.visible=s,s&&(this.eoProbeGroup.rotation.y=n*1.4,this.telescopeProbeGroup.rotation.y=-n*1.1),i.phase==="TITLE"){const o=n*.14+this.orbitYawOffset;this.targetLookAt.set(0,0,0),this.targetCamPos.set(Math.cos(o)*26,7.5+Math.sin(n*.25)*2,Math.sin(o)*26)}else if(i.selectedObjective==="MOON_LANDING")this.targetLookAt.copy(this.moonPos),this.targetCamPos.copy(this.moonPos).add(new L(Math.cos(this.orbitYawOffset)*14,6+this.orbitPitchOffset*8,Math.sin(this.orbitYawOffset)*14));else if(i.selectedObjective==="MARS_LANDING")this.targetLookAt.copy(this.marsPos),this.targetCamPos.copy(this.marsPos).add(new L(Math.cos(this.orbitYawOffset)*18,7+this.orbitPitchOffset*9,Math.sin(this.orbitYawOffset)*18));else if(i.selectedObjective==="EXPLORE_SPACE"){this.targetLookAt.set(0,1,0);const o=28;this.targetCamPos.set(Math.cos(this.orbitYawOffset+.4)*o,12+this.orbitPitchOffset*10,Math.sin(this.orbitYawOffset+.4)*o)}else this.targetLookAt.set(22,0,2),this.targetCamPos.set(22+Math.sin(this.orbitYawOffset)*32,26+this.orbitPitchOffset*14,68);const a=1-Math.exp(-e*4.2);this.currentLookAt.lerp(this.targetLookAt,a),this.camera.position.lerp(this.targetCamPos,a),this.camera.lookAt(this.currentLookAt),this.reticleRing.visible&&(this.reticleRing.lookAt(this.camera.position),this.reticleRing.rotation.z=n*1.2)}onOrbitDelta(e,n){this.orbitYawOffset+=e*.006,this.orbitPitchOffset=Math.max(-.5,Math.min(.8,this.orbitPitchOffset+n*.004))}onPointerMove(e,n){const i=xe.getState();if(i.phase!=="OBJECTIVE_SELECT"){this.reticleRing.visible=!1;return}n.setFromCamera(e,this.camera);const r=[this.moonBeacon,this.marsBeacon,this.exploreRing];i.exploreSubChoiceOpen&&r.push(this.eoProbeGroup,this.telescopeProbeGroup);const s=n.intersectObjects(r,!0);if(s.length>0){const a=s[0].object,o=a.userData.subMissionTarget,l=a.userData.objectiveTarget;this.hoveredTarget=o??l??null,this.reticleRing.visible=!0,o==="EARTH_OBSERVATION"?(this.reticleRing.position.copy(this.eoBeaconPos),this.reticleRing.scale.setScalar(.6)):o==="SPACE_TELESCOPE"?(this.reticleRing.position.copy(this.teleBeaconPos),this.reticleRing.scale.setScalar(.6)):l==="MOON_LANDING"?(this.reticleRing.position.copy(this.moonPos),this.reticleRing.scale.setScalar(1)):l==="MARS_LANDING"?(this.reticleRing.position.copy(this.marsPos),this.reticleRing.scale.setScalar(1.45)):(this.reticleRing.position.set(0,0,0),this.reticleRing.scale.setScalar(2.6)),document.body.style.cursor="pointer"}else this.hoveredTarget=null,this.reticleRing.visible=!1,document.body.style.cursor="grab"}onPointerDown(e,n){const i=xe.getState();if(i.phase!=="OBJECTIVE_SELECT")return;n.setFromCamera(e,this.camera);const r=[this.moonBeacon,this.marsBeacon,this.exploreRing];i.exploreSubChoiceOpen&&r.push(this.eoProbeGroup,this.telescopeProbeGroup);const s=n.intersectObjects(r,!0);if(s.length===0)return;const a=s[0].object,o=a.userData.subMissionTarget;if(o){i.selectExploreSubMission(o);return}const l=a.userData.objectiveTarget;l&&i.selectTopObjective(l)}dispose(){document.body.style.cursor="default",this.scene.remove(this.root),wr(this.root),this.hoveredTarget}}function Dg(t){switch(t){case"TITLE":case"OBJECTIVE_SELECT":return"SOLAR";case"HANGAR":return"HANGAR";case"GROUND_SEGMENT":return"GROUND";case"FLIGHT":case"DEBRIEF":return"FLIGHT"}}const qA=()=>{const t=jn.useRef(null),e=xe(a=>a.phase),n=jn.useRef(null),i=jn.useRef(null),r=jn.useRef(null),s=jn.useRef(null);return jn.useEffect(()=>{var l;const a=Dg(e);if(i.current===a||!r.current||!s.current)return;(l=n.current)==null||l.dispose(),n.current=null;let o;a==="SOLAR"?o=new Lg:a==="HANGAR"?o=new Ig:a==="GROUND"?o=new Pg:o=new Rg,o.mount(r.current,s.current),n.current=o,i.current=a},[e]),jn.useEffect(()=>{const a=t.current;if(!a)return;let o=null;try{o=new IA({canvas:a,antialias:!0,powerPreference:"high-performance"}),o.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),o.setSize(window.innerWidth,window.innerHeight,!1),o.toneMapping=e_,o.toneMappingExposure=1.08}catch{return}const l=new LA;l.background=new Be("#02050d");const c=new Tn(48,window.innerWidth/Math.max(window.innerHeight,1),.2,4500);r.current=l,s.current=c;const u=Dg(xe.getState().phase),f=u==="SOLAR"?new Lg:u==="HANGAR"?new Ig:u==="GROUND"?new Pg:new Rg;f.mount(l,c),n.current=f,i.current=u;const h=new GA,p=new Ye;let _=!1,g=0,m=0,d=0,v=0,M=!1;const y=($,N)=>{const ce=a.getBoundingClientRect();p.x=($-ce.left)/Math.max(ce.width,1)*2-1,p.y=-((N-ce.top)/Math.max(ce.height,1))*2+1},C=$=>{_=!0,M=!1,g=$.clientX,m=$.clientY,d=$.clientX,v=$.clientY},w=$=>{var N,ce,G,X;if(y($.clientX,$.clientY),_){const le=$.clientX-d,ne=$.clientY-v;d=$.clientX,v=$.clientY,Math.hypot($.clientX-g,$.clientY-m)>5&&(M=!0),M&&((ce=(N=n.current)==null?void 0:N.onOrbitDelta)==null||ce.call(N,le,ne))}else(X=(G=n.current)==null?void 0:G.onPointerMove)==null||X.call(G,p,h)},A=$=>{var N,ce,G,X;_&&(_=!1,y($.clientX,$.clientY),M||(ce=(N=n.current)==null?void 0:N.onPointerDown)==null||ce.call(N,p,h),(X=(G=n.current)==null?void 0:G.onPointerUp)==null||X.call(G))},b=$=>{var N,ce;$.preventDefault(),(ce=(N=n.current)==null?void 0:N.onZoomDelta)==null||ce.call(N,$.deltaY)},E=$=>{$.preventDefault()},x=$=>{var ce,G,X;$.preventDefault();const N=(ce=$.dataTransfer)==null?void 0:ce.getData("application/json");if(N)try{const le=JSON.parse(N);le.category&&le.partId&&((X=(G=n.current)==null?void 0:G.onDropPart)==null||X.call(G,le.category,le.partId))}catch{}},P=()=>{if(!o)return;const $=window.innerWidth,N=Math.max(window.innerHeight,1);c.aspect=$/N,c.updateProjectionMatrix(),o.setSize($,N,!1)},B=new Set,H={Digit1:1,Digit2:5,Digit3:25,Digit4:100,Digit5:500},Y=()=>{const $=xe.getState();if($.phase!=="FLIGHT")return;const N=(B.has("KeyW")||B.has("ArrowUp")?1:0)-(B.has("KeyS")||B.has("ArrowDown")?1:0),ce=(B.has("KeyD")||B.has("ArrowRight")?1:0)-(B.has("KeyA")||B.has("ArrowLeft")?1:0);$.setPitchYaw(N,ce)},V=$=>{const N=xe.getState();if(N.phase==="FLIGHT"){if($.code==="Space"){$.preventDefault(),N.requestStage();return}if(H[$.code]){N.setTimeWarp(H[$.code]);return}($.code==="KeyZ"||$.code==="ShiftLeft"||$.code==="ShiftRight")&&N.setThrottle(Math.min(1,N.flightControls.throttle+.15)),($.code==="KeyX"||$.code==="ControlLeft"||$.code==="ControlRight")&&N.setThrottle(Math.max(0,N.flightControls.throttle-.15)),B.add($.code),Y()}},z=$=>{B.delete($.code),Y()};a.addEventListener("pointerdown",C),window.addEventListener("pointermove",w),window.addEventListener("pointerup",A),a.addEventListener("wheel",b,{passive:!1}),a.addEventListener("dragover",E),a.addEventListener("drop",x),window.addEventListener("resize",P),window.addEventListener("keydown",V),window.addEventListener("keyup",z);let K=0,D=performance.now();const Q=D,J=$=>{var X;K=requestAnimationFrame(J);const N=Math.min(($-D)/1e3,.1);D=$;const ce=($-Q)/1e3,G=xe.getState();G.phase==="FLIGHT"&&G.tickFlight(N),(X=n.current)==null||X.update(N,ce),o==null||o.render(l,c)};return K=requestAnimationFrame(J),()=>{var $;cancelAnimationFrame(K),a.removeEventListener("pointerdown",C),window.removeEventListener("pointermove",w),window.removeEventListener("pointerup",A),a.removeEventListener("wheel",b),a.removeEventListener("dragover",E),a.removeEventListener("drop",x),window.removeEventListener("resize",P),window.removeEventListener("keydown",V),window.removeEventListener("keyup",z),($=n.current)==null||$.dispose(),n.current=null,o==null||o.dispose()}},[]),I.jsx("canvas",{ref:t,"data-testid":"game-viewport-canvas",className:"viewport-canvas"})},YA=()=>I.jsxs("main",{className:"game-root",children:[I.jsx(qA,{}),I.jsx(Ix,{}),I.jsx(bx,{}),I.jsx(Px,{})]});ld.createRoot(document.getElementById("root")).render(I.jsx(Rl.StrictMode,{children:I.jsx(YA,{})}));
