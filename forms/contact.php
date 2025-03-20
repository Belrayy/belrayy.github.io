<?php

//wip

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    $errors = [];
    if (empty($name)) {
        $errors[] = "Name is required.";
    }
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    if (empty($subject)) {
        $errors[] = "Subject is required.";
    }
    if (empty($message)) {
        $errors[] = "Message is required.";
    }

    if (empty($errors)) {
        $to = "your-email@example.com";

        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Subject: $subject\n\n";
        $email_content .= "Message:\n$message\n";

        if (mail($to, $subject, $email_content, $headers)) {
            echo json_encode(["status" => "success", "message" => "Your message has been sent. Thank you!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Unable to send message. Please try again later."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => implode("<br>", $errors)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>