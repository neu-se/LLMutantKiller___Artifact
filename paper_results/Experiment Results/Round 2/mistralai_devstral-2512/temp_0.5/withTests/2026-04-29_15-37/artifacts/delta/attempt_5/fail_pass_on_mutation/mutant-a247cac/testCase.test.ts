import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization with empty delta', () => {
  it('should handle empty delta composition correctly', () => {
    const a = new Delta().insert('A', { bold: true });
    const b = new Delta();
    const expected = new Delta().insert('A', { bold: true });
    expect(a.compose(b)).toEqual(expected);
  });
});