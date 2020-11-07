import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import imageCompression from "browser-image-compression";

import SellPage from "./sell-page.component";

import firebase, { firestore, storage } from "../../firebase/firebase.utils";
import Loader from "../../components/loader/loader.component";
import animationData from "../../assets/lottie/loadinganimationnormal.json";

const SellPageWithLoader = Loader(SellPage);

const SellPageContainer = ({ history, currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
    brand: "",
    kmRan: "",
    regNo: "",
    description: "",
    owners: "",
    fuelType: "",
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //resizer
  const THUMB_MAX_HEIGHT = 700;
  const resizeFile = async (fileImage) =>
    await imageCompression(fileImage, { maxWidthOrHeight: THUMB_MAX_HEIGHT });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("getting called");
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

    if (currentUser) {
      const collectionRef = firestore.collection("collectionsToBuy");
      const res = await collectionRef.add({
        ...formData,
        submittedOn: firebase.firestore.Timestamp.now(),
        submittedBy: currentUser.id,
        attributes: {
          isAvailable: true,
          isSold: false,
        },
      });
      const uploadRef = storage.ref(`imagesToBuy/${res.id}`);
      for (let i = 0; i < file.length; i++) {
        await uploadRef
          .child(`${i}.jpg`)
          .put(file[i])
          .then((snapshot) => {
            console.log(snapshot, "uploaded");
          });
      }

      setFormData({
        name: "",
        model: "",
        price: "",
        brand: "",
        kmRan: "",
        regNo: "",
        description: "",
        owners: "",
        fuelType: "",
      });
      setFile(null);
      setIsLoading(false);
      alert("Submitted");
    } else {
      alert("YOU don`t have the permission to do that :(");
      history.push("/");
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
    />
  );
};

export default withRouter(SellPageContainer);
