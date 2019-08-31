install:
		npm install

publish:
		npm publish --dry-run

build:
		npm run build

test:
		npm test

startjson:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/before.json' './__tests__/__fixtures__/after.json'

startyaml:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/before.yml' './__tests__/__fixtures__/after.yml'

lint:
		npx eslint .