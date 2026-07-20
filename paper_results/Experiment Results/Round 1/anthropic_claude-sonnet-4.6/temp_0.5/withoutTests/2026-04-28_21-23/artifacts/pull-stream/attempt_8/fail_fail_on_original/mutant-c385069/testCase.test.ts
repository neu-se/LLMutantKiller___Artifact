import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("abort callback is invoked when not busy", () => {
    let firstDataCb: Function | null = null;
    let abortCb: Function | null = null;
    let mapperCb: Function | null = null;
    let abortCbCalled = false;

    const source = (abort: any, cb: Function) => {
      if (abort) {
        abortCb = cb;
      } else {
        firstDataCb = cb; // hold first data read
      }
    };

    const mapper = (data: any, cb: Function) => {
      mapperCb = cb;
    };

    const stream = asyncMap(mapper)(source);

    // Start data read - source holds
    stream(null, () => {});
    // firstDataCb is set, busy=false

    // Abort while not busy
    const abortErr = new Error("abort");
    stream(abortErr, () => { abortCbCalled = true; });
    // abortCb is set

    // Source delivers data AFTER abort - busy=true
    firstDataCb!(null, 42);
    // mapperCb is set, busy=true

    // Source responds to abort - busy=true at this point
    abortCb!(abortErr);
    // Original fn1: cb(abort) -> abortCbCalled=true
    // Mutated fn2: if(busy) -> true -> abortCb=cb -> abortCbCalled stays false

    // Mapper completes
    mapperCb!(null, 42);
    // Mutated: aborted=undefined -> cb(null,42) called, abortCb never called

    expect(abortCbCalled).toBe(true);
  });
});