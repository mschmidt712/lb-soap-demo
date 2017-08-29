FROM mongo

COPY GetAtomicWeight.json /GetAtomicWeight.json
CMD mongoimport --host mongo --db periodic --collection GetAtomicWeight --type json --file /GetAtomicWeight.json --jsonArray
