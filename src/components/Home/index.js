import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

const api = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {
    iplData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getIplData()
  }

  getIplData = async () => {
    try {
      const response = await fetch(api)
      const data = await response.json()
      const newData = data.teams
      //   console.log(newData)

      this.setState({
        iplData: newData.map(x => ({
          id: x.id,
          name: x.name,
          image: x.team_image_url,
        })),
        isLoading: false,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  renderTeamCards = () => {
    const {iplData} = this.state
    // console.log({iplData})

    return (
      <ul className="team-card-list" type="none">
        {iplData.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="home-container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderTeamCards()
        )}
      </div>
    )
  }
}

export default Home
