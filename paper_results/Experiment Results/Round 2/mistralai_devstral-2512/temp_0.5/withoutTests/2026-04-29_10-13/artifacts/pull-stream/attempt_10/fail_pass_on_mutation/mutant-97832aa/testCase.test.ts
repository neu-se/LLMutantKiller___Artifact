const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with object argument", () => {
  it("should handle object without sink method correctly", () => {
    const source = {
      source: () => "source",
      sink: () => {}
    };

    const objWithoutSink = { data: "test" };

    expect(() => {
      pull(source, objWithoutSink);
    }).toThrow(TypeError);
  });
});