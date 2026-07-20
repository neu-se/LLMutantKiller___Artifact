import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with exactly two arguments', () => {
  it('should not attempt to access arguments[2] when only two are provided', () => {
    const read = {
      source: true,
      read: jest.fn()
    };

    const sink = {
      sink: jest.fn((read) => read),
      source: true
    };

    // This test will pass on original code (i < length)
    // but will fail on mutated code (i <= length) because it will try to access arguments[2]
    // which is undefined and will cause an error when checking typeof
    expect(() => {
      pull(read, sink);
    }).not.toThrow();

    expect(sink.sink).toHaveBeenCalledTimes(1);
  });
});