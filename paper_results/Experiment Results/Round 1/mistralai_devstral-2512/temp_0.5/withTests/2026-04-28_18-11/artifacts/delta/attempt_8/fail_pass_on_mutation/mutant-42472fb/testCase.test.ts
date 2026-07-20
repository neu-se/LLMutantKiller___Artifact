import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle multiple insert operations that fit within leading retain', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('X').insert('Y');
    const expected = new Delta().insert('A').insert('B').insert('C').insert('X').insert('Y');
    expect(a.compose(b)).toEqual(expected);
  });
});