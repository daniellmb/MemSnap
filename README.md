# MemSnap
[![Build Status][build-image]][build-url]
[![Code GPA][gpa-image]][gpa-url]
[![Test Coverage][coverage-image]][coverage-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Bower Version][bower-image]][bower-url]
[![NPM version][npm-image]][npm-url]
[![IRC Channel][irc-image]][irc-url]
[![Gitter][gitter-image]][gitter-url]

## About

MemSnap is a 0.2KB analytics micro-library written in both CoffeeScript and JavaScript that logs JavaScript memory use snapshots over time. This is a great tool for automatically sampling long running applications for real-world memory use. Logging is done using a dynamic image with the data passed as url parameters so there are no cross-origin security restrictions to worry about. The url format is based on a template you provide so it is possible to send the data anywhere.

## Examples

### Sending Data to Google Analytics

```JavaScript
// An example of using ga-beacon to send memory snapshot data to Google Analytics as custom events
memSnap(this, 'https://ga-beacon.appspot.com/UA-XXXXXXXX-X/event?t=event&ec=Mem&ea=Snap&el={lbl}&ev={use}');
```

### JavaScript

```JavaScript
// pass in the window object and set the URL for where to send memory statistics.
memSnap(this, 'http://example.com/log/?when={lbl}&limit={lmt}&total={use}&usage={use}');

// - OR -

// you can optionally configure custom snapshot labels and intervals
memSnap(this, 'http://example.com/log/?when={lbl}&limit={lmt}&total={tot}&usage={use}',  {
  '0s': 0,
  '1m': 6e4,
  '3m': 18e4,
  '5m': 3e5,
  '10m': 6e5,
  '15m': 9e5,
  '30m': 18e5
});

// - OR -

// you can optionally configure a callback to get notified when a memory snapshot is taken
memSnap(this, 'http://example.com/log/?when={lbl}&limit={lmt}&total={tot}&usage={use}',  {
  '0s': 0,
  '1m': 6e4,
  '3m': 18e4,
  '5m': 3e5,
  '10m': 6e5,
  '15m': 9e5,
  '30m': 18e5
}, function(time, memory) {
  console.log('Memory snapshot at ' + time + ' was ' + (memory.usedJSHeapSize / 1e6).toFixed(2) + ' MB');
});
```

### CoffeeScript

```CoffeeScript
# pass in the window object and set the URL for where to send memory statistics.
memSnap @, 'http://example.com/log/?when={lbl}&limit={lmt}&total={tot}&usage={use}'

# - OR -

# you can optionally configure custom snapshot labels and intervals
memSnap @, 'http://example.com/log/?when={lbl}&limit={lmt}&total={tot}&usage={use}',
  '0s': 0
  '1m': 6e4
  '3m': 18e4
  '5m': 3e5
  '10m': 6e5
  '15m': 9e5
  '30m': 18e5
  
# - OR -
  
# you can optionally configure a callback to get notified when a memory snapshot is taken
memSnap this, 'http://example.com/log/?when={lbl}&limit={lmt}&total={tot}&usage={use}', {
  '0s': 0
  '1m': 6e4
  '3m': 18e4
  '5m': 3e5
  '10m': 6e5
  '15m': 9e5
  '30m': 18e5
}, (time, memory) ->
  console.log 'Memory snapshot at ' + time + ' was ' + (memory.usedJSHeapSize / 1e6).toFixed(2) + ' MB'
```

By default the examples above would log memory use snapshots at the following relative time intervals:

  - immediately (as soon as memSnap is called)
  - at 5 minutes
  - at 10 minutes
  - at 15 minutes
  - at 30 minutes
  - at 1 hour
  - at 3 hours
  - at 6 hours
  - at 12 hours
  - at 24 hours
  - at 48 hours

These snapshots would be sent to the url using the parameter format you provide, such as:

`http://example.com/log/?when={lbl}&limit={lmt}&total={tot}&usage={use}`

The simple placeholders in the url template above will be replaced with the following values:

  - `{lbl}` is a friendly label for when the snapshot was taken (relative to when memSnap was called).
  - `{lmt}` is the current value of `window.performance.memory.jsHeapSizeLimit` in bytes.
  - `{tot}` is the current value of `window.performance.memory.totalJSHeapSize` in bytes.
  - `{use}` is the current value of `window.performance.memory.usedJSHeapSize` in bytes.

NOTE: that the `memSnap` method only needs to be *called once* to schedule sending the memory statistics.

## Install Choices
- `bower install memsnap`
- [download the zip](https://github.com/daniellmb/memSnap/archive/master.zip)

## Tasks

All tasks can be run by simply running `gulp` or with the `npm test` command, or individually:

  * `gulp lint` will lint source code for syntax errors and anti-patterns.
  * `gulp gpa` will analyze source code against complexity thresholds.
  * `gulp test` will run the jasmine unit tests against the source code.
  * `gulp test-coffee` will run the jasmine unit tests against the CoffeeScript source code.
  * `gulp test-min` will run the jasmine unit tests against the minified code.

## License

(The MIT License)

Copyright (c) 2015 Daniel Lamb dlamb.open.source@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



[build-url]: https://travis-ci.org/daniellmb/MemSnap
[build-image]: http://img.shields.io/travis/daniellmb/MemSnap.png

[gpa-url]: https://codeclimate.com/github/daniellmb/MemSnap
[gpa-image]: https://codeclimate.com/github/daniellmb/MemSnap.png

[coverage-url]: https://codeclimate.com/github/daniellmb/MemSnap/code?sort=covered_percent&sort_direction=desc
[coverage-image]: https://codeclimate.com/github/daniellmb/MemSnap/coverage.png

[depstat-url]: https://david-dm.org/daniellmb/MemSnap
[depstat-image]: https://david-dm.org/daniellmb/MemSnap.png?theme=shields.io

[issues-url]: https://github.com/daniellmb/MemSnap/issues
[issues-image]: http://img.shields.io/github/issues/daniellmb/MemSnap.png

[bower-url]: http://bower.io/search/?q=memsnap
[bower-image]: https://badge.fury.io/bo/memsnap.png

[downloads-url]: https://www.npmjs.org/package/memsnap
[downloads-image]: http://img.shields.io/npm/dm/memsnap.png

[npm-url]: https://www.npmjs.org/package/memsnap
[npm-image]: https://badge.fury.io/js/memsnap.png

[irc-url]: http://webchat.freenode.net/?channels=MemSnap
[irc-image]: http://img.shields.io/badge/irc-%23MemSnap-brightgreen.png

[gitter-url]: https://gitter.im/daniellmb/MemSnap
[gitter-image]: http://img.shields.io/badge/gitter-daniellmb/MemSnap-brightgreen.png

[tip-url]: https://www.gittip.com/daniellmb
[tip-image]: http://img.shields.io/gittip/daniellmb.png
