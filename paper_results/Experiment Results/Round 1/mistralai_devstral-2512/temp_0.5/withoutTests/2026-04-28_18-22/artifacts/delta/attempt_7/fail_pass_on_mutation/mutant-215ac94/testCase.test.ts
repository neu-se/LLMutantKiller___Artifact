import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform when both deltas have object retains with different embed types", () => {
    // Register custom embed handlers for testing
    Delta.registerEmbed("test1", {
      compose: (a: string, b: string) => b,
      invert: (a: string, b: string) => a,
      transform: (a: string, b: string, priority: boolean) => (priority ? a : b),
    });
    Delta.registerEmbed("test2", {
      compose: (a: string, b: string) => b,
      invert: (a: string, b: string) => a,
      transform: (a: string, b: string, priority: boolean) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ test1: "data1" });
    const delta2 = new Delta().retain({ test2: "data2" });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test2: "data2" });

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("test1");
    Delta.unregisterEmbed("test2");
  });
});