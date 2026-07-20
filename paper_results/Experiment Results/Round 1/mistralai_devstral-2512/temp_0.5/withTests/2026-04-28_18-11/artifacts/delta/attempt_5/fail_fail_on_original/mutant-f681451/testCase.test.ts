import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operations', () => {
  it('should correctly skip delete operations in transform', () => {
    const a = new Delta().delete(1).retain(2);
    const b = new Delta().insert('X').delete(1).retain(2);
    const expected = new Delta().insert('X').retain(2);
    expect(a.transform(b, true)).toEqual(expected);
  });
});