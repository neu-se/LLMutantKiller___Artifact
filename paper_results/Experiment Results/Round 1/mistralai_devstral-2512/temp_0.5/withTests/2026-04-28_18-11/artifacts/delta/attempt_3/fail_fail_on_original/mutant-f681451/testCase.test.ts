import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should skip processing when thisOp is delete', () => {
    const a = new Delta().delete(2).retain(3);
    const b = new Delta().insert('A').delete(1).retain(2);
    const expected = new Delta().insert('A').retain(2);
    expect(a.transform(b, true)).toEqual(expected);
  });
});