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
  } = useFormWithValidation({ name: "", weather: "", imageUrl: "" });

  useEffect(() => {
    handleReset();
  }, [isOpen]);

  function handleReset() {
    resetForm({ name: "", weather: "", imageUrl: "" }, {}, false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      validateForm(evt.target);
      return;
    }
    onAddItem(values, handleReset);
  }

  return (
    <ModalWithForm
      title="New "
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
          name="imageUrl"
          id="cloth-imageUrl"
          className="modal__input"
          placeholder="Image URL"
          required
          aria-invalid={!!errors.imageUrl}
          aria-describedby={errors.imageUrl ? "imageUrl-error" : undefined}
          value={values.imageUrl}
          onChange={handleChange}
        />
        {errors.imageUrl && (
          <span className="modal__error" id="imageUrl-error">
            {errors.imageUrl}
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
