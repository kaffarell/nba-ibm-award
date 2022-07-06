const axios = require("axios");

const options = {
    method: 'GET',
    url: 'https://free-nba.p.rapidapi.com/stats',
    params: { page: '0', per_page: '100', seasons: [2021], player_ids: [237] },
    headers: {
        'X-RapidAPI-Key': '5ef504cea6msh615586526b620d4p1b13d7jsnad0a11e7f91f',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
    }
};

axios.request(options).then(function (response) {
    //console.log(response.data);
    let data = response.data.data;

    data = data.sort((a, b) => {
        let a_date = new Date(a.game.date); 
        let b_date = new Date(b.game.date);
        return a_date > b_date ? 1 : a_date < b_date ? -1 : 0;
    }); 
    console.log(data);
    // points
    let player_pts = 0;
    // field goal attempts
    let player_fga = 0;
    // rebounds
    let player_reb = 0;
    // assists
    let player_ast = 0;
    // steals
    let player_stl = 0;
    // blocks
    let player_blk = 0;
    // personal faults
    let player_pf = 0;
    // turnovers
    let player_to = 0;

    data.map((a) => { 
        player_pts += a.pts;
        player_fga += a.fga;
        player_reb += a.reb;
        player_ast += a.ast;
        player_stl += a.stl;
        player_blk += a.blk;
        player_pf += a.pf;
        player_to += a.turnover;
    });

    console.log('Player pts: ' + player_pts);
    console.log('Player fga: ' + player_fga);
    console.log('Player reb: ' + player_reb);
    console.log('Player ast: ' + player_ast);
    console.log('Player stl: ' + player_stl);
    console.log('Player blk: ' + player_blk);
    console.log('Player pf: ' + player_pf);
    console.log('Player to: ' + player_to);
}).catch(function (error) {
    console.error(error);
});