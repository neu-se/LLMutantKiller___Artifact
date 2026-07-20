import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose() should handle the case when firstOther.retain is a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }]);
  });

  it('compose() should handle the case when firstOther.retain is not a number', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const c = new Delta().retain(1);
    const d = new Delta().retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A' }]);
    const result2 = a.compose(c);
    expect(result2.ops).toEqual([{ insert: 'A' }]);
    const result3 = a.compose(d);
    expect(result3.ops).toEqual([{ insert: 'A' }]);
  });
});