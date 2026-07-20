import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('compose', () => {
  it('should handle the optimization correctly', () => {
    const a = new Delta().insert('A').retain(1).insert('B');
    const b = new Delta().retain(3).insert('D');
    const c = new Delta().insert('C').retain(1);
    const expected = new Delta().insert('A').retain(1).insert('B').insert('D').insert('C').retain(1);
    expect(a.compose(b).compose(c)).toEqual(expected);
  });
});