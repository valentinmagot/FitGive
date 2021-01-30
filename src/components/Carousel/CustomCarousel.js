import React from 'react';
import Carousel from 'react-material-ui-carousel'
import ChallengeCard from 'components/CustomCards/ChallengeCard/ChallengeCard'

export default function CustomCarousel(props) {
    var items = [
        {
            name: "Family Challenge",
            description: "Who can do the most push-ups within 2 weeks?",
            button: "Complete today's challenge",
            daysLeft: "12 days left"
        },
        {
            name: "Get Fit!!",
            description: "50 sit-ups a day",
            button: "Complete today's challenge",
            daysLeft: "30 days left"
        },
    ]

    return (
        <Carousel animation='slide' autoPlay={false} navButtonsAlwaysVisible={true}>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <div style={{ padding: "0 100px" }}>
            <ChallengeCard
                buttonText={props.item.button}
                daysLeft={props.item.daysLeft}
                challengeName={props.item.name}
                challengeDescription={props.item.description}
            />
        </div>

    )
}
