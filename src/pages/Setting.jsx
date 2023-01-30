import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const Setting = () => {
    const [name, setName] = useState('')
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [picture, setPicture] = useState('')
    const [urlPicture, setUrlPicture] = useState('')
    const navigate = useNavigate('')
    const pictReff = useRef(null)

    useEffect(() => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)

        setName(parse.fullname)
        setFullname(parse.fullname)
        setEmail(parse.email)
        setUrlPicture(parse.url_picture)
    }, [])

    const handleUpdate = async (event) => {
        event.preventDefault()
        try {
            const storing = localStorage.getItem('user')
            const parse = JSON.parse(storing)
            await axios.put(`https://todosapp-restapi.khencahyo.repl.co/todoapp/users/update/${parse.id_user}`, {
                fullname, email, password, confPassword
            })
            .then((response) => {
                setPassword('')
                setConfPassword('')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.msg,
                    showConfirmButton: false,
                    timer: 2000
                })
                setTimeout(() => {
                    navigate('/home')
                }, 2000)
            })

            await axios.get(`https://todosapp-restapi.khencahyo.repl.co/todoapp/users/${parse.id_user}`)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data[0]))
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
              })
        }
    }

    const handleClick = () => {
        pictReff.current.click()
    }

    const handleUpdatePicture = async (event) => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)

        // Get Picture From Folder
        const newPicture = event.target.files[0];
        setPicture(URL.createObjectURL(newPicture));

        const formData = new FormData()
        formData.append('picture', newPicture)

        try {
            await axios.put(`https://todosapp-restapi.khencahyo.repl.co/todoapp/users/picture/${parse.id_user}`, formData).then((response) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.msg,
                    showConfirmButton: false,
                    timer: 2000
                })
                setTimeout(() => {
                    window.location.reload()
                }, 2000)
            })

            await axios.get(`https://todosapp-restapi.khencahyo.repl.co/todoapp/users/${parse.id_user}`)
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data[0]))
            })

        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAccount = () => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)

        Swal.fire({
            title: 'Are you sure?',
            text: "This action will delete your account permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`https://todosapp-restapi.khencahyo.repl.co/todoapp/users/delete/${parse.id_user}`)
              .then((response) => {
                  localStorage.removeItem('user')
                  localStorage.removeItem('id_user')
                  localStorage.removeItem('theme')
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: response.data.msg,
                    showConfirmButton: false,
                    timer: 2000
                   })
                  setTimeout(() => {
                    navigate('/signin')
                  }, 2000)
              })
            }
          })
    }

    return (
        <section className="bg-blue-500 bg-opacity-5 w-full min-h-screen px-4 py-4 md:px-16 lg:px-[4rem] dark:bg-gray-800">
            <div className="bg-white rounded-md shadow-md px-4 py-4 lg:px-6 dark:bg-gray-700">
                <h1 className="text-blue-600 font-medium dark:text-blue-400">Setting</h1>
                <p className="text-sm text-gray-400 dark:text-white">Setting your account in here</p>
                <div className="mt-8">
                    <div className="flex md:justify-between">
                        <div className="flex gap-4">
                            <img className="rounded-full w-16" src={urlPicture} alt="ProfilePicture" />
                            <div className="block">
                                <h1 className="text-blue-600 font-medium text-lg">{name}</h1>
                                <button onClick={handleClick} className="text-sm text-gray-400 dark:text-white">Update your picture</button>
                                <input type="file" accept="image/png, image/jpeg, image/jpg" ref={pictReff} onChange={handleUpdatePicture} className="hidden" />
                            </div>
                        </div>
                        <Link to="/"><button className="btn-green px-2 py-1 mt-4 hidden md:flex"><i className="fa-solid fa-house mr-1"></i> Back To Home</button></Link>
                    </div>
                    <hr className="mt-6 bg-gray-900 bg-opacity-20 h-[1px]" />
                </div>
                <form onSubmit={handleUpdate} className="mt-6 grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-user text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setFullname(event.target.value)} value={fullname} type="text" className="form-control" placeholder="Enter your fullname" required />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-envelope text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" placeholder="Enter your email address" required />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-lock text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" placeholder="Enter your password" required />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-lock text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setConfPassword(event.target.value)} value={confPassword} type="password" className="form-control" placeholder="Enter your confirm password" required />
                    </div>
                    <div className="mt-5">
                        <button className="btn-blue lg:w-[40%]">Update Account</button>
                    </div>
                </form>

                <div className="bg-blue-600 bg-opacity-10 px-4 py-4 rounded-md mt-6">
                    <h1 className="font-semibold text-blue-600 dark:text-blue-400">Note : <span className="font-medium">Picture file only ext jpg, png, jpeg and max size is 5mb</span></h1>
                </div>
                <button onClick={handleDeleteAccount} className="btn-red px-2 py-1 mt-6 lg:w-[20%]"><i className="fa-solid fa-trash mr-1"></i> Delete your account</button>
                <Link to="/"><button className="btn-green px-2 py-1 mt-4 md:hidden"><i className="fa-solid fa-house mr-1"></i> Back To Home</button></Link>
            </div>
        </section>
    )
}

export default Setting