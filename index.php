<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];
    $textarea = $_POST['message'];
    // Récupérez les autres champs du formulaire de la même manière

    // Construire le corps du message
    $message = "Nom: $nom\n";
    $message .= "Prénom: $prenom\n";
    $message .= "Email: $email\n";
    $message .= "Message: $textarea\n";
    // Ajoutez les autres champs au corps du message

    // Stocker les informations dans un fichier texte
    $fichier = 'informations.txt'; // Nom du fichier texte où vous souhaitez stocker les informations

    if (file_put_contents($fichier, $message, FILE_APPEND | LOCK_EX) !== false) {
        echo '<script>history.back();</script>';
        echo '<script>alert("Les informations ont été envoyés avec succès");</script>';
    } else {
        echo 'Une erreur s\'est produite lors de l\'enregistrement des informations.';
    }
}
?>