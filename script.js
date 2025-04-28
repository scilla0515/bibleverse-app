// Set today's date
const dateElement = document.getElementById('date');
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElement.textContent = today.toLocaleDateString(undefined, options);

// Fetch a daily Bible verse
async function fetchVerse() {
  try {
    const response = await fetch('https://beta.ourmanna.com/api/v1/get/?format=json');
    const data = await response.json();
    const verseText = data.verse.details.text;
    const bookName = `${data.verse.details.reference}`;

    document.getElementById('verse').textContent = verseText;
    document.getElementById('book').textContent = bookName;
  } catch (error) {
    document.getElementById('verse').textContent = "Could not load verse. Please try again later.";
    console.error("Error fetching verse:", error);
  }
}

// Load the verse when page loads
fetchVerse();
