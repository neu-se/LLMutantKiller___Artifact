import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort when not busy", () => {
  it("should call abort callback when aborting a non-busy stream", (done) => {
    const abortErr = new Error("abort");

    // Source that responds to abort immediately but hangs on normal reads
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      // Hang on normal reads - never call cb
    };

    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      cb(null, data);
    });

    const through = map(source);

    // Start a read - source hangs, busy=false (map not invoked)
    through(null, (_end: any, _data: any) => {
      // This won't be called in this test
    });

    // Abort while not busy - abort callback MUST be called
    through(abortErr, (end: any) => {
      expect(end).toBeTruthy();
      done();
    });
  });
});