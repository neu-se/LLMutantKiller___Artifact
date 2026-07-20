const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function", () => {
  it("should correctly handle exactly two sinks without off-by-one error", () => {
    const source = {
      source: true,
      read: () => null
    };

    const sink1 = (read: any) => {
      if (read === undefined) throw new Error("Read is undefined");
      return {
        source: {
          read: () => null
        }
      };
    };

    const sink2 = (read: any) => {
      if (read === undefined) throw new Error("Read is undefined");
      return {
        source: {
          read: () => null
        }
      };
    };

    // The mutation changes i < length to i <= length
    // With 2 sinks (length=3 including source), original stops at i=2
    // Mutated version will try to access arguments[3] which is undefined
    // This will cause the sink to be called with undefined read
    const result = pull(source, sink1, sink2);
    expect(result).toBeDefined();
  });
});