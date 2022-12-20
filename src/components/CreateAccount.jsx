import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";




const CreateAccount = () => {

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [errorUserAuth, setErrorUserAuth] = useState(false)
  const [validateUserAuth, setValidateUserAuth] = useState(false)

  const handleNewUser = async (e) => {
    e.preventDefault()
    const auth = getAuth();
    if (emailInput.length === 0 | passwordInput.length === 0) {
      setErrorUserAuth(true)
      setEmailInput('')
      setPasswordInput('')
      setTimeout(() => {
        setErrorUserAuth(false)
      }, 3000);
      return;
    }
    await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
      .then(() => {
        setEmailInput('')
        setPasswordInput('')
        setValidateUserAuth(true)
        setTimeout(() => {
          setValidateUserAuth(false)
        }, 3000);
      })
      .catch(() => {
        setEmailInput('')
        setPasswordInput('')
        setErrorUserAuth(true);

        setTimeout(() => {
          setErrorUserAuth(false)
        }, 3000);
      });
  }

  return (
    <>
      <div className='h-screen w-screen bg-slate-600 flex justify-center items-center'>
        <div className="w-full max-w-xs">
          <form onSubmit={handleNewUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-slate-600 text-sm font-bold mb-2">
                Email
              </label>
              <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" required />
            </div>
            <div className="mb-6">
              <label className="block text-slate-600 text-sm font-bold mb-2">
                Password
              </label>
              <input value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" required />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <button className="bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Create Account Now
              </button>
              <Link to={'/'}><button className="bg-slate-600 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                LogIn
              </button></Link>
            </div>
            {errorUserAuth === true ? <h1 className='flex justify-center mt-4  font-bold text-xs text-red-800 text-center font-mono '>El usuario ya ha sido registrado o no se han llenado los campos correctamente.</h1> : null}
            {validateUserAuth === true ? <h1 className='flex justify-center mt-4  font-bold text-xs text-green-800 font-mono '>¡Cuenta creada exitosamente!</h1> : null}
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateAccount