import React from 'react';

import './sell-page.styles.scss';

import { animationfunc } from '../../utils/button-animations/otherfuncs';
import Spinner from '../../components/spinner/spinner.component';
import { motion } from 'framer-motion';

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
      when: 'afterChildren',
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
  exPrice,
  kmRan,
  regNo,
  owners,
  description,
  ownerName,
  phNo,
  address,
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
            <Spinner textData={'No Image Selected...'} />
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
                placeholder="Name of the bike"
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
                type="number"
                min={new Date().getFullYear() - 20}
                max={new Date().getFullYear()}
                onWheel={(event) => event.currentTarget.blur()}
                step="1"
                required
                placeholder={`Manufacture Year    min(${
                  new Date().getFullYear() - 20
                })`}
                name="model"
                value={model}
                onChange={handleChange}
              />
            </div>
            <div>
              Price (in ₹):
              <input
                className="sell-page__container__input__form-details__input"
                type="number"
                onWheel={(event) => event.currentTarget.blur()}
                min="0"
                required
                placeholder="Expecting price"
                name="exPrice"
                value={exPrice}
                onChange={handleChange}
              />
            </div>
            <div>
              Km Ran by Bike:
              <input
                className="sell-page__container__input__form-details__input"
                type="number"
                onWheel={(event) => event.currentTarget.blur()}
                min="0"
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
                placeholder="eg: KA XX AB XXXX"
                name="regNo"
                value={regNo}
                onChange={handleChange}
              />
            </div>
            <div>
              No of Owners:
              <input
                className="sell-page__container__input__form-details__input"
                type="number"
                onWheel={(event) => event.currentTarget.blur()}
                min="1"
                step="1"
                required
                placeholder="owner serial number"
                name="owners"
                value={owners}
                onChange={handleChange}
              />
            </div>
            <div>
              Owner Name:
              <input
                className="sell-page__container__input__form-details__input"
                type="text"
                required
                placeholder="Owner Name"
                name="ownerName"
                value={ownerName}
                onChange={handleChange}
              />
            </div>
            <div>
              <span>
                Phone NO: <small>*For fast communication purposes</small>
              </span>
              <input
                className="sell-page__container__input__form-details__input"
                type="number"
                onWheel={(event) => event.currentTarget.blur()}
                required
                placeholder="Phone Number"
                name="phNo"
                value={phNo}
                onChange={handleChange}
                min={0}
                max={9999999999}
              />
            </div>
            <div>
              Location (Address of vehicle):
              <textarea
                className="sell-page__container__input__form-details__input description"
                type="text"
                placeholder="Current location of the bike"
                name="address"
                value={address}
                onChange={handleChange}
              ></textarea>
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
        <div className="sell-page__container__tips">
          <span>TIPS</span>
          <ol>
            <li>
              Try to send the photos of rc card and bike in clear sunshine
            </li>
            <li>
              Submit Your phone number so that we can get in touch with you
              faster
            </li>
            <li>Make a reasonable price to expect fast process</li>
            <li>
              You can only send the bike form only if it is less than 20 yrs of
              age
            </li>
          </ol>
        </div>
      </div>
    </motion.div>
  );
};

export default SellPage;
