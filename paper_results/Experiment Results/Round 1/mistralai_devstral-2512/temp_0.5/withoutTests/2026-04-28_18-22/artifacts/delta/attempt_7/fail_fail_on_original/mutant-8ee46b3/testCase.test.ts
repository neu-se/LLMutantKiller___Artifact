import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform embeds when priority is false and otherData is not an object", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ test: "a" });
    const delta2 = new Delta().retain(5);

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);
  });
});