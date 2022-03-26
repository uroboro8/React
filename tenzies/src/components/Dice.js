function Dice(props) {

    const flexStyle = {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center"
    }

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "auto " + "auto"
    }


    const diceValue = []

    if (props.value == 5)
        diceValue.push(
            <div key={props.id}>
                <div className="dice--row">
                    <div className="dice--value"></div>
                    <div className="dice--value"></div>
                </div>
                <div className="dice--row">
                    <div className="dice--value"></div>
                </div>
                <div className="dice--row">
                    <div className="dice--value"></div>
                    <div className="dice--value"></div>
                </div>
            </div>
        )

    else
        for (let i = 0; i < props.value; i++)
            diceValue.push(<div key={i} className="dice--value"></div>)

    return (
        <div
            className={props.isHeld ? "dice held" : "dice"}
            onClick={() => props.hold(props.id)}
            style={props.value == 5 ? {} : props.value > 3 ? gridStyle : flexStyle}>
            {diceValue}
        </div>
    );
}


export default Dice;