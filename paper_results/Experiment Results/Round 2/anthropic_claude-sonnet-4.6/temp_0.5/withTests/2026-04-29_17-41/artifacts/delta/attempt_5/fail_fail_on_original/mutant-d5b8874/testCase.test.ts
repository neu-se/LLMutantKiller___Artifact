import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain number with attributes composed with delete should produce delete', () => {
    const a = new Delta().retain(2, { bold: true });
    const b = new Delta().retain(1).delete(1);
    const expected = new Delta().retain(1).delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});