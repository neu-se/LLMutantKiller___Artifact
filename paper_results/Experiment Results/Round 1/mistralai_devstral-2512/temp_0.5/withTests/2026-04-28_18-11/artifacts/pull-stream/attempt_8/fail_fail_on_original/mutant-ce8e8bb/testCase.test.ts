const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with function argument", () => {
  it("should correctly handle function arguments in the stream pipeline", () => {
    const testFunction = (data: any) => data * 2;
    const source = function(end: any, cb: any) {
      if (end) return cb(end);
      cb(null, 5);
    };

    const result = pull(source, testFunction);
    expect(typeof result).toBe("function");
    expect(result.length).toBe(2);

    result(null, (end: any, data: any) => {
      expect(end).toBe(null);
      expect(data).toBe(10); // 5 * 2
    });
  });
});