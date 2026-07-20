import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with retain optimization', () => {
  it('should handle insert operations when composing with initial retain', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2).insert('X');
    const result = a.compose(b);
    const expected = new Delta().insert('ABXC');
    expect(result).toEqual(expected);
  });
});