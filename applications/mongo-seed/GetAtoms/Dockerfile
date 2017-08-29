FROM mongo

COPY GetAtoms.json /GetAtoms.json
CMD mongoimport --host mongo --db periodic --collection GetAtoms --type json --file /GetAtoms.json --jsonArray
