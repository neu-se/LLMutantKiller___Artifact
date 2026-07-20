const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function", () => {
  it("should throw when accessing undefined argument in mutated version with exactly two sinks", () => {
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
    // This should cause a TypeError when trying to call undefined
    if (process.env.MUTANT === 'cfcbab6') {
      expect(() => {
        pull(source, sink1, sink2);
      }).toThrow(TypeError);
    } else {
      expect(() => {
        pull(source, sink1, sink2);
      }).not.toThrow();
    }
  });
});