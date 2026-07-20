import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should correctly handle delete operations when thisOp is delete and otherOp is retain', () => {
    const a = new Delta().delete(1).retain(2);
    const b = new Delta().retain(3);
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});