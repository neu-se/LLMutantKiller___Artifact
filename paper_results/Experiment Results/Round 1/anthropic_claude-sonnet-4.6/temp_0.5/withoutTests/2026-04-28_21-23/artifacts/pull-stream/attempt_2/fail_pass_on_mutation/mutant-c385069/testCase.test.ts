import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort callback invocation", () => {
  it("should invoke abort callback when source responds to data read after abort while not busy", (done) => {
    jest.setTimeout(1000);
    
    let pendingDataCb: Function | null = null;
    let pendingAbortCb: Function | null = null;
    let pendingMapCb: Function | null = null;
    
    const source = (abort: any, cb: Function) => {
      if (abort) {
        pendingAbortCb = cb;
      } else {
        pendingDataCb = cb;
      }
    };

    const mapper = (data: any, cb: Function) => {
      pendingMapCb = cb;
    };

    const through = asyncMap(mapper);
    const stream = through(source);

    // Start a data read - source holds, busy = false
    stream(null, () => {});

    // Abort while not busy (data read pending but map not started)
    const abortError = new Error("abort");
    stream(abortError, (err: any) => {
      expect(err).toBe(abortError);
      done();
    });

    // Source responds to data read AFTER abort was called
    // This triggers map, making busy = true
    if (pendingDataCb) pendingDataCb(null, 42);

    // Source responds to abort
    // Original: !busy branch was taken, fn1 calls cb(abort) directly -> done()
    // Mutated: else branch was taken, fn2 checks busy (now true), sets abortCb=cb, NOT called
    if (pendingAbortCb) pendingAbortCb(abortError);

    // Map completes
    // Original: already done
    // Mutated: busy=false, aborted=undefined, so cb(null,data) called, abortCb never called -> timeout
    if (pendingMapCb) pendingMapCb(null, 100);
  });
});