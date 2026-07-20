import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() with retain optimization edge case", () => {
  it("should correctly handle retain with object embed and no attributes", () => {
    Delta.registerEmbed<{ id: number }>("custom", {
      compose: (a, b) => ({ id: a.id + b.id }),
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => ({ id: b.id - a.id }),
    });

    const a = new Delta().insert({ custom: { id: 1 } });
    const b = new Delta().retain({ custom: { id: 2 } });
    const expected = new Delta().insert({ custom: { id: 3 } });

    // This should trigger the optimization path in original code
    // but will incorrectly trigger in mutated code when firstOther has object retain
    const result = a.compose(b);
    expect(result).toEqual(expected);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0]).toEqual({ insert: { custom: { id: 3 } } });

    Delta.unregisterEmbed("custom");
  });
});