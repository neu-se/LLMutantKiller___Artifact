import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle multiple inserts followed by retain with exact length', () => {
    const a = new Delta().insert('A').insert('B').insert('C').insert('D');
    const b = new Delta().retain(4);
    const expected = new Delta().insert('A').insert('B').insert('C').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});