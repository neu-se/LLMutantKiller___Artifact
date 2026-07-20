import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior when not busy", () => {
  it("should call the abort callback when aborting a non-busy stream", (done) => {
    const abortError = new Error("abort");
    
    // Create a simple source that never ends (simulates a slow/infinite source)
    let readCalled = 0;
    const source = (abort: any, cb: Function) => {
      readCalled++;
      if (abort) {
        // Source acknowledges abort
        cb(abort);
      } else {
        // Don't call cb immediately - simulate pending read
        // We'll store cb but never call it to simulate a source that hasn't responded yet
        // Actually for the non-busy case, we need the stream to NOT be in the middle of mapping
        // So we just never respond to simulate a slow source
      }
    };

    // Use a synchronous map function
    const mapper = (data: any, cb: Function) => {
      cb(null, data * 2);
    };

    const through = asyncMap(mapper);
    const stream = through(source);

    // First, abort immediately without having started any read (not busy)
    stream(abortError, (err: any) => {
      // The callback should be called with the abort error
      expect(err).toBe(abortError);
      done();
    });
  });
});