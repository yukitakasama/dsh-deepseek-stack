# dsh-deepseek-stack

An open-source DeepSeek Harness plugin that exposes the upstream
[`aicodeking/deepseek-stack`](https://github.com/aicodeking/deepseek-stack)
skills through DSH's official skill registry and model-facing `skill` tool.

## What it does

The plugin mounts the bundled `skills/` directory with
`@deepseek-ai/dsh-skill-filesystem`. DSH discovers each direct
`<name>/SKILL.md` bundle, shows its frontmatter description in the session
skill catalog, and loads the full instructions on demand.

The upstream skill text is shipped as-is in this public plugin. Personal
policy adaptations belong in a separate downstream pack overlay and are not
part of this repository.

## Install

Install this package as a DSH profile bundle:

```bash
pnpm add dsh-deepseek-stack
```

The host must provide the DSH 0.2.2 skill registry packages declared in
`peerDependencies`.

## Upstream and license

See [UPSTREAM.md](UPSTREAM.md) for the exact source commit and synchronization
notes. The upstream project is MIT licensed; this adapter is also MIT licensed.
