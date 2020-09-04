/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable consistent-return */
import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = ({ onSubmit, handleSubmit }) => {
  const onSubmitHandle = (formValues) => {
    onSubmit(formValues);
  };

  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)} className="ui form error">
      <Field component={renderInput} name="title" label="Enter Title" />
      <Field
        component={renderInput}
        name="description"
        label="Enter Description"
      />
      <button className="ui button primary">Submit</button>
    </form>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'StreamForm',
  validate
})(StreamForm);
