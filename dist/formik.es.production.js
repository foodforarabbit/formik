import*as e from"react";import{Children as t,useContext as n,createContext as r,createElement as i,useRef as a,useEffect as o,useReducer as u,useCallback as l,useMemo as s,Component as c}from"react";import d from"react-fast-compare";import p from"deepmerge";import f from"lodash-es/clone";import v from"lodash-es/toPath";import"tiny-warning";import{unstable_runWithPriority as h,LowPriority as m}from"scheduler";import y from"hoist-non-react-statics";import S from"lodash-es/cloneDeep";function E(){return(E=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function T(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t}function g(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t.indexOf(n=a[r])>=0||(i[n]=e[n]);return i}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var _=function(e){return"function"==typeof e},F=function(e){return null!==e&&"object"==typeof e},O=function(e){return String(Math.floor(Number(e)))===e},R=function(e){return"[object String]"===Object.prototype.toString.call(e)},I=function(e){return e!=e},A=function(e){return 0===t.count(e)},P=function(e){return F(e)&&_(e.then)},C=function(e){return e&&F(e)&&F(e.target)};function V(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function U(e,t,n,r){void 0===r&&(r=0);for(var i=v(t);e&&r<i.length;)e=e[i[r++]];return void 0===e?n:e}function k(e,t,n){for(var r=f(e),i=r,a=0,o=v(t);a<o.length-1;a++){var u=o[a],l=U(e,o.slice(0,a+1));if(l)i=i[u]=f(l);else{var s=o[a+1];i=i[u]=O(s)&&Number(s)>=0?[]:{}}}return(0===a?e:i)[o[a]]===n?e:(void 0===n?delete i[o[a]]:i[o[a]]=n,0===a&&void 0===n&&delete r[o[a]],r)}function D(e,t,n,r){void 0===n&&(n=new WeakMap),void 0===r&&(r={});for(var i=0,a=Object.keys(e);i<a.length;i++){var o=a[i],u=e[o];F(u)?n.get(u)||(n.set(u,!0),r[o]=Array.isArray(u)?[]:{},D(u,t,n,r[o])):r[o]=t}return r}var L=r({}),M=L.Provider,w=L.Consumer;function j(){return n(L)}function N(e,t){switch(t.type){case"SET_VALUES":return E({},e,{values:t.payload});case"SET_TOUCHED":return E({},e,{touched:t.payload});case"SET_ERRORS":return E({},e,{errors:t.payload});case"SET_STATUS":return E({},e,{status:t.payload});case"SET_ISSUBMITTING":return E({},e,{isSubmitting:t.payload});case"SET_ISVALIDATING":return E({},e,{isValidating:t.payload});case"SET_FIELD_VALUE":return E({},e,{values:k(e.values,t.payload.field,t.payload.value)});case"SET_FIELD_TOUCHED":return E({},e,{touched:k(e.touched,t.payload.field,t.payload.value)});case"SET_FIELD_ERROR":return E({},e,{errors:k(e.errors,t.payload.field,t.payload.value)});case"RESET_FORM":case"SET_FORMIK_STATE":return E({},e,t.payload);case"SUBMIT_ATTEMPT":return E({},e,{touched:D(e.values,!0),isSubmitting:!0,submitCount:e.submitCount+1});case"SUBMIT_FAILURE":case"SUBMIT_SUCCESS":return E({},e,{isSubmitting:!1});default:return e}}var B={},x={},G={};function W(e){var n=function(e){var t=e.validateOnChange,n=void 0===t||t,r=e.validateOnBlur,i=void 0===r||r,c=e.isInitialValid,f=e.enableReinitialize,v=void 0!==f&&f,y=e.onSubmit,S=g(e,["validateOnChange","validateOnBlur","isInitialValid","enableReinitialize","onSubmit"]),T=E({validateOnChange:n,validateOnBlur:i,onSubmit:y},S),b=a(T.initialValues),F=a(T.initialErrors||B),O=a(T.initialTouched||x),I=a(T.initialStatus),A=a(!1),C=a(G);o(function(){},[c]),o(function(){return A.current=!0,function(){A.current=!1}},[]);var V=u(N,{values:T.initialValues,errors:T.initialErrors||{},touched:T.initialTouched||{},status:T.initialStatus,isSubmitting:!1,isValidating:!1,submitCount:0}),D=V[0],L=V[1],M=l(function(e,t){return new Promise(function(n){var r=T.validate(e,t);void 0===r?n(B):P(r)?r.then(function(){n(B)},function(e){n(e)}):n(r)})},[T.validate]),w=l(function(e,t){return new Promise(function(n){var r=T.validationSchema,i=_(r)?r(t):r;(t&&i.validateAt?i.validateAt(t,e):K(e,i)).then(function(){n(B)},function(e){n(H(e))})})},[T.validationSchema]),j=l(function(e,t){return new Promise(function(n){return n(C.current[e].validate(t))})},[]),W=l(function(e){var t=Object.keys(C.current).filter(function(e){return _(C.current[e].validate)}),n=t.length>0?t.map(function(t){return j(t,U(e,t))}):[Promise.resolve("DO_NOT_DELETE_YOU_WILL_BE_FIRED")];return Promise.all(n).then(function(e){return e.reduce(function(e,n,r){return"DO_NOT_DELETE_YOU_WILL_BE_FIRED"===n?e:(n&&(e=k(e,t[r],n)),e)},{})})},[j]),q=l(function(e){return Promise.all([W(e),T.validationSchema?w(e):{},T.validate?M(e):{}]).then(function(e){return p.all([e[0],e[1],e[2]],{arrayMerge:z})})},[T.validate,T.validationSchema,W,M,w]),J=Y(function(e){return void 0===e&&(e=D.values),h(m,function(){return q(e).then(function(e){return A.current&&L({type:"SET_ERRORS",payload:e}),e})})},[q,D.values]),Q=Y(function(e){return void 0===e&&(e=D.values),L({type:"SET_ISVALIDATING",payload:!0}),q(e).then(function(e){return A.current&&(L({type:"SET_ISVALIDATING",payload:!1}),d(D.errors,e)||L({type:"SET_ERRORS",payload:e})),e})},[D.values,D.errors,q]),X=l(function(e){var t=e&&e.values?e.values:b.current,n=e&&e.errors?e.errors:F.current?F.current:T.initialErrors||{},r=e&&e.touched?e.touched:O.current?O.current:T.initialTouched||{},i=e&&e.status?e.status:I.current?I.current:T.initialStatus;b.current=t,F.current=n,O.current=r,I.current=i,L({type:"RESET_FORM",payload:{isSubmitting:!!e&&!!e.isSubmitting,errors:n,touched:r,status:i,values:t,isValidating:!!e&&!!e.isValidating,submitCount:e&&e.submitCount&&"number"==typeof e.submitCount?e.submitCount:0}})},[T.initialErrors,T.initialStatus,T.initialTouched,T.initialValues]);o(function(){v&&!0===A.current&&!d(b.current,T.initialValues)&&(b.current=T.initialValues,X())},[v,T.initialValues,X]);var Z=Y(function(e){if(_(C.current[e].validate)){var t=U(D.values,e),n=C.current[e].validate(t);return P(n)?(L({type:"SET_ISVALIDATING",payload:!0}),n.then(function(e){return e},function(e){return e}).then(function(t){L({type:"SET_FIELD_ERROR",payload:{field:e,value:t}}),L({type:"SET_ISVALIDATING",payload:!1})})):(L({type:"SET_FIELD_ERROR",payload:{field:e,value:n}}),Promise.resolve(n))}return Promise.resolve()},[D.values]),$=l(function(e,t){C.current[e]={validate:t.validate}},[]),ee=l(function(e){delete C.current[e]},[]),te=Y(function(e){return L({type:"SET_TOUCHED",payload:e}),i?J(D.values):Promise.resolve()},[J,D.values,i]),ne=l(function(e){L({type:"SET_ERRORS",payload:e})},[]),re=Y(function(e){return L({type:"SET_VALUES",payload:e}),n?J(D.values):Promise.resolve()},[J,D.values,n]),ie=l(function(e,t){L({type:"SET_FIELD_ERROR",payload:{field:e,value:t}})},[]),ae=Y(function(e,t,r){return void 0===r&&(r=!0),L({type:"SET_FIELD_VALUE",payload:{field:e,value:t}}),n&&r?J(k(D.values,e,t)):Promise.resolve()},[J,D.values,n]),oe=l(function(e,t){var n,r=t,i=e;if(!R(e)){e.persist&&e.persist();var a=e.target,o=a.type,u=a.value,l=a.checked;r=t||a.name||a.id,i=/number|range/.test(o)?(n=parseFloat(u),isNaN(n)?"":n):/checkbox/.test(o)?l:u}r&&ae(r,i)},[ae]),ue=l(function(e){if(R(e))return function(t){return oe(t,e)};oe(e)},[oe]),le=Y(function(e,t,n){return void 0===t&&(t=!0),void 0===n&&(n=!0),L({type:"SET_FIELD_TOUCHED",payload:{field:e,value:t}}),i&&n?J(D.values):Promise.resolve()},[J,D.values,i]),se=l(function(e,t){e.persist&&e.persist();var n=e.target;le(t||n.name||n.id,!0)},[le]),ce=l(function(e){if(R(e))return function(t){return se(t,e)};se(e)},[se]);function de(e){_(e)?L({type:"SET_FORMIK_STATE",payload:e(D)}):L({type:"SET_FORMIK_STATE",payload:e})}var pe=l(function(e){L({type:"SET_STATUS",payload:e})},[]),fe=l(function(e){L({type:"SET_ISSUBMITTING",payload:e})},[]),ve={resetForm:X,validateForm:Q,validateField:Z,setErrors:ne,setFieldError:ie,setFieldTouched:le,setFieldValue:ae,setStatus:pe,setSubmitting:fe,setTouched:te,setValues:re,setFormikState:de},he=Y(function(){return y(D.values,ve)},[ve,y,D.values]),me=Y(function(){return L({type:"SUBMIT_ATTEMPT"}),Q().then(function(e){if(0===Object.keys(e).length)return Promise.resolve(he()).then(function(){A.current&&L({type:"SUBMIT_SUCCESS"})}).catch(function(e){A.current&&L({type:"SUBMIT_FAILURE"})});A.current&&L({type:"SUBMIT_FAILURE"})})},[he,Q]),ye=Y(function(e){e&&e.preventDefault&&_(e.preventDefault)&&e.preventDefault(),e&&e.stopPropagation&&_(e.stopPropagation)&&e.stopPropagation(),me()},[me]),Se=Y(function(){if(T.onReset){var e=T.onReset(D.values,ve);P(e)?e.then(X):X()}else X()},[ve,T.onReset,X,D.values]),Ee=l(function(e){return{value:U(D.values,e),error:U(D.errors,e),touched:!!U(D.touched,e),initialValue:U(b.current,e),initialTouched:!!U(O.current,e),initialError:U(F.current,e)}},[D.errors,D.touched,D.values]),Te=l(function(e,t){return[{name:e,value:!t||"radio"!==t&&"checkbox"!==t?U(D.values,e):void 0,onChange:ue,onBlur:ce},Ee(e)]},[Ee,ce,ue,D.values]),ge=s(function(){return!d(b.current,D.values)},[D.values]),be=s(function(){return void 0!==c?ge?D.errors&&0===Object.keys(D.errors).length:!1!==c&&_(c)?c(T):c:D.errors&&0===Object.keys(D.errors).length},[c,ge,D.errors,T]);return E({},D,{initialValues:b.current,initialErrors:F.current,initialTouched:O.current,initialStatus:I.current,handleBlur:ce,handleChange:ue,handleReset:Se,handleSubmit:ye,resetForm:X,setErrors:ne,setFormikState:de,setFieldTouched:le,setFieldValue:ae,setFieldError:ie,setStatus:pe,setSubmitting:fe,setTouched:te,setValues:re,submitForm:me,validateForm:Q,validateField:Z,isValid:be,dirty:ge,unregisterField:ee,registerField:$,getFieldProps:Te,validateOnBlur:i,validateOnChange:n})}(e),r=e.component,c=e.children,f=e.render;return i(M,{value:n},r?i(r,n):f?f(n):c?_(c)?c(n):A(c)?null:t.only(c):null)}function H(e){var t={};if(0===e.inner.length)return k(t,e.path,e.message);var n=e.inner,r=Array.isArray(n),i=0;for(n=r?n:n[Symbol.iterator]();;){var a;if(r){if(i>=n.length)break;a=n[i++]}else{if((i=n.next()).done)break;a=i.value}t[a.path]||(t=k(t,a.path,a.message))}return t}function K(e,t,n,r){void 0===n&&(n=!1),void 0===r&&(r={});var i={};for(var a in e)if(e.hasOwnProperty(a)){var o=String(a);i[o]=""!==e[o]?e[o]:void 0}return t[n?"validateSync":"validate"](i,{abortEarly:!1,context:r})}function z(e,t,n){var r=e.slice();return t.forEach(function(t,i){if(void 0===r[i]){var a=!1!==n.clone&&n.isMergeableObject(t);r[i]=a?p(Array.isArray(t)?[]:{},t,n):t}else n.isMergeableObject(t)?r[i]=p(e[i],t,n):-1===e.indexOf(t)&&r.push(t)}),r}function Y(e,t){var n=a(function(){throw new Error("Cannot call an event handler while rendering.")});return o(function(){n.current=e},[e].concat(t)),l(function(){return n.current.apply(void 0,arguments)},[n])}function q(e,t){return j().getFieldProps(e,t)}function J(e){var t=e.validate,n=e.name,r=e.render,a=e.children,u=e.as,l=e.component,s=g(e,["validate","name","render","children","as","component"]),c=g(j(),["validate","validationSchema"]);o(function(){},[]),o(function(){return c.registerField(n,{validate:t}),function(){c.unregisterField(n)}},[c,n,t]);var d=c.getFieldProps(n,s.type),p=d[0],f=d[1],v={field:p,form:c};if(r)return r(v);if(_(a))return a(E({},v,{meta:f}));if(l){if("string"==typeof l){var h=s.innerRef,m=g(s,["innerRef"]);return i(l,E({ref:h},p,m),a)}return i(l,E({field:p,form:c},s),a)}var y=u||"input";if("string"==typeof y){var S=s.innerRef,T=g(s,["innerRef"]);return i(y,E({ref:S},p,T),a)}return i(y,E({},p,s),a)}var Q=J;function X(e){var t=j();return i("form",Object.assign({onSubmit:t.handleSubmit,onReset:t.handleReset},e))}function Z(e){var t=e.mapPropsToValues,n=void 0===t?function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&"function"!=typeof e[n]&&(t[n]=e[n]);return t}:t,r=g(e,["mapPropsToValues"]);return function(e){var t=e.displayName||e.name||e.constructor&&e.constructor.name||"Component",a=function(t){function a(){var n;return(n=t.apply(this,arguments)||this).validate=function(e){return r.validate(e,n.props)},n.validationSchema=function(){return _(r.validationSchema)?r.validationSchema(n.props):r.validationSchema},n.handleSubmit=function(e,t){return r.handleSubmit(e,E({},t,{props:n.props}))},n.renderFormComponent=function(t){return i(e,Object.assign({},n.props,t))},n}return T(a,t),a.prototype.render=function(){var e=g(this.props,["children"]);return i(W,Object.assign({},e,r,{validate:r.validate&&this.validate,validationSchema:r.validationSchema&&this.validationSchema,initialValues:n(this.props),initialStatus:r.mapPropsToStatus&&r.mapPropsToStatus(this.props),initialErrors:r.mapPropsToErrors&&r.mapPropsToErrors(this.props),initialTouched:r.mapPropsToTouched&&r.mapPropsToTouched(this.props),onSubmit:this.handleSubmit,render:this.renderFormComponent}))},a}(c);return a.displayName="WithFormik("+t+")",y(a,e)}}function $(e){var t=function(t){return i(w,null,function(n){return i(e,Object.assign({},t,{formik:n}))})},n=e.displayName||e.name||e.constructor&&e.constructor.name||"Component";return t.WrappedComponent=e,t.displayName="FormikConnect("+n+")",y(t,e)}X.displayName="Form";var ee=function(e,t,n){var r=[].concat(e||[]),i=r[t];return r.splice(t,1),r.splice(n,0,i),r},te=function(e,t,n){var r=[].concat(e||[]),i=r[t];return r[t]=r[n],r[n]=i,r},ne=function(e,t,n){var r=[].concat(e||[]);return r.splice(t,0,n),r},re=function(e,t,n){var r=[].concat(e||[]);return r[t]=n,r},ie=function(e){function n(t){var n;return(n=e.call(this,t)||this).updateArrayField=function(e,t,r){var i=n.props,a=i.name,o=i.validateOnChange,u=i.formik,l=u.validateForm;(0,u.setFormikState)(function(n){var i="function"==typeof r?r:e,o="function"==typeof t?t:e;return E({},n,{values:k(n.values,a,e(U(n.values,a))),errors:r?k(n.errors,a,i(U(n.errors,a))):n.errors,touched:t?k(n.touched,a,o(U(n.touched,a))):n.touched})},function(){o&&l()})},n.push=function(e){return n.updateArrayField(function(t){return[].concat(t||[],[S(e)])},!1,!1)},n.handlePush=function(e){return function(){return n.push(e)}},n.swap=function(e,t){return n.updateArrayField(function(n){return te(n,e,t)},!0,!0)},n.handleSwap=function(e,t){return function(){return n.swap(e,t)}},n.move=function(e,t){return n.updateArrayField(function(n){return ee(n,e,t)},!0,!0)},n.handleMove=function(e,t){return function(){return n.move(e,t)}},n.insert=function(e,t){return n.updateArrayField(function(n){return ne(n,e,t)},function(t){return ne(t,e,null)},function(t){return ne(t,e,null)})},n.handleInsert=function(e,t){return function(){return n.insert(e,t)}},n.replace=function(e,t){return n.updateArrayField(function(n){return re(n,e,t)},!1,!1)},n.handleReplace=function(e,t){return function(){return n.replace(e,t)}},n.unshift=function(e){var t=-1;return n.updateArrayField(function(n){var r=n?[e].concat(n):[e];return t<0&&(t=r.length),r},function(e){var n=e?[null].concat(e):[null];return t<0&&(t=n.length),n},function(e){var n=e?[null].concat(e):[null];return t<0&&(t=n.length),n}),t},n.handleUnshift=function(e){return function(){return n.unshift(e)}},n.handleRemove=function(e){return function(){return n.remove(e)}},n.handlePop=function(){return function(){return n.pop()}},n.remove=n.remove.bind(b(n)),n.pop=n.pop.bind(b(n)),n}T(n,e);var r=n.prototype;return r.remove=function(e){var t;return this.updateArrayField(function(n){var r=n?[].concat(n):[];return t||(t=r[e]),_(r.splice)&&r.splice(e,1),r},!0,!0),t},r.pop=function(){var e;return this.updateArrayField(function(t){var n=t;return e||(e=n&&n.pop&&n.pop()),n},!0,!0),e},r.render=function(){var e=this.props,n=e.component,r=e.render,a=e.children,o=e.name,u=E({},{push:this.push,pop:this.pop,swap:this.swap,move:this.move,insert:this.insert,replace:this.replace,unshift:this.unshift,remove:this.remove,handlePush:this.handlePush,handlePop:this.handlePop,handleSwap:this.handleSwap,handleMove:this.handleMove,handleInsert:this.handleInsert,handleReplace:this.handleReplace,handleUnshift:this.handleUnshift,handleRemove:this.handleRemove},{form:g(e.formik,["validate","validationSchema"]),name:o});return n?i(n,u):r?r(u):a?"function"==typeof a?a(u):A(a)?null:t.only(a):null},n}(c);ie.defaultProps={validateOnChange:!0};var ae=$(ie),oe=$(function(e){function t(){return e.apply(this,arguments)||this}T(t,e);var n=t.prototype;return n.shouldComponentUpdate=function(e){return U(this.props.formik.errors,this.props.name)!==U(e.formik.errors,this.props.name)||U(this.props.formik.touched,this.props.name)!==U(e.formik.touched,this.props.name)||Object.keys(this.props).length!==Object.keys(e).length},n.render=function(){var e=this.props,t=e.component,n=e.formik,r=e.render,a=e.children,o=e.name,u=g(e,["component","formik","render","children","name"]),l=U(n.touched,o),s=U(n.errors,o);return l&&s?r?_(r)?r(s):null:a?_(a)?a(s):null:t?i(t,u,s):s:null},t}(c));export{oe as ErrorMessage,Q as FastField,J as Field,ae as FieldArray,X as Form,W as Formik,w as FormikConsumer,M as FormikProvider,$ as connect,V as getActiveElement,U as getIn,ne as insert,A as isEmptyChildren,_ as isFunction,C as isInputEvent,O as isInteger,I as isNaN,F as isObject,P as isPromise,R as isString,ee as move,re as replace,k as setIn,D as setNestedObjectValues,te as swap,q as useField,j as useFormikContext,K as validateYupSchema,Z as withFormik,H as yupToFormErrors};
//# sourceMappingURL=formik.es.production.js.map