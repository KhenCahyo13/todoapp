import axios from "axios"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser'
import Swal from "sweetalert2"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [idUser, setIdUser] = useState('')
    const [url, setUrl]= useState('')
    const form = useRef();
    const navigate = useNavigate()

    const handleForgot = async (event) => {
        event.preventDefault()
        try {
            await axios.post('https://todosapp-restapi.khencahyo.repl.co/todoapp/users/forgotpassword', {
                email
            }).then((response) => {
                localStorage.setItem('id_user', JSON.stringify(response.data.data[0].id_user))
                setFullname(response.data.data[0].fullname)
                setUrl('http://localhost:3000/resetpassword/' + response.data.data[0].id_user)
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Are you sure you have forgotten your password?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, I forgot!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        emailjs.sendForm('service_b3itr8l', 'template_hy4bewa', form.current, 'ceCcpNgew5l5Nq8ut')
                        .then((result) => {
                            console.log(result.text)
                        }, (error) => {
                            console.log(error.text);
                        });
                        Swal.fire(
                            'Sent!',
                            'A verification link has been sent to your email.',
                            'success'
                        )
                        setTimeout(() => {
                            navigate('/signin')
                        }, 2000)
                    }
                  })
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
                <h1 className="text-center text-blue-500 font-semibold text-lg">Forgot Password</h1>
                <p className="text-center text-sm text-gray-400 mt-1">We need a registered account email to verify your password reset</p>
                <form ref={form} onSubmit={handleForgot}>
                    <div className="items-center mt-6 hidden">
                        <div className="form-icon">
                            <i className="fa-solid fa-user text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setFullname(event.target.value)} value={fullname} type="text" className="form-control" placeholder="Enter your name" name="fullname" />
                    </div>
                    <div className="flex items-center mt-6">
                        <div className="form-icon">
                            <i className="fa-solid fa-envelope text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" className="form-control" placeholder="Enter your email address" name="email" required />
                    </div>
                    <div className="items-center mt-6 hidden">
                        <div className="form-icon">
                            <i className="fa-solid fa-link text-blue-500 text-lg"></i>
                        </div>
                        <input onChange={(event) => setUrl(event.target.value)} value={url} type="text" className="form-control" placeholder="Your url" name="url" />
                    </div>
                    <div className="mt-5">
                        <button className="btn-blue">Get Verification Link</button>
                    </div>
                </form>
            </div>
            <Link to="/signin"><p className="text-blue-600 text-center mt-6 text-sm">Back to Sign in Page</p></Link>
        </section>
    )
}

export default ForgotPassword