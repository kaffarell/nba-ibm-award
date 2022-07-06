const axios = require("axios");

async function getPlayerStats(player_id) {
    const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/stats',
        params: { page: '0', per_page: '100', seasons: [2021], player_ids: [player_id] },
        headers: {
            'X-RapidAPI-Key': '5ef504cea6msh615586526b620d4p1b13d7jsnad0a11e7f91f',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };

    let response = await axios.request(options);
    //console.log(response.data);
    let data = response.data.data;

    /*
    data = data.sort((a, b) => {
        let a_date = new Date(a.game.date); 
        let b_date = new Date(b.game.date);
        return a_date > b_date ? 1 : a_date < b_date ? -1 : 0;
    }); 
    */
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
}

async function getAllPlayers(page) {
    const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/players',
        params: { page: page, per_page: '100'},
        headers: {
            'X-RapidAPI-Key': '5ef504cea6msh615586526b620d4p1b13d7jsnad0a11e7f91f',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };

    let response = await axios.request(options);
    let data = response.data.data;
    return data;
}

async function getAllGames(page) {
    const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/games',
        params: { page: page, per_page: '100', seasons: [2021]},
        headers: {
            'X-RapidAPI-Key': '5ef504cea6msh615586526b620d4p1b13d7jsnad0a11e7f91f',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };

    let response = await axios.request(options);
    let data = response.data.data;
    return data;
}

async function getAllGamesFromTeam(team_id) {
    let game_ids = [];
    let promises = [];
    for(let i = 0; i < 15; i++) {
        promises.push(getAllGames(i));
    }
    let values = await Promise.all(promises)
    values.map((a) => {
        a.map((e) => {
            if(e.home_team.id == team_id || e.visitor_team.id == team_id) {
                game_ids.push(e.id);
            }
        });
    });
    return game_ids;
}

async function getTeamStats(team_id) {


    const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/stats',
        params: { page: '0', per_page: '100', seasons: [2021], player_ids: [] },
        headers: {
            'X-RapidAPI-Key': '5ef504cea6msh615586526b620d4p1b13d7jsnad0a11e7f91f',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };

    let response = await axios.request(options);
    //console.log(response.data);
    let data = response.data.data;

    /*
    data = data.sort((a, b) => {
        let a_date = new Date(a.game.date); 
        let b_date = new Date(b.game.date);
        return a_date > b_date ? 1 : a_date < b_date ? -1 : 0;
    }); 
    */
    // points
    let team_pts = 0;
    // field goal attempts
    let team_fga = 0;
    // rebounds
    let team_reb = 0;
    // assists
    let team_ast = 0;
    // steals
    let team_stl = 0;
    // blocks
    let team_blk = 0;
    // personal faults
    let team_pf = 0;
    // turnovers
    let team_to = 0;

    data.map((a) => {
        team_pts += a.pts;
        team_fga += a.fga;
        team_reb += a.reb;
        team_ast += a.ast;
        team_stl += a.stl;
        team_blk += a.blk;
        team_pf += a.pf;
        team_to += a.turnover;
    });

    console.log('Team pts: ' + team_pts);
    console.log('Team fga: ' + team_fga);
    console.log('Team reb: ' + team_reb);
    console.log('Team ast: ' + team_ast);
    console.log('Team stl: ' + team_stl);
    console.log('Team blk: ' + team_blk);
    console.log('Team pf: ' + team_pf);
    console.log('Team to: ' + team_to);
}
getTeamStats(14)
//getPlayerStats(237)