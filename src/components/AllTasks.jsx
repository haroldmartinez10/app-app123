import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import '../css/allTasks.css'


const AllTasks = () => {

    const [allTasksUsers, setAllTasksUsers] = useState([])

    const auth = getAuth();
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            } else {
                navigate('/')
            }
        });

    }, [])

    useEffect(() => {

        onSnapshot(collection(db, 'allTasks'), (item) => {
            const allUsersTasks = []
            item.forEach((tasks) => (
                allUsersTasks.push({ ...tasks.data(), id: tasks.id })
            ))
            setAllTasksUsers(allUsersTasks)

        })

    }, [])



    return (
        <>

            <div className='flex flex-col justify-center items-center'>

                <Link to={'/NewTask'}><button className='bg-red-600 flex justify-center items-center mt-4  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Volver a tu Perfil</button></Link>
                {allTasksUsers.map((task) => (

                    <div key={task.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 mt-4 px-4">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 max-w-prose break-all text-center">{task.name}</div>
                            <p className="text-gray-700 text-base max-w-prose break-all text-center">
                                {task.description}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2 flex justify-center items-end ">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><span className='font-bold text-green-600'>#</span>{task.userMember}</span>

                        </div>

                        <div className='w-full flex justify-center mb-3'>
                        </div>
                    </div>

                ))}
            </div>

        </>
    )
}

export default AllTasks