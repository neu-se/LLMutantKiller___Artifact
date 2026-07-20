import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization: inserts followed by retain, composed with retain then insert', () => {
    const a = new Delta().insert('A').insert('B').retain(3);
    const b = new Delta().retain(2).insert('C');
    // Original: ops=[insert A, insert B], otherIter advanced by 2, then main loop sees otherIter has insert('C') and thisIter has retain(3)
    // Expected result: insert('AB').insert('C').retain(3)
    const expected = new Delta().insert('AB').insert('C').retain(3);
    expect(a.compose(b)).toEqual(expected);
  });
});