import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization: correctly handles retain start', () => {
    // this: insert('A') insert('B') insert('C') delete(1)
    // other: retain(3) insert('D')
    // Optimization: A, B, C fit within retain(3), moved to ops
    // otherIter.next(3) consumes retain(3)
    // Main loop: insert('D'), delete(1)
    // Result: insert('ABC') insert('D') delete(1)
    const a = new Delta().insert('A').insert('B').insert('C').delete(1);
    const b = new Delta().retain(3).insert('D');
    const expected = new Delta().insert('ABC').insert('D').delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});