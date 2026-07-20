import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete and insert operations', () => {
  it('should correctly handle delete followed by insert', () => {
    const a = new Delta().delete(1).insert('A');
    const b = new Delta().insert('B');
    const expected = new Delta().insert('B');
    expect(a.transform(b, true)).toEqual(expected);
  });
});