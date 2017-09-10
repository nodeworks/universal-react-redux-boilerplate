#!/usr/bin/env bash
if [ -n "$1" ]; then
  aws opsworks --region "us-east-1" create-deployment --stack-id $1 --app-id $2 --command "{\"Name\":\"deploy\"}";
else
  echo "The environment variables have not been setup for AWS OpsWorks!"
fi
