import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

const SignUp = () => {
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [picture, setPicture] = useState('')

    const handleSignUp = async (event) => {
        event.preventDefault()
        try {
            const formData = new FormData()
            formData.append('fullname', fullname)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('confPassword', confPassword)
            formData.append('picture', picture)
            await axios.post('https://todosapp-restapi.khencahyo.repl.co/todoapp/users', formData, {
                headers: {
                  "Content-type": "multipart/form-data",
                },
              })
            .then((response) => {
                setMsg(response.data.msg)
                setLoading(true)
                setFullname('')
                setEmail('')
                setPassword('')
                setConfPassword('')
                setPicture('')
            })
        } catch (error) {
            setMsg(error.response.data.msg)
        }
    }

    return (
        <section className="bg-blue-500 bg-opacity-5 w-full min-h-screen px-4 py-16 md:px-32 lg:px-[30rem]">
            <div className="bg-white rounded-md shadow-md px-4 pt-4 pb-6 lg:px-6">
                <h1 className="text-center text-blue-500 font-semibold text-lg">Sign Up Account</h1>
                <p className="text-center text-sm text-gray-400">Todo App</p>
                {
                    msg &&
                    <div className={ loading ? "success-box" : "error-box" } id="msgBox">
                        <p className={ loading ? "success-text" : "error-text" }>{msg}</p>
                    </div>
                }
                {/* Login Form */}
                <form onSubmit={handleSignUp}>
                    <div className="flex items-center mt-6">
                        <div className="form-icon">
                            <i className="fa-solid fa-user text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setFullname(event.target.value)} value={fullname} type="text" className="form-control" placeholder="Enter your fullname" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-envelope text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" placeholder="Enter your email address" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-lock text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" className="form-control" placeholder="Enter your password" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-lock text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setConfPassword(event.target.value)} value={confPassword} type="password" className="form-control" placeholder="Enter your confirm password" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-image text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setPicture(event.target.files[0])} type="file" accept="image/png, image/jpeg, image/jpg" className="form-file" id="profilePicture" />
                    </div>
                    <div className="mt-5">
                        <button className="btn-blue">Sign Up</button>
                    </div>
                </form>
            </div>
            <div className="mt-6">
                <p className="text-center text-sm">Already have account.? <Link to="/" className="text-blue-500 cursor-pointer font-medium">Sign In</Link></p>
            </div>
        </section>
    )
}

export default SignUp