import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with embeds", () => {
  it("should correctly transform retain with embed data when priority is false", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => (priority ? a : b),
    });

    const base = new Delta().insert({ test: "A" });
    const delta1 = new Delta().retain({ test: "B" });
    const delta2 = new Delta().retain({ test: "C" });

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain({ test: "C" });

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});