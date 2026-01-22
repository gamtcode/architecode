<?php
/**
 * Contact Form Processor
 * Handles incoming POST requests from the contact form and sends emails via PHP mail().
 */

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- Configuration ---
    $para = "contato@architecode.com"; 
    $remetente = "contato@architecode.com"; // Must match your domain to pass SPF/DKIM checks
    $assunto = "Novo Contato - Site Architecode";
    $url_redirect = "form.html";

    // --- Input Sanitization ---
    $nome = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email_visitante = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $telefone = filter_var(trim($_POST["telefone"]), FILTER_SANITIZE_STRING);
    $mensagem = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);

    if (empty($nome) || !filter_var($email_visitante, FILTER_VALIDATE_EMAIL) || empty($mensagem)) {
        http_response_code(400);
        echo "Por favor, preencha todos os campos obrigatórios.";
        exit;
    }

    // --- Email Body Composition ---
    $corpo_email = "Você recebeu uma nova mensagem do formulário de contato do site Architecode.\n\n";
    $corpo_email .= "------------------------------------------------------\n";
    $corpo_email .= "Nome do Remetente: $nome\n";
    $corpo_email .= "E-mail para Resposta: $email_visitante\n"; 
    $corpo_email .= "Telefone: $telefone\n";
    $corpo_email .= "------------------------------------------------------\n\n";
    $corpo_email .= "Mensagem:\n$mensagem\n";

    // --- Headers ---
    // 'From' uses our own domain to prevent spoofing flags.
    // 'Reply-To' ensures response goes back to the user.
    $headers = "From: $remetente\r\n"; 
    $headers .= "Reply-To: $email_visitante\r\n"; 
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (mail($para, $assunto, $corpo_email, $headers)) {
        header("Location: $url_redirect");
        exit;
    } else {
        http_response_code(500);
        echo "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.";
        exit;
    }

} else {
    http_response_code(403);
    echo "Acesso não autorizado.";
    exit;
}
?>