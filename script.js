var verbs = [
  ["Base form", "Past tense", "Past participle", "Translation"],
  ["abide", "abode", "abode", "demeurer"],
  ["awake", "awoke", "awoken", "(se) réveiller, aussi awake/awoke/awoke"],
  ["be", "was/were", "been", "être"],
  ["bear", "bore", "borne", "porter/supporter/soutenir"],
  ["beat", "beat", "beaten", "battre"],
  ["become", "became", "become", "become"],
  ["beget", "begat", "begotten", "engendrer, aussi beget/begot/begotten"],
  ["begin", "began", "begun", "commencer"],
  ["bend", "bent", "bent", "se courber, etc."],
  ["bereave", "bereft", "bereft", "déposséder/priver"],
  ["bring", "brought", "brought", "apporter"],
  ["build", "built", "built", "construire"],
  ["burn", "burnt", "burnt", "brûler"],
  ["burst", "burst", "burst", "éclater"],
  ["buy", "bought", "", "acheter"],
  ["cast", "cast", "cast", "jeter, etc."],
  ["catch", "caught", "caught", "attraper"],
  ["chide", "chid", "chidden", "gronder/réprimander, aussi chide/chid/chid"],
  ["choose", "chose", "chosen", "choisir"],
  ["cleave", "cleft", "cleft", "fendre/coller, aussi cleave/clove/clove"],
  ["cling", "clung", "clung", "se cramponner"],
  ["come", "came", "come", "venir"],
  ["cost", "cost", "cost", "coûter"],
  ["creep", "crept", "crept", "ramper/se glisser/se hérisser"],
  ["crow", "crew", "crowed", "chanter (un coq)/jubiler"],
  ["cut", "cut", "cut", "couper"],
  ["deal", "dealt", "dealt", "distribuer/traiter"],
  ["dig", "dug", "dug", "bêcher"],
  ["do", "did", "", "faire"],
  ["draw", "drew", "drawn", "tirer/dessiner"],
  ["dream", "dreamt", "dreamt", "rêver"],
  ["drink", "drank", "drunk", "boire"],
  ["drive", "drove", "driven", "conduire"],
  ["dwell", "dwelt", "dwelt", "habiter/rester"],
  ["eat", "ate", "eaten", "manger"],
  ["fall", "fell", "fallen", "tomber"],
  ["feed", "fed", "fed", "nourrir"],
  ["feel", "felt", "felt", "(se) sentir"],
  ["fight", "fought", "fought", "combattre"],
  ["find", "found", "found", "trouver"],
  ["...", "...", "...", "..."],
];

document.addEventListener("DOMContentLoaded", function () {
  loadVerbs();
  document.getElementById("addVerb").addEventListener("click", addVerb);
  document.getElementById("findVerb").addEventListener("click", findVerb);

  const nextPaneBtn = document.getElementById("nextPane");
  const prevPaneBtn = document.getElementById("prevPane");
  
  nextPaneBtn.addEventListener("click", () => {
    if (nextPaneBtn.textContent === ">") {
      expandLeftPane();
    } else {
      resetPaneLayout();
    }
  });

  document.querySelectorAll(".links a").forEach((link) => {
    link.addEventListener("click", scrollToVerb);
  });
});

function loadVerbs() {
  const tbody = document.querySelector("#verbsTable tbody");
  tbody.innerHTML = ''; // Clear existing rows

  // Skip the header row and process verb data
  [
    ["abide", "abode", "abode", "demeurer"],
  ["awake", "awoke", "awoken", "(se) réveiller, aussi awake/awoke/awoke"],
  ["be", "was/were", "been", "être"],
  ["bear", "bore", "borne", "porter/supporter/soutenir"],
  ["beat", "beat", "beaten", "battre"],
  ["become", "became", "become", "become"],
  ["beget", "begat", "begotten", "engendrer, aussi beget/begot/begotten"],
  ["begin", "began", "begun", "commencer"],
  ["bend", "bent", "bent", "se courber, etc."],
  ["bereave", "bereft", "bereft", "déposséder/priver"],
  ["bring", "brought", "brought", "apporter"],
  ["build", "built", "built", "construire"],
  ["burn", "burnt", "burnt", "brûler"],
  ["burst", "burst", "burst", "éclater"],
  ["buy", "bought", "", "acheter"],
  ["cast", "cast", "cast", "jeter, etc."],
  ["catch", "caught", "caught", "attraper"],
  ["chide", "chid", "chidden", "gronder/réprimander, aussi chide/chid/chid"],
  ["choose", "chose", "chosen", "choisir"],
  ["cleave", "cleft", "cleft", "fendre/coller, aussi cleave/clove/clove"],
  ["cling", "clung", "clung", "se cramponner"],
  ["come", "came", "come", "venir"],
  ["cost", "cost", "cost", "coûter"],
  ["creep", "crept", "crept", "ramper/se glisser/se hérisser"],
  ["crow", "crew", "crowed", "chanter (un coq)/jubiler"],
  ["cut", "cut", "cut", "couper"],
  ["deal", "dealt", "dealt", "distribuer/traiter"],
  ["dig", "dug", "dug", "bêcher"],
  ["do", "did", "", "faire"],
  ["draw", "drew", "drawn", "tirer/dessiner"],
  ["dream", "dreamt", "dreamt", "rêver"],
  ["drink", "drank", "drunk", "boire"],
  ["drive", "drove", "driven", "conduire"],
  ["dwell", "dwelt", "dwelt", "habiter/rester"],
  ["eat", "ate", "eaten", "manger"],
  ["fall", "fell", "fallen", "tomber"],
  ["feed", "fed", "fed", "nourrir"],
  ["feel", "felt", "felt", "(se) sentir"],
  ["fight", "fought", "fought", "combattre"],
  ["find", "found", "found", "trouver"],
  ["...", "...", "...", "..."],
    
  ].forEach((verb) => {
    const row = document.createElement("tr");
    verb.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      row.appendChild(td);
    });
    const actionsTd = document.createElement("td");
    actionsTd.innerHTML = `
      <button onclick="editVerb(this)">Edit</button>
      <button onclick="updateVerb(this)">Update</button>
      <button onclick="deleteVerb(this)">Delete</button>
    `;
    row.appendChild(actionsTd);
    tbody.appendChild(row);
  });
  updateStatistics();
}

