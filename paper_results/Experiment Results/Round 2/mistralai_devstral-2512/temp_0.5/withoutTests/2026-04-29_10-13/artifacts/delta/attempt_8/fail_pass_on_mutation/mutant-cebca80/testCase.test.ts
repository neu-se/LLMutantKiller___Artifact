import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert with retain object", () => {
  it("should correctly handle retain with object type and verify mutation behavior", () => {
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
    // This test verifies the specific behavior that would differ between original and mutated code
    expect(inverted.ops.length).toBe(1);
    expect("retain" in inverted.ops[0]).toBe(true);
    expect(typeof inverted.ops[0].retain).toBe("object");

    // The key difference: original code should have attributes as { bold: null }
    // while mutated code might handle this differently
    expect(inverted.ops[0].attributes).toEqual({ bold: null });

    // Clean up
    Delta.unregisterEmbed("test");
  });
});