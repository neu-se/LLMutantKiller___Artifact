import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with exactly two arguments', () => {
  it('should correctly process two arguments without accessing undefined', () => {
    const read = {
      source: true,
      read: jest.fn()
    };

    const through = {
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
    // which is undefined and will cause an error when checking typeof
    const result = pull(read, through);

    expect(result).toBeDefined();
    expect(through.sink).toHaveBeenCalledTimes(1);
  });
});