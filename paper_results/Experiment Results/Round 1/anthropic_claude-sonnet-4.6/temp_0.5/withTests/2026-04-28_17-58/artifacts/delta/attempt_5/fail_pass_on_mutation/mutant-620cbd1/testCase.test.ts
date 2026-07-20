import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('correctly handles inserts followed by retain when other starts with plain retain', () => {
    const a = new Delta().insert('A', { bold: true }).insert('B').retain(3);
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A', { bold: true }).insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});