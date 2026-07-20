import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should optimize when firstOther is a retain with null attributes', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3);
    const expected = new Delta().insert('A').insert('B').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});