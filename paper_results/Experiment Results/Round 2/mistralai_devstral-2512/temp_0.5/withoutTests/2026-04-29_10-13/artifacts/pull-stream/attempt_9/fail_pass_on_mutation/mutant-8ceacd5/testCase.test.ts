const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with more than 4 arguments", () => {
  it("should handle more than 4 arguments by falling through to default case", () => {
    const mockRead = jest.fn();
    const mockSink1 = jest.fn().mockReturnValue("sink1");
    const mockSink2 = jest.fn().mockReturnValue("sink2");
    const mockSink3 = jest.fn().mockReturnValue("sink3");
    const mockSink4 = jest.fn().mockReturnValue("sink4");
    const mockSink5 = jest.fn().mockReturnValue("sink5");

    // This should trigger the default case in the switch statement
    const result = pull(mockRead, mockSink1, mockSink2, mockSink3, mockSink4, mockSink5);

    // In the original code, the default case should unshift read and apply pull
    // In the mutated code, the default case is empty so this will fail
    expect(result).toBe("sink5");
  });
});