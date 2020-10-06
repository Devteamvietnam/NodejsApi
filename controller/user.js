const index = (req, res, next) => {
    return res.status(200).json({
        message: 'You request to user handle'
    })
}
module.exports = {
    getAll: index
}