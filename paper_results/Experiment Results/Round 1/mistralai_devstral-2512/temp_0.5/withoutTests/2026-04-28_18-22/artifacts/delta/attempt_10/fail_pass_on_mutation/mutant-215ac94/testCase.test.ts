import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly handle transform when thisData is object and otherData is object with different embed types", () => {
    // Register custom embed handlers for testing
    Delta.registerEmbed("type1", {
      compose: (a: string, b: string) => b,
      invert: (a: string, b: string) => a,
      transform: (a: string, b: string, priority: boolean) => (priority ? a : b),
    });
    Delta.registerEmbed("type2", {
      compose: (a: string, b: string) => b,
      invert: (a: string, b: string) => a,
      transform: (a: string, b: string, priority: boolean) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ type1: "value1" });
    const delta2 = new Delta().retain({ type2: "value2" });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ type2: "value2" });

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("type1");
    Delta.unregisterEmbed("type2");
  });
});