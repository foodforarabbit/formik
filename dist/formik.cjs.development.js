'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var isEqual = _interopDefault(require('react-fast-compare'));
var deepmerge = _interopDefault(require('deepmerge'));
var clone = _interopDefault(require('lodash/clone'));
var toPath = _interopDefault(require('lodash/toPath'));
var invariant = _interopDefault(require('tiny-warning'));
var scheduler = require('scheduler');
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));
var cloneDeep = _interopDefault(require('lodash/cloneDeep'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};
var isObject = function isObject(obj) {
  return obj !== null && typeof obj === 'object';
};
var isInteger = function isInteger(obj) {
  return String(Math.floor(Number(obj))) === obj;
};
var isString = function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
};
var isNaN$1 = function isNaN(obj) {
  return obj !== obj;
};
var isEmptyChildren = function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
};
var isPromise = function isPromise(value) {
  return isObject(value) && isFunction(value.then);
};
var isInputEvent = function isInputEvent(value) {
  return value && isObject(value) && isObject(value.target);
};
function getActiveElement(doc) {
  doc = doc || (typeof document !== 'undefined' ? document : undefined);

  if (typeof doc === 'undefined') {
    return null;
  }

  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
function getIn(obj, key, def, p) {
  if (p === void 0) {
    p = 0;
  }

  var path = toPath(key);

  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }

  return obj === undefined ? def : obj;
}
function setIn(obj, path, value) {
  var res = clone(obj);
  var resVal = res;
  var i = 0;
  var pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    var currentPath = pathArray[i];
    var currentObj = getIn(obj, pathArray.slice(0, i + 1));

    if (currentObj) {
      resVal = resVal[currentPath] = clone(currentObj);
    } else {
      var nextPath = pathArray[i + 1];
      resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }

  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }

  if (value === undefined) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }

  if (i === 0 && value === undefined) {
    delete res[pathArray[i]];
  }

  return res;
}
function setNestedObjectValues(object, value, visited, response) {
  if (visited === void 0) {
    visited = new WeakMap();
  }

  if (response === void 0) {
    response = {};
  }

  for (var _i = 0, _Object$keys = Object.keys(object); _i < _Object$keys.length; _i++) {
    var k = _Object$keys[_i];
    var val = object[k];

    if (isObject(val)) {
      if (!visited.get(val)) {
        visited.set(val, true);
        response[k] = Array.isArray(val) ? [] : {};
        setNestedObjectValues(val, value, visited, response[k]);
      }
    } else {
      response[k] = value;
    }
  }

  return response;
}

var PrivateFormikContext =
/*#__PURE__*/
React.createContext({});
var FormikProvider = PrivateFormikContext.Provider;
var FormikConsumer = PrivateFormikContext.Consumer;
function useFormikContext() {
  return React.useContext(PrivateFormikContext);
}

function formikReducer(state, msg) {
  switch (msg.type) {
    case 'SET_VALUES':
      return _extends({}, state, {
        values: msg.payload
      });

    case 'SET_TOUCHED':
      return _extends({}, state, {
        touched: msg.payload
      });

    case 'SET_ERRORS':
      return _extends({}, state, {
        errors: msg.payload
      });

    case 'SET_STATUS':
      return _extends({}, state, {
        status: msg.payload
      });

    case 'SET_ISSUBMITTING':
      return _extends({}, state, {
        isSubmitting: msg.payload
      });

    case 'SET_ISVALIDATING':
      return _extends({}, state, {
        isValidating: msg.payload
      });

    case 'SET_FIELD_VALUE':
      return _extends({}, state, {
        values: setIn(state.values, msg.payload.field, msg.payload.value)
      });

    case 'SET_FIELD_TOUCHED':
      return _extends({}, state, {
        touched: setIn(state.touched, msg.payload.field, msg.payload.value)
      });

    case 'SET_FIELD_ERROR':
      return _extends({}, state, {
        errors: setIn(state.errors, msg.payload.field, msg.payload.value)
      });

    case 'RESET_FORM':
    case 'SET_FORMIK_STATE':
      return _extends({}, state, msg.payload);

    case 'SUBMIT_ATTEMPT':
      return _extends({}, state, {
        touched: setNestedObjectValues(state.values, true),
        isSubmitting: true,
        submitCount: state.submitCount + 1
      });

    case 'SUBMIT_FAILURE':
      return _extends({}, state, {
        isSubmitting: false
      });

    case 'SUBMIT_SUCCESS':
      return _extends({}, state, {
        isSubmitting: false
      });

    default:
      return state;
  }
}

var emptyErrors = {};
var emptyTouched = {};
var emptyFieldRegistry = {};

