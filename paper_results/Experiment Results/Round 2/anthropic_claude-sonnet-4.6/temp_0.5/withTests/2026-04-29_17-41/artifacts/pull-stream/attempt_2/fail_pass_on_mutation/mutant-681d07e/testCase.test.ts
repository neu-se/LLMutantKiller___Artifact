import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink double-call protection", () => {
  it("should throw TypeError when partial sink is invoked a second time", () => {
    // A through stream has length === 1
    function mapThrough(read: (abort: any, cb: Function) => void) {
      return function(abort: any, cb: Function) {
        read(abort, function(end: any, data: any) {
          if (end) cb(end);
          else cb(null, data);
        });
      };
    }

    // A sink has length === 2 (takes abort and cb directly, not a read function)
    // We use drain-style: accepts a read function but has length !== 1
    // Actually a proper sink wraps read and drives it - let's use a function
    // that accepts read and has length 1 but drives the stream to completion
    // The last argument must be a "sink" - something that drives reading.
    // In pull-stream, a sink is a function(read) that starts pulling.
    // But that also has length 1...
    
    // Use pull.drain as the sink via the actual pull-stream API
    // pull(throughFn, sinkFn) where both have length 1 => partial sink
    // The partial sink itself has length 1 and when called with a source, runs.

    // Create partial pipeline: through + a terminal sink
    // A terminal sink that drives the stream (length 1):
    function drainSink(read: Function) {
      // drive the stream to completion synchronously
      function loop(end: any, data: any) {
        if (!end) read(null, loop);
      }
      read(null, loop);
    }

    // pull(mapThrough, drainSink) => partial sink (length 1 function)
    const partialSink = pull(mapThrough, drainSink);

    // Source that ends immediately
    function immediateEndSource(abort: any, cb: Function) {
      cb(true);
    }

    // First call should succeed
    partialSink(immediateEndSource);

    // Second call: original throws TypeError, mutated does not
    expect(() => {
      partialSink(immediateEndSource);
    }).toThrow(TypeError);
  });
});