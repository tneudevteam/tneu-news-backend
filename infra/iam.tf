data "aws_iam_policy_document" "reindex" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = [
      "${aws_cloudwatch_log_group.reindex.arn}",
    ]
  }

  statement {
    effect = "Allow"

    actions = [
      "xray:PutTraceSegments",
      "xray:PutTelemetryRecords",
    ]

    resources = [
      "*",
    ]
  }
}

resource "aws_iam_role" "reindex" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "reindex" {
  role   = "${aws_iam_role.reindex.name}"
  policy = "${data.aws_iam_policy_document.reindex.json}"
}
