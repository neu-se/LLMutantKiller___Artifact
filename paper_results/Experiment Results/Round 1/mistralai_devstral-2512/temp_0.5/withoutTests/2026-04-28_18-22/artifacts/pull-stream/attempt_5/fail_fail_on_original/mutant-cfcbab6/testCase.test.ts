const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function", () => {
  it("should process exactly two sinks without accessing undefined argument", () => {
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

    // This should work in original but fail in mutated version
    // because mutated version will try to access arguments[2] when length=2
    const result = pull(source, sink1, sink2);

    expect(result).toBeDefined();
    expect(typeof result.read).toBe('function');
  });
});