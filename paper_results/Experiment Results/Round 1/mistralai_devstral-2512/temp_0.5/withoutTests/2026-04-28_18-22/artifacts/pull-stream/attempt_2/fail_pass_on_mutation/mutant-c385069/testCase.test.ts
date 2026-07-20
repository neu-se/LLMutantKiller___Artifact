import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should handle abort when not busy", (done) => {
    const mockRead = jest.fn((abort: any, cb: (err: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    });

    const map = asyncMap((data: any, cb: (err: any, result: any) => void) => cb(null, data));
    const read = map(mockRead);

    read(null, (end: any, data: any) => {
      read("ABORT_ERROR", (err: any) => {
        expect(err).toBe("ABORT_ERROR");
        expect(mockRead).toHaveBeenCalledWith("ABORT_ERROR", expect.any(Function));
        done();
      });
    });
  });
});