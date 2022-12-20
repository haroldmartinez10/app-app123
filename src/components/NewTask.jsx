import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import Task from './Welcome';
import FormTask from './FormTask';
import { Link } from "react-router-dom";

const NewTask = () => {

  const auth = getAuth();
  const [userEmail, setUserEmail] = useState('')
  const [userAuth, setUserAuth] = useState('')
  const [allTasksUser, setAllTasksUser] = useState([])
  const [inputNameTask, setInputNameTask] = useState('')
  const [inputDescriptionTask, setInputDescriptionTask] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userEmail = user.email
        setUserAuth(uid)
        setUserEmail(userEmail)
        onSnapshot(collection(db, userEmail), (item) => {
          const allTasks = []
          item.forEach((tasks) => (
            allTasks.push({ ...tasks.data(), id: tasks.id })
          ))
          setAllTasksUser(allTasks)
        })
      } else {
        navigate('/')
      }
    });

  }, [])

  const handleSignOut = async () => {
    navigate('/')
    const auth = getAuth();
    await signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

  const handleCollectionUser = async () => {

    try {
      const docRef = await addDoc(collection(db, userEmail), {
        name: inputNameTask,
        description: inputDescriptionTask,
        userMember: userEmail,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }


    try {
      const docRef = await addDoc(collection(db, 'allTasks'), {
        name: inputNameTask,
        description: inputDescriptionTask,
        userMember: userEmail,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }

  const handleDeleteTask = async (id) => {
    await deleteDoc(doc(db, userEmail, id))
  }

  return (

    <>
      <div className='h-screen bg-slate-600  '>

        <div className='w-full flex justify-center py-5'>
          <Task userEmail={userEmail} handleSignOut={handleSignOut} handleCollectionUser={handleCollectionUser} />
        </div>
        <div className='w-full flex items-center justify-center mb-4'>
          <Link to={'/AllTasks'}><button className="bg-green-600   text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="buton">
            VER TAREAS DE OTROS USUARIOS
          </button></Link>
        </div>
        <FormTask handleCollectionUser={handleCollectionUser}
          inputNameTask={inputNameTask}
          setInputNameTask={setInputNameTask}
          inputDescriptionTask={inputDescriptionTask}
          setInputDescriptionTask={setInputDescriptionTask} />

        <div className='w-full flex flex-col justify-center items-center bg-slate-600 px-4'>
          {allTasksUser.map((task) => (

            <div key={task.id} className="max-w-sm  rounded overflow-hidden shadow-lg bg-slate-50 mt-4">
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 max-w-prose break-all text-center">{task.name}</div>
                <p class="text-gray-700 text-base max-w-prose break-all text-center">
                  {task.description}
                </p>
              </div>
              <div class="px-6 pt-4 pb-2 flex justify-center items-end ">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><span className='font-bold text-green-600'>#</span>{task.userMember}</span>

              </div>
              <div className='w-full flex justify-center mb-3'>
                <button onClick={() => handleDeleteTask(task.id)} className="bg-red-600 flex justify-center items-center  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="buton">
                  Delete Task
                </button>
              </div>
            </div>

          ))}
        </div>

      </div>













    </>
  )
}

export default NewTask;