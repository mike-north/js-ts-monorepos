#!/usr/bin/env bash
echo "┏━━━ 📚 API DOCS: Extracting API surface ━━━━━━━━━━━━━━"
yarn clean
yarn tsc -b packages
yarn lerna run api-report;
echo "┏━━━ 📝 API DOCS: Generating Markdown Docs ━━━━━━━━━━━━"
GH_PAGES_CFG_EXISTS=$(test -f docs/_config.yml)
if [ $GH_PAGES_CFG_EXISTS ]
then
  echo "GitHub pages config file DETECTED"
  cp docs/_config.yml .
fi

yarn api-documenter markdown -i temp -o docs

if [ $GH_PAGES_CFG_EXISTS ]
then
  cp _config.yml docs/_config.yml
fi
