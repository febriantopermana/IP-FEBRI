import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import HomePage from './views/HomePage.jsx';
import LoginPage from './views/LoginPage.jsx';
import MyProfile from './views/ProfilePage.jsx';
import AnimeDetail from './views/AnimeDetailPage.jsx';
import RecommendPage from './views/RecommendPage.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element:
            <>
                <HomePage/>
            </>
    },
    {
        path: "/:id",
        element:
            <>
                <AnimeDetail/>
            </>
    },
    {
        path: "/login",
        element: 
            <>
                <LoginPage/>
            </>
    },
    {
        path: "/recommend",
        element:
            <>
                <RecommendPage/>
            </>,
        loader: () => {
            if(!localStorage.getItem('access_token')){
                return redirect('/login')
            }
            return null
        }
    },
    {
        path: "/profile",
        element:
            <>
                <MyProfile/>
            </>,
        loader: () => {
            if(!localStorage.getItem('access_token')){
                return redirect('/login')
            }
            return null
        }
    }
]);

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)
ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
