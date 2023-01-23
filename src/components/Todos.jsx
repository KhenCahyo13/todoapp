import axios from "axios"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"

const ToDo = () => {
    const [todos, setTodos] = useState([])
    const { id_todo } = useParams()

    useEffect(() => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)

        // Storing ToDo List by Fullname User in Database
        axios.get(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/${parse.fullname}`)
        .then((response) => {
            setTodos(response.data.data)
        }).catch((error) => {
            console.log(error.response.data.msg)
        })
    }, [])

    // Delete Todo
    const handleDelete = (id_todo) => {
        Swal.fire({
            title: 'Your todo will be deleted.!',
            text: "Are you sure you want to delete your todo?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/${id_todo}`)
              .then((response) => {
                  Swal.fire(
                    'Deleted!',
                    response.data.msg,
                    'success'
                  )
              }).catch((error) => {
                console.log(error)
              })
            }
          })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5 md:gap-y-4 lg:grid-cols-3">
        {
            todos.map((item) => (
                <div key={item.id_todo} className="bg-gray-50 rounded-md shadow-md px-4 py-4 mt-6 md:mt-0 dark:bg-gray-800">
                    <h1 className="text-blue-600 font-medium dark:text-blue-400">{item.name} <span className="text-sm text-gray-400 font-light dark:text-white">( <Moment format="DD-MM-YYYY">{item.date}</Moment> )</span></h1>
                    <p className="text-sm mt-1 dark:text-white">{item.description}</p>
                    <div className="flex items-center gap-2 mt-4">
                        <button className="btn-blue"><i className="fa-solid fa-spinner"></i></button>
                        <button className="btn-yellow"><i className="fa-solid fa-pen-to-square"></i></button>
                        <button onClick={() => handleDelete(item.id_todo)} className="btn-red"><i className="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            ))
        }
        </div>
    )
}

const Todos = () => {
    return (
        <div className="bg-white rounded-md shadow-md px-4 py-4 dark:bg-gray-700 lg:px-6">
            <h1 className="text-blue-600 font-medium dark:text-blue-400">Todos</h1>
            <p className="text-sm text-gray-400 dark:text-white">Your all list todo in here</p>
            <div className="flex items-center gap-2 mt-4 lg:w-[40%]">
                <button className="btn-blue"><i className="fa-solid fa-list"></i> To Do</button>
                <button className="btn-yellow"><i className="fa-solid fa-spinner"></i> In Process</button>
                <button className="btn-green"><i className="fa-solid fa-check"></i> Completed</button>
            </div>

            <div className="md:mt-6 lg:flex lg:items-center lg:justify-between">
            {/* List of ToDo */}      
                <ToDo />

                <div className="flex justify-end mt-6 lg:mt-0">
                    <img src="./img/image3.png" alt="ToDoImage" className="w-52 lg:w-96" />
                </div>
            </div>
        </div>
    )
}

export default Todos