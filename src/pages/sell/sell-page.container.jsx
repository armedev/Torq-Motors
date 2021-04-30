import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

import SellPage from './sell-page.component';

import firebase, { firestore, storage } from '../../firebase/firebase.utils';
import Loader from '../../components/loader/loader.component';
import animationData from '../../assets/lottie/loadinganimationnormal.json';

const SellPageWithLoader = Loader(SellPage);

const SellPageContainer = ({ history, currentUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    exPrice: '',
    brand: '',
    kmRan: '',
    regNo: '',
    description: '',
    owners: '',
    ownerName: '',
    phNo: '',
  });
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //resizer
  const THUMB_MAX_HEIGHT = 700;
  const resizeFile = async (fileImage) =>
    await imageCompression(fileImage, { maxWidthOrHeight: THUMB_MAX_HEIGHT });

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'phNo'
      ? setFormData({
          ...formData,
          phNo:
            Number(value) < Number('10000000000') && Number(value) >= 0
              ? value
              : formData.phNo,
        })
      : name === 'model'
      ? setFormData({
          ...formData,
          model:
            Number(value) <= new Date().getFullYear() && Number(value) >= 0
              ? value
              : formData.model,
        })
      : setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const files = await e.target.files;
      const Images = [];
      for (let index = 0; index < files.length; index++) {
        await resizeFile(files[index])
          .then((res) => {
            Images.push(res);
          })
          .catch((err) => console.log(err));
      }
      setFile(Images);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phNo.length !== 10) {
      alert('phone number should be 10 digits');
      return;
    }
    setIsLoading(true);
    if (currentUser && file.length !== 0) {
      const collectionRef = firestore.collection('collectionsToBuy');
      const res = await collectionRef.add({
        ...formData,
        submittedOn: firebase.firestore.Timestamp.now(),
        submittedBy: currentUser.id,
        attributes: {
          isBought: false,
          isSold: false,
        },
      });
      const uploadRef = storage.ref(`imagesToBuy/${res.id}`);
      for (let i = 0; i < file.length; i++) {
        await uploadRef
          .child(`${i}.jpg`)
          .put(file[i])
          .then((snapshot) => {
            console.log(snapshot, 'uploaded');
          });
      }

      setFormData({
        name: '',
        model: '',
        exPrice: '',
        brand: '',
        kmRan: '',
        regNo: '',
        description: '',
        owners: '',
        ownerName: '',
        phNo: '',
      });
      setFile([]);
      alert('submitted');
      history.push('/buy');
    } else {
      if (file.length === 0) {
        alert('Select atleast one image');
      } else {
        alert('YOU don`t have the permission to do that :(');
        history.push('/');
      }
      setIsLoading(false);
    }
  };
  return (
    <SellPageWithLoader
      {...formData}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      isLoading={isLoading}
      animationData={animationData}
      image={file ? file[0] : null}
      textData={'Submitting....'}
    />
  );
};

export default withRouter(SellPageContainer);
