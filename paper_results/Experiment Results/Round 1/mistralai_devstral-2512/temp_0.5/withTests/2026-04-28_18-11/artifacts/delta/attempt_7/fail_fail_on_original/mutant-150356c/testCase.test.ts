import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain optimization', () => {
  it('should handle leading retain with delete operation correctly', () => {
    const a = new Delta().insert('A').delete(1);
    const b = new Delta().retain(2).insert('B');
    const expected = new Delta().insert('B').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});