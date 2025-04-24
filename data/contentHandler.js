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
            if (line.startsWith(".")) {
                addPageMarker(line, headerContainer, sidebarContent, contentContainer);
                return;
            } 
            contentContainer.appendChild(translateContent(line));
            document.querySelectorAll('video').forEach(video => video.volume = 0.15);
        });
    })
    .catch(error => console.error('Error fetching content:', error));
}

function translateContent(line) {
    const lineStart = line.charAt(0);

    if (line.trim() === "") {
        return document.createElement("br");
    }

    switch (lineStart) {
        case "_":
            return createNewImage(line);
        case "+":
            return createNewVideo(line);
        case "#":
            return createNewChapterHeader(line);
        case "!":
            return createNewAnwserParagraph(line);
        default:
            return createNewParagraph(line);
    }
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

function createNewImage(line) {
    const newImageContainer = document.createElement("div");
    const newImage = document.createElement("img");

    newImageContainer.setAttribute("class", "report-section-image-container");

    newImage.setAttribute("class", "report-section-image");
    newImage.setAttribute("src", line.split("_")[1]);
    newImage.setAttribute("alt", "Image not found");

    const label = line.split("_")[2];

    if (label != undefined) {
        const newLabel = document.createElement("p");       
        newLabel.setAttribute("class", "report-section-label");
        newImageContainer.appendChild(newLabel);
    }

    newImageContainer.appendChild(newImage);
    newImage.style.width = line.split("_")[3];

    return newImageContainer;
}

function createNewVideo(line) {
    const source = line.substring(1);

    const videoElement = `
        <video class="report-section-video" controls>
            <source src="${source}.mp4" type="video/mp4">
            <source src="${source}.ogg" type="video/ogg">
            Your browser does not support the video tag.
        </video>
    `;

    const videoContainer = document.createElement("div");
    videoContainer.setAttribute("class", "report-section-video-container");
    videoContainer.innerHTML = videoElement;
    
    return videoContainer;
}

function createNewChapterHeader(line) {
    const newHeader = document.createElement("h1");
    const headerNumberSpan = document.createElement("span");
    const headerNameSpan = document.createElement("span");

    newHeader.setAttribute("class", "report-section-title line-highlight");

    headerNumberSpan.innerText = line.split(":")[0].substring(1) + ":";
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

    newParagraph.innerText = line;

    return newParagraph;
}