import Delta from "../../src/Delta";

describe("compose()", () => {
  it("composing a delta with inserts followed by delete against a retain-starting delta applies start optimization correctly", () => {
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