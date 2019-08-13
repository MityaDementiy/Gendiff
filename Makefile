install:
		npm install

publish:
		npm publish --dry-run

build:
		npm run build

start:
		npx babel-node -- src/bin/gendiff.js

lint:
		npx eslint .