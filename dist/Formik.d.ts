/// <reference types="react" />
import { FormikConfig, FormikErrors, FormikValues } from './types';
export declare function Formik<Values = object, ExtraProps = {}>(
  props: FormikConfig<Values> & ExtraProps
): JSX.Element;
export declare function yupToFormErrors<Values>(
  yupError: any
): FormikErrors<Values>;
export declare function validateYupSchema<T extends FormikValues>(
  values: T,
  schema: any,
  sync?: boolean,
  context?: any
): Promise<Partial<T>>;
