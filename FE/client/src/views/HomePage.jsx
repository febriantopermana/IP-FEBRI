import { useEffect, useState } from "react"
import instance from "../utils/axios"
import NavBar from '../components/Nav.jsx';
import Page from "../components/Pagination.jsx";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
    const [animes, setAnimes] = useState([])

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)

    const nav = useNavigate()

    const fetchAnimes = async () => {
        try {
            const { data } = await instance.get(`/animes?sfw&page=${page}&q=${search}`)
            const { pagination } = data
            const getAnimes = data.data
            setAnimes(getAnimes)
            setTotalPage(pagination["last_visible_page"])
        } catch (error) {
            console.log(error)
        }
    }

    const addAnimeList = async (e) => {
        e.preventDefault()
        try {
            console.log(animes)
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

    useEffect(() => {
        fetchAnimes()
    }, [page])

    return (
        <>
            <NavBar 
                search={search}
                setSearch={setSearch}
                fetchAnimes={fetchAnimes} />
            
            <div className="d-flex justify-content-center my-3"> 
                <Page
                    page={page}
                    setPage={setPage}
                    totalPage={totalPage}
                />
            </div>
            <div className="row justify-content-center">
                {animes?.map((e, i) =>
                    <div key={i} className="card" style={{ width: "18rem" }}>
                        <div className="card-img-top">
                            <img src={e.images.jpg["image_url"]} style={{height: '380px'}} alt="..." />
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">{e.title}</h4>
                            <p className="card-text">
                                Genres: {e.genres.map(eg => eg.name).join(', ')}
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
            <div className="d-flex justify-content-center my-3"> 
                <Page
                    page={page}
                    setPage={setPage}
                    totalPage={totalPage}
                />
            </div>
        </>
    )
}