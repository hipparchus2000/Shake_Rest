#!/bin/bash

mkdir api/$1
cp -r api/template/* api/$1
mv api/$1/templateController.js api/$1/$1Controller.js
mv api/$1/templateModel.js api/$1/$1Model.js
mv api/$1/templateRoute.js api/$1/$1Route.js
sed -i -e 's/template/'"$1"'/g' api/$1/$1Controller.js
sed -i -e 's/template/'"$1"'/g' api/$1/$1Model.js
sed -i -e 's/template/'"$1"'/g' api/$1/$1Route.js
export capitialisedInitialVersion="$(echo "$1" | sed 's/.*/\u&/')"
sed -i -e 's/Template/'"$capitialisedInitialVersion"'/g' api/$1/$1Controller.js
sed -i -e 's/Template/'"$capitialisedInitialVersion"'/g' api/$1/$1Model.js
sed -i -e 's/Template/'"$capitialisedInitialVersion"'/g' api/$1/$1Route.js

echo "now copy and paste the template section of server.js. change the new block as appropriate taking care to match case used"
echo "and don't forget to edit your Model to reflect the properties of the new entity"

