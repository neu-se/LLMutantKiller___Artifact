const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object argument", () => {
  it("should handle object arguments correctly", () => {
    const source = {
      source: () => "source",
      sink: () => {}
    };

    const objArg = { data: "test" };

    const result = pull(source, objArg);

    expect(result).toBe("source");
  });
});