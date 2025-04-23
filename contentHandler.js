fetchContent();

function fetchContent() {
    const headerContainer = document.getElementById("header-wrapper");
    const sidebarContent = document.getElementsByClassName("sidebar-list")[0];
    const contentContainer = document.getElementById("content-wrapper");

    fetch("./data/Content.txt")
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        lines.forEach(line => {
            if (line.startsWith("!")) {
                addPageMarker(line, headerContainer, sidebarContent, contentContainer);
                return;
            } 
            contentContainer.appendChild(translateContent(line));
        });
    })
    .catch(error => console.error('Error fetching content:', error));
}

function addPageMarker(line, header, sidebar, content) {
    const newMarker = document.createElement("div");
    const newHeaderLink = document.createElement("a");
    const newSidebarItem = document.createElement("li");
    const newSidebarLink = document.createElement("a");

    newMarker.setAttribute("class", "page-markers");
    newMarker.setAttribute("id", line.substring(1));

    newHeaderLink.setAttribute("class", "header-nav-link content-highlight");
    newHeaderLink.setAttribute("href", "#" + line.substring(1));
    newHeaderLink.innerText = line.substring(1).replace("-", " ");

    newSidebarItem.setAttribute("class", "sidebar-item");
    newSidebarLink.setAttribute("class", "sidebar-link");
    newSidebarLink.setAttribute("href", "#" + line.substring(1));
    newSidebarLink.innerText = line.substring(1).replace("-", " ");

    newSidebarItem.appendChild(newSidebarLink);
    sidebar.appendChild(newSidebarItem);
    content.appendChild(newMarker);
    header.appendChild(newHeaderLink);
}

function translateContent(line) {
    if (line.trim() === "") {
        return document.createElement("br");
    }

    if (line.startsWith("_")) {
        return createNewImage(line);
    }

    if (line.startsWith("##")) {
        return createNewChapterHeader(line);
    }

    if (line.startsWith("#")) {
        return createNewQuestionHeader(line);
    }
    
    if (line.startsWith(".!")) {
        return createNewAnwserParagraph(line);
    }

    if (line.startsWith(".")) {
        return createNewParagraph(line);
    }
}

function createNewImage(line) {
    const newImageContainer = document.createElement("div");
    const newImage = document.createElement("img");
    const newLabel = document.createElement("p");

    newImageContainer.setAttribute("class", "report-section-image-container");

    newImage.setAttribute("class", "report-section-image");
    newImage.setAttribute("src", line.split("_")[1]);
    newImage.setAttribute("alt", "Image not found");

    newLabel.setAttribute("class", "report-section-label");
    newLabel.innerText = line.split("_")[2];

    newImageContainer.appendChild(newImage);
    newImageContainer.appendChild(newLabel);

    return newImageContainer;
}

function createNewChapterHeader(line) {
    const newHeader = document.createElement("h1");
    const headerNumberSpan = document.createElement("span");
    const headerNameSpan = document.createElement("span");

    newHeader.setAttribute("class", "report-section-title line-highlight");

    headerNumberSpan.innerText = line.split(":")[0].substring(2) + ":";
    headerNameSpan.innerText = line.split(":")[1];
    newHeader.appendChild(headerNumberSpan);
    newHeader.appendChild(headerNameSpan);

    return newHeader;
}

function createNewQuestionHeader(line) {
    const newSubHeader = document.createElement("h3");

    newSubHeader.setAttribute("class", "report-section-subtitle line-highlight");

    newSubHeader.innerText = line.substring(1);

    return newSubHeader;
}

function createNewAnwserParagraph(line) {
    const newParagraph = document.createElement("p");
    const newNameSpan = document.createElement("span");
    const newContentSpan = document.createElement("span");

    newParagraph.setAttribute("class", "report-section-text");
    newNameSpan.setAttribute("class", "text-highlight");

    newNameSpan.innerText = line.split(":")[0].substring(2) + ":";
    newContentSpan.innerText = line.split(":")[1];
    newParagraph.appendChild(newNameSpan);
    newParagraph.appendChild(newContentSpan);

    return newParagraph;
}

function createNewParagraph(line) {
    const newParagraph = document.createElement("p");

    newParagraph.setAttribute("class", "report-section-text");

    newParagraph.innerText = line.substring(1);

    return newParagraph;
}