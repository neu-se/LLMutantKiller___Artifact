import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain start optimization correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(10);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});