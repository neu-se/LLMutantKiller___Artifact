import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain at start with insert that exactly matches retain length', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('ABC').insert('D');
    expect(a.compose(b)).toEqual(expected);
  });
});