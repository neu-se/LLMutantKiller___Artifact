import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should correctly handle delete operations when thisOp is delete', () => {
    const a = new Delta().delete(2);
    const b = new Delta().retain(1).delete(1);
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});