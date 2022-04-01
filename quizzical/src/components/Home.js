import React from "react";

function Home(props) {
    const [category, setCategory] = React.useState("video-games")
    const [difficulty, setDifficulty] = React.useState("easy")
    const [rankingVisibility,setRankingVisibility] = React.useState(false)

    function isRadioChecked(value, type) {
        if (type === "category") {
            return category === value
        }
        else
            return difficulty === value
    }

    function handleRadioClick(event, type) {
        if (type === "category") {
            setCategory(event.target.value)
        }
        else
            setDifficulty(event.target.value)
    }

    function toggleRanking(){
        setRankingVisibility(prevVisibility => !prevVisibility);
    }
    function parseCategory(category){
        switch(category){
            case "video-games":
                return "Video Games"
            case "anime-manga":
                return "Anime & Manga"
            case "music":
                return "Music"
            case "film":
                return "Film"
            default:
                return ""
        }
    }
    const rankingArray = props.ranking.map((score,index) => {
        return <div key={index}>
            {parseCategory(score.category)} - {score.difficulty.charAt(0).toUpperCase() + score.difficulty.slice(1) }: {score.points}
        </div>
    })

    
    return (
        <div className="home--screen">
            <div className="home--container position-relative">
                <h1>Quizzical</h1>
                <h3>The best quiz in the world!</h3>
                <form>
                    <fieldset>
                        <legend><b>Options </b></legend>
                        <p><b>Selezione categoria:</b></p>
                        <div>
                            <input
                                type="radio"
                                name="category"
                                value="video-games"
                                checked={isRadioChecked("video-games", "category")}
                                onChange={(event) => handleRadioClick(event, "category")}
                            >
                            </input>
                            <label>Video Games</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="category"
                                value="anime-manga"
                                checked={isRadioChecked("anime-manga", "category")}
                                onChange={(event) => handleRadioClick(event, "category")}
                            >
                            </input>
                            <label>Anime and Manga</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="category"
                                value="music"
                                checked={isRadioChecked("music", "category")}
                                onChange={(event) => handleRadioClick(event, "category")}
                            >
                            </input>
                            <label>Music</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="category"
                                value="film"
                                checked={isRadioChecked("film", "category")}
                                onChange={(event) => handleRadioClick(event, "category")}
                            >
                            </input>
                            <label>Film</label>
                        </div>
                        <p><b>Selezione difficoltà:</b></p>
                        <div>
                            <input
                                type="radio"
                                name="difficulty"
                                value="easy"
                                checked={isRadioChecked("easy", "difficulty")}
                                onChange={(event) => handleRadioClick(event, "difficulty")}
                            >
                            </input>
                            <label>Easy</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="difficulty"
                                value="medium"
                                checked={isRadioChecked("medium", "difficulty")}
                                onChange={(event) => handleRadioClick(event, "difficulty")}
                            >
                            </input>
                            <label>Medium</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="difficulty"
                                value="hard"
                                checked={isRadioChecked("hard", "difficulty")}
                                onChange={(event) => handleRadioClick(event, "difficulty")}
                            >
                            </input>
                            <label>Hard</label>
                        </div>
                    </fieldset>
                </form>
                <button onClick={() => props.getQuestions(category, difficulty)}>Start Quiz</button>
                <span 
                onClick={toggleRanking}
                className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger ranking--button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-reception-4" viewBox="0 0 16 16">
                        <path d="M0 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-5zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-8zm4-3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11z" />
                    </svg>
                </span>

            </div>
            <div className="ranking" style={rankingVisibility ? { display: "block" } : { display: "none" }}>
                <h3>Ranking</h3>
                {rankingArray}
            </div>
        </div>
    );
}

export default Home;