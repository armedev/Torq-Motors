import React, { useEffect, useState } from 'react';

import SignUp from './sign-up.component';

import { auth, createUserProfileDoc } from '../../firebase/firebase.utils';
import Loader from '../../components/loader/loader.component';
import animationDataLoading from '../../assets/lottie/loadinganimationnormal.json';

const SignUpwithLoader = Loader(SignUp);

const SignUpContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  const { email, password, displayName, confirmPassword } = userCredentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 6) {
      setIsLoading(true);
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await createUserProfileDoc(user, { displayName });
        setUserCredentials({
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
      setIsLoading(false);
    } else {
      setUserCredentials({
        ...userCredentials,
        password: '',
        confirmPassword: '',
      });
      setIsLoading(false);
      alert(
        password !== confirmPassword
          ? 'password don`t match'
          : 'password length should be greater than 6'
      );
    }
  };

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <SignUpwithLoader
      isLoading={isLoading}
      heightXWidth={200}
      animationData={animationDataLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      displayName={displayName}
      textData={'Signing In....'}
    />
  );
};

export default SignUpContainer;
