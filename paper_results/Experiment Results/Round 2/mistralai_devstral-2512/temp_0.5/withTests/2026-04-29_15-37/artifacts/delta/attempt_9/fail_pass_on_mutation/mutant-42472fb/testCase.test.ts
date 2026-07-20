import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() with retain optimization', () => {
  it('should handle retain at start with partial insert consumption', () => {
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2).insert('X').retain(1);
    const expected = new Delta().insert('ABXC');
    expect(a.compose(b)).toEqual(expected);
  });
});