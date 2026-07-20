import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() retain optimization with object embed", () => {
  it("should not optimize when firstOther has object retain with attributes", () => {
    Delta.registerEmbed<{ id: number }>("custom", {
      compose: (a, b) => ({ id: a.id + b.id }),
      transform: (a, b, priority) => (priority ? a : b),
      invert: (a, b) => ({ id: b.id - a.id }),
    });

    const a = new Delta().insert("A");
    const b = new Delta().retain({ custom: { id: 1 } }, { bold: true }).insert("B");
    const expected = new Delta()
      .insert("A", { bold: true })
      .insert("B");

    const result = a.compose(b);
    expect(result).toEqual(expected);
    expect(result.ops.length).toBe(2);

    Delta.unregisterEmbed("custom");
  });
});