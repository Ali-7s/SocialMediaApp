import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.tsx";
import ReactQuery from "./components/TanstackProvider/TanstackProvider.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import UserContextProvider from "./contexts/UserContext.tsx";

function App() {

    return (
        <UserContextProvider>
        <ReactQuery>
            <ToastContainer/>
        <RouterProvider router={router}/>
        </ReactQuery>
        </UserContextProvider>
    )
}

export default App
