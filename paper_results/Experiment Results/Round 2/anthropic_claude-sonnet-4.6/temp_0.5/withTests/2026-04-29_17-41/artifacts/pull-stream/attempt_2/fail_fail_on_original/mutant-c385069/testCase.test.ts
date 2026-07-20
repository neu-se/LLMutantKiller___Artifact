import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort when not busy", () => {
  it("should invoke abort callback when aborting a non-busy stream", (done) => {
    const abortErr = new Error("abort");
    let readAbortCalled = false;

    // Source that records when abort is called
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        readAbortCalled = true;
        cb(abort);
        return;
      }
      // Hang - never respond to normal reads
      // so the stream stays in a waiting state but NOT busy (map hasn't been called)
    };

    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      cb(null, data);
    });

    const through = map(source);

    // Start a read - source hangs, so we're waiting but NOT busy (map not called yet)
    through(null, (end: any, data: any) => {
      // This should be called with abortErr eventually
      expect(end).toBe(abortErr);
      expect(readAbortCalled).toBe(true);
      done();
    });

    // Now abort while the stream is waiting on source (not busy with map)
    // busy=false here because map hasn't been invoked yet
    // Original: if(!busy) read(abort, ...) -> cb(abort) -> our callback above gets called
    // Mutated: if(false) -> neither branch runs -> callback never called
    through(abortErr, (end: any) => {
      // abort callback
    });
  });
});