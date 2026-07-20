import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete and retain operations', () => {
  it('should correctly handle delete operation when transforming with another delta', () => {
    const a = new Delta().delete(2);
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('X');
    expect(a.transform(b, true)).toEqual(expected);
  });
});