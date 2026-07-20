import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with array-like arguments', () => {
  it('should handle exactly two arguments without accessing out-of-bounds index', () => {
    const read = jest.fn();
    const sink = jest.fn();

    // This should work fine with original code (i < length)
    // but will fail with mutated code (i <= length) when accessing arguments[2]
    expect(() => {
      pull(read, sink);
    }).not.toThrow();

    // Verify the sink was called with the read function
    expect(sink).toHaveBeenCalledWith(read);
  });
});