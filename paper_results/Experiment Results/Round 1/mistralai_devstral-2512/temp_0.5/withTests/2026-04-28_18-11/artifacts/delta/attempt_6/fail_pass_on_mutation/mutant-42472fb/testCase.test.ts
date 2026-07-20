import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with leading retain', () => {
  it('should handle insert operations that exactly match leading retain length', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('A').insert('B').insert('C').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});