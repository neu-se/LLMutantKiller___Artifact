import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with multiple arguments", () => {
  it("should correctly process exactly 3 arguments without accessing out of bounds", () => {
    const input = [1, 2, 3];
    const results: number[] = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else if (input.length === 0) {
        cb(true);
      } else {
        cb(null, input.shift());
      }
    };

    const through1 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data * 2);
          }
        });
      };
    };

    const through2 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data + 1);
          }
        });
      };
    };

    const sink = (read: any) => {
      return (abort: any, cb: (end: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            results.push(data);
            read(abort, (end: any, data: any) => {
              if (end) {
                cb(end);
              } else {
                results.push(data);
                read(abort, (end: any, data: any) => {
                  if (end) {
                    cb(end);
                  } else {
                    results.push(data);
                    cb(true);
                  }
                });
              }
            });
          }
        });
      };
    };

    const pipeline = pull(source, through1, through2, sink);

    pipeline(null, (end: any) => {
      expect(results).toEqual([3, 5, 7]);
    });
  });
});