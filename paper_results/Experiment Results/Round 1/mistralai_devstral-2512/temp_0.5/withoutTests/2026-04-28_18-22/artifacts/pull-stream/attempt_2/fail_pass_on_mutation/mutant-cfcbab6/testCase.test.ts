const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function", () => {
  it("should handle exactly two sinks without error", () => {
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

    expect(() => {
      pull(source, sink1, sink2);
    }).not.toThrow();
  });
});