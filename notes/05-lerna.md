<p align='left'>
 <a href="./04-linting.md">◀ Back: Linting</a>
</p>

---

# Lerna

It may feel like we're doing a _lot_ of per-package work, even with just two packages. Imagine how much worse this gets when you have 10 or 100 packages!

Lerna is designed to make this much easier.

Let's begin by adding it as a workspace dependency

```sh
yarn add -WD lerna
```

and creating a `lerna.json` config file at the root of our project

```json
{
  "packages": ["packages/*"],
  "npmClient": "yarn",
  "version": "0.0.1",
  "useWorkspaces": true,
  "nohoist": ["parcel-bundler"]
}
```

Finally, run

```sh
lerna bootstrap
```

If we had dependencies between our existing packages (we do not, yet), this would take care of "linking" everything up.

Look in `packages/types/node_modules`. See anything interesting?

Lerna can do a lot for us, but we'll start with one of the most useful aspects of the tool: running a command _in each_ package.

```sh
# Go to each package and run `yarn test`
lerna run test
# Go to each package and run `yarn lint`
lerna run lint
```

Check out `lerna --help` to get a preview of what else Lerna can do.

---

<p align='right'>
 <a href="./06-scripty.md">Next: Scripty ▶</a>
</p>
