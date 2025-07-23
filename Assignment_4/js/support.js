const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");
const previewContainer = document.getElementById("previewContainer");
const previewContent = document.getElementById("previewContent");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

// Select all elements with the class 'counter'
const counters = document.querySelectorAll('.counter')

// Loop through each counter element
counters.forEach(counter => {
  // Start each counter at 0
  counter.innerText = '0'

  // Function to increment the counter gradually
  const updateCounter = () => {
    // Get the target number from the data-target attribute
    const target = +counter.getAttribute('data-target')
    // Get the current value of the counter (convert from string to number)
    const c = +counter.innerText

    // Calculate how much to increment by (adjust divisor to control speed)
    const increment = target / 175;

    // If the current value is less than the target, update it
    if (c < target) {
      // Increase the counter and round it up
      counter.innerText = `${Math.ceil(c + increment)}`
      // Call updateCounter again after 1 millisecond
      setTimeout(updateCounter, 1)
    } else {
      // Once the counter reaches the target, set it exactly to the target value
      counter.innerText = target
    }
  }

  // Start updating this counter
  updateCounter()
})

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const ticket = document.getElementById("ticket").value;
  const message = document.getElementById("message").value.trim();

  // Simple email validation
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    statusMsg.style.color = "red";
    statusMsg.textContent = "Please enter a valid email.";
    return;
  }

  // Show preview
  previewContent.innerHTML = `
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Ticket Enquiry:</strong> ${ticket}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  previewContainer.classList.remove("hidden");
  form.classList.add("hidden");
  statusMsg.textContent = "";
});

editBtn.addEventListener("click", () => {
  previewContainer.classList.add("hidden");
  form.classList.remove("hidden");
});

deleteBtn.addEventListener("click", () => {
  previewContainer.classList.add("hidden");
  form.reset();
  form.classList.remove("hidden");
  statusMsg.style.color = "red";
  statusMsg.textContent = "Submission cancelled. You can fill the form again.";
});
