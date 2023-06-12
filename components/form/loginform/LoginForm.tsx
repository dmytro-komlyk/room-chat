import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from 'formik';
import { useState } from 'react';
import { loginSchemaValidate } from '../../../helpers/authentication';
import styles from '../../../styles/AuthForm.module.scss';

export type ILoginFormProps = {};

const LoginForm = ({ onSubmit }: any) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchemaValidate,
    onSubmit,
  });

  return (
    <form className={styles.authForm} onSubmit={formik.handleSubmit}>
      <TextField
        className={styles.input_text}
        type="email"
        placeholder="Email"
        variant="outlined"
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        InputProps={{
          endAdornment: (
            <InputAdornment className={styles.input_icon} position="end">
              <AlternateEmailIcon />
            </InputAdornment>
          ),
        }}
        {...formik.getFieldProps('email')}
      />
      <TextField
        type={`${show ? 'text' : 'password'}`}
        placeholder="Password"
        className={styles.input_text}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment
              className={styles.input_icon}
              position="end"
              onClick={() => setShow(!show)}
            >
              <FingerprintIcon />
            </InputAdornment>
          ),
        }}
        {...formik.getFieldProps('password')}
      />
      <Button type="submit" className={styles.input_button}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
