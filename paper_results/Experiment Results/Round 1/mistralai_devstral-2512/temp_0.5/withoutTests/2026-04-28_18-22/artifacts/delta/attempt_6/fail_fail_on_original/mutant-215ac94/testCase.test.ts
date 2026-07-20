import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform when thisData is object and otherData is number", () => {
    // Register a custom embed handler for testing
    Delta.registerEmbed("test", {
      compose: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, priority: boolean) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ test: "data1" });
    const delta2 = new Delta().retain(5);

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(5);

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});