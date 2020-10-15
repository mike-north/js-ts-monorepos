<p align='left'>
 <a href="./01-yarn-workspaces.md">◀ Back: Yarn Workspaces</a>
</p>

---

# Composite Project

TypeScript supports the concept of several sub-projects that _refer_ to eachother's build output. This will make the most frequently-performed tasks much faster (i.e., an incremental build) so it's in our interest to set this up.

## A second package

Before we do this, we need another package, so that we have a few things that can refer to each other.

in your [`COURSE_FILES/02-second-package/`](../COURSE_FILES/02-second-package/) folder, you should find a `utils/` subfolder. Copy this into the project's [`packages/`](../packages/) folder so you have something like

```
packages/
  types/
    src/
    tests/
  utils/
    src/
    tests/
```

This new `@shlack/utils` package will need a `package.json`, so let's create one

### [`packages/utils/package.json`](../packages/utils/package.json)

```json
{
  "name": "@shlack/utils",
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
    "@types/date-fns": "^2.6.0",
    "@types/react": "^16.9.52",
    "typescript": "^4.0.3"
  },
  "dependencies": {
    "date-fns": "^2.16.1",
    "react": "^16.14.0"
  }
}
```

we'll need a `tsconfig.json` as well, and it'll be almost _exactly_ the same as the one for our `@shlack/types` package from the last step. Repetition is annoying (and an "out of sync" bug waiting to happen), so let's set up one _meaningful_ tsconfig, and extend from it in multiple places.

### [`packages/tsconfig.settings.json`](../packages/tsconfig.settings.json)

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
    "declaration": true
  }
}
```

and then create a `utils/package.json`

```json
{
  "extends": "../tsconfig.settings.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

and then update your `types/package.json` so that it exactly matches

```diff
@@ -1,14 +1,7 @@
 {
+  "extends": "../tsconfig.settings.json",
   "compilerOptions": {
-    "module": "CommonJS",
-    "types": [],
-    "sourceMap": true,
-    "target": "ES2018",
-    "strict": true,
-    "noUnusedLocals": true,
-    "noUnusedParameters": true,
-    "noImplicitReturns": true,
-    "declaration": true,
+    "composite": true,
     "outDir": "dist",
     "rootDir": "src"
```

Finally create a [`packages/tsconfig.json`](../packages/tsconfig.json) that _refers_ to each package

```json
{
  "files": [],
  "references": [{ "path": "utils" }, { "path": "types" }]
}
```

try running this from the root of your project now

```sh
yarn tsc -b packages
```

both `types` and `utils` should build!

## Squeaky Clean

Each package we create will put its build output in its own folder, so we should set ourselves up for an easy way to destroy it and "build again from scratch".

We can install a _workspace_ dependency (at the root of the project, not a dependency of any package) to handle this in a platform-independent way:

```sh
yarn -WD rimraf
```

Then, go to `types/package.json` and `utils.package.json` and make this small change

```diff
@@ -7,6 +7,7 @@
     "access": "public"
   },
   "scripts": {
+    "clean": "rimraf dist *.tsbuildinfo",
     "build": "tsc -b ."
   },
```

Now, we can go to either of these projects and run `yarn clean` to delete build output, and `yarn build` to make a fresh build

---

<p align='right'>
 <a href="./03-tests.md">Next: Tests ▶</a>
</p>
