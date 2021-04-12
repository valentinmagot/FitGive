import React, { useState } from "react";
import { db } from "../../firebase";
import { useAuth } from "context/authContext.js";
import firebase from "firebase";

function CreatePost({ user }) {
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0);

    const { currentUserInfo } = useAuth();
    console.log(currentUserInfo);
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
        <div className="app__createPost">
            <div className="imageUpload">
                <div className="createAPost__Top">
                    <p>Create a Post</p>
                </div>
                {/* <progress value={progress} max="100" /> */}

                <div className="createAPost__center">
                    <textarea
                        className="createAPost__textarea"
                        name="create a post"
                        rows="2"
                        value={caption}
                        placeholder="Enter a caption..."
                        onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <button
                className="button"
                onClick={handleUpload}
                style={{
                    color: caption ? "gray" : "lightgrey",
                    fontWeight: caption ? "600" : "500",
                }}
            >
                Upload
            </button>
        </div>
    );
}

export default CreatePost;