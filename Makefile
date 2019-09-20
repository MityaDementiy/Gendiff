install:
		npm install

publish:
		npm publish --dry-run

build:
		npm run build

test:
		npm test

startJson:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/before.json' './__tests__/__fixtures__/after.json'

startYaml:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/before.yml' './__tests__/__fixtures__/after.yml'

startini:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/before.ini' './__tests__/__fixtures__/after.ini'

startTree:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/beforeNested.json' './__tests__/__fixtures__/afterNested.json'

lint:
		npx eslint .