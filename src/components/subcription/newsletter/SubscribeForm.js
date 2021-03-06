import * as React from 'react';
import Form from './Form';
import subcriptionService from '../../../services/common/PostService';

/**
 * @description SubscribeForm component is used to render the subscribe form
 * for the newsletter subscription.
 * @returns {React.Component}  SubscribeForm
 */
export default function SubscribeForm() {
  const [email, setEmail] = React.useState('');

  //form error handling
  const [formError, setFormError] = React.useState(null);

  const [success, setSuccess] = React.useState(false);

  /**
   * @function handleChange handle the user input
   * @param event
   */
  const handleInputChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
    console.log(email);
  };

  /**
   * @function resetCredentials reset the user's credentials
   * update the state with empty values.
   * @return void
   */
  const resetUserInput = () => {
    setEmail('');
  };

  /**
   * @function handleSubmit handle the form submission to backend(strapi).
   * @param {*} event  event object
   * @returns  void
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // check if the email is valid
      if (email === '' || email === null || email === undefined || !email.includes('@')) {
        setFormError('Please fill all the fields');
        return;
      }
      console.log(email);

      const isEmailAlreadyExists = await checkIfEmailIsExistedOrNot(email);
      console.log(isEmailAlreadyExists);

      if (isEmailAlreadyExists) {
        setSuccess(false);
        setFormError('Email already exists');
        setTimeout(() => {
          setFormError(null);
        }, 4000);
        console.log('Email already exists');
        return;
      }

      // send the user input(email) to the backend service(strapi)
      // in order to subscribe Newsletter and in return, get the response(http) back.
      //Also, the User get an email notification.
      const response = await subcriptionService.post('/newsletters', { email });
      console.log('this is from post', response);

      await checkFormSubmittedOrNot(response);
      resetUserInput();
    } catch (error) {
      console.log(error);
      setFormError('Something went wrong');
      setSuccess(false);
    }
  };

  //check if the form is submitted or not and update the state accordingly.
  const checkFormSubmittedOrNot = async (response) => {
    if (response.statusText === 'OK' && response.status === 200) {
      setSuccess(true);
      setFormError('You have successfully subscribed to our newsletter');
      setTimeout(() => {
        setFormError(null);
      }, 4000);
    }
  };

  //check if the email is already existed or not.
  // if the email is already existed, return true.
  const checkIfEmailIsExistedOrNot = async (email) => {
    const response = await subcriptionService.get('/newsletters');
    console.log('this is to check', response.data);
    if (response && response.data.length > 0) {
      return response.data.filter((element) => element.email === email).length > 0;
    }
    return false;
  };

  return (
    <Form
      onSubmit={handleSubmit}
      formError={formError}
      success={success}
      email={email}
      handleInputChange={handleInputChange}
    />
  );
}
