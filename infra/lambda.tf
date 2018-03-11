resource "aws_lambda_function" "reindex" {
  function_name    = "${local.env}_${local.fn_name}"
  handler          = "handlers/reindex/handler.handler"
  runtime          = "nodejs6.10"
  role             = "${aws_iam_role.reindex.arn}"
  s3_bucket        = "${data.aws_s3_bucket.sls.id}"
  s3_key           = "${aws_s3_bucket_object.package.key}"
  source_code_hash = "${base64sha256(file(data.archive_file.reindex.output_path))}"
  memory_size      = 3008
  timeout          = 15

  tracing_config {
    mode = "Active"
  }

  environment {
    variables {
      ALGOLIA = 1
    }
  }
}

data "archive_file" "reindex" {
  type        = "zip"
  output_path = "./${local.fn_name}.zip"
  source_dir  = "../.build"
}

resource "aws_s3_bucket_object" "package" {
  bucket = "${data.aws_s3_bucket.sls.id}"
  key    = "tneu/news/package.zip"
  source = "${data.archive_file.reindex.output_path}"
  etag   = "${md5(file(data.archive_file.reindex.output_path))}"
}
