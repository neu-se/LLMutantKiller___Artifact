import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('compose', () => {
  it('should handle optimization when other op is a retain', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B');
    const b = new Delta().retain(2).insert('C');
    const expected = new Delta().insert('A', { bold: true }).insert('B').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});