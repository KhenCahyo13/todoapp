import EditModal from "../components/EditModal";
import Form from "../components/Form";
import Header from "../components/Header";
import Todos from "../components/Todos";
import Welcome from "../components/Welcome";

const Home = () => {

    return (
        <section className="bg-blue-500 bg-opacity-5 w-full min-h-screen px-4 py-4 md:px-16 lg:px-[4rem] dark:bg-gray-800">
            <EditModal />
            <Header />
            <div className="mt-4">
                <Welcome />
            </div>
            <div className="mt-4">
                <Form />
            </div>
            <div className="mt-4">
                <Todos />
            </div>
        </section>
    )
}

export default Home;