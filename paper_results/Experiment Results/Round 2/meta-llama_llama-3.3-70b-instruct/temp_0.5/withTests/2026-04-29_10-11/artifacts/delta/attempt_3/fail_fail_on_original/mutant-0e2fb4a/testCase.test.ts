import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a Delta with a retain operation on a string', () => {
    const delta = new Delta().retain(1);
    const base = new Delta().insert('a');
    const expected = new Delta().retain(1);
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
  });
});