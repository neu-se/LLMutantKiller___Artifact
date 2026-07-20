import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain at start with exact length match', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(2).insert('C');
    const expected = new Delta().insert('AB').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});