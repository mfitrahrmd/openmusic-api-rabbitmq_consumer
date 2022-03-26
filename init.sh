echo -e "Creating .env file...."

echo -e "~~~Set Postgre Config Variable~~~"

read -p 'Postgre User : ' varpguser

read -sp 'Postgre Password : ' varpgpassword

echo

read -p 'Postgre Database : ' varpgdatabase

read -p 'Postgre Host(localhost) : ' varpghost
varpghost=${varpghost:-localhost}

read -p 'Postgre Port(5432) : ' varpgport
varpgport=${varpgport:-5432}


echo -e "~~~Set RabbitMQ config~~~"

read -p 'RabbitMQ Server(amqp://localhost) : ' varrabbitmqserver
varrabbitmqserver=${varrabbitmqserver:-amqp://localhost}

echo -e "~~~Set Mail Config~~~"

read -p 'Mail Host : ' varmailhost

read -p 'Mail Port : ' varmailport

read -p 'Mail Address : ' varmailaddress

read -sp 'Mail Password : ' varmailpassword

echo


cat <<EOF > ./.env
# Postgre Configuration
PGUSER=$varpguser
PGPASSWORD=$varpgpassword
PGDATABASE=$varpgdatabase
PGHOST=$varpghost
PGPORT=$varpgport

# RabbitMQ configuration
RABBITMQ_SERVER=$varrabbitmqserver

# Mail configuration
MAIL_HOST=$varmailhost
MAIL_PORT=$varmailport
MAIL_ADDRESS=$varmailaddress
MAIL_PASSWORD=$varmailpassword
EOF

echo -e "File created."

echo "Installing dependencies..."
npm install

echo "Lint code..."
npm run lint

echo "Done."
echo "'npm run start' to start project"

read -p "Press any key to continue ..."