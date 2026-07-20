import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly handle object retain data in transform", () => {
    // Register a custom embed handler for testing
    Delta.registerEmbed("test", {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ test: "data1" });
    const delta2 = new Delta().retain({ test: "data2" });

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain({ test: "data1" });

    expect(result.ops).toEqual(expected.ops);

    // Clean up
    Delta.unregisterEmbed("test");
  });
});