const endCb = document.querySelectorAll(".end-cb");

endCb.forEach((checkbox) => {
  checkbox.addEventListener("change", async (e) => {
    const partyId = e.target.id;
    const isChecked = e.target.checked;
    if (isChecked) {
      try {
        const res = await fetch(`/${partyId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error("Failed to update party status");
        checkbox.disabled = true;
      } catch (err) {
        console.error(err);
      }
    }
  });
});
