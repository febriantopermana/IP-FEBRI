import { useEffect, useState } from "react"
import instance from "../utils/axios"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function AnimeDetail() {
    const [anime, setAnime] = useState({})
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    const fetchAnime = async () => {
        try {
            setLoading(true)
            const { data } = await instance.get(`/animes/${id}`)
            const result = data.data
            setAnime(result)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const nav = useNavigate()
    const handleLogout = () => {
        localStorage.clear()
        nav('/login')
    }

    console.log(anime)

    useEffect(() => {
        fetchAnime()
    }, [])

    if(loading){
        return "loading"
    }
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
            <div className="col">
                <img src={anime.images.jpg["large_image_url"]} className="rounded float-start p-4" alt="" />
                <div className="row">
                    <h3 className="mt-4">{anime.titles[0].title}</h3>
                    <p>Synopsis: {anime.synopsis}</p>
                    <Link to={anime.url}>
                        <button className="btn btn-primary">See more detail</button>
                    </Link>
                    
                </div>
            </div>
        </>
    )
}