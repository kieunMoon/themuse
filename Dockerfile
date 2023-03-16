FROM    node  AS builder
RUN     mkdir /my-app
WORKDIR /my-app
COPY    . .
ARG     REST_API_SERVER_IP
ARG     REST_API_SERVER_PORT
RUN     echo REACT_APP_REST_API_SERVER_IP=$REST_API_SERVER_IP > .env
RUN     echo REACT_APP_REST_API_SERVER_PORT=$REST_API_SERVER_PORT >> .env
RUN     npm install
RUN     npm run build

FROM    nginx AS runtime
COPY    --from=builder /my-app/build/ /usr/share/nginx/html/
RUN     rm /etc/nginx/conf.d/default.conf
COPY    ./nginx.conf /etc/nginx/conf.d                    
CMD     ["nginx", "-g", "daemon off;"]