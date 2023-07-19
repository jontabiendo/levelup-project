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

  // const validate = () => {
  //   let errs = {}
  //   console.log(email)
  //   if (!email.endsWith(".com") && !email.endsWith(".net") && !email.endsWith('.org') && !email.endsWith('.io')) errs.email = "Invalid credentials"

  //   setErrors(errs)
  //   console.log(errs)
  //   if (Object.values(errs).length === 0) return true
  //   else return false
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validate()) {
      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
        return
      } else history.push('/lists')
    // }
  };

  const guestSignin = async () => {
    await dispatch(login("demo@aa.io", "password"));
    history.push('/lists')
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
