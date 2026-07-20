import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with partial application", () => {
  it("should correctly store arguments in partial application", () => {
    const sink1 = () => {};
    const sink2 = () => {};
    const sink3 = () => {};

    const partialPull = pull(sink1, sink2, sink3);

    // The mutation would cause args to be an empty array instead of length 3
    // This would cause the partial application to fail when called
    expect(() => {
      partialPull(() => {});
    }).not.toThrow();
  });
});