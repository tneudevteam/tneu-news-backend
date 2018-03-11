data "aws_ssm_parameter" "algolia_client_id" {
  name = "/${local.env}/tneu/algolia/client_id"
}

data "aws_ssm_parameter" "algolia_client_secret" {
  name = "/${local.env}/tneu/algolia/client_secret"
}
