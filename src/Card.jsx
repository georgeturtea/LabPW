function Card(props) {
    return (
        <div className="project-card">
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </div>
    );
}


export default Card;