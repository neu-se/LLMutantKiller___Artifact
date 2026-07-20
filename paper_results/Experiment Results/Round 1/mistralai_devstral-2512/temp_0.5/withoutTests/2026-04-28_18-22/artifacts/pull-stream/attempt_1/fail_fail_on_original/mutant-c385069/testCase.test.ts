import { asyncMap } from "./throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should handle abort when not busy", (done) => {
    const mockRead = jest.fn((abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    });

    const map = asyncMap((data, cb) => cb(null, data));
    const read = map(mockRead);

    // First call to establish non-busy state
    read(null, (end, data) => {
      // Now trigger abort when not busy
      read("ABORT_ERROR", (err) => {
        expect(err).toBe("ABORT_ERROR");
        expect(mockRead).toHaveBeenCalledWith("ABORT_ERROR", expect.any(Function));
        done();
      });
    });
  });
});