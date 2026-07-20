import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle insert operations that exceed leading retain length', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().insert('A').insert('B').retain(1).insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});