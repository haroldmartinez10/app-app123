import React, { useState, useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setEmailU }) => {

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        navigate('NewTask')
      }
    });

  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setSignInEmail('')
    setSignInPassword('')
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      .then((userCredential) => {
        const user = userCredential.user;

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(true)

        setTimeout(() => {
          setErrorMessage(false)
        }, 3000);
      });
  }

  return (
    <>
      <div className='h-screen w-screen bg-slate-600 flex justify-center items-center'>
        <div className="w-full max-w-xs">
          <form onSubmit={handleLogin} className="bg-white shadow-md w- rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-slate-600 text-sm font-bold mb-2">
                Email
              </label>
              <input value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" />
            </div>
            <div className="mb-6">
              <label className="block text-slate-600 text-sm font-bold mb-2">
                Password
              </label>
              <input value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" />
            </div>
            <div className="flex items-center gap-2 justify-between">
              <button className="bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Login
              </button>
              <Link to={'/CreateAccount'}><button className="bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Register
              </button> </Link>
              <button className="inline-block align-baseline font-bold text-sm text-slate-600 hover:text-slate-400">
                Forgot Password?
              </button>
            </div>
            {errorMessage === true ? <h1 className='flex justify-center mt-4 font-bold text-xs text-red-800 text-center font-mono'>Datos incorrectos.</h1> : null}
          </form>
        </div>
      </div>
    </>
  )
}

export default Login