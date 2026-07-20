import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('compose', () => {
  it('should handle the optimization correctly', () => {
    const a = new Delta().insert('A').retain(1).insert('B');
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('A').retain(1).insert('B').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });

  it('should not handle the optimization when the last op does not match', () => {
    const a = new Delta().insert('A').retain(1).insert('B');
    const b = new Delta().retain(3).insert('D', { bold: true });
    const expected = new Delta().insert('A').retain(1).insert('B').insert('D', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});