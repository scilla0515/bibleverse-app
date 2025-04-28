async function fetchVerse() {
  try {
    const response = await fetch('https://labs.bible.org/api/?passage=random&type=json');
    const data = await response.json();
    const verse = data[0];
    document.getElementById('verse').innerText = `${verse.text} - ${verse.bookname} ${verse.chapter}:${verse.verse}`;
  } catch (error) {
    document.getElementById('verse').innerText = 'Failed to load verse. Please try again.';
    console.error(error);
  }
}

// Fetch verse when page loads
fetchVerse();
