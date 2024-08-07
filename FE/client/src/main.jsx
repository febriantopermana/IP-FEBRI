import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HomePage from './views/HomePage.jsx';
import LoginPage from './views/LoginPage.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <>
                <HomePage/>
            </>
    },
    {
        path: "/login",
        element: 
            <>
                <LoginPage/>
            </>
    }
]);

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)
ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
