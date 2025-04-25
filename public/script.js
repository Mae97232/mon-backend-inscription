document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("emailForm");
    const resultat = document.getElementById("resultat");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const to = document.getElementById("to").value;
      const subject = document.getElementById("subject").value;
      const text = document.getElementById("text").value;
  
      try {
        const response = await fetch("/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ to, subject, text })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          resultat.textContent = "✅ Email envoyé avec succès !";
          resultat.style.color = "green";
          form.reset();
        } else {
          resultat.textContent = "❌ Erreur lors de l'envoi : " + data.error;
          resultat.style.color = "red";
        }
      } catch (error) {
        console.error("Erreur :", error);
        resultat.textContent = "❌ Une erreur est survenue.";
        resultat.style.color = "red";
      }
    });
  });