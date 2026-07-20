import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization with exact retain coverage and trailing retain', () => {
    const a = new Delta().insert('AB').retain(5);
    const b = new Delta().retain(2);
    const expected = new Delta().insert('AB');
    expect(a.compose(b)).toEqual(expected);
  });
});