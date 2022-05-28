import { TextField } from '@mui/material';
import { Restrict } from '@type/field';
import Constant from '@utils/constant';
import Helper from '@utils/helper';
import clsx from 'clsx';
import { FieldInputProps, FieldMetaProps, useFormikContext } from 'formik';
import { FC, FormEvent } from 'react';

export interface FieldTextType {
  label?: string;
  prefix?: any;
  suffix?: any;
  placeholder?: string;
  className?: string;
  restric: Restrict;
  type?: string;
  required?: boolean;
  field?: FieldInputProps<any>;
  meta?: FieldMetaProps<any>;
}

const FieldText: FC<FieldTextType> = ({ label, placeholder, className, type, field, required, restric }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const fieldTouch: boolean = Helper.objValue(touched, field?.name);
  const fieldError: string = Helper.objValue(errors, field?.name);
  const isError: boolean = fieldTouch && Boolean(fieldError);

  const onChangeInput = ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) => {
    const includeSpecialChar = value.match(/[%<>\\$'"]/);
    if (Restrict.DISALLOW_SPECIAL_CHAR === restric && includeSpecialChar?.input) {
      return;
    }
    setFieldValue(field?.name as string, value);
  };

  return (
    <div className={clsx(className)}>
      <TextField
        fullWidth
        id={field?.name}
        name={field?.name}
        placeholder={placeholder || ''}
        label={label || Constant.form.UNKNOWN_LABEL}
        type={type || Constant.form.TYPE_TEXT}
        value={field?.value}
        required={required as boolean}
        onChange={onChangeInput as any}
        error={isError}
        size="small"
        helperText={fieldTouch && fieldError}
        variant="outlined"
      />
    </div>
  );
};

export default FieldText;
