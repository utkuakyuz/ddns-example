# DDNS MASTER!

This repository contains an example implementation of a Domain Name System (DNS) using Docker. It demonstrates how to define custom domains so that are used in local networks.

## Prerequisites

You have to install Docker, and then have a familiarity of DNS configuraitons

## Create a Network

sudo docker network create --subnet=172.18.0.0/16 mynet

## Start Docker DNS Image

After creating the network, create / use a Bind9 image with custom configuration

<aside>
⚙ **named.conf**

```bash
options {

directory "/var/cache/bind";

recursion no;

allow-query { any; };

forwarders {

8.8.8.8;

8.8.4.4;

};

dnssec-validation auto;

auth-nxdomain no; # conform to RFC1035

listen-on-v6 { any; };

};

zone "test.mywebapp.biz" {

type master;

file "/etc/bind/zones/db.test.mywebapp.biz";

};
```

</aside>

### Zone File

<aside>
⚙ db.test.mywebapp.biz

```bash
$TTL 604800
@ IN SOA [ns1.mywebapp.biz](http://ns1.mywebapp.biz/). [admin.mywebapp.biz](http://admin.mywebapp.biz/). (
3 ; Serial
604800 ; Refresh
86400 ; Retry
2419200 ; Expire
604800 ) ; Negative Cache TTL
;
; name servers - NS records
IN NS [ns1.mywebapp.biz](http://ns1.mywebapp.biz/).

; name servers - A records
[ns1.mywebapp.biz](http://ns1.mywebapp.biz/). IN A 172.16.10.88
[ns1.nagoya-foundation.com](http://ns1.nagoya-foundation.com/). IN A 172.20.0.2

; other A records
[test.mywebapp.biz](http://test.mywebapp.biz/). IN A 172.16.10.88
[www.test.mywebapp.biz](http://www.test.mywebapp.biz/). IN A 172.16.10.88
```

</aside>

### DockerFile

<aside>

```bash
🐋 FROM ubuntu:20.04

RUN apt-get update && apt-get install -y bind9 bind9utils bind9-doc

COPY named.conf /etc/bind/named.conf
COPY [db.test.mywebapp.biz](http://db.test.mywebapp.biz/) /etc/bind/zones/db.test.mywebapp.biz

EXPOSE 53/udp
EXPOSE 53/tcp

CMD ["named", "-g"]

```

</aside>

Then build the dockerFile
`docker build -t custom-bind9 .`

Run this image as a container on created network
`docker run -d --name bind9 --net mynet --ip 172.18.0.2 custom-bind9`

You can test this by running a test container
`docker run -it --rm --net mynet busybox nslookup test.mywebapp.biz 172.18.0.2`

# Start the Ngnix Server

ATTACH YOUR COMPUTER TO DOCKER NETWORK DNS

sudo nano /etc/systemd/resolved.conf

[Resolve]
DNS=172.18.0.2

IF YOU HAVE ANY PROBLEM WITH CONTAINERS

```
`docker exec -it <mycontainer> bash`
```
