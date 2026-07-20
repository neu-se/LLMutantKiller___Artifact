import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should not apply optimization when first operation is not an insert', () => {
    const a = new Delta().retain(2).insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().retain(1).insert('B').retain(1).insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});