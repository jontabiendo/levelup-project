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

  const [loggingIn, setLogginIn] = useState(false)

  if (sessionUser) return <Redirect to="/lists" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
      const data = await dispatch(login(email, password));
      // setLogginIn(true)
      // setTimeout(console.log, 3000, "logging in")
      const res = await data
      if (data) {
        setErrors(data);
        setLogginIn(false)
        return
      } else {
        setLogginIn(false)
        history.push('/lists')
      }
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
      {/* {loggingIn ? (
        <div className="loading-div">
          <div className="loading-wrapper">
            <iframe  id='deleting-gif' src="https://giphy.com/embed/TZco470UACpNK" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            <h3>loading...</h3>
          </div>
          <div id='video-overlay' onClick={null}></div>
        </div>
      ) : null} */}
    </div>
  );
}

export default LoginFormPage;
