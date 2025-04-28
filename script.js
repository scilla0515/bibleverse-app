document.addEventListener("DOMContentLoaded", () => {
  // Set today's date
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').innerText = today.toLocaleDateString('en-US', options);

  // List of references to choose from (can grow this list)
  const verseReferences = [
    "Jeremiah 29:11",
    "Psalm 23:1",
    "Philippians 4:13",
    "Proverbs 3:5",
    "Isaiah 41:10",
    "Romans 8:28",
    "Matthew 5:14",
    "Joshua 1:9"
  ];

  // Pick a "daily" reference based on the day of the year
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const verseIndex = dayOfYear % verseReferences.length;
  const selectedReference = verseReferences[verseIndex];

  // Fetch from Bible API
  fetch(`https://bible-api.com/${encodeURIComponent(selectedReference)}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('verse').innerText = `"${data.text.trim()}"`;
      document.getElementById('book').innerText = `— ${data.reference}`;
    })
    .catch(error => {
      console.error('Error fetching verse:', error);
      document.getElementById('verse').innerText = "Unable to load verse. Please try again later.";
    });
});
