import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function boundary condition", () => {
  it("should not throw when processing exactly 4 arguments", () => {
    const input = [1, 2, 3, 4];
    let errorOccurred = false;

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
            cb(null, data);
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
            cb(null, data);
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
            cb(null, data);
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
            read(abort, (end: any, data: any) => {
              if (end) {
                cb(end);
              } else {
                read(abort, (end: any, data: any) => {
                  if (end) {
                    cb(end);
                  } else {
                    read(abort, (end: any, data: any) => {
                      if (end) {
                        cb(end);
                      } else {
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

    try {
      const pipeline = pull(source, through1, through2, through3, sink);
      pipeline(null, (end: any) => {
        // Should complete without error
      });
    } catch (e) {
      errorOccurred = true;
    }

    expect(errorOccurred).toBe(false);
  });
});