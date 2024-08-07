module.exports = (error, req, res, next) => {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json(error.errors[0].message)
    }

    if (error.name == 'UserNameRequired') {
        return res.status(400).json({ message: 'UserName is required' })
    }

    if (error.name == 'EmailRequired') {
        return res.status(400).json({ message: 'Email is required' })
    }

    if (error.name == 'PasswordRequired') {
        return res.status(400).json({ message: 'Paswword is required' })
    }

    if (error.name == 'StatusEmpty') {
        return res.status(400).json({ message: 'Status must be selected' })
    }

    if (error.name == 'NotesEmpty') {
        return res.status(400).json({ message: 'Notes be selected' })
    }

    if (error.name == `InvalidEmailPassword`) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    if (error.name == 'Unauthorized' || error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Unauthenticated' })
    }

    if (error.name == `InvalidGoogleToken`) {
        return res.status(401).json({ message: 'Login Failed' })
    }

    if (error.name === 'Forbidden') {
        return res.status(403).json({ message: 'You are not authorized' })
    }

    if (error.name === 'ListNotFound') {
        return res.status(404).json({ message: `List not found` })
    }

    if (error.name == 'AxiosError') {
        return res.status(404).json({ message: 'Database Error' })
    }

    if (error.name == 'AnimeAddedAlready') {
        return res.status(409).json({ message: 'Anime is already in your list' })
    }

    console.log(error)
    res.send(error)


    // res.status(500).json({
    //     message: `Internal server error`
    // })
}