function useFormikInternal(_ref) {
  var _ref$validateOnChange = _ref.validateOnChange,
      validateOnChange = _ref$validateOnChange === void 0 ? true : _ref$validateOnChange,
      _ref$validateOnBlur = _ref.validateOnBlur,
      validateOnBlur = _ref$validateOnBlur === void 0 ? true : _ref$validateOnBlur,
      isInitialValid = _ref.isInitialValid,
      _ref$enableReinitiali = _ref.enableReinitialize,
      enableReinitialize = _ref$enableReinitiali === void 0 ? false : _ref$enableReinitiali,
      onSubmit = _ref.onSubmit,
      rest = _objectWithoutPropertiesLoose(_ref, ["validateOnChange", "validateOnBlur", "isInitialValid", "enableReinitialize", "onSubmit"]);

  var props = _extends({
    validateOnChange: validateOnChange,
    validateOnBlur: validateOnBlur,
    onSubmit: onSubmit
  }, rest);

  var initialValues = React.useRef(props.initialValues);
  var initialErrors = React.useRef(props.initialErrors || emptyErrors);
  var initialTouched = React.useRef(props.initialTouched || emptyTouched);
  var initialStatus = React.useRef(props.initialStatus);
  var isMounted = React.useRef(false);
  var fieldRegistry = React.useRef(emptyFieldRegistry);
  React.useEffect(function () {
    {
      !(typeof isInitialValid === 'undefined') ? invariant(false, 'isInitialValid has been deprecated and will be removed in future versions of Formik. Please use initialErrors instead.') : void 0;
    }
  }, [isInitialValid]);
  React.useEffect(function () {
    isMounted.current = true;
    return function () {
      isMounted.current = false;
    };
  }, []);

  var _React$useReducer = React.useReducer(formikReducer, {
    values: props.initialValues,
    errors: props.initialErrors || {},
    touched: props.initialTouched || {},
    status: props.initialStatus,
    isSubmitting: false,
    isValidating: false,
    submitCount: 0
  }),
      state = _React$useReducer[0],
      dispatch = _React$useReducer[1];

  var runValidateHandler = React.useCallback(function (values, field) {
    return new Promise(function (resolve) {
      var maybePromisedErrors = props.validate(values, field);

      if (maybePromisedErrors === undefined) {
        resolve(emptyErrors);
      } else if (isPromise(maybePromisedErrors)) {
        maybePromisedErrors.then(function () {
          resolve(emptyErrors);
        }, function (errors) {
          resolve(errors);
        });
      } else {
        resolve(maybePromisedErrors);
      }
    });
  }, [props.validate]);
  var runValidationSchema = React.useCallback(function (values, field) {
    return new Promise(function (resolve) {
      var validationSchema = props.validationSchema;
      var schema = isFunction(validationSchema) ? validationSchema(field) : validationSchema;
      var promise = field && schema.validateAt ? schema.validateAt(field, values) : validateYupSchema(values, schema);
      promise.then(function () {
        resolve(emptyErrors);
      }, function (err) {
        resolve(yupToFormErrors(err));
      });
    });
  }, [props.validationSchema]);
  var runSingleFieldLevelValidation = React.useCallback(function (field, value) {
    return new Promise(function (resolve) {
      return resolve(fieldRegistry.current[field].validate(value));
    });
  }, []);
  var runFieldLevelValidations = React.useCallback(function (values) {
    var fieldKeysWithValidation = Object.keys(fieldRegistry.current).filter(function (f) {
      return isFunction(fieldRegistry.current[f].validate);
    });
    var fieldValidations = fieldKeysWithValidation.length > 0 ? fieldKeysWithValidation.map(function (f) {
      return runSingleFieldLevelValidation(f, getIn(values, f));
    }) : [Promise.resolve('DO_NOT_DELETE_YOU_WILL_BE_FIRED')];
    return Promise.all(fieldValidations).then(function (fieldErrorsList) {
      return fieldErrorsList.reduce(function (prev, curr, index) {
        if (curr === 'DO_NOT_DELETE_YOU_WILL_BE_FIRED') {
          return prev;
        }

        if (curr) {
          prev = setIn(prev, fieldKeysWithValidation[index], curr);
        }

        return prev;
      }, {});
    });
  }, [runSingleFieldLevelValidation]);
  var runAllValidations = React.useCallback(function (values) {
    return Promise.all([runFieldLevelValidations(values), props.validationSchema ? runValidationSchema(values) : {}, props.validate ? runValidateHandler(values) : {}]).then(function (_ref2) {
      var fieldErrors = _ref2[0],
          schemaErrors = _ref2[1],
          validateErrors = _ref2[2];
      var combinedErrors = deepmerge.all([fieldErrors, schemaErrors, validateErrors], {
        arrayMerge: arrayMerge
      });
      return combinedErrors;
    });
  }, [props.validate, props.validationSchema, runFieldLevelValidations, runValidateHandler, runValidationSchema]);
  var validateFormWithLowPriority = useEventCallback(function (values) {
    if (values === void 0) {
      values = state.values;
    }

    return scheduler.unstable_runWithPriority(scheduler.LowPriority, function () {
      return runAllValidations(values).then(function (combinedErrors) {
        if (!!isMounted.current) {
          dispatch({
            type: 'SET_ERRORS',
            payload: combinedErrors
          });
        }

        return combinedErrors;
      });
    });
  }, [runAllValidations, state.values]);
  var validateFormWithHighPriority = useEventCallback(function (values) {
    if (values === void 0) {
      values = state.values;
    }

    dispatch({
      type: 'SET_ISVALIDATING',
      payload: true
    });
    return runAllValidations(values).then(function (combinedErrors) {
      if (!!isMounted.current) {
        dispatch({
          type: 'SET_ISVALIDATING',
          payload: false
        });

        if (!isEqual(state.errors, combinedErrors)) {
          dispatch({
            type: 'SET_ERRORS',
            payload: combinedErrors
          });
        }
      }

      return combinedErrors;
    });
  }, [state.values, state.errors, runAllValidations]);
  var resetForm = React.useCallback(function (nextState) {
    var values = nextState && nextState.values ? nextState.values : initialValues.current;
    var errors = nextState && nextState.errors ? nextState.errors : initialErrors.current ? initialErrors.current : props.initialErrors || {};
    var touched = nextState && nextState.touched ? nextState.touched : initialTouched.current ? initialTouched.current : props.initialTouched || {};
    var status = nextState && nextState.status ? nextState.status : initialStatus.current ? initialStatus.current : props.initialStatus;
    initialValues.current = values;
    initialErrors.current = errors;
    initialTouched.current = touched;
    initialStatus.current = status;
    dispatch({
      type: 'RESET_FORM',
      payload: {
        isSubmitting: !!nextState && !!nextState.isSubmitting,
        errors: errors,
        touched: touched,
        status: status,
        values: values,
        isValidating: !!nextState && !!nextState.isValidating,
        submitCount: !!nextState && !!nextState.submitCount && typeof nextState.submitCount === 'number' ? nextState.submitCount : 0
      }
    });
  }, [props.initialErrors, props.initialStatus, props.initialTouched, props.initialValues]);
  React.useEffect(function () {
    if (enableReinitialize && isMounted.current === true && !isEqual(initialValues.current, props.initialValues)) {
      initialValues.current = props.initialValues;
      resetForm();
    }
  }, [enableReinitialize, props.initialValues, resetForm]);
  var validateField = useEventCallback(function (name) {
    if (isFunction(fieldRegistry.current[name].validate)) {
      var value = getIn(state.values, name);
      var maybePromise = fieldRegistry.current[name].validate(value);

      if (isPromise(maybePromise)) {
        dispatch({
          type: 'SET_ISVALIDATING',
          payload: true
        });
        return maybePromise.then(function (x) {
          return x;
        }, function (e) {
          return e;
        }).then(function (error) {
          dispatch({
            type: 'SET_FIELD_ERROR',
            payload: {
              field: name,
              value: error
            }
          });
          dispatch({
            type: 'SET_ISVALIDATING',
            payload: false
          });
        });
      } else {
        dispatch({
          type: 'SET_FIELD_ERROR',
          payload: {
            field: name,
            value: maybePromise
          }
        });
        return Promise.resolve(maybePromise);
      }
    } else {
      return Promise.resolve();
    }
  }, [state.values]);
  var registerField = React.useCallback(function (name, _ref3) {
    var validate = _ref3.validate;
    fieldRegistry.current[name] = {
      validate: validate
    };
  }, []);
  var unregisterField = React.useCallback(function (name) {
    delete fieldRegistry.current[name];
  }, []);
  var setTouched = useEventCallback(function (touched) {
    dispatch({
      type: 'SET_TOUCHED',
      payload: touched
    });
    return validateOnBlur ? validateFormWithLowPriority(state.values) : Promise.resolve();
  }, [validateFormWithLowPriority, state.values, validateOnBlur]);
  var setErrors = React.useCallback(function (errors) {
    dispatch({
      type: 'SET_ERRORS',
      payload: errors
    });
  }, []);
  var setValues = useEventCallback(function (values) {
    dispatch({
      type: 'SET_VALUES',
      payload: values
    });
    return validateOnChange ? validateFormWithLowPriority(state.values) : Promise.resolve();
  }, [validateFormWithLowPriority, state.values, validateOnChange]);
  var setFieldError = React.useCallback(function (field, value) {
    dispatch({
      type: 'SET_FIELD_ERROR',
      payload: {
        field: field,
        value: value
      }
    });
  }, []);
  var setFieldValue = useEventCallback(function (field, value, shouldValidate) {
    if (shouldValidate === void 0) {
      shouldValidate = true;
    }

    dispatch({
      type: 'SET_FIELD_VALUE',
      payload: {
        field: field,
        value: value
      }
    });
    return validateOnChange && shouldValidate ? validateFormWithLowPriority(setIn(state.values, field, value)) : Promise.resolve();
  }, [validateFormWithLowPriority, state.values, validateOnChange]);
  var executeChange = React.useCallback(function (eventOrTextValue, maybePath) {
    var field = maybePath;
    var val = eventOrTextValue;
    var parsed;

    if (!isString(eventOrTextValue)) {
      if (eventOrTextValue.persist) {
        eventOrTextValue.persist();
      }

      var _eventOrTextValue$tar = eventOrTextValue.target,
          type = _eventOrTextValue$tar.type,
          name = _eventOrTextValue$tar.name,
          id = _eventOrTextValue$tar.id,
          value = _eventOrTextValue$tar.value,
          checked = _eventOrTextValue$tar.checked,
          outerHTML = _eventOrTextValue$tar.outerHTML;
      field = maybePath ? maybePath : name ? name : id;

      if (!field && "development" !== 'production') {
        warnAboutMissingIdentifier({
          htmlContent: outerHTML,
          documentationAnchorLink: 'handlechange-e-reactchangeeventany--void',
          handlerName: 'handleChange'
        });
      }

      val = /number|range/.test(type) ? (parsed = parseFloat(value), isNaN(parsed) ? '' : parsed) : /checkbox/.test(type) ? checked : value;
    }

    if (field) {
      setFieldValue(field, val);
    }
  }, [setFieldValue]);
  var handleChange = React.useCallback(function (eventOrPath) {
    if (isString(eventOrPath)) {
      return function (event) {
        return executeChange(event, eventOrPath);
      };
    } else {
      executeChange(eventOrPath);
    }
  }, [executeChange]);
  var setFieldTouched = useEventCallback(function (field, touched, shouldValidate) {
    if (touched === void 0) {
      touched = true;
    }

    if (shouldValidate === void 0) {
      shouldValidate = true;
    }

    dispatch({
      type: 'SET_FIELD_TOUCHED',
      payload: {
        field: field,
        value: touched
      }
    });
    return validateOnBlur && shouldValidate ? validateFormWithLowPriority(state.values) : Promise.resolve();
  }, [validateFormWithLowPriority, state.values, validateOnBlur]);
  var executeBlur = React.useCallback(function (e, path) {
    if (e.persist) {
      e.persist();
    }

    var _e$target = e.target,
        name = _e$target.name,
        id = _e$target.id,
        outerHTML = _e$target.outerHTML;
    var field = path ? path : name ? name : id;

    if (!field && "development" !== 'production') {
      warnAboutMissingIdentifier({
        htmlContent: outerHTML,
        documentationAnchorLink: 'handleblur-e-any--void',
        handlerName: 'handleBlur'
      });
    }

    setFieldTouched(field, true);
  }, [setFieldTouched]);
  var handleBlur = React.useCallback(function (eventOrString) {
    if (isString(eventOrString)) {
      return function (event) {
        return executeBlur(event, eventOrString);
      };
    } else {
      executeBlur(eventOrString);
    }
  }, [executeBlur]);

  function setFormikState(stateOrCb) {
    if (isFunction(stateOrCb)) {
      dispatch({
        type: 'SET_FORMIK_STATE',
        payload: stateOrCb(state)
      });
    } else {
      dispatch({
        type: 'SET_FORMIK_STATE',
        payload: stateOrCb
      });
    }
  }

  var setStatus = React.useCallback(function (status) {
    dispatch({
      type: 'SET_STATUS',
      payload: status
    });
  }, []);
  var setSubmitting = React.useCallback(function (isSubmitting) {
    dispatch({
      type: 'SET_ISSUBMITTING',
      payload: isSubmitting
    });
  }, []);
  var imperativeMethods = {
    resetForm: resetForm,
    validateForm: validateFormWithHighPriority,
    validateField: validateField,
    setErrors: setErrors,
    setFieldError: setFieldError,
    setFieldTouched: setFieldTouched,
    setFieldValue: setFieldValue,
    setStatus: setStatus,
    setSubmitting: setSubmitting,
    setTouched: setTouched,
    setValues: setValues,
    setFormikState: setFormikState
  };
  var executeSubmit = useEventCallback(function () {
    return onSubmit(state.values, imperativeMethods);
  }, [imperativeMethods, onSubmit, state.values]);
  var submitForm = useEventCallback(function () {
    dispatch({
      type: 'SUBMIT_ATTEMPT'
    });
    return validateFormWithHighPriority().then(function (combinedErrors) {
      var isActuallyValid = Object.keys(combinedErrors).length === 0;

      if (isActuallyValid) {
        return Promise.resolve(executeSubmit()).then(function () {
          if (!!isMounted.current) {
            dispatch({
              type: 'SUBMIT_SUCCESS'
            });
          }
        })["catch"](function (_errors) {
          if (!!isMounted.current) {
            dispatch({
              type: 'SUBMIT_FAILURE'
            });
          }
        });
      } else if (!!isMounted.current) {
        dispatch({
          type: 'SUBMIT_FAILURE'
        });
        return;
      }

      return;
    });
  }, [executeSubmit, validateFormWithHighPriority]);
  var handleSubmit = useEventCallback(function (e) {
    if (e && e.preventDefault && isFunction(e.preventDefault)) {
      e.preventDefault();
    }

    if (e && e.stopPropagation && isFunction(e.stopPropagation)) {
      e.stopPropagation();
    }

    if (typeof document !== 'undefined') {
      var activeElement = getActiveElement();

      if (activeElement !== null && activeElement instanceof HTMLButtonElement) {
        !(activeElement.attributes && activeElement.attributes.getNamedItem('type')) ? invariant(false, 'You submitted a Formik form using a button with an unspecified `type` attribute.  Most browsers default button elements to `type="submit"`. If this is not a submit button, please add `type="button"`.') : void 0;
      }
    }

    submitForm();
  }, [submitForm]);
  var handleReset = useEventCallback(function () {
    if (props.onReset) {
      var maybePromisedOnReset = props.onReset(state.values, imperativeMethods);

      if (isPromise(maybePromisedOnReset)) {
        maybePromisedOnReset.then(resetForm);
      } else {
        resetForm();
      }
    } else {
      resetForm();
    }
  }, [imperativeMethods, props.onReset, resetForm, state.values]);
  var getFieldMeta = React.useCallback(function (name) {
    return {
      value: getIn(state.values, name),
      error: getIn(state.errors, name),
      touched: !!getIn(state.touched, name),
      initialValue: getIn(initialValues.current, name),
      initialTouched: !!getIn(initialTouched.current, name),
      initialError: getIn(initialErrors.current, name)
    };
  }, [state.errors, state.touched, state.values]);
  var getFieldProps = React.useCallback(function (name, type) {
    var field = {
      name: name,
      value: type && (type === 'radio' || type === 'checkbox') ? undefined : getIn(state.values, name),
      onChange: handleChange,
      onBlur: handleBlur
    };
    return [field, getFieldMeta(name)];
  }, [getFieldMeta, handleBlur, handleChange, state.values]);
  var dirty = React.useMemo(function () {
    return !isEqual(initialValues.current, state.values);
  }, [state.values]);
  var isValid = React.useMemo(function () {
    return typeof isInitialValid !== 'undefined' ? dirty ? state.errors && Object.keys(state.errors).length === 0 : isInitialValid !== false && isFunction(isInitialValid) ? isInitialValid(props) : isInitialValid : state.errors && Object.keys(state.errors).length === 0;
  }, [isInitialValid, dirty, state.errors, props]);

  var ctx = _extends({}, state, {
    initialValues: initialValues.current,
    initialErrors: initialErrors.current,
    initialTouched: initialTouched.current,
    initialStatus: initialStatus.current,
    handleBlur: handleBlur,
    handleChange: handleChange,
    handleReset: handleReset,
    handleSubmit: handleSubmit,
    resetForm: resetForm,
    setErrors: setErrors,
    setFormikState: setFormikState,
    setFieldTouched: setFieldTouched,
    setFieldValue: setFieldValue,
    setFieldError: setFieldError,
    setStatus: setStatus,
    setSubmitting: setSubmitting,
    setTouched: setTouched,
    setValues: setValues,
    submitForm: submitForm,
    validateForm: validateFormWithHighPriority,
    validateField: validateField,
    isValid: isValid,
    dirty: dirty,
    unregisterField: unregisterField,
    registerField: registerField,
    getFieldProps: getFieldProps,
    validateOnBlur: validateOnBlur,
    validateOnChange: validateOnChange
  });

  return ctx;
}

