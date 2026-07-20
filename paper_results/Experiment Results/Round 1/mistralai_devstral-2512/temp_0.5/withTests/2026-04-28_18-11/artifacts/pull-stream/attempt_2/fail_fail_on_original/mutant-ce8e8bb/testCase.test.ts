const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function behavior with non-function argument", () => {
  it("should process non-function arguments without type checking", () => {
    const mockStream = {
      source: jest.fn(() => "processed")
    };
    const result = pull(mockStream);
    expect(result).toBe("processed");
    expect(mockStream.source).toHaveBeenCalled();
  });
});