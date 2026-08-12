import { useState } from "react";

function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  function handleChange(evt) {
    const { name, value, validationMessage, form } = evt.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // update single-field error based on browser message so UX stays responsive
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    if (form) setIsValid(form.checkValidity());
  }

  function resetForm(
    newValues = {},
    newErrors = {},
    newIsValid = false,
    newShowErrors = false,
  ) {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
    setShowErrors(newShowErrors);
  }

  function validateForm(form) {
    if (!form) return;
    const formErrors = {};
    Array.from(form.elements).forEach((el) => {
      if (el.name) formErrors[el.name] = el.validationMessage;
    });
    setErrors(formErrors);
    setIsValid(form.checkValidity());
    setShowErrors(true);
  }

  function validateWithRules(rules = {}) {
    const newErrors = {};
    let valid = true;
    Object.keys(rules).forEach((key) => {
      const ruleFn = rules[key];
      const message = ruleFn(values[key], values) || "";
      if (message) valid = false;
      newErrors[key] = message;
    });
    setErrors((prev) => ({ ...prev, ...newErrors }));
    setIsValid(valid);
    setShowErrors(true);
    return valid;
  }

  return {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    validateForm,
    validateWithRules,
    showErrors,
    setShowErrors,
  };
}

export default useFormWithValidation;
