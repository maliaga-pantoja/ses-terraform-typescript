data "local_file" "qr-notification-template" {
  filename = "${path.module}/templates/qr-notification/template.html"
}

resource "aws_ses_template" "qr-notification" {
  name = "qr-notification"
  subject = "saludos {{pepito}}"
  html = "${data.local_file.qr-notification-template.content}"
}