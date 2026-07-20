import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('compose() retain start optimization', () => {
  it('correctly handles retain ops at start when other begins with plain retain', () => {
    const a = new Delta().retain(2, { bold: true }).insert('Hello');
    const b = new Delta().retain(3);
    const expected = new Delta().retain(2, { bold: true }).insert('Hello');
    expect(a.compose(b)).toEqual(expected);
  });
});