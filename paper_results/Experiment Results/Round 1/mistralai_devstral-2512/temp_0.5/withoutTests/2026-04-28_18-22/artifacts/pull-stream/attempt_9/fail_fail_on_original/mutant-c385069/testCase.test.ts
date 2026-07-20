import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should call read with abort when not busy and not call mapper", (done) => {
    let readAbortCalled = false;
    let mapperCalled = false;

    const mockRead = jest.fn((abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        readAbortCalled = true;
        cb(abort);
      } else {
        cb(null, "data");
      }
    });

    const map = asyncMap((data: any, cb: (err: any, result: any) => void) => {
      mapperCalled = true;
      setImmediate(() => cb(null, data));
    });
    const read = map(mockRead);

    read(null, (end: any, data: any) => {
      // At this point, the mapper is busy (async operation in progress)
      setImmediate(() => {
        // Now trigger abort when busy
        read("ABORT_ERROR", (err: any) => {
          expect(err).toBe("ABORT_ERROR");
          // When busy, original code should not call read with abort immediately
          // but wait for mapper to complete
          expect(readAbortCalled).toBe(false);
          // Mapper should have been called
          expect(mapperCalled).toBe(true);
          done();
        });
      });
    });
  });
});