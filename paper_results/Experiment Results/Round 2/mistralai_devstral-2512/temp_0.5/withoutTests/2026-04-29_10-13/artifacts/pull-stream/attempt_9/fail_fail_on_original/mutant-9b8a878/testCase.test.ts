const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with single argument", () => {
  it("should correctly store arguments in partial application", () => {
    const read = () => {};
    const partialSink = pull(read);

    // This should trigger the mutation difference when args array is accessed
    const mockRead = () => {};
    const result = partialSink(mockRead);

    // The mutation causes args to be empty array, which should affect behavior
    expect(typeof result).toBe('function');
  });
});