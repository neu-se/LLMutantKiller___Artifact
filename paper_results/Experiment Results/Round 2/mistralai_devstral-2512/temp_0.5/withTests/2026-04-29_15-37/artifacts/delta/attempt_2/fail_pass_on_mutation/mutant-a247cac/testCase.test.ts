import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization edge case', () => {
  it('should correctly handle retain end optimization with single op', () => {
    const a = new Delta().insert('A', { bold: true });
    const b = new Delta().delete(1);
    const expected = new Delta();
    expect(a.compose(b)).toEqual(expected);
  });
});