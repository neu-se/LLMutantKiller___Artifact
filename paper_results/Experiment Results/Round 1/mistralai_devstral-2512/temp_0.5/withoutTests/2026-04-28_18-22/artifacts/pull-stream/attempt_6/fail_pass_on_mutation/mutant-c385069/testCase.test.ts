import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should call read with abort immediately when not busy", (done) => {
    let readCalledWithAbort = false;
    const mockRead = jest.fn((abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        readCalledWithAbort = true;
        cb(abort);
      } else {
        cb(null, "data");
      }
    });

    const map = asyncMap((data: any, cb: (err: any, result: any) => void) => {
      setImmediate(() => cb(null, data));
    });
    const read = map(mockRead);

    read(null, (end: any, data: any) => {
      // At this point, the mapper is not busy
      read("ABORT_ERROR", (err: any) => {
        expect(err).toBe("ABORT_ERROR");
        // The original code should have called read with abort immediately
        // The mutated code (if(false)) will skip this and go to the else branch
        expect(readCalledWithAbort).toBe(true);
        done();
      });
    });
  });
});