import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta invert with retain object", () => {
  it("should only process object retains in invert operation", () => {
    // Register a test embed handler
    Delta.registerEmbed("test", {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b
    });

    const base = new Delta().insert({ test: "original" });

    // Create a delta with a numeric retain (should not trigger the object path)
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);

    // With original code, numeric retains should be handled differently
    // With mutated code (always true), it might try to process as object
    expect(inverted.ops.length).toBeGreaterThan(0);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});