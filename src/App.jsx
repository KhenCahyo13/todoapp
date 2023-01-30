import SignIn from "./pages/SignIn"
import { BrowserRouter, Routes, Route  } from "react-router-dom"
import SignUp from "./pages/SignUp"
import VerificationEmail from "./pages/VerificationEmail"
import Home from "./pages/Home"
import Setting from "./pages/Setting"
import ProtectedRoute from "./ProtectedRoute"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/todoapp/users/:token" element={<VerificationEmail />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/setting" element={<Setting />} />
                    </Route>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/resetpassword/:id_user" element={<ResetPassword />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App