import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle retain start optimization correctly', () => {
    const a = new Delta().insert('A').retain(1).delete(1);
    const b = new Delta().retain(3);
    const expected = new Delta().insert('A').retain(1).delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});