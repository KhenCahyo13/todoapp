import axios from "axios"
import { useState } from "react"

const EditModal = ({ open, onClose, name, cName, date, cDate, description, cDescription, id_todo }) => {
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    if(!open) return null

    const updateTodo = (id_todo) => {
        axios.put(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/${id_todo}`, {
            name, date, description
        }).then((response) => {
            setMsg(response.data.msg + ', please wait...')
            setLoading(true)
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="bg-gray-900 bg-opacity-20 w-full min-h-screen fixed top-0 left-0 px-8 py-32 md:px-32 lg:px-96 dark:bg-blue-600 dark:bg-opacity-10">
            <div className="bg-white rounded-md shadow-md px-4 py-4 dark:bg-gray-700">
                <div className="flex items-center justify-between">
                    <h1 className="font-medium text-lg dark:text-white">Modal Form Edit ToDo</h1>
                    <button onClick={onClose}><i className="fa-solid fa-xmark dark:text-white"></i></button>
                </div>
                {
                    msg &&
                    <div className="success-box" id="msgBox">
                        <p className="success-text">{msg}</p>
                    </div>
                }
                <form className="mt-6">
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-pencil text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={cName} value={name} type="text" className="form-control" placeholder="Enter your todo name" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-calendar text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={cDate} value={date} type="date" className="form-date" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="textarea-icon">
                            <i className="fa-solid fa-receipt text-blue-500 text-lg"></i>
                        </div>
                        <textarea onChange={cDescription} value={description} className="form-control" cols="30" rows="4" placeholder="Add description"></textarea>
                    </div>
                    <div className="flex items-center mt-4 gap-4 lg:w-[40%]">
                        <button onClick={() => updateTodo(id_todo)} type="button" className="btn-blue">{ loading ? "Loading..." : "Update Todo" }</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditModal;