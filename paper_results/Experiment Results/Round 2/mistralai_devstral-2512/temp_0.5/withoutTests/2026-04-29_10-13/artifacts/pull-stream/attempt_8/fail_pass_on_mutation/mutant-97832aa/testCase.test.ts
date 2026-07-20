const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object argument", () => {
  it("should handle false boolean arguments correctly", () => {
    const source = {
      source: () => "source",
      sink: () => {}
    };

    const falseArg = false;

    const result = pull(source, falseArg);

    expect(typeof result).toBe("function");
    expect(result()).toBe("source");
  });
});