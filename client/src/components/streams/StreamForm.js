import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = ({ onSubmit, handleSubmit }) => {
  const onSubmitHandle = (formValues) => {
    onSubmit(formValues);
  };

  return (
    <div>
      <form
        name="createStreamForm"
        className="ui form error"
        onSubmit={handleSubmit(onSubmitHandle)}
      >
        <Field name="title" label="Enter Title" component={renderInput} />
        <Field
          name="description"
          label="Enter Description"
          component={renderInput}
        />
        <button className="ui button primary">Submit</button>
      </form>
    </div>
  );
};

const shouldDisplayError = (meta) => {
  return meta.touched && meta.error;
};

const renderError = (meta) => {
  return shouldDisplayError(meta) ? (
    <div> - {meta.error.toUpperCase()}</div>
  ) : null;
};

const renderInput = ({ input, label, meta }) => {
  const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

  return (
    <div className={className}>
      <label htmlFor={input.name}>
        {label} {renderError(meta)}
      </label>
      <input {...input} autoComplete="off" />
    </div>
  );
};

const validateForm = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'is required';
  }

  if (!formValues.description) {
    errors.description = 'is required';
  }

  return errors;
};

const formWrapped = reduxForm({
  form: 'streamForm',
  validate: validateForm
})(StreamForm);

export default formWrapped;
