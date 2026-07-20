import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain at start with multiple inserts in this delta', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(4).insert('D');
    const expected = new Delta().insert('ABC').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});