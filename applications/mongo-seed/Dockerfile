FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo --db test --collection periodic --type json --file /init.json --jsonArray
