import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should immediately abort when not busy without calling mapper", (done) => {
    let mapperCalled = false;
    const mockRead = jest.fn((abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    });

    const map = asyncMap((data: any, cb: (err: any, result: any) => void) => {
      mapperCalled = true;
      cb(null, data);
    });
    const read = map(mockRead);

    read(null, (end: any, data: any) => {
      // Now trigger abort when not busy
      read("ABORT_ERROR", (err: any) => {
        expect(err).toBe("ABORT_ERROR");
        // Original code should call read with abort immediately without calling mapper
        // Mutated code (if(false)) will go to else branch and call mapper
        expect(mapperCalled).toBe(false);
        done();
      });
    });
  });
});