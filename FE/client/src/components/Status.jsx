import { useState } from "react";
import instance from "../utils/axios";

export default function AnimeStatus({ status, id, fetchProfile }) {
    const [animestatus, setAnimeStatus] = useState(status);

    const handleStatus = async (e) => {
        e.preventDefault()
        try {
            console.log(e.target.value)
            await instance.patch('/profile/' + e.target.value, {
                status: animestatus
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("access_token")
                }
            })
            fetchProfile()
        } catch (error) {
            console.log(error)
        } 
    }
    return (
        <p>Status:
            <select
                name="status"
                id="status"
                value={animestatus}
                onChange={(e) => setAnimeStatus(e.target.value)}
            >
                <option value="Plan to Watch" name="" id="">Plan to Watch</option>
                <option value="Watching" name="" id="">Watching</option>
                <option value="Completed" name="" id="">Completed</option>
            </select>
            <button value={id} onClick={handleStatus} className="btn btn-primary my-2">
                Change Status
            </button>
        </p>
    )
}