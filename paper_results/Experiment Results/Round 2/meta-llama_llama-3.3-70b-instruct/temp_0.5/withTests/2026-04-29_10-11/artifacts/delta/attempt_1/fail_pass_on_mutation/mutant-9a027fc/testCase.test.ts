import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform an embed change with number', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({
      delta: [{ insert: 'b' }],
    });
    expect(a.transform(b, true)).toEqual(expected);
    expect(a.transform(b)).toEqual(expected);
  });
});