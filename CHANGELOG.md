# Changelog All notable changes to this project will be documented in this file

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-05-22

### BREAKING CHANGES

- **Asset namespace renamed** from `agsayyed` to `ags-mcq` to follow the `ags-markmap` convention. The Hugo module mount target was
  already `assets/hb/modules/ags-mcq` since v0.2.x, so consumers using `resources.Get "hb/modules/ags-mcq/..."` are unaffected. Only
  consumers that bypassed the mount and reached into the module's source directory directly need to update.
- **Shortcode renamed** from `{{< agsayyed/mcq ... >}}` to `{{< ags-mcq ... >}}` (flat namespace, matches `{{< ags-markmap >}}`).
  Consumers must update their content.
- **Partial renamed** from `partials/agsayyed/mcq.html` to `partials/ags-mcq/mcq.html`. Any custom layout that includes the partial via
  `{{ partial "agsayyed/mcq" . }}` must be updated to `{{ partial "ags-mcq/mcq" . }}`.

### Changed

- `config.toml` module mount source is now `assets/hb/modules/ags-mcq` (was `assets/hb/modules/agsayyed`); target unchanged.
- `tsconfig.json` upgraded — `target: es5` → `ES2020`, added `lib: ["ES2020", "DOM"]`, removed broken `outDir: "./public/js"`, added
  `noEmit: true` (ts-jest transforms in-memory).

### Migration

In consumer content, replace:

```diff
- {{< agsayyed/mcq "qa.mcq" >}}
+ {{< ags-mcq "qa.mcq" >}}
```

No go.mod / config change required on the consumer side; the module path (`github.com/agsayyed/ags-mcq`) is unchanged.

## [0.3.4] - 2026-05-21

### Fixed

- Silence `Logger.separator()` output in production by gating it on `environment === 'development'`.
- Default unknown `window.HUGO_ENVIRONMENT` to `'production'` (was `'unknown'`) and remove the
  `console.info('Environment is unknown, defaulting to production')` line so embedders that forget to inject the global stay silent in
  prod. A `console.debug` hint is still emitted when the environment is explicitly `'development'`.

### Notes

- Matches the logger convention already used by `ags-markmap` v0.4.x.

## [0.3.3] - 2026-05-21

### Fixed

- Respect site-level HB primary color overrides by changing module SCSS variables to `!default`.
- Updated primary-dependent variables to reference `$primary` so downstream theme configuration is applied consistently.

### Verified

- Built against host test site and confirmed compiled CSS `--hb-primary` follows host-configured `hb.styles.primary`.

## [0.3.2] - 2025-11-23

### Fixed

- Asset mounting conflict with other AGS modules
- Assets now correctly mounted to `hb/modules/ags-mcq/` instead of `hb/modules/agsayyed/`
- Prevents asset overwrites when used with ags-markmap or other AGS modules

### Changed

- Module mount target in config.toml: `assets/hb/modules/agsayyed` → `assets/hb/modules/ags-mcq`
- Asset structure now follows HBStack module naming conventions

### Added

- Documentation of asset mounting standards in MODULE_ASSET_STANDARDS.md

## [0.3.0] - 2025-08-16

### Changed - **BREAKING**

Repository renamed from `github.com/agsayyed/mcq` to `github.com/agsayyed/ags-mcq` for consistency - Updated module path to
`github.com/agsayyed/ags-mcq`

- Updated package.json repository URLs to reflect new naming convention - Version bump to 0.3.0 for breaking changes

## [1.0.1] - 2023-10-10

### Added - Initial release of the MCQ Hugo Module

- Added support for embedding multiple choice questions in Hugo sites.
- Documentation for usage and installation.
