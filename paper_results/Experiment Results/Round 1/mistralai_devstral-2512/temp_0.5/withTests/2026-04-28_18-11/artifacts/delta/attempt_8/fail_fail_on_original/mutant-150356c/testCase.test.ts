import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should correctly handle case where first operation is not an insert', () => {
    const a = new Delta().insert('A').retain(2);
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('AB').retain(2);
    expect(a.compose(b)).toEqual(expected);
  });
});