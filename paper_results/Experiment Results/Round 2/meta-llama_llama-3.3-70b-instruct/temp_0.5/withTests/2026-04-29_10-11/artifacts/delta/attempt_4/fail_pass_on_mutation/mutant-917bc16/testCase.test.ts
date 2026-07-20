import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('compose', () => {
  it('should handle optimization when other op is a retain', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B');
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A', { bold: true }).insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});