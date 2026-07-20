import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with multiple arguments", () => {
  it("should correctly process exactly the provided arguments without extra iteration", (done) => {
    const values = [1, 2, 3];
    const results: number[] = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      if (values.length === 0) return cb(true);
      cb(null, values.shift());
    };

    const through1 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          results.push(data * 2);
          cb(null, data * 2);
        });
      };
    };

    const through2 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          results.push(data + 1);
          cb(null, data + 1);
        });
      };
    };

    const sink = (read: any) => {
      read(null, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual([2, 4, 3, 6, 4, 8]);
          done();
          return;
        }
      });
    };

    pull(source, through1, through2, sink);
  });
});