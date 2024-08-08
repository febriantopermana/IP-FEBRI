import { useEffect, useState } from "react"
import instance from "../utils/axios"
import { Link, useNavigate } from "react-router-dom"
import AnimeStatus from "../components/Status"

export default function MyProfile() {
    const [profile, setProfile] = useState({})
    const [myAnimes, setMyAnimes] = useState([])

    const fetchProfile = async () => {
        try {
            const { data } = await instance.get('profile', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            })
            console.log(data)

            setMyAnimes(data.UserAnimeLists)
            setProfile(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemove = async (e) => {
        e.preventDefault()
        try {
            await instance.delete('/profile/' + e.target.value, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            })
            fetchProfile()
        } catch (error) {
            console.log(error)
        }
    }


    const nav = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        nav('/login')
    }

    console.log(myAnimes)

    useEffect(() => {
        fetchProfile()
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        IP-FEBRI
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/recommend">
                                    Recommendation
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">
                                    Profile
                                </Link>
                            </li>
                        </ul>
                        {!localStorage.access_token &&
                            <Link to="/login">
                                <button className="btn" >
                                    Login
                                </button>
                            </Link>
                        }
                        {localStorage.access_token &&
                            <button className="btn" onClick={handleLogout}>
                                Logout
                            </button>
                        }
                    </div>
                </div>
            </nav>
            <div className="container">
                <h2>User Name: {profile.userName}</h2>
                <h2>Email: {profile.email}</h2><br />
                <h2>My List: </h2>
                <div className="row justify-content-center">
                    {myAnimes?.map((e) =>
                        <div key={e.id} className="card" style={{ width: "18rem" }}>
                            <div className="card-img-top">
                                <img src={e.imageUrl} style={{ height: '380px' }} alt="..." />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">{e.title}</h4>
                                <AnimeStatus status={e.status} id={e.id} fetchProfile={fetchProfile} />
                            </div>
                            <div className="card-body">
                                <button value={e.id} onClick={handleRemove} className="btn btn-primary">
                                    Remove
                                </button>
                                <Link to={`/${e.AnimeId}`} className="btn btn-primary mx-2">
                                    See Detail
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>

    )
}