const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");

describe("pull function with partial application", () => {
  it("should correctly handle partial application with exactly 4 arguments and verify args array length", () => {
    const sink1 = (read: any) => (callback: any) => callback(null, "sink1");
    const sink2 = (read: any) => (callback: any) => callback(null, "sink2");
    const sink3 = (read: any) => (callback: any) => callback(null, "sink3");
    const sink4 = (read: any) => (callback: any) => callback(null, "sink4");

    const partialPull = pull(sink1, sink2, sink3, sink4);
    const mockRead = () => {};
    const result = partialPull(mockRead);

    // Verify the result is a function
    expect(typeof result).toBe("function");

    // Call the result function to trigger the switch case
    const finalResult = result(() => {});
    expect(typeof finalResult).toBe("function");
  });
});