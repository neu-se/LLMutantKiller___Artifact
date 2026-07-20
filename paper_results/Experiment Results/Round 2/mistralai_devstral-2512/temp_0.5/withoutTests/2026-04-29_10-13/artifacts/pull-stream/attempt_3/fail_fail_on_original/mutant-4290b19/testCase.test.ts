const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with partial application", () => {
  it("should correctly handle partial application with multiple arguments", () => {
    const sink1 = (read: any) => () => "sink1";
    const sink2 = (read: any) => () => "sink2";

    const partialPull = pull(sink1, sink2);
    const result = partialPull(() => "input");

    expect(result).toBe("sink1");
  });
});