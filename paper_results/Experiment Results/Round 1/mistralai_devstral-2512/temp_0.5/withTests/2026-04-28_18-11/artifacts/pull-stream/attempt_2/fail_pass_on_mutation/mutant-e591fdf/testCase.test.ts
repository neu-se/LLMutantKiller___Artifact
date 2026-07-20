const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with non-function first argument", () => {
  it("should not create a partial application when first argument is not a function", () => {
    const nonFunction = { test: "value" };
    const result = pull(nonFunction);
    expect(result).toBe(nonFunction);
  });
});