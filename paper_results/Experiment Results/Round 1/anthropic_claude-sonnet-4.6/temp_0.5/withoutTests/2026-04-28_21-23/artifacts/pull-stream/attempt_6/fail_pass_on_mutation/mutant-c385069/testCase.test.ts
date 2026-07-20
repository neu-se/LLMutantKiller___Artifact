import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("abort handler always calls cb regardless of busy state", () => {
    let capturedAbortHandler: Function | null = null;
    let mapperCb: Function | null = null;
    let callCount = 0;

    const source = (abort: any, cb: Function) => {
      if (abort) {
        capturedAbortHandler = cb;
      } else {
        callCount++;
        if (callCount === 1) {
          cb(null, 1); // synchronous data on first call
        }
      }
    };

    const mapper = (data: any, cb: Function) => {
      mapperCb = cb; // hold - keeps busy=true
    };

    const stream = asyncMap(mapper)(source);

    // First read: source delivers synchronously, mapper holds, busy=true
    stream(null, () => {});
    // mapperCb is set, busy=true

    // Abort while busy - BOTH original and mutated take else branch
    // So this doesn't differentiate... 
    
    // Complete mapper - busy=false
    mapperCb!(null, 1);
    mapperCb = null;

    // Now busy=false, abort
    const abortErr = new Error("abort");
    let abortResult: any = null;
    stream(abortErr, (err: any) => { abortResult = err; });
    // capturedAbortHandler is now set

    // Now make busy=true by starting another read
    // But we can't - stream is in abort state...
    // Actually we CAN call stream(null, ...) again
    stream(null, () => {});
    // This calls read(null, fn_data2) -> source delivers synchronously -> mapper holds -> busy=true

    // Now call the abort handler with busy=true
    capturedAbortHandler!(abortErr);
    // Original fn1: cb(abort) -> abortResult=abortErr
    // Mutated fn2: if(busy) -> true -> abortCb=cb -> abortResult stays null

    expect(abortResult).toBe(abortErr);
  });
});