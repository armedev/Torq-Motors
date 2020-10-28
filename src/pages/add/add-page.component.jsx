import React from "react";

import "./add-page.styles.scss";

import Spinner from "../../components/spinner/spinner.component";

const AddPage = ({
  name,
  model,
  price,
  image,
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
        <div className="add-page__container__display">
          <div className="add-page__container__display__image">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="bike"
                className="add-page__container__display__image__raw"
              />
            ) : (
              <Spinner className="spinner" />
            )}
          </div>
          <div className="add-page__container__display__name">
            <span>Name: </span>
            <h4>{name ? name : null}</h4>
          </div>
          <div className="add-page__container__display__model">
            <span>model: </span>
            <h4>{model ? model : null} </h4>
          </div>
          <div className="add-page__container__display__price">
            <span>price: </span>
            <h4>{price ? price : null}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
