import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle insert operations during leading retain when this has inserts', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('A').insert('B').insert('X').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});