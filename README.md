# prometheus-node-usage

> Exporter node.js application metrics (CPU, RAM and uptime).

[![MIT License][license-image]][license-url]
[![npm version][npmjs-image]][npmjs-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![david-dm dependency Status][david-image]][david-url]
[![david-dm devDependency Status][david-dev-dependencies-image]][david-dev-dependencies-url]

Exports metrics from a Node application. The library obtains data on CPU and memory on current process and creates a format to be used from the [Prometheus](https://prometheus.io/) tool. Format example:

    node_process_memory_used 4335264
    node_process_memory_total 8368128
    node_process_memory_rss 24854528
    node_process_cpu_usage 12.5
    node_process_uptime 0.256

## Installation

With [npm](https://npmjs.org/) or [yarn](https//:yarnpkg.com/) installed, run :

```bash
$ npm install prometheus-node-usage
$ yarn add prometheus-node-usage
```

You can use **prometheus-node-usage** from your JavaScript project.

## Usage

```javascript
var metrics = require('prometheus-node-usage');

metrics.getMetricsAsync().then(function (metrics) {
    // node_process_memory_used 4335264
    // node_process_memory_total 8368128
    // node_process_memory_rss 24854528
    // node_process_cpu_usage 12.5
    // node_process_uptime 0.256
});
```

The function `getMetricsAsync` accepts options to customize metrics:

```javascript
var options = {
    formatters: {                       // Functions to format the metric value.
        cpuUsage: Function,
        memory: {
            heapTotal: Function,
            heapUsed: Function,
            residentSetSize: Function
        },
        uptime: Function
    },
    prefix: String                      // Prefix for metric name.
};
```

## License

> The MIT License (MIT)
>
> Copyright (c) 2017 Cyril Schumacher
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnishet to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
> OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
> THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npmjs-image]: https://badge.fury.io/js/prometheus-node-usage.svg
[npmjs-url]: https://www.npmjs.com/package/prometheus-node-usage
[travis-image]: https://travis-ci.org/cyrilschumacher/prometheus-node-usage.svg
[travis-url]: https://travis-ci.org/cyrilschumacher/prometheus-node-usage
[coveralls-image]: https://coveralls.io/repos/github/cyrilschumacher/prometheus-node-usage/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/cyrilschumacher/prometheus-node-usage?branch=master
[david-dev-dependencies-image]: https://david-dm.org/cyrilschumacher/prometheus-node-usage/dev-status.svg
[david-dev-dependencies-url]: https://david-dm.org/cyrilschumacher/prometheus-node-usage#info=devDependencies
[david-image]: https://david-dm.org/cyrilschumacher/prometheus-node-usage.svg
[david-url]: https://david-dm.org/cyrilschumacher/prometheus-node-usage