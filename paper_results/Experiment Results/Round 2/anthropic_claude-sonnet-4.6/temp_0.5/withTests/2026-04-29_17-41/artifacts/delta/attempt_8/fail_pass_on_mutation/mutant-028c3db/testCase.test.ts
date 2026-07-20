import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() retain start optimization early exit", () => {
  it("correctly handles case where other is only a plain retain covering all leading inserts", () => {
    const a = new Delta()
      .insert("A", { bold: true })
      .insert("B", { bold: true })
      .insert("C", { bold: true });
    const b = new Delta().retain(3);
    const expected = new Delta()
      .insert("A", { bold: true })
      .insert("B", { bold: true })
      .insert("C", { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});