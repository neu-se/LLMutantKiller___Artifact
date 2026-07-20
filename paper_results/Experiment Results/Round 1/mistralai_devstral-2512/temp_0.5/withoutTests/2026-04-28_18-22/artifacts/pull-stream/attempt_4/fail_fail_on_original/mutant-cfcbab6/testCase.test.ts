const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function", () => {
  it("should correctly process exactly two sinks without accessing undefined argument", () => {
    let sink1Called = false;
    let sink2Called = false;

    const source = {
      source: true,
      read: () => null
    };

    const sink1 = (read) => {
      sink1Called = true;
      return {
        source: {
          read: () => null
        }
      };
    };

    const sink2 = (read) => {
      sink2Called = true;
      return {
        source: {
          read: () => null
        }
      };
    };

    const result = pull(source, sink1, sink2);

    expect(sink1Called).toBe(true);
    expect(sink2Called).toBe(true);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('read');
  });
});