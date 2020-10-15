<p align='left'>
 <a href="./05-lerna.md">◀ Back: Lerna</a>
</p>

---

# Scripty

Building on our theme of eliminating duplication, we need to do something about the `"scripts": {}` part of each `package/*/package.json`. Scripty allows us to implement these npm-scripts as files.

Let's install scripty as a workspace dependency

```sh
yarn add -WD scripty
```

There's a `scripts` folder in [`COURSE_FILES/06-scripty`](../COURSE_FILES/06-scripty) copy it into the project root.

> **These are `sh` scripts that can be run in any POSIX environment, so if you use windows, you'll need [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about) (recommended) or [Cigwyn](https://www.cygwin.com/) (if you're desperate).**

You'll need to make these scripts _executable_

```
chmod -R +x scripts
```

Update your _workspace_ [`package.json`](../package.json) with...

```diff
+ "scripts": {
+   "build": "scripty",
+   "test": "scripty",
+   "lint": "scripty",
+   "clean": "scripty"
+ },
+ "scripty": {
+   "path": "./scripts/workspace"
+ },
```

and each package's `package.json` with

```diff
  },
  "scripts": {
-   "lint": "eslint src --ext js,ts",
-   "clean": "rimraf dist",
-   "build": "tsc -b ."
+   "lint": "scripty",
+   "clean": "rimraf dist *.tsbuildinfo",
+   "build": "scripty",
+   "test": "scripty"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.12.0",
    "@babel/preset-typescript": "^7.12.0",
    "@types/jest": "^26.0.14",
    "jest": "^26.5.3",
    "typescript": "^4.0.3"
  },
+ "scripty": {
+   "path": "../../scripts/packages"
```

Look through everything in the `scripts/` folder -- nothing should be all that surprising in there.

At this point, you should be able to run things like

```sh
yarn build  # Build *all* packages
yarn test   # Run *all* tests
yarn lint   # Lint *all* packages
yarn clean  # Clean *everything*
```

All with centrally defined scripts that are applied to _each package_.

---

<p align='right'>
 <a href="./07-changelogs.md">Next: Changelogs ▶</a>
</p>
