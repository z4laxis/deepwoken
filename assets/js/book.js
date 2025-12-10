const fetchBook = async (name, page = 1) => {
    const url = "/assets/json/books.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch the JSON file.");
        }
        const books = await response.json();

        const tome = books.find(book => book.name === name);

        if (tome) {
            document.querySelector(".book-title").textContent = tome.name;
            document.querySelector(".book-flavour").textContent = tome.flavour;

            const bookContainer = document.querySelector(".book-container");
            const originalPage = document.querySelector(".book-content");

            document.querySelectorAll(".book-content").forEach(el => el.remove());

            tome.pages.forEach((pageContent, index) => {
                let newPage = originalPage.cloneNode(true);
                newPage.id = `page-number-${index + 1}`;
                
                newPage.innerHTML = pageContent.replace(/\n/g, "<br>");

                if (index + 1 !== page) newPage.style.display = "none"; 

                bookContainer.insertBefore(newPage, document.querySelector(".page-number"));
            });
            
            const totalPages = tome.pages.length;
            let currentPage = page; 
            
            const pageNumberElement = document.querySelector(".page-number");
            const leftArrow = document.querySelector(".arrow-left");
            const rightArrow = document.querySelector(".arrow-right");

            pageNumberElement.textContent = `${currentPage}/${totalPages}`;

            leftArrow.hidden = currentPage === 1;
            rightArrow.hidden = currentPage === totalPages;

            rightArrow.addEventListener("click", () => {
                if (currentPage < totalPages) {
                    document.getElementById(`page-number-${currentPage}`).style.display = "none";
                    currentPage++;
                    document.getElementById(`page-number-${currentPage}`).style.display = "block";
                    pageNumberElement.textContent = `${currentPage}/${totalPages}`;
                }

                leftArrow.hidden = currentPage === 1;
                rightArrow.hidden = currentPage === totalPages;
            });

            leftArrow.addEventListener("click", () => {
                if (currentPage > 1) {
                    document.getElementById(`page-number-${currentPage}`).style.display = "none";
                    currentPage--;
                    document.getElementById(`page-number-${currentPage}`).style.display = "block";
                    pageNumberElement.textContent = `${currentPage}/${totalPages}`;
                }

                leftArrow.hidden = currentPage === 1;
                rightArrow.hidden = currentPage === totalPages;
            });

        } else {
            console.log("Book not found.");
        }
    } catch (error) {
        console.error(error.message);
    }
};

const urlParams = new URLSearchParams(window.location.search);
const book = urlParams.get("query");
const page = parseInt(urlParams.get("page"), 10) || 1;

if (book) {
    fetchBook(book, page);
}