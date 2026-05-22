// =========================
// GOOGLE FORM CONFIG
// =========================

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfsnWMJzX06pjepfO9MIWH6VFh36LhcXuygINcH8aSsPoG9BA/formResponse";

// =========================
// FORM SUBMIT
// =========================

const convertForm =
  document.getElementById("convertForm");

if (convertForm) {

  convertForm.addEventListener(
    "submit",
    function () {

      const submitBtn =
        document.getElementById("submitBtn");

      submitBtn.disabled = true;

      submitBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm"></span>
        Submitting...
      `;

    }
  );

}