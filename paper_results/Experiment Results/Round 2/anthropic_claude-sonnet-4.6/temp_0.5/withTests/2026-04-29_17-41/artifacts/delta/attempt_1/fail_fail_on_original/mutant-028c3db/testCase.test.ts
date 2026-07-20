import Delta from "../../src/Delta";

describe("compose() retain start optimization", () => {
  it("should correctly compose when other starts with a plain retain and this has leading inserts", () => {
    // 'a' has leading inserts followed by a delete
    // 'b' starts with a plain retain (no attributes)
    // The optimization should carry leading inserts from 'a' directly into result
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