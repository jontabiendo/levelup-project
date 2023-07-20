import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/lists" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
      const data = await dispatch(login(email, password));

      const res = await data
      if (data) {
        setErrors(data);
        return
      } else history.push('/lists')
  };

  const guestSignin = async () => {
    const data = await dispatch(login("demo@aa.io", "password"));
    const res = await data
      if (data) {
        setErrors(data);
        return
      } else history.push('/lists')
  }

  return (
    <div className="login-form-div">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {errors.errors && <p className="errors">Invalid credentials</p>}
        <label>
          Email: 
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <div className="alt-buttons">
        <button onClick={guestSignin}>Continue as guest</button>
        <button onClick={() => history.push('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default LoginFormPage;
