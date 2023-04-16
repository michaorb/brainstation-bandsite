let showsArray = [
    {
        date: "Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
];

function clickEvent(event) {
    const currentActive = document.querySelector(".shows__container--active");
    //remove the current active class if it exists
    if (currentActive) {
        currentActive.classList.remove("shows__container--active");
    }
    // give the clicked div the "active" class
    const target = event.target.closest(".shows__container");
    target.classList.add("shows__container--active");
}

function createShowHtml(show) {
    let container = document.createElement("div");
    container.classList.add("shows__container");
    let dateHeader = document.createElement("h4");
    dateHeader.innerText = "Date";
    let date = document.createElement("p");
    date.id = "show-date";
    let innerTime = document.createElement("time");
    innerTime.innerText = show.date;
    date.appendChild(innerTime);
    let venueHeader = document.createElement("h4");
    venueHeader.innerText = "Venue";
    let venue = document.createElement("p");
    venue.innerText = show.venue;
    let locationHeader = document.createElement("h4");
    locationHeader.innerText = "Location";
    let location = document.createElement("p");
    location.innerText = show.location;
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.innerText = "Buy Tickets";

    container.appendChild(dateHeader);
    container.appendChild(date);
    container.appendChild(venueHeader);
    container.appendChild(venue);
    container.appendChild(locationHeader);
    container.appendChild(location);
    container.appendChild(button);

    container.addEventListener("click", clickEvent);

    return container;
}

let showsWrapper = document.querySelector(".shows__wrapper");
for (let i = 0; i < showsArray.length; i++) {
    let htmlElement = createShowHtml(showsArray[i]);
    showsWrapper.appendChild(htmlElement);
    let divider = document.createElement("hr");
    showsWrapper.appendChild(divider);
}