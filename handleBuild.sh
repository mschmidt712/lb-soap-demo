#Color Variables
magenta=$(tput setaf 5)
normal=$(tput sgr0)

string_regex="s/\"//g"

soap_directory=$(cat 'soapConfig.json' | jq '.dirName')
soap_directory_name=`echo $soap_directory | sed $string_regex`
rest_directory=$(cat 'restConfig.json' | jq '.dirName')
rest_directory_name=`echo $rest_directory | sed $string_regex`

# Move Dockerfiles into correct directories
printf "%40s\n" "${magenta}Moving Dockerfiles into correct directories${normal}"
echo " "
mv Dockerfile_rest applications/$rest_directory_name/Dockerfile
mv Dockerfile_soap applications/$soap_directory_name/Dockerfile
mv docker-compose.yml applications/$rest_directory_name
sleep 5

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

# Build Mongo Seed Container
cd ../"mongo-seed"/
printf "%40s\n" "${magenta}Building Docker Container for the Mongo Seed Service${normal}"
docker build -t 127.0.0.1:30400/mongo-seed:latest .
sleep 5

# Push Mongo Seed Container to Registry
printf "%40s\n" "${magenta}Pushing Docker Image for the Mongo Seed Service to the Registry${normal}"
docker push 127.0.0.1:30400/mongo-seed:latest

# All Images Pushed So We Can Shut Down the Proxy
printf "%40s\n" "${magenta}All Images Pushed So We Can Shut Down the Proxy${normal}"
docker stop socat-registry;

# Start Up the Pods for the Clusters
cd ../../
printf "%40s\n" "${magenta}Starting Up Pods for the Rest, Soap, and MongoDB Services${normal}"
kubectl apply -f manifests/soap.yml
kubectl apply -f manifests/rest.yml

# Waiting for Pods to Start Up
printf "%40s\n" "${magenta}Wait for Pods to Start Up${normal}"
kubectl rollout status deployments/soap
kubectl rollout status deployments/rest
kubectl rollout status deployments/mongo

# Check for Pods on the Minikube Dashboard
printf "%40s\n" "${magenta}Let's Open Up the Dashboard and Check that Our Pods Exist${normal}"
minikube dashboard
