// Contact form
const form = document.querySelector("#contactForm");
const formStatus = document.querySelector("#form-status");

if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Check required fields
        if (!form.checkValidity()) {
            formStatus.textContent =
                "Please complete your name, email, and message.";

            formStatus.className = "form-status is-error";

            form.reportValidity();
            return;
        }

        // Show sending message
        formStatus.textContent = "Sending message...";
        formStatus.className = "form-status";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {

                // Clear the form ONLY after successful submission
                form.reset();

                formStatus.textContent =
                    "Thanks! Your message has been sent successfully.";

                formStatus.className =
                    "form-status is-success";

            } else {

                formStatus.textContent =
                    "Something went wrong. Please try again.";

                formStatus.className =
                    "form-status is-error";
            }

        } catch (error) {

            console.error("Form submission error:", error);

            formStatus.textContent =
                "Unable to send your message. Please try again.";

            formStatus.className =
                "form-status is-error";
        }
    });
}

