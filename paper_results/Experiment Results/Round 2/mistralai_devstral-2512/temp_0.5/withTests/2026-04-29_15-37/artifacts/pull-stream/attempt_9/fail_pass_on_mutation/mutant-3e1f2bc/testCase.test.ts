import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream mutation test", () => {
  it("should fail when non-object is treated as object in pull chain", () => {
    // Create a simple source stream
    const source = (read: any) => {
      let i = 0;
      const data = [1, 2, 3];
      return function (abort: any, cb: any) {
        if (abort) {
          cb(abort);
        } else if (i >= data.length) {
          cb(true);
        } else {
          cb(null, data[i++]);
        }
      };
    };

    // Create a non-object argument (a simple function)
    const simpleFunction = (read: any) => {
      return function (abort: any, cb: any) {
        if (abort) {
          cb(abort);
        } else {
          read(null, function next(end: any, chunk: any) {
            if (end) {
              cb(end);
            } else {
              read(null, next);
            }
          });
        }
      };
    };

    // This should work in original code but fail in mutated code
    expect(() => {
      const result = pull(source, simpleFunction);
      result(null, () => {});
    }).not.toThrow();
  });
});