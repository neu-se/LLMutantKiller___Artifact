import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should handle abort correctly when not busy by calling read with abort", (done) => {
    const mockRead = jest.fn((abort: any, cb: (err: any, data?: any) => void) => {
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

    read(null, (end: any, data: any) => {
      // Now trigger abort when not busy
      const abortError = new Error("ABORT");
      read(abortError, (err: any) => {
        expect(err).toBe(abortError);
        // The key difference: original code should call read with abort when not busy
        // Mutated code (if(false)) will skip this and go to else branch
        expect(mockRead).toHaveBeenLastCalledWith(abortError, expect.any(Function));
        done();
      });
    });
  });
});