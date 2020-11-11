import React from "react";

import "./sell-page.styles.scss";

import { animationfunc } from "../../utils/button-animations/otherfuncs";
import Spinner from "../../components/spinner/spinner.component";
import { motion } from "framer-motion";

const staggerAnimation = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.3,
      direction: 1,
      when: "afterChildren",
    },
  },
  out: {
    opacity: 0,
  },
};

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
  return (
    <motion.div
      variants={staggerAnimation}
      initial="hidden"
      animate="show"
      exit="out"
      className="sell-page"
    >
      <div className="sell-page__container">
        <div className="sell-page__container__image">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="bike"
              className="sell-page__container__image__raw"
            />
          ) : (
            <Spinner textData={"No Image Selected..."} />
          )}
        </div>
        <div className="sell-page__container__input">
          <form
            onSubmit={handleSubmit}
            className="sell-page__container__input__form-details"
          >
            <div>
              SELECT IMAGES:
              <input
                type="file"
                className="sell-page__container__input__form-details__file"
                required
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
            </div>
            <div>
              NAME:
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div>
              Brand:
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="eg: Yamaha, Hero"
                name="brand"
                value={brand}
                onChange={handleChange}
              />
            </div>
            <div>
              Model:
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="Manufacture Year"
                name="model"
                value={model}
                onChange={handleChange}
              />
            </div>
            <div>
              Price (in ₹):
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="Price"
                name="price"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div>
              Km Ran by Bike:
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="km ran"
                name="kmRan"
                value={kmRan}
                onChange={handleChange}
              />
            </div>
            <div>
              RTO reg no:
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="eg: KA 01 AA 1234"
                name="regNo"
                value={regNo}
                onChange={handleChange}
              />
            </div>
            <div>
              No of Owners:
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="owners"
                name="owners"
                value={owners}
                onChange={handleChange}
              />
            </div>
            <div>
              Fuel Type:
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="petrol, petrol+oil"
                name="fuelType"
                value={fuelType}
                onChange={handleChange}
              />
            </div>
            <div>
              other details (such as INSURANCE LAPSE date, last serviced date):
              <input
                className="sell-page__container__input__form-details__input description"
                type="text"
                required
                placeholder="description"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              onMouseEnter={(e) => animationfunc(e)}
              className="sell-page__container__input__form-details__button button__styles drive"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default SellPage;
