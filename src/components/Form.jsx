import axios from "axios"
import { useEffect, useState } from "react"

const Form = () => {
    const [fullname, setFullname] = useState('')
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)
        setFullname(parse.fullname)
    }, [])

    const handleTodo = async (event) => {
        event.preventDefault()
        try {
            await axios.post('https://todosapp-restapi.khencahyo.repl.co/todoapp/todo/', {
                fullname,
                name,
                date,
                description
            }).then((response) => {
                setMsg(response.data.msg)
                setName('')
                setDate('')
                setDescription('')
                setTimeout(() => {
                    setMsg('')
                    window.location.reload()
                }, 3000)
            }) 
        } catch (error) {
            console.log(error)
        }
    }

    const handleReset = (event) => {
        event.preventDefault()
        setName('')
        setDate('')
        setDescription('')
    }

    return (
        <div className="bg-white rounded-md shadow-md px-4 py-4 dark:bg-gray-700 lg:px-6">
            <h1 className="text-blue-600 font-medium dark:text-blue-400">Todo Form</h1>
            <p className="text-sm text-gray-400 dark:text-white">Create your todo in here</p>
            {
                    msg &&
                    <div className="success-box" id="msgBox">
                        <p className="success-text">{msg}</p>
                    </div>
            }
            <div className="block md:flex md:justify-between md:items-center md:gap-4 lg:gap-16">
                <form onSubmit={handleTodo}  className="w-full lg:w-[80%]">
                    <div className="items-center mt-6 hidden">
                        <div className="form-icon">
                            <i className="fa-solid fa-user text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setFullname(event.target.value)} type="text" className="form-control" value={fullname} />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-pencil text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setName(event.target.value)} value={name} type="text" className="form-control" placeholder="Enter your todo name" required />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-calendar text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setDate(event.target.value)} value={date} type="date" className="form-date" required />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="textarea-icon">
                            <i className="fa-solid fa-receipt text-blue-500 text-lg"></i>
                        </div>
                        <textarea onChange={(event) => setDescription(event.target.value)} value={description} className="form-control" cols="30" rows="4" placeholder="Add description"></textarea>
                    </div>
                    <div className="flex items-center mt-4 gap-4 lg:w-[40%]">
                        <button className="btn-blue">Create Todo</button>
                        <button onClick={handleReset} className="btn-yellow">Reset Form</button>
                    </div>
                </form>
                <div className="flex justify-end mt-6 lg:mt-0">
                    <img src="./img/image2.png" alt="FormImage" className="w-48 lg:w-[26rem]" />
                </div>
            </div>
        </div>
    )
}

export default Form