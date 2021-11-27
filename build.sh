#!/bin/bash

version='0.0.2'

docker build -f Dockerfile . -t cognito-local:$version
docker tag cognito-local:$version sedhuait/cognito-local:$version
docker tag cognito-local:$version sedhuait/cognito-local:latest

docker push sedhuait/cognito-local:$version
docker push sedhuait/cognito-local:latest