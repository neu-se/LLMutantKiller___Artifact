import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with exactly two arguments', () => {
  it('should not attempt to access arguments[2] when only two arguments are provided', () => {
    const read = jest.fn();
    const sink = jest.fn();

    // This test will pass on original code (i < length)
    // but fail on mutated code (i <= length) because it will try to access arguments[2]
    // which doesn't exist and will be undefined
    const result = pull(read, sink);

    expect(result).toBeDefined();
    expect(sink).toHaveBeenCalledWith(read);
  });
});