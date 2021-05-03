import React, { useEffect, useState } from 'react';

import SignIn from './sign-in.component';

import { auth, signInWithGooglepopup } from '../../firebase/firebase.utils';
import Loader from '../../components/loader/loader.component';
import animationDataLoading from '../../assets/lottie/loadinganimationnormal.json';

const SignInwithLoader = Loader(SignIn);

const SignInContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      window.flash('login successful');
    } catch (error) {
      setIsLoading(false);
      console.log('ERROR: ', error.message);
      window.flash(error.message, 'error');
    }

    setUserCredentials({ email: '', password: '' });
  };

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <SignInwithLoader
      isLoading={isLoading}
      heightXWidth={200}
      animationData={animationDataLoading}
      signInWithGoogle={() => signInWithGooglepopup(setIsLoading)}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      email={email}
      password={password}
      textData={'Signing In....'}
    />
  );
};

export default SignInContainer;
