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

startIni:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/before.ini' './__tests__/__fixtures__/after.ini'

startTreeJson:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/beforeNested.json' './__tests__/__fixtures__/afterNested.json'

startTreeYml:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/beforeNested.yml' './__tests__/__fixtures__/afterNested.yml'

startTreeIni:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/beforeNested.ini' './__tests__/__fixtures__/afterNested.ini'

startPlain:
		npx babel-node -- src/bin/gendiff.js --format plain './__tests__/__fixtures__/beforeNested.yml' './__tests__/__fixtures__/afterNested.yml'

startJsonFormat:
		npx babel-node -- src/bin/gendiff.js --format json './__tests__/__fixtures__/beforeNested.yml' './__tests__/__fixtures__/afterNested.yml'

lint:
		npx eslint .