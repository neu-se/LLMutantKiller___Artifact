const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object sink", () => {
  it("should not process non-object arguments as sinks", () => {
    const source = {
      source: () => "data"
    };

    const nonObjectArg = "string-arg";
    const result = pull(source, nonObjectArg);
    expect(result).toBe(source.source);
  });
});