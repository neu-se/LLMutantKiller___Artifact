const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function", () => {
  it("should handle exactly two sinks without accessing undefined argument", () => {
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
    expect(() => {
      pull(source, sink1, sink2);
    }).not.toThrow();

    const result = pull(source, sink1, sink2);
    expect(result).toBeDefined();
  });
});