# sentimenter-ui

This Single Page App (SPA) is build using only static content (html, css, javascript) deployed in Google Cloud Storage (GCS) and fronted by SSL termination in Cloudflare. Additionally, all the logic of the [sentimenter](https://github.com/mchmarny/sentimenter/) app is implemented in Google Cloud Functions.


## Demo

https://sentimenter.demome.tech/

> Note, this live demo is throtled to 1,000 invokations a day

## Setup

TO setup `sentimenter` on GCP you will need [gsutil](https://cloud.google.com/storage/docs/gsutil), free command-line tool for Google Cloud Storage. You can use this tool to perform many common tasks.

### DNS

Create a CNAME entry in your DNS server to point to GCS

NAME           TYPE     DATA
cm.thingz.io   CNAME    c.storage.googleapis.com.

### GCS Bucket

The bucket name has to be globally unique so use the name of the domain which you will use to host your UI under.

```shell
gsutil mb gs://cm.thingz.io
```

### GCS Access

Make the bucket publically accesable (this is a 'world-wide' part of Web)

```shell
gsutil iam ch allUsers:objectViewer gs://cm.thingz.io
```

### GCS Landing page

Designate the `index.html` as a default page in your web site

```shell
gsutil web set -m ./app/index.html gs://cm.thingz.io
```

### GCS Cross-domain

If you are planning building client app and need to integrate with services that are not under the same domain (different “origin”) you will need to set up CORS.

```shell
gsutil cors set ./app/cors-json-file.json gs://cm.thingz.io
```

On the GCF side, you will need to add the `Access-Control-Allow-Origin` header.

```shell
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
```

> Note, if you know the fully qualified host name where the requests are going to originate from you may wanna set more explicit `Access-Control-Allow-Origin` value

## Push app to GCS

As you make changes in the code, you will want to sync your local dev environment with the content of GCS bucket. `gsutil` extends the tried and tested Linux utility, `rsync` so to sync GCS bucket with your local folder, just run this command.

```shell
gsutil -m rsync -r -d -x ".DS_Store" ./app/ gs://cm.thingz.io
```

> In this example, we exclude mac meta files (e.g. `.DS_Store`). If you are on a different platform or just want to exclude different files you can provide multiple `-x` arguments

## SSL Termination

In my demo I've used Cloudflare's free SSL termination service to provide TLS encryption to the HTTP serving GCS endpoint. For a nominal fee, you can also used the GCP Load Balance to accomplish the same using all-GCP solution.