function Formik(props) {
  var formikbag = useFormikInternal(props);
  var component = props.component,
      children = props.children,
      render = props.render;
  return React.createElement(FormikProvider, {
    value: formikbag
  }, component ? React.createElement(component, formikbag) : render ? render(formikbag) : children ? isFunction(children) ? children(formikbag) : !isEmptyChildren(children) ? React.Children.only(children) : null : null);
}

function warnAboutMissingIdentifier(_ref4) {
  var htmlContent = _ref4.htmlContent,
      documentationAnchorLink = _ref4.documentationAnchorLink,
      handlerName = _ref4.handlerName;
  console.warn("Warning: Formik called `" + handlerName + "`, but you forgot to pass an `id` or `name` attribute to your input:\n    " + htmlContent + "\n    Formik cannot determine which value to update. For more info see https://github.com/jaredpalmer/formik#" + documentationAnchorLink + "\n  ");
}

function yupToFormErrors(yupError) {
  var errors = {};

  if (yupError.inner.length === 0) {
    return setIn(errors, yupError.path, yupError.message);
  }

  for (var _iterator = yupError.inner, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref5;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref5 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref5 = _i.value;
    }

    var err = _ref5;

    if (!errors[err.path]) {
      errors = setIn(errors, err.path, err.message);
    }
  }

  return errors;
}
function validateYupSchema(values, schema, sync, context) {
  if (sync === void 0) {
    sync = false;
  }

  if (context === void 0) {
    context = {};
  }

  var validateData = {};

  for (var k in values) {
    if (values.hasOwnProperty(k)) {
      var key = String(k);
      validateData[key] = values[key] !== '' ? values[key] : undefined;
    }
  }

  return schema[sync ? 'validateSync' : 'validate'](validateData, {
    abortEarly: false,
    context: context
  });
}

