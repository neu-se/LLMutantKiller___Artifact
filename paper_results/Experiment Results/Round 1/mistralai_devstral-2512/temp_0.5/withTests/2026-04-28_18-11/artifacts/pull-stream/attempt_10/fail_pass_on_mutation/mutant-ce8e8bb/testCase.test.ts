const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with curried function", () => {
  it("should correctly handle curried function arguments", () => {
    const curriedFunction = (read: any) => {
      return function(end: any, cb: any) {
        read(end, (endData: any, data: any) => {
          if (endData) return cb(endData);
          cb(null, data * 2);
        });
      };
    };

    const source = function(end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 5);
    };

    const result = pull(source, curriedFunction);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);

    result(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(10); // 5 * 2
    });
  });
});