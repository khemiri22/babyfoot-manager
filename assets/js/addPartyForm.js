const form = document.getElementById("new-party-form");
const input = document.getElementById("new-party-input");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); 
  const party_name = input.value.trim();
  if (!party_name) return;

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ party_name: party_name }),
    });

    if (!res.ok) throw new Error("Failed to add party");

    input.value = "";

  } catch (err) {
    console.error(err);
  }
});
