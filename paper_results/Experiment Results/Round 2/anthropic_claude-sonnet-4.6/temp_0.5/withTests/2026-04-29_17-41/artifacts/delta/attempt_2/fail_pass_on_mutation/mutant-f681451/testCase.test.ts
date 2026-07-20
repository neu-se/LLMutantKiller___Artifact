import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("transform()", () => {
  it("delete + delete should produce empty delta because thisOp delete makes otherOp delete redundant", () => {
    const a = new Delta().delete(1);
    const b = new Delta().delete(1);
    const expected = new Delta();
    const result = a.transform(b, true);
    expect(result).toEqual(expected);
  });
});