import axios from "axios"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import Swal from "sweetalert2"
import EditModal from "./EditModal"

const ToDo = () => {
    const [todos, setTodos] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [idTodo, setIdTodo] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)

        // Storing ToDo List by Fullname User in Database
        axios.get(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/${parse.id_user}`)
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
                  setTimeout(() => {
                    window.location.reload()
                  }, 2000)
              }).catch((error) => {
                console.log(error)
              })
            }
          })
    }

    // Update Todo to process
    const handleProcess = (id_todo) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "are you sure to move your todo to the process section.?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, move to process!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/process/${id_todo}`)
                .then((response) => {
                    Swal.fire(
                    'Moved!',
                    response.data.msg,
                    'success'
                    )
                    setTimeout(() => {
                    window.location.reload()
                    }, 2000)
                })
            }
            }).catch((error) => {
                console.log(error)
            }) 
    }

    // Get Data for Edit Todo
    const getDataById = (id_todo) => {
        setOpenModal(true)
        axios.get(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/edit/${id_todo}`)
        .then((response) => {
            setIdTodo(response.data.data[0].id_todo)
            setName(response.data.data[0].name)
            const newDate = new Date(response.data.data[0].date)
            const formattedDate = newDate.toISOString().substr(0, 10)
            setDate(formattedDate)
            setDescription(response.data.data[0].description)
        }).catch((error) => {
            console.log(error)
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
                        <button onClick={() => handleProcess(item.id_todo)} className="btn-blue"><i className="fa-solid fa-spinner"></i></button>
                        <button onClick={() => getDataById(item.id_todo)} className="btn-yellow"><i className="fa-solid fa-pen-to-square"></i></button>

                        {/* Edit Modal */}
                        <EditModal open={openModal} onClose={() => setOpenModal(false)} name={name} cName={(event) => setName(event.target.value)} date={date} cDate={(event) => setDate(event.target.value)} description={description} cDescription={(event) => setDescription(event.target.value)} id_todo={idTodo} />

                        <button onClick={() => handleDelete(item.id_todo)} className="btn-red"><i className="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            ))
        }
        </div>
    )
}

const Process = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)

        axios.get(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/process/${parse.id_user}`)
        .then((response) => {
            setList(response.data.data)
        })
    })

    const handleCompleted = (id_todo) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure to move todo in completed section.?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, move to completed!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/completed/${id_todo}`)
                .then((response) => {
                    Swal.fire(
                      'Moved!',
                      response.data.msg,
                      'success'
                    )
                }).catch((error) => {
                    console.log(error)
                })
            }
          })
    }

    const handleRestore = (id_todo) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Your todo will be deleted and returned to the list!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, restore now!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios.put(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/restore/${id_todo}`)
              .then((response) => {
                  Swal.fire(
                    'Restored!',
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
                list.map((item) => (
                    <div key={item.id_todo} className="bg-gray-50 rounded-md shadow-md px-4 py-4 mt-6 md:mt-0 dark:bg-gray-800">
                        <h1 className="text-blue-600 font-medium dark:text-blue-400">{item.name}<span className="text-sm text-gray-400 font-light dark:text-white"> ( <Moment format="DD-MM-YYYY">{item.date}</Moment> )</span></h1>
                        <p className="text-sm mt-1 dark:text-white">{item.description}</p>
                        <div className="flex items-center gap-2 mt-4">
                            <button onClick={() => handleCompleted(item.id_todo)} className="btn-green"><i className="fa-solid fa-check"></i></button>
                            <button onClick={() => handleRestore(item.id_todo)} className="btn-blue"><i className="fa-solid fa-rotate-left"></i></button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const Completed = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)

        axios.get(`https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/completed/${parse.id_user}`)
        .then((response) => {
            setList(response.data.data)
        })
    })

    const handleDelete = (id_todo) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Your todo will be permanently deleted!",
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
                list.map((item) => (
                    <div key={item.id_todo} className="bg-gray-50 rounded-md shadow-md px-4 py-4 mt-6 md:mt-0 dark:bg-gray-800">
                        <h1 className="text-blue-600 font-medium dark:text-blue-400">{item.name}<span className="text-sm text-gray-400 font-light dark:text-white"> ( <Moment format="DD-MM-YYYY">{item.date}</Moment> )</span></h1>
                        <p className="text-sm mt-1 dark:text-white">{item.description}</p>
                        <div className="flex items-center gap-2 mt-4">
                            <button onClick={() => handleDelete(item.id_todo)} className="btn-red"><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const Todos = () => {
    const [component, setComponent] = useState(1)

    const handleTodo = () => {
        setComponent(1)
    }

    const handleProcess = () => {
        setComponent(2)
    }

    const handleCompleted = () => {
        setComponent(3)
    }

    return (
        <div className="bg-white rounded-md shadow-md px-4 py-4 dark:bg-gray-700 lg:px-6">
            <h1 className="text-blue-600 font-medium dark:text-blue-400">Todos</h1>
            <p className="text-sm text-gray-400 dark:text-white">Your all list todo in here</p>
            <div className="flex items-center gap-2 mt-4 lg:w-[40%]">
                <button onClick={handleTodo} className="btn-blue"><i className="fa-solid fa-list"></i> To Do</button>
                <button onClick={handleProcess} className="btn-yellow"><i className="fa-solid fa-spinner"></i> In Process</button>
                <button onClick={handleCompleted} className="btn-green"><i className="fa-solid fa-check"></i> Completed</button>
            </div>

            <div className="md:mt-6 lg:flex lg:items-start lg:justify-between">
                {/* List of ToDo */}   
                <div>   
                    { component === 1 ? <ToDo /> : component === 2 ? <Process /> : <Completed /> }
                </div>

                <div className="flex justify-end mt-6 lg:mt-0">
                    <img src="./img/image3.png" alt="ToDoImage" className="w-52 lg:w-96" />
                </div>
            </div>
        </div>
    )
}

export default Todos