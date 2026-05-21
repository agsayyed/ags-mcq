# Upstream Patch: agsayyed/ags-mcq

> **To:** ags-mcq module maintainer  
> **From:** ghafoorsblog.com project  
> **Date:** 2026-05-21  
> **Priority:** Medium — blocks site-wide primary colour customisation  
> **Status:** Patched locally via Hugo shadow override (see below)

---

## Problem

The `agsayyed/ags-mcq` Hugo module ships a SCSS variables file that assigns theme colours **without the `!default` flag**. This causes the
module's values to **always win** over any site-level primary colour configuration, regardless of where or how the site sets it.

### Affected file

`assets/hb/modules/agsayyed/scss/variables.tmpl.scss`

### Current content

```scss
$primary: #4299e1;

$btn-primary-bg: #4299e1;
$btn-primary-border: #4299e1;

$list-group-active-bg: #4299e1;
$list-group-active-border-color: #4299e1;
```

### Why this breaks HBStack theming

HBStack compiles SCSS in this order:

1. `@import "hugo:vars"` — injects `hb.styles.primary` from site params
2. `{{ range resources.Match "hb/modules/*/scss/variables.tmpl.scss" }}` — **loads all module variables files** in module-priority order
   (project → imported modules)
3. Bootstrap's own `_variables.scss` — uses `$theme-colors` map

Because your file omits `!default`, assignment `$primary: #4299e1` **always overwrites** whatever value was set in step 1 or by any earlier
module file (like the project's own `assets/hb/modules/custom/scss/variables.tmpl.scss`).

Downstream, this manifests as `--hb-primary: #4299e1` in the compiled CSS **no matter what** the site operator puts in their config.

---

## Fix Required

Add `!default` to every SCSS variable assignment:

```diff
- $primary: #4299e1;
+ $primary: #4299e1 !default;

- $btn-primary-bg: #4299e1;
- $btn-primary-border: #4299e1;
+ $btn-primary-bg: $primary !default;
+ $btn-primary-border: $primary !default;

- $list-group-active-bg: #4299e1;
- $list-group-active-border-color: #4299e1;
+ $list-group-active-bg: $primary !default;
+ $list-group-active-border-color: $primary !default;
```

### Why this is safe

SCSS `!default` means "assign only if this variable hasn't already been assigned". If no upstream value exists, the default (`#4299e1`)
applies — **behaviour is identical to today** for any site that doesn't set a custom primary. Sites that DO set a custom primary will
finally see their value respected.

Bonus: consider scoping module-specific colours to a local CSS custom property (e.g. `--ags-mcq-accent`) instead of reusing Bootstrap's
`$primary`. That would completely decouple the MCQ module's styling from the site's theme colour and eliminate the conflict entirely.

---

## Impact

| Site              | Without fix                         | With fix                    |
| ----------------- | ----------------------------------- | --------------------------- |
| No custom primary | Works fine (uses `#4299e1`)         | Works fine (uses `#4299e1`) |
| Custom primary    | **Broken** — always shows `#4299e1` | Works — shows custom colour |

---

## Local Workaround (in ghafoorsblog.com until upstream is patched)

Created `assets/hb/modules/ags-mcq/scss/variables.tmpl.scss` in the project. Hugo's union filesystem gives the project precedence over
module sources at identical virtual paths, so this file **completely replaces** the upstream file. It mirrors the upstream content with
`!default` added to every assignment.

**To remove the workaround after upstream is patched:**

```bash
go get github.com/agsayyed/ags-mcq@<new-tag>
rm -rf assets/hb/modules/ags-mcq/
npm run clean && npm run build:production-fast
```

---

## Verification

```bash
grep -oE '\-\-hb-primary:[^;]*' public/css/main.*.css
# Expected: <your-custom-colour>
# Without fix: #4299e1
```

---

## Implementation Record (2026-05-21)

### Issue recorded

- Site-level `hb.styles.primary` was being overridden by module-level `$primary` assignment in `variables.tmpl.scss`.

### Root cause

- Module SCSS variables were assigned without `!default`, so module values replaced upstream project/theme values during SCSS compilation.

### Solution applied

- Updated `assets/hb/modules/agsayyed/scss/variables.tmpl.scss`:
  - Added `!default` to variable assignments.
  - Set `$btn-primary-bg`, `$btn-primary-border`, `$list-group-active-bg`, and `$list-group-active-border-color` to derive from `$primary`
    with `!default`.

### Validation outcome

- Built in host test site (`host/ags-host`) after temporarily setting `hb.styles.primary: '#6610f2'`.
- Verified compiled CSS output contained `--hb-primary: #6610f2`.
- Reverted temporary host config test change after verification.
