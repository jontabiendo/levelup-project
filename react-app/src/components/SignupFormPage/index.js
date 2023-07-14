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
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(firstName, lastName, email, password));
        if (data) {
          setErrors(data)
        }
        history.push('/lists')
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const guestSignin = async () => {
    await dispatch(login("demo@aa.io", "password"));
  }

  return (
    <div className="signup-form-div">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} id="signup-form">
        <ul>
          {errors.map((error, idx) => <li key={idx} className="errors">{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
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
