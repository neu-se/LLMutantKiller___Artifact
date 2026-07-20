import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('should correctly handle the composition of two Deltas', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    // The mutated code will incorrectly handle the composition
    expect(a.compose(b)).not.toEqual(expected);
  });
});