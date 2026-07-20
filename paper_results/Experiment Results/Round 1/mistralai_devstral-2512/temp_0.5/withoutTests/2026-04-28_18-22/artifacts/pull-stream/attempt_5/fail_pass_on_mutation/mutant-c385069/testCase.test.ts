import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should immediately call read with abort when not busy", (done) => {
    const callOrder: string[] = [];
    const mockRead = jest.fn((abort: any, cb: (err: any, data?: any) => void) => {
      if (abort) {
        callOrder.push("abort");
        cb(abort);
      } else {
        callOrder.push("read");
        cb(null, "data");
      }
    });

    const map = asyncMap((data: any, cb: (err: any, result: any) => void) => {
      setImmediate(() => {
        callOrder.push("map");
        cb(null, data);
      });
    });
    const read = map(mockRead);

    read(null, (end: any, data: any) => {
      expect(callOrder).toEqual(["read", "map"]);
      callOrder.length = 0; // Reset for abort test

      read("ABORT_ERROR", (err: any) => {
        expect(err).toBe("ABORT_ERROR");
        // Original code should call read immediately with abort
        // Mutated code will go to else branch and call read(null, ...)
        expect(callOrder).toEqual(["abort"]);
        done();
      });
    });
  });
});