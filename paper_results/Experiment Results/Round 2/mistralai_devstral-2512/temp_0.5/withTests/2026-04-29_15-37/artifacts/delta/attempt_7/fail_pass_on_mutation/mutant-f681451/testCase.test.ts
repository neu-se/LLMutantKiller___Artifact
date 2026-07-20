import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() with delete and retain operations', () => {
  it('should correctly handle delete followed by retain with attributes', () => {
    const a = new Delta().delete(1).retain(1, { bold: true });
    const b = new Delta().retain(2, { italic: true });
    const expected = new Delta().retain(1, { italic: true });
    expect(a.transform(b, true)).toEqual(expected);
  });
});