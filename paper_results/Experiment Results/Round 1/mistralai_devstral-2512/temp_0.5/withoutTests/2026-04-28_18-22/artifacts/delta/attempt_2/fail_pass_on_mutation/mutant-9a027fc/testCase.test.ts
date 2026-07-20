import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with embeds", () => {
  it("should correctly handle transform with non-object retain data when priority is false", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => (priority ? a : b),
    });

    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().retain({ test: "value" });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: "value" });

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});