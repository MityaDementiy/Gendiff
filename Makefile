install:
		npm install

publish:
		npm publish --dry-run

build:
		npm run build

test:
		npm test -- --watch

start:
		npx babel-node -- src/bin/gendiff.js './__tests__/__fixtures__/before.json' './__tests__/__fixtures__/after.json'

lint:
		npx eslint .