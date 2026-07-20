import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert with retain object", () => {
  it("should correctly handle retain with object type and attributes", () => {
    // Register a test embed handler
    Delta.registerEmbed("test", {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b) => b
    });

    const base = new Delta().insert({ test: "original" });
    const delta = new Delta().retain({ test: "modified" }, { bold: true });
    const inverted = delta.invert(base);

    expect(inverted.ops.length).toBe(1);
    expect(inverted.ops[0]).toHaveProperty("retain");
    expect(typeof inverted.ops[0].retain).toBe("object");
    expect(inverted.ops[0]).toHaveProperty("attributes");
    expect(inverted.ops[0].attributes).toEqual({ bold: true });

    // Clean up
    Delta.unregisterEmbed("test");
  });
});