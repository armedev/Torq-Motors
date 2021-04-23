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
    price: '',
    brand: '',
    kmRan: '',
    regNo: '',
    description: '',
    owners: '',
    fuelType: '',
  });
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //resizer
  const THUMB_MAX_HEIGHT = 700;
  const resizeFile = async (fileImage) =>
    await imageCompression(fileImage, { maxWidthOrHeight: THUMB_MAX_HEIGHT });

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value)
    setFormData({ ...formData, [name]: value });
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
    setIsLoading(true);

    if (currentUser && file.length !== 0) {
      const collectionRef = firestore.collection('collectionsToBuy');
      const res = await collectionRef.add({
        ...formData,
        submittedOn: firebase.firestore.Timestamp.now(),
        submittedBy: currentUser.id,
        ownerName: currentUser.displayName,
        attributes: {
          isAvailable: true,
          isSold: false,
        },
      });
      const uploadRef = storage.ref(`images/${res.id}`);
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
        price: '',
        brand: '',
        kmRan: '',
        regNo: '',
        description: '',
        owners: '',
        fuelType: '',
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
