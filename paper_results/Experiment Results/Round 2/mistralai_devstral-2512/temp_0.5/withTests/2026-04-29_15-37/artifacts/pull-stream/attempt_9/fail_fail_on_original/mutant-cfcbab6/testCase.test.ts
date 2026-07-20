import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function boundary condition", () => {
  it("should handle exactly 4 arguments without out-of-bounds access", () => {
    const input = [1, 2, 3, 4];
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

    const through3 = (read: any) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            cb(null, data * 3);
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
          }
        });
      };
    };

    const pipeline = pull(source, through1, through2, through3, sink);

    pipeline(null, (end: any) => {
      expect(results).toEqual([3, 5, 7, 9]);
    });
  });
});