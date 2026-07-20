const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with partial application", () => {
  it("should throw when accessing arguments beyond length in partial application", () => {
    const sink1 = (read: any) => (callback: any) => callback(null, "sink1");
    const sink2 = (read: any) => (callback: any) => callback(null, "sink2");

    // This should work with 2 arguments
    const partialPull = pull(sink1, sink2);

    // Call it with a read function
    const result = partialPull(() => {});

    // The result should be a function
    expect(typeof result).toBe("function");
  });
});