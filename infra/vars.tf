locals {
  env     = "dev"
  fn_name = "tneu_reindexNews"
}

data "aws_s3_bucket" "tf_state" {
  bucket   = "vladholubiev-tf-state"
  provider = "aws.eu_central_1"
}
