const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with function argument", () => {
  it("should correctly handle function arguments", () => {
    const mockFunction = jest.fn((data) => data * 2);
    const result = pull(mockFunction);
    expect(result).toBe(mockFunction);
    expect(mockFunction).not.toHaveBeenCalled();
  });
});