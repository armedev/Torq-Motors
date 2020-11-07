import React from "react";

import "./sell-page.styles.scss";

import Spinner from "../../components/spinner/spinner.component";

const SellPage = ({
  image,
  handleSubmit,
  handleFileChange,
  handleChange,
  name,
  model,
  brand,
  price,
  kmRan,
  regNo,
  owners,
  description,
  fuelType,
}) => {
  console.log(image);
  return (
    <div className="sell-page">
      <div className="sell-page__container">
        <div className="sell-page__container__image">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="bike"
              className="sell-page__container__image__raw"
            />
          ) : (
            <Spinner />
          )}
        </div>
        <div className="sell-page__container__input">
          <form
            onSubmit={handleSubmit}
            className="sell-page__container__input__form-details"
          >
            <input
              type="file"
              className="sell-page__container__input__form-details__file"
              required
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            <input
              className="sell-page__container__input__form-details__input"
              type="text"
              required
              placeholder="name"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <input
              className="sell-page__container__input__form-details__input"
              type="text"
              required
              placeholder="brand"
              name="brand"
              value={brand}
              onChange={handleChange}
            />
            <input
              className="sell-page__container__input__form-details__input"
              type="text"
              required
              placeholder="Model"
              name="model"
              value={model}
              onChange={handleChange}
            />
            <input
              className="sell-page__container__input__form-details__input"
              type="text"
              required
              placeholder="Price"
              name="price"
              value={price}
              onChange={handleChange}
            />
            <input
              className="sell-page__container__input__form-details__input"
              type="text"
              required
              placeholder="km ran"
              name="kmRan"
              value={kmRan}
              onChange={handleChange}
            />
            <input
              className="sell-page__container__input__form-details__input"
              type="text"
              required
              placeholder="reg no"
              name="regNo"
              value={regNo}
              onChange={handleChange}
            />
            <input
              className="sell-page__container__input__form-details__input"
              type="text"
              required
              placeholder="owners"
              name="owners"
              value={owners}
              onChange={handleChange}
            />
            <input
              className="sell-page__container__input__form-details__input"
              type="text"
              required
              placeholder="Fuel used"
              name="fuelType"
              value={fuelType}
              onChange={handleChange}
            />
            <input
              className="sell-page__container__input__form-details__input description"
              type="text"
              required
              placeholder="description"
              name="description"
              value={description}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="sell-page__container__input__form-details__button"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
