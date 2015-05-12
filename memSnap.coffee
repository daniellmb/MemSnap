###*
  @file MemSnap is a 0.2KB analytics micro-library written in both CoffeeScript and JavaScript that logs browser memory statistic snapshots over time.
  @author Daniel Lamb <dlamb.open.source@gmail.com>
###

###*
  Logs browser memory statistic snapshots over time.
  @param {Window} global - the global context (aka the Window object).
  @param {string} url - the url including parameters for where to send the memory snapshots.
  @param {Object.<string, number>} intervals - a key value pair list of when to send the memory snapshots.
###
memSnap = (global, url, intervals) ->
  perf = global.performance

  # check browser support
  if perf and perf.memory
    # shorten the dot lookup
    memory = perf.memory
    lblRegx = /\{lbl\}/
    lmtRegx = /\{lmt\}/
    totRegx = /\{tot\}/
    useRegx = /\{use\}/

    # use default intervals if not set
    intervals = intervals or
    # label: delay
    '0s': 0
    '5m': 3e5
    '10m': 6e5
    '15m': 9e5
    '30m': 18e5
    '1h': 36e5
    '3h': 108e5
    '6h': 216e5
    '12h': 432e5
    '24h': 864e5
    '48h': 1728e5

    ###*
    Schedules sending a memory snapshot in the future.
    @param {string} label - human readable label of when the snapshot was taken
    @param {number} delay - how long to wait in milliseconds from the time memSnap is called.
    ###
    sendAt = (label, delay) ->
      global.setTimeout (->
        global.document.createElement('img').src =
          url.replace(lblRegx, global.encodeURIComponent label)
             .replace(lmtRegx, perf.memory.jsHeapSizeLimit)
             .replace(totRegx, perf.memory.totalJSHeapSize)
             .replace(useRegx, perf.memory.usedJSHeapSize)
      ), delay

    # schedule sending memory stats
    for own key, value of intervals
      sendAt key, value
