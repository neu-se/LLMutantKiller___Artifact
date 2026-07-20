import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should correctly handle case where first operation is not an insert', () => {
    const a = new Delta().delete(1).insert('A');
    const b = new Delta().retain(2).insert('B');
    const expected = new Delta().insert('B').delete(1).insert('A');
    expect(a.compose(b)).toEqual(expected);
  });
});