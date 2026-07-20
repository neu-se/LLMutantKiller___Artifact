import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete operation', () => {
  it('should correctly handle delete operation when other has mixed operations', () => {
    const a = new Delta().delete(1);
    const b = new Delta().retain(1).insert('X').delete(1);
    const expected = new Delta().insert('X').delete(1);
    expect(a.transform(b, true)).toEqual(expected);
  });
});