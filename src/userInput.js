import pkg from 'enquirer';
import PlayerStats from './playerstats.js';
import TeamStats from './teamstats.js';
const { prompt } = pkg;

export async function getTeamStatsManually() {

    let teamStat = new TeamStats();

    let response = await prompt(
        [
            {
                type: 'input',
                name: 'name',
                message: 'What is the team name? (Will not be used for calculation)'
            },
            {
                type: 'input',
                name: 'pts',
                message: 'What are the teams points this season?'
            },
            {
                type: 'input',
                name: 'fga',
                message: 'What are the teams field goal attempts this season?'
            },
            {
                type: 'input',
                name: 'reb',
                message: 'What are the teams rebounds this season?'
            },
            {
                type: 'input',
                name: 'ast',
                message: 'What are the teams assists this season?'
            },
            {
                type: 'input',
                name: 'stl',
                message: 'What are the teams steals this season?'
            },
            {
                type: 'input',
                name: 'blk',
                message: 'What are the teams blocks this season?'
            },
            {
                type: 'input',
                name: 'pf',
                message: 'What are the teams personal faults this season?'
            },
            {
                type: 'input',
                name: 'to',
                message: 'What are the teams turnovers this season?'
            },
            {
                type: 'input',
                name: 'wins',
                message: 'What are the teams wins this season?'
            }
        ]
    );
    teamStat.name = response.name
    teamStat.pts = response.pts;
    teamStat.fga = response.fga;
    teamStat.reb = response.reb;
    teamStat.ast = response.ast;
    teamStat.stl = response.stl;
    teamStat.blk = response.blk;
    teamStat.pf = response.pf;
    teamStat.to = response.to;
    teamStat.wins = response.wins;

    return teamStat;
}


export async function getPlayerStatsManually() {

    let playerStat = new PlayerStats();

    let response = await prompt(
        [
            {
                type: 'input',
                name: 'pts',
                message: 'What are the players points this season?'
            },
            {
                type: 'input',
                name: 'fga',
                message: 'What are the players field goal attempts this season?'
            },
            {
                type: 'input',
                name: 'reb',
                message: 'What are the players rebounds this season?'
            },
            {
                type: 'input',
                name: 'ast',
                message: 'What are the players assists this season?'
            },
            {
                type: 'input',
                name: 'stl',
                message: 'What are the players steals this season?'
            },
            {
                type: 'input',
                name: 'blk',
                message: 'What are the players blocks this season?'
            },
            {
                type: 'input',
                name: 'pf',
                message: 'What are the players personal faults this season?'
            },
            {
                type: 'input',
                name: 'to',
                message: 'What are the players turnovers this season?'
            }
        ]
    );
    playerStat.pts = response.pts;
    playerStat.fga = response.fga;
    playerStat.reb = response.reb;
    playerStat.ast = response.ast;
    playerStat.stl = response.stl;
    playerStat.blk = response.blk;
    playerStat.pf = response.pf;
    playerStat.to = response.to;

    return playerStat;
}
