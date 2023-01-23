import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const VerificationEmail = () => {
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const { token } = useParams()
    const navigate = useNavigate()

    const handleVerif = async (request, response) => {
        try {
            await axios.put(`https://todosapp-restapi.khencahyo.repl.co/todoapp/users/${token}`)
            .then((response) => {
                setMsg(response.data.msg + ', redirect to sign in page')
                setLoading(true)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="bg-blue-500 bg-opacity-5 w-full min-h-screen px-4 py-16 md:px-32 lg:px-[30rem]">
            <div className="bg-white rounded-md shadow-md px-4 pt-4 pb-6 lg:px-6">
                {
                    msg &&
                    <div className="success-box mb-4" id="msgBox">
                        <p className="success-text">{msg}</p>
                    </div>
                }
                <h1 className="text-center font-semibold text-lg">Click the button below to verify your email</h1>
                <button onClick={handleVerif} className="btn-blue mt-4">{ loading ? "Loading..." : "Verify Email" }</button>
            </div>
        </section>
    )
}

export default VerificationEmail