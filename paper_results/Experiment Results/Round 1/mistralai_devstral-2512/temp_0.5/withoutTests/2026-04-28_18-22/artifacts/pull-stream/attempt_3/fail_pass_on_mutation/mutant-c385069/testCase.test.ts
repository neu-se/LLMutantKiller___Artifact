import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should correctly handle abort when not busy by calling read with abort", (done) => {
    let readCallCount = 0;
    const mockRead = jest.fn((abort: any, cb: (err: any, data?: any) => void) => {
      readCallCount++;
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    });

    const map = asyncMap((data: any, cb: (err: any, result: any) => void) => {
      setImmediate(() => cb(null, data));
    });
    const read = map(mockRead);

    // First call to establish non-busy state
    read(null, (end: any, data: any) => {
      // Now trigger abort when not busy
      read("ABORT_ERROR", (err: any) => {
        expect(err).toBe("ABORT_ERROR");
        // The key difference: original code should call read with abort when not busy
        // Mutated code (if(false)) will skip this and go to else branch
        expect(mockRead).toHaveBeenCalledWith("ABORT_ERROR", expect.any(Function));
        expect(readCallCount).toBe(2); // One for initial read, one for abort
        done();
      });
    });
  });
});