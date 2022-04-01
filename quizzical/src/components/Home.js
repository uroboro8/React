import React from "react";

function Home(props) {
    const [category,setCategory] = React.useState("video-games")
    const [difficulty,setDifficulty] = React.useState("easy")

    function isRadioChecked(value,type){
        if(type === "category"){
            return category === value
        }
        else
            return difficulty === value
    }

    function handleRadioClick(event,type){
        if(type === "category"){
            setCategory(event.target.value)
        }
        else
            setDifficulty(event.target.value)
    }
    return (
        <div className="home--screen">
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
                        checked={isRadioChecked("video-games","category")}
                        onChange={(event) => handleRadioClick(event,"category")}
                    >
                    </input>
                    <label>Video Games</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="anime-manga"
                        checked={isRadioChecked("anime-manga","category")}
                        onChange={(event) => handleRadioClick(event,"category")}
                    >
                    </input>
                    <label>Anime and Manga</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="music"
                        checked={isRadioChecked("music","category")}
                        onChange={(event) => handleRadioClick(event,"category")}
                    >
                    </input>
                    <label>Music</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="category"
                        value="film"
                        checked={isRadioChecked("film","category")}
                        onChange={(event) => handleRadioClick(event,"category")}
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
                        checked={isRadioChecked("easy","difficulty")}
                        onChange={(event) => handleRadioClick(event,"difficulty")}
                    >
                    </input>
                    <label>Easy</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="difficulty"
                        value="medium"
                        checked={isRadioChecked("medium","difficulty")}
                        onChange={(event) => handleRadioClick(event,"difficulty")}
                    >
                    </input>
                    <label>Medium</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="difficulty"
                        value="hard"
                        checked={isRadioChecked("hard","difficulty")}
                        onChange={(event) => handleRadioClick(event,"difficulty")}
                    >
                    </input>
                    <label>Hard</label>
                </div>
                </fieldset>
            </form>
            <button onClick={() => props.getQuestions(category,difficulty)}>Start Quiz</button>
        </div>
    );
}

export default Home;