import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("should call abort callback when not busy and source delivers data after abort", () => {
    let pendingDataCb: Function | null = null;
    let pendingAbortCb: Function | null = null;
    let pendingMapCb: Function | null = null;
    let abortCallbackCalled = false;
    let abortCallbackError: any = null;

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

    // Start data read - source holds, busy=false
    stream(null, () => {});

    // Abort while not busy
    const abortError = new Error("abort");
    stream(abortError, (err: any) => {
      abortCallbackCalled = true;
      abortCallbackError = err;
    });

    // Source delivers data AFTER abort - busy becomes true
    if (pendingDataCb) pendingDataCb(null, 42);

    // Source responds to abort
    // Original (!busy branch fn1): cb(abort) -> abortCallbackCalled = true
    // Mutated (else branch fn2): busy=true -> abortCb=cb -> abortCallbackCalled stays false
    if (pendingAbortCb) pendingAbortCb(abortError);

    // Map completes
    // Mutated: aborted=undefined, cb(null,data) called, abortCb never invoked
    if (pendingMapCb) pendingMapCb(null, 100);

    expect(abortCallbackCalled).toBe(true);
    expect(abortCallbackError).toBe(abortError);
  });
});