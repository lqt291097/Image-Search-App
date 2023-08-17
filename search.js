const accessKey = "68D24BfObmdvQwx7gXD0phGR_-3iauPVdCuQsoxjXYE";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const formEl = $("form");
const searchInputEl = $("#search-input");
const searchResultEl = $(".search-results");
const showMoreButtonEl = $("#show-more-button");

let inputData = "";
let page = 1;

async function searchImage() {
    inputData = searchInputEl.value;
    const url = `https:api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchResultEl.innerHTML = "";
    }
    const results = data.results;

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = image.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultEl.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showMoreButtonEl.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMoreButtonEl.addEventListener("click", () => {
    searchImage();
});
