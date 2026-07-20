import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle multiple insert operations during leading retain', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(4).insert('D');
    const expected = new Delta().insert('A').insert('B').insert('C').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});