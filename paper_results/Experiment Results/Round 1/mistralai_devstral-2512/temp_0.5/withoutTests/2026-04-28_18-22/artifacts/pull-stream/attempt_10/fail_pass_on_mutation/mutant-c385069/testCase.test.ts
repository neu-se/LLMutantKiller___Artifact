import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should handle abort when not busy by calling read with abort", (done) => {
    let readAbortCalled = false;
    let readNormalCalled = false;

    const mockRead = jest.fn((abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        readAbortCalled = true;
        cb(abort);
      } else {
        readNormalCalled = true;
        cb(null, "data");
      }
    });

    const map = asyncMap((data: any, cb: (err: any, result: any) => void) => {
      cb(null, data);
    });
    const read = map(mockRead);

    read(null, (end: any, data: any) => {
      expect(readNormalCalled).toBe(true);
      readNormalCalled = false;

      // Now trigger abort when not busy
      read("ABORT_ERROR", (err: any) => {
        expect(err).toBe("ABORT_ERROR");
        // Original code should call read with abort when not busy
        expect(readAbortCalled).toBe(true);
        // Should not call read normally
        expect(readNormalCalled).toBe(false);
        done();
      });
    });
  });
});