import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() optimization edge case', () => {
  it('should correctly handle retain end optimization with single character', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).delete(1);
    const expected = new Delta();
    expect(a.compose(b)).toEqual(expected);
  });
});