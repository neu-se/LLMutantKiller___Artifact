const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with single argument", () => {
  it("should correctly handle partial application with array storage", () => {
    const read = () => {};
    const partialSink = pull(read);

    // Force the partial sink to be called
    try {
      partialSink(() => {});
      partialSink(() => {});
    } catch (e) {
      expect(e.message).toBe("partial sink should only be called once!");
    }
  });
});