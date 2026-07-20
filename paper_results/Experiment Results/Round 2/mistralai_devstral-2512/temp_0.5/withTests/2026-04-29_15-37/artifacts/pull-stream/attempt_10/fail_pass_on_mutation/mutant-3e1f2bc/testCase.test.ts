import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream mutation test", () => {
  it("should handle non-object arguments correctly", () => {
    // Create a simple source
    const source = (read: any) => {
      let i = 0;
      const data = [1, 2, 3];
      return function (abort: any, cb: any) {
        if (abort) cb(abort);
        else if (i >= data.length) cb(true);
        else cb(null, data[i++]);
      };
    };

    // Create a non-object through stream (just a function)
    const through = (read: any) => {
      return function (abort: any, cb: any) {
        if (abort) cb(abort);
        else read(null, cb);
      };
    };

    // This should work in original code but fail in mutated code
    // because the mutated code will try to call through.sink()
    const result = pull(source, through);

    const collected: number[] = [];
    result(null, function next(end: any, chunk: any) {
      if (end) {
        expect(collected).toEqual([1, 2, 3]);
      } else {
        collected.push(chunk);
        result(null, next);
      }
    });
  });
});