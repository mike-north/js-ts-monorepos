<p align='left'>
 <a href="00-intro.md">◀ Back: Intro</a>
</p>

---

# Yarn Workspaces

Yarn provides us with the lowest level of monorepo tooling, through Workspaces.

## Setting up workspaces

To go from our starting point code to a "yarn workspaces" enabled project, we need only add a `workspaces` field to our [`package.json`](../package.json)

```diff
  "repository": "git@github.com:mike-north/js-ts-monorepos.git",
  "author": "Mike North <michael.l.north@gmail.com>",
  "license": "BSD-2-Clause",
+ "private": true
+ "private": true,
+ "workspaces": [
+   "packages/*"
+ ],
```

You should also run

```sh
volta pin node yarn
```

which should result in another change being made to your [`package.json`](../package.json)

```diff
  "repository": "git@github.com:mike-north/js-ts-monorepos.git",
  "author": "Mike North <michael.l.north@gmail.com>",
  "license": "BSD-2-Clause",
  "private": true
  "private": true,
  "workspaces": [
    "packages/*"
+ ],
+ "volta": {
+   "node": "12.19.0",
+   "yarn": "1.22.10"
+ },
```

## Copying in our first two packages

In the [`COURSE_FILES/01-yarn-workspaces/`](../COURSE_FILES/01-yarn-workspaces/) folder, you should find a folder called `types`

Make a new folder [`/packages`](../packages)

```sh
mkdir packages
```

and copy the `types` folder into it, so you have something that looks kind of like

```
packages/
  types/
    src/
    tests/
```

[`types`](../packages/types) will become your first package: `@shlack/types`.

It needs a `package.json`, so create one

### [`types/package.json`](../packages/types/package.json)

```json
{
  "name": "@shlack/types",
  "version": "0.0.1",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "publishConfig": {
    "access": "public"
  },
  "scripts": {
    "build": "tsc -b ."
  },
  "devDependencies": {
    "typescript": "^4.0.3"
  }
}
```

This is a TypeScript project, so you'll need a `tsconfig.json`

### [`types/tsconfig.json`](../packages/types/tsconfig.json)

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "types": [],
    "sourceMap": true,
    "target": "ES2018",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

Finally run `yarn` to install and link dependencies, and then try to build the `@shlack/types` package from within its directory.

```sh
cd packages/types
yarn build
```

you should that a [`packages/types/dist`](../packages/types/dist) is created for you, and there are a few `.js` and `.d.ts` files within it (your build output)

---

<p align='right'>
 <a href="./02-composite-project.md">Next: Composite Projects ▶</a>
</p>
