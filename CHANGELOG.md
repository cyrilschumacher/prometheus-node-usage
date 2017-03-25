# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [0.3.0] - 2017-03-25

### Added
- Add metrics for disk I/O;

### Changed
- Update webservice: metrics are only returned from `/metrics` path;

## [0.2.1] - 2017-03-24

### Added
- Return the `listen` function result;

### Fixed
- Use `listen` function of `http` module to start HTTP server;

## [0.2.0] - 2017-03-24

### Added
- Add a `listen` function to create a small web service;

### Fixed
- Fix missing TypeScript definition;

### Removed
- Remove options;

## [0.1.3] - 2017-03-18

### Changed
- Update `README.md`;

### Fixed
- Fix bug: The metrics returned by `getMetricsAsync` function are incorrectly formatted: the line breaks are replaced by commas;

## 0.1.2 - 2017-03-18

### Added
- Add TypeScript definitions;

### Fixed
- Fix TypeScript error (private formatter `Function`);

[0.2.1]: https://github.com/cyrilschumacher/prometheus-node-usage/compare/0.2.1...0.3.0
[0.2.1]: https://github.com/cyrilschumacher/prometheus-node-usage/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/cyrilschumacher/prometheus-node-usage/compare/0.1.3...0.2.0
[0.1.3]: https://github.com/cyrilschumacher/prometheus-node-usage/compare/0.1.2...0.1.3