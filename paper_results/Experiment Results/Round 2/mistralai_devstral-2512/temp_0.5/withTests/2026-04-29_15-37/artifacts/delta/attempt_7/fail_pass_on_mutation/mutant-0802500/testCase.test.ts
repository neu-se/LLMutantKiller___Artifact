import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with retain optimization', () => {
  it('should handle initial retain optimization with insert operations', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(1).insert('X');
    const result = a.compose(b);
    const expected = new Delta().insert('AXBC');
    expect(result).toEqual(expected);
  });
});