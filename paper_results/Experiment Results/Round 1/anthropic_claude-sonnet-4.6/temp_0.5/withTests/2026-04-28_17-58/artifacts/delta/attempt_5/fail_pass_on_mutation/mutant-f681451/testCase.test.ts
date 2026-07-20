import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('delete overlapping retain with attributes', () => {
    const a = new Delta().delete(2);
    const b = new Delta().retain(1, { bold: true }).retain(1, { italic: true });
    const expected = new Delta();
    expect(a.transform(b, false)).toEqual(expected);
  });
});