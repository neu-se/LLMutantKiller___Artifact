import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose() should handle the case when firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }]);
  });

  it('compose() should not throw an error when firstOther.retain is an empty string in the mutated code', () => {
    const a = new Delta().insert('A');
    const b = new Delta();
    b.ops = [{ retain: '' }];
    // The following line should not throw an error on the mutated code
    // but should throw an error on the original code
    expect(() => a.compose(b)).not.toThrowError();
  });
});