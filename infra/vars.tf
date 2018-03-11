locals {
  env     = "dev"
  fn_name = "tneu_reindexNews"
}

data "aws_s3_bucket" "sls" {
  bucket = "vladholubiev-sls"
}
