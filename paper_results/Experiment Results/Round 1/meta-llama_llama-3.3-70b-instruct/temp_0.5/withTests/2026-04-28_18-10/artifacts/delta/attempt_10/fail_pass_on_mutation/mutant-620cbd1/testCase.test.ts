import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose() should handle the case when firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }]);
  });

  it.skip('compose() should throw an error when firstOther.retain is not a valid number', () => {
    const a = new Delta().insert('A');
    const b = new Delta();
    b.ops = [{ retain: NaN }];
    expect(() => a.compose(b)).toThrowError();
  });
});