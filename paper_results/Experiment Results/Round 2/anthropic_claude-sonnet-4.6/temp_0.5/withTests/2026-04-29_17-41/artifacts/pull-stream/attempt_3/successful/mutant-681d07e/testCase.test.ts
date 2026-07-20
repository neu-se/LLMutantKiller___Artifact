import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink double-call protection", () => {
  it("should throw with the specific message about partial sink called once when invoked a second time", () => {
    function mapThrough(read: (abort: any, cb: Function) => void) {
      return function(abort: any, cb: Function) {
        read(abort, function(end: any, data: any) {
          if (end) cb(end);
          else cb(null, data);
        });
      };
    }

    function drainSink(read: Function) {
      function loop(end: any, data: any) {
        if (!end) read(null, loop);
      }
      read(null, loop);
    }

    const partialSink = pull(mapThrough, drainSink);

    function immediateEndSource(abort: any, cb: Function) {
      cb(true);
    }

    // First call should succeed
    partialSink(immediateEndSource);

    // Second call: original throws TypeError with specific message
    // Mutated throws different error (cannot read property of null)
    let thrownError: any;
    try {
      partialSink(immediateEndSource);
    } catch (e) {
      thrownError = e;
    }

    expect(thrownError).toBeInstanceOf(TypeError);
    expect(thrownError.message).toBe("partial sink should only be called once!");
  });
});