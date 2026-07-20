import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain at start with insert in this delta that fits within retain', () => {
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(3).insert('C');
    const expected = new Delta().insert('AB').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});