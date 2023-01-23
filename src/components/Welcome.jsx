import { useEffect, useState } from "react"

const Welcome = () => {
    const [fullname, setFullname] = useState('')
    
    useEffect(() => {
        const storing = localStorage.getItem('user')
        const parse = JSON.parse(storing)
        setFullname(parse.fullname)
    }, [])

    return (
        <div className="welcome-wrapper">
            <div className="block md:mt-6 lg:mt-8">
                <h1 className="text-blue-600 font-medium dark:text-blue-400 lg:text-lg">Welcome to Todo App {fullname}</h1>
                <p className="text-gray-400 text-sm dark:text-white lg:text-base">let's make an arrangement of plans that you will do right now</p>
            </div>
            <div className="flex justify-end mt-4">
                <img src="./img/image1.png" alt="WelcomeImage" className="w-40 lg:w-44" />
            </div>
        </div>  
    )
}

export default Welcome