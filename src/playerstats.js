export default class PlayerStats {
    // player points
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

    print() {
        console.log('Player pts: ' + this.pts);
        console.log('Player fga: ' + this.fga);
        console.log('Player reb: ' + this.reb);
        console.log('Player ast: ' + this.ast);
        console.log('Player stl: ' + this.stl);
        console.log('Player blk: ' + this.blk);
        console.log('Player pf: ' + this.pf);
        console.log('Player to: ' + this.to);
    }
}