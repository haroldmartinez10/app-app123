import React from 'react'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const Welcome = ({ userEmail, handleSignOut, handleCollectionUser }) => {


    const handleChangePassword = async () => {
        const auth = getAuth();
        await sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Sended!')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <div className="w-full flex justify-between px-2 py-2 ">
                    <h1 className='py-2 px-2 font-mono'>¡Bienvenido!</h1>
                    <button onClick={handleSignOut} className="bg-red-600 text-sm  text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Log Out
                    </button>

                </div>

                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2"></div>
                    <p className="text-gray-700 text-base text-left font-mono">
                        {userEmail}, es un gusto tenerte por aqui!
                        Esto es simplemente una prueba de autenticacion, la aplicacion ira siendo desarrollada pronto.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Welcome;