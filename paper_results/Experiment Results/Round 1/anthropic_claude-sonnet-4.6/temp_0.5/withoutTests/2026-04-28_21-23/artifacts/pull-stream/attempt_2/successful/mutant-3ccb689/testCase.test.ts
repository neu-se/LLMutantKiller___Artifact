import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("should immediately call cb with abort error on subsequent reads after stream is aborted", (done) => {
    const abortError = new Error("abort");
    let sourceCallCount = 0;

    // Source that tracks how many times it's called
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      sourceCallCount++;
      if (abort) {
        cb(abort);
        return;
      }
      // Provide data normally
      cb(null, sourceCallCount);
    };

    const identity = (data: any, cb: (err: any, data?: any) => void) => {
      cb(null, data);
    };

    const through = asyncMap(identity)(source);

    // First, abort the stream
    through(abortError, (err: any) => {
      // Stream is now aborted
      expect(err).toBe(abortError);

      const sourceCallsAfterAbort = sourceCallCount;

      // Now try to read again after abort - original code should immediately
      // return cb(aborted) WITHOUT calling source again
      through(null, (end: any, data: any) => {
        // In original: cb is called with abortError immediately (no new source call)
        // In mutated: the aborted check is skipped, source gets called again
        expect(end).toBe(abortError);
        
        // In original code, source should NOT have been called again
        // because the early return `if(aborted) return cb(aborted)` fires first
        expect(sourceCallCount).toBe(sourceCallsAfterAbort);
        
        done();
      });
    });
  });
});