import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operation', () => {
  it('should correctly handle delete operation when other has delete', () => {
    const a = new Delta().delete(1);
    const b = new Delta().delete(1).insert('X');
    const expected = new Delta().insert('X');
    expect(a.transform(b, true)).toEqual(expected);
  });
});