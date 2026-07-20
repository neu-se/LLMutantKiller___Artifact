import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform when otherData is an object with null value", () => {
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