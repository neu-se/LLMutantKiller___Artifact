const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function error message", () => {
  it("should throw TypeError with specific message when partial sink is called multiple times", () => {
    const partialSink = pull((read: any) => read);
    expect(() => {
      partialSink(null);
      partialSink(null);
    }).toThrow("partial sink should only be called once!");
  });
});