import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should correctly transform when thisOp has delete and otherOp has insert', () => {
    const delta1 = new Delta().delete(2);
    const delta2 = new Delta().insert('test');
    const result = delta1.transform(delta2, false);
    const expected = new Delta().insert('test');
    expect(result.ops).toEqual(expected.ops);
  });
});