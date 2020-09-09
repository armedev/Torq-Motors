import React from "react";

import "./add-page.styles.scss";

const AddPage = ({
  name,
  model,
  price,
  description,
  handleChange,
  handleFileChange,
  handleSubmit,
}) => {
  return (
    <div className="add-page">
      <div className="add-page__container">
        <form
          onSubmit={handleSubmit}
          className="add-page__container__form-details"
        >
          <input
            className="add-page__container__form-details__input"
            type="text"
            required
            placeholder="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <input
            className="add-page__container__form-details__input"
            type="text"
            required
            placeholder="Model"
            name="model"
            value={model}
            onChange={handleChange}
          />
          <input
            className="add-page__container__form-details__input"
            type="text"
            required
            placeholder="Price"
            name="price"
            value={price}
            onChange={handleChange}
          />
          <textarea
            className="add-page__container__form-details__text-area"
            typeof="string"
            required
            onChange={handleChange}
            name="description"
            value={description}
            placeholder="Description"
          />
          <input
            type="file"
            className="add-page__container__form-details__file"
            required
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
          <button
            type="submit"
            className="add-page__container__form-details__button"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
