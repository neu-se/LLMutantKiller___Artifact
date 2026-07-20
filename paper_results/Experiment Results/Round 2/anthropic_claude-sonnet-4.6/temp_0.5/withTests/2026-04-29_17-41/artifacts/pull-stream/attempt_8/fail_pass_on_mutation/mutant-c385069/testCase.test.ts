import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("should call abort callback when aborting without any pending read", (done) => {
    const abortErr = new Error("abort");
    const sourceCalls: Array<{abort: any, cb: (end: any, data?: any) => void}> = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      sourceCalls.push({abort, cb});
      // Always hang - never respond
    };

    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      // never complete
    });

    const through = map(source);

    // Abort without any prior read - busy=false, no pending read
    through(abortErr, (end: any) => {
      expect(end).toBeTruthy();
      done();
    });

    setTimeout(() => {
      expect(sourceCalls.length).toBe(1);
      // In original: !busy branch -> read(abort, ...) -> source hangs -> cb never called
      // Hmm, this would timeout in original too...
      
      // Actually let's respond to abort
      sourceCalls[0].cb(abortErr);
    }, 50);
  }, 500);
});