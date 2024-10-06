const d = document;

const main = d.querySelector("main");
const $searchContainer = d.querySelector(".search-container");
const $clearBtn = d.querySelector(".clear-btn");
let roleTag = "";
let levelTag = "";
let languagesTags = [];
let searchTagsArray = [];

async function loadData() {
    await fetch("./data.json")
    .then(response => response.json())
    .then(data => createOffers(data));
}

function createOffers(data) {
    data.forEach((d, i) => {
        //console.log(data);

        const card = document.createElement("article");
        card.classList.add("card");
        card.id = i;

        const jobOfferInfo = document.createElement("div");
        jobOfferInfo.classList.add("job-offer_info");
        const logoCompany = document.createElement("img");
        logoCompany.src = d.logo;
        logoCompany.alt = d.company;
        
        const employerInfo = document.createElement("div");
        employerInfo.classList.add("employer-info");
        const employer = document.createElement("p");
        employer.classList.add("employer");
        employer.textContent = d.company;

        employerInfo.appendChild(employer);

            if(d.new === true) {
            const newTag = document.createElement("p");
            newTag.classList.add("new-tag");
            newTag.textContent = "New!";
            employerInfo.appendChild(newTag);
        }

            if(d.featured === true) {
            const featuredTag = document.createElement("p");
            featuredTag.classList.add("featured-tag");
            featuredTag.textContent = "Featured";
            employerInfo.appendChild(featuredTag);
        }

        jobOfferInfo.appendChild(logoCompany);
        jobOfferInfo.appendChild(employerInfo);

        const jobTitle = document.createElement("a");
        jobTitle.classList.add("job-title");
        jobTitle.textContent = d.position;

        const jobInfo = document.createElement("div");
        jobInfo.classList.add("job-info");
        const postDate = document.createElement("p");
        postDate.classList.add("timestamp");
        postDate.textContent = d.postedAt;
        const contract = document.createElement("p");
        contract.classList.add("contract");
        contract.textContent = d.contract;
        const location = document.createElement("p");
        location.classList.add("location");
        location.textContent = d.location;

        jobInfo.appendChild(postDate);
        jobInfo.appendChild(contract);
        jobInfo.appendChild(location);

        const workTags = document.createElement("div");
        workTags.classList.add("work-tags");
        const role = document.createElement("span");
        role.classList.add("role");
        role.textContent = d.role;
        role.setAttribute("data-id", i);
        const level = document.createElement("span");
        level.classList.add("level");
        level.setAttribute("id", i);
        level.textContent = d.level;

        workTags.appendChild(role);
        workTags.appendChild(level);

        d.languages.forEach(l => {        
            const languages = document.createElement("span");
            languages.setAttribute("id", i);
            languages.classList.add("languages");
            languages.textContent = l;
            workTags.appendChild(languages);
        });

        //console.log(workTags);

        jobOfferInfo.appendChild(jobTitle);
        jobOfferInfo.appendChild(jobInfo);

        card.appendChild(jobOfferInfo);
        card.appendChild(workTags);

        main.appendChild(card);

    });
    
        const $workTags = document.querySelectorAll(".work-tags span");
        $workTags.forEach(tag => {
        tag.addEventListener("click", (e) => {
            let value = e.target;
            filterTag(value);
            })
        });
}

d.addEventListener("DOMContentLoaded", loadData())

function filterTag(value) {
    const $roleTags = d.querySelectorAll(".role");
    const $levelTags = d.querySelectorAll(".level");
    const $languagesTags = d.querySelectorAll(".languages");

    if(searchTagsArray.indexOf(value.textContent) !== -1) {
        return;
    }
    
    searchTagsArray.push(value.textContent);
    //filterCard.push(value.getAttribute("data-id"));

    const searchTags = d.createElement("div");
    searchTags.classList.add("search-tags");
    searchTags.id = value.textContent;
    searchTags.setAttribute("data-id", value.getAttribute("data-id"));
    const searchTagContainer = d.createElement("div");
    searchTagContainer.classList.add("search-tag_container");
    const searchTag = d.createElement("span");
    searchTag.classList.add("search-tag");
    searchTag.classList.add(value.textContent.toLowerCase());
    searchTag.textContent = value.textContent;
    const removeBtn = d.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.classList.add(value.textContent.toLowerCase());
    const closeIcon = d.createElement("img");
    closeIcon.src = "./images/icon-remove.svg";
    closeIcon.alt = "Remove icon";

    removeBtn.appendChild(closeIcon);
    searchTagContainer.appendChild(searchTag);
    searchTagContainer.appendChild(removeBtn);
    searchTags.appendChild(searchTagContainer);
    $searchContainer.appendChild(searchTags);

    if(value.classList.contains("role")) {
        roleTag = value.textContent;
        filterRole(value);
    }

    if(value.classList.contains("level")) {
        levelTag = value.textContent;
        filterLevel(value);
    }

    if(value.classList.contains("languages")) {
        languagesTags.push(value.textContent);
        filterLanguages(value.textContent);
    }

    const deleteBtn = d.querySelectorAll(".remove-btn");

    deleteBtn.forEach(btn => {
        btn.addEventListener("click", (e) => 
        {
            if(e) {
                deleteTag(e.currentTarget.parentElement.parentElement);
            }
        })
    })
}

