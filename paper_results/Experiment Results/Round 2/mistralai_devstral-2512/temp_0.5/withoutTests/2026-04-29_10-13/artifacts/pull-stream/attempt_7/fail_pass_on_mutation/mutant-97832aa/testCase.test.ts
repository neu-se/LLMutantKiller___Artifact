const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object argument", () => {
  it("should handle undefined object arguments correctly", () => {
    const source = {
      source: () => "source",
      sink: () => {}
    };

    const undefinedArg = undefined;

    const result = pull(source, undefinedArg);

    expect(typeof result).toBe("function");
    expect(result()).toBe("source");
  });
});