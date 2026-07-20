import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should handle firstOther correctly when it is null', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }]);
  });
});