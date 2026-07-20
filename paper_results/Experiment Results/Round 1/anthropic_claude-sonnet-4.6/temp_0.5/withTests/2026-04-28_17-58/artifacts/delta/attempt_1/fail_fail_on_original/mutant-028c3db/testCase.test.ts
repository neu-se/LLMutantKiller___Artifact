import Delta from "../../src/Delta";

describe("compose() retain start optimization", () => {
  it("should correctly optimize inserts at the start when firstOther is a plain retain", () => {
    // This test relies on the "retain start optimization" in compose():
    // When the first op of `other` is a plain retain (number, no attributes),
    // the code should copy inserts from `this` that fit within that retain.
    //
    // Original: `firstOther != null && typeof firstOther.retain === 'number' && ...`
    // Mutated:  `firstOther == null && typeof firstOther.retain === 'number' && ...`
    //
    // With the mutation, `firstOther == null` would be false when firstOther is a real op,
    // so the optimization block is skipped. This changes the result of compose()
    // when `this` starts with inserts and `other` starts with a plain retain.

    const a = new Delta()
      .insert("A", { bold: true })
      .insert("B")
      .insert("C", { bold: true })
      .delete(1);

    const b = new Delta().retain(3).insert("D");

    const expected = new Delta()
      .insert("A", { bold: true })
      .insert("B")
      .insert("C", { bold: true })
      .insert("D")
      .delete(1);

    expect(a.compose(b)).toEqual(expected);
  });
});