function filterRole() {
    const $filteredCards = d.querySelectorAll(".filter");
    const $roleTags = d.querySelectorAll(".role");

    if($filteredCards.length > 0) {
        $filteredCards.forEach(card => {
            //console.log(card);
        $roleTags.forEach(tag => {
                if(tag.textContent  !== roleTag) {
                    tag.parentElement.parentElement.classList.add("hide");
                }            
            });
        return;            
        })
    }

    $roleTags.forEach(tag => {
        //console.log(tag);
        //console.log(roleTag);
            if(tag.textContent  === roleTag) {
                tag.parentElement.parentElement.classList.remove("hide");
                tag.parentElement.parentElement.classList.add("filter");
            }            
        })
        
        updateList();
}

function filterLevel() {
    const $filteredCards = d.querySelectorAll(".filter");
    const $levelTags = d.querySelectorAll(".level");

    if($filteredCards.length > 0) {
        $filteredCards.forEach(card => {
            //console.log(card);
        $levelTags.forEach(tag => {
            //console.log(levelTag);
            //console.log(tag);
                if(tag.textContent !== levelTag) {
                    tag.parentElement.parentElement.classList.add("hide");
                }            
            });          
        })
        return;  
    }

    $levelTags.forEach(tag => {
        //console.log(tag);
        //console.log(roleTag);
            if(tag.textContent  === levelTag) {
                tag.parentElement.parentElement.classList.remove("hide");
                tag.parentElement.parentElement.classList.add("filter");
            }            
        })
        
        updateList();
}

function filterLanguages(value) {
    const $filteredCards = d.querySelectorAll(".filter");
    const $languagesTags = d.querySelectorAll(".languages");

    if($filteredCards.length > 0) {
        $filteredCards.forEach(card => {
            card.childNodes[1].childNodes.forEach(c => {
                if(c.textContent === value) {
                    c.parentElement.parentElement.classList.add("filter");
                    c.parentElement.parentElement.classList.remove("hide");               
                }
            })
        /*.forEach(tag => {
            console.log(tag);
            languagesTags.forEach(l => {
                if(l !== value) {
                    console.log(tag);
                    //tag.parentElement.parentElement.classList.remove("filter");
                    //tag.parentElement.parentElement.classList.add("hide"); 
                }                 
            })   
            });*/
        return;            
        })
    }
    $languagesTags.forEach(tag => {
        languagesTags.forEach(l => {
            if(tag.textContent === l) {
                console.log(l);
                tag.parentElement.parentElement.classList.add("filter");
            }                 
        })            
    })  
        updateList();
}

function deleteTag(btn) {
    const $cards = document.querySelectorAll(".card");
    const $cardsFiltered = document.querySelectorAll(".filter");
    const $searchTags = d.querySelectorAll(".search-tags");
    let searchTagLength = $searchTags.length - 1;

    let cardsLength = $cardsFiltered.length;

    searchTagsArray = searchTagsArray.filter(item => item !== btn.id);

    $cardsFiltered.forEach(card => {
    card.childNodes[1].childNodes.forEach(c => {
         if(c.textContent === btn.id) {
           c.parentElement.parentElement.classList.remove("hide");
           c.parentElement.parentElement.classList.remove("filter");
           cardsLength--;
         }
    });
});

    languagesTags = languagesTags.filter(item => item !== btn.id);

    if(roleTag === btn.id) {
        roleTag = "";
    }

    if(levelTag === btn.id) {
        levelTag = "";
    }

    $searchContainer.removeChild(btn);

    if(searchTagLength > 0) {
        checkList();
        return;
    }

    if(cardsLength === 0) {
        for(let i = 0; i < $cards.length; i++) {
            $cards[i].classList.remove("hide");
        }
            return;
    }
}

function checkList() {
    const $searchTags = d.querySelectorAll(".search-tags");
    const $roleTags = d.querySelectorAll(".role");
    const $levelTags = d.querySelectorAll(".level");
    const $languagesTags = d.querySelectorAll(".languages");

    $searchTags.forEach(tag => {
            $roleTags.forEach(wTag => {
                if(wTag.textContent === tag.id) {
                    filterRole();
                }
            });
            
            $levelTags.forEach(wTag => {
                if(wTag.textContent === tag.id) {
                    filterLevel();
                }
            });

            $languagesTags.forEach(wTag => {
                if(wTag.textContent === tag.id) {
                    filterLanguages(tag.id);
                }
            })
        })
}

function updateList() {
    const $cards = d.querySelectorAll(".card");

    $cards.forEach(c => {
        if(!(c.classList.contains("filter"))) {
            c.classList.add("hide");
        }        
    })
}

$clearBtn.addEventListener("click", e => {
    const searchContainer = d.querySelector(".search-container");
    const searchTags = d.querySelectorAll(".search-tags");
    const $cards = d.querySelectorAll(".card");

    searchTags.forEach(tag => {
        searchContainer.removeChild(tag);
    });

    searchTagsArray = [];
    
    $cards.forEach(card => {
        card.classList.remove("hide");
        card.classList.remove("filter");
    });
})



