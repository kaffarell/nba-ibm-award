const axios = require("axios");
const { PlayerStats } = require("./playerstats");
const { TeamStats } = require("./teamstats");

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

    let playerstats = new PlayerStats();
    playerstats.pts = player_pts;
    playerstats.fga = player_fga;
    playerstats.reb = player_reb;
    playerstats.ast = player_ast;
    playerstats.stl = player_stl;
    playerstats.blk = player_blk;
    playerstats.pf = player_pf;
    playerstats.to = player_to;
    return playerstats;
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
    let wins = 0;
    values.map((a) => {
        a.map((e) => {
            // Get all the games from a team
            if(e.home_team.id == team_id || e.visitor_team.id == team_id) {
                game_ids.push(e.id);

                // count wins
                if(e.home_team.id == team_id && (e.home_team_score > e.visitor_team_score)){
                    // home team wins
                    wins++;
                }
                if(e.visitor_team.id == team_id && (e.visitor_team_score > e.home_team_score)){
                    // visitor team wins
                    wins++;
                }
            }
        });
    });
    return {game_ids, wins};
}

async function getSinglePageTeamStat(page, gamesFromTeam) {
    const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/stats',
        params: { page: page, per_page: '100', seasons: [2021], game_ids: gamesFromTeam },
        headers: {
            'X-RapidAPI-Key': '5ef504cea6msh615586526b620d4p1b13d7jsnad0a11e7f91f',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };

    let response = await axios.request(options);
    return response.data.data;
}

async function getTeamStats(team_id) {

    let {gamesFromTeam, wins} = await getAllGamesFromTeam(team_id);

    // Make a single request to get the amount of pages
    const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/stats',
        params: { page: '0', per_page: '100', seasons: [2021], game_ids: gamesFromTeam },
        headers: {
            'X-RapidAPI-Key': '5ef504cea6msh615586526b620d4p1b13d7jsnad0a11e7f91f',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };

    let response = await axios.request(options);
    // Get amount of pages
    let pages = response.data.meta.total_pages;
    let promises = [];
    for(let i = 0; i < pages; i++) {
        promises.push(getSinglePageTeamStat(i, gamesFromTeam));
    }
    let allPlayerStats = [];

    let values = await Promise.all(promises);
    // Get only stats from the wanted team (and not from the opposing team)
    values.map((a) => {
        a.map((e) => {
            if(e.team.id == team_id){
                allPlayerStats.push(e);
            }
        });
    });
    //console.log(allPlayerStats)

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

    allPlayerStats.map((a) => {
        team_pts += a.pts;
        team_fga += a.fga;
        team_reb += a.reb;
        team_ast += a.ast;
        team_stl += a.stl;
        team_blk += a.blk;
        team_pf += a.pf;
        team_to += a.turnover;
    });

    let teamstats = new TeamStats();
    teamstats.pts = team_pts;
    teamstats.fga = team_fga;
    teamstats.reb = team_reb;
    teamstats.ast = team_ast;
    teamstats.stl = team_stl;
    teamstats.blk = team_blk;
    teamstats.pf = team_pf;
    teamstats.to = team_to;
    teamstats.wins = wins;
    return teamstats;
}
getTeamStats(14)
//getPlayerStats(237)