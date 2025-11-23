# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

### Changed

- **BREAKING**: Repository renamed from `github.com/agsayyed/mcq` to `github.com/agsayyed/ags-mcq` for consistency
- Updated module path to `github.com/agsayyed/ags-mcq`
- Updated package.json repository URLs to reflect new naming convention
- Version bump to 0.3.0 for breaking changes

## [1.0.1] - 2023-10-10

### Added

- Initial release of the MCQ Hugo Module.
- Added support for embedding multiple choice questions in Hugo sites.
- Documentation for usage and installation.
