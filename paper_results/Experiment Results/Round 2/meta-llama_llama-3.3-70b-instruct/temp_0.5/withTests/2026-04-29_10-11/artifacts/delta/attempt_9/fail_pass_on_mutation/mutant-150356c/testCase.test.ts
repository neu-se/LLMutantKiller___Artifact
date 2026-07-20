import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain start optimization correctly', () => {
    const a = new Delta().retain(2).insert('A');
    const b = new Delta().retain(3);
    const expected = new Delta().retain(2).insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});