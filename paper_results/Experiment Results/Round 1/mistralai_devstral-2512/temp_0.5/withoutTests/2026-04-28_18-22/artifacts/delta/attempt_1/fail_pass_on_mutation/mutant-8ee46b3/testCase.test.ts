import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with embeds", () => {
  it("should correctly transform embeds when priority is false", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b, priority) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ test: "a" });
    const delta2 = new Delta().retain({ test: "b" });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: "b" });

    expect(result.ops).toEqual(expected.ops);
  });
});