const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with single argument", () => {
  it("should correctly handle partial application with one argument", () => {
    const read = () => {};
    const partialSink = pull(read);
    expect(typeof partialSink).toBe("function");
    expect(partialSink.length).toBe(0);
  });
});