#DB SETUP
DB_ROOT_PASSWORD=$1
DB_PASSWORD=$2
SITE=$3
USER=$4

cat >>   $SITE-setup.sql << EOF
CREATE DATABASE ${SITE};
GRANT ALL PRIVILEGES ON ${SITE}.* TO '${USER}'@'localhost' identified by '${DB_PASSWORD}';
FLUSH PRIVILEGES;
EOF
mysql --user="root" --password="${DB_ROOT_PASSWORD}"  < $SITE-setup.sql
rm $SITE-setup.sql

#serve
cd public
port="7555"
python -c $'import SimpleHTTPServer;\nmap = SimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map;\nmap[""] = "text/plain";\nfor key, value in map.items():\n\tmap[key] = value + ";charset=UTF-8";\nSimpleHTTPServer.test();' "$port"

# migrate
php artisan migrate
php artisan migrate:refresh --seed
