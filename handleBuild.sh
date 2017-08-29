#Color Variables
magenta=$(tput setaf 5)
normal=$(tput sgr0)

string_regex="s/\"//g"

soap_directory=$(cat 'soapConfig.json' | jq '.dirName')
soap_directory_name=`echo $soap_directory | sed $string_regex`
rest_directory=$(cat 'restConfig.json' | jq '.dirName')
rest_directory_name=`echo $rest_directory | sed $string_regex`

# Start up Kubernetes Cluster
printf "%40s\n" "${magenta}Starting up Kubernetes Cluster using Minikube${normal}"
minikube start

# Create the Docker Registry
printf "%40s\n" "${magenta}Creating the Docker Registry to Push Our Packages To${normal}"
kubectl apply -f manifests/registry.yml

printf "%40s\n" "${magenta}Waiting for Registry to Rollout${normal}"
kubectl rollout status deployments/registry

printf "%40s\n" "${magenta}Create Proxy for Docker to Push Images To${normal}"
docker stop socat-registry; docker rm socat-registry; docker run -d -e "REGIP=`minikube ip`" --name socat-registry -p 30400:5000 chadmoon/socat:latest bash -c "socat TCP4-LISTEN:5000,fork,reuseaddr TCP4:`minikube ip`:30400"

# Build Soap Container
cd applications/$soap_directory_name/
printf "%40s\n" "${magenta}Building Docker Container for the Soap Service${normal}"
docker build -t 127.0.0.1:30400/soap:latest .
sleep 5

# Push Soap Container to Registry
cd applications/$soap_directory_name/
printf "%40s\n" "${magenta}Pushing Docker Image for the Soap Service to the Registry${normal}"
docker push 127.0.0.1:30400/soap:latest

# Build Rest Container
cd ../$rest_directory_name/
printf "%40s\n" "${magenta}Building Docker Container for the Rest Service${normal}"
docker build -t 127.0.0.1:30400/rest:latest .
sleep 5

# Push Rest Container to Registry
printf "%40s\n" "${magenta}Pushing Docker Image for the Rest Service to the Registry${normal}"
docker push 127.0.0.1:30400/rest:latest

# Build Application Container
cd ../"application"/
printf "%40s\n" "${magenta}Building Docker Container for the Application Service${normal}"
docker build -t 127.0.0.1:30400/application:latest .
sleep 5

# Push Application Container to Registry
printf "%40s\n" "${magenta}Pushing Docker Image for the Application Service to the Registry${normal}"
docker push 127.0.0.1:30400/application:latest

# Build First Mongo Seed Container
cd ../"mongo-seed"/"GetAtomicNumber"/
printf "%40s\n" "${magenta}Building Docker Container for the Get Atomic Number Job${normal}"
docker build -t 127.0.0.1:30400/get-atomic-number:latest .
sleep 5

# Push First Mongo Seed Container to Registry
printf "%40s\n" "${magenta}Pushing Docker Image for the Get Atomic Number Job to the Registry${normal}"
docker push 127.0.0.1:30400/get-atomic-number:latest

# Build Second Mongo Seed Container
cd ../"GetAtomicWeight"/
printf "%40s\n" "${magenta}Building Docker Container for the Get Atomic Weight Job${normal}"
docker build -t 127.0.0.1:30400/get-atomic-weight:latest .
sleep 5

# Push Second Mongo Seed Container to Registry
printf "%40s\n" "${magenta}Pushing Docker Image for the Get Atomic Weight Job to the Registry${normal}"
docker push 127.0.0.1:30400/get-atomic-weight:latest

# Build Third Mongo Seed Container
cd ../"GetAtoms"/
printf "%40s\n" "${magenta}Building Docker Container for the Get Atoms Job${normal}"
docker build -t 127.0.0.1:30400/get-atoms:latest .
sleep 5

# Push Third Mongo Seed Container to Registry
printf "%40s\n" "${magenta}Pushing Docker Image for the Get Atoms Job to the Registry${normal}"
docker push 127.0.0.1:30400/get-atoms:latest

# Build Fourth Mongo Seed Container
cd ../"GetElementSymbol"/
printf "%40s\n" "${magenta}Building Docker Container for the Get Element Symbol Job${normal}"
docker build -t 127.0.0.1:30400/get-element-symbol:latest .
sleep 5

# Push Fourth Mongo Seed Container to Registry
printf "%40s\n" "${magenta}Pushing Docker Image for the Get Element Symbol Job to the Registry${normal}"
docker push 127.0.0.1:30400/get-element-symbol:latest

# All Images Pushed So We Can Shut Down the Proxy
printf "%40s\n" "${magenta}All Images Pushed So We Can Shut Down the Proxy${normal}"
docker stop socat-registry;

# Start Up the Pods for the Clusters
cd ../../../
printf "%40s\n" "${magenta}Starting Up Pods for the Application and MongoDB Services${normal}"
kubectl apply -f manifests/applications.yml

# Waiting for Pods to Start Up
printf "%40s\n" "${magenta}Wait for Pods to Start Up${normal}"
kubectl rollout status deployments/mongo
kubectl rollout status deployments/application-with-sidecars

# Seed Mongo DB
printf "%40s\n" "${magenta}Seeding MongoDB${normal}"
kubectl apply -f manifests/seedMongo.yml

# Check for Pods on the Minikube Dashboard
printf "%40s\n" "${magenta}Let's Open Up the Dashboard and Check that Our Pods Exist${normal}"
minikube dashboard

# Check for Pods on the Minikube Dashboard
printf "%40s\n" "${magenta}Let's Open Up the Application Service${normal}"
minikube service application
