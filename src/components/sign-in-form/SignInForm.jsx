import { useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/FormInput";
import Button from "../button/Button";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Reset the form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  // Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Incorrect email or password!");
      }
      console.log(error);
    }
  };

  // Update the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
