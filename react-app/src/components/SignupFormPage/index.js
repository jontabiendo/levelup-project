import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp, login } from "../../store/session";
import './SignupForm.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const validate = () => {
    let errs = {}
    console.log(email)
    if (!email.endsWith(".com") && !email.endsWith(".net") && !email.endsWith('.org') && !email.endsWith('.io')) errs.email = "Email must end in .com, .net, .org or .io"
    if (firstName.length > 50) errs.firstName = "First Name can't be longer than 50 characters"
    if (lastName.length > 50) errs.lastName = "Last Name can't be longer than 50 characters"
    if (password.length <= 5) errs.password = "Password must be minimum of 6 characters"
    else if (password !== confirmPassword) errs.password = "Passwords do not match"

    setErrors(errs)
    console.log(errs)
    if (Object.values(errs).length === 0) return true
    else return false
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("logging in...")
        const data = await dispatch(signUp(firstName, lastName, email, password));
        if (data) {
          setErrors(data)
        }
        history.push('/lists')
    } else return null
  };

  const guestSignin = async () => {
    await dispatch(login("demo@aa.io", "password"));
  }

  return (
    <div className="signup-form-div">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} id="signup-form">
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>
          Email: 
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <label>
          First Name: 
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <label>
          Last Name: 
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>
          Password: 
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password: 
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <div className="alt-buttons">
        <button onClick={guestSignin}>Continue as guest</button>
        <Link to='/login'>Already have an account? Sign In</Link>
      </div>
    </div>
  );
}

export default SignupFormPage;
