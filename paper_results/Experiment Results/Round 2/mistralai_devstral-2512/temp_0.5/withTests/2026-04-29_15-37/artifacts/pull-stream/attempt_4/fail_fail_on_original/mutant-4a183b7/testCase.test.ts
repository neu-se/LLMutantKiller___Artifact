const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source property", () => {
  it("should use source property when available", (done) => {
    const source = {
      source: (read: any) => {
        return (abort: any, cb: any) => {
          if (abort) return cb(abort);
          cb(null, "test-data");
        };
      },
    };

    const result = pull(source);

    // The result should be the source's source function
    expect(typeof result).toBe("function");

    // Call the result to verify it works
    result(null, (end: any, data: any) => {
      expect(end).toBeNull();
      expect(data).toBe("test-data");
      done();
    });
  });
});