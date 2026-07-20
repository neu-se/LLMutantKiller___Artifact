import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('handles case where other starts with retain larger than leading inserts', () => {
    // `this` has one insert 'A' (length 1), `other` starts with retain(3)
    // Optimization: firstLeft starts at 3, consumes 'A' (length 1), firstLeft=2
    // Then advances otherIter by retain(3) - firstLeft(2) = 1
    // So otherIter still has retain(2) left to process in main loop
    // Without optimization: full retain(3) processed against insert('A') then retain(1)
    const a = new Delta().insert('A').retain(1);
    const b = new Delta().retain(3).insert('X');
    const expected = new Delta().insert('A').retain(1).insert('X');
    expect(a.compose(b)).toEqual(expected);
  });
});