#Color Variables
magenta=$(tput setaf 5)
normal=$(tput sgr0)

#Step 1
#Build a LoopBack Project for Soap Service
soap_project_name_string=$(cat 'soapConfig.json' | jq '.projectName')
string_regex="s/\"//g"
soap_project_name=`echo $soap_project_name_string | sed $string_regex`
echo " "
printf "%40s\n" "${magenta}Generating a LB project for your SOAP Service : $soap_project_name. This may take a minute.${normal}"
lb $soap_project_name --config-file soapConfig.json

#Step 3
#Navigate to app folder
soap_directory=$(cat 'soapConfig.json' | jq '.dirName')
soap_directory_name=`echo $soap_directory | sed $string_regex`
cd $soap_directory_name/

#Step 4
#Create the Datasource Connection
soap_datasource_name_string=$(cat '../soapConfig.json' | jq '.datasource.name')
soap_datasource_name=`echo $soap_datasource_name_string | sed $string_regex`
echo " "
printf "%40s\n" "${magenta}Creating a LB soap datasource for your project : $soap_datasource_name. This may take a minute.${normal}"
lb datasource --config-file soapConfig.json

#Step 5
#Build the SOAP Interface
echo " "
printf "%40s\n" "${magenta}Building the resources for the SOAP service : $soap_datasource_name.${normal}"
lb soap --config-file soapConfig.json

#Step 6
#Generate Swagger
echo " "
printf "%40s\n" "${magenta}Building a swagger file for $soap_datasource_name. This will be placed in the root directory.${normal}"
lb export-api-def --o $soap_datasource_name.yml
mv $soap_datasource_name.yml ../

#Step 7
#Build a LoopBack Project for Rest Service
cd ../
rest_project_name_string=$(cat 'restConfig.json' | jq '.projectName')
string_regex="s/\"//g"
rest_project_name=`echo $rest_project_name_string | sed $string_regex`
echo " "
printf "%40s\n" "${magenta}Generating a LB project for your REST Service : $rest_project_name. This may take a minute.${normal}"
lb $rest_project_name --config-file restConfig.json

#Step 8
#Navigate to app folder
rest_directory=$(cat 'restConfig.json' | jq '.dirName')
rest_directory_name=`echo $rest_directory | sed $string_regex`
cd $rest_directory_name/

#Step 9
#Create the Mongo Datasource Connection
rest_datasource_name_string=$(cat '../restConfig.json' | jq '.datasource.name')
rest_datasource_name=`echo $rest_datasource_name_string | sed $string_regex`
echo " "
printf "%40s\n" "${magenta}Creating a LB MongoDB datasource for your project : $rest_datasource_name. This may take a minute.${normal}"
lb datasource --config-file restConfig.json

#Step 10
#Build the REST Endpoints from Swagger
echo " "
printf "%40s\n" "${magenta}Building the REST endpoints from the SOAP swagger definition file.${normal}"
lb swagger ../$soap_datasource_name.yml --config-file restConfig.json

#Step 11
#Move Applications into Applications Directory
echo " "
printf "%40s\n" "${magenta}Moving Applications into the Applications Directory.${normal}"
cd ../
mv $soap_directory_name/ applications/
mv $rest_directory_name/ applications/
sleep 5

#Step 11
#Move Dockerfiles into Applications
echo " "
printf "%40s\n" "${magenta}Moving Dockerfiles into the Correct Applications.${normal}"
mv docker/Dockerfile_soap applications/$soap_directory_name/Dockerfile
mv docker/.dockerignore_soap applications/$soap_directory_name/.dockerignore
mv docker/Dockerfile_mongo applications/$rest_directory_name/Dockerfile
mv docker/.dockerignore_mongo applications/$rest_directory_name/.dockerignore
mv docker/docker-compose.yml applications/$rest_directory_name/

sleep 1
rm docker/
