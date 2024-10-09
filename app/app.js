const d = document;

const main = d.querySelector("main");
const $searchContainer = d.querySelector(".search-container");
const $clearBtn = d.querySelector(".clear-btn");
let roleTag = "";
let levelTag = "";
let languagesTagsArr = [];
let searchTagsArray = [];

async function loadData() {
    await fetch("./data.json")
    .then(response => response.json())
    .then(data => createOffers(data));
}

function createOffers(data) {
    data.forEach((d, i) => {

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

d.addEventListener("DOMContentLoaded", loadData());

function filterTag(value) {
    if(searchTagsArray.indexOf(value.textContent) !== -1) {
        return;
    }
    
    searchTagsArray.push(value.textContent);
    //console.log(searchTagsArray);

    const searchTags = d.createElement("div");
    searchTags.classList.add("search-tags");
    searchTags.id = value.textContent;
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
        filterRole(roleTag);
    }

    if(value.classList.contains("level")) {
        levelTag = value.textContent;
        filterLevel(levelTag);
    }

    if(value.classList.contains("languages")) {
        languagesTagsArr.push(value.textContent);
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

function filterRole(value) {
    const $roleTags = d.querySelectorAll(".role");

    $roleTags.forEach(tag => {
    if(tag.textContent === value) {
        tag.parentElement.parentElement.classList.add("filterRole");    
        } 
    })
    updateList();
}

function filterLevel(value) { 
    const $levelTags = d.querySelectorAll(".level");

    $levelTags.forEach(tag => {
    //console.log(tag.textContent);
    if(tag.textContent === value) {
        tag.parentElement.parentElement.classList.add("filterLevel");    
        } 
    });
    updateList();
}

function filterLanguages(value) {
    const $filtered1 = d.querySelectorAll(".filter1");
    const $filtered2 = d.querySelectorAll(".filter2");
    const $languagesTags = d.querySelectorAll(".languages");

    if($filtered1.length === 0) {
    $languagesTags.forEach(tag => {
    if(tag.textContent === value) {
        tag.parentElement.parentElement.classList.add("filter1");    
        } 
    })
    updateList();
    return;    
    } 
    
    if($filtered2.length === 0) {    
        $filtered1.forEach(c => {
        c.childNodes[1].childNodes.forEach(cc => {
            //console.log(cc.textContent);
            if(cc.textContent === value) {
                cc.parentElement.parentElement.classList.add("filter2")
                }
            });           
        });
        updateList();
    } else {
        //console.log("hola");
        $filtered2.forEach(c => {
            c.childNodes[1].childNodes.forEach(cc => {
                //console.log(cc.textContent);
                if(cc.textContent === value) {
                    cc.parentElement.parentElement.classList.add("filter3")
                    }
                });           
            });
            updateList();
    }  
}

function deleteTag(btn) {
    const $searchContainer = d.querySelector(".search-container");
    const $cards = d.querySelectorAll(".card");
    const $filter3Cards = d.querySelectorAll(".filter3");
    const $filter2Cards = d.querySelectorAll(".filter2");
    const $filter1Cards = d.querySelectorAll(".filter1");
    const $filterRole = d.querySelectorAll(".filterRole");
    const $filterLevel = d.querySelectorAll(".filterLevel");
    let languagesTagsArrLength = languagesTagsArr.length;

    searchTagsArray = searchTagsArray.filter(item => item !== btn.textContent);

    console.log(languagesTagsArr);

    console.log(languagesTagsArr.length);

    for(let i = 0; i <= languagesTagsArr.length; i++) {
        //console.log(languagesTagsArr[i]);
        if(languagesTagsArr[i] === btn.textContent) {
            //console.log(typeof languagesTagsArrLength);
            switch(languagesTagsArrLength) {
                case 3:
                    $cards.forEach(c => {
                        c.classList.remove("filter3");
                    });
                    languagesTagsArr = languagesTagsArr.filter(item => item !== btn.textContent);
                    console.log(languagesTagsArr);
                    checkList("lg");
                break;
                case 2:
                    $cards.forEach(c => {
                        console.log("hola");
                        c.classList.remove("filter2");
                    });
                    languagesTagsArr = languagesTagsArr.filter(item => item !== btn.textContent);
                    checkList("lg");
                break;
                case 1:
                    $cards.forEach(c => {
                        console.log("hola");
                        c.classList.remove("filter1");
                    });
                    languagesTagsArr = languagesTagsArr.filter(item => item !== btn.textContent);
                    checkList("lg");
                break;
            }
        }
    }

    if(btn.textContent === roleTag) {
        $cards.forEach(c => {
            if(c.classList.contains("filterRole")) {
                c.classList.remove("filterRole");
                roleTag = "";
            }
        });
        checkList("role");
    }

    if(btn.textContent === levelTag) {
        $cards.forEach(c => {
            if(c.classList.contains("filterLevel")) {
                c.classList.remove("filterLevel");
                levelTag = "";
            }
        });
        checkList("level")
    }

    if(searchTagsArray.length === 0) {
        $cards.forEach(c => {
            c.classList.remove("hide");
            c.classList.remove("filterLevel");
            c.classList.remove("filter1");
            c.classList.remove("filter2");
            c.classList.remove("filter3");
        })
    }

    $searchContainer.removeChild(btn);
    console.log(searchTagsArray);
    return;
}

function checkList(value) {
    const $cards = d.querySelectorAll(".card");
    const filter3Cards = d.querySelectorAll(".filter3");
    const filter2Cards = d.querySelectorAll(".filter2");
    const filter1Cards = d.querySelectorAll(".filter1");
    const filterRole = d.querySelectorAll(".filterRole");
    const filterLevel = d.querySelectorAll(".filterLevel");
    
    if(value === "lg") {
        if(filter2Cards.length > 0) {
            filter2Cards.forEach(c => {
            if(c.classList.contains("hide")) {
                c.classList.remove("hide");
            }     
            });
            return;
        }
        if(filter1Cards.length > 0) {
            filter1Cards.forEach(c => {
                if(c.classList.contains("filterRole")) {
                    console.log(c);
                    c.classList.remove("hide");
                    return;
                }
                if(c.classList.contains("filterLevel") && c.classList.contains("filterRole")) {
                    console.log(c);
                    c.classList.remove("hide");
                    return;
                }
                if(c.classList.contains("filterLevel")) {
                    console.log(c);
                    c.classList.remove("hide");
                    return;
                }
            });
            return;
        }
        if(filter1Cards.length === 0) {
            if(filterRole.length > 0) {
             filterRole.forEach(c => {
                if(c.classList.contains("hide")) {
                    c.classList.contains("hide");
                }
             })   
            }
        }        
    }
    if(value === "level") {
        if(filter3Cards.length > 0) {
            filter3Cards.forEach(c => {
                c.classList.remove("hide");
            });
            return;
        } 
        if(filter2Cards.length > 0) {
            filter2Cards.forEach(c => {
                c.classList.remove("hide");
            });
            return;
        }
        if(filter1Cards.length > 0) {
            filter2Cards.forEach(c => {
                c.classList.remove("hide");
            });
            return;
        }
        if(filterRole.length > 0) {
            filterRole.forEach(c => {
                c.classList.remove("hide");
                console.log(c);
            }); 
            return;
        }  
    }
    if(value === "role") {

    }
}

function updateList() {
    const $cards = d.querySelectorAll(".card");
    const filter3Cards = d.querySelectorAll(".filter3");
    const filter2Cards = d.querySelectorAll(".filter2");
    const filter1Cards = d.querySelectorAll(".filter1");
    const filterRole = d.querySelectorAll(".filterRole");
    const filterLevel = d.querySelectorAll(".filterLevel");

    $cards.forEach(c => {
        if(filter3Cards.length > 0) {
            //console.log(c.classList);
            if(!(c.classList.contains("filter3"))) {
                c.classList.add("hide");
            }
            if(filterRole.length > 0) {
                if(!(c.classList.contains("filterRole"))) {
                    c.classList.add("hide");
                }
            }
            if(filterLevel.length > 0) {
                if(!(c.classList.contains("filterLevel"))) {
                    c.classList.add("hide");
                }
            }
            return;
        }

        if(filter2Cards.length > 0) {
            //console.log(c.classList);
            if(!(c.classList.contains("filter2"))) {
                c.classList.add("hide");
            }
            if(filterRole.length > 0) {
                if(!(c.classList.contains("filterRole"))) {
                    c.classList.add("hide");
                }
            }
            if(filterLevel.length > 0) {
                if(!(c.classList.contains("filterLevel"))) {
                    c.classList.add("hide");
                }
            }
            return;
        }

        if(filter1Cards.length > 0) {
            //console.log(c.classList);
            if(!(c.classList.contains("filter1"))) {
                c.classList.add("hide");
            }
            if(filterRole.length > 0) {
                if(!(c.classList.contains("filterRole"))) {
                    c.classList.add("hide");
                }
            }
            if(filterLevel.length > 0) {
                if(!(c.classList.contains("filterLevel"))) {
                    c.classList.add("hide");
                }
            }
            return;
        }

        if(filter1Cards.length === 0 && filter2Cards.length === 0 && filter3Cards.length === 0) {
            if(filterRole.length > 0) {
                if(!(c.classList.contains("filterRole"))) {
                    c.classList.add("hide");
                }
            }
            if(filterLevel.length > 0) {
                if(!(c.classList.contains("filterLevel"))) {
                    c.classList.add("hide");
                }
            }
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
        card.classList.remove("filterRole");
        card.classList.remove("filterLevel");
        card.classList.remove("filter1");
        card.classList.remove("filter2");
        card.classList.remove("filter3");
    });
})

