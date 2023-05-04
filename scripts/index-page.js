// Global array that stores all comments
let commentArray = [];
let getCommentArray = () => {
    const promise = axios.get("https://project-1-api.herokuapp.com/comments?api_key=c9501e69-3b36-44fe-82c2-9b085178140d");
    promise.then((response) => {
        let responseData = response.data;
        console.log(responseData);
        commentArray = responseData.reverse();
        for (let i = 0; i < commentArray.length; i++) {
            let date = new Date(commentArray[i].timestamp);
            commentArray[i].timestamp = date.toLocaleDateString();
        }
        renderComments();
    });
};
getCommentArray();
//Functions

// Event handler for form submission
function formSubmit (event) {
    event.preventDefault();
    const formFields = event.target.elements;
    const comment = {
        name: formFields.name.value,
        comment: formFields.comment.value,
        timestamp: new Date().toLocaleDateString("en-US")
    };
    const postComment = axios.post("https://project-1-api.herokuapp.com/comments?api_key=c9501e69-3b36-44fe-82c2-9b085178140d", 
        {
            name: comment.name,
            comment: comment.comment
        }
    );
    postComment.then((response) => {
        const postedComment = response.data;
        commentArray.unshift (comment);
        renderComments ();
    });
    event.target.reset();
};
// function that displays all comments in commentArray in the HTML
function renderComments () {
    const display = document.querySelector(".comments__render");
    while (display.firstChild) {
        display.removeChild (display.firstChild);
    }
    for (let i = 0; i < commentArray.length; i++) {
        display.appendChild(createCommentHtml(commentArray[i]));
        const divider = document.createElement("HR");
        display.appendChild(divider);
    }
};
// function that creates an HTML Element from a comment object from the array
function createCommentHtml (comment) {
    const commentDisplay = document.createElement("div");
    commentDisplay.classList.add("comments__render__display");
    const profile = document.createElement("div");
    profile.classList.add("comments__render__display__profile");
    const text = document.createElement("div");
    text.classList.add("comments__render__display__text");
    const name = document.createElement("h6");
    name.innerText = comment.name;
    const timeStamp = document.createElement("p");
    timeStamp.classList.add("comments__render__display__text__timestamp");
    const innerTime = document.createElement("time");
    innerTime.innerText = comment.timestamp
    timeStamp.appendChild(innerTime);
    const commentText = document.createElement("p");
    commentText.classList.add("comments__render__display__text__comment");
    commentText.innerText = comment.comment;

    text.appendChild(name);
    text.appendChild(timeStamp);
    text.appendChild(commentText);

    commentDisplay.appendChild(profile);
    commentDisplay.appendChild(text);

    return commentDisplay;
};
const form = document.getElementById("comment-form");
form.addEventListener("submit", formSubmit);