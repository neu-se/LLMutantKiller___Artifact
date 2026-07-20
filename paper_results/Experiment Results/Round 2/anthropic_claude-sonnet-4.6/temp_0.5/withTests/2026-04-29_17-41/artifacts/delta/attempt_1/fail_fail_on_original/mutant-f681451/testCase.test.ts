import Delta from "../../src/Delta";

describe("transform()", () => {
  it("delete + delete results in empty delta (thisOp.delete should continue past otherOp.delete)", () => {
    const a = new Delta().delete(1);
    const b = new Delta().delete(1);
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});