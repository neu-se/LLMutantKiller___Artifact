import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform an embed change with object and null', () => {
    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain({ delta: null });
    const expected = new Delta().retain({
      delta: [{ delete: 1 }],
    });
    expect(a.transform(b, true)).toEqual(expected);
  });
});