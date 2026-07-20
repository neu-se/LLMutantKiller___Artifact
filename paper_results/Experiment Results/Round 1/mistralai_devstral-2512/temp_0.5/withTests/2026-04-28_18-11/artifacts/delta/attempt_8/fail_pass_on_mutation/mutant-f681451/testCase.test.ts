import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should correctly handle delete operations when thisOp is delete and otherOp is insert', () => {
    const a = new Delta().delete(1);
    const b = new Delta().insert('A');
    const expected = new Delta().insert('A');
    expect(a.transform(b, true)).toEqual(expected);
  });
});