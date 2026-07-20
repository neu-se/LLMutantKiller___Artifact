import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should correctly handle case where first operation is not an insert', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().insert('A', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});