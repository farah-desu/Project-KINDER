import React, { useState, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [image, setImage] = useState(null); // New state for image
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    if (image) {
      formData.append('image', image);
    }

    axios.post('http://localhost:3001/api/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        alert('Register successful!');
        navigate('/SignIn');
      }).catch((err) => {
        alert('Register failed!');
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/api/login', { email, password })
      .then((res) => {
        if (res.data.message === 'Login successful') {
          alert(`Welcome, ${res.data.name}!`);
          localStorage.setItem('userName', res.data.name);
          localStorage.setItem('userEmail', res.data.email);
          localStorage.setItem('userId', res.data.id);
          const email = res.data.email;
          const domain = email.split('@')[1];
          if (domain === 'kinder.ac.bd') {
            navigate('/Dashboard');
          } else if (domain === 'kinder.admin.ac.bd') {
            navigate('/Admin_Dashboard');
          } else {
            navigate('/Teacher_Dashboard');   //baby_sitter
          }
        } else {
          alert('Login failed! Please check your credentials.');
        }
      });
  }

  return (
    <>
      <div>
        <div className={`login-wrapper wrapper ${isActive ? 'active' : ''}`} style={{ background: "#081b29" }}>
          <span className="bg-animate"></span>
          <span className="bg-animate2"></span>

          {/* Login Form */}
          <div className="form-box login">
            <h2 className='text-white text-3xl font-extrabold'>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-box">
                <input type="text" value={email} onChange={(e) => {
                  setEmail(e.target.value);
                  setDomain(e.target.value.split("@")[1]);
                }} required />
                <label>Email</label>
                <i className="bx bxs-user"></i>
              </div>
              <div className="input-box">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label>Password</label>
                <i className="bx bxs-lock-alt"></i>
              </div>
              <button type="submit" className="btn">Login</button>
              <div className="logreg-link">
                <p>
                  Don't have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsActive(true); }}>
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Register Form */}
          <div className="form-box register">
            <h2 className='text-white text-3xl font-extrabold'>Sign Up</h2>
            <form onSubmit={handleRegister}>
              <div className="input-box">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <label>Username</label>
                <i className="bx bxs-user"></i>
              </div>
              <div className="input-box">
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Email</label>
                <i className="bx bxs-envelope"></i>
              </div>
              <div className="input-box">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label>Password</label>
                <i className="bx bxs-lock-alt"></i>
              </div>
              <div className="input-box">
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                <label style={{ top: '-5px' }}>Nid Picture</label>
                <i className="bx bxs-camera"></i>
              </div>
              <div className="input-box">
  <select value={role} onChange={(e) => setRole(e.target.value)} required style={{ background: "transparent", color: "white", borderBottom: "2px solid white", width: "100%", height: "100%", fontSize: "16px" }}>
    <option value="" disabled hidden>Select Role</option>
    <option value="parent" style={{ color: 'black' }}>Parent</option>
    <option value="babysitter" style={{ color: 'black' }}>Babysitter</option>
  </select>
  <label style={{ top: '-5px', color: '#0ef' }}>Role</label>
  <i className="bx bxs-user-pin"></i>
</div>

              <button type="submit" className="btn">Sign Up</button>
              <div className="logreg-link">
                <p>
                  Already have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsActive(false); }}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Info Texts */}
          <div className="info-text login">
            <h2 className='text-3xl font-bold'>Welcome Back!</h2>
            <p>We're excited to have you again. Please log in to access your account.</p>
          </div>
          <div className="info-text register">
            <h2 className='text-3xl font-bold'>Join Us</h2>
            <p>Create your account and enjoy our features.</p>
          </div>
        </div>
      </div>

      {/* Merged CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #081b29;
        }

        .wrapper {
          position: relative;
          width: 750px;
          height: 550px;
          background: transparent;
          border: 2px solid #0ef;
          box-shadow: 0 0 25px rgba(93, 189, 226, 0.5);
          overflow: hidden;
        }

        .form-box {
          position: absolute;
          top: 0;
          width: 50%;
          height: 550px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: transform 0.6s ease;
          z-index: 1;
        }

        .form-box.login {
          left: 0;
          transform: translateX(0);
          z-index: 2;
        }

        .wrapper.active .form-box.login {
          transform: translateX(-100%);
          z-index: 1;
        }

        .form-box.register {
          right: 0;
          transform: translateX(100%);
        }

        .wrapper.active .form-box.register {
          transform: translateX(0);
          z-index: 2;
        }

        .input-box {
          position: relative;
          width: 100%;
          height: 50px;
          margin: 25px 0;
        }

        .input-box input {
          width: 100%;
          height: 100%;
          padding: 0 40px 0 10px;
          border: none;
          outline: none;
          background: transparent;
          color: white;
          font-size: 16px;
          border-bottom: 2px solid white;
        }

        .input-box input:focus,
        .input-box input:valid {
          border-bottom-color: #0ef;
        }

        .input-box label {
          position: absolute;
          top: 50%;
          left: 10px;
          transform: translateY(-50%);
          color: white;
          font-size: 14px;
          pointer-events: none;
          transition: 0.5s;
        }

        .input-box input:focus ~ label,
        .input-box input:valid ~ label {
          top: -5px;
          color: #0ef;
        }

        .input-box i {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: white;
        }

        .input-box input:focus ~ i,
        .input-box input:valid ~ i {
          color: #0ef;
        }

        .btn {
          width: 100%;
          height: 50px;
          background: transparent;
          border: 2px solid #0ef;
          border-radius: 40px;
          color: white;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 300%;
          background: linear-gradient(#081b29, #0ef, #081b29, #0ef);
          transition: 0.5s;
          z-index: -1;
        }

                .btn:hover::before {
          top: 0;
        }

        .logreg-link {
          font-size: 14px;
          color: white;
          text-align: center;
          margin-top: 20px;
        }

        .logreg-link a {
          color: #0ef;
          text-decoration: none;
          font-weight: 600;
        }

        .logreg-link a:hover {
          text-decoration: underline;
        }

        .info-text {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
          text-align: center;
          transition: transform 0.6s ease;
          z-index: 1;
        }

        .info-text.login {
          right: 0;
        }

        .info-text.register {
          left: 0;
          transform: translateX(-100%);
        }

        .wrapper.active .info-text.register {
          transform: translateX(0);
          z-index: 2;
        }

        .wrapper.active .info-text.login {
          transform: translateX(100%);
          z-index: 1;
        }

        .bg-animate,
        .bg-animate2 {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, #0ef, #081b29, #0ef);
          animation: rotate 6s linear infinite;
          z-index: 0;
          opacity: 0.2;
        }

        .bg-animate2 {
          animation-direction: reverse;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .login-page {
          background: #081b29;
        }
      `}</style>
    </>
  );
};

export default LoginForm;

