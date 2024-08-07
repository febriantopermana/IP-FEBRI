import { useEffect, useState } from "react"
import instance from "../utils/axios"
import NavBar from '../components/Nav.jsx';
import Page from "../components/Pagination.jsx";

export default function HomePage() {
    const [animes, setAnimes] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(null)

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
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Genres: {e.genres.map(eg => eg.name).join(', ')}</li>
                            <li className="list-group-item">Aired: {e.aired.string}</li>
                            <li className="list-group-item">Rating: {e.rating}</li>
                        </ul>
                        <div className="card-body">
                            <a href="#" className="card-link">
                                Card link
                            </a>
                            <a href="#" className="card-link">
                                Another link
                            </a>
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