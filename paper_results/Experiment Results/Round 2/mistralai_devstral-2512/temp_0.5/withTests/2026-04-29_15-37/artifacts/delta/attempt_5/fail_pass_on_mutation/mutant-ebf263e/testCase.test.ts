import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when firstOther is a retain with null attributes and consume all inserts', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2).insert('C');
    const expected = new Delta().insert('ABC');
    expect(a.compose(b)).toEqual(expected);
  });
});