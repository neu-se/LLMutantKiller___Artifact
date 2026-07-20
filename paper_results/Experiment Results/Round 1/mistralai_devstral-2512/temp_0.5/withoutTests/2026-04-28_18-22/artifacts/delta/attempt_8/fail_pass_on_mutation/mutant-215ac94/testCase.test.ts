import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly handle transform when thisData is object and otherData is object with same embed type", () => {
    // Register a custom embed handler for testing
    Delta.registerEmbed("test", {
      compose: (a: string, b: string) => b,
      invert: (a: string, b: string) => a,
      transform: (a: string, b: string, priority: boolean) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ test: "data1" });
    const delta2 = new Delta().retain({ test: "data2" });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: "data2" });

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});