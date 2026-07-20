const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with single argument", () => {
  it("should correctly handle partial application with array length", () => {
    const read = () => {};
    const partialSink = pull(read);
    expect(Array.isArray(partialSink.args)).toBe(false);
  });
});