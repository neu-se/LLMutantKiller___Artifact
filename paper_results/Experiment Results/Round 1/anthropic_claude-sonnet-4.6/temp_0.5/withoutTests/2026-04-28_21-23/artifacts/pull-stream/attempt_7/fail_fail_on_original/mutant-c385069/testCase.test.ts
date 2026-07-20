import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("detects mutation via abort handler behavior", () => {
    const mapperSpy = jest.fn((data: any, cb: Function) => {
      // hold - don't call cb
    });
    
    let capturedAbortCb: Function | null = null;
    let dataCount = 0;

    const source = (abort: any, cb: Function) => {
      if (abort) {
        capturedAbortCb = cb;
      } else {
        cb(null, ++dataCount);
      }
    };

    const stream = asyncMap(mapperSpy)(source);

    // Make mapper run once and complete
    let mapperCb: Function | null = null;
    mapperSpy.mockImplementationOnce((data: any, cb: Function) => {
      mapperCb = cb;
    });
    
    stream(null, () => {});
    expect(mapperSpy).toHaveBeenCalledTimes(1);
    mapperCb!(null, 1);

    // Now abort while not busy
    const abortErr = new Error("abort");
    let abortResult: any = null;
    stream(abortErr, (err: any) => { abortResult = err; });

    // Make mapper run again (busy=true) by doing another read
    let mapperCb2: Function | null = null;
    mapperSpy.mockImplementationOnce((data: any, cb: Function) => {
      mapperCb2 = cb;
    });
    stream(null, () => {});
    expect(mapperSpy).toHaveBeenCalledTimes(2);

    // Call abort handler while busy=true
    capturedAbortCb!(abortErr);
    
    // Complete mapper
    mapperCb2!(null, 2);

    expect(abortResult).toBe(abortErr);
  });
});