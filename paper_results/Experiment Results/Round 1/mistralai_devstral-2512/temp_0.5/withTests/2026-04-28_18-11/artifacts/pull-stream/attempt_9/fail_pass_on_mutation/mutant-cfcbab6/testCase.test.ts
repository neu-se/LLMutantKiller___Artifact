import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with multiple arguments", () => {
  it("should correctly process exactly the provided arguments without extra iteration", () => {
    const values = [1, 2, 3];
    const calls: number[] = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (values.length === 0) return cb(true);
      const value = values.shift();
      calls.push(value!);
      cb(null, value);
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
          // With 3 values, we expect exactly 3 calls to source
          // The mutation (i <= length) would cause an extra iteration
          expect(calls.length).toBe(3);
          expect(calls).toEqual([1, 2, 3]);
        }
      });
    };

    pull(source, through1, through2, sink);
  });
});