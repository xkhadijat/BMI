document.addEventListener("DOMContentLoaded", function () {
    // handles form submission
    function submitForm(event) {
      event.preventDefault();
  
      const firstName = document.getElementById("name").value;
      const lastName = document.getElementById("name2").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
  
      // hold the form data
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Email:", email);
      console.log("Message:", message);
      console.log(
        `<a href="mailto:shilly@outllok.com?subject=${firstName} ${lastName}&body=${message}&from=${email}">go</a>`
      );
  
      document.getElementById("userform").reset();
    }
    document.getElementById("userform").addEventListener("submit", submitForm);
  });
  
  function showMessage() {
    alert(
      "Thank you for submitting your question. A representative from the team will reach out to you promptly."
    );
  }
  
  //Dr Stewart said "Not worry about trying to get it to email, since that is backend and we did not cover that in this class"//
  // do not delete this note, he said to leave it there.
  