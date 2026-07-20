const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with single argument", () => {
  it("should correctly handle partial application with multiple arguments", () => {
    const read = () => {};
    const sink1 = () => {};
    const sink2 = () => {};
    const partialSink = pull(read, sink1, sink2);
    expect(typeof partialSink).toBe("function");
  });
});