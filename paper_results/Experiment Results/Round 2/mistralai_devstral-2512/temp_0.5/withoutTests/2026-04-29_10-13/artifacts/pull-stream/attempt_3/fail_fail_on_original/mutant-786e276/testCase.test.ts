const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with source property check", () => {
  it("should correctly handle a read stream with a source function", () => {
    const source = {
      source: () => "data"
    };
    const result = pull(source);
    expect(result).toBe("data");
  });
});