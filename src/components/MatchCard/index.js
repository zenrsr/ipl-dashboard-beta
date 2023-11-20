import './index.css'

const MatchCard = props => {
  const {cardDetails} = props
  const {matchStatus, competingTeam, competingTeamLogo, result} = cardDetails
  const status = matchStatus.toLowerCase() === 'won' ? 'lost' : 'won'

  return (
    <li className="match-card-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="img"
      />
      <h2>{competingTeam}</h2>
      <p>{result}</p>
      <p className={status}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
