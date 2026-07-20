import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle insert followed by retain with exact length match', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().insert('A').insert('B').insert('C').insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});