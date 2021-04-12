import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";

import CreatePost from "./CreatePost";

const useStyles = makeStyles(() => ({
    posts: {
        marginTop: "3em",
        alignSelf: "center",
        width: "40%",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    feed: {
        display: "flex",
        justifyContent: "center",
    }
}));

function Explore({ user }) {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("EXPLORE").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            console.log(snapshot.docs)
            // snapshot.docs.forEach((doc) => {
            //     posts.push(({ id: doc.id, post: doc.data() }));
            // })
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
        });
    }, []);

    return (
        <div className={classes.body}>
            <CreatePost></CreatePost>
            <div className={classes.feed}>
                <div className={classes.posts}>
                    {posts.map(({ id, post }) => (
                        <Post
                            key={id}
                            id={id}
                            authorID={post.authorID}
                            userName={post.authorName}
                            caption={post.caption}
                            comments={post.comments}
                            user={user}
                        />
                    ))}
                </div>
            </div >
        </div>
    );
}

export default Explore;