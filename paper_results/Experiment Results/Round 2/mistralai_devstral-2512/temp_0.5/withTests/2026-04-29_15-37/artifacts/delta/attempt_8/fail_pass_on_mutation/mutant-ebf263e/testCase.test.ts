import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when firstOther is a retain with null attributes and consume partial inserts', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2).insert('X');
    const expected = new Delta().insert('ABXC');
    expect(a.compose(b)).toEqual(expected);
  });
});