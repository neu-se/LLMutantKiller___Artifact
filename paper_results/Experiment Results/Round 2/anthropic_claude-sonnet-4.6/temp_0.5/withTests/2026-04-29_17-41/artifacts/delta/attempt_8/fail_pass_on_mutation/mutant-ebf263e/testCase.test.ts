import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('passes through only inserts that fit within the first retain length', () => {
    // Optimization: only inserts whose cumulative length <= firstOther.retain are
    // fast-pathed. Here retain(1) only fits 'A', so 'B' goes through main loop.
    // otherIter is advanced by retain(1)-0 = 1 (fully consumed).
    // Without optimization (mutation): both inserts processed in main loop against retain(1),
    // but 'B' has no corresponding retain left, so it gets pushed differently.
    const a = new Delta().insert('A').insert('B');
    const b = new Delta().retain(1);
    const expected = new Delta().insert('A').insert('B');
    expect(a.compose(b)).toEqual(expected);
  });
});