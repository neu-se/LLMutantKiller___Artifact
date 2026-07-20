import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert with retain object", () => {
  it("should correctly handle retain with object type and attributes", () => {
    // Register a test embed handler
    Delta.registerEmbed("test", {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b
    });

    const base = new Delta().insert({ test: "original" });
    const delta = new Delta().retain({ test: "modified" }, { bold: true });
    const inverted = delta.invert(base);

    // The mutation changes the condition from checking for object retain to always true
    // This should cause the attributes to be handled differently
    expect(inverted.ops.length).toBe(1);
    expect("retain" in inverted.ops[0]).toBe(true);
    expect(typeof inverted.ops[0].retain).toBe("object");
    // The original code should produce { bold: null } while mutated code might produce different result
    expect(inverted.ops[0].attributes).toEqual({ bold: null });

    // Clean up
    Delta.unregisterEmbed("test");
  });
});