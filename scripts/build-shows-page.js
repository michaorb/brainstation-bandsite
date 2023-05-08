// Axios default configuration
axios.defaults.baseURL = "https://project-1-api.herokuapp.com";
axios.defaults.params = {};
axios.defaults.params['api_key'] = "c9501e69-3b36-44fe-82c2-9b085178140d"

// Global object holding all shows info
let showsArray = [];

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

const renderShowsArray = () => {
    let showsWrapper = document.querySelector(".shows__wrapper");
    for (let i = 0; i < showsArray.length; i++) {
        let htmlElement = createShowHtml(showsArray[i]);
        showsWrapper.appendChild(htmlElement);
        let divider = document.createElement("hr");
        showsWrapper.appendChild(divider);
    }
}
let showsWrapper = document.querySelector(".shows__wrapper");
for (let i = 0; i < showsArray.length; i++) {
    let htmlElement = createShowHtml(showsArray[i]);
    showsWrapper.appendChild(htmlElement);
    let divider = document.createElement("hr");
    showsWrapper.appendChild(divider);
}

const getShowDates = () => {
    const showDatePromise = axios.get("/showdates");
    showDatePromise.then((response) => {
        let data = response.data; 
        for (let i = 0; i < data.length; i++) {
            data[i].venue = data[i].place;
            let date = new Date (data[i].date);
            data[i].date = date.toLocaleDateString();
        }
        showsArray = data;
        renderShowsArray();
    })
}
getShowDates();