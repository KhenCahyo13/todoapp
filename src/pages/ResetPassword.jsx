import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const navigate = useNavigate()

    const handleResetPassword = async (event) => {
        event.preventDefault()
        const storing = localStorage.getItem('id_user')
        const parse = JSON.parse(storing)
        try {
            await axios.put(`https://todosapp-restapi.khencahyo.repl.co/todoapp/users/resetpassword/${parse}`, {
                password, confPassword
            }).then((response) => {
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
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg
            })
        }
    }

    return (
        <section className="bg-blue-500 bg-opacity-5 w-full min-h-screen px-4 py-44 md:px-32 lg:px-[30rem]">
            <div className="bg-white rounded-md shadow-md px-4 pt-4 pb-6 lg:px-6">
                <h1 className="text-center text-blue-500 font-semibold text-lg">Reset Password</h1>
                <p className="text-center text-sm text-gray-400 mt-1">Todo App</p>
                <form onSubmit={handleResetPassword}>
                    <div className="flex items-center mt-6">
                        <div className="form-icon">
                            <i className="fa-solid fa-lock text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" placeholder="Enter your new password" required />
                    </div>
                    <div className="flex items-center mt-6">
                        <div className="form-icon">
                            <i className="fa-solid fa-lock text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setConfPassword(event.target.value)} value={confPassword} type="password" className="form-control" placeholder="Confirm your new password" required />
                    </div>
                    <div className="mt-5">
                        <button className="btn-blue">Change Password</button>
                    </div>
                </form>
            </div>
            <Link to="/signin"><p className="text-blue-600 text-center mt-6 text-sm">Back to Sign in Page</p></Link>
        </section>
    )
}

export default ResetPassword