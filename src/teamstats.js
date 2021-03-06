export default class TeamStats {
    // team name
    name = '';
    // team id
    id = 0;
    // points
    pts = 0;
    // field goal attempts
    fga = 0;
    // rebounds
    reb = 0;
    // assists
    ast = 0;
    // steals
    stl = 0;
    // blocks
    blk = 0;
    // personal faults
    pf = 0;
    // turnovers
    to = 0;
    // wins
    wins = 0;

    print() {
        console.log('Team name: ' + this.name);
        console.log('Team id: ' + this.id);
        console.log('Team pts: ' + this.pts);
        console.log('Team fga: ' + this.fga);
        console.log('Team reb: ' + this.reb);
        console.log('Team ast: ' + this.ast);
        console.log('Team stl: ' + this.stl);
        console.log('Team blk: ' + this.blk);
        console.log('Team pf: ' + this.pf);
        console.log('Team to: ' + this.to);
        console.log('Team wins: ' + this.wins);
    }
}
