FROM mongo

COPY GetElementSymbol.json /GetElementSymbol.json
CMD mongoimport --host mongo --db periodic --collection GetElementSymbol --type json --file /GetElementSymbol.json --jsonArray
