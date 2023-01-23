import SignIn from "./pages/SignIn"
import { BrowserRouter, Routes, Route  } from "react-router-dom"
import SignUp from "./pages/SignUp"
import VerificationEmail from "./pages/VerificationEmail"
import Home from "./pages/Home"

const App = () => {
    return (
        <>
            {/* All Route */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/todoapp/users/:token" element={<VerificationEmail />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App