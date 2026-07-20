import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly handle null embed data in transform with priority false", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown) => b,
    });

    const delta1 = new Delta().retain({ test: "value" });
    const delta2 = new Delta().retain({ test: null });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: null });

    expect(result.ops).toEqual(expected.ops);
  });
});