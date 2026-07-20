const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object argument", () => {
  it("should handle null object arguments correctly", () => {
    const source = {
      source: () => "source",
      sink: () => {}
    };

    const nullArg = null;

    const result = pull(source, nullArg);

    expect(result).toBe("source");
  });
});