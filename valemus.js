// Mobile menu
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const navLinks = document.querySelectorAll(".nav-link");

// Open menu
menuOpenButton.addEventListener("click", () => {
    document.body.classList.add("show-mobile-menu");
});

// Close menu
menuCloseButton.addEventListener("click", () => {
    document.body.classList.remove("show-mobile-menu");
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
    reveals.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;
        if(sectionTop < triggerPoint){
            section.classList.add("active");
        }
    });
});



// ======================
// NAVBAR DROPDOWNS
// ======================

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {

    const toggle = dropdown.querySelector(".dropdown-toggle");

    // Only add the event listener if a toggle exists
    if (toggle) {

        toggle.addEventListener("click", function(e) {

            e.preventDefault();

            // Close every other dropdown
            dropdowns.forEach(item => {

                if (item !== dropdown) {
                    item.classList.remove("active");
                }

            });

            // Toggle current dropdown
            dropdown.classList.toggle("active");

        });

    }

});

// Close dropdown when clicking elsewhere
document.addEventListener("click", function(e) {

    dropdowns.forEach(dropdown => {

        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
        }

    });

});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const formData = {
        first_name: document.querySelector('input[name="first_name"]').value,
        last_name: document.querySelector('input[name="last_name"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        message: document.querySelector('textarea[name="message"]').value
    };

    try {

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {

            formStatus.textContent = "Message sent successfully!";

            contactForm.reset();

        } else {

            formStatus.textContent =
                result.message || "Something went wrong.";

        }

    } catch (error) {

        console.error("Error:", error);

        formStatus.textContent =
            "Unable to send message. Please try again.";

    }

});