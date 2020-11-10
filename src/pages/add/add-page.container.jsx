import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import imageCompression from "browser-image-compression";

import AddPage from "./add-page.component";

import firebase, { firestore, storage } from "../../firebase/firebase.utils";
import Loader from "../../components/loader/loader.component";
import animationData from "../../assets/lottie/loadinganimationnormal.json";

const AddPageWithLoader = Loader(AddPage);

const AddPageContainer = ({ history, currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    price: "",
  });
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //resizer
  const THUMB_MAX_HEIGHT = 700;
  const resizeFile = async (fileImage) =>
    await imageCompression(fileImage, { maxWidthOrHeight: THUMB_MAX_HEIGHT });

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

    if (currentUser.email === "epiratesdev@gmail.com") {
      const collectionRef = firestore.collection("collections");
      const res = await collectionRef.add({
        ...formData,
        createdAt: firebase.firestore.Timestamp.now(),
        attributes: {
          isAvailable: true,
        },
      });
      const uploadRef = storage.ref(`images/${res.id}`);
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
      });
      setFile([]);
      setIsLoading(false);
      alert("Uploaded");
    } else {
      alert("YOU don`t have the permission to do that :(");
      history.push("/");
    }
  };
  return (
    <AddPageWithLoader
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

export default withRouter(AddPageContainer);
