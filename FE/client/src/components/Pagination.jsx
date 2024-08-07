export default function Page({ page, setPage, totalPage }) {
    const handlePage = (page) => {
        if (page < 1 || page > totalPage) return;
        setPage(page)
    }

    return (
        <div className="btn-group" role="group" aria-label="Default button group">
            {page !== 1 &&
                <button type="button" className="btn btn-outline-primary" onClick={() => handlePage(page - 1)}>
                    Prev
                </button>
            }

            {page !== totalPage &&
                <button type="button" className="btn btn-outline-primary" onClick={() => handlePage(page + 1)}>
                    Next
                </button>
            }
        </div>
    )
}