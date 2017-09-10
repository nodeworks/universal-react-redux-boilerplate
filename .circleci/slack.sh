#!/usr/bin/env bash
curl -d "payload={\"username\":\"deploy\",\"text\":\"start: $CIRCLE_BRANCH $CIRCLE_SHA1\"}" $1
