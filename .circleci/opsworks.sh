#!/usr/bin/env bash
aws opsworks --region "us-east-1" create-deployment --stack-id $1 --app-id $2 --command "{\"Name\":\"deploy\"}";