function arrayMerge(target, source, options) {
  var destination = target.slice();
  source.forEach(function (e, i) {
    if (typeof destination[i] === 'undefined') {
      var cloneRequested = options.clone !== false;
      var shouldClone = cloneRequested && options.isMergeableObject(e);
      destination[i] = shouldClone ? deepmerge(Array.isArray(e) ? [] : {}, e, options) : e;
    } else if (options.isMergeableObject(e)) {
      destination[i] = deepmerge(target[i], e, options);
    } else if (target.indexOf(e) === -1) {
      destination.push(e);
    }
  });
  return destination;
}

function useEventCallback(fn, dependencies) {
  var ref = React.useRef(function () {
    throw new Error('Cannot call an event handler while rendering.');
  });
  React.useEffect(function () {
    ref.current = fn;
  }, [fn].concat(dependencies));
  return React.useCallback(function () {
    var fn = ref.current;
    return fn.apply(void 0, arguments);
  }, [ref]);
}

function useField(name, type) {
  var formik = useFormikContext();

  {
    !formik ? invariant(false, 'useField() / <Field /> must be used underneath a <Formik> component or withFormik() higher order component') : void 0;
  }

  return formik.getFieldProps(name, type);
}
function Field(_ref) {
  var validate = _ref.validate,
      name = _ref.name,
      render = _ref.render,
      children = _ref.children,
      is = _ref.as,
      component = _ref.component,
      props = _objectWithoutPropertiesLoose(_ref, ["validate", "name", "render", "children", "as", "component"]);

  var _useFormikContext = useFormikContext(),
      _validate = _useFormikContext.validate,
      _validationSchema = _useFormikContext.validationSchema,
      formik = _objectWithoutPropertiesLoose(_useFormikContext, ["validate", "validationSchema"]);

  React.useEffect(function () {
    {
      !!render ? invariant(false, "<Field render> has been deprecated and will be removed in future versions of Formik. Please use a child callback function instead. To get rid of this warning, replace <Field name=\"" + name + "\" render={({field, form}) => ...} /> with <Field name=\"" + name + "\">{({field, form, meta}) => ...}</Field>") : void 0;
      !!component ? invariant(false, '<Field component> has been deprecated and will be removed in future versions of Formik. Use <Field as> instead. Note that with the `as` prop, all props are passed directly through and not grouped in `field` object key.') : void 0;
      !!(is && children && isFunction(children)) ? invariant(false, 'You should not use <Field as> and <Field children> as a function in the same <Field> component; <Field as> will be ignored.') : void 0;
      !!(component && children && isFunction(children)) ? invariant(false, 'You should not use <Field component> and <Field children> as a function in the same <Field> component; <Field component> will be ignored.') : void 0;
      !!(render && children && !isEmptyChildren(children)) ? invariant(false, 'You should not use <Field render> and <Field children> in the same <Field> component; <Field children> will be ignored') : void 0;
    }
  }, []);
  React.useEffect(function () {
    formik.registerField(name, {
      validate: validate
    });
    return function () {
      formik.unregisterField(name);
    };
  }, [formik, name, validate]);

  var _formik$getFieldProps = formik.getFieldProps(name, props.type),
      field = _formik$getFieldProps[0],
      meta = _formik$getFieldProps[1];

  var legacyBag = {
    field: field,
    form: formik
  };

  if (render) {
    return render(legacyBag);
  }

  if (isFunction(children)) {
    return children(_extends({}, legacyBag, {
      meta: meta
    }));
  }

  if (component) {
    if (typeof component === 'string') {
      var innerRef = props.innerRef,
          rest = _objectWithoutPropertiesLoose(props, ["innerRef"]);

      return React.createElement(component, _extends({
        ref: innerRef
      }, field, rest), children);
    }

    return React.createElement(component, _extends({
      field: field,
      form: formik
    }, props), children);
  }

  var asElement = is || 'input';

  if (typeof asElement === 'string') {
    var _innerRef = props.innerRef,
        _rest = _objectWithoutPropertiesLoose(props, ["innerRef"]);

    return React.createElement(asElement, _extends({
      ref: _innerRef
    }, field, _rest), children);
  }

  return React.createElement(asElement, _extends({}, field, props), children);
}
var FastField = Field;

