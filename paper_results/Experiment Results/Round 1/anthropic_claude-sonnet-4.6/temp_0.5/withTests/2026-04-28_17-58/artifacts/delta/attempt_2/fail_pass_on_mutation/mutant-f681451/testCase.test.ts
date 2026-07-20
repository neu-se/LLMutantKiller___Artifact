import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('delete + retain with attributes should produce empty delta', () => {
    const a = new Delta().delete(1);
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta();
    expect(a.transform(b, true)).toEqual(expected);
  });
});