import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle the optimization correctly', () => {
    const a = new Delta().insert('A').retain(1).insert('B');
    const b = new Delta().retain(3);
    const expected = new Delta().insert('A').retain(1).insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});