function Form(props) {
  var _useFormikContext = useFormikContext(),
      handleReset = _useFormikContext.handleReset,
      handleSubmit = _useFormikContext.handleSubmit;

  return React.createElement("form", Object.assign({
    onSubmit: handleSubmit,
    onReset: handleReset
  }, props));
}
Form.displayName = 'Form';

function withFormik(_ref) {
  var _ref$mapPropsToValues = _ref.mapPropsToValues,
      mapPropsToValues = _ref$mapPropsToValues === void 0 ? function (vanillaProps) {
    var val = {};

    for (var k in vanillaProps) {
      if (vanillaProps.hasOwnProperty(k) && typeof vanillaProps[k] !== 'function') {
        val[k] = vanillaProps[k];
      }
    }

    return val;
  } : _ref$mapPropsToValues,
      config = _objectWithoutPropertiesLoose(_ref, ["mapPropsToValues"]);

  return function createFormik(Component) {
    var componentDisplayName = Component.displayName || Component.name || Component.constructor && Component.constructor.name || 'Component';

    var C =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(C, _React$Component);

      function C() {
        var _this;

        _this = _React$Component.apply(this, arguments) || this;

        _this.validate = function (values) {
          return config.validate(values, _this.props);
        };

        _this.validationSchema = function () {
          return isFunction(config.validationSchema) ? config.validationSchema(_this.props) : config.validationSchema;
        };

        _this.handleSubmit = function (values, actions) {
          return config.handleSubmit(values, _extends({}, actions, {
            props: _this.props
          }));
        };

        _this.renderFormComponent = function (formikProps) {
          return React.createElement(Component, Object.assign({}, _this.props, formikProps));
        };

        return _this;
      }

      var _proto = C.prototype;

      _proto.render = function render() {
        var _this$props = this.props,
            children = _this$props.children,
            props = _objectWithoutPropertiesLoose(_this$props, ["children"]);

        return React.createElement(Formik, Object.assign({}, props, config, {
          validate: config.validate && this.validate,
          validationSchema: config.validationSchema && this.validationSchema,
          initialValues: mapPropsToValues(this.props),
          initialStatus: config.mapPropsToStatus && config.mapPropsToStatus(this.props),
          initialErrors: config.mapPropsToErrors && config.mapPropsToErrors(this.props),
          initialTouched: config.mapPropsToTouched && config.mapPropsToTouched(this.props),
          onSubmit: this.handleSubmit,
          render: this.renderFormComponent
        }));
      };

      return C;
    }(React.Component);

    C.displayName = "WithFormik(" + componentDisplayName + ")";
    return hoistNonReactStatics(C, Component);
  };
}

