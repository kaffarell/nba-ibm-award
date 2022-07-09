from nba_api.stats.endpoints import teamdashboardbyteamperformance
from nba_api.stats.static import teams
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats
from pandas import DataFrame
import json



# Team stuff

team_name = 'Brooklyn Nets'
print('Fetching team stats of ' + team_name + '...')

# get_teams returns a list of 30 dictionaries, each an NBA team.
nba_teams = teams.get_teams()
print('Number of teams fetched: {}'.format(len(nba_teams)))
wanted_team = [team for team in nba_teams
         if team['full_name'] == team_name][0]

print('Found team: ', wanted_team['full_name'])

data = teamdashboardbyteamperformance.TeamDashboardByTeamPerformance(season="2021-22", team_id=wanted_team['id'])
player_stats = data.get_data_frames()[0].iloc[0]
team_id = wanted_team['id']
team_pts = int(player_stats["PTS"])
team_fga = int(player_stats["FGA"])
team_reb = int(player_stats["REB"])
team_ast = int(player_stats["AST"])
team_stl = int(player_stats["STL"])
team_blk = int(player_stats["BLK"])
team_pf = int(player_stats["PF"])
team_to = int(player_stats["TOV"])
team_wins = int(player_stats["W"])

team_data_obj = {
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

json_string = json.dumps(team_data_obj)

print('Storing team stats...')
file = open("../data/" + team_name.replace(" ", "_") + ".json", "w")
a = file.write(json_string)
file.close()


# Player stuff

player_name = 'Kevin Durant'
print('Fetching player stats of ' + player_name + '...')

# get_players returns a list of dictionaries, each representing a player.
nba_players = players.get_players()
print('Number of players fetched: {}'.format(len(nba_players)))


wanted_player = [player for player in nba_players
                   if player['full_name'] == player_name][0]

career = playercareerstats.PlayerCareerStats(player_id=wanted_player['id'])

player_stats = career.get_data_frames()[0].iloc[0]
player_id = wanted_team['id']
player_pts = int(player_stats["PTS"])
player_fga = int(player_stats["FGA"])
player_reb = int(player_stats["REB"])
player_ast = int(player_stats["AST"])
player_stl = int(player_stats["STL"])
player_blk = int(player_stats["BLK"])
player_pf = int(player_stats["PF"])
player_to = int(player_stats["TOV"])

player_name_obj = {
    "name": player_name,
    "id": player_id,
    "pts": player_pts,
    "fga": player_fga,
    "reb": player_reb,
    "ast": player_ast,
    "stl": player_stl,
    "blk": player_blk,
    "pf": player_pf,
    "to": player_to,
}

json_string = json.dumps(player_name_obj)

print('Storing player stats...')
file = open("../data/" + player_name.replace(" ", "_") + ".json", "w")
a = file.write(json_string)
file.close()