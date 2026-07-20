const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function", () => {
  it("should throw when accessing undefined argument in mutated version", () => {
    const source = {
      source: true,
      read: () => null
    };

    const sink1 = (read: any) => ({
      source: {
        read: () => null
      }
    });

    const sink2 = (read: any) => ({
      source: {
        read: () => null
      }
    });

    // The mutation changes i < length to i <= length
    // With 2 sinks (length=3 including source), original stops at i=2
    // Mutated version will try to access arguments[3] which is undefined
    // This should cause a TypeError when trying to process undefined
    expect(() => {
      pull(source, sink1, sink2);
    }).not.toThrow();

    // Verify the result is a function (original behavior)
    const result = pull(source, sink1, sink2);
    expect(typeof result.read).toBe('function');
  });
});