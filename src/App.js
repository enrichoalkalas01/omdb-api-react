import React from 'react'
import Axios from 'axios'

class App extends React.Component {
    state = {
        DataResult: null,
        SearchData: '',
        PagePosition: 1,
        Config: {
            url: 'http://www.omdbapi.com/?apikey=58ed57ce'
        }
    }
    
    async componentDidMount() {
        let SearchData = 'avatar'
        this.setState({
            ...this.state,
            Config: {
                url: this.state.Config.url + '&s='+ SearchData +'&page=' + this.state.PagePosition
            }
        })

        setTimeout(() => {
            Axios(this.state.Config).then((response) => {
                console.log(response)
                if ( response.data.Response !== 'False' ) { this.setState({ DataResult: response.data }) } else { this.setState({ DataResult: null }) }                
            }).catch((err) => { console.log(err) })
        }, 5)
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log(this.state.DataResult)
        if ( prevState.SearchData !== this.state.SearchData ) {
            console.log(this.state.SearchData)
            this.setState({ Config: { url: 'http://www.omdbapi.com/?apikey=58ed57ce' + '&s='+ this.state.SearchData +'&page=' + this.state.PagePosition } })
            setTimeout(() => {
                Axios(this.state.Config).then((response) => {
                    if ( response.data.Response !== 'False' ) { this.setState({ DataResult: response.data }) } else { this.setState({ DataResult: null }) }
                }).catch((err) => { console.log(err) })
            }, 50)
        }
    }

    OnEnter = (e) => {
        if ( e.key === 'Enter' ) {
            let DataSearch = document.getElementById('search-input').value
            this.setState({ SearchData: DataSearch })
        }
    }

    render() {
        return (
            <section id="omdb-api">
                <div className="main-content">
                    <div className="box-content">
                        <div className="search-content">
                            <input onKeyDown={ this.OnEnter } id="search-input" name="search-input" placeholder="Searh your movie here.." />
                        </div>
                        <div className="total-result" style={{ padding: '0 10px', color: '#fff' }}>
                            <span>Total Data : </span>
                            { this.state.DataResult ? this.state.DataResult.totalResults : 0 }
                        </div>
                        <div className="content">
                            <div className="wrapper-content">
                                {
                                    this.state.DataResult ? 
                                        this.state.DataResult.Search.map((Data, index) => {
                                            console.log(Data)
                                            return(
                                                <div className="list-content" 
                                                    style={{ backgroundImage: "url("+ Data.Poster +")" }}
                                                    key={ index }
                                                    iddata={ Data.imdbID }
                                                >
                                                    <div className="wrapper-list">
                                                        <div className="wrapper-desc-list">
                                                            <div className="wrapper">
                                                                <h4>{ Data.Title }</h4>
                                                                <span className="type-movie">{ Data.Type }</span>
                                                                <span className="year-movie">{ Data.Year }</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default App