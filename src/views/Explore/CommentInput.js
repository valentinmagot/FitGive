import React, { useState } from "react";
import { db } from "../../firebase";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function CommentInput({ comments, id, user }) {
    const [comment, setComment] = useState("");
    const [commentMap, setcommentMap] = useState(comments ? comments : []);

    const addComment = () => {
        commentMap.push({
            comment: comment,
            username: user,
        });

        db.collection("EXPLORE")
            .doc(id)
            .update({
                comments: commentMap,
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

        setComment("");
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px 1.5em",
        }}>
            <TextField style={{ width: "100%" }}
                rows="1"
                value={comment}
                size="small"
                onChange={(e) => setComment(e.target.value)}
                inputProps={{ style: { fontSize: "0.8em" } }}
                placeholder="Add a comment...">
            </TextField>

            <Button
                size="small"
                onClick={addComment}
                disabled={comment.replace(/\s/g, '').length ? false : true}
                style={{
                    color: comment.replace(/\s/g, '').length ? "#2862bf" : "#7f9bca",
                    marginLeft: "1em",
                }}
            >
                Post
            </Button>
        </div >
    );
}

export default CommentInput;
