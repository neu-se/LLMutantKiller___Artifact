import Delta from "../../src/Delta";

describe("compose()", () => {
  it("compose retain start optimization with inserts before delete", () => {
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