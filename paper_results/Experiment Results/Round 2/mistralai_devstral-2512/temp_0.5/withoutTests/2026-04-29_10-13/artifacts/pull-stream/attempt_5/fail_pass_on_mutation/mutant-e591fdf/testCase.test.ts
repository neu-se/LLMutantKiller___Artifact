const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with partial application", () => {
  it("should create partial application when first argument is a function with length 1", () => {
    const mockRead = jest.fn();
    const partial = pull(mockRead);
    expect(typeof partial).toBe("function");
    expect(mockRead).not.toHaveBeenCalled();
  });
});