import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with retain optimization', () => {
  it('should trigger retain optimization with insert operation', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('X');
    const result = a.compose(b);
    const expected = new Delta().insert('ABC').insert('X');
    expect(result).toEqual(expected);
  });
});