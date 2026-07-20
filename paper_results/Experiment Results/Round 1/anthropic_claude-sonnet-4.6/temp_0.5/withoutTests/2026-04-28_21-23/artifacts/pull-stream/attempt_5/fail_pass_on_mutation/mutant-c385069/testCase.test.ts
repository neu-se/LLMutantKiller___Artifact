import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("abort callback is invoked when not busy", () => {
    let mapperCb: Function | null = null;
    let sourceAbortCb: Function | null = null;
    let readCallCount = 0;
    
    // Source: delivers data synchronously, holds abort
    const source = (abort: any, cb: Function) => {
      readCallCount++;
      if (abort) {
        sourceAbortCb = cb;
      } else {
        cb(null, readCallCount); // deliver data synchronously
      }
    };

    const mapper = (data: any, cb: Function) => {
      mapperCb = cb; // hold mapper
    };

    const stream = asyncMap(mapper)(source);

    // Read - source delivers synchronously, mapper holds, busy=true
    stream(null, () => {});
    
    // mapperCb should be set now
    // Complete mapper - busy=false
    mapperCb!(null, 1);
    mapperCb = null;
    
    // Now busy=false, start another read
    stream(null, () => {});
    // Source delivers synchronously again, mapper holds, busy=true
    
    // Complete mapper - busy=false  
    mapperCb!(null, 2);
    mapperCb = null;

    // Now busy=false, abort
    const abortErr = new Error("abort");
    let abortResult: any = undefined;
    stream(abortErr, (err: any) => { abortResult = err; });
    
    // Source holds abort response
    // Now trigger a data read somehow to make busy=true... but we can't without calling stream(null,...)
    // Actually we can't make busy=true here without another read
    
    // Source responds to abort - busy=false
    sourceAbortCb!(abortErr);
    
    // Both should call cb(abort)
    expect(abortResult).toBe(abortErr);
  });
});