function connect(Comp) {
  var C = function C(props) {
    return React.createElement(FormikConsumer, null, function (formik) {
      return React.createElement(Comp, Object.assign({}, props, {
        formik: formik
      }));
    });
  };

  var componentDisplayName = Comp.displayName || Comp.name || Comp.constructor && Comp.constructor.name || 'Component';
  C.WrappedComponent = Comp;
  C.displayName = "FormikConnect(" + componentDisplayName + ")";
  return hoistNonReactStatics(C, Comp);
}

var move = function move(array, from, to) {
  var copy = [].concat(array || []);
  var value = copy[from];
  copy.splice(from, 1);
  copy.splice(to, 0, value);
  return copy;
};
var swap = function swap(array, indexA, indexB) {
  var copy = [].concat(array || []);
  var a = copy[indexA];
  copy[indexA] = copy[indexB];
  copy[indexB] = a;
  return copy;
};
var insert = function insert(array, index, value) {
  var copy = [].concat(array || []);
  copy.splice(index, 0, value);
  return copy;
};
var replace = function replace(array, index, value) {
  var copy = [].concat(array || []);
  copy[index] = value;
  return copy;
};

var FieldArrayInner =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(FieldArrayInner, _React$Component);

  function FieldArrayInner(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.updateArrayField = function (fn, alterTouched, alterErrors) {
      var _this$props = _this.props,
          name = _this$props.name,
          validateOnChange = _this$props.validateOnChange,
          _this$props$formik = _this$props.formik,
          setFormikState = _this$props$formik.setFormikState,
          validateForm = _this$props$formik.validateForm;
      setFormikState(function (prevState) {
        var updateErrors = typeof alterErrors === 'function' ? alterErrors : fn;
        var updateTouched = typeof alterTouched === 'function' ? alterTouched : fn;
        return _extends({}, prevState, {
          values: setIn(prevState.values, name, fn(getIn(prevState.values, name))),
          errors: alterErrors ? setIn(prevState.errors, name, updateErrors(getIn(prevState.errors, name))) : prevState.errors,
          touched: alterTouched ? setIn(prevState.touched, name, updateTouched(getIn(prevState.touched, name))) : prevState.touched
        });
      }, function () {
        if (validateOnChange) {
          validateForm();
        }
      });
    };

    _this.push = function (value) {
      return _this.updateArrayField(function (array) {
        return [].concat(array || [], [cloneDeep(value)]);
      }, false, false);
    };

    _this.handlePush = function (value) {
      return function () {
        return _this.push(value);
      };
    };

    _this.swap = function (indexA, indexB) {
      return _this.updateArrayField(function (array) {
        return swap(array, indexA, indexB);
      }, true, true);
    };

    _this.handleSwap = function (indexA, indexB) {
      return function () {
        return _this.swap(indexA, indexB);
      };
    };

    _this.move = function (from, to) {
      return _this.updateArrayField(function (array) {
        return move(array, from, to);
      }, true, true);
    };

    _this.handleMove = function (from, to) {
      return function () {
        return _this.move(from, to);
      };
    };

    _this.insert = function (index, value) {
      return _this.updateArrayField(function (array) {
        return insert(array, index, value);
      }, function (array) {
        return insert(array, index, null);
      }, function (array) {
        return insert(array, index, null);
      });
    };

    _this.handleInsert = function (index, value) {
      return function () {
        return _this.insert(index, value);
      };
    };

    _this.replace = function (index, value) {
      return _this.updateArrayField(function (array) {
        return replace(array, index, value);
      }, false, false);
    };

    _this.handleReplace = function (index, value) {
      return function () {
        return _this.replace(index, value);
      };
    };

    _this.unshift = function (value) {
      var length = -1;

      _this.updateArrayField(function (array) {
        var arr = array ? [value].concat(array) : [value];

        if (length < 0) {
          length = arr.length;
        }

        return arr;
      }, function (array) {
        var arr = array ? [null].concat(array) : [null];

        if (length < 0) {
          length = arr.length;
        }

        return arr;
      }, function (array) {
        var arr = array ? [null].concat(array) : [null];

        if (length < 0) {
          length = arr.length;
        }

        return arr;
      });

      return length;
    };

    _this.handleUnshift = function (value) {
      return function () {
        return _this.unshift(value);
      };
    };

    _this.handleRemove = function (index) {
      return function () {
        return _this.remove(index);
      };
    };

    _this.handlePop = function () {
      return function () {
        return _this.pop();
      };
    };

    _this.remove = _this.remove.bind(_assertThisInitialized(_this));
    _this.pop = _this.pop.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = FieldArrayInner.prototype;

  _proto.remove = function remove(index) {
    var result;
    this.updateArrayField(function (array) {
      var copy = array ? [].concat(array) : [];

      if (!result) {
        result = copy[index];
      }

      if (isFunction(copy.splice)) {
        copy.splice(index, 1);
      }

      return copy;
    }, true, true);
    return result;
  };

  _proto.pop = function pop() {
    var result;
    this.updateArrayField(function (array) {
      var tmp = array;

      if (!result) {
        result = tmp && tmp.pop && tmp.pop();
      }

      return tmp;
    }, true, true);
    return result;
  };

  _proto.render = function render() {
    var arrayHelpers = {
      push: this.push,
      pop: this.pop,
      swap: this.swap,
      move: this.move,
      insert: this.insert,
      replace: this.replace,
      unshift: this.unshift,
      remove: this.remove,
      handlePush: this.handlePush,
      handlePop: this.handlePop,
      handleSwap: this.handleSwap,
      handleMove: this.handleMove,
      handleInsert: this.handleInsert,
      handleReplace: this.handleReplace,
      handleUnshift: this.handleUnshift,
      handleRemove: this.handleRemove
    };

    var _this$props2 = this.props,
        component = _this$props2.component,
        render = _this$props2.render,
        children = _this$props2.children,
        name = _this$props2.name,
        _this$props2$formik = _this$props2.formik,
        _validate = _this$props2$formik.validate,
        _validationSchema = _this$props2$formik.validationSchema,
        restOfFormik = _objectWithoutPropertiesLoose(_this$props2$formik, ["validate", "validationSchema"]);

    var props = _extends({}, arrayHelpers, {
      form: restOfFormik,
      name: name
    });

    return component ? React.createElement(component, props) : render ? render(props) : children ? typeof children === 'function' ? children(props) : !isEmptyChildren(children) ? React.Children.only(children) : null : null;
  };

  return FieldArrayInner;
}(React.Component);

