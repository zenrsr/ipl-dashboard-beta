import './index.css'
import Loader from 'react-loader-spinner'

const LatestMatch = props => {
  const {matchDetails} = props

  if (!matchDetails) {
    return <Loader type="Rings" color="#ffffff" height={50} width={50} />
  }

  const {
    umpires,
    result,
    mom,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = matchDetails

  return (
    <div className="latest-match-container">
      <div className="left">
        <h1>{competingTeam}</h1>
        <h1>{date}</h1>
        <p>{venue}</p>
        <p>{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="logo"
      />
      <div className="right">
        <p>First Innings</p>
        <p>{firstInnings}</p>
        <p>Second Innings</p>
        <p>{secondInnings}</p>
        <p>Man of the Match</p>
        <p>{mom}</p>
        <p>Umpires</p>
        <p>{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
