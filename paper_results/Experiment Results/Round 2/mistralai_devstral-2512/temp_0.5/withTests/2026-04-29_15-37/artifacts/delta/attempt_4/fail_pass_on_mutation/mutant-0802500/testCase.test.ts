import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose() with retain optimization', () => {
  it('should correctly handle insert operations when composing with retain', () => {
    const a = new Delta().insert('Hello');
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().insert('HelXlo');
    const result = a.compose(b);
    expect(result).toEqual(expected);
  });
});