<p align='left'>
 <a href="./03-tests.md">◀ Back: Tests</a>
</p>

---

# Linting

We'll use [ESLint](https://eslint.org/) for linting, because it's able
to understand JS, TS, TSX and JSX equally well.

## Setting Up ESLint

In your [`COURSE_FILES/04-linting`](../COURSE_FILES/04-linting) folder, you should find an `.eslintrc` file. Copy it to the root of the project.

We'll have to install `eslint` and a few plugins now. We install these at the _workspace_ level.

```
yarn add -WD eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

and then each _package root (`packages/*`)_ gets its own "thin" `.eslintrc`

```json
{
  "extends": "../../.eslintrc",
  "parserOptions": {
    "project": "tsconfig.json"
  }
}
```

and a small tweak to _each package's `package.json`_

```diff
    "access": "public"
  },
  "scripts": {
+   "lint": "eslint src --ext js,ts",
    "clean": "rimraf dist",
```

you should now be able to go to each package root and run `yarn lint`

```sh
cd packages/types
yarn lint # run ESLint
```

If you know how to fix TypeScript errors, there are a few in the starter code for you to find and fix on your own.

---

<p align='right'>
 <a href="./05-lerna.md">Next: Lerna ▶</a>
</p>
