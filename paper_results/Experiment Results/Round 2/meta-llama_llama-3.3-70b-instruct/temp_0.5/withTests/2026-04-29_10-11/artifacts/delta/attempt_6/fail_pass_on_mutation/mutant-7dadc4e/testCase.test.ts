import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should transform correctly', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain({ test: {} });
    const expected = new Delta().retain({ test: {} });
    expect(a.transform(b, true)).toEqual(expected);
  });
});