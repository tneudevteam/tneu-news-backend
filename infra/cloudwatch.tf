resource "aws_cloudwatch_log_group" "reindex" {
  name = "/aws/lambda/${aws_lambda_function.reindex.id}"
}
