import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../../firebase";
import { useAuth } from "context/authContext.js"

import CommentInput from "./CommentInput";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(() => ({
    post: {
        backgroundColor: "white",
        marginBottom: "16px",
        borderRadius: "10px",
    },
    image: {
        width: "100%",
        objectFit: "contain",
        borderTop: "0.5px solid #eff2f2",
        borderBottom: "0.5px solid #eff2f2",
    },
    header: {
        display: "flex",
        padding: "1em 0 0 1.5em",
        justifyContent: "space-between",
    },
    headerInfo: {
        marginLeft: "1em",
    },
    bottom: {
        padding: "6px 12px",
    },
    textBox: {
        padding: "0 0 0.5em 1em;",
        borderBottom: "1px solid #d9d9d9",
        fontWeight: "400",
        fontSize: "1.5em",
    },
}));

function Post({ id, authorID, userName, caption, comments }) {
    const classes = useStyles();
    const { currentUserInfo } = useAuth();
    const currentUserName = currentUserInfo ? currentUserInfo.firstname : '';
    const currUser = currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1);
    

    const deletePost = () => {
        //delete post
        db.collection("EXPLORE")
            .doc(id)
            .delete()
            .then(function () {
                console.log("Document successfully deleted!");
            })
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
    };

    const copyCodeToClipboard = () => {
        let dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = authorID;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    return (
        <div className={classes.post}>
            {currentUserName?.toLowerCase() === userName.toLowerCase() ? (
                <Button
                    onClick={deletePost}
                    size="small"
                    style={{
                        float: "right",
                        padding: "1.5em",
                        fontSize: "0.75rem",
                        background: "none",
                    }}
                >
                    Delete
                </Button>
            ) : (
                <></>
            )
            }
            <div className={classes.header}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Tooltip title={authorID} arrow>
                        <button
                            onClick={copyCodeToClipboard}
                            style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
                            <Avatar
                                style={{ backgroundColor: "#5e86c7" }}
                                alt={userName.toLowerCase()}
                            >
                                {userName.charAt(0)}
                            </Avatar>
                        </button>
                    </Tooltip>
                    <div className={classes.headerInfo}>
                        <p style={{ fontSize: "1.2em" }}>{userName}</p>
                    </div>
                </div>
            </div>

            <div className={classes.textBox}>
                <p>{caption}</p>
            </div>

            {comments ? (
                comments.map((comment, index) => (
                    <div key={index} style={{ padding: "0.5em 0 0 1.5em" }}>
                        <strong>{comment.username}</strong> {comment.comment}
                    </div>
                ))
            ) : (
                <></>
            )}
            <CommentInput comments={comments} id={id} user={currUser} />
        </div>
    );
}

export default Post;