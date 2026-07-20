import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert with retain object", () => {
  it("should correctly handle retain with object type when embed handler is registered", () => {
    // Register a test embed handler
    Delta.registerEmbed("test", {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b
    });

    const base = new Delta().insert({ test: "original" });
    const delta = new Delta().retain({ test: "modified" });
    const inverted = delta.invert(base);

    expect(inverted.ops.length).toBe(1);
    expect("retain" in inverted.ops[0]).toBe(true);
    expect(typeof inverted.ops[0].retain).toBe("object");

    // Clean up
    Delta.unregisterEmbed("test");
  });
});