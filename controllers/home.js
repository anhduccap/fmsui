const axios = require('axios');

exports.homepage = async (req, res, next) => {
    let getUser = new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: process.env.API_URL + '/personal_information/' + req.member_id,
            headers: {
                'auth-token': req.cookies['auth-token'],
            }
        })
        .then( response => resolve(response.data.data))
        .catch(err => reject(err));
    });

    await Promise.all([getUser])
    .then(response => {
        console.log(response);
        return res.render('home', {title: 'Home', member: response[0]});
    })
    .catch(err => {
        console.log(err);
    });
}
