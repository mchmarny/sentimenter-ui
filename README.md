# sentimenter-ui

This Single Page App (SPA) is build using only static content (html, css, javascript) deployed in Google Cloud Storage and fronted by SSL termination in Cloudflare. The logic of the `sentimenter` app is implemented in Google Cloud Functions.


## Demo

https://sentimenter.demome.tech/


## Setup Bucket

```shell
gsutil mb gs://sentimenter.demome.tech
```

## Access

```shell
gsutil iam ch allUsers:objectViewer gs://sentimenter.demome.tech
```

## Landing page

```shell
gsutil web set -m ./app/index.html gs://sentimenter.demome.tech
```

## Cross-domain

```shell
gsutil cors set ./app/cors-json-file.json gs://sentimenter.demome.tech
```

## Push App

```shell
gsutil -m rsync -r -d -x ".DS_Store" ./app/ gs://sentimenter.demome.tech
```




