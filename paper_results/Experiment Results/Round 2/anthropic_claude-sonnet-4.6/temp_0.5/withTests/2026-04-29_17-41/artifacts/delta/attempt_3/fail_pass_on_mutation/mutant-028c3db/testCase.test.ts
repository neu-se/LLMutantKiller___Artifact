import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("compose() retain start optimization correctness", () => {
  it("should correctly compose inserts followed by delete when other starts with plain retain covering only some ops", () => {
    // 'a' has leading inserts where some fit within the initial retain of 'b'
    // and some don't - this tests that the partial retain consumption is correct
    const a = new Delta()
      .insert("A", { bold: true })
      .insert("B")
      .insert("C", { bold: true })
      .retain(5)
      .delete(1);
    const b = new Delta().retain(4).insert("D");
    const expected = new Delta()
      .insert("A", { bold: true })
      .insert("B")
      .insert("C", { bold: true })
      .retain(1)
      .insert("D")
      .retain(4)
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});