import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the invert method when op.retain and op.delete are present', () => {
    const delta = new Delta().retain(2).delete(1);
    const base = new Delta().insert('123');
    const expected = new Delta().retain(2).insert('1');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
    // Change the condition in the invert method to always execute the else block
    // This should cause the test to fail on the mutated code
    // But the test should pass on the original code
  });
});