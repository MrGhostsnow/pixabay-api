'use strict';

async function searchImages(text) {
    const key = "27495787-dc719afaef8bd19b2011a1630";
    const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
    const response = await fetch(url);
    return response.json();
}

const createLink = (tag) =>
    `<a href="#" onClick = "loadGallery('${tag}')">
        ${tag}
    </a>`;


function createCard({webformatURL, pageURL, tags, likes, comments}) {
    const card = document.createElement("div");
    card.classList.add("card-container");
    card.innerHTML = `
        <a href="${pageURL}" class="card-image">
            <img src=${webformatURL} >
        </a>
        <div class="card-info">
            <div class="card-tags">
                ${tags.split(',').map(createLink).join('')}
            </div>
            <div class="card-action">
                <div class="card-like">
                    <span class="material-symbols-outlined">
                        favorite
                    </span>
                    <p>${likes}</p>
                </div>
                <div class="card-comment">
                    <span class="material-symbols-outlined">
                        mode_comment
                    </span>
                    <p>${comments}</p>
                </div>
                <div class="card-save">
                    <span class="material-symbols-outlined">
                        bookmark
                    </span>
                </div>
            </div>
        </div>
    `;
    return card;
};


async function loadGallery(text, page = 1) {
    const container = document.querySelector(".container-gallery");
    const {hits, totalHits} = await searchImages(`${text}&page=${page}`);
    const cards = hits.map(createCard);
    container.replaceChildren(...cards);
    const totalPages = Math.ceil(totalHits / 20);
    document.querySelector("#page-total").textContent = `/ ${totalPages}`;
    document.querySelector("#search-input").value = text;
    document.querySelector("#page").value = page;   
};


function handleKeypress({key, target}) {
    if (key === "Enter") {
        loadGallery(target.value);
    }
};

function handlePage({key, target}) {
    const text = document.querySelector("#search-input").value;
    if (key === "Enter") {
        loadGallery(text, target.value);
    }
};

function handleNext() {
    let page = Number(document.querySelector("#page").value);
    const totalPages = Number(document.querySelector("#page-total").textContent.replace("/", ""));
    const text = document.querySelector("#search-input").value;
    if (page < totalPages) {
        page++;
        loadGallery(text, page);
    }
};

function handlePrevious() {
    let page = Number(document.querySelector("#page").value);
    const totalPages = Number(document.querySelector("#page-total").textContent.replace("/", ""));
    const text = document.querySelector("#search-input").value;
    if (page <= totalPages) {
        page--;

        loadGallery(text, page);
    }
};


document.querySelector("#search-input").addEventListener("keypress", handleKeypress);

document.querySelector("#page").addEventListener("keypress", handlePage);

document.querySelector("#page-next").addEventListener("click", handleNext);

document.querySelector("#page-previous").addEventListener("click", handlePrevious);

