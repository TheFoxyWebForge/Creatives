// Below code is to get HTML elements
const drawer = document.querySelector('.drawer-container');
const addCreativeButton = document.getElementById('add-button');
const titleInput = document.getElementById('title');
const subtitleInput = document.getElementById('subtitle');
const doneButton = document.getElementById('done-button');
const progressBar = document.getElementById('progress');
const leftContainer = document.getElementById('left');
const searchBar = document.getElementById("search-button");
const counterElement = document.getElementById("counter");
const body = document.body;

// Initialize variables
let creativeCount = 0;
let selectedColor = null;
let searchSelectedColor = null;

// Event listener for add creatives button
addCreativeButton.addEventListener('click', () => {
    doneButton.style.cursor = 'not-allowed';
    if (creativeCount < 5) {
        openDrawer();
    } else {
        addCreativeButton.disabled = true;
    }
});

// Function to open the creative drawer
function openDrawer() {
    drawer.classList.add('open-drawer');
    addCreativeButton.disabled = true;
    addCreativeButton.classList.add('disabled');
    body.style.overflow = 'hidden';
    leftContainer.style.overflowY = 'scroll';
}

// Function to close the creative drawer
function closeDrawer() {
    addCreativeButton.classList.remove('disabled');
    drawer.classList.remove('open-drawer');
    addCreativeButton.disabled = false;
    clearForm();
    body.style.overflow = 'visible';
    leftContainer.style.overflowY = 'visible';
}

// Function to clear the creative form
function clearForm() {
    titleInput.value = '';
    subtitleInput.value = '';
    selectedColor = null;
    doneButton.disabled = true;
    resetCircleSelection();
}

// Function to select a color circle
function selectColor(circle) {
    resetCircleSelection();
    circle.classList.add('highlight');
    selectedColor = circle.style.backgroundColor;
    checkFormValidity();
}

// Function to reset selected color circles
function resetCircleSelection() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach(circle => circle.classList.remove('highlight'));
}

// Function to check the validity of the creative form
function checkFormValidity() {
    const title = titleInput.value.trim();
    const subtitle = subtitleInput.value.trim();
    if (title !== '' && subtitle !== '' && selectedColor !== null) {
        doneButton.disabled = false;
        doneButton.style.cursor = 'pointer';
    } else {
        doneButton.disabled = true;
    }
}

// Function to add a creative
function addCreative() {
    const title = titleInput.value.trim();
    const subtitle = subtitleInput.value.trim();
    creativeCount++;
    // Check if all fields are filled
    if (title !== '' && subtitle !== '' && selectedColor !== null) {
        // Create a new creative box
        const creativeDiv = document.createElement('div');
        creativeDiv.classList.add('creative-box');
        creativeDiv.style.backgroundColor = selectedColor;
        creativeDiv.style.borderColor = "black";
        // Create and append title and subtitle elements
        const titleElement = document.createElement('h1');
        titleElement.textContent = title;
        const subtitleElement = document.createElement('h4');
        subtitleElement.textContent = subtitle;

        creativeDiv.appendChild(titleElement);
        creativeDiv.appendChild(subtitleElement);

        // Append the creative box to the container
        const createdCreativesContainer = document.getElementById('created-creatives');
        createdCreativesContainer.appendChild(creativeDiv);

        // Close the drawer after submission
        closeDrawer();
        updateProgressBar();
        if (creativeCount == 5) {
            addCreativeButton.classList.add('disabled');
        }
    }
}

// Function to update the progress bar
function updateProgressBar() {
    progressBar.style.width = `${creativeCount * 20}%`;
    if (creativeCount > 5) {
        creativeCount = 0;
    }
    counterElement.textContent = creativeCount;
}

// Function to seach box using color filter
function searchColor(circle) {
    resetCircleSelection();
    circle.classList.add('highlight');

    circle.addEventListener("click", function (event) {
        filterCreativeBoxes();
        if (event.target.classList.contains("circle")) {
            if (event.target.classList.contains("highlight")) {
                event.target.classList.remove("highlight");
                showAllCreativeBoxes();
            } else {
                event.target.classList.add("highlight");
                filterCreativeBoxes();
            }
        }
    });

    searchSelectedColor = circle.style.backgroundColor;
    if (circle.classList.contains("highlight")) {
        filterCreativeBoxes();
    }
    if (circle.classList.contains("highlight")) {
        filterCreativeBoxes();
    }
}

// Function to filter creative boxes by color
function filterCreativeBoxes() {
    const searchText = searchBar.value.toLowerCase();
    const creativeBoxesList = document.querySelectorAll(".creative-box");

    creativeBoxesList.forEach(box => {
        const boxColor = box.style.backgroundColor;

        if (boxColor === searchSelectedColor) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
}

// Function to show all creative boxes
function showAllCreativeBoxes() {
    const creativeBoxesList = document.querySelectorAll(".creative-box");

    creativeBoxesList.forEach(box => {
        const boxColor = box.style.backgroundColor;
        box.style.display = "block";
    });
}

// Function to search for creative boxes by title & subtitle
function searchBox() {
    const searchText = searchBar.value.toLowerCase();
    const creativeBoxesList = document.querySelectorAll(".creative-box");
    creativeBoxesList.forEach(box => {
        const title = box.querySelector("h1").textContent.toLowerCase();
        const subtitle = box.querySelector("h4").textContent.toLowerCase();

        if (searchText === "" || title.includes(searchText) || subtitle.includes(searchText)) {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    });
}
