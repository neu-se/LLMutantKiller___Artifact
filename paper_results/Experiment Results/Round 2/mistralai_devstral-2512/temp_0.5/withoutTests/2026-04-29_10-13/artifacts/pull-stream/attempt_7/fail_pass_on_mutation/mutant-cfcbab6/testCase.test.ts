import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function boundary test', () => {
  it('should handle exactly two arguments without accessing undefined argument', () => {
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
    // which is undefined and will cause an error when trying to check typeof
    const result = pull(read, sink);

    expect(result).toBeDefined();
    expect(sink.sink).toHaveBeenCalledTimes(1);
  });
});