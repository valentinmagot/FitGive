import React, { useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "context/authContext.js";
import { makeStyles } from "@material-ui/core/styles";

import firebase from "firebase";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    post: {
        marginTop: "3em",
        alignSelf: "center",
        width: "40%",
        backgroundColor: "white",
        marginBottom: "16px",
        borderRadius: "10px",
        border: "2px solid #cdd8e9",
    },
    button: {
        float: "right",
        padding: "1.5em",
        background: "none",
    },
    textBox: {
        padding: "0 0 0.5em 1em;",
        fontWeight: "500",
        fontSize: "1.5em",
    },
}));


function CreatePost({ user }) {
    const [caption, setCaption] = useState("");
    const classes = useStyles();

    const { currentUserInfo } = useAuth();
    const currentUserName = currentUserInfo ? currentUserInfo.firstname : '';
    const authorName = currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1);
    const authorID = currentUserInfo ? currentUserInfo.code : '';

    const handleUpload = () => {
        db.collection("EXPLORE").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            authorName: authorName,
            authorID: authorID,
        });
        setCaption("");
    };

    return (
        <div className={classes.post}>
            <div className={classes.textBox}>
                <p>Create a Post</p>
            </div>
            <div style={{ margin: "0 2em" }}>
                <TextField
                    multiline
                    rows={2}
                    value={caption}
                    placeholder="Enter a caption..."
                    style={{ width: "100%" }}
                    onChange={(e) => setCaption(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                ></TextField>
            </div>
            <Button
                className={classes.button}
                onClick={handleUpload}
                disabled={caption.replace(/\s/g, '').length ? false : true}
                style={{
                    color: caption.replace(/\s/g, '').length ? "#2862bf" : "#7f9bca",
                    marginLeft: "1em",
                    background: "none",
                }}
            >
                Post
            </Button>
        </div>
    );
}

export default CreatePost;