const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with partial application", () => {
  it("should correctly handle partial application with multiple arguments", () => {
    const sink1 = (read: any) => (callback: any) => callback(null, "sink1");
    const sink2 = (read: any) => (callback: any) => callback(null, "sink2");

    const partialPull = pull(sink1, sink2);
    const result = partialPull(() => {});

    expect(typeof result).toBe("function");
    expect(result.length).toBe(1);
  });
});