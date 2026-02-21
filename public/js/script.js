(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // Always prevent default first
        event.preventDefault();
        event.stopPropagation();
        // Only submit if valid
        if (form.checkValidity()) {
          form.submit(); // manually submit
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
