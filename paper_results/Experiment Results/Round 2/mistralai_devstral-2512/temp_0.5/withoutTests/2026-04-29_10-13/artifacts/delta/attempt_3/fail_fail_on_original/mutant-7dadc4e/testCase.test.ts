import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly handle null embed data in transform", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (_a, b) => b,
      invert: (_a, b) => b,
      transform: (_a, b) => b,
    });

    const delta1 = new Delta().retain({ test: "data1" });
    const delta2 = new Delta().retain({ test: null });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain(1); // Should retain with length, not embed

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});