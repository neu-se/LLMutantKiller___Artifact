import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform with embeds", () => {
  it("should correctly transform when otherData is null and priority is false", () => {
    Delta.registerEmbed("test", {
      compose: (a, b) => b,
      invert: (a, b) => a,
      transform: (a, b, priority) => (priority ? a : b),
    });

    const delta1 = new Delta().retain({ test: "A" });
    const delta2 = new Delta().retain(null as any);

    const result = delta1.transform(delta2, false);
    const expected = new Delta().retain(null as any);

    expect(result.ops).toEqual(expected.ops);
    Delta.unregisterEmbed("test");
  });
});