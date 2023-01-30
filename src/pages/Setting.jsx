import { Link } from "react-router-dom"

const Setting = () => {
    return (
        <section className="bg-blue-500 bg-opacity-5 w-full min-h-screen px-4 py-4 md:px-16 lg:px-[4rem] dark:bg-gray-800">
            <div className="bg-white rounded-md shadow-md px-4 py-4 lg:px-6 dark:bg-gray-700">
                <h1 className="text-blue-600 font-medium dark:text-blue-400">Setting</h1>
                <p className="text-sm text-gray-400 dark:text-white">Setting your account in here</p>
                <div className="mt-6">
                    <div className="flex items-center gap-4">
                        <img className="rounded-full w-16" src="./chaeyoung.jpg" alt="ProfilePicture" />
                        <div className="block">
                            <h1 className="text-blue-600 font-medium text-lg">Son Cahyo</h1>
                            <Link to="/home"><button className="btn-green px-2 py-1 mt-2"><i className="fa-solid fa-house mr-1"></i> Back To Home</button></Link>
                        </div>
                    </div>
                    <hr className="mt-6 bg-gray-900 bg-opacity-20 h-[1px]" />
                </div>
                <form className="mt-6">
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-user text-blue-500 text-lg"></i>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter your fullname" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-envelope text-blue-500 text-lg"></i>
                        </div>
                        <input type="email" className="form-control" placeholder="Enter your email address" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-lock text-blue-500 text-lg"></i>
                        </div>
                        <input type="password" className="form-control" placeholder="Enter your password" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-lock text-blue-500 text-lg"></i>
                        </div>
                        <input type="password" className="form-control" placeholder="Enter your confirm password" />
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="form-icon">
                            <i className="fa-solid fa-image text-blue-500 text-lg"></i>
                        </div>
                        <input type="file" accept="image/png, image/jpeg, image/jpg" className="form-file" id="profilePicture" />
                    </div>
                    <div className="mt-5">
                        <button className="btn-blue">Update Account</button>
                    </div>
                </form>

                <div className="bg-blue-600 bg-opacity-10 px-4 py-4 rounded-md mt-6">
                    <h1 className="font-semibold text-blue-600 dark:text-blue-400">Note : <span className="font-medium">Picture file only ext jpg, png, jpeg and max size is 5mb</span></h1>
                </div>
                <button className="btn-red px-2 py-1 mt-6"><i className="fa-solid fa-trash mr-1"></i> Delete your account</button>
            </div>
        </section>
    )
}

export default Setting