from nba_api.stats.endpoints import teamdashboardbyteamperformance
from pandas import DataFrame
import json

# Anthony Davis
data = teamdashboardbyteamperformance.TeamDashboardByTeamPerformance(season="2021-22", team_id="1610612738")
team_stats = data.get_data_frames()[0].iloc[0]
team_name = 'Boston Celtics'
team_id = 0
team_pts = int(team_stats["PTS"])
team_fga = int(team_stats["FGA"])
team_reb = int(team_stats["REB"])
team_ast = int(team_stats["AST"])
team_stl = int(team_stats["STL"])
team_blk = int(team_stats["BLK"])
team_pf = int(team_stats["PF"])
team_to = int(team_stats["TOV"])
team_wins = int(team_stats["W"])

data_obj = {
    "name": team_name,
    "id": team_id,
    "pts": team_pts,
    "fga": team_fga,
    "reb": team_reb,
    "ast": team_ast,
    "stl": team_stl,
    "blk": team_blk,
    "pf": team_pf,
    "to": team_to,
    "wins": team_wins
}

json = json.dumps(data_obj)

file = open("../data/" + team_name.replace(" ", "_") + ".json", "w")
a = file.write(json)
file.close()