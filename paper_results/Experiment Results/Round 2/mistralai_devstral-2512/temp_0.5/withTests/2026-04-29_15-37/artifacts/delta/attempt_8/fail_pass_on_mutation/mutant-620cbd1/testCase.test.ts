import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain optimization when firstOther has retain with number type', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').insert('C', { bold: true });
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A', { bold: true }).insert('B').insert('C', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});