import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with three arguments', () => {
  it('should process exactly three arguments without errors', () => {
    const read = {
      source: true,
      read: jest.fn()
    };

    const through1 = {
      sink: jest.fn((read) => read),
      source: true
    };

    const through2 = {
      sink: jest.fn((read) => read),
      source: true
    };

    // This will work with original code (i < length)
    // but will fail with mutated code (i <= length) because it will try to access arguments[3]
    expect(() => {
      pull(read, through1, through2);
    }).not.toThrow();
  });
});