const newBookBtn = document.querySelector(".newBook");
const modal = document.querySelector(".modal-container");
const closeBtn = document.querySelector(".modal-close");
const main = document.querySelector("main");
const form = document.querySelector("form");
const submitBtn = document.querySelector("button[type='submit']");

let myLibrary = [];
let num = 1;

function addBookToLibrary() {
    // Make the modal visible
    modal.classList.add("visible");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const myFormData = new FormData(e.target);
        const formData = {};
        formData.id = num;
        myFormData.forEach((value, key) => formData[key] = value);
        if (formData.hasOwnProperty("isRead")) {
            formData.isRead = true;
        } else {
            formData.isRead = false;
        }
        myLibrary.push(formData);

        // Create card element to store all details of the book
        const cardContainer = document.createElement("div");
        cardContainer.setAttribute("data-id", num);

        // Create title element of the card
        const titleElement = document.createElement("h2");
        titleElement.textContent = formData.title;
        cardContainer.appendChild(titleElement);

        // Create author element of the card
        const authorElement = document.createElement("p");
        authorElement.textContent = `by ${formData.author}`;
        cardContainer.appendChild(authorElement);

        // Create pages element of the card
        if (formData.pages.length >= 1) {
            const pagesElement = document.createElement("h2");
            pagesElement.textContent = `Pages: ${formData.pages}`;
            cardContainer.appendChild(pagesElement);
        }

        // Create `read-status` & `remove` buttons
        const cardBtns = document.createElement("div");
        cardBtns.setAttribute("class", "card-buttons")
        const btn1 = document.createElement("button");
        btn1.setAttribute("class", "read-status");
        btn1.setAttribute("id", num);

        if (formData.isRead == true) {
            btn1.textContent = "Read";
            btn1.classList.add("read-true");
        } else {
            btn1.textContent = "Not read";
            btn1.classList.add("read-false");
        }

        const btn2 = document.createElement("button");
        btn2.setAttribute("class", "remove-button");
        btn2.setAttribute("id", num);
        btn2.textContent = "Remove";

        // Change read status of the card
        btn1.addEventListener("click", (e) => {
            if (btn1.classList.contains("read-true")) {
                btn1.classList.replace("read-true", "read-false");
                btn1.textContent = "Not read";
                myLibrary.forEach(obj => {
                    if (obj.id == btn1.id) {
                        obj.isRead = false;
                    } 
                })
            } else {
                btn1.classList.replace("read-false", "read-true");
                btn1.textContent = "Read";
                myLibrary.forEach(obj => {
                    if (obj.id == btn1.id) {
                        obj.isRead = true;
                    } 
                })
            }
        })
        cardBtns.appendChild(btn1);
        cardBtns.appendChild(btn2);
        cardContainer.appendChild(cardBtns);

        // Appending every child to the card and the card itself to the parent container `main`
        main.appendChild(cardContainer);

        // Incrementing the num to have a different `data-id` for every card
        num++;
 
        // Remove the card
        const removeBtns = document.querySelectorAll(".remove-button");
        removeBtns.forEach(btn => btn.addEventListener("click", (e) => {
            document.querySelector(`[data-id="${e.target.id}"]`).remove();
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == btn.id) {
                    myLibrary.status = "removed";
                }
            }
        }));
        modal.classList.remove("visible");
        form.reset();
    });
}


newBookBtn.addEventListener("click", addBookToLibrary);

// Close the modal by clicking on the button
closeBtn.addEventListener("click", () => {
    modal.classList.remove("visible");
});

// Close the modal by clicking anywhere outside of the modal container
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        modal.classList.remove("visible");
    }
});

