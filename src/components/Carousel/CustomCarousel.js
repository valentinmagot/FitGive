import React from 'react';
import Carousel from 'react-material-ui-carousel'
import ChallengeCard from 'components/CustomCards/ChallengeCard/ChallengeCard'

export default function CustomCarousel(props) {
    var items = [
        {
            challengeName: "Challenge 1",
            description: "This is a test challenge",
            endDate: "April 12, 20201 at 9:26:24 AM UTC-4",
            exercise: "Pullups",
            friend:"19xv",
            isComplete: false,
            length: 21,
            moneyAmount: 10,
            owner: "OZEB",
            repetitionGoal: 40,
            startDate: "March 24, 2021 at 9:26:24 AM UTC-4",
            winner: ""
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
                daysLeft={''}
                challengeName={props.item.challengeName}
                challengeDescription={props.item.description}
                repetitionGoal={props.item.repetitionGoal}
            />
        </div>

    )
}
