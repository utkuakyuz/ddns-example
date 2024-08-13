FROM ubuntu:20.04

RUN apt-get update && apt-get install -y bind9 bind9utils bind9-doc

COPY named.conf /etc/bind/named.conf
COPY named.conf.options /etc/bind/named.conf.options
COPY named.conf.local /etc/bind/named.conf.local
COPY db.test.mywebapp.biz /etc/bind/zones/db.test.mywebapp.biz

EXPOSE 53/udp
EXPOSE 53/tcp

CMD ["named", "-g"]
