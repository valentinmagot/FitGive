import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import ChallengeCard from 'components/CustomCards/ChallengeCard/ChallengeCard'
import { useAuth } from '../../context/authContext'
import { db } from '../../firebase'

export default function CustomCarousel(props) {
    const [userChallenges, setChallenges] = useState([]);

    const { currentUser } = useAuth();
    const userID = currentUser.uid.substring(0, 4);
    //console.log(userID);

    useEffect(() => {
        db.collection("CHALLENGES").where("owner", "==", userID)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setChallenges(userChallenges => [...userChallenges, doc.data()]);
                });
                
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        }, []);


    return (
        userChallenges ?
            (<Carousel animation='slide' autoPlay={false} navButtonsAlwaysVisible={true}>
                {userChallenges.map(item =>
                    <div key={item.challengeName} style={{ padding: "0 100px" }}>
                        <ChallengeCard
                            buttonText={"Today's challenge"}
                            exercise={item.exercise}
                            challengeName={item.challengeName}
                            repetitionGoal={item.repetitionGoal}
                            challengeDescription={item.description}
                        />
                    </div>)}
            </Carousel>)
            :
            (<div>No Ongoing Challenges.</div>)
    )
}
