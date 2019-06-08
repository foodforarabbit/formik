"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=require("react"),r=e(require("react-fast-compare")),n=e(require("deepmerge")),i=e(require("lodash/clone")),a=e(require("lodash/toPath"));require("tiny-warning");var o=require("scheduler"),u=e(require("hoist-non-react-statics")),s=e(require("lodash/cloneDeep"));function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function c(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function d(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)t.indexOf(r=a[n])>=0||(i[r]=e[r]);return i}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var f=function(e){return"function"==typeof e},v=function(e){return null!==e&&"object"==typeof e},h=function(e){return String(Math.floor(Number(e)))===e},m=function(e){return"[object String]"===Object.prototype.toString.call(e)},y=function(e){return 0===t.Children.count(e)},S=function(e){return v(e)&&f(e.then)};function E(e,t,r,n){void 0===n&&(n=0);for(var i=a(t);e&&n<i.length;)e=e[i[n++]];return void 0===e?r:e}function T(e,t,r){for(var n=i(e),o=n,u=0,s=a(t);u<s.length-1;u++){var l=s[u],c=E(e,s.slice(0,u+1));if(c)o=o[l]=i(c);else{var d=s[u+1];o=o[l]=h(d)&&Number(d)>=0?[]:{}}}return(0===u?e:o)[s[u]]===r?e:(void 0===r?delete o[s[u]]:o[s[u]]=r,0===u&&void 0===r&&delete n[s[u]],n)}function b(e,t,r,n){void 0===r&&(r=new WeakMap),void 0===n&&(n={});for(var i=0,a=Object.keys(e);i<a.length;i++){var o=a[i],u=e[o];v(u)?r.get(u)||(r.set(u,!0),n[o]=Array.isArray(u)?[]:{},b(u,t,r,n[o])):n[o]=t}return n}var g=t.createContext({}),F=g.Provider,_=g.Consumer;function R(){return t.useContext(g)}function C(e,t){switch(t.type){case"SET_VALUES":return l({},e,{values:t.payload});case"SET_TOUCHED":return l({},e,{touched:t.payload});case"SET_ERRORS":return l({},e,{errors:t.payload});case"SET_STATUS":return l({},e,{status:t.payload});case"SET_ISSUBMITTING":return l({},e,{isSubmitting:t.payload});case"SET_ISVALIDATING":return l({},e,{isValidating:t.payload});case"SET_FIELD_VALUE":return l({},e,{values:T(e.values,t.payload.field,t.payload.value)});case"SET_FIELD_TOUCHED":return l({},e,{touched:T(e.touched,t.payload.field,t.payload.value)});case"SET_FIELD_ERROR":return l({},e,{errors:T(e.errors,t.payload.field,t.payload.value)});case"RESET_FORM":case"SET_FORMIK_STATE":return l({},e,t.payload);case"SUBMIT_ATTEMPT":return l({},e,{touched:b(e.values,!0),isSubmitting:!0,submitCount:e.submitCount+1});case"SUBMIT_FAILURE":case"SUBMIT_SUCCESS":return l({},e,{isSubmitting:!1});default:return e}}var O={},I={},k={};function P(e){var i=function(e){var i=e.validateOnChange,a=void 0===i||i,u=e.validateOnBlur,s=void 0===u||u,c=e.isInitialValid,p=e.enableReinitialize,v=void 0!==p&&p,h=e.onSubmit,y=d(e,["validateOnChange","validateOnBlur","isInitialValid","enableReinitialize","onSubmit"]),b=l({validateOnChange:a,validateOnBlur:s,onSubmit:h},y),g=t.useRef(b.initialValues),F=t.useRef(b.initialErrors||O),_=t.useRef(b.initialTouched||I),R=t.useRef(b.initialStatus),P=t.useRef(!1),D=t.useRef(k);t.useEffect(function(){},[c]),t.useEffect(function(){return P.current=!0,function(){P.current=!1}},[]);var L=t.useReducer(C,{values:b.initialValues,errors:b.initialErrors||{},touched:b.initialTouched||{},status:b.initialStatus,isSubmitting:!1,isValidating:!1,submitCount:0}),M=L[0],w=L[1],j=t.useCallback(function(e,t){return new Promise(function(r){var n=b.validate(e,t);void 0===n?r(O):S(n)?n.then(function(){r(O)},function(e){r(e)}):r(n)})},[b.validate]),N=t.useCallback(function(e,t){return new Promise(function(r){var n=b.validationSchema,i=f(n)?n(t):n;(t&&i.validateAt?i.validateAt(t,e):x(e,i)).then(function(){r(O)},function(e){r(A(e))})})},[b.validationSchema]),B=t.useCallback(function(e,t){return new Promise(function(r){return r(D.current[e].validate(t))})},[]),q=t.useCallback(function(e){var t=Object.keys(D.current).filter(function(e){return f(D.current[e].validate)}),r=t.length>0?t.map(function(t){return B(t,E(e,t))}):[Promise.resolve("DO_NOT_DELETE_YOU_WILL_BE_FIRED")];return Promise.all(r).then(function(e){return e.reduce(function(e,r,n){return"DO_NOT_DELETE_YOU_WILL_BE_FIRED"===r?e:(r&&(e=T(e,t[n],r)),e)},{})})},[B]),G=t.useCallback(function(e){return Promise.all([q(e),b.validationSchema?N(e):{},b.validate?j(e):{}]).then(function(e){return n.all([e[0],e[1],e[2]],{arrayMerge:V})})},[b.validate,b.validationSchema,q,j,N]),W=U(function(e){return void 0===e&&(e=M.values),o.unstable_runWithPriority(o.LowPriority,function(){return G(e).then(function(e){return P.current&&w({type:"SET_ERRORS",payload:e}),e})})},[G,M.values]),H=U(function(e){return void 0===e&&(e=M.values),w({type:"SET_ISVALIDATING",payload:!0}),G(e).then(function(e){return P.current&&(w({type:"SET_ISVALIDATING",payload:!1}),r(M.errors,e)||w({type:"SET_ERRORS",payload:e})),e})},[M.values,M.errors,G]),K=t.useCallback(function(e){var t=e&&e.values?e.values:g.current,r=e&&e.errors?e.errors:F.current?F.current:b.initialErrors||{},n=e&&e.touched?e.touched:_.current?_.current:b.initialTouched||{},i=e&&e.status?e.status:R.current?R.current:b.initialStatus;g.current=t,F.current=r,_.current=n,R.current=i,w({type:"RESET_FORM",payload:{isSubmitting:!!e&&!!e.isSubmitting,errors:r,touched:n,status:i,values:t,isValidating:!!e&&!!e.isValidating,submitCount:e&&e.submitCount&&"number"==typeof e.submitCount?e.submitCount:0}})},[b.initialErrors,b.initialStatus,b.initialTouched,b.initialValues]);t.useEffect(function(){v&&!0===P.current&&!r(g.current,b.initialValues)&&(g.current=b.initialValues,K())},[v,b.initialValues,K]);var Y=U(function(e){if(f(D.current[e].validate)){var t=E(M.values,e),r=D.current[e].validate(t);return S(r)?(w({type:"SET_ISVALIDATING",payload:!0}),r.then(function(e){return e},function(e){return e}).then(function(t){w({type:"SET_FIELD_ERROR",payload:{field:e,value:t}}),w({type:"SET_ISVALIDATING",payload:!1})})):(w({type:"SET_FIELD_ERROR",payload:{field:e,value:r}}),Promise.resolve(r))}return Promise.resolve()},[M.values]),z=t.useCallback(function(e,t){D.current[e]={validate:t.validate}},[]),J=t.useCallback(function(e){delete D.current[e]},[]),Q=U(function(e){return w({type:"SET_TOUCHED",payload:e}),s?W(M.values):Promise.resolve()},[W,M.values,s]),X=t.useCallback(function(e){w({type:"SET_ERRORS",payload:e})},[]),Z=U(function(e){return w({type:"SET_VALUES",payload:e}),a?W(M.values):Promise.resolve()},[W,M.values,a]),$=t.useCallback(function(e,t){w({type:"SET_FIELD_ERROR",payload:{field:e,value:t}})},[]),ee=U(function(e,t,r){return void 0===r&&(r=!0),w({type:"SET_FIELD_VALUE",payload:{field:e,value:t}}),a&&r?W(T(M.values,e,t)):Promise.resolve()},[W,M.values,a]),te=t.useCallback(function(e,t){var r,n=t,i=e;if(!m(e)){e.persist&&e.persist();var a=e.target,o=a.type,u=a.value,s=a.checked;n=t||a.name||a.id,i=/number|range/.test(o)?(r=parseFloat(u),isNaN(r)?"":r):/checkbox/.test(o)?s:u}n&&ee(n,i)},[ee]),re=t.useCallback(function(e){if(m(e))return function(t){return te(t,e)};te(e)},[te]),ne=U(function(e,t,r){return void 0===t&&(t=!0),void 0===r&&(r=!0),w({type:"SET_FIELD_TOUCHED",payload:{field:e,value:t}}),s&&r?W(M.values):Promise.resolve()},[W,M.values,s]),ie=t.useCallback(function(e,t){e.persist&&e.persist();var r=e.target;ne(t||r.name||r.id,!0)},[ne]),ae=t.useCallback(function(e){if(m(e))return function(t){return ie(t,e)};ie(e)},[ie]);function oe(e){f(e)?w({type:"SET_FORMIK_STATE",payload:e(M)}):w({type:"SET_FORMIK_STATE",payload:e})}var ue=t.useCallback(function(e){w({type:"SET_STATUS",payload:e})},[]),se=t.useCallback(function(e){w({type:"SET_ISSUBMITTING",payload:e})},[]),le={resetForm:K,validateForm:H,validateField:Y,setErrors:X,setFieldError:$,setFieldTouched:ne,setFieldValue:ee,setStatus:ue,setSubmitting:se,setTouched:Q,setValues:Z,setFormikState:oe},ce=U(function(){return h(M.values,le)},[le,h,M.values]),de=U(function(){return w({type:"SUBMIT_ATTEMPT"}),H().then(function(e){if(0===Object.keys(e).length)return Promise.resolve(ce()).then(function(){P.current&&w({type:"SUBMIT_SUCCESS"})}).catch(function(e){P.current&&w({type:"SUBMIT_FAILURE"})});P.current&&w({type:"SUBMIT_FAILURE"})})},[ce,H]),pe=U(function(e){e&&e.preventDefault&&f(e.preventDefault)&&e.preventDefault(),e&&e.stopPropagation&&f(e.stopPropagation)&&e.stopPropagation(),de()},[de]),fe=U(function(){if(b.onReset){var e=b.onReset(M.values,le);S(e)?e.then(K):K()}else K()},[le,b.onReset,K,M.values]),ve=t.useCallback(function(e){return{value:E(M.values,e),error:E(M.errors,e),touched:!!E(M.touched,e),initialValue:E(g.current,e),initialTouched:!!E(_.current,e),initialError:E(F.current,e)}},[M.errors,M.touched,M.values]),he=t.useCallback(function(e,t){return[{name:e,value:!t||"radio"!==t&&"checkbox"!==t?E(M.values,e):void 0,onChange:re,onBlur:ae},ve(e)]},[ve,ae,re,M.values]),me=t.useMemo(function(){return!r(g.current,M.values)},[M.values]),ye=t.useMemo(function(){return void 0!==c?me?M.errors&&0===Object.keys(M.errors).length:!1!==c&&f(c)?c(b):c:M.errors&&0===Object.keys(M.errors).length},[c,me,M.errors,b]);return l({},M,{initialValues:g.current,initialErrors:F.current,initialTouched:_.current,initialStatus:R.current,handleBlur:ae,handleChange:re,handleReset:fe,handleSubmit:pe,resetForm:K,setErrors:X,setFormikState:oe,setFieldTouched:ne,setFieldValue:ee,setFieldError:$,setStatus:ue,setSubmitting:se,setTouched:Q,setValues:Z,submitForm:de,validateForm:H,validateField:Y,isValid:ye,dirty:me,unregisterField:J,registerField:z,getFieldProps:he,validateOnBlur:s,validateOnChange:a})}(e),a=e.component,u=e.children,s=e.render;return t.createElement(F,{value:i},a?t.createElement(a,i):s?s(i):u?f(u)?u(i):y(u)?null:t.Children.only(u):null)}function A(e){var t={};if(0===e.inner.length)return T(t,e.path,e.message);var r=e.inner,n=Array.isArray(r),i=0;for(r=n?r:r[Symbol.iterator]();;){var a;if(n){if(i>=r.length)break;a=r[i++]}else{if((i=r.next()).done)break;a=i.value}t[a.path]||(t=T(t,a.path,a.message))}return t}function x(e,t,r,n){void 0===r&&(r=!1),void 0===n&&(n={});var i={};for(var a in e)if(e.hasOwnProperty(a)){var o=String(a);i[o]=""!==e[o]?e[o]:void 0}return t[r?"validateSync":"validate"](i,{abortEarly:!1,context:n})}function V(e,t,r){var i=e.slice();return t.forEach(function(t,a){if(void 0===i[a]){var o=!1!==r.clone&&r.isMergeableObject(t);i[a]=o?n(Array.isArray(t)?[]:{},t,r):t}else r.isMergeableObject(t)?i[a]=n(e[a],t,r):-1===e.indexOf(t)&&i.push(t)}),i}function U(e,r){var n=t.useRef(function(){throw new Error("Cannot call an event handler while rendering.")});return t.useEffect(function(){n.current=e},[e].concat(r)),t.useCallback(function(){return n.current.apply(void 0,arguments)},[n])}function D(e){var r=e.validate,n=e.name,i=e.render,a=e.children,o=e.as,u=e.component,s=d(e,["validate","name","render","children","as","component"]),c=d(R(),["validate","validationSchema"]);t.useEffect(function(){},[]),t.useEffect(function(){return c.registerField(n,{validate:r}),function(){c.unregisterField(n)}},[c,n,r]);var p=c.getFieldProps(n,s.type),v=p[0],h=p[1],m={field:v,form:c};if(i)return i(m);if(f(a))return a(l({},m,{meta:h}));if(u){if("string"==typeof u){var y=s.innerRef,S=d(s,["innerRef"]);return t.createElement(u,l({ref:y},v,S),a)}return t.createElement(u,l({field:v,form:c},s),a)}var E=o||"input";if("string"==typeof E){var T=s.innerRef,b=d(s,["innerRef"]);return t.createElement(E,l({ref:T},v,b),a)}return t.createElement(E,l({},v,s),a)}var L=D;function M(e){var r=R();return t.createElement("form",Object.assign({onSubmit:r.handleSubmit,onReset:r.handleReset},e))}function w(e){var r=function(r){return t.createElement(_,null,function(n){return t.createElement(e,Object.assign({},r,{formik:n}))})},n=e.displayName||e.name||e.constructor&&e.constructor.name||"Component";return r.WrappedComponent=e,r.displayName="FormikConnect("+n+")",u(r,e)}M.displayName="Form";var j=function(e,t,r){var n=[].concat(e||[]),i=n[t];return n.splice(t,1),n.splice(r,0,i),n},N=function(e,t,r){var n=[].concat(e||[]),i=n[t];return n[t]=n[r],n[r]=i,n},B=function(e,t,r){var n=[].concat(e||[]);return n.splice(t,0,r),n},q=function(e,t,r){var n=[].concat(e||[]);return n[t]=r,n},G=function(e){function r(t){var r;return(r=e.call(this,t)||this).updateArrayField=function(e,t,n){var i=r.props,a=i.name,o=i.validateOnChange,u=i.formik,s=u.validateForm;(0,u.setFormikState)(function(r){var i="function"==typeof n?n:e,o="function"==typeof t?t:e;return l({},r,{values:T(r.values,a,e(E(r.values,a))),errors:n?T(r.errors,a,i(E(r.errors,a))):r.errors,touched:t?T(r.touched,a,o(E(r.touched,a))):r.touched})},function(){o&&s()})},r.push=function(e){return r.updateArrayField(function(t){return[].concat(t||[],[s(e)])},!1,!1)},r.handlePush=function(e){return function(){return r.push(e)}},r.swap=function(e,t){return r.updateArrayField(function(r){return N(r,e,t)},!0,!0)},r.handleSwap=function(e,t){return function(){return r.swap(e,t)}},r.move=function(e,t){return r.updateArrayField(function(r){return j(r,e,t)},!0,!0)},r.handleMove=function(e,t){return function(){return r.move(e,t)}},r.insert=function(e,t){return r.updateArrayField(function(r){return B(r,e,t)},function(t){return B(t,e,null)},function(t){return B(t,e,null)})},r.handleInsert=function(e,t){return function(){return r.insert(e,t)}},r.replace=function(e,t){return r.updateArrayField(function(r){return q(r,e,t)},!1,!1)},r.handleReplace=function(e,t){return function(){return r.replace(e,t)}},r.unshift=function(e){var t=-1;return r.updateArrayField(function(r){var n=r?[e].concat(r):[e];return t<0&&(t=n.length),n},function(e){var r=e?[null].concat(e):[null];return t<0&&(t=r.length),r},function(e){var r=e?[null].concat(e):[null];return t<0&&(t=r.length),r}),t},r.handleUnshift=function(e){return function(){return r.unshift(e)}},r.handleRemove=function(e){return function(){return r.remove(e)}},r.handlePop=function(){return function(){return r.pop()}},r.remove=r.remove.bind(p(r)),r.pop=r.pop.bind(p(r)),r}c(r,e);var n=r.prototype;return n.remove=function(e){var t;return this.updateArrayField(function(r){var n=r?[].concat(r):[];return t||(t=n[e]),f(n.splice)&&n.splice(e,1),n},!0,!0),t},n.pop=function(){var e;return this.updateArrayField(function(t){var r=t;return e||(e=r&&r.pop&&r.pop()),r},!0,!0),e},n.render=function(){var e=this.props,r=e.component,n=e.render,i=e.children,a=e.name,o=l({},{push:this.push,pop:this.pop,swap:this.swap,move:this.move,insert:this.insert,replace:this.replace,unshift:this.unshift,remove:this.remove,handlePush:this.handlePush,handlePop:this.handlePop,handleSwap:this.handleSwap,handleMove:this.handleMove,handleInsert:this.handleInsert,handleReplace:this.handleReplace,handleUnshift:this.handleUnshift,handleRemove:this.handleRemove},{form:d(e.formik,["validate","validationSchema"]),name:a});return r?t.createElement(r,o):n?n(o):i?"function"==typeof i?i(o):y(i)?null:t.Children.only(i):null},r}(t.Component);G.defaultProps={validateOnChange:!0};var W=w(G);exports.ErrorMessage=w(function(e){function r(){return e.apply(this,arguments)||this}c(r,e);var n=r.prototype;return n.shouldComponentUpdate=function(e){return E(this.props.formik.errors,this.props.name)!==E(e.formik.errors,this.props.name)||E(this.props.formik.touched,this.props.name)!==E(e.formik.touched,this.props.name)||Object.keys(this.props).length!==Object.keys(e).length},n.render=function(){var e=this.props,r=e.component,n=e.formik,i=e.render,a=e.children,o=e.name,u=d(e,["component","formik","render","children","name"]),s=E(n.touched,o),l=E(n.errors,o);return s&&l?i?f(i)?i(l):null:a?f(a)?a(l):null:r?t.createElement(r,u,l):l:null},r}(t.Component)),exports.FastField=L,exports.Field=D,exports.FieldArray=W,exports.Form=M,exports.Formik=P,exports.FormikConsumer=_,exports.FormikProvider=F,exports.connect=w,exports.getActiveElement=function(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}},exports.getIn=E,exports.insert=B,exports.isEmptyChildren=y,exports.isFunction=f,exports.isInputEvent=function(e){return e&&v(e)&&v(e.target)},exports.isInteger=h,exports.isNaN=function(e){return e!=e},exports.isObject=v,exports.isPromise=S,exports.isString=m,exports.move=j,exports.replace=q,exports.setIn=T,exports.setNestedObjectValues=b,exports.swap=N,exports.useField=function(e,t){return R().getFieldProps(e,t)},exports.useFormikContext=R,exports.validateYupSchema=x,exports.withFormik=function(e){var r=e.mapPropsToValues,n=void 0===r?function(e){var t={};for(var r in e)e.hasOwnProperty(r)&&"function"!=typeof e[r]&&(t[r]=e[r]);return t}:r,i=d(e,["mapPropsToValues"]);return function(e){var r=e.displayName||e.name||e.constructor&&e.constructor.name||"Component",a=function(r){function a(){var n;return(n=r.apply(this,arguments)||this).validate=function(e){return i.validate(e,n.props)},n.validationSchema=function(){return f(i.validationSchema)?i.validationSchema(n.props):i.validationSchema},n.handleSubmit=function(e,t){return i.handleSubmit(e,l({},t,{props:n.props}))},n.renderFormComponent=function(r){return t.createElement(e,Object.assign({},n.props,r))},n}return c(a,r),a.prototype.render=function(){var e=d(this.props,["children"]);return t.createElement(P,Object.assign({},e,i,{validate:i.validate&&this.validate,validationSchema:i.validationSchema&&this.validationSchema,initialValues:n(this.props),initialStatus:i.mapPropsToStatus&&i.mapPropsToStatus(this.props),initialErrors:i.mapPropsToErrors&&i.mapPropsToErrors(this.props),initialTouched:i.mapPropsToTouched&&i.mapPropsToTouched(this.props),onSubmit:this.handleSubmit,render:this.renderFormComponent}))},a}(t.Component);return a.displayName="WithFormik("+r+")",u(a,e)}},exports.yupToFormErrors=A;
//# sourceMappingURL=formik.cjs.production.js.map