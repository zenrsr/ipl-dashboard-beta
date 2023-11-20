import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    teamData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/ipl/${id}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      this.setState({
        teamData: {
          teamBanner: data.team_banner_url,
          latestMatchDetails: data.latest_match_details,
          recentMatchDetails: data.recent_matches,
        },
        isLoading: false,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  getRecent = () => {
    const {teamData} = this.state
    const {latestMatchDetails, recentMatchDetails} = teamData

    const latest = latestMatchDetails
      ? {
          umpires: latestMatchDetails.umpires,
          result: latestMatchDetails.result,
          mom: latestMatchDetails.man_of_the_match,
          id: latestMatchDetails.id,
          date: latestMatchDetails.date,
          venue: latestMatchDetails.venue,
          competingTeam: latestMatchDetails.competing_team,
          competingTeamLogo: latestMatchDetails.competing_team_logo,
          firstInnings: latestMatchDetails.first_innings,
          secondInnings: latestMatchDetails.second_innings,
          matchStatus: latestMatchDetails.match_status,
        }
      : null

    const recent = recentMatchDetails.map(eachMatch => ({
      id: eachMatch.id,
      matchStatus: eachMatch.match_status,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      result: eachMatch.result,
    }))

    return (
      <ul className="match-card-list-container">
        <LatestMatch matchDetails={latest} />
        {recent.map(eachCard => (
          <MatchCard key={eachCard.id} cardDetails={eachCard} />
        ))}
      </ul>
    )
  }

  render() {
    const {teamData, isLoading} = this.state

    return (
      <div className="team-match-container">
        <img
          src={teamData.teamBanner}
          className="team-banner"
          alt="team banner"
        />

        <div className="match-container">
          <p className="info">Latest Matches</p>
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            this.getRecent()
          )}
        </div>
      </div>
    )
  }
}

export default TeamMatches
