import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should correctly handle delete operations when thisOp is delete and otherOp is delete with priority', () => {
    const a = new Delta().delete(2).retain(1);
    const b = new Delta().delete(1).retain(2);
    const expected = new Delta().retain(1);
    expect(a.transform(b, true)).toEqual(expected);
  });
});