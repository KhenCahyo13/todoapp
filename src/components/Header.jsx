import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/Header.css"

const Header = () => {
    const navigate = useNavigate()
    const [picture, setPicture] = useState('')
    const [fullname, setFullname] = useState('')

    const handleTheme = () => {
        document.querySelector('html').classList.toggle('dark')
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/')    
    }
    
    useEffect(() => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)
        setPicture(parse.url_picture)
        setFullname(parse.fullname)
    }, [])

    return (
        <div className="bg-white rounded-md shadow-md px-4 py-2 lg:px-6 dark:bg-gray-700">
            <div className="flex items-center justify-between">
                <div className="block lg:flex lg:items-center lg:gap-4">
                    <img src={picture} alt="ProfilImage" className="w-10 rounded-full md:w-12" />
                    <div className="hidden lg:block">
                        <h1 className="text-blue-600 font-medium">{fullname}</h1>
                        <p className="text-sm text-gray-400">Profile Setting</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 lg:hidden">
                    <button onClick={handleTheme} className="btn-theme">
                        <i className="fa-solid fa-moon text-white"></i>
                    </button>
                    <Link to="/setting"><button className="btn-setting">
                        <i className="fa-solid fa-gear text-white"></i>
                    </button></Link>
                    <button onClick={handleLogout} className="btn-logout">
                        <i className="fa-solid fa-right-from-bracket text-white"></i>
                    </button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:gap-5">
                    <div onClick={handleTheme} className="btn-theme">
                        <i className="fa-solid fa-moon text-white text-lg"></i>
                    </div>
                    <div className="flex items-center gap-1">
                        <i className="fa-solid fa-right-from-bracket text-blue-600 text-base dark:text-white"></i>
                        <p className="text-blue-600 font-medium dark:text-white">Logout</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header