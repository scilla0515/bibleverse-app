// Set today's date
const dateElement = document.getElementById('date');
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElement.textContent = today.toLocaleDateString(undefined, options);

// Helper function to format date to YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function fetchVerse() {
  const todayKey = formatDate(new Date());

  // Check if verse for today is already in localStorage
  const cachedData = JSON.parse(localStorage.getItem('dailyVerse'));

  if (cachedData && cachedData.date === todayKey) {
    document.getElementById('verse').textContent = cachedData.verseText;
    document.getElementById('book').textContent = cachedData.bookName;
  } else {
    try {
      const response = await fetch('https://beta.ourmanna.com/api/v1/get/?format=json');
      const data = await response.json();
      const verseText = data.verse.details.text;
      const bookName = data.verse.details.reference;

      document.getElementById('verse').textContent = verseText;
      document.getElementById('book').textContent = bookName;

      // Save today's verse in localStorage
      localStorage.setItem('dailyVerse', JSON.stringify({
        date: todayKey,
        verseText,
        bookName
      }));
    } catch (error) {
      document.getElementById('verse').textContent = "Could not load verse. Please try again later.";
      console.error("Error fetching verse:", error);
    }
  }
}

// Load verse on page load
fetchVerse();
