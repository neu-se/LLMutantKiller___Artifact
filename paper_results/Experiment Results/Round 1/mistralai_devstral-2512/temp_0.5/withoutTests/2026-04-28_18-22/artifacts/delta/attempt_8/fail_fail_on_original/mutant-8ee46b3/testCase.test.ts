import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should handle numeric retain values correctly when transforming with embeds", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => (priority ? a : b),
    });

    // Create a delta with an embed
    const delta1 = new Delta().retain({ test: "a" });
    // Create a delta with a numeric retain
    const delta2 = new Delta().retain(5);

    // Transform with priority false
    const result = delta1.transform(delta2, false);

    // The result should contain the numeric retain
    expect(result.ops).toHaveLength(1);
    expect(result.ops[0]).toHaveProperty('retain', 5);
  });
});