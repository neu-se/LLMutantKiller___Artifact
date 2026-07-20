const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with single argument", () => {
  it("should correctly store arguments in partial application", () => {
    const read = () => {};
    const partialSink = pull(read);
    const mockSink = jest.fn();
    partialSink(mockSink);
    expect(mockSink).toHaveBeenCalledWith(read);
  });
});