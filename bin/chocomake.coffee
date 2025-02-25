#!/bin/bash
if [ "$1" = "" ]; then
    echo "chocomake <project_name>"
else
    echo Creating new project $1...

    mkdir $1
    useradd $1
    usermod -d $PWD/$1 -s /bin/bash $1

    mkdir $1/client
    mkdir $1/general
    mkdir $1/server
    mkdir $1/data
    mkdir $1/static

    echo -e "exports.interface = () -> \n    ''" > $1/default.coffee
    echo {\"by\": {\"id\":{}, \"root\":[], \"Priority\":{}, \"Scope\":{}, \"Action\":{}, \"Intention\":{}, \"Wish\":{}, \"Need\":{}, \"Share\":{}}} > $1/data/newnotes_data.json
    openssl genrsa -out $1/data/privatekey.pem 1024
    openssl req -new -key $1/data/privatekey.pem -out $1/data/certrequest.csr
    openssl x509 -req -in $1/data/certrequest.csr -signkey $1/data/privatekey.pem -out $1/data/certificate.pem
    echo

    key=""
    while [ "$key" = "" ]; do
        read -s -p "Enter a master key (password) for your project, followed by [Enter]:"  key
        echo
        read -s -p "Enter it again, followed by [Enter]:"  verif_key
        echo
        if [ "$key" != "$verif_key" ]; then
            echo "Your password and confirmation password do not match"
            echo "Try again"
            key=""
        fi
        echo
    done

    hashed_key=`echo -n $key | sha256sum | cut -c1-64`
    echo "exports.sofkey = '$hashed_key'\nexports.debug = false # http://myserver:8081/debug?ws=myserver:8081&port=5858" > $1/data/config.coffee

    chown -R $1:$1 $1

    git init $1
    cd $1
    git add .
    git commit -m 'Initial commit'

    echo Done
fi
