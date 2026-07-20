import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should handle transform with two inserts correctly', () => {
    const a = new Delta().insert('a');
    const b = new Delta().insert('b');
    const expected = new Delta().retain(1).insert('b');
    expect(a.transform(b)).toEqual(expected);
  });
});