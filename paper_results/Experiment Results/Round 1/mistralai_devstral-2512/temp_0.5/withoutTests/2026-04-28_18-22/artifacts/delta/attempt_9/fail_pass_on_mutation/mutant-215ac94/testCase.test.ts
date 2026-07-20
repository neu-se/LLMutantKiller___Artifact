import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly handle transform when thisData is number and otherData is object", () => {
    // Register a custom embed handler for testing
    Delta.registerEmbed("test", {
      compose: (a: string, b: string) => b,
      invert: (a: string, b: string) => a,
      transform: (a: string, b: string, priority: boolean) => (priority ? a : b),
    });

    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain({ test: "data" });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: "data" });

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});