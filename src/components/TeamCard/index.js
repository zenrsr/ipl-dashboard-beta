import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, image} = teamDetails
  return (
    <li className="list-item">
      <Link to={`/team-matches/${id}`} className="link-item">
        <img src={image} alt={name} className="team-logo" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
