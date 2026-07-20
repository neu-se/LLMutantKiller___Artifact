import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose()", () => {
  it("retain start optimization copies leading inserts when other starts with plain retain", () => {
    // The mutation changes `firstOther != null` to `firstOther == null`.
    // When firstOther is a real op (not null), the original condition is true
    // and the optimization runs. With the mutation, the condition is false
    // and the optimization is skipped, producing a different result.
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