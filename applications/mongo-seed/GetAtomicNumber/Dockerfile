FROM mongo

COPY GetAtomicNumber.json /GetAtomicNumber.json
CMD mongoimport --host mongo --db periodic --collection GetAtomicNumber --type json --file /GetAtomicNumber.json --jsonArray
