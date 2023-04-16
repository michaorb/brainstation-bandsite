// Global array that stores all comments
// Pre-filled with 3 comments to start
let commentArray = [
    {
        name: "Connor Walton",
        timestamp: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        name: "Emilie Beach",
        timestamp: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        name: "Miles Acosta",
        timestamp: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    } 
];
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
    commentArray.unshift (comment);
    renderComments ();
    event.target.reset();
}
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
}
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
}
const form = document.getElementById("comment-form");
form.addEventListener("submit", formSubmit);