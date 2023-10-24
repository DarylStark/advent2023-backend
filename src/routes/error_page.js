import Response from '../response.js'

const error_page = (err, req, res, next) => {
    const response = new Response();
    response.error.error = err.message;
    res.send(response);
}

export default error_page;