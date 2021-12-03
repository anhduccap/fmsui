const axios = require('axios');

exports.loadLoginPage = async (req, res, next) => {
    res.render('login', {response: null});
}

exports.login = async (req, res, next) => {
    axios({
        method: 'post',
        url: process.env.API_URL + '/auth',
        data: req.body
    })
    .then(response => response.data)
    .then(data => {
        if(data.code === 200){
            res.cookie('auth-token', data.data.token, {maxAge: 1 * 60 * 60 * 1000});
            return res.redirect('/');
        }
        else{
            return res.redirect('/auth');
        }
    })
    .catch(err => {
        if(!err.response){
            console.error('Error: ', err.message);
            return res.redirect(500, '/auth');
        }
        else {
            let response = err.response.data;
            // console.log(response);
            return res.status(response.code).render('login', {response: response});
        }
        
    });
}
