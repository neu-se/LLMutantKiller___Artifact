import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain at start of other delta', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('A').insert('B').insert('C').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});