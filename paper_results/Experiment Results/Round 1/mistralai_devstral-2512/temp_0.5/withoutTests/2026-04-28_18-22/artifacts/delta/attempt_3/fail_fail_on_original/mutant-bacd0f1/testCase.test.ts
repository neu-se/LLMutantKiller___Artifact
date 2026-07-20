import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with embeds", () => {
  it("should correctly transform when otherData is null object", () => {
    // Register a simple embed handler for testing
    Delta.registerEmbed("test", {
      compose: (a, b) => b,
      invert: (a, b) => b,
      transform: (a, b) => b,
    });

    const delta1 = new Delta().retain({ test: "value" });
    const delta2 = new Delta().retain(null);

    const result = delta1.transform(delta2, true);
    const expected = new Delta().retain(null);

    expect(result.ops).toEqual(expected.ops);
  });
});