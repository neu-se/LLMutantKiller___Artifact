const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function", () => {
  it("should throw when accessing undefined argument in mutated version", () => {
    const source = {
      source: true,
      read: () => null
    };

    const sink1 = (read) => ({
      source: {
        read: () => null
      }
    });

    const sink2 = (read) => ({
      source: {
        read: () => null
      }
    });

    // This should work in original but fail in mutated version
    // because mutated version will try to access arguments[2] when length=2
    expect(() => {
      pull(source, sink1, sink2);
    }).not.toThrow();

    // Verify the result is defined (original behavior)
    const result = pull(source, sink1, sink2);
    expect(result).toBeDefined();
  });
});