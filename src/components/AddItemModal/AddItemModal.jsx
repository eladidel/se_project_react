import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    validateForm,
  } = useFormWithValidation({ name: "", weather: "", link: "" });

  useEffect(() => {
    handleReset();
  }, [isOpen]);

  function handleReset() {
    resetForm({ name: "", weather: "", link: "" }, {}, false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      validateForm(evt.target);
      return;
    }
    onAddItem(values, resetForm);
  }

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="cloth-name"
          className="modal__input"
          placeholder="Name"
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && (
          <span className="modal__error" id="name-error">
            {errors.name}
          </span>
        )}
      </label>
      <label className="modal__label">
        Image
        <input
          type="url"
          name="link"
          id="cloth-link"
          className="modal__input"
          placeholder="Image URL"
          required
          aria-invalid={!!errors.link}
          aria-describedby={errors.link ? "link-error" : undefined}
          value={values.link}
          onChange={handleChange}
        />
        {errors.link && (
          <span className="modal__error" id="link-error">
            {errors.link}
          </span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__input-radio"
            name="weather"
            checked={values.weather === "hot"}
            value="hot"
            required
            onChange={handleChange}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__input-radio"
            name="weather"
            checked={values.weather === "warm"}
            value="warm"
            onChange={handleChange}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__input-radio"
            name="weather"
            checked={values.weather === "cold"}
            value="cold"
            onChange={handleChange}
          />
          Cold
        </label>
        {errors.weather && (
          <span className="modal__error" id="weather-error">
            {errors.weather}
          </span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
