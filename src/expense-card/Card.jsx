import './card.css'
import PropTypes from 'prop-types'

// Take type (expense/income), amount (in GBP) and a description for an info card
function Card(props) {
    return(
        <div className="card-container">
            <h1 className='card-title'>{props.title}</h1>
            <p className='card-text'><b>Type: </b>{props.type}</p>
            <p className='card-text'><b>Amount: £</b>{props.amount}</p>
            <p className='card-text'>
                <b>Description:</b>
                <br />
                {props.description}</p>
        </div>
    )
}

// Default values in case props not given
Card.defaultProps = {
    title: "N/A",
    type: "",
    amount: 0,
    description: ""
}

// For validation declare the expected types of the props
Card.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    amount: PropTypes.number,
    description: PropTypes.string
}

export default Card;