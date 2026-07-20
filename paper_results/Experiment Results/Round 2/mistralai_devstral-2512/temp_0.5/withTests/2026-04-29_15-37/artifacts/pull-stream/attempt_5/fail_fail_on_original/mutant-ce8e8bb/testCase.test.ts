const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with function argument", () => {
  it("should correctly handle function arguments in the stream pipeline", () => {
    const testFunction = (read: any) => {
      return function (end: any, cb: any) {
        if (end) return cb(end);
        cb(null, "test");
      };
    };

    const result = pull(testFunction);
    expect(typeof result).toBe('function');
    expect(result.length).toBe(2);
  });
});