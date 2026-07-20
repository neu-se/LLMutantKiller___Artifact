const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object argument", () => {
  it("should handle empty object arguments correctly", () => {
    const source = {
      source: () => "source",
      sink: () => {}
    };

    const emptyObj = {};

    const result = pull(source, emptyObj);

    expect(typeof result).toBe("function");
    expect(result()).toBe("source");
  });
});