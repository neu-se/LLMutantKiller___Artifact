const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with non-function input", () => {
  it("should throw TypeError when first argument is not a function", () => {
    const nonFunctionInput = { length: 1 }; // Has length property but isn't a function
    expect(() => {
      pull(nonFunctionInput);
    }).toThrow(TypeError);
  });
});