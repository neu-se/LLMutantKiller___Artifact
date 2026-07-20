const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with single argument", () => {
  it("should correctly handle partial application when called with one argument", () => {
    const read = () => {};
    const partialSink = pull(read);
    expect(partialSink).toBeInstanceOf(Function);

    // This should trigger the mutation difference
    const result = partialSink(() => {});
    expect(result).toBeInstanceOf(Function);
  });
});