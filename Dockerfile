FROM node:5-slim

MAINTAINER Scott Vickers <scott.w.vickers@gmail.com>

ENV GOSU_DOWNLOAD_SHA256 6f9a6f5d75e25ba3b5ec690a5c601140c43929c3fe565cea2687cc284a8aacc8
RUN wget -O gosu -nv --ca-directory=/etc/ssl/certs "https://github.com/tianon/gosu/releases/download/1.5/gosu-amd64" \
&& echo "$GOSU_DOWNLOAD_SHA256 *gosu" | sha256sum -c - \
&& chmod +x gosu

# create a layer for dependencies so they're cached
RUN mkdir -p /isomorphic_react
WORKDIR /isomorphic_react
COPY package.json package.json
RUN npm install

# copy the source and build
COPY . /isomorphic_react
RUN NODE_ENV=production npm run build

# add user and transfer ownership
RUN useradd -d /isomorphic_react scott \
	&& chown -R scott:scott /isomorphic_react \
	&& chmod -R g+rw /isomorphic_react

EXPOSE 7777

COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["npm", "start"]
