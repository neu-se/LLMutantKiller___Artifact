import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with null firstOther', () => {
  it('should handle null firstOther correctly', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert('A', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});