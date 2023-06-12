import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Button, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from 'formik';
import { useState } from 'react';
import { registerSchemaValidate } from '../../../helpers/authentication';
import styles from '../../../styles/AuthForm.module.scss';

export type IRegisterFormProps = {};

const RegisterForm = ({ onSubmit }: any) => {
  const [show, setShow] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: registerSchemaValidate,
    onSubmit,
  });

  return (
    <form className={styles.authForm} onSubmit={formik.handleSubmit}>
      <TextField
        className={styles.input_text}
        type="text"
        placeholder="User Name"
        error={formik.touched.userName && Boolean(formik.errors.userName)}
        helperText={formik.touched.userName && formik.errors.userName}
        InputProps={{
          endAdornment: (
            <InputAdornment className={styles.input_icon} position="end">
              <PersonOutlineIcon />
            </InputAdornment>
          ),
        }}
        {...formik.getFieldProps('userName')}
      />
      <TextField
        className={styles.input_text}
        type="email"
        placeholder="Email"
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
        type={`${show.password ? 'text' : 'password'}`}
        placeholder="password"
        className={styles.input_text}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment
              className={styles.input_icon}
              position="end"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <FingerprintIcon />
            </InputAdornment>
          ),
        }}
        {...formik.getFieldProps('password')}
      />
      <TextField
        type={`${show.passwordConfirmation ? 'text' : 'password'}`}
        placeholder="Confirm Password"
        className={styles.input_text}
        error={
          formik.touched.passwordConfirmation &&
          Boolean(formik.errors.passwordConfirmation)
        }
        helperText={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
        }
        InputProps={{
          endAdornment: (
            <InputAdornment
              className={styles.input_icon}
              position="end"
              onClick={() =>
                setShow({
                  ...show,
                  passwordConfirmation: !show.passwordConfirmation,
                })
              }
            >
              <FingerprintIcon />
            </InputAdornment>
          ),
        }}
        {...formik.getFieldProps('passwordConfirmation')}
      />
      <Button type="submit" className={styles.input_button}>
        Sign Up
      </Button>
    </form>
  );
};

export default RegisterForm;
