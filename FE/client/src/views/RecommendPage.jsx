import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import instance from "../utils/axios"

export default function RecommendPage() {
    const [loading, setLoading] = useState(true)
    const [rec, setRec] = useState({})
    const nav = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        nav('/login')
    }

    const addAnimeList = async (e) => {
        e.preventDefault()
        try {
            const result = await instance.post('/animes/' + e.target.value, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token')
                }
            })
            console.log(result)
            nav('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    const fetchRec = async () => {
        try {
            const { data } = await instance.get('/rec', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            })
            setRec(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    console.log(rec)

    useEffect(() => {
        fetchRec()
    }, [])

    if (loading) {
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
            <div className="row justify-content-center">
                {rec?.map((e, i) =>
                    <div key={i} className="card" style={{ width: "18rem" }}>
                        <div className="card-img-top">
                            <img src={e.images.jpg["image_url"]} style={{ height: '380px' }} alt="..." />
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{e.title}</h4>
                            <p className="card-text">
                                Genres: {e.genres.map(e => e.name).join(', ')}
                            </p>
                        </div>
                        <div className="card-body">
                            <button value={e['mal_id']} onClick={addAnimeList} className="btn btn-primary">
                                Add to List
                            </button>
                            <Link to={`/${e['mal_id']}`} className="btn btn-primary mx-2">
                                See Detail
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}