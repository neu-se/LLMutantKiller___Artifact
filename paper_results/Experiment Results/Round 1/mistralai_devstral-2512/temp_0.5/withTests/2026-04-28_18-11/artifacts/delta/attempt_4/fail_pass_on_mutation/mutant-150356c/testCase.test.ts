import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should correctly handle leading retain when first operation is insert', () => {
    const a = new Delta().insert('A').retain(2).insert('B');
    const b = new Delta().retain(1).insert('C');
    const expected = new Delta().insert('AC').retain(2).insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});