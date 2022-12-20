import React from 'react'

const FormTask = ({ handleCollectionUser, inputNameTask, setInputNameTask, inputDescriptionTask, setInputDescriptionTask }) => {

    const handleTaskSubmit = (e) => {
        e.preventDefault()
        setInputNameTask('')
        setInputDescriptionTask('')
        handleCollectionUser()
    }
    return (
        <div className=' bg-slate-600 flex justify-center items-center'>
            <div className="w-full max-w-xs">
                <form onSubmit={handleTaskSubmit} className="bg-white shadow-md w- rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-slate-600 text-sm font-bold mb-2">
                            Name Of Task
                        </label>
                        <input value={inputNameTask} onChange={(e) => setInputNameTask(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name Of Task" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-600 text-sm font-bold mb-2">
                            Description Task
                        </label>
                        <input value={inputDescriptionTask} onChange={(e) => setInputDescriptionTask(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Description Of Task" required />
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                        <button className="bg-green-600   text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="buton">
                            Send Task
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default FormTask