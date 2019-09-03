#!/usr/bin/env sh

# abort on errors
set -e


# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:dotunaj/vue-quiz-app.git master:gh-pages

cd -