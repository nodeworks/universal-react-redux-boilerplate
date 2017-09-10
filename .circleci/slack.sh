#!/usr/bin/env bash
curl -d "payload={\"username\":\"CircleCI\",\"text\":\"Tests have passed for commit $CIRCLE_SHA1 on branch $CIRCLE_BRANCH\"}" $1
