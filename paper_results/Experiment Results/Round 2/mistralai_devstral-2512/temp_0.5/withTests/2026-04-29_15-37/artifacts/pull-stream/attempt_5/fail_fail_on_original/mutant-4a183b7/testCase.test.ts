const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source property", () => {
  it("should use source property when available", () => {
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

    // Verify the source property was used by checking if result is the source function
    expect(result).toBe(source.source(pull));
  });
});