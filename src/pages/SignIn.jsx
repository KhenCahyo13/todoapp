import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignIn = () => {
    const [loading, setLoading] = useState('')
    const [msg, setMsg] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignIn = async (event) => {
        event.preventDefault()
        try {
            await axios.post('https://todosapp-restapi.khencahyo.repl.co/todoapp/users/login', {
                email, password
            }).then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data[0]))
                // console.log(response.data.data[0].id_user)
                setLoading(true)
                setMsg(response.data.msg + ', please wait...')
                setTimeout(() => {
                    navigate('/home')
                }, 2000)
            })
        } catch (error) {
            setMsg(error.response.data.msg)
        }
    }
    return (
        <section className="bg-blue-500 bg-opacity-5 w-full min-h-screen px-4 py-32 md:px-32 lg:px-[30rem]">
            <div className="bg-white rounded-md shadow-md px-4 pt-4 pb-6 lg:px-6">
                <h1 className="text-center text-blue-500 font-semibold text-lg">Welcome to Todo App</h1>
                <p className="text-center text-sm text-gray-400">Sign in to your account to continue</p>
                {
                    msg &&
                    <div className={ loading ? "success-box" : "error-box" } id="msgBox">
                        <p className={ loading ? "success-text" : "error-text" }>{msg}</p>
                    </div>
                }
                {/* Login Form */}
                <form onSubmit={handleSignIn}>
                    <div className="flex items-center mt-6">
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
                    <div className="mt-5">
                        <button className="btn-blue">{ loading ? "Loading..." : "Sign In" }</button>
                    </div>
                </form>
            </div>
            <div className="mt-6">
                <p className="text-center text-sm">Don't have account.? <Link to="/signup" className="text-blue-500 cursor-pointer font-medium">Sign Up</Link></p>
                <p className="text-center text-sm mt-2">Forgot your password.? <span className="text-blue-500 cursor-pointer font-medium">Reset Password</span></p>
            </div>
        </section>
    )
}

export default SignIn