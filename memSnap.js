/**
 * @file MemSnap is a 0.2KB analytics micro-library written in both CoffeeScript and JavaScript that logs browser memory statistic snapshots over time.
 * @author Daniel Lamb <dlamb.open.source@gmail.com>
 */

/**
 * Logs browser memory statistic snapshots over time.
 * @param {!Window} global - the global context (aka the Window object).
 * @param {!string} url - the url including parameters for where to send the memory snapshots.
 * @param {Object.<string, number>} intervals - an optional key value pair list of when to send the memory snapshots.
 * @param {Function} notify - an optional callback when a memory snapshot is taken.
 */
function memSnap (global, url, intervals, notify) {
  var perf = global.performance;

  // check already called and browser support
  if (perf && perf.memory) {
    var lblRegx = /\{lbl\}/,
        lmtRegx = /\{lmt\}/,
        totRegx = /\{tot\}/,
        useRegx = /\{use\}/,
        sendAt, key;

    // use default intervals if not set
    intervals = intervals || {
      // label: delay
      '0s': 0,
      '5m': 3e5,
      '10m': 6e5,
      '15m': 9e5,
      '30m': 18e5,
      '1h': 36e5,
      '3h': 108e5,
      '6h': 216e5,
      '12h': 432e5,
      '24h': 864e5,
      '48h': 1728e5
    };

    /**
     * Schedules sending a memory snapshot in the future.
     * @param {string} label - friendly label of when the snapshot was taken
     * @param {number} delay - how long to wait in milliseconds from the time memSnap is called.
     */
    sendAt = function (label, delay) {
      global.setTimeout(function () {
        if (notify) {
          notify(label, perf.memory);
        }
        global.document.createElement('img').src =
          url.replace(lblRegx, global.encodeURIComponent(label))
             .replace(lmtRegx, perf.memory.jsHeapSizeLimit)
             .replace(totRegx, perf.memory.totalJSHeapSize)
             .replace(useRegx, perf.memory.usedJSHeapSize);
      }, delay);
    };

    // schedule sending memory stats
    for (key in intervals) {
      if (intervals.hasOwnProperty(key)) {
        sendAt(key, intervals[key]);
      }
    }
  }
}