FieldArrayInner.defaultProps = {
  validateOnChange: true
};
var FieldArray =
/*#__PURE__*/
connect(FieldArrayInner);

var ErrorMessageImpl =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(ErrorMessageImpl, _React$Component);

  function ErrorMessageImpl() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = ErrorMessageImpl.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(props) {
    if (getIn(this.props.formik.errors, this.props.name) !== getIn(props.formik.errors, this.props.name) || getIn(this.props.formik.touched, this.props.name) !== getIn(props.formik.touched, this.props.name) || Object.keys(this.props).length !== Object.keys(props).length) {
      return true;
    } else {
      return false;
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        component = _this$props.component,
        formik = _this$props.formik,
        render = _this$props.render,
        children = _this$props.children,
        name = _this$props.name,
        rest = _objectWithoutPropertiesLoose(_this$props, ["component", "formik", "render", "children", "name"]);

    var touch = getIn(formik.touched, name);
    var error = getIn(formik.errors, name);
    return !!touch && !!error ? render ? isFunction(render) ? render(error) : null : children ? isFunction(children) ? children(error) : null : component ? React.createElement(component, rest, error) : error : null;
  };

  return ErrorMessageImpl;
}(React.Component);

var ErrorMessage =
/*#__PURE__*/
connect(ErrorMessageImpl);

exports.ErrorMessage = ErrorMessage;
exports.FastField = FastField;
exports.Field = Field;
exports.FieldArray = FieldArray;
exports.Form = Form;
exports.Formik = Formik;
exports.FormikConsumer = FormikConsumer;
exports.FormikProvider = FormikProvider;
exports.connect = connect;
exports.getActiveElement = getActiveElement;
exports.getIn = getIn;
exports.insert = insert;
exports.isEmptyChildren = isEmptyChildren;
exports.isFunction = isFunction;
exports.isInputEvent = isInputEvent;
exports.isInteger = isInteger;
exports.isNaN = isNaN$1;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.isString = isString;
exports.move = move;
exports.replace = replace;
exports.setIn = setIn;
exports.setNestedObjectValues = setNestedObjectValues;
exports.swap = swap;
exports.useField = useField;
exports.useFormikContext = useFormikContext;
exports.validateYupSchema = validateYupSchema;
exports.withFormik = withFormik;
exports.yupToFormErrors = yupToFormErrors;
//# sourceMappingURL=formik.cjs.development.js.map
