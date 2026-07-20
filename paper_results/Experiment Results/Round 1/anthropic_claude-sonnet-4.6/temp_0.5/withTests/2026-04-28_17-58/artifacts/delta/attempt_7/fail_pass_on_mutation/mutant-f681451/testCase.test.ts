import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('delete removes their retain - no retain should appear in result', () => {
    const a = new Delta().delete(2);
    const b = new Delta().retain(2, { bold: true });
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});