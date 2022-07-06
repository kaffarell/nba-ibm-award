import axios from 'axios';
import PlayerStats from './playerstats.js';
import TeamStats from './teamstats.js';
import ora from 'ora';


async function getPlayerStats(player_id) {
    const spinner_stats = ora('Getting all stats from specific player').start();
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
    spinner_stats.succeed();
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

    const spinner_sum = ora('Sum stats from every game').start();
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
    spinner_sum.succeed();

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


async function getAllGamesByTeam(team_id) {
    let wins = 0;

    const options = {
        method: 'GET',
        url: 'https://free-nba.p.rapidapi.com/games',
        params: { page: '0', per_page: '100', seasons: [2021], team_ids: [team_id] },
        headers: {
            'X-RapidAPI-Key': '5ef504cea6msh615586526b620d4p1b13d7jsnad0a11e7f91f',
            'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
    };

    let response = await axios.request(options);
    console.log(response.data);
    let data = response.data.data;
    data.map(game => {
        // count the wins
        if (game.home_team.id == team_id && (game.home_team_score > game.visitor_team_score)) {
            // home team wins
            wins++;
        }
        if (game.visitor_team.id == team_id && (game.visitor_team_score > game.home_team_score)) {
            // visitor team wins
            wins++;
        }
    });
    return { data, wins };
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
    console.log(response.data);
    return response.data.data;
}


async function getTeamStats(team_id) {
    const spinner_games = ora('Getting all games from specific team').start();
    let { gamesFromTeam, wins } = await getAllGamesByTeam(team_id);
    spinner_games.succeed();

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

    const spinner_stats = ora(`Getting stats from every game (checking ${response.data.meta.total_count} stats and making ${response.data.meta.total_pages} requests)`).start();
    let promises = [];
    for (let i = 0; i < pages; i++) {
        promises.push(getSinglePageTeamStat(i, gamesFromTeam));
    }
    let allPlayerStats = [];

    let values = await Promise.all(promises);
    // Get only stats from the wanted team (and not from the opposing team)
    values.map((a) => {
        a.map((e) => {
            if (e.team.id == team_id) {
                allPlayerStats.push(e);
            }
        });
    });
    spinner_stats.succeed();
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

    const spinner_sum = ora('Sum stats from every game').start();
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
    spinner_sum.succeed();

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

async function calculate() {
    let teamStats = await getTeamStats(14)
    let playerStats = await getPlayerStats(237)

    const spinner_calculating = ora('Calculating').start();
    let divident = playerStats.pts - playerStats.fga + playerStats.reb + playerStats.ast + playerStats.stl + playerStats.blk - playerStats.pf - playerStats.to + (teamStats.wins * 10) * 250;
    let divisor = teamStats.pts - teamStats.fga + teamStats.reb + teamStats.ast + teamStats.stl + teamStats.blk - teamStats.pf - teamStats.to;
    let result = divident / divisor;
    spinner_calculating.succeed();

    console.log('Result = ' + result);
}

calculate();