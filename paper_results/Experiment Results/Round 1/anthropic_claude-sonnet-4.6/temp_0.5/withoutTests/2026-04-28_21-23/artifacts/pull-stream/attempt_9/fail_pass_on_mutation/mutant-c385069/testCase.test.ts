import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("abort callback is called when abort is requested during mapper execution", () => {
    let abortCbCalled = false;
    const abortErr = new Error("abort");
    let stream: Function;

    const source = (abort: any, cb: Function) => {
      if (abort) {
        cb(abort); // respond synchronously
      } else {
        cb(null, 1);
      }
    };

    const mapper = (data: any, cb: Function) => {
      // busy=true here
      stream(abortErr, (err: any) => {
        abortCbCalled = true;
      });
      // Original fn1: cb(abort) -> abortCbCalled=true (already happened)
      // Mutated fn2: if(busy)->true -> abortCb=cb -> abortCbCalled=false
      if (cb) cb(null, data); // complete mapper if cb exists
    };

    stream = asyncMap(mapper)(source);
    stream(null, () => {});

    expect(abortCbCalled).toBe(true);
  });
});