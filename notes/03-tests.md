<p align='left'>
 <a href="./02-composite-project.md">◀ Back: Composite Projects</a>
</p>

---

# Tests

Jest is a great testing tool, and it's really simple to set up for use with JavaScript, TypeScript, React -- pretty much whatever you like. It's nice to have a test runner that can handle a wide range of applications, because it means we're less likely to outgrow it when we run into a new use case

Go to each of the subfolders of `packages/` and run

```sh
yarn add -D @babel/preset-env @babel/preset-typescript @types/jest jest
```

Jest uses babel to convert TS to JS, so we'll need to create a few babel config files.

### [`packages/.babelrc`](../packages/.babelrc)

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "10" } }],
    "@babel/preset-typescript"
  ]
}
```

### [`packages/types/.babelrc`](../packages/types/.babelrc)

```json
{
  "extends": "../.babelrc"
}
```

### [`packages/utils/.babelrc`](../packages/utils/.babelrc)

```json
{
  "extends": "../.babelrc"
}
```

Once again we're applying the pattern of "thin config files" that all extend from a more meaningful source of truth.

run `yarn` to install those new dependencies, and then from within your `packages/types` and `packages/utils` folder you should be able to run

```sh
yarn jest
```

and see your tests run.

Add a new "scripts" entry to each package's `package.json`, so that we can just run `yarn test` on any package and it'll do _whatever testing means for that package_.

````diff
```diff
@@ -7,6 +7,7 @@
     "access": "public"
   },
   "scripts": {
     "clean": "rimraf dist *.tsbuildinfo",
     "build": "tsc -b .",
+    "test": "jest",
   },
````

---

<p align='right'>
 <a href="./04-linting.md">Next: Linting ▶</a>
</p>