function addVerb() {
  const verbInput = document.getElementById("verb").value.trim();
  if (!verbInput) return;

  const newVerb = verbInput.split(",").map((item) => item.trim());
  if (newVerb.length < 4) {
    alert("Please provide all verb details.");
    return;
  }

  const tbody = document.querySelector("#verbsTable tbody");
  const row = document.createElement("tr");
  newVerb.forEach((cell) => {
    const td = document.createElement("td");
    td.textContent = cell;
    row.appendChild(td);
  });
  const actionsTd = document.createElement("td");
  actionsTd.innerHTML = `
    <button onclick="editVerb(this)">Edit</button>
    <button onclick="updateVerb(this)">Update</button>
    <button onclick="deleteVerb(this)">Delete</button>
  `;
  row.appendChild(actionsTd);
  tbody.appendChild(row);

  document.getElementById("verb").value = "";
  updateStatistics();
}

function findVerb() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const tbody = document.querySelector("#verbsTable tbody");
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    if (cells[0].textContent.toLowerCase().includes(searchTerm)) {
      row.scrollIntoView();
      row.style.color = "red";
    }
  });
}

function scrollToVerb(event) {
  event.preventDefault();
  const letter = event.target.dataset.letter;
  const tbody = document.querySelector("#verbsTable tbody");
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    if (row.cells[0].textContent.toLowerCase().startsWith(letter)) {
      row.scrollIntoView();
      row.style.color = "red";
    }
  });
}

function editVerb(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");
  const verbDetails = Array.from(cells)
    .slice(0, 4)
    .map((cell) => cell.textContent);

  const newDetails = prompt(
    "Edit verb details (Base form, Past tense, Past participle, Translation)",
    verbDetails.join(", ")
  );
  if (newDetails) {
    const updatedVerb = newDetails.split(",").map((item) => item.trim());
    if (updatedVerb.length === 4) {
      updatedVerb.forEach((detail, index) => {
        cells[index].textContent = detail;
      });
      updateStatistics();
    } else {
      alert("Please provide all verb details.");
    }
  }
}

function updateVerb(button) {
  editVerb(button);
}

function deleteVerb(button) {
  const row = button.closest("tr");
  row.remove();
  updateStatistics();
}

function updateStatistics() {
  const tbody = document.querySelector("#verbsTable tbody");
  const rows = tbody.querySelectorAll("tr");
  const stats = {};

  rows.forEach((row) => {
    const firstLetter = row.cells[0].textContent.charAt(0).toLowerCase();
    if (!stats[firstLetter]) {
      stats[firstLetter] = 0;
    }
    stats[firstLetter]++;
  });

  const statsText = Object.keys(stats)
    .map((letter) => `${letter} - ${stats[letter]}`)
    .join("  ");
  document.querySelector(
    "#statistics p"
  ).textContent = `Statistics: ${statsText}`;
}

function expandLeftPane() {
  const leftPane = document.querySelector(".left-pane");
  const rightPane = document.querySelector(".right-pane");
  const nextPaneBtn = document.getElementById("nextPane");

  // Store original widths if not already stored
  if (!leftPane.dataset.originalWidth) {
    leftPane.dataset.originalWidth = "60%";
    rightPane.dataset.originalWidth = "40%";
  }

  // Expand left pane to full width
  leftPane.style.width = "100%";
  rightPane.style.width = "0%";
  
  // Hide right pane content
  rightPane.style.display = "none";
  
  // Change button text
  nextPaneBtn.textContent = "<";
}

function resetPaneLayout() {
  const leftPane = document.querySelector(".left-pane");
  const rightPane = document.querySelector(".right-pane");
  const nextPaneBtn = document.getElementById("nextPane");

  // Reset to original layout
  leftPane.style.width = leftPane.dataset.originalWidth;
  rightPane.style.width = rightPane.dataset.originalWidth;
  
  // Show right pane content
  rightPane.style.display = "block";
  
  // Reset button text
  nextPaneBtn.textContent = ">";
}