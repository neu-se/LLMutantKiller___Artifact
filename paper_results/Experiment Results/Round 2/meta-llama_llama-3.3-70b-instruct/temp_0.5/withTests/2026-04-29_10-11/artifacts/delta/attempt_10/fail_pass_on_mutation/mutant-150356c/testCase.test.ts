import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain start optimization correctly', () => {
    const a = new Delta().delete(1).insert('A');
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});