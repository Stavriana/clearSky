# NTUA ECE SAAS 2025 PROJECT

# 🌤️ ClearSky — SaaS Εφαρμογή Διαχείρισης Βαθμολογιών & Αναθεωρήσεων

Το **ClearSky** είναι μια σύγχρονη SaaS web εφαρμογή για ιδρύματα τριτοβάθμιας εκπαίδευσης, που διευκολύνει τη διαδικασία **ανέβασμα βαθμολογιών**, **αίτηση αναθεώρησης** και **αποδοχή/απόρριψη** από πλευράς διδάσκοντα.

Η εφαρμογή έχει υλοποιηθεί με αρχιτεκτονική **microservices** και προσφέρει **διασύνδεση Google**, **φόρτωση Excel**, **credit σύστημα αιτήσεων** και **ενορχήστρωση μέσω orchestrator service**.

---

## 🧑‍💻 Τεχνολογίες

- 🔙 **Backend:** Node.js (Express), PostgreSQL
- 🌐 **Frontend:** React, TypeScript
- 📦 **Dockerized Microservices**: auth, credits, grades, institutions, reviews, orchestrator
- ⚙️ **API Communication:** RESTful APIs
- 🛠️ **CI/CD-ready & Containerized**

---

🛠️ Οδηγίες
Βεβαιώσου ότι το Docker Desktop είναι ανοιχτό και σε λειτουργία!!

Κάνε clone το αποθετήριο και μπες στον φάκελο του project:

git clone https://github.com/ntua/saas25-21.git
cd your-repo

Εκτέλεσε το κατάλληλο script ανάλογα με το λειτουργικό σύστημα σου:

🔵 macOS ή Linux:

bash terminal
./start.sh


🟦 Windows (PowerShell):

powershell terminal
.\start.ps1


Το script θα:

Μεταβεί στον φάκελο docker/

Κλείσει και καθαρίσει τυχόν προηγούμενα containers με docker-compose down -v

Εκκινήσει ξανά τα containers με docker-compose up -d

Περιμένει έως ότου το http://localhost:5173/login είναι διαθέσιμο

Ανοίξει αυτόματα την σελίδα στον browser
