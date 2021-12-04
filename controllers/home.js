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

    let getStanding = new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: 'https://' + process.env.EXTERNAL_API + '/standings',
            params: {
                league: '39',
                season: '2021'
            },
            headers: {
                'x-rapidapi-host': process.env.EXTERNAL_API,
                'x-rapidapi-key': process.env.API_SECRET_KEY
            }
        })
        .then( response => resolve(response.data))
        .catch(err => reject(err));
    });

    let getFixture = new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: 'https://' + process.env.EXTERNAL_API + '/fixtures',
            params: {
                league: '39',
                season: '2021',
                status: 'NS',
                team: '33'
            },
            headers: {
                'x-rapidapi-host': process.env.EXTERNAL_API,
                'x-rapidapi-key': process.env.API_SECRET_KEY
            }
        })
        .then( response => resolve(response.data))
        .catch(err => reject(err));
    });

    await Promise.all([getUser, getStanding, getFixture])
    .then(response => {
        let standings = response[1].response[0].league;

        let nextMatch = {
            date: response[2].response[0].fixture.date,
            timestamp: response[2].response[0].fixture.timestamp,
            stadium: response[2].response[0].fixture.venue.name,
            city: response[2].response[0].fixture.venue.city,
            round: response[2].response[0].league.round,
            season: response[2].response[0].league.season,
            team_home: response[2].response[0].teams.home,
            team_away: response[2].response[0].teams.away,
        };
        console.log(nextMatch);
        // console.log(response[1].response[0].league.standings[0]);
        // console.log(response[2].response[0]);
        return res.render('home', {title: 'Home', member: response[0], standings: standings, nextMatch: nextMatch});
    })
    .catch(err => {
        console.log(err);
    });
}
