import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("correctly handles abort when source delivers data after abort is requested", () => {
    // Track all callbacks
    let storedDataCb: ((end: any, data?: any) => void) | null = null;
    let storedAbortCb: ((err: any) => void) | null = null;
    let storedMapCb: ((err: any, data?: any) => void) | null = null;
    
    const source = (abort: any, cb: any) => {
      if (abort) {
        storedAbortCb = cb;
      } else {
        storedDataCb = cb;
      }
    };

    const mapper = (data: any, cb: any) => {
      storedMapCb = cb;
    };

    const stream = asyncMap(mapper)(source);

    // Step 1: Request data - source holds, busy=false
    let dataResult: any = null;
    stream(null, (err: any, data: any) => { dataResult = {err, data}; });
    
    expect(storedDataCb).not.toBeNull();
    expect(storedAbortCb).toBeNull();

    // Step 2: Abort while NOT busy (no data read has completed, mapper not running)
    const abortErr = new Error("abort");
    let abortResult: any = null;
    stream(abortErr, (err: any) => { abortResult = err; });
    
    expect(storedAbortCb).not.toBeNull();

    // Step 3: Source delivers data BEFORE responding to abort
    // This causes mapper to start, busy=true
    storedDataCb!(null, 42);
    expect(storedMapCb).not.toBeNull(); // mapper is now running
    
    // Step 4: Source responds to abort
    // At this point busy=true
    // Original (fn1): calls cb(abortErr) directly -> abortResult set
    // Mutated (fn2): busy=true -> abortCb=cb -> abortResult NOT set
    storedAbortCb!(abortErr);
    
    // Step 5: Mapper completes
    // Original: abortResult already set
    // Mutated: aborted=undefined -> cb(null,42) called (data callback), abortCb never called
    storedMapCb!(null, 42);

    // The abort callback MUST have been called
    expect(abortResult).toBe(abortErr);
  });
});