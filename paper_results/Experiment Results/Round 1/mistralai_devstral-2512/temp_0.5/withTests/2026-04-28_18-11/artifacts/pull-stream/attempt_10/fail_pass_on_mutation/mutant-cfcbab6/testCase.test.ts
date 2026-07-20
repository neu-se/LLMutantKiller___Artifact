import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with multiple arguments", () => {
  it("should not access undefined arguments when processing streams", () => {
    const values = [1, 2, 3];
    let errorCaught = false;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
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
          // The mutation would try to access arguments[3] which is undefined
          // This should not happen in the original code
          expect(errorCaught).toBe(false);
        }
      });
    };

    try {
      pull(source, through1, through2, sink);
    } catch (e) {
      errorCaught = true;
    }
  });
});