const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function partial application behavior", () => {
  it("should not create partial application when first argument is not a function", () => {
    const nonFunction = { test: "value" };
    const result = pull(nonFunction);
    expect(result).toBe(nonFunction);
  });
});