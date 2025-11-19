import { socket } from "./socket.js";

const partiesList = document.querySelector(".parties-list");
const partiesNumber = document.querySelector(".parties-content-number");

// Listen for new parties
socket.on("addedParty", (party) => {
  const div = document.createElement("div");
  div.className = "party-item";
  div.id = `${party.id}`;
  div.innerHTML = `
      <input class="end-cb" type="checkbox" id="${party.id}" name="${party.id}" value="${party.id}" />
      <label for="${party.id}">${party.name}</label> &emsp;
      <span class="delete-btn" itemid="${party.id}">X</span><br />
    `;
  // Attach delete event listener to the new party's delete button
  div
    .querySelector(`[itemid="${party.id}"]`)
    .addEventListener("click", async (e) => {
      if (e.target.hasAttribute("itemid")) {
        const partyId = e.target.getAttribute("itemid");

        try {
          const res = await fetch(`/${partyId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) throw new Error("Failed to delete party");

          const partyDiv = e.target.parentElement;
          partyDiv.remove();
        } catch (err) {
          console.error(err);
        }
      }
    });

  // attach end party event listener to the new party's checkbox
  const checkbox = div.querySelector(`[id="${party.id}"]`);
    checkbox.addEventListener("change", async (e) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        try {
          const res = await fetch(`/${party.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) throw new Error("Failed to update party status");
          checkbox.disabled = true;
        } catch (err) {
          console.error(err);
        }
      }
    });

  partiesList.appendChild(div);

  // Update total number of parties
  partiesNumber.textContent = Number.parseInt(partiesNumber.textContent) + 1;
});

// Listen for deleted parties
socket.on("deletedParty", (partyId) => {
  const partyItem = document.getElementById(partyId);
  if (partyItem) {
    // Update total number of parties
    if (document.getElementById(partyId).querySelector(".end-cb").disabled === false) {
      partiesNumber.textContent = Number.parseInt(partiesNumber.textContent) - 1;
    }
    partyItem.remove();
  }
});

// Listen for ended parties
socket.on("endedParty", (partyId) => {
  const partyItem = document.getElementById(partyId).querySelector(".end-cb");
  if (partyItem) {
    partyItem.disabled = true;
    partyItem.checked = true;
    partiesNumber.textContent = Number.parseInt(partiesNumber.textContent) - 1;
  }
});
