import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with retain optimization', () => {
  it('should correctly handle insert type check in retain optimization', () => {
    const a = new Delta().insert('A').delete(1).insert('B');
    const b = new Delta().retain(1).insert('X');
    const result = a.compose(b);
    const expected = new Delta().insert('ABX');
    expect(result).toEqual(expected);
  });
});