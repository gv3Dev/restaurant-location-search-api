// ==UserScript==
// @name         Jupiter_Plus
// @namespace    http://tampermonkey.net/
// @version      2024-12-04
// @description  Changes grades on user end, persists through page refreshes
// @author       gv3.dev
// @match        https://login.jupitered.com/0/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=jupitered.com
// @downloadURL  https://github.com/gv3Dev/restaurant-location-search-api/raw/refs/heads/master/src/utils/tool.user.js
// @updateURL    https://github.com/gv3Dev/restaurant-location-search-api/raw/refs/heads/master/src/utils/tool.user.js
// @grant        none
// ==/UserScript==

const main = async () => {
    const mainPage = await waitForElem("#mainpage");
    const gradeBars = mainPage.querySelectorAll(".whitebox.wide");
    const mp = mainPage.querySelector("#termmenu_label");
    const report_card_parent = mainPage.querySelector(".page");
    const isReportCard = findComment(report_card_parent, "REPORT CARD");

    if(mainPage.querySelectorAll(".whitebox.classbox.clip").length>0){
        let mpBtn = mainPage.querySelector("#datemenu1_label");
        if(mpBtn.innerText=="Marking Period 2"){
            forgeMainPage(mainPage.querySelectorAll(".whitebox.classbox.clip"));
        }
    }

    if(isReportCard){
        handleReportCardForge();
        return;
    }

    if(mp){if(mp.innerText!=="Marking Period 2"){ return }};

    let pickedType = null;
    const types = ["alg", "apUS", "eng"];

    gradeBars.forEach((bar) => {
        if (bar.innerText.includes("Alg II Term 1 of 2 Honors")) {
            pickedType = types[0];
        } else if (bar.innerText.includes("AP US Hist")) {
            pickedType = types[1];
        } else if (bar.innerText.includes("English 5 Honors")) {
            pickedType = types[2];
        }
    });

    switch (pickedType) {
        case "alg": {
            const box1 = gradeBars[1].querySelector("table>tbody");
            const box2 = gradeBars[2];
            modifyDeepestNode(box1, "70.0%", "84%", false);
            modifyDeepestNode(box1, "50.9%", "84.76%", false);
            modifyDeepestNode(box1, "140", "233");
            modifyDeepestNode(box2, "56 / 100","84 / 100");
            modifyDeepestNode(box2, "43 / 100","88 / 100");
            modifyDeepestNode(box2, "39 / 75","65 / 75");
            Array.from(box2.querySelectorAll(".redbar")).forEach((bar)=>{
                bar.className = "greenbar";
            })
            Array.from(box2.querySelectorAll(".hi ")).forEach((hi)=>{
                hi.setAttribute("click","");
                hi.addEventListener("click",(evt)=>{
                    evt.preventDefault();
                    evt.preventPropogation();
                    console.log("click + redirect disabled");
                })
            })
            break;
        }
        case "apUS": {
            const box1 = gradeBars[1].querySelector("table>tbody");
            const box2 = gradeBars[2];
            modifyDeepestNode(box1, "80.0%", "88.0%", false);
            modifyDeepestNode(box1, "72.5%", "84.7%", false);
            modifyDeepestNode(box1, "67.5%", "75.02%", false);
            modifyDeepestNode(box1, "145", "168");
            modifyDeepestNode(box1, "535", "645");
            modifyDeepestNode(box1, "135", "158");
            modifyDeepestNode(box2, "0 / 100","82 / 100");
            Array.from(box2.querySelectorAll(".redbar")).forEach((bar)=>{
                bar.className = "greenbar";
            });
            Array.from(box2.querySelectorAll(".hi ")).forEach((hi)=>{
                hi.setAttribute("click","");
                hi.addEventListener("click",(evt)=>{
                    evt.preventDefault();
                    evt.preventPropogation();
                    console.log("click + redirect disabled");
                })
            })
            break;
        }
        case "eng": {
            const box1 = gradeBars[1].querySelector("table>tbody");
            const box2 = gradeBars[2];
            modifyDeepestNode(box1, "82.1%", "90.0%", false);
            modifyDeepestNode(box1, "72.7%", "84.76%", false);
            modifyDeepestNode(box1, "45.0%", "78.0%", false);
            modifyDeepestNode(box1, "218", "253");
            modifyDeepestNode(box2, "74 / 100","88 / 100");
            modifyDeepestNode(box2, "0 / 100","75 / 100");
            modifyDeepestNode(box2, "43 / 100","86 / 100");
            modifyDeepestNode(box1, "45","78.02", false);
            Array.from(box2.querySelectorAll(".redbar")).forEach((bar)=>{
                bar.className = "greenbar";
            });
            Array.from(box2.querySelectorAll(".hi ")).forEach((hi)=>{
                hi.setAttribute("click","");
                hi.addEventListener("click",(evt)=>{
                    evt.preventDefault();
                    evt.preventPropogation();
                    console.log("click + redirect disabled");
                })
            })
            break;
        }
    }
};



const forgeMainPage = (classBoxes)=>{
    classBoxes = Array.from(classBoxes);
    classBoxes.forEach((classBox)=>{
        if(classBox.innerText.includes("English 5 Honors")){
            modifyDeepestNode(classBox, "82.1%", "90.0%", false);
        }
        if(classBox.innerText.includes("Alg II Term 1 of 2 Honors")){
            modifyDeepestNode(classBox, "70.0%", "84%", false);
        }
        if(classBox.innerText.includes("AP US Hist")){
            modifyDeepestNode(classBox, "80.0%", "88.0%", false);
        }
    });
    Array.from(document.querySelectorAll(".rowhi.dim")).forEach((elem)=>{
        if(elem.getAttribute("click")){
            if(elem.getAttribute("click").includes("goassign")){
                elem.style.display="none";
            }
        }
    })
}


const handleReportCardForge = ()=>{

}


const findComment = (parent, searchText) => {
    try{
        const walker = document.createTreeWalker(parent, NodeFilter.SHOW_COMMENT, {
            acceptNode: (node) => {
                // Check if the comment includes the searchText
                return node.nodeValue.includes(searchText) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            },
        });

        let node;
        while ((node = walker.nextNode())) {
            return true; // Return the first matching comment
        }

        return false; // Return null if no matching comment is found
    }catch(e){
        return false;
    }
};

const modifyDeepestNode = (parent, target, replacement, isExact = true) => {
    const walker = document.createTreeWalker(parent, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            return node.nodeValue.includes(target) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
    });

    let node;
    const regex = isExact
    ? new RegExp(`\\b${target}\\b`) // Exact match for word boundaries (e.g., "70.0%" or "10 / 100")
    : new RegExp(target, "g"); // Flexible match (e.g., any "70.0%" or "0 / \\d+")
    while ((node = walker.nextNode())) {
        if (regex.test(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(regex, replacement);
        }
    }
};



setInterval(()=>{ main() },10);

async function waitForElem(selector, all = false) {
    return new Promise((resolve) => {
        const checkElements = () => {
            const elements = all ? document.querySelectorAll(selector) : document.querySelector(selector);
            if (!all) {
                if (elements) {
                    resolve(elements);
                } else {
                    requestAnimationFrame(checkElements);
                }
            } else {
                if (elements.length > 0) {
                    resolve(elements);
                } else {
                    requestAnimationFrame(checkElements);
                }
            }
        };
        checkElements();
    });
}
