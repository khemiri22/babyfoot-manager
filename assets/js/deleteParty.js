const deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", async (e) => {
    if (e.target.hasAttribute("itemid")) {
      const partyId = e.target.getAttribute("itemid");

      try {
        const res = await fetch(`/${partyId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) throw new Error("Failed to delete party");

        const partyDiv = e.target.parentElement;
        partyDiv.remove();
      } catch (err) {
        console.error(err);
      }
    }
  });
});
