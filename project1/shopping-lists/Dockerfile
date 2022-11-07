FROM denoland/deno:alpine-1.26.2

EXPOSE 7777

WORKDIR /app

COPY . .

RUN deno cache deps.js

CMD [ "run", "--allow-env", "--allow-net", "--allow-read", "--watch", "--reload", "app.js" ]
