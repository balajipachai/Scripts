`sudo ufw app list` 

```
You should get a listing of the application profiles:

Output
Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```

-  Nginx Full: This profile opens both port 80 (normal, unencrypted web traffic)  and port 443 (TLS/SSL encrypted traffic)
- Nginx HTTP: This profile opens only port 80 (normal, unencrypted web traffic)
- Nginx HTTPS: This profile opens only port 443 (TLS/SSL encrypted traffic)
Note:

- By default this script enables HTTP access for Nginx, if you want to change it, you can edit line number 8 in the script.

`sudo ufw status`

```
Output
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```

`systemctl status nginx`

```
Output
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

`{{ directory_name }}` : Name of the directory, you want to create.

`Add the below content in the file that would be created in step 4`

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/{{directory_name}};
        index index.html index.htm index.nginx-debian.html;

        server_name IP DOMAIN_NAME;

        location / {
                try_files $uri $uri/ =404;
        }
}

There should be a space between IP and the DOMAIN_NAME.
Both should be added to this file
```

`Create a symbolic link`

`sudo ln -s /etc/nginx/sites-available/{{directory_name}} /etc/nginx/sites-enabled/`


`Step 6 opens u the nginx configuration file`

Find the server_names_hash_bucket_size directive and remove the # symbol to uncomment the line:

```
...
http {
    ...
    server_names_hash_bucket_size 64;
    ...
}
...
```

`sudo nginx -t` To test the nginx configuration

This will configure nginx and your application will be available via HTTP, to add HTTPS please execute `certbot/installUbuntu.sh`

Reference:

- The README and the script is a by product of [How To Install Nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)


