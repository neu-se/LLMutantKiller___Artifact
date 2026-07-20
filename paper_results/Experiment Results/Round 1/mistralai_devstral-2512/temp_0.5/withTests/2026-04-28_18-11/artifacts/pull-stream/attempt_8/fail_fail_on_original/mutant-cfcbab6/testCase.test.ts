import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with multiple arguments", () => {
  it("should not process extra arguments beyond what was provided", () => {
    const values = [1, 2, 3];
    let callCount = 0;
    let finalCallCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      callCount++;
      if (abort) return cb(abort);
      if (values.length === 0) return cb(true);
      cb(null, values.shift());
    };

    const through1 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    };

    const through2 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data + 1);
        });
      };
    };

    const sink = (read: any) => {
      read(null, (end: any, data: any) => {
        if (end) {
          finalCallCount = callCount;
        }
      });
    };

    pull(source, through1, through2, sink);

    // With 3 values and 3 streams (source, through1, through2), we expect exactly 3 calls
    // The mutation (i <= length) would cause an extra iteration (callCount would be 4)
    expect(finalCallCount).toBe(3);
  });
});