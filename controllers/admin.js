const axios = require('axios');
const e = require('express');
const jwt = require('jsonwebtoken');

exports.getHomePage = async (req, res) => {
    let payLoad = await jwt.decode(req.cookies['auth-token'], process.env.JWT_SECRET_KEY);
    // console.log(payLoad);

    if(payLoad.data.role === 3) {
        return res.redirect('/');
    }
    else{
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
            // console.log(response[0]);
            return res.render('admin_home', {member: response[0], standings: standings, nextMatch: nextMatch});
        })
        .catch(err => {
            console.log(err);
        });
    }
}
