<p align='left'>
 <a href="00-intro.md">◀ Back: Intro</a>
</p>

---

# Yarn Workspaces

Yarn provides us with the lowest level of monorepo tooling, through Workspaces.

## Setting up workspaces

Let's create our initial yarn configuration and start setting it up for workspaces

```sh
yarn init
```

and provide the following answers (accepting the defaults for others)

- **name**: `"shlack"`
- **private**: `true`

Let's make sure that the same version of node and yarn is used by
the entire development team.

**Please make sure you have installed [`volta`](http://volta.sh/), and have closed and reopened your terminal**

```sh
volta pin node yarn
```

Open your newly created [`package.json`](/package.json) and make the following change
to tell `yarn` that packages can be found in the `packages/` folder, and include some devDependencies will be generally useful across our workspace

```diff
--- a/package.json
+++ b/package.json
@@ -4,5 +4,20 @@
   "main": "index.js",
   "repository": "git@github.com:mike-north/js-ts-monorepos.git",
   "author": "Mike North <michael.l.north@gmail.com>",
   "private": true,
-  "license": "MIT"
+  "license": "MIT",
+  "workspaces": [
+    "packages/*"
+  ],
+  "devDependencies": {
+    "@babel/plugin-proposal-class-properties": "^7.10.4",
+    "@babel/preset-env": "^7.11.5",
+    "@babel/preset-typescript": "^7.10.4",
+    "@types/jest": "^26.0.14",
+    "@typescript-eslint/eslint-plugin": "^4.4.1",
+    "@typescript-eslint/parser": "^4.4.1",
+    "eslint": "^7.11.0",
+    "jest": "^26.5.3",
+    "typescript": "^4.0.3"
+  }
 }
```

Create a boilerplate `.gitignore` file in the workspace root

```sh
npx gitignore node
```

and add the following extra lines to the bottom of [`.gitignore`](../.gitignore)

```
**/dist
```

## Preparing for packages

Create the `packages/` folder

```sh
mkdir packages
```

Some dev tools can be applied broadly across your _entire_ workspace,
and when this is possible, it's almost always a good idea to set things
up this way.

Create a [`/.prettierrc`](../.prettierrc) with content

```json
{
  "semi": true,
  "useTabs": false
}
```

There are also some "base" config files that our packages will refer to (keeping the package-specific files nice and thin)

`packages/.babelrc`

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "10" } }],
    "@babel/preset-typescript"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

`packages/tsconfig.packages.json`

```json
{
  "$schema": "http://json.schemastore.org/tsconfig",
  "compilerOptions": {
    "module": "CommonJS",
    "composite": true,
    "types": [],
    "target": "ES2018",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "declaration": true
  },
  "exclude": ["**/node_modules/**"]
}
```

`packages/.eslintrc`

```json
{
  "env": {
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "project": "tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "rules": { "prefer-const": "error" },
  "overrides": [
    {
      "files": ["packages/*/tests"],
      "env": { "jest": true, "node": true }
    }
  ]
}
```

## Our first package

Let's create our first package

```sh
mkdir packages/data
```

and create a `package.json` for it

```sh
touch packages/data/package.json
```

[`packages/data/package.json`](../packages/data/package.json) should look like

```json
{
  "name": "@shlack/data",
  "version": "0.0.1",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src --ext ts,js,tsx,jsx"
  },
  "engines": {
    "node": ">=10"
  }
}
```

Create three of the "thin" config files we promised

[`packages/data/tsconfig.json`](../packages/data/tsconfig.json)

```json
{
  "compilerOptions": {
    "composite": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "extends": "../tsconfig.packages.json"
}
```

[`packages/data/.eslintrc`](../packages/data/.eslintrc)

```json
{
  "extends": "../.eslintrc",
  "parserOptions": {
    "project": "tsconfig.json"
  }
}
```

[`packages/data/.babelrc`](../packages/data/.babelrc)

```json
{
  "extends": "../.babelrc"
}
```

And finally our source code
[`packages/data/src/index.ts`](../packages/data/src/index.ts)

```ts
/**
 * Calculate the sum of three numbers
 *
 * @param a - first number
 * @param b - second number
 * @param c - third number
 */
export function add(a: number, b: number, c: number) {
  if (a) {
    return a + b;
  }
}
```

This is some definitely suspicious code, but starting with something obviously broken is sometimes a good way to make sure that tools that should _detect problems_ are functioning properly.

Let's set up some testing for this module.

[`packages/data/tests/index.test.ts`](../packages/data/tests/index.test.ts)

```ts
import { add } from "../src";

describe("add() tests", function () {
  let x = 4;
  test("summation works properly", () => {
    expect(add(3, x, 5)).toBe(12);
  });
});
```

and one more tsconfig for the tests

[`packages/data/tests/tsconfig.json`](../packages/data/tests/tsconfig.json)

```json
{
  "references": [{ "path": ".." }],
  "compilerOptions": {
    "types": ["jest"],
    "baseUrl": "..",
    "noEmit": true,
    "paths": { "@shlack/data": [".."] }
  },
  "include": ["."]
}
```

Now from the root of your workspace, run

```
yarn install
```

Now, take a look at your `node_modules` folder, and you should see

```
node_modules/
  @shlack/
    data/
      package.json
```

We officially have a workspace with one package in it!

Let's make sure that everything works. Enter your package, and build it, lint your source and run your tests.

```sh
cd packages/data
yarn build
yarn lint
yarn test
```

You should see reasonable output

---

<p align='right'>
 <a href="./02-second-package.md">◀ Back: Our Second Package</a>
</p>
