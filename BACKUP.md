# Backup: monitoring WIP (2026-08-26)

Work-in-progress snapshot. Committed to a backup branch only — **not** merged into any feature branch.

## Summary

| Field | Value |
|---|---|
| Backup branch | `backup/monitoring-wip-2026-08-26` |
| Remote | `origin` (https://github.com/gambhirsharma/supabase-onfly.git) |
| Source branch | `monitoring` |
| Base commit (HEAD of `monitoring`) | `b6d4408` — `devOps(chart): monitoring [skip ci]` |
| Date created | 2026-08-26 |
| Status of `monitoring` after backup | Up to date with `origin/monitoring`; working tree cleaned (WIP lives only on the backup branch) |

## What is included

### Modified tracked files (vs `origin/monitoring`)

| File | Change |
|---|---|
| `charts/front-end/ingress-nginx.yaml` | ~30 lines changed (ingress-nginx config rework) |
| `charts/front-end/templates/ingress.yaml` | +5 lines |
| `entry.sh` | mode/permission change only (no content diff) |
| `helmfile.yaml` | 6 lines changed |
| `tailwind.config.ts` | 2 lines changed |
| `todo.md` | +4 lines |

### Untracked files (new, now committed here)

| File / dir | Notes |
|---|---|
| `charts/front-end/k8s-cert-issuer.yaml` | cert-issuer manifest |
| `k8s/kind-amd64.yaml` | kind cluster config |
| `k8s/learning.md` | notes |
| `pod-config.yaml` | pod config |

Also included for completeness (supabase CLI local state):
- `supabase/.branches/_current_branch`
- `supabase/.temp/cli-latest`

### Stash preserved

There was an existing stash that is **not** part of this branch's history, so it was pushed as its own ref so it cannot be lost:

- Stash message: `On main: fix(ci-cd): docker image name`
- Preserved as remote branch: `backup/stash-main-docker-image-name`
- Contents touched: `charts/front-end/values.yaml`, `helmfile.yaml`, `todo.md`

The stash still exists locally as well (`git stash list`).

## How to restore this work later

```bash
# Fetch the backup
git fetch origin

# Option A: continue working on it
git checkout backup/monitoring-wip-2026-08-26

# Option B: apply the WIP back onto monitoring without committing there
git checkout monitoring
git cherry-pick --no-commit backup/monitoring-wip-2026-08-26
# or: git restore --source=backup/monitoring-wip-2026-08-26 -- .

# Restore the stashed changes (if ever needed)
git stash apply backup/stash-main-docker-image-name
```

## Cleanup (only when work is fully done and merged)

```bash
git push origin --delete backup/monitoring-wip-2026-08-26
git push origin --delete backup/stash-main-docker-image-name
git branch -D backup/monitoring-wip-2026-08-26
```
