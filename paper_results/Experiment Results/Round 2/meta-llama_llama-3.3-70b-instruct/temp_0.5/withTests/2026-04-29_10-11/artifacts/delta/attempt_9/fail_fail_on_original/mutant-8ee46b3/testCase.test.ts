import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should detect mutation in transform function', () => {
    const a = new Delta().retain(1, { bold: true });
    const b = new Delta().retain(1, { bold: false });
    const expected = new Delta().retain(1);
    expect(a.transform(b)).toEqual(expected);
  });
});