import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should correctly compose two deltas', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const composed = a.compose(b);
    const expected = new Delta().insert('AB');
    expect(composed).toEqual(expected);
  });
});