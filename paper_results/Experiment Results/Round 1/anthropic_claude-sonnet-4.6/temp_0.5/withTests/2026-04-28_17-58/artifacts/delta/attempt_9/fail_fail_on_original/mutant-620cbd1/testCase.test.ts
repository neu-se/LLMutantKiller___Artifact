import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization where inserts do not fully cover initial retain', () => {
    // a has 2 inserts (length 2), b starts with retain(5)
    // Optimization: firstLeft starts at 5, consumes A(1) -> firstLeft=4, B(1) -> firstLeft=3
    // thisIter.peekLength()=1 <= firstLeft=3 but next peek would be retain which is not insert
    // So ops=[A,B], otherIter advanced by 5-3=2, leaving retain(3) in otherIter
    // Without mutation: otherIter has retain(3) left, main loop processes retain(3) against nothing
    // With mutation: otherIter has retain(5) left, main loop processes retain(5) against nothing
    const a = new Delta().insert('A').insert('B').retain(10);
    const b = new Delta().retain(5).insert('X');
    const expected = new Delta()
      .insert('A')
      .insert('B')
      .retain(3)
      .insert('X')
      .retain(7);
    expect(a.compose(b)).toEqual(expected);
  });
});