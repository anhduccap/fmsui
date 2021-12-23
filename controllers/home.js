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

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        let time = new Date(response[2].response[0].fixture.date);
        let date = {
            year: time.getFullYear(),
            month: monthNames[time.getUTCMonth()],
            day: time.getUTCDate(),
            hour: time.getUTCHours(),
            minute: time.getUTCMinutes()
        }

        let nextMatch = {
            date: date,
            timestamp: response[2].response[0].fixture.timestamp,
            stadium: response[2].response[0].fixture.venue.name,
            city: response[2].response[0].fixture.venue.city,
            round: response[2].response[0].league.round,
            season: response[2].response[0].league.season,
            team_home: response[2].response[0].teams.home,
            team_away: response[2].response[0].teams.away,
        };
        // console.log(response[1].response[0].league.standings[0]);
        // console.log(response[2].response[0]);
        // console.log(standings)
        return res.render('home', {member: response[0], standings: standings, nextMatch: nextMatch});
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getPlayerStat = async (req, res) => {
    let getPlayer = new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: process.env.API_URL + '/player/' + req.member_id + '/info',
            headers: {
                'auth-token': req.cookies['auth-token'],
            }
        })
        .then( response => resolve(response.data))
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
    let getStat = new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: process.env.API_URL + '/player/' + req.member_id + '/statistic',
            headers: {
                'auth-token': req.cookies['auth-token'],
            }
        })
        .then( response => resolve(response.data))
        .catch(err => reject(err));
    });

    await Promise.all([getPlayer, getStanding, getStat])
    .then(response => {
        console.log(response[1].response[0].league)
        let standings = response[1].response[0].league.standings[0];
        let round = standings.find(clb => clb.team.id === 33);

        let data = {
            player: response[0].data,
            stat: response[2].data.response[0],
            round: round.all.played,
        };

        // console.log(data.stat.statistics[0]);

        return res.render('player_stat', {data: data});
    })
    .catch(err => {
        console.log(err);
    });
}

exports.lineupSuggestion = async (req, res) => {
    axios({
        method: 'GET',
        url: process.env.API_URL + '/coach/suggeted_lineup',
        headers: {
            'auth-token': req.cookies['auth-token'],
        }
    })
    .then( response => {
        let lineupSuggestion = response.data.data;
        console.log(lineupSuggestion)
        return res.render('lineup_suggestion', {lineup: lineupSuggestion});
    })
    .catch(err => console.log(err));
}
