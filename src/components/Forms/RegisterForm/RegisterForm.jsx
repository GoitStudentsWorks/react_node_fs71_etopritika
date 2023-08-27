import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { register } from '../../../redux/auth/authOperations';
import registerSchema from './Validation';
import css from './RegisterForm.module.css';
import icons from '../../../img/icons.svg';
import AuthNavigate from '../../AuthNavigate/AuthNavigate';
import AuthBtn from '../../Buttons/AuthBtn/AuthBtn';

// from react-icons
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<AiFillEyeInvisible />);

  const handleShowPassword = () => {
    if (type === 'password') {
      setIcon(<AiFillEye />);
      setType('text');
    } else {
      setIcon(<AiFillEyeInvisible />);
      setType('password');
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await dispatch(register(values));
      console.log('Registration successful:', response);
      resetForm();
    } catch (error) {
      console.error('Registration rejected:', error);
    }
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.bgImages}></div>
        <div className={css.bgImagesMsg}>
          <p className={css.bgImagesText}>
            Quickly <span className={css.span}>register</span> and familiarize
            yourself with the application!
          </p>
        </div>
        <Formik
          const
          initialValues={INITIAL_STATE}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form autoComplete="off" className={css.form}>
              <h1 className={css.title}>Sign Up</h1>
              <label
                className={
                  errors.name && touched.name
                    ? css.isInvalidLabel
                    : touched.name
                    ? css.isValidLabel
                    : css.label
                }
              >
                <p className={css.labelText}>Name</p>
                <Field
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Enter your name"
                  className={
                    errors.name && touched.name
                      ? css.isInvalid
                      : touched.name
                      ? css.isValid
                      : css.input
                  }
                />
                <div className={css.feedback}>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={css.invalidFeedback}
                  ></ErrorMessage>
                </div>
              </label>
              <label
                className={
                  errors.email && touched.email
                    ? css.isInvalidLabel
                    : touched.email
                    ? css.isValidLabel
                    : css.label
                }
              >
                Email
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className={
                    errors.email && touched.email
                      ? css.isInvalid
                      : touched.email
                      ? css.isValid
                      : css.input
                  }
                />
                <div className={css.feedback}>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={css.invalidFeedback}
                  ></ErrorMessage>
                </div>
              </label>
              <label
                className={
                  errors.password && touched.password
                    ? css.isInvalidLabel
                    : touched.password
                    ? css.isValidLabel
                    : css.label
                }
              >
                Password
                <Field
                  id="password"
                  name="password"
                  type={type}
                  placeholder="Enter password"
                  className={
                    errors.password && touched.password
                      ? css.isInvalid
                      : touched.password
                      ? css.isValid
                      : css.input
                  }
                />
                <button
                  className={css.btnToggle}
                  type="button"
                  onClick={handleShowPassword}
                >
                  <div className={css.spanIcon}>{icon}</div>
                </button>
                <div className={css.feedback}>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={css.invalidFeedback}
                  ></ErrorMessage>
                </div>
              </label>
              <AuthBtn title={'Sign Up'} icon={`${icons}#log-in-01`} />
            </Form>
          )}
        </Formik>
        <AuthNavigate formType="register" />
      </div>
    </>
  );
};
