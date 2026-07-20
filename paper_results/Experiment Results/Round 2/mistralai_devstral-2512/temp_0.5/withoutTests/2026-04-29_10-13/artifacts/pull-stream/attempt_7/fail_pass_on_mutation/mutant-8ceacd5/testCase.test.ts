const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with exactly 5 arguments", () => {
  it("should properly chain 5 sinks", () => {
    const mockRead = jest.fn();
    const mockSink1 = jest.fn().mockReturnValue("sink1");
    const mockSink2 = jest.fn().mockReturnValue("sink2");
    const mockSink3 = jest.fn().mockReturnValue("sink3");
    const mockSink4 = jest.fn().mockReturnValue("sink4");
    const mockSink5 = jest.fn().mockReturnValue("sink5");

    const result = pull(mockRead, mockSink1, mockSink2, mockSink3, mockSink4, mockSink5);

    expect(mockSink1).toHaveBeenCalledWith(mockRead);
    expect(mockSink2).toHaveBeenCalledWith("sink1");
    expect(mockSink3).toHaveBeenCalledWith("sink2");
    expect(mockSink4).toHaveBeenCalledWith("sink3");
    expect(mockSink5).toHaveBeenCalledWith("sink4");
    expect(result).toBe("sink5");
  });
});