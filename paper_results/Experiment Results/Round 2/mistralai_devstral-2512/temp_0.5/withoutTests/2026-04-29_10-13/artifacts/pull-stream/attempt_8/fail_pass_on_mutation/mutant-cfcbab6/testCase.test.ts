import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with exactly two arguments', () => {
  it('should not access beyond arguments length', () => {
    const read = {
      source: true,
      read: jest.fn()
    };

    const sink = {
      sink: jest.fn((read) => {
        return {
          source: {
            read: jest.fn()
          }
        };
      }),
      source: true
    };

    // This will work with original code (i < length)
    // but will fail with mutated code (i <= length) because it will try to access arguments[2]
    // which is undefined and will throw when trying to check typeof
    expect(() => {
      pull(read, sink);
    }).not.toThrow();

    expect(sink.sink).toHaveBeenCalledTimes(1);
  });
});