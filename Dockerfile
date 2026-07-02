FROM nginx:alpine

# Configuração otimizada (gzip + cache) e arquivos do site
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

EXPOSE 80
