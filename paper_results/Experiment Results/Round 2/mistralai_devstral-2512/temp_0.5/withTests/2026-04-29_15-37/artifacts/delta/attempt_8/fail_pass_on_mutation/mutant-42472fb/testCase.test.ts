import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain at start with multiple inserts that exactly match retain length', () => {
    const a = new Delta().insert('A').insert('B').insert('C').insert('D');
    const b = new Delta().retain(4).insert('E');
    const expected = new Delta().insert('ABCD').insert('E');
    expect(a.compose(b)).toEqual(expected);
  });
});