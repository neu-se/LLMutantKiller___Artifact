import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should call read with abort when not busy", (done) => {
    let abortCalled = false;
    const mockRead = jest.fn((abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        abortCalled = true;
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
      read("ABORT_ERROR", (err: any) => {
        expect(err).toBe("ABORT_ERROR");
        expect(abortCalled).toBe(true);
        done();
      });
    });
  });
});