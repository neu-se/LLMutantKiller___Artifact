import flatten from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";

describe("flatten abort behavior", () => {
  it("should properly abort the outer stream when aborting with a non-error abort value", (done) => {
    // Track what abort value the outer read receives
    let outerAbortReceived: any = undefined;
    let outerReadCallCount = 0;

    // Create a mock outer read (stream of streams)
    // First call returns an inner stream, subsequent calls handle abort
    const outerRead = (abort: any, cb: Function) => {
      outerReadCallCount++;
      if (abort) {
        outerAbortReceived = abort;
        cb(abort);
        return;
      }
      // Return an inner stream that never ends (hangs)
      const innerRead = (innerAbort: any, innerCb: Function) => {
        if (innerAbort) {
          // Inner stream aborted with no error
          innerCb(null); // err is null/falsy - this is the key case
          return;
        }
        // Never calls back (hangs)
      };
      cb(null, innerRead);
    };

    const flattenThrough = flatten();
    const flatStream = flattenThrough(outerRead);

    // Start reading to get into a state where _read is set
    flatStream(null, (err: any, data: any) => {
      // This callback won't be called since inner stream hangs
    });

    // Give it a tick to set up _read, then abort
    setImmediate(() => {
      const abortValue = new Error("abort signal");
      
      flatStream(abortValue, (err: any) => {
        // After abort completes, verify the outer stream received the abort signal
        // With original code: read(err || abort, cb) = read(null || abortValue, cb) = read(abortValue, cb)
        // With mutated code: read(err && abort, cb) = read(null && abortValue, cb) = read(null, cb) - outer not aborted!
        
        try {
          expect(outerAbortReceived).toBe(abortValue);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});