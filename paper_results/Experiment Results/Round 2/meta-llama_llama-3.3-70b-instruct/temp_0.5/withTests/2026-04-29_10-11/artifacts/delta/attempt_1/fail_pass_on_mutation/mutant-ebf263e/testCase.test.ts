import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should handle firstOther.retain correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should handle firstOther.retain with attributes correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert('A', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});