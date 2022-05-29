import FieldText from '@common/Form/FieldInput';
import { Button, Grid } from '@mui/material';
import { Restrict } from '@type/field';
import { Field, useFormikContext } from 'formik';
import { formEditUserStyle } from './formEditUserStyle';

export const FormEditUser = () => {
  const styles = formEditUserStyle();
  const { handleSubmit } = useFormikContext();
  return (
    <Grid container className={styles.main} spacing={2}>
      <Grid item xs={12}>
        <Field
          name="username"
          label="username"
          component={FieldText}
          required
          restric={Restrict.DISALLOW_SPECIAL_CHAR}
        />
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleSubmit as any} variant="contained">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};
