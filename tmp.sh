# dist folder
mkdir dist
cd dist
touch index.html
cd ..

#// src folder
mkdir src
cd src
mkdir pages
mkdir styles
touch index.js
cd pages
touch Home.js
cd ..
cd styles
touch global.scss
cd ..
cd ..

#// root files
touch .swcrc
touch webpack.config.js