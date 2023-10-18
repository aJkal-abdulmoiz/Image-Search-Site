const accessKey = "bY9WFsf8vo8MTTHHFAPqYWRzHrZfBIPJcHnYMqnx9oc";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");
const footer = document.getElementById("footer");

let page = 1;

async function searchImages() {
    const inputData = inputEl.value;

    if (inputData === "") {
        footer.style.display = "none";
        searchResults.innerHTML = "Please Enter a Keyword To Search ";
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            footer.style.display = "none";
            searchResults.innerHTML = "Keyword is incorrect or no results found.";
            return;
        }

        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        if (results.length === 0) {
            footer.style.display = "none";
            searchResults.innerHTML = "Invalid keyword or no results found.";
            return;
        }

        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description; 
            image.loading = "lazy";

            const imageLink = document.createElement('a');

            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            const btn = document.createElement('i');
            btn.classList.add("fa", "fa-cloud-download");
            imageLink.appendChild(btn);

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;

        if (page > 1 || results.length >1) {
            showMore.style.display = "block";
        }
    } catch (error) {
        console.error(error);
        searchResults.innerHTML = "An error occurred while fetching data.&#x1F641;";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
